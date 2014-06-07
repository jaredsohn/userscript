// ==UserScript==
// @name           receiver
// @description    02-ch.ru extender
// @encoding       utf-8
// @author         Anonymous
// @version        0.1.0.6 beta 4

// @include        http://*.02-ch.ru/*
// @include        http://02-ch.ru/*

// @include        http://*.2-ch.ru/*
// @include        http://2-ch.ru/*

// @include        http://o9k.ru/*
// @include        http://*.o9k.ru/*

// @include        http://*.xynta.ch/*
// @include        http://xynta.ch/*

// ==/UserScript==

var receiverObject = new Object;
receiverObject.config = new Object;

/* == CONFIG ======================================================== */
// Брать настройки из cookies
receiverObject.config.cookieConfig = true;

// Бамплимит. 0 если неизвестно, или бамплимита нет
receiverObject.config.bumplimit = 500;

// Заполнять панель навигации
receiverObject.config.showLinkNavigation = true;

// Включить домашнюю страницу в панель навигации
receiverObject.config.showLinkNavigationHomeLink = false;

// Показывать панель навигации на всех страницах, а не только в борде и тредах
receiverObject.config.showLinkNavigationGlobalLinks = false;

// Увеличивать изображение при щелчке на него (Shift-щелчок - открыть в новом окне)
receiverObject.config.expandImageHijack = true;

// Переводить фокус на поле для ввода при обновлении капчи
receiverObject.config.captchaFocus = true;

// Вставлять иконку для просмотра ссылок на текущий пост
receiverObject.config.insertBacklinks = true;

// Вставлять иконку на всех страницах, а не только в треде
receiverObject.config.insertBacklinksGlobal = true;

// Уведомлять о количестве постов
receiverObject.config.showPostCount = true;

// В том числе, о количестве картинок
receiverObject.config.showPostCountImages = true;

// Координаты окна настроек
receiverObject.config.configWndTop = 250;
receiverObject.config.configWndLeft = 10;

/* == END OF CONFIG ================================================= */

receiverObject.internal = new Object;

receiverObject.internal.version = "0.1.0.6 beta 4";
receiverObject.internal.updateLink = "http://userscripts.org/scripts/show/49798";

receiverObject.internal.error = function(str){
	// opera.postError("Receiver.js:\r\n" + str)
	alert("Receiver.js:\r\n" + str)
};

if (receiverObject.config.cookieConfig){
	receiverObject.configScheme = new Object;
	receiverObject.configScheme.bumplimit = {type: "int", bits: 11};
	receiverObject.configScheme.showLinkNavigation = {type: 'bool'};
	receiverObject.configScheme.showLinkNavigationHomeLink = {type: 'bool'};
	receiverObject.configScheme.showLinkNavigationGlobalLinks = {type: 'bool'};
	receiverObject.configScheme.expandImageHijack = {type: 'bool'};
	receiverObject.configScheme.captchaFocus = {type: 'bool'};
	receiverObject.configScheme.insertBacklinks = {type: 'bool'};
	receiverObject.configScheme.insertBacklinksGlobal = {type: 'bool', requires: 'insertBacklinks'};
	receiverObject.configScheme.showPostCount = {type: "bool", requires: 'bumplimit'};
	receiverObject.configScheme.configWndLeft = {type: "int", bits: 11};
	receiverObject.configScheme.configWndTop = {type: "int", bits: 11};
	receiverObject.configScheme.showPostCountImages = {type: "bool", requires: 'showPostCount'};

	receiverObject.internal.readConfig = function(){
		var readConfig = new Object();
		var cookieValue = /rcvCfg\s*=\s*([^;]*)(;|\s*$)/.exec(document.cookie);
		if (!cookieValue || !cookieValue[1]) return readConfig;
		var cookieString = cookieValue[1];
		var bitCode = new Array();
		var octet = 0;
		var ascii = 0;
		for (var i=0; i<cookieString.length; i++){
			ascii = cookieString.charCodeAt(i);
			if (ascii > 47 && ascii < 56){
				octet = ascii - 48;
			} else if (ascii > 64 && ascii < 91) {
				octet = ascii - 55;
			} else if (ascii > 96 && ascii < 123) {
				octet = ascii - 61;
			} else if (ascii == 45) {
				octet = 62;
			} else if (ascii == 95) {
				octet = 63;
			} else {
				continue;
			};
			for (var j = 0; j<6; j++){
				bitCode.push(octet%2);
				octet = parseInt(octet * .5);
			}
		};
		for (var i in receiverObject.configScheme){
			switch (receiverObject.configScheme[i].type){
				case "bool":
					if (bitCode.length < 1) return false;
					readConfig[i] = bitCode.shift();
				break;
				case "int":
					var bits = receiverObject.configScheme[i].bits;
					if (bitCode.length < bits) return false;
					var integerValue = 0;
					var binaryBase = 1;
					for (var j=0; j<bits; j++){
						integerValue += bitCode.shift() * binaryBase;
						binaryBase *= 2;
					};
					readConfig[i] = integerValue;
				break;
			}
		};
		
		return readConfig;
	};

	receiverObject.internal.writeConfig = function(configArray){
		if (typeof(configArray) !== "object") return false;
		var bitCode = new Array();
		for (var i in receiverObject.configScheme){
			switch (receiverObject.configScheme[i].type){
				case "bool":
					bitCode.push(configArray[i]?1:0);
				break;
				case "int":
					var bits = receiverObject.configScheme[i].bits;
					var integerValue = parseInt(configArray[i]);
					if (integerValue >= Math.pow(2, bits)){
						integerValue = Math.pow(2, bits) - 1;
					};
					var bitString = integerValue.toString(2);
					for (var i=0; i<bits; i++){
						if (i < bitString.length){
							bitCode.push(parseInt(bitString.charAt(bitString.length - 1 - i)));
						} else {
							bitCode.push(0);
						}
					}
				break;
			};
		};
		var cookieString = "";
		while (bitCode.length){
			var octet = 0;
			var ascii = "";
			var base = 1;
			for (var i=0; i<6; i++){
				if (bitCode.length){
					octet += (bitCode.shift()?1:0) * base;
					base *= 2;
				};
			};
			if (octet < 10){
				ascii = octet + 48;
			} else if (octet < 36) {
				ascii = octet + 55;
			} else if (octet < 62) {
				ascii = octet + 61;
			} else if (octet == 62) {
				ascii = 45;
			} else if (octet == 63) {
				ascii = 95;
			} else {
				continue;
			};
			cookieString += String.fromCharCode(ascii);
		};
		document.cookie = "rcvCfg=" + cookieString + "; expires=Tue, 19-Jan-2038 03:14:07 GMT; path=/";
	};

	receiverObject.internal.loadConfig = function(){
		var cookieConf = receiverObject.internal.readConfig();
		if (!cookieConf){
			receiverObject.internal.error("\u041a\u043e\u043d\u0444\u0438\u0433 \u0432 cookies \u043f\u043e\u0432\u0440\u0435\u0436\u0434\u0435\u043d");
			return false;
		};
		for (var i in cookieConf){
			receiverObject.config[i] = cookieConf[i];
		};
		return true;
	}

	receiverObject.internal.loadConfig();
};	

receiverObject.internal.drawConfigWnd = function(){
	var pageType = receiverObject.boardData.pageType();
	if (pageType != "board" && pageType != "thread") return false;
	receiverObject.insertCSS();
	var configWnd = receiverObject.internal.configWnd = document.createElement("form");
	configWnd.id = "rcv-config-wnd";
	configWnd.style.left = receiverObject.config.configWndLeft + "px";
	configWnd.style.top = receiverObject.config.configWndTop + "px";
	var caption = document.createElement("div");
	caption.id = "rcv-config-wnd-caption";
	caption.innerHTML = "Receiver";
	configWnd.appendChild(caption);
	document.body.appendChild(configWnd);
};

receiverObject.internal.drawConfigWndContents = function(){
	var configWnd = receiverObject.internal.configWnd;
	if (configWnd.content){
		configWnd.content.style.display = (configWnd.content.style.display == "none")?"block":"none";
		return true;
	};
	receiverObject.configTree = {
		'\u041d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f': {
			'\u041f\u0430\u043d\u0435\u043b\u044c \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438': {
				'\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0430\u043d\u0435\u043b\u044c \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438': {config: 'showLinkNavigation'},
				'\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0432 \u0442\u0440\u0435\u0434\u0435 \u0438\u043b\u0438 \u0441\u043f\u0438\u0441\u043a\u0435 \u0442\u0440\u0435\u0434\u043e\u0432': {config: 'showLinkNavigationGlobalLinks', requires: 'showLinksNavigation'},
				'\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e': {config: 'showLinkNavigationHomeLink', requires: 'showLinksNavigation'}
			}
		},
		'\u0418\u043c\u0438\u0434\u0436\u0431\u043e\u0440\u0434': {
			'\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f': {
				'\u0420\u0430\u0441\u0448\u0438\u0440\u044f\u0442\u044c \u0449\u0435\u043b\u0447\u043a\u043e\u043c': {config: 'expandImageHijack'}
			},
			'\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u043e\u0441\u0442\u043e\u0432': {
				'\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u043e\u0441\u0442\u043e\u0432': {config: 'showPostCount'},
				'\u0412 \u0442\u043e\u043c \u0447\u0438\u0441\u043b\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439': {config: 'showPostCountImages'},
				'\u0411\u0430\u043c\u043f\u043b\u0438\u043c\u0438\u0442': {config: 'bumplimit'}
			},
			'\u041e\u0431\u0440\u0430\u0442\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438': {
				'\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043e\u0431\u0440\u0430\u0442\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438': {config: 'insertBacklinks'},
				'\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0432 \u0441\u043f\u0438\u0441\u043a\u0435 \u0442\u0440\u0435\u0434\u043e\u0432': {config: 'insertBacklinksGlobal', requires: 'insertBacklinks'}
			}
		},
		'\u0424\u043e\u0440\u043c\u0430': {
			'\u041a\u0430\u043f\u0447\u0430': {
				'\u041a\u0443\u0440\u0441\u043e\u0440 \u0432 \u043f\u043e\u043b\u0435 \u0432\u0432\u043e\u0434\u0430 \u043f\u043e\u0441\u043b\u0435 \u0449\u0435\u043b\u0447\u043a\u0430 \u043f\u043e \u043a\u0430\u043f\u0447\u0435': {config: 'captchaFocus'}
			}
		}
	};
	var configWndContent = receiverObject.internal.configWnd.content = document.createElement("div");
	configWnd.appendChild(configWndContent);
	var tabs = document.createElement("ul");
	tabs.id = "rcv-config-wnd-tabs";
	configWndContent.appendChild(tabs);
	var firstTabLabel = false;
	for (var i in receiverObject.configTree){
		var tabLabel = document.createElement("li");
		tabLabel.innerHTML = i;
		var tabBlock = document.createElement("div");
		tabBlock.className = "rcv-config-wnd-tab";
		tabLabel.relatedTabBlock = tabBlock;
		if (!firstTabLabel){
			firstTabLabel = tabLabel;
		};
		
		for (var j in receiverObject.configTree[i]){
			var tabGroup = document.createElement("fieldset");
			var tabGroupLegend = document.createElement("legend");
			tabGroupLegend.innerHTML = j;
			tabGroup.appendChild(tabGroupLegend);
			tabBlock.appendChild(tabGroup);
				
			for (var k in receiverObject.configTree[i][j]){
				var label = document.createElement("label");
				var configName = receiverObject.configTree[i][j][k].config;
				label.innerHTML = k;
				var input = document.createElement("input");
				input.name = configName;
				switch (receiverObject.configScheme[configName].type){
					case 'bool':
						input.type = "checkbox";
						input.checked = receiverObject.config[configName];
						input.addEventListener('click', receiverObject.internal.configWndActiveInput, false);
					break;
					case 'int':
						input.type = "number";
						input.min = 0;
						input.max = Math.pow(2, receiverObject.configScheme[configName].bits) - 1;
						input.value = receiverObject.config[configName]?receiverObject.config[configName]:"";
						input.addEventListener('blur', receiverObject.internal.configWndActiveInput, false);
					break;
					default:
						input.type = "text";
						input.value = receiverObject.config[configName]?receiverObject.config[configName]:"";
						input.addEventListener('blur', receiverObject.internal.configWndActiveInput, false);
				};
				label.appendChild(input);
				tabGroup.appendChild(label);


			};
		};
		
		tabs.appendChild(tabLabel);
		configWndContent.appendChild(tabBlock);
	};
	receiverObject.internal.configWndActivateTab(firstTabLabel);
};

receiverObject.internal.configWndActivateTab = function(tab){
	if (typeof(tab) != "object") return false;
	var tabs = tab.parentNode.childNodes;
	for (var i=0; i< tabs.length; i++){
		if(tabs[i] == tab){
			tabs[i].className = "rcv-config-wnd-active";
			tab.relatedTabBlock.style.display = "block";
		} else {
			tabs[i].className = "";
			tabs[i].relatedTabBlock.style.display = "none";
		};
	};
};

receiverObject.internal.configWndDragStart = function(e){
	if (!receiverObject.internal.configWnd) return false;
	configWnd = receiverObject.internal.configWnd;
	configWnd.drag = new Object();
	configWnd.drag.x = e.pageX;
	configWnd.drag.y = e.pageY;
	configWnd.drag.left = e.pageX - parseInt(configWnd.style.left);
	configWnd.drag.top = e.pageY - parseInt(configWnd.style.top);
	configWnd.drag.cursor = document.body.style.cursor;
	e.preventDefault();
	e.stopPropagation();
}

receiverObject.internal.configWndDrag = function(e){
	if (!receiverObject.internal.configWnd || !receiverObject.internal.configWnd.drag) return false;
	configWnd = receiverObject.internal.configWnd;
	configWnd.style.left = Math.max(e.pageX - configWnd.drag.left, 0) + "px";
	configWnd.style.top = Math.max(e.pageY - configWnd.drag.top, 0) + "px";
}

receiverObject.internal.configWndDragEnd = function(e){
	if (!receiverObject.internal.configWnd || !receiverObject.internal.configWnd.drag) return false;
	if (configWnd.drag.x == e.pageX && configWnd.drag.y == e.pageY){
		receiverObject.internal.drawConfigWndContents();
	} else {;
		if (receiverObject.internal.writeConfig){
			receiverObject.config.configWndLeft = parseInt(receiverObject.internal.configWnd.style.left);
			receiverObject.config.configWndTop = parseInt(receiverObject.internal.configWnd.style.top);
			receiverObject.internal.writeConfig(receiverObject.config);
		};
	};
	delete receiverObject.internal.configWnd.drag;
}

receiverObject.internal.configWndActiveInput = function(){
	if(!this.name && !receiverObject.configScheme[this.name]) return false;
	var value = 0;
	switch (this.type){
		case "checkbox":
			value = this.checked?1:0;
		break;
		default:
			value = this.value;
		break;
	};
	switch (receiverObject.configScheme[this.name].type){
		case "int":
			value = parseInt(value);
			if (isNaN(value)) {value = 0};
			value = Math.max(0, Math.min(value, Math.pow(2, receiverObject.configScheme[this.name].bits) - 1));
		break;
	};
	receiverObject.config[this.name] = value;
	this.value = value;
	receiverObject.internal.writeConfig(receiverObject.config);
}

receiverObject.cache = new Object;
receiverObject.state = new Object;
receiverObject.boardData = new Object;

receiverObject.boardData.pageType = function(){
	if (typeof(receiverObject.cache.pageType) != "undefined"){
		return receiverObject.cache.pageType;
	};
	if(/^\/[^\/\.]+\/src\/.*/.test(location.pathname)){
		receiverObject.cache.pageType = "image";
		return "image";
	}
	if(/^\/[^\/\.]+\/res\/.*/.test(location.pathname)){
		receiverObject.cache.pageType = "thread";
		return "thread";
	};
	if(/^\/[^\/\.]+(\/(\d+\.html.*)?)?$/.test(location.pathname)){
		receiverObject.cache.pageType = "board";
		return "board";
	};
	receiverObject.cache.pageType = false;
	return false;
}

receiverObject.boardData.boardName = function(){
	if (typeof(receiverObject.cache.boardName) != "undefined"){
		return receiverObject.cache.boardName;
	};
	var boardName = location.pathname.replace(/\/([^\/]+).*/, "$1");
	receiverObject.cache.boardName = boardName;
	return boardName;
}

receiverObject.boardData.threadName = function(){
	if (typeof(receiverObject.cache.threadName) != "undefined"){
		return receiverObject.cache.threadName;
	};
	var threadName = 0;
	if (/^\/[^\/]+\/res\/([\d\+-]+).html.*/.test(location.pathname)){
		threadName = parseInt(location.pathname.replace(/^\/[^\/]+\/res\/([\d\+-]+).html.*/, "$1"));
	};
	receiverObject.cache.threadName = threadName;
	return threadName;
}

receiverObject.boardData.currentPage = function(){
	if (typeof(receiverObject.cache.currentPage) != "undefined"){
		return receiverObject.cache.currentPage;
	};
	var currentPage = 0;
	if (/^\/?[^\/]+\/(\d+)\.html$/.test(location.pathname)){
		currentPage = parseInt(location.pathname.replace(/^\/?[^\/]+\/(\d+)\.html$/, "$1"));
	};
	receiverObject.cache.currentPage = currentPage;
	return currentPage;
}

receiverObject.boardData.pagesAmount = function(){
	if (typeof(receiverObject.cache.pagesAmount) != "undefined"){
		return receiverObject.cache.pagesAmount;
	};
	var a = document.getElementsByTagName("a");
	var lastPage = 0;
	var page = 0;
	for (var i in a){
		if (typeof(a[i]) == "undefined" || !a[i].pathname || !(/^\/?[^\/]+\/(\d+)\.html$/.test(a[i].pathname))) continue;
		page = parseInt(a[i].pathname.replace(/^\/?[^\/]+\/(\d+)\.html$/, "$1"));
		if (page > lastPage){
			lastPage = page;
		}
	};
	var curPage = receiverObject.boardData.currentPage();
	if (curPage > lastPage){
		lastPage = curPage;
	}
	pagesAmount = lastPage + 1;
	receiverObject.cache.pagesAmount = pagesAmount;
	return pagesAmount;
}

receiverObject.boardData.postAnchors = function(){
	if (typeof(receiverObject.cache.postAnchors) != "undefined"){
		return receiverObject.cache.postAnchors;
	};

	var postAnchors = new Array();
	var delform = document.getElementById("delform");
	if (!delform) return returnArray;
	varRegExpTest = false;	
	var anchors = delform.getElementsByTagName("a");
	for (var i in anchors){
		if(typeof(anchors[i]) == "undefined" || !(regExpTest = /^(\d+)$/.exec(anchors[i].name))) continue;
		postAnchors[regExpTest[1]] = anchors[i];
	}
	receiverObject.cache.postAnchors = postAnchors;
	return postAnchors;
};

receiverObject.boardData.discussionMap = function(){
	if (typeof(receiverObject.cache.discussionMap) != "undefined"){
		return receiverObject.cache.discussionMap;
	};
	var delform = document.getElementById("delform");
	if (!delform) return false;
	
	var discussionMap = new Object();
	discussionMap.to = new Array();
	discussionMap.from = new Array();
	
	var regExpTestT = false;
	var postTo = false;
	var regExpTestF = false;
	var postFrom = false;
	
	var anchors = receiverObject.boardData.postAnchors();
	for (var i in anchors){
		if(typeof(anchors[i]) != "object") continue;
		postFrom = i;
		var blockquotes = anchors[i].parentNode.getElementsByTagName("blockquote");
		if (!blockquotes.length) continue;
		var innerAnchors = blockquotes[0].getElementsByTagName("a");
		for (var j in innerAnchors){
			if(typeof(innerAnchors[j]) == "undefined" || !(regExpTestT = /^#?(\d+)$/.exec(innerAnchors[j].hash))) continue;
			postTo = regExpTestT[1];
			
			if (postFrom == postTo) continue;
			
			if (typeof(discussionMap.to[postTo]) == "undefined"){
				discussionMap.to[postTo] = new Array();
			};
			discussionMap.to[postTo].push(postFrom);
		
			if (typeof(discussionMap.from[postFrom]) == "undefined"){
				discussionMap.from[postFrom] = new Array();
			};
			discussionMap.from[postFrom].push(postTo);
		}
	};
	receiverObject.cache.discussionMap = discussionMap;
	return discussionMap;
}


receiverObject.doLinkNaviagation = function(){
	var head = document.getElementsByTagName("head")[0];
	var pageType = receiverObject.boardData.pageType();
	
	if(receiverObject.config.showLinkNavigationHomeLink && (receiverObject.config.showLinkNavigationGlobalLinks || (pageType && pageType != "image"))){
		var link = document.createElement("link");
		link.rel = "home";
		link.href = "/";
		head.appendChild(link);
	};
	
	if (pageType && (receiverObject.config.showLinkNavigationGlobalLinks || pageType != "image")){
		var link = document.createElement("link");
		link.rel = "index";
		link.href = "/" + receiverObject.boardData.boardName() + "/";
		head.appendChild(link);
	}
		
	switch (pageType){
		case "board":
			var boardName = receiverObject.boardData.boardName();
			var curPage = receiverObject.boardData.currentPage();
			var pagesAmount = receiverObject.boardData.pagesAmount();
			
			if (curPage > 0){
				var link = document.createElement("link");
				link.rel = "first";
				link.href = "/" + boardName + "/";
				head.appendChild(link);
				var link = document.createElement("link");
				link.rel = "previous";
				link.href = "/" + boardName + "/" + ((curPage == 1)? "" : (curPage - 1) + ".html");
				head.appendChild(link);
			};
			if (curPage < pagesAmount - 1){
				var link = document.createElement("link");
				link.rel = "next";
				link.href = "/" + boardName + "/" + (curPage + 1) + ".html";
				head.appendChild(link);
			};
			if (pagesAmount > 1 && curPage < pagesAmount - 1){
				var link = document.createElement("link");
				link.rel = "last";
				link.href = "/" + boardName + "/" + (pagesAmount - 1) + ".html";
				head.appendChild(link);
			};
			
			if(receiverObject.config.showLinkNavigationHomeLink){
				var link = document.createElement("link");
				link.rel = "up";
				link.href = "/";
				head.appendChild(link);
			}
		break;
		
		case "thread":
			var link = document.createElement("link");
			link.rel = "up";
			link.href = "/" + receiverObject.boardData.boardName() + "/";
			head.appendChild(link);
		break;
	};
}

receiverObject.expandImageHijack = function(trigger){
	var a = trigger;
	while (a.tagName.toLowerCase() != "a"){
		a = a.parentNode;
		if (a == document.body) return false;
	};
	
	var anchors = document.getElementsByTagName("a");
	for (var i in anchors){
		if (typeof(anchors[i]) == "undefined" || !anchors[i].pathname || !anchors[i].onclick || anchors[i].pathname != a.pathname) continue;
		anchors[i].onclick();
		return true;
	}
	return false;
}

receiverObject.captchaFocus = function(trigger){
	var form = trigger;
	while (form.tagName.toLowerCase() != "form"){
		form = form.parentNode;
		if (form == document.body) return false;
	};
	var captchaField = false;
	if (form.captcha){
		captchaField = form.captcha;
	} else {
		for (var i in form.elements){
			if(typeof(form.elements[i]) == "undefined") continue;
			if(/^captcha/.test(form.elements[i].name) || /^captcha/.test(form.elements[i].id)){
				captchaField = form.elements[i];
			}
		};
	};
	if (!captchaField) return false;
	captchaField.focus();
	captchaField.select();
	return true;
};

receiverObject.insertCSS = function(){
	if (receiverObject.cache.insertCSS) return false;
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = '\
.extrabtns {\
	line-height: 16px; \
}\
.extrabtns a {\
	display: inline-block;\
	vertical-align: text-top;\
}\
a.rcv-backlinks{\
	display: inline-block;\
	text-decoration: none;\
	background: url(data:image/gif;base64,R0lGODlhIAAQAJECAKuopv///////wAAACH5BAEAAAIALAAAAAAgABAAQAIpFI6py2cNUZiSRjhD1bf7D4ZMtokKeaDmyrauqKpubLE0t97v9+yJUAAAOw==) 0px 0px no-repeat;\
}\
.rcv-backlinks-rel {\
	display: block;\
}\
.rcv-backlinks-counter {\
	display: block;\
	text-align: center;\
	color: white;\
	width: 18px;\
	height: 14px;\
	padding: 1px 14px 1px 0px;\
	font-size: 11px;\
	line-height: 14px;\
	font-weight: bold;\
}\
.rcv-backlinks-menu {\
	border: solid #ABA8A6 1px;\
	position: absolute;\
	line-height: normal;\
	margin: -1px 0px 0px 0px;\
	background: white;\
	padding: 5px;\
	z-index: 10;\
}\
.rcv-backlinks-menu a {\
	display: block;\
}\
#rcv-config-wnd {\
	position: absolute;\
	margin: 0px;\
	padding: 0px;\
	background: #EEEEEE;\
	border: solid #CCCCCC 1px;\
	color: black;\
}\
#rcv-config-wnd,\
#rcv-config-wnd * {\
	font: normal normal normal 16px/20px "Trebuchet MS", Trebuchet\
}\
#rcv-config-wnd-caption {\
	background: #DDDDDD;\
	border: solid #DDDDDD 1px;\
	padding: 1px 4px;\
	color: #000000;\
}\
#rcv-config-wnd-caption:hover {\
	border-style: outset;\
}\
ul#rcv-config-wnd-tabs {\
	margin: 3px 0px 0px 0px;\
	padding: 0px;\
}\
ul#rcv-config-wnd-tabs li {\
	display: block;\
	z-index: 0;\
	position: relative;\
	top: 3px;\
	float: left;\
	padding: 0px 10px 1px 10px;\
	margin: 0px -2px 0px 4px;\
	list-style: none outside;\
	background: #FFFFFF;\
	border: solid #DDDDDD;\
	border-width: 1px 1px 0px 1px;\
}\
ul#rcv-config-wnd-tabs li.rcv-config-wnd-active {\
	z-index: 1;\
	top: 1px;\
	color: #FF6600;\
}\
.rcv-config-wnd-tab {\
	position: relative;\
	z-index: 0;\
	background: #FFFFFF;\
	margin: 0px 4px 4px 4px;\
	border: solid #DDDDDD 1px;\
	width: 450px;\
	max-height: 500px;\
	overflow: auto;\
	clear: both;\
}\
.rcv-config-wnd-tab fieldset {\
	margin: 4px;\
	padding: 0px 4px .5em 4px;\
	border: solid #DDDDDD 1px;\
}\
.rcv-config-wnd-tab fieldset label {\
	display: block;\
	position: relative;\
	margin: 3px 5px;\
}\
#rcv-config-wnd .rcv-config-wnd-tab fieldset label input {\
	position: absolute;\
	top: -1px;\
	right: 0px;\
	padding: 1px;\
	font-size: 14px;\
	line-height: 16px;\
}\
#rcv-config-wnd .rcv-config-wnd-tab fieldset label input[type=checkbox]{\
	top: 3px;\
}\
#rcv-config-wnd .rcv-config-wnd-tab fieldset label input[type=text],\
#rcv-config-wnd .rcv-config-wnd-tab fieldset label input[type=number] {\
	width: 100px;\
}\
';
	head.appendChild(style);
	receiverObject.cache.insertCSS = true;
	return true;
}

receiverObject.insertBacklinks = function(){
	var anchors = false;
	var anchor = false;
	var reflink = false;
	var extrabtns = false;
	
	var discussionMap = receiverObject.boardData.discussionMap();
	var to = discussionMap.to;
	
	for (i in to){
		if (typeof(to[i]) != "object") continue;
		anchors = document.getElementsByName(i);
		if (!anchors.length) continue;
		anchor = anchors[0];
		
		children = anchor.parentNode.getElementsByTagName("*");
		
		reflink = false;
		extrabtns = false;
		
		for (j in children){
			if (typeof(children[j]) == "undefined") continue;
			if (children[j].tagName && children[j].tagName.toLowerCase() == "blockquote"){
				break;
			}
			if (/(^|\s+)reflink($|\s+)/.test(children[j].className)) {
				reflink = children[j];
				continue;
			};
			if (/(^|\s+)extrabtns($|\s+)/.test(children[j].className)) {
				extrabtns = children[j];
				continue;
			};
			
		}
		
		if (!reflink && !extrabtns){
			continue;
		} else {
			if (!extrabtns){
				extrabtns = document.createElement("span");
				extrabtns.className = "extrabtns";
				reflink.parentNode.insertBefore(extrabtns, reflink.nextSibling);
			}
		}
		
		receiverObject.insertCSS();
		
		var backlinksAnchor = document.createElement("a");
		backlinksAnchor.innerHTML = '<span class="rcv-backlinks-rel"><span class="rcv-backlinks-counter">' + to[i].length + '</span></span>';
		backlinksAnchor.className = "rcv-backlinks";
		backlinksAnchor.postId = i;
		backlinksAnchor.href = "#";
		extrabtns.appendChild(backlinksAnchor);
		
	}
}

receiverObject.openBacklinksMenu = function(trigger){
	if (receiverObject.state.backlinksMenu){
		receiverObject.removeBacklinksMenu();
	}
	var discussionMap = receiverObject.boardData.discussionMap();
	if (!trigger.postId || typeof(discussionMap.to[trigger.postId]) != "object") return false;
	var backlinks = discussionMap.to[trigger.postId];
	var menu = document.createElement("span");
	menu.className = "rcv-backlinks-menu";
	
	innerspan = trigger.getElementsByTagName("span")[0];
	innerspan.appendChild(menu);
	
	for (i=0; i<backlinks.length; i++){
		menu.innerHTML += '<a href="#' + backlinks[i] + '"' + ((typeof(highlight) != "undefined")?' onclick="highlight(\'' + backlinks[i] + '\');"':'') + '>&gt;&gt;' + backlinks[i] + "</a>";
	};
	
	receiverObject.state.backlinksMenu = menu;
	return true;
}

receiverObject.removeBacklinksMenu = function(trigger){
	if (receiverObject.state.backlinksMenu){
		receiverObject.state.backlinksMenu.parentNode.removeChild(receiverObject.state.backlinksMenu);
		delete receiverObject.state.backlinksMenu;
	}
}

receiverObject.addRule = function(str, attention){
	var postform = document.getElementById("postform");
	if (!postform) return false;
	var ul = postform.getElementsByTagName("ul")[0];
	if (!ul) return false;
	var li = document.createElement("li");
	li.innerHTML = str;
	if (attention){
		li.style.color = "#CC0000";
	};
	ul.appendChild(li);
	return true;
	
}

receiverObject.showPostCount = function(){
	var anchors = receiverObject.boardData.postAnchors();
	var postCount = 0;
	for (var i in anchors){
		if (typeof(anchors[i])!="object") continue;
		postCount++;
	}
	var bumplimitExceeded = (receiverObject.config.bumplimit && postCount >= receiverObject.config.bumplimit);

	var postImagesCount = -1;
	
	if (receiverObject.config.showPostCountImages){
		var delform = document.getElementById("delform");
		if (delform){
			postImagesCount = 0;
			var images = delform.getElementsByTagName("img");
			for (var i in images){
				if (typeof(images[i]) != "object" || !(/(^|\s+)thumb(\s+|$)/.test(images[i].className))) continue;
				postImagesCount++;
			}
		};
	};
	
	// 
	receiverObject.addRule("\u0412 \u0442\u0440\u0435\u0434\u0435 " + postCount + " " + ((postCount%100<20 && postCount%100>10 || postCount%10 == 0 || postCount%10>4)?"\u043f\u043e\u0441\u0442\u043e\u0432":(postCount%10==1)?"\u043f\u043e\u0441\u0442":"\u043f\u043e\u0441\u0442\u0430") + ((postImagesCount < 0)?"":", \u0438\u0437 \u043d\u0438\u0445 " + postImagesCount + " \u0441 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f\u043c\u0438") + "." + (bumplimitExceeded?" \u0414\u043e\u0441\u0442\u0438\u0433\u043d\u0443\u0442 \u0431\u0430\u043c\u043f\u043b\u0438\u043c\u0438\u0442.":""), bumplimitExceeded);
}

receiverObject.dispatcher = new Object;

receiverObject.dispatcher.DOMContentLoaded = function(e){
	if (receiverObject.config.cookieConfig) receiverObject.internal.drawConfigWnd();
	if (receiverObject.config.insertBacklinks && (receiverObject.config.insertBacklinksGlobal || receiverObject.boardData.pageType() == "thread")) receiverObject.insertBacklinks();
	if (receiverObject.config.showLinkNavigation) receiverObject.doLinkNaviagation();
	if (receiverObject.config.showPostCount && receiverObject.boardData.pageType() == "thread") receiverObject.showPostCount();
}

receiverObject.dispatcher.click = function(e){
	var trigger = (e.srcElement||e.target);
	
	if (receiverObject.state.backlinksMenu){
		receiverObject.removeBacklinksMenu();
	};
	switch (trigger.tagName.toLowerCase()){
		case "img":
			if(receiverObject.config.expandImageHijack && !e.shiftKey && /(^|\s+)thumb(\s+|$)/.test(trigger.className)){
				if(receiverObject.expandImageHijack(trigger)){
					e.preventDefault();
					e.stopPropagation();
				};
			};
			if (receiverObject.config.captchaFocus && (trigger.id.indexOf("captcha") == 0)){
				receiverObject.captchaFocus(trigger);
			};
		break;
		case "a":
			if (receiverObject.config.insertBacklinks && /(^|\s+)rcv-backlinks(\s+|$)/.test(trigger.className)){
				if(receiverObject.openBacklinksMenu(trigger)){
					e.preventDefault();
					e.stopPropagation();
				};
			}
		break;
		case "span":
			if (receiverObject.config.insertBacklinks && /(^|\s+)(rcv-backlinks-counter)(\s+|$)/.test(trigger.className)){
				if(receiverObject.openBacklinksMenu(trigger.parentNode.parentNode)){
					e.preventDefault();
					e.stopPropagation();
				};
			}
		break;
		case "li":
			if (receiverObject.config.cookieConfig && trigger.parentNode.id == "rcv-config-wnd-tabs"){
				receiverObject.internal.configWndActivateTab(trigger);
				receiverObject.internal.configWndActivateTab(trigger);
			}
		break;
	};
}

receiverObject.dispatcher.mousedown = function(e){
	var trigger = (e.srcElement||e.target);
	switch (trigger.tagName.toLowerCase()){
		case "div":
			if (receiverObject.config.cookieConfig && trigger.id == "rcv-config-wnd-caption"){
				receiverObject.internal.configWndDragStart(e);
			}
		break;
	}
};

receiverObject.dispatcher.mouseup = function(e){
	var trigger = (e.srcElement||e.target);
	if (receiverObject.config.cookieConfig){
		receiverObject.internal.configWndDragEnd(e);
	};
};

receiverObject.dispatcher.mousemove = function(e){
	var trigger = (e.srcElement||e.target);
	if (receiverObject.config.cookieConfig){
		receiverObject.internal.configWndDrag(e);
	};
};

/* == Greasemonkey compatibility ==================================== */
if(document.body){
	window.receiverObject.dispatcher.DOMContentLoaded();
};
/* == End of Greasemonkey compatibility ============================= */

window.document.addEventListener('DOMContentLoaded', window.receiverObject.dispatcher.DOMContentLoaded, false);
window.document.addEventListener('click', window.receiverObject.dispatcher.click, false);
window.document.addEventListener('mousedown', window.receiverObject.dispatcher.mousedown, false);
window.document.addEventListener('mouseup', window.receiverObject.dispatcher.mouseup, false);
window.document.addEventListener('mousemove', window.receiverObject.dispatcher.mousemove, false);