// ==UserScript==
// @name Ikariam Unofficial Board
// @namespace http://board-ikariam.xooit.fr/t6-Lien-GreaseMonkey-vers-ce-forum.htm
// @description Add a link to ikariam unofficial board
// @include http://s*.ikariam.*
// ==/UserScript==

forum = getElementByClass('forum');
logout = getElementByClass('logout');
newitem = '<a target="_blank" title="Go to the unofficial board" href="http://board-ikariam.xooit.fr">';
newitem += '<span class="textLabel">Unofficial Board</span>';
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