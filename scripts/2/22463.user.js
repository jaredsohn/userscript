// ==UserScript==
// @name           antitroll v0.7
// @namespace      forum.index.hu
// @description    Index fórum zombifilter
// @include        *
// ==/UserScript==

// további feladat: zombilista menedzsment

var a, f, i, j, k, n, p, q, r, s, t, y, z;
z = "Andris55;zsolti05;kriszkó;illacsuri;damm;geszthi;gorgontoa;Iparirobot;tejfölfancsi;"+
"breien;pujii;feketeesfeher;33nev;ebenezer;dvhr;toloba;Rot Shafranek;Libera nos, Domine!;"+
"guberáló;Droopy;pvcpadlo;makopa;Kiss G. Eszter;Neweurope;";

f = /^http:\/\/forum.index.hu\/Article\//;
if( ! document.URL.match( f )) { return; }

function zmark( event ) {
var link, s;
link = event.currentTarget;
s = event.currentTarget.title;
alert( s + ' nicket trollnak jelölted.\nFrissítem az oldalt.' );
y = y + '<'+ s + '>';
GM_setValue( 'polforum-trollok', y );
window.location.reload(true) // tiszta lappal kezdünk
} 

function createButton(target, func, title, width, height, src) {
var img, button;
img = document.createElement('img');
img.width = width;
img.height = height;
img.src = src;
img.alt = 'mark '+ title +' as troll';
button = document.createElement('a');
button.title = title;
button.addEventListener('click', zmark, true); 
button.appendChild(img);
return button;
}

function trollmanage() {
alert( 'A trollok elegáns rendezgetése egyelõre nem mûködik.\n'+
'A következõ verzióban lesz rendes troll-menedzsment.' );
return;
}

GM_registerMenuCommand( 'Trollok rendezése', trollmanage, null, null, null );

y = GM_getValue( 'polforum-trollok', ";" );
if( y == null ) { GM_setValue( 'polforum-trollok', ";" );}

t = document.evaluate( "//table[@class='art']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
j = k = 0;
for( i = 0; i < t.snapshotLength; i++ ) {
	r = t.snapshotItem( i );
	s = r.getElementsByTagName( "strong" );
	a = s[ 0 ].innerHTML;
	p = z.indexOf( a );
	if( p > -1 ) {
		r.parentNode.removeChild( r );
		j++;
		}
	else if(( q = y.indexOf( a )) > -1 ) {;
		r.parentNode.removeChild( r );
		k++;
	} else {
		u = r.getElementsByTagName( "a" );
		u[ 1 ].parentNode.insertBefore(
		createButton( r, zmark, a, 22, 9,
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAJCAIAAABWlCAcAAAACXBIWXMAAA7EAAAOx'+
		'AGVKw4bAAAATElEQVR4nK2QwQoAIAhDt+j/f9kOQYjoLGgnFZ1PaWaQItn2DDFMskpvXQB4BI3T095oJsaO/OxI'+
		'i59Z1Her4MEljAkLpH/ZCpfqwxdQEB4ag5GrLwAAAABJRU5ErkJggg%3D%3D'), u[ 1 ].nextSibling );
	}
}
if( j > 0 ) GM_log( document.title + ' deleted: ' + j + ' / ' + k );
