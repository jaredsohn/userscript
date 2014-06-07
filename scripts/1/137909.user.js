// ==UserScript==
// @name        imageshack no-register
// @namespace   http://tinychat.com/
// @description Simple script to remove the register dialog, allow direct link and remove the annoying signup tooltip on direct links.
// @include     *imageshack.us/*
// @version     0.1
// ==/UserScript==


// remove the register dialog
var reg_dialog = document.getElementById("register-dialog");
if (reg_dialog)
    reg_dialog.parentNode.removeChild(reg_dialog);


// find the imagecodes section
var img_codes = document.getElementById("ImageCodes");
if (img_codes)
{
    // iterate through links inside
    var links  = img_codes.getElementsByTagName("a");
    for (var link in links) 
    {
        // work on a "tt" class only
        if (links[link].className!="tt")
            continue;
        
        // iterate through inputs under links, the direct link is an "input"
        var inputs = links[link].getElementsByTagName("input");
        for (var inp in inputs)
        {
            // only work on inputs that are "readonly", no point touching the rest
            if (inputs[inp].className!="readonly")
                continue;

            // remove the offending attributes/event handlers
            var input = inputs[inp];
            input.removeAttribute("disabled");
            input.removeAttribute("ondoubleclick");
            input.removeAttribute("onclick");
            input.removeAttribute("onselectstart");
            input.removeAttribute("onmousedown");
        }
    }
    
    // remove the annoying tooltips, those are all the "span"-s under the imagecodes section
    var spans = img_codes.getElementsByTagName("span");
    while (spans.length)
    {
        spans[0].parentNode.removeChild(spans[0]);
        spans = img_codes.getElementsByTagName("span");
    }
}