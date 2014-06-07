// ==UserScript==
// @name          Rotten Tomatoes Popular Torrent Search Linker V0.3.4.3
// @author        Sharath
// @namespace     http://technowise.blogspot.com
// @description    Adds torrent search links, and drop down torrent results in IMDB and Rotten Tomatoes movie (review) pages.
// @include        http://*rottentomatoes.com/m/*
// ==/UserScript==
										/*
										Credits: 
											Some parts of this script is taken from other useful scripts.
											IMDB pirated version (Styling and Ajax calls)
											IMDB Popular Torrent Search (Adding links and icons)
										*/
	// Adds Torrent Links and Drop-downs 
    function startAddingLinks() 
    {
		var movieTitle = "";
		var addLinksTo = "";
		var prevDrop = "";

		var addLinksTo = ".movie_info_area";
		movieTitle = $(".movie_info_area > h1:first").text();


		var div = $(addLinksTo)[0];
		
		if(div && movieTitle.length > 0 )
		{

			movieTitle = movieTitle.replace(/^\s+|\s+$/g, ''); //trim the title
			movieTitle = movieTitle.replace(/\s/g, "+"); //replace spaces with +'s
			movieTitle = movieTitle.replace(/[\?#]!\"/g, ""); //remove bad chars 
			movieTitle = movieTitle.replace(/[()]/g, ""); //remove braces in movie title

			var torrentsDiv = div.insertBefore(document.createElement("div"), div.firstChild);
			
			$(addLinksTo).prepend(torrentsDiv);
			
			torrentsDiv.id = "gm_links";
			GM_addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links a { vertical-align:bottom; font-weight:bold; outline: none; };");
			var torrentLinksSpan = torrentsDiv.appendChild(document.createElement("span"));
			
			img = "data:application/octet-stream;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D";
			buildLink(torrentLinksSpan, "The Pirate Bay","http://thepiratebay.org/search/"+movieTitle+"/0/7/200", img);

			img = "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ%2BRgDx0MEA%2FPLxAP%2F99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL%2BEzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
			buildLink(torrentLinksSpan, "mininova","http://www.mininova.org/search/"+movieTitle+"/4/seeds", img);

			img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e%2F5%2BfUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N%2FMu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7%2BviadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7%2B%2FqUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj%2Fl2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC%2FrZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx%2FwAA8f8AAPH%2FAACR%2FwAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA%2F%2FEAAP%2FwAAD%2F%2BQAA";
			buildLink(torrentLinksSpan, "isohunt","http://isohunt.com/torrents/?ihq="+movieTitle+"&ihs1=2&iho1=d&iht=1", img);

			img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAADRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTP////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTOATTP////////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
			buildLink(torrentLinksSpan, "btjunkie","http://btjunkie.org/search?q="+movieTitle, img);
		
			dropDownResultsDiv = document.createElement("div");
			$(dropDownResultsDiv).attr( {
				id: 'btResultsDiv',
				name: 'btResults'		
			} );
			
			$(dropDownResultsDiv).css({ 'padding':'5px', 'background-color':'#fff','width':'650px', 'position':'absolute', 'display':'none', 'overflow':'auto', 'z-index':'2000', 'border':'2px solid'});
			torrentsDiv.appendChild(dropDownResultsDiv);
			
			$('body').click(function() 
			{
				if( ! $("#btResultsDiv:hidden")[0] )
					$('#btResultsDiv').slideUp('slow');
			});
			
			$('#btResultsDiv').click(function(event)
			{
				event.stopPropagation();
			});


		}
    }

	function buildLink(container, linkText, torrentSiteHref, image)
	{
		var torrentsLink = $(document.createElement("a") );
		torrentsLink.attr({ 
          title: 'Torrents from '+linkText,
          href: torrentSiteHref,
		  name: 'btLink',
		  target: '_new'		  
        });

		torrentsLink.text(linkText);
		var img = document.createElement("img");
		img.src = image;
		
		var showResultsAnchor = $(document.createElement("a") );
		
		showResultsAnchor.attr({ 
          id: torrentSiteHref,
          title: 'Torrents from '+linkText,
          href: 'javascript:;',
		  name: 'btResultsDrop'
		  
        });
				
		showResultsAnchor.css( { 'margin-right': '25px' }); 
		showResultsImg = document.createElement("img");
		showResultsImg.src = 'http://avsharath.googlepages.com/showResultsDown.gif';			
		showResultsAnchor.append(showResultsImg);	
		
		showResultsAnchor[0].addEventListener('click',function(event)		
		{

			event.stopPropagation();
			$("#btResultsDiv").html("<img id='PleaseWaitForTorrents' src='http://avsharath.googlepages.com/loadingTorrent.gif' />");
			GM_addStyle('div#btResultsDiv{  height: 30px; text-align: center;}');

			if( $("#btResultsDiv:hidden")[0] ) //Show the result area if its hidden.
			{
				$("#btResultsDiv").css("height", "16px")
				.slideDown('slow');
				getBtResults(this.id);				
				prevDrop = this.id;				
			}
			else // If a result is already shown for other, slide it up and show the result for the clicked site.
			if( prevDrop != this.id )
			{
				$('#btResultsDiv').animate( {  
						height: '16px'
					}, 1500 );
				
				getBtResults(this.id);				
				prevDrop = this.id;		
			}
			else
				$("#btResultsDiv").slideUp('slow');

		}, false);	
		

		$(container).append(img);
		$(container).append(torrentsLink);    
		$(container).append( showResultsAnchor );			
	}
	
	//Gets the BTJunkie Data from AJAX GET request.
	/*This function is obtained from IMDB Pirated Version script, and modified for this*/
	function getBtResults(url)
	{
		
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: url,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
			onload: function(rd) 
			{
				$('#PleaseWaitForTorrents').hide();
				
				if( rd.responseText.match(/Did you mean:/) ||
					rd.responseText.match(/No results/) ||
					rd.responseText.match(/Search returned 0 results/) ||
					rd.responseText.match(/No hits/)
				  )
				{
						$('#btResultsDiv').text("No TorrentsFound");
				}
				else
				{
					if( url.match(/btjunkie/) )
					{
						$('#btResultsDiv').html( filterBtjunkieResults(rd.responseText) );
					}
					else
					if( url.match(/mininova/) )
					{
						$('#btResultsDiv').html( filterMininovaResults(rd.responseText) );						
					}
					else
					if( url.match(/isohunt/) )
					{
						$('#btResultsDiv').html( filterIsohuntResults(rd.responseText) );	
					}
					else
					if( url.match(/piratebay/) )
					{
						$('#btResultsDiv').html( filterPiratebayResults(rd.responseText) );																		
					}																
					
					
					if( ! $("#btResultsDiv:hidden")[0] )
					{
						$('#btResultsDiv').animate( {  
							height: ( Math.min( $('#btResultsDiv>*:first').height(), 250) ) + 'px'
						}, 1500 );								
					}
					
				}		
			}
		});			
		
	}
	//Ends getBtResults function

	/*Cleanup BTJunkie results data and then style to fit into our drop-down results*/
	function filterBtjunkieResults(rawText)
	{	
		var cleanData="";
		rawText= rawText.replace(/\n/g,'');
		rawText= rawText.replace(/\r/g,'');
		var re = new RegExp('<table cellpadding="1".*?Next', 'i', 'm');
		cleanData = re.exec(rawText);		
		cleanData = cleanData.toString();
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
		return cleanData;
	}


	/*Cleanup Mininova results data and then style to fit into our drop-down results*/
	function filterMininovaResults(rawText)
	{	
		var cleanData="";
		rawText = rawText.replace(/href="\//g,'href="http://www.mininova.org/'); //http://www.mininova.org/tor/1033892
		rawText = rawText.replace(/href="http:\/\/www.mininova.org\/sub/g,'id="linksfrommininova" href="http://www.mininova.org/sub');
		rawText = rawText.replace(/<span id="linksfrommininova">.*?<\/span>/g,'');
		var regexpressmininova = new RegExp('<table class="maintable".*?</tr></table>', 'i', 'm');
		var cleanData= regexpressmininova.exec(rawText);
		cleanData = cleanData.toString();
		cleanData = cleanData.replace(/\/images/g,"http://mininova.org/images/");
		cleanData = cleanData.replace(/onclick=".*?"/g,'');		
		GM_addStyle('table.maintable {font-size:80%; width:98%;} '); 
		GM_addStyle('tr.d {font-size:11px; width:98%;} '); 
		GM_addStyle('.maintable .ti.com {background-color:paleGoldenRod; padding:0px 0px 0px 4px; -moz-border-radius:7px;}'); 
		GM_addStyle('table.maintable tr {	border-bottom:1px solid PaleGoldenrod;}'); 
		GM_addStyle('table.maintable th {	padding: 1px 1px 1px 1px;	background-color: PaleGoldenrod;	-moz-border-radius-bottomleft:4px;	-moz-border-radius: 3px 3px 3px 3px;	border-top-width: 1px;	border-bottom-width: 1px;	border-top-style: inset;	border-bottom-style: inset;	border-top-color: PaleGoldenrod;	border-right-color: #FFFFFF;	border-bottom-color: PaleGoldenrod;	border-left-color: #FFFFFF;}'); 
		GM_addStyle('table.maintable {	border-spacing: 0px;	border-collapse: collapse;	background-color: white;	border-top-width: medium;	border-bottom-width: 0px;	border-top-style: solid;	border-bottom-style: solid;	border-left-style: none;	border-top-color: PaleGoldenrod;	border-bottom-color: PaleGoldenrod;	font-size: small;}'); 
		GM_addStyle('#linksfrommininova{	color: #75808A !important; margin-left:2px; text-transform:lowercase;}'); 
		GM_addStyle('table#maintable > tbody > tr.header a:link  {color:#805B4D;}'); 
		return cleanData;
	}

	/*Cleanup Mininova results data and then style to fit into our drop-down results*/
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
		cleanData = cleanData.replace(/'\/img/g,"'http://isohunt.com/img/");
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

	// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

	// Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') 
		{ 
			window.setTimeout(GM_wait,100); 
		}
        else 
        { 
            $ = unsafeWindow.jQuery; 
			startAddingLinks(); 
        }
    }

    GM_wait();	