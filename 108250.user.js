// ==UserScript==
// @name            ChangeDisplayedUserName
// @namespace       changedisplayedusername
// @description     Change displayed user name in the upper-right window corner (just for office privacy & screenshots)
// @include         http://www.newkaliningrad.ru/forum/*
// @version         1.1
// @icon            http://www.klgd.ru/city/characters/gerb.png
// @grant           none
// ==/UserScript==

//Type your user name
  var myName = 'XXX';

//Type fake user name or 'skip' to simply hide your name
  var displayedName = 'Ra';
  
//Type URL of fake user icon or 'skip' to simply hide your icon
  var displayedIcon = 'http://www.newkaliningrad.ru/forum/uploads/profile/photo-1_thumb.jpg';

  var title = document.getElementsByClassName('inline photo')[0];
  var active_users = document.getElementsByClassName('active_users')[0];
  var ipsBox = document.getElementsByClassName('ipsBox_container ipsPad')[0];

  if (displayedName == 'skip')
     {
      title.getElementsByTagName('span')[0].style.display = 'none';
      if (active_users != undefined) active_users.innerHTML = active_users.innerHTML.replace(myName,'');
     }
     else
     {
      title.innerHTML = title.innerHTML.replace(myName,displayedName);
      if (active_users != undefined) active_users.innerHTML = active_users.innerHTML.replace(myName,displayedName);
     }

  if (displayedIcon == 'skip')
     {
      title.getElementsByTagName('img')[0].style.display = 'none';
      if (ipsBox != undefined) ipsBox.getElementsByTagName('img')[0].style.display = 'none';
     }
     else
     {
      title.getElementsByTagName('img')[0].setAttribute('src', displayedIcon);
      if (ipsBox != undefined) ipsBox.getElementsByTagName('img')[0].setAttribute('src', displayedIcon);
     }
