// ==UserScript==
// @name           BizStream's Gmail, Smart Titler (for Timesheet Helper)
// @namespace      BizStreamGSmartTitler
// @description    Uses the To and Subject info to create a better title for auto-categorizing in TimeSheet Helper.
// @include        https://mail.google.com/*
// @version        0.13
// ==/UserScript==




var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
script.addEventListener('load', function(){ 
    $jq = unsafeWindow['jQuery'];
    $jq.noConflict();


    var getGMailDocument = function() {
        /*
        var iFrame =  document.getElementById('canvas_frame');
        if ( iFrame.contentDocument ) 
        { // FF
            return iFrame.contentDocument;
        }
        else if ( iFrame.contentWindow ) 
        { // IE
            return iFrame.contentWindow.document;
        }
        
        return null;
        */
        return document;
    }

    var getSubject = function() {
        return $jq("h1 span.hP").text();
    }
    
    
    var getTos = function() {
        var returnValue = "";
        //var divs = getGMailDocument().getElementsByTagName("div");
        
        var aList = new Array();
        $jq("div.iw span.gD,div.iw span.g2").each(function() {
            var e = $jq(this).attr("email");
            if (!e.match("bizstream")) {
            	aList.push(e);
            }
        });
        
        if (aList.length > 0) {
        	returnValue = aList.join(";")
        }
        
        return returnValue;
    }
    
    var retitle = function()
    {
        var ttext = document.title;
        //console.log("ttext = "+ ttext);

		var sTo;        
        if(ttext.match("BizStream") && ttext.match("Compose"))
        {
            sTo = getTos();
            var sSubject = getSubject();
            
            if (sSubject.length > 0 || sTo.length > 3) {
                
                document.title = "BizStream Mail - Compose: ";
                
                if (sTo.length > 3)
                         document.title += sTo;
    
                if (sSubject.length > 0)
                         document.title += " - "+ sSubject;
                
                return true;
            }
        } else if (ttext.match("BizStream")) {
            sSubject = getSubject();
            sTo = getTos();
            //console.log("sSubject = "+ sSubject );
            //console.log("sTo      = "+ sTo );
            var newTitle = "BizStream Mail";
            
            if (sSubject.length > 0)
                newTitle += " - "+ sSubject;

            if (sTo.length > 3)
                newTitle += " - "+ sTo;
            
            //console.log("newTitle = "+ newTitle );
            if (document.title != newTitle) {
                document.title = newTitle
            }
        }
        return false;
    }

    
    // INIT
    setInterval(retitle,5000);

    
}, false);





//GM_registerMenuCommand("Organize Title Now!(Temporarily until new mail arrives)",retitle)
