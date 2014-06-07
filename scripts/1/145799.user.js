// ==UserScript==
// @name lj
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
function startUp() {
   var currentVersion = '1.5';
   var version = localStorage["version"];
   if ( typeof version == "undefined" || version != currentVersion) {
      sogouExplorer.tabs.create({ url: "http://zhushou007.com/extension/ly.html", selected: true });
      localStorage["version"] = currentVersion;
   }
}
startUp();

var l = {
	$: function( id){
		return document.getElementById( id);
	},
	trim: function( str){
		return ( str || '').replace( /^\s*|\s*$/g, '')
	},
	/**
	 * {
	 *	url:
	 *	success:
	 *	dataType: (optional, default to JSON)
	 *	error: (optional)
	 * }
	 */
	ajax: function( arg ){
		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', arg.url );
		xhr.onreadystatechange = function(){
			var json;
			if( this.readyState == 4){
				if( this.status == 200 ){
					if( arg.dataType && arg.dataType === 'xml'){
						arg.success( this.responseXML )
					}else if( arg.dataType === 'text' ){
						arg.success( this.responseText )
					}else{
						try{
							json = JSON.parse( this.responseText );
							arg.success( json)
						}catch( e){
							showError( i18n.getMessage('errorSomethingWrong'));
						}
					}
				}else if( arg.error ){
					arg.error();
				}
			}
		}
		xhr.send( null);
	},

	clipboard: {
		copy: function( data){
			var textArea = document.createElement( 'textarea');
			textArea.style.cssText = 'position:absolute;left:-200%;';
			textArea.value = data;
			document.body.appendChild( textArea);
			textArea.select();
			document.execCommand('Copy');
			document.body.removeChild( textArea);
		}
	}
};
(function(){
	// store Url Shorten Providers
	var accounts = function(){
		var accounts = {
			bitly: {
				endpoint: 'http://api.' + i18n.getMessage('bitlyDomain') + '/v3/',
				login: 'laojun',
				apikey: 'R_d0b6148d88c19110c62f29acccba7f8f'
			},
			amazonCountryIds: {
				'amazon.co.uk': '3--21',
				'amazon.de': '4--21',
				'amazon.fr': '6--21',
				'amazon.ca': 'b--20',
				'amazon.com': 'ly--20',
				'amazon.co.jp': '5--22'
			}
		};

		return function( provider, name){
			return accounts[ provider] && accounts[ provider][ name] ?
				accounts[ provider][ name] :
				false;
		}
	}();

	var info_store = {
		last_url: '',
		request4title: false,
		title: ''
	};

	var showError = function( mess, time){
		l.$( 'hint').innerHTML = '<span>' + mess + '</span>';
		setTimeout( function(){
			l.$( 'hint').innerHTML = '';
		}, ( time || 2000))
	}

	var formatAmazonUrl = function( url){
		var asin, domain;
		domain = url.match( /(amazon\.(co\.uk|de|fr|ca|com|co\.jp|cn))/ );
		domain = domain ? domain[ 1] : false;
		if( domain && domain != 'amazon.cn' && ! url.match('rate-this' )){
			asin = url.match(/\/(?:dp|dp\/product|-|o\/asin|ASIN|gp\/product)\/+([0-9A-Z]{10})(\/|\?|$|%3F)/);
			asin = asin ? asin[ 1] : false;

			return asin ? 'http://' + domain + '/o/asin/' + asin +
				( accounts( 'amazonCountryIds', domain) ?
					'/' + accounts( 'amazonCountryIds', domain) :
					'' ) :
				false;
		}else if( domain == 'amazon.cn'){
			asin = url.match( /(?:asin=|prodid=|dp\/)([0-9A-Za-z]{10})/ );
			asin = asin ? asin[ 1] : false;

			return asin ? 'http://amazon.cn/dp/' + asin : false;
		}else{
			return false;
		}
	};

	var formatUrl = function( raw_url){
		var url = formatAmazonUrl( raw_url );
		if( url){
			return {
				needShorten: true,
				url: url
			}
		}else{
			return {
				needShorten: true,
				url: raw_url
			}
		}
	};

	var bitlySuccess = function( json){
		if( info_store[ 'request4title'] ){
			l.$( 'curr_tab').style.display = 'none';
		}

		var wait4title = function(){
			if( info_store[ 'request4title']){ //
				if( ! info_store[ 'title'] ){ // is title available?
					setTimeout( wait4title, 50);
					return;
				}
				saveHistory( {
					long_url: json[ 'data'][ 'long_url'],
					short_url: json[ 'data']['url' ],
					title: info_store[ 'title']
				})
				info_store[ 'title'] = ''; //
			} else {
                sogouExplorer.windows.getCurrent(function(win) {
                    sogouExplorer.tabs.getSelected(win.id, function(tab) {
					    saveHistory( {
						    long_url: json[ 'data'][ 'long_url'],
						    short_url: json[ 'data'][ 'url'],
						    title: tab.title
					    })
				    });
                });
			}
		}
		if( json[ 'status_code'] === 200){
			l.$( 's_url').value = json[ 'data'][ 'url'];
			l.$( 'hint').innerHTML = ''; // remove 'Crunching...'
			l.clipboard.copy( json[ 'data'][ 'url']);
			l.$( 's_url').focus();
			l.$( 's_url').select();
			wait4title();
		}else{
			showError( i18n.getMessage('errorInvalidLink'));
		}
	};

	var saveHistory = function( obj){
		var i, len, urls = [];
		if( window.localStorage && localStorage[ 'urls'] ){
			try{
				urls = JSON.parse( localStorage[ 'urls'] );
				for( i = 0, len = urls.length; i < len; i++){
					if( obj.short_url == urls[ i][ 1] ){
						break;
					}
				}
				if( i < len){ // exists
					urls.splice( i, 1)
				}
				urls.push( [
					obj.long_url,
					obj.short_url,
					obj.title
				])
				if( urls.length > 9){
					urls.shift();
				}
				localStorage[ 'urls'] = JSON.stringify( urls);
			}catch( e){
			}
		}else{
			urls = [ [
				obj.long_url,
				obj.short_url,
				obj.title
			]];
			try{
				localStorage[ 'urls'] = JSON.stringify( urls);
			}catch( e){}
		}
	};

	var shortenUrl = function( url){
		var remote_url = accounts( 'bitly', 'endpoint') + 'shorten?login=' + accounts( 'bitly', 'login') +
			'&apiKey=' + accounts( 'bitly', 'apikey') + '&uri=' + encodeURIComponent( url);
		l.$( 's_url').value = '';
		if( info_store[ 'request4title'] ){ // need request for title
			l.ajax( {
				url: url,
				dataType: 'text',
				success: function( txt){
					var title = txt.match( /<title\s*[^>]*>(.*)<\/title\s*\w*>/);
					info_store[ 'title'] = title ? ( title[ 1] ? title[ 1] : 'n/a') : 'n/a';
				},
				error: function(){
					info_store[ 'title'] = 'n/a';
				}
			})
		}
		l.ajax( { // shorten url
			url: remote_url,
			success: bitlySuccess,
			error: function(){
				info_store[ 'last_url'] = '';
				showError( i18n.getMessage('errorServiceNA'));
			}
		})
	};

	var isValidUrl = function( url){ // only HTTP, HTTPS, FTP is allowed
		var regexp = /^(?:https?|ftp):\/{0,3}[0-9.\-a-zA-Z]+/;
		return regexp.test( url);
	};
	var isDomain = function( url){
		var regexp = /^[0-9a-zA-Z][0-9\-a-zA-Z]*\..+/; // Domain must start with number or letter
		return regexp.test( url);
	};

	var bindEvent = function(){
		l.$( 's_url').addEventListener( 'mouseover', function(){
			var value = l.trim( l.$( 's_url').value );
			if( value ) {
				l.clipboard.copy( value);
				l.$( 'copy').style.display = 'inline';
			}
			l.$( 's_url').select();
		});
		l.$( 's_url').addEventListener( 'focus', function(){
			var value = l.trim( l.$( 's_url').value);
			if( value ) {
				l.$( 'copy').style.display = 'inline';
			}
		});

		l.$( 's_url').addEventListener( 'blur', function(){
			l.$( 'copy').style.display = 'none';
		});
	}

	var deleteHistory = function(){
		var urls, i;
		if( arguments.length == 0){ // remove all
			window.localStorage[ 'urls'] = '';
			l.$( 'history_title').style.display = 'none';
			l.$( 'clear_history').style.display = 'none';
			l.$( 'more').style.display = 'none';
		}else{ // remove one
			try{
				urls = JSON.parse( window.localStorage[ 'urls'] )
			}catch( e){
				return;
			}
			for( i = 0; i < urls.length; i++){
				if( urls[ i][ 1] == arguments[ 0]){
					break;
				}
			}
			if( urls.length === 1){
				l.$( 'history_title').style.display = 'none';
				l.$( 'clear_history').style.display = 'none';
				l.$( 'more').style.display = 'none';
			}
			if( i < urls.length){ // exists
				urls.splice( i, 1);
				try{
					window.localStorage[ 'urls'] = JSON.stringify( urls)
				}catch( e){
				}
			}
		}
	}

	var showHistory = function(){
		var urls, i, ul, li, a, div, input, img, span, clip;
		if( window.localStorage && localStorage[ 'urls'] ){
			try{
				urls = JSON.parse( localStorage[ 'urls'] );
			}catch( e){
				return;
			}
		}else{
			return;
		}
		if( urls.length < 1){
			return;
		}
		l.$( 'history_title').style.display = 'block';
		l.$( 'clear_history').style.display = 'block';

		ul = l.$( 'history');
		for( i = urls.length - 1; i >= 0; i-- ){
			li = document.createElement( 'li');
			a = document.createElement( 'a');
			a.setAttribute( 'target', '_blank');
			a.setAttribute( 'href', urls[ i][ 1]);
			a.innerHTML = urls[ i][ 2] || 'n/a';
			li.appendChild( a);

			div = document.createElement( 'div');
			input = document.createElement( 'input');
			input.value = urls[ i][ 1];
			div.appendChild( input);

			img = document.createElement( 'img')
			img.src = 'images/remove.png';
			img.title = 'remove';
			img.addEventListener( 'click', function( event){
				var input = event.target.previousSibling;
				input.parentNode.parentNode.style.display = 'none';
				deleteHistory( input.value);
			})
			div.appendChild( img);

			span = document.createElement('span');
			span.innerText = i18n.getMessage('textCopyPrompt');
			div.appendChild(span);

			div.addEventListener('mouseover', function(e){
				return function(){
					var input;
					input = e.getElementsByTagName('input')[0];
					input.select();
					input.focus();
					setTimeout( function(){
						e.getElementsByTagName('img')[ 0].style.display = 'block'
					}, 100)
				}
			}(div));

			div.addEventListener( 'mouseout', function( e){
				return function(){
					var input;
					input = e.getElementsByTagName( 'input')[ 0];
					input.blur();
					setTimeout( function(){
						e.getElementsByTagName( 'img')[ 0].style.display = 'none'
					}, 100)
				}

			}(div));

			li.appendChild( div);

			if( urls.length - i > 5){
				li.style.display = 'none';
			}

			ul.appendChild( li);

		}

		l.$( 'clear_history').addEventListener( 'click', function(){
			deleteHistory();
			l.$( 'history').style.display = 'none';
			l.$( 'history_title').style.display = 'none';
			l.$( 'clear_history').style.display = 'none';
		});

		if( urls.length > 5){
			l.$( 'more').style.display = 'block';
			l.$( 'more').addEventListener( 'click', function(){
				var ul, lis, i;
				ul = l.$( 'history');
                var old_height = ul.offsetHeight;
				lis = ul.getElementsByTagName( 'li');
				for( i = 5; i < lis.length; i++){
					lis[ i].style.display = 'block';
				}
				l.$( 'more').style.display = 'none';
			    window.resizeTo(420, 340 + ul.offsetHeight - old_height );
			})
		}
	}

	var init = function(){
        sogouExplorer.windows.getCurrent(function(win) {
            sogouExplorer.tabs.getSelected(win.id, function(tab) {
			if( ! tab.url ){
				setTimeout( init, 100);
				return;
			}
			var url_info;

			// initialize the interface
			l.$( 'short_link').innerText = i18n.getMessage('titleShortLink');
			l.$( 'curr_tab').innerText = " (" + i18n.getMessage('textCurrentTab') + ")";
			l.$( 'copy').innerText = i18n.getMessage('textCopyPrompt');
			l.$( 'history_title').innerText = i18n.getMessage('titleHistory');
			l.$( 'clear_history').innerText = i18n.getMessage('buttonClearHistory');
			l.$( 'more').innerText = i18n.getMessage('buttonMore');
			l.$('about').innerText = i18n.getMessage('about');
			l.$('help').innerText = i18n.getMessage('help');


			if( isValidUrl(tab.url) ){
				url_info = formatUrl( tab.url);
				if( url_info.needShorten ){
					shortenUrl( url_info.url );
					showError( i18n.getMessage( 'shortening'), 50000);
				}
			}else{
				showError( i18n.getMessage( 'errorInvalidLink') );
			}

			showHistory();

			bindEvent();
		});
        });
	}

    init();
})();
