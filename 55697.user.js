// Multi Message Script
// Usage:
//    - enter topic and content
//    - enter list of recipients, each on a new line
//    - start clicking [ send ]
// Be careful - you can get temporarily blocked your message sending capabilities
//    if you send too many messages too fast.

// ==UserScript==
// @author      Jinnie
// @namespace	http://userscripts.org/
// @name	Travian ☣ Multi Message Script
// @description	Send a mail to a list of arbitrary users.
// @include     http://*.travian.*/nachrichten.php?t=1
// @version     1.1.8
// ==/UserScript==


// Some constants

// Minimal interval between 2 mails
var MIN_INT = 10; // seconds
// Additional time - Maximum interval = MIN_INT + ADD_INT
var ADD_INT = 15; // seconds

// Find locale
var tr = [];
loadTranslations();
var locale = location.href.match("\.(\\w+)/nachrichten")[1];
if(locale == "com" || locale == "us" || tr[locale] == undefined){
	locale = "en";
}

// Prepare interfce


var sidebar = document.getElementById('side_info');
if (sidebar) {

	// title
	sidebar.appendChild(document.createElement('br'));
	var title = document.createElement('b');
	title.appendChild(document.createTextNode(("☣ " + tr[locale].multi_message) + " ☣"));
	sidebar.appendChild(title);

	// topic
	var mtopic = document.createElement('input');
	mtopic.id = "multi_topic";
	mtopic.style.border = "1px solid #71D000";
	mtopic.style.width = "239px";
	sidebar.appendChild(document.createElement('br'));
	mtopic_lbl = document.createTextNode(tr[locale].topic);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mtopic_lbl);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mtopic);


	// message content
	var mmsg = document.createElement('textarea');
	mmsg.id = "multi_msg";
	mmsg.rows = 15;
	mmsg.cols = 35;
	sidebar.appendChild(document.createElement('br'));
	mmsg_lbl = document.createTextNode(tr[locale].content);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mmsg_lbl);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mmsg);

	// mail list
	var recs = document.createElement('textarea');
	recs.id = "receiver_list";
	recs.rows = 15;
	recs.addEventListener("change", listHandler, true);
	sidebar.appendChild(document.createElement('br'));
	recs_lbl = document.createTextNode(tr[locale].recipients);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(recs_lbl);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(recs);

	// auto send checkbox
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(document.createElement('br'));
	var autoBox = document.createElement('input');
	autoBox.type = "checkbox";
	autoBox.id = "auto_send";
	autoBox.addEventListener("click", boxHandler, true);
	sidebar.appendChild(autoBox);
	sidebar.appendChild(document.createTextNode(' ' + tr[locale].auto));

	// send button
	var sBtn = document.createElement('span');
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(sBtn);
	var buttonLbl = document.createElement('span');
	buttonLbl.id = "button_label";
	buttonLbl.appendChild(document.createTextNode(' ' + tr[locale].one_per_click));
	sidebar.appendChild(buttonLbl);
	sBtn.innerHTML=tr[locale].send;
	sBtn.id = "send_button";
	sBtn.addEventListener("click", buttonHandler, true);
	sBtn.style.color="#777777";
	sBtn.style.fontWeight = "bold";
	sBtn.style.backgroundColor = "#d3d3d3";
	sBtn.style.border = "1px solid #71d000";
	sBtn.style.cursor = "pointer";
	sBtn.style.paddingLeft = "5px";
	sBtn.style.paddingRight = "5px";
}


// Main Logic

function buttonHandler(){
	var auto_send = document.getElementById("auto_send");
	if (auto_send.checked) {
		var btn = document.getElementById("send_button");
		btn.style.visibility = "hidden";
		sendMessage(true);
	} else {
		sendMessage(false);
	}
}

function boxHandler(e){
	var box = document.getElementById("auto_send");
	var button_label = document.getElementById("button_label");
	if(box.checked){
		button_label.innerHTML = ' ' + tr[locale].all_in_a_sequence;
	} else {
		button_label.innerHTML = ' ' + tr[locale].one_per_click;
	}
}

function listHandler(){
	var list = splitReceivers();
	var res = "";
	for (var i=0; i<list.length; i++) {
		var player = list[i];
		if (player.match("^\\d+\.")){
			player = fromClanList(player);
		}
		res += player + "\n";
	}
	var rcvs = document.getElementById('receiver_list');
	rcvs.value = res;	
}

function fromClanList(row){
	var result = row;
	result = result.split("\t")[1];
	return result;
}

function sendMessage(autoSend){
	var rcvs = document.getElementById('receiver_list');
	if(rcvs.value.length == 0) {
		alert(tr[locale].msg_no_recipients);
		return;
	}
	var mmsg = document.getElementById('multi_msg');
	var mtopic = document.getElementById('multi_topic');
	if(mmsg.value.length == 0 || mtopic.value.length == 0) {
		alert(tr[locale].msg_topic_and_content);
		return;
	}
	var receiver = getReceiver();
	if (receiver == ""){
		alert(tr[locale].msg_invalid_recipient);
		return;
	}
	send(receiver, mtopic.value, mmsg.value);

	if (autoSend) {
		if (rcvs.value.length > 0) {
			// 10 to 25 seconds delay between 2 messages
			var randInterval = Math.round((Math.random() * ADD_INT + MIN_INT) * 1000);
			setTimeout(function(){sendMessage(true);}, randInterval);
		} else {
			var btn = document.getElementById("send_button");
			btn.style.visibility = "visible";
			alert(tr[locale].msg_finished_auto_sending);
		}
	}
}

function getReceiver(){
	var rcvrs = splitReceivers();
	var result = rcvrs[0];

	// now remove him from the list
	rcvrs.splice(0,1);
	saveRcvrs(rcvrs);
	return trim(result);
}

function splitReceivers(){
	var rcvStr = document.getElementById('receiver_list').value;
	return rcvStr.split("\n");
}

function saveRcvrs(rcvrs){
	var rcvList = document.getElementById('receiver_list');
	var rcvStr = rcvrs.join("\n");
	rcvList.value = rcvStr;
}

function send(to, topic, text){
	var randX = Math.round(Math.random() * 90 + 3);

	var randY = Math.round(Math.random() * 17 + 2);

	var postData = "an=" + to + "&be=" + topic + "&c=" + getCParam() + "&message=" +
			text + "&s1.x=" + randX + "&s1.y=" + randY + "&t=2";
	var url = document.location.href.split("?")[0];
	post(url, postData);
}

function getCParam(){
	var writeDiv = document.getElementById('write_content');
	var writeForm = writeDiv.getElementsByTagName('form')[0];
	var cParam = writeForm.getElementsByTagName('input')[0];
	if(cParam.name == "c") {
		return cParam.value;
	}
	alert (tr[locale].err_c_param);
	return null;
}

function trim(text) {
	return text.replace(/^\s+|\s+$/g,"");
}

function post(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
//	alert("Sent: " + data);
    }
   });
}

// Translations
function loadTranslations(){
tr["en"] = {
	multi_message: "Multi-Message",
	topic: "Topic:",
	content: "Content:",
	recipients: "Recipients (one per line):",
	auto: "auto",
	send: "send",
	one_per_click: "(one per click)",
	all_in_a_sequence: "(all in a sequence)",
	msg_no_recipients: "No recipients for this message",
	msg_topic_and_content: "Please, enter both topic and content",
	msg_invalid_recipient: "Invalid recipient",
	msg_finished_auto_sending: "Finished auto sending",
	err_c_param: "Error: 'c' parameter was not resolved!"
}

// Bulgarian by Jinnie
tr["bg"] = {
	multi_message: "Мулти-Съобщение",
	topic: "Тема:",
	content: "Съдържание:",
	recipients: "Получатели (един на ред):",
	auto: "авто",
	send: "изпрати",
	one_per_click: "(един на клик)",
	all_in_a_sequence: "(всички последователно)",
	msg_no_recipients: "Няма получатели за това съобщение",
	msg_topic_and_content: "Моля, въведете тема и съдържание",
	msg_invalid_recipient: "Невалиден получател",
	msg_finished_auto_sending: "Автоматичното изпращане завършено",
	err_c_param: "Грешка: 'c' параметъра не е намерен!"
}

// Turkish - thanks to Hancock
tr["tr"] = {
	multi_message: "Coklu Mesaj",
	topic: "Konu :",
	content: "Mesaj Icerigi :",
	recipients: "Alicilar (Satir Satir):",
	auto: "Otomatik",
	send: "Gonder",
	one_per_click: "(Tek Tek Gonderim)",
	all_in_a_sequence: "(Toplu Gonderim)",
	msg_no_recipients: "Gonderilecek Alici Kalmadi !",
	msg_topic_and_content: "Lutfen, Konu ve icerik alanini doldurunuz.",
	msg_invalid_recipient: "Gecersiz Alici",
	msg_finished_auto_sending: "Otomatik Gonderim Tamamlandi",
	err_c_param: "Hata: 'c' parametresi cozumlenemedi !" 
}

// Arabic - thanks to Dream1
tr["ae"] = {
	multi_message: "مرسل الرسائل الجماعية",
	topic: "الموضوع:",
	content: "محتوى الرسالة:",
	recipients: "قائمة المرسل لهم (أسم واحد في كل سطر):",
	auto: "تلقائي",
	send: "أرسال",
	one_per_click: "(أرسال لمستلم واحد كل مرة)",
	all_in_a_sequence: "(أرسال للجميع دفعة واحدة)",
	msg_no_recipients: "لا يوجد أسماء في قائمة المرسل لهم",
	msg_topic_and_content: "من فضلك أدخل الموضوع ومحتوى الرسالة",
	msg_invalid_recipient: "أسم المرسل له غير صحيح",
	msg_finished_auto_sending: "تم الانتهاء من ارسال الرسائل",
	err_c_param: "خطأ : 'ج' لم يتم العثور على المتغير!"
}

// German - thanks to STRO
tr["de"] = {
	multi_message: "Multi-Nachricht",
	topic: "Betreff:",
	content: "Text:",
	recipients: "Empfänger (Einer pro Zeile):",
	auto: "automatisch",
	send: "senden",
	one_per_click: "(eine je klick)",
	all_in_a_sequence: "(alle in Folge)",
	msg_no_recipients: "Keine Empfänger für diese Nachricht",
	msg_topic_and_content: "Bitte Betreff und Inhalt eingeben",
	msg_invalid_recipient: "ungültiger Empfänger",
	msg_finished_auto_sending: "Automatisches senden abgeschlossen",
	err_c_param: "Fehler: 'c' Parameter konnte nicht entschlüsselt werden!"
}

// VietNam - thanks to hocheeming
tr["vn"] = {
	multi_message: "Viết nhiều tin nhắn cùng lúc",
	topic: "Chủ đề:",
	content: "NỘi dung:",
	recipients: "Người nhận gồm (mỗi người 1 dòng):",
	auto: "Tự động",
	send: "Gửi",
	one_per_click: "(mỗi người 1 click)",
	all_in_a_sequence: "(Gửi liên tiếp cho tất cả)",
	msg_no_recipients: "Không có tên người này",
	msg_topic_and_content: "Hãy viết chủ đề và nội dung",
	msg_invalid_recipient: "Người nhận không hợp lệ",
	msg_finished_auto_sending: "Tự động gửi thư đã hoàn tất",
	err_c_param: "LỖi: 'c' không xác định được!"
}

// Hungarian - thanks to zsom
tr["hu"] = {
	multi_message: "Multi-Üzenet",
	topic: "Téma:",
	content: "Üzenet:",
	recipients: "Címzett (soronként egy):",
	auto: "auto",
	send: "küld",
	one_per_click: "(klikkenként egy)",
	all_in_a_sequence: "(mind egymásután)",
	msg_no_recipients: "Az üzenetnek nincs címzettje!",
	msg_topic_and_content: "Add meg a témát és az üzenetet!",
	msg_invalid_recipient: "Ismeretlen címzett",
	msg_finished_auto_sending: "Az automatikus küldés véget ért.",
	err_c_param: "Hiba: 'c' paraméter nem található!"
}

// Romanian - thanks to Danmana
tr["ro"] = {
	multi_message: "Mesaj Multiplu",
	topic: "Subiect:",
	content: "Continut:",
	recipients: "Destinatari (cate unul pe linie):",
	auto: "automat",
	send: "Trimite",
	one_per_click: "(cate unul pe click)",
	all_in_a_sequence: "(la toti, unul dupa altul)",
	msg_no_recipients: "Nu sunt destinatari pentru acest mesaj!",
	msg_topic_and_content: "Introduceti atat subiectul cat si continutul!",
	msg_invalid_recipient: "Destinatar invalid!",
	msg_finished_auto_sending: "Trimiterea automata s-a incheiat.",
	err_c_param: "Eroare: parametrul 'c' nu a fost rezolvat!"
}

// Russian - thanks to Lexx
tr["ru"] = {
	multi_message: "Мульти-Сообщение",
	topic: "Тема:",
	content: "Содержание:",
	recipients: "Получатели (один на лин):",
	auto: "авто",
	send: "Послать",
	one_per_click: "(По очереди)",
	all_in_a_sequence: "(Все в очереди)",
	msg_no_recipients: "Нет получателей в этом сообщении",
	msg_topic_and_content: "Введите тему и содержание",
	msg_invalid_recipient: "Неверный получатель",
	msg_finished_auto_sending: "Завершена авто-отправка",
	err_c_param: "Ошибка 'c' параметра"
}

// Polish - thanks to Signum
tr["pl"] = {
	multi_message: "Multi IGM",
	topic: "Temat:",
	content: "Treść:",
	recipients: "Odbiorcy (jeden w każdej linii):",
	auto: "auto",
	send: "wyślij",
	one_per_click: "(jeden klik, jeden nick :))",
	all_in_a_sequence: "(wszyscy po kolei)",
	msg_no_recipients: "Brak odbiorców dla tej wiadomości",
	msg_topic_and_content: "Wprowadź temat i treść wiadomości",
	msg_invalid_recipient: "Nieprawidłowy odbiorca",
	msg_finished_auto_sending: "Automatyczna wysyłka zakończona",
	err_c_param: "Błąd: parametr 'c' nie został rozpoznany!"
}

// Italian - thanks to ns65
tr["it"] = {
	multi_message: "Messaggio multiplo",
	topic: "Oggetto:",
	content: "Testo del messaggio:",
	recipients: "Destinatari (uno per riga):",
	auto: "auto (uno/tutti)",
	send: "Invia",
	one_per_click: "(uno per click)",
	all_in_a_sequence: "(tutti in sequenza)",
	msg_no_recipients: "Nessun destinatario per questo messaggio",
	msg_topic_and_content: "Inserire oggetto e testo del messaggio",
	msg_invalid_recipient: "Destinatario non valido",
	msg_finished_auto_sending: "Invio automatico terminato",
	err_c_param: "Errore: 'c' parametro non risolto!"
}

//Portuguese - thanks to ZITAX
tr["pt"] = {
	multi_message: "Mensagem Múltipla",
	topic: "Tópico:",
	content: "Conteúdo da Mensagem:",
	recipients: "Destinatários (um por linha):",
	auto: "automático",
	send: "Enviar",
	one_per_click: "(um por click)",
	all_in_a_sequence: "(todos numa sequência)",
	msg_no_recipients: "Não há destinatários para esta mensagem.",
	msg_topic_and_content: "Por favor, introduza o assunto e conteúdo da mensagem",
	msg_invalid_recipient: "Destinatário inválido",
	msg_finished_auto_sending: "Envio automático terminado",
	err_c_param: "Erro: 'c' parâmetro não foi encontrado!"
}

} //loadTranslations()
