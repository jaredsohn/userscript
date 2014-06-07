// ==UserScript==
// @name           YouTube Video Original Page with Title
// @namespace      http://umn.edu/~hick0088/
// @description    Provides link to the original page of a YouTube video from a page which has an embedded YouTube Video.
// @include        *
// @exclude        http://www.youtube.com/*
// @exclude        http://youtube.com/*
// ==/UserScript==
//
// Originally authored by Binny V A [See http://userscripts.org/people/13930]
// Title retrieval added by Mike Hicks [See http://userscripts.org/users/25406]
//
// Bugs: This doesn't work when the video only uses an <embed> tag...
//

(function() {
    //Get all the object tags
    //Use this page for testing...
    //http://www.joshuakucera.net/2007/03/ok_this_youtube.html
    var all_objects = document.getElementsByTagName('object');
    var obj_urls = new Array();
    var default_title = "YouTube - video page";
    for(var i=0; i<all_objects.length; i++) {
        var obj = all_objects[i];
        if(obj.getElementsByTagName("param")) {
            var all_params = obj.getElementsByTagName("param");
            // Go through each 'param' tag to get the movie
            for(var j=0; j<all_params.length; j++) {
                var param = all_params[j];
                if(param.getAttribute("name") == "movie") {
                    var movie = param.getAttribute("value");

                    if(movie.indexOf('youtube.com') == -1) continue;

                    // Convert:  http://www.youtube.com/v/UjA0mPTxjo0 
                    // to:       http://www.youtube.com/watch?v=UjA0mPTxjo0
                    var url = movie.replace(/\/v\/([^&]+).*$/,"/watch?v=$1");

                    // Create an 'a href' element and add it after the object
                    var link = document.createElement("a");
                    link.setAttribute("href", url);
                    link.appendChild(document.createTextNode(default_title));

                    obj.parentNode.insertBefore(link,obj.nextSibling);
                    var br = document.createElement("br");
                    obj.parentNode.insertBefore(br,obj.nextSibling);

                    // save object index & url so we can change the title later
                    obj_urls[i] = url;

                    // Fire off a request to retrieve the actual YouTube page
                    // so we can get the title
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        onload: function(details) {
                            // forget everything you think you know at this
                            // point, since we've just been called
                            // asynchronously after the page loaded

                            // get the page title, to use for link
                            var mytitle = details.responseText.match(/<title>([^<]+)/)[1];
                            // retrieve the video ID from the response text
                            // so we can find the right link to replace (since
                            // some pages have more than one video on them)
                            var vid = details.responseText.match(/ajax\?v=([^&"]+)/)[1];
                            var myurl = "http://www.youtube.com/watch?v=" + vid;

                            // find the <object> which has the associated title
                            var myobj;
                            for (var k=0; k<obj_urls.length; k++) {
                                if (obj_urls[k] == myurl) {
                                    myobj = all_objects[k];
                                    break;
                                }
                            }
                            // find the link we added and change the title.
                            // start at the <object>, skip past the <br/>, and
                            // get the <a ...></a>
                            if (myobj) {
                                if (link = myobj.nextSibling.nextSibling) {
                                    link.childNodes[0].nodeValue = mytitle;
                                }
                            }
                            // if myobj didn't exist, the original video has
                            // probably been taken down
                        }
                    });

                }
            }
        }
    }
})();
// vim:set sw=4 ts=4 expandtab: