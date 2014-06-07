// ==UserScript==

// @name           emo_bsc

// @namespace      http://www.userscripts.org/

// @include        */forums.php?*

// @include        */torrents-details.php?*

// ==/UserScript==


function setsmile(event){
      if(window.location.href.substring(25,37)=="torrents-details.php?"){
	document.getElementsByName("text")[0].value = document.getElementsByName("text")[0].value+" "+event.target.id;
	document.getElementsByName("text")[0].value.focus();

      }else if(window.location.href.substring(25,36)=="forums.php?"){
	document.getElementsByName("body")[0].value = document.getElementsByName("body")[0].value+" "+event.target.id;
	document.getElementsByName("body")[0].value.focus();
      }
}

var logo = document.createElement("div");

logo.innerHTML = "<div align='center'><img src='/images/smilies/boy/1.gif' id=':boy1:' /><img src='/images/smilies/boy/2.gif' id=':boy2:' /><img src='/images/smilies/boy/3.gif' id=':boy3:' /><img src='/images/smilies/boy/4.gif' id=':boy4:' /><img src='/images/smilies/boy/5.gif' id=':boy5:' /><img src='/images/smilies/boy/6.gif' id=':boy6:' /><img src='/images/smiles/boy/7.gif' id=':boy7:' /><img src='/images/smilies/boy/8.gif' id=':boy8:' /><img src='/images/smilies/boy/9.gif' id=':boy9:' /><img src='/images/smilies/boy/10.gif' id=':boy10:' /><img src='/images/smilies/boy/11.gif' id=':boy11:' /><img src='/images/smilies/boy/12.gif' id=':boy12:' /><br><img src='/images/smilies/boy/13.gif' id=':boy13:' /><img src='/images/smilies/boy/14.gif' id=':boy14:' /><img src='/images/smilies/boy/15.gif' id=':boy15:' /><img src='/images/smilies/boy/16.gif' id=':boy16:' /><img src='/images/smilies/boy/17.gif' id=':boy17:' /><br> <img id='[img][/img]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> </div>";

if(window.location.href.substring(25,37)=="torrents-details.php?"){
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

document.getElementById(':boy1:').addEventListener("click", setsmile, true);
document.getElementById(':boy2:').addEventListener("click", setsmile, true);
document.getElementById(':boy3:').addEventListener("click", setsmile, true);
document.getElementById(':boy4:').addEventListener("click", setsmile, true);
document.getElementById(':boy5:').addEventListener("click", setsmile, true);
document.getElementById(':boy6:').addEventListener("click", setsmile, true);
document.getElementById(':boy7:').addEventListener("click", setsmile, true);
document.getElementById(':boy8:').addEventListener("click", setsmile, true);
document.getElementById(':boy9:').addEventListener("click", setsmile, true);
document.getElementById(':boy10:').addEventListener("click", setsmile, true);
document.getElementById(':boy11:').addEventListener("click", setsmile, true);
document.getElementById(':boy12:').addEventListener("click", setsmile, true);

document.getElementById(':boy13:').addEventListener("click", setsmile, true);
document.getElementById(':boy14:').addEventListener("click", setsmile, true);
document.getElementById(':boy15:').addEventListener("click", setsmile, true);
document.getElementById(':boy16:').addEventListener("click", setsmile, true);
document.getElementById(':boy17:.addEventListener("click", setsmile, true);

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);

document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);

