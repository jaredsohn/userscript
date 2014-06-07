    // ==UserScript==
    // @name        4chan thread flags
    // @namespace   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
    // @include     http://boards.4chan.org/int/res*
    // @include     https://boards.4chan.org/int/res*
    // @include     http://boards.4chan.org/sp/res*
    // @include     https://boards.4chan.org/sp/res*
    // @include     http://boards.4chan.org/pol/res*
    // @include     https://boards.4chan.org/pol/res*
    // @version     1.0
    // @run-at document-end
    // ==/UserScript==
     
     
    (function() {
            //var additionalCountries = ["ru"];     // put your favourite countries here.
     
            var Countries = {};
            var Flags = {}; // stores dom elements for flags, so I don't have to bother with recreating them
            /*for (var i=0; i<additionalCountries.length; i++)
                    Countries[ additionalCountries[i] ] = [];*/
     
            function parsePost(postContainer) {
                    var flag = postContainer.querySelector(".post .postInfo .nameBlock img.countryFlag");
                    var id   = postContainer.querySelector(".post").id;
     
                    var country = flag.alt.toLowerCase(); // .title, match from src ?
     
                    if (! Countries[country])
                            Countries[country] = [ id ];
                    else
                            Countries[country].push(id);
     
                    if (!Flags[country])
                            Flags[country] = flag.cloneNode(false);
            }
     
            function generateUI() {
                    UI.innerHTML = "";
     
                    var h = document.createElement("h4")
                    h.innerHTML = "Countries in this thread";
     
                    var list = document.createElement("ul")
     
                    for (country in Countries) {
                            var item = document.createElement("li");
                            item.appendChild(Flags[country].cloneNode(false));
                            item.appendChild( document.createTextNode(" " + Countries[country].length) );
                            list.appendChild(item);
                    }
     
                    UI.appendChild(h);
                    UI.appendChild(list);
            }
           
            var posts = document.getElementsByClassName("postContainer");
            for (var i=0; i<posts.length; i++)
                    parsePost(posts[i]);
     
            //console.log(Countries);
            //console.log(Flags);
     
            // create UI
            var UI = document.createElement("div");
            UI.id = "flags-ui";
            UI.classList.add("reply");
     
            generateUI();
     
            document.body.appendChild(UI);
     
            // watch for new replies
            var threadContainer = document.querySelector("div.thread");
            threadContainer.addEventListener("DOMNodeInserted", function(event) {   // moot, Y U no extension API?
                    if (event.target instanceof HTMLElement && event.target.classList.contains("postContainer")) {
                            //console.log("New reply.");
                            parsePost(event.target);
                            generateUI();
                    }
            });
     
            // Set up handlers
            UI.addEventListener("click", function(event) {
                    var flag;
                    // todo normal delegation instead of this shit
                    if (event.target.tagName == "LI")
                            flag = event.target.getElementsByTagName("img")[0];
                    else if (event.target.tagName == "IMG")
                            flag = event.target;
                    else
                            return;
     
                    var country = flag.alt.toLowerCase();
     
                    var nextIndex = Countries[country].indexOf(document.location.hash.substr(1)) +1;               
                    if (nextIndex >= Countries[country].length)
                            nextIndex = 0;
     
                    document.location.hash = "#" + Countries[country][nextIndex];
            }, true);
    })();
