// ==UserScript==
// @name           Flickr Lightbox
// @namespace      http://www.flickr.com
// @description    Lightbox zoom for photos on Flickr
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

window.LB = {
	the_image: false,
	lightbox_div: false,
	backdrop: false,
	lightbox_visible: false,
	visible: false,
	loaded: false,
	initialised: false,
	scrolltop: 0,

	show: function () {
					var LB = window.LB;
					LB.visible = true;
					if ( !LB.initialised ) {
						LB.init();
					} else {
						if ( LB.loaded ) {
							LB.scrolltop = document.body.scrollTop;
							if ( LB.lightbox_visible )
								document.body.style.overflow = 'hidden';
							if ( LB.backdrop ) 
								LB.backdrop.style.display = '';
							document.body.scrollTop = 0;
							if ( LB.lightbox_div ) 
								LB.lightbox_div.style.display = '';
							if ( !LB.lightbox_visible )
								window.setTimeout(LB.hide, 1000);
						}
					}
				},

	hide: function () {
					var LB = window.LB;
					LB.visible = false;
					if ( LB.loaded ) {
						if ( LB.lightbox_visible )
							document.body.style.overflow = 'auto';
						if ( LB.lightbox_div ) 
							LB.lightbox_div.style.display = 'none';
						if ( LB.backdrop ) 
							LB.backdrop.style.display = 'none';
						document.body.scrollTop = LB.scrolltop;
					}
				},

	getTitle: function () {
							var el = document.getElementsByTagName('h1');
							for ( var i in el )
								if ( el[i].id.match(/^title_/) )
									return el[i].innerHTML;
							return '';
						},

	getDescription: function () {
										var el = document.getElementsByTagName('div');
										for ( var i in el )
											if ( el[i].id.match(/^description_/) )
												return el[i].innerHTML;
										return '';
									},

	init: function () {
					var LB = window.LB;
					
					LB.initialised = true;
				
					var first_element = document.body.childNodes[0];

					LB.backdrop = document.createElement('div');
					LB.backdrop.style.display = 'none';
					LB.backdrop.style.background = '#000'
					LB.backdrop.style.position = 'static';
					LB.backdrop.style.top = '0';
					LB.backdrop.style.left = '0';
					LB.backdrop.style.width = '100%';
					LB.backdrop.style.height = '10000px';
					first_element.parentNode.insertBefore(LB.backdrop, first_element);

					LB.lightbox_div = document.createElement('div');
					LB.lightbox_div.style.display = 'none';
					LB.lightbox_div.style.position = 'absolute';
					LB.lightbox_div.style.top = '50%';
					LB.lightbox_div.style.left = '50%';
					LB.lightbox_div.style.marginLeft = '-100px';
					LB.lightbox_div.style.marginTop = '-100px';
					LB.lightbox_div.style.padding = '0';
					LB.lightbox_div.style.textAlign = 'left';
					document.body.appendChild(LB.lightbox_div);
				
					LB.zoom_image = document.createElement('img');
					LB.zoom_image.style.border = '1px solid #666'
					LB.zoom_image.addEventListener("load", LB.imgLoaded , false);
					LB.zoom_image.src = LB.the_image.src.replace(/\.jpg/, '_b.jpg');

				},

	imgLoaded: function () {
							var LB = window.LB;
							var w = LB.zoom_image.width;
							var h = LB.zoom_image.height;
							var has_hires = ( w == 1024 || h == 1024 );
							
							// var show_lightbox = has_hires;
							var show_lightbox = true;
							
							if ( show_lightbox ) {
							
								if ( !has_hires && LB.zoom_image.src != LB.the_image.src ) {
									LB.zoom_image.src = LB.the_image.src;
									return;
								}
							
								LB.lightbox_visible = true;

								var max_h = 760;							
								if ( h > max_h ) {
									w = parseInt(w/h * max_h);
									h = max_h;
									LB.zoom_image.style.width = w + 'px'; 
									LB.zoom_image.style.height = h + 'px'; 
									LB.zoom_image.style.margin = '10px 0';
									var correction = 30;
								} else {
									LB.zoom_image.style.margin = '20px 0';
									var correction = 60;
								}
							
								var title_html = LB.getTitle();
								title = document.createElement('p');
								title.innerHTML = title_html;
								title.style.color = '#777';
								title.style.fontSize = '14pt';
								title.style.fontWeight = 'bold';
								title.style.padding = '0';
								title.style.margin = '0';
								LB.lightbox_div.appendChild(title);
			
								desc = document.createElement('p');
								desc.innerHTML = LB.getDescription();
								desc.style.color = '#888';
								desc.style.fontSize = '9pt';
								desc.style.width = w + 'px';
								desc.style.padding = '0';
								desc.style.margin = '0';
								LB.lightbox_div.appendChild(desc);
								
								if ( !has_hires ) {
									msg = document.createElement('span');
									msg.innerHTML = '(no hires)';
									msg.style.color = '#888';
									msg.style.fontSize = '7pt';
									msg.style.width = w + 'px';
									msg.style.padding = '0 0 0 10px';
									msg.style.margin = '0';
									title.appendChild(msg);
								}

								LB.lightbox_div.style.marginTop = parseInt(-h/2 - correction) + 'px';
								LB.lightbox_div.style.marginLeft = parseInt(-w/2) + 'px';
								LB.lightbox_div.appendChild(LB.zoom_image);
								LB.lightbox_div.addEventListener("click", LB.hide, false);

							} else {
								LB.lightbox_visible = false;
								LB.lightbox_div = false;
								LB.backdrop.style.position = 'absolute';
								LB.backdrop.style.width = '80px';
								LB.backdrop.style.height = '20px';

								desc = document.createElement('p');
								desc.innerHTML = 'no highres';
								desc.style.color = '#fff';
								desc.style.fontSize = '8pt';
								desc.style.fontWeight = 'bold';
								desc.style.padding = '3px';
								desc.style.margin = '0';
								LB.backdrop.appendChild(desc);
							}
							LB.loaded = true;
							if ( LB.visible ) {
								LB.show();
							}
						},

	run: function() {
					var LB = window.LB;
					var match = document.location.href.match(/photos\/[^\/]+\/([0-9]+)\/{0,1}/);
					if ( match ) {
						LB.photo_id = match[1];
						LB.findImage();
					}
				},

	findImage: function() {
								var LB = window.LB;
								var div = document.getElementById('photoImgDiv' + LB.photo_id);
								if ( div ) {
									var i = 0;
									while ( i < div.childNodes.length ) {
										if ( div.childNodes[i].tagName == 'IMG' ) {
											LB.the_image = div.childNodes[i];
											break;
										}
										i++;
									}
									div.addEventListener("click", LB.show, false);
								} else {
									window.setTimeout(LB.findImage, 500);
								}
						 }
	
};

window.LB.run();
