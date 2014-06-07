// ==UserScript==
	// @name decode smileys	,get the real text.	
	
	// @description convert graphical smilies to text
	// @include		*
	// ==/UserScript==

	var arSmilies = [
		":)", ":-)", ":-(", ":(", ";-)", ";)", ":-D", ":D", ":-/",
		":/", ":X", ":-X", ":\">", ":P", ":-P", ":O", ":-O", "X-(",
		"X(", ":->", ":>", "B-)", "B)", ">:)", ":((", ":(((", ":-((",
		":))", ":-))", ":-|", ":|", "O:-)", "O:)", ":-B", ":B", "=;",
		"I)", "I-)", "|-)", "|)", ":-&", ":&", ":-$", ":$", "[-(", ":O)",
		":@)", "3:-O", ":(|)", "@};-", "**==", "(~~)", "*-:)", "8-X",
		"8X", "=:)", "<):)", ";;)", ":*", ":-*", ":S", ":-S", "/:)",
		"/:-)", "8-|", "8|", "8-}", "8}", "(:|", "=P~", ":-?", ":?",
		"#-O", "#O", "=D>", "~:>", "%%-", "~O)", ":-L", ":L", "[-O<",
		"[O<", "@-)", "@)", "$-)", "$)", ">-)", ":-\"", ":^O", "B-(",
		"B(", ":)>-", "[-X", "[X", "\\:D/", ">:D<", "(%)", "=((", "#:-S",
		"#:S", "=))", "L-)", "L)", "<:-P", "<:P", ":-SS", ":SS", ":-W",
		":W", ":-<", ":<", ">:P", ">:-P", ">:/", ";))", ":-@", "^:)^",
		":-J", "(*)", ":GRIN:", ":SMILE:", ":SAD:", ":EEK:",
		":SHOCK:", ":???:", "8)", "8-)", ":COOL:", ":LOL:", ":MAD:",
		":RAZZ:", ":OOPS:", ":CRY:", ":EVIL:", ":TWISTED:", ":ROLL:",
		":WINK:", ":!:", ":?:", ":IDEA:", ":ARROW:", ":NEUTRAL:",
		":MRGREEN:"];

		var snapImages = document.evaluate("//img[@alt]", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = snapImages.snapshotLength - 1; i >= 0; i--) {
			var elmImage = snapImages.snapshotItem(i);
			var sAltText = elmImage.alt.toUpperCase();
			for (var j = arSmilies.length - 1; j >= 0; j--) {
				if (sAltText == arSmilies[j]) {
				var elmReplacementText = document.createTextNode(sAltText);
				elmImage.parentNode.replaceChild(elmReplacementText, elmImage);
				}
			}
		}
