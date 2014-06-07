// ==UserScript==
// @name Shack-lol (Opera)
// @namespace http://www.lmnopc.com/greasemonkey/
// @description Adds [lol] links to posts
// @include http://*.shacknews.com/laryn.x?*
// @include http://shacknews.com/laryn.x?*
// @include http://*.shacknews.com/frame_laryn.x?*
// @include http://shacknews.com/frame_laryn.x?*
// @include http://*.shacknews.com/profile.x?*
// @include http://shacknews.com/profile.x?*
// ==/UserScript==
/*

	MODIFIED version for Opera
	2007-09-06 - kne
		* Initial release
		* Not pretty. LOL buttons are basic links
	
	2007-09-05 - ThomW
		- Added iframe to make [lol]s a little more transparent 
	
	*************************************************************


	Amazon Wish List: http://amazon.com/gp/registry/1YRBQ22VGN9PR

	------------------------------------------------------------

	Shack [lol]
	Author: Thom Wetzel - www.lmnopc.com
	(C)2007 Thom Wetzel

	REVISIONS:

	2007-01-26
		- Initial Release

	2007-02-18
		* Added [LOL'd] link to the top of the comments

	2007-02-26
		* [LOL'd] links now turn into links to www.lmnopc.com/shacklol/

	2007-03-13
		* Slight speed increase
			1) got rid of AddGlobalStyle()
		 	2) stripped down GetElementsByClassName down to the essentials
		* Changed where LOL'd page link is added to the DOM and absolutely
			positioned it under the Latest Chatty Thread link to make it
			easy to find.  It avoids the ugliness of forcing the whole page
			down after it loads.

	2007-03-24
		* Added link to [lol] user profile to shack profile pages

	2007-06-14
		* Updated for Shack 2007

*/

(function() {

	var myDomain = 'lmnopc.com';
	// grab start time of script
	var benchmarkTimer = null;
	var scriptStartTime = getTime();
	var http_request=false;

	/* UTILITY FUNCTIONS
	*/
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	var userName = findUsername();

	function parseQueryString()
	{
		// Return object with query string variables.
		// from http://www.ektron.com/developers/ewebeditprokb.cfm?id=365
		var objQuery = new Object();
		var strQuery = location.search.substring(1);
		var aryQuery = strQuery.split("&");
		var pair = [];
		for (var i = 0; i < aryQuery.length; i++)
		{
			pair = aryQuery[i].split("=");
			if (pair.length == 2)
			{
				objQuery[unescape(pair[0])] = unescape(pair[1]);
			}
		}
		return objQuery;
	}

	function findUsername()
	{
		return getElementByClassName(document.getElementById('masthead'), 'a', 'username').innerHTML; 
	}

	// ThomW: I took getElementsByClassName and stripped it down to just what's needed by this script
	function getElementByClassName(oElm, strTagName, strClassName)
	{
		var arrElements = oElm.getElementsByTagName(strTagName);
		var oElement;
		for(var i=0; i < arrElements.length; i++)
		{
			oElement = arrElements[i];
			if (oElement.className.indexOf(strClassName) == 0)
			{
				return oElement;
			}
		}
	}

	function GM_log(str) { alert("LOL GM_log: " + str); } //remove
	
	// shackLol functions
	function installLolButton(threadId)
	{
		var dbg = false;

		var unsafeWindow=window; //OPERA

		// this makes the script run on the right document when called from the iframe
		if (unsafeWindow != unsafeWindow.top)
		{
			document = unsafeWindow.top.document;
		}
		
		// make sure this lol button doesn't already exist
		if (document.getElementById('lol' + threadId))
		{
			GM_log('lol' + threadId + ' already exists');
			return true;
		}

		// find threadId
		var t = document.getElementById('item_' + threadId);
		if (!t)
		{
			if (dbg) { GM_log('COULD NOT FIND root_' + threadId); }
			return false;
		}

		// find div.postmeta
		var pm = getElementByClassName(t, 'span', 'author');
		if (!pm)
		{
			if (dbg) { GM_log('getElementsByClassName could not locate span.author'); }
			return false;
		}

		// create [lol] button
		var d = document.createElement('div');
		d.style.display = 'inline';
		d.style.float = 'none';
		d.style.paddingLeft = '10px';
		d.style.fontSize = '14px';

		// [
		d.appendChild(document.createTextNode('['));

		// lol
		var a = document.createElement('a');
		a.id = 'lol' + threadId;
		a.style.cursor = 'pointer';
		a.style.color = '#f80';
		a.style.padding = '0 0.25em';
		a.style.textDecoration = 'underline';
		a.appendChild(document.createTextNode('lol'));
		//a.addEventListener('click', reportThread, true);
		//a.href="javascript:reportThread(" + threadId + ");";
		a.href = 'http://' + myDomain + '/greasemonkey/shacklol/report.php?who=' + userName + '&what=' + threadId;
		a.target="lol-frame";
		d.appendChild(a);

		// ]
		d.appendChild(document.createTextNode(']'));

		//d.addEventListener('click', reportThread, true);
		// add d to pm
		pm.appendChild(d);
	}

	/* MAIN
	*/

	//OPERA
	var unsafeWindow=window;

	// this is the profile page
	if (String(location.href).indexOf('profile.x?person') != -1)
	{

		// read the query string
		var qs = parseQueryString();

		// create the link
		var smLink = document.createElement('a');
		smLink.style.color = 'white';
		smLink.innerHTML = '[<span style="color: orange; font-size: inherit; font-weight: bold; margin: 0; padding: 0 4px;">lol</span>]';
		smLink.setAttribute('href', 'http://' + myDomain + '/greasemonkey/shacklol/user.php?authoredby=' + escape(qs['person']));
		smLink.setAttribute('target', '_blank');

		document.getElementsByTagName('h1')[1].appendChild(smLink);
	}

	// handle iframe calls
	else if (String(location.href).indexOf('frame_laryn.x') != -1)
	{
		// override standard show_item_fullpost with one that supports this script
		if (!unsafeWindow.shacklol_show_item_fullpost)
		{
			unsafeWindow.shacklol_show_item_fullpost = unsafeWindow.show_item_fullpost;
			unsafeWindow.show_item_fullpost = function(root_id, article_id, fullpost_element)
			{
				// call original function
				unsafeWindow.shacklol_show_item_fullpost(root_id, article_id, fullpost_element);

				// embed videos in updated parent unsafeWindow
				installLolButton(article_id);
			}
		}
		
		// override function used for Refresh Thread button
		if (!unsafeWindow.shacklol_replace_whole_element_from_iframe)
		{
			unsafeWindow.shacklol_replace_whole_element_from_iframe = unsafeWindow.replace_whole_element_from_iframe;
			unsafeWindow.replace_whole_element_from_iframe = function(id)
			{
				// call the original function
				unsafeWindow.shacklol_replace_whole_element_from_iframe(id);

				// find all the fullposts and add lol buttons
				var items = document.evaluate("//div[contains(@class, 'fullpost')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (item = null, i = 0; item = items.snapshotItem(i); i++)
				{
					var threadId = item.id.substr(5);
					installLolButton(threadId);
				}
			}
		}
	}

	// all other pages
	else
	{
		if (!unsafeWindow.shacklol_show_item_fullpost)
		{
			// override standard show_item_fullpost with one that supports this script
			unsafeWindow.shacklol_show_item_fullpost = unsafeWindow.show_item_fullpost;
			unsafeWindow.show_item_fullpost = function(root_id, article_id, fullpost_element)
			{
				// call original function
				unsafeWindow.shacklol_show_item_fullpost(root_id, article_id, fullpost_element);

				installLolButton(article_id);
			}
		}
		
		// add iframe to the page 
		var iframe = document.createElement('iframe');
		iframe.setAttribute('name', 'lol-frame');
		iframe.setAttribute('id', 'lol-frame');
		//iframe.setAttribute('onload', 'alert(document.body.innerHTML);');
		iframe.style.display = 'none';
		document.getElementsByTagName('body')[0].appendChild(iframe); 		

		// find all the fullposts on the page
		var items = document.evaluate("//div[contains(@class, 'fullpost')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (item = null, i = 0; item = items.snapshotItem(i); i++)
		{
			var threadId = item.id.substr(5);
			installLolButton(threadId);
		}

		// add link to lol'd above the comments
		var divLol = document.createElement('a');
		divLol.setAttribute('id', 'lol-link');
		divLol.style.display = 'block';
		divLol.style.width = '190px';
		divLol.style.height = '45px';
		divLol.style.position = 'absolute';
		divLol.style.left = 'auto';
		divLol.style.right = '0';
		divLol.style.top = '12px';
		divLol.style.background = '#000 url(data:image/gif;base64,R0lGODlhvgAtAPcAAAAAAAsGFhkAABIFGBcUGA4OJxAOJxgXJRocMx0iPDkBAiENJyMaJigcMTAdKzEfMSYiKCcmOC4yNjMpLjQpODYzOikoRCwwSC4yUjQtRTUzSTk4VTw9YztBWFMAAFIcK0MhKkEnNlchL1gqOVgwPn0AAHUUPmUnN3AhNUkuQkg2SkQ8WVA9WEg9YFU8YmQ1SHknRHI4XUpASkhDWkBSXFVETVpEV1hXW0dHZkdLcExRbUtTc1ZKZ1xOclhWalRZeFhhd2lBS2BIXGRRXnpGWWlLaGJPcWpSbGdUcnVEbHNVa3Vad2xub2dke3Brbn9hcnFzc05ZgFZcgkpqlFlihltok2Neh2VniWNskmlzjGd0mnloh3Fvlnd5iHd4mWp8pGZ6tXJ9o3aCmmyBpmyDtnSEqXmJtHWVrXqVv16F0naQxnKY43uy95gAAIMUO7oAAJUaR4wlSYQ3S4s0VZ44TbkdTKwqWKg7VLMrXLY8U7w%2BYYZCWIJJbYRUZ4JceJZMZ5dUaZ9cd4pmeIR3fJFofKpEXL5CXatVbq1qe9UAAP0AAOQ2bMRHYchHcshYaspZdtBBcNRaecxjeNdned1wfOpJe%2BFqf%2BFxfpFvioN8oapyjKN%2Bq8tsmsB1icp1l9xrhdxnlttxh9B0nO5Whu5tmut7iel8k%2FNlj%2FlkmPhzmPh1qZSPk4aIqYGJt4mRq4eVuJmXp5KctoCjuZuhva%2BCl7KOqKysrKGluLOzs4Wayo6jyIai2ZWlzZSp1ZKzwZ6x1Yyw6qucyqOpx66q2qq0yai427ukybC40qq345LM%2FKPL%2FK3W97bH57fQ67Ta%2FqLk%2F8yAi8iFk9WJlNiTncKNqMeUp8qbttaKo9eYp9WYss2kuNekueqGnuGSmfeImeabpfKPov6Nsf2YqPWWu%2ByotsWew9SxysG54%2F%2BWwOS2y%2Bu40fKpyfe0xPG92svLy8PH2MvT2tHGzNvC2dTX18zS8M%2Fp%2FOvAz%2BvG2PnH2PrT3fjU6OLk6e3w%2BPzg6%2F3o9%2F7%2B%2FiwAAAAAvgAtAAAI%2FgABCBxIsKBBgzUwHVzIsKHDhxAjSpxIsaJFi5qoybjIsaPHjyBDfoQwQdu2GiJTqlzJsiVDQu3UQXBJs6bNmw4JUFOIs6fPnykHmasAtKjRow8h3NOGtKlTjgGUqIAa756gp1izPpyAiRaBmRVX5UvHQGKAPqJUgQpUI4DWtzSHaMpGLUVOtwX73bv3r6%2Ffv4D%2F9VN1ClUqVKrQ6QvMuLHjx5AjS55MubJlAE%2FMWZvQsMIWGWAFMvGXzp9ldaIWqUJVCVW4fJZjy55Nu%2FZsAAEIEdJU9qCM3YSM9A6wLF21igGckCBVaVSlU%2BPwwp3use%2FAIbXSrdpIkMARbNdo%2FrmgINAXm2CEkK8bhxjVqFSpCFCfz9H6wBrZ9dWSDsEFJk2a0EKULGyskQt3EVUARRe0jOKcg5UsUsNV9FUokX0DTSAINfcMNRAEmgQSSCcynJHMGmmoEQFEAUABTz3O%2FBLMKHjAAYcdjeSoh3QW9rgQhgMFYAM19uijCw0z2RBDDIgEw0YybKSxwUI3rIKLO7ZAMA%2BMyigDTCubQFIHHG6YYIIbcfio5o%2F%2FLARiNcM8CQwaggSiCTBPJrPLAQRIoEEHG2gQgQ%2F8%2FLUPl8kAA8wurZiBCR9zxOGGGw6k5IEHC5VQggAQCVDCG2%2B0gelCHpSggEOackqQp5q2qupB%2Fp6%2BahGQBTGw2xpsyOkFGooC08srrGSCBRZXWGHFFVdgwQUrwsBDjzPLeKnoLrvkgoYZZZTByiYicQoqALIKpIgipzrkwbjoKpJIuAK9oUgJDo1b7kAKpIsuvAYJUK8C7F7YJkMEGAFGGmwAswmAhPDhggs8HPGHCz34scTESyhxRAsc4CCFFrksSu3Hu%2FSSSy671LNKSCUkAmoi%2BBIkr0P1quuBAimre5C7LS%2F0MkExt5rIuKMOJIAibRCtSL8Q0XpQBwMXjEwxxmwixQ89IOFJElvUovUmtPiBRAsbWCD2BjtwDHLIY7TCDDP03CCBfB3RPG4b8w60M0M%2Fv8Hz%2Ft0D4eyQu%2BHGTJC7iRTkKeGbXqT0QQeQgWsykD8DeTLFXEONJvJkrrk5XIQttgUX5GDGyCTnQoYuxfzyCz3vsC6BR28kovJBfOdbu98F4c5QqQYJTu%2B4gSfSRiJ1U7T4QTMgA8zkzzSfjDLljGPMP%2F70o08%2F%2FvgjjBcdgI4BDjtUocsvIveCBi%2BtfDEGsA3wCEQWREkkwBsKKPAGu7UX5DtBJSiid%2B7vssj%2BxEWugnigDQAQVX3%2B9ZBA7OMc9KAHjJyXDH1wYhim6Ys%2FqFGLTLjiChjAAAdyEAXx8YIXutBFtr6ghWFd4QAF0cUrvBA%2FkORvb4owSP%2F%2BN7gAVmSA%2FgC44UeOVxACkIN61dNHOnK1qHVgIhjfsEY5NHMNRPAACF74AQ5IWAUwkEENuZChFrRQBi1Q4Yy9GYgGmtAFIIhEiAKJWbiKxsO%2B%2BZAiAxxaAVdCRIKEIB%2FZ6ws%2BTFEFMnjBGJ7IxCzIkY1qUIMa0YAGITbQA1f8YAdUKKQaNmktLajvB2eUQhoHIgEsSOGNe8TbHcH1s5y1a5USGeC5csiSPg5kBPoI5D%2FYEYoeeMEL2TiEFLxQjWhU45jTgAYtWIADVriCClKowhc2qYZe7MIMWmjGFKqABSDAsCBieMUPUFk8gxSNeAKZn7rYpbuJ7E8BP0NgLRnYkBFkD3v%2F%2FgCHJJCwhSNwoxBe0AIXmkALbERyGtPABA5%2BgEUshMEMaKDmyHpBjGNUAVgG8UEuzNABVNqLlqv6mbpiB7SbfTSVDYmZvdbVElsKRAT4uKc%2FQnEIFdhACDSVQhay4AVpTIMc5JiGNKLBAx%2F8QApScGgYxlCGMXiyhVjQgi54UUMJiEENaKjCN214UlgVDV2JCBoAP1rOg6h0XMJDGkhcCoAPoKMf1MPHHkZwgAYI4hGH2IEUqMAFoJIjH%2BToBjYwMQOj%2FuCwiL3kDnSQgx1gwQxg3GguNokGLFgAKfVT65oAwNYTiIMd1GvHAgYQgAEgwhGA2MFRqZCNb0zjG67t%2FoYmWMCDH%2FhABzrAgW5bsIINhDAHGxsZNa9FhQtstkJslYM4xIEPdpBjtANQgCQeAYjEbgEf5PCpNKShCSGogAc8wAFve4uBC2jAAhvAQQmzZQYzfAELOFjRcenD1kJ8YrnLhe4JHEGJ6iJ2B1sQRCew8Q1sYEMQNlDBBhYcKA1oYAMt6AACMtCBxu5gBznoQATgNt%2F5uHQAk4iEN7yxXAoMYAB%2FcMQk%2BqBaxeY2GunQhz46oQlE9CEED4iABi4gNvOuQAUOOAADGoAABByARx2mjktBwI5PmILE4uiDCohgiFJIogg6uPBiF0sIfPTDHuTABiBSkIIRmPkBCEiA%2Fo7Ti6Akq8mlI8DHNbgBZW%2BY4hKMsIQjXJCDLF9YCsgqQjSwsY0i5CAHHEhBEF5A2gAYYAYB0EAD3LxZts5BDi8Q8YhLQQlH5IEOLdAt%2BPYahjBQwQ%2Fa2AIWqnBGKsQCFg0wQAEMgIN9FMo2uM61rncdGYkA4QiPMEUpSjEJFaMAwroFJRWwUAYpMFV9Tf0CPN5hgQgcIM1duMWtec3tbns7NhGRQCyugARASGISjLgDDDQQ6mTvddllaEUZsABNT86iCRGIgAESsAFYwMIHlA74QgIQTiow1AcJXsEK2h3qo%2B61CmWoQhQwzAFQ7iAFGz6ABTRAAQggWeABPwAvjcxgyh344OThHS%2BDF%2BrwS%2BYABxjY%2BA9WoAG3CJnDIM85AIjBDDP%2BIActmEHKe%2BvgC0QAvbjNLQ5oboGy6HiUOo86AGIx7ygAvbwamAHRM5CBfOc7AzMAW6Ai8HGpmx0HZ8ztBngcAQhEgAIZcLAGMkCBCDBAPgTgk9n3bhAJFBYHgar2VvlO%2BMIbPiQBAQA7) 50% 50% no-repeat';
		divLol.style.textIndent = '-9999px';
		divLol.style.color = '#f00';
		divLol.setAttribute('href', 'http://' + myDomain + '/greasemonkey/shacklol/');
		divLol.setAttribute('title', 'Check out what got the [lol]s');
		divLol.innerHTML = '[ L O L ` d]';
		getElementByClassName(document, 'div', 'commentstools').appendChild(divLol);
	}

	// log execution time
	if (GM_log)
	{
	//	GM_log((getTime() - scriptStartTime) + 'ms');
	}

})();
