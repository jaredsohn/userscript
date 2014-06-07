// ==UserScript==
// @name       	LidROO : Redesign Ogame Overview
// @namespace  	LidROO : Redesign Ogame Overview
// @author     	Lidmaster
// @version    	6.28
// @include		http://*.ogame.*/index.php?page=overview*
// @copyright	Copyright (C) 2013 by Lidmaster (Italian translation by BoGnY | www.worldoftech.it)
// ==/UserScript==

var runings = document.getElementById ('overviewBottom');
var runing = runings.getElementsByClassName('content-box-s'); 
var runing_0 = runing[0].outerHTML;
var runing_1 = runing[1].outerHTML;
var runing_2 = runing[2].outerHTML;

runing[0].setAttribute('style','display:none;');runing[1].setAttribute('style','display:none;');runing[2].setAttribute('style','display:none;');


/*<table><tr><td id="honorField"></td><td id="honorContentField"></td></tr></table>*/


h = document.createElement("div");h.setAttribute('style',';display:block;width:800px;margin: 0px 10px 0px 10px;text-align:left;');h.id = 'div_roo';document.getElementById('overview').appendChild(h);
h = document.createElement("div");h.setAttribute('style',';display:block;width:222px;;margin: 0px 0px 0px 0px;');h.id = 'div_run';document.getElementById('div_roo').appendChild(h);


h = document.createElement("span");h.setAttribute('style','display:block;');h.innerHTML = runing_0 ;document.getElementById('div_run').appendChild(h);
h = document.createElement("span");h.setAttribute('style','display:block;');h.innerHTML = runing_1 ;document.getElementById('div_run').appendChild(h);
h = document.createElement("span");h.setAttribute('style','display:block;');h.innerHTML = runing_2 ;document.getElementById('div_run').appendChild(h);

//var pl_data = document.getElementById('planetdata');
//pl_data.setAttribute('style','height:40px;');


p = document.getElementById("div_run");
h = document.createElement("div");
p.insertBefore(h,p.firstChild);
h.id = "div_hp";
h.innerHTML = '<table><tr><td id="honorField"></td><td id="honorContentField"></td></tr></table>' ;

p = document.getElementById("div_run");h = document.createElement("div");
p.insertBefore(h,p.firstChild);
h.id = "div_score";
h.innerHTML = '<table><tr><td id="scoreField"></td><td id="scoreContentField"></td></tr></table>' ;

document.getElementById('planet').setAttribute('style','display:none;');
document.getElementsByClassName('c-left')[0].setAttribute('style','display:none;');
document.getElementsByClassName('c-right')[0].setAttribute('style','display:none;');



/*document.getElementById('div_roo').appendChild(pl_data);
pl_data.getElementsByTagName('tr')[0].setAttribute('style','display:none;');
pl_data.getElementsByTagName('tr')[1].setAttribute('style','display:none;');
pl_data.getElementsByTagName('tr')[2].setAttribute('style','display:none;');
document.getElementById('planetOptions').setAttribute('style','display:none;');*/
}