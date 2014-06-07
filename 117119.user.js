// ==UserScript==
// @name           hwm_help_voter
// @namespace      hwm_help_voter
// @include        http://narod.premiaruneta.ru/*
// ==/UserScript==


var GM_JQ = document.createElement('script'); GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js'; GM_JQ.type = 'text/javascript'; document.getElementsByTagName('head')[0].appendChild(GM_JQ); function waitForJquery(){ if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitForJquery, 100); } else { $ = unsafeWindow.jQuery;

//проверим если голос зачтен, то установим время голосования в текущее
if ($('*:contains("Ваш голос учтен")').length >0)
{
	GM_setValue("date_of_vote", (new Date()).toString());
	return;
}

	 $('tr').filter(function(index) {
		 if($(this).attr("id") == "tr_44"){return false; }
   		 if($(this).attr("id") == "tr_86"){return false; }
 		 if($(this).attr("id") == ""){return false; }
	  return true;
	}).hide();

 $('div').filter(function(index) {
		 if($(this).attr("id") == "rcolumn"){return true; }
		 return false;
	}).hide();



//добавим кнопку для показа остальных
$("#content").prepend('<input id="showAll" type="button" value="Показать остальных" />');
$("#showAll").click(function (){
		 $('tr').show(); 
		 $('div').filter(function(index) {
			 if($(this).attr("id") == "rcolumn"){return true; }
			 return false;
		}).show();
});

var date_of_vote = GM_getValue("date_of_vote", (new Date(2011, 1, 1)).toString());
date_of_vote = new Date(date_of_vote);

var now = new Date();
var can_vote_text = "НУЖНО ГОЛОСОВАТЬ!!!!";
//alert((now.getTime() - date_of_vote.getTime())/ (1000 * 60 * 60)).toPrecision(0));
if( (now.getTime() - date_of_vote.getTime())/ (1000 * 60 * 60) < 24 ){
	can_vote_text = "Голосовать через: "+ (( date_of_vote.getTime() + 1000*60*60*24- now.getTime() )/ (1000 * 60)) + " минут";
}


$("#content").prepend('<h2>'+can_vote_text+'</h2>');


$("#answer").parent().prepend('<input id="first" style="width:30px;" type="text" value="" /><input maxlength="1" id="operation" style="width:10px;" type="text" value="+"/><input id="second" style="width:30px;" type="text" value="" />');


$("#first").change(function(){ $('#answer').val( parseInt($('#first').val()) + parseInt($('#second').val())); })
$("#second").change(function(){ 
						var a = parseInt($('#first').val());
						var b = parseInt($('#second').val());
						var oper = $('#operation').val();
						if(oper=="+") {
							$('#answer').val( a + b); 
						}else if (oper== "-"){
							$('#answer').val( a - b); 
						}else if (oper== "*"){
							$('#answer').val( a * b); 
						}else if (oper== "/"){
							$('#answer').val( a / b); 
						}

	})

////////////////////////////////////////////////////End///////
}}waitForJquery();

