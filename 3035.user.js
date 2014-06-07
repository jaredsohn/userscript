// ====================================================================================================
// Namn: DSCbrowse
// Beskrivning: Greasemonkey-extension till Mozilla Firefox 1.0
// Uppgift: att browsa skivrecensioner p? DSC
// Version: 0.3
// Skapare: TUT-R?VEN (browse)
// Licens: fildela inte JavaScript!
// ====================================================================================================


// ==UserScript==
// @name	dscBrowse
// @description	Skriver om f?rstasidan s? att "bold" blir till en sorts hyperl?nkar. prova s? f?r du se.
 // @include	http://www.dagensskiva.com/index.asp*
 // @include  http://www.dagensskiva.com/
 // @include  http://www.dagensskiva.com/index.asp
// ==/UserScript==
//      
(function() {

	function xpath(query) {
		return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
       function cutout(text, str) {
        var searchstr = '<!--results start--><!--result item start-->';
        var pos = text.indexOf(searchstr);
        var firstcut = text.substring(pos + searchstr.length);
        var secondsearch ='</td>';
        var secondpos = firstcut.indexOf(secondsearch);
        var secondcut = firstcut.substring(0 , secondpos);
        var result = document.createElement("p");
        result.innerHTML = '<B>'+str+'</b></br>'+searchstr+secondcut;
        box.parentNode.appendChild(result);
        return(searchstr+secondcut);
} 
        
        
       function mouseover(event) {
		var target = event.currentTarget;
                var searchstr = escape(target.innerHTML)
                var lookup = search(searchstr);
                target.removeEventListener('mouseover', mouseover, true);
                
	       }
               
        var box = xpath("//P[@CLASS='box']").snapshotItem(0);
               
         var article = xpath("//td[@width='350']/p[1]/strong");
         	for (var i = 0; i < article.snapshotLength; i++) { 
                var strong =     article.snapshotItem(i); 
                strong.addEventListener('mouseover', mouseover, true);
                }
                
                var barticle = xpath("//td[@width='350']/p[1]/b");
         	for (var i = 0; i < barticle.snapshotLength; i++) { 
                var bstrong =     barticle.snapshotItem(i); 
                bstrong.addEventListener('mouseover', mouseover, true);
                }
       
    function search(str)             {
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.dagensskiva.com/search.asp?val=text&strang='+str+'&x=13&y=12',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
            var ok = '200';
            if(responseDetails.status == ok) {
         var feed = cutout(responseDetails.responseText, unescape(str));
            }
        // alert('Request for Atom feed returned ' + responseDetails.status +' ' + responseDetails.statusText + '\n\n' +'Feed data:\n'+feed);
    }
}) };        


})();



        










