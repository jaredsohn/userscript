// ==UserScript==
// @name        Asfhy Twitter Plus
// @icon		http://www.asfhy.es/gm_scripts/AsfhyTwitterPlus/ATP_icon.png
// @namespace   asfhy.es
// @description Enhaces Twitter with Inline Media. Adjust the size to the Window width and it inserts in the Timeline the images,videos or other medias allowing to view every media without needing to open it apart.
// @run-at		document-end
// @updateURL	http://www.asfhy.es/gm_scripts/Asfhy_Twitter_Plus.user.js
// @include     http://*.twitter.com/*
// @include     https://*.twitter.com/*
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @version     2.01a
// @grant GM_deleteValue
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_log
// ==/UserScript==

function appendCode(tweet_id,code){
	console.log("appendCode(tweet_id,code);",tweet_id);
	var tweet=null;
	var tweet_ps=null;
	var tweet_p=null;
	var div=null;
	tweet=document.getElementById(tweet_id);
	if(tweet){
		tweet_ps=tweet.getElementsByTagName("p");
		if(tweet_ps!=null && tweet_ps.length>0){
			tweet_p=tweet_ps.item(0);
			div=document.createElement("div");
			div.setAttribute("class","AsfhyTwitterPlusDiv");
			div.innerHTML=code;
			tweet_p.appendChild(div);
		}
	}
};
function appendFrame(tweet_id,frm_uri){
	var tweet=null;
	var tweet_ps=null;
	var tweet_p=null;
	var div=null;
	console.log("appendFrame();",tweet_id,frm_uri);
	tweet=document.getElementById(tweet_id);
	if(tweet){
		tweet_ps=tweet.getElementsByTagName("p");
		if(tweet_ps!=null && tweet_ps.length>0){
			tweet_p=tweet_ps.item(0);
			div=document.createElement("div");
			div.setAttribute("class","AsfhyTwitterPlusDiv");
			div.innerHTML="<iframe frameborder=\"0\" class=\"AsfhyTwitterPlusFrame\" src=\""+frm_uri+"\"></iframe>";
			tweet_p.appendChild(div);
		}
	}
};
function appendImage(tweet_id,img_uri,img_desc){
	var tweet=null;
	var tweet_ps=null;
	var tweet_p=null;
	var div=null;
	console.log("appendImage();",tweet_id,img_uri);
	tweet=document.getElementById(tweet_id);
	if(tweet){
		tweet_ps=tweet.getElementsByTagName("p");
		if(tweet_ps!=null && tweet_ps.length>0){
			tweet_p=tweet_ps.item(0);
			div=document.createElement("div");
			div.setAttribute("class","AsfhyTwitterPlusDiv");
			div.innerHTML="<a href=\""+img_uri+"\" target=\"_blank\"><img class=\"AsfhyTwitterPlusImage\" src=\""+img_uri+"\" /></a>";
			if(img_desc){
				div.innerHTML=div.innerHTML+"<p>"+img_desc+"</p>";
			}
			tweet_p.appendChild(div);
		}
	}
};
function appendLink(tweet_id,lnk_uri){
	var tweet=null;
	var tweet_ps=null;
	var tweet_p=null;
	var div=null;
	tweet=document.getElementById(tweet_id);
	if(tweet){
		tweet_ps=tweet.getElementsByTagName("p");
		if(tweet_ps!=null && tweet_ps.length>0){
			tweet_p=tweet_ps.item(0);
			div=document.createElement("div");
			div.setAttribute("class","AsfhyTwitterPlusDiv");
			div.innerHTML="<a href=\""+lnk_uri+"\" target=\"_blank\">"+lnk_uri+"</a>";
			tweet_p.appendChild(div);
		}
	}
};
function appendUnknown(tweet_id,unk_uri){
	var func=null;
	var cfg=null;
	func=function(response){
		var cfg=arguments.callee.cfg;
		console.log(cfg.url,response);
		var url=cfg.url;
		if(typeof response.finalUrl!="undefined" && response.finalUrl!=url){
			url=response.finalUrl;
		}
		if(
			response.responseText.indexOf("property=\"og:title\"")>0
			&&
			response.responseText.indexOf("property=\"og:image\"")>0
			&&
			response.responseText.indexOf("property=\"og:description\"")>0
		){
			var findTitle=/\<meta\s+property\=\"og\:title\"\s+content\=\"([^\"]*)\"\s*\/?\>/gim;
			var findImage=/\<meta\s+property\=\"og\:image\"\s+content\=\"([^\"]*)\"\s*\/?\>/gim;
			var findDescription=/\<meta\s+property\=\"og\:description\"\s+content\=\"([^\"]*)\"\s*\/?\>/gim;
			var foundTitle=findTitle.exec(response.responseText);
			var foundImage=findImage.exec(response.responseText);
			var foundDescription=findDescription.exec(response.responseText);
			var title=foundTitle[1];
			var image=foundImage[1];
			var descr=foundDescription[1];
			var code="<div class=\"AsfhyTwitterPlusDiv\"><table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"AsfhyTwitterPlusTable\"><tbody><tr class=\"first\"><td rowspan=\"2\" class=\"Image\"><img src=\""+image+"\" /></td><td class=\"Title\"><a href=\""+url+"\">"+title+"</a></td></tr><tr class=\"second\"><td class=\"Text\">"+descr+"</td></tr></tbody></table></div>";
			appendCode(cfg.tweet_id,code);
		} else if(response && response.responseText && response.responseText.match(/\<title\>([^\<]*)\<\/title\>/gim)) {
			var find=/\<title\>([^\<]*)\<\/title\>/gim;
			var found=find.exec(response.responseText);
			var code="<div class=\"AsfhyTwitterPlusDiv\"><a target=\"_blank\" href=\""+cfg.url+"\">"+found[1]+"</a></div>";
			appendCode(cfg.tweet_id,code);
		} else {
			appendLink(cfg.tweet_id,cfg.url);
		}
	};
	cfg={
		'method':'GET',
		'tweet_id':tweet_id,
		'uri':unk_uri,
		'url':unk_uri,
		'onload':func
	};
	func.cfg=cfg;
	GM_xmlhttpRequest(cfg);
};

function delItem(key){
    var out=null;
	if(typeof localStorage!="undefined"){
		out=localStorage.removeItem(key);
	} else {
		out=sb.GM_deleteValue(key,null);
	}
    return out;
};
function getItem(key,def){
    var out=null;
	if(typeof localStorage!="undefined"){
		out=localStorage.getItem(key);
		if(out==null || typeof out=="undefined"){
			out=def;
		}
	} else {
		out=sb.GM_getValue(key,def);
	}
    return out;
};
function setItem(key,val){
    var out=null;
	if(typeof localStorage!="undefined"){
		out=localStorage.setItem(key,val);
	} else {
        out=sb.GM_setValue(key,val);
	}
    return out;
};

atpservices=[
	{	name:"Direct JPEG Image Link",
		pattern:/\.jp[e]?g\?|\.jp[e]?g$/gim,
		ajax:false,
		cb:function(cfg){
			appendImage(cfg.tweet_id,cfg.url);
		}
	},
	{	name:"Direct GIF Image Link",
		pattern:/\.gif\?|\.gif$/gim,
		ajax:false,
		cb:function(cfg){
			appendImage(cfg.tweet_id,cfg.url);
		}
	},
	{	name:"Direct PNG Image Link",
		pattern:/\.png\?|\.png$/gim,
		ajax:false,
		cb:function(cfg){
			appendImage(cfg.tweet_id,cfg.url);
		}
	},
	{	name:"t.co (Twitter Encoded Links)",
		ajax:true,
		pattern:/http[s]?\:\/\/t\.co\/([^\/]*)/gim,
		cb:function(response,cfg){
			var find=/content\=\"\d+\;URL\=(http[s]?\:\/\/[^\"]*)\"/gim;
			var found=find.exec(response.responseText);
			if(response.finalUrl && response.finalUrl!=cfg.url){
				document.getElementById(cfg.link_id).setAttribute("loading",response.finalUrl);
				document.getElementById(cfg.link_id).setAttribute("href",response.finalUrl);
				atplus.service(document.getElementById(cfg.link_id));
			} else if(found!=null && found.length>1){
				document.getElementById(cfg.link_id).setAttribute("loading",found[1]);
				document.getElementById(cfg.link_id).setAttribute("href",found[1]);
				atplus.service(document.getElementById(cfg.link_id));
			}
		}
	},
	{	name:"ow.ly",
		ajax:true,
		pattern:/http[s]?\:\/\/ow\.ly\/([^\/]*)/gim,
		cb:function(response,cfg){
			var find=/content\=\"\d+\;URL\=(http[s]?\:\/\/[^\"]*)\"/gim;
			var found=find.exec(response.responseText);
			if(response.finalUrl && response.finalUrl!=cfg.url){
				document.getElementById(cfg.link_id).setAttribute("loading",response.finalUrl);
				document.getElementById(cfg.link_id).setAttribute("href",response.finalUrl);
				atplus.service(document.getElementById(cfg.link_id));
			} else if(found!=null && found.length>1){
				document.getElementById(cfg.link_id).setAttribute("loading",found[1]);
				document.getElementById(cfg.link_id).setAttribute("href",found[1]);
				atplus.service(document.getElementById(cfg.link_id));
			}
		}
	},
	{	name:"bit.ly",
		ajax:true,
		pattern:/http[s]?\:\/\/bit\.ly\/([^\/]*)/gim,
		cb:function(response,cfg){
			var find=/content\=\"\d+\;URL\=(http[s]?\:\/\/[^\"]*)\"/gim;
			var found=find.exec(response.responseText);
			if(response.finalUrl && response.finalUrl!=cfg.url){
				document.getElementById(cfg.link_id).setAttribute("loading",response.finalUrl);
				document.getElementById(cfg.link_id).setAttribute("href",response.finalUrl);
				atplus.service(document.getElementById(cfg.link_id));
			} else if(found!=null && found.length>1){
				document.getElementById(cfg.link_id).setAttribute("loading",found[1]);
				document.getElementById(cfg.link_id).setAttribute("href",found[1]);
				atplus.service(document.getElementById(cfg.link_id));
			}
		}
	},
	{	name:"pic.twitter.com",
		ajax:true,
		pattern:/http[s]?\:\/\/pic\.twitter\.com\/([^\/]*)/gim,
		cb:function(response,cfg){
			var find=/content\=\"\d+\;URL\=(http[s]?\:\/\/[^\"]*)\"/gim;
			var found=find.exec(response.responseText);
			if(cfg.finalUrl && cfg.finalUrl!=cfg.url){
				document.getElementById(cfg.link_id).setAttribute("loading",cfg.finalUrl);
				atplus.service(document.getElementById(cfg.link_id));
			} else if(found!=null && found.length>1){
				document.getElementById(cfg.link_id).setAttribute("loading",found[1]);
				atplus.service(document.getElementById(cfg.link_id));
			}
		}
	},
	{	name:"twitter.com/user/status/id/photo/number",
		ajax:true,
		pattern:/(http[s]?\:\/\/twitter\.com\/[^\/]*\/status\/[^\/]*\/photo\/\d*)/gim,
		cb:function(response,cfg){
			var find=/http[s]?\:\/\/pbs\.twimg\.com\/media\/[^\:]*\:large/gim;
			var found=find.exec(response.responseText);
			if(found!=null && found.length>0){
				appendImage(cfg.tweet_id,found[0]);
			}
		}
	},
	{	name:"instagram.com",
		ajax:true,
		pattern:/(http[s]?\:\/\/instagram\.com\/p\/[^\/]*\/)/gim,
		cb:function(response,cfg){
			var find=/\<meta\s+property\=\"og\:image\"\s+content\=\"([^\"]*)\"\s*\/?\>/gim;
			var finddesc=/\<span\s+class\=\"caption\-text\"\s*\>([^\<]*)\<\/span\>/gim;
			var found=find.exec(response.responseText);
			var founddesc=finddesc.exec(response.responseText);
			var desc=null;
			if(founddesc!=null && founddesc.length>0){
				desc=founddesc[1];
			}
			if(found!=null && found.length>0){
				appendImage(cfg.tweet_id,found[1],desc);
			}
		}
	},
	{	name:"youtu.be",
		ajax:false,
		pattern:/http[s]?\:\/\/youtu\.be\/([^\?\&]*)/gim,
		cb:function(cfg){
			var find=cfg.srv.pattern;
			var found=find.exec(cfg.url);
			var nuri="//www.youtube.com/embed/"+found[1];
			var tid=cfg.tweet_id;
			appendFrame(tid,nuri);
		}
	},
	{	name:"youtube.com",
		ajax:false,
		pattern:/http[s]?\:\/\/www\.youtube\.com\/watch\?v=([\w\d\-_]*)/gim,
		cb:function(cfg){
			var find=cfg.srv.pattern;
			var found=find.exec(cfg.url);
			var vid=found[1].replace(/feature/gim,"");
			var nuri="//www.youtube.com/embed/"+vid;
			var tid=cfg.tweet_id;
			appendFrame(tid,nuri);
		}
	},
	{
		name:"full.twitpic.com",
		ajax:true,
		pattern:/http[s]?\:\/\/twitpic\.com\/([^\/]*)\/full$/gim,
		cb:function(response,cfg){
			var find=/http[s]?\:\/\/[^\.]*\.cloudfront\.net\/photos\/large\/([^\?\"]*)/gim
			var found=find.exec(response.responseText);
			if(found && found.length>0){
				appendImage(cfg.tweet_id,found[0]);
			}
		}
	},
	{
		name:"twitpic.com",
		ajax:false,
		pattern:/http[s]?\:\/\/twitpic\.com\/([^\/]*)$/gim,
		cb:function(cfg){
			var newuri=cfg.url+"/full";
			var link=document.getElementById(cfg.link_id);
			link.setAttribute("loading",newuri);
			atplus.service(link);
		}
	}
];

atplus={
	style:document.createElement("style"),
	defaultSettings:{
		twitter:{
			container:30,
			dashboard:250,
			tweetbox:205
		},
		video:{
			width:800,
			aspect_x:16,
			aspect_y:9
		}
	},
	settings:{
		twitter:{
			container:getItem("atp.asfhy.es/container",30),
			dashboard:getItem("atp.asfhy.es/dashboard",250),
			tweetbox:getItem("atp.asfhy.es/tweetbox",205)
		},
		video:{
			width:getItem("atp.asfhy.es/video-width",800),
			aspect_x:getItem("atp.asfhy.es/aspect-x",16),
			aspect_y:getItem("atp.asfhy.es/aspect-y",9)
		}
	},
	ui:{
		twitter:{
			style:document.createElement("style"),
			settingsLI:document.createElement("li"),
			settingsA:document.createElement("a"),
			settingsSPAN1:document.createElement("span"),
			settingsSPAN2:document.createElement("span")
		},
		settings:{
			panel:document.createElement("table"),
			div:document.createElement("div"),
			save:document.createElement("button"),
			cancel:document.createElement("button"),
			defaults:document.createElement("button"),
			dashboard:document.createElement("input"),
			container:document.createElement("input"),
			video:document.createElement("input"),
			aspect:document.createElement("select")
		}
	}
};
atplus.init=function(){
	atplus.ui.twitter.style.setAttribute("type","text/css");
	atplus.ui.twitter.style.setAttribute("id","AsfhyTwitterPlusStyle");
	atplus.styleUpdate();
	atplus.ui.twitter.settingsLI.setAttribute("class","profile");
	atplus.ui.twitter.settingsLI.setAttribute("data-global-action","ATPSettings");
	atplus.ui.twitter.settingsA.setAttribute("id","ATPSettings");
	atplus.ui.twitter.settingsA.setAttribute("class","js-nav");
	atplus.ui.twitter.settingsA.setAttribute("data-nav","ATPSettings");
	atplus.ui.twitter.settingsA.setAttribute("data-component-term","atp-settings");
	atplus.ui.twitter.settingsA.setAttribute("title","ATP Settings");
	atplus.ui.twitter.settingsA.setAttribute("href","#");
	atplus.ui.twitter.settingsA.onclick=function(event){
		atplus.ui.settings.panel.style.display="table";
		event.cancelBubble=true;
		if(event.stopPropagation){event.stopPropagation();}
		return false;
	};
	atplus.ui.twitter.settingsSPAN1.setAttribute("class","new-wrapper");
	atplus.ui.twitter.settingsSPAN1.innerHTML="<i class=\"nav-me\"></i><i class=\"nav-new\"></i>";
	atplus.ui.twitter.settingsSPAN2.setAttribute("class","text");
	atplus.ui.twitter.settingsSPAN2.innerHTML="ATP Settings";

	atplus.ui.twitter.settingsLI.appendChild(atplus.ui.twitter.settingsA);
	atplus.ui.twitter.settingsA.appendChild(atplus.ui.twitter.settingsSPAN1);
	atplus.ui.twitter.settingsA.appendChild(atplus.ui.twitter.settingsSPAN2);
	
	atplus.ui.settings.panel.style.position="fixed";
	atplus.ui.settings.panel.style.left="0px";
	atplus.ui.settings.panel.style.top="0px";
	atplus.ui.settings.panel.style.width="100%";
	atplus.ui.settings.panel.style.height="100%";
	atplus.ui.settings.panel.style.zIndex="8192";
	atplus.ui.settings.panel.style.background="rgba(0,0,0,0.5)";
	atplus.ui.settings.panel.style.display="none";
	var tbody=document.createElement("tbody");
	atplus.ui.settings.panel.appendChild(tbody);
	var tr=document.createElement("tr");
	tbody.appendChild(tr);
	var td=document.createElement("td");
	td.style.textAlign="center";
	td.style.verticalAlign="middle";
	tr.appendChild(td);
	atplus.ui.settings.div.style.background="rgba(255,255,255,1.0)";
	atplus.ui.settings.div.style.display="inline-block";
	atplus.ui.settings.div.style.width="700px";
	atplus.ui.settings.div.style.height="400px";
	td.appendChild(atplus.ui.settings.div);
	var d=document.createElement("div");
	d.style.width="100%";
	d.style.height="100%";
	d.style.margin="0px";
	d.style.padding="0px";
	d.style.border="0px none transparent";
	d.style.position="relative";
	atplus.ui.settings.div.appendChild(d);
	
	var func=function(){
		var obj=atplus.settingsObject();
		atplus.styleUpdate(obj);
	};
	
	atplus.ui.settings.cancel.style.position="absolute";
	atplus.ui.settings.cancel.style.right="5px";
	atplus.ui.settings.cancel.style.bottom="5px";
	atplus.ui.settings.cancel.innerHTML="Cancel";
	atplus.ui.settings.cancel.onclick=function(){
		atplus.ui.settings.panel.style.display="none";
	};
	d.appendChild(atplus.ui.settings.cancel);
	
	atplus.ui.settings.save.style.position="absolute";
	atplus.ui.settings.save.style.left="5px";
	atplus.ui.settings.save.style.bottom="5px";
	atplus.ui.settings.save.innerHTML="Save Settings";
	atplus.ui.settings.save.onclick=function(){
		var obj=atplus.settingsObject();
		console.log("Saving settings:",obj);
		atplus.styleUpdate(obj);
		setItem("atp.asfhy.es/container",obj.twitter.container);
		setItem("atp.asfhy.es/dashboard",obj.twitter.dashboard);
		setItem("atp.asfhy.es/tweetbox",obj.twitter.tweetbox);
		setItem("atp.asfhy.es/video-width",obj.video.width);
		setItem("atp.asfhy.es/aspect-x",obj.video.aspect_x);
		setItem("atp.asfhy.es/aspect-y",obj.video.aspect_y);
		atplus.ui.settings.panel.style.display="none";
	};
	d.appendChild(atplus.ui.settings.save);
	
	atplus.ui.settings.dashboard.setAttribute("type","range");
	atplus.ui.settings.dashboard.setAttribute("min","250");
	atplus.ui.settings.dashboard.setAttribute("max","900");
	atplus.ui.settings.dashboard.setAttribute("step","5");
	atplus.ui.settings.dashboard.style.width="500px";
	atplus.ui.settings.dashboard.value=atplus.settings.twitter.dashboard;
	atplus.ui.settings.dashboard.onchange=func;
	atplus.ui.settings.dashboard.onmouseup=func;
	atplus.ui.settings.dashboard.onkeyup=func;
	d.appendChild(document.createTextNode("Dashboard Width:"));
	d.appendChild(atplus.ui.settings.dashboard);
	d.appendChild(document.createElement("br"));
	
	atplus.ui.settings.container.setAttribute("type","range");
	atplus.ui.settings.container.setAttribute("min","30");
	atplus.ui.settings.container.setAttribute("max","830");
	atplus.ui.settings.container.setAttribute("step","2");
	atplus.ui.settings.container.style.width="500px";
	atplus.ui.settings.container.value=atplus.settings.twitter.container;
	atplus.ui.settings.container.onchange=func;
	atplus.ui.settings.container.onmouseup=func;
	atplus.ui.settings.container.onkeyup=func;
	d.appendChild(document.createTextNode("Container Margins:"));
	d.appendChild(atplus.ui.settings.container);
	d.appendChild(document.createElement("br"));
	
	atplus.ui.settings.video.setAttribute("type","range");
	atplus.ui.settings.video.setAttribute("min","400");
	atplus.ui.settings.video.setAttribute("max","1920");
	atplus.ui.settings.video.setAttribute("step","2");
	atplus.ui.settings.video.style.width="500px";
	atplus.ui.settings.video.value=atplus.settings.video.width;
	atplus.ui.settings.video.onchange=func;
	atplus.ui.settings.video.onmouseup=func;
	atplus.ui.settings.video.onkeyup=func;
	d.appendChild(document.createTextNode("Maximum Video Width:"));
	d.appendChild(atplus.ui.settings.video);
	d.appendChild(document.createElement("br"));
	
	atplus.ui.settings.aspect.innerHTML="<option value'4:3'>4:3</option><option value'16:9'>16:9</option><option value'16:10'>16:10</option>";
	atplus.ui.settings.aspect.value=atplus.settings.video.aspect_x+":"+atplus.settings.video.aspect_y;
	atplus.ui.settings.aspect.onchange=func;
	atplus.ui.settings.aspect.onmouseup=func;
	atplus.ui.settings.aspect.onkeyup=func;
	d.appendChild(document.createTextNode("Video Aspect Ratio:"));
	d.appendChild(atplus.ui.settings.aspect);
	d.appendChild(document.createElement("br"));

	atplus.styleUpdate();
	document.head.appendChild(atplus.ui.twitter.style);
	document.getElementById("global-actions").appendChild(atplus.ui.twitter.settingsLI);
	document.body.appendChild(atplus.ui.settings.panel);
};
atplus.searchLinks=function(tweet){
	var links=tweet.getElementsByTagName("a");
	for(var l=0;l<links.length;l++){
		var lnk=links.item(l);
		if(lnk.getAttribute("class")=="twitter-timeline-link" && !lnk.getAttribute("added")){
			var aux=lnk.innerHTML;
			aux=aux.replace(/\<span class\=\"tco-ellipsis\"\>/gim,"");
			aux=aux.replace(/\<span class\=\"invisible\"\>/gim,"");
			aux=aux.replace(/\<span class\=\"js-display-url\"\>/gim,"");
			aux=aux.replace(/\<\/span\>/gim,"");
			aux=aux.replace(/\&\w*\;/gim,"");
			aux=aux.replace(/…/gim,"");
			if(aux.indexOf("http://")!=0 && aux.indexOf("https://")!=0){
				aux="http://"+aux;
			}
			lnk.setAttribute("href",aux);
			lnk.setAttribute("loading",aux);
			lnk.setAttribute("tweet",tweet.getAttribute("id"));
			lnk.setAttribute("id",tweet.getAttribute("id")+"_link"+l);
			lnk.setAttribute("target","_blank");
			lnk.setAttribute("added","added");
			atplus.service(lnk);
		}
	}
};
atplus.searchTweets=function(){
	var ol=document.getElementById("stream-items-id");
	var lis=ol.getElementsByTagName("li");
	for(var l=0;l<lis.length;l++){
		var li=lis.item(l);
		if(li.getAttribute("data-item-type")=="tweet" && !li.getAttribute("parsed")){
			li.setAttribute("parsed","parsed");
			atplus.searchLinks(li);
		}
	}
};
atplus.service=function(lnk){
	var uri=lnk.getAttribute("loading");
	var found=false;
	for(var s=0;s<atpservices.length;s++){
		var srv=atpservices[s];
		if(uri.match(srv.pattern)){
			//console.log("Service "+srv.name+" found for uri "+uri+".");
			found=true;
			if(srv.ajax){
				var func=function(response){
					var cfg=arguments.callee.cfg;
					if(cfg.srv.cb){
						cfg.srv.cb(response,cfg);
					}
				};
				var cfg={
					method:"GET",
					tweet_id:lnk.getAttribute("tweet"),
					link_id:lnk.getAttribute("id"),
					uri:lnk.getAttribute("loading"),
					url:lnk.getAttribute("loading"),
					srv:srv,
					onload:func
				};
				func.cfg=cfg;
				GM_xmlhttpRequest(cfg);
			} else {
				var cfg={
					tweet_id:lnk.getAttribute("tweet"),
					link_id:lnk.getAttribute("id"),
					uri:lnk.getAttribute("loading"),
					url:lnk.getAttribute("loading"),
					srv:srv
				};
				srv.cb(cfg);
			}
		}
	}
	if(!found){
		//console.log("No Service found for URI "+uri+", so trying to find Facebook properties.");
		appendUnknown(lnk.getAttribute("tweet"),uri);
	}
};
atplus.settingsObject=function(){
	var a=atplus.ui.settings.aspect.value;
	var ax=(/(\d+)\:/gim).exec(a)[1];
	var ay=(/\:(\d+)/gim).exec(a)[1];
	out={
		twitter:{
			container:atplus.ui.settings.container.value,
			dashboard:atplus.ui.settings.dashboard.value,
			tweetbox:atplus.ui.settings.dashboard.value-45
		},
		video:{
			width:atplus.ui.settings.video.value,
			aspect_x:ax,
			aspect_y:ay
		}
	}
	return out;
};
atplus.styleUpdate=function(settings){
	if(!settings){
		settings=atplus.settings;
	}
	var docw=document.body.offsetWidth;
	var cw=docw-settings.twitter.container;
	var dw=settings.twitter.dashboard;
	var tw=(cw-dw)-10;
	var tbw=settings.twitter.tweetbox;
	var vw=parseInt(Math.min(settings.video.width,tw),10);
	var vh=parseInt(Math.round((vw*settings.video.aspect_y)/settings.video.aspect_x),10);
	var css="";
	css+="#page-container{width:"+cw+"px !important;}\n";
    css+="div.global-nav-inner div.container{width:"+cw+"px !important;}\n";
	css+="#timeline{width:"+tw+"px !important;}\n";
	css+="div.module.profile-card.component.profile-header.profile-page-header{width:"+tw+"px !important;}\n";
	css+=".dashboard{width:"+dw+"px !important;}\n";
	css+="#tweet-box-mini-home-profile{width:"+tbw+"px !important;}\n";
	css+="iframe.AsfhyTwitterPlusFrame{width:"+vw+"px;height:"+vh+"px;margin:0px;padding:0px;border:0px none transparent;out:0px none transparent;vertical-align:middle;display:inline-block;}\n";
	css+="div.profile-card{width:100% !important;background-position:50% 50% !important;background-repeat:repeat !important;}\n";
	css+="div.profile-header-inner{width:100% !important;background-position:50% 50% !important;background-repeat:repeat !important;}\n";
	css+="div.profile-header-inner-overlay{width:100% !important;}\n";
	css+="#ATPSettings i.nav-me{background-position:-160px -50px;}\n";
	css+="#ATPSettings:hover i.nav-me{background-position:-160px -80px;}\n";
	css+="div.AsfhyTwitterPlusDiv{padding-top:10px;padding-bottom:10px;padding-left:0px;padding-right:0px;margin:0px;border:0px none transparent;outline:0px none transparent;text-align:center;vertical-align:middle;display:block;}\n";
	css+="img.AsfhyTwitterPlusImage{margin:0px;padding:0px;border:0px none transparent;out:0px none transparent;vertical-align:middle;display:inline-block;max-width:100%;}\n";
	css+="a.AsfhyTwitterPlusLink{border:0px none transparent;outline:0px none transparent;color:inherit;}\n";
	css+="h1.icon.bird-topbar-etched{display:none !important;}\n";
	css+="#close-all-button{right:0px !important;position:relative !important;float:none !important;top:10px !important;}\n";
	css+=".global-nav-inner .container{text-align:right !important;}\n";
	css+=".AsfhyTwitterPlusTable{display:inline-table;border:0px none transparent;margin:0px;padding:0px;width:"+vw+"px;}\n";
	css+=".AsfhyTwitterPlusTable tr.first{border:0px none transparent;margin:0px;padding:0px;height:1ex;}\n";
	css+=".AsfhyTwitterPlusTable tr.second{border:0px none transparent;margin:0px;padding:0px;height:auto;}\n";
	css+=".AsfhyTwitterPlusTable td{border:0px none transparent;margin:0px;padding:0px;font-family:serif;vertical-align:top;}\n";
	css+=".AsfhyTwitterPlusTable .Image{max-width:"+(vw/2)+"px;width:5%;text-align:center;vertical-align:top;padding-right:20px;}\n";
	css+=".AsfhyTwitterPlusTable .Image img{max-width:"+(vw/2)+"px;vertical-align:middle;}\n";
	css+=".AsfhyTwitterPlusTable .Title{font-weight:bold;font-size:130%;line-height:0.97;text-align:left;vertical-align:top;}\n";
	css+=".AsfhyTwitterPlusTable .Text{text-align:justify;font-size:100%;line-height:0.97;vertical-align:top;padding-top:1ex;vertical-align:top;}\n";
	css+="\n";
	css+="\n";
    atplus.ui.twitter.style.innerHTML=css;
    return css;
};
console.log("atplus",atplus);
window.addEventListener("load",function(){
	atplus.init();
	setInterval(atplus.searchTweets,50);
});
