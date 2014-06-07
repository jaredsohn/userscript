// ==UserScript==
// @name        jc_translator2 (using Google)
// @namespace   http://localhost/jiichen
// @require		  https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js
// @downloadURL https://userscripts.org/scripts/source/161723.user.js 
// @updateURL   https://userscripts.org/scripts/source/161723.meta.js
// @include     http://*
// @include     https://*
// @exclude     https://*.pchome.com.tw/*
// @exclude     https://*.yahoo.com/*
// @exclude     http://playgame.com.tw/cgi-bin/openwebmail/openwebmail-send.pl*
// @grant       GM_addStyle
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @version     1.5
// @modifieddate 2013.04.30.16h
// ==/UserScript==


GM_addStyle("#jcTranslator2Area{position:absolute;display:none;width:auto;z-index:100000;border:0px solid blue;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 13pt;color: blue;}");
GM_addStyle("#jcTranslator2Area .translateResult {text-align:left;padding:5px;margin-bottom:20px;border:1px solid green;position:absolute;display:none;color:blue;background-color:white;font-size:14pt;}");

jQuery.noConflict();
(function($) {
	
	var aObj = {};
	
	function hasClickEvent( jqObj ) {
    var elem = jqObj.get(0);
    var rule1 = (!('undefined' == typeof $._data( elem, "events" )));
    var rule2 = jqObj.attr('onclick');
    rule2 = (!((typeof rule2 == 'undefined') || (rule2 == null) || (rule2 == false)));
    
    return (rule1 || rule2);
}

	
	$(function() {
		// more code using $ as alias to jQuery
		
		$(window).mouseup(function(e) {
			
			aObj.text = window.getSelection();
			aObj.event = e;
			aObj.target_lang = "zh-CN";
			
			var jqObj = $(e.target);
			aObj.text = $.trim(aObj.text);
			
			if (false == hasClickEvent( jqObj ) ) {
			
				if ('' == aObj.text) {
					jcShowTranslator2Area(false);
				} else {
					//GM_log('"' + aObj.text + '"');
					jcShowTranslator2Area(true);
				}
			}
			
		});
		
	});
	
	function jcShowTranslator2Area(visible) {
		if (false == visible) {
			//$('#jcTranslator2Area').hide();
			$('#jcTranslator2Area').remove();
		} else {
			//GM_log(aObj.text);
			if (0 == $('#jcTranslator2Area').length) {
				$('body').append('<div id="jcTranslator2Area"></div');
				$('#jcTranslator2Area')
						.append('<div class="buttons"></div>')
						.append('<div class="translateResult">Waiting...</div>');
				$('#jcTranslator2Area .buttons')
						.append('<button class="btnTranslate">翻譯</button>')
						.append('<button class="btnHide">-</button>')
						.append('<button class="btnSearch">搜尋</button>');
				
				$('#jcTranslator2Area .btnTranslate').click(function() {
					$('#jcTranslator2Area .buttons').hide();
					jcGetTranslateResult();
				});
				
				$('#jcTranslator2Area .btnHide').click(function() {
					jcShowTranslator2Area(false);
				});
				
				$('#jcTranslator2Area .btnSearch').click(function() {
					jcShowTranslator2Area(false);
					var aurl = "http://www.google.com.tw/search?q=" + encodeURIComponent(aObj.text) + "&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:zh-TW:official";
					GM_openInTab( aurl );
				});
				
			}
			
			
			aObj.divLeft 	= aObj.event.clientX + window.scrollX + 10;
			aObj.divTop 	= aObj.event.clientY + window.scrollY + 15;
			
			$('#jcTranslator2Area')
				.css('left' , (aObj.divLeft).toString() + "px" )
				.css('top' , (aObj.divTop).toString() + "px" )
				.css('width' , 'auto')
				.css('max-width' , Math.ceil($(window).width() * 0.75) + 'px')
				.show();
			$('#jcTranslator2Area .buttons').show();
			
			//alert((0 - aObj.divLeft + 10).toString());
			$('#jcTranslator2Area .translateResult')
				.css('left' , (0 - aObj.divLeft + 110).toString() + "px" )
				.css('top' , (10).toString() + "px" )
				.css('width' , 'auto')
				.css('min-width' , Math.ceil($(window).width() * 0.75) + 'px')
				.css('max-width' , Math.ceil($(window).width() * 0.75) + 'px')
				.hide();
			
		}
		
	}
	
	jcTranslateResult=function(result){
		if ('' != result)
		{
			$('#jcTranslator2Area .translateResult')
					.html(result)
					.css('left' , (Math.ceil(($(window).width() - $('#jcTranslator2Area .translateResult').width())/2)-aObj.divLeft) + 'px')
					.show();
			
		}
	}
	
	function jcGetTranslateResult() {
		GM_xmlhttpRequest({
			url:"http://translate.google.com/translate_a/t?client=t&hl=" + aObj.target_lang + "&sl=auto&tl=" + aObj.target_lang + "&text="+encodeURIComponent(aObj.text),
			method:"GET",
			overrideMimeType:'text/javascript;charset=UTF-8',
			onload:function(result) {
							if(200 == result.status) {
								var myarr = eval(result.responseText);
								jresult = '';
								for(var key in myarr[0]){
								    var para = myarr[0][key].toString().split(",");
								    jresult += para[0] + "<br />\n\r";
								}
								jcTranslateResult(jresult);
							}
						},
			onerror:function() {
									jcTranslateResult("sorry，连接服务器出错!");
								}
		});
	}
	
	
	
})(jQuery);
// other code using $ as an alias to the other library