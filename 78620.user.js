// <![CDATA[
// ==UserScript==
// @name           OVS-Hide Full Events
// @namespace      http://paris.onvasortir.com
// @include        http://*.onvasortir.com/*
// ==/UserScript==

var ovs_load = 0;
var ovs_fullevents = 0;

function ovs_filterevents(){
  var snap = document.evaluate("//div[@class='Pad1Color2']/table/tbody/tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = snap.snapshotLength - 1; i >= 0; i--) {
     var tr = snap.snapshotItem(i);

     var subsnap = document.evaluate("td/span",
		tr, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     var span = subsnap.snapshotItem(1);
     //alert(span.innerHTML);

     if (span) {
       var match_res = span.innerHTML.match(/\s*(\d+)\s*\/\s*(\d+)\s*/);
       if ( match_res && ( match_res[1] == match_res[2] ) ) {
          if (ovs_fullevents == 0){
            tr.style.display='none';
            tr.style.visibility='hidden';
          } else {
            tr.style.display='table-row';
            tr.style.visibility='visible';
          }
       }
     }
     // test TR column 3 with regexp and delete if needed
     //     alert(  );
  }
}

function ovs_filtertoggle(){
  ovs_fullevents = (ovs_fullevents + 1 ) % 2;
  ovs_filterevents();   
}

document.addEventListener("load", function(){
  if ( ovs_load > 0 ) { return; }
  ovs_load = 1;

  ovs_filterevents(); 
}, true);

GM_registerMenuCommand("OVS-Hide Full Events (toggle)", ovs_filtertoggle);

// ]]>
