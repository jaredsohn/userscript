// ==UserScript==
// @name TRINITY Alliance
// @namespace big
// @description botoes para colectivos,mensagens,dragomsim,speedsim,ocalc,ogamebrazil,conversor rc qualta blade,  gt 
// @include http://uni103.ogame.com.pt/*
// ==/UserScript==

//ExCLUSIVO 

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: 



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '</script><li class="menubutton_table"><span class="menu_icon"><a href="http://drago-sim.com/index.php?lang=portuguese" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img251.imageshack.us/img251/6987/dragonq.png" rel="http://img37.imageshack.us/img37/6987/dragonq.png" height="22" width="25"></a></span><a class="menubutton " href="index.php?page=messages&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Mensagens</span></a></li><li class="menubutton_table"><span class="menu_icon"><a href="http://websim.speedsim.net/index.php?" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img.brothersoft.com/icon/softimage/s/speedsim-76747-1236229865.jpeg" rel="http://img138.imageshack.us/img138/6940/speedsim.png" height="22" width="25"></a></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Colectivo</span></a></li><li class="menubutton_table"><span class="menu_icon"><a href="http://www.o-calc.com/?sec=news&lang=pt" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img407.imageshack.us/img407/5082/ocalc.png" rel="http://img443.imageshack.us/img443/5082/ocalc.png" height="22" width="25"></a></span><a class="menubutton " href="http://pt.galaxytool-hosting.eu/trinity/index.php?" target="_blank"><span class="textlabel">galaxytool</span></a></li><li class="menubutton_table"><span class="menu_icon"><a href="http://ogamebrasil.awardspace.com/index.php?pag=10" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img341.imageshack.us/img341/4504/rogamebrazil.png" rel="http://img819.imageshack.us/img819/4504/rogamebrazil.png" height="22" width="25"></a></span><a class="menubutton " href="http://qualtabladeogame.getfreehosting.co.uk/" accesskey="" target="_blank"><span class="textlabel">conversor</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);




