// ==UserScript==
 // @name            Apple Trailer Download
 // @namespace       http://www.manuelseeger.de
 // @description     Download the movie trailers from apple.com
 // @include         http://*apple.com/trailers/*
 // @version         2.1.5
// ==/UserScript==


(function() {
// the box holding the links to the full movies:
atdcontainer = document.createElement("div");
atdcontainer.mh = 35; // height of containerbox

// reset styles we may have inherited from <body>
var style = "display: none; background-color: #999; "+
    "position: fixed; width: 100px; height: 35px; " +
    "right: 10px; bottom: 10px; z-index: 900;padding:5px;"+
    "text-align:left;-moz-opacity: 0.8;border:2px solid #333;" +
    "font-family:Arial;color:#333;";
atdcontainer.setAttribute("style", style);
atdcontainer.innerHTML = 
        '<p style="font-weight:bold;font-size:8pt;'+
        'margin:0 0 5px 0;padding:0;">'+
        'Apple Trailer Download:</p>';
linkcontainer = document.createElement("ul");
linkcontainer.setAttribute("style", 
    "list-style-image:url(http://www.apple.com/favicon.ico);" +
    "margin:0;padding-left:25px;vertical-align:middle;");

atdcontainer.appendChild(linkcontainer);
document.body.insertBefore(atdcontainer,document.body.firstChild);
/**
 * Insert an absolute positioned div-box at
 * the upper left corner of the embed element found
 * in getDownloadLink()
 */ 
function insertDownloadLink(movie_url, res) {
    var title = "Download Trailer (" + res + ")";
    res = parseInt(res);
    // actually, the resolution is not always 4/3, but hey...
    var smilie = ""+res + "x"+(res*0.75);
    
    inner_html = ''+
        '<a title="'+title+'" href="'+movie_url+'" ' +
                 'style="color:#333;font-weight:900;font-size:8pt;'+
                 'text-decoration:none;">' +
                 smilie + '</a>';
    var li = document.createElement("li");
    li.innerHTML = inner_html;
    linkcontainer.appendChild(li);
    atdcontainer.style.display = "block";
    atdcontainer.mh = atdcontainer.mh + 25;
    atdcontainer.style.height = atdcontainer.mh + 'px';
}
/**
 * Scans the page for quicktime movies. 
 * 
 * The method first tries to locate <embed> objects holding the links
 * to quicktime movies via XPath. 
 * If that does not work, the method searches for URLs to quicktime
 * movies within all <script> areas. Apple sometimes injects the 
 * <embed> object after the page has loaded using scripting. 
 *
 * All movie URLs found will then be downloaded and processed
 */
function getDownloadLink() {

    var sources = new Array();
    var src_url = "";
    var j = 0;
    // TODO: find a better way to determine if the found 
    // movies are real trailers or just hyperlink replacements
    // pass 1:
    var nobjects = xpath(document, "//object/embed[@height > 100]");
    
    if (nobjects.length == 0) {
        // pass 2: search in (embedded) script areas
        var scripts = xpath(document, "//script[not(@src)]/text()");
        for (j=0; j < scripts.length; j++) {
            regex = /.*(http:\/\/(movies|images).apple.com\/movies\/[\w-._]+\/[\w-._]+\/.+\.mov).*/i;
            if (regex.test(scripts[j].nodeValue)) {
                var result = regex.exec(scripts[j].nodeValue);
                src_url = result[1];
                sources.push(src_url);
            }
        }
    } else {
        for (j=0; j<nobjects.length; j++) {
            if (nobjects[j] != null) {
                // some trailer reference the quicktime file via href
                src_url = nobjects[j].getAttribute("href");
                if (src_url == null) {
                    src_url = nobjects[j].getAttribute("src");
                }
                sources.push(src_url);
            }
        }
    }
       
    for (j=0; j<sources.length; j++) {
        /**
         * Anynchronously fetches the quicktime streaming file
         * via an xmlhttpRequest.
         * That one is only a dummy Quicktime movie, pointing to the
         * full movie. The path to the full movie seems to
         * begin at position 44 in the streaming file (open one
         * with a hex editor).
         * The onload() callback reads this path and
         * passes the URL to the full movie to insertDownloadLink()
         */
        GM_xmlhttpRequest({ // start of xmlHTTPRequest()
        method: 'GET',
        url: sources[j],
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': '*/*'
        },
        onload: function(responseDetails) {

            var path_default = readQtDummyFile(responseDetails.responseText, 44);
            if (path_default.indexOf(".mov") != (path_default.length-4)) {
                // no URL found!
                insertDownloadLink("", 0);
            } else {
                var pos = this.url.lastIndexOf("/")+1;
                var url_default = this.url.substring(0,pos)+path_default;
                
                if (this.url.indexOf("-h.ref.mov") == -1) {
                    // custom or HD trailer page, we are done:
                    var res = path_default.replace(/.*([0-9]{4}).?\.mov/, "$1");
                    if (res == path_default) {
                        var res = path_default.replace(/.*([0-9]{3}).*/, "$1");
                    }
                    insertDownloadLink(url_default, res);
                } else {
                    // default trailer page, get the other resolutions:
                    // Many thanks to Hans Schmidt for this code 
                    // 
                    // 12/21/2007: update: 	this is deprecated now, as trailer URLs
                    //						seem to always end the same way now
                    //
                    //var url_480 = readQtDummyFile(responseDetails.responseText, 
                    //            (44+path_default.length+99));
                                
                    //url_480 = this.url.substring(0,pos)+url_480;
                    pos = url_default.lastIndexOf(".")-3;
                    var url_480 = url_default.substring(0,pos)+"480.mov";
                    
                    var url_640 = url_default.substring(0,pos)+"640w.mov";
    
                    insertDownloadLink(url_default, 320);
                    insertDownloadLink(url_480, 480);
                    insertDownloadLink(url_640, 640);
                }
            }
        },
        onerror: function(responseDetails) {
            alert(responseDetails.status);
        }
        }); // end of xmlHTTPRequest()
    }
}

function xpath(node, expr) {

    var resultSet =  document.evaluate(expr, node, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var found = [];
    var res;
    for (var i = 0; i < resultSet.snapshotLength; i++) {
        found.push(resultSet.snapshotItem(i));
    }
    return found;
}
/**
 * Reads the filename of the full quicktime movie
 */
function readQtDummyFile(res, start_pos) {
    
    var p = start_pos;
    var p1 = 0;
    var p2 = 0;
    var p3 = 0
    var p4 = 0;
    var path = "";

    while (false == 
                // the movie's path should 
                // end with this code sequence:
               (p4 == 46 &&
                p3 == 109 &&
                p2 == 111 &&
                p1 == 118 &&
                res.charCodeAt(p) == 0) &&
            p < (start_pos+150)) {
        
        path += res.charAt(p);
        
        p4 = p3;
        p3 = p2;
        p2 = p1;
        p1 = res.charCodeAt(p);
        
        p = p + 1;
    }
    return path;
}

window.addEventListener("load", function() { getDownloadLink(); }, false);
})();
