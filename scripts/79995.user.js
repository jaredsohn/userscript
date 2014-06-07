// ==UserScript==
// @name           İkariam Kargo Gemisi Yükü v.1
// @namespace      IkariamPulldownChanger
// @author         Martynius
// @version        0.3.1a
// @description    Kargo geminiz ne taşıyor ve ne kadar taşıyorhepsini görebilmenizi sağlıyor (ikariam.forumm.biz)
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @include        http://s*.ikariam.*/index.php?*view=merchantNavy*
// @include        http://s*.ikariam.*/index.php
// @exclude        http://support.ikariam.*/*
// @exclude        http://support.*.ikariam.*/*
//
// @history	0.3.1a	<em>Feature:</em> Copy/Paste of cargo will now be shown as a list in text format<br /><strong>Bugfix:</strong> Will work if you change towns on Trade Fleet View.
// @history	0.3.1	Simplified Code<br /><em>Feature:</em> Added alternate text for images so copy/paste will show what is being transported.<br /><em>Feature:</em> Added script updater.
// @history	0.3.0	Updated to use jQuery to simplify code and make it more generic.<br /><em>Feature:</em> Pulldowns will start open but can now be closed.
// @history	0.2.0	Simplified data structure.<br /><strong>Bugfix:</strong> Updated to Gunsman to Marksman.
// @history	0.1.1	Global data store added containing image, image size and title information in addition to quantity data.<br /><em>Feature:</em> Added military units.<br />Changed to use XPath for interrogating DOM.<br />Moved HTML snippets to global variable for ease of maintenance.<br />GenerateHTML function used to substitute data for placeholder strings to generalise the output HTML code.
// @history	0.1.0	Original Version
// ==/UserScript==

if ( $("body").attr("id") != "merchantNavy" ) return;

ScriptUpdater.check( 34766 );

GM_registerMenuCommand(
		"Ikariam Pulldown Changer: Check for update",
		function() { ScriptUpdater.forceNotice( 34766, '0.3.1a' ) }
	);

function changePulldown() {
	var found = false;
	$("div.pulldown div.content div.payload").each( function() {
		found = true;
		var titles = {};
		$("img", this)
			.wrapAll("<ul></ul>")
			.each( function() {
				if ( titles[this.title] )
					this.style.display = 'none';
				else {
					titles[this.title] = true;
					this.style.marginLeft = '0px';
					$(this)	.attr( 'alt', ' ' + /\D+$/.exec(this.title)[0].trim() )
						.wrap( '<li class="payloadWrapper"></li>' )
						.before( ' <span class="textLabel" style="padding:2px;">' + /^\d+/.exec(this.title)[0] + '</span>' )
						.wrap( '<span class="textLabel" style="padding:2px;"></span>' );
				}
		});
	});
	GM_addStyle( 'div.pulldown div.content div.payload img { height: 20px; width: auto; }' );
	if ( found )
		$( document ).ready( function() {
				$( "div#mainview div.content div.pulldown div.content" ).each( function() {
						var that = $( this );
						that	.css( 'height', 'auto' )
							.attr( 'contentHeight', that.attr( 'offsetHeight' ) )
							.css( 'height', that.attr( 'contentHeight' ) + 'px' );
					} );
			} );
}

changePulldown();