// ==UserScript==
// @name          Better Google by X-Force
// @version       0.1
// @namespace     http://www.iplaysoft.com/
// @description   Keep Google Search Box on Top
// @include       *://*.google.*/search*
// @include       *://*.google.*/webhp*
// @exclude       *://mail.google.com/*
// @require       http://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.3.min.js
// @grant         none
// ==/UserScript==


//==========================
//   Remove Google redirect
//==========================
//source: http://userscripts.org/scripts/source/183690.user.js
//name: Fuck Google

function RemoveRedirect() {
    var results;

    //for google web results
    results = document.getElementsByClassName("r");
    for (var i = 0; i < results.length; ++i) {
        var link = results[i].getElementsByTagName("a")[0];
        if (link == undefined) {
            continue;
        }
        link.removeAttribute("onmousedown");
        link.target = "_blank";
        link.rel = "external";
        console.log("remove One!");
        var reg = new RegExp('/url\\?q=(.*)&sa=U');
        var real = reg.exec(link.href);
        if (real != null) {
            link.href = real[1];
            link.target = "_blank";
            link.rel = "external";
            console.log("find:", link.href);
        }
    }
    //for google image
    results = document.getElementsByClassName("rg_l");
    for (var i = 0; i < results.length; ++i) {
        var link = results[i];
        var reg = new RegExp("imgrefurl=(.*)&docid");
        var real = reg.exec(link.href);
        if (real != null) {
            link.href = real[1];
            console.log("img:", link.href);
        }
    }
    results = document.getElementsByClassName("irc_ifr");
    for (var i = 0; i < results.length; ++i) {
        results[i].addEventListener('DOMAttrModified', setreallink, false);
    }
}

function setreallink() {
    var ifms = document.getElementsByClassName("irc_ifr");
    for (var i = 0; i < ifms.length; ++i) {
        var ifm = ifms[i].contentWindow;
        var a = ifm.document.getElementById("irc_mil");
        if (a) {
            a.setAttribute("onmouseup",
                "(function(){\
                                var a=document.getElementById('irc_mil');\
                                var reg=new RegExp('&url=(.*)&ei=');\
                                var real=reg.exec(a.href)[1];\
                                if(real){\
                                    a.href=decodeURIComponent(real);\
                                }\
                            })();"
            );
        }
    }
}


waitForKeyElements("#ires", RemoveRedirect);


/*--- waitForKeyElements():  A handy, utility function that
 *    does what it says.
 */
function waitForKeyElements(
    selectorTxt,
    /* Required: The jQuery selector string that
    specifies the desired element(s).
*/
    actionFunction,
    /* Required: The code to run when elements are
found. It is passed a jNode to the matched
element.
*/
    bWaitOnce,
    /* Optional: If false, will continue to scan for
new elements even after the first match is
found.
*/
    iframeSelector
    /* Optional: If set, identifies the iframe to
search.
*/
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes = $(selectorTxt);
    else
        targetNodes = $(iframeSelector).contents()
            .find(selectorTxt);

    if (targetNodes && targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
         *            are new.
         */
        targetNodes.each(function() {
            var jThis = $(this);
            var alreadyFound = jThis.data('alreadyFound') || false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction(jThis);
                jThis.data('alreadyFound', true);
            }
        });
        btargetsFound = true;
    } else {
        btargetsFound = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj = waitForKeyElements.controlObj || {};
    var controlKey = selectorTxt.replace(/[^\w]/g, "_");
    var timeControl = controlObj[controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj[controlKey]
    } else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval(function() {
                    waitForKeyElements(selectorTxt,
                        actionFunction,
                        bWaitOnce,
                        iframeSelector
                    );
                },
                500
            );
            controlObj[controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}


//============================
// float Google Search box
//============================
var webSearchBoxId = "#tsf";
var imageSearchBoxId="#tphdr";
var myWindow = $(window);

$(document).keypress(function(e){
    if (e.shiftKey && e.which==63) { //Shift+?(问号)
        if(document.activeElement.id!="lst-ib" && document.activeElement.id!="gbqfq"){
            $("#lst-ib,#gbqfq").focus(function(){e.preventDefault();}).select();
        }
    }          
});
           
if($(webSearchBoxId).length>0){
    var webSearchBoxTop = $(webSearchBoxId).position().top;
    myWindow.scroll(function(event) {
            scrollTop = myWindow.scrollTop();
            if(scrollTop > webSearchBoxTop){
                if($(webSearchBoxId).css("position")!="fixed"){
                    $(webSearchBoxId).css({
                            "position": "fixed",
                            "top": "0",
                            "z-index":99999,
                            "height":"40px",
                            "width":"100%",
                            "padding-top":"10px",
                            "background-color": "#f5f5f5",
                            "border-bottom": "1px solid #ddd"
        			});
                }
            }else{
            	$(webSearchBoxId).removeAttr("style");
            }
            
    });
}


if($(imageSearchBoxId).length>0){
    var imageSearchBoxTop = $(imageSearchBoxId).position().top;
    myWindow.scroll(function(event) {
        scrollTop = myWindow.scrollTop();
        if(scrollTop > imageSearchBoxTop){
            if($(imageSearchBoxId).css("position")!="fixed"){
                $(imageSearchBoxId).css({
                        "position": "fixed",
                        "top": "0",
                        "z-index":99999,
                        "border-bottom": "1px solid #ddd"
                });
            }
        }else{
            $(imageSearchBoxId).removeAttr("style");
        }
    });
}
