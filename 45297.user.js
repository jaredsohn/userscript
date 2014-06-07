// ==UserScript==
// @name           Kokos Inwestycje
// @namespace      StarExterminator
// @description    Polepszenie funkcjonalnosci przegladu inwestycji i innych w panelu serwisu kokos.pl.
// @version        2.2
// @include        http*://kokos.pl/moje_konto
// @include        http*://kokos.pl/moje_konto.php
// @include        http*://kokos.pl/moje_konto*akcja=moje_inwestycje*
// @include        http*://kokos.pl/moje_konto*akcja=moje_aukcje*
// @include        http*://kokos.pl/moje_konto*akcja=moje_pozyczki*
// ==/UserScript==

(function() {

jso =
{
	gI:function(a,b){
		b=b||document;
		return b.getElementById(a)
	},
	gT:function(a,b,i){
		b=b||document;
		b=b.getElementsByTagName(a)
		a=[]
		for(i=0;i<b.length;i++)a[a.length]=b[i];
		return a
	},
	gAV:function(a,b,c,d,i){
		a=a||"*";
		b=b||document;
		if(!c)return false;
		b=b.getElementsByTagName(a)
		a=[]
		for(i=0;i<b.length;i++)if(b[i][c]&&(!d||(b[i][c].match(new RegExp("(^| )"+d+"($| )","gi"))!=null)))a[a.length]=b[i];;
		return a
	},
	cE:function(a,b,c,d,e,i){
		a=document.createElement(a)
		if(b)for(i in b)a[i]=b[i];;
		if(c)for(i in c)if(typeof c[i] != "function")a.appendChild(c[i].nodeType?c[i]:document.createTextNode(c[i]));;
		if(e)for(i in e)jso.aE(a,i,e[i]);;
		if(d)d.appendChild(a);
		return a
	},
	gE:function(x){
		x=x||window.event;
		x=x.target||x.srcElement;
		if(x.nodeType==3)x=x.parentNode;
		return x
	},
	aE:function(O,E,F){
		return(O.x=O.addEventListener)?O.x(E,F,0):(O.x=O.attachEvent)?O.x("on"+E,F):!1;
	},
	rE:function(O,E,F){
		return(O.x=O.removeEventListener)?O.x(E,F,0):(O.x=O.detachEvent)?O.x("on"+E,F):!1;
	},
	sE:function(e){
		e = e||event
		if(e.preventDefault)
			e.preventDefault();
		e.returnValue=false
		return false
	},
	ajax:function(params)
	{
		var T = this
		for(var i in params)
			 this[i]=params[i];
		this.ajax = false
		this.ajax = new XMLHttpRequest();
		if (this.ajax)
		{
			 if(this.onend)
				this.ajax.onreadystatechange=function(){if(T.ajax.readyState==4)T.onend(T.ajax);};
			 this.method=this.method?this.method.toUpperCase():"GET";
			 this.uri=this.uri||"";
			 this.postData=this.postData?this.postData:null;
			 this.ajax.open(this.method,this.uri, true);
			 if (this.method == "POST")
				this.ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			 this.ajax.send(this.postData)
			 this.ok = true
		}
		else
		{
			 this.ok = false
		}
	}
}

var css = [
"table.ki_table {border-spacing:0}",
"tr.ki_row {display:none}",
"td.ki_ceil {border-style:solid;border-width:0 1px 5px 1px;border-color:#2d3800 #95BC01;padding:0;}",
"textarea.ki_textarea {border:2px solid #95BC01;width:600px;height:300px;padding:5px;}",
"ul.ki_tabs {list-style:none;margin:0;padding:2px 0 0 0;text-align:left;overflow:hidden;width:100%;background:#2d3800;color:#fff}",
"li.ki_tab,li.ki_tab_active {font-weight:bold;font-size:11px;cursor:pointer;display:block;float:left;margin:0 0 0 2px;width:auto;padding:5px;border-style:solid;border-color:#678201;border-width:1px 1px 0 1px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;background:#95BC01;color:#fff}",
"li.ki_tab_active {background:#fff;color:#000}",
"div.ki_conteiner {display:none;padding:5px;position:relative;font-weight:normal;text-align:left;overflow:auto;width:626px;height:400px}",
"div.ki_commentsEditor {border:2px solid #95BC01;width:636px;padding:0;position:fixed;top:50%;left:50%;margin:-206px 0 0 -319px;background:#fff;-moz-border-radius:5px}",
"li.ki_button {float:right;margin:0 3px 0 0;padding:0}",
"li.ki_button * {display:block;cursor:pointer;font-size:13px;padding:2px}",
"div.ki_commentsEditor{font-size:12px;font-weight:bold}",
"table.ki_commentsList{border-spacing:0;width:100%}",
"table.ki_commentsList tfoot td{text-align:right}",
"table.ki_commentsList td{border-top:1px solid #95BC01}",
"table.ki_commentsList tr.ki_inv_tr td{background:#F5FCE5}",
"table.ki_commentsList td a{padding:5px;text-decoration:none;font-size:16px;color:#5A820F;font-weight:bold}",
"form.ki_editForm input[type='text'],form.ki_editForm textarea{border:2px solid #95BC01;width:590px;padding:5px;}",
"form.ki_editForm textarea{height:100px;}",
"form.ki_editForm p{margin:5px 0}",
"tr.ki_info_active a.ki_info_anachor,tr.ki_auction_active a.ki_auction_anachor{text-decoration:underline}"
];

jso.cE("style",{type:"text/css"},[css.join("\n")],jso.gT("head")[0]);
jso.cE("script",{type:"text/javascript",src:"/js/jquery/cart.js"},0,jso.gT("head")[0]);

var ki = function(domTable,Type)
{
	this.domTable = domTable;
	this.Type = Type;
	if(this.domTable && this.domTable.tagName.toLowerCase() == "table")
	{
		this.domTable.className+=" ki_table";
		var domRows = jso.gT("tr",this.domTable),i=(Type == "aukcje" ? 0 : 1);
		for(;i<domRows.length;i++)
		{
			new this.item(domRows[i],this);
		}
	}
}
ki.prototype.item = function(domRow,ki)
{
	this.ki = ki;
	this.domRow = domRow;
	this.visible = false;
	var domAnachors = jso.gT("a",this.domRow),i,T=this;
	for(i=0;i<this.types.length;i++)
		this[this.types[i]] = {};
	if(domAnachors.length > 0)
	{
		switch(this.ki.Type)
		{
			case "iwestycje":
			{
				this.auction.URI = domAnachors[0].href.replace(/#.*$/,"")
				this.info.URI = domAnachors[1].href.replace(/#.*$/,"");
				for(i=0;i<domAnachors.length;i++)
				{
					if(!jso.gT("img",domAnachors[i])[0])
					{
						jso.aE
						(
							domAnachors[i],
							"click",
							(i?function(e){return T.getData.call(T,e,"info");}:function(e){return T.getData.call(T,e,"auction")})
						);
						domAnachors[i].className += i?" ki_info_anachor":" ki_auction_anachor";
					}
				}
				break;
			}
			case "obserwowane":
			{
				this.auction.anachors = [];
				this.auction.URI = domAnachors[0].href.replace(/#.*$/,"")
				for(i=0;i<domAnachors.length;i++)
				{
					if(!jso.gT("img",domAnachors[i])[0])
					{
						jso.aE(domAnachors[i],"click",function(e){return T.getData.call(T,e,"auction")});
						domAnachors[i].className += " ki_auction_anachor";
					}
					else
					{
						this.removeURI = domAnachors[i].href;
						jso.aE(domAnachors[i],"click",function(e){return T.removeRow.call(T,e)})
					}
				}
				break;
			}
			case "aukcje":
			{
				this.auction.URI = domAnachors[1].href.replace(/#.*$/,"")
				for(i=0;i<domAnachors.length;i++)
				{
					if(domAnachors[i].href.indexOf("aukcje.php") > -1 && domAnachors[i].href.indexOf("edycja_aukcji") < 0)
						jso.aE(domAnachors[i],"click",function(e){return T.getData.call(T,e,"auction")});
				}
				break;
			}
			case "pozyczki":
			{
				// Brak danych do zrobienia tej funkcjonalności
				break;
			}
		}
	}
}
ki.prototype.item.prototype.types = ["auction","info","wait"]
ki.prototype.item.prototype.getData = function(e,action_type,postData)
{
	if(e)
		jso.sE(e);
	var T = this,Type=action_type,postData;
	if(this[Type].domRow)
		this.show(Type);
	else if(!this[Type].AJAX)
	{
		if(this.wait.domRow)
			this.show("wait");
		else
			this.parseData("wait");
		if(postData)
			this[Type].AJAX = new jso.ajax({method:"POST",postData:postData,uri:this[Type].URI,onend:function(ajax){T.parseData.call(T,Type,ajax.responseText)}});
		else
			this[Type].AJAX = new jso.ajax({method:"GET",uri:this[Type].URI,onend:function(ajax){T.parseData.call(T,Type,ajax.responseText)}});
	}
	else
		this.show("wait");
	return false;
}
ki.prototype.item.prototype.removeRow = function(e)
{
	if(e)
		jso.sE(e);
	new jso.ajax({method:"GET",uri:this.removeURI});
	var i=0,Type;
	for(;i<this.types.length;i++)
	{
		Type=this.types[i];
		if(this[Type] && this[Type].domRow && this[Type].domRow.parentNode)
		{
			this[Type].domRow.parentNode.removeChild(this[Type].domRow);
		}
	}
	this.domRow.parentNode.removeChild(this.domRow);
	return false;
}
ki.prototype.item.prototype.parseResponse = function(responseText)
{
	return responseText.replace(/[\x0D\x0A]/gmi,"").replace(/[ \t]+/gi," ").replace(/^.*<body[^>]*>/,"").replace(/<\/body.*$/,"").replace(/<style[^>]*>[^<]*<\/style>/gi,"").replace(/<script[^>]*>[^<]*<\/script>/gi,"").replace(/<\/?link[^>]*\/?>/gi,"").replace(/\'inwestuj-w-pozyczke-form\', *true/gi,"'inwestuj-w-pozyczke-form', false");
}
ki.prototype.item.prototype.parseData = function(action_type,responseText)
{
	var domTmp,domData,i,domNode,domRow,domCeil,domConteiner,tabs,domNode,domNewNode,Type=action_type,T=this;
	this[Type].domRow = jso.cE("tr",{className:"ki_row"});
	domRow = this[Type].domRow;
	this[Type].domCeil = jso.cE("td",{className:"ki_ceil",colSpan:this.domRow.cells.length},0,domRow);
	domCeil = this[Type].domCeil;
	switch(Type)
	{
		case "wait":
		{
			jso.cE("strong",0,["Proszę czekać ..."],domCeil)
			break;
		}
		case "auction":
		{
			domTmp = jso.cE("div")
			responseText = this.parseResponse(responseText)
			domTmp.innerHTML = responseText
			domData = jso.gAV("div",domTmp,"id","top_up_logged")[0]
			if(domData)
			{
				if(unsafeWindow && unsafeWindow.reloadSmallCart)
				{
					unsafeWindow.reloadSmallCart();
				}
				domData = jso.gAV("div",domTmp,"className","menu_aukcje_pokaz_1_srodek_log")[0];
				this.opoznienie = 0;
				this.dniDoOstatecznejWindykacji = 0;
				this.dniDoWindykacji = 0;
				domData = jso.gT("span",jso.gT("div",domData)[4])[0].firstChild.nodeValue;
				this[Type].sex = domData.indexOf("kawaler") > -1 || domData.indexOf("żonaty") > -1  ? "M" : "F";
				domData = jso.gAV("div",domTmp,"id","dane_aukcji")[0];
				var zakonczona = false, oferty = 0;
				domNode = jso.gAV("table",domData,"id","t_dane")[0]
				if(domNode)
				{
					domNewNode = jso.gT("td",jso.gT("tr",domNode)[7])[1].firstChild.nodeValue
					zakonczona = domNewNode.indexOf("usunięta") > -1 || domNewNode.indexOf("zakończona") > -1;
					domNewNode = jso.gT("td",jso.gT("tr",domNode)[8])[1].firstChild.nodeValue
					oferty = parseFloat(domNewNode);
				}
				tabs = new this.tabs(this,Type);
				domConteiner = document.createDocumentFragment();
				domNode = domData.firstChild;
				while(domNode)
				{
					if(domNode.tagName && domNode.tagName.toLowerCase() == "table" && domNode.id == "oferty")
						break;
					domNewNode = domNode.nextSibling;
					domConteiner.appendChild(domNode)
					domNode = domNewNode;
				}
				tabs.addTab.call(tabs,"Opis","Opis aukcji",domConteiner);
				/*
				domConteiner = document.createDocumentFragment();
				var rekomendacje = 0;
				domNode = domNode.nextSibling;
				while(domNode)
				{
					domNewNode = domNode.nextSibling;
					if(domNode.tagName)
					{
						if(domNode.tagName.toLowerCase() == "p" && domNode.firstChild.nodeValue != "brak" && domNode.firstChild.nodeValue != "Rekomendacja zapisana")
						{
							domConteiner.appendChild(domNode);
							rekomendacje ++;
						}
						else
							break;
					}
					domNode = domNewNode;
				}
				alert(3)
				if(rekomendacje)
					tabs.addTab.call(tabs,"R","Lista rekomendacji (ilość)",domConteiner, " ("+rekomendacje+")");
				domNode = jso.gAV("form",domData,"id","rekomendacje-form")[0]
				if(domNode)
				{
					tabs.addTab.call(tabs,"R (+)", "Dodaj rekomendację",
						jso.cE("form",{action:"javascript:void(0)"},
						[
							jso.cE("p",0,[this[Type].domRTextarea = jso.cE("textarea",{cols:70,rows:10,className:"ki_textarea"})]),
							jso.cE("p",0,[jso.cE("input",{type:"submit",value:"Wyślij rekomendację"})])
						],0,{
							submit:
							function(e)
							{
								T[Type].activeTab="R";
								return T.reloadData.call(T,e,Type,"_qf__rekomendacje-form=&com_text="+T[Type].domRTextarea.value+"&isubZapisz=Wyślij");
							}
						})
					);
				}
				*/
				domNode = jso.gAV("table",domData,"id","oferty")[0]
				if(domNode && oferty)
				{
					var inwestycje = jso.gT("img",domNode).length;
					oferty = jso.gT("tr",domNode).length - 1;
					tabs.addTab.call(tabs,"Oferty","Lista ofert pożyczkodawców (suma/wpłacone)",domNode," (" + oferty + "/" + inwestycje  +")")
				}
				if(this.ki.Type == "obserwowane" && !zakonczona)
				{
					domNode = jso.gAV("form",domData,"id","inwestuj-w-pozyczke-form")[0]
					domNode.action = this.auction.URI
					tabs.addTab.call(tabs,"Inwestuj","Zainwetuj w tą aukję",domNode);
				}
				domNode = jso.gAV("table",domData,"id","harmonogram_raty")[0]
				if(domNode)
				{
					newDomNode = jso.gAV("td",domNode,"className","lp_1 *black")
					for(i=0;i<newDomNode.length;i++)
					{
 						if(!jso.gT("img",newDomNode[i].parentNode)[0])
						{
							newDomNode = jso.gT("td",newDomNode[i].parentNode)[1].firstChild.nodeValue.split("-");
							var miesiac = newDomNode[1]-1;
							this.opoznienie = Math.floor((Date.now() - Date.UTC(newDomNode[0],miesiac,11,0,0,0,0)) / 86400000);
							this.dniDoWindykacji = Math.ceil((Date.UTC((miesiac>10?parseFloat(newDomNode[0])+1:newDomNode[0]),(miesiac>10?11-miesiac:miesiac+1),21,0,0,0,0) - Date.now()) / 86400000);
							this.dniDoOstatecznejWindykacji = this.dniDoWindykacji + 7;
							break;
						}
					}
					tabs.addTab.call(tabs,"Harmonogram","Harmonogram spłaty pożyczki",domNode);
				}
				domNode = jso.gT("h2",domData)
				for(i=0;i<domNode.length;i++)
				{
					if(domNode[i].firstChild.nodeValue.indexOf("Komunikacja między użytkownikami") > -1)
					{
						domNode = domNode[i].nextSibling;
						while(domNode && (!domNode.tagName || domNode.tagName.toLowerCase() != "div"))
							domNode = domNode.nextSibling;
						if(domNode)
							domNewNode = jso.gT("div",domNode);
						else
							domNewNode = false;
						if(domNewNode)
						{
							var komentarze = 0,odpowiedzi = 0,domAuthor;
							for(i=0;i<domNewNode.length;i++)
							{
								domAuthor = jso.gT("span",domNewNode[i])[0];
								if(domAuthor)
								{
									if(domNewNode[i].parentNode == domNode)
										komentarze++;
									else if(domAuthor.firstChild)
										odpowiedzi++;
									domAuthor.style.fontWeight = "bold";
								}
								domNewNode[i].style.width = "auto";
							}
							if(komentarze)
								tabs.addTab.call(tabs,"K","Lista komentarzy (komentarze/odpowiedzi)",domNode," (" + komentarze + "/" + odpowiedzi  +")",true);
						}
						break;
					}
				}
				domNode = jso.gAV("form",domData,"id","comments-form")[0];
				if(domNode)
				{
					this.updateComments(Type);
					tabs.addTab.call(tabs,"K (+)","Dodaj komentarz",this[Type].domComments);
				}
				domData = jso.gAV("div",domTmp,"className","menu_aukcje_pokaz_1_srodek_log")[0];
				if(domData)
				{
					this.nickPB = jso.gT("span",jso.gAV("div",domData,"className","menu_aukcje_pokaz_1_bialy")[0])[0].firstChild.nodeValue;
					tabs.addTab.call(tabs,"Info","Informacje o pożyczkobiorcy",domData);
				}
				domData = jso.gAV("div",domTmp,"className","menu_aukcje_pokaz_4_mid")[0];
				if(domData)
					tabs.addTab.call(tabs,"Aukcje","Aukcje pożyczkobiorcy (spłacone/spłacane/oczekujące/zakończone/anulowane)",domData," (" + jso.gAV("img",domData,"title","Spłacona").length + "/" + jso.gAV("img",domData,"title","Spłacana").length + "/" + jso.gAV("img",domData,"title","Aukcja trwa, oczekiwanie na wpłaty").length +  "/" + jso.gAV("img",domData,"title","Aukcja nie zrealizowana").length +  "/" + jso.gAV("img",domData,"title","Aukcja usunięta przez Użytkownika").length +")");
				this.createButtons(tabs,Type);
				break;
			}
		}
		case "info":
		{
			domTmp = jso.cE("div")
			responseText = this.parseResponse(responseText)
			domTmp.innerHTML = responseText
			domData = jso.gAV("div",domTmp,"id","top_up_logged")[0]
			if(domData)
			{
				if(unsafeWindow && unsafeWindow.reloadSmallCart)
				{
					unsafeWindow.reloadSmallCart();
				}
				tabs = new this.tabs(this,Type);
				domData = jso.gAV("div",domTmp,"id","moje_inwestycje")[0];
				domNode = jso.gAV("table",domData,"id","rekomendacja")[0];
				if(domNode)
				{
					domConteiner = document.createDocumentFragment();
					domConteiner.appendChild(domNode);
					var domRecForm =  jso.gAV("form",domData,"id","recommend-form")[0];
					if(domRecForm)
					{
						jso.aE
						(
							domRecForm,
							"submit",
							function(e)
							{
								var inputValue="",domInput;
								for(var i=0;i<domRecForm.elements.length;i++)
								{
									domInput = domRecForm.elements[i];
									if(domInput.name == "rekomendacja" && domInput.checked)
									{
										inputValue = domInput.value;
										break;
									}
								}
								return T.reloadData.call(T,e,Type,"rekomendacja="+inputValue+"&isubZapisz=Zapisz");
							}
						)
						domConteiner.appendChild(domRecForm);
					}
					tabs.addTab.call(tabs,"Rekomendacja","Rekomendacja firmy COW Cross",domConteiner);
				}
				domNode = jso.gAV("table",domData,"id","harmonogram_raty")[0]
				if(domNode)
				{
					domConteiner = document.createDocumentFragment();
					domNewNode = domNode.parentNode.previousSibling;
					while(domNewNode && (!domNewNode.tagName || domNewNode.tagName.toLowerCase() != "div"))
						domNewNode = domNewNode.previousSibling;
					if(domNewNode && jso.gT("div",domNewNode)[0])
						domConteiner.appendChild(jso.gT("div",domNewNode)[0]);
					domConteiner.appendChild(domNode);
					tabs.addTab.call(tabs,"Harmonogram","Harmonogram spłaty pożyczki",domConteiner);
				}
				if(domNewNode)
				{
					domNode = domNewNode.previousSibling;
					domConteiner = [];
					petla:while(domNode)
					{
						domNewNode = domNode.previousSibling
						if(domNode.tagName)
						{
							switch(domNode.tagName.toLowerCase())
							{
								case "table":
									break petla;
								case "br":
									break;
								case "div":
									domConteiner.unshift(domNode)
									break petla;
								default:
									domConteiner.unshift(domNode)
									break;
							}
						}
						domNode = domNewNode;
					}
					if(domConteiner.length)
						tabs.addTab.call(tabs,"Windykacja","Czy zgadzasz się na windykacje przez COW Cross?",jso.cE("div",0,domConteiner));
				}
				domNode = jso.gAV("table",domData,"id","dp_dane");
				if(domNode[0] && domNode[1])
				{
					domConteiner = document.createDocumentFragment();
					domConteiner.appendChild(domNode[0].parentNode)
					domNode[0].parentNode.style.width="300px"
					domNewNode = domNode[1].parentNode.nextSibling;
					domConteiner.appendChild(domNode[1].parentNode)
					domNode[1].parentNode.style.width="300px"
					domNode = domNewNode;
					while(domNode && ( !domNode.tagName || domNode.tagName.toLowerCase() != "br"))
					{
						domNewNode = domNode.nextSibling;
						domConteiner.appendChild(domNode)
						domNode = domNewNode;
					}
					tabs.addTab.call(tabs,"Informacje","Informacje o pożyczce i pożyczkobiorcy",domConteiner);
				}
				domConteiner = jso.gAV("div",domData,"id","moje_inwestycje")[1]
				if(domConteiner && jso.gT("img",domConteiner))
				{
					domNode = jso.gT("div",domConteiner)[0]
					if(domNode)
						tabs.addTab.call(tabs,"Umowy","Różne umowy w formacie PDF",domNode);
					domNode = jso.gT("table",domConteiner)
					if(domNode[0])
						tabs.addTab.call(tabs,"Monity","Historia monitów kokosa",domNode[0]);
					if(domNode[1])
						tabs.addTab.call(tabs,"Windykacja","Historia windykacji",domNode[1]);
					if(domNode[2])
					{
						domNewNode = document.createDocumentFragment();
						domNode = domNode[2];
						while(domNode.nodeName.toLowerCase() != "div")
							domNode = domNode.previousSibling;
						domTmp = domNode.nextSibling;
						domNewNode.appendChild(domNode);
						domNode = domTmp;
						while(domNode.nodeName.toLowerCase() != "table")
							domNode = domNode.nextSibling;
						domTmp = domNode.nextSibling;
						domNewNode.appendChild(domNode);
						domNode = domTmp;
						while(domNode.nodeName.toLowerCase() != "div")
							domNode = domNode.nextSibling;
						domNewNode.appendChild(domNode);
						tabs.addTab.call(tabs,"Rekomendacje","Historia rekomendacji",domNewNode);
					}
				}
				this.createButtons(tabs,Type);
				break;
			}
		}
		default:
		{
			jso.cE("strong",0,[
				jso.cE("p",0,[
					"Nie udało się pobrać lub sparsować danych: ",
					jso.cE("a",{href:this[Type].URI},["spróbuj ponownie"],0,{click:function(e){return T.reloadData.call(T,e,Type);}})
				]),
				jso.cE("p",0,[
					"Możliwe, że zostałeś wylogowany: ",
					jso.cE("a",{href:this[Type].URI},["zaloguj się"],0,{click:function(e){return T.loginForm.call(T,e,Type);}})
				])
			],domCeil);
			break;
		}
	}
	if(this.domRow.nextSibling)
		this.domRow.parentNode.insertBefore(domRow,this.domRow.nextSibling);
	else
		this.domRow.parentNode.appendChild(domRow);
	if(this[Type].AJAX)
	{
		responseText = null;
		this[Type].AJAX = null;
	}
	this.show(Type);
}
ki.prototype.item.prototype.updateComments = function(action_type,e)
{
	if(e)
		jso.sE(e);
	var domInsertInto = 0,Type=action_type,T=this,i=0;
	if(this[Type].domComments)
	{
		domInsertInto = this[Type].domComments.parentNode;
		domInsertInto.removeChild(this[Type].domComments);
	}
	this[Type].domComments = jso.cE("form",{action:"javascript:void(0)"},
	[
		jso.cE("p",0,
		[
			jso.cE("label",0,
			[
				"Szablon: ",
				this[Type].domCommentsSelect = jso.cE("select",{width:200},[jso.cE("option",{value:""},["----"])],0,{change:function(){T.insertComment.call(T,Type)}})
			]),
			" ",
			jso.cE("label",0,
			[
				"Płeć: ",
				this[Type].domCommentsSex = jso.cE("select",{width:200},
				[
					jso.cE("option",{value:"F",selected:this[Type].sex=="F"},["K"]),
					jso.cE("option",{value:"M",selected:this[Type].sex=="M"},["M"]),
					jso.cE("option",{value:"O",selected:this[Type].sex=="O"},["?"])
				],0,{change:function(){T.insertComment.call(T,Type)}})
			]),
			" Szablony: ",
			jso.cE("input",{type:"button",value:"edytuj"},0,0,{click:function(e){return T.editComments.call(T,Type,e,"list")}}),
			" lub ",
			jso.cE("input",{type:"button",value:"odśwież"},0,0,{click:function(e){return T.updateComments.call(T,Type,e)}})
		]),
		jso.cE("p",0,[this[Type].domCommentsTextarea = jso.cE("textarea",{cols:70,rows:10,className:"ki_textarea"})]),
		jso.cE("p",0,[jso.cE("input",{type:"submit",value:"Zadaj pytanie"})])
	],domInsertInto,{
		submit:
		function(e)
		{
			T[Type].activeTab="Kom";
			return T.reloadData.call(T,e,Type,"_qf__comments-form=&com_text="+T[Type].domCommentsTextarea.value+"&isubZapisz=Zadaj pytanie");
		}
	});
	for(;i<this.main.comments.length;i++)
		jso.cE("option",{value:i},[this.main.comments[i].title],this[Type].domCommentsSelect);
}
ki.prototype.item.prototype.insertComment = function(Type)
{
	var domSelect = this[Type].domCommentsSelect;
	var comment = domSelect.options[domSelect.selectedIndex].value;
	if(comment != "")
	{
		comment = this.main.comments[comment];
		var domSelectSex = this[Type].domCommentsSex;
		var sex = domSelectSex.options[domSelectSex.selectedIndex].value;
		comment = comment[sex] || comment.O || comment.F || comment.M;
		comment = comment.replace(/#dniDoWindykacji#/gi, this.dniDoWindykacji);
		comment = comment.replace(/#dniDoOstatecznejWindykacji#/gi, this.dniDoOstatecznejWindykacji);
		comment = comment.replace(/#opoznienie#/gi, this.opoznienie);
		comment = comment.replace(/#nickPB#/gi, this.nickPB);
		comment = comment.replace(/#emailPD#/gi, this.main.settings.email);
	}
	this[Type].domCommentsTextarea.value = comment;
}
ki.prototype.item.prototype.main = {};
if(GM_listValues)
{

	ki.prototype.item.prototype.main.settings = eval(GM_getValue("settings","")) || {};
	if(!ki.prototype.item.prototype.main.settings.email)
	{
		var domTmp = jso.gI("top_up_logged");
		if(domTmp)
		{
			domTmp = jso.gT("p",domTmp)[0]
			if(domTmp && domTmp.firstChild)
			{
				ki.prototype.item.prototype.main.settings.email = /[^	 ]+@[^ 	]+/.exec(domTmp.firstChild.nodeValue)[0];
			}
		}
	}
	ki.prototype.item.prototype.main.comments = eval(GM_getValue("comments","")) || [];
	if(!ki.prototype.item.prototype.main.comments.length)
	{
		ki.prototype.item.prototype.main.comments =
		[
			{
				title:"Prośba o skan dowodu osobistego",
				F:"Uprzejmie proszę Panią o przesłanie skanu dowodu osobistego z zamazanymi krytycznymi danymi pod adres #emailPD# .\nPozdrawiam!",
				M:"Proszę Pana o przesłanie skanu dowodu osobistego pod adres #emailPD# .\nPozdrawiam.",
			},
			{
				title:"Opóźnienie",
				F:"Uprzejmie proszę Panią o kontakt i wyjaśnienie przyczyny opóźnienia w spłacie pożyczki.\n\nPozdrawiam Panią.",
				M:"Niech Pan wyjaśnieni opóźnienie w spłacie!"
			},
			{
				title:"Zaraz windykacja",
				F:"Witam.\nZa #dniDoWindykacji# dni Pani pożyczka trafi do windykacji. Proszę uregulować zadłużenie.\nPozdrawiam.",
				M:"Witam.\nZa #dniDoWindykacji# dni Pana pożyczka trafi do windykacji. Proszę uregulować zadłużenie.\nPozdrawiam.",
			},
			{
				title:"Windykacja email",
				F:"Witam.\nWysłałem do Pani e-mail w sprawie dalszej spłaty pożyczki. Proszę o szybką odpowiedź.\nPozdrawiam.",
				M:"Witam.\nWysłałem do Pana e-mail w sprawie dalszej spłaty pożyczki. Proszę o szybką odpowiedź.\nPozdrawiam."
			},
			{
				title:"Windykacja list",
				F:"Witam.\nWysłałem do Pani list polecony zawierający ostateczne przedprocesowe wezwanie do zapłaty oraz propozycję nowego harmonogramu spłaty długu ( polecam to rozwiązanie ). Jeśli nie odbierze Pani listu lub nie skontaktuje się ze mną sprawa trafi do sądu.\nPozdrawiam.",
				M:"Witam.\nWysłałem do Pana list polecony zawierający ostateczne przedprocesowe wezwanie do zapłaty oraz propozycję nowego harmonogramu spłaty długu ( polecam to rozwiązanie ). Jeśli nie odbierze Pan listu lub nie skontaktuje się ze mną sprawa trafi do sądu.\nPozdrawiam."
			}
		];
	}
}
ki.prototype.item.prototype.editComments = function(action_type,e,tabName)
{
	var T=this;
	if(e)
		jso.sE(e);
	var T = this,Type = action_type;
	var domSelect = this[Type].domCommentsSelect;
	if(domSelect)
	{
		var comment = domSelect.options[domSelect.selectedIndex].value;
	}
	if(this.main.domCeil)
	{
		this.main.domCeil.style.display = "";
	}
	else
	{
		this.main.domCeil = jso.cE("div",{className:"ki_commentsEditor"},0,jso.gT("body")[0])
		var tabs = new this.tabs(this,"main");
		this.createDomTable();
		this.main.listTab = tabs.addTab.call(tabs,"Lista szablonów","Zarządzanie szblonami wiadomości",this.main.domTable);
		this.main.domEditForm = jso.cE("form",{action:"javascript:void(0)",className:"ki_editForm"},[
			jso.cE("p",0,[
				jso.cE("label",0,[
					"Nazwa szablonu:",
					this.main.domEditTitle = jso.cE("input",{type:"text",maxLength:32})
				])
			]),
			jso.cE("p",0,[
				jso.cE("label",0,[
					"Szablon dla kobiety:",
					this.main.domEditF = jso.cE("textarea")
				])
			]),
			jso.cE("p",0,[
				jso.cE("label",0,[
					"Szablon dla mężczyzny:",
					this.main.domEditM = jso.cE("textarea")
				])
			]),
			jso.cE("p",0,[
				jso.cE("label",0,[
					"Szablon ogólny:",
					this.main.domEditO = jso.cE("textarea")
				])
			]),
			jso.cE("p",0,[
				jso.cE("input",{type:"submit",value:"Zapisz"})
			]),
			jso.cE("p",0,[
				"Dostępne zmienne: ",
				jso.cE("strong",0,["#dniDoWindykacji#"]),
				", ",
				jso.cE("strong",0,["#dniDoOstatecznejWindykacji#"]),
				", ",
				jso.cE("strong",0,["#opoznienie#"]),
				", ",
				jso.cE("strong",0,["#nickPB#"]),
				", ",
				jso.cE("strong",0,["#emailPD#"]),
				"."
			])
		],0,{submit:function(e){return T.saveComment.call(T,e)}})
		this.main.editTab = tabs.addTab.call(tabs,"Edycja szablonu","Tutaj możesz edytować szablony wiadomości",this.main.domEditForm);

		this.main.domSettingsForm = jso.cE("form",{action:"javascript:void(0)",className:"ki_editForm"},[
			jso.cE("p",0,[
				jso.cE("label",0,[
					"Twój e-mail:",
					this.main.domSettingsEmail = jso.cE("input",{type:"text",value:this.main.settings.email})
				])
			]),
			jso.cE("p",0,[
				jso.cE("input",{type:"submit",value:"Zapisz"})
			])
		],0,{submit:function(e){return T.saveSettings.call(T,e)}})
		this.main.settingsTab = tabs.addTab.call(tabs,"Ustawienia","Tutaj możesz zmieniać ustawienia skryptu",this.main.domSettingsForm);

		tabs.addButton.call(tabs,jso.cE("strong",{title:"Zamknij"},["x"],0,{click:function(e){T.main.domCeil.style.display = "none";jso.sE(e);return false}}));
	}
	if(comment && tabName == "list")
	{
		this.editComment(false,comment);
	}
	else if(tabName)
	{
		this.main[tabName+"Tab"].activate.call(this.main[tabName+"Tab"]);
	}
}
ki.prototype.item.prototype.createDomTable = function()
{
	var oldDomTable = (this.main.domTable || false),i=0,T=this;
	this.main.domTable = jso.cE("table",{className:"ki_commentsList"},[
		jso.cE("col",{width:50}),jso.cE("col"),jso.cE("col",{width:50}),
		jso.cE("thead",0,[jso.cE("tr",0,[jso.cE("th",0,["Płeć"]),jso.cE("th",0,["Tytuł"]),jso.cE("th",0,["Akcja"])])]),
		jso.cE("tfoot",0,[jso.cE("tr",0,[jso.cE("td",{colSpan:3},[jso.cE("a",{href:"addComment"},["dodaj nowy szablon"],0,{click:function(e){return T.editComment.call(T,e,false)}})])])]),
		this.main.domTableTbody = jso.cE("tbody")
	])
	for(;i<this.main.comments.length;i++)
	{
		var sex = [];
		item = this.main.comments[i];
		if(item.F)
			sex.push("K");
		if(item.M)
			sex.push("M");
		if(item.O)
			sex.push("O");
		jso.cE("tr",{className:(i%2?"ki_inv_tr":"")},
		[
			jso.cE("td",0,[sex.join("/")]),
			jso.cE("td",0,[item.title]),
			jso.cE("td",0,[
				jso.cE("a",{href:"#"+i,title:"Edytuj szablon"},["↯"],0,{click:function(e){return T.editComment.call(T,e,jso.gE(e).href.replace(/^.*#/gi,""))}}),
				jso.cE("a",{href:"#"+i,title:"Usuń szablon"},["x"],0,{click:function(e){return T.removeComment.call(T,e,jso.gE(e).href.replace(/^.*#/gi,""))}}),
			])
		],this.main.domTableTbody)
	}
	if(oldDomTable)
		oldDomTable.parentNode.replaceChild(this.main.domTable,oldDomTable);
}
ki.prototype.item.prototype.editComment = function(e,commentID)
{
	if(e)
		jso.sE(e);
	this.main.editCommentID = commentID;
	this.main.domEditTitle.value = this.main.comments[commentID] ? (this.main.comments[commentID].title || "") : "";
	this.main.domEditF.value = this.main.comments[commentID] ? (this.main.comments[commentID].F || "") : "";
	this.main.domEditM.value = this.main.comments[commentID] ? (this.main.comments[commentID].M || "") : "";
	this.main.domEditO.value = this.main.comments[commentID] ? (this.main.comments[commentID].O || "") : "";
	this.main.editTab.activate.call(this.main.editTab);
}
ki.prototype.item.prototype.saveComment = function(e)
{
	if(e)
		jso.sE(e);
	if(!this.main.editCommentID && this.main.editCommentID !== 0 && this.main.editCommentID !== "0")
		this.main.editCommentID = this.main.comments.length;
	this.main.comments[this.main.editCommentID] = {
		title:this.main.domEditTitle.value,
		F:this.main.domEditF.value,
		M:this.main.domEditM.value,
		O:this.main.domEditO.value
	}
	GM_setValue("comments",uneval(this.main.comments));
	this.createDomTable();
	this.main.commentsTab.activate.call(this.main.commentsTab);
}
ki.prototype.item.prototype.saveSettings = function(e)
{
	if(e)
		jso.sE(e);
	this.main.settings.email = this.main.domSettingsEmail.value;
	GM_setValue("settings",uneval(this.main.settings));
}

ki.prototype.item.prototype.removeComment = function(e,commentID)
{
	if(e)
		jso.sE(e);
	this.main.comments.splice(commentID,1)
	GM_setValue("comments",uneval(this.main.comments));
	this.createDomTable();
}
ki.prototype.item.prototype.createButtons = function(tabs,action_type)
{
	var T=this,Type=action_type;
	tabs.addButton.call(tabs,jso.cE("strong",{title:"Zamknij widok"},["x"],0,{click:function(e){return T.getData.call(T,e,Type);}}));
	tabs.addButton.call(tabs,jso.cE("strong",{title:"Odśwież widok"},["↺"],0,{click:function(e){return T.reloadData.call(T,e,Type);}}));
	tabs.addButton.call(tabs,jso.cE("strong",{title:"Edytuj ustawienia skryptu"},["↯"],0,{click:function(e){return T.editComments.call(T,Type,e,"settings");}}));
}
ki.prototype.item.prototype.loginForm = function(e,action_type)
{
	jso.sE(e);
	var domForm,Type=action_type,T=this;
	domForm = jso.gT("form",this[Type].domCeil)[0]
	if(domForm)
		domForm.style.display = domForm.style.display == "none" ? "" : "none";
	else
	{
		domForm = jso.cE("form",{action:"javascript:void(0)",method:"POST"},[
			jso.cE("p",0,[jso.cE("label",0,["E-mail:",jso.cE("input",{type:"text",name:"handle"})])]),
			jso.cE("p",0,[jso.cE("label",0,["Hasło:",jso.cE("input",{type:"password",name:"passwd"})])]),
			jso.cE("p",0,[jso.cE("input",{type:"submit",value:"zaloguj"})])
		],this[Type].domCeil,{
			submit:function(e)
			{
				return T.reloadData.call(T,e,Type,"handle="+domForm.elements[0].value+"&passwd="+domForm.elements[1].value)
			}
		})
	}
	return false;
}
ki.prototype.item.prototype.reloadData = function(e,Type,postData)
{
	this[Type].AJAX = null;
	if(this[Type].domRow)
		this[Type].domRow.parentNode.removeChild(this[Type].domRow);
	this[Type].domCeil = null;
	this[Type].domRow = null;
	return this.getData(e,Type,postData);
}
ki.prototype.item.prototype.show = function(Type)
{
	var className = this.domRow.className;
	for(var i=0;i<this.types.length;i++)
	{
		className = className.replace("ki_"+this.types[i]+"_active","")
		if(Type == this.types[i] && !this[Type].domRow.style.display)
		{
			className += " ki_"+Type+"_active";
			this[Type].domRow.style.display = "table-row";
		}
		else if(this[this.types[i]].domRow)
		{
			this[this.types[i]].domRow.style.display = "";
		}
	}
	this.domRow.className = className;
}
ki.prototype.item.prototype.tabs = function(item,Type)
{
	this.item = item;
	this.Type = Type;
	this.domTabs = jso.cE("ul",{className:"ki_tabs"},0,this.item[this.Type].domCeil)
}
ki.prototype.item.prototype.tabs.prototype.addTab = function(name,title,content,subname,scroll)
{
	return new this.tab(this,name,title,content,subname,scroll);
}
ki.prototype.item.prototype.tabs.prototype.addButton = function(domElement)
{
	jso.cE("li",{className:"ki_button"},[domElement],this.domTabs)
}
ki.prototype.item.prototype.tabs.prototype.tab = function(tabs,name,title,content,subname,scroll)
{
	var T = this;
	title = title||"";
	subname = subname||"";
	this.tabs = tabs;
	this.name = name;
	this.domTab = jso.cE("li",{className:"ki_tab",title:title},[this.name+subname],this.tabs.domTabs,{click:function(){T.activate.call(T);}})
	this.domConteiner = jso.cE("div",{className:"ki_conteiner"},[content],this.tabs.item[this.tabs.Type].domCeil);
	this.scroll = scroll ? true : false;
	if(!this.tabs.active || this.tabs.item[this.tabs.Type].activeTab == this.name)
		this.activate(true);
}
ki.prototype.item.prototype.tabs.prototype.tab.prototype.activate = function(start)
{
	if(this.tabs.active == this)
		return;
	else if(this.tabs.active)
	{
		this.tabs.active.domTab.className = "ki_tab"
		this.tabs.active.domConteiner.style.display = ""
	}
	this.tabs.active = this;
	if(!start)
		this.tabs.item[this.tabs.Type].activeTab = this.name;
	this.domTab.className = "ki_tab_active"
	this.domConteiner.style.display = "block"
	if(this.scroll)
	{
		this.domConteiner.scrollTop = 99999;
		this.scroll = false;
	}

}
var domTmp = jso.gI("top_up_logged")
if(domTmp)
{
	domTmp = jso.gAV("table",document,"id","moje-pozyczki");
	if(domTmp[0])
		new ki(domTmp[0],"pozyczki");
	if(domTmp[1])
		new ki(domTmp[1],"obserwowane");
	domTmp = jso.gAV("table",document,"id","moje-inwestycje");
	if(domTmp[0])
		new ki(domTmp[0],"iwestycje");
	domTmp = jso.gAV("table",document,"id","aukcje_lista_glowna");
	if(domTmp[0])
		new ki(domTmp[0],"aukcje");
}
})();