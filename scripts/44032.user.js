var GMSU_meta_44032 = <><![CDATA[
// ==UserScript==
// @author 	usr8472@gmail.com cleaned by FDisk
// @name 	Travian: Resource++ v4 
// @version     1.0.2
// @require 	http://userscripts.org/scripts/source/51513.user.js
// @namespace 	http://userscripts.org/scripts/show/44032
// @description	Travian resource summary, overflow of resources. Cleaned version works with Travian Beyond v3. Rewrite of original with HTML DOM methods instead of innerHTML. Works in Opera. Please report bugs.
// @include 	http://*.travian.*/*.php*
// @include 	http://*.travian3.*php*
// @exclude 	http://forum.travian.*
// @exclude 	http://*.travian.*/index.php*
// @exclude 	http://*.travian.*/anleitung.php*
// @exclude 	http://*.travian.*/login.php*
// @exclude 	http://*.travian.*/logout.php*
// @exclude 	http://*.travian.*/chat.php*
// @exclude 	http://*.travian.*/impressum.php*
// @exclude 	http://*.travian.*/karte2.php*
// @exclude 	http://forum.travian3.*
// @exclude 	http://*.travian3.*/index.php*
// @exclude 	http://*.travian3.*/anleitung.php*
// @exclude 	http://*.travian3.*/login.php*
// @exclude 	http://*.travian3.*/logout.php*
// @exclude 	http://*.travian3.*/chat.php*
// @exclude 	http://*.travian3.*/impressum.php*
// @exclude 	http://*.travian3.*/karte2.php*
// ==/UserScript==
]]></>;
GMSU.init(44032);

var eventSource= (navigator.appName.indexOf== 'Opera') ? document : window; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) {
	onLoad();
} ,false); //to be run on load of the page

var loc=window.location.href; // the current page href
var lang;

var order=1;// what is the order of the resources lumber to crop or crop to lumber
var fields=[]; //setup the space for the resource names
var resource; //setup the space for the resource data

function onLoad(){ // runs the differnt functions and procedures, 
	
	resource=getResourceInfo(); // gathers the current store, capacity and production of each resource

	gatherFields();//Get fields names
	var tme=menu();//make the menu
	addElement( tme ); // add the menu to the page
	
}


function rowOpera(i,leftval,secval){
	var tol= (leftval<50) ? 150 : 255;
	var sec=155-leftval;
    
	var testmain = document.createElement( 'div' );
	var value = document.createElement( 'div' );
	var bar = document.createElement( 'table' );
	var row= document.createElement( 'tr' );
	var left= document.createElement( 'td' );
	var right= document.createElement( 'td' );
	var simg = document.createElement( 'img' );
    
	testmain.style.width='500px';
	testmain.style.height='16px';

	simg.src="img/un/r/"+(i+1)+".gif";
	simg.className='res';
	simg.style.cssFloat="left";
	simg.title=fields[lang][i];
	simg.alt=fields[lang][i];

	bar.style.cssFloat="left";
	bar.style.width='442px';
	bar.style.height='16px';
	bar.style.margin='0';
	bar.style.backgroundColor="white"
	bar.setAttribute("cellpadding","1");
	bar.setAttribute("cellspacing","0");

	left.id=fields[lang][i]+"left";
	right.id=fields[lang][i]+"right";
	value.id=fields[lang][i]+"value";
    
    
	left.style.width=leftval+'%';
	left.style.backgroundColor=rgb2HEX(sec, sec, parseInt(tol*(leftval/100)) );
	right.style.width=(100-leftval)+'%';
      
	if(leftval>=90){
		value.setAttribute("style","text-decoration:blink;");
		value.style.color='red';
	} else {
		value.setAttribute("style","text-decoration:none;");
	}
    
	value.style.width='40px';
	value.appendChild( document.createTextNode(  leftval+"%"  )  );
	value.style.cssFloat="left"
	value.title='Warehouses will fill after: '+secval;

	row.appendChild(left);
	row.appendChild(right);
	bar.appendChild(row);

	testmain.appendChild( simg );
	testmain.appendChild( value );
	testmain.appendChild( bar );

	testmain.id='resbar'+i;

	return testmain
}

function returnObjById( id ){ //compatibility, gets the object by id, based on different returns of document 
	if (document.getElementById)
		return document.getElementById(id);
	else if (document.all)
		return document.all[id];
	else if (document.layers)
		return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
     
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];      
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}   
	}
	return (arrReturnElements)
}

function addElement(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
	var htmldoc=returnObjById("content");
	
	if(!htmldoc) {
		htmldoc=document.getElementsByTagName('body')[0];
		if(!htmldoc) return;
		theElement.style.marginLeft="130px";  
		theElement.style.marginBottom="10px";
		theElement.style.width="550px";

		if(loc.indexOf('dorf2')!=-1){
			theElement.style.top="150px";
		}
		else {
			theElement.style.top="50px";
		}
	} else {
		theElement.style.width = "500px";
		if(loc.indexOf('karte.php?d=')!=-1){       
			theElement.style.top="428px";       
		}
	}
	
	htmldoc.appendChild(theElement);
}

function gatherFields(){//gathers the name of each resource
	var orgbar=returnObjById('resWrap');
	if(!orgbar) {
		orgbar=getElementsByClassName(document, 'div', 'div4')[0];
	}
	if(!orgbar) {
		orgbar=returnObjById('lres');
	}
	if(!orgbar) return;
	var resbar=orgbar.getElementsByTagName('img');
	var ret=fields[lang]=[resbar[0].title,resbar[1].title,resbar[2].title,resbar[3].title]
	var idbar=orgbar.getElementsByTagName('td');
	if(idbar[1].id.indexOf('1')==-1) order=1;
	return ret;
}

function rgb2HEX(red, green, blue){ // given red green blue values return their hexcode
	var decColor = red + (256 * green) + (65536 * blue);//offset each value and create a new int
	decColor=decColor.toString(16);//convert to a base16 string
	while( decColor.length < 6){//append 0 till it is a 6 length string
		decColor="0"+decColor;
	}
	return "#"+decColor;
}


function getResourceInfo(){ //using the resource values on the page, return the production, store, and capacity values as an array
	var resource=new Array();
	for(var i=1;i<=4;i++) {
		var rtd  = returnObjById("l"+i);
		if(!rtd) return;
		resource.push( [parseInt(rtd.title),parseInt(rtd.textContent.match(/\-?(\d+)\//)),parseInt(rtd.textContent.replace(/(\d+)\//,""))] );
	}
	
	if(!order) { //if the order is 0 return the array as is, if not reverse the array
		return resource;
	} else {
		return resource.reverse();
	}
	
}


function menu(){ //create an resource menu
	var mymenu = document.createElement( 'table' );
	mymenu.id="blocktimer";
	mymenu.setAttribute('style', 'z-index:5;');
	mymenu.setAttribute('cellspacing', 1);
	mymenu.setAttribute('cellpadding', 1);
	mymenu.className = "tbg";
	mymenu.style.marginTop="6px";
	mymenu.style.clear = "both";
	mymenu.style.backgroundColor="#C0C0C0";
	mymenu.style.position="relative"; 

	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.setAttribute('align', 'center');
	cell.appendChild(document.createTextNode('Resource Bars'));
	cell.className = "rbg";
	row.appendChild( cell );
	mymenu.appendChild(row);

	for(var i=0; i<4; i++){

		var leftval=parseInt(resource[i][1]/resource[i][2] *100);
		var secval=secondsToTime(Math.round((resource[i][2]-resource[i][1]) / resource[i][0]*3600));
		var inRow=rowOpera(i,leftval,secval);
    
		row = document.createElement("tr");
		cell = document.createElement("td");
		cell.setAttribute("colspan",2);
		cell.appendChild(inRow);
		row.appendChild(cell);
    
		mymenu.appendChild(row);
	}
		
	return mymenu;
}

/**
 * Convert number of seconds into time object
 *
 * @param integer secs Number of seconds to convert
 * @return object
 */
function secondsToTime(secs) {
	var h = Math.floor(secs / (60 * 60));

	var divisor_for_minutes = secs % (60 * 60);
	var m = Math.floor(divisor_for_minutes / 60);

	var divisor_for_seconds = divisor_for_minutes % 60;
	var s = Math.ceil(divisor_for_seconds);

	var obj = (h > 9 ? h: '0'+h) +':'+(m > 9 ? m: '0'+m)+':'+(s > 9 ? s: '0'+s);
	return obj;
}