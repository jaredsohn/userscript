// ==UserScript==
// @name        Piratenpad uncluttered
// @namespace   https://github.com/iSnow
// @description Piratenpartei-Werbebanner wegficken!
// @include     http://*.piratenpad.de/*
// @include     https://*.piratenpad.de/*
// @version     1
// ==/UserScript==

(function () {

  // Kill the Pirate party ad Banner
	document.getElementById('b').style.display = 'none';

	// Show the top controls
	document.getElementById('padtop').style.display = 'block';

	// Remove visible margins and centering of the edit area and controls
	var padPage = document.getElementById('padpage');
	padPage.style.top = '0px';
	padPage.style.left = '0px';
	padPage.style.bottom = '0px';
	padPage.style.marginLeft = '0px';
	padPage.style.width = '100%';

	var padMain = document.getElementById('padmain');
	padMain.style.top = '0px';
	padMain.style.marginTop = '50px';

	var editBar = document.getElementById('editbar');
	editBar.style.background = '#eee';

	document.getElementById('editbarleft').style.background = '#eee';
	var docBar = document.getElementById('docbar');
	docBar.style.background = '#eee';
	docBar.style.margin = '0px';
	docBar.style.borderTop = '1px solid #ccc';

	// remove left endcap of docbar
	var docBarTable = document.getElementById ('docbartable');
	var tBody = docBarTable.getElementsByTagName('tbody')[0];
	if (tBody != undefined) {
		var firstRow  = tBody.getElementsByTagName('tr')[0];
		if (firstRow != undefined) {
			var firstcol  = firstRow.getElementsByTagName('td')[0];
			firstcol.style.display = 'none';
		} 
	}
	
	// Rearrange title controls
	var docBarTitle = document.getElementById('docbarpadtitle');
	docBarTitle.style.top = '-26px';
	docBarTitle.style.left = '350px';
	docBarTitle.style.width = 'auto';
	docBarTitle.style.maxWidth = '750px';
	docBarTitle.style.display = 'block';
	docBarTitle.style.position = 'absolute';

	var docBarRenameLink = document.getElementById('docbarrenamelink');
	docBarRenameLink.style.top = '-23px';
	docBarRenameLink.style.display = 'block';
	docBarRenameLink.style.position = 'absolute';

	var editDocBarTitle = document.getElementById('padtitleedit');
	editDocBarTitle.style.top = '-26px';
	editDocBarTitle.style.left = '350px';
	editDocBarTitle.style.display = 'block';
	editDocBarTitle.style.position = 'absolute';
	editDocBarTitle.style.width = '300px';

	var editDocBarTitleButtons = document.getElementById('padtitlebuttons');
	editDocBarTitleButtons.style.top = '-23px';
	editDocBarTitleButtons.style.left = '270px';
	editDocBarTitleButtons.style.display = 'block';
	editDocBarTitleButtons.style.position = 'absolute';

	var backToProSite = document.getElementById('backtoprosite');
	backToProSite.style.background = '#eee';
	backToProSite.style.color = '#444444';

	document.getElementById('editbartable').style.left = '28px';

	var topBar = document.getElementById ('topbar');
	topBar.style.background = '#eee';

	// Hide clutter
	document.getElementById ('topbarleft').style.display = 'none';
	document.getElementById ('topbarright').style.display = 'none';
	document.getElementById ('topbarcenter').style.display = 'none';
	document.getElementById ('editbarright').style.display = 'none';


	// Adjust left ruler borders
	var editorContainerBox = document.getElementById('editorcontainerbox');
	editorContainerBox.style.borderTop = '1px solid #999999';
	editorContainerBox.style.borderLeft = '0px solid #999999';

	

} () );
