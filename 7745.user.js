// ==UserScript==
// @name           IMDB torrentspy linker
// @namespace      http://mywebsite.com/myscripts
// @description    A template for creating new user scripts from
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

imgdata='data:;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5Xq90Oe+vdDnor3Q5YwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa90Od2vdDn/r3Q5/690OeEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDl/r3Q5+q90OfSvdDmaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFr3Q5pq90OUOvdDkMAAAABAAAAAAAAAAAAAAAAAAAAACvdDk1r3Q5cq90OSgAAAAAAAAAAK90ORqvdDlSr3Q5qa90OZcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5yq90Of+vdDmnAAAAAK90OYavdDn0r3Q5/690Of+vdDnOr3Q5GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK90ObGvdDn/r3Q5uq90Oa6vdDn/r3Q59K90OeyvdDn/r3Q5/690OacAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivdDkhr3Q5Rq90OaKvdDn/r3Q55K90OSOvdDkRr3Q53K90Of+vdDnyr3Q5HwAAAAAAAAAAAAAAAAAAAACvdDngr3Q5rK90OTSvdDnfr3Q5/690OasAAAAAr3Q5I690Oe2vdDn/r3Q5/K90OSwAAAAAAAAAAAAAAAAAAAAAr3Q5f690OXivdDmhr3Q5/690Of+vdDnqr3Q5s690OeavdDn/r3Q5/690Od2vdDkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5KK90OfWvdDn/r3Q5/690Of+vdDn/r3Q5/690Of+vdDllAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDlLr3Q54K90Of+vdDn/r3Q5/690Oe6vdDnor3Q5QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK90OQ+vdDlQr3Q5cK90OVyvdDkYr3Q5Ma90ObCvdDkur3Q5EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDm3r3Q5/690Oa8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDkar3Q59K90OfavdDm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq90OZ6vdDnzr3Q5VwAAAAAAAAAA/8MAAP/DAAD/wwAA/8cAAMYfAADEDwAAwA8AAMAHAACBBwAAgAcAAOAPAADwDwAA+AMAAP/jAAD/wwAA/+MAAA==';
img='<img src="'+imgdata+'" border="0">';
search='http://www.torrentspy.com/search?query=';
if (document.location.href.indexOf('imdb.com/title/')>-1) {
  if (title =$x('#tn15title/h1')[0]) {
    query = escape(title.firstChild.nodeValue);
    title.innerHTML=title.innerHTML+'<a href="'+search + query + '">'+img+'</a>';

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
            for (var i=0;i<3;i++)
              for (var j=0;j<(child=res.childNodes[(new Array(0,2,6))[i]].childNodes).length;j++)
                tor.appendChild(child[j]);
            tor.childNodes[2].replaceChild(tor.childNodes[2].firstChild.firstChild.firstChild,tor.childNodes[2].firstChild);
            tor.childNodes[2].setAttribute('href','http://www.torrentspy.com'+tor.childNodes[2].getAttribute('href'));
            tor.childNodes[1].setAttribute('href','http://www.torrentspy.com/download.asp?id='+tor.childNodes[1].getAttribute('href').slice(9,16));
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