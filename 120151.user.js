// ==UserScript==
// @name Kill Facebook Redirects
// @description Gets rid of annoying redirects on Facebook.
// ==/UserScript==

document.getElementsByAttribute = function( attrib, value, tag ) {
    var nodes = [];
    if ( tag == null ) 
        tag = '*';
    var elems = this.getElementsByTagName(tag);
    
    for ( var i = 0; i < elems.length; i += 1 ) {
        if ( value ) {
            if ( elems[i].hasAttribute(attrib) && elems[i].getAttribute(attrib) == value )
                nodes.push(elems[i]);
        } else {
            if ( elems[i].hasAttribute(attrib) )
                nodes.push(elems[i]);
        }
    }
    return nodes;
}

var clear_onMousedowns = function() {
  var main = document.getElementsByAttribute('onMousedown', null, 'a');

  for (i = 0, len = main.length; i < len; i++) {
    var element = main[i];
    if ( !element.getAttribute("onMousedown").match(/^\/ajax.*/) )
    element.removeAttribute("onMousedown");
  }
};

setInterval(clear_onMousedowns, 10000);