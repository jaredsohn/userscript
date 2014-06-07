// ==UserScript==
// @name            Bullbearings.co.uk Style Tweaks and Ad Removal
// @author          Sirbastian Manning
// @namespace       http://sirbastian.com/
// @description     Layout tweaks and ad removal for the fantasy share trading website http://bullbearings.co.uk
// @license         Creative Commons Attribution License
// @version	        0.5
// @include         http://bullbearings.co.uk/stock.portfolio.php*
// @include         http://www.bullbearings.co.uk/stock.portfolio.php*
// @released        2010-06-22
// @updated         2010-06-22
// @compatible      Greasemonkey
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall
 *
 * Creative Commons Attribution License
 * http://creativecommons.org/licenses/by/2.5/
*/

(function(){
    function BullbearingCSS(){    
        this.append_stylesheet('#Footer, #StudentSection, #BottomAdWrapper, #CorporateSection, #squareBanner, #MPU, #google_flash_embed, object {display:none !important;} #WrapperContent {width:80%; height:600px;} #WrapperMain {height:720px !important; overflow:hidden; border:2px solid #0D538B; border-top:none;} .portfolioTable {width:100%} .btnReports {display:none;} .mpuInternal {display:none;} .row {width:650px; margin-left:50px}');
    };

	//create a stylesheet
    BullbearingCSS.prototype.append_stylesheet = function(css){
        var styletag = document.createElement("style");
        styletag.setAttribute('type', 'text/css');
        styletag.setAttribute('media', 'screen');
        styletag.appendChild(document.createTextNode(css));

        document.getElementsByTagName('head')[0].appendChild(styletag);
    };

	var objects = document.getElementsByTagName("object");
	for (i = 0; i < objects.length; i++) {
		var flash = objects[i];
		if (flash.innerHTML.match(/.swf|shockwave|flash/)) flash.style.display='none';
	}
	
	var embeds = document.getElementsByTagName("embed");
	for (i = 0; i < embeds.length; i++) {
		var embed = embeds[i];
		if (embed.innerHTML.match(/.swf|shockwave|flash/)) embed.style.display='none';
		else embed.style.display = 'none';
	}

	var embeds2 = document.getElementsByTagName("embed");
	for (i = 0; i < embeds2.length; i++) {
		var embed2 = embeds2[i];
		if (embed2.src.match(/2mdn|googlesyndication|ads|pagead|ad/)) 
		{
			embed2.style.display = 'none';
		}
	}
	
	var images = document.getElementsByTagName("img");
	for (i = 0; i < images.length; i++) {
		var image = images[i];
		if (image.src.match(/webads|adlog|unichallenge/)) 
		{
			image.style.display = 'none';
		}
	}
	
	var images = document.getElementsByTagName("div");
	var counter = 0;
	for (i = 0; i < images.length; i++) 
	{
	    var image = images[i];
	    if (image.className.match(/row/))
	    {
	        if (counter == 0)
	        {
	            var innerdivs = images[i].getElementsByTagName('div');
				innerdivs[2].style.position = "relative";
                innerdivs[2].style.right = "-85px";
                innerdivs[2].style.width = "390px";
                innerdivs[2].style.marginRight = "0px";
	        }

		if (counter == 1)
	        {
				var anothercounter = 0;
	            var innerdivs2 = image.getElementsByTagName('div');

	            for (i2 = 0; i2 < innerdivs2.length; i2++)
	            {
	                var childdiv2 = innerdivs2[i2];

	                if (childdiv2.className.match(/modBox/))
	                {	
	                    if (anothercounter == 0)
	                    {
				parentrow = childdiv2.parentNode;
				parentrow.style.height = "200px";
		
	                        childdiv2.style.position = "relative";
	                        childdiv2.style.top = "-265px";
							childdiv2.style.left = "-50px";
	                        childdiv2.style.width = "370px";
	                    }

			   anothercounter += 1;
	                }
	            }
	        }

	        counter += 1;
	    }
	}

    //instantiate and run 
    var BullbearingCSS = new BullbearingCSS();
})();