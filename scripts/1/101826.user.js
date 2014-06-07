// ==UserScript==
// @name            Torrent Hash2Magnet
// @description     Create MagnetLink (Magnet URI Scheme) for each BitTorrent Info Hash found on the web
// @author          Marek "Sudlik" Sudoł
// @version         3
// @namespace       http://sudlik.pl/th2m
// @icon            http://magnet-uri.sourceforge.net/magnet-icon-14w-14h.gif
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require         http://sizzlemctwizzle.com/updater.php?id=101826
// @resource        image http://magnet-uri.sourceforge.net/magnet-icon-14w-14h.gif
// @include         *
// ==/UserScript==

$(function(){

	// Declare vars
	var HASH='magnet:?xt=urn:btih:',
		NAME='&dn=',
		TRACKER='&tr=',
		TITLE='Greasemonkey: Torrent Hash2Magnet',
		ALT='MagnetLink (Magnet URI Scheme)',
		temp={};
	// var elements, $this;

	// Check MagnetLink exists
	if(!$('a[href^="'+HASH+'"]','body').length){

		// Set element and href Object Data
		var elements=$(':not(:empty)','body').filter(
			function(){
				var $this=$(this);
				temp[0]=$this
					.text()
					.match(/^\s*([a-z0-9]{40})\s*$/i);
				if(!!temp[0]){
					$this.data({
						hash:temp[0][1],
						href:HASH+temp[0][1]});}
				return!!temp[0];});

		// Check elements exists
		if(elements.length){
			elements.each(
				function(){
					var $this=$(this);

					// Set grandparent (oldest not-common ancestor)
					$this.data('grandparent',$this
						.parents()
						.not(elements.not($this).parents())
						.last()
						.html());

					// Set name
					if(elements.length<2){
						$this.data('href',$this.data('href')+NAME+$('title','head').text());}
					else{
						temp[1]=$this
							.data('grandparent')
							.match(/[=\/](.*?)\.torrent\s?/i);
						if(!temp[1]){
							temp[1]=$('title','head').text();}
						$this.data('href',$this.data('href')+NAME+temp[1]);}

					// Set trackers
					temp[2]='';
					if($this.data('grandparent').match(/\s*(http.*?\/announce(?:\..{1,3})?)\s*/gi)){
						$.each(
							$this
								.data('grandparent')
								.match(/\s*(http.*?\/announce(?:\..{1,3})?)\s*/gi),
							function(k,v){
								temp[2]+=TRACKER+v;});
						$this.data('href',$this.data('href')+temp[2]);}

					// Append nodes
					elements.each(
						function(){
							var $this=$(this);
							$this
								.contents()
								.filter(
									function(){
										return(this.nodeType===3&&$.trim(this.nodeValue)===$this.data('hash'));})
								.replaceWith(
									$('<a>')
										.attr({
											href:$this.data('href'),
											title:TITLE})
										.append(
											$this.data('hash'),
											'&nbsp;',
											$('<img>')
												.attr({
													alt:ALT,
													src:GM_getResourceURL('image')})));});});}}});