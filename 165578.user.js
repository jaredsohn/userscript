// ==UserScript==
// @name           PMA OVH
// @namespace      ovh-users
// @include        https://phpmyadmin.ovh.net/*
// @author         Sherbrow
// @description    Example : https://phpmyadmin.ovh.net/?_s=SERVER-NAME&_p=PLAN-NAME
// @version        1.0
// ==/UserScript==

var url = document.location.href;

var serverMatches = /_s=([\w._-]+)/.exec(url);
var planMatches = /_p=([\w._-]+)/.exec(url);

if(serverMatches && serverMatches[1]) {
	var server = serverMatches[1];
	var select_server = document.getElementById('select_server');
	select_server.value = server;
}
if(planMatches && planMatches[1]) {
	var plan = planMatches[1];
	var select_plan = document.getElementById('select_plan');
	select_plan.value = plan;
}

