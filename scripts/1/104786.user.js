// ==UserScript==
// @name           bash.org.ru to vkontakte
// @namespace		bash_like
// @description    Честно тырим цитаты с баша в контакт ))
// @include        http://bash.org.ru/*
// ==/UserScript==

var kont = document.createElement("script")
kont.type="text/javascript"
kont.charset="windows-1251"
kont.src="http://vkontakte.ru/js/api/share.js?9"
var head = document.getElementsByTagName("head")[0];
head.appendChild(kont)
var w = window.wrappedJSObject || window

function insert_buttons()
{
	if (!w.VK){
		setTimeout(insert_buttons, 1000);
		return;
	};
	var q_list = document.getElementsByClassName("q")
	for (var ind = 0; ind < q_list.length; ind++){
		var el = q_list[ind]
		var title = el.getElementsByTagName("div")[0]
		var link = title.getElementsByTagName("a")[0]
		var text = el.getElementsByTagName("div")[1]
		
		if (link && text && title && w.VK)
		{
			var button = document.createElement("span")
			button.innerHTML = w.VK.Share.button({
			  url: link.href,
			  title: "Цитата №" + (link.textContent),
			  description: text.innerHTML.replace(/<br/g,"\n<br"),
			  noparse: true
			},
			{type: 'custom', text: '<img src="http://vk.com/images/vk16.png" />'});
			button.style.cssFloat = "left";
			button.style.padding = "3px";
			title.appendChild(button)
		}
		
	}
}
insert_buttons();