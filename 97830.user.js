// ==UserScript==
// @name          Movie Torrent Search Linker (for IMDB, Rotten Tomatoes and Yahoo Movies)
// @version		  0.3.7.9
// @author        Sharath [edited (by Helevore): Added a small line so that www.subs4free.com link can be displayed]
// @namespace     http://www.technowise.in
// @description   Adds torrent search links, and drop down torrent results in IMDB, Rotten Tomatoes and Yahoo movie pages.
// @include       http://*rottentomatoes.com/m/*
// @include       http://*imdb.com/title/*
// @include		  http://*movies.yahoo.com/movie/*
// ==/UserScript==
// 
								/*
											This script owes credits to authors of following scripts:
											*IMDB pirated version 
											*IMDB Popular Torrent Search 
										*/
	var prevDrop = "";										
	var btResultsDiv = "";
	// Adds Torrent Links and Drop-downs 	
    function startAddingLinks() 
    {
		var movieTitle = "";
		var addLinksToObj = "";

		jQ('<img />').attr('src', 'http://avsharath.googlepages.com/showResultsDownActive.gif'); //preload active drop image
		
		if(/rottentomatoes/.test(document.location.href) && GM_getValue("rtEnabled", true) ) //If its on Rotten Tomatoes, obtain the rotten tomatoes elements
		{
			//addLinksToObj = jQ(".movie_info_area")[0];
			addLinksToObj = jQ(".meter_box.right_door")[0];
			
			movieTitle = jQ("h1.movie_title").text();
			
		}
		else
		if(/imdb/.test(document.location.href) && GM_getValue("imdbEnabled", true) )//obtain IMDB page elements
		{
			if( document.location.href.split("/")[ document.location.href.split("/").length -1 ] == "" )
			{
				addLinksToObj = jQ(".star-box")[0];
			}
			else
			{
				addLinksToObj = jQ("#tn15content")[0];
			}
			movieTitle = (jQ("title").text()).split("-")[0];
		}
		else
		if(/movies.yahoo/.test(document.location.href)&& GM_getValue("ymEnabled", true)) //For yahoo movies
		{
			addLinksToObj = jQ("h1:first").parents("td:first")[0];
			movieTitle = (jQ("title").text()).split("-")[0];
		}
		
		if( addLinksToObj && movieTitle.length > 0 )
		{

			movieTitle = movieTitle.replace(/^\s+|\s+$/g, ''); //trim the title
			movieTitle = movieTitle.replace(/\s/g, "+"); //replace spaces with +'s
			movieTitle = movieTitle.replace(/[\?#]!\"/g, ""); //remove bad chars 
			movieTitle = movieTitle.replace(/[()]/g, ""); //remove braces in movie title

			var torrentsDiv = addLinksToObj.insertBefore(document.createElement("div"), addLinksToObj.firstChild);
			torrentsDiv.id = "gm_links";			
			jQ(addLinksToObj).prepend(torrentsDiv);
			
			dropDownResultsDiv = document.createElement("div");
			jQ(dropDownResultsDiv).attr( {
				id: 'btResultsDiv',
				name: 'btResults'		
			} );
			
			jQ(dropDownResultsDiv).css({ 'padding':'5px', 'background-color':'#fff','width':'650px', 'position':'absolute', 'display':'none', 'overflow':'auto', 'z-index':'12000', 'border':'2px solid'});
			
			torrentsDiv.appendChild(dropDownResultsDiv);			
			
			GM_addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links a { vertical-align:bottom; font-weight:bold; outline: none;};");
			GM_addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links a img { border: 0; padding: 0;};");
			
			var torrentLinksSpan = torrentsDiv.insertBefore(document.createElement("span"), torrentsDiv.firstChild );
			
			if( GM_getValue('pirateBayEnabled', true) )
			{			
				img = "data:application/octet-stream;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D";
				buildLink(torrentLinksSpan, "The Pirate Bay","http://thepiratebay.org/search/"+movieTitle+"/0/7/200", img);

			}
			
			if( GM_getValue('btJunkieEnabled', true) )
			{
				img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAADRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTP////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTOATTP////////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
				buildLink(torrentLinksSpan, "btjunkie","http://btjunkie.org/search?q="+movieTitle, img);

			}
			
			if( GM_getValue('isoHuntEnabled', true) )
			{
				img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e%2F5%2BfUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N%2FMu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7%2BviadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7%2B%2FqUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj%2Fl2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC%2FrZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx%2FwAA8f8AAPH%2FAACR%2FwAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA%2F%2FEAAP%2FwAAD%2F%2BQAA";
				buildLink(torrentLinksSpan, "isohunt","http://isohunt.com/torrents/?ihq="+movieTitle+"&ihs1=11&iho1=d&iht=-1", img);
				img2 = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAADRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTP////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTOATTP////////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
				buildLink(torrentLinksSpan, "subs4free","http://freeprojectx.com/search_report.php?search="+movieTitle+"&x=22&y=15", img2);
			}
			
			//Preload results.
			getBtResults("http://thepiratebay.org/search/"+movieTitle+"/0/7/200", true);
			getBtResults("http://btjunkie.org/search?q="+movieTitle, true);
			getBtResults("http://isohunt.com/torrents/?ihq="+movieTitle+"&ihs1=11&iho1=d&iht=-1", true);											
	
			jQ('body').click(function() 
			{
				if( jQ("#btResultsDiv").is(":visible") )
				{
					jQ("#btResultsDiv").fadeOut('slow');
				}
				jQ(".dropImg").attr("src","http://avsharath.googlepages.com/showResultsDown.gif");							
			});
			
			jQ("#btResultsDiv").click(function(event)
			{
				event.stopPropagation();
			});


		}
    }

	function buildLink(container, linkText, torrentSiteHref, image)
	{
		var torrentsLink = jQ(document.createElement("a") );
		var apo;
		if(linkText == "subs4free") {
			apo = 'Subtitles from ';
		}else{
			apo = 'Torrents from ';
		}
		torrentsLink.attr({ 
          	title: apo+linkText,
          	href: torrentSiteHref,
			name: 'btLink',
			target: '_new'
        });
		
		//For Yahoo movies to use a style because there is no default anchor link style for it.
		torrentsLink.addClass("mainon");

		jQ("#btResultsDiv").data( torrentSiteHref, 'notLoadedYet');

		torrentsLink.text(linkText);
		var img = document.createElement("img");
		img.src = image;
		
		var showResultsAnchor = jQ(document.createElement("a") );
		
		showResultsAnchor.attr({ 
          	id: torrentSiteHref,
          	title: 'Torrents from '+linkText,
          	href: 'javascript:;',
			name: 'btResultsDrop'
        });
		
		showResultsAnchor.css( { 'margin-right': '25px' }); 
		showResultsImg = document.createElement("img");
		showResultsImg.src = 'http://avsharath.googlepages.com/showResultsDown.gif';
		jQ(showResultsImg).addClass("dropImg");
		showResultsAnchor.append(showResultsImg);	
		
		showResultsAnchor[0].addEventListener('click',function(event)		
		{
		 
			event.stopPropagation();
			jQ(".dropImg").attr("src","http://avsharath.googlepages.com/showResultsDown.gif");			
			// If result is already shown for this site, fade it out.
			if( prevDrop == this.id && jQ("#btResultsDiv").is(":visible") )
			{
				jQ("#btResultsDiv").fadeOut('slow');
			}
			else
			{
				getBtResults(this.id, false);				
				prevDrop = this.id;	
				jQ(this).children("img").attr("src","http://avsharath.googlepages.com/showResultsDownActive.gif");			
			}

		}, false);	

		jQ(container).append(img);
		jQ(container).append(torrentsLink);    
		jQ(container).append( showResultsAnchor );			
	}

	function errorLoadingResults()
	{
		jQ('#PleaseWaitForTorrents').hide();
		jQ("#btResultsDiv").html( "This is not responding quick enough :( try another boy!:) ");
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
						if( url.match(/btjunkie/) )
						{
							torrentResultsData = filterBtjunkieResults(rd.responseText);
						}
						else
						if( url.match(/isohunt/) )
						{
							torrentResultsData = filterIsohuntResults(rd.responseText);
						}
						else
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
					jQ(this).css("height", "1px");
					jQ(this).show();					
					jQ(this).animate( {  
						height: Math.min( jQ("#btResultsDiv").children(":first").height(), 250)+'px'
					}, 1500 );	
				});
			}
			else
			{
				btResultsDiv.html( jQ("#btResultsDiv").data( url) );
				btResultsDiv.css("height", "1px");
				btResultsDiv.show();				
				btResultsDiv.animate( {  
						height: Math.min( jQ("#btResultsDiv").children(":first").height(), 250)+'px'
				}, 1500 );					
			}						
			
		}//end Else if notLoadedYet.
	}
	//Ends getBtResults function

	/*Cleanup BTJunkie results data and then style to fit into our drop-down results*/
	function filterBtjunkieResults(rawText)
	{	
		var cleanData = jQ(rawText).find(".tab_results").eq(0).html();		
		cleanData = cleanData.replace(/<(?:|\/)font.*?>/g,'');
		cleanData = cleanData.replace(/FFFF99/g,'F3EEAD');
		cleanData = cleanData.replace(/<tr bgcolor="#F1F2F6"><th colspan="7" height="4"><\/th><\/tr>/g,'');
		cleanData = cleanData.replace(/<tr bgcolor="#FFFFFF"><th colspan="7" height="4"><\/th><\/tr>/g,'<tr bgcolor="#F3EEAD"><th colspan="7" height="1"></th></tr>');
		cleanData = cleanData.replace(/="\//g,'="http://btjunkie.org/');
		cleanData = cleanData.replace(/>\t\t<a href=.*?\/files\/.*?listfiles.*?<\/a>/g,'>');
		cleanData = cleanData.replace(/<th bgcolor="#FFFF66".*?<\/th>/g,'');
		cleanData = cleanData.replace(/align="center"><table.*/g,'align="center"></table>');
		cleanData = cleanData.replace(/'\/images/g,"'http://btjunkie.org/images");
		cleanData = cleanData.replace(/onclick=".*?"/g,'');	
		GM_addStyle('.label {color:brown !important;}');   
		GM_addStyle('.barback { border: 1px solid #B5B5B5;display: block;background-color:#FFFFFF;width: 38px;height: 7px; }');
		GM_addStyle('.barback2 { border: 1px solid #B5B5B5;display: block;background-color:#FFFFFF;width: 120px;height: 5px; }');
		GM_addStyle('.bar1 { background-color:#FF0000;display: block;width: 6px; height: 7px; }');
		GM_addStyle('.bar2 { background-color:#FFFF00;display:block;width:14px; height:7px; }');
		GM_addStyle('.bar3 { background-color:#32CD32;display: block;width: 22px; height: 7px; }');
		GM_addStyle('.bar4 { background-color:#32CD32;display: block;width: 30px; height: 7px; }');
		GM_addStyle('.bar5 { background-color:#32CD32;display: block;width: 38px; height: 7px;}');
		GM_addStyle('.tab_results { color: #000000; font-weight: normal; font-size:10px !important; background-color:#F3EEAD; padding:1px 0; }');
		
		return "<table width='100%' cellspacing='0' cellpadding='1' class='tab_results'>"+ cleanData+"</table>";
	}

	/*Cleanup ISO Hunt results data and then style to fit into our drop-down results*/
	function filterIsohuntResults(rawText)
	{	
		var cleanData="";
		var regexpressisohunt = new RegExp('<table id=serps.*?</iframe></td></tr></table></td></tr></table>', 'i', 'm');
		var cleanData= regexpressisohunt.exec(rawText);
		cleanData = cleanData.toString();
		cleanData = cleanData.replace(/href='\//g,'href=\'http://www.isohunt.com/'); 
		cleanData = cleanData.replace(/\n/g,'');
		cleanData = cleanData.replace(/\r/g,'');
		cleanData = cleanData.replace(/<tr class="hlRow".*?>/g,'<tr>');	
		cleanData = cleanData.replace(/<th .*?>/g,'<th>');	
		cleanData = cleanData.replace(/'\/img/g,"'http://isohunt.com/img");
		return cleanData;
	}

	/*Cleanup and style PirateBay results*/
	function filterPiratebayResults(rawText)
	{
		var cleanData="";
		rawText = rawText.replace(/\n|\r/g, "");
		rawText = rawText.replace(/.*?<table id=\"searchResult\">/,'<table id="searchResult">');
		rawText = rawText.replace(/<\/table>.*/,'</table>');
		rawText = rawText.replace(/href=\"\//g,'href=\"http://thepiratebay.org/');
		cleanData = rawText.toString();
		GM_addStyle('table#searchResult {font-size:80%; width:98%;} '); 
		GM_addStyle('table#searchResult > tbody > tr {background-color:#FFFFFF;} '); 
		GM_addStyle('table#searchResult > tbody > tr > td {border-bottom:1px solid PaleGoldenrod;} '); 
		GM_addStyle('table#searchResult > thead > tr.header {background:paleGoldenRod;font-size:12px;color:#805B4D;font-weight:normal;line-height:131%;} '); 
		GM_addStyle('table#searchResult > thead > tr.header a:link  {color:#805B4D;}'); 
		GM_addStyle('table#searchResult > thead > tr.header a:visited  {color:#805B4D;}'); 
		return cleanData;
	}
	//thepiratebay.org end


	// Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
        else 
        { 
            jQ = unsafeWindow.jQuery;
	    startAddingLinks(); 
        }
    }

	if (/rottentomatoes/.test(document.location.href) || /imdb/.test(document.location.href)) //If its on Rotten Tomatoes, obtain the rotten tomatoes elements
	{
		//Adding jQuery is not required as RT already uses that.
		jQ = unsafeWindow.jQuery;
		
		if( GM_getValue("rtEnabled", true) == true )
			startAddingLinks();			
	}
	else 
	{
		// Add jQuery for IMDB or Yahoo movies
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
		
		GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
		GM_wait();
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
			<input type='checkbox' class='linkerOption' name='ym' id='YMcheck' checked/><label>Yahoo Movies</label><br/>\
			</div>\
			<div style='float:left;text-align:left; margin-left:70px;background:#000;color:#fff;padding:16px; width:160px;'> <h4 style='background:red;color:#000;'> Select Torrent sites :</h4>\
			<input type='checkbox' class='linkerOption' name='pirateBay' id='ThePirateBaycheck' checked/><label>The Pirate Bay</label><br/>\
			<input type='checkbox' class='linkerOption' name='btJunkie' id='BTJunkiecheck' checked/><label>BT Junkie</label><br/>\
			<input type='checkbox' class='linkerOption' name='isoHunt' id='ISOHuntcheck' checked/><label>ISO Hunt</label><br/>\
			</div><br/>\
			</div>\<br/>\
		<div style='text-align:center; padding:12px;'><input type='button' value='Cancel' onclick='javascript:jQuery(\"#settingsSpan\").remove(); jQuery(\"#settingsDiv\").remove();'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='SaveLinkersettings' value='Save and Exit'></div>\
		";
		jQ('#settingsDiv').css('top', parseInt( (jQ(window).height() - jQ('#settingsDiv').height() ) / 2) );
		jQ('#settingsDiv').css('left', parseInt( (jQ(window).width() - jQ('#settingsDiv').width() ) / 2) );
		jQ('#settingsSpan, #settingsDiv').show();
		
		
		var LinkerSettings = new Object;
		LinkerSettings.pirateBayEnabled = GM_getValue('pirateBayEnabled', true);
		LinkerSettings.btJunkieEnabled = GM_getValue('btJunkieEnabled', true);
		LinkerSettings.isoHuntEnabled = GM_getValue('isoHuntEnabled', true);		
		LinkerSettings.imdbEnabled = GM_getValue('imdbEnabled', true);
		LinkerSettings.rtEnabled = GM_getValue('rtEnabled', true);
		LinkerSettings.ymEnabled = GM_getValue('ymEnabled', true);		

		jQ(".linkerOption").each( function()
		{
			jQ(this).attr('checked', LinkerSettings[ jQ(this).attr("name")+'Enabled'] );
		});

		jQ('#SaveLinkersettings')[0].addEventListener('click',function()
		{
			GM_setValue("pirateBayEnabled", jQ("#ThePirateBaycheck").attr("checked") );
			GM_setValue("btJunkieEnabled", jQ("#BTJunkiecheck").attr("checked") );
			GM_setValue("isoHuntEnabled", jQ("#ISOHuntcheck").attr("checked") );
			GM_setValue("imdbEnabled", jQ("#IMDBcheck").attr("checked") );
			GM_setValue("rtEnabled", jQ("#RTcheck").attr("checked") );	
			GM_setValue("ymEnabled", jQ("#YMcheck").attr("checked") );				
			jQ('#settingsSpan, #settingsDiv').remove(); 				
		}, false);
			
	}
	
	GM_registerMenuCommand("Movie Torrent Linker Settings", MovieSearchLinkerSettings);
