// ==UserScript==
// @name         Add Steam Nick From Web Page Profile
// @author       wojtek858
// @namespace    http://userscripts.org/scripts/show/166468
// @version      1.02
// @description  Script adds a button on Steam web profile, which allows you to change user nick directly from the page, without adding to friend-list. This is Steam (hidden) native feature.
// @include      /https?://steamcommunity\.com/id/\w+/?$/
// @include      /https?://steamcommunity\.com/profiles/[0-9]+/?$/

// ==/UserScript==

	"use strict";
	
	var logged_in = document.getElementById("account_pulldown");
	if(logged_in) { //are we logged in to Steam Community?
		//get link with language name, e.g. ".../global.js?l=english"
		var lang_link = document.querySelector('head script[src*="http://cdn.steamcommunity.com/public/javascript/global.js"]');
		var kontener = document.getElementById("rightActionBlock"); // right menu section, where we will put the button
		var link_name;
		
		if (lang_link) set_language();
		else { 
			lang_link = document.querySelector('head script[src*="https://steamcommunity.com/public/javascript/global.js"]'); //different link for HTTPS
			if (lang_link) set_language();
		}
		
		if (kontener) {
			var kontent = document.createElement("div"); // object that will contain the code
			//icon encoded in base64
			var img_source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABTElEQVR4nM2RoXLCQBCG9y6bYUIeAlSZMoMhAkR0XHkADHmItoZWUkN9cQgEvq2FF6AIBkc9mMhcQnJ3uYrtpKS+M121s/t/9+8/B/DXxcpuOBwGQcA5/6UoimK1Wi0Wiwrg+/5yuWSMkeJju7U49zyPtsaY0Wi0Xq8BAGnUbDaNMQSkafoymzlOvdvt0sQY02g0SPkNMMYQ0bIsALBtW+bSsnLbtktPan4Azjki7vd7pVSaplmWAcButwMAROx0OmU2vMx3e3dPJoyBUnL88Ehvvb+9lhosY2mt2+3rLMuKojgcPhljrdYVANSdutbaGFMB6JKnyQQA4lgMBje1Wu15OqXTz+ezUqoCSCmFEHRPkgjKIIQgQGstpawAp9MpiiLXdQEgz/N+v4+IcRwTkCTJ8XisfBwihmHY6/XI5LK01pvNZj6flyb/rb4Apw2cAFLU6N4AAAAASUVORK5CYII=";
			//inserted code
			kontent.innerHTML = '<div class="actionItemIcon"><img src="'+img_source+'" border="0" height="16" width="16"></div>\n<a onclick="javascript:ShowNicknameModal();" class="linkActionMinor ">'+link_name+'</a>\n\n';
			kontent.style.marginBottom = "8px"; //some space after our object
			kontener.insertBefore(kontent, kontener.getElementsByTagName('hr')[0]); //insert before first HR tag in our container
		}
	}
	else return;

	function set_language() {
		var pattern = /(?!l\=)[a-z]+$/; //pattern that will choose language name from the link
		var result = pattern.exec(lang_link.src); //extract it
		switch(String(result)) {
			case "english": link_name = "Add nickname"; break;
			case "russian": link_name = "Добавить ник"; break;
			case "french": link_name = "Ajouter un surnom"; break;
			case "german": link_name = "Nickname hinzufügen"; break;
			case "italian": link_name = "Assegna soprannome"; break;
			case "polish": link_name = "Dodaj pseudonim"; break;
			case "spanish": link_name = "Añadir alias"; break;
			case "bulgarian": link_name = "Добавяне на псевдоним"; break;
			case "czech": link_name = "Přidat přezdívku"; break;
			case "danish": link_name = "Tilføj kaldenavn"; break;
			case "dutch": link_name = "Bijnaam toevoegen"; break;
			case "finnish": link_name = "Lisää nimimerkki"; break;
			case "greek": link_name = "Προσθήκη ψευδωνύμου"; break;
			case "hungarian": link_name = "Becenév hozzáadása"; break;
			case "japanese": link_name = "ニックネームを追加"; break;
			case "koreana": link_name = "닉네임 추가"; break;
			case "norwegian": link_name = "Legg til kallenavn"; break;
			case "portuguese": link_name = "Adicionar alcunha"; break;
			case "brazilian": link_name = "Adicionar apelido"; break;
			case "romanian": link_name = "Adaugă poreclă"; break;
			case "schinese": link_name = "添加昵称"; break;
			case "swedish": link_name = "Lägg till smeknamn"; break;
			case "tchinese": link_name = "新增暱稱"; break;
			case "thai": link_name = "เพิ่มชื่อเล่น"; break;
			case "turkish": link_name = "Takma ad ekle"; break;
			default: link_name = "Add Nickname";
		}
	}
