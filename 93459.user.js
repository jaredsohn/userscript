// ==UserScript==
// @name           ika elma forum
// @namespace      dzea
// @description    affiche un lien vers le forum elma
// @include        http://s*.ikariam.*
// ==/UserScript==

forum = getElementByClass('forum');
logout = getElementByClass('logout');
newitem = '<a target="_blank" title="vers le forum elma" href="http://elma.forumotion.ca/">';
newitem += '<span class="textLabel">Forum Elma</span>';
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