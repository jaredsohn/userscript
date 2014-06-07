// ==UserScript==
// @name           antitroll v0.8
// @creator        elemes, Sage
// @namespace      forum.index.hu
// @description    Index fórum zombifilter - edited by Sage
// @version        0.8
// @include        http://forum.index.hu/*
// ==/UserScript==


// Sage módosítása (2008.10.22):  
// Kikerült:
//  - A scriptbe közvetlen írt felhasználók listája és ezek szűrése.
//  - Troll management el nem készült funkció és menüpont
// Bekerült:
//  - Innentől a troll nevére nem csak a név mezőben szűr, hanem
// bárhol ahol ez megjelenik egy hozzászólás blokkban (akár commentként, akár előzmény felhasználóként),
// azt nem jelenítjük meg. Így a trollnak válaszolók üzeneteitől is megszabadulunk.


var a, f, i, k, n, q, r, s, t, y, m, x, w, b, p;

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

y = GM_getValue( 'polforum-trollok', ";" );
if( y == null ) { GM_setValue( 'polforum-trollok', ";" );}

t = document.evaluate( "//table[@class='art']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
k = m = 0;
for( i = 0; i < t.snapshotLength; i++ ) {
	bb=0;
    r = t.snapshotItem( i );
	s = r.getElementsByTagName( "strong" ); //felhasználók
	a = s[ 0 ].innerHTML; //blokk felhasználója 
	q = y.indexOf( a ); //prefs.js -ben tárolt felhasználók
		
	if( q > -1 ) {;
		r.parentNode.removeChild( r );		
		bb=1;
		k++;
	} 
	 else {
			b = y.replace(/>/g,'');
			p = b.split('<');
			
			for(w = 1; w < p.length; w++ )  
				if (r.innerHTML.match(p[w])) { 	 
				r.parentNode.removeChild(r);
				bb=1;
				m++;
	  }
	
	} 

	if(bb==0) {
		u = r.getElementsByTagName( "a" );
		u[ 1 ].parentNode.insertBefore(
		createButton( r, zmark, a, 22, 9,
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAJCAIAAABWlCAcAAAACXBIWXMAAA7EAAAOx'+
		'AGVKw4bAAAATElEQVR4nK2QwQoAIAhDt+j/f9kOQYjoLGgnFZ1PaWaQItn2DDFMskpvXQB4BI3T095oJsaO/OxI'+
		'i59Z1Her4MEljAkLpH/ZCpfqwxdQEB4ag5GrLwAAAABJRU5ErkJggg%3D%3D'), u[ 1 ].nextSibling );
	}
   
}

if( (k+m) > 0 ) GM_log( document.title + ' deleted: ' + k + ' / ' + m );
