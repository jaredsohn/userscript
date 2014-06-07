// ==UserScript==
// @name           Youtube Filter
// @namespace      http://userscripts.org/users/266001
// @description    Rudimentary script (i.e. has no UI) that hides Youtube videos by people with certain usernames
// @include        *://www.youtube.com/*
// @license        http://creativecommons.org/licenses/by/3.0/
// @grant          GM_setValue
// @grant          GM_getValue
// @version        2
// ==/UserScript==

var users;

try {
	var stored = GM_getValue('users'); // Users to be removed
	users = stored.split(', ');
}
catch (hmph) {
	GM_setValue( 'users', 'sxephil, TheFineBros' );
	users = [ 'sxephil', 'TheFineBros' ];
}
var nextvid = window.location.href.replace( /&page=([0-9]+)/g,
											'&page=' + ( parseInt( window.location.href.replace( /.*&page=([0-9]+).*/g, "$1" ) ) ) + 1
										  );
var last = '';

// Appends stuff to an array by copying the original and modifying the copy.
// Doesn't modify the original array.
function arrAppend(arr, val) {
	var nArr = arr.slice(0);
	nArr.push(val);
	return nArr; }

// A trampoline.
function trampoline(func) {
	if (typeof func == "function") {
		var func2 = func();
		while (typeof func2 == "function") { func2 = func2(); }
		return func2; }
	else { return func; } };

// Reduce on a trampoline. The last parameter (i) technically isn't necessary. arr.slice(1)
// could be passed every time instead and arr[i] could be arr[0]. But hey, whatever.
function reducei(func, arr, init, i) {
	if (typeof arr[i] == "undefined") { return init; }
	else { return function(){ return reducei(func, arr, func(init, arr[i]), i + 1); }; } }

// A.k.a. fold. Applies some function to every element in an array.
function reduce(func, arr, init) {
	return trampoline(function() { return reducei(func, arr, init, 0); }); }

// Map implemented using reduce. Applies some function to every element in an array,
// replacing the array's value with the function's return value.
function map(func, arr) {
	return reduce(function(argh, v) { return arrAppend(argh, func(v)); }, arr, new Array()); }

// Filters stuff out of an array. Implemented using reduce.
function filter(search, arr) {
	return reduce(function(elements, curnode) {
		if (search(curnode)) { return arrAppend(elements, curnode); }
		else { return elements; } }, arr, new Array()); }

// Recursively filters stuff out of an array by getting children using the function
// child(). Must be called by trampoline. Basically the same as filter, except it
// recursively looks in children, too.
function recurseFilter(nodes, search, child) {
	return function() { return reduce(function(result, node) {
		if (search(node)) {
			return arrAppend(result, node); }
		else if (child(node)) {
			return result.concat(trampoline(function() { return recurseFilter(child(node), search, child); })); }
		else { return result; } }, nodes, new Array()); }; }

// Removes stuff out of an array (ideally, a DOM nodelist) that doesn't match
// attr = attrVal using filter. Supports regular expression matches or exact matches.
function findElementWithAttr(attr, attrVal, nodelist) {
	return filter(function(curnode) {
		var attrib = curnode.getAttribute(attr) ? curnode.getAttribute(attr) : curnode[attr];
		var search = new RegExp(attrVal);
		return attrib && (search.test(attrib) || attrib == attrVal); }, nodelist); }

/*** The actual code relevant to Youtube starts here. Everything else above is pretty generic. ***/

// Finds all <a> elements that have a href="/user/[username]" and <span> elements that say
// a video is "by [username]"
function findUserVids(user) {
	// The part of the regular expression (\?[^=]+=.*)? basically finds stuff like
	// ?featured=[blahblahblah], assuming they exist.
	return findElementWithAttr("href", "/user/" + user + "(\\?[^=]+=.*)?", document.getElementsByTagName("a")).
	concat(
		findElementWithAttr( 'data-context-item-user', user, document.getElementsByTagName('li')).
		concat(
			findElementWithAttr( 'data-context-item-user', user, document.getElementsByTagName('div')).
			concat(
				findElementWithAttr( 'innerHTML', user, document.getElementsByClassName('yt-user-name'))
			)
		)
	);
}

// Recursively finds the parent container for this node. Won't go beyond body tag. Going all the
// way to the point where node is null seems to cause errors, even if we try to catch a null node.
function getParentContainer(node) {
	if ( node.getAttribute("class") && 
		(
			node.getAttribute("class").indexOf("*sr") != -1 ||
			node.getAttribute("class").indexOf("yt-uix-tile") != -1 ||
			node.getAttribute('class').indexOf('feed-item-container') != -1 ||
			node.getAttribute('class').indexOf('video-list-item') != -1
		)
	) {
		return node;
	}
	else if (node.nodeName != "BODY") { return function() { return getParentContainer(node.parentNode); }; }
	else { return false; }
}

// This function is definitely not pure. :-D It returns a different youtube image server each time
// it's called.
function randServer() {
	var servers = ["i1", "i2", "i3", "i4"];
	// The Math.floor() expression below gives any random number between 0 and servers.length - 1 (i.e. 3).
	return servers[Math.floor(Math.random() * servers.length)]; }

// Recursively finds the parent container for an image node that hopefully has a link
// to the video for this video preview. Returns the video preview image url for an <img>
// tag (node is presumably an <img> element) or false, if no url could be found.
function getVideoPreviewImage(node) {
	if (node.getAttribute("href") && (node.getAttribute("href").indexOf("/watch?v=") != -1 || node.getAttribute("href").indexOf("/view_play_list") != -1)) {
		return "http://" + randServer() + ".ytimg.com/vi/" + node.getAttribute("href").replace(/\/.*(\?v|&v)=([^&]+)&?.*/g, "$2") + "/default.jpg"; }
	else if (node.nodeName != "BODY") { return function() { return getVideoPreviewImage(node.parentNode); }; }
	else { return false; } }

// Maps a function that adds the image src to every video preview in search results.
function loadImages() {
	return map(function(img) {
		if(!img.getAttribute("set")) {
			// Set an attribute that tells us if an image src already been set, so
			// we don't do it over and over (unnecessarily, too).
			img.setAttribute("set", "true");
			
			var newsrc = trampoline(function() { return getVideoPreviewImage(img); });
			img.src = newsrc ? newsrc : img.src; // Only set if getVideoPreviewImage actually got an image url.
			
			return img.src; }
		else { return "Already set to: " + img.src; } }, document.getElementsByTagName("img")); }

/*** The two functions below have the side-effect of removing an element from the #document. ***/

// Maps a function that removes the parent container for the unwanted user's videos to a
// DOM node list that has all the elements that might have the user's name within an
// element containing a link to their video.
function removeUserVids(user) {
	return map(function(node) {
		var par = trampoline(function() { return getParentContainer(node); });
		
		// Unfortunately, removing the elements or completely hiding them prevents the
		// image previews from loading properly.
		// console.log(par);
		if (par && par.parentNode && par.parentNode.removeChild(par)) { return true; }
		else { return false; } }, findUserVids(user)); }

// Maps the function above to multiple user names.
function removeUsersVids(arrusers) {
	return map(function(user) {
		if(removeUserVids(user)) { return true; }
		else { return false; } }, arrusers); }

// Simulates creating a new DOMDocument from an HTML string. Basically, this
// function loads some HTML into the innerHTML of a <div> that isn't added to
// the page (so the user doesn't see anything). Then, a few functions (getElementById
// and getElementsByClassName) are added to the <div> so it seems more like an
// actual DOMDocument.
function makeDOMFromHTML(html) {
	var dom = document.createElement("div");
	dom.innerHTML = html;
	
	// Basically the exact same thing as the function findElementWithAttr() passes to filter().
	var search = function(node, attr, val) {
		if (node[attr] && node[attr].indexOf(val) != - 1) { return true; }
				else { return false; } };
	
	dom.getElementById = function(id) {
		return trampoline(function() { return recurseFilter(dom.childNodes,
			function(node) { return search(node, "id", id); },
			function(child) { return child.childNodes; }); }); };

	dom.getElementsByClassName = function(name) {
		return trampoline(function() { return recurseFilter(dom.childNodes,
			function(node) { return search(node, "className", name); },
			function(child) { return child.childNodes; }); }) };

	return dom; }

// Loads more videos and modifies the page links (at the bottom) so that pages
// that have been added to this page are removed. E.g. if we loaded page 2's content
// and we're on page 1, the next page is page 3. This function makes things load
// relatively slowly if each page only has very few items (fewer than ten) that are
// not by the user we don't want. Applies to search results page only.
function loadMoreVids(url) {
	var pages = document.getElementsByClassName("search-footer")[0]; // <div> containing pages at the bottom
	var vgrid = document.getElementById("search-results"); // <div> containing all the videos on the page.
	
	// When search results initially load, the page number isn't there. Get the next
	// page's url from the next link, if this is the case.
	//if(url.indexOf("aq=f") != -1) {
	//	var get = findElementWithAttr("innerHTML", "Next", pages.getElementsByTagName("a"))[0].href; }
	//else {
	var get = url;
	if ( url.indexOf('page') == -1 ) {
		get += '&page=2';
	}
	//}

	var ajaxLoader = document.createElement('img');
	// Only load the next page if this is a results page and there are fewer than ten videos displayed.
	// Basically, this doesn't apply in most cases, but when it does, it makes the lack of videos less
	// noticeable.
	if ( get.indexOf("results") != -1 ) {
		// Insert loader gif.
		try {
			var pgr = document.getElementsByClassName('yt-uix-pager')[0];
			ajaxLoader.width = 32;
			ajaxLoader.height = 32;
			ajaxLoader.style.margin = '0 auto';
			ajaxLoader.style.display = 'block';
			ajaxLoader.alt = 'Loading...';
			ajaxLoader.src = 'data:image/gif;base64,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';
			pgr.parentNode.insertBefore( ajaxLoader, pgr );
		}
		catch (e) {
			console.log(e);
		}


		var xhr = new XMLHttpRequest();
		xhr.open("GET", get); // Do an XHR request that gets the HTML for the next page
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				// Simulate a new DOMDocument from the HTML of the next page
				var dom = makeDOMFromHTML(xhr.responseText);
				// Get all the videos from the next page in an array
				var vids = dom.getElementsByClassName('yt-uix-tile');
				
				// Add the videos retrieved to the actual window.
				map(function(node) {vgrid.appendChild(node); return node; }, vids);

				// Remove videos by users and load videos' images. We can't rely on
				// setInterval to make sure users' videos are removed in a manner timely 
				// enough that when this function is called again, all the users'
				// videos are removed.
				removeUsersVids(users);
				loadImages();
				
				nextvid = get.replace( /&page=([0-9]+)/g, '&page=' + ( parseInt( get.replace(/.*&page=([0-9]+).*/g, "$1") ) + 1 ) );
				
				try {
					ajaxLoader.style.display = 'none';
				}
				catch(e) {
					console.log(e);
				}
			}
		};
	}
}

// Forces videos to be removed immediately and loads more videos if there are fewer than ten.
removeUsersVids(users);
loadImages();
// loadMoreVids(window.location.href.replace(/&page=([0-9]+)/g, "&page=" + (parseInt(window.location.href.replace(/.*&page=([0-9]+).*/g, "$1")) + 1)));

// Removes stuff every half a second. 'Cause, y'know, Youtube uses AJAX and can load stuff
// from its servers whenever.
var inter = setInterval(function() {
	removeUsersVids(users);
	loadImages();
}, 500);

window.addEventListener(
	'scroll',
	function(e) {
		try {
			var elem = document.getElementsByClassName('yt-uix-pager')[0];
			var loc = elem.offsetTop + elem.offsetHeight - document.documentElement.offsetHeight;

			if ( loc < document.documentElement.scrollTop ) {
				if ( last != nextvid ) {
					last = nextvid;
					
					loadMoreVids( nextvid );
				}
			}
		}
		catch (err) {
			console.log('Not on search results page.');
			try {
				clearInterval(inter);
			}
			catch (err2) {
				console.log(err2);
			}
		}
	}
);