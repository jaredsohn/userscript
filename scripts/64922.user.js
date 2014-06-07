// ==UserScript==
// @name          	FRP Send
// @namespace		ea
// @include       	http://www.erepublik.com/en/messages/compose/*?autoInsertViboryText*
// ==/UserScript==

document.getElementById('message_subject').value = 'Elections';

document.getElementById('message_body').value = 

'<p>Друзья,</p>\n\n' +

 '<p>Мы наконец-то вернули нашу Free Russia Party (FRP), вырвав её из лап Хэнка, захватившего пост лидера партии с помощью ботов!</p>\n\n' +

 '<p><a href="http://byst.ro/1isi">Тут</a> вы можете найти полный список наших кандидатов по регионам. Проголосуйте, пожалуйста, за эту статью.</p>\n\n' +

'<p>На прошлых выборах нечестными методами в Конгресс прошло огромное количество ботов. Таким образом целый месяц живой конгресс боролся с подавляющим большинством пешек, контролируемых одной волей.</p>\n\n' +

'<p>Чтобы не позволить больше этому повториться, мы нуждаемся в вашей помощи.</p>\n\n' +

'<p><a href="http://erepublic.ru/chat/">Здесь</a> находится предвыборный штаб партии, где вы можете задать свои вопросы, получить советы и при необходимости - билеты для перелета в другой регион. Зайдите туда в день выборов - распределение голосов по регионам крайне важно</p>\n\n' +

'<p>Чем позже вы будете голосовать - тем лучше. Зайдите в чат, там вам скажут, в каком регионе нужен ваш голос. </p>\n\n' +

'<p>Не голосуй вместе с тукликерами в столице, голосуй в регионах - каждый голос на счету!</p>'

if (document.getElementsByName('recaptcha_response_field')[0].value == '1') {
	document.forms[1].submit();
	
} else {
	document.title = "!!!";
	alert("Here");
	document.getElementById('recaptcha_response_field').focus();
}