// zzyzx.xyzzy@gmail.com

// zzyzx_xyzzy (OKCupid)

// zzyzx_xyzzy@userscripts.org

// zzyzx.xyzzy.googlepages.com/okcupidhacks

//

// ==UserScript==

// @name           OKC Killfile

// @namespace      http://zzyzx.xyzzy.googlepages.com/okckillfile

// @description    A comprehensive killfile utility for OKCupid.

// @include        http://www.okcupid.com/*

// ==/UserScript==



//TODO: don't killfile people on your journal (you have block for that)





// Here's a list of the things we would want to kill.



//By the blocked object:

	//Certain people

		//1. The comments they make in journals (except yours) -- 'Ignore comments'

		//2. The comments your favorite people leave them 'Ignore journal'

		//4. 'Make infallible' -- overrides 2 and 3 for certain commenters.

	//Certain journal entries

		//3. The comments people leave there



//The first section of the script is to do the actual killfiling.

//The second half of the script is to provide the kill buttons.





//-------------- FIRST HALF. Perform the killfiling. --------------

//GM_log('window is ' + window.location.pathname);

 watchJournal(document);

if (window.location.pathname == '/relevant' && window.location.search.match('comments')) {

	//If this is the friends' comments page, run the comment ignore function

	//GM_log('ignoring comments');

	//ignoreComments(document);

} else if (window.location.search.match('/journal')) {

    //watch the journal

    //GM_log('watching journal');

    watchJournal(document);

} else if (window.location.pathname == '/profile') {

    //watch the profile journal

    //GM_log('watchProfileJournals');

    watchProfileJournals(document);

}



function watchProfileJournals(base) {

    //watch for journals on profiles loading

    var journals = document.evaluate(

        "descendant::div[starts-with(@id, 'jnl')]",

        base, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < journals.snapshotLength; i++) {

        watchProfileJournal(journals.snapshotItem(i));

    }

}



function watchProfileJournal(node) {

    //GM_log('watchProfileJournal ' + node.getAttribute('id'));

    watchJournal(node);

    watchObject(node.wrappedJSObject, 'innerHTML', function (prop, oldVal, newVal) {

            //GM_log('profileJournalChanged ' + node.getAttribute('id'));

            setTimeout(function(){watchJournal(node);}, 0);

            return newVal;

        }

    );

}



function watchJournal(node) {

    //GM_log('watchJournal');

    //select the divs with numeric ids

    var boards = document.evaluate(

        "descendant::div[@class='comment_load_shell']",

        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      //GM_log('boards: ' + boards.snapshotLength);

    for (var i = 0; i <  boards.snapshotLength; i++) {

        watchBoard(boards.snapshotItem(i));

    }

}



function watchBoard(node) {

    //GM_log('watchBoard' + node.getAttribute('id'));

    killComments(node);

    watchObject(node.wrappedJSObject, 'innerHTML', function(a, b, c) {

        //GM_log('board changed ' + node.getAttribute('id'));

        setTimeout(function(){killComments(node)}, 0);

        return c;

    });

}



function watchObject(obj, prop, func) {

    //cascading watch...

    var old = obj['_watch_' + prop];

    if (old) {

        obj['_watch_' + prop] = function(prop, oldVal, newVal) {

            //how to communicate old and new values is a puzzle

            newVal = old(prop, oldVal, newVal);

            newVal = func(prop, oldVal, newVal);

            return newVal;

        }

    } else {

        obj['_watch_' + prop] = func;

    }

    obj.watch(prop, obj['_watch_' + prop]);

}



function ignoreComments(root) {

	//select the journals...

	//i can do the entire killed-comment selection in the XPath query. I'm masochistic that way.

	

	//UPDATE: AUGH the post link in the friends' comments page has its tuid and pid the other way

	//around from the permalink!!!!! Masochism.... here shows the xpath expression that straightens it

	//out to have pid come first regardless what way it was...

	//This same thing happend with blogthis marker comments.

/*

a = document.evaluate("//a[contains(@href, '/journal?')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue

document.evaluate("" +" concat('pid=', " +" substring-before(substring-after(@href, 'pid='), '&'), " +" substring-after(@href, '&pid='), " +" '&tuid=', " +" substring-before(substring-after(@href, 'tuid='), '&'), " +" substring-before(substring-after(@href, '&tuid='))) ", a, null, XPathResult.STRING_TYPE, null).stringValue

*/



	/*

	GM_log('ignoredPosts = "' + GM_getValue('ignoredPosts', '') + '";\n'

		+ 'ignoredJournalAuthors = "' + GM_getValue('ignoredJournalAuthors', '') + '";\n'

		+ 'infallibleUserNames = "' + GM_getValue('infallibleUserNames', '') + '";');

	*/



	var ignoredComments = document.evaluate(""		

	+"		descendant::p[	"

	+"			@class='title'	"

	+"		]/a	"

	+"		[	"

	+"			(	"

	+"				contains(	"

	+"					' " + GM_getValue('ignoredPosts', '') + " ',	"

	+"					concat('pid=',	"

	+"					       substring-before(substring-after(@href, 'pid='), '&'),	"

	+"					       substring-after(@href, '&pid='),	"

	+"					       '&tuid=',	"

	+"					       substring-before(substring-after(@href, 'tuid='), '&'),	"

	+"					       substring-after(@href, '&tuid=')))	"

	+"				or contains(	"

	+"					' " + GM_getValue('ignoredJournalAuthors', '') + " ',	"

	+"					concat(	"

	+"						substring-before(substring-after(@href, 'tuid='), '&'),	"

	+"					       	substring-after(@href, '&tuid=')))	"

	+"			)	"

	+"		]	"

	+"		[	"

	+"			not(contains(	"

	+"				' " + GM_getValue('infallibleUserNames', '') + " ',	"

	+"				concat(' ', string(preceding-sibling::a[contains(@href, '/profile')]), ' ')	"

	+"			))	"

	+"		]	"

	+"		/ancestor::div[	"

	+"			contains(concat(' ', @class, ' '), ' post ')	"

	+"		]	"

		,

		root,

		null,

		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

		null);

	//GM_log('found comments to ignore: ' + ignoredComments.snapshotLength);

	for (var i = 0; i < ignoredComments.snapshotLength; i++) {

		ignoreComment(ignoredComments.snapshotItem(i), 'ignored');

	}

}



function ignoreComment(comment, reason) {

	//GM_log('ignoring comment ' + comment + ' : ' + reason);

	//grab the username for curiosity's sake

	var username = document.evaluate(

		"string(descendant::a[contains(@href, '/profile')])", 

		comment, null, XPathResult.STRING_TYPE, null).stringValue;



	//grab the date script(clone it)

	var dateScript = document.evaluate(

		"descendant::script/text()[contains(string(), 'Date')]/ancestor::span[1]", 

		comment, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.cloneNode(true);



	//and grab the post link

	var postLink = document.evaluate(

		"descendant::a[@class='jcomHomeTitleLink']",

		comment, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null

	).singleNodeValue.cloneNode(true);



	var ignoredPostURI = document.evaluate(

		"string(descendant::a[@class='jcomHomeTitleLink']/@href)",

		comment, null, XPathResult.STRING_TYPE, null).stringValue;



	var showLink = e('a', {href:'javascript:void(0)'}, [t('show')]);

	

	var hiddenCommentPlaceholder = e('div', {class:'journalRelevantComment clearfix collapsed'}, [

		e('a', {href:('/profile?u=' + username)}, [t(username)]),

		t(' commented on '),

		postLink,

		t(' - '),

		dateScript,

		t(' (' + reason + ') ('),

		showLink, 

		t(')'),

	]);

	showLink.addEventListener('click', function(evt) {

		hiddenCommentPlaceholder.parentNode.replaceChild(comment, hiddenCommentPlaceholder);

	}, false);



	comment.parentNode.replaceChild(hiddenCommentPlaceholder, comment);

}





function killComments(root) {

	//GM_log('killing username ' + GM_getValue('killedUserNames', ''));

	//find the comments to kill.

	var killedComments = document.evaluate(""

	+"	descendant::div[@class='journal_comment']	"

	+"	//a[contains(@href, '/profile')]	"

	+"	[contains(' " + GM_getValue('killedUserNames', '') + " ', string())]	"

	+"	/ancestor::div[contains(concat(' ', @class, ' '), ' journal_comment ')]	"

		,

		root,

		null,

		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

		null);

	//GM_log('kill comments: ' + killedComments + ' : length is : ' + killedComments.snapshotLength );

	for (var i = 0; i < killedComments.snapshotLength; i++) {

		killComment(killedComments.snapshotItem(i));

	}

}



function killComment(comment) {

	//GM_log('kill comment: ' + comment);

	//grab the username...

	var username = document.evaluate(

		"string(descendant::p[contains(@class,'user_name')]//a[contains(@href, '/profile')])", 

		comment, null, XPathResult.STRING_TYPE, null).stringValue;

	//GM_log('Username is: ' + username);

	var parent = comment.parentNode;



	var showLink = e('a', {href:'javascript:void(0)'}, [t('show')]);



	var killedCommentPlaceholder = e('div', {class:'journal_comment'}, [

		e('a', {href:('/profile?u=' + username)}, [t(username)]),

		t(' left a comment ('),

		showLink, 

		t(')'),

	]);



	showLink.addEventListener('click', function(evt) {

		parent.replaceChild(comment, killedCommentPlaceholder);

	}, false);



	parent.replaceChild(killedCommentPlaceholder, comment);

}







//-------------- SECOND HALF. Add buttons to profiles and journals to manage killfiling. --------------

//GM_log('person ' + document.getElementById('personality_awards') );





if (document.getElementById('profile_essays') != null) {

	//GM_log('in if' );

	//will need these.

	var buddyForm = document.forms.namedItem('flag_form');

	//GM_log('buddyform is ' + buddyForm);

	if (!buddyForm) return;



	var tuid = buddyForm.elements.namedItem('owner_id').value;

	var username = buddyForm.elements.namedItem('name').value;

	//GM_log('tuid  ' + tuid);

	//GM_log('username  ' + username);

	//show the buttons 'ignore journal,' 'killfile' and 'invincible' if they are saved.

	var rejectbtn = document.evaluate(

			"//p[@class='btn small white small_white hover']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	//rejectbtn = document.getElementById('rejectbtn');

	

	//addInfallibleButton(rejectbtn);

	//addIgnoreJournalButton(rejectbtn);

	//GM_log('reject button is ' + rejectbtn);

	addIgnoreCommentsButton(rejectbtn);

} 



//these three function are nearly structurally identical and should be factored...





function addIgnoredList(){

	var list = map(decodeURI, GM_getValue(key, '').split(/\s+/));



}



function addInfallibleButton(after) {

	//are they on your saved list?

	var isSaved;

	if(buddyForm.elements.namedItem('addbuddybutton') == null){

	  isSaved = true;

	}

	else{

	 isSaved = false;

	}

	//GM_log('issaved = ' + isSaved) ;



	if (isSaved) {

		//are they infallible?

		isInfallible = containsItem('infallibleUserNames', username);



		var isFallibleLink = e('a', {href:'javascript:void(0)', class:'profileBTN fav'}, [t('Make Infallible')]);

		isFallibleLink.addEventListener('click', function(evt) {

			addItem('infallibleUserNames', username);

			addItem('infallibleUsers', tuid);

			evt.target.parentNode.replaceChild(isInfallibleLink, evt.target);

		}, false);



		var isInfallibleLink = e('a', {href:'javascript:void(0)', class:'profileBTN rmfav'}, [t('Make Fallible')]);

		isInfallibleLink.addEventListener('click', function(evt) {

			removeItem('infallibleUserNames', username);

			removeItem('infallibleUsers', tuid);

			evt.target.parentNode.replaceChild(isFallibleLink, evt.target);

		}, false);



		button = e('li', {id:'infallibleButton'}, [

			(isInfallible ? isInfallibleLink : isFallibleLink)

		]);



		after.parentNode.insertBefore(button, after.nextSibling);

	}	

}







function addIgnoreJournalButton(after) {

	var isIgnored = containsItem('ignoredJournalAuthors', tuid);



	var isIgnoredLink = e('a', {href:'javascript:void(0)', class:'profileBTN dead'}, [t("Stop Ignoring Journal")]);

	isIgnoredLink.addEventListener('click', function(evt) {

			removeItem('ignoredJournalAuthors', tuid);

			removeItem('ignoredJournalAuthorNames', username);

			evt.target.parentNode.replaceChild(isNotIgnoredLink, evt.target);

	}, false);



	var isNotIgnoredLink = e('a', {href:'javascript:void(0)', class:'profileBTN dead'}, [t("Ignore Journal")]);

	isNotIgnoredLink.addEventListener('click', function(evt) {

			addItem('ignoredJournalAuthors', tuid);

			addItem('ignoredJournalAuthorNames', username);

			evt.target.parentNode.replaceChild(isIgnoredLink, evt.target);

	}, false);



	button = e('li', {id:'ignoreJournalButton'}, [

		(isIgnored ? isIgnoredLink : isNotIgnoredLink)

	]);

	//GM_log('parent ' + after.parent);



	after.parent.insertBefore(button, after.nextSibling);

}







function addIgnoreCommentsButton(after) {

	//GM_log('After is ' + after);

	var isKilled = containsItem('killedUserNames', username);



	var isKilledLink = e('a', {href:'javascript:void(0)', class:'btn small white small_white hover'}, [t("Stop Ignoring Comments")]);

	isKilledLink.addEventListener('click', function(evt) {

			removeItem('killedUsers', tuid);

			removeItem('killedUserNames', username);

			evt.target.parentNode.replaceChild(isNotKilledLink, evt.target);

	}, false);



	var isNotKilledLink = e('a', {href:'javascript:void(0)', class:'btn small white small_white hover'}, [t("Ignore Comments")]);

	isNotKilledLink.addEventListener('click', function(evt) {

			addItem('killedUsers', tuid);

			addItem('killedUserNames', username);

			evt.target.parentNode.replaceChild(isKilledLink, evt.target);

	}, false);



	button = e('div', {id:'ignoreCommentsButton'}, [

		(isKilled ? isKilledLink : isNotKilledLink)

	]);

	//GM_log('parent ' + after.wrappedJSObject.className);





	after.parentNode.insertBefore(button, null);	

}





// In any case, now add the 'Ignore this post' entry at the bottom of any journal entries you may find.



addIgnorePostButtons(document);


function addIgnorePostButtons(root) {

	var journals = document.evaluate(

		"descendant::div[@class='journalEntry']",

		root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



	for (var i = 0; i < journals.snapshotLength; i++) {
		addIgnorePostButton(journals.snapshotItem(i));

	}

}



function addIgnorePostButton(journal) {

	//find out the permalink of the entry.

	var permalink = document.evaluate(

		"substring-after(descendant::a[@class='journalFooterLink']/@href, '?')",

		journal, null, XPathResult.STRING_TYPE, null).stringValue;

	var isIgnored = containsItem('ignoredPosts', permalink);

	

	var parent = document.evaluate(

		"descendant::div[@class='journalBlog']",

		journal, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;



	var isNotIgnoredLink = e('a', {href:'javascript:void(0)'}, [t('Ignore This Entry')]);

	isNotIgnoredLink.addEventListener('click', function(evt) {

		addItem('ignoredPosts', permalink);

		button.replaceChild(isIgnoredLink, isNotIgnoredLink);

	}, false);



	var isIgnoredLink = e('a', {href:'javascript:void(0)'}, [t('Stop Ignoring This Entry')]);

	isIgnoredLink.addEventListener('click', function(evt) {

		removeItem('ignoredPosts', permalink);

		button.replaceChild(isNotIgnoredLink, isIgnoredLink);

	}, false);



	var button = e('div', {class:'FlagDiv'}, [(isIgnored ? isIgnoredLink : isNotIgnoredLink)]);

	parent.appendChild(button);

}



//------ helper functions ------



function e(name, attribs, children) {

	//make an element with some attributes and children.

	var r = document.createElement(name);

	for (var i in attribs) {

		r.setAttribute(i, attribs[i]);

	}

	for (var i = 0; i < children.length; i++) {

		r.appendChild(children[i]);

	} 

	return r;

}



function t(text) {

	//make a text node.

	return document.createTextNode(text);

}



function map(fn, a) {

	var b = [];

	for (i = 0; i < a.length; i++) {

		b.push(fn(a[i]));

	}

	return b;

}



function containsItem(key, item) {

	var list = map(decodeURI, GM_getValue(key, '').split(/\s+/));

	return member(list,item);

}



function removeItem(key, item) {

	var list = map(decodeURI, GM_getValue(key, '').split(/\s+/));

	GM_setValue(key, map(encodeURI, without(list, item)).join(' '));

}



function addItem(key, item) {

	var list = map(decodeURI, GM_getValue(key, '').split(/\s+/));

	GM_setValue(key, map(encodeURI, list.concat(item)).join(' '));

}





function member(list, item) {

	// wtf... b = new Array() returns an object with a member() method

	// in the JS shell, but

	// not here. It's that they're using Prototype and I'm not. Huh.

	for (var i = 0; i < list.length; i++) {

		if (list[i] == item) {

			return true;

		}

	}

	return false;

}



function without(list, item) {

	b = [];

	for(var i = 0; i < list.length; i++) {

		if (list[i] != item) {

			b.push(list[i]);

		}

	}

	return b;

}
