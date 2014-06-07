// ==UserScript==
// @name           Hide Tsukkomi @Bangumi
// @description    Hide Tsukkomi
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==

function disableTsukkomi()
{
	var subtitle = document.getElementsByClassName("subtitle");
	for (i = 0; i < subtitle.length; i++){
		if (subtitle[i].innerHTML == "吐槽箱"){
			subtitle[i].parentNode.style.display = "none";
		}
	}
}

disableTsukkomi()