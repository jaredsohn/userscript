// ==UserScript==
// @name           Basecamp Visible Projects
// @author		   @pyropanda
// @namespace      VL_LZ
// @description    So many projects listed in Basecamp that it's hard to find the one you need? Hide your old or infrequently used projects from the sidebar. 
// @include        https://*.basecamphq.com/
// @include        https://*.basecamphq.com/clients
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


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

// the guts of this userscript
function main() {

	if(!localStorage['visible_basecamp_projects']) localStorage['visible_basecamp_projects'] = "";
 	var visible_projects = localStorage['visible_basecamp_projects'].split(",");
 	
	$('div.Project a').each( function(){
		var project_id = $(this).attr("href");
		project_id = project_id.substring(10, project_id.indexOf('-'));
		$(this).wrap('<div class="single-project" />');
		$(this).before('<input name="visible_projects" type="checkbox" value="'+project_id+'" style="display:inline;display:none;">');
		if($.inArray(project_id,visible_projects) < 0){
  			$(this).parent().hide();
		}
		else{
			$(this).parent().find('input[type=checkbox]').attr('checked', 'checked');
		}

	});
  		
	$('div.Client').each(function(){
		if($(this).find('div.single-project:visible').length == 0){
			$(this).hide();
		}
	});
  
	var projects_header = $('.right .col h1').first();
	
	$(projects_header).append('<button id="edit_visible" style="float:right;">Edit Visible</button><button id="save_visible" style="float:right; display:none;">Save Visible</button>');
	
	$(projects_header).find('button#edit_visible').click(function(){
		$(this).hide();
		$(projects_header).find('button#save_visible').show();
		$('div.Client, div.single-project').show().children().css({'display':'inline'});
	});
	
	$(projects_header).find('button#save_visible').click(function(){
		$(this).hide();
		$(projects_header).find('button#edit_visible').show();
			
		$('div.Project input[type=checkbox]').hide().not(':checked').hide().parent().hide();
		$('div.Client').each(function(){
			if($(this).find('div.single-project:visible').length == 0){
				$(this).hide();
			}
		});
		
		localStorage["visible_basecamp_projects"] = $('input[name=visible_projects]:checked').map(function() {return $(this).val();}).get().join(",");

	});
}



// load jQuery and execute the main function
addJQuery(main);

