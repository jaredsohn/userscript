// ==UserScript==
// @name             userstyles-stats
// @namespace        http://userscripts.org/scripts/show/50875
// @description      displays style rating, number of vote and install count on search result & user pages
// @include          http://userstyles.org/*
// @version          1.1
// ==/UserScript==

var links = document.evaluate('//ul[@id="style-list"]/li/a[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
var RE_votes = /\s*<li class="[^n][a-z]+-rating"><a href="[^"]+\/comments\.php\?DiscussionID=\d+">[^<]+<\/a>\sby\s<a\shref="\/users\/\d+">/g;

function addspan (node, text) {
   var span = document.createElement('span');
   span.className = 'style_stats';
   span.textContent = text;
   node.parentNode.appendChild(span);
}

for (var i=0, a, avgRating, text ; a=links.snapshotItem(i) ; i++) {
   if ( -1 != a.className.indexOf('obsolete')) {
      addspan(a, ' (obsolete)');
      continue;
   }

   text = ' ( i: '+ a.parentNode.getAttribute('total-install-count');
   avgRating = a.parentNode.getAttribute('average-rating');

   if (avgRating && avgRating.length) {
      addspan(a, text+', r: '+avgRating+' )');
      GM_xmlhttpRequest( {
         method: 'GET',
         url: a.href,
         onload: function (resp) {
            var style_id = resp.finalUrl.substr(resp.finalUrl.lastIndexOf('/')+1);
            var ul = document.getElementById('style-list');
            if (!ul)
               return;

            // find the corresponding link in the current document {{{
            var RE_href = new RegExp('/styles/'+style_id+'$');
            var links = ul.getElementsByTagName('a');
            var link;
            for (var j=links.length - 1 ; j >=0 ; j--) {
               if (links.item(j).href.match(RE_href)) {
                  link = links.item(j);
                  break;
               }
            }
            if (!link)
               return;
            // }}}

            // nb Vote = total number of discussions
            var nbVote = resp.responseText.match(RE_votes).length;

            var tmp = link.parentNode.lastChild.textContent;
            link.parentNode.lastChild.textContent = tmp.slice(0, tmp.length-2) + '/' + nbVote + ' ) ';
         }
      });
   } else {
      addspan(a, text+' ) ');
   }

}

/* vim: set et sts=3 sw=3 foldmethod=marker : */
