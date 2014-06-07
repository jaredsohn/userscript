// ==UserScript==
// @name           Flickr Tag Counts
// @namespace      http://carranza-collective/greasemonkey
// @description    Modifies the tag list in the photo page to show the number of photos tagged with each tag
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

/*
 	Script courtesy of Joel Carranza,
	joel.carranza@gmail.com
	Licensed under GPL (http://www.gnu.org/copyleft/gpl.html)
	
	Change Log
	----------
	0.1 - Initial Release    
*/

// operates on photo pages only
if (/^http:\/\/www.flickr\.com\/photos\/([\w_@]+)\/\d+\//.test(window.location.href)) {

var TagCounter = {	
	// number of tags we query from server
	tagCount : 500,
	process_tags : function(tagMap)
	{
		var href_regexp = /\/photos\/[^\/]+\/tags\/(\w+)\//;	
		var style = 'linear';
		var tagDiv = document.getElementById('thetags');
		
		this.walk("//a[contains(@href, '/tags/')]",tagDiv,function(thisOne) {
			var tag = TagCounter.extract(href_regexp,thisOne.href);			
			if(tag)
			{	
				var count = tagMap[tag];
				if(count > 1) {
					var tn = document.createTextNode(" (" +count+")");
					thisOne.appendChild(tn);						
				}
			}
			return true;
		});		
	},
	// log whats going on w/ GM_log ? 
	logging: false,
	
	// extract username for locating NSID
	username: RegExp.$1,
	// photo id is not actually used right now
	//	var photo_id = RegExp.$2;
	
	// FLICKR API
	FlickrApi: {
		key : 'aa46665f5d4d9a969dbdf36f54a63f84',
		urlRoot: 'http://api.flickr.com/services/rest/',
		
		// e.g. callMethod('photos.getSizes', function(){}, {photo_id:34343232})
		callMethod: function(method, parameters, callback) {
			var url = this.urlRoot + '?method=flickr.' +method+ '&api_key=' +this.key+ '&format=json&nojsoncallback=1';
			
			// Add parameters to url
			if (parameters)
			{
				for (param in parameters)
					{ url += '&' + param + '=' + escape(parameters[param]); }
			}
				
				
			GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(response) {
				eval('var rsp = ' + response.responseText + ';');
				if (rsp.stat != 'ok')
					{ alert("Error in GreaseMonkey script 'Flickr tag count': "+rsp.message); }				
				else
					{ callback(rsp); }
			},
			onerror: function(response){ alert("Error"+ rsp.message); }
			});
		}
	},	
	// create additional styles
	addGlobalStyle : function(css) {
		style = document.createElement('STYLE');
		style.type = 'text/css';
		style.innerHTML = css;
		document.body.appendChild(style);
	},
	// evaluate an expath expression and iterate over that list
	// function must return true in order to the loop to continue
	walk : function(path, el, f) {
		var nodeList = document.evaluate(
					path,
					el != null ? el : document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
		var n;
		for (var i = 0; i < nodeList.snapshotLength; i++) {
			n = nodeList.snapshotItem(i);	
			if(!f(n))
				break;
		}		
	},
	// return first group from a regex match, or null if none is found
	extract: function(regex, str) {
		return regex.test(str) ? RegExp.$1 : null;
	},
	run: function() {
		var nsid = null;
		var src_regexp = /\/buddyicons\/([\w+@]+)\.jpg/;
		
		this.walk("//a[contains(@href,'"+this.username+"')]/img[contains(@src, '/buddyicons/')]",null,function(img)
		{
			nsid =  TagCounter.extract(src_regexp,img.src);		
			return nsid == null;
		});
	
		if(nsid == null)
			return;
			
		var cache = GM_getValue(nsid);
		var session = unsafeWindow.global_flickr_secret;
		var queryServer = true;
		if(cache)
		{
			var cacheData = cache.split(';');
			if(cacheData[0] == session)
			{
				var tagMap = new Object();
				if(this.logging)
					GM_log("cached results. nsid="+nsid);
				for(var i=1;i<cacheData.length;i+=2) {
					tagMap[cacheData[i]] = cacheData[i+1];
				}
				this.process_tags(tagMap);
				queryServer = false;
			}
		} // end cache
				
		if(queryServer) {
			if(this.logging)
				GM_log("query server nsid="+nsid);
			this.FlickrApi.callMethod('tags.getListUserPopular', {count: this.tagCount, user_id: nsid}, function(rsp) {
				var tags = rsp.who.tags.tag; 
				if(this.logging)
					GM_log("server results tags="+tags.length);
				var tagMap = new Object();
				var persist = session;
				for(var i=0;i<tags.length;++i) {
					var tag = tags[i];
					var count = tag.count;
					var tagText = tag._content;
					tagMap[tagText] = count;	
					
					if(count > 1)
						persist += ";"+tagText+";"+count;
				}
				TagCounter.process_tags(tagMap);
				GM_setValue(nsid,persist);				
			});		
		} // end query server		
	} // end loadTags()
  } // end TagCounter object
  
TagCounter.run();

} // end flickr photo url test