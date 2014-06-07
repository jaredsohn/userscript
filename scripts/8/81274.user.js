// ==UserScript==
// @name          Visa Cal Extra - Show all items
// @namespace     http://mtk.co.il/moppy
// @description	  Show all items - expand all pages for easy print Motty Katan(c) 10-07-2010 last updated 
// @include       http://www.calextra.co.il/BuildaGate5/general2/company_search_tree.php?gP=
// @include       http://www.calextra.co.il/BuildaGate5/general2/company_search_tree.php?gP=0
// ==/UserScript==
//Change Log:

var debug = 0;
function Log(s){GM_log("CalExtra:"+s);}
logger = (debug) ? Log:function empty(){};
logger("start");

var nPageResultsDisplayed = 1;

oIframe = document.createElement("iframe");
oIframe.id = "idLoadPagesAuto";
oIframe.name = "idLoadPagesAuto";
oIframe.src="about:blank";
oIframe.style.display = "none";
document.body.appendChild(oIframe);
nFrames = window.frames.length-1;

//where to insert new pages?
var oTableTag = document.evaluate("//table//a[contains(@href,'javascript:datacard') and contains(@href,'_self')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
var oTable = oTableTag.snapshotItem(1).parentNode.parentNode.parentNode;

//insert new pages
window.frames[nFrames].frameElement.addEventListener('load',function        handleStateChange(){
    logger("page no."+nPageResultsDisplayed+"loading");    
    var linkTags = window.frames[nFrames].window.document.evaluate("//table//a[contains(@href,'javascript:datacard') and contains(@href,'_self')]", window.frames[nFrames].window.document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if (linkTags.snapshotLength>1){
        //get the links (Starting from 2 because it will make the evaluate too complicated)
        for (i=2;i<linkTags.snapshotLength;i+=2)
        {
            var oLink = linkTags.snapshotItem(i);
            oTr = oLink.parentNode.parentNode;
            oTable.appendChild(oTr);       	
        }
        nPageResultsDisplayed++;
        //load next page relative        
        unsafeWindow.frames[nFrames].nextPage();
    }
}, false);
//rewrite the form's target to the new iframe
document.forms[0].target = "idLoadPagesAuto";
//load next page
unsafeWindow.nextPage();
