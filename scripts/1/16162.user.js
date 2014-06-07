// ==UserScript==
// @name ogame - amelioration des case galaxie et systeme solaire
// @author call Of duty
// @description amelioration des case galaxie et systeme solaire
// @include http://*/game/index.php?page=galaxy*
// ==/UserScript==

(function(){

	function set_style_script(doc, element, new_style) {
	    element.setAttribute('style', new_style);
	};
	
	set_style_script(window.document,document.evaluate("//table[@id='t2']/TBODY[1]/TR[1]/TD[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;font-style: normal;font-size: medium;");
	set_style_script(window.document,document.evaluate("//table[@id='t2']/TBODY[1]/TR[2]/TD[1]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;vertical-align: middle;font-style: normal;font-weight: lighter;font-size: large;height: 24px;");
	set_style_script(window.document,document.evaluate("//table[@id='t2']/TBODY[1]/TR[2]/TD[2]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;vertical-align: middle;font-style: normal;font-weight: lighter;font-size: large;height: 24px;");
	set_style_script(window.document,document.evaluate("//table[@id='t2']/TBODY[1]/TR[2]/TD[3]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;vertical-align: middle;font-style: normal;font-weight: lighter;font-size: large;height: 24px;");
	set_style_script(window.document,document.evaluate("//table[@id='t3']/TBODY[1]/TR[1]/TD[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;font-style: normal;font-size: medium;");
	set_style_script(window.document,document.evaluate("//table[@id='t3']/TBODY[1]/TR[2]/TD[1]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;vertical-align: middle;font-style: normal;font-weight: lighter;font-size: large;height: 24px;");
	set_style_script(window.document,document.evaluate("//table[@id='t3']/TBODY[1]/TR[2]/TD[2]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;vertical-align: middle;font-style: normal;font-weight: lighter;font-size: large;height: 24px;");
	set_style_script(window.document,document.evaluate("//table[@id='t3']/TBODY[1]/TR[2]/TD[3]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;vertical-align: middle;font-style: normal;font-weight: lighter;font-size: large;height: 24px;");
	set_style_script(window.document,document.evaluate("//table[@id='t1']/TBODY[1]/TR[2]/TD[1]/INPUT[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"text-align: center;font-style: normal;font-weight: lighter;font-size: large;width: 99%;");
})();