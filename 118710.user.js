// ==UserScript==
// @name            Amazon football team player freebase
// ==/UserScript==
// ==UserScript==
var searchKeyword=document.getElementById("twotabsearchtextbox").value;
//searchKeyword=searchKeyword.replace(/\"/g,'');
//for detail page

//alert(searchKeyword);

// all the functions will be called after json2 is loaded
jQuery.getScript("https://raw.github.com/douglascrockford/JSON-js/master/json2.js",function() {
                
    function influnceBy(name) {     // Display albums by the specified name.
	    var envelope = {                       // The mqlread query envelope
			query : {   
			    id: null,                      // The MQL query 
			    type: "/influence/influence_node",         // Find a name
			    name: name,                    // With the specified name
			    influenced_by: [{                      // We want to know about albums
						name:null                 // Return album names
			    	}]
				}
    		};
	    var output="";                       // Output goes here
	    output=output+name +" is Influenced by";     // Display a title
		var outputHyperLinks="";
		var status=0;
	
		
	    // Invoke mqlread and call the function below when it is done.
	    // Adding callback=? to the URL makes jQuery do JSONP instead of XHR.
	    jQuery.getJSON("http://api.freebase.com/api/service/mqlread?callback=?",
			   {query: JSON.stringify(envelope)},   // URL parameters
			   displayResults);                     // Callback function
				   
    	// This function is invoked when we get the result of our MQL query 
	    function displayResults(response) { 
    		//alert("in function");
	    	hyperLinkPartBeforeKeyword="<a href=\"http://usertesting.a9.com/prox/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=";
			hyperLinkPartAfterKeyword="&ie=UTF8&qid=1314245177\">";
			
			if (response.code == "/api/status/ok" &&        
			    response.result && response.result.influenced_by) { // Check for success...                     // Make <ul> tag.
			   // output.append(list.hide())                  // Keep it hidden
			    var albums = response.result.influenced_by;         // Get albums.
			    jQuery.each(albums, function() { 
			    	    status=1;
                        var currentHyperLink=hyperLinkPartBeforeKeyword+this.name+hyperLinkPartAfterKeyword+this.name+"</a>"				
			    		output=output+this.name+",";          // Loop through albums.
						outputHyperLinks=outputHyperLinks+currentHyperLink+",";
			    	});
				//alert("inside1: "+output);
			}
			else {                                          // On failure...
			    output="Didn't find "+name+" in freebase";     // Display message.
			}
			if (status==1){
				jQuery("div[id*='breadCrumbDiv']").append("<div class=\"influncedBy\" id=\"influncedBySearch\"> <span>Influenced By:"+outputHyperLinks);
				jQuery("div[id*='refinements']").append("<h2>Amazon Discovery</h2>" );
				jQuery("div[id*='refinements']").append("<div class=\"influncedBy\" id=\"influncedBySearch\"> <span>Influenced By:"+outputHyperLinks);
			}
			
			//jQuery(".contributorNameTrigger").append("<div class=\"influncedBy\" id=\"influncedBySearch\"> <span>Influenced By:"+outputHyperLinks);
	    }
	    return output;
	    }
    influnceBy(searchKeyword);
    });


// for webpage load
jQuery.getScript("https://raw.github.com/douglascrockford/JSON-js/master/json2.js",function() {
	var searchKeywordDetailPage=document.getElementsByClassName("contributorNameTrigger");
	var bookTitle=document.getElementById("btAsinTitle").innerHTML;
	if(searchKeywordDetailPage){
		searchKeywordDetailPage=document.getElementsByClassName("contributorNameTrigger")[0].childNodes[0].childNodes[0].textContent;
	    function influnceBy(name) {     // Display albums by the specified name.
		    var envelope = {                       // The mqlread query envelope
				query : {   
				    id: null,                      // The MQL query 
				    type: "/influence/influence_node",         // Find a name
				    name: name,                    // With the specified name
				    influenced_by: [{                      // We want to know about albums
							name:null                 // Return album names
				    	}]
					}
	    		};
		    var output="";                       // Output goes here
		    output=output+name +" is Influenced by";     // Display a title
			var outputHyperLinks="";
			var status=0;
		
			
		    // Invoke mqlread and call the function below when it is done.
		    // Adding callback=? to the URL makes jQuery do JSONP instead of XHR.
		    jQuery.getJSON("http://api.freebase.com/api/service/mqlread?callback=?",
				   {query: JSON.stringify(envelope)},   // URL parameters
				   displayResults);                     // Callback function
					   
	    	// This function is invoked when we get the result of our MQL query 
		    function displayResults(response) { 
	    		//alert("in function");
	            hyperLinkPartBeforeKeyword="<a href=\"http://usertesting.a9.com/prox/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=";
				hyperLinkPartAfterKeyword="&ie=UTF8&qid=1314245177\">";
				
				if (response.code == "/api/status/ok" &&        
				    response.result && response.result.influenced_by) { // Check for success...                     // Make <ul> tag.
				   // output.append(list.hide())                  // Keep it hidden
				    var albums = response.result.influenced_by;         // Get albums.
				    jQuery.each(albums, function() { 
				    	    status=1;
	                        var currentHyperLink=hyperLinkPartBeforeKeyword+this.name+hyperLinkPartAfterKeyword+this.name+"</a>"				
				    		output=output+this.name+",";          // Loop through albums.
							outputHyperLinks=outputHyperLinks+currentHyperLink+", ";
				    	});
					//alert("inside1: "+output);
				}
				else {                                          // On failure...
				    output="Didn't find "+name+" in freebase";     // Display message.
				}
				//jQuery("div[id*='breadCrumbDiv']").append("<div class=\"influncedBy\" id=\"influncedBySearch\"> <span>Influenced By:"+outputHyperLinks);
				if (status==1){
					jQuery(".contributorNameTrigger").append("<div class=\"influncedBy\" id=\"influncedBySearch\"> <span>Influenced By:"+outputHyperLinks);
				}
				
		    }
		    return output;
		    }
	    influnceBy(searchKeywordDetailPage); 	
	}
	
    });

