// ==UserScript==
// @name        cob
// @namespace   chronicles-of-blood.com
// @description cob1
// @include     http://chronicles-of-blood.com/cob/home/hom*
// @exclude	http://chronicles-of-blood.com/cob/home/start
// @version     1
// ==/UserScript==
var attempt = 0;

checkfeed();

function checkfeed()
{
//alert('start');
attempt++;
if (attempt == 10) {
attempt = 0;
document.location.replace("http://chronicles-of-blood.com/cob/home/home");
setTimeout(checkfeed, 5000);
return 0;
}

setTimeout(checkfeed, 5000);

var liveFeedB = document.getElementById("liveFeedB");
if (liveFeedB != null) {
//разворачиваем или обновляем список
fireEvent(liveFeedB, "click");
}

var needrefresh = 0;

//щелчок по портрету игрока
var elem1 = document.getElementsByClassName("quad90");
for (var i = 0; i < elem1.length; i++) {
 fireEvent(elem1[i], "click");

//щелчок по действию ассиста
var cl1 = document.getElementsByClassName("click1Assist");
for (var j = 0; j < cl1.length; j++) {
fireEvent(cl1[j], "click");
needrefresh = 1;
}

var cl2 = document.getElementsByClassName("shatterAssist");
for (var j = 0; j < cl2.length; j++) {
fireEvent(cl2[j], "click");
needrefresh = 1;
}

var cl3 = document.getElementsByClassName("click2Assist");
for (var j = 0; j < cl3.length; j++) {
fireEvent(cl3[j], "click");
needrefresh = 1;
}

}

//if (needrefresh==1) {
//document.location.replace("http://chronicles-of-blood.com/cob/home/home");
//return 0;
//}
var boss = document.getElementsByClassName("liveFeedBossesH facebookOnly");


if (elem1.length == 0 && boss.length != 0) {
 //нет игроков, переход в гл меню и повторный поиск
 //alert('no need for help');
 document.location.replace("http://chronicles-of-blood.com/cob/home/home");
 return 0;
}
var msg = document.getElementById("message");


return 0;
}

function fireEvent(element, event)
{
       if (document.createEventObject)
        {
                // IE
                var evt = document.createEventObject();
                return element.fireEvent('on' + event, evt);
        }
        else
        {
                // firefox + others
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true ); // event type,bubbling,cancelable
                return !element.dispatchEvent(evt);
        }
}