// ==UserScript==
// @name           YetAnother PChome Album Expand
// @namespace		http://userscripts.org/users/59045
// @description    Expand PChome Album
// @include        http://photo.pchome.com.tw/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version			0.6.4.1
// @creator			Filitov Chang
// ==/UserScript==

/*
Changelog
0.6.4.1:
	fix: slideshow query parameter
0.6.4:
	new: url match pattern
	fix: uncheck auto expend not functional
0.6.1:
	fix: hide manual load at fetching index page
0.6.0:
	new: pagination, autopage
	new: image loading indication
	fix: lift z-index of indication region to 9999
*/

var fiYaAP = {
	imgPerPage: 50,

	photoUser: '?',
	photoUserPage: -1,
	photoAlbum: -1,
	photoAlbumPage: -1,
		
	enableAutoPage: true,
	indexPageUrl: null,
	indexPageLoaded: false,
	
	checkDiv: null,
	imgDiv: null,
	
	imgLinks: [],
	imgLinkIdxs: {},

	imgRendering: 0,
	imgRendered: 0,
	
		
	add: function(iSrc, iHref, iAlt, iTitle, iDesc) {
		var idx = this.imgLinks.push({
			src: iSrc,
			href: iHref,
			alt: iAlt,
			title: iTitle,
			description: iDesc
		});
		this.imgLinkIdxs[iSrc] = idx-1;
	},
		
	watchScorll: function(){
			if( fiYaAP.imgRendering < fiYaAP.imgLinks.length ){
				if( fiYaAP.imgRendering-fiYaAP.imgRendered<5 ){
					// code notice: original from Pierre's Flickr Auto Page
					try{
						var sc = document.documentElement.scrollTop;
						var wh = window.innerHeight ? window.innerHeight : document.body.clientHeight;
						var total = (document.body.scrollHeight - wh);
						var remain = total - sc;
			    	
						if(remain < 300){
							fiYaAP.renderImageMore();
						}
					}catch(e){
					}
					// end code notice
				}
				setTimeout( fiYaAP.watchScorll, 200 );
			}
	},

	renderImageMore: function(){
		if( this.imgRendering < this.imgLinks.length )
			$('#fiYaAPLoading').show();
		for(var i=0; i < this.imgPerPage && this.imgRendering < this.imgLinks.length; i++, this.imgRendering++ ){
			this.imgDiv
				.append(
					'<strong>' + this.imgLinks[ this.imgRendering ].title + '</strong><br/>' +
					this.imgLinks[ this.imgRendering ].description + '<br/>'
				)
				.append(
					$('<img>')
						.attr('src', this.imgLinks[ this.imgRendering ].src )
						.attr('alt', this.imgLinks[ this.imgRendering ].alt )
						.load(function(){
							fiYaAP.imgRendered++;
							$('#fiYaAPLoadNum').html( fiYaAP.imgRendered );
							if( fiYaAP.imgRendered >=  fiYaAP.imgRendering )
								$('#fiYaAPLoading').hide();
						})
						.error(function(){
							fiYaAP.imgRendered++;
							$('#fiYaAPLoadNum').html( fiYaAP.imgRendered );
							if( fiYaAP.imgRendered >=  fiYaAP.imgRendering )
								$('#fiYaAPLoading').hide();
						})
				)
				.append( '<br/>' );
		}
	},
	
	fetchIndexPage: function(){
		if( !this.indexPageUrl || this.indexPageLoaded ) return;
		this.indexPageLoaded = true;
		$('#fiYaAPManualLoading').hide();
		$('#fiYaPaNum').show();

		$.get( this.indexPageUrl, function(data){
			$('photo',data).each(function() {
				fiYaAP.add( $('img_src',this).text(), null, $('title',this).text(), $('title',this).text(), $('description',this).text() );
			});

			$('#fiYaAPTotalNum').html( fiYaAP.imgLinks.length );
			
			if( fiYaAP.imgLinks.length>0 ){
				fiYaAP.renderImageMore();
				setTimeout( fiYaAP.watchScorll, 200 );
			}
  		});
  		
	},
	
	init: function() {
		var matches = /^\/([^\*\/]+)(?:\*?(\d+))?(?:\/([^\*\/]+)(?:\*(\d+))?)?\/?$/.exec(document.location.pathname);
		fiYaAP.photoUser = matches[1];
		fiYaAP.photoUserPage = matches[2] || 1;
		fiYaAP.photoAlbum = matches[3];
		fiYaAP.photoAlbumPage = matches[4] || 1;

		if( !fiYaAP.photoAlbum ) return;
		
		matches = /^(\d)\d+$/.exec(fiYaAP.photoAlbum);
		if( !matches || !matches[1] || matches[1]==1 ) return;
		
		var slidepathcheck = /\"\/slideshow\/photo.html\?query=([^&\"\']+)\"/.exec($('head').html());
		if( !slidepathcheck || !slidepathcheck[1] )
			return;
		fiYaAP.indexPageUrl = '/slideshow/photo.slideshow.xml2.php?query='+ slidepathcheck[1];
		
		fiYaAP.enableAutoPage = GM_getValue('fiYaPaAEEnable', true);
		
		fiYaAP.imgDiv = $("<div>")
			.css({textAlign:"center"})
			.appendTo("body");
		
		fiYaAP.checkDiv = $("<div>")
			.css({ zIndex:"9999", position:"fixed", overflow:"none", top:"50px", left:"0", width:"3.5em", fontSize:"10pt", border:"1px solid black", padding:"0", margin:"0"})
			.ajaxStart(function(){ $('#fiYaAPLoading').show(); })
			.ajaxStop(function(){ $('#fiYaAPLoading').hide(); })
			.append(
				$("<div>")
					.css({ display:"block", backgroundColor:"white", opacity:"0.4", color:"black",textAlign:"center", borderBottom:"1px solid black", padding:"0", margin:"0" })
					.append("<label for=\"fiYaPaAE_autoExpendCheck\">Auto<br/>Expand</lable")
					.append(
						$("<input type='checkbox'>")
							.attr('id','fiYaPaAE_autoExpendCheck')
							.attr('checked',fiYaAP.enableAutoPage)
							.click( function () {
								if( this.checked ){
									if( !fiYaAP.enableAutoPage && !fiYaAP.indexPageLoaded )
										fiYaAP.fetchIndexPage();
									fiYaAP.enableAutoPage = true;
									GM_setValue('fiYaPaAEEnable', true);
								}else{
									fiYaAP.enableAutoPage = false;
									GM_setValue('fiYaPaAEEnable', false);
								}
							})
					)
			)
			.append(
				$("<div>")
					.attr('id', 'fiYaPaNum')
					.css({ display:"block", backgroundColor:"white", opacity:"0.4", color:"black",textAlign:"center", borderBottom:"1px solid black", padding:"0", margin:"0" })
					.append( $('<span>').attr( 'id', 'fiYaAPLoadNum' ).html('0') )
					.append('<br/>of<br/>')
					.append( $('<span>').attr( 'id', 'fiYaAPTotalNum' ).html('?') )
					.hide()
			)
			.append(
				$("<div>")
					.attr('id', 'fiYaAPLoading')
					.css({ display:"block", backgroundColor:"white", opacity:"0.4", color:"black",textAlign:"center", borderBottom:"1px solid black", padding:"0", margin:"0" })
					.html( 'Load..' )
					.hide()
			)
			.appendTo("body");

		if( fiYaAP.enableAutoPage ){
			fiYaAP.fetchIndexPage();
		}else{
			fiYaAP.checkDiv.append(
				$("<div>")
					.attr('id', 'fiYaAPManualLoading')
					.css({ display:"block", cursor:"pointer", backgroundColor:"white", opacity:"0.4", color:"black",textAlign:"center", borderBottom:"1px solid black", padding:"0", margin:"0" })
					.html( 'Click<br/>to<br/>Load' )
					.click( function () {
						fiYaAP.fetchIndexPage();
					})
			);
		}

	},
	
	nothing: null
};//fiYaAP



$(document).ready( fiYaAP.init );