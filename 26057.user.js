// ==UserScript==
// @name           RememberTheMilkEnhanced
// @namespace      http://userstyles.org
// @description    Various enhancements for remember the milk
// @include        http://www.rememberthemilk.com/*
// @include        https://www.rememberthemilk.com/*
// ==/UserScript==

/* VERSION 0.2 */
/*----------------------------------------------------------------------------*/
/* CONFIG */


var enableCurrentTags = true;

var enableRemoveLists = true;
var excludeLists = new Array(/*Inbox,Sent*/);

var enableMoveTaskTags = true;

var enableModifyLayout = true;
var layoutWidth = 1200;

var enableDisableSidebarScroll = true;

var enableShrinkListFont = true;
/*----------------------------------------------------------------------------*/

/* MOVE TASK TAGS */

	var MoveTaskTags = function()
	{
		addGlobalStyle(
				'.xtd span.xtd_tag { width: 100px }'+
				'.xtd span { display:block; float:left; width: 300px;}'+
				'.xtr_repeat span.xtd_task_name { padding-right:0;}'+
				'.xtd_task_name { line-height: 22px;}'
				);
	}

/* MODIFY LAYOUT */

	var ModifyLayout = function()
	{
		addGlobalStyle(
			'#statusbox { float:left;margin-top:0;}'+
			'#searchbox { float:none;clear:none;}'+
			'#listFilter { width: 270px}'+
			'#content { width: '+layoutWidth+'px;}'+
			'#leftColumn { float:left;}'+
			'#break { padding:0px}'+
			'#list { height: 4px !important; width: '+parseInt(layoutWidth-610)+'px;padding-left:10px;}'+
			'#listbox { width: auto;}'+
			'.appfootercontent { margin-left: 20px;}'
		);
		var leftColumn = document.createElement('div');
		leftColumn.setAttribute('id','leftColumn');
		var appview = document.getElementById("appview");
		var taskcloud = document.getElementById("taskcloud_copy");
		var listbox = document.getElementById("listbox");
		var searchbox = document.getElementById("searchbox");
		var statusbar = document.getElementById("statusbox");
		var appheader = document.getElementById("appheader");
		var content = document.getElementById("content");
		
		leftColumn.appendChild(taskcloud);
		appview.insertBefore(leftColumn,listbox);
		
		statusbar.style.padding = "0px";
		document.getElementById("appheaderlogo").style.display = "none";
		content.insertBefore(statusbar,appheader);
		leftColumn.insertBefore(searchbox,taskcloud);
	}

/* HIDE LISTS */

	var RemoveListHandler = function()
	{
		console.log("check");
		var listtabs = document.getElementById("listtabs");
		var ul = listtabs.childNodes[0];
		for(var i=0;i<ul.childNodes.length;i++)
		{
			var tab = ul.childNodes[i];
			var txt = tab.childNodes[0].innerHTML;
			if (tab.className.indexOf("xtab_smartlist") == -1 && tab.className.indexOf("xtab_selectted") == -1 && !excludeLists.contains(txt))
			{
				//tab.setAttribute('class','xtab_smartlist');
				tab.style.display = "none";
			}
		}
		ListenForChanges(true);
	}

	var ListenForChanges = function(listen)
	{
		var listtabs = document.getElementById("listtabs");
		if (listtabs) {
			if (listen) {
				listtabs.addEventListener("DOMNodeInserted", RemoveListHandler, false);
				listtabs.addEventListener("DOMNodeRemoved", RemoveListHandler, false);
			} else {
				listtabs.removeEventListener("DOMNodeInserted", RemoveListHandler, false);
				listtabs.removeEventListener("DOMNodeRemoved", RemoveListHandler, false);
			}
		}
	}

	var RemoveLists = function(listen)
	{
		//addGlobalStyle('#listtabs ul li { display:none;}');
		//addGlobalStyle('#listtabs ul li.xtab_smartlist,#listtabs ul li.xtab_exclude,#listtabs ul li.xtab_selected { display:block;}');
		ListenForChanges(true);
	}

	window.addEventListener('unload', function() {
		ListenForChanges(false);
	}, false);

/* CURRENT TAGS */

	var GetTags = function()
	{
		ListenForTasks(false);
		setTimeout(function() {
			var tagElements = getElementsByStyleClass('xtd_tag');
			var tags = new Array();
			for(var i=0;i<tagElements.length;i++)
			{
				var t = tagElements[i].innerHTML;
				t = t.split(', ')
				for (var x=0;x<t.length;x++)
				{
					if (!tags.contains(t[x]))
					{
						tags.push(t[x]);
					}
				}
			}
			tags.sort();
			DrawTags(tags);
			ListenForTasks(true);
		},1000);
	}

	var DrawContainer = function()
	{
		var tags = document.createElement('div');
		tags.setAttribute('id','currentTags');
		var detailsbox = document.getElementById("detailsbox");
		var taskcloud = document.getElementById("taskcloud_copy");

		detailsbox.insertBefore(tags,taskcloud);

		addGlobalStyle(
			"#currentTags { border:1px solid #CACACA; margin-top: 13px; width: 293px }"+
			"#currentTags div { margin: 2px 5px;}"+
			"#currentTags a { padding-right: 10px; }"
		);
	}

	var DrawTags = function(tags)
	{
		var tagContainer = document.getElementById("currentTags");
		tagContainer.innerHTML = '';
		for(var i=0;i<tags.length;i++)
		{
			var searchBox = document.getElementById("listFilter");
			var div = document.createElement("div");
			var atag = document.createElement("a");
			var aappend = document.createElement("a");
			var aremove = document.createElement("a");
			atag.setAttribute("href","javascript:void(0);");
			atag.innerHTML = tags[i];
			atag.addEventListener("click",function() { 
				searchBox.value = "tag:"+this.innerHTML;
				unsafeWindow.control.updateListFilter();
			},true);
			aappend.setAttribute("href","javascript:void(0)");
			aappend.setAttribute("title",tags[i]);
			aappend.innerHTML = "+";
			aappend.addEventListener("click",function() {
				searchBox.value = searchBox.value+=" AND tag:"+this.getAttribute("title");
				unsafeWindow.control.updateListFilter();
			},true);
			aremove.setAttribute("href","javascript:void(0)");
			aremove.setAttribute("title",tags[i]);
			aremove.innerHTML = "-";
			aremove.addEventListener("click",function() {
				searchBox.value = searchBox.value+=" AND not tag:"+this.getAttribute("title");
				unsafeWindow.control.updateListFilter();
			},true);

			div.appendChild(atag);
			div.appendChild(aappend);
			div.appendChild(aremove);
			tagContainer.appendChild(div);	
		}
	}

	var ListenForTasks = function(listen)
	{
		var tasks = document.getElementById("midcontent");
		if (tasks)
		{
			if (listen)
			{
				tasks.addEventListener("DOMNodeInserted",GetTags,false);
			}
			else
			{
				tasks.removeEventListener("DOMNodeInserted",GetTags,false);
			}
		}
	}

	var CurrentTags = function()
	{
		DrawContainer();
		ListenForTasks(true);
	}

	window.addEventListener('unload', function() { ListenForTasks(false)},false);

/* DISABLE SIDEBAR SCROLL */
	var DisableSidebarScroll = function() {
		var L = unsafeWindow.document.getElementById("detailsbox");
		L.moveDiv = function () {
			var L = unsafeWindow.document.getElementById("detailsbox");
			L.style.top = window.pageYOffset+"px";
			unsafeWindow.Autocomplete.handleWindowResize();
		};	
	}

/* SHRINK LIST FONT */
	var ShrinkListFont = function() {
		addGlobalStyle('.xtabs li a:link, .xtabs li a:visited, .xtabs li a:active { font-size: 10px;}');
	}

/* UTILS */

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	Array.prototype.contains = function (element)  {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == element)  {
				return true;
			}
		}
		return false;
	};
	 Array.prototype.sort=function()
	  {
		  var tmp;
		  for(var i=0;i<this.length;i++)
		  {
			  for(var j=0;j<this.length;j++)
			  {
				  if(this[i]<this[j])
				  {
					  tmp = this[i];
					  this[i] = this[j];
					  this[j] = tmp;
				  }
			  }
		  }
	  };
	function getElementsByStyleClass (className) {
	  var all = document.all ? document.all :
		document.getElementsByTagName('*');
	  var elements = new Array();
	  for (var e = 0; e < all.length; e++)
		if (all[e].className == className)
		  elements[elements.length] = all[e];
	  return elements;
	}
/* FEATURES */
if (enableCurrentTags)
	CurrentTags();
if (enableRemoveLists)
	RemoveLists();
if (enableMoveTaskTags)
	MoveTaskTags();
if (enableModifyLayout)
	ModifyLayout();
if (enableDisableSidebarScroll)
	DisableSidebarScroll();
if (enableShrinkListFont)
	ShrinkListFont();
