// ==UserScript==
// @name           Bubble Bear Plurk Emoticon using Emoplurk 2.0
// @namespace      http://userscripts.org/users/74432
// @description    Add-on for Emoplurk 2.0
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="Bubble Bear" href="http://i1009.photobucket.com/albums/af212/anonysurf/Bubble%20Bear%20Emoticon/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,091.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,124.gif,125.gif,126.gif,127.gif,128.gif,129.gif,130.gif,131.gif,132.gif,133.gif,134.gif,135.gif,136.gif</a>';

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