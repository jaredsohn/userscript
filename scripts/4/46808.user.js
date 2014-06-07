// ==UserScript==
// @name           Easy XiaoChun
// @namespace      http://userscripts.org/users/46808
// @description    Remove ads of xiaochuncnjp.com, upgrade user experience.
// @include        http://www.xiaochuncnjp.com/*
// ==/UserScript==

function removeImg(objs) {
    var length = objs.length;
    
    for (var i=0; i<length; i++) {
        objs[i].src = '';
        objs[i].style.backgroundImage = 'none';
    }
}

var inputs = document.getElementsByTagName('input');
var divs = document.getElementsByTagName('div');
var ps = document.getElementsByTagName('p');
var spans = document.getElementsByTagName('span');
var lis = document.getElementsByTagName('li');
var imgs = document.getElementsByTagName('img');
var tds = document.getElementsByTagName('td');
var ths = document.getElementsByTagName('th');
var embeds = document.getElementsByTagName('embed');
removeImg(divs);
removeImg(ps);
removeImg(spans);
removeImg(inputs);
removeImg(lis);
removeImg(imgs);
removeImg(tds);
removeImg(ths);
removeImg(embeds);


var di=document.images;
	for(var i=0;i<di.length;i++){
	di[i].parentNode.removeChild(di[i]);
}

(function () {
	var objects=document.getElementsByTagName("object");

	for (i=0; i<objects.length; i++) {
		var flash=objects[i];

		if (flash.innerHTML.match(/.swf|shockwave|flash/)) {
			var placeholder=document.createElement("div");

			placeholder.style.cursor='pointer';
			placeholder.style.background='orange'; // 'gray '
			placeholder.style.textAlign='center';
			placeholder.style.color='black';
			placeholder.innerHTML="[Play Flash]";

			flash.parentNode.insertBefore(placeholder, flash);
			flash.on=false;

			placeholder.addEventListener(
				'click',
				function() {
					if (flash.on) {
						flash.style.display='none';
						placeholder.innerHTML="[Play Flash]";
						flash.on=false;
					}
					else {
						flash.style.display='';
						placeholder.innerHTML="[Stop Flash]";
						flash.on=true;
					}
				},
				true
			);

			flash.style.display='none';
		}
	}
})();