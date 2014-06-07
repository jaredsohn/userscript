// ==UserScript==
// @name        Kaskus CodeMirror
// @namespace   kaskus-code-mirror
// @description Colorify text code in kaskus using CodeMirror
// @include     http://www.kaskus.co.id/thread/*
// @include     http://www.kaskus.co.id/post/*
// @include     http://www.kaskus.co.id/show_post/*
// @include     http://www.kaskus.co.id/edit_post/*
// @require     http://codemirror.net/lib/codemirror.js
// @require     http://codemirror.net/mode/xml/xml.js
// @require     http://codemirror.net/mode/javascript/javascript.js
// @require     http://codemirror.net/mode/clike/clike.js
// @require     http://codemirror.net/mode/php/php.js
// @require     http://codemirror.net/mode/python/python.js
// @require     http://codemirror.net/mode/sql/sql.js
// @require     http://codemirror.net/mode/css/css.js
// @require     http://codemirror.net/mode/sass/sass.js
// @require     http://codemirror.net/mode/markdown/markdown.js
// @require     http://codemirror.net/mode/pascal/pascal.js
// @version     0.1
// ==/UserScript==
(function(){

function main(mothership){
// Initialize Global Variables
window.gvar = function(){};

// gvar.scriptMeta.scriptID
gvar.sversion = 'v' + '0.1';
gvar.scriptMeta = {
	 timestamp: 1357955908721 // version.timestamp

	,scriptID: 156308 // script-Id
};
/*
window.alert(new Date().getTime());
*/
//=-=-=-=--=
//========-=-=-=-=--=========
gvar.__DEBUG__ = 0; // development debug
gvar.$w = window;


var GM_addGlobalScript = function (a, b, c) {
	var d = createEl("script", { type: "text/javascript"});
	if (isDefined(b) && isString(b)) d.setAttribute("id", b);
	if (a.match(/^https?:\/\/.+/)) d.setAttribute("src", a);
	else d.appendChild(createTextEl(a));
	if (isDefined(c) && c) {
		document.body.insertBefore(d, document.body.firstChild)
	} else {
		var e = document.getElementsByTagName("head");
		if (isDefined(e[0]) && e[0].nodeName == "HEAD") gvar.$w.setTimeout(function () {
			e[0].appendChild(d)
		}, 100);
		else document.body.insertBefore(d, document.body.firstChild)
	}
	return d
};
var GM_addGlobalStyle = function (a, b, c) {
	var d, e;
	if (a.match(/^https?:\/\/.+/)) {
		d = createEl("link", { type: "text/css", rel:'stylesheet', href:a });
	}else{
		d = createEl("style", { type: "text/css" });
		d.appendChild(createTextEl(a));
	}
	if (isDefined(b) && isString(b)) d.setAttribute("id", b);
	if (isDefined(c) && c) {
		document.body.insertBefore(d, document.body.firstChild)
	} else {
		e = document.getElementsByTagName("head");
		if (isDefined(e[0]) && e[0].nodeName == "HEAD") gvar.$w.setTimeout(function () {
			e[0].appendChild(d)
		}, 100);
		else document.body.insertBefore(d, document.body.firstChild)
	}
	return d
};

//=== mini-functions
// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };

function createTextEl(a) {
	return document.createTextNode(a)
}
function createEl(a, b, c) {
	var d = document.createElement(a);
	for (var e in b) if (b.hasOwnProperty(e)) d.setAttribute(e, b[e]);
	if (c) d.innerHTML = c;
	return d
}

// play safe with Opera, it really suck so need this emulator of GM
//=== BROWSER DETECTION / ADVANCED SETTING
//=============snipet-authored-by:GI-Joe==//
function ApiBrowserCheck() {
	//delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
	if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
	if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
	
	var needApiUpgrade=false;
	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; clog('Opera detected...',0);
	}
	if(typeof(GM_setValue)!='undefined') {
		var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.staticArgs.FF4.0'; }
		if(gsv.indexOf('staticArgs')>0) {
			gvar.isGreaseMonkey=true; gvar.isFF4=false;
			clog('GreaseMonkey Api detected'+( (gvar.isFF4=gsv.indexOf('FF4.0')>0) ?' >= FF4':'' )+'...',0); 
		} // test GM_hitch
		else if(gsv.match(/not\s+supported/)) {
			needApiUpgrade=true; gvar.isBuggedChrome=true; clog('Bugged Chrome GM Api detected...',0);
		}
	} else { needApiUpgrade=true; clog('No GM Api detected...',0); }
	
	gvar.noCrossDomain = (gvar.isOpera || gvar.isBuggedChrome);
	if(needApiUpgrade) {
		//gvar.noCrossDomain = gvar.isBuggedChrome = 1;
		clog('Try to recreate needed GM Api...',0);
		//OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
		var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
		if(ws=='object') {
			clog('Using localStorage for GM Api.',0);
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; };
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } };
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); };
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			clog('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } };
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } };
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); }; }
		if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
			clog('Using XMLHttpRequest for GM Api.',0);
			GM_xmlhttpRequest=function(obj) {
			var request=new XMLHttpRequest();
			request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
			request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
			try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
			if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
			request.send(obj.data); return request;
		}; }
	} // end needApiUpgrade
	GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); };
}

// ----my ge-debug--------
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}
function clog(msg) {
  if(!gvar.__DEBUG__) return;
  show_alert(msg);
}


function start_Main(){
	clog('Codemirror @ start_Main');

	// --CSS
	GM_addGlobalStyle('http://codemirror.net/lib/codemirror.css');
	GM_addGlobalStyle(''
		+'.CodeMirror {height: auto!important; line-height:1.4;}'
	,'additional-css', 1);

	var mapMode={}, CMset = {};
	


	// normalize, clean all style in that contents; [code] & [html] & [php] only
	$('.entry pre, .entry > div[style*="640px"]').each(function(idx){
		var $me, $child, cmid, innertext;
		$me = $(this);
		cmid = 'cm_' + (new Date()).getTime()+'_'+idx;

		if(this.nodeName == 'PRE'){ // [CODE]
			innertext = String($me.html()).replace(/<br\s*\/?>/gi, '');
		}
		else{
			innertext = String($me.html()).replace(/<br\s*\/?>/gi, '\n');
			innertext = innertext.replace(/<[^>]+./gi, '');
			clog('innertext=' + innertext)
			$me.css('width', '98%');
		}
		innertext = innertext.replace(/^[\s\n]+|[\s\n]+$/g, '');
		$unescaped = $('<div/>').html(innertext).text();

		$me.addClass('code').attr('data-cmid', cmid);

		if( !$me.find('>code:first').length ){
			var $hid_wraper = $('<code />').html($me.html());
			$me.html($hid_wraper);
		}
		$me.find('>code:first').hide();

		// nav
		var suggest_lang, cucok, $nav, $el = $me.prev();
		
		suggest_lang = 'php';
		if( $el.text().match(/^HTML\b/) ){
			suggest_lang = 'htmlmixed';
		}

		mapMode = {
			'php': 'application/x-httpd-php',
			'htmlmixed': 'text/html',
			'xml': 'application/xml',
			'javascript': 'javascript',
			'python': 'text/x-python',
			'c-like': 'text/x-csrc',
			'css': 'css',
			'sass': 'sass',
			'markdown': 'text/x-markdown',
			'pascal': 'text/x-pascal',
			'sql': 'text/x-mysql',
		};
		$nav = $('<span id="KSA-'+cmid+'" style="float:right; display:inline-block; width:100px!important;"></span>')
			.html(''
			+'<select data-cmid="'+cmid+'" style="width:100px!important;height:20px; padding:0;line-height: 14px;">'
			+'<option value="php">PHP</option>'
			+'<option value="htmlmixed">HTML</option>'
			+'<option value="xml">XML</option>'
			+'<option value="javascript">Javascript</option>'
			+'<option value="python">Python</option>'
			+'<option value="c-like">C-Like</option>'
			+'<option value="css">css</option>'
			+'<option value="sass">Sass</option>'
			+'<option value="markdown">Markdown</option>'
			+'<option value="pascal">Pascal</option>'
			+'<option value="sql">SQL</option>'
			+'</select>'
		)
		$el.append($nav);
		if( suggest_lang!='php' )
			$el.find('option[value="'+suggest_lang+'"]').attr('selected', 'selected');
		$el.find('select').change(function(){
			var selected_value, _cmid = $(this).data('cmid');
			selected_value = $(this).val();
			if(_cmid && CMset[_cmid] && mapMode.hasOwnProperty(selected_value) ){
				CMset[_cmid].setOption('mode', mapMode[selected_value]);
			}
		});

		// codeMirror
		CMset[cmid] = new CodeMirror(this, {
			value: $unescaped,
			mode: (mapMode[suggest_lang] ? mapMode[suggest_lang] : 'application/x-httpd-php'),
			lineNumbers: false,
			readOnly: true
		});
		$me.find('.cm-s-default').attr('id', 'KSA-'+cmid+'_wrap');
	});

	$('.spoiler input#bbcode_spoiler').click(function(){
		var $par = $(this).closest('.spoiler');
		if( $(this).val().indexOf('Hide') != -1){
			$par.find('.code').each(function(){
				var cmid, $cm = $(this);
				if(!$cm.length)
					return;
				cmid = $cm.data('cmid');
				cmid && ("undefined" != typeof CMset[cmid]) && CMset[cmid].refresh();
			})
		}
		
	})
}

// ----- INIT-|
function init(){

	gvar.injected = false;
	gvar.mx = 30; gvar.ix = 0;
	
	if('undefined' == typeof mothership){
		gvar.noCrossDomain = gvar.isBuggedChrome = 1;
		clog('doing jQ_wait2')
		jQ_wait2();	
	}else{
		/* default mostly for FF */
		clog('doing jQ_wait')
		jQ_wait();
	}
}

function jQ_wait2(){
	if( jQuery == "undefined" && gvar.ix < gvar.mx ){
		window.setTimeout(function () { jQ_wait2() }, 200);
		gvar.injected = true;
		gvar.ix++;
	}else{
		if( "undefined" == typeof jQuery ) {
			clog('jQuery load fail'); return;
		}
		$ = jQuery = jQuery.noConflict(true);
		gvar.ix = 0;
		
		window.setTimeout(function () { start_Main() }, 200);
	}
}
function jQ_wait() {
	if ( (unsafeWindow && typeof unsafeWindow.jQuery == "undefined") && gvar.ix < gvar.mx) {
		window.setTimeout(function () { jQ_wait() }, 200);
		if( !gvar.injected ){
			GM_addGlobalScript(location.protocol + "\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.7.1\/jquery.min.js");
			gvar.injected = true;
		}
		gvar.ix++;
	} else {
		if ("undefined" == typeof unsafeWindow.jQuery) {
			clog('jQuery load fail'); return;
		}
		$ = unsafeWindow.$ = unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict(true);
		gvar.ix = 0;
		
		window.setTimeout(function () { start_Main() }, 200);
	}
}


if('undefined' == typeof mothership)
	var $;
init();
}
// main



var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.errGSV'; }
if( 'undefined' == typeof chrome && 'undefined' == typeof ENV && 'undefined' == typeof GM_setValue || gsv.match(/not\s+supported/i) )
	addJQuery( main );
else if( 'undefined' != typeof chrome && 'undefined' != typeof ENV )
	main('tamper');
else if( 'undefined' != typeof GM_setValue )
	main('GM');


})();