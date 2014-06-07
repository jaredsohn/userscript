// ==UserScript==
// @name           GmPrintPreview (GPP)
// @namespace      http://code.google.com/p/gmprintpreview/
// @version        0.0.2
// @description	   GM Print Preview easily and quickly switches your web page into print preview
// @include     *
// ==/UserScript==

//
// GM Print Preview is a Greasemonkey (Firefox add-on) user script, which searches a page for print 
// stylesheets and if they are present the user can quickly and easily switch the page styles 
// into these designed for print. 
//
// $Id: gmprintpreview.user.js 5 2007-10-31 13:09:21Z gm.print.preview $

//
// Version history:
//  Version 0.0.3:
//     Issue #1 solved.
//  Version 0.0.2:
//     Many major changes: different work with stylesheets (they are not removed, only their medium is changed); 
//       new layer style (position, color), new keyboard shortcu ([ctrl]+[alt]+p).
//  Version 0.0.1:
//     Initial version.
//

var GPP = {
    // Change a stylesheet of the page to the stylesheet for print media
    usePrintStylesheet : function() {
        var type = "print";
        var styleSheetList = document.styleSheets;
        var styleSheetLength = styleSheetList.length;
        
        // Loop through the style sheets
        for(var j = 0; j < styleSheetLength; j++)
        {
            styleSheet = styleSheetList[j];

            media = styleSheet.media;

            // If the style sheet matches this media
            if(GPP.webdeveloper_isMediaStyleSheet(styleSheet, type))
            {
                // If the style sheet has the screen media
                if(!GPP.webdeveloper_isMediaStyleSheet(styleSheet, "screen"))
                {
                    media.appendMedium("screen");
                }
            }
            else if(GPP.webdeveloper_isMediaStyleSheet(styleSheet, "screen"))
            {
                // If the media length is not 0
                if(media.length != 0)
                {
                    media.deleteMedium("screen");
                }
            }

            // Force the styles to reapply by disabling and enabling the style sheet
            styleSheet.disabled = true;
            styleSheet.disabled = false;
        }
        GPP.closeDiv();
    },
    
    
    
    // Is this style sheet for this media type
    webdeveloper_isMediaStyleSheet : function (styleSheet, matchMediaType, considerAllMediaAsPrint)
    {
        // If the style sheet and match media type are set
        if(styleSheet && matchMediaType)
        {
            if (null == considerAllMediaAsPrint)
            {
                var considerAllMediaAsPrint = true;
            }
            var media       = styleSheet.media;
            var mediaLength = media.length;
            var mediaType   = null;
    
            // If there is no media and the match media type is screen
            if(mediaLength == 0 && matchMediaType == "screen")
            {
                return true;
            }
    
            // Loop through the media
            for(var i = 0; i < mediaLength; i++)
            {
                mediaType = media.item(i).toLowerCase();
    
                // If the media type is all or matches the match media type
                if((considerAllMediaAsPrint && mediaType == "all") || mediaType == matchMediaType)
                {
                    return true;
                }
            }
        }
    
        return false;
    },

    // Check if there is a stylesheet for the provided media (e.g. "print") in the page
    // Return false if stylesheet for the media is found, false otherwise
    hasStylesheetForMedia : function(type) {
        var styleSheetList = document.styleSheets;
        var styleSheetLength = styleSheetList.length;
        
        // Loop through the style sheets
        for(var j = 0; j < styleSheetLength; j++)
        {
            styleSheet = styleSheetList[j];

            media = styleSheet.media;

            // If the style sheet matches this media
            considerAllMediaAsPrint = false;
            if(GPP.webdeveloper_isMediaStyleSheet(styleSheet, type, considerAllMediaAsPrint))
            {
                return true; // skip all others - no need to test more
            }
        }
        return false;
    },

    // create and add the link for "Change to print media" to the page (including some css and JS) - only if stylesheet for print media is defined in the page
    addPrintToPage : function() {
        // check if there is a stylesheet for print media defined in the page
        if (!GPP.hasStylesheetForMedia("print")) { return; }
        
        // add the HTML (which is seen)
        var div = document.createElement('div');
        div.id='GPPBar';
        document.body.appendChild(div);

        var span = document.createElement('span');
        span.innerHTML = '<a class="GPPLink">Change to print media</a> ';
        span.addEventListener('click', GPP.usePrintStylesheet,true);
        div.appendChild(span);
        
        var span = document.createElement('span');
        span.innerHTML = '<a id="GPPClose">x</a>';
        span.addEventListener('click', GPP.closeDiv, true);
        div.appendChild(span);
               
        // add CSS
        var head = document.getElementsByTagName('head')[0];
        if (!head) { return; }   
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = 'body { padding-bottom:25px; }'+
            '#GPPBar { color:#000000 ! important; font:bold 12px arial ! important; padding:2px ! important; border-bottom:1px solid #24B300; border-left:1px solid #24B300; position:fixed ! important; top:0; bottom:auto ! important; right:0; background:#99FF80 ! important; z-index:99999 ! important; opacity:0.3; margin:0 ! important; vertical-align:bottom ! important; text-align:left ! important; } '+
            '#GPPBar a { overflow:hidden ! important; font:bold 12px arial ! important; text-decoration:none; color:#003366 ! important; }'+
            '#GPPBar a:hover { text-decoration:underline; color:#003399 ! important; }'+
            '#GPPBar .GPPLink { padding-right: 12px; }'+
            '#GPPBar #GPPClose { color:red ! important; background:#99FF80 ! important; position:absolute ! important; bottom:2px ! important; right:2px ! important; padding:1px; }';
        head.appendChild(style);
        
        // add JS
        var s = document.createElement('script');
        s.language='javascript';
        s.type = 'text/javascript';
        s.text = 'function GPPclose(){try{document.getElementById("GPPBar").style.display="none";}catch(e){}}';
        head.appendChild(s);

		document.addEventListener('keypress', GPP.handleKey, true);
    },

    closeDiv : function() {
        try {
            document.getElementById("GPPBar").style.display="none";
        } catch(e) {}
    },
    
	// check if 'p' (or 'P') has been clicked and if so change the stylesheet
	handleKey : function getKey(event) {
	    var keyCode = event.which;
	    var key = String.fromCharCode(keyCode).toLowerCase();
        if (key == 'p' && event.altKey && event.ctrlKey) {
		    GPP.usePrintStylesheet();
		}
	}, // end getKey()

	init : function() {
        GPP.addPrintToPage();
	} // end init()

} // end of GPP

if (document.body) {
	GPP.init();
}
