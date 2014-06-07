// ==UserScript==
// @name        	Formatador de referências
// @namespace   	Nenhum
// @description 	Formata referências para serem usadas na Wikipédia
// @version     	1.1
// @date		02/ago/2013
// @grant          	none
// @exclude		*wikipedia.org*
// ==/UserScript==

( function( window ) {
'use strict';

function formatterReferences( event ) {
	var archive, ref,
		date = new Date(),
		months = [
			'janeiro', 'fevereiro', 'março', 'abril',
			'maio', 'junho', 'julho', 'agosto',
			'setembro', 'outubro', 'novembro', 'dezembro'
		];

	ref = '<ref>{{Citar web|url=' + location.href
		+ '|título=' + document.title
		+ '|publicado=' + location.hostname
		+ '|acessodata=' + [
			date.getDate().toString().replace( /^0/, '' ).replace( /^(1)$/, '$1º' ),
			months[ date.getMonth() ],
			date.getFullYear()
		].join( ' de ' )
		+ '}}</ref>';

	if ( location.hostname === 'web.archive.org' ) {
		archive = /b\/(\d+)/g.exec( location.href );

		ref = ref.replace(
			ref.substr( ref.indexOf( '=' ) + 1, location.href.length ),
			/\d\/(.+)/.exec( location.href )[ 1 ]
				+ '|arquivourl=' + location.href
				+ '|arquivodata=' + [
					archive[ 1 ].substr( 6, 2 ).replace( /^0/, '' ).replace( /^(1)$/, '$1º' ),
					months[ archive[ 1 ].substr( 4, 2 ).replace( /^0/, '' ) - 1 ],
					archive[ 1 ].substr( 0, 4 )
				].join( ' de ' )
		);
	}

	window.prompt( 'Referência formatada: ', ref );
}

document.onkeydown = function( event ) {
	if ( event.ctrlKey && event.keyCode === 81 ) {
		formatterReferences( event );
	}
};

} )( window );