// ==UserScript==
// @name           HBO Forum Enhancer
// @namespace      http://scr.im/2041
// @description    Adds new features to the halo.bungie.org forums (especially in UBB mode).
// @require        http://userscripts.org/scripts/source/45988.user.js
// @include        http://carnage.bungie.org/
// @include        http://carnage.bungie.org/*
// @version		   2.1
//
// @copyright 	   2009+, Arithmomaniac (http://scr.im/2041)
// @license		   MPL 1.1+ / GPL 2.0+ / LGPL 2.1+ / CC BY-SA 3.0+ US
// @license		   GNU Lesser General Public License 2.1+; http://www.gnu.org/licenses/lgpl.html
// @license		   Mozilla Public License 1.1+ ; http://www.mozilla.org/MPL/
// @license		   GNU General Public License 2.0+; http://www.gnu.org/licenses/gpl.html
// @license		   Creative Commons Attribution-Noncommercial 3.0+ United States License; http://creativecommons.org/licenses/by-sa/3.0/us/
// ==/UserScript==

/*
VERSION HISTORY
2.1		(6/10/2011)
	-	Auto-fix not-closed tags in Guestbook
2.0		(5/8/2011)
	-	Used API for full options box
	-	Added about:config options
	-	CSS code built-in 
1.5.1	(4/28/2011)
	-	Brought proper fancy quotes to Single-Message
	-	Commented out GM_logs
1.5		(4/27/2011)
	-	Images resize to window size
	-	Title (if new) always embedded into message
	-	Cleaned up those random unbeautified colons
1.1		(03/16/2011)
	-	[Guestbook] Update archive detector
	-	Redirects root to main page
1.0		(12/22/2009)	First public release
	-	Beautify quotes
	-	[Guestbook]	Adds title-only posts as post content
	-	[Guestbook]	Permalinks
	-	[Guestbook]	Jumps to single post in thread
*/

/*
TO DO
Make images expand permanently when clicked?
Make WHSIWYG features in editor
Enable automatic "mark all as read"
*/

//Thanks to the Preferences dialog (included above)----------------

USP.theScriptName = 'HBO Forum Enhancer';
USP.init(
         {theName:'redirectRoot', theText:'Redirect carnage.bungie.org to the forum page', theDefault:true},
         {theName:'resizeImages', theText:'Auto-resize images to fit page', theDefault:true},
         {theName:'archiveRedir', theText:'(Guestbook) fix links to archived pages', theDefault:true},
         {theName:'fancyQuotes', theText:'Make quotes fancy', theDefault:true},
         {theName:'titleInsert', theText:'Insert titles (when new) into text body', theDefault:true},
         {theName:'replyRedir', theText:'(Guestbook) jump down to linked post', theDefault:true},
         {theName:'permalinks', theText:'(Guestbook) add post permalinks', theDefault:true},
		 {theName:'fixBrokenTags', theText:'(Guestbook) fix broken tags [b, i, etc.]', theDefault:true}
    );
GM_registerMenuCommand('Preferences for '+USP.theScriptName, USP.invoke);

//--------------------------------------
	
function getElementsByXPath(obj, xPathString)
{
	var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var xPathPattern = [];
	for (var i = 0; i < xPathSnapshot.snapshotLength; i++)
	{
		xPathPattern[i] = xPathSnapshot.snapshotItem(i); //convert snapshot to node
	}
	return xPathPattern;
}

//-----RedirectRoot----------------

if (GM_getValue('redirectRoot')){
	var url = window.location;
	var matchUrl = url.href.match(/http:\/\/carnage\.bungie\.org\/haloforum\/halo\.forum\.pl\?read=(\d+)(?:#m_(\d+))?/);

	if (url.href.match(/http:\/\/carnage\.bungie\.org\/?$/)) //stupid root page
	{
		url.replace('http://carnage.bungie.org/haloforum/halo.forum.pl');
	}
}
	
//-----ResizeImages----------------

if (GM_getValue('resizeImages'))
{
	function resizeImages(){
		GM_addStyle("#glob_wrapbbs img {max-width: " + (window.innerWidth - 50).toString() + "px	!important;	}");
	}
	resizeImages();
	window.addEventListener("resize", resizeImages, false);
}


if (matchUrl){

	//-------ArchiveRedir-------------
	if (GM_getValue('archiveRedir'))
	{
		if (!(getElementsByXPath (document, '//div[@class="msg_headln"]')).length) //blank
		{	//check archives
			url.replace('http://forums.bungie.org/halo/archive.pl?read=' + matchUrl[1]);
		}
	}

	var textBoxes = getElementsByXPath(document, '//div[@class="msg_text"]');
	
	//---------FancyQuotes-----------------
	if (GM_getValue('fancyQuotes'))
	{

		
		//add fancy quotes styles
		GM_addStyle('div.quotebox{ ' +
		'margin-left:   10px  !important;  margin-right:   50px  !important;  border-left-style:  solid  !important;' +
		'border-left-width:  thin  !important; padding-left:  5px  !important; }'
		)
		
		//replaces quotes with quoteboxes
		function quoteReplace(txt){
			txt = txt.replace(/\n<br>: /ig, ' ');	//		GM_log(txt);
			txt = txt.replace(/<p>: /ig, '<p> ');	//		GM_log(txt);
			txt = txt.replace(/<p>:\n<\/p>/ig, ' ');	//		GM_log(txt);
			txt = txt.replace(/\n<br>:\n?/ig, ''); //gets rid of ":" paragraphs
	//		GM_log(txt);
			return '<div class="quotebox">\n' + txt + '\n</div>';
			}
		for (var i = 0; i < textBoxes.length; i++)
		{
		//make more rational text
		
		var msgText = textBoxes[i].innerHTML.replace(/^(\s*)<br>([\s\S]+?)(?=<p>|$)/ig, '$1<p>$2</p>'); //paragraphs whole thing
	//	GM_log(msgText);
		msgText = msgText.replace(/(<(?:br|p)>: .*\n)<br>(?!:)/igm, '$1</p><p>'); //cuts off end of quotes into new paragraphs
	//	GM_log(msgText);
		msgText = msgText.replace(/(<(?:p|br)>(?!: )(?:(?!<\/p>)[\s\S])*?)<br>(?=: )/ig, '$1</p><p>'); //cuts off beginning of quotes into new paragraphs
	//	GM_log(msgText);
		msgText = msgText.replace(/(<p>:[\s\S]*?<\/p>)+/ig, quoteReplace); //cuts off beginning of quotes into new paragraphs
	//	GM_log(msgText);
		textBoxes[i].innerHTML = msgText
		
		}
	}

	if (!(getElementsByXPath(document, '//div[@id="msg_respons"]'))[0]) //guestbook
	{
		
		//------TitleInsert-------------		

		//style elements for title quotes
		GM_addStyle('.titlequote{ font-style:   normal  !important; }');
		GM_addStyle('.titlequote > strong{ font-style:   normal  !important; font-weight:   bold  !important; }');

		//when title is the intended content, add it inline
		if (GM_getValue('titleInsert'))
		{
			for (var i = 0; i < textBoxes.length; i++)
			{
					var titleText = getElementsByXPath(textBoxes[i], 'preceding-sibling::div[@class="msg_headln"]')[0].textContent.replace(/(new: )|(\*NM\*)/ig, '');
					if (!(titleText.match(/^\s*re:/i))){
						textBoxes[i].innerHTML = '\n\n<p class="titlequote">' + titleText + ' [<strong>Title</strong>]\n\n</p>' + textBoxes[i].innerHTML;
					}				
			}
		}
		
		//-------ReplyRedir------------------
		//moves URL to desired location / brings you back after text changes	
		if (GM_getValue('replyRedir'))
		{
			if (!(matchUrl[2]) && (document.anchors[0].id != 'm_'+matchUrl[1]))
			{
				window.location = url.href + '#m_' + matchUrl[1];
			}
		}
		
		//--------Permalinks----------------
		//adds permalinks to bottom of posts
		if (GM_getValue('permalinks'))
		{
			GM_addStyle('a.permalink{ font-weight: normal !important;	float: right !important} '); //style for permalinks
			var headlns = getElementsByXPath(document, '//div[@class="msg_headln"]');
			for (i = 0; i < headlns.length; i++)
			{
				headlns[i].innerHTML += '<a class="permalink" href="/haloforum/halo.forum.pl?read=' + 
				headlns[i].parentNode.firstElementChild.name.replace("m_", '') + '">Permalink</a>';
			}
		}


		//--------FixBrokenTags----------------
		//prevents brokent tags from spilling into the next post, etc.
		if (GM_getValue('fixBrokenTags'))
		{
			function pullOutOfTags (nodesToFix){ //moves all child nodes up one level
				for (i = 0; i < nodesToFix.length; i++){
					currentNode = nodesToFix[i]
					currParentNode = currentNode.parentNode
					nextNode = nodesToFix[i].nextSibling
					childNodes = currentNode.children
					numberChilds = childNodes.length
					for (i = 0; i < numberChilds; i++){
						currParentNode.insertBefore(childNodes[0], nextNode)
					}
				}
			}
			
			
			//When a tag is left unclosed, future parts of the post - and future posts - get subsumed under a giant tag. This fixes that.
			pullOutOfTags(getElementsByXPath(document, '//div[@id="msg_gbook"]/*[not(self::div)]')) //pull out whole posts
			pullOutOfTags(getElementsByXPath(document, '//div[@id="msg_gbook"]/div[@class="msg_gbmsg"]/*[not(self::div or self::a)]')) //pulls out Reply button, etc.
		}
	}
}