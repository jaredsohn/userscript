// ==UserScript==
// @name           LiveJournal Default Memory Security
// @namespace      http://afunamatata.com/greasemonkey/
// @description    Set a default security when saving new memories
// @include        http://www.livejournal.com/tools/memadd.bml*
// @tags           livejournal
// ==/UserScript==

var select = document.getElementsByName("security")[0];
// will only appear if it's an old memory
var reset = document.evaluate("//input[@type='reset']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(select && select.tagName=='SELECT' && reset==null) 
{
    GM_addStyle("#defaultSecurityOption {position: absolute; left: 40%; top: 40%; border: 1px silver solid; outline: 1px gray solid; padding: 2em 3em; background-color: #fff; font-weight: bold; } #defaultSecurityLightbox {width: 100%; height: 100%; position: absolute; left: 0; top: 0; opacity: 0.8; background-color: white;} #defaultSecurityOption button {margin-top: 0.5em; width: 100%;}");
    // create the default type selector
    createDefaultSelect(select);

    // if you have no defaults set, do not change anything
    var savedDefault = GM_getValue("default");
    if(savedDefault) 
    {
        select.value=savedDefault;
    }

}

function createDefaultSelect(select) 
{
    var optionsPanel = document.createElement("div");
    optionsPanel.setAttribute("id", "defaultSecurityOption");

    var defaultLabel = document.createElement("label");
    defaultLabel.appendChild(document.createTextNode("Default security for new memories: "));

    var defaultDropdown = select.cloneNode(true);
    defaultDropdown.addEventListener("change", function(event) {
        GM_setValue("default",event.target.value);
        select.value = event.target.value;
        closeLightbox();
    }, false);

    var cancelButton = document.createElement("button");
    cancelButton.appendChild(document.createTextNode( "Cancel (Esc)"));
    cancelButton.addEventListener("click", function() {
        closeLightbox();
    }, false);
    
    document.addEventListener("keypress", function(e) {
        if(e.keyCode==e.DOM_VK_ESCAPE)
            closeLightbox();
    }, false );

    optionsPanel.appendChild(defaultLabel);
    optionsPanel.appendChild(defaultDropdown);
    optionsPanel.appendChild(document.createElement("br"));
    optionsPanel.appendChild(cancelButton);

    var defaultOption = document.createElement("option");
    defaultOption.text=">> default";

    // open light box
    defaultOption.addEventListener("click", function() {
        defaultDropdown.value = GM_getValue("default");
        var lightbox = document.createElement("div");    
        lightbox.setAttribute("id", "defaultSecurityLightbox");
        
        lightbox.appendChild(optionsPanel);
        document.body.appendChild(lightbox);

    }, false);
    
    select.appendChild(defaultOption);
}

function closeLightbox() {
    document.body.removeChild(document.getElementById("defaultSecurityLightbox"));
}
