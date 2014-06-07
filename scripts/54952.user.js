// ==UserScript==
// @name      	Rev3 Force Cool Signature
// @namespace	revision3.com
// @include     *revision3.com/*
// @author	Oldarney
// ==/UserScript==


//------------ start signature ----------- //

var sig = '__________________\n[IMG]http://img81.imageshack.us/img81/6481/rqqgzdf6vpdb7h1xn4x.jpg[/IMG] \nRev3 HD Extreme QT - [URL="http://userscripts.org/scripts//show//54799"]http://userscripts.org/scripts/show/54799[/URL]'; //<<<< edit between the ' ' marks

//------------ end signature ---------//
	

	function listenToTheButtons() {
		window.setTimeout(function() {//var post = document.getElementById('vB_Editor_001_save');
		var quickEditPost = document.evaluate( "//input[@value='Save']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		var advEditPost = document.evaluate( "//input[@value='Save Changes']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		var quickPost = document.evaluate( "//input[@value='Post Quick Reply']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		var advPost = document.evaluate( "//input[@value='Submit Reply']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		var topicPost = document.evaluate( "//input[@value='Submit New Thread']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		
var post = quickEditPost.singleNodeValue || quickPost.singleNodeValue || topicPost.singleNodeValue || advEditPost.singleNodeValue  || advPost.singleNodeValue;
		post.removeEventListener('mousedown', attachSig, false);
		post.addEventListener('mousedown', attachSig, false);
		}, 
		500);	
	}

	function primeEditBtns() {
		var qEditBtn = document.evaluate( "//a[contains(@name, 'vB::QuickEdit::')]" ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		if (qEditBtn){
			for (var i=0; i < qEditBtn.snapshotLength; i++) {
				qEditBtn.snapshotItem(i).addEventListener('click', listenToTheButtons, false);
			}
		}
	}
	
window.setTimeout(
	function() {
		listenToTheButtons();
		primeEditBtns();
	},
	1
);

function attachSig() {
	
	var text = document.evaluate( "//textarea[contains(@id, 'textarea')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value;	
	//alert(text.substring(text.length-sig.length, text.length));
	if(text.substring(text.length-sig.length, text.length) != sig) {
	text += "\n" + "\n" + sig;
	document.evaluate( "//textarea[contains(@id, 'textarea')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = text;
	}
}
