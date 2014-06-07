// ==UserScript==
// @name       Laser Pointer Forums | Ad Remover
// @namespace  L@epz
// @version    0.1
// @description  Removes ads, work in progress.
// @match      http://laserpointerforums.com/*
// @copyright  2012+
// ==/UserScript==

document.getElementById('header').innerHTML="";
document.body.innerHTML=document.body.innerHTML.replace('<a rel="nofollow" href="http://www.tmart.com/Laser-Pointers/" target="_blank"><img src="http://laserpointerforums.com/tmart.gif" alt="Laser Pointer-Low price" border="0" title="Laser Pointer-Low price"></a>',"");
document.body.innerHTML=document.body.innerHTML.replace('<a rel="nofollow" href="http://jetlasers.net" target="_blank"><img src="http://laserpointerforums.com/banner-jetlasers.gif" border="0" alt="Jet Lasers" title="Jet Lasers"></a>',"");
document.body.innerHTML=document.body.innerHTML.replace('<a href="http://laserpointerforums.com/f39/jayrob-build-kits-lenses-other-stuff-listed-here-44227.html" target="_blank"><img src="http://www.laserpointerforums.com/jayup.gif" border="0" alt="DIY Build Kits &amp; Heatsinks! by jayrob" title="DIY Build Kits &amp; Heatsinks! by jayrob"></a>',"");
document.body.innerHTML=document.body.innerHTML.replace('<a href="http://www.unfinishedman.com/category/fine-living/gadgets-and-gear/" target="_blank" rel="nofollow"><img src="http://www.5levelmedia.com/images/umbanner-468x60.jpg" border="0"></a>',"");
document.body.innerHTML=document.body.innerHTML.replace('<a rel="nofollow" href="http://www.wickedlasers.com/?utm_source=LPF&amp;utm_medium=banner&amp;utm_campaign=LPF%2Bbanner" target="_blank"><img src="http://laserpointerforums.com/lpf-krypton.jpg" alt="wl" border="0" title="wl"></a>',"");
document.body.innerHTML=document.body.innerHTML.replace('<a rel="nofollow" href="http://www.lvyilaser.com/445nm-blue-lasers-c-38.html" target="_blank"><img src="http://laserpointerforums.com/lvyi.gif" border="0" alt="Lvyi" title="Lvyi"></a>',"");
