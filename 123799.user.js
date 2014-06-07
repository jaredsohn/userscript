// ==UserScript==
// @name       Insights for Search for Greasemonkey update
// @namespace  http://ierolohitis.wordpress.com/
// @version    0.1
// @description  Custom Insights reports for Google Search (with Greasemonkey)
// @copyright  N/A
// ==/UserScript==

a = function(){
  var b = document.getElementById('rhscol');
  
  // Google Insights parameters 
  // !!! IMPORTANT !!! u cand play with different params but remember to open google search page in new window (NOT new TAB)
  // have fun  

 
  // custom location ( ex. "US")
  // var location = "empty"; // default
  var location = "RO"; // for Romania 
  
  // time range for "Interest Over Time" report
  // 24-m = 24 months 
  var interestrange = "24-m"; 
  
  // time range for "Top Searches related" report
  var relatedrange = "3-m"; // same ranges as above
  
  // time range for "Rising Searches related" report
  var risingrange = "3-m"; 
    
  if(b){
	var c = encodeURIComponent(document.getElementById('lst-ib').value);
	var d = document.getElementById('rhs') || document.createElement('div');
	d.id = 'rhs';
      
	var interest ='<iframe src="//www-open-opensocial.googleusercontent.com/gadgets/ifr?url=http%3A%2F%2Fwww.google.com%2Fig%2Fmodules%2Fgoogle_insightsforsearch_interestovertime_searchterms.xml&amp;up__property=empty&amp;up__search_terms='+c+'&amp;up__location='+location+'&amp;up__category=0&amp;up__time_range='+interestrange+'&amp;up__compare_to_category=false&amp;synd=open" width="100%" height="350" scrolling="no" frameborder="0"></iframe>';
        var related ='<iframe src="//www-open-opensocial.googleusercontent.com/gadgets/ifr?url=http%3A%2F%2Fwww.google.com%2Fig%2Fmodules%2Fgoogle_insightsforsearch_relatedsearches.xml&amp;up__results_type=TOP&amp;up__property=empty&amp;up__search_term='+c+'&amp;up__location='+location+'&amp;up__category=0&amp;up__time_range='+relatedrange+'&amp;up__max_results=20&amp;synd=open" width="100%" height="350" scrolling="no" frameborder="0"></iframe>';
        var rising ='<iframe src="//www-open-opensocial.googleusercontent.com/gadgets/ifr?url=http%3A%2F%2Fwww.google.com%2Fig%2Fmodules%2Fgoogle_insightsforsearch_relatedsearches.xml&amp;up__results_type=RISING&amp;up__property=empty&amp;up__search_term='+c+'&amp;up__location='+location+'&amp;up__category=0&amp;up__time_range='+risingrange+'&amp;up__max_results=20&amp;synd=open" width="100%" height="350" scrolling="no" frameborder="0"></iframe>';
	
        d.innerHTML = interest+related+rising; 
        b.appendChild(d);
  }
}
window.addEventListener("hashchange", a, true);
a();