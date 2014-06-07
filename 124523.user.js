// ==UserScript==
// @name           FFnet filter favorites
// @namespace      fanfiction
// @include        http://www.fanfiction.net/u/*
// ==/UserScript==

var limitWordCount = 100000;
var limitRating = 100;
var limitComplete = 0;
var aFavoriteOriginal;

function iniciar (){
	aFavoriteOriginal = unsafeWindow.fs_array;
	addButtons();
}

function filterFavorites (){
	var aFavoriteFiltered = new Array();
	limitWordCount = parseInt ( prompt ("Minimum wordcount:", limitWordCount) );
	limitRating =  parseInt ( prompt ("Minimum reviews:", limitRating) );
	limitComplete = parseInt ( prompt ("Only completes (0-all, 1-not complete, 2-complete) :", limitComplete) );

	for ( var i=aFavoriteOriginal.length-1; i>=0; --i ){
		if ( validateCond(aFavoriteOriginal[i]) ){
				aFavoriteFiltered.push (aFavoriteOriginal[i]);
		}
	}
//	alert ('filtrats: '+ aFavoriteFiltered.length);
	unsafeWindow.fs_array = new Array();
	unsafeWindow.fs_array = aFavoriteFiltered;	
	unsafeWindow.storylist_draw('fs_inside', unsafeWindow.fs_array, 1, 1, 1);
}

function validateCond (obj) {
	var validat = true;
		if (obj.wordcount<limitWordCount){ validat = false; }
		if (obj.ratingtimes<limitRating){ validat = false; }
		if (limitComplete != 0){
				if (obj.statusid != limitComplete) { validat = false; }
		}
	return (validat);
}

function addButtons(){
	var elem=document.getElementById('l_fs').parentNode;
	var addFiltrarFavoritsButton=document.createElement('a');

	addFiltrarFavoritsButton.href='javascript:';
	addFiltrarFavoritsButton.innerHTML='Filter favorites';
	addFiltrarFavoritsButton.setAttribute('title','Filter favorite stories by params');		
	addFiltrarFavoritsButton.addEventListener('click',filterFavorites,false);

	elem.appendChild (document.createTextNode(' -  '));
	elem.appendChild (addFiltrarFavoritsButton);
}

iniciar ();
