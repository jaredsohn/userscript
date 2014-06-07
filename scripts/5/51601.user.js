// ==UserScript==
// @name           3.7 組圖2 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="組圖2" href="http://kulin-hsu.myweb.hinet.net/A18/003/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,124.gif,125.gif,126.gif,127.gif,128.gif,129.gif,130.gif,131.gif,132.gif,133.gif,134.gif,135.gif,136.gif,137.gif,138.gif,139.gif,140.gif,172.gif,173.gif,174.gif,175.gif,176.gif,177.gif,178.gif,179.gif,180.gif,181.gif,182.gif,183.gif,184.gif,185.gif,186.gif,187.gif,188.gif,189.gif,190.gif,191.gif,192.gif,193.gif,194.gif,195.gif,196.gif,197.gif,198.gif,199.gif,200.gif,201.gif,202.gif,203.gif,204.gif,205.gif,206.gif,207.gif,208.gif,209.gif,210.gif,211.gif,212.gif,213.gif,214.gif,215.gif,216.gif,217.gif,218.gif,219.gif,220.gif,221.gif,222.gif,223.gif,224.gif,225.gif,226.gif,227.gif,228.gif,229.gif,230.gif,231.gif,232.gif,233.gif,234.gif,235.gif,236.gif,237.gif,238.gif,239.gif,240.gif,241.gif,242.gif,243.gif,244.gif,245.gif,246.gif,247.gif,248.gif,249.gif,250.gif</a>';

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