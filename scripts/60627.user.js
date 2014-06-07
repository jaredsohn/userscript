// ==UserScript==
// @name         post google image on tumblr
// @namespace    http://d.hatena.ne.jp/arikui/
// @include      http://www.google.*
// ==/UserScript==

(function(){
// set login data
var email, password;

if( !GM_getValue("email") ){
	email = prompt("email");
	if(email)
		GM_setValue("email", email);
	else
		return;
}
else{
	email = GM_getValue("email")
}

if( !GM_getValue("password") ){
	password = prompt("password");
	if(password)
		GM_setValue("password", password);
	else
		return;
}
else{
	password = GM_getValue("password")
}

// post
var w = unsafeWindow;

var postTumblr = function(data){
	var captionHead = "imgrefurl=";
	var captionTail = "&usg=";

	var sendData = {
		email   : email,
		password: password,
		type    : "photo",
		source  : data[3],
		caption : "<a href=\"" + 
		          decodeURIComponent(data[0].substring(data[0].indexOf(captionHead) + captionHead.length, data[0].indexOf(captionTail))) +
		          "\">g</a>"
	};

	var sendBody = (function(d){
		var a = [];

		for(var x in d)
				a.push(x + "=" + encodeURIComponent(d[x]));

		return a;
	})(sendData).join("&");

	GM_xmlhttpRequest({
		method  : "POST",
		url     : "http://www.tumblr.com/api/write",
		data    : sendBody,
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded',
		},
		onload: function(response){
			w.console.log(response.responseText);
		}
	});
};

GM_xmlhttpRequest({
	method: "GET",
	url   : document.evaluate('//a[@class="gb1"]',document,null,6,null).snapshotItem(0).href,
	onload: function(response){
		var s = response.responseText.search(/dyn\.setResults\(/);
		var e = response.responseText.indexOf("]", s);

		if(s == -1 || e == -1)
			return;

		var imgData = eval("["+response.responseText.substring(s+"dyn.setResults".length+3,e-2)+"]");

		postTumblr(imgData);
	}
});

})()
