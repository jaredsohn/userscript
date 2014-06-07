// ==UserScript==
// @author        Jerre Louis
// @name          ICICI Personal Login
// @description   Directs you directly to the ICICI Personal Login page when a request is made to www.icicibank.com
// @include       http://www.icicibank.com/
// ==/UserScript==

if(document.location == "http://www.icicibank.com/")
	window.location = "https://infinity.icicibank.co.in/Login.jsp"