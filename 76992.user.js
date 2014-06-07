// ==UserScript==
// @name          MinCommsy - Commsy to STiNE Switcher
// @description   Automatically switches to STiNE-Account Source on the Main-MinCommsy Page
// @include       htt*://www.mincommsy.uni-hamburg.de/*
// @version       1.0.1
// @author        Wolf
// @date          17.10.2011
// ==/UserScript==

if (document.getElementsByName("auth_source").length > 0) 
{
	var auth = document.getElementsByName("auth_source");

    auth[0].innerHTML = "<select size=\"1\" style=\"font-size:10pt; width:6.5em;\" name=\"auth_source\" tabindex=\"3\">"
    + "<option value=\"509949\">CommSy</option>"
    + "<option value=\"1407077\" selected=\"selected\">STiNE</option>";


}