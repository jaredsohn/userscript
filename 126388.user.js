// ==UserScript==
// @name           Is A Follower 
// @namespace      http://swapped.cc
// @description    Adds an indicator to the user's profile on Dribbble to show if he/she is folowing you
// @include        http://dribbble.com/*
// @include        http://www.dribbble.com/*
// @require        http://code.jquery.com/jquery-1.5.2.min.js
// @require        https://raw.github.com/apankrat/assorted/master/javascript/dribbble/misc/gm-xhr.js
// @require        https://raw.github.com/apankrat/assorted/master/javascript/dribbble/misc/jquery.tipsy-1.0.0a.js
// ==/UserScript==

(function(){

	/*************************************************************
	 *                                                           *
	 *                     greasemonkey glue                     *
	 *                                                           *
	 *************************************************************/
	$.ajaxSetup({ xhr: function(){ return new GM_XHR; } });

	var ajaxDataType = 'json';

	/*************************************************************
	 *                                                           *
	 *                   "portable" javascript                   *
	 *                                                           *
	 *************************************************************/

	/*
	 *	restore the blunt end of the Follow/Unfollow button 
	 *	after it was clicked and the click was processed
	 */
	function restoreBorderRadius()
	{
		var link = $('.follow-prompt a');
		var label = link.find('span').html();

		if (label == '' || label == 'Wait...' || label == linkLabel)
		{
			setTimeout(restoreBorderRadius, 100);
			return;
		}

		linkLabel = label;
		link.css({ borderRadius: '6px 0px 0px 6px' });
	}

	/*
	 *	add Follower status, cache the Follow/Unfollow button label
	 */
	var linkLabel;
	var statusDiv;

	function addFollowerStatus()
	{
		var link = $('div.full .follow-prompt a');
		var info = link.parent().parent();

		info.after('<div>&nbsp;</div>');
		statusDiv = info.next();

		statusDiv.css({
			float: 'left',
			backgroundPosition: '50% 50%, 0 50%',
			backgroundRepeat: 'no-repeat, repeat-x',
			borderRadius: '0 6px 6px 0',
			margin: '5px 7px 0 -3px',
			padding: '7px 0',
			width: '30px'
		}).tipsy({ html: true, fade: true, title: 'status' });

		link.css({ borderRadius: '6px 0px 0px 6px' });

		linkLabel = link.find('span').html();

		$('.follow-prompt a').live('click', function(){ setTimeout(restoreBorderRadius, 100); });
	}

	/*
	 *	'p' = processing (ajax in progress)
	 *	'-' = not following
	 *	'+' = following
	 *	'e' = some sort of error
	 */
	function setFollowerStatus(status, progress)
	{
		if (! statusDiv)
			addFollowerStatus();

console.log('setting follower status to ' + status + ' ' + (progress ? progress : ''));

		var tooltip;
		var bgColor;
		var bgImage;
		var tipsy = $(document).find('.tipsy-inner');
 
		switch (status)
		{
		case 'p': 
			tooltip = 'Checking if this player<br>is following you...<br>' + progress;
			bgColor = 'white';
			bgImage = 'url("/images/processing.gif")';
			break;
		case 'e':
			tooltip = 'Unable to check if this player is following you';
			bgColor = '#D3D3D3';
			bgImage = 
			'url("https://github.com/apankrat/assorted/raw/master/javascript/dribbble/misc/cross-sign.png"), url("/images/glass-30.png")';
			break;
		case '-':
			tooltip = 'This player is <i>not</i><br>following you';
			bgColor = '#D3D3D3';
			bgImage =
			'url("https://github.com/apankrat/assorted/raw/master/javascript/dribbble/misc/minus-sign.png"), url("/images/glass-30.png")';
			break;
		case '+':
			tooltip = 'This player <i>is</i> following you';
			bgColor = '#8ABA56';
			bgImage = 'url("/images/icon-check-sm.png"), url("/images/glass-light.png")';
			break;
		}

		statusDiv.attr('status', tooltip);
		statusDiv.css({
			backgroundColor: bgColor,
			backgroundImage: bgImage,
		});     

		/*
		 *	deal with the tooltip if it's visible
		 */
		if (tipsy.length)
		{
			switch (status)
			{
			case 'p': 
				tipsy.html(tooltip); 
				break;
			case 'e':
			case '-':
			case '+': 
				statusDiv.tipsy('hide');
				statusDiv.tipsy('show'); 
				break;
			}
		}
	}

	/*
	 *
	 */
	var followers = null;

	function checkFollowerStatus()
	{
		var i;
		for (i=0; i<followers.length; i++)
			if (followers[i] == username)
				break;

		setFollowerStatus( (i < followers.length) ? '+' : '-' );
	}

	/*
	 *
	 */
	var apiCalls = 0;
	var nextCall;

	function realAjaxCall(url, cb)
	{
		$.ajax({
			url:      url,
			dataType: ajaxDataType,
			success:  cb,
			error:    function(){ setFollowerStatus('e'); }
		});
	}

	function makeAjaxCall(url, cb)
	{
		var now = +new Date();
		var noSooner = nextCall;

		/*
		 *	make first 30 calls back to back,
		 *	make next 30 calls at least 500 ms apart,
		 *	space the rest in 1 second intervals
		 */
		apiCalls++;
		nextCall = now + ((apiCalls < 30) ? 0 :
				 ((apiCalls < 60) ? 500 : 1000));

		if (now < noSooner)
		{
console.log('delaying ajax call by ' + (noSooner - now) + 'ms');
			setTimeout(function(){ realAjaxCall(url, cb); }, noSooner - now);
		}
		else
		{
			realAjaxCall(url, cb);
		}
	}

	/*
	 *
	 */
	var newList;
	var attempts = 0;

	function processFollowersPage(info)
	{
console.log('processing followers page ' + info.page + ' out of ' + info.pages);
console.log(info);

		if (info.total != newList.length)
		{
console.log('followers list appears to have changed, new size = ' + info.total);
			/*
			 *	followers list changed while we were reading it
			 *	-> start again
			 */
			newList = null;
			if (attempts++ < 2)
			{
				updateFollowersList(info.total);
				return;	
			}

			setFollowerStatus('e');
			return;
		}

		var first = (info.page - 1)* info.per_page;

		for (var i=0; i<info.players.length; i++)
		{
			var uname = info.players[i].username;
			var index = newList.length - first - i - 1;

			if (index < followers.length &&
			    newList[index] == uname)
			{
console.log('follower at index ' + index + ' is the same as before, done');
				/*
				 *	this is it, the rest of the list [0..index] is the same
				 */
				break;
			}

			newList[index] = uname;		
		}

		if (i < info.players.length ||
		    info.page == info.pages)
		{
console.log('saving the list');
			followers = newList;
			localStorage.setItem('followers', JSON.stringify(followers));
			localStorage.setItem('followers_mtime', + new Date());
			checkFollowerStatus();
			return;
		}

		/*
		 *
		 */
		fetchFollowersPage(info.page+1, info.pages);
	}

	function fetchFollowersPage(pageNumber, pagesExpected)
	{
console.log('fetching page ' + pageNumber + ' out of ' + pagesExpected);

		setFollowerStatus('p', Math.round(100*pageNumber/(pagesExpected+1)) + '% done');

		makeAjaxCall('http://api.dribbble.com/players/' + myname + '/followers?per_page=30&page=' + pageNumber,
			     processFollowersPage );
	}

	function updateFollowersList(newListSize)
	{
console.log('updating followers list...');

		newList = followers.slice(0, newListSize);
		if (newList.length < newListSize)
				newList[newListSize-1] = null;

		fetchFollowersPage(1, Math.round(newListSize/30+1));
	}

	function processOwnInfo(info)
	{
console.log(info);
		
		var followersNow  = info.followers_count;
		var followersWhen = localStorage.getItem('followers_mtime');

console.log('followers now = ' + followersNow + ', was = ' + followers.length);

		if ( followersNow != followers.length ||
		     followersWhen && (followersWhen + 24*60*60*1000 < + new Date()) )
		{
			setFollowerStatus('p');
			updateFollowersList(followersNow);
			return;	
		}

		checkFollowerStatus();
	}


	/*************************************************************
	 *                                                           *
	 *                  execution starts here                    *
	 *                                                           *
	 *************************************************************/

	var username;
	var myname;

	function main(argc, argv)
	{

		/*
		 *	don't bother with older browsers
		 */
		if (typeof(window.localStorage) == 'undefined')
			return;

		/*
		 *	see if it's a user's profile page, extract the username
		 */
		var re = /^\/([^\/]+)\/?$/;
		username = re.exec(window.location.pathname);
		if (!username || username.length != 2)
			return;

		username = username[1];

		if ($('div.full img.photo').length != 1)
			return;

		/*
		 *	check we are logged in
		 */
		if ($('#header #t-signin').length > 0)
			return;

		/*
		 *	fetch our own username
		 */
		myname = $('#header #nav li a');
		if (myname.length < 1)
			return;

		myname = myname.attr('href').substr(1);

		/*
		 *	ignore our own profile page
		 */
		if (myname == username)
			return;

		/*
		 *	load cached version of the Followers list
		 */
		followers = localStorage.getItem('followers');
		if (followers)
		{
			try { followers = JSON.parse(followers); } 
			catch(x) { followers = null; }
		}
		followers = followers || new Array();

		/*
		 *	oki-doki, initiate the callback gallore by checking
		 *	if we need to refresh our copy of the Followers list
		 */
		makeAjaxCall('http://api.dribbble.com/players/' + myname, processOwnInfo);
	}

	main();

})();
