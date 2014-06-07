// ==UserScript==
// @name            Magnet BitNova
// @description     Adds a column with Magnet Links to search results on BitNova.info. It uses the informations given on subpages
// @author          Marek "Sudlik" Sudoł
// @version         3
// @namespace       http://sudlik.pl/mbn
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require         http://sizzlemctwizzle.com/updater.php?id=101726
// @resource        image http://magnet-uri.sourceforge.net/magnet-icon-14w-14h.gif
// @include         http://bitnova.info/search/?q=*
// ==/UserScript==

$(function(){

	// Declare consts
	var URI_HASH='magnet:?xt=urn:btih:',
		URI_NAME='&dn=',
		URI_TRACKER='&tr=',
		STYLE='.sudlik-pl-mbn{cursor:pointer}',
		SELECTOR_HASH='div > table:nth-child(2) > tbody > :first-child > :nth-child(2) >  table.lista:first-of-type > tbody >  :nth-child(2) > td > table.lista:nth-of-type(2) > tbody > .lista:first-child > :nth-child(2)',
		SELECTOR_TRACKER='div > table:nth-child(2) > tbody > :first-child > :nth-child(2) >  table.lista:first-of-type > tbody >  :nth-child(2) > td > table.lista:nth-of-type(2) > tbody > :nth-child(3) > :nth-child(2) > div',
		IMAGE_LOADING='data:image/gif;base64,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',
		IMAGE_MAGNET=GM_getResourceURL('image'),
	
	// Declare vars
		element,
		temp={};

	// Get table
	element=$('.lista > tbody > :nth-child(2) > td > .lista');

	// Check results
	if(!element.find('td[colspan="6"]').length){

		// Set styles
		GM_addStyle(STYLE);
		
		// Set table header
		element
			.find('tr:first :nth-child(3)')
			.after(
				element
					.find('tr:first > :first')
					.clone()
					.text('ML'));

		// Set table elements
		element
			.find('tr:not(:first) :nth-child(3)')
			.after(
				element
					.find('tr:nth-child(2) > :first')
					.clone()
					.html(
						$('<img>')
							.attr('src',IMAGE_MAGNET)
							.addClass('sudlik-pl-mbn')));

		// Set click handle
		$('.sudlik-pl-mbn').live('click',
			function(){
				temp[1]=$(this);
				temp[1].attr('src',IMAGE_LOADING);
				temp[2]=temp[1]
					.parent()
					.siblings()
					.slice(1,2)
					.children();
				GM_xmlhttpRequest({
					method:'GET',
					url:temp[2].attr('href'),
					onerror:function(){
						alert('Greasemonkey: Magnet BitNova. Błąd!');},
					onload:function(data){
						temp[3]=data.responseText.match(/\s*([a-z0-9]{40})\s*/i);
						$.each(
							data.responseText.match(/\s*(http.*?\/announce(?:\..{1,3})?)\s*/gi),
							function(k,v){
								temp[4]+=URI_TRACKER+v;});
						temp[5]=URI_HASH
							+temp[3][1]
							+URI_NAME
							+temp[2].text()
							+temp[4];
						window.location.replace(temp[5]);
						temp[1]
							.parent()
							.html($('<a>')
								.attr('href',temp[5])
								.append(temp[1]));
						temp[1]
							.removeClass('sudlik-pl-mbn')
							.attr('src',IMAGE_MAGNET);}});});}}());