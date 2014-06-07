// ==UserScript==
// @name		Avanturist.org forum anchor threads
// @description	Save position in each forum topic - later start reading from it (click on topic name in table of content)
// @include  http://www.avanturist.org/forum/index.php
// @include  http://www.avanturist.org/forum/index.php/board*
// @include  http://www.avanturist.org/forum/index.php/topic*
// version 0.22
// ==/UserScript==


// begin 
var avanturistAnchors = new Array(); // в одномерном массиве пары - номерТопика, позицияВНём,......
var isFF = /firefox/.test(navigator.userAgent.toLowerCase());
avanturist_doAction();
// end

function avanturist_doAction(){ // main entry 
  avanturist_loadAllAnchors(); // загрузить позиции по всем темам
  if (document.location.toString().match("topic")) 
	  { avanturist_saveTopicPosition(); } // это заход в тему - запомнить позицию
 else  { avanturist_markIndex(); } // это заход в оглавление - проставить ссылки
} // конец

function avanturist_markIndex(){ // просмотр оглавления форума --> разметить его
var  allTopLinx = $x("//span"); //get all topix linx
for (i=0;i<allTopLinx.snapshotLength;i++)
{	var currTop = allTopLinx.snapshotItem(i);
	// названия тем имеют id=="msg_**"
	if (currTop.id.match('msg_')) {
		var topicLink= $xFirst('.//a',currTop); // первая ссылка с названием темы
		var topicAdress=avanturist_getTopOff_fromLink(topicLink.href);
		var topicNom=topicAdress[0];  // номер топика
		if (topicNom&&topicNom!=''){
			var storedPosition = avanturist_getAnchor(topicNom); // ==0 если не сохранено ранее
			// меняем ссылку на сохранённую позицию
			topicLink.href = "http://www.avanturist.org/forum/index.php/topic,"+topicNom+"."+storedPosition+".html";
			}
		}
} //for
} //end function avanturist_markIndex()

function avanturist_saveTopicPosition(){ // просмотр темы --> сохранить номер последней просмотренной стр.
	var topicAdress = avanturist_getPageAdress(); // получить # топика и смещение
	var topic=topicAdress[0], topicNewPos=topicAdress[1];
	var topicOldPos = avanturist_getAnchor(topic); // сохранённое предыдущее смещение для этого топика
//	alert ('topic # '+topic+'  curren position = '+topicNewPos+'  stored ='+topicOldPos);
	if (topicOldPos<topicNewPos)  // если продвинулись по топику
		{	avanturist_loadAllAnchors(); // на всякий случай, если что-то обновилось в соседнем окне
			avanturist_setAnchor(topic,topicNewPos);
			avanturist_saveAllAnchors();}
} //end function avanturist_saveTopicPosition()

function avanturist_getPageAdress(){ //найти #топика и смещение для текущей страницы
var adress = new Array(0,0); 
// такие сложности, т.к. бывают ссылки без смещения - /topic,31.msg106728.html#msg106728
// которые просто перебрасывают на конец топика, 
// тогда получить смещение из адресной строки невозможно
// получаем смещение из навигационной строки через Ж, т.е. соседние страницы
	var navigationString=$xFirst("//td[@class='middletext']");
	if  (navigationString.childNodes.length==3) 	{return (adress);} 	// всего 1 страница в теме - не запоминать
	for (i=1;i<navigationString.childNodes.length;i++)
	{ if (navigationString.childNodes[i].textContent.match(']'))
			{ 	 if (navigationString.childNodes[i-1].textContent=='1') // если  - это первая страница темы
					{ 	return (adress);	 // не обрабатываю этот случай
					}
				// беру адрес предыдущей страницы  + 20 к смещению
				var pageLink= navigationString.childNodes[i-3];
				adress=avanturist_getTopOff_fromLink(pageLink.href);
				adress[0]=parseInt(adress[0]); adress[1]=parseInt(adress[1])+20; 
				return (adress);
			}
	}
return (adress); // (0,0) 
} // end function avanturist_getPageAdress()

function avanturist_getTopOff_fromLink(linkURL){ // выделить номер топика и оффсет из ссылки
 if (linkURL.match('topic=')) { 
			var lastPart = linkURL.substring(linkURL.indexOf('topic=')+6); 
			var adres=lastPart.split('.'); 
			// alert ('Strange url '+ lastPart + ' result: '+adres);
			}
	else {var splitURL = linkURL.split('/');
			var lastPart=splitURL[splitURL.length-1];
			var adres=lastPart.substring(6,lastPart.length-4).split('.'); 
			}
return (adres); 
}

function avanturist_getAnchor(topicId){ // получить позицию по номеру топика (из массива)
 for (var i=0;i<avanturistAnchors.length; i+=2)
	{ if (avanturistAnchors[i]==topicId) { return avanturistAnchors[i+1];}
	}
 return  0; // не найдено
}

function avanturist_setAnchor(topicId, position){ // установить позицию по номеру топика (в массиве)
 for (var i=0; i<avanturistAnchors.length; i+=2)
	{ 	if (avanturistAnchors[i]==topicId) 	// топик уже в массиве
		{ avanturistAnchors[i+1]=position; return }
	}
 //такого # топика нет в массиве - добавляем новую пару
 avanturistAnchors[i]=topicId;
 avanturistAnchors[i+1]=position;
}

function avanturist_loadAllAnchors(){ // загрузить позиции по всем темам (сохранённые ранее)
	if (isFF) 	{	avanturistAnchors = GM_getValue('avanturistAnchors','0,0').split(','); }
	else 			{	var data = readCookie("avanturistAnchors");  
						if (data==null) {data = '0,0';} else {data = unescape(data);}
						avanturistAnchors = data.split('##');
					}
}

function avanturist_saveAllAnchors(){ // сохранить позиции по всем темам (постоянно)
	if (isFF)	{	GM_setValue('avanturistAnchors',avanturistAnchors.join(','));}
	else 			{	createCookie("avanturistAnchors",escape(avanturistAnchors.join('##')),30); // хранить 30 дней
					}
}

// cookies support
function createCookie(name,value,days) {
	if (days) {		var date = new Date();
						date.setTime(date.getTime()+(days*24*60*60*1000));
						var expires = "; expires="+date.toGMTString();
					}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
// ------------------ 'macros' ------------------
function $(id) {return document.getElementById(id);}
function $x(xpath, contextNode, resultType) {
	contextNode = contextNode || document.body;
	resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, contextNode, null, resultType, null); }
function $xFirst(xpath, contextNode) {
	var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return xpr.singleNodeValue; }