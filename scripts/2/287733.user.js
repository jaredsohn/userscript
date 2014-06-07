// ==UserScript==
// @name          Slideshare DownloadBoxy
// @description   Slideshare Download URL Generator
// @auther        http://toolboxy.blogspot.com/
// @include       http://www.slideshare.net/*
// @version       0.1
// ==/UserScript==
function $(id) {
    var elems = document.body.getElementsByTagName('*');
    var target = id.substr(1);
    var result=[];
    for(i=0;j=elems[i];i++) {
        if((j.className).indexOf(target)!=-1) result.push(j);
    }
    return result;
}
function slideshareboxy() {
	var e = $('.slide_container')[0].getElementsByTagName('img');
	var o = "";
	for(var key=0;key<e.length;key+=1) {
		o += e[key].attributes['data-full'].value + "\n";
	}
	var ta = document.createElement('textarea');
	ta.style.width = "100%";
	ta.style.overflow = "visible";
	ta.rows = "5";
	ta.onclick = function() {
		this.select();
	};
	ta.value = o;
	$('.playerWrapper')[0].appendChild(ta);
}
slideshareboxy();