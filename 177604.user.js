// ==UserScript==
// @name        Legendas TV Direct Download
// @namespace   taksan
// @include     http://legendas.tv/*
// @version     1
// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100);
	}
    else {
      unsafeWindow.jQuery(function() { main(unsafeWindow.jQuery); });
	}
  }
  GM_wait();

})();

var j$;
function main($) {
	j$ = $;
	waitForKeyElements("#resultado_busca article", createDownloadLinks)
}

var done = false;
function createDownloadLinks() {
	if (done)
		return;
	$=j$	
	$(".f_left p a[href^='/download']").each(function(k,anchor) {
		var hash= anchor.href.replace(/.*?\/download\/([0-9a-z]*)\/.*/, "$1");
		var holder = $(anchor).closest("div:has(.number)")
		console.log(holder)
		var css="margin-top:5px;display:block;background:url('../img/sprite_1.png') repeat scroll -19px -32px transparent; height: 19px; width:19px";
		holder.find(".number").append("<a style=\""+css+"\" href='/pages/downloadarquivo/"+hash+"'></a>");
	})
	done = true;
}


/*--- waitForKeyElements():  A handy, utility function that
    does what it says.
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
)
{
	$ = j$;
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
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
                500
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
