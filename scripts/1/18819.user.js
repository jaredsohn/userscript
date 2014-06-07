// ==UserScript==
// @name           JIRA Enhanced Navigator
// @version        1.5
// @description    Makes the columns in tables resizable and remembers column width, additionally it allows the hiding of the filter box on the left.
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        */ManageFilters.jspa*
// @include        */IssueNavigator.jspa*
// @include        */QuickSearch.jspa*
// @include        */BulkEditDetailsValidation.jspa*
// @include        */BulkEdit1!default.jspa*
// @include        */UserVotes!default.jspa*
// @include        */UserWatches!default.jspa*
// @include        */ViewUserIssueColumns!default.jspa*
// @include        */ViewSearchRequestIssueColumns!default.jspa*
// ==/UserScript==

//enable resizing on the Column Order page
const resize_on_ordering = false;

//size of the resize handle
const div_width = 3;

if(!String.prototype.trim) String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g,"");}
function process(array, before, after, between){	return (before?before:"")+no_wrap.join((after?after:"") +(between?between:"")+ (before?before:""))+(after?after:""); }

var domain = document.location.host;
var regex = /[\W\s \n\r]+/g;

var ColumnOrderPage = document.location.pathname.search(/\/View(User|SearchRequest)IssueColumns!default\.jspa/) > -1;
if(ColumnOrderPage)
{
	$Z("//table[@id='issuetable']//tr[following-sibling::tr[@class='rowAlternate']]/td/b", function(r,i,p){
		c = document.createElement("input")
		c.type = "checkbox";
		c.title = "Do not wrap long lines."
		
		var temp = r.textContent.replace(regex, "");
		c.id = temp?temp:i + "?";
		
		c.checked = GM_getValue(domain+".column."+c.id+".nowrap", false);
		insertBefore(c, r);
		addEvent(c, "click", function(event){GM_setValue(domain+".column."+this.id+".nowrap", this.checked)});
	});
}
if(resize_on_ordering || !ColumnOrderPage)
{
	function stop(event){event.stopPropagation();}

	function auto(event){
	//	eb.style.marginLeft=eb.style.marginRight="";
		var link = GetParentNodeByTag(event.target, "td");
		var name = domain+".column."+link.id+".width";
		link.removeAttribute("width");
		base.className="resizing";
		var w = link.clientWidth-(pad+pad);
		link.width=(w<min_width)?min_width:w;
		GM_setValue(name, link.width);
		base.removeAttribute("class");
	//	eb.style.marginLeft=eb.style.marginRight="auto";
	}

	function down(event){
		addEvent(document, "mouseup", up);
		addEvent(document, "mousemove", movemouse);
		dobj = this;
		isdrag = true;
		x = event.pageX;
		w = parseInt(GetParentNodeByTag(dobj, "td").width+".0");
	//	GM_log(new Array(x,w));
		return false;
	}

	function up(event){
		if(isdrag)
		{
			isdrag=false;
			removeEvent(document, "mousemove", movemouse);
			removeEvent(document, "mouseup", up);
			var link = GetParentNodeByTag(dobj, "td");
			var name = domain+".column."+link.id+".width";
	//		GM_log(name);
			GM_setValue( name, link.width);
		}
	}

	function movemouse(event){
	  if (isdrag)
	  {
		var p = event.pageX;
		var k = w + p - x;
		GetParentNodeByTag(dobj, "td").width = k<min_width?min_width:k;
	//	GM_log(new Array(w, p, x, k))
		return false;
	  }
	}

	function toggle(set){
		if(header.style.display == "none" && set != false)
		{
			header.style.display = "";
			GM_setValue(domain+".filter."+header.className+".visible", true)
		}
		else if(set != true)
		{
			header.style.display = "none";
			GM_setValue(domain+".filter."+header.className+".visible", false)
		}
	}
	
	var no_wrap = [];

	var res = $Y("//table[@id='issuetable']/tbody/tr[position()=1 and not(@class)]/td");

	var len = res.snapshotLength;
	if(len <= 0) return;
	var first = res.snapshotItem(0);
	var row = GetParentNodeByTag(first, "tr")
	var base = GetParentNodeByTag(row, "table");
	var space=parseInt(base.cellSpacing+".0");
	var pad = parseInt(base.cellPadding+".0");
	var height = (first.height = (base.rows[0].clientHeight - space)) - (pad + pad);// + space + space + pad + pad;
	var eb = GetParentNodeByTag(base, "table", base);
	//eb.style.backgroundColor="transparent";
	eb.removeAttribute("width");
	eb.style.marginLeft="20px;"//eb.style.marginRight="auto";

	var div_center_offset = (pad /*+ Math.floor(div_width / 2)*/ + space);
	var min_width = (ColumnOrderPage?56:div_width - space + 1);
	const etype = "div";

	for (i = 0; link = res.snapshotItem(i); ++i)
	{
		link.style.whiteSpace="nowrap";
		link.style.minWidth=min_width+"px";

		var text = link;
		var u = link.getElementsByTagName("span");
		if(u && u[0])
		{
			text = link.removeChild(u[0]);
			link.title = text.title;
		}
		else
		{//for BulkEdit1
			if(u = getFirstNonTextChild(link))
			{
				text = document.createElement("span");
				text.appendChild(link.removeChild(u));
			}
		}
		
		var temp = text.textContent.replace(regex, "");
		link.id = temp?temp:i + "?";
		
		if(GM_getValue(domain+".column."+link.id+".nowrap", false))
			no_wrap.push($X("//table[@id='issuetable']/tbody/tr[preceding-sibling::tr[position()=1 and not(@class)]]/td["+(i+1)+"]").className.replace("nav ",""));
		
		var width = parseInt(GM_getValue(domain+".column."+link.id+".width", "0"));
	//	GM_log(width);
		if(width == 0 || isNaN(width))
			width = link.clientWidth - (pad + pad);
		if(width < min_width && width >= 0)
			width = min_width;
		
		var burn = document.createElement(etype);
		var divider = document.createElement(etype);
		burn.className="GM_burn";
		
		var t = link.childNodes.length;
		while(t > 0)
		{
			var m = link.removeChild(link.childNodes[--t]);
			if(m.nodeName != "#text")
				burn.appendChild(m);
		}
		if(burn.childNodes.length > 0)
		{
			link.appendChild(divider);
			link.appendChild(burn);
		}
		else
			link.appendChild(divider = burn);
		if(link != text)
			link.appendChild(text);
		divider.title="Click and drag to resize this column";
		divider.className="GM_divider";
	//	addEvent(floater, "mouseup", up);
		addEvent(divider, "mousedown", down);
		addEvent(divider, "click", stop);
		addEvent(divider, "dblclick", auto);
		link.width=Math.abs(width) + (width>=0?"":"%");
	}

	GM_addStyle(process(no_wrap, "#issuetable .", " {white-space:nowrap;} "));
	//GM_log(no_wrap.join(","));
	
	var tx;
	var ty;
	var x;
	var w;
	var dobj;

	GM_addStyle(".GM_divider {background-color:black; cursor:col-resize; height:"+height+"px; opacity:0.125; width:"+div_width+"px;} .GM_burn, .GM_divider {float:right; left:"+div_center_offset+"px; position:relative;}")
	GM_addStyle("table.resizing {table-layout:auto!important; overflow:auto!important;} table.resizing tbody tr td.colHeaderLink *, table.resizing tbody tr td.colHeaderOver * {display:none;}" );
	GM_addStyle("table#issuetable tbody tr td {overflow:hidden!important;} table#issuetable {table-layout:fixed; overflow:hidden; width:0px;}");
	GM_addStyle("table#issuetable tbody tr td:hover {overflow:visible!important;} table#issuetable tbody tr td:hover + td {opacity:0.2;} .faded {opacity:0.1!important;}");
	GM_addStyle("td.colHeaderOver {color:black;} td.colHeaderOver:hover + td + td {opacity:0.4;}");

	var header = $X("//tr[not(boolean(@class))]/td[@class='filterSummaryCell' or @class='filterFormCell' or (not(@class) and div[@class='vcard'])]");

	if(header)
	{
		var div = document.createElement("td");
		div.style.background = "#9DBBDA";
		div.style.verticalAlign = "middle";
		div.style.cursor="pointer";
		text = document.createElement("div");
		text.style.width = "5px";
		div.appendChild(text);
		insertAfter(div, header);
		addEvent( div, "click", toggle );
		if(!header.className)
			if(new_name = document.URL.replace(/.*\/([^!]+)\!default\.jspa.*/, "$1"))
				header.className = "URL-" + new_name;
		toggle(GM_getValue(domain+".filter."+header.className+".visible", true));
		div.title="Click to toggle the visiblity of the filters";
	}

	$Z("//td[contains(@class, 'assignee') and contains(text(), 'Unassigned')]", function(r, i, p){r.className += " faded"}, base);
}

function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
function $Z(_xpath, func, node, payload){
	var res = document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, j;
	for (i = j = 0; link = res.snapshotItem(i); ++i)
		j += func(link, i, payload);
	return j;
}
function GetParentNodeByTag(child, tag, bad) {
	tag = tag.toUpperCase();
	while((child = child.parentNode) && child.tagName != tag);
	return child?child:bad;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}

function addEvent( obj, type, fn, capture ) {
 	if ( obj.attachEvent ) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	} else
 		obj.addEventListener( type, fn, capture?capture:false );
}
function removeEvent( obj, type, fn, capture ) {
 	if ( obj.detachEvent ) {
 		obj.detachEvent( "on"+type, obj[type+fn] );
 		obj[type+fn] = obj["e"+type+fn] = null;
 	} else
 		obj.removeEventListener( type, fn, capture?capture:false );
}
function getFirstNonTextChild(obj){
	if(obj.firstChild.nodeName != "#text") return obj.firstChild;
	return getNextNonTextSibling(obj.firstChild);
}
function getNextNonTextSibling(obj){
	while((obj=obj.nextSibling) && (obj.nodeName == "#text"));
	return obj;
}