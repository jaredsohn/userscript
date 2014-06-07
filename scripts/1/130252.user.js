// ==UserScript==
// @name           Fronter Explorer
// @namespace      tripflag
// @description    in-place expansion of fronter tree view
// @include        https://fronter.com/*/links/structureprops.phtml?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// written by ed <irc.rizon.net>
// published under the GNU GPL v2

// 2012-04-06 19:36 - v1.0

// This script has two features. Clicking a folder icon will expand
// the folder without having to reload the website or open a new tab.
// Also, all external links will be resolved as they first appear.
// As each operation completes, links change color to indicate success.

// Planned features are automatic expansion of all folders
// and exporting all external links to plaintext (for wget etc).

unsafeWindow.expandthis = function(e)
{
	var link = $(e)
		//.parents("tr")
		.closest("tr")
		.find(".black-link")
	
	var target = link
		.attr('href');
	
	// https://fronter.com/oa/links/structureprops.phtml?treeid=113929

	$.ajax(target).done
	(
		function(data)
		{
			var bad1 = ');}">Go up one level</a></td></tr>';
			var ofs1 = data.indexOf(bad1);
			ofs1 += bad1.length;
			
			var bad2 = '<script language="JavaScript" type="text/javascript">';
			var ofs2 = data.indexOf(bad2, ofs1);
			
			var code = data.substring(ofs1, ofs2);
			link.css('color', '#069');
			link.after(code);
			addExpanders();
			resolveRedirects();
		}
	);
}

function addExpanderIcons()
{
	$(".archive-inner :checkbox").after(
		'<a class="expandlink" href="#" onclick="expandthis(this);">' +
		'<img src="http://localhost/fronter/expand2b.png" /></a>'
	);
	$(".expandlink+.expandlink").remove();
}

function addExpanders()
{
	var link = $(".archive-inner :checkbox")
		.closest("tr")
		.find('img[alt="Folder"]')
		.closest("a");
	
	//link.attr("href", "#");
	link.removeAttr("href");
        link.css("cursor", "crosshair");
	link.attr("onclick", "expandthis(this);");
}

function resolveRedirects()
{
	var match = "url_redirect";
	
	$(".black-link").each
	(
		function(index, para)
		{
			var link = $(para);
			var target = link.attr('href');
			if (target.substr(0, match.length) == match)
			{
				$.ajax(target).done
				(
					function(data)
					{
						// alert(data);
						// location.replace("http://area.uni.tld/~owner/somefolder/whatever.htm");
						
						var bad1 = 'location.replace("';
						var bad2 = '");' + "\n";
						
						var ofs1 = data.indexOf(bad1) + bad1.length;
						var ofs2 = data.indexOf(bad2, ofs1);
						
						var href = data.substring(ofs1, ofs2);
						href = href.replace("\\'", "'");
						href = href.replace('\\"', '"');
						href = href.replace('\\\\', '\\');
						
						link.attr('href', href);
						link.css('color', '#480');
					}
				);
			}
		}
	);
	
}

addExpanders();
resolveRedirects();
