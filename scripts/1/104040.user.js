// ==UserScript==
// @name           iGoogle Better Feeds
// @description    This script will add some functionality to RSS feeds on the iGoogle page, such as mark read, preview on mouse over, hide empty feeds. 
// @namespace      iGoogle_Better_Feeds
// @include        http://www.google.tld/ig*
// ==/UserScript==


/**
 * here you can do some configuration
 */
var ibf_use_mouseover = true;
var ibf_timer_frequency = 3; // seconds


/**
 * on the iGoogle page every feed is represeted by a FEED object that is located in the scope
 * of the unsafeWindow. The general idea of this script is to find them all and deactivate their 
 * functionality and as a replacement we create our own object for each feed that contains
 * the needed data and methods to fetch and render this feed.
 *
 * When this greasemonkey script is executed after page load it will install a timer function 
 * ibf_onTimer() and then exit. To understand what is going on you should now scroll down and 
 * continue reading with the comments on ibf_onTimer()
 */


/**
 * debug log to the console
 */
function ibf_log(x){
	//console.log(x);
}



/**
 * This function is triggered from the user menu 
 * to toggle the "Hide Empty Feeds" feature.
 */
function ibf_toggleHideEmpty(){
	var hide_empty = GM_getValue('ibf_hideEmpty');
	if (hide_empty){
		GM_setValue('ibf_hideEmpty', false);
	}else{
		GM_setValue('ibf_hideEmpty', true);
	}
}



/**
 * This is a dirty hack to let the browser decode all html-entities
 * and return the decoded string. We need this for the firefox built-in 
 * tooltip windows (title tag) since this is not able to decode them.
 */
function ibf_unescape(text) {
	if(text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var result = temp.childNodes[0].nodeValue;
		return result;
	}else{
		return "";
	}
} 


/**
 * strip all html tags and unescape
 */
function ibf_stripTags(text){
	//text = text.replace("\n","").replace("\r","");     // remove all \r or \n
	//text = text.replace(/<(p|br)\s*\/?>/g,"\n");       // convert html linebreaks to \n
	text = text.replace(/<\/?[^>]+(>|$)/g, "");        // strip all tags
	return ibf_unescape(text.replace(/^\s+|\s+$/g, ""));  // trim and unescape
}


/**
 * This will hold a reference to the mouseover popup dom object
 */
var ibf_mouseover_popup;


/**
 * When the mouse is near the popup (the user is trying to move the mouse
 * into the popup or is moving inside the popup) the other event handlers
 * must do nothing. This function is used to check whether the mouse event
 * happened inside a rectangle that is <distance> away from the border. 
 */
function ibf_isMouseNearPopup(event, distance){
	if (!ibf_mouseover_popup) return false;
	var x = event.clientX;
	var y = event.clientY;
	var l = ibf_mouseover_popup.offsetLeft;
	var t = ibf_mouseover_popup.offsetTop;
	var r = ibf_mouseover_popup.offsetLeft + ibf_mouseover_popup.offsetWidth;
	var b = ibf_mouseover_popup.offsetTop + ibf_mouseover_popup.offsetHeight;
	if (x>l-distance && x<r+distance && y>t-distance && y<b+distance){
		//ibf_log('mouse is near popup');
		return true;
	}else{
		return false;
	}
}


/**
 * This is the constructor for our own feed object. It will be created once for every
 * FEED obect that is on the iGoogle page. Its poll() method will later be called 
 * every second which in turn will trigger all functionality at appropiate times.
 */
function ibf_feed_object(FEED){
	this.FEED = FEED;
	this.a = FEED.a;
	this.first_read = GM_getValue('ibf_first_read_' + this.a);
	this.refresh_interval = GM_getValue('ibf_refresh_interval_' + this.a);
	
	// the refresh interval for each feed will be slightly adjusted 
	// during each render(), values are persisted across sessions
	if (!this.refresh_interval){
		// start with 5 minutes if this feed is new.
		// it will gradually adjust itself over time.
		this.refresh_interval = 300; 
	}
	
	// the number of currently visible items.
	// this will be updated by the render() method.
	// and it is used to determine whether to switch
	// visibility of the entire box during poll()	
	this.count = 0;
	
	
	/**
	 * rewrite the FEED.url by adding a nocache=x at the end and store
	 * it in our own object. the x will change to create a different 
	 * url every refreshInterval seconds,
 	 */
	this.urlAddNocache = function(refreshInterval){
		var d = new Date;
		var ts = d.getTime();
		var sep = "?";
		if (refreshInterval && refreshInterval > 0) {
			ts = Math.floor(ts / (refreshInterval * 1000));
		}
		if (this.FEED.url.indexOf("?") > -1) {
			sep = "&";
		}
		this.url = [ this.FEED.url, sep, "nocache=", ts ].join("");
	}
	
	
	/**
	 * Return a reference to the div that contains the feed display
	 */ 
	this.getFeedDiv = function(){
		return document.getElementById('feed_' + this.a + '_display');
	}


	/**
	 * Return a reference to the div that contains the fed title
	 */
	this.getFeedTitleDiv = function(){
		return document.getElementById('m_' + this.a + '_title');
	}


	/**
	 * Return a reference to the button box div in the feed title
	 */
	this.getFeedButtonbox = function(){
		// we are looking for the parent of the maximize button.
		// this will be the div into which we can add our own buttons.
		var maxbutton = document.getElementById('home_max' + this.a);
		if (maxbutton){
			return maxbutton.parentNode;
		}else{
			return null;
		}
	}


	/**
	 * Retun a rferece to the entire gadget box to be able to hide it entirely
	 */
	this.getFeedEntireBox = function(){
		var homebox = document.getElementById('home_box' + this.a);
		if (homebox){
			return homebox;
		}else{
			return null;
		}
	}
	
	
	/**
	 * event handler for the mark read button
	 */
	this.onMarkRead = function (){
		if (this.first_item){
			this.first_read = this.first_item;
			GM_setValue('ibf_first_read_' + this.a, this.first_read);
		}
		// empty the div
		var div = this.getFeedDiv();
		div.innerHTML = '';
		this.count = 0;
	
		// count=0 would have been sufficient, poll() would hide it anyways within 
		// one second, but we hide it immediately to have a better user experience. 
		if (GM_getValue('ibf_hideEmpty')){
			this.hideGadget();
		}
	}
	
	/**
	 * Method to hide the entire feed 
	 */
	this.hideGadget = function (){
		var homebox = this.getFeedEntireBox();
		if (homebox){
			homebox.style.display = 'none';
		}
	}
	
	
	/**
	 * Method to show the entire feed 
	 */
	this.showGadget = function (){
		var homebox = this.getFeedEntireBox();
		if (homebox){
			homebox.style.display = 'block';
		}
	}
	
	
	/**
	 * called by the mouseover handler of the list item to open a popup. This
	 * function will create and populate the popup.
	 */
	this.onMouseover = function (event, item_number){
		if(ibf_isMouseNearPopup(event, 5)) return;
		var item = this.feedData.Entry[item_number];
		var feeddiv = this.getFeedDiv();
		
		// hide any already existing popup (this should normally have happened
		// already in the onMouseout() handler but I have seen this event go missing
		// sometimes when the CPU is overly busy and the mouse is moved fast)
		if (ibf_mouseover_popup){
			ibf_mouseover_popup.style.display = 'none';
		}
		
		// try if we have a cached and valid version of it already
		ibf_mouseover_popup = item.popup;
		if (!ibf_mouseover_popup){
		
			// try if we can re-use an existing div container
			ibf_mouseover_popup = document.getElementById('ibf_popup' + this.a +'_' + item_number);
			if (!ibf_mouseover_popup){
			
				// create a new div to containn the popup contents
				ibf_mouseover_popup = document.createElement("div");
				ibf_mouseover_popup.id = 'ibf_popup' + this.a +'_' + item_number;
				ibf_mouseover_popup.addEventListener(
					"mouseout", 
					function (event){
						// links and images *inside* the popup also trigger this event!
						if (!ibf_isMouseNearPopup(event, -2)){
							ibf_mouseover_popup.style.display = 'none';
						}
					},
					true
				);
				ibf_mouseover_popup.style.cssText = "display:none; position:fixed; ";
				ibf_mouseover_popup.style.cssText += "max-height:90%; background:white; "; 
				ibf_mouseover_popup.style.cssText += "border:1px solid black; padding:1em; overflow:scroll; ";
				ibf_mouseover_popup.style.cssText += "box-shadow: 6px 6px 6px rgba(0,0,0,0.5); ";
				ibf_mouseover_popup.style.cssText += "-moz-box-shadow: 6px 6px 6px rgba(0,0,0,0.5); ";
				
				document.body.appendChild(ibf_mouseover_popup);
			}
			
			// fill it
			ibf_mouseover_popup.innerHTML = '<a href="' + item.Link + '" target="_blank">' + item.Title + '</a><br /><br />';
			ibf_mouseover_popup.innerHTML += item.Summary;
			item.popup = ibf_mouseover_popup // store a reference to it
		}
		
		// show it (was 'none' previously)
		ibf_mouseover_popup.style.display = 'block';
		ibf_mouseover_popup.style.zIndex = 1000;
		
		// calculate optimal x-position
		var mousex = event.clientX;
		var screenwidth = window.innerWidth;
		if (mousex < screenwidth/2){
			ibf_mouseover_popup.style.width = (screenwidth-mousex-120) + 'px';
			ibf_mouseover_popup.style.left = (mousex+40) +'px';
		}else{
			ibf_mouseover_popup.style.width = (mousex-80) + 'px';
			ibf_mouseover_popup.style.left = '20px';
		}
	
		// calculate optimal y-position
		var mousey = event.clientY;
		var screenheight = window.innerHeight;
		var divheight = ibf_mouseover_popup.offsetHeight;
		if (divheight+mousey-10 > screenheight){
			ibf_mouseover_popup.style.top = (screenheight-divheight) + 'px';
		}else{
			ibf_mouseover_popup.style.top = (mousey-10) + 'px';
		}
	}
	

	/**
	 * called by the mouseout handler of the list item for closing the popup
	 */
	this.onMouseout = function(event, item_number){
		if(ibf_isMouseNearPopup(event, 5)) return;
		if (ibf_mouseover_popup){
			ibf_mouseover_popup.style.display = 'none';
		}
	}


	
	/**
	 * This is our render() method. It will be called when the http request returned.
	 * the data will be found in this.feedData. The feed ID is in this.a which is used to construct 
	 * the IDs of the DIVs.
	 *
	 * This function will empty the div and rebuild its innerHTML from the feed data and also
	 * it will try to adjust the refresh interval, depending on whether there has been new data
	 * since the last refresh. 
	 */
	this._render = function(){
		var that = this;
		var feed_id = this.a;
		var count = 0;
		var div = this.getFeedDiv();
		var atitle = this.getFeedTitleDiv();
		div.style.cssText = "display: block;" // google sets it to none sometimes, don't know when exactly

		// insert the mark read button if it is not already there
		var markread = document.getElementById('markread_button_' + feed_id);
		if (!markread){
			var buttonbox = this.getFeedButtonbox();
			markread = document.createElement("a");
			markread.id = 'markread_button_' + feed_id;
			markread.appendChild(document.createTextNode("X"));
			markread.style.cssText = "margin-right: 60px; margin-top: -20px";
			markread.addEventListener("click", function(){that.onMarkRead()}, true);
			buttonbox.appendChild(markread);
		}

		if (this.feedData.Entry){
			// empty the list
			div.innerHTML = '<ul style="margin-left: 15px;"></ul>';
			var ul = div.childNodes[0];

			atitle.innerHTML = this.feedData.Title;
	
	
			// adjust the refresh interval
			var factor = 1.1;
			if (this.first_item){
				if(this.first_item != this.feedData.Entry[0].Link){
					// we have received a new item since the last time. 
					// Slightly reduce the refresh interval
					this.refresh_interval = Math.round(this.refresh_interval / Math.pow(factor, 3));
					if (this.refresh_interval < 30) this.refresh_interval = 30;
					ibf_log('adjusted refesh (-) to ' + this.refresh_interval + ' seconds for feed ' + this.a + ' (' + this.feedData.Title + ')');
				}else{
					// no change in the feed data
					if (this.extraordinary_refetch){
						// don't increase the interval as a result of accidental or
						// forced reloading (user moved gadget with mouse, etc.)
						ibf_log('extraordinary refetch, refresh interval unchanged ' + this.refresh_interval + ' seconds (' + this.feedData.Title + ')');
					}else{
						// slightly increase the refresh interval
						this.refresh_interval = Math.round(this.refresh_interval * factor);
						if (this.refresh_interval > 3600) this.refresh_interval = 3600;
						ibf_log('adjusted refesh (+) to ' + this.refresh_interval + ' seconds for feed ' + this.a + ' (' + this.feedData.Title + ')');
					}
				}
			} else {
				// Not adjusting during the first load. We don't yet know whether it is new or not.
				ibf_log('first load after initialize, refresh interval unchanged ' + this.refresh_interval + ' seconds (' + this.feedData.Title + ')');
			}
			this.extraordinary_refetch = false;
			this.first_item = this.feedData.Entry[0].Link;
	
			// now build up the list of feed items
			// but break when we encounter the first read link
			for (var i = 0; i < this.feedData.Entry.length; i++) { 
				if (this.first_read && (this.feedData.Entry[i].Link == this.first_read)){
					break;
				}
				var li = document.createElement("li");
				//li.style.cssText="margin-left: -25px;";
				var a = document.createElement("a");
				a.href = this.feedData.Entry[i].Link;
				a.target = "_blank";
				if(!ibf_use_mouseover){
					a.title = ibf_stripTags(this.feedData.Entry[i].Summary);
				}
				var t = document.createTextNode(this.feedData.Entry[i].Title);
				a.appendChild(t);
				li.appendChild(a);
				ul.appendChild(li);
				if (ibf_use_mouseover){
					(function(i){
						// we need to wrap this into an anonymous function to 
						// capture the current value of i in a closure, otherwise
						// it would just use a reference to the original i 
						a.addEventListener("mouseover", function(event){that.onMouseover(event, i)}, true);
						a.addEventListener("mouseout", function(event){that.onMouseout(event, i)}, true);
					})(i);
				}
				count += 1;
			}
			// this variable will be read by the hide empty mechanism
			this.count = count;
			
		}else{
			ibf_log('no data for feed ' + this.a + ' (' + this.FEED.url + ')');
			if (!this.first_read){
				// this might be an "empty feed", We clear the div.
				div.innerHTML = '';
				this.count = 0;
			}
			// if this feed already had data previously then we do not clear the div,
			// and also don't touch this.count.
			// most likely it is only a temporary network or server failure.
		}
		
	}
	
	
	
	/**
	 * This function will trigger the refetch (and render) process of our feed object  
	 */
	this._fetch = function(){
		var w = unsafeWindow;
		var that = this;
		w._IG_FetchFeedAsJSON(
			this.url, 
			function(data){
				if (data){
					that.feedData = data;
					try{
						that.render();
					}catch(err){
						ibf_log(err);
					}
				}else{
					ibf_log('no data for feed ' + that.a);
				}
			},
			'',
			true
		);
	}
	
	
	/**
	 * activate fetch() and render() and kill the original FEED object
	 */
	this.activate = function(){
		this.render = this._render;
		this.fetch = this._fetch;
		this.FEED.render = function(){};
		this.FEED.fetchFeedAndRender= function(){};
		this.FEED.ibf_killed = true;
		
		// re-fetch without accidentally 
		// increasing the refresh interval
		this.extraordinary_refetch = true;
		this.fetch();
		this.time_since_refresh = 0;
	}
	
	
	/**
	 * kill the fetch and render methods
	 */
	this.deactivate = function(){
		this.render = function(){}
		this.fetch = function(){}
	}
	
	
	/**
	 * This will be called every second from the ibf_onTimer() function.
	 *
	 * Our feed object is associated with one of iGoogle's FEED objects. From time to time or when the user moves 
	 * the gadget with the mouse iGoogle will suddenly reset and reinitialize its FEED objects, we have to detect 
	 * this condition and immediately deactivte the FEED object again and trigger one extraordinary fetch() and 
	 * render() of our own feed object to restore the display.
	 *
	 * Only if a FEED has viewType=3 we will do all this. The user could have changed this so we check every time.
	 *
	 * We will change the URL every 30 seconds and add the nocache=<somenumber> to the end to fool the google cache.
	 * Since this method is called every 1 second we also use it to increase the refresh time counter and directly
	 * trigger refreshing from here if the counter reached the value of the refresh time.
	 * 
	 * The next interestig thing you should read to understand is the render method this._render() which will not
	 * only render but also adjust the refresh rate based on the data it finds. 
	 */
	this.poll = function(FEED, hide_empty){
		// original FEED object might have changed,so we receive a
		// reference to it everytime, just to be on the safe side.
		this.FEED = FEED;
		
		// rewrite FEED.url, add the nocache=<somenumber> at the end. this number
		// changes every 30 seconds. Store it in this.url
		this.urlAddNocache(30);
		
		// sometimes iGoogle will silently re-init and re-render its own FEED 
		// objects (for example when moving one of them with the mouse)
		// and also the user could change the viewType at any time so we have 
		// to check the following every time. Also this block of code is
		// ececuted once after initial creation of our objects to finally
		// activate them.
		if (FEED.viewType == 3){
			if (!FEED.ibf_killed){
				this.activate();
			}
		}else{
			// deactivate ourself
			this.deactivate();
		}
		
		// refetch if time is up
		if (this.time_since_refresh > this.refresh_interval){
			this.time_since_refresh = 0;
			this.fetch();
		}else{
			this.time_since_refresh += ibf_timer_frequency; // we are counting seconds
		}
		
		// hide the empty feeds if this option is enabled
		if (hide_empty && this.count == 0){
			this.hideGadget();
		}else{
			this.showGadget();
		}
		
		// persist the refresh interval (it might have been changed
		// by the calculation in the render() method. 
		GM_setValue('ibf_refresh_interval_' + this.a, this.refresh_interval);
	}
	
	return this;	
} // end of ibf_feed_object



/**
 * I am using uppercase letters FEED in documentation and code when referring to the iGoogle FEED object
 * (becaue it has uppercase letters in the DOM also). Our own feed objects will simply be referred to as 
 * something like "our own objects" or similar, they reside in the array unsafeWindow.ibf_feeds[].
 *	 
 * FEEDs come and go at runtime, so we go through all of them once a second and see which ones of them are
 * new (or changed) and have to be deativated and replaced and we also let our own object check the refresh 
 * time counter each second (this is done in our object's poll() method). 
 *
 * You should now continue reading with the poll() method  
 */
function ibf_onTimer(){
	ibf_log('ibf_onTimer()');
	var hide_empty = GM_getValue('ibf_hideEmpty');
	var w = unsafeWindow;
	
	// the script will load twice on the igoogle page and this timer function will
	// be executed in each of the two contexts/windows. If unsafeWindow.google is defined
	// then we are in the correct window, otherwise we just do nothing. 
	if (w.google){
		var regexp = /FEED(\d+)/;
		if(!w.ibf_feeds){
			w.ibf_feeds = new Array;
			ibf_log('created array for feed objects');
		}
		// go through all of them every time
		for (var i in w) {
			if (regexp.test(i)) {
				var id = RegExp.$1;
				var FEED = w['FEED'+id];

				// is this a (newly appeared) FEED object for which
				// we don't have our own counterpart yet?
				if (!w.ibf_feeds[id]){
					ibf_log('found new feed');
					w.ibf_feeds[id] = new ibf_feed_object(FEED);
				}
				
				var my_feed = w.ibf_feeds[id];
				
				// poll() will be executed once per second and once per feed. It will
				// count the time, trigger the refetch and check a few other things
				my_feed.poll(FEED, hide_empty);
			}
		}
		setTimeout(ibf_onTimer, 1000 * ibf_timer_frequency);	// do it again in ibf_timer_frequency seconds.
	}
}



/**
 * Now install our timer function that will do all magic. Everything this
 * script does will be controlled from within this timer function.
 */
setTimeout(ibf_onTimer, 1000 * ibf_timer_frequency);
ibf_log('started timer');

/**
 * Register the user menu items
 */
GM_registerMenuCommand('toggle show/hide empty feeds', ibf_toggleHideEmpty, '');
