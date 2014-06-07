// ==UserScript==
// @name           LarkiTools
// @version        1
// @namespace      Mikopet
// @description    Larkinorhoz néhány finomság
// @include        http://larkinor.index.hu/cgi-bin/larkinor.run
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// ==/UserScript==



var chatbox=document.getElementById("mydiv");
addCSS(".chatbox{padding: 10px 5px 0;position: absolute; z-index: 1000 !important; left: 660px !important; top: 100px !important; width: 280px !important; height: 580px !important;  background-color: #fff !important; overflow-x: auto !important;}"); 
chatbox.className="chatbox";

function addCSS(cssString) {
	var style, head;
	head = document.getElementsByTagName('HEAD')[0]; if (!head) { return; }
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	head.appendChild(style);
}



var divek = document.getElementsByTagName("div");
divek[0].innerHTML="";
//divek[0].setAttribute("style","");
divek[0].style.width="650";


divek[1].style.width="0";

var z=document.getElementsByTagName("img");
var kep = z[0].title;
if(kep=="harcos-negyed" || kep=="mágus-negyed" || kep=="sötét-negyed")
{
var x=document.getElementsByTagName("OPTION");
var asd=-1;
for(var i=0; i<x.length; i++){
if (x[i].value=="rablas"){ asd=i; }
}
if (asd>-1) {
x[asd].selected=true;
} else { alert("Nincs pajszerod!");
}


var y=document.getElementsByTagName("font");

var sd=-1;
for(var i=2; i<y.length; i++){
if (y[i].innerHTML.indexOf("indul")>0){ sd=i;  }

}

if (sd>-1) {
alert("Egy szörny feléd indult!");
}
}