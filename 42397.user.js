// ==UserScript==
// @name           Torrentz Download Links
// @description    Add direct download links to torrent links in the Torrentz Search Result Page
// @include        *torrentz.*/*
// @author	   abhimeetsu[AT]gmail[DOT]com
// ==/UserScript==

// Class for torrents links div is download
//alert("Exterme out!!");


var script_version = "20100709";


var downloadLocations = document.getElementsByClassName('download')[0];
var eventList = [];
var requestDownload = "#downloadThisDamnTorrent";

var torrentzDL = {
	
		init: function() {
				
				var dts = downloadLocations.getElementsByTagName( 'dt' );
				var urlRegex = /(https?):\/\/(www\.)?([\w\-\.]+)(\/.*)?/i;
				
				for (var index = 0; index < dts.length; index++)
				{
					var hrefAttributeValue = dts[index].getElementsByTagName("a")[0].href;
					
					var match = hrefAttributeValue.match(urlRegex);
						
					if (!match || !(match.length > 1))
						{
							continue;
						}
					
					var resp = this.convertTorrentURL( match[3], hrefAttributeValue );
					var classname, title, onclick = null;
					
					//alert(resp.hrefval);
					if( !resp.hrefval )
					{
						//unsupported
						classname = 'unsupported';
						title = "Direct download not supported";
					}
					else{
						if( resp.indirect ){
							// indirect
							classname = 'indirect';
							title = "Hack the Evil!!";
							onclick = this.OnClick_noDefault( this.indirectDownload,dts[index].getElementsByTagName("a")[0], resp.hrefval, hrefAttributeValue );
						}
						else{
							// direct
							classname = 'direct';
							title = "Direct download";
							onclick = this.OnClick_noDefault( this.OpenTorrent, dts[index].getElementsByTagName("a")[0], resp.hrefval );
						}
					}
				
					dts[index].getElementsByTagName("a")[0].parentNode.parentNode.setAttribute( 'class', 'download-' + classname );
					dts[index].getElementsByTagName("a")[0].setAttribute( 'title', title );
					if ( resp.hrefval && !resp.indirect ){
								/*var dllink = document.createElement("a");
								dllink.setAttribute("class","torrentz_dlimg");
								dllink.href = resp;
								dllink.target = "_blank";
								var dlimg = document.createElement("img");
								dlimg.src = "http://i363.photobucket.com/albums/oo73/abhishek_akj/online_tools/download-button-1.jpg";
								dllink.appendChild(dlimg);
								dts[index].nextSibling.appendChild(dllink);
								*/
								this.setOnClick( dts[index].getElementsByTagName("a")[0], onclick, index );
					}
				}
					
				GM_addStyle(
						'div.download > dl.download-direct' +
						'{ background: #e0e0ff; }' +
						'div.download > dl.download-search-ok' +
						'{ background: #cfc; }' +
						'div.download > dl.download-search' +
						'{ background: #eeb; }' +
						'div.download > dl.download-search-failed' +
						'{ background: #f99; }' +
						'div.download > dl.download-unsupported' +
						'{ background: #fcc; }' +
						'div.download > dl.download-indirect' +
						'{ background: #ff8; }' +
						'div.download > dl.download-get-all' +
						'{ background: #eee; }' +
						'.download-invisible' +
						'{ width: 0; height: 0; border: 0; }' +
						'.torrentz_dlimg' +
						'{ border: 0; margin-left: 1.2em; margin-top:-10px; position:absolute; }'
						);
					
					
				if ( index > 1 ) {
					var dl = document.createElement( 'dl' );
					var dt = document.createElement( 'dt' );
					dl.appendChild( dt );
					var dd = document.createElement( 'dd' );
					dl.appendChild( dd );
					var a = document.createElement( 'a' );
					dt.appendChild( a );
					dl.setAttribute( 'class', 'download-get-all' );

					var span = document.createElement( 'span' );
					span.setAttribute( 'class', 'u' );
					span.appendChild( document.createTextNode( "get all !" ) );
					a.appendChild( span );

					span = document.createElement( 'span' );
					span.setAttribute( 'class', 'n' );
					span.appendChild( document.createTextNode( "Download" ) );
					a.appendChild( span );
					a.appendChild( document.createTextNode( " all the torrents" ) );

					a.setAttribute( 'href', '#' );
					a.addEventListener( 'click', this.OnClick_noDefault( this.getAll, index ), false );

					downloadLocations.insertBefore( dl, downloadLocations.lastChild );
				}
				//downloadLocations.appendChild( div );	
			
		},
			
		convertTorrentURL: function(host, href){
								
				function toReturn(){
					this.indirect = false;
					this.hrefval = null;
				}
				
				return_val = new toReturn();
				
				switch( host.toLowerCase() ){
					
				case "mininova.org":
						return_val.indirect = true;
						return_val.hrefval = href.replace(/\/tor\//,'/get/');
						break;
						
				case "thepiratebay.org":
						return_val.hrefval = href.replace(/.*?\/(\d+)\/(.*)/,"http://torrents.thepiratebay.org/$1/$2.TPB.torrent");
						break;
						
				case "vertor.com":
						return_val.hrefval = href.replace(/.*?\/torrents\/(\d+)\/.*/,"http://www.vertor.com/index.php?mod=download&id=$1");
						break;
						
				case "h33t.com":
						return_val.hrefval = href.replace(/.*\/details.php?id=(\w+)&.*/,"http://www.h33t.com/download.php?id=$1&f=$1.torrent");
						break;
						
				case "mybittorrent.com":
						return_val.hrefval = href.replace(/\/info\//,'/dl/');
						break;
						
				case "rarbg.com":
						return_val.hrefval = href.replace(/.*?\/download\/(\w+)\/torrent\.html/,"http://www.rarbg.com/download.php?id=$1&f=$1.torrent");
						break;
						
				case "coda.fm":
						return_val.hrefval = href+"/torrent/download";
						break;
						
				case "fulldls.com":
						return_val.hrefval = href.replace("/torrent-","/download-").replace(".html","-File.torrent");
						break;
						
				case "newtorrents.info":
						return_val.hrefval = href.replace(/.*\/torrent\/(\d+?)\/.*/,"http://www.newtorrents.info/down.php?id=$1");
						break;
						
				case "btmon.com":
						return_val.hrefval = href.replace(/(\.html)$/,'');
						break;
						
				case "fenopy.com":
						return_val.hrefval = href.replace(/\+/,'_') + "==/download.torrent";
						break;
				
				case "torrenthound.com":
						return_val.hrefval = href.replace(/.*\/hash\/(.*)\/torrent-info\/.*/,'http://www.torrenthound.com/torrent/$1');
						break;	
				
				case "btjunkie.org":
						return_val.indirect = true;
						return_val.hrefval = href.replace(/.*\/torrent\/(.*)/,'http://dl.btjunkie.org/torrent/$1/download.torrent');
						break;	
				
				case "yourbittorrent.com":
						return_val.hrefval = href.replace(/.*\/torrent\/(.*)\/.*/,'http://www.yourbittorrent.com/down/$1.torrent');
						break;

				case "bittorrent.am":
						return_val.hrefval = href.replace(/.*\/torrent\/(\d+)\/\d+\/\d+\/(.*)\.html/,'http://www.bittorrent.am/get/$1/$2.torrent');
						break;
				
				case "torrentreactor.net":
						return_val.hrefval = href.replace(/.*\/torrents\/(\d+)\/(.*)/,'http://dl.torrentreactor.net/download.php?id=$1&name=$2');
						break;

				case "extratorrent.com":
						return_val.hrefval = href.replace(/\/torrent\/(\d+\/.*).html/,'/download/$1.torrent');
						break;

				case "torrentdownloads.net":
						return_val.hrefval = href.replace(/\/torrent\//,'/download/');
						break;

				case "alivetorrents.com":
						return_val.hrefval = href.replace(/\/torrent\/(\d+)\/.*/,'/dl/$1');
						break;						
				
				}
				return return_val;
				
			},
			
		setOnClick: function( a, onclick, index ) {
				// remove old and set new onclick handler
				if ( eventList[ index ] )
					{
						a.removeEventListener( 'click', eventList[ index ], false );
					}
				if ( onclick ) {
					eventList[ index ] = onclick;
					a.addEventListener( 'click', onclick, false );
				}
			},

		getAll: function( max, ignore1, ignore2, event ) {
				// execute all the handlers
				for ( var i = 0; i < max; i++ ) {
					var onclick = eventList[i];
					if ( onclick ){
						onclick( event );
					}
				}
			},

		OnClick_noDefault: function( func, arg1, arg2, arg3 ) {
				// return function to use as onclick handler
				return function( event ) {
					event.preventDefault();
					func( arg1, arg2, arg3, event );
				};
			},

		OpenTorrent: function( a, link ) {
				// open torrent in iframe
				var p = a.parentNode;
				var iframe;
				iframe = p.getElementsByTagName( 'iframe' );
				if ( iframe && iframe.length > 0 ) {
					iframe = iframe[0];
				} else {
					iframe = document.createElement( 'iframe' );
					iframe.setAttribute( 'class', 'download-invisible' );
					p.appendChild( iframe );
				}
				
				var noReferrerLink = 'data:text/html,' + encodeURIComponent( '<html><head><script> document.location="' + link + '"</script></head></html>' );
				iframe.setAttribute('src', noReferrerLink );
			},
				
		// for evil pages which need to be redirected to the torrent from it's own site
		indirectDownload: function( a, torrentURL, hostURL ) {
			
			(function(){document.location.href = torrentURL;}).call( document);
			
		},
		
	
};

torrentzDL.init();
