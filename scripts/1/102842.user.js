// ==UserScript==
// @name           kick
// @namespace      local
// @include        http://www.fotka.tv/*
// @include        http://www.fotka.pl/tv/*
// @author         htsz
// @version        1.0
// ==/UserScript==



var div = document.createElement('div');
div.style.cssText = "position: absolute; z-index: 99; top: 5px; left: 120px; padding: 10px; background-color: #fff; color: #000000;";
div.innerHTML = '<div style="float: left; position: relative; display: block;" class="chat_message chat_132293" user_id="9834429"><div class="chat_message-av av32"><a target="_blank" href="http://www.fotka.pl/profil/Meffis"><img src="http://cdn2.asteroid.pl/c10/av.fotka.pl/av_users/09/834/9834429_48.23236525.jpg" alt="Meffis"></a></div><div class="comments-item-box"><div class="comments-item-arrow" style="border-bottom-color: rgb(249, 229, 229); border-right-color: rgb(249, 229, 229); left: -6px; top: 10px;"></div><div class="comments-item-arrow-border" style="border-bottom-color: rgb(203, 4, 1); border-right-color: rgb(203, 4, 1);"></div><div class="Box" style="border: 1px solid rgb(203, 4, 1); background-color: rgb(249, 229, 229);"><div class="container"><span style="float: left; margin-right: 5px;"><a class="login k10" target="_blank" href="http://www.fotka.pl/profil/Meffis"><span style="color:#427A20">Meffis (FP)</span></a>: </span><div class="content">test</div><div class="options" style="display: inherit;"><span class="option kick">Wypro� z pokoju</span> | <span class="option zglos">Zgło� wiadomo�ć</span></div></div></div><div style="background-position: -673px -390px;" class="Shadow"></div></div></div>';

var div2 = document.createElement('div');
div2.style.cssText = "position: absolute; z-index: 99; top: 50px; left: 120px; padding: 10px; background-color: #fff; color: #000000;";
div2.innerHTML = '<ul class="contextMenu" id="ContextMenuProfile" style="display: block; width: 200px;"><li class="contextMenuHeader"><span class="contextMenuHeaderLogin">Meffis</span></li><li><a target="_blank" href="http://www.fotka.pl/profil/Meffis" id="przejdz_do_profilu"><span style="margin:4px 8px 0 7px" class="icos16 ico16_96"></span>Przejd� do profilu</a></li><li><a onclick="event.stopPropagation(); return false;" href="javascript:void(0)" id="dodaj_do_czarnej_listy"><span style="margin-right:4px" class="icos24 ico24_4"></span>Zablokuj</a><span class="ajax"></span></li><li><a onclick="event.stopPropagation()" href="javascript:void(0)" id="wypros_z_pokoju"><span style="margin:2px 8px 0 4px" class="icos16 ico16_39"></span>Wypro� z pokoju</a></li></ul>';

//var a = document.createElement('a');
//	a.href = "javascript:void(0)";	
//	a.innerHTML = "Wypros z pokoju";
//	a.id = "wypros_z_pokoju";

 
var body = document.getElementsByTagName('body')[0]; //pobieramy body
  body.appendChild(div); 
  body.appendChild(div2); 
//	div.appendChild(a);