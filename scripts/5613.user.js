// ==UserScript==
// @name		Google Home Tabs
// @author		Blayde - da(dot)blayde(at)gmail(dot)com
// @description		Rounds the tabs on Google Personalized Home
// @include		http://www.google.*
// ==/UserScript==

(function(){
 //Set radius of tabs here (int)
 var radius=5;
 var tabs=document.getElementsByTagName('li');
 for(var i=0;i<tabs.length;i++){
  if(tabs[i].id.match(/tab.*_view/)){
   tabs[i].style.MozBorderRadius=radius+"px "+radius+"px 0px 0px";
 }}
})();