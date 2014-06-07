// ==UserScript==
// @name           MangaStream Torrent links
// @namespace      http://userscripts.org/users/ToostInc
// @description    Adds Torrent links to the read online pages
// @include        http://mangastream.com/read/*
// @include        http://www.mangastream.com/read/*
// @copyright      2010+, Toost Inc.
// @license        GPLv3
// @version        1.4.3
// @require        http://code.jquery.com/jquery-latest.min.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

$(document).ready (function () {
	

	//Add various tabs

	var Torrents = "<a href='#' id='Torrents' class='notactive'>Torrents</a>";
	var readanchor = "<a href='#' id='RO' class='notactive'>Read Online</a>";

	$("#controls > div.spacer").attr("id","spacer");

	$("#spacer").before(Torrents);
	$("#spacer").before(readanchor);

	//Add direct image links
	//$("#page > img#p").attr('id','img');
	var idtest = $("#p").attr('id');
	//console.log("id of #p is "+idtest);
	var imgsrc = $("img[src^='http://img.mangastream.com/m/']").attr("src");
	//console.log(imgsrc);
	var imganchor = '<center>\n\t<a href="'+imgsrc+'" id="directlink">direct link</a>\n</center>'
	$("#manga a[href^='/read/']").before(imganchor);
	$("#manga a[href^='/read/']").after(imganchor);

	//Re-enable Context menu


	var	cockblock = document.evaluate(
	"//*[@oncontextmenu]",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

	if (cockblock) { 
		for ( i = 0; i < cockblock.snapshotLength; i++){
			var val = cockblock.snapshotItem(i).getAttribute('oncontextmenu');
			if ( val.search(/return false/i) != -1 ){
				cockblock.snapshotItem(i).setAttribute('oncontextmenu','return true');		
			}

		}		
	}


	//Old body for Read Online tab
	var oldhtml = $("#pagewrapper").html();	

	//Function for clicking Torrents
	$("#Torrents").click(function torrents() {

		$("#Torrents").html('Refresh');
		
		var title = document.title;

		var title = title.replace(/ -.*/,"");

		var title = title.replace(/'/,"");

		var query = title + " Mangastream"

		var query = query.replace(/\s/g,"+");

		var url = "http://www.nyaa.eu/?page=search&term="+query+"&cat=0&listorder=1&page=search&sort=1"

		//console.log(url);
		
		$("#pagewrapper").html('<table height="500" width="100%" id="table1" oncontextmenu="return true">\n\t<td id="td1" valign="top">\n\t\t<h1>Torrents:</h1><br /><span id="link">Searching...</span>\n</td>\n</table>');
		
		GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{ "Content-Type": "application/x-www-form-urlencoded" },
		onload: function (response) {
				var raw = response.responseText;
				if (response.responseText.indexOf("No torrents found.") == -1) {
					//console.log(raw);
					if (raw.indexOf("Files in torrent:") == -1) {
						var content = /<td class="tlistdownload">.*?<\/td>/.exec(raw);
						var content = content.toString().replace("www-dl.png", "www-download.png");
						//console.log(content);
						var torrentlink = content.toString();
						//console.log(torrentlink);
					}

					else if (raw.indexOf("Files in torrent:") > -1) {
						//console.log("Single torrent");
						var content = /<div class="viewdownloadbutton">.*?<\/div>/.exec(raw);
						//console.log(content);
						var torrentlink = content.toString();
					}	
						
					//console.log(torrentlink);			
					$("#link").html(torrentlink);
					
				}

				else if(response.responseText.indexOf("No torrents found.") > -1) {
					var othertitle = title.replace(/'/,"").replace(/\s/g,"+");
					var otherurl  = "http://www.nyaa.eu/?term="+othertitle+"&cats=2_0&listorder=1&page=search&sort=1";
					var otherlink = "No Results Found...Maybe search for <a href='"+otherurl+"' id='otherurl'>other</a> groups?";					
					$("#link").html(otherlink);
					
				}
			}

		});
		

	});

	//Function for clicking Read Online Tab

	$("#RO").click(function ropage() {
		$("#Torrents").html('Torrents');		
		$("#pagewrapper").html(oldhtml);
		
	});	

});
