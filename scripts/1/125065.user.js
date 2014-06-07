// ==UserScript==
// @name           TMX Meme List
// @namespace      http://userscripts.org/users/434564
// @description    Adds a list of small memes right under the smiley list
// @include        http://*.tm-exchange.com*
// @version        1.4
// @icon           http://nsa21.casimages.com/img/2012/02/06/120206111635904771.jpg
// ==/UserScript==

var memeList = [
	["http://goo.gl/nPYSd", "Troll Face"],
	["http://goo.gl/x28wk", "Are You Fucking Kidding Me?"],
	["http://goo.gl/ynXTv", "FUUUUU Rage Guy"],
	["http://goo.gl/wCwvO", "Dafuq did I just read"],
	["http://goo.gl/782AO", "Mother of God"],
	["http://goo.gl/yffn3", "Y U NO Guy"],
	["http://goo.gl/VUeqq", "Poker Face"],
	["http://goo.gl/0G7Qj", "Poker Face"],
	["http://goo.gl/oaAvc", "Cereal Guy"],
	["http://goo.gl/CP1M5", "ROFL arms"],
	["http://goo.gl/XnnzB", "Yes, yes you can."],
	["http://goo.gl/P8bHo", "FUCK YEA."],
	["http://goo.gl/UDDWn", "Okay Guy"],
	["http://goo.gl/bTavy", "Milk face"],
	["http://goo.gl/fo1xr", "Oh stop it, you"],
	["http://goo.gl/YJgs5", "Puking Rainbows"],
	["http://goo.gl/fowwn", "Me Gusta"],
	["http://goo.gl/ijCkk", "LOL Guy"],
	["http://goo.gl/OhEKO", "I see what you did there"],
	["http://goo.gl/79tjJ", "Sweet Jesus"],
	["http://goo.gl/hwX8B", "So hardcore!"],
	["http://goo.gl/Du0za", "True story"],
	["http://goo.gl/fKaRg", "Like a sir"],
	["http://goo.gl/jB6Hd", "Genius"],
	["http://goo.gl/FU4W9", "Flippin' tables"],
	["http://goo.gl/2lCvx", "NO."],
	["http://goo.gl/Ja7Tf", "Herp Derp"],
	["http://goo.gl/YNfAO", "Challenge accepted"],
	["http://goo.gl/DdsT0", "Bitch please"],
	["http://goo.gl/4sDtw", "Aww Yea"],
	["http://goo.gl/ZMSK2", "Seriously?"],
	["http://goo.gl/kKdvE", "My brain is full of fuck"],
	["http://goo.gl/YMrxf", "You don't say?"],
	["http://goo.gl/mX3qK", "If you know what I mean"],
	["http://goo.gl/GGgGc", "Not bad"],
	["http://goo.gl/c6Vtk", "Watch out guys, we’re dealing with a badass over here"],
	["http://goo.gl/SCFjk", "Big Grin"],
	["http://goo.gl/3g9at", "You, what you you done."],
	["http://goo.gl/4tB4C", "Oh god, why"],
	["http://goo.gl/LgflB", "Shadowlurker"],
	["http://goo.gl/hm8JV", "What's all this racket about?"],
	["http://goo.gl/bEjcE", "Oh Crap Face"],
	["http://goo.gl/WwS79", "X all the Y"],
	["http://goo.gl/8NTPF", "I lied"],
	["http://goo.gl/AhVDM", "Shut up and take my money"],
	["http://goo.gl/YzTUW", "One does not simply"],
	["http://goo.gl/UsdHV", "Facepalm"],
	["http://goo.gl/BbVUw", "Condescending Wonka"],
	["http://goo.gl/jySHf", "Impossibru!!"],
	["http://goo.gl/2ocZE", "Forever Alone"]
];

var styles = document.createElement('style');
var rules = document.createTextNode('\
.MemeHolder {\n\
  padding:0;\n\
  margin:0;\n\
  position:relative;\n\
}\n\
\n\
.MemeHolder .Meme {\n\
  border-radius: 5px 5px 5px 5px;\n\
  box-shadow: 0 0 4px #888888;\n\
  opacity:1;\n\
  display:inline-block;\n\
  margin:0 8px 8px 0;\n\
}\n\
\n\
.MemeHolder .last {\n\
  position:absolute;\n\
  right:0px;\n\
  bottom:0px\n\
}\n\
\n\
.Meme a {\n\
  display:block;\n\
}\n\
\n\
.Meme img {\n\
  border-radius:5px 5px 5px 5px;\n\
  max-height:40px;\n\
}\n\
');

styles.type = 'text/css';
if (styles.styleSheet){
	styles.styleSheet.cssText = rules.nodeValue; 
} else {
	styles.appendChild(rules);
	document.getElementById("ctl03_Windowrow6").appendChild(styles);
}




function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastchild == targetElement) {
	parent.appendChild(newElement);
	} else {
	parent.insertBefore(newElement, targetElement.nextSibling);
	}
}



function insertMemes() {
	if (document.getElementsByClassName("SmileHolder")[0]) {
		var memeHolder = document.createElement("ul");
		memeHolder.setAttribute("class", "MemeHolder");
		
		for (i=0; i < memeList.length; i++) {
			if (i==39) {
				if (document.getElementById("ctl03_Windowrow6").scrollWidth < 750) {
					var lineBreak = document.createElement("br");
					memeHolder.appendChild(lineBreak);
				}
			}
		
			var element = document.createElement("img");
			element.setAttribute("src", memeList[i][0]);
			element.setAttribute("title", memeList[i][1]);
			
			var elementLink = document.createElement("a");
			elementLink.setAttribute("href", "#");
			elementLink.setAttribute("onclick", "initInsertions(); insert_text('[img]" + memeList[i][0] + "[/img]', true, false);")
			
			var elementContainer = document.createElement("li");
			if (i == (memeList.length-1)) {
				elementContainer.setAttribute("class", "Meme last");
			} else {
				elementContainer.setAttribute("class", "Meme");
			}
			elementLink.appendChild(element);
			elementContainer.appendChild(elementLink);			
			memeHolder.appendChild(elementContainer);
		}
		insertAfter(memeHolder, document.getElementsByClassName("SmileHolder")[0]);
	}	
}

insertMemes();


// Script Update Checker by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 125065;

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 60000 <= (new Date().getTime()))) // Checks every minute
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}