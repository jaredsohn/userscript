// ==UserScript==
// @name           TL Category Icons
// @namespace      TL Category Icons
// @description    Add color to and/or change the category icons on TorrentLeech
// @version        1.1.0
// @include        http://www.torrentleech.org/torrents/browse*
// ==/UserScript==

var arCatColor=new Array();
var arCatPic=new Array();

// SETTINGS START
// arCatColor[CATEGORY_ID]="#COLOR";

// arCatColor[8]="#3AE130";         // Movies CAM
// arCatColor[9]="#029540";         // Movies TS/TC
// arCatColor[10]="#15063D";        // Movies R5/Screeners
// arCatColor[11]="#0D2EC0";        // Movies DVDRip/DVDScr
// arCatColor[14]="#47ADFE";        // Movies BDRip
// arCatColor[12]="#235B1F";        // Movies DVD-R
// arCatColor[13]="#89132E";        // Movies HD
// arCatColor[15]="#ACACAC";        // Movies Boxsets
// arCatColor[29]="#565656";        // Movies Documentaries

// arCatColor[26]="#6B0000";        // TV Episodes
// arCatColor[27]="#EAEAEA";        // TV Boxsets

arCatColor[17]="#114453";        // Games PC
arCatColor[18]="#114453";        // Games XBOX
arCatColor[19]="#114453";        // Games XBOX360
arCatColor[20]="#114453";        // Games PS2
arCatColor[21]="#114453";        // Games PS3
arCatColor[22]="#114453";        // Games PSP
arCatColor[28]="#114453";        // Games Wii
arCatColor[30]="#114453";        // Games Nintendo DS

arCatColor[16]="#000000";        // Music Videos
arCatColor[31]="#373737";        // Music Audio

arCatColor[23]="#0C2F3B";        // Apps PC-ISO
arCatColor[24]="#0C3B38";        // Apps Mac
arCatColor[25]="#0C1F3B";        // Apps PDA

// The baseurl where your icons are located
var iconUrlBase = "http://dl.dropbox.com/u/11442202/TLIcons/"

// arCatPic[CATEGORY_ID]="ICON_URL";
arCatPic[11]=iconUrlBase+"movies_.png";          // Movies DVDRip/DVDScr
arCatPic[8]=iconUrlBase+"movies_cam.png";        // Movies CAM
arCatPic[9]=iconUrlBase+"movies_tstc.png";       // Movies TS/TC
arCatPic[10]=iconUrlBase+"movies_r5.png";        // Movies R5/Screeners
arCatPic[11]=iconUrlBase+"movies_dvdrip.png";    // Movies DVDRip/DVDScr
arCatPic[14]=iconUrlBase+"movies_bdrip.png";     // Movies BDRip
arCatPic[12]=iconUrlBase+"movies_dvdr.png";      // Movies DVD-R
arCatPic[13]=iconUrlBase+"movies_hd.png";        // Movies HD
arCatPic[15]=iconUrlBase+"movies_boxset.png";    // Movies Boxsets
arCatPic[29]=iconUrlBase+"movies_docu.png";      // Movies Documentaries

arCatPic[17]=iconUrlBase+"games_pc.png";         // Games PC
arCatPic[18]=iconUrlBase+"games_xbox.png";       // Games XBOX
arCatPic[19]=iconUrlBase+"games_xbox360.png";    // Games XBOX360
arCatPic[20]=iconUrlBase+"games_ps2.png";        // Games PS2
arCatPic[21]=iconUrlBase+"games_ps3.png";        // Games PS3
arCatPic[22]=iconUrlBase+"games_psp.png";        // Games PSP
arCatPic[28]=iconUrlBase+"games_wii.png";        // Games Wii
arCatPic[30]=iconUrlBase+"games_nds.png";        // Games Nintendo DS

arCatPic[23]=iconUrlBase+"apps_pc.png";          // Apps PC-ISO
arCatPic[24]=iconUrlBase+"apps_mac.png";         // Apps Mac
arCatPic[25]=iconUrlBase+"apps_pda.png";         // Apps PDA

// Enable release specific colors/icons
var EnableRegexReleases = true;
var reReleases = new Array(
	// new Array("REGEX_STRING",                                                    "#COLOR (optional)", "ICON_URL (optional)"),
	new Array("^call.of.duty.*black.ops",                                           "red",               ""),
	new Array("^diablo.(3|iii)",                                                    "red",               ""),
	new Array("-vision$",                                                           "#401a5e",           iconUrlBase+"vision.png"),
	new Array("(r5|dvdscr|scr).line",                                               "",                  iconUrlBase+"movies_r5_line.png"),
	new Array("([0-9]{1,2}x|s[0-9]{2}).*(dvd|br)rip",                               "",                  iconUrlBase+"tv_dvd.png"),
	new Array("([0-9]{1,2}x|s[0-9]{2}|[0-9]{4}.[0-9]{2}.[0-9]{2}).*hdtv.*x264",     "",                  iconUrlBase+"tv_720.png"),
	new Array("([0-9]{1,2}x|s[0-9]{2}|[0-9]{4}.[0-9]{2}.[0-9]{2}).*hdtv.*xvid",     "",                  iconUrlBase+"tv_hdtv.png")
);

// SETTINGS END

var reCatMatch = new RegExp('\/categories\/([0-9]+)"');
var strTDs = document.getElementsByTagName('td');
for (i = 0; i < strTDs.length; ++i) {
	if(strTDs[i].className == "category") {
		var strCat = reCatMatch.exec(strTDs[i].innerHTML)[1];
		if (strCat) {
			catColor = "";
			catPic = "";
			catColor = arCatColor[strCat];
			catPic = arCatPic[strCat];
			
			catPicSrc = strTDs[i].getElementsByTagName("img")[0];
			catPicSrc.style.paddingTop="2px";

			if(EnableRegexReleases) {
				RelName = strTDs[i+1].getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML;
				for (x = 0; x < reReleases.length; x++) {
					reRelMatch = new RegExp(reReleases[x][0], "i");
					if (reRelMatch.exec(RelName)) {
						if(reReleases[x][1])
							catColor=reReleases[x][1];
						if(reReleases[x][2])
							catPic=reReleases[x][2];
						break;
					}
				}
			}
			if(catPic)
				if(catPic.length > 1)
					catPicSrc.src=catPic;
			if(catColor)
				strTDs[i].innerHTML = "<div style='background-color:" + catColor + ";-moz-border-radius:6px;'>" + strTDs[i].innerHTML + "</div>";
		}
	}
}
