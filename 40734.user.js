// ==UserScript==
// @name		DigitalSliders
// @namespace		http://www.courtrivals.com/
// @description		Adds the ability to adjust sliders digitally
// @include		http://www.courtrivals.com/maingame.php
// ==/UserScript==

digitalsliders();
function digitalsliders()
{
	//*****************************************************************
	// Get current sliders
	//*****************************************************************

	var document_lines = document.documentElement.innerHTML;			
	var all_lines = document_lines.split("\n");

	var previousslider1 = all_lines[160].slice(all_lines[160].indexOf("=") + 1,all_lines[160].indexOf(";")) * 1;
	var previousslider2 = all_lines[165].slice(all_lines[165].indexOf("=") + 1,all_lines[165].indexOf(";")) * 1;
	var previousslider3 = all_lines[170].slice(all_lines[170].indexOf("=") + 1,all_lines[170].indexOf(";")) * 1;
	var previousslider4 = all_lines[175].slice(all_lines[175].indexOf("=") + 1,all_lines[175].indexOf(";")) * 1;
	var previousslider5 = all_lines[180].slice(all_lines[180].indexOf("=") + 1,all_lines[180].indexOf(";")) * 1;


	//*****************************************************************
	// Create new save settings button
	//*****************************************************************

	var savesettings = document.createElement('button');
	savesettings.innerHTML = '<input type="submit" name="button" id="savesetting">Save Settings</input>';
	document.getElementById("sliderval1").parentNode.insertBefore(savesettings, document.getElementById("sliderval1"));		


	//*****************************************************************
	// Convert old save settings button to digital sliders
	//*****************************************************************

	document.getElementById("button").type = "button";
	document.getElementById("button").value = "Digital Sliders";

	//*****************************************************************
	// Create pulldowns and line breaks
	//*****************************************************************

	var pulldown1 = document.createElement("text");
	var pulldown2 = document.createElement("text");
	var pulldown3 = document.createElement("text");
	var pulldown4 = document.createElement("text");
	var pulldown5 = document.createElement("text");
						
	var slider1 = document.getElementsByTagName("input")[0];
	var slider2 = document.getElementsByTagName("input")[1];
	var slider3 = document.getElementsByTagName("input")[2];
	var slider4 = document.getElementsByTagName("input")[3];
	var slider5 = document.getElementsByTagName("input")[4];
		

	var index11, index12, index13;
	if(previousslider1 < 50)
	{
		index11 = 'selected="selected"';
	}
	else if(previousslider1 > 50)
	{
		index12 = 'selected="selected"';
	}
	else
	{
		index13 = 'selected="selected"';
	}

	pulldown1.innerHTML = '<select id="slide1">' +
		'<option id="takeless" ' + index11 + '>Take Less 3\'s</option>' +
		'<option id="takemore" ' + index12 + '>Take More 3\'s</option>' +
		'<option id="neutral" ' + index13 + '>Neutral</option></select>';

	//-----------------------------------------------------------------

	var index21, index22, index23;
	if(previousslider2 < 50)
	{
		index21 = 'selected="selected"';
	}
	else if(previousslider2 > 50)
	{
		index22 = 'selected="selected"';
	}
	else
	{
		index23 = 'selected="selected"';
	}

	pulldown2.innerHTML = '<select id="slide2">' +
		'<option id="passmore" ' + index21 + '>Pass More</option>' +
		'<option id="shootmore" ' + index22 + '>Shoot More</option>' +
		'<option id="neutral" ' + index23 + '>Neutral</option></select>';

	//-----------------------------------------------------------------

	var index31, index32, index33;
	if(previousslider3 < 50)
	{
		index31 = 'selected="selected"';
	}
	else if(previousslider3 > 50)
	{
		index32 = 'selected="selected"';
	}
	else
	{
		index33 = 'selected="selected"';
	}

	pulldown3.innerHTML = '<select id="slide3">' +
		'<option id="attack" ' + index31 + '>Attack the Basket</option>' +
		'<option id="jumpshots" ' + index32 + '>Take Jump Shots</option>' +
		'<option id="neutral" ' + index33 + '>Neutral</option></select>';

	//-----------------------------------------------------------------

	var index41, index42, index43;
	if(previousslider4 < 50)
	{
		index41 = 'selected="selected"';
	}
	else if(previousslider4 > 50)
	{
		index42 = 'selected="selected"';
	}
	else
	{
		index43 = 'selected="selected"';
	}

	pulldown4.innerHTML = '<select id="slide4">' +
		'<option id="crashboards" ' + index41 + '>Crash the Boards</option>' +
		'<option id="getback" ' + index42 + '>Get Back on Defense</option>' +
		'<option id="neutral" ' + index43 + '>Neutral</option></select>';

	//-----------------------------------------------------------------

	var index51, index52, index53;
	if(previousslider5 < 50)
	{
		index51 = 'selected="selected"';
	}
	else if(previousslider5 > 50)
	{
		index52 = 'selected="selected"';
	}
	else
	{
		index53 = 'selected="selected"';
	}

	pulldown5.innerHTML = '<select id="slide5">' +
		'<option id="takechances" ' + index51 + '>Take Chances on Defense</option>' +
		'<option id="conservative" ' + index52 + '>Play Conservative Defense</option>' +
		'<option id="neutral" ' + index53 + '>Neutral</option></select>';


	//*****************************************************************
	// Activate digital sliders
	//*****************************************************************
	
	document.getElementById("button").addEventListener('click', function()
	{

		//*****************************************************************
		// Remove digital sliders button
		//*****************************************************************

		document.getElementById("button").parentNode.removeChild(document.getElementById("button"));
		var nextline = document.createElement("br");
		savesettings.parentNode.insertBefore(nextline, savesettings.nextSibling);

		//*****************************************************************
		// Slider Table
		//*****************************************************************

		var heading = document.createElement("div");
		heading.innerHTML = '<div><p>&nbsp;</p><table width="100%" height="30" border="0" cellpadding="3" cellspacing="1"><tr><td width="100%" align="center" bgcolor="#660000" class="tableHeader2" colspan="2"><strong>Digital Sliders</strong></td></tr></table></div>';
		savesettings.parentNode.insertBefore(heading, savesettings.nextSibling);

		document.getElementById("sliderval1").type = 'text';
		document.getElementById("sliderval2").type = 'text';
		document.getElementById("sliderval3").type = 'text';
		document.getElementById("sliderval4").type = 'text';
		document.getElementById("sliderval5").type = 'text';
		
		//*****************************************************************
		// Insert pulldowns and textboxes
		//*****************************************************************

		document.getElementById("sliderval1").size = "5";
		if(document.getElementById("sliderval1").value < 50)
		{
			document.getElementById("sliderval1").value = -2 * document.getElementById("sliderval1").value + 100;
		}
		else if(document.getElementById("sliderval1").value > 50)
		{
			document.getElementById("sliderval1").value = 2 * document.getElementById("sliderval1").value - 100;
		}
		else
		{
			document.getElementById("sliderval1").value = 0;
		}
	
		var nextline = document.createElement("br");	
		document.getElementById("sliderval1").parentNode.insertBefore(pulldown1, document.getElementById("sliderval1"));
		document.getElementById("sliderval1").parentNode.insertBefore(nextline, document.getElementById("sliderval1").nextSibling);
	
		//-----------------------------------------------------------------

		document.getElementById("sliderval2").size = "5";
		if(document.getElementById("sliderval2").value < 50)
		{
		document.getElementById("sliderval2").value = -2 * document.getElementById("sliderval2").value + 100;
		}
		else if(document.getElementById("sliderval2").value > 50)
		{
			document.getElementById("sliderval2").value = 2 * document.getElementById("sliderval2").value - 100;
		}
		else
		{
			document.getElementById("sliderval2").value = 0;
		}
	
		var nextline = document.createElement("br");		
		document.getElementById("sliderval2").parentNode.insertBefore(pulldown2, document.getElementById("sliderval2"));
		document.getElementById("sliderval2").parentNode.insertBefore(nextline, document.getElementById("sliderval2").nextSibling);

		//-----------------------------------------------------------------

		document.getElementById("sliderval3").size = "5";
		if(document.getElementById("sliderval3").value < 50)
		{
			document.getElementById("sliderval3").value = -2 * document.getElementById("sliderval3").value + 100;
		}
		else if(document.getElementById("sliderval3").value > 50)
		{
			document.getElementById("sliderval3").value = 2 * document.getElementById("sliderval3").value - 100;
		}
		else
		{
			document.getElementById("sliderval3").value = 0;
		}
	
		var nextline = document.createElement("br");		
		document.getElementById("sliderval3").parentNode.insertBefore(pulldown3, document.getElementById("sliderval3"));
		document.getElementById("sliderval3").parentNode.insertBefore(nextline, document.getElementById("sliderval3").nextSibling);

		//-----------------------------------------------------------------

		document.getElementById("sliderval4").size = "5";
		if(document.getElementById("sliderval4").value < 50)
		{
			document.getElementById("sliderval4").value = -2 * document.getElementById("sliderval4").value + 100;
		}
		else if(document.getElementById("sliderval4").value > 50)
		{
			document.getElementById("sliderval4").value = 2 * document.getElementById("sliderval4").value - 100;
		}
		else
		{
			document.getElementById("sliderval4").value = 0;
		}
	
		var nextline = document.createElement("br");		
		document.getElementById("sliderval4").parentNode.insertBefore(pulldown4, document.getElementById("sliderval4"));
		document.getElementById("sliderval4").parentNode.insertBefore(nextline, document.getElementById("sliderval4").nextSibling);

		//-----------------------------------------------------------------

		document.getElementById("sliderval5").size = "5";
		if(document.getElementById("sliderval5").value < 50)
		{
			document.getElementById("sliderval5").value = -2 * document.getElementById("sliderval5").value + 100;
		}
		else if(document.getElementById("sliderval5").value > 50)
		{
			document.getElementById("sliderval5").value = 2 * document.getElementById("sliderval5").value - 100;
		}
		else
		{
			document.getElementById("sliderval5").value = 0;
		}
	
		var nextline = document.createElement("br");	
		document.getElementById("sliderval5").parentNode.insertBefore(pulldown5, document.getElementById("sliderval5"));
		document.getElementById("sliderval5").parentNode.insertBefore(nextline, document.getElementById("sliderval5").nextSibling);
	
		var submitbutton = document.createElement('button');
		submitbutton.innerHTML = '<input type="submit" id="submitbutton" value="Submit">Submit</input>';
		document.getElementById("sliderval5").parentNode.insertBefore(submitbutton, document.getElementById("sliderval5").nextSibling);
		submitbutton.parentNode.insertBefore(nextline, submitbutton);

		var spacing = document.createElement("text");
		spacing.innerHTML = '<p>&nbsp;</p>';
		submitbutton.parentNode.insertBefore(spacing, submitbutton.nextSibling);
		submitbutton.addEventListener('click', function()
		{
			if(document.getElementById("slide1").selectedIndex == 0)
			{
				document.getElementById("sliderval1").value = - document.getElementById("sliderval1").value / 2 + 50;
			}
			else if(document.getElementById("slide1").selectedIndex == 1)
			{
				document.getElementById("sliderval1").value = document.getElementById("sliderval1").value / 2 + 50;
			}
			else if(document.getElementById("slide1").selectedIndex == 2)
			{
				document.getElementById("sliderval1").value = 50;
			}
			if(document.getElementById("sliderval1").value < 0)
			{
				document.getElementById("sliderval1").value = 0;
			}
			else if(document.getElementById("sliderval1").value > 100)
			{
				document.getElementById("sliderval1").value = 100;
			}
		
			//-----------------------------------------------------------------

			if(document.getElementById("slide2").selectedIndex == 0)
			{
				document.getElementById("sliderval2").value = - document.getElementById("sliderval2").value / 2 + 50;
			}
			else if(document.getElementById("slide2").selectedIndex == 1)
			{
				document.getElementById("sliderval2").value = document.getElementById("sliderval2").value / 2 + 50;
			}
			else if(document.getElementById("slide2").selectedIndex == 2)
			{
				document.getElementById("sliderval2").value = 50;
			}
			if(document.getElementById("sliderval2").value < 0)
			{
				document.getElementById("sliderval2").value = 0;
			}
			else if(document.getElementById("sliderval2").value > 100)
			{
				document.getElementById("sliderval2").value = 100;
			}
		
			//-----------------------------------------------------------------

			
			if(document.getElementById("slide3").selectedIndex == 0)
			{
				document.getElementById("sliderval3").value = - document.getElementById("sliderval3").value / 2 + 50;
			}
			else if(document.getElementById("slide3").selectedIndex == 1)
			{
				document.getElementById("sliderval3").value = document.getElementById("sliderval3").value / 2 + 50;
			}
			else if(document.getElementById("slide3").selectedIndex == 2)
			{
				document.getElementById("sliderval3").value = 50;
			}
			if(document.getElementById("sliderval3").value < 0)
			{
				document.getElementById("sliderval3").value = 0;
			}
			else if(document.getElementById("sliderval3").value > 100)
			{
				document.getElementById("sliderval3").value = 100;
			}
		
			//-----------------------------------------------------------------

			
			if(document.getElementById("slide4").selectedIndex == 0)
			{
				document.getElementById("sliderval4").value = - document.getElementById("sliderval4").value / 2 + 50;
			}
			else if(document.getElementById("slide4").selectedIndex == 1)
			{
				document.getElementById("sliderval4").value = document.getElementById("sliderval4").value / 2 + 50;
			}
			else if(document.getElementById("slide4").selectedIndex == 2)
			{
				document.getElementById("sliderval4").value = 50;
			}
			if(document.getElementById("sliderval4").value < 0)
			{
				document.getElementById("sliderval4").value = 0;
			}
			else if(document.getElementById("sliderval4").value > 100)
			{
				document.getElementById("sliderval4").value = 100;
			}
		
			//-----------------------------------------------------------------

			if(document.getElementById("slide5").selectedIndex == 0)
			{
				document.getElementById("sliderval5").value = - document.getElementById("sliderval5").value / 2 + 50;
			}
			else if(document.getElementById("slide5").selectedIndex == 1)
			{
				document.getElementById("sliderval5").value = document.getElementById("sliderval5").value / 2 + 50;
			}
			else if(document.getElementById("slide5").selectedIndex == 2)
			{
				document.getElementById("sliderval5").value = 50;
			}
			if(document.getElementById("sliderval5").value < 0)
			{
				document.getElementById("sliderval5").value = 0;
			}
			else if(document.getElementById("sliderval5").value > 100)
			{
				document.getElementById("sliderval5").value = 100;
			}
		}, false);
	}, false);
}