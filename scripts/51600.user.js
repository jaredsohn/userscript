// ==UserScript==
// @name           3.7 組圖1 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="組圖1" href="http://kulin-hsu.myweb.hinet.net/A18/002/">114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,124.gif,125.gif,126.gif,127.gif,128.gif,129.gif,130.gif,131.gif,132.gif,133.gif,134.gif,135.gif,136.gif,137.gif,138.gif,139.gif,140.gif,141.gif,142.gif,143.gif,144.gif,145.gif,146.gif,147.gif,148.gif,149.gif,150.gif,151.gif,152.gif,153.gif,154.gif,155.gif,156.gif,157.gif,158.gif,159.gif,160.gif,161.gif,162.gif,163.gif,164.gif,165.gif,166.gif,167.gif,168.gif,169.gif,170.gif,171.gif,172.gif,173.gif,174.gif,175.gif,176.gif,177.gif,178.gif,179.gif,180.gif,181.gif,182.gif,183.gif,184.gif,185.gif,186.gif,187.gif,188.gif,189.gif,190.gif,191.gif,193.gif,194.gif,195.gif,196.gif,197.gif,198.gif,199.gif,200.gif,201.gif,202.gif,203.gif,204.gif,205.gif,206.gif,207.gif,208.gif,209.gif,210.gif,211.gif,212.gif,213.gif,214.gif,215.gif,216.gif,217.gif,218.gif,219.gif,220.gif,221.gif,222.gif,223.gif,224.gif,225.gif,226.gif,227.gif,228.gif,229.gif,230.gif,231.gif,232.gif,233.gif,234.gif,235.gif,236.gif,237.gif,238.gif,239.gif,240.gif,241.gif,242.gif,243.gif,244.gif</a>';

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