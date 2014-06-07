// ==UserScript==
// @name           PlurkRiverSearch
// @namespace      http://www.plurk.com/
// @include        http://www.plurk.com/*
// @grant          none
// @author         yellowworm
// @version        1.0.6
// @description    Allows user to search personal plurk timeline (river) and jump to.
// ==/UserScript==

// license        http://creativecommons.org/licenses/by-sa/3.0/tw/

// == History ==
// 2013-05-13 v1.0.6: added greasemonkey @grant values, and fix plurk API reference.
// 2012-07-20 v1.0.5: added perma_link and some modified.
// 2012-05-31 v1.0.4: fixed function 'jumpTimeLine' error which modified from v1.0.2.
// 2012-05-31 v1.0.3: fixed replurk qualifier misdisplay & shown poster image.
// 2012-05-30 v1.0.2: modified the apperence of plurk qualifier.
// 2012-05-25 v1.0.1: fixed progress message bug and new result window apperence.
// 2012-05-21 v1.0: first version.

(RiverSearch = {
	defaultTimeOut : 300,
	timeOut : this.defaultTimeOut,
	pattern : null,
	endDate : null,
	index : 0,
	newWin : false,
	searchBlockIndex : function (t, s, e){
		var b = this.parent.TimeLine.blocks;
		if(s == null || e == null)
		{
			s = 0;
			e = b.length-1;
		}
		var h = s + Math.floor((e - s + 1) / 2);
		
		if(t < b[h].date_start.getTime() && t > b[h].date_end.getTime())
			return h;
		
		if(t < b[h].date_end.getTime())
			return this.searchBlockIndex(t, h+1, e);
		else
			return this.searchBlockIndex(t, s, h-1);
	},
	jumpTimeLine : function (i){
		//reference from plurk
		var l = this.parent.TimeLine;
		var s = this.parent.AJS;
		l.move_disabled = true;
		s.map(l.active_blocks, function (o) {
			o.removeRender()
		});
		l.showLoading();
		l.active_blocks = [];
		var h = 10;
		var a = l.blocks;
		var m = [];
		var j = i+10 > a.length ? a.length : i+10;
		m = a.slice(i, j)
		s.map(m, function (o) {
			l.active_blocks.push(o);
			o.renderBlock(h);
			o.renderPlurks(false, h);
			h += RiverSearch.parent.getBD(o).div_bg.offsetWidth
		});
		l.hideLoading();
		l.move_disabled = false;
		return false
	},
	doSearch : function() {
		var d = RiverSearch;
		var w = d.parent;
		var a = w.AJS;
		var p = w.TimeLine.plurks
		if (d.pattern == null || d.endDate == null)
			return false;

		if (d.parent.TimeLine.getting_plurks == true)
		{
			d.timeOut = (d.timeOut > 45000 ? 45000 : d.timeOut * 2);
			a.setSingleTimeout("RiverSearch.doSearch", d.doSearch, d.timeOut);
			return;
		}
		timeOut = d.defaultTimeOut;
				
		if(p.length == d.index) //no new plurks
		{
			d.toggleStart();
			w.alert("Search finished!");
			return false;
		}
		
		d.updateProgress(p[d.index].posted);
		var r = d.pattern;
		for(var i = d.index;
			d.index < p.length && d.endDate != null;
			d.index++, i = d.index)
		{
			if(p[i].posted.getTime() < d.endDate.getTime())
			{
				d.toggleStart();
				w.alert("Search finished!");
				return false;
			}
			if( p[i].content_raw.search(r) != -1 ||
				p[i].content.search(r) != -1)
			{
				d.renderTable(p[i]);
			}
		}
		d.parent.TimeLine.getPlurks();
		a.setSingleTimeout("RiverSearch.doSearch", d.doSearch, d.timeOut);
		return;
	},
	getSearchPattern : function (){	//deprecate
		var searchText;
		var c = false;
		
		searchText = prompt("Searching Text(regular expression)","");
		
		if(searchText == null) return null;
		
		try
		{
			this.pattern = new RegExp(searchText, "im");
		}
		catch(e)
		{
			c = confirm(
				"Please enter valid javascript regular expression.\n" + 
				"Please refer to \n'http://www.w3schools.com/jsref/jsref_obj_regexp.asp' for more information.\n" +
				"Do you want to re-enter your searching pattern?"
			);
		}
		if(c == true) return this.getSearchPattern();
		
		if(this.pattern)
			return searchText;
		return null;
	},
	getSearchPattern2 : function (){
		var d = this.parent.document;
		var e = d.getElementById("river_query");
		
		try
		{
			this.pattern = new RegExp(e.value, "im");
		}
		catch(e)
		{
			return null;
		}
		return e.value;
	},
	getSearchDuration : function (){
		var d = RiverSearch.parent.document;
		var e = d.getElementById("river_duration");
		var p;
		
		if(e.value == null) return null;
		
		try
		{
			 p = new RegExp("[^\\d]+", "im");
		}
		catch(ee)
		{
			return null;
		}
		var s = e.value.replace(/^\s+/g, "").replace(/\s*$/g, "");
		if(s.search(p) == -1)
			return s;
		
		return null;
	},
	toggleStart : function () {
		var a = RiverSearch;
		var d = a.parent.document;
		
		if (a.endDate == null)
		{
			var eDays = a.getSearchDuration();
			if(eDays == null)
			{
				alert("Searching duration error!");
				return;
			}
			
			var searchText = a.getSearchPattern2();
			if(searchText == null)
			{
				alert("Search syntax error!");
				return;
			}
			
			var e = d.getElementById("river_duration");
			e.disabled = true;
			
			e = d.getElementById("river_query");
			e.disabled = true;
			
			e = d.getElementById("check_newWin");
			e.disabled = true;
			a.newWin = e.checked;
			
			e = d.getElementById("query_submit");
			e.value = "Stop Search";
			
			e = d.getElementById("progress");
			e.style.display = "";
			
			if (a.newWin)
			{
				a.initResultWindow(searchText);
			}
			else
			{
				e = d.getElementById("result_pane");
				e.style.display = "";
				
				e = d.getElementById("result");
				e.innerHTML =
					'<tr><td style="width: 20%">Poster</td>' +
						'<td style="width: 55%">Content</td>' +
						'<td style="width: 25%">Jump to</td>' +
					'</tr>';
			}
			
			var j = a.parent.SiteState.getPageUser().days_joined;
			var m = (eDays > j ? j : eDays);
			a.endDate = new Date(new Date().getTime() - m * 86400000);			
			a.endDate.setHours(0); a.endDate.setMinutes(0);
			a.endDate.setSeconds(0);
			a.doSearch();
		}
		else
		{
			var e = d.getElementById("river_duration");
			e.disabled = false;
			
			e = d.getElementById("river_query");
			e.disabled = false;
			
			e = d.getElementById("check_newWin");
			e.disabled = false;
			
			e = d.getElementById("query_submit");
			e.value = "Start Search";
			
			if (a.newWin)
				a.resultWindow.document.close();

			e = d.getElementById("progress");
			e.style.display = "none";
			
			a.timeOut = a.defaultTimeOut;
			a.index = 0;
			a.endDate = null;
			a.pattern = null;
		}
	},
	initResultWindow : function (text){
		var a = RiverSearch;
		var e = a.parent.document.getElementsByTagName("body");
		var f = a.getStyle(e[0], "font-size");
		var e = a.parent.document.getElementById("dashboard_holder");
		var w = a.getStyle(e, "width").replace("px", "");
		
		if(a.resultWindow == null || a.resultWindow.closed)
		{
			a.resultWindow = a.parent.open('', 'River Search result',
				"location=no, menubar=no, status=no, toolbar=no, " + 
				"scrollbars=yes, resizable=yes, copyhistory=no, " +
				"width=" + w + ", height=500");
			var x = a.parent.screen.width - w;
			a.resultWindow.window.moveTo(x, 10);
		}
		var i = a.parent.SiteState.getPageUser().id;
		var d = a.resultWindow.document;
		d.close();
		d.open("text/html","replace");
		d.writeln(
			'<head>' +
				'<link href="http://statics.plurk.com/e1a6edc9158b71a3d36efb6c5ea0d699.css.cgz?" type="text/css" rel="stylesheet">' +
				'<link rel="stylesheet" type="text/css" href="http://static.plurk.com/static/theme/metal-theme/background.css">' +
				'<link rel="stylesheet" type="text/css" href="http://static.plurk.com/static/theme/boooring-theme/dashboard.css">' +
				'<link rel="stylesheet" type="text/css" href="/Users/getCustomCss?user_id=' + i + '">' +
				'<link rel="stylesheet" type="text/css" href="http://statics.plurk.com/ee0b7b8bd3ce9e3021dfc0295b0c3b0a.css">' +
			'</head>' +
			'<body><div class="plurkaction">' +
				'<table id="result" border="1" style="width:100%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; font-size: ' + f + '">' +
					'<tr><td>Searching Text</td><td colspan="3">&nbsp;' + text + '</td></tr>' +
					'<tr><td style="width:20%">Poster</td><td style="width:55%">Content</td><td style="width:25%">Jump to</td></tr>' +
				'</table></div>' +
			'</body>'
		);
	},
	updateProgress : function (s){
		var Cal = this.parent.Cal;
		var d = this.parent.document
		var e = d.getElementById("searchingFor");
		var f = Cal.formatMonthDate(s) + " - " + 
				Cal.formatTime(s.getHours(), s.getMinutes()) + 
				" @" + s.getFullYear();
		e.innerHTML = f;
	},
	renderTable : function (p){
		var d, s, a = this.parent, ajs = a.AJS;
		
		if (this.newWin)
		{
			d = this.resultWindow.document;
			s = "opener.";
		}
		else
		{
			d = this.parent.document;
			s = "";
			
			var e = d.getElementById("result_pane");
			e.style.display = "";
		}

		var df = d.createDocumentFragment();
		var tr, td, tx;
		
		tr = d.createElement("tr");
		td = d.createElement("td");
		
		//reference from plurk
		var u = a.SiteState.getPlurkUser(p);
        if (p.replurker_id) {
            var r = a.SiteState.getUserById(p.replurker_id);
			if (r)	u = r;
		}

		//reference from plurk
		var i = a.Users.getUserImgSrc(u);
		var v = ajs.SPAN({
			c: "p_img"
		}, ajs.IMG({
			src: i
		}));

		//reference from plurk
		var c = ajs.setHTML(ajs.SPAN(), "&nbsp;");
		var is_freestyle = ajs.isIn(p.qualifier, [":", "freestyle"]);
		if (!is_freestyle) {
			var h;
			if (p.replurker_id) {
				h = a.Qualifiers._(u.gender, p.lang, "replurks");
				c = ajs.SPAN({
					c: "qualifier q_replurks"
				}, h)
			}
			else {
				h = a.Qualifiers._(u.gender, p.lang, p.qualifier);
				c = ajs.SPAN({
					c: "qualifier q_" + p.qualifier
				}, h)
			}
		}
		
		tx = ajs.SPAN({
			c: "name"
		}, u.display_name);

		td.appendChild(v);
		td.appendChild(tx);
		td.appendChild(c);
		tr.appendChild(td);
		
		td = d.createElement("td");
		td.innerHTML = "<div>" + p.content + "</div>";
		this.AnchorBlankTarget(td);
		tr.appendChild(td);
		
		td = d.createElement("td");
		td.appendChild(
			ajs.ACN(ajs.DIV(),
				ajs.A({
					href: "/p/" + (p.plurk_id).toString(36),
					target: "_blank"
				}, 
				ajs.setHTML(
					ajs.DIV({
						c: "perma_link"
					}),
					"&nbsp;")
				)
			)
		);
		var o = p.posted;
		var f = a.Cal.formatMonthDate(o) + " - " + 
				a.Cal.formatTime(o.getHours(), o.getMinutes()) + 
				" @" + o.getFullYear();
		td.appendChild(ajs.DIV(ajs.A({
			href: '#',
			onclick: 'return ' + s + 'RiverSearch.jumpTo(\"' + p.posted + '\");'
		}, f)));
		tr.appendChild(td);
		
		df.appendChild(tr);
		
		var b = d.getElementById("result");
		b.appendChild(df);
	},
	AnchorBlankTarget: function (e){
		var d = this.parent.document;
		
		if (this.newWin)
			d = this.resultWindow.document;
			
		var p = e.firstChild.getElementsByTagName("a");
		for (var i = 0; i < p.length; i++)
		{
			var a = d.createAttribute("target");
			a.value = "_blank";
			p[i].setAttributeNode(a);
		}
	},
	disableAnchorLink: function (e){	//deprecate
		var d = this.parent.document;
		
		if (this.newWin)
			d = this.resultWindow.document;
			
		var p = e.firstChild.getElementsByTagName("a");
		for (var i = 0; i < p.length; i++)
		{
			var a = d.createAttribute("onclick");
			a.value = "return false;";
			p[i].setAttributeNode(a);
		}
	},
	init : function(){
		if(RiverSearch.parent == null)
		{
			RiverSearch.parent = 
				(typeof unsafeWindow != 'undefined') ? unsafeWindow	: window;
			if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
			{
				alert("Sorry! This script does not support Chrome.");
				return;	//not support chrome
			}
		}
		var w = RiverSearch.parent;
		w.RiverSearch = RiverSearch;
		
		RiverSearch.insertUI(w.document);
	},
	insertUI : function (d){
		var b = d.getElementsByTagName("body");
		var f = this.getStyle(b[0], "font-size");
		
		var n = d.getElementById("toggle_tab");
		var e = d.createElement("li");
		e.innerHTML = '<span id="search_tab"></span>River Search';
		
		var m = d.createElement("form");
		m.id = "pane_RS";
		m.innerHTML = 
			'<div class="main_poster">' +
				'<div class="share_search">Duration: ' +
					'<input id="river_duration" type="text" value="365" style="width: 35px; ' +
						'font-size: 10px; padding: 5px;" class="clipboard"> days<br>' +
					'<input id="check_newWin" type="checkbox" style="font-size: 10px; padding: 5px;" />' + 
						'<label for="check_newWin" style="padding-right:10px;"> Show result in new window</label><br>' +
					'<div><a onclick="RiverSearch.hideResult();"><b>Hide result</b></a></div>' +
				'</div>' +
				'<input type="text" id="river_query" style="width: 550px" value="" name="q">&nbsp;' +
				'<input id="query_submit" type="submit" style="font-size: 20px;" class="orange-but" value="Start Search" onclick="RiverSearch.toggleStart();" >' +
				'<p class="u_search">About search syntax please reference to ' +
					'<a target="_blank" href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp">' +
					'regular expression</a>.' +
				'</p>' +
			'</div><br>' + 
			'<div id="progress" style="display: none;" >' +
				'<table style="width: 100%">' +
					'<tr><td style="width: 10%">' +
						'<img src="data:image/gif;base64,R0lGODlhEAAKAPEDAP8AAMzMzP9mZgAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAAEAAKAAACHJw/AMgWkZYQzcEzq9avdfYh4UYO4yhCHepdTAEAIfkEBQAAAwAsBAAAAAgAAwAAAgqcJTYAgxMCUzAUACH5BAUAAAMALAMAAAAGAAYAAAIMnBcxIqh8ogEg0lgAACH5BAUAAAMALAMAAQADAAgAAAIKXGI4I8K+FgBjFgAh+QQFAAADACwDAAQABgAGAAACCkyGY8ks4iAAbBYAIfkEBQAAAwAsBAAHAAgAAwAAAgpMhgNgI6JAeqkAACH5BAUAAAMALAcABAAGAAYAAAIMnAdwqLsiRggDSnoKACH5BAUAAAMALAoAAQADAAgAAAIKBGajKjK9QhhyFAA7" />Searching' +
						'</td><td style="width: 40%" id="searchingFor"></td>' +
					'</tr>' +
				'</table>' +
			'</div>' +
			'<div id="result_pane" style="resize:vertical; height: 150px; overflow-x:hidden; overflow-y:auto; font-size: ' + f + '; display: none;">' +
				'<table style="width: 100%;" id="result" border="1"></table>' +
			'</div>';
		var a = d.createAttribute("class");
		a.value = "plurkaction pane";
		m.setAttributeNode(a);
		a = d.createAttribute("onsubmit");
		a.value = "return false;";
		m.setAttributeNode(a);
		a = d.createAttribute("action");
		a.value = "/";
		m.setAttributeNode(a);
		
		if(n != null)
		{
			a = d.createAttribute("style");
			a.value = "display: none; padding: 10px 0pt 20px 55px;";
			m.setAttributeNode(a);
			
			a = d.createAttribute("onclick");
			a.value = "PlurkSearch.showPane(this, 'RS')";
			e.setAttributeNode(a);
			
			n.appendChild(e);
			
			n = d.getElementById("plurk_form");
			n.appendChild(m);
		}
		else
		{
			n = d.getElementById("plurk-dashboard");
			
			a = d.createAttribute("style");
			a.value = "padding: 10px 0pt 20px 55px;";
			m.setAttributeNode(a);
			
			var u = d.createElement("ul");
			a = d.createAttribute("id");
			a.value = "toggle_tab";
			u.setAttributeNode(a);
			u.appendChild(e);
			
			n.parentNode.insertBefore(u, n);
			
			u = d.createElement("div");
			a = d.createAttribute("id");
			a.value = "plurk_form";
			u.setAttributeNode(a);
			u.appendChild(m);
			
			n.parentNode.insertBefore(u, n);
		}
	},
	hideResult : function() {
		var e = this.parent.document.getElementById("result_pane");
		e.style.display = "none";
	},
	jumpTo : function (s) {	//s = timeString 
		var t = new Date(s);
		var i = this.searchBlockIndex(t);
		return this.jumpTimeLine(i);
	},
	getStyle : function (oElm, strCssRule) {
		//reference from http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
		var d = this.parent.document;
		var strValue = "";
		if(d.defaultView && d.defaultView.getComputedStyle){
			strValue = d.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		}
		else if(oElm.currentStyle){
			strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	},
	parent : null,
	resultWindow : null,
}).init();

