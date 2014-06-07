// ==UserScript==
// @name            List2Url
// @author          Jonas John
// @namespace       http://www.jonasjohn.de/
// @description     This Greasemonkey script lets you enter a URL list and converts them to HTML links
// @include         http://*
// @license         Creative Commons Attribution License
// @version	        0.1
// @released        2006-03-26
// @updated         2006-03-26
// @compatible      Greasemonkey
// ==/UserScript==

/* 
 * Creative Commons Attribution License
 * http://creativecommons.org/licenses/by/2.5/
*/
 

(function(){

    function l2u_run(){
        var l2u_list = document.getElementById('l2u_list');
        
        var list = l2u_list.value.split(/\r?\n/);
        
        var html = '<b>HTML links:</b><ul>'; 
        
        for (var x=0; x < list.length; x++){
            html += '<li><a href="' + list[x] + '">'+ list[x] + '</a></li>';
            html += "\n";
        }
        
        html += "</ul>";
        
        document.getElementById('l2u_html').innerHTML = html;
        
        document.getElementById('l2u_plainhtml').innerHTML = html;
        
  
        
    }
    
    function l2u_display(){
        
        t = '<form>';
        t += '<h1>List2url</h1>';
        t += '<fieldset><legend>List2url</legend>';
        t += '<label for="l2u_list">Paste URLs here:</label><br/>';
        t += '<textarea name="l2u_list" id="l2u_list" cols="70" rows="10" style="width: 70%" wrap="off"></textarea><br/>';
        t += '<b>Output HTML:</b><br/><textarea name="l2u_plainhtml" id="l2u_plainhtml" cols="70" readonly="readonly" wrap="off" rows="8" style="width: 70%"></textarea><br/>';
        t += '<div id="l2u_html" style="border: 1px solid #ccc; padding: 1em; width: 70%;"><b>HTML links:</b></div><br/>';
        t += '<input type="button" id="l2u_btn" value="Convert plain URL list to HTML links" /><br/><br/>';
        t += '<span style="font-size: 70%">Warning: The referer of the current website will be send to the URLs you click</span>';
        t += '</fieldset>';
        t += '</form>';
        
        document.body.innerHTML = t;
        
        document.getElementById('l2u_btn').addEventListener('click', l2u_run, false);
        
    }

    function l2u_init(){
        
        GM_registerMenuCommand('List2url: Display', l2u_display); 
        
    }
    
    // run!
    l2u_init();
  
}) ();
