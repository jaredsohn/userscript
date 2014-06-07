// ==UserScript==
// @name           Tatoeba Page Navigator
// @copyright      Jakob V. <jakov@gmx.at>
// @description    Makes the current page number a number input field or navigate with the up or down keys (hit enter to submit)
// @include        http://tatoeba.org/*
// @require        http://code.jquery.com/jquery-1.5.js
// ==/UserScript==

$(document).ready(main);

function main(){
	location = $('.paging .current:first').text();
	console.log('location:'+location);
	$('.paging .current').removeClass('current').text('').append($('<input class="current" value="'+location+'">').css({'border':'0', 'width':location.length*8+'px'}).bind('keyup', function(e){
		num = $(this).val();
		total = 1*( $('.paging :contains(">>")').is('.disabled') ? $('.paging .numbers a:last').attr('href').split(':')[1] : $('.paging a:contains(">>")').attr('href').split(':')[1] );
		console.log('e.which:'+e.which);
		if(e.which == 13){
			if( num*1<=total && num*1>0 ){
			/*
				adress = document.location.href.split('/');
				fragment = adress.pop();
				if(fragment.split(':')[0]!="page"){
					adress.push(fragment);
				}
				adress.push('page:'+num);
				document.location.href = adress.join("/");
			*/
				document.location.href = document.location.href.replace(/\/?(?:page:(\d+))?$/, '/page:' + num );
			}
			else if( ((num*1+total*99999-1)%total+1)>0 ){
				num = (num*1+total*99999-1)%total+1;
				$(this).val( num );
				$(this).css({'outline':'2px solid #6CAA50'});
			}
			else if( (num+'').replace(/[^0-9]/g, '')!='' && (( ((num+'').replace(/[^-0-9]/g, '').substr(0,1)+(num+'').substr(1).replace(/[^0-9]/g, ''))*1 +total*99999-1)%total+1)>0 ){
				console.log('num before replace:'+num);
				num = ( ((num+'').replace(/[^-0-9]/g, '').substr(0,1)+(num+'').substr(1).replace(/[^0-9]/g, ''))*1 +total*99999-1)%total+1;
				console.log('num after replace:'+num);
				$(this).val( num );
				$(this).css({'outline':'2px solid #6CAA50'});
			}
		}
		else {
			if(e.which == 38){
				num = (num*1+total*99999+1-1)%total+1;
				$(this).val(num);
			}
			else if(e.which == 40){
				num = (num*1+total*99999-1-1)%total+1;
				$(this).val(num);
			}

			if( num*1<=total && num*1>0 ){
				$(this).css({'outline':'2px solid #6CAA50'});
			}
			else if( (num+'').replace(/[^0-9]/g, '')!='' && ((((num+'').replace(/[^-0-9]/g, '').substr(0,1)+(num+'').substr(1).replace(/[^0-9]/g, ''))*1+total*99999-1)%total+1)>0 ){
				$(this).css({'outline':'2px solid #F8B815'});
			}
			else{
				$(this).css({'outline':'2px solid #E44242'});
			}
		}
		$(this).css({'width':((num+'').length)*8+'px'});
		console.log('(num+"").length:'+(num+'').length);
	}));
	
	css = "\
	.infinitescroll { /*background-color: #D3F3B9;*/ border: 1px solid #257D0C; display: block; margin: 20px auto; padding: 5px 257px; } \
	";
	GM_addStyle(css);
		
	loading = [];
	throbber = $('<img src="http://flags.tatoeba.org/img/loading.gif" class="infinitescroll"/>');
	// http://www.jquery4u.com/tutorials/jquery-infinite-scrolling-demos/#.UBAMgESjyr8
	$(window).scroll(function () {

	    if ($(window).scrollTop() + 5 >= $(document).height() - $(window).height()) {
			console.log($(window).scrollTop(), $(document).height() - $(window).height());
	    	console.log(location);
	    	current = ( $('.paging .current:last').val()+$('.paging .current:last').text() )*1;
	    	console.log('current', current);
	    	page = current+1;
	    	if(typeof loading[page] == "undefined"){
				url = document.location.href.replace(/\/?(?:page:(\d+))?$/, '/page:' + page );
				console.log(url);
				$('#container .paging:last').after(throbber.show());
				loading[page] = $.get(
				url, 
				function (data) {
					html = $(data);
					//html = $(html).find('#main_content .module');
					$('#container').append(html);
					//$('[id=annexe_content]').not(':first').remove();
					$(throbber).hide();
				});
	    	}
	    	else{
	    		console.log('already loading page ', page);
	    	}
	    	
	    }
	});
	//*/
}