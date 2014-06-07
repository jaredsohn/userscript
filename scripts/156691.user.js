// ==UserScript==
// @id             wishlist.audible@blunet.cc
// @name           audible.com - Scrolling Wishlist
// @author         bernstein
// @description    Turns the paged wishlist into one big list. For use together with my (userstyle)[http://userstyles.org/styles/66195]
// @updateURL      https://userscripts.org/scripts/source/156691.user.js
// @version        0.9.1
// @domain         audible.com
// @domain         www.audible.com
// @include        http://www.audible.com/wl/*
// @run-at         document-end
// @namespace      cc.blunet.userscript
// @require        https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// ==/UserScript==
// TODO add imporved sorting
// TODO add support to mark certain items as already owned

/*** config ***/
var config = {
    pattern : '.+page=(\\d+).*',
    selector : {
        // required, selector to one element or [selector_to_a_set,position]
        max : ['.adbl-page-index .adbl-page-link', -1],
        // required, selector to container for new elements
        container : '#adbl_list_form > table > tbody',
        // optional, selector to a set of elements, that will be stripped from all but primary container
        // strip : '',
        // optional, excludes strip, selector to a set of elements
        elements : '#adbl_list_form > table > tbody > tr:not(:first-of-type)'
        // optional, requires elements, selector relative to container, otherwise will appendChild.
        //insertBefore : '',
    },
    before : function(){/*GM_addStyle(".adbl-page-index, .adbl-pagination-bottom { display: none; }");*/},
    after : function(){}
    // max, current, url, container, elements, done
};

/*** Sanitize RexExp ***/
if(RegExp.prototype.reset != undefined) { alert("RegExp.reset() already defined. aborting..."); throw "abort"; }
RegExp.prototype.reset = function() { this.lastIndex = 0; return this; };
if(RegExp.prototype.match != undefined) { alert("RegExp.match() already defined. aborting..."); throw "abort"; }
RegExp.prototype.match = function(str) { if(str == null) str = RegExp.input; else this.reset(); return this.exec(str); };
/*** Sanitize DOM Element ***/
if (Element.prototype.insertChildAt != undefined) { alert("Element.insertChildAt() already defined. aborting..."); throw "abort"; }
Element.prototype.insertChildAt = function(index,node) { this.insertBefore(node,this.childNodes[index]); };
Element.prototype.insertAfter = function(e) { if (this.nextSibling == null) this.parentNode.appendChild(e); else this.parentNode.insertBefore(e, this.nextSibling); }
/*** Sanitize document ***/
if (document.parseHTML != undefined) { alert("document.parseHTML() already defined. aborting..."); throw "abort"; }
document.parseHTML = function(str) { var doc = document.implementation.createHTMLDocument(""); doc.documentElement.innerHTML = str; return doc; }

/*** actual reusable code ***/
config.before();
/*GM_config.init({ // Fields object
	'Name':
	{
		'label': 'Name', // Appears next to field
		'type': 'text', // Makes this setting a text field
		'default': 'Joe Simmons' // Default value if user doesn't change it
	}
});
GM_config.open();*/

// get max number of pages
let e;
if (config.selector.max instanceof Array) {
    e = document.querySelectorAll(config.selector.max[0]);
    e = e[(config.selector.max[1] < 0 ? e.length : 0) + config.selector.max[1]];
} else {
    e = document.querySelector(config.selector.max);
}
e = e.children[0].href;

let regex = new RegExp(config.pattern,'gi');
let result = regex.match(e);
if (result.length != 2 && isNaN(result[1])) console.warn("Unexpected result for regex: "+result);
config.max = result[1];

// get current page index
// TODO fix url robustness (removing selected does terminate....)
result = regex.match(location.href);
if (result == null) {
    config.current = 1;
    config.url = [location.href + "&page=", ""];
} else {
    if (result.length != 2 && isNaN(result[1])) console.warn("Unexpected result for regex: "+result);
    config.page = result[1];
    config.url = [
        location.href.slice(0,regex.lastIndex - result[1].length),
        location.href.slice(regex.lastIndex, -1)
    ];
}

config.done = 1;
config.container = document.querySelector(config.selector.container);
config.elements = {}; config.elements[config.current] = document.querySelectorAll(config.selector.elements).length; // superflous if config.wrap == true

for(let i=1; i<=config.max; i++)
    if (i != config.current)
    {
        console.info("Loading page "+i+" : "+config.url[0]+i+config.url[1]);
        let pageIndex = i; // save page index
        let r = new XMLHttpRequest();
	    r.open("GET", config.url[0]+i+config.url[1], true);
        r.onreadystatechange = function() { if (this.readyState == XMLHttpRequest.DONE)
        {
            let doc = document.parseHTML(this.responseText);
            console.log(doc.querySelector(config.selector.container).children[10]);
            if (!config.selector.elements)
            {
                let cont = doc.querySelector(config.selector.container);
                
                if(config.selector.strip)
                {
                    let removables = cont.querySelectorAll(config.selector.strip);
                    for(let j=0; j<pageIndex; j++)
                        cont.removeChild(removables[j]);
                }
                let insertPoint = config.container;
                for(let j=1; j<config.done && j<pageIndex; j++)
                    insertPoint = insertPoint.nextSibling;
                insertPoint.insertAfer(cont);
            }
            else
            {
                let elements = doc.querySelectorAll(config.selector.elements);
                config.elements[pageIndex] = elements.length; // superflous if config.wrap == true
                
                /*if (config.selector.insertBefore)
                {
                    let beforeMe = config.container.querySelector(config.selector.insertBefore);
                    // TODO fix order for async
                    for(let j=0; j<elements.length; j++)
                        config.container.insertBefore(elements[j], beforeMe);
                }
                else
                {*/
                        if (config.done < pageIndex)
                            for(let j=0; j<elements.length; j++)
                                config.container.appendChild(elements[j]);
                        else
                        {
                            let index = 0;
                            for(let j=1; j<pageIndex; j++)
                                if(config.elements[j])
                                    index += config.elements[j];
                            let beforeMe = config.container.children[index];
                            for(let j=0; j<elements.length; j++)
                                config.container.insertBefore(elements[j], beforeMe);
                        }
//                }
            }
            if (++config.done == config.max) config.after();
        }};
	    r.send(null);
    }