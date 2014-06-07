// ==UserScript==

// @name           move_2

// @namespace      http://www.userscripts.org/

// @include        */moveforums.php?*

// @include        */movecomment.php?*

// ==/UserScript==


function setsmile(event){
      if(window.location.href.substring(25,37)=="movecomment.php?"){
	document.getElementsByName("text")[0].value = document.getElementsByName("text")[0].value+" "+event.target.id;
	document.getElementsByName("text")[0].value.focus();

      }else if(window.location.href.substring(25,36)=="moveforums.php?"){
	document.getElementsByName("body")[0].value = document.getElementsByName("body")[0].value+" "+event.target.id;
	document.getElementsByName("body")[0].value.focus();
      }
}

var logo = document.createElement("div");

logo.innerHTML = "<div align='center'><img src='/pic/smilies/grin.gif' id=':-D' /><img src='/pic/smilies/wink.gif' id=';-)' /><img src='/pic/smilies/weep.gif' id=':weep:' /><img src='/pic/smilies/sleeping.gif' id='|-)' /><img src='/pic/smilies/whistle.gif' id=':whistle:' /><img src='/pic/smilies/thumbsup.gif' id=':thumbsup:' /><img src='/pic/smilies/thumbsdown.gif' id=':thumbsdown:' /><img src='/pic/smilies/blush.gif' id=':blush:' /><img src='/pic/smilies/hmmm.gif' id=':hmmm:' /><img src='/pic/smilies/shifty.gif' id=':shifty:' /><img src='/pic/smilies/wave.gif' id=':wave:' /><img src='/pic/smilies/wavecry.gif' id=':wavecry:' /><img src='/pic/smilies/ras.gif' id=':ras:' /><img src='/pic/smilies/punk.gif' id=':punk:' /><img src='/pic/smilies/tease.gif' id=':tease:' /><img src='/pic/smilies/wub.gif' id=':wub:' /><img src='/pic/smilies/hooray.gif' id=':hooray:' /><img src='/pic/smilies/yikes.gif' id=':yikes:' /><img src='/pic/smilies/shit.gif' id=':shit:' /><img src='/pic/smilies/bow.gif' id=':bow:' /><img src='/pic/smilies/devil.gif' id=':devil:' /><img src='/pic/smilies/question.gif' id=':?:' /><img src='/pic/smilies/excl.gif' id=':!:' /><img src='/pic/smilies/wall.gif' id=':wall:' /><img src='/pic/smilies/happy2.gif' id=':happy2:' /><br><img src='/pic/smilies/9.gif' id=':b4:' /><img src='/pic/smilies/yoyo55.gif' id=':a6:' /><img src='/pic/smilies/117.gif' id=':d4:' /><img src='/pic/smilies/124.gif' id=':d5:' /><img src='/pic/smilies/132.gif' id=':d6:' /><img src='/pic/smilies/192.gif' id=':d8:' /><img src='/pic/smilies/yoyo_33.gif' id=':e1:' /><img src='/pic/smilies/yoyo_30.gif' id=':e4:' /><img src='/pic/smilies/yoyo_51.gif' id=':d9:' /><img src='/pic/smilies/162.gif' id=':d7:' /><img src='/pic/smilies/85.gif' id=':d3:' /><img src='/pic/smilies/66.gif' id=':d1:' /><img src='/pic/smilies/44.gif' id=':c6:' /><img src='/pic/smilies/yoyo_64.gif' id=':e5:' /><br><img src='/pic/smilies/thankyou.gif' id=':thankyou:' /><br> <img id='[img][/img]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> </div>";

if(window.location.href.substring(25,37)=="comment.php?"){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);

}else if(window.location.href.substring(25,36)=="moveforums.php?"){
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
document.getElementById(':thankyou:').addEventListener("click", setsmile, true);

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);

document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);

