// Neopets - NeoBoard Preferences Upgrade
// by nungryscpro (nungryscpro@yahoo.com)

// ==UserScript==
// @name           Neopets - NeoBoard Preferences Upgrade
// @namespace      http://userscripts.org/users/22349
// @description    V 1.01 - Provides fixes and additions to the Neopets NeoBoards Preferences.
// @include        http://neopets.com/neoboards/preferences.phtml*
// @include        http://www.neopets.com/neoboards/preferences.phtml*
// @version        1.01
// @updated        2009.07.27 
// ==/UserScript==
(function(){
  function changeAv(s){
    aa = document.getElementsByName('activeAv')[0];
    aa.options.selectedIndex = s;
    document.getElementsByName('avatar')[0].src = 'http://images.neopets.com/neoboards/avatars/'+ aa.value +'.gif';
  }
// Avatar Extended View
  avatar = document.getElementsByName('avatar')[0].parentNode.parentNode.parentNode.parentNode;
  avatar.setAttribute('width', '466');
  avatar.setAttribute('height', '96');
  prefs = document.createElement('div');
  prefs.setAttribute('style', 'float:right;');
  prefs.innerHTML = '<table style="border: 1px solid #000000;" border="0" cellpadding="4" cellspacing="0" width="310" height="96"><tbody><tr><td class="contentModuleHeaderAlt" style="border-bottom: 1px solid #000000;"><strong>Avatar - Expanded View</strong></td></tr><tr><td><center><input value="Enable Expanded View" type="button"></center><div class="sf" style="margin-top: 5px;"><i>(this may take a few seconds, probably freezing your browser while it works)</i></div></td></tr></tbody></table>';
  avatar.parentNode.insertBefore(prefs, avatar);

  prefs.getElementsByTagName('input')[0].addEventListener('click', function(){
    this.parentNode.parentNode.innerHTML = '<span style="font-size: 11px;">Clicking on an avatar below will select it as the avatar you want. <br><br>Click submit to save your changes.</span>';
    allavs = document.createElement('div');
    allavs.innerHTML = '<br><br><table style="border: 1px solid #000000;" border="0" cellpadding="4" cellspacing="0" width="100%"><tbody><tr><td class="contentModuleHeaderAlt" style="border-bottom: 1px solid #000000;"><strong>Your Avatars</strong></td></tr><tr><td><div style="margin-left: 5px; padding-top: 5px; padding-bottom: 6px;" name="avzone"></div></td></tr></tbody></table>';
    avatar = document.getElementsByName('avatar')[0].parentNode.parentNode.parentNode.parentNode;
    avatar.parentNode.insertBefore(allavs, avatar.nextSibling);
    for (var x = 1, thisOption; thisOption = document.getElementsByName('activeAv')[0].options[x]; x++){
      if (thisOption.textContent != '------'){
        obj = document.createElement('span');
        obj.setAttribute('style', 'padding: 3px;');
        obj.innerHTML = '<img src="http://images.neopets.com/neoboards/avatars/'+ thisOption.value +'.gif" name="avie_'+x+'" height="50" width="50" border="0" style="cursor: pointer;"><img src="http://images.neopets.com/neoboards/spacer.gif" height="53" width="0">';
        document.getElementsByName('avzone')[0].appendChild(obj);
        obj.getElementsByTagName('img')[0].addEventListener('click', function(){
          changeAv(this.getAttribute('name').replace('avie_', ''));
        }, false);
      }
    }
  }, false);

// Random Avatar
  aa = document.getElementsByName('activeAv')[0];
  aaElem = document.createElement('div');
  aaElem.innerHTML = '<input type="button" value="Random" style="margin-top:4px; margin-right:6px;"><input type="button" value="No Change">';
  aa.parentNode.insertBefore(aaElem, aa.nextSibling);
  aaElem.getElementsByTagName('input')[0].addEventListener('click', function(){
    aa = document.getElementsByName('activeAv')[0];
    anum = 0;
    while (anum == 0){
      anum = Math.ceil(Math.random()*(aa.options.length - 1));
      if (aa.options[anum].textContent == '------' || aa.options[anum].value == aa.value){anum = 0;}
    }
    changeAv(anum);
  }, false);
  aaElem.getElementsByTagName('input')[1].addEventListener('click', function(){
    changeAv(0);
  }, false);

// Random NeoTitle
  nt = document.getElementsByName('neoTitle')[0];
  ntElem = document.createElement('span');
  ntElem.setAttribute('style', 'position:relative; top:-1px;');
  ntElem.innerHTML = '<input type="button" value="Random" style="margin-left:5px;"><input type="button" value="No Change" id="'+ nt.value +'" style="margin-left:6px;"><input type="button" value="No NeoTitle" style="margin-left:6px;">';
  nt.parentNode.insertBefore(ntElem, nt.nextSibling);
  ntElem.getElementsByTagName('input')[0].addEventListener('click', function(){
    nt = document.getElementsByName('neoTitle')[0];
    nnum = 0;
    while (nnum == 0){
      nnum = Math.ceil(Math.random()*(nt.options.length - 1));
      if (nt.options[nnum].value == nt.value){nnum = 0;}
    }            
    nt.options.selectedIndex = nnum;
  }, false);
  ntElem.getElementsByTagName('input')[1].addEventListener('click', function(){
    document.getElementsByName('neoTitle')[0].value = this.id;
  }, false);
  ntElem.getElementsByTagName('input')[2].addEventListener('click', function(){
    document.getElementsByName('neoTitle')[0].value = '';
  }, false);
})();