/*
    
*/

// ==UserScript==
// @name            Send image to OOP
// @namespace       oop.cx
// @description     Send image url and context to OOP.cx
// @version         0.2
// @author          TotoZeRigolo
// @license         GPL
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @updateURL       oop.cx
// @include         *
// @exclude         file://*
// @grant           GM_openInTab
// @grant       	GM_xmlhttpRequest
// ==/UserScript==

//console.debug( 'OOP' );
if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return;

var bodyoop = document.body;
bodyoop.addEventListener("contextmenu", initMenuOop, false);

var oopIcon = "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABkAAAAQCAYAAADj5tSrAAADqElEQVQ4jY1\
TW2hcVRRd+5wzmWdm0smz6RjTUrGjFVtNqh8iaEWqiBJBKQpCQQQFpdCPIl\
IQRUSECiKCH4ofaqFCURFEigqiUjCotNRWUmJqUsmjyeTO3Lkz93H29uPOJ\
GNKSw9sDvse9t5r7bUuAVAAuONun2vmE8Pbtz1bHj+026inCunujDfY506F\
3vzMb3+c/25+5ttf3MsnzrnVFQCsAUirjlohGwb/L09pTS+Xy0/s05lj4eK\
lvbVaLRVGkZaGn44ymf7m7EI5IFl6cvx2/mr6wp+RCNH1MlEEdU9/cehIec\
ebzozzjNv0YJlhdAJ9mTyGBoaRTOVQDwK8O3f2rk//+WuyVXr9TJ4bHb33Y\
N/o8WDB3VvzGwhsBBEBs8AQIdeVRm8+j8FiEaX+3to3CzMn634AAKQ7GlEH\
8rVBW7PJ3NFdN7+6s9n1/pLjDNb8JqwIRACIgAgwIGRNF/rzBfTdMILNw6X\
xG3sL1Z8vzvxaDwN7TSav3brj/hf6Sh9Hi8H+erOhI7awLIAIFAEEAkTAEB\
CAdCKJ7mQKyZ5N6pbi5gduC/ju0HUKZsPuudCVNI+Vtu55flPpcDbwH52rV\
OCHASIWCMckiQhZnUDTWgRiETJjyavBLlyCzmSwRRO0NgZae6sKx02nuLuH\
hnqOlsff6V5x9vu11VQliuDZEFa4xVcAMEQILAIiBSCCIgEEqHhVnJ2dhhM\
2sUTyxYHJHw4s+Q13zV035XLDb42Wv1SOO+aFPkgERhkEwvBtBMsCgcAgXp\
dAQeKFwZBAE0FIA9pAstnvX1/8e2Kq5rgA2ADgLel010vFoQ8byytjQRQ3J\
AKS0paHIGAoEWiKPcLUEpIIRAQoBSIF1vTjR5dnn56qOdVWsTIJIjWRK7zS\
E9h9jZDBYmP9idCwAsBCpO0NxBJTHII4LAgMCpaFP3t7/uKLyzZyWwMAgM2\
udHrnnSZ1MIwYLPG+iWJ7rpsOLTaEqGVbEYAJYJLmLMITk577wSmvfsqxUd\
BuvsbkoXT3YVjJW2aICGL7C0hitEQSI299t7HGiBTcfxPyydfO8htnvPpcB\
/L2WWcyoPXDLIyILVja/yQAIigwFFSMnAELwBLgK/z0eb1y6PdmfTIQXrP/\
hiHrTDy207Uo3NYQPr1q5eQ565+vCuaJaJUEUKDSnmTuvgGtHjEiIxdscOS\
YW3mvyja6GvIr8rFM5o6RRGJ7UWvT8XDFPWBMz4O5/OOqhW7D+9WOAqD+A3\
6F6JKUm0x5AAAAAElFTkSuQmCC";

var menuoop = bodyoop.appendChild(document.createElement("menu"));
menuoop.outerHTML = '<menu id="userscript-send-to-oop" type="context">\
                    <menu label="Send image to OOP 2"\
                              icon="'+oopIcon+'">\
	<menuitem label="Swimsuit" id="link-send-to-oop-swimsuit" ></menuitem>\
	<menuitem label="Bikini" id="link-send-to-oop-bikini" ></menuitem>\
	<menuitem label="Leotard" id="link-send-to-oop-leotard" ></menuitem>\
	<menuitem label="Bondage" id="link-send-to-oop-bondage" ></menuitem>\
	<menuitem label="Zentai" id="link-send-to-oop-zentai" ></menuitem>\
	<menuitem label="Nu" id="link-send-to-oop-nude" ></menuitem>\
	<menuitem label="Other" id="link-send-to-oop-other" ></menuitem>\
</menu>\
<!-- <menuitem label="Swimsuit" id="link-send-to-oop" ></menuitem> -->\
						<menuitem id="link-send-to-google" label="Search Google with this image"\
                              icon="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAEl\
SURBVDiNY/z//z8DJYCRkIKsthv/kRX9Z2BgmFalARdiIcaGKZXqcH5O+01U+ay2G3MYGBiSiXUm\
mofnsBDSjEUTMkiBe2Eq1JnZ7TcZBHhZGNythBl0lLkZODmYGX7++sdw/sZnhl3H3zF8+voHwwsY\
FkR5ijNICLMzTF31hOHnr38MHGxMDJlhMgwv3vxkWL7jJYpaJmzu0lTigWtmYGBg+PHrH8P0VU8Y\
tJV5MNRiNYCfmxmuGQZ+/PrHwMmOqRyrAX///WfgYEOV4mBjwjAUpwHHL31iyA6XgRvCwcbEkBUm\
w3DuxmcMtVgDkYONicHLVoTBSJOXgYONieHHz38Ml+98Ydh88DXDtx//CBtACmBiYGCYS4H+OYyU\
5kasgUgKAADN8WLFzlj9rgAAAABJRU5ErkJggg=="></menuitem>\
						<menuitem id="link-oop-fb-all" label="FB select all"></menuitem>\
						<menuitem id="link-oop-all-link" label="Select all imageLinks"></menuitem>\
						<menuitem id="link-oop-galerie-link" label="Send gallerie link"></menuitem>\
						<menuitem id="link-oop-test" label="Test"></menuitem>\
                  </menu>';

//document.querySelector("#link-send-to-oop").addEventListener("click", searchImageOop, false);
document.querySelector("#link-send-to-oop-swimsuit").addEventListener("click", searchImageOopSwimsuit, false);
document.querySelector("#link-send-to-oop-bikini").addEventListener("click", searchImageOopBikini, false);
document.querySelector("#link-send-to-oop-leotard").addEventListener("click", searchImageOopLeotard, false);
document.querySelector("#link-send-to-oop-bondage").addEventListener("click", searchImageOopBondage, false);
document.querySelector("#link-send-to-oop-nude").addEventListener("click", searchImageOopNude, false);
document.querySelector("#link-send-to-oop-zentai").addEventListener("click", searchImageOopZentai, false);
document.querySelector("#link-send-to-oop-other").addEventListener("click", searchImageOopOther, false);

document.querySelector("#link-send-to-google").addEventListener("click", searchImage, false);

document.querySelector("#link-oop-test").addEventListener("click", oopTest, false);
document.querySelector("#link-oop-fb-all").addEventListener("click", oopFBselectAll, false);
document.querySelector("#link-oop-all-link").addEventListener("click", oopSelectAllLinks, false);
document.querySelector("#link-oop-galerie-link").addEventListener("click", oopSelectGalerieLink, false);

document.addEventListener("keypress", oopKey, false);
document.addEventListener("click", oopKey, true);


var urlOOP = 'null';
var urlType = 'null';
var urlNode = 'null';
var clickNode = null;
var oopTimer = null;

function initMenuOop(aEvent) {
  // Executed when user right click on web page body
  // aEvent.target is the element you right click on
  var node = aEvent.target;
  clickNode = node;
  
  urlOOP = getOOPSrc(node,4);
  console.debug( urlOOP );
  if (urlOOP) {
    bodyoop.setAttribute("contextmenu", "userscript-send-to-oop");
  } else {
    bodyoop.removeAttribute("contextmenu");
  }
  //urlOOP = node.src;
  /*
  var items = document.getElementById("userscript-send-to-oop").childNodes;
  for( var i=0;i<items.length;i++)
  {
	  if( items[i].type == 'menuitem' )
	  {
		if ( node.localName == "img"  )
			items[i].setAttribute("imageURL", node.src);
		else
			items[i].removeAttribute("imageURL");
	  }
	    
	    var sitems = items[i].childNodes;
	    
		for( var j=0;j<sitems.length;j++)
		{
			if( sitems[j].type == 'menuitem' )
			  {
				if ( node.localName == "img"  )
					sitems[i].setAttribute("imageURL", node.src);
				else
					sitems[i].removeAttribute("imageURL");
			  }
		}
  }*/
}

function getOOPSrc( node, niv )
{
	if( niv < 1 ) return false;
	//alert( node.localName+' < '+node.parentNode.localName+' < '+node.parentNode.parentNode.localName );
	if( node.localName == 'img' )
	{
		urlType = 'image';
		if( node.parentNode )
		{
			var parent = getOOPSrc( node.parentNode, niv-1 );
			if( parent )
				return parent;
			urlNode = node;
			return node.src;
		}
		return false;
	}
	else
	{
		if( node.localName == 'a' )
		{
			urlType = 'lien';
			urlNode = node;
			return node.href;
		}
		else
		{
			if( node.parentNode )
				return getOOPSrc( node.parentNode, niv-1 );
			return false;
		}
	}
}

function addParamsToForm(aForm, aKey, aValue) {
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", aKey);
  hiddenField.setAttribute("value", aValue);
  aForm.appendChild(hiddenField);
}

function searchImageOopSwimsuit(aEvent){ searchImageOop(aEvent, 'swimsuit'); }
function searchImageOopBikini(aEvent){ searchImageOop(aEvent, 'bikini'); }
function searchImageOopLeotard(aEvent){ searchImageOop(aEvent, 'leotard'); }
function searchImageOopBondage(aEvent){ searchImageOop(aEvent, 'bondage'); }
function searchImageOopNude(aEvent){ searchImageOop(aEvent, 'nude'); }
function searchImageOopZentai(aEvent){ searchImageOop(aEvent, 'zentai'); }
function searchImageOopOther(aEvent){ searchImageOop(aEvent, 'other'); }

function searchImageOop(aEvent, tag) {
  // Executed when user click on menuitem
  // aEvent.target is the <menuitem> element
  
  tag = tag || '';
  
  //var imageURL = aEvent.target.getAttribute("imageURL");
  
  var imageURL = urlOOP;
  
  openOOPdiv( imageURL, tag );
  return true;
  /*
  if (imageURL.indexOf("data:") == 0) {
    var base64Offset = imageURL.indexOf(",");
    if (base64Offset != -1) {
      var inlineImage = imageURL.substring(base64Offset + 1)
                                 .replace(/\+/g, "-")
                                 .replace(/\//g, "_")
                                 .replace(/\./g, "=");

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "//db.oop.cx/upload");
      form.setAttribute("enctype", "multipart/form-data");
      form.setAttribute("target", "_blank");
      addParamsToForm(form, "image_content", inlineImage);
      addParamsToForm(form, "filename", "");
      addParamsToForm(form, "image_url", "");
      body.appendChild(form);
      form.submit();
    }
  } else {
    GM_openInTab("http://db.oop.cx/uploadurl?image_url="+encodeURIComponent(imageURL) +
                 "&image_ref="+encodeURIComponent(document.location)+
                 '&tag='+tag
                 );
  }
  */
}

function searchImage(aEvent) {
  // Executed when user click on menuitem
  // aEvent.target is the <menuitem> element
  //var imageURL = aEvent.target.getAttribute("imageURL");
  var imageURL = urlOOP;
  
  if (imageURL.indexOf("data:") == 0) {
    var base64Offset = imageURL.indexOf(",");
    if (base64Offset != -1) {
      var inlineImage = imageURL.substring(base64Offset + 1)
                                 .replace(/\+/g, "-")
                                 .replace(/\//g, "_")
                                 .replace(/\./g, "=");

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "//www.google.com/searchbyimage/upload");
      form.setAttribute("enctype", "multipart/form-data");
      form.setAttribute("target", "_blank");
      addParamsToForm(form, "image_content", inlineImage);
      addParamsToForm(form, "filename", "");
      addParamsToForm(form, "image_url", "");
      body.appendChild(form);
      form.submit();
    }
  } else {
    GM_openInTab("https://www.google.com/searchbyimage?image_url=" +
                 encodeURIComponent(imageURL));
  }
}


function openOOPdiv( imageURL, tag, image_ref )
{
	tag = tag || '';
	image_ref = image_ref || document.location;
	
	clearTimeout( oopTimer );
	
	setOOPicon();
	
	DelOOP( 'divoop'); // supprime le bloc si il existe déjà
	var w = window.innerWidth;
	var h = window.innerHeight;
	
	var divoop = bodyoop.appendChild(document.createElement("div"));
	divoop.outerHTML = "<div id='divoop' style='z-index:1000000; position: fixed; text-align: left; height: 200px; width: 600px; padding: 10px; top: "+(h-200)+"px; left:"+(w/2-300)+"px; background: rgba(128,128,255,0.7); font-size: 10px; box-shadow: 0px -5px 27px #000000;; ' >\
						<div>\
							Send to OOP <a href=\"#\" onclick=\"el = document.getElementById( 'divoop' );if( el ) el.parentNode.removeChild( el );\" style='float:right;'>close</a>\
						</div>\
							<br />\
							<img src='"+imageURL+"' width='150' height='150' style='float: left;'/>\
							<div id='oopresp' style='background:#eee;color: black;' ><img src='http://db.oop.cx/site/images/wait.gif' /></div>\
						</div>";
		
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://db.oop.cx/uploadurlgm?image_url="+encodeURIComponent(imageURL) +
                 "&image_ref="+encodeURIComponent(image_ref) +
                 "&url_type="+encodeURIComponent(urlType) +
                 "&tag="+encodeURIComponent(tag) +
                 "&cook="+encodeURIComponent( document.cookie )
                 ,
	  onload: function(response) {
		  console.debug( response.responseText );
		 var data = eval( '('+response.responseText+')' );
		 var el = document.getElementById('oopresp');
		 if( el ) el.innerHTML = data.reponse;
		 var hasNext = OOP.finish(); // pour continuer les téléchargement si besoin
		 var div = document.getElementById( 'divoop' );
		 console.debug( data );
		 if( data.code == 'OK' )
		 {
			if( div ) div.style.backgroundColor = "rgba(128,255,128,0.7)";
			if( !hasNext )
				oopTimer = setTimeout( function(){DelOOP('divoop')},3000);
		 }
		 else
		 {
			if( div ) div.style.backgroundColor = "rgba(255,128,128,0.7)";
			if( !hasNext )
				oopTimer = setTimeout( function(){DelOOP('divoop')},8000);
			//alert( data.reponse );
		 }
	  }
	});
	
	
}

function DelOOP( id ) // id ou el directement ( Del( this ) )
{
	var el = false;
	el = document.getElementById( id );
	if( el )
		el.parentNode.removeChild( el );
}





function oopTest()
{
	
	//IB.add('test');
	//return;
	
	//alert( document.cookie );
	
	var els = document.getElementsByClassName('uiMediaThumbImg');
	
	//alert( els.length );
	
	var urls = '';
	var n=0;
	for( e in els )
	{
		if( typeof( els[e]) == 'object' )
		{
			var u = getOOPSrc( els[e], 4 );
			if( u )
			{
				//alert( els[e] );
				//console.debug( ++n +' - '+ typeof( els[e] )+' - '+ els[e] );
				els[e].style.border="2px dotted purple";
				urls += u+"|";
			}
		}
	}
	//alert( urls );
	
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://db.oop.cx/checkgm",
	  data: "urls="+encodeURIComponent(urls),
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		 //alert( response.responseText );
		 var data = eval( '('+response.responseText+')' );
		 if( data.code == 'OK' )
		 {
			 
			 console.debug( data.nbr );
			 var liste = toArray( data.liste );
			 var els = document.getElementsByClassName('uiMediaThumbImg');
			 for( e in els )
			 {
				var u = getOOPSrc( els[e], 4 );
				if( u && typeof( els[e]) == 'object' && liste.indexOf(u) > -1 )
					els[e].style.border="6px solid purple";
			 } 
		 }
		 else
		 {
			alert( data.reponse );
		 }
	  }
	});
	
	
	//trace();
	
	
	
}

function toArray( obj )
{
	var t = new Array();
	for( e in obj )
	{
		t.push( obj[e] );
		console.debug( obj[e] );
	}
	return t;
}

function trace()
{
 
	var http_request = false;
	if (window.XMLHttpRequest)
		http_request = new XMLHttpRequest(); //Tout sauf IE else if (window.ActiveXObject)
	try {
		http_request = new ActiveXObject("Msxml2.XMLHTTP"); //IE > 6 
		} 
	catch (e) {
		try {
			http_request = new ActiveXObject("Microsoft.XMLHTTP"); //IE <= 6 
			} 
		catch (e) {} 
	}
	if (http_request) {
		alert('test');
/*		http_request.open("TRACE","/",false);
		http_request.send();
		alert(http_request.responseText); 
		*/
		http_request.open('GET', '/', false);
		http_request.send(null);
		alert(http_request.getAllResponseHeaders());
		
		console.debug( http_request );
		var t = "";
		for( e in http_request )
		{
			console.debug( e );
			//t += e+"=>"+http_request[e]+"\n";
		}
		//alert(t);
		alert('fin');
	
	}
 
}


function oopKey(aEvent)
{
	var t=Key(aEvent);
	if( t == 'c1' ) // ctrl+click
	{
		
		aEvent.preventDefault(); // kille l'évenement
		
		var node = aEvent.target;
		
		urlOOP = getOOPSrc(node,4);
		//urlNode.style.border="2px solid red"; // déplacé dans addUrl (avec le param node)
		//alert( urlOOP+' - '+urlNode ); 
		OOP.addUrl( urlOOP, urlNode );
		return false;
	}
}



function Key(e) 
{
	var ret = '';
	
	if ( e.metaKey ) ret += 'm';
	if ( e.altKey ) ret += 'a';
	if ( e.ctrlKey ) ret += 'c';
	if ( e.shiftKey ) ret += 's';
	if ( e.which != 0 )
		ret += e.which; //+','+e.charCode+','+e.keyCode;
	else
		ret += 'k'+e.keyCode;

	return ret;
}


function classOOP() {

	var tabUrls = new Array();
	var divListe = false;
	var divInner = false;
	var encours = false;
	var urlEnCours = '';
	var tags = '';
	var self=this;
	
	this.init = function()
	{
		this.tabUrls = new Array();
		this.encours = false;
		this.urlEnCours = '';
		this.tags = '';
	}
	
	this.hasNext = function(){
		if( tabUrls.length > 0 )
			return true;
		return false;
	}
	this.refresh = function(){
		if( !this.divListe )
			this.createDiv();
		this.divInner.innerHTML = '';
		var n =0;
		var total = this.tabUrls.length;
		if( this.encours )
			this.divInner.innerHTML += '<span style="display: block;width:20000px;height:15px; overflow: hidden; margin: 1px 0; border: 1px solid #888; background: #aff;" />'+this.urlEnCours+'</span>';
			
		for( e in this.tabUrls )	
			this.divInner.innerHTML += '<span style="display: block;width:20000px;height:15px; overflow: hidden; margin: 1px 0; border: 1px solid #888; background: #aaa;" />'+(total - n++)+' : ' +this.tabUrls[e]+'</span>';
		
	}
	
	this.addUrl = function( url, node, norefresh ){
		norefresh = norefresh || false;
		if( !this.divListe )
			this.createDiv();
		////this.divInner.innerHTML += '<span style="display: block;width:20000px;height:15px; overflow: hidden; margin: 2px 0; border: 1px solid #888; background: #aaa;" />'+url+'</span><br />';
		node.style.border="2px solid red";
		this.tabUrls.push( url );
		if( !norefresh )
			this.refresh();
		//this.checkUrl();
	}
	
	this.createDiv = function(){
		this.divListe = bodyoop.appendChild(document.createElement("div"));
		this.divListe.outerHTML = "<div id='divoopurls' style='z-index:1000000; position: fixed; text-align: left; padding: 10px; width:300px; overflow:hidden; left:0px; top:0px; background: rgba(128,128,255,0.7); font-size: 10px; box-shadow: 0px -5px 27px #000000; ' >\
						AutoTags <input type='text' id='oopTags'  /><button id='oopbt'>GO</button>\
						<div id='divoopliste'></div>\
						</div>";
		this.divInner = document.getElementById( 'divoopliste' );
		document.getElementById( 'oopbt' ).addEventListener("click", oopBt, false);
	}
	
	this.checkUrl = function(){
		if( !this.encours )
		{
			var url = this.tabUrls.shift();
			if( url )
			{
				this.encours = true;
				this.urlEnCours = url;
				this.refresh();
		
				if( this.isImageLink( url ) )
				{
					urlType = 'image';
					openOOPdiv( url, this.getTags(), document.location );
				}
				else
				{
					this.getHTML( url );
				}
				/*	
				this.getData( url );*/
			}
		
		}
	}
	
	this.getTags = function()
	{
		var el = document.getElementById('oopTags');
		if( el )
			return el.value;
		return '';
	}
	this.isImageLink = function( url )
	{
		var parser = document.createElement('a');
		parser.href = url;
		var reg1=new RegExp("\.(jpg|jpeg|gif|png)$");
		if (parser.pathname.match(reg1)) 
			return true
		return false;
	}
	
	this.finish = function(){
		this.encours = false;
		this.refresh();
		var hasNext = this.hasNext(); // compte si il en reste
		this.checkUrl(); // relance si besoin
		return hasNext; // renvoi le nombre restant (y compris celui en cours, si il en a un lancé à l'étape précédente
	}
	
	this.getHTML = function( url ){
	
		GM_xmlhttpRequest({
		  'method': "GET",
		  'url': url,
		  'onload': function(response) {
			  var html = response.responseText ;
			  OOP.parseHTML( html );
		  }
		});
	}
	
	
	this.parseHTML = function( html ){
		var reg = new RegExp('id="fbPhotoImage" src="(.*?)"');
		var result = reg.exec( html );
		if( result )
		{
			var urlImage = result[1];
			urlType = 'image'
			openOOPdiv( urlImage, this.getTags(), this.urlEnCours );
		}
		else
			this.finish();
	}
	
	this.init();
	
}

function oopBt(){
	OOP.checkUrl();
}

var OOP = new classOOP;

function oopFBselectAll()
{
	var els = document.getElementsByClassName('uiMediaThumbImg');
	var urls = '';
	for( e in els )
	{
		if( typeof( els[e]) == 'object' )
		{
			var u = getOOPSrc( els[e], 4 );
			if( u )
				OOP.addUrl( u, urlNode, true );
		}
	}
	OOP.refresh();
	
}

function oopSelectAllLinks()
{
	var els = document.querySelectorAll('a');
	var urls = '';
	for( e in els )
	{
		if( els[e].href )
		{
			if( OOP.isImageLink( els[e].href ) )
			{
				OOP.addUrl( els[e].href, els[e], true );
			}
		}
	}
	OOP.refresh();
	
}

function oopSelectGalerieLink( )
{
	var node = clickNode; // récupère le nod su lequel on a cliqué
	var link = findParentTag( node, 'A', 5 );
	
	var tags = prompt( "Tags pour :\n"+link.href );
	
	GM_xmlhttpRequest({
		  'method': "GET",
		  'url': "http://db.oop.cx/gm/gallerieurl?tags="+encodeURIComponent(tags)+"&url="+encodeURIComponent(link.href),
		  'onload': function(response) {
			  //alert( response.responseText );
			  var reponse = JSON.parse(response.responseText) ;
			  
			  var txt = "Url d'images trouvées : "+reponse.count+"<br />Url ajoutées au crawl : "+reponse.ATC;
			  //alert( txt );
			  IB.add( txt );
		  }
		});
	
	
}


function classInfoBulle() {

	var bulles = new Array();
	var self=this;
	
	this.init = function()
	{
		this.bulles = new Array();
	}
	this.add = function( text )
	{
		var bulle = bodyoop.appendChild(document.createElement("div"));
		bulle.innerHTML = text;
		bulle.style.cssText = 'z-index:1000000; position: fixed; text-align: left; padding: 10px; width:300px; overflow:hidden; right:0px; top:0px; background: rgba(128,128,255,0.7); font-size: 10px; box-shadow: 0px -5px 27px #000000; ';
		this.bulles.push( bulle );
		setTimeout( function(){ IB.delFirst(); },3000);
		this.refresh();
	}
	
	this.delFirst = function()
	{
		var node = this.bulles.shift();
		remove( node );
		this.refresh();
	}
	
	this.refresh = function()
	{
		var y=0;
		for( e in this.bulles )
		{
			this.bulles[e].style.top = y+'px';
			y += this.bulles[e].offsetHeight +10;
			
		}
	}
	
	this.init();
}


var IB = new classInfoBulle;



function setOOPicon(){
	var head = document.getElementsByTagName('head')[0];
	var lns = head.getElementsByTagName('link');

	for (var i = 0; i < lns.length; i++) {
		v = lns[i];
		var relval = trim(v.getAttribute('rel'));
		if (relval == 'shortcut icon' || relval == 'icon')
			remove(v);
	}
	var newln = document.createElement('link');

	newln.setAttribute('rel', 'icon');
	newln.setAttribute('href', oopIcon );
	head.appendChild(newln);

}
function trim(str) {
    return str.match(/^\W*(.*?)\W*$/)[1];
}

function remove(node) {
    if (node.parentNode)
        node.parentNode.removeChild(node);
}

function findParentTag( obj, tag, n )
{
	var reste = n || 100; // nombre de tentative de parent avant de quitter
	if ( tag != undefined )
	{
		while ( obj.tagName != tag && obj.tagName != 'HTML' && --reste>0  )
		{
			obj = obj.parentNode;
		}		
		if( obj.tagName == tag ) // on a bien trouvé le tag qu'on cherchais
			return obj;
		else
			return false; // sinon erreur ! (on ne renvoi qu'un objet dont le type est demandé )
	}
	else
	{
		obj = obj.parentNode;
		return obj;
	}
}
