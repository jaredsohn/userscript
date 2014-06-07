// ==UserScript==
// @name           Plurk dbcave Ad Remove
// @namespace      http://www.plurk.com/p/
// @description    Remove Ad from Plurk's dbcave
// @include        http://www.plurk.com/p/*
// @version        1.2.0
// ==/UserScript==

setTimeout(function() {

	var _plurk_responses = document.getElementById("plurk_responses");
	
	if (typeof(_plurk_responses) != "undefined" )
	{
		_plurk_responses.style.maxWidth = "100%";
	}

        var _top_header = document.getElementById("top_header");
	
	if (typeof(_top_header) != "undefined" )
	{
		_top_header.style.display = "none";
	}

        var _plurker_info = document.getElementById("plurker_info");
	
	if (typeof(_plurker_info) != "undefined" )
	{
		_plurker_info.style.display = "none";
	}

	//移除人的連結

	var _users = document.getElementsByClassName("user-nick");
	//alert(_users.length);
	for (var _i = 0; _i < _users.length; _i++)
	{
		var _user = _users[_i];
		//alert(_user.href);
		_user.href = null;
		delete _user.href;
		delete _user["href"];
		//_user.href = "";
	}


},0);