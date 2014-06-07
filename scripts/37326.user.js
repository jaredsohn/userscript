// ==UserScript==
// @name           ChatIntegrée + MWL
// @description    Script pour www.hordes.fr : récupération des plaintes MWL + ChatBox integrée (http://hordes.my-css-lab.com/) puis affichage de l'information dans la page citoyen
// @include        http://beta.hordes.fr/*
// @exclude       http://beta.hordes.fr/#
// @exclude       http://beta.hordes.fr/user/login
// @exclude       http://beta.hordes.fr/#news*
// ==/UserScript==
// 
// --------------------------------------------------------------------
// 
//
//

var gPage = "http://hordes.my-css-lab.com/xml.php";
unsafeWindow.js.XmlHttp._mw_onData = unsafeWindow.js.XmlHttp.onData;

var Message  = {
	timer: null,
	html: null,
	show: function(message) {
		if( this.html == null ) {
			this.create();
		}
		
		this.html.innerHTML = "<strong>W@nted</strong>\u00A0: " + message;
		this.html.style.opacity = '1.0';
		this.html.style.display = 'block';
		
		var delay = arguments.length > 1 ? arguments[1] : 4;
		if( delay > 0 ) {
			setTimeout(function() {Message.hide();}, (delay * 1000));
		}
		
	},
	hide: function() {
		this.timer = setInterval(function() {Message.reduceOpacity();}, 60);
	},
	reduceOpacity: function() {
		var opacity = parseFloat(this.html.style.opacity);
		opacity = (Math.round((opacity - 0.1) * 10) / 10);
		
		this.html.style.opacity = opacity;
		
		if( opacity <= 0 ) {
			this.html.style.display = 'none';
			clearInterval(this.timer);
		}
	},
	create: function() {
		this.html = document.createElement('div');
		this.html.setAttribute('id', 'hmupdater:message');
		this.html.style.cssText = 'display:none; min-width:300px; max-width:550px; position:fixed;' +
			'right: 5px; bottom: 5px; z-index:10; padding:5px 10px; color:#f0d79e;' +
			'background-color:#5c2b20; border:1px solid #b37c4a; outline:2px solid black;';
		document.body.appendChild(this.html);
	}
};

var loadok= false;

function analyseCB(data)
{		
	Message.show("R&eacute;ception des donn&eacute;es", 10);
	loadok = true;
	var doc = new DOMParser().parseFromString(data.responseText, 'application/xml');
	var entries = doc.getElementsByTagName('citizen');
    var title;
    for (var i = 0; i < entries.length; i++)
    {
        var name = entries[i].getAttribute("name");
        var plaintes = entries[i].getAttribute("plaintes");
        if (plaintes == "")
        	plaintes = 0;
        var recomms = entries[i].getAttribute("recomms");
        if (recomms == "")
        	recomms  = 0;
        var nfo = document.getElementById("mostwanted"+name.toLowerCase());        
        if (nfo != null)
		if (plaintes < recomms)
		    nfo.innerHTML = "<a href='http://hordes.my-css-lab.com/'><span style='color:yellow; text-decoration: none;'><font size=1>Citoyen Exemplaire</span></a>";
		else if (plaintes <= 5)
		    nfo.innerHTML = "<a href='http://hordes.my-css-lab.com/'><span style='color:green; text-decoration: none;'><font size=1>Citoyen Normal</span></a>";
	    else if (plaintes <= 11)
        	nfo.innerHTML = "<a href='http://hordes.my-css-lab.com/'><span style='color:blue; text-decoration: none;'><font size=1>Citoyen Moyen</span></a>";
		else if (plaintes <= 25)
		    nfo.innerHTML = "<a href='http://hordes.my-css-lab.com/'><span style='color:orange; text-decoration: none;'><font size=1>Mauvais Citoyen</span></a>";
		else
		    nfo.innerHTML = "<a href='http://hordes.my-css-lab.com/'><span style='color:red; text-decoration: none;'><font size=1>Citoyen Diabolique !</span></a>";
    }
    Message.show("Donn&eacute;es ins&eacute;r&eacute;es ", 10);
}

function wantedFind(page, getvals, callback)
{	
	window.setTimeout(function() {
    GM_xmlhttpRequest({
       method: "GET",
       url: page + "?" + getvals,
	   onload: callback
    });
  }, 0);
}



unsafeWindow.js.XmlHttp.onData = function(data) 
{
	this._mw_onData(data);	
	
	if (incitizens(data))
	{		
		setTimeout(doit, 3, data);
	}
};

function getNamefromTD(text)
{		
	if (text.getElementsByTagName('a')[0] == undefined)
    {
    	a = text.innerHTML.split("\n");      	    	
    	a = a[2].split(" ")
	   	return a[0];
	}	
	return text.getElementsByTagName('a')[0].textContent;
	
	
	return "";
	var a = text.split('\r');  
	if (a.length >= 1)
    {
    	a = a[1].split("<");
    	alert(a[0])
	   	return a[0];
	}
	return "";
}

function checkLoad()
{
	if (loadok == false)
	{
	addchatbox()
	unsafeWindow.js.XmlHttp.onData(document)
	}
}

function doit(data)
{	
	Message.show("Data sender ", 10);	
	
	var url = this.urlForBack;
	
	var doc = document.getElementById('generic_section');
	               
	var r = 0;              	
	
	var nt = "";		
	var v = document.getElementsByTagName("td"); 		
	   for(i=0;i<v.length;i++)
	   {                                             
	       var t = v[i];	       
	       if (t != undefined && t.getAttribute("class") == "name important" || t.getAttribute("class") == "important")
	       {
	            r++;	            
				var name = getNamefromTD(t);				
				if (name != "")
				{
					nt += ","+name;				
					t.innerHTML = t.innerHTML+"<div align=right id='mostwanted"+name.toLowerCase()+"'></div>";
				}
	       }
	   }
	   wantedFind(gPage, "&name="+nt, analyseCB);           	
}



function incitizens()
{
	var doc = document.getElementById('generic_section');	
	var v = doc.getElementsByTagName("div");
	for(i=0;i<v.length;i++)
	{
		t = v[i];
		if (t.getAttribute("class") == "citizens")
			return true;		
	}
	return false;
}

function addchatbox()
{
var chatbox = document.getElementById("buildingList");
if (chatbox != undefined)
{
chatbox.innerHTML = chatbox.innerHTML + '<iframe name="MWT" SRC="http://hordes.inframonde.org/" scrolling="auto" FRAMEBORDER="no" style="width:100%;height:560px;"></iframe>';
}
else
{
chatbox = document.getElementById("generic_section");
if (chatbox != undefined)
chatbox.innerHTML = chatbox.innerHTML + '<iframe name="MWT" SRC="http://hordes.inframonde.org/" scrolling="auto" FRAMEBORDER="no" style="width:100%;height:560px;"></iframe>';
}
Message.show("ChatBox OK", 10);
}

Message.show("Veuillez Patientez", 1000);
setTimeout(checkLoad, 5*1000);