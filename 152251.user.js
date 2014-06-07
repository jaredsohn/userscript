// ==UserScript==
// @name           Gmaddons Download Button v2
// @namespace      http://userscripts.org/users/492789
// @description    Adds an extra download button for use with gmaddons.webs.com
// @include        *garrysmod.org/downloads/?a=view&id=*
// @downloadURL    https://userscripts.org/scripts/source/152251.user.js
// @version        1
// @updateURL      https://userscripts.org/scripts/source/152251.meta.js
// ==/UserScript==

var addonName = document.getElementById("downloadtitle").getElementsByTagName("h2").item(0).innerHTML;

var patt=new RegExp("[0-9]{2,15}");
var id = patt.exec(document.URL);

var baseURL = "http://gmaddons.webs.com/";

var mirrorsLink = baseURL + "links/" + id;

var element = document.getElementsByTagName("form").item(1);

addBtn();

function addBtn()
{
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('id', 'gmaddonsDownloadBtn');
	button.setAttribute('style', 'width: 200px; font-size: 15px; margin-top: 15px;');
	button.setAttribute('value', 'Download @ gmaddons.webs.com');
	
	button.addEventListener('click', visitGMAddons, false);
	
	element.appendChild(button);
}

function visitGMAddons()
{
	post_to_url(mirrorsLink, {'name' : encodeURIComponent(addonName)});
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
