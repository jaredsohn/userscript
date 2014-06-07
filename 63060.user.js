// ==UserScript==
// @name           bbPress Plugin Stats
// @namespace      http://nightgunner5.wordpress.com/
// @include        http://bbpress.org/plugins/topic/*
// @homepage       http://nightgunner5.wordpress.com/tag/plugin-stats/
// ==/UserScript==

var statsButton = document.getElementById( 'sections' ).getElementsByClassName( 'section-stats' )[0];

// From http://code.google.com/apis/chart/formats.html#encoding_data
function simpleEncode( valueArray, maxValue ) {
	var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.',
		chartData = 'e:',
		maxEncoding = simpleEncoding.length * simpleEncoding.length - 1;
	if ( valueArray.length > 900 ) {
		simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		chartData = 's:';
		maxEncoding = simpleEncoding.length - 1;
	}
	for ( var i in valueArray ) {
		var currentValue = valueArray[i];
		if ( valueArray.length > 900 ) {
			if ( !isNaN( currentValue ) && currentValue >= 0 ) {
				chartData += simpleEncoding.charAt( Math.round( maxEncoding * currentValue / maxValue ) );
			} else {
				chartData += '_';
			}
		} else {
			if ( !isNaN( currentValue ) && currentValue >= 0 ) {
				var tmp = Math.round( maxEncoding * currentValue / maxValue );
				chartData += simpleEncoding.charAt( Math.floor( tmp / simpleEncoding.length ) );
				chartData += simpleEncoding.charAt( tmp % simpleEncoding.length );
			} else {
				chartData += '__';
			}
		}
	}
	return chartData;
}

function makeDates( _data ) {
	var data = [], ret = '', i, j;

	for ( i in _data )
		data.push( i );

	for ( i = 0, j = Math.max( Math.floor( data.length / 8 ), 1 ); i < data.length; i += j ) {
		ret += data[i] + '|';
	}

	return ret.substr( 0, ret.length - 1 );
}

function commaify( num ) {
	num += '';
	var r = /(\d+)(\d{3})/;

	while ( r.test( num ) ) {
		num = num.replace( r, '$1,$2' );
	}

	return num;
}

function getToday( data ) {
	var ret;
	for ( var i in data )
		ret = data[i];

	return commaify( ret );
}

function getYesterday( data ) {
	var ret, old = 0;
	for ( var i in data ) {
		ret = old;
		old = data[i];
	}

	return commaify( ret );
}

function getLastWeek( _data ) {
	var ret = 0, data = [];

	for ( var i in _data )
		data.push( _data[i] );

	for ( var i = 1; i < 8; i++ )
		ret += data[data.length - i] ? data[data.length - i] : 0;

	return commaify( ret );
}

function getAllTime( data ) {
	var ret = 0;
	for ( var i in data )
		ret += data[i];

	return commaify( ret );
}

if ( ( /\bcurrent\b/ ).test( statsButton.className ) ) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://bbpress.org/extend/stats/plugin-xml.php?slug=' + ( /^http:\/\/bbpress\.org\/plugins\/topic\/([^\/]+)\/stats\/?$/ ).exec( location.href )[1],
		headers: {
			Accept: 'text/xml'
		},
		onload: function( response ){
			if ( !response.responseXML )
				response.responseXML = new DOMParser().parseFromString( response.responseText, 'text/xml' );

			var data = [],
				max = 0,
				iterator = response.responseXML.documentElement.firstElementChild.firstElementChild.firstElementChild,
				iterator2 = response.responseXML.documentElement.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
			while ( iterator = iterator.nextElementSibling ) {
				iterator2 = iterator2.nextElementSibling;

				data[iterator.textContent] = +iterator2.textContent;

				max = Math.max( max, iterator2.textContent );
			}

			var dates = makeDates( data ), _data = data;

			data = [];
			for ( var i in _data ) {
				data.push( _data[i] );
			}

			var img, rightColumn = document.createElement( 'div' );

			rightColumn.className = 'column-right';

			if (data.length == 1 && data[0] == 0) {
				img = document.createElement( 'div' );
				img.style.fontSize = '5em';
				img.style.width = '670px';
				img.style.height = '400px';
				img.style.lineHeight = '400px';
				img.style.textAlign = 'center';
				img.innerHTML = 'No data yet';

				rightColumn.innerHTML = '<h4><a>No data yet</a></h4><p>Maybe tomorrow.</p>';
			} else {
				data = simpleEncode( data, max );

				img = document.createElement( 'img' );
				img.src = 'http://chart.apis.google.com/chart?chs=670x400&cht=lc&chco=005500&chd=' + data + '&chxt=x,y&chxl=0:|' + dates + '&chxr=1,0,' + max;
				img.width = 670;
				img.height = 400;

				rightColumn.innerHTML = '<h4><a title="Click here to make the each day cumulative.">History</a></h4>' +
										'<p><strong>Today</strong>: ' + getToday( _data ) + '</p>' +
										'<p><strong>Yesterday</strong>: ' + getYesterday( _data ) + '</p>' +
										'<p><strong>Last Week</strong>: ' + getLastWeek( _data ) + '</p>' +
										'<p><strong>All Time</strong>: ' + getAllTime( _data ) + '</p>';

				var cumulative = false;
				rightColumn.getElementsByTagName( 'a' )[0].addEventListener( 'click', function(){
					cumulative = !cumulative;

					if ( cumulative ) {
						var data = [], temp = 0;
						for ( var i in _data ) {
							temp += _data[i];
							data.push( temp );
						}
						img.src = 'http://chart.apis.google.com/chart?chs=670x400&cht=lc&chco=005500&chd=' + simpleEncode( data, temp ) + '&chxt=x,y&chxl=0:|' + dates + '&chxr=1,0,' + temp;
						this.title = 'Click here to make the each day seperate.';
					} else {
						var data = [];
						for ( var i in _data ) {
							data.push( _data[i] );
						}

						img.src = 'http://chart.apis.google.com/chart?chs=670x400&cht=lc&chco=005500&chd=' + simpleEncode( data, max ) + '&chxt=x,y&chxl=0:|' + dates + '&chxr=1,0,' + max;
						this.title = 'Click here to make the each day cumulative.';
					}
				}, false );
			}

			var area = document.getElementsByClassName('post')[0];

			area.firstElementChild.innerHTML = '';
			area.firstElementChild.appendChild(img);
			area.parentNode.insertBefore( rightColumn, area );
		}
	});
}
