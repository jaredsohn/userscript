// ==UserScript==
// @name           PlurkElite Emoticons [Emoplurk Add-On]
// @namespace      http://userscripts.org/users/89517
// @description    Smileys Set for "EMOPLURK 2.0"
// @version        1
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="PlurkElite"href="http://statics.plurk.com/">b872d9e40dbce69e5cde4787ccb74e60.png,077e5b582bf66c703c3846247155d68d.png,4f01bac8a707e5450307f97065ec0fa7.gif,48515125401120316abb97666458d05b.gif,aabbc82c2b0dc72bfbce2f82c97a95e8.gif,b0b0596acce9ffc1f2a27548aa642eaf.gif,52991d7ff65a05526454bd1170a0f14c.gif,846277f0a154dc95a08594b7d32a5ccd.gif,843739a95294fd0bf4c958840b46408f.gif,22416dced8b59446db8cd366cc925d09.gif,e3f0f67ca3af62e34f13abf1d036a010.gif,8073c1716e75d32eb79f97a9f521fa01.gif,373cd2f23dab7528d4875170d13d64f7.gif,8863234ebea13f109c9b15ba19a4531c.gif,8738c7a1c402f41b5319abe504ce9687.gif,db4c4a7d141fdcaca4d4b11f8fb360db.gif,ced6d40bebe2d424b59322b311fc04bb.gif,b62d1e55e8311af5bc7526c595ac1dbb.gif,9b6f4864c822e1a97c98507c2b41a74f.gif,e49c8ae965452550c98fc7f99741ae0d.gif,318416eab5a856bddb1e106a21ff557a.gif,84f94a47fcaf1df0a5f17a1cfa52fa64.gif</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);