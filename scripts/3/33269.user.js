/*

invisionfreebbcode.user.js -- Invision Free Discussion Forums BBCode fix for Firefox

*/

// ==UserScript==
// @name Invisionfree Forum BB Code fix
// @namespace http://www.snowcrest.net/donnelly/
// @description Invision Free Discussion Forums BBCode fix for Firefox
// @include http*.invisionfree.com*
// @exclude

// @Version 1.1
// @Firefox 2
// @GmVersion 0.6.6
// @Author William Donnelly
// @Email snowcrest.net | donnelly
// ==/UserScript==


newDoInsert = function (ibTag, ibClsTag, isSingle)
{
var isClose = false;
var obj_ta = unsafeWindow.document.REPLIER.Post;

if ( (unsafeWindow.myVersion >= 4) && unsafeWindow.is_ie && unsafeWindow.is_win)
{
if(obj_ta.isTextEdit){
obj_ta.focus();
var sel = document.selection;
var rng = sel.createRange();
rng.colapse;
if((sel.type == "Text" || sel.type == "None") && rng != null){
if(ibClsTag != "" && rng.text.length > 0)
ibTag += rng.text + ibClsTag;
else if(isSingle)
isClose = true;

rng.text = ibTag;
}
}
else{
if(isSingle)
isClose = true;

obj_ta.value += ibTag;
}

} else {
if (obj_ta.setSelectionRange) {
sText = obj_ta.value;
nStart = obj_ta.selectionStart;
nEnd = obj_ta.selectionEnd;
nScrollTop = obj_ta.scrollTop;

if (nStart != nEnd) {
sPreText = sText.substr (0, nStart);
sPostText = sText.substr (nEnd, obj_ta.textLength);
sText = sText.substr (nStart, nEnd - nStart);

obj_ta.value = sPreText + ibTag + sText + ibClsTag + sPostText;
obj_ta.setSelectionRange (nStart + ibTag.length, nStart + ibTag.length + sText.length);

} else {
sPreText = sText.substr (0, nStart);
sPostText = sText.substr (nEnd, obj_ta.textLength);

obj_ta.value = sPreText + ibTag + sPostText;
obj_ta.setSelectionRange (nStart + ibTag.length, nStart + ibTag.length);
isClose = true;
}

obj_ta.scrollTop = nScrollTop;

} else {
if (isSingle)
isClose = true;

obj_ta.value += ibTag;
}
}

obj_ta.focus();

return isClose;
}

unsafeWindow.doInsert = newDoInsert;

// EOF