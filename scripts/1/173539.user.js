// ==UserScript==
// @name        SA-MP.de Shoutbox
// @namespace   http://pwnfl4sh.de
// @description Fügt eine Shoutbox im breadfish.de Forum ein.
// @include     http://forum.sa-mp.de/*
// @include     https://forum.sa-mp.de/*
// @version     1.7
// ==/UserScript==

window.textBoxFocus = false;

function createShoutBox()
{
    var shoutBoxMain = document.createElement("div");
    shoutBoxMain.className = "border titleBarPanel";
    
    shoutBoxMain.style.height = "auto";
    shoutBoxMain.style.margin = "0px auto 10px auto";
    shoutBoxMain.style.overflow = "hidden";
    shoutBoxMain.style.borderBottom = "1px solid #8DA4B7";
    shoutBoxMain.style.backgroundColor = "#F8FAFB";

    shoutBoxMain.innerHTML += "<div class='containerHead'><div class='containerIcon'><img id='statusImg' style='cursor: pointer;' src='http://pwnfl4sh.lima-city.de/shoutbox/icons/hide.png' alt=''></div><div class='containerContent'><img src='http://pwnfl4sh.lima-city.de/shoutbox/icons/mibbitChatS.png' alt=''> Shoutbox &#0124; <span style='color: red;'>INFO: Das Team von breadfish.de distanziert sich von der Shoutbox und hat keinen Einfluss auf deren Inhalte.</span></div></div>";
    shoutBoxMain.innerHTML += "<div id='shoutBoxContainer'></div>";
    document.getElementsByClassName("top5box")[0].parentNode.insertBefore(shoutBoxMain,document.getElementsByClassName("top5box")[0]);
    
    document.getElementById("shoutBoxContainer").innerHTML = "<div id='shoutBoxInfo' style='margin: 5px; font-size: small;'>Shoutbox f&uuml;r breadfish.de v" + GM_info.script.version + "</div>";
    document.getElementById("shoutBoxContainer").innerHTML += "<div id='entries' style='padding: 5px; border: 0px; height: 200px; overflow-x: hidden; overflow-y: scroll; background-color: #D8E7F5; margin: 5px; border: 1px solid #8DA4B7;'></div>";
    
    var shoutForm = document.createElement("div");
    shoutForm.style.padding = "5px";
    
    shoutForm.innerHTML += "<a href='javascript:void(0);' onClick='addSmiley(\":)\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/smile.png' alt=':)' title=':)'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":(\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/sad.png' alt=':(' title=':('></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\";)\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/wink.png' alt=';)' title=';)'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":P\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/tongue.png' alt=':P' title=':P'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\"8)\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/cool.png' alt='8)' title='8)'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":D\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/biggrin.png' alt=':D' title=':D'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\"^^\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/squint.png' alt='^^' title='^^'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\";(\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/crying.png' alt=';(' title=';('></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":rolleyes:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/rolleyes.png' alt=':rolleyes:' title=':rolleyes:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":huh:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/huh.png' alt=':huh:' title=':huh:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":S\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/unsure.png' alt=':S' title=':S'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":love:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/love.png' alt=':love:' title=':love:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\"X(\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/angry.png' alt='X(' title='X('></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\"8|\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/blink.png' alt='8|' title='8|'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\"?(\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/confused.png' alt='?(' title='?('></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":cursing:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/cursing.png' alt=':cursing:' title=':cursing:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":|\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/mellow.png' alt=':|' title=':|'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":thumbdown:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/thumbdown.png' alt=':thumbdown:' title=':thumbdown:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":thumbsup:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/thumbsup.png' alt=':thumbsup:' title=':thumbsup:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":thumbup:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/thumbup.png' alt=':thumbup:' title=':thumbup:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\"8o\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/w00t.png' alt='8o' title='8o'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":pinch:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/pinch.png' alt=':pinch:' title=':pinch:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":sleeping:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/sleeping.png' alt=':sleeping:' title=':sleeping'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":wacko:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/wacko.png' alt=':wacko:' title=':wacko:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":whistling:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/whistling.png' alt=':whistling:' title=':whistling:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":evil:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/evil.png' alt=':evil:' title=':evil:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":?:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/question.png' alt=':?:' title=':?:'></a>";
    shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":!:\");'><img src='" + location.protocol + "//" + location.host + "/wcf/images/smilies/attention.png' alt=':!:' title=':!:'></a>";
    
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":smile:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/smile.png' alt=':smile:' title=':smile:'></a>";
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":damn:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/damn.png' alt=':damn:' title=':damn:'></a>";
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":happy:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/happy.png' alt=':happy:' title=':happy:'></a>";
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":ups:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/ups.png' alt=':ups:' title=':ups:'></a>";
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":funny:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/funny.png' alt=':funny:' title=':funny:'></a>";
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":yeah:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/yeah.png' alt=':yeah:' title=':yeah:'></a>";
	shoutForm.innerHTML += " <a href='javascript:void(0);' onClick='addSmiley(\":facepalm:\");'><img src='http://pwnfl4sh.lima-city.de/shoutbox/smileys/facepalm.png' alt=':facepalm:' title=':facepalm:'></a>";
	shoutForm.innerHTML += "<br>";
	
    shoutForm.innerHTML += "<input style='width: 85%;' type='text' id='shoutBoxText' placeholder='Text'> &#0124; ";
    shoutForm.innerHTML += "<input style='width: 10%; cursor: pointer;' type='button' id='shoutBoxButton' onmouseover='if(this.style.backgroundImage == \"none\") { this.style.backgroundColor = \"#eeeeee\"; }' onmouseout='this.style.backgroundColor = \"#F8FAFB\";' value='Senden'>";
    document.getElementById("entries").parentNode.insertBefore(shoutForm,document.getElementById("entries").nextSibling);
}

function checkUpdate()
{
    GM_xmlhttpRequest(
    {
        method: "GET",
        url: "http://pwnfl4sh.lima-city.de/shoutbox/update.txt",
        onload: function(response)
        {
            if(Number(response.responseText) > Number(GM_info.script.version))
            {
                document.getElementById("shoutBoxInfo").innerHTML += " &#0124; <span style='font-weight: bold;'>Update verf&uuml;gbar! <a href='http://pwnfl4sh.lima-city.de/shoutbox/index.php?page=download#update' title='Update'>Aktualisieren</a>";
            }
        }
    });
}

window.sendEntry = function()
{
    if(document.getElementById("shoutBoxButton").style.backgroundImage == "none")
    {
		buttonLoad();
		window.setTimeout(buttonNormal,15000);
		
        var token = encodeURIComponent(unsafeWindow.SECURITY_TOKEN);
        var text = encodeURIComponent(document.getElementById("shoutBoxText").value);
        
        GM_xmlhttpRequest(
        {   
            method: "POST",
            url: "http://pwnfl4sh.lima-city.de/shoutbox/write.php",
            data: "token="+token+"&text="+text,
            headers: 
			{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response)
            {
                if(response.responseText != "ok")
                {
                    alert(response.responseText);
                }
                else
                {
                    window.clearTimeout(loadTimer);
                    loadEntries();
					
                    document.getElementById("shoutBoxText").value = "";
                    document.getElementById("shoutBoxText").focus();
                }
            }
        });
    }
}

window.loadEntries = function()
{
    GM_xmlhttpRequest(
    {
        method: "GET",
        url: "http://pwnfl4sh.lima-city.de/shoutbox/load.php",
        onload: function(response)
        {
            document.getElementById("entries").innerHTML = response.responseText;
        }
    });
    
    loadTimer = window.setTimeout(loadEntries,10000);
}  

window.buttonLoad = function()
{
    var button = document.getElementById("shoutBoxButton");
    button.value = "";
    button.style.backgroundColor = "transparent";
    button.style.backgroundImage = "url(http://pwnfl4sh.lima-city.de/shoutbox/icons/loading.gif)";
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center center";
    button.style.borderRadius = "0px";
    button.style.border = "1px solid transparent";
    button.style.padding = "5px";
} 

window.buttonNormal = function()
{
    var button = document.getElementById("shoutBoxButton");
    button.value = "Senden";
    button.style.backgroundColor = "#F8FAFB";
    button.style.backgroundImage = "none";
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center center";
    button.style.borderRadius = "5px";
    button.style.border = "1px solid #cccccc";
    button.style.padding = "5px";
}

window.focusOn = function()
{
    textBoxFocus = true;
}

window.focusOff = function()
{
    textBoxFocus = false;
}

window.showHide = function()
{
    var statusImg = document.getElementById("statusImg");
    if(statusImg.src == "http://pwnfl4sh.lima-city.de/shoutbox/icons/hide.png")
    {
        document.getElementById("shoutBoxInfo").style.margin = "0px";
        document.getElementById("shoutBoxContainer").style.height = "0px";
        document.getElementById("shoutBoxContainer").style.visibility = "hidden";
        statusImg.src = "http://pwnfl4sh.lima-city.de/shoutbox/icons/show.png";
    }
    else if(statusImg.src == "http://pwnfl4sh.lima-city.de/shoutbox/icons/show.png")
    {   
        document.getElementById("shoutBoxInfo").style.margin = "5px";
        document.getElementById("shoutBoxContainer").style.height = "auto";
        document.getElementById("shoutBoxContainer").style.visibility = "visible";
        statusImg.src = "http://pwnfl4sh.lima-city.de/shoutbox/icons/hide.png";
    }
}

window.keyCheck = function(e)
{
    if(textBoxFocus == true)
    {
        var kc;
        
        if(!e)
        {
            e = window.event;
        }
        
        if(e.which)
        {
            kc = e.which;
        }
        else if(e.keyCode)
        {
            kc = e.keyCode;  
        }
      
    	if(kc == 13)
    	{
    		sendEntry();
    	}
    }
}

unsafeWindow.addSmiley = function(smiley)
{
    document.getElementById('shoutBoxText').value += smiley;
    document.getElementById('shoutBoxText').focus();
}

if(typeof document.getElementsByClassName("top5box")[0] != "undefined")
{
	createShoutBox();
	checkUpdate();
	loadEntries();
	buttonNormal();

	document.getElementById("shoutBoxText").addEventListener("focus",focusOn,true);
	document.getElementById("shoutBoxText").addEventListener("blur",focusOff,true);
	document.getElementById("shoutBoxButton").addEventListener("click",sendEntry,true);
	document.getElementById("statusImg").addEventListener("click",showHide,true);
	window.addEventListener("keydown",keyCheck,true);
}