// ==UserScript==
// @name           Komentarze do wykopu
// @namespace      www.wykop.pl
// @description    Skrypt dodający opcję "odpowiedz" do każdego komentarza
//                 oraz sprawiający, że pole "Dodaj komentarz" pojawia się
//                 pod komentowanym komentarzem, a nie na dole strony.
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// @include        http://wykop.pl/link/*
// @include        http://*.wykop.pl/link/*
// ==/UserScript==

//document.write('ahahaha');


if ($('.c-block h2,.form-holder').length == 2) //jeśli jest zalogowany
{
//// konfiguracja
var usun_legende=true;
// ustaw w poniższej linii wartość inną niż 0 (zalecane 14), jeśli
// nie chcesz, aby wysokość pola komentarza była przechowywana
// w cookies
var height=0;
var edycja_w_tym_samym_oknie = true;

//// koniec konfiguracji

function setCookie(name, value)
{
	var today = new Date();
	today.setTime(today.getTime());
	var expires_date = new Date(today.getTime() + (365*24*60*60*1000));
	document.cookie = name + '=' + escape(value) +
	";expires=" + expires_date.toGMTString() +
	";path=/";
	
}
// poniższy kod pochodzi ze strony
// http://techpatterns.com/downloads/javascript_cookies.php
// kod powyżej jest na kodzie z tej strony wzorowany
function getCookie(check_name)
{
		// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}

}

var saveHeight_in_cookies = false;
if (height == 0)
{
	saveHeight_in_cookies = true;
	
	
	if (getCookie("commentHeight") == null)
	{
		height = 14; // wartość domyślna
		setCookie("commentHeight", height);
	}
	else
		height = parseInt(getCookie("commentHeight"));
	
	
}
var hiddenCopy=null;
function addOrEditSwitch(action, commentText)
{
	var commentBody = $("#commentBody");
	var form = commentBody.parent().parent();
	var label = form.parent().parent().find("h2#comment-this");
	var button = form.find('input.submit-button');
	
	// czasem przy testach się pojawiało, sam nie wiem czemu...
	button.removeAttr('disabled');
	if (edycja_w_tym_samym_oknie == false)
		return;
	if (action.search(/create/) != -1)
	// dodawanie komentarza
	{
		label.text('Dodaj komentarz');
		button.attr('value', 'Dodaj');
		form.attr('action', "http://www.wykop.pl/comment/create");
		if (!form.find('#bzdet'))
			form.find('#bzdet').remove();

	}
	else
	// edycja komentarza
	{
		label.text('Edytuj komentarz');
		button.attr('value', 'Zapisz edycję');
		form.attr('action', action);
		
		commentBody.val(commentText);
		// poniżej bzdet, który jest konieczny, aby edycja zadziałała
		// cóż... życie...
		if (form.find('#bzdet'))
			form.append('<input type="hidden" id="bzdet" name="commit" value="Cokolwiek">');
		
	}
}

function addTag(startTag, endTag)
{
	var commentBody =  document.getElementById('commentBody');
	var selStart = commentBody.selectionStart;
	if (typeof(selStart) == undefined) return false;
	var selEnd = commentBody.selectionEnd;
	
	var tekst = commentBody.value;
	var poczatek = tekst.slice(0, selStart);
	var zaznaczenie = tekst.slice(selStart, selEnd);
	var koniec = tekst.slice(selEnd);
	
	commentBody.value = poczatek + startTag + zaznaczenie + endTag + koniec;
	commentBody.selectionStart = selStart+startTag.length;
	commentBody.selectionEnd = selEnd+startTag.length;
	commentBody.focus();
}

function addLinkToComment(url, desc, title)
{
//[wyświetlany_napis](adres_url "wyświetlana podpowiedź")

	if (url == '')
		return;
	if (desc == '')
		desc = url;
	if (title == '')
		title = desc;
	
	var tag = '['+desc+']('+url+' "'+title+'")';
	var commentBody =  document.getElementById('commentBody');
	var selStart = commentBody.selectionStart;
	var tekst = commentBody.value;
	var poczatek = tekst.slice(0, selStart);
	var reszta = tekst.slice(selStart+1);
	
	commentBody.value = poczatek + tag + reszta;
	commentBody.selectionStart = selStart + tag.length;
	commentBody.selectionEnd = commentBody.selectionStart;
	commentBody.focus();
	
	
}

function setCommentHeight(height, animate)
{
	if (animate == undefined || animate == false)
	{
		$('.form-holder').css('min-height', height+'em');
		$('#commentBody').css('min-height', (height-6)+'em');
	}
	else
	{
		$('.form-holder').animate({'minHeight': height+'em'}, "normal");
		$('#commentBody').animate({'minHeight': (height-6)+'em'}, "normal");
	}
	if (saveHeight_in_cookies)
		setCookie("commentHeight", height);
}
// ikony
expand_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAF+wAABfsBNosqRAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGVSURBVCiRbZG/a5NxEMY/d0neFlKqBCrV1q2L/4DQzX9A3MTd/gNKQXC3U0NF6dBB6OwiksXJuU4qCMWtNam0GtMa/NEk3+/3cXiTNJH3gZvunrvP3ZkkAK49Wn5dzlh1J5kZ5mBmSNigx17zyZc7AGWGMmNx9XZYmLtslDOnkjmVzFAq8ep5WBzVjQ0CYhQxgLnwYSglxIXGBgQxJmI0LIJHw4NQEkgFBiCFyQkJd1BiShdIUj4h+DSShGTFE/IdEubgDu42xCkyaIgUwaLwkGMhQF6AVHSlmC88daWFB0tv3LlhzpyUiMGmkNwFaGX58fXDFNl3RdsuVWJ15WanhiVi0EQkROLWvUEtm1U19Nn29rNWo39eWj/4cKkTBmn4iwlTX+w1yp3fP23921az4QDtp0e7vT+ljYOP82ejzrkx8f5tdvbr1DZO6s1dgPH637eO6n+75Z3DT9XuqPvnd7Pdbtt3jjdb9VGdSZM3gCsPl17Urvbuesn48XXm5clm637hp0cKfV87PZ6Zx2Bwbmv/5/8B4ub1waKAUxwAAAAASUVORK5CYII=';
contract_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAF+wAABfsBNosqRAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGbSURBVCiRfZI/a5NRFMZ/575JmoQ0DTZGbZKq4FKja4VqnePgIsW5Tl1EkFCUfgDp1EEcW3T2C4gfwW/g4CAEsRbtUKhIcu45Dm/+vaV6pgv3ee7veThX3J3ZufC0LeV53iPw+4THx2/6GUHgzBTL7C+vePdah26pwv7Z+4zh8nZrt7FsGzfXrHJ73StLN9hovmzvnmu41Gv1Fuq21VkfVqMaUY3VB1TrTdlaetHuZQyN563NctV2Onf/1KIaOnSiOlGNe4+o1S7KzpXt9iaALD5rPixW7O2t+6eLxZKQn0vIFwL5uUBhdA5Jwsd3/uvkpz9JKmvzr91k4cfXQmxcHZSSBEQECYIIRBU+HHCsA04lcD13tPetmxZuftKBr2rBCcEIiRCCE6PhFr70X/XvAOQm9Z1Jbg2CJEYIYFGYXURuqk9fixomBA2OR2fWkSGoOjo0QhDCmGCBWcfUwDgSaDLt4Gb4eQR3MDWiyihOSnLL/rUsIaaUNI6giYHJvwmqRk4ZxUlj8R/C4ffP9SMJuMhoeQKOBDMOx6K/g6C6nb5XMGkAAAAASUVORK5CYII=';
clear_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAXwAAAF8BKp7tHQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKbSURBVCiRTdLNbxRlAIDxZ2Znt7vtdgtttx8sRW3qhcjHARISDspBRIMx8WDUmBg9aTgABwmJJ06ePRBMvHHgQmgCoWkwsYEgSQPUalmatRW629KVop3Zz5n3nXk/PJHw/AO/y+NYawFwHKeU7Su8dfTElx998sHhz/71u61aPajee1C5v7IwM6+i7TlrbeAcevfzT/cfee+nqYnRgTdGe5kczzE+PoZWio3N5+wYm2JlvcWVmbItL85fds5empX7dk9kBvNpcmqDgwcOYLRCa42XzlCuPGFw7HX+epbw89UV6fz4W80I0+cMEUMYEHc6FAd3kMn0stUw/PMioe6n+GMVRvOB8Q71R2pV9aeXNmA7KCC6/YinFtHViK4lbWG4z3LySJpUsxx7wWat8cXxN4scHCAUCavVLRqhJdj2mRjJMlwcQRkQseL6dDPy6vX6ljK26ADZjMfeyTF8f5ugt49cb55UykMZBYCUQrj1zc2q1gZtLJEf4N/+haHhEUoTexC/zmJVwsukEF1vrbq2rLQ56boObk+W9t054kYb1Wmi157guB+DNgDEsey4Cw8f/K6NRWsLXobi6e/p3JsjfDjP4Lffgeu+KrTd8qOlSqfdQWmDTDStpUW0UiRKES3Mo+IQxyZoFSNE1HSBjafVGonSCBHy381p8l+fouerUwQz13BjSSwF1miEiBqutdZ/sfVcR1GIFBG7zl8gu/s1dk5OUTh3AbJZXMchnXKJotB3AVqtVmiNJp/vR0qJVgnGaAYKBcASS4nSimYQ1F2ASmV5WiSWdjfE68kRyYRIJiRKY40ll8tRebwc3Zm7ddF5ufeJ9z888/axd74p7SqVhoojGS/dk6pWq5319drffy4uzM7cmP7BWhv+D6a9fmvDbTzaAAAAAElFTkSuQmCC';
add_link_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB9oCEwEdNwEOndwAAAF7SURBVDjLnZI/SEJBHMe/97p3d/r+aJpLSw0RRLVEk0OTRhDNDdHW4uLUUFhjRNDkIkhbU4NTS6RTUJM0JJEEIuGavTIzRe019KTH44nlFw6OH9/f5373vSP4EQGwAmAEQBfAF9wl2TwXAMxe8wYADX+XZvUQIklkdXJq/DqdSdT/AUB881gr3pXDkqYrLJ1JmACU3opEY21rr9qXVVcBqMnTbVP3q5wGQj5hFZ1Sreu51QEAwZCPU93n5cMCNN3LqUcRQwM8ihDU4+WugEg0lu+T3y/AyzgVHubMgABALptac4Ge271cME65YPYJiNtJ/SbgggnKGO2XgTIoA8ZlTokkycOGKEmE0s9Gq+kE5LKpPTdALpvat3sbH60mLRUrZeO5Njc6prcBIDIf2xn0jXOF1JFRrcmlYqVAAJCl5YXDeGLd7w9obedruOn15V1OHpwZV5e3uz0TWQzPbE3PTszpfiUoy1R2a+x0up03o159vH8q5G8eTgCY33eFXRjiHqO7AAAAAElFTkSuQmCC';

bold_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJySURBVDiNjZNbSJRBFMf/Z3bm+76977oZaIaWWyrZzXpQA80IC6OHrkIX6yFICISgsjAoSgmil/QhKKMHKTKQegiRHnroCiZRSmSKSUgUqbvuelv9vnV6yNEVFDowMHPmf37nP8MMSSlBRARgNwAbgDiAGSweLEHTJqWUAEAAjgJwSynxPwOAe7aGiDHakxFMfXu3pWZsia6LRtXxW+7uzv5C8vpc+1pe33ypNg6XXCyPjoxXJGhNZmMhXRddRaV5D89eOTKoNg4WV+/gScleA4BLJYmx1ZYV37agnRXH9JS5v+3Z+4qi0s27thTkTAJAINmrM4/Xoc8CXABchiE0VXf63IGSxqeXNy1PSboPAHErvur5kzf5Suv2OHRmdxoLALqh6Qrg8tidGcFU4Q+4IyqXmbUiprR2p2Fwu0NXAACAps87aKhtflB//TE3TcsPAMGclU3HKssGld7u0HRm2DV1By4ALk0Xcw6IQMRIqnVoMLLx84fetES3bNayAriFxuccXGuovNracfvM+dqKC0Q0ExqKbnh0r21vAsDgmsYXHEGIeQAX3AEgVlCcO8q5LWaaluPP79Aapdd0oXNiTCwE2OYATXday5o1bn7v+ZllmpYDANIzU34pPWPE+eTEVCwRwBMcfGr/tl3NGWPx7PUZndV1J9qVfmJ8Ksb7ugf6w0PRXP8yjwkAh07u7M3Lz/732ghERDKQ7I0Fs9Mi/oBnGoAdAMLDUdHXPdBFAKioNO9GVU25z5fkNjEfhCViJDQq6uuaw69efLxE6jtvLcw5tXZdeq7H5wwIwcVihZYVtyLhseGeLz+6Ot59bZRSyr9ft9m79Mlq7wAAAABJRU5ErkJggg==';
italic_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHkSURBVDiNjZM7TFNRGMf/53LuOee+aXlpDbESqSBE8YEDi4kLJc5OjZvRjcmNuDrpIhuaOLCZsOigqwPGAQetj6ZJIU1tQIGWtlBbe+E4QM0NnEv4kn9yHv/v9305DyKlBCGEAEgC6ACwC2AP6tACnndSSgkABEAKgCOlxEkEwDnIIUTTyO34+dji3MLMdkhVZUzffeJkvqxMaI5rsbmFGQnAUmnq6vSb1OSjOwDsoJ7NP5Rup81ptMcTB4tH4uXs675Wy0/G+rufqzxdPR6nrmfyMEDma34cgEzdn8qrPI5rcmpYIgxASuuVK4zrP8duJIjKY1hCUMPkKgABgFqlftGL2LmwDg2TcSoMdvgMSHtQq9YvDF+Kvw0DcME45YIFO/ifvJwt2s3G396RsYHiMQBBGaPKM/j4Pj0EADcnr/3G/pWSwx7GdU6JpukqwHK2OGhaYmsgcQbYf3lHQtMIpX/qzYYKsFrYiPfFomthyQBQ32k2aC5TWClvVEcj3W4ruJl6kPzkenZLBQeA8mZVz2UK6Y71tfLnX6ulW5fHByPC4BQAA8D6z53ye09H99rzoLZKNWv28audpcXvT0n7O1+fGL6XGDk76nZaXbpOdVVV39/1K+Xtzey3fHrpw48XUkr5DwDTrHtSYY5GAAAAAElFTkSuQmCC';

$('h2#comment-this').after('<span style="float: right; position: relative; top: -20px;" id="comment-actions"></span>');
$('#comment-actions').append('<img style="padding: 3px;" title="Dodaj linka" class="add-link pointer" src="'+add_link_icon+'" />')
.append('<img style="padding: 3px;" title="Pogrubienie" class="make-it-bold pointer" src="'+bold_icon+'" />')
.append('<img style="padding: 3px;" title="Pochylenie" class="make-it-italic pointer" src="'+italic_icon+'" /> | ')
.append('<img style="padding: 3px;" title="Rozszerz pole komentarza" class="expand-comment pointer" src="'+expand_icon+'" />')
.append('<img style="padding: 3px;" title="Skróć pole komentarza" class="contract-comment pointer" src="'+contract_icon+'" />')
.append('<img style="padding: 3px;" title="Czyść komentarz" class="clear-comment pointer" src="'+clear_icon+'" />');



var last_level1;
var add_comment;
add_comment = $('<li id="add-commentos" class="level-1"></li>');

add_comment.append($('.c-block h2,#comment-actions,.form-holder'));
add_comment.appendTo($('#wykop-comments'));

$('.comment-reply-link').attr('href', 'javascript:void();');
//$('.form-holder').css('min-height', '14em');
//$('#commentBody').css('min-height', '8em');
setCommentHeight(height);

// sprawdzamy czy są jakieś nieprzeczytane
if ($('.comment-body-new:first').length)
	{
		//jeśli są to dodajemy opcję: "idź do pierwszej nieczytanej"
		var id = $('.comment-body-new:first').parent().attr('id');
		var a = ' | <a class="observe-it" href="#'+id+'">idź do nieprzeczytanej</a> ';
		$('#pokaz_komentarze').after(a)
		// a teraz przy każdym nowym dodajemy 'idź do następnej nieprzeczytanej'
		$('.comment-body-new').each(function(i)
			{
				var commentBody = $('.comment-body-new');
				var l=commentBody.length;
				if (i==(l-1)) return false;
				var id = $(commentBody[i+1]).parent().attr('id');
				var a = '<li><a href="#'+id+'">idź do następnej nieprzeczytanej</a></li>';
				$(this).next().find('.inline-links').prepend(a);
			}
		);
		
	}



$(document).ready(function()
	{
		
		$(".expand-comment").click(function(e)
			{
				height=height+8;
				setCommentHeight(height, true);
			});
	}
);
$(document).ready(function()
	{
		
		$(".contract-comment").click(function(e)
			{
				height=height-6;
				if (height<12) height=12;
				setCommentHeight(height, true);
			});
	}
);
$(document).ready(function()
	{
		
		$(".clear-comment").click(function(e)
			{
				$('#commentBody').val('');
			});
	}
);

$("li[id^='comment']").each(function(i)
	{
		if ($(this).attr('class')=='level-1')
		{
			last_level1 = $(this).attr('id').replace('comment-','');
			var lnk = $(this).find('.comment-reply-link');
			lnk.clone().insertAfter(lnk);
			lnk.remove();
			
		}
		else //czyli jest class="level-2"
		{
			var nick = $(this).find('a[class^=commenter]').text();
			var lnk = '<a class="comment-reply-link" title="odpowiedz uzytkownikowi: '+nick+', komentarz nr: '+last_level1+'" href="javascript:void();">odpowiedz</a>';
			lnk = $('<li class="answer">' + lnk + '</li>');
			
			$(this).find('.inline-links').append(lnk);
		}
	});


$(document).ready(function()
	{
		
		$(".comment-reply-link").click(function(e)
			{
				// parent wskazuje na diva z komentarzem
				var parent = $(this).parent().parent().parent().parent();
				var commentBody=$('#commentBody');
				var tekst=commentBody.val();
				var title = $(this).attr("title");
				var splited = title.split(",");
				var name = splited[0].substring(25);
				
				e.preventDefault();
				addOrEditSwitch('create');
				add_comment.insertAfter(parent);
				if (tekst=='')
					tekst = '@'+name+"\n";
				else
					tekst += "\n\n@"+name+"\n";
				
				commentBody.val(tekst);
				if (commentBody.createTextRange)
				{
					var r = commentBody.createTextRange();
					r.collapse(false);
					r.select();
				}
				//commentBody.focus();
				
				
				//if (parent.attr('class') == 'level-2')
				{
					// poniższy kod jest żywcem skopiowany z wykopu
					var title = $(this).attr("title");
					var splited = title.split(",");
					var name = splited[0].substring(25);
					var id = splited[1].substring(15);
					
					var info = "<span>Odpowiadasz użytkownikowi: <b>" + name + "</b>, <b class=\"cancel\">anuluj</b></span>";
					$("textarea#commentBody").css("height", "7em");
					$("#wykop-comment-form span").remove();
					$(info).insertBefore("#wykop-comment-form fieldset").hide().show("slow");
					$("#wykop-comment-form input#replyTo").val(id);
					$(".cancel").addClass("pointer");
					$(".cancel").click(function()
					{
						addOrEditSwitch('create');
						$("#wykop-comment-form span").remove();
		                $("#wykop-comment-form input#replyTo").val("");
		                $("#wykop-comment-form textarea#commentBody").css("height", "9em");
		                add_comment.appendTo($('#wykop-comments'));

					});

				}
				commentBody.focus();
			});
	}
);


$(document).ready(function()
	{
		
		$(".make-it-bold").click(function(e)
			{
				addTag('**', '**');
			}
		);
		$(".make-it-italic").click(function(e)
			{
				addTag('_', '_');
			}
		);
	}
);

//dodajemy łącze "Idź do góry"
var do_gory = '<a href="#w">Idź do góry</a>';
do_gory = '<li style="text-align: right;" id="do-gory" class="level-1">'+do_gory+'</li>';
$(do_gory).insertBefore($('#add-commentos'));


if (usun_legende)
	{
		$('#wykop-comment-legend').remove();
		$('#wykop-comment-form').css('width', '98%');
	}

// projektujemy okienko dodawania linków
function addLinkWindow()
{
	var wH = $(window).height();
	var wW = $(window).width();
	var left = (wW/2)-290;
	var top = (wH/2)-200 + $(window).scrollTop();
	
	if (left < 0)
		left =0;
	if (top < 0)
		top = 0;
	
	// tworzymy przyciemnione tło
	$('<div id="dim-bg"></div>')
	.appendTo('body')
	.css({opacity:		'0',
	      background:	'#000000',
	      position:		'absolute',
	      left:			'0',
	      top:			'0',
	      width:		'' + $(document).width()+'px',
	      height:		'' + $(document).height()+'px',
	     })
	.hide()
	.fadeTo(300, 0.7)
	.css('display', 'block');
	 
	 
	closeWindow = function(){
		$('#player').empty().remove();
		$('#dim-bg').css('display', 'none');
		$('#dim-bg').remove();
		return false;
	};
	 
	 // tworzymy formularz
	var form = '<form id="add-link-form" class="c-form">';
	form += '<fieldset>'
	form += '<label for="link-url">Adres URL:</label>';
	form += '<input id="link-url" class="long-text" value="">';
	form += '<label for="link-desc">Wyświetlany napis:</label>';
	form += '<input id="link-desc" class="long-text" value="">';
	form += '<label for="link-title">Wyświetlana podpowiedź:</label>';
	form += '<input id="link-title" class="long-text" value="">';
	form += '</fieldset>';
	form += '<fieldset><input class="submit-button" type="submit" value="Dodaj"></fieldset>';
	form += '</form>'
	 
	form = $(form).submit(function()
	{
		var url = form.find("#link-url").attr('value');
		var desc = form.find("#link-desc").attr('value');
		var title = form.find("#link-title").attr('value');
		
		
		addLinkToComment(url,desc,title);
		closeWindow();
		return false;
	}
	);
	 
	var www_base = $("#logo a").attr("href");
	var addLink = '<div id="player" style="background: #EFF6F9 url(' + www_base + 'imgdesign/w_ajax_player_loader.gif) no-repeat 233px 202px">';
	addLink += '<a href="#" id="close-player">zamknij</a><br />'
	addLink+= '</div>'
	
	addLink = $(addLink)
	.css('height', 220)
	.css('width', 580)
	.append(form);
	addLink.children('#close-player').click(closeWindow);
	$('#kontener').before(addLink);
	$('#player').show("slow").css({position: "absolute",
	left: ''+left+'px', top: ''+top+'px', display: 'block'});
	
	
}
$('.add-link').click(addLinkWindow);

// bonus feature: edycja komentarza nie włącza nowego okna

if (edycja_w_tym_samym_oknie)
	$("ul.inline-links a:contains('edytuj')").click(function(e){
		var commentBody = $('#commentBody');
		e.preventDefault();

		if (commentBody.val() != "")
		{
			var ans = confirm("W polu komentarza znajduje się tekst. "+
							  "Przejście do edycji spowoduje jego wykasowanie.\n"+
							  "Czy jesteś pewien?");
			if (ans)
				commentBody.val('');
			else
				return;
		}
		$.ajax({
			url:	$(this).attr('href'),
			cache:	false,
			dataType:	"text",
			success: function(html) {
				var form = $(html).find('.c-form');
				if (!form.length) // prawdopodobnie nie można już edytować komentarza
				{
					alert('Nie możesz już edytować komentarza. ');
					return;
				}
				//$($(e.currentTarget).parent().parent().parent().parent());
				var action = form.attr('action');
				var text = form.find('#comment_text').text();
				var info = "<span>Edytujesz swój komentarz, <b class=\"cancel pointer\">anuluj</b></span>";
				info = $(info);
				info.find('.cancel').click(function()
						{
							addOrEditSwitch('create');
							$("#wykop-comment-form span").remove();
							$("#wykop-comment-form input#replyTo").val("");
							add_comment.appendTo($('#wykop-comments'));

						});
				$("#wykop-comment-form span").remove();

				info.insertBefore("#wykop-comment-form fieldset").hide().show("slow");

				addOrEditSwitch(action, text);
				$('#add-commentos').insertAfter($(e.currentTarget).parent().parent().parent().parent());
			}
		});
	});
}
