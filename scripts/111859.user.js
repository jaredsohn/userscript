// ==UserScript==
// @name Disable Footprints Popups
// @include https://mysupport.unl.edu/*
// ==/UserScript==


/*
This was an attempt to change the href of links.. it was a bit more hackish :(
// We need to delay while the page loads a bit.
setInterval(function() {

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (!link.hasAttribute('href') || link.getAttribute('href').substr(0, 11) != 'javascript:') {
            continue;
        }
        
        var script = link.getAttribute('href').substr(11).trim();
        if (script.substr(0, 8) == 'goToEdit') {
            var args = script.match(/([0-9]+), ([0-9]+)/);
            var mr = args[1];
            var project = args[2];
            //alert(script);
            
           
            var thisUrl = unsafeWindow.editBaseUrl;
            thisUrl += "&MR=" + mr;
            if (project == null)
                project = 14;
            thisUrl += "&PROJECTID=" + project;
           
            link.href = thisUrl;    
        }
    }
    
}, 500);
*/

unsafeWindow._goPage = function(type, mr, project, extraCGI) {
    // call edit page instead?
    if (false)
        type = 'edit';
    
    var thisUrl = (type == 'details') ? unsafeWindow.detailsBaseURL : unsafeWindow.editBaseUrl;
    thisUrl += "&MR=" + mr;
    if (project == null)
        project = 14;
    thisUrl += "&PROJECTID=" + project;
    if (extraCGI)
        thisUrl += "&" + extraCGI;
    
    unsafeWindow.location = thisUrl;
};
