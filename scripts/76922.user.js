// ==UserScript==
// @name           View Google Images Full
// @namespace      http://nullpointers.wordpress.com
// @description    On click of google image results, it opens up the image alone in its full size. No need to
//                 click on the "See Full Image" link.
// @include        http://images.google.com/images?*
// @include        http://images.google.*/images?*
// @include        http://www.google.com/images?*
// @include        http://www.google.*/images?*
// @version        v0.9
// ==/UserScript==

(function(){
        var modifyLinks = function() {

                //get all the anchors
                var links = document.getElementsByTagName("a")

                for ( i in links){
                    var link = links[i];
                    var strlink = link.toString();

                    //we are interested only in the image results.
                    if (  /imgres\?imgurl=/.test(link)){
                        var clz = link.getAttribute("class");
                        if (clz && clz.toString() == "npfilter"){
                            
                        }
                        else {
                        var start = strlink.indexOf("?") + 8;
                        var end = strlink.indexOf("&");
                        //set the link that matters !
                        //There is a bug while dealing with spaces. Lets fix it.
                        var tgtlink = strlink.substr(start, end-start);
                        tgtlink = tgtlink.replace(/%2520/g, " ");
                        var textParaId = link.parentNode.id.replace(/Image/, "Text");
                        var OldLink = link.href
                        link.setAttribute("oldLink", OldLink);                       
                        link.href = tgtlink;
 
                        //display old link
                        var textPara = document.getElementById(textParaId);
                        //insert Original Link
                        textPara.innerHTML = textPara.innerHTML + "<a class=npfilter href='" + OldLink +"' target=_blank>Original Link</a>";
                        }

                    }

                }
                alert("Hello, world!");
                return ;
        }
        document.addEventListener( "DOMNodeInserted", modifyLinks, false );
        modifyLinks();
})();