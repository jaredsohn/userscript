// ==UserScript==
// @name		Pinkish orkut
// @author		Aamiz <http://www.orkut.com/Profile.aspx?uid=15516463487148722538>
// @description		Its Pinkish... With New Look
// @include	 	http://www.orkut.com/*
// ==/UserScript==


// Aamiz Server
	var aserver = 'http://www.geocities.com/aamir4u98/Pinkish/';
	

// css file
	var head=document.getElementsByTagName('head').item(0);
	link=document.createElement('link');
	link.href=aserver+'castro002.css';
	link.type='text/css';
	link.rel='stylesheet';
	link.defer=true;
	head.appendChild(link);


//my link
	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Profile.aspx?uid=15516463487148722538'>&#945;&#945;&#1084;&#953;z Profile</a>&nbsp;|&nbsp;</li><li><a href='http://www.orkutrix.com'>Orkutrix</a></li>";



	pinky=document.body.innerHTML;



//my profile
	var urld=document.URL;

	if (urld=='http://www.orkut.com/Profile.aspx?uid=15516463487148722538')
	{
	pinky=pinky.replace(/!-----!/g,"! &#961;&#953;&#960;&#954;&#953;&#353;&#1085;&#32;&#920;&#1075;&#954;&#956;&#964;&#10; !");
	}


	if (urld=='http://www.orkut.com/Profile.aspx?uid=17133030912712616066')
	{
	pinky=pinky.replace(/!-----!/g,"! &#961;&#953;&#960;&#954;&#953;&#353;&#1085;&#32;&#920;&#1075;&#954;&#956;&#964;&#10; !");
	}

	if (urld=='http://www.orkut.com/Profile.aspx?uid=2480935886382860948')
	{
	pinky=pinky.replace(/!-----!/g,"! &#961;&#953;&#960;&#954;&#953;&#353;&#1085;&#32;&#920;&#1075;&#954;&#956;&#964;&#10; !");
	}




//end work
	document.body.innerHTML=pinky+'<p align="center"></p>';

	document.body.text='#151515';

