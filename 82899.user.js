// ==UserScript==
// @name          ikariam anti Friend Invite by Echo
// @description   removes annony block from city view.
// @include       http://*.*.ikariam.com/*
// @exclude       http://*.*.ikariam.com/index.php?view=options
// ==/UserScript==

var node = document.getElementById("reportInboxLeft");
if (node != null){
    node.parentNode.removeChild(node);
};

var tmp = document.getElementsByTagName("div");
for (var i=0,j=tmp.length; i<j; i++){
	if (tmp[i].className == "reportInboxLeft"){
		tmp[i].parentNode.removeChild(tmp[i]);
	}
}