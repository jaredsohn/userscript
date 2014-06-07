// ==UserScript==
// @name           Bananuhs [Emoplurk Add-On]
// @namespace      http://userscripts.org/users/86885
// @description    Banana emoticons for "EMOPLURK 2.0"
// @version        1
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="bananuhs" href="http://plurksmile.googlecode.com/svn/trunk/images/banana/">ba1.gif,ba2.gif,ba3.gif,ba4.gif,ba5.gif,ba6.gif,ba7.gif,ba8.gif,ba9.gif,ba10.gif,ba11.gif,ba12.gif,ba13.gif,ba14.gif,ba15.gif,ba16.gif,ba17.gif,ba18.gif,ba19.gif,ba20.gif,ba21.gif,ba22.gif,ba23.gif,ba24.gif,ba25.gif,ba26.gif,ba27.gif,ba28.gif,ba29.gif,ba30.gif,ba31.gif,ba32.gif,ba33.gif,ba34.gif,ba35.gif,ba36.gif,ba37.gif,ba38.gif,ba39.gif,ba40.gif,ba41.gif,ba42.gif,ba43.gif,ba44.gif,ba45.gif,ba46.gif,ba47.gif,ba48.gif,ba49.gif,ba50.gif,ba51.gif,ba52.gif,ba53.gif,ba54.gif,ba55.gif,ba56.gif,ba57.gif,ba58.gif,ba59.gif,ba60.gif,ba61.gif,ba62.gif,ba63.gif,ba64.gif,ba65.gif,ba66.gif,ba67.gif,ba68.gif,ba69.gif,ba70.gif,ba71.gif,ba72.gif,ba73.gif,ba74.gif,ba75.gif,ba76.gif,ba77.gif,ba78.gif,ba79.gif,ba80.gif,ba81.gif,ba82.gif,ba83.gif,ba84.gif,ba85.gif,ba86.gif,ba87.gif,ba88.gif,ba89.gif,ba90.gif,ba91.gif,ba92.gif,ba93.gif,ba94.gif,ba95.gif,ba96.gif,ba97.gif,ba98.gif,ba99.gif,ba100.gif,ba101.gif,ba102.gif,ba103.gif,ba104.gif,ba105.gif,ba106.gif,ba107.gif,ba108.gif,ba109.gif,ba110.gif,ba111.gif,ba112.gif,ba113.gif,ba114.gif,ba115.gif,ba116.gif,ba117.gif,ba118.gif,ba119.gif,ba120.gif,ba121.gif,ba122.gif,ba123.gif,ba124.gif,ba125.gif,ba126.gif,ba127.gif,ba128.gif,ba129.gif,ba130.gif,ba131.gif,ba132.gif,ba133.gif,ba134.gif,ba135.gif,ba136.gif,ba137.gif,ba138.gif,ba139.gif,ba140.gif,ba141.gif,ba142.gif,ba143.gif,ba144.gif,ba145.gif,ba146.gif,ba147.gif,ba148.gif,ba149.gif,ba150.gif,ba151.gif,ba152.gif,ba153.gif,ba154.gif,ba155.gif,ba156.gif</a>';


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