// ==UserScript==
// @name			betterFacebook
// @namespace		http://userscripts.org/scripts/show/24984
// @include			http://*facebook.com*
// @require			http://code.jquery.com/jquery-latest.pack.js
// @require			http://fb.redphx.com/wysiwyg/jquery.wysiwyg.js
// @version			0.1
// ==/UserScript==



var Script = {
	version : 0.1,
	versionURL : 'http://fb.redphx.com/version.txt',
	checkForUpdate : function() {
		var date = new Date();
		var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
		var lastCheck = GM.getValue('lastCheck');

		if (!lastCheck || lastCheck != today) {
			GM_xmlhttpRequest({
		    	method: "GET",
		    	url: Script.versionURL,
		    	onload: function(results) {
					version = results.responseText;
					if (version.length && /^\S+$/.test(version) && version != Script.version) {
						if (confirm('[ Greasemonkey ] betterFacebook đã có phiên bản '+ version +', bạn có muốn cập nhật không ?')) {
							GM_openInTab('http://fb.redphx.com/bf.php');
						}
					}
				},
			});
			
			GM.setValue('lastCheck',today);
		}
	},
	editorCSS : 'div.wysiwyg{border:1px solid #ccc;padding:5px;background-color:#fff}div.wysiwyg *{margin:0;padding:0}div.wysiwyg ul.panel{border-bottom:1px solid #ccc;float:left;width:100%;padding:0 0 4px 0}div.wysiwyg ul.panel li{list-style-type:none;float:left;margin:0 2px; background:#fff}div.wysiwyg ul.panel li.separator{height:16px;margin:0 4px;border-left:1px solid #ccc}div.wysiwyg ul.panel li a{opacity:0.6;display:block;width:16px;height:16px;background:url("http://redphx.com/fb/wysiwyg/jquery.wysiwyg.gif") no-repeat -64px -80px;border:0;cursor:pointer;margin:1px}div.wysiwyg ul.panel li a:hover,div.wysiwyg ul.panel li a.active{opacity:1}div.wysiwyg ul.panel li a.active{background-color:#f9f9f9;border:1px solid #ccc;border-left-color:#aaa;border-top-color:#aaa;margin:0}div.wysiwyg ul.panel li a.bold{background-position:0 -16px}div.wysiwyg ul.panel li a.italic{background-position:-16px -16px}div.wysiwyg ul.panel li a.strikeThrough{background-position:-32px -16px}div.wysiwyg ul.panel li a.underline{background-position:-48px -16px}div.wysiwyg ul.panel li a.justifyLeft{background-position:0 0}div.wysiwyg ul.panel li a.justifyCenter{background-position:-16px 0}div.wysiwyg ul.panel li a.justifyRight{background-position:-32px 0}div.wysiwyg ul.panel li a.justifyFull{background-position:-48px 0}div.wysiwyg ul.panel li a.indent{background-position:-64px 0}div.wysiwyg ul.panel li a.outdent{background-position:-80px 0}div.wysiwyg ul.panel li a.subscript{background-position:-64px -16px}div.wysiwyg ul.panel li a.superscript{background-position:-80px -16px}div.wysiwyg ul.panel li a.undo{background-position:0 -64px}div.wysiwyg ul.panel li a.redo{background-position:-16px -64px}div.wysiwyg ul.panel li a.insertOrderedList{background-position:-32px -48px}div.wysiwyg ul.panel li a.insertUnorderedList{background-position:-16px -48px}div.wysiwyg ul.panel li a.insertHorizontalRule{background-position:0 -48px}div.wysiwyg ul.panel li a.h1{background-position:0 -32px}div.wysiwyg ul.panel li a.h2{background-position:-16px -32px}div.wysiwyg ul.panel li a.h3{background-position:-32px -32px}div.wysiwyg ul.panel li a.h4{background-position:-48px -32px}div.wysiwyg ul.panel li a.h5{background-position:-64px -32px}div.wysiwyg ul.panel li a.h6{background-position:-80px -32px}div.wysiwyg ul.panel li a.cut{background-position:-32px -64px}div.wysiwyg ul.panel li a.copy{background-position:-48px -64px}div.wysiwyg ul.panel li a.paste{background-position:-64px -64px}div.wysiwyg ul.panel li a.increaseFontSize{background-position:-16px -80px}div.wysiwyg ul.panel li a.decreaseFontSize{background-position:-32px -80px}div.wysiwyg ul.panel li a.createLink{background-position:-80px -48px}div.wysiwyg ul.panel li a.insertImage{background-position:-80px -80px}div.wysiwyg ul.panel li a.html{background-position:-48px -48px}div.wysiwyg ul.panel li a.removeFormat{background-position:-80px -64px}div.wysiwyg ul.panel li a.empty{background-position:-64px -80px}div.wysiwyg iframe{border:0;margin:5px 0 0 0;clear:left}div.wysiwyg textarea{margin:5px 0 0 0 !important;clear:left}',
	//editorFrameCSS : 'h1,h2,h3,h4,h5,h6{clear:both;color:#333;font-weight:bold;margin:0}h1{color:#111;font-size:13px}h2{font-size:13px}h3,h4{font-size:11px}h5,h6{color:#666;font-size:11px}div{clear:none;line-height:14px;padding:0 0 10px 0}div div{border:0;padding:0}p{margin-top:0}blockquote{border-left:5px solid #ddd;color:#333;margin:0;padding:0 15px}ul{padding:0 10px 0 20px;list-style-type:square}ol{padding:0 10px 0 20px}img{display:block;margin:0 0 10px 0}pre{}pre br{display:none}code{color:#666}samp{font-family:monaco,"andale mono",courier,monospace;font-size:10px}i,em{font-family:"lucida sans","lucida grande",tahoma,verdana,arial,sans-serif}tt{font-family:courier,monospace;font-size:10px}',
};

var GM = {
	
	getValue : function(key) {
		return GM_getValue(key);
	},
	
	setValue : function(key, value) {
		GM_setValue(key, value);
	},
	
	addStyle : function(styles) {
		if (styles.constructor == String) {
			GM_addStyle(styles);
		}
		else {
			GM_addStyle(styles.join("\r\n"));
		}
	}
};


var FB = {
	currPage : null,
	lastPage : null,
	
	init : function() {
		if (self != top) { return; }
		FB.processPage();
		FB.startListerning();
	},
	
	startListerning : function() {
		if ($('#content').length) {
			$('#content')[0].addEventListener('DOMNodeInserted', FB.processPage, false);
		}
	},
	
	stopListerning : function() {
		$('#content')[0].removeEventListener('DOMNodeInserted', FB.processPage, false);
	},
	
	processPage : function() {
		var loc = window.location;
		var page;

		// check hash
		if (loc.hash && loc.hash.match(/^#\/[^\.]+\.php/)) {
			page = loc.hash.replace('#','');
		}
		else {
			page = loc.pathname;
		}
		
		if (page.indexOf('editnote.php') != -1) {
			if ($('#note_content:visible').length && !$('div.wysiwyg').length) {
				GM.addStyle(Script.editorCSS);
				
				$('#note_content:visible').wysiwyg();
				
				$('#note_contentIFrame').after($('#note_content'));
				
			}
		}
	},
	
};


Script.checkForUpdate();
FB.init();