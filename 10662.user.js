// ==UserScript==
// @name          WP Ignore Users - Johnno version
// @version       0.4
// @namespace     wp
// @description   Hides posts of specified user and posts quoting that user
// @include       http://forums.whirlpool.net.au/forum-replies.cfm?*
// @include       http://whirlpool.net.au/forum-replies.cfm?*
// @include       http://forums.whirlpool.net.au/wiki/?tag=WLR
// @include       http://whirlpool.net.au/wiki/?tag=WLR
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var nortiUsers= {}, getUserName, currentList = GM_getValue('hiddenUsers');
if(currentList){
	nortiUsers = JSON.parse(currentList);
}

if(document.URL.toLowerCase().indexOf('wlr') > -1){

	$('#breadcrumb').after('<div id="nList" style="padding:10px;background-color:#EEEEEE;margin:20px 10px;border:3px solid orange;width:300px;">'+
		'<h4>Hidden Users:</h4><p /><ul></ul></div>');

	var getNlist = $('#nList ul');
	for(var i in nortiUsers){
		getNlist.append('<li><span>'+nortiUsers[i]+'</span><a href="#" class="remList" style="font-size:10px;margin: 0pt 0pt 0 10px;"> -- Remove From List</a></li>');
	}

	$('.remList').click(function(){
		getUserName = $(this).prev().text();
		delete nortiUsers[getUserName];
		GM_setValue('hiddenUsers', JSON.stringify(nortiUsers));
		$(this).parent().remove();
		return false;
	});

}
else{

	$('td[class^="bodyuser"]').append('<a style="margin-left:8px;color:#B45500;opacity:0.5;" class="hideClick" href="#">Hide</a>');
	
	$('.hideClick').each(function(){
		$(this).click(function(){
			getUserName = $(this).parent().find('span.bu_name:first').text();	
			nortiUsers[getUserName]=getUserName;
			GM_setValue('hiddenUsers', JSON.stringify(nortiUsers));
			replacePostText();
			return false;
		});	
	});
	
	function replacePostText(){
	
		for(var i in nortiUsers){
			var tempHoldOneC = $("td[class^='bodyuser']:contains('"+nortiUsers[i]+"')");
			tempHoldOneC.parent().hide();
			var tempHoldTwoD = $(".bodytext:contains('"+nortiUsers[i]+" writes...')");
			tempHoldTwoD.children('p.wcauth, p.reference').hide().end().find('span.wcrep1').hide();
			tempHoldTwoD.prepend('<a href="#" class="sHidQ" style="opacity:0.5;text-decoration:none;">Show Hidden Quote</a>');	
		}	
		
		$('a.sHidQ').click(function(){
			$(this).parent().children('p.wcauth, p.reference').show().end().find('span.wcrep1').show();
			$(this).hide();		
			return false;
		});
	}
	
	if(currentList){
		replacePostText();	
	}

}