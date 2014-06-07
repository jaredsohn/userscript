// ==UserScript==
// @name            DarkThrone - Direct attack
// @author          Cody
// @description     DarkThrone - Direct attack
// @include         http://gold.darkthrone.com/userlist/attack*
// @include         http://www.darkthrone.com/userlist/attack*
// @include         http://darkthrone.com/userlist/attack*
// @include         *darkthrone.com/userlist/attack*
// @include         *darkthrone.com/userlist/overall*
// @version         1
// ==/UserScript==

if(location.href.match(/userlist/)){
  var allHyper = document.getElementsByTagName("a");
  var i = 0;
  var listUsersID = [];
  
  var regExprHyper = new RegExp("character_name_([0-9]+)", "gm");
  for(i = 0;i<allHyper.length;i++){
    var thisHyperID = allHyper[i].id;
    if(thisHyperID.match(regExprHyper)){
      var rez_reg = regExprHyper.exec(thisHyperID);
      listUsersID[listUsersID.length] = rez_reg[1];
    }
  }
  //alert(listUsersID);
  for(i = 0; i<listUsersID.length; i++){
    var thisLink = document.getElementById("character_name_"+listUsersID[i]);
    var parentLink = thisLink.parentNode;
    var parentInner = parentLink.innerHTML;
    // \"\/images\/accents\/alliance_invitation.gif\"
    // http:\/\/beta.darkthrone.com\/templates\/default\/images\/accents\/spyplayer.gif
    // \"\/images\/accents\/new_message.gif\"
    // http:\/\/beta.darkthrone.com\/templates\/default\/images\/accents\/spyoffense.gif
    var addBeforeAttack = "<a href=\"\/attack\/index\/"+listUsersID[i]+"\"><img src=\"http:\/\/beta.darkthrone.com\/templates\/default\/images\/accents\/offense.gif\" title=\"Direct attack\"><\/a>";
    parentLink.innerHTML = addBeforeAttack+"&nbsp;"+parentInner;
  }
}