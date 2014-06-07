// ==UserScript==
// @id             manga@batoto
// @name           Read manga @ Batoto
// @version        0.3
// @namespace      dev.rsalazar.name/js
// @author         rSalazar
// @description    
//  match          http://www.batoto.net/
// @include        http://www.batoto.net/
// @include        http://www.batoto.net/?p*
// @include        http://www.batoto.net/comic/*
// @include        http://www.batoto.net/read/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @run-at         document-end
// @change-log
// 	01/18/14 	- Fixed issue causing some chapter titles (headers) to go hidden
// 	09/01/13 	- Added use of (some) flags to indicate language
// 	         	- Other minor changes / improvements
// ==/UserScript==

var  id = GM_getMetadata('id') ;//GM_info.name;
if ( 'function' == typeof jQuery )  (function( $ ) {
	var  __debug = false;
	$.empty = $('');
	$('body').addClass('mb-bd');

	$.fn.nodeSelector = function( full ) {
		return  this.map(function( n ) {
			var  sel = this.nodeName;
			if ( this.id )
				sel += '#'+ this.id;
			if ( this.className )
				sel += (' '+ $.trim(this.className)).replace(/\s+/g, '.');
			if ( full && this.parentNode )
				sel = $(this.parentNode).nodeSelector(full) +' >'+ sel;
			return  sel;
		}) || [ ];
	}; // [ str ] ::nodeSelector( )


	if ( '/read/' == document.location.pathname.substr(0, 6) ) {
		if ( __debug )  console.debug('*** /read/ - LNI ***');

		function parseUrl( url, regex ) {
			var  obj = null;
			var  arr = url.match(regex);
			if ( arr )  obj = {
				prefix: arr[ 1 ] || '',
				number: arr[ 2 ] || '',
				suffix: arr[ 3 ] || ''
			};
			if ( __debug )  console.debug('LNI URL:', '"'+ url +'"', '\n\tparsed:', obj);
			return	obj;
		} // Obj  parseUrl( str, regex )

		function  getUrl( number, segs ) {
			var  url = String(number);
			if ( segs.fixedPrefix )
				url = segs.prefix + url;
			else if ( segs.prefix )
				url = segs.prefix.substr(0, segs.prefix.length + segs.number.length - url.length) + url;
			url += segs.suffix;
			if ( __debug )	console.debug('LNI - URL for ', number, ':', url, ' w/', segs);
			return  url;
		} // str  getUrl( int, Obj )



		$.fn.subId = function( prefix, suffix, glue ) {
			var  id = this.attr('id') || this.attr('name');
			if ( id ) {
				if ( 'undefined' === typeof glue )  glue = '.';
				id = ( prefix ? prefix + glue : '' ) + id
				    + ( suffix ? glue + suffix : '' );
			}
			return	id;
		};


		$.fn.loadNextImages = function( n, callback, onerror, onsuccess ) {
			const  LNI_DEFAULT_IMAGES = 3;
			var  $this   = null,
			     node    = null,
			     page    = NaN,
			     pagSegs = null,
			     image   = NaN,
			     url     = null,
			     imgSegs = null,
			     images  = null;

			function  parsePageUrl( url ) {
				var  segs = parseUrl(url, /^(.+?)\/?(\d+)?$/);
				segs.prefix     += '/';
				segs.fixedPrefix = true;
				return	segs;
			} // Obj  parsePageUrl( str )

			function  parseImageUrl( url ) {
				return	( parseUrl(url, /^(.*?)([1-9]\d*)(\.\w\w\w)$/)
				          || parseUrl(url, /^(.*?)([a-zA-Z])(\.\w\w\w)$/) );
			} // Obj  parseImageUrl( str )

			$this = this.filter('img').first();
			if ( 1 === $this.size() ) {
				node = $this.get(0);
				if ( 'function' !== typeof callback )  callback  = $.noop;
				if ( 'function' !== typeof onerror )   onerror   = $.noop;
				if ( 'function' !== typeof onsuccess ) onsuccess = $.noop;
				if ( __debug )	console.debug('LNI this:', node, ' / $this:', $this);

				// Initializations...
				url     = node.src;
				imgSegs = parseImageUrl(url);
				pagSegs = parsePageUrl(document.location.href);
				page    = parseInt(pagSegs[ 1 ]) || 1 ;//pageNumber();
				var  isNum = !isNaN(imgSegs.number);
				if ( imgSegs && /^(?:\d+|[a-zA-Z])$/.test(imgSegs.number) ){//!isNaN(imgSegs.number) ) {
					n      = Math.max(1, isNaN(n) ? LNI_DEFAULT_IMAGES : n);
					image  = parseInt(imgSegs.number) || imgSegs.number.charCodeAt(0);
					images = [ ];
					if ( __debug )	console.debug('LNI Load', n, ', based on image', image, 'in page', page);
					for ( var  i = 1;  i <= n;  i ++ )  (function( idx, num ) {
						num = ( isNum ? num : String.fromCharCode(num) );
						var  str = getUrl(num, imgSegs);
						var  img = new Image( );
						img.index   = idx;
						img.number  = num;
						img.onload  = function( ) { onsuccess.call(node, idx, img) };
						img.onerror = function( ) { 
							if ( __debug )  console.warn('LNI #', i, 'failed - img/node:', img, node);
							onerror.call(node, idx, 'Unknown reason', img) };
						img.src     = str;
						images.push(img);
						if ( __debug )	console.debug('LNI (', idx, ') images:', images, '/ last:', img);
					}(i, i + image));
					if ( __debug )	console.debug('LNI ', node, '::Calling(', images, pagSegs, imgSegs, ')...');
					callback.call(node, images, pagSegs, imgSegs);
				} else  onerror.call(node, -1, 'Unable to parse URL - '+ url);
			} else  console.warn('LNI Warning: Current stack does not contain an image - '
			                    //+ $this.nodeSelector().join('\n- '));
			                    + $this.get().join('\n- '));
			return	this;
		}; // jQuery ::loadNextImages( int, node::loadStart( int ), node::error( int, str ) )



		// Bonus: Add totals next to the drop-downs for chapter and page
		$('select').filter('[name^="chapter"], [name^="page"]')
			.data({
				chapter_select: { rex:/^vol\.\d+(?:\.\d+)?|ch\.|chapter|:.+$/gi },
				page_select:    { sel:':last',  rex:/page/i }
			})
			.each(function( i ) {
				var  $this  = $(this),
				     eid    = $this.attr('id') || this.id || this.name,
				     data   = $this.data(eid),
				     text   = $this.children(data.sel || null).first().text(),
				     $total = $('<small class="mb-totals">');
				if ( __debug )  console.debug('> Totals for #', i, ':', eid, ' / ', $this.attr('id'),
				                              'Data:', data, ' / Text:', text);
				if ( data.rex )
					text = $.trim(text.replace(data.rex, ''));
				if ( text )
					$total.text(' of '+ text)
						.insertAfter(this);
			});


		// Main execution
		var  $img = $('#comic_page');
		var  imgs = $img.loadNextImages(5, function( images, pagSegs, imgSegs ) {
				if ( __debug )	console.debug('LNI @Callback(', images, pagSegs, imgSegs, ')');
				var  $this = $(this);
				if ( images && images.length ) {
					var  cid   = $this.subId('mb-next') || 'mb-next',
					             //'mb-next'+ ('.'+ $this.attr('id')).replace(/\.$/, ''),
					     $html = $('<div>'),
					     page  = parseInt(pagSegs.number) || 1;
					if ( __debug )  console.debug('LNI - Container\'s id:', cid);
					$this.attr('id-container', cid);
					$html.attr('id', cid).addClass('mb-next')
						.append(
							$(images).attr('height', 80)
								.map(function( n ) {
									var  a = $('<a>').attr('href', getUrl(++ page, pagSegs))
										.append(this).get(0);
									if ( __debug )  console.debug('LNI', n, ' url: ', a);
									return  a;
								})
						);
					if ( __debug )  console.debug('LNI > Added HTML:', $html);
					// Insert previous/links after the pagination section
					$html.insertAfter($this.parent().parent().next());
				}
				// Remove the banner on the right
				$this.parent().next().remove();
			}, function( i, msg, img ) {
				if ( __debug )  console.warn('LNI #', i, 'Failed:', msg, ' @', img.src, img, this);
				var  $this = $(this);
				img.onerror = null;
				img.src = 'about:blank';

				var  $link      = $(img).parent('a'),
				     $container = $link.parent($this.attr('id-container'));
				if ( __debug )  console.debug('LNI - removing link', $link.get(), 'in', $container.get());
				$link.remove();
				if ( $container.is(':empty') ) {
					if ( __debug )  console.debug('LNI - Removing Container', $container.get());
					$container.remove();
				}
			}
		);

	} else { // pathname ^= '/read/' 	# home & '/comic/'
__debug = true;


		if ( __debug )  console.debug('*** !/read/ - CHF ***');
		const CHF_CHAP_FILTER = 'tr[class*="lang_"]';
		const CHF_REX_LANG    = /(?:^|\s)lang_(\w+)/;
		// This should really be part of the style, but...
		const CFH_FLAG_IMG    = 'url(/images/all_flags.png)';
		const CFH_FLAG_SIZE   = [ '16px', '12px' ];
		const CHF_FLAG_ATTR   = { // Most common languages
			'Ara': [ '-200px', '-453px' ],	'Eng': [ '-284px', '-173px' ],
			'Fre': [ '-228px', '-173px' ],	'Ger': [ '-284px', '-117px' ],
			'Ita': [ '-172px', '-257px' ],	'Ind': [ '-256px', '-229px' ],
			'Pol': [ '-172px', '-425px' ],	'Por': [ '  -4px', '-453px' ],
			'Rus': [ '-144px', '-453px' ],	'Spa': [ '  -4px', '-173px' ],
			'Tur': [ '-116px', '-537px' ],	'Vie': [ '-256px', '-565px' ],
		};
 
 
		function  setVal ( key, val ) {
			if ( __debug )  console.debug('CHF Setting', key, 'to', val);
			return	GM_setValue(key, val);
		} // ?  setVal( str, scalar )

		function  getVal ( key ) {
			var  val = GM_getValue(key);
			if ( __debug )  console.debug('CHF Value for', key, 'is', val);
			return	val;
		} // scalar  getVal( str )

		// Considered less stressing than browsing the DOM / parsing Selectors
		function  getLanguage( cssClass ) {
			var  match = CHF_REX_LANG.exec(cssClass);
			if ( __debug )  console.debug('CHF - lang:', cssClass, '->', match);
			return	( match ? match[ 1 ] : null );
		} // str  getLanguage( str )


		$.fn.title = function( ) {
			if ( arguments.length )
				this.attr('title', arguments[ 0 ]);
			return  this.attr('title');
		} // str  ::title( str? )

		$.fn.createFlag = function( lang, num ) {
			this.data('language', lang)
				.title(lang +': '+ num +' titles');
			num = ' ('+ num +')';
			var  attrs = CHF_FLAG_ATTR[ (lang = lang.substr(0, 3)) ];
			if ( !attrs ) {
				this.text(lang + num);
			} else {
				this.text(num)
					.prepend(
						$('<i></i>').css({
							'height':  CFH_FLAG_SIZE[ 1 ],  'background':     CFH_FLAG_IMG +' '+ attrs.join(' '),
							'width':   CFH_FLAG_SIZE[ 0 ],  'vertical-align': 'middle',
							'display': 'inline-block'
						})
					);
			}
			return	this;
		} // jQuery  ::createFlag( str, scalar )


		// Main execution...
		var  $listing = $('table.chapters_list > tbody');
		if ( $listing.size() ) {
			// Batoto bug(?): Not all rows have a lang_* class; assumption: all rows are Header or Chapter
			$listing.children(':not(.header):not([class*="lang_"])')
				.each(function( ) {
					var  $this    = $(this),
					     cssClass = $this.find('>td:nth-child(3) > div[title]').title();
					if ( __debug )  console.debug('CHL Language for', $this.nodeSelector(), cssClass);
					if ( cssClass )
						cssClass = 'lang_'+ cssClass;
					cssClass = 'mb-missing '+ cssClass;
					$this.addClass(cssClass);
				});
			// Initializations...
			var  $header   = $listing.parent().prev('.maintitle'),
			     $chapters = $listing.children(CHF_CHAP_FILTER),
			     $titles   = $chapters.has('td[rowspan]');
			if ( !$titles.size() ) // "/comic/" pages
				$titles = $chapters ;//.clone();
			$titles.addClass('mb-title');
			if ( __debug )	console.debug('CHF Titles (', $titles.size(), '):', $titles,
			                              ' / Chapters (', $chapters.size(), '):', $chapters);
			var  langs  = { 'All':$titles.size() },
			     myLang = getVal('language'),
			     sorted = [ 'All' ];
			// Retrieve languages in current page (preserving the chosen one, even if missing)
			$titles.each(function( i ) {
				var  lng = getLanguage(this.className);
				if ( lng )
					if ( langs[ lng ] )
						langs[ lng ] ++;
					else {
						langs[ lng ] = 1;
						sorted.push(lng);
					}
			});
			if ( myLang && !langs[ myLang ] ) {
				langs[ myLang ] = 0;
				sorted.push(myLang);
			}
			sorted.sort();
			if ( __debug )  console.debug('CHF Languages:', langs);
			// Create and inject the language filters
			var  $html = $('<div class="mb-langs"></div>')
				.append(
					$.map(sorted, function( lang ) {
						return	$('<a href="javascript:void(null)">')
							.createFlag(lang, langs[ lang ])
							.click(function( ) {
								var  $this  = $(this),
								     lng    = $this.data('language'),
								     filter = '.lang_'+ lng;
								if ( __debug )  console.debug('CHF', lng, ':not('+ filter +')',
								                              $chapters.not(filter));
								$chapters.show()
									.find('>td[width="1"]').filter(':first-child:hidden').show();
								if ( 'All' == lng )
									setVal('language', '');
								else {
									$chapters.not(filter).hide();
									setVal('language', lng);
									// Make sure title rows, for all visible rows, are visible
									$chapters.filter(':visible').not('.mb-title')
										.prevUntil('.mb-title').prev('.mb-title').show();
									// Remove first (empty) cell for rows following a title (that were not)
									$chapters.filter('.mb-title:visible')
										.each(function( ) {
											$(this).nextUntil('.mb-title', ':visible')
												.first().find('>td[width="1"]').filter(':first-child')
												.hide();
										});
								}
								$this.siblings('.hl').removeClass('hl');
								$this.addClass('hl');
							});
					})
				)
				.appendTo($header.addClass('mb-chaps-title'));
			if ( !myLang )
				myLang = 'All';
			$html.children(':first').addClass('hl'); // Highlight "All" by default

			$html.children().filter(function( ) {
					var  $this = $(this);
					if ( __debug )  console.debug('CHF - Comparing', myLang, 'to', $this.data('language'));
					return  ( myLang == $this.data('language') )
				})
				.click();
		} // ( $listing.size() )

	} // !( pathname ^= '/read/' ) 	# home & '/comic/'
})(jQuery)
else  console.error('LNI+CHF', id +' failed: jQuery not supported');
