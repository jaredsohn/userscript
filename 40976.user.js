// ==UserScript==
// @name           ek$i sözlük spoiler gizleme aparati
// @namespace      http://userscripts.org/users/62169
// @description    entry'lerdeki spoiler içine yazilmis yazilari gizler.
// @include        http://sozluk.sourtimes.org/show.asp?*
// @include        http://www.eksisozluk.com/show.asp?*
// ==/UserScript==

	entryDiv = document.getElementById("el");
	entries = entryDiv.getElementsByTagName("li");
	
	for (i = 0; i < entries.length; i++) {
		entry = entries[i].innerHTML;
		spoilerSplitter = '--- spoiler ---';
		spoilerSplitterRegEx = /(---? ? ?([^-]*spoiler[^-]*) ? ?-?--)/;
		hiddenTextStart = "<span> <a class=\"gb\" style=\"font-weight: bold;\" href=\"#\" onclick=\"this.parentNode.nextSibling.style.display = 'inline'; this.parentNode.style.display = 'none'; return false;\">(göster)</a></span><span style=\"display: none;\"> <a class=\"gb\" style=\"font-weight: bold;\" href=\"#\" onclick=\"this.parentNode.previousSibling.style.display = 'inline'; this.parentNode.style.display = 'none'; return false;\">(gizle)</a>";
		hiddenTextEnd = " <a class=\"gb\" style=\"font-weight: bold;\" href=\"#\" onclick=\"this.parentNode.previousSibling.style.display = 'inline'; this.parentNode.style.display = 'none'; return false;\">(gizle)</a></span>";
		
		entryParts = entry.split(spoilerSplitterRegEx);
		newEntry = "";
		tagLevel = 0;
		textInSpoiler = "";
		spoilerHeader = "";
		skipNextSpoilerTag = false;
		
		for (j = 0; j < entryParts.length; j++) {
			if (skipNextSpoilerTag) {
				skipNextSpoilerTag = false;
				//GM_log('skipping tag');
				continue;
			}
			if (entryParts[j].match(spoilerSplitterRegEx)) {
				if (tagLevel == 0) {
					// tag acma
					textInSpoiler = "";
					tagLevel = 1;
					spoilerHeader = entryParts[j+1];
					skipNextSpoilerTag = true;
					//GM_log('opening tag: ' + entryParts[j]);
				}
				else {
					// tag kapama
					if (textInSpoiler.replace(/(<([^>]+)>)/ig,"") != "") {
						// icerik bos degil
						tagLevel -= 1;
						//GM_log('level - 1: ' + textInSpoiler);
						skipNextSpoilerTag = true;
						if (tagLevel == 0) {
							//GM_log('closing tag');
							thisSpoilerSplitter = spoilerSplitter.replace(/spoiler/gi, spoilerHeader);
							newEntry += thisSpoilerSplitter + hiddenTextStart + textInSpoiler + thisSpoilerSplitter + hiddenTextEnd;
							textInSpoiler = "";
						}
					}
					else {
						// icerik bos, muhtemelen birden fazla spoiler tag'i arka arkaya gelmis
						tagLevel += 1;
						skipNextSpoilerTag = true;
						//GM_log('level + 1');
					}
				}
			}
			else {
				// icerik
				if (tagLevel > 0) {
					// tag icindeyiz
					//GM_log('adding text: ' + entryParts[j]);
					textInSpoiler += entryParts[j];
				}
				else {
					// tag icinde degiliz, normal icerik
					newEntry += entryParts[j];
				}
			}
		}
		
		entries[i].innerHTML = newEntry;
		
	}