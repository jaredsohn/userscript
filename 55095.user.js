// ==UserScript==
// @name           Bungie Community Forum Chat Beta v0.0.3
// @author         647
// @description    Adds chat funtion to Bungie.net community forum
// @include        http://*.bungie.net/Forums/topics.aspx?forumID=3
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML=
<div><iframe frameborder="0" width="100%" height="83" src="http://www6.cbox.ws/box/?boxid=420998&amp;boxtag=j8042w&amp;sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform" style="border:#B9C8A0 1px solid;border-top:0px" id="cboxform"></iframe>
</div>;
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}
var footer, newcontent1;

        footer = document.getElementById('ctl00_forumHeader_regularForumHeaderPanel');
        if (footer)
        {
             footer.innerHTML =<div id="cboxdiv" style="text-align: center; line-height: 0">
<div><iframe frameborder="0" width="100%" height="150" src="http://www6.cbox.ws/box/?boxid=420998&amp;boxtag=j8042w&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain" style="border:#B9C8A0 1px solid;" id="cboxmain"></iframe></div>
</div>;
        }
		(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .block-a { width: 902px !important; height: 100% !important;}";
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