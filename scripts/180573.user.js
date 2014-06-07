// ==UserScript==
// @name           Chase Running Total
// @namespace      http://userscripts.org/scripts/review/180573
// @description    Adds a running total/balance column to the Chase Account Activity page.  Inspired by http://userscripts.org/scripts/review/65754
// @include        https://cards.chase.com/cc/Account/Activity/*
// @require        http://jqueryjs.googlecode.com/files/jquery-2.0.3.pack.js
// ==/UserScript==

//Since javascript loads most of the page data, wait for the data to load before executing addRunningBalance
waitForKeyElements('.card-activity.expandable',addRunningBalance);

function addRunningBalance(jNode) {
    $(function() {  
        var grid   = $('div#Posted');
        var rows   = grid.find('tbody > tr');
        var rowDividers = $('.detail.divider');
        
        var total  = parseCurrency(
            $(".first:contains('Balance last statement') > td:last").html()
        );
        
        //Add the "Balance" column header
        grid.find("colgroup > col[width='33%']").attr('width','25%');
        grid.find('colgroup').append('<col width="8%">');
        grid.find('thead > tr').append('<th name="RunningTotal" class="runningTotalHeader"><span class="under"><a href="#" tabindex="90">Balance</a></span><span class="sorter card-noprint">&nbsp;&nbsp;&nbsp;</span></th>');
        
        //Extend the dashed row dividers
        $.each(rowDividers.get(), function() {
            $(this).find('td').attr('colspan','8'); 
        });
        
        //Add the balance to each row
        $.each(rows.get().reverse(), function() {
            var tr = $(this);
            var td = tr.find('td:last');
            var value = parseCurrency(td.html());
            
            if(!isNaN(value)) {
                total += value;  
                tr.append('<td style="text-align:right;padding-right:30px;">$' + (total/100).formatMoney(2,'.',',') + '</td>');
            }
        });
    });
};


function parseCurrency(string) {
    return parseInt(
        string.replace(/\.|\$|\,/g,'')
    )
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/number/fmt-money [v1.1]

Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.
 
    Usage example:
 
        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );
 
        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }
 
    IMPORTANT: This function requires your script to have loaded jQuery.
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