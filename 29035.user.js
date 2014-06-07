// ==UserScript==
// @name           hwmAdvForum
// @namespace      hwmAdvForum
// @include        http://www.heroeswm.ru/forum.php
// @include        http://www.heroeswm.ru/forum_thread.php*
// @include        http://www.heroeswm.ru/forum_messages.php*

/*
KNOWN BUGS:
1. F5 saves the document.referrer record and updates the message count
2. If navigating to forum.php from the topic directly the message count does not updating (referrer doesn't match the thread link)

BEHAVIOUR:
1. Ignores closed topics
2. Folows only visited topics
2. Stores only TOPIC_COUNT last visited topics
*/

// CONSTANTS
var TOPIC_COUNT = 200;
//----------------------
var keys;// = new Array(TOPIC_COUNT);
var values;// = new Array(TOPIC_COUNT);
var index = 0;
//----------------------

function getVar(key)
{
	for (var i = 0; i < TOPIC_COUNT; i++)
	{
		if (keys[i] == key)
		{
			//alert(values[i]);
			return values[i];
		}
	}
	return undefined;
}

function setVar(key, value)
{
	for (var i = 0; i < TOPIC_COUNT; i++)
	{
		if (keys[i] == key)
		{
			//alert(key + " | " + value + " | " + index);
			values[i] = value;
			return;
		}
	}
	keys[index] = key;
	values[index] = value;
	index++;
	if (index >= TOPIC_COUNT) index = 0;
}

function dropPage(url)
{
	return url.split("&")[0];
}

function readData()
{
	keys = GM_getValue("keys");//
	if (keys == undefined)
	{
		keys = new Array(TOPIC_COUNT);
		GM_setValue("keys", keys.join('|'));
	}else
	{
		keys = keys.split('|');
	}
	values = GM_getValue("values");//.split('|');
	if (values == undefined)
	{
		values = new Array(TOPIC_COUNT);
		GM_setValue("values", values.join('|'));
	}else
	{
		values = values.split('|');
	}
	index = GM_getValue("index");
	if (index == undefined)
	{
		index = 0;
		GM_setValue("index", index);
	}
	if (index >= TOPIC_COUNT) index = 0;
}

// Handle 'forum.php'
function forum_php()
{
	var threads;
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++)
	{
		if (tables[i].className == "table3 forum c_darker")
		{
			threads = tables[i].childNodes[1].childNodes;
			break;
		}
	}

	for (var i = 3; i < threads.length; i++)
	{
		if (threads[i].childNodes.length < 4) continue;
		
		var img = threads[i].childNodes[0].childNodes[0];
		var thread_id = threads[i].childNodes[1].childNodes[0].href;
		var msg_count = threads[i].childNodes[3].innerHTML;
		var last_topic_id = threads[i].childNodes[2].childNodes[0].href;
		
		// write data
		if (document.referrer == thread_id)
		{
			GM_setValue(thread_id, msg_count + "," + msg_count);
		}
		
		// init setting
		var data = GM_getValue(thread_id);
		if (data == undefined)
		{
			GM_setValue(thread_id, msg_count + "," + msg_count);
			data = msg_count + "," + msg_count;
		}
		var old_msg_count = data.split(',')[0];
		
		// check
		var msg_delta = msg_count - old_msg_count;//GM_getValue(thread_id).split(',')[0];
		if (msg_delta > 0)
		{
			img.src = "http://www.heroeswm.ru/i/clans/online.gif";
			img.title = msg_delta + " new messages";
			
			GM_setValue(thread_id, (msg_count - msg_delta) + "," + msg_count);
		}else
		{
			img.src = "http://www.heroeswm.ru/i/clans/offline.gif";
			img.title = "No new messages";
		}
		img.width = 15;
		img.height = 15;

		var value = getVar(last_topic_id);
		if (value != undefined)
		{
			var link = document.createElement('a');
			link.href = value.split(',')[1];
			link.innerHTML = " >>";
			link.style.cssText = "text-decoration: none;" + ((msg_delta > 0) ? "color: green;" : "");
			threads[i].childNodes[2].insertBefore(link, threads[i].childNodes[2].childNodes[1]);
		}
	}
}

function forum_thread()
{
	var cur_topics;
	var thread_id = dropPage(document.URL);
	var msg_count = GM_getValue(thread_id);//.split(',')[1];
	if (msg_count == undefined) return;
	msg_count = msg_count.split(',')[1];
	
	GM_setValue(thread_id, msg_count + "," + msg_count);
	
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++)
	{
		if (tables[i].className == "table3 forum c_darker td_bordered")
		{
			cur_topics = tables[i].childNodes[1].childNodes;
			//alert("gotcha");
			break;
		}
	}
	
	for (var i = 2; i < cur_topics.length; i++)
	{
		var j = 0;
		var cont = 0;
		while (cur_topics[i].childNodes[0].childNodes[j].tagName != 'A')
		{
			if (cur_topics[i].childNodes[0].childNodes[j].src == "http://www.heroeswm.ru/i/lock.gif") cont = 1;
			j++;
		}
		if (cont == 1) continue;
		var topic_id = cur_topics[i].childNodes[0].childNodes[j].href;
		//alert(topic_id);
		var msg_count = cur_topics[i].childNodes[2].innerHTML;
		
		// init setting
		//alert(topic_id);
		var value = getVar(topic_id);//GM_getValue(topic_id);
		if (value == undefined)
		{
			var txt = document.createElement("font");
			txt.innerHTML = "- ";
			txt.style.cssText = "color: #FF0000;"
			cur_topics[i].childNodes[0].insertBefore(txt, cur_topics[i].childNodes[0].childNodes[0]);
			continue;
		}
		
		var old_msg_count = value.split(',')[0];
		//alert(old_msg_count);
		var href = value.split(',')[1];
		
		// check
		var msg_delta = msg_count - old_msg_count;
		if (msg_delta > 0)
		{
			var link = document.createElement('a');
			link.href = href;
			link.innerHTML = "(new) ";
			//link.title = "";
			link.style.cssText = "color: green;";
			cur_topics[i].childNodes[0].insertBefore(link, cur_topics[i].childNodes[0].childNodes[0]);
		}else
		{
			var link = document.createElement('a');
			link.href = href;
			link.innerHTML = "» ";
			link.style.cssText = "text-decoration: none;";
			cur_topics[i].childNodes[0].insertBefore(link, cur_topics[i].childNodes[0].childNodes[0]);
		}
	}
}

function forum_messages()
{
	var messages;
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++)
	{
		if (tables[i].className == "table3 forum c_darker td_bordered")
		{
			messages = tables[i].childNodes[1].childNodes;
			//alert("gotcha");
			break;
		}
	}
	
	link = messages[messages.length-2].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
	topic_id = link.href.split('&')[0];
	//alert(topic_id);
	var old = getVar(topic_id);
	if (old != undefined)
	{
		old = old.split(",")[0];
		//alert(old + " | " + link.innerHTML);
		if (old - link.innerHTML > 0) {return;}
	}
	setVar(topic_id, link.innerHTML + "," + link.href)
	//alert(keys);
	GM_setValue("keys", keys.join('|'));
	GM_setValue("values", values.join('|'));
	GM_setValue("index", index);
}

readData();
if (document.URL.indexOf('forum.php') >= 0) forum_php();
if (document.URL.indexOf('forum_thread.php') >= 0) {forum_thread();}
if (document.URL.indexOf('forum_messages.php') >= 0) {forum_messages();}

//alert(document.URL);
// ==/UserScript==