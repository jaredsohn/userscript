// ==UserScript==
// @name        Vartotojų Žymėjimas
// @namespace   UserTagging
// @description Galimybė pasižymėti uždarbis.lt vartotojus
// @include     http://uzdarbis.lt*
// @exclude     http://uzdarbis.lt/top
// @exclude     http://uzdarbis.lt/ips.topics.php
// @version     0.2.5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant  GM_getValue
// @grant  GM_setValue
// ==/UserScript==
jQuery.noConflict();
if(GM_getValue("userTagging_membersColors")== null) {
	var defaultnicks = {
		"Satisfaction": "UserTagging Kūrėjas"
	};
	var defaultnicksColors = {
		"Satisfaction": "#00de10"
	}
	GM_setValue("userTagging_membersColors", JSON.stringify(defaultnicksColors));
	GM_setValue("userTagging_members", JSON.stringify(defaultnicks));
}
var members = jQuery.parseJSON(GM_getValue("userTagging_members"));
var membersColors = jQuery.parseJSON(GM_getValue("userTagging_membersColors"));
var colorlist = ["#CFCFCF","#FF8A4A","#40FF80","#8181F7","#FF3232"];
var colordivs = "";
function loadColors() {
	jQuery.each(colorlist, function(index,value) {
		colordivs += '<div class="userTagging_colors" id="'+value+'" style="float:left;height:10px; width:10px; background-color:'+value+';"></div>';
	});
}
function updateMembers() {
	members = jQuery.parseJSON(GM_getValue("userTagging_members"));
	membersColors = jQuery.parseJSON(GM_getValue("userTagging_membersColors"));
}

function loadAll() {
	jQuery(".vcard").each(function () {
		var currNick = jQuery(this).children(".fn").html();
		pasteNick = "";
		pasteColor = "";
		if(typeof(members[currNick])!=='undefined') pasteNick=members[currNick];
		if(typeof(membersColors[currNick])!=='undefined') pasteColor=membersColors[currNick];
		var colorOptions = colordivs +"<br/>";
		var divToOpen = "<div id='"+currNick+"' class='userTagging_single' style='display:none; padding: 5px; font-size:12px; text-align:left;border:1px solid black;position:absolute;margin-left:140px;background-color:white;width:200px;height:100px;'> \
						Tekstas(tuščias, kad ištrinti): <br/><form><input type='text' id='userTagging_text' style='width:120px;'' value='"+pasteNick+"'/><br/>\
						Spalva(HEX kodas (6symb) su #): <br/><input type='text' id='userTagging_color' value='"+pasteColor+"'/><br/>\
						"+colorOptions+"\
						<input type='submit' class='userTagging_submit' id='"+currNick+"'value='Atnaujinti'/><span class='userTagging_output'></span>\
						</div>";
		jQuery(this).append(divToOpen);
		jQuery(this).append("<span id='"+currNick+"' class='userTagging_tag' style='font-size:8px;'>[TAG]</span>");
		if(typeof(members[currNick])!=='undefined'){
			jQuery(this).children(".fn").after("<br/><span class='userTagging_done' style='font-size:10px;word-wrap: break-word;background-color:"+membersColors[currNick]+";'> "+members[currNick]+"</span>");
		}
	});
}
function loadAll2() {
	jQuery("td[class='short']").each(function () {
		var currNick = jQuery(this).children("a").html();
			pasteNick = "";
			pasteColor = "";
			if(typeof(members[currNick])!=='undefined') pasteNick=members[currNick];
			if(typeof(membersColors[currNick])!=='undefined') pasteColor=membersColors[currNick];
			if(typeof(members[currNick])!=='undefined'){
				jQuery(this).children("a._hovertrigger").after("<br/><span class='userTagging_done' style='font-size:10px;word-wrap: break-word;background-color:"+membersColors[currNick]+";'> "+members[currNick]+"</span>");

		}
	});
}
function loadAll3() {
	jQuery("ul[class='last_post']").each(function () {
		var currNick = jQuery(this).children("li").children("a._hovertrigger").html();
		if(typeof(currNick)!=='undefined') {
			pasteNick = "";
			pasteColor = "";
			if(typeof(members[currNick])!=='undefined') pasteNick=members[currNick];
			if(typeof(membersColors[currNick])!=='undefined') pasteColor=membersColors[currNick];
			if(typeof(members[currNick])!=='undefined'){
				jQuery(this).children("li").children("a._hovertrigger").after("<br/><span class='userTagging_done' style='font-size:10px;word-wrap: break-word;background-color:"+membersColors[currNick]+";'> "+members[currNick]+"</span>");
			}
		}
	});
}
function findAndUpdateSingle(nick, text, color, exists) {
	var members = jQuery.parseJSON(GM_getValue("userTagging_members"));
	var membersColors = jQuery.parseJSON(GM_getValue("userTagging_membersColors"));
	console.log(nick + " "+ text + " "+color);
	jQuery(".vcard").each(function () {

		var currNick = jQuery(this).children(".fn").html();
		console.log(currNick);
		if(currNick == nick) {
			if(exists==0) {
				jQuery(this).children(".fn").after("<br/><span class='userTagging_done' style='font-size:10px;word-wrap: break-word;background-color:"+membersColors[currNick]+";'> "+members[currNick]+"</span>");
			} else {
				jQuery(this).children(".userTagging_done").css("background-color",color);
				jQuery(this).children(".userTagging_done").html(text);
			}
		}
	});
}
var members = jQuery.parseJSON(GM_getValue("userTagging_members"));
var membersColors = jQuery.parseJSON(GM_getValue("userTagging_membersColors"));

jQuery(document).ready(function() {
	loadColors();
	updateMembers();
	loadAll();
	loadAll2();
	loadAll3();
	jQuery(".userTagging_colors").click(function() {
		jQuery(this).parent().children("#userTagging_color").val(jQuery(this).attr("id"));
	});
	jQuery(".userTagging_tag").click(function () {

		jQuery(this).parent().children(".userTagging_single").toggle();
		var userClicked = jQuery(this).attr("id");

	});
	jQuery(".userTagging_submit").click(function (e) {
		e.preventDefault();


		var exists = 1;
		var currNick = jQuery(this).attr("id");
		var hex = jQuery(this).parent().children("#userTagging_color").val();
		var isHex = /^#[0-9A-F]{6}$/i.test(hex);

		var text = jQuery(this).parent().children("#userTagging_text").val();

		console.log("Text: "+text);
		console.log("Color: "+hex);
		console.log("Nick: "+currNick);
		if(text === "") {
			delete members[currNick];
			delete membersColors[currNick];
			jQuery(this).parent().children(".userTagging_output").html("Ištrinta");
		}
		else {
			if(!isHex && hex.length!=0) {
				jQuery(this).parent().children(".userTagging_output").html("Netvarkingas HEX");
				jQuery(this).css("background-color","red");
			} else {
				if(text === "") {
					delete members[currNick];
					delete membersColors[currNick];
				} else {

					
					if(typeof(members[currNick])==='undefined') exists = 0;
					members[currNick] = text;
					if(hex.length==0) hex = "#DAE6F0";
					membersColors[currNick] = hex;
					jQuery(this).parent().children(".userTagging_output").html("Atnaujinta");
					jQuery(this).css("background-color","green");
				}

			}
		}
		GM_setValue("userTagging_members", JSON.stringify(members));
		GM_setValue("userTagging_membersColors", JSON.stringify(membersColors));
		findAndUpdateSingle(currNick, text, hex, exists);

	});
});