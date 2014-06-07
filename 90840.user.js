// ==UserScript==
// @name           EMO_lolthai.com
// @namespace      http://userscripts.org/scripts/show/90840
// @include        *lolthai.com/forums.php?*
// @include        *lolthai.com/markets.php?*
// @include        *lolthai.com/comment.php?*
// @include        *lolthai.com/oforums.php?*
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

logo.innerHTML = "<div align='center'><img src='pic/smilies/92.gif' id=':f4:' /> <img src='pic/smilies/101.gif' id=':f5:' /> <img src='pic/smilies/102.gif' id=':f6:' /> <img src='pic/smilies/1033.gif' id=':f7:' /> <img src='pic/smilies/104.gif' id=':f8:' /> <img src='pic/smilies/105.gif' id=':f9:' /> <img src='pic/smilies/106.gif' id=':G1:' /> <img src='pic/smilies/87.gif' id=':e7:' /><br><br><img src='pic/smilies/21.gif' id=':b9:' /> <img src='pic/smilies/7.gif' id=':b3:' /> <img src='pic/smilies/1077.gif' id=':G2:' /> <img src='pic/smilies/108.gif' id=':G3:' /> <img src='pic/smilies/109.gif' id=':G4:' /> <img src='pic/smilies/110.gif' id=':G5:' /> <img src='pic/smilies/111.gif' id=':G6:' /> <img src='pic/smilies/yoyo_30.gif' id=':e4:' /> <img src='pic/smilies/yoyo_72.gif' id=':f3:' /><br><br><img src='pic/smilies/yoyo_77.gif' id=':lol2:' /> <img src='pic/smilies/yoyo_65.gif' id=':-O' /> <img src='pic/smilies/yoyo_01.gif' id='8-)' /> <img src='pic/smilies/yociexp26.gif' id=':au:' /> <img src='pic/smilies/yoyo17.gif' id=':a1:' /> <img src='pic/smilies/yoyo72.gif' id=':a2:' /> <img src='pic/smilies/yoyox32.gif' id=':a4:' /> <img src='pic/smilies/yoyox48.gif' id=':a5:' /> <img src='pic/smilies/yoyo55.gif' id=':a6:' /> <img src='pic/smilies/yoyo66.gif' id=':a7:' /> <img src='pic/smilies/yoyo122.gif' id=':a9:' /><br><br><img id='[img][/img]' /> <img id='[size=7][/size]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> <img id='[url=*URL*]*Text*[/url]' /> <img id='[youtube][/youtube]' /> <img id='[spoiler][/spoiler]' /> </div>";

if(window.location.href.toLowerCase().match("comment.php?")){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);

}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}

document.getElementById('[img][/img]').src = "data:image/gif;base64,R0lGODlhEgARALMAAJAwL8%2FI%2F2BnAC8wL8%2F%2F%2F5BnAJCXz5DIz5DIL5DIAABnAACXAGCXAAAAAP%2F%2F%2F5DI%2FyH5BAAAAAAALAAAAAASABEAAAR20MlJq2zu6c37w164gc9RPszBGKapkQH6JAljxy6p0rySciATg5dQLDSxV0Y2o9mMrs%2BSwBAkHgtBlqEgKCU2ASOwCADIjAlmkgZkAdXKugIYWC4OhH6PGBT4exg2gwxwcIQ2GEaLC4yOCxiNko%2BODZaXmJmYEQA7";
document.getElementById('[size=7][/size]').src = "http://www.immigration.go.th/forum/Themes/classic/images/bbc/size.gif";
document.getElementById('[b][/b]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAAACH5BAAAAAAALAAAAAASABEAAAI3hI9pAeIPo2CyPmornqH7EG0cOEKi56BXc3Wpu5ofHLekmrLvTU96CczZZqFfpnY0GZOzpjNQAAA7";
document.getElementById('[i][/i]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI0jI9pEuMP42CyPmorjqJ3uHECwDUS8JXaKIUOKmgmyLbzm9oiKV9eDrplLsLhpDj8KZe%2FAgA7";
document.getElementById('[u][/u]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI5jI9pEuMP42CyPmornqJzfzWXMEYbV0IniKqiw7Lw29azSsJ5iAMDIJvQPkFhRvPqKJeuo2QJjS4LADs%3D";
document.getElementById('[color=blue][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAA%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=green][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwDIACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=red][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8AACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=magenta][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8A%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[url=*URL*]*Text*[/url]').src = "http://img.ihere.org/uploads/5e6387e730.gif";
document.getElementById('[youtube][/youtube]').src = "http://www.youtube.com/favicon.ico";
document.getElementById('[spoiler][/spoiler]').src = "http://img.ihere.org/uploads/697322a18c.gif";

document.getElementById(':f4:').addEventListener("click", setsmile, true);
document.getElementById(':f5:').addEventListener("click", setsmile, true);
document.getElementById(':f6:').addEventListener("click", setsmile, true);
document.getElementById(':f7:').addEventListener("click", setsmile, true);
document.getElementById(':f8:').addEventListener("click", setsmile, true);
document.getElementById(':f9:').addEventListener("click", setsmile, true);
document.getElementById(':G1:').addEventListener("click", setsmile, true);
document.getElementById(':e7:').addEventListener("click", setsmile, true);

document.getElementById(':b9:').addEventListener("click", setsmile, true);
document.getElementById(':b3:').addEventListener("click", setsmile, true);
document.getElementById(':G2:').addEventListener("click", setsmile, true);
document.getElementById(':G3:').addEventListener("click", setsmile, true);
document.getElementById(':G4:').addEventListener("click", setsmile, true);
document.getElementById(':G5:').addEventListener("click", setsmile, true);
document.getElementById(':G6:').addEventListener("click", setsmile, true);
document.getElementById(':e4:').addEventListener("click", setsmile, true);
document.getElementById(':f3:').addEventListener("click", setsmile, true);

document.getElementById(':lol2:').addEventListener("click", setsmile, true);
document.getElementById(':-O').addEventListener("click", setsmile, true);
document.getElementById('8-)').addEventListener("click", setsmile, true);
document.getElementById(':au:').addEventListener("click", setsmile, true);
document.getElementById(':a1:').addEventListener("click", setsmile, true);
document.getElementById(':a2:').addEventListener("click", setsmile, true);
document.getElementById(':a4:').addEventListener("click", setsmile, true);
document.getElementById(':a5:').addEventListener("click", setsmile, true);
document.getElementById(':a6:').addEventListener("click", setsmile, true);
document.getElementById(':a7:').addEventListener("click", setsmile, true);
document.getElementById(':a9:').addEventListener("click", setsmile, true);

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[size=7][/size]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);
document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);
document.getElementById('[url=*URL*]*Text*[/url]').addEventListener("click", setsmile, true);
document.getElementById('[youtube][/youtube]').addEventListener("click", setsmile, true);
document.getElementById('[spoiler][/spoiler]').addEventListener("click", setsmile, true);