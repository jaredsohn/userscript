// ==UserScript==
// @name			Keyboard browsing
// @author			Sjors Pals
// @namespace		CNGM
// @include			http://*/*
// @match			http://*/*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-03-18
// @lastupdated		2009-03-19
// @description		This userscript removes a large amount of known ads from usatoday.com. It doesn't get them all, but it removes a few.
// ==/UserScript==
var debug=1;
var focuselement = 0;
var c_H1 = document.getElementsByTagName("H1");
var c_H2 = document.getElementsByTagName("H2");
var c_H3 = document.getElementsByTagName("H3");

var e = '';
if (c_H1.length > 5 && c_H1.length < 15)
{
    e = c_H1;
}
else if 
(c_H2.length > 5 && c_H2.length < 50)
{
    e = c_H2;
}
else if 
(c_H3.length > 5 && c_H3.length < 50)
{
    e = c_H3;
}

 for(var i = 0; i < e.length; i++){
   newanchor = document.createElement("A");   
   newanchor.href="#";
   newanchor.innerHTML="#" + (i+1) + "&nbsp;";
   
   e[i].insertBefore(newanchor,e[i].firstChild);
  }





if(e.length > 0 ){


function setfocus(direction){
    if(direction == 'down'){
        if(focuselement <= (e.length-1) ){
            focuselement++;
        } 
    }
    else{
        if(focuselement >= 0){
            focuselement--;
        } 
    }
    if(focuselement >= 0 && focuselement <= (e.length-1)){
        e[focuselement].firstChild.focus();
    }
}

(function() {
  // Add a new Global Key Listener for up/down
    document.addEventListener("keypress", function(e) {
    if(!e) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
    if(key == 118){
        setfocus('down');
    }
    if(key == 102){
        setfocus('up');
    }    
  }, true);
})();
}