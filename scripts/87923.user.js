// ==UserScript==
// @name           IZ fixed by LibreOffice
// @namespace      http://userscripts.org/users/232861
// @description    Adds some message to IZ bugs fixed in LibreOffice
// @include        http://openoffice.org/bugzilla/show_bug.cgi?id=*
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://download.go-oo.org/iz/fixed-iz-bugs.log",
  onload: function(response) {

    var s = document.location.search;
    var id = s.substring( 4, s.length );
    var re = new RegExp( "(^|\\n)" + id + "(\\n|$)", "g" );

    var fixed_bugs = response.responseText;

    GM_log( 'bug to check: ' + id );

    if ( re.test( fixed_bugs ) ) {
        GM_log( 'Bug is fixed in LibreOffice' );

        var elmTitle;
        elmTitle = document.getElementById('bz-title');
        elmTitle.setAttribute( "style", 
                "border-bottom: 1px solid #18A303; border-top: 1px solid #18A303;" + 
                "background: #84F671 url(http://download.go-oo.org/iz/FixinLO.png) no-repeat right;" );
    }
  }
});


