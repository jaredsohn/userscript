// ==UserScript==
// @name          Caps Lock Warning
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Warns you when typing a password with Caps Lock on
// @include       *
// ==/UserScript==

var bgColor="#fdd";
var borderColor="#f00";

// Icon from the Silk Icon Set (http://www.famfamfam.com/lab/icons/silk/).
// Put into this format at the URI kitchen (http://software.hixie.ch/utilities/cgi/data/data)
var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9h \
AAACJklEQVQ4y6VTTUiUYRB%2Bvh93dX903bKUYMNlMWHJBC1WW8GjZVCnfpa6Fp1i6dilQwcJglgrDE \
KiQqhDRYWVCEsSFJ0Ksh8zKjJZ3V0WU3G%2F73tnpoNrFGkZzmHmMDPPPM8wA6zRtJUSuXSHISSvhLnA \
LJ21Xc9ouTp9JQAhSblqd0VdG7viQnz0v2hlh%2BPBqaH272TPiF0Ylcl72%2FMTd1qCq2bAxNcqQgm% \
2FpuswvUF46hNBIT6zqulTj9ubMw9jJGSJNXVB7Gy%2FsJ2TLze3qc8DW5v%2FyUCYb%2FgakzqrOXwc \
uoXxR1fBTgaBppMGE%2Ff%2BFSAzGEuUVbdFvZv3YeFrEiKACFCc6IE%2F0g13bUf8w5WGxLIAmcGYj5 \
lTnvABsMoDXOoWAbMDLo6hqvEgmPjsu0th3x8ATNzvCe1f564Ow8ndBiAoD3iWhMHKXERFTQiVWw5tUk \
Xn1G%2BHNHl%2FR0SY39btTpu08BLO9GUwA3pZOeZzs3B7GYYhMCo7Yfj3YrS31SZLRVtO58f1xaPhAV \
%2FDcVN4DjT7HBAGIPg08h7TbyYBCCAMVRiGps%2BjJpZ0Kcs5DwDat7ut3UZV04MNHSmo2SdwstcXJb \
FARAME0A2BJjZECLqxHuX1PXjdl8DM2Mgek4n6ApHDAADT1w7T11YSpy3JLzn5uQ9oLtTtPIbCaPqcKc \
Tp7NMTR4QYTIxfIzkEshwoywFZDshSIFuBHAIrAit6sdZvxg9QwSUH1%2BqgEQAAAABJRU5ErkJggg%3 \
D%3D";

var defaultColor;
var defaultBorder;

function init()

{
  // Find all password fields in the page, and set a keypress event on them
  var inps = document.getElementsByTagName("input");

  for(var i in inps )

  {

    if (inps[i].type == "password")

    {

      inps[i].addEventListener("keypress", keypress,true);

    }

  }

}

function keypress(e)
{
  var ev = e ? e : window.event;
  if (!ev)
  {
    return;
  }
  var targ = ev.target ? ev.target : ev.srcElement;
  // get key pressed
  var which = -1;
  if (ev.which)
  {
    which = ev.which;
  }
  else if (ev.keyCode)
  {
    which = ev.keyCode;
  }
  // get shift status
  var shift_status = false;
  if (ev.shiftKey)
  {
    shift_status = ev.shiftKey;
  }
  else if (ev.modifiers)
  {
    shift_status = !!(ev.modifiers & 4);
  }
  if (((which >= 65 && which <=  90) && !shift_status) ||
      ((which >= 97 && which <= 122) && shift_status))
  {
    // uppercase, no shift key
    show_warning(targ);
  }
    else if(which >= 65 && which <= 122)
  {
    hide_warning(targ);
  }
}
  
function show_warning(targ)
{
  if (!targ.warning)
  {
    defaultColor = targ.style.backgroundColor;
    targ.style.backgroundColor=bgColor;
    defaultBorder = targ.style.border;
    targ.style.border="1px solid " + borderColor;
    targ.warning = document.createElement('div');
    targ.warning.innerHTML = "<img src='"+ icon + "' /> Warning: Caps Lock is on.";
    targ.warning.style.position = "absolute";
    console.log(targ.warning.style.top = (getElementTop(targ) + targ.offsetHeight + 5) + "px");
    console.log(targ.warning.style.left = (getElementLeft(targ)) + "px");
    targ.warning.style.zIndex = "9999";
    targ.warning.style.backgroundColor= bgColor;
    targ.warning.style.border="1px solid " +borderColor;
    targ.warning.style.lineHeight="20px";
    targ.warning.style.padding="4px";
    
    
    targ.warning.childNodes[0].style.verticalAlign="text-bottom";
   }
   document.body.appendChild(targ.warning);
}

function hide_warning(targ)
{
  if (targ.warning)
  {
    targ.style.backgroundColor = defaultColor;
    targ.style.border = defaultBorder;
    targ.warning.parentNode.removeChild(targ.warning);
    targ.warning = null;
  }
}

function getElementLeft(e)
{
	var x=0;
	while(e)
	{
		x+=e.offsetLeft;
		e=e.offsetParent;
	}
	return x;
}

function getElementTop(e)
{
	var y=0;
	while(e)
	{
		y+=e.offsetTop;
		e=e.offsetParent;
	}
	return y;
}

init();
//show_warning(document.body.childNodes[3]);
