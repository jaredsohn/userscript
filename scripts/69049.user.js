// ==UserScript==
// @name          Indowebster GET Link
// @namespace     http://userscripts.org/scripts/show/69049
// @include       http://*.indowebster.com/*.html
// @include       http://*.indowebster.com/download/*
// @include       http://*.indowebster.com/downloads/*
// @exclude       http://ads.indowebster.com*
// @version       13060830
// @description   (Indowebster) automatically get download link
// @author        idx (http://userscripts.org/users/idx)
//
// Indowebster Link Download
//
// Copyright (c) 2009, Idx
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// Mod By: Idx
// ==============
//
// mod.R-30 : 2013-06-08
//  recode
//
// mod.R-29 : 2012-11-03
//  reindent code
//  fix autodownload
//
//
// --------------------------------------------------------------------
// ==/UserScript==
(function() {
	function main(){

	var gvar = function() {};
	gvar.vver = "R.30";
	gvar.apps_title = 'IDWS GET[Link] - '+gvar.vver;
	gvar.apps_src = '//userscripts.org/scripts/show/69049';

	gvar.__DEBUG__ = !1;
	var OPTIONS_BOX = {
	  IDWS_AUTODOWNLOAD:  ['1']
	}, KS	= 'IDWS_';

	var GMSTORAGE_PATH = "GM_";
  var $D = function(q, root, single) {
    if(root && typeof root == "string") {
      root = $D(root, null, true);
      if(!root) {
        return null
      }
    }
    if(!q) {
      return false
    }
    if(typeof q == "object") {
      return q
    }
    root = root || document;
    if(q[0] == "#") {
      return root.getElementById(q.substr(1))
    }else {
      if(q[0] == "/" || q[0] == "." && q[1] == "/") {
        if(single) {
          return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        }
        return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      }else {
        if(q[0] == ".") {
          return root.getElementsByClassName(q.substr(1))
        }
      }
    }
    return root.getElementsByTagName(q)
  };
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
	var rSRC = {
		getCSS: function(){
			return ''
				+'.wrap-actions{margin-top:-20px; padding:0; border:1px solid #ccc;}'
				+'.wrap-actions .btitle, .wrap-actions .btn_toggle_autodl, .title .btn_toggle_autodl{display:inline-block;}'
				+'.wrap-actions .btitle{background:#ddd; border-bottom:1px solid #ccc; padding:8px 0 5px 0; margin-bottom:20px;display:block;}'
				+'.wrap-actions .btitle a{font-size:14px; font-weight:bold; line-height:10px; display:inline-block; margin-left:10px;}'
				+'.btn_toggle_autodl{float:right;margin:7px 14px 0 0; font-size:11px;}'
				+'.btn_toggle_autodl input{width: 13px; height:13px; padding:0; margin:0; position: relative; top:-2px; vertical-align: bottom; *overflow: hidden;}'
				+'.btn_toggle_autodl label{display: block; text-indent: -15px;}'
				+'.title .btitle{display:inline-block;}'
				+'.title .btn_toggle_autodl{margin-top:3px;}'
				+'.title .btn_toggle_autodl input{top:-3px;}'
				+'.tips{color:#999; padding:5px;}'
				+'.hide{display:none}'
				+''
			;
		},
		getSCRIPT: function(){
			return ''
				+'var gvar = gvar || {};'
				+'var $btntarget = ($ && $(".downloadBtn").length ? $(".downloadBtn").first().find("input").first() : null);'
				+'var currentTitle = $("title").first().text();'
				+''
				+'function setTitle(x){$("title").first().text(x)}'
				+'function clog(x){console && console.log(x)}'
				+'function g(x){return document.getElementById(x)}'
				+''
				+'function frameloaded(){'
				+'$btntarget && $btntarget.val("Please wait.........");'
				+'if( $btntarget.hasClass("color_red") )'
				+' $btntarget.addClass("color_blue").removeClass("color_red");'
				+'}'
				+'function sendMessage(msg, cb){'
				+'gvar.link = msg;'
				+'("function" == typeof cb) && cb();'
				+'}'
				+'function respondLink(){'
				+'$btntarget.parent().attr("href", gvar.link);'
				+'var isAudl = $("#btn_autodl").is(":checked");'
				+'isAudl && $("#directlink_iframe").attr("src", gvar.link);'
				+'setTitle("[R] "+currentTitle);'
				+'if( $.browser.webkit )'
				+' $(".wrap-actions").find(".tips").removeClass("hide");'
				+'}'
				+'function timerMessage(msg){'
				+'if( msg > 0 )'
				+' $btntarget.val("DOWNLOAD ["+msg+"]");'
				+'else '
				+' $btntarget.val("DOWNLOAD REDE").removeClass("color_blue color_red").addClass("color_green");'
				+'setTitle("["+msg+"] "+currentTitle)'
				+'}'
		},
		getSCRIPT_Framed: function(){
			return ''
				+'var currentTitle = $("title").first().text();'
				+'function setTitle(x){$("title").first().text(x)}'
				+'function storeLink(e){'
				+'var el = e.target||e,'
				+' data_link=$(el).attr("data-link"),'
				+' data_autodl = $(el).attr("data-autodl"),'
				+' data_insideframe = $(el).attr("data-insideframe");'
				+'if( data_insideframe )'
				+' parent.sendMessage(data_link, parent.respondLink);'
				+'else{'
				+' data_autodl && $("#directlink_iframe").attr("src", data_link);'
				+' setTitle( "[R] "+currentTitle)'
				+'}'
				+'}'
				+'function timerMessage(e){'
				+'var el = e.target||e,'
				+' data_remain = $(el).attr("data-remain"),'
				+' data_autodl = $(el).attr("data-autodl"),'
				+' data_insideframe = $(el).attr("data-insideframe");'
				+'if( data_insideframe ){'
				+' parent.timerMessage(data_remain);'
				+'}else{'
				+' setTitle( "["+data_remain+"] "+currentTitle)'
				+'}'
				+'}'
		}
	};


	//=== mini-functions
	// static routine
	function isDefined(x)   { return !(x == null && x !== null); }
	function isUndefined(x) { return x == null && x !== null; }
	function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
	function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
	function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }
	function dump(x){return ("undefined" != typeof JSON ? JSON.stringify(x) : x)}

	function createTextEl(a) {
		return document.createTextNode(a)
	}
	function createEl(a, b, c) {
		var d = document.createElement(a);
		for (var e in b) if (b.hasOwnProperty(e)) d.setAttribute(e, b[e]);
		if (c) d.innerHTML = c;
		return d
	}
  function getTag(name, parent) {
    if(isUndefined(parent)) {
      parent = document
    }
    return parent.getElementsByTagName(name)
  }
	function getValue(key, cb) {
		var data=OPTIONS_BOX[key];
		if( !data ) return;
		setTimeout(function(){
			var ret = GM_getValue(key,data[0]);
			if('function' == typeof cb)
				cb(ret);
			else if(cb)
				cb = ret;
		}, 0);
	}
	function setValue(key, value, cb) {
		var data=OPTIONS_BOX[key];
		if( !data ) return;
		setTimeout(function(){
			var ret = GM_setValue(key,value);
			if('function' == typeof cb)
				cb(ret);
			else if(cb)
				cb = ret;
		}, 1);
	}



  function ApiBrowserCheck() {
  	
    if(typeof unsafeWindow == "undefined") {
      unsafeWindow = window
    }
    if(typeof GM_log == "undefined") {
      GM_log = function(msg) {
        try {
          unsafeWindow.console.log("GM_log: " + msg)
        }catch(e) {
        }
      }
    }
    var needApiUpgrade = false;
    if(window.navigator.appName.match(/^opera/i) && typeof window.opera != "undefined") {
      needApiUpgrade = true;
      gvar.isOpera = true;
      GM_log = window.opera.postError;
      show_alert("Opera detected...", 0)
    }
    if(typeof GM_setValue != "undefined") {
      var gsv;
      try {
        gsv = GM_setValue.toString()
      }catch(e) {
        gsv = ".staticArgs.FF4.0b"
      }
      if(gsv.indexOf("staticArgs") > 0) {
        gvar.isGreaseMonkey = true;
        gvar.isFF4 = false;
        show_alert("GreaseMonkey Api detected" + ((gvar.isFF4 = gsv.indexOf("FF4.0b") > 0) ? " on FF4.0b" : "") + "...", 0)
      }else {
        if(gsv.match(/not\s+supported/)) {
          needApiUpgrade = true;
          gvar.isBuggedChrome = true;
          show_alert("Bugged Chrome GM Api detected...", 0)
        }
      }
    }else {
      needApiUpgrade = true;
      show_alert("No GM Api detected...", 0)
    }
    gvar.noCrossDomain = gvar.isOpera || gvar.isBuggedChrome;
    if(needApiUpgrade) {
      GM_isAddon = true;
      show_alert("Try to recreate needed GM Api...", 0);
      var ws = null;
      try {
        ws = typeof unsafeWindow.localStorage
      }catch(e) {
        ws = null
      }
      if(ws == "object") {
        show_alert("Using localStorage for GM Api.", 0);
        GM_getValue = function(name, defValue) {
          var value = unsafeWindow.localStorage.getItem(GMSTORAGE_PATH + name);
          if(value == null) {
            return defValue
          }else {
            switch(value.substr(0, 2)) {
              case "S]":
              return value.substr(2);
              case "N]":
              return parseInt(value.substr(2));
              case "B]":
              return value.substr(2) == "true"
            }
          }
          return value
        };
        GM_setValue = function(name, value) {
          switch(typeof value) {
            case "string":
            unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, "S]" + value);
            break;
            case "number":
            if(value.toString().indexOf(".") < 0) {
              unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, "N]" + value)
            }
            break;
            case "boolean":
            unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, "B]" + value);
            break
          }
        };
        GM_deleteValue = function(name) {
          unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH + name)
        }
      }else {
        if(!gvar.isOpera || typeof GM_setValue == "undefined") {
          show_alert("Using temporarilyStorage for GM Api.", 0);
          gvar.temporarilyStorage = new Array;
          GM_getValue = function(name, defValue) {
            if(typeof gvar.temporarilyStorage[GMSTORAGE_PATH + name] == "undefined") {
              return defValue
            }else {
              return gvar.temporarilyStorage[GMSTORAGE_PATH + name]
            }
          };
          GM_setValue = function(name, value) {
            switch(typeof value) {
              case "string":
              ;
              case "boolean":
              ;
              case "number":
              gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value
            }
          };
          GM_deleteValue = function(name) {
            delete gvar.temporarilyStorage[GMSTORAGE_PATH + name]
          }
        }
      }
      if(typeof GM_openInTab == "undefined") {
        GM_openInTab = function(url) {
          unsafeWindow.open(url, "")
        }
      }
      if(typeof GM_registerMenuCommand == "undefined") {
        GM_registerMenuCommand = function(name, cmd) {
          GM_log("Notice: GM_registerMenuCommand is not supported.")
        }
      }
      if(!gvar.isOpera || typeof GM_xmlhttpRequest == "undefined") {
        show_alert("Using XMLHttpRequest for GM Api.", 0);
        GM_xmlhttpRequest = function(obj) {
          var request = new XMLHttpRequest;
          request.onreadystatechange = function() {
            if(obj.onreadystatechange) {
              obj.onreadystatechange(request)
            }
            if(request.readyState == 4 && obj.onload) {
              obj.onload(request)
            }
          };
          request.onerror = function() {
            if(obj.onerror) {
              obj.onerror(request)
            }
          };
          try {
            request.open(obj.method, obj.url, true)
          }catch(e) {
            if(obj.onerror) {
              obj.onerror({readyState:4, responseHeaders:"", responseText:"", responseXML:"", status:403, statusText:"Forbidden"})
            }
            return
          }
          if(obj.headers) {
            for(name in obj.headers) {
              request.setRequestHeader(name, obj.headers[name])
            }
          }
          request.send(obj.data);
          return request
        }
      }
    }
    GM_getIntValue = function(name, defValue) {
      return parseInt(GM_getValue(name, defValue), 10)
    }
  }
  function clog(msg) {
    if(!gvar.__DEBUG__) {
      return
    }
    show_alert(msg)
  }
  function show_alert(msg, force) {
    if(!gvar.__DEBUG__) {
      return
    }
    if(arguments.callee.counter) {
      arguments.callee.counter++
    }else {
      arguments.callee.counter = 1
    }
    GM_log("(" + arguments.callee.counter + ") " + msg);
    if(force == 0) {
      return
    }
  }
  // end of std-func



  function create_trans_iframe(link) {
    var $ifrm = $("#fake_iframe"),
    	styles = gvar.ninja_styles;
    if( !$ifrm.length ) {
      $('<iframe id="fake_iframe" src="'+link+'" style="'+styles+'" onload="parent.frameloaded()"></iframe>')
      	.prependTo($('body'));
      create_directlink_iframe();
    }else {
      $ifrm.attr('src', link);
    }
  }
  function create_directlink_iframe() {
  	var $ifrm = $("#directlink_iframe"),
  		styles = gvar.ninja_styles;
    if( !$ifrm.length ) {
      $('<iframe id="directlink_iframe" src="javascript:;" style="'+styles+'"></iframe>')
      	.prependTo($('body'));
    }
  }
	function is_download_page(){
		return /\/download\//.test(location.href);
	}

  function prefetch_download() {
  	clog('insed prefetch_download');
  	$.post(gvar.prefetch.prefetchUri, gvar.prefetch.prefetchParams, function(ret){
  		if( ret ){
  			$('#btn_timer')
	  			.attr('data-remain', 0)
	  			.trigger('click')
  			;
  			gvar.sTryCounter && clearInterval(gvar.sTryCounter);
  			$('#btn_storelink')
	  			.attr('data-link', ret)
	  			.trigger('click')
  			;
  		}
  	})
  }


	function start_Main(){
		clog('start_Main');

		var $downloadBtn = $('.downloadBtn'),
			is_inside_iframe = ( window !== window.top )
		;
		GM_addGlobalStyle(rSRC.getCSS(), 'parent-style', true);

		if( is_download_page() ){
			$downloadBtn.length && (function($el){
				// do what and then...
				GM_addGlobalScript(rSRC.getSCRIPT(), 'parent-script', true);
				
				$downloadBtn.closest('.block')
					.wrap($('<div class="wrap-actions"></div>'));
				$('.wrap-actions')
					.prepend($('<div class="btitle"><a href="'+gvar.apps_src+'" target="_blank">'+gvar.apps_title+'</a></div>'))
					.prepend($('<div class="btn_toggle_autodl"><label for="btn_autodl"><input id="btn_autodl" type="checkbox" '+(gvar.settings.auto_dl ? ' checked="checked"':'')+' />&nbsp;Auto Download<label></div>'))
					.append('<div class="tips hide">*When "Download Rede" and download is not working, try it with "Save Link As.."</div>')
				;

				window.setTimeout(function(){
					create_trans_iframe($el.href);
				}, 234);
			})($downloadBtn[0]);
		}
		else{
			// assumed is page of /downloads/ 
			GM_addGlobalScript(rSRC.getSCRIPT_Framed(), 'iframe-script', true);
			
			var $tgt_title = $('.alpha.omega>h6.title');
			$tgt_title.wrapInner('<div class="btitle" />');
			$tgt_title.find('.btitle').html('<a href="'+gvar.apps_src+'" target="_blank">'+gvar.apps_title+'</a>');
			$tgt_title
				.append($('<div class="btn_toggle_autodl"><label for="btn_autodl"><input id="btn_autodl" type="checkbox" '+(gvar.settings.auto_dl ? ' checked="checked"':'')+'/>&nbsp;Auto Download<label></div>'))
			;
			

			clog('we are on downloads');
			var $bodyContainer = $('#bodyContainer'),
				$scripts = getTag('script', $bodyContainer.get(0)),
				$targetScript = null
			;

			for(var i=0; i<$scripts.length; ++i){
				if( String($scripts[i].innerHTML).match(/\$\.post\b/) ){
					$targetScript = $scripts[i]; break;
				}
			}
			if( $targetScript ){
				var re = new RegExp('\\$\\.p'+''/*_^_^V_*/+'o'+'st\\([\\\'\\\"]([^\\\'\\\"]+).(?:\\s+)?,(?:\\s+)?(\\{[^\\}]+.)', "");
				if( cucok = re.exec($targetScript.innerHTML) ){
					var params_;
					try{
						params_ = eval('('+cucok[2]+')');
					}
					catch(e){params_={}}
					gvar.prefetch = {
						prefetchUri: cucok[1],
						prefetchParams: params_
					};

					window.setTimeout(function(){
						prefetch_download();
					}, 345);

					window.setTimeout(function(){
						$downloadBtn = $('#downloadBtn');
						var cucok, remain;
						gvar.remain = 25;
						if(cucok = /\s\((\d+)s\)/.exec($downloadBtn.val()) ){
							remain = cucok[1];
							gvar.remain = remain;
						}
					}, 1);

					if( !is_inside_iframe )
						create_directlink_iframe();
					
					gvar.sTryCounter = setInterval(function(){
						var $tgt = $('#btn_timer');
						if( gvar.remain > 0 ){
							$tgt
								.attr('data-remain', gvar.remain)
								.trigger('click')
							;
						}
						else{
							clearInterval(gvar.sTryCounter);
						}
						$tgt.val(gvar.remain);
						gvar.remain--;
					}, 1000);
					
				}
				else{
					clog('regex failed');
				}
			}
			else{
				clog('targetScript not found');
			}

			$('<input id="btn_storelink" data-autodl="'+(gvar.settings.auto_dl ? '1':'')+'" data-insideframe="'+(is_inside_iframe ? '1':'')+'" data-link="" type="button" onclick="return storeLink(this)" value="StoreLink" />')
				.appendTo($bodyContainer);
			$('<input id="btn_timer" data-autodl="'+(gvar.settings.auto_dl ? '1':'')+'" data-insideframe="'+(is_inside_iframe ? '1':'')+'" type="button" onclick="return timerMessage(this)" value="tickTimer" />')
				.appendTo($bodyContainer);
		}

		// common events
		$('#btn_autodl').click(function(){
			var isChecked = $(this).is(":checked");
			setValue(KS + 'AUTODOWNLOAD', (isChecked ? '1':'0'), function(){
				gvar.settings.auto_dl = isChecked;
				$('#btn_storelink').attr('data-autodl', isChecked ? '1':'');
				$('#btn_timer').attr('data-autodl', isChecked ? '1':'');
			});
		})
	}

	(function init(){
		ApiBrowserCheck();
		
		gvar.settings = {};
		gvar.ninja_styles = 'position:absolute!important; overflow:hidden; left:-99999; height:0!important; width:0;';
		//gvar.settings.auto_dl = !1;
		
		// getSettings
		getValue(KS + 'AUTODOWNLOAD', function(ret){
			gvar.settings.auto_dl = (ret && ret=='1' ? true:false);

			var destination = $('.block>h1.title:first,.alpha.omega>h6.title').offset().top,
				scOffset = 30,
				delay = 350,
				landed = 0
			;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: (destination-scOffset)}, delay, function() {
				if(landed) return;
				start_Main();
				landed = 1;
			});
		});
	})();
	}
	// main

	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", location.protocol + "\/\/ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	addJQuery( main );
})();
/* Mod By Idx. */
