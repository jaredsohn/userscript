// ==UserScript==
// @name        expand
// @namespace   zaonce.com
// @description Expands columns in Bugzilla search results
// @author      nige@zaonce.com
// ==/UserScript==

(
    function () {
        if( document.title.substring( 0, 8 ) == 'Bug List' )
        {
            var spans = document.getElementsByTagName('span');
            for( i = 0; i < spans.length;i++ )
            {
                if( spans[ i ].title.length > 0 )
                {               
                    spans[ i ].innerHTML = spans[ i ].title;
                }
            }
        }
})();