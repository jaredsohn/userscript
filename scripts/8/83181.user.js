// ==UserScript==
// @name           tthfanfic.org mark Complete stories
// @namespace      TornCity
// @description    Mark the complete stories
// @include        http://www.tthfanfic.org/*
// ==/UserScript==

function markComplete(){
        var aElements = document.getElementsByTagName("DIV");
        var el;
                for (var i=0; i<=aElements.length ; i++){
                                el = aElements[i];
                                if (el.className == "storydetails"){
                                        if (el.innerHTML.indexOf ("[Yes]",1) > 0){
                                                el.style.backgroundColor = "#C5E4E5";
                                        }
                                }
                }
        }

markComplete(); 