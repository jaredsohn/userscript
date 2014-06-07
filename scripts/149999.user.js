// ==UserScript==
// @name        nvmsg
// @author		LJD Mclegrand
// @namespace   http://lesroyaumes.com
// @description popup en cas de nouveau message
// @include     http://forum.lesroyaumes.com/*
// @include     http://forum2.lesroyaumes.com/*
// @version     3.2
// ==/UserScript==

setTimeout(function(){
	var t1='<div style="position:fixed;top:100px;left:40%;" id="popup_rr_style"><div style="position:absolute;"><div style="    background: url(\'http://www.lesroyaumes.com/images/menus_zones_sombres.png\') repeat scroll 0 0 transparent;    border: 1px solid #CC9933;    height: 200px;    margin-left: 0;    margin-top: 0;    position: relative;    width: 265px;"></div><div style="color:#56442E;    color: #CC9933;    display: block;    float: left;   font-size: 12px;    height: 160px;    line-height: 24px;    margin-left: 0;    margin-top: -189px;    padding: 20px;    position: relative;    text-align: center;    text-decoration: none;    width: 225px;">	<p>'
	var t2='</p>	<p><a style="color:#996600;text-decoration:underline;font-weight:bold;" href="privmsg.php?folder=inbox">Lire immédiatement</a></p>	<p><a style="color:#996600;text-decoration:underline;font-weight:bold; cursor:pointer;" onclick="document.getElementById(\'popup_rr_style\').style.display=\'none\';">J\'y penserai plus tard</a></p>	</div></div></div>'
	function alert2(text){var x=document.body.innerHTML;document.body.innerHTML=(t1+text+t2)+x;}
	var h=window.location.host;
	var name="nb_msg_derniere_popup"+h;
	var n=GM_getValue(name,0);
	for(var i=7;i<9;i++){
		var e= document.getElementsByClassName('mainmenu')[i].innerHTML;
		var patt2=/^<.*message/;
		var patt=/^<img[^>]*>(.* ([0-9]*) .*)/;

		if(patt2.test(e)){
			var m=patt.exec(e);
			var textealacon=new Array("en fait, non","C'est la fête !","Tout ça !?", "Mais qu'est-ce qu'ils ont tous à m'écrire aujourd'hui ?", "Nooooon ! Pas encore !", "OMG", "Bon, ça attendra, je suppose.");
			if(m){
				if(m[2]>n) alert2(m[1] + " ! " + textealacon[(m[2]>6?6:m[2])]);
				GM_setValue(name,m[2]);
			}else{
				GM_setValue(name,0);
			}
		}
	}
},1000);