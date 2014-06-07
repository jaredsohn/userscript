// ==UserScript==
// @name        Groupees Purchase Page Tweaker
// @description Provides basic improvements to the look and function of your purchased Groupees bundles page.
// @namespace   http://sydv.net/userscripts
// @homepageURL http://sydv.net
// @author      Detruire
// @version     0.3.1
// @include     http://groupees.com/users/*/purchases*
// @include     http://groupees.com/users/*/purchases#
// @include     https://groupees.com/users/*/purchases*
// @include     https://groupees.com/users/*/purchases#
// @grant       none
// ==/UserScript==

( function( $ ) {

	var CONF = {
		UseStoreFavicons: true, // Replace "Steam", "Desura", and "GOG" key labels with their respective icons.
		ContinuousScroll: true,
	};

	// Improved styling.
	var styles = "body {background:#080808;color:#e9e9e9;} \
		div.extra {float:right;margin:0 4px;} \
		.user-profile {width:400px;} \
		.user-profile .extra a {margin:0;} \
		div.authorization {float:left;margin-right:10px;} \
		.purchases .bundle h2 {background:#333;border-radius:3px 3px 3px 3px;height:40px;} \
		.purchases .bundle h2 .actions {margin:0;padding:0;} \
		.purchases .bundle h2 .actions > .button {color:#fff;line-height:32px;margin:3px 3px 0;padding:0 10px;text-shadow:1px 1px 2px #222;} \
		form.new_order .buy {font-size:24px;line-height:50px;} \
		.purchases .bundle h2 .short-info {float:right;line-height:40px;margin:0;padding:0 12px;} \
		.purchases .bundle.expanded .expander a,.purchases .bundle .expander a:active,.purchases .bundle .expander a {background:transparent;border:0;box-shadow:none;color:#fff;line-height:40px;outline:none;padding:0;padding:3px 0 0;text-shadow:1px 1px 1px #000;vertical-align:middle;} \
		.purchases .bundle .instruction {display:none;} \
		.purchases .bundle .body {padding:0;} \
		.purchases .bundle .keys li {background:#fff;box-shadow:0px 0px 0px 3px rgb(240, 245, 247), 0px 0px 0px 4px rgb(210, 210, 210);display:block;line-height:19px;margin-bottom:10px;overflow-x:hidden;white-space:nowrap;} \
		.purchases .bundle .keys li span {display:inline;} \
		.purchases .bundle .keys li .key {background:#fff;box-shadow:none;} \
		.purchases .bundle .keys .platform {margin:0 3px 3px;} \
		.purchases .bundle .keys .platform:after {content:none;} \
		.products .row {display:inline;} \
		.purchases .products {background:#000;margin:0;} \
		.purchases .product-box {background:#000;margin:0;padding:2px 0;width:33.333%;} \
		.purchases .product-box .purchase-info {display:block;margin:72px 10px 10px 86px;padding:0;} \
		.purchases .product-box .product {cursor:auto;float:left;height:64px;margin:68px 8px 6px;overflow:visible;} \
		.purchases .product-box .purchase-info a {display:block;margin-bottom:auto !important;} \
		.purchases .product-box .product .cover {border-radius:3px;width:64px;height:auto;min-height:64px;} \
		.purchases .product-box .product h3 {background:linear-gradient(rgba(255,255,255,0.1),rgba(0,0,0,0.1)),#fff;border-radius:3px 3px 0 0;bottom:auto;color:rgb(18,153,222);left:-8px;overflow:hidden;right:-247px;text-shadow:1px 1px rgba(0,0,0,0.1);top:-68px;} \
		.loading {float:none;text-align:center;}";
	if ( CONF.UseStoreFavicons ) {
		styles += ".platform.steam, .platform.desura, .platform.gog {float:left;height:16px;margin:3px !important;width:16px;} \
			.platform.steam {background:url('data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAADX09T/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB//X09T/CQYH/wkGB/8JBgf/fHx8/8XKx//Fysf/dXN0/xwbG/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/Xltd//////8cGxv/HBsb/8DVyP91c3T/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/Xltd/8DVyP9eW13/tra2/7a2tv8cGxv/wNXI/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/m6yh////////////////////////////HBsb//////8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/////////////////////////////////xwbG///////xcrH/xwbG/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB////////////////////////////xwbG/+5v7z/////////////////dXN0/wkGB/8JBgf/CQYH/wkGB/8JBgf///////////91c3T/dXN0/7m/vP//////////////////////////////////////j5aR/xwbG/8JBgf/CQYH/1FWU/8JBgf/CQYH/wkGB/8JBgf/HBsb////////////////////////////////////////////Xltd/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/+MjIz///////////+2trb/DQkM/w0JDP8NCQz/a29t//////8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/8DVyP//////DQkM/5usof//////m6yh/xwbG///////Xltd/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/9RVlP//////w0JDP////////////////8NCQz//////15bXf8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/HBsb//////8NCQz/m6yh//////+brKH/HBsb//////8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/xwbG//Fysf//////w0JDP8NCQz/DQkM///////Fysf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/UVZT/8XKx//////////////////Fysf/DQkM/wkGB//Y1tb/CQYH/wkGB/8JBgf/CQYH/wkGB/8JBgf/CQYH/wkGB/8cGxv/HBsb/1FWU/8cGxv/CQYH/wkGB//Y1tb/AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==')} \
			.platform.desura {background:url('data:image/x-icon;base64,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gP9DRET/Li4u/6Snp/+kp6f/Li4u/0NERP9/gID//////zI0NP8RERGvERERDw8PD9VbXFz//////zk5Of9MTU3/4eTj/0JDQv/x9fT/8fX0/0JDQv/h5OP/TE1N/zk5Of//////W1xc/w8PD9VERET//////zEyMv94eXn//////4CBgf8/QED///////////8/QED/gIGB//////94eXn/MTIy//////9ERET/DAwM//b4+P8pKir/7/Hx//////9jZGT/VFVV////////////VFVV/2NkZP//////7/Hx/ykqKv/2+Pj/DAwM/wwMDP//////qamp/x8fH/9ycnL/AAAA/1pbW////////////1pbW/8AAAD/cnJy/x8fH/97fHz//////wwMDP8PDw+mqqqq///////2+Pj/9vj4//b4+P8nJyj/i42N/4uNjf8nJyj/9vj4//b4+P/2+Pj//////6qqqv8PDw+mAAAAAA8PD6YpKSn/LS0t/x8fH/8QEBD//////ywsLP8sLCz//////xAQEP8fHx//LS0t/ykpKf8PDw+mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERh6mpqf///////////6mpqf8RERGHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARERHv4+Pj/+Pj4/8RERHvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERMAwMDOgMDAzoERERMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQEREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8P6xB+B+sQfAPrEHgB6xBwAOsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQYABrEH4H6xB/D+sQfw/rEH+f6xB')} \
			.platform.gog {background:url('data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTG4MTEx/y8vL/8wMDD/MTEx/zAwMP8vLy//Ly8v/zExMf8xMTH/MTEx/zExMf8xMTH/MTEx/zExMf8xMTG4MTEx/y0tLf8rKyv/LS0t/y4uLv8sLCz/Kysr/ysrK/8sLCz/Li4u/y0tLf8tLS3/LS0t/y4uLv8uLi7/MDAw/zAwMP8im8L/Ksb9/yrG/f8qQEf/I6LM/yrG/f8qxv3/IpvC/ywsLP8qxv3/KDQ3/yi+8f8sLCz/KL7x/y8vL/8wMDD/KMDq/yszNP8wMDD/Li4u/yrK9/8qNDb/KTY4/ynG8v8sLCz/K8/+/yczNv8pxvH/Kioq/ynG8v8vLy//MTEx/yrL6P8qLS3/LS0t/y4uLv8s1vT/Ki8w/yovMP8r0/L/Li4u/y3e/v8oOTz/LNX0/ykuL/8r0/L/MDAw/zIyMv8qydj/MOz//zDs//8sR0n/K8/f/zDs//8w7P//KsnY/zExMf8r0+T/MOz//zDs//8w7P//LuHz/zIyMv8yMjL/MDAw/y8vL/8vLy//MTEx/zIyMv8zMzP/MzMz/zMzM/8zMzP/MjIy/zAwMP8vLy//Ly8v/zExMf8yMjL/MTEx/y0tLf8rKyv/Kysr/ywsLP8xMTH/MzMz/zMzM/8zMzP/MzMz/zExMf8tLS3/Kysr/ysrK/8sLCz/MTEx/zExMf8et4P/HreD/x63g/8cmXD/Ly8v/zAwMP8vLy//Ly8v/zAwMP8wMDD/Hq9+/x63g/8et4P/HJdv/zAwMP8wMDD/LCws/ywsLP8rNDL/IcKQ/y0tLf8sLCz/Kysr/yoqKv8sLCz/Li4u/ywsLP8sLCz/KT03/yC5iv8vLy//Ly8v/yG0jv8l0aP/Kzg1/yXRo/8rKyv/IbSO/yXRo/8l0aP/Ir6V/ysuLf8hsIv/JMic/ys4Nf8kyJz/Ly8v/y8vL/8p4rn/KjUz/ywsLP8p4rn/LCws/yniuf8qMjH/KjIx/yjbtP8pNzT/KNex/yk9Of8pNzT/KNex/y8vL/8wMDD/LfLM/yk0Mv8pMjH/LfLM/y4uLv8t8sz/KTIx/ykxMP8s68b/Kzo3/yvmw/8oPjr/Jz05/yvmw/8xMTH/MjIy/yrYvP8w/dr/MP3a/yrYvP8xMTH/Kti8/zD92v8w/dr/LOXG/zAzM/8p0bb/MP3a/zD92v8q1Lj/MjIy/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8xMTG9MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8zMzP/MzMz/zMzM/8xMTG9AAAAAAAAAAAAAFQAAAAAAAAAW0gAAHQgAABjQgAAay0AAG8tAABsbwAAbF0AAFNlAABlcgAAYW4AAEJhAAAEAA==')}";
	}
	$( document.head ).append( "<style>" + styles + "</style>" );
	
	// Fixes page layout.
	var fixPage = function( page ) {
		// Fix covers.
		/*var fixCovers = function() {
			var cover      = $( this );
			var bgImage    = cover.css( "background-image" ).split( "\"" )[ 1 ];
			var newBgImage = $( "<img src=\"" + bgImage + "\" />" );
			cover.css( "background-image", "none" ).append( newBgImage );
		};
		$( "div.cover", page ).each( fixCovers );*/

		// Combine some games/album entries (eg: Steam and Desura keys, MP3 & FLAC downloads.)
		var bundleArticles = $( "article.bundle", page );
		var products = bundleArticles.find( ".product" )//, page );
		var mergeItems = function() {
			var elem       = $( this );
			var h3         = elem.children( "h3" );
			var title      = h3.text();
			//var cover      = elem.children( ".cover" ).css( "background-image" );
			var products   = elem.parents( ".products" ).find( ".product h3" );
			
			// Album formats.
			var albumTitle = title.replace( / \(?FLAC\)?/, "" );
			// var MP3Title   = products.filter( ":contains('" + albumTitle + "')" ).not( h3 );
			//var Regex      = new RegExp( "- " + albumTitle, "i" );
			var MP3Title   = products.filter( function() {
				var thisElem  = $( this );
				var thisTitle = thisElem.text();
				
				if ( ( albumTitle === thisTitle )
					|| thisTitle.toLowerCase().indexOf( "- " + albumTitle.toLowerCase() ) != -1 ) {
					return true;
				}
				
				return false;
			} ).not( h3 );
			var MP3Ver     = MP3Title.parent().next();
			if ( MP3Ver.length > 0 ) {
				var FLACVer   = elem.next();
				FLACVer.children( ":contains('Download')" ).text( "Download FLAC" );
				FLACVer.append( MP3Ver.contents() );
				h3.text( albumTitle );
				MP3Ver.parent().hide();
				return;
			}
			
			// Game keys.
			gameTitle      = title.replace( " (Steam)", "" );
			var desuraVer  = products.filter( ":contains('" + gameTitle + " (Desura)')" ).parent().next();
			if ( desuraVer.length > 0 ) {
				var steamVer  = elem.next().find( "ul.keys" );
				var desuraKey = desuraVer.find( "ul.keys li" );
				steamVer.append( desuraKey );
				h3.text( gameTitle );
				desuraVer.parent().hide();
				window.console.log( "Separate Desura key found: " + gameTitle );
				return;
			}
		};
		products.filter( ":contains('(Steam)'), :contains('FLAC')" ).each( mergeItems );
		
		// Expand non-gifted bundles.
		bundleArticles.addClass( "expanded" ).find( "div.short-info:contains('Gifted')" ).parents( "article.bundle" ).removeClass( "expanded" );

		// Hide "Pay $x more" blocks.
		$( ".body > h2", page ).hide().next().hide();
		
		// Hide announcement blocks.
		$( ".announcements", page ).hide();
		
		
		var platformSpans = $( "span.platform", page )
		var SteamKeys     = platformSpans.filter( ":contains('Steam')" );
		SteamKeys.parent().dblclick( function() {
			window.getSelection().removeAllRanges();
			var key = $( this ).children( ".key" ).text().trim();
			window.location = "steam://open/activatecode/" + key;
		} );
		// Add platform icons for keys.
		if ( CONF.UseStoreFavicons ) {
			SteamKeys.text( "" ).addClass( "steam" );
			platformSpans.filter( ":contains('Desura')" ).text( "" ).addClass( "desura" );
			platformSpans.filter( ":contains('GOG')" ).text( "" ).addClass( "gog" );
		}
		
		// Hide redundant authentication add links.
		if ( $( ".authorization.twitter" ).length > 0 ) {
			$( ".extra > .twitter" ).hide();
		}
		if ( $( ".authorization.facebook" ).length > 0 ) {
			$( ".extra > .facebook" ).hide();
		}
		if ( $( ".authorization.password" ).length > 0 ) {
			$( ".extra > .password" ).hide();
		}
	};
	fixPage( document );
	
	// Groupees bindings.
	var groupeesBindings = function( page ) {
		$(".bundle .expander").click(function(){$(this).parents(".bundle").first().toggleClass("expanded")});
		$(".bundle .actions .top-up.button").click(function(){var e=$(this).data("order"),t=$("#o"+e+"_new_order").parents(".purchase-form").first();return t.detach().appendTo($(this).parents(".actions").first()),t.show(),$(document).on("click.top-up",function(e){0!==t.has(e.target).length||t.is(e.target)||(t.hide(),$(document).off("click.top-up"))}),!1});
		$(".keys .key", page).click(function() {window.getSelection().selectAllChildren(this)});
		$(".purchases .product-box .product", page).click(function(){$(this).parents(".product-box").first().toggleClass("expanded")});
	};
	
	// Continuous scrolling.
	if ( CONF.ContinuousScroll ) {
		var pageMatch      = window.location.search.match( /page=([0-9]+)/ );
		var thisPage       = ( pageMatch ? pageMatch[ 1 ] : 1 );
		var lastPageLink   = $( "nav.pagination li:last-child a" ).attr( "href" );
		var lastPageMatch  = lastPageLink.match( /page=([0-9]+)/ );
		var lastPage       = lastPageMatch ? lastPageMatch[ 1 ] : thisPage;
		var endScrollPos   = $( "footer" ).offset().top - 128;
		var contentArticle = $( "body > article" );
		$( "nav.pagination" ).hide();
		
		var reachedEndNotice = $( "<nav class=\"loading\">You have reached the end.</nav>" );
		if ( ( lastPage > thisPage ) && ( contentArticle.length > 0 ) ) {
			var busy = false;
			var loadingBar = $( "<nav class=\"loading\"><img alt=\"Loading next page\" src=\"data:image/gif;base64,R0lGODlhEAAQAPQAAAcHB////wwMDMfHx319ffj4+NnZ2S0tLVpaWujo6IuLi5qamiAgIGpqaj09Pbe3t6qqqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==\" /></nav>" );
			var insertPage = function( page ) {
				var page = $( page );
				fixPage( page );
				groupeesBindings( page );
				loadingBar.hide();
				
				var bundles = $( "article.bundle", page );
				if ( bundles.length > 0 ) {
					bundles.appendTo( contentArticle );
					endScrollPos = $( "footer" ).offset().top - 128;
					busy = false;
				}
				
				if ( thisPage >= lastPage ) {
					contentArticle.append( reachedEndNotice );
				}
			};
			var loadNextPage = function( forced, loadAllPages ) {
				if ( forced || ( !busy && lastPage > thisPage ) ) {
					busy = true;
					
					contentArticle.append( loadingBar.show() );
					
					if ( loadAllPages ) {
						var callback = function( page ) {
							insertPage( page );
							
							if ( lastPage > thisPage ) {
								loadNextPage( false, true );
							} else {
								loadAllLink.parent().addClass( "active" ) 
							}
						}
					} else {
						var callback = insertPage;
					}
					
					thisPage++;
					$.get( window.location.pathname + "?page=" + thisPage, callback );
				} else {
					return false;
				}
			};
			var handleScroll = function() {
				//window.console.log( ( window.pageYOffset + window.innerHeight ), endScrollPos );
				if ( !busy && ( lastPage > thisPage ) && ( ( window.pageYOffset + window.innerHeight ) > endScrollPos ) ) {
					loadNextPage( true );
				}
			};
			$( window ).bind( "scroll", handleScroll );
			
			// "Load all" button.
			var loadAllLink = $( "<a href=\"#\" id=\"load-all-anchor\" title=\"Loads all purchase pages\"><span>LA</span></a>" )
			loadAllLink.click( function() {
				loadNextPage( false, true );
			} );
			$( "#main_nav li:last-child a" ).replaceWith( loadAllLink );
		}
		else {
			contentArticle.append( reachedEndNotice );
		}
	}
	
} )( jQuery );