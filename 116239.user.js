// ==UserScript==
// @name           Pokec.sk - meeting remover by weroro
// @description    Skryje notifikáciu služby Stretko aby zbytočne nedráždilo :) 
// @include        http://pokec.azet.sk/*
// @include        http://pokec-sklo.azet.sk/*
// @include        https://pokec.azet.sk/*
// @include        https://pokec-sklo.azet.sk/*
// @date           2013-08-11
// @author         weroro
// @version        1.1.3
// ==/UserScript==

function removeElement(id)
{
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);  
}
removeElement('meetingBull');
removeElement('stretkoSubMenu');
document.getElementsByClassName ('chcemSaStretnut')[0].style.display = 'none';

                     
                     