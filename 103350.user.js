// ==UserScript==
// @name        AmePlus
// @namespace   http://akr.tw/
// @description Extends features of Ameba and other Japanese BSPs.
// @author      akira@Taiwan
// @version     1.5
// @license     MIT License
// @source      http://userscripts.org/scripts/show/103350
// @include     http://ameblo.jp/*
// @include     http://gree.jp/*
// @include     http://blog.oricon.co.jp/*
// @include     http://yaplog.jp/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACXBIWXMAAAsSAAALEgHS3X78AAACNFBMVEX///8AJQAAKQAAKgAAOQAAWwAAFgAAGgAANAAANAAAawAAawAAbAAAlwAAmAAAlwAAkQAAkgAAkwAAmQAAmQAAmQAAmQAAmQAAmQAAmAAAmQABmQECmQECmQIDmQIDmQMDmgIDmgMEmgMEmgQEmwMFmgQFmgUFmwQFmwUGmgUGmwUHnAUHnAYJnAgKnQgMnQsOng1OvDZPvThmyFRoyVdpyVduzzxy0UB200V51Up700980G990lh+0XJ+10+A1FWB1lWC1FyC1VeC2VWE1VyF2FmG21qI2V6J12CL3WCM2WWM3GKN1IeO1IiP22mP4GaQ3meQ4GaS3G2T32yU4myV3nCY4XKZ4HWZ5HKc4Xmc43ee5nmf53qg436g5Xyh5n6j5Iaj6X+k5IKm6IOn5oio64Wp6Yep6Yir6I2r6JCs6oys7Iut7Iut7Iyt7Yyu6Y+w7JGx7ZKx7pGy7JS27Zu275i28Je28Ji58J6676C68p298aW+8qO+86O/86PB8qrC86jD8q/D9anF867G9a3H9q7H967J87fJ9LPL9rXL97PL97TN97fO+bnP97nP+LnP+bnS97/S+MDS+b3S+r7T+L/U+sDV+cPV+8LX+sXY+cfY+sjZ/Mfa+sva+8nb/Mrc/Mrd+8/d/M3e/c7f+9Lf/NDg+dbh+Njh+9Xh/dLi/dTj/Nfj/Njj/tXk/dfl/Nrl/tjm/trn/Nzn/tzo/tzo/t3q/eLq/+Dr/+Dr/+Hs/+Lu/+XnmwymAAAAGXRSTlMAAgMDBgsMDCIjbW5uuLm6xMTF6uvs+fr+GL4dFAAAAoNJREFUSMfNVTtu3DAQfTOURGnXsREDTpcmVY7gKgfIEbbNAXKitD6CzxAk6dOlMRDAMRDDMXZX/M2kEKlda4GVS7MSST3OvDePQ+DFDTpYscY0BgCQfEpuFtB2lseJuG0/2a8m86btoM0SAHTjuVPxxwF1izdvV2cAgIermz9tmADMBLCw+v5zR8zMvLj8+ZunLHiCb9CukvPee+9dXLVozNGUiGFPUiqzk9oxHeegQNIRIIDOqAQgaSyAdLh7CJDIfi/CPIBjPljBegRABgCIgERxTI5BVA2fTwA7/xhIHAGsAvP6qa+qA/+wSMwpEY1HVlYc9XnatB207kCJKZk6ZpUSDFk1CSbBbEL2FQFYvuKL049LQAlKqPswGisoKUhB6+t/d/K4HgBnS323cqOE6qnUsBnLzPbqF60fBsBFXX1q3cxNs/2XGO4GDozOhoiS0p5LAOSUlK2NnEkrEFKciRB1OKLKdkjp+P9aqp4rHVOYifAUIJIcKwtY9jpAriNYwMlkJ1ZD5wjJz0RodJC0AiDGr+0caV17SAb4Ov740MUiaHTFmWSLmbUy3yP53DWqhu3NeU15LHzQYdSnqSxuv4Wt9GFIyy5bqGkyxcWl35Se03zdZNJ9IvRrN6TkWC1Lv7ujgfNHtRlXSVzviqxbCdxwVo1DLIrZwMCghngJuwsE58AMAHRu9qqeoiDd61Cp6Z0eVioFZAcQQDXOdA2VUGwSan1Gm0GKBRCf1cg0io56zUcgIAYdUzp8oqopARO3Y8PjbYTo0QdF60brU4CZmW379xH99nhKUdjdLhcAgP7WQ+IMh+jbe1A9UFDAzwEcq2X147Pbu/mHvS6+Gv3zwsd/LWdSSUL4MFMAAAAASUVORK5CYII%3D
// ==/UserScript==

function AmePlus(){
	var self = this;
	
	this.version = 1.5;
	this.blogs = {
		ameba: {
			url: '//ameblo.jp/',
			selectors: {
				header: '#header',
				entry: {
					title: 'div.entry h3.title',
					date: 'div.entry span.date',
					body: 'div.entry div.contents',
					link: 'div.entry div.foot a[href*="entry-"]',
					commentLink: 'div.entry div.foot a[href*="#cbox"]',
					photo: 'div.entry a[href*="/image-"] img'
				},
				prevLink: 'div.page a.previousPage',
				nextLink: 'div.page a.nextPage'
			},
			photo: {
				regex: /^http:\/\/(.+)\/t\d+_(\d+)\.(\w+)$/,
				replace: 'http://$1/o$2.$3'
			}
		},
		gree: {
			url: '//gree.jp/',
			selectors: {
				header: 'img.portrait',
				entry: {
					title: 'div.blog-entry h1.title',
					date: 'div.blog-entry span.timestamp',
					body: 'div.blog-entry div.body',
					link: 'div.blog-entry div.footlink a[href*="#comment-box"]',
					commentLink: 'div.blog-entry div.footlink a[href*="#comment-box"]',
					photo: 'div.blog-entry a img'
				},
				prevLink: 'div.diary-pagenavi li.prev a',
				nextLink: 'div.diary-pagenavi li.next a'
			},
			photo: {
				regex: /^http:\/\/(.+)\/(.+)_\d+\.(\w+)$/,
				replace: 'http://$1/$2_640.$3'
			}
		},
		oricon: {
			url: '//blog.oricon.co.jp/',
			selectors: {
				header: '#banner',
				entry: {
					title: 'div.blog h3.title',
					date: 'div.blog h2.date',
					body: 'div.blog div.blogbody',
					link: 'div.blog div.posted a[href*="/archive/"]',
					commentLink: 'div.blog div.posted a[href*="#comments"]',
					photo: 'div.blog div.blogbody a img[src*="/_images/"]'
				},
				prevLink: (function(){
						$('div.navi a').each(function(){
							if ($(this).text().match(/^<[^<].+/)) {
								$(this).addClass('prevLink');
							}
						});
					})(),
				nextLink: (function(){
						$('div.navi a').each(function(){
							if ($(this).text().match(/^[^>].+>/)) {
								$(this).addClass('nextLink');
							}
						});
					})()
			},
			photo: {
				regex: /^http:\/\/(.+)\/m_(.+)\.(\w+)$/,
				replace: 'http://$1/$2.$3'
			}
		},
		yaplog: {
			url: '//yaplog.jp/',
			selectors: {
				header: '#head',
				entry: {
					title: 'div.entry div.entry_title h3',
					date: 'div.entry div.entry_title div.date',
					body: 'div.entry div.txt',
					link: 'div.entry ul.txt_page a[href*="/archive/"]',
					commentLink: 'div.entry ul.txt_page a[href*="#ct"]',
					photo: 'div.entry div.txt img[src*="//img.yaplog.jp/"]'
				},
				prevLink: (function(){
						$('ul.page a').each(function(){
							if ($(this).text().match(/(NEXT)/)) {
								$(this).addClass('prevLink');
							}
						});
					})(),
				nextLink: (function(){
						$('ul.page a').each(function(){
							if ($(this).text().match(/(BACK)/)) {
								$(this).addClass('nextLink');
							}
						});
					})()
			},
			photo: {
				regex: /^http:\/\/(.+)\/(.+)\.(\w+)$/,
				replace: 'http://$1/$2_large.$3'
			}
		}
	};
	this.selectors = {};
	this.photo = {};
	this.features = {
		toolbar: {
			init: function(){
				this.$toolbar =
					$('<div></div>')
						.attr('id', 'ameplus_toolbar')
						.addClass('ui-widget-header ui-corner-tr')
						.css({
							position: 'fixed',
							bottom: 0,
							left: 0,
							padding: '5px',
							boxShadow: '0 0 5px #CCC'
						})
						.appendTo('body');
			},
			addButton: function(name, id, icon, text, onClick){
				return $('<button></button>')
							.attr('id', 'ameplus_toolbar_button_' + id)
							.text(name)
							.appendTo(this.$toolbar)
							.button({
								icons: {primary: (typeof icon == 'string') ? 'ui-icon-' + icon : false},
								text: (typeof text == 'boolean') ? text : true,
							})
							.bind('click', (typeof onClick == 'function') ? onClick : false);
			}
		},
		infoDialog: {
			init: function(){
				this.$dialog =
					$('<div></div>')
						.append(
							'<p>Extends features of Ameba and other Japanese BSPs.</p>' +
							'<p><strong>Version:</strong> ' + self.version + '</span> &#8226; <strong>Written by</strong> <a href="http://akr.tw/">akira@Taiwan</a></p>' +
							'<p>For update and further information, visit the script page on userscripts.org.</p>' +
							'<p class="ui-state-highlight"><code>' + navigator.userAgent + '</code></p>'
						)
						.attr('id', 'ameplus_infoDialog')
						.attr('title', 'AmePlus - A Greasemonkey UserScript')
						.appendTo('body')
						.dialog({
							autoOpen: false,
							resizable: false,
							modal: true,
							width: 480,
							buttons: {
								'Visit script page on userscripts.org':
									function(){ window.open('http://userscripts.org/scripts/show/103350'); },
								'Close':
									function(){ $(this).dialog('close'); }
							}
						})
						.css({
							fontSize: '12px',
							textAlign: 'left'
						});
				this.$dialog.find('p').css('padding', '5px');
				
				self.features.toolbar.addButton('AmePlus', 'info', 'info', false, this.openDialog);
			},
			openDialog: function(){
				self.features.infoDialog.$dialog.dialog('open');
			}
		},
		gallery: {
			init: function(){
				this.$dialog =
					$('<div></div>')
						.attr('id', 'ameplus_gallery')
						.attr('title', 'AmePlus')
						.appendTo('body')
						.dialog({
							autoOpen: false,
							modal: true,
							width: $(window).width() * 0.9,
							height: $(window).height() * 0.8,
							open: this.autoResize,
							resize: this.autoResize
						})
						.css({
							fontSize: '12px',
							textAlign: 'center'
						});
				this.$photoWrapper =
					$('<div></div>')
						.appendTo(this.$dialog)
						.attr('id', 'ameplus_photoWrapper')
						.css({
							overflow: 'auto',
							padding: '10px'
						});
				this.$photo = 
					$('<img />')
						.appendTo(this.$photoWrapper)
						.attr('id', 'ameplus_photo')
						.attr('alt', 'loading')
						.css('cursor', 'pointer')
						.click(this.openPhoto);
				this.$info =
					$('<div></div>')
						.appendTo(this.$dialog)
						.append(
							'<strong id="ameplus_photo_count">1/20</strong> &#8226; ' +
							'<strong id="ameplus_photo_size">480x480</strong> ' +
							'<input type="url" id="ameplus_photo_url" size="100" readonly="readonly" class="ui-state-highlight" />'
						)
						.attr('id', 'ameplus_photo_info')
						.addClass('ui-widget-content')
						.css({
							margin: '5px',
							padding: '5px'
						});
				this.$url = this.$info.find('#ameplus_photo_url').click(function(){$(this).select()});
				this.$toolbar =
					$('<div></div>')
						.appendTo(this.$dialog)
						.attr('id', 'ameplus_photo_toolbar')
						.addClass('ui-state-highlight')
						.css({
							margin: '5px',
							padding: '5px'
						});
				this.$slides =
					$('<div></div>')
						.appendTo(this.$dialog)
						.attr('id', 'ameplus_photo_slides')
						.addClass('ui-widget-content')
						.css({
							maxHeight: '120px',
							overflow: 'auto',
							margin: '5px',
							padding: '5px'
						});
				
				this.addButton('Previous photo', 'prev', 'carat-1-w', false, this.prevPhoto);
				this.addButton('Next photo', 'next', 'carat-1-e', false, this.nextPhoto);
				this.addButton('Rotate photo clockwisly', 'rotate', 'arrowrefresh-1-s', false, this.rotatePhoto);
				this.addButton('Zoom photo', 'zoom', 'zoomin', false, this.zoomPhoto);
				this.addButton('Upload photo to imgur.com', 'upload', 'arrowthickstop-1-n', true, this.uploadPhoto);
				this.addButton('Open', 'open', 'copy', true, this.openPhoto);
				
				self.photo.gallery = [];
				$(self.selectors.header).each(function(){
					var imageUrl = $(this).attr('src') || $(this).css('backgroundImage').replace(/^url|[\(\)]|\"/g, ''),
						imageTitle = $(this).attr('title') || $(this).attr('alt') || $(this).attr('src');
					self.photo.gallery.push({
						url: imageUrl,
						originalUrl: imageUrl,
						title: imageTitle
					});
				});
				$(self.selectors.entry.photo)
					.css({
						border: '5px solid #FFF',
						boxShadow: '0 0 5px #CCC'
					})
					.click(function(){
						self.features.gallery.openDialog($(self.selectors.entry.photo).index($(this)) + 1);
					})
					.each(function(){
						var imageUrl = $(this).attr('src').replace(self.photo.regex, self.photo.replace),
							imageTitle = $(this).attr('title') || $(this).attr('alt');
						self.photo.gallery.push({
							url: $(this).attr('src'),
							originalUrl: imageUrl,
							title: imageTitle
						});
					})
					.parent('a').click(function(){return false})
				for (var i in self.photo.gallery){
					var $slide =
							$('<div></div>')
								.appendTo(this.$slides)
								.addClass('ameplus_photo_slide')
								.css({
									display: 'inline-block',
									cursor: 'pointer',
									width: '48px',
									height: '48px',
									margin: '2px',
									border: '2px solid #CCC',
									backgroundColor: '#333',
									backgroundImage: 'url("' + self.photo.gallery[i].url + '")',
									backgroundPosition: 'center center'
								})
								.click(function(){self.features.gallery.showPhoto($(this).index())})
								.hover(function(){$(this).fadeTo(200, 0.5)}, function(){$(this).fadeTo(200, 1)});
				}
				
				self.features.toolbar.addButton('Photos', 'photo', 'image', true, this.openDialog);
			},
			addButton: function(name, id, icon, text, onClick){
				return $('<button></button>')
							.appendTo(this.$toolbar)
							.attr('id', 'ameplus_photo_toolbar_button_' + id)
							.text(name)
							.button({
								icons: {primary: (typeof icon == 'string') ? 'ui-icon-' + icon : false},
								text: (typeof text == 'boolean') ? text : true,
							})
							.bind('click', (typeof onClick == 'function') ? onClick : false);
			},
			openDialog: function(index){
				var index = (typeof index == 'number') ? index : 1;
				self.features.gallery.$dialog.dialog('open');
				self.features.gallery.showPhoto(index);
			},
			showPhoto: function(index){
				var obj = self.features.gallery;
				var index = (typeof self.photo.gallery[index] == 'object') ? index : 0;
				var img = new Image();
				img.src = self.photo.gallery[index].originalUrl;
				img.title = (typeof self.photo.gallery[index].title == 'string') ? self.photo.gallery[index].title : 'No title';
				img.onload = function(){
					obj.$photo
						.attr({
							'src': img.src,
							'title': img.title
					})
					obj.$info.find('#ameplus_photo_size').text(img.width + 'x' + img.height);
					obj.autoResize(img);
				};
				obj.$slides.find('.ameplus_photo_slide').removeClass('selected').css('border-color', '#CCC');
				obj.$slides.find('.ameplus_photo_slide').eq(index).addClass('selected').css('border-color', '#333');
				obj.$photo.attr('src', '');
				obj.$info.find('#ameplus_photo_count').text((index + 1) + ' of ' + self.photo.gallery.length);
				obj.$info.find('#ameplus_photo_size').text('Loading...');
				obj.$url.val(img.src);
			},
			autoResize: function(img){
				var obj = self.features.gallery;
				obj.$photoWrapper.css({
					width: obj.$dialog.outerWidth() - obj.$info.outerWidth() - obj.$toolbar.outerWidth() - obj.$slides.outerWidth() - 60,
					height: obj.$dialog.outerHeight() - obj.$info.outerHeight() - obj.$toolbar.outerHeight() - obj.$slides.outerHeight() - 60,
				});
				obj.$photo.css({
					maxWidth: obj.$photoWrapper.width(),
					maxHeight: obj.$photoWrapper.height()
				});
			},
			prevPhoto: function(){
				var index = $('.ameplus_photo_slide.selected').index() - 1;
				index = (typeof self.photo.gallery[index] == 'object') ? index : self.photo.gallery.length - 1;
				self.features.gallery.showPhoto(index);
			},
			nextPhoto: function(){
				var index = $('.ameplus_photo_slide.selected').index() + 1;
				index = (typeof self.photo.gallery[index] == 'object') ? index : 0;
				self.features.gallery.showPhoto(index);
			},
			rotatePhoto: function(){
				var obj = self.features.gallery;
				this.rotate = this.rotate || 0;
				if (this.rotate < 4) {
					this.rotate++;
				} else {
					this.rotate = 1;
				}
				obj.$photo.css({
					'-moz-transform': 'rotate(+' + this.rotate * 90 + 'deg)',
					'-webkit-transform': 'rotate(+' + this.rotate * 90 + 'deg)'
				});
				obj.autoResize();
			},
			zoomPhoto: function(){
				var obj = self.features.gallery;
				this.zoom = this.zoom || false;
				if (this.zoom == true) {
					obj.$photo.css({
						maxWidth: obj.$photoWrapper.width(),
						maxHeight: obj.$photoWrapper.height()
					});
					this.zoom = false;
				} else {
					obj.$photo.css({
						maxWidth: '',
						maxHeight: ''
					});
					this.zoom = true;
				}
			},
			uploadPhoto: function(){
				var imageUrl = self.features.gallery.$photo.attr('src');
				window.open('http://api.imgur.com/2/upload.xml?url=' + encodeURIComponent(imageUrl));
			},
			openPhoto: function(){
				var imageUrl = self.features.gallery.$photo.attr('src');
				window.open(imageUrl);
			}
		},
		writeComment: {
			init: function(){
				var $button = self.features.toolbar.addButton('Write/Skip to comment', 'comment', 'comment', true, this.writeComment);
				if ($(self.selectors.entry.commentLink).length == 0) {
					$button.button('option', 'disabled', true);
				}
			},
			writeComment: function(){
				if (typeof commentWinOpenB == 'function') {
					return commentWinOpenB();
				}
				location.href = $(self.selectors.entry.commentLink).attr('href');
			}
		},
		sharePost: {
			init: function(){
				this.$dialog =
					$('<div></div>')
						.append(
							'<p>' +
							'<span class="ui-icon ui-icon-document" style="float: left; margin-right: 5px;"></span><input type="text" size="60" value="' + $('title').text() + '" class="ui-state-highlight" /><br />' +
							'<span class="ui-icon ui-icon-link" style="float: left; margin-right: 5px;"></span><input type="url" size="60" value="' + location.href.split('?')[0].split('#')[0] + '" class="ui-state-highlight" />' +
							'</p>' +
							'<p class="ui-widget-content addthis_toolbox addthis_default_style addthis_32x32_style">' +
							'<a class="addthis_button_compact"></a>' +
							'<a class="addthis_button_preferred_1"></a>' +
							'<a class="addthis_button_preferred_2"></a>' +
							'<a class="addthis_button_preferred_3"></a>' +
							'<a class="addthis_button_preferred_4"></a>' +
							'<a class="addthis_button_plurk"></a>' +
							'<a class="addthis_button_facebook"></a>' +
							'<a class="addthis_button_bitly"></a>' +
							'<a class="addthis_button_googlereader"></a>' +
							'</p>' +
							'<p class="ui-widget-content addthis_toolbox addthis_default_style addthis_32x32_style">' +
							'<a class="addthis_button_tweet" tw:via="ameplus_userscript"></a>' +
							'<a class="addthis_button_google_plusone" g:plusone:size="medium"></a>' +
							'</p>' +
							'<script src="//s7.addthis.com/js/250/addthis_widget.js"></script>'
						)
						.attr('id', 'ameplus_share')
						.attr('title', 'Share this page...')
						.appendTo('body')
						.dialog({
							autoOpen: false,
							resizable: false,
							modal: false,
							width: 480,
							height: 200,
						});
				this.$dialog.find('p').css({
					margin: '5px',
					padding: '5px',
					textAlign: 'left'
				});
				this.$dialog.find('input').click(function(){$(this).select()});
				
				self.features.toolbar.addButton('Share', 'share', 'person', true, this.openDialog);
			},
			openDialog: function(){
				self.features.sharePost.$dialog.dialog('open');
			}
		},
		autoCheck: {
			init: function(){
				this.latestEntry = {};
				this.pageTitle = $('title').text();
				this.$notice =
					$('<div></div>')
						.attr('id', 'ameplus_notice')
						.addClass('ui-state-highlight ui-corner-bottom')
						.css({
							display: 'none',
							position: 'fixed',
							bottom: 0,
							top: 0,
							height: '20px',
							margin: '0 20px 0 20px',
							padding: '20px 10px 5px 10px',
							zIndex: 9999,
							boxShadow: '0 0 5px #CCC'
						})
						.appendTo('body')
						.hide();
				
				this.$button = self.features.toolbar.addButton('Check Blog Update', 'checkupdate', 'signal-diag', false, this.check);
				
				this.check();
				setInterval(this.check, 5 * 60 * 1000);
			},
			check: function(){
				var obj = self.features.autoCheck,
					url = $(self.selectors.header).find('a').attr('href');
				
				if (typeof url != 'string') {
					obj.$button.button('option', 'disabled', true);
					return false;
				}
				
				$.ajax({
					url: url,
					cache: false,
					success: function(data){
						var dom = $(data);
						var link = $(data).find(self.selectors.entry.link).eq(0).attr('href'),
							title = $(data).find(self.selectors.entry.title).eq(0).text(),
							date = $(data).find(self.selectors.entry.date).eq(0).text();
						if (typeof obj.latestEntry.link == 'string') {
							if (link != obj.latestEntry.link) {
								var b64img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOVJREFUeNpi/P//PwMlgImBQkCxASzfupT7gHQKmfrnsPz9+y+FN2Y5Lzm6Py+JTGH58/cvw//7+8myHqSX4UW91CdgTPz/u7sajGFsZIAuDqNBell+//4LCU2XFoa/W/LB7P8/PoNpGB8GYOIwGqSX5dfvP0gKPqLQzD4TIU5dkwDGLCEL4OIgPkgvy0+oAb+WBDGwxawDs//9+AQXQwcwdSA1IL1wF8BsRWbDDPw5xxmrK0F6GU+nc3zS0dElKxqvXLn8meXXH2A0/vpKVjSC9LL8+fN3zulLN8hOiYwDnhsBAgwAxqS24aEupwEAAAAASUVORK5CYII%3D';
								$('link[rel*="shortcut"]').remove();
								$('<link rel="shortcut icon" href="' + b64img + '">').appendTo('head');
								obj.$notice
									.html(
										'<p>' +
										'<span class="ui-icon ui-icon-alert" style="float: left; margin-right: 5px;"></span>' +
										'<a href="' + link + '"><strong>[New]</strong> ' + title + ' (' + date + ')</a>' +
										'</p>'
									)
									.show('bounce');
								$('title').text('* ' + obj.pageTitle);
							} else {
								var date = new Date();
								obj.$notice
									.html(
										'<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: 5px;"></span>' +
										'No new entry found. (' + date.toLocaleTimeString() + ') &#8226; <i>Automatically check in every 5 minutes.</i></p>'
									)
									.slideDown().delay(5000).slideUp();
							}
						}
						obj.latestEntry = {
							link: link,
							title: title,
							date: date
						}
					}
				});
			},
		},
		pager: {
			init: function(){
				var $prev = self.features.toolbar.addButton('Previous Page', 'prev', 'carat-1-w', false, this.prevPage),
					$next = self.features.toolbar.addButton('Next Page', 'next', 'carat-1-e', false, this.nextPage);
				
				this.nextLink = self.selectors.nextLink || 'a.nextLink',
				this.prevLink = self.selectors.prevLink || 'a.prevLink';
				
				if ($(this.nextLink).length == 0) {
					$next.button('option', 'disabled', true);
				}
				if ($(this.prevLink).length == 0) {
					$prev.button('option', 'disabled', true);
				}
			},
			nextPage: function(){
				location.href = $(self.features.pager.nextLink).attr('href');
			},
			prevPage: function(){
				location.href = $(self.features.pager.prevLink).attr('href');
			}
		},
		removeImageProtect: {
			init: function(){
				$(window).load(function(){
					$('body, img').attr('oncontextmenu', function(){return true});
					$('img[class^="guard"]').remove();
				});
			}
		}
	};
	
	this.defineBlog = function(){
		for (var i in self.blogs) {
			if (location.href.indexOf(self.blogs[i].url) > -1) {
				self.selectors = self.blogs[i].selectors;
				self.photo = self.blogs[i].photo;
				return true;
			}
		}
		if (self.selectors.length == 0 || $(self.selectors.entry.body).length == 0) {
			throw 'IsNotBlogPageError';
		}
	};
	this.initFeatures = function(){
		for (var i in self.features) {
			if (typeof self.features[i].init == 'function') {
				self.features[i].init();
			}
		}
	};
	this.applyStyle = function(){
		$('[class*="ui-"]').css({
			fontFamily: 'Arial, sans-serif',
			fontSize: '12px'
		});
	};
	this.construct = function(){
		try {
			self.defineBlog();
		} catch(error) {
			return error;
		}
		self.initFeatures();
		self.applyStyle();
		return true;
	}
	
	return this.construct();	
}

function loadScript(callback){
	var content_scripts = {
		js: [
			'//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js',
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js'
		],
		css: [
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/south-street/jquery-ui.css'
		]
	};
	for (var i in content_scripts.js) {
		var script = document.createElement('script');
		script.setAttribute('src', content_scripts.js[i]);
		document.body.appendChild(script);
	}
	for (var i in content_scripts.css) {
		var sheet = document.createElement('link');
		sheet.setAttribute('rel', 'stylesheet');
		sheet.setAttribute('href', content_scripts.css[i]);
		document.head.appendChild(sheet);
	}
	var lastNode = document.body.childNodes[document.body.childNodes.length - 1];
	lastNode.addEventListener('load', function(){
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);
}
loadScript(AmePlus);