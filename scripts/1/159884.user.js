/* Neetzan Zimmerman Post Destroyer for Gawker.com */
/* David Arbuckle */
/* Created: April 2012 */
/* Updated: February 2013*/

// ==UserScript==
// @name			Neetzan Zimmerman Post Destroyer for Gawker.com
// @grant			none
// @description		Removes all Neetzan Zimmerman posts from Gawker. Or any author's posts. From any Gawker property.  
// @include			/https?://(blog\.)?(gawker|jezebel|gizmodo|io9|lifehacker|deadspin|kotaku|jalopnik)\.com/?([A-Za-z/0-9]+)?/
// ==/UserScript==

(function ($) {
	/*	Rewriting this script to accomplish the following:
	 *	- Generalize so that it can be used to remove *any* posts by any author.
	 *	- Add option to remove posts entirely, or to highlight posts in some other way.
	 *	- Store information about posts in the client's browser, so that excessive XHR requests aren't necessary.
	 *	- Work on blog.[gawkerproperty].com as well.
	 *	- Remove jQuery dependency.
	 */

	// Authors can have their posts removed from the page, highlighted so that they stand out, or hidden so that they are easy to ignore.
	var Authors = {
		'Neetzan Zimmerman': 'remove'
		//'Hamilton Nolan': 'hide', // You're great HamNo, sorry! It's an example!
		//'Caity Weaver': 'highlight'
		};
		
		
	var Queue = {},
		ProcessedElements = {},
		showProcessedResult = true;
		
		/* 
		 *	These are the selectors and such that are used by the script to marshal data and process posts.  
		 *	All of these are prone to breaking as Gawker updates their sites, which is why it's aggregated here for easy updates.
		 */
		postListID = 'post_list', // id for the right rail element that is dynamically updated with new posts.
		classLabel = 'a.headline', // classname for [gawkerproperty].com/etc links in the list of posts.
		blogClassLabel = '.post', // classname for blog.[gawkerproperty].com post elements.
		postListWrapperTagName = 'LI', // tag name for wrapper to apply styles to in the post list.
		postAuthorRE = new RegExp(/plus-icon modfont\"\>([A-Za-z ]+)/), //RegExp for getting the author's name from any post.  
		postIDRE = new RegExp(/\d{7}/);

	
	// Determining if the client is on blog.[gawkerproperty].com
	function isBlog() {
		return (window.location.hostname.indexOf('blog.') !== -1) ? true : false;
	}
	
	// Gets the post author from localStorage, or initiates a web request.
	function getPostAuthor(postURL) {
		return localStorage.getItem(getPostID(postURL)) || getAuthorFromURL(postURL);
	}
		
	// Gets the post author from a URL and saves it to localStorage.
	function getAuthorFromURL(postURL) {
		Queue[getPostID(postURL)].loading = true; // set loading attribute to prevent duplicate XHR requests to the same URL.
		$.ajax({
			url: postURL,
			success: function(response){
				var author;
				// using a RegExp to extract the author name from the post.
				try {
					response = response.content || response;
					author = response.match(postAuthorRE);
					author = author[1];
				} catch (e) {
					return false;
				}
				localStorage.setItem(getPostID(postURL), author); // save result to localStorage.
				delete Queue[getPostID(postURL)].loading; // remove loading attribute.
			}
		});
	}
	
	// Extracts the post ID from a given URL.
	function getPostID(url) {
		return url.match(postIDRE); // brittle.  if Gawker changes their post IDs or a post includes a 7-digit number, this will break.
	}
	
	// Gets a list of all the posts on a page.
	function getPostsOnPage() {
		if (isBlog()) {
			return document.querySelectorAll(blogClassLabel);
		} else {
			return document.querySelectorAll(classLabel);
		}
	}


	// Helper function to walk up the parentElement chain until it gets to a LI.  
	// This is less brittle than chaining together an arbitrary number of parentElement calls to find the closest parent LI.
	function getParentLI(el) {
		if (el.parentElement === null) {
			return el.parentElement;
		} else if (el.parentElement.tagName === postListWrapperTagName) {
			return el.parentElement;
		} else {
			return getParentLI(el.parentElement);
		}
	}

	
	// adds a post Element to the queue.  Post element is an <a> targeting a post.
	function addPostToQueue(postEl) {
		if (isBlog()) {
			var url = postEl.getAttribute('data-permalink') || '';
			url = url.replace('http://', 'http://blog.'); //brittle.  Gawker does not have CORS configured in a way that permits XHR requests to alternative domains, but they do have a 30? redirect that works just fine.
		} else {
			var url = postEl.href;
			postEl = getParentLI(postEl);
		}

		if (postEl && url && !Queue[getPostID(url)]) {
			Queue[getPostID(url)] = {
				id: getPostID(url),
				href: url,
				el: postEl
			}
		}		
		return postEl;
	}
	
	// iterates over a list of post elements and pushes them into the action queue.  Used when page first loads.
	function processPostList(posts) {
		var i,
			c_posts = posts.length;
		for (i = 0; i < c_posts; i ++) {
			addPostToQueue(posts[i]);
		}
	}
	
	// runs over the queue and cleans up the page.
	function processQueue() {
		var postID, post;
		for (postID in Queue) {
			post = Queue[postID];
			if (!post.loading) {
				post.author = getPostAuthor(post.href);
			}
			
			if (post.author) {
				processPost(post.el, post.author);
				delete Queue[postID];
			}
			
		}
	}
	
	// checks if a post's author is on The List and processes it.
	function processPost(el, author) {
		
		if (author in Authors) {
			var destroyType = Authors[author];
			switch (destroyType) {
				case "remove":
					el.style.display = 'none';
					break;
				case "hide":
					el.style.opacity = 0.1;
					break;
				case "highlight":
					el.style.textShadow = '0px 0px 5px yellow';
					break;
			}

			// increment destruction counter.
			//ProcessedElements[destroyType] = ProcessedElements[destroyType] || {count:0, elements: []}
			//ProcessedElements[destroyType].count ++;
			//ProcessedElements[destroyType].elements.push(el);
		}
	}
	
	function init() {
		var queueInterval, postListEl;

		processPostList(getPostsOnPage());
		queueInterval = setInterval(processQueue, 500);
		
		if (!isBlog()) {
			postListEl = document.getElementById(postListID);
			postListEl.addEventListener("DOMNodeInserted", function(event) {
				if (event.target.tagName === postListWrapperTagName) {
					addPostToQueue(event.target.querySelector(classLabel));
				}
			});
		}
	}
	
	init();


}(jQuery));