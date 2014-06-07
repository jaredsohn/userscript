// ==UserScript==
// @name        Travian Attack Inspector - TAI
// @version     1.1.0
// @author      Shinigami and NeoN
// @namespace   shinigami
// @description Automatically checks for attacks on all villages in random time intervals.
// @copyrigh    © Shinigami 2012 © NeoN 2012
// @license     GPL
// @source      http://userscripts.org/scripts/show/145204
// @identifie   http://userscripts.org/scripts/show/145204.user.js
// @include http://*.travian*.*/dorf1.php*
// @include http://*.travian*.*/dorf2.php*
// @include http://*.travian*.*/statistiken.php*
// @include http://*.travian*.*/berichte.php*
// @include http://*.travian*.*/nachrichten.php*
// @include http://*.travian*.*/karte.php*
// ==/UserScript==

function TravianAttackInspector() {
    //This function is the main function to keep all data and methods of TAI script.
    //It is like class header file in C++

    //Gets table with troops movements.
    this.G_Tai_MOVEMENTS = document.getElementById('movements');
    //Gets list of villages links.
    this.G_Tai_VILLAGELISTLINKS = document.getElementById('villageListLinks');
    //Gets web page title.
    var serverName = document.title.split(" ");
    this.G_Tai_Server = serverName[1];
    this.G_Tai_VarServer = "Tai_alarm_key_"+this.G_Tai_Server;
    this.G_Tai_VarActiveVillage = "Tai_alarm_key_"+this.G_Tai_Server+"_activeVillage";
    //Creates empty village list.
    this.village_array = [];
    //Gets table with production. Used to place video in.
    this.G_Tai_ADDONS = document.getElementById('production');
    //If production table not found in page, get footer.
    if (this.G_Tai_ADDONS === null) {
        this.G_Tai_ADDONS = document.getElementById('footer');
    }
    // variable which stors youtube video name. (http://www.youtube.com/watch?v=5W_wd9Qf0IE&feature=player_embedded)
    //this.G_Tai_MEDIA = "5W_wd9Qf0IE";
    this.G_Tai_MEDIA = "z9Uz1icjwrM";
    // min_time - minimum time in milliseconds to wait for page reload.
    this.min_time = 300000;
    // max_time - time interval in millisecons from min_time to wait for page reload.
    // min_time = 1 min, max_time = 4 min, reload interval are from 1 min to 5 mins.
    this.max_time = 60000;
    // variable to keep data about Plus activation.
    this.plus = false;
    //count down
    this.timernn = -1;
    //attack detected
    this.attackDetected = false;
}

function get(url, callback, options) {
	var httpRequest = new XMLHttpRequest();
	if(callback) {
		httpRequest.onreadystatechange = function() {
				callback(httpRequest, options);
		};
	}
	httpRequest.open("GET", url, true);
	httpRequest.send(null);
}

function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
	var aR = new XMLHttpRequest();
	aR.onreadystatechange = function() {
		if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
			onSuccess(aR);
		else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);
	};
	aR.open(aMethod, url, true);
	if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	aR.send(param);
};

function switchActiveVillage(did) {
	if ( isInt(did) && did > 0 ) get("dorf1.php?newdid="+did, null, null);
}

TravianAttackInspector.prototype.getActiveVillage = function () {
	var nameTaiServerAV = travian_attack_inspector.G_Tai_VarActiveVillage;
	var pages = [];
	pages.push("dorf1.php", "dorf2.php", "statistiken.php", "berichte.php", "nachrichten.php", "karte.php");
	var randompage = Math.floor((Math.random() * pages.length));

	ajaxRequest('dorf1.php', 'GET', null, function (ajaxResp) {

					var holder = document.createElement('div');
					holder.innerHTML = ajaxResp.responseText;

					var reqVID = holder.getElementsByClassName("entry active");
					if ( reqVID.length == 1 )
					{
						reqVID = parseInt(reqVID[0].getElementsByTagName("a")[0].href.split("=")[1]);
						if ( isNaN(reqVID) )
							reqVID = -1;
					}
						else { reqVID = -1; }
					GM_setValue(nameTaiServerAV, reqVID);
					var actualDid = GM_getValue(nameTaiServerAV, 1);
			});
};


TravianAttackInspector.prototype.Villages = function () {
	var aHTMLTags = [], i;
	aHTMLTags = this.G_Tai_VILLAGELISTLINKS.getElementsByTagName("a");
	for (i = 0; i < aHTMLTags.length; i++) {
		this.village_array[i] = aHTMLTags[i].getAttribute('href').split("=")[1]; // ?newdid=VillageID
	}
	this.getActiveVillage();
};

TravianAttackInspector.prototype.Attack = function () {
	var video = document.createElement("div"), i;

	video.innerHTML = '<div>' +
		'<object width="200" height="100"><param name="movie" value="http://www.youtube.com/v/' + this.G_Tai_MEDIA +
		'&autoplay=1"></param><embed src="http://www.youtube.com/v/' + this.G_Tai_MEDIA +
		'&autoplay=1" type="application/x-shockwave-flash" width="200" height="100"></embed></object></div>';
	//insert video
	this.G_Tai_ADDONS.parentNode.insertBefore(video, this.G_Tai_ADDONS);
};

function checkAttackToXVillage(villageid, pageLoad, i)
{
	var outAttack = false;
	var urlData = "";
	//check if attack already detected

	if(villageid > 0)
		urlData = pageLoad+'?newdid='+villageid;
	else
		urlData = pageLoad;

	if(this.attackDetected != true)
	{
		document.getElementById('TAInnTim').innerHTML += " Village "+i;
		//alert('Aldea '+i+' Con url'+urlData);

		ajaxRequest(urlData, 'GET', null, function (ajaxResp) {
			if(this.plus)
			{
				if (ajaxResp.responseText.search(/class=\"entry attack\"/) !== -1 || ajaxResp.responseText.search(/class=\"entry attack active\"/) !== -1)
				{
					document.getElementById('TAInnTim').innerHTML += " Village "+i;
					this.attackDetected = true;
					outAttack = true;
				}
			}
			else
			{
				if (ajaxResp.responseText.search(/class=\"att1\"/) !== -1 || ajaxResp.responseText.search(/class=\"att3\"/) !== -1)  //att3 oases //if (ajaxResp.responseText.search(/class=\"att1\"/) !== -1 || ajaxResp.responseText.search(/class=\"att3\"/))
				{
					this.attackDetected = true;
					outAttack = true;
				}
			}
		});
	}
	//If attack detected, stop checking villages.
}

TravianAttackInspector.prototype.LoadPages = function () {
	var nameTaiServer = this.G_Tai_VarServer;
	var nameTaiServerAV = travian_attack_inspector.G_Tai_VarActiveVillage;
	var i = 0;
	var j = 0;
	var random_time_total = 0;
	var random_time = 0;

	if (GM_getValue(nameTaiServer, 1) === 1)
    {
		var pages = [];
		pages[0] = "dorf1.php";
		this.Villages();
		var villageList = this.village_array;

		if (this.plus) {
			pages.push("dorf2.php", "statistiken.php", "berichte.php", "nachrichten.php", "karte.php");
			var randompage = Math.floor((Math.random() * pages.length));
			checkAttackToXVillage(0, pages[randompage], i);
			random_time = Math.floor((Math.random() * 575) + 985);
			setTimeout(function(){ checkArrayAttack(); }, random_time);
		}
		else
		{
			//checking every village...
			while(j < this.village_array.length)
			{
				setTimeout(function(){ checkAttackToXVillage(villageList[i], pages[0], i); i++; },random_time_total);
				j++;
				if(j < this.village_array.length)
				{
					random_time = Math.floor((Math.random() * 475) + 685);
					random_time_total += random_time;
				}
				else
					random_time_total += 1250; // giving time to load last one..

			}
			//check incoming attacks
			setTimeout(function(){ checkArrayAttack(); }, random_time_total);
			//devuelvo a donde estaba..
			var newDid = GM_getValue(nameTaiServerAV, 1);
			//setTimeout(function(){ alert('Antes de volver a: '+newDid); }, random_time_total);
			setTimeout(function(){ get("dorf1.php?newdid="+newDid, null, null);}, random_time_total);
		}
	}
};

function checkArrayAttack() {
	if(this.attackDetected)
	{
		travian_attack_inspector.Attack();
	}
	else
	{
		var pages = [];
		pages.push("dorf1.php", "dorf2.php", "statistiken.php", "berichte.php", "nachrichten.php", "karte.php");
		var randompage = Math.floor((Math.random() * pages.length));
		location.href = ("http://" + location.hostname + '/' + pages[randompage]);
	}
}

function CD(nameVarServer) //count down function
{
    if (GM_getValue(nameVarServer, 1) === 1)
    {
        if(this.timernn == 0)
            document.getElementById('TAInnTim').innerHTML = "Actualizando..";
        else
        {
            n=new Date(this.timernn*1000); //convert to ms
            min=n.getMinutes();
            sec=n.getSeconds(); if(sec<10) sec = '0'+sec;
            document.getElementById('TAInnTim').innerHTML = 'Falta '+min+':'+sec+' para actualizar';
            this.timernn-=1;
            setTimeout(function(){ CD(nameVarServer);}, 1000);
        }
    }
    else
        document.getElementById('TAInnTim').innerHTML = '';
}

TravianAttackInspector.prototype.Reload = function () {
    var that = this;
    var random_time = Math.floor((Math.random() * this.max_time) + this.min_time);
    var a = GM_getValue(this.G_Tai_VarServer, 1);
    if (a === 1)
    {
        var infobar2 = document.createElement("div");
        infobar2.id = "TAInnTim";
        this.G_Tai_ADDONS.parentNode.insertBefore(infobar2, this.G_Tai_ADDONS);
        timernn=Math.round(random_time/1000);
        CD(this.G_Tai_VarServer, 0);
        setTimeout(function() {that.LoadPages();}, random_time+250);
    }

};

TravianAttackInspector.prototype.On = function () {
    var nameTaiServer = travian_attack_inspector.G_Tai_VarServer;
    GM_setValue(nameTaiServer, 1);
    travian_attack_inspector.Run();
};

TravianAttackInspector.prototype.Off = function () {
    var nameTaiServer = travian_attack_inspector.G_Tai_VarServer;
    this.timernn = 0;
    GM_setValue(nameTaiServer, 0);
    travian_attack_inspector.Run();
};

TravianAttackInspector.prototype.Run = function () {
    if (this.G_Tai_ADDONS) {
        var b = GM_getValue(this.G_Tai_VarServer,1);
        var imagen = document.getElementById('status');
        if (imagen) {
            padre = imagen.parentNode;
            padre.removeChild(imagen);
        }

        var infobar = document.createElement("div");
        infobar.id = 'status';
        var buttonnode;
        infobar.innerHTML = '<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
            'border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; color: red;"> ' +
            '<b></b></div> ';

        if (b === 1) {
            infobar.innerHTML = infobar.innerHTML + '<span style="color:green">~~~ + Attack inspector is ON</span>';
            buttonnode = document.createElement('div');
            buttonnode.innerHTML = '<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
                'border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; color: red;"> ' +
                '<b><a href="#"><font color="FF00CC">De-Activate</font></a></b> </div> ';
            buttonnode.id = 'status';
            infobar.appendChild(buttonnode);
            buttonnode.addEventListener('click', this.Off, false);
            this.Reload();
        } else {
            infobar.innerHTML = infobar.innerHTML + '<span style="color:grey">~~~ - Attack inspector is OFF</span>';
            buttonnode = document.createElement('div');
            buttonnode.id = 'status';
            buttonnode.innerHTML = '<div id="status" align="center" style="margin: 0 auto 0 auto; ' +
                'border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; color: red;"> ' +
                '<b><a href="#"><font color="FF00CC">Activate</font></a></b></div> ';
            infobar.appendChild(buttonnode);
            buttonnode.addEventListener('click', this.On, false);
        }
        this.G_Tai_ADDONS.parentNode.insertBefore(infobar, this.G_Tai_ADDONS);
    }
};

var travian_attack_inspector = new TravianAttackInspector();
travian_attack_inspector.Run();
