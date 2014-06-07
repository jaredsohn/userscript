// ==UserScript==
// @name           ir_user_filter
// @namespace      ir_user_filter
// @include        *ir.lv/*
// @require        http://code.jquery.com/jquery-1.8.1.min.js
// ==/UserScript==

var ids_to_remove=["edge_indran","colovrat_evp","super_e-y-e","destra","articulus100","Nodok"];
var spamlinks_to_remove=["atrais.lv","A T R A I S . L V"];

function filter()
{
	for(var j=0;j<ids_to_remove.length;j++)
	{
	   ($('span:contains('+ids_to_remove[j]+')').parent().parent().parent().parent()).remove();
	}

	for(var i=0;i<spamlinks_to_remove.length;i++)
	{
	   ($('div.text:contains('+spamlinks_to_remove[i]+')').parent().parent()).remove();
	}
}

filter();
$(function()
{if(Opinion!=undefined)
{
Opinion.create=function(){
	Opinion.toggle_submit()
	$.ajax({
		type: 'POST',
		url: $('#opinion-form').attr("action"),
            //    xhr: function(){return new GM_XHR;},
		data: $('#opinion-form').serialize().replace(/%0A/g,"%0D%0A") + '&page=' + ($('.pagination span.current').html() ? $('.pagination span.current').html() : 1),
		success: function(data){
			$('#opinions_list').html(data)
			$('#opinion_body').val("")
			$('#opinion-form ul.errors').html("")
			if($('#opinion_parent_id').val() != ""){
				$('#commit_button span').html(Opinion.i18n.submit)
				slide_to("#viedoklis_"+$('#opinion_parent_id').val())
				$('#opinion_parent_id').val("")
			}else{
				slide_to('#' + $('#opinions_list div.opinion:last').attr("id"))
			}
			filter();
		},
		error: function(xhr){
			$('#opinion-form ul.errors').html(xhr.responseText);
			filter();
		},
		complete: function(){
			Opinion.toggle_submit();
			filter();
		}
	})

}; 
};
});