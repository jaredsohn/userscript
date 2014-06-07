// ==UserScript==
// @name       Code Golf SE sorter
// @namespace  http://vyznev.net/
// @version    0.6
// @description  Add a tab to sort answers by code length
// @match      *://codegolf.stackexchange.com/questions/*
// @copyright  2014, Ilmari Karonen
// @grant      none
// ==/UserScript==

var inject = function () {
	var $votestab = $('#tabs a[href*="?answertab=votes"]:first');
	if ( !$votestab.length ) return;

	var $golftab = $votestab.clone().attr( {
		href: function (i,v) { return v.replace( /[?&]answertab=votes\b/, '?answertab=shortest' ) },
		title: "Answers with the lowest code golf score first"
	} ).text('shortest').removeClass('youarehere').insertAfter($votestab);

	var tab = /[?&]answertab=([^&]*)/.exec( location.search );
	tab = (tab && tab[1]) || localStorage.getItem( 'codegolf_sort_tab' ) || 'default';
	localStorage.setItem( 'codegolf_sort_tab', tab );
	if ( tab != 'shortest' ) return;

	$('#tabs a.youarehere').removeClass('youarehere').addClass('youwerehere');
	$golftab.addClass('youarehere');
	$('<style type="text/css">#tabs a.youwerehere { border-bottom: 1px dotted #ea0 }</style>').appendTo('head');

	$('.answer').each( function () {
		var $this = $(this);
		var answerid = $this.data('answerid');
		if ( answerid ) $this.prepend( $this.prev('a[name="' + answerid + '"]') );
		var $code = $this.find('pre:first');
		var score = ($code.length ? $code.text().length : 1e9);
		$this.data( 'golfscore', score + Math.random() );
	} ).not('.deleted-answer, .downvoted-answer').sort( function (a,b) {
		return $(a).data('golfscore') - $(b).data('golfscore');
	} ).insertAfter('#answers-header');

	// scroll back to target post after re-sorting
	var m = /^#(?:(\d+)|comment(\d+)_\d+)$/.exec( location.hash );
	var id = m && ( m[1] ? "answer-" + m[1] : "comment-" + m[2] );
	if ( id ) document.getElementById( id ).scrollIntoView();
};

var scriptElem = document.createElement( 'script' );
scriptElem.textContent = "$(" + inject + ");";
document.body.appendChild( scriptElem );
