// ==UserScript==
// @name           InfiniX - Slavehack
// @include        *slavehack*
// @version                1.0
// ==/UserScript==
function createIframe(id, src, manager) {
	var iframe = document.createElement("iframe");
	var frameid = document.createAttribute("id");
	var framesrc = document.createAttribute("src");
	var framewidth = document.createAttribute("width");
	var frameheight = document.createAttribute("height");
	var frameborder = document.createAttribute("frameborder");
	var childlength = document.body.childNodes.length;
	var lastelement = document.body.childNodes[childlength-1];
	
	frameid.nodeValue = id;
	framesrc.nodeValue = src;
	framewidth.nodeValue = 0;
	frameheight.nodeValue = 0;
	frameborder.nodeValue = 0;

	iframe.setAttributeNode(frameid);
	iframe.setAttributeNode(framesrc);
	//iframe.setAttributeNode(framewidth);
	//iframe.setAttributeNode(frameheight);
	//iframe.setAttributeNode(frameborder);
	if(manager) {
		iframe.addEventListener("load", manager, true);
	}
	lastelement.parentNode.insertBefore(iframe, lastelement.nextSibling);
}
function bypassBot() {
	document.body.innerHTML = document.body.innerHTML.replace("Sorry, we've got to ask you to repeat the numbers displayed in the image below to validate you're a human being ;)", "Bypassing bot... Please wait.")
	document.getElementsByName("nummer")[0].disabled = true;
	createIframe("botcheck", "http://www.slavehack.com/includes2/includes/botcheck.php", function() {
		var botiframe = document.getElementById("botcheck").contentWindow;
		if(botiframe.window.location.href=="http://www.slavehack.com/includes2/includes/botcheck.php") {
			var tmp = String(botiframe.document.getElementsByTagName('script')[0].innerHTML);
			var divider = tmp.substring(tmp.indexOf('style.top.replace')+31, tmp.indexOf('style.top.replace')+33).replace(')', '');
			var xball = parseInt(botiframe.document.getElementById('ball').style.left.replace('px', ''));
			var yball = parseInt(botiframe.document.getElementById('ball').style.top.replace('px', ''));
			var xbox = parseInt(botiframe.document.getElementById('box').style.left.replace('px', ''));
			var ybox = parseInt(botiframe.document.getElementById('box').style.top.replace('px', ''));
			var dx = (xbox - xball)/divider;
			var dy = (ybox - yball)/divider;
			var code = "";
			if(dx>0) {
				while(dx>0) {
					code = code + "r";
					dx = dx - 1;
				}
			}
			if(dx<0) {
				while(dx<0) {
					code = code + "l";
					dx = dx + 1;
				}
			}
			if(dy>0) {
				while(dy>0) {
					code = code + "d";
					dy = dy - 1;
				}
			}
			if(dy<0) {
				while(dy<0) {
					code = code + "u";
					dy = dy + 1;
				}
			}
			botiframe.window.location.href = "http://www.slavehack.com/includes2/includes/botcheck.php?botcheck=" + code;
		} else {
			if(document.body.innerHTML.match("workimage.php")) {
				window.location.href = window.location.href;
			}
		}
	});
}
bypassBot();