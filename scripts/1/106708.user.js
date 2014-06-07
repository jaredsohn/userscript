// ==UserScript==
// @name           _@/ intersango
// @author         Chris Porter
// @version        0.1
// @date           2011-07-13
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        https://britcoin.co.uk/*
// @exclude        https://britcoin.co.uk/api/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// ==/UserScript==


Date.format = function(d)
{
	var dd = d.getDate(); if (dd < 10){ dd = "0" + dd; } var mm = d.getMonth()+1; if (mm < 10){ mm = "0" + mm; } var yy = d.getFullYear().toString().substr(2,3);
	var hh = d.getHours(); if (hh < 10){ hh = "0" + hh; } var nn = d.getMinutes(); if (nn < 10){ nn = "0" + nn; } var ss = d.getSeconds(); if (ss < 10){ ss = "0" + ss; }
	var ds = hh + ":" + nn /*+ ":" + ss*/ + " " + dd + "/" + mm + "/" + yy;
	return ds;
}

Math.dp = function(value, dp)
{
	var result = Math.round(value * Math.pow(10,dp)) / Math.pow(10,dp);
	return result;
}



$(document).ready(function()
{

	// load state information from localStorage
	var state = JSON.parse(localStorage.getItem("state")||"{\"login\":{\"auto\":false,\"openid\":\"\",\"remember\":false,\"persist\":false},\"hideCancelledOrders\":true,\"hideCompletedOrders\":true}");



	// split the location.search string into a key value collection for easier interrogation
	var search = {};var a = location.search.substr(1, location.search.length).split("&");for ( var i in a ){ a[i] = a[i].split("="); search[a[i][0]] = a[i][1]; }
	if (typeof search["page"] == "undefined") search["page"] = "";


	// if auto-login is enabled...
	if (state.login.auto)
	{
		var $logout = $("#links ul li:contains('Logout')");

		// if we're not already logged in, redirect to the login page to proceed with auto-login
		if ($logout.length == 0 && search["page"] != "login") location.href = "/?page=login";

		// if we are logged in
		if ($logout.length == 1)
		{
			// redirect to the profile page after successful login
			if (search["page"] == "login"){ location.href = "/?page=profile"; }
			// disable auto-login if the user clicks the logout link
			$logout.click(function(event){ state.login.auto = false; localStorage.setItem("state", JSON.stringify(state)); });
		}
	}


	// create menu links to our extra pages
	$("#links ul li:contains('Orderbook')").after("<li><a href='?page=market'>Market</a>See what's happening</li>");

	// rewrite the document title to indicate the current page
	var $link = $("#links a[href*='" + search["page"] + "']");
	if ($link.length == 1) document.title = document.title + ": " + $link.text();

	// if we're logged in and persistent login is enabled, prevent timeout by refreshing page every 5 minutes
	if ($("#links ul li:contains('Logout')").length == 1 && state.login.persist) location.href = "javascript:window.setTimeout(function(){ location.reload(); }, (1000 * 60 * 5)); void(0);";



	// page mods...

	// home
	if (search["page"] == "")
	{
		var CSS = [];
		CSS.push(".currbox, .curramount, .currsel_entry { width:250px !important; }"); // 180px
		CSS.push(".currsel_entry .currbox_right .currcode { margin-right:20px !important; }");

		var $table = $("table#exchanger");
		$table.find("tr:nth-child(1)").append("<td></td>");
		$table.find("tr:nth-child(2)").append( $table.find("tr:nth-child(3) td:nth-child(2)") );
		$table.find("tr:nth-child(3)").remove();


//			$table.find("td:nth-child(1)").each(function(index)
//			{
//				var $tr = $(this);
//				switch(index)
//				{
//					case 0: $tr.after("<td valign='top'><p><b>Exchange rate:</b></p></td>"); break;
//					case 1: $tr.after("<td><input type='text' class='curramount' /></td>"); break;
//				}
//			});

		GM_addStyle(CSS.join("\n"));
	}


	// login
	if (search["page"] == "login")
	{

		var $openid = $("input[name='openid_identifier']");


		// if remember is turned on and we have an openid stored, populate the form
		if (state.login.remember && state.login.openid != "") $openid.val(state.login.openid);

		// if autologin is enabled and we have an openid stored, log in
		if (state.login.remember && state.login.openid != "" && state.login.auto) location.href = "javascript:document.forms[0].submit(); void(0);";





		// add checkboxes to login form
		$openid.after(
		"<p style='margin-left:30px;'>" +
		"<input type='checkbox' id='remember-openid' />" +
		"<label for='remember-autoid' style='display:inline; margin-left:0px; padding-left:10px;'>Remember Me</label>" +
		"</p>" +
		"<p style='margin-left:30px;'>" +
		"<input type='checkbox' id='auto-login' />" +
		"<label for='auto-login' style='display:inline; margin-left:0px; padding-left:10px;'>Login Automatically</label>" +
		"</p>" +
		"<p style='margin-left:30px;'>" +
		"<input type='checkbox' id='prevent-timeout' />" +
		"<label for='prevent-timeout' style='display:inline; margin-left:0px; padding-left:10px;'>Prevent Timeout</label>" +
		"</p>"
		);


		var $remember = $("#remember-openid");
		$remember.click(function(event){ state.login.remember = event.target.checked; localStorage.setItem("state", JSON.stringify(state)); });
		if (state.login.remember == true) $remember.attr({ "checked":"checked" });

		var $autologin = $("#auto-login");
		$autologin.click(function(event){ state.login.auto = event.target.checked; localStorage.setItem("state", JSON.stringify(state)); });
		if (state.login.auto == true) $autologin.attr({ "checked":"checked" });

		var $persist = $("#prevent-timeout");
		$persist.click(function(event){ state.login.persist = event.target.checked; localStorage.setItem("state", JSON.stringify(state)); });
		if (state.login.persist == true) $persist.attr({ "checked":"checked" });


		$("input[type='submit']").click(function(event){ state.login.openid = $("input[name='openid_identifier']").val(); localStorage.setItem("state", JSON.stringify(state)); });

	}



	// market
	if (search["page"] == "market")
	{
		// clean the dom ready to accept new elements for trade history and market data
		with ($("div.content_box"))
		{
			empty();
			append("<h3>Trade History</h3>");
			before("<div class='content_box'><h3>Market Data</h3></div>");
		}

		// perform an ajax post to the ticker.php api page to get market data
		$.get("/api/ticker.php",
			function(_data)
			{
				// parse the retrieved JSON data
				var data = JSON.parse(_data);

				// add the daily volume to the page dom
				$("h3:contains('Market Data')").after("<p>24 hour volume is <b>" + data.ticker.vol + " BTC.</b></p>");
			}
		);

		// perform an ajax post to the gettrades.php api page to get recent trade data
		$.get("/api/getTrades.php",
			function(_data)
			{
				// parse the retrieved JSON data (trade data is returned oldest first so reverse the order)
				var data = JSON.parse(_data).reverse();

				// build a table descriptor
				var html = "";
				if (search["show_all"] != "true")
				{
					data = data.slice(0, 6);
					html += "<p>Showing 5 most recent trades ";
				}
				else
				{
					html += "<p>Showing all trades ";
				}
				html += " as of <b>" + Date.format(new Date()) + "</b>:</p>"

				// build a table to display the trade data
				html += "<table class='display_data'><tbody><tr><th>Date</th><th>Price</th><th>Amount</th><th>Value</th></tr>";
				for ( var i = 0 ; i < data.length-1 ; i++ )
				{
					var trade = data[i]; var prevTrade = data[i+1];

					// display a green up arrow or red down arrow if the price has gone up or down since the previous trade
					var arrow = "";
					if (i < (data.length - 1))
					{
						if (trade.price > prevTrade.price) arrow = " <span style='color:green;'>&#9650;</span>";
						if (trade.price < prevTrade.price) arrow = " <span style='color:red;'>&#9660;</span>";
					}

					html += "<tr>" +
					"<td>" + Date.format(new Date(parseInt(trade.date, 10) * 1000)) + "</td>" +
					"<td>" + trade.price + " GBP" + arrow + "</td>" +
					"<td>" + trade.amount + " BTC</td>" +
					"<td>" + Math.dp(parseFloat(trade.price) * parseFloat(trade.amount), 4) + " GBP</td>" +
					"</tr>";
				}
				html += "</tbody></table>";

				if (search["show_all"] != "true"){ html += "<p><a href='?page=market&show_all=true'>&gt;&gt; show all</a></p>"; }

				// add the recent trades to the page dom
				var $h3 = $("h3:contains('Trade History')");
				$h3.closest("div").children("p,table").remove();
				$h3.after(html);

			}
		);


	}



	// order book
	if (search["page"] == "orderbook")
	{
		// improve the section header descriptions
		$("h3:contains('People offering BTC for GBP')").text("Sell orders (Asks) -- People offering BTC for GBP");
		$("h3:contains('People offering GBP for BTC')").text("Buy orders (Bids) -- People offering GBP for BTC");

		// add page load date to entry list descriptors, creating descriptors if not present
		var now = Date.format(new Date());
		if (search["show_all"] == "true")
		{
			$("p:contains('Best exchange rate is 1 BTC is worth')").each(function(index)
			{
				var $p = $(this);
				$p.after("<p>Showing all " + ($p.next("table.display_data").find("tr").length - 2) + " entries as of <b>" + now + "</b>:</p>");
			});
		}
		else
		{
			$("p:contains('Showing top 5 entries:')").html("Showing top 5 entries as of <b>" + now + "</b>:</p>");
		}

		var amount = 0;
		var $table = $("table.display_data:first");
		$table.find("tr:first").append("<th>Total Value</th>");
		$table.find("tr:not(tr:first):not(tr:last) > td:nth-child(3)").each(function(index)
		{
			var $td = $(this);
			amount += parseFloat($td.text());
			$td.after("<td>" + Math.dp(amount, 2) + " GBP</td>");
		});
		$table.find("tr:last").append("<td></td>");




	}


	// profile
	if (search["page"] == "profile")
	{

		// add checkboxes to enable the showing or hiding of cancelled and completed orders
		$("h3:contains('Your orders')").after(
			"<div style='background-color:blue; margin: 0 0 8px 20px;'>" +
				"<div style='float:left; width:50%;'>" +
					"<input type='checkbox' id='hide-cancelled-orders' />" +
					"<label for='hide-cancelled-orders' style='display:inline; margin-left:0px; padding-left:10px;'>Hide cancelled</label>" +
				"</div>" +
				"<div style='float:left; width:50%;'>" +
					"<input type='checkbox' id='hide-completed-orders' />" +
					"<label for='hide-completed-orders' style='display:inline; margin-left:0px; padding-left:10px;'>Hide completed</label>" +
				"</div>" +
			"</div>"
		);


		var $checkbox = $("#hide-cancelled-orders");
		$checkbox.click(function(event)
		{
			var $table = $("div.content_box:has(h3:contains('Your orders')) table.display_data");
			var $rows = $table.find("tr:has(td:contains('Cancelled'))");

			if (event.target.checked){ $rows.hide() } else { $rows.show(); }

			state.hideCancelledOrders = event.target.checked;
			localStorage.setItem("state", JSON.stringify(state));
		});

		if (state.hideCancelledOrders)
		{
			$checkbox.attr({ "checked":"checked" });
			$("div.content_box:has(h3:contains('Your orders')) table.display_data").find("tr:has(td:contains('Cancelled'))").hide();
		}




		var $checkbox = $("#hide-completed-orders");
		$checkbox.click(function(event)
		{
			var $table = $("div.content_box:has(h3:contains('Your orders')) table.display_data");
			var $rows = $table.find("tr:has(td:contains('Completed'))");

			if (event.target.checked){ $rows.hide() } else { $rows.show(); }

			state.hideCompletedOrders = event.target.checked;
			localStorage.setItem("state", JSON.stringify(state));
		});

		if (state.hideCompletedOrders)
		{
			$checkbox.attr({ "checked":"checked" });
			$("div.content_box:has(h3:contains('Your orders')) table.display_data").find("tr:has(td:contains('Completed'))").hide();
		}



		// parse the trades list to calculate the cost / btc of each trade, and add an extra column to the table to display that value
		var re = new RegExp("[+-]{0,1}[0-9]{1,}[.]{0,}[0-9]{0,}", "g");
		var GBP = 0; var BTC = 0; var buy = { BTC:0 , GBP:0 }; var sell = { BTC:0 , GBP:0 };

		var $table = $("div.content_box:has(h3:contains('Your trades')) table.display_data");
		$table.find("tr:first > th:nth-child(3)").text("Cost / BTC");

		$table.find("tr:not(tr:first)").each(function(index)
		{
			var $tr = $(this);
			var $td = $tr.children("td").first();

			var s = $td.text();
			var r = s.match(re);

			if (r.length == 2)
			{
				if (s.substr(s.length-3,3) == "BTC")
				{
					GBP = parseFloat(r[0]); buy.GBP += GBP;
					BTC = parseFloat(r[1]); buy.BTC += BTC;
				}
				if (s.substr(s.length-3,3) == "GBP")
				{
					GBP = parseFloat(r[1]); sell.GBP += GBP;
					BTC = parseFloat(r[0]); sell.BTC += BTC;
				}

				$tr.append("<td align='right'>" + Math.dp(GBP / BTC, 8) + "</td>");

			}

		});

		// add the total buy and sell trade values and average price above the trades table
		$("h3:contains('Your trades')").after(
			"<p>You gave " + Math.dp(buy.GBP, 4) + " GBP for <b>" + Math.dp(buy.BTC, 8) + " BTC</b>. " +
			"Average buy rate for 1 BTC is <b>" + Math.dp(buy.GBP / buy.BTC, 4) + " GBP.</b></p>" +

			"<p>You gave " + Math.dp(sell.BTC, 8) + " BTC for <b>" + Math.dp(sell.GBP, 4) + " GBP</b>. " +
			"Average sell rate for 1 BTC is <b>" + Math.dp(sell.GBP / sell.BTC, 4) + " GBP.</b></p>"

		);



	}



});