// ==UserScript==
// @name        Google Instant Disabler
// @namespace   smk
// @include		http://www.google.tld/*
// @include		https://www.google.tld/*
// @include		https://encrypted.google.com/*
// ==/UserScript==

function onInstantDetected(cb){
	//the instant message node can show up even when not in instant, so use another node to test
	//the page sources are nearly identical, so detect instant loading via ajax
	let gbq=document.querySelector('#gbq');
	if(!gbq)
		return false;
	
	let instantObserver=new MutationObserver(function(mutations){
		if(gbq.querySelector('#gs_ttc0')){
			instantObserver.disconnect();
			cb();
		}
	});
	instantObserver.observe(gbq,{childList: true, subtree: true});
	return true;
}

function main(){
	onInstantDetected(function(){
		let prefLinks=document.querySelectorAll('a[href^="/setprefs?"]');
		for(let i=0;i<prefLinks.length;i++){
			let url=prefLinks[i].href;
			if(url.split('&').indexOf('suggon=2')!=-1){
				window.location.href=url;
				break;
			}
		}
	});
}

main();
