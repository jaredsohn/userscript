// ==UserScript==
// @name           Tumblr Rebar
// @namespace      http://sidebr.tumblr.com/
// @description    A revamped version of Tumblr Sidebr
// @version        1.2
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

/*

(C) 2012 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

About
-------
- Prereqs: Prototype.js (already used by Tumblr)

History
-------
2012-06-23 - Fixed the numbers not showing up. This could get bad.
2012-05-08 - Added the ability to remove individual navigation elements.
2012-05-05 - Created.

*/

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.setAttribute('for', 'tumblrRebar');
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function createSidebar(stats, blogURL)
{

	// Oh man that innerHTML is ugly. (From the Google Style Guide http://bit.ly/t7LiEr)
	// Wish people would start supporting the ` multilines in EMCSA 6 (http://stackoverflow.com/a/6247331)

	var container = $('rebar');
	container.innerHTML = '' +

	'            <!-- Posts -->                                                 ' +
	'        <li class="">            			                                ' +
	'            <a href="'+ blogURL + '" class="posts">                        ' +
	'                <div class="hide_overflow">Posts</div>                     ' +
	'                <span class="count">' + stats[0] + '</span>	            ' +
	'            </a>                                                           ' +
	'                    </li>                                                  ' +
	'                                                                           ' +
	'                                                                           ' +
	'            <!-- Followers -->                                             ' +
	'        <li class="">                                                      ' +
	'            <a href="'+ blogURL + '/followers" class="followers">          ' +
	'                <div class="hide_overflow">Followers</div>                 ' +
	'                <span class="count">' + stats[1] + '</span>                ' +
	'            </a>                                                           ' +
	'                    </li>                                                  ' +
	'                                                                           ' +
	'                                                                           ' +
	'            <!-- Messages -->                                              ' +
	'        <li class="">                                                      ' +
	'            <a href="'+ blogURL + '/messages" class="messages">            ' +
	'                <div class="hide_overflow">Messages</div>                  ' +
	'                <span class="count">' + stats[2] + '</span>	            ' +
	'            </a>                                                           ' +
	'                    </li>                                                  ' +
	'                                                                           ' +
	'            <!-- Drafts -->                                                ' +
	'        <li class="">                                                      ' +
	'            <a href="'+ blogURL + '/drafts" class="drafts">                ' +
	'                <div class="hide_overflow">Drafts</div>                    ' +
	'                <span class="count">' + stats[3] + '</span>	            ' +
	'            </a>                                                           ' +
	'                    </li>                                                  ' +
	'                                                                           ' +
	'                                                                           ' +
	'                    <!-- Queue -->                                         ' +
	'        <li class="">                                                      ' +
	'            <a href="'+ blogURL + '/queue" class="queue">                  ' +
	'                <div class="hide_overflow">Queue</div>                     ' +
	'                <span class="count">' + stats[4] + '</span>	            ' +
	'            </a>                                                           ' +
	'                    </li>                                                  ' +
	'';

}

function hideNav(thisEle, isNew)
{
	var hideThis;
	var hiddenElements = localStorage.rebarHidden;

	if (isNew == '1')
	{
		hideThis = '.' + thisEle;

		if (hiddenElements == null )
			hiddenElements = [hideThis];
		else
		{
			hiddenElements = JSON.parse(hiddenElements);
			hiddenElements.push(hideThis);
		}
		
		localStorage.rebarHidden = JSON.stringify(hiddenElements);
		$$(hideThis)[0].hide();
	}
	else if (isNew == '0')
	{
		if (hiddenElements != null )
		{
			hiddenElements = JSON.parse(hiddenElements);

			for (var i = 0; i < hiddenElements.length; i++)
				$$(hiddenElements[i])[0].hide();			
		}
	}
	else if (isNew == '-1') // Reset
	{
		if (hiddenElements != null )
		{
			hiddenElements = JSON.parse(hiddenElements);

			for (var i = 0; i < hiddenElements.length; i++)
				$$(hiddenElements[i])[0].show();			
		}
		delete localStorage.rebarHidden;
	}
}

function hideNavWrapper(hideEles)
{
	var hideStyle = document.createElement('style');
	hideStyle.setAttribute('type', 'text/css');
	hideStyle.setAttribute('for', 'tumblrRebar');
	hideStyle.innerHTML = '';

	for (var i = 0; i < hideEles.length; i++)
	{
		if (hideEles[i].id != 'search_form')
		{
			hideStyle.innerHTML += '' +
			'.hideTrigger' + i + ' { display: none; position: relative; float: right; width: 16px; z-index:2222; cursor: crosshair; }	\n' +
			'.hideUI' + i + ':hover .hideTrigger' + i + ' { display: block; }										\n' +
			'.hideLink { color:red; font-size: 12px; }							\n' +
			'\n';

			hideEles[i].setAttribute('class', hideEles[i].getAttribute('class') + ' hideUI' + i);

			hideCode = document.createElement('div');
			hideCode.setAttribute('class', 'hideTrigger' + i);
			hideCode.innerHTML = '<a class="hideLink" onclick="hideNav(\'hideUI' + i + '\', \'1\')">X</a>';

			hideEles[i].insertBefore(hideCode, hideEles[i].down())
		}
		else
		{
			hideEles[i].setAttribute('class', hideEles[i].getAttribute('class') + ' hideUI' + i);

			// Make help_docs search not .last
			hideEles[i].down().next(2).down().next().down().next().setAttribute('class', 'help_docs');

			// 'Remove' line = last
			hideCode = document.createElement('a');
			hideCode.setAttribute('class', 'help_docs last');
			hideCode.setAttribute('onclick', 'hideNav(\'hideUI' + i + '\', \'1\')');
			hideCode.innerHTML = '[Remove Search]';

			hideEles[i].down().next(2).down().next().appendChild(hideCode);
		}
	}

	document.head.appendChild(hideStyle);
}

function displayRebarMenu()
{
	// As long as Tumblr doesn't add more elements or things you can post, it should be fine...
	var userIcon = $('new_post').down().next(7);

	var rebarMenu = document.createElement('div');
	rebarMenu.setAttribute('class', 'user_menu_info_button');

	rebarMenu.innerHTML = '' +
	'     <div class="user_menu_info"></div>                                                            ' +
	'                                                                                                   ' +
	'     <div class="user_menu popover" id="" style="display: none; ">                                 ' +
	'         <div class="user_menu_nipple"></div>                                                      ' +
	'         <div class="user_menu_list">                                                              ' +
	'             <a onclick="detachSideWrapper(false)" style="cursor: pointer">                        ' +
	'                 <div class="user_menu_list_item"><span class="user_menu_icon ask"></span>         ' +
	'                  Detach                                                                           ' +
	'                 </div>                                                                            ' +
	'             </a>                                                                                  ' +
	'             <a onclick="hideNav(\' \', \'-1\')" style="cursor: pointer">                          ' +
	'                 <div class="user_menu_list_item"><span class="user_menu_icon unfollow"></span>    ' +
	'                  Reset                                                                            ' +
	'                 </div>                                                                            ' +
	'             </a>                                                                                  ' +
	'             <a href="http://sidebr.tumblr.com/" target="_new">                                    ' +
	'                 <div class="user_menu_list_item"><span class="user_menu_icon fan_mail"></span>    ' +
	'                  Rebar                                                                            ' +
	'                 </div>                                                                            ' +
	'             </a>                                                                                  ' +
	'         </div>                                                                                    ' +
	'     </div>                                                                                        ' +
	'';

	userIcon.appendChild(rebarMenu);

}

function detachSide(active)
{
	var detachCode = 'display:block;position:fixed;margin-left:646px;top:91px;width:215px';

	if (active)
		$('right_column').setAttribute('style', detachCode);
	else
		$('right_column').setAttribute('style','');

/*
	if (active) // Temporary to have a smoother detach experience
	{
		$$('#recommended_tumblelogs', '.small_links', '#tumblr_radar').invoke('hide');
		$('right_column').setAttribute('style', detachCode);
	}
	else
	{
		$$('#recommended_tumblelogs', '.small_links', '#tumblr_radar').invoke('show');
		$('right_column').setAttribute('style','');
	}
*/
}

function detachSideWrapper(checkOnly)
{
	var detachVal = localStorage.rebarDetach;

	switch(detachVal)
	{
		// Detached
		case '1':
			if (checkOnly)
				detachSide(true);
			else
			{
				detachSide(false);
				delete localStorage.rebarDetach;
			}

			break;
		case '0':
		default:
			if (checkOnly)
				detachSide(false);
			else
			{
				detachSide(true);
				localStorage.rebarDetach = '1';
			}
	}
		
}

function parseForSidebar(responseText, blogURL)
{
	var allElements;
	var eleCount = 0;
	var navValues = [];
	var container = document.createElement('div');
	
	container.innerHTML = responseText;
	allElements = container.getElementsByTagName('div');

	while (allElements[eleCount].id != "right_column")
		eleCount++; // Cleaner way? Iterate through all IDs?

	for (var i = 0; i < 5; i++)
	{
		var navNum = allElements[eleCount].getElementsByTagName('ul')[2].getElementsByTagName('li')[i].getElementsByTagName('span')[0];
		if (typeof navNum !== 'undefined') 
			navValues.push(navNum.innerHTML);
		else
			navValues.push('');
	}

	createSidebar(navValues, blogURL);
}

function mainRebar()
{
	var blogURL = $('user_channels').down().down().href;

	var blogStatsURL = blogURL + '/followers/';

	var rebar = document.createElement('ul');
	rebar.setAttribute('id', 'rebar');
	rebar.setAttribute('class', 'controls_section');

	var rc = $('right_column');
	rc.insertBefore(rebar, rc.getElementsByTagName('ul')[1]);

	createSidebar(['','','','',''], blogURL);

	detachSideWrapper(true);
	displayRebarMenu();

	hideNavWrapper(rc.childElements());
	hideNav('', '0');


	new Ajax.Request(blogStatsURL, 
	{
		onSuccess: function(response) 
	  	{
	    	parseForSidebar(response.responseText, blogURL);
	  	}
	});
}

embedElement('script', hideNav, false);
embedElement('script', hideNavWrapper, false);
embedElement('script', displayRebarMenu, false);
embedElement('script', detachSide, false);
embedElement('script', detachSideWrapper, false);
embedElement('script', createSidebar, false);
embedElement('script', parseForSidebar, false);
embedElement('script', mainRebar, true);
