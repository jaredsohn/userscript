// ==UserScript==
// @id             dc09f455-deee-4eec-9660-9da7394b1b71
// @name           Wikipedia Spoiler Hider
// @version        1.2.4
// @author         xpdite
// @description    Hides potential spoilers on Wikipedia
// @include        /^https?://.*\.wikipedia\.org/wiki/.*$/
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function () {
    var wshGlobalCounter = 0, wshKeywords, wshToggleText, currentURL;
    currentURL = document.URL.toLowerCase();
    
    // Localization
    if (currentURL.indexOf("en.wikipedia.org") !== -1) {
        // English
        wshToggleText = "Toggle potential spoilers";
        wshKeywords = ["plot", "plots", "story", "stories", "storyline", "storylines", "synopsis", "synopses",
                       "plot summary", "plot summaries", "plot synopsis", "plot synopses", "characters",
                       "main characters", "gameplay and story", "gameplay and stories", "gameplay and storyline",
                       "gameplay and storylines", "gameplay and story line", "gameplay and story lines",
                       "plot and setting", "plots and setting", "plot and settings", "plots and settings",
                       "series synopsis", "series synopses", "story and characters", "stories and characters",
                       "setting and characters", "settings and characters", "plot and characters",
                       "plots and characters", "playable characters", "enemy characters", "setting", "settings",
                       "plot overview", "characters and organizations", "scenario", "scenarios",
                       "cast and characters", "summary and plot", "character/game list", "non-playable characters",
                       "bosses", "other characters", "main player characters", "secondary player characters",
                       "antagonist", "antagonists", "significance of the title", "protagonist", "protagonists",
                       "ending", "endings", "episodes", "premise", "the cases", "recurring characters"];
    } else if (currentURL.indexOf("no.wikipedia.org") !== -1) {
        // Norwegian
        wshToggleText = "Vis eller skjul potensielle spoilers";
        wshKeywords = ["historie", "handling", "handlinger", "figurer", "figurer i spillet", "sammendrag",
                       "rollefigurer", "scenario", "plot", "hovedfigurer", "fortelling", "viktige figurer",
                       "synopsis", "scenarios", "referat"];
    } else if (currentURL.indexOf("sv.wikipedia.org") !== -1) {
        // Swedish
        wshToggleText = "Visa eller göm möjliga spoilers";
        wshKeywords = ["handling", "karaktärer", "referat", "detaljerat referat", "scenario", "plot",
                       "berättelse", "handling och miljö", "synopsis", "spelbara rollfigurer", "andra rollfigurer",
                       "organisationer och grupper", "scenarios", "sammanfattning"];
    } else {
        // If running on a Wikipedia version that is not yet supported, quit the script
        return;
    }

    var i, dOuter, dInner;
    var h2s = document.querySelectorAll("#mw-content-text > h2");
    if (h2s.length > 0) {
        for (i = 0; i < h2s.length; i++) {
            dOuter = document.createElement("div");
            dOuter.id = "content_outer_" + i;
            dOuter.className = "content_outer";
            dInner = document.createElement("div");
            dInner.id = "content_inner_" + i;
            dInner.className = "content_inner";
            h2s[i].parentNode.insertBefore(dOuter, h2s[i]);
            dOuter.appendChild(h2s[i]);
            dOuter.appendChild(dInner);

            while (dOuter.nextSibling && dOuter.nextSibling.nodeName.toLowerCase() != "h2") {
                dInner.appendChild(dOuter.nextSibling);
            }
        }
    }

    var h3s = document.querySelectorAll(".content_inner > h3");
    if (h3s.length > 0) {
        var j;
        for (i = 0; i < h3s.length; i++) {
            j = h3s[i].parentNode.id.substr(h3s[i].parentNode.id.lastIndexOf("_")+1);
            dOuter = document.createElement("div");
            dOuter.id = "content_sub_outer_" + j + "_" + i;
            dOuter.className = "content_sub_outer";
            dInner = document.createElement("div");
            dInner.id = "content_sub_inner_" + j + "_" + i;
            dInner.className = "content_sub_inner";
            h3s[i].parentNode.insertBefore(dOuter, h3s[i]);
            dOuter.appendChild(h3s[i]);
            dOuter.appendChild(dInner);

            while (dOuter.nextSibling && dOuter.nextSibling.nodeName.toLowerCase() != "h3") {
                dInner.appendChild(dOuter.nextSibling);
            }
        }
    }

    parseHeaders("h2 > span", 0);
    parseHeaders("h3 > span", 1);
    
    function parseHeaders(queryString, isSmall) {
        var headers = document.querySelectorAll(queryString);
        if (headers.length > 0) {
            var i;
            for (i = 0; i < headers.length; i++) {
                var id = headers[i].innerHTML.trim();
                if (id !== null) {
                    if (wshKeywords.indexOf(id.toLowerCase()) != -1) {
                        spoilerize(headers[i].parentNode.parentNode, isSmall);
                    }
                }
            }
        }
    }

    function spoilerize(element, isSmall) {
        var outer = element;
        var inner;
        
        if (isSmall == 0) {
            inner = element.querySelector("div.content_inner")
        } else {
            inner = element.querySelector("div.content_sub_inner")
        }
        
        if (inner !== null) {
            inner.setAttribute("style","display: none !important;");
            inner.setAttribute("id","wphPlot" + wshGlobalCounter++);

            var link;
            link = document.createElement("span");
            link.id = "togglePlotLink" + wshGlobalCounter++;
            link.innerHTML = "<b>" + wshToggleText + " <sup>[WSH]</sup></b>";
            link.setAttribute("style","display:inline-block;margin-bottom:10px;color:#00F;padding:5px;border:1px solid black;border-radius:5px;cursor:pointer;");

            link.addEventListener("click", function(){setToggle(inner.getAttribute("id"))}, true);
            outer.insertBefore(link, inner);
        }
    }

    function setToggle(divId) {
        var elem=document.getElementById(divId);
        
        if(elem.style.display=='none') {
            elem.style.display='block';
        } else {
            elem.style.display='none';
        }
    }
}());
