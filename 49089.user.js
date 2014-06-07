 This is a Greasemonkey user script.
                    //
                    // To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
                    // Then restart Firefox and revisit this script.
                    // Under Tools, there will be a new menu item to "Install User Script".
                    // Accept the default configuration and install.
                    //
                    // To uninstall, go to Tools/Manage User Scripts,
                    // select "Hello World", and click Uninstall.
                    //
                    // --------------------------------------------------------------------
                    //
                    // ==UserScript==
                    // @name           ikariam
                    // @namespace      www.tribalwars.net
                    // @description    Premium bar for Tribalwars (Village Headquarters, Barracks , Stable , Workshop , Academy , Smithy , Rally Point , Market)  
                    // @include        http://*.ikariam.com.br/*  
                    // @version        1.0
                    // ==/UserScript==

<script type="text/javascript">

// Adds a "down" css-class to a supplied element.
function makeButton(ele) {
    var Event = YAHOO.util.Event;
    var Dom = YAHOO.util.Dom;
    Event.addListener(ele, "mousedown", function() {
        YAHOO.util.Dom.addClass(ele, "down");
    });
    Event.addListener(ele, "mouseup", function() {
        YAHOO.util.Dom.removeClass(ele, "down");
    });
    Event.addListener(ele, "mouseout", function() {
        YAHOO.util.Dom.removeClass(ele, "down");
    });
}

//removed "childTooltip"-code. Don't duplicate code, just nest normal tooltips!
function ToolTips() {
    var tooltips = Dom.getElementsByClassName ( "tooltip" , "div" , document , function() {
        Dom.setStyle(this, "display", "none");
    })
    for(i=0;i<tooltips.length;i++) {
        Event.addListener ( tooltips[i].parentNode , "mouseover" , function() {
            Dom.getElementsByClassName ( "tooltip" , "div" , this , function() {
                Dom.setStyle(this, "display", "block");
            });
        });
        Event.addListener ( tooltips[i].parentNode , "mouseout" , function() {
            Dom.getElementsByClassName ( "tooltip" , "div" , this , function() {
                Dom.setStyle(this, "display", "none");
            });
        });
    }
}

Event.onDOMReady( function() {
    var links = document.getElementsByTagName("a");
    for(i=0; i<links.length; i++) {
        makeButton(links[i]);
    }
    ToolTips();
    replaceSelect(Dom.get("citySelect"));
});

/* One for the wood... */
var woodCounter = getResourceCounter({
	startdate: 1271561320,
	interval: 2000,
	available: 1500,
	limit: [0, 3000],
	production: 0.9111111111111,
	valueElem: "value_wood"
	});
if(woodCounter) {
	woodCounter.subscribe("update", function() {
		IKARIAM.currentCity.resources.wood = woodCounter.currentRes;
		});
	}

/* ...one for the tradegood... */
var tradegoodCounter = getResourceCounter({
	startdate: 1271561320,
	interval: 2000,
	available: 0,
	limit: [0, 1500],
	production: 0,
	spendings: [{amount: 0, tickInterval: 1200}],	valueElem: "value_wine"
	});
if(tradegoodCounter) {
	tradegoodCounter.subscribe("update", function() {
		IKARIAM.currentCity.resources.wine = tradegoodCounter.currentRes;
		});
	}


var localTime = new Date();
var startServerTime = localTime.getTime() - (7200000) - localTime.getTimezoneOffset()*60*1000; // GMT+1+Sommerzeit - offset

var obj_ServerTime = 0;
Event.onDOMReady(function() {
    var ev_updateServerTime = setInterval("updateServerTime()", 500);
    obj_ServerTime = document.getElementById('servertime');
});
function updateServerTime() {
    var currTime = new Date();
    currTime.setTime((1271561320000-startServerTime)+ currTime.getTime()) ;
    str = getFormattedDate(currTime.getTime(), 'd.m.Y G:i:s');
    obj_ServerTime.innerHTML = str;
}

function jsTitleTag(nextETA) {
    this.nextETA = nextETA;
    var thisObj = this;
    
    var cnt = new Timer(nextETA, 1271561320, 1);
    //cnt.currentdate *= 1000; <- obsolete?
    
    //top.document.title = "Ikariam - Mundo Rho";
    
    cnt.subscribe("update", function() {
        var timeargs = this.enddate - Math.floor(this.currenttime/1000) *1000;
        var title = "Ikariam - ";
        
        if (timeargs != "")
            title += getTimestring(timeargs, 3, undefined, undefined, undefined, true) + " - ";

        title += "Mundo Rho";

        top.document.title = title;
    })
    
    cnt.subscribe("finished", function() {
        top.document.title = "Ikariam" + " - Mundo Rho";
    });
    
    cnt.startTimer();
    return cnt;
}


/*
    Notizzettel
*/

var avatarNotes = null;

function switchNoteDisplay() {
    document.cookie = 'notes=0; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    var noteLayer = Dom.get("avatarNotes");
    if (noteLayer.style.display == "block") {
        avatarNotes.save();
        noteLayer.style.display = "none";
    } else {
        if (noteLayer.innerHTML == "") { // nur AjaxRequest starten, wenn Notizen noch nicht geladen sind
            ajaxRequest('?view=avatarNotes', updateNoteLayer);
            document.cookie = 'notes=1;';
        }
        noteLayer.style.display = "block";
   }   
}

// Notizzettel automatisch einblenden bei reload...
if (getCookie('notes') == 1) {
    switchNoteDisplay(); 
}

function updateNoteLayer(responseText) {
    var noteLayer = Dom.get("avatarNotes");
    noteLayer.innerHTML = responseText;
  
    // Create a panel Instance, from the 'resizablepanel' DIV standard module markup
            var panel = new YAHOO.widget.Panel("resizablepanel", {
                draggable: true,
                width: getCookie("ikariam_notes_width", "470px"), 
                height: getCookie("ikariam_notes_height", "320px"), 
                autofillheight: "body", // default value, specified here to highlight its use in the example
                constraintoviewport:true,
                context: ["tl", "bl"]
            });
            panel.render();

            // Create Resize instance, binding it to the 'resizablepanel' DIV 
            var resize = new YAHOO.util.Resize("resizablepanel", {
                handles: ["br"],
                autoRatio: false,
                minWidth: 220,
                minHeight: 110,
                status: false 
            });

            // Setup startResize handler, to constrain the resize width/height
            // if the constraintoviewport configuration property is enabled.
            resize.on("startResize", function(args) {

                if (this.cfg.getProperty("constraintoviewport")) {
                    var D = YAHOO.util.Dom;

                    var clientRegion = D.getClientRegion();
                    var elRegion = D.getRegion(this.element);

                    resize.set("maxWidth", clientRegion.right - elRegion.left - YAHOO.widget.Overlay.VIEWPORT_OFFSET);
                    resize.set("maxHeight", clientRegion.bottom - elRegion.top - YAHOO.widget.Overlay.VIEWPORT_OFFSET);
                } else {
                    resize.set("maxWidth", null);
                    resize.set("maxHeight", null);
                }

            }, panel, true);

            // Setup resize handler to update the Panel's 'height' configuration property 
            // whenever the size of the 'resizablepanel' DIV changes.

            // Setting the height configuration property will result in the 
            // body of the Panel being resized to fill the new height (based on the
            // autofillheight property introduced in 2.6.0) and the iframe shim and 
            // shadow being resized also if required (for IE6 and IE7 quirks mode).
            resize.on("resize", function(args) {
                
                var panelHeight = args.height;
                this.cfg.setProperty("height", panelHeight + "px");
                Dom.get("message").style.height = (panelHeight-75) + "px";
            }, panel, true);
            
        
            avatarNotes = new Notes();
            avatarNotes.setMaxChars(200);
            avatarNotes.init(Dom.get("message"), Dom.get("chars"));
            
            Dom.get("resizablepanel_c").style.top = getCookie("ikariam_notes_y", "80px");
            Dom.get("resizablepanel_c").style.left = getCookie("ikariam_notes_x", "375px");
            Dom.get("message").style.height = (parseInt(getCookie("ikariam_notes_height", "320px")) - 75 ) + "px";            
}

window.onunload = function() { 
    if (avatarNotes instanceof Notes) {
        setCookie( 'ikariam_notes_x', Dom.get("resizablepanel_c").style.left, '9999', '', '', '' );
        setCookie( 'ikariam_notes_y', Dom.get("resizablepanel_c").style.top, '9999', '', '', '' );
        setCookie( 'ikariam_notes_width', Dom.get("resizablepanel").style.width, '9999', '', '', '' );
        setCookie( 'ikariam_notes_height', Dom.get("resizablepanel").style.height, '9999', '', '', '' );
        avatarNotes.save();
    }
}

function setCookie(name, value, expires, path, domain, secure)
{
	var today = new Date();
	today.setTime( today.getTime() );

    if ( expires ) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name + "=" +escape( value ) + ((expires) ? ";expires=" + expires_date.toGMTString() : "" ) + ((path) ? ";path=" + path : "" ) + ((domain) ? ";domain=" + domain : "" ) + ((secure) ? ";secure" : "" );
}

function getCookie ( check_name, def_val ) {
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;

    for (i=0; i<a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split( '=' );
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
        if ( cookie_name == check_name ) {
            b_cookie_found = true;
            if ( a_temp_cookie.length > 1 ) {
                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
            }
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found ) {
        return def_val;
    }
}
</script>