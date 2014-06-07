// ==UserScript==
// @name           GomTV cleanup
// @namespace      kazocsaba
// @include        http://www.gomtv.net/*
// @author         Kazó Csaba
// @description    Shows direct links instead of Flash players on GomTV.net, and performs some cleanup
// @version 1
// ==/UserScript==

//find player
var player=document.getElementById('player_net9');
if(player==null) return;

//read raw url
var params=player.getElementsByTagName('param');
var url='';
for(var i=0;i<params.length;i++)
{
        if (params[i].getAttribute('name')=='movie')
                url=params[i].getAttribute('value');
}
if (url=='') return;

//format url
url=url.substr(url.indexOf('link=')+5);
if(url.indexOf('&')>=0)
        url=url.substr(0,url.indexOf('&'));
url='http://flvdn.gomtv.net/viewer/'+url+'.flv';

//add to document
var postinfo=document.getElementById('PostInfo');
if (postinfo==null)
        return;

postinfo.appendChild(document.createElement('br'));
postinfo.appendChild(document.createTextNode('Download: '));
var link = document.createElement('a');
link.setAttribute('href',url);
link.appendChild(document.createTextNode(url));
postinfo.appendChild(link);

//remove player
player.parentNode.removeChild(player);

//remove Premium stuff
var baddiv=document.getElementsByClassName('postdown')[0];
if (baddiv!=null)
        baddiv.parentNode.removeChild(baddiv);

//remove annoying Share button
for (var li=postinfo.firstChild; li!=null; li=li.nextSibling) {
        if (li.textContent.substr(0,5)=="Share") {
                li.parentNode.removeChild(li);
                break;
        }
}
