// ==UserScript==
// @name EVE Gate
// @include  https://gate.eveonline.com/Profile/*      
// ==/UserScript==





charname=document.getElementsByClassName('profileName')[0].innerHTML
document.getElementsByClassName('col1')[0].getElementsByTagName('div')[0].innerHTML+='<br><a href="http://eve.battleclinic.com/killboard/combat_record.php?type=player&name='+charname+'#knownShips">Known Ships</a> | <a href="http://eve.battleclinic.com/killboard/combat_record.php?type=player&name='+charname+'#associates">Known Associates</a>'