// ==UserScript==
// @name          IMDB (Buy Tickets)-> Fandango
// @namespace     http://blog.dasickis.com
// @include       http://*.imdb.com/title/*
// @description   Shows a link to buy available tickets on Fandango.com
// ==/UserScript==
// Last Modified: April 27, 2007

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fandango.com/GlobalSearch.aspx?tab=Movies+Video&repos=Movies&q='+escape(document.title.match('[^(]+')),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      r=responseDetails.responseText;

      i=document.createElement("iframe");
      i.innerHTML=r;
      i.setAttribute('width',1);
      i.setAttribute('height',1);
      i.setAttribute('id','theaterz');
      document.body.appendChild(i);

      buytix=document.evaluate("//a[@class='btn_buy']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      if(buytix.snapshotLength>0){
        linxtotix=document.getElementsByTagName('h4');

        f=document.createElement('span');
        f.innerHTML='<br />Buy Tickets: ';
        for(x=0; x<buytix.snapshotLength; x++)
          f.innerHTML+='<a href='+buytix.snapshotItem(x).href+'>'+linxtotix[x].firstChild.innerHTML+'</a> ';
        movieElement.appendChild(f);
      }
      document.body.removeChild(document.getElementById('theaterz'));
  }
});