// ==UserScript==
// @id             Tekzilla 720p Vid in Rss Feed
// @name           Tekzilla 720p Vid in Rss Feed
// @namespace      Tekzilla
// @description    Changes the video link in the tekzilla video rss feed in google reader to the 720p version.
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

var interval=null;

function changeTekLinks(){

	let revAs=document.querySelectorAll('#entries .entry-container a[href^="http://videos.revision3.com/revision3/web/tekzilla/"]');

	[].forEach.call(revAs,function(item,index,array){
		item.href=item.href.replace('large.h264.mp4','hd720p30.h264.mp4');
	});

}

window.addEventListener('hashchange',function(e){

	if(this.location.href.indexOf('revision3.com%2Ftekzilla')>-1){

		let loadingSign=document.querySelector('#loading-area');

		if(loadingSign.classList.contains('hidden')){
			changeTekLinks();
		}
		else{
			interval=window.setInterval(function(){
				if(loadingSign.classList.contains('hidden')){
					changeTekLinks();
					window.clearInterval(interval);
				}
			},500);
		}
	}

},false);