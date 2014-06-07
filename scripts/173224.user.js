// ==UserScript==
// @name            Hack Forums Smiley on PMs
// @namespace       Snorlax
// @description     Replaces smileys like :sad:with the image!
// @include         *hackforums.net/private.php?action=read&pmid=*
// @version         1.0
// ==/UserScript==

var mapObj = {
	":pinch:":"<img src='http://x.hackforums.net/images/smilies/pinch.gif' />",
	":victoire:":"<img src='http://x.hackforums.net/images/smilies/victoire.gif' />",
	":hehe:":"<img src='http://x.hackforums.net/images/smilies/hehe.gif' />",
	":oui:":"<img src='http://x.hackforums.net/images/smilies/oui.gif' />",
	":bebe-pleure:":"<img src='http://x.hackforums.net/images/smilies/bebe-pleure.gif' />",
	":ohmy:":"<img src='http://x.hackforums.net/images/smilies/ohmy.gif' />",
	":blink:":"<img src='http://x.hackforums.net/images/smilies/blink.gif' />",
	":superman:":"<img src='http://x.hackforums.net/images/smilies/superman.gif' />",
	":nono:":"<img src='http://x.hackforums.net/images/smilies/nono.gif' />",
	":biggrin:":"<img src='http://x.hackforums.net/images/smilies/biggrin.gif' />",
    ":sad:":"<img src='http://x.hackforums.net/images/smilies/sad.gif' />",
	":unsure:":"<img src='http://x.hackforums.net/images/smilies/unsure.gif' />",
	":glare:":"<img src='http://x.hackforums.net/images/smilieslare.gif' />",
	":roflmao:":"<img src='http://x.hackforums.net/images/smilies/roflmao.gif' />",
	":devlish:":"<img src='http://x.hackforums.net/images/smilies/devlish.gif' />",
	":rolleyes:":"<img src='http://x.hackforums.net/images/smilies/rolleyes.gif' />",
	":cool:":"<img src='http://x.hackforums.net/images/smilies/cool.gif' />",
	":gratte:":"<img src='http://x.hackforums.net/images/smiliesratte.gif' />",
	":confused:":"<img src='http://x.hackforums.net/images/smilies/confused.gif' />",
	":blackhat:":"<img src='http://x.hackforums.net/images/smilies/blackhat.gif' />",
	":ninja:":"<img src='http://x.hackforums.net/images/smilies/ninja.gif' />",
	":blush:":"<img src='http://x.hackforums.net/images/smilies/blush.gif' />",
	":lipssealed:":"<img src='http://x.hackforums.net/images/smilies/lipssealed.gif' />",
	":yeye:":"<img src='http://x.hackforums.net/images/smilies/yeye.gif' />",
	":non:":"<img src='http://x.hackforums.net/images/smilies/non.gif' />",
	":smile:":"<img src='http://x.hackforums.net/images/smilies/smile.gif' />",
	":whistle:":"<img src='http://x.hackforums.net/images/smilies/whistle.gif' />",
	":sleep:":"<img src='http://x.hackforums.net/images/smilies/sleep.gif' />",
	":evilgrin:":"<img src='http://x.hackforums.net/images/smilies/evilgrin.gif' />",
	":omg:":"<img src='http://x.hackforums.net/images/smilies/omg.gif' />",
	":tongue:":"<img src='http://x.hackforums.net/images/smilies/tongue.gif' />",
	":mad:":"<img src='http://x.hackforums.net/images/smilies/mad.gif' />",
	":huh:":"<img src='http://x.hackforums.net/images/smilies/huh.gif' />",
	":thumbsup:":"<img src='http://x.hackforums.net/images/smilies/thumbsup.gif' />",
	":wacko:":"<img src='http://x.hackforums.net/images/smilies/wacko.gif' />",
	":pirate:":"<img src='http://x.hackforums.net/images/smilies/pirate.gif' />"
};
function replaceAll(str,mapObj){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched];
    });
}
document.body.innerHTML = replaceAll(document.body.innerHTML,mapObj);