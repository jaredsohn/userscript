// ==UserScript==
// @name        Google Play Store Library View Fix
// @namespace   Google Play Store Library View Fix
// @author      Skarz
// @description Allows you to see all your apps in the Google Play Android Store apps page, adds filtered views for the apps library, and displays a total of all purchased apps for your entire account.
// @include     http*://play.google.com/apps*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.13
// @updateURL   https://userscripts.org/scripts/source/149323.meta.js
// @downloadURL https://userscripts.org/scripts/source/149323.user.js
// @grant       GM_addStyle
// @grant    	GM_setValue   
// @grant    	GM_getValue  
// @grant       GM_xmlhttpRequest
// ==/UserScript==


		/* Page function tweak. */
GM_addStyle(".carousel-page {visibility:visible !important; border:none !important;}\
	.carousel-pages {overflow:scroll !important; overflow-x:hidden !important;}\
	.carousel-pages-wrapper {width:auto !important;}\
	 #lib-app-installed > DIV > DIV > DIV:first-child {resize:vertical !important; min-height:450px !important;}\
	 #lib-app-owned > DIV > DIV > DIV:first-child {resize:vertical !important; min-height:450px !important;}\
	.goog-inline-block {resize:none !important;}\
	 #lib-app-installed .carousel-mini {border-bottom: 2px solid #D7D7D7 !important;}\
	 #lib-app-installed > DIV > DIV > .carousel-pagination {visibility:hidden !important;}\
	 #lib-app-owned > DIV > DIV > .carousel-pagination {display:none !important;}\
	.padded-browse-carousel.library-carousel div.carousel-pages {overflow:hidden !important;}\
	.lib-app-fragment-header.goog-inline-block {float: left !important; clear: right !important;}\
	#AppCountInstalled {float: right !important; clear: left !important;}\
		/* Filter buttons. */ \
	 #Free {margin-left:28px !important; margin-right:8px !important;}\
	 #Paid, #Paid:active, #Free, #Free:active {cursor:pointer !important; padding-bottom:2px !important; color:#FFFFFF !important; height:28px !important; width:122px !important; font-size:14px !important; text-align:center !important; background:#A5A5A5 !important; border:double !important;}\
	 #Paid:hover, #Free:hover {background:#2ac7e1 !important;}\
	 #AppCountOwned {float: right !important;}\
		 /* CSS for customisable Tipsy Tooltip */ \
	.tipsy {font-size: 14px; position: absolute; padding: 5px; z-index: 100000;}\
	.tipsy-inner {background-color: #CAD5A8; color: #000000; max-width: 200px; padding: 5px 8px 4px 8px; text-align: center;}\
		/* Rounded corners */ \
	.tipsy-inner {border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px;}\
		/* Shadow */ \
	.tipsy-inner {box-shadow: 0 0 5px #000000; -webkit-box-shadow: 0 0 5px #000000; -moz-box-shadow: 0 0 5px #000000;}\
	.tipsy-arrow {position: absolute; width: 0; height: 0; line-height: 0; border: 5px dashed #000;}\
		/* Rules to colour arrows */ \
	.tipsy-arrow-n {border-bottom-color: #000;}\
	.tipsy-arrow-s {border-top-color: #000;}\
	.tipsy-arrow-e {border-left-color: #000;}\
	.tipsy-arrow-w {border-right-color: #000;}\
	.tipsy-n .tipsy-arrow {top: 0px; left: 50%; margin-left: -5px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent;}\
    .tipsy-nw .tipsy-arrow {top: 0; left: 10px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent;}\
    .tipsy-ne .tipsy-arrow {top: 0; right: 10px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent;}\
	.tipsy-s .tipsy-arrow {bottom: 0; left: 50%; margin-left: -5px; border-top-style: solid; border-bottom: none; border-left-color: transparent; border-right-color: transparent;}\
    .tipsy-sw .tipsy-arrow {bottom: 0; left: 10px; border-top-style: solid; border-bottom: none; border-left-color: transparent; border-right-color: transparent;}\
    .tipsy-se .tipsy-arrow {bottom: 0; right: 10px; border-top-style: solid; border-bottom: none; border-left-color: transparent; border-right-color: transparent;}\
	.tipsy-e .tipsy-arrow {right: 0; top: 50%; margin-top: -5px; border-left-style: solid; border-right: none; border-top-color: transparent; border-bottom-color: transparent;}\
	.tipsy-w .tipsy-arrow {left: 0; top: 50%; margin-top: -5px; border-right-style: solid; border-left: none; border-top-color: transparent; border-bottom-color: transparent;}");



// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// released under the MIT license

(function($) {
    
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };
    
    function isElementInDOM(ele) {
      while (ele = ele.parentNode) {
        if (ele == document) return true;
      }
      return false;
    };
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
                this.$tip.data('tipsy-pointee', this.$element[0]);
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover'
    };
    
    $.fn.tipsy.revalidate = function() {
      $('.tipsy').each(function() {
        var pointee = $.data(this, 'tipsy-pointee');
        if (!pointee || !isElementInDOM(pointee)) {
          $(this).remove();
        }
      });
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable 
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
			    boundTop = $(document).scrollTop() + margin,
			    boundLeft = $(document).scrollLeft() + margin,
			    $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		}
	};
    
})(jQuery);


/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;
 
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);
 
    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
 
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }
 
    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
 
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}


function wfke001 (jNode){  

$('#Paid').tipsy({gravity: 's'});
$('#Free').tipsy({gravity: 's'});

//App Paid/Free Total Count - App Library
var count = $('#lib-app-owned .thumbnail-wrapper.goog-inline-block:visible').length;
//Add element to display count to user
$('#newpanel-container').before('<div id="AppCountOwned" class="appowned"> Total Library Apps ' + count + '</div>');
GM_addStyle(".lib-app-owned-panel #AppCountOwned{color:#7B9726 !important; font-size:26px !important; opacity:0.4 !important; font-weight:bold !important; text-align:right !important;}");

//App Count - Installed Apps
var count = $('.lib-app-installed-panel .thumbnail-wrapper.goog-inline-block:visible').length;

//Add element to display count to user
$('.lib-app-installed-panel  .lib-app-fragment-header.goog-inline-block').before('<div id="AppCountInstalled" title="TEST"> Total Installed Apps ' + count + '</div>');
GM_addStyle(".lib-app-installed-panel #AppCountInstalled{color:#7B9726 !important; font-size:26px !important; opacity:0.4 !important; font-weight:bold !important; text-align:right !important;}}");


//App Monetary Tooltip

$("#gm_statusBar").attr('title', 'This sum totals all apps purchased for this entire account. The total reflects your purcahse price for each app. Cancelled apps are not included in total. *See script homepage for more details.');
$("#AppCountOwned").attr('title', 'This app count totals library apps ONLY. Installed apps for your currently selected device are totaled separately in the above pane.');
$("#AppCountInstalled").attr('title', 'This app count totals all the apps installed for your currently selected device on this account.');
$("#Free, #Paid").attr('title', 'Filtered views show library apps ONLY.');

$('#AppCountOwned').tipsy({gravity: 'e'});
$('#AppCountInstalled').tipsy({gravity: 'e'});
$('#gm_statusBar').tipsy({gravity: 'e'});

	jNode.prepend ('<div id="wait001" class="active"></div>');
}

waitForKeyElements ("#lib-app-owned .carousel-pages-wrapper", wfke001);

GM_addStyle(".bottom-header .padded-browse-carousel.library-carousel {overflow:hidden !important; overflow-x:hidden !important;}");

//Added Container
$('.lib-app-owned-panel').prepend('<div id="newpanel-container" class="newct"></div>');


//App Count - Installed Apps for device change
$(".device-box").click(function() {

$('#AppCountInstalled').remove(); //App Count Installed
$('#AppCountOwned').remove(); //App Count Owned Installed

$('#Free, #Paid').removeClass("active"); 

$('#Free').text("Free Apps");  
$('#Paid').text("Paid Apps");  
$('button.active').click(); 
});

//--- Create a button in a container div.  It will be styled and positioned with CSS.
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="Free" type="button">Free Apps</button><button id="Paid" type="button">Paid Apps</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("Free").addEventListener ("click", FreeClickAction, false);
document.getElementById ("Paid").addEventListener ("click", PaidClickAction, false);

$('#Free').appendTo('.lib-app-owned-panel .lib-app-fragment-header.goog-inline-block');
$('#Paid').appendTo('.lib-app-owned-panel .lib-app-fragment-header.goog-inline-block');

function FreeClickAction (zEvent)
{
$('#Paid.active').click(); 
$('#Free').toggleClass("active");

if($("#Free").hasClass('active'))
    {
        $('#lib-app-owned .carousel-page :has(span[data-isfree="false"])').hide();
		$(this).text(">>Free Apps<<");
	}else{
		$('#lib-app-owned .carousel-page :has(span[data-isfree="false"])').show();
		$(this).text("Free Apps");	
    }
$('.lib-app-owned-panel #AppCountOwned').remove();

//App count
var count = $('#lib-app-owned .thumbnail-wrapper.goog-inline-block:visible').length;
$('#newpanel-container').before('<div id="AppCountOwned" class="appowned"> Total Library Apps ' + count + '</div>');
$("#AppCountOwned").attr('title', 'This app count totals library apps ONLY. Installed apps for your currently selected device are totaled separately in the above pane.');
$('#AppCountOwned').tipsy({gravity: 'e'});
}

function PaidClickAction (zEvent)
{
$('#Free.active').click(); 
$('#Paid').toggleClass("active");

if($("#Paid").hasClass('active'))
    {
        $('#lib-app-owned .carousel-page :has(span[data-isfree="true"])').hide();
		$(this).text(">>Paid Apps<<");
	}else{
		$('#lib-app-owned .carousel-page :has(span[data-isfree="true"])').show();
		$(this).text("Paid Apps");	 
    }
$('.lib-app-owned-panel #AppCountOwned').remove();

GM_addStyle(".carousel-page {width:auto !important;}");
//App count
var count = $('#lib-app-owned .thumbnail-wrapper.goog-inline-block:visible').length;
$('#newpanel-container').before('<div id="AppCountOwned"> Total Library Apps ' + count + '</div>');
$("#AppCountOwned").attr('title', 'This app count totals library apps ONLY. Installed apps for your currently selected device are totaled separately in the above pane.');
$('#AppCountOwned').tipsy({gravity: 'e'});
}


/*--- The following script fetches values from a paginated sequence of URL's for Google Play's Orders page, in order to total purchased apps. 
The values are totaled then presented on the Google App Page.
Thanks to Brock Adams over at stackoverflow.com for the following script.
*/

var startNum        = 0;
var totalValue      = 0;

//--- Scrape the first account-page for item values:
$("#lib-app-owned").before (
    '<div id="gm_statusBar" class="active">Fetching total value, please wait...</div>'
);


scrapeAccountPage ();

function scrapeAccountPage () {
    var accntPage   = 'https://play.google.com/store/account?start=0&num=40';
    accntPage       = accntPage.replace (/start=\d+/i, "start=" + startNum);

	/*--- Uncomment for page status.
    $("#gm_statusBar").append (
        '<span class="gmStatStart">Fetching page ' + accntPage + '...</span>'
    );
	*/
	
    GM_xmlhttpRequest ( {
        method:     'GET',
        url:        accntPage,
        //--- getTotalValuesFromPage() also gets the next page, as appropriate.
        onload:     getTotalValuesFromPage,
        onabort:    reportAJAX_Error,
        onerror:    reportAJAX_Error,
        ontimeout:  reportAJAX_Error
    } );
}

function getTotalValuesFromPage (respObject) {
    if (respObject.status != 200  &&  respObject.status != 304) {
        reportAJAX_Error (respObject);
        return;
    }

    $("#gm_statusBar").append ('<span class="gmStatFinish">done.</span>');

    var respDoc     = $(respObject.responseText);
	var targetElems = respDoc.find ("#order-status-cancelled").parent().parent().parent().remove();
    var targetElems = respDoc.find ("#tab-body-account .rap-link");

    targetElems.each ( function () {
        var itmVal  = $(this).attr ("data-docprice").replace (/[^\d\.]/g, "");
        if (itmVal) {
            itmVal   = parseFloat (itmVal);
            if (typeof itmVal === "number") {
                totalValue += itmVal;
            }
        }
    } );
    console.log ("totalValue: ", totalValue.toFixed(2) );

    if ( respDoc.find (".snippet.snippet-tiny").length ) {
        startNum       += 40;
        //--- Scrape the next page.
        scrapeAccountPage ();
    }
    else {
        //--- All done!  report the total.
        $("#gm_statusBar").empty ().append (
            'Total Purchased $' + totalValue.toFixed(2)
        );
    }
}

function reportAJAX_Error (respObject) {
    $("#gm_statusBar").append (
        '<span class="gmStatError">Error ' + respObject.status + '! &nbsp; '
        + '"' + respObject.statusText + '" &nbsp; &nbsp;'
        + 'Total value, so far, was: ' + totalValue
        + '</span>'
    );
}
GM_addStyle("#gm_statusBar{ opacity:0.4 !important; float:right !important;  font-weight:bold !important; color:#7B9726 !important; font-size:22px !important;}");

