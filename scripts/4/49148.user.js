// ==UserScript==
// @name           gelbooru_link
// @namespace      ronmi@rmi.twbbs.org
// @include        http://gelbooru.com/index.php?page=post&s=list*
// @include        http://danbooru.donmai.us/post?tags=*
// @version		   0.1
// ==/UserScript==

(function(){
	// inject jQuery
	var e = document.createElement('script');
	e.setAttribute('type', 'text/javascript');
	e.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js');
	document.getElementsByTagName('head')[0].appendChild(e);
	
	// make function
	var f=function(){
		var t=jQuery('span.thumb');
		var i,k,x,y;
		for(i=0;i<t.length;i++)
		{
			k=t.get(i);
			x=k.getElementsByTagName('a')[0];
			y=x.getElementsByTagName('img')[0];
			x.setAttribute('imgWidth',y.width);
			x.setAttribute('imgHeight',y.height);
			x.innerHTML='';
			jQuery(x).load(x.href+" img#image", {}, function(){
				var e=this;
				var w=e.getAttribute('imgWidth');
				var h=e.getAttribute('imgHeight');
				var i=e.getElementsByTagName('img')[0];
				i.width=w;
				i.height=h;
			});
		}
	};
	
	// inject function
	var e = document.createElement('script');
	e.setAttribute('type', 'text/javascript');
	e.innerHTML="<!--\n("+String(f)+")()\n//-->";
	document.getElementsByTagName('head')[0].appendChild(e);

})()
