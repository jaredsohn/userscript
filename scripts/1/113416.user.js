// ==UserScript==
// @name           lol_emo_lite
// @namespace  http://userscripts.org/scripts/show/113416
// @include        http://*lol*.com/forums.php?*
// @include        http://*lol*.com/comment.php?*
// @include        http://*lol*.com/markets.php?*
// @include        http://*lol*.com/sendmessage.php?*
// @include        http://*lol*.com/chat.php
// @include        http://*lol*.com/my.php
// @include        http://*lol*.com/my.php?edited=1
// @source         http://userscripts.org/scripts/show/113416
// @identifier     http://userscripts.org/scripts/source/113416.user.js
// @version       1.4
// @date           2012-06-11
// ==/UserScript==
// change from reply_emo
// edit by SpyBitX v1.4
// fixed some icons and add toolbar in chat
// add toolbar on my page

function insertAtCursor(myField, myValue) {
	var startPos = myField.selectionStart;
	var endPos = myField.selectionEnd;
	myField.value = myField.value.substring(0, startPos)
							+ myValue
							+ myField.value.substring(endPos, myField.value.length);
}

function setsmile(event){
      if(window.location.href.toLowerCase().match("comment.php?")){
		insertAtCursor(document.getElementsByName("text")[0],event.target.id);
		document.getElementsByName("text")[0].focus();

      }else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
		insertAtCursor(document.getElementsByName("body")[0],event.target.id);
		document.getElementsByName("body")[0].focus();
      }else if(window.location.href.toLowerCase().match("sendmessage.php?")){
		insertAtCursor(document.getElementsByName("msg")[0],event.target.id);
		document.getElementsByName("msg")[0].focus();
      }else if(window.location.href.toLowerCase().match("chat.php?")){
		insertAtCursor(document.getElementsByName("shbox_text")[0],event.target.id);
		document.getElementsByName("shbox_text")[0].focus();
      }else if(window.location.href.toLowerCase().match("my.php?")){
		insertAtCursor(document.getElementsByName("info")[0],event.target.id);
		document.getElementsByName("info")[0].focus();
      }
}

var logo = document.createElement("div");
var HTML = "";
var str =eval("[[':-)','smile1.gif'],[':smile:','smile2.gif'],[':-D','grin.gif'],[':lol:','laugh.gif'],[':w00t:','w00t.gif'],[':-P','tongue.gif'],[';-)','wink.gif'],[':-|','noexpression.gif'],[':-/','confused.gif'],[':-(','sad.gif'],[':weep:','weep.gif'],[':closedeyes:','closedeyes.gif'],[':thumbsup:','thumbsup.gif'],[':thumbsdown:','thumbsdown.gif'],[':yes:','yes.gif'],[':hmm:','hmm.gif'],[':hmmm:','hmmm.gif'],[':shifty:','shifty.gif'],[':rant:','rant.gif'],[':punk:','punk.gif'],[':rip:','rip.gif'],[':bow:','bow.gif']]");

for (var i=0; i < str.length ; i++) {

    var suggest = "<img src='/pic/smilies/"+str[i][1]+"' id='"+str[i][0]+"' />";
   
    if((i+1) % 25 ==0) suggest += "<br>";
    HTML += suggest;
}

var yoyo = eval("[[':lol2:','yoyo_77.gif'],[':-O','yoyo_65.gif'],['8-)','yoyo_01.gif'],[':au:','yociexp26.gif'],[':a1:','yoyo17.gif'],[':a2:','yoyo72.gif'],[':a4:','yoyox32.gif'],[':a5:','yoyox48.gif'],[':a6:','yoyo55.gif'],[':a7:','yoyo66.gif'],[':a9:','yoyo122.gif'],[':b4:','9.gif'],[':b7:','18.gif'],[':b8:','19.gif'],[':b9:','21.gif'],[':c3:','29.gif'],[':c4:','36.gif'],[':c6:','44.gif'],[':c8:','52.gif'],[':d1:','66.gif'],[':d4:','117.gif'],[':d9:','yoyo_51.gif'],[':e8:','103.gif'],[':uu:','yoyo_00.gif']]");

var HTML2 = "";
for (var i=0; i < yoyo.length ; i++) {

    var sug = "<img src='/pic/smilies/"+yoyo[i][1]+"' id='"+yoyo[i][0]+"' />";
   
    if((i+1) % 12 ==0) sug += "<br>";
    HTML2 += sug;
}

var BB = "<br><img id='[img][/img]' /> <img id='[url][/url]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> <img id='[youtube][/youtube]' /> <img id='[spoiler][/spoiler]' /> <img id='[quote][/quote]' /> <img id='[pre][/pre]' /> <img id='[*]' /> <img id='[size=4][/size]' />";

logo.innerHTML = "<div align='center'>" + HTML2 + "<br>" + HTML + BB + "</div>";

if(window.location.href.toLowerCase().match("comment.php?")){
	 //logo.innerHTML = "<div align='center'><table class='toolbar' width='600' border='1'><tr><td align='center'>" + HTML2 + "<br>" + HTML + BB + "</td></tr></table></div>";
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("sendmessage.php?")){
     toolb = document.getElementsByName("msg")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("chat.php?")){
	 toolb = document.getElementsByName("shbox")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("my.php?")){
	 toolb = document.getElementsByName("info")[0]
	 toolb.parentNode.insertBefore(logo,toolb);
}

for (var i=0; i < yoyo.length ; i++) {
    document.getElementById(yoyo[i][0]).addEventListener("click", setsmile, true);   
}

for (var i=0; i < str.length ; i++) {
    document.getElementById(str[i][0]).addEventListener("click", setsmile, true);   
}



document.getElementById('[img][/img]').src = "data:image/gif;base64,R0lGODlhEgARALMAAJAwL8%2FI%2F2BnAC8wL8%2F%2F%2F5BnAJCXz5DIz5DIL5DIAABnAACXAGCXAAAAAP%2F%2F%2F5DI%2FyH5BAAAAAAALAAAAAASABEAAAR20MlJq2zu6c37w164gc9RPszBGKapkQH6JAljxy6p0rySciATg5dQLDSxV0Y2o9mMrs%2BSwBAkHgtBlqEgKCU2ASOwCADIjAlmkgZkAdXKugIYWC4OhH6PGBT4exg2gwxwcIQ2GEaLC4yOCxiNko%2BODZaXmJmYEQA7";
document.getElementById('[url][/url]').src = "http://biodiv.mnhn.fr/misc_/Naaya/url.gif";
document.getElementById('[b][/b]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAAACH5BAAAAAAALAAAAAASABEAAAI3hI9pAeIPo2CyPmornqH7EG0cOEKi56BXc3Wpu5ofHLekmrLvTU96CczZZqFfpnY0GZOzpjNQAAA7";
document.getElementById('[i][/i]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI0jI9pEuMP42CyPmorjqJ3uHECwDUS8JXaKIUOKmgmyLbzm9oiKV9eDrplLsLhpDj8KZe%2FAgA7";
document.getElementById('[u][/u]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI5jI9pEuMP42CyPmornqJzfzWXMEYbV0IniKqiw7Lw29azSsJ5iAMDIJvQPkFhRvPqKJeuo2QJjS4LADs%3D";
document.getElementById('[color=blue][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAA%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=green][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwDIACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=red][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8AACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=magenta][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8A%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[youtube][/youtube]').src = "http://www.youtube.com/favicon.ico";
document.getElementById('[spoiler][/spoiler]').src = "http://www.wwe.in.th/forum/images/smilies/spoiler.gif";
document.getElementById('[quote][/quote]').src = "http://webboard.gg.in.th/images/goodgame/buttons/b_quote_post.png";
document.getElementById('[pre][/pre]').src = "http://forum.datatan.net/Themes/Apollobb/images/bbc/pre.gif";
document.getElementById('[*]').src = "http://cdn2.iconfinder.com/data/icons/ledicons/text_list_bullets.png";
document.getElementById('[size=4][/size]').src = "http://www.immigration.go.th/forum/Themes/classic/images/bbc/size.gif";

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[url][/url]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);
document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);
document.getElementById('[youtube][/youtube]').addEventListener("click", setsmile, true);
document.getElementById('[spoiler][/spoiler]').addEventListener("click", setsmile, true);
document.getElementById('[quote][/quote]').addEventListener("click", setsmile, true);
document.getElementById('[pre][/pre]').addEventListener("click", setsmile, true);
document.getElementById('[*]').addEventListener("click", setsmile, true);
document.getElementById('[size=4][/size]').addEventListener("click", setsmile, true);