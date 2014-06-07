// ==UserScript==
// @name MovingMenu
// @namespace http://vkontakte.ru/people_who_change_vk
// @description Make Moving Menu Vkontakte (Sozdaet dvizenye u menu VK)(Opera&Firefox)
// @include http://vkontakte.ru/*
// @include http://vk.com/*
// @author Infoshoc (Vladymyr Polosukhin)
// @version 0.08
// @date 24.05.2011
// ==/UserScript==

(function (){
function getId(id,node){
	if(!node) node=document;
	return node.getElementById(id)
};
var sb=(getId('side_bar')||getId('sideBar'));
sb.style.position = 'fixed';
sb.style.margin = 'auto 0px';
}
)()