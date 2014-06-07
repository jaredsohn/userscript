// ==UserScript==
// @version 2.0.3
// @name Ntut Wireless Login
// @match https://captiveportal-login.ntut.edu.tw/*
// @author KinGhoster
// ==/UserScript==

(function () {
	domain = "captiveportal-login.ntut.edu.tw";
	if (domain == document.domain) {
		stat = getCookie("status");
		console.log("status: " + stat);
		method = window.location.toString().split("/")[5];
		console.log("method: " + method);
		if (method == "cp-ntutcc-profile")
		{
			run(stat);
		}
		else if (method == "logout") 
		{
			replaceUrl();
		}
	}

	function run(stat)
	{
		user = getCookie("user");
		password = getCookie("password");
		console.log("user: " + user);
		
		loginButton = document.getElementsByName("Login")[0];
		
		loginButton.setAttribute('type', 'button');
		loginButton.onclick = function(){submit();};
		if (!(user === undefined || password === undefined))
		{
			document.getElementsByName("user")[0].setAttribute('value', user);
			document.getElementsByName("password")[0].setAttribute('value', password);
			if (stat == "correct") {
				submitForm();
			}
		}

		function submit()
		{
			setCookie("user", document.getElementsByName("user")[0].value);
			setCookie("password", document.getElementsByName("password")[0].value);
			console.log("submit!!!");
			submitForm();
		}

		function submitForm()
		{
			loginButton.style.display = 'none';
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			params = "user=" + document.getElementsByName("user")[0].value + "&password=" + document.getElementsByName("password")[0].value;
			url = "/auth/index.html/u/";
			postURL = url + "?" + params;
			console.log(postURL);
			
			xmlhttp.open("GET", postURL, true);
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4) {
					loginButton.style.display = 'block';
					if(xmlhttp.status == 200)
					{
						check = xmlhttp.responseText[1];
						console.log(xmlhttp.responseText);
						if(check == "!")
						{
							setCookie("status", "correct");
							replaceUrl();
						}
						else if(check == "A")
						{
							replaceUrl();
						}
						else
						{
							setCookie("status", "fail");
							alert("帳號或密碼錯誤!!!");
						}
					}
					else
					{
						alert("error: " + xmlhttp.status);
					}
				}
			};
			xmlhttp.send();
		}
	}

	function getCookie(c_name)
	{
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
	}

	function setCookie(c_name, value, exdays)
	{
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	}

	function getUrlVars()
	{
		vars = [];
		hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	function replaceUrl()
	{
		url = decodeURIComponent(getUrlVars()["url"]);
		document.location.href = url;
		//form = document.createElement("form");
		//form.setAttribute("action", url);
		//form.submit();
	}
})();