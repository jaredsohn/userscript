// <![CDATA[
// ==UserScript==
// @name InterfaceLift Resolutions Links
// @description Add links for specific resolutions if available
// @author TiTi - http://userscripts.org/users/97232
// @version 1.0
// @date 20011-06-18
// @licence WTFPL; http://sam.zoy.org/wtfpl/
// @include	http://interfacelift.com/wallpaper/*
// ==/UserScript==

/*
	This script add direct links to wallpapers for specific resolutions.
	Links are added under the default resolution dropdown + download button.
	It works on several pages of interfacelift, whether it is a gallery or detail of a wallpaper, ex:
		http://interfacelift.com/wallpaper/downloads/date/any/
		http://interfacelift.com/wallpaper/details/2612/silence.html
		http://interfacelift.com/wallpaper/downloads/date/2_screens/
	Links are using interfacelift styles, they fit nicely.
	Links are simple <a href="path/image.jpg">resolution</a> with no javascript so that you can left or middle clic without issue.
	Script was made with ascendant compatibility in mind. Could be improved thought... But it should continue to work even with minor changes in the interfacelift website.
	
	This script works with Opera & GreaseMonkey at least. Probably ok with others browsers but haven't tested them yet...
*/

(function()
{
	var settings =
	{
		resolutions: ['1920x1080', '1280x800'],
		oneLine: false, // one line for all resolutions ?
		exactResolution: true, // Display format, exemple: "1920x1080" vs "1080p"
		logTag: '[InterfaceLift Resolutions Links] '
	};
	
	// Returns null if resolution doesn't exists, else it returns the corresponding <option>
	function ResolutionExists(select, resolution)
	{
		for(var i = 0, len = select.options.length; i < len; i++)
		{
			var opt = select.options[i];
			if(opt.value == resolution)
			{
				return opt;
				break;
			}
		}
		return null;
	}
	
	function triggerEvent(element, event)
	{
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true);
		return !element.dispatchEvent(evt);
	}
	
	// Process one <select> (add download links for each available resolution)
	function DoSelect(select)
	{
		var currentOption = select.options[select.selectedIndex];
		var divDownload = select.parentNode;
		var newButtons = []; // array of {href:,text:}
		
		// Trigger onChange on the select for each resolution
		for(var i = 0, len = settings.resolutions.length; i < len; i++)
		{
			var resolution = settings.resolutions[i];
			var opt = ResolutionExists(select, resolution);
			if(opt)
			{
				// Simulate user change in the dropdown
				opt.selected = true;
				triggerEvent(select, 'change');
				
				// Because button is replaced each time with a new one, we have to get it for every loop
				var button = divDownload.getElementsByTagName('a')[0];
				newButtons.push(
				{
					href: button.href,
					text: resolution,
					text2: opt.innerHTML
				});
			}
		}
		
		// Create links
		var container = document.createElement('div');
		container.style.textAlign = 'left'; // Avoid css (center)
		for(i = 0, len = newButtons.length; i < len; i++)
		{
			var a = document.createElement('a');
			a.href = newButtons[i].href;
			a.innerHTML = settings.exactResolution ? newButtons[i].text : newButtons[i].text2;
			container.appendChild(a);
			
			if(!settings.oneLine)
			{
				if(i + 1 != len) // Avoid useless carriage return at the end
				{
					container.appendChild(document.createElement('br'));
				}
			}
		}
		// Add them
		divDownload.parentNode.appendChild(container);
		
		// Reset selected option to the one before
		currentOption.selected = true;
		triggerEvent(select, 'change');
	}
	
	//-----
	// Entry Point
	
	try
	{
		if(typeof(GM_getValue) != 'undefined') // GreaseMonkey specifics
		{
			var separator = ',';
			
			var storedResolutions = GM_getValue('resolutions');
			if(storedResolutions)
			{
				settings.resolutions = storedResolutions.split(separator);
			}
			
			GM_registerMenuCommand("Set Resolutions", function()
			{
				var data = prompt("Enter resolution(s) separated by '"+separator+"'", settings.resolutions.join(separator));
				GM_setValue('resolutions', data);
				settings.resolutions = data.split(separator);
				window.location.reload(true);
			});
		}
	
		// Find all <select> corresponding to a resolution choice
		var selects = document.getElementsByName('resolution');
		for(var i = 0, len = selects.length; i < len; i++)
		{
			DoSelect(selects[i]);
		}
	}
	catch(err)
	{
		console.error(settings.logTag + 'ERROR - ' + err);
	}
})();
// ]]>