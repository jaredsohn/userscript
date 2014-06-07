// ==UserScript==
// @name          Cheggit Handy Shortcuts
// @namespace     http://www.userscripts.org
// @description   Converts names in wiki format into links to popular engines.
// @include       http://cheggit.net/browsetorrents.php*
// ==/UserScript==

function chs_InsertAfter( referenceNode, newNode) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
    
}    
var chs_style = document.createElement("style");
chs_style.innerHTML = ".chs_title,.tablesubtext a.chs_title:link, .tablesubtext a.chs_title:visited{color: rgb(0,0,200); font-size:10px; text-decoration:none}";
chs_style.innerHTML += ".chs_or,.tablesubtext a.chs_or:link, .tablesubtext a.chs_or:visited{color: #cc00cc; font-size:10px; text-decoration:none}";
chs_style.innerHTML += ".chs_append,.tablesubtext a.chs_append:link, .tablesubtext a.chs_append:visited{color: rgb(0,200,0); font-size:10px; text-decoration:none}";
chs_style.innerHTML += ".chs_remove,.tablesubtext a.chs_remove:link, .tablesubtext a.chs_remove:visited{color: rgb(200,0,0); font-size:10px; text-decoration:none;padding-right:20px}"; 
chs_style.innerHTML += ".tablesubtext a.chs_append:hover,.tablesubtext a.chs_remove:hover,.tablesubtext a.chs_title:hover,.tablesubtext a.chs_or:hover{font-weight:bold;text-decoration:underline}";
document.body.appendChild(chs_style);
        
chs_location = window.location.href;
chs_url = chs_location.split("?filter=");
        
chs_tags = document.getElementsByClassName('tag');
chs_title_enabled = true;
chs_or_enabled = true;
chs_append_enabled = true;
chs_remove_enabled = true;
if (chs_url[1] == null) {
    chs_or_enabled = false;
    chs_append_enabled = false;
    chs_remove_enabled = false;
}

for(i=0; i < chs_tags.length; i++) {
    if (chs_title_enabled) {
        chs_title = document.createElement("a");
        chs_title.setAttribute('class', 'chs_title');
        chs_temp_title = chs_tags[i].innerHTML;
        chs_temp_title = chs_temp_title.replace(/\./g, " ");  
        
        chs_title.setAttribute('href', chs_url[0] + "?filter=title:" + chs_temp_title);
        chs_title.textContent = " ^ ";
        chs_tags[i].parentNode.insertBefore(chs_title, chs_tags[i]);            
    }    

    if (chs_append_enabled) {
        chs_append = document.createElement("a");
        chs_append.setAttribute('class', 'chs_append');
        chs_append.setAttribute('href', chs_url[0] + "?filter=" + chs_url[1] + ";" + chs_tags[i].innerHTML);
        chs_append.textContent = " + ";
        chs_tags[i].parentNode.insertBefore(chs_append, chs_tags[i]);            
    }
   
    if (chs_remove_enabled) {
        chs_remove = document.createElement("a");
        chs_remove.setAttribute('class', 'chs_remove');
        chs_remove.setAttribute('href', chs_url[0] + "?filter=" + chs_url[1] + ";-" + chs_tags[i].innerHTML);
        chs_remove.textContent = " - ";
        chs_InsertAfter(chs_tags[i], chs_remove);              
    }
    
    if (chs_or_enabled) {
        chs_or = document.createElement("a");
        chs_or.setAttribute('class', 'chs_or');
        chs_or.setAttribute('href', chs_url[0] + "?filter=" + chs_url[1] + " |" + chs_tags[i].innerHTML);
        chs_or.textContent = " | ";
        chs_InsertAfter(chs_tags[i], chs_or);              
    }      
    
    chs_tags[i].setAttribute('href', chs_url[0] + "?filter=" + chs_tags[i].innerHTML);
}