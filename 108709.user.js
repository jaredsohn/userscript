// ==UserScript==
// @name          Sideblr v1.0.1
// @namespace  http://sideblr.tumblr.com
// @description	 Sideblr - Tumblr Sideblr.
// @author         cokomik & inciwetrust
// @version        1.0.1
// @homepage    http://sideblr.tumblr.com
// @include        http://*.tumblr.com/dashboard*
// @include        http://*.tumblr.com/tagged*
// @include        http://*.tumblr.com/likes*
// @exclude       http://*.tumblr.com/following*
// ==/UserScript==
/*
Gelistiriciler: cokomik (cokomik.tumblr.com) & inciwetrust (inciwetrust.tumblr.com)

*/

var tumblelogNum = 1;

function nextSibling(node) {
	do {
		node = node.nextSibling;
	} while (node && node.nodeType != 1) ;
	return node
}

function findTumblelog(tumblr, num)
{
	tumblr = tumblr.firstChild;
	do {
		tumblr = nextSibling(tumblr);
		if (num - 1 == 1) tumblr = tumblr.firstChild;
		num--;	
		
	} while (num >= 1);
	return tumblr;
}

function main() {

	var getTumblelog = document.getElementById("user_channels");
	
	if (tumblelogNum > 1) getTumblelog = findTumblelog(getTumblelog, tumblelogNum);
	else getTumblelog = nextSibling(getTumblelog.firstChild.firstChild);
	


	var settings = '<li><div class="hide_overflow"><a href="http://sideblr.tumblr.com" class="members" target="_blank">Sideblr</a></div></li>';
	
	var container = document.createElement('ul');
	container.setAttribute('class', 'controls_section');
	container.setAttribute('id', 'tumblrsb2');
	container.innerHTML = settings + '<center><iframe name="iframe" src="http://tumblrsozluk.com/duyuru.php" width="205" height="250" marginwidth="1" marginheight="1" scrolling="no" align="absmiddle" border="0" frameborder="0"></iframe></center>';
	
	rc = document.getElementById("right_column");
	rc.insertBefore(container, nextSibling(nextSibling(nextSibling(rc.firstChild))));

	var httpRequest = new XMLHttpRequest();
	 
		httpRequest.open('GET',addy,true);
		httpRequest.setRequestHeader("Method", "GET " + addy + " HTTP/1.1");
		httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		httpRequest.send(null);

	 httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4){
			var defaultTumb = httpRequest.responseText;
			var tumbPost = defaultTumb.search("\<!-- Posts --\>");
			var tumbMassEd = defaultTumb.search("\<!-- Launch Mass Post editor --\>");
			defaultTumb = defaultTumb.substring(tumbPost,tumbMassEd);
			defaultTumb = defaultTumb.replace(' class="selected"', '');
			document.getElementById("tumblrsb2").innerHTML = settings + defaultTumb;
		}
	}		
}
main();