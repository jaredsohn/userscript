// ==UserScript==
// @name           Tela Thumbnail
// @namespace      http://tela-botanica.org/greasmonkey
// @description    Adds image thumbnail images to tela search results
// @include        http://www.tela-botanica.org/*
// ==/UserScript==

(function () {

	var tela_thumbnails = {

		config: {
		},

		result_link_xpath: "//ol/li/a[@href]|//ol/li/strong/a[@href]",
		
		
		addCSS: function( css ) {
			var head = window.document.getElementsByTagName( "head" )[0];
			var style = window.document.createElement( "style" );
			style.setAttribute( "type", "text/css" );
			style.innerHTML = css;
			head.appendChild( style );
		},

		
		addThumbnails: function() {
			var results = document.evaluate( this.result_link_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

			for( var result_link = null, i = 0; ( result_link = results.snapshotItem( i ) ); i++ ) {
				// create the thumbnail <IMG> and surrounding <A> elements
				var thumbnail = document.createElement( "span" );

				var result_url = result_link.getAttribute( "href" );
				var nn = result_url.replace( /^.*\/([0-9][0-9]*)$/ ,"$1");
		
				//unsafeWindow.console.log(nn);
				//var thumb_url = "http://www.tela-botanica.org/client/eflore_chatin/services/vignette/eflore/bdnff/4.02/nn/"+nn+"/miniature";
				
				//http://localhost/eflore_bp/consultation/services/vignette/eflore/bdnff/4.02/nn/2871/miniature
			//	var thumb_url = "http://localhost/eflore_bp/consultation/services/vignette/eflore/bdnff/4.02/nn/"+nn+"/miniature";
			
				//var thumb_url = "http://localhost/eflore_bp/consultation/services/vignette/photoflora/nn/"+nn+"/miniature";
				var thumb_url = "http://www.tela-botanica.org/client/eflore_chatin/services/vignette/photoflora/nn/"+nn+"/miniature";
						
			
				thumbnail.innerHTML = 
					'<a href="' + result_url + '">' +
						'<img src="' + thumb_url + '" align="left"  class="thumbnail'  + '" style="background: url('+thumb_url+') no-repeat center;"/>' +
					'</a>';
					

				result_link.parentNode.appendChild(thumbnail);
			}
		}
	}

	tela_thumbnails.addCSS( ".thumbnail {border: 1px solid #AAA;  margin: 0 6px 8px 0;   }" );
	tela_thumbnails.addCSS( "#texte li {display:table}" );
	
	tela_thumbnails.addThumbnails();

})();
