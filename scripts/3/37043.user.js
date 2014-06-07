// ==UserScript==
// @name           pornfucka.adultforumhost.com images to PROPER images
// @description    Change image links in jj.am to proper imgs
// @include        http:*pornfucka.adultforumhost.com*
// @exclude
// @version	       0.1
// ==/UserScript==
var list = document.getElementsByTagName('IMG');
for (var i = 0; i < list.length; i++) {
	var img = list[i];
	
	if ( img.getAttribute("src").indexOf( 'cocoimage.com' ) > 0 ){
            var src = img.getAttribute("src") + '';
            src = src.replace( '/thumb/', '/showimg.php?v=3700216434&ext=jpg&id=' )
            src = src.replace( '.jpeg', '' )
            img.parentNode.setAttribute( 'href', src );
    
    } else {
        var src = img.getAttribute("src") + '';
        if ( src.indexOf( 'http://img' ) == 0 ){
            src = src.substring( 0, src.indexOf( '.' ) + 1 ) + 'hotlinkimage.com/IMG22723122' + src.substring( src.lastIndexOf( '/' ) );
            src = src.replace( '.jpeg', '.jpg' )
            img.parentNode.setAttribute( 'href', src );
        }
    
    }

}