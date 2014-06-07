// JavaScript Document
// ==UserScript==
// @name           Ikariam Friends Face
// @autor          roselan
// @version        0.9.9
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    Display an online image of your beloved ika friends
// @include        http://s*.*.ikariam.*/*
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==   

GM_addStyle (".atextlabel {color:#542C0F;font:bold 12px Arial,Helvetica,sans-serif;cursor:pointer;decoration:none;");

$(document).ready(function(){
	
	// gather info about current location
	var host = window.location.host;
	var optionPage = document.getElementById("options_userData");
    
	// draw faces
	function facePlant () {
	
		if (GM_getValue(host+"style", "") == "large") {
			GM_addStyle(".extimg {height:35px; width:39px; margin-left:-2px; margin-top:-1}");
			}
		else {
			GM_addStyle(".extimg {height:34px; width:35px; margin-left:0px; margin-top:0}");
			}
			
		var friendList = $("#friends > .friends > .friend");	
				
		for (var i = 0; i < friendList.length; i++) {
			var friend = friendList[i];
			var friendSlot = $(".slotnum", friend)[0].textContent;
			var img = GM_getValue(host+friendSlot,"");
			$(".image > .extimg, .imageNew > .extimg", friend).remove();
			if (img != "") {
				$(".image, .imageNew", friend).append("<img class=extimg src="+img+"></img>")
			}
					
		}
	}
	
	// insert options in options
	function optionPlant () {
		var options = "<div id=friendfaces>";
		options += "<h3>Friend Faces</h3>";
		options += "<table cellpadding=0 cellspacing=0><tbody>";
		
		$("#friends > .friends > .friend").each( function () {
			var friend = $(this);	
			var friendID = host + $(".slotnum", friend)[0].textContent;
			value = GM_getValue(friendID, "");
			value = value != "" ? " value="+value : "";
			
			options += "<tr>";
			options += "<th>"+$(".name ", friend)[0].textContent;
			options += "<td class=friendface>";
			options += "<input type=text size=30 id="+friendID+value+" onClick=this.select();>&nbsp;&nbsp;&nbsp;";
			console.log(options);
			options += "<a class=atextlabel size=4>set</a>";
			options += "</td>";
			options += "</tr>";
		});
		
		var style = GM_getValue(host+"style", "");
		options += "<tr>";
		options += "<th>"+"Style";
		options += "<td>";
		options += "<input id=r1 type=radio name=friendFaceStyle value=large " + ((style == "large") ? "checked" : "") + ">large"+"</input>";
		options += "&nbsp;&nbsp;&nbsp;"
		options += "<input id=r2 type=radio name=friendFaceStyle value=small " + ((style == "small") ? "checked" : "") + ">small"+"</input>";
		options += "</td>";
		options += "</tr>";
		
		options += "<tbody></table></div>";
		
		$('#options_userData').parent().prepend(options);
		$('#options_userData').prepend("<h3>User</h3>");
		
		//click to set friend images 
		$(".friendface").each( function() {			
			var friend = $(this).children()[0];
			$(this).children(1).click( function(){					
				GM_setValue(friend.id, friend.value);
				facePlant();
			});
		});
		
		// radio button for small or ultra small images
		$("input[type=radio][name=friendFaceStyle]").change( function () {
			GM_setValue(host+"style", this.value);
			facePlant();				
		});
		
	}
	
	// going to first page of friends
	$("#friends > .pageup").click( function() {
		facePlant();
		if (optionPage) window.location.reload();
	});
	
	// going to the second page of friends
	$("#friends > .pagedown").click( function() {		
		facePlant();
		if (optionPage) window.location.reload();
	});
	
	// "main"
	if (optionPage) optionPlant();
	facePlant();
	
});
