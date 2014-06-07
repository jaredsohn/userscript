// ==UserScript==
// @name           Youtube Comment Filter
// @namespace      smk
// @description    Filters youtube comments
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==

/**
0.1
	[cmt] will only implement a simple filter algo, won't support too many filters
	[cmt] only filters video comments (no channel comments)
*/

let config={
	filters: [/thumbs up/],
	logTime: true,
}

//helper classes
let logTime={
	currTime: null,
	
	start: function(){
		logTime.currTime=new Date().getTime();
	},
	
	snap: function(msg){
		GM_log(msg+': '+(new Date().getTime()-logTime.currTime)+'ms');
	},
	
	end: function(msg){
		logTime.snap(msg);
		logTime.currTime=null;
	},
	
	restart: function(msg){
		logTime.snap(msg);
		logTime.start();
	},
	
	profile: function(parent,funcName){
		let tTime=0;
		let func=parent[funcName];
		
		parent[funcName]=function(){
			let currTime=new Date().getTime();
			let ret=func.apply(this,arguments);
			tTime+=new Date().getTime()-currTime;
			return ret;
		};
		
		this.snap=function(msg){
			GM_log(msg+': '+tTime+'ms');
		};
		
		this.end=function(msg){
			this.snap(msg);
			tTime=0;
		};
	},
};

//

function filterComments(){
	let comments=document.querySelectorAll('li.comment');
	let filters=config.filters;
	for(let i=0;i<comments.length;i++){
		let text=comments[i].querySelector('.comment-text');
		if(text){
			text=text.textContent;
			for(let j=0;j<filters.length;j++){
				if(filters[j].test(text)){
					comments[i].parentNode.removeChild(comments[i]);
					break;
				}
			}
		}
	}
}

function main(){
	if(config.logTime) logTime.start();
	filterComments();
	if(config.logTime) logTime.end('Filter matching time');
	//hook dynamic comment loading
	document.querySelector('#comments-loading').addEventListener('DOMAttrModified',function(e){
		if(e.newValue=='display: none;'){
			filterComments();
		}
	},false);
}

main();
