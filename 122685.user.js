// ==UserScript==
// @name Fotomag hotkey enhancements
// @version 0.22.19
// @author gera_b
// @description Add key navigation fotomag
// @include http://fotomag.com.ua/*
// @match http://fotomag.com.ua/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// ==/UserScript==

/* НАСТРОЕЧКИ!	 */

/* глобальные настройки кнопок */ {
var goApply					= "Ctrl+Enter";					// Apply
var goWriteOneDealer		= "Enter";						// запись текущей позиции поставщика
var goWriteDealers			= "Ctrl+m";						// отметка всех позиций как обеспеченных
var setProcessing			= "Ctrl+1";						// установка статуса "обработка заказа"
//var pushToAdmin				= "Ctrl+1";						// передача заказа на Администратора
var setSupplied				= "Ctrl+2";						// установка статуса "обеспечен"
var setReconsiled			= "Ctrl+3";						// установка статуса "согласован"
var setInvoicing			= "Ctrl+5";						// установка статуса "выписка счета"  
var setOrderPayment			= "Ctrl+6";						// установка статуса "оплата заказа клиентом"
var setUnpaid				= "Ctrl+8";						// установка статуса "отменен, не пр. оплата"
var setChangeDate			= "Ctrl+9";						// установка статуса "смена ПДВЗ" 
var setCancelChange         = "Ctrl+0";                     // установка статуса "на отмену изменение" /* ----- */
var setFormed				= "Ctrl+backspace";				// установка статуса "формирование"
var openSupplierSelects		= "Ctrl+q";						// раскрытие групп поставщиков к товарам
var openLinksBinds			= "Ctrl+Shift+q";				// открытие всех связей товаров по S в новых окнах*
}

/* [value,text,заставлять установить дату, предлагать вернуть в обработку если нет даты, заставлять указать точку сбора] */ {
var orderStatuses = new Array(	["0","Обработка заказа"],							// 0
								["110","Обеспечен"],								// 1
								["111","Согласован",true,true,true],				// 2
								["5","Оплата заказа клиентом"],						// 3
								["70","Оформление кредита"],						// 4
								["10","Формирование заказа",true,true],				// 5
								["50","Товар отложен (самовывоз из магазина)"],		// 6
								["20","Доставка заказа"],							// 7
								["30","Выполнен,"],									// 8
								["41","Отменен (дубликат)"],						// 9
								["42","Отменен (нет товара на складе)"],			// 10
								["44","Отменен (Нет оплаты счета)"],			// 11
								["47","Отменен (отмена пользователем)"],			// 12
								["99","Тестовый заказ"],							// 13
                                ["115","Выписка счета"],                            // 14
                                ["5","Оплата заказа клиентом"],                     // 15
                                ["116","Смена ПДВЗ"],                               // 16
                                ["35","На отмену/изменение"]                        // 17
								);						
								
var userCodesArray = new Array (["0","-"],								// 0
								["1","Администратор"]					// 1
								);										
}

 /* http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
 //Remove the shortcut
// shortcut.remove("Ctrl+Enter");
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
					
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}								

function setStatus(statusValue){
	var StatusForm = document.getElementsByName('status');
	var AlreadySetted = false;
	var selectedValue = StatusForm[0].selectedIndex;
	var startStatus = StatusForm[0].selectedIndex;
	if(StatusForm[0].options[selectedValue].text != orderStatuses[statusValue][1]){
	for (i=0;i<StatusForm[0].options.length;i++)
		{
			if (StatusForm[0].options[i].text == orderStatuses[statusValue][1])
			{
			var StatusPosition=i;
			StatusForm[0].selectedIndex = StatusPosition;
			var AlreadySetted = true;
			break;
			}
			
		}
	}
	var sizeOfDate = document.getElementsByName('expected_date');
	var valOfDate = sizeOfDate[0].value;
	if(valOfDate.length < 1 && orderStatuses[statusValue][3] == true && orderStatuses[statusValue][2] == true)
	{
		var calButton = document.getElementById('projectcomplate_img');
		confirm("Не установлена дата! Вернуть в \"обеспечен\"?") ? setStatus(1) : function (){calButton.click;
		StatusForm[0].selectedIndex = startStatus;};
	}
	else if(orderStatuses[statusValue][4] == true && document.getElementsByName('collection_city_id')[0].selectedIndex == 0){
		alert("Сначала установи точку сбора!");
		StatusForm[0].selectedIndex = startStatus;
	}
	else if(valOfDate.length < 1 && orderStatuses[statusValue][2] == true)
		{alert("Сначала установи дату!");
		StatusForm[0].selectedIndex = startStatus;}
	else if(AlreadySetted == true)
	{document.getElementById('formUpdate').submit();}
	else
	alert("Статус " + orderStatuses[statusValue][1] + " уже установлен!");
}

function pushToUser(userValue){
orderAdminForm = document.getElementsByName('new_admin');
var check = false;
	for (i=0;i<orderAdminForm[0].options.length;i++)
	{
		if(orderAdminForm[0].options[i].value == userCodesArray[userValue][0])
		{
		userAdminPosition = i;
		orderAdminForm[0].selectedIndex = userAdminPosition;
		var check = true;
		break;
		}
	}
	if(check == true)
	{
	var SubmitBut = document.forms[0];
	SubmitBut.submit();
	}
	else
	alert(userCodesArray[userValue][1]+' '+'уже установлен!');
} 

function submitApply(){
	if (document.location.href.indexOf('provision') == -1 ){
		document.getElementById('formUpdate').submit();
	}
	else {
		document.getElementsByClassName('grid')[0].parentNode.submit();
	}
}
								
shortcut.add(goApply,function() {
	submitApply();
});

/*shortcut.add(pushToAdmin,function() {
	 pushToUser(1);
});*/

shortcut.add(setSupplied,function() {
	setStatus(1);

});

shortcut.add(setReconsiled,function() {
	setStatus(2);
});

shortcut.add(setUnpaid,function() {
	setStatus(11);
});

shortcut.add(setProcessing,function() {
	setStatus(0);
});

shortcut.add(setFormed,function() {
	setStatus(5);
});

shortcut.add(setInvoicing,function() {
	setStatus(14);
});

shortcut.add(setOrderPayment,function() {
	setStatus(15);
});

shortcut.add(setChangeDate,function() {
	setStatus(16);
});

shortcut.add(setCancelChange,function() {
	setStatus(17);
});

shortcut.add(openLinksBinds,function() {
	var sLinks = document.getElementsByClassName('infolink');
	for (i=0;i<sLinks.length;i++)
		{
			if(sLinks[i].text=="S"){
			sLinks[i].setAttribute('onclick','window.open(\''+sLinks[i].href+'\',\'_blank\')');
			sLinks[i].onclick();
			}
			// GM_log(sLinks[i].text);
		}
});

shortcut.add(openSupplierSelects,function() {
	var sLinks = document.getElementsByClassName('showSS');
	for (i=0;i<sLinks.length;i++)
		{
			sLinks[i].onclick();
		}
});

/* перемещение фокуса между полями ввода по Tab в заказе*/ {
var currentLocation = window.location.href;
if(currentLocation.indexOf('orderid') !=-1 && document.getElementsByClassName('comment').length != 0){
var switcherFlag = currentLocation.indexOf('orderid');
if(switcherFlag >= 0)
	{
	
var prodCodesObjs = document.getElementsByName('product[]');
var priceInputs = new Array();
	for(i=0;i<prodCodesObjs.length;i++){
	priceInputs.push(document.getElementsByName('price_in['+prodCodesObjs[i].value+']'))
	}	
var commentInputs = document.getElementsByClassName('comment');
var inputFields = new Array();
	for(i=0;i<commentInputs.length;i++){
	inputFields.push(priceInputs[i][0]);
	inputFields.push(commentInputs[i]);
	}

var counterField = 0;

function setUnfocused(){
	this.hasFocus = false;
}

function setFocused(){
	this.hasFocus = true;
	// inN = document.forms[0].elements;
		for (i=0; i<inputFields.length; i++){
			if (inputFields[i].hasFocus){
				counterField = i;
				return i;
			}
		}
	return false;
}

	for (i=0; i<inputFields.length; i++){
		inputFields[i].addEventListener('focus',setFocused,false);
		inputFields[i].addEventListener('blur',setUnfocused,false);
	}

shortcut.add("tab",function() {
	if(inputFields[counterField] !== document.activeElement && inputFields[counterField].disabled != true){
		inputFields[counterField].focus();	
	}
	else {
		for(noLoop=0;counterField<inputFields.length,noLoop<2;){
			if(typeof inputFields[counterField+1] == 'object') {
				if(inputFields[counterField+1].disabled != true){
					inputFields[counterField+1].focus();
					counterField++;
					break;
				}
				else{
					counterField++;
					continue;
				}
			}
			else {
				counterField = -1;
				noLoop++;
			}
		}
	}
});
shortcut.add("Shift+tab",function() {
		for(noLoop=0;counterField>-1,noLoop<2;){
			if(typeof inputFields[counterField-1] == 'object') {
				if(inputFields[counterField-1].disabled != true){
					inputFields[counterField-1].focus();
					counterField--;
					break;
				}
				else{
					counterField--;
					continue;
				}
			}
			else {
				counterField = inputFields.length;
				noLoop++;
			}
		}
});} 


/* отметка всех подписанных позиций как обеспеченных */ {
var textInputs = document.getElementsByClassName('comment');
var startingCommentArray = new Array();
		for(i=0;i<textInputs.length;i++)
		{
		startingCommentArray[i] = new Array(2);
		startingCommentArray[i][0] = textInputs[i].value.length;
		startingCommentArray[i][1] = textInputs[i].value;
		}
var prodCodesObjs = document.getElementsByName('product[]');
var priceInputs = new Array();
	for(i=0;i<prodCodesObjs.length;i++){
	priceInputs.push(document.getElementsByName('price_in['+prodCodesObjs[i].value+']'))
	}	
var startingPriceArray = new Array();
		for(i=0;i<priceInputs.length;i++){
		startingPriceArray[i] = parseFloat(priceInputs[i][0].value);
		}
var supplierInputs = new Array();
		for(i=0;i<prodCodesObjs.length;i++){
		supplierInputs.push(document.getElementsByName('supplier_id['+prodCodesObjs[i].value+']'))
		}
var startingSupplierArray = new Array();
		for(i=0;i<supplierInputs.length;i++){
		startingSupplierArray[i] = supplierInputs[i][0].value;
		}
shortcut.add(goWriteDealers,function() {
	// var BoxesForm = document.getElementsByClassName('is_provided');
	var formBoxes=Boolean(false);
	//	confirm("Записать изменения?") ? formBoxes=true  : window.location.reload(true); 
	formBoxes=true;
	
	var endingCommentArray = new Array();
	var endingPriceArray = new Array();
	var endingSupplierArray = new Array();
	var toWrite = new Array();
	var wholeOrderTable = document.getElementsByClassName('grid');
	var searchOne = wholeOrderTable[0].childNodes[7]; 
	if(formBoxes==true)
	{
		for(i=0;i<textInputs.length;i++)
		{
		endingCommentArray[i] = new Array(2);
		endingCommentArray[i][0] = textInputs[i].value.length;
		endingCommentArray[i][1] = textInputs[i].value;
		//
		endingPriceArray[i] = parseFloat(priceInputs[i][0].value);
		//
		endingSupplierArray[i] = supplierInputs[i][0].value;
		if(startingCommentArray[i][0] != endingCommentArray[i][0] || startingSupplierArray[i] != endingSupplierArray[i]  || startingPriceArray[i] != endingPriceArray[i])
			{toWrite[i] = i;
			var alEl = i*2+1;
			searchOne.childNodes[alEl].childNodes[21].style.background = '#FFEFC2';
			}
		else if(startingCommentArray[i][0] == endingCommentArray[i][0])
				{if(startingCommentArray[i][1] != endingCommentArray[i][1])
					{toWrite[i] = i;
					var alEl = i*2+1;
					searchOne.childNodes[alEl].childNodes[17].style.background = '#FFEFC2';
					}
		}
		}
		var submitRetailerBtn = document.getElementsByClassName('save_comment');	
		var delayedClick = function(button, delay) {
		setTimeout(function() { button.click(); }, delay);}
		var countInputs = 0
			do{
			
			delayedClick(submitRetailerBtn[toWrite[countInputs]], (countInputs * 350));
			countInputs++;
			}
			while(countInputs<toWrite.length)
		}
			
	
});}}
}

/* перемещение фокуса между полями ввода по Tab в обеспечении*/{

	if(currentLocation.indexOf('provision') !=-1){

		var incomingPriceInputsArr = new Array();
		var regexpInPrice = /(price_in\[)[\d]+(\])/g;
		var regexpComment = /(comment\[)[\d]+(\])/g;
		var wholeDocumentInputs = document.getElementsByTagName('input');
			for (i=0; i<wholeDocumentInputs.length; i++) {
				if (regexpInPrice.test(wholeDocumentInputs[i].name) || regexpComment.test(wholeDocumentInputs[i].name)) {
					incomingPriceInputsArr.push(wholeDocumentInputs[i]);
				}
			}
	function setUnfocused(){
	this.hasFocus = false;
}

	function setFocused(){
	this.hasFocus = true;
	// inN = document.forms[0].elements;
		for (i=0; i<incomingPriceInputsArr.length; i++){
			if (incomingPriceInputsArr[i].hasFocus){
				counterField = i;
				return i;
			}
		}
	return false;
	}
	
	for (i=0; i<incomingPriceInputsArr.length; i++){
		incomingPriceInputsArr[i].addEventListener('focus',setFocused,false);
		incomingPriceInputsArr[i].addEventListener('blur',setUnfocused,false);
	}		

	
var counterField = 0;


		
shortcut.add("tab",function() {
	if(incomingPriceInputsArr[counterField] !== document.activeElement && incomingPriceInputsArr[counterField].disabled != true){
		incomingPriceInputsArr[counterField].focus();	
	}
	else {
		for(noLoop=0;counterField<incomingPriceInputsArr.length,noLoop<2;){
			if(typeof incomingPriceInputsArr[counterField+1] == 'object') {
				if(incomingPriceInputsArr[counterField+1].disabled != true){
					incomingPriceInputsArr[counterField+1].focus();
					counterField++;
					break;
				}
				else{
					counterField++;
					continue;
				}
			}
			else {
				counterField = -1;
				noLoop++;
			}
		}
	}
});
shortcut.add("Shift+tab",function() {
		for(noLoop=0;counterField>-1,noLoop<2;){
			if(typeof incomingPriceInputsArr[counterField-1] == 'object') {
				if(incomingPriceInputsArr[counterField-1].disabled != true){
					incomingPriceInputsArr[counterField-1].focus();
					counterField--;
					break;
				}
				else{
					counterField--;
					continue;
				}
			}
			else {
				counterField = incomingPriceInputsArr.length;
				noLoop++;
			}
		}
});
}	}

shortcut.add(goWriteOneDealer,function() {
	if(currentLocation.indexOf('provision') == -1){
		var submitRetailerBtn = document.getElementsByClassName('save_comment');	
		submitRetailerBtn[Math.round((counterField-0.5)/2)].click();
	}
	else{
	var chkbxs = document.getElementsByName('id[]');
	
		if (chkbxs[Math.round((counterField-0.5)/2)].checked == false) {
			chkbxs[Math.round((counterField-0.5)/2)].checked = true;
		}
		else {
			chkbxs[Math.round((counterField-0.5)/2)].checked = false;
		}
		
	}
});