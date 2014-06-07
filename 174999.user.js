// ==UserScript==
// @name       Flickr: use non-justified views for Photostreams and Sets
// @namespace  http://blog.loupiote.com/2013/08/flickr-use-non-justified-views-for.html
// @version    1.1
// @description  Improves Flickr usability for users with slow internet. Use non-pustified views for Photostreams and Sets
// @include     /^https?:\/\/www.flickr.com/photos\/.*/
// @copyright  2013 Loupiote - http://www.loupiote.com
// @run-at      document-start
// ==/UserScript==


function add_parameter_to_url(param) {
    if (window.location.search.match('[?&]' + param + '=')) {
        return '';
    }
	var new_query_string_parameter;
    if (window.location.search){
        new_query_string_parameter = '&';
    } else {
        new_query_string_parameter = '?';
    }
    new_query_string_parameter += param + '=1';
    
    var url  = window.location.href
        + new_query_string_parameter
		+ window.location.hash
        ;
    return url;
}

if(window.location.pathname.match('^/photos/[^/]+(/?$|/(with|page))')
   && !window.location.pathname.match('^/photos/(organize|upload|friends)/?$')

  ){
    var url  = add_parameter_to_url('details');
    
    if (url) {
 		window.location.replace(url);
    }
    return;

}

if(window.location.pathname.match('/photos/[^/]+/sets/[0-9]+')
  && !window.location.pathname.match('/photos/[^/]+/sets/[0-9]+/detail($|/)')
  
  ){

   var url  = add_parameter_to_url('detail');
    
    if (url) {
 		window.location.replace(url);
    }
    return;
}
