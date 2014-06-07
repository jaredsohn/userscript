// ==UserScript==
// @name           Grittr 2.0 - Twitter in Google Reader
// @namespace      martin ruiz
// @description    Grittr 2.0 - Twitter in Google Reader
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// @version            2.0 beta
// @require http://ruizfiles.appspot.com/scripts/TwitterAPI.js
// @require http://ruizfiles.appspot.com/scripts/URLShortener.js
// @require http://ruizfiles.appspot.com/scripts/String.base64encode.js
// ==/UserScript==
GM_log('Starting Grittr');
(function(){
var addEventListener2 = function(target,eventName,handler){
//	var target = this;
	var en="on"+eventName;
	if(target.addEventListener)target.addEventListener(eventName,handler,false);
	else if(target.attachEvent)target.attachEvent(en,handler);
	else{
		var h=target[en];
		target[en]=function(){
			var b=h.apply(this,arguments),f=handler.apply(this,arguments);
			return b==undefined?f:f==undefined?b:f&&b}
	}
}
document.getElementsByClassName = function(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || this;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}	
	}
	return returnElements;
}

GReaderUI = new GReaderUI();
TwitterAPI = new TwitterAPI({
	monitor:true,
	onChangeUser:function(u){GReaderUI.showActiveTwitterUser(u); },//TwitterAPI.friends();
	onUpdateStatus:GReaderUI.updateStatus});

//var USE_AVATARS = true;
var URL_SHORTENER = GM_getValue('URL Shortener','bit.ly');// you can also use '3.ly'

GReaderUI.addMenuItem({title:'Set Avatar Size',callback:function(){modifyOption('Enter Avatar Size (small,medium,large)','Size');}});
GReaderUI.addMenuItem({title:'Set URL Shortener',callback:function(){modifyOption('Enter URL Shortener  (bit.ly,3e.ly)','URL Shortener');}});
GReaderUI.addMenuItem({title:'Multi-user Signature',callback:function(){modifyOption('Enter your Signature (eg ^MR)','Signature');}});
GReaderUI.addMenuItem({title:'Get Followers OMPL',callback:function(){getTweepsOPML('followers');}});
GReaderUI.addMenuItem({title:'Get Friends OMPL',callback:function(){getTweepsOPML('friends');}});
GReaderUI.addMenuItem({title:'Get Started w/some feeds',callback:function(){setupFeeds();}});
GReaderUI.addMenuItem({title:'Share Script on Twitter',callback:shareScript});

/*
registerOption('Grittr: Set Avatar Size','Enter Avatar Size (small,medium,large)','Size');
registerOption('Grittr: Multi-user Signature','Enter your Signature (eg ^MR)','Signature');
registerOption('Grittr: Set URL Shortener','Enter URL Shortener  (bit.ly,3e.ly)','URL Shortener');

GM_registerMenuCommand('Grittr: Get Twitter Followers OPML',function(){getTweepsOPML('followers');});
GM_registerMenuCommand('Grittr: Get Twitter Friends OPML',function(){getTweepsOPML('friends');});
GM_registerMenuCommand('Grittr: Setup some feeds via OPML',function(){setupFeeds();});
GM_registerMenuCommand('Grittr: Share Script on Twitter',shareScript);
*/

function setupFeeds(){
	var GrittrFeeds = {
	'Friends / @{{mytwitterid}}':'{{myfriends}}',
	'RT / @{{mytwitterid}}':'http://pipes.yahoo.com/martinruiz/twitter_rt?Feed={{myfriends-encode}}&amp;_render=rss',
	'Help / @{{mytwitterid}}':'http://pipes.yahoo.com/martinruiz/twitter_help?Feed={{myfriends-encode}}&amp;_render=rss',
	'Links / @{{mytwitterid}}':'http://pipes.yahoo.com/martinruiz/twitter_links?Feed={{myfriends-encode}}&amp;_render=rss',
	'Mentions / @{{mytwitterid}}':'http://search.twitter.com/search.atom?q=@{{mytwitterid}}',
	'#tweet search':'http://search.twitter.com/search.atom?q=%23tweet',
	'Archive / @{{mytwitterid}}':'http://twitter.com/status/user_timeline/{{mytwitterid}}.rss',
	'@oprah timeline':'http://twitter.com/statuses/user_timeline/oprah.rss',
	'Un/Followers / @{{mytwitterid}}':'http://rssfriends.com/followers/{{mytwitterid}}'
	}

	var user = prompt('Enter Twitter User',TwitterAPI.twitterUser);
	if (!user) return;
	var freeFeed = prompt('Enter Your Freed Feed(from freemyfeed.com or feedburner)');
	if (!freeFeed) return;

	var GrittrVars = {
	'{{myfriends}}':freeFeed,
	'{{myfriends-encode}}':encodeURIComponent(freeFeed),
	'{{mytwitterid}}':user
	}
	
	createGrittrOPML();
	
	function createGrittrOPML(){
		var opml = '';
		for (var i in GrittrFeeds){
			var feed = formatFeed(GrittrFeeds[i]);
			var title = formatFeed(i);
			opml += '<outline title="'+title+'" text="'+title+'" type="rss" xmlUrl="'+feed+'" htmlUrl="'+feed+'"/>\n';
		}

		opml = 
		'<?xml version="1.0" encoding="UTF-8" ?>\n' +
		'<opml version="2.0">\n'+
			'<head>\n'+
				'<!-- Generated w/Grittr by Martin Ruiz http://twitter.com/MartinRuiz-->\n'+
				'<!-- Save this OPML file then import into Google Reader -->\n'+
				'<title>Grittr Feeds</title>\n'+
			'</head>\n'+
			'<body>\n'+
				'<outline title="Grittr" text="Grittr">\n'+
				opml+
				'</outline></body></opml>\n';
		GotOPML = true;
		var uri = 'data:application/rss+xml;charset=utf-8';
		var OPML = opml.base64encode();
		uri += ';base64';
		uri += ',' + escape(OPML);

		GM_openInTab(uri);
	}
	
	function formatFeed(feed){
		for (var i in GrittrVars){
			feed = feed.replace(i,GrittrVars[i]);
		}
		return feed;
	}
}

function getTweepsOPML(method){//method = friends or followers
	var user = prompt('Enter Twitter User',TwitterAPI.twitterUser);
	if (!user) return;
	TwitterAPI[method]({twitterUser:user,
		callback:function(f){
			var opml = 
			'<?xml version="1.0" encoding="UTF-8" ?>\n' +
			'<opml version="2.0">\n'+
			'<head>\n'+
				'<!-- Generated w/Grittr by http://twitter.com/MartinRuiz -->\n'+
				'<!-- Save this OPML file then import into Google Reader -->\n'+
				'<!-- Note: '+f.length+" "+method+" were found for @"+user+" -->\n"+
				'<title>'+method+' / @'+user+'</title>\n'+
			'</head>\n'+
			'<body>\n'+
				'<outline title="'+method+' / @'+user+'" text="'+method+' / @'+user+'">\n'+
				newFriendsOMPL()+
				'</outline></body></opml>\n';
			var uri = 'data:application/rss+xml;charset=utf-8';
			var OPML = opml.base64encode();
			uri += ';base64';
			uri += ',' + escape(OPML);
			GM_openInTab(uri);
		
			function newFriendsOMPL() {
				var o = '';
				for (var i in f){
					var name = f[i].name;
					var follower = f[i].screen_name;
					var url = 'http://twitter.com/statuses/user_timeline/'+follower+'.rss';
					var htmlUrl = 'http://twitter.com/'+follower;
					o = o + '<outline title="@'+follower+' ('+name+')" text="@'+follower+' ('+name+')" type="rss" xmlUrl="'+url+'" htmlUrl="'+htmlUrl+'" />\n';
				}
				return o;
			}
		}
	});
}

var currentMessage;

function registerOption(t,p,tag){
	GM_registerMenuCommand(t,function(){modifyOption(p,tag);});
}

function modifyOption(p,tag){
		var v = prompt(p,GM_getValue(tag,''));
		if (v!=null) { GM_setValue(tag,v); window.location.reload(true);}
}

function shareScript(share){
	if (GM_getValue("share") && !share) { return; }
	var send = confirm("Want to share script with your friends?");
	if (send) { TwitterAPI.send("Like Grittr = GReader + Twitter script by @MartinRuiz http://bit.ly/grittr"); }
}

function GrittrMessage(msg){//twitterId,title,shortUrl,longUrl,tweet,sharedLink,action,statusId
	msg = msg || {};
	for (var i in msg){this[i]=msg[i];}
	this.longUrl = msg.url?msg.url:window.top.location;
	this.title = msg.title?msg.title:window.top.document.title;
	this.sig = GM_getValue('Signature',null);
	this.sig = (!this.sig?'':' '+this.sig);
	
	if (this.longUrl){
		this.twitterId = getTweetUserFromUrl(this.longUrl);
		if (this.twitterId){
			this.isTweet = true;
			this.statusId = getTweetIdFromUrl(this.longUrl);
			this.sharedLink = getTweetLink(this.title);
			this.tweet = removeUserInTweet(this.title,this.twitterId);
		}
	}
	
	this.reply = function(){return '@'+this.twitterId+' '+this.sig;}
	this.reTweet = function(){return 'RT @'+ this.twitterId + ': '+ this.tweet+this.sig;}
	this.like = function(){return 'Liked "'+ this.title + '" '+ this.shortUrl+this.sig;}
	this.dm = function() {return 'd '+this.twitterId+ ' '+this.sig;}
	this.follow = function(){return 'follow @'+this.twitterId;}
	this.favorite = function(){return 'fave tweet';}
	this.shareLink = function(){return this.sharedLink+' (via @'+this.twitterId+')'+this.sig;}
	this.share = function(){
		if (this.isTweet){
			return this.sharedLink+' (via @'+this.twitterId+')'+this.sig;
		}else{
			return this.shortUrl+this.sig;
		}
	}

	function suffix(){return msg['user-suffix']?' '+msg['user-suffix']+' ':'';}

	this.setShortUrl = function(shortUrl,longUrl){ this.shortUrl=shortUrl; }

	function getTweetUserFromUrl(url){return search(url,/twitter\.com\/([^\/]+)\/statuses\//);}
	function getTweetIdFromUrl(url){return search(url,/twitter\.com\/[^\/]+\/statuses\/([0-9]+)/);}
	function getTweetLink(title){return search(title,/(https?\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/);}
	
	this.isReply = function(title,user){return search(title,new RegExp("@"+user));}

	this.removeUserInDM = function(tweet,user){return replace(tweet,new RegExp("d "+user+" "));}
	function removeUserInTweet(tweet,user){return replace(tweet,new RegExp(user+": "));}

	this.getTweetUser = getTweetUserFromUrl;
	
	this.log = function(){
		var t = 'Current Message{\n';
		for (var i in this){
			if (typeof(this[i])!="function"){
				t += i+" : "+this[i]+"\n";
			}else{
				if (i!='log'){
					t += i+" : "+this[i]()+'\n';
				}
			}
		}
		t += '}';
		GM_log(t);
	}
	
	function search(txt,re){
		try{
			var results = re.exec(txt);
			return results[1];
		}catch(e){ return ''; }
	}
	
	function replace(txt,re){
		try {//user: message -> message
			txt = txt.replace(re,"");
			return txt;
		} catch(e) { return txt; }
	}
}

var shortenUrl = URLShortener[URL_SHORTENER];

var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){GReaderUI.insertMenu(event.target);},true);

function GReaderUI(){
	this.isReady = false;
	var self = this;
	var mode;
	var status;
	var isTweets = false;
	var currentAction, currentButton;
	var tweetForm,tweetInput,tweetCount;
	var parent,actions;
	var menu;

	menu = document.createElement('div');
	menu.id = "grittr-menu";
	menu.close = function(){ menu.style.visibility = 'hidden'; };
	menu.open = function(){
		var b = document.getElementById("twitter_user");
		if(b){
			menu.style.left=b.offsetLeft+"px";
			menu.style.right="auto";
			menu.style.top="24px";
			menu.style.position='absolute';
			menu.style.visibility='visible';
		}
	}
	menu.toggle = function(){
		if (!menu.style.visibility||menu.style.visibility=='hidden'){
			menu.open();
		}else{ 
			menu.close();
		}
	}
	//
	var multiUserSuffix = GM_getValue('Signature',null);// "^MR";

	// UI Avatar
	var USE_AVATARS = true;
	var GRITTR_SIZE = GM_getValue('Size','small');//small,medium,large;
	var GRITTR_STYLE;//"grittr";
	var Grittr_Size = {
	'small':'grittr',
	'medium':'grittr-24',
	'large':'grittr-48'
	}
	GRITTR_STYLE = Grittr_Size[GRITTR_SIZE];
	var Grittr_Styles = {
	"grittr":{style:".grittr .grittr-avatar {position:absolute;} .grittr .grittr-avatar img {width:16px;height:	16px;border:none;margin-right:1ex;} .grittr .entry-title {margin:0 18px !important;}",size:"mini"},
	"grittr-24":{style:".grittr-24 #entries.list .entry .collapsed {height:3.2ex;line-height:3.3ex;} .grittr-24 .grittr-avatar img {width:24px;height:24px;border:none;margin-right:1ex;} .grittr-24 .entry-title {margin:0 26px !important;}",size:"mini"},
	"grittr-48":{style:".grittr-48 #entries.list .entry .collapsed {height:6.7ex;line-height:6.8ex;} .grittr-48 .grittr-avatar img {width:48px;height:48px;border:none;margin-right:1ex;} .grittr-48 .entry-title {margin:0 50px !important;}",size:"normal"}
	};

	GM_addStyle(Grittr_Styles[GRITTR_STYLE].style);
	GM_addStyle('.grittr-you {background:#F3F5FC !important;}');
	GM_addStyle('.grittr-atyou {background:#FFFFCC !important;}');
	GM_addStyle('#chrome {margin-top:29px;}');

	GM_addStyle('#grittr-menu {border-color:#C9D7F1 #3366CC #3366CC #A2BAE7;border-style:solid;border-width:1px;z-index:1001;-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#FFFFFF none repeat scroll 0 0;left:0;position:absolute;text-align:left;visibility:hidden;}');
	
	this.insertMenu = function(node){
		if (node.tagName!="DIV"){ return; }
		if (node.className==""){ return; }
		try{
				var linkbar;
				var avatar;
				if (node.className=="entry-actions"){
					linkbar=node;
					mode="list";
				}
				else if (node.firstChild && node.firstChild.className ==="card card-common"
			    ||  node.firstChild.className === "ccard-container card-common"){
					linkbar = document.getElementsByClassName("entry-actions", "div", node)[0];
					mode="expanded";
					
					if (USE_AVATARS) {
						avatar=insertAvatar(node,"entry-title-link","entry-title-link","a");
					}

				}
				else{//add icon here
					if (!USE_AVATARS) { return; }
					avatar=insertAvatar(node,"entry-original","entry-title","h2");
					return;}

				initialize(linkbar.firstChild);
				var s = currentMessage.isTweet;
				GM_log("isTweet : "+currentMessage.isTweet);
				
				var img = document.createElement("img");
				img.setAttribute("src","http://assets1.twitter.com/images/favicon.ico");
				linkbar.appendChild(img);

				linkbar.appendChild(createLinkbarButton("Like",function(e){self.tweet(e,'like');}));
				s && linkbar.appendChild(createLinkbarButton("RT",function(e){self.tweet(e,'reTweet');}));
				linkbar.appendChild(createLinkbarButton("Share",function(e){self.tweet(e,'share',true);}));
				s && linkbar.appendChild(createLinkbarButton("@",function(e){self.tweet(e,'reply');}));
				s && linkbar.appendChild(createLinkbarButton("DM",function(e){self.tweet(e,'dm',false,true);}));
				s && linkbar.appendChild(createLinkbarButton("Fave",favorite));
				s && linkbar.appendChild(createLinkbarButton("Follow",follow));

		}catch(e) {}
	}

	function show(event){
		if (mode=="expanded"){
			actions.className = "card-actions";
			tweetForm.className = "action-area card-bottom";
		}else{
			actions.className = "entry read expanded action-area-visible";
			tweetForm.className = "action-area";
		}
		event.target.className = "link email-active";
	}
	
	function hide(event){
		if (mode=="expanded"){
			actions.className = "card-actions card-bottom";
			tweetForm.className="action-area card-bottom hidden";
		}else{
			actions.className = "entry read expanded";
			tweetForm.className="action-area hidden"; 
		}
		currentButton.className = "link"; 
		setTweet('');
	}

	function isOpen() {
		return (mode=="expanded" && tweetForm.className=="action-area card-bottom") || tweetForm.className=="action-area";
	}
	
	function setTweet(t,cursorAtBeginning){
		tweetInput.value = t;
		updateCount();
		tweetInput.focus();
		if (cursorAtBeginning) { tweetInput.setSelectionRange(0,0); }
	}

	function async(action,cursorAtBeginning){
		if (!currentMessage.shortUrl){
			shortenUrl(currentMessage.longUrl,function(s,l){
				currentMessage.setShortUrl(s);
				setTweet(currentMessage[action](),cursorAtBeginning);
			});
			return "shortening url... "+currentMessage.longUrl;
		}
	}
	
	function doAction(action,cursorAtBeginning){
		if ((action=='like')||(action=='share' && !currentMessage.isTweet)){
			return async(action,cursorAtBeginning);
		}
		return currentMessage[action]();
	}
	
	function insertAvatar(node,link_class,position_class,position_type){	
		var l = document.getElementsByClassName(link_class,"a",node)[0];
		var p = document.getElementsByClassName(position_class,position_type,node)[0];
		var tuser = getTweetUser(l.getAttribute('href'));

		if (!tuser) {return false;}

		var title = document.getElementsByClassName("entry-title","h2",node)[0];
		title = title.textContent;

		GM_log(TwitterAPI.twitterUser+'---'+title);
		
		if (tuser==TwitterAPI.twitterUser) { node.firstChild.className += ' grittr-you'; }
		if (isReply(title,TwitterAPI.twitterUser)) { node.firstChild.className += ' grittr-atyou'; }
		if (!isTweets){
			var c = document.getElementById("chrome-viewer");
			if (c) { c.className=GRITTR_STYLE; }
			isTweets=true;
		}
		
		var faviconDiv = document.createElement('div');
		faviconDiv.className = "grittr-avatar";
		faviconDiv.setAttribute('style','position:absolute;');
		faviconDiv.innerHTML='<img src="'+"http://twivatar.org/"+tuser+'/'+Grittr_Styles[GRITTR_STYLE].size+'" title="@'+tuser+'" />';
		p.parentNode.insertBefore(faviconDiv,p);

		function getTweetUser(url){
			try {// twitter.com/USER/statuses/
				var re = /twitter\.com\/([^\/]+)\/statuses\//;
				var user = re.exec(url);
				return user[1];
			} catch(e) { return null; }
		}

		function isReply(title,user){return (title.search(RegExp('@'+user))>-1);}
		
		return true;
	}
	
	function createLinkbarButton(title,callback){
		var rep=document.createElement("span");
		rep.className="link";
		rep.innerHTML='<span> '+title+' </span>|';
		rep.addEventListener("click", callback,false);
		return rep;
	}
			
	function favorite(event){
		initialize(parent);
		if (!currentMessage.isTweet) { return; }
		event.target.className += " item-star-active star";
		TwitterAPI.favorite(currentMessage.statusId);
	}

	function follow(event){
		initialize(parent);
		if (!currentMessage.isTweet) { return; }
		TwitterAPI.follow(currentMessage.twitterId);
	}

	function updateCount(){tweetCount.innerHTML=(140 - tweetInput.value.length);}
	
	function initialize(target){
		if (mode=="expanded"){
			parent= target.parentNode.parentNode.parentNode.parentNode;
			actions = target.parentNode.parentNode.parentNode;
		}else{
			parent= target.parentNode.parentNode.parentNode;
			actions = parent;	  
		}		
		var url = document.getElementsByClassName("entry-title-link","a",parent)[0].getAttribute('href');
		var title = document.getElementsByClassName("entry-title-link","a",parent)[0].firstChild.nodeValue;
		currentMessage = new GrittrMessage({'url':url,'title':title});
		currentMessage.log();
	}
	
	this.tweet = function(event, action, cursorAtBeginning, dm){//dm hack
		var self = this;
		initialize(event.target);

		currentAction = action;
		currentButton = event.target;
		
		var addTweetForm = getTweetForm(parent);
		if (isOpen()) { hide(event); return; }
		show(event);

		var tweet = doAction(action,cursorAtBeginning);//currentMessage[action]();//action(entry);

		//if (multiUserSuffix) {tweet += " "+multiUserSuffix;}

		setTweet(tweet,cursorAtBeginning);
	}
	
	function getTweetForm(parent){
		if (tweetForm) { 
			parent.appendChild(tweetForm);
			return tweetForm; 
		}

		tweetForm = document.createElement("div");
		tweetForm.setAttribute("id", "tweetForm");
		tweetForm.innerHTML = "<div class='email-this-area'> <table class='email-entry-table'> <tbody> <!-- <tr> <td class='field-name'>URL:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='urlinput'></td> </tr> --> <tr> <td colspan='2'><div style='font-weight:bold;' id='notesdesc'><b>Note to go along with the item:</b> (Optional, no more than 140 characters)</div><br> <textarea class='email-this-comment' rows='6' id='notesinput'></textarea> <div class='email-this-buttons' tabindex='-1'> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-send' id='btnSend'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'></div> <div class='goog-button-base-content'> <div class='goog-button-body'>Send</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnCancel'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'></div> <div class='goog-button-base-content'> <div class='goog-button-body'>Cancel</div> </div></div></div></div></div> </div></td></tr></tbody></table> </div>";

		parent.appendChild(tweetForm);

		tweetInput = document.getElementById("notesinput");
		tweetCount = document.getElementById("notesdesc");

		tweetInput.addEventListener('click',function(){tweetInput.focus();},false);
		tweetInput.addEventListener('keyup',function(){updateCount();},true);
		
		btnSend = document.getElementById("btnSend");
		btnCancel = document.getElementById("btnCancel");
		btnSend.addEventListener('click',
			function(event){	
				if (currentAction=='dm') {
				    if (currentMessage.isTweet){
//						var t = removeUserInDM(tweetInput.value,entry.tweetUser);
						var t = currentMessage.removeUserInDM(tweetInput.value,currentMessage.twitterId);
						GM_log("v/t: "+tweetInput.value+" / "+t);
						TwitterAPI.dm(t,currentMessage.twitterId);
					}
				}else{
					TwitterAPI.update(tweetInput.value,currentMessage.statusId);
				}
				hide(event);
			},
			false);

		btnCancel.addEventListener("click", function(){hide(parent);},false);

		return tweetForm;
	}

	this.showActiveTwitterUser = function(user){
		var globalInfo = document.getElementById("global-info");
		var tuser = document.getElementById("twitter_user");
		if (!tuser) { 
			var s = document.createElement("b");
			tuser = document.createElement("a");
			tuser.id = "twitter_user";
			tuser.className = "gb3";
//			tuser.setAttribute('onclick',"this.blur();gbar.ttg(event);return !1;");
			addEventListener2(tuser,'click',function(){menu.toggle();});
			tuser.setAttribute('onclick',"this.blur();return !1;");
			tuser.setAttribute('href',"javascript:void(0);");
			tuser.setAttribute('aria-haspopup','true');
			s.appendChild(tuser);
			globalInfo.insertBefore(document.createTextNode('| '),globalInfo.firstChild	);
			globalInfo.insertBefore(s,globalInfo.firstChild	);
			globalInfo.appendChild(menu);
		}
//		tuser.innerHTML = "<a href='http://twitter.com/"+user+"' target='_blank'><b>@"+user+"</b></a> | ";
		tuser.innerHTML = '<u>@'+user+'</u><small>▼</small>';
	}

	this.addMenuItem = function(options){
		var m = document.createElement('a');
		m.className = 'gb2';
		m.innerHTML=options.title;
		if (options.callback){
			m.href = 'javascript:void(0);';
			addEventListener2(m,'click',function(){menu.close();options.callback();});
		}else{
			addEventListener2(m,'click',menu.close);
			m.target = '_blank';
			m.href = options.href;
		}
		menu.appendChild(m);
		return m;
	}
	
	this.saveSearch = function(event){
		var self = this;
		var sig;
	
		GM_xmlhttpRequest({
    		method: 'GET',
    		url: "http://www.google.com/bookmarks/mark?op=edit&output=popup",
			onload: function(responseDetails){
//				var re = /action\=\/bookmarks\/mark\?sig\=([^"]*)/;
				var re = /name\=sig value\=\"([^"]*)/;
				GM_log(responseDetails.responseText);
				var res = re.exec(responseDetails.responseText);
				if (!res) return;
				sig=res[1];
				GM_log("sig="+sig);
				if (!sig) return;
				save();
			}
		});
		
		function save(){
		var title=prompt("Enter Title for this Search");
		var url = window.location.href;
		
		if (!title) return;
		
		self.addSavedSearch(title,url);
		
		var data = 'sig='+sig+'&bkmk='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)
			+'&labels=Grittr&annotation=';
		GM_xmlhttpRequest({
    		method: 'POST',
    		url: "http://www.google.com/bookmarks/mark",
			data: data,
			onload: function(responseDetails){
//				alert(responseDetails.responseText);
			}
		});
		}
//			data: 'q='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)
//			+'&labels='+labels+'&annotation='+notes
	}
		
	this.addSaveSearchButton = function(){
		var self = this;
		var linksContainer = document.getElementById('search');
   
		GM_log('addSaveSearchButton');

		if (!linksContainer) {
//			window.setTimeout(function() { self.addSaveSearchButton() }, 1000);
			return;
		}

		button=createButton("save search");
		button.addEventListener("click", function() { self.saveSearch() }, false);
		button.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow"></div><div class="goog-button-base-content"><div class="goog-button-body">Save Search</div></div></div></div></div>';

		linksContainer.appendChild(button);

		///////
		button=createButton("save tweet");
		button.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow"></div><div class="goog-button-base-content"><div id="tweet-button" class="goog-button-body">Send Tweet (140)</div></div></div></div></div>';

		linksContainer.appendChild(button);

		var tweet = document.getElementById('tweet-button');
		
		var searchInput = document.getElementById('search-input');
		searchInput.style.display='none';

		grittrInput = document.createElement('textarea');
		searchInput.parentNode.insertBefore(grittrInput,searchInput);
		grittrInput.setAttribute('id','grittr-input');
		grittrInput.setAttribute('rows','1');
		grittrInput.setAttribute('style','border:1px solid #B2B2B2;margin:0;padding:3px 2px;width:200px;float:left;font-family:arial,sans-serif;font-size:95%;height:15px;');
		grittrInput.addEventListener('keyup',
			function(e){ 
				searchInput.value = grittrInput.value;
				tweet.innerHTML='Send Tweet ('+(140 - searchInput.value.length)+')';
				if (searchInput.value.length>22){
					grittrInput.setAttribute('rows','7');
					grittrInput.style.height='auto';
				}else{
					grittrInput.setAttribute('rows','1');
					grittrInput.style.height='15px';
				}
			},
			true);

		button.addEventListener("click", function() { TwitterAPI.update(grittrInput.value); clearInput();}, false);

		///////
		
		var lastTweet = document.createElement('div');
		lastTweet.className = 'goog-inline-block';
		lastTweet.setAttribute('style','overflow: hidden; margin-left: 10px; font-size: 11px; height: 30px; width: 365px;');
		lastTweet.innerHTML = '<strong>Latest:&nbsp;</strong><span id="last-tweet" style="color: rgb(102,102,102);></span>';
		
		linksContainer.appendChild(lastTweet);
		
		status = document.getElementById("last-tweet");
		
		function createButton(title){
			var b=document.createElement('div');
			b.className = "goog-button goog-button-base unselectable goog-inline-block goog-button-float-left";
			b.setAttribute("title",title);
			b.setAttribute("role","wairole:button");
			b.setAttribute("style","margin:0 0 0 4px;");
			return b;
		}
		
		function clearInput(){
			grittrInput.value='';
			searchInput.value='';
			grittrInput.setAttribute('rows','1');
			grittrInput.style.height='15px';
			tweet.innerHTML='Send Tweet (140)';
		}
	}
	
	this.updateStatus = function(s,t){
		GM_log('updateStatus("'+s+'")');
		if (!status){
			window.setTimeout(function() { GReaderUI.updateStatus(s); }, 1000);
		}
		status.innerHTML=s+' '+'<span style="color:#999999;">'+t+'</span>';
	}
	
	this.addSavedSearch = function(title,url,searches){
		var t = title.replace(' ',"_");
		var id = "saved_search_"+t;
		var html = '<div class="toggle sub-toggle toggle-d-1 hidden"></div><a id="'+id+'" href="javascript:void(0);" class="link"><span title="'+title+'"><span class="name-text sub-name-text name-text-d-1">'+title+'</span><span class="unread-count sub-unread-count unread-count-d-1"></span></span></a>'
		
		searches = searches || document.getElementById('searches');
		
		var li = document.createElement('li');
		li.className = "sub unselectable expanded";
		li.innerHTML = html;
		
		searches.appendChild(li);

		document.getElementById(id).addEventListener("click",function(){ //alert(title+" : "+url); 
			var re = /#([^#]*)/;
			var hash = re.exec(url);
			if (!hash) return;
			document.location.hash=hash[1];
		},false);
	}
	
	this.toggleSavedSearches = function(){
		var s = document.getElementById('lhn-searches');
		var minimized = "lhn-section lhn-section-minimized";
		var expanded = "lhn-section";		
		s.className = (s.className==expanded)?minimized:expanded;
	}
	
	this.showSavedSearches = function(){
		var self = this;
		var searchdiv = document.createElement('div');
		searchdiv.className = "lhn-section lhn-section-minimized";
		searchdiv.id = "lhn-searches";
		searchdiv.innerHTML = '<div id="lhn-minimize-searches" class="lhn-button lhn-minimize"  id="lhn-searches-minimize"></div><a class="lhn-section-primary link" href="http://www.google.com/bookmarks/lookup?q=label:Grittr" target="_blank" title="Manage Searches" style="margin-left:10px;font-weight:bold;">Saved Searches</a><div class="scroll-tree-container lhn-section-secondary"><ul class="scroll-tree"><li class="folder unselectable expanded"><ul id="searches"></ul></li></ul></div><div class="lhn-section-footer"><span id="searches-settings-link" class=""><a href="http://www.google.com/bookmarks/lookup?q=label:Grittr" target="_blank" class="link">Manage Saved Searches �</a></span></div>';

//			td.parentNode.insertBefore(x,td.nextSibling);
		
		var subscriptions = document.getElementById("lhn-subscriptions");
//		if (!subscriptions) return;
		subscriptions.parentNode.insertBefore(searchdiv,subscriptions);
//		document.getElementById("lhn-friends").parentNode.appendChild(searchdiv);
		
		document.getElementById("lhn-minimize-searches").addEventListener("click",function() { self.toggleSavedSearches(); },false);
		
//		this.addSavedSearch('Test','http://google.com');

		GM_xmlhttpRequest ({
			method: 'GET',
			url: "http://www.google.com/bookmarks/find?q=label:Grittr&output=xml&num=100000",
			headers: {
				'User-Agent': 'Mozilla/ 4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml',
			},
			onload: function (responseDetails) {
				GM_log(responseDetails.responseText);
				var parser = new DOMParser();
				var xml_tree = parser.parseFromString(responseDetails.responseText,'text/xml');
				var bookmarks = xml_tree.getElementsByTagName("bookmark");
				var searches = []; // list will contain the names as strings of all relevant labels
				for (var j=0; j<bookmarks.length; j++){ // extract the names and put them in the list
					var title = bookmarks[j].childNodes[0].textContent;
					var url = bookmarks[j].childNodes[1].textContent;
					GM_log(title+" : "+url);
					self.addSavedSearch(title,url);
					searches.push({title:title,url:url})
				}
			}
		});
	}
	
	function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}	
	}
	return returnElements;
	}

	self.addSaveSearchButton();
	self.showSavedSearches();

	this.isReady=true;

}
})();