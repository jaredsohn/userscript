// ==UserScript==
// @name           FWZ: Character Switcher
// @namespace      LOL NIGGER
// @description    Switches Character easily
// @include        http://*.forumwarz.com/*
// @include        http://forumwarz.com/*
// ==/UserScript==

options = "";
GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.forumwarz.com/characters/index",
	onload: function(response) {
		table = response.responseText.replace(/\n/g,"").match(/<table.*?<\/table>/gi)[0];
		characters = table.match(/<a href="[^#]*?">[^<>]+?<\/a>/g);
		options = '<option value="">Choose a character</option>';
		for(i in characters){
			name = characters[i].replace(/(.*?">|<\/a>)/g,"");
			url = characters[i].replace(/(<a href="|".*)/g,"");
			options += '<option value="'+url+'">'+name+'</option>';
			
		}
		newElement = document.createElement('span');
		newElement.setAttribute("style", "position:absolute;top:32px;");
		newElement.innerHTML = '<select id="char_switch" onchange="switch_character(this)">'+options+'</select><input type="button" value="GO!" onclick="go_character()" />';
		logo = document.getElementById("topbar").children[0];
		document.getElementById("topbar").insertBefore(newElement, document.getElementById("topbar").children[1]);
	}
});

unsafeWindow.switch_character = function(e){
    self.xmlHttpReq = new XMLHttpRequest();
    self.xmlHttpReq.open('get', "http://www.forumwarz.com"+e.value, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.send("");

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.forumwarz.com"+e.value,
	});
};

unsafeWindow.go_character = function(){
	location.href = "http://www.forumwarz.com"+(document.getElementById("char_switch").value);
};