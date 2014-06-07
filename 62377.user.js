// ==UserScript==
// @name Ikariam Unofficial Forum
// @namespace http://board-ikariam.xooit.fr/t6-Lien-GreaseMonkey-vers-ce-forum.htm
// @description Add a link to ikariam unofficial forum
// @include http://s*.ikariam.*
// ==/UserScript==

forum = getElementByClass('forum');
logout = getElementByClass('logout');
newitem = '<a target="_blank" title="Vers le forum non-officiel" href="http://board-ikariam.xooit.fr">';
newitem += '<span class="textLabel">Forum non-officiel</span>';
newitem += '</a>';
newnode = document.createElement("li");
newnode.className = 'forum'
newnode.innerHTML=newitem;
forum.parentNode.insertBefore(newnode,logout);

function getElementByClass(classe)
    {
    var lis = document.getElementsByTagName('li');
    var resultats = new Array();
           for(var i=0; i<lis.length; i++)
                if(lis[i].className == classe)
                     resultats.push(lis[i]);
           return resultats[0];
      }