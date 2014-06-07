// ==UserScript==
// @name        Web4all Manager - Enhanced Page Title
// @namespace   web4all
// @include     https://manager.web4all.fr/iwal.php*
// @version     1
// ==/UserScript==

function work() {
	var originalTitle = document.title;
	var docTitleNode = document.querySelector(".content-entete-center");
	var prefix = docTitleNode.textContent;
	
	var params = queryParameters();
	var module = params.module;
	var section = params.section;
	var action = params.action;

	if (module == "ticket") {
		if (params.ticket) {
			prefix = "T#"+params.ticket+" " + document.querySelector(".ticket-title").textContent.substr(8);
		} else {
			prefix = "Tickets"
		}
	}
	
	if (module == "service" && action == "list") {
		var inputUser = document.querySelector("select[name=f_id_user]");
		var inputProprio = document.querySelector("select[name=f_id_proprio]");
	
		var searchTxt = document.querySelector("input[name=f_search]").value;
		var searchUser = inputUser.value;
		var searchProprio = inputProprio.value;
		
		var search = [];
		
		if (searchTxt) {
			search.push(trim(searchTxt));
		}
		
		if (searchUser) {
			searchUser = inputUser.options[inputUser.selectedIndex].textContent;
			search.push(trim(searchUser));
		}
		if (searchProprio) {
			searchProprio = inputProprio.options[inputProprio.selectedIndex].textContent;
			search.push(trim(searchProprio));
		}
		
		prefix = "Services";
		
		if (search.length > 0) {
			prefix += "/" + search.join("+");
		}
	}
	
	if (module == "service" && section == "fiche" && action == "view") {
		var serviceName = document.querySelector(".content-entete-center > b").textContent;
		var serviceRef = document.querySelector(".content-entete-center i:nth-of-type(1)").textContent;
		var serviceCode = serviceRef.substr(0, serviceRef.indexOf("-")).substr(0, 4);
		
		prefix = serviceCode + "/" + serviceName;
	}
	
	if (module == "user" && section == "fiche" && action == "view") {
		var userName = document.querySelector(".content_view_in tr:nth-of-type(2) td:nth-of-type(2)").textContent;
		var userSurname = document.querySelector(".content_view_in tr:nth-of-type(3) td:nth-of-type(2)").textContent;
		
		prefix = "User/" + userName + " " + userSurname;
	}
	
	if (module == "proprio" && section == "fiche" && action == "view") {
		var proprioName = document.querySelector(".tableau_view_in tr:nth-of-type(3) td:nth-of-type(2)").textContent;
		var proprioSurname = document.querySelector(".tableau_view_in tr:nth-of-type(4) td:nth-of-type(2)").textContent
		
		prefix = "Proprio/" + proprioName + " " + proprioSurname;
	}
		
	if (prefix) {
		document.title = prefix + " - " + originalTitle;
	}
}

function queryParameters() {
	var search = document.location.search;
	if (search.indexOf('?') === -1) {
		return ({});
	}
	
	search = search.substr(search.indexOf("?") + 1);
	var parts = search.split("&");
	var params = {};
	
	for (var i = 0; i < parts.length; i++) {
		var tokens = parts[i].split("=");
	
		if (tokens.length == 1) {
			params[token] = null;
		} else {
			params[tokens[0]] = tokens[1];
		}
	}

	return (params);
}

function trim(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

work();
