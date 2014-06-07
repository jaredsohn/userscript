// ==UserScript==
// @name           ToodleDo Full Screen
// @namespace      Pi
// @include        http://www.toodledo.com/views/*
// @version        1.5
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var IDsToHide = [['viewby',''],['tabs',''],['head',''],['searchtask',''],['sorttask',''],['toolbar',''],['addtask',''], ['filtertask',''],['sharetask','']];
var isFullScreen = false;

var EXPAND_PARENT = 'colhead';
var COLLAPSE_PARENT = 'viewby';

function addShowHideDiv(idToAddTo, idToCreate, imgSrc)
{
	var table1 = document.createElement('table');
	table1.id = idToCreate;
	table1.width = "100%";
	var tr1 = document.createElement('tr');
	var td1 = document.createElement('td');
	var imgCollapseExpand = document.createElement('img');
	imgCollapseExpand.src = imgSrc;
	imgCollapseExpand.addEventListener('click', ExpandCollapse, false);
	var linkImg = document.createElement('a');
	linkImg.href = "#";
	linkImg.appendChild(imgCollapseExpand);
	td1.appendChild(linkImg);
	td1.setAttribute('align','center');
	tr1.appendChild(td1);
	table1.appendChild(tr1);
	var viewDiv = document.getElementById(idToAddTo);
	viewDiv.insertBefore(table1, viewDiv.firstChild);
	return table1;
}

addShowHideDiv(COLLAPSE_PARENT, 'collapse', "http://img686.imageshack.us/img686/711/collapse.jpg");
addShowHideDiv(EXPAND_PARENT, 'expand', "http://img178.imageshack.us/img178/2615/expand.jpg");

validate();

function ExpandCollapse()
{
	if(isFullScreen)
	{
		for(i = 0; i < divs.length; i++)
		{
			var indexFound = find(IDsToHide, divs[i].id);
			if(indexFound >= 0)
			{
				divs[i].style.display = IDsToHide[indexFound][1];
				IDsToHide[indexFound][1] = '';
			}
		}
		//treat the toc differently. 
		//location.href = "javascript: if(!($('toc').visible())) toggleTOC(); void(0);";
	}
	else
	{
		for(i = 0; i < divs.length; i++)
		{
			var indexFound = find(IDsToHide, divs[i].id);
			if(indexFound >= 0)
			{
				var oldDisplay = divs[i].style.display;
				divs[i].style.display = 'none';
				IDsToHide[indexFound][1] = oldDisplay;
			}
		}
		//treat the toc differently. 
		//location.href = "javascript: if($('toc').visible()) toggleTOC(); void(0);";
	}
	
	isFullScreen = !isFullScreen;
	validate();
}

function validate()
{
	var objExpand = document.getElementById('expand');
	var objCollapse = document.getElementById('collapse');
	if(!objExpand)
		objExpand = addShowHideDiv(EXPAND_PARENT, 'expand', "http://img178.imageshack.us/img178/2615/expand.jpg");
	if(!objCollapse)
		objCollapse = addShowHideDiv(COLLAPSE_PARENT, 'collapse', "http://img686.imageshack.us/img686/711/collapse.jpg");
		
	objExpand.style.display = isFullScreen? 'inline' : 'none';
	objCollapse.style.display = isFullScreen? 'none' : 'inline';
}

function find(a, obj) 
{
  var i = a.length;
  while (i--) 
  {
    if (a[i][0] === obj)
      return i;
  }
  return -1;
}