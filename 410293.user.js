// ==UserScript==
// @name       Google search link fix
// @namespace  http://userscripts.org/users/hangyagy
// @version    0.1
// @description  Fix google search links
// @match      https://www.google.hu/*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  UJLAKY Tibor
// ==/UserScript==

jQuery(document).ready(function() {
    
    XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function(body) {
        var oldChange = this.onreadystatechange;
        this.onreadystatechange = function() {
            var $links     = jQuery('div.rc h3 a');
            var $ems       = $links.find('em');
            var linkColor  = '#1e0fbe';
            
            $links.css('text-decoration', 'underline');
            $links.css('font-weight', 'normal');
            $links.css('font-size', 'medium');
            $links.css('color', linkColor);
            $ems.css('color', linkColor);
           
            
            oldChange(arguments);
           	
        };
        
        this.reallySend(body);
    };
});