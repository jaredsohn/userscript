// ==UserScript==
// @name         LDR + GoogleWebHistory
// @namespace    http://userscripts.org/users/7010
// @include      http://reader.livedoor.com/reader/
// @include      http://fastladder.com/reader/* 
// ==/UserScript==


// 初期設定では、どのフィードも送信されません

// この値以下のレートのフィードは記録しない
var IGNORE_RATE = 5;     //  -1

// この正規表現にマッチするフォルダのフィードは記録しない
var IGNORE_FOLDER = /./; //  /^$/

var stack = new Stack(400);
with(unsafeWindow){
	addBefore(unsafeWindow, 'touch_all', function(id){
		if(!get_unread.cache.has(id) || 
			IGNORE_FOLDER.test(subs_item(State.now_reading).folder) || 
			subs_item(get_active_feed().subscribe_id).rate <= IGNORE_RATE)
				return;
		
		foreach(get_unread.cache.get(id).items, function(item){
			stack.push(function(){
				gwh(item.link);
			});
		});
	});
}


// -- [Utility] ----------------------------------------------------------------------
function addBefore(target, name, before) {
	var original = target[name];
	target[name] = function() {
		before.apply(this, arguments);
		return original.apply(this, arguments);
	}
}

function Stack(interval){
	var interval = interval==null? 100 : interval;
	var q = [];
	var iid = null;
	
	this.push = function(fs){
		if(typeof(fs)=='function'){
			q.push(fs);
		} else {
			while(fs.length)
				q.push(fs.shift());
		}
		
		if(iid!=null)
			return;
		
		iid = setInterval(function(){
			q.shift()();
			
			if(!q.length){
				clearInterval(iid);
				iid = null;
			}
		}, interval);
	};
}

// Thanks to mallowlabs
// http://userscripts.org/scripts/show/19741
function gwh(url){
	var r=function(x,y){
		return Math.floor((x/y-Math.floor(x/y))*y+.1);
	},
	ch=function(url){
		url='info:'+url;
		var c=[0x9E3779B9,0x9E3779B9,0xE6359A60],i,j,k=0,l,f=Math.floor,
		m=function(c){
			var i,j,s=[13,8,13,12,16,5,3,10,15];
			for(i=0;i<9;i+=1){
				j=c[r(i+2,3)];
				c[r(i,3)]=(c[r(i,3)]-c[r(i+1,3)]-j)^(r(i,3)==1?j<<s[i]:j>>>s[i]);
			}
		};
		for(l=url.length;l>=12;l-=12){
			for(i=0;i<16;i+=1){
				j=k+i;c[f(i/4)]+=url.charCodeAt(j)<<(r(j,4)*8);
			}
			m(c);
			k+=12;
		}
		c[2]+=url.length;
		for(i=l;i>0;i--)
			c[f((i-1)/4)]+=url.charCodeAt(k+i-1)<<(r(i-1,4)+(i>8?1:0))*8;
		m(c);
		return'6'+c[2];
	};
	
	return (gwh = function(url){
		url = 'http://www.google.com/search?client=navclient-auto&ch='+ch(url)+'&features=Rank&q=info:'+escape(url);
		GM_xmlhttpRequest({
			method : 'GET',
			url    : url,
		});
	})(url);
};