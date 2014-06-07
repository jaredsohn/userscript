// ==UserScript==
// @name           Mousehunter
// @namespace      Ted
// @include        http://www.mousehuntgame.com/*
// @include        https://www.mousehuntgame.com/*
// @exclude        http://www.mousehuntgame.com/forum/*
// @exclude        http://www.mousehuntgame.com/ads/*
// @exclude        https://www.mousehuntgame.com/forum/*
// @exclude        https://www.mousehuntgame.com/ads/*
// @exclude        http://www.mousehuntgame.com/adversaries.php*
// @exclude        https://www.mousehuntgame.com/adversaries.php*
// ==/UserScript==

timePageLoad = new Date().getTime()

function start() {
	
	var allScripts = document.getElementsByTagName("script")
	var thatScript = null
	for (i = 0; i < allScripts.length; i++)
		if (allScripts[i].innerHTML.indexOf("num_active_turns") != -1) {
			thatScript = allScripts[i].innerHTML
			break
		}

	if (thatScript == null) {
		GM_log("couldn't read the data")
		setTimeout(function() { start }, 5000)
		return
	}

	if (thatScript.indexOf("num_active_turns\":0") != -1) {
		location.href = "http://apps.facebook.com/mousehunt/index.php"
		return
	}

	// Check amount of time to next horn
	temp = thatScript.indexOf("next_activeturn_seconds") + 25
	var timeLeft = thatScript.substr(temp, 5)
	temp = timeLeft.indexOf(",")
	timeLeft = timeLeft.substr(0, temp)	* 1

	var ads = document.getElementsByTagName("center")
	while (ads.length > 0)
		ads[0].parentNode.removeChild(ads[0])

	// Check for king's reward
	if (thatScript.indexOf("has_puzzle\":true") != -1) {
		document.title = "King's Reward"
		alert("King's Reward")
		return
	}

	var failstatus = false
	// Check for special event
	if (eventstatus && thatScript.indexOf("with friends to celebrate!") != -1) {
		document.title = "Celebrate"
		alert("Celebrate")
		failstatus = true
	}

	// Check for amount of cheese left
	var temp = thatScript.indexOf("bait_quantity") + 15
	cheeseAmount = thatScript.substr(temp, 10)
	temp = cheeseAmount.indexOf(",")
	cheeseAmount = cheeseAmount.substr(0, temp)	
	cheeseAmount = cheeseAmount * 1
	if (cheeseAmount == 0) {
		document.title = "No cheese"
		alert("No cheese")
		failstatus = true
	}

	// Check for amount of charms left
	if (charmstatus) {
		temp = thatScript.indexOf("trinket_quantity") + 18
		var charmAmount = thatScript.substr(temp, 10)
		temp = charmAmount.indexOf(",")
		charmAmount = charmAmount.substr(0, temp) * 1
		if (charmAmount  == 0) {
			document.title = "No charm"
			alert("No charm")
			failstatus = true
		}
	}

	// Update the percentage to show 2 decimal places
	temp = thatScript.indexOf("title_percentage") + 18
	var title_percentage = thatScript.substr(temp, 6)
	temp = title_percentage.indexOf(",")
	title_percentage = title_percentage.substr(0, temp)
	document.getElementById("hud_titlePercentage").innerHTML = title_percentage


	//---------------------------------------------------
	//Create a box
	popuptime = document.createElement('div')
	
	botstatusindicator = document.createElement('div')
	botbutton = document.createElement('button')
	if (botstatus) {
		botstatusindicator.innerHTML = "Script is running"
		botbutton.innerHTML = "Stop execution"
	} else if (failstatus) {
		botstatusindicator.innerHTML = "Script is not running"		
	} else {
		botstatusindicator.innerHTML = "Script is paused"
		botbutton.innerHTML = "Resume execution"
	}
	botbutton.setAttribute("type", "button")
	botbutton.addEventListener("click", togglebot, true)

	charmstatusindicator = document.createElement('div')
	charmbutton = document.createElement('button')
	if (charmstatus) {
		charmstatusindicator.innerHTML = "Stops when out of charms"
		charmbutton.innerHTML = "Deactivate"
	} else {
		charmstatusindicator.innerHTML = "Don't stop when out of charms"
		charmbutton.innerHTML = "Activate"
	}
	charmbutton.setAttribute("type", "button")
	charmbutton.addEventListener("click", togglecharm, true)

	eventstatusindicator = document.createElement('div')
	eventbutton = document.createElement('button')
	if (eventstatus) {
		eventstatusindicator.innerHTML = "Stops on special event"
		eventbutton.innerHTML = "Deactivate"
	} else {
		eventstatusindicator.innerHTML = "Continues on special event"
		eventbutton.innerHTML = "Activate"
	}
	eventbutton.setAttribute("type", "button")
	eventbutton.addEventListener("click", toggleevent, true)

	locationstatusindicator = document.createElement('div')
	locationbutton = document.createElement('button')
	if (locationstatus) {
		locationstatusindicator.innerHTML = "Stop on change in location"
		locationbutton.innerHTML = "Deactivate"
	} else {
		locationstatusindicator.innerHTML = "Ignore changes in location"
		locationbutton.innerHTML = "Activate"
	}
	locationbutton.setAttribute("type", "button")
	locationbutton.addEventListener("click", togglelocation, true)

	temp = thatScript.indexOf("unique_hash") + 14
	uniquehash = thatScript.substr(temp, 20)
	temp = uniquehash.indexOf(",")
	uniquehash = uniquehash.substr(0, temp - 1)

	scanmousebutton = document.createElement('button')
	scanmousebutton.innerHTML = "Scan mice"
	scanmousebutton.setAttribute("type", "button")
	scanmousebutton.addEventListener("click", scanmouse, true)
	scanmousebutton.setAttribute("id", "mb")

	mousenumberinput = document.createElement('input')
	mousenumberinput.setAttribute("id", "mn")

	mousechoiceinput = document.createElement('select')
	mousechoiceinput.setAttribute("id", "mc")
	mousechoiceinput.setAttribute("multiple", "multiple")
	mousechoiceinput.setAttribute("size", "5")

	newoption = document.createElement("option")
	newoption.innerHTML = "ALL mice"

	mousechoiceinput.appendChild(newoption)	

	specialwin = false
	setspecialbutton = document.createElement('button')
	setspecialbutton.innerHTML = "Set"
	setspecialbutton.setAttribute("type", "button")
	setspecialbutton.addEventListener("click", setspecial, true)
	setspecialbutton.setAttribute("id", "sb")

	specialstatus = document.createElement("div")
	specialstatus.setAttribute("id", "ss")
	if (GM_getValue("special", false)) {
		specialcounter = GM_getValue("specialcounter", 0)
		specialdate = new Date(parseInt(GM_getValue("specialstarttime")))
		specialnumber = GM_getValue("specialnumber", 1)
		specialall = GM_getValue("specialall", true)
		specialstatus.innerHTML = "Catch " + specialnumber + " of "
		if (specialall) {
			specialstatus.innerHTML += "any mice.<BR>"
		} else {
			counter = GM_getValue("specialmousetypes", 1)
			specialmice = new Array(counter)
			for (i = 0; i < counter; i++)
				specialmice[i] = GM_getValue("specialcandidate[" + i + "]")
			counter--
			specialstatus.innerHTML += specialmice[0]
			for (i = 1; i < counter; i++)
				specialstatus.innerHTML += ", "+ specialmice[i]
			if (counter == 0)
				specialstatus.innerHTML += ".<BR>"
			else
				specialstatus.innerHTML += " and " +  specialmice[counter] + ".<BR>"
		}
		for (i = 0; i < specialcounter; i++)
			specialstatus.innerHTML += (i + 1) + ". " + GM_getValue("specialrecord[" + i + "][mouse]") + ". " + GM_getValue("specialrecord[" + i + "][time]") + "<BR>"
		specialstatus.innerHTML += "Last updated on " + specialdate.toLocaleString() + ".<BR>"

		journal = document.getElementById("journalContainer").childNodes
		journal = journal[1].childNodes
		journal = journal[0].childNodes
		journalpointers = []
		mousetimes = []
		for (journalpointer = 0; journalpointer < journal.length; journalpointer ++)
			if (journal[journalpointer].textContent.indexOf("I caught a ") != -1) {
				journal2 = journal[journalpointer].childNodes
				journal2 = journal2[1].childNodes
				time = journal2[1].innerHTML
				colonpos = time.indexOf(":")
				hour = time.substring(0, colonpos)
				min = time.substring(colonpos + 1, colonpos + 3)
				m = time.charAt(colonpos + 4)
				thatdate = new Date()
				if (m == "a")
					thatdate.setHours(hour, min)
				else
					thatdate.setHours(hour * 1 + 12, min)
				if (thatdate.getTime() > new Date().getTime())
					thatdate.setTime(thatdate.getTime() - 24 * 60 * 60 * 1000)
				if (thatdate.getTime() <= specialdate.getTime())
					break
				journalpointers.push(journalpointer)
				mousetimes.push(thatdate)
			}

		for (i = journalpointers.length - 1; i >= 0; i--) {
			journal2 = journal[journalpointers[i]].childNodes
			journal2 = journal2[1].childNodes
			mousename = journal2[2].childNodes
			mousename = mousename[1].innerHTML

			if (specialall) {
				GM_setValue("specialrecord[" + specialcounter + "][mouse]", mousename)
				GM_setValue("specialrecord[" + specialcounter + "][time]", mousetimes[i].toLocaleTimeString())
				specialstatus.innerHTML += (specialcounter + 1) + ". " + mousename + ". " + mousetimes[i].toLocaleTimeString() + "<BR>"
				specialcounter++
			} else {
				if (specialmice.indexOf(mousename) != -1) {
					GM_setValue("specialrecord[" + specialcounter + "][mouse]", mousename)
					GM_setValue("specialrecord[" + specialcounter + "][time]", mousetimes[i].toLocaleTimeString())
					specialstatus.innerHTML += (specialcounter + 1) + ". " + mousename + ". " + mousetimes[i].toLocaleTimeString() + "<BR>"
					specialcounter++
				}
			}
			if (specialcounter >= specialnumber) {
				specialstatus.innerHTML += "Target achieved!"
				GM_setValue("special", false)
				specialwin = true
				break
			}
			GM_setValue("specialcounter", specialcounter)
			GM_setValue("specialstarttime", new Date().getTime() + "")
		}
	}

	popup = document.createElement('div')
	popup.style.position = "fixed"
	popup.style.top = "10%"
	popup.style.left = "80%"
	popup.style.padding = "10px"
	popup.style.border = "solid"
	popup.style.backgroundColor = "Yellow"
	document.getElementsByTagName('body')[0].appendChild(popup)
	popup.appendChild(popuptime)
	popup.appendChild(botstatusindicator)
	if (!failstatus)
		popup.appendChild(botbutton)
	popup.appendChild(charmstatusindicator)
	popup.appendChild(charmbutton)
	popup.appendChild(eventstatusindicator)
	popup.appendChild(eventbutton)
	popup.appendChild(locationstatusindicator)
	popup.appendChild(locationbutton)
	popup.appendChild(scanmousebutton)
	popup.appendChild(mousenumberinput)
	popup.appendChild(mousechoiceinput)
	popup.appendChild(setspecialbutton)
	popup.appendChild(specialstatus)

	if (failstatus)
		return

	//End create a box
	//-------------------------------------------


	if (specialwin)
		alert("You win!")

	temp = thatScript.indexOf("environment_id") + 16
	var environment = thatScript.substr(temp, 5)
	temp = environment.indexOf(",")
	environment = environment.substr(0, temp) * 1
	if (environment != GM_getValue("location_id", -1)) {
		if (locationstatus) {
			alert("You just changed location")
			return
		}
		GM_setValue("location_id", environment)
	}

	//Check for charm if in fiery warpath
	if (environment == 33) {

		warpathstatusindicator = document.createElement('div')
		warpathbutton = document.createElement('button')
		if (warpathstatus) {
			warpathstatusindicator.innerHTML = "Analyse warpath charms"
			warpathbutton.innerHTML = "Deactivate"
		} else {
			warpathstatusindicator.innerHTML = "Ignore warpath"
			warpathbutton.innerHTML = "Activate"
		}
		warpathbutton.setAttribute("type", "button")
		warpathbutton.addEventListener("click", togglewarpath, true)
		popup.appendChild(warpathstatusindicator)
		popup.appendChild(warpathbutton)

		if (warpathstatus) {
			temp = thatScript.indexOf("wave") + 6
			var wave = thatScript.substr(temp, 1) * 1
			if (wave < 4) {
				temp = thatScript.indexOf("trinket_item_id") + 17
				var charmName = thatScript.substr(temp, 10)
				temp = charmName.indexOf(",")
				charmName = charmName.substr(0, temp) * 1

				temp = thatScript.indexOf("mouse_type") + 13
				var streakMouse = thatScript.substr(temp, 25)
				temp = streakMouse.indexOf(",")
				streakMouse = streakMouse.substr(0, temp - 1)
				//GM_log(streakMouse)
				if (streakMouse == "als" && charmName != 0) //false does not come with the "
					alert("streak broken")
				else {
					streakMouse = streakMouse.substr(7,1)
					switch (streakMouse) {
						case "w":
							var streakType = 1
							break
						case "s":
							var streakType = 2
							break
						case "a":
							var streakType = 3
							break
						case "c":
							var streakType = 4
							break
						default:
							var streakType = 0
					}

					switch (streakType) {
						case 0:
							if (charmName != 0)
								alert("streak broken")
							break
						case 1:
							if (charmName != 539)
								alert("Change to warrior charm")
							break
						case 2:
							if (charmName != 538)
								alert("Change to scout charm")
							break
						case 3:
							if (charmName != 534)
								alert("Change to archer charm")
					}
				}
			}
		}
	}

	var timeOfHorn = timePageLoad + (timeLeft * 1000)

	secondsLeft = Math.ceil( (timeOfHorn - timePageLoad) / 1000 )
	horn_min_left = Math.floor(secondsLeft/60)
	horn_sec_left = secondsLeft % 60
	
	if (horn_sec_left <= 9)
		horn_sec_left = "0" + horn_sec_left

	//Display time left in popup window
	popuptime.innerHTML = "Horn sounds in " + horn_min_left + ":" + horn_sec_left

	//Set timer
	setTimeout(soundTheHorn, secondsLeft * 1000 + 10000) //10 seconds buffer
	
	//Display time left in document title
	if (cheeseAmount < 5)
		document.title = horn_min_left + ":" + horn_sec_left + " Low on cheese"
	else
		document.title = horn_min_left + ":" + horn_sec_left

	timer = setInterval(timeCheck, 5000)

}

function timeCheck() {

	currentDate = new Date()
	currentTime = currentDate.getTime()
	secondsLeft -= 5
	if (secondsLeft > 0) {
		horn_min_left = Math.floor(secondsLeft/60)
		horn_sec_left = secondsLeft % 60
	
		if(horn_sec_left <= 9)
			horn_sec_left = "0" + horn_sec_left
	
		//Append time left to document title
		if (cheeseAmount < 5)
			document.title = horn_min_left + ":" + horn_sec_left + " Low on cheese"
		else
			document.title = horn_min_left + ":" + horn_sec_left

		popuptime.innerHTML = "Horn sounds in " + horn_min_left + ":" + horn_sec_left
	} else
		soundTheHorn()

}

function soundTheHorn() {
	clearInterval(timer)
	if (botstatus) {
		window.location.href = "http://www.mousehuntgame.com/turn.php"
	} else {
		botbutton.addEventListener("click", function() { window.location.href = "http://www.mousehuntgame.com/turn.php" }, true)
		document.title = "Sound the horn"
		popuptime.innerHTML = "Horn is ready to sound"
		botbutton.innerHTML = "Sound the horn"
	}
}

function togglebot() {

	botstatus = !botstatus
	GM_setValue("botstatus", botstatus)
	if (botstatus) {
		botstatusindicator.innerHTML = "Script is running"
		botbutton.innerHTML = "Stop execution"
	} else {
		botstatusindicator.innerHTML = "Script is paused"
		botbutton.innerHTML = "Resume execution"
	}

}

function togglecharm() {

	charmstatus = !charmstatus
	GM_setValue("charmstatus", charmstatus)
	if (charmstatus) {
		charmstatusindicator.innerHTML = "Stops when out of charms"
		charmbutton.innerHTML = "Deactivate"
	} else {
		charmstatusindicator.innerHTML = "Don't stop when out of charms"
		charmbutton.innerHTML = "Activate"
	}

}

function toggleevent() {

	eventstatus = !eventstatus
	GM_setValue("eventstatus", eventstatus)
	if (eventstatus) {
		eventstatusindicator.innerHTML = "Stops on special event"
		eventbutton.innerHTML = "Deactivate"
	} else {
		eventstatusindicator.innerHTML = "Continues on special event"
		eventbutton.innerHTML = "Activate"
	}

}

function togglelocation() {

	locationstatus = !locationstatus
	GM_setValue("locationstatus", locationstatus)
	if (locationstatus) {
		locationstatusindicator.innerHTML = "Stop on change in location"
		locationbutton.innerHTML = "Deactivate"
	} else {
		locationstatusindicator.innerHTML = "Ignore changes in location"
		locationbutton.innerHTML = "Activate"
	}

}

function togglewarpath() {

	warpathstatus = !warpathstatus
	GM_setValue("warpathstatus", warpathstatus)
	if (warpathstatus) {
		warpathstatusindicator.innerHTML = "Analyse warpath charms"
		warpathbutton.innerHTML = "Deactivate"
	} else {
		warpathstatusindicator.innerHTML = "Ignore warpath"
		warpathbutton.innerHTML = "Activate"
	}

}

function scanmouse() {

	mousechoiceinput.innerHTML = ""
	newoption = document.createElement("option")
	newoption.innerHTML = "ALL mice"
	mousechoiceinput.appendChild(newoption)
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.mousehuntgame.com/managers/ajax/users/getmiceeffectiveness.php",
		data: "uh=" + uniquehash + "&hg_is_ajax=1&sn=Facebook",
		onload: function(response) {
			response2 = response.responseText.substring(response.responseText.indexOf('"effectiveness"'))
			var index
			while ((index = response2.indexOf('"name":"', index)) != -1) {
				index2 = response2.indexOf('"bar":"', index)
				index3 = response2.indexOf('"thumb":"', index)
				if (index2 >= 0 && index2 < index3)
					index = response2.indexOf('"name":"', index + 1)
				newoption = document.createElement("option")
				newoption.innerHTML = response2.substring(index + 8, index3 - 2)
				mousechoiceinput.appendChild(newoption)
				index = index3 + 1
			}
		},
		onerror: function(response) { alert("Error on AJAX") },
		onabort: function(response) { alert("Abort on AJAX") },
		onprogress: function(response) { alert("Progress on AJAX") }
	})

}

function setspecial() {

	counter = GM_getValue("specialcounter", 0)
	GM_setValue("specialcounter", 0)
	for (i = 0; i < counter; i++) {
		GM_deleteValue("specialrecord[" + i + "][mouse]")
		GM_deleteValue("specialrecord[" + i + "][time]")
	}
	counter = GM_getValue("specialmousetypes", 0)
	for (i = 0; i < counter; i++)
		GM_deleteValue("specialcandidate[" + i + "]")
	GM_setValue("special", true)
	starttime = new Date().getTime() + ""
	GM_setValue("specialstarttime", new Date().getTime() + "")
	mousenumber = parseInt(mousenumberinput.value)
	if (isNaN(mousenumber))
		mousenumber = 1
	GM_setValue("specialnumber", mousenumber)
	specialstatus.innerHTML = "Started on " + new Date().toLocaleString() + ".<BR>Catch " + mousenumber + " of "
	if (mousechoiceinput.selectedIndex == 0) {
		GM_setValue("specialall", true)
		specialstatus.innerHTML += "any mice."
	} else {
		GM_setValue("specialall", false)
		counter = 0
		pointer = 0
		newstring = ""
		while (counter == 0)
			if (mousechoiceinput[pointer].selected) {
				specialstatus.innerHTML += mousechoiceinput[pointer].value
				GM_setValue("specialcandidate[0]", mousechoiceinput[pointer].value)
				counter++
			} else
				pointer++
		for (pointer++; counter < mousechoiceinput.length; pointer++)
			if (mousechoiceinput[pointer].selected) {
				if (newstring != "")
					specialstatus.innerHTML += ", " + newstring
				newstring = mousechoiceinput[pointer].value
				GM_setValue("specialcandidate[" + counter + "]", mousechoiceinput[pointer].value)
				counter++
			}
		if (mousechoiceinput.length > 0)
			specialstatus.innerHTML += " and " + newstring + "."
		GM_setValue("specialmousetypes", counter)
	}

}

var pageHtml = document.getElementsByTagName('html')[0].innerHTML
if (pageHtml.indexOf('Lightning struck our server') != -1) {
	countdown(10)
} else if (pageHtml.indexOf('MouseHunt will return shortly') != -1) {
	countdown(600)
} else if (pageHtml.indexOf("The Tiny Mouse's little legs were too slow to fetch your data.") != -1) {
	countdown(5)
} else if (document.title.indexOf("504") != -1 || document.title.indexOf("Oops") != -1) {
	countdown(10)
} else {
	botstatus = GM_getValue("botstatus", true)
	charmstatus = GM_getValue("charmstatus", false)
	eventstatus = GM_getValue("eventstatus", true)
	locationstatus = GM_getValue("locationstatus", false)
	warpathstatus = GM_getValue("warpathstatus", false)
	start()
}

function countdown(time) {
	if (time == 0) {
		window.location.reload()
	} else {
		document.title = time
		setTimeout(function() { countdown(time - 1) }, 1000)
	}
}