// ==UserScript==
// @name       Enhance scrum board
// @namespace  http://com.janwiebe.enhance/
// @version    0.1.1
// @description  enter something useful
// @match      https://*.leankit.com/Boards/View/*
// @copyright  2012+, Jan Wiebe
// ==/UserScript==

$('.blockOverlay').live('click', function (event) { 
    
    $('a.close').trigger( "click" );
    
    event.preventDefault(); 
    return false; 
 });


function go() {
    
    // remove premium button container
    
    var x = document.getElementsByClassName('premium-button-container')[0];
    
    if(x != null)
    {
        var p = x.parentNode;
        p.removeChild(x);       
        
    }
    
    // set width of textbox with external ID
    var externalIdElement = $('#Card_external_id');
    if(externalIdElement != null)
    {
        externalIdElement.attr('style', 'width: 198px;');
        
        // <a id="copy_external_id_button" class="external_link_icon link" title="Copy" href="#"><span><i class="icon-copy"></i></span></a>
        
        var existingElement = $('#external-id');
        if(existingElement != null)              
        {
            
            var existingLink = $('copy_external_id_button');
            if(existingLink == null)
            {
        		existingElement.append('<a id="copy_external_id_button" class="external_link_icon link" title="Copy" href="#"><span><i class="icon-copy"></i></span></a>');
            }
        }
    }
}
setInterval(go, 1000);
void 0;