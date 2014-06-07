// ==UserScript==
// @name            ModCP Commands
// @namespace       Terryx/MCP
// @description     It's magic!
// @include         *hackforums.net*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
    var form = event ? event.target : this;
    
    if(window.location.href.toString().indexOf("modcp.php")!=-1) {
        var arTextareas = new Array(document.forms[0].elements['banreason']);
    } else {
        var arTextareas = form.getElementsByTagName('textarea');
    }
    
    for (var i = arTextareas.length - 1; i >= 0; i--) {
        var elmTextarea = arTextareas[i];
        
        var re = /\[nmp\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"You cannot buy, sell, trade, or offer services outside the Marketplace. Violation earns an automatic 3-day ban. Read the Help Documents upon return.");    

        re = /\[hc\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"HackerCraft sales not involving in-game currency belong to the Marketplace, similar to all marketplace-style threads (buy, sell, trade, services). A three-day ban is automatic; wait it out. Read the Help Documents on your return.");        
    
    }
            
    form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;