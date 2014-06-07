// ==UserScript==
// @name          NeedJAV Thread Search At Top
// @namespace     http://www.userscripts.org
// @description   Highlights keywords
// @include       http://www.needjav.com/*
// ==/UserScript==

url = window.location;
match = /tid=[0-9]+/.exec(url);

if (match != null) {
    id = match[0].replace(/[^0-9]/g, '');
    var container = document.getElementById('logo');
    var new_element = document.createElement('div');
    new_element.setAttribute('width', '100%');
    new_element.setAttribute('cellspacing', '0');
    new_element.setAttribute('cellpadding', '0');
    new_element.setAttribute('border', '0');
    tempString = "<form method='post' action='search.php'>"; 
    tempString += "<input type='hidden' value='thread' name='action'>";
    tempString += "<input type='hidden' value='" + id + "' name='tid'>";
//    tempString += "<input type='text' size='25' class='textbox' onblur='if(this.value=='') { this.value='Enter Keywords'; }' onfocus='if(this.value == 'Enter Keywords') { this.value = ''; }' value='Enter Keywords' name='keywords'>";
    tempString += "<input type='text' size='25' class='textbox' value='' name='keywords'>";
    tempString += "<input type='submit' value='Search Thread' class='button'>";
    tempString += "</form>";
    
    new_element.innerHTML = tempString;
    container.insertBefore(new_element, container.firstChild);
}          
            


