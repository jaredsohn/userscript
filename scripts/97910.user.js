// ==UserScript==
// @name           Shacknews Post Expiration Marker
// @namespace      http://userscripts.org/users/nitrium
// @description    Sets expiration times for root posts for easier viewing.
// @include        http://*.shacknews.com/
// @include        http://*.shacknews.com/chatty
// @include        http://*.shacknews.com/chatty?*
// ==/UserScript==
/*
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

Post Expiration Times Marker
by Giliar 'Nitrium' Perez
nitrium (a) nitrium.net
for Shacknews.com

v0.9 - 2/26/2011
- first public test

v1 - 2/26/2011
- expire time left calculations re-done
- refreshing a thread now shows again the expiration time left via unsafeWindow

v1.1 - 2/27/2011
- corrected small bug in 12:00PM times

v1.1 - 2/27/2011
- changed text format to Bamtan's awesome graphics
- the script now waits for the entire page to load before changing the DOM

v1.2 - 3/4/2011
- completely re-wrote the "time left" calculation
- added classes to the divs containing the bar so any other shacker can customize it via custom styles
- misc improvements

TO DO:
- optimize the object appending in the chatty
- make it compatible with indosauro's infinite chatty GM script (http://userscripts.org/scripts/show/98265)
- fixed the bug with reloading a thread

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
*/


(function()
{

	var benchmarkTimer = null;
	var scriptStartTime = getTime();
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	
	var _month_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	var _background_bar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAKCAYAAAD2Fg1xAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMi8xMUfQepoAAAA1SURBVDiNY2RgYJjJMAwACwMDw6+BdgQ1wKhHBhtgYWBg+DnQjqAGGFYxMuqRwQRGPTLYAACnXwmIE1nRXgAAAABJRU5ErkJggg==";
	var _green_bar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAICAYAAAC/K3xHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMi8xMUfQepoAAACXSURBVDiN1c87DoJQEIXhc5OJ+ADxGWVFbs41uBd7SntLMIoK9/K4xMLCcNbgTHXy5W/GXPJTGsgCw/nPm1uDS9Fcic5n3GGQqHCpewcAKLsbMR7voMWl7h1e7YO4nGwYa3BzPB/SAdfTFYOieUKDi+1aAMA2jPnp3ZUM/t2l8g32UUTMrWWswSUcGTj/w6yqGSfzmQr/AlGeQWTDdnHxAAAAAElFTkSuQmCC";
	var _yellow_bar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAICAYAAAC/K3xHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMi8xMUfQepoAAAB2SURBVDiN1c8xDsIwEETRb7MBBUHBmTg34kiggBIC8poiCuMjsK7+Pk3jVIfzlXzi9/ymDuDm40X4UdIRwq3OS9S3MG2BIG4+w/oJgLTTHcGt3Bvsm/EUw628lsh7oY8a/7ubT5AP4Cs+m3EANzpheWi8OcbwL+392wGT4jNxAAAAAElFTkSuQmCC";
	var _orange_bar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAICAYAAAC/K3xHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMi8xMUfQepoAAACXSURBVDiN1ZIxCsJAEEX/6EaMiiCCmBPYWXohT+VJvIDlFl7BShGCEleiLjoWWfKvkJnq8XjNhxE9bT2yAu3FM9mAFz1ufCvrJ4N8DAte9LBuBoSawSQnd9yL7lce1YtyOiQb8KK7gi80GzC4fWDBO1TvhuYZENLCMjLuuHe4R2DRBx5pyPXL2IB3GEUgpIWXH+Nlz4T/A0RVvtGXszpAAAAAAElFTkSuQmCC";
	var _red_bar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAICAYAAAC/K3xHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMi8xMUfQepoAAACVSURBVDiN1dLRCcIwFIXhc2lMa0RUKNbpBLcRd3AI9wjiGBakFIXaxob4oscVvHn6+e55jKTtzqPagK++/lqBm/v5QovPjp1NnQo3bRgAAKHvibYoACVumjCg+xwBwNmcYw0up3LtvzifWA4erwANLsfFygPA0hhiO47sf3fZu5kvs4x4i5GtweVgc36hOiUOKhFo8DfO2+MSqshWzAAAAABJRU5ErkJggg==";

	
	function setExpireDate(_div_array, _check_str)
	{
		for each(var __i in _div_array)
		{
			var __postdate_class = __i.className;
			if ((__postdate_class.indexOf("postdate") != -1) && (__i.parentNode.className.indexOf(_check_str) != -1))
			{
			
				var __shackdate_format = __i.innerHTML; // stores current post date format
			
				// removes the text and adds the shack's formatted date to a div, to work fine with any current/forthcoming CSS re-styling
				var _div_datetext = document.createElement("div");
				_div_datetext.style.whiteSpace = "nowrap";
				_div_datetext.style.cssFloat = "left";
				_div_datetext.className = "postdate-text";
				_div_datetext.innerHTML = __i.innerHTML;
				__i.innerHTML = "";
				__i.appendChild(_div_datetext);
				
				// appends small time expiration bar
				__i.appendChild(processExpireDate(__shackdate_format));
				
			} else if ((__postdate_class.indexOf("refresh") != -1) && (__i.parentNode.className.indexOf(_check_str) != -1))
			{
				var __new_method = "refreshExpireDate('" + __i.parentNode.className + "')";
				__i.children[0].setAttribute("onclick", __new_method);
			}
			
		}
	}
	
	// main function, processes and add the expiration time box to each date
	function processExpireDate(_shack_date)
	{
		var _shackDate = processDate(_shack_date);
		var _currentDate = new Date();
		
		var _fullday_ms = 1000*60*60*18;
		
		var _future_time = _shackDate.getTime() + _fullday_ms;
        var _current_time = _currentDate.getTime();
	   
		var _hour_diff = Math.floor((_future_time - _current_time)/1000/60/60);
		var _mins_diff = Math.round(((_future_time - _current_time)/1000/60) % 60);
		
		var _expiration_bar; // will be a div element
		if (_hour_diff < 0) { // expired
			_expiration_bar = buildDiv(_background_bar, 50, 8, _red_bar, 50, 8, 3);
        } else if (_hour_diff < 1) { // red, less than 1 hour
            _expiration_bar = buildDiv(_background_bar, 50, 8, _red_bar, 10, 8, 3);
        } else if (_hour_diff < 4) { // orange, less than 4 hours
            _expiration_bar = buildDiv(_background_bar, 50, 8, _orange_bar, 15, 8, 3);
        } else if (_hour_diff < 8) { // yellow, less than 8 hours
            _expiration_bar = buildDiv(_background_bar, 50, 8, _yellow_bar, 25, 8, 3);
        } else { // green, 8 hours+
            _expiration_bar = buildDiv(_background_bar, 50, 8, _green_bar, 50, 8, 3);
        }
		
		var _formatted_minutes = (_mins_diff < 10) ? "0" + _mins_diff : _mins_diff; // adds an algarism to minutes
		_expiration_bar.title = (_hour_diff < 0) ? "Expired!" : (_hour_diff + ":" + _formatted_minutes + " to expire");
				
		return _expiration_bar;
	
	}
	
	function buildDiv(__bg, __bg_w, __bg_h, __bar, __bar_w, __bar_h, __radius)
	{
		var _expbar_div = document.createElement("div");
		_expbar_div.className = "expiration";
		_expbar_div.style.margin = "4px 0px 0px 8px";
		_expbar_div.style.cssFloat = "right";
		_expbar_div.innerHTML = "<div class='expiration-bg' style='width: " + __bg_w + "px; height: " + __bg_h + "px; background-image: url(" + __bg + "); -moz-border-radius: " + __radius + "px; padding: 1px;'><div class='expiration-coloredbar' style='width: " + __bar_w + "px; height: " + __bar_h + "px; background-image: url(" + __bar + "); -moz-border-radius: " + __radius + "px;'></div></div>";
	  
	   return _expbar_div;
	}
	
	// converts the shack date format to a Date object, 24h-format and GMT time for comparison purposes
	function processDate(_d)
	{
		// adds space between time and am/pm
		var _ampm_pos = _d.indexOf("am") + _d.indexOf("pm") + 1;
		_d = _d.substr(0, _ampm_pos) + " " + _d.substr(_ampm_pos);
		var _d_parsed = Date.parse(_d);
		var _d_obj = new Date(_d_parsed);

		return _d_obj;
	}

	// had to use unsafeWindow to handle post refresh, will check later if there's an alternative method
	unsafeWindow.refreshExpireDate = function(_refresh_p)
	{
		setTimeout(function() // crude method with timeout, will improve the code later
		{
			setExpireDate(document.getElementsByTagName("div"), _refresh_p);
		}, 2000);
	}
	
	window.addEventListener("load", function(e)
	{
		setExpireDate(document.getElementsByTagName("div"), "fullpost");
	}, false);

		
	// log execution time (shamelessly stolen from other shack greasemonkey scripts, such as Mod Marker, by MisterPhoton
	if (GM_log)
	{
		GM_log(location.href + ' / ' + (getTime() - scriptStartTime) + 'ms');
	}
	
})();
