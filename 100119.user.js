// ==UserScript== 
// @name           Salesforce.com Hide Chatter 
// @namespace      ThomasT 
// @description    Hides chatter bar and Chatter 101 button from home 
page 
// @include        https://*.salesforce.com/home/home.jsp 
// ==/UserScript== 
        // hide the "Show/Hide Chatter" icon & link, and the feed 
itself if displayed 
                document.getElementById("feedLinks").style.display = 'none'; 
                document.getElementById("chatterfeedshell").style.display = 'none'; 
                // the "Chatter 101" button has no id, and so hiding it is a little 
longer 
                var newstuff = document.getElementsByName("whats_new"); 
                for ( var i=newstuff.length-1; i>=0; --i ){ 
                        if (newstuff[i].value == "Chatter 101") { 
                                newstuff[i].style.display = 'none'; 
                                } 
                } 