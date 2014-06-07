// ==UserScript==
// @author		 Qster
// @name         WYKOP.PL Filtr komentarzy
// @description  Narzędzie do prostego filtrowania komentarzy wg. nicków, platynowych kont oraz ocen.
// @require      http://code.jquery.com/jquery-latest.min.js
// @include      http://*.wykop.pl/link*
// @include      http://wykop.pl/link*
// ==/UserScript==

(function() {

jQuery.expr[':'].contains = function(a,i,m){
  return jQuery(a).text().toUpperCase()
  .indexOf(m[3].toUpperCase())>=0;
};


//----- USTAWIENIA ----
var chowaj_tych_bucow = new Array('informacjaniepraw','alato','kolorowyburaczek','InformacjaZD','choryznie','omnomnom'); //dodawaj tu nicki po oddzielając przecinkami
var chowaj_komentarze_platynowych = 1; //Zmień na zero jeśli chcesz widzieć komentarze zbanowanych
//----------------------	
		
		



var x;
	for ( x in chowaj_tych_bucow)
		{
		var comment = $("a:contains(" + chowaj_tych_bucow[x] + ")").parents("li[id*='comment-']");
		hide_comment_answers(comment);
		}
//---------------




if (chowaj_komentarze_platynowych !=0){
$("a.commenter4").parents("li[id*='comment-']").each(function(){
	var comment = $(this);
	hide_comment_answers(comment);
});
}

//---------------






//oceny
$(document).ready(function()
{

var a =" |  <span id='schowaj'> Schowaj komentarze z oceną poniżej </span><select id='toggle_vote'><option value='80'>+80</option><option value='20'>+20</option><option value='5'>+5</option><option selected='selected' value='nie'>---</option><option  value='-15'>-15</option><option  value='-25'>-25</option><option value='-50'>-50</option></select>";
$('#pokaz_komentarze').after(a)
$('span#schowaj').css('color','#FF5917');
$('select#toggle_vote').css({'font-size':'10px','padding':'0px'});


	$('select#toggle_vote').change(function()
		{
			var limit = $(this).val();
				do_hide(limit);
		}
	);

	
});
//---------------
function do_hide(limit)
		{	
				$("span.vc").each(function()
					{
					var num_s = $(this).html().replace(/^\s+\+?/,"");
					var num = parseInt(num_s);
					var comment = $(this).parents("li[id*='comment-']");
						if (num <= limit) 
							hide_comment_answers(comment);
					});
		}
		
function hide_comment_answers(comment)
	{
	comment.hide();
		if (comment.hasClass('level-1')) 
				{
					while (comment.next().hasClass('level-2'))
						{
							var comment = comment.next();
							comment.hide();
						}
				}
	}
//---------------



				
}());