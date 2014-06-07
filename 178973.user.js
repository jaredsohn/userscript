// ==UserScript==
// @name       OpenCart Google Extension Search
// @namespace  opencartgoogleextsrch
// @version    0.1
// @description Add google site search to extension page
// @match      http://www.opencart.com/index.php?route=extension/extension
// @include    http://www.opencart.com/index.php?route=extension/extension
// @copyright  2013+, Qphoria
// ==/UserScript==
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
script.addEventListener('load', function(){ 
    $ = unsafeWindow['jQuery'];
    $.noConflict();
    // all jQ code goes below here
    // ---------------------------

    $(document).ready(function() {
        console.log('Running OpenCart Google Extension Search');
        
        var $html = '';
        $html += '<form action="http://www.google.com/search" method="get">';
        $html += '<p><b>Google Extension Search</b><br>';
        $html += '<input type="text" name="q" value="" placeholder="Search with Google" />';
        $html += '<input type="hidden" name="sitesearch" value="http://www.opencart.com/index.php?route=extension/extension" />';
    	$html += '<input type="button" value="Go" id="button-google-search" />';
  		$html += '</p>';
        $html += '</form>';
        
        $('.extension-filter h2').after($html);
	});
    
    
    //------------------------------------
    // end jQ code
}, false);