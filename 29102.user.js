// ==UserScript==
// @name          backpack tagcloud
// @namespace     http://thomd.net/userscript
// @description   inserts a tagcloud of your backpack tags on the top sidebar
// @include       http://*.backpackit.com/*
// @include       https://*.backpackit.com/*
// @author        Thomas Duerr
// @version       0.3.1
// @date          2010-05-11
// @change        changed url for script-updater-check and increased check interval to limit unnecessary server load on userscripts.org.
// ==/UserScript==


//
// xpath helper
//
function $x(p, context){
  contextNode = context || document;
  var i, arr = [], xpr = document.evaluate(p, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}


//
// sort helper: comparison function for an array of objects
//
var by = function(name){
	return function(o, p){
	    var s = name == 'count' ? -1 : 1;
		var a = typeof o[name] == 'string' ? o[name].toLowerCase() : o[name];
		var b = typeof p[name] == 'string' ? p[name].toLowerCase() : p[name];
		if(a === b){
			return 0;
		}
		if(typeof a === typeof b){
			return a < b ? -s : s;
		}
		return typeof a < typeof b ? -s : s;
	};
};



// configuration
var tags = [];
var cloud = {};

var minFontSize = 10;
var maxFontSize = 24;
var fontSizeRange = maxFontSize - minFontSize;

var minOpacity = 40;
var maxOpacity = 100;
var opacityRange = maxOpacity - minOpacity;

var tagSource = "http://" + document.location.host + "/pages";


// remove old taglist
if(document.getElementById("tag_list")){
	document.getElementById("tag_list").parentNode.removeChild(document.getElementById("tag_list"));
}


// parse tags from "All pages" page
GM_xmlhttpRequest({
	method: 'GET',
	url: tagSource,
	onload: function(response){

		// create a div to store the returned html, so we can use the DOM to get the tags
		var container = document.createElement('div');
		container.setAttribute('id', 'backpackTags');
		container.setAttribute('name', 'backpackTags');
		container.innerHTML = response.responseText;
		// get all the anchors in the returned html
		var maxTagCount = 0;
		var minTagCount = 10000;
        var links = $x(".//div[@class='tag']/a[contains(@href, 'tags')]", container);
		for(var i = 0; i < links.length; i++){
			var tagName = links[i].textContent;
			var tagUrl = links[i].href;
			var count = $x(".//span[@class='page_count']", links[i].parentNode);
			var tagCount = count.length == 1 ? count[0].textContent : 1;
			if(parseInt(tagCount) > parseInt(maxTagCount)) maxTagCount = tagCount;
			if(parseInt(tagCount) < parseInt(minTagCount)) minTagCount = tagCount;
			tags.push({
				'alpha': tagName,
				'link':  tagUrl,
				'count': parseInt(tagCount) 
			})
		}
		cloud.max = Math.log(maxTagCount);
		cloud.min = Math.log(minTagCount);
		cloud.range = cloud.max == cloud.min ? 1 : cloud.max - cloud.min;
		calculateFontSize();

		tags.sort(by(GM_getValue("sortdirection", "alpha")));
		buildTagCloud();
	}
});



// calculate font-size and opacity (logarithmic scaling)
var calculateFontSize = function(){
	for(i = 0; i < tags.length; i++){
		var fontSize    = minFontSize + fontSizeRange * (Math.log(tags[i].count) - cloud.min)/cloud.range;
		tags[i].fsize   = Math.ceil(fontSize);

		var fontOpacity = minOpacity + opacityRange * (Math.log(tags[i].count) - cloud.min)/cloud.range;
		tags[i].opacity = Math.ceil(fontOpacity) / 100;
	}
}



// build tagcloud
var buildTagCloud = function(){

	// get header-color
	var elem = $x("//span[@class='pipe_separated_links']/a")[0] || $x("//a[@class='link_to_page']")[0];
	var color = window.getComputedStyle(elem, null).color;
	var css  = "div#Sidebar div#Pages div.search h1 {font-size: 11px; font-weight: bold; margin: 16px 0 0 5px; padding: 0; display: block; float: left;} ";
	    css += "div#Sidebar div#Pages div.search span.sort {font-size: 11px; margin: 16px 0 0 0; padding: 0; display: block; float: right;} ";
	    css += "div#Sidebar div#Pages div.search span.selected {font-weight: bold;} ";
	    css += "div#Sidebar div#Pages div.search a.sort {color: "+color+"; font-size: 11px; margin: 0; padding: 0; display: inline; text-decoration: none;} div#Sidebar div#Pages div.search a.sort:hover {background: transparent; text-decoration: underline;} ";
	    css += "div#Sidebar div#Pages ul.tagcloud {overflow:hidden; margin: 10px 0 -5px -5px; padding: 10px 0;} ";
	    css += "div#Sidebar div#Pages ul.tagcloud li {float:left; list-style:none; height: 18px; line-height: 0;} ";
	    css += "div#Sidebar div#Pages ul.tagcloud a {display: inline; margin: 0px; color: #111; font-size: 10px; padding: 2px 2px 2px 10px; text-decoration: none; outline: none;} ";
	    css += "div#Sidebar div#Pages ul.tagcloud span {margin: 0px; color: #666; font-size: 10px; } ";
	    css += "div#Sidebar div#Pages ul.tagcloud a:hover {color: #666; text-decoration: underline; background: none;} ";
	GM_addStyle(css);


	// this is the container for the tag-cloud
	var searchField = $x("//div[@id='Pages']/div[@class='search']")[0];

	// headline
	var h1 = document.createElement("h1");
	h1.appendChild(document.createTextNode("Tagged"));
	searchField.appendChild(h1);

	// sort-links
	var sortLinksContainer = document.createElement("span");
	sortLinksContainer.id = "sortLinks";
	sortLinksContainer.appendChild(buildSortBy(GM_getValue("sortdirection", "alpha")));
	searchField.appendChild(sortLinksContainer);

	// float clearing
	var clear = document.createElement("div");
	clear.style.clear = "both";
	searchField.appendChild(clear);		

	// tagcloud container
	var tagContainer = document.createElement("div");
	tagContainer.id = "tagcloud";
	tagContainer.appendChild(buildTagList());
	searchField.appendChild(tagContainer);
}



// build sort-by link
var buildSortLink = function(name){
	var a = document.createElement("a");
	a.href = "#";
	a.className = "sort";
	a.appendChild(document.createTextNode(name));
	a.addEventListener('click', function(){
		tags.sort(by(name));
		document.getElementById('tagcloud').replaceChild(buildTagList(name), document.getElementById('tagcloud').firstChild);
		document.getElementById('sortLinks').replaceChild(buildSortBy(name), document.getElementById('sortLinks').firstChild);
		GM_setValue("sortdirection", name);
	}, false);
	return a;
}


// build selected sort-by name
var buildSortName = function(name){
	var span = document.createElement("span");
	span.className = "selected";
	span.appendChild(document.createTextNode(name));
	return span;
}


// build "Sort by alpha | count"
var buildSortBy = function(name){
	var sort = document.createElement("span");
	sort.className = "sort";
	sort.appendChild(document.createTextNode('Sort by '));
	if(name == 'alpha'){
		sort.appendChild(buildSortName('alpha'));
	} else {
		sort.appendChild(buildSortLink('alpha'));
	}
	sort.appendChild(document.createTextNode(' | '));
	if(name == 'alpha'){
		sort.appendChild(buildSortLink('count'));
	} else {
		sort.appendChild(buildSortName('count'));
	}
	return sort;
}


// build List of Tags
var buildTagList = function(sort){
	var ul = document.createElement("ul");
	ul.className = "tagcloud";
	for(i = 0; i < tags.length; i++){
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.href = tags[i].link;
		a.style.fontSize   = tags[i].fsize + "px";
		a.style.opacity    = tags[i].opacity;
		a.appendChild(document.createTextNode(tags[i].alpha));
		li.appendChild(a);

		if(tags[i].count > 1){
			var span = document.createElement("span");
			span.appendChild(document.createTextNode("("+tags[i].count+")"));
			li.appendChild(span);
		}

		ul.appendChild(li);
	}
	return ul;
}


//
// ChangeLog
// 2008-06-18 - 0.1   - created
// 2008-09-02 - 0.2   - sort tags by alpha or by count
// 2009-03-27 - 0.3   - bugfixing due to changed DOM
// 2010-05-11 - 0.3.1 - changed url for script-updater-check and increased check interval to limit unnecessary server load on userscripts.org.
//




//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;


    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };


    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };


    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };


    // initialization
    var initialize = function(options){
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();


// initialize updater
userscriptUpdater.init({
    scriptId:       "29102",
    currentVersion: "0.3.1",
    injectInto:     document.getElementById("Main")
});
