// ==UserScript==
// @name           Xbox.com with TrueAchievement scores
// @description    Show TA scores for achievements on Xbox.com
// @author         acdougla17
// @include        http*://live.xbox.com*
// @version        0.1
// ==/UserScript==

window.addEventListener("load", function(e) {
	
	function YQLQuery(query, callback) {
		this.query = query;
		this.callback = callback || function(){};
		this.fetch = function() {

			if (!this.query || !this.callback) {
				throw new Error('YQLQuery.fetch(): Parameters may be undefined');
			}

			var scriptEl = document.createElement('script'),
				uid = 'yql' + +new Date(),
				encodedQuery = encodeURIComponent(this.query.toLowerCase()),
				instance = this;

			YQLQuery[uid] = function(json) {
				instance.callback(json);
				delete YQLQuery[uid];
				document.body.removeChild(scriptEl);
			};

			scriptEl.src = 'http://query.yahooapis.com/v1/public/yql?q='
                     + encodedQuery + '&format=json&callback=YQLQuery.' + uid; 
			document.body.appendChild(scriptEl);

		};
	}
	
	// Construct your query:
	var query = "select * from html where url='http://www.trueachievements.com/searchresults.aspx?search=NHL+13' limit 1";
	
	// Define your callback:
	var callback = function(data) {
		var post = data.query.results.item;
		alert(post.title);
	};

	// Instantiate with the query:
	var firstFeedItem = new YQLQuery(query, callback);

	// If you're ready then go:
	firstFeedItem.fetch(); // Go!!
	
	
	alert("ta da");
	
	
}, false);