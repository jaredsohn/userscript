// ==UserScript==
// @name       Format JSON
// @namespace  http://nytimes.com/
// @version    0.1
// @description  enter something useful
// @match      http://qa-auto01.dev.ewr1.nytimes.com/ReportServer/*
// @match      http://qa-auto01.stg.ewr1.nytimes.com/ReportServer/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

$('td').each(function() {
    var content = $(this).text().replace(/\n/g, '');
        
    var m = content.match(/Service response:(.+)/i)
    
    if (m) {
        
        var cleanJson = '[' + clean(m[1]) + ']';
        
        var formattedJson = JSON.stringify( JSON.parse(cleanJson), null, 4);
    
        var $content = $('<pre style="font-size:10pt">').text(formattedJson);
        
        $(this)
        	.text('Response: ')
            .append($content);
    }
    
    m = content.match(/Service call \((.*?)\):\s*(.+)/i)
    
    if (m) {
        var rawJson = clean(m[2]);
        var formattedJson = JSON.stringify( JSON.parse(rawJson), null, 4);
    
        var $content = $('<pre style="font-size:10pt">').text(formattedJson);
        
        $(this)
        	.text('Request: ' + m[1])
            .append($content);
    }
    
    function clean(rawJson) {        
    	rawJson = rawJson.replace(/'/g, '"');
    	rawJson = rawJson.replace(/\}\{/g, '},{');
    	rawJson = rawJson.replace(/"{/g, '{');
    	rawJson = rawJson.replace(/}"/g, '}');
    	rawJson = rawJson.replace(/u"/g, '"');
        
        return rawJson;
    }
});