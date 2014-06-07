// ==UserScript==
// @name Smile for  http://vkontakte.ru
// @namespace vkontakte
// @include http://*vkontakte.ru*
// @version 1.0
// http://dmhope.ru
// Author: DMhope
// ==/UserScript==

(function() {

if (window.location.hostname.match(/vkontakte/)) {   
smid = [
  ['smile',       /:\)/gi],
  ['sadsmile',       /:\(/gi],
  ['bigsmile',       /:D/gi],
  ['cool',       /8-\)/gi],
  ['surprised',       /:o/gi],
  ['wink',       /;\)/gi],
  ['crying',       /;\(/gi],
  ['kiss',       /:\*/gi],
  ['tongueout',       /:p/gi],
  ['blush',       /:\$/gi],
  ['angry',       /:\@/gi],
  ['giggle',       /\(chuckle\)/gi],
  ['evilgrin',       /\(eg\)/gi],
  ['rofl',       /\(rofl\)/gi],
  ['handshake',       /\(handshake\)/gi],
  ['yes',       /\(y\)/gi],
  ['no',       /\(n\)/gi],
  ['party',       /\(party\)/gi],
  ['happy',       /\(happy\)/gi],
  ['fubar',       /\(fubar\)/gi],
  ['brokenheart',       /\(h\)/gi],
  ['flower',       /\(f\)/gi],
  ['cake',       /\(\^\)/gi],
  ['cash',       /\(cash\)/gi],
  ['mail',       /\(e\)/gi],
  ['time',      /\(o\)/gi]
]

title = [
  ['Улыбка',     /:\)/gi],
  ['Грущу',       /:\(/gi],
  ['Смеюсь',       /:D/gi],
  ['Крутой',       /8-\)/gi],
  ['Удивляюсь',       /:o/gi],
  ['Подмигиваю',       /;\)/gi],
  ['Плачу',       /;\(/gi],
  ['Поцелуй',       /:\*/gi],
  ['Ухмыляюсь',       /:p/gi],
  ['Краснею',       /:\$/gi],
  ['Злой',       /:\@/gi],
  ['Хихи',       /\(chuckle\)/gi],
  ['Злобный',       /\(eg\)/gi],
  ['Очень смешно',       /\(rofl\)/gi],
  ['Рукопожатие',       /\(handshake\)/gi],
  ['Да',       /\(y\)/gi],
  ['Нет',       /\(n\)/gi],
  ['Праздник',       /\(party\)/gi],
  ['Счастье',       /\(happy\)/gi],
  ['Глупый',       /\(fubar\)/gi],
  ['Разбитое сердце',       /\(h\)/gi],
  ['Цветок',       /\(f\)/gi],
  ['Торт',       /\(\^\)/gi],
  ['Деньги',       /\(cash\)/gi],
  ['Почта',       /\(e\)/gi],
  ['Часы',      /\(o\)/gi]
]

function replacer (m, m1, m2) {
  if (Math.random() > 0.5) {
return m1 + pickRandomWord() + m2;
  } else return m;
} 

function xform(s) { 
  s = s.replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  for (var i = 0; i < smid.length; i++) 
  {
  
    s = s.replace(smid[i][1], ' <img style=" padding: 1px;" src="http://dmhope.ru/_sm/' + smid[i][0] +'.gif" alt="(Загрузка изображения)"  title="' + title[i][0] +'" />')
  }
  return s;
} 

function smilize_node(text_node, p) {
  var s = text_node.data;
  
  var parent = p;
  if (!p) parent = text_node.parentNode;
  
  if (s.match(/\.write/)) {
    return;
  }
  
  try {
    var new_node = document.createElement("span");
    var new_content = xform(s);
    if (new_content != s) {
      new_node.innerHTML = new_content;
      parent.replaceChild(new_node, text_node);
    }
  }catch(e) {    
  }
}

if (document.evaluate) { 
  var textnodes = document.evaluate( "//table//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < textnodes.snapshotLength; i++) { 
     node = textnodes.snapshotItem(i); 
     smilize_node(node, null);
  }
} else {
  function processNode(node, parent) {
      if (node.nodeType == 3) {
          smilize_node(node, parent);
      } else  if (node.nodeType == 1) {
        var i;                   
        for (i = 0; i < node.childNodes.length; i++) {
            processNode(node.childNodes[i], node);
        }
    }
  }
  processNode(document.body, document.body);
}
//document.getElementById("fBox2");
}

})();

var allText = document.documentElement.innerHTML;
var cont = document.createElement("div");
cont.setAttribute("style", "float:left;");
var addon=document.createElement("span");
cont.innerHTML += "<script type=\"text/javascript\" src=\"http://dmhope.ru/js/DMvksm.js\"></script>";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/smile.gif\" onclick=\"emoticon(':)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/sadsmile.gif\" onclick=\"emoticon(':(','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/bigsmile.gif\" onclick=\"emoticon(':D','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/cool.gif\" onclick=\"emoticon('8-)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/surprised.gif\" onclick=\"emoticon(':o','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/wink.gif\" onclick=\"emoticon(';)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/crying.gif\" onclick=\"emoticon(';(','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/kiss.gif\" onclick=\"emoticon(':*','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/tongueout.gif\" onclick=\"emoticon(':p','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/blush.gif\" onclick=\"emoticon(':$','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/angry.gif\" onclick=\"emoticon(':@','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/giggle.gif\" onclick=\"emoticon('(chuckle)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/evilgrin.gif\" onclick=\"emoticon('(eg)','reply_field');return false;\" /><br>";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/rofl.gif\" onclick=\"emoticon('(rofl)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/handshake.gif\" onclick=\"emoticon('(handshake)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/yes.gif\" onclick=\"emoticon('(y)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/no.gif\" onclick=\"emoticon('(n)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/party.gif\" onclick=\"emoticon('(party)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/happy.gif\" onclick=\"emoticon('(happy)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/fubar.gif\" onclick=\"emoticon('(fubar)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/brokenheart.gif\" onclick=\"emoticon('(h)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/flower.gif\" onclick=\"emoticon('(f)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/cake.gif\" onclick=\"emoticon('(^)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/cash.gif\" onclick=\"emoticon('(cash)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/mail.gif\" onclick=\"emoticon('(e)','reply_field');return false;\" />";
cont.innerHTML += "<img style=\"cursor: pointer; margin:0;padding:1px;border:0;\" src=\"http://dmhope.ru/_sm/time.gif\" onclick=\"emoticon('(o)','reply_field');return false;\" />";



cont.appendChild(addon);
var addon=document.createElement("span");

document.getElementById("br").appendChild(cont);
