// MITBBS user script
// Copyright (c) 2010, Julien Eyries
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MITBBS new version
// @author        Julien Eyries
// @namespace     http://www.mitbbs.com/bbsdoc/Game.html
// @description   Modified version for La Vagie by Leon by stalin@mitbbs by nickmit
// @include       http://mightandmagicheroeskingdoms.ubi.com/play
// @version       1.0.5
// @date          2011-3-19
// ==/UserScript==

// protect from other scripts
(function() {

 if ( typeof console == 'undefined'){
 console = {};
 console.log = function(txt){};
 }

 // bookmarklet protection
 if (location.href != 'http://mightandmagicheroeskingdoms.ubi.com/play'){
 console.log("wrong location : " + location.href);
 return;
 }
 if (window.HOMMK_loaded){
 return;
 }
 window.HOMMK_loaded = true;

 if (typeof unsafeWindow == 'undefined')
 unsafeWindow = window;

 // GLOBALS

 var DEBUG = 0;

 var version = '1.0.5'; // also, check meta-data field @version

 var HOMMK = window.HOMMK || unsafeWindow.HOMMK;

 var HOMMK_user = {};
 // debug
 if (DEBUG) unsafeWindow.HOMMK_user = HOMMK_user;

 //var SERVER_URL = "http://localhost/public/HOMMK/www/";
 var SERVER_URL = "http://www.jeyries.fr/hommk/";

 // Chrome

 if (HOMMK)
	 console.log("HOMMK detected");
 else
	 console.log("HOMMK not detected");

 if (window.chrome){

	 console.log("Chrome detected");

 }

 if (window.chrome && chrome.extension && !HOMMK ){

	 console.log("running as chrome extension");
	 //var url = chrome.extension.getURL("hommk.user.js") + '?time=' + (new Date()).getTime();
	 var url = chrome.extension.getURL("script.js") + '?time=' + (new Date()).getTime();
	 if (DEBUG) console.log( "injecting " + url );

	 // inject script
	 var script = document.createElement('script');
	 script.src = url;
	 document.getElementsByTagName('head')[0].appendChild(script);

	 return;
 } 

 //

 var $, jQuery;

 var $themeswitcher;

 setTimeout(function() {

		 // Add jQuery UI Theme
		 var url = ThemeSwitcher.getThemeUrl({loadTheme:"HOMMK minimal"})
		 || 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/base/jquery-ui.css' ;

		 if (DEBUG) console.log( "injection CSS : " + url);
		 var link = document.createElement("link");
		 link.type = 'text/css';
		 link.href = url ;
		 link.rel = "stylesheet" ;
		 link.className = "ui-theme" ;
		 document.getElementsByTagName('head')[0].appendChild(link);

		 // Add jQuery
		 var script = document.createElement('script');
		 script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
		 document.getElementsByTagName('head')[0].appendChild(script);

		 script.addEventListener('load', function(){ 

			 jQuery = window.jQuery || unsafeWindow['jQuery'];
			 $ = jQuery.noConflict();

			 //$ = unsafeWindow.$;

			 // You put your jQuery code here, which must use the jQuery namespace. See Note.

			 console.log("jQuery loaded");

			 // Add jQuery UI
			 var script = document.createElement('script');
			 script.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js';
			 document.getElementsByTagName('head')[0].appendChild(script);

			 script.addEventListener('load', function(){ 

				 console.log("jQuery UI loaded");

				 // Add jQuery plugin themeswitcher

				 ThemeSwitcher.installPlugin( jQuery );

				 /*
				    var script = document.createElement('script');
				    script.src = 'http://jquery-simpletip.googlecode.com/files/jquery.simpletip-1.3.1.pack.js';
				 //script.src = SERVER_URL + 'js/themeswitchertool.js';
				 document.getElementsByTagName('head')[0].appendChild(script);

				 script.addEventListener('load', function(){ */

				 console.log("themeswitcher loaded");

				 $themeswitcher =  $('<div></div>').themeswitcher();

				 // force same text style as HOMMK
				 GM_addStyle( ".ui-widget, .ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button { font-family: arial,verdana,sans-serif !important; font-size: 12px !important; }" );

				 locale_init();

				 init();

				 //}, false);

			 }, false);

		 }, false);

 }, 0);

 // common functions
 function jumpto() {
	 var s = document.getElementById("coordinates").value;
	 var x = s.split(',');
	 HOMMK_worldMap_center(x[0], x[1]);
 }

 function extend( objA, objB ){
	 for (var i in objB){
		 objA[i] = objB[i];
	 }
	 return objA;
 }

 function E(obj) {

	 var e = document.createElement(obj.tagName);

	 if (obj.id){  
		 e.id = obj.id;
	 }

	 if (obj.style){     
		 for (var i in obj.style){
			 e.style[i] = obj.style[i];
		 }
	 }    

	 if (obj.childNodes){    
		 for (var k=0;k<obj.childNodes.length;k++){       
			 e.appendChild( E(obj.childNodes[k]) );
		 }
	 }

	 if (obj.innerHTML){
		 e.innerHTML =  obj.innerHTML;
	 }

	 return e;
 }

 function foreach( array, callback ){

	 // firefox and webkit
	 if (array)
		 array.forEach(callback);
 }

 function unique(array) {
	 var o = {}, i, l = array.length, r = [];
	 for(i=0; i<l;i++) o[array[i]] = array[i];
	 for(i in o) r.push(o[i]);
	 return r;
 };

 function ctime(t){
	 var weekday=new Array(7);
	 weekday[0]="Sun";
	 weekday[1]="Mon";
	 weekday[2]="Tue";
	 weekday[3]="Wed";
	 weekday[4]="Thu";
	 weekday[5]="Fri";
	 weekday[6]="Sat";
	 var d = new Date();
	 if (t) d.setTime(t*1000);
	 //return d.toLocaleString();
	 return pad(d.getMonth()+1,2)+'/'+pad(d.getDate(),2)+'/'+d.getFullYear()+' '+pad(d.getHours(),2)+':'+pad(d.getMinutes(),2)+':'+pad(d.getSeconds(),2) + '  GMT ' + -d.getTimezoneOffset()/60;

 }

 function pad(number, length) {

	 var str = '' + number;
	 while (str.length < length) {
		 str = '0' + str;
	 }

	 return str;

 }

 function coord( x,y ){
	 return ('('+Math.floor(x)+','+Math.ceil(y)+')');
 }

 // HOMMK fix

 function HOMMK_worldMap_center(x, y){

	 if ( typeof window.HOMMK == 'undefined'){

		 // use location hack
		 location.assign( "javascript:HOMMK.worldMap.center"+coord(x, y)+";void(0)" );

	 } else {

		 // direct call
		 HOMMK.worldMap.center(x, y);
	 }

 }

 // Greasemonkey API emulation for Chrome 

 // @copyright      2009, 2010 James Campos
 // @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 /*if (typeof GM_deleteValue == 'undefined')*/ {
	 GM_addStyle = function(css) {
		 var style = document.createElement('style');
		 style.textContent = css;
		 document.getElementsByTagName('head')[0].appendChild(style);
	 }

	 GM_deleteValue = function(name) {
		 localStorage.removeItem(name);
	 }

	 GM_getValue = function(name, defaultValue) {
		 var value = localStorage.getItem(name);
		 if (!value)
			 return defaultValue;
		 var type = value[0];
		 value = value.substring(1);
		 switch (type) {
			 case 'b':
				 return value == 'true';
			 case 'n':
				 return Number(value);
			 default:
				 return value;
		 }
	 }

	 GM_log = function(message) {
		 console.log(message);
	 }

	 GM_registerMenuCommand = function(name, funk) {
		 //todo
	 }

	 GM_setValue = function(name, value) {
		 value = (typeof value)[0] + value;
		 localStorage.setItem(name, value);
	 }

	 // added by jeyries

	 GM_xmlhttpRequest = function( details ){

		 if (DEBUG) console.log('emulation GM_xmlhttpRequest for url : ', details.url );

		 var xmlhttp= new XMLHttpRequest();

		 xmlhttp.open(details.method, details.url ,true);

		 xmlhttp.onreadystatechange=function() {
			 if (xmlhttp.readyState==4) {
				 if(xmlhttp.status == 200){
					 if (details.onload) details.onload( xmlhttp );
				 } else {
					 if (details.onerror) details.onerror( xmlhttp );
				 }
			 }
		 };

		 if (details.headers){
			 for (var header in details.headers )
				 xmlhttp.setRequestHeader(header, details.headers[header]);
		 }

		 xmlhttp.send(details.data);

	 }

	 GM_openInTab = function( url ){
		 //console.log( "want to open this url : " + url );
		 console.log( "please allow pop-up for this site");
		 window.open(url, '_blank');
	 }

 }

 // GM fix

 var _GM_xmlhttpRequest_ = GM_xmlhttpRequest;

 GM_xmlhttpRequest = function( details ){
	 if (!_GM_xmlhttpRequest_){
		 console.log('error: GM_xmlhttpRequest is not available' );
		 return;
	 }
	 setTimeout(function(){ _GM_xmlhttpRequest_( details ); }, 0); // avoid Greasemonkey access violation
 }

 var _GM_openInTab_ = GM_openInTab;

 GM_openInTab = function( url ){
	 if (!_GM_openInTab_){
		 console.log('warning: GM_openInTab is not available' );
		 window.open(url, '_blank');
		 return;
	 }
	 setTimeout(function(){ _GM_openInTab_( url ); }, 0); // avoid Greasemonkey access violation
 }

 // XHR functions

 function do_request( json, callback ){

	 var xmlhttp= new XMLHttpRequest();

	 xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent',true);

	 xmlhttp.onreadystatechange=function() {
		 if (xmlhttp.readyState==4) {
			 callback( JSON.parse(xmlhttp.responseText) );
		 }
	 };

	 xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");

	 xmlhttp.setRequestHeader("X-Request", "JSON");

	 xmlhttp.send('json='+JSON.stringify(json));

 }

 //No Ajax post
 function do_request_no_Ajax( json ){

	 var xmlhttp= new XMLHttpRequest();

	 xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent',false);

	 xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");

	 xmlhttp.setRequestHeader("X-Request", "JSON");

	 xmlhttp.send('json='+JSON.stringify(json));
	 //alert(xmlhttp.responseXML);
	 return JSON.parse(xmlhttp.responseText);
 }

 function do_request_gm( json, callback ) {

	 if (DEBUG) console.log('GM_xmlhttpRequest :', json );

	 if (!GM_xmlhttpRequest){
		 console.log('error: GM_xmlhttpRequest is not available' );
		 return;
	 }

	 GM_xmlhttpRequest({

method: "POST",
url: SERVER_URL + "ajaxRequest.php",
//data: ('json='+encodeURIComponent(JSON.stringify(json))),
data: ('json='+JSON.stringify(json)),

headers: {

"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
//"X-Request": "JSON",

},

onerror: function(response) {

console.log("error:",response);

if (callback){
callback({});
}

},

onload: function(response) {

		if (response.status != 200){
			console.log(response.statusText);
			return;
		}

		var json = JSON.parse(response.responseText);

		if (DEBUG) console.log(json);

		if (DEBUG && json.script_debug) {
			json.script_debug.forEach(function(item){
					console.log(item);
					});
		}

		if (callback){
			callback(json);
		}

	}
});

} 

// localStorage

function localStorage_setObject (key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function localStorage_getObject (key, default_value) {
	var value = localStorage.getItem(key);
	if (value){
		try { 
			return JSON.parse(value); 
		} catch(err) {}
	}
	return default_value;
}

// localization

var locale = 'en';

var locale_strings = {};

function localize( txt ){

	var temp = locale_strings[txt];

	switch (typeof temp) {

		case 'string':
			return temp;

		case 'undefined':
			return txt;

		case 'function':
			return temp(arguments);
	} 

	return null;
}

// locale primaire : anglais

var locale_strings_default = {

};

// locale secondaire : fran?ais ou allemand

var locale_strings_fr = {

};

var locale_strings_de = {

};

function locale_init() {

	// initialisation locale

	var matches =  ( new RegExp('\\w\\w') ).exec( HOMMK.locale );
	if (matches && matches.length){
		locale = matches[0];
	}

	if (DEBUG) console.log("detect locale", locale);

	// locale primaire : anglais

	extend( locale_strings, locale_strings_default );

	// locale secondaire : fran?ais ou allemand

	switch(locale){
		case "fr": 
			extend( locale_strings, locale_strings_fr ); 
		break;

		case "de": 
			extend( locale_strings, locale_strings_de ); 
		break;
	}

	// debug

	if (DEBUG) console.log( locale, locale_strings );

};

// UI stuff

function toggle_dialog( $dialog ){

	$dialog.dialog( $dialog.dialog('isOpen') ? 'close' : 'open' );
}

/* jQuery plugin themeswitcher (modified by jeyries)
   ---------------------------------------------------------------------*/

// export
var ThemeSwitcher  = {};
//HOMMK_user.ThemeSwitcher = ThemeSwitcher; // debug

// no conflict patch
ThemeSwitcher.data = [

{ name:"HOMMK minimal",  
img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_ui_dark.png", 
    // url:"http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/ui-darkness/jquery-ui.css"
    url:SERVER_URL+"css/hommk-minimal/jquery-ui.css"
},  
{ name:"UI Lightness",  img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_ui_light.png"},  
{ name:"UI Darkness",  img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_ui_dark.png"},    
{ name:"Smoothness"},   
{ name:"Start",  img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_start_menu.png"},  
{ name:"Redmond",  img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_windoze.png"},  
{ name:"Sunny"},  
{ name:"Overcast"},  
{ name:"Le Frog"},  
{ name:"Flick"},  
{ name:"Pepper Grinder"},  
{ name:"Eggplant"},  
{ name:"Dark Hive"},  
{ name:"Cupertino"},  
{ name:"South Street"},  
{ name:"Blitzer"},  
{ name:"Humanity"},  
{ name:"Hot Sneaks"},  
{ name:"Excite Bike"},  
{ name:"Vader",  img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_black_matte.png"},  
{ name:"Dot Luv"},  
{ name:"Mint Choc",  img:"http://jqueryui.com/themeroller/images/themeGallery/theme_90_mint_choco.png"},  
{ name:"Black Tie"},  
{ name:"Trontastic"},  
{ name:"Swanky Purse"},  

	];

	// data setup
	(function() {
	 ThemeSwitcher.dataByName = {};
	 for (var k= 0;k<ThemeSwitcher.data.length;k ++){
	 var theme = ThemeSwitcher.data[k];

	 if (!theme.img)
	 theme.img = 'http://jqueryui.com/themeroller/images/themeGallery/theme_90_' + theme.name.toLowerCase().replace( / / , '_' ) + '.png';

	 if (!theme.url)
	 theme.url = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/'+ theme.name.toLowerCase().replace( / / , '-' ) +'/jquery-ui.css';

	 ThemeSwitcher.dataByName[theme.name] = theme; 
	 }
	 })(); 

ThemeSwitcher.getThemeUrl = function(settings) {

	try {

		// no jQuery available here
		var options = {
loadTheme: null,
	   cookieName: 'jquery-ui-theme',
		};
		for (var i in settings){
			options[i] = settings[i];
		}

		if( localStorage.getItem(options.cookieName) || options.loadTheme ){
			var themeName = localStorage.getItem(options.cookieName) || options.loadTheme;
			var theme = this.dataByName[themeName];
			if (theme) return theme.url;
		}

	} catch(err) { }

	return null;
};

ThemeSwitcher.installPlugin = function( $ ) {

	$.fn.themeswitcher = function(settings){
		var options = jQuery.extend({
loadTheme: null,
initialText: 'Switch Theme',
width: 150,
height: 200,
buttonPreText: 'Theme: ',
closeOnSelect: true,
buttonHeight: 14,
cookieName: 'jquery-ui-theme',
onOpen: function(){},
onClose: function(){},
onSelect: function(){}
}, settings);

//markup 
var button = $('<a href="#" class="jquery-ui-themeswitcher-trigger"><span class="jquery-ui-themeswitcher-icon"></span><span class="jquery-ui-themeswitcher-title">'+ options.initialText +'</span></a>');

var switcherpane = $('<div class="jquery-ui-themeswitcher"><div><ul></ul></div></div>');

$.each( ThemeSwitcher.data, function(index, theme){

		switcherpane.find('ul').append( $('<li><a href="'+theme.url+'"><img src="'+theme.img+'" alt="'+theme.name+'" title="'+theme.name+'" /><span class="themeName">'+theme.name+'</span></a></li>') );

		}) ;

//button events
button.click(
		function(){
		if(switcherpane.is(':visible')){ spHide(); }
		else{ spShow(); }
		return false;
		}
	    );

//menu events (mouseout didn't work...)
switcherpane.hover(
		function(){},
		function(){if(switcherpane.is(':visible')){spHide();}}
		);

//show/hide panel functions

/*
   $.fn.spShow = function(){ $(this).css({top: button.offset().top + options.buttonHeight + 6, left:  button.offset().left}).slideDown(50); button.css(button_active); options.onOpen(); }
   $.fn.spHide = function(){ $(this).slideUp(50, function(){options.onClose();}); button.css(button_default); }
 */
var spShow = function(){ 
	switcherpane.css({
top: button.offset().top + options.buttonHeight + 6, 
left:  button.offset().left 
})
.slideDown(50); 
button.css(button_active); 
options.onOpen(); 
}
var spHide = function(){ 
	switcherpane.slideUp(50, function(){options.onClose();});
	button.css(button_default); 
}

/* Theme Loading
   ---------------------------------------------------------------------*/
switcherpane.find('a').click(function(){
		updateCSS( $(this).attr('href') );
		var themeName = $(this).find('span').text();
		button.find('.jquery-ui-themeswitcher-title').text( options.buttonPreText + themeName );
		localStorage.setItem(options.cookieName, themeName);
		options.onSelect();
		if(options.closeOnSelect && switcherpane.is(':visible')){ spHide(); }
		return false;
		});

//function to append a new theme stylesheet with the new style changes
function updateCSS(locStr){

	$("link.ui-theme:first").remove();

	var cssLink = $('<link href="'+locStr+'" type="text/css" rel="Stylesheet" class="ui-theme" />');
	$("head").append(cssLink);

	/*
	   if( $("link.ui-theme").size() > 3){
	   $("link.ui-theme:first").remove();
	   }
	 */	
}	

/* Inline CSS 
   ---------------------------------------------------------------------*/
var button_default = {
	//fontFamily: 'Trebuchet MS, Verdana, sans-serif',
	//fontSize: '11px',
fontFamily: 'arial,verdana,sans-serif',
	    fontSize: '12px', 
	    //overflow: 'hidden',
	    whiteSpace: 'nowrap',
	    textOverflow:'ellipsis',
	    color: '#666',
	    background: '#eee url(http://jqueryui.com/themeroller/themeswitchertool/images/buttonbg.png) 50% 50% repeat-x',
	    border: '1px solid #ccc',
	    '-moz-border-radius': '6px',
	    '-webkit-border-radius': '6px',
	    textDecoration: 'none',
	    padding: '3px 3px 3px 8px',
	    width: options.width - 11,//minus must match left and right padding 
	    display: 'block',
	    height: options.buttonHeight,
	    outline: '0'
};
var button_hover = {
	'borderColor':'#bbb',
	'background': '#f0f0f0',
	cursor: 'pointer',
	color: '#444'
};
var button_active = {
color: '#aaa',
       background: '#000',
       border: '1px solid #ccc',
       borderBottom: 0,
       '-moz-border-radius-bottomleft': 0,
       '-webkit-border-bottom-left-radius': 0,
       '-moz-border-radius-bottomright': 0,
       '-webkit-border-bottom-right-radius': 0,
       outline: '0'
};

//button css
button.css(button_default)
	.hover(
			function(){ 
			$(this).css(button_hover); 
			},
			function(){ 
			if( !switcherpane.is(':animated') && switcherpane.is(':hidden') ){	$(this).css(button_default);  }
			}	
	      )
	.find('.jquery-ui-themeswitcher-icon').css({
float: 'right',
width: '16px',
height: '16px',
background: 'url(http://jqueryui.com/themeroller/themeswitchertool/images/icon_color_arrow.gif) 50% 50% no-repeat'
});	
//pane css
switcherpane.css({
position: 'absolute',
float: 'left',
//fontFamily: 'Trebuchet MS, Verdana, sans-serif',
//fontSize: '12px',
fontFamily: 'arial,verdana,sans-serif',
fontSize: '12px', 
background: '#000',
color: '#fff',
padding: '8px 3px 3px',
border: '1px solid #ccc',
'-moz-border-radius-bottomleft': '6px',
'-webkit-border-bottom-left-radius': '6px',
'-moz-border-radius-bottomright': '6px',
'-webkit-border-bottom-right-radius': '6px',
borderTop: 0,
zIndex: 999999,
width: options.width-6//minus must match left and right padding
})
.find('ul').css({
listStyle: 'none',
margin: '0',
padding: '0',
overflow: 'auto',
height: options.height
}).end()
.find('li').hover(
		function(){ 
		$(this).css({
			'borderColor':'#555',
			'background': 'url(http://jqueryui.com/themeroller/themeswitchertool/images/menuhoverbg.png) 50% 50% repeat-x',
			cursor: 'pointer'
			}); 
		},
		function(){ 
		$(this).css({
			'borderColor':'#111',
			'background': '#000',
			cursor: 'auto'
			}); 
		 {
			 var tmp = donnees.a;
			 donnees.a = donnees.d;
			 donnees.d = tmp;
		 }}
		).css({
width: options.width-30,
height: '',
padding: '2px',
margin: '1px',
border: '1px solid #111',
'-moz-border-radius': '4px',
clear: 'left',
float: 'left'
}).end()
.find('a').css({
color: '#aaa',
textDecoration: 'none',
float: 'left',
width: '100%',
outline: '0'
}).end()
.find('img').css({
float: 'left',
border: '1px solid #333',
margin: '0 2px'
}).end()
.find('.themeName').css({
float: 'left',
margin: '3px 0'
}).end();

$(this).append(button);
$('body').append(switcherpane);
switcherpane.hide();

/*
   if( localStorage.getItem(options.cookieName) || options.loadTheme ){
   var themeName = localStorage.getItem(options.cookieName) || options.loadTheme;
   switcherpane.find('a:contains('+ themeName +')').trigger('click');
   }
 */

return this;
};

};

/*

   contraintes pour un module:

   1- ne rien mettre dans le global, utiliser HOMMK_user

   2- ne rien mettre dans le DOM, tant que le module n'est pas activé

 */ 

// protect from other modules
(function() {

 // messages à traduire

 extend( locale_strings_default, {
	 'JACTARI_FIGHT':    'fight',
	 });

 extend( locale_strings_fr , {
	 'JACTARI_FIGHT':    'combat',

	 });

 extend( locale_strings_de , {
	 'JACTARI_FIGHT':    'Kampf',
	 });

 // MODEL

 // conversion HOMMK -> Jactari

 var convert_faction= {"ACADEMY":0,"HAVEN":1,"INFERNO":2,"NECROPOLIS":3,"SYLVAN":4,"NEUTRAL":5 };

 var convert_tier = { 
	 "T1":0, "T1P":1,
	 "T2":2, "T2P":3,
	 "T3":4, "T3P":5,
	 "T4":6, "T4P":7,
	 "T5":8, "T5P":9,
	 "T6":10, "T6P":11,          
	 "T7":12, "T7P":13,
	 "T8":14, "T8P":15,
 } ;

 var convert_neutral = { 
	 "WIND":64, "WATER":65, "EARTH":66, "FIRE":67, "DEATHKNIGHT":68,
	 "WOLF":86, "GNOMESHOOTER":87, "GNOME":85,
 } ;

 function convert_unit( content ) {

	 var u = 0;

	 switch( content.factionEntityTagName ) {

		 case "NEUTRAL":
			 u = convert_neutral[content.tier];
		 break;

		 default:  
		 var tier = convert_tier[content.tier];       
		 var faction = convert_faction[content.factionEntityTagName];    
		 u = (faction*16) + (tier&15) + (faction==4?5:0);
		 break;

	 }

	 return { unite: u, 
		 nombre:content.quantity }

 }

 var convert_archetype= {
	 'ARCANE_MAGE':0,
	 'DISTURBED_WIZARD':1,
	 'FANATIC_SORCERER':2,
	 'ILLUMINATED_PROTECTOR':3,
	 'MERCENARY':4,
	 'OUTLAND_WARRIOR':5,
	 'PALADIN':6,
	 'PIT_WARRIOR':7,
	 'PROTECTOR':8,
	 'WARMAGE':9,
	 'WARMASTER':10,
	 'WARRIOR_MAGE':11,
	 'SENACHAL':12,
	 'SOBERED_WIZARD':13,
	 'EXPLORER':14
 };

 var convert_bodyPart={
	 "HEAD":0,
	 "NECKLACE":1,
	 "RING":2,
	 "LEFT_HAND":3,
	 "CHEST":4,
	 "RIGHT_HAND":5,
	 "FEET":6,
	 "CAPE":7,        
 };

 function from_list( input ){
	 var output = {};
	 for (var k=0;k<input.length;k++){
		 output[input[k]]=k;
	 }
	 return output;
 }

 var liste_artefact=[
	 ,"HARNESS_LVL1"
	 ,"ROBE_LVL2"
	 ,"CLOAK_LVL2"
	 ,"RING_LVL2"
	 ,"RING_LVL1"
	 ,"BLANKET_LVL1"
	 ,"BLANKET_LVL2"
	 ,"AXE_LVL2"
	 ,"WHIP_LVL2"
	 ,"HELMET_HAVEN_LVL2"
	 ,"SCALES_HAVEN_LVL2"
	 ,"RING_HAVEN_LVL2"
	 ,"SOLID_BREASTPLATE_HAVEN_LVL4"
	 ,"POWERFULL_RING_HAVEN_LVL3"
	 ,"RADIANT_CROWN_HAVEN_LVL3"
	 ,"FEATHER_INFERNO_LVL2"
	 ,"LEATHER_JACKET_INFERNO_LVL2"
	 ,"RING_INFERNO_LVL2"
	 ,"CORRUPTED_RING_INFERNO_LVL4"
	 ,"POWERFUL_ROD_INFERNO_LVL3"
	 ,"GREEN_SHIELD_INFERNO_LVL3"
	 ,"RUCKSACK_ACADEMY_LVL2"
	 ,"GLOBE_ACADEMY_LVL2"
	 ,"STICK_ACADEMY_LVL2"
	 ,"HOWLING_CHARM_ACADEMY_LVL4"
	 ,"SOLID_STICK_ACADEMY_LVL3"
	 ,"BRILLIANT_WHIP_ACADEMY_LVL3"
	 ,"CANDLE_NECROPOLIS_LVL2"
	 ,"STAFF_NECROPOLIS_LVL2"
	 ,"WRATH_NECROPOLIS_LVL2"
	 ,"CORRUPTED_PADDED_ARMOR_NECROPOLIS_LVL4"
	 ,"DUSTY_CHARM_NECROPOLIS_LVL3"
	 ,"HOWLING_ROBE_NECROPOLIS_LVL3"
	 ,"HAT_LVL2"
	 ,"CAP_LVL1"
	 ,"ARMOR_LVL2"
	 ,"SOLID_STOMPERS_LVL4"
	 ,"GREEN_HELMET_LVL4"
	 ,"SOLID_BOOK_LVL4"
	 ,"POWERFUL_NECKLACE_OF_DARKNESS_HAVEN_LVL7"
	 ,"BRILLIANT_STAFF_OF_THE_SUN_HAVEN_LVL7"
	 ,"POWERFUL_CLOAK_OF_THE_MIGHT_HAVEN_LVL6"
	 ,"RADIANT_STAFF_OF_DESTRUCTION_INFERNO_LVL7"
	 ,"CORRUPTED_TALISMAN_OF_THE_MIGHT_INFERNO_LVL7"
	 ,"POWERFUL_HOOD_OF_DARKNESS_INFERNO_LVL6"
	 ,"DUSTY_TOGA_OF_THE_OUTER_WORLD_ACADEMY_LVL7"
	 ,"HOWLING_BOOK_OF_THE_LIGHT_ACADEMY_LVL7"
	 ,"DUSTY_WAND_OF_THE_OUTER_WORLD_ACADEMY_LVL6"
	 ,"HOWLING_WRATH_OF_THE_OUTER_WORLD_NECROPOLIS_LVL7"
	 ,"HOWLING_SABATONS_OF_DARKNESS_NECROPOLIS_LVL7"
	 ,"CORRUPTED_FIGURINE_OF_THE_OUTER_WORLD_NECROPOLIS_LVL7"
	 ,"BONNET_LVL3"
	 ,"MEDALLION_LVL2"
	 ,"AMULET_LVL2"
	 ,"RADIAN_LEATHER_JACKET_LVL4"
	 ,"SOLID_NECKLACE_LVL_5"
	 ,"GREEN_HARNESS_LVL6"
	 ,"SOLID_AMULET_OF_THE_LIGHT_HAVEN_LVL7"
	 ,"RADIANT_RUCKSACK_OF_THE_SUN_HAVEN_LVL7"
	 ,"BRILLIANT_CAPE_OF_THE_SHREWD_HAVEN_LVL6"
	 ,"EXPLOSIVE_AMULET_OF_DESTRUCTION_INFERNO_LVL7"
	 ,"POWERFUL_HELMET_OF_DESTRUCTION_INFERNO_LVL7"
	 ,"EXPLOSIVE_STOMPERS_OF_DESTRUCTION_INFERNO_LVL6"
	 ,"HOWLING_BOOK_OF_THE_LIGHT_ACADEMY_LVL6"
	 ,"BRILLIANT_BAG_OF_THE_OUTER_WORLD_ACADEMY_LVL7"
	 ,"BRILLIANT_RING_OF_THE_WISE_ACADEMY_LVL6"
	 ,"CORRUPTED_STOMPERS_OF_THE_OUTER_WORLD_NECROPOLIS_LVL7"
	 ,"HOWLING_RING_OF_DARKNESS_NECROPOLIS_LVL7"
	 ,"HOWLING_CLOG_OF_THE_MIGHT_NECROPOLIS_LVL6"
	 ,"DUSTY_ARMOR_LVL6"
	 ,"GREEN_SHIELD_LVL4"
	 ,"DUSTY_ARMOR_LVL3"
	 ,"BALANCED_BREASTPLATE_OF_THE_OWL_LVL7"
	 ,"SOLID_SLIPPERS_OF_THE_MIGHT_LVL7"
	 ,"GREEN_FOOTPADS_OF_THE_SUN_LVL7"
	 ,"SHINING_SHIELD_OF_THE_MIGHT_HAVEN_LVL4"
	 ,"POWERFUL_RING_OF_THE_MIGHT_HAVEN_LVL7"
	 ,"CORRUPTED_RING_OF_STONE_HAVEN_LVL8"
	 ,"CORRUPTED_SHIELD_OF_THE_SUN_INFERNO_LVL4"
	 ,"RADIAN_ROD_OF_DARKNESS_INFERNO_LVL7"
	 ,"CORRUPTED_HELMET_OF_THE_SUN_INFERNO_LVL8"
	 ,"BRILLIANT_FOOTPADS_OF_THE_OUTER_WORLD_ACADEMY_LVL4"
	 ,"SHINING_CHAPLET_OF_THE_OUTER_WORLD_ACADEMY_LVL7"
	 ,"HOWLING_CHAPLET_OF_THE_CROWD_ACADEMY_LVL8"
	 ,"CORRUPTED_POWDER_OF_THE_OUTER_WORLD_NECROPOLIS_LVL4"
	 ,"CORRUPTED_STICK_OF_DARKNESS_NECROPOLIS_LVL7"
	 ,"HOWLING_STAFF_OF_DARKNESS_NECROPOLIS_LVL8"
	 ,"TEAR_OF_ASHA"
	 ,"TEAR_OF_ASHA_STOLEN"
	 ,"TEAR_OF_ASHA_DOMINATION"
	 ,"TEAR_OF_ASHA_WEALTH"
	 ,"TEAR_OF_ASHA_HONOR"
	 ,"RING_OF_THE_DOMINEER_LVL4"
	 ,"STREETDOGG_S_LUCKY_SOCKS_LVL4"
	 ,"CIRCLET_OF_PROSPERITY_LVL8"
	 ,"ARTURCHIX_S_USED_BATTLE_CHEST_LVL8"
	 ];

 var convert_artefact= from_list(liste_artefact);

 var liste_spell=[
	 // invocation
	 "FIST_OF_WRATH"
	 ,"WASP_SWARM"
	 ,"FIRE_TRAP"
	 ,"RAISE_DEAD"
	 ,"EARTHQUAKE"
	 ,"PHANTOM_FORCES"    
	 ,"SUMMON_ELEMENTALS"
	 ,"FIREWALL"
	 ,"CONJURE_PHOENIX"
	 // tenebre
	 ,"WEAKNESS"
	 ,"SICKNESS"
	 ,"GUARD_BREAK"
	 ,"DISEASE"
	 ,"VULNERABILITY"
	 ,"SLOW"
	 ,"PLAGUE"
	 ,"DEATH_TOUCH"
	 ,"WORD_OF_DEATH"    
	 // lumiere
	 ,"DIVINE_STRENGTH"
	 ,"BLESS"
	 ,"MYSTIC_SHIELD"
	 ,"HASTE"
	 ,"RIGHTEOUS_MIGHT"
	 ,"DEFLECT_MISSILE"
	 ,"TELEPORTATION"
	 ,"WORD_OF_LIGHT"
	 ,"RESURRECTION" 
	 //destruction
	 ,"STONE_SPIKES"
	 ,"ELDERTICH_ARROW"
	 ,"ICE_BOLT"
	 ,"LIGHTNING_BOLT"
	 ,"CIRCLE_OF_WINTER"
	 ,"FIREBALL"
	 ,"METEOR_SHOWER"
	 ,"CHAIN_LIGHTNING"
	 ,"IMPLOSION"    
	 ];

 var convert_spell= from_list(liste_spell); 

 var convert_fortification = {
	 "FORT":1,
	 "CITADEL":2,
	 "CASTLE":3        
 };

 function convert_skill( a, skill ){

	 switch(  skill.heroClassSkillEntityTagName ){

		 // combattant
		 case 'ARMY_ATTACK_POWER_INCREASE': a.tacticien= skill.level; break;
		 case 'CAVALRY_ATTACK_POWER_INCREASE': a.ecuyer= skill.level; break;
		 case 'SHOOTER_ATTACK_POWER_INCREASE': a.tireur_elite= skill.level; break;
		 case 'INFANTRY_ATTACK_POWER_INCREASE': a.commandant_infanterie= skill.level; break;

							// chevalier
		 case 'ARMY_DEFENSE_POWER_INCREASE': break;
		 case 'CAVALRY_DEFENSE_POWER_INCREASE': break;
		 case 'SHOOTER_DEFENSE_POWER_INCREASE': break;
		 case 'INFANTRY_DEFENSE_POWER_INCREASE': break;
		 case 'ATTRITION_RATE_DECREASE': a.logisticien= skill.level; break;

						 // ordre des magies pour Jactari : invocation tenebre lumiere destruction

						 // invocation
		 case 'SUMMON_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break; 
		 case 'SUMMON_SPELLBOOK_SPELL_NUMBER': break;
		 case 'SUMMON_SPELL_EFFICIENCY': a.expert[0]=skill.level; break; 
		 case 'SUMMON_ADDED_MAGIC_POINTS': a.instinct[0]=skill.level; break; 

						   // tenebres
		 case 'DARK_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break; 
		 case 'DARK_SPELLBOOK_SPELL_NUMBER': break;
		 case 'DARK_SPELL_EFFICIENCY': a.expert[1]=skill.level; break; 
		 case 'DARK_ADDED_MAGIC_POINTS': a.instinct[1]=skill.level; break; 

						 // lumiere
		 case 'LIGHT_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break; 
		 case 'LIGHT_SPELLBOOK_SPELL_NUMBER': break;
		 case 'LIGHT_SPELL_EFFICIENCY': a.expert[2]=skill.level; break; 
		 case 'LIGHT_ADDED_MAGIC_POINTS': a.instinct[2]=skill.level; break; 

						  // destruction
		 case 'DESTRUCTION_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break; 

		 case 'DESTRUCTION_SPELLBOOK_SPELL_NUMBER': break;
		 case 'DESTRUCTION_SPELL_EFFICIENCY': a.expert[3]=skill.level; break; 
		 case 'DESTRUCTION_ADDED_MAGIC_POINTS': a.instinct[3]=skill.level; break;          

							// meneur
		 case 'UNIT_PRODUCTION_INCREASE': break;
		 case 'UNIT_RECRUITMENT_SPEED_INCREASE': break;
		 case 'NEUTRAL_STACK_RECRUITMENT_INCREASE': break;
		 case 'ATTACK_POWER_PER_UNIT_INCREASE': a.harangueur=skill.level; break; 

							// barbare
		 case 'SCOUTING_DETECT_LEVEL_INCREASE': break;
		 case 'ATTRITION_RATE_INCREASE': a.massacreur=skill.level; break; 
		 case 'PILLAGE_INCREASE': break;

					  // taverne
		 case 'DEFENSE_POWER_PER_UNIT_INCREASE': a.bon_payeur=skill.level; break; 

	 }

 }

 function convert_hero( a, hero ){

	 a.faction= convert_faction[ hero.factionEntityTagName ];
	 a.statut = 1;   
	 a.heros=1;   
	 a.niveau= hero._level;
	 a.archetype= convert_archetype[hero.heroTrainingEntityTagName];

 }

 function convert_artefact_list( a, artefacts ){

	 for (var k=0;k <artefacts.length; k++){

		 var artefact = artefacts[k].artefactEntity;

		 console.log("artefact=%s bodyPart=%s", 
				 artefact.tagName,
				 artefact.bodyPart
			    );

		 var pos = convert_bodyPart[artefact.bodyPart];

		 a.artefacts[pos] =  // convert_artefact[ artefact.tagName ]; 
			 artefact.id; // Jactari V4

	 }

 }

 function get( obj, key, _default ){
	 var x = obj[key];
	 if (typeof(x)=='undefined')
		 x= _default;
	 return x;
 }

 function launch_jactari(switch_combat_side){

	 var frame = get_frame();

	 console.log("launch jactari", frame);

	 if (!frame) return;

	 //var portal = ( frame.elementType == "ZoneBuildingPortalUpgradeFrame" );

	 var donnees = nouveau_combat();   

	 //var unitStackList = frame.content.unitStackList;

	 try
	 {
		 donnees.saison = HOMMK.player.content.worldSeasonNumber==2 ? 1 : 0;

		 var hero= (frame.linkedHero || frame.hero || frame.selectedHero).content;

		 console.log("name=%s level=%d training=%s",
				 hero.name,  hero._level,
				 hero.heroTrainingEntityTagName
			    );

		 convert_hero( donnees.a, hero );
		 donnees.a.tir_de_barrage = 0;
		 donnees.a.revelation_de_caracteristiques = 0;
	 } catch(err) {    
		 console.log("hero info not available:" + err); 
	 }

	 //

	 try
	 {

		 var skills = undefined;

		 // HeroFrame
		 if ( frame.content ) 
			 skills = frame.content.heroSkillList;

		 // ZoneBuildingPortalUpgradeFrame
		 // BattlePrepFrame
		 if ( hero.heroBonuses )
			 skills = hero.heroBonuses.skills.local;

		 if ( skills )
			 skills.forEach(function(skill){         

					 console.log("skill=%s level=%d", skill.heroClassSkillEntityTagName, skill.level);          
					 convert_skill( donnees.a, skill );

					 });

	 } catch(err) {    
		 console.log("skill info not available:" + err); 
	 }

	 //  

	 try
	 {

		 var artefacts = undefined;

		 // HeroFrame
		 if ( frame.content ) 
			 artefacts = frame.content.equipedArtefacts;

		 // ZoneBuildingPortalUpgradeFrame
		 // BattlePrepFrame
		 if ( hero.heroBonuses )
			 artefacts = hero.heroBonuses.artefacts.local;    

		 convert_artefact_list( donnees.a, artefacts );

	 } catch(err) {    
		 console.log("artefacts info not available:" + err); 
	 }

	 //    

	 try
	 {

		 var spells = frame.RoundSpellStackList.elementList;

		 for (var k=0;k <spells.length; k++){

			 var spell = spells[k].content;

			 console.log("spell=%s position=%d", spell.spellEntityTagName, spell.roundPosition);

			 donnees.a.sort[k].id = convert_spell[ spell.spellEntityTagName ];
			 donnees.a.sort[k].tour = spell.roundPosition;
		 }

	 } catch(err) {    
		 console.log("spell info not available:" + err); 
	 }

	 //    

	 try
	 {

		 var units = (frame.attackerUnitStackList || frame.heroUnitStackList || hero.unitStackList).elementList ;

		 for (var k=0;k <units.length; k++){

			 var unit = units[k].content;

			 console.log("unit=%s quantity=%d",
					 unit.unitEntityTagName, unit.quantity
				    );

			 donnees.a.troupes[unit.stackPosition] = convert_unit(unit);

		 }

	 } catch(err) {    
		 console.log("attacker units info not available:" + err); 
	 }

	 //

	 try
	 {

		 var units = (frame.defenderUnitStackList || frame.npcUnitStackList).elementList;

		 for (var k=0;k <units.length; k++){

			 var unit = units[k].content;

			 console.log("unit=%s quantity=%d",
					 unit.unitEntityTagName, unit.quantity
				    );

			 var pos = unit.powerPosition || unit.stackPosition;

			 donnees.d.troupes[pos] =  convert_unit(unit);
		 }   

	 } catch(err) {    
		 console.log("defender units info not available:" + err); 
	 }

	 //

	 try
	 {

		 var list = frame.content.scoutingResultList;

		 if ( list && list.length >= 1){
			 // todo : pour choisir la reco, utiliser scoutingLevel ou creationDate
			 var content = list[0].contentJSON;

			 donnees.d.statut = 1;

			 if (content.cityFortificationTagName) {
				 console.log("scouting: fortification=%s",
						 content.cityFortificationTagName
					    );

				 donnees.d.fortification= convert_fortification[content.cityFortificationTagName];
			 }

			 if ( content.heroList && content.heroList.length >= 1){

				 // select hero with maximum defense
				 var hero =  content.heroList[0];

				 content.heroList.forEach(function(item){         
						 if (item.defense > hero.defense)
						 hero = item;
						 });
				 if (!hero._level) 
					 hero._level = 1;
				 convert_hero( donnees.d, hero);

				 try
				 {         
					 convert_artefact_list( donnees.d, hero.artefactList );                  
				 } catch(err) {}

			 }

		 }

	 } catch(err) {    
		 console.log("scouting results not available:" + err); 
	 }

	 if (switch_combat_side) {
		 var tmp = donnees.a;
		 donnees.a = donnees.d;
		 donnees.d = tmp;
	 }

	 // open new window
	 console.log("donnees: ", donnees);

	 var link = 'http://mmhk.jactari.info/' + localize('JACTARI_FIGHT') + '?info='+ encode_donnees_combat(donnees);

	 console.log("link: %s", link);

	 // display permalink : it is useful if popup are blocked    
	 $("#hommk-user-info").html( '<a href="'+link+'" class="ui-state-default" target="_blank">Jactari permalink</a>' ); 

	 GM_openInTab(link);

 }

 //
 // reverse engineering from http://mmhk.jactari.info/combat

 function nouveau_combat(){

	 var donnees = {
saison:0, // 0:saison 1/1:saison 2
       a:{
statut:1, // 1:joueur/0:PNJ
       dolmens:0,
       cri_de_guerre:0,
       inspiration:0,
       heros:0, // 1:héros présent
       niveau:1,
       faction:0,
       archetype:0,
       artefacts:[0,0,0,0,0,0,0,0],
       tacticien:0,
       ecuyer:0,
       tireur_elite:0,
       commandant_infanterie:0,
       logisticien:0,
       harangueur:0,
       sapeur:0,
       massacreur:0,
       instinct:[0,0,0,0],
       expert:[0,0,0,0],
       arcanes:0,
       bonus_ecole:[0,0,0,0],
       larmes:0,
       sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
       troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
       mhr:{signe:0, valeur:0},
       butin_de_guerre:0,
       relever_les_morts:0,
       resistance_magique:0,
       moral_eleve:0,
       resurrection:0,
       tir_de_barrage:0,		// Barrage Fire
       heros_superieur:0,
       maitrise_des_sorts:0,
       revelation_de_caracteristiques:0, // Characteristics Illumination
       classement_voies:0
       },
d:{
statut:0, // 1:joueur/0:PNJ
       lieu:0, // 1:cité/2:région/3:halte
       fortification:0, // 1:fortin/2:citadelle/3:chateau
       forts:0,
       fort_principal:0,
       dolmens:0,
       ralliement:0,
       inspiration:0,
       heros:0,
       niveau:1,
       faction:0,
       archetype:0,
       artefacts:[0,0,0,0,0,0,0,0],
       tacticien_defenseur:0,
       ecuyer_defenseur:0,
       expert_tirs_barrage:0,
       inebranlable:0,
       logisticien:0,
       bon_payeur:0,
       batisseur_fortifications:0,
       massacreur:0,
       instinct:[0,0,0,0],
       expert:[0,0,0,0],
       arcanes:0,
       bonus_ecole:[0,0,0,0],
       larmes:0,
       sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
       troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
       mhr:{signe:0, valeur:0},
       butin_de_guerre:0,
       relever_les_morts:0,
       resistance_magique:0,
       moral_eleve:0,
       resurrection:0,
       tir_de_barrage:0,

       heros_superieur:0,
       maitrise_des_sorts:0,
       revelation_de_caracteristiques:0,
       classement_voies:0
  }
	 };

	 return donnees;
 }

 // Jactari V4
 function encode_donnees_combat(donnees) {

	 var _base64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

	 var _camps=['attaquant','defenseur'];
	 var _camps_abr=['a','d'];

	 var triplets = [];
	 var version = 4;
	 // 00
	 triplets[0] |= (version & 63) << 18;
	 triplets[0] |= (donnees.d.lieu & 3) << 16;
	 triplets[0] |= (donnees.a.statut & 1) << 15;
	 triplets[0] |= (donnees.a.heros & 1) << 14;
	 triplets[0] |= (donnees.a.cri_de_guerre & 3) << 12;
	 triplets[0] |= (donnees.a.inspiration & 3) << 10;
	 triplets[0] |= (donnees.a.dolmens & 15) << 6;
	 triplets[0] |= (donnees.a.niveau & 63);
	 // 01
	 triplets[1] |= (donnees.a.artefacts[0] & 255) << 16;
	 triplets[1] |= (donnees.a.artefacts[1] & 255) << 8;
	 triplets[1] |= (donnees.a.tacticien & 3) << 6;
	 triplets[1] |= (donnees.a.ecuyer & 3) << 4;
	 triplets[1] |= (donnees.a.tireur_elite & 3) << 2;
	 triplets[1] |= (donnees.a.commandant_infanterie & 3);
	 // 02
	 triplets[2] |= (donnees.a.artefacts[2] & 255) << 16;
	 triplets[2] |= (donnees.a.artefacts[3] & 255) << 8;
	 triplets[2] |= (donnees.a.logisticien & 3) << 6;
	 triplets[2] |= (donnees.a.harangueur & 3) << 4;
	 triplets[2] |= (donnees.a.sapeur & 3) << 2;
	 triplets[2] |= (donnees.a.massacreur & 3);
	 // 03
	 triplets[3] |= (donnees.a.artefacts[4] & 255) << 16;
	 triplets[3] |= (donnees.a.artefacts[5] & 255) << 8;
	 triplets[3] |= (donnees.a.instinct[0] & 3) << 6;
	 triplets[3] |= (donnees.a.expert[0] & 3) << 4;
	 triplets[3] |= (donnees.a.instinct[1] & 3) << 2;
	 triplets[3] |= (donnees.a.expert[1] & 3);
	 // 04
	 triplets[4] |= (donnees.a.artefacts[6] & 255) << 16;
	 triplets[4] |= (donnees.a.artefacts[7] & 255) << 8;
	 triplets[4] |= (donnees.a.instinct[2] & 3) << 6;
	 triplets[4] |= (donnees.a.expert[2] & 3) << 4;
	 triplets[4] |= (donnees.a.instinct[3] & 3) << 2;
	 triplets[4] |= (donnees.a.expert[3] & 3);
	 // 05
	 triplets[5] |= (donnees.a.bonus_ecole[0] & 15) << 20;
	 triplets[5] |= (donnees.a.bonus_ecole[1] & 15) << 16;
	 triplets[5] |= (donnees.a.bonus_ecole[2] & 15) << 12;
	 triplets[5] |= (donnees.a.bonus_ecole[3] & 15) << 8;
	 triplets[5] |= (donnees.a.larmes & 31) << 3;
	 triplets[5] |= (donnees.a.faction & 7);
	 // 06
	 triplets[6] |= (donnees.a.mhr.signe & 1) << 23;
	 triplets[6] |= (donnees.a.mhr.valeur & 131071) << 6;
	 triplets[6] |= (donnees.a.archetype & 15) << 2;
	 triplets[6] |= (donnees.a.arcanes & 3);
	 // 07
	 triplets[7] |= (donnees.d.mhr.signe & 1) << 23;
	 triplets[7] |= (donnees.d.mhr.valeur & 131071) << 6;
	 triplets[7] |= (donnees.d.larmes & 31) << 1;
	 triplets[7] |= (donnees.saison & 1); // 0 : saison 1, 1 : saison 2
	 // 08
	 triplets[8] |= (donnees.d.statut & 1) << 23;
	 triplets[8] |= (donnees.d.heros & 1) << 22;
	 triplets[8] |= (donnees.d.fortification & 3) << 20; // [ff] défense de cité
	 triplets[8] |= (donnees.d.dolmens & 15) << 16;
	 triplets[8] |= (donnees.d.forts & 7) << 13; // [FFF] défense de région
	 triplets[8] |= (donnees.d.fort_principal & 1) << 12; // [P] fort principal
	 triplets[8] |= (donnees.d.ralliement & 3) << 10;
	 triplets[8] |= (donnees.d.inspiration & 3) << 8;
	 triplets[8] |= (donnees.d.archetype & 15) << 4;
	 triplets[8] |= (donnees.d.faction & 7) << 1;
	 triplets[8] |= 1 ; // detection Jactari
	 // 09
	 triplets[9] |= (donnees.d.bonus_ecole[0] & 15) << 20;
	 triplets[9] |= (donnees.d.bonus_ecole[1] & 15) << 16;
	 triplets[9] |= (donnees.d.bonus_ecole[2] & 15) << 12;
	 triplets[9] |= (donnees.d.bonus_ecole[3] & 15) << 8;
	 triplets[9] |= (donnees.d.arcanes & 3) << 6;
	 triplets[9] |= (donnees.d.niveau & 63);
	 // 10
	 triplets[10] |= (donnees.d.artefacts[0] & 255) << 16;
	 triplets[10] |= (donnees.d.artefacts[1] & 255) << 8;
	 triplets[10] |= (donnees.d.tacticien_defenseur & 3) << 6;
	 triplets[10] |= (donnees.d.ecuyer_defenseur & 3) << 4;
	 triplets[10] |= (donnees.d.expert_tirs_barrage & 3) << 2;
	 triplets[10] |= (donnees.d.inebranlable & 3);
	 // 11
	 triplets[11] |= (donnees.d.artefacts[2] & 255) << 16;
	 triplets[11] |= (donnees.d.artefacts[3] & 255) << 8;
	 triplets[11] |= (donnees.d.logisticien & 3) << 6;
	 triplets[11] |= (donnees.d.bon_payeur & 3) << 4;
	 triplets[11] |= (donnees.d.batisseur_fortifications & 3) << 2;
	 triplets[11] |= (donnees.d.massacreur & 3);
	 // 12
	 triplets[12] |= (donnees.d.artefacts[4] & 255) << 16;
	 triplets[12] |= (donnees.d.artefacts[5] & 255) << 8;
	 triplets[12] |= (donnees.d.instinct[0] & 3) << 6;
	 triplets[12] |= (donnees.d.expert[0] & 3) << 4;
	 triplets[12] |= (donnees.d.instinct[1] & 3) << 2;
	 triplets[12] |= (donnees.d.expert[1] & 3);
	 // 13
	 triplets[13] |= (donnees.d.artefacts[6] & 255) << 16;
	 triplets[13] |= (donnees.d.artefacts[7] & 255) << 8;
	 triplets[13] |= (donnees.d.instinct[2] & 3) << 6;
	 triplets[13] |= (donnees.d.expert[2] & 3) << 4;
	 triplets[13] |= (donnees.d.instinct[3] & 3) << 2;
	 triplets[13] |= (donnees.d.expert[3] & 3);
	 // 14-27
	 try {
		 for (var c in _camps) {
			 for (var p = 1; p < 8; p++) {
				 var u = donnees[_camps_abr[c]].troupes[p].unite;
				 if (u == -1) u = 255;
				 triplets[13+p+(c*7)] |= (u & 255) << 16;
				 triplets[13+p+(c*7)] |= (donnees[_camps_abr[c]].troupes[p].nombre & 65535);
			 }
		 }
	 } catch(err) {} // webkit : Uncaught TypeError: Cannot read property 'troupes' of undefined

	 // 28
	 triplets[28] |= (donnees.a.sort[0].id & 63) << 18;
	 triplets[28] |= (donnees.a.sort[0].tour & 15) << 14;
	 triplets[28] |= (donnees.a.sort[1].id & 63) << 6;
	 triplets[28] |= (donnees.a.sort[1].tour & 15) << 2;
	 // 29
	 triplets[29] |= (donnees.d.sort[0].id & 63) << 18;
	 triplets[29] |= (donnees.d.sort[0].tour & 15) << 14;
	 triplets[29] |= (donnees.d.sort[1].id & 63) << 6;
	 triplets[29] |= (donnees.d.sort[1].tour & 15) << 2;
	 // 30
	 triplets[30] |= (donnees.a.butin_de_guerre & 15) << 20;
	 triplets[30] |= (donnees.a.relever_les_morts & 15) << 16;
	 triplets[30] |= (donnees.a.resistance_magique & 15) << 12;
	 triplets[30] |= (donnees.a.moral_eleve & 15) << 8;
	 triplets[30] |= (donnees.a.resurrection & 15) << 4;
	 triplets[30] |= (donnees.a.tir_de_barrage & 15);
	 // 31
	 triplets[31] |= (donnees.a.heros_superieur & 15) << 20;
	 triplets[31] |= (donnees.a.maitrise_des_sorts & 15) << 16;
	 triplets[31] |= (donnees.a.revelation_de_caracteristiques & 15) << 12;
	 triplets[31] |= (donnees.d.butin_de_guerre & 15) << 8;
	 triplets[31] |= (donnees.d.relever_les_morts & 15) << 4;
	 triplets[31] |= (donnees.d.resistance_magique & 15);
	 // 32
	 triplets[32] |= (donnees.d.moral_eleve & 15) << 20;
	 triplets[32] |= (donnees.d.resurrection & 15) << 16;
	 triplets[32] |= (donnees.d.tir_de_barrage & 15) << 12;
	 triplets[32] |= (donnees.d.heros_superieur & 15) << 8;
	 triplets[32] |= (donnees.d.maitrise_des_sorts & 15) << 4;
	 triplets[32] |= (donnees.d.revelation_de_caracteristiques & 15);
	 // 33
	 triplets[33] |= (donnees.a.classement_voies & 7) << 21; // voir en-dessous de la fonction
	 triplets[33] |= (donnees.d.classement_voies & 7) << 18;

	 // Codage base 64
	 var code = '';
	 for (var t = 0; t < 33; t++) {
		 code += _base64.charAt((triplets[t] >> 18) & 63);
		 code += _base64.charAt((triplets[t] >> 12) & 63);
		 code += _base64.charAt((triplets[t] >> 6) & 63);
		 code += _base64.charAt((triplets[t]) & 63);
	 }
	 code += _base64.charAt((triplets[33] >> 18) & 63);
	 return code;
 }

 // export for other modules :

HOMMK_user.jactari = {
	launch: launch_jactari,
};

// protect from other modules
})();

/*

   contraintes pour un module:

   1- ne rien mettre dans le global, utiliser HOMMK_user

   2- ne rien mettre dans le DOM, tant que le module n'est pas activé

 */ 

// protect from other modules
(function() {

 // MODEL

 function search( array, param, value ) {

 for (var k=0;k<array.length;k++){
 var obj = array[k];
 if ( obj[param] == value )
 return obj;
 }

 return null;   
 }

 function search_content( array, param, value ) {

 for (var k=0;k<array.length;k++){
 var obj = array[k].content;
 if ( obj[param] == value )
 return obj;
 }

 return null;   
 }

 function Message(){

	 this.from = null;
	 this.to = null;
	 this.subject = null;
	 this.body = null;
	 this.id = null;
	 this.date = null;

 }

 function print_power(x) {

	 if (x >= 10000000) // 10M
		 return Math.round(x*0.000001)+'M';

	 if (x >= 10000) // 10K
		 return Math.round(x*0.001)+'K';

	 return x.toString();
 }

 function print_unit(unit){
	 return ( unit.quantity + ' ' + unit.unitEntityName 
			 + ' (' + unit.unitEntityType + ' ' + print_power(unit.quantity * unit.unitEntityPower)+ ')');
			 }

			 Message.prototype.from_HOMMK = function( content ) {

			 this.id = content.id;
			 this.subject = content.subject ;
			 this.date = content.creationDate ;

			 var contentJSON = content.contentJSON;

			 switch( content.type ){

			 case 'TROOP_SCOUTING':

			 var str = [];

			 str.push( '' );

			 if (contentJSON.targetedPlayerName)
				 str.push( 'joueur: ' + contentJSON.targetedPlayerName);

			 if (contentJSON.targetedPlayerAlliance)
				 str.push( 'alliance: ' + contentJSON.targetedPlayerAlliance);

			 if (contentJSON.cityName)
				 str.push( 'lieu: ' + contentJSON.cityName);

			 if (contentJSON.cityFortificationName )
				 str.push( 'fortification: ' + contentJSON.cityFortificationName );

			 foreach( contentJSON.regionUnitStackList, function(unit, i) {

					 if (i==0) { str.push( '' ); str.push( 'region :' ); }

					 str.push( print_unit(unit) );

					 } );

			 foreach( contentJSON.heroList, function(hero) {

					 str.push( '' );

					 var tmp = 'hero : ' + hero.name ;

					 if (hero.heroTrainingEntityName)
					 tmp += ' ' + hero.heroTrainingEntityName;

					 if (hero._level)
					 tmp += ' level ' + hero._level ;

					 str.push( tmp );

					 var tmp = [];           
					 foreach( hero.heroClassList, function(item) {
						 tmp.push( item.heroClassEntityName );           
						 } );

					 if (tmp.length) str.push( 'class: '+ tmp.join(', ') );

					 var tmp = [];  
					 foreach( hero.spellStackList, function(item) {
							 tmp.push( item.attachedSpellEntity.tagName );                
							 } );

					 if (tmp.length) str.push( 'spell: '+ tmp.join(', ') );

					 var tmp = []; 
					 foreach( hero.artefactList, function(artefact, i) {
							 tmp.push( artefact.artefactEntity.name );              
							 } );

					 if (tmp.length) str.push( 'artefact: '+ tmp.join(', ') );

					 foreach( hero.attachedUnitStackList, function(unit) {

							 str.push( print_unit(unit) );

							 } );

			 } ); 

			 this.body = str.join('\n'); 

			 break;

			 //case 'PLAYER_MESSAGE':
			 default:

			 this.body = contentJSON.message;                    
			 this.from = content.exp_playerName;
			 this.to = content.recptPlayerNameList;

			 break;

			 } //  switch( content.type )

			 return this;
			 }

			 Message.prototype.toString = function() {

				 var str = [];

				 if (this.date)
					 str.push( 'date : ' + ctime(this.date) );

				 if (this.from)
					 str.push( 'from : ' + this.from );

				 if (this.to)
					 str.push( 'to : ' + this.to );

				 if (this.subject)
					 str.push( 'subject : ' + this.subject );

				 if (this.body)
					 str.push( this.body );

				 return str.join('\n');                        
			 }

			 Message.prototype.toHTML = function() {

				 //return this.toString().replace(/(\r\n|\r|\n)/g, "<br>");

				 var str = '';

				 if (this.from)
					 str += '<p>'+ 'from : ' + this.from.replace(/(;)/g, "; ") + '</p>';

				 if (this.to)
					 str += '<p>'+ 'to : ' + this.to.replace(/(;)/g, "; ") + '</p>';

				 if (this.subject)
					 str += '<p>'+  'subject : ' + this.subject + '</p>';

				 if (this.body)
					 str += '<p>'+  this.body.replace(/(\r\n|\r|\n)/g, "<br>") + '</p>';

				 return str;   

			 }

			 function search_message(){

				 try
				 {

					 var frame = get_frame();

					 if ( !(frame && frame.elementType=="MessageBoxFrame") ) return null;

					 var msg = null;

					 var liste = ["ReceivedMessage", "ArchivedMessage", "TrashedMessage", "SentMessage", "AllianceMessage"];

					 for (var k=0; k<liste.length;k++){

						 var mailbox = HOMMK.elementPool.get(liste[k]);

						 if (mailbox) {
							 msg = mailbox.get(frame.openedMessageId);

							 if (msg) break;
						 }

					 }

					 if (msg) {
						 return msg.detailedMessage.content;
					 }

				 } catch(err) { }

				 return null;

			 }

			 // VIEW

			 var $dialog;

			 function toggle_scribe(){

				 if ($dialog && $dialog.dialog('isOpen')) {
					 $dialog.dialog('close');
					 return;
				 }

				 // create view

				 $dialog = $("<div></div>")
					 .dialog({
zIndex: 90000,
width: 430,
minWidth: 430,
maxWidth: 430,
title: 'Le Scribe',

open: function(event, ui){

var content = search_message();

if (!content)
return;

console.log(content.subject, content);

var msg = (new Message()).from_HOMMK( content );

var textinput = document.createElement("textarea");
textinput.style.width="400px";
textinput.style.height="300px";

textinput.value = msg.toString();

$(this).append(textinput);
},

close: function(event, ui){

	       $dialog.dialog('destroy')
		       .remove();

	       $dialog = null;

       },

       });

}

// export for other modules :

HOMMK_user.scribe = {

check: function(){
	       return ( search_message() ? true : false );
       },

toggle: toggle_scribe,

};

// protect from other modules
})();

/*

   contraintes pour un module:

   1- ne rien mettre dans le global, utiliser HOMMK_user

   2- ne rien mettre dans le DOM, tant que le module n'est pas activé

 */ 

// protect from other modules
(function() {

 // messages à traduire

 extend( locale_strings_default, {
	 "VIGIE_NOTHING_HERE":   "nothing here.",
	 "VIGIE_SEARCH_TROOPS":   "searching troops mouvements ...",
	 });

 extend( locale_strings_fr , {
	 "VIGIE_NOTHING_HERE":   "rien à l'horizon.",
	 "VIGIE_SEARCH_TROOPS":   "recherche des mouvements de troupes ...",

	 });

 // La Vigie

 function build( panel ){

 // build request for player names 

	 var HeroMove = HOMMK.elementPool.get('HeroMove');

	 if (!HeroMove){
		 $(panel).html(localize("VIGIE_NOTHING_HERE"));
		 return;
	 }

	 var moves = HeroMove.values().map(function(item){
			 return ( item.content );
			 });

	 moves.sort( function(a,b){ return (a.masterHeroMove.endDate - b.masterHeroMove.endDate); } );

	 var playerId = moves.map(function(item){
			 return ( item.masterHeroMove.playerId );
			 });

	 var k = 0;

	 var table = document.createElement("table");
	 table.style.width="600px";
	 table.style.border = "1px solid gray";
	 table.style.borderCollapse = "collapse";
	 var row = table.insertRow(-1);
	 row.style.border = "1px solid gray";
	 row.style.borderCollapse = "collapse";
	 var cell = row.insertCell(-1);          
	 cell.innerHTML = "Departure";
	 $(cell).attr('colspan','2').css("text-align","center");
	 var cell = row.insertCell(-1);          
	 cell.innerHTML = "Arrival";
	 $(cell).attr('colspan','2').css("text-align","center");
	 var cell = row.insertCell(-1);          
	 cell.innerHTML = "Name";
	 var cell = row.insertCell(-1);          
	 cell.innerHTML = "Status";
	 /*
	 var cell = row.insertCell(-1);          
	 cell.innerHTML = "From";
	 var cell = row.insertCell(-1);          
	 cell.innerHTML = "To";
	 */
	 moves.forEach(function(item){
			 var elParamList = [];
			 //elParamList.clear();
			 elParamList.push({"elementType":"ProfileFrame","elementId":item.masterHeroMove.playerId});  

			 var json = do_request_no_Ajax({"elParamList":elParamList});

			 //alert(JSON.stringify(json));
			 var obj=item;
			 //moves.forEach( function(obj){

			 //alert(json.d);
			 var playerName;
			 try
			 {
				 playerName = json.d["ProfileFrame"+obj.masterHeroMove.playerId].playerName;
			 }
			 catch(err)
			 {
				 playerName = "N/A";
			 }
			 var row = table.insertRow(-1);
			 row.style.border = "1px solid gray";
			 row.style.borderCollapse = "collapse";

			 var move = obj.masterHeroMove;
			 var cell = row.insertCell(-1);          
			 cell.innerHTML = ctime(move.startDate);

			 //From
			 var cell = row.insertCell(-1);       
			 $('<a href="#goto" class="ui-state-default">'+coord(move.x1, move.y1)+'</a>')
				 .appendTo($(cell))
				 .click(function() {

						 // console.log( "center "+coord(move.x2, move.y2));
						 HOMMK_worldMap_center(move.x1, move.y1);

						 // prevent the default action, e.g., following a link
						 return false;
			 });

			 var cell = row.insertCell(-1);          
			 cell.innerHTML = ctime(move.endDate);

			 //To
			 var cell = row.insertCell(-1);       
			 $('<a href="#goto" class="ui-state-default">'+coord(move.x2, move.y2)+'</a>')
				 .appendTo($(cell))
				 .click(function() {
						 // console.log( "center "+coord(move.x2, move.y2));
						 HOMMK_worldMap_center(move.x2, move.y2);
						 // prevent the default action, e.g., following a link
						 return false;
			 });

			 //Player name
			 var cell = row.insertCell(-1);          
			 /*
			 $('<span title="'+build_tooltip(json,obj.masterHeroMove.playerId)+'">'+playerName+'</span>')
				 .appendTo($(cell));
			  */
			 $('<a title="'+build_tooltip(json,obj.masterHeroMove.playerId)+'">'+playerName+'</a>')
				 .appendTo($(cell))
				 .click(function(){
						 toggle_player(json.d["ProfileFrame"+obj.masterHeroMove.playerId]);
						 return false;
			 });

			 /*.hover( function(e)
			   {
			   this.tip=this.title;
			   this.title="";
			   $("body").append("<p id='tooltip'>"+ this.t +"</p>");
			   $("#tooltip")
			   .css("top",(e.pageY - xOffset) + "px")
			   .css("left",(e.pageX + yOffset) + "px")
			   .fadeIn("fast");	

			   },
			   function()
			   {
			   this.title = this.tip;		
			   $("#tooltip").remove();
			   }
			   )*/

/*
			 //From
			 var cell = row.insertCell(-1);       
			 $('<a href="#goto" class="ui-state-default">'+coord(move.x1, move.y1)+'</a>')
				 .appendTo($(cell))
				 .click(function() {

						 // console.log( "center "+coord(move.x2, move.y2));
						 HOMMK_worldMap_center(move.x1, move.y1);

						 // prevent the default action, e.g., following a link
						 return false;
						 });
			 //To
			 var cell = row.insertCell(-1);       
			 $('<a href="#goto" class="ui-state-default">'+coord(move.x2, move.y2)+'</a>')
				 .appendTo($(cell))
				 .click(function() {
						 // console.log( "center "+coord(move.x2, move.y2));
						 HOMMK_worldMap_center(move.x2, move.y2);
						 // prevent the default action, e.g., following a link
						 return false;
						 });
 */
 			
					//Status
			 		var cell = row.insertCell(-1);       
					$(cell).css("text-align","center");
					var tX;
					var tY;
					if (obj.type=="T") {tX=obj.x2p;tY=obj.y2p;}
					else {tX=Math.floor(obj.x1p);tY=Math.floor(obj.y1p);}
					if (obj.type=="M") {
						$('<span class="ui-state-default" style="text-align:center">'+obj.type+'</span>')
							.appendTo($(cell));
					} else {
						$('<a href="#goto" class="ui-state-default" style="text-align:center">'+obj.type+'</a>')
							.appendTo($(cell))
							.click(function() {
									HOMMK_worldMap_center(tX, tY);
									// prevent the default action, e.g., following a link
									return false;
						});
					}
			 k++;

	 });
	 $(panel).append(table);

	 }
	 //My function
	 //Leon

	 function build_playerinfo( json,panel )
	 {
		 var table = document.createElement("table");
		 table.style.width="300px";
		 table.style.border = "1px solid gray";
		 table.style.borderCollapse = "collapse";

		 AddRow(table,"Name",json.playerName);
		 AddRow(table,"Fraction",json.factionName);
		 AddRow(table,"Alliance",json.allianceName);
		 AddRow(table,"Dom",json.dominationScore);
		 AddRow(table,"Wealth",json.wealthScore);
		 AddRow(table,"Honor",json.honorScore);

		 var row = table.insertRow(-1);
		 row.style.border = "1px solid gray";
		 row.style.borderCollapse = "collapse";
		 var cell = row.insertCell(-1);          
		 cell.innerHTML = "City List";
		 $(cell).attr('colspan','2').css("text-align","center");

		 var c=json.cityList;
		 c.forEach(function(item)
				 {
				 //AddRow(table,'<a href="#goto" onclick="HOMMK_worldMap_center('+item.x+','+item.yY+');return false;">'+item.cityName+'</a>',"");
				 var row = table.insertRow(-1);
				 row.style.border = "1px solid gray";
				 row.style.borderCollapse = "collapse";
				 var cell = row.insertCell(-1);          
				 cell.innerHTML = item.cityName;
				 //cell.innerHTML="fdgdg";
				 var cell = row.insertCell(-1);          
				 $('<a href="#goto" class="ui-state-default" style="text-align:center">'+coord(item.x,item.y)+'</a>')
				 .appendTo($(cell))
				 .click(function() {
					 HOMMK_worldMap_center(item.x,item.y);
					 // prevent the default action, e.g., following a link
					 return false;
					 });
				 });

		 var row = table.insertRow(-1);
		 row.style.border = "1px solid gray";
		 row.style.borderCollapse = "collapse";
		 var cell = row.insertCell(-1);          
		 cell.innerHTML = "Given City List";
		 $(cell).attr('colspan','2').css("text-align","center");

		 var g=json.givenCityList;
		 if (g)
		 {
			 g.forEach(function(item)
					 {
					 var row = table.insertRow(-1);
					 row.style.border = "1px solid gray";
					 row.style.borderCollapse = "collapse";
					 var cell = row.insertCell(-1);          
					 cell.innerHTML = item.cityName+"(owned by "+ item.ownerPlayerName + ")";
					 var cell = row.insertCell(-1);          
					 $('<a href="#goto" class="ui-state-default" style="text-align:center">'+coord(item.x,item.y)+'</a>')
					 .appendTo($(cell))
					 .click(function() {
						 HOMMK_worldMap_center(item.x,item.y);
						 return false;
						 });
					 });
		 }

		 $(panel).append(table);
	 }

	 function AddRow(table,text1,text2)
	 {
		 var row = table.insertRow(-1);
		 row.style.border = "1px solid gray";
		 row.style.borderCollapse = "collapse";
		 var cell = row.insertCell(-1);          
		 cell.innerHTML = text1;
		 var cell = row.insertCell(-1);          
		 cell.innerHTML = text2;
	 }

	 function build_tooltip(obj,id)
	 {
		 // var line='&#10;';
		 //alert(JSON.stringify(obj));
		 //return obj.d["ProfileFrame"+id].playerName;
		 return "Alliance: "+obj.d["ProfileFrame"+id].allianceName;return "Alliance: "+obj.d["ProfileFrame"+id].allianceName;
		 return "";
	 }

	 var $player_info;

	 function toggle_player(json)
	 {
		 if ($player_info && $player_info.dialog('isOpen')) {
			 $player_info.dialog('close');
		 }

		 $player_info = $("<div id='hommk-user-vigie'></div>")
			 .dialog( {
					zIndex: 95001,
					width: 327,
					minWidth: 327,
					maxWidth: 327,
					//show: 'slide',
					position: ['center','middle'],
					title: 'Player Info',
					open: function(event, ui){                       
						build_playerinfo( json ,this);
					},


				////////////////////////////////////////

				close: function(event, ui){
					$player_info.dialog('destroy')
					.remove();
					$player_info = null;
				},

			 });
	 }
		
	 //

	 var $dialog;

	 //la vigie panel
	 function toggle_vigie(){

		 if ($dialog && $dialog.dialog('isOpen')) {
			 $dialog.dialog('close');
			 return;
		 }

		 // create view

		 $dialog = $("<div id='hommk-user-vigie'></div>")
			 .html(localize("VIGIE_SEARCH_TROOPS"))
			 .dialog({
zIndex: 90000,
width: 627,
minWidth: 627,
maxWidth: 627,
//show: 'slide',
position: ['center','top'],
title: 'Army Movements',

open: function(event, ui){                       

build( this );

},

//

close: function(event, ui){

$dialog.dialog('destroy')
.remove();

$dialog = null;

       },

       });

}

// export for other modules :

HOMMK_user.vigie = {

toggle: toggle_vigie,

};

// protect from other modules
})();

/*

   contraintes pour un module:

   1- ne rien mettre dans le global, utiliser HOMMK_user

   2- ne rien mettre dans le DOM, tant que le module n'est pas activé

 */ 

// protect from other modules
(function() {

 // messages à traduire

 extend( locale_strings_default, {
	 "CARTO_SHARE":          "Share",
	 "CARTO_SHARE_COMMENT":  "share the map ...",
	 "CARTO_PLOT":           "Plot",

	 });

 extend( locale_strings_fr , {
	 "CARTO_SHARE":   "Partager",
	 "CARTO_SHARE_COMMENT":  "faites passer la carte ...",
	 "CARTO_PLOT":           "Dessin",
	 });

 // Le Cartographe

 var map = {};

 //

 var palette = [
	 255,89,0, //0
	 255,137,0,
	 255,192,0,
	 250,219,1,
	 221,221,0,
	 186,248,9,
	 128,228,16,
	 76,207,26,
	 0,190,100,
	 0,207,144,
	 0,224,245,
	 0,188,235,
	 0,151,225, // 12
	 0,93,191,  // 13
	 0,42,162,
	 16,4,147,
	 73,1,160,
	 97,0,166,
	 138,0,179,
	 179,0,192,
	 248,0,189,
	 255,0,23, //21
	 //
	 0,0,0,
	 0,0,0,
	 0,0,0,
	 0,0,0,//25
	 0,0,0,
	 0,0,0,
	 0,0,0,
	 0,0,0,
	 0,0,0,
	 0,0,0, // 31
	 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	 ];

 function rgba_to_string(r,g,b,a){
	 return ('rgba('+r+','+g+','+b+','+a+')');
			 }

			 function convert_palette( palette ){
			 var palette_rgba=[];
			 var nbcol = Math.floor(palette.length/3);
			 for (var c= 0;c< nbcol;c++ ){
			 palette_rgba[c]= rgba_to_string( palette[3*c+0], palette[3*c+1], palette[3*c+2], 1.0 );
			 }
			 return palette_rgba;
			 }

			 var palette_rgba= convert_palette( palette );

			 //

			 function Region(){

			 this.c = 0; // couleur

			 this.a = 0; // alliance id
			 }

			 Region.prototype.from = function( region ) {

				 var undefined;

				 //var c = (region._iaCol != undefined) ? region._iaCol : region._ipCol; 

				 var c = region._iaCol;
				 if (c==undefined || c<0 || c>63) c = 63; 

				 this.c = c;

				 var a = region._iaId;
				 if (a==undefined || a<0 || a>4095) a = 0; 

				 this.a = a;

				 return this;
			 }

			 Region.prototype.import_data = function( imageData, index ) {

				 var data = imageData.data;

				 if ( data[index+3] ){

					 this.c = data[index] ; 
					 this.a = (data[index+1] << 8 ) | data[index+2]; 

				 } else {

					 this.c = 0 ; 
					 this.a = 0; 

				 }

			 };

			 Region.prototype.export_data = function( imageData, index ) {

				 // add to data    
				 imageData.data[index] = this.c; //r;
				 imageData.data[index+1] = (this.a >> 8); //g;
				 imageData.data[index+2] = (this.a & 255); //b;
				 imageData.data[index+3] = 255; //a;   

			 };

			 Region.prototype.export_minimap = function( imageData, index ) {

				 // add to minimap
				 var color = this.c * 3;
				 imageData.data[index] = palette[color]; //r;
				 imageData.data[index+1] = palette[color+1]; //g;
				 imageData.data[index+2] = palette[color+2]; //b;
				 imageData.data[index+3] = 255; //a;

			 };

			 //

			 var region_length = 0;

			 function check_regions(){

				 if (!map.size) return;

				 var len = HOMMK.elementPool.get('Region').length ;

				 if ( region_length != len ){

					 region_length = len ;

					 map.scan_HOMMK();
					 map.redraw();

				 }

			 }

			 map.init = function(){

				 var worldMap = HOMMK.worldMap.content;           

				 this.size = worldMap._size;
				 this.id = worldMap.id;

				 this.w = this.size;
				 this.h = this.size;

				 this.alliance = null;
				 this.alliance_hash = null;

				 this.canvas = document.createElement("canvas");
				 this.canvas.width= this.w;
				 this.canvas.height= this.h;

				 this.minimap = document.createElement("canvas");
				 this.minimap.width= this.w;
				 this.minimap.height= this.h;

				 this.data = document.createElement("canvas");
				 this.data.width= this.w;
				 this.data.height= this.h;     

				 this.clear();
			 }

			 map.clear  = function() {

				 clear_canvas( this.canvas );

				 this.minimap.getContext("2d").clearRect(0,0,this.w,this.h); 

				 this.data.getContext("2d").clearRect(0,0,this.w,this.h); 

			 }

			 map.scan_HOMMK = function() {

				 //this.add( HOMMK.worldMap.content.attachedRegionList );

				 this.add(
						 HOMMK.elementPool.get('Region').values().map(function(x){return x.content;}) );

			 }

			 map.add = function( regions ) {

				 var ctx_minimap = this.minimap.getContext("2d");
				 //var imageData_minimap = ctx_minimap.createImageData(this.w, this.h);
				 var imageData_minimap = ctx_minimap.getImageData(0,0,this.w, this.h);

				 var ctx_data = this.data.getContext("2d");
				 //var imageData_data = ctx_data.createImageData(this.w, this.h);
				 var imageData_data = ctx_data.getImageData(0,0,this.w, this.h);

				 var r = new Region();

				 console.log("add " + regions.length + " regions");

				 for (var k=0;k<regions.length;k++){

					 var region = regions[k];

					 r.from( region );

					 for (var i=0; i<region.aRL.length;i++){

						 // HOMMK map span from (1,1) to (280,280)
						 var pos = region.aRL[i];    
						 var x = pos[0] -1;  
						 var y = pos[1] -1;

						 var index = (x+y*this.w) * 4;

						 // add to minimap
						 r.export_minimap( imageData_minimap, index );

						 // add to data    
						 r.export_data( imageData_data, index );       

					 }
				 }

				 //ctx_minimap.globalCompositeOperation = 'source-over';
				 ctx_minimap.putImageData( imageData_minimap, 0,0 );

				 //ctx_data.globalCompositeOperation = 'source-over';
				 ctx_data.putImageData( imageData_data, 0,0 );

			 }

			 map.exporter = function() {

				 // build json header
				 var json = {};

				 json.request = "share";
				 json.player = HOMMK.player.content.name;
				 json.world = HOMMK.player.content.worldId;
				 json.world_name = HOMMK.WORLD_NAME;
				 json.version = version;

				 // export alliance top

				 json.alliance = this.alliance;

				 // export minimap 

				 json.minimap = this.minimap.toDataURL();   

				 // export data

				 json.data = this.data.toDataURL(); 

				 return json;
			 }

			 map.importer = function(json) {

				 if (!json) return;

				 var _this = this;

				 //$comment_div.html(  "uploaded on " + json.upload_date );

				 if ( json.minimap ){

					 var img_minimap = new Image();

					 img_minimap.addEventListener(
							 'load', 
							 function(){ 

							 _this.minimap.getContext("2d").drawImage( img_minimap, 0, 0 );

							 _this.redraw();

							 },                                    
							 true);

					 img_minimap.src = json.minimap;

				 }

				 if ( json.data ){

					 var img_data = new Image();

					 img_data.addEventListener(
							 'load', 
							 function(){ 

							 _this.data.getContext("2d").drawImage( img_data, 0, 0 );

							 },                                    
							 true);

					 img_data.src = json.data;

				 }

			 }

			 function hash_byId(liste){
				 var hash = {};
				 var len = liste.length;
				 for (var k=0;k<len;k++){
					 var obj = liste[k];
					 hash[obj.id]= obj;
				 }
				 return hash;
			 }

			 map.alliance_fromId = function(id) {

				 if (!this.alliance) return null;

				 if (!this.alliance_hash){
					 this.alliance_hash = hash_byId(this.alliance);
				 }

				 return this.alliance_hash[id];

			 }

			 map.region_at = function(x, y) {
				 var ctx_data = this.data.getContext("2d");
				 var imageData_data = ctx_data.getImageData(x,y, 1, 1);

				 var r = new Region();

				 r.import_data( imageData_data, 0 );
				 return r;
			 }

			 map.alliance_at = function(x, y) {

				 if (this.alliance){

					 var r = this.region_at(x, y);

					 var a = this.alliance_fromId(r.a);

					 return a;
				 }

				 return null;

			 }

			 function draw_rect( ctx, x,y,w,h ){
				 ctx.fillRect( x, y, w, 1 ); 
				 ctx.fillRect( x+w-1, y, 1, h ); 
				 ctx.fillRect( x, y+h-1, w, 1 ); 
				 ctx.fillRect( x, y, 1, h ); 
			 }

			 map.redraw = function(  ){

				 var ctx = this.canvas.getContext('2d') ;  

				 ctx.globalCompositeOperation = 'copy';
				 ctx.fillStyle = 'rgba(0,0,0, 1.0)';
				 ctx.fillRect(0,0,this.w,this.h);
				 ctx.globalCompositeOperation = 'source-over';    

				 ctx.drawImage( this.minimap, 0, 0 );

				 var regionX = HOMMK.currentView.regionX;
				 var regionY = HOMMK.currentView.regionY;
				 var viewType = HOMMK.currentView.viewType;

				 switch( viewType ){

					 case 1:
					 case 2:
						 if ( !regionX || !regionY )

							 break; 

						 //console.log( "redraw center " + coord(regionX, regionY) );

						 var s = viewType == 1 ? 35 : 13;
						 var h = Math.floor(s/2);
						 ctx.lineWidth = 1;
						 /*ctx.strokeStyle = "white";
						   ctx.strokeRect( regionX-h, regionY-h, s, s ); */
						 ctx.fillStyle = "white";
						 //ctx.fillRect( regionX-h, regionY-h, s, s ); 
						 draw_rect( ctx, regionX-h, regionY-h, s, s ); 
						 break;

				 }

			 };

			 map.export_5x = function( ) {

				 var canvas = document.createElement("canvas");
				 canvas.width=this.w*5;
				 canvas.height=this.h*5;

				 this.draw_5x( canvas.getContext('2d') ); 

				 var url = canvas.toDataURL();

				 return url;
			 }

			 map.draw_5x = function( ctx ) {

				 var imageData = this.data.getContext("2d")
					 .getImageData(0,0, this.w, this.h);

				 var r = new Region();

				 var nord = new Region();
				 var ouest = new Region();

				 ctx.save();

				 ctx.globalCompositeOperation = 'copy';
				 ctx.fillStyle = 'rgba(0,0,0, 1.0)';
				 ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height); 

				 for (var y=0;y<this.h;y++)
					 for (var x=0;x<this.w;x++) {

						 r.import_data( imageData, 4*(x+y*this.w) );

						 if (!r.a) continue;

						 ctx.save();
						 ctx.translate(x*5, y*5);
						 //ctx.translate( ((x+140)%280)*5,((y+140)%280)*5);

						 ctx.fillStyle = palette_rgba[r.c];

						 ctx.fillRect(0,0,5,5);

						 ctx.fillStyle = '#1e1e1e';

						 nord.import_data( imageData, 4*(x+((y-1+this.h)%this.h)*this.w) );
						 if (nord.a!=r.a)
							 ctx.fillRect(0,0,5,1);

						 ouest.import_data( imageData, 4*(((x-1+this.w)%this.w)+y*this.w) );
						 if (ouest.a!=r.a)
							 ctx.fillRect(0,0,1,5);

						 ctx.restore();

					 }   

				 ctx.restore();

			 };   

			 //

			 function clear_canvas( canvas ){

				 var ctx = canvas.getContext('2d');

				 ctx.globalCompositeOperation = 'copy';
				 ctx.fillStyle = 'rgba(0,0,0, 1.0)';
				 ctx.fillRect(0,0,canvas.width,canvas.height);
				 ctx.globalCompositeOperation = 'source-over';

			 }

			 //

			 var $dialog_cartographe;

			 function toggle_cartographe(){

				 // create model

				 if (!map.size) {

					 map.init();

				 }

				 // create view

				 if (!$dialog_cartographe) {

					 $dialog_cartographe = $('<div id="hommk-user-cartographe"></div>')
						 .dialog({
autoOpen: false,
zIndex: 90000,
resizable: false,
width: 304,
//show: 'slide',
position: localStorage_getObject("HOMMK_user_cartographe_position", ['left','bottom'] ),
title: 'Le Cartographe',             
dragStop: function(event, ui) { 
localStorage_setObject("HOMMK_user_cartographe_position", [ui.offset.left, ui.offset.top] );},
});

	$div_canvas = $("<div></div>")
	.width( map.canvas.width )
	.height( map.canvas.height )
.append( map.canvas )
	.appendTo( $dialog_cartographe );

	$(map.canvas).mousedown(
			function(e){ 
			var o = $(this).offset();
			var x = e.pageX - o.left;
			var y = e.pageY - o.top ;

			console.log("canvas mousedown " + coord(x, y));

			HOMMK_worldMap_center(x, y);

			});

if (!$("#hommk-user-cartographe-tooltip").length){

	$('<div id="hommk-user-cartographe-tooltip" style="background-color:green; color:yellow; position:absolute; z-index:99000; top:0px; left:0px; display:none">tooltip</div>')
		.css({ "border": "1px solid #312724", // same as HOMMK tooltip class
				"background": "none repeat scroll 0 0 #F8F9F4",
				"color": "#543629",
				})
	.appendTo($(document.body));

}

var timer_tooltip = null;

$(map.canvas).mousemove(
		function(e){ 
		var o = $(this).offset();
		var x = e.pageX - o.left;
		var y = e.pageY - o.top ;

		//console.log("canvas mousemove " + coord(x, y));

		$("#hommk-user-cartographe-tooltip").hide();
		if (timer_tooltip) { 
		clearTimeout(timer_tooltip); 
		timer_tooltip = null;
		}

		var a = map.alliance_at(x, y);

		if (a){

		var caption = (coord(x, y) +  ' - ' + a.name );

		var caption_extended = caption 
			+ ' - position ' + a.position
			+ ' - score ' + Math.floor(a.score);

		$comment_div.html( caption  );

		$("#hommk-user-cartographe-tooltip").html( caption_extended ).css( {
				'left': e.pageX+20,
				'top': e.pageY,
				});

		timer_tooltip = setTimeout( function(){
				$("#hommk-user-cartographe-tooltip").show(400);
				}, 1000);

		} else {
			$comment_div.html(  coord(x, y) );

		}
		});

$(map.canvas).mouseleave(
		function(e){ 

		$comment_div.html(  "" );

		$("#hommk-user-cartographe-tooltip").hide();
		if (timer_tooltip) { 
		clearTimeout(timer_tooltip); 
		timer_tooltip = null;
		}

		});

/*
   map.canvas.addEventListener(
   'mousedown', 
   function(e){ 

   var o = compute_offset(map.canvas);
   var x = e.pageX - o.left;
   var y = e.pageY - o.top ;

   console.log("canvas mousedown " + coord(x, y));

   HOMMK.worldMap.center(x, y);
   },
   true );
 */

// comment div

var $div = $('<div style="margin-top: 6px"></div>')
.appendTo($dialog_cartographe);

	var $partager = $('<button></button>').html(localize("CARTO_SHARE"))
	.button()     
.appendTo($div)
	.click(function() {

			$partager.button('widget').removeClass( "ui-state-focus" );    

			var t = (new Date()).getTime();

			// rescan

			map.clear();
			map.scan_HOMMK();

			var json = map.exporter();

			t = (new Date()).getTime() - t;
			console.log("export : " + t + " ms");

			$partager.button('disable');   // avoid multiple clicks

			do_request_gm(

				json,

				function(json){

				$partager.button('enable'); 

				console.log("sharing done");

				if (json.minimap) {
				localStorage_setObject('HOMMK_user_share_'+HOMMK.player.content.worldId, 
					json );

				map.importer( json );    
				}

				});

			return false;
	});

var $comment_div = $('<div style="display: inline; margin-left: 6px;"></div>')
.html(localize("CARTO_SHARE_COMMENT"))
.appendTo($div);

// request top 10 alliance when dialog open
$partager.button('disable');   

$dialog_cartographe.dialog( "option", "show", 
		{
effect: "slide", 
options: {},
speed: 400,
complete: function() {
console.log("dialog cartographe show complete");

// request top alliances
do_request(

	{"elParamList":[{"elementType":"RankingFrame",
	"elementId":HOMMK.player.elementId,
	"rankingCategory":"BY_ALLIANCE",
	"rankingType":"DOMINATION",
	"sortField":"position",
	"offset":"top"}]}

	,function(json) {

	var liste = json.d["RankingFrame"+HOMMK.player.elementId].rankingBY_ALLIANCEList ;

	console.log("add " + liste.length + " alliances");

	map.alliance = liste;

	$partager.button('enable'); 

	});

// periodic check
setInterval ( function(){

		try { check_currentView(); } catch(err) { }

		try { check_regions(); } catch(err) { }

		}, 1000 );

}});

// plot

var $div = $('<div></div>').css({"float":"right"})
.appendTo($div_canvas);

$('<a href="#" class="ui-state-default"></a>')
	.html(localize("CARTO_PLOT"))
.appendTo($div)
	.click(function() {

			var url = map.export_5x();
			GM_openInTab(url);

			// prevent the default action, e.g., following a link
			return false;
			});

// first map

map.importer( localStorage_getObject('HOMMK_user_share_'+HOMMK.player.content.worldId) );    

}

toggle_dialog( $dialog_cartographe );

}

function compute_offset(element) {
	var osl = 0;
	var ost = 0;
	var el = element;
	while (el) {
		osl += el.offsetLeft;
		ost += el.offsetTop;
		el = el.offsetParent;
	} 
	return {left:osl, top: ost};
}

var currentView = {};

function check_currentView() {

	if (!map.size) return;

	var regionX = HOMMK.currentView.regionX;
	var regionY = HOMMK.currentView.regionY;
	var viewType = HOMMK.currentView.viewType;

	if (   (currentView.regionX != regionX) 
			|| (currentView.regionY != regionY)
			|| (currentView.viewType != viewType)){

		// currentView has changed

		currentView.regionX = regionX;
		currentView.regionY = regionY;
		currentView.viewType = viewType;

		if ( regionX && regionY
				&& (viewType==1 || viewType==2)){

			//console.log( "map center " + coord(regionX, regionY) + " type=" + viewType );

			map.redraw();           

		}

	} 

}

// export for other modules :

HOMMK_user.cartographe = {

toggle: toggle_cartographe,

};

// protect from other modules
})();

// messages à traduire

extend( locale_strings_default, {
		'LINK_ABOUT':       'About',
		'LINK_EXPAND':      'click to expand',
		'LINK_MINIMIZE':    'click to minimize'

		});

extend( locale_strings_fr , {
		'LINK_ABOUT':       'A propos',
		'LINK_EXPAND':      'cliquer pour agrandir',
		'LINK_MINIMIZE':    'cliquer pour réduire'

		});

//

var $dialog_container;

function launch_container(){

	if (!$dialog_container) {

		/*
		   .ui-widget-content a {
color:#FFFFFF;
}
	//parseT...dow=4px (ligne 16)
	.ui-widget-content a {
color:#FFFFFF;
}
	//jquery-ui.css (ligne 63)
	.mainMenuButton a {
color:#7F675C;
text-decoration:none;
}
	//prod.css (ligne 1)
a:link, a:visited, a:active {
color:#5E3931;
text-decoration:none;
}
		 */

	//GM_addStyle(".ui-widget-content-hommk a:link, a:visited, a:active { color: #5E3931; text-decoration:none; }");
	GM_addStyle(".ui-widget-content-hommk a { color: #7F675C !important; }");

	var $dialog_body = $('<div></div>')
	.addClass('ui-widget-content-hommk')
	.css( 'overflow', 'hidden' )
	.css( 'color', '#50332B' )
	.css( 'font-family', 'arial,verdana,sans-serif')
	.css( 'font-size' , '12px')
	.css( 'width', '1010px' )
	.css( 'height', '680px' )
	.css( 'right', '0px' )
	.css( 'left', '0px' )
	.css( 'padding', '0px' );

	var offset = $('#Container').offset();

	$dialog_container = $('<div id="hommk-user-container"></div>')
.append($dialog_body)
	.dialog({
autoOpen: false,
zIndex: 90000,
//title: 'Container'
width:1038, height:734,
resizable: false,
closeOnEscape: false,
//position: ['right','top'],
position: [offset.left-14, offset.top-40],

open: function(event, ui){
$dialog_body.append($('#Container'));
},

close: function(event, ui){
$('body').prepend($('#Container'));   
},

});

}

toggle_dialog( $dialog_container );

}

//

var $dialog_about;

function launch_about(){

	if (!$dialog_about) {

		$dialog_about = $('<div id="hommk-user-about"></div>')
			.html(
					[
					"HOMMK user script version " + version,
					"\251 jeyries 2010"
					,'home page : <a href="http://userscripts.org/scripts/show/99124" class="ui-state-default" target="_blank">[userscript.org]</a>'
					,'forum : <a href="http://forums-mightandmagicheroeskingdoms.ubi.com/fr/read.php?51,1082341" class="ui-state-default" target="_blank">[ubi.com]</a>'
					].join("<br>")
			     )
			.dialog({
autoOpen: false,
zIndex: 90000,
//modal: true,
resizable: false,
//draggable: false,
title: localize('LINK_ABOUT')
});

	$('<div style="padding-top: 6px">Want to move the main HOMMK window ?<br><a href="#Container" class="ui-state-default">Try this ...</a></div>')
.appendTo($dialog_about)
	.find('a').click(function() {
			launch_container();
			// prevent the default action, e.g., following a link
			return false;
			});

	$('<div style="padding-top: 6px"></div>')
.append($themeswitcher)
	.appendTo($dialog_about);

	}

toggle_dialog( $dialog_about );

}

//

function get_frame(){

	var frame = null ;

	try
	{

		var displayedFrameList = HOMMK.displayedFrameList;

		if ( displayedFrameList && displayedFrameList.length>=1 ) {

			frame = displayedFrameList[0];

		}

	} catch(err) { }

	return frame;

}

function check_frames(){

	var jactari = false;
	var scribe = false;

	var frame = get_frame();

	if ( frame ) {                   

		switch ( frame.elementType  ) {

			case "HeroFrame":
				case "ZoneBuildingPortalUpgradeFrame":
				case "BattlePrepFrame":
				jactari = true ;
			break;

			case "MessageBoxFrame":
				scribe = HOMMK_user.scribe.check() ;
			break;

		}

	}

	$('#hommk-user-jactari-button').button( jactari ? 'enable' : 'disable' );
	$('#hommk-user-jactari-button-defender').button( jactari ? 'enable' : 'disable' );
	$('#hommk-user-scribe-button').button( scribe ? 'enable' : 'disable' );

}

//

function init() { 

	// clear storage after version update
	if ( localStorage.getItem("HOMMK_user_version") != version ){
		localStorage.clear();
		localStorage.setItem("HOMMK_user_version", version );
	}

	if (DEBUG) console.log(localStorage);

	// panel

	var $dialog_panel = $('<div id="hommk-user-panel"></div>')
		.css( 'overflow', 'hidden' )
		.dialog({
autoOpen: false,
zIndex: 90000,
resizable: false,
//draggable: false,
stack: false,
width: 180,
minHeight: 0,
show: 'slide',
position: ['left','top'],
closeOnEscape: false,
title: 'HOMMK user script'
});

// header

$dialog_panel.html(  "Version " + version + " " );

// about

$('<a href="#About" class="ui-state-default" style="white-space:nowrap;"></a>')
	.html(localize("LINK_ABOUT")+"<br>")
	.appendTo($dialog_panel)
	.click(function() {
			launch_about();
			// prevent the default action, e.g., following a link
			return false;
			});

// panel extended

var $expander = $('<a href="#" class="ui-state-default"></a>')
.appendTo($dialog_panel);

var $panel_extended= $('<div id="hommk-user-panel-extended" style="display:none; padding-top: 10px"></div>')
.appendTo($dialog_panel);    

var is_minimized = localStorage_getObject("HOMMK_user_minimized", true);

if ( is_minimized ){
	$expander.html(localize("LINK_EXPAND"));
	$panel_extended.hide();
} else {
	$expander.html(localize("LINK_MINIMIZE"));
	$panel_extended.show();
}

$expander.click(function() {

		if ( is_minimized ){

		$panel_extended.show( 400, function() {
			// Animation complete.
			$expander.html(localize("LINK_MINIMIZE"));
			is_minimized = false;
			localStorage_setObject("HOMMK_user_minimized", is_minimized );
			});

		} else {

		$panel_extended.hide( 400, function() {
			// Animation complete.
			$expander.html(localize("LINK_EXPAND"));
			is_minimized = true;
			localStorage_setObject("HOMMK_user_minimized", is_minimized );
			});

		}

		// prevent the default action, e.g., following a link
		return false;
}); 

// Jactari button

	$('<button id="hommk-user-jactari-button" style="width:120;margin-top:0px; display:block;">Simulate - Attacker</button>')
	.button({disabled:true})
.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			HOMMK_user.jactari.launch(0);
			return false;
			});

	$('<button id="hommk-user-jactari-button-defender" style="width:120;margin-top:0px; display:block;">Simulate - Defender</button>')
	.button({disabled:true})
.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			HOMMK_user.jactari.launch(1);
			return false;
			});

// Le Scribe

	$('<button id="hommk-user-scribe-button" style="width:120;margin-top:5px; display:block;">Spy Formatter</button>')
	.button({disabled:true})
.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			HOMMK_user.scribe.toggle();
			return false;
			});

// La Vigie

	$('<button style="width:120;margin-top:5px; display:block;">Army Movements</button>')
	.button()
.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			HOMMK_user.vigie.toggle();
			return false;
			});

// Le Cartographe

	$('<button style="width:120;margin-top:5px; display:block;">Game World Map</button>')
	.button()
.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			HOMMK_user.cartographe.toggle();
			//setTimeout(function() {HOMMK_user.cartographe.toggle();},0); // avoid Greasemonkey access violation
			return false;
			});

// Coordinate Jump

$('<input type="text" id="coordinates" size=7 style="width:120;margin-top:5px; display:block;" value=xxx,yyy />')
.appendTo($panel_extended);

	$('<button style="margin-top:5px; display:block;">Jump to</button>')
	.button()
.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			jumpto();
			//setTimeout(function() {HOMMK_user.cartographe.toggle();},0); // avoid Greasemonkey access violation
			return false;
			});

function nickmit_test() {
	return true;
	var k;
	var kk;
	var s;
	var src = HOMMK;
//	var src = HOMMK.Region;
//	var src = HOMMK.getRegionFromXY(242,174);
        
	console.log(" member lists:");
	console.log("=======================================");
	for (k in src) {
		if (src.hasOwnProperty(k)) {
			for (kk in k) {
				if (k.hasOwnProperty(kk)) {
//					if (/resource/i.exec(kk))
					s = k+"  .  "+kk;
					if (/resource/i.exec(s))
						console.log(k+"  .  "+kk);
				}
			}
		}
	}
	console.log("=======================================");
	return true;
}

// NICKMIT
	$('<button style="margin-top:5px; display:block;">TEST</button>')
	.button()
	.appendTo($panel_extended)
	.click(function() {
			$(this).button('widget').removeClass( "ui-state-focus" );
			nickmit_test();
			//setTimeout(function() {HOMMK_user.cartographe.toggle();},0); // avoid Greasemonkey access violation
			return false;
			});

// info

$('<div id="hommk-user-info" style="margin-top:10px"></div>').appendTo($panel_extended);

// extra

$('<div id="hommk-user-extra" style="margin-top:10px"></div>').appendTo($panel_extended);

// periodic check

setInterval ( function(){

		try { check_frames(); } catch(err) { }

		}, 1000 );

// hello to the server for statistics & check for update
$dialog_panel.dialog( "option", "show", 
		{
effect: "slide", 
options: {},
speed: 400});

// startup panel animation
$dialog_panel.dialog('open');

console.log("init done");
};

//

// printed when script is OK

console.log("HOMMK user script loaded");

// protect from other scripts
})();


