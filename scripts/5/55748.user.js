// ==UserScript==
// @name           OC Pack
// @namespace      http://userscripts.org/users/23652
// @description    Adds box in top right corner to head to OC chat.
// @include        http://www.legacy-game.net*
// @version        1.0
// @license        None.
// ==/UserScript==

if(top.location!=self.location) {return;}

// get() function by JoeSimmons
function get(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {cb(r);}
});
}

var host = window.location.host.replace(/^www\./,'');

var logo = window.document.createElement('img'),
	div = window.document.createElement('div'),
	a = window.document.createElement('a');
	a.setAttribute('href', 'http://client4.addonchat.com/sc.php?id=415567'+host);
	div.setAttribute('style', 'text-align:right;background:transparent; position:absolute; left:1106px; top:16px; z-index: 50; ');
	logo.setAttribute('id', 'aboutus_logo');
	logo.setAttribute('border', '0');
	logo.setAttribute('src', 'http://img197.imageshack.us/img197/1240/occhat2.png');
	a.appendChild(logo);
	div.appendChild(a);
if(!window.document.getElementById('aboutus_logo')) window.document.body.insertBefore(div, window.document.body.firstChild);





// ==UserScript==
// @name           Bungie Community Forum Chat Beta v0.0.3
// @author         647
// @description    Adds chat funtion to Bungie.net community forum
// @include        http://www.legacy-game.net*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('chatbar');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML=


<div><iframe frameborder="0" width="160" height="250" src="http://www.gagalive.com/livechat1.swf?chatroom=@@@oc-chat" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform" style="border:#B9C8A0 1px solid;border-top:0px" id="cboxform"></iframe>
</div>;
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}
var footer, newcontent1;

        footer = document.getElementById('ctl00_forumHeader_regularForumHeaderPanel');
        if (footer)
        {
             footer.innerHTML =<div id="cboxdiv" style="text-align: center; line-height: 0">
<div><iframe frameborder="0" width="100%" height="250" src="http://www.yellbox.com/addmessage.php" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain" style="border:#B9C8A0 1px solid;" id="cboxmain"></iframe></div>
</div>;
        }
		(function() {
var css = "@namespace url(); .block-a { width: 902px !important; height: 100% !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

// Form Window
//<div id="cboxdiv" style="text-align: center; line-height: 0">
//<div><iframe frameborder="0" width="900" height="150" src="http://www6.cbox.ws/box/?boxid=420998&amp;boxtag=j8042w&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain" style="border:#B9C8A0 1px solid;" id="cboxmain"></iframe></div>
//</div>

// Form Boxes for text and name
//<div><iframe frameborder="0" width="900" height="100" src="http://www6.cbox.ws/box/?boxid=420998&amp;boxtag=j8042w&amp;sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform" style="border:#B9C8A0 1px solid;border-top:0px" id="cboxform"></iframe>
//</div>




