// ==UserScript==
// @name          Wikipedia external tools
// @namespace     http://ja.wikipedia.org/wiki/User:whym
// @description	  add links to Wikipedia external tools onto wikipedia pages
// @include       http://*.wikipedia.org/w*
// @include       https://secure.wikimedia.org/wikipedia/*/w*
// ==/UserScript==

function include(s) {
  document.write('<script type="text/javascript" src="' +
                 'http://ja.wikipedia.org/w/index.php?title=' +
                 encodeURI(s) + '&amp;action=raw&amp;ctype=text/javascript' +
                 '&amp;dontcountme=s"><' + '/script>');
}
var regex = [
 /http:\/\/([a-z]+)\.wikipedia\.org\/wiki\/(.+)/,
 /http:\/\/([a-z]+)\.wikipedia\.org\/w\/.*title=([^\&]+)/,
 /https:\/\/secure\.wikimedia\.org\/wikipedia\/([a-z]+)\/wiki\/(.+)/,
 /https:\/\/secure\.wikimedia\.org\/wikipedia\/([a-z]+)\/w\/.*title=([^\&]+)/
];
var insertplace = document.evaluate("id('footer')",
                                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (insertplace) {
    var m = null;
    for ( i in regex ) {
       m = regex[i].exec(location.href);
       if ( m != null ) { break; }
    }
    if ( m == null ) { return; }
    var lang = m[1];
    var article = m[2];
    var links = [
                 ['PVs',     'http://stats.grok.se/'+lang+'/latest/'+article],
	             ['Watchers', 'http://toolserver.org/~mzmcbride/watcher/?db='+lang+'wiki_p&titles='+article],
                 ['Search',  'http://wikipedia.ramselehof.de/wikiblame.php?lang='+lang+'&article='+article],
                 ['Summary', 'http://vs.aka-online.de/cgi-bin/wppagehiststat.pl?lang='+lang+'.wikipedia&page='+article],
                 ['Graph',   'http://'+lang+'.wikichecker.com/article/?a='+article],
                 ];
    var node = document.createElement('div');
    node.setAttribute('style', 'font-size: small; text-align: right');
    var linkstr = '*';
    links.forEach(function(node, i, array) {
            linkstr += ' <a href="'+node[1]+'">'+node[0]+'</a> *';
        });
    node.innerHTML = linkstr;
    insertplace.parentNode.insertBefore(node, insertplace);
}

/**
   Local Variables:
   tab-width: 4
   c-basic-offset: 4
   indent-tabs-mode: nil
   End:
**/
