// ==UserScript==
// @name Cegah_Spam_Viva
// @description   Block thread spammer di Viva Forum
// @version 1.0.1
// @include       http://forum.viva.co.id/*
// @match         http://forum.viva.co.id/*
// @author source : Mufti Aziz Ahmad, mufti.aziz@gmail.com
// ==/UserScript==


var whit = new Array();
var patB = new Array();
var patS = new Array();
var patSF = new Array(); //sub-forum


//--------- whit Section ---------
//white list
whit=[/\[ask\]/gi,/\[help\]/gi,/\[share\]/gi,/\Sticky:/gi,/misteri/gi];

//--------- patB Section ---------
// suspected as spam
patB = [/permen/gi, /karet/gi, /perangsang/gi];

//--------- patS Section ---------
// judged as spam
patS= [/potensol/gi, /potenzol/gi, /potenzhol/gi, /obat perangsang/gi, /pembesar penis/gi, /bokep/gi, /viagra/gi, /vimax/gi, /alat bantu sex/gi, /hongsizhu/gi, /obat telat bulan/gi, /selaput dara/gi, /obat bius/gi, / 081/gi, / 082/gi, / 083/gi, / 084/gi, / 085/gi, / 086/gi, / 087/gi, / 088/gi, / 089/gi, /-081/gi, /-082/gi, /-083/gi, /-084/gi, /-085/gi, /-086/gi, /-087/gi, /-088/gi, /-089/gi, /obat tidur/gi, /lintah oil/gi, /minyak lintah/gi, /kianpi/gi, /obat kuat/gi, /fleshlight/gi, /pussy/gi,  /sexdrop/gi, /yuan ye/gi, /pembesar payudara/gi, /perangsang cair/gi, /perpanjang-penis/gi, /perbesar-penis/gi, /perangsang wanita/gi, /perangsang serbuk/gi, /cobra oil/gi, /black ant/gi, /cialis/gi, /vgrx/gi, /vigrx/gi, /boneka mirip artis/gi, /boneka full body/gi];

// judged as subfolder annoying



//--------- end Section ---------
function IsBot(param)
{
	for (var i=0; i<whit.length; i++)
	{
		if (param.match(whit[i]) != null)
		{
			return false;
		}
	}
	var foundStat = 0;
	for (var i=0; i<patB.length; i++)
	{
		if (param.match(patB[i]) != null)
		{
			foundStat++;
			if (foundStat == 3)
			{
				return true;
			}
		}
	}
	for (var i=0; i<patS.length; i++)
	{
		if (param.match(patS[i]) != null)
		{
			return true;
		}
	}
	return false;
}
function IsAnoying(param)
{
	for (var i=0; i<patSF.length; i++)
	{
		if (param.match(patSF[i]) != null)
		{
			return true;
		}
	}
	return false;
}
//------ Main proc ------
//menanggulangi spam di halaman depan
if ((document.URL.match("forum.viva.co.id/index2") != null) )
{
	var blokirs = document.getElementsByTagName("a");
	for (i=0; i<blokirs.length; i++)
	{
		if ((IsBot(blokirs[i].href) == true) || (IsBot(blokirs[i].title) == true) || (IsBot(blokirs[i].innerHTML) == true))
		{
			blokirs[i].parentNode.parentNode.innerHTML = "<div><span style='white-space:nowrap'><img class='inlineimg' src='images/icons/d026.gif' alt='cinta' border='0' title='cinta'><a href='index2.php' style='white-space:nowrap' title='Viva Forum'><strong>Viva Forum Memang Keren</strong></a></span></div><div style='white-space:nowrap'>		by <a href='http://forum.viva.co.id/users//'>Bang Mimin</a></div> <div align='right' style='white-space:nowrap'>		Today <span class='time'>00:00</span>		<a href='index2.php'><img class='inlineimg' src='images/buttons/2012/lastpost.gif' alt='Go to last post' border='0' title='Go to last post'></a>	</div>";
		}
			
	}
}
//untuk VM tidak ada pembatasan spam, siapa tau ada laporan spam ke momod
else if ((document.URL.match("forum.viva.co.id/user") != null) )
{
}

//untuk isi thread, lihat judulnya doang
else if ( (document.URL.match("html") != null) && (document.URL.match("forum.viva.co.id") != null) ) 
{
	var blokirs = document.getElementsByClassName("smallfont");
	for (i=0; i<blokirs.length; i++)
	{
		if ((IsAnoying(blokirs[i].href) == true))
		{
			blokirs[i].parentNode.innerHTML = "Annoying";
		}
		if (IsBot(blokirs[i].innerHTML) == true)
		{
			blokirs[i].parentNode.style.display = "none";
		}
	}
}
//untuk daftar isi thread sub-forum, lihat judulnya doang
else if ((document.URL.match(/forum.viva.co.id/gi) != null) )
{
	var blokirs = document.getElementsByTagName("a");
	for (i=0; i<blokirs.length; i++)
	{
		if ((IsAnoying(blokirs[i].href) == true))
		{
			blokirs[i].parentNode.parentNode.style.display = "none";
		}
		if (IsBot(blokirs[i].innerHTML) == true)
		{
			blokirs[i].parentNode.parentNode.parentNode.style.display = "none";
		}
	}
}