// ==UserScript==
// @name          Flickr Activity Context Switcher
// @namespace     http://github.com/jufemaiz/jmc_flickr_gm_flickr-activity-context
// @description   Removes the context browsing from flickr (returns browsing of images to user only context). Note: this breaks your use of lightroom for that context!
// @include       http://*flickr.com*
//
// ==/UserScript==
//

// Options - use either true or false.
var options = {
	contacts : true,
	sets : false,
	groups : false,
	favorites : false
};

// Do not edit after here!
var main = document.getElementById('Main') || document.getElementById('main');
var elements = main.getElementsByTagName('a');
for(var i = 0; i < elements.length; i++) {
    var el = elements[i];
	el.href = el.href.replace(/\/in\/photostream\//,"");
    if(el.href.indexOf("/in/contacts/") != -1 && options.contacts) { el.href = el.href.replace(/\/in\/contacts\//,""); }
    if(el.href.indexOf("/in/set-") != -1 && options.sets) { el.href = el.href.replace(/\/in\/set-\d+\//,""); }
    if(el.href.indexOf("/in/pool-") != -1 && options.sets) { el.href = el.href.replace(/\/in\/pool-[A-Za-z@\d]+\//,""); }
    if(el.href.indexOf("/in/faves-") != -1 && options.sets) { el.href = el.href.replace(/\/in\/faves-[A-Za-z@\d]+\//,""); }
}
