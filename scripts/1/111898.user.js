// ==UserScript==
// @name           MangaReader-img_preload_resize
// @namespace      justjustin.mangareader.imgpreload
// @include        http://www.mangareader.net/*
// @run-at         document-end
// ==/UserScript==

function script(){
	//Settings
	var img_selector = '#img';
	var wrap_selector = '#imgholder';
	var menu_selector = '#pageMenu';
	var chapter_selector = '#chapterMenu';
	
	var put_id = 'preload_chapter_images';
	var prev_put_id = 'preload_chapter_prev';
	var next_put_id = 'preload_chapter_next';
	var simultaneous = 5;
	var retry = 3;
	var debug = true;
	//Testing this
	var chapters = true;

	//script vars
	var run_once = false;
	var runs = 0;
	
	var got_chapters = false;
	var chapter_list = [];
	var current_chapter;
	
	var prev_data = [];
	var next_data = [];
	var page_data = [];
	
	document.onkeydown = null;
	wait();
	
	//Makes sure jQuery is loaded before running shit.
	function wait(count){
		if(typeof count == 'undefined'){
			count = 0;
		}
		if(typeof window.jQuery == 'undefined')
		{
			setTimeout(wait, 100, count + 1);
		}
		else{
			log('Took '+count+'attempts. '+(count * 100)+'ms');
			try_run_once();
		}
	}
	
	function try_run_once(){
		if($(img_selector).length == 0){
			run_once = true;
		}
		if(run_once == false){
			log('running once');
			run_once = true;
			run();
		}
	}
	
	function run(){
		
		$('.prevnext .prev').find('a').click(function(){
			prev_img();
			return false;
		});
		$('.prevnext .next').find('a').click(function(){
			next_img();
			return false;
		});
	
		image_resize();
		$(window).resize(image_resize);
		
		$(wrap_selector).append("<div id='"+put_id+"' style='display:none;'></div>");
		$(wrap_selector).css('position','relative');

		document.onkeydown = myKeyPressed;

		if(chapters){
			$(wrap_selector).append("<div id='"+prev_put_id+"' style='display:none;'></div>");
			$(wrap_selector).append("<div id='"+next_put_id+"' style='display:none;'></div>");
			
			//get_chapters();
		}
		
		page_data['put_selector'] = "#" + put_id;
		
		get_chapter(page_data, location.pathname, document);
		
	}
	
	function get_chapter(get_data, page_url, page){
		
		get_data['load']  = true;
		
		get_data['chapter'] = page_url;
		
		if(typeof page == 'undefined'){
			$.ajax({
				type:'get',
				url: page_url,
				success: function(data){
					get_chapter(get_data, page_url, data);
				},
				error: function(){
					get_chapter(get_data, page_url);
				}
			});
			return;
		}
		
		log('chapter_get');
		
		var new_pages = [];
		var new_urls = [];
		var new_imgs = [];
		
		
		log('menu_get');
		$(page).find(menu_selector + ' option').each(function(){
			new_pages.push($(this).html());
			new_urls.push($(this).val());
			
			if($(this).is(':selected')){
				get_data['current_page'] = $(this).html() - 1;
				get_data['load_page'] = $(this).html();
			}
		});
		get_data['last_page'] = new_pages.length-1;
		
		log('chap_set');
		get_data['next_chapter'] = $(page).find('table.c5 a:first').attr('href');
		get_data['prev_chapter'] = $(page).find('table.c5 a:last').attr('href');
		
		log('img_get');
		new_imgs[get_data['current_page']] = $(page).find(img_selector).attr('src');
		
		log('arr Set');
		get_data['pages'] = new_pages;
		get_data['urls'] = new_urls;
		get_data['imgs'] = new_imgs;
		
		log('getting images next');
		for(var i = 0; i < simultaneous ; i++){
			get_imgs(get_data);
		}
	}

	function get_img(get_data, page, attempt){
		if(typeof attempt == 'undefined'){
			attempt = 0;
		}
		$.ajax({
			type:'get',
			url: get_data['urls'][page],
			success: function(data){
				get_data['imgs'][page] = $(data).find(img_selector).attr('src');
				$(get_data['put_selector']).append('<img src="'+get_data['imgs'][page]+'" alt="preload"/>');
				get_imgs(get_data);
				if(page == get_data['current_page'] && get_data['chapter'] == page_data['chapter']){
					$('#pre_loading_gif').remove();
					var img = document.createElement('img');
					img.src = get_data['imgs'][page];
					img.alt = "Page " + (page + 1);
					img.id = $(img_selector).attr('id');
					$(img_selector).replaceWith(img);
					image_resize();
				}
			},
			error: function(obj){
				log('error '+attempt+'nd_run status:'+obj.status);
				if(attempt < retry){
					get_img(get_data, page, attempt + 1);
				}
				else{
					get_imgs(get_data);
				}
			}
		});
	}

	function get_imgs(get_data)
	{
		if(get_data['load_page'] > get_data['last_page']){
			get_data['load_page'] = 0;
		}
		if(typeof get_data['imgs'][get_data['load_page']] != 'undefined'){
			if(++runs == simultaneous){
				log('done');
				runs_done();
			}
			return;
		}
		get_img(get_data, get_data['load_page']);
		get_data['load_page']++;
	}

	function log(obj){
		if(debug == false){
			return;
		}
		if(console){
			console.log(obj);
			return;
		}
		if(unsafeWindow.console)
		{
			unsafeWindow.console.log(obj);
		}
		else
		{
			GM_log(obj);
		}
	}

	function image_resize() {
		$(img_selector).attr('width','100%');
		$(img_selector).attr('height','100%');
		$(img_selector).width('');
		$(img_selector).height('');
		var max_width = $(document).width();
		$(img_selector).css('width', '100%');
		$(img_selector).css('height', '100%');
		var w = $(img_selector).width();
		if($(img_selector).width() > max_width){
			$(img_selector).css('width',max_width);
		}
		else if($(img_selector).width() > 1200){
			$(img_selector).css('width', 1200);
		}
		if($(img_selector).width() < w){
			var p = w / $(img_selector).width();
			$(img_selector).css('height',$(img_selector).height() * p);
		}
		if($(img_selector).width() > 728){
			$(img_selector).css('position','relative');
			$(img_selector).css('left',-(($(img_selector).width() - 728) / 2));
		}
	}

	function next_img(){
		if(page_data['current_page']++ >= page_data['last_page']){
			if(chapters){
				next_chapter();
			}
			else
			{
				window.location = page_data['next_chapter'];
			}
		}
		else{
			goto_img();
		}
		return false;
	}

	function prev_img(){
		if(page_data['current_page']-- <= 0){
			if(chapters){
				prev_chapter();
			}
			else
			{
				window.location = page_data['prev_chapter'];
			}
		}
		else{
			goto_img();
		}
		return false;
	}
	
	function next_chapter(){
		log(this);
		if(typeof next_data == 'undefined' || 
			typeof page_data['next_chapter'] == 'undefined' ||
			typeof next_data['current_page'] == 'undefined')
		{
			page_data['current_page']--;
			window.location = page_data['next_chapter'];
			return false;
		}
		$(prev_data['put_selector']).html($(page_data['put_selector']).html());
		$(page_data['put_selector']).html($(next_data['put_selector']).html());
		$(next_data['put_selector']).html('');
		
		prev_data = page_data;
		page_data = next_data;
		next_data = [];
		
		prev_data['put_selector'] = '#' + prev_put_id;
		page_data['put_selector'] = '#' + put_id;
		next_data['put_selector'] = '#' + next_put_id;
		
		if(typeof current_chapter != 'undefined'){
			current_chapter++;
		}
		
		goto_img();
		get_chapter(next_data, page_data['next_chapter']);
	}
	function prev_chapter(){
		log(this);
		if(typeof prev_data == 'undefined' || 
			typeof page_data['prev_chapter'] == 'undefined' ||
			typeof prev_data['current_page'] == 'undefined')
		{
			page_data['current_page']++;
			return false;
		}
		$(next_data['put_selector']).html($(page_data['put_selector']).html());
		$(page_data['put_selector']).html($(prev_data['put_selector']).html());
		$(prev_data['put_selector']).html('');
		
		next_data = page_data;
		page_data = prev_data;
		prev_data = [];
		
		prev_data['put_selector'] = '#' + prev_put_id;
		page_data['put_selector'] = '#' + put_id;
		next_data['put_selector'] = '#' + next_put_id;
		
		if(typeof current_chapter != 'undefined'){
			current_chapter++;
		}
		
		goto_img();
		get_chapter(prev_data, page_data['prev_chapter']);
	}
	
	function goto_img(){
	
		//Stop if Loading
		if($('#pre_loading_gif').length > 0){
			return;
		}
		//If Undefined, attach loading gif and send request(get_img) for the image.
		if(typeof page_data['imgs'][page_data['current_page']] == 'undefined'){
			var h = $(img_selector).height();
			var w = $(img_selector).width();
			var left = $(img_selector).css('left');
			$(wrap_selector).append('<div id="pre_loading_gif" style="background-color: grey; height: '+h+
				'px; left: '+left+'; opacity: 0.7; position: absolute; top: 0; width: '+w+
				'px; z-index: 100;">'
				+'<img style="position:absolute; top: 45%; left: 45%; width:64px;" alt="...loading" src="data:image/gif;base64,'+loading+'" />'
				+'</div>'
			);
			get_img(page_data, page_data['current_page']);
		}
		else{
			//Change Src on image if it has been loaded.
			var img = document.createElement('img');
			img.src = page_data['imgs'][page_data['current_page']];
			img.alt = "Page " + (page_data['current_page'] + 1);
			img.id = $(img_selector).attr('id');
			$(img_selector).replaceWith(img);
			image_resize();
		}
		
		//Change Page Title to next chapter.
		document.title = $('#mangainfo').find('h1').html() + " - Page "+(page_data['current_page']+1);
		
		//Change Chapter # on page.
		$('#mangainfo span.c1').html("Page "+(page_data['current_page']+1)+"&nbsp;-&nbsp;");
		
		//Set Current page on select menu
		$(menu_selector + ' option').each(function(){
			if($(this).html() == page_data['current_page'] + 1){
				$(this).attr('selected','selected');
				$(menu_selector).val($(this).val());
			}
			else{
				$(this).removeAttr('selected');
			}
		});
		
		
		
		//Push page into browser bar and history
		window.history.pushState({mine:true}, document.title, page_data['urls'][page_data['current_page']]);	
	}
	
	function runs_done(){
		runs = 0;
		if(chapters){
			if(typeof next_data['put_selector'] == 'undefined'){
				log('get_next_chapter');
				next_data['put_selector'] = '#'+next_put_id;
				get_chapter(next_data, page_data['next_chapter']);
			}
			else if(typeof prev_data['put_selector'] == 'undefined'){
				log('get_prec_chapter');
				prev_data['put_selector'] = '#'+prev_put_id;
				get_chapter(prev_data, page_data['prev_chapter']);
			}
		}
		else{
			//setTimeout(runs_done, 200);
		}
	}
		
	function get_chapters(){
		if(got_chapters){
			return;
		}
		got_chapters = true;
		if($(chapter_selector+' option').length == 0){
			log('chapterMenu not here, chapters off till it is.');
			chapters = false;
			$(chapter_selector).bind('DOMNodeInserted', function(){
				$(chapter_selector).unbind();
				got_chapters = false;
				setTimeout(get_chapters, 200);
			});
			return;
		}
		
		log('getting chapters');
		chapters = true;
		var num = 1;
		$(chapter_selector + ' option').each(function(){
			
			if($(this).is(':selected')){
				current_chapter = num;
			}
			
			var reg = new RegExp('Chapter '+num+':', 'i');
			
			chapter_list[num] = [];
			chapter_list[num]['url'] = $(this).attr('value');
			chapter_list[num++]['title'] = $.trim(($(this).html() + '').replace(reg, ''));
		});
	}
	
	//Overwrite Mangastreams version of onkeydown shit
	function myKeyPressed(e) {
		var keyCode = 0;
		if (navigator.appName == "Microsoft Internet Explorer") {
			if (!e) {
				var e = window.event;
			}
			if (e.keyCode) {
				keyCode = e.keyCode;
				if ((keyCode == 37) || (keyCode == 39)) {
					window.event.keyCode = 0;
				}
			} 
			else {
				keyCode = e.which;
			}
		} 
		else {
			if (e.which) {
				keyCode = e.which;
			} 
			else {
				keyCode = e.keyCode;
			}
		}
		switch (keyCode) { 
			case 37:
				prev_img();
				return false;
			case 39:
				next_img();
				return false;
			default:
				return true;
		}
	}

	
	//Loading Gif Data in base64
	var loading = "R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAA\
	AAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJ\
	CgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6\
	k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1Z\
	BApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYty\
	WTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/\
	nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDU\
	olIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY\
	/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXil\
	oUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx6\
	1WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwA\
	AAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZ\
	KYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCE\
	WBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKU\
	MIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJ\
	pQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg\
	1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFh\
	lQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWM\
	PaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgo\
	jwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAA\
	ACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQk\
	WyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8c\
	cwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIG\
	wAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhk\
	PJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBSh\
	pkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuH\
	jYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOU\
	qjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQ\
	CdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5\
	BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA\
	7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyND\
	J0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQUL\
	XAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3x\
	EgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJK\
	hWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTE\
	SJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMD\
	OR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ\
	0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIA\
	ACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqU\
	ToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyA\
	SyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwID\
	aH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLr\
	ROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJ\
	aVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ\
	9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOU\
	jY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgG\
	BqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY\
	0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9Uk\
	UHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCX\
	aiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgev\
	r0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfL\
	zOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnq\
	zaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLK\
	F0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5\
	VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBu\
	zsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaL\
	Cwg1RAAAOwAAAAAAAAAAAA==";
}

// Create element to inject jQuery into page
var jQuery = document.createElement("script"),
    inject = document.createElement("script");

// Set script element to jQuery Google CDN
jQuery.setAttribute('type', 'text/javascript');
jQuery.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');

// Load script element with our userjs
inject.setAttribute('type', 'text/javascript');
inject.appendChild(document.createTextNode('(' + script + ')()'));

unsafeWindow.console.log('appending');
// Append script
document.body.appendChild(jQuery);
document.body.appendChild(inject);