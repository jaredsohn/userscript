// ==UserScript==
// @name OGame Redesign : Fiko BBCode
// @namespace http://userscripts.org/users/131796
// @description OGame : BBCode Fiko
// @date 2009-11-16
// @creator Black Cat
// @include http://*.ogame.rs/game/index.php?page=writemessage*
// @include http://*.ogame.rs/game/index.php?page=networkkommunikation*
// @exclude
// ==/UserScript==

(function(){

	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addBBCode() {' +
		'var tag = arguments[0];' +
		'var value = arguments[1];' +
		'var str1;' +
		'if (value) {' +
			'if (value=="0") return;' +
			'str1 = "[" + tag + "=" + value + "]";' +
		'} else {' +
			'str1 = "[" + tag + "]";' +
		'}' +
		'var str2 = "[/" + tag + "]";' +
		'var message = document.getElementsByName("text")[0];' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'var seltext = rng.text;' +
			'rng.text = str1 + seltext + str2;' +
			'rng.collapse(false);' +
			'rng.move("character",-str2.length);' +
			'rng.moveStart("character",-seltext.length);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var seltext = message.value.substring(start,message.selectionEnd);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str1 + seltext + str2 + endtext;' +
			'message.selectionStart = start + str1.length;' +
			'message.selectionEnd = start + str1.length + seltext.length;' +
		'}' +
		'message.focus();' +
	'}';
	var form = document.getElementsByTagName("form")[0];
	form.parentNode.insertBefore(script,form);
	var ta = document.getElementsByName("text")[0];
	var div = document.createElement("div");
	div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"font\",this.value)'><option value='0'>Font</option><option value='arial'>Arial</option><option value='comic sans ms'>Comic</option><option value='courier new'>Courier New</option><option value='tahoma'>Tahoma</option><option value='times new roman'>Times New Roman</option><option value='verdana'>Verdana</option></select> ";
	div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"size\",this.value)'><option value='0'>Size</option><option value='7'>Сићушна</option><option value='10'>Мала</option><option value='12'>Нормална</option><option value='16'>Велика</option><option value='20'>Огромна</option></select> ";
	div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"color\",this.value)'><option value='0'>Color</option><option value='black' style='color:black'>Black</option><option value='silver' style='color:silver'>Silver</option><option value='gray' style='color:gray'>Gray</option><option value='maroon' style='color:maroon'>Maroon</option><option value='brown' style='color:brown'>Brown</option><option value='red' style='color:red'>RED</option><option value='orange' style='color:orange'>Orange</option><option value='yellow' style='color:yellow'>Yellow</option><option value='lime' style='color:lime'>Lime</option><option value='green' style='color:green'>Green</option><option value='olive' style='color:olive'>Olive</option><option value='teal' style='color:teal'>Teal</option><option value='aqua' style='color:aqua'>Aqua</option><option value='blue' style='color:blue'>Blue</option><option value='navy' style='color:navy'>Navy</option><option value='purple' style='color:purple'>Purple</option><option value='fuchsia' style='color:fuchsia'>Fuchsia</option><option value='pink' style='color:pink'>PİNK</option><option value='white' style='color:white'>White</option></select> ";
	if (document.location.href.indexOf("page=networkkommunikation") != -1)
		div.innerHTML += "<br />";
	div.innerHTML += "<a href='javascript:addBBCode(\"b\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAZlBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////39/fu7u7l5eXf39/W1tbMzMzFxcW9vb21tbWtra2lpaWZmZmKioqCgoJ8fHx1dXVfX19VVVUcHBwQEBAAAABvQ4WDAAAAInRSTlMAESIzRFVmd4iZqrv/////////////////////////////erKVdwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACtSURBVCiRvY3XEsIgFERDsRAN4dJuFNv+/0+KJY6jvOp5WWaXA133C5TBujmYyUI2eo3ttpjG0PMwtBSNwVrbUHq2Y+VLkbDBOTd+KebgTjsich+KvLiAsw+eDuZD8N5RiDEQ1Fu/AtUuporf4+0+UjiiUnJOdMTi2S/gQo57bEpi5kQZryEy54K+ZJ4mzhPEYxD97Rlo/UhgOQ9SKa2kqKkr9TR/Lu7MKUT3J66l/Q2irNMvNQAAAABJRU5ErkJggg==' alt='Bold' title='Дебела' border='0' /></a>";
	div.innerHTML += "<a href='javascript:addBBCode(\"i\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAY1BMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39/fu7u7n5+fe3t7S0tLMzMzDw8O+vr61tbWvr6+kpKSZmZmQkJB6enpjY2NXV1dTU1M6OjooKCggICAREREAAACW3aPzAAAAIXRSTlMAESIzRGZ3iJmqu//////////////////////////////ewDs2AAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAJdJREFUKJG10MsSgjAMBVDaIvJKX6FYlcL9/6+UcSPYbrmLLHJmkkyq6qo0aIr9Fhqlfo1hgChACsNYgtvbj1SAeuNIugDdTNAmh3skLNpnoDajtTacQWJy1rnpD2SKlIAXz2dowfbZ94j8OP1ErmS8XUBu8ozj4tWFwAv2OoXjLNFhT/etaI4g1B4plaqVPF8lfsk+cl0+nUwKek1swHwAAAAASUVORK5CYII=' alt='Italic' title='Италијански стил' border='0' /></a>";
	div.innerHTML += "<a href='javascript:addBBCode(\"u\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAaVBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjv7+/n5+ff39/W1tbMzMzFxcW8vLy1tbWtra2mpqacnJyRkZGFhYV/f39mZmZSUlJDQ0MzMzMREREAAAAvziwyAAAAI3RSTlMAESIzRFVmd4iZqrvu/////////////////////////////6saOpIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAtElEQVQokbWR3RaCIBCEQzD/UthFyErT5v0fMr1RIG/7bjjMnDOzC5fLX6hQnerF1M75iS7gW9+cGGqhrkP2a9SPQXe+PEliDJpuIjWub1vORi9pvZj9BLDxc2JIGKM1EX2S+mokJmamZxHpOdyIlQc7hPUF7haNUg0sT5CHsd6tQXYFu56eCHbwzlmIHL33/Sswyi2/FqLeTqhjJMTUe5I2EYiSAvb/ElJKdZAFy4uQ9H1jvp0jEWFcRQbjAAAAAElFTkSuQmCC' alt='Underline' title='Подвуци' border='0' /></a>";
	div.innerHTML += "<a href='javascript:addBBCode(\"s\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAYFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////29vbu7u7m5ube3t7V1dXMzMzCwsKzs7Otra2lpaWZmZmOjo58fHxmZmZRUVFDQ0M7OzszMzMAAABWp2jsAAAAIHRSTlMAESIzRFVmd4iZqu7//////////////////////////5UxFAAAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAo0lEQVQokbVQ7Q6CMBDjtqEw2MfBmIJK3/8tncYgyBJ/0WS7pM2u7YriENSos/x5au9lhidwG5AR1OxNC7EX9MU4O1a5TXN0DPoVTjfTPLzDzh48oel83NjX2GKpA2OtdS4dny5r8PcFVYgdtJQazIBakqWozA6ihO97vmIlDEPsQSVCjGH8BkurEjSRfluoVW0hpSR6DSXFunwi6TNo9ymH4QksEA2GU5CXhAAAAABJRU5ErkJggg==' alt='Strike through' title='Пресеци' border='0' /></a> ";
	div.innerHTML += "<a href='javascript:addBBCode(\"align\",\"center\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAADNJREFUCJljYMAGmFYBQQMDYygQOCCLNgApRjQxLCoZuBaAKdYAQmYyrFoFpkJDsToEDgBeyRP8DhwWwQAAAABJRU5ErkJggg==' alt='Align center' title='Центрирај' border='0' /></a>";
	div.innerHTML += "<br />";
	ta.parentNode.insertBefore(div,ta);
	if (document.location.href.indexOf("page=writemessage") != -1) {
		ta.parentNode.style.height="99%";
		GM_addStyle("select.dropdown{border:1px solid #000;background-color:#141E26;color:#848484}");
	}
})();
