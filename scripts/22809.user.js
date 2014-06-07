// ==UserScript==
// @name          Gmail - Insert HTML Signature - 2.0
// @namespace     http://bestorkuteditor.blogspot.com/
// @description   Inserts your HTML signature into a GMail message
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==

//Add variables here that contain your HTML signatures.  You can name them anything except 's_html'
//You can add as many as you want.
s_html1 = "<html><body>Hello 1!</body></html>";
s_html2 = "<html><body>Hello 2!</body></html>";

//Add the variables you have above to this array, separated by commas 
//e.g., var sigs = new Array(s_html1, s_html2, ...);.
var sigs = new Array(s_html1, s_html2);

//Add the display names for the signatures you have above to this area.  
//MAKE SURE THE NAMES ARE IN THE SAME ORDER AS THE VARIABLES YOU LIST ABOVE!!
//e.g., var sigNames = new Array("Main", "Business", "Personal", ...);
var sigNames = new Array("Main", "Second");

window.insSig = function(cnt) {
    clean_var = cnt.innerHTML;
    for (var cnt = 0; cnt < sigs.length; cnt++) {
        if ("<a href=\"#\">" + sigNames[cnt] + "</a><br>" == clean_var) {
            s_html = sigs[cnt];
            unsafeWindow.gmonkey.load('1.0', function(gmail) {
                right_side = gmail.getActiveViewElement();
            });
            txtBox = right_side.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild;
            //var txtBox = gmail.getActiveViewElement();//unsafeWindow.document.getElementById('1f7u');
             if (txtBox) { // no reply/forward text, insert at end
                txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML + '<br />' + s_html;
             }/* else { // reply/forward
                txtNum = getCount();
                 for (var nodeId = 0; nodeId <= txtNum && !txtBox; nodeId++) {
                     txtBox = getNode('hc_' + String(nodeId)); }
                     if (txtBox) { // reply/forward, insert at the beginning
                        txtBox.contentDocument.body.innerHTML = '<br />' + s_html + '<br />' + txtBox.contentDocument.body.innerHTML;
                     }
                 }
            }*/
        }
    }
}    

//Initialize gmail and gmonkey objects
//Create new module
window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
        function create_list() {
            //Create HTML for module
            if (sigs.length >0 && sigNames.length > 0 && sigs.length == sigNames.length) {
                sig = unsafeWindow.document.createElement('div');
                for (var cnt = 0; cnt < sigs.length; cnt++) {
                    uSig = unsafeWindow.document.createElement('span');
                    uSig.innerHTML = "<a href='#'>" + sigNames[cnt] + "</a><br />";
                    uSig.addEventListener('click', function () {insSig(this)}, false);
                    sig.appendChild(uSig);
                }
            }
        }
        create_list();
        module = gmail.addNavModule('HTML Signatures');
        module.appendChild(sig);
        txtBox = gmail.getActiveViewElement();
    });
  }
}, true);    

--------------------------------------------------------------------------------
