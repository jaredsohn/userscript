// ==UserScript==
// @name           vu_karakterlap
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/
// @include        http://*.vegzetur.hu/index.php
// @include        http://*.vegzetur.hu/index.php?m=karakterlap*
// @exclude        http://*.vegzetur.hu/index.php?m=karakterlap&user=*
// ==/UserScript==

var kepek = true;		  // állatok, felszerelés képet mutassa-e vagy sem
var viseltpoz = 0;		  // -1: nem mutatja 0: képernyő tetején, 1: Első blokk után

var quickhelp = 
'Gyors tárgyválasztó a fejlécben levő tárgyakra klikkelve';

settings = {
	version: "0.47",
	newtxt: "Alternatív karakterlap + tárgycsoportok: ",
	down: "Innen letöltheted: "
}

var base = getFirstByClass('div','targylista_block');
if (!base) return 0;

function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) items.push(elems[i]);
	}
	return items;
}

function getByTitle(tag, titlename){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].title==titlename) items.push(elems[i]);
	}
	return items;
}

function getByRoot(doc, tag){
	return doc.getElementsByTagName(tag);
}

function getFirstByRoot(doc, tag){
	return doc.getElementsByTagName(tag)[0];
}

function getByTitle(tag, titlename){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].title==titlename) items.push(elems[i]);
	}
	return items;
}

function getFirstByName(tag, titlename){
	return getByName(tag,titlename)[0];
}

function getByName(tag, titlename){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].name==titlename) items.push(elems[i]);
	}
	return items;
}

function gmpost(url, callback){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		data: encodeURI(''),
		onload: callback
	});
}

function ruhafel(url, callback){
	if (GM_xmlhttpRequest)
	{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		data: encodeURI(''),
		onload: callback
	});
	}
	else
	{
	GM_xmlhttpReq({
		method: 'GET',
		url: url,
		data: encodeURI(''),
		onload: callback
	});
	}
}

/* GM_xmlhttpRequest implementation adapted from the
Turnabout GM compatibility library:
http://www.reifysoft.com/turnabout.php
Used under the following license:

 Copyright (c) 2005, Reify Software, Inc.
 All rights reserved.

 Redistribution and use in source and binary forms,
 with or without modification, are permitted provided
 that the following conditions are met:

 1) Redistributions of source code must retain the
    above copyright notice, this list of conditions
    and the following disclaimer.
 2) Redistributions in binary form must reproduce the
    above copyright notice, this list of conditions
    and the following disclaimer in the documentation
    and/or other materials provided with the
    distribution.
 3) Neither the name of the Reify Software, Inc. nor
    the names of its contributors may be used to
    endorse or promote products derived from this
    software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS
 AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED    
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
 USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
 USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 OF SUCH DAMAGE.

*/

function GM_xmlhttpReq(details) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var responseState = {
            responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
            responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
            readyState:xmlhttp.readyState,
            responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
            status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
            statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
        }
        if (details["onreadystatechange"]) {
            details["onreadystatechange"](responseState);
        }
        if (xmlhttp.readyState==4) {
            if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                details["onload"](responseState);
            }
            if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                details["onerror"](responseState);
            }
        }
    }
    try {
      //cannot do cross domain
      xmlhttp.open(details.method, details.url);
    } catch(e) {
      if( details["onerror"] ) {
        //simulate a real error
        details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
      }
      return;
    }
    if (details.headers) {
        for (var prop in details.headers) {
            xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
    }
    xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
}

var szett;

function getFromCharacter(what)
{
	var nx = getFirstByText('td',what).nextSibling;
	var str = getFirstByClassRoot(nx,'span','csik_szoveg').innerHTML;
	str = str.removeTrash();
	return str.split('/');
}

function getByTextRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML==name) items.push(elems[i]);
	}
	return items;
}

function getByText(tag, name){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML==name) items.push(elems[i]);
	}
	return items;
}

function getValueByRegexRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	eval('var nameregex = /'+name+'/;');
	for (i=0; i<elems.length; i++){
		var mtch = elems[i].innerHTML.match(nameregex);
		if (mtch) items.push(mtch[1]);
	}
	return items;
}

function getFirstValueByRegexRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	eval('var nameregex = /'+name+'/;');
	for (i=0; i<elems.length; i++){
		var mtch = elems[i].innerHTML.match(nameregex);
		if (mtch) return mtch[1];
	}
	throw Exception();
}


function getByRegexRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	eval('var nameregex = /'+name+'/;');
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML.match(nameregex)) items.push(elems[i]);
	}
	return items;
}

function getByRegex(tag, classname){
	items = getByRegexRoot(document, tag, classname);
	return items[0];
}


function getFirstByRegex(tag, classname){
	items = getByRegexRoot(document, tag, classname);
	return items[0];
}

function getFirstByRegexRoot(doc, tag, classname){
	items = getByRegexRoot(doc, tag, classname);
	return items[0];
}

function getFirstByText(tag, classname){
	items = getByText(tag, classname);
	return items[0];
}

function getFirstByTextRoot(doc, tag, name){
	items = getByTextRoot(doc, tag, name);
	return items[0];
}

function getByTextRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML.indexOf(name)!=-1) items.push(elems[i]);
	}
	return items;
}

function getByClassRoot(doc, tag, classname){
	items = [];
	elems = doc.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) items.push(elems[i]);
	}
	return items;
}

function getFirstByClassRoot(doc, tag, classname){
	items = getByClassRoot(doc, tag, classname);
	return items[0];
}

function getFirstTextByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0].innerHTML;
}

function getFirstByClass(tag, classname){
	items = getByClassRoot(document, tag, classname);
	return items[0];
}

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function GM_setVal( cookieName, cookieValue, lifeTime ) {
	if( !cookieName ) { return; }
	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
}

function GM_getVal( cookieName, oDefault ) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) {
			try {
				eval('var footm = '+unescape( oneCookie[1] ));
			} catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
}

function getRecoverableString(oVar,notFirst) {
	var oType = typeof(oVar);
	if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
		//most browsers say that the typeof for null is 'object', but unlike a real
		//object, it will not have any overall value
		return 'null';
	}
	if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
	if( oType == 'object' ) {
		//Safari throws errors when comparing non-objects with window/document/etc
		if( oVar == window ) { return 'window'; }
		if( oVar == document ) { return 'document'; }
		if( oVar == document.body ) { return 'document.body'; }
		if( oVar == document.documentElement ) { return 'document.documentElement'; }
	}
	if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
	if( !notFirst ) {
		Object.prototype.toRecoverableString = function (oBn) {
			if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
			this.tempLockIgnoreMe = true;
			var retVal = '{', sepChar = '', j;
			for( var i in this ) {
				if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; 
}
				if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
				j = this[i];
				if( !i.match(basicObPropNameValStr) ) {
					//for some reason, you cannot use unescape when defining peoperty names inline
					for( var x = 0; x < cleanStrFromAr.length; x++ ) {
						i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
					}
					i = '\''+i+'\'';
				} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine 

&& ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
					//IE mac does not allow numerical property names to be used unless they are quoted
					i = '\''+i+'\'';
				}
				retVal += sepChar+i+':'+getRecoverableString(j,true);
				sepChar = ',';
			}
			retVal += '}';
			this.tempLockIgnoreMe = false;
			return retVal;
		};
		Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
		Array.prototype.toRecoverableString = function () {
			if( this.tempLock ) { return '[\'LoopBack\']'; }
			if( !this.length ) {
				var oCountProp = 0;
				for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 

'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
				if( oCountProp ) { return this.toRecoverableObString(true); }
			}
			this.tempLock = true;
			var retVal = '[';
			for( var i = 0; i < this.length; i++ ) {
				retVal += (i?',':'')+getRecoverableString(this[i],true);
			}
			retVal += ']';
			delete this.tempLock;
			return retVal;
		};
		Boolean.prototype.toRecoverableString = function () {
			return ''+this+'';
		};
		Date.prototype.toRecoverableString = function () {
			return 'new Date('+this.getTime()+')';
		};
		Function.prototype.toRecoverableString = function () {
			return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,
				'function () {[\'native code\'];}');
		};
		Number.prototype.toRecoverableString = function () {
			if( isNaN(this) ) { return 'Number.NaN'; }
			if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
			if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
			return ''+this+'';
		};
		RegExp.prototype.toRecoverableString = function () {
			return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
		};
		String.prototype.toRecoverableString = function () {
			var oTmp = escape(this);
			if( oTmp == this ) { return '\''+this+'\''; }
			return 'unescape(\''+oTmp+'\')';
		};
	}
	if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
	var oTmp = oVar.toRecoverableString();
	if( !notFirst ) {
		//prevent it from changing for...in loops that the page may be using
		delete Object.prototype.toRecoverableString;
		delete Array.prototype.toRecoverableObString;
		delete Array.prototype.toRecoverableString;
		delete Boolean.prototype.toRecoverableString;
		delete Date.prototype.toRecoverableString;
		delete Function.prototype.toRecoverableString;
		delete Number.prototype.toRecoverableString;
		delete RegExp.prototype.toRecoverableString;
		delete String.prototype.toRecoverableString;
	}
	return oTmp;
}
var basicObPropNameValStr = /^\w+$/, cleanStrFromAr = new Array(/\\/g,/'/g,/"/g,/\r/g,/\n/g,/\f/g,/\t/g,new RegExp('-'+'->','g'),new RegExp

('<!-'+'-','g'),/\//g), cleanStrToAr = new Array('\\\\','\\\'','\\\"','\\r','\\n','\\f','\\t','-\'+\'->','<!-\'+\'-','\\\/');

var tabcss = 
'\n.vu_tcol {  border-collapse:collapse; margin:0px; padding:0px; }\n'+
'.vu_tcell { margin:0px; padding:0px; vertical-align:top; } \n'+
'.vu_eimg { border:1px solid gray; margin:0px; padding:0px; }\n'+
'.fullwmid { width:100%; text-align:center; margin-bottom:5px; margin-top:5px  }\n'+
'.vu_atoltozes { display:none; position: fixed; top: 50%; left:50%; margin-top:-25px; margin-left:-150px; width:300px; height:50px; border:1px solid white; background-color:black; text-align:center; font-weight:bold; z-index:9999; }\n'+
'';

var imagedata = 'R0lGODlhEAAQAPIAAAAAAP///zw8PLy8vP///5ycnHx8fGxsbCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';


gitems = new Array( 'fegyver','varázslat','páncél','pajzs','gyuru','nyaklánc','csizma' );
gfinder = new Array('Fegyverek','Varázslatok','Páncélok','Pajzsok','Gyuruk','Nyakláncok','Csizmák');

try {
  var ue = getFirstByRegex('h3','.*szint. végz.*').innerHTML.match(/szint. végzet/).toString().substr(5,1);
 gitems[4] = gitems[4].replace(/u/g,ue);
 gfinder[4] = gfinder[4].replace(/u/g,ue);
} catch (Exception) {}

function createcsopobj(nev,sorszam)
{ 
  if (!sorszam) sorszam =0;
  var tsor = document.createElement('a');
  tsor.href='javascript:';

  var csop = document.createElement('div');
  csop.setAttribute('id','targycsop'+sorszam);
  var add_szett = document.createElement('div');

  add_szett.className='taglista';
  add_szett.style.setProperty('width','300px',null);

  var h5link = document.createElement('a');
  h5link.href='javascript:';
  h5link.className='gomblink'; // uj
  h5link.style.setProperty('width','90%',null);
  var insp = document.createElement('span');
  insp.appendChild(document.createTextNode(nev));
  insp.style.setProperty('width','234px',null);
  insp.setAttribute('id','nevszett'+sorszam);
  h5link.appendChild(insp)
  add_szett.appendChild(h5link);
  
  var tabla = document.createElement('table');
  tabla.style.setProperty('width','100%',null);
  tabla.style.setProperty('border-collapse','collapse',null);
  tabla.cellSpacing='1px';
  tabla.cellPadding='1px';
  var ujcella,col,ujsor;
  for (ij=0,ind=0;ij<3;ij++)
  {
	ujsor = tabla.insertRow(ij);
	col = szett[sorszam][ind]==gitems[ind]?'gray':'white';
	ujcella = tsor.cloneNode(true);
	ujcella.appendChild(document.createTextNode(szett[sorszam][ind].replace('-',',')));
	ujcella.setAttribute('id','szett'+sorszam+'targy'+(ind++));
	ujcella.style.setProperty('color',col,null);
	ujsor.insertCell(0).appendChild(ujcella);
	ujsor.cells[0].style.setProperty('text-align','center',null);
	ujsor.cells[0].style.setProperty('border-top','1px solid gray',null);
	ujsor.cells[0].style.setProperty('width','49%',null);
	ujcella = tsor.cloneNode(true);
	col = szett[sorszam][ind]==gitems[ind]?'gray':'white';
	ujcella.appendChild(document.createTextNode(szett[sorszam][ind].replace('-',',')));
	ujcella.setAttribute('id','szett'+sorszam+'targy'+(ind++));
	ujcella.style.setProperty('color',col,null);
	ujsor.insertCell(1);
	ujsor.insertCell(2).appendChild(ujcella);
	ujsor.cells[2].style.setProperty('text-align','center',null);
	ujsor.cells[2].style.setProperty('border-top','1px solid gray',null);
	ujsor.cells[2].style.setProperty('width','49%',null);
  }
  ujcella = tsor.cloneNode(true);
  col = szett[sorszam][ind]==gitems[ind]?'gray':'white';
  ujcella.appendChild(document.createTextNode(szett[sorszam][ind].replace('-',',')));
  ujcella.setAttribute('id','szett'+sorszam+'targy'+(ind++));
  ujcella.style.setProperty('color',col,null);
  ujsor = tabla.insertRow(3);
  ujsor.insertCell(0).appendChild(ujcella);
  ujsor.insertCell(1);
 // if (sorszam == (maxszett-1))
  {
	  ujcella = tsor.cloneNode(true);
	  ujcella.appendChild(document.createTextNode('X'));
	  ujcella.setAttribute('id','utolsotorlese'+sorszam);
	  ujcella.style.setProperty('color','red',null);
	  ujcella.style.setProperty('font-weight','bold',null);
	  ujcella.style.setProperty('width','10px',null);
	  ujcella.style.setProperty('border','1px solid white',null);
	  ujsor.insertCell(2).appendChild(ujcella);
	  ujsor.cells[2].style.setProperty('text-align','right',null);
	  ujcella.style.setProperty('font-weight','bold',null);
  }
  tabla.rows[3].cells[0].style.setProperty('text-align','center',null);
  tabla.rows[3].cells[0].style.setProperty('vertical-align','top',null);
  tabla.rows[3].cells[0].style.setProperty('border-top','1px solid gray',null);
  tabla.rows[0].cells[0].style.setProperty('border-top','0px',null);
  tabla.rows[0].cells[2].style.setProperty('border-top','0px',null);


  var pretabla = document.createElement('table');
  pretabla.style.setProperty('width','100%',null);
  pretabla.style.setProperty('border-collapse','collapse',null);

  ujsor = pretabla.insertRow(0);
  ujcella = tsor.cloneNode(true);
  ujcella.appendChild(add_szett);

  var ncells = ujsor.insertCell(0);
  ncells.appendChild(ujcella);
  ncells.colSpan=2;

  ujcella = tsor.cloneNode(true);
  var chlink = document.createElement('a');
  chlink.appendChild(document.createTextNode(!szettstatus[sorszam]?'Rejt':'Mutat'));
  chlink.link='javascript:';
  chlink.setAttribute('id','displayszett('+sorszam+');');
  ujcella.appendChild(chlink);
  ujsor.insertCell(1).appendChild(ujcella);
  ujsor.cells[1].style.setProperty('width','50px',null);
  ujsor.cells[1].style.setProperty('text-align','center',null);
  ujsor.cells[1].style.setProperty('font-size','10px',null);
  ujsor.cells[0].style.setProperty('width','80px',null);

  csop.appendChild(pretabla);

  var subdiv = document.createElement('div');
  subdiv.appendChild(tabla);
  subdiv.setAttribute('id','szettkonstrukt'+sorszam);
  if (szettstatus[sorszam])  subdiv.style.setProperty('display','none',null);
  csop.appendChild(subdiv);
  return csop;

}

function createcsopgyari(nev,sorszam,splink)
{ 
  var tsor = document.createElement('a');
  tsor.href=splink+sorszam;

  var csop = document.createElement('div');
  csop.setAttribute('id','gyari'+sorszam);
  var add_szett = document.createElement('div');

  add_szett.className='taglista';
  add_szett.style.setProperty('width','300px',null);

  var h5link = document.createElement('a');
//  h5link.href='javascript:';
  h5link.className='gomblink'; // uj
  h5link.style.setProperty('width','90%',null);
  var insp = document.createElement('span');
  insp.appendChild(document.createTextNode(nev));
  insp.style.setProperty('width','234px',null);
  insp.style.setProperty('color','yellow',null);
  insp.setAttribute('id','gyarinev'+sorszam);
  h5link.appendChild(insp)
  add_szett.appendChild(h5link);
  

  var pretabla = document.createElement('table');
  pretabla.style.setProperty('width','100%',null);
  pretabla.style.setProperty('border-collapse','collapse',null);

  ujsor = pretabla.insertRow(0);
  ujcella = tsor.cloneNode(true);
  ujcella.appendChild(add_szett);

  var ncells = ujsor.insertCell(0);
  ncells.appendChild(ujcella);
  ncells.colSpan=2;

  ujcella = tsor.cloneNode(true);

  ujsor.insertCell(1).appendChild(ujcella);
  ujsor.cells[1].style.setProperty('width','50px',null);
  ujsor.cells[1].style.setProperty('text-align','center',null);
  ujsor.cells[1].style.setProperty('font-size','10px',null);
  ujsor.cells[0].style.setProperty('width','80px',null);

  csop.appendChild(pretabla);

  return csop;

}

function displayszett(sorszam)
{
	szettstatus[sorszam] = !szettstatus[sorszam];
	GM_setVal(prefix+sorszam+'show',szettstatus[sorszam]);
	if (szettstatus[sorszam])
	{ 
		document.getElementById('displayszett('+sorszam+');').innerHTML = 'Mutat';
		document.getElementById('szettkonstrukt'+sorszam).style.setProperty('display','none',null);
	}
	else 
	{
		document.getElementById('displayszett('+sorszam+');').innerHTML = 'Rejt';
		document.getElementById('szettkonstrukt'+sorszam).style.setProperty('display','block',null);
	}

}

function id(elem){
	return document.getElementById(elem);
}

if (String.prototype.removeTrash==null) String.prototype.removeTrash=function(n)
{
	return this.replace(/[^0-9\/-]/g,'');
}

function formatNum(nStr)
{
	nStr += '';
	x = nStr.split(',');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

if (String.prototype.left==null) String.prototype.left=function(n)
{
   if (n<0)
    return this.substring(0, this.length+n);
   else
    return this.substring(0, n);
}

if (String.prototype.trim==null) String.prototype.trim=function(n)
{
    return this.replace(/^\s+|\s+$/g,'');
}

if (Array.prototype.clone==null) Array.prototype.clone = function () {
var arr1 = new Array(); 
for (var property in this) {
arr1[property] = typeof (this[property]) == 'object' ? this[property].clone() : this[property]
}
return arr1;
}

if (!GM_getValue) GM_getValue=function(key,def)
{
	return def;
}

try {

username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
var whref = window.location.href;
var vilag = strcut('//','.',whref)+'.vegzetur';

var obj = getFirstByClass('div','avatar_pic');
obj.style.setProperty('display','none',null);
var eredmeny = getFirstByClass('div','eredmenyek_block');
eredmeny.style.setProperty('display','none',null);
var bonusz = getFirstByClass('div','bonuszok_block');
var bemutatkozas = getFirstByClass('div','karakter_bemutatkozas');
if (bemutatkozas) bemutatkozas.style.setProperty('display','none',null);
{
  tabtodel = getFirstByClass('table','eredmenyek_stat');
  tabtodel.parentNode.removeChild(tabtodel.nextSibling);
  tabtodel.parentNode.removeChild(tabtodel);
}
var invis;
try {
  invis = getFirstByText('span','Láthatatlanság').parentNode;
} catch (Exception) {}

var maxszett=0;
//for(xx=0;xx<username.length;xx++) { maxszett += username.charCodeAt(xx); }
//if (861==maxszett)
//{	targycsoport =! targycsoport; kepek = !kepek; }
var prefix = 'szett'+vilag+username+'_';

var rogzit = GM_getVal(prefix+'rogzit',GM_getValue(prefix+'rogzit',true));
var baselink = new Array();
var szett = new Array();
var szettnev = new Array();
var szettstatus = new Array();
maxszett = GM_getVal(prefix+'count',GM_getValue(prefix+'count',1));
var targyb = getFirstByClass('div','targyak_block');

var cs = document.createElement('style');
cs.appendChild(document.createTextNode(tabcss));
document.getElementsByTagName("head")[0].appendChild(cs);

var allitem = getByRoot(base,'a');
for (xx=0;xx<allitem.length-1;xx++)
{
	hrf = allitem[xx].href;
	if (hrf.length>0) baselink[allitem[xx].innerHTML.replace(/([0-9]*) db /,'')]=hrf;
}

for (iz=0;iz<maxszett;iz++)
{ 
 try {
  szett[iz] = GM_getVal(prefix+iz,GM_getValue(prefix+iz,gitems.toString())).split(',');
  for(xx=0;xx<szett[iz].length;xx++)
  {
	if (!baselink[szett[iz][xx]]) szett[iz][xx]=gitems[xx]; 
  }
  GM_setVal(prefix+iz,szett[iz].toString());
 } catch (Exception) { szett[iz] = gitems.slice(); }
  szettnev[iz] = GM_getVal(prefix+iz+'nev',GM_getValue(prefix+iz+'nev',(iz+1)+'. csoport'));
  szettstatus[iz] = GM_getVal(prefix+iz+'show',false);
}

if (!kepek)
try {
	var wpic = getByClass('div','targy_kep');
	for(xx=0;xx<wpic.length;xx++)
		wpic[xx].style.setProperty('display','none',null);
	wpic = getFirstByClass('table','harcolo_leny');
	iz = getByRoot(wpic,'img');
	for(xx=iz.length-1;xx>=0;xx--)
	{
		iz[xx].parentNode.removeChild(iz[xx]);
	}
	iz = getByRoot(wpic,'td');
	for(xx=iz.length-1;xx>=0;xx--)
	{
		iz[xx].innerHTML = iz[xx].innerHTML.replace(/<br>/,' ').replace(/Az .llat aktu.lis t.rgya/,'Tárgy');
	}
} catch (Exception) {}
//table class="karakter_stat"

var epbon;

try
{
  epbon = getFirstByClass('td','epulet_bonusz').parentNode.parentNode;	
}
catch (Exception)
{
	epbon = null;
}

var stable = getFirstByClass('table','karakter_stat');
var nr = stable.insertRow(0);
nr.insertCell(0);
nr.insertCell(1);
nr.insertCell(2).appendChild(document.createTextNode('Alap')); 
nr.insertCell(3).appendChild(document.createTextNode('Tárgy')); 
nr.insertCell(4).appendChild(document.createTextNode(' '));
nr.insertCell(5).appendChild(document.createTextNode('Össz'));
nr.insertCell(6).appendChild(document.createTextNode('Épület'));


if (viseltpoz!=-1)
try {
var imgs = getByClassRoot(targyb,'img','');
var regikoz = getFirstByClass('div',"koz_ures");
var ptable = document.createElement('table');
var pnamesc = '';
ptable.className='vu_tcol';
ptable.insertRow(0);
var sml = new Array();
for(xx=0,xc=0;xx<imgs.length;xx++)
{
	var newimg = imgs[xx].cloneNode(true);
	newimg.title = imgs[xx].alt;
	newimg.title = newimg.title.left(1).toUpperCase()+newimg.title.substr(1);
	pnamesc += newimg.title+', ';
	var cw = Math.floor(parseInt(newimg.style.getPropertyValue('width').toString().removeTrash())/2.2);
	newimg.className='vu_eimg';
	newimg.style.setProperty('width',cw+'px',null);
	var newlink = document.createElement('a');
	newlink.href = 'javascript:';
	newlink.setAttribute('id','quick'+xx);
	newimg.setAttribute('id','quick'+xx);
	newlink.appendChild(newimg);
	if (cw<100)
	{
		sml.push(newlink); // utso
	}
	else {
		ptable.rows[0].insertCell(xc);
		ptable.rows[0].cells[xc].appendChild(newlink); // tobbi
		ptable.rows[0].cells[xc].className='vu_tcell';
		xc++;
	}
}
if (sml.length>0)
{
		ptable.rows[0].insertCell(xc);
		for(xx=0;xx<sml.length;xx++) {
			ptable.rows[0].cells[xc].appendChild(sml[xx]);
			if (xx<sml.length-1) { ptable.rows[0].cells[xc].appendChild(document.createElement('br')); 
								   sml[xx].style.setProperty('border-bottom','0px',null); }
		}
		ptable.rows[0].cells[xc].className='vu_tcell';
}

var pnames = document.createElement('div');
pnames.setAttribute('id','targynevek_fstvz');
pnames.style.setProperty('display','none',null);
pnames.style.setProperty('width','80%',null);
pnames.appendChild(document.createTextNode(pnamesc.left(-2)));

var ujblock = document.createElement('div');
ujblock.className='jobb_content_top';
var d1 = document.createElement('div');
d1.className='jobb_content_bottom';
var d2 = document.createElement('div');
d2.className='jobb_content';
var d3 = document.createElement('div');
d3.className='karakterlap';
var d4 = document.createElement('div');
d4.className='h3_out';
var h1 = document.createElement('h3');
h1.appendChild(document.createTextNode('Viselt tárgy ikonok'));
d4.appendChild(h1);
//d3.appendChild(d4);
d2.appendChild(d3);
d1.appendChild(d2);
ujblock.appendChild(d1);
var toinsert;
if (viseltpoz) toinsert = regikoz.nextSibling;
else toinsert = document.getElementById('infobox').nextSibling;
regikoz.parentNode.insertBefore(ujblock,toinsert);
regikoz.parentNode.insertBefore(regikoz.cloneNode(true),toinsert);
var pdiv = document.createElement('div');
var pcen = document.createElement('center');
pcen.appendChild(ptable);
pcen.appendChild(pnames);
pdiv.appendChild(pcen);
d3.appendChild(pdiv);
pdiv.className='fullwmid';
}
catch (Exception) {}
for(i=1;i<8;i++)
{
	var sumst = 0;
	stable.rows[i].cells[2].innerHTML = stable.rows[i].cells[2].innerHTML+'';
	for(j=2;j<4;j++)
	{
		sumst += isNaN(parseInt(stable.rows[i].cells[j].innerHTML.removeTrash()))?0:parseInt(stable.rows[i].cells[j].innerHTML.removeTrash());
		stable.rows[i].cells[j].style.setProperty('text-align','right',null);
		stable.rows[i].cells[j].innerHTML = stable.rows[i].cells[j].innerHTML.replace(/\(/,'').replace(')','');
	}
	stable.rows[i].insertCell(4).appendChild(document.createTextNode('='));
	stable.rows[i].insertCell(5).appendChild(document.createTextNode(sumst));
	stable.rows[i].cells[5].style.setProperty('text-align','right',null);
}
try { stable.rows[2].cells[6].appendChild(document.createTextNode('/ +'+getFirstValueByRegexRoot(epbon,'td','^.([0-9]*) t.mad.s .Gyakorl.t.r.$'))); } catch (Exception) { }
try { stable.rows[3].cells[6].appendChild(document.createTextNode('/ +'+getFirstValueByRegexRoot(epbon,'td','^.([0-9]*) v.dekez.s .V.d.fal.$'))); } catch (Exception) {}
try { stable.rows[5].cells[6].appendChild(document.createTextNode('/ +'+getFirstValueByRegexRoot(epbon,'td','^.([0-9]*) IQ .Nekrofun f.kusz.$'))); } catch (Exception) {}

//epulet_bonusz
try { 
    if (!bonusz)
    {
		bonusz = document.createElement('div');
		bonusz.className='bonuszok_block';
		eredmeny.parentNode.insertBefore(bonusz,eredmeny.nextSibling);
    }
	var xtb = getFirstByClassRoot(bonusz,'table','');
	if (!xtb)
	{
		xtb = document.createElement('table');
		if (bonusz.firstChild)
		{
			bonusz.insertBefore(xtb,bonusz.firstChild.nextSibling);
		}
		else bonusz.appendChild(xtb);
	}
	xtb.style.setProperty('width','100%',null);
	if (invis)
	{
		var nr;
		var chcell = getByClassRoot(xtb,'td','bonusz');
		if (chcell)
		{
			nr = xtb.insertRow(chcell.length);
		}
		else
		{
			nr = xtb.insertRow(xtb.rows.length);
		}
		nc = nr.insertCell(0);
		nc.colSpan=2;
		nc.appendChild(invis);
		var charnum;
		try {
			try
			{
				charnum = document.getElementById('characterbase').innerHTML.match(/\(([0-9]*)\)/)[1];
			}
			catch (Exception)
			{
				charnum = getByTitle('span','Karakterszám')[0].innerHTML.match(/\(([0-9]*)\)/)[1];
			}
			if (chcell)
			{
				nr = xtb.insertRow(chcell.length);
			}
			else
			{
				nr = xtb.insertRow(xtb.rows.length);
			}
			nc = nr.insertCell(0);
			nc.colSpan=2;
			var orig = invis.cloneNode(true);
			orig.firstChild.innerHTML='Eredeti karakterlap';
			orig.href=getFirstByText('a','Karakterlap').href+'&user='+charnum;
			nc.appendChild(orig);
		} catch (Exception) {}
	}


	for(xz=xtb.rows.length-1;xz>=0;xz--)
	{
		if ('epulet_bonusz'==xtb.rows[xz].cells[0].className)
			xtb.deleteRow(xz);
		else
		if (xtb.rows[xz].cells[1])
		{
			xtb.rows[xz].cells[1].style.setProperty('text-align','right',null);
		}
	}

} catch (Exception) {}


var szettdiv = document.createElement('div');
szettdiv.className='eredmenyek_block';
var szett_head = document.createElement('div');
szett_head.className='h4_out';
var h4head = document.createElement('h4');
h4head.appendChild(document.createTextNode('Tárgy csoportok'));
szett_head.appendChild(h4head);
szettdiv.appendChild(szett_head);
eredmeny.parentNode.insertBefore(szettdiv,eredmeny);



var add_szett = document.createElement('div');
add_szett.className='h5_out';
//add_szett.style.setProperty('width','45%',null);

var ujcsop = document.createElement('a');
ujcsop.appendChild(document.createTextNode('Új csoport létrehozása'));
ujcsop.href='javascript:';
ujcsop.setAttribute('id','ujtargycsoport');
var h5head = document.createElement('h5');
h5head.appendChild(ujcsop);
add_szett.appendChild(h5head);

ujcsop = document.createElement('a');
ujcsop.appendChild(document.createTextNode(rogzit?'Rögzít':'Választ'));
ujcsop.href='javascript:';
ujcsop.setAttribute('id','rogzites');
var h5head = document.createElement('h5');
h5head.appendChild(ujcsop);

var add_szettb = document.createElement('div');
add_szettb.className='h5_out';
add_szettb.style.setProperty('width','75px',null);
add_szettb.appendChild(h5head);

add_szettb.style.setProperty('position','relative',null);
add_szettb.style.setProperty('left','+65px',null);

{ 
	var ntb = document.createElement('table');
	ntb.insertRow(0);
	ntb.rows[0].insertCell(0);
	ntb.rows[0].insertCell(1);
	ntb.rows[0].cells[0].appendChild(add_szett);
	ntb.rows[0].cells[1].appendChild(add_szettb);
	szettdiv.appendChild(ntb);
}

//form class="oltozetform" method="post" action="http://vilag2.vegzetur.hu/index.php?m=karakterlap"><in


try
{
var oform = getFirstByClass('form','oltozetform');
var hinp = getFirstByRoot(oform,'input');
var splink = oform.action+'&'+hinp.name+'='+hinp.value+'&oltozet=';

var gyari = getFirstByName('select','oltozet');
for(iz=0;iz<gyari.length;iz++)
	szettdiv.appendChild(createcsopgyari(gyari.options[iz].innerHTML,gyari.options[iz].value,splink));
	
}
catch (Exception){}


for(iz=0;iz<maxszett;iz++)
	szettdiv.appendChild(createcsopobj(szettnev[iz],iz));

var retcount=0;
var intervalid;
var waitcounter;

function checkfinish()
{
	if ((0==retcount) || (waitcounter>1000)) {
		clearInterval(intervalid);
		location.assign(getFirstByText('a','Karakterlap'));
	};
	waitcounter++;
}

GM_setVal(prefix+'choose',false);
var helpbox = document.createElement('div');
helpbox.setAttribute('id', 'helpbox');
helpbox.setAttribute('class', 'message_center');
helpbox.setAttribute('style', 'margin: 5px;');
helpbox.style.setProperty('display','none',null);
document.getElementById('jobb_in').insertBefore(helpbox,document.getElementById('jobb_in').firstChild);

var aver = parseFloat('1'+settings.version)*100;

if (GM_getVal(prefix+'_help',0)!=aver)
{
	if (quickhelp)
	{
		helpbox.innerHTML = quickhelp.replace(/\n/g,'<br>')+'<br><br><a href="javascript:" id="helpoff">Segítség kikapcsolása</a>';
		helpbox.style.setProperty('display','',null);
	}
	else
	{
		GM_setVal(prefix+'_help',aver);
	}
}


function do_rogzit(obj,oid,event) {
     try {
		var kod = oid.match(/^szett([0-9]*)targy([0-9]*)/);
		x =  event.layerX;
		y =  event.layerY;
		var izeke = getFirstByText('h4',gfinder[parseInt(kod[2])]).parentNode.parentNode.cloneNode(true);
		eval('var matchitem = /^'+gitems[kod[2]]+'$/');
		if ((izeke.childNodes.length>2) || (!obj.innerHTML.match(matchitem)))
		{
			izeke.style.setProperty('position','absolute',null);
			izeke.style.setProperty('top',(y-100)+'px',null);
			izeke.style.setProperty('left',(x-180)+'px',null);
			izeke.style.setProperty('background-color','black',null);
			izeke.style.setProperty('padding','10px',null);
			izeke.appendChild(document.createElement('br'));
			var megse = document.createElement('a');
			megse.href='javascript:';
			var torol;
			if (!obj.innerHTML.match(matchitem))
			{
				torol = megse.cloneNode(true);
				torol.appendChild(document.createTextNode('Törlés'));
			}
			megse.appendChild(document.createTextNode('Mégse'));
			var backg = document.createElement('div');
			if (torol) { backg.appendChild(torol); backg.appendChild(document.createElement('br')); }
			backg.appendChild(megse);
			izeke.appendChild(backg);
			backg = document.createElement('div');
			backg.setAttribute('id','chooser');
			backg.appendChild(izeke);
			szettdiv.appendChild(backg);
			GM_setVal(prefix+'choose',true);
			GM_setVal(prefix+'choosefor',oid);
		}
		else
		{
			var newitem = izeke.childNodes[1].firstChild.innerHTML.replace(/([0-9]*) db /,'').trim();
			szett[kod[1]][kod[2]] = newitem.replace(',','-');
			var sind = parseInt(kod[1]);
			obj.removeChild(obj.firstChild);
			obj.appendChild(document.createTextNode(newitem));
			if (!baselink[newitem])
				baselink[newitem] = getFirstByRegexRoot(base,'a',(newitem)+'$');
			obj.style.setProperty('color','white',null);
			GM_setVal(prefix+kod[1],szett[sind].toString());
		}
      } catch (Exception) { }
	  return true;
}


function do_valaszt(obj,oid,event) {
     try {
		x =  event.layerX;
		y =  event.layerY;
		var izeke = getFirstByText('h4',gfinder[parseInt(oid)]).parentNode.parentNode.cloneNode(true);
		eval('var matchitem = /^'+gitems[oid]+'$/');
		if ((izeke.childNodes.length>2) || (!obj.innerHTML.match(matchitem)))
		{
			izeke.style.setProperty('position','absolute',null);
			izeke.style.setProperty('top',(y-100)+'px',null);
			izeke.style.setProperty('left',(x-180)+'px',null);
			izeke.style.setProperty('background-color','black',null);
			izeke.style.setProperty('padding','10px',null);
			izeke.appendChild(document.createElement('br'));
			var megse = document.createElement('a');
			megse.href='javascript:';
			var torol;
			megse.appendChild(document.createTextNode('Mégse'));
			var backg = document.createElement('div');
			backg.appendChild(megse);
			izeke.appendChild(backg);
			backg = document.createElement('div');
			backg.setAttribute('id','choosefix');
			backg.appendChild(izeke);
			szettdiv.appendChild(backg);
		}
		else
		{
			var newitem = izeke.childNodes[1].firstChild.innerHTML.replace(/([0-9]*) db /,'').trim();
			obj.removeChild(obj.firstChild);
			obj.appendChild(document.createTextNode(newitem));
			if (!baselink[newitem])
				baselink[newitem] = getFirstByRegexRoot(base,'a',(newitem)+'$');
			obj.style.setProperty('color','white',null);
		}
      } catch (Exception) { }
	  return true;
}

document.addEventListener('click', function(event) {

try {
	var clickdisabled = GM_getVal(prefix+'choose',false);

	var obj = event.target;
	var oid = obj.getAttribute('id'); // alap tárgyaknak nincs ID-je!!!!!!!!
	var qch;
	try
	{
		qch = oid.match(/quick(.*)/)[1];
	}
	catch (Exception)
	{
		qch = -1 ;
	}
	if ((oid=='rogzites') && !clickdisabled)
      {
		rogzit = !rogzit;
		if (rogzit) obj.innerHTML = 'Rögzít';
		else obj.innerHTML = 'Választ';
		GM_setVal(prefix+'rogzit',rogzit);
		clickdisabled = true;
      }
	if ((oid=='helpoff') && !clickdisabled)
	{
		helpbox.style.setProperty('display','none',null);
		GM_setVal(prefix+'_help',aver);
	}
	if ((oid=='ujtargycsoport') && !clickdisabled)
	{
		szett.push(gitems.clone());
		szettdiv.appendChild(createcsopobj((szett.length)+'. csoport',szett.length-1));
		GM_setVal(prefix+'count',szett.length);
		xz = szett.length-1;
		GM_setVal(prefix+xz,szett[xz].toString());
		GM_setVal(prefix+xz+'nev',(xz+1)+'. csoport');
		clickdisabled = true;
	}
	var oindex;
	try { 
		oindex = oid.indexOf('szett');
	} catch (Exception) { 
	try { 
		oindex = obj.parentNode.getAttribute('id').indexOf('szett');
	} catch (Exception) { oindex = -1; } }
	var torol = false;
	try {
		torol = oid.match(/utolsotorlese(.*)/);
	} catch (Exception) {}

	if (torol && !clickdisabled)
	{
		maxszett = parseInt(torol[1]);
		szett.splice(maxszett,1);
		szettnev.splice(maxszett,1);
		szettstatus.splice(maxszett,1);
		GM_setVal(prefix+'count',szett.length);
		remobj = document.getElementById('targycsop'+maxszett);
		remobj.parentNode.removeChild(remobj);
		for(xz=0;xz<szett.length;xz++)
		{
			GM_setVal(prefix+xz,szett[xz].toString());
			GM_setVal(prefix+xz+'nev',szettnev[xz]);
			GM_setVal(prefix+xz+'show',szettstatus[xz]);
		}
		clickdisabled = true;

	}
	if ((7==oindex) && !clickdisabled)
	{
		if (oid) eval(oid);
	}
	if ((3==oindex) && !clickdisabled)
	if (rogzit)
	{
		var kod = oid.match(/^nevszett([0-9]*)/);
		var newname = prompt('Mi legyen a szett neve?',obj.innerHTML);
		if (newname)
		{
			var kod = oid.match(/^nevszett([0-9]*)/);
			GM_setVal(prefix+(kod[1])+'nev',newname);
			szettnev[kod[1]]=newname;
			obj.innerHTML = newname;
			clickdisabled = true;
		}
	}
	else
	{
		var kod = oid.match(/^nevszett([0-9]*)/);
//		var puton = GM_getVal(prefix+kod[1]).split(',');
		var puton = szett[kod[1]];
		var nl,src,putitem;
		retcount = 0;
		for(ix=0;ix<puton.length;ix++)
		{
			nl = null;
			putitem = puton[ix].replace('-',',');
			if ((putitem!=gitems[ix]) && !getFirstByTextRoot(targyb,'h5',putitem))
			{
				retcount++;
				if (baselink[putitem])
				{
					nl = baselink[putitem];
				}
				else {
					baselink[putitem] = getFirstByRegexRoot(base,'a',(putitem)+'$');
					nl = baselink[putitem];
				}
				ruhafel(nl.toString(),function(data){ retcount--; });
			}
		}
		if (retcount>0)
		{
			GM_setVal(prefix+'choose',true);
			document.getElementById('xyz').style.setProperty('display','block',null);
			intervalid = setInterval(checkfinish,100);
			waitcounter=0;
		}
		clickdisabled = true;
	}
	if ((0==oindex) && !clickdisabled)
	{
	if (rogzit)
		clickdisabled = do_rogzit(obj,oid,event);
	else
	{
		if (baselink[obj.innerHTML]) location.assign(baselink[obj.innerHTML]);
		else clickdisabled = do_rogzit(obj,oid,event);
	}
	}	
	if (clickdisabled){
		event.stopPropagation();
		event.preventDefault();
	}
	var clickroot = null;
	try {
		clickroot = obj.parentNode.parentNode.parentNode.getAttribute('id');
	} catch (Exception) {}
	if (qch!=-1)
	{
		do_valaszt(obj,qch,event);
	}
	if (clickroot && clickroot.match(/^choosefix$/)) 
	{
		clickroot = obj.parentNode.parentNode.parentNode;
		if (obj.innerHTML.match(/^M.gse$/))
		{
			clickroot.parentNode.removeChild(clickroot);
			event.stopPropagation();
			event.preventDefault();
		}
	}
	if (clickroot && clickroot.match(/^chooser$/)) {
		clickroot = obj.parentNode.parentNode.parentNode;
		if (obj.innerHTML.match(/^M.gse$/))
		{
			clickroot.parentNode.removeChild(clickroot);
			GM_setVal(prefix+'choose',false);
			event.stopPropagation();
			event.preventDefault();
		}
		else 
		if (obj.innerHTML.match(/^T.rl.s$/))
		{
			event.stopPropagation();
			event.preventDefault();
			var bkod = GM_getVal(prefix+'choosefor');
			var kod = bkod.match(/szett([0-9]*)targy([0-9]*)/);
			var newitem = gitems[kod[2]];
			szett[kod[1]][kod[2]] = newitem;
			var sind = parseInt(kod[1]);
			kod = document.getElementById(bkod);		
			kod.removeChild(kod.firstChild);
			kod.appendChild(document.createTextNode(newitem));
			kod.style.setProperty('color','gray',null);
			location.assign( "javascript:targy_out();void(0)" );
			clickroot.parentNode.removeChild(clickroot);
			GM_setVal(prefix+'choose',false);
			GM_setVal(prefix+sind,szett[sind].toString());
		}
		else
		{	
			event.stopPropagation();
			event.preventDefault();
			var bkod = GM_getVal(prefix+'choosefor');
			var kod = bkod.match(/szett([0-9]*)targy([0-9]*)/);
			var newitem = obj.innerHTML.replace(/([0-9]*) db /,'').trim();
			if (!baselink[newitem])
						baselink[newitem] = getFirstByRegexRoot(base,'a',(newitem)+'$');
			szett[kod[1]][kod[2]] = newitem.replace(',','-');
			var sind = parseInt(kod[1]);
			kod = document.getElementById(bkod);		
			kod.removeChild(kod.firstChild);
			kod.appendChild(document.createTextNode(newitem));
			kod.style.setProperty('color','white',null);
			location.assign( "javascript:targy_out();void(0);" );
			clickroot.parentNode.removeChild(clickroot);
			GM_setVal(prefix+'choose',false);
			GM_setVal(prefix+sind,szett[sind].toString());
		}
	}
} catch (Exception) {}
}, true);

var inimg = document.createElement('img');
inimg.src='data:image/gif;base64,'+imagedata;

var xyz = document.createElement('div');
xyz.setAttribute('id','xyz');
xyz.className='vu_atoltozes';
xyz.appendChild(inimg.cloneNode(true));
xyz.appendChild(document.createElement('br'));
xyz.appendChild(document.createTextNode('Az átöltözés folyamatban, kérlek várj!'));
xyz.appendChild(document.createElement('br'));
xyz.appendChild(inimg);
document.getElementById('jobb_in').insertBefore(xyz,document.getElementById('jobb_in').firstChild);

var scriptbox = document.createElement('div');
scriptbox.setAttribute('id', 'scriptbox');
scriptbox.setAttribute('class', 'message_center');
scriptbox.setAttribute('style', 'margin: 5px;');
scriptbox.style.setProperty('display','none',null);
document.getElementById('jobb_in').insertBefore(scriptbox,document.getElementById('jobb_in').firstChild);

var chktime;

adate = new Date();
chktime = ''+adate.getFullYear()+(adate.getMonth()+1)+adate.getDate()+Math.floor(adate.getHours()/3);

if (GM_xmlhttpRequest)
if (GM_getVal('vu_chvercharmod',0)!=chktime)
{
  gmpost('http://userscripts.org/scripts/review/73179', function(data){
	check = data.responseText.match(/version: &quot(.*)&quot;,/)[1].replace(';','v');
    nver = parseFloat(check.replace('v','1'))*100;
	GM_setVal('vu_chvercharmod',check);
	if (aver<nver)
	{	scriptbox.innerHTML = settings.newtxt+check+'<br/>'+settings.down+
		'<a href="http://userscripts.org/scripts/show/73179" target=_new>http://userscripts.org/scripts/show/73179</a>';
		scriptbox.style.setProperty('display','',null);
	}
  });
  GM_setVal('vu_chvercharmod',chktime);
}
else
{
	check = GM_getVal('vu_chvercharmod',0);
	if (check.left=='v')
	{
	    nver = parseFloat(check.replace('v','1'))*100;
		if (aver<nver)
		{	scriptbox.innerHTML = settings.newtxt+check+'<br/>'+settings.down+
			'<a href="http://userscripts.org/scripts/show/73179" target=_new>http://userscripts.org/scripts/show/73179</a>';
			scriptbox.style.setProperty('display','',null);
		}
	}
}
} catch (Exception) {}
