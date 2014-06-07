// ==UserScript==
// @name         amazon import finder
// @author       kamo
// @namespace    http://www.yasui-kamo.com/
// @description  Search only the product of international shipping.
// @include      http://www.amazon.com/*
// @include      https://www.amazon.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

function changeBoolToInteger(val)
{
	if(val == true)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

function changeIntegerToBool(val)
{
	if(parseInt(val) == 1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function addParameter()
{
	if(document.getElementById('nav-search-label'))
	{
		if(document.getElementById("nav-iss-attach"))
		{
			var parentObj = document.getElementById("nav-iss-attach");
			if(!document.getElementById("ags_param_tag"))
			{
				var emiObj = document.createElement('span');
				emiObj.setAttribute("id", "ags_param_emi");
				parentObj.appendChild(emiObj);
				var optionObj = document.createElement('span');
				optionObj.setAttribute("id", "ags_param_field-shipping_option-bin");
				parentObj.appendChild(optionObj);
				var tagObj = document.createElement('span');
				tagObj.setAttribute("id", "ags_param_tag");
				parentObj.appendChild(tagObj);

				document.getElementById("nav-cross-shop-links").innerHTML += "<span style=\"margin-left:10px; padding:2px;\"><input id=\"ags_importcheck\" type=\"checkbox\" name=\"ags_importcheck\" checked> import finder</span>";
				var ags_importcheck = GM_getValue('ags_importcheck', '1');
				document.getElementById('ags_importcheck').checked = changeIntegerToBool(ags_importcheck);
			}
			if(document.getElementById('ags_importcheck').checked == true)
			{
				//add AmazonGlobal Eligible param
				if(parentObj.innerHTML.indexOf("yasuikamo-20") == -1)
				{
					document.getElementById("ags_param_emi").innerHTML = "<input type=\"hidden\" name=\"emi\" value=\"ATVPDKIKX0DER\">";
					document.getElementById("ags_param_field-shipping_option-bin").innerHTML = "<input type=\"hidden\" name=\"field-shipping_option-bin\" value=\"3242350011\">";
					document.getElementById("ags_param_tag").innerHTML = "<input type=\"hidden\" name=\"tag\" value=\"yasuikamo-20\">";
				}
				if(document.getElementById("searchDropdownBox").value == "search-alias=aps")
				{
					if(document.getElementById("pagn"))
					{
						//delete event;
						var pagnHTML = document.getElementById("pagn").innerHTML;
						document.getElementById("pagn").innerHTML = "";
						document.getElementById("pagn").innerHTML = pagnHTML;

						//edit page link
						var keyword = document.getElementById("twotabsearchtextbox").value;
						var url = "http://www.amazon.com/s/?field-keywords="+keyword+"&emi=ATVPDKIKX0DER&field-shipping_option-bin=3242350011";

						var childNodes = document.getElementById("pagn").getElementsByTagName('a');
						for(var i=0; i<childNodes.length; i++)
						{
							var hrefStr = childNodes[i].href;
							var sPos = hrefStr.indexOf("sr_pg_")
							if(sPos != -1)
							{
								sPos += 6;
								var ePos = hrefStr.indexOf("?", sPos);
								var page = hrefStr.substring(sPos, ePos);
								var curURL = url + "&page=" + page;
								childNodes[i].href = curURL;
							}
						}
					}
				}
			}
			else
			{
				document.getElementById("ags_param_emi").innerHTML = "";
				document.getElementById("ags_param_field-shipping_option-bin").innerHTML = "";
				document.getElementById("ags_param_tag").innerHTML = "";
			}
		}
	}
	if(document.getElementById('ags_importcheck'))
	{
		var ags_importcheck = changeBoolToInteger(document.getElementById('ags_importcheck').checked);
		window.setTimeout(function(){GM_setValue('ags_importcheck',  ags_importcheck);}, 0);
	}

	setTimeout(addParameter, 1000);
}

//main
(function(){
	addParameter();
}
)();

