// ==UserScript==
// @name        Galaxy Legion UI Improvements
// @namespace   GLUI
// @include     https://galaxylegionfb.com/galaxylegion/
// @include     https://galaxylegionfb.com/galaxylegion/*
// @version     0.4.9.5
// @downloadURL	http://userscripts.org/scripts/source/172817.user.js
// @updateURL	http://userscripts.org/scripts/source/172817.meta.js
// ==/UserScript==

/**
 * Please note, this script is not meant for use by those outside of our legion(s).
 * If you wish to use this script, edit the variables underneath the region denoted "Important shit"
 */
var GL_PLAYER = "";
var GL_LEGION_ANNOUNCEMENT = "";
var GLUI_VERSION = "0.4.9.5";

window.addEventListener("load", function()
{
	//$ = window.jQuery.noConflict(true);
	GL_main();
});

// Magic happens here
function GL_main()
{
	// Get the player's name
	var n = addMessages.toString();
	var b = n.indexOf("if (msender == '");
	var s = n.indexOf("'", b) +1;
	var e = n.indexOf("'", s);
	GL_PLAYER = n.substring(s, e);

	
	// Enable the context menu
	$(document).unbind('contextmenu');
	
	// Add a link to the official wiki
	$("#linkbar").append(" | <a href='http://galaxylegion.com/wiki/index.php/Main_Page' target='_blank'>Wiki</a>");
	
	// Embed everything else
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.innerHTML = "";

	var funcs = [
					{
						fun: GL_addMessages,
						call: false
					},
					{
						fun: GL_linkify,
						call: false
					},
					{
						fun: GL_tabResearch,
						call: true
					},
					{
						fun: GL_tabTrade,
						call: true
					},
					{
						fun: GL_tabPlanets,
						call: true
					},
					{
						fun: GL_loadLegion,
						call: true
					},
					{
						fun: GL_loadArtifacts,
						call: true
					},
					{
						fun: GL_wikify,
						call: true
					},
					{
						fun: GL_showChangelog,
						call: true
					},
					{
						fun: GL_showLegionAnnouncement,
						call: true
					}
				];
	var vars = [
				"var GL_PLAYER = '" + GL_PLAYER + "'",
				"var GL_LEGION_ANNOUNCEMENT = '';",
				"messlastid = 0",
				"addMessages = GL_addMessages",
				"var GLUI_VERSION = '" + GLUI_VERSION + "'",
				];
	
	var src = ""
	for(i = 0; i < funcs.length; i++)
	{
		var funText = funcs[i].fun.toString();
		var funHead = funText.split("\n")[0].split(" ")[1].split("(")[0];
		
		if(funcs[i].call)
			vars.push(funHead + "()");
		src += funText + "\n";
	}
	
	for(i = 0; i < vars.length; i++)
	{
		src += vars[i] + ";\n";
	}
	
	script.innerHTML = src;
	document.body.appendChild(script);
	
	// Embed emoticon css
	var emote_css = '.emoticon {     display: inline-block;     height: 16px;     vertical-align: top;     width: 16px; visibility: visible;} .emoticon_text {     display: none; } .emoticons_off .emoticon {     display: none; } .emoticons_off .emoticon_text {     display: inline; } .emoticon_smile {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -730px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_frown {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -611px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_tongue {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -747px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_grin {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -645px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_gasp {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -628px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_wink {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -781px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_glasses {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -628px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_sunglasses {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -747px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_grumpy {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -645px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_unsure {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -764px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_cry {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -594px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_devil {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -611px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_angel {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -1053px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_kiss {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -679px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_heart {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -662px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_kiki {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -662px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_squint {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -730px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_confused {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -577px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_confused_rev {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -594px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_upset {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -764px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_pacman {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -679px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_robot {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -2107px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_colonthree {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -934px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_penguin {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -815px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_putnam {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -713px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_shark {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -713px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_like {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: 0 -88px;     background-repeat: no-repeat;     background-size: auto auto; } .emoticon_poop {     background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yK/r/r-s1sSegbX6.png");     background-position: -17px -696px;     background-repeat: no-repeat;     background-size: auto auto; }';
	
	var css_ele = document.createElement("style");
	css_ele.type = "text/css";
	css_ele.innerHTML = emote_css;
	
	$("#mwrapper").prepend($(css_ele));
}

function GL_showChangelog()
{
	// Create the (slightly) formatted list
	var list = [];
	list.push("Reduced the delay of the duplicate Sell All button");
	list.push("Reduced the delay of the research tab push.");
	list.push("The legion announcement should now be more visible upon page load.");
	list.push("Artifact highlight reads from gdoc for categories");
	var log = "<div class='darkbox'><h3 style='text-align: center;'> GLUI Changelog - v" + GLUI_VERSION + "</h3>\n<hr /><ul style='margin-left:10px;list-style-type: arrow; font-weight: 600;'>";
	
	for(i = 0; i < list.length; i++)
		log += "\n\t<li>" + list[i] + "</li>";
	log += "</ul><hr />";
	
	// Check for an update
	//var metaURL = "https://userscripts.org/scripts/source/172817.meta.js";
	/*$.ajax(metaURL, {
	method: "GET",
	crossdomain: true,
	success: function(data, status, xhr)
	{
		var vIndex = data.indexOf("@version") + 13;
		var line = data.indexOf("\n", vIndex);
		var version = data.substring(vIndex, line);
		
		if(version != GLUI_VERSION || data == "")
		{*/
			log += "\n<br /><span style='font-color: #ff000000;'>GLUI failed to check for an updated version. Click <a href='http://userscripts.org/scripts/show/172817' target='_blank'>here</a> to check manually.</span>";
		/*}
	}
	});*/
	log += "</div>";
	// Rawr! We have information to shove in your face!
	$.jGrowl(log, {sticky: true});
}
/**
 * Since some people have trouble finding it initially, 
 * and reading it even afterwards (at one point, me included..)
 */
function GL_showLegionAnnouncement()
{
	var annLocation = $("#legionnews tbody tr td.infobox2");
	annLocation.html(GL_linkify(annLocation.html()));
	
	window.GL_LEGION_ANNOUNCEMENT = "<div class='darkbox'><h3 style='text-align: center;'>Legion Announcement</h3><hr />" +annLocation.html() + "</div>";
	
	$("#menu_Legion").bind("click", function()
	{
		
	});
	
	$.jGrowl(window.GL_LEGION_ANNOUNCEMENT, {life: 10000});
}

/**
 * This will intercept comm messages, allowing for things like formatting and clickable links in chat.
 * Also, fucking crowns.
 * While initially a rip from Dan's code, this will be altered to be... well, readable.
 */
function GL_addMessages(xml)
{
	mstatus = $('status',xml).text();
	if (mstatus == '2') return; // no new messages
	else if (mstatus == '1') timestamp = $('time',xml).text();
	var currentts = Math.round((new Date()).getTime() / 1000);
	
	$('message',xml).each(function(id)
	{
		message = $('message',xml).get(id);
		msender = $('author',message).text();
		messtime = parseInt($('sendtime',message).text()) * 1000;
		messperm = parseInt($('perm',message).text());
		currid = parseInt($('id',message).text());
		instatus = parseInt($('instatus',message).text());
		
		if (messtime > 0)
		{
			md = new Date(messtime);
			messhours = ( md.getHours() < 10 ? '0' : '' ) + md.getHours();
			messminutes = ( md.getMinutes() < 10 ? '0' : '' ) + md.getMinutes();
			messtimestamp = '[' + messhours + ':' + messminutes + ']';
		}
		else 
		{
			messtimestamp = '';
		}
		
		if(currid > 0)
		{
			messlastid = currid;
		}
		
		if (mstatus == '0') 
			msgcolor = '#ff0000';
		else if (msender) 
			msgcolor = '#ffffff';
		else 
			msgcolor = '#999999';
		
		if (messperm < 3)
		{
			msgcolor = '#ffff00';
			messheader = ' > Officers';
		}
		else 
			messheader = '';
		
		if (msender == GL_PLAYER) 
			fromcolor = '#99ff99';
		else 
			fromcolor = '#9999ff';
		
		if (instatus == 3)
		{
			msgcolor = '#ff0000';
			if ((currentts - (messtime / 1000)) < 300) 
			{
				//window.GL_LEGION_ANNOUNCEMENT = "<div class='darkbox message'><span style='font-size: 14pt; font-weight: 700; font-style: italic;'>Legion Announcement</span><hr />" + $('text',message).text() + "</div>";
				$.jGrowl($('text',message).text(), {life: 10000});
			}
		}
		
		var mtext = $('text',message).text();
		mtext = GL_linkify(mtext);
		
		// Replace emoticons with images
		var dictionary = [
							{
								emote_class: "smile",
								faces: [":)", ":-)", "=)", "(:", "(-:", "(="]
							},
							{
								emote_class: "grin",
								faces: [":D", ":-D", "=D", "=-D"]
							},
							{
								emote_class: "frown",
								faces: [":(", ":-(", "=(", "=(", "):", ")-:", ")=", ")="]
							},
							{
								emote_class: "tongue",
								faces: [":p", ":P", "=p", "=P"]
							},
							{
								emote_class: "pacman",
								faces: [":v", ":V", "v:", "V:"]
							},
							{
								emote_class: "gasp",
								faces: [":o", ":-o", "=o", "=-o", "o:", "o-:", "o=", "o-=",":O", ":-O", "=O", "=-O", "O:", "O-:", "O=", "O-="]
							},
							{
								emote_class: "colonthree",
								faces: [":3", ":-3", "=3"]
							},
							{
								emote_class: "unsure",
								faces: [":/", ":-/", "=/", "/:", "/-:", "/="]
							},
							{
								emote_class: "custom", 
								faces: [":c"],
								url: "298718186924069"
							}
						 ];
		// Replace "http://" with a placeholder so that emoticons don't break it..
		mtext = mtext.replace(new RegExp("(https?):\/\/", "g"), "{{HTTP}}");
			
		for(i = 0; i < dictionary.length; i++)
		{
			var word = dictionary[i];
			
			var img_emote = "https://graph.facebook.com/{{UID}}/picture";
			var emote_html = null;
			if(word.emote_class == "custom")
			{
				emote_html = "<img width='16' height='16' src='" + img_emote.replace("{{UID}}", word.url) + "' />";
			}
			else
			{
				emote_html = "<span class='emoticon emoticon_" + word.emote_class + "'></span>";
			}
			
			for(j = 0; j < word.faces.length; j++)
			{
				mtext = mtext.replace(word.faces[j], emote_html);
			}
		}
		
		mtext = mtext.replace(new RegExp("\{\{HTTP\}\}", "g"), "http://");
		
		// Add symbols of leadership.
		if (msender) 
		{
			var img_leader = "<img alt='Leader' width='16' height='16' src='https://galaxylegion-erismedia.netdna-ssl.com/galaxylegion/images/icons/legion-1.png' />";
			var img_officer = "<img alt='Officer' width='16' height='16' src='https://galaxylegion-erismedia.netdna-ssl.com/galaxylegion/images/icons/legion-2.png' />";
			var img_member = "";
			var img = "";
			var memlist = window.GL_LEGION_MEMBERS;
			for(i = 0; i < memlist.length; i++)
			{
				if(memlist[i].ShipName == msender)
				{
					switch(memlist[i].Position)
					{
					case "Leader":
						img = img_leader;
					break;
					case "Officer":
						img = img_officer;
					break;
					default:
					}
				}
			}
			mapi.getContentPane().prepend('<div>' 
											+ messtimestamp 
											+ img + ' <span style="color: ' 
											+ fromcolor 
											+ '; font: 10pt Arial; font-weight: 700;">'
											+ msender + messheader 
											+ ':</span> <span style="color: ' 
											+ msgcolor + '; font: 11pt; font-weight: 100; line-height:15px">' 
											+ mtext
											+ '</span></div>');
		}							
		else mapi.getContentPane().prepend('<div>' 
											+ messtimestamp 
											+ ' <span style="color: ' 
											+ msgcolor + '; font: 11pt; font-weight: 100; line-height:15px">' 
											+ mtext
											+ '</span></div>');
											
		if (cmessagecount > 100) 
			mapi.getContentPane().find('div:last').remove();
			
		cmessagecount = cmessagecount + 1;
	});
	
	if ((mstatus == 1) && (commtoggled == 0))
	{
		$('#commalert').show();
	}
	
	if (mstatus == 0)
	{
		commenabled = 0;
	}
	
	$('#messagewindow').jScrollPane({showArrows:true});
}

/**
 * Turns a plaintext link into a hyperlink
 */
function GL_linkify(text)
{
	//var exp = /(?<!\")(https://[^\\s]+)(?!\")/ig;
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a class='GLUI_link' target='_blank' href='$1'>$1</a>");
}

/**
 * Wiki Links everywhere!
 */
function GL_wikify()
{
	$('#menu_Missions').bind('click', function()
	{
		setTimeout(function()
		{
			var missions = $('#missions tbody tr td:has(br):not(:has(a.GLUI_link))');
			var legion_mission = ($("#lmissionhead").length > 0);
			var daily_mission = ($("#fmissionhead").length > 0);
			
			if(daily_mission)
				missions.push($('#fmissionhead tbody tr td:has(br):first:not(:has(a.GLUI_link))'));
				
			if(legion_mission)
				missions.push($('#lmissionhead tbody tr td div.darkbox b:not(:has(a.GLUI_link))'));
				
			$.each(missions, function(index, val)
			{
				var missionName = $(this).html().split("<br>");
				
				if(typeof(missionName[1]) === "undefined") 
					missionName[1] = "";
				
				var url = "http://galaxylegion.com/wiki/index.php/" + missionName[0].split(" ").join("_");

				$(this).html('<a class="GLUI_link" href="' + url + '" target="_blank">' + missionName[0] + '</a><br />' + missionName[1]);
			});
			
			var mats = $("span[class^='material']");
			$.each(mats, function(index, val)
			{
				var mat = $(this)[0].tooltipText;
				var $mat = $(mat);
				var matName = "";
				matName = mat.split("<br")[0].trim();

				
				var url = "http://galaxylegion.com/wiki/index.php/" + matName.split(" ").join("_");

				$(this).wrap('<a class="GLUI_link" href="' + url + '" target="_blank" />');
			});
			
			// TODO: account for page refreshes, add event listeners to mission buttons and the lightbox
			// #TB_overlay, #TB_window .dialog-close
			$("td:has(button.blue), td:has(button.red)").bind('click', function()
			{
				setTimeout(function()
				{
					$("#TB_overlay, #TB_window .dialog-close").bind('click', function()
					{
						setTimeout(function()
						{
							$('#menu_Missions').click();
						}, 1000);
					});
				}, 1000);
			});
		}, 1000);
	});
	
	
}

/**
 * Loads a CSV file containing member information for our legion(s).
 */
function GL_loadLegion()
{
	// Important shit
	var GL_LEGION_LIST = "https://docs.google.com/spreadsheet/pub?key=0AlJIykX_XWZudFhjMTdVYWpKYXlCWkkwN2l1RGNNZFE&single=true&gid=1&output=csv";
	var GL_MEMBER_NAME = 0;
	var GL_MEMBER_SHIP = 1;
	var GL_LEADER_POS = 2;
	var GL_LEGION_LANCE = 3;
	// End important shit
	
	window.GL_LEGION_MEMBERS = [];
	window.GL_LEGION_LOADED = false;
	
	$.get(GL_LEGION_LIST, function(data)
	{	
		var rows = data.split("\n");
		
		for(i = 1; i < rows.length; i++)
		{
			var info = rows[i].split(",");
			
			var member = {};
			
			member.Name = info[GL_MEMBER_NAME];
			member.ShipName = info[GL_MEMBER_SHIP];
			
			switch(info[GL_LEADER_POS])
			{
				case "Leader":
					member.Position = "Leader";
				break;
				case "Officer":
					member.Position = "Officer";
				break;
				default:
					member.Position = "Member";
			}
			
			member.Lance = info[GL_LEGION_LANCE];
			window.GL_LEGION_MEMBERS.push(member);
		}
		window.GL_LEGION_LOADED = true;
		updateMsg();
	});
}

function GL_loadArtifacts()
{
	var GL_ARTIFACT_LIST = "https://docs.google.com/spreadsheet/pub?key=0AlJIykX_XWZudHotOWhxZEJhbnM2aUhuZC05eDlHZHc&single=true&gid=0&output=csv";
	var GL_ARTIFACT_NAME = 0;
	var GL_ARTIFACT_CATEGORY = 1;
	
	window.GL_ARTIFACT_LIST = [];
	window.GL_ARTIFACT_LOADED = false;
	$.get(GL_ARTIFACT_LIST, function(data)
	{	
		var rows = data.split("\n");
		
		for(i = 1; i < rows.length; i++)
		{
			var info = rows[i].split(",");
			
			var artifact = {};
			
			artifact.Name = info[GL_ARTIFACT_NAME];
			artifact.Category = info[GL_ARTIFACT_CATEGORY];

			window.GL_ARTIFACT_LIST.push(artifact);
		}
		window.GL_ARTIFACT_LOADED = true;
	});
}

/**
 *
 */
function GL_tabNews()
{
}

function GL_tabShip()
{
	//The PVP damage cap formula is the LARGER of the following two possible formulas: Decks / 2 , (Rank + 19) / 2
	var decks = parseInt($("#shipsummary table tbody:first tr:nth-child(2) td:last").text().split(" / ")[1]);
	var rank = parseInt($("#level-title").text().split(" ")[1]);
	
	var dmgCap = ((decks/2)>((rank+19)/2))?(decks/2):((rank+19)/2);
}

/**
 * When the research tab is loaded, automatically focus on the highest available research tier.
 */
function GL_tabResearch()
{
	$("#menu_Research").bind('click', function()
	{
		var researchPush = function()
		{
			if($(".nextPage").length > 0)
			{
				for(i = 0; i < 5; i++)
					$(".nextPage").click();
			}
		};
		
		clearInterval(window.GL_TAB_RESEARCH_PUSH);
		window.GL_TAB_RESEARCH_PUSH = setInterval(function()
		{
			researchPush();
		}, 100);
	});	
}

/**
 * When the Trade tab is loaded, destroy the pagination
 * ...
 * Outdated libraries make this a problem for now.
 */
function GL_tabTrade()
{
	$("#menu_Trade").bind('click', function() 
	{
		/*oArtifacts = $('#artifacts').dataTable( {
			"bStateSave": true,
			"aoColumns": [ 
				{ "bSortable": false,
				"sWidth": "40px" },
				null,
				null
				],
			"bLengthChange": false,
			"fnDrawCallback": function() {

			$('[title]').tooltip({
			delay: 200, 
			showURL: false, 
			fade: 150
		});
			
			},
			"oLanguage": {
			"sSearch": "Filter Artifacts by Name:",
			"sLengthMenu": "Display _MENU_ artifacts per page",
			"sZeroRecords": "Nothing found - sorry",
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ artifacts",
			"sInfoEmtpy": "Showing 0 to 0 of 0 artifacts",
			"sInfoFiltered": "(filtered from _MAX_ total artifacts)"
		} } );
		oArtifacts.fnDestroy();*/
		
		// Duplicate the Sell All minerals button, and move the copy to th etop of the page.
		var cloneButton = function()
		{
			if($("#tradearea").length > 0 && $("#tradearea table.display tbody tr:first td:last #tradesellallms").length <= 0)
				$("#tradesellallm").clone().attr("id", "tradesellallms").appendTo("#tradearea table.display tbody tr:first td:last");
		};
		
		clearInterval(window.GL_TAB_TRADE_CLONE);
		window.GL_TAB_TRADE_CLONE = setInterval(function() 
		{
			cloneButton();
		}, 100);
		
		
		//Check for and highlight certain artifacts during an artifact pull
		var hiliteArtifacts = function()
		{
			if(($("div.success_msg_lg").length > 0) && ($(".GLUI_hilite").length == 0))
			{
				
				/*var toHilite = ["Ship-Bot", 
								"Rescued Prisoners", 
								"Android Helmsman", 
								"Android Scientist", 
								"Durtanium Brackets", 
								"XCharge Cells", 
								"Mass Storage Pod", 
								"Tesseract Container"
								];*/
				var toHilite = window.GL_ARTIFACT_LIST;
				var msg = $("div.success_msg_lg");
				
				for(i = 0; i < toHilite.length; i++)
				{
					var regex = new RegExp(toHilite[i].Name, "g");
					var color = "#CCCCCC";
					var weight = 400;
					switch(toHilite[i].Category)
					{
						case "Junk":
							color = "#FF00FF";
							weight = 100;
						break;
						case "Ship Growth":
							color = "#33FFFF";
							weight = 600;
						break;
						case "Desirable":
							color = "#66FFFF";
							weight = 800;
						break;
					}
					msg.html(msg.html().replace(regex, "<span class='GLUI_hilite' style='font-weight: " + weight + "; color: " + color + "'>" + toHilite[i].Name + "</span>"));
					
				}
				var temp = msg.html().split("<br>");
				//temp = temp.slice(1, temp.length - 1);
				msg.html(temp.join(", "));
			}
			
		}
		
		clearInterval(window.GL_TAB_TRADE_HILITE);
		window.GL_TAB_TRADE_HILITE = setInterval(function() 
		{
			hiliteArtifacts();
		}, 100);
	});	
}

function GL_tabPlanets()
{
	$("#menu_Planets").bind('click', function()
	{
		setTimeout(function()
		{
			//oPlanets.fnDestroy();
		}, 1000);
	});
}