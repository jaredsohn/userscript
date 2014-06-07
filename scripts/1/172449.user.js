// ==UserScript==
// @name       SeeNot hide google results by domain
// @namespace  http://dirkraft.github.io/
// @version    0.1
// @description  Adds an action to search results to hide results from that domain. e.g. I never want to see www.w3schools.com. The action is under the down caret with the "Cached" option.
// @match      http*://www.google.com/*
// @copyright  2013+, Jason Dunkelberger (dirkraft)
// ==/UserScript==

// If someone has a better detector of being in a google search, please let me know. @match pattern not seemingly possible.
// The following prefixes have been observed on normal google searches
// www.google.com/webhp?
// www.google.com/search?
// www.google.com/? (no path at all!)
// There is a lot of in-page DOM manipulation so we'll probably have to be loaded all the time, but be careful about showing controls.

// This works by just removing DOM elements, rather than modifying the search query.
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



// global scoping
SeeNot = {
	// The following two settings help to respond to a page load as quickly as possible. If the duration between page load and result rendering is greater
    // than modifyDelay (ms) * initialTries, then SeeNot will fail to initialize.
    modifyDelay: 200, // maximum fire rate, somewhat
    initialTries: 5 // number of times to initially try to load
};



addJQuery(function() {
    setTimeout(function() { // guess there's some async population by google
        
        
        // utility
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
        
        

        var keyDomainList = 'SeeNot:domainList';
        
        SeeNot.dlClear = function() {
            localStorage.removeItem(keyDomainList);
        };
        SeeNot.dlList = function() {
            var domainList = localStorage.getItem(keyDomainList);
            return domainList ? JSON.parse(domainList) : {}; // more like a set than array
        }
        SeeNot.dlAdd = function(domain) {
            var domainList = SeeNot.dlList();
            domainList[domain] = {}; // more like a set than array
            localStorage.setItem(keyDomainList, JSON.stringify(domainList));
        };
        SeeNot.dlRemove = function(domain) {
            var domainList = SeeNot.dlList();
            delete domainList[domain];
            localStorage.setItem(keyDomainList, JSON.stringify(domainList));
        };
        
        
        
        function inSearchResults() {
            // substitute for @match, find search result stats node, e.g. 5 results (0.43 seconds), e.g. About 108,000,000 results (0.25 seconds)
	        return jQ('#appbar #extabar #topabar #resultStats').size();
        }
        
        function extractDomain(str) {
            return str.trim().replace(/^((http|https):\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?)(\/.*)?/i, '$3');
        }
        
        function indicateHiddenDomains(hiddenDomains) {
            var jqCtn = jQ('#SeeNot-hiddenDomains');
            if (0 == jqCtn.size()) {
                // initialize this control
                jQ('head').append('<style>' +
                                  '#SeeNot-hiddenDomains {' +
                                  '  position: fixed;' +
                                  '  bottom: 20px;' +
                                  '  right: 20px;' +
                                  '  opacity: 0.6;' +
                                  '}' +
                                  '#SeeNot-hiddenDomains h4 {' +
                                  '  border-bottom: 1px solid #666;' +
                                  '  margin: 0;' +
                                  '}' +
                                  '#SeeNot-hiddenDomains:hover {' +
                                  '  opacity: 1;' +
                                  '}' +
                                  '#SeeNot-hiddenDomains ul {' +
                                  '  list-style: none;' +
                                  '}' +
                                  '#SeeNot-hiddenDomains ul:empty:after {' +
                                  '  content: "(no hidden domains)"' +
                                  '}' +
                                  '#SeeNot-hiddenDomains a {' +
                                  '  text-decoration: none;' +
                                  '}' +
                                  '</style>');
                jqCtn = jQ('<div id="SeeNot-hiddenDomains">' +
                           '  <h4>SeeNot: hidden domains</h4>' +
                           '  <ul></ul>' +
                           '</div>');
                jQ('body').append(jqCtn);
                
                jqCtn.on('click', 'a.SeeNot-removeDomain', function(jqEvent) {
                    jqEvent.preventDefault();
                    var jqAnchor = jQ(jqEvent.target);
                    var domain = jqAnchor.siblings('span').text();
                    SeeNot.dlRemove(domain);
                    alert(domain + ' removed from list of hidden domains. Future searches will not hide these results.');
                });
            }
            
            // render currently hidden domains
            var jqUl = jqCtn.find('ul').empty();
            jQ.each(hiddenDomains, function(domain, nothing) {
                jqUl.append('<li><span>{0}</span> <a class="SeeNot-removeDomain" href="#" onclick="return false;" title="remove domain from hidden list">&times;</a></li>'
                            .format(domain));
            });
        }
        
        
        
        // cut bad domain results
        SeeNot.removeSeeNotResults = function() {
            var dl = SeeNot.dlList();
            var hiddenDomains = {}; // set behavior
            var results = jQ('.g');
            results.each(function(idx, el) {
                var jqEl = jQ(el);
                var cite = jqEl.find('cite').text(); // "cite" sic
                var domain = extractDomain(cite);
                if (dl[domain]) {
                    jqEl.slideUp();
                    hiddenDomains[domain] = {}; // set behavior
                } else {
                    jqEl.find('.action-menu ul:not(:has(.SeeNot-dlAdd))')
                    	.append('<li class="action-menu-item ab_dropdownitem" role="menuitem" aria-selected="false">' +
                                '  <a href="#" onclick="return false;" class="fl SeeNot-dlAdd">SeeNot: add domain</a>' +
                                '</li>');
                }
            });
            if (results.size()) {
                indicateHiddenDomains(hiddenDomains);
            }
        };
        
        
        // open fire counter, number of times to attempt initialization on page load
        var initilizeAttempts = 0;
		// prevent duplicate initialization
        var initialized = false;
        // only allow one waiting update timeout (be sure to clear old)
        var hiderTimeout;
        
        function update() {
            clearTimeout(hiderTimeout);
            hiderTimeout = setTimeout(function() {

                // substitute for @match, find search result stats node, e.g. 5 results (0.43 seconds), e.g. About 108,000,000 results (0.25 seconds)
                if (!inSearchResults()) {
                    console.log('SeeNot: Not in search results.');
                    jQ('#SeeNot-hiddenDomains').hide();
                    
                    // Keep trying until open fire count runs out.
                    if (initializeAttempts++ < SeeNot.initialTries) {
                        update();
                    }
                    
                    return;
                } // else
                
                if (!initialized) {
                    console.log('SeeNot: I see search results. Initializing SeeNot...');
                    
                    // on domain hide, add to dl, remove SeeNotDomains
                    jQ('#search').on('click', 'a.SeeNot-dlAdd', function(jqEvent) {
                        jqEvent.preventDefault();
                        var cite = jQ(jqEvent.target).closest('.g').find('cite').text(); // "cite" sic
                        var domain = extractDomain(cite);
                        SeeNot.dlAdd(domain);
                        SeeNot.removeSeeNotResults();
                        alert("Added " + domain + " to SeeNot:domainList. Hiding matching results.");
                    });
                    
                    // show controls
                    jQ('#SeeNot-hiddenDomains').fadeIn();
                    
                    initialized = true;
                }
                    
                // refresh view, re-set ires pointer
                SeeNot.removeSeeNotResults();
                ires = jQ('#ires');
                
            }, SeeNot.modifyDelay);
        }
        // trigger immediate update in case the page came fully rendered
        update();
        
        // search results rendering and paging detection
        var ires = jQ('#ires'); // right inside #search . #ires gets replaced by paging, while #search remains.
        jQ('body').on('DOMSubtreeModified', update);
        
        
        
    }, SeeNot.modifyDelay);
});