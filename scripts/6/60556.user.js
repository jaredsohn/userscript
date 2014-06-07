// ==UserScript==
// @name           CouchSurfing Alternative Look
// @namespace      http://www.humbug.in/
// @description    Greasemonkey script to provide an alternative look for CouchSurfing
// @include        http://www.couchsurfing.org/*
// @include        https://www.couchsurfing.org/*
// @version			Oct 25 2009
// ==/UserScript==

/*
	CouchSurfing Alternative Look by Pratik Sinha
	http://www.humbug.in/
*/


if( typeof(GM_addStyle)=='undefined' ){
        GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }}

/*	Function getElementsByClassName developed by Robert Nyman http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

var buttonBarTdSelected = getElementsByClassName("botnav_15");
if (buttonBarTdSelected.length) {
	for ( var i = 0, len = buttonBarTdSelected.length; i < len; ++i ) {
		if ( buttonBarTdSelected[i].parentNode != 	null ) {
			if ( buttonBarTdSelected[i].parentNode.className != 'buttonBar' ) {
				buttonBarTdSelected[i].parentNode.className = 'buttonBar';
				buttonBarTdSelected[i].parentNode.parentNode.parentNode.className = 'buttonTable';
				var tdThirdChild = buttonBarTdSelected[i].parentNode.getElementsByTagName('td')[2];
				tdThirdChild.style.borderLeftStyle = 'solid';
				tdThirdChild.style.borderLeftWidth = '1px';
				tdThirdChild.style.borderLeftColor = '#000';
				var tdLastChild = buttonBarTdSelected[i].parentNode.lastChild;
				buttonBarTdSelected[i].parentNode.removeChild(tdLastChild);
				var tdLastChild = buttonBarTdSelected[i].parentNode.lastChild;
				buttonBarTdSelected[i].parentNode.removeChild(tdLastChild);
				var tdFirstChild = buttonBarTdSelected[i].parentNode.getElementsByTagName('td')[0];
				buttonBarTdSelected[i].parentNode.removeChild(tdFirstChild);
				var tdFirstChild = buttonBarTdSelected[i].parentNode.getElementsByTagName('td')[0];
				buttonBarTdSelected[i].parentNode.removeChild(tdFirstChild);
			}
		}
	}
}
if (window.location.pathname == '/travelers.html') {
	GM_addStyle((<><![CDATA[
			#bodycontent-centered table tbody tr td table tbody tr {
				background: #f7f7f7 !important;
			}
	]]></>).toString());
} else if (window.location.pathname == '/online.html') {
	GM_addStyle((<><![CDATA[
			#bodycontent-centered table tbody tr td table tbody tr {
				background: #f7f7f7 !important;
			}
	]]></>).toString());
} else if (window.location.pathname == '/group_posts_user.html') {
	GM_addStyle((<><![CDATA[
			#bodycontent-centered table tbody tr td table tbody tr {
				background: #f7f7f7 !important;
			}
	]]></>).toString());
} else if (window.location.pathname == '/mapsurf.html') {
	GM_addStyle((<><![CDATA[
			#bodycontent-centered table tbody tr td table tbody tr {
				background: #f7f7f7 !important;
			}
	]]></>).toString());
}

GM_addStyle((<><![CDATA[
		body {
			background: #00A3CC;	//background
		}
		a.profile-image.verified img {
			border: none;
		}
		#ddm li.selected_item div.item_center {
			background: #696968;	//hover menu box
		}
		#ddm li.selected_item div.item_left {
			border-left:1px solid #FFFFFF;
			background: #696968;	//hover menu box
		}
		#ddm li.selected_item div.item_right {
			border-right:1px solid #FFFFFF;
			background: #696968;	//hover menu box
		}
		#ddm li.item:hover div.item_center, #ddm li.sfhover div.item_center {
			background: #696968;	//hover menu box
		}
		#ddm li.item:hover div.item_right, #ddm li.sfhover div.item_right {
			border-right:1px solid #FFFFFF;
			background: #696968;	//hover menu box
		}
		#ddm li.item:hover div.item_left, #ddm li.sfhover div.item_left {
			border-left:1px solid #FFFFFF;
			background: #696968;	//hover menu box
		}
		#ddm div.box {
			background: #696968;	//hover menu box
		}
		#ddm li.item:hover div.box, #ddm li.sfhover div.box {
			background: #696968;	//hover menu box
		}
		#ddm a.subsub_subitem:hover {
			//background: #ccff50;
			background: #eee;
		}
		#ddm ul li ul li {
			padding: 2px 0;
		}
		#ddm ul li ul li ul li {
			padding: 1px 0;
		}
		#ddm ul li ul li a:hover {
			//background: #ccff50;
			background: #eee;
			color: #333;
		}
		#ddm a.item_link {
			color: #f7f7f7;
		}
		#ddm div.box a.subitem {
			color: #f7f7f7;
		}
		#ddm div.box a:hover.subitem {
			color: #333;
		}
		#ddm a.subitem_dark {
			background-image: none;
			color: #f7f7f7;
		}
		
		div.verif-banner.level-0 span.left {
			background: none;
		}
		div.verif-banner.level-0 span.icon {
			background: none;
		}
		div.verif-banner.level-0 span.center {
			background: none;
		}
		div.verif-banner.level-1 span.left {
			background: none;
		}
		div.verif-banner.level-1 span.center {
			background: none;
		}
		div.verif-banner.level-1 span.icon {
			background: none;
		}
		div.verif-banner.level-1 a:hover span.icon {
			background: none;
		}
		div.verif-banner.level-2 span.left {
			background: none;
		}
		div.verif-banner.level-2 span.center {
			background: none;
		}
		div.verif-banner.level-2 span.splitter {
			background: none;
		}
		div.verif-banner.level-2 span.right {
			background: none;
		}
		div.verif-banner.level-2 span.icon {
			background: none;
		}
		div.verif-banner.level-3 span.left {
			background: none;
		}
		div.verif-banner.level-3 span.center {
			background: none;
		}
		div.verif-banner.level-3 span.splitter {
			background: none;
		}
		div.verif-banner.level-3 span.right {
			background: none;
		}
		div.verif-banner.level-3 span.icon {
			background: none;
		}
		div.verif-banner.level-3 a:hover span.icon {
			background: none;
		}
		div.verif-banner span p {
			border-bottom: 1px #000 dashed;
			padding-bottom: 3px;
		}
		

		#bodycontent {
			background: #00A3CC;	//background
		}
		.main-container {
			background: #fff;
			padding: 4px;
		}
		.msgRow1 {
			background: #ffffff !important;
			valign: middle;
		}
		.msgRow2 {
			background: #f4f4f4 !important;
			valign: middle;
		}
		div.header_bottom {
			background: #eee;
		}
		.ddmwrap {
			background: #AFAFAF;
		}
		#header_nav_left {
			background: #AFAFAF;
			margin-left: 2px;
		}
		#topsubnav a.sub_nav_item:hover {
			background: #f7f7f7;
		}
		#topsubnav a.sub_nav_item {
			color: #333;
		}
		.verification_link a:hover{
			background: #fff;
		}
		.verification_link a {
			background: #fff;
		}
		.headerbox {
			background: #666 !important;
		}
		#iamnot a {
			color: #f6d87d;
		}
		.botnav {
			background: #00A3CC;	//background
			color: #f7f7f7;
			border-color: #f7f7f7;
		}
		a.topnav {
			color: #f7f7f7;
		}
		#bottomline {
			background: #00A3CC;	//background
			color: #f7f7f7;
		}
		table#footer {
			border-color: #f7f7f7;
		}
		.generalbox h2 {
			//background: #ccff50;
			background: #d9ffb3;
		}
		h2.classicbox {
			//background: #ccff50;
			background: none !important;
		}
		.personalbox h2 {
			background: none !important;
			border-bottom: 1px solid #000;
		}
		.messagebox h2 {
			background: #4499dd !important;
		}
		h2.personal2 {
			background: #4499dd;
		}
		h2.profile {
			background: #fff;
			margin: 8px 0 4px 0 !important;
		}
		.friends {
			background: #f7f7f7;
		}
		.formtable .form_bg01 {
			//background: #69c55b;
			font-family: Arial, sans-serif;
			background: none;
			padding: 0;
			padding-top: 8px;
			padding-right: 5px;
			font-weight: bold;
		}
		.formtable .form_bg02 {
			//background: #ccff50;
			font-family: Arial, sans-serif;
			background: none;
			padding: 0;
			padding-top: 8px;
			padding-right: 5px;
			font-weight: bold;
		}
		.lightblue {
			font-family: Arial, sans-serif;
			background: none !important;
			padding: 0;
			padding-top: 8px;
			padding-right: 5px;
			font-weight: bold;
		}
		.lightgreen {
			font-family: Arial, sans-serif;
			background: none !important;
			padding: 0;
			padding-top: 8px;
			padding-right: 5px;
			font-weight: bold;
		}
		.pending_friends {
			background: #ccc;
		}
		.main-container table tbody tr {
		}
		.blackborder {
			background: #f7f7f7;
		}
		.botnav_15_selected {
			background: #fff;
			color: #111;
		}
		.botnav_15_selected a {
			color: #111;
		}
		.botnav_15 {
			background: #f0f0f0;
		}
		.botnav_15 a {
			color: #111;
		}
		.show_channel_info {
			background: #d9ffb3;
		}
		.channel-paging-button.channelbox, .channel-title-box.channelbox {
			background: #d9ffb3;
		}
		.channel-paging-button.classicbox, .channel-title-box.classicbox {
			background: #ccff50;
		}
		.channel-title-box {
			background: #4499dd;
		}
		.channel-paging-button.bluebox, .channel-title-box.bluebox {
			background: #4499dd;
		}
		.highlight_bg {
			background: #f7f7f7;
		}
		div.thread {
			background: #fafafa;
		}
		div.thread div.title {
			background: #FAE1D6;
		}
		div.thread div.meta {
			background: #f7f7f7;
		}
		div.thread div.userthumb {
			background: #EAF0F6;
		}
		.std_bg {
			background: #ffffff;
		}
		.alt_bg {
			background: #f4f4f4;
		}
]]></>).toString());
