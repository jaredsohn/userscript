// ==UserScript==
// @name       Google: Add "More" to Top Bar
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Adds all the entries in the Top Bar's "More" menu to the Top Bar
// @match      http://*.google.*
// @match      https://*.google.*
// @copyright  2012+, You
// ==/UserScript==

(function() {
    function init() {
        try {
            var gbzc = document.getElementById('gbzc');
            if (!gbzc) gbzc = document.getElementsByClassName('gbtc')[0];
            
            var gbd = document.getElementById('gbd');
            var gbmtc = gbd.getElementsByClassName('gbmtc');
            
            for (var i=0;i<gbmtc.length;) {
                var temp = gbmtc[i];
                temp.className = 'gbt';
                var a = temp.children[0];
                a.className = 'gbzt';
                
                var gbtb2 = document.createElement('span');
                gbtb2.className = 'gbtb2';
                var gbts = document.createElement('span');
                gbts.className = 'gbts';
                gbts.innerHTML = a.innerHTML;
                a.innerHTML = '';
                a.appendChild(gbtb2);
                a.appendChild(gbts);
                
                gbzc.appendChild(temp);
            }
            gbd.parentNode.parentNode.removeChild(gbd.parentNode);
            gbzc.parentNode.style.background = 'rgb(45, 45, 45)';
        } catch (ex) {
            // do nothing
        }
    }
    
    document.addEventListener('load', init, false);
})();