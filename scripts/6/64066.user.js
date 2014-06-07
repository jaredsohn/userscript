// ==UserScript==
// @name           Twitter User Short Info on mouse over.
// @namespace      twitter.com
// @include        http*://twitter.com/*
// ==/UserScript==

var hide_user_info = function () {
    var div = document.getElementById("userinfo-popup");
    div.setAttribute("style", "display: none;");
};

var show_user_info = function (event) {
    var username = this.href.replace(/^http\.?:\/\/twitter\.com\/(.*)$/g, "$1");
    position = findPos(this);
    this.title = "";
    var left = position[0];
    var top = position[1] + 15;
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://twitter.com/users/" + username + ".json",
        onload: function (response) {
            var userinfo = eval("(" + response.responseText + ")");
            div.innerHTML = "";
            var imgDiv = document.createElement("div");
            var textDiv = document.createElement("div");
            var img = document.createElement("img");
            imgDiv.setAttribute("style", "float: left;");
            textDiv.setAttribute("style", "float: left; margin-left: 5px;");
            textDiv.innerHTML = "<b>" + userinfo.name + "</b><br /><a href=\"" + userinfo.url + "\">" + userinfo.url + "</a>";
            img.src = userinfo.profile_image_url;
            imgDiv.appendChild(img);
            div.appendChild(imgDiv);
            div.appendChild(textDiv);
            var style = "text-align: left; position: absolute; padding: 3px; top: " + top + "px; left: " + left + "px; height: 60px; width: 250px; background-color: yellow; border: 1px solid gray;";
            div.setAttribute("style", style);
        }
    });
};

var findPos = function(obj) {
	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
};

var links, link;
links = document.evaluate(
    '//a[@class="tweet-url screen-name"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var div = document.createElement("div");
div.id = "userinfo-popup";
div.setAttribute("style", "display: none;");
document.body.appendChild(div);

for (var i = 0; i < links.snapshotLength; i++) {
    link = links.snapshotItem(i);
    link.addEventListener('mouseover', show_user_info, false);
    link.addEventListener('mouseout', function (event) {
        setTimeout(hide_user_info, 3000);
    }, false);
}
