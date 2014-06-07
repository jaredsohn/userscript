// Untiny GreaseMonkey Script
// version 1.0
// 2008-10-09
// Copyright (c) 2008, UnTiny (by Saleh Al-Zaid. http://www.alzaid.ws)
// Website: http://untiny.me/
//
// License: 
// Released under the Creative Commons Attribution-No v3.0 license
// http://creativecommons.org/licenses/by-nd/3.0/
//
// Description:
// Untiny GreaseMonkey Script is a greasemonkey 
// script of UnTiny Servive (http://untiny.me) 
// to extract the original urls from tiny one 
// like tinyurl.com, tiny.pl  and many others.
//
// This script will change the tiny urls links 
// in a page directly to original links.
//
// To make it work you need to install Greasemonkey 0.3 
// or later from http://greasemonkey.mozdev.org/
// ------------------------------------------------------------------
// ==UserScript==
// @name           Untiny
// @namespace      http://untiny.me/
// @description    Extract the orignal urls from tiny urls. Untiny supports several tiny url services like tinyurl.com, tiny.pl and many more.
// @include        *
// @exclude       
// ==/UserScript==


this.api_endpoint = 'http://untiny.alzaid.ws/api/1.0/';
this.script_version = '1.0';
this.services;
this.untinyIconStyle = 'margin: 1px; padding: 2px; border: 1px #ccc solid; background: white;';
	
	main();
    
    function getTinyServices() {
		(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: this.api_endpoint + 'services?format=json',
            headers: {'User-Agent': 'UnTiny Greasemonkey Script version '+this.script_version},
            onload: function(response) {    
                if (typeof(response.responseText) === 'undefined') {
                    services = 'undefined';
                } else {				
                    services = eval('(' + response.responseText + ')');					
                    convertLinks();                    
                }
                
            }
        });
		}) ();
    };

    function convertLinks(){
						
        links = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

        for(var i = 0; i < links.snapshotLength; i++) {
			var link = links.snapshotItem(i);
			for (var x in this.services){                                
				if (typeof(this.services[x]) == 'string'){
					var linkStr = link + "";
					var httpServ = 'http://' + services[x];					
					var httpWwwServ = 'http://www.' + services[x];
					if( (linkStr.indexOf(httpServ) == 0 || linkStr.indexOf(httpWwwServ) == 0) && ((linkStr != httpServ) && (linkStr != httpWwwServ) && (linkStr != (httpServ + '/')) && (linkStr != (httpWwwServ + '/'))) ){						
						// Create untiny icon
						icon = document.createElement('img');
						icon.setAttribute('src','http://untiny.alzaid.ws/extra/untiny.png');
						icon.setAttribute('style', this.untinyIconStyle);
						icon_id = 'untiny_icon_id_' + i;
						icon.setAttribute('id', icon_id);	        
						
						link.parentNode.insertBefore(icon,link.nextSibling);
						 (function (link_inside, icon_id_inside) {						 
							GM_xmlhttpRequest({
								method:'GET',
								url: this.api_endpoint + 'extract?url=' + link_inside.href +'&format=text',
								onload: function(o) {																			
									var new_href = o.responseText;
									link_inside.innerHTML = new_href
										.split("&").join("&amp;&#8203;")
										.split("%").join("%&#8203;")
										.split("/").join("/&#8203;");
									link_inside.href = new_href;
									var iconElmnt = document.getElementById(icon_id_inside);
									link_inside.parentNode.removeChild(iconElmnt);
								}
							});
						}) (link, icon_id);
						break;
					}
				}
			}                
        }
    
    }
	
	function main(){
        getTinyServices();
    }

