// ==UserScript==
// @name        GameFAQs Multiple Single-PM Recipients
// @namespace   OTACON120
// @author      OTACON120
// @version     1.2
// @description Allow multiple recipients for one PM to be set
// @website     http://otacon120.com/scripts/multiple-single-pm-recipients/
// @updateURL   http://userscripts.org/scripts/source/133290.meta.js
// @downloadURL http://userscripts.org/scripts/source/133290.user.js
// @include     http://www.gamefaqs.com/pm/new*
// @match       http://www.gamefaqs.com/pm/new*
// ==/UserScript==
var pmForm         = document.getElementById( 'content' ).getElementsByTagName( 'form' )[0],
	recips         = pmForm.getElementsByClassName( 'body' )[0],
	recipInner     = recips.getElementsByTagName( 'p' ),
	allRecips      = [],
	newRecipBtn    = document.createElement( 'input' ),
	removeRecipBtn = [],
	newRecip       = [],
	pmSubmit       = document.getElementsByName( 'submit' )[0].value,
	pmKey          = document.getElementsByName( 'key' )[0].value,
	sentSuccess    = 0,
	pm             = [];

	// Add "New Recipient" button
newRecipBtn.id               = 'o120-add-recipient';
newRecipBtn.className        = 'btn';
newRecipBtn.type             = 'button';
newRecipBtn.style.marginLeft = '5px';
newRecipBtn.onclick = function() {
	var i = recipInner.length;

	newRecip[ i - 1 ]           = document.createElement( 'p' );
	newRecip[ i - 1 ].innerHTML = '<b style="visibility: hidden;">Enter Recipient Name:</b> <input type="text" value="" maxlength="20" size="20" name="to' + i + '" />';

	recips.appendChild( newRecip[ i - 1 ] );

	removeRecipBtn[ i - 1 ]                  = document.createElement( 'input' );
	removeRecipBtn[ i - 1 ].id               = 'o120-remove-recipient-' + i;
	removeRecipBtn[ i - 1 ].className        = 'btn';
	removeRecipBtn[ i - 1 ].type             = 'button';
	removeRecipBtn[ i - 1 ].value            = '-';
	removeRecipBtn[ i - 1 ].style.marginLeft = '5px';

	if ( newRecipBtn && i > 1 ) {
		newRecipBtn.parentNode.replaceChild( removeRecipBtn[ i - 1 ], newRecipBtn );

		document.getElementById( 'o120-remove-recipient-' + i ).onclick = function() {
			this.parentNode.parentNode.removeChild( this.parentNode );
		};
	}

	recipInner[ i ].appendChild( newRecipBtn );
};

newRecipBtn.value = '+';

recipInner[0].appendChild( newRecipBtn );

function sendPMs() {
	// Get Subject/Message and check for errors
	var x, y, params, recipName,
		pmSubject      = document.getElementsByName( 'subject' )[0].value,
		pmSubjectWords = pmSubject.split( ' ' ),
		pmMessage      = document.getElementsByName( 'message' )[0].value,
		pmMessageWords = pmMessage.split( ' ' );

	for ( y = 0; y < pmSubjectWords.length; y++ ) {
		if ( pmSubjectWords[y].length > 40 ) {
			alert( 'Your subject contains a word of over 40 characters. This can cause display issues for certain browsers.' );
			return;
		}
	}

	switch ( true ) {
		case ( pmSubject.length < 2 ):
			alert( 'The minimum length of a subject is 2 characters. Your current subject is ' + pmSubject.length + ' characters.' );
			return;

		case ( pmSubject.length > 100 ):
			alert( 'The maximum length of a subject is 100 characters. Your current subject is ' + pmSubject.length + ' characters.' );
			return;
	}

	for ( y = 0; y < pmMessageWords.length; y++ ) {
		if ( pmMessageWords[y].length > 80 ) {
			alert( 'Your message contains a word of over 80 characters. This can cause display issues for certain browsers.' );
			return;
		}
	}
	switch ( true ) {
		case ( pmMessage.length < 3 ):
			alert( 'The minimum length of a message is 3 characters. Your current message is ' + pmMessage.length + ' characters.' );
			return;

		case ( pmMessage.length > 1024 ):
			alert( 'The maximum length of a message is 1024 characters. Your current message is ' + pmMessage.length + ' characters.' );
			return;
	}
	for ( x = 1; x < recipInner.length; x++ ) {
		recipName = recipInner[x].getElementsByTagName( 'input' )[0].value;

		if ( x === 1 ) {
			allRecips[0] = recipInner[0].getElementsByTagName( 'input' )[0].value;
		}

		if ( recipName !== '' && allRecips.indexOf( recipName ) === -1 ) {
			params = 'key=' + escape( pmKey ) + '&to=' + escape( recipName ) + '&subject=' + escape( pmSubject ) + '&message=' + escape( pmMessage ) + '&submit=' + escape( pmSubmit );
			pm[ x ]  = new XMLHttpRequest();
			pm[ x ].open( 'POST', '/pm/new', false );
			pm[ x ].setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
			pm[ x ].setRequestHeader( 'Content-length', params.length );
			pm[ x ].setRequestHeader( 'Connection', 'close' );
			pm[ x ].send( params );

			allRecips[ x ] = recipName;

			sentSuccess++;
		}
	}

	if  (sentSuccess > 0 ) {
		alert( 'PMs sent successfully!' );
	}

	pmForm.submit();
}

pmForm.onsubmit = function(){
	sendPMs();
	return false;
}