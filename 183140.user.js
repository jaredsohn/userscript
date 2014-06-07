// ==UserScript==
// @name		    OGame: Save Phalanx
// @namespace		localhost
// @description		Сохранение докладов фаланги
// @include		    http://*-*.ogame.gameforge.com/game/index.php?page=*
// @copyright	    2013, LogServer.Net
// @license		    GNU
// @version 	    1.0
// @author 		    Asiman
// ==/UserScript==

(function ()
{
    var myFunc = (function ()
    {
        $(document).ajaxSuccess (function(e, xhr, ajaxOptions) {
            if (ajaxOptions.url.indexOf ("page=phalanx") >= 0) {
                $("#phalanxWrap").each (function () {
                    var eventContent = document.getElementById("eventContent");
                    var strUploadDiv = "";
                        strUploadDiv += "<form action='http://phalanx.logserver.net/' method='POST' target='_blank'>";
                        strUploadDiv += "   <textarea name='phalanx_textarea' style='display:none'>"+phalanxWrap.innerHTML+"</textarea>";
                        strUploadDiv += "   <center><input type='submit' name='' class='btn_blue' value='Save' /></center>";
                        strUploadDiv += "</form>";
                    var objDiv = document.createElement("div");
                        objDiv.innerHTML = strUploadDiv;
                    phalanxWrap.appendChild(objDiv);
                });
            }
        });
    }).toString ();

	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);

}) ();
