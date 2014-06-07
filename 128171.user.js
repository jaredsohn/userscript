// ==UserScript==
// @name           NoEmoticons
// @namespace      Wikia chat
// @description    Disables choosen Emoticons in wikia.com chat
// @include        http://*.wikia.com/wiki/Special:Chat
// ==/UserScript==
var disabled_emoticons = ":D@:)@;)";
var emo = disabled_emoticons.replace(/\)/gi, "\\)").split("@");
var js = "Javascript: EMOTICONS = EMOTICONS";
for (var i in emo) {
	js += ".replace(/" + emo[i] + "/gi,'UNIQUE_ID" + i + "')"
}
js += "; void 0";
document.location.href = js;