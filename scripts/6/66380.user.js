// ==UserScript==
// @name           emo2cz4plzza_F&M
// @namespace      http://www.userscripts.org/
// @include        *:88/forums.php?*
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

logo.innerHTML = "<div align='center'><img src='http://drama-addict.com/wp-includes/images/smilies/icon_wink.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_wink.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_neutral.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_neutral.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_mad.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_mad.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_twisted.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_twisted.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_smile.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_smile.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_eek.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_eek.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_sad.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_sad.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_rolleyes.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_rolleyes.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_redface.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_redface.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_surprised.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_surprised.gif[/img]' /><br><br><img src='http://drama-addict.com/wp-includes/images/smilies/icon_mrgreen.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_mrgreen.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_lol.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_lol.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_idea.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_idea.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_biggrin.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_biggrin.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_cry.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_cry.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_cool.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_cool.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_arrow.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_arrow.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_question.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_question.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_exclaim.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_exclaim.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_razz.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_razz.gif[/img]' /> / <img src='http://drama-addict.com/wp-includes/images/smilies/icon_confused.gif' id='[img]http://drama-addict.com/wp-includes/images/smilies/icon_confused.gif[/img]' /><br><br><img id='[img][/img]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> <img id='[youtube][/youtube]' /> <img id='[spoiler][/spoiler]' /> </div>";

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
document.getElementById('[youtube][/youtube]').src = "http://www.youtube.com/favicon.ico";
document.getElementById('[spoiler][/spoiler]').src = "http://img.ihere.org/uploads/038e76d1bb.jpg";

document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_wink.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_neutral.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_mad.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_twisted.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_smile.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_eek.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_sad.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_rolleyes.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_redface.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_surprised.gif[/img]').addEventListener("click", setsmile, true);

document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_mrgreen.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_lol.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_idea.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_biggrin.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_cry.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_cool.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_arrow.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_question.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_exclaim.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_razz.gif[/img]').addEventListener("click", setsmile, true);
document.getElementById('[img]http://drama-addict.com/wp-includes/images/smilies/icon_confused.gif[/img]').addEventListener("click", setsmile, true);

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);
document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);
document.getElementById('[youtube][/youtube]').addEventListener("click", setsmile, true);
document.getElementById('[spoiler][/spoiler]').addEventListener("click", setsmile, true);