// ==UserScript==
// @name        ooma Reverse Phone Lookup
// @homepage    http://www.userscripts.org/carbocalm
// @version     1.1.2
// @namespace   http://www.userscripts.org/carbocalm/sipify/one
// @description	Makes links click-able in ooma Lounge 
// @include     http://www.ooma.com/lounge/callLogs.php
// ==/UserScript==

// Created by Daniel Jors
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
// Change EXTENSION variable when you are in PBX

//
// Initially based on the Linkify Plus script located at:
//   http://downloads.mozdev.org/greasemonkey/linkify.user.js
//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

function go()
{

(function(){ try {
setTimeout ( go, 5000 ); 
	var EXTENSION="";
	var notInTags='a|head|noscript|option|script|style|title|textarea'.split('|');
	var phoRE=/((1[ -._]*)?[ \(]*[02-9]\d{2}[\) .-]*\d{3}[ -_\.]*\d{4})/; //should cover most NorthAmerican numbers
	function insertAfter(el,newEl) {
	    var p = el.parentNode;   
	    if (p.lastChild == el) p.appendChild(newEl);   
	    else p.insertBefore(newEl,el.nextSibling);
	    return newEl};
 	function sprintf1(x,y){return x.replace(/%s/,y)}; // poor man's sprintf
	//function sprintf2(x,y,z){return sprintf1(sprintf1(x,y),z)};
	function makeel(type, name){
	    var a=document.createElement(type);
	    a.appendChild(document.createTextNode(name));
	    return a};
	function makelink(name,link){
	    var a=makeel('a',name);
	    a.setAttribute('href',link);
		a.setAttribute('target', "_blank");
	    return a};
	function makesip(name,phoneno){
	    return makelink(name,"http://www.whitepages.com/search/ReversePhone?full_phone="+EXTENSION+phoneno);};
        function processTextEl(el,regx,func){
	    var eltxt=el.textContent; var m;
	    if(m=regx.exec(eltxt)){
		el.textContent=eltxt.substring(0,m.index);
		processTextEl(insertAfter(insertAfter(el,func(m[0],m[0].replace(/[^\d]+/g,''))),
					  document.createTextNode(eltxt.substring(m.index+m[0].length))),
			      regx,func);}}
	
	var xp=sprintf1("//body//text()[ %s ]",
			notInTags.map(function(_){return sprintf1("not(ancestor::%s)",_)})
			.join(" and "));
	var resPH = document.evaluate(xp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	
	for(var i=0;el=resPH.snapshotItem(i);i++)
	    processTextEl(el,phoRE,makesip);
    } catch(e) {dump('Sipify Error ('+e.lineNumber+'): '+e+'\n');} })();
	
	}
setTimeout ( go, 2000 ); 
