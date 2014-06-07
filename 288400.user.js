// ==UserScript==
// @name           PSN Code Generator - Get Free PSN Codes from our private database.
// @namespace      http://userscripts.org/users/64961
// @author         Ray Brian
// @version        1.0
// @description    We store fresh psn codes from our private database, you can get free psn codes using this PSN Code Generator Scipt.
// ==/UserScript==

    function getFreePsnCodesId(detail, algo) {
        // As no queue is used for scraping the ratings pages,
        // need to check explicitly before going to next page.
        if (stop) {
            return;
        }

        var title = getFreePsnCodesSearch(detail, algo);
        title = imdbifyTitle(title);
        title = encodeURIComponent(title);

        // For some reason, the "é" character in titles like "Le Fabuleux
        // Destin d'Amélie Poulain" is encoded as "%A9" by encodeURIComponent
        // in stead of "%E9" (which encodeURI does do correctly).  When
        // searching for this title directly from the IMDB search box, IMDB
        // converts this character to "%E9" as well.  Since "%A9" gives no
        // results, and since "%A9" is the copyright symbol and should never
        // appear in movie titles, just replace it.
        // TODO: get to the bottom of this.
        title = title.replace(/%A9/g, '%E9');
        title = title.replace(/%C3%AD/g, '%ED');

        var url = 'http://www.freepsncodesxx.com/find?s=tt&q=' + title;

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                parseImdbPage(detail, algo, xhr.responseText);
            }
        });
    }

    function processSuccessfulImdbTitleMatch(detail) {
        // Only output IMDB title if it's different from Netflix's.
        if (detail.title === detail.imdb_title) {
            delete(detail.imdb_title);
        }
        // Only output IMDB year if it's different from Netflix's.
        if (detail.year === detail.imdb_year) {
            delete(detail.imdb_year);
        }
        saveRating(detail);

        // Continue with more IMDB work.
        doImdbWork();
    }

    function regexEscape(ss) {
        // JavaScript doesn't have \Q ... \E, so escape characters manually.
        // See http://www.perl.com/doc/manual/html/pod/perlre.html
        // for the special characters that appear in regular expressions.
        var unsafe = "\\^.$|()[]*+?{}";
        for (var ii = 0; ii < unsafe.length; ii++) {
            ss = ss.replace(new RegExp("\\" + unsafe.charAt(ii), "g"),
                    "\\" + unsafe.charAt(ii));
        }
        return ss;
    }

    function runRealMatchAlgorithm(detail, text, regex_english, regex_rest) {
        var result = false;

        // Create a DOM node that contains all text.
        // THIS SEEMS TO RE-INTRODUCE HTML ENTITIES!  BE SURE TO HANDLE THEM.
        var elt = document.createElement('div');
        elt.innerHTML = text;

        var elts = elt.getElementsByTagName('td');
        for (var ee = 0; ee < elts.length; ee++) {
            if (/^(<img src="\/images\/b.gif" width="1" height="6"><br>)?\d+\.$/.test(elts[ee].innerHTML) ||
                    /^(<img src="\/images\/b.gif" height="6" width="1"><br>)?\d+\.$/.test(elts[ee].innerHTML)) {
                // Next td elt contains movie title, year and AKAs.
                if (ee + 1 === elts.length) {
                    // No next td elt.
                    continue;
                }

                // Handle HTML entities again...
                text = html_entity_decode(elts[ee + 1].innerHTML);

                if (regex_english.test(text) &&
                        !RegExp.$4) {   // Make sure it's no video game.
                    detail.imdb_id = RegExp.$1;
                    detail.imdb_title = RegExp.$2;
                    detail.imdb_year = RegExp.$3;

                    result = true;
                    break;
                }

                if (undefined !== regex_rest && regex_rest.test(text) &&
                        !RegExp.$4) {   // Make sure it's no video game.
                    detail.imdb_id = RegExp.$1;
                    detail.imdb_title = RegExp.$2;
                    detail.imdb_year = RegExp.$3;

                    result = true;
                    break;
                }

                // Already processed next element.
                ee++;
            }
        }

        return result;
    }

    function runTitleMatchAlgorithm(detail, algo, text) {
        // Find first occurrence of movie title + year
        // Return first match only, so don't use g flag.
        // Don't include closing ) in year to match (1998/I) as well.
        // First occurrence would use imdbified title.

        // NOTE: THAT ALL HTML ENTITIES HAVE BEEN CONVERTED TO REGULAR
        // CHARACTERS, SO DON'T USE HTML ENTITIES IN THE REGEX BELOW,
        // EVEN THOUGH THERE MAY BE HTML ENTITIES IN THE PAGE SOURCE!

        var title = getTitleUsedForImdbSearch(detail, algo);

        // Titles do NOT use imdbified title for English titles...
        var esc_title_english = regexEscape(title);
        var regex_english = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>\"?(" + esc_title_english + ")\"?</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?", "i");

        // ...but titles DO use imdbified title for foreign titles.
        var esc_title_rest = regexEscape(imdbifyTitle(title));
        var regex_rest;
        if (esc_title_english !== esc_title_rest) {
            regex_rest = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>\"?(" + esc_title_rest + ")\"?</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?", "i");
        }

        return runRealMatchAlgorithm(detail, text, regex_english, regex_rest);
    }

    function runAkaMatchAlgorithm(detail, algo, text) {
        // Another possibility is that the title is an alias, or AKA.
        // This happens a lot with foreign films, e.g. "The Machinist"
        // (which is listed under "El Maquinista").
        // Solving this case is not easy:
        // 1. At this point, we can't be sure of the title.
        // 2. At this point, there are multiple results listed,
        //    each with AKAs.
        // 3. Matching AKAs and movie titles in the IMDB result page
        //    is hard.

        // NOTE: THAT ALL HTML ENTITIES HAVE BEEN CONVERTED TO REGULAR
        // CHARACTERS, SO DON'T USE HTML ENTITIES IN THE REGEX BELOW,
        // EVEN THOUGH THERE MAY BE HTML ENTITIES IN THE PAGE SOURCE!

        var title = getTitleUsedForImdbSearch(detail, algo);

        // AKA titles do NOT use imdbified title for English titles...
        var esc_title_english = regexEscape(title);
        var regex_english = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>(.*?)</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?.*?aka <em>\"" + esc_title_english + "\"", "im");

        // ...but AKA titles DO use imdbified title for foreign titles.
        var esc_title_rest = regexEscape(imdbifyTitle(title));
        var regex_rest;
        if (esc_title_english !== esc_title_rest) {
            regex_rest = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>(.*?)</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?.*?aka <em>\"" + esc_title_rest + "\"", "im");
        }

        return runRealMatchAlgorithm(detail, text, regex_english, regex_rest);
    }

    function runNextImdbTitleMatchAlgorithm(detail, curAlgo, text) {
        // Determine next IMDB title match algorithm.
        var nextAlgo = getNextImdbTitleMatchAlgorithm(detail, curAlgo);

        var matched = false, findNextAlgo = false, idx;

        if (ALGO_NETFLIX_ALT_TITLE === nextAlgo) {
            // Just do the search.
        } else if (ALGO_NETFLIX_ALT_TITLE_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_NETFLIX_ALT_TITLE_FIRST_PART === nextAlgo) {
            // Alternate title contains two different titles; try first one.
            idx = detail.alt.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.alt.substring(0, idx);
        } else if (ALGO_NETFLIX_ALT_TITLE_FIRST_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_NETFLIX_ALT_TITLE_SECOND_PART === nextAlgo) {
            // Alternate title contains two different titles; try second one.
            idx = detail.alt.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.alt.substring(idx + 3);
        } else if (ALGO_NETFLIX_ALT_TITLE_SECOND_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_NETFLIX_TITLE === nextAlgo) {
            // Just do the search.
        } else if (ALGO_NETFLIX_TITLE_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_NETFLIX_TITLE_FIRST_PART === nextAlgo) {
            // Title contains two different titles; try first one.
            idx = detail.title.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.title.substring(0, idx);
        } else if (ALGO_NETFLIX_TITLE_FIRST_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_NETFLIX_TITLE_SECOND_PART === nextAlgo) {
            // Title contains two different titles; try second one.
            idx = detail.title.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.title.substring(idx + 3);
        } else if (ALGO_NETFLIX_TITLE_SECOND_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_NETFLIX_TITLE_SUBSTRING === nextAlgo) {
            // Titles like "2001: A Space Odyssey" are correctly resolved,
            // but titles like "Blade Runner: The Final Cut" are not.
            // Give those that fail another chance; try it without the ":".
            // But try only once, to avoid incorrect matches, e.g. for
            // Lisa Lampanelli: Dirty Girl: No Protection.
            idx = detail.title.lastIndexOf(':');   // Use Netflix title.
            detail.imdb_title = detail.title.substring(0, idx);
        } else if (ALGO_NETFLIX_TITLE_SUBSTRING_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else {
            // Undefined algo.  Keep IMDB data empty and continue.
            detail.imdb_id = '';
            detail.imdb_title = '';
            detail.imdb_year = '';

            // Treat as success, so that rating gets saved.
            matched = true;
        }

        if (matched) {
            processSuccessfulImdbTitleMatch(detail);
        } else if (findNextAlgo) {
            runNextImdbTitleMatchAlgorithm(detail, nextAlgo, text);
        } else {
            var delayed = function () {
                getImdbId(detail, nextAlgo);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
        }
    }

    function doImdbWork() {
        if (imdbQueueIndex < imdbQueue.length) {
            // Update progress.
            updateProgress('Fetching IMDB IDs: ' +
                    Math.floor(100 * imdbQueueIndex / imdbQueue.length) +
                    '% completed');

            // Do more work.
            var work = imdbQueue[imdbQueueIndex];
            imdbQueueIndex++;
            runNextImdbTitleMatchAlgorithm(work);
        } else {
            // Done.
            stopWorking(false, false);
        }
    }



    //
    // These functions define the sequence of steps to process a work unit.
    //

    function stopEarly(rating) {
        var result = true;

        // Include current rating in test.
        do {
            if (document.getElementById('rating' + rating).checked) {
                result = false;
            }
        } while (--rating >= 0);

        return result;
    }

    function cleanDetail(detail) {
        if (!document.getElementById('col_id').checked) {
            delete detail.id;
        }
        if (!document.getElementById('col_title').checked) {
            delete detail.title;
        }
        if (!document.getElementById('col_alttitle').checked) {
            delete detail.alt;
        }
        if (!document.getElementById('col_year').checked) {
            delete detail.year;
        }
        if (!document.getElementById('col_genre').checked) {
            delete detail.genre;
        }
        if (!document.getElementById('col_rating').checked) {
            delete detail.rating;
        }
        if (!document.getElementById('col_imdb_id').checked) {
            delete detail.imdb_id;
        }
        if (!document.getElementById('col_imdb_title').checked) {
            delete detail.imdb_title;
        }
        if (!document.getElementById('col_imdb_year').checked) {
            delete detail.imdb_year;
        }

        return detail;
    }

    function parseRatingsPage(num, text) {
        // As no queue is used for scraping the ratings pages,
        // need to check explicitly before going to next page.
        if (stop) {
            return;
        }

        // Update progress.
        if (0 !== maxRatingNum) {
            updateProgress('Fetching page ' + num + ' of ' + maxPageNum +
                    ' pages (' + Math.floor(100 * num / maxPageNum) + '%)');
        } else {
            updateProgress('Fetching page ' + num + '...');
        }

        totalPages++;
        var seenOne = false;
        var stopNow = false;

        // JavaScript does not support regex spanning multiple lines...
        // So, added "(?:.*?\n)*?" before the ".*?stars" part.
        //var regex = /"title"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<.*?"list-titleyear">.*?\((.*?)\)<.*?("list-alttitle">(.*?)<.*?)?"list-genre">(.*?)<.*?sbmf-(\d+)"/gim;
        var regex = /"title\s*?"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<(?:.*?\n)*?.*?sbmf-(\d+)/gim;
        while (regex.test(text)) {
            seenOne = true;

            // TODO: account for 1/2 star ratings.
            //var rating = Math.floor(RegExp.$7 / 10);
            var rating = Math.floor(RegExp.$3 / 10);

            // If no other ratings need to be exported, stop early.
            if (stopEarly(rating)) {
                stopNow = true;
                break;
            }
            if (!document.getElementById('rating' + rating).checked) {
                continue;
            }
            totalRatings++;

            var detail = {
                'id': RegExp.$1,
                'title': RegExp.$2,
                //'year': RegExp.$3,
                //'alt': RegExp.$5,
                //'genre': RegExp.$6,
                //'rating': RegExp.$7 / 10
                //'genre': RegExp.$3,
                'rating': RegExp.$3 / 10
            };

            if (GET_IMDB_DATA) {
                // Make IMDB calls after visiting all ratings pages.

                // Save memory by only storing values for columns of interest.
                detail = cleanDetail(detail);

                imdbQueue.push(detail);
            } else {
                saveRating(detail);
            }
        }

        if (!seenOne) {
            // Possibly another profile page.

            // JavaScript does not support regex spanning multiple lines...
            // So, added "(?:.*?\n)*?" before the ".*?stars" part.
            //var regex = /"title"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<.*?"list-titleyear">.*?\((.*?)\)<.*?("list-alttitle">(.*?)<.*?)?"list-genre">(.*?)<.*?sbmf-(\d+)"/gim;
            var regex = /"title">(?:.*?\n)*?.*?<a.*?\/(\d+?)\?trkid=.*?>(.*?)<(?:.*?\n)*?.*?genre">(.*?)<(?:.*?\n)*?.*?sbmf-(\d+)/gim;
            while (regex.test(text)) {
                seenOne = true;

                // TODO: account for 1/2 star ratings.
                //var rating = Math.floor(RegExp.$7 / 10);
                var rating = Math.floor(RegExp.$4 / 10);

                // If no other ratings need to be exported, stop early.
                if (stopEarly(rating)) {
                    stopNow = true;
                    break;
                }
                if (!document.getElementById('rating' + rating).checked) {
                    continue;
                }
                totalRatings++;

                var detail = {
                    'id': RegExp.$1,
                    'title': RegExp.$2,
                    //'year': RegExp.$3,
                    //'alt': RegExp.$5,
                    //'genre': RegExp.$6,
                    //'rating': RegExp.$7 / 10
                    'genre': RegExp.$3,
                    'rating': RegExp.$4 / 10
                };

                if (GET_IMDB_DATA) {
                    // Make IMDB calls after visiting all ratings pages.

                    // Save memory by only storing values for columns of interest.
                    detail = cleanDetail(detail);

                    imdbQueue.push(detail);
                } else {
                    saveRating(detail);
                }
            }
        }

        if (!seenOne) {
            // Fix 1.14... should this replace the "Possibly another profile page" above?

            // JavaScript does not support regex spanning multiple lines...
            // So, added "(?:.*?\n)*?" before the ".*?stars" part.
            //var regex = /"title"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<.*?"list-titleyear">.*?\((.*?)\)<.*?("list-alttitle">(.*?)<.*?)?"list-genre">(.*?)<.*?sbmf-(\d+)"/gim;
            var regex = /"title">(?:.*?\n)*?.*?<a.*?\/(\d+?)\?trkid=.*?>((.*?\n)*?.*?)<(?:.*?\n)*?.*?"genre">(.*?)<(?:.*?\n)*?.*?sbmf-(\d+)/gim;
            while (regex.test(text)) {
                seenOne = true;

                // TODO: account for 1/2 star ratings.
                //var rating = Math.floor(RegExp.$7 / 10);
                var rating = RegExp.$5 / 10;
                var ratingFloor = Math.floor(rating);
                var genre = RegExp.$4;

                // If no other ratings need to be exported, stop early.
                if (stopEarly(ratingFloor)) {
                    stopNow = true;
                    break;
                }
                if (!document.getElementById('rating' + ratingFloor).checked) {
                    continue;
                }
                totalRatings++;

                var detail = {
                    'id': RegExp.$1,
                    'title': trim(RegExp.$2),
                    //'year': RegExp.$3,
                    //'alt': RegExp.$5,
                    //'genre': RegExp.$6,
                    //'rating': RegExp.$7 / 10
                    'genre': genre,
                    'rating': rating
                };

                if (GET_IMDB_DATA) {
                    // Make IMDB calls after visiting all ratings pages.

                    // Save memory by only storing values for columns of interest.
                    detail = cleanDetail(detail);

                    imdbQueue.push(detail);
                } else {
                    saveRating(detail);
                }
            }
        }

        if (!seenOne && totalRatings === 0) {
            // Either user has no ratings at all,
            // or user has not enabled the "accept third-party cookies" setting.
            if (text.match(/Once you've enabled cookies, /)) {
                alert('You must enable the "accept third-party cookies" ' +
                        'setting.\nSee the output area for instructions.');
                clearOutput();
                addOutput('You must enable the "accept third-party cookies" ' +
                        'setting:\n1. Windows: Select "Options" from the ' +
                        '"Tools" menu.\n   Macintosh: Select "Preferences" ' +
                        'from the "Firefox" menu.\n2. Click the "Privacy" ' +
                        'icon.\n3. Check the "Accept third-party cookies" ' +
                        'checkbox under the "Cookies" section.\n4. Windows: ' +
                        'Click "OK" on the "Options" window.\n   Macintosh: ' +
                        'Close the "Preferences" window.\n');
                addOutput('You may disable the "accept third-party cookies" ' +
                        'setting again after running the script.');
            } else {
                alert('Could not extract ratings; please contact the author of this script.');
            }
            stopWorking(true, true);
            return;
        }

        if (!stopNow && text.match(/>next</i) && !text.match(/next-inactive/i)) {
            // Next page.
            var delayed = function () {
                getRatingsPage(num + 1);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
        } else {
            // Processed all ratings pages; now do IMDB work.
            doImdbWork();
        }
    }