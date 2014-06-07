// ==UserScript== 
// @name Nar.TV Cinema-Mode
// @description Add cinema mode on Nar.TV aka Yildiz.TV
// @include http://*.nar.tv/?act=dvr*
// @include http://nar.tv/?act=dvr*
// @include http://*.yildiz.tv/?act=dvr*
// @include http://yildiz.tv/?act=dvr*
// ==/UserScript==

var vucut = document.getElementsByTagName('BODY')[0];

dvrTop=document.getElementById('dvrTop');
dvrShare=document.getElementById('dvrShare');
chanSwitch=document.getElementById('chanSwitch');
chanLogo=document.getElementById('chanLogo');
alldiv=document.getElementById('all');

var lighterdiv = document.createElement("div");
lighterdiv.setAttribute('id', 'lighter');
lighterdiv.setAttribute('style', 'display: none; height: 100%; background: none repeat scroll 0 0 #000000; opacity: 0.9; position: fixed; top: 0; width: 100%; z-index: 999;');
lighterdiv.setAttribute('onclick', "$('#lighter').hide();");
alldiv.parentNode.insertBefore(lighterdiv,alldiv);

var sinemadiv = document.createElement("div");
sinemadiv.setAttribute('id', 'sinema_div');
sinemadiv.innerHTML='<div style="float:right"><b><a href="javascript:;" onclick="gocinemamode();">Sinema Modu</a> &nbsp; </b></div>';
//dvrTop.insertBefore(sinemadiv,chanSwitch);
//dvrShare.appendChild(sinemadiv);
dvrTop.parentNode.insertBefore(sinemadiv,dvrTop.nextSibling);

var sinemascript = document.createElement("script");
sinemascript.setAttribute('id', 'sinema_script');
sinemascript.type = "text/javascript";
sinemascript.textContent = 
			    "<!--" + "\r\n"
+ "var interval = setInterval(function() {" + "\r\n"
+ "var my_dvr_player=document.getElementById('dvr_player');" + "\r\n"
+ "if (my_dvr_player)" + "\r\n"
+ "	{" + "\r\n"
+ "	clearInterval(interval);" + "\r\n"
+ "	var my_dvr_player_div = my_dvr_player.parentNode;" + "\r\n"
+ "	my_dvr_player_div.setAttribute('id', 'dvr_player_div');" + "\r\n"
+ "	$('#dvr_player_div').css({'z-index':'1999', 'position':'relative'});" + "\r\n"
+ "	}" + "\r\n"
+ "}, 1000);" + "\r\n"
+ "" + "\r\n"
+ "function gocinemamode() {" + "\r\n"
+ "$('#lighter').show();" + "\r\n"
+ "}" + "\r\n"
//			  + "alert('bzzztt');" + "\r\n" // for testing
			  + "// -->" + "\r\n";
			vucut.appendChild(sinemascript);

