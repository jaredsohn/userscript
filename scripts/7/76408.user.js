// ==UserScript==
// @name           Artechock: Extended Movie Information
// @namespace      http://esquifit.myopenid.com/
// @description    Displays country of origin, year and length of each movie
// @include        http://www.artechock.de/film/muenchen/index*
// @include        http://www.artechock.de/film/muenchen/film*
// @include        http://www.artechock.de/film/muenchen/oton*
// @include        http://www.artechock.de/film/bg/film.htm
// ==/UserScript==

const ONST   = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
//const LINKS = "//table/tbody/tr/td/b/a[starts-with(@href,'../text/filminfo')]";
const LINKS  = "//tr/td//a[starts-with(@href,'../text/filminfo')]";  // this path also supports embedding into http://www.muenchen.de/
const INFO   = /<b.*?>(.*) (\d{4}), (\d+)(?: |&nbsp;)Minuten<\/b>/i;
const VIEW   = document.location.pathname.split('/').slice(-1).toString().match(/^[a-z]+/).toString(); // this is one of: index/film/oton

// Log info to javascript console; uncomment if desired
// [ GM_log('\nCached movie info from:\n' + val) for each(val in GM_listValues())];

// add option to clear preferences
GM_registerMenuCommand('Artechock: clear movies info from cache', 
                        function(){ 
                          window.document.body.addEventListener( 'foo', function() {
                                        [ GM_deleteValue(val) for each(val in GM_listValues())] 
                          }, false);
                          var foo = document.createEvent('HTMLEvents');
                          foo.initEvent('foo',/*bluble*/ true, /*cancellable*/false);
                          window.document.body.dispatchEvent(foo);
                        });

var links = document.evaluate(LINKS, document, null, ONST, null);

function showInfo(link, info){
           var tr = link;
           while (tr != document.body && 
                  tr.nodeName.toUpperCase() != 'TR') tr = tr.parentNode;
           if (tr == document.body) return;
           tr.innerHTML = tr.innerHTML.concat(
             <>
               <td>{info[0]}</td>
               <td>{info[1]}</td>
               <td>{info[2]}</td>
             </>.toXMLString()
           );
           if(VIEW == 'oton' || VIEW == 'film'){
                // this is not allways a tr
                if ( undefined == tr.nextElementSibling ||
                    tr.nextElementSibling.nodeName.toUpperCase() != 'TR') return;

                var cellBelow = tr.nextElementSibling.firstElementChild;
                var rowspan   = cellBelow.getAttribute('rowspan');
                if (rowspan){ //&& colspan < 6) {
                        var voidTD = document.createElement('TD');
                        voidTD.setAttribute('rowspan', rowspan);
                        voidTD.setAttribute('colspan', 3);
                        voidTD.style.boderTopColor = "blue";
                        tr.nextElementSibling.appendChild(voidTD);
                }
           }
}


function getHanlder(link){
  return function(resp){
           var info = INFO.exec(resp.responseText); 
           info = info ? info.slice(1) : ['N/A','N/A','N/A'] ;
           GM_setValue(link.href, JSON.stringify(info));
           showInfo(link, info);
         }
}

// Request movie info from server
function requestAndShowInfo(url){
        GM_xmlhttpRequest({
                url: link.href,
                method: 'GET',
                overrideMimeType: "text/html; charset=iso-8859-1",
                onload:  getHanlder(link),
                onerror: function(){ GM_log(["Artechok additional info:",
                                             "failing to retrieve information from",
                                              this.url
                                             ].join("\n"))}
      });

}


// For each movie, show the info from cache 
// OR get the info from server, chache it and show it.
for (var i=0; link=links.snapshotItem(i); i++)  
        ( info = GM_getValue(link.href) ) ? showInfo (link, JSON.parse(info) )
                                          : requestAndShowInfo(link.href);

// fix container table width
GM_addStyle("div.page {width: 70% !important;}");

// ads expands over the whole table width
// This is only required if js is enabled in the page and the ads are not blocked
[ wtr.firstElementChild.setAttribute('colspan', 6)
  for each ( wtr in document.getElementsByClassName('werbung') ) ];

