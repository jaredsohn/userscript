
// ==UserScript==
// @name        tiebaInsertMusicLink
// @author		猫酱
// @include     http://tieba.baidu.com/*
// @version     2013.11.9
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @updateURL   http://userscripts.org/scripts/source/175316.meta.js
// @downloadURL http://userscripts.org/scripts/source/175316.user.js
// ==/UserScript==

var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;
var cr_flash=new Array();

function customMusicLink()
{
	if(document.querySelector('.m_search_panel'))
	{
		var cmlHtml='<div>'
					+'<input type="text" class="myinput musicname" width="100px" value="请输入歌名" onFocus="if(this.value==\'请输入歌名\'){this.value=\'\';this.style=\'color:black;\';}" onBlur="if(this.value==\'\'){this.value=\'请输入歌名\';this.style=\'color:#CCCCCC;;\';}">'
					+'<input type="text" class="myinput musiclink" width="200px" value="请输入音乐链接" onFocus="if(this.value==\'请输入音乐链接\'){this.value=\'\';this.style=\'color:black;\';}" onBlur="if(this.value==\'\'){this.value=\'请输入音乐链接\';this.style=\'color:#CCCCCC;;\';}">'
					+'&nbsp;&nbsp;<input type="button" class="musicInsert" value=" 插 入 ">'
					+'</div>';
		$('.m_search_panel').after(cmlHtml);

		GM_addStyle('\
			.myinput{\
				margin-left:20px;\
				height:30px;\
				color:#CCCCCC;\
			}\
			.musiclink{\
				width:300px;\
			}\
			.musicInsert{\
				height:30px;\
				width:50px;\
				background:#4D91F7;\
				color:white;\
				border:1px grey;\
			}\
			.dialogJ{\
				height:544px !important;\
			}\
			#dialogJbody{\
				height:auto !important;\
			}\
			');
		var mu=document.querySelector('.musicInsert');
		mu.addEventListener('click',function()
			{
				var name=$('.musicname').val();
				var link=$('.musiclink').val();
				if(name!=''&&name!='请输入歌名'
					&&link!=''&&link!='请输入音乐链接')
				{
					var name=encodeURIComponent(name);
					var link=encodeURIComponent(link);
					if(!link.match(/^http/))
						link='http%3A//'+link;
					var musicHtml='<img class="BDE_Music" src="http://tieba.baidu.com/tb/editor/v2/music.png" title="http://box.baidu.com/widget/flash/bdspacesong.swf?from=tiebasongwidget&amp;url='
									+link+'&amp;name='+name+'&amp;artist=&amp;extra=&amp;autoPlay=false&amp;loop=true" data-width="400" data-height="95">';
					$('#ueditor_replace').html($('#ueditor_replace').html()+musicHtml);
					// document.execCommand("insertHtml",false,musicHtml);
					$('.dialogJ,.dialogJmodal').remove();
				}
			});
	}
	else
		setTimeout(customMusicLink,100);
}
(function l_init()
{
	if($('.edui-btn.edui-btn-music').length)
	{
		rewriteGetContent();
		$('.edui-btn.edui-btn-music').click(customMusicLink);
	}
	else
	{
		setTimeout(l_init,100);
	}
})();


function URLEncode (clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9-_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
        output += match[1];
      x += match[1].length;
    } else {
      if (clearString.substr(x, 1) == ' ') {
        //原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问, 
        //修改后两种浏览器都可兼容 
        output += '+';
      }
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}

//度娘处理函数改写
function rewriteGetContent()
{
	var b = unsafeWindow.test_editor.getContent;
	unsafeWindow.test_editor.getContent = function() 
	{
		cr_flash=[];
		var d = b.call(unsafeWindow.test_editor);
		d = d.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/(^(<br\/>)+)|((<br\/>)+$)/g, "");
		var embeds=d.match(/<embed[^>]*>/g);
		if(embeds)
		{
			var f = '<embed allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" scale="noborder" src="#{url}" class="BDE_Music" width="400" height="95"/>';
			$('#ueditor_replace .BDE_Music').each(function()
			{
			var g=$.tb.format(f, {
							url: $(this).attr('title')
						});
					cr_flash.push(g);
				});
			for(var i=0;i<embeds.length;i++)
			d=d.replace(embeds[i],cr_flash[i]);
		}
		return d;
	};
}