// ==UserScript==

// @name           SuperFundo

// @description	   Remove ads on SuperFundo.org

// @include        http://*.superfundo.*

// @include        http://*superfundo.*

// @version		   1.0

// ==/UserScript==
var adtable = document.getElementById('mbtb');
var table = document.getElementById('tortabl');
if(adtable!=null){
	adtable.style.display='none';
	if(table!=null) table = document.getElementsByTagName('table')[1];
}
else if(table!=null) table = document.getElementsByTagName('table')[0];



if(table!=null) table.style.marginTop='-27px';


var iframes = document.getElementsByTagName('iframe');

for(var i = 0; i < iframes.length;i++){
	if (iframes[i].name!='googleSearchFrame'){

		iframes[i].width=0;

		iframes[i].height=0;
	}

}

var spans = document.getElementsByTagName('span');

for(var i = 0; i < spans.length;i++){

	if(spans[i].innerHTML.indexOf("Your Ad Here")!=-1) spans[i].innerHTML="";

}
