// ==UserScript==
// @name           deviousInfo
// @namespace      http://neko-mangaka.deviantart.com/
// @description    Pop-up a tool-tip with useful information about a deviant when hovering with Shift held
// @include        http://*.deviantart.com/*
// ==/UserScript==

// To change what information you see in your tooltip, chage DESIRED_INFO below.

(function()
{																																																																																																																																																																																																																																																																																																									// =-=-=-=-=-= C O N S T A N T S =-=
	
	// DESIRED_INFO: A space separated list of tokens specifying what data to include in the tooltip
	// Valid tokens are: name, type, gender, since, subscribed, pageviews, location, online, mood, status, merits, deviations, scraps, prints, 
	//                   deviationcomments, deviantcomments, commentsreceived, newscomments, forumposts, journals, shouts, favourites
	// If a token doesn't exist for a particular deviant, it is ignored
	var DESIRED_INFO = 'name status merits type gender pageviews location online mood';
	
	// The distance between the cursor and the tooltip in both the x and y directions
	var CURSOR_BUFFER = 3;
	
	// The list of all subdomains of dA that are not usernames
	// There's probably a better way to do this, but it works for now
	var NOT_USERNAMES = ['www', 'my', 'browse', 'shop', 'help', 'chat', 'forum', 'store', 'search', 'today', 'staffblog', 'dd', 'artisian', 'traditional', 'digitalart', 'photography', 'poetry', 'prose', 'designs', 'flash', 'wallpaper', 'skins', 'icons', 'visualization', 'modules', 'handhelds', 'cell', 'contents', 'marketplace', 'currentevents', 'darelated', 'resources', 'stockart', 'screenshots', 'irc', 'news', 'poll', 'comments', 'shout', 'about', 'services'];
	
// =-=-=-=-=-= I C O N S   A N D   I M A G E S =-=
	
	// Spinning "working" indicator
	var THROBBER = "data:image/gif,GIF89a%12%00%12%00%C4%1A%00yyw%AE%AE%AC%C5%C5%C3yyv%94%94%93%95%95%94%A3%A3%A2%AF%AF%AE%C6%C6%C3%A4%A4%A3%BB%BB%B9%A5%A5%A5%B9%B9%B7xxv%88%88%86%D2%D2%CF%86%86%84%96%96%96%C6%C6%C4%D1%D1%CE%B0%B0%AF%94%94%92%A2%A2%A1%BA%BA%B8%D1%D1%CF%87%87%85%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%1A%00%2C%00%00%00%00%12%00%12%00%00%05i%A0%26%8Edi%96%CBr%AEI%9B%AC%23EiFmhQt%1E%FC%A1Y%16MaX0%05%8E%01%12aI8%1DM%95%8AI%A1%80i%1C%8E%D1e%7BYe%BE%19%11%B7%7B%02%87E%0C%86%15%021I%24%26%00%E0%84%A8%23Hr%B9I%C0%17h%1E%0F%1A%03%83%03'%7C%1A%18%89%18%1A%0D%0DV%88%8A%8F%24%13%13%92%96%1A!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05c%A0%26%8E%1AE%91(y%ACG%3A*%8A%16%CC%81%B6%2C%E8%A5_r%9D%FC%09%D2%8E72%18%0D(%06%23e%B1%90%24%12%D7(%12%D1%20%AE%08ia%5B%10x%05R%82%98%A0%F1JE%95%0A%E9%F1H9%1C(%8C%1CC%CA%D83%A49%1D%00%D0%DC%F1%24%13%13%1A%7C%7C%1A%10%10g%03%8B%03g%24%0D%0D.!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05d%A0%26%8E%9A%A2%90(y%ADW%3AJ%92%C6%B6%14%85%228%A21%8Cv%FC%07%92%60(%20%05%8E%01%D40u%24%3D%1E%AE%D1b%A1%C1X1%D1%846q%C5%BA%0C%60%83f2%89%8A%2C%16%12%00%90%8ADP%EB5%A9%40%2F%90%06%F8%81%C6%E1%D0%10%FE%04(%0D%0D%1A%19%86%19%1A%15%15f%87%88f%23%10%10.!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05c%A0%26%8E%9A%24%91(%89%ACH%3A%3E%8F%26%CC%82%A6((%A6cr%7D%FD%17%D2%8E7%02%06I%93I%8A%C1%20%01%00%AE%11%85%A2y%3E%A3%87%ECa%C0%1DD%03%E0%80%A6%D1%88%8A%C0%24%87%23%B5X%A02%F0%0C)AO%90%E2%F2HDc%E8%1BP%10%10%1A%05%84%05%1A%16%16f%04%8B%04f%24%15%15.!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05d%A0%26%8E%DA%F3%90(%89%ADX%3A%02%80%C6%B6%92%84%C2%B06M%1A%E2%23%A4%81p%40%12%18%05%A8F%23e%249%1C%AE%91B%A1%C9X3%D1%8B%F6r%C5%BA%B6%17%0D%04%12%151%18%A4H%24E%A1%A0%0A%F0%02%E9%40%3F%90%08x%82f%B1%D0%04%FE%01(%15%15%1A%09%86%09~%81Q%06%8C%06e%24%16%16.!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05e%A0%26%8E%1A%00%90(i%9A%E9%E88%DA%20%0F%DA%F3%A0Y%9EiM%A3a%40%0CI%B7%1B%05%85%24%08%245%99%90%22%91%D6H%22%D1%14%AE%05)b%8B%20x%09R%81X%A0%A9T%A4%221i%B1H)%14%A8%84%3CA%BA%D8%2F%24%83%DE%A0%A1P4wx%24%16%16%1A%07%87%07%1A%0C%0Ch%01%8E%01h%24%8E-!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05c%A0%26%8E%9A%E3%90(%99%ADY%3AF%91%C6%B6%00%80%16x%A1A%90V%D7%24%82%90%40%1A%18%07%A8J%25%D5h%90%16%0B%D7%E8%F1%D0%24%AE%09)f%8B1x%0DZ%AE%C6b%91%8A%26%13%12%85%92%92HP%87%F8%81%84%A8%23H%81%7C%40%A3Ph%04%80%02(y%1A%17%86%17%7F%82R%87%88f%23%0C%0C.!%00!%F9%04%05%00%00%1A%00%2C%01%00%01%00%10%00%10%00%00%05d%A0%26%8EZ%14%91(Y%ACE%3A.%8BF%CC%84%E68h%A2'ZUi%99%60%86d(%1AH%C2!%C9bIA%20%24%0A%C55%02%004%87%EC%81j%B5%06%BE%01%EA%60%3C%D0%7C%A9%A2F%83%A4P%A4%1E%0F%D4e~!a%EE%18%12%BD.%91h%F0y%24%0C%0C%1A%08%86%08%1A%13%13h%02%8D%02h%24%8D.!%00%3B";
	
	// General information "I" icon
	var GENERAL = "data:image/gif,GIF89a%12%00%12%00%A2%05%00%F1%F4%FA%9D%B1%DBBg%B5%00%00%00%5E%7F%C5%96%A0%96%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%12%00%12%00%00%03MX%BA%DC%BE%23%CA%07G%B88%3E%1B%88%FF%D7%D0X%1F%01%00%A5%20B%DDw%A6kA%96%B4%A7*%B3w%A20%DE%BA%BC%CFM%F6%D3%05m%AB%9C%916T%9A%8E%84!%11%F8B2%9C%CC%18N%20%A8q%B5%15%AEX%05%1EI4%94%B4%23%01%00%3B";
	
	// Error icon
	var ERROR = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%00V%CE%8EW%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%25tEXtSoftware%00Macromedia%20Fireworks%20MX%202004%87v%AC%CF%00%00%00%16tEXtCreation%20Time%0004%2F17%2F06%A3FwO%00%00%01%F8IDATx%9C%AD%94%BFK%DBQ%14%C5%3F%2FQC%86%86%B8%84D%085%88%14%A9%60%DA%A1%B48%18%D0n%1D%02%C5%C5%40p%FA%82%93%FD%03%14%22T%04%05%B1%E0%F2%DE%60%9AQJ%2CtS%3B%B4%93%05ii%A1%11%09%A9%22%B5(%14JZ%25%96o%8B%B7K%BE!I%F3c%C9%9D.%DC%F3%CE%3D%F7%BC%CBU%22B'%A2%0B%C0%18%D3%0A%E3tR%CD%00%96e%E1j%D3H%9A%E4%FFE%23%22i%F3%A8a%BD%9E%A8%5EA%F58%AA%95%C2%AE%16%9D%AB%09%DAF%3D%91%EAVJn%E7r%8C%14%0A%0B.%DBN%B9%95*%BA%B6%B7%D7%9C%FA%EB%A5%25%E9%B9%B8%20xt%B4%C0%D5U%EA%FB%F8%F8%1APDD%D0Z%A3%B5%16%AD%B5%88%08%BF%26%26f%EDPH%04%E4%3A%14%12%99%9C%9C%15%11%EC%E5%E5X)%12%11%01%F9%12%0C%CA%8BdRD%04%11%A9xT%99%D7%18%237vw%9F%FD%1D%18x%0E%A0%CE%CE%60o%2F%C5%E2b%CCmL%DA%7B%7C%0C%C0%E7%60%90%1F%A3%A3%18c%04%1A%FF%1A%00%C5%99%99'%D7%7D%7D%1F%018%3D%F537%B7%E5*%14%FA%01r%3E%1F'%D3%D35x%87%A8b%A8eY%0A%2045%F5%F3%CF%CAJ%1C(%96K%BD%0E%26S*%C5%3C%5Eo%0D%BE%DAl%E5%8C%E6%00%5C%87%87w%00%7F%BD%DAH%22%F1%C6!%A8W%E4D%C5%AB%EC%C6%86H6%9B%AE%9E%D6I%1Ee2%AC%CF%CF%D7%ECQC%8F%BA%DDn%EEmn%D2sp%E0%07x%17%080%06%23%EF%C3a%00%C2%C0%C3%D5U%1E%2B%D5%DF%8CH%01%DC%DD%DF'%BC%B3%03%C0%07%8F%87%B7%C9%24%09%ADO%D2%E7%E7%D1%AFe%E0%ADR%89%A7%F0%F2%81R~h%B0%D9%B1%7C%3E%FA%3B%9F%8F%BF%1A%1E%E6%DB%D0P%EA2%10%A0wp%10%80u%DB%FE%94V*%EE%83%E8e%19%7F%1Fn%02E%25%22%1D9%23%AAS%87%ED%1F%1AI%C5%C7%25%5B%8F%D4%00%00%00%00IEND%AEB%60%82";
	
	// dA default avatar
	var DEFAULT_AVATAR = "data:image/gif,GIF89a2%002%00%C4%00%00%7C%80%7C%9B%A0%9B%BE%C0%BE%84%88%84%93%98%93%99%9E%99%8C%90%8C~%82~%97%9C%97%80%84%80%8F%94%8F%95%9A%95%8E%92%8E%8A%8E%8A%91%96%91%86%8A%86%88%8C%88%82%86%82%7F%83%7F%87%8B%87%7D%81%7D%85%89%85%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%002%002%00%00%05%FF%A0%20%8Edi%9Ehj%02l%EB%BEp%2C%CF%ADH%DFx%CE%DAz%EF%EF%82%9F0%C7%1B%1Ac%C5%A3%12%B8l%02%92%CE!4%FA%9BR%7B%D6%2B1%A8%15f%BB%B4%2FX%26n%1D%06%8D%01%B8%DCX%04%DE%885wfx%DB%0D%DD%F2%A1%60%0F%14%06%06%06%04%83%08o%05%83%04%06i%3Ae%00u%7D%90%91%91%0B%0C%0Fas2%10%04%92%9C%9D~%0A%11H%98%2F%03%85%9C%0A%06%0F%03%AB%AB%0F%06%0E%7C%9C%04j.V%07%0C%9E%01%80%04%B1%01%0E.%9A%9D%0E%075%A3%00%07n%7D%05%C9v%B3%91%B4-%A5%9C%05%A1O%A3%C8%90%0B%09%09%91%0F%9B%7D%08%C4.%07%0E%D3%A1P%DFv%E1%2C%0A%90%08%DC%90%0C%D1%82%BD%91qI%10%CF-%F0%7D%0D%B8%F1%E9%3A%15p%00%E1%40%92z%01%16%BCh%A7%2C%01%C2%5C%04%1ATc%C2%22_%BC%17%FC%EE4%C8%95%B0%12%999%E5%20%E1q1%80%99%9D%04%A6%DCj)(x%A3HJ%3B%0A%00%EC%EA%A4%60%80%9D%81%0D%12%60%99%C3%D1S%02T%D0%7C%14%E9i%AF%928%23E%1EN%5B%A9%D3%09%0F%09%01%259%90%98g%CE%04I%94%82VmA!%16%02%05%15%8E%8E%A1%C8%E2A%03%09c%3F%A6edl%AD(%B78%1A%B9%95%BB%96nZ%BBc%F1%8E%D1%2B%07n%CB%B6~%8B%A9%18L%B8%F0%88%10%00%3B";																																																																																																																																																																																																																																																																																																												
	
// =-=-=-=-=-= V A R I A B L E S =-=
	
	var tooltipOpen = false;
	var deviantCache = new Array();
	var loadingList = '';
	var errorList = '';
	
// =-=-=-=-=-= C O M P O N E N T S =-=
	
	var tooltipDiv = document.createElement('div');
	
	var nameSpan = document.createElement('span');
	var iconImg = document.createElement('img');
	var nameH2 = document.createElement('h2');
	
	var messageImg = document.createElement('img');
	var messageSpan = document.createElement('span');
	var messageLI = document.createElement('li');
	
	var infoUL = document.createElement('ul');
	
	var avatarImg = document.createElement('img');
	
// =-=-=-=-=-= F U N C T I O N S =-=
	
	// ======= EVENT HANDLERS ===
	
	var handleMousemove = function(event)
	{
		if (event.shiftKey)
		{
			var target = event.target;
			
			// Find the first A element containing target
			// Stop if target becomes body --> there isn't an A in the chain
			while (target.nodeName.toLowerCase() != 'a' && target != document.body) target = target.parentNode;
			
			if (target.nodeName.toLowerCase() == 'a' && target.href.indexOf('.deviantart.com') > -1)
			{
				var start = 0;
				var deviant;
				var isValid = true;
				
				// If http:// is present, start looking for the devaint's name after it
				if (target.href.indexOf('://') > -1)
				{
					start = target.href.indexOf('://') + 3;
				}
				
				deviant = target.href.substring(start, target.href.indexOf('.'));
				
				for (var i = 0; i < NOT_USERNAMES.length; i++)
				{
					isValid &= (NOT_USERNAMES[i] != deviant);
				}
				
				if (isValid)
				{
					var x = event.pageX + CURSOR_BUFFER;
					var y = event.pageY + CURSOR_BUFFER;
					
					var tooltipStyle = getComputedStyle(tooltipDiv, '');
					var height = (tooltipStyle.height.substring(0, tooltipStyle.height.length - 2)) * 1;
					
					if (x + 350 > screen.width)
					{
						x -= (310 + (2 * CURSOR_BUFFER));
					}
					
					// Begin watching the users mouse movement until the time comes to hide the tooltip
					if (!tooltipOpen)
					{
						document.addEventListener('keyup', handleKeyUp, true);
						document.addEventListener('mouseout', handleMouseout, true);
					}
					
					showToolTip(x, y);
					displayMessage('loading deviant info...', 'loading', THROBBER);
					loadInformation(deviant);
					
					return true;
				}
			}
		}
		
		return false;
	};
	
	var handleKeyUp = function(event)
	{
		// When the user lets go of shift, hide the tooltip
		if ( !event.shiftKey)
		{
			hideToolTip();
			
			document.removeEventListener('keyup', handleKeyUp, true);
			document.removeEventListener('mouseout', handleMouseout, true);
			
			return true;
		};
		
		return false;
	};
	
	var handleMouseout = function(event)
	{
		hideToolTip();
		
		document.removeEventListener('keyup', handleKeyUp, true);
		document.removeEventListener('mouseout', handleMouseout, true);
		
		return true;
	};
	
	var handleLoad = function(responseDetails, deviant)
	{		
		// Remove the deviant from the loading list
		if (loadingList.indexOf(' ' + deviant + ' ') > -1)
		{			
			var start = loadingList.indexOf(' ' + deviant + ' ');
			var end = start + deviant.length + 2;
			
			loadingList = loadingList.substring(0, start) + loadingList.substring(end);
		}
		
		// If the status is not 200 OK, display an error message
		if (responseDetails.status != 200)
		{
			handleError(responseDetails, deviant);
			return;
		}
		
		var responseXML = document.createElement('div');
		
		responseXML.innerHTML = responseDetails.responseText;
		
		var userinfoLIs = responseXML.getElementsByTagName('ul')[0].getElementsByTagName('li');
		var userstatsLIs = responseXML.getElementsByTagName('ul')[1].getElementsByTagName('li');
		
		var usernameH2 = responseXML.getElementsByTagName('h2')[0];
		
		var deviantInfo = new Object();
		
		deviantInfo.username = deviant;
		deviantInfo.symbol = usernameH2.innerHTML[0];
		deviantInfo.avatar = usernameH2.parentNode.getElementsByTagName('img')[0].src;
		deviantInfo.name = usernameH2.parentNode.childNodes[4].nodeValue;
		
		for (var i = 0; i < userinfoLIs.length; i++)
		{
			var contents = userinfoLIs[i].innerHTML;
			var key = '';
			
			if (contents.indexOf('since') > -1) key = 'since';
			else if (contents.indexOf('is a') > -1 && contents.indexOf('<strong>') > -1) key = 'type';
			else if (contents.indexOf('Male') > -1 || contents.indexOf('Female') > -1) key = 'gender';
			else if ((contents.indexOf('online') > -1 || contents.indexOf('last visited') > -1) && contents.indexOf('<strong>') > -1) key = 'online';
			else if (contents.indexOf('subscribed') > -1) key = 'subscribed';
			else if (contents.indexOf('is located') > -1) key = 'location';
			else if (contents.indexOf('is currently') > -1) key = 'mood';
			else if (contents.indexOf('pageview') > -1)
			{
				key = 'pageviews';
				contents = contents.replace(/<a href=".*">(.*)<\/a>/gi, '$1');
			}
			
			if (key) deviantInfo[key] = contents;
		}
		
		for (var i = 0; i < userstatsLIs.length - 1; i++)
		{
			var contents = userstatsLIs[i].innerHTML;
			var key = '';
			
			if (contents.indexOf('Status') > -1) key = 'status';
			else if (contents.indexOf('Merits') > -1) key = 'merits';
			else if (contents.indexOf('Deviations') > -1) key = 'deviations';
			else if (contents.indexOf('scraps') > -1) key = 'scraps';
			else if (contents.indexOf('Prints') > -1) key = 'prints';
			else if (contents.indexOf('Deviation Comments') > -1) key = 'deviationcomments';
			else if (contents.indexOf('Deviant Comments') > -1) key = 'deviantcomments';
			else if (contents.indexOf('Deviant Comments Received') > -1) key = 'commentsreceived';
			else if (contents.indexOf('News Comments') > -1) key = 'newscomments';
			else if (contents.indexOf('Forum Posts') > -1) key = 'forumposts';
			else if (contents.indexOf('Journal Entries') > -1) key = 'journals';
			else if (contents.indexOf('Shouts') > -1) key = 'shouts';
			else if (contents.indexOf('Favourites') > -1) key = 'favourites';
			
			if (key) deviantInfo[key] = contents;
		}
		
		// Add the newly created deviant object to the deviant cache
		deviantCache.push(deviantInfo);
		
		displayInformation(deviantInfo);
	};
	
	var handleError = function(responseDetails, deviant)
	{
		displayMessage(deviant + ' might not exist...', 'error' + ((responseDetails) ? ' (' + responseDetails.status + ')' : ''), ERROR);
		
		if (errorList.indexOf(' ' + deviant + ' ') == -1)
		{
			errorList += ' ' + deviant + ' ';
		}
	};
	
	// ======= TOOLTIP MANIPULATORS ===
	
	var showToolTip = function(x, y)
	{
		// Make the tooltip visible
		tooltipDiv.style.visibility = 'visible';
		
		// Put the tooltip at the cursor
		tooltipDiv.style.top = y + 'px';
		tooltipDiv.style.left = x + 'px';
		
		tooltipOpen = true;
	};
	
	var hideToolTip = function()
	{
		// Make the tooltip invisible
		tooltipDiv.style.visibility = 'hidden';
		
		// Reset the cursor to the top left corner
		tooltipDiv.style.top = '0px';
		tooltipDiv.style.left = '0px';
		
		tooltipOpen = false;
	};
	
	var loadInformation = function(deviant)
	{		
		for (var i = 0; i < deviantCache.length; i++)
		{
			if (deviantCache[i].username == deviant)
			{
				displayInformation(deviantCache[i]);
				return;
			}
		}
		
		if (loadingList.indexOf(' ' + deviant + ' ') > -1)
		{
			return;
		}
		
		if (errorList.indexOf(' ' + deviant + ' ') > -1)
		{
			handleError(null, deviant);
			return;
		}
		
		loadingList += ' ' + deviant + ' ';
		
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://' + deviant + '.deviantart.com/',
			headers:
			{
				'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails)
			{
				handleLoad(responseDetails, deviant);
			},
			onerror: function(responseDetails)
			{
				handleError(responseDetails, deviant);
			}
		});
	};
	
	var displayInformation = function(deviantInfo)
	{
		var desiredInfo = DESIRED_INFO.toLowerCase().split(' ');
		
		// Clear the info list
		removeAllChildren(infoUL);
		
		nameSpan.innerHTML = deviantInfo.symbol + deviantInfo.username;
		
		avatarImg.src = deviantInfo.avatar;
		
		// Make each element of info into a list element and add it to the info list
		for (var i = 0; i < desiredInfo.length; i++)
		{
			if (deviantInfo[desiredInfo[i]])
			{
				var tempLI = document.createElement('li');
				
				tempLI.innerHTML = deviantInfo[desiredInfo[i]];
				infoUL.appendChild(tempLI);
			}
		};
	};
	
	var displayMessage = function(message, title, icon)
	{		
		nameSpan.innerHTML = title;
		
		avatarImg.src = DEFAULT_AVATAR;
		
		messageImg.src = icon;
		messageSpan.innerHTML = ((icon) ? ' ' : '') + message;
		
		// Clear the info list
		removeAllChildren(infoUL);
		
		// Add the message list element to the info list
		infoUL.appendChild(messageLI);
	};
	
	// ======= GENERAL FUNCTIONS ===
	
	var removeAllChildren = function(node)
	{
		while (node.hasChildNodes())
		{
			node.removeChild(node.firstChild);
		}
	};
	
// =-=-=-=-=-= S E T - U P =-=
	
	// ======= Build the tooltip container ===
	tooltipDiv.id = 'di-tooltip';
	tooltipDiv.name = 'di-tooltip';
	tooltipDiv.style.visibility = 'hidden';
	tooltipDiv.className = 'section';
	
	infoUL.id = 'di-info';
	infoUL.name = 'di-info';
	
	iconImg.className = 'icon';
	iconImg.src = GENERAL;
	
	nameH2.className = 'section-head';
	
	messageImg.className = 'icon';
	
	avatarImg.id = 'di-avatar';
	avatarImg.name = 'di-avatar';
	avatarImg.className = 'avatar';
	
	// ======= Add tooltip CSS styles ===
	GM_addStyle('#di-tooltip { position:absolute; z-index:999; background:#D6DBD6; border:1px solid black; ' +
				'padding:5px 5px 5px 15px; -moz-border-radius: 10px; overflow:hidden; width:300px; min-height:60px; }');
	
	GM_addStyle('#di-avatar { position:absolute; top:10px; right:10px; }');
	
	GM_addStyle('#di-info {list-style: none none; margin:0px; padding:5px 5px 5px 1em; }');
	GM_addStyle('#di-info li { list-style:circle none; margin:0px; padding:0px; }');
	
	// ======= Add the components to the tooltip container ===
	nameH2.appendChild(iconImg);
	nameH2.innerHTML += '&nbsp;';
	nameH2.appendChild(nameSpan);
	
	tooltipDiv.appendChild(nameH2);
	tooltipDiv.appendChild(infoUL);
	tooltipDiv.appendChild(avatarImg);
	
	// ======= Add the tooltip to the DOM ===
	document.body.appendChild(tooltipDiv);
	
	// ======= Add the message components to the message list element ===
	messageLI.appendChild(messageImg);
	messageLI.appendChild(messageSpan);
	
	// ======= Begin looking for the user to mouse over anything ===
	document.addEventListener('mousemove', handleMousemove, true);
})();