// ==UserScript==
// @name		Fer2.net Clean Theme
// @version 	0.02
// @namespace 	http://www.massacre.net/
// @include 	http://www.fer2.net/*
// @author		Ivan
// ==/UserScript==


// A function that loads jQuery and calls a callback function when jQuery has finished loading
// Credits: Erik Vold; http://erikvold.com/
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
		function removeElements() {
			// Remove header with logo banner
			$('#hdr').remove();
			$('#nav_btm').remove();
			
			post_table = $('div[id*="edit"] > table.tcat');
			post_table.each(function() {
				$(this).find('td').eq(0).empty();
				$(this).find('td').eq(2).empty();
			});
		}
		
		vbmenu_control = $('.vbmenu_control');
		vbmenu_control.css('background', '#2C5687 url(http://www.deviantpics.com/images/z1cdA.png) repeat-x left top');
		vbmenu_control.css('color', 'white');
		vbmenu_control.css('border', '0');
		vbmenu_control.find('a').css('color','white');
		vbmenu_control.find('a').css('text-shadow','black 0.1em 0.1em 0.2em');
		
		$('.tcat strong').css('color', 'white');
		
		function moveNavbar() {
			navbar = $('#list_navbar');
			$('#list_navbar').remove();
						
			wrapper = $(document.createElement('div'));
			wrapper.css('margin','0');
			wrapper.css('background', '#3B6795');//'#204066');
			wrapper.css('margin', '0 auto');
			wrapper.css('display','block');
			wrapper.css('height', '40px');
		
			navbar.css('float','none');
			navbar.css('padding','0');
			navbar.css('margin','0 45px');
			
			ul = navbar.find('ul');
			ul.css('margin','0px');
			ul.css('padding','5px');
			ul.css('list-style-type','none');
			ul.css('text-align','center');
			ul.css('background-color','#000');
			ul.css('bottom', '0');
			
			li = navbar.find('li');
			li.css('display','inline');
			li.css('margin','0 3px 0 0');
			
			a = navbar.find('a');
			a.css('text-decoration','none');
			a.css('color','#C5D5E2');
			a.css('border','0');
			a.css('background-color', '#23456B');//'#1C3B5F');
			a.css('margin','13px 0 0 0');
			a.css('padding','6px 15px 8px');
			a.css('text-shadow','0px 1px 1px rgba(0, 0, 0, 0.5);');
			
			a = navbar.find('.link_n_a a');
			a.css('top','0px');
			a.css('background','white');
			a.css('color','#0B5794');
						
			wrapper.append(navbar);
			$('body').prepend(wrapper);
		}
		
		function addLogo() {
			logo_wrapper = $(document.createElement('div'));
			
			logo_wrapper.css('background','#0F3854 url(http://deviantpics.com/images/ErZVe.png) repeat-x');
			logo_wrapper.css('border-bottom', '1px solid #1B3759');
			logo_wrapper.css('min-height', '64px');
			
			logo = $(document.createElement('div'));
			logo.css('display','inline');
			
			a = $(document.createElement('a'));
			a.attr('href', 'index.php');
			a.attr('title', 'Pocetna stranica foruma');
			
			img = $(document.createElement('img'));
			img.attr('src','http://deviantpics.com/images/sroak.png');
			img.attr('alt','logo');
			
			a.append(img);
			logo.append(a);
			logo_wrapper.append(logo);
			
			$('body').prepend(logo_wrapper);
		}
		
		function changeTitleBar() {
			title_bar = $('.tcat');
			title_bar.css('background', '#2C5687 url(http://www.deviantpics.com/images/z1cdA.png) repeat-x left top');
			title_bar.css('color', 'white');
			title_bar.css('border', '1px solid #114857');
			//title_bar.css('moz-border-radius', '4px');
			//title_bar.css('-webkit-border-radius', '4px');
			//title_bar.css('border-radius', '4px');
			title_bar.css('-webkit-box-shadow', 'inset 0px 1px 0 #528CBC');
			title_bar.css('-moz-box-shadow', 'inset 0px 1px 0 #528CBC');
			title_bar.css('box-shadow', 'inset 0px 1px 0 #528CBC');
			title_bar.css('border-width', '1px 1px 0 1px');
			title_bar.css('border-color', '#316897');
			title_bar.css('border-style', 'solid');
			
			title_bar_right = $('.tcat .smallfont');
			title_bar_right.css('color','white');
			title_bar_right.css('margin','-6px 6px -2px 0px');
			
			title_bar_select = $('.tcat .smallfont select');
			title_bar_select.css('font','normal 11px Tahoma, Calibri, Verdana, Geneva, sans-serif;');
			title_bar_select.css('border','');
			title_bar_select.css('border','1px solid #CCCCCC');
			title_bar_select.css('color','black');
			title_bar_select.css('background','white none');
			title_bar_select.css('padding','1px');
			title_bar_select.css('outline','0');
			title_bar_select.css('-moz-border-radius','3px');
			title_bar_select.css('-webkit-border-radius','3px');
			title_bar_select.css('border-radius','3px');
			
			$('.tcat > a > img').attr('src','http://deviantpics.com/images/EGx6P.gif').css('margin-top','-4px');
			btn_ok = $('.tcat .smallfont input.button');
			btn_ok.css('padding','2px 6px');
			btn_ok.css('margin-top','-1px');
		
		}
		
		function changeTableRow() {
			$('.tborder').css('border','0');
			$('.tborder').css('background','none');
		
			$('.middlecontainer div.tborder').css('border','0');
			$('.middlecontainer div.tborder').css('background','none');
					
			$('.middlecontainer table.tborder').css('background','none');
			$('.middlecontainer table.tborder').css('border','0');
						
			$('.middlecontainer .outer_padding').css('padding','0');
			$('.middlecontainer .tborder').attr('cellspacing','0');
			
			
			$('.middlecontainer .tborder tbody > .alt1 td:first-child').remove();
			$('.middlecontainer .tborder tbody .thead').remove();
			$('.middlecontainer .tborder tbody tr:last-child').remove();

			style_row = $('.middlecontainer .tborder tbody td');
			style_row.css('background','none');
			style_row.css('border-top','1px solid white');			
			style_row.css('border-bottom','1px solid #E3E3E3');		
			
			style_alt1 = $('.middlecontainer .tborder tbody > .alt1 > .alt1');
			style_alt1.css('background', '#F8F8F8');
			
			$('.middlecontainer .tborder tbody td:first-child').css('border-left', '1px solid #EFEFEF');
			$('.middlecontainer .tborder tbody td:last-child').css('border-right', '1px solid #EFEFEF');
			$('.middlecontainer .tborder tbody td:last-child').css('border-left', '0px');
						
			style_alt2 = $('.middlecontainer .tborder tbody > .alt1 > .alt2');
			style_alt2.css('background', 'none');
			style_alt2.css('border-left', 'none');
			
			style_thead = $('.middlecontainer .tborder tbody > .thead > .thead');
			style_thead.css('background', 'none');
			style_thead.css('border', 'none');
			
			table_row = $('.middlecontainer .tborder tr');
			table_row.css('background','#F8F8F8');

			tbody = $('.middlecontainer .tborder tbody');
			tbody.css('border-left','1px solid red');
			tbody.css('border-right','1px solid #EFEFEF');
			tbody.css('border-bottom','1px solid #E3E3E3');
			tbody.css('border-top','1px solid #FFFFFF');
			
		}	

		function changeQuickMenuBar() {
			bar = $('.page > div > div.tborder').eq(0).find('table');
			bar.css('background', '#2C5687 url(http://www.deviantpics.com/images/z1cdA.png) repeat-x left top');
			bar.css('color', 'white');
			bar.css('border', '1px solid #114857');
			bar.css('-webkit-box-shadow', 'inset 0px 1px 0 #528CBC');
			bar.css('-moz-box-shadow', 'inset 0px 1px 0 #528CBC');
			bar.css('box-shadow', 'inset 0px 1px 0 #528CBC');
			bar.css('border-width', '1px 1px 0 1px');
			bar.css('border-color', '#316897');
			bar.css('border-style', 'solid');
			
			td = bar.find('td.vbmenu_control');
			td.css('background', 'none');
			td.css('color', 'white');
			td.css('padding', '1px 6px 3px 6px');
			td.find('a').css('color', 'white');
			td.find('a').css('text-shadow','black 0.1em 0.1em 0.2em');
		}
		
		$('body').css('background', '#F4F4F4 url(http://deviantpics.com/images/9szGV.png) repeat');
		
		$('body').css('margin', '0px');
		$('body').css('padding', '0px');
		$('body').css('width', '100%');
		$('body > table').eq(0).css('padding', '0 20px 40px 20px');
		
		$('.page').css('background', '#FFFFFF');
		$('.page > div').eq(0).css('padding', '25px 25px 0px 25px');
		
		$('#brd_outer').css('border-left', '1px solid #BBB');
		$('#brd_outer').css('border-right', '1px solid #BBB');
		$('#brd_outer').css('border-bottom', '1px solid #BBB');
		$('#brd_outer > table').eq(0).find('tbody > tr > td > form[action$="index.php"]').remove();
		$('#brd_outer > table').eq(1).remove();
		
		$('a[href$="#"]').css('color','white');
		$('a[href^="/calendar"]').css('color','white');
		
		
		$('#spacerline').remove();
		
		function addNotification() {
			message = $(document.createElement('div'));
			message.css('position','absolute');
			message.css('top','3px');
			message.css('right','3px');
			message.css('padding','5px');
			message.css('background','#F6CBCA');
			message.css('border','1px solid #CB2026');
			message.css('color','#CB2026');
			
			message.append('v0.001');
			$('body').append(message);
		}

		removeElements();
		changeTitleBar();
		changeTableRow();
		changeQuickMenuBar();
		moveNavbar();
		addNotification();
		addLogo();				
}

// Load jQuery and execute the main function
addJQuery(main);