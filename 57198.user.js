// ==UserScript==
// @name           What.CD :: Add Artist Helper
// @namespace      idkwhattoputhere
// @include        http*://*what.cd/torrents.php?id=*
// ==/UserScript==

//
// PLEASE VEIW THIS SCRIPT WITHOUT WORDWRAP TURNED ON!!
//

// Do Not Edit
var modeArray = [];
////////////////////////////////////////////
// Defualt Modes: (DO NOT EDIT)
modeArray[0] = ["##. Artist - Track Name", ". ", " - "];
modeArray[1] = ["##. Track Name - Artist", " - ", ". "];
////////////////////////////////////////////
// How to add a mode:
// Lets use the first mode as an example:
// modeArray[#] = ["##. Artist - Track Name", ". ", " - "]
// "##. Artist - Track Name" is the name of the mode. This will come up on the radio button.
// ". " is the first split. This takes "##. Artist - Track Name" and splits it into "##" and "Artist - Track Name"
// " - " is the second split. This takes "Artist - Track Name" and splits it into "Artist" and "Track Name"
// The array is then "##" ,  "Artist" , and "Track Name". "##" and "Track Name" do not get used while "Aritst" gets loaded into the artist text boxes above.
// Uncomment these sample modes to use them: (If you run out of sample modes, create more, just remember to incrase the moddArray[#] by one)
//modeArray[2] = ["Name", "Split1", "Split2"];
//modeArray[3] = ["Name", "Split1", "Split2"];
////////////////////////////////////////////
//      DO NOT EDIT BEOND THIS POINT      //
////////////////////////////////////////////

// Find correct div for placement:
var addField	= document.getElementsByClassName("sidebar")[0]
						  .getElementsByClassName("box_addartists")[0]
			   			  .getElementsByTagName("div")[1];

var hform = document.createElement("form");   // Create form
hform.method = "post";
hform.name = "nform";
var hbox  = document.createElement("textarea");  // Create textbox
hbox.name = "hbox";
hbox.cols = "30";
hbox.rows = "8";
hbox.value = "Select a mode below";
hbox.addEventListener('click', hclear, false);

// Create Radio Buttons:
var rbutton = [];
for (var i=0; i<modeArray.length; i++)
{
	rbutton[i] = document.createElement("label");
	rbutton[i].innerHTML = '<label><input type="radio" name="rgroup" value="radio" id="rgroup_'+i+'" />   '+modeArray[i][0]+'<br /></label>';
	var itempholder = i;
}
rbutton[itempholder+1] = document.createElement("label");
rbutton[itempholder+1].innerHTML = '<label><input type="radio" name="rgroup" value="radio" id="rgroup_'+(itempholder+1)+'" />   Artist1,Artist2,Artist3<br /></label>';
rbutton[itempholder+2] = document.createElement("label");
rbutton[itempholder+2].innerHTML = '<label><input type="radio" name="rgroup" value="radio" id="rgroup_'+(itempholder+2)+'" />   Just Create Boxes<br /></label>';
////////////////////////////////////////////
var hbutton = document.createElement("a");
hbutton.innerHTML = "&nbsp\;&nbsp\;Fill Boxes";
hbutton.addEventListener('click', hrun, false);
hbutton.style.cursor = "pointer";

hform.appendChild(hbox);
// Add created Radio Buttons:
var fbr = document.createElement("br");
for (var i=0; i<rbutton.length;  i++)
{
	hform.appendChild(rbutton[i]);
	hform.appendChild(fbr);
}
////////////////////////////////////////////
hform.appendChild(hbutton);
addField.appendChild(hform);

function hrun() {
	var modeValue = document.getElementsByClassName("sidebar")[0]
						    .getElementsByClassName("box_addartists")[0]
						    .getElementsByTagName("div")[1]
						    .getElementsByTagName("form")[1]
						    .getElementsByTagName("textarea")[0].value;			
	
	var hradioselect = document.getElementsByClassName("sidebar")[0].getElementsByClassName("box_addartists")[0].getElementsByTagName("div")[1].getElementsByTagName("form")[1];
	var rnumber = 1337;
	for (var i=0;i<modeArray.length;i++)
	{
		if (hradioselect.getElementsByTagName("input")[i].checked)
		{
			rnumber = i;
		}
		var iplaceholder = i;
	}
	var damode = 1;
	if (rnumber == 1337)
	{
		if (hradioselect.getElementsByTagName("input")[iplaceholder+1].checked)
		{
			modeArray[0] = ["Seperate by ,", ","];
			rnumber = 0;
			damode = 0;
		}
		if (hradioselect.getElementsByTagName("input")[iplaceholder+2].checked)
		{
			rnumber = 13370;
		}
	}
	if (rnumber == 13370)
	{
		var createBoxNum = document.getElementsByClassName("sidebar")[0]
								   .getElementsByClassName("box_addartists")[0]
								   .getElementsByTagName("div")[1]
							       .getElementsByTagName("form")[1]
								   .getElementsByTagName("textarea")[0].value;
		for (var i=0;i<createBoxNum-1;i++)
		{
			unsafeWindow.AddArtistField();
		}
	}
	else
	{
		var artistRaw = modeValue.split(modeArray[rnumber][1]);
		var artistUnsplit = [];
		var tempnumber;
		for (var i=0;i<artistRaw.length-damode;i++)
		{
			artistUnsplit[i] = artistRaw[i+damode].split(modeArray[rnumber][2]);
		}
		var artistList = [];
		for (var i=0;i<artistUnsplit.length;i++)
		{
			artistList[i] = artistUnsplit[i][0].split("\n")[0];
		}

		for (var i=0;i<=artistList.length-1;i++)
		{
		unsafeWindow.AddArtistField();
			document.getElementsByClassName("sidebar")[0]
					.getElementsByClassName("box_addartists")[0]
					.getElementsByTagName("div")[1]
					.getElementsByTagName("form")[0]
					.getElementsByTagName("input")[i+2].value = artistList[i];
		}
	}
}

function hclear() {
	document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box_addartists")[0]
										.getElementsByTagName("div")[1]
										.getElementsByTagName("form")[1]
										.getElementsByTagName("textarea")[0].value = "";
}