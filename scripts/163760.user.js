// ==UserScript==
// @name       Grooveshark: Remove community sidebar
// @version    1.0
// @description  Removes community sidebar (useless for most of people), extends playlist height.
// @match      http://grooveshark.com/*
// @copyright  2013+, SaW
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function()
                  {
                    var t=setTimeout(function(){
                            $("#sidebar-community").remove();
                            $("#sidebar-playlists").css("height","95%");
                        },1000);
                       
                  });