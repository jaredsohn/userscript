// ==UserScript==
// @name           Insights for Search
// @description    Shows trends and insights for Google Search
// @author         Podobne.pl
// @namespace      http://www.podobne.pl
// @version        1.2
// @include        http*://www.google.*/#*
// @include        http*://www.google.*/search*
// @include        http*://www.google.*/webhp*
// ==/UserScript==

a = function(){
  var b = document.getElementById('rhscol');
  if(b){
	var c = encodeURIComponent(document.getElementById('lst-ib').value);
	var d = document.getElementById('rhs') || document.createElement('div');
	d.id = 'rhs';
	d.innerHTML = '<iframe src="//www-open-opensocial.googleusercontent.com/gadgets/ifr?url=http%3A%2F%2Fwww.google.com%2Fig%2Fmodules%2Fgoogle_insightsforsearch_interestovertime_searchterms.xml&amp;up__property=empty&amp;up__search_terms='+c+'&amp;up__location=empty&amp;up__category=0&amp;up__time_range=12-m&amp;up__compare_to_category=false&amp;synd=open" width="100%" height="350" scrolling="no" frameborder="0"></iframe><iframe src="//www-open-opensocial.googleusercontent.com/gadgets/ifr?url=http%3A%2F%2Fwww.google.com%2Fig%2Fmodules%2Fgoogle_insightsforsearch_relatedsearches.xml&amp;up__results_type=TOP&amp;up__property=empty&amp;up__search_term='+c+'&amp;up__location=empty&amp;up__category=0&amp;up__time_range=1-m&amp;up__max_results=10&amp;synd=open" width="100%" height="350" scrolling="no" frameborder="0"></iframe><iframe src="//www-open-opensocial.googleusercontent.com/gadgets/ifr?url=http%3A%2F%2Fwww.google.com%2Fig%2Fmodules%2Fgoogle_insightsforsearch_relatedsearches.xml&amp;up__results_type=RISING&amp;up__property=empty&amp;up__search_term='+c+'&amp;up__location=empty&amp;up__category=0&amp;up__time_range=1-m&amp;up__max_results=10&amp;synd=open" width="100%" height="350" scrolling="no" frameborder="0"></iframe>';
	b.appendChild(d);
  }
}
window.addEventListener("hashchange", a, true);
a();
