// ==UserScript==
// @name        Pomocnik balansera surowcow
// @namespace   http://shoxteam.net
// @description Pomaga w klikaniu
// @include     http://*.plemiona.pl/game.php?*&screen=market*
// @version     1.1.0
// ==/UserScript==

function getGameDoc(winvar) {
    getdoc = winvar.document;
    if (!getdoc.URL.match('game\.php')) {
        for (var i = 0; i < winvar.frames.length; i++) {
            if (winvar.frames[i].document.URL.match('game\.php')) {
                getdoc = winvar.frames[i].document
            }
        }
    }
    return getdoc
};
doc = getGameDoc(window);

function FillRes() {
    var resources = doc.forms[0];

    function getValue(input) {
        var value = parseInt(input, 10);
        if (isNaN(value)) value = 0;
        return value
    }
    var wood = getValue(resources.wood.value);
    var clay = getValue(resources.stone.value);
    var iron = getValue(resources.iron.value);

    function OKClick() {
        var arrInputs = resources.getElementsByTagName('input');
        for (var idx1 = 0; idx1 < arrInputs.length; idx1++) {
            if (arrInputs[idx1].value.indexOf('OK') != -1) {
                arrInputs[idx1].click();
                break
            }
        }
    }
    function insertValues() {
        var URLargs = doc.URL.split("&");
        for (var i = 0; i < URLargs.length; i++) {
            var args = URLargs[i].split("=");
            if (args.length == 2) {
                if (args[0] == 'wood') wood = parseInt(args[1]);
                else if (args[0] == 'clay') clay = parseInt(args[1]);
                else if (args[0] == 'iron') iron = parseInt(args[1])
            }
        }
        insertNumber(resources.wood, wood);
        insertNumber(resources.stone, clay);
        insertNumber(resources.iron, iron)
    }
	setTimeout(function()
    {
        if (doc.URL.match(/clay=/))
		{
			insertValues();
			OKClick();
		}
		else if(doc.URL.match(/confirm_send/))
			OKClick();
    }, Math.floor((Math.random()*10000)+1000));
}
if (doc.URL.match(/clay=/) || doc.URL.match(/confirm_send/))
    FillRes();