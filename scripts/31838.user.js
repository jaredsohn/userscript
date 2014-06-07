// ==UserScript==
// @name                     Shiichan post filter (old)
// @namespace           http://dis.4chan.org/enterprise/
// @description     Removes unwanted posts from shiichan.org by regex/programmatic filter.
// @include             http://dis.4chan.org/*
// @exclude             http://dis.4chan.org/list*
// @exclude             http://dis.4chan.org/post
// ==/UserScript==

(function() {
    regexen = [
        (/((DIX!\s*)|(That was VIP quality!\s*)){20,}/),
        /Please try to ignore troll posts!/,
        /http:\/\/userscripts.org\/scripts\/show\/40415/,
        /Please go to http:\/\/tinyurl.com\//,
        /don\'t sage if you're replying to the thread\. sage if you are saying \'fuck this thread, go to \/r\/\' or whatever\. idiot\./
    ];

    filters = [
        function(pd) { return pd.posterTrip() == "!FrOzEn2BUo" || pd.posterTrip() == "!frozEn/Klg" || pd.linksToHidden(); }
        //,
        //function(pd) { return pd.posterTrip() == "!!TthtFzrtPXElUy7" }
    ];

    reallyHide = false;
    modifyTruncatedLinks = true;

    var board;

    function init() {
        var posts = document.getElementsByClassName('post');
        for(var i = 0; i < posts.length; ++i) {
            var child = posts[i].querySelector("blockquote");
            processPost(posts[i], child);
        }

        board = location.pathname.match(/^\/(?:read\/)?(.*?)\//)[1];

        var linkRegex = new RegExp("^http://" + location.host + "/read/" + board + "/(\\d+)/(\\d+)/?$");

        for(var i = 0; i < document.links.length; ++i) {
            var ln = document.links[i];
            var match;

            if(ln.textContent.match(/Post\s+truncated\./)) {
                if(modifyTruncatedLinks)
                    ln.addEventListener('click', untruncate, true);
                continue;
            }

            if(match = ln.href.match(linkRegex)) {
                var thread = match[1];
                var post = match[2];

                //I'm obviously not going to do EXPERT LINKING for links such as ">>4,67,34", but I
                //might do it for links such as ">>493-498" if all of 493 through 498 are visible.
                if(post.match(/\d+$/)) {
                    var target = document.getElementById(thread + "." + post);
                    if(target) {
                        ln.target = thread + "." + post;
                        //JavaScript's scoping is fucking weird, also, GreaseMonkey dicks with the DOM by adding wrappers
                        //that screw things up, so I'm just going to stick with storing a string property on the link.
                        ln.addEventListener('click', function(evt) {
                            evt.preventDefault();
                            location.href = "#" + this.target;
                            //document.getElementById(this.target).scrollIntoView();
                        }, true);
                        //Fuck anyone who doesn't use Pseud0ch.
                        ln.style.color = '#009966';
                    }
                }
            }
        }
    }

    function isPostVisible (threadID, postID) {
        return null != document.getElementById(threadID + "." + postID);
    }

    function getAncestor (elem, predicate) {
        for(var a = elem; a != null; a = a.parentNode)
            if(predicate(a))
                return a;
        return null;
    }

    //When called, 'this' is the 'Post truncated...' link.
    function untruncate (evt) {
        evt.preventDefault();
        var ln = this;

        var marquee = document.createElement("marquee");
        marquee.appendChild(document.createTextNode("Please wait, haxing anii..."));
        marquee.style.width = "20em";
        marquee.setAttribute("scrolldelay", 40);
        marquee.setAttribute("scrollAmount", 7);
        ln.parentNode.appendChild(marquee);

        ln.textContent = "Cancel";
        ln.removeEventListener("click", untruncate, true);

        var bq = getAncestor(ln, function(a) { return a.nodeName.toLowerCase() == "blockquote"; });

        var abort = fetchPost(ln.href, function(success, res) {
            if(success) {
                bq.innerHTML = res;
                // TODO: Call prettify on <code> elements.
            } else {
                ln.textContent = "Failed: " + res[1];
                cancelUntruncate(function(){}, marquee, ln);
                return;
            }
        });

        ln.addEventListener('click', function(e) {
            e.preventDefault();
            cancelUntruncate(abort, marquee, ln);
        }, true);
    }

    function cancelUntruncate (abort, marquee, ln) {
        abort();
        marquee.parentNode.removeChild(marquee);
        ln.removeEventListener('click', cancelUntruncate, true);
        ln.addEventListener('click', untruncate, true);
        ln.textContent = 'Post truncated.';
    }

    function fetchPost (url, f) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function() {
            //alert("hma " + req.readyState + " " + req.status);
            if(req.readyState == 4) {
                if (req.status == 200 || req.status == 304) {
                    //Hax my anus does this, so it obviously works. And it's less work than using responseXML.
                    //TODO: Fetch the JSON instead.
                    var comment = req.responseText.split("<blockquote>");
                    comment = comment[1].split("</blockquote>");
                    comment = comment[0].replace(/^\s+|\s+$/g,"");
                    f(true, comment);
                } else {
                    f(false, [req.status, req.statusText]);
                }
            }
        }
        req.send();

        return function() { req.abort(); };
    }

    function expand() {
        post.style.opacity = 1;
        post.style.overflow = "visible";
        post.style.maxHeight = "";

        this.removeEventListener("click", expand, false);
        this.addEventListener("click", collapse, false);
    }

    function collapse() {
        post.style.maxHeight = "1.2em";
        post.style.opacity = 0.5;
        post.style.overflow = "hidden";

        this.removeEventListener("click", collapse, false);
        this.addEventListener("click", expand, false);
    }

    // This cache maps from thread DOM elements to thread IDs.
    // This is bad, but it will be deleted once the script finishes
    // so it's not as bad.
    var threadIDCache = {};

    // This is the slowest part of the script, which is why it is cached.
    function findThreadID(post) {
        var thread = post.parentNode;

        var cached = threadIDCache[thread];
        if(cached)
            return cached;

        var input = thread.parentNode.querySelector('input[name="id"]');
        threadID = parseInt(input.value);

        return threadIDCache[thread] = threadID;
    }

    function processPost (post, blockquote) {
        var h3 = post.querySelector('h3');
        var id, threadID;

        threadID = findThreadID(post);

        //Get the post ID from the little clickable number link to the left.
        if(h3)
            id = parseInt(h3.querySelector('span').textContent);

        if(threadID && id)
            post.id = threadID + "." + id;

        var text = blockquote.textContent;

        function makeHidden() {
            if(reallyHide) {
                post.style.display = "none";
                return;
            }

            var span = document.createElement("SPAN");
            span.style.fontStyle = "italic";
            span.appendChild(document.createTextNode("(Hidden: click to expand/collapse)"));
            h3 && h3.lastChild && h3.lastChild.appendChild(span);

            collapse.apply(span);
        }

        for(var i = 0; i < regexen.length; ++i) {
            if (regexen[i].test(text)) {
                makeHidden();
                return;
            }
        }

        if(filters.length) {
            function attrib (attr) {
                var hasCached = false, cached = null;
                return function () {
                    if(hasCached)
                        return cached;
                    var elem = this.domElement.querySelector('.'+attr);
                    hasCached = true;
                    return cached = elem ? elem.textContent : null;
                };
                /*var elems = post.getElementsByClassName(attr);
                if(elems.length > 0)
                    return elems[0].textContent;
                return null;*/
            }

            var board = location.pathname.match(/^\/(?:read\/)?(.*?)\//)[1];
            var linkRegex = new RegExp("^http://" + location.host + "/read/" + board + "/(\\d+)/(\\d+)/?$");

            var fullInfo = {
                postID : id,
                threadID : threadID,
                posterName : attrib('postername'),
                posterTrip : attrib('postertrip'),
                posterDate : attrib('posterdate'),
                posterID : attrib('id'),
                fullPostInfoLine : attrib('postinfo'), //Includes 'Name: ' etc.
                domElement : post,
                postContent : text,
                board : board,
                linksToHidden : function() {
                    var links = this.domElement.getElementsByTagName("A");
                    for(var i = 0; i < links.length; ++i) {
                        var matches = links[i].href.match(linkRegex);
                        if(matches) {
                            var elem = document.getElementById(matches[1] + "." + matches[2]);
                            if(elem && elem.style && (elem.style.overflow == "hidden" || elem.style.display == "none"))
                                return true;
                        }
                    }
                    return false;
                },
                getAttr : function(attr) {
                    return attrib(attr);
                },
                setAttr : function(attr, value) {
                    var elem = this.domElement.getElementsByClassName(attr);
                    if(elems.length > 0)
                        elems[0].textContent = value;
                }
            };

            for(var i = 0; i < filters.length; ++i) {
                if(filters[i](fullInfo)) {
                    makeHidden();
                    return;
                }
            }
        }
    }

    window.addEventListener('load', function(evt) {
        init();
        threadIDCache = null;
    }, false);
})();
