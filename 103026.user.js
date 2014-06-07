// ==UserScript==
// @name           JIRA Quick Fixes - Total the boxes
// @namespace      moments.beforemadness.com
// @description    Totals the boxes in Jira Reports and adds the value

// @include			http://netapp.onjira.com/*/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js	
// ==/UserScript==


var elements = ["#customfield_10017","#customfield_10020","#customfield_10051","#customfield_10015","#customfield_10016","#customfield_10022","#customfield_10018","#customfield_10021","#customfield_10019"]


$.each(elements,function(i,v){
	$(v).change(function(){
		var total = 0;
		for (var i = elements.length - 1; i >= 0; i--){
			var k = parseInt($(elements[i]).val());
			if (k < 1 || isNaN(k))
				k = 0;
			total += k;
		};
		
		$("#customfield_10010").val(total);
	});
});