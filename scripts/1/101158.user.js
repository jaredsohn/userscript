// ==UserScript==
// @name = "My Missed Shows - torrentz.com";
// @description = "Eliminate steps when downloading torrents from torrentz.com using MyMissedShows.com";
// ==/UserScript==



var script_version = "20110411";
var downloadLocations = document.getElementsByClassName('download')[0];
var eventList = [];
var requestDownload = "#downloadThisDamnTorrent";

var myMissedShows = {
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
						'{ background: #D1EAC3; padding:3px 8px; }' +
						'div.download > dl.download-search-ok' +
						'{ background: #cfc; }' +
						'div.download > dl.download-search' +
						'{ background: #eeb; }' +
						'div.download > dl.download-search-failed' +
						'{ background: #f99; }' +
						'div.download > dl.download-unsupported' +
						'{ background: #fcc; display:none; }' +
						'div.download > dl.download-indirect' +
						'{ background: #ff8; display:none; }' +
						'div.download > dl.download-get-all' +
						'{ background: #eee; display:none; }' +
						'.download-invisible' +
						'{ width: 0; height: 0; border: 0; }' +
						'.torrentz_dlimg' +
						'{ border: 0; margin-left: 1.2em; margin-top:-10px; position:absolute; }'+
						'.top h1, .info, .download p, .feedback, .trackers, .files, .comments, .profile, .results, .help, .footer, .search, fieldset, div div' +
						'{ display:none !important; }'+
						'div ' +
						'{ color:#fff !important; font-size:11px !important; }'+
						'div span, div a, h2 span' +
						'{ color:#000 !important; text-decoration:none !important; font-size:11px !important;}'+
						'h2' +
						'{ font-size:0px !important; border-bottom:none !important; line-height:24px !important; }'+
						'.top' +
						'{ background:url(http://mymissedshows.com/images/logo.png) 28px 10px no-repeat #336699 !important; height:95px !important; }'+
						'div.top > ul' +
						'{ background:none !important;  }' +
						'div.top > ul a' +
						'{ color:#fff !important; }'
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
						
				case "torrenthound.com":
						return_val.hrefval = href.replace(/.*\/hash\/(.*)\/torrent-info\/.*/,'http://www.torrenthound.com/torrent/$1');
						break;	
				
				case "yourbittorrent.com":
						return_val.hrefval = href.replace(/.*\/torrent\/(.*)\/.*/,'http://www.yourbittorrent.com/down/$1.torrent');
						break;

				case "bittorrent.am":
						return_val.hrefval = href.replace(/.*\/torrent\/(\d+)\/\d+\/\d+\/(.*)\.html/,'http://www.bittorrent.am/get/$1/$2.torrent');
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

myMissedShows.init();
