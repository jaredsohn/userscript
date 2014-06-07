// ==UserScript==
// @name           Gaia Online: Automatically Buy Items in the Marketplace
// @namespace      OfflineGamers.com
// @description    Automatically buys an item on the Item Detail screen.
// @include        http://gaiaonline.com/marketplace/itemdetail/*
// @include        http://www.gaiaonline.com/marketplace/itemdetail/*
// @version        2.6
// ==/UserScript==

// These should be filled in if you have multiple accounts.
// These passwords are needed for the "verify password" screen
// that appears when you attempt to buy an item.
// If the username you're using isn't on the list,
// the default_password will be used, which is useful
// if your accounts share the same password.
var passwords = {
	"Username1" : "password1",
	"Username2" : "password2",
	"Username3" : "password3",
	'*' : "munawirzackry12" // default password
};

// No need to edit below this line.
var username = document.body.innerHTML.match(/<li class="avatarName">Welcome back <span style=".+?" class=".+?">(.+?)!<\/span><\/li>/i)[1];
var anchs = document.getElementsByTagName('a'),
	buyAll = new Array(),
	buyAllLink = document.createElement('a'),
	buyingAllItems = false,
	buySort = document.getElementById("header_buyprice"),
	gaiaPassword = (typeof(passwords[username]) == "string" ? passwords[username] : passwords['*']),
	an;
var Ajax = function(type, url, params, onrsc)
	{
		http = new XMLHttpRequest();
		http.open(type, url + (type == "GET" && typeof(params) == "string" ? '?' + params : ""), true);
		http.onreadystatechange = onrsc;
		if (type == "POST")
		{
			http.setRequestHeader("Connection", "close");
			http.setRequestHeader("Content-Length", params.length);
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		http.send(type == "GET" ? null : params);
	},
	buyAllItems = function()
	{
		buyingAllItems = true;
		if (buyAll.length)
		{
			var id = buyAll.shift();
			if (document.getElementById("id" + id))
				buyItem(document.getElementById("id" + id));
			else
				buyAllItems();
		}
		else
			setTimeout("location.reload();", 300000);
	},
	buyItem = function(bi)
	{
		if (typeof(bi.getAttribute) == "undefined")
			bi = this;
		bi.removeEventListener("click", buyItem, false);
		var id = bi.getAttribute("id").split("id")[1],
			userstore = bi.getAttribute("title").split("Store ID: ")[1];
		Ajax("GET", "/marketplace/userstore/" + userstore + "/buy/?id=" + id, false, function()
			{
				if (http.readyState == 4)
				{
					if (temp = http.responseText.match(/name="nonce" value="(\d+\.\d+\.\d+)"/))
					{
						var nonce = temp[1];
						Ajax("POST", "/marketplace/userstore/" + userstore + "/buy/?id=" + id + "&step=submit", "password=" + gaiaPassword + "&nonce=" + nonce, function()
							{
								if (http.readyState == 4)
								{
									var buyNowLink = document.getElementById("id" + id);
									if (temp = http.responseText.match(/<strong>Congratulations!<\/strong> You have purchased <strong>(.*)\.<\/strong><br \/><br \/>/))
									{
										buyNowLink.parentNode.parentNode.parentNode.removeChild(buyNowLink.parentNode.parentNode);
										if (buyingAllItems)
											buyAllItems();
									}
									else if (temp = http.responseText.match(/<strong>(There were one or more errors while processing your request:)<\/strong><br \/>\s+<div class="errorMsg">([\s\w=><\.\"\/]+)<\/div>/))
									{
										buyNowLink.parentNode.parentNode.style.backgroundColor = "#f0c0c0";
										alert(temp[1] + "\n" + temp[2]);
									}
									else if (http.responseText.match(/you might have submitted the form twice, please do not refresh pages when you are submitting forms/))
									{
										for (var t = 0; t < 100000000; t++) { /* just wastin' time */ }
										buyItem(document.getElementById("id" + id));
									}
									else
									{
										var temp = http.responseText;
										while (temp.length)
										{
											alert(temp.substring(0, 5000));
											temp = temp.substring(5000, temp.length);
										}
									}
								}
							}
						);
					}
					else
						alert("This item is no longer for sale. :(");
				}
			}
		);
	};
for (an = 0; an < anchs.length; an++)
{
	if ((anchs[an].className.match(/transaction_button/)) && (anchs[an].getAttribute("href").match(/\/buy\//)))
	{
		var id = anchs[an].getAttribute("href").split("id=")[1],
			userstore = anchs[an].getAttribute("href").split("userstore/")[1].split("/buy")[0];
		buyAll.push(id);
		anchs[an].setAttribute("id", "id" + id);
		anchs[an].setAttribute("title", "Store ID: " + userstore);
		anchs[an].setAttribute("href", "javascript: void(0);");
		anchs[an].addEventListener("click", buyItem, false);
	}
}
buyAllLink.addEventListener("click", buyAllItems, false);
buyAllLink.appendChild(document.createTextNode("Buy All"));
buyAllLink.setAttribute("href", "javascript:void(0);");
buyAllLink.setAttribute("id", "buy-all-link");
buySort.appendChild(document.createTextNode('/'));
buySort.appendChild(buyAllLink);
if (location.href.match(/\?auto/))
	buyAllItems();