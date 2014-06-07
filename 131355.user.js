// ==UserScript==
// @name           Gaddons Download Button
// @namespace      http://userscripts.org/users/457713
// @description    Adds an extra button for use with Gaddons.org
// @include        *garrysmod.org/downloads/?a=view&id=*
// @include        *steamcommunity.com/sharedfiles/filedetails/?id=*
// @downloadURL    https://userscripts.org/scripts/source/131355.user.js
// @version        1.2
// @updateURL      https://userscripts.org/scripts/source/131355.meta.js
// ==/UserScript==

var patt=new RegExp("[0-9]{2,15}");
var id = patt.exec(document.URL);

var baseURL = "http://gaddons.org/";

if (document.URL.indexOf("garrysmod.org") != -1)
{
    addGMODBtn();
}
else if (document.URL.indexOf("steamcommunity.com") != -1)
{
    addWorkshopBtn(id);
}

function addWorkshopBtn(id)
{
    var element = document.getElementById("SubscribeItemBtn");

    var button = document.createElement('a');
    button.setAttribute('class', 'btn_green_white_innerfade btn_border_2px btn_medium');
    button.setAttribute('href', baseURL + 'workshop/' + id + '/');
    button.setAttribute('style', 'right: 160px;');

    button.innerHTML = '<div class="subscribeIcon"></div>' +
                       '<span class="subscribeText">' +
                           '<div class="subscribeOption subscribe selected" id="SubscribeItemOptionAdd">Download</div>' +
                       '</span>';

    // Append the element after the real subscribe button
    if (element.nextSibling)
    {
        element.parentNode.insertBefore(button, element.nextSibling);
    }
    else
    {
        element.parentNode.appendChild(button);
    }

    // Change the stupid text to the left of it
    document.querySelectorAll(".game_area_purchase_game")[0].getElementsByTagName('h1')[0].innerHTML = "Visit Gaddons.org for GMOD 12 addons"
}

function addGMODBtn()
{
    var element = document.getElementsByTagName("form")[1];

	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('id', 'gaddonsBtn');
	button.setAttribute('style', 'width: 200px; font-size: 15px; margin-top: 15px;');
	button.setAttribute('value', 'Download @ Gaddons.org');
	
	button.addEventListener('click', visitGaddons, false);
	
	element.appendChild(button);
}

function visitGaddons()
{
    var mirrorsLink = baseURL + "addons/" + id + "/";
    var addonName = document.getElementById("downloadtitle").getElementsByTagName("h2").item(0).innerHTML;

	post_to_url(mirrorsLink, {'name' : addonName});
}

function post_to_url(path, params) 
{
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);

    for(var key in params) 
	{
        if(params.hasOwnProperty(key)) 
		{
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}