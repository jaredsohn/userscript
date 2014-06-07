// ==UserScript==
// @name           cppplonk
// @namespace      Salamix
// @version        1.02
// @desrciption    Blendet Postings bestimmte Benutzer im C++-Forum aus. 
// @include        http://www.c-plusplus.de/forum/*
// ==/UserScript==

(function(){

function xCall(xpath,func){
  var xpathResult=document.evaluate(
    xpath,
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null
  );
  for(var i=0;i<xpathResult.snapshotLength;i++){
    var r=func(xpathResult.snapshotItem(i));
    if(r!=null) return r;
  }
}

function xDelete(xpath){
  xCall(xpath,
    function(x){
      x.parentNode.removeChild(x);
    }
  );
}

function main()  {
  //Postings
  xDelete('//tr[td/strong[text()="Prof84"]]');
  xDelete('//tr[td/strong[text()="pointercrash()"]]');
  xDelete('//tr[td/strong[text()="Der aus dem Westen ..."]]');
  xDelete('//tr[td/strong[starts-with(text(),"Kenner d")]]');

  //Threads aus "Beiträge seit dem letzten Besuch anzeigen"
  //xDelete('//tr[td/span/a[starts-with(@href,"290456")]]');//Werwölfe-Spam-Thread
  xDelete('//tr[td/span/a[text()="Prof84"]]');//Alle von ihmn gestarteten Threads
  xDelete('//tr[td/span/a[text()="blurry333"]]');//Alle von ihmn gestarteten Threads
  xDelete('//tr[td/span/a[text()="Chechen65"]]');//Alle von ihmn gestarteten Threads
}

main();

})(); 
