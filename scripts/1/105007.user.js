// By ultradude25
// ==UserScript==
// @id             mcwikisidebarremove
// @name           Minecraft Wiki Sidebar Remover
// @namespace      http://www.minecraftwiki.net/
// @version        0.3
// @description    This removes the massive sidebar, being forced by the Curse staff.
// @include        http://www.minecraftwiki.net/*
// ==/UserScript==

if ( document.getElementById( 'curse-panel' ) ) {
	var addStyle = document.createElement( 'style' );
	addStyle.type = 'text/css';
	addStyle.innerHTML = '#curse-panel { display: none !important } #bodyContent2.en { margin-right: 0 !important; min-height: 0 !important }';
	document.head.appendChild( addStyle );
} else if ( document.getElementById( 'sidebar' ) ) {
	var sidebar = document.getElementById( 'sidebar' )
	sidebar.parentNode.removeChild( sidebar );
	document.getElementById( 'bodyWrapper' ).className = '';
}