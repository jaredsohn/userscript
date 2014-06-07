// ==UserScript==
// @name           3.7 外星人 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="外星人" href="http://s641.photobucket.com/albums/uu133/mark5468/et/">et1.gif,et2.gif,et3.gif,et4.gif,et5.gif,et6.gif,et7.gif,et8.gif,et9.gif,et10.gif,et11.gif,et12.gif,et13.gif,et14.gif,et15.gif,et16.gif,et17.gif,et18.gif,et19.gif,et20.gif,et21.gif,et22.gif,et23.gif,et24.gif,et25.gif,et26.gif,et27.gif,et28.gif,et29.gif,et30.gif,et31.gif,et32.gif,et33.gif,et34.gif,et35.gif,et36.gif,et37.gif,et38.gif,et39.gif,et40.gif,et41.gif,et42.gif,et43.gif,et44.gif,et45.gif,et46.gif,et47.gif,et48.gif,et49.gif,et50.gif,et51.gif,et52.gif,et53.gif,et54.gif,et55.gif,et56.gif,et57.gif,et58.gif,et59.gif,et60.gif,et61.gif,et62.gif,et63.gif,et64.gif,et65.gif,et66.gif,et67.gif,et68.gif,et69.gif,et70.gif,et71.gif,et72.gif,et73.gif,et74.gif,et75.gif,et76.gif,et77.gif,et78.gif,et79.gif,et80.gif,et81.gif,et82.gif,et83.gif,et84.gif,et85.gif,et86.gif,et87.gif,et88.gif,et89.gif,et90.gif,et91.gif,et92.gif,et93.gif,et94.gif,et95.gif,et96.gif,et97.gif,et98.gif,et99.gif,et110.gif,et111.gif,et112.gif,et113.gif,et114.gif,et115.gif,et116.gif,et117.gif,et118.gif,et119.gif,et120.gif,et121.gif,et122.gif,et123.gif,et124.gif,et125.gif,et126.gif,et127.gif,et128.gif,et129.gif,et130.gif,et131.gif,et132.gif,et133.gif,et134.gif,et135.gif,et136.gif,et137.gif,et138.gif,et139.gif,et140.gif,et141.gif,et142.gif,et143.gif,et144.gif,et145.gif,et146.gif,et147.gif,et148.gif,et149.gif,et150.gif,et151.gif,et152.gif,et153.gif,et154.gif,et155.gif,et156.gif,et157.gif,et158.gif</a>';

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