/*
		12306 Auto Query => A javascript snippet to help you book tickets online.
		Copyright (C) 2011 Jingqin Lynn
		
		Includes jQuery
		Copyright 2011, John Resig
		Dual licensed under the MIT or GPL Version 2 licenses.
		http://jquery.org/license

		Includes Sizzle.js
		http://sizzlejs.com/
		Copyright 2011, The Dojo Foundation
		Released under the MIT, BSD, and GPL Licenses.
		
		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @name 		12306 Auto Query
// @namespace		http://project.quietmusic.org/j/
// @description	A javascript snippet to help you book tickets online.
// @include		*://dynamic.12306.cn/otsweb/order/querySingleAction.do*

// ==/UserScript==

function withjQuery(callback, safe){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
		
		if(safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		}
		else {
			var dollar = undefined;
			if(typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery);
			});
		}
		document.head.appendChild(script);
	} else {
		callback(jQuery);
	}
}

withjQuery(function($){
	var isTicketAvailable = false;

	//The table for displaying tickets
	var tbl = $(".obj")[0];

	tbl.addEventListener("DOMNodeInserted", function() {
		if(checkTickets(event.target))
		{
			isTicketAvailable = true;
			highLightRow(event.target);
		}
		tbl.firstAppend=false;
	}, true);

	//Trigger the button
	var doQuery = function() {
		displayQueryTimes(queryTimes++);
		isTicketAvailable = false;
		tbl.firstAppend = true;
		g.firstRemove = true;
		document.getElementById(isStudentTicket ? "stu_submitQuery" : "submitQuery").click();
	}

	var checkTickets = function(row) {
		var hasTicket = false;
		var canBook = true;
		$("td input[type=button]", row).each(function(i, e) {
			if(e.classList.contains("yuding_x")) {
				canBook = false;
			}
		});
		if(!canBook) return false;
		
		$("td", row).each(function(i, e) {
			if(ticketType[i-1]) {
				var info = e.innerText.trim();
				if(info != "--" && info != "无") {
					hasTicket = true;
					highLightCell(e);
				}
			}
		});

		return hasTicket;
	}

	//The box into which the message is inserted.
	var g = document.getElementById("gridbox");
	//When the message is removed, the query should be completed.
	g.addEventListener("DOMNodeRemoved", function() {
		if(g.firstRemove) {
			g.firstRemove = false;
			if (isTicketAvailable) {
				if (isAutoQueryEnabled)
					document.getElementById("refreshButton").click();
				onticketAvailable(); //report
			}
			else {
				 //wait for the button to become valid
			}
		}
	}, true);
	
	//hack into the validQueryButton function to detect query
	var _validQueryButton = validQueryButton;
	
	validQueryButton = function() {
		_validQueryButton();
		if(isAutoQueryEnabled) doQuery();
	}
	
	var queryTimes = 0; //counter
	var isAutoQueryEnabled = false; //enable flag

	//please DIY:
	var onticketAvailable = function() {
		if(Audio) {
			new Audio("http://upload.wikimedia.org/wikipedia/commons/8/8a/Canon_and_Gigue_in_D.ogg").play();
		}
		else {
			alert("可以订票了！")
		}
	}
	var highLightRow = function(row) {
		$(row).css("background-color", "red");
	}
	var highLightCell = function(cell) {
		$(cell).css("background-color", "blue");
	}
	var displayQueryTimes = function(n) {
		document.getElementById("refreshTimes").innerText = n;
	};

	var isStudentTicket = false;

	//Control panel UI
	$("<div/>").attr("style", "position:fixed;right:0;bottom:0;z-index:999;").append(
		$("<input/>").attr("type", "checkBox").change(function(){
			isStudentTicket = this.checked;
		})
	).append(
		$("<span/>").text("学生")
	).append(
		$("<button/>").attr("id", "refreshButton").text("自动刷新").click(function() {
			if(!isAutoQueryEnabled) {
				isAutoQueryEnabled = true;
				doQuery();
				this.innerText="停止刷新";
			}
			else {
				isAutoQueryEnabled = false;
				this.innerText="自动刷新";
			}
		})
	).append(
		$("<p/>").text("尝试次数：").append(
			$("<span/>").attr("id", "refreshTimes").text("0")
		)
	).appendTo(document.body);
	
	//Ticket type selector & UI
	var ticketType = new Array();
	$(".hdr tr:eq(2) td").each(function(i,e) {
		ticketType.push(false);
		if(i<3) return;
		ticketType[i] = true;
		
		var c = $("<input/>").attr("type", "checkBox").attr("checked", "true");
		c[0].ticketTypeId = i;
		c.change(function() {
			ticketType[this.ticketTypeId] = this.checked;
		}).appendTo(e);
	});
}, true);