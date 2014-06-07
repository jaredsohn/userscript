// ==UserScript==
// @name           RV mission completed
// @namespace      http://userscripts.org/users/65879
// @description    Roguevampires, show missions link after My covenant link and highlight it if you not joined
// @include        http://www.roguevampires.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var $rvs_show_mission = GM_getValue('rvs_show_mission', 1);
var $rvs_last_mission = GM_getValue('rvs_last_mission', 0);
var $rvs_highlight_mission = GM_getValue('rvs_highlight_mission', 0);

function RVMission () {
	
	this.init = function () {
		if ($rvs_show_mission) { // if enabled
			// getting all anchors
			var $doc_anchors = document.getElementsByTagName("a");
			
			// finding needed anchors
			var cove_anchor_id = -1;
			var profile_id = 0;
			for (ii = 0; ii <$doc_anchors.length; ii++) {
				if (($doc_anchors[ii].href.indexOf('userprofile.php') != -1) && profile_id == 0){
				  profile_id_arr = $doc_anchors[ii].href.split('=');
				  profile_id = profile_id_arr[1];
				}
				if ($doc_anchors[ii].href.indexOf('mycovenant.php') != -1) {
					cove_anchor_id = ii;
					$doc_anchors[ii].setAttribute('id', 'cove_link');
				}
			}
			
			// if user in cove 
			if (cove_anchor_id != -1) {
				d_location = document.location.toString();
				
				var current_date = new Date();
				var date_str = this.format_date(current_date);
				highlight = 0;
				if ($rvs_last_mission != 0 && $rvs_last_mission == date_str && !d_location.match("missions.php")) {
					this.setMission();
				} else {
					this.missionRequest(profile_id, date_str);
				}
			}
		}
	}
	
	this.setMission = function () {
		cove_anchor = document.getElementById('cove_link');
		highlight = GM_getValue('rvs_highlight_mission', 0);
		parent = cove_anchor.parentNode;
		el_span = document.createElement('span');
		el_span.innerHTML = ' | ';
		parent.appendChild(el_span);
		el_mission_anchor = document.createElement('a');
		el_mission_anchor.setAttribute('href', 'missions.php');
		if (highlight) {
			el_mission_anchor.innerHTML = '<span style="color:#DD5500;">Miss</span>';
		} else {
			el_mission_anchor.innerHTML = 'Miss';
		}
		parent.appendChild(el_mission_anchor);
	}
	
	this.missionRequest = function (profile_id, date_str) {
		http = new XMLHttpRequest();
		http.abort();
		http.open("GET", 'missions.php', true);
		http.onreadystatechange = function() {
			if(http.readyState == 4) {
				// if not login page
				if (profile_id > 0) {
				// if mission started
					if(http.responseText.indexOf('Number Joined') != -1) {
						profile_identifier = '[' + profile_id + ']';
						// if not in a mission
						if(http.responseText.indexOf(profile_identifier) == -1) {
							GM_setValue('rvs_highlight_mission', 1);
							GM_setValue('rvs_last_mission', date_str);
						} else {
							GM_setValue('rvs_highlight_mission', 0);
							GM_setValue('rvs_last_mission', date_str);
						}
					} else {
						GM_setValue('rvs_highlight_mission', 0);
						GM_setValue('rvs_last_mission', date_str);
					}
				}
				mission.setMission();
			}
		}
		http.send(null);
	}
	
	this.format_date = function (date_val) {
		new_date = date_val.getFullYear() + '-' + (date_val.getMonth() + 1) + '-' + date_val.getDate() + ' ' + (date_val.getHours());
		return new_date;
	}
}

mission = new RVMission ();
mission.init();