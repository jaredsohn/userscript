// ==UserScript==

// @name Debanner

// @namespace http://codesex.org/

// @description Hides all images with size 88x31.

// @author BlackSilver

// @include *

// @exclude file://*
// @exclude http://telepay.wmtransfer.com/*

// ==/UserScript==



for(i=0; i<document.images.length; ++i) { // Прохожим по всем картинкам на странице

	img = document.images[i]; // Устанавливаем свою короткую ссылку на картинку

	if ( img.width == 88 && img.height == 31 ) // Проверяем размеры

		img.style.display = 'none'; // Скрываем картинку

}