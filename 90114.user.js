// ==UserScript==
// @name          DS Drag'n'Drop Sidebar
// @version       1
// @author        Samuel Essig (http://c1b1.de)
// @description   Sidebar als Alternative zur PA Leiste und PA Notizen
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/game.php*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

         twitter: http://twitter.com/c1b1se

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en

######################################################

Das Script basiert auf folgendem Ansatz aus dem DS Forum:
http://forum.die-staemme.de/showthread.php?t=120972

In die Sidebar können im Bearbeiten Modus Links und Text "gezogen" (Drag And Drop) werden.

*/

var sidebar;
var sidebartoogler;
var sidebarcontent;
var sidebar_editButton;

var sidebartop = 250;
var sidebarwidth = 300;
var sidebarheight = 500;

var sidebartooglerwidth = 20;
var sidebartooglerheight = 60;

CreateNewElements();

function func_PullInOut(e)
{
    if ( sidebar.style.left != '0px')
    {
          sidebartoogler.style.left = sidebarwidth + 'px';
          sidebar.style.left = '0px';
    }
    else
    {
          sidebartoogler.style.left = '0px';
          sidebar.style.left = '-' + (sidebarwidth+4) + 'px';
    }
}

function CreateNewElements()
{
      sidebar = document.createElement('div');
      sidebar.setAttribute('id','sidebar');
      sidebar.setAttribute('style','opacity:0.9; background:url(http://de49.die-staemme.de/css/../graphic/background/content.jpg); border:2px solid #603000; position:absolute; z-index:301; left:-' + (sidebarwidth+4)+ 'px; top:' + sidebartop + 'px; width:' + sidebarwidth + 'px; height:' + sidebarheight + 'px; ');

      sidebar_editButton = document.createElement('input');
      sidebar_editButton.setAttribute('type','button');
      sidebar_editButton.setAttribute('value','Bearbeiten');
      sidebar_editButton.addEventListener('click',toogleEditMode,false);
      sidebar.appendChild(sidebar_editButton);

      sidebar.appendChild(document.createElement('hr'));

      sidebarcontent = document.createElement('div');
      sidebarcontent.setAttribute('id','sidebarcontent');
      sidebarcontent.setAttribute('style','overflow:auto; margin:3px; padding:7px; border:2px solid transparent; max-height:' + (sidebarheight-100) + 'px; ');
      sidebarcontent.setAttribute('contenteditable','false');
      sidebarcontent.innerHTML = GM_getValue('sidebarcontent','Leer');
      sidebar.appendChild(sidebarcontent);

      sidebartoogler = document.createElement('div');
      sidebartoogler.setAttribute('id','sidebartoogler');
      sidebartoogler.setAttribute('style','border:2px solid #603000; border-left:0px; -moz-border-radius-topright:5px; -moz-border-radius-bottomright:5px; background:url(http://de49.die-staemme.de/css/../graphic/background/content.jpg);  position:absolute; z-index:301; top:' + sidebartop + 'px; width:' + sidebartooglerwidth + 'px; left:0px; height:' + sidebartooglerheight + 'px; ');
      sidebartoogler.addEventListener('click', func_PullInOut, true);

      document.getElementById('ds_body').appendChild(sidebar);
      document.getElementById('ds_body').appendChild(sidebartoogler);
}

function toogleEditMode(e)
  {
  if(sidebarcontent.getAttribute('contenteditable') == 'true')
    {
    sidebarcontent.style.borderColor = 'transparent';
    sidebarcontent.setAttribute('contenteditable','false');
    sidebar_editButton.setAttribute('value','Bearbeiten');
    GM_setValue('sidebarcontent',sidebarcontent.innerHTML);
    }
  else
    {
    sidebarcontent.style.borderColor = 'Red'
    sidebarcontent.setAttribute('contenteditable','true');
    sidebar_editButton.setAttribute('value','Speichern');
    }

  }