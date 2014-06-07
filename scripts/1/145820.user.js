// ==UserScript==
// @name           HostLinkChecker
// @namespace      HostLinkChecker by lludol
// @description    Vérifie automatiquement les liens d'hébergeurs de fichiers.
// @include        *
// @version        0.7
// @author         lludol
// @license        GNU GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @exclude        http*://*1fichier.com/*
// @exclude        http*://*bayfiles.com/*
// @exclude        http*://*bitshare.com/*
// @exclude        http*://*depositfiles.com/*
// @exclude        http*://*filefactory.com/*
// @exclude        http*://*filesector.cc/*
// @exclude        http*://*free.fr/*
// @exclude        http*://*gigasize.com/*
// @exclude        http*://*gigaup.fr/*
// @exclude        http*://*jumbofiles.com/*
// @exclude        http*://*putlocker.com/*
// @exclude        http*://*rapidgator.net/*
// @exclude        http*://*share-online.biz/*
// @exclude        http*://*turbobit.net/*
// @exclude        http*://*uptobox.com/*
// @exclude        http*://*uploaded.to/*
// @exlucde        http*://*uploading.com/*
// @exclude        http*://*ul.to/*
// @exclude        http*://*uploaded.net/*
// @exclude        http*://*zippyshare.com/*
// ==/UserScript==

var url_host = ['\\w{6}.1fichier.com\/','(.+)bayfiles.com\/file\/(.+)','(.+)bitshare.com\/files\/(.+)','(.+)depositfiles.com\/files\/(.+)',
				'(.+)filefactory.com\/file\/(.+)','(.+)filesector.cc\/f\/(.+)','(.+)dl.free.fr/(.+)','(.+)gigasize.com/get(.+)','(.+)gigaup.fr\/\\?g=(.+)',
				'(.+)jumbofiles.com\/\\w{12}','(.+)putlocker.com\/file\/(.+)','(.+)rapidgator.net\/file\/(.+)','(.+)share-online.biz\/dl\/(.+)',
				'(.+)turbobit.net\/(.+)\.html','(.+)uptobox.com\/(.+)','(.+)uploaded.to\/file\/(.+)|(.+)ul.to\/(.+)|(.+)uploaded.net\/file\/(.+)',
				'(.+)uploading.com\/files\/(.+)','(.+)zippyshare.com\/v\/(.+)\/file.html'];

var host = [];

// host.push(['file online','file offline','server overload', 'must be premium']);
// If header returns 404, put "file offline" to 0
host.push(['<table class="ftable2 lh2" style="width:510px">','<div style="width:600px;text-align:center;margin:auto;padding-bottom:20px">',0,0]); // 1fichier
host.push(['<div id="download-header">','<div id="download-header" class="not-found">',0,0]); // Bayfiles
host.push(['<table  style="width:100%;">','<div class="quotbox2">',0,0]); // Bitshare
host.push(['<span class="file_size nowrap">(.+)<\/span>','<div class="no_download_msg" id="no_download_message">',0,0]); // Depositfiles
host.push(['<input type="hidden" name="redirect" value="/file/(.+)"\/>','<title>File Not Found(.+)<\/title>',0,'<strong>This file is only available to Premium Members.<\/strong>']); // Filefactory
host.push(['<div class="downloads">','<div class="error_box">(.+)',0,0]); // Filesector
host.push(['<td style="text-align: left; border: 1px solid #ffffff; padding: 2px">Fichier:</td>','Fichier inexistant.',0,0]); // Free
host.push(['<div class="fileInfo">','<h2 class="error">(.+)<\/h2>',0,0]); // Gigasize
host.push(['<center><input type="submit" name="dl_file"(.+)<\/center>','<br />Le fichier que vous tenez de télécharger n\'existe pas.',0,0]); // Gigaup
host.push(['(.+)CONTENT="Download file (.+)">','Not Found(.+)',0,0]); // Jumbofiles
host.push(['<div class="site-content">','<div class=\'message t_0\'>(.+)<\/div>',0,0]); // Putlocker
host.push(['<p style="word-wrap: break-word;width: 490px;line-height: 19px;">',0,0,'<a style="color: red" href="\/article\/premium">']); // Rapidgator
host.push(['(.+)var file(.+)','<div id="dl_failure" class="ui-widget">',0,0]); // Share-online
host.push(['<h1 class="download-file">','<img id="search-icon" src="\/img\/tariff\/ajax-loader.gif" style="width:16px;height:16px;border:0;"\/>',0,0]); // Turbobit
host.push(['<input type="hidden" name="fname" value="(.+)">','<div class="page-top"><center>(.+)</center><\/div>',0,0]); // Uptobox
host.push(['(.+)<a href="(.+)" id="filename">(.+)<\/a>(.+)',0,0,0]); // Uploaded
host.push(['<h1><i class="small_header_up_icon"><\/i>(.+)','<i class="file_error"><\/i>',0,0]); // Uploading
host.push(['<div class="left" style="width: 700px;">','(.+)File does not exist on this server<\/div>',0,0]); // Zippyshare


function modifyLink(valid, link) // To display images (v, x, exclam, star and triangle)
{
	if( valid === 'ok' )
	{
		link.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiVJREFUeNpi/P//PwMlgIlUDS2ro4SAmJksAxqXh+WwMLK+/ff37x8g2wkkxkisF2oWBeZzsfNM8DKNZvj47S3D3gvrGf79++sJd0HZbG82XJqBcvksDGwT3I3CGN5/vs3AyvSLwUk3gOHv77/bwQYUTHGtA3J+gmggRjEIyM9nYWSb4GEazvDi/TWG919eA+n7DA9fXmH48eMnA/Mrnr0VwrziLSGOqQx/fv9yfPryvv7WY/M/eFsl3cnqsc1nZ+Gc4GMVzfD8/WWGL9/fM/z+84vh+evnDJdvXQaq/23LmNpq8T/MPZXh8ZsLDNIiWgzfv/9h2HVsDcOPX98qebj42v0d4xievLnI8P3XZ7CL3r5/z3Dv4SMGYNjZzq05dYRZw1Lw572nV13YuZgZXn98xMAEjCBzHXeGT18+utibeDHcfXESGGhvGH4BbX7x+jXDnbsPGH4DbV7YcO4IPBZCStS7eHi4ShWUpRiYmJgYONh4GNRlzBnuPDvD8PXHR7DNH95/Znj88AXY5jU9N4/AwggejX458l3cPJylssriYEOQwcf3XxiePXwN1rxpysMjyHIo6cAjVbKLi5ezVFpJhIGRiREs9vn9V4YXD9+BNe+Y/fwIehRjJCSnOOFeLl6OIillIYYvH38wvHzwHqx536K3R7ClEawp0TaSr5edi63o1/ffIM0Oh5d/OogziYIMwIYtQzgNgJgZlzwMM1KanQECDABGPi0ENq7EYAAAAABJRU5ErkJggg==) right no-repeat";
		link.style.paddingRight = "17px";
		link.style.color = "#81CA76";
	}
	else if( valid === 'offline' )
	{
		link.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAp5JREFUeNp0U1tIFFEY/mbWMkRBd3UXQxNzFSlWlMWE0i3LLKKEfMygl6CMHTYfEguMqNCwh7Zm0oQgeughAkOMKLObZkFQVIRFdnETzJx1V3G3XWfn0jmDszhhh/nmv3z/95/hP3OY2NANLF/DTZzTc4v/ihXWShxrOM+aOAuBP9WRM07tv+L/caymaqAgD7+2zuNzn/bCVlnue3KA8xsc8Xl7TZXOUUviboNL0RQVjw+18Hnbq5sLPKWIjfahZL+HNvQNHfTRTSy5NVXeonq3zjl3V1OumXDKjpuXOOauPcOZZs8edx9tgDT2cum7WKS6tuJz/ygsq1eheJcbix9fgGyp06kuD15fuYP4bLiAme+/hkeHT/C2vAzv+goHGAbJJmvKawFVQfz9cFKsacC3N78RmloQdl6/yDGhvm6dGDzSxtty072FLpupCTSYxR+CCE9HhfreC5xeosoqKOqudnAzUxFh/J2IREyGHCf4I0GOSbpPc1/eigj+igq01tCl0JexZDBgbblISFHiqaZj1EiGsdohiwFluYZVSEBxj2vnHRVlXmdtJeRFsmPcDEVSUVK/BTllG3yk1m/oWJUc40DLGb+9wuUtqipF6PkD8smSqYnuxxYRfnofxZvLSJONPqLhqZbpsWYWplkzv29qrMXcyEMy9aWBEQSmE2DJRPMdKTDmyrAWZG3bg1e3BxGbmy9gAr1dGDjZ4bemW3x52YxeSMWTQRXhiCpQUVY6683PZpNNJmdVhBZUYV/nKY6lf+Le823HRVI8MaNClhRQG4xoAslzFNSfEAmXUBAQFYgLWg/NU23yLjScbeVmo9rlsWmAWhqbONLkE+HECAQSHzM45ofQaTquvvaudY3nWn+udJ0J5ySc6Tr/FWAAWrOVmqP8y7MAAAAASUVORK5CYII=) right no-repeat";
		link.style.paddingRight = "17px";		
		link.style.color = "#E62A2C";
	}
	else if( valid === 'overload' )
	{
		link.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgFJREFUeNpsU79LI0EU/jabpPHSKfGUg1Mwyilcc4diqV44jNqJjZ2IbowQ8A+4nK3lgikEsRArC9GcV52dmPTxB6ImIpiIeNEqP3fWN7PZZTfJYx8zO/O+b755857075cbDaaSK+Qymi1OHuaTsVhVLDSiVf+Xn5GB0DokydWEvjr+reTTRzBJGglU/+BkpD+4gtrLLlj5zgF2eT+hP7hMM51IEhaJeYzaOTQVCQTDqL39hVa+gQ7mcK1yj2ohgUBQAcUqJzHPpqlAgPsmlqC9JujkrHXq/voxdAbMxibFPytnUCscIvCDpwicRChQ+sYXoRWOwIokmzHLmcYH3blWJJL/BwjQgRzLFcisdAutlOH3c9xbgPnHZdhMK2UhFa/tSaQAEeQkMMCo79lNsmINAorSWQsCk4S1INBtBFyirmstCXg5GHtOAvNalgKXt4uy/OAIm1e3xVh+2nHWhMdvKeCvEL87PYDc9hWSt7uuxvC96IJw+5rk6YDs+45sShRTnCsI5y+TosJ6R2dQY1VS8miwy0a6UM+By/sR7g8ETibwmD7lfbFmljKRpKj+JaVnZIpI6L0recxtbBlXyG0TuBNu3zdkCJw7PxNgaqiivRdWcxekhEg+D4dEK7Lqs9jwtE+LMZP6Y4KjBK40NhNPdZQCeJCC1ibA5BVz4V2AAQBo8gRz1Ov2wQAAAABJRU5ErkJggg==) right no-repeat";
		link.style.paddingRight = "17px";
		link.style.color = "#F2D456";
	}
	else if( valid === 'premium' )
	{
		link.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAf1JREFUeNpi/P//PwMu8O2IPj+Q+sVlc/E7LjVMuCQ+H9Dn//ef68Pff2zfgGxOkg348/t/CAOvMQMjtwGI7UeyAb9//Y9l5tNkYBLQB7GTSTLg6TpdxX9MIvZMbGwMzGzsDP8YhV2BYnLY1DKCAvH+Mp0uIDsTiHlgEnwqngxcwnwgJQzf3n5k+HRnO7K+X0A8HYhrGG/M1YrikTVbKmIYw8DEwg5X8e/bbYa/QAwCzFyqDExADAP///1heH9tI8OHW7vKwC64NE2ri5WLu1RCV5+BnZeXAR/48+MHw4vLFxl+fPwwEewCWDo406uVxsjMPFNcQ5FBUEEKe9S+fMvw/NIthr+/fleaFF/rgIcBDBxt1dQCUhOUrNVdecX4UTT/+vaT4frOi/eBzCzr6us7sMbCrx//GZjYBF35pIAB/v87Cmbn4WLgEFJQBKr5jjMagZKZ4romDP9+PgQG1A+G94/fgjGI/e/3GwYxDU2wGoxoBIEteeqibFzcrywTbBg+P7vMcO/kO4YPz3+AncovweGhbC7IwCeryXB84RmGn58/yfhMuvkUJMeClPKcRNTkGK5sPczw4vbXs6B4Dpxxay5Ibn2GWsKbR98zRRXfm/FJKTE8u3zVHii8DCMQVyerhoOiPXTu7WXYYgEoHwikOJHlGfFlZ2IAQIABAIdJ2q3PY0QzAAAAAElFTkSuQmCC) right no-repeat";
		link.style.paddingRight = "17px";
		link.style.color = "#F2D456";
	}
	else if( valid === 'error' )
	{
		link.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpi3FvPwoAHMEPpv+gSTg2/wTQTPs2MjMx/QBjJIAyAz4AKMS0/BjHtQDCbVAPkmNm4WxSdyhkUHYoYQGyQGCkG5MvbFDCwcfECMTeDvHUuSKyIWANs2Hkli6SNoxh+fzzK8PvDQQYZowgGTkGFfKCcKzEGZCo5VTMw/v/BcHxGGsPxWXkM//+9Y1ByLAPLETIgmV/WNEpMzY7h59uNcMGfr9cxCCsaMfDLmIBCNA2fAZnKTpUMf77fYPj/5xNC9O9Xhr/frjGouJQxAKN1JnK0IhtQLa7lZ8wjLMLw6+02BoY/H+ES//9+AbpiPQOXAD+DpEEYSKgRJscITYnSzGxcT0yS1jIw/TzJ8OfLJZAUSCsQ/WH4/x+Y6v79YmDmUmFg5g9kODUvnOHPj49KwNR4H+aCfDnzVAZWtr/AUD8EtPEzGJ9evY7h9JpNQC98Awbkd4Y/n88zMDF/Y5CzSAHrgbkAGG3ih03iFzD8fD4RaOEXoCgjkgv+Q7LCf0h2YGTiYuCUq2Y4sziZ4fv7Rz4s4GizLwTq+cbAIZnMQAz4/+8jg7JTGcOVtTmZIAOmX98CTupRDKSBrSC9jP/BTiQfAAQYAMjEmRhwR6odAAAAAElFTkSuQmCC) right no-repeat";
		link.style.paddingRight = "17px";
		link.style.color = "#F2D456";
	}
}

function isValid(id_host, code, link)
{
	if( id_host === 'DP' ) // If we want to check a topic (on DP)
	{
		if( /<a href=".\/viewforum.php\?f=164">Corbeille de Liens Morts<\/a>/.test(code) === false )
		{
			modifyLink('ok', link);
		}
		else
		{
			modifyLink('offline', link);
		}
	}
	else
	{
		if( code !== false )
		{
			// 4 options are checked : file online, file offline, server overload and must be premium.
			if( RegExp( host[id_host][0] ).test(code) )
			{
				modifyLink('ok', link);
			}
			else if( RegExp( host[id_host][1] ).test(code) && host[id_host][1] !== 0 )
			{
				modifyLink('offline', link);
			}
			else if( RegExp( host[id_host][2] ).test(code) && host[id_host][2] !== 0 )
			{
				modifyLink('overload', link);
			}
			else if( RegExp( host[id_host][3] ).test(code) && host[id_host][3] !== 0 )
			{
				modifyLink('premium', link);
			}
			else // Nothing found, there is a bug
			{
				modifyLink('error', link);
			}
		}
		else // No code : error 404, the file is surely offline
		{
			modifyLink('offline', link);
		}
	}
}

function openLink(id_host, link)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: link.href,
		onload: function(response)
		{
			if( response.readyState === 4 )
			{
				if( response.status === 200 ) // Everything is OK
				{
					result = response.responseText;
				}
				else if( response.status === 404 ) // If the file or website is not found
				{				
					result = false;
				}
				isValid(id_host, result, link);
			}
		}
	});
}

// Recovering the links page
var links = document.querySelectorAll("a");
var url = document.location.href;

// DP
if( /(.+)downparadise.ws\/viewtopic.php(.+)/.test(url) )
{   
	var div = document.querySelector('.postbody'); // .postbody = the first div
	var img = div.querySelectorAll('a img'); // Recovering only images of the first post (one image = one link)
	var links_dp = div.querySelectorAll('a'); // idem for links
	
	// Replacing image (html code) by a link 
	for( i = 0 ; i < img.length ; i++ )
	{
		img[i].outerHTML = links_dp[i];
	}
	
	// Checking every links
	for( i = 0 ; i < links_dp.length ; i++ )
	{
		// To be working on a link DP
		if( /(.+)downparadise.ws\/viewtopic.php(.+)/.test(links_dp[i]) )
		{
			openLink('DP', links_dp[i]);
		}
	}
}

// HOSTS
for( i = 0 ; i < links.length ; i++ )
{
	// Checking that are links to file on the host supported
	for( j = 0 ; j < url_host.length ; j++ )
	{
		if( RegExp(url_host[j]).test(links[i]) )
		{
			openLink(j, links[i]);
			break; // Useless to test other links
		}
	}
}