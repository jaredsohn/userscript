// ==UserScript==
// @name           Simple Imperfect Facebook Timeline Cleaner by Hiding All Posts
// @namespace      http://userscripts.org/users/368084
// @description		To clean your Facebook "Timeline" by hiding shown/visible stuffs. It doesn't delete! Script used for "Activity Log" webpage in your personal FB profile. Once on "Activity Log" webpage, double-click anywhere in the document to activate the script. To stop it, refresh the page.
// @include        *www.facebook.com/*/allactivity
// @include        *www.facebook.com/*/allactivity*
// @grant       none
// @version		20130626
// @author        blitzter47
// ==/UserScript==

var debug = 0;//for console.log
var button = new Array();
button = document.getElementsByClassName('uiPopoverButton');
var timer1 = 200;//(in ms) for processing next instruction without consecutive setTimeouts
var timer2 = 4500;//(in ms) for processing next instruction WITH consecutive setTimeouts
var start_alert = 0;//flag for alerting start of script
var i = -1;//for iteration of each FB publication
var reverse = 0;//flag for executing script from bottom to top of the webpage (older to newer publications)
var l = -1;//for iteration of each FB publication (with "reverse" VAR)
var m = 0;//iteration compatible simult. with reverse and not-reverse VAR
var last = 0;//flag for last publication

//-------------------Fn to easily simulate click on element
function clic(element)
{
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, true);
	element.dispatchEvent(evt);
}

//-------------------Fn updating real-time : how many publications has been loaded on webpage?
function refreshCount()
{
	setInterval(function() {
		if (typeof button === undefined)
	{var button = new Array();}
	button = document.getElementsByClassName('uiPopoverButton');
	}, 5000);
}
document.addEventListener("load", refreshCount, false);

//-------------------Fn for scanning publication's option menu once loaded
function afterMenuLoaded()
{
	if (debug)
	{
		console.log("afterMenuLoaded() runned");
	}
	button = document.getElementsByClassName('uiPopoverButton');
	var verif = button.item(i).parentNode.lastChild; //Actual post's state
	
	//part for completing last post
	if (last == 1 && m == button.length-1)
	{
		last = 2;
	}
	if (verif != null)
	{
		//locate menu options							//var menu_item = new Array();//.item(0);
		var menu_item = verif.getElementsByTagName('ul');//.item(0);
		
		if (menu_item.item(0) != null)
		{
			//getting inside menu options
			var el1 = menu_item.item(0); //must be item 0
			if (debug)
			{
				console.log("j called for iteration : started");
			}
			//----------------iteration on each menu option
			if (j < el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').length)
			{
				if (debug)
				{
					console.log("condition 1 accessed : going through...");
				}
				//going inside each option
				if (el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').item(j) != null)//....getElementsByTagName('span').item(0)
				{
					if (debug)
					{
						console.log("condition 2 accessed : going through...");
					}
					//finding the "hiding" option on each opt
					var caca = el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').item(j).getElementsByTagName('span').item(0).innerHTML.toString();
					if (caca == "N’apparaît pas dans le journal" || caca == "Hidden from Timeline")//"apparait dans journal" ou 'n'apparait pas"
					{
						if (debug)
						{
							console.log("condition 3! Yay! Hiding!");
						}
						//clicking on wanted option :"hide"
						//el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').item(j).getElementsByTagName('span').item(0).parentNode.click();
						clic(el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').item(j).getElementsByTagName('span').item(0).parentNode);
						//going to next post
						setTimeout(nextClick, timer1);
					}
					//if still not the wanted option at the end::close menu + go to next post
					else if (el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').item(el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').length-1).getElementsByTagName('span').item(0).innerHTML.toString() != "N’apparaît pas dans le journal" || el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').item(el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').length-1).getElementsByTagName('span').item(0).innerHTML.toString() != "Hidden from Timeline")
					{
						if (debug)
						{
							console.log("condition 4 accessed : not what we want here...going to next post");
						}
						clic(button.item(i));
						setTimeout(nextClick, timer1);
					}
					// still not the wanted option::search the next option
					else
					{
						if (debug)
						{
							console.log("condition 5 accessed : not what we want yet");
						}
						j++;
						setTimeout(afterMenuLoaded, timer1);
					}
				}
				//the last option in progress in the list of options has no text::something wrong... so go to next post
				else if (el1.getElementsByTagName('li').item(el1.getElementsByClassName('fbTimelineCurationOptions __MenuItem').length-1).getElementsByTagName('span').item(0) == null)
				{
					if (debug)
					{
						console.log("condition 6 accessed : sthg wrong!");
					}
					clic(button.item(i));
					setTimeout(nextClick, timer1);
				}
				//the option in progress in the list of options has no text::something wrong... so go to next option to see...
				else
				{
					if (debug)
					{
						console.log("condition 7 accessed : sthg maybe wrong");
					}
					j++;
					setTimeout(afterMenuLoaded, timer1);
				}
			}
			//when iteration done
			else
			{
				if (debug)
				{
					console.log("condition 8 accessed : iteration done");
				}
				clic(button.item(i));
				setTimeout(nextClick, timer1);
			}
//end selectme
		}
		//if no menu = wrong::going to next post
		else
		{
			if (debug)
			{
				console.log("condition 9 accessed : wrong");
			}
			clic(button.item(i));
			setTimeout(nextClick, timer1);
		}
	}
	//no menu = wrong :: going to next post
	else
	{
		if (debug)
		{
			console.log("condition 10 accessed : wrong");
		}
		clic(button.item(i));
		setTimeout(nextClick, timer1);
	}
}
function nextClick()
{
	if (debug)
	{
		console.log("nextClick() runned");
	}
	//just to tell you it's started
	if (start_alert == 0)
	{
		if (!debug)
		{
			alert("Hiding started");
		}
		else if (debug)
		{
			console.log("Hiding started");
		}
		start_alert = 1;
	}
	//reverse VAR or not
	if (reverse == 1)
	{
		l++;
		i = button.length-1-l;
		m = i;
	}
	else
	{
		i++;
		m = i;
	}
	if (m<button.length-1 || last == 1) //ou l
	{
		j = 0;
		if (debug)
		{
			console.log("i = "+i+"/"+button.length);
		}
	//looking for posts status that is not hidden
		if (button.item(i).getAttribute("aria-label") == "Autorisé dans le journal" || button.item(i).getAttribute("aria-label") == "En avant dans le journal" || button.item(i).getAttribute("aria-label") == "Allowed on Timeline" || button.item(i).getAttribute("aria-label") == "Highlighted on Timeline")
		{
			var before_clic = button.item(i).parentNode.getAttribute("class");
			clic(button.item(i));
			if (debug)
			{
				console.log("waiting for menu");
			}
			//"sensor" waiting for menu fully loaded
			var timer = setInterval(function()
			{
				var after_clic = button.item(i).parentNode.getAttribute("class");
                if(before_clic != after_clic)
                {
                    clearInterval(timer);
					setTimeout(afterMenuLoaded, timer1);
                }
            }, 500);
		}
		else
		{
			setTimeout(nextClick, timer1);
		}
	}
//telling to script we are close to the end
	else if (m<button.length)
	{
		var end = function() { window.scrollTo(0, document.body.scrollHeight); }
		end;
		last = 1;
		setTimeout(end, timer2);
		setTimeout(end, timer2*2);
		setTimeout(end, timer2*3);
		setTimeout(nextClick, timer2*4);
	}
	else if (last == 2)
	{
		if (reverse == 1)
		{
			l = -1;
			m = 0;
		}
		alert("Done");
		i = -1;
		start_alert = 0;
		return;
	}
	else
	{
		if (reverse == 1)
		{
			l = -1;
			m = 0;
		}

		alert("Done/Aborted");
		i = -1;
		start_alert = 0;
		return;
		throw new Error("Stopped JavaScript.");
	}
}
window.addEventListener("dblclick", nextClick, false);