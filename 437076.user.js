// ==UserScript==
// @name        sportowa.zgora.pl - Terminarz 
// @namespace   http://sportowa.zgora.pl/*
// @include     http://sportowa.zgora.pl/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
    var addIMG = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAD/8QAIRAAAQQABwEBAAAAAAAAAAAAAgEDBBEABQYSEyExBxT/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EAB8RAAIABgMBAAAAAAAAAAAAAAECAAMRIVFhBEFx8P/aAAwDAQACEQMRAD8AUNYak1rH+jZDGjaZfFoXZox44ZsAhmYIHRkngbUo0Q79pO8J2XuyH4Ed6XF/JJcaEnmORD4jVEUg3J0VLaWntYnocN+XHlvRWHJMbdwPG2im1uSi2kvY2nS17jfCOPLZHmEsTU90wMD728R5KMruSxN9YGo//9k=';
    var minusIMG = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGB//EACIQAAEEAgEEAwAAAAAAAAAAAAECAwQRAAUTBhIUMQcVIf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAHhEAAgEEAwEAAAAAAAAAAAAAAQIDAAQRcRJBkcH/2gAMAwEAAhEDEQA/ANv2XUnX7GxksQ/jXzIzby0MyPvGG+ZAJCV9pFpsUaPq8rta7Jf10Z+ZE8OS4yhb0fkDnCsgFSO4fiqNix7rGMMujjZCSXJ3j4BRuruKZFVIFQjtS+Tvk7DwCv/Z';
    var styles = '' +
    'td.myTeam {' +
    'border: 3px solid #FF0000;' +
    'padding: 5px;' +
    'background-color: #AAFF00;' +
    '}';
    var myTeam = 'Kamizelki';
    function dummy() {
    }
    function addColors() {
        var table = findElement("//table[@class='fixtures']");
        var cell;
        var row;
        teamList = readCookie('sportowa.zgora.pl.team');
        teams = teamList.split('$$');
		
		var index=1;
		
        if (table != null) {
            for (var i = 0; i < table.rows.length; i++)
            {
                row = table.rows[i];
                //	if (row.innerHTML.indexOf(myTeam) > -1){
                for (var j = 0; j < row.cells.length; j++) {
                    cell = row.cells[j];
                    style = cell.getAttribute('class');
					
                    if ((style != undefined) && (style != null) && (style != '')) {
                        var Re = new RegExp("myTeam", "g");
                        style = style.replace(Re, "");
                    }
					
                    do {
                        icon = get('img_cell' + i + '_' + j);
						
                        if (icon != null) {
                            cell.removeChild(icon);
                        }
                    } while (icon != null);
					index++;
					
					rowForTeam = false;
					
                    for (var k = 0; k < teams.length; k++) {
                        if (cell.innerHTML.indexOf(teams[k]) > - 1 && teamList != '') {
							rowForTeam = true;
                        }
                    }
					
						
					if (rowForTeam){
                        if (j == 4 || j == 8) {
                            addMinusToRows(cell, 'cell' + i + '_' + j);
							cell.setAttribute('id', 'cell' + i + '_' + j);
							cell.setAttribute('class', style + ' myTeam');
                        };
					}else{
                        if (j == 4 || j == 8) {
                            addPlusToRows(cell, 'cell' + i + '_' + j);
                            cell.setAttribute('id', 'cell' + i + '_' + j);
							cell.setAttribute('class', style);
                        }
					}
                }
                //  }                

            }
        }
    }
    function addToStoreList(imgObj)
    {
        var cell = get(imgObj.id.replace('img_', ''));
        var aLink = cell.childNodes[0];
        var name = clearHTMLTags(aLink.innerHTML);
        teamList = readCookie('sportowa.zgora.pl.team');
        teams = teamList.split('$$');
        for (var i = 0; i < teams.length; i++)
        {
            if (teams[i] == name)
            return ;
        }
        saveToCookie('sportowa.zgora.pl.team', name);
        addColors();
    }
    function removeFromStoreList(imgObj)
    {
        var cell = get(imgObj.id.replace('img_', ''));

        var aLink = cell.childNodes[0];
        var name = clearHTMLTags(aLink.innerHTML);
        removeFromCookie('sportowa.zgora.pl.team', name);
        addColors();
    }
    function addPlusToRows(cell, cellID)
    {
        var image = document.createElement('img');
        image.setAttribute('id', 'img_' + cellID);
        image.setAttribute('src', addIMG);
        image.setAttribute('class', 'image');
        image.addEventListener('click', function (event) {
            addToStoreList(this);
        }, 0);
        cell.appendChild(image);
    }
    function addMinusToRows(cell, cellID)
    {
        var image = document.createElement('img');
        image.setAttribute('id', 'img_' + cellID);
        image.setAttribute('src', minusIMG);
        image.setAttribute('class', 'image');
        image.addEventListener('click', function (event) {
            removeFromStoreList(this);
        }, 0);
        cell.appendChild(image);
    }
    function addGlobalStyle(css) {
        var head,
        style;
        head = document.getElementsByTagName('head') [0];
        if (!head) {
            return ;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    function get(id) {
        return document.getElementById(id);
    }
    function findElement(ex)
    {
        var tag = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
        );
        if (tag.snapshotLength)
        {
            var item = null;
            for (var i = 1; i <= tag.snapshotLength; i++)
            {
                item = tag.snapshotItem(i - 1);
            }
        }
        return item;
    }
    function saveToCookie(cookie, values) {
        var a = readCookie(cookie);
        if (a != null && a != '') a += '$$' + values;
         else a = values;
        createCookie(cookie, a);
    }
    function createCookie(name, value, callback) {
        if (callback == undefined) {
            callback = dummy;
        }
        GM_setValue(name, encodeURIComponent(value));
    }
    function readCookie(name) {
        return decodeURIComponent(GM_getValue(name, ''));
    }
    function clearHTMLTags(inHTML) {
        var regEx = '';
        var outText = '';
        regEx = /<[^>]*>/g;
        outText = inHTML.replace(regEx, '');
        regEx = /&nbsp;/g;
        outText = outText.replace(regEx, '');
        return outText;
    };
    function removeFromCookie(cookie, name) {
        if (confirm('Skasować zaznaczenie?'))
        {
            var a = readCookie(cookie);
            var index = 0;
            if (a != null) {
                teams = a.split('$$');
                var myTeams = new Array();
                for (var i = 0; i < teams.length; i++)
                {
                    if (teams[i] != name)
                    myTeams[index++] = teams[i];
                }
                a = myTeams.join('$$');
                createCookie(cookie, a);
            };
        };
    }
    addGlobalStyle(styles);
    addColors();
}) ();
