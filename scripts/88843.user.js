// ==UserScript==
// @name           Wykop - usuwanie polityki
// @namespace      Damiani0
// @include        http://*wykop.pl/*
// @exclude        http://polityka.wykop.pl/*
// @creator		   Damiani0
// ==/UserScript==

(function(){	
	// usuwanie po grupach
	var removeByGroups = true; // true - aktywne, false - nieaktywne
	// usuwanie po tekscie
	var removeByWords = false; // true - aktywne, false - nieaktywne
	
	// grupy, po ktorych maja zostac usuniete wykopy
	var groups = [
		'Polityka'
		//'Polska' 
	];
	
	// teksty, po ktorych maja zostac usuniete wykopy
	var words = [
		'Tusk',
		'Polityka'
	];
	
	var content;
	if (document)
	{
		content = document.getElementById('content');
		if (content)
		{
			if (getCookie('wykop_damiani0') == '')
				setCookie('wykop_damiani0', 'true', 9999);
			var cookieval = getCookie('wykop_damiani0');
			
			var divMain = document.createElement('div');
			divMain.setAttribute('id', 'divMain');
			divMain.style.width = '100%';
			divMain.style.cssFloat = 'left';
			divMain.style.backgroundColor = '#DFEBED';

			var wrapper = document.getElementById('body-container').getElementsByTagName('div')[0];
			wrapper.insertBefore(divMain, content);
			
			var chkEnabled = createInput('input', 'chkEnabled', 'checkbox', '0');
			chkEnabled.addEventListener('click', run, true);
			if (cookieval == 'true')
				chkEnabled.checked = true;
			else
				chkEnabled.checked = false;
			divMain.appendChild(chkEnabled);
			
			var lblEnabled = document.createElement('label');
			lblEnabled.setAttribute('for', 'chkEnabled');
			lblEnabled.appendChild(document.createTextNode('Ukryj'));
			divMain.appendChild(lblEnabled);

			var spanInfo = document.createElement('span');
			spanInfo.setAttribute('id', 'spanInfo');
			spanInfo.style.color = '#4991C3';
			spanInfo.style.paddingLeft = '20px';
			divMain.appendChild(spanInfo);
			
			run();
		}
	}
	
	function checkElemExist(arr, elem) 
	{
		for (var i = 0; i < arr.length; i++) {
			if (elem.toLowerCase() == arr[i].toLowerCase())
				return true;
		}
		return false;
	}
	
	function createInput(elem, id, type, value)
	{
		var element = document.createElement(elem);
		element.setAttribute('id', id);
		element.setAttribute('type', type);
		//element.setAttribute('value', value);
		return element;
	}
	
	function sh(hide)
	{
		var ols = content.getElementsByTagName('ol');
		if (ols.length > 0)
		{
			var hideCount = 0;
			var lis;
			for (var j = 0; j < ols.length; j++)
			{
				if (ols[j].className == 'entry')
				{
					lis = ols[j].getElementsByTagName('li');
					break;
				}
			}
			for (var i = 0; i < lis.length; i++)
			{
				if (removeByGroups == true)
				{
					var ems = lis[i].getElementsByTagName('em');
					if (ems.length >= 2)
					{
						var k = (ems.length == 2 ? 1 : 2);
						if (checkElemExist(groups, ems[k].innerHTML))
						{
							if (hide == true)
							{
								lis[i].style.display = 'none';
								hideCount++;
							}
							else
							{
								lis[i].style.display = 'list-item';
								lis[i].style.backgroundColor = '#E7E7E7';
							}
						}
					}
				}
				if (removeByWords == true)
				{
					var textToSearch = lis[i].innerHTML.toLowerCase();
					for (var j = 0; j < words.length; j++)
					{
						if (textToSearch.indexOf(words[j].toLowerCase()) != -1)
						{
							if (hide == true)
							{
								if (lis[i].style.display != 'none')
									hideCount++;
								lis[i].style.display = 'none';
								break;
							}
							else
							{
								lis[i].style.display = 'list-item';
								lis[i].style.backgroundColor = '#E7E7E7';
							}
						}				
					}
				}
			}
			document.getElementById('spanInfo').innerHTML = 'Ukrytych wykop&#243;w&#58; ' + hideCount.toString();
		}
	}
	
	function run()
	{
		var chk = document.getElementById('chkEnabled');
		setCookie('wykop_damiani0', chk.checked, 9999);
		sh(chk.checked);
	}
	
	function setCookie(c_name, value, expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
	}
	
	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
			{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return "";
	}
})();
