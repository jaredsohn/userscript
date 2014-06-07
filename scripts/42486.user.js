// ==UserScript==
// @name           Alert Not Canonical URL
// @namespace      http://creazy.net/
// ==/UserScript==

// Bookmarklet
// javascript:(function(){var d=document,l=location,c=0,li=d.getElementsByTagName('head')[0].getElementsByTagName('link');for(var i=0;i<li.length;i++){if(li[i].getAttribute('rel').toLowerCase()=='canonical'&&li[i].href!=l.href){c=li[i].href;break;}}if(c)alert('Canonical URL is ...\n'+c);})();

(function(){

var head_tag  = document.getElementsByTagName('head')[0];
var link_tags = head_tag.getElementsByTagName('link');
for ( var i=0; i<link_tags.length; i++ ) {
    if ( link_tags[i].getAttribute('rel').toLowerCase() == 'canonical' ) {
        if ( link_tags[i].href != location.href ) {
            alert_message
                = "Not Canonical URL!\n\n"
                + "[Your visited URL]\n"
                + location.href + "\n\n"
                + "[Canonical URL]\n"
                + link_tags[i].href;
            alert(alert_message);
            break;
        }
    }
}

})();