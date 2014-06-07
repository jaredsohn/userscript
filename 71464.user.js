// ==UserScript==
// @name          Facebook no "are now friends"
// @namespace     http://jeffpalm.com/noarefriends/
// @description   Removes status updates like "now friends with " or "am fan of"
// @include       http://www.facebook.com/home.php*
// @include       http://www.facebook.com/
// ==/UserScript==

function main() {

  var divs = document.getElementsByTagName("DIV");
  var targets = [];
  for (var i in divs) {
    var d = divs[i];
    if (d.id.match(/^div\_story\_.*/)) {
	var c = d.innerHTML;
	if (c.match(/are now friends/) ||
	    c.match(/is now friends/) ||
	    c.match(/became a fan of/) ||
	    c.match(/is a fan of/)) {
	    targets.push(d);
	}
    }
  }
  
  var count = 0;
  for (var i in targets) {
    var node = targets[i];
    node.parentNode.removeChild(node);
  }
}

main();
