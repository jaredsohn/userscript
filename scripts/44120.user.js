// ==UserScript==
// @name           Flip Test
// @namespace      x
// @description    x
// @source         x
// @identifier     x
// @version        1.2
// @date           2009-03-12
// @creator        x
// @include        http://apps.facebook.com/packrat/users/*
// @include        http://apps.new.facebook.com/packrat/users/*
// ==/UserScript==

var version_timestamp   = 200903120120;

var IMG_BASE64 = "data:image/gif;base64,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yAmWoYAa2vCGOMyhDnfIwx768IdADKIQ/4dIxCIa8YhITKISl9hC4yzRhss4wUJOcYAqWvGKWMyiFrfIxS568YtgDKMYx0jGMprxjGhMoxrXeIAmFoeNVjzFQtaAgDra8Y54zKMe98jHPvrxj4AMpCAHSchCGvKQiEykIheJADfihpF2XINCUkGASlrykpjMpCY3yclOevKToAylKEdJylKa8pSoTKUqV1lJR96GlZdMRULEYYBa2vKWuMylLnfJy1768pfADKYwh0nMYhrzmMhMpjKXWUtX2oaZt/xGQoAxgGpa85rYzKY2t8nNbnrzm+AMpzjHSc5ymvOc6EynOtdZTWeihp3XBEZCABGAetrznvjMpz73yf/PfvrznwANqEAHStCCGvSgCE2oQhdaT3eehqH3BERCriGAilr0ohjNqEY3ytGOevSjIA2pSEdK0pKa9KQoTalKV1pRh5qGpRedRkIAQNOa2vSmOM2pTnfK05769KdADapQh0rUohr1qEhNqlJr6lLLLPWmCalGAaZK1apa9apYzapWt8rVrnr1q2ANq1jHStaymvWsaE3rVJtaGbVWFQEJYQQ55krXutr1rnjNq173yte++vWvgA2sYAdL2MIa9rCITexc2UoZxdaVEQkhhWMnS9nKWvaymM2sZjHLWL9UlhQJCcJmR0va0pr2tKgdbWf7UtkgJGQXqY2tbGdL29r/bna1fKnsLhSyB9v69rfADS5wcbsXyu5hIXYQrnKXy9zmOpa4W6GsHRZygkw497rYza52oauVyWZCigtZhHbHS97y0pa7WZnsIhwiCPO6973wrSx6seJYQTzkBNKIr373y9++ztcpijUDeB2iCTP098AI3u9/m5JYM2hCIifoRYInTOHtLngpiO3FgCWCiUZU+MMgHu6FlWLYRmACIxnwBARCzOIWn3bEJB4sBDwhu5YEYhiE6MMBXMzjHj8Xxj756wH6QIhhBOJkSE5yvoDsEyU7+ckJY/JToEzlKi9Zyjuxspa3bBUsZ5nLYA5zUbysk6mQAANX6MANWjGGGEzg/81wjrOc50znOtv5znjO85svAAIsgOACF9CzoAdN6EIb+tCITrSiCQ3oPv8ZzmTOSZ5jMIZW3KADV8AACTKyAQyIgAM9KEInnnGMMEjg1KhOtapXzepWu/rVsI41qpeAgiigQAgpkLWud83rXvv618AOtrB5nQIh1BoFS0B1pFci6zAc4xmdKEIPOCACDGyAIhuwQAeqoIEVSCEEYFDGFr6gAhVQ4NzoTre6183udrv73fCONwVcwAIosEAJLpC3vvfN7377+98AD7jA+e0CJdSbBfk+97JVAu9yf2ELygBDCKSwAg1UoQMWuDZEMjCDC2ggGKDIgi/kwAlK4OFoKP9PucpXzvKWu/zlMJfZwlPSMzxQghNy8EUWQBEMDVxgBjVeiAdgYIMc6AIOWnjFH9bG9KY7/elQj7rUp071rc0cJWb7wyu0AAdd5MAGMPCA0DFwAyKUAhG/cAXj1s72trv97XCPu9zn7rernyRxrvgFIkpBhBtgQOwJwcAIWHEGSTiDdYhPvOIXz/jGO/7xkAed3U2yOmdI4gysGAEGEgKDGhABHKNwBPNGT/rSm/70qE+96lcfvMmXhHmOGMUZiFADGBxkAyLQQRnocAj4+f73wA++8IdP/OIbH3uuJwn8DkGHMuhABBoniAVAsAIeXAKC2M++9rfP/e57//vgz1//8keC/UvwYAUgsEBBSGADGoTAGi+Mv/znT//62//++M9/BscvEvl3IwQ0YAObNhAWQAYpgAxs8EQKuIAM2IAO+IAQGIESmEP8FxILyAbIkAJkoH4C4QFJ8ANzYAhwNIIkWIImeIIomIIqiIIVCBIkaAhz8ANJAHgZEAM7MAShAEk6uIM82IM++INAGIQ/2IIfsYOhMAQ7EAOyYwE58AKWAEtQGIVSOIVUWIVWeIVWSIQeIYWW8AI5wIEzoAFWEA3QVIZmeIZomIZquIZsuIZa2BFnyA22oAEzIBAdQAVOEAvwtId82Id++IeAGIiCGIhvyBF9GAtOQAUdIBAj8ARZ/5AHEBWJkjiJlFiJlniJmHiJhbgRk5gHRvAEIyAQHNAFXOANMHWKqJiKqriKrNiKrtiKm2gOqagNXNAFHCCKiqAFT7WLvNiLvviLwBiMwiiMseiLWqAItzgOo8gF0OBWzviM0BiN0jiN1FiN1BiL0BgOtZiMjZgFdeBj4BiOmRWLlVUHnxiK43CHTiAK4tiO7phY5EhZopCIizgOYWgFxPCO+riPgBWPk0UMc1iH48CEL8AM/HiQCHlX/uhYzOCFHFiDN2gKCTmRB7mQiWUKSKiEHZgENGAFcUCRIPmOFolYcWAFNDCDBGiAswAAIdmS4DiShgUAs6CBHCgQ7Od+d//gkjrpYjBZWHcAgAJYENM3CDwgCzt5lB/Wk4MlC9swCOlnELinA2gwBdiAlFaJYEoZWGowBWjwfNFHEJ2HBC9QCGpwlWapX1n5V2pQCC+ABLUXeCOgAS8wBbdwlnZpXmnZV7cwBS+gAZqnEB5gASOABGXAA5DgBneZmNiVl3rlBpDAA2iABCNgAYCXEB6AATWgAytQDF8wCaigmKCpXIx5V6gwCV9QDCugAzXwdw4BAyJwAT8gASFgBLjAC20gDJ8Qmro5W6P5CcLQBryAC0YQAhLwAxcgArYHEdm2bd32bWBAC1vQDOU2cNRZnexGb/aGb9a5ndzZnd75nQBXcAd/l3AUEIsNpwLNsAW0IHEUZ3EY95XK6WmgVgR6sAk7YGrDlp/62Wq0Zmu4tp8AGqACOqAECmzFdmzJdmqx2Gw7sAl6IG3UZm0ZcWZpdgMc0GaLlqEaWmd85meAtqEgGqIiOqIkimiN5qGQtomTNgYccGmZNoBiFqMyuhCxWBMBAQA7";

var version_scriptNum = 38386;
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"), 10)+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/"+version_scriptNum+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1], 10)>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/"+version_scriptNum);}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}if (typeof GM_registerMenuCommand !== "undefined") GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});if(typeof GM_xmlhttpRequest !== "undefined") updateCheck(false);

Utils = new Object();if (document.getElementsByClassName) {Utils.getElementsByClassName = function(classname, node) {if (!node) node = document;return node.getElementsByClassName(classname);};} else {Utils.getElementsByClassName = function(classname, node) {if (!node) node = document;var xpathExpression;var returnElements = new Array();xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);while (node = xpathResult.iterateNext()) {returnElements.push(node);} return returnElements;};}

function flipCards() {
  var MIN_DELAY = 40;
  var MAX_DELAY = 520;
  var MOD = 4 + Math.floor(3 * Math.random());
  var TIME_DELAY = MIN_DELAY + Math.floor((MAX_DELAY - MIN_DELAY) * Math.random());
  var TIME_DELAY2 = TIME_DELAY * 3;

  var count = flipCards.nextID;
  var pack = document.getElementById('app2431403991_pack');
  var elms = Utils.getElementsByClassName('card', pack);
  var evt = document.createEvent('MouseEvent');
  evt.initEvent('mousedown', true, true);
  var i = 0;
  for (var x in elms) {
    if (typeof elms[x] != 'object') continue;
    if (count == i) {
      elms[x].dispatchEvent(evt);
      flipCards.nextID++;
      var time = ((i+1) % MOD == 0) ? TIME_DELAY2 : TIME_DELAY;
      setTimeout(flipCards, time);
      return;
    }
    ++i;
  }
  var round = flipCards.round;
  flipCards.nextID = 0;
  if (round < 1) {
    flipCards.round = 1;
    setTimeout(flipCards, TIME_DELAY);
  }
}

(function () {

var page = location.href.split('/');

if (page.length > 6) return;
var nav = document.getElementById('app2431403991_nav');
var activeBox = Utils.getElementsByClassName('active', nav);
flipCards.nextID = 0;
flipCards.round = 1;
if (!activeBox.length) {
  var spot = Utils.getElementsByClassName('cards-sidebar');
  if (spot.length < 1) return;
  var outerDiv = spot[0];
  if (spot.length < 2) {
    var outer = document.getElementById('app2431403991_pack');
    var outerDiv = document.createElement('div');
    outerDiv.className = "cards-sidebar";
    outer.appendChild(outerDiv);
  }
  var css = ".app_content_2431403991 .user .cards-sidebar, .app_content_2431403991 .cards-sidebar {height: 190px !important;} .app_content_2431403991 a.button.grey, .app_content_2431403991 a.button.grey span{ background-image: url("+IMG_BASE64+");}";
  GM_addStyle(css);
  var mainbox = document.createElement('div');
  outerDiv.appendChild(mainbox);
  
  var div = document.createElement('div');
  div.className = "app_content_2431403991";
  mainbox.appendChild(div);
  var p = document.createElement('p');
  div.appendChild(p);
  p.className = "buttons";
  var a = document.createElement('a');
  p.appendChild(a);
  a.href = "#";
  a.addEventListener('click', flipCards,false);
  a.className = "button grey";
  var span = document.createElement('span');
  a.appendChild(span);
  var text = document.createTextNode("Flip all ");
  span.appendChild(text);
}

//end main function
} ) ();
