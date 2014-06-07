// ==UserScript==
// @name           Fix Symbol-Font Text
// @namespace      fixthefonts@somepages
// @description    Fixes Symbol-Font Text and turns the text into the standard symbols they should be shown as.
// @include        *
// ==/UserScript==

check(document.documentElement,false) // check all parts of the page recursively
//alert(document.location.toString())

function check(element,fixfont) {
	font = ""
	try {
		font = document.defaultView.getComputedStyle(element,'').fontFamily
	} catch (e) {/*GM_log("Err: "+e)*/}
	// Don't stop if style can't be found. Some don't work like that.
	
		if (font.toLowerCase() == "symbol" || (fixfont && font==""))
		{
			// uncomment to highlight changes:
			//if (element.style) {element.style.backgroundColor="red"}
			
			// Go through elements inside and change them.
			for (var a=0; a<element.childNodes.length; a++)
			{
				check(element.childNodes[a],true)
			}
			if (element.childNodes.length==0)
			{
				element.textContent = convertText(element.textContent)
			}
		} else {
			for (var a=0; a<element.childNodes.length; a++)
			{
				check(element.childNodes[a],false)
			}
		}
	}

function convertText(text) {
	// Go through the text and replace letters in Symbol font with valid unicode characters.
	var out=""
	for (var i=0; i<text.length; i++) {
		ch = text.charAt(i)
		//now convert each letter. These are based on values here:
		// http://www.alanwood.net/demos/symbol.html
		
		if (ch==String.fromCharCode(180))
			{ch = String.fromCharCode(215)}
		else if (ch == String.fromCharCode(184))
			{ch = String.fromCharCode(247)}
		else if (ch == String.fromCharCode(210))
			{ch = String.fromCharCode(174)}
		else if (ch == String.fromCharCode(211))
			{ch = String.fromCharCode(169)}
		else if (ch == String.fromCharCode(216))
			{ch = String.fromCharCode(172)}
		else if (ch == String.fromCharCode(226))
			{ch = String.fromCharCode(174)}
		else if (ch == String.fromCharCode(227))
			{ch = String.fromCharCode(169)}
		else if (ch == String.fromCharCode(166))
			{ch = String.fromCharCode(402)}
		else if (ch == "A")
			{ch = String.fromCharCode(913)}
		else if (ch == "B")
			{ch = String.fromCharCode(914)}
		else if (ch == "G")
			{ch = String.fromCharCode(915)}
		else if (ch == "D")
			{ch = String.fromCharCode(916)}
		else if (ch == "E")
			{ch = String.fromCharCode(917)}
		else if (ch == "Z")
			{ch = String.fromCharCode(918)}
		else if (ch == "H")
			{ch = String.fromCharCode(919)}
		else if (ch == "Q")
			{ch = String.fromCharCode(920)}
		else if (ch == "I")
			{ch = String.fromCharCode(921)}
		else if (ch == "K")
			{ch = String.fromCharCode(922)}
		else if (ch == "L")
			{ch = String.fromCharCode(923)}
		else if (ch == "M")
			{ch = String.fromCharCode(924)}
		else if (ch == "N")
			{ch = String.fromCharCode(925)}
		else if (ch == "X")
			{ch = String.fromCharCode(926)}
		else if (ch == "O")
			{ch = String.fromCharCode(927)}
		else if (ch == "P")
			{ch = String.fromCharCode(928)}
		else if (ch == "R")
			{ch = String.fromCharCode(929)}
		else if (ch == "S")
			{ch = String.fromCharCode(931)}
		else if (ch == "T")
			{ch = String.fromCharCode(932)}
		else if (ch == "U")
			{ch = String.fromCharCode(933)}
		else if (ch == "F")
			{ch = String.fromCharCode(934)}
		else if (ch == "C")
			{ch = String.fromCharCode(935)}
		else if (ch == "Y")
			{ch = String.fromCharCode(936)}
		else if (ch == "W")
			{ch = String.fromCharCode(937)}
		else if (ch == "a")
			{ch = String.fromCharCode(945)}
		else if (ch == "b")
			{ch = String.fromCharCode(946)}
		else if (ch == "g")
			{ch = String.fromCharCode(947)}
		else if (ch == "d")
			{ch = String.fromCharCode(948)}
		else if (ch == "e")
			{ch = String.fromCharCode(949)}
		else if (ch == "z")
			{ch = String.fromCharCode(950)}
		else if (ch == "h")
			{ch = String.fromCharCode(951)}
		else if (ch == "q")
			{ch = String.fromCharCode(952)}
		else if (ch == "i")
			{ch = String.fromCharCode(953)}
		else if (ch == "k")
			{ch = String.fromCharCode(954)}
		else if (ch == "l")
			{ch = String.fromCharCode(955)}
		else if (ch == "m")
			{ch = String.fromCharCode(956)}
		else if (ch == "n")
			{ch = String.fromCharCode(957)}
		else if (ch == "x")
			{ch = String.fromCharCode(958)}
		else if (ch == "o")
			{ch = String.fromCharCode(959)}
		else if (ch == "p")
			{ch = String.fromCharCode(960)}
		else if (ch == "r")
			{ch = String.fromCharCode(961)}
		else if (ch == "V")
			{ch = String.fromCharCode(962)}
		else if (ch == "s")
			{ch = String.fromCharCode(963)}
		else if (ch == "t")
			{ch = String.fromCharCode(964)}
		else if (ch == "u")
			{ch = String.fromCharCode(965)}
		else if (ch == "f")
			{ch = String.fromCharCode(966)}
		else if (ch == "c")
			{ch = String.fromCharCode(967)}
		else if (ch == "y")
			{ch = String.fromCharCode(968)}
		else if (ch == "w")
			{ch = String.fromCharCode(969)}
		else if (ch == "J")
			{ch = String.fromCharCode(977)}
		else if (ch == "j")
			{ch = String.fromCharCode(981)}
		else if (ch == "v")
			{ch = String.fromCharCode(982)}
		else if (ch == String.fromCharCode(161))
			{ch = String.fromCharCode(978)}
		else if (ch == String.fromCharCode(162))
			{ch = String.fromCharCode(8242)}
		else if (ch == String.fromCharCode(164))
			{ch = String.fromCharCode(8260)}
		else if (ch == String.fromCharCode(178))
			{ch = String.fromCharCode(8243)}
		else if (ch == String.fromCharCode(188))
			{ch = String.fromCharCode(8230)}
		else if (ch == String.fromCharCode(192))
			{ch = String.fromCharCode(8501)}
		else if (ch == String.fromCharCode(193))
			{ch = String.fromCharCode(8465)}
		else if (ch == String.fromCharCode(194))
			{ch = String.fromCharCode(8476)}
		else if (ch == String.fromCharCode(195))
			{ch = String.fromCharCode(8472)}
		else if (ch == String.fromCharCode(212))
			{ch = String.fromCharCode(8482)}
		else if (ch == String.fromCharCode(228))
			{ch = String.fromCharCode(8482)}
		else if (ch == String.fromCharCode(240))
			{ch = String.fromCharCode(8364)}
		else if (ch == String.fromCharCode(171))
			{ch = String.fromCharCode(8596)}
		else if (ch == String.fromCharCode(172))
			{ch = String.fromCharCode(8592)}
		else if (ch == String.fromCharCode(173))
			{ch = String.fromCharCode(8593)}
		else if (ch == String.fromCharCode(174))
			{ch = String.fromCharCode(8594)}
		else if (ch == String.fromCharCode(175))
			{ch = String.fromCharCode(8595)}
		else if (ch == String.fromCharCode(191))
			{ch = String.fromCharCode(8629)}
		else if (ch == String.fromCharCode(219))
			{ch = String.fromCharCode(8660)}
		else if (ch == String.fromCharCode(220))
			{ch = String.fromCharCode(8656)}
		else if (ch == String.fromCharCode(221))
			{ch = String.fromCharCode(8657)}
		else if (ch == String.fromCharCode(222))
			{ch = String.fromCharCode(8658)}
		else if (ch == String.fromCharCode(223))
			{ch = String.fromCharCode(8659)}
		else if (ch == String.fromCharCode(34))
			{ch = String.fromCharCode(8704)}
		else if (ch == String.fromCharCode(36))
			{ch = String.fromCharCode(8707)}
		else if (ch == String.fromCharCode(39))
			{ch = String.fromCharCode(8717)}
		else if (ch == String.fromCharCode(42))
			{ch = String.fromCharCode(8727)}
		else if (ch == String.fromCharCode(45))
			{ch = String.fromCharCode(8722)}
		else if (ch == String.fromCharCode(64))
			{ch = String.fromCharCode(8773)}
		else if (ch == String.fromCharCode(92))
			{ch = String.fromCharCode(8756)}
		else if (ch == String.fromCharCode(94))
			{ch = String.fromCharCode(8869)}
		else if (ch == String.fromCharCode(126))
			{ch = String.fromCharCode(8764)}
		else if (ch == String.fromCharCode(163))
			{ch = String.fromCharCode(8804)}
		else if (ch == String.fromCharCode(165))
			{ch = String.fromCharCode(8734)}
		else if (ch == String.fromCharCode(179))
			{ch = String.fromCharCode(8805)}
		else if (ch == String.fromCharCode(181))
			{ch = String.fromCharCode(8733)}
		else if (ch == String.fromCharCode(182))
			{ch = String.fromCharCode(8706)}
		else if (ch == String.fromCharCode(183))
			{ch = String.fromCharCode(8729)}
		else if (ch == String.fromCharCode(185))
			{ch = String.fromCharCode(8800)}
		else if (ch == String.fromCharCode(186))
			{ch = String.fromCharCode(8801)}
		else if (ch == String.fromCharCode(187))
			{ch = String.fromCharCode(8776)}
		else if (ch == String.fromCharCode(196))
			{ch = String.fromCharCode(8855)}
		else if (ch == String.fromCharCode(197))
			{ch = String.fromCharCode(8853)}
		else if (ch == String.fromCharCode(198))
			{ch = String.fromCharCode(8709)}
		else if (ch == String.fromCharCode(199))
			{ch = String.fromCharCode(8745)}
		else if (ch == String.fromCharCode(200))
			{ch = String.fromCharCode(8746)}
		else if (ch == String.fromCharCode(201))
			{ch = String.fromCharCode(8835)}
		else if (ch == String.fromCharCode(202))
			{ch = String.fromCharCode(8839)}
		else if (ch == String.fromCharCode(203))
			{ch = String.fromCharCode(8836)}
		else if (ch == String.fromCharCode(204))
			{ch = String.fromCharCode(8834)}
		else if (ch == String.fromCharCode(205))
			{ch = String.fromCharCode(8838)}
		else if (ch == String.fromCharCode(206))
			{ch = String.fromCharCode(8712)}
		else if (ch == String.fromCharCode(207))
			{ch = String.fromCharCode(8713)}
		else if (ch == String.fromCharCode(208))
			{ch = String.fromCharCode(8736)}
		else if (ch == String.fromCharCode(209))
			{ch = String.fromCharCode(8711)}
		else if (ch == String.fromCharCode(213))
			{ch = String.fromCharCode(8719)}
		else if (ch == String.fromCharCode(214))
			{ch = String.fromCharCode(8730)}
		else if (ch == String.fromCharCode(215))
			{ch = String.fromCharCode(8901)}
		else if (ch == String.fromCharCode(217))
			{ch = String.fromCharCode(8743)}
		else if (ch == String.fromCharCode(218))
			{ch = String.fromCharCode(8744)}
		else if (ch == String.fromCharCode(229))
			{ch = String.fromCharCode(8721)}
		else if (ch == String.fromCharCode(242))
			{ch = String.fromCharCode(8747)}
		else if (ch == String.fromCharCode(190))
			{ch = String.fromCharCode(9135)}
		else if (ch == String.fromCharCode(225))
			{ch = String.fromCharCode(9001)}
		else if (ch == String.fromCharCode(230))
			{ch = String.fromCharCode(9115)}
		else if (ch == String.fromCharCode(231))
			{ch = String.fromCharCode(9116)}
		else if (ch == String.fromCharCode(232))
			{ch = String.fromCharCode(9117)}
		else if (ch == String.fromCharCode(233))
			{ch = String.fromCharCode(9121)}
		else if (ch == String.fromCharCode(234))
			{ch = String.fromCharCode(9122)}
		else if (ch == String.fromCharCode(235))
			{ch = String.fromCharCode(9123)}
		else if (ch == String.fromCharCode(236))
			{ch = String.fromCharCode(9127)}
		else if (ch == String.fromCharCode(237))
			{ch = String.fromCharCode(9128)}
		else if (ch == String.fromCharCode(238))
			{ch = String.fromCharCode(9129)}
		else if (ch == String.fromCharCode(239))
			{ch = String.fromCharCode(9130)}
		else if (ch == String.fromCharCode(241))
			{ch = String.fromCharCode(9002)}
		else if (ch == String.fromCharCode(243))
			{ch = String.fromCharCode(8992)}
		else if (ch == String.fromCharCode(245))
			{ch = String.fromCharCode(8993)}
		else if (ch == String.fromCharCode(244))
			{ch = String.fromCharCode(9134)}
		else if (ch == String.fromCharCode(246))
			{ch = String.fromCharCode(9118)}
		else if (ch == String.fromCharCode(247))
			{ch = String.fromCharCode(9119)}
		else if (ch == String.fromCharCode(248))
			{ch = String.fromCharCode(9120)}
		else if (ch == String.fromCharCode(249))
			{ch = String.fromCharCode(9124)}
		else if (ch == String.fromCharCode(250))
			{ch = String.fromCharCode(9125)}
		else if (ch == String.fromCharCode(251))
			{ch = String.fromCharCode(9126)}
		else if (ch == String.fromCharCode(252))
			{ch = String.fromCharCode(9131)}
		else if (ch == String.fromCharCode(253))
			{ch = String.fromCharCode(9132)}
		else if (ch == String.fromCharCode(254))
			{ch = String.fromCharCode(9133)}
		else if (ch == String.fromCharCode(189))
			{ch = String.fromCharCode(9168)}
		else if (ch == String.fromCharCode(224))
			{ch = String.fromCharCode(9674)}
		else if (ch == String.fromCharCode(167))
			{ch = String.fromCharCode(9827)}
		else if (ch == String.fromCharCode(168))
			{ch = String.fromCharCode(9830)}
		else if (ch == String.fromCharCode(169))
			{ch = String.fromCharCode(9829)}
		else if (ch == String.fromCharCode(170))
			{ch = String.fromCharCode(9824)}
		
		out += ch
	}
	
	
	return out
}