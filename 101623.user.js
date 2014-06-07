// ==UserScript==
// @name          GitHub Show More Issues
// @namespace     github-show-more-issues
// @description   GitHub Show More Issues
// @version       0.1
// @include       https://github.com/*
// @author        Yura Kolt >> http://github.com/ykolt
// ==/UserScript==

if (typeof($)==="undefined") $=unsafeWindow.$;

function main()
{
	var numbers = 200; // Here you may change numbers of issues on each page
	var w = window;
	var url = w.location.href;
	var str_pos = url.indexOf('issues');
	var issues_html = '';
	var more_flag = true;
	var i = 0;
	var max_i = Math.ceil(numbers / 25);
	
	if (str_pos > 0)
		url = url.substring(0, str_pos);
	else
		return true;
	
	function setCookie(name, value, expires, path, domain, secure)
	{
		document.cookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + expires : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
	}
	
	function getCookie(name)
	{
		var cookie = " " + document.cookie;
		var search = " " + name + "=";
		var setStr = null;
		var offset = 0;
		var end = 0;
		if (cookie.length > 0)
		{
			offset = cookie.indexOf(search);
			if (offset != -1)
			{
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1)
				{
					end = cookie.length;
				}
				setStr = unescape(cookie.substring(offset, end));
			}
		}
		return(setStr);
	}
	
	if (getCookie('switch') == null)
	{
		expires = new Date();
		expires.setTime(expires.getTime() + (1000 * 86400 * 365));
		setCookie('switch', 1, expires);
	}
	
	var background_color = 'style="background:#' + ((getCookie('switch')==1) ? '999999' : 'ECECEC') + ' !important;"';
	$('.issues').parent().find('.filterbar').after('\
		<div class="sidebar-show-all-issues">\
			<span class="button-show-switch"' + background_color + '>Show More Issues >> Switch on/off</span>\
			<span class="button-show-all-issues" style="display:none;">Next issues</span>\
		</div>');
	
	function ajax_more(infinity)
	{
		i++;
		
		if (more_flag || infinity)
		{
			$.ajax({
				url: url+"issues",
				dataType: "html",
				data:{
					page: i,
					state: "open"
				},
				type: "get",
				contentType: "text/plain",
				beforeSend: function(xhr){
					xhr.setRequestHeader('Cache-Control', 'private');
					xhr.setRequestHeader('Pragma', '');
				},
				error: function(xhr, desc, exceptionobj){},
				success: function(data){
					if ((i < max_i && $(data).find('.issues').html().indexOf('issues/new') == -1) || (infinity === true && $(data).find('.issues').html().indexOf('issues/new') == -1))
					{
						issues_html = issues_html + $(data).find('.issues table').html();
						$('.issues').html('<table cellspacing="0" cellpadding="0" border="0">' + issues_html + '</table>');
						
						if (infinity)
							ajax_more(true);
						else
							ajax_more(false);
					}
					else
					{
						more_flag = false;
					}
				}
			});
			
			if (i == max_i)
			{
				$('.button-show-all-issues').fadeIn();
			}
		}
	}
	
	$('.button-show-switch').live('click', function()
	{
		var switch_flag = getCookie('switch');
		
		switch_flag = (switch_flag == null || switch_flag == 1) ? 0 : 1;
		
		expires = new Date();
		expires.setTime(expires.getTime() + (1000 * 86400 * 365));
		setCookie('switch', switch_flag, expires);
		
		if (switch_flag == 1)
		{
			$(this).css('background', '#999999');
			ajax_more(false);
		}
		else
		{
			$(this).css('background', '#ECECEC');
			w.location = w.location.href;
		}
	});
	
	$('.button-show-all-issues').live('click', function()
	{
		$('.button-show-all-issues').fadeOut();
		ajax_more(true);
	});
	
	function addCSS(css)
	{
		var style;
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	addCSS("\
		.sidebar-show-all-issues{height:22px; text-align:center; background:url(/images/modules/issue_browser/topbar-background.gif) 0 0 repeat-x; border-bottom:1px solid #B4B4B4; padding:2px 7px 0 7px; color:#666; font-family: helvetica,arial,freesans,clean,sans-serif;}\
		.button-show-all-issues,.button-show-switch{position:relative; display:inline-block; height:17px; padding:0 25px 0 25px; font-size:12px; font-weight:bold; color:#333; text-shadow:1px 1px 0 white; white-space:nowrap; overflow:visible; cursor:pointer; border:1px solid #D4D4D4; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px; background:#F4F4F4; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#F4F4F4',endColorstr='#ECECEC'); background:-webkit-gradient(linear,left top,left bottom,from(#F4F4F4),to(#ECECEC)); background:-moz-linear-gradient(top,#F4F4F4,#ECECEC);}\
	");
	
	if (getCookie('switch')==1)
	{
		ajax_more(false);
	}
}

if (!document.xmlVersion)
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	document.documentElement.appendChild(script);
}
