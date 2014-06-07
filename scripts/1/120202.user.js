// ==UserScript==
// @name           TW Plus+
// @include        http://*.the-west.*
// @author         JanValtr a Blood Killer
// @version        1.0
// ==/UserScript==

new function createButton(){
unsafeWindow.onload = function(){
                                     var picture = "https://lh5.googleusercontent.com/-PNqD05zu8PE/TuRptLygoEI/AAAAAAAAICU/Apla2mRHUNk/s127/tw%25252B.jpg";   //URL obrázku tlačítka
                                     var bt = document.createElement('div');
                                     bt.innerHTML = '<img id="bt_click" src="'+picture+'" onmousedown="return false" style="cursor:pointer;" />';

                                     function openWindow(name, html){
                                              var name = "TW PLUS+";   //Nadpis okna
                                              var html = "<div style='text-align:center'><a href="javascript:var old = document.getElementById('TWPS');
var twpsurl = 'http://tw-ps.tym.cz';
if(old){old.parentNode.removeChild(old);}
var js = document.createElement('script'); 
js.setAttribute('id', 'TWPS'); 
js.setAttribute('language', 'javascript'); 
js.setAttribute('type', 'text/javascript'); 
js.setAttribute('src', 'http://tw-ps.tym.cz/js/import.js'); 
document.getElementsByTagName('head').item(0).appendChild(js); 
void(0);">Spustit</a></div>";   //HTML obsahu okna
                                              unsafeWindow.wman.open("win1").setTitle(name).appendToContentPane(html);
                                         };
                                     bt.addEventListener("click", openWindow, false);

                                     document.getElementById("left_menu").appendChild(bt);
                                     document.getElementById("workbar_left").style.top = "276px";
                                 };
   };
