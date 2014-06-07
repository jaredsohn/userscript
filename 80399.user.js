// ==UserScript==
// @name           MangaStream Torrent links
// @namespace      http://userscripts.org/users/ToostInc
// @description    Adds Torrent links to the read online pages
// @include        http://mangastream.com/read/*
// @include        http://www.mangastream.com/read/*
// @include        http://www.readms.com/read/*
// @include        http://readms.com/read/*
// @copyright      2010+, Toost Inc.
// @license        GPLv3
// @version        1.5.1
// @require        http://code.jquery.com/jquery-latest.min.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

$(document).ready (function () {
	

	//Add various tabs

	var Torrents = "&nbsp&nbsp<a href='#' id='Torrents' class='btn'>Torrents</a>";
	var readanchor = "&nbsp&nbsp<a href='#' id='RO' class='btn'>Read Online</a>";

	$("div.controls > div.btn-group").attr("id","btn");

		$("div.btn-group:last").after(readanchor);
		$("div.btn-group:last").after(Torrents);


	//Add direct image links
	$("div.page").attr('id','page');
	var idtest = $("#p").attr('id');
	//console.log("id of #p is "+idtest);
	var imgsrc = $("img#manga-page").attr("src");
	console.log(imgsrc);
	var imganchor = '&nbsp&nbsp<a href="'+imgsrc+'" id="directlink" class="btn">Direct Link</a>'

	$("#RO").after(imganchor);



	//Old body for Read Online tab
	var oldhtml = $("div.page").html();	

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
		
		$("div.page").html('<table height="500" width="100%" id="table1" oncontextmenu="return true">\n\t<td id="td1" valign="top">\n\t\t<h1>Torrents:</h1><br /><span id="link">Searching...</span>\n</td>\n</table>');
		
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
		$("div.page").html(oldhtml);
		
	});	

});
