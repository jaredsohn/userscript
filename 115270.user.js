// ==UserScript==
// @name           ExpandeURL - Expand short url using longurl.org service
// @description    Show preview long url when mouse over short url - Muestra dirección real al pasar el ratón sobre un enlace corto
// @include        http*
// @date           20120402
// @version        3.0
// @author         Antonio Rguez. Capita
// @license        GPL GNU General Public License - http://www.gnu.org/copyleft/gpl.html  
// ==/UserScript==

//
// Based in original userscript LongURL Mobile Expander
// version 2.0
// Copyright (c) 2008, Sean Murphy
// Released under the GPL license
//


// ----------------------------------------------------------------------------------------------
//     TAMAÑO LETRAS - FONT SIZE
// ----------------------------------------------------------------------------------------------
// Cambia al valor deseado
// Change value to desired size
//
const tam_letra = '13px'; 

(function() {
	// URL for the LongURL API
	this.api_endpoint = 'http://api.longurl.org/v2/';	
	this.link_cache = [];
	this.ajax_queue = [];
	this.tooltip_node;
	this.tooltip_timout;
	this.modlinks_timeout;
	this.current_link;

	modifyShortLinks = function() {
	    var links = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);					
		var current_domain = document.location.href.match(/^https?:\/\/(?:www\.)?([^\.]+\.[^\/]+)/i);		
		for (var x = 0; x < links.snapshotLength; x++) {            		 
		    var a = links.snapshotItem(x);
			var href = a.href;									
			
			// Filtro por dominios habituales de acortadores
			var domain = href.match(/^https?:\/\/?(.+\.co|.+\.ly|.+\.to|.+\.in|.+\.me|.+\.kcy|.+\.as|.+\.cc|.+\.gl|.+\.mp|.+\.ws|.+\.gd|.+\.us|.+\.it)\//i);				
			
			if (domain) {													
				// Comprueba si el enlace es fuera del dominio actual
				if (domain[1] !== current_domain[1]) {					     					
					a.addEventListener('mouseover', function(e) {
										showTooltip();
										expandLink(e.target, e);
										}, true);

					a.addEventListener('mouseout', function(e) {
										hideTooltip();
										}, true);
				    // Elimina tooltip default
					a.title = '';											
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
		
		tooltip('<img src="https://lh4.googleusercontent.com/-WLxQsmKfzyY/T3VpsWo-xDI/AAAAAAAAACA/1waZLlslXMs/s16/cargando.gif" style="margin:4px 0 0 10px;float:right" alt="Espere, por favor"><strong>Expandiendo</strong>', e);
		
		if (enqueue(anchor.href)) {
			ajaxRequest({
				method: "GET",
				url: this.api_endpoint + 'expand?format=json&title=1&url=' + encodeURIComponent(anchor.href),
				onload: function(response) {
					var data = jsonToObject(response);                   
					// cache response
					if (typeof(data.messages) !== 'undefined') { // There was an error
						var result = 'LongURL Error: ' + data.messages[0].message;
					} else {
					    var result = '<div>'+data['long-url'];
					    if (typeof(data['title']) !== 'undefined') {
					        result = '<div style="color:#8DC7F1;font-weight:bold;margin-bottom:10px;width:100%">'+data['title']+'</div>'+result;
					    }
					    result += ' <a href="http://longurl.org/expand?url='+encodeURIComponent(anchor.href)+'&amp;src=lme_gm" title="M&aacute;s informaci&oacute;n sobre este enlace" style="color:#E9FE94;">[info]</a></div>';
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
			this.tooltip_node.style.maxWidth = '500px';
			this.tooltip_node.style.backgroundColor = '#2B2B2B';
			this.tooltip_node.style.border = '1px solid #D2D2D2';
			this.tooltip_node.style.borderRadius = '5px'; // standard
			this.tooltip_node.style.MozBorderRadius = '5px'; // Mozilla
			this.tooltip_node.style.WebkitBorderRadius = '5px'; // WebKit			
			this.tooltip_node.style.padding = '8px';
			this.tooltip_node.style.lineHeight = '1.3em';
			this.tooltip_node.style.fontFamily = 'Arial, Helvetica';
			this.tooltip_node.style.fontSize = tam_letra;
			this.tooltip_node.style.letterSpacing = '0px';
			this.tooltip_node.style.color = '#F4F4F4';
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
			if ((pos.x + 530) > window.innerWidth)
			   this.tooltip_node.style.left = (window.innerWidth - 550) + 'px';			
			else
			   this.tooltip_node.style.left = (pos.x) + 'px';				
			   
		}
	};
	
	showTooltip = function() {
	    clearTimeout(this.tooltip_timeout);
	};
	
	hideTooltip = function() {
	    clearTimeout(this.tooltip_timeout);
	    this.tooltip_timeout = setTimeout(function() {tooltip(false);}, 500);
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
		
	init = function() {	       
	document.body.addEventListener('DOMNodeInserted', function(e) {
	            if (e.relatedNode.id === 'longurlme_tooltip') return;
                    
                clearTimeout(this.tooltip_timeout);
                this.tooltip_timeout = setTimeout(modifyShortLinks, 500);
	        }, true);       
    };
    
    init();
})();
