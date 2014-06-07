// ==UserScript==
// @name          NicoNicoPlaylist mod
// @namespace     oamaxa
// @original      d.hatena.ne.jp/Sore_0
// @description   List up the series of movies and play them all!
// @include       http://www.nicovideo.jp/*
// @include       http://com.nicovideo.jp/*
// @include       http://dic.nicovideo.jp/*
// @include       https://secure.nicovideo.jp/secure/login_form*
// @exclude       http://www.nicovideo.jp/api/*
// @exclude       http://www.nicovideo.jp/thumb/*
// @version	      2.1.4
// @update        2013/04/29
// ==/UserScript==

//var DEBUG=true;
var w=(unsafeWindow||window),document=w.document;
var $=function(id){return document.getElementById(id)||undefined;};
var $n=function(tag){return document.createElement(tag);};
var $x=function(node){
	var x=document.evaluate(node,document,null,7,null),array=new Array();
	for(var i=0; i<x.snapshotLength; i++) array.push(x.snapshotItem(i));
	return array;
};
var Util={
	getElementPosition:function(e){
		var e=e,top=e.offsetTop,left=e.offsetLeft,height=e.offsetHeight,width=e.offsetWidth;
		while(e.offsetParent){
			e=e.offsetParent;
			top+=e.offsetTop;
			left+=e.offsetLeft;
		}
		return {top:top,left:left,bottom:top+height,right:left+width,height:height,width:width};
	},
	getParent:function(e,target){
		var e=e,target=target.split(":");
		while(!(!e||e.tagName=="HTML"||(e[target[0]]&&e[target[0]].indexOf(target[1])>-1))) e=e.parentNode;
		return (e&&e[target[0]]&&e[target[0]].indexOf(target[1])>-1)? e:false;
	},
	xhr:function(e,f){
		var f=(typeof f=="function")? f():function(){},r=new XMLHttpRequest();
		r.open("GET",e,false);
		r.onload=r.onerror=f;
		r.send(null);
	},
	opacity:function(e){
		if(e.className.indexOf(" opacity")>-1) return;
		var opacity=0,css=e.style.cssText;
		e.className+=" opacity";
		var timer=setInterval(function(){
			if(opacity==100){
				clearInterval(timer);
				e.style.cssText=css;
				e.className=e.className.replace(" opacity","");
			}
			else{
				opacity=(opacity>96)? 100:opacity+4;
				e.style.cssText=[
					css,
					"-moz-opacity:"+opacity/100+";",
					"opacity:"+opacity/100+";"
				].join(" ");
			}
	    },40);
	}
};

String.prototype.unescapeHTML=function(){
	var str=""+this;
	str=str.replace(/&(amp;)+/g,"&");
	str=str.split("&#039;").join("'");
	str=str.split('&#123;').join("{");
	str=str.split('&#125;').join("}");
	str=str.split("&quot;").join('"');
	str=str.split("&gt;").join(">");
	str=str.split("&lt;").join("<");
	str=str.split("<wbr>").join("");
	return str;
};

var URL={
	NICO:/^https?:\/\/.*?\.(?:nico|smile)video\.jp\//, 
	WATCH_REGEXP:/http:\/\/.*?\.nicovideo\.jp\/watch\/([^\/?<>\"\'#]+)/, 
	WATCH:"http://www.nicovideo.jp/watch/",
	CACHE:"http://www.nicovideo.jp/cache/",
	MYLIST:"http://www.nicovideo.jp/mylist/",
	GETTHUMB:"http://ext.nicovideo.jp/api/getthumbinfo/",
	GETRELATION:"http://ext.nicovideo.jp/api/getrelation?sort=p&order=d&video=",
	MS:"http://nico.ms/",
	WHATPAGE:function(){
		var m;
		if(m=location.href.match(/http:\/\/.*?\.nicovideo\.jp\/([^\/]*)\/?/)) return m[1];
	}
};
const watchPage=!!(location.href.match(URL.WATCH_REGEXP)&&$("flvplayer_container"));
const chPage=/http:\/\/ch.nicovideo.jp\//.test(location.href);
const comPage=/http:\/\/com.nicovideo.jp\//.test(location.href);
const dicPage=/http:\/\/dic.nicovideo.jp\//.test(location.href);
if(typeof w.Nico=="undefined") w.Nico={};

var Video=function(){this.initialize.apply(this,arguments);};
	Video.prototype={
		initialize:function(){
			this.id=arguments[0]||"";
			this.title=arguments[1]||"";
			this.opt=arguments[2]||[];
		},
		serialize:function(){
			return [escape(this.id),escape(this.title),this.opt.join(",")].join("&");
		},
		unserialize:function(data){
			var r=[];
			if(data) r=data.split("&");
			this.id=unescape(r[0]);
			this.title=unescape(r[1]);
			this.opt=r[2]? r[2].split(","):[];
		},
		getPlayUri:function(){return URL.WATCH+this.id;},
		play:function(e){location.replace(this.getPlayUri()+e);},
		getRelatedVideos:function(iterator,terminator){
			GM_xmlhttpRequest({
				method:"GET",
				url:URL.GETRELATION+this.id,
				headers:{"Content-type":"text/xml"},
				onload:function(r){
					var tags=r.responseText.match(/<video>((?:.|\r|\n)+?)<\/video>/gm);
					if(tags){
						for(var i=0,len=tags.length; i<len; i++){
							var videoId=tags[i].match(URL.WATCH_REGEXP);
							var title=tags[i].match(/<title>(.+?)<\/title>/);
							iterator(videoId[1],title[1]);
						}
					}
					terminator();
				},
				onerror:function(){terminator();}
			});
		}
	};

var PlayList=function(){this.initialize.apply(this,arguments);};
	PlayList.all=function(){
		var list=GM_getValue("playlist.all",false);
		return list? list.split(/,/):[];
	};
	PlayList.add=function(id){
		GM_setValue("current",id);
		if(PlayList.checker(id)) return;
		var list=PlayList.all();
		list.push(id);
		GM_setValue("playlist.all",list.join(","));
	};
	PlayList.del=function(id){
		var list=PlayList.all();
		for(var i=0; i<list.length; i++) if(list[i]==id) list.splice(i,1);
		GM_setValue("playlist.all",list.join(","));
		var val=GM_listValues();
		for(var i=0; i<val.length; i++) if(val[i].replace(/[a-z]+_/,"")==id) GM_deleteValue(val[i]);
	};
	PlayList.checker=function(id){
		var m=false,list=PlayList.all();
		for(var i=0; i<list.length; i++){
			if(list[i]==id){
				m=true;
				break;
			}
		}
		return m;
	};
	PlayList.videos=function(){
		var list=PlayList.all(),meta,n=0;
		for(var i=0; i<list.length; i++){
			meta=GM_getValue("playlist_"+list[i]).split(/;/)[1].split(/:/);
			n+=(meta[0]=="")? 0:meta.length;
		}
		return n;
	};
	PlayList.prototype={
		initialize:function(){
			this.id=arguments[0]||"default";
			this.videos=[];
			this.load();
		},
		serialize:function(){
			var videos=[];
			for(var i=0; i<this.videos.length; i++) videos.push(this.videos[i].serialize());
			return [this.id,videos.join(":")].join(";");
		},
		unserialize:function(data){
			var r=data.split(/;/)[1];
			if(!r) return;
			var vids=r.split(/:/);
			for(var i=0; i<vids.length; i++){
				if(vids[i]){
					var v=new Video();
					v.unserialize(vids[i]);
					this.videos.push(v);
				}
			}
		},
		save:function(){GM_setValue("playlist_"+this.id,this.serialize());},
		copy:function(id){GM_setValue("playlist_"+id,id+this.serialize().slice(this.id.length));},
		load:function(){
			var data=GM_getValue("playlist_"+this.id,false);
			if(data) this.unserialize(data);
		},
		push:function(video){this.videos.push(video);},
		unshift:function(video){this.videos.unshift(video);},
		pop:function(){return this.videos.shift();},
		popRandom:function(){
			if(this.videos.length==0) return null;
			var i=Math.floor(Math.random()*this.videos.length);
			var v=this.videos[i];
			this.videos.splice(i,1);
			return v;
		},
		remove:function(a,b){
			var start=a<b? a:b,end=a<b? b:a;
			this.videos.splice(start,end-start+1);
		},
		move:function(a,b){
			if(a<b){
				this.videos.splice(b+1,0,this.videos[a]);
				this.videos.splice(a,1);
			}
			else{
				this.videos.splice(b,0,this.videos[a]);
				this.videos.splice(a+1,1);
			}
		},
		reverse:function(a,b){
			var start=a<b? a:b,end=a<b? b:a,videos=this.videos.slice(start,end+1);
			videos.reverse();
			for(var i=0; i<videos.length; i++) this.videos.splice(start+i,1,videos[i]);
		},
		fetch:function(n,f){
			var id=this.videos[n].id,self=this;
			GM_xmlhttpRequest({
				method:"GET",
				url:URL.GETTHUMB+id,
				headers:{"Content-type":"text/xml","User-agent":"Mozilla/5.0 Greasemonkey"},
				onload:function(r){
					var m,title=(m=r.responseText.match(/<title>(.+?)<\/title>/))? m[1]:id;
					for(var i=0; i<self.videos.length; i++){
						if(self.videos[i].id==id) self.videos[i].title=title;
					}
					f();
				},
				onerror:function(){return false;}
			});
		},
		clear:function(){this.videos=[];}
	};

var PlayListController=function(){this.initialize.apply(this,arguments);};
	PlayListController.prototype={
		initialize:function(){
			var playlist=arguments[0];
			PlayList.add(playlist.id);
			this.continuity=arguments[1];
			this.scroll=GM_getValue("scroll",0);
			this.delay=GM_getValue("delay",5000);
			this.rc=GM_getValue("rc",2);
			this.lp=[];
			this.merge=[];
			this.mark="del";
			this.pick=false;
			var data=["auto","extend","popmark","pause"];
			for(var i=0; i<data.length; i++) this[data[i]]=GM_getValue(data[i],false);

			var self=this;
			this.menuitems=[
				{label:"",caption:"add option",func:function(){
					var ret=prompt("Please enter the optional data.",self.playlist.videos[arguments[0]].opt.join(","));
					if(typeof ret=="string"){
						ret=ret.replace(/\s+/,"");
						if(ret=="") ret=[];
						else{
							ret=ret.split(",");
							for(var i=0; i<ret.length; i++) if(!ret[i].match(/^(?:eco|com|fs|cache|pause|vol=(?:\d{1,2}|100))$/)) return alert("Invalid strings.");
						}
						self.playlist.videos[arguments[0]].opt=ret;
						self.playlist.save();
						self.update();
					}
				},title:"オプション設定"}
			];
			this.width=465;
			this.id=$n("div");
			this.id.id="playlistController";
			this.id.style.width=this.width+"px";
			this.id.style.left=(typeof DEBUG=="undefined")? 4-this.width+"px":"0px";
			this.id.addEventListener("mouseover",function(){this.style.left="0px";},false);
			this.id.addEventListener("mouseout",function(e){
				if(!self.pin&&e.relatedTarget&&!Util.getParent(e.relatedTarget,"id:playlistController")){
					if(w.playerMaximized) self.id.style.display="none";
					this.style.left=4-self.width+"px";
				}
			},false);
			document.body.appendChild(this.id);
			this.bind(playlist);
			
			document.addEventListener("click",function(e){
				if(!self.pick||e.which==3) return;
				var ee=e.target;
				if(ee.tagName=="SPAN"&&ee.className=="vinfo_title") ee=ee.parentNode;
				else if(ee.tagName!="A") return;
				var m;
				if((m=ee.href.match(/(?:(?:nicovideo\.jp\/)?watch|nico\.ms)\/([a-z]*\d+)$/))&&ee.className.indexOf("noadd")==-1){
					e.preventDefault();
					Util.opacity(ee);
					self.pushVideo(m[1],dicPage? ee.textContent:(ee.href.match(URL.MS)? m[1]:ee.innerHTML));
				}
			},true);
		},
		bind:function(playlist){
			this.playlist=playlist;
			this.buffer={playlist:[],n:0};
			this.color=GM_getValue("color_"+playlist.id,"#FFF0FC");
			var data=["eco","com","vol","vl","fs","random","loop","cache"];
			for(var i=0; i<data.length; i++) this[data[i]]=GM_getValue(data[i]+"_"+playlist.id,false);
			this.update();
		},
		change:function(id){
			PlayList.add(id);
			this.bind(playlist=new PlayList(id));
		},
		getPageVideoId:function(){
			var m;
			return (m=location.href.match(URL.WATCH_REGEXP))? m[1]:false;
		},
		isWatchPage:function(){return this.getPageVideoId()!=false;},
		pushVideo:function(video,title,opt){
			if(!video.match(/^[a-z]*\d+$/)) return;
			this.clone();
			this.playlist.push(new Video(video,title? title.unescapeHTML():video,opt));
			this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
			this.playlist.save();
			this.update();
		},
		unshiftVideo:function(video,title,opt){
			if(!video.match(/^[a-z]*\d+$/)) return;
			this.clone();
			this.playlist.unshift(new Video(video,title? title.unescapeHTML():video,opt));
			this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
			this.playlist.save();
			this.update();
		},
		pushVideos:function(videos){
			this.clone();
			for(var i=0,len=videos.length; i<len; i++){
				var v=videos[i];
				if(v.id&&v.id.match(/^[a-z]*\d+$/)){
					var video=new Video(v.id,v.title? v.title.unescapeHTML():v.id,v.opt);
					this.playlist.push(video);
				}
			}
			this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
			this.playlist.save();
			this.update();
		},
		pushThisVideo:function(){
			var videoId=this.getPageVideoId();
			if(videoId){
				this.clone();
				this.playlist.push(new Video(videoId,unescape(w.Video.title)));
				this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
				this.playlist.save();
				this.update();
			}
		},
		pushAllVideos:function(){
			this.clone();
			var as=$x("//a[contains(concat(' ',normalize-space(@class),' '),' video ')]|//a[contains(concat(' ',normalize-space(@class),' '),' watch ')]|//a[contains(concat(' ',normalize-space(@class),' '),' vinfo_title ')]");
			if(dicPage) as=as.concat($x("//a[@rel='nofollow']"));
			for(var i=0, len=as.length; i<len; i++){
				var a=as[i],m,title,t;
				if(a.className.indexOf("noadd")>-1) continue;
				if(m=a.href.match(URL.WATCH_REGEXP)){
					if(dicPage) title=a.textContent;
					else title=(t=a.innerHTML.match(/<span[^>]*?>(.*?)<\/span>/))? t[1]:a.innerHTML;
					this.playlist.push(new Video(m[1],title));
				}
			}

			var self=this;
			if(watchPage){
				var thisVideo=new Video(w.Video.id);
				thisVideo.getRelatedVideos(function(videoId,title){
					self.playlist.push(new Video(videoId,title));
				},function(){
					self.buffer.playlist[-1]=Array.apply(null,self.playlist.videos);
					self.playlist.save();
					self.update();
				});
			}
			else{
				self.buffer.playlist[-1]=Array.apply(null,self.playlist.videos);
				self.playlist.save();
				self.update();
			}
		},
		pushMarkedVideos:function(){
			var $marked=$x("//a[contains(concat(' ',normalize-space(@class),' '),' video ')][./ancestor::*[contains(concat(' ',normalize-space(@class),' '), ' marked ')]]|//a[contains(concat(' ',normalize-space(@class),' '),' watch ')][./ancestor::*[contains(concat(' ',normalize-space(@class),' '), ' marked ')]]|//a[contains(concat(' ',normalize-space(@class),' '),' vinfo_title ')][./ancestor::*[contains(concat(' ',normalize-space(@class),' '), ' marked ')]]");
			if($marked.length==0) return;
			this.clone();
			for(var i=0; i<$marked.length; i++){
				if($marked[i].href.match(URL.WATCH)&&$marked[i].href.indexOf($marked[i].textContent)==-1){
					var link=$marked[i].href.match(/watch\/([^\/?<>\"\'#]+)/)[1];
					this.playlist.push(new Video(link,$marked[i].textContent));	
					if(this.popmark) this.popVideoMark();
				}
			}
			this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
			this.playlist.save();
			this.update();
		},
		popVideoMark:function(){
			var $marked=$x("//*[contains(concat(' ',normalize-space(@class),' '),' marked ')]");
			if($marked.length==0) return;
			var page=URL.WHATPAGE();
			for(var i=0; i<$marked.length; i++){
				if($marked[i].className.indexOf("marking")>-1) $marked[i].className=$marked[i].className.replace(/\s+marked/,"");
				else if(page.match(/ranking|tag|search|newarrival|recent|myvideo|hotlist|\?g=/g)||page=="") $marked[i].setAttribute("class","thumb_frm");
				else for(var i=0; i<$marked.length; i++) $marked[i].setAttribute("class","");
			}
		},
		playNext:function(){
			var video=this.random? this.playlist.popRandom():this.playlist.pop();
			if(video){
				if(this.loop) this.playlist.push(video);
				this.playlist.save();
				window.name+=" continuity:\""+this.playlist.id+"\"";
				if(video.opt.length>0) window.name+="\" opt:\""+video.opt.join(",")+"\"";
				if(video.opt.indexOf("eco")>-1) this.eco=!this.eco;
				if(this.eco&&this.lp.indexOf("eco=1")==-1) this.lp.unshift("eco=1");
				video.play(this.lp[0]? "?"+this.lp.join("&"):"");
			}
		},
		capture:function(e,video,f){
			var mark=$x("//a[contains(concat(' ',normalize-space(@class),' '),' checked ')]")[0];
			if(typeof mark!="undefined"){
				var n=parseInt(mark.className.split(/\s+/)[2],10);
				if(n!=video){
					this.clone();
					f(n,video);
					this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
					this.playlist.save();
				}
				this.update();
			}
			else{
				this.pin=true;
				var n=$x("//a[contains(concat(' ',normalize-space(@class),' '),' "+e+" ')]")[video];
				n.className=e+" checked "+video;
				n.parentNode.style.backgroundColor=n.parentNode.lastChild.style.backgroundColor=n.style.color;
				n.parentNode.lastChild.style.color=n.style.color="white";
			}
		},
		remove:function(video,event){
			if(event=="contextmenu"){
				var self=this;
				this.capture("del",video,function(a,b){self.playlist.remove(a,b);});
			}
			else{
				this.clone();
				this.playlist.videos.splice(video,1);
				this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
				this.playlist.save();
				this.update();
			}
		},
		move:function(video){
			var self=this;
			this.capture("move",video,function(a,b){self.playlist.move(a,b);});
		},
		reverse:function(video){
			var self=this;
			this.capture("rev",video,function(a,b){self.playlist.reverse(a,b);});
		},
		clear:function(){
			this.clone();
			this.playlist.clear();
			this.buffer.playlist[-1]=Array.apply(null,this.playlist.videos);
			this.playlist.save();
			this.update();
		},
		fetch:function(video){
			var self=this;
			this.playlist.fetch(video,function(){
				self.playlist.save();
				self.update();
			});
		},
		state:function(e,state){
			this[e]=state;
			GM_setValue(e,state);
		},
		_state:function(e,state){
			this[e]=state;
			GM_setValue(e+"_"+this.playlist.id,state);
		},
		copy:function(id){
			var data=["color","eco","com","vol","vl","fs","random","loop","cache"];
			for(var i=0; i<data.length; i++) if(typeof this[data[i]]!="undefined") GM_setValue(data[i]+"_"+id,this[data[i]]);
			this.playlist.copy(id);
		},
		duplicate:function(id){
			this.copy(id);
			this.change(id);
		},
		rename:function(id){
			this.copy(id);
			PlayList.del(this.playlist.id);
			this.change(id);
		},
		clone:function(){
			this.buffer.playlist.splice(0,this.buffer.n,Array.apply(null,this.playlist.videos));
			this.buffer.n=0;
		},
		track:function(back){
			(back)? this.buffer.n++:this.buffer.n--;
			this.playlist.videos=this.buffer.playlist[this.buffer.n-1];
			this.playlist.save();
			this.update();
		},
		marker:function(e){
			var a={},mark=["del","move","rev","rename"];
			for(var i=0; i<mark.length; i++) a[mark[i]]=$x("//a[contains(concat(' ',normalize-space(@class),' '),' "+mark[i]+" ')]");
			for(var j=0; j<this.playlist.videos.length; j++){
				for(var k in a) a[k][j].style.display="none";
				a[e][j].style.display="inline";
			}
			this.mark=e;
			this.update();
		},
		openContext:function(e,name){
			this.pin=true;
			var div=$x("//div[contains(concat(' ',normalize-space(@class),' '),' playlistContext ')]");
			if(div[0]) for(var i=0; i<div.length; i++) document.body.removeChild(div[i]);
			div=$n("div");
			div.className="playlistContext "+name;
			div.style.backgroundColor=this.color;
			div.style.left=e.clientX+10+"px";
			div.style.top=e.clientY+10+"px";
			document.body.appendChild(div);
			var self=this,mousedown;
			document.addEventListener("mousedown",function(elem){
				var ee=elem.target;
				if(div.className.indexOf("addform")>-1) return;
				while(ee.parentNode&&!(ee.tagName=="BODY"||ee==div)) ee=ee.parentNode;
				if(ee){
					mousedown=arguments.callee;
					self.closeContext(div);
				}
			},false);
			this.closeContext=function(e){
				this.pin=(typeof DEBUG=="undefined")? false:true;
				document.removeEventListener("mousedown",mousedown,false);
				document.body.removeChild(e);
			};
			return div;
		},
		config:function(){
			this.pin=true;
			var self=this;
			this.id.innerHTML="";

			var header=$n("p");
				header.className="playlist-header";
			this.id.appendChild(header);
			var title=$n("span");
				title.style.fontWeight="bold";
				title.style.color="#C9A9CC";
				title.innerHTML="Playlist";
				title.style.cursor="pointer";
				title.addEventListener("click",function(){self.update();},false);
			header.appendChild(title);
			var conf=$n("span");
				conf.style.marginLeft="10px";
				conf.style.fontWeight="bold";
				conf.innerHTML="Preference";
			header.appendChild(conf);

			var hr=$n("hr");
				hr.style.margin="0px 10px";
			this.id.appendChild(hr);

			var div=$n("div");
				div.style.margin="10px";
				div.style.padding="0px";
			this.id.appendChild(div);
			var ul=$n("ul");
				ul.className="font12";
				ul.style.listStyleType="circle";
				ul.style.margin="0px 10px 0px 20px";
				ul.style.padding="0px";
				ul.style.fontWeight="bold";
			div.appendChild(ul);

			var checkDef=[
				{caption:"disable auto play",title:"自動再生を無効化",click:function(){
					self.state("auto",this.checked);
				},checked:this.auto},
				{caption:"extend assistive functions",title:"プレイリスト外の動画に補助機能を適用",click:function(){
					self.state("extend",this.checked);
				},checked:this.extend},
				{caption:"delete mark",title:"マークした動画を追加後、動画のマークを外す",click:function(){
					self.state("popmark",this.checked);
				},checked:this.popmark},
				{caption:"enable auto login",title:"自動ログインを有効化",click:function(){
					self.state("login",this.checked);
				},checked:login}
			];
			for(var i=0, len=checkDef.length; i<len; i++){
				var def=checkDef[i];
				var list=$n("li");
					list.style.marginTop="10px";
				ul.appendChild(list);
				var chk=$n("input");
					chk.id="config_check_"+i;
					chk.type="checkbox";
					chk.style.marginTop="0px";
					chk.style.verticalAlign="middle";
				if(def.click) chk.addEventListener("click",def.click,false);
				if(def.checked) chk.checked="checked";
				list.appendChild(chk);
				var label=$n("label");
					label.htmlFor=chk.id;
					label.innerHTML=def.caption;
					label.style.verticalAlign="middle";
					label.style.border="none";
				list.appendChild(label);
				chk.title=label.title=def.title;
			}

			var timer;
			var textDef=[
				{caption:"adjust scroll",title:"スクロール調整",click:function(e){
					var value=e.target.previousSibling.value,span=e.target.nextSibling;
					if(value.match(/^-?\d+$/)){
						self.scroll=value;
						GM_setValue("scroll",value);
						if(value=="184") span.innerHTML="scroll disabled";
						else{
							e.target.style.display="none";
							span.innerHTML="updated";
							if(typeof player!="undefined") player.scroll(self.scroll);
						}
					}
					else span.innerHTML="error";
					timer=setTimeout(function(){
						e.target.style.display="none";
						span.innerHTML="";
					},3000);
				},init:"scroll"},
				{caption:"delay for auto play",title:"自動再生までの遅延時間(ミリ秒)",click:function(e){
					var value=e.target.previousSibling.value,span=e.target.nextSibling;
					if(value.match(/^\d+$/)){
						self.delay=value;
						GM_setValue("delay",value);
						e.target.style.display="none";
						span.innerHTML="updated";
					}
					else span.innerHTML="error";
					timer=setTimeout(function(){
						e.target.style.display="none";
						span.innerHTML="";
					},3000);
				},init:"delay"},
				{caption:"auto reload",title:"動画読み込みエラー時の自動リロード回数",click:function(e){
					var value=e.target.previousSibling.value,span=e.target.nextSibling;
					if(value.match(/^\d$/)){
						self.rc=value;
						GM_setValue("rc",value);
						e.target.style.display="none";
						span.innerHTML="updated";
					}
					else span.innerHTML="error";
					timer=setTimeout(function(){
						e.target.style.display="none";
						span.innerHTML="";
					},3000);
				},init:"rc"},
				{caption:"chrome code",title:"背景色を変更",click:function(e){
					var value=e.target.previousSibling.value,span=e.target.nextSibling;
					if(value.match(/^#(?:[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)){
						self.id.style.backgroundColor=self.color=value;
						GM_setValue("color_"+self.playlist.id,value);
						e.target.style.display="none";
						span.innerHTML="updated";
					}
					else span.innerHTML="error";
					timer=setTimeout(function(){
						e.target.style.display="none";
						span.innerHTML="";
					},3000);
				},init:"color"}
			];
			for(var i=0, len=textDef.length; i<len; i++){
				var def=textDef[i];
				var list=$n("li");
					list.style.paddingLeft="5px";
					list.style.paddingTop="8px";
				ul.appendChild(list);
				var desc=$n("span");
					desc.innerHTML=def.caption+" : ";
				list.appendChild(desc);
				var text=$n("input");
					text.className="font12";
					text.type="text";
					text.size="7";
					text.style.border="1px solid black";
					text.style.padding="3px";
					text.value=this[def.init];
					text.addEventListener("keyup",function(e){
						if(timer) clearTimeout(timer);
						e.target.nextSibling.style.display="";
					},false);
				list.appendChild(text);
				var button=$n("input");
					button.className="_submit";
					button.type="button";
					button.value="save";
					button.style.marginLeft="10px";
					button.style.display="none";
					button.addEventListener("click",def.click,false);
				list.appendChild(button);
				var span=$n("span");
					span.style.marginLeft="10px";
					span.style.color="red";
				list.appendChild(span);
				desc.title=text.title=def.title;
			}
		},
		update:function(callback){
			this.pin=(typeof DEBUG=="undefined")? false:true;

			var self=this,listScrollTop=0;
			if($("listbox")) listScrollTop=$("listbox").firstChild.scrollTop;
			this.id.innerHTML="";
			this.id.style.backgroundColor=this.color;

			var header=$n("p");
				header.className="playlist-header";
				header.innerHTML="Playlist";
			this.id.appendChild(header);
			var conf=$n("span");
				conf.style.marginLeft="10px";
				conf.style.fontWeight="bold";
				conf.style.color="#C9A9CC";
				conf.innerHTML="Preference";
				conf.style.cursor="pointer";
				conf.addEventListener("click",function(){self.config();},false);
			header.appendChild(conf);

			var hr=$n("hr");
				hr.style.margin="0px 10px 3px 10px";
			this.id.appendChild(hr);

			var div2=$n("div");
				div2.style.margin="0px 10px";
				div2.style.padding="0px";
				div2.style.cssFloat="left";
			this.id.appendChild(div2);

			var modeSelect=$n("select");
				modeSelect.title="編集モード";
			var selectDefinition=[
				{caption:"Delete",color:"red",value:"del"},
				{caption:"Move",color:"blue",value:"move"},
				{caption:"Reverse",color:"gray",value:"rev"},
				{caption:"Rename",color:"#804000",value:"rename"}
			];
			for(var i=0; i<selectDefinition.length; i++){
				var def=selectDefinition[i];
				var opt=$n("option");
					opt.value=def.value;
					opt.innerHTML=def.caption;
					opt.style.color=def.color;
					if(def.value==this.mark){
						opt.selected=true;
						modeSelect.style.color=def.color;
					}
					modeSelect.appendChild(opt);				
			}
			modeSelect.addEventListener("change",function(){self.marker(this.value);},false);
			div2.appendChild(modeSelect);
			if(this.playlist.videos.length>0){
				var count=$n("span");
					count.className="font10";
					count.style.verticalAlign="middle";
					count.style.marginLeft="7px";
					count.style.padding="2px 3px 1px 3px";
					count.style.border="solid 1px #888";
					count.style.fontWeight="bold";
					count.style.backgroundColor="white";
					count.innerHTML=this.playlist.videos.length+" items";
				div2.appendChild(count);
			}

			var changerDiv=$n("div");
				changerDiv.style.margin="0px 10px 0px 0px";
				changerDiv.style.padding="0px";
				changerDiv.style.cssFloat="right";
			this.id.appendChild(changerDiv);

			var listSelect=$n("select");
			var playlist_all=PlayList.all();
				playlist_all.push("new","delete","duplicate","rename","move up","move down");
			for(var i=0; i<playlist_all.length; i++){
				var opt=$n("option");
					opt.value=(i<PlayList.all().length)? playlist_all[i]:"_"+playlist_all[i];
					opt.innerHTML=unescape(playlist_all[i]);
					if(playlist_all[i]==this.playlist.id){
						var selectValue=opt.value;
						opt.selected=true;
					}
					switch(opt.value){
						case "_new":opt.style.color="green"; break;
						case "_delete":opt.style.color="red"; break;
						case "_duplicate":opt.style.color="#886BFD"; break;
						case "_rename":opt.style.color="#804000"; break;
						case "_move up":opt.style.color="blue"; break;
						case "_move down":opt.style.color="blue"; break;
					}
					listSelect.appendChild(opt);				
			}
			listSelect.addEventListener("change",function(){
				self.pin=(typeof DEBUG=="undefined")? false:true;
				var ret,value=this.value,id=unescape(self.playlist.id),indicate="Please enter playlist name to ";
				this.value=selectValue;
				if(value=="_new"){
					this.style.color="green";
					var title=location.href.match(URL.MYLIST)? document.getElementsByTagName("h1")[0].innerHTML:"playlist ("+(PlayList.all().length+1)+")";
					ret=prompt(indicate+"make it.",title);
					(!ret||ret==null||ret=="")? self.update():self.change(escape(ret));
				}
				else if(value=="_delete"){
					this.style.color="red";
					ret=confirm("Do you want to delete \""+id+"\"?");
					if(ret){
						PlayList.del(self.playlist.id);
						self.change(PlayList.all()[0]? PlayList.all()[0]:"default");
					}
					else self.update();
				}
				else if(value=="_duplicate"||value=="_rename"){
					var val=value.slice(1);
					this.style.color=(val=="duplicate")? "#886BFD":"#804000";
					ret=prompt(indicate+val+" it.",id+" copy");
					if(!ret||ret==null||ret==""||(val=="rename"&&ret==id)) self.update();
					else if(PlayList.checker(escape(ret))){
						var c=confirm("\""+ret+"\" already exists.\n\tDo you want to replace it?");
						c? self[val](escape(ret)):self.update();
					}
					else self[val](escape(ret));
				}
				else if(value=="_move up"||value=="_move down"){
					var list=PlayList.all();
					for(var i=0; i<list.length; i++){
						if(list[i]==self.playlist.id){
							if(value=="_move up"&&i>0){
								list.splice(i-1,0,self.playlist.id);
								list.splice(i+1,1);
							}
							else if(value=="_move down"&&i<list.length-1){
								list.splice(i+2,0,self.playlist.id);
								list.splice(i,1);
							}
							GM_setValue("playlist.all",list.join(","));
							break;
						}
					}
					self.update();
				}
				else self.change(value);
			},false);
			changerDiv.appendChild(listSelect);
			if(listSelect.offsetWidth>200) listSelect.style.width="200px";

			var buttons=$n("div");
				buttons.id="buttons";
				var empty=(this.playlist.videos.length==0);
			var btnDef=[
				{caption:"add",title:"動画を追加",click:function(e){
					var div=self.openContext(e,"addform");
						div.style.textAlign="right";

					var p=$n("p");
						p.style.textAlign="center";
						p.style.margin=p.style.padding="0px";
						p.style.marginBottom="2px";
						p.innerHTML="add";
					div.appendChild(p);
					var hr=$n("hr");
					div.appendChild(hr);

					var form=$n("form");
					div.appendChild(form);
					var inputDef=[
						{caption:"id",title:""},
						{caption:"title",title:"指定しない場合はidが設定されます。"},
						{caption:"option",title:"オプションは \",\" で区切って下さい。"}
					];
					for(var i=0; i<inputDef.length; i++){
						var def=inputDef[i];
						var list=$n("li");
							list.style.listStyleType="none";
							list.style.marginBottom="2px";
						form.appendChild(list);
						var span=$n("span");
							span.style.fontWeight="bold";
							span.innerHTML=def.caption+" :";
						list.appendChild(span);
						var input=$n("input");
							input.id="add_input_"+def.caption;
							input.className="add_input";
							input.type="text";
							input.value="";
							input.title=def.title;
							input.style.marginLeft="7px";
							input.style.border="1px solid black";
							input.style.padding="3px";
							input.style.fontWeight="bold";
						list.appendChild(input);
					}
					$("add_input_id").focus();

					var error=$n("span");
						error.style.color="red";
						error.style.fontWeight="bold";
						error.style.fontSize="small";
						error.innerHTML="(* Error )";
						error.style.cssFloat="left";
						error.style.margin=error.style.padding="0px";
					form.appendChild(error);
					var ok=$n("input");
						ok.type="submit";
						ok.value="OK";
						ok.className="_submit";
						ok.style.cssFloat="right";
					form.appendChild(ok);
					var cancel=$n("input");
						cancel.type="button";
						cancel.value="Cancel";
						cancel.className="_submit";
						cancel.style.cssFloat="right";
						cancel.addEventListener("click",function(){self.closeContext(div);},false);
					form.appendChild(cancel);
					form.addEventListener("submit",function(e){
						e.preventDefault();
						e.stopPropagation();
						var x=$x("//input[@class='add_input']");
						for(var i=0; i<x.length; i++) x[i].style.borderColor="black";

						var m,title=$("add_input_title").value,opt=$("add_input_option").value;
						if(m=$("add_input_id").value.match(/[a-z]*\d+/)){
							if(opt=="") opt=[];
							else{
								opt=opt.split(",");
								for(var i=0; i<opt.length; i++) if(!opt[i].match(/^(?:eco|com|fs|cache|pause|vol=(?:\d{1,2}|100))$/)) return $("add_input_option").style.borderColor="red";
							}
							self.pushVideo(m[0],(title=="")? m[0]:title,opt);
							self.closeContext(div);
						}
						else $("add_input_id").style.borderColor="red";
						return false;
					},true);
				}},
				{caption:"add this",title:"この動画を追加",click:function(){
					self.pushThisVideo();
				},unset:!watchPage},
				{caption:"add marked",title:"マークした動画を追加",click:function(){
					self.pushMarkedVideos();
				},unset:watchPage},
				{caption:"add all",title:"ページ内の動画を追加",click:function(){self.pushAllVideos();}},
				{caption:"next",title:"再生",click:function(){
					this.disabled="disabled";
					if(typeof player!="undefined") player.hide();
					self.playNext();
				},disabled:empty},
				{caption:"clear",title:"全て削除",click:function(){self.clear();},disabled:empty},
				{caption:"undo",title:"戻る",click:function(){
					self.track(true);
				},disabled:this.buffer.n==this.buffer.playlist.length||this.buffer.playlist.length==0},
				{caption:"redo",title:"進む",click:function(){
					self.track(false);
				},disabled:this.buffer.n==0},
				{caption:"copy",title:"プレイリスト内の動画をコピー",click:function(){
					self.merge=[];
					for(var i=0; i<self.playlist.videos.length; i++) self.merge.push(self.playlist.videos[i]);
					this.nextSibling.disabled=false;
					this.blur();
				},disabled:empty},
				{caption:"merge",title:"コピーした動画を追加",click:function(){
					self.pushVideos(self.merge);
				},disabled:!this.merge[0]},
				{caption:"update",title:"更新",click:function(){self.change(GM_getValue("current"));}}
			];
			for(var i=0; i<btnDef.length; i++){
				var def=btnDef[i];
				if(def.unset) continue;
				var btn=$n("input");
					btn.type="button";
					btn.value=def.caption;
					btn.title=def.title;
					btn.className="_submit";
					btn.style.padding="1px";
					if(def.click) btn.addEventListener("click",def.click,false);
					if(def.disabled) btn.disabled="disabled";
				buttons.appendChild(btn);
			}
			this.id.appendChild(buttons);

			var listbox=$n("div");
				listbox.id="listbox";
			this.id.appendChild(listbox);
			var list=$n("ul");
				list.className="font12";
			for(var i=0,len=this.playlist.videos.length; i<len; i++){
				var v=this.playlist.videos[i];
				var item=$n("li");
					if(v.opt.indexOf("pause")>-1&&i<len-1) item.style.borderBottom="1px solid black";

				var linkDef=[
					{caption:"del",title:"左クリック:削除,右クリック:範囲削除",color:"red",click:function(index){
						self.remove(index);
					},context:function(index,e){
						self.remove(index,e.type);
					}},
					{caption:"move",title:"移動",color:"blue",click:function(index){self.move(index);}},
					{caption:"rev",title:"反転",color:"gray",click:function(index){self.reverse(index);}},
					{caption:"rename",title:"リネーム",color:"#804000",click:function(index){
						var ret=prompt("Please enter new video title.",self.playlist.videos[index].title);
						if(ret){
							self.playlist.videos[index].title=ret;
							self.playlist.save();
						}
						self.update();
					}}
				];
				for(var n=0; n<linkDef.length; n++){
					var def=linkDef[n];
					var a=$n("a");
						a.href="javascript:void(0);";
						a.innerHTML="\u2756";
						a.title=def.title;
						a.className=def.caption;
						a.style.color=def.color;
						a.style.display=(self.mark==def.caption)? "inline":"none";
						if(def.click) a.addEventListener("click",(function(f,index){
							return function(){f(index);};
						})(def.click,i),false);
						if(def.context) a.addEventListener("contextmenu",(function(f,index){
							return function(e){
								e.preventDefault();
								e.stopPropagation();
								f(index,e);
							};
						})(def.context,i),true);
					item.appendChild(a);
				}

				var anchor=$n("a");
					anchor.href=v.getPlayUri();
					anchor.innerHTML=v.title;
					anchor.className="watch noadd";
					if(v.opt.length>0) anchor.className+=" opt";
					anchor.style.marginLeft="5px";
					anchor.style.textDecoration="none";
					anchor.addEventListener("mouseover",(function(index){
						return function(){
							var data=["eco","com","fs","cache","pause"];
							for(var j=0; j<data.length; j++) if(self.playlist.videos[index].opt.indexOf(data[j])>-1) $("playlist_check_"+data[j]).nextSibling.style.color="red";
							if(self.playlist.videos[index].opt.join(",").match(/vol=(?:\d{1,2}|100)/)) $("playlist_check_vol").nextSibling.style.color="red";
						};
					})(i),false);
					anchor.addEventListener("mouseout",function(){
						var x=$x("//input[contains(normalize-space(@id),'playlist_check_')]");
						for(var j=0; j<x.length; j++) x[j].nextSibling.style.color="black";
					},false);
				item.appendChild(anchor);
				if(v.title.indexOf(v.id)>-1||v.title.slice(-3)=="..."){
					anchor.title="titleを取得";
					anchor.className+=" fetch";
					anchor.style.color="#A1FE9E";
					anchor.addEventListener("click",(function(index){
						return function(e){
							e.preventDefault();
							self.fetch(index);
						};
					})(i),false);
				}
				anchor.addEventListener("contextmenu",(function(index){
					return function(e){
						e.preventDefault();
						var div=self.openContext(e,"linkmenu");

						for(var i=0; i<self.menuitems.length; i++){
							var def=self.menuitems[i];
							var list=$n("li");
								list.style.listStyleType="none";
								list.style.marginBottom="2px";
							div.appendChild(list);
							var a=$n("a");
								a.className="font12";
								a.href="javascript:void(0);";
								a.innerHTML=def.caption;
								a.style.textDecoration="none";
								a.style.fontWeight="bold";
								a.style.color="black";
								if(def.title) a.title=def.title;
								a.addEventListener("mousedown",(function(func){
									return function(){
										var video=self.playlist.videos[index];
										func.call(null,index,video.id,video.title,video.opt);
									};
								})(def.func),true);
							list.appendChild(a);
						}
					};
				})(i),false);
				list.appendChild(item);
			}

			var checkboxes=$n("div");
				checkboxes.id="checkboxes";
				checkboxes.className="font10";
			var checkDef=[
				{caption:"Eco",title:"強制エコノミー",init:"eco",click:function(){
					self._state("eco",this.checked);
				},checked:this.eco},
				{caption:"Com",title:"コメント非表示",init:"com",click:function(){
					self._state("com",this.checked);
				},checked:this.com},
				{caption:"Vol",title:"音量",init:"vol",click:function(){
					self._state("vol",this.checked);
				},checked:this.vol},
				{caption:"Fit",title:"フルスクリーン",init:"fs",click:function(){
					self._state("fs",this.checked);
				},checked:this.fs},
				{caption:"Ran",title:"ランダム",init:"random",click:function(){
					self._state("random",this.checked);
				},checked:this.random},
				{caption:"Loop",title:"ループ",init:"loop",click:function(){
					self._state("loop",this.checked);
				},checked:this.loop},
				{caption:"Cache",title:"キャッシュ削除",init:"cache",click:function(){
					self._state("cache",this.checked);
					if(player) player.state("cache",this.checked);
				},checked:this.cache,unset:!w.NicoCache},
				{caption:"Pause",title:"連続再生の停止",init:"pause",click:function(){
					self.state("pause",this.checked);
				},checked:this.pause},
				{caption:"Pick",title:"リンク抽出",init:"pick",click:function(){
					self.pick=this.checked;
				},checked:this.pick}
			];
			for(var i=0, len=checkDef.length; i<len; i++){
				var def=checkDef[i];
				if(def.unset) continue;
				var chk=$n("input");
					chk.id="playlist_check_"+def.init;
					chk.type="checkbox";
				if(def.click) chk.addEventListener("click",def.click,false);
				if(def.disabled) chk.disabled="disabled";
				if(def.checked) chk.checked="checked";
				checkboxes.appendChild(chk);
				var label=$n("label");
					label.htmlFor=chk.id;
					label.innerHTML=def.caption;
				checkboxes.appendChild(label);
				chk.title=label.title=def.title;

				if(watchPage&&def.init=="vol"){
					var vol=$n("span");
						vol.className="font12";
						vol.innerHTML="\u266A";
						vol.title="音量を設定";
						vol.style.cursor="pointer";
						vol.addEventListener("click",function(){
							if(player.get("Volume")!=false){
								self._state("vl",player.get("Volume"));
								player.driven.vol=true;
								setTimeout(function(){vol.style.color="black";},2000);
								this.style.color="red";
							}
						},true);
					checkboxes.appendChild(vol);
				}
			}
			this.id.appendChild(checkboxes);
			listbox.appendChild(list);
			if(listScrollTop>0) list.scrollTop=listScrollTop;			
			if(callback&&typeof callback=="function") callback();
		}
	};

var Player=function(){this.initialize.apply(this,arguments);};
	Player.prototype={
		initialize:function(){
			this.node=$("flvplayer");
			this.driven={id:controller.playlist.id,vol:controller.vol,vl:controller.vl};
			
			var opt=arguments[0],data=["com","fs","cache","pause"];
			for(var i=0; i<data.length; i++){
				this.driven[data[i]]=(opt&&opt.indexOf(data[i])>-1)? !controller[data[i]]:controller[data[i]];
			}
			var m;
			if(opt&&(m=opt.join(",").match(/vol=(\d{1,2}|100)/))){
				this.driven.vol=true;
				this.driven.vl=m[1]*1;
			}

			var self=this;
			w.addEventListener("beforeunload",function(){
				self.hide();
				if(w.NicoCache&&controller.continuity&&self.driven.cache) self.clearCache();
			},true);
			(function(){
				var insert=function(){
					Nico.player={
						set:function(e,arg){$("flvplayer")["ext_set"+e](arg);},
						get:function(e){
							var p=$("flvplayer");
							return (p&&typeof p["ext_get"+e]=="function")? p["ext_get"+e]():false;
						}
					};
				};
				var script=document.createElement("script");
				script.type="text/javascript";
				script.innerHTML=insert.toSource()+"();";
				document.getElementsByTagName("head")[0].appendChild(script);
			})();
			if(controller.extend||controller.continuity) this.ready(arguments[1]);
		},
		ready:function(){
			var self=this;
			var timer=setInterval(function(){
				if(self.get("LoadedRatio")>0&&self.get("PlayheadTime")>=0){
					clearInterval(timer);
					if(controller.continuity){
						if(self.driven.vol){
							self.defaultVol=self.get("Volume");
							self.set("Volume",(typeof self.driven.vl=="number")? self.driven.vl:self.defaultVol);
						}
						if(self.driven.com) self.set("CommentVisible",false);
						if(self.driven.fs) self.set("VideoSize","fit");
						self.observe();
					}
					if(controller.scroll!="184") self.scroll(controller.scroll);
					if(!controller.auto) setTimeout(function(){self.node.ext_play(1);},controller.delay);
				}
		    },1000);
//			if(controller.rc>0) this.trap(arguments[0]);
		},
		observe:function(){
			var self=this;
			var timer=setInterval(function(){
				if(self.driven.pause||controller.pause) return;
				else if(self.get("Status")=="end"&&controller.playlist.id==self.driven.id){
					clearInterval(timer);
					if(controller.playlist.videos.length>0){
						self.hide();
						controller.playNext();
					}
				}
			},1000);
		},
		state:function(e,state){if(controller.playlist.id==this.driven.id) this.driven[e]=state;},
		set:function(e,arg){w.Nico.player.set(e,arg);},
		get:function(e){return w.Nico.player.get(e);},
		trap:function(data){
			var self=this,rc=data[0]*1+1;
			var timer=setInterval(function(){
				if(self.get("PlayheadTime")>0) clearInterval(timer);
				else if(rc<=controller.rc&&self.get("Status")=="paused"){
					clearInterval(timer);
					window.name+=" rc:"+rc;
					if(!!data[1]) window.name+=" continuity:\""+data[1]+"\"";
					if(!!data[2]) window.name+=" vo:\""+data[2]+"\"";
					self.reload();
				}
		    },1000);
		},
		reload:function(){
			this.hide();
			if(w.NicoCache){
				this.driven.cache=false;
				var id=w.Video.id;
				Util.xhr(URL.CACHE+"ajax_rmtmp?"+id,Util.xhr(URL.CACHE+"ajax_rmtmp?"+id+"low"));
			}
			location.reload(true);
		},
		hide:function(){
			if(this.driven.vol&&this.defaultVol&&this.get("Volume")!=false){
				if(this.get("Status")=="playing") this.node.ext_play(0);
				this.set("Volume",this.defaultVol);
			}
			this.node.style.display="none";
			if(w.playerMaximized) w.toggleMaximizePlayer();
		},
		scroll:function(e){
			var target=$x("//div[@id='video_controls']/../..")[0];
			scrollBy(0,Util.getElementPosition(target).top-document.documentElement.scrollTop-e);
		},
		clearCache:function(f){
			var next=f? f:function(){},v=w.Video;
			var p=(v.isDeleted||v.isMymemory||w.so.variables.noDeflistAdd||w.gm_CacheProtect)? true:false;
			if(!p) Util.xhr(URL.CACHE+"rm?"+v.id,next());
			else if(w.gm_removeEconomy) Util.xhr(URL.CACHE+"ajax_rm?"+v.id+"low",Util.xhr(URL.CACHE+"ajax_rmtmp?"+v.id+"low",next()));
		}
	};

var continuity,rc,vo,login=GM_getValue("login",false);
if(login&&location.href.indexOf("login_form")>-1){
	login=setInterval(function(){
		if($("login")&&$("mail").value!=""&&$("password").value!=""){
			clearInterval(login);
			$("login").submit();
		}
    },1000);
}
else if(login&&$x("//a[contains(normalize-space(@href),'login_form?')]")[0]){
	location.replace($x("//a[contains(normalize-space(@href),'login_form?')]")[0].href);
}
else{
	if(rc=window.name.match(/ rc:(\d)/)){
		rc=rc[1];
		window.name=window.name.replace(/ rc:\d/,"");
	}
	if(continuity=window.name.match(/ continuity:"(.*?)"/)){
		continuity=continuity[1];
		window.name=window.name.replace(/ continuity:".*?"/,"");
	}
	if(vo=window.name.match(/ opt:"(.+?)"/)){
		vo=vo[1];
		window.name=window.name.replace(/ opt:".+?"/,"");
	}

	(function(){
		var playlistStyle=[
			"#playlistController{position:fixed; top:40px; border:1px solid #CCC; z-index:100; overflow:auto;}",
			"#playlistController .font12,div.playlistContext .font12{font-size:12px; line-height:1.375;}",
			"#playlistController .font10,div.playlistContext .font10{font-size:10px; line-height:1.25;}",
			"#playlistController a.watch{font-weight:bold; text-decoration:none !important;}",
			"#playlistController a.watch:link{color:#666F6F;}",
			"#playlistController a.watch:visited{color:#363F3F;}",
			"#playlistController a.watch:hover,#playlistController a.watch:active{color:#FFF; background:#666F6F;}",
			"#playlistController a.watch.noadd.opt:after{content:' #'; font-weight:bold; color:#E2B9ED;}",
			"#playlistController a.watch.noadd.fetch{color:#A1FE9E !important;}",
			"#playlistController a.watch.noadd.fetch:hover,#playlistController a.watch.noadd.fetch:active{background:none;}",
			"#playlistController a.del,a.move,#playlistController a.rev,#playlistController a.rename{margin-left:5px; text-decoration:none; outline:none; font-weight:bold; font-family:\"ヒラギノ角ゴ Pro W3\",\"メイリオ\",\"ＭＳ Ｐゴシック\",sans-serif;}",
			"#playlistController input{font-size:12px; line-height:1;}",
			"#playlistController input._submit{background:#CCC url(http://res.nimg.jp/img/btn/bg_submit_01.gif) repeat-x; font-size:12px; border-color:#CCC #999 #666; border-style:solid; border-width:1px; margin:0px; padding:2px 4px;}",
			"#playlistController p.playlist-header{margin:2px 10px 0px 10px; font-size:15px; font-weight:bold;}",
			"#playlistController select{border:1px solid #888; font-weight:bold;}",
			"#playlistController #buttons{margin:0px 10px 4px 10px; padding:3px 0px 0px 0px; color:#000000; clear:both;}",
			"#playlistController #listbox{margin:0px 10px; padding:0px; border:1px solid #999; height:200px; background-color:#FFF;}",
			"#playlistController #listbox ul{margin:0px; padding:0px; width:100%; height:100%; list-style-type:none; overflow:auto;}",
			"#playlistController #listbox ul li{padding:2px 5px 2px 0px; white-space:nowrap;}",
			"#playlistController #checkboxes{margin:5px 8px 6px 0px; text-align:right; float:#right;}",
			"#playlistController #checkboxes input{margin-top:0px; vertical-align:middle;}",
			"#playlistController #checkboxes label{margin-left:-2px; margin-right:2px; border:none; vertical-align:middle; font-weight:bold;}",
			"div.playlistContext{position:fixed; padding:5px; border:1px solid #CCC; z-index:110;}",
			"div.playlistContext input._submit{background:#CCC url(http://res.nimg.jp/img/btn/bg_submit_01.gif) repeat-x; font-size:12px; border-color:#CCC #999 #666; border-style:solid; border-width:1px;}"
		];
		var altStyle=[];
		if(chPage||comPage) altStyle=[
			"#playlistController .playlist-header{padding:3px 0px;}",
			"#playlistController input[type=\"checkbox\"]{margin-left:4px !important;}",
			"#playlistController label{margin-left:2px !important;}"
		];
		else if(dicPage) altStyle=[
			"#playlistController .playlist-header{padding:3px 0px;}",
			"#playlistController p,#playlistController li{text-align:left;}"
		];
		for(var i=0; i<altStyle.length; i++) playlistStyle.push(altStyle[i]);
		GM_addStyle(playlistStyle.join("\n"));
	})();
	
	var playlist=new PlayList(continuity? continuity:GM_getValue("current","default"));
	var controller=new PlayListController(playlist,!!continuity);
	if(watchPage&&$("flvplayer")){
		var player=new Player(vo? vo.split(","):null,[rc? rc:0,continuity,vo]);
		w.toggleMaximizePlayer=function(){
			if(w.playerMaximized){
				w.restorePlayer();
				controller.id.style.display="";
			}
			else{
				controller.id.style.display="none";
				w.maximizePlayer();
			}
			w.playerMaximized=!w.playerMaximized;
		};
	}

	w.Nico.Playlist=w.gm_playlistController={
		status:function(){return !!continuity;},
		getName:function(){return unescape(controller.playlist.id);},
		pushVideo:function(video,title,opt){
			switch(typeof opt){
				case "array":break;
				case "string":opt=opt.split(","); break;
			}
			setTimeout(function(){controller.pushVideo(video,title,opt);},0);
		},
		unshiftVideo:function(video,title,opt){
			switch(typeof opt){
				case "array":break;
				case "string":opt=opt.split(","); break;
				default:opt=null;
			}
			setTimeout(function(){controller.unshiftVideo(video,title,opt);},0);
		},
		pushVideos:function(videos){setTimeout(function(){controller.pushVideos(videos);},0);},
		addLocationParam:function(obj){
			var lp=[];
			for(var i in obj) lp.push(i+"="+obj[i]);
			for(var i=0; i<lp.length; i++) if(controller.lp.indexOf(lp[i])==-1) controller.lp.push(lp[i]);
		},
		addContextMenu:function(label,caption,func,title){
			if(label==""||caption==""||typeof func!="function") return;
			var flag,data={label:label,caption:caption,func:func,title:title||null};
			for(var i=0; i<controller.menuitems.length; i++){
				if(controller.menuitems[i].label==label){
					controller.menuitems.splice(i,1,data);
					flag=true;
					break;
				}
			}
			if(!flag) controller.menuitems.push(data);
		},
		toggleCheckbox:function(e,opt){
			var id="playlist_check_"+e,check=(typeof opt=="undefined")? !$(id).checked:!!opt;
			controller[e]=$(id).checked=check;
			if(player&&e=="cache") player.state(e,check);
		},
		hidePlayer:function(scroll){
			if(player) player.hide();
			if(typeof scroll=="number") scrollTo(0,scroll);
		}
	};

	if(w.$key){
		var keys=[
			{code:78,f:function(){
				if(controller.playlist.videos[0]){
					if(player&&player.node) player.hide();
					setTimeout(function(){controller.playNext();},0);
				}
			},mod:"shift"},
			{code:80,f:function(){w.Nico.Playlist.toggleCheckbox("pause");}},
			{code:82,f:function(){
				if(player.node) player.hide();
				if(controller.continuity) window.name+=" continuity:\""+controller.playlist.id+"\"";
				location.reload(true);
			},mod:"shift"},
			{code:90,f:function(){
				if(controller.pin) return;
				else if(controller.id.style.left=="0px"){
					controller.id.style.left=4-controller.width+"px";
					if(player&&player.get("VideoSize")=="fit") controller.id.style.display="none";
				}
				else{
					controller.id.style.left="0px";
					if(player&&player.get("VideoSize")=="fit") controller.id.style.display="";
				}
			}}
		];
		w.$key.unshift("down",keys);
	}
}
