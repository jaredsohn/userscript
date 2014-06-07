// ==UserScript==
// @name           reply_emo_edit
// @namespace      http://www.userscripts.org/
// @include        *:88/forums.php?*
// @include        *:88/comment.php?*
// @include        *:88/markets.php?*
// ==/UserScript==

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
      }
}

var logo = document.createElement("div");

logo.innerHTML = "<div align='center'><img src='/pic/smilies/yoyo_77.gif' id=':lol:' /><img src='/pic/smilies/yoyo_65.gif' id=':-O' /><img src='/pic/smilies/yoyo_01.gif' id='8-)' /><img src='/pic/smilies/yoyo17.gif' id=':a1:' /><img src='/pic/smilies/yoyo75.gif' id=':a3:' /><img src='/pic/smilies/yoyox32.gif' id=':a4:' /><img src='/pic/smilies/yoyo66.gif' id=':a7:' /><img src='/pic/smilies/yoyo122.gif' id=':a9:' /><img src='/pic/smilies/yoyo_47.gif' id=':no:' /><img src='/pic/smilies/yoyo_24.gif' id=':love:' /><img src='/pic/smilies/yoyo_92.gif' id=':crazy:' /><img src='/pic/smilies/yoyo_53.gif' id=':kiss:' /><br><img src='/pic/smilies/hmm.gif' id=':hmm:' /><img src='/pic/smilies/grin.gif' id=':-D' /><img src='/pic/smilies/wink.gif' id=';-)' /><img src='/pic/smilies/weep.gif' id=':weep:' /><img src='/pic/smilies/sleeping.gif' id='|-)' /><img src='/pic/smilies/whistle.gif' id=':whistle:' /><img src='/pic/smilies/thumbsup.gif' id=':thumbsup:' /><img src='/pic/smilies/thumbsdown.gif' id=':thumbsdown:' /><img src='/pic/smilies/blush.gif' id=':blush:' /><img src='/pic/smilies/hmmm.gif' id=':hmmm:' /><img src='/pic/smilies/shifty.gif' id=':shifty:' /><img src='/pic/smilies/wave.gif' id=':wave:' /><img src='/pic/smilies/wavecry.gif' id=':wavecry:' /><img src='/pic/smilies/ras.gif' id=':ras:' /><img src='/pic/smilies/punk.gif' id=':punk:' /><img src='/pic/smilies/tease.gif' id=':tease:' /><img src='/pic/smilies/wub.gif' id=':wub:' /><img src='/pic/smilies/hooray.gif' id=':hooray:' /><img src='/pic/smilies/yikes.gif' id=':yikes:' /><img src='/pic/smilies/shit.gif' id=':shit:' /><img src='/pic/smilies/bow.gif' id=':bow:' /><img src='/pic/smilies/devil.gif' id=':devil:' /><img src='/pic/smilies/question.gif' id=':?:' /><img src='/pic/smilies/excl.gif' id=':!:' /><img src='/pic/smilies/wall.gif' id=':wall:' /><img src='/pic/smilies/happy2.gif' id=':happy2:' /><br> <img id='[img][/img]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> </div>";

if(window.location.href.toLowerCase().match("comment.php?")){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);

}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}

document.getElementById('[img][/img]').src = "data:image/gif;base64,R0lGODlhEgARALMAAJAwL8%2FI%2F2BnAC8wL8%2F%2F%2F5BnAJCXz5DIz5DIL5DIAABnAACXAGCXAAAAAP%2F%2F%2F5DI%2FyH5BAAAAAAALAAAAAASABEAAAR20MlJq2zu6c37w164gc9RPszBGKapkQH6JAljxy6p0rySciATg5dQLDSxV0Y2o9mMrs%2BSwBAkHgtBlqEgKCU2ASOwCADIjAlmkgZkAdXKugIYWC4OhH6PGBT4exg2gwxwcIQ2GEaLC4yOCxiNko%2BODZaXmJmYEQA7";
document.getElementById('[b][/b]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAAACH5BAAAAAAALAAAAAASABEAAAI3hI9pAeIPo2CyPmornqH7EG0cOEKi56BXc3Wpu5ofHLekmrLvTU96CczZZqFfpnY0GZOzpjNQAAA7";
document.getElementById('[i][/i]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI0jI9pEuMP42CyPmorjqJ3uHECwDUS8JXaKIUOKmgmyLbzm9oiKV9eDrplLsLhpDj8KZe%2FAgA7";
document.getElementById('[u][/u]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI5jI9pEuMP42CyPmornqJzfzWXMEYbV0IniKqiw7Lw29azSsJ5iAMDIJvQPkFhRvPqKJeuo2QJjS4LADs%3D";
document.getElementById('[color=blue][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAA%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=green][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwDIACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=red][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8AACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=magenta][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8A%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";

//
document.getElementById(':lol:').addEventListener("click", setsmile, true);
document.getElementById(':-O').addEventListener("click", setsmile, true);
document.getElementById('8-)').addEventListener("click", setsmile, true);
document.getElementById(':a1:').addEventListener("click", setsmile, true);
document.getElementById(':a3:').addEventListener("click", setsmile, true);
document.getElementById(':a4:').addEventListener("click", setsmile, true);
document.getElementById(':a7:').addEventListener("click", setsmile, true);
document.getElementById(':a9:').addEventListener("click", setsmile, true);
document.getElementById(':no:').addEventListener("click", setsmile, true);
document.getElementById(':love:').addEventListener("click", setsmile, true);
document.getElementById(':crazy:').addEventListener("click", setsmile, true);
document.getElementById(':kiss:').addEventListener("click", setsmile, true);

document.getElementById(':hmm:').addEventListener("click", setsmile, true);
document.getElementById(':-D').addEventListener("click", setsmile, true);
document.getElementById(';-)').addEventListener("click", setsmile, true);
document.getElementById(':weep:').addEventListener("click", setsmile, true);
document.getElementById('|-)').addEventListener("click", setsmile, true);
document.getElementById(':whistle:').addEventListener("click", setsmile, true);
document.getElementById(':thumbsup:').addEventListener("click", setsmile, true);
document.getElementById(':thumbsdown:').addEventListener("click", setsmile, true);
document.getElementById(':blush:').addEventListener("click", setsmile, true);
document.getElementById(':hmmm:').addEventListener("click", setsmile, true);
document.getElementById(':shifty:').addEventListener("click", setsmile, true);
document.getElementById(':wave:').addEventListener("click", setsmile, true);
document.getElementById(':wavecry:').addEventListener("click", setsmile, true);
document.getElementById(':ras:').addEventListener("click", setsmile, true);
document.getElementById(':punk:').addEventListener("click", setsmile, true);
document.getElementById(':tease:').addEventListener("click", setsmile, true);
document.getElementById(':wub:').addEventListener("click", setsmile, true);
document.getElementById(':hooray:').addEventListener("click", setsmile, true);
document.getElementById(':yikes:').addEventListener("click", setsmile, true);
document.getElementById(':shit:').addEventListener("click", setsmile, true);
document.getElementById(':bow:').addEventListener("click", setsmile, true);
document.getElementById(':devil:').addEventListener("click", setsmile, true);
document.getElementById(':?:').addEventListener("click", setsmile, true);
document.getElementById(':!:').addEventListener("click", setsmile, true);
document.getElementById(':wall:').addEventListener("click", setsmile, true);
document.getElementById(':happy2:').addEventListener("click", setsmile, true);

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);
document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);