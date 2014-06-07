// ==UserScript==
// @name			NGA Excel
// @author			风昔
// @description		NGA Excel
// @version			1.0.3
// @match			http://bbs.ngacn.cc/*
// @include			http://bbs.ngacn.cc/*
// @match			http://nga.178.com/*
// @include			http://nga.178.com/*
// @updateURL		http://userscripts.org/scripts/source/179550.meta.js
// @downloadURL		http://userscripts.org/scripts/source/179550.user.js
// @run-at			document-start
// ==/UserScript==


(function(){

	'use strict';
	
	var body0, body1, parent0, title0, status0, style,

	statusMap ={
		none : 'normal',
		normal : 'none',
		clean : 'none'
	}, createDom = function(html) {
		var tmp = document.createElement("div");
		tmp.innerHTML = html;
		return tmp.childNodes[0];
	}, setCookie = function(c_name,value, expire){ 
		var expiredays = expire || 1;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value)
				+ ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	}, getCookie = function(c_name) {
		var cookies = document.cookie.split(';');
		var cookie = '';
		for ( var i = 0; i < cookies.length; i++) {
			cookie = cookies[i].split('=');
			if (cookie[0].replace(/^\s+|\s+$/g, '') == c_name) {
				return (cookie.length <= 1) ? "" : unescape(cookie[1].replace(
						/^\s+|\s+$/g, ''));
			}
		}
		return "";
	}, removeClass = function(dom){
		dom.className = "";	
		for(var i =0; i< dom.children.length;i++){
			removeClass(dom.children[i]);
		}	
		return dom;
	},generate = function(to) {
		var rowCount = -1,
		frame = createDom('<div><div style="position: fixed; top: 0; width:100%; background: url(http://pic3.178.com/2126/21268720/month_1310/77cf4384624dcdc285a52ced7f9d6a2e.PNG) left no-repeat; height: 142px;"></div></div>'),
		threadsTable = createDom('<table style="margin-top: 142px; margin-bottom: 42px; background-color : #fff; font-size: 13px;table-layout: fixed;border-collapse: separate;border-style: none;border-spacing: 0;border-color: gray;width: 100%;"></table>'),
		rootNav = createDom('<a class="nav_link" href="/">NGA</a>'),
		
		newRow = function(ctx){
			var rowDom =document.createElement("tr"),
			rowHTML = '<td width="35px;" style="vertical-align:top; padding: 5px; border: 1px #ccc solid; border-width: 0 1px 1px 0; text-align: center;">' + ( rowCount< 1 ? '' : rowCount ) + '</td>';

			rowCount++;
			
			for(var i = 0; i < ctx.length; i++){
				rowHTML += '<td width="110px;" style="vertical-align:top; padding: 5px; overflow: hidden; border: 1px #ccc solid; border-width: 0 1px 1px 0;"></td>';
			}
			
			rowDom.innerHTML = rowHTML;
			
			rowDom.children[rowDom.children.length-1].removeAttribute("width");
			
			for(var i = 0; i < ctx.length; i++){
				if(typeof ctx[i] == "string"){
					rowDom.children[i+1].textContent = rowDom.children[i+1].innerText = ctx[i];
				}else{
					rowDom.children[i+1].appendChild(ctx[i].cloneNode(true));
				}
			}
			
			threadsTable.appendChild(rowDom);
			
		},getAnchor = function(tb, type){
			
			if(tb instanceof Array){
				tb = tb[0];
			}
			
			var args, scripts = tb.getElementsByTagName("script"),		
			anchor = createDom("<a style='float:right;' href=''>REPLY</a>");
			
			try{
				for(var i = 0; i < scripts.length; i++){
					if(/commonui\.postArg\.proc/.test(scripts[i].innerHTML)){
						args = scripts[i].innerHTML.replace(/^[^(]*\(|\s*/g,"").split(",");
						break;
					}
				}
				
				if(type == 1){
					anchor.setAttribute("href","/post.php?action=reply&_newui&fid="+ args[8] +"&tid=" + args[9]);
				}else{
					anchor.setAttribute("href","/post.php?action=quote&_newui&fid="+ args[8] +"&tid=" + args[9] + "&pid=" + args[10] + "&article="+ args[0]);
				}
			}catch(e){
				return  tb.nextElementSibling ? getAnchor(tb.nextElementSibling, type) : anchor;
			}
			return anchor;
		};	
		
		frame.appendChild(threadsTable);
		
		if(window.location.pathname == "/thread.php"){
			
			var dom=document.getElementById("topicrows"),
			nav0 = document.getElementById("m_pbtntop").getElementsByTagName("a"),
			nav1 = document.createElement("div"),
			topics = dom.children[1].children, ctx;
			
			for(var i = 0; i< nav0.length;i++){
				if(!isNaN(Number(nav0[i].textContent))){
					nav1.appendChild(nav0[i].cloneNode(true));
				}
			}
			
			newRow(["", "", rootNav, nav1]);
			
			newRow(["REPLIES","STARTER", "LAST POST", "THREAD"]);
			
			for ( var i = 0; i < topics.length; i++) {
				ctx= [];
				ctx.push(topics[i].children[0].textContent);
				ctx.push(topics[i].children[2].children[0].textContent);
				ctx.push(topics[i].children[3].children[1].textContent);
				
				var threadCtx = topics[i].children[1].children,
				threadNew = createDom('<div></div>');
				
				for(var j= 0; j < threadCtx.length; j++){
					threadNew.appendChild(removeClass(threadCtx[j].cloneNode(true)));
				}
				
				ctx.push(threadNew);		
				
				newRow(ctx);			
			}

			newRow(["", "", rootNav, nav1]);
			
		} else if(window.location.pathname == "/read.php"){
			
			var nav0 = [],
			nav1 = document.createElement("div"), 		
			navAnchors0 = document.getElementById("m_pbtntop").getElementsByTagName("a"),
			navAnchors1 = document.getElementById("m_nav").getElementsByTagName("a"),
			postTables = (function() {
				var tables = document.getElementsByTagName("table"), res = [], i = 0;
				for (; i < tables.length; i++) {
					if (tables[i].className == "forumbox postbox") {
						res.push(tables[i]);
					}
				}
				return res;
			})(),
			startIndex = Number(postTables[0].getElementsByTagName("tr")[0].getAttribute("id").substr(10));
			
			
			for(var i = 1; i< navAnchors1.length;i++){
				if (navAnchors1[i].className == "nav_link") {
					nav0.push(navAnchors1[i].cloneNode(true));
				}
			}
			
			nav1.appendChild(nav0[nav0.length-1]);			
			
			for(var i = 0; i< navAnchors0.length;i++){
				if(!isNaN(Number(navAnchors0[i].textContent))){
					nav1.appendChild(navAnchors0[i].cloneNode(true));
				}
			}
			
			nav1.appendChild(getAnchor(postTables, 1));
			
			newRow([rootNav,nav0[0],nav1]);
			
			newRow(["AUTHOR","TIME", "CONTENT"]);
			
			for ( var i = startIndex; i < postTables.length + startIndex; i++) {
				try{
					var ctx = [];
	
					ctx.push(document.getElementById("postauthor" + i).textContent);
					ctx.push(document.getElementById("postdate" + i).textContent);				
					ctx.push(document.getElementById("postcontent" + i).cloneNode(true));
					
					ctx[2].appendChild(getAnchor(postTables[i-startIndex]));
					
					newRow(ctx);
				}catch(e){					
				}
			}
			
			newRow([rootNav,nav0[0],nav1]);
			
		} else{
			
			rowCount = 1;
			
			var rowCtx = [],hrefs = document.getElementsByTagName("a");
			
			for(var i =0;i<hrefs.length;i++){
				if(hrefs[i].getAttribute("href").substr(0,7) == "/thread"){
					rowCtx.push(hrefs[i].cloneNode(true));
				}
				if(rowCtx.length == 5){
					newRow(rowCtx);
					rowCtx=[];
				}
			}
			
			if(rowCtx.length > 0){
				newRow(rowCtx);
			}
			
		}
		
		frame.appendChild(createDom('<div style="position: fixed; bottom: 0; width:100%; background: url(http://pic3.178.com/2126/21268720/month_1310/8f0711665fac9e200f742934cf92069b.PNG) left no-repeat; height: 42px;"></div>'));
		
		to.appendChild(frame);
		
	},onStatus = function(status){

		try {
			if (!parent0) {
				body0 = document.getElementById("mmc");
				parent0 = body0.parentNode;
				body1 = document.createElement("div");
				title0 = document.title;
				generate(body1);

				parent0.insertBefore(body1, body0);

			}
		} finally {
			if(style){
				style.parentNode.removeChild(style);
				style = null;
			}
		}
		
		status = status || "none";
		
		if(status != "none"){
			
			body0.style.display= "none";	
			body1.style.display= "inherit";
			parent0.style.backgroundColor = "#fff";
			document.title = "Untitled spreadsheet";
		}else{
			
			body1.style.display= "none";	
			body0.style.display= "inherit";
			parent0.style.backgroundColor = "#ffe";
			document.title = title0;
		}

	};

	//initial	
	if(window.location.pathname != "/thread.php" 
		&& window.location.pathname != "/read.php" 
			&& window.location.pathname != "/" ){
		return;
	}

	document.onkeypress = function(event) {
		
		if(document.readyState != "interactive"
			&& document.readyState != "complete"){
			return;
		}
		
		if (/textarea|select|input/i.test(event.target.nodeName)
				|| /text|password|number|email|url|range|date|month/i.test(event.target.type)) {
			return;
		}
		
		var keycode = event.which || event.keyCode;
		
		if (keycode != 69 && keycode != 101) {
			return;
		}
		
		status0 = statusMap[getCookie("NgaExcelStatus")] || "none";
		
		setCookie("NgaExcelStatus", status0 , 1000);
		
		onStatus(status0);
		
	};

	status0 = getCookie("NgaExcelStatus") || 'none';
	
	if (status0 == "none") {
		return;
	}

		
	if (document.readyState != "interactive"
			&& document.readyState != "complete") {

		document.onreadystatechange = function() {
			if (document.readyState == "interactive"
					|| document.readyState == "complete") {
				setTimeout(function(){
					onStatus(status0);
				}, 55);
				
			}
		};
		
		setTimeout(function() {
			style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = "body{display:none;}";

			document.getElementsByTagName("head")[0].appendChild(style);
			
		}, 50);
	}else{
		onStatus(status0);
	}
	
})();
