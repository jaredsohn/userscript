// ==UserScript==
// @name juick.img
// @description Заменяет ссылки на картинки картинками :)
// @namespace http://juick.com
// @include http://juick.com/*
// ==/UserScript==

var contentHolder = document.querySelector(".messr") || document.querySelector("div#content ul li div");
var maxWidth = contentHolder.clientWidth - 2 + "px";


String.prototype.fmt = function () {
    var txt = this;
    for (var i = 0; i < arguments.length; i += 1) {
        var exp = new RegExp('\\{' + (i) + '\\}', 'gm');
        txt = txt.replace(exp, arguments[i]);
    }
    return txt;
};

function grayOut(vis, options, extra) {
     var options = options || {};
    var zindex = options.zindex || 101;
    var opacity = options.opacity || 70;
    var opaque = (opacity / 100);
    var bgcolor = options.bgcolor || '#000000';
    var dark = document.getElementById('darkenScreenObject');
    if (!dark) {
        var tbody = document.getElementsByTagName("body")[0];
        var tnode = document.createElement('div'); 
        tnode.style.position = 'absolute'; 
        tnode.style.top = '0px'; 
        tnode.style.left = '0px';
        tnode.style.overflow = 'hidden';
        tnode.style.display = 'none';
        tnode.id = 'darkenScreenObject';
        var msgnode = document.createElement('div'); 
        msgnode.style.position = 'fixed'; 
        msgnode.style.display = 'none'; 
        msgnode.id = 'box'; 
        msgnode.style.textAlign = 'center';
        msgnode.style.padding = "0 0 0 0";
        msgnode.style.top = "50%"; 
        msgnode.style.left = "50%"; 
        tbody.appendChild(msgnode); 
        tbody.appendChild(tnode); 
        dark = document.getElementById('darkenScreenObject');
	   box = document.getElementById('box');
    }
    if (vis) {
	   var youtube_div = document.createElement("div");
	   var pageWidth='100%';
        var pageHeight='100%';

	   if( document.body && ( document.body.scrollWidth || document.body.scrollHeight ) ) {
      	  pageWidth = document.body.scrollWidth+'px';
	       pageHeight = document.body.scrollHeight+'px';
	   } else if( document.body.offsetWidth ) {
     	 pageWidth = document.body.offsetWidth+'px';
	      pageHeight = document.body.offsetHeight+'px';
    	   }   
		
        
        dark.style.opacity = opaque;
        dark.style.MozOpacity = opaque;
        dark.style.filter = 'alpha(opacity=' + opacity + ')';
        dark.style.zIndex = zindex;
        dark.style.backgroundColor = bgcolor;
        dark.style.width = pageWidth;
        dark.style.height = pageHeight;
        dark.style.display = 'block';
        if (extra == 'Y') document.body.style.overflow = 'hidden';

        box.style.zIndex = zindex + 10;
        box.style.border = "#000 solid 1px";
        box.style.display = "block";
        box.style.marginLeft = "-{0}px".fmt(Math.floor(options.width / 2));
        box.style.marginTop = "-{0}px".fmt(Math.floor(options.height / 2));


        box.style.backgroundColor = "#FFF";
	   youtube_div.innerHTML = options.html;
	   box.appendChild(youtube_div);
	   dark.addEventListener('click', function() {
			dark.style.display = "none";
			box.removeChild(youtube_div);
			box.style.display = "none";
			document.body.style.overflow = 'auto';		
	   }, false);
    } else {
        dark.style.display = 'none';
    }
}
function escHandler(e){
	if(e.which === 27){
		var dark = document.getElementById('darkenScreenObject');
		var box = document.getElementById('box');
		var youtube_div = box.getElementsByTagName("div")[0]; 
		
		dark.style.display = "none";
		box.removeChild(youtube_div);
		box.style.display = "none";
		document.body.style.overflow = 'auto';
		document.removeEventListener('keydown', escHandler, false);
	}
}
function processImgLinks(links) {
	for(var i = 0, n = links.length; i < n; i += 1){
		var img = document.createElement("img");

		img.style.maxWidth = maxWidth;
		img.style.display = "block";
		img.src = links[i].href;
		img.addEventListener('click', function(e){
			grayOut(true, { html : "<img src='{0}' />".fmt(e.target.src),
					width : e.target.naturalWidth,
					height : e.target.naturalHeight });
			document.addEventListener('keydown', escHandler, false);
		}, false);
		links[i].parentNode.replaceChild(img, links[i]);		
	}
}

processImgLinks(document.querySelectorAll("a[href*='pics.livejournal.com']"));
processImgLinks(document.querySelectorAll("a[href*='img.leprosorium.com']"));
processImgLinks(document.querySelectorAll("a[href*='omploader.org']"));
processImgLinks(document.querySelectorAll("a[href*='tumblr.com']"));
processImgLinks(document.querySelectorAll("a[href*='rghost.net'][href$='.image']"));
processImgLinks(document.querySelectorAll("a[href*='rghost.ru'][href$='.image']"));
processImgLinks(document.querySelectorAll("a[href$='.jpeg']"));
processImgLinks(document.querySelectorAll("a[href$='.jpg']"));
processImgLinks(document.querySelectorAll("a[href$='.gif']"));
processImgLinks(document.querySelectorAll("a[href$='.png']"));
