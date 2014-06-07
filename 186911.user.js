// ==UserScript==
// @name       auto 400gb
// @namespace  http://www.choury.com/
// @version    0.1
// @description  enter something useful
// @include      http://www.400gb.com/file/*
// @include      http://www.400gb.com/u/*
// @include      http://www.400gb.com/downhtml/*
// @grant         none
// @copyright  choury
// ==/UserScript==

console.log("auto 400gb start");
window.start=0;

obj=document.getElementsByClassName("viplist")[0];
if(obj){
	obj=obj.getElementsByTagName("a")[0];
	if(obj){
    	window.location.href=obj.href;
	}
	return false;
}

obj=document.getElementById("table_files");
if(obj){
    var get = document.createElement("a");
    get.id = "download";
    get.textContent="下载"
    get.title = "下载";
    get.href="#";
    get.onmouseup=getnext;
    obj.appendChild(get);
    waitForKeyElements(".odd:first-child",getlength);
    return false;
}


var obj=document.getElementsByTagName("button")[0];
if(obj){
    obj.onclick();
    return false;
}


function test(){
    var get=document.getElementById("download");
    get.href="aaa";
}

function getnext(){
    obj=document.getElementById("table_files");
	if(obj){
    	link=obj.getElementsByTagName("a");
        if(window.start>0){
            document.getElementById("download").href=link[window.start-1].href;
            window.start=window.start-1;
        }else{
            alert("全部下载完成!");
            document.getElementById("download").href="#";
        }
	}
}

function getlength(){
    var links=document.getElementById("table_files").getElementsByTagName("a");
    window.start=links.length;
    document.getElementById("download").href=links[links.length-1].href;
}


/*--- waitForKeyElements():  A handy, utility function that
 *    does what it says.
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
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
        .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
         *            are new.
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
