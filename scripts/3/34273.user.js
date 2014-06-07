// ==UserScript==
// @name           Popmundo always read Rules of conduct
// @namespace      Scriptmundo
// @description    I hate to waste my blog posts cause of those freaking rules!
//@include http://www*.popmundo.com/Common/CharacterBlog.asp*
// ==/UserScript==


function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const RULES_CHECK_XPATH = "//input[contains(@name, 'HasReadROC')]";

var rulesCheckBoxNode = xpathNode(RULES_CHECK_XPATH);

if (!rulesCheckBoxNode.checked)
	rulesCheckBoxNode.checked = true;
	