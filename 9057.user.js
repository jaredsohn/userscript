// ==UserScript==
// @name          WP threadwatch for IE
// @namespace     http://forums.whirlpool.net.au
// @description   Dynamically adds the threadwatch sidebar to pages in WP
// @version       0.3 - added scrollbar & shortened height of threadwatch div
// @include       http://whirlpool.net.au/*
// @include       http://*.whirlpool.net.au/*
// ==/UserScript==

function errorsuppressor(){
return true;
}

window.onerror=errorsuppressor; 

var tempHoldPage = $('body').html();

$('body').html('<div id="left" style="width:16%;float:left;height:1200px;overflow:scroll;"></div><div id="right" style="width:83%;float:right;"></div>');

$('#right').html(tempHoldPage);

$('#left').prepend('<img id="left-loader" style="position:absolute;z-index:10;left:7%;top:30%;" src="http://img241.imageshack.us/img241/526/41eq2.gif"/>');

$('#right').prepend('<a href="" id="navToggle" style="position:absolute;font-weight:bold;margin-top:4px;margin-left:14px;color:#D0D0D0;">Hide/Show Nav</a>');

function navTog(){
	$('#navToggle').click(function(){
		if($('.pagenav:first').css("display") === "none"){
			$('.pagenav:first').show();
			GM_setValue("navDisplay", 1);
			$("#right /table/tbody/tr:gt(0)").show();
		}
		else{
			$('.pagenav:first').hide();
			GM_setValue("navDisplay", 0);
			$("#right /table/tbody/tr:gt(0)").hide();
		}
		return false;
	});
}


if(GM_getValue("navDisplay") === 0){
	$('.pagenav:first').hide();
	$("#right /table/tbody/tr:gt(0)").hide();
}

function rightSide(){
	$("a").not("[@target='_blank']").not('#navToggle').not('.m1 /../../../../../td:last a').not('.star_rating a:odd').unbind( "click" );
	
	$("a").not("[@target='_blank']").not('#navToggle').not('.m1 /../../../../../td:last a').not('.star_rating a:odd').click(function(){

		var clickedLink = this.href;
		var checkPound = clickedLink.indexOf('#');

		$(this).after('<img id="loader" style="position:absolute;border:none" src="http://img89.imageshack.us/img89/5811/40uy0.gif"/>');

		GM_xmlhttpRequest({
			method: 'GET',
			url: clickedLink,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'If-Modified-Since': 'Sat, 1 Jan 2000 00:00:00 GMT'},
			onload: function(responseDetails){
						$('#right').html(responseDetails.responseText);
						$('#loader').remove();
						$('#right').prepend('<a href="" id="navToggle" style="position:absolute;font-weight:bold;margin-top:4px;margin-left:14px;color:#D0D0D0;">Hide/Show Nav</a>');
						navTog();
						if(GM_getValue("navDisplay") === 0){
							$('.pagenav:first').hide();
							$("#right /table/tbody/tr:gt(0)").hide();
						}
						if ($('#right .breadcrumb2')[0] !== undefined){
							var getPageTitle = $('#right .breadcrumb2').text().split(">");
							if (getPageTitle.length == 4){
								document.title = getPageTitle[3]+" - "+getPageTitle[2]+" - Whirlpool Broadband Forums";
							}
							else if (getPageTitle.length == 5){
								document.title = getPageTitle[4]+" - "+getPageTitle[3]+" - "+getPageTitle[2]+" - Whirlpool Broadband Forums";
							}
							else{
								document.title = getPageTitle[2]+" - Whirlpool Broadband Forums";
							}
						}
						else{
							document.title = "Whirlpool Broadband Forums";
						}
						if(checkPound == -1){
							window.scrollTo(0,0);
						}
						else if(checkPound > -1){
							window.scrollBy(0, $('#right').height());
						}
						script = document.createElement('script'); 
						script.type = 'text/javascript'; 
						script.src = "http://forboden.com/coding/re-apply-wp-inline-scripts.js"; 
						$("#right").prepend(script);
						if(responseDetails.responseText.indexOf("getobj") > -1 && responseDetails.responseText.indexOf("').className='voteactive") > -1){
							var findIt = responseDetails.responseText.split("getobj");
							var result = [];
							var finalId = [];		
							for(var i=0;i<findIt.length;i++){
								if(i%2!==0){  
									result.push($.trim('getobj'+findIt[i]));
								}

							}
							for(var j=0;j<result.length;j++){
							finalId.push(result[j].slice(result[j].indexOf("v"),result[j].indexOf("')")));
							}
							for(var k=0;k<finalId.length;k++){
								$('#'+finalId[k]+'').attr("class","voteactive");
							}
						
						}
						rightSide();
					}
		});
		return false;
	});
}

function threadWatch(){
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://forums.whirlpool.net.au/sidebar-threadwatch.cfm?side=yes.htm',
	headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'If-Modified-Since': 'Sat, 1 Jan 2000 00:00:00 GMT'},
	onload: function(responseDetails){
				$('#left').html(responseDetails.responseText);
				$('#left-loader').remove();
				var mysheet=document.styleSheets[1];
				mysheet.addRule("#left", "background-color: #2A3045;"); 
				mysheet.addRule("#left *", "font: 11px arial, sans-serif;");
				mysheet.addRule("#left td", "color: silver; padding:2px 5px 2px 5px;");
				mysheet.addRule("#left a:link", "color: #D1DAFF; text-decoration: none;");
				mysheet.addRule("#left a:visited", "color: #D1DAFF; text-decoration: none;");
				mysheet.addRule("#left a:active", "color: #D1DAFF; text-decoration: none;");
				mysheet.addRule("#left a:hover", "color: #FFFFFF; text-decoration: underline;");
				mysheet.addRule("#left a.whim:link", "color: #FFFFFF; text-decoration: none;");
				mysheet.addRule("#left a.whim:visited", "color: #FFFFFF; text-decoration: none;");
				mysheet.addRule("#left a.whim:active", "color: #FFFFFF; text-decoration: none;");
				mysheet.addRule("#left a.whim:hover", "color: #FFFFFF; text-decoration: underline;");
				$('#left a').attr("target","");
				rightSide();
			}
	});	
}

navTog();
rightSide();
threadWatch();
window.setInterval(threadWatch, 60000);