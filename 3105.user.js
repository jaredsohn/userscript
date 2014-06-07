// ====================================================================================================
// Namn: DNbrowse
// Beskrivning: Greasemonkey-extension till Mozilla Firefox 1.5
// Uppgift: browse dn.se
// Version: 0.1
// Skapare: Jonas Lundberg
// Licens: Apache 2.0
// ====================================================================================================


// ==UserScript==
// @name	dnBrowse
// @description	Browse DN.se without leaving the front page! Just point at a headline (without clicking), and the article will appear on the page
 // @include	http://www.dn.se/index.jsp
 // @include  http://www.dn.se/
  // @include  http://www.dn.se
// ==/UserScript==
//      
(function() {
	function xpath(query) {
		return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
        
        function cutout(text, node) {
        var searchstr = '<!--INGRESS START-->';
        var pos = text.indexOf(searchstr);
        var firstcut = text.substring(pos + searchstr.length);
        var secondsearch ='<!--INGRESS STOP-->';
        var secondpos = firstcut.indexOf(secondsearch);
        var secondcut = firstcut.substring(0 , secondpos);
        
        var searchstri = '<!--BRODTEXT START-->';
        var posi = text.indexOf(searchstri);
        var firstcuti = text.substring(posi + searchstri.length);
        var secondsearchi ='<!--BRODTEXT STOP-->';
        var secondposi = firstcuti.indexOf(secondsearchi);
        var secondcuti = firstcuti.substring(0 , secondposi);
        
        node.innerHTML = node.innerHTML+secondcut+secondcuti;
} 
        

               function mouseover(event) {
		var target = event.currentTarget;
                var searchstr = target.parentNode.getAttribute("href");
                var lookup = search(searchstr, target);
                target.removeEventListener('mouseover', mouseover, true);
	       }
        
                 var article = xpath("//a[@class='rubriklank']/span");
         	for (var i = 0; i < article.snapshotLength; i++) { 
                var strong =     article.snapshotItem(i); 
                strong.addEventListener('mouseover', mouseover, true);
                }
                
    function search(str, node)             {
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.dn.se/'+str+(str.indexOf('?') > -1 ? '&' : '?') + new Date().getTime(),
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
            var ok = '200';
            if(responseDetails.status == ok) {
            cutout(responseDetails.responseText, node);
            }
        // alert(responseDetails.responseText);
    }
}) };        


})();



        










