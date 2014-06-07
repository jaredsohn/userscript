// ==UserScript==
// @name		phpBB3 forum tools
// @namespace		phpbb3tools
// @source		http://userscripts.org/scripts/show/90016
// @identifier		http://userscripts.org/scripts/source/90016.user.js
// @description		Extra options for phpBB 3.x forums (english)
// @version		0.1
// @date		2010-11-08
// @author		user9999
// @email		user9999@gmail.com
// @include		http://*
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


(function () {
	
	var dom = new DOMUtils();
	var body = dom.tag("body")[0];
	var BXT_open = true;
	
	//check for phpBB forum page
	var isPhpbbPage = dom.xo("//meta[contains(@content,'phpBB')]");
	if (!isPhpbbPage.snapshotLength > 0) return;
	
	//signaturesAreHidden
	var signaturesAreHidden = GM_getValue('signaturesAreHidden');
	if (signaturesAreHidden == undefined) {
		var signaturesAreHidden = false; //default value
		GM_setValue('signaturesAreHidden', signaturesAreHidden);
	} else if (signaturesAreHidden == true) {
		hideSignaturesFunction(true);
	}
	//stripPageTitle
	var stripPageTitle = GM_getValue('stripPageTitle');
	if (stripPageTitle == undefined) {
		var stripPageTitle = false; //default value
		GM_setValue('stripPageTitle', stripPageTitle);
	} else if (stripPageTitle == true) {
		stripPageTitleFunction(true);
	}
	//quickSearch
	var quickSearch = GM_getValue('quickSearch');
	if (quickSearch == undefined) {
		var quickSearch = false; //default value
		GM_setValue('quickSearch', quickSearch);
	} else if (quickSearch == true) {
		quickSearchFunction(true);
	}
	//compactForum
	var compactForum = GM_getValue('compactForum');
	if (compactForum == undefined) {
		var compactForum = false; //default value
		GM_setValue('compactForum', compactForum);
	} else if (compactForum == true) {
		compactForumFunction(true);
	}
	//filterMyMessages
	var filterMyMessages = GM_getValue('filterMyMessages');
	if (filterMyMessages == undefined) {
		var filterMyMessages = false; //default value
		GM_setValue('filterMyMessages', filterMyMessages);
	} else if (filterMyMessages == true) {
		filterMyMessagesFunction(true);
	}
	//whoIsOnline
	var whoIsOnline = GM_getValue('whoIsOnline');
	if (whoIsOnline == undefined) {
		var whoIsOnline = false; //default value
		GM_setValue('whoIsOnline', whoIsOnline);
	} else if (whoIsOnline == true) {
		whoIsOnlineFunction(true);
	}
	
	
	/***** UI *****/
	
	//bottone opzioni extra
	var newA = dom.cn("a");
	newA.style.href = '#';
	newA.style.cursor = 'pointer';
	newA.innerHTML = "Extra";
	newA.title = "Extra options";
	newA.style.color = 'Chocolate';
	var newLI = dom.cn("li");
	newLI.style.backgroundImage = 'url("./styles/prosilver/theme/images/icon_ucp.gif")';
	newLI.style.backgroundRepeat = 'no-repeat';
	newLI.style.backgroundPosition = '0 50%';
	newLI.style.padding = '1px 0 0 17px';
	newLI.setAttribute("id", "buttonMenuConfig");
	newLI.appendChild(newA);
	var extraOpz = dom.xs('//li[@class="icon-faq"]');
	extraOpz.parentNode.insertBefore(newLI, extraOpz);
	newA.addEventListener("click", showOptionsPanel, false);
	
	//layer trasparente
	var layerTrasparente = dom.cn("div");
	layerTrasparente.setAttribute("id", "layerTrasparente");
	layerTrasparente.style.width = "100%";
	layerTrasparente.style.height = "100%";
	layerTrasparente.style.position = "fixed";
	layerTrasparente.style.top = "0";
	layerTrasparente.style.left = "0";
	layerTrasparente.style.backgroundColor = "#000";
	layerTrasparente.style.opacity = "0.6";
	layerTrasparente.style.zIndex = "100";
	layerTrasparente.style.visibility = "hidden";
	body.appendChild(layerTrasparente);
	
	//pannello delle opzioni
	var menu = dom.cn("div");
	menu.setAttribute("id", "menu");
	menu.style.width = "400px";
	menu.style.height = "270px";
	menu.style.position = "fixed";
	menu.style.top = "35%";
	menu.style.left = "40%";
	menu.style.zIndex = "101";
	menu.style.visibility = "hidden";
	body.appendChild(menu);
	
	var menubackground = dom.cn("div");
	menubackground.setAttribute("id", "menubackground");
	menubackground.setAttribute("style", "width: 100%; height: 100%; background: #EEE; border: solid thin #C7C7C7; font-family: 'Lucida Grande','Trebuchet MS',Verdana,sans-serif; font-size: 14px; -moz-border-radius: 5px; cursor: default;");
	menu.appendChild(menubackground);
	
	var menuborder = dom.cn("div");
	menuborder.setAttribute("id", "menuborder");
	menuborder.setAttribute("style", "position: absolute; top: 0; left: 0; width: 380px; height: 250px; border: double #757575; margin: 3px; padding: 5px; -moz-border-radius: 5px; font-size:0.8em; text-align:left;");
	menubackground.appendChild(menuborder);
	
	//titolo
	var menuimg = dom.cn("img");
	menuimg.setAttribute("id", "menuimg");
	menuimg.setAttribute("style", "position: relative; top: 2px; margin-right: 2px;");
	menuimg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X/xbjBpjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7ZAF/eRe/M73/nOzXUAcEwaqVTKmUgkGqIoWoIgWP/fTYSTyaSTgAfdbhemaSIej+NcAgRudDod9Pt95PN5RKPR8wnwPG/Z1XVdB8dxin0WDofBsiyCwaA1UYBY/tdqtVAqlRCJRN6FQiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM/na5wKzq/+4ALprzqxbFUqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS+T74jR7Y5c8wDAO5XA4MwxzalklVy+PxNCiKcp4IkbbhzR4K+h9IH02wax3MiAYCgcBfv99/4TS3xxtfepcTCPyKgGl5gCevfyJb/Q3q6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N/fqbAHIEXsj1saQR+M8BCdg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pYIfA9Al+Z3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR+267GwAAAABJRU5ErkJggg==");
	menuborder.appendChild(menuimg);
	
	var menutitle = dom.cn("span", "Extra options:");
	menutitle.setAttribute("id", "menutitle");
	menutitle.setAttribute("style", "width: 50px; color: #545454; font-weight: bold; padding-left:5px; font-size: 1.5em;");
	menuborder.appendChild(menutitle);
	
	var hrnode = dom.cn("hr");
	menuborder.appendChild(hrnode);
	
	//opzione: nascondere firme
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionSign");
	inputnode.style.marginTop = '5px';
	inputnode.style.marginBottom = '8px';
	if (signaturesAreHidden) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ hideSignaturesFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Hide signatures");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);
	
	//opzione: accorcia titolo pagina
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionStrip");
	inputnode.style.marginBottom = '8px';
	if (stripPageTitle) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ stripPageTitleFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Shorten page title");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);
	
	//opzione: forum quickSearch
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionQuickS");
	inputnode.style.marginBottom = '8px';
	if (quickSearch) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ quickSearchFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" QuickSearch (select & search!)");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);
	
	
	//opzione: forum light
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionCompact");
	inputnode.style.marginBottom = '8px';
	if (compactForum) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ compactForumFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Compact forum (useful with netbook screens etc.)");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);
	
	
	//opzione: filterMyMessages
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionFilterM");
	if (filterMyMessages) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ filterMyMessagesFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(' Hide read messages from "Your posts", "Active topics", "New posts" e "Unanswered topics" pages');
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);
	
	//opzione: whoIsOnline
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionWIO");
	inputnode.style.marginTop = '2px';
	inputnode.style.marginBottom = '8px';
	if (whoIsOnline) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ whoIsOnlineFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Who is online (?)");
	menuborder.appendChild(textnode);
	
	//bottone esci
	var exitbutton = dom.cn('a');
	exitbutton.setAttribute("id", "exitButton");
	exitbutton.setAttribute("style", "position: absolute; bottom: 10px; left: 135px; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;");
	exitbutton.addEventListener('click', bar=function(){ hideOptionsPanel(); }, false);
	var exitbuttonimg = dom.cn('img');
	exitbuttonimg.setAttribute("style", "padding: 0; margin: 0 3px -3px 23px;");
	exitbuttonimg.setAttribute("src", "data:image/png;base64,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");
	exitbutton.appendChild(exitbuttonimg);
	var textnode = dom.ct("Close");
	exitbutton.appendChild(textnode);
	menuborder.appendChild(exitbutton);
	
	
	//pannello spia
	var whoisonlinePanel = dom.cn("div");
	whoisonlinePanel.setAttribute("id", "whoisonlinePanel");
	whoisonlinePanel.style.width = "800px";
	whoisonlinePanel.style.height = "550px";
	whoisonlinePanel.style.position = "fixed";
	whoisonlinePanel.style.top = "5%";
	whoisonlinePanel.style.left = "10%";
	whoisonlinePanel.style.zIndex = "101";
	whoisonlinePanel.style.visibility = "hidden";
	body.appendChild(whoisonlinePanel);
	
	var s_menubackground = dom.cn("div");
	s_menubackground.setAttribute("id", "s_menubackground");
	s_menubackground.setAttribute("style", "width: 100%; height: 100%; background: #EEE; border: solid thin #C7C7C7; font-family: 'Lucida Grande','Trebuchet MS',Verdana,sans-serif; font-size: 10px; -moz-border-radius: 5px; cursor: default;");
	whoisonlinePanel.appendChild(s_menubackground);
	
	var s_menuborder = dom.cn("div");
	s_menuborder.setAttribute("id", "s_menuborder");
	s_menuborder.setAttribute("style", "overflow: auto; position: absolute; top: 0; left: 0; width: 780px; height: 480px; border: double #757575; margin: 3px; padding: 5px; -moz-border-radius: 5px;");
	s_menubackground.appendChild(s_menuborder);
	
	var s_refreshbutton = dom.cn('a');
	s_refreshbutton.setAttribute("id", "s_refreshbutton");
	s_refreshbutton.setAttribute("style", "position: absolute; bottom: 10px; left: 290px; width: 100px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;");
	s_refreshbutton.addEventListener('click', bar=function(){ getWhoisonline(); }, false);
	var s_refreshbuttonimg = dom.cn('img');
	s_refreshbuttonimg.setAttribute("style", "padding: 0; margin: 0 3px -3px 23px;");
	s_refreshbuttonimg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII=");
	s_refreshbutton.appendChild(s_refreshbuttonimg);
	var textnode = dom.ct(" refresh");
	s_refreshbutton.appendChild(textnode);
	s_menubackground.appendChild(s_refreshbutton);
	
	var s_exitbutton = dom.cn('a');
	s_exitbutton.setAttribute("id", "s_exitbutton");
	s_exitbutton.setAttribute("style", "position: absolute; bottom: 10px; left: 410px; width: 100px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;");
	s_exitbutton.addEventListener('click', bar=function(){ hideSpyPanel(); }, false);
	var s_exitbuttonimg = dom.cn('img');
	s_exitbuttonimg.setAttribute("style", "padding: 0; margin: 0 3px -3px 23px;");
	s_exitbuttonimg.setAttribute("src", "data:image/png;base64,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");
	s_exitbutton.appendChild(s_exitbuttonimg);
	var textnode = dom.ct(" close");
	s_exitbutton.appendChild(textnode);
	s_menubackground.appendChild(s_exitbutton);
	
	
	
	/******* FUNCTIONS ******/
	
	//mostra il pannello delle opzioni
	function showOptionsPanel(){
		layerTrasparente.style.visibility = "visible";
		menu.style.visibility = "visible";
	}
	//nascondi il pannello delle opzioni
	function hideOptionsPanel(){
		layerTrasparente.style.visibility = "hidden";
		menu.style.visibility = "hidden";
		window.location.reload();
	}
	
	//guarda chi c'è online
	function whoIsOnlineFunction(checkbox) {
		if (checkbox) {
			GM_setValue('whoIsOnline', true);
			//bottone 'spia'
			var newB = dom.cn("a");
			newB.style.href = '#';
			newB.style.cursor = 'pointer';
			newB.innerHTML = "<img alt='*' src='http://img18.imageshack.us/img18/9463/spy2.gif'/>";
			newB.title = "Chi c'è in linea";
			newB.style.color = 'Chocolate';
			var newLIB = dom.cn("li");
			newLIB.style.padding = '5px 0 0 0';
			newLIB.setAttribute("id", "buttonSpy");
			newLIB.appendChild(newB);
			var extraOpz = dom.xs('//li[@class="icon-faq"]');
			extraOpz.parentNode.insertBefore(newLIB, extraOpz);
			newB.addEventListener("click", showSpyPanel, false);
			newLIB.style.display = 'block';
		} else {
			GM_setValue('whoIsOnline', false);
			dom.id("buttonSpy").style.display = 'none';
	   }
	}
	//mostra il pannello spia
	function showSpyPanel(){
		getWhoisonline();
		layerTrasparente.style.visibility = "visible";
		whoisonlinePanel.style.visibility = "visible";
	}
	//nascondi il pannello spia
	function hideSpyPanel(){
		layerTrasparente.style.visibility = "hidden";
		whoisonlinePanel.style.visibility = "hidden";
	}
	//carica i dati dalla pagina "./viewonline.php"
	function getWhoisonline() {
		
		var url = "./viewonline.php?sg=1";
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (responseDetails)
					{
						if (responseDetails.status != 200) return;
						
						var oldtable = dom.id("whoisonlinetable");
						var s_menuborder = dom.id('s_menuborder');
						if (oldtable) s_menuborder.removeChild(oldtable);
						
						var response = responseDetails.responseText;
						var div = dom.cn('div', response);
						var ansDoc = document.implementation.createDocument('', '', null);
						ansDoc.onload = ansDoc.appendChild(div);
						
						var whoisonlinetable = ansDoc.getElementsByTagName('table')[0];
						whoisonlinetable.id = 'whoisonlinetable';
						var thead = whoisonlinetable.getElementsByTagName('thead')[0];
						thead.setAttribute("style", "background-color: #368AD2;");
						
						var as = whoisonlinetable.getElementsByTagName('a');
						for (var i = 0; i < as.length; i++) {
							if (as[i].innerHTML == 'Sta visualizzando chi c’è in linea') {
								as[i].innerHTML = '<img src="data:image/gif;base64,R0lGODlhFAAUAMQEAEA0EDg4OEBAQP/mIP///ygoKDQoECAcFDQ0NBgYGDAwMPraEPbKABgYFBwYFCQcEP/iHCwkECQkJP/eGPK2AO6uADw8PPrWCPbGAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/iFEZXNpZ24gYnkgQWl3YW4gKGFpd2FuQHlhbmRleC5ydSkAIfkEASwBGQAsAAAAABQAFAAABahgJo5kaZrG0zSPcZZGUiBBgBSJ+x5FIPyCWkByODkUwGQwoHCUIgWlslaIkBI+gBaoBQgTI0MUQCgDIGQzI1DQHRCLtHYgBzAoiIeoEYiXCQB0f3Z4Thl8C2hzA3RaCwwVAYZvFxOMl5cTFxgVCnoZYn2WmAMQjxRsOhlYPlJLNmAjUDUWSRZCbFYkR7i9TIYlBxK+NkQvoDIKNQo4qscGBysHzsfVJCEAIfkEBQoAGQAsBgAIAAgAAQAABQYgQGRkJoYAIfkEBZYAGQAsBQAIAAgAAQAABQYgQGRkJoYAIfkEBRQAGQAsBAAGAAsABQAABRagEIjkKAJDqqrMiqIpA8zzQM/Qqi8hACH5BAWWABkALAQABgALAAUAAAUXYAaMQjkCWUasKLAS55qKrCqnb3rOewgAOw%3D%3D"/>'+
												  '<b>  Sta visualizzando chi c’è in linea</b>';
							}
						}
						
						var s_menuborder = dom.id('s_menuborder');
						s_menuborder.appendChild(whoisonlinetable);
					}
		});
	}
	
	//nascondi le firme
	function hideSignaturesFunction(checkbox) {
		if (checkbox) {
			GM_setValue('signaturesAreHidden', true);
			var divs = dom.tag('div');
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == 'signature') {
					divs[i].style.display = 'none';
				}
			}
		} else {
			GM_setValue('signaturesAreHidden', false);
			var divs = dom.tag('div');
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == 'signature') divs[i].style.display = 'block';
			}
		}
	}
	
	//accorcia il titolo della pagina (comodo x avere i titoli dei bookmark più corti)
	function stripPageTitleFunction(checkbox) {
		if (checkbox) {
			GM_setValue('stripPageTitle', true);
			t = document.title;
			if (t.indexOf('View topic - ') != -1) {
				document.title = t.split(" - ")[1];
			}
			if (t.indexOf('View forum - ') != -1) {
				document.title = t.split(" - ")[1];
			}
		} else {
			GM_setValue('stripPageTitle', false);
		}
	}
	
	//quick search
	function quickSearchFunction(checkbox) {
		if (checkbox) {
			GM_setValue('quickSearch', true);
			window.addEventListener('mouseup', BXT_callmenu, true);
		} else {
			GM_setValue('quickSearch', false);
		}
	}
	function BXT_callmenu(e) {
		var s = window.getSelection();
		if (!BXT_open) {
			window.setTimeout(function(){
				body.removeChild(dom.id("BXT_searchselector"));
				BXT_open = true;
			},100)
		}
		if (s && BXT_open && s!='') {
			sE = encodeURIComponent(s);
			sE = sE.replace("'"," ");
			var test = dom.cn("div", "<a style='font-size:15px; color:#fff; text-decoration:none; padding:0px; margin:0px' target='_blank' href='./search.php?keywords="+sE+"'><img src='../favicon.ico' border=0 width='16px' height='16px'> search this forum</a><br/>"+
									 "<a style='font-size:15px; color:#fff; text-decoration:none; padding:0px; margin:0px' target='_blank' href='http://www.google.com/search?q="+sE+"'><img src='http://www.google.com/favicon.ico' border=0> search with Google</a><br/>");
			test.setAttribute("id", "BXT_searchselector");
			test.setAttribute("style", "background-color:rgba(0,0,0,0.7);position:absolute;z-index:99999;top:"+(e.pageY+10)+"px;left:"+(e.pageX+10)+"px;padding:10px;border:1px #fff solid;");
			body.appendChild(test);
			BXT_open=false;
		}
	}
	
	//nasconde e/o modifica elementi per rendere il forum più compatto e usabile
	function compactForumFunction(checkbox) {
		if (checkbox) {
			GM_setValue('compactForum', true);
			
			//hide headerbar
			var headerbar = dom.xs("//div[@class='headerbar']");
			if (headerbar) headerbar.style.display = 'none';
			// var pageheader = dom.xs("//div[@class='page-header']");
			// if (pageheader) pageheader.style.display = 'none';
			
			//short title
			var topicTitle = dom.xs("//div[@id='page-body']/h2");
			if (topicTitle) topicTitle.style.margin = '0px';
			
			//hide rules
			var rules = dom.xs("//div[@class='rules']");
			if (rules) rules.style.display = 'none';
			
			//hide user details
			var isTopic = (location.pathname.indexOf('viewtopic') != -1);
			if (isTopic) {
				var postDD = dom.xo("//dl[starts-with(@class, 'post')]/dd");
				//hide user details
				for (var i=0; i<postDD.snapshotLength; i++) {
					var thisNode = postDD.snapshotItem(i);
					if (thisNode) {
						if (thisNode.firstChild.innerHTML == "Posts:" || thisNode.firstChild.innerHTML == "Location:") {
							thisNode.firstChild.innerHTML = "";
							thisNode.style.display = 'block';
						} else {
							thisNode.style.display = 'none';
						}
					}
					thisNode.parentNode.style.margin = '0px';
				}
				//add "Attivi-Tuoi" links to "Top" section
				var topsections = dom.xo("//div[@class='back2top']");
				for (var i = 0; i < topsections.snapshotLength; i++) {
					var topsection = topsections.snapshotItem(i);
					
					var tuoiNode = dom.cn('a', 'Yours');
					tuoiNode.href = './search.php?search_id=egosearch';
					tuoiNode.style.cssFloat = 'right';
					tuoiNode.style.margin = '0px 12px';
					topsection.appendChild(tuoiNode);
					
					var attiviNode = dom.cn('a', 'Actives');
					attiviNode.href = './search.php?search_id=active_topics';
					attiviNode.style.cssFloat = 'right';
					topsection.appendChild(attiviNode);
				}
			}
			
		} else {
			GM_setValue('compactForum', false);
		}
	}
	
	//filterMyMessages: nasconde i messaggi già letti nelle pagine "I tuoi messaggi / Argomenti attivi / Messaggi recenti / Messaggi senza risposta"
	function filterMyMessagesFunction(checkbox) {
		if (checkbox) {
			GM_setValue('filterMyMessages', true);
			var thispage = window.location.href;
			if (thispage.indexOf("egosearch") >= 0 || 
				thispage.indexOf("active_topics") >= 0 || 
				thispage.indexOf("unanswered") >= 0 || 
				thispage.indexOf("newposts") >= 0) {
				
				var oldmessages = dom.xo("//dl[contains(@style,'_read')]/..");
				for (var i = 0; i < oldmessages.snapshotLength; i++) {
					var oldmessage = oldmessages.snapshotItem(i);
					oldmessage.style.display = 'none';
				}
			}
		} else {
			GM_setValue('filterMyMessages', false);
		}
	}
	
	
	/******* UTILITIES ******/
	
	function addGlobalStyle(css) {
		var head, style;
		head = dom.tag('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	//FranMod's DOMUtils
	function DOMUtils(doc, ctxt, html) {
		this.cn = function(tag, html) {
			var elem = this.document.createElement(tag);
			if (html) elem.innerHTML = html;
			return elem;
		}
		
		this.ct = function(text) {
			return this.document.createTextNode(text);
		}
		
		this.id = function(id) {
			return this.document.getElementById(id);
		}
		
		this.tag = function(tag) {
			return this.document.getElementsByTagName(tag);
		}
		
		this.xs = function(xpath) {
			var res = this.document.evaluate(xpath, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			return res.singleNodeValue;
		}
		
		this.xa = function(xpath) {
			var arr = [];
			var xpr = this.document.evaluate(xpath, this.context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; item = xpr.snapshotItem(i); i++)
				arr.push(item);
			return arr.length == 0? null: arr;
		}
		
		this.xo = function(xpath) {
			var ret = this.document.evaluate(xpath, this.context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			return ret; //no snapshot
		}
		
		if (!doc) doc = document;
		if (!ctxt) ctxt = doc;
		if (html) {
			this.document = doc.implementation.createDocument('', '', null);
			this.context = doc.createElement('div');
			this.context.innerHTML = html;
				ansDoc.appendChild(this.context);
		}
		else {
			this.document = doc;
			this.context = ctxt;
		}
	}
	
})();
