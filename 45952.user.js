// ==UserScript==
                // @name          The Syndicate Theme
                // @namespace     http://userscripts.org  
                // @description	  Just adding The Syndicate logo to the top of the CN page.
                // @author        letub
                // @homepage      
                // @include       http://www.cybernations.net/*
                // @include       https://www.cybernations.net/*
                // @include       http://*.www.cybernations.net/*
                // @include       https://*.www.cybernations.net/*
                // ==/UserScript==
                (function() {
                var css = "@namespace url(http://www.w3.org/1999/xhtml); body { background-image: url(http://img.photobucket.com/albums/v469/Cope/synbanner3.png) !important; background-position: top center !important; font-family: Verdana, Tahoma, Arial, Trebuchet MS, Sans-Serif, Georgia, Courier, Times New Roman, Serif !important; font-size: 11px !important; line-height: 135% !important; margin: 0px 0px 0px 0px !important; padding: 0px !important; text-align: center !important; background-color: #001a49 !important; } shadetabs li a:hover{ text-decoration: none !important; color: #0024ff !important; } A:hover { color: #0024ff !important; }";
                if (typeof GM_addStyle != "undefined") {
                	GM_addStyle(css);
                } else if (typeof addStyle != "undefined") {
                	addStyle(css);
                } else {
                	var heads = document.getElementsByTagName("head");
                	if (heads.length > 0) {
                		var node = document.createElement("style");
                		node.type = "text/css";
                		node.appendChild(document.createTextNode(css));
                		heads[0].appendChild(node); 
                	}
                }
                })();
                