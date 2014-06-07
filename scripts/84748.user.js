// ==UserScript==
// @name           Google URLs Extractor
// @description    Extract URLs from a Google Search 
// ==/UserScript==

var btn_container;
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
	if (inputs[i].name == "btnG")
		btn_container = inputs[i].parentNode;
}

function find_next_link(html) {
	var url = html.match(/(<a href="[^"]+">)\s*<span[^>]+style="[^"]*background-position:\s?-76px\s/);
	if (url == null)
		return false;
		
	var div = document.createElement("div");
	div.innerHTML = url[1];
	return div.firstChild.href;
}

function atdhe(query_url, callback) {
	ajax(query_url, function(e){
		var als = e.match(/<a[^>]+class=l[^>]*>/g);
		for (var i = 0; i < als.length; i++) {
			urls.push(als[i].match(/href="([^"]+)"/)[1]);
		}
		var next_url = find_next_link(e);
		if (next_url)
			atdhe(next_url, callback);
		else
			callback();
	});
}

function ajax(url, callback) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			callback(req.responseText);
		}
	}
	req.open("GET", url, true);
	req.send("");
}

var new_button = document.createElement("input");
new_button.type = "button";
new_button.value = "Extract URLs";
new_button.setAttribute("onsubmit", "return false;");
btn_container.appendChild(new_button);
var urls = [];
new_button.addEventListener("click", function(){
	var query_url = unsafeWindow.document.forms[0].action + "?num=100&q="+escape(unsafeWindow.document.forms[0].q.value);
	document.body.innerHTML = "<img src='http://hajdaj.com/static/Loading.gif' />";
	atdhe(query_url, function() {
		document.body.innerHTML = urls.join("<br/>");
	});
},false);