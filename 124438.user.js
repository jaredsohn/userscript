// ==UserScript==
// @name       115_BBCODE
// @namespace  http://115.com
// @version    0.1
// @description  Share link with bbcode format
// @include    http://115.com/*
// ==/UserScript==

// Works with Firefox Greasemonkey & Safari Ninjakit modified version (http://misuzi.me/files/NinjaKit.safariextz)
// Chrome tampermonkey have some bugs with iframe loading so not working at the moment

if (document.title.length == 0) return;
if (window.top != window.self) return;
$=unsafeWindow.jQuery;
function initScript(){
	console.log("Inting!");
	console.log('Length is :'+ $('iframe:first').contents().find('#js_top_bar_box').children().length);
	if($ && $('iframe:first').contents().find('#js_top_bar_box').children().length>0)
	{
		console.log('Calling');
		callMe();
	}
	else
	{
		setTimeout(initScript,500);
	}
}

function callMe()
{
	$('body').append("<div id='bbcode' style='width: 300px; padding-top: 8px; padding-right: 8px; padding-bottom: 8px; padding-left: 8px; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(0, 0, 0, 0.199219); overflow-x: hidden; overflow-y: hidden; z-index: 99999999999; position: absolute; top: 124.33333333333333px; left: 610px; display: none; background-position: initial initial; background-repeat: initial initial;'><h3><span style='float:left;line-height:30px;'>BBCODE</span><a href='javascript:;' style='float:right;width:18px;height:18px;margin-top:5px;line-height:18px;text-align:center;overflow:hidden;font-size:12px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;color:#FFF;background:#A4A4A4;' onclick='$(\"#bbcode\").hide();'>X</a></h3><br><textarea id='bbtext' rows='3' cols='25' readonly='readonly'></textarea></div>");
	$('iframe:first').contents().find('#js_top_bar_box').append('<a href="javascript:;" id="bbcode_btn" class="btn">分享为BBCODE</a>');
	$('iframe:first').contents().find('#bbcode_btn').bind('click',function(){showBBCODE()});

	function showBBCODE()
	{
		var outputString="";
		$('iframe:first').contents().find(':checked').each(function(i,file){
			
			var node=$(file).parent().find('a[field="file_name"]')[0];
			var name=node.title;
			var url=node.href;
			var format="[url="+url+"]"+name+"[/url]\r\n";
			outputString+=format;
		})
		$('#bbtext').val(outputString);
		$('#bbcode').show();
	}
	$('#bbtext').live('click',function(){$(this).select()})
}

initScript();
unsafeWindow.callMe=callMe;