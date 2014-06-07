// ==UserScript==
// @name           CS2 CheckTitle
// @namespace      CS
// @description    Don't annoy the recipient(s) of your messages with the standard title
// @include        http://*.chosenspace.com/index.php?go=messages&*
// @include        http://*.chosenspace.com/index.php?go=message_group*
// @include        http://*.chosenspace.com/index.php?go=message_all*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
var sendArray=document.evaluate("//input[@value='Send']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var send=sendArray.snapshotItem(0);
if(send) {
	send.setAttribute('onmouseover',"var t=document.getElementsByName('msg_subject')[0];if(t!=null){if(t.value!=t.getAttribute('value')){t.setAttribute('value',t.value)};if(t.getAttribute('value')=='Message Title'||t.getAttribute('value')=='RE: Message Title'){return_value=prompt('Please do not annoy the recipient(s) of this Message with the infamous Message Title','');if(return_value==null||return_value==''||return_value=='Message Title'||return_value=='RE: Message Title'){this.type='button';}else{t.setAttribute('value',return_value);t.value=return_value;this.type='submit';}}else{this.type='submit';}};previewIt();");
}
