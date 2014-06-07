// ==UserScript==
// @name           icimdb
// @namespace      icimdb
// @description    Add a [C] link (check on icheckmovies.com) to every movie link on imdb.
// @include        http://www.imdb.com/*
// @exclude        http://www.imdb.com/var/*
// @exclude        http://www.imdb.com/images/*
// ==/UserScript==


/*
   A new [C] link is added after almost every movie title on a imdb
   page.  Once clicked, the script checks that movie on ICM (or adds it
   to the ICM movie queue).

   To check a movie, we POST on icheckmovies.com/movie/check/ with the
   user_id and the movie_id. The user_id is retrived on each imdb page
   but the movie_id is a bit more complex to get.

   Once the [C] is clicked, the [C] turns to orange and the imdb url
   is posted on the "Add Movie" section of ICM.  If the movie is
   already on ICM, the script GETs its page to retrive the movie_id in
   order check to movie.
   
   If the movie is not yet on ICM, it's added on the ICM queue.
   When a movie is successfully checked, the [C] link turns green.
*/


// Main
GM_log(window.location.href);
fetch_uid();
add_link();


// POST data to send in Add Movie section
function post_data (movie) {
    var id = String(movie.uid);
    var url = movie.imdb_url;
    var bound = 'YouJustLostTheGame';
    var nl = "\r\n";
    var d =
              '--'+bound + nl +
              'Content-Disposition: form-data; name="import[user_id]"'
              +nl+nl+ id +nl+

              '--'+bound + nl +
              'Content-Disposition: form-data; name="import[movieurls]"'
              +nl+nl+ url +nl+

              '--'+bound + nl +
              'Content-Disposition: form-data; name="import[mymoviesurl]"'
              +nl+nl+nl+

              '--'+bound + nl +
              'Content-Disposition: form-data; name="importFile"; filename=""'+
              nl+
              'Content-Type: application/octet-stream'+
              nl+nl+nl+ '--'+bound+'--' +nl
    var h = { 'Content-Type': 'multipart/form-data; boundary='+bound,
              'Content-Length': d.length };
    return { data: d, headers: h };
}

function fetch_uid () {
    GM_xmlhttpRequest({
        method: "GET", url: 'http://www.icheckmovies.com/movie/braindead/',
        onload: function (r) {
            var uid = icm_uid(r.responseText);
            if(uid)
                GM_setValue('uid', uid);
        }
    });
}


function icm_uid (src) {
    var a = $x("//input[@name='comment[user_id]']", src);
    if(a.length == 1)
        return a[0].value;
}

// Get ICM link from the Add Movie result
function icm_link (src) {
    var a = $x("id('content')//ul//a", src);
    if(a.length == 1 && a[0].href.indexOf("http://www.imdb.com") == -1)
        return 'http://icheckmovies.com'+a[0].href;
}

// Get the ICM id from ICM movie page
function icm_id (src) {
    var a = $x("//input[@name='comment[reference_id]']", src);
    if(a.length == 1)
        return a[0].value;
}

function check_wait (movie) {
    GM_log(movie.imdb_url + ' start');
    movie.elem.style.color = 'orange';
}

function check_ok (movie) {
    GM_log(movie.imdb_url + ' ok');
    movie.elem.style.color = 'green';
}

function check_err (movie) {
    GM_log(movie.imdb_url + ' fail');
    movie.elem.style.color = 'red';
}


// [C] onclick
function click (e) {
    var movie = {
        uid: GM_getValue('uid'),
        imdb_url: e.target.title,
        elem: e.target,
    };

    if(movie.uid)
        check_movie(movie);
    else
        alert("Script imdb-icheckmovies: you are not connected on ICM.");
}

function check_movie (movie) {
    check_wait(movie);

    req = post_data(movie);

    // POST in Add Movie
    GM_xmlhttpRequest({
        method: "POST", url: "http://www.icheckmovies.com/import/movies/",
        data: req.data, headers: req.headers,
        onload: function(r) {
            movie.icm_url = icm_link(r.responseText);

            if(!movie.icm_url) {
                check_err(movie);
                return;
            }


            // GET icm url
            GM_xmlhttpRequest({
                method: "GET", url: movie.icm_url,
                onload: function (r) {
                    movie.icm_id = icm_id(r.responseText);

                    if(!movie.icm_id) {
                        check_err(movie);
                        return;
                    }

                    // POST check movie
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://www.icheckmovies.com/movie/check/",
                        data: 'check%5Bmovie_id%5D='+movie.icm_id+
                              '&check%5Buser_id%5D='+movie.uid+
                              '&check%5Btype%5D=check',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Referer': movie.icm_url,
                            'Content-Type': 'application/x-www-form-urlencoded;'+
                                            ' charset=UTF-8'
                        },
                        onload: function (r) {
                            check_ok(movie);
                        }
                    });
                }
            });
        }
    });
}

// insert [C] link after e
function new_check_link (e, url) {
    var a = document.createElement('a');
    a.title = url || e.href;
    a.href= 'javascript:;';
    a.style.fontWeight = "bold";
    a.style.fontSize = "small";
    a.style.textDecoration = "none";
    a.appendChild(document.createTextNode('[C]'));
    a.addEventListener("click", click, true);
    e.parentNode.insertBefore(a, e.nextSibling);
}

// Add [C] everywhere
function add_link () {
    var regex = /(?:^|\.com)\/title\/tt\d+\/$/i;
    var links = document.getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--) {
        var e = links[i];
        if(regex.test(e.href))
            new_check_link(e);
    }

    if(regex.test(window.location.href)) {
        var span = $x("//h1[@class='header']/span[1]")[0];
        if(span)
            new_check_link(span, window.location.href);

    }
}

// xpath helper from https://gist.github.com/976099 by romer
function $x (xpath, dc) {
    function createHTMLDocument (src) {
        var srcString = '';
        if (typeof src == 'string') {
            srcString = src;
        }

        var _createDoc = function (source) {
            var doc = document.implementation.createHTMLDocument('');
            var range = doc.createRange();
            range.selectNodeContents(doc.documentElement);
            range.deleteContents();
            doc.documentElement.appendChild(range.createContextualFragment(source));
            return doc;
        };
        if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {
            _createDoc = function (source) {
                var doctype = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd');
                var doc = document.implementation.createDocument(null, 'html', doctype);
                var range = document.createRange();
                range.selectNodeContents(document.documentElement);
                var content = doc.adoptNode(range.createContextualFragment(source));
                doc.documentElement.appendChild(content);
                return doc;
            };
        }
        return _createDoc(srcString);
    }

    var ns = [], r = null, n = null;
    var ct = dc || document.documentElement;
    var od = ct.ownerDocument;
    if (typeof dc == 'object' && typeof dc.nodeType == 'number') {
        if (dc.nodeType == 1 && dc.nodeName.toUpperCase() == 'HTML') {
            ct = createHTMLDocument(dc.innerHTML);
            od = ct;
        }
        else if (dc.nodeType == 9) {
            ct = dc.documentElement;
            od = dc;
        }
    }
    else if (typeof dc == 'string') {
        ct = createHTMLDocument(dc);
        od = ct;
    }

    try {
        r = od.evaluate(xpath, ct, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for ( var i = 0, l = r.snapshotLength; i < l; i++) {
            ns.push(r.snapshotItem(i));
        }
    }
    catch (e) {
        try {
            var results = od.evaluate(xpath, ct, null, XPathResult.ANY_TYPE, null);
            switch (results.resultType) {
                case XPathResult.NUMBER_TYPE:
                    ns.push(Number(results.numberValue));
                    break;
                case XPathResult.STRING_TYPE:
                    ns.push(String(results.stringValue));
                    break;
                case XPathResult.BOOLEAN_TYPE:
                    ns.push(Boolean(results.booleanValue));
                    break;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    while (n = results.iterateNext()) {
                        ns.push(n);
                    }
                    break;
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    return ns;
}
