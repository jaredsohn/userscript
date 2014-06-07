// ==UserScript==
// @name          Tunneltube 
// @namespace     http://www.usturlap.com/gm/userscripts
// @description   Rewrites youtube links on a page which is opened via anonymous proxy vtunnel
// @include       *
// ==/UserScript==

// KTunnel
// http://www.ktunnel.com/index.php/1010110A/9239067b60e1b9d8d8ea9e0d8218864?username=<url>rc=on&rs=on=&br=on&if=on
// rc : remove cookies
// rs : remove scripts
// br : hide referrers
// if : show url in form 


// VTunnel
// http://www.vtunnel.com/index.php/1010110A/28ca89a797ebc136420debfada19186?username=<url>rc=on&rs=on=&br=on&if=on
// rc : remove cookies
// rs : remove scripts
// br : hide referrers
// if : show url in form
var youtubeUrlPattern1 = 'http://www.youtube.com/watch';
var youtubeUrlPattern2 = 'http://youtube.com/watch';
var vtunnelUrlPrefix = 'http://www.vtunnel.com/index.php/1010110A/28ca89a797ebc136420debfada19186?username=';
var ktunnelUrlPrefix = 'http://www.ktunnel.com/index.php/1010110A/9239067b60e1b9d8d8ea9e0d8218864?username=';
var xtunnelUrlSuffix = '&rc=on&br=on&if=on';

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(GM_wait,100); 
    } else { 
        $ = unsafeWindow.jQuery; 
        letsJQuery(); 
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    $('a').click(function(event){
        event.preventDefault();
        // alert(this.href);
        if (this.href.indexOf(youtubeUrlPattern1) != -1 || this.href.indexOf(youtubeUrlPattern2) != -1){
            // alert('Matches pattern: ' + this.href);
            this.href = vtunnelUrlPrefix + this.href + xtunnelUrlSuffix;
            //alert('New URL: ' + this.href)
        }
        document.location.href = this.href;
     });
}
