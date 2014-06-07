// ==UserScript==
// @author		ondy1985 <ondy1985(at)gmail(dot)com>, with usr847 <usr8472(at)gmail(dot)com> addons
// @name           	Travian: Bookmarks++
// @namespace	http://userscripts.org/
// @description    	Allows you to add your own bookmarks to your left menu, uses a cookie for persistence.
// @include       	 http://*.travian.*/*php*
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
eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false); 
var side;
var links;
var alink;
var canwrite=true;
var thepop;

Array.prototype.remove=function(s){
  for(i=0;i<this .length;i++){
    if(s==this[i]) this.splice(i, 1);
  }
}

String.prototype.replaceAll=function(s1, s2) {return this.split(s1).join(s2)}

function onLoad(){

	side=getElementsByClassName(document, "td", "menu")[0];
	
	var ls=side.getElementsByTagName('a');
	ls=side.getElementsByTagName('a');
		
	side=ls[0].parentNode;
		
	if(side){
		links=makeBookmarks();
		addElementArray(side, links );
		var opt=[]
		alink=makeEventlink('+ Bookmark', '#', addlink);
		opt.push( alink );
		opt.push( makeEventlink('+ External', '#', addext) );
		opt.push( makeEventlink('Show Cookie', '#', showCookie) );
		addElementArray(side, opt );
		addextpop();
		pop();
	}

}


function showCookie(){

		var frame=document.getElementById('cpop');
		if(!frame) return;
		var state=frame.style.visibility;
		if(state.indexOf("visible")==-1){
			updateTexta();
			frame.style.visibility = "visible";
		} 

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
    return arrReturnElements;
}


function readCookie(cookiename) {
	var reg = new RegExp(cookiename + "=([^;\n\r]*);?", "i");
	var data = reg.exec(document.cookie);
	if (data == null || data.length <= 1) {
		return null;	
	}	
	return data[1];
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readBookmarks() {	
	var value = readCookie("TQL_BOOKMARKS");
	if (value == null ) {
		return new Array();
	}
	var arr = value.split(/[|]{2}/);
	var ret = new Array();
	for (var i = 0; i < arr.length; i++) {
		var b = arr[i].split(/[:][=]/);
		if(b.length==2)	ret.push(b);
	}
	return ret;
}

function eraseCookie() {

	if(!canwrite) return;
	canwrite=false;
	createCookie("TQL_BOOKMARKS","",-1);
	canwrite=true;
}


function eraseAllBooks(){

	while(links.length!=0){
		var c=links.pop();
		c.parentNode.removeChild(c);
	}
		
	var frame=document.getElementById('texta');
	if(!frame) return;
	frame.value='';
}

function add(name, val){
	if (name && val) {
		var string = name + ':=' + val;
		var data = document.cookie.match(/TQL_BOOKMARKS=(.*:=.*)?;?/i);
		var oldvalue= (data == null ||data.length <= 1 || data[1] == '') ? '' : data[1]+'||';
			var newValue = oldvalue + string;
			var date = new Date();
			date.setTime(date.getTime()+(365*24*60*60*1000));
			var expires = '; expires='+date.toGMTString();
		document.cookie = 'TQL_BOOKMARKS='+newValue+expires+'; path=/';
	}
	
	external=false;
	
}


function addAll(body){
	if (body) {
		var data = document.cookie.match(/TQL_BOOKMARKS=(.*:=.*)?;?/i);
		var oldvalue= (data == null ||data.length <= 1 || data[1] == '') ? '' : data[1]+'||';
		
		//error parse error checking
		var value = oldvalue + body;
		value=value.replaceAll('\n','');
		var arr = value.split(/[|]{2}/);
		var end=arr.length;
	
		var ret = new Array();
		for (var i = 0; i < end; i++) {
			var b = arr[i].split(/[:][=]/);
			if(b.length==2)	ret.push(b);
		}
	
		end=ret.length
		var body='';
		for (var i = 0; i < end; i++) {
			if(ret[i][0] && ret[i][1]){	
					body=body+ret[i][0]+":="+ret[i][1];	
							if(i+1!=end)body+='||';
				}
		}	
		//end parse error checking
		
		var date = new Date();
		date.setTime(date.getTime()+(365*24*60*60*1000));
		var expires = '; expires='+date.toGMTString();
		document.cookie = 'TQL_BOOKMARKS='+body+expires+'; path=/';
	}
	
	
}
	
function makeBookmarks() {
	var arr = readBookmarks();
	
	var end = arr.length;
	var ret = new Array();
	
	for (var i = 0; i < end; i++) {
		ret.push(makeBookmark( arr[i][0],arr[i][1]));
	}
		
	return ret;
}

function makeBookmark(name, loc){

		var div=document.createElement( 'div' );
		var current=document.createElement( 'a' );
		var xlink=document.createElement( 'a' );
			
		current.href=loc;
		current.title=name;
		current.appendChild(  document.createTextNode( name )   );
		xlink.appendChild(  document.createTextNode( 'x' )  );
		xlink.style.cssFloat='left';
		xlink.style.marginRight='10px';
		xlink.addEventListener("mouseover", function(e){   e.target.style.color='red';  }, true);
		xlink.addEventListener("mouseout", function(e){  e.target.style.color='black';  }, true);
		xlink.addEventListener("click", function(e){  selfremove(e)  }, true);
		div.appendChild(xlink);
		div.appendChild(current);
		
		return div;
}

function selfremove(e){

var ans=confirm("Delete bookmark: "+e.target.nextSibling.textContent)

if(!ans) return;

if(!canwrite) return;
canwrite=false;
var parent=e.target.parentNode;
parent.parentNode.removeChild(parent);
links.remove(parent);
canwrite=true;
cookieupdate();
}


function addlink(){
		var frame=document.getElementById('addext');
		if(!frame) return;
		
		document.getElementById('linkext').value=location.href;
		document.getElementById('titleext').value='';

		var state=frame.style.visibility;
		
		if(state.indexOf("visible")==-1){
		etoggle();
		}
}


function addext(){
	var frame=document.getElementById('addext');
	if(!frame) return;

	document.getElementById('linkext').value='http://';
	document.getElementById('titleext').value='';
		
	var state=frame.style.visibility;
	
	if(state.indexOf("visible")==-1){
	etoggle();
	}
}		

function resetlink(){
	return makeEventlink('Reset', '#', eraseCookie);
}

function makeEventlink(text, href, event ){
var link=document.createElement( 'a' );
	link.href=href;
	link.title=text;
	link.appendChild(  document.createTextNode(  text )   );
	link.addEventListener('click',event,true);
return link;
}

function pop(){

var pop=document.createElement( 'div' );
	pop.id="cpop";
	pop.setAttribute('style', 'z-index:100;');
	pop.style.top='250px';
	pop.style.position='absolute';
	pop.style.left='156px';
	pop.style.width='445px';
	pop.style.height='auto';
	pop.style.visibility='hidden';
	pop.style.backgroundColor='#FFFFFF';
			
var texta=document.createElement( 'textarea' );
	texta.style.width='440px';
	texta.style.height='150px';
	texta.overflow='visible';
	texta.id="texta";
	
	var body="";
	var end=links.length;

	for (var i = 0; i < end; i++) {
		var b = links[i].getElementsByTagName('a');
		
		if(b.length==2){
			body=body+b[1].title+":="+b[1].href;
			if(i+1!=end){body=body+"||\n";}
		}
		
	}	
	
	texta.appendChild(  document.createTextNode(  body  )   );
	
	var fulltable=document.createElement( 'table' );
	var row=document.createElement( 'tr' );
	var cell=document.createElement( 'td' );

	fulltable.setAttribute('style', 'z-index:100;');
	fulltable.setAttribute('cellspacing', 1);
	fulltable.setAttribute('cellpadding', 1);
	fulltable.className = "tbg";
	cell.appendChild(  document.createTextNode(  "Cookie" )   );
				
	cell.setAttribute("colspan",4);
	cell.setAttribute('align', 'center');
	cell.className = "rbg";
	row.appendChild(  cell );
	fulltable.appendChild(  row );
	row=document.createElement( 'tr' );
	cell=document.createElement( 'td' );
	cell.setAttribute("colspan",4);
	cell.appendChild(  texta   );
	row.appendChild(  cell );
	fulltable.appendChild(  row );
	
	row = document.createElement( 'tr' );
	cell = document.createElement( 'td' );
	var tlink=makeEventlink('Hide', '#', toggle);
	cell.appendChild( tlink );
	row.appendChild(  cell );
	
	cell = document.createElement( 'td' );
	tlink=makeEventlink('Update', '#', update);
	cell.appendChild( tlink );
	row.appendChild(  cell );
	
	cell = document.createElement( 'td' );
	tlink=makeEventlink('Restore', '#', updateTexta);
	cell.appendChild( tlink );
	row.appendChild(  cell );
	
	cell = document.createElement( 'td' );
	tlink=makeEventlink('Select Text', '#', selectText);
	cell.appendChild( tlink );
	row.appendChild(  cell );
	fulltable.appendChild(  row );
		
	row = document.createElement( 'tr' );
	cell = document.createElement( 'td' );
	tlink=makeEventlink('Delete All', '#', reset);	
	cell.appendChild( tlink  );
	cell.setAttribute("colspan",4);
	cell.setAttribute('align', 'center');
	cell.className = "rbg";
	row.appendChild(  cell );
	fulltable.appendChild(  row );

	pop.appendChild(fulltable);
	thepop=pop;
	addElementPage( pop );
			
}

function addextpop(){

var pop=document.createElement( 'div' );
	pop.id='addext';
	pop.setAttribute('style', 'z-index:100;');
	pop.style.top='266px';
	pop.style.position='absolute';
	pop.style.left='156px';
	pop.style.width='500px';
	pop.style.height='32';
	pop.style.visibility='hidden';
	
	pop.style.backgroundColor='#FFFFFF';
			
	var fulltable=document.createElement( 'table' );
	var row=document.createElement( 'tr' );
	var cell=document.createElement( 'td' );

	fulltable.setAttribute('style', 'z-index:100;');
	fulltable.setAttribute('cellspacing', 1);
	fulltable.setAttribute('cellpadding', 1);
	fulltable.className = "tbg";
	cell.appendChild(  document.createTextNode(  "Add Link:" )   );
	cell.setAttribute("colspan",2);
	cell.setAttribute('align', 'center');
	cell.className = "rbg";
	row.appendChild(  cell );
	fulltable.appendChild(  row );
	row=document.createElement( 'tr' );
	
	
	var titlea=document.createElement( 'input' );
	titlea.className="fm f80" 
	titlea.id='titleext';
	titlea.style.height='16px'
	titlea.style.width='200px'
	titlea.maxlength=10;	
	
	var linka=document.createElement( 'input' );
	linka.className="fm f80"
	linka.id='linkext';
	linka.style.width='200px'
	linka.style.height='16px'
	
	
	cell=document.createElement( 'td' );
	cell.appendChild(  document.createTextNode(  "Name: " )   );		
	cell.appendChild(  titlea   );	
	row.appendChild(  cell );
		
	cell=document.createElement( 'td' );
	cell.appendChild(  document.createTextNode(  "Link: " )   );		
	cell.appendChild(  linka   );	
	row.appendChild(  cell );		
	
	fulltable.appendChild(  row );

	row = document.createElement( 'tr' );
	cell = document.createElement( 'td' );
	var tlink=makeEventlink('Hide', '#', etoggle);
	cell.appendChild( tlink );
	row.appendChild(  cell );
	
	cell = document.createElement( 'td' );
	tlink=makeEventlink('Add', '#', eAdd);
	cell.appendChild( tlink );
	row.appendChild(  cell );
	
	fulltable.appendChild(  row );
		
	pop.appendChild(fulltable)

	addElementPage( pop );

}

function eAdd(){

if(!canwrite) return;
	canwrite=false;
	
	var title=document.getElementById('titleext');
	var link=document.getElementById('linkext');
	
	var name = title.value;
	var loc = link.value;
	
	if (name && loc) {
	var di=makeBookmark(name,loc);
	side.insertBefore( di , alink);
	links.push(di);
	canwrite=true;
	cookieupdate();
	} else {
	canwrite=true;
	}	
	etoggle();
}


function reset(){

var ans=confirm("Do you want to delete all bookmarks?")

if(!ans) return;

eraseCookie();
eraseAllBooks();
toggle();
}

function selectText(){

	frame=document.getElementById('texta');
	if(!frame) return;
	
	frame.focus();
	frame.select();
}

function toggle() {
		var frame=document.getElementById('cpop');
		if(!frame) return;
		var state=frame.style.visibility;
		if(state.indexOf("visible")==-1){
			frame.style.visibility = "visible";
		} else {
			frame.style.visibility = "hidden";
		}
}


function etoggle() {

		var frame=document.getElementById('addext');
		if(!frame) return;

		var state=frame.style.visibility;
		if(state.indexOf("visible")==-1){
			frame.style.visibility = "visible";
		} else {
			frame.style.visibility = "hidden";
		}
		
}

function cookieupdate(){

if(!canwrite) return;
	canwrite=false;

	var end=links.length;
	var body='';
	createCookie("TQL_BOOKMARKS","",-1);
		
	for (var i = 0; i < end; i++) {
		var b = links[i].getElementsByTagName('a');
		if(b.length==2){  body=body+b[1].title+':='+b[1].href+'||'; }
	}
	
	addAll(body);
	
	canwrite=true;
}

function update(){

	if(!canwrite) return;
	canwrite=false;

	var frame=document.getElementById('texta');
	if(!frame) return;
	var value=frame.value;

	value=value.replaceAll('\n','');
	var arr = value.split(/[|]{2}/);
	var end=arr.length;
	
	var ret = new Array();
	for (var i = 0; i < end; i++) {
		var b = arr[i].split(/[:][=]/);
		if(b.length==2)	ret.push(b);
	}
	
		end=ret.length
		createCookie("TQL_BOOKMARKS","",-1);
		for (var i = 0; i < end; i++) {
			if(ret[i][0] && ret[i][1]){	
					add( ret[i][0], ret[i][1] );		
				}
		}	
		
		while(links.length!=0){
		var c=links.pop();
		c.parentNode.removeChild(c);
		}
		
		links=makeBookmarks();	
		end=links.length
		for (var i = 0; i < end; i++) {
			side.insertBefore( links[i], alink);
		}		
		
		canwrite=true;
		toggle();
}


function updateTexta(){

	if(!canwrite) return;
	canwrite=false;

	var frame=document.getElementById('texta');
	if(!frame) return;

	var end=links.length;
	var body="";

	for (var i = 0; i < end; i++) {
		var b = links[i].getElementsByTagName('a');
		if(b.length==2){body=body+b[1].title+":="+b[1].href; if(i+1!=end) body+="||\n";}
	}
	
	frame.value=body;
	canwrite=true;
}

function addElementPage(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
	var htmldoc=document.getElementsByTagName('body')[0];
	htmldoc.appendChild(theElement);
}

function addElementArray(root,element){
	if(root && element){
		var end=element.length;
		for (var i = 0; i < end; i++) {
			var c=element[i];
			if(c) root.appendChild( c );
		}
	}
}