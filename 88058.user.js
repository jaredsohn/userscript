// ==UserScript==
// @name			UDBounty
// @namespace		UDBounty
// @description		Colorize player names readed from an UDTool list type source.
// @include			http://urbandead.com/*
// @include			http://www.urbandead.com/*
// @exclude			http://urbandead.com/map.cgi?logout
// @exclude			http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/*
* Urban Dead Bounty v1.2
* Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
*
* Greasemonkey script for the Urban Dead browser game.
*
* The script colorize player names readed from an UDTool list type file.
*
* You can specify the location of the file under the browser menu
* Tools -> Greasemonkey -> User Script Commands... -> UDBounty|Set list source
*
* Default source is the Rogue Gallery udtool file.
* The script rereading the source every day.
*
* Last modified: 2013-02-06
*
* Changes
* v1.2      - from Greasemonkey 1.1 the GM_xmlhttpRequest object is read only
* v1.1      - shows group name in the character comment
*           - new menu option: View info.
*
* v1.0      - first version
*
*/

var currentversion="1.2"
var BountyURL = "http://rg.urbandead.net/udtool"	// default source

// ---------- version differences
function New_Version()
{
	if (GM_getValue("Version") != currentversion) {	
	
		//1.0 -> 1.1 set new variable
		if (GM_getValue("Version") == null) {
			if (GM_getValue("UDTool_List") != null) {
				GM_setValue("Last_Loaded_Successfully",GM_getValue("Last_Loaded"))
			} else {
				GM_setValue("Last_Loaded_Successfully","never")
			}
		}
		
		GM_setValue("Version",currentversion)
		GM_deleteValue("Last_Loaded") 				// force reload
	}
}

// ---------- greasemonkey menu
function Input_Source(){
	var New_Source=prompt("Please enter the path of the UDTool list type file:",GM_getValue("Source",BountyURL))
	if (New_Source !=null) {
		GM_setValue("Source",New_Source)
		GM_deleteValue("Last_Loaded")
		Load_UDTool_List
	}
}

function View_Info(){
	alert("UDBounty version: "+currentversion+"\n\r"+
			"Source: "+GM_getValue("Source")+"\n\r"+
			"Last Loaded: "+GM_getValue("Last_Loaded_Successfully"))	
}

// ---------- loading list from source
function Load_UDTool_List() {
	if (GM_getValue("Source") == null) GM_setValue("Source",BountyURL)

	var currentTime = new Date()
	var today_date = currentTime.getMonth() +1 + "/" + currentTime.getDate() + "/" + currentTime.getFullYear()

	// reload list from source if older than 1 day
	if (GM_getValue("Last_Loaded") != today_date)
	{
		GM_setValue("Last_Loaded",today_date)
		GM_xmlhttpRequest({
			method: "GET",
			url: GM_getValue("Source",BountyURL),
			onload: function(UDTool_Listfile) {

      	      	if((UDTool_Listfile.readyState==4) && (UDTool_Listfile.status==200)){						// page downloaded and ok

					_responseText=UDTool_Listfile.responseText
					_responseText=_responseText.replace(/\r/g, "")		// simple end of line

					// search for group colors lines, and replace characters' group with the color
					bountylist=_responseText
					bol=_responseText.indexOf("#"); bol++
					eol=_responseText.indexOf("\n",bol+1)
					oldbol=-1
					while (bol>=oldbol)
					{
						var groupcolor=_responseText.substring(bol, eol).split(",",2)

						// insert group color before the groupname
						bountylist=bountylist.replace(new RegExp(","+groupcolor[1]+",",'g'), ","+groupcolor[0]+","+groupcolor[1]+": ")
						bountylist=bountylist.replace(new RegExp(","+groupcolor[1]+"\n",'g'), ","+groupcolor[0]+","+groupcolor[1]+"\n")

						oldbol=bol
						bol=_responseText.indexOf("\n#",eol); bol++
						eol=_responseText.indexOf("\n",bol+1)
					}

					// udtool file loaded into a persistent variable
					GM_setValue("UDTool_List",bountylist)
					GM_setValue("Last_Loaded_Successfully",today_date)

				} else {
					if(GM_getValue("UDTool_List") == null ){
						alert("UDBounty was unable to load the list from "+GM_getValue("Source",BountyURL)+".\n\rThe UDBounty list is empty.")
					} else {
						alert("UDBounty was unable to load the list from "+GM_getValue("Source",BountyURL)+".\n\rUsing the last successfully loaded UDBounty list.")
					}
				}
			}
		})
	}	
}

// ---------- colorize names, add tool-tip comments
function ColorNames() {
	if (GM_getValue("UDTool_List") == null) exit										// no bounty list, exit

		// get string contains survivor names - map|dna|contacts|profile
		var harmanzonsite=document.evaluate('//li/a|//span[contains(@class, "ptt")]|//tr/td/a[contains(@class, "con")]|//p[@class="gamemessage"]//a|//div[@class="gt"]/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

	for (var i = 0; i < harmanzonsite.snapshotLength; i++) {
		var harman = harmanzonsite.snapshotItem(i)
		var onlist = GM_getValue("UDTool_List").search("\n"+harman.textContent.replace(/\u00a0/g," ")+",")		// replace whitespaces
		if (onlist >-1) {
			eol=GM_getValue("UDTool_List").indexOf("\n", onlist+1)
			bountyinfo=GM_getValue("UDTool_List").substring(onlist, eol).split(",",3)
			// colorize name
			harman.style.color=bountyinfo[1]
			// make UDTool_List character comment into a title
			if (!!bountyinfo[2]) {
				harman.title=bountyinfo[2]
			}
		}
	}
}

// ---------- main
GM_registerMenuCommand("UDBounty|View info", View_Info)
GM_registerMenuCommand("UDBounty|Set list source", Input_Source)

New_Version();
Load_UDTool_List()
ColorNames()
