// ==UserScript==
// @name           4chan expander
// @namespace      4chanthumbexpander
// @description    Expand all 4chan thumbs in thread. Scroll images with right arrow.
// @match          *://boards.4chan.org/*
// ==/UserScript==

var d=document,
	//set image max width and height
	maxWidth = window.innerWidth-10,
	maxHeight = window.innerHeight,
	f=d.body,
	v=d.createElement('div'),
	x=d.createElement('a');
	

v.setAttribute('style','text-align:center;font-weight:bold;font-size:120%;position: fixed; top: 25px; z-index: 999999;');
x.setAttribute('onclick',"for (var j=0,i;i=document.body.getElementsByTagName('img')[j];j++){if (i.src.match('thumb'))"+
	"{i.removeAttribute('width');i.removeAttribute('height');i.setAttribute('style','max-height:"+maxHeight+"px;max-width:"+maxWidth+
	"px'); i.setAttribute('src',i.parentNode.href);i.setAttribute('src',i.parentNode.href);}}"+
	"var posts = document.body.getElementsByClassName('postContainer');var postInt = 0;document.body.addEventListener('keyup', "+
	"function(event){ if( parseInt(event.keyCode)==39 ){ while(posts[postInt].getElementsByTagName('img').length==0) postInt++;"+
	"posts[postInt].getElementsByTagName('img')[0].scrollIntoView(true);postInt++;}})");

x.href="javascript://";
x.setAttribute('id','expandAll');
x.textContent="expand all";

v.appendChild(x);
f.insertBefore(v,f.firstChild);

//F10 autotrigger
document.body.addEventListener('keyup', function(event){ 
	if( parseInt(event.keyCode)==121 )
		d.getElementById('expandAll').click();
});
