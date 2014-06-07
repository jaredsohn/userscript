// ==UserScript==
// @id             SO-ses
// @name           Suggested Edit Status for StackOverflow
// @version        0.1.0 alpha 3-edit 1
// @namespace      camilstaps.nl
// @author         Camil Staps
// @description    Version 0.1.0 alpha 3, slightly modified so it includes the new suggested edits URL. It should work now.
// @include        /^http:\/\/(meta\.)?(([0-9a-z]+\.stackexchange|(s(tack(overflow|apps)|uperuser|erverfault)|askubuntu|answers\.onstartups))\.com|mathoverflow\.net)\/users\/[0-9]+\/[a-zA-Z0-9\-]+\?tab=activity&amp;sort=suggestions/
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
function findSuggestions(){
	var suggestions=$('table.history-table tr');
	var key = new String(unsafeWindow.StackExchange.options.user.fkey);//Sanitize using new String()
	var getSuggestionId=/^\/review\/suggested-edits\/(\d+)/;

	//Get review task JSON
	function getJSON(suggestionId){

		$.ajax({
			url:'/review/next-task',
			data: { taskTypeId: 1,
				reviewTaskId: suggestionId,
				fkey: key },
			dataType: 'json',
			type: 'POST',
			context:this,
			success: function(data,statusText,jqXHR){
				//GM_log($(this).html()+'\n\n\n\n\n\n\n\n'+/&lt;div class=\"review-status\"&gt;&lt;strong&gt;&lt;span style=\"color: #0A0;\"&gt;Approved&lt;\/span&gt;/.test(data.instructions)+'\n\n\n'+JSON.stringify(data))
				if(/&lt;div class=\"review-status\"&gt;&lt;strong&gt;&lt;span style=\"color: #0A0;\"&gt;Approved&lt;\/span&gt;/.test(data.instructions)){
					$(this).find('span[title="suggested an edit to this post"]').css('color','#0A0');
				}else if(/&lt;div class=\"review-status\"&gt;&lt;strong&gt;&lt;span style=\"color: #A00;\"&gt;Rejected&lt;\/span&gt;/.test(data.instructions)){
					$(this).find('span[title="suggested an edit to this post"]').css('color','#A00');
				}
			}
		});
	}

	$(suggestions).each(function(){
		var link=$(this).find('a');
		
		//GM_log($(link).attr('href'));
		var suggestion_match = ($(link).attr('href')).match(getSuggestionId);
		var suggestionId=suggestion_match[1];

		getJSON.call(this,suggestionId);

	});

};

//Initialize function
findSuggestions();

//Catch HTML5 URL manipulation
window.onpopstate=function(evt){
	$(window).scroll(function(evt){
		findSuggestions();
		$(window).unbind(evt);
	});
};