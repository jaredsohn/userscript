// ==UserScript==
// @name           Newgrounds Score Filter
// @description    Allows you to filter out results when using the portal search
// @include        http://www.newgrounds.com/portal/list.php?which=mr&order=date
// @include        http://www.newgrounds.com/portal/list.php?which=mr&order=date
// ==/UserScript==

var typeControls	= new Array();
var scoreControls 	= new Array();
var viewsControls 	= new Array();

var showGames 	= true;
var showMovies 	= true;
var showWithHigherScore = true; // If false show with lower
var showWithMoreViews 	= true;	// --||--

scoreValue = 0;
viewsValue = 0;

createControlPanel();
doFilter();

function doFilter()
{
	var container 	= document.getElementsByClassName('searchlist')[0].getElementsByTagName('tbody')[0];
	var results		= container.getElementsByTagName('tr');
	var num			= results.length
	var count		= 0;
	
	// Skips first index as it's not a search result
	for (var i = 1; i < num; i++)
	{
		var tr		= results[i];
		var type 	= getType(tr);
		var score	= getScore(tr);
		var views	= getViews(tr);
		
		if ((!showMovies && type == 'movie') || (!showGames && type == 'game'))
		{
			tr.style.display = 'none';
			
			continue;
		}
		
		if ((showWithHigherScore && score < scoreValue) || (!showWithHigherScore && score >= scoreValue))
		{
			tr.style.display = 'none';
			
			continue;
		}
		
		if ((showWithMoreViews && views < viewsValue) || (!showWithMoreViews && views >= viewsValue))
		{
			tr.style.display = 'none';
			
			continue;
		}
		
		tr.style.display = '';
		count ++;
		tr.className = count % 2 == 0 ? 'even' : 'odd';
		tr.getElementsByClassName('num')[0].getElementsByTagName('span')[0].textContent = count + '.';
	}
}

function createControlPanel()
{
	var parent 			= document.getElementsByClassName('all')[0];
	
	var box	= document.createElement('div');
	box.className = 'box title';
	
	var boxTop	= createBox('top');
	boxTop.appendChild(document.createElement('div'));
	
	var boxBot	= createBox('bot');
	boxBot.appendChild(document.createElement('div'));
	
	var boxl	= createBox('l');
	var boxr	= createBox('r');
	var boxm	= createBox('m');
	var headsizer 			= document.createElement('div');
	headsizer.className 	= 'headsizer';
	var heading 			= document.createElement('div');
	heading.className 		= 'heading';
	var h2 					= document.createElement('h2');
	h2.className 			= 'i-article';
	h2.textContent			= 'Filter Options';
	
	boxl.appendChild(boxr);
	boxr.appendChild(boxm);
	boxm.appendChild(headsizer);
	headsizer.appendChild(heading);
	heading.appendChild(h2);
	
	box.appendChild(boxTop);
	box.appendChild(boxl);
	box.appendChild(boxBot);
	
	parent.insertBefore(box, parent.firstChild);
	
	//
	
	var form		= document.createElement('div');
	form.id			= 'formstuff';
	
	var hr			= document.createElement('div');
	hr.className 	= 'hr';
	
	var clearfix 	= document.createElement('div');
	clearfix.className = 'clearfix';
	
	var brclear		= document.createElement('br');
	brclear.clear	= 'left';
	
	// Type options
	
	typeControls[0] 	= createButton('Games', false);
	typeControls[1] 	= createButton('Movies', false);
	typeControls[2]		= createButton(' All ', true);
	
	var fn	= function(){setType(this)};
	typeControls[0].addEventListener('click', fn, false);
	typeControls[1].addEventListener('click', fn, false);
	typeControls[2].addEventListener('click', fn, false);
	
	// Score options
	
	var txt				= document.createElement('input');
	txt.className		= 'inputfield';
	txt.type			= 'text';
	txt.maxLength		= 4;
	txt.value			= '0.00';

	scoreControls[0]	= txt;
	scoreControls[1]	= createButton('Lower than', false);
	scoreControls[2]	= createButton('Higher than', true);

	var fn	= function(){setScore(this)};
	scoreControls[0].addEventListener('change', setScoreValue, false);
	scoreControls[1].addEventListener('click', fn, false);
	scoreControls[2].addEventListener('click', fn, false);
	
	// Views options
	
	var txt				= document.createElement('input');
	txt.className		= 'inputfield';
	txt.type			= 'text';
	txt.maxLength		= 10;
	txt.value			= '0';
	
	viewsControls[0]	= txt;
	viewsControls[1]	= createButton('Less than', false);
	viewsControls[2]	= createButton('More than', true);
	
	var fn	= function(){setViews(this)};
	viewsControls[0].addEventListener('change', setViewsValue, false);
	viewsControls[1].addEventListener('click', fn, false);
	viewsControls[2].addEventListener('click', fn, false);
	
	form.appendChild(createFormLine('Submission Type', false, typeControls));
	form.appendChild(createFormLine('Score', false, scoreControls));
	form.appendChild(createFormLine('Views', true, viewsControls));
	form.appendChild(clearfix.cloneNode(false));
	form.appendChild(brclear.cloneNode(false));
	boxm.appendChild(form);
}

function setScore(clickedButton)
{
	if (String(clickedButton.className).indexOf('dead', 0) != -1) return;
	
	setButtonState(clickedButton, true);
	
	if (clickedButton == scoreControls[1])
	{
		showWithHigherScore = false;
		setButtonState(scoreControls[2], false);
	}
	else
	{
		showWithHigherScore = true;
		setButtonState(scoreControls[1], false);
	}
	
	doFilter();
}

function setViews(clickedButton)
{
	if (String(clickedButton.className).indexOf('dead', 0) != -1) return;
	
	setButtonState(clickedButton, true);
	
	if (clickedButton == viewsControls[1])
	{
		showWithMoreViews = false;
		setButtonState(viewsControls[2], false);
	}
	else
	{
		showWithMoreViews = true;
		setButtonState(viewsControls[1], false);
	}
	
	doFilter();
}

function setType(clickedButton)
{
	if (String(clickedButton.className).indexOf('dead', 0) != -1) return;
	
	for (var i = 0; i < typeControls.length; i++)
	{
		setButtonState(typeControls[i], false)
	}
	setButtonState(clickedButton, true)
	
	var type = clickedButton.firstChild.textContent;
	
	if (type == 'Games')
	{
		showGames 	= true;
		showMovies 	= false;
	}
	else if (type == 'Movies')
	{
		showGames 	= false;
		showMovies 	= true;
	}
	else
	{
		showGames 	= true;
		showMovies 	= true;
	}
	
	doFilter();
}

function setScoreValue()
{
	scoreValue = Number(scoreControls[0].value);
	
	if (isNaN(scoreValue))
	{
		scoreValue 				= 0;
		// scoreControls[0].value 	= '0.00';
	}
	
	doFilter();
}

function setViewsValue()
{
	viewsValue = Number(viewsControls[0].value);
	
	if (isNaN(viewsValue))
	{
		viewsValue 				= 0;
		// viewsControls[0].value 	= '0.00';
	}
	
	doFilter();
}

function createButton(label, dead)
{
	var btnSpan	= document.createElement('span');
	btnSpan.className = 'btn';
	
	var lblA			= document.createElement('a');
	lblA.textContent = label;
	
	var lblSpan			= document.createElement('span');
	lblSpan.textContent = label;
	
	btnSpan.appendChild(lblA);
	btnSpan.appendChild(lblSpan);
	
	setButtonState(btnSpan, dead);
	
	return btnSpan;
}

function setButtonState(button, dead)
{
	button.className = 'btn' + (dead ? ' dead' : '');
	button.childNodes[0].style.display = dead ? 'none' : ''; // <a>
	button.childNodes[1].style.display = dead ? '' : 'none'; // <span>
}

function createBox(class)
{
	var box = document.createElement('div');
	box.className = 'box' + class;
	
	return box;
}

function createFormLine(label, last, controls)
{
	var clearfix 	= document.createElement('div');
	clearfix.className = 'clearfix';
	
	var brclear		= document.createElement('br');
	brclear.clear	= 'left';
	
	var line 		= document.createElement('div');
	line.className 	= last ? 'lastline' : 'line';
	
	var fl			= document.createElement('span');
	fl.className	= 'fl';
	fl.innerHTML	= '<label>' + label + '</label>:';
	
	line.appendChild(fl);
	
	for (var i = 0; i < controls.length; i++)
	{
		line.appendChild(controls[i]);
	}
	
	if (!last)
	{

		line.appendChild(brclear.cloneNode(false));
	}
	
	return line;
}

function getType(tr)
{
	var type	= tr.getElementsByClassName('num')[0].getElementsByTagName('span')[0].className;
	return type;
}

function getScore(tr)
{
	var score	= tr.getElementsByClassName('sts')[0].getElementsByClassName('white')[0].textContent;
	return score;
}

function getViews(tr)
{
	var views  = tr.getElementsByClassName('sts')[0].childNodes[5].textContent;
	views		= views.replace('Views: ', '');
	views		= views.replace(',', '');
	
	return views;
}