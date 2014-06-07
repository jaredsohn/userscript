// ==UserScript==
// @name           Alkislarla Yasiyorum
// @description    Alkislarla Yasiyorum'u daha da kullanışlı hale getiren bir betik
// @namespace      http://userscripts.org/users/ocanal
// @version        0.0.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://alkislarlayasiyorum.com/*
// @include        https://alkislarlayasiyorum.com/*
// @include        http://www.alkislarlayasiyorum.com/*
// @include        https://www.alkislarlayasiyorum.com/*
// ==/UserScript==


function AlkislarlaYasiyorum() {
    
    var DOWN_RATE_COOKIE = "down_rate_enabled";
    
    function xpath(xpath, element) {
            if (!element)
                element = document;
            return document.evaluate(xpath, element, null,
                                     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }    
    
    function idGet(id) {
        return document.getElementById(id);
    }

    function newElem(type, id, className) {
        var el = document.createElement(type);
        if (id) el.id = id;
        if (className) el.className = className;
        return el;
    }    
    
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    
    function Icerik() {
        
        function downClick() {
            setTimeout(function() {
              eraseCookie(DOWN_RATE_COOKIE);
            }, 500);
        }
        
        function addEventListeners() {
            //down button click event listener
            var downs = xpath("//a[@class='down']");
            for (var i = 0; i < downs.snapshotLength; i++) {
                var down = downs.snapshotItem(i);
                down.addEventListener("click", downClick);
            }
        }
        
        function addTopCommentsButtons() {
            var topCommentsHeader = idGet("top_comments");
            if (topCommentsHeader) {
                var topComments = xpath(".//div[@class='comment']", topCommentsHeader);
                for(var i = 0; i < topComments.snapshotLength; i++) {
                    var topComment = topComments.snapshotItem(i);
                    var topCommentID = topComment.id.replace(/comment_/,"");
                    var topCommentRateCount = idGet("rate_count_"+topCommentID);
                    if (topCommentRateCount) {
                        
                        var rateButtonsSpan =  newElem("span", "rate_buttons_"+topCommentID);
                        var upButton = newElem("a", "rate_up_"+topCommentID, "up");
                        upButton.setAttribute("title", "Bu yorum iyidir.");
                        upButton.setAttribute("href", "javascript:;");
                        upButton.setAttribute("onclick", "rate_comment("+topCommentID+",'up')");
                                              
                        var downButton = newElem("a", "rate_down_"+topCommentID, "down");
                        downButton.setAttribute("title", "Bu yorum kötüdür.");
                        downButton.setAttribute("href", "javascript:;");
                        downButton.setAttribute("onclick", "rate_comment("+topCommentID+",'down')");
                        
                        rateButtonsSpan.appendChild(upButton);
                        rateButtonsSpan.appendChild(downButton);
                        topCommentRateCount.parentNode.appendChild(rateButtonsSpan);
                    }
                }
            }
        }
        this.main = function() {
            addTopCommentsButtons();
            addEventListeners();
        }
    }
    
    this.main = function() {
        var process;
        if (window.location.pathname.match(/\/icerik\//)) {
            process = new Icerik();
        }
        
        process.main();
    }
}

(new AlkislarlaYasiyorum).main(); 