// ==UserScript==
// @name          Mspa Forums Improvements
// @namespace     http://userstyles.org
// @description	  Some basic improvements and polish for the mspa Forums:
// @author        tinaun
// @version       1.0.2.4
// @homepage      http://userscripts.org/scripts/show/161688
// @include       http://mspaforums.com/*
// @include       https://mspaforums.com/*
// @include       http://*.mspaforums.com/*
// @include       https://*.mspaforums.com/*
// @include       http://mspaforums.com/*
// @run-at		  document-start
// ==/UserScript==


function addListener(obj, eventName, listener) {
	if(obj.addEventListener) {
		obj.addEventListener(eventName, listener, false);
	} else {
		obj.attachEvent("on" + eventName, listener);
	}
}

var loadedcss = false;
loadcss = function(){

var heads = document.getElementsByTagName("head");
	if (loadedcss) return;
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
		loadedcss = true;
	} else {
	  console.log('no head!!');
	}
}
var css2 = ".threadstatus { width: 40px !important;} .threadbit .threadtitle { margin: 0 !important; } .threadbit .threadlastpost { padding: 0 0 0 0 !important;} .threadbit .threadstats { padding: 0 0 0 0 !important; min-height: 41px; } .threadbit .pagination a { font-size: 9px !important; } .threadinfo { line-height: 1em !important; } .threadbit .threadinfo { min-height: 30px !important; padding-top: 2px !important; padding-bottom: 2px !important;} .threadbit .threadstatus { background-image:url('http://www.pages.drexel.edu/~mmj29/images/icons/Medium/NoPosts-sm.png') !important; min-height: 30px !important; padding: 0 !important; } .threadbit.dot.new .threadstatus { background-image:url('http://www.pages.drexel.edu/~mmj29/images/icons/Medium/NewPostsWatched-sm.png') !important; }";
css2 += ".threadbit.dot .threadstatus {background-image:url('http://www.pages.drexel.edu/~mmj29/images/icons/Medium/NoPostsWatched-sm.png') !important;} .new .threadstatus {background-image:url('http://www.pages.drexel.edu/~mmj29/images/icons/Medium/NewPosts-sm.png') !important; } .prefix span { color:#000 !important; } .above_body { position: absolute !important;} ";
var css = "";
(function() {
//get stored width
if(localStorage.getItem("page-width")){
	var width = localStorage.getItem("page-width");
} else {
	var width = "1000px";
	localStorage.setItem("page-width", width);
}

//main page
css = ".titlebar{margin-top:-40px!important; padding-top:40px!important;} body {width:auto!important; max-width:" + width + "!important; margin: 0 auto!important;} li.navbithome { margin-top: 2px; } #forums { border: 0px!important; margin-top:4px!important} .forumhead { margin-top: 0px!important; border-top: 1px solid #535353!important; } ol.childforum li:last-child div{ border-bottom: 0px!important; } #footer{background-color: #c6c6c6!important; margin-top:-10px!important; border-bottom:1px solid #535353!important;} .lastposttitle img.avatar {max-width:60px;} .footer a {color:black!important;} .footer a:hover{color:black!important} .footer_links {margin-top:5px!important; font:bold 12px courier, monospace;} .subforum .inlineimg {display:none!important;}";

//forum pages;
css += " .announcements .announcerow {color:black!important; box-shadow:none!important; -moz-box-shadow:none!important; -webkit-box-shadow:none!important; margin-top:1px!important;} .newcontent_textcontrol {box-shadow:none!important; -moz-box-shadow:none!important; -webkit-box-shadow:none!important; border-radius: 7px!important;} .forum_info .blockhead, .forum_info .blockbody, .threadbit, .thread_info h4 , .thread_info .blockbody{box-shadow:none!important; -moz-box-shadow:none!important; -webkit-box-shadow:none!important;} .threadbit .nonsticky, .threadbit .deleted, .threadbit .discussionrow, .threadbit .ignored, .threadbit .sticky{border:0px!important; border-top: 1px solid #535353!important;} .toolsmenu{border:0px!important; width:auto!important; float:right!important; margin: -15px 0px 0px!important;} ";
css += ".threadlisthead { box-shadow:none!important; -moz-box-shadow:none!important; -webkit-box-shadow:none!important; border:0px!important; font:bold 12px courier, monospace!important;}";
css += "img.gotonewpost {float:right!important;}";
css += ".threadbit > div {padding: 0px 0px!important;} .threadbit .alt {background: none!important; border-left: 1px solid #c6c6c6!important; border-right: 1px solid #c6c6c6!important; padding:14px 0px!important;} .threadbit .threadinfo{padding-top:2px;}";
//navbar
css += ".breadcrumb ul{margin-bottom:-5px!important;} .breadcrumb .breadcrumb .navbit > a, .breadcrumb .lastnavbit > span {padding:2px 0px!important; background-color:transparent!important;}";

//posts
css += ".postbit, .postbitlegacy, .eventbit {margin-bottom:0px!important;} .navlinks{margin-top:-10px!important;} .pagination .separator{display:none!important;} .above_postlist .newcontent_textcontrol{margin-top:0px!important;}";
css += ".blockfoot, .blocksubfoot{ background-color:transparent!important; margin-top:-33px!important;}";
css += ".postbitlegacy .userinfo .postuseravatar, .postuseravatar img{padding:0px!important; border:0px!important;} .postbitlegacy .userinfo .postuseravatar img, .eventbit .userinfo .eventuseravatar img{background-color:transparent!important; border:0px!important;}";
css += ".postbit .posthead, .postbitlegacy .posthead, .eventbit .eventhead{font: bold 12px courier, monospace!important; }";
css += "#pagetitle a{color:#ffb529!important; background:none!important; text-decoration:underline!important;} ";
//more posts
css += ".postlist, #postlist{border-top:7px solid #efefef;} .postbit .posthead, .postbitlegacy .posthead, .eventbit .eventhead {background:#707070!important; border: 1px solid #606060!important; font:bold 12px courier, monospace!important;} .toolsmenu ul{background-color: #efefef;} .posts{margin:0px!important} .postbitlegacy .userinfo {width:150px!important; background:none!important;} .postbitlegacy .postbody{border-left: 1px dashed #535353!important; border-bottom: 1px dashed #535353!important; margin-left:170px!important;} .postbitlegacy .userinfo .username_container{margin-top:4px!important;} img.onlinestatus{top:0px!important; left:0px!important; float:right!important;} .postbitlegacy .postdetails{ background: #e6e6e6!important;} .postbitlegacy .userinfo .userinfo_extra{ width:160px!important; } .postbit .postfoot .textcontrols, .postbitlegacy .postfoot .textcontrols, .eventbit .eventfoot .eventcontrols {background: #e6e6e6!important;}";
css += ".postbit .posthead .postdate.old, .postbitlegacy .posthead .postdate.old, .postbit .posthead .postdate.new, .postbitlegacy .posthead .postdate.new {background:none!important; font:bold 12px courier, monospace!important; margin-left: -5px!important;} .postbit .posthead .postdate.old:before, .postbitlegacy .posthead .postdate.old:before{content: '> '!important; color:black!important; font:bold 13px courier, monospace;!important} .postbit .posthead .postdate.new:before, .postbitlegacy .posthead .postdate.new:before{content: '> '!important; color:white!important; font:bold 13px courier, monospace;!important} .postbitlegacy .posthead .time, .postbit .posthead .nodecontrols, .postbitlegacy .posthead .nodecontrols, .eventbit .eventhead .nodecontrols {font:bold 12px courier, monospace!important;}";
css += ".below_postlist{ background: #efefef!important; padding:1px!important; left: 2px!important; margin-top:-36px!important; margin-bottom: 5px!important; border-top:1px solid #606060!important; border-bottom:7px solid #c6c6c6!important;} .below_postlist .pagination_bottom{margin-top:10px!important; margin-bottom: -5px!important;} .noinlinemod.below_postlist .newcontent_textcontrol{top:6px!important; left:6px!important;} ";

//member profiles
css += ".memberaction_body.popupbody{left:9px!important; border-radius:0px!important; -moz-border-radius:0px!important -webkit-border-radius:0px!important;} .popupbody{background: #efefef!important; border:4px solid #c6c6c6!important;} #sidebar_container.member_summary{margin-top:-4px!important; border-radius:0px!important; -moz-border-radius:0px!important -webkit-border-radius:0px!important; box-shadow:none!important; -moz-box-shadow:none!important; -webkit-box-shadow:none!important; border-width:7px!important; border-bottom:0px!important; border-left:0px!important; background: #efefef!important;}  #userprof_content_container{margin-top:-4px!important; border:7px solid #efefef!important; border-right:0px!important; border-bottom:0px!important; background:#c6c6c6!important; padding: 10px!important;}"
css += ".moduleinactive_bg {background-image:none!important;}  #sidebar_container .underblock{height:0px!important; border-bottom:7px solid #c6c6c6!important;} #sidebar_container .blockbody{border-radius:0px!important; -moz-border-radius:0px!important -webkit-border-radius:0px!important; border: 1px dashed #dadada;}"
css += "#usercp_content {min-height: 635px!important; padding-bottom:4em!important; background:#c6c6c6!important; border-top: 7px solid #e6e6e6!important; margin-top:4px!important;} #usercp_content .block{margin-top:9px!important;} #usercp_nav .blockhead {-moz-border-radius: 0px!important; -webkit-border-radius: 0px!important; border-radius: 0px!important; background:#707070!important; border:1px solid #606060!important;} #usercp_nav{ width:190px!important; margin-left:10px!important; margin-top:20px!important;} .blockhead{background:#707070 url(http://www.mspaforums.com/images/buttons/newbtn_middle.png) repeat-x!important; border:1px solid #606060!important;}" 

//misc
css += " #charnav{border:0px!important; border-radius:0px!important; border-top:7px solid #c6c6c6!important; background: #efefef!important;} #charnav dd a{border:0px!important;}"
css += " #headerbutton button{border:0px!important; padding:2px!important; font:13px bold courier,monospace!important;} .top-header-info{margin-left: 14px!important;} img {max-width: 100%!important;}"


if(localStorage.getItem("dragon")){
css = css2;
}
addListener(document, "DOMContentLoaded", loadcss);
window.onload = function(){
  loadcss();
};
/*if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else { */
	


})();

switchheight = "(function(){ console.log('switching!!'); var w = localStorage.getItem('page-width'); if(w==='1000px') {localStorage.setItem('page-width', '2000px');}else{localStorage.setItem('page-width','1000px');} if(localStorage.getItem('dragon')){}else{} window.location.replace(window.location);})()"
toggleHeader = function() {
	var h=document.getElementById('header');
	if(localStorage.getItem("user-bar") === "collapsed") {
		h.style.display='block';
		document.getElementById("headerbutton").firstChild.innerHTML = "<";
		localStorage.setItem("user-bar","expanded");
	} else {
		h.style.display='none';
		document.getElementById("headerbutton").firstChild.innerHTML = ">";
		localStorage.setItem("user-bar","collapsed");
	}
}

createHeaderButton = function () {
	var button = document.createElement("button");
	button.appendChild(document.createTextNode("<"));
	button.title = "show/hide user bar";
	button.onclick = toggleHeader;
	button.style.display = 'block';
	button.style.position = 'absolute';
	button.style.top = "6px";
	button.style.left = "4px";
	button.style.zIndex = "100000";
	var bar = localStorage.getItem("user-bar");
	if(!bar){
		localStorage.setItem("user-bar","expanded");
	} else if ( bar === "collapsed" ){
		document.getElementById('header').style.display = "none";
		button.innerHtml = ">";
	}

	var div = document.createElement("div");
	div.style.height = "0px";
	div.style.position = "relative";
	div.id = "headerbutton";
	div.appendChild(button);
	var parent = document.getElementsByClassName("above_body")[0];
	parent.insertBefore(div, document.getElementById("header"));
}


document.onreadystatechange = function () {
if (document.readyState == "interactive") {
	//fill the "theme selector"
	createHeaderButton();
	var width = localStorage.getItem("page-width");
	var footer = document.getElementById("footer");
	var options = footer.getElementsByTagName("optgroup")[0];
	var select = options.parentNode;
	select.setAttribute("onchange", switchheight);
	var px1000 = document.createElement("option");
	px1000.appendChild(document.createTextNode("1000px"));
	var px2000 = document.createElement("option");
	px2000.appendChild(document.createTextNode("2000px"));
	var pxDragon = document.createElement("option");
	pxDragon.appendChild(document.createTextNode("dragon theme"));
	
	if(width === "1000px"){
		px1000.setAttribute("selected","selected");
	} else {
		px2000.setAttribute("selected","selected");
	}
	
	options.appendChild(px1000);
	options.appendChild(px2000);
	options.appendChild(pxDragon);
	
	
}}
