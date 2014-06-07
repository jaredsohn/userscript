// ==UserScript==
// @name Bitefight: Forum News for game
// @namespace Bitefight: Forum News for game
// @version 0.2
// @creator Asiman
// @include		http://s*.ru.bitefight.gameforge.com/*
// ==/UserScript==

    var sSelect = localStorage.getItem('sSelect');
    if(!sSelect) sSelect = 5;

    var objContainer = document.getElementById('menuHead');

    var objHeight = 90 + 60 * sSelect;

    var objDiv = document.createElement('div');
        objDiv.id = 'seting';
        objDiv.style = 'text-align: right';
        objDiv.innerHTML = '<img src="http://www.iconsearch.ru/uploads/icons/humano2/16x16/cog-icon-2-48x48.png" width="16" height="16" alt="Настройки" />';

    var objOption = document.createElement('div');
        objOption.innerHTML = '<select id="objSelect" size="1"><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select> <input type="button" value="Save" id="objButton"/>';
        objOption.id = 'divSelect';
        objOption.style.display = 'none';

	var objDivF = document.createElement('div');
		objDivF.innerHTML = '<li><iframe src="http://bf.logserver.net/news/forum_last_m.php?n='+sSelect+'" width="150px" height="'+objHeight+'px" frameborder="0" scrolling="no" align="center"></iframe></li>';

	objContainer.appendChild(objDiv);
	objContainer.appendChild(objOption);
	objContainer.appendChild(objDivF);

    $('#seting').click(function() {
        if(document.getElementById('divSelect').style.display == 'none') document.getElementById('divSelect').style.display = 'block';
        else document.getElementById('divSelect').style.display = 'none';
    });

    $('#objButton').click(function() {
        var objSelect = document.getElementById('objSelect').value;
        localStorage.setItem('sSelect', objSelect);
        document.location.href = document.location.href;
    });
