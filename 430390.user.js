// ==UserScript==
// @name		WRMdoc™ Helper with fixed date
// @namespace	WRMdocHelper / fixed date
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @include		*erepublik.com/*/main/messages*
// @include		*erepublik.com/*/economy/market/*?customOffer=true*
// @version		4.3
// @downloadURL	http://userscripts.org/scripts/source/412326.user.js
// @updateURL	http://userscripts.org/scripts/source/412326.meta.js
// ==/UserScript==

function addZero(z)
{
	if (z < 10)
	{
		z = "0" + z;
	}
	return z;
}

function CustomOffer()
{
	var t, e, n, l
	if ($(".success_message").length <= 0 && $(".error_message").length <= 0)
	{
		localStorage.BuyingLog = "";
		localStorage.BuyingTime = "";
		$("#marketplace table").before("<h1><a style='color:#009925;'>Step 1)</a> Buy desired quantity</h1>")
		if (t = window.location.href, e = t.split("?")[1], "undefined" == typeof e) return
		if (r = "true" == e.split("customOffer=")[1].split("&")[0] ? !0 : !1, i = parseInt(e.split("sellerId=")[1].split("&")[0]), s = decodeURI(e.split("sellerName=")[1].split("&")[0]), o = parseInt(e.split("offerId=")[1].split("&")[0]), u = parseInt(e.split("offerAmount=")[1].split("&")[0]), a = e.split("offerPrice=")[1], !r || isNaN(i) || isNaN(u) || isNaN(a)) return
		$("#marketplace table tbody tr:not(:first)").remove(), $("#marketplace .pager").remove(), n = $("#marketplace table tbody tr:first"), $(".m_product", n).attr("id", "productId_" + o), $(".m_provider a", n).attr("href", "/en/citizen/profile/" + i), $(".m_provider a", n).text(s), $(".m_stock", n).text(u), $(".m_price strong:first", n).text(a.split(".")[0]), l = $(".m_price sup strong", n), $(".m_price sup", n).html("." + a.split(".")[1] + " " + l[0].outerHTML), $(".m_quantity input", n).attr("id", "amount_" + o), $(".m_quantity input", n).attr("maxlength", "6"), $(".m_buy a", n).attr("id", o), $(".m_buy a", n).attr("data-max", u)
	}
	else if ($(".success_message").length > 0)
	{
		var RealTime = new Date();
		var CurrentTimeReadable = addZero(RealTime.getUTCHours() + 1) + ":" + addZero(RealTime.getUTCMinutes()) + ":" + addZero(RealTime.getUTCSeconds());
		var CurrentDate = RealTime.getUTCFullYear() . "-" . addZero(RealTime.getUTCMonth() + 1) + "-" + addZero(RealTime.getUTCDate());
		var t = window.location.href;
		var e = t.split("?")[1];
		var SellerNick = decodeURI(e.split("sellerName=")[1].split("&")[0]);
		var SellerID = parseInt(e.split("sellerId=")[1].split("&")[0]);
		localStorage.BuyingLog = $(".success_message").text().trim();
		localStorage.BuyingTime = CurrentDate + " " + CurrentTimeReadable + " | WRMdoc";
		$("#marketplace table").eq(0).before("<h1><a style='color:#009925;'>Step 2)</a> Send log to <a href='/en/main/messages-compose/" + SellerID + "' target='_blank'>" + SellerNick + "</a></h1>")
	}
}

function MessageHelper()
{
	$("#citizen_subject").val(localStorage.BuyingTime);
	$("#citizen_message").val(localStorage.BuyingLog);
}

function UpdateNotifier()
{
	var ScriptVersion = "4.3";
	var ScriptLink = "http://userscripts.org/scripts/source/412326.user.js";
	var MetaLink = "http://userscripts.org/scripts/source/412326.meta.js";
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: MetaLink,
		onload: function (t)
		{
			var n = t.responseText;
			var r = n.indexOf("@version") + 8;
			var i = n.indexOf("\n", r);
			var s = n.substring(r, i).trim().replace(".", '');
			var o = ScriptVersion.replace(".", "");
			if (parseInt(o) < parseInt(s))
			{
				$("#filters_summary").after("<div id='ScriptUpdate' style='text-align:center;'><h1>" + "WRMdoc™ Helper script is out of date." + ' Update it <a href="' + ScriptLink + '">here</a>.' + "</h1></div>");
			}
		}
	}
	);
}

$(document).ready(function ()
{
	if (window.location.href.indexOf("customOffer=true") > 0)
	{
		CustomOffer();
		UpdateNotifier();
	}
	else if (window.location.href.indexOf("messages") > 0)
	{
		MessageHelper();
	}
});