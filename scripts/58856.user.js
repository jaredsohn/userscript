// ==UserScript==
// @name           filter
// @namespace      filter
// @include        http://www.torrentbytes.net/browse.php*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';

    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
    	
    	var filterForm = $('<div class=hidden id=spa_form><h2>Filter</h2><a href="#" id=spa_hideShow>show</a><form> snatched min:</br><input id=spa_snatched value=0 type=text/></br>seeders min:</br><input id=spa_seeders type=text value=0 /></br></br><input id=spa_submit type=submit value="Go!"/></form></br><span id=spa_message>Done!</span></div>');
    	$('body').append(filterForm);

/* CSS DEFINITIONS */

	$('#spa_form').css("background", "url('http://www.torrentbytes.net/pic/bottom_right.gif') no-repeat bottom right #004E98")
		      .css("color","#c7c7c7")
		      .css("position","fixed")
		      .css("width","170px")
		      .css("height","170px")
		      .css("z-index","30")
		      .css("top","300px")
		      .css("left","-130px")
		      .css("text-align","left")
		      .css("padding","2px 0 0px 5px")
		      .css("border","5px #FFFFFF");
		      
	$('#spa_message').css("float","left")
			 .css("font-size","1.4em")
			 .css("color","#33FF99")
			 .css("display","none")
			 .css("font-weight","600");
			 
        $('#spa_hideShow').css("float","right")
                          .css("font-size","1.2em")
                          .css("margin-right","2px")
                          .css("margin-top","-37px")
                          .css("text-align","right")
                          .css("color","#EEEEEE");
			 
		      
/* END CSS DEFINITIONS */ 
	
	function hideForm(){    	
		 if(!$("#spa_form").hasClass("hidden")){
			$("#spa_form").animate({left:-130}, 500).addClass("hidden");
			$("#spa_hideShow").text('show');
		 }
	}
	function showForm(){
		if($("#spa_form").hasClass("hidden")){
			$("#spa_form").animate({left:0}, 500).removeClass("hidden");
			$("#spa_hideShow").text('hide');
		}
	}
	
	 function showHideForm(){
		 if($("#spa_form").hasClass("hidden")){
		 	showForm();

		 }
		 else{
		 	hideForm();
		 }
	 }
    	
    	$('#spa_hideShow').click(function(e){
    		e.preventDefault();
    		showHideForm();
    	});
    	
    	$('#spa_submit').click(function(e){
    		e.preventDefault();
    		filterData(parseInt($('#spa_snatched').val(), 10), parseInt($('#spa_seeders').val(), 10));
    		$('#spa_message').show();
    		$('#spa_message').fadeOut(500);
    		setTimeout(function(){
    			hideForm();
    		}, 1000);
    	});
    	
    	function log(string){
		unsafeWindow.console.log(string);
    	}
    	
    	function filterData(timesSnached, seeders){
    	
    		if(isNaN(timesSnached)){
    			timesSnached = -1;
    		}
    		if(isNaN(seeders)){
    			seeders = -1;
    		}
    		
		var length = $('.outer').find('table').length;
		var tr = $('.outer').find('table').filter(function(index){
			return index == length-1;
		}).find('tr');
		
		
		
		$.each(tr, function(value){

			var isTableRow = $(this).find('td:first').text().indexOf('Type') != -1;
			
			var showSeeders = parseInt($(this).find('td:last').prev('td').find('span').text().replace(",", ""), 10) > seeders;
			var showSnached = parseInt($(this).find('td:last').prev('td').prev('td').text().split('</br>')[0].replace(",", ""), 10) > timesSnached;
			
			if(showSeeders && showSnached){
				$(this).show();
			}
			else if(!isTableRow){
				$(this).hide();
			}

		});
        }
    }