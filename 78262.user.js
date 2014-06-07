// ==UserScript==
// @name           GaiaOnline - Search Notification
// @namespace      http://userscripts.org/users/126924
// @description    Notifies you when a new topic or post matches some search criteria.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var oldThreads = {};
var newThreads = {};
var oldPosts = {};
var newPosts = {};

var searchstring = GM_getValue("searchstring","");
var showposts = GM_getValue("showposts",false);

temp = GM_getValue("oldthreads");
if( temp != undefined )
	oldThreads = JSON.parse(temp);
temp = GM_getValue("newthreads");
if( temp != undefined )
	newThreads = JSON.parse(temp);
	
temp = GM_getValue("oldposts");
if( temp != undefined )
	oldPosts = JSON.parse(temp);
temp = GM_getValue("newposts");
if( temp != undefined )
	newPosts = JSON.parse(temp);
// updateInterval = GM_getValue("updateInterval",2);

// now = new Date();
// nextUpdate = new Date();
// nextUpdate.setMinutes((Math.floor(now.getMinutes()/updateInterval)+1)*updateInterval);
// nextUpdate.setSeconds(0);

function doSearch(str){
	$.post(
		"http://www.gaiaonline.com/gsearch/forums",
		{	query: str,
			category: "forums",
			form_state: "true",
			guild_category: "-1",
			forum_type: "0",
			forum_sort: "recent",
			author: "",
			'forum_app[]': ["forumtopics","forumposts"],
			forum: "public"
		},
		function(data){
			tempThreads = $.extend({},newThreads);
			tempPosts = $.extend({},newPosts);
			newThreads = {};
			newPosts = {};
			$(".has_results:not(.posts) .title a",data).each(function(i){
				if( oldThreads[this.href] == undefined ){
					newThreads[this.href] = this.innerHTML;
				}
			});
			$(".has_results.posts .post_content",data).each(function(i){
				text = $.trim($(this).text()).replace(/(\n)/g," / ");
				text = text.slice(0,Math.min(27,text.length-10)) + "...";
				href = $(this).children("a").get(0).href;
				if( oldPosts[href] == undefined ){
					newPosts[href] = text;
				}
			});
			$.each(tempThreads,function(k,v){
				if( newThreads[k] == undefined ){
					oldThreads[k] = v;
				}
			});
			$.each(tempPosts,function(k,v){
				if( newPosts[k] == undefined ){
					oldPosts[k] = v;
				}
			});
			GM_setValue("oldthreads",JSON.stringify(oldThreads));
			GM_setValue("newthreads",JSON.stringify(newThreads));
			GM_setValue("oldposts",JSON.stringify(oldPosts));
			GM_setValue("newposts",JSON.stringify(newPosts));
			updateBox();
		}
	);
}

function assocLength(arr){
	len = 0;
	for( var i in arr )
		len++;
	return len;
}
	
function check(){
	doSearch(searchstring);
	// setTimeout(check,updateInterval*60*1000);
}

// set up notification box
var notificationMaster = document.createElement("div");
var notificationBox = document.createElement("div");
var notificationTab = document.createElement("div");
var notificationBix = document.createElement("div");
notificationBox.appendChild(notificationTab);
notificationBox.appendChild(notificationBix);
notificationMaster.appendChild(notificationBox);
document.body.appendChild(notificationMaster);

nms = notificationMaster.style;
nbs = notificationBox.style;
nts = notificationTab.style;
nis = notificationBix.style;

nms.position = "fixed";
nms.bottom = "0px";
nms.right = "0px";
nms.zIndex = "1000";

nbs.position = "relative";

nis.clear = "both";
nis.width = "250px";
nis.height = "200px";
nis.border = "1px solid gainsboro";
nis.background = "cornsilk";
nis.display = "none";
nis.overflow = "auto";

nts.cssFloat = "right"
nts.width = "50px";
nts.height = "25px";
nts.border = "1px solid gainsboro";
nts.background = "cornsilk";
nts.textAlign = "center";
nts.fontSize = "13px";
nts.paddingTop = "3px";

$(notificationTab).click(function(){
	$(notificationBix).slideToggle();
});
// /notification box setup

function relegateThread(key){
	oldThreads[key] = newThreads[key];
	delete newThreads[key];
	GM_setValue("oldthreads",JSON.stringify(oldThreads));
	GM_setValue("newthreads",JSON.stringify(newThreads));
	updateBox();
}

function relegatePost(key){
	oldPosts[key] = newPosts[key];
	delete newPosts[key];
	GM_setValue("oldposts",JSON.stringify(oldPosts));
	GM_setValue("newposts",JSON.stringify(newPosts));
	updateBox();
}

function updateBox(){
	//notificationBix.id = "notifierbix";
	notificationBix.innerHTML = "";
	notificationTab.innerHTML = "T"+assocLength(newThreads)+" P"+assocLength(newPosts)+"";
	
	thrdl = document.createElement("span");
	postl = document.createElement("span");
	thrdl.innerHTML = "Threads";
	postl.innerHTML = "Posts";

	$(thrdl).click(function(){
		$(postl).css({textDecoration:"none",color:"#333333"});
		$(thrdl).css({textDecoration:"underline",color:"#000000"});
		$("#notifier_threads").css({display:"block"});
		$("#notifier_posts").css({display:"none"});
		GM_setValue("showposts",false);
		showposts = false;
	});
	
	$(postl).click(function(){
		$(thrdl).css({textDecoration:"none",color:"#333333"});
		$(postl).css({textDecoration:"underline",color:"#000000"});
		$("#notifier_posts").css({display:"block"});
		$("#notifier_threads").css({display:"none"});
		GM_setValue("showposts",true);
		showposts = true;
	});
	
	notificationBix.appendChild(thrdl);
	notificationBix.appendChild(postl);
	
	tablec = document.createElement("div");
	table = document.createElement("table");
	tablec.id = "notifier_threads";
	table.style.border = "1px solid grey";
	$.each(newThreads,function(v,k){
		row = document.createElement("tr");
		row.style.borderBottom = "1px solid grey";
		box = document.createElement("td");
		box.style.borderRight = "1px solid grey";
		box.style.padding = "2px";
		close = document.createElement("span");
		close.innerHTML = "[X]";
		close.addEventListener("click",function(){relegateThread(v)},false);
		box.appendChild(close);
		row.appendChild(box);
		box = document.createElement("td");
		box.style.padding = "2px";
		link = document.createElement("a");
		link.href = v;
		link.innerHTML = k;
		box.appendChild(link);
		$(row).mouseover(function(){$(this).css("background","white");});
		$(row).mouseout(function(){$(this).css("background","none");});
		row.appendChild(box);
		table.appendChild(row);
	});
	tablec.appendChild(table);
	$(table).find("a").css({textDecoration:"none",color:"#448FC1"});

	notificationBix.appendChild(tablec);
	
	tablec = document.createElement("div");
	table = document.createElement("table");
	tablec.id = "notifier_posts";
	table.style.border = "1px solid grey";
	$.each(newPosts,function(v,k){
		row = document.createElement("tr");
		row.style.borderBottom = "1px solid grey";
		box = document.createElement("td");
		box.style.borderRight = "1px solid grey";
		box.style.padding = "2px";
		close = document.createElement("span");
		close.innerHTML = "[X]";
		close.addEventListener("click",function(){relegatePost(v)},false);
		box.appendChild(close);
		row.appendChild(box);
		box = document.createElement("td");
		box.style.padding = "2px";
		link = document.createElement("a");
		link.href = v;
		link.innerHTML = k;
		box.appendChild(link);
		$(row).mouseover(function(){$(this).css("background","white");});
		$(row).mouseout(function(){$(this).css("background","none");});
		row.appendChild(box);
		table.appendChild(row);
	});
	tablec.appendChild(table);
	$(table).find("a").css({textDecoration:"none",color:"#448FC1"});
	
	notificationBix.appendChild(tablec);
	
	if(showposts){
		$(thrdl).css({textDecoration:"none",color:"#333333",margin:"6px"});
		$(postl).css({textDecoration:"underline",color:"#000000",margin:"6px"});
		$("#notifier_posts").css({display:"block"});
		$("#notifier_threads").css({display:"none"});
	}else{
		$(thrdl).css({textDecoration:"underline",color:"#000000",margin:"6px"});
		$(postl).css({textDecoration:"none",color:"#333333",margin:"6px"});
		$("#notifier_posts").css({display:"none"});
		$("#notifier_threads").css({display:"block"});
	}
}

function changeSearchText(){
	newstr = prompt("Please enter the text you would like to search for:",searchstring);
	if( newstr != null ){
		searchstring = newstr;
		GM_setValue("searchstring",searchstring);
	}
}

updateBox();
if( searchstring != "" )
	check();

GM_registerMenuCommand("Change Search Text",changeSearchText);