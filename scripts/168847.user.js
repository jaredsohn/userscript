// ==UserScript==
// @name           Cheater V3
// @namespace      Hans Goedegebuure
// @include        http://www.camorraworld.nl/*
// @include        http://www2.camorraworld.nl/*
// @include        http://www3.camorraworld.nl/*
// @include        http://www.camorraworld.org/*
// @include        http://jail.camorraworld.nl/*
// ==/UserScript==
// Op dit script zijn de voorwaarden van www.hansgoed.nl van toepassing
var plaatjes, img, script, listenersSet;
version = "0.10";
debug = 0;
servers = new Array("http://www.hansgoed.nl");
pagesArray = new Array("/sys/humanvalidation.php", "/user/dashboard.php", "/user/facebook_dashboard.php","/crime/light.php",
"/crime/medium.php", "/crime/drivinglesson.php", "/crime/gta.php", "/crime/drivinglesson.php", "/crime/killpractice.php",
"/cw/hospital.php", "/crime/deal_drugs.php", "/business/coke-info.php", "/business/coke.php", "/crime/junkies.php", "/user/cash.php", 
"/intranet/criminalbrowser/"); //Last one is not real, but it's a workaround for problems with vip menus

/*	Log out when logOutTime is later than the actual time
    If not, start the precheck (captcha finding etc.)
    When all that goes correct, start doing the crimes
*/
if (!(GM_getValue('meldingGegeven', false)))
{
    GM_setValue('meldingGegeven', true);
    alert("Verwijder V2 voor je met V3 (0.09 en hoger) aan de slag gaat.");
}

if (parseInt(GM_getValue("logOutTime", "99999999999999")) > new Date().getTime()){
    makeMenu();
    start();
}
else {
    GM_deleteValue("logOutTime");
    window.location.pathname = "/sys/login.php?dologout";
}
function start(){
    try{
        startActual();
    }
    catch(e){
        if (!debug){
            setTimeout(start, 1000);
        }
        else{
            alert(e);
        }
    }
}
function startActual(){
	if (preCheck()){
            init();
		//startCrimes();
	}
}
function output(id, errText){ // returnvalue: (string) text to output
	/* 	Return text to output
		We select the array by the selected language
		Then we select the correct message and return it
	*/
       checked1 = (getSetting("showTimes", "0") == "1") ? "checked" : ""; // show waittimes

	lang = getSetting('language', "1");
	switch (lang){
		default:
			// NL; Dutch;

			texts = Array(
				"Verdacht plaatje gevonden op de pagina.", // 0
				"Kon jou unieke userId niet vinden.. Probeer eens te updaten.", //1
				"De server gaf een niet-geldig antwoord. Meld mij dit alsjeblieft op: " + servers[0], //2
				"Instellingen", //3
                "<span style=\"color: red;\">Er is een nieuw tabblad geopend met daarop de instellingen. Zorg ervoor dat je dit afgesloten hebt voor je account op lockdown gaat.</span>", //4
				"CAPTCHA systeem",//5
                "Om mee te doen aan het captcha systeem maak je op <a style=\"color: #FF0000;\" target=\"blank\" href=\"" + servers[0] + "\">" + servers[0] + "</a> een account aan.<br/>Vervolgens ga je naar de instellingen (nieuw tabblad) en klik je \"cheater instellingen\".<br/>Vul op deze pagina de gegevens van het zojuist gemaakte account in.<br/>(lukt het je niet omdat je de instellingen niet ziet of ze verdwijnen zet dan cheater v2 uit)", //6
				"Overzicht", //7
                "Geweldige dingen die je behaald hebt door vals te spelen..", //8
				"Handmatig oplossen vereist. Voor meer informatie bekijk de cheater instellingen.", //9
				"<div id=\"cbs\"><div class=\"cb\"><h1>Verander hier je instellingen</h1><p><button id=\"crimeSettings\">Crimes keuze</button><button id=\"cheaterSettings\">Cheater instellingen</button></div><div id=\"settingsDiv\" class=\"cb domargin\" style=\"display:none;\"></div></div>", //10
				"Hoe laat wil je uitloggen? (heel uur (0-23))", //11
				"De server antwoordde met een error, breng mij hier alsjeblieft van op de hoogte. Het volgende bericht is wat je dan aan me door moet geven: " + errText, //12
				"De gebruikersnaam en wachtwoord combinatie komt niet voor in mijn database", //13
				"Je captcha-krediet is op. Koop alsjeblieft nieuw krediet, of schakel captcha solving uit", //14
				"Mijn database is niet bereikbaar op dit moment", //15
				"Het script stuurde een niet geldig verzoek naar de server", //16
				"De captcha solving services deden er te lang over deze captcha op te lossen", //17
				"Jouw versie " + version, //18
                "<h1>De uitgebreide instellingen mbt tot de cheater zelf</h1><h2>Captcha solver instellingen</h2><p><span style=\"color: green;\" id=\"saved\"></span><p>Gebruikersnaam: <input type=\"text\" id=\"uName\" value=\"" + getSetting("username", "") + "\" /><br />Wachtwoord: <input type=\"password\" id=\"pWord\" /><br /><input type=\"submit\" id=\"checkPW\" value=\"Controleer gebruikersnaam en wachtwoord\" /><br /> Aantal pogingen voor oplossen overhouden: <input id=\"maxTries\" type=\"text\" value=\"" + getSetting("maxTries", "2") + "\" title=\"4 betekent dat maar 1 van de 5 pogingen gebruikt wordt. -1 is alle pogingen gebruiken en doorgaan (nog niet getest)\" /> (2 is aangeraden, max 4)<h2>Taal</h2><p>Verander je taal <select id=\"lang\"><option value=\"1\" SELECTED>Nederlands</option><option value=\"2\">Engels</option></select><h2>Wachttijden</h2><p>Wachttijden weergeven <input type=\"checkbox\" id=\"waitTimes\" " + checked1 + "/><h2>Netwerk instellingen</h2><p>Wachttijd voor ophalen lijst van veilige afbeeldingen: <input id=\"imgUpd\" type=\"text\" value=\"" + getSetting("imgUpdateTime", "60") + "\" /> minuten<br/>Wachttijd voor ophalen berichten van mij, voor jou: <input id=\"msgUpd\" type=\"text\" value=\"" + getSetting("msgUpdateTime", "60") + "\" /> minuten<br/><input type=\"button\" id=\"ok\" value=\"Opslaan\" /><br />Als je problemen hebt, update dan v2.<h2>Reset alle instellingen</h2><p>Wanneer je problemen hebt met de instellingen kun je deze volledig verwijderen en daarna alles opnieuw instellen.<br/><input type=\"submit\" id=\"reset\" value=\"Resetten\" />", //19
                "Resetten voltooid", //20
                "Automatisch uitloggen", //21
                "<h1>De standaard crimes instellingen</h1>", //22
                "Je vroeg niet-bestaande opties op", //23
                "Autopauze aangezet. Ga naar de pagina van een van de misdaden om door te gaan", //24
                "<h1>Wachttijden</h1><p><form id=\"WAITTIMES_BOARD\" name=\"WAITTIMES_BOARD\"><table><tr><td width=\"180\"><a href=\"/crime/light.php\">Overval plegen</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellermisdaad\" name=\"countdownsteel\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>\n\<td width=\"180\"><a href=\"/cw/ammo.php\">Ammo handelen</a></td> <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerammo\" name=\"countdownAm\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td> </tr><tr>   \n\                 <td width=\"180\"><a href=\"/crime/drivinglesson.php\">Rijles nemen</a></td>                \n\    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerRi\" name=\"countdownRi\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>       \n\         <td width=\"180\"><a href=\"/crime/job-duo.php\">Moord - Duo Job</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerduo\" name=\"countdownDuo\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>       \n\         </tr>                <tr><td width=\"180\"><a href=\"/crime/killpractice.php\">Moord - Oefening</a></td>                    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellersingle\" name=\"countdownSingle\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>            \n\        <td width=\"180\"><a href=\"/crime/job-advanced.php\">Moord - Multi Job</a></td>                    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellermulti\" name=\"countdownMulti\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>                </tr>                <tr>       \n\             <td width=\"180\"><a href=\"/crime/gta.php\">Grand Theft Auto</a></td>                    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerauto\" name=\"countdownauto\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td><td width=\"180\"><a href=\"/crime/kill.php\">Vermoorden</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerkill\" name=\"countdownK\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>  </tr>\n\<tr>    <td width=\"180\"><a href=\"/crime/popo.php\">Popo Paffen</a></td>   <td align=\"center\" width=\"135\"><input type=\"text\" id =\"tellerPo\" name=\"countdownPo\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>   <td width=\"180\"><a href=\"/business/coke-info.php\">Coke runnen</a></td>  \n\ <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellercoke\" name=\"countdowncoke\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>  </tr>\n\ <tr> <td width=\"180\"><a href=\"/cw/airport.php\">Reizen</a></td> <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerflight\" name=\"countdownFli\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td><td width=\"180\"><a href=\"/re/panicroom.php\">Panic Room</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerP\" name=\"countdownP\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td></tr><tr><td width=\"180\"><a href=\"/crime/junkies.php\">Junk beschikbaar</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerJunk\" name=\"countdownJunk\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td><td width=\"180\"></td> <td align=\"center\" width=\"135\"></td></tr></table> </form>", //25
                "Gereed", //26
                "Instellingen opgeslagen", //27
                "De captcha solving service vertoont problemen", //28
                "<font color=\"red\">Het max aantal pogingen mag alleen van -1 t/m 4 zijn</font>", //29
                "<font color=\"red\">De tijd tussen het updaten van de berichten of veilige plaatjes moet 10 minuten of langer zijn</font>" //30
			);
			break;
		case "2":
			// ENG; English;
			texts = Array(
				"Suspicious image found on the page.", //0
				"Could not find your unique ID. Please try updating..", //1
				"The server did not give a valid response. Please tell me about this problem on: " + servers[0], //2
				"Settings", //3
                "<span style=\"color: red;\">A new tab has been opened containing all settings. Make sure you close this tab before your account will lockdown.</span>", //4
				"CAPTCHA system", //5
                "To join the captcha system, create an account at <a style=\"color: #FF0000;\" target=\"blank\" href=\"" + servers[0] + "\">" + servers[0] + "</a>.<br/>Then you click settings (opens in a new tab). After that click \"cheater settings\".<br/>Enter the info of the created account there.<br/>(If your settings keep disappearing disable cheater v2)", //6
				"Overview", //7
                "An overview of all the great things you have accomplished by cheating", //8
				"Manual solving is required. For more information see the cheater's settings.", //9
				"<div id=\"cbs\"><div class=\"cb\"><h1>Change your settings here</h1><p><button id=\"crimeSettings\">Crimes choice</button><button id=\"cheaterSettings\">Cheater settings</button></div><div id=\"settingsDiv\" class=\"cb domargin\" style=\"display:none;\"></div></div>", //10
				"What time do you want to log out? (whole hour (0-23))", //11
				"The server returned an error, please inform me about this. The next message you will receive is the information I would like to know: " + errText , //12
				"The username and password combination doesn't exist in my database", //13
				"You ran out of credit. Please buy new or disable captcha solving", //14
				"My database is currently not available", //15
				"The script sent an invalid request to the server", //16
				"The captcha solving services took too long to solve this captcha", //17
				"Your version " + version, //18
                "<h1>Cheater settings</h1><h2>Captcha solver settings</h2><p><span style=\"color: green;\" id=\"saved\"></span><p>Username: <input type=\"text\" id=\"uName\" value=\"" + getSetting("username", " ") + "\" /><br />Password: <input type=\"password\" id=\"pWord\" /><br />Number of tries for solving to keep: <input id=\"maxTries\" type=\"text\" value=\"" + getSetting("maxTries", "2") + "\" title=\"4 means that one of the 5 tries will be used. -1 means trying the max 5 times and then continue (not tested yet)\" /> (2 is recommended, max 4)<h2>Language</h2><p>Change your language <select id=\"lang\"><option value=\"1\">Dutch</option><option value=\"2\" SELECTED>English</option></select><h2>Waittimes</h2><p>Show waittimes <input type=\"checkbox\" id=\"waitTimes\" " + checked1 + "/><h2>Network settings</h2><p>Waittime for updating the list of safe images: <input id=\"imgUpd\" type=\"text\" value=\"" + getSetting("imgUpdateTime", "60") + "\" /> minutes<br/>Waittime for retrieving messages by me, for you: <input id=\"msgUpd\" type=\"text\" value=\"" + getSetting("msgUpdateTime", "60") + "\" /> minutes<br/><input type=\"button\" id=\"ok\" value=\"Save\" /><h2>Reset all settings</h2><p>When you are experiencing problems with the settings you can erase them completely to try again.<br/><input type=\"submit\" id=\"reset\" value=\"Reset\" />", //19
                "Reset completed", //20
                "Auto logout", //21
                "<h1>Crimes settings</h1>", //22
                "You asked for non-existing options", //23
                "Autopause turned on. Go to crime page to continue", //24
                "<h1>Waiting times</h1><p><form id=\"WAITTIMES_BOARD\" name=\"WAITTIMES_BOARD\"><table><tr><td width=\"180\"><a href=\"/crime/light.php\">Commit robbery</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellermisdaad\" name=\"countdownsteel\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>\n\<td width=\"180\"><a href=\"/cw/ammo.php\">Ammo trafficking</a></td> <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerammo\" name=\"countdownAm\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td> </tr><tr>   \n\                 <td width=\"180\"><a href=\"/crime/drivinglesson.php\">Driving lessons</a></td>                \n\    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerRi\" name=\"countdownRi\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>       \n\         <td width=\"180\"><a href=\"/crime/job-duo.php\">Kill - Duo Job</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerduo\" name=\"countdownDuo\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>       \n\         </tr>                <tr><td width=\"180\"><a href=\"/crime/killpractice.php\">Kill - Practice</a></td>                    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellersingle\" name=\"countdownSingle\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>            \n\        <td width=\"180\"><a href=\"/crime/job-advanced.php\">Kill - Multi Job</a></td>                    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellermulti\" name=\"countdownMulti\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>                </tr>                <tr>       \n\             <td width=\"180\"><a href=\"/crime/gta.php\">Grand Theft Auto</a></td>                    <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerauto\" name=\"countdownauto\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td><td width=\"180\"><a href=\"/crime/kill.php\">Kill - Murder</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerkill\" name=\"countdownK\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>  </tr>\n\<tr>    <td width=\"180\"><a href=\"/crime/popo.php\">Cappin' Cops</a></td>   <td align=\"center\" width=\"135\"><input type=\"text\" id =\"tellerPo\" name=\"countdownPo\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>   <td width=\"180\"><a href=\"/business/coke-info.php\">Run Coke</a></td>  \n\ <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellercoke\" name=\"countdowncoke\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td>  </tr>\n\ <tr> <td width=\"180\"><a href=\"/cw/airport.php\">Travel</a></td> <td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerflight\" name=\"countdownFli\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td><td width=\"180\"><a href=\"/re/panicroom.php\">Panic Room</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerP\" name=\"countdownP\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td></tr><tr><td width=\"180\"><a href=\"/crime/junkies.php\">Junk available</a></td><td align=\"center\" width=\"135\"><input type=\"text\" id=\"tellerJunk\" name=\"countdownJunk\" class=\"secwindow.teller_wachttijden\" value=\"processing\" size=10></td><td width=\"180\"></td> <td align=\"center\" width=\"135\"></td></tr></table> </form>", //25
                "Ready", //26
                "Settings saved", //27
                "The captcha solving service is malfunctioning", //28
                "<font color=\"red\">The maximum number of tries must be within -1 to 4</font>", //2
                "<font color=\"red\">The time between updates of messages or safe images must be 10 minutes or longer</font>" //30
			);
			break;
	}
	if (id < texts.length){
		return texts[id];
	}
	else {
		switch (lang){
			case "1":
				return "Geen bestaande vertaling gevonden";
				break;
			case "2":
				return "No existing translation found";
				break;
		}
	}
}

function preCheck(){ // returnvalue: (bool) successful precheck
        /*      Is this page cheatable?
                If the current page is not in the array (only crimes pages are in that array)
                    - Maximize the frame
                    - Display a message and pause
        */
	if (pagesArray.indexOf(document.location.pathname) < 0){
		maximize();
		contentFrame.innerHTML = output(24);
                pauze();
		return false;
	}
	/* 	Populate local database
		Get trusted images from server
	*/
	if ((parseInt(GM_getValue('imgUpdate','0'))) < (new Date().getTime() - (parseInt(GM_getValue("imgUpdateDelay", '60'))) * 60000)){
		if (request(0, 0, servers[0])){
			GM_setValue('imgUpdate', new Date().getTime().toString());
		}
	}
	// Get messages from server
	if ((parseInt(GM_getValue('msgUpdate','0'))) < (new Date().getTime() - (parseInt(GM_getValue("msgUpdateDelay", '60'))) * 60000)){
		if (request(0, 2, servers[0])){
			GM_setValue('msgUpdate', new Date().getTime().toString());
		}
	}

	/* 	Check for an existing Captcha.
		Also check for results of a previous recognition try
		If there is another captcha report a made mistake.
	*/
	if (captureCaptcha()){		
            num = parseInt(getSetting("captchTries", "5"));
            if (num != 5 && getSetting("lastId", false)){
                request(0, 3, servers[0]);
            }
            if (num > parseInt(getSetting("maxTries", "2")) && (getSetting('username', false)!= false)){
                    request(0, 1, servers[0]);
            }
            else {
                    alert(output(9));
            }
            return false;
	}
	else {
		saveSetting("captchTries", "5");
		removeSetting("lastId");
                removeSetting("triedAnswers");
	}
	/* 	Check anti-cheat for extra security
		Simply check for all the images URLs and hashes on the page, and compare them to our database.
		For the speed of the database and no annoying alertboxes, external URLs are left out.

		I am looking for an other solution. If you think you know something better, please tell me via my website.
		(You can find the url at the top of the source, it's the first server)
	*/
	return true;
}

/*	Settings per user
	First we find the local ID from an array of 'camorra world IDs'
	Then we get the settings. These are an array.
	We get the right setting.

	Or we save them with the saveSetting function
*/
function getSetting(settingName, defaultValue){ // returnvalue: correct setting
    accountId = getUID();
    if (defaultValue == null)
    {
        return GM_getValue(settingName + "_" + accountId);
    }
    return GM_getValue(settingName + "_" + accountId, defaultValue);
}
function saveSetting(settingName, value){
	accountId = getUID();
	GM_setValue(settingName + "_" + accountId, value);
}
function removeSetting(settingName){
	accountId = getUID();
	GM_deleteValue(settingName + "_" + accountId);
}
/* 	Get userId by grabbing the personal homepagelink.
	This contains a number that is the userId.
	This information is accessible from every page.

	I use this for reference to personal options
*/
function getUID(){ // returnvalue: (string) userId
	links = document.getElementsByTagName("a");
	for (numba = 0; numba < links.length; numba++){
		if (links[numba].href.indexOf("/cw/criminal.php?id=") > -1){
			return links[numba].href.replace("http://" + window.location.hostname + "/cw/criminal.php?id=", "");
		}
	}
	if (numba == links.length){
		GM_log("Please log in");
		return false;
	}
        return false;
}

/* 	All the menu functions
	I guess they speak for themselves, if not, check your css knowledge
*/
function makeMenu(){
	GM_addStyle("\
		#menuDiv {height: 100px; width: 100%; position: fixed; bottom: 0px; background-color: #DDDDDD;}\
	 	#contentDiv {height: 100%; width: 100%; display: block;}\
	 	#contentFrame {float: right; width: 79%;}\
		#menuSelect {background-color: #DDDDDD; border: 0px; width: 20%; height: 80px;}\
		#extraFilling {height: 100px;}\
		#messageBox {color: #DDDDDD;}\
		#messageBar {width: 100%; height: 20px; background-color: #454545; padding-left: 3px;}\
		#minimizeButton {float: right;}\
		#versionSpace {float: right; color: #DDDDDD;}\
	");
	
	text = "<div id=\"messageBar\"><span id=\"messageBox\">CW cheater V3 &copy; Hans Goedegebuure 2011</span><img id=\"minimizeButton\" src=\"data:image/gif;base64,R0lGODlhFAAUAOYAAAAAAP///9vb29jY2NfX19TU1NPT09HR0c/Pz87Ozs3NzczMzMnJycjIyMfHx8XFxcTExMLCwr+/v76+vry8vLq6urm5ubi4uLe3t7a2trW1tbS0tLOzs7KysrGxsbCwsK6urq2traysrKurq6qqqqmpqaioqKampqWlpaSkpKOjo6KioqCgoJ+fn56enp2dnZeXl5aWlpWVlZSUlJOTk5GRkY+Pj46OjoyMjImJiYeHh4WFhYKCgoGBgXx8fHt7e3p6enh4eHd3d3Nzc3FxcW9vb25ubm1tbWhoaGdnZ2VlZWNjY2JiYlxcXFpaWllZWVdXV1JSUlBQUExMTEpKSkVFRUFBQUBAQD8/Pzs7Ozk5OTc3NzQ0NDMzMzAwMC8vLyoqKikpKSgoKP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGMALAAAAAAUABQAAAfwgAYEAwQGB4eIiQkNEhsoCAYFBggLlZaXjBwoNgwKCQsOEKKjpBMcJzVCERAPERQXsLGxGB0oNEBLFRUWGiAlv8DAJio1P0pRGRoeISgsLc/Q0DE8Rk5UGRseIinR3S4yPUfW2Noo3dHf4eMZvB8j7/DwJCo0P+MWAvn6+/wa9/wA9234FzCgv2vsNLiLF2/eDB/jlDE7B+0btYjaUrjYyLHjDHVUPICYB+OGyZModwxhEqWKiRUxdAQpYqSmTZtJnkyxouUFDiBInkgZSrQoFSxbunjJQaQJlSxcokqd6iWMGDFgiEC58uWq169grwYCADs=\"></img><span id=\"versionSpace\">" + output(18) + "&nbsp;&nbsp;</span></div>";
	
	menu = document.createElement("div");
	menu.id = "menuDiv";
	menu.innerHTML = text;

	contentDiv = document.createElement("div");
	contentDiv.id = "contentDiv";

	contentFrame = document.createElement("div");
	contentFrame.id = "contentFrame";

	menuSelect = document.createElement("select");
	menuSelect.id = "menuSelect";
	menuSelect.size = "4";
	menuSelect.innerHTML = "<option value=1>" + output(3) + "</option><option value=2>" + output(5) + "</option><option value=3>" + output(7) + "</option><option value=99>" + output(21) + "</option>";
	menuSelect.addEventListener("change", displayContent, false);

	extraFilling = document.createElement("div");
	extraFilling.id="extraFilling";

	contentDiv.appendChild(menuSelect);
	contentDiv.appendChild(contentFrame);
	menu.appendChild(contentDiv);
	document.body.appendChild(menu);
	document.body.appendChild(extraFilling);

	minimizeButton = document.getElementById("minimizeButton");
	minimizeButton.addEventListener("click", minimize, false);

	setInterval(rotateMessages, 20000);
	displayContent();
	if (getSetting("minimizedStatus", false) == true){
		minimize();
	}
}

function minimize(){
	saveSetting("minimizedStatus", true);
	menu.style.height = "20px";
	extraFilling.style.height = "20px";
	minimizeButton.src = "data:image/gif;base64,R0lGODlhFAAUAOYAAAAAAP///9vb29jY2NfX19TU1NPT09HR0c/Pz87Ozs3NzczMzMnJycjIyMfHx8XFxcTExMLCwr+/v76+vry8vLq6urm5ubi4uLe3t7a2trW1tbS0tLOzs7KysrGxsbCwsK+vr66urq2traysrKurq6qqqqmpqaioqKampqWlpaSkpKOjo6KioqCgoJ+fn56enp2dnZycnJeXl5aWlpWVlZSUlJOTk5GRkY+Pj46OjoyMjImJiYeHh4WFhYKCgoGBgXx8fHt7e3p6enh4eHd3d3Nzc3FxcW9vb25ubm1tbWhoaGdnZ2VlZWNjY2JiYl9fX1xcXFpaWllZWVdXV1JSUlBQUExMTEpKSkVFRUFBQUBAQD8/Pzs7Ozk5OTc3NzQ0NDMzMzAwMC8vLyoqKikpKSgoKP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGYALAAAAAAUABQAAAf/gAYEAwQGB4eIiQkNEhspCAYFBggLlQiXCpULjBwpOAwKCQsOEBAOAqgNpRATHCg3RBEQDxEUFxcUqAITtxgdKTZCTRUVFhohJiYguh3JJys3QUxUGRoeIiktLii6JS7fMz5IUVcZGx4jKt/cqN4uLzQ/SeTm6Cnr3d/w8vQZxh8kSHjQxSFgiRU2gtCzoKuhQ10aFj6ciGqDRIoPI5bzpwGgQIIGV9QAQs8aNnzt9NEQVxKdihcvUugyAfNFDX5XPIQ4KCNHDhm6YvjM0aOIEypYTrCYwWPIESRBdP1AQnWJFCtZusDQIUSJlCpVoqwY+wRslStbvIAJs8MIlCtcFr7InUs3DJkyZcYYmaJFDN6/gAPjDQQAOw==";
	if (listenersSet){
		minimizeButton.removeEventListener("click", minimize, false);
	}
	minimizeButton.addEventListener("click", maximize, false);
	listenersSet = true;
}
function maximize(){
	saveSetting("minimizedStatus", false);
	menu.style.height = "100px";
	extraFilling.style.height = "100px";
	minimizeButton.src = "data:image/gif;base64,R0lGODlhFAAUAOYAAAAAAP///9vb29jY2NfX19TU1NPT09HR0c/Pz87Ozs3NzczMzMnJycjIyMfHx8XFxcTExMLCwr+/v76+vry8vLq6urm5ubi4uLe3t7a2trW1tbS0tLOzs7KysrGxsbCwsK6urq2traysrKurq6qqqqmpqaioqKampqWlpaSkpKOjo6KioqCgoJ+fn56enp2dnZeXl5aWlpWVlZSUlJOTk5GRkY+Pj46OjoyMjImJiYeHh4WFhYKCgoGBgXx8fHt7e3p6enh4eHd3d3Nzc3FxcW9vb25ubm1tbWhoaGdnZ2VlZWNjY2JiYlxcXFpaWllZWVdXV1JSUlBQUExMTEpKSkVFRUFBQUBAQD8/Pzs7Ozk5OTc3NzQ0NDMzMzAwMC8vLyoqKikpKSgoKP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGMALAAAAAAUABQAAAfwgAYEAwQGB4eIiQkNEhsoCAYFBggLlZaXjBwoNgwKCQsOEKKjpBMcJzVCERAPERQXsLGxGB0oNEBLFRUWGiAlv8DAJio1P0pRGRoeISgsLc/Q0DE8Rk5UGRseIinR3S4yPUfW2Noo3dHf4eMZvB8j7/DwJCo0P+MWAvn6+/wa9/wA9234FzCgv2vsNLiLF2/eDB/jlDE7B+0btYjaUrjYyLHjDHVUPICYB+OGyZModwxhEqWKiRUxdAQpYqSmTZtJnkyxouUFDiBInkgZSrQoFSxbunjJQaQJlSxcokqd6iWMGDFgiEC58uWq169grwYCADs=";
	if (listenersSet){
		minimizeButton.removeEventListener("click", maximize, false);
	}
	minimizeButton.addEventListener("click", minimize, false);
	listenersSet = true;
}

/*	The menu needs its content.
	This function reads the last opened content so it will be the same after a page switch

	This also handles clicks in the menu (which is a select element)
	It saves the target as the last opened content and opens it.
*/
function displayContent(){
	if (this.id == "menuSelect"){
		display = parseInt(this.value);
		if (display == 99){ // use one of the menu's values as button
			setLogOutTime();
			return;
		}
		if (display == 1){
                    pauze();
                
                    document.getElementById("contentbar_main").innerHTML = output(10);
                    document.getElementById("crimeSettings").addEventListener("click", setCrimes, false);
                    document.getElementById("cheaterSettings").addEventListener("click", setSettings, false);
		}
		if (display != 1){
			saveSetting("menuContent", display);
		}
	}
	else {
		display = getSetting("menuContent", 2);
	}
	switch (display){
		case 1:
			contentText = output(4);
			break;
		case 2:
			contentText = output(6);
			break;
		case 3:
			contentText = output(8);
			break;
		default:
			contentText = output(23);
			break;
	}
	contentFrame.innerHTML = contentText;
}

/*	A function for finding the image that is the captcha
	It is very weak, but it does the job
*/
function captureCaptcha(){
	plaatjes = document.getElementsByTagName('img');
	i = 0;
	while (i < plaatjes.length){
		if (plaatjes[i].src.indexOf("/sys/captcha/captcha.php") > -1){
			return true;
		}
		i++;
	}
	return false;
}

/* 	A very useful function not made by me.
	It converts an image into a base64 hash, which can be sent over the web..
*/
function getBase64Image(img) {
    if (!img){
        return false;
    }
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL("image/jpeg");
}

/*	I've had problems with the captcha getting turned into a string before it was loaded
	For that this function comes in.

	This function is called while making a solve request, and will abort it if the image is not loaded
	After one second it will be restarted, and if the image is loaded, the function continues
*/
function checkComplete(img){
	if (!img.complete){
		setTimeout(preCheck, 1000);
		GM_log("Waiting for image to complete");
		return false;
	}
	num = parseInt(getSetting("captchTries", "5"));
	saveSetting("captchTries", --num);
	return true;
}

/*	Display different messages in the messageBox (in the bar)
	Because I like my name so much it's displayed for 20 seconds every pageload
	After these 20 seconds this function is called. It will replace it with a locally stored string.
	Every 20 seconds this gets repeated so all the strings have had their turn, and it will go back to number 0
*/
function rotateMessages(){
	messageNum = GM_getValue("activeMessage", 0);
	messages = GM_getValue("message", "CW cheater V3 &copy; Hans Goedegebuure 2011").toString().split(",");
	if (messageNum < messages.length - 1){
		messageNum++;
	}
	else {
		messageNum = 0;
	}
	if (messages.length > 0){
		GM_setValue("activeMessage", messageNum);

		messageBox = document.getElementById("messageBox");
		messageBox.innerHTML = messages[messageNum];
	}
}

/*	Everything needed for processing an HTTP request.
	All the data that is retrieved from another pages is handled through here.

	-	makeRequest gathers the data and puts it to a string
	-	Request sends the actual data.
	-	handleResponse catches the server's response and uses it
	-	handleError retries the request with the next server until all of them are tried.
	getBase		Ofcourse that only happens when the previous server failed
*/

function request(location, type, server){ // no returnvalue
	locations = new Array(server + "/cheaterv3/index.php");
	dataString = makeRequest(type);
	if (!dataString){
		return false;
	}
	GM_xmlhttpRequest({
		method: 'POST',
		headers: {'Content-type':'application/x-www-form-urlencoded'},
		url: locations[location],
		data: dataString,
		onload: function (resp){handleResponse(resp, type)},
		onerror: handleError
	});
	return true;
}
function handleError(){
	if ((server + 1) < (servers.length)){
		thisServer = servers[server];
		nextServer = servers[server + 1];
		GM_log("Failed to retrieve " + thisServer + " trying again with " + nextServer);
		request(location, type, server + 1);
	}
	else {
		GM_log("None of the servers could be reached.. Stopped trying");
                alert("connection error");
	}
}
function handleResponse(resp, type){
	GM_log("response for " + type + ": " + resp.responseText);
	switch (type) {
		case 0:
			data = response.responseText.toString().split(";");
			GM_setValue("ImageListSrc", data[0]);
			GM_setValue("ImageListB64", data[1]);
			GM_setValue("imgVersion", data[2]);
			break;
		case 1:
			data = resp.responseText.toString().split(";");
			if (!knownError(data)) 
			{
                            triedAnswers = getSetting("triedAnswers", false);
                            if (triedAnswers !== false)
                            {
                                triedAnswers = triedAnswers.split(",");
                            }
                            else
                            {
                                triedAnswers = Array();
                            }                           
                            
                            numTries = parseInt(getSetting("numTries", 0));
                            saveSetting("lastId", data[1]);
                            
                            if (triedAnswers.indexOf(data[0]) > -1 && numTries < 3)
                            {
                                request(0, 3, servers[0]);
                                request(0, 1, servers[0]);
                                saveSetting("numTries", numTries++);
                                return;
                            }
                            else 
                            {
                                triedAnswers[triedAnswers.length] = data[0];
                            }
                            
                            saveSetting("triedAnswers", triedAnswers.toString());
                            
                            inputs = document.getElementsByName("HumanValidationAnswer");
                            inputs[0].value = data[0];
                            inputs = document.getElementsByName("HumanValidationSubmit");
                            inputs[0].click();
			}
			break;
		case 2:
			GM_setValue("message", resp.responseText);
			break;
		case 3:
			break;
                case 4:
                        break;
                case 5:
                        document.getElementById("checkPW").value = resp.responseText;
                        break;
	}
}

function makeRequest(type){
	switch (type){
		case 0:
			sendData = GM_getValue("imgVersion", "0");
			break;
		case 1:
			if (!checkComplete(plaatjes[i])){
				GM_log("Request failed, image not completed");
				
				return false;
			}
			basedImage = getBase64Image(plaatjes[i]).toString();
			match = 0;
			while (match > -1){
				basedImage = basedImage.replace("+", "{plus}");
				match = basedImage.indexOf("+");
			}
			username = getSetting('username', false);
			password = getSetting('password', false);
			sendData = basedImage + "+" + username + "+" + password;
			break;
		case 2:
			sendData = getSetting("language", "1");
			break;
		case 3:
			username = getSetting('username', false);
			password = getSetting('password', false);
			lastId = getSetting("lastId", "0");
			sendData = lastId + "+" + username + "+" + password;
			break;
        case 5:
            username = document.getElementById("uName").value;
            password = document.getElementById("pWord").value;
            sendData = "dummy+" + username + "+" + password;
            break;
	}
	returnValue = "data=" + type + "+" + sendData;
	GM_log("request for " + type + ": " + returnValue);
	return returnValue;
}

/*	When the logout button is clicked, ask for the logout hour
	(When the logout hour is earlier than now, log out tomorrow at logout hour)
*/
function setLogOutTime(){
	hour = prompt(output(11), "23");
	time = new Date();
	time.setHours(hour,"0", "0", "0");
	timeToLogOut = parseInt(time.getTime());
	if (timeToLogOut < parseInt(new Date().getTime())){
		timeToLogOut += 86400000;
	}
	GM_setValue("logOutTime", timeToLogOut.toString());
}

/* 	Go to the target page
	(the target is indicated by a number)
*/
function goToPage(pageNr){

}

/*	Display all settings divided in two functions (and screens)
	When the button is clicked, save the settings.
*/
function setCrimes(){
	settingsDiv = document.getElementById("settingsDiv");
	settingsDiv.innerHTML = output(22);
	settingsDiv.style.display = "block";
}

function setSettings(){
	settingsDiv = document.getElementById("settingsDiv");
	settingsDiv.innerHTML = output(19);
	okButton = document.getElementById("ok");
	okButton.addEventListener("click", save, false);
	resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", reset, false);
        checkButton = document.getElementById("checkPW");
        checkButton.addEventListener("click", checkPW, false);
	settingsDiv.style.display = "block";
}

/* The function that removes ALL the settings
 * Called when the reset button is clicked in the settings
 */
function reset(){
    for each(var val in GM_listValues()){
        GM_deleteValue(val);
    }

    resetButton.style.color = "green";
    resetButton.value = output(20);
}

function checkPW(){
    checkButton.value = "Bezig met checken";
    request(0, 5, servers[0]);
}
/* save the settings that are typed in the boxes in the settings
 */
function save(){
    // Captcha username/password section
	username = document.getElementById("uName").value;
	password = document.getElementById("pWord").value;
        maxTries = document.getElementById("maxTries").value;

        maxTries = parseInt(maxTries);
        if (maxTries === 0 || maxTries){
            if (maxTries < 5){
                saveSetting("maxTries", maxTries);
            }
            else {
                setSettings();
                saved = document.getElementById("saved");
                saved.innerHTML = output(29);
                return;
            }
        }
	saveSetting("username", username);
        if (!((getSetting("password", "niks") != "niks") && password == "")){
            saveSetting("password", password);//yes, no encryption, watch out for people knowing where to find these settings
        }
    // Language section
        language = document.getElementById("lang").value;
        saveSetting("language", language);
    // Show waittimes section
        waitTimes = (document.getElementById("waitTimes").checked) ? "1" : "0";
        saveSetting("showTimes", waitTimes);
    // Network settings section
        msgUpdateTime = document.getElementById("msgUpd").value;
        imgUpdateTime = document.getElementById("imgUpd").value;

        if (msgUpdateTime > 10 && imgUpdateTime > 10){
            saveSetting("msgUpdateTime", msgUpdateTime);
            saveSetting("imgUpdateTime", imgUpdateTime);
        }
        else {
            setSettings();
            saved = document.getElementById("saved");
            saved.innerHTML = output(30);
            return;
        }

	setSettings();

	saved = document.getElementById("saved");
	saved.innerHTML = output(27);
}
/* startCrimes is supposed to do the final checks before actually visiting pages and clicking the right buttons
 * This function is called from startActual (the error-safe function)
 */
function startCrimes(){
	if (times = waitTimes()){
            if (!timesOutdated(times)){

            }
            else {
                checkTimes();
            }
        }
}

/* waitTimes is called in startCrimes (every page except on humanvalidation)
 * It checks for waittimes on the current page, saves them when they exist and returns them
 * If they don't exist get them from the settings, check if they are outdated and return them if they aren't
 * If they are outdated or aren't even in the settings, go get them (checkTimes)
 */
function waitTimes(){
    if (times = getTimesFromPage()){
        // save the times on this page
        saveSetting('waitTimes', times.toString().replace(/,/g, ";"));
        return times;
    }
    else {
        // use known times
        times = getSetting('waitTimes', 'times').split(";");
        if (times != 'times'){
            if (getSetting('showTimes', '1') == '1'){
                placeTable();
                setInterval(countdowns, 1000);
            }
            return times;
        }
        else {
            checkTimes();
        }
    }
}

/* Every page can contain times now
 * That's why this is called in the waittimes function that is executed on every page (except when human validation is spotted)
 * These times are saved and returned
 */
function getTimesFromPage(){
	scripts = document.getElementsByTagName("script");
	for (i=0; scripts[i]; i++){
		zoek = scripts[i].innerHTML.search("StartWaitCountdowns");
		if (zoek != "-1"){
			script = scripts[i].innerHTML;
		}
	}
	if (script){
                tijden = new Array;
		tijd = script.substring(script.indexOf("teller"), script.indexOf("HOSTNAME")).replace(/[^0-9 ;-]/g, "").split(";");
		for (i=0; tijd[i]; i++){
                    tijden[tijden.length] = parseInt(tijd[i]) + (new Date().getTime() / 1000);
		}
		tijden[tijden.length] = new Date().getTime();
		return tijden;
	}
	return false;
}

/* timesOutdated is a check for outdated times^^
 * This happens by checking the last value of the times array
 * That value is added in the getTimesFromPage function
 * The timesOutdated function will be called from the startCrimes function
 */
function timesOutdated(times){
	if (parseInt(times[times.length - 1]) < new Date().getTime() - 120000){
		return true; // times outdated
	}
	return false; // all good, go on..
}

/*This function goes to the times pages to get all the correct waiting times.
 *This function is called when timesOutdated returns true or when no setting for waitTimes is found
 */
function checkTimes(){
    /* To do
     * Go to statistics. When there continue to waittimes page
     */
    if (debug == 1){
        alert ("Times outdated/not available, get them now!");
    }
}

/*This function takes care of the timers in the timer table every second
 *It is called in the waitTimes function when showTimes is enabled
 */
function countdowns(){
    times = getSetting('waitTimes', 'times').split(";");
    counters = Array("tellermisdaad", "tellerauto", "tellersingle", "tellerduo", "tellermulti", "tellerflight", "tellerammo", "tellerkill", "tellercoke", "tellerP", "tellerRi", "tellerPo", "tellerJunk");
    tijdInSec = Math.ceil(new Date().getTime() / 1000);
    text = output(26);
    for (i = 0; i < counters.length; i++){
        counter = document.getElementById(counters[i]);
        if ((parseInt(times[i]) - tijdInSec) < 1){
            counter.value = text;
        }
        else{
            waitTime = parseInt(times[i]) - tijdInSec;
            counter.value = waitTime;
            hours = Math.floor(waitTime / 3600);
            minutes = Math.floor((waitTime - (hours * 3600)) / 60);
            if (minutes < 10){
                minutes = "0" + minutes;
            }
            seconds = Math.floor(waitTime - ((hours * 3600) + (minutes * 60)));
            if (seconds < 10){
                seconds = "0" + seconds;
            }

            if (hours > 0){
                counter.value = hours + ":" + minutes + ":" + seconds;
            }
            else {
                counter.value = minutes + ":" + seconds;
            }
        }
    }
}

/* Make the table that contains all the waiting times.
 * This function will be called from the waittimes function when showTimes is enabled
 */
function placeTable(){
    tafel = document.createElement("div");
    tafel.className = "cb domargin";
    tafel.innerHTML = output(25);
    container = document.getElementById("cbs");
    container.appendChild(tafel);
}

function knownError(data)
{
	possibleError = data[0];
	switch (possibleError){
		case "ErrorTIMEOUT":
			alert(output(17));
			return true;
		case "":
			alert(output(17));
			return true;
		case "INV_REQ":
			alert(output(16));
			return true;
		case "DBE":
			alert(output(15));
			return true;
		case "No_credit":
			alert(output(14));
			return true;
		case "INV_UPC":
			alert(output(13));
			return true;
		default:
			break;
	}
	if (possibleError.toLowerCase().indexOf("error") >= 0)
	{
		alert(output(12, data[0]));
		return true;
	}
	return false;
}

//Copy paste of v2..

// Variabelen
var checked0, checked1, checked2, checked3, checked4, checked5, checked6, random, banken, checkcokehoeveelheid, num, gepauzeerd, timeout, stats;
var optValue = new Array();
var opt2Value = new Array();
var waarde = new Array();
var tijd = new Array();
var doen = new Array();
var links = new Array();
var url = location.href;
var server = location.hostname;

if (makeMenu2()){
    if (!antiCheat()){
        init();
    }
    else {
        if (GM_getValue("showAlert", false)){
            alert("Er moet een code ingevuld worden");
        }
    }
}

function init(){
    pageVisitTime = (Math.random() * 1500) + 1000;
    if (window.location.pathname.indexOf("dashboard") == -1)
    {
        if (!gepauzeerd)
        {
            stats = setTimeout(visitPage, pageVisitTime + 2000, "/user/dashboard.php");
        }
    }

    tijden = new Array;

    scripts = document.getElementsByTagName("script");
    i = 0;
    while (i < scripts.length){
        zoek = scripts[i].innerHTML.search("StartWaitCountdowns");
        if (zoek != "-1"){
            script = scripts[i].innerHTML;
        }
        i++;
    }
    i = 0;
    if (script){
        vangTijden();
        
        noStats = getSetting("noStats", 0);
        if (Math.round(Math.random() * 20) != noStats && noStats < 20)
        {
            clearTimeout(stats);
            noStats++;
        }
        else
        {
            noStats = 0;
        }
        saveSetting("noStats", noStats)
    }
    if (window.location.pathname == "/user/dashboard.php"){
        bars = document.getElementsByClassName("Progress_Bar");
        if (bars[1].firstChild.style.width == "100%"){
                saveSetting("rijles", false);
        }
        if (parseInt(bars[4].firstChild.style.width) < 90)
        {
            timeout = setTimeout(visitPage, pageVisitTime, "/cw/hospital.php");
        }
        else {
            if (bars[4].firstChild.style.width != "100%")
            {
                saveSetting("goToHospital", true);
            }
            timeout = setTimeout(visitPage, pageVisitTime, "/user/facebook_dashboard.php?times");
        }
    }
    i = 0;

    if (getSetting("runnen", false) && (!getSetting("runmax", false))){
        checkcokehoeveelheid = true;
    }
    // Cheater script toevoegen
    div = document.getElementById('VVDP_SCRIPT_BASE');
    if (div){
       cheatdiv = document.createElement('div');
       div.parentNode.insertBefore(cheatdiv, div.nextSibling);
    }
    // !! Cheater script toevoegen

    // Error geven als runnen en cokefabriek beide zijn aangevinkt
    if (getSetting('runnen', false) && getSetting('CF', false)){
      GM_deleteValue('runnen');
      GM_deleteValue('CF');
      alert("Je kunt niet, en runnen, en een cokefabriek hebben..");
    }
    // !! Error geven als runnen en cokefabriek beide zijn aangevinkt

    // Headers opvangen
    div = document.getElementsByTagName("div");

    if (url == "http://" + server + "/crime/deal_drugs.php"){
        i = 0;
        while (i < div.length){
            if (div[i].innerHTML.match("Deal succesvol afgerond!") == "Deal succesvol afgerond!" || div[i].innerHTML.match("Deal completed successfully!") == "Deal completed successfully!"){
                saveSetting('voorraad', false);
            }
            i++;
        }
    }
    // !! Headers opvangen

    // Tijden ophalen

    forms = document.getElementsByTagName("form");
    if (forms.length > 0){
        inputs = forms[0].getElementsByTagName('input');
    }
    else {
        inputs = document.getElementsByTagName("input");
    }
    i = 0;
    aantalhidden = 0;
    while (inputs[i]){
        if (inputs[i].type == "hidden"){
            aantalhidden++;
        }
        i++;
    }
    aantalExtra = 0;
    function klikknop(nr){
        inputs[nr + aantalhidden].click();
    }
    
    kliktijd = (Math.random() * 2000) + 1000;    
    
    if (inputs.length > 0)
    {
        if (inputs[0 + aantalhidden].value == "Zoek speler...")
        {
            alert("fuck.. Vip shizz");
            aantalhidden++;
        }
    }
        
    if (url == "http://" + server + "/crime/light.php"  && inputs.length == 4 + aantalhidden + aantalExtra  && getSetting('misdaden') == 1){
        inputs[2 + aantalhidden].click();
        timeout = setTimeout(klikknop, kliktijd, 3);
    }
    if (url == "http://" + server + "/crime/medium.php" && inputs.length == 4 + aantalhidden + aantalExtra && getSetting('misdaden') == 2){
        inputs[2 + aantalhidden].click();
        timeout = setTimeout(klikknop, kliktijd, 3);
    }
    if (url == "http://" + server + "/crime/gta.php" && (inputs.length == 3 + aantalhidden + aantalExtra || inputs.length == 2 + aantalhidden + aantalExtra) && getSetting('auto', 0) == 1){
        inputs[0 + aantalhidden].click();
        if (inputs.length == 3 + aantalhidden + aantalExtra){
            timeout = setTimeout(klikknop, kliktijd, 2);
        }
        else {
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
    }
    if (url == "http://" + server + "/crime/gta.php" && (inputs.length == 3 + aantalhidden + aantalExtra) && getSetting('auto', 0) == 2){
        timeout = setTimeout(klikknop, kliktijd, 2);
    }
    if (url == "http://" + server + "/crime/killpractice.php" && inputs.length == 1 + aantalhidden + aantalExtra && getSetting('schieten')){
        timeout = setTimeout(klikknop, kliktijd, 0);
    }
    if (url == "http://" + server + "/crime/drivinglesson.php" && (inputs.length == 1 + aantalhidden + aantalExtra || inputs.length == 2 + aantalhidden + aantalExtra) && getSetting('rijles')){
        div = document.getElementsByTagName('td');
        i = 0;
        while (i < div.length){
            if (div[i].innerHTML.match("1.000.000 per les") == "1.000.000 per les"){
                saveSetting('rijles', false);
                timeout = setTimeout(visitPage, pageVisitTime, "/user/dashboard.php");
            }
            i++;
        }
        if (getSetting('rijles')){
            if (inputs.length == 1 + aantalhidden + aantalExtra){
                timeout = setTimeout(klikknop, kliktijd, 0);
            }
            else {
                timeout = setTimeout(klikknop, kliktijd, 1);
            }
        }
    }
    if (url == "http://" + server + "/user/cash.php" && inputs.length == 0 + aantalhidden + aantalExtra && isInt(getSetting('banken'))){
        inputs = document.getElementById("typepin").parentNode.getElementsByTagName("input");
        tds = document.getElementsByTagName('td');
        for (j = 0; tds[j]; j++){
            if (tds[j].innerHTML.indexOf("cash</a>") > -1){
                num = j;
            }
        }
        if (num){
            cash = tds[num].innerHTML;
            if (cash.match("cash") == "cash"){
                teken = cash.search(">");
                cash = cash.substring(teken, cash.length);
                cash = cash.replace(/[^0-9]+/g, '');
            }
        }
        saveSetting('banktijd', (Number(new Date()) + 1800000).toString());
        if (isInt(cash)){
            if (cash > getSetting('banken')){
                inputs[1 + aantalhidden].click();
                banken = cash - getSetting('banken');
                inputs[2 + aantalhidden].value = banken;
                timeout = setTimeout(klikknop, kliktijd, 3);
            }
            if (cash < getSetting('banken')){
                banken = cash - getSetting('banken');
                banken = banken * -1;
                inputs[2 + aantalhidden].value = banken;
                timeout = setTimeout(klikknop, kliktijd, 3);
            }
        }
    }
    if (url == "http://" + server + "/business/coke-info.php" && inputs.length == 2 + aantalhidden + aantalExtra && getSetting('runnen') && !getSetting("voorraad", false)){
        coke = getSetting('runmax');
        td = document.getElementsByTagName('td');
        j = 0;
        while (j < td.length){
            if (td[j].innerHTML.match("voorraad") == "voorraad" || td[i].innerHTML.match("Coke in inventory") == "Coke in inventory"){
                j++;
                voorraad = parseInt(td[j].innerHTML.replace(/[^0-9]+/g, ''));
            }
            j++;
        }
        
        if (voorraad >= coke){
            inputs[0 + aantalhidden].value = coke;
            saveSetting('voorraad', 1);
            saveSetting('cokeTried', true);
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if ((voorraad < coke) && (voorraad != "0")){
            inputs[0 + aantalhidden].value = voorraad;
            saveSetting('voorraad', 1);
            saveSetting('cokeTried', true);
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if (voorraad == 0){
            saveSetting('coketijd', (Number(new Date()) + 300000).toString());
        }
    }
    if (url == "http://" + server + "/crime/deal_drugs.php" && inputs.length == 2 + aantalhidden + aantalExtra && getSetting('runnen')){
        td = document.getElementsByTagName('td');
        td = td[0].innerHTML;

        coke = td.search('kg coke');
        max = td.search('kg</i></a>');
        maxcoke = td.substring(coke, max);
        maxcoke = maxcoke.replace(/[^0-9]+/g, '');
        maxcoke = parseInt(maxcoke);
        saveSetting('runmax', maxcoke);

        wiet = td.search('<b>');
        wiet2 = td.search('wiet');
        wiet = td.substring(wiet, wiet2);
        wiet = wiet.replace(/[^0-9]+/g, '');

        td = td.substring(wiet2, td.length);
        hasj = td.search('<b>');
        hasj2 = td.search('hasj');
        hasj = td.substring(hasj, hasj2);
        hasj = hasj.replace(/[^0-9]+/g, '');

        td = td.substring (hasj2, td.length);
        coke = td.search('<b>');
        coke2 = td.search('coke');
        coke = td.substring(coke, coke2);
        coke = coke.replace(/[^0-9]+/g, '');

        select = document.getElementsByTagName('select');
        select[0].value = 2;

        if (coke == 0){
            saveSetting('voorraad', false);
        }
        if (wiet > 0){
            select[1].value = 3;
            inputs[0 + aantalhidden].value = wiet;
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if (hasj > 0){
            select[1].value = 1;
            inputs[0 + aantalhidden].value = hasj;
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if (coke > 0){
            select[1].value = 2;
            inputs[0 + aantalhidden].value = coke;
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
    }
    if (url == "http://" + server + "/cw/hospital.php" && inputs.length == 2 + aantalhidden + aantalExtra){
        if (inputs[0 + aantalhidden].value != 0){
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        else
        {
            removeSetting("goToHospital");
        }
    }
    if (url == "http://" +server+ "/business/coke.php"){
        if ((inputs[0 + aantalhidden].value == "Start inspectie & productie") && (document.body.innerHTML.indexOf("geproduceerd") == -1) && !getSetting('triedCoke', false)){
            timeout = setTimeout(klikknop, kliktijd, 0);
            tijd = Number(new Date());
            over1uur = tijd + 3660000;
            over1uur = over1uur.toString();
            saveSetting('kooptijd', over1uur);
            saveSetting('triedCoke', true);
        }
        else{
            if (parseInt(getSetting('kooptijd', 0)) < Number(new Date())){
                tijd = Number(new Date());
                over5min = tijd + 300000;
                over5min = over5min.toString();
                saveSetting('kooptijd', over5min);
            }
            else
            {
                removeSetting('triedCoke');
            }
        }
    }
    if (url == "http://" +server+ "/crime/junkies.php"){
        selects = document.getElementsByTagName("select");
        j = 0;
        i = 0;
        while (j < selects.length){
            if (selects[j].name.match("junk") == "junk"){
                selects[j].value = getSetting('junks');
                i++;
            }
            j++;
        }
        tijd = Number(new Date());
        over5min = tijd + 300000;
        over5min = over5min.toString();
        saveSetting('junksbijwerken', over5min);
        if (i > 0){
            timeout = setTimeout(klikknop, kliktijd, 0);
        }
    }
    if (url == "http://" + server + "/business/stekkies.php"){
        pauze();
        for (i = 1; i < 101; i++){
            window.location.href = "javascript:ClickStekkie(" + i + ");";
        }
        alert("De cheater staat op pauze!");
    }
}
function antiCheat(){
    plaatjes = document.getElementsByTagName('img');
    i = 0;
    while (i < plaatjes.length){
        if (plaatjes[i].src == "http://" + server + "/sys/captcha/captcha.php"){
            pauze();
            return true;
        }
        i++;
    }
    return false;
}
function makeMenu2(){
    div = document.getElementById('VVDP_SCRIPT_BASE');
    if (div){
        cheatdiv = document.createElement('div');
        // Goede vakjes aanvinken
        if (getSetting('misdaden', 0) != 0){
          optValue[getSetting('misdaden')] = "selected";
        }

          opt2Value[getSetting('auto')] = "selected";

        if (getSetting('rijles', false)){
          checked1 = "CHECKED=CHECKED";
        }

        if (getSetting('schieten', false)){
          checked2 = "CHECKED=CHECKED";
        }

        if (getSetting('runnen', false)){
          checked3 = "CHECKED=CHECKED";
            if (getSetting('rankrunnen', false)){
                checked6 = "CHECKED=CHECKED";
            }
        }
        if (getSetting('CF', false)){
          checked4 = "CHECKED=CHECKED";
        }
        if (getSetting('showAlert', false)){
          checked5 = "CHECKED=CHECKED";
        }
        if (getSetting('junks', false)){
          waarde[getSetting('junks')] = "selected";
        }
        if (!getSetting('banken') || (getSetting("banken") == "")){
          optValue[3] = "niet banken";
        }
        else{
          optValue[3] = getSetting('banken');
        }

        // !! Goede vakjes aanvinken

        // Inhoud van de div instellen
        cheatdiv.innerHTML = "<div class=\"menu_block\"><div class=\"menu_header\">Cheater</div><div class=\"menu_items\"><ul>    <li><a TITLE=\"Stel hier in welke misdaad je wilt doen.\">Misdaden</a> <select id=misdaden>        <option value=0 " + optValue[0] + ">Nee</option>        <option value=1 " + optValue[1] + ">Makkelijk</option>        <option value=2 " + optValue[2] + ">Moeilijk</option>    </select></li>    <br />    <li><a>Auto\'s jatten</a> <select id=auto>        <option value=0 " + opt2Value[0] + ">Nee</option>        <option value=1 " + opt2Value[1] + ">GTA</option>        <option value=2 " + opt2Value[2] + ">Ultra</option>    </select><li><a>Rijlessen</a> <input type=checkbox id=rijles " + checked1 + " /></li>    <br /> <li><a>Schieten</a> <input type=checkbox id=schieten " + checked2 + " /></li>    <br />  <li><a>Runnen</a> <input type=checkbox id=runnen " + checked3 + " /></li>    <br />  <li><a>Rankrunnen</a> <input type=checkbox id=rankrunBox " + checked6 + "/></li> <br /> <li><a>Cokefabriek</a> <input type=checkbox id=CF " + checked4 + " /></li>  <br />  <li><a>Geld op zak</a> <input type=text size=7 id=geld value=\"" + optValue[3] + "\" /></li>    <br />  <li><a>Junkies</a> <select id=jmanagement><option value=0>Nee</option><option value=11 " + waarde[11] +">Rekruteren</option><option value=4 " + waarde[4] + ">Verdienen</option></select></li><li><a>Melding bij captcha</a><input type=\"checkbox\" id=\"showAlert\" " + checked5 + "/></li><br><li><button id=pauze>Pauze</button></li></ul></div></div>";
        // !! Inhoud van de div instellen

        div.parentNode.insertBefore(cheatdiv, div.nextSibling);
        // Inputs van de gebruiker in de gaten houden
        misdadenselect = document.getElementById('misdaden');
        misdadenselect.addEventListener("change", save2, false);
        autobox = document.getElementById('auto');
        autobox.addEventListener("click", save2, false);
        rijlesbox = document.getElementById('rijles');
        rijlesbox.addEventListener("click", save2, false);
        schietbox = document.getElementById('schieten');
        schietbox.addEventListener("click", save2, false);
        runbox = document.getElementById('runnen');
        runbox.addEventListener("click", save2, false);
        runbox.addEventListener("click", stopRankrun, false);
        rankrunbox = document.getElementById("rankrunBox");
        rankrunbox.addEventListener("click", startRankrun, false);
        rankrunbox.addEventListener("click", save2, false)
        cfbox = document.getElementById('CF');
        cfbox.addEventListener("click", save2, false);
        geldtext = document.getElementById('geld');
        geldtext.addEventListener("keyup", save2, false);
        junkselect = document.getElementById('jmanagement');
        junkselect.addEventListener("change", save2, false);
        showAlert = document.getElementById('showAlert');
        showAlert.addEventListener("change", save2, false);
        pauzeknop = document.getElementById('pauze');
        pauzeknop.addEventListener("click", pauze, false);
        return true;
    }
    return false;
}
function isInt(x) {
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x==y && x.toString()==y.toString();
}
function startRankrun()
{
    if (this.checked)
    {
        runbox.checked = true;
    }
}
function stopRankrun()
{
    if (!this.checked)
    {
        rankrunbox.checked = false;
        save2();
    }
}
function vangTijden(){
    tijd = script.substring(script.indexOf("teller"), script.indexOf("HOSTNAME")).replace(/[^0-9 ;-]/g, "").split(";");
    if (getSetting('misdaden', 0) > 0){
        tijden[tijden.length] = tijd[0];
    }
    if (getSetting('auto', 0) != 0){
        tijden[tijden.length] = tijd[1];
    }
    if (getSetting('schieten', false) == true){
        tijden[tijden.length] = tijd[2];
    }
    if (getSetting('runnen', false) == true){
        //coketried, voorraad, rankruntime
        
        if (getSetting('cokeTried', false))
        {
            if ((parseInt[tijd[8]]) <= 0)
            {
                saveSetting('voorraad', false);
            }
            else
            {
                saveSetting('rankrunTime', (Number(new Date()) + 1860000).toString());
                saveSetting('voorraad', true);
                saveSetting('cokeTried', false);
            }
        }
        
        if (getSetting("voorraad", false) == 1)
        {
            if (getSetting("rankrunnen", false) == true)
            {
                runTime = Math.round(parseInt(getSetting('rankrunTime', 0)) - Number(new Date())) / 1000;
                tijden[tijden.length] = runTime;
                tijd[8] = runTime;
            }
            else
            {
                tijden[tijden.length] = -100;
                tijd[8] = -100;
            }
        }
        else 
        {
            if (parseInt(getSetting('coketijd', 0)) > 0)
            {
                runTime = Math.round(parseInt(getSetting('coketijd', 0)) - Number(new Date())) / 1000;
                tijden[tijden.length] = runTime;
                tijd[8] = runTime;
            }
            else
            {
                tijden[tijden.length] = parseInt(tijd[8]) + 25;
                tijd[8] = parseInt(tijd[8]) + 25;
            }
        }
    }
    if (getSetting('rijles', false) == true){
        tijden[tijden.length] = tijd[10];
    }
    if (isInt(getSetting('banken'))){
        tijd[11] = Math.round(parseInt(getSetting('banktijd', 0)) - Number(new Date())) / 1000;
        tijden[tijden.length] = tijd[11];
    }
    setInterval(aftellen, 1000);
    uitvoeren();
}

function aftellen(){
    for (i = 0; tijd[i]; i++){
        tijd[i]--;
    }
}

function uitvoeren(){
    doen = new Array(); 
    actie = false;
    i = 0;
    if (tijden.length > 0){
        laagstetijd = tijden[0];
        while (i < tijden.length){
            if (parseInt(tijden[i]) < laagstetijd){
                    laagstetijd = parseInt(tijden[i]);
            }
            i++;
        }
        if (laagstetijd > 0){
            timeout = setTimeout(uitvoeren, (laagstetijd * 1000) + 1000);
            actie = true;
        }
    }
    else {
        alert("Voer je instellingen in.\nDit doe je door ze aan te vinken onder het Vers van de Pers menu.");
        pauze();
    }
    j = 0;
    if (tijd[11] <= 0 && isInt(getSetting('banken'))){
        doen[j] = "banken";
        j++;
    }
    if (getSetting("goToHospital", false))
    {
        doen[j] = "ziekenhuis";
        j++;
    }
    if (checkcokehoeveelheid == true){
        doen[j] = "voorraadwegwerken";
        j++;
    }
    if (tijd[0] <= 0 && getSetting('misdaden', 0) != 0){
        doen[j] = "misdaad";
        j++;
    }

    if (tijd[1] <= 0 && getSetting('auto', 0) != 0){
        doen[j] = "auto";
        j++;
    }
    if (tijd[2] <= 0 && getSetting('schieten')){
        doen[j] = "schieten";
        j++;
    }
    if (tijd[8] <= 0 && getSetting('runnen') && getSetting('voorraad', false) != 1 && getSetting('runmax') > 14){
        doen[j] = "runnen";
        j++;
    }
    if (tijd[8] <= 0 && getSetting('runnen') && getSetting('voorraad', false) == 1)
    {
        doen[j] = "voorraadwegwerken";
        j++;
    }
    if (tijd[10] <= 0 && getSetting('rijles')){
        doen[j] = "rijles";
        j++;
    }
    if ((Number(new Date()) > getSetting('kooptijd', 0)) && (getSetting('CF'))){
        doen[j] = "cokekopen";
        j++;
    }
    if ((Number(new Date()) > getSetting('junksbijwerken')) && (getSetting('junks'))){
        doen[j] = "junks";
        j++;
    }

    if (doen.length > 0){
        actie = true;
    }
    if (!actie){
        if (!gepauzeerd){
            setTimeout(uitvoeren, 3000);
        }
        //alert("Het script werkt niet vanwege een (nog) onbekende fout, \nhoud updates in de gaten voor een mogelijke fix.\nJe kunt nu refreshen om opnieuw een poging te wagen,\nkrijg je deze melding niet, dan werkt alles weer zoals het hoort.\n-------------------------------------\n Met vriendelijke groeten, Hans Goedegebuure");
    }
  // !! Kijken wat kan/wat jij wilt doen

  // Random iets uitkiezen om te doen en naar de pagina gaan
    j--;
    rand = Math.random();
    rand = Math.round(rand * j);
    
    if (doen[rand] == "ziekenhuis"){
        timeout = setTimeout(visitPage, pageVisitTime, "/cw/hospital.php");
    }
    if (doen[rand] == "misdaad"){
        if (getSetting('misdaden') == 1){
            timeout = setTimeout(visitPage, pageVisitTime, "/crime/light.php");
        }
        if (getSetting('misdaden') == 2){
            timeout = setTimeout(visitPage, pageVisitTime, "/crime/medium.php");
        }
    }
    if (doen[rand] == "auto"){
        timeout = setTimeout(visitPage, pageVisitTime, "/crime/gta.php");
    }
    if (doen[rand] == "schieten"){
        timeout = setTimeout(visitPage, pageVisitTime, "/crime/killpractice.php");
    }
    if (doen[rand] == "voorraadwegwerken"){
        timeout = setTimeout(visitPage, pageVisitTime, "/crime/deal_drugs.php");
    }
    if (doen[rand] == "runnen"){
        timeout = setTimeout(visitPage, pageVisitTime, "/business/coke-info.php");
    }
    if (doen[rand] == "rijles"){
        timeout = setTimeout(visitPage, pageVisitTime, "/crime/drivinglesson.php");
    }
    if (doen[rand] == "cokekopen"){
        timeout = setTimeout(visitPage, pageVisitTime, "/business/coke.php");
    }
    if (doen[rand] == "junks"){
        timeout = setTimeout(visitPage, pageVisitTime, "/crime/junkies.php");
    }
    if (doen[rand] == "banken"){
        timeout = setTimeout(visitPage, pageVisitTime, "/user/cash.php");
    }
  // !! Random iets uitkiezen om te doen en naar de pagina gaan
}
function visitPage(path)
{
    if (!gepauzeerd)
    {
        window.location.pathname = path;
    }
    
}
// Functies
function pauze(){
    gepauzeerd = true;
    if (stats)
    {
        clearTimeout(stats);
    }
    if (timeout)
    {
        clearTimeout(timeout);
    }
}
// Functies voor het opslaan van gegevens
function save2(){
    saveSetting('misdaden', misdadenselect.value);
    saveSetting('auto', autobox.value);
    saveSetting('rijles', rijlesbox.checked);
    saveSetting('schieten', schietbox.checked);
    saveSetting('runnen', runbox.checked);
    saveSetting('CF', cfbox.checked);
    saveSetting('showAlert', showAlert.checked);
    saveSetting('rankrunnen', rankrunbox.checked);
    if (!isInt(geldtext.value)){
        saveSetting('banken', '');
    }
    else{
        totaan = parseInt(geldtext.value);
        saveSetting('banken', totaan);
    }
    if (junkselect.value == 0){
        GM_deleteValue('junks');
        GM_deleteValue('junksbijwerken');
    }
    else {
        saveSetting('junks', junkselect.value);
    }
}