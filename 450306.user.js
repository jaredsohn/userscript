// ==UserScript==
// @name          TvShow Time to Butler Streamer
// @version		  0.10
// @author        Kieron
// @namespace     http://www.example.com
// @description   Can stream episodes with butler streamer when logo clicked
// @include       http*://*tvshowtime.com/*/show/*/episode/*
// ==/UserScript==
	var prevDrop = "";
	var btResultsDiv = "";
	var prevLocation = document.location.href;
	// Adds Torrent Links and Drop-downs

var s = document.title;
s = s.substring(0, s.indexOf('-'));
document.title = s;

    function startAddingLinks()
    {
		if( jQ("#gm_links").length )
		{
			return;
		}

		var movieTitle = "";
		var addLinksToObj = "";

		jQ('<img />').attr('src', 'http://avsharath.googlepages.com/showResultsDownActive.gif'); //preload active drop image

		if(/rottentomatoes/.test(document.location.href) ) //If its on Rotten Tomatoes, obtain the rotten tomatoes elements
		{
			//addLinksToObj = jQ(".meter_box.right_door")[0];
			//addLinksToObj = jQ(".content_box.media_block.main_movie_area")[0];
			
			addLinksToObj = jQ(".media_block_content.movie_content_area")[0];
			movieTitle = document.title;
		}
		else
		if(/tvshowtime/.test(document.location.href) )//obtain IMDB page elements
		{
			if( jQ("#help-btn").length || jQ("#overview-top").length) 
			{
				//addLinksToObj = jQ(".star-box")[0];
				//addLinksToObj = jQ("#overview-top")[0];	
                addLinksToObj = jQ(".logo")[0];
                
               // document.getElementById('btResultsDiv').click();
                
			}
			else
			{
				addLinksToObj = jQ("#tn15content")[0];
			}
			movieTitle = document.title;
			if( jQ.trim(movieTitle) == "IMDb" )
			{
				movieTitle = document.title;
			}
		}

		if( addLinksToObj && movieTitle.length > 0 )
		{
			movieTitle = document.title; //trim the title

			var torrentsDiv = addLinksToObj.insertBefore(document.createElement("div"), addLinksToObj.firstChild);
			torrentsDiv.id = "gm_links";
			jQ(addLinksToObj).prepend(torrentsDiv);

			dropDownResultsDiv = document.createElement("div");
			jQ(dropDownResultsDiv).attr( {
				id: 'btResultsDiv',
				name: 'btResults'
			} );

			jQ(dropDownResultsDiv).css({ 'width':'400px', 'position':'absolute', 'display':'none', 'overflow':'auto', 'z-index':'12000', 'visibility':'hidden'});

			torrentsDiv.appendChild(dropDownResultsDiv);

			GM_addStyle("#gm_links a { vertical-align:top; outline: none;};");
			GM_addStyle("#gm_links a img { border: 0; padding: 0;};");
			GM_addStyle('#gm_links {float:left;clear:both; background:none; display:inline-block; margin:5px;}');
			GM_addStyle(".article.title-overview #prometer_container{ margin-right: 10px};");//Move away the promoter container in IMDB.
			var torrentLinksSpan = torrentsDiv.insertBefore(document.createElement("span"), torrentsDiv.firstChild );

			//img = "data:application/octet-stream;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D";
			img='http://i.imgur.com/dG0LlRR.gif';
			buildLink(torrentLinksSpan , "The Pirate Bay Magnets","http://thepiratebay.se/search/"+document.title+"/0/7/200", img);

			//Preload results.
			getBtResults("https://thepiratebay.se/search/"+document.title+"/0/7/200", true);
            
			jQ('body').click(function()
			{
				if( jQ("#btResultsDiv").is(":visible") )
				{
					jQ("#btResultsDiv").fadeOut('slow');
				}
				//jQ(".dropImg").attr("src","http://i.imgur.com/dG0LlRR.gif");
			});

			jQ("#btResultsDiv").click(function(event)
			{
				event.stopPropagation();
			});
		}
		jQ("#btResultsDiv").hide();
        
    }

	function buildLink(container, linkText, torrentSiteHref, image)
	{
		jQ("#btResultsDiv").data( torrentSiteHref, 'notLoadedYet');
		var showResultsAnchor = jQ(document.createElement("a") );
		showResultsAnchor.attr({
          	id: torrentSiteHref,
          	title: 'Torrents from '+linkText,
          	href: 'javascript:;',
			name: 'btResultsDrop'
        });
		
		var img = document.createElement("img");
		img.src = image;
		jQ(img).css({'height':'40px'});
		var showResultsImg = document.createElement("img");
		//showResultsImg.src = 'http://i.imgur.com/dG0LlRR.gif';
		//jQ(showResultsImg).addClass("dropImg");
		//jQ(showResultsImg).css({'display':'inline-block', 'vertical-align':'0px'});
		showResultsAnchor.append( img );	
		showResultsAnchor.append( showResultsImg );	
		
		showResultsAnchor[0].addEventListener('click',function(event)
		{
			event.stopPropagation();
			jQ(".dropImg").attr("src","http://i.imgur.com/dG0LlRR.gif");
			// If result is already shown for this site, fade it out.
			if( jQ("#btResultsDiv").is(":visible") )
			{
				jQ("#btResultsDiv").fadeOut('slow');
			}
			else
			{
				getBtResults(this.id, false);
				prevDrop = this.id;
				jQ(this).children(".dropImg").attr("src","http://i.imgur.com/dG0LlRR.gif");
			}

		}, false);		
		
		jQ(container).append( showResultsAnchor );
	}

	function errorLoadingResults()
	{
		jQ('#PleaseWaitForTorrents').hide();
		jQ("#btResultsDiv").html( "Not able to reach TPB :( try again later! ");
	}

	//Gets the Torrents Data from AJAX GET request.
	/*This function is obtained from IMDB Pirated Version script, and modified for this*/
	function getBtResults(url, preload)
	{
		var torrentResultsData = '';
		if( jQ("#btResultsDiv").data( url ) == 'notLoadedYet')
		{

			if(!preload)
			{
				jQ("#btResultsDiv").html("<img id='PleaseWaitForTorrents'/>");
				jQ("#PleaseWaitForTorrents").attr("src", "data:image/gif;base64,R0lGODlhEAALAPQAAP///2lRsOjl8uPe7/Lw92xVsWlRsINwvrWp16GSzdbP6XxoupSDxrmu2qOVztjS6n9qu2tTsZaGx+/t9ufk8vj3+ol3werm8/b1+tPM58a94d/a7vTz+QAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA");

				GM_addStyle('div#btResultsDiv{  height: 30px; text-align: center;}');
				jQ("#btResultsDiv").hide().css("height", "16px").slideDown('slow');
                
			}

			var errorTimer = setTimeout(errorLoadingResults, 10000); //Display error if the GM_xmlhttpRequest doesn't come up with something within 10 secs.

			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: url,
				headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
				onload: function(rd)
				{
					clearTimeout(errorTimer);
					jQ('#PleaseWaitForTorrents').hide();

					if( rd.responseText.match(/Did you mean:/) ||
						rd.responseText.match(/No results/) ||
						rd.responseText.match(/Search returned 0 results/) ||
						rd.responseText.match(/No hits/)
					  )
					{
							jQ("#btResultsDiv").text("No Torrents Found").data( url, "<span style='height:16px;'>No TorrentsFound</span>");
					}
					else
					{
						if( url.match(/piratebay/) )
						{
							torrentResultsData = filterPiratebayResults(rd.responseText);
						}

						var btResultsDiv = jQ("#btResultsDiv");
						btResultsDiv.data( url, torrentResultsData );
						if( ! btResultsDiv.is(":hidden") )
						{
							btResultsDiv.html( torrentResultsData );
							btResultsDiv.animate( {
								height: ( Math.min( btResultsDiv.children(":first").height(), 250) ) + 'px'
							}, 1500 );
						}

					}//End else result not found
				}//end onload function.
			});	//End GM_xmlhttpRequest

		}//End if notLoadedYet
		else                     //Show the cached data results for this link.
		{
			var btResultsDiv = jQ("#btResultsDiv");
			if( btResultsDiv.is(":visible") )
			{
				btResultsDiv.fadeOut("slow",
				function()
				{
					jQ(this).html( jQ("#btResultsDiv").data( url ) );
					jQ(this).css("height", "1px").show();
					jQ(this).animate( {
						height: Math.min( jQ("#btResultsDiv").children(":first").height(), 250)+'px'
					}, 1500 );
				});
			}
			else
			{
				btResultsDiv.html( jQ("#btResultsDiv").data( url) );
				btResultsDiv.css("height", "1px").show();
				btResultsDiv.animate( {
						height: Math.min( jQ("#btResultsDiv").children(":first").height(), 250)+'px'
				}, 1500 );
			}

		}//end Else if notLoadedYet.
	}
	//Ends getBtResults function

	/*Cleanup and style PirateBay results*/
	function filterPiratebayResults(rawText)
	{
		var cleanData="";
		rawText = rawText.replace(/\n|\r/g, "");
		rawText = rawText.replace(/.*?<table id=\"searchResult\">/,'<table id="searchResult">');
		rawText = rawText.replace(/<\/table>.*/,'</table>');
		rawText = rawText.replace(/href=\"\//g,'href=\"http://thepiratebay.se/');
		rawText = rawText.replace(/static\/img\/vip.gif/g,'');
		rawText = rawText.replace(/static\/img\/icon-magnet.gif/g,'');
		rawText = rawText.replace(/static\/img\/icon_image.gif/g,'');
		rawText = rawText.replace(/static\/img\/11x11p.png/g,'');
		rawText = rawText.replace(/static\/img\/trusted.png/g,'');
		rawText = rawText.replace(/static\/img\/icon_comment.gif/g,'');
		
		cleanData = rawText.toString();
		GM_addStyle('ul#searchResult {font-size:10px; text-align:left;  list-style-type: none;} ');
		GM_addStyle('ul#searchResult li {border-bottom:1px solid #ccc;} ');
		GM_addStyle('ul#searchResult li.mHeader {font-weight:bold;} ');
		GM_addStyle('ul#searchResult span.magnetName {width:200px; display:inline-block; word-wrap:break-word;} ');
		GM_addStyle('ul#searchResult span.downloadSize {width:80px; display:inline-block;} ');
		GM_addStyle('ul#searchResult span.seeders {width:40px; display:inline-block;} ');
		GM_addStyle('ul#searchResult span.leechers {width:40px; display:inline-block;} ');

		var magnetsArray = [0]
		jQ(cleanData).find("tr").not(".header").each( function(i)
		{i = 0;
			var detail ={};
			detail.name = jQ.trim(jQ(this).find(".detName").text());
			detail.magnet = jQ(this).find("td").eq(1).find("a").eq(1).attr('href');
			var desc = jQ(this).find("font.detDesc").text();
			var splits = desc.split(",");
			detail.size = splits[1].replace(/Size/g,'');
			detail.seeders = jQ(this).find("td").eq(2).text();
			detail.leechers = jQ(this).find("td").eq(3).text();
			magnetsArray.push( detail );
			//if(i > 0)
				return false;
		});

		var magnetsHTML = "<ul id=\"searchResult\">\
		<li class=\"mHeader\"><span class=\"magnetName\">Magnet</span><span class=\"downloadSize\">Size</span><span class=\"seeders\">SE</span><span class=\"leechers\">LE</span></li>";

		jQ(magnetsArray).each( function( i, detail)
		{
            i = 0;
			magnetsHTML = '';// magnetsHTML + '<li><span class="magnetName"><a href="'+detail.magnet+'">'+detail.name+'</a></span><span class="downloadSize">'+detail.size+'</span><span class="seeders">'+detail.seeders+'</span><span class="leechers">'+detail.leechers+'</span></li>';
		//alert('hi');
            location.href = detail.magnet;
            //history.go(-1);
        });
        
        
		//magnetsHTML= magnetsHTML + "</ul>";
		return magnetsHTML;
	}

	function GM_wait()
	{
		if( typeof unsafeWindow.jQuery != 'undefined')
		{
			jQ = unsafeWindow.jQuery;
			startAddingLinks();
			setInterval( checkLocationChange, 3000);
		}
		else
		{
			setTimeout( GM_wait, 1000);
		}
	}
	
	function checkLocationChange()
	{		
		if( document.location.href != prevLocation  )
		{
			//alert( "Now:"+document.location.href+"Previous:"+prevLocation );
			startAddingLinks();
			prevLocation = document.location.href;
		}
	}

	function MovieSearchLinkerSettings()
	{
		mySpan=document.createElement('span');
		mySpan.id='settingsSpan';
		document.body.appendChild(mySpan);
		mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index:12001; left: 0; top: 0; background-color: #D9E6F7; opacity:.75; display:none;");
		var myDiv = document.createElement('div');
		myDiv.id = 'settingsDiv';
		myDiv.setAttribute("style","position:fixed; width:650px; height: 320px; z-index: 12002; background-color: #444; border:2px solid #0ad; text-align:center; display:none;font-family:verdana;font-weight:bold;");
		document.body.appendChild(myDiv);
		myDiv.innerHTML="<span style='font-size:18px; color:white; line-height:35px;'>Movie Torrent Search Linker Settings</span><br/><br/>\
		<div style='padding-left:100px; height:160px;font-size:10pt;line-height:22px;'>\
			<div style='float:left;text-align:left; background:#000;color:#fff;padding:16px; width:160px;'> <h4 style='background:red; color:#000;'>Select Movie sites:</h4>\
			<input type='checkbox' class='linkerOption' name='imdb' id='IMDBcheck' checked/><label>IMDB</label><br/>\
			<input type='checkbox' class='linkerOption' name='rt' id='RTcheck' checked/><label>Rotten Tomatoes</label><br/>\
			</div>\
			<div style='float:left;text-align:left; margin-left:70px;background:#000;color:#fff;padding:16px; width:160px;'> <h4 style='background:red;color:#000;'> Select Torrent sites :</h4>\
			<input type='checkbox' class='linkerOption' name='pirateBay' id='ThePirateBaycheck' checked/><label>The Pirate Bay</label><br/>\
			</div><br/>\
			</div>\<br/>\
		<div style='text-align:center; padding:12px;'><input type='button' value='Cancel' onclick='javascript:jQuery(\"#settingsSpan\").remove(); jQuery(\"#settingsDiv\").remove();'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='SaveLinkersettings' value='Save and Exit'></div>\
		";
		jQ('#settingsDiv').css('top', parseInt( (jQ(window).height() - jQ('#settingsDiv').height() ) / 2) );
		jQ('#settingsDiv').css('left', parseInt( (jQ(window).width() - jQ('#settingsDiv').width() ) / 2) );
		jQ('#settingsSpan, #settingsDiv').show();

		var LinkerSettings = new Object;
		LinkerSettings.pirateBayEnabled = GM_getValue('pirateBayEnabled', true);
		LinkerSettings.imdbEnabled = GM_getValue('imdbEnabled', true);
		LinkerSettings.rtEnabled = GM_getValue('rtEnabled', true);

		jQ(".linkerOption").each( function()
		{
			jQ(this).attr('checked', LinkerSettings[ jQ(this).attr("name")+'Enabled'] );
		});

		jQ('#SaveLinkersettings')[0].addEventListener('click',function()
		{
			GM_setValue("pirateBayEnabled", jQ("#ThePirateBaycheck").attr("checked") );
			GM_setValue("imdbEnabled", jQ("#IMDBcheck").attr("checked") );
			GM_setValue("rtEnabled", jQ("#RTcheck").attr("checked") );
			jQ('#settingsSpan, #settingsDiv').remove();
		}, false);

	}

//window.open(detail.magnet,"_self");

	GM_registerMenuCommand("Movie Torrent Linker Settings", MovieSearchLinkerSettings);
	GM_wait();
