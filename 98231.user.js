// ==UserScript==
// @name           VZ-ReportDatingAd
// @namespace      LOK-Soft.de
// @description    Automatisches Melden von Dating-Fake-Profilen mit einem Klick im jeweiligen Profil
// @version        1.2
// @include        http://www.studivz.net/Profile*
// @include        http://www.meinvz.net/Profile*
// @include        http://www.studivz.net/AccuseIgnore/AccuseIgnore/*
// @include        http://www.meinvz.net/AccuseIgnore/AccuseIgnore/*
// @include        http://www.studivz.net/Error/User*
// @include        http://www.meinvz.net/Error/User*
// @include        http://www.studivz.net/Groups/Overview*
// @include        http://www.meinvz.net/Groups/Overview*
// @include        http://www.studivz.net/Groups/Memberlist*
// @include        http://www.meinvz.net/Groups/Memberlist*
// @include        http://www.studivz.net/AccuseIgnore/Pardon*
// @include        http://www.meinvz.net/AccuseIgnore/Pardon*
// ==/UserScript==

if((document.location.toString().indexOf("Accuse") != -1) && (document.location.toString().indexOf("#LOKdatingFake") != -1)){
  if(document.getElementById("AccuseIgnore_ignoreCheckbox").disabled == false){
    document.getElementById("AccuseIgnore_ignoreCheckbox").checked = true;
    document.getElementById("AccuseIgnore_accuseCheckbox").checked = true;
    document.getElementById("AccuseIgnore_accuseSubjectId").selectedIndex = 5;
    document.getElementById("AccuseIgnore_accuseReason").value = "Fakeprofil zur Werbung für unseriöse Datingplattform";
    document.getElementById("AccuseIgnore").getElementsByTagName("form")[0].submit();
  }else{
    document.location.href = document.location.toString().split("AccuseIgnore/AccuseIgnore").join("Profile") + "Ignored"
  }
}else if(document.location.toString().indexOf("Profile") != -1){
  if(document.location.toString().indexOf("#LOKdatingFakeIgnored") != -1){
    var mm = document.createElement("div");
    mm.className = "obj-shoutbox";
    var mm1 = document.createElement("p");
    var texno = document.createTextNode("Dating-Fake-Profil bereits gemeldet");
    var mm2 = document.createElement("div");
    mm2.className = "close";
    var mm3 = document.createElement("a");
    mm3.href = "javascript:;";
    mm2.appendChild(mm3);
    mm1.appendChild(texno);
    mm.appendChild(mm1);
    mm.appendChild(mm2);
    var pos = document.getElementById("Grid-Page-Center-Content").getElementsByTagName("div")[0];
    pos.parentNode.insertBefore(mm,pos);
    add2list();
  }else if(document.location.toString().indexOf("#LOKdatingFake") != -1){
    add2list();
  }else if(document.getElementById("profileLeft").getElementsByTagName("a")[0].id.indexOf("friendsAddLink") != -1){
    GM_registerMenuCommand('Dating-Fake-Profil', report);
    var mm = document.createElement("li");
    var mm1 = document.createElement("a");
    mm1.href = document.location.toString().split("Profile").join("AccuseIgnore/AccuseIgnore") + "#LOKdatingFake";
    var texno = document.createTextNode("Dating-Fake-Profil melden");
    mm1.appendChild(texno);
    mm.appendChild(mm1);
    document.getElementById("profileLeft").getElementsByTagName("ul")[0].appendChild(mm);
  }
}else if(document.location.toString().indexOf("Error/User#LOKdatingFake") != -1){
    setTimeout(function(){
                 document.location.href = document.getElementById("ErrorDialog").getElementsByTagName("a")[0].href; 
               },60000);
}else if(document.location.toString().indexOf("Groups") != -1){
  var ignored = eval(GM_getValue('VZdatingFake'));
  if(ignored == undefined){
    ignored = new Array();
    GM_setValue('VZdatingFake', uneval(ignored));
  }else{
    if(document.location.toString().indexOf("Overview") != -1){
      removeFakes("overview");
    }else{
      removeFakes("memlist");
    }
  }
}else if(document.location.toString().indexOf("AccuseIgnore/Pardon") != -1){
  var fields = document.getElementById("AccuseIgnore_Pardon").getElementsByTagName("input");
  var users = ""
  for(var i = 0; i < fields.length; i++){
    if(fields[i].type == "checkbox")users += fields[i].value + " ## ";
  }
  var ignored_str = GM_getValue('VZdatingFake');
  var ignored_old = eval(ignored_str);
  var ignored_new = new Array();
  for(var i = 0; i < ignored_old.length; i++){
    if(users.search(ignored_old[i]) != -1){
      ignored_new.push(ignored_old[i])
    }
  }
  GM_setValue('VZdatingFake', uneval(ignored_new));
}

function setPagerEvent(){
  var mempagers = document.getElementById("GroupsMember").getElementsByTagName("a");
  for(var x = 0; x < mempagers.length; x++){
    if(mempagers[x].className == "pager"){
      mempagers[x].addEventListener("click",function() { setTimeout(removeFakes,1500); }, false);
    }
  }
}

function removeFakes(where){
  if(where != "overview" && where != "memlist"){
    if(document.location.toString().indexOf("Overview") != -1){
      where = "overview";
    }else{
      where = "memlist";
    }
  }
  var ignored_str = GM_getValue('VZdatingFake');
  if(where == "overview"){
      setPagerEvent();
      var users = document.getElementById("GroupMemberImage").getElementsByTagName("li");
      for(var i = 0; i < users.length; i++){
        var links = users[i].getElementsByTagName("a");
        var profid = links[0].href;
        profid = profid.substr(profid.lastIndexOf("/")+1);
        if(ignored_str.search(profid) != -1){
          links[0].href = "#";
          var img = links[0].getElementsByTagName("img")[0];
          img.alt = "Dating-Fake-User";
          img.src = "http://static.pe.studivz.net/Img/svz-nopicf-w.jpg";
          links[1].href = "#";
          links[1].removeChild(links[1].childNodes[0]);
          var texno = document.createTextNode("Dating-Fake-Profil");
          links[1].appendChild(texno);
        }
      }
  }else if(where == "memlist"){
      var users = document.getElementById("Groups_Members").getElementsByTagName("tr");
      for(var i = 0; i < users.length; i++){
        var imglink = users[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
        var profid = imglink.href;
        profid = profid.substr(profid.lastIndexOf("/")+1);
        if(ignored_str.search(profid) != -1){
          imglink.href = "#"+profid;
          var img = imglink.getElementsByTagName("img")[0];
          img.alt = "Dating-Fake-User";
          img.src = "http://static.pe.studivz.net/Img/svz-nopicf-m.jpg";
          var namelink = document.getElementById("name_"+profid);
          namelink.href= "#";
          namelink.removeChild(namelink.childNodes[0]);
          var texno = document.createTextNode("Dating-Fake-Profil");
          namelink.appendChild(texno);
          var actions = users[i].getElementsByTagName("td")[2];
          actions.parentNode.removeChild(actions);
        }
      }
  }
}

function add2list(){
    var url = document.location.toString();
	var profilid = url.substr(url.lastIndexOf("/")+1);
    var hash = profilid.indexOf("#");
    if(hash != -1)profilid = profilid.substring(0,hash);
    var ignored_str = GM_getValue('VZdatingFake');
    if(ignored_str.search(profilid) == -1){
      var ignored = eval(ignored_str);
      ignored.push(profilid);
      GM_setValue('VZdatingFake', uneval(ignored));
    }
}

function report(){
  document.location.href = document.location.toString().split("Profile").join("AccuseIgnore/AccuseIgnore") + "#LOKdatingFake"
}
