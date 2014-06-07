// ==UserScript==
// @name           SL Forum Ignore
// @namespace      Private
// @description    +Ignore Links (threads/posts), +OP Edit/Abuse fix, +'Featured' and Sidebar collapsing
// @include        http://blogs.secondlife.com/thread/*
// @include        http://blogs.secondlife.com/message/*
// @include        http://blogs.secondlife.com/community/forums/*
// @include        http://blogs.secondlife.com/community/answers*
// @include        http://blogs.secondlife.com/community/commerce*
// @include        https://blogs.secondlife.com/thread/*
// @include        https://blogs.secondlife.com/message/*
// @include        https://blogs.secondlife.com/community/forums/*
// @include        https://blogs.secondlife.com/community/answers*
// @include        https://blogs.secondlife.com/community/commerce*
// @match          http://blogs.secondlife.com/thread/*
// @match          http://blogs.secondlife.com/message/*
// @match          http://blogs.secondlife.com/community/forums/*
// @match          http://blogs.secondlife.com/community/answers*
// @match          http://blogs.secondlife.com/community/commerce*
// @match          https://blogs.secondlife.com/thread/*
// @match          https://blogs.secondlife.com/message/*
// @match          https://blogs.secondlife.com/community/forums/*
// @match          https://blogs.secondlife.com/community/answers*
// @match          https://blogs.secondlife.com/community/commerce*
// @version        1.6.1
// @copyright      Void Singer 2010 [ https://wiki.secondlife.com/wiki/User:Void_Singer ] & BlindWanderer [ http://userscripts.org/users/4223 ]
// @license        CC-BY [ http://creativecommons.org/licenses/by/3.0 ]
// @licesne.ext    Free to copy, use, modify, distribute, or sell, with attribution.
// ==/UserScript==
 
/*//-- added match statements for compatibility with chromium 'content scripts'  --//*/
/*//-- IE7pro unsupported: lacks CSS inheritance & getElementsByClassName        --//*/
/*//-- Updated for jive version changes & http access 5:20am Wed, April 14, 2010 --//*/
/*//-- expanded ignore to cover thread views in all content and discussion views --//*/
/*//-- added sidebar removal for thread/message, all content, and discussion view--//*/
/*//-- add collapsing for featured posts in all content, and discussion view     --//*/
/*//-- removed Linden name coloring, since they added post coloring for them     --//*/
 
 //-- compatibility replacements for Chrome4+, Opera10.5+, Safari4+, I hope
if (typeof GM_addStyle  == 'undefined'){
	function GM_addStyle( vCss ){
		var vStyle = document.createElement( 'style' );
		vStyle.textContent = vCss;
		document.getElementsByTagName( 'head' )[0].appendChild( vStyle );
	}
} //-- "it's possible that *this* GM_ function is supported in chromium, but the others are not. can't find docs"
 
 //-- compatibility replacements for Chrome4+, Opera10.5+, Safari4+, I hope
if (typeof GM_setValue  == 'undefined'){
	//-- native JSON and localStorage for GM_*Value replacement
	GM_getValue = function( vKey, vDefault ){
		var vReturn = JSON.parse( window.localStorage.getItem( vKey ) );
		return ((vReturn == null)? vDefault: vReturn);
	}
 
	GM_setValue = function( vKey, vValue ){
		window.localStorage.setItem( vKey, JSON.stringify( vValue ) );
	}
 
	GM_deleteValue = function( vKey ){
		window.localStorage.removeItem( vKey );
	}
}
 
 //-- function contributed by BlindWanderer
function uHide( vPostNode, vClass ){
	vPostNode.className += ' ' + vClass;
}
 
 //-- function contributed by BlindWanderer
function uShow( vNode, vClass ){
	vNode.className = vNode.className.split( ' ' ).filter( function( v ){ return v != vClass;} ).join( ' ' );
}
 
 //-- function contributed by BlindWanderer, modifed by Void Singer
function uToggleIgnore(){
//-- no ancestor support outside of xpath?
	var vName = this.getAttribute( 'username' );
	var vAction = (vIgnoreCache[vName] = !vIgnoreCache[vName])? uHide : uShow;
	if (vIgnoreCache[vName]){
		GM_setValue( vName, true );
	}
	else{
		GM_deleteValue( vName );
	}
	var vSwaps = document.getElementsByClassName( vName );
	var vCount = 0;
	for (vCount; vCount < vSwaps.length; ++vCount){
		vAction.apply( vAction, [vSwaps.item( vCount ), 'ignored-user'] );
	}
}

function uSidebar(){
	var vStatus = !GM_getValue( 'sidebar.hidden' );
	GM_setValue( 'sidebar.hidden', vStatus );
	var vTag = document.getElementById( 'jive-body-main' );
	vTag.className = (vStatus)? 'GM-sidebar-hidden' : '';
}

function uFeatured(){
	var vStatus = !GM_getValue( 'featured.hidden' );
	GM_setValue( 'featured.hidden', vStatus );
	var vNode = document.getElementById( 'GM-featured' );
	var vAction = (vStatus) ? uHide : uShow;
	vAction.apply( vAction, [vNode, 'GM-featured-hidden'] )
}

//-- adds styles, ignore toggles, and marks post containers
function uTweakPage( vType ){
	//-- use style to reduce load, contributed by BlindWanderer, modifed by Void Singer
	GM_addStyle( [
		'#GM-copy-control { font-weight: bold; }',
		'',
		'.GM-ignore-link-wrapper { cursor:pointer; font-weight: bold; color: rgb( 96, 0, 0 ) !important; padding-right: 1em !important; }',
		'.font-color-meta-light .GM-ignore-link-wrapper { display:inline-block; };',
		'',
		'.GM-sidebar-hidden #jive-body-sidebarcol-container { display: none; }',
		'.GM-sidebar-hidden #jive-body-maincol-container { width: 98%; }',       //-- if this is set first, the view doesn't expand
		'.GM-sidebar-hidden #jive-body-sidebarcol-container { display: none; }', //-- if this isn't re-set here the list drops but doesn't hide
		'',
		'.GM-toggle { cursor: pointer; }',
		'.GM-show-featured  { display: none; }',
		'.GM-featured-hidden .jive-box-body { display: none; }',
		'.GM-featured-hidden .GM-hide-featured { display: none; }',
		'.GM-featured-hidden .GM-show-featured { display: block; }',
		'',
		'.ignore { display:block; }',
		'.unignore { display:none; }',
		'.ignored-user .ignore {display:none; }',
		'.ignored-user .unignore {display:block; }',
		'.jive-table-cell-author .GM-ignore-link-wrapper { float:left; }',
		'',
		'tr.ignored-user { line-height: 0.0; }',
		'.ignored-user *[src] { display:none; }',
		'.ignored-user .jive-icon-med, .ignored-user > a { display:none; }',
		'.ignored-user .jive-table-cell-author .jive-username-link { float:left; padding-left: 1em; white-space: nowrap; }',
		'.ignored-user .jive-table-cell-subject, .ignored-user  .jive-table-cell-modified, .ignored-user  .jive-table-cell-replies, .ignored-user .jive-table-cell-views { visibility:hidden; }',
		'',
		'.ignored-user .jive-author { padding-top:0; padding-bottom:0; }',
		'.ignored-user .jive-author-avatar-container { display:none!important; }',
		'.ignored-user .jive-author-avatar-container { background-image: none !important; }',
		'.ignored-user .jive-author > em { display:none; }',
		'',
		'.ignored-user .jive-thread-post-body-container { min-height:0; background-image: none !important; padding-bottom:8px; }',
		'.ignored-user .jive-thread-post-subject { float: left; width:auto; }',
		'.ignored-user .jive-thread-post-subject h2 { display:none; }',
		'.ignored-user .jive-thread-post-message { display:none; }',
		'.ignored-user .jive-thread-post-details { background-image: none !important; padding-top:0; margin-top:0; width:auto;}',
		'.ignored-user .jive-thread-post-subject-content { background-image: none !important; padding-bottom:0; margin-bottom:0; }',
		'.ignored-user .jive-thread-post-subject-content .jive-thread-post-reply { display:none; }',
		'',
		'.ignored-user .jive-thread-reply-body-container { min-height:0; padding-bottom:6px; }',
		'.ignored-user .jive-thread-reply-subject { float: left; width:auto; padding-bottom:0!important;}',
		'.ignored-user .jive-thread-reply-subject strong { display:none!important; }',
		'.ignored-user .jive-thread-reply-message { display:none; }',
		'.ignored-user .jive-content-controls { text-align:right; width:auto; padding-top:0; padding-bottom:0;}',
		].join( '\n' ) );
 
	function vInsertSideBarToggle(){
		var vJiveBody = document.getElementById( 'jive-body-main' );
		if (GM_getValue( 'sidebar.hidden' )){
			vJiveBody.className = 'GM-sidebar-hidden';
		}
		 //-- add toggle switch
		var vToggle = document.createElement( 'div' );
		vToggle.className = 'jive-icon-gear jive-icon-med GM-sidebar-toggle';
		vToggle.setAttribute( 'style', 'position: absolute' );
		vJiveBody.insertBefore( vToggle, vJiveBody.firstChild );
		vToggle.addEventListener( 'click', uSidebar, false );
	}

	 //-- create generic toggle for ignore buttons, contributed by BlindWanderer
	var vToggleBox = document.createElement( 'div' );
	vToggleBox.className = 'GM-ignore-link-wrapper';
	{
		var span = document.createElement( 'span' );
		span.appendChild( document.createTextNode( (vType) ? 'Ignore' : 'X' ) );
		span.className = 'ignore';
		vToggleBox.appendChild(span);
	}
	{
		var span = document.createElement( 'span' );
		span.appendChild( document.createTextNode( (vType) ? 'Unignore' : '#' ) );
		span.className = 'unignore';
		vToggleBox.appendChild(span);
	}
 
	function uInsertToggles( vPostNodes ){ //-- contributed by BlindWanderer, modifed by Void Singer
		var vCount = 0;
		 //-- loop through posts
		for (vCount; vCount < vPostNodes.length; ++vCount){
			 //-- get user profile link for position, and grab their system name
			var vUserLink = vPostNodes.item( vCount ).getElementsByClassName( 'jive-username-link' ).item( 0 );
			var vName = vUserLink.href.substring( vUserLink.href.lastIndexOf( '/' ) + 1 );
			 //-- tag post for ignore handling
			vPostNodes.item( vCount ).parentNode.className += ' ' + vName; //-- changed to class vs custom attribute
			if (vName.split( '.' ).slice( -1 )[0] != 'Linden'){
				//-- check and ignore post if user already on ignore
				var vIsIgnored = vIgnoreCache[vName] = GM_getValue( vName, false );
				if (vIsIgnored){
					uHide( vPostNodes.item( vCount ).parentNode, 'ignored-user' );
				}
				 //-- clone ignore toggle into user info box, and tie it the switch function
				var vIgnoreToggle = vToggleBox.cloneNode( true );
				vIgnoreToggle.setAttribute( 'username', vName );
				if (vType){
					vUserLink.parentNode.insertBefore( vIgnoreToggle, vUserLink.nextSibling ); //--contributed by Blind Wanderer
				}else{
					vUserLink.parentNode.insertBefore( vIgnoreToggle, vUserLink );
				}
				vIgnoreToggle.addEventListener( 'click', uToggleIgnore, false );
			}
		}
	}

	if (vType){
		vInsertSideBarToggle();
		 //-- insert Toggle in OP
		uInsertToggles( document.getElementsByClassName( 'jive-thread-post-body' ) );
		 //-- insert Toggle in replies
		uInsertToggles( document.getElementsByClassName( 'jive-thread-reply-body' ) );
		 //-- not happy with the separate inserts for OP and reply, but it wasn't worth a custom function to grab both

		//-- clone edit/abuse to OP posts
		var vGetOP   = document.getElementsByClassName( 'jive-thread-post-details' ).item( 0 );
		if (null != vGetOP){
			vGetOP = vGetOP.getElementsByTagName( 'ul' ).item( 0 );
			var vGetReport = document.getElementById( 'jive-link-abuse' );
			if (null != vGetReport){
				var vClone = vGetReport.cloneNode( true );
				vClone.id = 'GM-copy-control';
				vClone.getElementsByTagName( 'span' ).item( 0 ).className = 'jive-icon-sml jive-icon-warn';
				vGetOP.insertBefore( vClone, vGetOP.firstChild );
			}else{
				var vGetEdit = document.getElementById( 'jive-link-edit' );
				if (null != vGetEdit){
					var vClone = vGetEdit.cloneNode( true );
					vClone.id = 'GM-copy-control';
					vClone.getElementsByTagName( 'a' ).item( 0 ).innerHTML = '<span class="jive-icon-sml jive-icon-edit"></span>Edit';
					vGetOP.insertBefore( vClone, vGetOP.firstChild );
				}
			}
		}
	}else{
		if ((document.location.search.indexOf( '=discussions' ) > -1) || (document.location.search.indexOf( '=all' ) > -1)){
			vInsertSideBarToggle();

			 //-- test and apply featured should be hidden
			var vJiveFeatured = document.getElementById( 'jive-body-maincol' ).getElementsByClassName( 'jive-box-featured' ).item( 0 );
			if (null != vJiveFeatured){
				vJiveFeatured.id = 'GM-featured';
				if (GM_getValue( 'featured.hidden' )){
					vJiveFeatured.className += ' GM-featured-hidden';
				}
			}

			 //-- insert Toggle in regular threads
			uInsertToggles( document.getElementsByClassName( 'jive-table-cell-author' ) );

			if (null != vJiveFeatured){
				vJiveFeatured = vJiveFeatured.getElementsByClassName( 'jive-box-header' ).item( 0 ).getElementsByTagName( 'h4' ).item( 0 );
				 //-- add toggle switch
				var vToggle = document.createElement( 'div' );
				vToggle.className = 'GM_Toggle';
				{
						var vSpan = document.createElement( 'span' );
					vSpan.className = 'jive-icon-forbidden jive-icon-sml GM-hide-featured';
					vToggle.appendChild( vSpan );
				}
				{
					var vSpan = document.createElement( 'span' );
					vSpan.className = 'jive-icon-plus jive-icon-sml GM-show-featured';
					vToggle.appendChild( vSpan );
				}
				vJiveFeatured.insertBefore( vToggle, vJiveFeatured.firstChild );
				vToggle.addEventListener( 'click', uFeatured, false );
				 //-- insert Toggle in feature threads
				uInsertToggles( document.getElementsByClassName( 'jive-featured' ).item( 0 ).getElementsByClassName( 'font-color-meta-light' ) );
			}
		}
	}
}

var vIgnoreCache = {}; //-- contributed by BlindWanderer

//-- jive version checking
if (document.getElementsByClassName( 'jiveVersion' ).item( 0 ).textContent.indexOf( '98854' ) != -1){
	uTweakPage( (document.location.href.indexOf( 'community' ) == -1) );
}