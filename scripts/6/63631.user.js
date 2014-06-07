// ==UserScript==
// @name           FeedBurnerTrackingQueryStripper
// @namespace      http://creazy.net/
// @include        *
// ==/UserScript==

(function () {

if ( location.search.match(/utm_source=feedburner/) ) {
    
    var new_url = '';
    
    // check canonical
    var links = document.getElementsByTagName('link');
    for ( var i=0; i<links.length; i++ ) {
        if ( links[i].getAttribute('rel') == 'canonical' ) {
            new_url = links[i].getAttribute('href');
            //alert('use canonical : '+new_url);
            break;
        }
    }

    // sprit params
    if ( !new_url ) {
        new_url = location.href.replace(
            /([\?\&]utm_(source|medium|campaign|content)=.+)/ig
            ,''
        );
        //alert('sprit url : '+new_url);
    }

    if ( new_url ) location.replace(new_url);
}

})();