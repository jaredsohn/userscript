// ==UserScript==
// @name           Add video 2 Tagoo (RuTube)
// @namespace      http://tagoo.ru
// @description    Adds button with Tagoo logo in the right bottom corner of YouTube. Clicking on it you can add current watching video to Tagoo video-blog.
// @description    download: http://tagoo.ru/opt/user_scripts/add_video_2_tagoo_rutube.user.js
// @include        http://rutube.ru/tracks/*.html*
// @homepage       http://tagoo.ru/webmaster.php?mode=addons#userscripts
// @author         Ihor Polyakov
// @copyright      2009+, Tagoo Team (http://tagoo.ru/profile.php?u=3&mode=blog)
// @version        0.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @uso:script     55917
// ==/UserScript==

if (typeof(unsafeWindow) == 'undefined')
	unsafeWindow = window;
GM_ready();

function GM_ready() 
{
	$ = unsafeWindow.$;
	var html = html_button();
	document.body.appendChild(html);
	create_css(css_styles());
	var href = add_video2tagoo();
	$('taddvideo').firstChild.setAttribute('href', href);
}

function css_styles()
{
	return [
		['#taddvideo', 'position: fixed; bottom: 10px; right: 10px; '],
		['#taddvideo a', 'display: block; '],
		['#taddvideo img.btn', 'width: 50px; height: 38px; display: block; background: url(data:image/gif;base64,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);']
	];
}

function html_button()
{
	var div = document.createElement('div');
	div.setAttribute('id', 'taddvideo');
	var a = document.createElement('a');
	a.setAttribute('href', 'http://tagoo.ru/');
	a.setAttribute('target', '_blank');
	var img = document.createElement('img');
	img.className = 'btn';
	img.setAttribute('src', 'http://tagoo.ru/images/dummy.gif');
	a.appendChild(img);
	div.appendChild(a);
	return div;
}

function add_video2tagoo()
{
	var url = 'http://tagoo.ru/profile.php?mode=blog&act=add&video=';
	var code = get_embed();
	url += encodeURIComponent(code);
	return url;
}

function get_embed()
{
	var code = $('pcode').value;
	if (!code)
		return false;
	var m = code.match(/<embed[^>]+>/i);
	return m[0];
}

function create_css(arr) 
{
	var css = '';
	for (var i = 0; i < arr.length; ++i)
		css += arr[i][0] + ' { ' + arr[i][1] + ' }';
	if (typeof GM_addStyle != "undefined")
	{
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined")
	{
		addStyle(css);
	} else 
	{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) 
		{
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
}

//
// ChangeLog
// 2009-08-18 - 0.1 - Congratulations! We have started