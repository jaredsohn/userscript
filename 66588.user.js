// ==UserScript==
// @name           MKU - Student Automation - Create Links for Class List
// @description    Creates links for Exam Result Lists of Student's Class on Student Automation of Mustafa Kemal University
// @version        2.0
// @date           16.01.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        http://*.mku.edu.tr/*
// @include        http://194.27.44.*/*
// ==/UserScript==

window.helloworld = function()
{
	var re_u_1 = /\/not\.asp/;

	if (document.frames)
	{
		var n10 = document.frames[1];
		var m10 = document.frames[0];
		var na = document.frames[1].document;
		var ma = document.frames[0].document;
		var ao = document.frames[1].document.tables[1];
		var bo = document.frames[1].document.tables[1].rows;
		var xo = document.frames[0].document.forms[3];
//		alert('debug1');
	}
	else
	{
		var n10 = document.getElementsByTagName('frame')[1];
		var m10 = document.getElementsByTagName('frame')[0];
		var na = document.getElementsByTagName('frame')[1].contentDocument;
		var ma = document.getElementsByTagName('frame')[0].contentDocument;
		var ao = document.getElementsByTagName('frame')[1].contentDocument.getElementsByTagName('table')[1];
		var bo = document.getElementsByTagName('frame')[1].contentDocument.getElementsByTagName('table')[1].getElementsByTagName('tr');
		var xo = document.getElementsByTagName('frame')[0].contentDocument.getElementsByTagName('form')[3];
//		alert('debug2');
	}

	var l10 = n10.contentWindow.location.href;
	var dsd = l10.match(re_u_1);
	if (n10 && ao && bo && dsd)
	{
		if (xo)
		{
			inputs = xo.getElementsByTagName('input');
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].name=='ogrno')
				{
					var usn = inputs[i].value;
				}
				if (inputs[i].name=='pass')
				{
					var pwd = inputs[i].value;
				}
				if (inputs[i].name=='bolum')
				{
					var bolum = inputs[i].value;
				}
			}
		}
		var myform = na.createElement('form');
		myform.setAttribute('id', 'ders_not_sinif');
		myform.setAttribute('name', 'ders_not_sinif');
		myform.setAttribute('method', 'post');
		myform.setAttribute('action', 'notsinif.asp');
		myform.setAttribute('enctype', 'application/x-www-form-urlencoded');
		myform.setAttribute('target', 'main');
		var input1 = na.createElement('input');
		var input2 = na.createElement('input');
		var input3 = na.createElement('input');
		var input4 = na.createElement('input');
		var input5 = na.createElement('input');
		var input6 = na.createElement('input');
		var input7 = na.createElement('input');
		var input8 = na.createElement('input');
		var input9 = na.createElement('input');
		input1.setAttribute('type', 'hidden');
		input2.setAttribute('type', 'hidden');
		input3.setAttribute('type', 'hidden');
		input4.setAttribute('type', 'hidden');
		input5.setAttribute('type', 'hidden');
		input6.setAttribute('type', 'hidden');
		input7.setAttribute('type', 'hidden');
		input8.setAttribute('type', 'hidden');
		input9.setAttribute('type', 'hidden');

		input1.setAttribute('name', 'ogrno');
		input2.setAttribute('name', 'pass');
		input3.setAttribute('name', 'notharf');
		input4.setAttribute('name', 'harftip');
		input5.setAttribute('name', 'bolum');
		input6.setAttribute('name', 'yil');
		input7.setAttribute('name', 'dersno');
		input8.setAttribute('name', 'dersadi');
		input9.setAttribute('name', 'login');

		input1.setAttribute('id', 'xogrno');
		input2.setAttribute('id', 'xpass');
		input3.setAttribute('id', 'xnotharf');
		input4.setAttribute('id', 'xharftip');
		input5.setAttribute('id', 'xbolum');
		input6.setAttribute('id', 'xyil');
		input7.setAttribute('id', 'xdersno');
		input8.setAttribute('id', 'xdersadi');
		input9.setAttribute('id', 'xlogin');

		input1.setAttribute('value', '');
		input2.setAttribute('value', '');
		input3.setAttribute('value', '1');
		input4.setAttribute('value', '0');
		input5.setAttribute('value', '');
		input6.setAttribute('value', '');
		input7.setAttribute('value', '');
		input8.setAttribute('value', '');
		input9.setAttribute('value', 'Sinif Listesi');

		if (pwd==undefined || usn==undefined)
		{
			alert('couldnt detect username and/or password');
		}
		else
		{
			input1.setAttribute('value', usn);
			input2.setAttribute('value', pwd);
		}
		if (pwd==bolum)
		{
			alert('couldnt detect department');
		}
		else
		{
			input5.setAttribute('value', bolum);
		}
		myform.appendChild(input1);
		myform.appendChild(input2);
		myform.appendChild(input3);
		myform.appendChild(input4);
		myform.appendChild(input5);
		myform.appendChild(input6);
		myform.appendChild(input7);
		myform.appendChild(input8);
		myform.appendChild(input9);

		var myscript = na.createElement('script');
		myscript.appendChild(na.createTextNode('function ders_not_listesi_goster(derskodu,dersyili)' + "\n"
+'{' + "\n"
+'	document.getElementById(\'xyil\').value=dersyili;' + "\n"
+'	document.getElementById(\'xdersno\').value=derskodu;' + "\n"
+'	document.getElementById(\'ders_not_sinif\').submit();' + "\n"
+'}' + "\n"
+''));

		var theBody = na.getElementsByTagName('body')[0];
		theBody.appendChild(myform);
		theBody.appendChild(myscript);

		// ADD LINKS FOR LIST
		for (var i = 0; i < bo.length; i++) {
			var co = bo[i].getElementsByTagName('td');
			if (co && (co.length > 3) && co[0].lastChild.lastChild.lastChild.lastChild)
			{
				var td_textNode1 = co[0].lastChild.lastChild.lastChild.lastChild;
				var td_textNode2 = co[1].lastChild.lastChild.lastChild.lastChild;
				var re1 = /[\d]{7}/;
				var re2 = /[\d]{4}/;
				var derskodu = td_textNode1.nodeValue.match(re1);
				var dersyili = td_textNode2.nodeValue.match(re2);
				if (derskodu && dersyili)
				{
//					alert('Ders Kodu: '+derskodu+' Ders Yili: '+dersyili);
					var link = na.createElement('a');
					link.setAttribute('href', 'javascript:;');
					link.setAttribute('onClick', 'javascript:ders_not_listesi_goster(\''+derskodu+'\',\''+dersyili+'\');');
					link.appendChild(na.createTextNode(derskodu));
					td_textNode1.parentNode.insertBefore(link,td_textNode1);
					link.parentNode.removeChild(link.parentNode.lastChild);
				}
			}
		}
		// REPLACE DURUM
		for (var i = 0; i < bo.length; i++) {
			var co = bo[i].getElementsByTagName('td');
			if (co && (co.length > 3) && co[12].lastChild.lastChild.lastChild.lastChild)
			{
				var td_durumNode = co[12].lastChild.lastChild.lastChild.lastChild;
				if (td_durumNode.nodeValue=="2")
				{
					td_durumNode.nodeValue="GE"+"\u00C7"+"T"+"\u0130";
				}
				if (td_durumNode.nodeValue=="3")
				{
					td_durumNode.nodeValue="BA"+"\u015E"+"ARISIZ";
				}
			}
		}
		// ADD & FILL GN CELL
		for (var i = 0; i < bo.length; i++) {
			var co = bo[i].getElementsByTagName('td');
			if (co && (co.length > 3) && co[12] && co[11].lastChild.lastChild.lastChild.lastChild)
			{
				if (co[11].lastChild.lastChild.lastChild.lastChild.nodeValue=="Harf")
				{
					var GNcell = na.createElement('td');
					GNcell.innerHTML = '<center><font color="white" size="1"><b>GN</b></font></center>';
					co[11].parentNode.insertBefore(GNcell,co[11]);
				}
				harfRegExp = /^[a-zA-Z0-9]{1,2}|[-]{1,2}$/
				harfVal=co[11].lastChild.lastChild.lastChild.lastChild.nodeValue;
				if ( (co[co.length-1].lastChild.lastChild.lastChild.lastChild.nodeValue!="Durum") && harfRegExp.test(harfVal) )
				{
					// Vize, Final veya Butunlemeden herhangi birine girmisse GN hesapla
					notRegExp = /^[0-9]+$/g
					if ( co[6].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) ||
						co[7].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) ||
						co[8].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) ||
						co[9].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) )
					{
						vizeOrt=0;
						vizeSay=0;
						if ( co[6].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) )
						{
							vize1not=parseInt(co[6].lastChild.lastChild.lastChild.lastChild.nodeValue);
							vizeOrt=vizeOrt+vize1not;
							vizeSay=vizeSay+1;
						}
						if ( co[7].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) )
						{
							vize2not=parseInt(co[7].lastChild.lastChild.lastChild.lastChild.nodeValue)
							vizeOrt=vizeOrt+vize2not;
							vizeSay=vizeSay+1;
						}
						if (vizeSay==2)
						{
							vizeOrt=(vizeOrt/2);
						}
						finalnot=0;
						if ( co[8].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) )
						{
							finalnot=parseInt(co[8].lastChild.lastChild.lastChild.lastChild.nodeValue);
						}
						// Butunleme notu varsa butunlemeye gore hesapla
						if ( co[9].lastChild.lastChild.lastChild.lastChild.nodeValue.match(notRegExp) )
						{
							butnot=parseInt(co[9].lastChild.lastChild.lastChild.lastChild.nodeValue)
							gecmenot=((vizeOrt*40)/100)+((butnot*60)/100);
						} else { // Butunleme notu yoksa final notuna gore hesapla
							gecmenot=((vizeOrt*40)/100)+((finalnot*60)/100);
						}
						var GNcell = na.createElement('td');
						if (co[12].lastChild.lastChild.lastChild.lastChild && (co[12].lastChild.lastChild.getAttribute('color')=="red") )
						{
							derscolor='red';
						}
						else
						{
							derscolor='black';
						}
						GNcell.innerHTML = '<center><font color="'+derscolor+'" size="1"><b>'+Math.round(gecmenot)+'</b></font></center>';
						co[11].parentNode.insertBefore(GNcell,co[11]);
					}
					else
					{
						var GNcell = na.createElement('td');
						GNcell.innerHTML = '<center><font color="black" size="1"><b></b></font></center>';
						co[11].parentNode.insertBefore(GNcell,co[11]);
					}
				}
			}
		}
	}
}

/*unsafeWindow.ders_not_listesi_goster = function(derskodu,dersyili) {
}*/

window.addEventListener("DOMFrameContentLoaded", helloworld, true);
