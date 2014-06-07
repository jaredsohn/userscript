/*  IMDBRatingAdj v1.0 - Greasemonkey script to adjust the ratings of films
    to give a more normalised value
    
    Copyright (C) 2009 Thomas Stewart <thomas@stewarts.org.uk>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

This is a Greasemonkey user script, see http://www.greasespot.net/ and
http://userscripts.org/

This script adds a new rating to each movie by using a rather ugly formula.
The result of this formula gives a more normalised value for films. Currently
there is a rather large unbalanced peek around 6. eg a 6.2 film is far far
better than a 6.1 film compared to a 6.4 and a 6.3 film. The current
distribution is far from a nice bell curve. This adjusted rating flattens this
curve and thus tries to give a better impression of how good the films are

// ==UserScript==
// @name          IMDBRatingAdj
// @namespace     http://www.stewarts.org.uk/stuff
// @description	  Adds an adjusted normalised rating to each film
// @include       http://*imdb.com/title/*
// ==/UserScript==

/*
This is a short summary of how I arived to where I did
crasy calculations follows:

Firstly get a working imdbpy installation, see 
http://imdbpy.sourceforge.net/docs/README.sqldb.txt, I used postgres this
probbaly won't work on anything else without much modification.
Next do a whole bunch of sql.

-------------------------------------------------------------------------------
-- This gets the raw data and crosstab's it out into a table no real processing
-- is done, the film id, title, votes and rating are copied. The voting dist
-- is split up into separate fields

DROP TABLE ratings;
CREATE TABLE ratings (
        id int NOT NULL,
        title text NOT NULL,
        vd01 text NOT NULL,
        vd02 text NOT NULL,
        vd03 text NOT NULL,
        vd04 text NOT NULL,
        vd05 text NOT NULL,
        vd06 text NOT NULL,
        vd07 text NOT NULL,
        vd08 text NOT NULL,
        vd09 text NOT NULL,
        vd10 text NOT NULL,
        votes int NOT NULL,
        rating real NOT NULL
);
CREATE INDEX ratings_idx_rating ON ratings (rating);

INSERT INTO ratings SELECT id, title,
substring(votesdistribution for 1 from 1) as vd01,
substring(votesdistribution for 1 from 2) as vd02,
substring(votesdistribution for 1 from 3) as vd03,
substring(votesdistribution for 1 from 4) as vd04,
substring(votesdistribution for 1 from 5) as vd05,
substring(votesdistribution for 1 from 6) as vd06,
substring(votesdistribution for 1 from 7) as vd07,
substring(votesdistribution for 1 from 8) as vd08,
substring(votesdistribution for 1 from 9) as vd09,
substring(votesdistribution for 1 from 10) as vd10,
votes, rating
FROM crosstab('
SELECT title.id, title.title, info_type.info, movie_info.info
FROM title INNER JOIN kind_type ON title.kind_id = kind_type.id
        INNER JOIN movie_info ON title.id = movie_info.movie_id
        INNER JOIN info_type ON movie_info.info_type_id = info_type.id
WHERE kind_type.kind = ''movie''
        AND (info_type.info = ''votes distribution''
                OR info_type.info = ''votes''
                OR info_type.info = ''rating'')
ORDER BY 1,3
','VALUES (''votes distribution''), (''votes''), (''rating'')')
AS (id int, title text, votesdistribution text, votes int, rating real);

-------------------------------------------------------------------------------
-- This does more processing and moves the data into a separate table as the
-- the crosstab takes a while. The new table has a sequence which starts as 1
-- signifying the worst film. When the data is inserted, it is inserted in
-- rating order, then by the voting distribution order. Each insert generates
-- a new rank number, thus rank / count(*) is a new sort of adjusted, flat
-- distribution rating. A fair bit of work on the votes distribution is done.
-- * and ., 100% of votes and no votes are replaced with values, the *10+4.5
-- transforms the number into the mid point in each percentage bracket. eg
-- a 3 means, 30-39% of people voted that number, mid point is 3*10+4.5=34.5
-- the values for 0, ., and * are bogus to fudge the numbers. All 10 votes
-- distributions are normalised by the same factor so they sum to 100. Please
-- feel free to point out a better way todo this, I'm as well aware how ugly
-- it looks

DROP TABLE ratingsproc;
DROP SEQUENCE ratingsproc_rank_seq;
CREATE TABLE ratingsproc (
        id int NOT NULL,
        title text NOT NULL,
        vd01 int NOT NULL,
        vd02 int NOT NULL,
        vd03 int NOT NULL,
        vd04 int NOT NULL,
        vd05 int NOT NULL,
        vd06 int NOT NULL,
        vd07 int NOT NULL,
        vd08 int NOT NULL,
        vd09 int NOT NULL,
        vd10 int NOT NULL,
        votes int NOT NULL,
        rating real NOT NULL,
        rank real NOT NULL
);
CREATE SEQUENCE ratingsproc_rank_seq;
ALTER TABLE ratingsproc ALTER COLUMN rank SET DEFAULT nextval('ratingsproc_rank_seq');

CREATE INDEX ratingsproc_idx_rating ON ratingsproc (rating);
CREATE INDEX ratingsproc_idx_rank ON ratingsproc (rank);

INSERT INTO ratingsproc
SELECT id, title, 
(       (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd01,

(       (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd02,

(       (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd03,

(       (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd04,

(       (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd05,

(       (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd06,

(       (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd07,

(       (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd08,

(       (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd09,

(       (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
* (100 / (
        (regexp_replace(replace(replace(vd01, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd02, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd03, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd04, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd05, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd06, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd07, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd08, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd09, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        +
        (regexp_replace(replace(replace(vd10, '0', '0.0000001'), '*', '9.55'),
                E'^\\.', '-0.45')::real * 10 + 4.5)
        )
))::int as vd10,
votes, rating
FROM ratings
ORDER BY rating, 12, 11, 10, 09, 08, 07, 06, 05, 04, 03, votes;

-- 95% of the vd's are +-2% of 100%
 SELECT DISTINCT vd01 + vd02 + vd03 + vd04 + vd05 + vd06 + vd07 + vd08 + vd09 + vd10 AS total, count(*) FROM ratingsproc GROUP BY vd01 + vd02 + vd03 + vd04 + vd05 + vd06 + vd07 + vd08 + vd09 + vd10;

 total | count 
-------+-------
    96 |  5953
    97 |   428
    98 | 19290
    99 | 18314
   100 | 43748
   101 | 37289
   102 |  8852
   103 |   622
   104 |   756

-------------------------------------------------------------------------------
-- This prints the rating distribution using the supplied ratings
SELECT rating::int, COUNT(*)/100 as dist FROM ratingsproc GROUP BY rating::int ORDER BY 1;

-- This prints the ratings distribution using the imdb rating method
SELECT ((votes::real/(votes::real+1300))*rating+(1300/(votes::real+1300))*6.9)::int AS wrating, COUNT(id)/100 as dist FROM ratingsproc group by ((votes::real/(votes::real+1300))*rating+(1300/(votes::real+1300))*6.9)::int ORDER BY 1;

-- This uses the same imdb weighting method that generates the top 250, ish
SELECT id, substring(title for 20), (votes::real/(votes::real+1300))*rating+(1300/(votes::real+1300))*6.9 as weightedrank FROM ratingsproc ORDER BY 3 DESC LIMIT 250;

-- This prints the newly flattened distribution
SELECT ((rank / (SELECT COUNT(*) FROM ratingsproc)) * 10)::int AS rating, COUNT(*) as dist FROM ratingsproc GROUP BY ((rank / (SELECT COUNT(*) FROM ratingsproc)) * 10)::int ORDER BY 1;

 rating | dist  
--------+-------
      0 |  6762
      1 | 13525
      2 | 13526
      3 | 13525
      4 | 13525
      5 | 13525
      6 | 13525
      7 | 13525
      8 | 13526
      9 | 13525
     10 |  6763

-- Compared with the original dist
SELECT rating::int, COUNT(*) as dist FROM ratings GROUP BY rating::int ORDER BY 1;

 rating | dist  
--------+-------
      1 |   588
      2 |  3051
      3 |  5666
      4 | 13270
      5 | 20585
      6 | 37978
      7 | 29707
      8 | 18268
      9 |  5133
     10 |  1006

-------------------------------------------------------------------------------
-- This calculates the new rating, printing the original rating and the
-- difference between it and the newly adjusted rating. ie the offset from
-- any original rating to the new rating. This offset turns out to be a fairly
-- strong line. The output is then ready to be processed with qtiplot
\a
\f ,
\pset null
\o imdb.csv
SELECT rating, avg((((rank / (SELECT COUNT(*) FROM ratingsproc)) * 10) - rating)) AS adj FROM ratingsproc GROUP BY rating ORDER BY rating;

--Then using linear regression, by using fityk or qtiplot you can get this formula
--Y=-1.736558360619+3.417414582006*X-4.320808167519*X^2+2.061461463765*X^3-0.4643544433338*X^4+0.02816217104146*X^5+0.008416120953054*X^6-0.001851660798714*X^7+0.0001415038905349*X^8-3.88442998687e-06*X^9

--This tests that the above formula actually works
SELECT DISTINCT
round(rating::numeric, 1) AS rating,
round((((rank / (SELECT COUNT(*) FROM ratingsproc)) * 10) - rating)::numeric, 5) AS adj,
round((((rank / (SELECT COUNT(*) FROM ratingsproc)) * 10))::numeric, 1) AS ratingadj,
round(((-1.736558360619+3.417414582006*rating-4.320808167519*rating^2+2.061461463765*rating^3-0.4643544433338*rating^4+0.02816217104146*rating^5+0.008416120953054*rating^6-0.001851660798714*rating^7+0.0001415038905349*rating^8-3.88442998687e-06*rating^9) + rating)::numeric, 1) AS calcedrating,
abs(round(((-1.736558360619+3.417414582006*rating-4.320808167519*rating^2+2.061461463765*rating^3-0.4643544433338*rating^4+0.02816217104146*rating^5+0.008416120953054*rating^6-0.001851660798714*rating^7+0.0001415038905349*rating^8-3.88442998687e-06*rating^9) + rating)::numeric, 1)-round((rating + (((rank / (SELECT COUNT(*) FROM ratingsproc)) * 10) - rating))::numeric, 1)) AS diff
FROM ratingsproc
ORDER BY 5 DESC;

*/

var results = document.evaluate(
        "//div[contains(@class, 'general rating')]/div/b",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var rating = results.snapshotItem(0).innerHTML;

rating = parseFloat(rating.substring(0, rating.indexOf("/")));

var adjustedrating = 10 * (
        - 1.736558360619
        + 3.417414582006        * rating
        - 4.320808167519        * Math.pow(rating, 2)
        + 2.061461463765        * Math.pow(rating, 3)
        - 0.4643544433338       * Math.pow(rating, 4)
        + 0.02816217104146      * Math.pow(rating, 5)
        + 0.008416120953054     * Math.pow(rating, 6)
        - 0.001851660798714     * Math.pow(rating, 7)
        + 0.0001415038905349    * Math.pow(rating, 8)
        - 3.88442998687e-06     * Math.pow(rating, 9));

adjustedrating = Math.round(adjustedrating * Math.pow(10,2))/Math.pow(10,2);

var container = document.createTextNode( " (" + adjustedrating + ")");
results.snapshotItem(0).parentNode.insertBefore(
        container, results.snapshotItem(0).nextSibling);

