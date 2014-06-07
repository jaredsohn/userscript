
// ==UserScript==
// @name   Heise Newsticker
// @description   Heise Newsticker
// @include   http://www.heise.de/*
// @include   http://heise.de/*
// @include   https://www.heise.de/*
// @include   https://heise.de/*
// ==/UserScript==

document.getElementById("navi_top").parentNode.removeChild(document.getElementById("navi_top"));
document.getElementById("bannerzone").parentNode.removeChild(document.getElementById("bannerzone"));
document.getElementById("sitemap").parentNode.removeChild(document.getElementById("sitemap"));

var ad = getElementsByClass('bcadv ISI_IGNORE');
for each (var test in ad) {
	test.innerHTML ='';
}

document.getElementById("container").style.width = "100%";
document.getElementById("container_content").style.width = "100%";
document.getElementById("mitte").style.width = "100%";
document.getElementById("container_content").style.top = "0px";

document.getElementById("navi_bottom").style.bottom = "0";

document.getElementById("mitte_rechts").parentNode.removeChild(document.getElementById("mitte_rechts"));
document.getElementById("mitte").style.background = "inherit";
document.getElementById("mitte_links").style.width = "100%";

function getElementsByClass(klasse){
  var class_arr = new Array();
  var all_tags = document.getElementsByTagName("*");

  for(i=0; i<all_tags.length; i++){
    if(all_tags[i].className == klasse){
      class_arr.push(all_tags[i]);
    }
  }

  return class_arr;
}