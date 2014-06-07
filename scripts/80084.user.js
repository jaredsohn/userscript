// ==UserScript==
// @name           Dementiacons using Plurk Sunny
// @namespace      http://userscripts.org/users/86885
// @description    Maggie Market emoticons I use
// @version        1.0
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */
/* You should have Plurk Sunny (http://userscripts.org/scripts/show/44330) to use this userscript! */

smilies += '<a title="Demmy" href="http://s639.photobucket.com/albums/uu112/plurkmoticons/Dementiacons/">emoticon100.gif,emoticon101.gif,emoticon102.gif,emoticon103.gif,emoticon104.gif,emoticon105.gif,emoticon106.gif,emoticon107.gif,emoticon123.gif,emoticon124.gif,emoticon127.gif,emoticon130.gif,emoticon131.gif,emoticon132.gif,emoticon134.gif,emoticon137.gif,emoticon138.gif,emoticon139.gif,emoticon140.gif,emoticon148.gif,emoticon149.gif,emoticon150.gif,emoticon151.gif,emoticon152.gif,emoticon153.gif,emoticon154.gif,emoticon155.gif,emoticon156.gif,emoticon157.gif,emoticon158.gif,emoticon159.gif,emoticon160.gif,emoticon162.gif,emoticon163.gif,emoticon164.gif,emoticon165.gif,emoticon166.gif,emoticon167.gif,emoticon168.gif,emoticon169.gif,emoticon170.gif,emoticon172.gif,emoticon173.gif,emoticon174.gif,emoticon175.gif,emoticon192.gif,emoticon193.gif,emoticon194.gif,emoticon195.gif,emoticon196.gif,emoticon197.gif,emoticon198.gif,emoticon199.gif,emoticon200.gif,emoticon201.gif,emoticon202.gif,emoticon203.gif,emoticon204.gif,emoticon205.gif,emoticon206.gif,emoticon207.gif,emoticon208.gif,emoticon210.gif,emoticon211.gif,emoticon212.gif,emoticon214.gif,emoticon215.gif,emoticon216.gif,emoticon218.gif,emoticon219.gif,emoticon220.gif,emoticon221.gif,emoticon222.gif,emoticon224.gif,emoticon225.gif,emoticon226.gif,emoticon231.gif,emoticon233.gif,emoticon234.gif,emoticon235.gif,emoticon239.gif,emoticon240.gif,emoticon40.gif,emoticon39.gif,emoticon41.gif,emoticon42.gif,emoticon43.gif,emoticon44.gif,emoticon45.gif,emoticon46.gif,emoticon47.gif,emoticon48.gif,emoticon49.gif,emoticon51.gif,emoticon53.gif,emoticon54.gif,emoticon55.gif,emoticon56.gif,emoticon59.gif,emoticon60.gif,emoticon61.gif,emoticon62.gif,emoticon63.gif,emoticon64.gif,emoticon66.gif,emoticon67.gif,emoticon68.gif,emoticon69.gif,emoticon71.gif,emoticon72.gif,emoticon73.gif,emoticon74.gif,emoticon75.gif,emoticon76.gif,emoticon77.gif,emoticon78.gif,emoticon79.gif,emoticon80.gif,emoticon81.gif,emoticon82.gif,emoticon83.gif,emoticon84.gif,emoticon85.gif,emoticon86.gif,emoticon87.gif,emoticon88.gif,emoticon89.gif,emoticon90.gif,emoticon91.gif,emoticon92.gif,emoticon93.gif,emoticon94.gif,emoticon95.gif,emoticon96.gif,emoticon97.gif,emoticon98.gif,emoticon99.gif,emoticon01.gif,emoticon02.gif,emoticon04.gif,emoticon05.gif,emoticon06.gif,emoticon07.gif,emoticon09.gif,emoticon10.gif,emoticon11.gif,emoticon12.gif,emoticon13.gif,emoticon14.gif,emoticon15.gif,emoticon16.gif,emoticon17.gif,emoticon18.gif,emoticon19.gif,emoticon20.gif,emoticon21.gif,emoticon23.gif,emoticon24.gif,emoticon26.gif,emoticon27.gif,emoticon29.gif,emoticon30.gif,emoticon31.gif,emoticon32.gif,emoticon33.gif,emoticon34.gif,emoticon35a.gif,emoticon35b.gif,emoticon36.gif,emoticon37.gif,emoticon38.gif</a>';


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