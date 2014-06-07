// ==UserScript==
// @name          JDownloader Serienjunkies Linkgatherer
// @description   Gathers all the RapidShare- Netload-, Filesonic-, Share-Online-, Uploaded-, Wupload-Links of one Season and imports them to JDownloader. You still have to insert the captcha but you dont have to do the annoying copy/paste anymore. By now it is configured for RapidShare. To change the hoster you just have to change the regular expression in Line 14 to nl=Netload, fc=Filesonic, so=Share-Online, ul=Uploaded, wu=Wupload.
// @include       http://serienjunkies.org/serie/*/*
// @require 	  http://code.jquery.com/jquery-1.7.1.js
// @creator 	  Johnsen92
// @version       1.0
// ==/UserScript==
$(document).ready(
    function() {
		var hrefall;
		var count,finalcount;
		var html;
		var exp = /\w*\/rc\w*/;
		count=0;
		finalcount=2;
		hrefall="";
		{	$(".qsep").each(function(){
				$("p").each(function(){
					if(count==finalcount-1)
					{	
						if($(this).children("a"))
						{	$(this).children("a").each(function(){
								if(exp.test($(this).attr("href")))
									hrefall=hrefall+$(this).attr("href")+"\n";
							});
						}
					}
					if($(this).hasClass("qsep"))
					{	count=count+1;
					}
					if(count==finalcount)
					{	return false;
					}
				});
				count=0;
				finalcount=finalcount+1;
				html = $(this).html();
				$(this).html(html + "<br><FORM ACTION=\"http://127.0.0.1:9666/flashgot\" target=\"hidden\" METHOD=\"POST\"><INPUT TYPE=\"hidden\" NAME=\"description\" VALUE=\"MyCNL\"><INPUT TYPE=\"hidden\" NAME=\"urls\" VALUE=\""+ hrefall +"\"><INPUT TYPE=\"SUBMIT\" NAME=\"submit\" VALUE=\"Add Links to JDownloader\"></FORM>");
				hrefall="";
			});
		}
	}
)
