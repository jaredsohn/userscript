// ==UserScript==
// @name           yourabikit
// @namespace      http://www.oreilly.com/catalog/greasemonkeyhacks/
// @include        http://www.your-abi-kit.de/stufe/*/gruesse/write
// ==/UserScript==



setTimeout(function() {isLoaded();},100);

function isLoaded () {
	a_divs = document.getElementsByTagName('div')
	for( var i = 0; i < a_divs.length; i++ ) { 
		if ( a_divs[i].id.match( /loadingcontainer/ ) ) { 
			if (a_divs[i].style.display == 'block') {
				setTimeout(function() {isLoaded();},100);
			} else {
				var a_trs = document.getElementsByTagName('tr');
				var a_users = new Array(100);
				for( var i = 0; i < a_trs.length; i++ ) { 
					a_user = a_trs[i].innerHTML.match(/<td>(.+?)<\/td><td><a href=.\/stufe\/gruesse\/write\/(\d+?)"/);
					if ( a_user ) {a_users[a_user[2]] = a_user[1]}
				}
				//alert(a_users);
				for( var i = 0; i < a_trs.length; i++ ) { 
					if ( a_trs[i].innerHTML.match(/<td>Anonym<\/td>/) ) {
						a_childtds = a_trs[i].getElementsByTagName('td');
						id = a_childtds[1].innerHTML.match(/valkomg-(\d+?)-/);
						a_childtds[0].innerHTML = '<- '+a_users[id[1]];
					}
				}
				break;
			}
		}
	}
}