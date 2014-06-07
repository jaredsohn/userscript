// ==UserScript==
// @name          WP Ignore Users
// @version       0.4
// @namespace     wp
// @description   Hides posts of specified user and posts quoting that user (same as the WP Spoiler script, except this works in every section)
// @include       http://whirlpool.net.au/*
// @include       http://*.whirlpool.net.au/*
// ==/UserScript==
//
//0.4 Changes
//Fixed a bug where some html characters weren't saved properly
//
//0.3 Changes
//Added ability to hide multiple users
//
//0.2 Changes
//Fixed an incompatability with Meat Sacks WLR

if((navigator.userAgent.toLowerCase().indexOf('msie') < 0) && (navigator.userAgent.toLowerCase().indexOf('opera') < 0)){
    $ = unsafeWindow.jQuery;
}

	var nortiUsers, getUserName;

	if(GM_getValue("hiddenUsers") == undefined){
		GM_setValue("hiddenUsers", encodeURI("none"));
	}
	if(decodeURI(GM_getValue("hiddenUsers")) != "none"){
		nortiUsers = decodeURI(GM_getValue("hiddenUsers")).split("&");
		nortiUsers.pop();
	}
	$('.bodyuser div').not('.name_cont').contains('User #').append('<a style="margin-left:8px;color:#B45500;" class="hideClick" href="">Hide</a>');
	
	var hideclick = $('.hideClick');
	
	hideclick.each(function(){
		$(this).click(function(){
			getUserName = $(this).parent().next().children().children().text();	
			if($(this).text() == "Hide"){
				var currentList = decodeURI(GM_getValue("hiddenUsers"));
				
				if(GM_getValue("hiddenUsers") == "none"){
					GM_setValue("hiddenUsers", encodeURI(getUserName+"&"));
					replacePostText();
				}
				else{
					GM_setValue("hiddenUsers", encodeURI(currentList+getUserName+"&"));
					nortiUsers = decodeURI(GM_getValue("hiddenUsers")).split("&");
					nortiUsers.pop();
					replacePostText();	
				}			
			}
			else if($(this).text() == "Show"){	

					if((nortiUsers == undefined) || (nortiUsers.length == 1)){
						GM_setValue("hiddenUsers", "none");						
					}

					else{
						var removeUserFromList = decodeURI(GM_getValue("hiddenUsers")).replace(""+getUserName+"&", "");
						GM_setValue("hiddenUsers", encodeURI(removeUserFromList));
						nortiUsers = decodeURI(GM_getValue("hiddenUsers")).split("&");
						nortiUsers.pop();	
					}
					$('.bodytext').contains(getUserName+' writes...').children().toggle();
					var tempHoldShow = $('.bodyuser').contains(getUserName);
				    tempHoldShow.next().children().toggle();
				    tempHoldShow.find('a.hideClick').text('Hide');
				    
			}
					
			return false;
		});	
	});


	function replacePostText(){
		if(nortiUsers == undefined){
				var tempHoldOneA = $('.bodyuser').contains(getUserName);
				tempHoldOneA.next().children().hide();
				tempHoldOneA.next().prepend('<span style="opacity:0.5;">Post Hidden</span>');
				tempHoldOneA.find('a.hideClick').text('Show');
				
				var tempHoldTwoB = $('.bodytext').contains(getUserName+' writes...');
				tempHoldTwoB.children().hide();
				tempHoldTwoB.prepend('<span style="opacity:0.5">Post Hidden</span>');						
		}	
		else{
			for(var i=0;i<nortiUsers.length;i++){
				var tempHoldOneC = $('.bodyuser').contains(nortiUsers[i]);
				tempHoldOneC.next().children().hide();
				tempHoldOneC.next().prepend('<span style="opacity:0.5;">Post Hidden</span>');
				tempHoldOneC.find('a.hideClick').text('Show');
				
				var tempHoldTwoD = $('.bodytext').contains(nortiUsers[i]+' writes...');
				tempHoldTwoD.children().hide();
				tempHoldTwoD.prepend('<span style="opacity:0.5">Post Hidden</span>');	
									
			}	
		}
	}

replacePostText();		
