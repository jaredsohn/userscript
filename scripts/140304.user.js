// ==UserScript==
// @name           Bangumi Quick Detail Edit
// @namespace      http://netaba.re
// @description    Add a short cut for edit details in browser pages.
// @version        0.2
// @include        http://bgm.tv/*browser*
// @include        http://bangumi.tv/*browser*
// @include        http://chii.in/*browser*
// ==/UserScript==

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function main()
{
	var titles = $('h3 > a');
	$(titles).each(function(i,v){
		 var el = $(v).attr('href') + '/edit_detail';
		 var l = '<a href="' + el + '" > (快速编辑) </a>';
		 $(l).appendTo($(v).closest('h3'));
	})
}


embedElement("script", main, true);