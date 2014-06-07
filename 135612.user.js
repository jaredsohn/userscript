// ==UserScript==
// @name           SAKO
// @namespace      Mana
// @description    Delete multiples blank lines on jeuxvideo.com forum messages
// @version        1.0.0
// @include        *
// @include        http://www.jeuxvideo.com/forums/1-*
// @copyright      2012 Luthien Sofea Elanesse
// @copyright      <jeuxvideo.nyu@gmail.com>
// @resource       licence   http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

function trim(post) {
	var child, i, count, max;
	max = 0;
	for (i = post.childNodes.length; i > 0; i--) {
		child = post.childNodes[i - 1];
		switch (child.nodeType) {
		case Node.ELEMENT_NODE:
			switch (child.tagName.toLowerCase()) {
			case "br":
				count++;
				if (count > 4) {
					post.removeChild(child);
				}
				break;
			default:
				max = Math.max(count, max);
				count = 0;
				break;
			}
			break;
		case Node.TEXT_NODE:
			if (!/^\s*$/.test(child.nodeValue)) {
				max = Math.max(count, max);
				count = 0;
			}
			break;
		case Node.ATTRIBUTE_NODE:
		case Node.CDATA_SECTION_NODE:
		case Node.ENTITY_REFERENCE_NODE:
		case Node.ENTITY_NODE:
		case Node.PROCESSING_INSTRUCTION_NODE:
		case Node.COMMENT_NODE:
		case Node.DOCUMENT_NODE:
		case Node.DOCUMENT_TYPE_NODE:
		case Node.DOCUMENT_FRAGMENT_NODE:
		case Node.NOTATION_NODE:
		default:
			break;
		}
	}
	return max;
}
function search() {
	var mess, i;
	mess = document.getElementsByClassName("post");
	for (i = 0; i < mess.length; i++) {
		trim(mess[i]);
	}
}
search();