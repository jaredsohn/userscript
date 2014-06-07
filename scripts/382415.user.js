// ==UserScript==
// @name       Noobroom ChromeCast
// @namespace  http://coderarmy.com/VidCast
// @version    1.0
// @description  Adds link to cast to Chromecast using VidCast from dabble.me
// @match      noobroom9.com/*
// @copyright  2014+, CoderArmy.com
// ==/UserScript==

function iprl5()
{
    //alert('jk');
    var d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;
    
    try
    {
        if(!b)throw(0);
        z.setAttribute('src','https://dabble.me/cast/bookmarklet.js?'+(new Date().getTime()));
        
        //alert(z.getAttribute('src'));
        b.appendChild(z);
    }
    catch(e)
    {
        alert('Please wait until the page has loaded.');
    }
}

var anchs = document.getElementsByTagName('a');

for(var i = 0;i < anchs.length; i++)
{ 
	if(anchs[i].innerHTML == 'Download / Stream to iDevice')
    {
        var ns = document.createElement('a');
        var lb = document.createElement('br');
        
		ns.innerHTML = 'Cast to TV';
        ns.setAttribute('style','text-decoration: underline; color:#ffffff');
        ns.setAttribute('href','#');
        ns.onclick = function() {iprl5();};
        //ns.setAttribute('onclick','iprl15();return false;');
        anchs[i].parentNode.appendChild(lb);
        anchs[i].parentNode.appendChild(ns);
    }
    
}