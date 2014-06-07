// ==UserScript==
// @name Old Orkut enforce
// @author Roger Lima (http://www.orkut.com.br/Main#Profile?uid=5649121994982010827)
// @date 11/mar/2012
// @version 2.0

// @include http://www.orkut.com.br/*
// ==/UserScript==

(function enforce() {
	href  = location.href,
	local = /(Comm.+)\?/;

	//Para caso a página seja acessada diretamente por um link sem o ".aspx":
	if ( /Main/.exec( href ) && !/aspx/.exec( href ) ) {
		location.href = href.replace( local, '$1.aspx?' );
	}
		
	//Adiciona a extensão ".aspx" em todos os links da página
	for ( i = 0, j = unsafeWindow.orkutFrame.document.getElementsByTagName( 'a' ); ++i < j.length; ) {
		if ( !( j[i].href.search( '.aspx' ) > -1 ) ) {
			j[i].href = j[i].href.replace( local, '$1.aspx?' );
		}
	}
	
	setTimeout( function() { enforce() }, 100 );	
})();