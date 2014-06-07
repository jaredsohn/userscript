// ==UserScript==
// @name           steamgifts.com tweaks
// @include        http://www.steamgifts.com/
// @include        http://www.steamgifts.com/open*
// @include        http://www.steamgifts.com/new*
// ==/UserScript==

(function() {
	
function main () {

if($('img.login').length == 0){

//Featured
$('.featured').css('display','none');

//Filter Giveaways
function filterGiveaways(){
		$.myPoints = parseInt(($('div#navigation div.left ol li:last a').html()).substr(0,($('div#navigation div.left ol li:last a').html()).length - 1));

		$('.post').each(function(){
		
		if($(this).attr('class') != 'post fade'){

				if(parseInt(($(this).find('.title span[class!="new"]').html()).substr(1, ($(this).find('.title span[class!="new"]').html()).length - 2)) > $.myPoints ){
					$(this).css('display','none');
				} else if($.myTitles.search('#' + $(this).find('.title a').html() + '#') != -1){
					$(this).remove();
				} else {
					$(this).css('display','block');
				}

			}
		
		});
		
$('.post').sort(function(a,b){return $(a).find('.title a ').text() > $(b).find('.title a ').text() ? 1 : -1;}).appendTo('.ajax_gifts');

}

var mytime = 86400000;
var nowDate = new Date();

if(localStorage.getItem('a7k_lastupdate') != null && (nowDate.getTime() - mytime) < localStorage.getItem('a7k_lastupdate')){

		console.log('Cache');
		$.myTitles = localStorage.getItem('a7k_titles');
		filterGiveaways();

} else {

		console.log('Update');
$.ajax({
                type: "get",
                url: "http://www.steamgifts.com/sync",
                dataType: "html",
                success: function(data){
				
				$.myArr = new Array();
				$(data).find('.code').each(function(){
				
					$.myArr[$.myArr.length] = $(this).html();
				
				});
					
				localStorage.setItem('a7k_titles', '#' + $.myArr.join('#') + '#');
				var myDate = new Date();
				localStorage.setItem('a7k_lastupdate',myDate.getTime());
				$.myTitles = localStorage.getItem('a7k_titles');
				filterGiveaways();
                
				}
       });
	   
}

//Trusted Giveaways
function highlightTrusted(){
$('.post .left .description .created_by a').each(function(index){
	var mytime = 172800000;
	var mynow = new Date();

	if(localStorage.getItem($(this).attr('href')) != null && parseInt(((localStorage.getItem($(this).attr('href'))).split(';'))[1]) > mynow.getTime() - mytime){
		console.log('trusted users - cache');
		if(((localStorage.getItem($(this).attr('href'))).split(';'))[0] == 'true'){
			
			$(this).css('color','Green').css('font-weight','bold');

		}
	} else {
		console.log('trusted users - loading');
		$.ajax({
                type: "get",
                url: "http://www.steamgifts.com" + $(this).attr('href'),
                dataType: "html",
                success: function(data){
				
				var myArr = new Array();
				var myDate = new Date();

				if($(data).find('.green .row_right strong').html() == "100%"){
					myArr[0] = 'true';
					$('a[href="/user/' + $(data).find('.heading strong').html() + '"]').css('color','Green').css('font-weight','bold');
				} else {
					myArr[0] = 'false';
				}
				myArr[1] = myDate.getTime();
					
				localStorage.setItem('/user/' + $(data).find('.heading strong').html(), myArr.join(';'));

				}
       });
	}

});
}

highlightTrusted();

if(window.location.pathname == "/"){

var pages = Math.ceil(parseInt($('.results strong:last').html())/15);

for(i = 2; i < pages+1; i++){
	
	$.ajax({
            type: "get",
            url: "http://www.steamgifts.com/" + $('.pagination:first .numbers a[class!="selected"]:first').attr('href').split('/')[1] + "/page/" + i
,
            dataType: "html",
            success: function(data){
			
				$(data).find('.post').appendTo('.ajax_gifts');
				filterGiveaways();
				highlightTrusted();
				$(".post.fade").hover(
				function () {
					$(this).addClass("over");},
				function () {
					$(this).removeClass("over");
				});
			}
	});

}

$('.pagination').remove();

}

//Update points & refiltering
$.tmptitle = document.title;
document.title = "(" + $('div#navigation div.left ol li:last a').html() + ") " + document.title;

function checkPoints(){
	$.ajax({
                type: "get",
                url: "http://www.steamgifts.com/account",
                dataType: "html",
                success: function(data){
				
				$(data).find('div#navigation div.left ol li:last a').each(function(){
				
					document.title = "(" + $(this).html() + ") " + $.tmptitle;
					$('div#navigation div.left ol li:last a').html($(this).html());
					filterGiveaways();
				
				});
				
				setTimeout(checkPoints, 100000);
                
				}
      });
}

setTimeout(checkPoints, 100000);

}

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();