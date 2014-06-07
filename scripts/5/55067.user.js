// ==UserScript==
// @name           Forums Urban Terror France : reduit les citations
// @namespace      courgette@ubu-team.org
// @description    réduit les citations imbriquées de tous les posts
// @include        http://www.urban-terror.fr/forums/viewtopic.php*
// @author         Courgette (courgette at ubu-team dot org)
// ==/UserScript==
/*
   Updates:
   04/08/2009 - version initiale
*/
(function() {

var options = {
	cacherPremiereQuote: false,
	htmlShowButton: '<span style="color:lightgray">&nbsp;&nbsp;[montrer]</span>',
	htmlHideButton: '<span style="color:lightgray">&nbsp;&nbsp;[cacher]</span>'
};



var quotes = document.evaluate( '//div[@class="quotetitle"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i = 0; i < quotes.snapshotLength; i++ )
{
    var quotetitle = quotes.snapshotItem( i );

	
    var showButton = document.createElement( 'a' );
    showButton.href = '#'
	showButton.innerHTML = options.htmlShowButton;
    showButton.addEventListener( 'click', function(e) {
        e.preventDefault();
		quotetitle = this.parentNode.parentNode;
		quotetitle.nextSibling.style.display = '';
		
		this.nextSibling.style.display = '';
		this.style.display = 'none';
    }, false );

	var hideButton = document.createElement( 'a' );
    hideButton.href = '#'
	hideButton.innerHTML = options.htmlHideButton;
    hideButton.addEventListener( 'click', function(e) {
        e.preventDefault();
		quotetitle = this.parentNode.parentNode;
		quotetitle.nextSibling.style.display = 'none';
		
		this.previousSibling.style.display = '';
		this.style.display = 'none';
    }, false );


	var buttons = document.createElement('span');
	buttons.className = 'GM_quote_buttons';
	
	buttons.insertBefore(hideButton, null);
	buttons.insertBefore(showButton, hideButton);
	
    quotetitle.insertBefore( buttons, quotetitle.lastChild.nextSibling );
	
	
	// ne pas cacher la premiere quote du post.
	if (options.cacherPremiereQuote === false && quotetitle.parentNode.className == 'postbody') {
	    showButton.style.display = 'none';
	} else {
	    hideButton.style.display = 'none';
		quotetitle.nextSibling.style.display = 'none';
	}
}

})();
