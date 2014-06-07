// ==UserScript==
// @name           Facebook Timeline Cleaner
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @grant       none
// ==/UserScript==

/*
 * For jQuery Conflicts.
 */
this.$ = this.jQuery = jQuery.noConflict(true);

/*
 * No warranty. Use with your own risk. V0.6
 */

/*
 * Some Global Variables for User Edit
 */

var expandCount = 3;
var deleteCount = 3;
var limit = false;
/*
 * This is the Debug Level for the firebug console output. It goes up to 5
 */
var debug = 5;
/*
 * If this Option is true, nothing will be really deleted. But you can test
 * something without losing your timeline....
 */
var just_test = false;

/*
 * Internal Variables. Do not edit!
 */
var deletedMap = {};
var visi = {};
var triggeredMap = {};
var post_form_id = null;
var fb_dtsg = null;
var delete_time_bevor = null;
var iamstillontimeline = false;
var start = false;
var lastselected = null;
var insert_button = false;
var deleted = 0;
var hided = 0;
var only_hide = false;
var clicked_buttons = {};

/*
 * * * * *
 */

function parseUri(str) {
	var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"]
			.exec(str), uri = {}, i = 14;

	while (i--)
		uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
		if ($1)
			uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode : false,
	key : [ "source", "protocol", "authority", "userInfo", "user", "password",
			"host", "port", "relative", "path", "directory", "file", "query",
			"anchor" ],
	q : {
		name : "queryKey",
		parser : /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser : {
		strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

/*
 * This function scroll down on the Website and load new entrys.
 */
var expandMoreActivity = function() {
	var links = $('a[onclick]'); //
	for ( var i = 0; i < links.length; ++i) {
		// Umg this works only in german or english :
		if ((links[i].innerHTML === "More Activity")
				|| (links[i].innerHTML === "Weitere AktivitÃ¤ten")) {
			if (limit) {
				expandCount -= 1;
			}
			links[i].click();
		}
	}
	if (!limit || (limit && expandCount >= 0)) {
		if (iamstillontimeline == true) {
			setTimeout(expandMoreActivity, 10000);
			 scrollTo(0, 1000000000); //Scroll Down!
			/*
			 * Wir klicken jeden Button, damit die Daten generiert werden.
			 */
			$(
					'a[class="uiPopoverButton _2fmm _p uiButton uiButtonSuppressed uiButtonNoText"] ')
					.each(function() {
						if (clicked_buttons[$(this).attr("id")] == 1) {
							// get the id of the button.
							// logging("Id wurde schon geklickt",3);
						} else {

							clicked_buttons[$(this).attr("id")] = 1;
							$("i", this).click();
						}
					});
		}
	}
	logging('Expand', 2);
}


var getConstantParameters = function() {
	if (post_form_id != null && fb_dtsg !== null) {
		return true;
	} else {
		if (post_form_id === null) {
			$('input[name="post_form_id"]').each(function() {
				post_form_id = $(this).attr("value");
			});
		}
		if (fb_dtsg === null) {
			$('input[name="fb_dtsg"]').each(function() {
				fb_dtsg = $(this).attr("value");
			});
		}
		return (fb_dtsg !== null);
	}
}
 function change_status(x,y){
if($('#fd_set',x) === undefined)
{
$(x).parents('tr').prepend(' <p id="fd_set"> '+y+'<p> ');
}
  }
 
 
var createDeleteRequests = function() {
	if (getConstantParameters()) {
		logging('Begine.', 2);
		check_for_timeline(); // Mh does im on the right site?
		// Sometimes Facebook change here some shit...
		// uiList uiStream timelineAllActivityStream fbProfileStream
		// translateParent _4kg
		if ($(
				'ul[class="uiList uiStream timelineAllActivityStream fbProfileStream translateParent _4kg"]')
				.size() == 0) {
			if (iamstillontimeline == true) {
				alert("ERROR: Maybe Facebook changed his design... \n please take a look for a newer version of this Script...");
			}
		}

		$('#js_0')
				.each(
						function() {
							var year = $(this).attr("id").split(
									"all_activity_stream_")[1];
							$(this)
									.find('a[ajaxify]')
									.each(
											function() {
												var remove = true;
												var ajaxify = parseUri("https://facebook.com"
														+ $(this).attr(
																"ajaxify"));
												var keys = [ 'profile_id',
														'story_fbid',
														'story_fbid',
														'story_row_time',
														'story_dom_id',
														'action' ];
												for ( var i = 0; i < keys.length; ++i) {
													if (ajaxify.queryKey[keys[i]] === undefined) {
														remove = false;
														// console.log("Nicht
														// genug
														// Parameter!"+keys[i]);
														return;
													}
												}

												// logging("Ajax
												// Datei:"+ajaxify.file,2);

												/*
												 * Hier wird Ã¼berprÃ¼ft, ob die
												 * Post ggf. ein bestimmtes
												 * alter haben sollen. Definiert
												 * Ã¼ber delete_time_bevor in
												 * sec vor now
												 */
												now = Math.round((new Date())
														.getTime() / 1000);
												// Testen ob die ID schon
												// bearbeitet wurde

												if (deletedMap[ajaxify.queryKey['story_fbid']] !== undefined) {
												//$(this).parents('tr').prepend("schon geloescht!");
													//return;
												}

												// zugelassende aktionen

												if (ajaxify.queryKey['action'] !== "hide"
														&& ajaxify.queryKey['action'] !== "remove_comment"
														&& ajaxify.queryKey['action'] !== "unlike"
														&& ajaxify.queryKey['action'] !== "remove_content" 
															&& ajaxify.queryKey['action'] !== "unvote" 
														) {
														//$(this).parents('tr').prepend("Falsche Action");
														//change_status(this,'Falsche Action');
														
													return;
												
												}

												if (delete_time_bevor !== false) {
													if ((now - ajaxify.queryKey['story_row_time']) < delete_time_bevor) {
												
													if(deletedMap[ajaxify.queryKey['story_fbid']] != "Zu Jung!")
													{
														$(this).parents('tr').prepend("Zu Jung!");
															deletedMap[ajaxify.queryKey['story_fbid']] = "Zu Jung!";
															console.log("This Entry is too young! NEXT! ID:",ajaxify.queryKey['story_fbid']);
															console.log("SollZeit: >",delete_time_bevor," Ist Zeit:",now - ajaxify.queryKey['story_row_time']);
																									
															$(this).parents('tr').prepend('<img src="http://upload.wikimedia.org/wikipedia/commons/3/34/Crystal_Clear_app_clean.png" alt="Deleted" height="42" width="42">');
															}
															return;
													}

												}

												if (ajaxify.file === "show_story_options.php") {
													if (triggeredMap[ajaxify.queryKey['story_fbid']] === undefined) {
														var evt = document
																.createEvent("MouseEvents");
														evt.initMouseEvent(
																"mouseover",
																true, true,
																window, 0, 0,
																0, 0, 0, false,
																false, false,
																false, 0, null);
														$(this).context
																.dispatchEvent(evt);
														triggeredMap[ajaxify.queryKey['story_fbid']] = true;
													}
												} else if ((ajaxify.file === "take_action_on_story.php")
														&& (only_hide === false)) {

														deletedMap[ajaxify.queryKey['story_fbid']] = false;
														logging(
																"======"
																		+ ajaxify.queryKey['action'],
																1);
									

															logging("Loesche die ID:"+ ajaxify.queryKey['story_fbid'],1);
															
															$(this).parents('tr').prepend('<img src="http://upload.wikimedia.org/wikipedia/commons/2/2e/Crystal_Clear_action_button_cancel.png" alt="Deleted" height="42" width="42">');
															$(this).parents('tr').remove();
															deleted = deleted + 1; // Count
																					// Up
																					// for
																					// stats...
															var data = {

																'fb_dtsg' : fb_dtsg,
																'confirmed' : "true",
																'ban_user' : "0"
															};
															for ( var key in ajaxify.queryKey) {
																data[key] = ajaxify.queryKey[key];
															}
															if (just_test == false) {
																$
																		.ajax({
																			type : "POST",
																			url : "https://www.facebook.com/ajax/timeline/take_action_on_story.php?__a=1",
																			data : data,
																			success : function() {
																				$(
																						this)
																						.remove();
																			}
																		});
															}
													
													
												} else if (ajaxify.file === "story_visibility.php") {

													if (remove
															&& visi[ajaxify.queryKey['story_fbid']] === undefined) {
														visi[ajaxify.queryKey['story_fbid']] = false;
														console
																.log(
																		"Change Visibility to hide for ID:",
																		ajaxify.queryKey['story_fbid']);
														logging(
																"======"
																		+ ajaxify.queryKey['action'],
																1);
														hided = hided + 1;

														$(this)
																.parents('tr')
																.prepend(
																		'<img src="http://upload.wikimedia.org/wikipedia/commons/e/e0/Crystal_Clear_action_encrypted.png" alt="Smiley face" height="42" width="42">');

														var data = {
															'nctr[_mod]' : "pagelet_all_activity_"
																	+ year,
															'action' : "hide",
															'post_form_id' : post_form_id,
															'fb_dtsg' : fb_dtsg,
															'lsd' : "",
															'post_form_id_source' : "AsyncRequest",
															'confirmed' : "1",
															'ban_user' : "0"
														};
														for ( var key in ajaxify.queryKey) {
															if (key != 'action') {
																data[key] = ajaxify.queryKey[key];
															}
														}

														if (just_test == false) {
															$
																	.ajax({
																		type : "POST",
																		url : "https://www.facebook.com/ajax/timeline/story_visibility.php?__a=1",
																		data : data,
																		success : function() {
																			$(this).remove();
																		}
																	});

														}
													}
												}

											});

						});
	}
	if (iamstillontimeline == true) {
		setTimeout(createDeleteRequests, 10000);

	}
}

/*
 * This function check your URL. If your url cotain "$suchstring", the script
 * will load.
 */
function check_for_timeline() {
	var suchstring = /(allactivity)/g; // REGEX for the URL
	var suchergebnis = suchstring.test($(location).attr('href'));
	if (suchergebnis != false) {
		iamstillontimeline = true; // You are on the right Site!
	} else {
		if ((iamstillontimeline == true) && (start == true)) {
			// Ugh it seems the user change the side...
			alert('Abort!');
			start = false;
		}
		iamstillontimeline = false;
		insert_button = false;
	}
}
/*
 * A Logging Function with global debug level.
 */
function logging(text, level) {
	if (debug >= level) {
		console.log(text);
	}
}

/*
 * This Funktion Update the Statuscounter
 */

function update_status() {
	logging('Update Statusbar', 3);
	document.getElementById("delete").innerHTML = 'Deleted:' + deleted;
	document.getElementById("Hided").innerHTML = 'Hide:' + hided;
}

/*
 * Insert the GUI Button
 */
function add_button() {
	insert_button = true;
	$("#u_0_p")
			.prepend(
					'<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal uiSelectorDynamicLabel"><div class="wrap "><button class="hideToggler"></button><a rel="toggle" data-length="30" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText">Privacy Extension</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li class="uiMenuItem uiMenuItemRadio uiSelectorOption " data-key="year_2012" data-label="Hide everything on Timeline" ><a href="#" rel="ignore" class="itemAnchor"   tabindex="0" aria-checked="true"><span class="itemLabel fsm">Hide everything on Timeline older than 90 days</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption" data-key="year_2011" data-label="Delete everything"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"  aria-checked="false"><span class="itemLabel fsm">Delete everything</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption " data-key="Hide everything on Timeline" data-label="Hide everything on Timeline"><a href="#" rel="ignore"  class="itemAnchor" tabindex="0" aria-checked="false"><span class="itemLabel fsm">Hide everything on Timeline</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption" data-key="year_2009" data-label="Delete everything older than 90 Days"><a href="#"  rel="ignore" class="itemAnchor" tabindex="0" aria-checked="false"><span class="itemLabel fsm">Delete everything older than 90 Days</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="year_2012">Hide everything on Timeline older than 90 days</option><option value="year_2011">Delete everything</option><option value="year_201x">Hide everything on Timeline</option><option value="year_2009">Delete things older than 90 Days</option><option value="year_2010" >Hide everything on Timeline older than 90 Days</option></select></div></span>');
}

/*
 * This is the Main Function. It checks if you are on the activies log or not.
 * :D
 */


 
 
function main() {
	check_for_timeline(); // Get my location.
	// console.log($(location).attr('href')); // Say me where iam
	if (iamstillontimeline == true) {
		if (insert_button == false) {
			console.log('Button rein!');
			add_button();
		}
		if (start == true) {
			update_status();
		}

		if (just_test != false) {
			logging("This is only a test! Nothing will really deleted!", 1);
		}

		// Check thas the Button is really inserted...
		if (document.getElementById("selectvalue")) {
			var selected = document.getElementById("selectvalue").options[document
					.getElementById("selectvalue").selectedIndex].text;
			if (start == false) {
				logging('Waiting for Startsignal', 1);

				if ((lastselected != selected) && (selected != "")) {

					switch (selected) {

					case "Hide everything on Timeline":
						var text = 'WARNING: Are you sure you want hide EVERYTHING on your Timeline? Only you can see the old entrys!';
						only_hide = true;
						delete_time_bevor = false;
						break;

					case "Delete everything":
						var text = 'WARNING: Are you sure to delete EVERYTHING on your Timeline?!';
						only_hide = false;
						delete_time_bevor = false;
						break;

					case "Hide everything on Timeline older than 90 days":
						var text = 'WARNING: Are you sure you want hide all entrys that older than 90 Days?';
						only_hide = true;
						delete_time_bevor = 60 * 60 * 24 * 90;
						break;

					case "Delete things older than 90 Days":
						var text = 'WARNING: Are you sure you want DELETE all entrys that older than 90 Days?';
						only_hide = false;
						delete_time_bevor = 60 * 60 * 24 * 90;
						break;

					}
					lastselected = selected;

					if (confirm(text)) {
					$('#u_0_p')
						//$('span[class="uiButtonGroupItem selectorItem"]')
								.prepend(
										'<div id="delete"> Deleted: 0</div><div id="Hided"> Hide: 0</div>');
						start = true;
						console.log("Start with ", selected);
						createDeleteRequests();
						expandMoreActivity();
						console
								.log("ajaxify:", $('*[ajaxify]')
										.attr("ajaxify"));

					}
				}
			}

		} else {
			//dafuq?! Button was not found... so insert it!!!
			add_button();
		}
	}
	setTimeout(main, 2000); // Start itself in 2 seconds again.
}

setTimeout(main, 4000);