// ==UserScript==
// @name           Kaskus Quick Reply New
// @icon           http://code.google.com/p/dev-kaskus-quick-reply/logo?cct=110309324
// @namespace      http://userscripts.org/scripts/show/KaskusQuickReplyNew
// @include        *.kaskus.co.id/thread/*
// @include        *.kaskus.co.id/post/*
// @include        *.kaskus.co.id/group/discussion/*
// @include        *.kaskus.co.id/show_post/*
// @description    KQR
// @version        4.0.5
// @dtversion      120531405
// @timestamp      1338413166295
// @description    provide a quick reply feature, under circumstances capcay required.
// @author         idx(302101; http://userscripts.org/users/idx); bimatampan(founder);
// @license        (CC) by-nc-sa 3.0
// @contributor    s4nji, riza_kasela, p1nky, b3g0, fazar, bagosbanget, eric., bedjho, Piluze, intruder.master, Rh354, gr0, hermawan64, slifer2006, gzt, Duljondul, reongkacun, otnaibef, ketang8keting, farin, drupalorg, .Shana, t0g3, & all-kaskuser@t=3170414
// @include        http://imageshack.us/*
// @include        http://*.imageshack.us/*
// @include        http://imgur.com/*
// @include        http://photoserver.ws/*
// @include        http://lulzimg.com/*
//
// -!--latestupdate
//
// v4.0.5b - 2012-05-31 . 1338413166295
//  include show_post (code fixer purpose only)
//  Fix parse inside spoiler Lv.4; adapting [webkit|opera]
//  false-positive entity decode Lv.3; Fix parse inside spoiler
//
//
// -/!latestupdate---
// ==/UserScript==
//
// v4.0.4b - 2012-05-30 . 1338330088458
//  Fix autoload smiley
//  Fix selected tab smiley content
//  Fix custom smiley BBCODE
//  false-positive entity decode Lv.2
//
// v4.0.3b - 2012-05-27 . 1338155933804
//  rolled to decompresed-mode
//  include domain .co.id
//  deprecate imagedum service
//  false-positive entity decode
//  Fix failed get news latestupdate, (for next check)
//  Improve auto-cut title post upto 80 chars
//  Fix qparse html|php|code, align
//  Fixer fonts/newline for pre ([code] tags)
//  Fix fail encoding for autotext custom-smiley
//  Fix custom smiley autotext (incomplete)
//
//
// v0.1 - 2010-06-29
//	 Init
// --
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms
// --------------------------------------------------------
(function () {

function main(mothership){
// Initialize Global Variables
var gvar=function(){}, isQR_PLUS = 0; // purpose for QR+ pack, disable stated as = 0;

// gvar.scriptMeta.scriptID
gvar.sversion = 'v' + '4.0.5b';
gvar.scriptMeta = {
	timestamp: 1338413166295 // version.timestamp
	//timestamp: 999 // version.timestamp for test update
	
	,dtversion: 120531405 // version.date
	
	,titlename: 'Quick Reply' + ( isQR_PLUS !== 0 ? '+' : '' )
	,scriptID: 80409 // script-Id
	,cssREV: 120529404 // css revision date; only change this when you change your external css
}; gvar.scriptMeta.fullname = 'Kaskus ' + gvar.scriptMeta.titlename;
/*
window.alert(new Date().getTime());
*/
//=-=-=-=--=
//========-=-=-=-=--=========
gvar.__DEBUG__ = 0; // development debug
gvar.$w = window;
//========-=-=-=-=--=========
//=-=-=-=--=

// predefined registered key_save
var OPTIONS_BOX = {
  KEY_SAVE_SAVED_AVATAR:  ['']
 //,KEY_SAVE_LAST_SPTITLE:  ['title'] // last used spoiler-title
 ,KEY_SAVE_LAST_UPLOADER: [''] // last used host-uploader
 
 ,KEY_SAVE_UPDATES:          ['1'] // check update
 ,KEY_SAVE_UPDATES_INTERVAL: ['1'] // update interval, default: 1 day
 ,KEY_SAVE_HIDE_AVATAR:      ['1'] // hide avatar
 ,KEY_SAVE_MIN_ANIMATE:      ['0'] // minify jQuery animate
 //,KEY_SAVE_QUICK_QUOTE:      ['1'] // quick quote
 //,KEY_SAVE_DYNAMIC_QR:       ['1'] // dynamic QR
 //,KEY_SAVE_AJAXPOST:         ['1'] // ajaxPost
 ,KEY_SAVE_QR_DRAFT:         ['1'] // activate qr-draft
 //,KEY_SAVE_HIDE_CONTROLLER:  ['0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0'] // serial hide [controller]
 ,KEY_SAVE_CUSTOM_SMILEY:    [''] // custom smiley, value might be very large; limit is still unknown 
 ,KEY_SAVE_QR_HOTKEY_KEY:    ['1,0,0'] // QR hotkey, Ctrl,Shift,Alt
 ,KEY_SAVE_QR_HOTKEY_CHAR:   ['Q'] // QR hotkey, [A-Z]
 
 //,KEY_SAVE_TXTCOUNTER:       ['1'] // text counter flag
 //,KEY_SAVE_COUNTDOWN:        ['1'] // counter down flag
 //,KEY_SAVE_COUNTDOWN_POS:    ['1,0'] // counter down actpos [qrform, tab]

 //,KEY_SAVE_TEXTA_EXPANDER:   ['1'] // [flag,minHeight,maxHeight] of textarea_expander
 ,KEY_SAVE_SHOW_SMILE:       ['0,kecil']   // [flag,type] of autoshow_smiley
 ,KEY_SAVE_LAYOUT_CONFIG:    [''] // flag of template_on
 //,KEY_SAVE_LAYOUT_SIGI:      [''] // signature layout, eg. [RIGHT]&#8212;[SIZE=1][b]QR[/b][/SIZE]&#8482;[/RIGHT]
 ,KEY_SAVE_LAYOUT_TPL:       [''] // template layout, must contain: "{message}". eg. [B]{message}[/B]
 
 //,KEY_SAVE_SCUSTOM_ALT:      ['0'] // use alt instead of thumbnail
 ,KEY_SAVE_SCUSTOM_NOPARSE:  ['0'] // dont parse custom smiley tag. eg. tag=babegenit. BBCODE=[[babegenit]
 
 //,KEY_SAVE_QR_USE_RECAPCAY:  ['1'] // state of capcay mode
 //,KEY_SAVE_QR_RECAPCAY_PROP: ['clean,0'] // recapcay theme, is_simple_mode
 
 //,KEY_SAVE_PRELOAD_RATE: ['0'] // whether donatur need to preload rate or not
 //,KEY_SAVE_QR_COLLAPSE:  ['1'] // initial state of qr
 //,KEY_SAVE_WIDE_THREAD:  ['1'] // initial state of thread, wider by Kaskus Fixups - chaox
 ,KEY_SAVE_TMP_TEXT:     [''] // temporary text before destroy maincontainer 
 ,KEY_SAVE_QR_LastUpdate:['0'] // lastupdate timestamp
 ,KEY_SAVE_QR_LASTPOST:  ['0'] // lastpost timestamp
 
 ,KEY_SAVE_UPLOAD_LOG:  [''] // history upload (kaskus)
 ,KEY_SAVE_FORUMS_BULK:  [''] // bulk of all-forums
 ,KEY_SAVE_EXC_PLACES:  [''] // excluced places for autolayout
 ,KEY_SAVE_INC_PLACES:  [''] // excluced places for autolayout
 ,KEY_SAVE_ALL_PLACES:  [''] // flag for all places for autolayout
 ,KEY_SAVE_CSS_BULK:  [''] // bulk of ext css
 ,KEY_SAVE_CSS_META:  [''] // meta of css [filename;lastupdate]
}, KS				= 'KEY_SAVE_'
, GMSTORAGE_PATH	= 'GM_'
;



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

// Native Get Elements
var $D=function (q, root, single) {
	if (root && typeof root == 'string') {
		root = $D(root, null, true);
		if (!root) { return null; }
	}
	if( !q )
		return false;
	if ( typeof q == 'object')
		return q;
	root = root || document;
	if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) {
			return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	} else if (q[0]=='.') {
		return root.getElementsByClassName(q.substr(1));
	} else {
		return root.getElementById( q[0]=='#' ? q.substr(1) : q.substr(0) );
	}
};
// native add - remove element
var Dom = {
	g: function(el) {
		if(!el) return false;
		return ( isString(el) ? document.getElementById(el) : el );
	},
	add: function(el, dest) {    
		var el = this.g(el);
		var dest = this.g(dest);
		if(el && dest) dest.appendChild(el);
	},
	remove: function(el) {
		var el = this.g(el);
		if(el && el.parentNode)
		el.parentNode.removeChild(el);
	},
	Ev: function() {
		if (window.addEventListener) {
			return function(el, type, fn, ph) {
				if(typeof(el)=='object')
				this.g(el).addEventListener(type, function(e){fn(e);}, (isUndefined(ph) ? false : ph));
			};      
		}else if (window.attachEvent) {
			return function(el, type, fn) {
				var f = function() { fn.call(this.g(el), window.event); };
				this.g(el).attachEvent('on' + type, f);
			};
		}
	}()
};


//=== reSRC
var rSRC = {
	mCls: ['markItUpButton','markItUpDropMenu','<li class="markItUpSeparator">---------------</li>'],
	menuFont: function(id){
		var li_cls = rSRC.mCls, item = ['Arial','Arial Black','Arial Narrow','Book Antiqua','Century Gothic','Comic Sans MS','Courier New','Georgia','Impact','Lucida Console','Times New Roman','Trebucher','Verdana'], buff, lf=item.length;
		buff='<li class="'+li_cls[0]+' '+li_cls[0] + id + ' fonts '+li_cls[1]+'"><a title="Fonts" href="">Fonts</a><ul>';
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] + id +'-'+(i+1)+' font-'+item[i].toLowerCase()+'"><a title="'+item[i]+'" class="ev_font" href="">'+item[i]+'</a></li>';
		buff+='</ul></li>';
		return buff;
	},
	menuSize: function(id){
		var li_cls = rSRC.mCls, buff;
		buff='<li class="'+li_cls[0]+' '+li_cls[0] + id + ' size '+li_cls[1]+'"><a title="Size" href="">Size</a><ul>';
		for(var i=1; i<=7; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] + id + '-1 size-'+i+'"><a title="'+i+'" class="ev_size" href="">'+i+'</a></li>';
		buff+='</ul></li>';
		return buff;
	},
	menuColor: function(id){
		var li_cls = rSRC.mCls, buff, capt, kolors = rSRC.getSetOf('color');
		buff='<li class="'+li_cls[0] + ' ' + li_cls[0] + id + ' ' + li_cls[1]+'"><a title="Colors" href="">Colors</a>';		
		buff+='<ul class="markItUpButton'+id+'-wrapper">';
		for(hex in kolors){
			capt = kolors[hex];
			buff+='<li class="'+li_cls[0] +'"><a title="'+capt+'" class="ev_color"  style="width:0; background-color:'+hex+'" href="">'+capt+'</a></li>';
		}
		buff+='</ul></li>';
		return buff;
	},
	menuBIU: function(start){
		var li_cls = rSRC.mCls, item = ['Bold','Italic','Underline'], buff='', lf=item.length;
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(i+start)+'"><a title="'+item[i]+'" class="ev_biu" href="">'+item[i]+'</a></li>';
		return buff;
	},
	menuAlign: function(start){
		var li_cls = rSRC.mCls, item = ['Align Left','Align Center','Align Right'], buff='', lf=item.length;
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(start+i)+'"><a title="'+item[i]+'" class="ev_align" href="">'+item[i]+'</a></li>';
		return buff;
	},
	menuList: function(ids){
		var li_cls = rSRC.mCls, item = ['Numeric list','Bulleted list'], buff='', lf=item.length;
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="'+item[i]+'" class="ev_list"  href="">'+item[i]+'</a></li>';
		return buff;
	},
	menuMedia: function(ids){
		var bbcode, li_cls = rSRC.mCls, item = ['Insert Link','Insert Picture','Embedding Youtube'], buff='', lf=item.length;
		bbcode = ['link','picture','youtube'];
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="'+item[i]+'" class="ev_media" data-bbcode="'+bbcode[i]+'" href="">'+item[i]+'</a></li>';
		return buff;
	},
	menuCode: function(ids){
		var bbcode, li_cls = rSRC.mCls, item = ['CODE','HTML','PHP'], buff='', lf=item.length;
		bbcode = ['code','html','php'];
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="Wrap ['+item[i]+'] around text" class="ev_codes" data-bbcode="'+bbcode[i]+'" href="">Wrap ['+item[i]+'] around text</a></li>';
		return buff;
	},
	menuQuote: function(ids){
		var bbcode, li_cls = rSRC.mCls, item = ['QUOTE','SPOILER','TRANSPARENT','NOPARSE'], buff='', lf=item.length;
		bbcode = ['quote','spoiler','transparent','noparse'];
		for(var i=0; i<lf; i++)
			buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="Wrap ['+item[i]+'] around text" class="ev_quotes" data-bbcode="'+bbcode[i]+'" href="">Wrap ['+item[i]+'] around text</a></li>';
		return buff;
	},
	menuIcon: function () {
        var c = rSRC.mCls, d = "", e = 0, f = "img/icons/new/", g = rSRC.getSetOf('posticon');
        d = '<ul id="menu_posticon" style="display:none;" class="menu-post-icon" >';
        for (icon in g) {
            d += '<li class="' + c[0] + ' fonts "><a title="" href="javascript:;" data-rel="' + e + '" data-name="'+ (!g[icon] ? '' : g[icon].replace(/\./g,'')) +'">' 
			+ (g[icon] ? '<img src="' + gvar.domain + f + g[icon] + '" border=0>' + icon : "No Icon") + "</a></li>";
            e++
        }
        d += "</ul>";
        return d
    },
	
	getTPL: function(){
		var _sp = rSRC.mCls[2], lc=rSRC.mCls[0]
		, iner_head = '<span class="inner_title">'+gvar.inner.reply.title+ '</span> &nbsp;<a class="qrlink" target="_blank" href="'+(isQR_PLUS==0 ? 'http://'+'userscripts.org/scripts/show/'+gvar.scriptMeta.scriptID.toString() : 'https://'+'addons.mozilla.org/en-US/firefox/addon/kaskus-quick-reply/')+'">'+gvar.sversion+'</a>';
        return ""
			+ '<div id="' + gvar.qID + '">' 
			+ '<div class="quick-reply">' 
			
			+ '<div class="qr-reply-header">' 
			+   '<div id="dumy-title" class="reply-header" style="display:none;">' + iner_head + "</div>" //margin-right:16px; 
			+   '<span id="draft_desc" style="position:absolute; right:122px; top:5px; font-size:11px; color:#999; padding:1px 3px;">blanky</span><div id="qrdraft" class="goog-inline-block jfk-button jfk-button-standard jfk-button-disabled" style="position:absolute; z-index:31; right:35px; top:1px; height:25px; line-height:25px; min-width:50px!important;">Draft</div>' 
			+   '<div id="qrtoggle" class="pull-button-disabled" style="left:97%!important; top:1px; z-index:32;"><a title="Toggle QR" class="pull-disabled" href="javascript:;">pull</a></div>' 
			+ "</div>" // qr-reply-header
			
			+ '<div id="formqr">' // === //			
			+ '<div id="notify_wrap" class="icon-button vcard" style="display:none; position:relative;">'
			+  '<div class="qr-m-panel" style="display:block;">'
			+   '<a id="scancel_edit" class="goog-inline-block jfk-button jfk-button-standard btnlink" style="display:none;">Cancel Edit</a>'
			+   '<span id="quote_btnset" style="display:none;">'
			+    '<a id="squote_post" class="goog-inline-block jfk-button jfk-button-standard btnlink" style="">Quote</a>&nbsp;&nbsp;'
			+    '<a id="squick_quote" class="goog-inline-block jfk-button jfk-button-standard btnlink g_warn" style="display:">Quick Quote</a>'
			+   '</span>'
			+  '</div>'
			+  '<div class="g_notice" id="notify_msg" style="display: block;"></div>'
			+ '</div>'
			
			+ '<form method="post" id="formform" name="postreply" action="#">' 
			+ '<input type="hidden" value="" name="securitytoken" id="qr-securitytoken"/>' 
			+ '<input type="hidden" value="" name="recaptcha_challenge_field" id="qr-recaptcha_challenge_field"/>'
			+ '<input type="hidden" value="" name="recaptcha_response_field" id="qr-recaptcha_response_field"/>'
			
			+(gvar.thread_type == 'group' ? ''
			+ '<input type="hidden" value="" name="discussionid" id="qr-discussionid" />'
			+ '<input type="hidden" value="" name="groupid" id="qr-groupid" />'
			: ''
			)
			+ '<input type="hidden" value="Preview Post" name="preview"/>' 
			+ '<input type="hidden" value="1" name="parseurl"/>' 
			+ '<input type="hidden" value="9999" name="emailupdate"/>' 
			+ '<input type="hidden" value="0" name="folderid"/>' 
			+ '<input type="hidden" value="0" name="rating"/>' 
			+ '<input id="hid_iconid" type="radio" name="iconid" value="0" style="position:absolute!important; z-index:-1; top:40px; width:1px; cursor:none;"/>' 
			+ "" 
			+ "<fieldset>" 
			+ '<div class="reply-message">' 
			+ '<div class="message">' 
			+ '<div class="markItUp" id="markItUpReply-messsage" style="display:none!important;">'
			+ '<div class="markItUpContainer">' 
			
			+ '<div class="title-message" style="display:none;">' 
			+ '<input id="fakefocus_icon" type="text" style="position:absolute!important; color:transparent; background:transparent; left:5px; top:20px; width:1px; border:0px;" value=""/>' 
			
			+ '<div class="title-message-sub condensed">' 
			+  '<img id="img_icon" class="modal-dialog-title-imgicon" src="#" style="display:none;"/>' 
			+  '<ul class="ulpick_icon"><li id="pick_icon" class="modal-dialog-title-pickicon markItUpButton markItUpDropMenu" title="Pick Icon"/>' 
			+ rSRC.menuIcon() 
			+  '</li></ul>'
			+  '<input id="title" type="text" class="twt-glow" value="' + gvar.def_title + '" name="title" title="(optional) Message Title" style="width:82%;"/>' 
			+  '<span id="close_title" class="modal-dialog-title-close" title="Remove (optional) title-message" style="display:none;"/>' 
			+ "</div>" // condensed
			+ "</div>" // title-message
			
			+ '<div class="markItUpHeader">' 
			+ "<ul>"
			+ '<li class="' + lc + " " + lc + '96 "><a id="mnu_add_title" title="Add Title Message" href="">Add Title Message</a></li>'			
			+ _sp 
			+ rSRC.menuBIU(1) 
			+ _sp + rSRC.menuAlign(4) 
			+ _sp + rSRC.menuList([8,7]) 
			+ _sp + rSRC.menuFont(19) + rSRC.menuSize(20) + rSRC.menuColor(95) 
			+ _sp + rSRC.menuMedia([11, 14, 22]) 
			+ _sp 
			+ '<li class="' + lc + " " + lc + '99 "><a class="ev_smiley" title="Smiley List " href="">Smiley List </a></li>'
			+ '<li class="' + lc + " " + lc + '98 "><a class="ev_upload" title="Uploader " href="">Uploader </a></li>' 
			+ _sp + rSRC.menuCode([16, 50, 51]) 
			+ _sp + rSRC.menuQuote([15, 21, 97, 52]) 
			+ _sp + '<li class="' + lc + " " + lc + '53 "><a class="ev_misc" title="Strikethrough text" href="" data-bbcode="strike">Strikethrough text</a></li>'
			+ "</ul>" 
			+ "</div>" // markItUpHeader			

			+ '<div style="clear:left; position:relative;">'
			+	'<div class="vertical-text toggle-sidebar" data-todo="avatar" style="display:'+ (gvar.settings.hideavatar ? '':'none') +';">'
			+		'<span class="img-wrp"><img class="photo" src="'+ gvar.user.photo +'" border="0" style=""/></span>'
			+ 		gvar.user.name + (gvar.user.isDonatur && gvar.thread_type != 'group' ? ' <span class="logged-isdonat">[$]</span>':'')
			+	'</div>'

			+	'<div class="sidebar-user" style="display:'+ (gvar.settings.hideavatar ? 'none':'') +'">'
			+	 '<div class="toggle-sidebar-wrap" style="display:none">'
			+	  '<span id="toggle-avatar" class="toggle-sidebar" data-todo="side">&lt;&lt;</span>'
			+	  '&nbsp;<a class="change-avatar" href="'+ gvar.domain +'user/editprofile" target="_blank">change</a>'
			+	 '</div>'
			+	 '<img src="'+ gvar.user.photo +'" border="0" style="height:100px"/>'
			+	 '<div id="logged-username"><a href="'+ gvar.domain +'profile/'+ gvar.user.id +'">'+ gvar.user.name + (gvar.user.isDonatur ? ' <span class="logged-isdonat">[$]</span>':'') +'</a></div>'
			+	'</div>' // sidebar-user
			
			+	'<div class="qr-editor-wrap" style="">'
			+    '<span id="clear_text" class="modal-dialog-title-close" title="Clear Editor" style="display:none;right:10px" />'
			+    '<textarea id="' + gvar.tID + '" rows="50" name="message" class="markItUpEditor qr-editor twt-glow" style="width:100%;"/>'
			+	'<div>'

			+ '</div>'
			
			+ '</div>' // markItUpContainer
			+ '</div>' // markItUp
			+ '</div>' // message
			+ '</div>' // reply-message
			+ '' 
			+ '<div class="cont-bottom">'
			//reply-header
			
			+ '<div class="thread-prevnext reply-header" style="display:">'
			
			+  '<div class="box-bottom" style="display:none">'
			+  '<div class="box-smiley" style="display:none">'
			+   '<div style="-moz-user-select:none" class="goog-tab-bar goog-tab-bar-top">'
			+    '<div style="-moz-user-select:none" id="tkecil" class="goog-tab">Kecil</div>' // goog-tab-selected
			+    '<div style="-moz-user-select:none" id="tbesar" class="goog-tab">Besar</div>'
			+    '<div style="-moz-user-select:none" id="tcustom" class="goog-tab green-tab">Custom</div>'
			+    '<div style="-moz-user-select:none" class="goog-tab close-tab"><span class="tabclose" /></div>'
			+   '</div>'

			+   '<div class="goog-tab-bar-clear"></div>'
			+   '<div id="tabs-content" class="goog-tab-content">'
			+    '<div id="tabs-loader" class="mf-spinner"></div>'
			+    '<div id="tabs-content-inner"></div>'
			+   '</div>'
			+  '</div>' //box-smiley

			+  '<div class="box-upload" style="display:none">'
			+   '<div style="-moz-user-select:none" class="goog-tab-bar goog-tab-bar-top">'
			+    '<div style="-moz-user-select:none" id="tupload" class="goog-tab green-tab">Uploader</div>' 
			+    '<div style="-moz-user-select:none" class="goog-tab close-tab"><span class="tabclose" /></div>'
			+   '</div>'
			+   '<div class="goog-tab-bar-clear"></div>'
			+   '<div id="tabs-content-upl" class="goog-tab-content"><div id="tabs-content-upl-inner" style="position:relative;" /></div>'
			+  '</div>' // box-upload

			+  '</div>' // box-bottom


			+ '<div class="button-bottom">'
			+  '<input id="qr_chkval" type="button" style="display:none;" value="cv" />' // remote button to chkVal
			+  '<input id="qr_chkcookie" type="button" style="display:none;" value="cq" onclick="chkMultiQuote()" />' // remote button to chkVal
			+  '<input id="qr_remoteDC" type="button" style="display:none;" value="dc" onclick="deleteMultiQuote()" />' // remote button to delete-mQ
	 
			+  '<div id="settings-button" title="Settings"></div>'
			+  '<div class="qr-title" style="display:inline-block">' + iner_head + "</div>" 
			+  '<input type="submit" tabindex="1" value="'+gvar.inner.reply.submit+'" name="sbutton" id="sbutton" class="goog-inline-block jfk-button '+ (gvar.user.isDonatur ? 'jfk-button-action' : 'g-button-red') +'"/>'
			+  '<input type="submit" tabindex="2" value="Preview Post" name="spreview" id="spreview" class="goog-inline-block jfk-button jfk-button-standard"/>'
			+  '<input type="submit" tabindex="3" value="Go Advanced" name="sadvanced" id="sadvanced" class="goog-inline-block jfk-button jfk-button-standard"/>'
			
			+(gvar.__DEBUG__ ? '<br/>':'')
			+  '<input type="'+(gvar.__DEBUG__?'text':'hidden')+'" value="" id="tmp_chkVal" />\n\n'
			+  '<input type="'+(gvar.__DEBUG__?'text':'hidden')+'" value="" id="current_ckck" />\n\n' // current ck.crecidential
			+ '</div>' // button-bottom
	
			+  "</div>" // thread-prevnext reply-header
			+ "</div>" // cont-bottom
			+ "" 
			+ "</fieldset>" 
			+ "</form>" 
			+ "</div>" // formqr
			+ "</div>" // quick-reply
			+ "</div>"; // gvar.qID
			
	},
	getBOX: function(){
		// preview BOX
		return ''
		+'<div id="modal_dialog_box" class="modal-dialog" style="left: 523px; top: 181px; display:none;">'
		+'<div class="modal-dialog-title">'
		+ '<span class="modal-dialog-title-text">Preview '+(gvar.edit_mode ? gvar.inner.edit.title : gvar.inner.reply.title)+'</span><span class="modal-dialog-title-close popbox"/>'
		+ '<h1 id="box_preview_title"></h1>'
		+'</div>'
		
		+'<div id="box_wrap">'
		//+ '<h1 id="box_preview_title"></h1>'
		+ '<div class="box_sp" style=""></div>'
		+ '<div id="box_preview" class="entry-content" style=""><img src="'+gvar.B.throbber_gif+'" border=0/>&nbsp;<i style="font-size:10px">loading...</i></div>'
		+ '<div class="spacer"></div>'
		+'</div>' // box_wrap
		
		+'<div id="cont_button" class="modal-dialog-buttons" style="display:none;">'
		+ '<button id="box_prepost" class="goog-inline-block jfk-button '+(gvar.user.isDonatur ? 'jfk-button-action' : 'g-button-red') +'" style="-moz-user-select: none;">'+(gvar.edit_mode ? gvar.inner.edit.submit : 'Post')+'</button>'
		+ '<button id="box_cancel" class="goog-inline-block jfk-button jfk-button-standard" style="-moz-user-select: none;">Cancel</button>'
		+'</div>'
		+'</div>' // modal_dialog_box
		+'';
	},
	getBOX_RC: function(){
		// recaptcha BOX
		return ''
		// .modal-dialog diilangin biar gak ke
		+'<div id="modal_capcay_box" class="capcay-dialog" style="display:none;">'
		+'<div class="modal-dialog-title"><span class="modal-dialog-title-text">'+(gvar.edit_mode ? 'Saving Changes':'Image Verification')+'</span><span class="modal-dialog-title-close popbox"/></div>'
		
		// fake button create
		+'<input id="hidrecap_btn" value="reCAPTCHA" type="button" style="display:" onclick="showRecaptcha(\'box_recaptcha_container\');" class="ninja" />' 
		// fake button reload
		+'<input id="hidrecap_reload_btn" value="reload_reCAPTCHA" type="button" style="display:" onclick="Recaptcha.reload();" class="ninja" />'

		+'<div id="box_wrap" class="ycapcay">'
		+(gvar.edit_mode ? 
		 '' : '<div><label for="recaptcha_response_field">Prove you\'re not a robot</label></div>'
		 )
		+ '<div id="box_response_msg" class="ghost"></div>'
		+ '<div id="box_recaptcha_container" class="entry-content">'
		   //activate-disabled | activated 
		+  '<div id="box_progress_posting" class="activate-disabled "></div>'
		   // recaptcha_is_building_widget
		+  '<div class="recaptcha-widget " id="recaptcha_widget">'+rSRC.getCUSTOM_ReCapcay()+'</div>'
		+ '</div>'		
		+ '<div id="cont_button" class="modal-dialog-buttons" '+(gvar.edit_mode ? ' style="visibility:hidden;"':'')+'>'
		//+  '<div id="additional_opt" style="float:left; display:none;"></div>'
		+  '<button id="box_post" class="goog-inline-block jfk-button jfk-button-action" style="-moz-user-select: none;">Post</button>'
		+ '</div>'
		
		+'</div>' // box_wrap
		+'</div>' // modal_capcay_box
		+'';
	},	
	getCUSTOM_ReCapcay: function(){
		return ''
		+'<div id="recaptcha_image" style="width: 300px; height: 57px;"><img width="300" height="57" src="" style="display: block;"/></div>'
		+'<div class="recaptcha-main">'
		+'<label><strong>'
		+ '<span class="recaptcha_only_if_image" id="recaptcha_instructions_image">Please Insert ReCapcay:</span>'
		+ '</strong>'
		+ '<span id="recaptcha_challenge_field_holder" style="display: none;"/><input type="text" name="recaptcha_response_field" id="recaptcha_response_field" autocomplete="off"/>'
		+'</label>'
		+'<div class="recaptcha-buttons">'
		+'<a title="Get a new challenge" href="javascript:Recaptcha.reload()" id="recaptcha_reload_btn"><span>Reload reCapcay</span></a>'
		+'<a title="Help" href="javascript:Recaptcha.showhelp()" id="recaptcha_whatsthis_btn"><span>Help</span></a>'
		+'</div>' // recaptcha-buttons
		+'</div>' //recaptcha-main
		+'';
	},
	getTPLCustom: function(menus){
		var spacer = '<div style="height:1px"></div>';
		return ''
			+'<div class="wraper_custom">'
			+'<div class="sidsid cs_left">'
			+ '<div id="dv_menu_disabler" style="position:absolute; padding:0;margin:0;border:0; opacity:.15; filter:alpha(opacity=15); background:#000; width:100%; height:100%; display:none;"></div>'
			+ '<ul id="ul_group" class="qrset_mnu">'
			+ 	menus
			//+  '<li>'+spacer+'</li>' // end list
			+ '</ul>'
			+'</div>' // cs_left

			+'<div class="sidsid cs_right">'
			+'<div id="custom_bottom" style="margin:8px 0; display:none;">'
			+ '<input type="hidden" id="current_grup" value="" />'
			+ '<input type="hidden" id="current_order" value="" />'
			+ '<a id="manage_btn" tabindex="502" href="javascript:;" class="gbtn gbtn-p3 lilbutton" style="padding: 1px 8px;">Manage</a>'
			+ '<span id="title_group" style="margin-left: 8px; font-weight: bold;"></span>'
			+ '<a id="manage_cancel" tabindex="503" href="javascript:;" class="gbtn lilbutton" style="padding: 1px 5px; margin-left: 5px; display: none;">Cancel</a>'
			+ '<a id="manage_help" tabindex="504" href="javascript:;" class="gbtn lilbutton" style="padding: 1px 5px; margin-left: 20px; display: none;" title="RTFM">[ ? ]</a>'
			+ '<span id="position_group" style="margin-left:10px; display:none"/>'
			+'</div>' // #custom_bottom

			+'<div id="scustom_container" style="max-width: 829px;">'
			+ '<div style="margin:8px 0">Custom Smiley Not Found</div>'
			+'</div>'

			// manage | add_group properties
			+'<div id="custom_addgroup_container" style="display: none;">'
			+ '<div id="manage_container">'
			+ '<div class="smallfont" style="margin-bottom:5px;">'
			+  '<b id="label_group">Group</b>: <input id="input_grupname" tabindex="500" class="input_title" title="Group Name" style="width: 200px;" value=""/>'
			+  '<a id="delete_grupname" tabindex="506" href="javascript:;" class="smallfont" style="margin-left:20px; padding:1px 5px; color:red;" title="Delete this Group">delete</a>'
			+ '</div>' // smallfont
			+ '<textarea id="textarea_scustom_container" tabindex="501" class="txta_smileyset"></textarea>'
			//+ '<div style="width:100%; display:block; border:1px solid #000"></div>'
			+ '<label style="width:255px; text-transform:none;" title="Checked: ignore custom smiley tag" for="scustom_noparse"><input id="scustom_noparse" type="checkbox">&nbsp;Ignore customed BBCODE</label>'
			+ '</div>' // #manage_container
			+'</div>' // .custom_addgroup_container

			+'</div>' // .cs_right
			+'</div>' // .wraper_custom
		;
	},
	//----
	getTPLUpload: function(menus){
		var spacer = '<div style="height:1px"></div>';
		return ''
			+'<div class="wraper_custom">'
			+'<div class="sidsid cs_left">'
			+ '<ul id="ul_group" class="qrset_mnu">'
			+ 	menus		
			+  '<li>'+spacer+'</li>' // end list
			+ '</ul>'
			+'</div>' // cs_left
			+''
			+'<div class="sidsid cs_right">'
			+ '<div id="uploader_container" style="max-width: 829px;"></div>'
			+'</div>' // .cs_right
			+'<span id="toggle-sideuploader" class="toggle-sidebar" data-state="hide">&#9664;</span>'
			+'</div>' // .wraper_custom
			+''
			
		;
	},
	
	getTPLGeneral: function(){
		var cUL, hk, nb='&nbsp;';
		hk = String(gvar.settings.hotkeykey).split(',');
		cUL = String(gvar.settings.userLayout.config).split(',');
		return ''
			+'<table border="0"><tr>'
			+'<td style="width:45%">'
			+'<input id="misc_updates" class="optchk" type="checkbox"'+ (gvar.settings.updates ? ' checked="checked"':'') +' /><label for="misc_updates" title="Check Userscripts.org for QR latest update">Updates</label>'+nb+nb 
			+ ( !gvar.noCrossDomain ? '<a id="chk_upd_now" class="gbtn" href="javascript:;" title="Check Update Now">check now</a><span id="chk_upd_load" class="uloader" style="display:none">checking..&nbsp;<img src="'+gvar.B.throbber_gif+'" border=0/></span>' : '')
			+ '<div id="misc_updates_child" class="smallfont" style="margin:-5px 0 0 20px; display:'+ (gvar.settings.updates ? 'block':'none') +'" title="Interval check update, 0 &lt; interval &lt;= 99"><label for="misc_updates_interval">Interval:<label>'+nb+'<input id="misc_updates_interval" value="'+ gvar.settings.updates_interval +'" maxlength="5" style="width:45px; padding:0; margin-top:2px;" type="text" />'+nb+'days</label></div><div style="height: 1px;"></div>'
			
     +'<input id="misc_autoshow_smile" class="optchk" type="checkbox" '+(gvar.settings.autoload_smiley[0]=='1' ? 'checked':'')+'/><label for="misc_autoshow_smile">AutoLoad Smiley</label>'
     +'<div id="misc_autoshow_smile_child" class="smallfont" style="margin:-3px 0 0 20px;'+(gvar.settings.autoload_smiley[0]=='1' ? '':'display:none;')+'">'
     +'<input name="cb_autosmiley" id="misc_autoshow_smile_kecil" type="radio" value="kecil" '+(gvar.settings.autoload_smiley[1]=='kecil' ? 'CHECKED':'')+'/><label for="misc_autoshow_smile_kecil">kecil</label>&nbsp;'
     +'<input name="cb_autosmiley" id="misc_autoshow_smile_besar" type="radio" value="besar" '+(gvar.settings.autoload_smiley[1]=='besar' ? 'CHECKED':'')+'/><label for="misc_autoshow_smile_besar">besar</label>&nbsp;'
     +'<input name="cb_autosmiley" id="misc_autoshow_smile_custom" type="radio" value="custom" '+(gvar.settings.autoload_smiley[1]=='custom' ? 'CHECKED':'')+'/><label for="misc_autoshow_smile_custom">custom</label>'
     +'</div>'
			
			+'</td><td>'
			+'<input id="misc_hotkey" class="optchk" type="checkbox"'+ (String(gvar.settings.hotkeykey)!='0,0,0' ? ' checked="checked"' : '') +'/><label for="misc_hotkey">QR-Hotkey</label><div id="misc_hotkey_child" class="smallfont" style="margin:-3px 0 0 15px; display:'+ (String(gvar.settings.hotkeykey)!='0,0,0' ? 'block' : 'none') +'">'+nb+'<input id="misc_hotkey_ctrl"'+ (hk[0]=='1' ? ' checked="checked"':'') +' type="checkbox" /><label for="misc_hotkey_ctrl">ctrl</label>'+nb+'<input id="misc_hotkey_alt" type="checkbox"'+ (hk[2]=='1' ? ' checked="checked"':'') +' /><label for="misc_hotkey_alt">alt</label>'+nb+'<input id="misc_hotkey_shift" type="checkbox"'+ (hk[1]=='1' ? ' checked="checked"':'') +' /><label for="misc_hotkey_shift">shift</label>'+nb+'+'+nb+'<label for="misc_hotkey_char">'+nb+'</label><input title="alphnumeric [A-Z0-9]; blank=disable" id="misc_hotkey_char" value="'+ gvar.settings.hotkeychar +'" style="width: 20px; padding:0;" maxlength="1" type="text" /></div>'
			+'</td>'
			+'</tr></table>'
			+'<div style="width:98%; padding-left:10px;">'
			+'<input id="misc_autolayout" type="checkbox" class="optchk"'+ (cUL[1]=='1' ? ' checked="checked"':'') +' /><label for="misc_autolayout">AutoLayout</label>'+nb+nb+'<a id="edit_tpl_cancel" href="javascript:;" class="cancel_layout gbtn" style="display:'+ (cUL[1]=='1' ? '' : 'none') +';"> cancel </a><div id="misc_autolayout_child" style="margin-top:-3px; display:'+ (cUL[1]=='1' ? 'block' : 'none') +'"><textarea rows="3" style="overflow:auto; letter-spacing:0; line-height:14pt; height:28pt; max-width:95%; min-width:95%; max-height:280px; margin-left:20px;" class="txta_editor" id="edit_tpl_txta">'+ gvar.settings.userLayout.template +'</textarea></div>'
			+'</div>'
			;
	},
	getTPLAbout: function(){
		return ''
			+'<b>'+ gvar.scriptMeta.fullname +' &#8212; '+ gvar.sversion +'</b> <small>'+gvar.scriptMeta.dtversion+'</small><br>'
			+'<div style="height: 3px;"></div><a href="http://userscripts.org/scripts/show/'+ gvar.scriptMeta.scriptID +'" target="_blank">'+ gvar.scriptMeta.fullname +'</a> is an improvement of `kaskusquickreply` (Firefox Add-Ons) initially founded by bimatampan<br>'
			+'<div style="height: 7px;"></div><a href="http://code.google.com/p/dev-kaskus-quick-reply/" target="_blank"><img src="http://ssl.gstatic.com/codesite/ph/images/defaultlogo.png" title="dev-kaskus-quick-reply - Kaskus Quick Reply on Google Code" border="0" height="33"></a>&nbsp;&#183;&nbsp;<a href="http://creativecommons.org/licenses/by-nc-sa/3.0" target="_blank"><img src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" border="0"></a><br>'
			+'Licensed under a <a href="http://creativecommons.org/licenses/by-nc-sa/3.0" target="_blank">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License</a><br>'
			+'<div style="height: 7px;"></div>KASKUS brand is a registered trademark of '+ gvar.domain.replace(/^[^\.]+./gi,'') +'<br>'
			+ gvar.scriptMeta.fullname + ' (QR) is not related to or endorsed by '+ gvar.domain.replace(/^[^\.]+./gi,'') +' in any way.<br>'
			+'QR+ (Add-ons) is ported from the original QR (@userscripts.org) as specified by author.<br><div style="height: 3px;"></div>'
			+'<b>Founded By:</b> bimatampan<br>'
			+'<b>Author By:</b> <a href="'+ gvar.domain +'profile/302101" class="nostyle" target="_blank"><b>Idx</b></a><br>'
			+'<b>Addons Ported By:</b> <a href="'+ gvar.domain +'profile/1323912" class="nostyle" target="_blank"><b>Piluze</b></a><br>'
			
			+'<div class="st_contributor" style="height:190px; vertical-align:top; overflow:auto; border:1px solid rgb(228, 228, 228); clip: rect(auto, auto, auto, auto);">'
			+'<b>Contributors</b><br>'
			+'<div class="contr_l" style="width:45%; float:left;">'
			+'s4nji<br>riza_kasela<br>p1nky<br>b3g0<br>fazar<br>bagosbanget<br>eric.<br>bedjho<br>Piluze<br>intruder.master<br>'
			+'Rh354<br>drupalorg<br>'
			+'</div>'
			+'<div class="contr_r" style="width:45%; float:left;">'
			+'gr0<br>hermawan64<br>slifer2006<br>gzt<br>Duljondul<br>reongkacun<br>otnaibef<br>ketang8keting<br>farin<br>'
			+'.Shana<br>t0g3<br>&amp;all-kaskuser@<a href="'+ gvar.olddomain + 'showthread.php?t=3170414" target="_blank">t=3170414</a>'
			+'</div>'
			+'<div style="clear:both"></div><br>'
			+'<b>Snippet codes</b><br/>'
			+'(ApiBrowserCheck) - YouTube Enhancer by GIJoe<br>'
			+'<br/>'
			+'<b>Shout pasukan-cumik</b><br>'
			+'kakilangit, judotens, matriphe, mursid88, robee_, cheanizer<br/>'
			+'<br/>'
			+'<b>QR Topic</b><br>&nbsp;CCPB <span title="CCPB (#14) UserAgent Fans Club Comunity">UA-FCC</span><br>'
			+' &#167;<a href="'+ gvar.olddomain +'showthread.php?t=8689106" target="_blank" title="All About Mozilla Firefox (Add-ons, Scripts, Fans Club)">Firefox</a> <a href="/profile/809411" target="_blank" title="TS: p1nk3d_books">*</a>'
			+' &#167;<a href="'+ gvar.olddomain +'showthread.php?t=6595796" target="_blank" title="[Rebuild] ?Opera Community">Opera</a> <a href="/profile/786407" target="_blank" title="TS: ceroberoz"> * </a>'
			+' &#167;<a href="'+ gvar.olddomain +'showthread.php?t=3319338" target="_blank" title="[Updated] Extensions/ Addons Google Chrome">Google-Chrome</a> <a href="/profile/449547" target="_blank" title="TS: Aerialsky"> * </a><br>'
			+'&nbsp;Other</b><br>'
			+' - <a href="'+ gvar.olddomain +'showthread.php?t=6616714" target="_blank" title="Add-ons Kaskus Quick Reply + [QR]">Quick Reply+</a> <a href="/profile/1323912" target="_blank" title="TS: Piluze"> * </a><br>'
			+' - <a href="'+ gvar.olddomain +'showthread.php?t=6849735" target="_blank" title="Emoticon Corner">Emoticon Corner</a> <a href="/profile/572275" target="_blank" title="TS: slifer2006"> * </a><br><br>'
			+'</div>'
			+''
			;
	},
	
	getTPLExim: function(){
		return ''
			+''
			+'To export your settings, copy the text below and save it in a file.<br>'
			+'To import your settings later, overwrite the text below with the text you saved previously and click "<b>Import</b>".'
			+'<textarea id="textarea_rawdata" class="textarea" style="height: 335px; width: 99%; overflow: auto; white-space: pre;" readonly="readonly"></textarea>'
			+'<div style="float: left;"><a id="exim_select_all" class="qrsmallfont" style="margin: 10px 0pt 0pt 5px; text-decoration: none;" href="javascript:;"><b>^ Select All</b></a></div>'
			+''
		;
	},
	getTPLShortcut: function(){
		return ''
			+'<em>Globaly on showthread page</em><br>'
			+'<b>Esc</b> - Close Active-Popup<br>'
			+'<b>Ctrl + Q</b> - Focus to Quick Reply Editor Now. (<a id="customable_btn" href="javascript:;">customable</a>)<br>'
			+'<b>Alt + Q</b> - Fetch Quoted Post<br>'
			+'<b>Ctrl + Alt + Q</b> - Fetch Quoted Post <span class="opr">(Opera)</span><br>'
			+'<b>Ctrl + Shift + Q</b> - Deselect All Quoted Post<br>'
			+'<b>Ctrl + Shift + D</b> - Load/Save Draft<br>'
			+'<div style="height: 10px;"></div><em>While focus on Editor / textarea</em><br>'
			+'<b>Ctrl + Enter</b> - Post Reply<br><b>Alt + S</b> - Post  Reply<br>'
			+'<b>Shift + Alt + S</b> - Post Reply <span class="opr">(Opera)</span><br>'
			+'<b>Alt + P</b> -  Preview Quick Reply<br>'
			+'<b>Shift + Alt + P</b> -  Preview Quick Reply <span class="opr">(Opera)</span><br>'
			+'<b>Alt + X</b> -  Go Advanced<br>'
			+'<b>Shift + Alt + X</b> -  Go Advanced <span class="opr">(Opera)</span><br>'
			+'<div style="height: 10px;"></div><em>While focus on Input reCapctha</em><br>'
			+'<b>Pg-Up</b> or <b>Pg-Down</b> - Reload reCaptcha<br>'
			+'<b>Alt + R</b> - Reload reCaptcha<br>'
			+'<b>Ctrl + Alt + R</b> - Reload reCaptcha <span class="opr">(Opera)</span><br>'
			+''
			;
	},
	getTPLSetting: function(){
		// setting BOX
		return ''
		+'<div id="modal_setting_box" class="modal-dialog static_width" style="display:none;">'
		+'<div class="modal-dialog-title"><span class="modal-dialog-title-text">Settings<span id="box_preview_subtitle"></span></span><span class="modal-dialog-title-close popbox"/></div>'
		
		+'<div id="box_wrap">'
		+ '<div id="box_setting" class="entry-content wraper_custom" style="position:relative; ">' //overflow:hidden;
		+  '<div class="sidsid cs_left" style="position:relative; height:100%!important;"></div>'		
		+  '<div class="sidsid cs_right" style="width:540px;"></div>'
		+  '<div class="sidcorner" style=""><a href="javascript:;" id="reset_settings">reset settings</a></div>'
		+ '</div>'
		+ '<div class="spacer"></div>'
		+'</div>' // box_wrap

		+'<div id="cont_button" class="modal-dialog-buttons" style="display:;">'
		+ '<button id="box_action" data-act="update" class="goog-inline-block jfk-button jfk-button-action" style="-moz-user-select:none;">Save</button>'
		+ '<button id="box_cancel" class="goog-inline-block jfk-button jfk-button-standard" style="-moz-user-select: none;">Cancel</button>'
		+'</div>'
		+'</div>' // modal_dialog_box
		+''
		;
	},
	
	getTPLUpdate: function(){
		// update BOX
		return ''
		+'<div id="modal_update_box" class="modal-dialog static_width" style="display:none;">'
		+'<div class="modal-dialog-title">'
		+'<span class="modal-dialog-title-text">'
		+'<img id="nfo_version" src="'+gvar.B.news_png+'" class="qbutton" style="float:left; margin:3px 5px 0 0;padding:3px;"/>'
		+'Update Notification</span><span class="modal-dialog-title-close popbox"/></div>'
		
		+'<div id="box_wrap">'
		+ '<h1 id="box_update_title"></h1>'
		+ '<div class="entry-content wraper_custom">'
		+ '<div id="content_update"></div><div class="spacer"></div>'
		+'</div>' // box_wrap
		+'<div id="cont_button" class="modal-dialog-buttons" style="display:;">'
		+ '<button id="box_update" class="goog-inline-block jfk-button jfk-button-action" style="-moz-user-select: none;">Update</button>'
		+ '<button id="box_cancel" class="goog-inline-block jfk-button jfk-button-standard" style="-moz-user-select: none;">Cancel</button>'
		+'</div>'
		+'</div>' // modal_dialog_box
		+''
		;
	},
	
	getCSS: function(){
		return ""
		+"#box_preview {max-height:" + (parseInt( getHeight() ) - gvar.offsetMaxHeight - gvar.offsetLayer) + "px;}"
		+".message .markItUpButton50 a {background-image:url("+gvar.kkcdn+"images/editor/html.gif);}"
		+".message .markItUpButton51 a {background-image:url("+gvar.kkcdn+"images/editor/php.gif);}"
		+".markItUpButton95 > a {background-image:url("+gvar.kkcdn+"images/editor/color.gif);}"
		+""
		+""
	},
	getSCRIPT: function(){
		return ''
		+'if(typeof $ == "undefined") $ = jQuery;'
		+'function showRecaptcha(element){'
		+ 'if( typeof(Recaptcha)!="object" ){'
		+ 	'window.setTimeout(function () { showRecaptcha() }, 200);'
		+ 	'return;'
		+ '}else{'
		    //+	'Recaptcha.create("6Lf8xr4SAAAAAJXAapvPgaisNRSGS5uDJzs73BqU", '
		+ 	'Recaptcha.create("6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d", '
		+ 	'element, {theme:"custom", lang:"en", custom_theme_widget:"recaptcha_widget"});'
		+ '}'
		+'}'
		
		+'var __mq="kaskus_multiquote", __tmp="tmp_chkVal";'
		+'function deleteMultiQuote(){$.cookie(__mq,null, { expires: null, path: "/", secure: false }); $("#"+__tmp).val("")}'
		+'function chkMultiQuote(){var mqs=$.cookie(__mq); $("#"+__tmp).val(mqs ? mqs.replace(/\s/g,"") : ""); $("#qr_chkval").click() }'
		+'chkMultiQuote();'
		+'';
	},
	getSCRIPT_UPL: function(){
		return ''
			+'function ajaxFileUpload() {'
			+'$("#loading_wrp").show();'
			+'$("#image-control").addClass("blured");'
			+'$.ajaxFileUpload ({'
			+	'url:"/misc/upload_image",'
			+	'secureuri:false,'
			+	'fileElementId:"browse",'
			+	'dataType: "json",'
			+	'success: function (data, status){'
			+		'$("#image-control").removeClass("blured");'
			+		'$("#loading_wrp").hide();'
			+		'if(data.status == "ok"){'
			+			'var t=\'\';'
			+			't+=\'<div class="preview-image-unit">\';'
			+			't+=\'<img src="\'+data.url+\'" width="46" height="46" alt="[img]\'+data.url+\'[/img]" />\';'
			+			't+=\'<span title="remove" class="modal-dialog-title-close imgremover"/>\';'
			+			't+=\'</div>\';'
			+			'$("#preview-image").prepend( t );'
			+		'}else{'
			+			'alert(data.error);'
			+		'}'
			+   '},'
			+	'error: function (data, status, e){alert(e);}'
			+'});'
			+'return false;'
			+'}' // ajaxFileUpload
			+''
		;
	},
	getSetOf: function(type){
		switch(type){
			case "color" :
			return {
		"#000000": "Black",
		"#A0522D": "Sienna",
		"#556B2F": "DarkOliveGreen",
		"#006400": "DarkGreen",
		"#483D8B": "DarkSlateBlue",
		"#000080": "Navy",
		"#4B0082": "Indigo",
		"#2F4F4F": "DarkSlateGray",
		"#8B0000": "DarkRed",
		"#FF8C00": "DarkOrange",
		"#808000": "Olive",
		"#008000": "Green",
		"#008080": "Teal",
		"#0000FF": "Blue",
		"#708090": "SlateGray",
		"#696969": "DimGray",
		"#FF0000": "Red",
		"#F4A460": "SandyBrown",
		"#9ACD32": "YellowGreen",
		"#2E8B57": "SeaGreen",
		"#48D1CC": "MediumTurquoise",
		"#4169E1": "RoyalBlue",
		"#800080": "Purple",
		"#808080": "Gray",
		"#FF00FF": "Magenta",
		"#FFA500": "Orange",
		"#FFFF00": "Yellow",
		"#00FF00": "Lime",
		"#00FFFF": "Cyan",
		"#00BFFF": "DeepSkyBlue",
		"#9932CC": "DarkOrchid",
		"#C0C0C0": "Silver",
		"#FFC0CB": "Pink",
		"#F5DEB3": "Wheat",
		"#FFFACD": "LemonChiffon",
		"#98FB98": "PaleGreen",
		"#AFEEEE": "PaleTurquoise",
		"#ADD8E6": "LightBlue",
		"#DDA0DD": "Plum",
		"#FFFFFF": "White"
			};
			break;

			case "button" :
			return {
       news_png : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAIAAAD5fKMWAAAABnRSTlMAAAAAAABupgeRAAAArklEQVR42mNkYGBgYGBob29/9OgRA14gJyfHAlHHz88/bdo0/KqzsrJYHj16lF/auG/Hmvv37587dw6XUiMjIwYGBhY4X1FRUVFREb/xLMic9knLGRgYKvMiT158jKbOXF+WgYGBiYEUgGJ2ZV4kCarR7B207ubn52dhYGB4ev+yh4fHhw8fIKLvPn4XFUAxRYif8/79+wwMDIxHjhzZsmXLx48f8buBn5/fw8MDAOiiPC0scvhsAAAAAElFTkSuQmCC"
      ,throbber_gif : "data:image/gif;base64,R0lGODlhEAAQALMPADZmn6XF642oyHCp7V6DsEWE0Pn6/dvk7+Ls95W/8VWa7HKby8DS6ezy+U2V6////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAAAPACwAAAAAEAAQAAAEPvDJ2Qgg4sw9EShOUQQcxySDoy5GyR2pk7icESP0doBkPi2OgW8iKCiGkuIRSSgIh43PDApQ4JCGBnLL9UUAACH5BAkAAA8ALAAAAAAQABAAAAQ+8Mk5mTg0UwCKMFomOOQChhMykAlKNauDuNNROC0tLc6gS4KC4vcIDn+Egk936ORcBgJAphM4fwzlSbclTiIAIfkECQAADwAsAAAAABAAEAAABELwyUmrtYiZawlYGzcthZOIk7E4DoJKR3m+D+EM9CMUSr73NEIB90IACjORwdOihCYIDxJ1ABwHz0sAYMpeDAzXJAIAIfkECQAADwAsAAAAABAAEAAABDvwyUmrvTjrakTYUgAUCHgAygcuzgA+QuG8sfIShbudRbIZBICjoTkECyoLQhAcDQyYoywAxQRyAeIkAgAh+QQJAAAPACwAAAAAEAAQAAAEN/DJSau9OOvNuzRB0wnAMhbOmXJEMXAHUCSbQQAOoh33bAkEweImSxgqDVlhiQpgAgOHYxA4TiIAIfkECQAADwAsAAAAABAAEAAABDrwyUmrvTjrzbv/luExgNARwMAdQJFsBuogkiEsB3Wg7oS0BcIN1RqIJgKHssAsKAJHSiMwUA4SDUoEACH5BAkAAA8ALAAAAAAQABAAAAQ+8MlJq7046827/2CIIYExEotEAItZGWthCoUzHNSxOoFkLA5HYbEQrACFgethSASFhagjsZyQBgrFIICgRAAAIfkECQAADwAsAAAAABAAEAAABDzwyUmrvTjrzbv/2CEgHQEsnVA45Hasg3HJk+A4w0EhZjAZi1uBsBCYAAXfL3FzFJ6rBI1yCAxug0RLEgEAIfkECQAADwAsAAAAABAAEAAABDjwyUmrvTjrzXsVxNEBRTI6Jkc4QycUDsId8GBwgsOKmrHoBYJgQSAwLIaEzlFoljCIwEDBSjQoEQAh+QQJAAAPACwAAAAAEAAQAAAEQPDJSau9OFNj9DwA0HkCoDTeQxRD+gBF4gKOnBJOmwqFg6SH3mCkETgcioPHsDgWCAtGxpA4KgoFaeaQGORQlQgAIfkECQAADwAsAAAAABAAEAAABDrwyUmrvdUswDAVQNF5zxEOBvmADqI+RDG8TxjQgJPQhDO/AkfrdSj4Uqqg76DSCAuCZkKooB0Co0sEACH5BAkAAA8ALAAAAAAQABAAAARA8MmH2LzYCAAsvgYBFMrxXVsxIOd0jIPRTptjzhKh4tOY8BKAIwB8EByDoqDgYPEOzBhQ4FAkeYZFtWhgNIrgCAAh+QQJAAAPACwAAAAAEAAQAAAEPvDJhwQBbGppBABFkWyTcRXOEDSk5BXD0U4HOBjz5DlIPhEw3wQ0Ej4AjqKQkDI+BKieEIHKGAMJlnPL7T4iACH5BAkAAA8ALAAAAAAQABAAAAQ88MnXBAGAhMmfwEXhOEX3GAsgDkkyMOZXDIjJNepg2Nzn1LwJYRbkqDZFCcCRSEoITOfjENhJr9isVhsBACH5BAkAAA8ALAAAAAAQABAAAAQ88MmHBAGAiDOnEVhROI4odMY1DkkykE4zgcXATUgSTAdQG52gBORACIWE2hFZYCyDBtlzSq1ar9isdhkBACH5BAkAAA8ALAAAAAAQABAAAAQ88MmHBAGACDSnEVhROI4oGN41DkkykM6CPmAxcBPyOsHTALZZx/BKPAyEW2fIaCyf0Kh0Sq1ar9isdhsBACH5BAkAAA8ALAAAAAAQABAAAAQ98Ml3BAGAiDOnEVhROI4oGB04DkkykM6CSkIxcNPxOkmHdJPG7gcsHka9YnHBUxYbgYZzSq1ar9isdjuJAAAh+QQFAAAPACwAAAAAEAAQAAAEPPDJ1wQBgIg2+1tAUTiOKBjeExRDkgykc6beATsJ7TU3oneHUe43ITgGxImgoEhKlk0nYhFwWq/YrPYXAQA7"
			};
			break;
			
			case "posticon" :
			return {
				None: null,
				Post: "posting.gif",
				Video: "video.png",
				Lightbulb: "lightbulb.png",
				Exclamation: "exclamation.png",
				Star: "star.png",
				Cool: "smile3.png",
				Smile: "smile5.png",
				Angry: "repost.png",
				Unhappy: "smile4.png",
				Talking: "smile2.png",
				Heart: "heart.png",
				Wink: "smile.png",
				"Thumbs down": "thumbsdown.png",
				"thumbs up": "thumbsup.png"
			};
			break;

			default: return false; break;
		}
	},
	getSmileySet: function(custom, cb){

/**
Format will be valid like this:
 'keyname1|link1,keyname2|link2'
 eg. 
 ':yoyocici|http://foo'
*/
	//var sample = 'lopeh|http://static.kaskus.us/images/smilies/sumbangan/001.gif,nangis|http://static.kaskus.us/images/smilies/sumbangan/06.gif';
	// gvar.smcustom it is an associated object of all custom smiley
	// gvar.smgroup it is all name of group of custom smiley
	gvar.smcustom = {};
	gvar.smgroup = [];
	//var buff = getValue(KS+'CUSTOM_SMILEY');
	getValue(KS+'CUSTOM_SMILEY',  function(buff){
		
		if( buff && isString(buff) && buff!='' ){			
			var grup, ret, extractSmiley = function(partition){
				if(!partition) return false;
				var idx=1,sepr = ',',customs=[];
				var smileys = partition.split(sepr);
				if(isDefined(smileys[0]))
				for(var i in smileys){
					if(isString(smileys[i]) && smileys[i]!=''){
						var parts = smileys[i].split('|');
						//customs[idx.toString()] = (isDefined(parts[1]) ? [parts[1], parts[0], parts[0]] : smileys[i]);
						customs.push( (isDefined(parts[1]) ? [parts[1], parts[0], parts[0]] : smileys[i]) );
						idx++;
					}
				}
				return customs;
			};
			if(buff.indexOf('<!!>')==-1){ // old raw-data
				ret = extractSmiley(buff);
				if(ret){
					grup='untitled';
					gvar.smcustom[grup.toString()] = ret;      
					gvar.smgroup.push(grup);
				}
			}else{
				// spliter: ['<!>','<!!>']; 
				// '<!>' split each group; '<!!>' split group and raw-data
				var parts = buff.split('<!>'),part2;
				for(var i=0; i<parts.length; i++){
					part2=parts[i].split('<!!>');
					part2[0]=part2[0].replace(/\\!/g,'!');
					if(part2.length > 0){
						ret = extractSmiley(part2[1]);
						if(ret){
							gvar.smcustom[part2[0].toString()] = ret;
							gvar.smgroup.push(part2[0].toString());
						}
					}
				}  // end for
			}
		} // end is buff
		
		//alert(JSON.stringify(gvar.smcustom)); alert(JSON.stringify(gvar.smgroup));
		if(typeof cb == 'function') cb();
	});
	if(isDefined(custom) && custom) return;

{
gvar.smbesar = [
// old medium-smiley
 ["sumbangan/smiley_beer.gif", ":beer:", "Angkat Beer"]
,["sumbangan/kribo.gif", ":afro:", "afro"]
,["smileyfm329wj.gif", ":fm:", "Forum Music"]
,["sumbangan/smiley_couple.gif", ":kimpoi:", "Pasangan Smiley"]
,["sumbangan/kaskuslove.gif", ":ck", "Kaskus Lovers"]

,["ultah.gif", ":ultah", "Ultah"]
,["traveller.gif", ":travel", "Traveller"]
,["toastcendol.gif", ":toast", "Toast"]
,["jempol1.gif", ":thumbup", "Jempol"]
,["takut.gif", ":takut", "Takut"]
,["fd_5.gif", ":sup:", "Sundul Up"]
,["sundul.gif", ":sup2", "Sundul"]
,["sorry.gif", ":sorry", "Sorry"]
,["shakehand2.gif", ":shakehand2", "Shakehand2"]
,["selamat.gif", ":selamat", "Selamat"]
,["salah_kamar.gif", ":salahkamar", "Salah Kamar"]
,["request.gif", ":request", "Request"]
,["fd_7.gif", ":repost:", "Repost"]
,["s_sm_repost2.gif", ":repost2", "Purple Repost"]
,["s_sm_repost1.gif", ":repost", "Blue Repost"]
,["recseller.gif", ":recsel", "Recommended Seller"]
,["rate5.gif", ":rate5", "Rate 5 Star"]
,["peluk.gif", ":peluk", "Peluk"]
,["nosara.gif", ":nosara", "No Sara Please"]
,["nohope.gif", ":nohope", "No Hope"]
,["ngakak.gif", ":ngakak", "Ngakak"]
,["ngacir2.gif", ":ngacir2", "Ngacir2"]
,["ngacir3.gif", ":ngacir", "Ngacir"]
,["najis.gif", ":najis", "Najis"]
,["mewek.gif", ":mewek", "Mewek"]
,["matabelo1.gif", ":matabelo", "Matabelo"]
,["marah.gif", ":marah", "Marah"]
,["malu.gif", ":malu", "Malu"]
,["fd_6.gif", ":kts:", "Kemana TSnya?"]
,["kaskus_radio.gif", ":kr", "Kaskus Radio"]
,["cewek.gif", ":kiss", "Kiss"]
,["kimpoi.gif", ":kimpoi", "Kimpoi"]
,["fd_4.gif", ":kbgt:", "Kaskus Banget"]
,["fd_8.gif", ":kacau:", "Thread Kacau"]
,["fd_1.gif", ":jrb:", "Jangan ribut disini"]
,["s_sm_ilovekaskus.gif", ":ilovekaskus", "I Love Kaskus"]
,["I-Luv-Indonesia.gif", ":iloveindonesia", "I Love Indonesia"]
,["hoax.gif", ":hoax", "Hoax"]
,["hotnews.gif", ":hn", "Hot News"]
,["hammer.gif", ":hammer", "Hammer2"]
,["games.gif", ":games", "Games"]
,["dp.gif", ":dp", "DP"]
,["cystg.gif", ":cystg", "cystg"]
,["cool2.gif", ":cool", "Cool"]
,["s_big_cendol.gif", ":cendolbig", "Blue Guy Cendol (L)"]
,["cekpm.gif", ":cekpm", "Cek PM"]
,["fd_2.gif", ":cd:", "Cape deeehh"]
,["capede.gif", ":cd", "Cape d..."]
,["bola.gif", ":bola", "Bola"]
,["bingung.gif", ":bingung", "Bingung"]
,["fd_3.gif", ":bigo:", "Bukan IGO"]
,["s_sm_maho.gif", ":betty", "Betty"]
,["berduka.gif", ":berduka", "Turut Berduka"]
,["s_big_batamerah.gif", ":batabig", "Blue Guy Bata (L)"]
,["babygirl.gif", ":babygirl", "Baby Girl"]
,["babyboy1.gif", ":babyboy1", "Baby Boy 1"]
,["babyboy.gif", ":babyboy", "Baby Boy"]
,["angel1.gif", ":angel", "Angel"]
,["jempol2.gif", ":2thumbup", "2 Jempol"]

];
// smbesar

/* Only di Kaskus (Small) */ // 
gvar.smkecil = [
 ["s_sm_peace.gif", ":Yb", "Blue Guy Peace"]
,["takuts.gif", ":takuts", "Takut (S)"]
,["sundulgans.gif", ":sundulgans", "Sundul Gan (S)"]
,["shutup-kecil.gif", ":shutups", "Shutup (S)"]
,["reposts.gif", ":reposts", "Repost (S)"]
,["ngakaks.gif", ":ngakaks", "Ngakak (S)"]
,["najiss.gif", ":najiss", "Najis (S)"]
,["malus.gif", ":malus", "Malu (S)"]
,["mads.gif", ":mads", "Mad (S)"]
,["kisss.gif", ":kisss", "Kiss (S)"]
,["iluvkaskuss.gif", ":ilovekaskuss", "I Love Kaskus (S)"]
,["iloveindonesias.gif", ":iloveindonesias", "I Love Indonesia (S)"]
,["hammers.gif", ":hammers", "Hammer (S)"]
,["cendols.gif", ":cendols", "Cendol (S)"]
,["s_sm_cendol.gif", ":cendolb", "Blue Guy Cendol (S)"]
,["cekpms.gif", ":cekpms", "Cek PM (S)"]
,["capedes.gif", ":capedes", "Cape d... (S)"]
,["bookmark-kecil.gif", ":bookmarks", "Bookmark (S)"]
,["bingungs.gif", ":bingungs", "Bingung (S)"]
,["mahos.gif", ":bettys", "Betty (S)"]
,["berdukas.gif", ":berdukas", "Berduka (S)"]
,["berbusa-kecil.gif", ":berbusas", "Berbusa (S)"]
,["batas.gif", ":batas", "Bata (S)"]
,["s_sm_batamerah.gif", ":bata", "Blue Guy Bata (S)"]
,["army-kecil.gif", ":armys", "Army (S)"]
,["add-friend-kecil.gif", ":addfriends", "Add Friend (S)"]
,["s_sm_smile.gif", ":)b", "Blue Guy Smile (S)"]

	/* standart */

,["sumbangan/13.gif", ";)", "Wink"]
,["sumbangan/001.gif", ":wowcantik", "Wowcantik"]
,["sumbangan/44.gif", ":tv", "televisi"]
,["sumbangan/47.gif", ":thumbup", "thumbsup"]
,["sumbangan/48.gif", ":thumbdown", "thumbdown"]
,["sumbangan/006.gif", ":think:", "Thinking"]
,["sumbangan/shit-3.gif", ":tai", "Tai"]
,["tabrakan.gif", ":tabrakan:", "Ngacir Tubrukan"]
,["sumbangan/39.gif", ":table:", "table"]
,["sumbangan/008.gif", ":sun:", "Matahari"]
,["sumbangan/020.gif", ":siul", "siul"]
,["sumbangan/5.gif", ":shutup:", "Shutup"]
,["sumbangan/49.gif", ":shakehand", "shakehand"]
,["sumbangan/34.gif", ":rose:", "rose"]
,["sumbangan/01.gif", ":rolleyes", "Roll Eyes (Sarcastic)"]
,["sumbangan/32.gif", ":ricebowl:", "ricebowl"]
,["sumbangan/e02.gif", ":rainbow:", "rainbow"]
,["sumbangan/60.gif", ":rain:", "raining"]
,["sumbangan/40.gif", ":present:", "present"]
,["sumbangan/41.gif", ":Phone:", "phone"]
,["sumbangan/005.gif", ":Peace:", "Peace"]
,["sumbangan/paw.gif", ":Paws:", "Paw"]
,["sumbangan/6.gif", ":p", "Stick Out Tongue"]
,["sumbangan/rice.gif", ":Onigiri", "Onigiri"]
,["sumbangan/07.gif", ":o", "Embarrassment"]
,["sumbangan/35.gif", ":norose:", "norose"]
,["sumbangan/q11.gif", ":nohope:", "Nohope"]
,["ngacir.gif", ":ngacir:", "Ngacir"]
,["sumbangan/007.gif", ":moon:", "Moon"]
,["sumbangan/q17.gif", ":metal", "Metal"]
,["sumbangan/33.gif", ":medicine:", "medicine"]
,["sumbangan/004.gif", ":matabelo:", "Belo"]
,["sumbangan/1.gif", ":malu", "Malu"]
,["sumbangan/12.gif", ":mad", "Mad"]
,["sumbangan/26.gif", ":linux2:", "linux2"]
,["sumbangan/25.gif", ":linux1:", "linux"]
,["sumbangan/28.gif", ":kucing:", "kucing"]
,["sumbangan/36.gif", ":kissmouth", "kiss"]
,["sumbangan/014.gif", ":kissing:", "kisssing"]

,["sumbangan/3.gif", ":kagets:", "Kagets"]
,["sumbangan/hi.gif", ":hi:", "Hi"]
,["sumbangan/37.gif", ":heart:", "heart"]
,["sumbangan/8.gif", ":hammer:", "Hammer"]
,["sumbangan/crazy.gif", ":gila:", "Gila"]
,["sumbangan/q03.gif", ":genit", "Genit"]
,["sumbangan/fuck-4.gif", ":fuck:", "fuck"]
,["sumbangan/fuck-8.gif", ":fuck3:", "fuck3"]
,["sumbangan/fuck-6.gif", ":fuck2:", "fuck2"]
,["sumbangan/frog.gif", ":frog:", "frog"]
,["sumbangan/e03.gif", ":flower:", "flower"]
,["sumbangan/52.gif", ":exclamati", "exclamation"]
,["sumbangan/43.gif", ":email", "mail"]
,["sumbangan/4.gif", ":eek", "EEK!"]
,["sumbangan/18.gif", ":doctor", "doctor"]
,["sumbangan/14.gif", ":D", "Big Grin"]
,["sumbangan/05.gif", ":cool:", "Cool"]
,["sumbangan/7.gif", ":confused", "Confused"]
,["sumbangan/31.gif", ":coffee:", "coffee"]
,["sumbangan/42.gif", ":clock", "clock"]
,["sumbangan/woof.gif", ":buldog", "Buldog"]
,["sumbangan/38.gif", ":breakheart", "breakheart"]
,["bolakbalik.gif", ":bingung:", "Bingung"]
,["sumbangan/vana-bum-vanaweb-dot-com.gif", ":bikini", "Bikini"]
,["sumbangan/q20.gif", ":berbusa", "Busa"]
,["sumbangan/30.gif", ":baby:", "baby"]
,["sumbangan/27.gif", ":babi:", "babi"]
,["sumbangan/24.gif", ":army", "army"]
,["sumbangan/29.gif", ":anjing:", "anjing"]
,["sumbangan/017.gif", ":angel:", "angel"]
,["sumbangan/amazed.gif", ":amazed:", "Amazed"]
,["sumbangan/15.gif", ":)", "Smilie"]
,["sumbangan/06.gif", ":(", "Frown"]
]; // smkecil

} // smbesar & smkecil

	} // getSmileySet

};
//=== rSRC

var _BOX = {
	e: {
		 dialogname: 'qr-modalBoxFaderLayer' // [modalBoxFaderLayer, modal_dialog]
		,boxpreview: 'modal_dialog_box'
		,boxcapcay: 'modal_capcay_box'
		,lastbuff: ''
		,boxaction: ''
		,ishalted: false
		,isdiff: false
	},
	init: function(e){
		if( trimStr( $('#'+gvar.tID).val() ).length < 5 ){
			gvar.$w.clearTimeout(gvar.sTryEvent);
			$('#'+gvar.tID).addClass('twt-glowerror');
			_BOX.e.ishalted = 1;
			alert('The message you have entered is too short. Please lengthen your message to at least 5 characters');
			gvar.sTryEvent = gvar.$w.setTimeout(function(){$('#'+gvar.tID).removeClass('twt-glowerror') }, 3000);
			$('#'+gvar.tID).focus(); return;
		}
		close_popup();
		$(e).blur();
		_BOX.e.ishalted = false;
		$('body').addClass('hideflow');
	},
	boxEvents: function(){
		$('#box_cancel, .modal-dialog .modal-dialog-title-close').click(function(){ close_popup() });
	},
	buildQuery: function(topost){
		//,"emailupdate","folderid","rating"
		var fields = ["securitytoken", "title", "message", "iconid", "parseurl", "recaptcha_response_field", "recaptcha_challenge_field", "discussionid", "groupid"]
			, url, name, val, query='', arquery={};
		// &discussionid=6124&groupid=2261
		
		// &preview=Preview+Post&parseurl=1&emailupdate=9999&folderid=0&rating=0
		$('#formform').find('*[name]').each(function(){
			var inside = ($.inArray($(this).attr('name'), fields) != -1);
			if( inside ){			
				val = ( trimStr( $(this).val() ) );
				name = encodeURIComponent( $(this).attr('name') );
				
				if( name=="title" ){
					if( $('#title').parent().hasClass('condensed') )
						val = "";
					else{
						// autocut upto 85 only
						val = val.substring(0, 85);
					}
				}else if(name=="message"){
					gvar.eof = (topost ? "" : "--QR-END-of-MSG-" + (new Date().getTime()).toString() + "--" );

					val = wrap_layout_tpl( val.replace(/\r\n/g, '\n') );
					clog('val message=\n' +  val );
					if( !topost ){
						
						val = val.replace(/\[(\/)?quote(?:\=([^\;]+).([^\]]+))?./gi, function($,$1,$2,$3){
							return ( ($3 ? '':'') + '___' + ($1 ? $1 : '') + 'QRQUOTE'+ ( $2 && $3 ? '|' + $2 + '|' + $3 + '|' : '') +'___' )
						});
						
				    }
					val = ( toCharRef( val ) + "\n" ) + gvar.eof;
					
					// avoid fail encoding for autotext custom-smiley
					val = val.replace(/(\&\#\d+\;)\)/g, '$1&#41;');
					val = _AJAX.scustom_parser( val );
					
					clog('encodedval message=\n' +  val );
				}
				if( val!="" ) arquery[name] = val;
			}
		});
		_BOX.e.isdiff = (_BOX.e.lastbuff != trimStr( $('#'+gvar.tID).val() ));
		_BOX.e.lastbuff = trimStr( $('#'+gvar.tID).val() );
		_BOX.e.boxaction = encodeURI( $('#formform').attr('action') );
		return arquery;
	},
	preview: function(){
		if(_BOX.e.ishalted) return;
		
		// init preview
		$('#'+_BOX.e.dialogname).show().css('visibility', 'visible');
		$('body').prepend( rSRC.getBOX() );
		resize_popup_container();
		
		_BOX.boxEvents();
		
		// early load scustom, check matched custom tag pattern
		if( !gvar.settings.scustom_noparse && "undefined" == typeof gvar.smcustom && $('#'+gvar.tID).val().match(/\[\[([^\]]+)/gi) )
				rSRC.getSmileySet(true);
		
		myfadeIn( $('#'+_BOX.e.boxpreview), 130, function(){
			var query = _BOX.buildQuery();
			
			query["preview"] = encodeURI('Preview' + (gvar.thread_type == 'group' ? '' : ' Post'));
			
			clog( 'boxaction=' + _BOX.e.boxaction ); clog( 'tosend='+ JSON.stringify(query) );
			if( gvar.sTryRequest ){
				clog('Other AJAX instance [sTryRequest] is currently running, killing him now.');
				gvar.sTryRequest.abort();
			}
			try{
			   if( query!="" )
				gvar.sTryRequest = $.post( _BOX.e.boxaction, query, function(data) {
					var valid, parsed, clean_text, cucok, sdata, mH, titleStr;
					valid = tokcap_parser(data);
					mH = ( parseInt( getHeight() ) - gvar.offsetMaxHeight - gvar.offsetLayer );
					
					$('#box_preview').css('max-height', mH + 'px');
					
					if(!valid){
						var msg, func;
						msg = 'Kaskus Kepenuhan? <a href="javascript:;">Try Again</a> | <a href="javascript:;">Dismiss</a>';
						func = function(){
							$('#box_preview').html( msg );
						};
						_NOFY.init({mode:'error', msg:msg, cb:func});
						
					}else{
						
						try{
							//sdata = data.replace(/(\r\n|\n|\r|\t)+/gm, "").replace(/\s{2,}/gm,' ').replace(/\"/gm, '"').toString() + '\n\n';
							sdata = data.replace(/\t/gm, " ").replace(/\s{2,}/gm,' ').replace(/(\r\n|\n|\r)/gm, '{{nn}}').replace(/\"/gm, '"').toString() + '\n\n';
							
						}catch(e){
							clog('decodeURI in preview failed');							
						}
						
						//clog( 'sdata=' + sdata );
						
						parsed = sdata.substring(0, sdata.indexOf(gvar.eof) );
						clog('parsed='+ parsed );
						
						if(gvar.thread_type == 'group')
							cucok = /(?:[\'\"]post-header[\'\"]>\s?<h2\s+[^>]+.([^<]+).+)?[\'\"]entry-content[\'\"](?:[^>]+)?.(.*)/.exec(parsed);
						else
							cucok = /<div\sclass=[\"\']entry-content[\'\"](?:[^>]+)?>(?:[^<]+)?<h1>\s*((?:<img[^>]+>\s*)?(?:[^<]+)?)<\/h1>\s?(.*)/im.exec(parsed);

						if( cucok ){
							cucok[1] = String(cucok[1]);
							titleStr = cucok[1].replace(/<[^>]+>/g,'');
							if( titleStr.length > 77 ){
								cucok[1] = cucok[1].replace(titleStr, '');
								$('#box_preview_title').attr('title', titleStr);
								titleStr = titleStr.substring(0, 77) + '...';
							}
							$('#box_preview_title').html( cucok[1] + titleStr );

							// this a lil hack from above act, to makeit rite,
							// is there a.darwis is prevent us for doing this? uhmm,.
							clean_text = cucok[2]
								.replace(/___\/QRQUOTE___/gi, '</div></div>')
								.replace(/___QRQUOTE___/gi, function(S,$1,$2){
									return ''
										+'<div class="post-quote" style="width:100%; margin:auto; font-family:Helvetica,Arial,Sans-serif; font-size:14px; font-style:normal; font-weight:normal; text-align:left;color: #484848"><span style="padding-left: 15px; font-size: 8pt; display: block;">Quote:</span>'
										+'<div style="width: 95%;margin:auto;border: 1px inset; background: #E1E4F2; padding: 5px; color: #484848;">'
									;
								})
								.replace(/___QRQUOTE\|([^\|]+).([^\|]+).___/gi, function(S,$1,$2){
									return ''
										+'<div class="post-quote" style="width:100%; margin:auto; font-family:Helvetica,Arial,Sans-serif; font-size:14px; font-style:normal; font-weight:normal; text-align:left;color: #484848"><span style="padding-left: 15px; font-size: 8pt; display: block;">Quote:</span>'
										+'<div style="width: 95%;margin:auto;border: 1px inset; background: #E1E4F2; padding: 5px; color: #484848;">Original Posted By <b>'+$1+'</b>'
										+'<a href="/post/'+$2+'#post'+$2+'" class="jump">&#9658;</a><br/>'
									;
								});
							
							clog( clean_text.replace(/\{\{nn\}\}/g, '\n') );

							$('#box_preview').html( clean_text.replace(/\{\{nn\}\}/g, '\n') );
							
							// resize image on its max fits
							$('#box_preview').find('img').each(function(){ $(this).css('max-width', '790px') });
							
							$('#cont_button').show();
						}else{
							clog('fail build clean_text');
						}
						
						$('#box_prepost').click(function(){
							_BOX.init();
							_BOX.presubmit();						
						});						
						
						if( !gvar.user.isDonatur ){
							if(gvar.edit_mode == 1)					
								$('#box_prepost').addClass('jfk-button-action').removeClass('g-button-red');
							else
								$('#box_prepost').removeClass('jfk-button-action').addClass('g-button-red');
						}
							
						$('#box_prepost').focus().delay(1200);
					}
					
				});
			}catch(e){}
		});
	},
	submit: function(){		
		if(!gvar.user.isDonatur && !gvar.edit_mode && gvar.thread_type!='group'){
			$('#qr-recaptcha_response_field').val( $('#recaptcha_response_field').val() );
			$('#qr-recaptcha_challenge_field').val( $('#recaptcha_challenge_field').val() );
		}
		var query = _BOX.buildQuery(true);
		if( gvar.thread_type == 'group' )
			query["sbutton"] = encodeURI( 'Post+Message' );
		else
			query["sbutton"] = encodeURI( gvar.edit_mode ? 'Save+Changes':'Submit+Reply' );

		_BOX.postloader(true);
		
		try{
			clog('ignite post=' + _BOX.e.boxaction );
			clog('query=' + JSON.stringify(query) )
			
			gvar.sTryRequest = $.post( _BOX.e.boxaction, query, function(data) {
				var parsed, cucok, sdata, is_error=false;
				
				//tokcap_parser(data);
				
				try{
					// warning this may trigger error
					//sdata = decodeURIComponent( (data).replace(/(?:\r|\n|\t|\s{2,})+/g, '').replace(/\"/g, '"') );
					sdata = data.replace(/(\r\n|\n|\r|\t|\s{2,})+/gm, "").replace(/\"/g, '"').toString();
					
				}catch(e){
					clog('decodeURI in submit post failed');					
				}
				clog('submited sdata:' + sdata );
				
				parsed = sdata.substring(0, sdata.indexOf(gvar.eof));
				if( cucok = /error-msg\spanel[^>]+>(?:<[^>]+>)+([^<]+)/i.exec(sdata) )
					is_error = 1;
				else if(cucok = /[\'\"]err-msg[^>]+>([^<]+)/i.exec(sdata))
					is_error = 1;
				
				if( is_error ){
					var args, txt_msg, re;
					gvar.postlimit = false;
					//re = /ry\sagain\sin\s(\d+)\ssec/i;
					re = new RegExp('ry\\sagain\sin\\s(\\d+)\\ssec', "");

					txt_msg = cucok[1];
					if( cucok = re.exec(txt_msg) ){
						gvar.postlimit = cucok[1];
						txt_msg = txt_msg.replace(re, 'ry again in <span id="rspbox_cntdown">'+ gvar.postlimit +'</span> sec');
					}
					
					if(!gvar.user.isDonatur){
						_BOX.postloader(false);
						$('#hidrecap_reload_btn').click();
						
						//$('#box_response_msg').html( cucok[1] ).removeClass('ghost').addClass('g_notice').addClass('qrerror').show();
						
						if( gvar.postlimit ){
							_CTDOWN.init(gvar.postlimit, '#rspbox_cntdown');
						}
						$('#box_response_msg').html( txt_msg ).removeClass('ghost').addClass('g_notice').addClass('qrerror').show();
						
					}else{
						close_popup();
						args = {mode:'error', msg:cucok[1]};
						
						if( postlimit ){
							args['cb'] = function(){
								_CTDOWN.init(gvar.postlimit, '#rspbox_cntdown');
							};
						}
						if( !gvar.edit_mode )
							args.btnset = false;
						_NOFY.init(args);
					}
					tokcap_parser(data);
				}else{					
					
					if( cucok = /<meta\s*http\-equiv=[\"\']REFRESH[\"\']\s*content=[\"\']\d+;\s*URL=([^\"\']+)/i.exec(sdata) ){
						// try to flush draft, before reload
						setValue(KS+'TMP_TEXT', '', function(){
							// NO-Error, grab redirect location
							cucok[1] = cucok[1].replace(/\#/,'/?p'+(new Date().getTime()) + '#');
							location.href = cucok[1];
						});
						return;
					}else{
						var args, msg  = 'redirect link not found, post might fail. please try again.';
						clog(msg);
						args = {mode:'error', msg:cucok };
						if(!gvar.edit_mode) args.btnset = false;
						_NOFY.init(args);
					}
				}
			});
		}catch(e){};
	},
	postloader: function(flag){
		var ids = ['recaptcha_widget','box_progress_posting','box_response_msg','box_post']
		   ,cls = ['recaptcha_is_building_widget','activate-disabled','activated','mf-spinner','jfk-button-disabled'];
		if(flag){
			$('#'+ids[0]).addClass( cls[0] ); // tohide capcay-box
			$('#'+ids[1]).removeClass(cls[1]).addClass( cls[2] ).addClass( cls[3] );
			$('#'+ids[2]).hide();
			$('#'+ids[3]).addClass( cls[4] );
		}else{
			$('#'+ids[0]).removeClass( cls[0] );
			$('#'+ids[1]).removeClass( cls[3] ).removeClass( cls[2] ).addClass( cls[1] );
			$('#'+ids[3]).removeClass( cls[4] );
		}
	},
	presubmit: function(){
		if(_BOX.e.ishalted) return;
		
		// init preview
		$('#'+_BOX.e.dialogname).css('visibility', 'visible');
		var judulbox, isCloned, parent;
		parent = 'body > #modal_capcay_box'
		
		isCloned = $('#modal_capcay_box').get(0);
		if( isCloned ){
			$('#wraper-hidden-thing #modal_capcay_box').clone().prependTo( $('body') );
		}else{
			$('body').prepend( rSRC.getBOX_RC() );
			isCloned = false;
		}
		
		$(parent).addClass('modal-dialog');
		judulbox = parent + ' .modal-dialog-title-text';
		// desain
		/*
		if( gvar.user.isDonatur && !gvar.edit_mode && gvar.thread_type != 'group' ){
			$(judulbox).text('Posting....');
		}
		*/
		if( gvar.user.isDonatur || gvar.thread_type == 'group' ){
			$(judulbox).text('Posting....');
		}
		
		if( gvar.edit_mode ){
			// gvar.edit_mode ? 'Saving Changes':'Image Verification'
			$(judulbox).text('Saving Changes');
			$(parent + ' .recaptcha-widget').hide();
			
			$(parent + ' #box_progress_posting')
				.removeClass('activate-disabled')
				.addClass('activated')
				.addClass('mf-spinner')
				;
			$(parent + ' #box_post')
				.addClass('jfk-button-disabled')
				.html('Posting');
			$(parent + ' .ycapcay label').hide();
		}
		
		resize_popup_container();		
		_BOX.boxEvents();
		
		
		myfadeIn( $('#'+_BOX.e.boxcapcay), 50 );
		
		if( false === gvar.user.isDonatur && !gvar.edit_mode && gvar.thread_type != 'group' ){
			if( !isCloned )
				$('#hidrecap_btn').click();
			
			gvar.sITryFocusOnLoad = gvar.$w.setInterval(function() {
				var field = $('#recaptcha_response_field');
				if( field.length == 1 ){
					clearInterval(gvar.sITryFocusOnLoad);
					$('#recaptcha_response_field').addClass('twt-glow');
					$('#recaptcha_response_field').focus();
				}
				$('#recaptcha_instructions_image, #recaptcha_image').click(function(){ field.focus() });
				$('#box_post').click(function(){
					if(field.val()==""){
						alert('Belum Masukin Capcay,...');
						field.focus(); return;
					}
					_BOX.submit()
				});
				$(field).keydown(function(ev){
					var A = ev.keyCode, ab=null;
					if( A===13 ){ // mijit enter
						$('#box_post').click(); ab=1;
						
					}else if( (ev.altKey && A===82) || (A===33||A===34) ) { //** Alt+R(82) | Pg-Up(33) | Pg-Down(34)
						$('#hidrecap_reload_btn').click(); ab=1;
					}
					if( ab ) 
						do_an_e(ev);
				});
			}, 200);
		}else{
			//alert('submit halted')
			_BOX.submit();
		}
	}
};

// outside _BOX doin ajaxify; eg. quote; edit;
var _AJAX = {
	e: {
		 task: "quote" //[quote, edit]
		,ajaxrun: false // current-run
	},
	init: function(){},
	ajaxPID: function(mode, running){
		if(!mode) return;
		if( _AJAX.e.ajaxrun && running !== false ){
			try{
				clog('Other AJAX instance ['+_AJAX.e.ajaxrun+'] is currently running, killing him now.');
				gvar.sTryRequest.abort();
				gvar.ajax_pid[_AJAX.e.ajaxrun] = 0;
			}catch(e){}
		}
		gvar.ajax_pid[mode] = (running === false ? 0 : (new Date().getTime()) );
		_AJAX.e.ajaxrun = (false !== running && !running ? mode : false);
		
		clog('ajaxrun = ' + _AJAX.e.ajaxrun);
		
	},
	quote: function(obj, cb_before, cb_after ){
		
		_AJAX.e.task = 'quote';
		var post_ids, uri = $('#formform').attr('action');
		post_ids = $('#tmp_chkVal').val();
		if(post_ids) post_ids = post_ids.split(',');
		uri+= '/?post=' + post_ids[0];		
		
		clog('uri=' + uri);
		if( _AJAX.e.task && gvar.ajax_pid[_AJAX.e.task] ) {
			clog('AJAX '+_AJAX.e.task+' is currently running, abort previous...');
			try{
				gvar.ajax_pid[_AJAX.e.task].abort();
			}catch(e){}
		}
		try{
			_AJAX.ajaxPID('quote');
			if(typeof(cb_before)=='function') cb_before();
			gvar.sTryRequest = $.get( uri, function(data) {
				var valid, msgs, parsed, cucok, sdata, is_error = false;
				try{
					//sdata = decodeURIComponent( JSON.stringify(data).replace(/\\\"/g, '') ).toString();
					sdata = ( (data).replace(/\\\"/g, '') ).replace(/(\r\n|\n|\r)/gm, "\\n").toString();
				}catch(e){
					clog('decodeURI in fetch quote failed')
				}
				
				//clog('QUOTE=' + sdata);				
				valid = tokcap_parser(data, 'quote');
				
				// is_error checking
				if(!valid){
					var func = function(){};
					_NOFY.init({mode:'error', msg:'Kaskus Kepenuhan? <a href="javascript:;">Try Again</a> | <a href="javascript:;">Dismiss</a>', cb:func});
					
				}else{				
					parsed = sdata.substring(0, sdata.indexOf('</textar'));
					clog('parsed=' + parsed);
					
					if( cucok = /<textarea[^>]+>(.+)?/im.exec(parsed) ){
						_TEXT.init();
						if( cucok[1] )
							_TEXT.add( entity_decode( unescapeHtml( cucok[1].replace(/\\n|\\r\\n|\\r/g, '\n') ) ) );
						_TEXT.pracheck();
					}
					if(typeof(cb_after)=='function') cb_after();
				}
				_AJAX.ajaxPID('quote', false);
			});
		}catch(e){
			clog('FAILED = ' + uri);
			_AJAX.ajaxPID('quote', false);
		}
	},
	edit_cancel: function(focus){
		var conf = confirm('You are currently editing a post.\n\nDiscard anyway?');
		if( conf ){
			clog('edit canceling; now switching Token:\nold=' + gvar._securitytoken + '; now using:' + gvar._securitytoken_prev);
			
			gvar._securitytoken = gvar.inner['reply']['stoken'];
			$('#qr-securitytoken').val(gvar._securitytoken);			
			
			gvar.edit_mode = 0;
			_AJAX.e.task = 'post';
			var act = $('#formform').attr('action').toString();
			$('#formform').attr('action', '/post_reply/' + gvar.pID );
			$('#formform').attr('name', 'postreply' );
			$('.inner_title').html( gvar.inner.reply.title );
			$('#sbutton').val( gvar.inner.reply.submit );
			if( !gvar.user.isDonatur )
				$('#sbutton').removeClass('jfk-button-action').addClass('g-button-red');
			
			_TEXT.set("");
			_TEXT.pracheck(focus);
			_NOFY.dismiss();
			
			// reset title
			$("#hid_iconid").val(0);
			$("#title").val("");
			$("#img_icon").attr("src", "#");
			$("#img_icon, #close_title, .title-message").hide()
		}
		return conf;
	},
	edit: function(obj, cb_before, cb_after){
		
		_AJAX.e.task = 'edit';
		
		if( gvar.ajax_pid[_AJAX.e.task] ) {
			clog('AJAX '+_AJAX.e.task+' is currently running, abort previous...');
			try{
				gvar.ajax_pid[_AJAX.e.task].abort();
			}catch(e){}
		}
		try{
			_AJAX.ajaxPID('edit');			
			if(typeof(cb_before)=='function') cb_before();
			gvar.edit_mode = 1;
			var uri, pos, href; 
			href = trimStr( obj.attr('href').toString() );
			pos = href.indexOf('edit_post/');
			uri = ( gvar.domain + href.substring(pos, href.length) );
			
			gvar.sTryRequest = $.get( uri, function(data) {
				
				var valid, parsed, cucok, sdata, el, is_error=false;
				
				// disini decodeURIComponent kadang bikin malformed URI 
				// issue nya klo ada string % akan error fitu
				try{
					sdata = ( (data).replace(/\\\"/g, '') ).replace(/(\r\n|\n|\r)/gm, "\\n").toString();
					
				}catch(e){
					clog('error raised')
				}
				// better check wheter page is loaded or not before doin below actions
				// is_error checking
				gvar.inner['reply']['stoken'] = gvar._securitytoken_prev = gvar._securitytoken;
				valid = tokcap_parser(data);
				
				// is_error checking
				if(!valid){
					var func = function(){};
					_NOFY({mode:'error', msg:'Kaskus Kepenuhan? <a href="javascript:;">Try Again</a> | <a href="javascript:;">Dismiss</a>', cb:func});
					
				}else{				
					$('#formform').attr('action', uri);
					$('#formform').attr('name', 'edit_postreply');					
					
					parsed = sdata.substring(0, sdata.indexOf('</textar'));					
					clog('parsed=' + parsed)
					
					if( cucok = /<textarea[^>]+>(.+)?/im.exec(parsed) ){
						var re, tmptext, tplpart, ttitle, cfg, layout;
						
						_TEXT.init();
						
						// check for title
						ttitle = false;
						el = $('input[name="title"]', $(sdata));
						if( $(el).get(0) ){							
							ttitle = {
								 icon: basename( $('#display_posticon', $(sdata)).attr('src') ).replace(/\./g,'')
								,text: $(el).val()
							};
							if( !ttitle.text && ttitle.icon == 'cleargif' )
								ttitle = false;
							clog('got judul = ' + JSON.stringify(ttitle) )
						}
						if( ttitle )
							_TEXT.set_title( ttitle );

						
						// layouting ...
						cfg = String(gvar.settings.userLayout.config).split(',');
						layout = gvar.settings.userLayout.template.toLowerCase()
						
						tmptext = trimStr( unescapeHtml( cucok[1].replace(/\\n|\\r\\n|\\r/g, '\n') ) );
						
						if( cfg[1]==1 && layout ){
							
							tplpart = layout.split('{message}');
							re = new RegExp( '^' + tplpart[0].replace(/(\W)/g, "\\" + "$1"), "");
							if( re.test(tmptext.toLowerCase()) )
								tmptext = tmptext.substring(tplpart[0].length, tmptext.length);
								
							re = new RegExp(tplpart[1].replace(/(\W)/g, "\\" + "$1") + '$', "");
							if( re.test(tmptext.toLowerCase()) )
								tmptext = tmptext.substring(0, (tmptext.length-tplpart[1].length) );
						}
						$('.inner_title').html( gvar.inner.edit.title );
						$('#sbutton').val( gvar.inner.edit.submit );
						if( !gvar.user.isDonatur )
							$('#sbutton').addClass('jfk-button-action').removeClass('g-button-red');

						_TEXT.set( tmptext );
						_TEXT.pracheck();
					}
					$('#scancel_edit').show();
					
					if(typeof(cb_after)=='function') cb_after();
				}
				_AJAX.ajaxPID('edit', false);
			});
		}catch(e){ 
			gvar.edit_mode = 0;
			_AJAX.ajaxPID('edit', false);
		};
	},
  scustom_parser: function(msg){
		// trim content msg
		msg = trimStr( msg );		
		if( !gvar.settings.scustom_noparse ) 
				return ( !msg.match(/\[\[([^\]]+)/gi) ? msg : _AJAX.do_parse_scustom(msg) );
		else
				return msg;
  },
  do_parse_scustom: function (msg){
		var buf = msg;
		var paired, re, re_W, cV, tag, maxstep, done=false, lTag='', retag=[];
		// avoid infinite loop, set for max step
		maxstep = 200;
		
		// prepared paired key and tag of custom image
		paired = _AJAX.prep_paired_scustom();

		while(!done && maxstep--){
				tag = /\[\[([^\]]+)/.exec(buf);
				//clog('in while. tag='+tag[1] );
				if( tag ){
						re_W = '\\[\\[' + tag[1].replace(/(\W)/g, '\\$1') + '\\]';
						re = new RegExp( re_W.toString() , "g"); // case-sensitive and global, save the loop
						if( isDefined(tag[1]) && isDefined(paired['tag_'+tag[1]]) && tag[1]!=lTag ){
								clog('parsing['+tag[1]+']...');
								cV = paired['tag_'+tag[1]];
								buf = buf.replace(re, (/^https?\:\/\/\w+/i.test(cV) ? '[IMG]'+cV+'[/IMG]' : unescape(cV) ) );
								lTag = tag[1];
						}else{
								clog('no match tag for:'+tag[1]);
								buf = buf.replace(re, '\\[\\['+tag[1]+'\\]');
								retag.push(tag[1]);
						}
				}else{        
						done=true;
				}
		} // end while
		
		if(retag.length){
				clog('turing back');
				buf = buf.replace(/\\\[\\\[([^\]]+)\]/gm, function(S,$1){return('[['+$1.replace(/\\/g,'')+']')});
		}		
		clog('END of do_parse_scustom process=\n' + buf);
		return buf;
  },	
  prep_paired_scustom: function (){
		// here we load and prep paired custom smiley to do parsing purpose
		// make it compatible for old structure, which no containing <!!>
		var grup, sml, idx=0, paired = {};
		
		// preload smiliecustom database, should be done before (early)
		for(var grup in gvar.smcustom){
				sml = gvar.smcustom[grup];
				/** gvar.smcustom[idx.toString()] = [parts[1], parts[0], parts[0]];
				# where :
				# idx= integer
				# gvar.smcustom[idx.toString()] = [link, tags, tags];
				# deprecated for unicode emote support:
				# # if(sml[j].toString().match(/^https?\:\/\//i)) {
				*/
				for(var j in sml){
						if( typeof(sml[j]) != 'string' ) {
								paired['tag_'+sml[j][1].toString()] = sml[j][0].toString();
								idx++;
						}
				}
		}
		return paired;
  }

};
		
var _NOFY = {
			// whether [quote, edit, error]
			// ----
  mode	: 'quote',
	btnset	: true,
	msg		: '',
	cb		: null,
	// ----
	init: function( args ){
		for(field in args){
			if( !isString(field) ) continue;
			_NOFY[ field.toString() ] = args[field];
		}	
		
		clog('_NOFY inside :: ' + JSON.stringify(args) );
		_NOFY.exec();
	},
	exec: function(mode){
		var emsg = $('#notify_msg');
		if(_NOFY.msg) emsg.html(_NOFY.msg);
		
		//neutralizing
		emsg.removeClass('qrerror');
		$.each(['scancel_edit','quote_btnset'], function(){ $('#'+this).hide() });
		
		switch(_NOFY.mode){
			case "error":
				emsg.addClass('qrerror');
			break;
			case "quote":
				$('#quote_btnset').show();
			break;
			case "edit":
				$('#scancel_edit').show();
			break;
		}
		if(!_NOFY.btnset)
			$('.qr-m-panel').hide();
		else
			$('.qr-m-panel').show();
		$('#notify_msg, #notify_wrap').show();
		if(typeof(_NOFY.cb)=='function') _NOFY.cb();
	},
	dismiss: function(){
		$('.qr-m-panel').show();
		$('#notify_msg, #notify_wrap').hide();
		try{
			gvar.sTryRequest.abort();
		}catch(e){}
	}
};

var _TEXT = {
	e	: null, eNat : null,
	content		: "",
	cursorPos		: [],
	last_scrollTop: 0,
	init: function() {
		this.e = $('#'+gvar.tID);
		this.eNat = gID(gvar.tID);
		this.content = this.e.val();
		this.cursorPos = this.rearmPos(); // [start, end]
		
		this.last_scrollTop = gID(gvar.tID).scrollTop; // last scrolltop pos	
	},
	rearmPos: function(){ return [this.getCaretPos(), gID(gvar.tID).selectionEnd]; },
	subStr: function(start, end){ return this.content.substring(start, end);},
	set_title: function(data){
		$('.title-message').slideDown(1, function(){
			$('.title-message #title').focus().val( data.text );
			$('li a[data-name="'+ data.icon +'"]', $('#menu_posticon') ).click();			
		});
	},
	set: function(value){
		$('#'+gvar.tID).val(value);
		//this.eNat.value = this.content = value;	
		gID(gvar.tID).value = this.content = value;	
		_TEXT.setRows_Elastic();
		_TEXT.init();

		this.saveDraft();
		this.pracheck();
	},
	wrapValue : function(tag, title){
		var st2, start=this.cursorPos[0], end=this.cursorPos[1],bufValue;
		tag = tag.toUpperCase();    
		bufValue = this.subStr(0, start) + 
			'['+tag+(title?'='+title:'')+']' + 
			(start==end ? '' : this.subStr(start, end)) + 
			'[/'+tag+']' + this.subStr(end, this.content.length);
		
		this.set(bufValue);
		st2 = (start + ('['+tag+(title?'='+title:'')+']').length);
		this.setCaretPos( st2, st2 + this.subStr(start, end).length );    
		if(this.overflow!='hidden') gID(gvar.tID).scrollTop = (this.last_scrollTop+1);
		return bufValue; 
	},
	add: function(text){ // used on fetch post only
		var newline = '\n\n';
		if( $('#'+gvar.tID).val() != "" )
			this.content+= newline;
		$('#'+gvar.tID).val( this.content + text );
		this.saveDraft();
		this.pracheck(false);
		
		gvar.$w.setTimeout(function(){
			_TEXT.lastfocus();
		}, 200);
	},
	// ptpos stand to puretext position [start, end]
	setValue : function(text, ptpos){
		var start=this.cursorPos[0], end=this.cursorPos[1];
		if(isUndefined(ptpos)) ptpos=[text.length,text.length];
		if(start!=end) {
			this.replaceSelected(text,ptpos);
			return;
		}
		var bufValue = this.subStr(0, start) + text + this.subStr(start, this.content.length);
		this.set(bufValue);
		// fix chrome weird
		this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
		if(_TEXT.overflow!='hidden') gID(gvar.tID).scrollTop = (this.last_scrollTop+1);
		return bufValue; 
	},
	replaceSelected : function(text, ptpos){
		var start=this.cursorPos[0], end=this.cursorPos[1];
		if(start==end) return;    
		var bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
		this.set(bufValue);
		this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
		if( _TEXT.overflow!='hidden') gID(gvar.tID).scrollTop = (this.last_scrollTop+1);
	},
	pracheck: function(foc){
		if( isUndefined(foc) )
			foc = true;
		
		_TEXT.setElastic(gvar.maxH_editor);
		if( $('#'+gvar.tID).val() !="" )
			$('#clear_text').show();
		else
			$('#clear_text').hide();
		if(foc) gvar.$w.setTimeout(function(){
			_TEXT.focus();
		}, 200);
	},
	focus: function(){ 
		$('#'+gvar.tID).focus() 
	},
	lastfocus: function (){
		var eText, nl, pos, txt = String($('#'+gvar.tID).val()); // use the actual content
		pos = txt.length;		
		nl = txt.split('\n');
		nl = nl.length;
		pos+= (nl * 2);		
		eText = gID(gvar.tID);
		if( eText.setSelectionRange ) {
			_TEXT.focus();
			eText.setSelectionRange(pos,pos);
		}
		gvar.$w.setTimeout(function(){ _TEXT.focus() } , 310);
	},
	getSelectedText : function() {
		return (this.cursorPos[0]==this.cursorPos[1]? '': this.subStr(this.cursorPos[0], this.cursorPos[1]) );
	},
	getCaretPos : function() {	
		var CaretPos = 0;
		//Mozilla/Firefox/Netscape 7+ support 	
		if(gID(gvar.tID))
			if (gID(gvar.tID).selectionStart || gID(gvar.tID).selectionStart == '0')
			CaretPos = gID(gvar.tID).selectionStart;
		return CaretPos;
	},  
	setCaretPos : function (pos,end){
		if(isUndefined(end)) end = pos;
		if(gID(gvar.tID).setSelectionRange)    { // Firefox, Opera and Safari
			this.focus();
			gID(gvar.tID).setSelectionRange(pos,end);
		}
	},
	setElastic: function(max,winrez){
		var a, tid=gvar.tID;
	
		function setCols_Elastic(max){
			var a=gID(tid); a.setAttribute("cols", Math.floor(a.clientWidth/7));
			var w = Math.floor(a.clientWidth/7);
			_TEXT.setRows_Elastic(max)
		}
		a= gID(tid) || gID(gvar.tID);
		_TEXT.oflow='hidden';
		a.setAttribute('style','visibility:hidden; overflow:'+_TEXT.oflow+';letter-spacing:0;line-height:14pt;'+(max?'max-height:'+(max-130)+'pt;':''));
		if( !winrez ) $('#'+tid).keyup(function(){ setCols_Elastic(max) });
		setCols_Elastic(max);	//110
		//gvar.$w.setTimeout(function(){ setCols_Elastic(max)} , 110); //110
	},
	setRows_Elastic: function(max){
		var a = gID(gvar.tID), c=a.cols, b=a.value.toString(), h;
		b=b.replace(/(?:\r\n|\r|\n)/g,"\n");
		for(var d=2,e=0,f=0;f<b.length;f++){
			var g=b.charAt(f);e++;if(g=="\n"||e==c){d++;e=0}
		}
		h=(d*14); a.setAttribute("rows",d); a.style.height=h+"pt";
		_TEXT.oflow = (max && (d*14>(max-130)) ? 'auto':'hidden');
		a.style.setProperty('overflow', _TEXT.oflow, 'important');
		$('#'+gvar.tID).css('visibility', 'visible');
	}, /*134*/
	saveDraft: function(e){
		if(e && (e.ctrlKey || e.altKey) ) return true;
		var liveVal = $('#'+gvar.tID).val();
		if( $('#qrdraft').get(0) && liveVal && liveVal!=gvar.silahken ){
			_DRAFT.title('save');
			$('#qrdraft').html('Save Now').attr('data-state', 'savenow');
			_DRAFT.switchClass('gbtn');
			$('#draft_desc').html('');
			clearTimeout( gvar.sITryLiveDrafting ); 
			gvar.isKeyPressed=1;
			if( gvar.settings.qrdraft )
				_DRAFT.quick_check();
		}
	}
};

var _CTDOWN = {
	init: function(num, tgt){
		_CTDOWN.ori_title = $('title').text();
		
		if( !num ) num = gvar.postlimit;
		_CTDOWN.counter = num;
		_CTDOWN.target = tgt;
		_CTDOWN.target_title = $('title').get(0);
		
		if( !num || num < 0 || gvar.sITryCountDown ) return;
		
		_CTDOWN.rundown();
	},
	rundown: function(){
		if( _CTDOWN.counter > -1){
			$(_CTDOWN.target).html( parseInt(_CTDOWN.counter) );
			$(_CTDOWN.target_title).html( '[' + parseInt(_CTDOWN.counter) + '] ' + _CTDOWN.ori_title );
			
			gvar.sITryCountDown = setTimeout(function(){ _CTDOWN.rundown() }, 1005);
			_CTDOWN.counter--;
		}else{
			clearTimeout(gvar.sITryCountDown);
			
			$(_CTDOWN.target_title).html( _CTDOWN.ori_title );
			if( gvar.user.isDonatur ) return;
			
			// autopost
			var box = 'body > #modal_capcay_box';
			if( $(box).is(':visible') 
				&& $(box).find('#recaptcha_response_field').val()!="" 
				&& !$(box).find('#box_post').hasClass('jfk-button-disabled')
			){
				gvar.$w.setTimeout(function(){
					$(box).find('#box_post').click();
				}, 500);
			}
		}
	}
};

var _DRAFT= {
	el: null, dsc: null
	,_construct: function(){
		_DRAFT.el = $('#qrdraft');
		_DRAFT.dsc= $('#draft_desc');
	}
	,check: function(){
        clog('checking draft..');
        if( _DRAFT.el.get(0) && _DRAFT.el.attr('data-state')=='idle'){
            gvar.timeOld = new Date().getTime();
            clearInterval(gvar.sITryKeepDrafting);
            // default interval should be 120 sec || 2 minutes (120000)
            gvar.sITryKeepDrafting= window.setInterval(function() { _DRAFT.check() }, 120000);
        }
        
        var tmp_text= $('#'+gvar.tID).val(), timeNow=new Date().getTime()
            ,selisih=(timeNow-gvar.timeOld), minuten=Math.floor(selisih/(1000*60));
        
        if( _DRAFT.provide_draft() ) return false;
        if( tmp_text==gvar.silahken || tmp_text=="") return false;
        
        // any live change ? 
        if( isDefined(gvar.isKeyPressed) )
            _DRAFT.save();
        else
            _DRAFT.dsc.html( (minuten > 0 ? 'Last saved ' + minuten + ' minutes' : 'Saved seconds') + ' ago' );
	}
	,provide_draft: function(){
		var tmp_text= $('#'+gvar.tID).val();
		if(tmp_text=="") {
			var blank_tmp = (gvar.tmp_text == "");
			_DRAFT.el.html('Draft').attr('data-state', 'idle');;
			_DRAFT.title( blank_tmp ? '' : 'continue');
			_DRAFT.switchClass( blank_tmp ? 'jfk-button-disabled' : 'gbtn');
			_DRAFT.dsc.html( blank_tmp ? 'blank' : '<a href="javascript:;" id="clear-draft" title="Clear Draft">clear</a> | available');
			$('#clear-draft').click(function(){ _DRAFT.clear() });
			if( !blank_tmp ) return true;
		}
		return false;
	}
	,title: function(mode){
		var t = (mode=='save' ? 'Save Now' : (mode=='continue' ? 'Continue Draft' : '') );
		if(t!='') 
			_DRAFT.el.attr('title', t+' [Ctrl+Shift+D]');
		else
			_DRAFT.el.removeAttr('title');
	}
	,save: function(txt){
		_DRAFT.switchClass('jfk-button-disabled');
		if( isUndefined(txt) ){
			_DRAFT.el.html('Saving ...').attr('data-state','saving');
			_DRAFT.title();
			window.setTimeout(function() { _DRAFT.save( $('#'+gvar.tID).val() )}, 600);
			return;
		}else{
			gvar.tmp_text = txt.toString();
			setValue(KS+'TMP_TEXT', gvar.tmp_text);
			_DRAFT.el.html('Saved').attr('data-state','saved');;
			_DRAFT.dsc.html('Saved seconds ago');
			if( isDefined(gvar.isKeyPressed) ) delete gvar.isKeyPressed;
		}
		
		gvar.timeOld = new Date().getTime();
	}
	,clear: function(txt){
		gvar.tmp_text = '';
		setValue(KS+'TMP_TEXT', gvar.tmp_text);
		_DRAFT.title('continue');
		_DRAFT.el.html('Draft');
		_DRAFT.switchClass('jfk-button-disabled');
		_DRAFT.dsc.html('blank');
		//force_focus(10);
	}
	,quick_check: function(){
		gvar.$w.setTimeout(function(){ _DRAFT.provide_draft() }, 300);
		gvar.sITryLiveDrafting = gvar.$w.setTimeout(function() { _DRAFT.check() }, 5000); // 5 sec if any live change
	}
	,switchClass: function(to_add){
		var to_rem = (to_add=="gbtn" ? "jfk-button-disabled" : "gbtn" );
		_DRAFT.el.addClass(to_add).removeClass(to_rem);;
	}
	
};

var _UPL_ = {
	init: function(){
		_UPL_.tcui = 'tabs-content-upl-inner';
		_UPL_.self = 'box-upload';
		_UPL_.sibl = 'box-smiley';
		_UPL_.def  = 'kaskus';
		
		_UPL_.main();
	},
	menus: function(){
		var idx=0, ret='', spacer='<div style="height:1px"></div>';
		if( gvar.upload_sel ){
			ret+=''
				+'<li><div style="padding-left:30px;"><b>:: Services :: </b></div></li>'
				+'<li>'+spacer+'</li>'
				+'<li class="qrt curent"><div id="tphost_0" title="kaskus.us" data-host="kaskus">kaskus</div></li>'
			;
			for(host in gvar.upload_sel){
				ret+='<li class="qrt"><div id="tphost_'+(idx+1)+'" title="'+gvar.upload_sel[host]+'" data-host="'+host+'">' + host + '</div></li>';
				idx++;
			}
		}
		return ret;
	},
	event_menus:function(){
		$('#tabs-content-upl .qrt').each(function(){
			$(this).click(function(){
				var subtpl, ch= $(this).find('div:first'), id, lbl, gL, host;
				id = ch.attr('id').replace(/tphost_/gi,'');
				host = ch.attr('data-host');
				_UPL_.switch_tab( host );
				
				$(this).closest('#ul_group').find('.curent').removeClass('curent');
				$(this).addClass('curent');
			});
		});
		$('#toggle-sideuploader').click(function(){
			var el, uc, ucs, todo = $(this).attr('data-state'), wleft=131;
			ucw = parseInt( $('#uploader_container').css('width').replace(/px/,'') );
			el = $(this).closest('.wraper_custom').find('.cs_left');
			uc = $('#uploader_container');
			if(todo=='hide'){
				$(el).hide();
				$(uc).css('width', ucw + wleft ).css('max-width', ucw + wleft );
			}else{
				$(el).show();
				$(uc).css('width', ucw - wleft ).css('max-width', ucw - wleft );
			}
			$(this).html(todo=='hide' ? '&#9658;' : '&#9664;' );
			$(this).attr('data-state', todo=='hide' ? 'show' : 'hide' );			
		});
	},
	tplcont: function(host){
		return '<div id="content_uploader_'+host+'" class="content_uploader" style="display:none" />';
	},
	main: function(){		
		var tpl='', iner = _UPL_.tcui;

		$('#'+iner).html( rSRC.getTPLUpload( _UPL_.menus() ) );
		_UPL_.event_menus();		
		
		tpl = _UPL_.tplcont(_UPL_.def);
		for(host in gvar.upload_sel)
			tpl+=_UPL_.tplcont(host);
			
		$('#'+iner+' #uploader_container').html( tpl );
		_UPL_.switch_tab(_UPL_.def);
		
		$('.'+_UPL_.self).addClass('events');
		_UPL_.toggletab(true);
	},
	switch_tab: function(target){
		if( !target ) return;
		var tpl, tgt = 'content_uploader_'+ target;
		
		if( $('#'+tgt).html()=='' ){
			if(target ==_UPL_.def){
				
				tpl = ''
					+'<div id="preview-image-outer">'
					+ '<div id="preview-image" />'
					+'</div>'
					+'<div id="loading_wrp" style="display:none"><div class="mf-spinner chrome-spinner-delay" id="upl_loading" /></div>'			
					+'<div id="image-control" class="">'
					+ '<div class="clickthumb" style="display:none">*Click thumbnail image to add to post content</div>'
					+ '<input type="file" onchange="ajaxFileUpload();" name="forumimg" id="browse"/>'
					+'</div>'
				;
				$('#' + tgt ).html( tpl );
				inteligent_width();

				GM_addGlobalScript( gvar.kkcdn + 'css_v0.1/js/ajaxfileupload.js' );
				GM_addGlobalScript( rSRC.getSCRIPT_UPL() );				
				
				$('#'+_UPL_.tcui+' #preview-image').bind('DOMNodeInserted DOMNodeRemoved', function(ev) {
					if( ev.type == 'DOMNodeInserted' ){
						$('#'+_UPL_.tcui+' .preview-image-unit').each(function(){
							var P=$(this), T = P.find('img'), tc='modal-dialog-title-close';
							if( P.hasClass('event') ) return;

							P.find('img').click(function(){ do_smile( $(this) ) });
							P.find('.'+tc).click(function(){
								$(this).closest('.preview-image-unit').remove();
								inteligent_width('remove');
							});
							P.addClass('event');
						});
						inteligent_width('insert');
					}
				});
			}else
			{
				var ifname = 'ifrm_' + gvar.upload_sel[target].replace(/\W/g,'');
				tpl=''
					+'<a style="position:absolute; top:10px; right:20px; height:16px; width:50px; border:0; font-weight:normal" href="javascript:;" id="ifrm_reload_'+target+'">reload</a>'
					+'<div style="margin:10px 3px 15px 30px; display:inline-block;">'
					+'<a target="_blank" title="Goto '+ target +'" href="http://'+gvar.upload_sel[target]+'"><b>http://' + gvar.upload_sel[target] + '</b></a>'
					+'</div>'
					+'<ifr'+'ame id="'+ ifname +'" src="http://'+ gvar.upload_sel[target] +'" style="width:100%; height:300px"></if'+'rame>'
				;
				$('#'+tgt).html( tpl );
				
				$('#ifrm_reload_'+target).click(function(){
					var itgt = $(this).attr('id').replace(/ifrm_reload_/,''), _src = gvar.upload_sel[itgt];
					$('#' + 'ifrm_' + gvar.upload_sel[itgt].replace(/\W/g,'') ).attr('src', 'http://' + _src);
				});
				
			}
		}
		$('#' + tgt).parent().find('.content_uploader.curent').removeClass('curent').hide();
		$('#' + tgt).addClass('curent').show()
	},
	toggletab: function(show){
		var bu='.'+_UPL_.self, bb='.box-bottom';
		if(show){
			$(bu + ', ' + bb).show();
			$('.'+_UPL_.sibl).hide();
		}else{
			$(bu + ', ' + bb).hide();
		}
	}
};

var _SML_ = {
	init: function(def){
		_SML_.tci = 'tabs-content-inner';
		_SML_.tch = 'tab-content-hidden';
		_SML_.self = 'box-smiley';
		_SML_.sibl = 'box-upload';
		if( !def ) def = 'tabs-sb-tkecil';

		_SML_.init_container();		
		_SML_.load_smiley( def );		
	},
	init_container: function(){
		var cL, tgt = $('#' + _SML_.tci), conts = ['tabs-sb-tkecil', 'tabs-sb-tbesar', 'tabs-sb-tcustom'];
		cL = conts.length; $(tgt).html('');
		for(var i=0; i< cL; i++)
			$(tgt).append('<div id="'+conts[i]+'" class="sml_main" style="display:none" />');
	},
	init_scustom: function(target, smilies){
		// smiley custom thingie
		$('#'+target).html( rSRC.getTPLCustom( _SML_.menus_scustom() ) );
		var gruptpl, tpl = '', idx=0;
		tpl = ''
			+'<input type="hidden" id="current_grup" value="'+ (gvar.smgroup && gvar.smgroup.length > 0 ? gvar.smgroup[0] : '') +'" />'
			+'<input type="hidden" id="current_order" value="'+ (gvar.smgroup ? '0':'') +'" />'
			+'<input type="hidden" id="scustom_todo" value="" />'
			+'<input type="hidden" id="scustom_todel" value="" />'
		;
		$('#custom_bottom').append( tpl );
		if( gvar.settings.scustom_noparse )
				$('#scustom_noparse').attr('checked', true);
		
		// container rightside: #scustom_container
		gruptpl='<select id="pos_group_sets" tabindex="505" style="width: 50px;" class="gbtn">';
		tpl = '';
		
		for(grup in smilies){
			tpl+= '<div id="content_scustom_container_'+ grup +'" class="content_scustom" style="display:none"></div>';
			gruptpl+= '<option value="'+idx+'">'+ (idx + 1) +'</option>';
			idx++;
		}
		gruptpl+='</select>';
		
		if( tpl ){
			$('#scustom_container').html( tpl ).show();			
			$('#position_group').html( gruptpl );
			$('#manage_help, #manage_cancel, #dv_menu_disabler').hide();
			$('#custom_bottom, #title_group').show();
		}
		
	},
	menus_scustom: function(){
		var gL, ret, spacer='<div style="height:1px"></div>';
		
		ret='<li class="qrt_first">'+spacer+'</li>'
			+'<li class="qrt add_group"><div class="add_group">Add Group</div></li>'
			+'<li>'+spacer+'</li>';
		;
		if( gvar.smgroup && gvar.smgroup.length > 0 ){			
			gL = gvar.smgroup.length;
			for(var i=0; i<gL; i++){
				ret+=''
					+'<li class="qrt'+(i==0 ? ' curent':'')+'"><div id="tbgrup_'+i+'" title="'+gvar.smgroup[i].replace(/_/g, ' ')+'">'
					+ gvar.smgroup[i] +'<span class="num">'+(i+1)+'</span></div></li>';
			}
			ret+='<li class="qrt_first">'+spacer+'</li>';
		}
		return ret;
	},

	save_scustom: function(buf){
		
		//var resetme = ;
		setValue(KS+'CUSTOM_SMILEY', buf, function(){

			gvar.settings.scustom_noparse = $('#scustom_noparse').is(':checked');
			setValue(KS+'SCUSTOM_NOPARSE', gvar.settings.scustom_noparse ? "1" : "0");
			
			// cold-boot
			var last_mod = parseInt($('#pos_group_sets').val());
		
			$('#tabs-sb-tcustom').html('');
			
			rSRC.getSmileySet(true, function(){
				var tbcustom = 'tabs-sb-tcustom';
				_SML_.init_scustom(tbcustom, gvar.smcustom);
				_SML_.event_scustom();
				
				_SML_.refresh_menus();
				
				if( $('#tbgrup_' + last_mod ).get(0) )
					$('#tbgrup_' + last_mod ).click();
				else
					$('#tbgrup_0').click();
			});
		});
		
	},
	event_menus: function(){
		// add_group
		$('li.add_group').click(function(){
			var rnd = Math.random().toString();
			rnd = rnd.replace(/0\./g, '').substring(0, 3);
			$(this).addClass('curent');

			$('#label_group').html('Add Group');
			$('#manage_btn').html('Save');
			$('#textarea_scustom_container').val('').height(100);
			$('#input_grupname').val('untitled_' + rnd);

			$('#manage_help, #manage_cancel, #custom_bottom, #custom_addgroup_container, #dv_menu_disabler').show();
			$('#scustom_container, #title_group').hide();
			$('#delete_grupname').hide();
			$('#label_group').click();
			$('#scustom_todo').val('add');
		});
		// menus only
		$('#tabs-sb-tcustom .qrt').each(function(){
			if( !$(this).hasClass('add_group') )
			 $(this).click(function(){

				var retEl, subtpl, ch= $(this).find('div:first'), id, lbl, gL, grup, islink;
				var uesc = function(txt){ return unescape(txt) };
				id = ch.attr('id').replace(/tbgrup_/gi,'');
				grup = gvar.smgroup[id];
				if( $('#content_scustom_container_'+grup).get(0) ){
					$('#scustom_container').find('.content_scustom.curent').removeClass('curent').empty().hide();
					$('#content_scustom_container_'+grup).addClass('curent').show();
				}
				$('#current_grup').val( grup );
				$('#current_order').val( id );
				$('#title_group').html( grup.replace(/_/g, ' ') );
				$(this).closest('#ul_group').find('.curent').removeClass('curent');
				$(this).addClass('curent');

				if( !gvar.smcustom ) rSRC.getSmileySet( true );
				if( gvar.smcustom && gvar.smcustom[grup] ){
					subtpl = ''; gL = gvar.smcustom[grup].length
					for(var k=0; k<gL; k++){
						
						if( !isString(gvar.smcustom[grup][k]) ){
							clog( gvar.smcustom[grup][k][0] )
							if( isLink( gvar.smcustom[grup][k][0] ) != null ){
								islink = 1;
								subtpl+='<img src="'+ gvar.smcustom[grup][k][0] +'" alt="_alt_'+ gvar.smcustom[grup][k][1] +'" title="[['+ gvar.smcustom[grup][k][1] + '] &#8212;' + gvar.smcustom[grup][k][0] +'" /> ';
							}else{
								try{
									subtpl+= '<span title="[['+ gvar.smcustom[grup][k][1] +'] '+ HtmlUnicodeDecode('&#8212;') +' '+ uesc( gvar.smcustom[grup][k][0] ) +'" class="nothumb">'+ uesc( gvar.smcustom[grup][k][0] ) +'</span>' + ' ';
								}catch(e){}
							}
						}else{
						
							retEl = validTag( gvar.smcustom[grup][k], true, 'view' );
							if( !retEl ) continue;
							if( !/<br\s?\/?>/.test(retEl) ){
								if( subtpl!='' )
									subtpl+= '<br/>';
								subtpl+= retEl + '<br/>';
							}else{
								subtpl+= retEl;
							}
						}
					}
					$('#content_scustom_container_'+grup).html( subtpl );
					_SML_.event_img('#'+_SML_.tci+' #tabs-sb-tcustom', 'tcustom');
				}
			
			});
		});
	
	},
	event_scustom: function(){
		
		$('#label_group').click(function(){
			gvar.$w.setTimeout(function(){ $('#input_grupname').focus() }, 100);
		});		
		$('#input_grupname').focus(function(){
			$(this).select()
		}).keydown(function(ev){			
			if(ev.keyCode==13){
				do_an_e(ev);
				$('#manage_btn').click();
			}else if(ev.keyCode==27){
				$('#manage_cancel').click()
			}
		});
		
		// help
		$('#manage_help').click(function(){
			var nn="\n";
			alert('Each Smiley separated by newline.'+nn
				+'Format per line:'+nn
				+' tag|smileylink_or_autotext'+nn
				+''+nn
				+' eg.'+nn
				+'bersulang|'+ gvar.kkcdn +'images/smilies/sumbangan/smiley_beer.gif'+nn
				+( !gvar.settings.scustom_noparse ? ''
				+''+nn
				+'In that case, you can use custom smiley BBCODE with this format:'+nn
				+'[[bersulang]'+nn
				:'' )
			);
		});
		// cancel
		$('#manage_cancel').click(function(){
			$('li.add_group').removeClass('curent');
			
			$('#manage_help, #manage_cancel, #custom_addgroup_container, #dv_menu_disabler, #position_group').hide();
			$('#scustom_container, #title_group').show();
			
			if( gvar.smgroup.length > 0 ){
				$('#manage_btn').html('Manage');
				$('#custom_bottom').show();
			}else{
				$('#custom_bottom').hide();
			}
			
		});
		// manage | save
		$('#manage_btn').click(function(){
			var task = $(this).html().toLowerCase();
			if(task=='save'){
				// ===================
				//alert('saving....');
				// ===================
				// predefined private function
				
				var grupname, todo, niubuf, cleanGrup = function(){
					return trimStr( $('#input_grupname').val().replace(/[^a-z0-9]/gi,'_').replace(/_{2,}/g,'_') );
				}
				grupname = cleanGrup();				
				todel = ($('#scustom_todel').val() == grupname);


				// needed to filter text to saved from smiley-custom
				var do_filter_scustom = function (text){
					var buf = text;
					if( buf!='' ){
						var re, sml, bL, sepr, retbuf='',  done = false;
						var tosingle = {
							'\\|{2,}' : '|'
							,'(\\r\\n){2,}' : '\r\n{sctag:br}\r\n,'
							,'(\\n){2,}' : '\n{sctag:br}\n'
						};
						// step -1 to strip
						buf = buf.replace(/[\[\]\,]/g,"");
						
						//clog('step-to single');
						for(var torep in tosingle){
							if(!isString(tosingle[torep])) continue;
							re = new RegExp(torep, "g");
							buf = buf.replace(re, tosingle[torep])
						}
						buf=(document.all ? buf.split("\r\n") : buf.split("\n")); // IE : FF/Chrome
						
						bL=buf.length;
						sepr = ','; // must be used on extracting from storage
						for(var line=0; line<bL; line++){
							if( !isString(buf[line]) ) continue;
							buf[line] = trimStr ( buf[line] ); // trim perline
								//clog('line='+line+'; val='+buf[line]);
							sml = /([^|]+)\|([\w\W]+)/.exec( buf[line] );
							if(sml && isDefined(sml[1]) && isDefined(sml[2]) ){
								// smiley thingie ?
								//clog('sml[0]='+sml[0]+'; sml[1]='+sml[1]+'; sml[2]='+sml[2]);
								retbuf+=sml[1]+'|' + ( /^https?\:\/\/.+$/i.test(sml[2]) ? sml[2] : escape(sml[2]) ) + sepr;
							}else if(sml=validTag( buf[line], false, 'saving' ) ){
								// valid tag ?
								//clog('saving-valid tag ?; ' + sml);
								retbuf+=sml+sepr;
							}
							done=true;
						} // end for    
					}
					return retbuf;
				}
				
				//var remixBuff = 
				
				
				if( niubuf = $('#textarea_scustom_container').val() )
					niubuf = do_filter_scustom( trimStr(niubuf) );

				if( trimStr(grupname)=='' ){
					alert('Group Name can not be empty');
				}else if( !niubuf ){
					alert('Invalid tag and\/or smiley format');
				}else{
					//save custom smiley
					//remixBuff(niubuf, todel);
					
					(function remixBuff(niubuf, todel){
						var ret='', curG, oldOrder, curOrder, todo, sEL, nOrder;
						todo = $('#scustom_todo').val();
						
						
						if( !niubuf )
							_SML_.save_scustom( false )
	
						if(todo == 'add' && gvar.smcustom[grupname] ){
							alert('Group Name is already exists');
							_SML_.save_scustom( false )
						}else if(todo == 'edit'){
							
							curOrder = $('#current_order').val();
							oldOrder = (curOrder ? curOrder : "");
							curG = [(curOrder ? curOrder : ""), $('#current_grup').val()];
							nOrder = $('#pos_group_sets option:selected').val();
							
							//alert(curOrder);
							
							// reorder-group (manage | not add)
							if(curG[0]!="" && nOrder!=curG[0] && gvar.smgroup){
								var tomove = gvar.smgroup[curG[0]], newGrup=[];
								gvar.smgroup[curG[0]] = null;
								if(nOrder > curG[0])
									gvar.smgroup.splice( curG[0], 1);
								
								gvar.smgroup.splice( nOrder, 0, tomove);
								// rescan dah .. 
								for(var i=0; i<gvar.smgroup.length; i++)
									if(gvar.smgroup[i]) newGrup.push(gvar.smgroup[i]);
								gvar.smgroup = newGrup;
								//return;
							}
						}
						
						//alert('good togo');
						
						// good togo
						var ch_grup, tmp_SML = {}, grlen, degrup, joined;
						getValue(KS + 'CUSTOM_SMILEY', function( _CS ){
							var curOrder, curG, cparts = (_CS ? _CS.split('<!>') : []), cprL = cparts.length;
							if( cprL ) for(var n=0; n<cprL; n++ ){
								part = cparts[n].split('<!!>');
								tmp_SML[ String(part[0]) ] = String( part[1] );
							}
							grlen = (gvar.smgroup ? gvar.smgroup.length : 0);
							
							
							if( todo == 'edit' ){
								curOrder = $('#current_order').val();
								curG = [(curOrder ? curOrder : ""), $('#current_grup').val()];							
								ch_grup=(curG[1]!='' && grupname!='' && grupname!=curG[1] );
								
								for(var k=0; k<grlen; k++ ){
									degrup = gvar.smgroup[k].toString();
									if( degrup==curG[1] ){
										if( todel ){
											grupname = false;
										}else{
											tmp_SML[ degrup ] = niubuf.toString();
											grupname = trimStr( ch_grup ? cleanGrup() : curG[1] ).replace(/\!/g,'\\!');
										}
									}else{
										grupname = degrup;
									}
									ret+=(grupname ? grupname.toString()+'<!!>'+tmp_SML[degrup]+( (k+1) < grlen ? '<!>':'') : '');
								}
								// end for
							}
							else{
								joined = false;
								if(gvar.smgroup) for(var k=0; k<grlen; k++){
									degrup = gvar.smgroup[k].toString();
									joined=joined || ( degrup==grupname );
									ret+= degrup+'<!!>'+tmp_SML[ degrup ] +(joined ? niubuf.toString():'') + ( (k+1) < grlen ? '<!>':'');
								}
								if(!joined) ret+='<!>'+ grupname.toString() +'<!!>'+ niubuf.toString();
							}
							_SML_.save_scustom(ret)
						});
					})(niubuf, todel);
					// end remixBuff
					
					
				}			
			}
			else if(task=='manage'){

					$(this).html('Save');
					$('label_group').html('Group');
					$('#scustom_todo').val('edit');
					$('#manage_help, #manage_cancel, #custom_bottom, #custom_addgroup_container, #dv_menu_disabler, #position_group, #delete_grupname').show();
					$('#scustom_container, #title_group').hide();
					//nOrder = $('#pos_group_sets option:selected').val();
					
					var gid, grupname = $('#current_grup').val(), buff_edit='';
					$('#input_grupname').val( grupname );
					gid = $('#current_order').val();
					// pos_group_sets
					$('#pos_group_sets option[value='+gid+']').attr('selected', 'selected');
					
					getValue(KS + 'CUSTOM_SMILEY', function(retcs){
						var cparts = retcs.split('<!>'), cprL = cparts.length;
						for(var n=0; n<cprL; n++){
							part = cparts[n].split('<!!>');
							if( grupname==part[0] ){
								buff_edit = unescape( String( part[1] ).replace(/,/g, '\n').replace(/{sctag\:br}/g, '') );
							}
						}
						$('#textarea_scustom_container').val( buff_edit );
						$('#input_grupname').focus();
					});
				}
		});
		
		$('#delete_grupname').click(function(){
			var cGrp = $('#current_grup').val();
			if( confirm('You are about to delete this Group.\n'+'Name: '+cGrp+'\n\nContinue delete this group?\n') ){
				$('#scustom_todel').val( cGrp );
				$('#manage_btn').click();
				//SML_LDR.custom.manage_save(cGrp);
			}
		});
		
		$('#textarea_scustom_container, #delete_grupname, #manage_help').keydown(function(ev){
			var land_id, tid, A = ev.keyCode || ev.keyChar;
			tid = $(this).attr('id');			
			if( tid=='manage_help' ){
				if( $('#pos_group_sets').is(':visible') )
					return true;
				else
					land_id = '#input_grupname';
			}else{
				land_id = (tid == 'delete_grupname' ? '#input_grupname' : '#manage_btn');
			}
			
			if(A === 9){
				do_an_e(ev);
				gvar.$w.setTimeout(function(){ $(land_id).focus() }, 50);
			}
		});
		
		_SML_.event_menus();
	},
	
	
	event_img: function(tgt, label){
		$(tgt + ' img').each(function(){
			$(this).click(function(){ do_smile( $(this) ) })
		});
		$(tgt + ' span').each(function(){
			$(this).click(function(){ do_smile( $(this) ) })
		});
		_SML_.setClassEvents(label);
	},
	setClassEvents: function(label){
		var tabs=['tkecil', 'tbesar', 'tcustom'], tL = tabs.length;
		for(var i=0; i<tL; i++)
			$('.'+_SML_.self).removeClass('events-' + tabs[i]);
		$('.'+_SML_.self).addClass('events-'+label);
	},

	refresh_menus: function(){
		$('#ul_group').html( _SML_.menus_scustom() );
		_SML_.event_menus();
	},
	load_smiley: function(target){
		if( !gvar.smbesar || !gvar.smkecil || !gvar.smcustom )
			rSRC.getSmileySet();
		if(!target) target = 'tabs-sb-tkecil';
		
		if( !$('#' + target).hasClass('filled') ){
		
			var label, smilies, tpl='', tci = _SML_.tci, tch = _SML_.tch;
			label = target.replace('tabs-sb-', '');
			smilies = (label == 'tkecil' ? gvar.smkecil : (label=='tbesar' ? gvar.smbesar : gvar.smcustom) );
			$('.'+_SML_.self).append('<div id="'+target+'" class="'+tch+'"></div>');
			gvar.$w.setTimeout(function(){
				if( target!='tabs-sb-tcustom' ){
					$.each(smilies, function(i, img){
						tpl+= '<img src="'+ gvar.kkcdn + 'images/smilies/' + img[0] +'" alt="'+ img[1] +'" title="'+ img[1] + ' &#8212;' + img[2] +'" /> '
					});
					$('#'+target).html( tpl );					
					_SML_.event_img('#' + target, label);
				}else{
					//alert(JSON.stringify(smilies)); return;
					
					_SML_.init_scustom(target, smilies);
					_SML_.event_scustom();
					$('#tbgrup_0').click();
				}
				if( $('#' + target).html != '' )
					$('#' + target).addClass('filled');
				_SML_.switch_tab( target );
			}, 1);
			// klo dah keload semua termuat di #tabs-content-inner			
		}else{
			// sumthin like switch only
			_SML_.switch_tab( target );
		}
	},
	switch_tab: function(target){
		if( $('#' + target).html() == "" ){
			_SML_.load_smiley(target);
			return;
		}		
		$('#' + _SML_.tci).find('.active').removeClass('active').hide();
		$('.'+_SML_.self+' #tabs-loader').hide();
		$('#' + target).addClass('active').show();
	
	},
	toggletab: function(show){
		var bs='.'+_SML_.self, bb='.box-bottom';
		if(show){
			$(bs + ', ' + bb).show();
			$('.'+_SML_.sibl).hide();
			if($('.box-smiley .goog-tab-selected').get(0))
				$('.box-smiley .goog-tab-selected').click();
			else
				$('#tkecil').click();
		}else{
			$(bs + ', ' + bb).hide();
		}
	}
};

var _STG = {
	e:{
		 dialogname: 'qr-modalBoxFaderLayer'
		,boxsetting: 'modal_setting_box'
	},
	init:function(){		
		close_popup();
		$('body.forum').addClass('hideflow');
		_STG.main();
	},
	main:function(){
		$('#'+_STG.e.dialogname)
			.css('visibility', 'visible')
			.show();		
		$('body').prepend( rSRC.getTPLSetting() );
		
		_STG.design();
		
		myfadeIn( $('#'+_STG.e.boxsetting), 130, function(){
			_STG.event_main()
		});		
		resize_popup_container(650);
	},
	design:function(){
		var mnus, mL, idx=0, tpl = '';
		mnus = {
			 gen:  ['General', rSRC.getTPLGeneral()]
			,exim: ['Export \/ Import', rSRC.getTPLExim()]
			,kbs:  ['Keyboard Shortcut', rSRC.getTPLShortcut()]
			,abt:  ['About', rSRC.getTPLAbout()]
		};
		mL = 4; // banyak tab
		tpl='<ul id="ul_group" class="qrset_mnu settingmnu">'
		$('#box_setting .cs_right').html('');
		for(tipe in mnus){
			if(typeof tipe!='string') continue;
			
			tpl+= '<li data-ref="'+tipe+'" class="qrt'+(idx==0 ? ' curent': (idx==(mL-1) ? ' qrset_lasttab' : '')) +'"><div>'+mnus[tipe][0]+'</div></li>';
			$('#box_setting .cs_right').append('<div class="stg_content'+(idx==0 ? ' isopen':'')+'" id="stg_content_'+tipe+'" style="display:none;">'+ (mnus[tipe][1] ? mnus[tipe][1] : '') +'</div>');
			idx++;
		}
		tpl+='</ul>'
		$('#box_setting .cs_left').html( tpl );
		$('#box_setting .st_contributor').scrollTop(0);
		$('#modal_setting_box .modal-dialog-title-text').css('left', '0');		
		
		
		$('#qr-modalBoxFaderLayer .cnv').remove();
		$('#qr-modalBoxFaderLayer').append('<ca'+ 'nvas class="cnv" style="" />');
		
	},

	event_main:function(){
		// menus
		$('#box_setting .qrt').each(function(){
			$(this).click(function(){
				var btn, disb, par, tipe = $(this).attr('data-ref');
				par = $(this).parent();
				$('#box_setting').find('.isopen').removeClass('isopen').hide();
				$('#stg_content_' + tipe).addClass('isopen').show();
				$(this).parent().find('.curent').removeClass('curent');
				$(this).addClass('curent');
				$('#box_preview_subtitle').html( ' ' + '&#187; ' +  $(this).find('div').html() );
				
				disb = 'jfk-button-disabled';
				btn = $('#box_action');
				btn.html('Save');
				if(tipe == 'exim'){
					if( !$('#textarea_rawdata').val() )
						_STG.load_rawsetting();
					$(btn).html('Import').removeClass(disb).attr('data-act', 'import');
				}else if(tipe == 'gen'){
					$(btn).removeClass(disb).attr('data-act', 'update');
				}else{
					$(btn).addClass(disb).attr('data-act', 'none');
				}
				$(btn).attr('data-todo', tipe);
			});
		});
		$('#box_setting .optchk').each(function(){
			$(this).click(function(){
				var tgt, chked, id = $(this).attr('id');
				tgt = $(this).parent().find('#'+id + '_child');
				chked = $(this).is(':checked');
				$(tgt).css('display', chked ? 'block' : 'none' );
				if(id == 'misc_autolayout')
					$('#edit_tpl_cancel').css('display', chked ? '' : 'none' );
			});
		});
		$('#edit_tpl_cancel').click(function(){
			$('#misc_autolayout').removeAttr('checked').click().removeAttr('checked')			
		});
		
		if( !gvar.noCrossDomain ) {// unavailable on Chrome|Opera still T_T
			$('#chk_upd_now').click(function(){
				$('#chk_upd_load').show();
				$(this).hide();
				_UPD.caller = '#' + $(this).attr('id');
				_UPD.check(true);
			})
		}		
		
		var val, pval, isChk = function(x){ return $(x).is(':checked') };
		$('#box_action').click(function(){
			
			if( $(this).attr('data-act') == 'update' ){
				var misc, reserved_CSA, tpltext, errMsg='', isError = 0;

				var restore_save = function(){
					$('#box_action').html('Save').removeClass('jfk-button-disabled');
					return false;
				};
				
				// box_action
				$('#box_action')
					.html('Saving..')
					.addClass('jfk-button-disabled');

				// validate
				gvar.settings.updates = isChk('#misc_autolayout');			
				pval = (gvar.settings.updates ? '1' : '0');
				tpltext = trimStr( $('#edit_tpl_txta').val().toString() );
				if( tpltext == "" )
					tpltext = '[B]{message}[/B]';
				if( pval && tpltext.toLowerCase().indexOf('{message}') != -1 ){
					setValueForId(gvar.user.id, ('0,' + pval).toString(), 'LAYOUT_CONFIG'); //save layout
					gvar.settings.userLayout.template = val = tpltext;
					setValueForId( gvar.user.id, encodeURIComponent(val), 'LAYOUT_TPL', ['<!>','::'] );
				}else{
					isError = 1;
					errMsg = 'Invalid Layout format.\nCan\'t find "{message}" in template.\n\neg. [B]{message}[/B]';
				}
				
				if( isError && pval ){
					alert(errMsg);
					return restore_save();
				}
				
				// =============
				
				// QR_HOTKEY_KEY QR_HOTKEY_CHAR
				var oL, value, el, Chr;
				if( isChk( $('#misc_hotkey')) ){
					misc = ['misc_hotkey_ctrl','misc_hotkey_shift','misc_hotkey_alt'];    
					reserved_CSA = [(!gvar.isOpera ? '0,0,1' : '1,0,1'), '1,1,0']; /* Alt+Q OR Ctrl+Alt+Q -- Ctrl+Shift+Q */
					oL = misc.length;
					value = [];
					for(var id=0; id<oL; id++){
						if( !isString(misc[id]) ) continue;
						value.push( isChk( $('#'+misc[id]) ) ? '1' : '0' );
					}
					Chr = $('#misc_hotkey_char').val().toUpperCase();
					if( Chr=='Q' && (reserved_CSA[0]==String( value ) || reserved_CSA[1]==String( value )) ){ // bentrok				
						if( confirm('Hotkey is already reserved:\n ['+(!gvar.isOpera ? 'Alt + Q':'Ctrl + Alt +Q')+'] : Fetch Quoted Post\n [Ctrl + Shift + Q] : Deselect Quote\n\nDo you want to make a correction?') )
							return restore_save();
					}
				}else{
					value = ['0,0,0'];
				}
				if( Chr.length==0 || (Chr && Chr.match(/[A-Z0-9]{1}/)) ){
					gvar.settings.hotkeykey = String( value );
					gvar.settings.hotkeychar = String( Chr );
					
					setValue(KS+'QR_HOTKEY_KEY', String( value ), function(){
						setValue(KS+'QR_HOTKEY_CHAR', String( Chr ));
					});
				}
				
				// autoload smiley				
				misc = ('kecil,besar,custom').split(',');
				value = [];
				value.push( isChk( $('#misc_autoshow_smile')) ? '1' : '0' );
				oL = misc.length;
				for(var id=0; id<oL; id++){
						if( !isString(misc[id]) ) continue;
						if(isChk( $('#misc_autoshow_smile_' + misc[id]) )){
								value.push(misc[id]);
								break;
						}
				}				
				setValue(KS+'SHOW_SMILE', String( value ));
				
				// last shot
				gvar.$w.setTimeout(function(){
					// save instant/autocorrect 
					pval = (isChk('#misc_updates') ? '1' : '0');
					setValue(KS+'UPDATES', pval.toString(), function(){
						val = $('#misc_updates_interval').val();
						val = ( isNaN(val)||val <= 0 ? 1 : (val > 99 ? 99 : val) );
						setValue(KS+'UPDATES_INTERVAL', val.toString(), function(){

							// reload settings; make sure im the last to save
							gvar.$w.setTimeout(function(){
								getSettings( gvar.settings );
								_STG.cold_boot();
								
								$('#modal_setting_box #box_cancel').click();
							}, 200);
						});
					});
				}, 400);
				
				//gvar.$w.setTimeout(function(){ $('#box_cancel').click() }, 10);

			} //=end act update
			
			// import ==
			else{
				var rL, raw, btn='#box_action', tgt = '#textarea_rawdata', disb = 'jfk-button-disabled';
				$(tgt).addClass(disb);
				raw = trimStr( $(tgt).val() );
				
				if( gvar.buftxt && raw == trimStr(gvar.buftxt) ){
					$(btn).val('Nothing changed..');
					if(gvar.buftxt) delete( gvar.buftxt );
					window.setTimeout(function(){ $('#box_cancel').click() }, 750);
				}
				else{
					if( !confirm(''
							+'Are you sure to update these settings?'+'\n'
							+'Your current settings will be lost.'+'\n\n'
							+'Page may need to reload to apply new Settings.'+'\n') ){
						$(tgt).removeClass(disb);
						return;
					}else{
					
						$(btn).val('Saving..');
						raw = raw.split('\n'), rL = raw.length;
						var cucok, lastkey = false, line = 0;
						
						var query_save_setting = function(line){
							var newval = trimStr( raw[line] );
							if( cucok = newval.match(/^\[([^\]]+)]/) ){
								// is this a defined key?
								cucok[1] = trimStr(cucok[1]);
								lastkey = ( isDefined(OPTIONS_BOX[KS + cucok[1]]) ? cucok[1] : false ); // only allow registered key
							
							}else if( lastkey && newval && !newval.match(/^\#\s(?:\w.+)*/) ){
								// is lastkey is defined, newval is not blank and is not a komeng
								try{
									setValue(KS+lastkey, newval.toString(), function(){
										//query_save_setting(line);
										lastkey = false; // flushed, find next key
									});
								}catch(e){};
								//lastkey = false; // flushed, find next key
							}
							line++;
							if(line < rL){

								query_save_setting(line);

							}else{
								// done ...
								gvar.$w.setTimeout(function(){
									getSettings( gvar.settings );
									//window.setTimeout(function(){ $('#box_cancel').click() }, 10);
									gvar.$w.setTimeout(function(){ location.reload(false) }, 50);
								}, 200);
							}
						};
						// let's save em all
						query_save_setting(line);
					}
				}				
			}
		});
		
		$('#exim_select_all').click(function(){
			$('#textarea_rawdata').focus();
			selectAll( $('#textarea_rawdata').get(0) );
		});
		
		$('#reset_settings').click(function(){
			
			getValue(KS+'CUSTOM_SMILEY', function(ret){
				var msg, space, csmiley, keys, yakin, home=[gvar.olddomain + 'showthread.php?t=3170414','http:/'+'/userscripts.org/topics/58227'];
				space = '';
				for(var i=0;i<20;i++) space+=' ';
				csmiley = ret.replace(/^\s+|\n|\s+$/g, "");
				msg = ( csmiley!="" ? 
					HtmlUnicodeDecode('&#182;') + ' ::Alert::\nCustom Smiley detected. You might consider of losing it.\n\n' : ""
				)
				+'This will delete/reset all saved data.'
				+'\nPlease report any bug or some bad side effects here:'+space+'\n'+home[1]+'\nor\n'+home[0] + '\n\n'
				+ HtmlUnicodeDecode('&#187;')+' Continue with Reset?';				
				if( confirm(msg) ){
					keys = ['SAVED_AVATAR','LAST_SPTITLE','LAST_UPLOADER','HIDE_AVATAR','MIN_ANIMATE','UPDATES_INTERVAL','UPDATES'
					,'QUICK_QUOTE','CUSTOM_SMILEY','TMP_TEXT'
					,'QR_HOTKEY_KEY','QR_HOTKEY_CHAR', 'QR_DRAFT'
					,'LAYOUT_CONFIG','LAYOUT_SIGI','LAYOUT_TPL','PRELOAD_RATE'
					,'QR_LastUpdate','QR_COLLAPSE','QR_LASTPOST'
					,'UPLOAD_LOG','CSS_BULK','CSS_META','SCUSTOM_NOPARSE'
					,'FORUMS_BULK','EXC_PLACES','INC_PLACES','ALL_PLACES'
					,'DYNAMIC_QR','COUNTDOWN'
					];
					var kL=keys.length, waitfordel, alldone=0;
					for(var i=0; i<kL; i++){
						try{
							if( isString(keys[i]) )
								delValue(KS + keys[i], function(){
									alldone++;
									if( alldone >= kL )
										gvar.$w.setTimeout(function() { location.reload(false); }, 500);
								});
						}catch(e){}
					}
				}
			})
		});		
		
		$('#box_cancel, .modal-dialog .modal-dialog-title-close').click(function(){ close_popup() });
		
		$('#box_setting .curent').click();
		$('#'+gvar.tID).blur();
		//_STG.cnv_motion();
	},
	cold_boot: function(){
		var cscontainer = 'tabs-sb-tcustom';
		if( $('#tabs-content-inner').html() == "" || ($('#'+cscontainer).get(0) && $('#'+cscontainer).html()=="") )
			return;

		gvar.smcustom = null;
		$('#'+cscontainer).html();
		_SML_.load_smiley( cscontainer );
	},
	/*
	cnv_motion: function(){
		var xcr = 'var kqr={}; b=document.body;c=document.getElementsByTagName("canvas")[0];a=c.getContext("2d");document.body.clientWidth;(_(){_ l(b,d){return{x:b.x+d.x,y:b.y+d.y}}_ i(b,d){f++;e[f]||(e[f]=0);e[f]+=b;return{x:Math.cos(e[f])*d,y:Math.sin(e[f])*d}}_ r(){var b=i(n,s);a.beginPath();a.moveTo(g.x,g.y);h+=m?-1:1;if(123>=h||250<=h)m=!m;a.fillStyle="rgba(255,"+h+","+h+", .025)";for(var e=0;127>e;e++)f=-1,g=l(g,l(i(o,t),l(i(u,b.x),i(v,b.y)))),a.lineTo(g.x,g.y);a.stroke();a.fill();p=a.getImageData(0,0,c.width,c.height);a.clearRect(0,0,c.width,c.height);a.putImageData(p,d.x,d.y)}_ q(b){return{x:(b.pageX-c.offsetLeft-j)/j,y:(b.pageY-c.offsetTop-j)/j}}var j=300;c.width='+String((document.documentElement.clientWidth/2)+150)+';c.height='+String(getHeight()-2)+';a.lineWidth=0.25;var e=[],f=-1,g={x:450,y:300},k,n=0.005,s=8,o=0.1,t=8,u=-0.05,v=0.5,h=250,m=!0,p;a.strokeStyle="rgba(255,60,0,.15)";a.fillStyle="rgba(255,255,255,.001)";var d;c.onmousemove=_(b){b=q(b);n=0.01*(1-Math.abs(b.y));o=0.1+2.5E-4*b.x};c.onmousedown=_(b){k?k=d=clearInterval(k):(k=setInterval(r,1),d||(a.clearRect(0,0,c.width,c.height),d=q(b),d.x=Math.round(2*d.x),d.y=Math.round(2*d.y)))}})();eO=document.createEvent("MouseEvents"); eO.initEvent("mousedown",true,true);try{c.dispatchEvent(eO)}catch(e){}';
		$.globalEval(xcr.replace(/_/g,'function'));
	},
	*/
	load_rawsetting: function(){
		// collect all settings from storage,. 
		var keys  = ['UPDATES','UPDATES_INTERVAL'
					,'HIDE_AVATAR','QR_HOTKEY_KEY','QR_HOTKEY_CHAR','QR_DRAFT'
					,'LAYOUT_CONFIG','LAYOUT_TPL','CUSTOM_SMILEY'
		];
		//if(gvar.user.isDonatur)  keys.push('PRELOAD_RATE');
		//else keys.push('QR_USE_RECAPCAY','QR_RECAPCAY_PROP');
	
		var keykomeng = {
			 'UPDATES':'Check Update enabled? validValue=[1,0]'
			,'UPDATES_INTERVAL':'Check update Interval (day); validValue=[0< interval < 99]'
			//,'LAST_FONT':'Last Used Font'
			//,'LAST_COLOR':'Last Used Color'
			//,'LAST_SIZE':'Last Used Size'
			//,'LAST_SPTITLE':'Last Used Spoiler Title'
			//,'LAST_UPLOADER':'Last Used Host Uploader'
			//,'DYNAMIC_QR':'Mode QR Dynamic; validValue=[1,0]'
			//,'QUICK_QUOTE':'Mode Quick Quote; validValue=[1,0]'
			//,'AJAXPOST':'Mode AjaxPost; validValue=[1,0]'
			,'QR_DRAFT':'Mode QR-Draft; validValue=[1,0]'
			//,'SAVED_AVATAR':'Buffer of logged in user avatar; [userid=username::avatar_filename]'
			,'HIDE_AVATAR':'Mode Show Avatar. validValue=[1,0]'
			//,'MIN_ANIMATE':'Minify jQuery animate. validValue=[1,0]'
			//,'HIDE_CONTROLLER':'Mode Show Controller; validValue=[1,0]'
			//,'TEXTA_EXPANDER':'Textarea Expander preferences; [isEnabled]; validValue1=[1,0]'
			//,'SHOW_SMILE':'Autoload smiley; [isEnable,smileytype]; validValue1=[1,0]; validValue2=[kecil,besar,custom]'
			//,'WIDE_THREAD':'Expand thread with css_fixup; validValue=[1,0]'
			//,'QR_COLLAPSE':'Mode QR collapsed; validValue=[1,0]'
			,'QR_HOTKEY_KEY':'Key of QR-Hotkey; [Ctrl,Shift,Alt]; validValue=[1,0]'
			,'QR_HOTKEY_CHAR':'Char of QR-Hotkey; validValue=[A-Z0-9]'
			,'LAYOUT_CONFIG':'Layout Config; [userid=isNaN,isEnable_autoLAYOUT]; isEnable\'s validValue=[1,0]'
			//,'LAYOUT_SIGI':'Layout Signature; [userid=SIGI];'
			,'LAYOUT_TPL':'Layout Template; [userid=LAYOUT]; validValue of LAYOUT is must contain escaped {MESSAGE}'
			//,'SCUSTOM_ALT':'Smiley Custom use Alt instead of thumbnail; validValue=[1,0]'
			//,'PRELOAD_RATE':'Preload Rate Thread; validValue=[1,0]'
			//,'QR_USE_RECAPCAY':'Mode reCaptcha; validValue=[1,0]'
			//,'QR_RECAPCAY_PROP':'reCaptcha Properties; validValue=[clean,red,white,blackglass],[0,1]'
			,'SCUSTOM_NOPARSE':'Smiley Custom Tags will not be parsed; validValue=[1,0]'	 
			,'CUSTOM_SMILEY':'Smiley Custom\'s Raw-Data; [tagname|smileylink]'
		};
		
		var z, nn, kL=keys.length, getToday = function(){var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];var d=new Date();return(d.getFullYear().toString() +'-'+ ((d.getMonth()+1).toString().length==1?'0':'')+(d.getMonth()+1)+'-'+(d.getDate().toString().length==1?'0':'')+d.getDate()+', '+days[d.getDay()]+'. '+(d.getHours().toString().length==1?'0':'')+d.getHours()+':'+(d.getMinutes().toString().length==1?'0':'')+d.getMinutes()+':'+(d.getSeconds().toString().length==1?'0':'')+d.getSeconds());};
		var parse_UA_Vers = function(){
			return ( window.navigator.userAgent.replace(/\s*\((?:[^\)]+).\s*/g,' ').replace(/\//g,'-') );
		};
		nn = '\n'; 
		gvar.buftxt = '# QR-Settings Raw-Data'+'\n';
		gvar.buftxt+= '# Version: QR'+(isQR_PLUS!==0?'+':'')+' '+gvar.sversion+'\n';
		gvar.buftxt+= '# Source: http://'+ 'userscripts.org/scripts/show/'+gvar.scriptMeta.scriptID+'\n';
		gvar.buftxt+= '# User-Agent: '+parse_UA_Vers()+'\n';
		gvar.buftxt+= '# Date-Taken: '+getToday()+'\n';
		gvar.buftxt+= nn;		
		
		var query_settings = function(z){
			getValue(KS + keys[z], function(ret){
				var cur_key = keys[z];
				if( ret && cur_key ){					
					gvar.buftxt+= '# '+keykomeng[cur_key] + nn;
					gvar.buftxt+= '[' + cur_key + ']' + nn + ret + nn + nn;
				}
				if( (z+1) < kL ){
					z++;
					query_settings( z );
				}else{
					gvar.$w.setTimeout(function(){
						$('#textarea_rawdata').val( gvar.buftxt ).removeAttr('readonly');
					}, 200);
				}
			});
		};
		z = 0;
		query_settings( 0 );
	}
};

var _CSS = {
	engage:false,
	init:function(){
		_CSS.path_uri = gvar.kqr_static;
		_CSS.css_name = '';
		_CSS.run('', _CSS.callback);
	},
	run: function(fn, cb){
		if( !fn ) fn = 'style.txt';
		GM_XHR.uri = _CSS.path_uri + fn;

		clog('fetch css: ' + GM_XHR.uri);
		GM_XHR.cached = false;
		GM_XHR.forceGM = true;
		GM_XHR.request(null, 'GET', cb);
	},
	callback: function(x){
		x = String( x.responseText );
		if( x ){
			var xname, xL, xparts = x.split('\n');
			xL = xparts.length;
			for(var i=0; i<xL; i++)
				if(trimStr(xparts[i]) != "" ){
					xname = trimStr(xparts[i]);
					break;
				}
			_CSS.css_name = xname;
			_CSS.run(x, _CSS.callback_fin);
		}
	},
	callback_fin: function(x){
		x = trimStr( String( x.responseText ) );
		if( x ) _CSS.set_css(x);
	},
	set_css: function(c, cb){
		setValue(KS + 'CSS_BULK', c, function(){
			GM_addGlobalStyle(c, 'xhr_css', 1);
			
			var metacss = _CSS.css_name + ';' + (new Date().getTime()).toString()

			setValue(KS + 'CSS_META', metacss, function(){
				if(typeof cb=='function') cb();
			});
		});
	}
};

// utk cek update (one_day = 1000*60*60*24 = 86400000 ms) // milisecs * seconds * minutes * hours
// customized from FFixer & userscript_updater
// previous name was : Updater
var _UPD = {
	 caller:''
	,check: function(forced){
		// is not available for addons version
		if(isDefined(isQR_PLUS) && isQR_PLUS!==0) return;
			
		var intval = ( 1000 * 60 * 60 * gvar.settings.updates_interval );
		getValue(KS + 'QR_LastUpdate', function(retlu){
			if( !retlu ) retlu = 0;
			if( forced || (parseInt(retlu) + parseInt(intval) <= (new Date().getTime())) ){
				gvar.updateForced = forced;
				if(!forced) _UPD.caller='';

				GM_XHR.uri = 'http://' + 'userscripts.org'+'/scripts/source/' + gvar.scriptMeta.scriptID + '.meta.js';			
				GM_XHR.cached = false;
				GM_XHR.forceGM = true;
				GM_XHR.request(null, 'GET', _UPD.callback);
			}
		});
	}
	,callback: function(r){	
		var value = ( (new Date().getTime()) + "" );
		
		// debug mode
		//var value = "1111";
		
		setValue(KS+'QR_LastUpdate', value, function(){
			if( $(_UPD.caller).get(0) ){
				$(_UPD.caller).parent().find('.uloader').hide();
				$(_UPD.caller).show();
			}
			try{
				if( r && r.responseText.match(/@timestamp(?:[^\d]+)([\d\.]+)/)[1] > gvar.scriptMeta.timestamp ){
					_UPD.initiatePopup(r.responseText);
					if( gvar.updateForced ){
						close_popup();
						$('#nav-wrapper .update').click();
					}
				}else {
					if(gvar.updateForced){
						alert("No update is available for QR.");      
					}
				}
			}catch(e){}
		});
	}
	,initiatePopup: function(rt){

		$('.button-bottom').append('<div class="baloon-update" style="display:none"><a href="javascript:;">&nbsp;</a></div>');		
		$('.baloon-update').fadeIn(500, function(){
			$('.baloon-update a').click(function(){
				_UPD.meta = _UPD.mparser( rt );
				$('#qr-modalBoxFaderLayer').css('visibility', 'visible').show();
				$('body').prepend( rSRC.getTPLUpdate() );
				$('#modal_update_box').fadeIn(130, function(){
					_UPD.design(); _UPD.event();
				});
				resize_popup_container(450);
			});
		});
	}
	,design: function(){
		var tpl = ''			
			+'<b>New'+' '+gvar.titlename+'</b> (v'+ _UPD.meta.cvv[1]+') is available'
			+'<div style="float:right;"><a class="qbutton" href="http://'+ 'userscripts.org'
			+'/scripts/show/'+gvar.scriptMeta.scriptID+'" target="_blank" title="QR Home in userscripts.org"><b>v'+ _UPD.meta.cvv[1]+'</b></a></div>'
		;
		$('#box_update_title').html( tpl );
		tpl = ''
			+'<h4 class="isclose"><span>&#9654;</span> What\'s New</h4>'
			+'<div class="update-panel toggle-panel" style="display:none;">'
			+ _UPD.meta.news + '<br/>'
			+'</div>'
		;
		$('#content_update').addClass('help-content').html( tpl );
	}
	,event: function(){
		$('#box_cancel, .modal-dialog .modal-dialog-title-close').click(function(){ close_popup() });
		
		$("#content_update h4").click(function(){
			var isclose, cont, h4 = $(this);
			$(this).parent().find('.toggle-panel').slideToggle(160, function () {
				isclose = $(h4).hasClass('isclose');
				cont = $(this);
				if( !isclose ){
					$(cont).slideUp();
					$(h4).addClass('isclose');
				}else{
					$(cont).slideDown(160);
					$(h4).removeClass('isclose');
				}
				$(h4).find('span').html( isclose ? '&#9660;' : '&#9654;');
			});
		});
		$('#box_update').click(function(){
			var fake = 'hid_updateframe', disb = 'jfk-button-disabled';
			if( $('#'+fake).get(0) ) $('#'+fake).remove();
			$('#content_update').append('<ifr'+'ame id="'+fake+'" src="http://' + 'userscripts.org/scripts/source/' + gvar.scriptMeta.scriptID + '.user.js" style="visibility:hidden; position:absolute; border:0; height:0; width:0;"></if'+'rame>');
			$(this).addClass(disb);
			gvar.$w.setTimeout(function(){ $('#box_update').removeClass(disb) }, 4000);
		});
	}	
	,mparser: function(rt){
		var ret = {
			tv:rt.match(/@timestamp(?:[^\d]+)([\d]+)/)||[null],
			cvv:rt.match(/@version(?:[^v\d]+)([\d\.\w]+)/)||[null],
			news:(function(x){
				var r, p, wrp = ['// -!--latestupdate','// -/!latestupdate---'];
				p = [x.indexOf(wrp[0]), x.indexOf(wrp[1])];
				r = (p[0]!=-1 && p[1]!=-1 ? String( x.substring(p[0]+wrp[0].length, p[1]) ).replace(/\/+\s*/gm, function($str,$1){return " ";}) : '');
				return r.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/(?:\r\n|\n|\r)/gi,'<br/>');
			})(rt)
		};
		return ret;
	}
}; // -end UPD

var _QQparse = {
	 init:function(calee, cb){
		//_QQparse.pids = pids;
		var par, mqs_id = [];
		$('.multi-quote.active').each(function(){
			par = $(this).closest('.post-wrapper');
			if( $(par).get(0) ) mqs_id.push( $(par).attr('id') );
		});
		if(mqs_id.length == 0){
			clog('no multiquote, perform to this calee');
			par = $(calee).closest('.post-wrapper');
			if( $(par).get(0) ) mqs_id.push( $(par).attr('id') );
		}else{
			$('#sdismiss_quote').click();
		}
		_QQparse.cb = cb;
		_QQparse.mqs_id = mqs_id;
		_QQparse.title = false;
		_QQparse.start();
	 }
	,start:function(){
		var ret, buff, entrycontent, post_id;
		$.each( _QQparse.mqs_id, function(){
			post_id = this;
			entrycontent = $('#'+post_id).find('.entry-content');
			if( $(entrycontent).get(0) ){
				
				buff = String( $(entrycontent).html() ).replace(/(\r\n|\n|\r|\t|\s{2,})+/gm, "");
				buff = buff.replace(/(?:<\!-{2,}reason\s?[^>]+.)+/gi, '');
				
				ret = _QQparse.parseMSG( buff );
				clog('ret to parseMSG=' + ret);
				
				_TEXT.init();

				if( ret )
					_TEXT.add( '[QUOTE=' + _QQparse.get_quotefrom(post_id) + ']' + ret + '[/QUOTE]'  + "\n\n" );
			}
		});
	},
	get_quotefrom: function(pid){
		var nameStr, el = createEl('div', {}, $('#'+pid).find('.fn').html() );
		nameStr = trimStr($(el).text().toString().replace(/\[\$\]$/, ''));
		$(el).remove();
		return trimStr( nameStr ) + ';' + pid.replace(/^post/i, '');
	},
	clearTag: function(h, tag){
		if( isUndefined(tag) ){
			return trimStr( h.replace(/<\/?[^>]+>/gm,'') )||'';
		}else{
			var re = new RegExp('[\\r\\n\\t]?<\\\/?(?:'+tag+')(?:[^>]+)?.[\\r\\n\\t]?', "gim"); 
			return h.replace(re,'');
		}	
	},
	
	parseTITLE: function(el){
		var _src, _icon_name;
		_src = $('img', $(el));
		
		_src = ( $(_src).get(0) ? basename( $(_src).attr('src') ).replace(/\./g,'') : '' );
		_QQparse.title = {
			icon: _src, text: $(el).text()
		};
	},
	parseMSG: function(x){
		var pCon,els,el,el2,eIner,cucok,openTag,sBox,nLength,LT,pairedEmote;
		var ret, contentsep, pos;
		
		LT = {'font':[],'sp':[],'a':[],'align':[],'coder':[]};
		pairedEmote = false;
		
		var revealQuoteCode = function(html){

			var els,el,el2,el2tmp,tag, cucok, XPathStr='.//span[@class="post-quote"]', rvCon = pCon;
			if( isDefined(html) ){
				// fix align inside spoiler
				html = String(html).replace(/<(\/?)([^>]+)>/gm, parseSerials );
				rvCon = createEl('div',{style:'display:none'},html);
			}
			clog('inside revealQuoteCode\n' + $(rvCon).html() )
			els = $D(XPathStr, rvCon);
			clog(' quote objects len = ' + els.snapshotLength)
			if(els.snapshotLength) for(var i=0;i<els.snapshotLength; i++){
				el = els.snapshotItem(i);
				if( $(el).html().match(/Quote:/) ){
					clog('ada Quote')
					el2 = createTextEl('\n');
					el.parentNode.replaceChild(el2,el);
					
				}
			}
			// remove last edited
			$('.edited', $(rvCon) ).remove();
			return $(rvCon).html();
		}
		,revealCoders = function(html){
			var els,el,cucok, XPathStr = './/div[contains(@style,"margin-bottom")]', rvCon = pCon;
			if( isDefined(html) ){
				// fix align inside spoiler
				html = String(html).replace(/<(\/?)([^>]+)>/gm, parseSerials );
				rvCon = createEl('div',{style:'display:none'},html);
			}
			
			clog('inside revealCoders\n' + $(rvCon).html() )
			els = $D(XPathStr, rvCon);
			clog(' quote objects len = ' + els.snapshotLength)
			if(els.snapshotLength) for(var i=0;i<els.snapshotLength; i++){
				el = els.snapshotItem(i);				
				if(cucok = $(el).html().match(/(?:(HTML|PHP)\s{1})*Code:/)) {
					clog('is coder..' + (cucok && cucok[1] ? cucok[1] : 'CODE') );
					$(el).next().attr('rel', (cucok && cucok[1] ? cucok[1] : 'CODE') );
					
					if(cucok[1]=='PHP' || cucok[1]=='HTML'){
						var _html = (cucok[1]=='PHP' ? $(el).next().find('code').html() : $(el).next().html() );
						if( _html ){
							_html = _html.replace(/<\/?span(?:[^>]+)?>/gim, '')
								.replace(/<br\s*\/?>/g, "\n");
							$(el).next().html( entity_encode(_html) );
						}
					}
				}
				try{Dom.remove(el)}catch(e){};
			}
		}
		,parseSerials = function(S,$1,$2){
			var mct, parts, pRet, lastIdx, tag;

			clog('inside parseSerials 2up=[' + $2.toUpperCase() + ']');
			
			// parse BIU
			if ( $.inArray($2.toUpperCase(), ['B','I','U']) != -1 ){
				return '[' + ($1 ? '/' : '') + $2.toUpperCase() + ']';
			
			}else
			
			if( /^pre\s/i.test($2) || $2.toUpperCase()=='PRE' ){
				// parse code
				mct = $2.toLowerCase().match(/\/?pre(?:(?:\s*(?:\w+=['"][^'"]+.\s*)*)?\s?rel=['"]([^'"]+))?/i);
				
				if( isDefined(mct[1]) ){
					LT.coder.push( mct[1].toUpperCase() );
				}else{
					mct[1] = false;
				}
				
				openTag= ( mct && mct[1] );
				if( openTag )
					mct[1] = mct[1].toUpperCase();
				lastIdx = LT.coder.length-1;
				
				pRet= (openTag ? '['+mct[1]+']' : (isDefined(LT.coder[lastIdx]) ? '['+'/'+LT.coder[lastIdx].toUpperCase()+']' : '') );
				
				if( !openTag )
					LT.coder.splice(lastIdx,1);
				return pRet;
			
			}else
			/*
			if( /^span\s/i.test($2) || $2.toUpperCase()=='SPAN' ){
				// parse code | spoiler        
				mct = $2.match(/\/?span(?:\srel=['"]([^'"]+))?/i);
				
				if( isDefined(mct[1]) ){
					if(mct[1].indexOf('spoiler')!=-1) {
						LT.sp.push('SPOILER');
						parts = mct[1].split('-');
						if( isDefined(parts[1]) && parts[1].length ){
							sBox=createEl('div',{style:'display:none'},mct[1].replace(parts[0]+"-","") );
							parts[1] = trimStr( sBox.childNodes[0].nodeValue );
							try{Dom.remove(sBox)}catch(e){};
						}
						mct[1]='SPOILER="'+(!parts[1] ? "" : parts[1])+'"';
					}else{			  
						LT.sp.push(mct[1]);
					}			
				}else{
					mct[1]=false;
				}
				
				openTag= (mct && mct[1]);
				if( openTag && mct[1].indexOf('=')==-1 )
				mct[1] = mct[1].toUpperCase();
				lastIdx = LT.sp.length-1;
		
				pRet= (openTag ? '['+mct[1]+']' : (isDefined(LT.sp[lastIdx]) ? '['+'/'+LT.sp[lastIdx].toUpperCase()+']' : '') );
				
				if( !openTag )
					LT.sp.splice( lastIdx, 1 );
				return pRet;
			
			}else
			*/
			if( /^font\s+/i.test($2) || $2.toUpperCase()=='FONT' ){
				// parse font;size;color
				mct = $2.match(/\bfont(?:\s{1,}([^=]+).['"]([^'"]+))?/i); // $$1:type; $$2:value
				if( isDefined(mct[1]) ){
					mct[1] = (mct[1]=='face' ? 'font' : mct[1] );
					LT.font.push( mct[1] );
				}
				openTag = (isDefined(mct[2]) && mct[2]);
				lastIdx = LT.font.length-1;
				
				pRet='[' +( openTag ? mct[1].toUpperCase()+'="'+mct[2]+'"' : '/'+(isDefined(LT.font[lastIdx]) ? LT.font[lastIdx].toUpperCase():'???') ) +']';
				if(!openTag) LT.font.splice(lastIdx,1);
				return pRet;      
			
			}else
			if( /^span\s/i.test($2) || $2.toUpperCase()=='SPAN'){
				// parse align
				if( $2.indexOf('align=')!=-1 ){
					
					mct = $2.match(/\/?span(?:\salign=['"]([^'"]+))?/i);
					if( isDefined(mct[1]) ){
						LT.align.push( mct[1].toUpperCase() );
					}					
				}else{
					mct = [0,false];
				}
				
				openTag= ( mct && mct[1] );
				if( openTag )
					mct[1] = mct[1].toUpperCase();
				lastIdx = LT.align.length-1;
				
				pRet= (openTag ? '['+mct[1]+']' : (isDefined(LT.align[lastIdx]) ? '['+'/'+LT.align[lastIdx].toUpperCase()+']' : '') );
				
				if( !openTag )
					LT.align.splice(lastIdx,1);
				return pRet;

			}else
			if( /^div\s/i.test($2) || $2.toUpperCase()=='DIV'){
				// parse html | php
				mct = $2.toLowerCase().match(/\/?div(?:(?:\s*(?:\w+=['"][^'"]+.\s*)*)?\s?rel=['"]([^'"]+))?/i);
				
				if( isDefined(mct[1]) ){
					LT.coder.push( mct[1].toUpperCase() );
					
				}else{
					mct[1] = false;
				}				
				openTag= ( mct && mct[1] );
				if( openTag )
					mct[1] = mct[1].toUpperCase();
				lastIdx = LT.coder.length-1;
				
				pRet= (openTag ? '['+mct[1]+']' : (isDefined(LT.coder[lastIdx]) ? '['+'/'+LT.coder[lastIdx].toUpperCase()+']' : '') );
				
				if( !openTag )
					LT.coder.splice(lastIdx,1);
				return pRet;

			}else
			if( /\shref=/i.test($2) || $2.toUpperCase()=='A' ){
				// parse linkify
				mct = $2.match(/\/?a\s*(?:(?:target|style|title|linkid)=[\'\"][^\'\"]+.\s*)*(?:\s?href=['"]([^'"]+))?/i);
				if( isDefined(mct[1]) ){
					tag = (/^mailto:/.test(mct[1]) ? 'EMAIL' : 'URL' );
					if( tag=='EMAIL' )
						mct[1] = mct[1].replace(/^mailto:/i,'');
					LT.a.push( tag );
				}else{
					mct[1] = false;
				}
				openTag = (mct && mct[1]);
				lastIdx = LT.a.length-1;
				pRet = (mct && mct[1] ? (isDefined(LT.a[lastIdx]) ? '['+LT.a[lastIdx].toUpperCase()+'='+mct[1]+']':'') : (isDefined(LT.a[lastIdx]) ? '['+'/'+LT.a[lastIdx].toUpperCase()+']' : '') );
				
				if( !openTag )
					LT.a.splice(lastIdx,1);
				return pRet;
			
			}else
			if( /^blockquote/i.test($2) ){
				// parse INDENT
				return '[' + ($1 ? '/':'') + 'INDENT]';
		
			}else
			if( /\ssrc=/i.test($2) ){
				// parse img
				mct = $2.match(/\ssrc=['"]([^'"]+)/i);
				
				if( mct && isDefined(mct[1]) ){
					// dirty-youtube || Opera is not supported yet or never --"
					if( /^embed\s*/i.test($2) ){
						cucok = mct[1].replace(/^https?\:\/\/(?:w{3}\.)?youtube\.com\/(?:watch\?v=)?(?:v\/)?/i, '');
						if( mct[1].match(/\byoutube\.com\/(?:watch\?v=)?(?:v\/)?([^&]+)/i) ) {
							cucok = entity_decode( entity_decode( unescape(cucok) ) ); // dua X decode coy
							cucok = entity_encode(cucok);				
							return ( '[YOUTUBE]' + (cucok) + '[/YOUTUBE]' );
						}else{
							return ""; // strip non-youtube flash object.
						}
					}else
					if( cucok=mct[1].match(/\byoutube\.com\/(?:watch\?v=)?(?:v\/)?([^&]+)/i) ){
						if(cucok)
							return ( '[YOUTUBE]' + cucok[1] + '[/YOUTUBE]' );
					}else
					if( cucok=$2.match(/img\s*(?:(?:alt|src|class|border)=['"](?:[^'"]+)?.\s*)*title=['"]([^'"]+)/i)){
						// is kaskus emotes?
						if(cucok){
							var pos, smilies = '/smilies/';
							pos = mct[1].indexOf(smilies);
							tag = mct[1].substring( pos + smilies.length );
							tag = tag.replace(/[^\w]/g,'').toString();
							
							if( !pairedEmote )
								pairedEmote = prep_paired_emotes();
							
							return ( isDefined(pairedEmote[tag]) ? pairedEmote[tag] : '[IMG]' + mct[1] + '[/IMG]' );
						}
					}else {
						return '[IMG]' + mct[1] + '[/IMG]';
					}
				}else{
					return '';
				}
			}else{
				return S;
			}
		}
		,double_encode= function(x){
				return x
						.replace(/\&amp;/gm,'&amp;amp;')
						.replace(/\&lt;/gm,'&amp;lt;')
						.replace(/\&gt;/gm,'&amp;gt;')
						.replace(/<br\s*\/?>/g, "\n");
		};
		
		// make a fake container for this inner x
		pCon = createEl('div', {style:'display:none'}, x);
	
		// clean messy from ksa, based on id=KSA-
		els = $D('.//span[starts-with(@id,"KSA-")]', pCon);
		nLength = (els.snapshotLength-1);
		for(var i=nLength; i>=0; i--){
			el = els.snapshotItem(i);
			if( el ) Dom.remove(el);
		}
		
		// reveal simple quote
		$(pCon).html( revealQuoteCode() );	
		clog('pCon=' + $(pCon).html() );
		
		// reveal title post
		el = $('h2', $(pCon));
		if( $(el).get(0) ){
			clog('judul=' + el.html() );
			_QQparse.parseTITLE( el );
			$('h2', $(pCon) ).remove();
		}
		
		// reveal spoiler inside
		// bbcode_div
		$('.spoiler', $(pCon)).each(function(){
			
			var title, newEl, newhtml, iner = $(this).find('#bbcode_inside_spoiler').html()
			title = $(this).find('i').text();
			newhtml = ('[SPOILER='+ title +']'+ iner +'[/SPOILER]');
			iner = double_encode( newhtml );
			iner = _QQparse.parseMSG( iner );
			
			newEl = ( createTextEl(entity_decode(iner)) );
			$(this).replaceWith( $(newEl) );
		});
		clog('pCon after spoiler=' + $(pCon).html() );
		
		// reveal code inside
		$(pCon).html( revealCoders() );	
		clog('pCon after coder / before x decoded =' + $(pCon).html() );
		
		x = double_encode( $(pCon).html() );		
		clog('x decoded ' + x);
		delete pCon;
		
		// serials parse
		ret = trimStr( String(x).replace(/<(\/?)([^>]+)>/gm, parseSerials ));
		clog('ret=' + ret );
		
		// clean rest (unparsed tags)
		return unescapeHtml( entity_decode(_QQparse.clearTag( ret )) );
	}
	
};

// cross-browser XHR method
var GM_XHR = {
	uri:null,
	returned:null,
	forceGM:false, // force with GM-XHR & avoid using Native-XHR when with multifox
	cached:false,
	events:false,
	request: function(cdata, met, callback){
		if( !GM_XHR.uri ) return;
		met=(isDefined(met) && met ? met:'GET');
		cdata=(isDefined(cdata) && cdata ? cdata : null);
		if( typeof callback != 'function') callback=null;
		var pReq_xhr = {
			method:	met,
			url:	GM_XHR.uri + (GM_XHR.cached ? '' : (GM_XHR.uri.indexOf('?')==-1?'?':'&rnd=') + Math.random().toString().replace('0.','')),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:	(isString(cdata) ? cdata : ''),
			onload:	function(ret) {
				if(ret.status==503){
					clog('Reach 503, retrying...');
					window.setTimeout(GM_XHR.request(cdata,met,callback), 777);
				}else{
					var rets=ret;
					if(callback!=null)
						callback(rets);
					else
						GM_XHR.returned = rets;
				}
			}
		};
		if( !GM_XHR.forceGM ) // always use this native; except update checker
			NAT_xmlhttpRequest( pReq_xhr );
		else
			GM_xmlhttpRequest( pReq_xhr );
	}
};
// native/generic XHR needed for Multifox, failed using GM_xmlhttpRequest.
var NAT_xmlhttpRequest=function(obj) {
	var request = new XMLHttpRequest();
	request.onreadystatechange=function() {
		if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); }
	};
	request.onerror=function() { if(obj.onerror) { obj.onerror(request); } };
	try {
		request.open(obj.method,obj.url,true); 
	}catch(e) {
		if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return;
	}
	if(obj.headers) {
		for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); }
	}
	request.send(obj.data);
	return request;
};

// mode = ['editor', 'saving', 'view']
function validTag(txt, doreplace, mode){
	if( !isString(txt) ) return false;
	var ret, val, title, matches, re, cucok = false;  
	ret = txt;
	matches = {
		"{title:(.+)}" : ['b', '$1'],
		"{sctag:(br)}" : ['br','']
	};
	for(var torep in matches){
		re = new RegExp(torep, "");
		if( ret.match(re) ){
			cucok=true;
			//clog('cur torep='+torep)
			if(isDefined(doreplace) && doreplace){ // must be from view mode
				val = ret.replace(re, matches[torep][1]);
				val = do_sanitize(val);
				ret = '<'+ matches[torep][0] + (matches[torep][0] == 'br' ? '/':'') + '>' + (val && matches[torep][0] != 'br' ? val + '</'+ matches[torep][0] +'>' : '');
			} else if(isDefined(mode) && mode=='editor') {
				// editor mode and it's a BR
				if(torep=='{sctag:(br)}') 
					ret=txt.replace(re, '\n');
				else{
					// guess it should be a title
					title = re.exec( txt );
					//clog('mode='+mode+'; title; title='+title)
					if(re && isDefined( title[1]) ){
						val = do_sanitize( title[1] );
						ret = '{title:'+val+'}\n'; 
					}else{
						ret = txt+'\n'; 
					}
				}
			}
			break;
		}
	}
	return (cucok ? ret : false);              
}

function do_sanitize(text){
	var re, torep, do_it_again, fL, filter, ret = text;
	filter = [
		"[\\\"\\\'][\\s]*(javascript\\:+(?:[^\\\'\\\"]+))[\\\"\\\']"
		,"((?:\\&lt;|<)*script(?:\\&gt;|>)*)"
		,"((?:\\&lt;|<)*\\/script(?:\\&gt;|>)*)"
		,"</?(?:[a-z][a-z0-9]*\\b).*(on(?:[^=]+)=[\\\"\\\'](?:[^\\\'\\\"]+)[\\\"\\\'])"
		,"</?(?:[a-z][a-z0-9]*\\b).+(style=[\\\"\\\'](?:\\w+)\\/\\*[.+]*\\*\\/\\w+\\:[^\\\"]+\\\")"
		,"<[\s]*>"
	];
	do_it_again = '';
	fL = filter.length;
	
	// need a loop until it's really clean | no match patern
	while( do_it_again=='' || do_it_again.indexOf('1')!=-1 ) {
		do_it_again = '';
		for(var idx=0; idx<fL; idx++){
			if( !isString(filter[idx]) ) continue;
			re = new RegExp(filter[idx], "ig");
			if( ret.match(re) ){
				do_it_again+='1';
				torep = re.exec(ret);      
					//clog('replacing='+filter[idx]+'; torep='+torep[1]);
				if( torep && isDefined(torep[1]) )
				ret=ret.replace( torep[1], '' );
			}else{
				do_it_again+='0'; // must diff than (do_it_again=='')
			}
		}
	}
	return ret;
}

function myfadeIn(el,d, cb){
	var no_animate = 1;
	if( !d ) d = 100;
	if( typeof cb != 'function') cb = function(){};
	if(no_animate){
		$(el).show();
		d = parseInt(d);
		if(d > 0) gvar.$w.setTimeout(function(){ cb() }, d);
	}else{
		$(el).fadeIn(d, cb);
	}
}
function myfadeOut(el,d, cb){
	var no_animate = 1;
	if( !d ) d = 100;	
	if( typeof cb != 'function') cb = function(){};
	if(no_animate){
		$(el).hide(); 
		d = parseInt(d);
		if(d > 0) gvar.$w.setTimeout(function(){ cb() }, d);
	}else{
		$(el).fadeOut(d, cb);
	}
}

// load and prep paired kaskus smiley to do quick-quote parsing 
function prep_paired_emotes(){
	// '1' : [H+'ngakaks.gif', ':ngakaks', 'Ngakak (S)']
	// ( !gvar.smbesar || !gvar.smkecil || !gvar.smcustom )
	var sml, paired={}, tmp;
	if( !gvar.smbesar || !gvar.smkecil )
		rSRC.getSmileySet();
	tmp = gvar.smkecil;
	for(var i=0; i < tmp.length; i++){
		sml=tmp[i];
		paired[ sml[0].replace(/[^\w]/g,'').toString() ] = sml[1].toString();
	}
	tmp = gvar.smbesar;
	for(var i=0; i < tmp.length; i++){
		sml = tmp[i];
		paired[sml[0].replace(/[^\w]/g,'').toString()] = sml[1].toString();
	}	
	return paired;
}

function wrap_layout_tpl(text){
	var conf = String(gvar.settings.userLayout.config).split(',');	
	return (conf[1] == 1 ? gvar.settings.userLayout.template.replace(/{message}/gi, text) : text);
}

// domain guest
function domainParse(){
	var r, l = location.hostname
	return {"prot": location.protocol, "host": l, "statics" : l.replace(/^\w{3}\./i, 'kkcdn-static.')};
}


//=== mini-functions
// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }

function _o(m,e,f){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
function basename(path, suffix) {
  // Returns the filename component of the path  
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: basename('/www/site/home.htm', '.htm');    // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  var b = path.replace(/^.*[\/\\]/g, '');
  if(typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix)
    b = b.substr(0, b.length-suffix.length);
  return b;
};
function gID(x) { return document.getElementById(x) }

// native clean-up fetched post
function unescapeHtml(text){
	if( !text ) return;
	var tL, cleanRet='', temp = createEl('div',{},text);
	tL = temp.childNodes.length;
	for(var i=0; i<tL; i++){
		if( typeof(temp.childNodes[i])!='object' ) continue;
		cleanRet += (function (t){
						return t.replace( /\&\#(\d+);/g, function( ent, cG ){return String.fromCharCode( parseInt( cG ) )})
					})(temp.childNodes[i].nodeValue);
	}
	try{ temp.removeChild(temp.firstChild) }catch(e){}
	return cleanRet;
}
function entity_decode(S){
	return S.replace(/\&gt;/gm,'>').replace(/\&lt;/gm,'<').replace(/\&amp;/gm,'&');
}
function entity_encode(S){
	return S.replace(/>/gm,'&gt;').replace(/</gm,'&lt;');
}

function createTextEl(a) {
	return document.createTextNode(a)
}
function createEl(a, b, c) {
	var d = document.createElement(a);
	for (var e in b) if (b.hasOwnProperty(e)) d.setAttribute(e, b[e]);
	if (c) d.innerHTML = c;
	return d
}
function HtmlUnicodeDecode(a){
 var b="";if(a==null){return(b)}
 var l=a.length;
 for(var i=0;i<l;i++){
  var c=a.charAt(i);
  if(c=='&'){
    var d=a.indexOf(';',i+1);
    if(d>0){
      var e=a.substring(i+1,d);
      if(e.length>1&&e.charAt(0)=='#'){
        e=e.substring(1);
        if(e.charAt(0).toLowerCase()=='x'){c=String.fromCharCode(parseInt('0'+e))}else{c=String.fromCharCode(parseInt(e))}
      }else{
        switch(e){case"nbsp":c=String.fromCharCode(160)}
      }i=d;
    }
  }b+=c;
 }return b;
};
function toCharRef(text){
    var charRefs = [], codePoint, i;
    for(i = 0; i < text.length; ++i) {
        codePoint = text.charCodeAt(i);
        if(!text[i].match(/[\w\[\]\<\>\s\?\'\"\;\:\=\+\-\_\)\(\&\^\$\%\#\@\*\.\,\!\~\}\{\|\/\r\n]/)){
         if(0xD800 <= codePoint && codePoint <= 0xDBFF) {
            i++;
            codePoint = 0x2400 + ((codePoint - 0xD800) << 10) + text.charCodeAt(i);
         }
         charRefs.push('&#' + codePoint + ';');
        }else
          charRefs.push(text[i]);
    }
    return charRefs.join('');
};
function do_an_e(A) {
  if (!A) {
      window.event.returnValue = false;
      window.event.cancelBubble = true;
      return window.event
  } else {
      A.stopPropagation();
      A.preventDefault();
      return A
  }
}
function selectAll(e){
	e = e.target||e;
	if(typeof(e)!='object') return false;
	e.setSelectionRange(0, e.value.length );
}

function getHeight(){
  var y = 0;
  if (self.innerHeight){ // FF; Opera; Chrome
     y = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight){ 
     y = document.documentElement.clientHeight;
  } else if (document.body){
     y = document.body.clientHeight;
  }
  return y;
};
function getCurrentYPos() {
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (gvar.$w.pageYOffset)
      return gvar.$w.pageYOffset;
    return 0;
}

function getValue(key, cb) {
	var ret, data=OPTIONS_BOX[key];
	if( !data ) return;
	//return (!data ? '': GM_getValue(key,data[0]));
	//gvar.$w.setTimeout(function(){ ret = GM_getValue(key,data[0]) }, 0);
	setTimeout(function(){
		ret = GM_getValue(key,data[0]);
		if(typeof(cb)=='function')
			cb(ret);
		else if(cb)
			cb = ret;
		else
			return ret;
	}, 0);
	//return (!data ? '': ret );
}
function setValue(key, value, cb) {
	var ret, data=OPTIONS_BOX[key];
	if( !data ) return;
	//return (!data ? '': GM_setValue(key,value));
	//gvar.$w.setTimeout(function(){ GM_setValue(key,value) }, 0);
	setTimeout(function(){
		ret = GM_setValue(key,value)
		if(typeof(cb)=='function')
			cb(ret);
		else if(cb)
			cb = ret;
		else
			return ret;
	}, 0);
	//return (!data ? '': ret ); 
}
function delValue(key, cb){
	try{
		setTimeout(function() {
			ret = GM_deleteValue( key );
			if( typeof(cb)=='function' )
				cb(ret);
		}, 0);
	}catch(e){}
}

function setValueForId(userID, value, gmkey, sp){
	if( !userID ) return null;
	
	sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];
	var i, ksg = KS+gmkey, info;
	getValue(ksg, function(val){
		info = val;
		if( !info ){
			setValue(ksg, userID+"="+value);
			return;
		}
		info = info.split( sp[0] );
		for(i=0; i<info.length; i++){
			if(info[i].split('=')[0]==userID){
				info.splice(i,1,userID+"="+value);
				setValue(ksg, info.join(sp[0]));
				return;
			}
		}
		
		info.splice(i, 0, userID+"="+value);
		setValue(ksg, info.join(sp[0]));		
	});
}

// values stored in format "userID=value;..."
// sp = array of records separator
// gvar.user.id, 'LAYOUT_TPL', ['<!>','::'], function
function getValueForId(userID, gmkey, sp, cb){
	if( !userID ) return null;
	clog(gmkey + ' inside');
	
	sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];    
	var info, capsulate_done=0, retValue=null;
	getValue(KS + gmkey, function(val){
		if( !val ) {
			
			clog(gmkey + ' halted');
			
			retValue = null;
			capsulate_done = 1;
			return;
		}
		info = val.split( sp[0] );
		clog(gmkey + ' info=' + info);
		
		for(var i=0; i<info.length; i++){
			if( !isString(info[i]) ) continue;
			var recs = info[i].split('=');			
			if( recs[0]==userID ){
				var rets = [userID], values = recs[1].split(sp[1]), vL=values.length;
				for(var idx=0; idx<vL; idx++){
					if( !isString(values[idx]) ) continue;
					rets.push(values[idx]);
				}
				retValue = rets;
				break;
			}
		}
		capsulate_done = 1;
		if( rets ) retValue = rets;
		if( typeof cb == 'function' ) cb( retValue );
	});
	
	var waitTillDone = function(){
		if( !capsulate_done ){
			gvar.$w.setTimeout(function(){ waitTillDone() }, 1)
		}else{}
	};
	waitTillDone();
}
function delValueForId(userID, gmkey){
	var ksg = KS+gmkey, tmp=[], info = getValue(ksg);
	info = info.split(';');
	for(var i=0; i<info.length; i++){
		if(info[i].split('=')[0]!=userID)
			tmp.push(info[i]);    
	}
	setValue(ksg, tmp.join(';'));
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

//=== functions

function tokcap_parser(page, mode){
	try{
		page = decodeURIComponent( page );
	}catch(e){
		//page = page.replace(/\\\"/g, '').replace(/(\r\n|\n|\r)/gm, "").toString()
		
		
		page = page.replace(/\\\"/g, '').replace(/(\r\n|\n|\r|\t|\s{2,})/gm, "").replace(/\%/gm, '%25').toString();
		//page = decodeURIComponent( page );
		
		clog('decodeURI in tokcap_parser failed');
		clog('secondary result of page = ' + page)
		
	}
	
	// conform user is the same and is not donat; else update hash & sec.token
	//if( !/\bmember\.php\?u=(\d+)/.test(page) || page.indexOf('security token was invalid.<br')!=-1 || gvar.user.isDonatur ){ return false; }	
	
	var cucok, match, rets=[0,0];
	//if(cucok = /<input\s+(?:(?:[^\=]+).(?:[\'\"][^\'\"]+.)\s+)+name=[\'\"]securitytoken[\'\"]\s+value=[\'\"]([^\'\"]+)/i.exec(page) ){
	if(cucok = /out\/\?\&hash=([^\'\"]+)/i.exec(page) ){
		
		clog('old securitytoken=' + gvar._securitytoken);
		
		//if( mode && mode!='quote' )
		{
			gvar._securitytoken = rets[1] = cucok[1];
			$('#qr-securitytoken').val(gvar._securitytoken);
		}
		clog('\n'
			+'securitytoken updated = ' + gvar._securitytoken 
			+'\n'
			+'securitytoken onfield = ' + $('#qr-securitytoken').val()
			+'\n'
		);
		
	}else{
		clog('Page is not containing securitytoken, update failed');
		clog('sdata - page='+page);
	}
	
	if( match = /recaptcha_response_field/i.exec(page) ){
		// recaptcha autodetect | force gvar.settings.recaptcha value  
		gvar.settings.recaptcha = true;
		clog('Forced gvar.settings.recaptcha ON');
	}else if( match = /id=\"hash\".*value=\"(\w+)/im.exec(page) ){
		// kaskus image capcay
		if(gvar.settings.recaptcha && gID('#imgcapcay'))
			$('#imgcapcay').html( '<input id="hash" name="humanverify[hash]" value="'+match[1]+'" type="hidden">\n' );
		rets[0] = match[1];
	}else if( match = /humanverify[^\>]+.Hitung\:\s?([^\=]+)/i.exec(page) ){
		// kaskus capcay cacat
		gvar.CAPCAT = true;
		gvar.soal_cacats = match[1];
		gvar.ans_cacats = try_solve( gvar.soal_cacats );
	}else gvar.CAPCAT = false;
	
	return (cucok ? rets : false);
}

//==
function try_solve(sol){
	var a, r;
	if( a = /(\d+)([\Wa-z])(\d+)/i.exec(sol.replace(/\s/g, '')) ){
		a[1] = parseInt(a[1]); a[3] = parseInt(a[3]); 
		switch( a[2] ){
			case "+": r = (a[1]+a[3]); break;
			case "x": r = (a[1]*a[3]); break;
			case ":": r = (a[1]/a[3]); break;
			case "-": r = (a[1]-a[3]); break;
		}
	}
	return r;
}
//==

function inteligent_width( mode ){
	if(!mode) mode = '';
	// inteligent width-detector
	gvar.$w.setTimeout(function(){
		var ct, L, leb, upkey, imgs=[];
		ct =' .clickthumb';
		leb = parseInt($('#preview-image .preview-image-unit').length);
		L = ( leb > 0 ? (leb * 57)+'px' : '100%');
		if( leb > 0 ) {
			$(ct).show();
		}else{
			$(ct).hide();
		}		
		$('#preview-image').css('width',  L);
		$('#preview-image-outer').css('visibility', 'visible');
		
		// update log
		$('#preview-image img').each(function(){
			imgs.push($(this).attr('src'));
		});
		
		upkey = 'UPLOAD_LOG';
		if( mode=='' ){
			// save history upload
			getValue(KS + upkey, function(ret){				
				imgs = ret.split(',');
				if( ret && imgs.length > 0 ){
					$.each(imgs, function(){
						var tpl, _src=this;
						tpl = ''
							+'<div class="preview-image-unit">'
							+ '<img src="'+ _src +'" width="46" height="46" alt="[img]'+ _src +'[/img]" />'
							+ '<span title="remove" class="modal-dialog-title-close imgremover"/>'
							+'</div>'
						;
						$('#preview-image').append( tpl );
					});
				}				
			});
		}else{
			// whether is [insert, delete]
			setValue(KS + upkey, String(imgs));
		}
		
	}, 10);
}

function pos_verticalizing(){
	if( $('.vertical-text').is(':visible') ){		
		var vH, vW = Math.round(parseInt($('.vertical-text').width()) / 2) + 33;
		vH = (vW / 2) + 10;
		$('.vertical-text')
			.css('margin-left', '-'+ vW +'px')
			.css('bottom', '-'+ vH +'px')
			.css('visibility', 'visible');
	}
}

function clear_quoted(){
	$('.active').each(function(){ $(this).click() });
	$('#qr_remoteDC').click();
	_NOFY.dismiss();
}

function precheck_quoted( injected ){
	var cb_after, no_mqs = ($('.active').length == 0);
	if(!injected && no_mqs && $("#tmp_chkVal").val()==""){
		_NOFY.dismiss(); return;
	}
	cb_after = function(){
		$('#sdismiss_quote').click(function(){ clear_quoted() });
		//$('#squick_quote').css('display', (($('.active').length == 0) ? 'none':'') );
		$('#squick_quote').css('display', 'none' ); // always as it is not functional yet
	};
	_NOFY.init({mode:'quote',msg:'You have selected one or more posts. <a id="sdismiss_quote" href="javascript:;">Deselect</a>', cb:cb_after, btnset:true});
}

function close_popup(){
	try {
		gvar.sTryEvent.abort();
		gvar.sTryRequest.abort();
		if(gvar.$w.stop !== undefined){gvar.$w.stop()}
		else if(document.execCommand !== undefined){document.execCommand("Stop", false)}
	} catch (e) {}
	
	if( !gvar.user.isDonatur && $('body > #modal_capcay_box').get(0) ){
		var tgt = $('#wraper-hidden-thing #modal_capcay_box'), live=$('body > #modal_capcay_box'), ri='#recaptcha_image', rcf='#recaptcha_challenge_field';
		$(tgt).find(ri).replaceWith( $(live).find(ri) );
		$(tgt).find(rcf).replaceWith( $(live).find(rcf) );
	}
		
	$('#'+_BOX.e.dialogname).css('visibility', 'hidden');
	$('body > .modal-dialog').remove();
	$('#qr-modalBoxFaderLayer .cnv').remove();
	$('body').removeClass('hideflow');
	$('#'+gvar.tID).focus();
}

// action to do insert smile
function do_smile(Obj, nospace){
	var bbcode, _src, tag='IMG';
	
	_TEXT.init();
	bbcode = Obj.attr("alt");
	
	if(bbcode && bbcode.match(/_alt_.+/)) {
		// custom mode using IMG tag instead
		_src=Obj.attr("src");
		_TEXT.setValue( '['+tag+']'+_src+'[/'+tag+']' + (!nospace ? ' ':''));
	}else if( Obj.get(0).nodeName != tag ) {
		bbcode=Obj.attr("title");
		_src = bbcode.split(' ' + HtmlUnicodeDecode('&#8212;'));
		//alert(_src[1].replace(/\)/g,'&#41;').replace(/\(/g,'&#40;'));
		_TEXT.setValue( _src[1] + (!nospace ? ' ':''));  
	}else{
		_TEXT.setValue(bbcode + (!nospace ? ' ':'') );
	}
	_TEXT.pracheck();
}

// action to do insert font/color/size/list
function do_insertTag(tag, value){
	_TEXT.init();
	if(value) 
		_TEXT.wrapValue(tag,'"'+value+'"');
	else
		_TEXT.wrapValue(tag);
}

// action to do insert media,codes,quote
function do_insertCustomTag(tag){
	_TEXT.init();
	
	var text, prehead, tagprop, ptitle, selected, ret;
	var pTag={
		 'quote':'QUOTE','code' :'CODE','html' :'HTML','php' :'PHP'
		,'link' :'URL',  'picture':'IMG'
		,'spoiler' :'SPOILER','transparent':'COLOR','noparse' :'NOPARSE', 'youtube' :'YOUTUBE'
		,'strike' :''
	};  
	var endFocus = function(){ _TEXT.focus(); return};
	if( isUndefined(pTag[tag]) ) return endFocus();
	selected = _TEXT.getSelectedText();
	tagprop = '';
	
	if(tag=='quote' || tag=='code' || tag=='html' || tag=='php'){
		_TEXT.wrapValue( tag );  
	}else if(tag=='spoiler'){
		// dummy
		//gvar.settings.lastused.sptitle = '';
		
		var title = prompt('Please enter the TITLE of your Spoiler:', '' );
		if(title==null) return endFocus();
		title = (title ? title : ' ');
		//gvar.settings.lastused.sptitle = trimStr(title);
		//setValue(KS+'LAST_SPTITLE', title);
		_TEXT.wrapValue( 'spoiler', title );	
		
	}else if(tag=='strike'){
		
		var strikeEm = function(t){
			var pr = t.split(''), r='';
			for(var i=0;i<pr.length;i++) r+=pr[i]+'\u0336';
			return String(r)
		};
		text = (selected!= '' ? selected :
			prompt('Please enter Text to strikethrough:', 'strikethrough') 
		);		
		if(text==null) return endFocus();
		ret = strikeEm(text);
		prehead = [0,(text.length*2)];
		if(selected=='')
			_TEXT.setValue( ret, prehead );
		else
			_TEXT.replaceSelected( ret, prehead );
	
		return endFocus();
	}else{

		var is_youtube_link = function(text){
			text = trimStr ( text ); //trim
			var rx;
			if( rx = text.match(/\byoutube\.com\/(?:watch\?v=)?(?:v\/)?([^&]+)/i) ){
				text = ( rx ? rx[1] : '');
			}else if( !/^[\d\w-]+$/.test(text) )
				text = false;
			return text;
		};
		
		if(selected==''){
			switch(tag){
			case 'transparent':
				tagprop = tag;
				text = prompt('Please enter the Text to be transparent:', 'text hantu');
			break;
			case 'noparse':
				text = prompt('Please enter Text or/with Tags to be no parsed:', '[code]-CODE-[/code]');
			break;
			case 'link':
				text = prompt('Please enter the URL of your link:', 'http://');
				tagprop = text;
			break;
			case 'picture':
				text = prompt('Please enter the URL of your image:', 'http://');
			break;
			case 'youtube':
				text = prompt('Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########', '');
			break;
			}
			if(text==null) return endFocus();
			if(tag=='youtube')
				text = is_youtube_link(text);
			if(tag=='link' || tag=='picture')
				text = (isLink(text) ? text : null);
			if( !text ){
				return endFocus();
			}else{
				prehead = [('['+pTag[tag] + (tagprop!=''?'='+tagprop:'')+']').length, 0];
				prehead[1] = (prehead[0]+text.length);        
				_TEXT.setValue( '['+pTag[tag] + (tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
			}
			return endFocus();
		} // end selected==''		
		
		tagprop = (tag=='transparent' ? 'transparent' : '');
		if(tag=='link'||tag=='image'||tag=='youtube'){
		
			ptitle=(tag=='youtube' ? ['Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########',''] : ['Please enter the URL of your '+tag+':','http://']);
			text = prompt( ptitle[0], ptitle[1] );
			if(text==null) return endFocus();
		
			switch(tag){
				case 'link':
					tagprop = text;
					text = selected;           
				break;
				case 'youtube':
					text = is_youtube_link(text);
					if(!text) return endFocus();
				break;
			}
			prehead = [('['+ pTag[tag] + (tagprop!=''?'='+tagprop:'')+']').length, 0];
			prehead[1] = (prehead[0]+text.length);
			_TEXT.replaceSelected( '['+pTag[tag] + (tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
			return endFocus();
		}
		_TEXT.wrapValue( pTag[tag], (tagprop!='' ? tagprop:'') );
	}
}


function click_BIU(title){
	var pTag={
		'bold' :'B',    'italic' :'I',      'underline':'U',
		'left' :'LEFT', 'center' :'CENTER', 'right'    :'RIGHT'
	};
	if(title.indexOf('align ')!=-1) title = title.replace('align ','');
	if( isUndefined( pTag[title]) ) return;
	
	_TEXT.init();
	_TEXT.wrapValue( pTag[title], '' );
	_TEXT.pracheck();
}



function eventsController(){
	$('#title').focus(function(){
		var T=$(this), par = T.parent();
		if( par.attr('class').indexOf('condensed')!=-1 ){
			par.removeClass('condensed');
			T.val('');
		}
	}).blur(function(){
		var T=$(this), par = T.parent();
		if( trimStr( T.val() )=="" ){
			T.val( gvar.def_title );
			par.addClass('condensed');
		}
	}).keydown(function(ev){
		if(ev.keyCode==9)
			gvar.$w.setTimeout(function(){ $('#'+gvar.tID).focus() }, 50);
	}).keyup(function(){
		if ($(this).val() != "") $("#close_title").show();
		else $("#close_title").hide()
	});
	
	$("#pick_icon").click(function () {
		gvar.$w.clearTimeout(gvar.sTryEvent);
		$("#menu_posticon").slideToggle(120, function () {
			if ($("#menu_posticon").is(":visible")) $("#fakefocus_icon").focus();
			else $("#title").focus()
		})
	});
	$("#fakefocus_icon").blur(function () {
		if ($("#menu_posticon").is(":visible")) gvar.sTryEvent = gvar.$w.setTimeout(function () {
			$("#pick_icon").click()
		}, 200)
	});
	
	$("#menu_posticon li a").each(function () {
		$(this).click(function () {
			var img = $(this).find("img");
			$("#hid_iconid").attr("checked", true);
			$("#hid_iconid").val($(this).attr("data-rel"));
			if (img.length == 0) {
				$("#img_icon").hide();
				return
			}
			$("#img_icon").attr("src", img.attr("src")).show()
		})
	});
	$("#close_title").click(function () {
		$("#title").val("").focus();
		$("#close_title").hide()
	});
	
	// menus
	$('#mnu_add_title').click(function(){
		$('.title-message').slideToggle(200, function(){
			if( !$('.title-message').is(":visible") ){
				$("#hid_iconid").val(0);
				$("#img_icon").attr("src", "#").hide();
				$("#title").val("");
				$("#close_title").hide()
			}else{
				$("#title").focus()
			}
			$("#hid_iconid").attr("checked", true)
		});
	});
	
	
	// render font's fonts
	$('.fonts ul li a').each(function(){ $(this).css('font-family', $(this).attr('title')) });
	
	$('.markItUpDropMenu').each(function(){		
		$(this).hover(function() {
			$(this).find('> ul').show();
			var that = $(this);
			// close dropmenu if click outside
			$(document).one('click', function() { $(that).find('> ul').hide() });
		}, function() {
			gvar.$w.clearTimeout( gvar.sTryHoverMenu );
			$(this).find('> ul').hide()
		});
	});
	
	// main-controller
	$('.markItUpButton a').each(function(){
		var el = $(this), _cls = el.attr('class'), par = el.parent();
		if( _cls && _cls.indexOf('ev_') != -1 ){
			_cls = _cls.replace(/ev_/,'');
			var tag, title, pTag;
			
			switch(_cls){
			 case "biu": case "align":
				el.click(function(){
					title = $(this).attr('title').toLowerCase();
					click_BIU( title );
				});
			 break;
			 case "font":
				el.click(function(){
					_TEXT.init();
					do_insertTag('FONT', $(this).attr('title'));
					
					_TEXT.pracheck();
				});
			 break;
			 case "size":
				el.click(function(){
					_TEXT.init();
					do_insertTag('SIZE', $(this).attr('title'));
					
					_TEXT.pracheck();
				});
			 break;
			 case "color":
				el.click(function(){
					_TEXT.init();
					do_insertTag('COLOR', $(this).attr('title'));
					
					_TEXT.pracheck();
				});
			 break;
			 case "list":
				el.click(function(){
					_TEXT.init();
					var mode, title = $(this).attr('title').toLowerCase().replace(' list', '');
					
					mode=(title=='numeric' ? 'number':'dot'), selected = _TEXT.getSelectedText();
					
					if(selected=='') {
						var reInsert = function(pass){
							var ins=prompt("Enter a list item.\nLeave the box empty or press 'Cancel' to complete the list:");
							_TEXT.init();
							if( isUndefined(pass) ) _TEXT.setValue( '\n' );
							if(ins){
								_TEXT.setValue( '\n' + '[*]' + ins + '');
								reInsert(true);
							}else{
								return;	
							}
						};  
						do_insertTag('LIST', (mode=='number' ? 1:false) );
						reInsert();
					}else{					
						var ret = '', parts = selected.split('\n');
						for(var i=0; i< parts.length; i++)
							if(trimStr(parts[i])) ret+= '\n' + '[*]' + parts[i] + '';
						ret = '[LIST'+(mode=='number' ? '="1"' : '')+']' + ret + '\n[/LIST]';
						_TEXT.replaceSelected( ret, [0, ret.length] );
					}					
					_TEXT.pracheck();
				});
			 break;
			 case "media":
				el.click(function(){
					tag = $(this).attr('data-bbcode');
					do_insertCustomTag( tag );
					
					_TEXT.pracheck();
				});

			 break;
			 case "codes":
				el.click(function(){
					tag = $(this).attr('data-bbcode');
					do_insertCustomTag( tag );
					
					_TEXT.pracheck();
				});

			 break;
			 case "quotes":
				el.click(function(){
					tag = $(this).attr('data-bbcode');
					do_insertCustomTag( tag );
					
					_TEXT.pracheck();
				});
			 break;
			 case "misc":
				el.click(function(){
					tag = $(this).attr('data-bbcode');					
					do_insertCustomTag( tag );
					
					_TEXT.pracheck();
				});
			 break;
			 case "smiley":
				el.click(function(){
					var cbs = '.box-smiley', tgt_autoload = null;
					if( !$(cbs).is(':visible') ){
						if( !$(cbs).hasClass('events') ){
								clog('bloom ber events')
							$(cbs + ' .goog-tab').each(function(){
								var id, T = $(this);
								$(this).hover(
									function(){$(this).addClass('goog-tab-hover')},
									function(){$(this).removeClass('goog-tab-hover')}
								);
								$(this).click(function(){
									var tid = $(this).attr('id');
									if( tid ){
										$(this).parent().find('.goog-tab-selected').removeClass('goog-tab-selected');
										$(this).addClass('goog-tab-selected');
										
										// switch to sandboxed
										_SML_.load_smiley( 'tabs-sb-' + tid );
									}else{
										// it must be close tab //close-tab
										_SML_.toggletab(false);
									}
								});
							});
							if(gvar.settings.autoload_smiley[0] == 1)
								tgt_autoload = gvar.settings.autoload_smiley[1];
							
							_SML_.init();
						}
						_SML_.toggletab(true);
						
						if(tgt_autoload && gvar.freshload)
								$('div.goog-tab#t'+tgt_autoload).click();
						
					}else{
						_SML_.toggletab(false);
					}
				});

			 break;
			 case "upload":
				el.click(function(){
					var cbu = '.box-upload';
					if( !$(cbu).is(':visible') ){
						if( !$(cbu).hasClass('events') ){
							$(cbu + ' .goog-tab').each(function(){
								var id, T = $(this);
								T.hover(
									function(){T.addClass('goog-tab-hover')},
									function(){T.removeClass('goog-tab-hover')}
								).click(function(){
									if( !T.attr('id') ){
										// it must be close tab //close-tab
										_UPL_.toggletab(false);
									}
								});
							});
							_UPL_.init();
						}else{
							_UPL_.toggletab(true);
						}
					}else{
						_UPL_.toggletab(false);
					}
				});
			 break;
			} // end switch

		}
	});
	
	
}

// proses event triger setelah start_main selesai me-layout template
function eventsTPL(){
	gvar.sTryEvent = null;
	
	$('#sbutton').click(function(ev){
		do_an_e(ev);
		_BOX.init();
		_BOX.presubmit();
	});
	$('#sadvanced').click(function(ev){
		do_an_e(ev);
		if( $('#title').closest('div.condensed').length == 1 )
			$('#title').val("");
		$('#formform').submit();
	});
	$('#spreview').click(function(ev){
		do_an_e(ev);
		_BOX.init();
		_BOX.preview();
	});
	$('#squote_post').click(function(){		
		_AJAX.quote( $(this), function(){
			var func = function(){
				$('#dismiss_request').click(function(){ _NOFY.dismiss() });
			};
			_NOFY.init({msg:'Fetching... <a id="dismiss_request" href="javascript:;">Dismiss</a>', cb:func, btnset:false});
		}, function(){
			clear_quoted();
			_TEXT.lastfocus();
		});
	});
	$('#squick_quote').click(function(){
		
	
	});
	
	$('#scancel_edit').click(function(){ _AJAX.edit_cancel() });
	$('#clear_text').click(function(){
		_TEXT.set("");
		_TEXT.pracheck();
		_DRAFT.provide_draft()
		$(this).hide()
	});
	$('#qr_chkval').click(function(){
		precheck_quoted( $('#tmp_chkVal').val() );
	});
	$('.sidebar-user').hover(function(){
		gvar.sTryMenus = gvar.$w.setTimeout(function(){ $('.sidebar-user .toggle-sidebar-wrap').show() }, 600)
	}, function(){
		gvar.$w.clearTimeout(gvar.sTryMenus);
		$(this).find('.toggle-sidebar-wrap').hide()
	});
	$('#toggle-avatar, .vertical-text').click(function(){
		var todo = $(this).attr('data-todo');
		if(todo=='avatar'){
			$('.sidebar-user').show();
			$('.vertical-text').hide();
		}else if(todo=='side'){
			$('.sidebar-user').hide();
			var vW = $(this).width();
			$('.vertical-text').show();
			pos_verticalizing();
		}
		setValue(KS+'HIDE_AVATAR', String(todo!='avatar' ? '1':'0'), function(ret){
			gvar.settings.hideavatar=(todo!='avatar' ? '1':'0');
		});
		
		resize_popup_container();
		_TEXT.focus();
	});
	$('#settings-button').click(function(){
		_STG.init();
	});
	gvar.maxH_editor = ( parseInt( getHeight() ) - gvar.offsetEditorHeight );
	_TEXT.setElastic(gvar.maxH_editor);
	$('#'+gvar.tID).keydown(function(ev){
		var B, A = ev.keyCode || ev.keyChar, pCSA = (ev.ctrlKey ? '1':'0')+','+(ev.shiftKey ? '1':'0')+','+(ev.altKey ? '1':'0');
		
		if(A === 9){
			do_an_e(ev);
			gvar.$w.setTimeout(function(){ $('#sbutton').focus() }, 50);
		}
		
		
		// area kudu dg CSA
		if( (pCSA=='0,0,0' || pCSA=='0,1,0') || (A < 65 && (A!=13 && A!=9)) || A > 90 )
			return;
		
		var asocKey={
			 '83':'sbutton'		// [S] Submit post
			,'80':'spreview'	// [P] Preview
			,'88':'sadvanced'	// [X] Advanced
			
			,'66' : 'bold' // B
			,'73' : 'italic' // I
			,'85' : 'underline' // U
			
			,'69' : 'center' // E
			,'76' : 'left' // L
			,'82' : 'right' // R
		};
		if(ev.ctrlKey){

			if( $.inArray( A, [13,66,73,85,69,76,82] ) != -1 ){
				do_an_e(ev);
				if(A===13)
					$('#sbutton').click();
				else
					click_BIU( asocKey[A] );
			}
		}else if(ev.altKey){
			do_an_e(ev);
			$('#' + asocKey[A]).click();
		}
		
	}).keyup(function(ev){
		$('#clear_text').toggle( $(this).val()!=="" );
	});

	if( gvar.settings.qrdraft ){
        $('#'+gvar.tID).keypress(function(e){
            var A = e.keyCode;
            if( A>=37 && A<=40 ) return; // not an arrow
            if( $('#qrdraft').get(0) )
				_TEXT.saveDraft(e);
            clearTimeout( gvar.sITryLiveDrafting );
            gvar.isKeyPressed=1; _DRAFT.quick_check();
			//updateCounter(gvar.additionalLength);
        });
		
		// initialize draft check
		_DRAFT._construct();
        _DRAFT.check();

		// event click for save_draft
		$("#qrdraft").click(function(){
			var text, disb, me=$(this);
			text = $('#'+gvar.tID).val();
			disb = 'jfk-button-disabled';
			if( me.hasClass(disb) ) return;
			if( me.attr('data-state') == 'idle' ){
				_TEXT.init();
				if( text == gvar.silahken || text=="" )
					_TEXT.set( gvar.tmp_text );
				else
					_TEXT.add( gvar.tmp_text );
				$('#draft_desc').html('');
				me.html('Saved').attr('data-state', 'saved');
				_DRAFT.switchClass(disb);
				_TEXT.setElastic(gvar.maxH_editor);
			}else{                
				if( text!=gvar.silahken && text!="" )
					_DRAFT.save();
			}
		});
	}
	
	eventsController();
	resize_popup_container(); // init to resize textarea
}

function get_userdetail() {
    var a = {id: null, name: "", photo:null, isDonatur: false}
	  , b, c = $("#profile-nav .m-panel .fn"), d = $('.img-wrp .photo');
    if( c.get(0) ){
        a["name"] = c.html();
        if (b = /\/profile\/(\d+)/.exec(c.attr("href"))) a["id"] = b[1]
    }
	a["photo"] = ( d.get(0) ? d.attr('src') : gvar.kkcdn + 'user/avatar/male.jpg');
	a["isDonatur"] = ($('.quick-reply').get(0) ? true : false);
    return a
}

function getSettings(stg){
	// state should define initial value | might fail on addons	
	getValue(KS + 'UPDATES', function(initval){
		if( !initval || (initval && initval.length === 0) ){
			for(var key in OPTIONS_BOX){
				if(typeof(key)!='string') continue;
				setValue(key, OPTIONS_BOX[key][0]);
			}
		}
	});

	/**
	eg. gvar.settings.updates_interval
	*/
	var capsulate_done, settings = { lastused:{}, userLayout:{} };
	
	//getValue(KS+'LAST_SPTITLE', settings.lastused.sptitle);
	getValue(KS+'LAST_UPLOADER', settings.lastused.uploader);
	
	settings.userLayout.config = [];
	//getValue(KS+'LAYOUT_SIGI', settings.userLayout.signature);
	getValue(KS+'LAYOUT_TPL', settings.userLayout.template);
	
	getValue(KS+'HIDE_AVATAR', function(ret){ settings.hideavatar=(ret=='1') });
	getValue(KS+'MIN_ANIMATE', function(ret){ settings.minanimate=(ret=='1') });
	getValue(KS+'UPDATES_INTERVAL', function(ret){ settings.updates_interval=Math.abs(ret) });
	//getValue(KS+'QUICK_QUOTE', function(ret){ settings.quick_quote=(ret!='0') });
	//getValue(KS+'DYNAMIC_QR', function(ret){ settings.dynamic=(ret!='0') });
	getValue(KS+'QR_DRAFT', function(ret){ settings.qrdraft=(ret!='0') });
	//getValue(KS+'COUNTDOWN', function(ret){ settings.countdown=(ret!='0') });
	//getValue(KS+'COUNTDOWN_POS', function(ret){ settings.countdownpos=ret });
	getValue(KS+'QR_HOTKEY_KEY', function(ret){ settings.hotkeykey=ret });
	getValue(KS+'QR_HOTKEY_CHAR', function(ret){ settings.hotkeychar=ret });
	getValue(KS+'TMP_TEXT', function(ret){ settings.tmp_text = ret });
	getValue(KS+'UPDATES', function(ret){ settings.updates=(ret=='1') });
	getValue(KS+'SCUSTOM_NOPARSE', function(ret){ settings.scustom_noparse=(ret=='1') });
	getValue(KS+'SHOW_SMILE', function(ret){ settings.autoload_smiley=ret });
	
	gvar.$w.setTimeout(function(){
	getValue(KS+'UPDATES', function(ret){
		var hVal, hdc;		
		
		// get layout config
		settings.userLayout.config = ('0,0').split(',');
		settings.userLayout.template = '[B]{message}[/B]';
		
		getValueForId(gvar.user.id, 'LAYOUT_CONFIG', [null,null], function(_hVal){

			if( !_hVal ) _hVal = ['', '0,0'];
			settings.userLayout.config = _hVal[1].split(',');
			
			getValueForId(gvar.user.id, 'LAYOUT_TPL', ['<!>','::'], function(_hVal){

				if( !_hVal ) _hVal = ['', '[B]{message}[/B]'];
				
				try{
					// warning this may trigger error
					settings.userLayout.template = decodeURIComponent(_hVal[1]).replace(/\\([\!\:])/g, "$1");					
					
				}catch(e){
					clog('decodeURI in get setting failed');
					settings.userLayout.template = (_hVal[1]).replace(/\\([\!\:])/g, "$1");
				}
			});
		});
		
		// recheck updates interval
		hVal = settings.updates_interval;
		hVal = ( isNaN(hVal) || hVal <= 0 ? 1 : (hVal > 99 ? 99 : hVal) );
		settings.updates_interval=hVal;
		
		// hotkey settings, predefine [ctrl,shift,alt]; [01]
		hVal = settings.hotkeykey;
		settings.hotkeykey = ( hVal && hVal.match(/^([01]{1}),([01]{1}),([01]{1})/) ? hVal.split(',') : ['1','0','0'] );
		hVal = trimStr(settings.hotkeychar);
		settings.hotkeychar = ( !hVal.match(/^[A-Z0-9]{1}/) ? 'Q' : hVal.toUpperCase() );
		
		// smiley
		hVal = settings.autoload_smiley;
		settings.autoload_smiley = (hVal && hVal.match(/^([01]{1}),(kecil|besar|custom)+/) ? hVal.split(',') : ['0,kecil'] );

		// is there any saved text
		gvar.tmp_text = settings.tmp_text;
		if( gvar.tmp_text!='' && !settings.qrdraft ){
			setValue(KS+'TMP_TEXT', ''); //set blank to nulled it
			gvar.tmp_text = null;
		}
		delete (settings.tmp_text);
		
		capsulate_done = true;
		gvar.settings = settings;
		gvar.settings.done = 1;
		
	 	getUploaderSetting();
	});
	}, 5);
	
	var waitTillDone = function(stg){
		if( !capsulate_done ){
			gvar.$w.setTimeout(function(){ waitTillDone(stg) }, 1)
		}else{
			stg = settings;
			return settings;
		}
	};	
	return waitTillDone();
}


function getUploaderSetting(){
	// uploader properties
	gvar.upload_sel={
		// imagedum:'imagedum.com'
		 photoserver:'photoserver.ws'
		,lulzimg:'lulzimg.com/homelulz'
		,imageshack:'imageshack.us'
		,imgur:'imgur.com'
	};
	gvar.uploader={
		// imagedum:{ src:'imagedum.com',noCross:'1'  }
		 imageshack:{
			src:'imageshack.us'
			,post:'post.imageshack.us/'
			,ifile:'fileupload'
			,hids:{
				 refer:'http://'+'imageshack.us/?no_multi=1'
				,uploadtype:'on'
			}
		}
		,imgur:{
			src:'imgur.com',noCross:'1' 
		}
		,photoserver:{
			src:'photoserver.ws',noCross:'1' 
		}
		,lulzimg:{
			src:'lulzimg.com/homelulz',noCross:'1' 
		}
	};
	// set last-used host
	try{
		if( gvar.settings.lastused.uploader )
			gvar.upload_tipe= gvar.settings.lastused.uploader;
		if( isUndefined( gvar.upload_sel[gvar.upload_tipe] ) )
			gvar.upload_tipe='kaskus';
	}catch(e){ gvar.upload_tipe='kaskus' }
}


function toggleTitle(){
	if( $('#formqr').is(':visible') ){
		$('#qrtoggle a').removeClass('down');
		myfadeOut($('#dumy-title'), 'fast');
		
	}else{
		$('#qrtoggle a').addClass('down');
		myfadeIn($('#dumy-title'));
	}
}

function resize_popup_container(force_width){

	var mW  = ( $('.post-wrapper').find('.entry-content').width() + ( $('.sidebar-user').is(":visible") ? 0 : 172) + 38 );
	$('.qr-editor-wrap').css('width',  mW + 'px');
	
	var bW, bH = parseInt( getHeight() ), cTop=0;
	if( force_width )
		bW = force_width;
	else if( $(".modal-dialog").hasClass('static_width') )
		bW = $(".modal-dialog").width();
	else
		bW = ( gvar.bodywidth-100 );
	
	if( $(".modal-dialog").length > 0){
		
		$('.modal-dialog').css('top', gvar.offsetLayer + 'px').css('width', bW + 'px').css('left', ( (document.documentElement.clientWidth/2) - ( (bW/2) + 50 ) ) + 'px');
		cTop = (bH/2) - ( $('.modal-dialog').height()  ) - 5;
		bW = 305;
		$('.capcay-dialog').css('top', cTop + 'px').css('width', bW + 'px').css('left', ( (document.documentElement.clientWidth/2) - ( (bW/2) + 50 ) ) + 'px');
		$('#box_preview').css('max-height', ( bH - gvar.offsetMaxHeight - gvar.offsetLayer ) + 'px');
	}
	
	gvar.maxH_editor = ( bH - gvar.offsetEditorHeight );	
	_TEXT.setElastic(gvar.maxH_editor, 1);
}

function finalizeTPL(){
	var sec, cck, st='securitytoken', tt = gvar.thread_type;
	if( cck = /hash=(.+)/i.exec( $('.m-panel a[href*="/logout/"]').attr('href')) ){
		sec = (cck ? cck[1] : false);
	}else{
		alert('securitytoken not found');
		return;
	}
	gvar._securitytoken = String( sec );
	$('#formform').attr('action', gvar.domain + (tt=='forum' ? 'post_reply' : 'group/reply_discussion' ) + '/' + gvar.pID + (tt=='forum' ? '/?post=' : '') );
	$('#qr-'+st).val(gvar._securitytoken);
	$('#qr-content-wrapper .message').css('overflow', 'visible');
	
	if( tt=='group' ){
		$('#qr-discussionid').val(gvar.discID);
		$('#qr-groupid').val(gvar.pID);
	}

	$('body').prepend('<div id="qr-modalBoxFaderLayer" class="modal-dialog-bg" style="display:block; visibility:hidden;"></div><div id="wraper-hidden-thing" style="visibility:hidden; position:absolute; left:-99999; bottom:-9999;"></div>');
	
	if( !gvar.user.isDonatur ){
		GM_addGlobalScript(location.protocol+ '\/\/www.google.com\/recaptcha\/api\/js\/recaptcha_ajax.js', 'recap', true);
		$('#wraper-hidden-thing').append( rSRC.getBOX_RC() );
	}
}

function what_if_notlogin(){
	$('.quote').each(function(){
		$(this).click(function(ev){
			do_an_e(ev);
			if( !$('.closed-button').get(0) ){
				if( $('a.close').attr('class').indexOf('closed')!=-1) $('a.close').click();
				
				if($('.notification:eq(1)').attr('class').indexOf('show-panel')!=-1) {
					$(this).removeClass('show-panel'); return;
				}
				$('.sign-reg').find('.m-panel').slideToggle(170, function(){
					if( $(this).is(":visible") ){
						$('.notification:eq(1)').addClass('show-panel');
						$('#username').focus().delay(500);
					}
				});
			}else{
				alert('Sorry! This thread is closed!');
			}
		});
	});
	
	$('#loginform').submit(function(e){
		do_an_e(e);
		$(this).hide();
		$('#login_spinner').show().find('.mf-spinner').removeClass('transp');
		$.post( $(this).attr('action'), $(this).serialize(), function(data) {
			if( JSON.stringify(data).match(/<a\s+href=[\'\"\\]+([^\'\"]+)[^>]+.click\shere/i) ){
				gvar.$w.setTimeout(function () { 
					$('#login_spinner').find('p').html('Cekibrot Gan....');
					gvar.$w.location.reload(false) 
				}, 1000);
			}else{
				$('#login_spinner').hide();
				$('#loginform').show();
				$('#logwarn').html('Wrong user or password');
			}
		});
	})
	.after('<div style="display:none;" id="login_spinner"><div class="mf-spinner transp chrome-spinner-delay"></div><p>'+gvar.loging_in+'</p></div>')
	.prepend('<div id="logwarn"/>');
}

function slideAttach(that, cb){
	var landed, tgt, destination, scOffset, prehide, isclosed, delay;
	tgt = $(that).closest('div.post-wrapper');
	prehide = ($('#'+gvar.qID).parent().attr('id') != tgt.attr('id') );
	isclosed = !$('#formqr').is(':visible');
	delay = 350;
	
	if( prehide )
		$('#'+gvar.qID).hide();
	else
		delay = 100;
	
	destination = $(that).offset().top
	scOffset = Math.floor(gvar.$w.innerHeight / 5) * 2;			
	landed = 0;
	$("html:not(:animated),body:not(:animated)").animate({ scrollTop: (destination-scOffset)}, delay, function() {
		if( !prehide && !isclosed ) {
			if(landed) return;
			$('#'+gvar.tID).focus();
			if( typeof cb == 'function') cb(that);
			landed = 1;
			return;
		}	
		tgt.append( $('#'+gvar.qID) );
		if(isclosed) toggleTitle();
		$('#formqr').show();
		$('#'+gvar.qID).slideDown(220, function(){
			if(landed) return;
			$('#'+gvar.tID).focus();
			if( typeof cb == 'function') cb(that);
			landed = 1;
		});
	});
}

function scrollToQR(){
	$('#qr-content-wrapper').closest('.post-wrapper').find('.quote').click();
}


function start_Main(){
	
	GM_addGlobalStyle( rSRC.getCSS() );
	
	gvar.bodywidth = $('#content-body').width();
	gvar.user = get_userdetail();
	
	// do nothin if not login or dont meet user.id (show_post) page
	if( gvar.user.name == "" || null == gvar.user.id || $('.closed-button').get(0) ) {
		if($('.notification').get(0)){
			clog('Not login, get the "F"-out');
			what_if_notlogin();
		}
		return
	}
	gvar.thread_type = (location.href.match(/\.kaskus\.[^\/]+\/group\/discussion\//) ? 'group' : 'forum');
	
	gvar.last_postwrap = $('.last').attr('id');
	// is aka to groupid
	gvar.pID = (function get_thread_id(href){
		// *.kaskus.*/group/reply_discussion/6124
		// *.kaskus.*/post_reply/000000000000000007710877
		
		var cck, tt = gvar.thread_type;
		if( tt == 'group' ){
			cck = /\/group\/discussion\/(\d+)\//i.exec( location.href );
			gvar.discID = (cck ? cck[1] : null);
		}
		cck = (tt == 'forum' ? /\/post_reply\/(\d+)/.exec( href ) : /\/reply_discussion\/(\d+)/.exec( href ) );
		return (cck ? cck[1] : false);
	})( $('.new-reply').attr('href') );	
	getSettings( gvar.settings );
	
	var maxTry = 50, iTry=0,
	wait_settings_done = function(){
		if( !gvar.settings.done && (iTry < maxTry) ){
			gvar.$w.setTimeout(function(){wait_settings_done() }, 100);
			iTry++;
		}else{
	
			// need a delay to get all this settings
			gvar.$w.setTimeout(function(){
				
				// clean button_qr & qr original
				$('.quick-reply').empty().remove();
				$('.button_qr').each(function(){ $(this).remove() });
				
				// pull tpl	
				$('#'+gvar.last_postwrap).append( rSRC.getTPL() );
				$('.action-button:eq(1)').css('position', 'absolute');
				$('#markItUpReply-messsage').show();		
				
				if(gvar.thread_type=='forum'){
					$('.quote').each(function(e){
						var foo, par = $(this).parent();
						$(this).before('<div class="qqwrap" style="position:relative;display:inline;" />');
						$(this).appendTo( $(par).find('.qqwrap') );
						
						$(this).click(function(ev){
							do_an_e(ev);
							var dothat = function(){
								slideAttach(that)
							}, that = $(this);
							if( gvar.edit_mode == 1 ){
								if( _AJAX.edit_cancel(false) )
									dothat();
								else
									_TEXT.focus();
							}else dothat();
						})
						.css('padding-right', '30px')
						.after('<a href="javascript:;" style="" title="Quick Quote" class="qr-quick-quote" href="'+ $(this).attr('href') +'"></a>');
						
						//.before('<a style="display:none" class="button quick-quote" href="'+ $(this).attr('href') +'"><img alt="" src="'+ gvar.kkcdn +'css_v0.1/img/icon/quote.png"/> QuickQuote</a>');
					});
					$('.qr-quick-quote').each(function(){
						$(this).click(function(event){
							do_an_e(event);
							var dothat = function(that){
								slideAttach(that, function(el){
									_QQparse.init(el, function(){
										_TEXT.lastfocus();
									});
									
									// effect blink									
									myfadeOut($(that), 210, function(){
										myfadeIn($(that), 360);
									});									
								});
							}, that = $(this)
							
							if( gvar.edit_mode == 1 ){
								if( _AJAX.edit_cancel(false) )
									dothat( $(this) );
								else
									//_TEXT.focus();
									_TEXT.lastfocus();
							}else dothat( $(this) );
							
						});
					});
					$('.multi-quote').each(function(e){
						$(this).click(function(event){
							do_an_e(event);
							if(gvar.sTry_canceling){
								delete(gvar.sTry_canceling);
								return;
							}
							if( gvar.edit_mode == 1 ){
								if( _AJAX.edit_cancel(false) ){
									$('#qr_chkcookie').click();
								}else{
									gvar.sTry_canceling = 1;
									$(this).click();
								}
							}else{
								$('#qr_chkcookie').click();
							}
						});
					});
					
					//-end of thread_type='forum'
				}
				else{
					$('.post-entry').each(function(){
						var him = $(this).find('.entry-footer');
						if( !$(him).get(0) )
							$(this).append('<div class="entry-footer" />');
						$(him).append('<a href="javascript:;" class="button quote reply"><img src="'+ gvar.kkcdn +'css_v0.1/img/icon/quote.png" alt="" /> Reply</a>');
						$(this).find('.reply').click(function(ev){
							do_an_e(ev);
							var that = $(this), dothat = function(){
								slideAttach(that, function(){
									var usr, par = $(that).closest('.post-wrapper');
									if(par.attr('id'))
									usr = {
										profile_uri: gvar.domain + $(par).find('a.fn').attr('href').substring(1)
										,name: $(par).find('a.fn').html()
										,gmid: $(par).attr('id')
									};									
									_TEXT.init();
									_TEXT.set(''
										+'[URL='+ gvar.domain + 'group/discussion/'+ gvar.discID +'/'+ gvar.pID +'/'+ usr.gmid.replace(/gm/gi,'') +'/1/gm/?#'
										+ usr.gmid +'][B]re[/B][/URL]: '
										+'[URL='+ usr.profile_uri + ']@'+ usr.name +'[/URL]\n'
									);
									window.setTimeout(function(){ selectAll( $('#'+gvar.tID).get(0) ) }, 20);
								});
							};
							if( gvar.edit_mode == 1 ){
								if( _AJAX.edit_cancel(false) )
									dothat();
								else
									_TEXT.focus();
							}else dothat();
						})
						
					});
					//-end of thread_type='group'
				}
				
				// berlaku di group & forum
				$('.edit').each(function(){
					$(this).click(function(event){
						do_an_e(event);
						_AJAX.edit( $(this), function(){
							var func = function(){
								$('#dismiss_request').click(function(){ _NOFY.dismiss() });
							};
							_NOFY.init({mode:'quote', msg:'Fetching... <a id="dismiss_request" href="javascript:;">Dismiss</a>', cb:func, btnset:false});
						}, function(){
							_NOFY.init({mode:'edit', msg:'You are in <b>Edit-Mode</b>', btnset:true});
							
							_TEXT.lastfocus();
						});
						slideAttach( $(this) );
					});
				});
				
				// kill href inside markItUpHeader
				$('.markItUpHeader a').each(function(){
					$(this).attr('href', 'javascript:;'); 
					$(this).click(function(e){ do_an_e(e) });
				});
				
				finalizeTPL();
				eventsTPL();				
				
				// finishing kill pull down
				$(document).ready(function(){
					$('#qrtoggle a').removeClass('pull-disabled').addClass('pull');
					$('#qrtoggle').removeClass('pull-button-disabled').addClass('pull-button');
					$('#qrtoggle a').click(function(){
						
						$('#formqr').toggle(180, function(){
							toggleTitle();
							$('#'+gvar.tID).focus();
						});
					});		
					
					$(gvar.$w).keydown(function (ev) {
						var A = ev.keyCode, doThi=0, CSA_tasks, pCSA = (ev.ctrlKey ? '1':'0')+','+(ev.shiftKey ? '1':'0')+','+(ev.altKey ? '1':'0');
						
						if( A == 27 && $("#" + _BOX.e.dialogname).is(":visible") && $("#" + _BOX.e.dialogname).css('visibility')=='visible' ){
							do_an_e(ev);
							close_popup();
							$("#" + gvar.tID).focus();
							return;
						}
						
						if( (pCSA=='0,0,0' || pCSA=='0,1,0') || A < 65 || A > 90 )
							return;
							
						CSA_tasks = {
							 quickreply: gvar.settings.hotkeykey.toString() // default: Ctrl+Q
							,fetchpost: (!gvar.isOpera ? '0,0,1' : '1,0,1' ) // Alt+Q [FF|Chrome] --OR-- Ctrl+Alt+Q [Opera]
							,ctrlshift: '1,1,0' // Ctrl+Shift+..., due to Ctrl+Alt will be used above
						};
						
						switch(pCSA){ // key match in [Ctrl-Shift-Alt Combination]
						case CSA_tasks.quickreply:
							var cCode = gvar.settings.hotkeychar.charCodeAt();
							if(A == cCode) {
								doThi = 1;
								scrollToQR();
							}
							break;
						case CSA_tasks.fetchpost:
							if(A == 81) { // keyCode for Q
								doThi = 1;
								scrollToQR();
								$('#squote_post').click();
							}
							break;
						case CSA_tasks.ctrlshift:
							if(A == 81) { // keyCode for Q
								doThi=1;
								$('#sdismiss_quote').click()
							}else if(A == 68 // keyCode for D
								  && !$('#qrdraft').hasClass('jfk-button-disabled') ){
									doThi=1;
									scrollToQR();
									$('#qrdraft').click();
							}
							break;
						};						
						if(doThi) do_an_e(ev);
						
					}).resize(function () {
						var b = $("#content-body").width();
						gvar.bodywidth = b;
						gvar.maxH_editor = parseInt( getHeight() ) - gvar.offsetEditorHeight;
						resize_popup_container();
					});
					
					
					if( trimStr(gvar.tmp_text) && gvar.settings.qrdraft ){
						_DRAFT.switchClass('gbtn');
						_DRAFT.title('continue');
						$('#draft_desc').html( '<a href="javascript:;" id="clear-draft" title="Clear Draft">clear</a> | available' );
						$('#draft_desc #clear-draft').click(function(){ _DRAFT.clear() });
					}
		
					// repositionin vertical-text
					window.setTimeout(function(){ pos_verticalizing(); }, 888);
					
					// sense of fail css
					var w_text, w_field, txa = $('#reply-messsage');
					w_text = $(txa).width()
					w_field = $(txa).closest('fieldset').width();
					
					if( ((w_text*2) - 10) < w_field ){
						
						if( gvar.noCrossDomain ){
							GM_addGlobalStyle(gvar.kqr_static + gvar.css_default + '?' + String(gvar.scriptMeta.timestamp) + '-' + String(gvar.scriptMeta.cssREV), 'direct_css', true);
						}else if(!gvar.isOpera/*&& confirm('Your QR CSS_BULK seems not loaded properly\nReload page to refetch them now?') */ ){
							//$('#qr-content-wrapper').hide();
							//delValue('CSS_BULK', function(){ location.reload(false) })
							clog('Your QR CSS_BULK seems not loaded properly. Try to reload page to refetch them.')
						}
					}
					
					GM_addGlobalScript( rSRC.getSCRIPT() );
					
					
					(gvar.settings.autoload_smiley[0] == 1) && window.setTimeout(function(){ $('.ev_smiley:first').click() }, 50);
					
					window.setTimeout(function(){
						$('#hidrecap_btn').click(); // trigger preload recapcay
					}, 100);
					
					if( !gvar.noCrossDomain && gvar.settings.updates && isQR_PLUS == 0 )
						window.setTimeout(function(){
								_UPD.check();
								// dead-end marker, should set this up at the end of process
								gvar.freshload=null;
						}, 2000);
					
					
				});
			}, 50);
			// settimeout pra-loaded settings 
		}
	};
	wait_settings_done();
}

// outside forum like u.kaskus.us || imageshack.us
function outSideForumTreat(){
  var whereAmId=function(){
    var _src, ret=false;
    getUploaderSetting();
    for(var host in gvar.uploader){
		_src = gvar.uploader[host]['src'] || null;
		if( _src && self.location.href.indexOf( _src )!=-1 ){
			ret= String(host); break;
		}
    }
    return ret;
  };
  
  var el,par,lb,m=20,loc = whereAmId(),CSS="",i="!important";
  /*
    # do pre-check hostname on location
  */
  if( top === self ) return;
  
  switch(loc){
    case "imageshack":
		CSS=''
		+'h1,#top,.reducetop,#panel,#fbcomments,#langForm,.menu-bottom,#done-popup-lightbox,.ad-col{display:none'+i+'}'
		+'.main-title{border-bottom:1px dotted rgb(204, 204, 204);padding:5px 0 2px 0;margin:5px 0 2px 0}'
		+'.right-col input{padding:0;width:99%;font-family:"Courier New";font-size:8pt}'
		;break;
    case "imgur":
		CSS=''
		+'div#logo{display:none'+i+'}' // ,.right .panel
		+'#content{margin-top:15px}'
		;break;
    case "photoserver":
		CSS=''
		+'body,.content{margin:0'+i+';margin-top:35px'+i+'}'
		+'body>img,#topbar{top:0'+i+'}'
		+'body{background-color:#fff}'
		+'#loginbar{top:38px'+i+';display:block}'
		+'#footer{padding:0}'
		+'#overlay .content{top:3px'+i+'}'
		+'#overlay{position:absolute'+i+'}'
		;break;
    case "lulzimg":
		CSS=''
		+'#logo,#histats_counter{display:none}'
		;break;
    case "imagedum":
		CSS=''
		+'#FFN_imBox_Container, div#full > div:last-child,#wrapper p:first-child,.addthis_toolbox'
		+ '{display:none!important}'
		+'.nav{position:absolute;top:0;z-index:99}'
		+'#content{position:absolute;top:0}'
		;break;
  }; // end switch loc
  if( CSS!="" ) 
    GM_addGlobalStyle(CSS,'inject_host_css', true);
  
  // treat on imageshack
  el = $D('//input[@wrap="off"]',null,true);
  if(loc=='imageshack' && el){
    gvar.sITryKill = window.setInterval(function() {
		if( $D('.ui-dialog') ){
			clearInterval( gvar.sITryKill );
			var lL, ealb;
			
			// make sure, kill absolute div layer
			lb = $D('//div[contains(@style,"z-index")]',null);
			if( lL = lb.snapshotLength ){
				for(var i=0; i<lL; i++)
					Dom.remove( lb.snapshotItem(i) )
			}
			if( $D('#ad') ) Dom.remove( $D('#ad') );
			
			window.setTimeout(function(){
				el.removeAttribute('disabled');            
				var par=el.parentNode.parentNode;
				lb = $D('.tooltip',par);
				if(lb){
					lb[0].innerHTML=lb[1].innerHTML='';
					Dom.add(el,par);
				}
				// right-col manipulator
				var ei,et,rTitle=function(t){
					var e = createEl('div',{'class':'main-title'},t);
					return e;
				}, BBCodeImg=function(A){
					return '[IMG]'+A+'[/IMG]';
				}, BBCodeTh=function(A){
					var b=A.lastIndexOf('.'),c=A.substring(0,b)+'.th'+A.substring(b);
					return '[URL='+A+']'+BBCodeImg(c)+'[/URL]';
				};
				if( lb = $D('.right-col',null) ){
					lb[0].innerHTML='';
					et=rTitle('Direct Link'); Dom.add(et, lb[0]);
					ei = createEl('input',{type:'text', value:el.value, readonly:'readonly', 'class':'readonly'});
					_o('focus',ei, function(de){selectAll(de)}); Dom.add(ei, lb[0]);
					try{ei.focus();selectAll(ei)}catch(e){}
					
					et=rTitle('BBCode IMG'); Dom.add(et, lb[0]);
					ei = createEl('input',{type:'text', value:BBCodeImg(el.value), readonly:'readonly', 'class':'readonly'});
					_o('focus',ei, function(de){selectAll(de)}); Dom.add(ei, lb[0]);
					et=rTitle('BBCode Thumbnail'); Dom.add(et, lb[0]);
					ei = createEl('input',{type:'text', value:BBCodeTh(el.value), readonly:'readonly', 'class':'readonly'});
					_o('focus',ei, function(de){selectAll(de)}); Dom.add(ei, lb[0]);
				}
			}, 500);
		}else{
			if(max>0)
				m=m-1;
			else
				clearInterval(gvar.sITryKill);
		}
    },  50);
  } // end is el
  
  return false;
}



function init(){
		gvar.inner = {
				reply	: {
						title	: "Quick Reply",
						stoken	: "",
						submit	: "Post Reply"
				},
				edit	: {
						title	: "Quick Edit",
						submit	: "Save Changes"
				}
		};
		gvar.titlename= gvar.inner.reply.title + (isQR_PLUS!==0?'+':'');
		
		var kdomain = domainParse();		
		gvar.domain = kdomain.prot + '//' + kdomain.host +'/';
		gvar.olddomain = gvar.domain.replace(/livebeta\./i, 'www.');
		gvar.kkcdn = kdomain.prot + '//'+ kdomain.statics + '/';
		gvar.kqr_static = 'http://dev-kaskus-quick-reply.googlecode.com/svn/trunk/statics/kqr/';
		//gvar.kqr_static = 'http://labs.local/SVN/dev-kaskus-quick-reply/statics/kqr/';
		
		if( !/www|livebeta\.kaskus\./.test(location.hostname) ){
				return outSideForumTreat();
		}
		
		gvar.qID= 'qr-content-wrapper';
		gvar.tID= 'reply-messsage';
		gvar.def_title= 'Type new Title';
		gvar.loging_in= 'Logging in..';
		
		gvar.B	= rSRC.getSetOf('button');
		
		gvar.freshload = 1;
		gvar.uploader = gvar.upload_sel = gvar.settings = {};
		gvar.user = {id:null, name:"", isDonatur:false};
		gvar._securitytoken_prev = gvar._securitytoken= null;
		gvar.ajax_pid= {}; // each ajax performed {preview: timestamp, post: timestamp, edit: timestamp }
		gvar.MQ_count = gvar.edit_mode = gvar.pID = gvar.maxH_editor = gvar.bodywidth = 0;
		gvar.upload_tipe = gvar.last_postwrap = "";
		
		
		gvar.offsetEditorHeight = 160; // buat margin top Layer
		gvar.offsetLayer = 10; // buat margin top Layer
		gvar.offsetMaxHeight = 115; // buat maxHeight adjustment
		
		ApiBrowserCheck();
		gvar.css_default = 'kqr_quad'+ (gvar.__DEBUG__ && !gvar.isOpera ? '.dev' : '')  +'.css';
		
		gvar.injected = false;
		gvar.mx = 30; gvar.ix = 0;
		
		if('undefined' == typeof mothership){
				gvar.noCrossDomain = gvar.isBuggedChrome = 1;
				jQ_wait2();
		
		}else{
				jQ_wait();
		}
}

function CSS_precheck(){
	if( !gvar.isOpera ){
		getValue(KS + 'CSS_META', function(ret){			
			if( ret ){
				// check expired dari lastupdate (atleast 1 week)
				var one_week, cucok, parts = ret.split(';');
				one_week = parseInt(1000 * 60 * 60 * 24 * 7);
				if( cucok = /kqr_quad\.([^\.]+).css/.exec( parts[0] ) ){
					if( gvar.scriptMeta.cssREV != cucok[1] || ( (parseInt(parts[0]) + one_week ) < (new Date().getTime()) )  ){
						
						CSS_wait();
						
					}else{
					
						getValue(KS + 'CSS_BULK', function(ret){
							if( !ret )
								CSS_wait();
							else{
								_CSS.css_name = "kqr_quad." + cucok[1] + '.css';
								_CSS.set_css(ret, start_Main);
							}	
						});
					
					}
				}else{
					CSS_wait();
				}
			}else{
				CSS_wait();
			}
		});
		
	}else{
		clog('[Opera|Debug] fetch fresh css from: ' + gvar.kqr_static + gvar.css_default);
		
		GM_addGlobalStyle(gvar.kqr_static + gvar.css_default, 'direct_css', true);
		window.setTimeout(function(){ start_Main() }, 350);
	}
}

function CSS_wait(refetch_only, cb){	
	if( gvar.noCrossDomain || gvar.__DEBUG__ ) {
		GM_addGlobalStyle(gvar.kqr_static + gvar.css_default + '?' + String(gvar.scriptMeta.timestamp) + '-' + String(gvar.scriptMeta.cssREV), 'direct_css', true);
		start_Main();
		if( typeof cb == 'function' ) cb();
		return;
	}
	if( !$('#xhr_css').get(0) && gvar.ix < gvar.mx ){
		if( !_CSS.engage ){
			_CSS.init();
			_CSS.engage = 1;
		}
		gvar.$w.setTimeout(function () { CSS_wait(refetch_only, cb) }, 200);
		gvar.ix++;
	}else{
		gvar.ix = 0;
		_CSS.engage = null;
		if( !refetch_only )
			start_Main();
		if( typeof cb == 'function' ) cb();
	}
}

function jQ_wait2(){	
	if( jQuery == "undefined" && gvar.ix < gvar.mx ){
		gvar.$w.setTimeout(function () { jQ_wait2() }, 200);
		gvar.injected = true;
		gvar.ix++;
	}else{
		if( "undefined" == typeof jQuery ) return;
		$ = jQuery = jQuery.noConflict(true);
		gvar.ix = 0;
		
		CSS_precheck();
	}
}


function jQ_wait() {
    if ( (unsafeWindow && typeof unsafeWindow.jQuery == "undefined") && gvar.ix < gvar.mx) {
        gvar.$w.setTimeout(function () { jQ_wait() }, 200);
				if( !gvar.injected ){
						GM_addGlobalScript(location.protocol + "\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.7.1\/jquery.min.js");
						gvar.injected = true;
				}
        gvar.ix++;
    } else {

        if ("undefined" == typeof unsafeWindow.jQuery) return;
        $ = unsafeWindow.$ = unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict(true);
				gvar.ix = 0;
		
				CSS_precheck();
    }
}

if('undefined' == typeof mothership)
	var $;
init();
}
// main


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", location.protocol + "\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.7.1\/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}


var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.errGSV'; }
if( 'undefined' == typeof chrome && 'undefined' == typeof ENV && 'undefined' == typeof GM_setValue || gsv.match(/not\s+supported/i) )
	addJQuery( main );
else if( 'undefined' != typeof chrome && 'undefined' != typeof ENV )
	main('tamper');
else if( 'undefined' != typeof GM_setValue )
	main('GM');

// ============
//init();

})();