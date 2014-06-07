// ==UserScript==
// @name           vBulletin++
// @namespace      http://home.comcast.net/~mailerdaemon/
// @include        http://forums.secondlife.com/forumdisplay.php*
// @include        http://forums.secondlife.com/search.php*
// ==/UserScript==

UpdateScriptCheck(12010, 4);

function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}

const URL = "http://forums.secondlife.com/"
const POSTCOUNT = true;
const DEBUG = 0;
const SUBMIT = true;
const DELAY = 100;
const def_title = "Oldest Selected Thread Title (or Thread Title)";
const def_forum = "Oldest Selected Thread Forum";
//location.replace()
const xpath = "//table[position()<=3]/tbody/tr[1]/td[1]/a/strong/../..";

if(!String.prototype.trim) String.prototype.trim = function() { return this.replace(/^\s*/,'').replace(/\s*$/, ''); }//necessary evil
var header = $X(xpath);
var SEARCH = true;
var this_forum_name;
var this_forum_id;

if(!header)
{
	header = $X("//*[contains(text(),'Threads in Forum')]");
	if(header)
	{
		SEARCH = false;
		this_forum_name = header.getElementsByTagName("SPAN")[0].textContent.replace(/^[\s]*:[\s]*(.*?)[\s]*$/,'$1');
		this_forum_id = parseInt(getParam(document.location.href, "f"));
		header = insertAfter(document.createElement("div"), header.parentNode.parentNode.parentNode);
	}
}
if(!header)
	return;

if(SEARCH)
{
	var search = header.getElementsByTagName("A")[0];
	var search_href = search.href;

	if(getParam(search_href, "showposts","0") != "0")
		return;
}

var link, i;//used for xpath loops
var forums = new Array(0);//maps forum ids to forum names.
var actions = new Array(0);//list of available actions
var row = new Array(0);//list of thread objects
var tasks = new Array(0);//list of queued tasks
var task = new Array(0);//active running task item queue
var selected_forums = new myArray(0);//tracks forum counts for selected threads
var selected_titles = new myArray(0);//tracks title counts for selected threads
var old_sort;
var old_order;
var do_now;
var base;//base URL of the search

var select;//holder for actions
var title_text;//text box to enter a title
var title_select;//dropdown list of used titles
var forum;//dropdown list of all forums
var forum_select;//dropdown list of used forums
var reply_title;//text box to enter a replay title
var reply_text;//textarea to enter a reply
var reply;
var reply_toggle;
var reply_label;

//Create Main Interface
header.appendChild(document.createElement("br"));
var form = document.createElement("form");
new function(){
	var t, tr, td
	form.appendChild(t = document.createElement("table"));
	t.appendChild(tr = document.createElement("tr"));
	{//Actions (do not edit here)
		tr.appendChild(select = document.createElement("td"));
			select.noWrap=true;
			select.rowSpan=2;
			select.vAlign="top";
	}
	{//Buttons
		tr.appendChild(td = document.createElement("td"));
				td.vAlign="top";
				td.noWrap=true;
			td.appendChild(submit = document.createElement("input"));
			td.appendChild(document.createElement("br"));
			td.appendChild(clear = document.createElement("input"));
			td.appendChild(document.createElement("br"));
			td.appendChild(refresh = document.createElement("input"));
				refresh.type = clear.type = submit.type = "button";
				refresh.value = "Refresh";clear.value = "Clear";submit.value = "Go";
				refresh.style.width = clear.style.width = submit.style.width = "60px";
	}
	{//Fields
		tr.appendChild(td = document.createElement("td"));
				td.vAlign="bottom";
				td.noWrap=true;
			td.appendChild(forum_select = document.createElement("select"));
				forum_select.style.width="200px";
				forum_select.innerHTML="<option value='' selected='true'>"+def_forum+"</option>";
			td.appendChild(forum = document.createElement("select"));
				forum.style.width="200px";
			td.appendChild(document.createElement("br"));
			td.appendChild(title_text = document.createElement("input"));
				title_text.type="text";
				title_text.style.width="396px";//title_text.id="m1";
				title_text.spellcheck="true"
			td.appendChild(document.createElement("br"));
			td.appendChild(title_select = document.createElement("select"));
				title_select.innerHTML="<option value='' selected='true'>"+def_title+"</option>";
				title_select.style.width="400px";//title_select.id="m2";
	}
	{//Reply
		var m, n, k;
		t.appendChild(tr = document.createElement("tr"));
		tr.appendChild(td = document.createElement("td"));
			td.colSpan=2;
			td.appendChild(n = document.createElement("table"));
			n.cellPadding=0;
			n.callSpacing=0;
			n.appendChild(k = document.createElement("tr"));
				k.appendChild(m = document.createElement("td"));
					m.vAlign="top";
					m.appendChild(reply_toggle = document.createElement("input"));
						reply_toggle.type="button";
						reply_toggle.value="â†“â†‘";
				k.appendChild(m = document.createElement("td"));
					m.colSpan=2;
					m.appendChild(reply = document.createElement("table"));
					reply.style.display="none";
						reply.appendChild(m = document.createElement("tr"));
							m.appendChild(m = document.createElement("td"));
								m.appendChild(reply_title = document.createElement("input"));
						reply_title.style.width="310px";
								m.appendChild(reply_get = document.createElement("input"));
								reply_get.type="button";
								reply_get.value="Get";
								reply_get.tabIndex=-1;
								m.appendChild(reply_store = document.createElement("input"));
								reply_store.type="button";
								reply_store.value="Store";
								reply_store.tabIndex=-1;
						reply.appendChild(m = document.createElement("tr"));
							m.appendChild(m = document.createElement("td"));
								m.appendChild(reply_text = document.createElement("textarea"));
						reply_text.style.width="410px";
						reply_text.value=unescape(GM_getValue("default_reply_text",""));
						reply_title.value=unescape(GM_getValue("default_reply_title",""));
						addEvent(reply_store, "click", function reply_store_f(){
							GM_setValue("default_reply_title", escape(reply_title.value));
							GM_setValue("default_reply_text", escape(reply_text.value));
						});
						addEvent(reply_get, "click", function reply_get_f(){
							reply_text.value=unescape(GM_getValue("default_reply_text",""));
							reply_title.value=unescape(GM_getValue("default_reply_title",""));
						});
	}
}();//just for the scope.

//Parse Forums
var res = $Y("//select/optgroup[2]/*");
for (i = 0; link = res.snapshotItem(i); ++i)
{
	forum.options.add(link.cloneNode(true));
	forums.push("f"+link.value);
}

GM_addStyle(".alt1 {white-space:nowrap; overflow:hidden;} .alt1 a, .alt1 div, .alt1 table {white-space:normal; overflow:auto;}")
GM_addStyle("input.thread-select { float:right; opacity:0.70;}")
GM_addStyle("input.thread-select:checked { opacity:0.85;}")//CSS3 fun
GM_addStyle("hr.divider {margin:0px; opacity:0.6;}");
GM_addStyle("span.posttoggle {float:right; cursor:pointer; width:1.5em; text-align:center;}");

//Parse Threads
if(SEARCH)
	res = $Y(xpath + "/../../tr[position()>2]/td[1]/img", header.parentNode.parentNode);
else
	res = $Y("//table[position()>=2 and 2<=last() - position()]/tbody/tr/td[1]/img");
for (i = 0; link = res.snapshotItem(i); ++i) {
	//We store all this stuff so we can use it so we can determin the sort.
	var t,s,p;
	p = link.parentNode;
	s = p.parentNode.cells;
	if(s.length > 4)
	{
		s = s[4].textContent;
		if(s != "-")
		{
			var o = new Object();
			o.ref = 0;
			o.replies = parseInt(s);
				p.insertBefore(s = document.createElement("input"), link);
				s.type="checkbox";
				s.className="thread-select";
				s.id="s_checkbox_"+i;
				p.title=link.title;
				addEvent(p, "click", clicked);
			o.checkbox = s;
			
				s = p.parentNode.cells[2].getElementsByTagName("A");
				t = s[0];
			o.title = t.textContent.trim();
			if(o.title == "")
			{
				t = s[1];
				o.title = t.textContent.trim();
			}
			o.url = t.href;
			o.thread = parseInt(getParam(t.href, "t"));
			
				t = p.parentNode.cells[2].getElementsByTagName("SPAN");
				s = t[t.length - 1];
			o.starter = s.textContent.trim();
				s = insertAfter(document.createElement("div"), s.parentNode);
				s.id = "t"+i+"_toggle";
				s.style.display="none";
				s.innerHTML = "<hr class='divider'/>"+s.parentNode.title;
				s.className = "smallfont";
				
				s = insertAfter(document.createElement("span"),t[0]);
				s.className="posttoggle";
				s.id = "h"+i+"_toggle";
				s.innerHTML="-";
				s.style.display="none";
				addEvent(s, "click", toggle);
				
				s = insertAfter(document.createElement("span"),t[0]);
				s.className="posttoggle";
				s.id = "s"+i+"_toggle";
				s.innerHTML="+";
				addEvent(s, "click", toggle);
				
				s = p.parentNode.cells[3].textContent.split("\n")[2].trim().split(" ");
			o.lastpost = new Date();
				if(s[0] == "Today");
				else if(s[0] == "Yesterday")
					o.lastpost.setDate(o.lastpost.getDate() - 1);
				else
				{
					t = s[0].split("-");
					o.lastpost.setFullYear(t[2], t[0] - 1, t[1]);
				}
				t = s[1].split(":");
				o.lastpost.setHours((s[2]=="AM")?t[0]:(parseInt(t[0]) + 12), t[1]);
			
			o.views = parseInt(p.parentNode.cells[5].textContent);

			if(SEARCH)
			{
					t = p.parentNode.cells[6].getElementsByTagName("A")[0];
				o.forum = parseInt(getParam(t.href, "f"));
				o.forumname = t.textContent;
			}
			else
			{
				o.forum = this_forum_id;
				o.forumname = this_forum_name;
			}
			o.__defineGetter__("checked", function() { return this.checkbox?this.checkbox.checked:false; });//because i'm lazy
			o.__defineGetter__("disabled", function() { return this.checkbox?this.checkbox.disabled:true; });//because i'm lazy
			row[i] = o;
		}
	}
}

if(SEARCH)//Fix the Search Link & Make Sortable Links
{
	var sort = ["rank","title", "postusername", "threadstart","lastpost","replycount","views", "forum"];
	sort["title"] = function(){return row[0].title <= row[row.length - 1].title;};
	sort["rank"] = function(){return false;};
	sort["postusername"] = function(){return row[0].starter <= row[row.length - 1].starter;};
	sort["threadstart"] = function(){return row[0].thread <= row[row.length - 1].thread;};
	sort["lastpost"] = function(){return row[0].lastpost <= row[row.length - 1].lastpost;};
	sort["replycount"] = function(){return row[0].replies <= row[row.length - 1].replies;};
	sort["views"] = function(){return row[0].views <= row[row.length - 1].views;};
	sort["forum"] = function(){return row[0].forumname <= row[row.length - 1].forumname;};
	sort["def-title"] = sort["def-rank"] = sort["def-postusername"] = sort["def-forum"] = "ascending";
	sort["def-threadstart"] = sort["def-lastpost"] = sort["def-replycount"] = sort["def-views"] = "descending";
	
	var links = ["Rank","Thread Title| / |Thread Starter","Started| / |Last Post","Replies", "Views", "Forum"];
	var u = 0;
	base = "http://forums.secondlife.com/search.php"+
				"?s="+getParam(search_href, "s")+
				"&query="+getParam(search_href, "query")+
				"&searchuser="+getParam(search_href, "searchuser")+
				"&starteronly="+getParam(search_href, "starteronly")+
				"&exactname="+getParam(search_href, "exactname")+
				"&titleonly="+getParam(search_href, "titleonly")+
				"&replyless="+getParam(search_href, "replyless")+
				"&replylimit="+getParam(search_href, "replylimit")+
				"&searchdate="+getParam(search_href, "searchdate")+
				"&beforeafter="+getParam(search_href, "beforeafter")+
				"&showposts="+getParam(search_href, "showposts")+
//				"&forumchoice="+getParam(search_href, "forumchoice")+
				encapsulate("&forumchoice[]=", getParam(search_href, "forumchoice[]"))+//hack hack hack
				"&childforums="+getParam(search_href, "childforums")+
				"&searchthread="+getParam(search_href, "searchthread")+
				"&searchthreadid="+getParam(search_href, "searchthreadid")+
				"&saveprefs="+getParam(search_href, "saveprefs");
	do_now = "&do="+getParam(search_href, "do", "process");
	old_sort = getParam(search_href, "sortby", "lastpost");
//	GM_log(old_sort);
	old_order = getParam(search_href, "sortorder", "descending");
	if(row.length > 0)
		old_order = (sort[old_sort]())?"ascending":"descending";
	search.href = base + "&sortby=" + old_sort + "&sortorder=" + old_order;
//	i = document.createElement("a");
//	i.innerHTML = "(P)";
//	i.href = base + "&sortby=" + old_sort + "&sortorder=" + old_order;
//	i.title = "Permanent URL";
//	insertAfter(i, search)
//	insertAfter(document.createTextNode(" "), search)
	i = document.createElement("a");
	i.innerHTML = "(P)";
	i.href = base + do_now + "&sortby=" + old_sort + "&sortorder=" + old_order;
	i.title = "Permanent URL";
	insertAfter(i, search)
	insertAfter(document.createTextNode(" "), search)
	res = $Y(xpath + "/../../tr[2]/td", header.parentNode.parentNode);
	for (i = 0; link = res.snapshotItem(i); ++i) {
		var p = links[i].split("|");
		link.innerHTML = "";
		for(var m = 0; m <p.length; m++)
		{
			if(m%2)
				link.innerHTML += p[m];
			else if(p[m].length > 0)
			{
				var order = sort["def-"+sort[u]];
				if(old_sort == sort[u])
				{
					order = (old_order != "descending")?"descending":"ascending";
				}
//				GM_log([order, old_order, old_sort, sort[u]].join(", "));
				link.innerHTML += "<a href='"+base + do_now + "&sortby=" + sort[u] + "&sortorder=" + order + "' title='"+p[m]+" "+order+" Sort'>"+p[m]+"</a>";
				u++;
			}
		}
	}
}

action("Clear", function(item){
/*		var h=item.checkbox;
		if(h.checked == true)
		{
			selected_titles.twiddle(item.title, h.checked = false, POSTCOUNT?item.replies+1:1);
			selected_forums.twiddle(item.forumname, false, POSTCOUNT?item.replies+1:1);
			++task.init;
		}*/
		return "";
	}, function(mytask){
			Array.forEach(mytask, function(item) {
			var t = 0;
			if(item)
			{
				var h=item.checkbox;
				if(h.checked == true)
				{
					selected_titles.twiddle(item.title, h.checked = false, POSTCOUNT?item.replies+1:1);
					selected_forums.twiddle(item.forumname, false, POSTCOUNT?item.replies+1:1);
					++t;
				}
			}
			if(t > 0)
			{
				generate_titles(selected_titles, title_select, def_title);
				//if(
				generate_titles(selected_forums, forum_select, def_forum);// < 1 && SEARCH)
					//forum_selected();
			}
		});
	},function(){
/*		if(task.init > 0)
		{
			generate_titles(selected_titles, title_select, def_title);
			if(generate_titles(selected_forums, forum_select, def_forum) < 1)
				forum_selected();
		}
		title_text.value = "";*/
	}, true);
action("Merge", function(item){
		if(item != task.init.oldest)
		{
			var Data = 's=&do=domergethread&t='+encodeURIComponent(task.init.oldest.thread)+
								'&title='+encodeURIComponent(task.init.title)+
								'&mergethreadurl='+encodeURIComponent(item.url);
								
			//update title, replies & hide merged threads.
			if(item != task.init.oldest)
			{
				task.init.del.push(item);
				var h=item.checkbox;
				var p=h.parentNode.parentNode;
				p.style.display="none";
			}
			return Data;
		}
		return "";
	}, function(mytask){
		var o = new Object();
		o.del = new Array(0);
		o.oldest = o.newest = null;
		Array.forEach(mytask, function(item) {
			if(item)
			{
				if(o.oldest == null || item.thread < o.oldest.thread)
					o.oldest = item;
				if(o.newest == null || item.thread > o.newest.thread)
					o.newest = item;
			}
		});
		o.newest = o.newest.checkbox.parentNode.parentNode.cells[3].innerHTML;//horrible hack
		o.title = title_text.value.trim();
		if(o.title == "" && o.oldest) o.title = o.oldest.title;
		return o;
	}, function(){
		var t = 0;
		if(task.init.oldest && task.init.oldest.checked == true)
		{
			selected_titles.twiddle(task.init.oldest.title, false, POSTCOUNT?task.init.oldest.replies+1:1);
			selected_forums.twiddle(task.init.oldest.forumname, false, POSTCOUNT?task.init.oldest.replies+1:1);
//			GM_log([selected_titles[task.init.oldest.title],selected_forums[task.init.oldest.forumname]]);
		}
//		log(task.init.del, ", ", "task.init.del = [ ", " ]")
//		GM_log(task.init.del.length);
		Array.forEach(task.init.del, function(item) {
			var h=item.checkbox;
			var p=h.parentNode.parentNode;
//			p.style.display="none";
			if(h.checked == true)
			{
				selected_titles.twiddle(item.title, h.checked = false, POSTCOUNT?item.replies+1:1);
				selected_forums.twiddle(item.forumname, false, POSTCOUNT?item.replies+1:1);
				t++;
			}
			task.init.oldest.replies = task.init.oldest.replies + 1 + item.replies;
			for(var f = 0; f < tasks.length; ++f)
			{
//				GM_log("before: "+tasks[f]);
				for(var k = 0;k<tasks[f].length; ++k)
					if(tasks[f][k].thread == item.thread)
						tasks[f].splice(k,k+1)
//				GM_log("after: "+tasks[f]);
			}
//			GM_log(item.checkbox.id);
//			row[parseInt(item.checkbox.id.slice(11))] = null;
			row[row.indexOf(item)]=null;
			p.parentNode.removeChild(p);
//			task.init.oldest.views = parseInt(task.init.oldest.views) + parseInt(tem.views);
		});
		
		if(task.init.oldest)
		{
			task.init.oldest.title = task.init.title
			if(task.init.oldest.checked == true)
			{
				selected_titles.twiddle(task.init.oldest.title, true, POSTCOUNT?task.init.oldest.replies+1:1);
				selected_forums.twiddle(task.init.oldest.forumname, true, POSTCOUNT?task.init.oldest.replies+1:1);
//				GM_log([selected_titles[task.init.oldest.title],selected_forums[task.init.oldest.forumname]]);
			}
			var p = task.init.oldest.checkbox.parentNode.parentNode.cells;
			var h = p[2].getElementsByTagName("A");
			h[h.length-1].innerHTML = task.init.oldest.title;
			p[3].innerHTML = task.init.newest;//horrible hack
			p[4].getElementsByTagName("A")[0].innerHTML = task.init.oldest.replies;
//			p[5].innerHTML = oldest.views;
		}
		if(t > 0)
		{
			generate_titles(selected_titles, title_select, def_title);
			if(generate_titles(selected_forums, forum_select, def_forum) < 1 && SEARCH)
				forum_selected();
		}
	}, SEARCH);
action("Reply", function(item){
	var t = task.init;
	var k = new Array();
	k[0]="title="+t.title;
	k[1]="message="+t.text;
	k[2]="iconid=0";
	k[4]="do=postreply"
	k[5]="t="+item.thread;
	k[6]="signature=1"
	k[7]="parseurl=1"
	return k.join("&");
}, function(mytask){
		var o = new Object();
		o.text = escape(reply_text.value);
		o.title = escape(reply_title.value);
	return o;
}, function(){}, null, "newreply.php");
action("Move", function(item){
			if(item.checked == true)
			{
				selected_titles.twiddle(item.title, false, POSTCOUNT?item.replies+1:1);
				selected_forums.twiddle(item.forumname, false, POSTCOUNT?item.replies+1:1);
			}
			title = task.init.title;
			if(title == "") title = item.title;
			//update title & forum link
			var p = item.checkbox.parentNode.parentNode.cells;
			var h = p[2].getElementsByTagName("A");
			h[(h[0].textContent.trim() != "")?0:1].innerHTML = item.title = title;
			if(item.checked == true)
			{
				if(SEARCH)
				{
					selected_titles.twiddle(item.title, true, POSTCOUNT?item.replies+1:1);
					selected_forums.twiddle(item.forumname, true, POSTCOUNT?item.replies+1:1);
				}
				generate_titles(selected_titles, title_select, def_title);
				if(generate_titles(selected_forums, forum_select, def_forum) < 1)
					forum_selected();
			}
			if(SEARCH)
			{
				h = p[6].getElementsByTagName("A")[0];
				h.innerHTML = item.forumname = task.init.forum;
				h.href = "http://forums.secondlife.com/forumdisplay.php?f="+ (item.forum = task.init.forumId);
			}
			else
			{
				item.checked = false;
				item.checkbox.parentNode.parentNode.style.display="none";
			}
		return 's=&do=domovethread&t='+encodeURIComponent(item.thread)+
								'&title='+encodeURIComponent(title)+
								'&forumid='+task.init.forumId+
								'&method=move';//defaults to movered if not included.
	}, function(mytask){
		var o = new Object();
/*		var oldest = null;
		Array.forEach(mytask, function(item) {
			if(item && (oldest == null || item.thread < oldest.thread))
				oldest = item;
		});*/
		var t = forum.options[forum.selectedIndex];
		o.forumId = encodeURIComponent(t.value);
		o.forum = t.textContent.trim();
		o.title = title_text.value.trim();
//		if(o.title == "") o.title = oldest.title;
		return o;
	},function(){}, true);
action("Close", function(item){return 's=&do=openclosethread&t='+encodeURIComponent(item.thread);}, function(){return null;},function(){});

addEvent(submit, "click", mysubmit);
addEvent(clear, "click", myclear);
addEvent(refresh, "click", myrefresh);
addEvent(title_select, "change", title_selected);
addEvent(forum_select, "change", forum_selected);
addEvent(reply_toggle, "click", reply_toggler);
header.appendChild(form);
return;

/*
function log(table, sep, msg_a, msg_b)
{
	var kw = "";
	Array.forEach(table, function(item) {if(kw !="") kw +=sep;kw += item.checkbox.id;});
	GM_log(msg_a+kw+msg_b);
}
*/
//{ Functions
function reply_toggler()
{
	if(reply.style.display != "none")
		reply.style.display = "none";
	else
		reply.style.display = "table";
}

function myrefresh()
{
	if(SEARCH)
		document.location.href = base + do_now + "&sortby=" + old_sort + "&sortorder=" + old_order;
	else
		document.location.href = document.location.href;
}

function myclear()
{
	Array.forEach(row, function(item) {
		if(item && item.checked == true)
		{
			selected_titles.twiddle(item.title, item.checkbox.checked=false, POSTCOUNT?item.replies+1:1);
			selected_forums.twiddle(item.forumname, false, POSTCOUNT?item.replies+1:1);
		}
	});
	generate_titles(selected_titles, title_select, def_title);
	generate_titles(selected_forums, forum_select, def_forum);
	forum_selected();
}

function encapsulate(text, array)
{
	var t = new Array();
	return t.concat(array).join(text);
}

function inc(item, c)
{
	if(0 == item.ref)
		item.checkbox.disabled = true;
	item.ref += (c = c?c:1);
	return item;
}
function dec(item, c)
{
	item.ref -= (c?c:1);
	if(0 == item.ref)
		item.checkbox.disabled = false;
	return item;
}

function toggle(e)
{
	var t = e.target;
	if(t.id.substring(0,1) == "s")
	{
		document.getElementById("t"+t.id.slice(1)).style.display = 
		document.getElementById("h"+t.id.slice(1)).style.display = "block";
		t.style.display = "none";
	}
	else if(t.id.substring(0,1) == "h")
	{
		document.getElementById("s"+t.id.slice(1)).style.display = "block";
		document.getElementById("t"+t.id.slice(1)).style.display = t.style.display = "none";
	}
	if(DEBUG > 3)
		GM_log(t.id.substring(0,1));
}

function getParam(url, param, def)
{
	if(def == null)def = "";
	var r = new RegExp("(?:[?&])"+escapeRegexp(param)+"=([^&]*)","ig");
	var out = new Array(0);
	do
	{
		var t = r.exec(url);
		if(r.lastIndex == 0) break;
		if(t[1].trim().length > 0) out.push(t[1]);
	}while(true);
	if(out.length == 0)
		out[0]=def;
	if(DEBUG>3)
		GM_log(r + "\n" + url + "\n" + param + "\n" + out.join("\n"));
	if(out.length == 1)
		return out[0];
	return out;
}

function escapeRegexp(s) {
  return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}

function title_selected(e)
{
	title_text.value = title_select.options[title_select.selectedIndex].value;
}

function forum_selected(e)
{
	var r = forum_select.options[forum_select.selectedIndex].value.trim();
	var oldest = null;
	var id = null
	Array.forEach(row, function(item) {
		if(item && item.checked == true)
		{
			if(oldest == null || item.thread < oldest.thread)
				oldest = item;
			if(item.forumname.trim() == r)
				id = item;
		}
	});
	//GM_log([oldest?oldest.forum:"null", id?id.forum:"null", r == def_forum, r]);
	if(oldest)
		forum.selectedIndex = forums.indexOf("f"+(id?id:oldest).forum);
}

function checked(e)
{
	var t = e.target;
	var c = parseInt(t.id.split("_")[2]);
	selected_titles.twiddle(row[c].title, t.checked, POSTCOUNT?row[c].replies+1:1);
	selected_forums.twiddle(row[c].forumname, t.checked, POSTCOUNT?row[c].replies+1:1);
//	GM_log([selected_titles[row[c].title], selected_forums[row[c].forumname]]);
	
	if((tasks && tasks.length > 0) || (task && task.length > 0))
		Array.forEach(row, function(item) {
			if(item && item.checked == true && item.checkbox.disabled == true)
			{
				selected_titles.twiddle(item.title, item.checkbox.checked=false, POSTCOUNT?item.replies+1:1);
				selected_forums.twiddle(item.forumname, false, POSTCOUNT?item.replies+1:1);
			}
		});
	
	generate_titles(selected_titles, title_select, def_title);
	
	if(generate_titles(selected_forums, forum_select, def_forum) < 1 && SEARCH)
		forum_selected();
}

function clicked(e)
{
	var o = new Object();
	var t = e.target;
	if(t.nodeName != "INPUT")
	{
		if(t.nodeName == "IMG")
			t = t.parentNode;
		t = t.firstChild;
		t.checked = !t.checked;
	}
	o.target = t;
	checked(o);
}

function generate_titles(select, title, def)
{
	var t = select.titleSort(true);
	var m = t.length;
	var selected;
	if(title.selectedIndex >= 0)
		selected = title.options[title.selectedIndex].value;
	title.innerHTML="<option value=''>"+def+"</option>";
	var b;
	for(var a = 0; a < m; ++a)
	{
		title.options.add(b = document.createElement("option"));
		b.text = t[t[a]] + ":     " + t[a];
		b.value = t[a];
	}
//	GM_log(t.indexOf(selected)+", "+(selected == "")+", " + (t.indexOf(selected) + (selected == "")));
	m = t.indexOf(selected);
	if(m >= 0 || selected == def)
		title.selectedIndex = 1 + m;
	return title.selectedIndex;
}

function action(name, execute_function, init_function, cleanup_function, checked, url)
{
	var o = new Object();
		var t = document.createElement("input");
		var m = document.createElement("label");
		t.type="checkbox";
		m.htmlFor = t.id= name + "_checkbox";
		m.innerHTML = name;
		if(actions.length > 0)	select.appendChild(document.createElement("br"));
		select.appendChild(t);
		select.appendChild(m);
		if(checked)		t.checked = checked;
	o.checkbox = t;
	o.execute = execute_function;
	o.init = init_function;
	o.cleanup = cleanup_function;
	o.name = name;
	o.url = URL+(url?url:'postings.php');
		actions[name] = o;
		actions.push(o);
	return o;
}

function mysubmit(e)
{
//	forum.disabled = title_text.disabled = title_select.disabled = submit.disabled = clear.disabled = true;
	var mytask = new Array(0);
	var c = 0;
//	tasks = new Array();
	Array.forEach(row, function(item) {
		if(item && item.checked == true && item.disabled == false)
		{
			mytask.push(item); 
			item.checkbox.disabled = true;
//			item.checkbox.checked = false;
		}
	});
	if(mytask.length == 0)
		return;
	Array.forEach(actions, function(item)
	{
		if(item.checkbox.checked == true)
		{
			var m = mytask.concat();
			m.action=item;
			m.init = item.init(m);
			tasks.push(m);
			c++;
		}
//		item.checkbox.disabled = true;
	});
	Array.forEach(mytask, function(item) {
		inc(item, c);
	});
	if(task.length == 0 && tasks.length == c)
		check();
}

function load(responseDetails)
{
	if(DEBUG > 1)
		GM_log('Request to '+task.action.name.toLowerCase()+' threads returned ' + responseDetails.status + ' ' + responseDetails.statusText);
	check();
}

function check()
{
	if(task.length == 0)
	{
		if(task.action)
		{
			if(DEBUG > 0)
				GM_log(task.action.name + " done");
			task.action.cleanup();
		}
		if(tasks.length == 0)
		{
//			forum.disabled = title_text.disabled = title_select.disabled = submit.disabled = clear.disabled = false;
			if(DEBUG > 0)
				GM_log("done");
			task = new Array(0);//forget to clear this and next time the old cleanup will get called.
			return;
		}
		task = tasks.shift();
		if(DEBUG > 0)
			GM_log(task.action.name + " submit");
	}
	var item = task.shift();
	if(item)
	{
		var Data = task.action.execute(dec(item));
		if(Data.length > 0)
		{
			if(SUBMIT)
			{
				GM_xmlhttpRequest({
					method: 'POST',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type': 'application/x-www-form-urlencoded'
					},
					url: task.action.url,
					onload: load,
					onerror: load,
					data: Data
				});
				return;
			}
			else if(DEBUG > 1)
				GM_log("fakesubmit: "+task.action.name+" - "+task.action.url +"\n"+ Data);
		}
		else if(DEBUG>2)
			GM_log("no action required here");
	}
	if(SUBMIT)
		check();
	else
		window.setTimeout(check, DELAY);
}

function myArray(e)
{
	var u = new Array(e);
	u.twiddle = function(title, add, c){
		if(typeof title == "string")
		{
			var t = 0;
			if(u[title])
				t = u[title];
			else
				u.push(title);
			if(add == true)
				t+=(c=c?c:1);
			else
				t-=(c=c?c:1);
			u[title] = t;
			var m = u.indexOf(title);
			if(t > 0)
				return m;
			u.splice(m,1);
		}
		return -1;
	}
	u.titleSort = function(descending){
		if(descending==true)
			return u.sort(function(a, b){return (u[a] == u[b])?((a < b)?-1:1):(u[b] - u[a]);});
		return u.sort(function(a, b){return (u[a] == u[b])?((a < b)?-1:1):(u[a] - u[b]);});
	}
	return u;
}

function insertAfter(insert, after){ return after.parentNode.insertBefore(insert, after.nextSibling); }

function addEvent( obj, type, fn ) {
 	if ( obj.attachEvent ) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	} else
 		obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
 	if ( obj.detachEvent ) {
 		obj.detachEvent( "on"+type, obj[type+fn] );
 		obj[type+fn] = obj["e"+type+fn] = null;
 	} else
 		obj.removeEventListener( type, fn, false );
}

function UpdateScriptCheck(script, version)
{//Based on http://userscripts.org/scripts/show/20145
	if (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime())) // Checks once a day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+script+".user.js?" + new Date().getTime(),
			headers: {'Cache-Control': 'no-cache'},
			onload: function(xhrResponse)
			{
				GM_setValue("lastUpdate", new Date().getTime() + "");
				var r = new RegExp("UpdateScriptCheck\\([\\s]*"+script+"[\\s]*,[\\s]*([0-9]+)[\\s]*\\)");
				var a = r.exec(xhrResponse.responseText);
				if (a && parseInt(a[1]) > version)
				{
					if (confirm("There is an update available for the Greasemonkey script \"" + xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g, "") + ".\"\nWould you like to go to the install page now?"))
						{GM_openInTab("http://userscripts.org/scripts/source/"+script+".user.js");}
				}
			}
		});
	}
}
//}