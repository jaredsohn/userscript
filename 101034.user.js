// ==UserScript==
// @name Pardus Msgframe Uni Switcher - druggy compatible
// @namespace Taki
// @description Allows you to quickly switch between Orion, Artemis and Pegasus, AND doesn't fuck up with the Pardus Druggy Script! :D... Doesn't look as awesome though
// @include http*://*.pardus.at/msgframe.php
// ==/UserScript==

// Version 3.2

// use this at best as temporary solution until Faz does a more awesome version of this.
// thanks Simir for improving it :)
// sph's IMPROVEMENT (v2.0)
// bugfix of sph's improvs: v2.1
// nice and clean 3.0 sph
// again improv to sphs tuning :) v3.1
// premium-check will be done just once now... as it should've from the beginning v3.2

var _universes = [
{id: "orion", title: "Orion", shortname: "O", premium: false},
{id: "artemis", title: "Artemis", shortname: "A", premium: false},
{id: "pegasus", title: "Pegasus", shortname: "P", premium: true}
];

var univ = '';
var p = location.href.indexOf("://")+3; //Get universe
var q = location.href.indexOf(".pardus.at");
var univ = location.href.substr(p,q-p);
if(univ == '') exit;

var isPremium = !(document.body.innerHTML.indexOf('Premium')>-1); //checking for premium-account

var links = document.getElementsByTagName('img');
if(links.length<1) exit; //bail out
var linkNode = links[0];

var foundCur = false; //flag to store if we found our current universe already
for(i = 0; i <_universes.length;i++) 
{
   if(_universes[i].id == univ) 
   { //found our current universe
      foundCur = true;
      continue; //do nothing in this iteration
   }


   if(!isPremium && _universes[i].premium) continue; //don't add premium universes

   var hp = document.createElement('A');
   hp.setAttribute('target','_main');
   
   hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe="+_universes[i].title);
   if(!foundCur) 
   { //insert in front
      hp.appendChild(document.createTextNode(_universes[i].shortname+' '));
      linkNode.parentNode.insertBefore(hp, linkNode);
   } 
   else 
   { //insert back
      hp.appendChild(document.createTextNode(' '+_universes[i].shortname));
      linkNode.parentNode.insertBefore(hp, linkNode.nextSibling);
      linkNode = linkNode.nextSibling;
   }
}