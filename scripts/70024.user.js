// ==UserScript==
// @name           Manga Volume Chapter Loader
// @namespace      sillymokona
// @include        http://www.mangavolume.com/*/*/
// ==/UserScript==

function loadPage( url, img )
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 )
		{
			if( xhr.status == 200 )
			{
				var imgSrc = new String( xhr.responseText ).match( /<img[^>]+mangaPage[^>]+>/gm )[0].split( '"' )[1];
				img.addEventListener( "error", function(){
					img.src = "";
					img.src = imgSrc;
				}, true );
				img.src = imgSrc;
			}
			else
			{
				console.log( "Status:", xhr.statusText, "Failed to load URL:", url );
			}
		}
	};
	xhr.open( "GET", url, true );
	xhr.send( null );
}

var chapterSelect = document.getElementById( "chapter_select" );
var pageSelect = document.getElementById( "page_select" );
var head = document.getElementsByTagName( "head" )[0];
var body = document.body;
var serie = head.innerHTML.match( /current_serie_url.+/ );
if( serie )
{
	serie = serie[0].split( '"' )[1];
}
var chapter = head.innerHTML.match( /current_chapter_url.+/ );
if( chapter )
{
	chapter = chapter[0].split( '"' )[1];
}

if( !serie || !chapter )
{
	return;
}

while( head.hasChildNodes() )
{
	head.removeChild( head.lastChild );
}
while( body.hasChildNodes() )
{
	body.removeChild( body.lastChild );
}

var rules = [
	"body { background: #000000; color: #FFFFFF; }",
	"img { margin: 20px auto; display: block; }",
	"#chapter_select { margin-left: auto; margin-right: auto; display: block; }"
];

var style = document.createElement( "style" );
style.type = "text/css";
head.appendChild( style );

var max = rules.length;
for( i = 0; i < max; i++ )
{
	document.styleSheets[0].insertRule( rules[i], i );
}

chapterSelect.addEventListener( "change", function( e ){
	window.location = "http://www.mangavolume.com/index.php?serie=" + serie + "&chapter=" + e.target.value;
}, true );
body.appendChild( chapterSelect );

for( var i = 0; i < pageSelect.options.length; i++ )
{
	var url = "http://www.mangavolume.com/index.php?serie=" + serie + "&chapter=" + chapter + "&page_nr=" + pageSelect.options[i].value;
	var img = document.createElement( "img" );
	img.alt = pageSelect.options[i].text;
	body.appendChild( img );
	loadPage( url, img );
}