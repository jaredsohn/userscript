// ==UserScript==
// @name           Mineshafter Lite
// @namespace      download
// @include        http://minecraft.net/play/
// @include        http://www.minecraft.net/play/
// ==/UserScript==

var launcherVersion=12;
var proxyVersion;
var currentVersion;
var sessionId;
var ticket;
var mcusername;

var content=document.getElementById("content");
content.style.textAlign="center";
content.style.paddingTop="100px";
while(content.firstChild) content.removeChild(content.firstChild);
getVersion(function(v)
{
	proxyVersion=v;
	getLogin();
});

function getLogin()
{
	var loginDiv=document.createElement("div");
	var username=document.createElement("input");
	var password=document.createElement("input");
	password.type="password";
	var btn=document.createElement("button");
	btn.textContent="login";
	loginDiv.appendChild(document.createTextNode("Username: "));
	loginDiv.appendChild(username);
	loginDiv.appendChild(document.createElement("br"));
	loginDiv.appendChild(document.createTextNode("Password: "));
	loginDiv.appendChild(password);
	loginDiv.appendChild(document.createElement("br"));
	loginDiv.appendChild(btn);
	btn.addEventListener("click",function()
	{
		btn.disabled=true;
		login(username.value,password.value,function(r)
		{
			if(r)
			{
				loginDiv.parentNode.removeChild(loginDiv);
				addApplet();
			}
			else
			{
				alert("Bad login");
				btn.disabled=false;
			}
		});
	},false);
	content.appendChild(loginDiv);
}

function getVersion(cb)
{
	GM_xmlhttpRequest(
	{
		method:"GET",
		url:"http://mineshafter.appspot.com/update?name=client",
		onload:function(r)
		{
			cb(r.responseText);
		}
	});
}

function login(username,password,cb)
{
	GM_xmlhttpRequest(
	{
		method:"POST",
		url:"http://mineshafter.appspot.com/game/getversion.jsp?proxy="+proxyVersion,
		headers:{"Content-Type":"application/x-www-form-urlencoded"},
		data:"user="+encodeURIComponent(username)+"&password="+encodeURIComponent(password)+"&version="+launcherVersion,
		onload:function(r)
		{
			r=r.responseText;
			if(r.indexOf(":")==-1) return cb(false);
			r=r.split(":");
			currentVersion=r[0];
			ticket=r[1];
			mcusername=r[2];
			sessionId=r[3];
			cb(true);
		}
	});
}

function addApplet()
{
	var applet=document.createElement("applet");
	applet.setAttribute("code","net.minecraft.Launcher");
	applet.setAttribute("archive","MinecraftLauncher.jar?v=10");
	applet.setAttribute("codebase","/game/");
	applet.setAttribute("width","854");
	applet.setAttribute("height","480");
	var p=document.createElement("param");
	p.setAttribute("name","separate_jvm");
	p.setAttribute("value","true");
	applet.appendChild(p);
	p=document.createElement("param");
	p.setAttribute("name","userName");
	p.setAttribute("value",mcusername);
	applet.appendChild(p);
	p=document.createElement("param");
	p.setAttribute("name","latestVersion");
	p.setAttribute("value",currentVersion);
	applet.appendChild(p);
	p=document.createElement("param");
	p.setAttribute("name","downloadTicket");
	p.setAttribute("value",ticket);
	applet.appendChild(p);
	p=document.createElement("param");
	p.setAttribute("name","sessionId");
	p.setAttribute("value",sessionId);
	applet.appendChild(p);
	content.appendChild(applet);
}