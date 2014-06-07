// ==UserScript==
// @name           BGG QuickBar Helper
// @namespace      dschachtler.dssr.ch
// @include        http://www.boardgamegeek.com/quickbar/edit/*
// ==/UserScript==

var lbl;
var img;
var fadeout = 0.5;

for (var i = 0; i < 10; i++)
{
	lbl = document.getElementById("url_" + i);
	
	img = document.createElement('img');
	img.src = "http://geekdo-images.com/images/icons/silkicons/arrow_left.png";
	if (i % 2 == 0)
	{
		img.style.opacity = fadeout;
	}
	else
	{
		img.addEventListener('click',
			createMoveLeft(i),
			false
		);
	}
	lbl.parentNode.appendChild(img);
	
	img = document.createElement('img');
	img.src = "http://geekdo-images.com/images/icons/silkicons/arrow_right.png";
	if (i % 2 == 1)
	{
		img.style.opacity = fadeout;
	}
	else
	{
		img.addEventListener('click',
			createMoveRight(i),
			false
		);
	}
	lbl.parentNode.appendChild(img);
	
	img = document.createElement('img');
	img.src = "http://geekdo-images.com/images/icons/silkicons/arrow_up.png";
	if (i < 2)
	{
		img.style.opacity = fadeout;
	}
	else
	{
		img.addEventListener('click',
			createMoveUp(i),
			false
		);
	}
	lbl.parentNode.appendChild(img);
	
	img = document.createElement('img');
	img.src = "http://geekdo-images.com/images/icons/silkicons/arrow_down.png";
	if (i > 7)
	{
		img.style.opacity = fadeout;
	}
	else
	{
		img.addEventListener('click',
			createMoveDown(i),
			false
		);
	}
	lbl.parentNode.appendChild(img);
}

function createMoveLeft(i)
{
	return function()
	{
		exchange(i, i - 1);
	};
}

function createMoveRight(i)
{
	return function()
	{
		exchange(i, i + 1);
	};
}

function createMoveUp(i)
{
	return function()
	{
		exchange(i, i - 2);
	};
}

function createMoveDown(i)
{
	return function()
	{
		exchange(i, i + 2);
	};
}

function exchange(item1, item2)
{
	//alert("switching item " + item1 + " with item " + item2);
	var l = label(item1).value;
	var u = url(item1).value;
	
	label(item1).value = label(item2).value;
	url(item1).value = url(item2).value;
	
	label(item2).value = l;
	url(item2).value = u;
}

function url(i)
{
	return document.getElementById('url_' + i);
}

function label(i)
{
	return document.getElementById('label_' + i);
}