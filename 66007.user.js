// ==UserScript==
// @name     Litportal fix
// @description Fixes litportal.ru
// @include  http://www.litportal.ru/genre*/author*/read/*
// ==/UserScript==



function EmptyFunction()
{
}

function fixWindowGetSelection()
{
	unsafeWindow.LockSel = EmptyFunction;
}

function changeFont()
{
	var allDivs, thisDiv;
	allDivs = document.evaluate("//div",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
	GM_log('allDivs len='+allDivs.snapshotLength);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if (thisDiv.style.margin == '5px 0px 15px 0px') {
			thisDiv.style.fontSize = '6';
		}
		else if (thisDiv.style.margin == '5px 0px 15px 0px') {
			thisDiv.style.fontSize = '6';
		}
		else if (thisDiv.style.margin == '10px 2px 0px 2px') {
			thisDiv.style.fontSize = '6';
		}
		else if (thisDiv.style.margin == '10px 2px 0px 2px') {
			thisDiv.style.fontSize = '6';
		}
		else if (thisDiv.style.margin == '5px 0px 5px 0px') {
			thisDiv.style.fontSize = '6';
		}

	}
}

function modifyImages()
{
	var allImages, thisImage;
	allImages = document.evaluate("//img",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
	for (var i = 0; i < allImages.snapshotLength; i++) {
		thisImage = allImages.snapshotItem(i);
		GM_log('Set dimensons for image '+thisImage.src);
		thisImage.width = '1';
		thisImage.height = '1';
	}
}


function modifyLeftPanelWidth()
{
	var allTableCols, thisCol;
	allTableCols = document.evaluate("//td[@width='140']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
	GM_log('allTableCols len='+allTableCols.snapshotLength);
	for (var i = 0; i < allTableCols.snapshotLength; i++) {
		thisCol = allTableCols.snapshotItem(i);
		thisCol.width = '6';
		thisCol.style.font.size = '4px';
	}
}

function modifyCenterWidth()
{
	var allTableCols, thisCol;
	allTableCols = document.evaluate("//td[@width='95%']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
	GM_log('allTableCols len='+allTableCols.snapshotLength);
	for (var i = 0; i < allTableCols.snapshotLength; i++) {
		thisCol = allTableCols.snapshotItem(i);
		GM_log('Set center width');
		thisCol.width = '100%';
	}
}

// Minor fix first
fixWindowGetSelection();

// I want to make some changes in the look&fill. 
// Specifically I am going to make left panel smaller
modifyImages();

modifyLeftPanelWidth();
modifyCenterWidth();
changeFont();
