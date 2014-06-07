// ==UserScript==
// @name          Deprecate Me
// @namespace     http://o19s.r10.railsrumble.com/
// @description   Add Deprecated Stamp to Gems
// @copyright     2010 Youssef Chaker
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.2.2
//
// @include  http://github.com/*
// @include  https://github.com/*
// @include  http://*.github.com/*
// @include  http://rubygems.org/*
// @include  http://*.rubygems.org/*
//
// ==/UserScript==

function parseUrl1(data) {
	var arrayOfStrings = data.split('/');
	var githubIndex = arrayOfStrings.indexOf('github.com');
	var gemcutterIndex = arrayOfStrings.indexOf('rubygems.org');
	if(githubIndex != -1) {
		 return arrayOfStrings[githubIndex + 2];
	}else if(gemcutterIndex != -1) {
		return arrayOfStrings[gemcutterIndex + 2];
	}
	return '';
}


var host = window.location.host;
var url = window.location.href;
var gem = parseUrl1(url);

if ( "github.com" == host) {
}else if ( "rubygems.org" == host) { 
}

if(gem != '') {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://o19s.r10.railsrumble.com/api/rubygem/' + gem + '.xml',

		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var deprecated = dom.getElementsByTagName('deprecated')[0];
			if ('true' == deprecated.textContent) {
				var imageDiv = document.createElement("div");
				imageDiv.innerHTML = '<div style="float: left; ' +
				'position: absolute; ' +
				'top: 150px; width: 460px; z-index: 1000; "> ' +
				'<img border="0" src="http://o19s.r10.railsrumble.com/images/deprecated-stamp-right.png" alt="Deprecated-stamp-right"></div>';

				if( "localhost" == host) {
					var div = document.getElementById('wrapper');
					div.appendChild( imageDiv );
				}else if ( "github.com" == host) {
					var div = document.getElementById('repo_details');
					div.appendChild( imageDiv );
				}else if ( "rubygems.org" == host) {
					var div = document.getElementById('markup').parentNode;
					div.appendChild( imageDiv );
				}
			}
		}
	});
}