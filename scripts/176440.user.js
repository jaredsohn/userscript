// ==UserScript==
// @name       My First Userscript
// @version    0.1.0.0
// @description  Just Wonna test something(AlertBox)
// @author     tamtam8420
// @copyright  24/08/2013
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @grant       MetaData
// ==/UserScript==



    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
    
        if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
        {
            setTimeout(waitForClientLib, 1000);
            return;
        }
	alert("Wellcome Back Commander !!!");	
}

function startup(){
    
    setTimeout(waitForClientLib, 1000);
};

startup();