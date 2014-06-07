// ==UserScript==
// @author		usr8472@gmail.com 
// @name 		Travian: Tools Pack++ v0
// @namespace 	http://userscripts.org/
// @description 	Other tools I have worked on. Most are Alpha and Beta scripts. This has Map tools and message select tools. 
// @include 	http://*.travian.*php*
// @exclude 	http://forum.travian.*
// @exclude 	http://*.travian.*/index.php*
// @exclude 	http://*.travian.*/anleitung.php*
// @exclude 	http://*.travian.*/login.php*
// @exclude 	http://*.travian.*/logout.php*
// @exclude 	http://*.travian.*/chat.php*
// @exclude 	http://*.travian.*/impressum.php*
// @exclude 	http://*.travian.*/karte2.php*
// @exclude 	http://www.travian.*
// ==/UserScript==

var eventSource= (navigator.appName == 'Opera') ? document : window;
eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false); // load the script into memory
var loc=window.location.href;
var startform;
var tmap=true;
var tname=true;
var tmsg=true;

function onLoad(){ //call the functions 

	if(!returnObjById('l1')) return;

	if(tmsg){
		if(loc.indexOf('berichte')!=-1  || (loc.indexOf('nachrichten')!=-1 && loc.indexOf('t=4')==-1  && loc.indexOf('t=1')==-1) ) {
		addChkAll();
		}
	}	

	if(tmap || tname){
		var map_insert=document.createElement( 'div' );
			map_insert.id="FloatingLayer";
			map_insert.style.fontWeight=700;
			map_insert.style.width = "550";
			map_insert.style.clear = "both";
			map_insert.style.marginTop="30px";
			map_insert.style.marginBottom="16px";

			var con1=document.createElement( 'div' );
			var con2=con1.cloneNode(true);
			
			if(tmap){
				var map=mapit();
				con1.appendChild(map);
				con1.style.cssFloat='left';
				map_insert.appendChild( con1  );
			}
				
			if(tname){
				var name=lookup();
				con2.appendChild(name);
				con2.style.cssFloat='right';
				map_insert.appendChild( con2  );
			}
			addElement( map_insert );
	}
	
}

function returnObjById( id ){
    if (document.getElementById)
        return document.getElementById(id);
    else if (document.all)
        return document.all[id];
    else if (document.layers)
        return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){
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

function addElement(theElement) {
	var htmldoc=returnObjById("lmid2");
	
	if(!htmldoc) {
		htmldoc=document.getElementsByTagName('body')[0];
		if(!htmldoc) return;
		theElement.style.marginLeft="130px";  
		theElement.style.marginBottom="10px";
		theElement.style.width="550px";
		theElement.style.position="relative";  
		
		if(loc.indexOf('dorf2')!=-1){
			theElement.style.top="150px";}
		else {
			theElement.style.top="50px";}		
		
		
	} else {
		theElement.style.position="relative"; 
		if(loc.indexOf('karte.php?d=')!=-1){       
			theElement.style.top="428px";       
		}
	}


htmldoc.appendChild(theElement);
}

function sel(){
form_all=startform;
var topend=form_all.length;
	for(var i=0;i<topend;i++){
		form_input=form_all[i].getElementsByTagName('input');
		var end=form_input.length;
		for(var x=0;x<end;x++){
			var y=form_input[x];
			if(y.name.indexOf('del')==-1 && y.name!='s10' ) y.checked=!y.checked;
		}
	}
}

function addChkAll(){

var form_all=getElementsByClassName(document, "table", "tbg" );
if(!form_all) return;
var topend=form_all.length;

for(var i=0;i<topend;i++){
	var form_input=form_all[i].getElementsByTagName('input');
	var end=form_input.length;
	for(var x=0;x<end;x++){
	var y=form_input[x];
		if(y.name.indexOf('del')!=-1) {      
			var select=document.createElement( 'input' );
			select.type="button"
			select.setAttribute('style','font-weight: bold; font-size: 8pt; height: 14pt;');
			select.value="Inverse Select";
			select.style.marginLeft="4px"
			select.addEventListener('click',sel,true);
			y.parentNode.appendChild(select);
		}
	}
}
startform=form_all;
}

function mapit(){
 
var formpost=document.createElement( 'form' );
	formpost.method="post";
	formpost.action="karte.php";
var xp=document.createElement( 'input' );
	xp.className="fm fm25" 
	xp.maxlength=4;
	xp.size="2";
var yp=xp.cloneNode(true);
	xp.name="xp";
	yp.name="yp";

var button=document.createElement( 'input' );
	button.type="submit";
	button.value="ok"; 
	button.border="2";
	button.name="s1";
	button.style.marginLeft="10px";
	
	formpost.appendChild( document.createTextNode( "Map: ")  );
	formpost.appendChild( document.createTextNode( "x ")  );
	formpost.appendChild( xp  );
	formpost.appendChild( document.createTextNode( " y ")  );
	formpost.appendChild( yp  );
	formpost.appendChild( button  );
	
	return formpost;
}

function lookup(){
	
var formpost=document.createElement( 'form' );
	formpost.method="post";
	formpost.action="statistiken.php";
	formpost.style.marginLeft="10px"
var namein=document.createElement( 'input' );
	namein.className="fm f80" 
	namein.maxlength=20;
	namein.size="10";
	namein.name="spieler";

var button=document.createElement( 'input' );
	button.type="submit";
	button.value="ok"; 
	button.border="2";
	button.name="s1";
	button.style.marginLeft="10px";
	
	formpost.appendChild( document.createTextNode( "Player Name: ")  );
	formpost.appendChild( namein  );
	formpost.appendChild( button );
	
	return formpost;
	
}