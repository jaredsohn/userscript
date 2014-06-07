// ==UserScript==
// @name          Download hi5 Album
// @version       0.12.7.15
// @description   Download hi5 Album by One Click.
// @namespace     http://userscripts.org/users/83150
// @include       htt*://*.hi5.com/*
// @match         http://*.hi5.com/*
// @match         https://*.hi5.com/*
// ==/UserScript==

(function(){
var k=document.createElement('div');k.innerHTML='<a id="dFA" class="navSubmenu" onClick="dFAcore();">DownFbAlbum</a>';
document.querySelectorAll('#user_menu')[0].appendChild(k);
}
)();
var w=unsafeWindow;
w.g={};
w.getParent=function(child,selector){
var target=child;
while(!target.querySelector(selector)&&target!=document.body){
target=target.parentNode;
}
target=target.querySelectorAll(selector);
return (target)?target[0]:null;
};
w.getPhotos=function(){
	var g=w.g; if(g.start!=2){return;}console.log(g);
	var i,elms=g.elms,photodata=g.photodata;
	for (i = 0;i< elms.length;i++) {
		var url=elms[i].src.replace("/50","/00");
		var title = w.getParent(elms[i],'.photo').querySelectorAll('.name')[0].value;
		photodata.photos.push({
			title: title,
			url: url,
			href: elms[i].parentNode.href
		});
	}
	if(g.store){
		var temp=JSON.stringify(photodata);
		w.sendRequest({type:'store',data:temp,no:photodata.photos.length});
		window.alert('Please go to next page.');
	}else{
		//console.log('Pushing '+photodata.photos.length+' photos.');
		w.sendRequest({type:'export',data:photodata});
	}
};
w.dFAcore=function() {
	var g=w.g; g.start=1;
	g.mode=window.prompt('Please type your choice:\nNormal:1/click Confirm\nStart Set:2,Continue Set:3,End Set:4\nExport last set:5');
	//g.mode=1;
	if(g.mode==null){return;}
	g.get=(g.mode>2)?1:0; g.store=(g.mode==2||g.mode==3)?1:0;
	if(g.mode==5){w.sendRequest({type:'export'});return;}
	if(g.get){
	g.last=1;
	w.sendRequest({type:'get'});
	}else{
	var aName=document.title,aAuth="",aDes="",aTime="";g.start=2;
	if(document.all){
	aName=document.getElementById("photos_title").innerText;
	}else{
	aName=document.getElementById("photos_title").textContent;
	}
	g.elms=document.querySelectorAll('.pic');
	g.photodata = {
		aName:aName,
		aAuth:aAuth,
		aDes:aDes,
		aTime:aTime,
		aLink:(window.location+"").split("&")[0],
		photos: [],
		desc: '',
		downloadajaxUrl: []
	};
	w.getPhotos();
	}
	return;
};

w.sendRequest=function(request, sender, sendResponse) {var g=w.g;
        switch(request.type){
	case 'store':
		w.localStorage["downFbAlbum"]=request.data;
		console.log(request.no+' photos data saved.'); break;
	case 'get':
		g.photodata=JSON.parse(w.localStorage["downFbAlbum"]);
		g.start=2;
		console.log(g.photodata.photos.length+' photos got.');
		w.getPhotos();
		break;
	case 'export':
		if(!request.data){request.data=JSON.parse(w.localStorage["downFbAlbum"]);}
		//console.log(request.data);
		console.log('Exported '+request.data.photos.length+' photos.');
		var a,b=[],c=request.data;
		c.aName=(c.aName)?c.aName:"hi5";
		var d = c.photos,totalCount = d.length;
		if (!totalCount) {
			alert("Ooops!! photos are empty, please try it again or refresh the album page.");
			return;
		}
		for (var i=0;i<totalCount;i++) {
			if(d[i]){
			var href=(!!d[i].href)?d[i].href:"#",title=(!!d[i].title)?d[i].title:"";
			var a = '<div rel="gallery" class="item thickbox" id="item'+i+'"><a href="'+href+'" target="_blank">'+(i*1+1)+'</a><a class="fancybox" rel="fancybox" href="'+d[i].url+'" title="'+title+'" target="_blank"><img src="'+d[i].url+'" width="192"></a><div class="comments">'+title+"</div></div>";
			b.push(a)}
		}
		var tHTML='<body class="index"><style>body{line-height:1;background:#f5f2f2;font-size:13px;color:#444;padding-top:70px;}img{border:none;image-rendering:optimizeSpeed;}@media screen and (-webkit-min-device-pixel-ratio:0){img{image-rendering: -webkit-optimize-contrast;}}header{display:block}.wrapper{width:960px;margin:0 auto;position:relative}#hd{background:#faf7f7;position:fixed;z-index:100;top:0;left:0;width:100%;-moz-box-shadow:0 0 5px rgba(0,0,0,0.7);-webkit-box-shadow:0 0 5px rgba(0,0,0,0.7);-o-box-shadow:0 0 5px rgba(0,0,0,0.7);box-shadow:0 0 5px rgba(0,0,0,0.7)}#hd .logo{padding:7px 0;border-bottom:1px solid rgba(0,0,0,0.2)}#hd .logo h1{height:100%;margin:0 auto}#container{width:948px;position:relative;margin:0 auto}.item{width:192px;float:left;padding:15px 15px 0;margin:0 7px 15px;font-size:12px;background:white;-moz-box-shadow:0 1px 3px rgba(34,25,25,0.4);-webkit-box-shadow:0 1px 3px rgba(34,25,25,0.4);-o-box-shadow:0 1px 3px rgba(34,25,25,0.4);box-shadow:0 1px 3px rgba(34,25,25,0.4);line-height:1.5}.item .comments{color:#8c7e7e;padding-bottom:15px}#logo{background-color:#3B5998;color:#FFF}#aName{background-color:#3B5998;left:0;position:relative;width:100%;display:block;margin:0;padding:10px;color:#FFF;height:100%;font-size:20px}#logo a{color:#FFF}#logo a:hover{color:#FF9}progress{width:100%}\
		/*! fancyBox v2.0.6 fancyapps.com | fancyapps.com/fancybox/#license */\
		.fancybox-tmp iframe,.fancybox-tmp object{vertical-align:top;margin:0;padding:0;}.fancybox-wrap{position:absolute;top:0;left:0;z-index:8020;}.fancybox-skin{position:relative;background:#f9f9f9;color:#444;text-shadow:none;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;margin:0;padding:0;}.fancybox-opened{z-index:8030;}.fancybox-opened .fancybox-skin{-webkit-box-shadow:0 10px 25px rgba(0,0,0,0.5);-moz-box-shadow:0 10px 25px rgba(0,0,0,0.5);box-shadow:0 10px 25px rgba(0,0,0,0.5);}.fancybox-outer,.fancybox-inner{position:relative;outline:none;margin:0;padding:0;}.fancybox-inner{overflow:hidden;}.fancybox-type-iframe .fancybox-inner{-webkit-overflow-scrolling:touch;}.fancybox-error{color:#444;font:14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;margin:0;padding:10px;}.fancybox-image,.fancybox-iframe{display:block;width:100%;height:100%;border:0;vertical-align:top;margin:0;padding:0;}.fancybox-image{max-width:100%;max-height:100%;}#fancybox-loading,.fancybox-close,.fancybox-prev span,.fancybox-next span{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAACYBAMAAABt8RZRAAAAMFBMVEUAAAABAQEiIiIjIyM4ODhMTExmZmaCgoKAgICfn5+5ubnW1tbt7e3////+/v4PDw+0IcHsAAAAEHRSTlP///////////////////8A4CNdGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAphJREFUSMftlE1oE0EUgNeCICru0YunaVNNSj3kbim5SqUECh7MxZMUvPQgKBQPggrSSy9SdFVC8Q8XwbNLpWhByRJQE5vsvimIFjxss14KmnTj/GR+Nrs9WH9OeZdlP96+nXnzvjG6qWHsDb+sVJK4AzSqfbgN767PXHimOMfu2zxCaPgujuGoWUA0RuyWjt0y4pHDGm43kQi7qvDF1xKf3lDYWZT4OJZ426Nfl1GO1nIk/tEgr9BEFpCnVRW4XSev87AEn8izJHHnIy1K9j5HnlMtgY98QCydJqPxjTi2gP4CnZT4MC2SJUXoOk/JIodqLHmJpatfHqRFCWMLnF+JbcdaRFmabcvtfHfPy82Pqs2HVlninKdadUw11tIauz+Y69ET+jGECyLdauiHdiB4yOgsvq/j8Bw8KqCRK7AWH4h99wAqAN/6p2po1gX/cXIGQwOZfz7I/xBvbW1VEzhijrT6cATNSzNn72ic4YDbcAvHcOQVe+32dBwsi8OB5wpHXkEc5YKm1M5XdfC+woFyZNi5KrGfZ4OzyX66InCHH3uJTqCYeorrTOCAjfdYXeCIjjeaYNNNxlNiJkPASym88566Aatc10asSAb6szvUEXQGXrD9rAvcXucr8dhKagL/5J9PAO1M6ZXaPG/rGrtPHkjsKEcyeFI1tq462DDVxYGL8k5aVbhrv5E32KR+hQFXKmNvGvrJ2941Rv1pU8fbrv/k5mUHl434VB11yFD5y4YZx+HQjae3pxWVo2mQMAfu/Dd3uDoJd8ahmOZOFr6kuYMsnE9xB+Xgc9IdEi5OukOzaynuIAcXUtwZ662kz50ptpCEO6Nc14E7fxEbiaDYSImuEaZhczc8iEEMYm/xe6btomu63L8A34zOysR2D/QAAAAASUVORK5CYII=);}#fancybox-loading{position:fixed;top:50%;left:50%;margin-top:-22px;margin-left:-22px;background-position:0 -108px;opacity:0.8;cursor:pointer;z-index:8020;}#fancybox-loading div{width:44px;height:44px;}.fancybox-close{position:absolute;top:-18px;right:-18px;width:36px;height:36px;cursor:pointer;z-index:8040;}.fancybox-nav{position:absolute;top:0;width:40%;height:100%;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);z-index:8040;}.fancybox-prev{left:0;}.fancybox-next{right:0;}.fancybox-nav span{position:absolute;top:50%;width:36px;height:34px;margin-top:-18px;cursor:pointer;z-index:8040;visibility:hidden;}.fancybox-prev span{left:20px;background-position:0 -36px;}.fancybox-next span{right:20px;background-position:0 -72px;}.fancybox-tmp{position:absolute;top:-9999px;left:-9999px;overflow:visible;visibility:hidden;padding:0;}#fancybox-overlay{position:absolute;top:0;left:0;overflow:hidden;display:none;z-index:8010;background:#000;}#fancybox-overlay.overlay-fixed{position:fixed;bottom:0;right:0;}.fancybox-title{visibility:hidden;font:normal 13px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;position:relative;text-shadow:none;z-index:8050;}.fancybox-title-float-wrap{position:absolute;bottom:0;right:50%;margin-bottom:-35px;z-index:8030;text-align:center;}.fancybox-title-float-wrap .child{display:inline-block;margin-right:-100%;background:rgba(0,0,0,0.8);-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px;text-shadow:0 1px 2px #222;color:#FFF;font-weight:700;line-height:24px;white-space:nowrap;padding:2px 20px;}.fancybox-title-outside-wrap{position:relative;margin-top:10px;color:#fff;}.fancybox-title-inside-wrap{margin-top:10px;}.fancybox-title-over-wrap{position:absolute;bottom:0;left:0;color:#fff;background:rgba(0,0,0,.8);padding:10px;}.fancybox-nav:hover span,.fancybox-opened .fancybox-title{visibility:visible;}\
		#fancybox-buttons{position:fixed;left:0;width:100%;z-index:8050;}#fancybox-buttons.top{top:10px;}#fancybox-buttons.bottom{bottom:10px;}#fancybox-buttons ul{display:block;width:350px;height:30px;list-style:none;-webkit-box-shadow:0 1px 3px #000,0 0 0 1px rgba(0,0,0,.7),inset 0 0 0 1px rgba(255,255,255,.05);-moz-box-shadow:0 1px 3px #000,0 0 0 1px rgba(0,0,0,.7),inset 0 0 0 1px rgba(255,255,255,.05);background:#111 0 0 50% 50% 100%;border-radius:3px;margin:0 auto;padding:0;}#fancybox-buttons ul li{float:left;margin:0;padding:0;}#fancybox-buttons a{display:block;width:30px;height:30px;text-indent:-9999px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAMFBMVEUAAAAAAAAeHh4uLi5FRUVXV1diYmJ3d3eLi4u8vLzh4eHz8/P29vb////+/v4PDw9Xwr0qAAAAEHRSTlP///////////////////8A4CNdGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAbVJREFUWMPtlktugzAQhnPNnqLnSRuJXaRGVFm3NmFdPMC+YHqA8NiWBHBdlPgxETRIVatWjIQ0Hn/8DL9lywsxJRYz/T10h+uxkefyiUw6xPROpw33xZHHmm4yTD9WKg2LRHhZqumwuNDW77tQkAwCRTepx2VU5y/LSEMlXkPEc3AUHTJCCESn+S4FOaZa/F7OPqm/bDLyGXCmoR8a4nLkKLrupymiwT/Thz3ZbbWDK9ZPnzxuoMeZ6sSTdKLpGthShnP68EaGIX3MGKGFrx1cAXbQDbR0ypY0TDRdX9JKWtD8RawiZqz8CtMbnR6k1zVsDfod046RP8jnbt6XM/1n6WoSzX2ryLlo+dsgXaRWsSxFV1aDdF4kZjGP5BE0TAPj5vEOII+geJgm1Gz9S5p46RSaGK1fQUMwgabPkzpxrqcZWV/vYA5PE1anDG4nrDw4VpFR0ZDhTtbzLp7p/03LW6B5qnaXV1tL27X2VusX8RjdWnTH96PapbXLuzIe7ZvdxBb9OkbXvtga9ca4EP6c38hb5DymsbduWY1pI2/bcRp5W8I4bXmLnMc08hY5P+/L36M/APYreu7rpU5/AAAAAElFTkSuQmCC);background-repeat:no-repeat;outline:none;}#fancybox-buttons a.btnPrev{width:32px;background-position:6px 0;}#fancybox-buttons a.btnNext{background-position:-33px 0;border-right:1px solid #3e3e3e;}#fancybox-buttons a.btnPlay{background-position:0 -30px;}#fancybox-buttons a.btnPlayOn{background-position:-30px -30px;}#fancybox-buttons a.btnToggle{background-position:3px -60px;border-left:1px solid #111;border-right:1px solid #3e3e3e;width:35px;}#fancybox-buttons a.btnToggleOn{background-position:-27px -60px;}#fancybox-buttons a.btnClose{border-left:1px solid #111;width:38px;background-position:-57px 0;}#fancybox-buttons a.btnDisabled{opacity:0.5;cursor:default;}\
		/* drag */ #output{display:none;background:grey;min-height:200px;margin:20px;padding:10px;border:2px dotted#fff;text-align:center;position:relative;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;}#output:before{content:"Drag and Drop images.";color:#fff;font-size:50px;font-weight:bold;opacity:0.5;text-shadow:1px 1px#000;position:absolute;width:100%;left:0;top:50%;margin:-50px 0 0;z-index:1;}#output img{display:inline-block;margin:0 10px 10px 0;} button{display:inline-block;vertical-align:baseline;outline:none;cursor:pointer;text-align:center;text-decoration:none;font:700 14px/100% Arial, Helvetica, sans-serif;text-shadow:0 1px 1px rgba(0,0,0,.3);color:#d9eef7;border:solid 1px #0076a3;-webkit-border-radius:.5em;-moz-border-radius:.5em;background-color:#59F;border-radius:.5em;-webkit-box-shadow:0 1px 2px rgba(0,0,0,.2);-moz-box-shadow:0 1px 2px rgba(0,0,0,.2);box-shadow:0 1px 2px rgba(0,0,0,.2);margin:0 2px 12px;padding:.5em 2em .55em;}.cName{display:none;}#fsCount{position: absolute;top: 20;right: 20;font-size: 3em;}</style>';
		tHTML=tHTML+'<header id="hd"><div class="logo" id="logo"><div class="wrapper"><h1 id="aName">'+'<a href='+c.aLink.split('&')[0]+'&ref=>'+c.aName+'</a> '+((c.aAuth)?'- '+c.aAuth:"")+'<button onClick="cleanup()">ReStyle</button><button id="cName" onClick="changeName()">ChangeName</button><button id="zipAllFiles" class="cName">2.Zip all files</button><button id="getHTML" class="cName">3.Get HTML</button><button id="reloadFs" class="cName">Reload</button><button id="resetFs" class="cName">Reset</button><button id="help" class="cName">HELP</button></h1></div></div></header>';
		tHTML=tHTML+'<br/><center id="aTime">'+c.aTime+'</center><br><center id="aDes">'+c.aDes+'</center><br/><div id="output" class="cName"></div><div class="wrapper"><div id="bd"><div id="container" class="masonry">';
		tHTML=tHTML+'<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script><script type="text/javascript" src="https://dl.dropbox.com/u/4013937/jquery.masonry.min.js"></script><script>var totalCount='+totalCount+',loadedCount=0;dFbA="1";\
		document.title="'+c.aName+'";/*var head = document.getElementsByTagName("head")[0];var script1 = document.createElement("script");script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";head.appendChild(script1);var script2 = document.createElement("script");script2.src = "https://dl.dropbox.com/u/4013937/jquery.masonry.min.js";head.appendChild(script2);*/\
		function cleanup(){$(".item .item").unwrap();$("#container").masonry({itemSelector: ".item"});$("#container").masonry("reload");$("img").attr({"onload":"","onerror":""});$(".item img[src*=\'_o.jpg\']").each(function(i,e){$(e).parentsUntil(".item").parent() .css("background-color","#FFC")});$(".fancybox").fancybox({playSpeed:2000,openEffect:"none",closeEffect:"none",prevEffect:"none",nextEffect:"none",closeBtn:false,helpers:{buttons:{}}});}\
		function loadCount(a){loadedCount++;if(loadedCount=='+totalCount+'){cleanup();}}$(function(){setTimeout(function(){cleanup()},1000);});</script>';
		tHTML=tHTML+b.join("")+'</div></div></div></body>';
		if(navigator.userAgent.indexOf('Chrome')>0){w.document.write(tHTML);}else{
		var wo = w.window.open(''+c.aLink, '');
		wo.document.write(tHTML);
		wo.document.close();}
		break;
		}
};