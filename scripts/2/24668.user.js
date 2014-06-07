// ClickNextPage user script
// version 0.7 BETA!
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ClickNextPage", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ClickNextPage
// @namespace     http://blog.elleryq.idv.tw
// @description   Find and click "NextPage" in the page.
// @include       http://www.9lala.com/Html/*
// @include       http://www.17kk.net/intro_view/*
// @include       http://www.2comic.com/page/*
// @include       http://www.fzdm.com/manhua/*
// ==/UserScript==

function Nothing() {
	return null;
}

document.addEventListener('keyup', function(event) {
	// var srcElement = event.srcElement ? event.srcElement : event.target;
	var currentDomainName=window.location.host;

	var hosts = [
		{
			domainName: "www.9lala.com", 
			next: function() { 
				this.findAndClick( "\u005b\u4e0b\u4e00\u9875\u005d" );
			}, 
			prev: function() {
				this.findAndClick( "\u005b\u4e0a\u4e00\u9875\u005d" );
			},
			findAndClick: function( keyword ) {
				var element = document.getElementById("hot5").nextSibling.firstChild;
				while( element!=null ) { 
					if( element!=undefined && element.nodeName=="A" && element.innerHTML!=undefined ) {
						var str = element.innerHTML;
						if( str==keyword ) {
							break;
						}
					}
					element=element.nextSibling; 
				}
				if( element!=null )
					document.location = element.href;
			}
		},
		{
			domainName: "www.fzdm.com",
			next: function() { 
				this.findAndClick( "\u4e0b\u4e00\u9875" );
			}, 
			prev: function() {
				this.findAndClick( "\u4e0a\u4e00\u9875" );
			},
			findAndClick: function( keyword ) {
				var element = document.getElementById("ad").nextSibling;
				while( element!=null ) { 
					if( element!=undefined && element.nodeName=="STRONG" && element.firstChild.nodeName=="A" && element.firstChild.innerHTML!=undefined ) {
						var str = element.firstChild.innerHTML;
						if( str==keyword ) {
							break;
						}
					}
					element=element.nextSibling; 
				}
				if( element!=null )
					document.location = element.firstChild.href;
			}
		},
		{
			domainName: "www.17kk.net",
			next: function() {
				this.findAndClick( "\u4e0b\u9875" );
			},
			prev: function() {
				this.findAndClick( "\u4e0a\u9875" );
			},
			findAndClick: function( keyword ) {
				var element = document.getElementById("vidwPage").firstChild;
				while( element!=null ) { 
					if( element!=undefined && element.nodeName=="A" && element.innerHTML!=undefined ) {
						var str = element.innerHTML;
						if( str==keyword ) {
							break;
						}
					}
					element=element.nextSibling;
				};
				if( element!=null )
					document.location = element.href;
			}
		},
		{
			domainName: "www.2comic.com", 
			next: function() {
				window.location="javascript: jumpnext()";
			},
			prev: function() {
				window.location="javascript: jumpprev()";
			}
		},
		{
			domainName: "",
			next: Nothing,
			prev: Nothing
		}
	];
	
	if( !event.shiftKey && !event.altKey && !event.ctrlKey ) {
		var hostsLen = hosts.length;
		var obj=hosts[ hostsLen-1 ];
		for( var i=0, len=hostsLen-1; i<len; i++ ) {
			if( currentDomainName == hosts[i].domainName ) {
				// alert("got it!"); // debug
				obj = hosts[i];
				break;
			}
		}
		switch( event.keyCode )
		{
			case 67: // 'c'
			case 74: // 'j'
				obj.next();
				break;
			case 75: // 'k'
			case 88: // 'x'
				obj.prev();
				break;
		}
	}
}, true);
