// ==UserScript==
// @name           Clarify Twitter
// @namespace      jamespgilbert
// @include        http://twitter.com/*
// ==/UserScript==


document.addEventListener('DOMNodeInserted', function (e) {
            if (e.target.nodeType == 1 && e.target.className == "stream-item") {
                var tcs = e.target;//document.getElementsByClassName("tweet-content");
                var tu = tcs.getElementsByClassName("tweet-user-name")[0];
                if(!tu)
                    return;
                var as = tu.getElementsByTagName("a");
                var sps = tu.getElementsByTagName("span");
                if(as.length > 0 && sps.length > 0)
                {
                    as[0].innerHTML = sps[0].textContent;
                    sps[0].style.display = "none";
                }
                var tt = tcs.getElementsByClassName("tweet-text")[0];
                tt.innerHTML = tt.innerHTML.replace(/RT/g, "&rarr;")
                tt.innerHTML = tt.innerHTML.replace(/@<a/g, "<a")

                tas = tt.getElementsByClassName("twitter-timeline-link");
                for(var ta in tas)
                {
                    tas[ta].innerHTML = "<img src='http://bits.wikimedia.org/skins-1.5/vector/images/external-link-ltr-icon.png?2' />";
                }
                tht = tt.getElementsByClassName("twitter-hashtag");
                for(var th in tht)
                {
                    tht[th].innerHTML = tht[th].innerHTML.replace(/#/g, "");
                    tht[th].style.borderBottom = "1px dotted";
                    tht[th].style.color = "inherit";
                    
                }
                
            }
}, false);