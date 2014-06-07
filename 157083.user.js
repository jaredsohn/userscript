// ==UserScript==
// @name                WME Italian Unlock Requests
// @description         Opens the italian module with precompiled fields to submit an unlock request
// @grant               none
// @updateURL           https://userscripts.org/scripts/source/157083.user.js
// @include             https://*.waze.com/it/editor/*
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @include             https://editor-beta.waze.com/*
// @version             19.2
// ==/UserScript==

function IT_UNLOCK(){

function ITUnlscript_global() 
{
	ITUnlVersion = '14.02.16.0';
	ITUnlSheet = 'https://docs.google.com/spreadsheet/viewform?formkey=dHFyNHFxdTZueE85dmppaHFsd1VVS0E6MQ';
}

function ITUnlscript_bootstrap() {
	var bGreasemonkeyServiceDefined = false;
	try 
    {
		if (typeof Components.interfaces.gmIGreasemonkeyService === "object") 
        {
			bGreasemonkeyServiceDefined = true;
		}
	}
	catch (err) { //Ignore.
	}

	if (typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined) 
    {
		unsafeWindow = (function() {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		})();
	}

	/* begin running the code! */	
	coolscript_init();
}

function ITUnl_WazeBits() {
	ITUnlloginManager = unsafeWindow.W.loginManager;
	wazeModel = unsafeWindow.W.model;
	jq = unsafeWindow.jQuery;
}

function ITUnlinsertButton() {
	if(document.getElementById('ITUnlock') != null) return;
	
	var btn1 = jq('<a id="ITUnlock" href="javascript:;" style="margin-right:20px;float:left" title="Apri il modulo per effettuare una richiesta di unlock v. '+ITUnlVersion+'">Richiesta di Unlock</a>');
	btn1.click(ITUnlPermalink);
	jq(".WazeControlPermalink").append(btn1);
	//Make the attribution bar shorter
    var attribution = jq('.olControlAttribution');
    console.dir(attribution);
    if(attribution.length > 0)
    {
    	attribution[0].style.right = '700px';
    }
	consoleLog('ITUnlock initialised');
}

function ITUnlgetUsername() {
	var thisUser = ITUnlloginManager.user;
	if (thisUser === null) {
		alert('Nessun utente loggato.');
		return "";
	}
	return ITUnlloginManager.user.userName;
}

//User Rank di un oggetto, non più in uso
function ITuserRank(segment) {
	var usrRank = 0;
	if (segment.attributes.locked) {
		var updatedBy = wazeModel.users.get(segment.attributes.updatedBy);
		return updatedBy != null ? updatedBy.rank : 0;
	}
	return 0;
}

//Restituisce il road rank del segmento più alto
function ITGetRankLevel(){
    var sel = unsafeWindow.W.selectionManager.selectedItems;
	var max = sel[0].attributes.rank; //ITuserRank(sel[0]);
        // for(var propertyName in sel[0]) {
    //console.log(propertyName + ':  ' + sel[0][propertyName]); 
//}
	for (i = 1; i < sel.length; i++) {
        //consoleLog(sel[i].attributes.lockRank);
		if (max == 5)
			return 6; //5+1
		//var usrRank = ITuserRank(sel[i]);
		if (sel[i].attributes.rank > max) {
			max = rank;
		}
	}
	return max + 1;
}

//Restituisce il livello di blocco massimo
function ITGetLevel() {
	//attributes.rank dovrebbe essere il road rank
    //attributes.lockRank è il lock alla quale il segmento è bloccato.
	var sel = unsafeWindow.W.selectionManager.selectedItems;
	var max = sel[0].attributes.lockRank; //ITuserRank(sel[0]);
         //for(var propertyName in sel[0]) {
        //console.log(propertyName + ':  ' + sel[0][propertyName]);
		//}
	for (i = 1; i < sel.length; i++) 
    {
        //consoleLog(sel[i].attributes.lockRank);
		if (max == 5)
			return 6; //5+1
		//var usrRank = ITuserRank(sel[i]);
		if (sel[i].attributes.lockRank > max) 
        {
			max = rank;
		}
	}
	return max + 1;
}

function ITUnlPermalink(event) {
	if (unsafeWindow.W.selectionManager.selectedItems.length == 0) 
    {
		alert('Nessun segmento selezionato');
		return;
	}
    var username = ITUnlgetUsername();
	var lockLevel = ITGetLevel();
    var rankLevel = ITGetRankLevel();
    var userLevel = ITUnlloginManager.user.normalizedLevel;
    var url = ITUnlSheet;
    if(userLevel < rankLevel)
    {
    	if(!confirm("I segmenti selezionati non possono essere sbloccati, la richiesta verrà risolta da un user di livello superiore al tuo ('Intervento richiesto' = si)."))
        {
        	return;
        }
        else
        {
        	url += '&entry_12=Sì';
        }
    }
    else
    {
        if(userLevel < 4  || ! event.ctrlKey)
        { //If the user presses CTRL key while clicking on the link this checks are skipped. This allows the user to make a request about unlocked segments tha lays outside of its editing area.
            consoleLog(userLevel + '<- Userlevel |||| locklevel->' + lockLevel);
            if (lockLevel == 1) 
            {
                alert("I segmenti selezionati sono già sbloccati");
                return;
            }
            if (lockLevel <= userLevel) {
                alert("Nessuno dei segmenti selezionati ha un blocco di livello superiore al tuo.")
                return;
            }
        }
        else 
        {
            url += '&entry_12=Sì';
        }
	}
	var permalink = generate_permalink();
	permalink = permalink.replace(/&/g, '%26');
	permalink = permalink.replace(/\?/g, '%3F');
	permalink = permalink.replace(/=/g, '%3D');
    url += '&entry_0=' + username + '&entry_10=' + permalink + '&entry_2=' + (lockLevel > rankLevel ? lockLevel : rankLevel) + '&entry_15=' + userLevel;
    var city = get_city();
    if(city != null)
       {
       	 url += '&entry_11=' + city;
       }
	window.open(url, '_blank');
}

function consoleLog(text) {
	console.log('ITUnl v. ' + ITUnlVersion + ': ' + text);
}
    
function get_city()
{ //Looks for a non empty city, the first one is returned
    var sel = unsafeWindow.W.selectionManager.selectedItems;
    i = 0;
    var sid, street, cityID, city;
    while(i < sel.length)
    {
       	sid = sel[i].attributes.primaryStreetID
        street = Waze.model.streets.get(sid)
        cityID = (street != null) && street.cityID;
        if (cityID != null)
            city = Waze.model.cities.get(cityID);
            if(city != null)
            {
                if(city.name!=null && city.name!="")
                    return city.name;
            }
        i++;
    }
    return null;    
}

function generate_permalink() {
	return document.getElementsByClassName('WazeControlPermalink')[0].getElementsByTagName('a')[0].href;
}

function coolscript_init() {
	ITUnlscript_global();
	consoleLog('init');
	window.addEventListener("load", function(e) {
		ITUnl_WazeBits();
		//Inserisco il pulsante
        setTimeout(ITUnlinsertButton,1000);
		return true;
	});
}
ITUnlscript_bootstrap();
}
IT_UNLOCK();