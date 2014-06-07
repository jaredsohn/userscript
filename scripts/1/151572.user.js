// ==UserScript==
// @name          High Contrast Mode Fix
// @namespace     NA
// @description   Experimental focus notification for high contrast mode.
// @grant         GM_log
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://*.amazon.com/*
// @include       https://*.amazon.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @version       2012-11-03
// ==/UserScript==

//var cur = -1;

function main() {
	
    var code_inject = document.createElement('script');

	/*
     * XXX: Broken sound code (needed for auditory usability enhancement)
    document.getElementsByTagName("body")[0].appendChild(sound_elem);

	code_inject.setAttribute("type", "text/javascript");
	code_inject.innerHTML="function playSound(){document.getElementById('click_sound_6389').Play();}";
	*/

    // Adds js functions to the page for "highlighting"
    code_inject.innerHTML+="function showBorder(el){el.style.border = '1px solid white';el.style.outline='1px solid black';}"
    code_inject.innerHTML+="function hideBorder(el){el.style.border = '';el.style.outline='';}"
	document.getElementsByTagName("head")[0].appendChild(code_inject);


	// Many button-like elements use the word "button" in its id, class, or role
	// Data and analysis was done by Kaitlin Flynn
	var patt = /.*button.*/i;

	// Enable highlighting of anchor tags
	var elements = document.getElementsByTagName("a");
	for(var i = 0; i < elements.length; i++)
	{
		elements[i].setAttribute('onmouseover', "showBorder(this)");
		elements[i].setAttribute('onmouseout', "hideBorder(this)");
	}

	// Enable highlighting of button tags
	var buttons = document.getElementsByTagName("button");
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].setAttribute('onmouseover', "showBorder(this)");
		buttons[i].setAttribute('onmouseout', "hideBorder(this)");
	}

	// Enable highlighting of button-like div tags
	var div_elements = document.getElementsByTagName("div");
	for(var i = 0; i < div_elements.length; i++)
	{
		var el_id = div_elements[i].getAttribute('id');
		var el_role = div_elements[i].getAttribute('role');
		var el_class = div_elements[i].getAttribute('class');

		if(patt.test(el_id) || patt.test(el_role) || patt.test(el_class))
		{
		    div_elements[i].setAttribute('onmouseover', "showBorder(this)");
		    div_elements[i].setAttribute('onmouseout', "hideBorder(this)");
		}
	}

	// Enable highlighting of button-like label tags
	var label_elements = document.getElementsByTagName("label");
	for(var i = 0; i < label_elements.length; i++)
	{
		var el_id = label_elements[i].getAttribute('id');
		var el_role = label_elements[i].getAttribute('role');
		var el_class = label_elements[i].getAttribute('class');

		if(patt.test(el_id) || patt.test(el_role) || patt.test(el_class))
		{
		    label_elements[i].setAttribute('onmouseover', "showBorder(this)");
		    label_elements[i].setAttribute('onmouseout', "hideBorder(this)");
		}

	}

	// Enable highlighting of button-like span tags
	var span_elements = document.getElementsByTagName("span");
	for(var i = 0; i < span_elements.length; i++)
	{
		var el_id = span_elements[i].getAttribute('id');
		var el_role = span_elements[i].getAttribute('role');
		var el_class = span_elements[i].getAttribute('class');

		if(patt.test(el_id) || patt.test(el_role) || patt.test(el_class))
		{
		    span_elements[i].setAttribute('onmouseover', "showBorder(this)");
		    span_elements[i].setAttribute('onmouseout', "hideBorder(this)");
		}

	}

	// Enable highlighting of various gmail/google buttons/links
	var gmail_elements = document.getElementsByTagName("tr");
	var gmail_patt = /zA yO/;
	for(var i = 0; i < gmail_elements.length; i++)
	{
		var el_class = gmail_elements[i].getAttribute('class');

		if(gmail_patt.test(el_class))
		{
		    gmail_elements[i].setAttribute('onmouseover', "showBorder(this)");
		    gmail_elements[i].setAttribute('onmouseout', "hideBorder(this)");
		}
	}
}

/*
 * XXX: Broken focus cycling (needed for navigation with limited haptic input)
 * This is non-functional because of the lack of an aggregate ordered
 * NodeList object
function cycleKey(evt)
{
	//alert('working');
    if(evt.keyCode == 9)
	{
		if(cur != -1)
		{
	        elements[cur].style.border = '';
		    elements[cur].style.outline = '';
		}

		cur++;

		if(cur == elements.length)
		{
			cur = 0;
		}

	    elements[cur].style.border = '1px solid white';
		elements[cur].style.outline = '1px solid black';
	}
}
*/

/*
 * XXX: Broken sound code (needed for auditory usability enhancement)
var sound_elem = document.createElement('span');
sound_elem.setAttribute('id', 'sound_elem');
sound_elem.innerHTML = "<embed src='http://dl.google.com/dl/chrome/extensions/audio/click.mp3' hidden='true' autostart='false' loop='false' id='click_sound_6389' />";
*/

window.onload = main;
