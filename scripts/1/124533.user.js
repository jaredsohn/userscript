// ==UserScript==
// @name           sol concluded stories
// @namespace      fiction
// @description    mark concluded stories
// @include        http://storiesonline.net/library/*
// @include        http://storiesonline.net/a/*
// ==/UserScript==


function markCompleteStories(){
        var aElements = document.getElementsByTagName("TD");
        var el;
                for (var i=0; i<=aElements.length ; i++){
                                el = aElements[i];
                                if (el.className == "lc4"){
                                        if (el.innerHTML.indexOf ("oncluded",1) > 0){
                                                el.style.backgroundColor = "#C5E4E5";
                                        }
                                }
                }
        }

markCompleteStories(); 