// ==UserScript==
// @name        autoClickMasterDarkthrone
// @namespace   http://www.kicarro.com
// @include     http://rivendale.freeiz.com/vote.php*
// @include     *darkthrone.com/recruiter/outside/*
// @version     1
// ==/UserScript==

if (location.host == "rivendale.freeiz.com")
{
	function executa () {
		if (GM_getValue("autoClickMasterDarkthroneResultadoLinkClicado", "") != "" && GM_getValue("autoClickMasterDarkthroneResultadoLinkClicado", "") != "skiplink" && GM_getValue("autoClickMasterDarkthroneLinkClicado", "") != "" && GM_getValue("autoClickMasterDarkthroneLinkClicado", "").split("?")[0] == GM_getValue("autoClickMasterDarkthroneLink", ""))
		{
			document.getElementsByName("r_text")[0].value = GM_getValue("autoClickMasterDarkthroneResultadoLinkClicado", "");
			GM_setValue("autoClickMasterDarkthroneResultadoLinkClicado", "");
			GM_setValue("autoClickMasterDarkthroneLinkClicado", "");
			if (document.getElementsByName("voter_id")[0].value == "(choose username)")
			{
				alert("Please select your username and the automatic report will start on the next link");
				return;
			}
			document.getElementsByName("SubmitCommand")[0].click();
		} else if (GM_getValue("autoClickMasterDarkthroneResultadoLinkClicado", "") == "skiplink" && GM_getValue("autoClickMasterDarkthroneLinkClicado", "") != "" && GM_getValue("autoClickMasterDarkthroneLinkClicado", "") == GM_getValue("autoClickMasterDarkthroneLink", ""))
		{
			GM_setValue("autoClickMasterDarkthroneResultadoLinkClicado", "");
			GM_setValue("autoClickMasterDarkthroneLinkClicado", "");
			document.getElementsByName("DoSkipp")[0].click();
		} else if (document.body.innerHTML.indexOf("Click next group") > 0)
		{
			document.getElementsByName("ClickBTN")[0].click();
		} else {
			setTimeout(executa, 100);
		}
	}
	if (document.getElementsByName("DoCont").length > 0)
	{
		document.getElementsByName("DoCont")[0].checked = true;
	}
	var as = document.getElementsByTagName("a");
	for (var iter=0; iter < as.length; iter++)
	{
		if(as[iter].href.indexOf("darkthrone.com/recruiter/outside/") > 0) {
			GM_setValue("autoClickMasterDarkthroneLink", as[iter].href);
			break
		}
	}
	window.onbeforeunload = function() {
		GM_setValue("autoClickMasterDarkthroneLink", "");
		GM_setValue("autoClickMasterDarkthroneResultadoLinkClicado", "");
		GM_setValue("autoClickMasterDarkthroneLinkClicado", "");
	}
	executa();
}
if (location.host.indexOf("darkthrone.com") >= 0) {
	if (document.body.innerHTML.indexOf("You can only be recruited once per day into") > 0 || document.body.innerHTML.indexOf("has recruited too many people today.") > 0 ||
	document.body.innerHTML.indexOf("is on vacation and cannot be recruited.") > 0 )
	{
		GM_setValue("autoClickMasterDarkthroneResultadoLinkClicado", "skiplink");
		GM_setValue("autoClickMasterDarkthroneLinkClicado", location.href);
	} else if (document.body.innerHTML.indexOf("You have just increased") > 0)
	{
		GM_setValue("autoClickMasterDarkthroneResultadoLinkClicado", document.getElementById("population_increase").innerHTML);
		GM_setValue("autoClickMasterDarkthroneLinkClicado", location.href);
	}
}