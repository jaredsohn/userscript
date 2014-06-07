// ==UserScript==
// @name	Reddit Friend Colors
// @description	Cool way to show friends in colors on Reddit
// @include	http://www.reddit.com/*
// @exclude	http://www.reddit.com/static/*
// @exclude	http://www.reddit.com/prefs/*
// ==/UserScript==

var msToAppear = 500;
var msToDisappear = 500;

// yup, well-named variables
var asdf = false;
var open = false;
var openUser, openUserAddr, selectorX, selectorY;

// styles
var rfc_style = "div#rfc { display: none; position: fixed; top: 200px; left: 200px; background-color: #fff; border: 1px solid #77a; padding: 2px; background-color: #ddf; } div#rfc h2 div { float: right; } fieldset.rfc_category { margin: 10px 0; border: 1px solid #77a; padding: 2px; } fieldset.rfc_category input[type='text'] { font-size: 10px; width: 200px; } fieldset.rfc_category .label { display:inline-block; width: 60px; } #rfc_selector_title { margin:0;padding:0 2px;border-bottom:1px solid #aae;background-color:#ccf } #rfc_selector_list li:hover { background-color: #aaf; }";

var selector_style = "padding:0; border: 1px solid #666666; overflow:auto; background:#F8F8F8; position:absolute; top:0; left:0; display:none;";

var category_styles;

var loaded_filters;

// and here... we... go
letsgo();

function letsgo() {
	doPrefs(); // create preferences window
	createStyles(); // put styles on the page
	createSelector(); // create selector
	doFilter(); // load the filters
}

// first-timer's categories
function firstTime() {
	var user = "";
	try {
		// steal the username in the page
		xp('//div[@id="header-bottom-right"]//span//a').forEach(function(a) {
			user = a.textContent;
		});
	} catch (e) {GM_log(e);}
	loaded_filters = "[" + 
		"{'category':'me','users':'" + user + "','color':'#ccf','style':'padding: 0 20px;','poststyle':'background-color: #ddf;'}," +
		"{'category':'friends','users':'','color':'#afa','style':'','poststyle':'background-color: #efe;'}" +
		"{'category':'trolls','users':'','color':'','style':'font-style: italic;','poststyle':'color: #999;'}" +
		"']";
	saveFilters(loaded_filters);
}

function trim(s) {
   return s.replace(/^\s+|\s+$/g,"");
}

function foreach(seq, callback){
	for(var i=0;i<seq.length;++i){
		callback(seq[i]);
	}
}

function loadFilters() {
	var json = GM_getValue('rfc_friends');
	//GM_log('Loading colorful friends: ' + json);
	
	loaded_filters = eval('(' + json + ')');
	// load filter or create the default ones
	return loaded_filters ? loaded_filters : firstTime();
}

function saveFilters(filters) {
	var json = '[';// convert to JSON
	var filter;
	for (var i = 0; i < filters.length; ++i) {
		filter = filters[i];
		
		if (i > 0) {
			json += ', ';
		}
		json +=
			'{ ' +
			"'category' : '" + filter.category + "'," +
			"'users' : '" + filter.users + "'," +
			"'color' : '" + filter.color + "'," +
			"'style' : '" + filter.style + "'," +
			"'poststyle' : '" + filter.poststyle + "'" +
			' }';
	}
	json += ']';
	
	//GM_log('Saving friend colors: ' + json);
	GM_setValue('rfc_friends', json);
}

function buildPatterns (filters) {
	var patternTable = [];
	var filter, filterPatterns;
	
	for (var i = 0; i < filters.length; ++i) {
		filter = filters[i];
		
		filterPatterns = { 'category' : 'default', 'user' : [], 'color' : '', 'style' : '', 'poststyle' : '' };
		
		if (filter.users) {
			// add user patterns
			foreach(filter.users.split(/\s*,\s*/),function(pattern){
				filterPatterns.user.push('http://www.reddit.com/user/' + trim(pattern.toLowerCase()));
			});
		}
		
		filterPatterns.category = filter.category;
		filterPatterns.color = filter.color;
		filterPatterns.style = filter.style;
		filterPatterns.poststyle = filter.poststyle;
		
		patternTable.push(filterPatterns);
	}

	return patternTable;
}

function highlight(elem, category) {
	// username style
	klass = 'rfc_' + category;
	var klassArr = elem.className.split(' ');
	(klassArr.indexOf(klass) > -1)?klassArr:klassArr.push(klass);
	klass = klassArr.join(' ');
	elem.className = klass;
	
	// post style
	klass = 'rfc_post_' + category;
	elem = elem.parentNode.parentNode;
	klassArr = elem.className.split(' ');
	(klassArr.indexOf(klass) > -1)?klassArr:klassArr.push(klass);
	klass = klassArr.join(' ');
	elem.className = klass;
}

function doFilter() {
	var filters = buildPatterns(loadFilters());
	var links, link, filter, pattern;
	var match = false;
	
	xp('//div[starts-with(@class,"entry")]//a[contains(@class,"author")]').forEach(function(a) {
		match = false;
		a.className = a.className.replace('rfc_','');
		for (var k = 0; k < filters.length; ++k) {
			filter = filters[k];
			// clear post styles
			a.parentNode.parentNode.className = a.parentNode.parentNode.className.replace('rfc_post_' + filter.category,'');
			// clear name styles
			a.className = a.className.replace('rfc_' + filter.category,'');

			for (var l = 0; !match && l < filter.user.length; ++l) {
				pattern = filter.user[l];
				
				if (pattern == a.href.toLowerCase()) {
					match = true;
					break;
				}
			}
			
			if (match) {
				highlight(a, filter.category);
				break;
			}
		}
		a.addEventListener('mouseover', rfc_show, false);
		a.addEventListener('mouseout', rfc_hide, false);
	});
}

function reSerialize() {
	var filters = [];
	var container = document.getElementById('rfc_friends');
	var node, filter, subnodes, input;

	for (var i = 0; i < container.childNodes.length; ++i) {
		node = container.childNodes[i];
		filter = {'users' : '', 'color' : '', 'style': '', 'poststyle' : ''};

		subnodes = node.getElementsByTagName('input');
		for (var j = 0; j < subnodes.length; ++j) {
			input = subnodes[j];
			input.value = input.value.replace(/'/g,'"');
			
			if (input.type == 'text' && input.value) {
				if (input.className == 'rfc_category')
					filter.category = input.value;
				else if (input.className == 'rfc_users')
					filter.users = input.value;
				else if (input.className == 'rfc_color')
					filter.color = input.value;
				else if (input.className == 'rfc_style')
					filter.style = input.value; // TODO: Regex to add semicolon in the end if missing
				else if (input.className == 'rfc_poststyle')
					filter.poststyle = input.value; // TODO: Regex to add semicolon in the end if missing
			}
		}
		filters.push(filter);
	}
	return filters;
}

function deSerialize(filters) {
	var filter;
	var container = document.getElementById('rfc_friends');
	container.innerHTML = '';
	for (var i = 0; i < filters.length; ++i) {
		filter = filters[i];
		prefsAddFilter(filter.category, filter.users, filter.color, filter.style, filter.poststyle);
	}
}

function doPrefs() {
	//GM_log("loading prefs");
	var newDiv = document.createElement('div');
	newDiv.id = 'rfc';
	newDiv.innerHTML = '<h2>Reddit Friend Colorer <div onclick="rfc_closeSettings()">X</div></h2>' +
		'<div id="rfc_friends"></div><input id="rfc_addfilter" type="button" class="btn" value="add filter" /> <input id="rfc_savefilters" type="button" class="btn" value="save filters" />';

	document.getElementsByTagName("body")[0].appendChild(newDiv);

	document.getElementById('rfc_addfilter').addEventListener('click', function() {
		prefsAddFilter('unnamed', '', '', '', '');
	}, false);
	document.getElementById('rfc_savefilters').addEventListener('click', function() {
		saveFilters(reSerialize());
		//rfc_closeSettings();
		createStyles()
		doFilter();
		deSerialize(loadFilters());
	}, false);

	deSerialize(loadFilters());
}

function prefsAddFilter(category, users, color, style, poststyle) {
	var container = document.getElementById('rfc_friends');
	var newFilter = document.createElement('div');
	var fieldset = document.createElement('fieldset');
	fieldset.className = 'rfc_category ' + (category ? 'rfc_post_' + category : '');
	
	var msg1 = "Comma-separated list.";
	var msg2 = "Has to be well-formatted CSS.";
		
	fieldset.innerHTML = '<legend class="rfc_'+ (category ? category : '') +'">' + (category ? category : '') + '</legend>' +
		'<div class="label">category:</div> <input class="rfc_category" type="text" value="' + (category ? category : '') + '" />' +
		'<div class="label">users:</div> <input title="'+msg1+'" class="rfc_users" type="text" value="' + (users ? users : '') + '" /><br>' +
		'<div class="label">bg color:</div> <input class="rfc_color" type="text" value="' + (color ? color : '') + '" />' +
		'<div class="label">nick style:</div> <input title="'+msg2+'" class="rfc_style" type="text" value="' + (style ? style : '') + '" /><br>' +
		'<div class="label">post style:</div> <input title="'+msg2+'" class="rfc_poststyle" type="text" size="50" value="' + (poststyle ? poststyle : '') + '" />';
		
	newFilter.appendChild(fieldset);

	var removeButton = document.createElement('input');		
	removeButton.type = 'button';
	removeButton.class = 'btn';
	removeButton.value = 'remove this filter';
	removeButton.addEventListener('click', function() {container.removeChild(newFilter);}, false);
	
	fieldset.appendChild(removeButton);
	container.appendChild(newFilter);
}

function openSettings() {
	var settings = document.getElementById('rfc');
	settings.style.display = 'inline-block';
}

function rfc_closeSettings() {
	var settings = document.getElementById('rfc');
	settings.style.display = 'none';
}

function createSelector() {
	var filters = buildPatterns(loadFilters());
	var div = createElement('div', {id:"rfc_selector", style:selector_style}, null);
	var title = createElement('div', {id:"rfc_selector_title"}, null, "Friend color ");
	var span = createElement('span', {id:"rfc_openSettings",title:"Settings"}, 'click openSettings false', "&#9874;");
	title.appendChild(span);
	div.appendChild(title);
	div.onmouseover = function() { asdf = true; };
	div.onmouseout = function() { rfc_hide(); };
	
	var ul = createElement('ul',{id:"rfc_selector_list", style:"list-style:none;margin:0;padding:5px;"}, null);
	
	var li;
	for (var f in filters) {
		li = createElement('li', null, 'click selectThis false', filters[f].category);
		ul.appendChild(li);
	}
	div.appendChild(ul);
	
	document.getElementsByTagName('body')[0].appendChild(div);
}

function loadList() {
	var filters = buildPatterns(loadFilters());
	var match = false;
	var ul = document.getElementById("rfc_selector_list");
	ul.innerHTML = "";
	
	var li;
	for (var f in filters) {
		filter = filters[f];
		match = false;
		
		for (var l = 0; !match && l < filter.user.length; ++l) {
			pattern = filter.user[l];
			
			if (pattern == openUserAddr.toLowerCase()) {
				match = true;
				break;
			}
		}
		
		li = createElement('li', null, 'click selectThis false', filter.category);
		ul.appendChild(li);
		if (match) {
			li.style.fontWeight = "bold";
			li.textContent = li.textContent;
		}
	}
}

function rfc_show(evt) {
	var selector = document.getElementById("rfc_selector");
	
	asdf = true;
		
	openUser = ""+this.textContent;
	openUserAddr = ""+this;

	var selectorY = parseInt(evt.pageY,10);
	var selectorX = parseInt(evt.pageX,10)+10;
	try {
		setTimeout(function() {
			if (asdf && !open) {
				selector.style.display = "block";
				selector.style.top = selectorY + "px";
				selector.style.left = selectorX + "px";
				open = true;
				loadList();
			}
		}, msToAppear);
	} catch(e) {
	}
}

function rfc_hide() {
	var selector = document.getElementById("rfc_selector");
	asdf = false;
	open = false;
	try {
		setTimeout(function() {
			if (!asdf) {
				selector.style.display = "none";
				openUser = "";
				openUserAddr = "";
			}
		}, msToDisappear);
	} catch(e) {
	}
}

function selectThis() {
	var filters = buildPatterns(loadFilters());
	var cat = this.textContent;
	var match = false;
	var userarr;
	
	for (var f in filters) {
		var filter = filters[f];
		if (filter.category == cat) {
			userarr = (""+filter.user).split(/\s*,\s*/);
			match = false;
			for (var u in userarr) {
				if (userarr[u] == openUserAddr.toLowerCase())
					match = true;
			}
			
			if (match)
				removeUser(cat,openUser);
			else
				addUser(cat,openUser);
		}
	}
}

function removeUser(category,user) {
	var filters = loadFilters();
	
	for (var f in filters) {
		if (filters[f].category == category) {
			filters[f].users = filters[f].users.replace(user,'');
			filters[f].users = filters[f].users.replace(/,$/,''); // soptisticated way of removing the last comma
			break;
		}
	}
	
	saveFilters(filters);
	loadList();
	doFilter();
}

function addUser(category,user) {
	var filters = loadFilters();
	//GM_log('Adding user ' + user);
	for (var f in filters) {
		if (filters[f].category == category) {
			filters[f].users += ','+user;
			filters[f].users = filters[f].users.replace(/^,/,''); // soptisticated way of removing the comma in the beginning
			break;
		}
	}
	
	saveFilters(filters);
	loadList();
	doFilter();
}

function createStyles() {
	var style;
	
	// load in the beginning
	if (category_styles == undefined) {
		style = createElement('style', {type:"text/css"}, null);		
		style.textContent = rfc_style;
	}
	else // reuse when saving
		style = category_styles;

	var filters = loadFilters();
	
	for (var f in filters) {
		// names
		style.textContent += ".rfc_" + filters[f].category + '{' + filters[f].style + 
			' background-color:' + ((filters[f].color)?filters[f].color:'transparent') + '} ';
		// posts
		style.textContent += ".rfc_post_" + filters[f].category + '{' + filters[f].poststyle + '} ';
	}
	
	document.getElementsByTagName('head')[0].appendChild(style);
}


/* GENERIC FUNCTIONS */
function xp(p, context) {
  if (!context) 
	context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function createElement(type, attrArray, evtListener, html) {
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)) {
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener) {
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent) {
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent) {
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

if (typeof GM_log === "undefined") {
	GM_log = function (msg) {};
}
if (typeof GM_setValue === "undefined") {
	GM_setValue = function (name, value) {
		var expdate = new Date();
		expdate.setTime(expdate.getTime() + 64800000000);//~2 years
		var expires = "; expires=" + expdate.toGMTString();
		document.cookie = name+"="+value+expires+"; path=/";
	}
}
if (typeof GM_getValue === "undefined") {
	GM_getValue = function (name) {
		var regex = new RegExp(';?\s*'+escape(name)+'=([^;]+)');
		return document.cookie.match(regex);
	}
}