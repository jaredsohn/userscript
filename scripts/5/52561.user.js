// ==UserScript==
// @name           Meebo 140 Counter
// @namespace      meebo140counter
// @description    Creates 140 character  input counter display
// @include        http://*.meebo.com/*
// @version 0.1.4
// @contributor Godie - http://corruptedpartition.blogspot.com
// ==/UserScript==

var SCRIPT = {
  trimlimit: 140,
  warnrellimit:50,
  normcolor: '#0000ff',
  warncolor: '#ffcc00',
  trimcolor: '#ff0000',
  dispstyle: 'text-align: right; float:right; font-size: 15px;',
  isdebug: false
};

GM_registerMenuCommand( 'Meebo 140 Counter - Turn Firebug Log '+(GM_getValue('enableDebug')  == 'checked' ? 'off' : 'on'), debugOnOff);
SCRIPT.isdebug = (GM_getValue('enableDebug', '') == 'checked');

function debugOnOff() {
  if (GM_getValue('enableDebug') == 'checked') {
    GM_setValue('enableDebug', 0);
    SCRIPT.isdebug =  false
  } else {
    GM_setValue('enableDebug', 'checked');
    SCRIPT.isdebug =  true;
  }
  location.reload();
}

//This function to add an event to an object
function addEvent( obj, type, fn )
{
    if (obj.addEventListener)
        obj.addEventListener( type, fn, false );
    else if (obj.attachEvent)
    {
        obj["e"+type+fn] = fn;
        obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
        obj.attachEvent( "on"+type, obj[type+fn] );
    }
} 

function xpath( query, element ) {
    var element = (element == null) ? document : element;
    return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function returnObjById( id ) {
    if (document.getElementById)
        var returnVar = document.getElementById(id);
    else if (document.all)
        var returnVar = document.all[id];
    else if (document.layers)
        var returnVar = document.layers[id];
    return returnVar;
}

addEvent(document,"keyup",function(event) 
{
    var msgdlgboxes = xpath('//div[@class=\'uiDlg resizable\']');
    var msgdlgboxeslen = msgdlgboxes.snapshotLength;
    
    if (SCRIPT.isdebug) console.log("Dialog(s) found: %d", msgdlgboxeslen); //debug
    
    
    for (var i = 0; i < msgdlgboxeslen; i++) 
    {
        msgdlgbox = msgdlgboxes.snapshotItem(i);
        var msgtoolbar = xpath('.//div[@id=\'content\']/div[@class=\'uiToolbar uiImFontbar FontBar\']',msgdlgbox).snapshotItem(0);
        
        if (SCRIPT.isdebug) console.log("Processing Dlg#: %d",i); //debug
        
        if(msgtoolbar)
        {
            var dispid = +msgtoolbar.id;
            
            if (SCRIPT.isdebug) console.log("[%d] Checking Dlg id: %d",i, dispid); //debug
            
            var dispdiv = returnObjById('dispid' + dispid);
            //var dispdiv = xpath('.//div[@id=\'dispid'+ dispid +'\']',msgtoolbar).snapshotItem(0);
            if(!dispdiv)
            {
                if (SCRIPT.isdebug) console.log("Adding DIV to Dlg id: %d", dispid); //debug

                var dispdiv = document.createElement("div");
                dispdiv.id =  'dispid' + dispid;
                msgtoolbar.appendChild(dispdiv);
            }
            else
            {
                if (SCRIPT.isdebug) console.log("DIV found Dlg id: %d", dispid); //debug
            }
            var msginputbox = xpath('.//div[@id=\'content\']/div[3]/form/textarea',msgdlgbox).snapshotItem(0);
            var currentcount = SCRIPT.trimlimit - msginputbox.value.length;
                
            if (SCRIPT.isdebug) console.log("Char count on Dlg id %d: %d", dispid, currentcount); //debug
                
            dispdiv.innerHTML = currentcount.toString() + '/' + SCRIPT.trimlimit.toString();
            
            
            if (currentcount < 0) 
            {
                dispdiv.setAttribute('style',SCRIPT.dispstyle + 'color:' + SCRIPT.trimcolor);
            } 
            else if (currentcount < SCRIPT.warnrellimit) 
            {
                dispdiv.setAttribute('style',SCRIPT.dispstyle + 'color:' + SCRIPT.warncolor);
            } 
            else
            {
                dispdiv.setAttribute('style',SCRIPT.dispstyle + 'color:' + SCRIPT.normcolor);
            }
        }
        else
        {
            if (SCRIPT.isdebug) console.log("Skipping Dlg#: %d",i); //debug
        }
    }
});