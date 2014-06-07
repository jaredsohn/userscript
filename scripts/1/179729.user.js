// ==UserScript==
// @name        thx.js fix
// @namespace   thx-fix@eurotrucksimulator2.info
// @description Naprawia system podziękowań na forum
// @include     http://eurotrucksimulator2.info/pl/forum/*
// @version     v1.0
// @grant       none
// ==/UserScript==

window.thx_common = function (response)
{
	try
	{
		xml = new DOMParser().parseFromString(response.responseText, "application/xml");
		remove=xml.getElementsByTagName('del').item(0).firstChild.data=="1";
		lin=document.getElementById('a'+pid);
		if (remove) {
			table = document.getElementById('thx' + pid);
			table.style.display = xml.getElementsByTagName('display').item(0).firstChild.data != 0 ?
				 '' : 'none';
			list = document.getElementById('thx_list' + pid);
			list.innerHTML = xml.getElementsByTagName('list').item(0).firstChild.data;
			
			img = document.getElementById('i' + pid);
			img.src = xml.getElementsByTagName('image').item(0).firstChild.data;
		}
		else 
		{
			lin.innerHTML="";
			lin.onclick=null;
			lin.href="";
			lin = null;
		}
	}
	catch(err)
	{
		alert("an Error had occured please contact administrator")
		alert(err);
	}
	finally
	{
		spinner.destroy();
		spinner=null;
		return lin;
	}
	
}