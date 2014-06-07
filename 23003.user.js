// This is an improved version of Cricinfo de-Framer (http://userscripts.org/scripts/show/9391)

// ==UserScript==
// @name           Cricinfo de-Framer plus
// @namespace      jawaji.com
// @description    Automatically opens cricinfo live scorecard frame to open in its own window or tab and removes width restrictions
// @include        *cricinfo.com/*engine/current/match*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var mainframe = window.top.document.getElementsByName('mainframe');
	if (mainframe && mainframe.length > 0) {
		window.top.location.href = mainframe[0].src;
	} else {
		var tables = document.getElementsByTagName('table');
		for(var i = 0; i < tables.length; i++) {
			//if (tables[i].hasAttribute('width')) {
				tables[i].setAttribute('width', '100%');
			//}
		}		
	}
},false);

// function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698
function addHTML (ele, html) {
  if (document.all)
    ele.insertAdjacentHTML('beforeEnd', html);
  else if (document.createRange) {
    var range = document.createRange();
    range.setStartAfter(ele.lastChild);
    var docFrag = range.createContextualFragment(html);
    ele.appendChild(docFrag);
  }
  else if (document.layers) {
    var l = new Layer(window.innerWidth);
    l.document.open();
    l.document.write(html);
    l.document.close();
    l.top = document.height;
    document.height += l.document.height;
    l.visibility = 'show';
  }
}

cricinfo_js = 
	"<script language='javascript'>\n" + 
	"<!-- \n" + 
	"self.check_frameset = function () {\n" +
	"    return false;\n" +
	"}\n" +
	"-->\n" + 
	"</script>\n";
	
addHTML(document.body, cricinfo_js);