// ==UserScript==
// @name Clan Roster Processing
// @description Designed for The Jedi Council Clan, this script automatically fills in the title and changes the name of new "Normal Members". It also checks the boot checkbox for inactive users below a certain rank.
// @match http://www.kingdomofloathing.com/clan_members.php*
// @include *127.0.0.1:*kingdomofloathing.com/clan_members.php*
// ==/UserScript==

AllNodes = document.getElementsByTagName('*');

function check_boot_boxes()
{
    maxBoot = 19;
    boot_button = document.getElementById("boot_butt");
    boot_count = 0;

    for (i = 0; i < AllNodes.length; i++) {
	if(AllNodes[i].color=="gray") {
	    doIt = false; //Only check the boot box
	    for(j=i; AllNodes[j].type!="hidden"; j++) 
		if (typeof AllNodes[j].text!='undefined' 
		    && AllNodes[j].text.match(/(°[\d]+)/) 
		    && AllNodes[j].selected == true) {
			cur_deg = AllNodes[j].text.match(/[\d]+/)[0];
			if (cur_deg <= maxBoot) {doIt = true;}
		} else if(AllNodes[j].type=="checkbox" && doIt) {
			AllNodes[j].checked = true;
			boot_count = boot_count + 1;
		}
	}
    }
    boot_button.value = "Check Inactive Boot Checkboxes (" + boot_count + ")";
};

function handle_padawans()
{
    pad_button = document.getElementById("pad_butt");
    pad_count = 0;

    for (i = 0; i < AllNodes.length; i++) {
	if (AllNodes[i].value=="0" && AllNodes[i].selected) {
	    for(j=i; AllNodes[j].type!="hidden"; j++) {
		if(AllNodes[j].type=="text") {
		    AllNodes[j].value="Padawan";
		} else if (AllNodes[j].text=="Padawan (°10)") {
		    AllNodes[j].selected = true;
		    pad_count = pad_count + 1;
		}
	    }
	}
    }
    pad_button.value = "Handle New Members (" + pad_count + ")";
};

for (i = 0; i < AllNodes.length; i++) //inserts buttons next to Modify Members.
{
    if (AllNodes[i].value=="Modify Members") {
	boot_butt = document.createElement("input");
	//button for checking inactives.
	boot_butt.type = "button";
	boot_butt.value = "Check Inactive Boot Checkboxes";
	boot_butt.id = "boot_butt";
	boot_butt.addEventListener("click", 
	    function temp() {check_boot_boxes()}, 
	    false);

	pad_butt = document.createElement("input");
	//button for checking inactives.
	pad_butt.type = "button";
	pad_butt.value = "Handle New Members";
	pad_butt.id = "pad_butt";
	pad_butt.addEventListener("click", function temp2() {handle_padawans()}, false);

	AllNodes[i-1].appendChild(boot_butt);
	AllNodes[i-1].appendChild(pad_butt);
	//child of Modify Members button.
    }
};
