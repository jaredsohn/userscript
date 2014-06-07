// ==UserScript==
// @name          Threaded MAL discussions by anime or manga
// @description   Комментарии с поддержкой веток для каждого аниме и манги на MAL-е
// @include       http://myanimelist.net/anime*
// @include       http://myanimelist.net/manga*
// @run-at        document-start
// @version       2013.01.07
// ==/UserScript==

(function(){
if(!(new RegExp(/\/(?:anime|manga)\/(\d+)\/[^\/]+\/?$/i)).test(window.location))
    if (!(new RegExp(/\/(?:anime|manga).+id=(\d+)$/i)).test(window.location)) 
        return;
var dsqid = parseInt(RegExp.$1, 10);
if (isNaN(dsqid)) return;

document.addEventListener('DOMContentLoaded', function(){
    // we are going from the most common identifiable element here
    var ph = document.evaluate('id("horiznav_nav")/following-sibling::div/table/tbody/tr[last()]', document, null, 9, null).singleNodeValue;
    if (!ph) return;
   
    var dqd = document.createElement('tr');
    dqd.innerHTML = '<td><br/><h2>Russian Comments</h2><br/></td>';
    ph.parentNode.appendChild(dqd);

    var dq = document.createElement('tr');
    dq.innerHTML = '<td id="disqus_thread" style="padding : -10px 0;"></td>'
    ph.parentNode.appendChild(dq);

    var dsqconf = document.createElement('script');
    dsqconf.type = 'text/javascript';
    dsqconf.text = 'var disqus_identifier = "' + dsqid + '";';
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(dsqconf);

    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = 'http://russian-mal.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(dsq);
}, false);

})();