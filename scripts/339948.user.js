// ==UserScript==
// @name       MISC
// @namespace  com.4ndrew.MISC
// @version    0.1
// @description  we toastin in a roll bread?
// @match      http://forum.bodybuilding.com/forumdisplay.php?f=19
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

try
{
    var jqueryIsLoaded=jQuery;
    jQueryIsLoaded=true;
}
catch(err)
{
    var jQueryIsLoaded=false;
}
if(jQueryIsLoaded)
{

    $(document).ready(function() {

	// get all links in the div "headline"
	var elements = $('a.username.understate');
    
	elements.each(function(index, value) { 
            
        GM_xmlhttpRequest({
            method: 'GET',
            url: value.href,
            
            onload: function(responseDetails) {
                //   alert('OK! ' +  responseDetails.responseText);
                
                var weNeg = responseDetails.responseText.indexOf("reputation_neg") != -1;
                
                if(weNeg == false){
                    
                    //change text to green
                    value.style.cssText = 'color:green !important';
                    
                } else {
                    
                    //change text to red
                    value.style.cssText = 'color:red !important;text-decoration:line-through !important';
                    
                    
                }
            }
            
        });
			
	});
	
});
    
}
else
{
    alert("jquery not loaded!");
}

