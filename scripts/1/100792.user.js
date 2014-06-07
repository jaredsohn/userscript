// ==UserScript==
// @name           RoB
// @description    Displays a small clock in top left corner
// @include        http://reignofblood.net/*
// @exclude        http://reignofblood.net/ad*
// @exclude        http://reignofblood.net/vampire*
// @exclude        http://reignofblood.net/view.php?viewid=*
// @exclude        http://reignofblood.net/
// ==/UserScript==


var time_box = document.createElement('div');
time_box.setAttribute('style', 'position:fixed; top:20; left:10;');
time_box.innerHTML='<iframe src="http://free.timeanddate.com/clock/i2j7vt3g/n136/tluk/fs20/fcf00/tc000/ftb/th1" frameborder="0" width="91" height="22" allowTransparency="true"></iframe>';
document.body.insertBefore(time_box, document.body.firstChild);

// Create floating menu bar
var menuBar = document.body.appendChild(document.createElement('div'));
	menuBar.setAttribute('id', 'menu');
	menuBar.style.border = '1px solid #777';
	menuBar.style.background = '#000';
	menuBar.style.position = 'relative';
        menuBar.style.align = 'top'
	menuBar.style.padding = top;
	menuBar.style.top = 50;
	menuBar.style.left = 5;
// End floating menu bar

// Create links for menu
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/statue.php?step=holy');
	myLink.innerHTML = '<b>[pray - holy]</b><br /> ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
	
	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/covenforum.php?step=viewposts&thread=1582#bottom');
	myLink.innerHTML = '<b>[QOTD - forums]</b><br />  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
		
	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/qotd.php');
	myLink.innerHTML = '<b>[QOTD - answer]</b><br />  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);


var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/gym.php');
	myLink.innerHTML = '<b>[gym - train]</b><br />  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/die.php?step=do');
	myLink.innerHTML = '<b>[suicide]</b><br /> ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/revive.php?step=heal');
	myLink.innerHTML = '<b>[heal - turns]</b><br />  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/covenforum.php?step=threads&board=249');
	myLink.innerHTML = '<b>[audentia]</b><br />  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://reignofblood.net/logout.php?step=logout');
	myLink.innerHTML = '<b>[logout]</b><br />  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
	
	
// End links