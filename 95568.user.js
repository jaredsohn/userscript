// ==UserScript==
// @name           Flipkart-IMDB
// @author         Sutirtha Datta
// @namespace      http://www.flipkart.com
// @description    Buy from Flipkart in IMDB
// @include        http://www.imdb.com/title/*/
// @include        http://www.imdb.com/title/*/#*
// ==/UserScript==

var fkWidget = new genWidget("Buy from Flipkart", "http://www.flipkart.com/search-movie?dd=0&query=%22%title%22&Search=Search&selmitem=Movies", "http://www.flipkart.com/images/fkart/cart.png");

function genWidget(description, url, icon) {
	this.description = description;
	this.url = url;
	this.icon = icon;

	this.getHTML = function (title) {
		var html = "<a target=\"_blank\" href=\"" + this.geturl(title) + "\"><img class=\"img\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.description + "\"><\/a>&nbsp;";
		return html;
	}

	this.geturl = function (title) {
		var url = this.url;
		url = url.replace(/%title/, encodeURIComponent(title));
		return url;
	}	
}

function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	return title;
}

var header = document.getElementsByTagName("h1")[0];

var icon = document.createElement("span");
icon.innerHTML = fkWidget.getHTML(getTitle());
header.appendChild(icon);
