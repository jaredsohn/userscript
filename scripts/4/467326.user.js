// ==UserScript==
// @name        api
// @namespace   c:\
// @include     http://*/fibaro/*/devices/configuration.html?did=*
// @include     http://*/fibaro/*/scenes/edit.html?sid=*
// @include     http://*/fibaro/*/devices/virtual_edit.html?id=*
// @include     http://*/fibaro/*/devices/rgb-driver-edit.html?did=*
// @include     http://*/fibaro/*/home/login*
// @include     http://*/fibaro/*/devices/plugins.html?id=*
// @include     http://*/api/settings/info
// @include     http://*/fibaro/*/undefined
// @version     4
// @grant       none
// ==/UserScript==
function logowanie()
{
    var dane = [];
    dane[0] = ['77.80','admin','admin'];
    dane[1] = ['77.45','admin','hc3'];
    dane[2] = ['77.53','admin','stokrotka'];
    dane[3] = ['77.129','admin','admin'];
    
    for(x=0;x<dane.length;x++)
        {
            if(url.contains(dane[x][0]) == true)
                {
                  return [dane[x][1],dane[x][2]];       
                }
            
        }
    
    return ["admin","admin"];
}
var url = document.URL;
if (url.contains('configuration') == true)
{
    var newurl = url.split('/');
    var id = url.split('=');
    var new_link = 'http://' + newurl[2] + '/api/devices?id=' + id[1];
	var newNode = document.createElement("div");
	newNode.innerHTML = '<a target="_blank" id="rightMenuConnections" class="rightMenu" href="'+new_link+'">API</a>';
	var refNode = document.getElementById("rightMenuLogout");
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
} 
else if (url.contains('scenes') == true)
{
    var newurl = url.split('/');
    var id = url.split('=');
    var new_link = 'http://' + newurl[2] + '/api/scenes?id=' + id[1];
	var newNode = document.createElement("div");
	newNode.innerHTML = '<a target="_blank" id="rightMenuConnections" class="rightMenu" href="'+new_link+'">API</a>';
	var refNode = document.getElementById("rightMenuLogout");
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
} 
else if (url.contains('virtual_edit') == true)
{
    var newurl = url.split('/');
    var id = url.split('=');
    var new_link = 'http://' + newurl[2] + '/api/virtualDevices?id=' + id[1];
	var newNode = document.createElement("div");
	newNode.innerHTML = '<a target="_blank" id="rightMenuConnections" class="rightMenu" href="'+new_link+'">API</a>';
	var refNode = document.getElementById("rightMenuLogout");
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
} 
else if (url.contains('plugins') == true)
{
    var newurl = url.split('/');
    var id = url.split('=');
    var new_link = 'http://' + newurl[2] + '/api/devices?id=' + id[1];
	var newNode = document.createElement("div");
	newNode.innerHTML = '<a target="_blank" id="rightMenuConnections" class="rightMenu" href="'+new_link+'">API</a>';
	var refNode = document.getElementById("rightMenuLogout");
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
} 
else if (url.contains('rgb-driver-edit') == true)
{
    //1 api
    var newurl = url.split('/');
    var id = url.split('=');
    var new_link = 'http://' + newurl[2] + '/api/devices?id=' + id[1];
    //2 rgbprograms
    var new_link2 = 'http://' + newurl[2] + '/api/RGBPrograms';
    //ikony
    var newNode = document.createElement('div');
    newNode.innerHTML = '<a target="_blank" id="rightMenuConnections" class="rightMenu" href="' + new_link + '">API</a><a id="rightMenuDevices" class="rightMenu" href="' + new_link2 + '">API</a> ';
    var refNode = document.getElementById('rightMenuLogout');
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
}
else if (url.contains('login') == true)
{
    var newurl = url.split('/');
    var new_link = 'http://' + newurl[2] + '/api/settings/info';
    var new_link2 = url + '?autologin=true';
    console.log("login");
    var newNode = document.createElement("span");
	newNode.innerHTML = '<a target="_blank" href="' + new_link + '">HC Serial</a><a href="' + new_link2 + '">autologin</a>';
	var refNode = document.getElementById("version");
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    if (url.contains('autologin') == true)
    {
       var login = logowanie()[0];
       var pwd = logowanie()[1];
       document.getElementById("login").value = login;
       document.getElementById("pwd").value = pwd;
    }
}
else if (url.contains('info') == true)
{
    var test = document.getElementsByClassName("string")[0]; 
    var newid = test.innerHTML.split('-');
    var id = newid[1];
   // newNode.innerHTML = '<a href="http://192.168.100.2/passwords?id='+id+'">HC Serial: '+test.innerHTML+'</a>';

    console.log("info");
    var newNode = document.createElement("span");
    newNode.innerHTML = '<a href="http://192.168.100.2/passwords?id='+id+'">HC Serial: '+test.innerHTML+'</a>';
	var refNode = document.getElementById("json");
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
}
//hack na Dawida
else if (url.contains('undefined') == true)
{
    var hack = url;
    hack = hack.replace("undefined", ""); 
    window.location.href = hack;
}

