// LongURL Mobile Expander

// Improved version.

// version 2.1

// 2009-06-02

// Copyright (c) 2008, Sean Murphy

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

//

// --------------------------------------------------------------------

//

// This is a Greasemonkey user script.  To install it, you need

// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.

// Under Tools, there will be a new menu item to "Install User Script".

// Accept the default configuration and install.

//

// To uninstall, go to Tools/Manage User Scripts,

// select "LongURL Mobile Expander", and click Uninstall.

//

// --------------------------------------------------------------------

//

// ==UserScript==

// @name          LongURL Mobile Expander

// @namespace     http://IamSeanMurphy.com

// @description   Expand shortened URLs wherever you go by harnessing the power of LongURL.org.

// @author        Sean Murphy

// @edited_by     Morteza Ziaeemehr

// @homepage      http://LongURL.org

// @include       *

// ==/UserScript==



(function() {
    
    
    
    // URL for the LongURL API
    
    this.api_endpoint = 'http://api.longurl.org/v2/';
    
    this.script_version = '2.0';
    
    this.known_services = {};
    
    this.link_cache = [];
    
    this.ajax_queue = [];
    
    this.tooltip_node;
    this.tooltip_timout;
    this.modlinks_timeout;
    this.current_link;
    
    
    
    getServicesFromAPI = function() {
        
        ajaxRequest({
            
            method: "GET",
            
            url: this.api_endpoint + 'services?format=json',
            
            headers: {
                'User-Agent': 'LongURL Mobile Expander/'+this.script_version+' (Greasemonkey)'
            },
            
            onload: function(response) {
                
                saveSupportedServices(response);
                
                modifyShortLinks();
                
            }
            
        });
        
    };
    
    
    
    saveSupportedServices = function(response) {
        
        var data = jsonToObject(response);
        
        if (typeof(data.messages) !== 'undefined') { // There was an error
            
            return;
            
        }
        
        
        
        this.known_services = data;
        
        
        
        // Store the list of supported services locally
        
        if (setValue('longurl_services', response.responseText)) {
            
            alert('LongURL Mobile Expander requires Greasemokey 0.3 or higher.');
            
        }
        
        
        
        var date = new Date();
        
        date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 1));
        
        setValue('longurl_expire_services', date.toUTCString());
        
    };
    
    
    
    modifyShortLinks = function() {
        var links = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
        
        var current_domain = document.location.href.match(/^https?:\/\/(?:www\.)?([^\.]+\.[^\/]+)/i);
        
        
        for (var x = 0; x < links.snapshotLength; x++) {
            
            var a = links.snapshotItem(x);
            
            var href = a.href;
            
            var domain = href.match(/^http:\/\/(?:(?:www\.)?(?:[^\.]+\.(notlong\.com|qlnk\.net|ni\.to|lu\.to|zzang\.kr)|([^\.]+\.[^\/]+)))/i);
            
            if (domain) {
                domain = domain[1] || domain[2] || false;
            }
            
            // Check if link domain is in list
            
            if ((domain !== current_domain[1]) && (typeof(this.known_services[domain]) !== 'undefined')) {
                
                // Check link URL against domain regex
                var regex = new RegExp(this.known_services[domain]['regex'], 'i');
                if (!this.known_services[domain]['regex'] || href.match(regex)) {
                    
                    a.addEventListener('mouseover', function(e) {
                        showTooltip();
                        
                        expandLink(e.target, e);
                        
                    }, true);
                    
                    a.addEventListener('mouseout', function(e) {
                        
                        hideTooltip();
                        
                    }, true);
                }
                
            }
            
        }
        
    };
    
    
    
    expandLink = function(anchor, e) {
        
        if (typeof(anchor.href) === 'undefined') return;
        
        this.current_link = anchor.href;
        
        
        
        // Check cache
        
        if (getCache(anchor.href) !== false) {
            
            tooltip(getCache(anchor.href), e);
            
            return;
            
        }
        
        
        
        tooltip('Expanding...', e);
        
        
        
        if (enqueue(anchor.href)) {
            
            ajaxRequest({
                
                method: "GET",
                
                url: this.api_endpoint + 'expand?format=json&title=1&url=' + encodeURIComponent(anchor.href),
                
                headers: {
                    'User-Agent': 'LongURL Mobile Expander/'+this.script_version+' (Greasemonkey)'
                },
                
                onload: function(response) {
                    
                    var data = jsonToObject(response);
                    
                    
                    
                    // cache response
                    
                    if (typeof(data.messages) !== 'undefined') { // There was an error
                        
                        setCache(anchor.href, 'LongURL Error: ' + data.messages[0].message);
                        
                    } else {
                        var result = data['long-url'];
                        if (typeof(data['title']) !== 'undefined') {
                            result = '<strong style="font-weight: bold;">'+data['title']+'</strong><br />'+ '<a href="' + result + '" title="Go!">' + result.slice(0, 50) + '</a>';
                        }
                        result += ' <a href="http://longurl.org/expand?url='+encodeURIComponent(anchor.href)+'&amp;src=lme_gm" title="Get more information about this link" style="color:#00f;">[more]</a>';
                        
                        setCache(anchor.href, result);
                        
                    }
                    
                    
                    
                    //Remove from queue
                    
                    dequeue(anchor.href);
                    
                    
                    // Make sure user is still hovering over this link before updating tooltip
                    if (getCurrent() === anchor.href) {
                        tooltip(getCache(anchor.href));
                    }
                    
                }
                
            });
            
        }
        
    };
    
    getCurrent = function() {
        return this.current_link;
    };
    
    
    setCache = function(key, value) {
        
        this.link_cache[escape(key)] = value;
        
    };
    
    getCache = function(key) {
        if (typeof(this.link_cache[escape(key)]) !== 'undefined') {
            return this.link_cache[escape(key)];
        }
        return false;
    };
    
    
    enqueue = function(short_url) {
        if (typeof(this.ajax_queue[escape(short_url)]) === 'undefined') {
            this.ajax_queue[escape(short_url)] = true;
            return true;
        }
        return false;
    };
    
    
    dequeue = function(short_url) {
        
        this.ajax_queue.splice(this.ajax_queue.indexOf(escape(short_url)), 1);
        
    };
    
    
    
    tooltip = function(text, e) {
        
        if (typeof(this.tooltip_node) === 'undefined') {
            
            // Create the tooltip element
            
            this.tooltip_node = document.createElement('span');
            this.tooltip_node.id = 'longurlme_tooltip';
            
            this.tooltip_node.style.display = 'none';
            
            this.tooltip_node.style.position = 'absolute';
            this.tooltip_node.style.overflow = 'hidden';
            
            this.tooltip_node.style.maxWidth = '300px';
            
            this.tooltip_node.style.backgroundColor = '#ffffc9';
            
            this.tooltip_node.style.border = '1px solid #c9c9c9';
            
            this.tooltip_node.style.padding = '3px';
            
            this.tooltip_node.style.fontSize = '13px';
            this.tooltip_node.style.letterSpacing = '0px';
            this.tooltip_node.style.color = '#000';
            
            this.tooltip_node.style.zIndex = '5000';
            
            this.tooltip_node.style.textAlign = 'left';
            
            
            
            document.body.appendChild(this.tooltip_node);
            
            this.tooltip_node.addEventListener('mouseover', function(e) {
                showTooltip();
                
            }, true);
            
            this.tooltip_node.addEventListener('mouseout', function(e) {
                
                hideTooltip();
                
            }, true);
            
        }
        
        
        
        if (text === false) {
            
            this.tooltip_node.style.display = 'none';
            
        } else {
            
            this.tooltip_node.innerHTML = text;
            
        }
        
        
        
        if (typeof(e) !== 'undefined') {
            showTooltip();
            
            this.tooltip_node.style.display = 'inline';
            
            
            
            var pos = (e) ? cursorPosition(e):cursorPosition();
            
            this.tooltip_node.style.top = (pos.y + 15) + 'px';
            
            this.tooltip_node.style.left = (pos.x) + 'px';
            
        }
        
    };
    
    showTooltip = function() {
        clearTimeout(this.tooltip_timeout);
    };
    
    hideTooltip = function() {
        clearTimeout(this.tooltip_timeout);
        this.tooltip_timeout = setTimeout(function() {tooltip(false);}, 1000);
    };
    
    
    
    // cursorPosition written by Beau Hartshorne
    
    cursorPosition = function(e) {
        
        e = e || window.event;
        
        var position = {x:0, y:0};
        
        if (e.pageX || e.pageY) {
            
            position.x = e.pageX;
            
            position.y = e.pageY;
            
        } 
        
        else {
            
            position.x = e.clientX + 
                
                (document.documentElement.scrollLeft || 
                 
                 document.body.scrollLeft) - 
                
                document.documentElement.clientLeft;
            
            position.y = e.clientY + 
                
                (document.documentElement.scrollTop || 
                 
                 document.body.scrollTop) - 
                
                document.documentElement.clientTop;
            
        }
        
        return position;
        
    }
    
    
    
    // Greasekit did away with the GM_* functions, so for
    
    // compatability I have to use wrapper functions and
    
    // implement alternative functionality.
    
    setValue = function(key, value) {
        
        if (typeof(GM_setValue) !== 'undefined') {
            
            return GM_setValue(key, value);
            
        } else {    
            
            document.cookie = key+'='+encodeURIComponent(value);
            
        }
        
    };
    
    
    
    getValue = function(key, default_val) {
        
        if (typeof(GM_getValue) !== 'undefined') {
            
            return GM_getValue(key, default_val);
            
        } else {
            
            if (document.cookie && document.cookie != '') {
                
                var cookies = document.cookie.split(';');
                
                for(var x = 0; x < cookies.length; x++) {
                    
                    var cookie = new String(cookies[x]).strip();
                    
                    if (cookie.substring(0, key.length + 1) == (key + '=')) {
                        
                        return decodeURIComponent(cookie.substring(key.length + 1));
                        
                    }
                    
                }
                
            }
            
            return default_val;
            
        }
        
    };
    
    
    
    ajaxRequest = function(details) {
        
        if (typeof(GM_xmlhttpRequest) !== 'undefined') {
            
            return GM_xmlhttpRequest(details);
            
        } else {
            
            json_callback = details.onload;
            
            var script = document.createElement('script');
            
            script.src = details.url + '&callback=json_callback';
            
            document.body.appendChild(script);
            
        }
        
    };
    
    
    
    jsonToObject = function(response) {
        
        if (typeof(response.responseText) === 'undefined') {
            
            return response;
            
        } else {
            
            return eval('(' + response.responseText + ')');
            
        }
        
    };
    
    modifiedDOMCallback = function(e) {
        if (e.relatedNode.id === 'longurlme_tooltip') return;
        
        clearTimeout(this.tooltip_timeout);
        this.tooltip_timeout = setTimeout(function() {modifyShortLinks();}, 500);
    };
    
    
    
    init = function() {
        
        var now = new Date();
        
        var serialized_services = getValue('longurl_services', false);
        
        var services_expire = Date.parse(getValue('longurl_expire_services', now.toUTCString()));
        
        
        
        if (serialized_services && services_expire > now.getTime()) {
            
            this.known_services = eval('(' + serialized_services + ')');
            
            modifyShortLinks();
            
        } else {
            
            getServicesFromAPI();
            
        }
        
        window.addEventListener('load', function(e) {
            if (typeof(document.body) === 'undefined') return;
            
            document.body.addEventListener('DOMNodeInserted', function(e) {
                if (e.relatedNode.id === 'longurlme_tooltip') return;
                
                clearTimeout(this.tooltip_timeout);
                this.tooltip_timeout = setTimeout(function() {modifyShortLinks();}, 500);
            }, false);
        }, true);
    };
    
    init();
    
})();