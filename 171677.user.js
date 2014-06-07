// ==UserScript==
// @author              epost72
// @name		Flashback Ultimate superignore
// @namespace		flashback_ultimate_superignore
// @description	        Ignorera användare/moderatorer på Flashback. Gömmer deras inlägg, trådar och även inlägg där idioterna citeras. Öppna about:config och sök efter flashback_ignore. Där finns inställningarna.
// @include			https://www.flashback.org*
// @include			https://www.flashback.org/f*
// @include			https://www.flashback.org/p*
// @include			https://www.flashback.org/showthread*
// @require			http://code.jquery.com/jquery-1.3.2.min.js
// @tags				flashback,flashback.info,ignore,jquery
// ==/UserScript==
// ------------------------------------------------------------------------------------var users = GM_getValue('users', 'Babianen,Ruskibus').split(',');

var inThread = false;
var inForum = false;

if (window.location.pathname.indexOf('/t') !== -1)
	inThread = true;
if (window.location.pathname.indexOf('/showthread') !== -1)
	inThread = true;
if (window.location.pathname.indexOf('/f') !== -1)
	inForum = true;

if (inThread)
{
	// Remove posts written by the user
	var ignoredPosts = 0;
	var ignorePosts = GM_getValue('ignorePosts', true);
	if (ignorePosts)
	{
		$("a.bigusername").each(function(index,value){
			$.each(users, function(userIndex, userValue){
				if ($(value).text().indexOf(userValue) !== -1)
				{
					$(value).parent().parent().parent().parent().hide();
					ignoredPosts++;
				}
			});			
		});
	}
	GM_setValue('ignorePosts', ignorePosts);
	
	// Remove posts that have quoted the user.
	var ignoredQuotes = 0;
	var ignoreQuotes = GM_getValue('ignoreQuotes', true);
	if (ignoreQuotes)
	{
		$(".post-quote strong").each(function(index,value){
			$.each(users, function(userIndex, userValue){
				if ($(value).text().indexOf(userValue) !== -1)
				{
					$(value).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().hide();
					ignoredQuotes++;
				}
			});			
		});
	}
	GM_setValue('ignoreQuotes', ignoreQuotes);

	document.title = document.title + " (" + ignoredPosts + "+" + ignoredQuotes + " ignorerade inlägg)";
}

// Remove threads started by the user.
if (inForum)
{
	var ignored = 0;
	var ignoreThreads = GM_getValue('ignoreThreads', true);
	if (ignoreThreads)
	{
		$(".alt1 .smallfont span").each(function(index,value){
			$.each(users, function(userIndex, userValue){
				if ($(value).text().indexOf(userValue) !== -1)
				{
					$(value).parent().parent().parent().hide();
					ignored++;
				}
			});			
		});
	}
	GM_setValue('ignoreThreads', ignoreThreads);
	document.title = document.title + " (" + ignored + " ignorerade trådar)";
}

// Save (create) the value.
if (users.length == 2)
{
	GM_setValue('users', GM_getValue('users', 'Babianen,Ruskibus'));
}