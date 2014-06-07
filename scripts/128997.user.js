// ==UserScript==
// @name      Apachan.net plugin
// @description Добавляет дополнительные функции на сайт apachan.net
// @include http://apachan.net/*
// @include http://demotivation.me/*
// @match http://apachan.net/*
// @match http://demotivation.me/*
// @homepage www.vk.com/maxmaxmaximus
// @author Maxmaxmaximus <Vertuplatonium@gmail.com>
// @version 5.4
// @date 04.10.2012

// ==/UserScript==


(function () {


	if ( window.self != window.top ) {
		return;
	}

	if ( /http:\/\/apachan.net/.test( window.location.href ) || /http:\/\/demotivation.me/.test( w.location.href ) ) {


		//тэги
		(function () {

			var tables = document.body.querySelectorAll( 'table div' );
			var table, text;
			var tagParser = /\\([^\\\s]+)(.+)\\\1/img;
			var scriptNumberParser = /script(\d+)/i;
			var scripts = [];


			document.body.onclick = function ( e ) {

				var className = e.target.className;
				if ( scriptNumberParser.test( className ) ) {
					(function () {
						eval( scripts[className.match( scriptNumberParser )[1]] )
					}).apply( window );
				}
			}

			function parse( match, tag, text ) {

				switch ( tag ) {

					case '!':
						return '<b>' + text + '</b>';
						break
					case 'u':
						return '<span style="text-decoration: underline;">' + text + '</span>';
						break
					case 'i':
						return '<em>' + text + '</em>';
						break
					case 'b':
						return '<strong>' + text + '</strong>';
						break
					case 's':
						return '<del>' + text + '</del>';
						break
					case 'js':
						var scriptNumber = scripts.length;
						scripts.push( text );
						return '<span style="background-color: #7fffd4; cursor: pointer; color: #2f4f4f; padding: 4px;" class="script' + scriptNumber + '">run</span>';
						break

					default:
						if ( /\d+/igm.test( tag ) ) {
							return '<font size="' + parseFloat( tag ) + '">' + text + '</font>';
						}
						else /*if (/#[0-9abcdef]+/igm.test( tag ))*/ {
							return '<font color="' + tag + '">' + text + '</font>';
						}

				}
			}

			for ( var i = 0; i < tables.length; i++ ) {
				table = tables[i];
				text = table.innerHTML;

				//парсинг картинок
				text = text.replace( /#(http\S+)/igm, '<img src="$1">' );
				//парсинг тегов
				while ( tagParser.test( text ) ) {
					text = text.replace( tagParser, parse );
				}

				table.innerHTML = text;
			}

		})();

		//скрытие тредов
		(function () {
			var ops = document.querySelectorAll( 'span > table' );
			var showButton;
			var lastOp;

			for ( var i = 0; i < ops.length; i++ ) {
				i < 50 && createHideLink( ops[i] );
			}

			function createHideLink( op ) {

				var row = op.querySelector( 'tr:last-child' );
				var id = row.querySelector( ':first-child a:first-child' );

				var id =
					(id.innerHTML != '[Открыть]')
						? id.innerHTML
						: row.querySelector( ':first-child a:nth-child(2)' ).innerHTML;

				if ( localStorage.getItem( 'op' + id ) == 'hidden' ) {
					hide( op, true );
				}

				var link = document.createElement( 'a' );
				link.innerHTML = "Скрыть";
				link.href = ' ';
				link.onclick = function () {
					localStorage.setItem( 'op' + id, 'hidden' );
					hide( op, false, id );

					return false;
				};

				var td = row.insertCell( -1 );
				td.appendChild( link );
			}


			function hide( op, option, id ) {

				if ( op.offsetTop - document.body.scrollTop < 0 && !option ) {
					document.body.scrollTop = op.offsetTop - 40;
				}


				if ( !option ) {

					//удалить предыдущуу кнопку "восстановить"
					var button = document.querySelector( '#showButton' )
					if ( button ) {
						button.parentNode.removeChild( button.previousSibling.previousSibling );
						button.parentNode.removeChild( button.previousSibling );
						button.parentNode.removeChild( button );
					}

					var link = document.createElement( 'a' );
					link.innerHTML = 'Восстановить';
					link.href = ' ';
					link.onclick = function () {

						this.parentNode.parentNode.insertBefore( lastOp, showButton.nextSibling );
						this.parentNode.parentNode.removeChild( this.parentNode );
						localStorage.removeItem( 'op' + id )

						return false;
					};


					showButton = document.createElement( 'div' );
					showButton.id = 'showButton';
					showButton.style.marginLeft = '47%'
					showButton.appendChild( link );

					op.parentNode.insertBefore( showButton, op.nextSibling );

					lastOp = op;
					op.parentNode.removeChild( op );
				}
				else {
					op.parentNode.removeChild( op.previousSibling.previousSibling );
					op.parentNode.removeChild( op.previousSibling );
					op.parentNode.removeChild( op );
				}
			}
		})();

		//увеличение картинок
		(function () {

			function screenSize() {
				var w, h; // Объявляем переменные, w - длина, h - высота
				w = (window.innerWidth
					? window.innerWidth
					: (document.documentElement.clientWidth
					? document.documentElement.clientWidth
					: document.body.offsetWidth));
				h = (window.innerHeight
					? window.innerHeight
					: (document.documentElement.clientHeight
					? document.documentElement.clientHeight
					: document.body.offsetHeight));
				return {width:w, height:h};
			}

			function getOffsetSum( elem ) {
				var top = 0, left = 0
				while ( elem ) {
					top = top + parseFloat( elem.offsetTop )
					left = left + parseFloat( elem.offsetLeft )
					elem = elem.offsetParent
				}

				return {top:Math.round( top ), left:Math.round( left )}
			}

			var images = document.querySelectorAll( ' img' );

			for ( var i = 0; i < images.length; i++ ) if ( images[i].src !== 'http://apachan.net/det.gif' ) {
				var img = images[i];
				var parent = img.parentNode;
				var needZoom = parent && parent.nodeName == 'A' && true;

				if ( needZoom ) {
					img.onclick = function () {

						var img = this;
						var im = document.createElement( 'img' );
						im.src = this.src.replace( 'thumbs', 'images' );
						im.onload = function () {

							if ( this.height > screenSize().height || this.width > screenSize().width ) {
								showBig( this );
							}
							else {
								showSmall( this, getOffsetSum( img ) );
							}
						};
						im.onerror = function () {

							this.src = this.src.slice( 0, this.src.lastIndexOf( '.' ) ) + '.png';
							this.onerror = function () {
								this.src = this.src.slice( 0, this.src.lastIndexOf( '.' ) ) + '.gif';
								this.onerror = function () {
									this.src = this.src.slice( 0, this.src.lastIndexOf( '.' ) ) + '.jpeg';
									this.onerror = function () {
										this.src = this.src.slice( 0, this.src.lastIndexOf( '.' ) ) + '.bmp';
									};
								};
							};
						};

						return false
					}

				}
			}


			function showBig( img ) {

				if ( img.width > screenSize().width ) {
					img.width = screenSize().width - 60;
				}

				var popup = document.createElement( 'div' );
				popup.style.position = 'fixed';
				popup.style.height = '100%';
				popup.style.width = '100%';
				popup.style.left = '0px';
				popup.style.top = '0px';
				popup.style.zIndex = '999';
				popup.style.overflow = 'auto';
				popup.style.textAlign = 'center';
				popup.style.backgroundColor = 'rgba(0,0,0,0.3)';
				popup.style.cursor = 'pointer';
				document.body.style.overflow = 'hidden';

				popup.onmousedown = function () {
					return false;
				}
				popup.onclick = function () {
					document.body.style.overflow = 'auto';
					this.parentNode.removeChild( this );
				};

				popup.appendChild( img );

				document.body.appendChild( popup );
			}


			function showSmall( img, offset ) {
				var popup = document.createElement( 'div' );
				popup.style.border = '1px solid black';
				popup.style.position = 'absolute';
				popup.style.top = offset.top + 'px';
				popup.style.left = offset.left + 'px';
				popup.style.cursor = 'pointer';
				//popup.style.boxShadow = '0px 0px 8px #000';
				popup.onclick = function () {
					this.parentNode.removeChild( this );
				};

				popup.appendChild( img );

				document.body.appendChild( popup );
			}

		})();

		// автооткрытие скрытых постов
		(function () {
			var posts = document.querySelectorAll( 'table tr:first-child > td > div' );
			for ( var i = 0; i < posts.length; i++ ) {
				var post = posts[i];
				if( post.style.display === 'none' ){
				    post.style.backgroundColor = '#e5cece';
					post.style.display = 'block';
				}
				
			}
		})();
	}
})();