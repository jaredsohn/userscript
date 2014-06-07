// ==UserScript==
// @name          	Election November
// @namespace		ea
// @include       	http://www.erepublik.com/en/messages/compose/*?autoInsertViboryText*
// ==/UserScript==

document.getElementById('message_subject').value = 'Congress';

document.getElementById('message_body').value = 
'Здравствуй, сопартиец.\n\n' +
'Раз это сообщение пришло тебе - ты уже сделал правильный выбор, поддержав ФРП в это бурное время. Несмотря на потоки лжи и провокаций, льющиеся со всех сторон, мы продолжаем работать на благо нашей еРодины, как делали это всегда. Внеси и свой вклад, помоги партии на выборах в конгресс. Не слушая пустословов - ты и только ты своим голосом поможешь достижению нашей общей цели. Для того чтобы помочь партии, зайди и заполни <a href=http://j.mp/59dCBW>эту форму</a>, а в день выборов зайди - <a href=http://erepublic.ru/chat/> сюда</a> или <a href=http://j.mp/5ACiz8>сюда</a>. Тебе подскажут, где ты нужнее всего. Спасибо, что разделяешь наши цели и идеалы о сильной и свободной еРоссии.';