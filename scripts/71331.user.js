// ==UserScript==
// @name           Wowhead to Battle.net
// @author         neutronimity
// @description    Adds a link to Wowhead's item quick fact boxes that, upon clicking, will open the respective item page in the Battle.net Armory in a new tab.
// @include        http://*.wowhead.com/*
// ==/UserScript==

function addjQuery ( callback ) {
  var script = document.createElement ( "script" );
  script.setAttribute( "src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" );
  script.addEventListener ( 'load', function() {
    var script = document.createElement ( "script" );
    script.textContent = "(" + callback.toString () + ")();";
    document.body.appendChild ( script );
  }, false );
  document.body.appendChild ( script );
};

function links () {
	if ( typeof jQuery ) {
		jQuery( function () {
			if (typeof unsafeWindow.g_pageInfo !== 'undefined' && typeof unsafeWindow.g_pageInfo.type !== 'undefined' ) {
				switch ( unsafeWindow.g_pageInfo.type ) {
				/*npc:1,
				object:2,
				item:3,
				itemset:4,
				quest:5,
				spell:6,
				zone:7,
				faction:8,
				pet:9,
				achievement:10,
				title:11,
				statistic:16,
				profile:100*/
				case 3:
					jQuery ( 'div#sdhafcuvh0 ul:first' ).append ( '<li><b>Google:</b> <a href=\'http://google.com/search?q=World of Warcraft \"' + unsafeWindow.g_pageInfo.name + '\"\' target=\'_blank\'>Search</a></li><li><b>Battle.net:</b> <a href=\'http://us.battle.net/wow/en/item/' + unsafeWindow.g_pageInfo.typeId + '\' target=\'_blank\'>'+ unsafeWindow.g_pageInfo.typeId + '</a></li>' );
					break;
				default:
					jQuery ( 'div#sdhafcuvh0 ul:first' ).append ( '<li><b>Google:</b> <a href=\'http://google.com/search?q=World of Warcraft \"' + unsafeWindow.g_pageInfo.name + '\"\' target=\'_blank\'>Search</a></li>' );
				};
			};
		});
	};
};

addjQuery ( links );