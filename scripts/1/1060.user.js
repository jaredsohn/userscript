/*  IMDBAge v2.10 - Greasemonkey script to add actors ages to IMDB pages
    Copyright (C) 2005-2013 Thomas Stewart <thomas@stewarts.org.uk>

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

Inspired in 2001, Created on 24/03/2005, Last Changed 12/10/2013
Major bug fixes and improvements by Christopher J. Madsen

This is a Greasemonkey user script, see http://www.greasespot.net/,
https://addons.mozilla.org/firefox/addon/748 and http://userscripts.org/

New versions can be found either on my site or on the userscripts site:
http://www.stewarts.org.uk/tomsweb/IMDBAge
http://userscripts.org/scripts/show/1060

This script adds the age and other various info onto IMDB pages. Specifically
it adds some details to actor or actresses pages. It adds their age, their
Tropical Zodiac Sign and their Chinese Zodiac Sign. As well as adding how many
years ago and how old they were when they made the listed films. It also adds
how long a go a film was made on a film page.

Any of the above can be turned on or off by setting the following settings in about:config:
greasemonkey.scriptvals.http://www.stewarts.org.uk/IMDBAge.doFilmAge
greasemonkey.scriptvals.http://www.stewarts.org.uk/IMDBAge.doNameAge
greasemonkey.scriptvals.http://www.stewarts.org.uk/IMDBAge.doNameAges
greasemonkey.scriptvals.http://www.stewarts.org.uk/IMDBAge.doSigns
*/

var doNameAge  = GM_getValue("doNameAge",  true);
var doNameAges = GM_getValue("doNameAges", true);
var doSigns    = GM_getValue("doSigns",    true);
var doFilmAge  = GM_getValue("doFilmAge",  true);

GM_setValue("doNameAge",  doNameAge)
GM_setValue("doNameAges", doNameAges)
GM_setValue("doSigns",    doSigns)
GM_setValue("doFilmAge",  doFilmAge)

// ==UserScript==
// @name        IMDBAge
// @description Adds the age and other various info onto IMDB pages.
// @version     2.10
// @namespace   http://www.stewarts.org.uk
// @include     http://*imdb.com/name/*
// @include     http://*imdb.com/title/*
// @grant       GM_getValue
// @grant       GM_setValue
// @icon        http://www.stewarts.org.uk/tomsweb/IMDBAge?action=AttachFile&do=get&target=icon.png  
// ==/UserScript==

/*
(https://secure.imdb.com/register-imdb/siteprefs)
Title Test Cases:
plain year              http://www.imdb.com/title/tt0056172/
year range              http://www.imdb.com/title/tt0108757/
year range still open   http://www.imdb.com/title/tt0804503/
year with version       http://www.imdb.com/title/tt1008690/

Name Test Cases: (In full for completeness)
Born 18C -> Died 18C    http://us.imdb.com/name/nm1038177/ (Laurence Sterne 54)
Born 18C -> Died 19C    http://us.imdb.com/name/nm0308075/ (Almeida Garrett 55)
Born 18C -> Died 20C    None
Born 18C -> Died 21C    None
Born 18C -> Alive       None

Born 19C -> Died 19C    http://us.imdb.com/name/nm0786564/ (Anna Sewell 58)
Born 19C -> Died 20C    http://us.imdb.com/name/nm0186440/ (Ward Crane 38)
Born 19C -> Died 21C    http://us.imdb.com/name/nm0041807/ (Germaine Auger 112)
Born 19C -> Alive       http://us.imdb.com/name/nm0008724/ (Dawlad Abiad 117)

Born 20C -> Died 20C    http://us.imdb.com/name/nm0001006/ (John Candy 43)
Born 20C -> Died 21C    http://us.imdb.com/name/nm0670239/ (John Peel 65)
Born 20C -> Alive       http://us.imdb.com/name/nm0088127/ (Alexis Bledel 31)

Born 21C -> Died 21C    http://us.imdb.com/name/nm2548643/ (Tabea Block 1)
Born 21C -> Alive       http://us.imdb.com/name/nm1468628/ (Ben Want 10)

Born 31 Dec 1969        http://us.imdb.com/name/nm1009503/ (Taylor McCall 42)
Died 31 Dec 1969        http://us.imdb.com/name/nm0862239/ (Carol Thurston 46)
Born  1 Jan 1970        http://us.imdb.com/name/nm0231191/ (Fiona Dolman 40)
Died  1 Jan 1970        http://us.imdb.com/name/nm0902025/ (Eduard von Borsody 71)

http://us.imdb.com/date/{month}-{day}
http://us.imdb.com/search/name?birth_year={year}

This was the method I used to find some of the people above, eeeeu! 
(If you are crazy enough to run this, expect it to take ages. It takes 30min on a Intel Core Duo 2 CPU 6400 @ 2.13GHz.)
(ftp://ftp.fu-berlin.de/pub/misc/movies/database)
for c in 17 18 19 20; do
        $( cat biographies.list.gz | gunzip -c | egrep "^NM: |^DB: |^DD: " | while read line; do echo -n "$line "; done | sed 's/NM: /\nNM: /g' | grep "$c[0-9][0-9]" | while read line; do if [ `echo $line | awk -F: '{print $3}' | grep "$c[0-9][0-9]" | wc -l | awk '{print $1}'` -eq 1 ]; then echo $line; fi; done > b.$c ) &
        $( cat biographies.list.gz | gunzip -c | egrep "^NM: |^DB: |^DD: " | while read line; do echo -n "$line "; done | sed 's/NM: /\nNM: /g' | grep "$c[0-9][0-9]" | while read line; do if [ `echo $line | awk -F: '{print $4}' | grep "$c[0-9][0-9]" | wc -l | awk '{print $1}'` -eq 1 ]; then echo $line; fi; done > d.$c ) &
done
cat b.17 d.17 | sort | uniq -d
{list of people born and died in 18C}
$ wc -l b.17 d.17 b.18 d.18 b.19 d.19 b.20 d.20 
     259 b.17
      95 d.17
   28647 b.18
     663 d.18
  320418 b.19
   69663 d.19
    4142 b.20
   33387 d.20
  457274 total
$
*/

/*
TODO: add ages to individual ages of actors to a film page, very hard,
        http req for each one, and then a xpath on the whole result
TODO: add script updater support
*/

/*
calculates tropical zodiac sign
input:  month and day
output: tropical zodiac sign as string, includes comma and label
see http://en.wikipedia.org/wiki/Signs_of_the_Zodiac
*/
function tropicalZodiac(month, day) {
        var sign;

        /* link the month and day to the sign */
        if     (month ==  3 && day >= 21 ||
                month ==  4 && day <= 19) {sign = "Aries - ♈";}
        else if(month ==  4 && day >= 20 ||
                month ==  5 && day <= 20) {sign = "Taurus - ♉";}
        else if(month ==  5 && day >= 21 ||
                month ==  6 && day <= 20) {sign = "Gemini - ♊";}
        else if(month ==  6 && day >= 21 ||
                month ==  7 && day <= 22) {sign = "Cancer - ♋";}
        else if(month ==  7 && day >= 23 ||
                month ==  8 && day <= 22) {sign = "Leo - ♌";}
        else if(month ==  8 && day >= 23 ||
                month ==  9 && day <= 22) {sign = "Virgo - ♍";}
        else if(month ==  9 && day >= 23 ||
                month == 10 && day <= 22) {sign = "Libra - ♎";}
        else if(month == 10 && day >= 23 ||
                month == 11 && day <= 21) {sign = "Scorpio - ♏";}
        else if(month == 11 && day >= 22 ||
                month == 12 && day <= 21) {sign = "Sagittarius - ♐";}
        else if(month == 12 && day >= 22 ||
                month ==  1 && day <= 19) {sign = "Capricorn - ♑";}
        else if(month ==  1 && day >= 20 ||
                month ==  2 && day <= 18) {sign = "Aquarius - ♒";}
        else if(month ==  2 && day >= 19 ||
                month ==  3 && day <= 20) {sign = "Pisces - ♓";}
        else {return "";} /* unknown also catches odd dates */

        /* return text with comma and label */
        return ", Tropical Zodiac Sign: " + sign;
}

/*
calculates chinese zodiac sign
input:  full year
output: chinese zodiac sign as string, includes comma and label
see http://en.wikipedia.org/wiki/Chinese_astrology
*/
function chineseZodiac(year) {
        /* no idea how to work out signes before 20C */
        if (year < 1900) { return ""; }

        /* theres 12 signs that go round in a rotation */
        /* find years since 1900, find modulus of that, get rid of the */
        /* sign(sic) and round it */
        var nsign = Math.round(Math.abs((year - 1900) % 12));
        
        var sign;
        /* next link the two together*/
        if      (nsign ==  0) { sign = "Rat (Metal)"; }
        else if (nsign ==  1) { sign = "Ox (Metal)"; }
        else if (nsign ==  2) { sign = "Tiger (Water)"; }
        else if (nsign ==  3) { sign = "Rabbit/Cat (Water)"; }
        else if (nsign ==  4) { sign = "Dragon (wood)"; }
        else if (nsign ==  5) { sign = "Snake (Wood)"; }
        else if (nsign ==  6) { sign = "Horse (Fire)"; }
        else if (nsign ==  7) { sign = "Goat (Fire)"; }
        else if (nsign ==  8) { sign = "Monkey (Earth)"; }
        else if (nsign ==  9) { sign = "Rooster (Earth)"; }
        else if (nsign == 10) { sign = "Dog (Metal)"; }
        else if (nsign == 11) { sign = "Pig/Wild Boar (Metal)"; }
        else {return "";}  /* unknown also catches odd dates */
        
        /* return text with comma and label */
        return ", Chinese Zodiac Sign: " + sign;
}

/*
get dates from a name page
input: born and died called by ref, they are filled with dates from the page
output: whether they are dead of alive
*/
function getNameDates(born, died) {
	var alive = false;
	
	/* find the birth date */
        var nodes = document.evaluate(
                "//time[contains(@itemprop,'birthDate')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (nodes.snapshotLength == 1) {
		date = nodes.snapshotItem(0).getAttribute("datetime").split("-")
		born.setFullYear(date[0]);
		born.setMonth(date[1] - 1);
		born.setDate(date[2]);
		alive = true
	}

	/* find the death date */
        var nodes = document.evaluate(
                "//time[contains(@itemprop,'deathDate')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (nodes.snapshotLength == 1) {
		t=nodes.snapshotItem(0).getAttribute("datetime").split("-")
		died.setFullYear(date[0]);
		died.setMonth(date[1]);
		died.setDate(date[2]);
		alive = false
	}
        //alert("Born: " + born + "\nDied: " + died + "\nAlive: " + alive);
	return alive;
}

/*
get dates from a title page
returns: year of title
*/
function getTitleDates() {
        var nodes = document.evaluate(
                /* old style and new style */
                "//a[contains(@href,'year')]|//span[contains(@class,'nobr')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        /* get the result */
        yeartxt = nodes.snapshotItem(0).innerHTML;

        /* get the first occurance of a year as it can contain year ranges */
        yearindex = yeartxt.search("[1-2][0-9]{3}");
        yeartxt = yeartxt.substring(yearindex, yearindex + 4);

        /* return it */
        year = new Date();
        year.setFullYear(yeartxt);
        //alert("Year: " + year)
        return year;
}

/*
add age of person to page
input: alive status, and dates
*/
function addAge(alive, born, died) {
        var justyear;

        /* find the difference between two times */
        var age;
        if (died == undefined) {
                age = new Date() - born.getTime();
        } else {
                age = died.getTime() - born.getTime();
        }

        //alert("Born: " + born + "\nDied: " + died + "\nAlive: " + alive);

        /* convert difference into years */
        age = age / (1000 * 60 * 60 * 24 * 365.242199);

        /* get nice values */
        var years =  Math.floor( age );
        var months = Math.floor( (age - years) * 12 );

        var nodes = document.evaluate("//a[contains(@href,'/date')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        /* only print the year if there aren't dates */
        if ((alive == true && nodes.snapshotLength == 1) || 
            (alive == false && nodes.snapshotLength == 2)) {
                justyear = false;
        } else {
                justyear = true;
        }

        /* loop over all the a tags involving dates */
        var nodes = document.evaluate(
                "//a[contains(@href,'birth_year')] | //a[contains(@href,'death_date')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        /* only count months if we found month & day info */
        var container = document.createTextNode(
                        " (Age: " + 
                        years + 
                        " year" +
                        (years == 1 ? '' : 's') +
                                (!justyear ? ", " + 
                                months + 
                                " month" +
                                (months == 1 ? '' : 's')
                                : '') +
                ")");

        /* loop over all dates */
        if (alive == true) {
                node = nodes.snapshotItem(0);
                node.parentNode.insertBefore(container, node.nextSibling);
        } else {
                node = nodes.snapshotItem(1);
        
                //only add death age on old layout, as new layouw has it!
                if (!newStyle()) {
                        node.parentNode.insertBefore(container, 
                                node.nextSibling);
                }
        }
}

/*
add age of film and the age of the actor when they were in the film
input: full year or birth
*/
function addAges(born) {
        //find all the films, this in includes things like producer and writer
        var nodes = document.evaluate(
                /* new style and old style */
                "//span[contains(@class,'year_column')]|//div[@id='tn15content']/div/ol/li",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        //loop round each film
        for (var i = 0; i < nodes.snapshotLength; i++) {
                var node = nodes.snapshotItem(i);
                //extract the year of the film depending on style
                if (newStyle()) {
                        yearindex = node.innerHTML.search("[1-2][0-9]{3}")
                        //if we don't find a year, continue with for loop
                        if (yearindex) {
                                continue;
                        }
                } else { 
                        yearindex = node.innerHTML.search(
                                "[1-2][0-9]{3}[/I]{0,2}[)]")
                }
                var filmborn = node.innerHTML.substring(yearindex,
                        yearindex + 4);

                //calculate ages
                var filmage = new Date().getFullYear() - filmborn;
                var age = filmborn - born;
                age = new String(age +
                        " year" + (age == 1 ? '' : 's') + " old");

                //get them in a nice format
                if (filmage < 0) {
                        var agetxt = new String(
                                "in " +
                                Math.abs(filmage) + " year" +
                                (Math.abs(filmage) == 1 ? '' : 's') +
                                " will be " + age);
                }
                if (filmage == 0) {
                        var agetxt = new String(
                                "this year while " + age);
                }
                if (filmage > 0) {
                        var agetxt = new String(
                                Math.abs(filmage) + " year" +
                                (Math.abs(filmage) == 1 ? '' : 's') +
                                " ago while " + age);
                }
                
                //if(i == 4) { alert(agetxt); }
                /* add in age text */
                node.innerHTML = node.innerHTML.substring(0,yearindex)
                        + agetxt + ", " + node.innerHTML.substring(yearindex)
        }
}

/*
adds signs to page
input: date person is born
*/
function addSigns(born) {
        /* find place to stick the info */
        var nodes = document.evaluate( "//a[contains(@href,'birth_year')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        /* make a node with info in */
        var container = document.createTextNode(
                tropicalZodiac(born.getMonth() + 1, born.getDate()) +
                chineseZodiac(born.getFullYear())
                );
        /* should be the first occurance of the latter */
        var node = nodes.snapshotItem(0);

        /* attach it */
        if (nodes.snapshotLength > 0) {
                node.parentNode.insertBefore(container, node.nextSibling);
        }
}

/*
add the age of the film to the page
input: date of film
*/
function addFilmAge(filmAge) {
        /* calc age */
        var age = new Date().getFullYear() - filmAge.getFullYear();
        /* only print if age is 1 or over */
        if (age >= 1) {
                /* make a node with info in */
                var container = document.createTextNode(", " +
                        age + 
                        " year" + (age == 1 ? '' : 's') +
                        " ago");
        }
        if (age == 0) {
                var container = document.createTextNode(", This year");
        }
        if (age <= -1) {
                var container = document.createTextNode(", in " +
                        Math.abs(age) + 
                        " year" + (Math.abs(age) == 1 ? '' : 's'));
        }

        /* find place to stick the info */
        var nodes = document.evaluate(
                /* old style and new style */
                "//a[contains(@href,'year')]|//span[contains(@class,'nobr')]",
                document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        /* create new span with formatting to match */
        var span = document.createElement('span');
        span.style.fontSize = "15px";
        span.appendChild(container);

        /* should be the first occurrence of the latter */
        var node = nodes.snapshotItem(0);
        /* attach it */
        node.parentNode.insertBefore(span, node.nextSibling);
}

/*
find out if we are using the newstyle on not, works on name and title pages
*/
function newStyle() {
        var nodes = document.evaluate( "//div[@id='tn15content']", document,
                null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (nodes.snapshotLength == 1) {
                return false
        } else {
                return true
        }
}

/* two options, either is a name page ... */
if (window.location.href.indexOf('name') != -1) {
        born = new Date();
        died = new Date();
        /* get needed dates */
        var alive = getNameDates(born, died);

        /* add wanted bits */
        if(doSigns == true) {
                addSigns(born);
        }
        if(doNameAge == true) {
                addAge(alive, born, died);
        }
        if(doNameAges == true) {
                addAges(born.getFullYear());
        }

/* ... or a title page */
} else if (window.location.href.indexOf('title') != -1) {
        /* get needed dates */
        filmAge = getTitleDates();

        /* add wanted bits */
        if(doFilmAge == true) {
                addFilmAge(filmAge);
        }
}
