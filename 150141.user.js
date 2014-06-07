// ==UserScript==
// @name        Google Maps Transit Times
// @namespace   BeenJammin.Greasemonkey.UserScripts
// @description Allows the selection of specific, to the minute, departure and arrival times in Google Maps Transit Directions
// @include     https://maps.google.com
// @include     http://maps.google.com
// @include     https://maps.google.com/*
// @include     http://maps.google.com/*
// @grant		none
// @version     1
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	jQuery.noConflict();
	function TransitTimes() {
		var dropDowns = "<br />" + 
						"<select style='margin:5px 5px 5px 0' id='customHour' class='customTimeSelect'>" + 
							"<option value='1'>1</option>" + 
							"<option value='2'>2</option>" + 
							"<option value='3'>3</option>" + 
							"<option value='4'>4</option>" + 
							"<option value='5'>5</option>" + 
							"<option value='6'>6</option>" + 
							"<option value='7'>7</option>" + 
							"<option value='8'>8</option>" + 
							"<option value='9'>9</option>" + 
							"<option value='10'>10</option>" + 
							"<option value='11'>11</option>" + 
							"<option value='12'>12</option>" + 
						"</select>" + 
						"<select style='margin:5px 5px 5px 0' id='customMin' class='customTimeSelect'>" + 
							"<option value='00'>00</option>" + 
							"<option value='01'>01</option>" + 
							"<option value='02'>02</option>" + 
							"<option value='03'>03</option>" + 
							"<option value='04'>04</option>" + 
							"<option value='05'>05</option>" + 
							"<option value='06'>06</option>" + 
							"<option value='07'>07</option>" + 
							"<option value='08'>08</option>" + 
							"<option value='09'>09</option>" + 
							"<option value='10'>10</option>" + 
							"<option value='11'>11</option>" + 
							"<option value='12'>12</option>" + 
							"<option value='13'>13</option>" + 
							"<option value='14'>14</option>" + 
							"<option value='15'>15</option>" + 
							"<option value='16'>16</option>" + 
							"<option value='17'>17</option>" + 
							"<option value='18'>18</option>" + 
							"<option value='19'>19</option>" + 
							"<option value='20'>20</option>" + 
							"<option value='21'>21</option>" + 
							"<option value='22'>22</option>" + 
							"<option value='23'>23</option>" + 
							"<option value='24'>24</option>" + 
							"<option value='25'>25</option>" + 
							"<option value='26'>26</option>" + 
							"<option value='27'>27</option>" + 
							"<option value='28'>28</option>" + 
							"<option value='29'>29</option>" + 
							"<option value='30'>30</option>" + 
							"<option value='31'>31</option>" + 
							"<option value='32'>32</option>" + 
							"<option value='33'>33</option>" + 
							"<option value='34'>34</option>" + 
							"<option value='35'>35</option>" + 
							"<option value='36'>36</option>" + 
							"<option value='37'>37</option>" + 
							"<option value='38'>38</option>" + 
							"<option value='39'>39</option>" + 
							"<option value='40'>40</option>" + 
							"<option value='41'>41</option>" + 
							"<option value='42'>42</option>" + 
							"<option value='43'>43</option>" + 
							"<option value='44'>44</option>" + 
							"<option value='45'>45</option>" + 
							"<option value='46'>46</option>" + 
							"<option value='47'>47</option>" + 
							"<option value='48'>48</option>" + 
							"<option value='49'>49</option>" + 
							"<option value='50'>50</option>" + 
							"<option value='51'>51</option>" + 
							"<option value='52'>52</option>" + 
							"<option value='53'>53</option>" + 
							"<option value='54'>54</option>" + 
							"<option value='55'>55</option>" + 
							"<option value='56'>56</option>" + 
							"<option value='57'>57</option>" + 
							"<option value='58'>58</option>" + 
							"<option value='59'>59</option>" + 
						"</select>" + 
						"<select style='margin:5px 5px 5px 0' id='customAMPM' class='customTimeSelect'>" + 
							"<option value='am'>AM</option>" + 
							"<option value='pm'>PM</option>" + 
						"</select>";
		var currentTime = jQuery("#tr_time").val();
		var currentHour = currentTime.split(":")[0];
		var currentHalf = currentTime.split(":")[1];
		var currentMin = currentHalf.substring(0,2);
		var currentAMPM = currentHalf.substring(2);
		jQuery("#tr_time").parent().before(dropDowns);
		jQuery("#tr_time").parent().hide();
		jQuery("#customHour").val(currentHour);
		jQuery("#customMin").val(currentMin);
		jQuery("#customAMPM").val(currentAMPM);
		jQuery(".customTimeSelect").change(function() {
			var hour = jQuery("#customHour").val();
			var min = jQuery("#customMin").val();
			var AMPM = jQuery("#customAMPM").val();
			jQuery("#tr_time").val(hour + ":" + min + AMPM);
		});
	}
	function CallTransitTimes() {
		if (jQuery("#tr_time").length > 0) {
			TransitTimes();
		}
		else {
			setTimeout(CallTransitTimes,50);
		}
	}
	CallTransitTimes();
}

// load jQuery and execute the main function
addJQuery(main);