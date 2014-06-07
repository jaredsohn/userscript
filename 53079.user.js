// ==UserScript==
// @name           Ikariam messaggio circolare
// @version        1.0.0
// @description    This script adds a link in the inbox, which allows the user to send a Circolar mail without getting in the embassy. 
// @author         littleChe90
// @e-mail         little.che90@gmail.com
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisor&*
// @include		   http://s*.ikariam.*/index.php*
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);


    function GM_wait() 
	{
		if(typeof unsafeWindow.jQuery == 'undefined') 
		{
			window.setTimeout(GM_wait,100); 
		}
		else 
		{	
			$ = unsafeWindow.jQuery; letsJQuery(); 
		}
    }
    GM_wait();


    function letsJQuery() 
	{
		
			var link="LINK";
			
			var ind=window.location.href.indexOf(".");
			
			var server=window.location.href.substring(8,ind);
			
			var serverold = GM_getValue("Server"+server, "SERVER");
			
			if(serverold=="SERVER")
			{
				GM_setValue("Server"+server, "s"+server);
			}
			
			var tldold = GM_getValue("tld"+server, "TLD");
			
			if(tldold=="TLD")
			{
				var ind=window.location.href.indexOf(".");
				var newval=window.location.href.substring(ind+1);
				var ind2 = newval.indexOf(".");
				var ind3 = newval.indexOf("/index.php");
				var TLD = newval.substring(ind2+1,ind3);	
				GM_setValue("tld"+server, TLD);
			}
			else
			{
				TLD=tldold;
			}
			
			
			var SERVER = GM_getValue("Server"+server, "SERVER");
			
			if(window.location.href.indexOf("embassy")!=-1&&window.location.href.indexOf("oldView=embassy")==-1)
			{
				var link=$("#all li:first a").attr("href");
			}
			
			if(window.location.href=="http://"+SERVER+".ikariam."+TLD+"/index.php?view=diplomacyAdvisorAlly")
			{
				var link=($("#allyinfo tbody tr:last td:last a").attr("href"));
			}
			
			var LINK = GM_getValue("link"+server+TLD, "LINK");
			
			if(LINK=="LINK"&&link!="LINK")
			{
					GM_setValue("link"+server+TLD,link);
			}
			
		var n=$("#messages tbody tr").length;
		
		$("#messages tbody tr:eq("+(n-2)+") td").append(" | <a href=\"http://"+SERVER+".ikariam."+TLD+"/index.php"+LINK+"\" style=\"color:red;text-decoration:underline;\" > M. C. </a>");
		
		
		
		
	}
	
	
	
	