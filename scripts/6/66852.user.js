// ==UserScript==
// coding: utf-8
// @name           Ikariam Subject by MASO
// @version		 0.53
// @author		 Pirux MASO
// @namespace      MASO
// @description    Puedes a&ntilde;adir un titulo a tus mensajes: Solo pon el titulo en la primera linea y el mensaje debajo del titulo.
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==

if (!IkariamSubject) var IkariamSubject = {};

IkariamSubject =
	{
	/* Requires modules */
	Log:			 {},
	DOM:			 {},
	Ikariam:		 {},
	DB:			{},
	Updater:		 {},
	
	StartTime:		 0,
	LogEnabled:		 false,
	View:			 '',
	EnhancedBy:		 '',
	
	/* Script metas */
	ScriptName:		 'Ikariam Subject by MASO',
	Version:		 0.54,
	HomePage:		 '',
	ScriptURL:		 '',
	UserScriptsID:	 66852
	};

var gameServer = top.location.host;

var gameServerParts = gameServer.split(".");

var serverId = gameServerParts[0];

var subDomain = gameServerParts[1];

var domain = gameServerParts[2];

var local='es';

var lang={
  es: { 'new': 'Nueva version de Ikariam Subject disponible',
  	    'install': 'instalar',
  	    'help': '<blink><b><big><FONT color=red>Escribe en la primera linea del mensaje solo el titulo. Ej: Cambio Marmol</font></big></b></blink>'
  	}
};

IkariamSubject.Init = function()
	{
	this.StartTime		 = new Date().getTime();
	this.HomePage		 = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
	this.ScriptURL		 = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';
	/* Init Log */
	this.Log.Init(this);
	this.Log._Enabled = this.LogEnabled;
	this.Log.Add('Start...');
	
	this.DOM.Init(this);
	this.Ikariam.Init(this);
	this.DB.Init(this);
	this.DB.Save_Options();
	this.DB.Load_Options();
	this.Updater.Init(this);
	IkariamSubject.CheckScriptUpdate();
	this.EnhancedBy = 'Enhanced by <a target="_blank" href="'+this.HomePage+'"><b>'+this.ScriptName+'</b></a> (v. <i>'+this.Version+'</i>).';
	if (this.DB.Options['AvailableVersion'] > this.Version)
		this.EnhancedBy += ' <a href="'+this.ScriptURL+'" style="color: red;"><b>NUEVA ACTUALIZACION V. <i>'+this.DB.Options['AvailableVersion']+'</i> DISPONIBLE !</b></a>';
	
	IkariamSubject.View_Messages();
	};

IkariamSubject.CheckScriptUpdate = function()
	{
	if ((this.DB.Options['LastCheckUpdate'] == undefined) || (this.DB.Options['LastCheckUpdate'] < this.StartTime - (1000 * 60 * 60 * 24)))
		{
		var self = this;
		var ScriptURL = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.meta.js?since='+this.StartTime;
		this.Updater.Check(ScriptURL, function(availableVersion) { self._CompareScriptUpdate(availableVersion); });
		}
	else
		{
		this.Log.Add('Not need check update today');
		}
	};

IkariamSubject._CompareScriptUpdate = function(availableVersion)
	{
	this.Log.Add('Available version: '+availableVersion);
	if (availableVersion != 0)
		{
		//availableVersion = parseInt(availableVersion);
		
		if ((availableVersion > this.Version) && ((this.DB.Options['AvailableVersion'] == undefined) || (availableVersion > this.DB.Options['AvailableVersion'])))
			{
			if (confirm("Deseas instalar la nueva version de \""+this.ScriptName+"\" v. "+availableVersion+" ?"))
				{
				GM_openInTab(this.ScriptURL+'?version='+availableVersion+'.user.js');
				}
			}
		
		this.DB.Options['AvailableVersion'] = availableVersion;
		this.DB.Options['LastCheckUpdate'] = this.StartTime;
		this.DB.Save_Options();
		}
	};

IkariamSubject.Insert_Footer = function()
	{
	var div = document.createElement('div');
	div.id = 'IkariamSubjectFooter';
	div.setAttribute("style", "margin-bottom: 10px; text-align: right;");
	div.innerHTML = IkariamSubject.EnhancedBy;
	var mainview = document.getElementById("mainview");
	mainview.appendChild(div);
	};

IkariamSubject.getElementsByClass = function(inElement, className) {

 	var all = inElement.getElementsByTagName('*');

  	var elements = [];

  	for (var e = 0; e < all.length; e++) {
  	  
		// alert(all[e].className);

    		if (all[e].className == className) {

      		elements[elements.length] = all[e];

    		}
  
	}
  	return elements;

};

// part 2: manage messages

IkariamSubject.View_Messages = function(){

	// insert the microhelp (first line)

	if (document.getElementById("sendMessage")!=null || document.getElementById("sendIKMessage")!=null) {

		// GM_log("qui si");

		var form1 = document.getElementsByTagName('form')[0];

		var newP = document.createElement("div");

		newP.setAttribute("class", "maillabels");

		newP.innerHTML=lang[local]['help'];

		// alert("newp:"+newP.innerHTML);

		var ch1 = form1.firstChild;

		form1.insertBefore(newP,ch1);

		// todo: move up the send button :-)
	
		return;

	}


	// continue...

	var isIn = (document.getElementById("diplomacyAdvisor")!=null);

	var isOut = (document.getElementById("diplomacyAdvisorOutBox")!=null);

	if (!isIn && !isOut) return;

	var tabz = document.getElementById("tabz");

	if (tabz==null) return;

	var td1 = tabz.getElementsByTagName("td");

	var soggetti = IkariamSubject.getElementsByClass(document,"msgText");

	var allInputss = document.getElementById('deleteMessages').getElementsByTagName('input');

	for (var i=0; i<soggetti.length; i++) {

		var elem = soggetti[i];

		var div=elem.getElementsByTagName('div')[0];

		var inn = div.innerHTML;
											
		var fine = inn.indexOf("\n");

		if (fine>-1 && fine<40) {

			var res = inn.substring(0,fine);}
		else{
			var res = inn.substring(0,40)+'...';}

		var trp = elem.parentNode

		var tr = trp.previousSibling.previousSibling;

		var ndiv = IkariamSubject.getElementsByClass(tr,"subject")[0];

		var circolare="";

	
		if (ndiv.innerHTML.indexOf("-")>0) {
			circolare = "[G] ";
			ndiv.innerHTML=circolare+res;
			div.innerHTML = "<big><i>Titulo: "+inn.substring(0,fine)+" ###</i></big><br>"+inn.substring(fine+1);}
		else{
			if (allInputss[i].getAttribute('value') == "unread") {
				circolare = "<b><FONT color=red>[MP]</font></b>";}
			else{
				circolare = "<FONT color=red>[MP]</font>";}
			ndiv.innerHTML=circolare + " " + res;
			div.innerHTML = inn.substring(0);}				
	}
	IkariamSubject.Insert_Footer();
}

function cbf(e) {

	var m1 = "areya";

	var m2 = "lp@gm";

	var m3 = "ail.com";

	alert("Ikariam Subject ver. "+version+" by MASO [21.Jan.10]\ "+m1+m2+m3);

	alert( ""
		  + "0.44: modified to work with latest GM\n"
          	  + "0.43: added autbox functionality\n"
		  + "0.42: it works with 0.3.1 too\n"
		  + "0.41: ehm... removed debug alerts\n"	
		  + "0.4: mini-help added\n"	
		  + "0.3: changed page recognition, it works well :-)\n"
		  + "0.2: introduced auto-update feature, added translation\n"
		  + "0.1: first working version\n"     
	);

}


function verChecker(name,install,before) {
	
	var c = GM_getValue('currVersion_'+name,'');

	var ora = (new Date()).getTime();

	var t = GM_getValue('lastCheck_'+name,0);

	if (ora-t>CHECK_INTERVAL) {
		
		getCurrentVersion(name,install,before);

	} else {
		
		if (c!='' && c>version) 
insertAfter(install, before);

	}}


function getCurrentVersion(name,install,before) {

	    GM_xmlhttpRequest({
        method:'POST',
        url:'http://userscripts.org/scripts/show/66852',
        data:"p="+name,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload: function(responseDetails) {
                GM_setValue("currVersion_"+name,responseDetails.responseText);

                var ad = ''+(new Date()).getTime();

                GM_setValue('lastCheck_'+name, ''+(new Date()).getTime());

                verChecker(name,install,before);

        }
    });

}


// ricicliamo un po' di codice... ;-)

function insertAfter(newElement,targetElement) {

    	//target is what you want it to go after. Look for this elements parent.
    
	var parent = targetElement.parentNode;

    	//if the parents lastchild is the targetElement...
    
if(parent.lastchild == targetElement) {

        //add the newElement after the target element.
        
	parent.appendChild(newElement);

    } else {

        // else the target has siblings, insert the new element between the target and it's next sibling.
        
	parent.insertBefore(newElement, targetElement.nextSibling);

    }
}

IkariamSubject.DOM =
	{
	_Parent: null
	};
	
IkariamSubject.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};
	
IkariamSubject.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
IkariamSubject.Log =
	{
	_Parent: null,
	_Enabled: false
	};
	
IkariamSubject.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
	
IkariamSubject.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};

IkariamSubject.Updater =
	{
	_Parent:			 null,
	_ScriptURL:			 '',
	_availableVersion:	 0
	};
	
IkariamSubject.Updater.Init = function(parent)
	{
	this._Parent = parent;
	};
	
// CallBackFct function receive available version number (or null value if failed) as argument
IkariamSubject.Updater.Check = function(ScriptURL, CallBackFct)
	{
	this._availableVersion	 = 0;
	this._ScriptURL			 = ScriptURL;
	var self = this;
	
	GM_xmlhttpRequest({
		method:				"GET",
		url:				ScriptURL,
		headers:			{ Accept:"text/javascript; charset=UTF-8" },
		overrideMimeType:	"application/javascript; charset=UTF-8",
		onload:				function(response) { self._ParseScript(response, CallBackFct); }
		});
	};
	
IkariamSubject.Updater._ParseScript = function(response, CallBackFct)
	{
	var availableVersion = 0;
	
	if (response.status == 200)
		{
		/\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
		var resReg = RegExp.$1+"."+RegExp.$2;
		if (resReg != null)
			{
			availableVersion = resReg;
			}
		}
		
	this._availableVersion = availableVersion;
	
	if (typeof CallBackFct == 'function')
		{
		CallBackFct.call(this._Parent, availableVersion, response);
		}
	};
	
IkariamSubject.DB =
	{
	_Parent: null,
	Prefix:				 null,
	Options:			 
	{
		AvailableVersion: 0,
		LastCheckUpdate:  0}
	};
	
IkariamSubject.DB.Init = function(parent, host)
	{
	// Requires: Ikariam
	this._Parent = parent;
	if (host == undefined) host = this._Parent.Ikariam.Host();
	this.Options['AvailableVersion'] = IkariamSubject.Updater._availableVersion;
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};
		
IkariamSubject.DB.Serialize = function(data)
	{
	return uneval(data);
	};

IkariamSubject.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
IkariamSubject.DB.Load_Options = function()
	{
	this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};
	};
	
IkariamSubject.DB.Save_Options = function()
	{
	GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
	};
	
IkariamSubject.Ikariam =
	{
	_Parent:		 null,
	_View:			 null,
	_Host:			 null
	};
	
IkariamSubject.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};
	
IkariamSubject.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};

IkariamSubject.Ikariam.View = function()
	{
	if (this._View == null)
		{
		this._View = '';
		
		// Fetch view name
		try
			{
			this._View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) this._View = RegExp.$1;
			}
		}
		
	return this._View;
	};
														/* var installDiv = document.createElement("div");

														installDiv.setAttribute("id","npInstall");

														installDiv.setAttribute("class","content");

														installDiv.innerHTML='<p>'+lang[local]['new']+': <a href="'+dlUrl+'">'+lang[local]['install']+'</a></p>';

														installDiv.style.borderTop='1px solid #444';

														var newpos = document.getElementById("mainview");

														var newdesc = IkariamSubject.getElementsByClass(newpos,"buildingDescription")[0];


														verChecker('ikasubject',installDiv,newdesc.lastChild);
														*/

GM_registerMenuCommand('Subject Info',cbf);

IkariamSubject.Init();
