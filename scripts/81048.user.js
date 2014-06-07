// ==UserScript==
// @name           mytest
// @namespace      test
// @description    test
// @include        *
// ==/UserScript==



 
(function() { 
	    var uw = unsafeWindow, 
	        YUI, script, head, 
	        YUILoaded = function() { 
	            YUI = uw.YUI; 
	            YUI.config.doc = uw.document; 
	            YUI.config.win = uw; 
	            YUI({
		logExclude: {
		    'YUI': true,
		    Event: true,
		    Base: true,
		    Attribute: true,
		    augment: true
		}    
		}).use('node', 'yql', function(Y) {
		    console.log("ss"+Y);
		    var q3 = new Y.yql('select * from search.images where query="hat" and mimetype like "%jpeg%" and sites="flickr.com"', function(r) {
		    if (r.query.results) {
			var data = r.query.results;
			console.log(data);
			 var aElmnt = uw.document.createElement('a');
			 aElmnt.href=data.result[0].refererurl;
			  aElmnt.innerHTML="my hack"
			body1 = uw.document.getElementsByTagName('body')[0]; 
			body1.appendChild(aElmnt); 
			 
		    }
		});
	    });
	        }; 
	     
	    if (!uw.YUI) { 
	        script = uw.document.createElement('script'); 
	        script.src = 'http:/'+'/yui.yahooapis.com/3.0.0b1/build/yui/yui-min.js'; 
	        script.onload = YUILoaded; 
		head = uw.document.getElementsByTagName('head')[0]; 
	        head.appendChild(script); 

		script1 = uw.document.createElement('script'); 
	        script1.src = 'http:/'+'/github.com/davglass/yui-yql/raw/master/yql-min.js'; 
	        script1.onload = YUILoaded; 		  
	        
	        head.appendChild(script1); 
	 
	    } 
	 
	})(); 