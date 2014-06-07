// ==UserScript==
// @name		AOTR forum tools
// @namespace	http://www.apriliaontheroad.com
// @source		http://userscripts.org/scripts/show/55491
// @identifier	http://userscripts.org/scripts/source/55491.user.js
// @description	Nuove opzioni per il forum AOTR
// @version		2.3
// @date		2014-01-14
// @author		Brucaliffo
// @email		brucaliffo@gmail.com
// @include		http://www.apriliaontheroad.com/forum/*
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


(function () {
	
	/***********************/
	/***** INIZIALIZZA *****/
	/***********************/
	
	//global variables
	var gvar = function () {};
	var dom = new DOMUtils();
	var body = dom.tag("body")[0];
	var BXT_open=true;
	
	//google crome?
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (is_chrome) GM_ApiBrowserCheck();
	
	//use gm_log in firebug console (firefox)
	if (!is_chrome) var GM_log=unsafeWindow.console.log;
	
	
	//signaturesAreHidden
	var signaturesAreHidden = GM_getValue('signaturesAreHidden', false);
	if (signaturesAreHidden) hideSignaturesFunction(true);

	//stripPageTitle
	var stripPageTitle = GM_getValue('stripPageTitle', false);
	if (stripPageTitle == true) stripPageTitleFunction(true);

	//compactForum
	var compactForum = GM_getValue('compactForum', false);
	if (compactForum == true) compactForumFunction(true);

	//quickSearch
	var quickSearch = GM_getValue('quickSearch', false);
	if (quickSearch == true) quickSearchFunction(true);

	//filterMyMessages
	var filterMyMessages = GM_getValue('filterMyMessages', false);
	if (filterMyMessages == true) filterMyMessagesFunction(true);

	//markForums
	var markForums = GM_getValue('markForums', false);
	if (markForums == true) markForumsFunction(true);



	/***********************/
	/***** INTERFACCIA *****/
	/***********************/

	//bottone opzioni extra
	var newA = dom.cn("a");
	newA.style.href = '#';
	newA.style.cursor = 'pointer';
	newA.innerHTML = "Opzioni extra";
	newA.title = "Opzioni extra";
	newA.style.color = 'rgb(16,82,137)';
	var newLI = dom.cn("li");
	newLI.style.backgroundImage = 'url("http://www.apriliaontheroad.com/forum/styles/prosilver_se_aotr/theme/images/icon_ucp.gif")';
	newLI.style.backgroundRepeat = 'no-repeat';
	newLI.style.backgroundPosition = '0 50%';
	newLI.style.padding = '1px 0 0 18px';
	newLI.setAttribute("id", "buttonMenuConfig");
	newLI.appendChild(newA);
	var extraOpz = dom.xs('//li[@class="icon-rules"]');
	extraOpz.parentNode.insertBefore(newLI, extraOpz);
	newA.addEventListener("click", showOptionsPanel, false);

	//segna alcuni forum come letti
	var newB = dom.cn("a");
	newB.style.href = '#';
	newB.style.cursor = 'pointer';
	newB.innerHTML = "• Segna alcuni forum come letti";
	newB.style.color = '#105289';
	newB.style.marginLeft = '5px';
	if (markForums == true) {
		newB.style.visibility = 'visible';
	} else {
		newB.style.visibility = 'hidden';
	}
	var newLI2 = dom.cn("li");
	newLI2.style.backgroundRepeat = 'no-repeat';
	newLI2.style.backgroundPosition = '0 50%';
	newLI2.setAttribute("id", "buttonReadForum");
	newLI2.appendChild(newB);
	var extraOpz2 = dom.xs('//ul[@class="linklist leftside"]/li');
	extraOpz2.parentNode.insertBefore(newLI2, extraOpz2.nextSibling);
	newB.addEventListener("click", markForumAsRead, false);

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
	menu.style.height = "300px";
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
	menuborder.setAttribute("style", "position: absolute; top: 0; left: 0; width: 380px; height: 280px; border: double #757575; margin: 3px; padding: 5px; -moz-border-radius: 5px;");
	menubackground.appendChild(menuborder);

	//titolo
	var menuimg = dom.cn("img");
	menuimg.setAttribute("id", "menuimg");
	menuimg.setAttribute("style", "position: relative; top: 2px; margin-right: 2px;");
	menuimg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X/xbjBpjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7ZAF/eRe/M73/nOzXUAcEwaqVTKmUgkGqIoWoIgWP/fTYSTyaSTgAfdbhemaSIej+NcAgRudDod9Pt95PN5RKPR8wnwPG/Z1XVdB8dxin0WDofBsiyCwaA1UYBY/tdqtVAqlRCJRN6FQiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM/na5wKzq/+4ALprzqxbFUqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS+T74jR7Y5c8wDAO5XA4MwxzalklVy+PxNCiKcp4IkbbhzR4K+h9IH02wax3MiAYCgcBfv99/4TS3xxtfepcTCPyKgGl5gCevfyJb/Q3q6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N/fqbAHIEXsj1saQR+M8BCdg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pYIfA9Al+Z3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR+267GwAAAABJRU5ErkJggg==");
	menuborder.appendChild(menuimg);

	var menutitle = dom.cn("span", "Opzioni extra:");
	menutitle.setAttribute("id", "menutitle");
	menutitle.setAttribute("style", "width: 50px; color: #545454; font-weight: bold; padding-left:5px;");
	menuborder.appendChild(menutitle);

	var hrnode = dom.cn("hr");
	menuborder.appendChild(hrnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);

	//opzione: nascondere firme
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionSign");
	if (signaturesAreHidden) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ hideSignaturesFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Nascondi le firme");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);

	//opzione: accorcia titolo pagina
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionStrip");
	if (stripPageTitle) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ stripPageTitleFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Accorcia il titolo della pagina");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);

	//opzione: forum light
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionCompact");
	if (compactForum) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ compactForumFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Forum in versione compact");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);

	//opzione: forum quickSearch
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionQuickS");
	if (quickSearch) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ quickSearchFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Quick search");
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
	var textnode = dom.ct(" Nascondi i messaggi già letti");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);

	//opzione: markForums
	var inputnode = dom.cn('input');
	inputnode.type = 'checkbox';
	inputnode.setAttribute("id", "optionMarkF");
	if (markForums) {inputnode.checked = true;} else {inputnode.checked = false;};
	inputnode.addEventListener('click', foo=function(){ markForumsFunction(this.checked); }, false);
	menuborder.appendChild(inputnode);
	var textnode = dom.ct(" Segna alcuni forum come letti");
	menuborder.appendChild(textnode);
	var brnode = dom.cn("br");
	menuborder.appendChild(brnode);

	//bottone esci
	var exitbutton = dom.cn('a');
	exitbutton.setAttribute("id", "exitButton");
	exitbutton.setAttribute("style", "position: absolute; bottom: 10px; left: 135px; width: 110px; padding: 5px; text-decoration: none; border: 1px solid #dedede; background-color: #f5f5f5; color: #565656; cursor: pointer; font-weight: bold;");
	exitbutton.addEventListener('click', bar=function(){ hideOptionsPanel(); }, false);
	var exitbuttonimg = dom.cn('img');
	exitbuttonimg.setAttribute("style", "padding: 0; margin: 0 3px -3px 23px;");
	exitbuttonimg.setAttribute("src", "data:image/png;base64,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");
	exitbutton.appendChild(exitbuttonimg);
	var textnode = dom.ct("Esci");
	exitbutton.appendChild(textnode);
	menuborder.appendChild(exitbutton);



	/***********************/
	/******* FUNZIONI ******/
	/***********************/

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

	//nascondi le firme
	function hideSignaturesFunction(checkbox) {
		if (checkbox) {
			GM_setValue('signaturesAreHidden', true);
			var sigs = document.getElementsByTagName('div');
			for (var i = 0; i < sigs.length; i++) {
				if (sigs[i].className == 'signature') {
					sigs[i].style.display = 'none';
				}
			}
		} else {
			GM_setValue('signaturesAreHidden', false);
			var sigs = document.getElementsByTagName('div');
			for (var i = 0; i < sigs.length; i++) {
				if (sigs[i].className == 'signature') sigs[i].style.display = 'block';
			}
		}
	}

	//accorcia il titolo della pagina, rimuovendo il testo "Aprilia On The Road • Leggi argomento - "
	function stripPageTitleFunction(checkbox) {
		if (checkbox) {
			GM_setValue('stripPageTitle', true);
			t = document.title;
			if (t.indexOf('Leggi argomento - ') != -1) {
				i = t.indexOf('Leggi argomento - ');
				document.title = t.substring(i + 18);
			}
		} else {
			GM_setValue('stripPageTitle', false);
		}
	}

	//rimuove e/o modifica elementi per rendere il forum più compatto e usabile
	function compactForumFunction(checkbox) {
		if (checkbox) {
			GM_setValue('compactForum', true);
			
			//hide AOTR logo
			var logo = dom.xs('//div[@class="headerbar"]');
			logo.style.display = 'none';
			
			//hide forumrules
			var forumrules = dom.xo("//div[@class='rules']");
			if (forumrules) {
				for (var i = 0; i < forumrules.snapshotLength; i++) {
					var forumrule = forumrules.snapshotItem(i);
					forumrule.style.display = 'none';
				}
			}
			
			//hide announcements
			var anns = dom.xo("//div[@class='forumbg announcement']");
			if (anns) {
				for (var i = 0; i < anns.snapshotLength; i++) {
					var ann = anns.snapshotItem(i);
					ann.style.display = 'none';
				}
			}
			
			//hide user details	
			var isTopic = (location.pathname.indexOf('viewtopic') != -1);
			if (isTopic) {
				
				var postdetails = dom.xo("//dl[starts-with(@class, 'postprofile')]/dd");
				for (var i = 0; i < postdetails.snapshotLength; i++) {
					var postdetail = postdetails.snapshotItem(i);
					postdetail.style.display = 'none';
				}
			}
			
			//move emoticons under textarea
			var isPosting = (location.pathname.indexOf('posting') != -1);
			if (isPosting) {
				
				var smileybox = dom.id('smiley-box');
				smileybox.style.width = '100%';
				
				var messagebox = dom.id('message-box');
				messagebox.style.width = '100%';
				var messagearea = dom.id('message');
				messagearea.style.width = '100%';
				messagearea.style.height = '300px';
				
				messagebox.appendChild(smileybox);
			}
		
		} else {
			GM_setValue('compactForum', false);
		}
	}

	//quick search (modificato da http://bernhardhaeussner.de/blog/62_Greasemonkey_Quick_Search)
	function quickSearchFunction(checkbox) {
		if (checkbox) {
			GM_setValue('quickSearch', true);
			window.addEventListener('mouseup', BXT_callmenu, true);
		} else {
			GM_setValue('quickSearch', false);
		}
	}
	function BXT_callmenu(e) {
		var s=window.getSelection();
		if (!BXT_open) {
			window.setTimeout(function(){
				body.removeChild(dom.id("BXT_searchselector"));
				BXT_open=true;
			},100)
		}
		if (s && BXT_open && s!='') {
			sE=encodeURIComponent(s);
			var test = dom.cn("div", "<a style='font-size:15px; color:#fff; text-decoration:none; padding:0px; margin:0px' target='_blank' href='http://www.apriliaontheroad.com/forum/search.php?keywords="+sE+"'><img src='http://www.apriliaontheroad.com/forum//images/aotr.gif' border=0> cerca su AOTR</a><br/>"+
									 "<a style='font-size:15px; color:#fff; text-decoration:none; padding:0px; margin:0px' target='_blank' href='http://www.google.it/search?q="+sE+"'><img src='http://www.google.com/s2/favicons?domain=www.google.com' border=0> cerca su Google</a><br/>");
			test.setAttribute("id", "BXT_searchselector");
			test.setAttribute("style", "background-color:rgba(0,0,0,0.7);position:absolute;z-index:99999;top:"+(e.pageY+10)+"px;left:"+(e.pageX+10)+"px;padding:10px;border:1px #fff solid;");
			body.appendChild(test);
			BXT_open=false;
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

	//segna alcuni forum come letti
	function markForumsFunction(checkbox) {
		
		var selectedForums = GM_getValue('selectedForums');
		if (selectedForums == undefined) {
			var selectedForums = ''; //caso iniziale con array non definito
			GM_setValue('selectedForums', selectedForums);
		}

		if (checkbox) {
			GM_setValue('markForums', true);
			
			var thisurl = window.location.href;
			if (thisurl.indexOf("http://www.apriliaontheroad.com/forum/index.php") != -1) {
				
				var forumsList = dom.xo('//a[contains(@href,"./viewforum.php?f=")]');
				for (var i = 0; i < forumsList.snapshotLength; i++) {

					var forumI = forumsList.snapshotItem(i);
					var forumId = forumI.href.substring(forumI.href.lastIndexOf("=") + 1);
					
					var inputnode = dom.cn('input');
					inputnode.type = 'checkbox';
					inputnode.setAttribute("id", forumId);
					inputnode.style.marginRight = '5px';
				
					if (checkForumId(forumId)) {inputnode.checked = true;} else {inputnode.checked = false;};
					inputnode.addEventListener('click', foo=function(){ selectedForumsFunction(this.checked, this.id); }, false);
					
					forumI.parentNode.insertBefore(inputnode, forumI);
				}
			}
			
		} else {
			GM_setValue('markForums', false);
		}
	}
	function selectedForumsFunction(checkbox, forumId) {
		var selectedForums = GM_getValue('selectedForums');
		if (checkbox) {
			if (!checkForumId(forumId)) {
				//GM_log(forumId+' non in lista, deve essere aggiunto');
				if (selectedForums == '') {
					selectedForums = forumId;	//caso con array vuoto
				} else {
					selectedForums = selectedForums+','+forumId;		
				}
				GM_setValue('selectedForums', selectedForums);
			}
		} else {
			if (checkForumId(forumId)) {
				//GM_log(forumId+' in lista, deve essere rimosso');
				var selectedForumsAfter = '';
				var selectedForumsBefore = GM_getValue('selectedForums').split(',');
				for (var i=0; i<selectedForumsBefore.length; i++) {
					if (selectedForumsBefore[i] != forumId) {
						if (selectedForumsAfter == '') {
							selectedForumsAfter = selectedForumsBefore[i];
						} else {
							selectedForumsAfter = selectedForumsAfter+','+selectedForumsBefore[i];
						}
					}
				}
				GM_setValue('selectedForums', selectedForumsAfter);
			}
		}
		//GM_log('selectedForums dopo: '+selectedForums);
	}
	//check if forum is already in the list
	function checkForumId(forumId) {
		var selectedForums = GM_getValue('selectedForums').split(',');
		for (var i=0; i<=selectedForums.length-1; i++) {
			if (selectedForums[i] == forumId) return true;
		}
		return false;
	}
	//read forums in background
	function markForumAsRead(){
		
		document.body.style.cursor = 'wait';
		layerTrasparente.style.visibility = "visible";
		
		var selectedForums = GM_getValue('selectedForums').split(',');
		
		selectedForums.forEach(function(fN, i) {
		
			if (fN == '') {
				alert('Nessun forum selezionato!');
				document.body.style.cursor = 'default';
				layerTrasparente.style.visibility = "hidden";
			} else {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.apriliaontheroad.com/forum/viewforum.php?f=' + fN.toString(),
					onload: function (response){
								
								if (response.readyState == 4 && response.status == 200) {
									
									var parser = new DOMParser();
									var responseXML = parser.parseFromString(response.responseText, "text/html");
									
									var aaas = responseXML.body.getElementsByTagName('a');
									var title, nexturl;
									for (var i=0; i<aaas.length; i++) {
										title = aaas[i].textContent;
										if (title=="Segna i subforum come già letti" || title=="Segna argomenti come già letti") {
											nexturl = aaas[i].getAttribute("href");
										}
									}
									//GM_log('nexturl --> ' + nexturl);
									
									GM_xmlhttpRequest({
										method: 'GET',
										url: nexturl,
										onload: function (response){
											//GM_log('visiting nexturl: '+ this.url );
											if (response.status != 200) return;
										}
									});
									
								} else {
									GM_log('response.statusText --> ' + response.statusText);
									return;
								}
							}
				});
				
				function showDuration() {
					layerTrasparente.innerHTML = "<center><div style='color:white;font-size:36px;margin-top:33%;'>Attendi "+duration.toString()+" secondi...</div></center>";
					duration--;
					if (duration >= 0) {
						window.setTimeout(showDuration, 1000);
					} else {
						layerTrasparente.innerHTML = "<center><div style='color:white;font-size:36px;margin-top:33%;'>Fatto!</div></center>";
						window.location.reload();
					}
				}
				
				if (i == selectedForums.length-1) {
					var duration = ((selectedForums.length)*2);
					showDuration();
				}
				
			}
			
		});
		
	}


	//accorcia il menu a tendina in fondo al forum
	myarray = new Array(135, 131, 136, 142, 137, 138, 139, 140, 146, 141, 148, 149, 119, 118, 132, 121, 122, 120, 123, 124, 125, 126, 127, 128, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 184, 187, 185, 186, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 179, 183, 182, 181, 180, 178, 177, 180, 305,  299, 300, 301, 302, 303, 304, 315, 245, 268, 269, 270, 272, 273, 274, 275, 151, 241, 271, 320, 318, 321, 319, 323, 324, 325, 329, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 343, 348, 349);
	for (i in myarray) {
		var option = dom.xs("//option[@value="+ myarray[i] +"]");
		if (option) option.parentNode.removeChild(option);
	}



	/***********************/
	/******* UTILITA' ******/
	/***********************/

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
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
	
	//google chrome compatibility
	// @author		GIJoe
	// @license	   http://creativecommons.org/licenses/by-nc-sa/3.0/
	function GM_ApiBrowserCheck() {
		const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts
		if (typeof (unsafeWindow) == 'undefined') {
			unsafeWindow = window;
		}
		if (typeof (GM_log) == 'undefined') {
			GM_log = function (msg) {
				try {
					unsafeWindow.GM_log('GM_log: ' + msg);
				} catch (e) {}
			};
		}
		GM_clog = function (msg) {
			if (arguments.callee.counter) {
				arguments.callee.counter++;
			} else {
				arguments.callee.counter = 1;
			}
			GM_log('(' + arguments.callee.counter + ') ' + msg);
		}
		GM_addGlobalStyle = function (css) { // Redefine GM_addGlobalStyle with a better routine
			var sel = document.createElement('style');
			sel.setAttribute('type', 'text/css');
			sel.appendChild(document.createTextNode(css));
			var hel = document.documentElement.firstChild;
			while (hel && hel.nodeName != 'HEAD') {
				hel = hel.nextSibling;
			}
			if (hel && hel.nodeName == 'HEAD') {
				hel.appendChild(sel);
			} else {
				document.body.insertBefore(sel, document.body.firstChild);
			}
			return sel;
		}
		var needApiUpgrade = false;
		if (window.navigator.appName.match(/^opera/i) && typeof (window.opera) != 'undefined') {
			needApiUpgrade = true;
			gvar.isOpera = true;
			GM_log = window.opera.postError;
			//GM_log('Opera detected...');
		}
		if (typeof (GM_setValue) != 'undefined') {
			var gsv = GM_setValue.toString();
			if (gsv.indexOf('staticArgs') > 0) {
				gvar.isGreaseMonkey = true;
				//GM_log('GreaseMonkey Api detected...');
			} // test GM_hitch
			else if (gsv.match(/not\s+supported/)) {
				needApiUpgrade = true;
				gvar.isBuggedChrome = true;
				//GM_log('Bugged Chrome GM Api detected...');
			}
		} else {
			needApiUpgrade = true;
			//GM_log('No GM Api detected...');
		}
		
		if (needApiUpgrade) {
			//GM_log('Try to recreate needed GM Api...');
			var ws = null;
			try {
				ws = typeof (unsafeWindow.localStorage);
				unsafeWindow.localStorage.length;
			} catch (e) {
				ws = null;
			} // Catch Security error
			if (ws == 'object') {
				//GM_log('Using localStorage for GM Api.');
				GM_getValue = function (name, defValue) {
					var value = unsafeWindow.localStorage.getItem(GMSTORAGE_PATH + name);
					if (value == null) {
						return defValue;
					} else {
						switch (value.substr(0, 2)) {
						case 'S]':
							return value.substr(2);
						case 'N]':
							return parseInt(value.substr(2));
						case 'B]':
							return value.substr(2) == 'true';
						}
					}
					return value;
				}
				GM_setValue = function (name, value) {
					switch (typeof (value)) {
					case 'string':
						unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, 'S]' + value);
						break;
					case 'number':
						if (value.toString().indexOf('.') < 0) {
							unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, 'N]' + value);
						}
						break;
					case 'boolean':
						unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name, 'B]' + value);
						break;
					}
				}
				GM_deleteValue = function (name) {
					unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH + name);
				}
			} else if (!gvar.isOpera || typeof (GM_setValue) == 'undefined') {
				//GM_log('Using temporarilyStorage for GM Api.');
				gvar.temporarilyStorage = new Array();
				GM_getValue = function (name, defValue) {
					if (typeof (gvar.temporarilyStorage[GMSTORAGE_PATH + name]) == 'undefined') {
						return defValue;
					} else {
						return gvar.temporarilyStorage[GMSTORAGE_PATH + name];
					}
				}
				GM_setValue = function (name, value) {
					switch (typeof (value)) {
					case "string":
					case "boolean":
					case "number":
						gvar.temporarilyStorage[GMSTORAGE_PATH + name] = value;
					}
				}
				GM_deleteValue = function (name) {
					delete gvar.temporarilyStorage[GMSTORAGE_PATH + name];
				};
			}
			if (typeof (GM_openInTab) == 'undefined') {
				GM_openInTab = function (url) {
					unsafeWindow.open(url, "");
				}
			}
			if (typeof (GM_registerMenuCommand) == 'undefined') {
				GM_registerMenuCommand = function (name, cmd) {
					//GM_log("Notice: GM_registerMenuCommand is not supported.");
				}
			} // Dummy
			if (!gvar.isOpera || typeof (GM_xmlhttpRequest) == 'undefined') {
				//GM_log('Using XMLHttpRequest for GM Api.');
				GM_xmlhttpRequest = function (obj) {
					var request = new XMLHttpRequest();
					request.onreadystatechange = function () {
						if (obj.onreadystatechange) {
							obj.onreadystatechange(request);
						};
						if (request.readyState == 4 && obj.onload) {
							obj.onload(request);
						}
					}
					request.onerror = function () {
						if (obj.onerror) {
							obj.onerror(request);
						}
					}
					try {
						request.open(obj.method, obj.url, true);
					} catch (e) {
						if (obj.onerror) {
							obj.onerror({
								readyState: 4,
								responseHeaders: '',
								responseText: '',
								responseXML: '',
								status: 403,
								statusText: 'Forbidden'
							});
						};
						return;
					}
					if (obj.headers) {
						for (name in obj.headers) {
							request.setRequestHeader(name, obj.headers[name]);
						}
					}
					request.send(obj.data);
					return request;
				}
			}
		}
	}
	
})();
