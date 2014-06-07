// ==UserScript==
// @name           bbncInputCharacterLimitIncrease
// @namespace      http://userscripts.org/scripts/show/53365
// @description    Increases character limit on form inputs, a workaround for Blackbaud NetCommunity front-end string limits that are smaller than back-end limits.
// @author         Micah Wittman
// @include        http://*
// @include        https://*
// @version        0.12
// ==/UserScript==

/* 

    Author: Micah Wittman | http://wittman.org/
    
    Versions:
    
        * 2009-10-30 - version 0.1.2 - Made compatible with BBNC 5.5 which always loads jQuery now.
        
        * 2009-07-20 - version 0.1.1 - Added optional feature to have the Enter key trigger submit for the Filter List By form input. In Configuration, var filterByFieldEnterToSubmitOn = true turns it on.
		
		* 2009-07-08 - version 0.1.0 - Increases character limit on form inputs, a workaround for Blackbaud NetCommunity front-end string limits that are smaller than back-end limits.
        
*/


/***************************************
*********** Configuration Begin *******/
var siteUrlKeyword = 'netcommunity'; //IMPORTANT: User lower case characters only! The default 'netcommunity' should work as is for 
                                     // a standard BBNC install which includes the path /NetCommunity/ in the URL. Set to keyword (substring) 
                                     // of the domain/path on which your NetCommunity application runs.

var increaseMaxLengthTo = '5000'; //Set to number string of the value you to set all input maxlength attributes where a maxlength 
                                  // of some sort is already set. If an input has not maxlength attribute it is ignored by the script.

var filterByFieldEnterToSubmitOn = false; //Set to true to have the Enter key trigger submit for the Filter By form input


/********** Configuration End ********/



/*** Global Variables *********************/
var protocol = 'http://';



/*** Initializing Functions ***/
/********************************/
function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
            jQuery = unsafeWindow.jQuery;
        }
    }
    if(typeof jQuery === "undefined" || jQuery === null)
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        jQuery.noConflict();
        letsJQuery();
    }
}

function letsJQuery()
{
    InputCharacterLimitIncrease();
	
	if(filterByFieldEnterToSubmitOn)
	{
		EnterToSubmit();
	}
}



/*** Helper Functions ***/
/********************************/
function setProtocol()
{
    protocol = window.location.protocol + '//';
}

function loadScripts()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
            jQuery = unsafeWindow.jQuery;
        }
    }
    if(typeof jQuery === "undefined" || jQuery === null)
    {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        var src = protocol + 'ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';
        script.setAttribute("language", "javascript");
        script.setAttribute("src", src);
        head.appendChild(script);
    }
}

function isKeyEnter(e)
{
	var code = e.keyCode || e.which;
	if(code == 13) //Enter keycode
	{
		return true;
	}
	else
	{
		return false;
	}
}


/*** Main Processing Functions ***/
/********************************/
function InputCharacterLimitIncrease()
{

    jQuery('input').each(function(){
        if(jQuery(this).attr('maxlength') > -1 && jQuery(this).attr('maxlength') < increaseMaxLengthTo)
        {
            jQuery(this).attr('maxlength',increaseMaxLengthTo);
            jQuery(this).css('background-color','rgb(255,220,140)');
        }
    });
}

function EnterToSubmit()
{
	if(jQuery("legend:contains('Filter List By')").length > 0)
	{
		var filterField = jQuery('input[type="text"]').filter("[id*='pagecntnt_tmpltcntnt_']");
		filterField.css('background-color','rgb(200,255,140)');
		filterField.keypress(function(e){ //example: #pagecntnt_tmpltcntnt_tbFilterName
			if(isKeyEnter(e))
			{
				unsafeWindow.__doPostBack('pagecntnt$tmpltcntnt$btnGo6$Toolbar1$btn0lnk','');
			}
		});
	}
}


/********** RUN SCRIPT **********/
/********************************/
var url = window.location.href.toLowerCase();
var jQuery = unsafeWindow.jQuery;
if( (url.indexOf('adminpage.aspx') > -1) && (url.indexOf(siteUrlKeyword) > -1) ) //only continue if in admin mode on a NetCommunity site
{
    setProtocol();
    if(typeof jQuery === "undefined" || jQuery === null)
    {
        loadScripts();
        GM_wait();
    }
    else
    {
        letsJQuery();
    }
}
