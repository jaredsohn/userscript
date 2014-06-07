// ==UserScript==
// @name            StumbleUpon Copy URL Button
// @namespace       http://www.jonasjohn.de/
// @description     The problem: You want to link to somebody's pages all tagged with "xyz"? But, because stumbleupon.com uses some tricky JavaScript, Ajax, ... techniques you can't simply copy the location in your browser... thats the point why I made this script, it simply adds a small "copy url" button to each profile. Very simple, but it helps :-) 
// @include         http://*.stumbleupon.com/
// @license         Modified BSD license (URL: http://www.jonasjohn.de/lab/swe/scub_license.txt)
// @version	        0.1
// ==/UserScript==

(function(){

    // extract the stumble upon username:
    var su_username = document.location.href.replace(/http:\/\/(.*?)\.stumbleupon.com\//, "$1");
    
    // get the parent element of the button element
    var button = document.getElementsByTagName('button')[0]; 
    var before_button = 1;
    if (button.innerHTML == "Ignore Me") { before_button = 0; }
    var button_area = document.getElementsByTagName('button')[0].parentNode;

    // build the button:
    var get_url_btn  = '<button id="get_url_btn" ';
    get_url_btn += (before_button == 0) ? 'class=mini ' : '';
    get_url_btn += 'title="Click here to get the URL of the currently selected tag">Copy URL</button>';
 
    // append the button to the button area
    button_area.innerHTML = (before_button == 1) ? get_url_btn + button_area.innerHTML : button_area.innerHTML + get_url_btn;

    // add the function to the button:
    document.getElementById('get_url_btn').addEventListener('click',function () {
        
        var sb = document.getElementById('changetag');
        var tag = sb.options[sb.selectedIndex].value.replace(/.[0-9]+$/, '');
        var ok = 1;
       
        // handles some special pages:
        if (tag == '-Entire Blog'){ tag = ""; }
        else if (tag == '-Pages I Like'){ tag = "favorites/"; }
        else if (tag == '-Discoveries'){ tag = "discoveries/"; }
        else if (tag == '-Pages I Dislike'){ ok = 0; }
        else if (tag == '-People I Like'){ tag = "tag/stumblers/"; }
        else if (tag == '-Stumbles'){ ok = 0; }
        else if (tag == '-Top Picks'){ tag = "picks/"; }
        else if (tag == '-Tag Cloud'){ tag = "tags/"; }
        else { tag = "tag/"+tag+"/"; }
        
        // show the url or a error message:
        if (ok == 1){ prompt("This is the URL to the current page or tag:", "http://"+su_username+".stumbleupon.com/"+tag); }
        else { alert("Sorry, this page is not reachable trough a URL :-("); }
        
        return false;
    },false)
    

}) ();


