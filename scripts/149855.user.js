// ==UserScript==
// @name           Iciba快捷键
// @description    向iciba网站上添加快捷键，来用键盘添加生词本。 
// @namespace      ChenZhitao_iciba
// @version        0.1
// @date           2012-10-08
// @author         Chen Zhitao
// @include        http://www.iciba.com/*
// ==/UserScript==

(function ()
{
	var unsafe = window;
	try
	{
		unsafe = unsafeWindow;
	}
	catch (e)
	{
		GM_log("Catched!");
	}
	var $ = unsafe.$;
	if (! $)
		return;

	$ (document).keydown (function (e)
	{
		if(e.keyCode == 65 && !e.ctrlKey && e.altKey && !e.shiftKey)
        {
            $(".join_word").click();
			e.preventDefault();
        }
	});
}) ();
