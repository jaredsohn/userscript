// ==UserScript==
// @name           IMDB to Newzbin
// @namespace      http://mywebsite.com/myscripts
// @description    Adds link to movie-search on newzbin
// @include        *imdb.com*
// ==/UserScript==

GM_addStyle(':link {text-decoration:none !important;}');

function $x(xpath) {
  xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  var got = document.evaluate(xpath, document, null, null, null), result = [];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

function del(node) {node.parentNode.removeChild(node)};

$x('.imdb_lb').forEach(del);
$x('.imdb_sk').forEach(del);
//$x('div[1]//table').forEach(del);

imgdata='http://v3.newzbin.com/media/logos/nblc_default.png';
img='<img src="'+imgdata+'" width="20" height="20" border="0">';
searchSTART='http://v3.newzbin.com/search/query/?q=';
searchEND='&area=ss.100777&fpn=p&searchaction=Go&ss=100777&go=1&areadone=ss.100777';
if (document.location.href.indexOf('imdb.com/title/')>-1) {
  if (title =$x('#tn15title/h1')[0]) {
    query = escape(title.firstChild.nodeValue);
    title.innerHTML=title.innerHTML+'<a href="'+searchSTART + query + searchEND + '">'+img+'</a>';

    // Add a hidden div to the page to hold the contents of the RPC.
    resObj = document.body.appendChild(document.createElement('div'));
    resObj.style.display = 'none';
    GM_xmlhttpRequest({
        method: 'GET',
        url: search+query,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {
        try {
          resObj.innerHTML = rd.responseText;
          if (res = $x('.list/*/tr')[1]) {
            tor = title.appendChild(document.createElement('div'));
            tor.style.display= 'none';
            tor.id='tor';
            title.childNodes[2].addEventListener('mouseover',function() {tor.style.display='inline';},false);
            GM_addStyle('#tor {font-size: 14px !important; font-weight: normal!important;}');
//          for (var i=0;i<3;i++)
//            for (var j=0;j<(child=res.childNodes[(new Array(0,2,6))[i]].childNodes).length;j++)
//              tor.appendChild(child[j]);
//            tor.childNodes[2].replaceChild(tor.childNodes[2].firstChild.firstChild.firstChild,tor.childNodes[2].firstChild);
//            tor.childNodes[2].setAttribute('href','http://www.torrentspy.com'+tor.childNodes[2].getAttribute('href'));
//            tor.childNodes[1].setAttribute('href','http://www.torrentspy.com/download.asp?id='+tor.childNodes[1].getAttribute('href').slice(9,16));
          }
        } catch(err) {
          GM_log('error occured: ' + err);
        }
        del(resObj);
      }
    });
  }
}
$x('//a[contains(@href,"/title/tt")]').forEach(function(link) {
  if(link.getAttribute('href').length==17) {
    if(link.firstChild.nodeType==3) {
      query = escape(link.firstChild.nodeValue);
      a = document.createElement('a');
      a.setAttribute('href', search+query);
      a.innerHTML=img;
      link.parentNode.insertBefore(a, link);
    }
  }
});