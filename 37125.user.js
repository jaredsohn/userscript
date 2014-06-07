// ==UserScript==

// @name           monkey_2

// @namespace      http://www.userscripts.org/

// @include        *:88/forums.php?*

// @include        *:88/comment.php?*

// ==/UserScript==


function setsmile(event){
      if(window.location.href.substring(25,37)=="comment.php?"){
	document.getElementsByName("text")[0].value = document.getElementsByName("text")[0].value+" "+event.target.id;
	document.getElementsByName("text")[0].value.focus();

      }else if(window.location.href.substring(25,36)=="forums.php?"){
	document.getElementsByName("body")[0].value = document.getElementsByName("body")[0].value+" "+event.target.id;
	document.getElementsByName("body")[0].value.focus();
      }
}

var logo = document.createElement("div");

logo.innerHTML = "<div align='center'>
<img src='/pic/smilies/yociexp26.gif' id=':au:' />
<img src='/pic/smilies/yoyo17.gif' id=':a1:' />
<img src='/pic/smilies/yoyo72.gif' id=':a2:' />
<img src='/pic/smilies/yoyo75.gif' id=':a3:' />
<img src='/pic/smilies/yoyox32.gif' id=':a4:' />
<img src='/pic/smilies/yoyox48.gif' id=':a5:' />
<img src='/pic/smilies/yoyo55.gif' id=':a6:' />
<img src='/pic/smilies/yoyo66.gif' id=':a7:' />
<img src='/pic/smilies/yoyo126.gif' id=':a8:' />
<img src='/pic/smilies/yoyo122.gif' id=':a9:' />
<img src='/pic/smilies/yoyo04.gif' id=':a0:' />
<br>
<img src='/pic/smilies/laugh.gif' id=':lol:' />
<img src='/pic/smilies/yoyo_65.gif' id=':-O' />
<img src='/pic/smilies/yoyo_01.gif' id='8-)' />
<img src='/pic/smilies/yoyo_47.gif' id=':no:' />
<img src='/pic/smilies/yoyo_24.gif' id=':love:' />
<img src='/pic/smilies/yoyo_92.gif' id=':crazy:' />
<img src='/pic/smilies/yoyo_53.gif' id=':kiss:' /><br>
<br>
<img src='/pic/smilies/grin.gif' id=':-D' />
<img src='/pic/smilies/wink.gif' id=';-)' />
<img src='/pic/smilies/weep.gif' id=':weep:' />
<img src='/pic/smilies/sleeping.gif' id='|-)' />
<img src='/pic/smilies/whistle.gif' id=':whistle:' />
<img src='/pic/smilies/thumbsup.gif' id=':thumbsup:' />
<img src='/pic/smilies/thumbsdown.gif' id=':thumbsdown:' />
<img src='/pic/smilies/blush.gif' id=':blush:' />
<img src='/pic/smilies/hmmm.gif' id=':hmmm:' />
<img src='/pic/smilies/shifty.gif' id=':shifty:' />
<img src='/pic/smilies/wave.gif' id=':wave:' />
<img src='/pic/smilies/wavecry.gif' id=':wavecry:' />
<img src='/pic/smilies/ras.gif' id=':ras:' />
<img src='/pic/smilies/punk.gif' id=':punk:' />
<img src='/pic/smilies/tease.gif' id=':tease:' />
<img src='/pic/smilies/wub.gif' id=':wub:' />
<img src='/pic/smilies/hooray.gif' id=':hooray:' />
<img src='/pic/smilies/yikes.gif' id=':yikes:' />
<img src='/pic/smilies/shit.gif' id=':shit:' />
<img src='/pic/smilies/bow.gif' id=':bow:' />
<img src='/pic/smilies/devil.gif' id=':devil:' />
<img src='/pic/smilies/question.gif' id=':?:' />
<img src='/pic/smilies/excl.gif' id=':!:' />
<img src='/pic/smilies/wall.gif' id=':wall:' />
<img src='/pic/smilies/happy2.gif' id=':happy2:' />
<img src='/pic/smilies/yoyo_00.gif' id=':uu:' />
<br>
<img src='/pic/smilies/9.gif' id=':b4:' />
<img src='pic/smilies/yoyox06.gif' id=':b1:' />
<img src='/pic/smilies/1.gif' id=':b2:' />
<img src='/pic/smilies/7.gif' id=':b3:' />
<img src='/pic/smilies/11.gif' id=':b5:' />
<img src='/pic/smilies/15.gif' id=':b6:' />
<img src='/pic/smilies/18.gif' id=':b7:' />
<img src='/pic/smilies/19.gif' id=':b8:' />
<img src='/pic/smilies/21.gif' id=':b9:' />
<br>
<img src='/pic/smilies/23.gif' id=':c1:' />
<img src='/pic/smilies/24.gif' id=':c2:' />
<img src='/pic/smilies/29.gif' id=':c3:' />
<img src='/pic/smilies/36.gif' id=':c4:' />
<img src='/pic/smilies/40.gif' id=':c5:' />
<img src='/pic/smilies/44.gif' id=':c6:' />
<img src='/pic/smilies/46.gif' id=':c7:' />
<img src='/pic/smilies/52.gif' id=':c8:' />
<img src='/pic/smilies/63.gif' id=':c9:' />
<br>
<img src='/pic/smilies/66.gif' id=':d1:' />
<img src='/pic/smilies/82.gif' id=':d2:' />
<img src='/pic/smilies/85.gif' id=':d3:' />
<img src='/pic/smilies/117.gif' id=':d4:' />
<img src='/pic/smilies/124.gif' id=':d5:' />
<img src='/pic/smilies/132.gif' id=':d6:' />
<img src='/pic/smilies/162.gif' id=':d7:' />
<img src='/pic/smilies/192.gif' id=':d8:' />
<img src='/pic/smilies/yoyo_51.gif' id=':d9:' />
<br>
<img src='/pic/smilies/yoyo_33.gif' id=':e1:' />
<img src='/pic/smilies/yoyo_83.gif' id=':e2:' />
<img src='/pic/smilies/yoyo_89.gif' id=':e3:' />
<img src='/pic/smilies/yoyo_30.gif' id=':e4:' />
<img src='/pic/smilies/yoyo_64.gif' id=':e5:' />
<img src='/pic/smilies/yoyo_52.gif' id=':e6:' />
<img src='/pic/smilies/87.gif' id=':e7:' />
<img src='/pic/smilies/103.gif' id=':e8:' />
<img src='/pic/smilies/114.gif' id=':e9:' />
<br>
<img src='/pic/smilies/yoyo_67.gif' id=':f1:' />
<img src='/pic/smilies/yoyo_71.gif' id=':f2:' />
<img src='/pic/smilies/yoyo_72.gif' id=':f3:' />
<img src='/pic/smilies/92.gif' id=':f4:' />
<br>
<img src='/pic/smilies/thankyou.gif' id=':thankyou:' />
<br>
<img src='/pic/smilies/yoyo_00.gif' id=':uu:' /> 
<br>
<img id='[img][/img]' /> 
<img id='[b][/b]' /> 
<img id='[i][/i]' />
<img id='[u][/u]' /> 
<img id='[color=blue][/color]' /> 
<img id='[color=green][/color]' /> 
<img id='[color=red][/color]' /> 
<img id='[color=magenta][/color]' /> 
</div>";

if(window.location.href.substring(25,37)=="comment.php?"){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);

}else if(window.location.href.substring(25,36)=="forums.php?"){
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

document.getElementById(':au:').addEventListener("click", setsmile, true);
document.getElementById(':lol:').addEventListener("click", setsmile, true);
document.getElementById(':-O').addEventListener("click", setsmile, true);
document.getElementById('8-)').addEventListener("click", setsmile, true);
document.getElementById(':a1:').addEventListener("click", setsmile, true);
document.getElementById(':a2:').addEventListener("click", setsmile, true);
document.getElementById(':a3:').addEventListener("click", setsmile, true);
document.getElementById(':a4:').addEventListener("click", setsmile, true);
document.getElementById(':a5:').addEventListener("click", setsmile, true);
document.getElementById(':a6:').addEventListener("click", setsmile, true);
document.getElementById(':a7:').addEventListener("click", setsmile, true);
document.getElementById(':a8:').addEventListener("click", setsmile, true);
document.getElementById(':a9:').addEventListener("click", setsmile, true);
document.getElementById(':a0:').addEventListener("click", setsmile, true);
document.getElementById(':no:').addEventListener("click", setsmile, true);
document.getElementById(':love:').addEventListener("click", setsmile, true);
document.getElementById(':crazy:').addEventListener("click", setsmile, true);
document.getElementById(':kiss:').addEventListener("click", setsmile, true);

document.getElementById(':uu:').addEventListener("click", setsmile, true);
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


document.getElementById(':b1:').addEventListener("click", setsmile, true);
document.getElementById(':b2:').addEventListener("click", setsmile, true);
document.getElementById(':b3:').addEventListener("click", setsmile, true);
document.getElementById(':b4:').addEventListener("click", setsmile, true);
document.getElementById(':b5:').addEventListener("click", setsmile, true);
document.getElementById(':b6:').addEventListener("click", setsmile, true);
document.getElementById(':b7:').addEventListener("click", setsmile, true);
document.getElementById(':b8:').addEventListener("click", setsmile, true);
document.getElementById(':b9:').addEventListener("click", setsmile, true);

document.getElementById(':c1:').addEventListener("click", setsmile, true);
document.getElementById(':c2:').addEventListener("click", setsmile, true);
document.getElementById(':c3:').addEventListener("click", setsmile, true);
document.getElementById(':c4:').addEventListener("click", setsmile, true);
document.getElementById(':c5:').addEventListener("click", setsmile, true);
document.getElementById(':c6:').addEventListener("click", setsmile, true);
document.getElementById(':c7:').addEventListener("click", setsmile, true);
document.getElementById(':c8:').addEventListener("click", setsmile, true);
document.getElementById(':c9:').addEventListener("click", setsmile, true);

document.getElementById(':d1:').addEventListener("click", setsmile, true);
document.getElementById(':d2:').addEventListener("click", setsmile, true);
document.getElementById(':d3:').addEventListener("click", setsmile, true);
document.getElementById(':d4:').addEventListener("click", setsmile, true);
document.getElementById(':d5:').addEventListener("click", setsmile, true);
document.getElementById(':d6:').addEventListener("click", setsmile, true);
document.getElementById(':d7:').addEventListener("click", setsmile, true);
document.getElementById(':d8:').addEventListener("click", setsmile, true);
document.getElementById(':d9:').addEventListener("click", setsmile, true);

document.getElementById(':e1:').addEventListener("click", setsmile, true);
document.getElementById(':e2:').addEventListener("click", setsmile, true);
document.getElementById(':e3:').addEventListener("click", setsmile, true);
document.getElementById(':e4:').addEventListener("click", setsmile, true);
document.getElementById(':e5:').addEventListener("click", setsmile, true);
document.getElementById(':e6:').addEventListener("click", setsmile, true);
document.getElementById(':e7:').addEventListener("click", setsmile, true);
document.getElementById(':e8:').addEventListener("click", setsmile, true);
document.getElementById(':e9:').addEventListener("click", setsmile, true);

document.getElementById(':f1:').addEventListener("click", setsmile, true);
document.getElementById(':f2:').addEventListener("click", setsmile, true);
document.getElementById(':f3:').addEventListener("click", setsmile, true);
document.getElementById(':f4:').addEventListener("click", setsmile, true);

document.getElementById(':thankyou:').addEventListener("click", setsmile, true);

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);

document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);

