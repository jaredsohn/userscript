// ==UserScript==
// @name           magsdownload
// @description    Automatic redirection to "Click here to Download your file"
// @include        http://www.magazinesdownload.com/downloadmagazine*
// ==/UserScript==

//=========================================================================
// copied'n'pasted from Google-Multi-Login GMscript.
var version_scriptURL = "http://userscripts.org/scripts/source/95383.user.js";
var version_timestamp = 1275722992;
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
//=========================================================================



var magic_text=/Click here to Download your file/i;
var magic_link;
var sized=/\.sized/i;	
var found=0;
var delay=0;
var user_permit=1;
var title=document.title;


//window.addEventListener('load',my_main,true);
document.addEventListener('click', function(event) {

	//if(event.target.text.match(magic_text))
	{
		user_permit=0;
		if(found)
		{
			magic_link.style.fontWeight="normal";
			magic_link.textContent = "Click here to Download your file";
		}
		document.title=title;
	}
}, true);

function my_main()
{

//t = new Date().getTime();
//window.location.href = t;
	
	if (!found)
	{
		if (document.body.textContent.match(magic_text)) 
		{
			var a = window.document.getElementsByTagName("a");
			for(i=0;i<a.length;i++)
			{
				if(a[i].text.match(magic_text))
				{
					magic_link=a[i];
					magic_link.style.fontWeight="bold";
					found=1;
					break;
				}
			
			}
		}
	}
	
	if(found && user_permit)
	{
		var a = window.document.getElementsByTagName("img");
		for(i=0;i<a.length;i++)
		{
			if (a[i].src.match(sized))
			{
				magic_link.href = a[i].src.replace(sized,"");
			}
		}

		if(delay==0)
		{
			magic_link.textContent =  " Click here to Download your file ...";
			document.title = "[" + delay + "] " + title;
			window.location.href = magic_link.href;
                        window.location.replace(magic_link.href);
		}
		else
		{
			magic_link.textContent =  " Click here to Download your file [" + delay + "] ";
			document.title = "[" + delay + "] " + title;
			delay--;
			setTimeout(my_main,1000);
		}
	}

}


my_main();
