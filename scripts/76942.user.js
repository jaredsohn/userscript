// ==UserScript==
// @name           TrackingQueryStripper
// @namespace      http://creazy.net/
// @include        *
// ==/UserScript==

//http://www.spunk-ransom.com/2010/04/26/oldnew-remember-me-press-conference-pictures/?utm_source=twitterfeed&utm_medium=twitter

(function () {

if ( location.search ) {
    //------------------------------------------------------------
    // check canonical
    //------------------------------------------------------------
    var links = document.getElementsByTagName('link');
    for ( var i=0; i<links.length; i++ ) {
        if ( links[i].getAttribute('rel') == 'canonical'
            && links[i].getAttribute('href') != location.href ) {

            //console.log('redirect to canonical url');
            location.replace( links[i].getAttribute('href') );
        }
    }

    //------------------------------------------------------------
    // strip params
    //------------------------------------------------------------
    var new_url = location.href;
    new_url = new_url.replace(
        /(\?ref=rss)$/
        ,''
    );
    new_url = new_url.replace(
        /([\?\&]utm_(source|medium|campaign|content)=.+)/ig
        ,''
    );
    if ( new_url != location.href ) {
        //console.log('redirect to stripped url');
        location.replace(new_url)
    }
}

})();