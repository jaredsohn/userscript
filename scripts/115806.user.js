// ==UserScript==
// @name           autoposter
// @namespace      autoposter
// @description    autoposter
// @author         algkmn | www.aligokmen.com
// @include        http://*/posting.php?mode=newtopic&f=*
// @include        http://*/newthread.php?do=newthread&f=*
// @include        http://*/forum/forums/*/create-thread
// @include        http://*/posttopic.php?mode=post&f=*
// @include        http://*/newthread.php?fid=*
// ==/UserScript==

var objecta = document.createElement('script');
objecta.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
objecta.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(objecta);


function wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
        main();
    }
}

wait();


function trim(stringToTrim)
{
return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function yukle()
{

GM_xmlhttpRequest(  
    {  
    method: 'GET',  
    url: 'http://www.imgoogle.net/dalambert/son.php',  
    headers: {  
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',  
        'Accept': 'application/atom+xml,application/xml,text/xml',  
    },  
    onload: function(responseDetails)   
    {
    metin=responseDetails.responseText;  
	
	var yenidata = metin.split("##--##");


		$('input[type=text][name=subject]').val(trim(yenidata[0]));
		$('#ctrl_title').val(trim(yenidata[0]));
		
		if (location.host == 'www.warez-bb.org' || location.host == 'warez-bb.org'){ $("#tag_select").val("[MULTI]"); $("input[type=text][name=subject]").val('[MULTI] ' + trim(yenidata[0]));}
		$("#prefixfield").val("multi");
		$("#icon-22").attr("checked", "checked");
		$("input[type=radio][value=29]").attr("checked", "checked");
		
		$('textarea[name=message]').val(trim(yenidata[1]));
		$('#message_new').val(trim(yenidata[1]));
		$('textarea.cke_source cke_enable_context_menu').val(trim(yenidata[1]));
		
		
		$('input[name=sbutton]').trigger('click');
		if (location.host == 'www.warezusa.org' || location.host == 'warezusa.org') {		$('input[name=submit]').trigger('click'); }
		$('input[name=post]').trigger('click');
		$('input[value=Create Thread]').trigger('click');
		
    }  
});  

}





function main(){

yukle();

}