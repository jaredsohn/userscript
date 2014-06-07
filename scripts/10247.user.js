// ==UserScript==
// @name          WP Filter Groups
// @namespace     http://forums.whirlpool.net.au
// @version	  0.4
// @description   Allows you to select which group(s) you do not wish to see in a forum section.
// @include	  http://forums.whirlpool.net.au/forum-threads.cfm*
// ==/UserScript==


if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	$ = unsafeWindow.jQuery;
}

var getEmOnce = $('.threadN1 a.small,.threadO1 a.small');

function filterHide(){
	
	if(GM_getValue("filter") == undefined){
	
		return;
	
	}
	
	
	var splitGM = GM_getValue("filter").split(',');

	for(var n = 0; n<splitGM.length; n++){

		getEmOnce.each(function(){
		
			if($(this).text() == splitGM[n]){
			
				$(this).parent().parent().toggle();
		
			}
			
		});
		
	}
	
}

var whatUpG = document.getElementsByName('g')[0];

var opArr = whatUpG.getElementsByTagName('option');

$(whatUpG).next().after('<button id="filterSections" style="margin-left:5px;" class="small" type="button">Filter</button>').before('<div '+
	'id="filterSelect" style="position:absolute;display:none;background-color:#F5AA53;padding:3px 10px 10px 0;width:120px;'+
	'text-align:left;color:#4D4D4D;"><a id="cS" href="#" style="float:right;">Close</a><p style="margin:10px 0 10px '+
	'0;font-size:x-small;margin-left:5px;">Select which group(s) you do not wish to see</p></div>');

var getFilterSelect = $('#filterSelect');

for(var i = 0; i<opArr.length; i++){

	if(opArr[i].value > 0){

    var t = $.trim(opArr[i].textContent).replace(' ','&nbsp;');
		
		getFilterSelect.append('<p style="float:left;margin:0;"><input type="checkbox" class="tF" name="Quicknav" value="'+t+'" />&nbsp;'+t+'</p>');
	
	}
	
}

$('#filterSections').mouseup(function(evt){

	var ey = evt.pageY;
	var eX = evt.pageX;
	
	$('#filterSelect').css({top: ey,left: eX, display:'block'});	
	

});

$('#cS').click(function(){

	$(this).parent().css("display","none");

});

$('.tF').each(function(){

	var tex = $(this).attr('value');

	if((GM_getValue("filter") != undefined) && (GM_getValue("filter").indexOf(tex) > -1)){
	
		$(this).attr('checked', 'checked');
	
	}

	$(this).mouseup(function(){	
	
	
		if(GM_getValue("filter") == undefined){
		
			GM_setValue("filter", ","+tex);	
		
		}
		else{

			if(GM_getValue("filter").indexOf(tex) > -1){
			
				if(GM_getValue("filter").indexOf(',') < 0){
				
					GM_setValue("filter", GM_getValue("filter").replace(tex,""));
				
				}
				else{
				
					GM_setValue("filter", GM_getValue("filter").replace(","+tex,""));
				
				}
			
			}
			else{
			
				var joinEm = GM_getValue("filter")+','+tex;
			
				GM_setValue("filter", joinEm);	
			
			}		
		
		}
				
		getEmOnce.each(function(){
		
			if($(this).text() == tex){
			
				$(this).parent().parent().toggle();
		
			}
			
		});
	
	});
	
});

filterHide();