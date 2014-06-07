// ==UserScript==
// @id             setout
// @name           Setout
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Get all the BBCodes or HTML links for your Valenths with just one click!
// @version        1.6
// @include        http://www.valenth.com/adoptions*
// @include        http://valenth.com/adoptions*
// ==/UserScript==


CodeAllDiv = document.createElement("center");

// Code All text area
CArea = document.createElement("textarea");
CArea.id = "CArea";
CArea.style.height = "55px";
CArea.addEventListener('click',function(){this.focus(); this.select()},false);


// HTML button
CHButton = document.createElement("button");
CHButton.innerHTML = 'HTML';
CHButton.addEventListener('click', function(){GetCode("HTML")}, false);

// BBCode button
CBButton = document.createElement("button");
CBButton.innerHTML = 'BBCode';
CBButton.addEventListener("click", function(){GetCode("BBCode");}, false);


// Check All
CheckAll = document.createElement("button");
CheckAll.innerHTML = 'All';
CheckAll.addEventListener("click",SelectAll,false);

// Check None
CheckNone = document.createElement("button");
CheckNone.innerHTML = 'None';
CheckNone.addEventListener("click",SelectNone,false);

// Check All/None
CheckAN = document.createElement('span');
CheckAN.innerHTML = '<img style="margin-bottom: -2px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AwEFiAdDZObGwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAmUlEQVQoz8XSoQ5BcRzF8Q+7UwSCImiaV9AED+AFRIo3YNMF3TPIgs12p5hNNFGUBTNNsv1n172X4qTfzu98t/PbfvyoQjAPUMvIx9hCFJg9jFOgFjpJ4AO7BKCCNo5ovMxiRrUIM2zeF1ngBAvcvwGbqGP/qUqoMoY4oYt52g2hblhihStGeUE4o49S3gc44JKSrWKNqb/oCZfeFaBWPxOUAAAAAElFTkSuQmCC">: ';
CheckAN.appendChild(CheckAll);
CheckAN.appendChild(CheckNone);
CheckAN.style.cssText = 'padding-left: 7px;';


// Text Links?
TxtDiv = document.createElement('span');
TxtDiv.style.cssText = 'padding: 6px;';

TxtDesu = document.createElement("input");
TxtDesu.type = "checkbox";
TxtDesu.style.cssText = 'width: 10px !important;';
TxtDesu.checked = GM_getValue('TxtDesu',false);
TxtDesu.addEventListener('click', function (){ ImgDesu.checked = false; });

TxtSpec = document.createElement('input');
TxtSpec.style.width = '3%';
TxtSpec.value = GM_getValue('TxtPref','[X]');

TxtDiv.appendChild(TxtDesu);
TxtDiv.appendChild(document.createTextNode(' Link: '));
TxtDiv.appendChild(TxtSpec);


// Img Only?
ImgDiv = document.createElement('span');
ImgDiv.style.cssText = 'padding: 6px;';

ImgDesu = document.createElement("input");
ImgDesu.type = "checkbox";
ImgDesu.style.cssText = 'width: 10px !important;';
ImgDesu.checked = GM_getValue('ImgDesu',false);
ImgDesu.addEventListener('click', function (){ TxtDesu.checked = false; });

ImgDiv.appendChild(ImgDesu);
ImgDiv.appendChild(document.createTextNode(' No link'));


// Rig All With a Certain Food
GlobalRig = document.createElement("select");
GlobalRig.style.marginLeft = "4px";
GlobalRig.addEventListener('change', RigAll, false);

// Okay, I know this is sloppy, abominable cheating, but live with it. XD
// I think it's shorter than Ctrl+V'ing all those document.createElements.
GlobalRig.innerHTML = '<option value="Unrigged">Rig All: Unrigged</option><option value="Glowing+Serum">Glowing Serum (+10 Vital)</option><option value="Grilled+Jadefish">Grilled Jadefish (+6 Vital)</option><option value="Flaskberry">Flaskberry (+5 Vital)</option><option value="Sunstone+Pear">Sunstone Pear (+4 Vital)</option><option value="Succulent+Leaf">Succulent Leaf (+4 Vital)</option><option value="Ambrosia+Nectar">Ambrosia Nectar (+3 Vital)</option><option value="Stardust">Stardust (+2 Vital)</option><option value="Sundrop">Sundrop (+1 Vital)</option><option value="Amalgamator+Serum">Amalgamator Serum (+10 Natural)</option><option value="Roast+Goose">Roast Goose (+6 Natural)</option><option value="Hot+Yam">Hot Yam (+5 Natural)</option><option value="Faerwethr+Roast">Faerwethr Roast (+4 Natural)</option><option value="Crescentoise">Crescentoise (+4 Natural)</option><option value="Balance+Elixir">Balance Elixir (+3 Natural)</option><option value="Sparkling+Water">Sparkling Water (+2 Natural)</option><option value="Strawberry+Tart">Strawberry Tart (+1 Natural)</option><option value="Pulsing+Serum">Pulsing Serum (+10 Tainted)</option><option value="Mottled+Sausage">Mottled Sausage (+6 Tainted)</option><option value="Fried+Cocopod">Fried Cocopod (+5 Tainted)</option><option value="Stuffed+Sprite">Stuffed Sprite (+4 Tainted)</option><option value="Spinestalk">Spinestalk (+4 Tainted)</option><option value="Stolen+Soul">Stolen Soul (+3 Tainted)</option><option value="Suspicious+Green+Treat">Suspicious Green Treat (+3 Tainted)</option><option value="Tainted+Ichor">Tainted Ichor (+2 Tainted)</option><option value="Wyrm+Fruit">Wyrm Fruit (+1 Tainted)</option>';


// Shove the new elements into the page
CodeAllDiv.appendChild(document.createElement("br"));
CodeAllDiv.appendChild(CArea);
CodeAllDiv.appendChild(document.createElement("br"));
CodeAllDiv.appendChild(ImgDiv);
CodeAllDiv.appendChild(TxtDiv);
CodeAllDiv.appendChild(CHButton);
CodeAllDiv.appendChild(CBButton);
CodeAllDiv.appendChild(CheckAN);
CodeAllDiv.appendChild(GlobalRig);

centres = document.getElementsByTagName("center");
centres[2].parentNode.insertBefore(CodeAllDiv,centres[2].nextSibling);


// Find all the textareas on the page
AllCodes = document.getElementsByTagName("textarea");

// Add checkboxes to each adopt
AllConts = document.getElementsByClassName("adoptable");
Boxes = [""];
Selects = [""];
Hfours = [""];


// Make fancy checkboxes and dropdowns for exclusion and rigging
for (i = 0; i < AllConts.length; i++) {
	Boxes[i + 1] = document.createElement("input");
	Boxes[i + 1].type = "checkbox";
	Boxes[i + 1].checked = false;
	
	Selects[i + 1] = document.createElement("select");
	Selects[i + 1].style.cssText = "width: 91%;";
	Selects[i + 1].id = 'sel' + (i + 1) + '';
	Selects[i + 1].addEventListener('change',Rig,false);

	Selects[i + 1].innerHTML = GlobalRig.innerHTML.replace('Rig All: ','');
	
	Hfours[i + 1] = document.createElement("h4");
	Hfours[i + 1].innerHTML = 'Rigging';
	
	AllConts[i].appendChild(Hfours[i + 1]);
	AllConts[i].appendChild(Selects[i + 1]);
	Hfours[i + 1].parentNode.removeChild(Hfours[i + 1].previousSibling);
	Hfours[i + 1].parentNode.removeChild(Hfours[i + 1].previousSibling);
	Hfours[i + 1].parentNode.removeChild(Hfours[i + 1].previousSibling);
	AllConts[i].appendChild(document.createElement("br"));
	AllConts[i].appendChild(document.createElement("br"));
	AllConts[i].appendChild(Boxes[i + 1]);
	AllConts[i].appendChild(document.createElement("br"));
}


// This function makes the code boxes for each pet change when you change its rigging.
function Rig() {
	j = this.id.replace('sel','');
	
	if (this.value != 'Unrigged') {
		AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/info/,'feed');
		AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/\/([0-9]+)(\/[A-Z][A-Za-z\s\+]+)?(">)/, "/$1/"+this.value+"$3");
		
		AllCodes[j*2].value = AllCodes[j*2].value.replace(/info/,'feed');
		AllCodes[j*2].value = AllCodes[j*2].value.replace(/\/([0-9]+)(\/[A-Z][A-Za-z\s\+]+)?(\])/, "/$1/"+this.value+"$3");
	}
	
	else {
		AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/feed/,'info');
		AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/\/([A-Z][A-Za-z\s\+]+)/, '');
		
		AllCodes[j*2].value = AllCodes[j*2].value.replace(/feed/,'info');
		AllCodes[j*2].value = AllCodes[j*2].value.replace(/\/([A-Z][A-Za-z\s\+]+)/, '');
	}
}


// This function changes all the rigs at once.
function RigAll() {
	for (j in AllCodes) {
		if (j > 0) {	
			Selects[j].value = this.value;
			
			if (this.value != 'Unrigged') {
				AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/info/,'feed');
				AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/\/([0-9]+)(\/[A-Z][A-Za-z\s\+]+)?(">)/, "/$1/"+this.value+"$3");
				
				AllCodes[j*2].value = AllCodes[j*2].value.replace(/info/,'feed');
				AllCodes[j*2].value = AllCodes[j*2].value.replace(/\/([0-9]+)(\/[A-Z][A-Za-z\s\+]+)?(\])/, "/$1/"+this.value+"$3");
			}
			
			else {
				AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/feed/,'info');
				AllCodes[j*2-1].value = AllCodes[j*2-1].value.replace(/\/([A-Z][A-Za-z\s\+]+)/, '');
				
				AllCodes[j*2].value = AllCodes[j*2].value.replace(/feed/,'info');
				AllCodes[j*2].value = AllCodes[j*2].value.replace(/\/([A-Z][A-Za-z\s\+]+)/, '');
			}
		}
	}
}


// The wondrous Code All buttons' inner workings.
function GetCode(GetWhat) {
	CArea.value = '';
	CodeAllString = '';
	DaBox = '';
	
	for (p in Boxes) {
		if (p > 0 && Boxes[p].checked == true) {
			if (GetWhat == 'BBCode') {
				DaBox = p * 2;
			}
			
			else {
				DaBox = p * 2 - 1;
			}
			
			CodeAllString += AllCodes[DaBox].value;
		}
	}

	if (GetWhat != 'BBCode') {
		CodeAllString = CodeAllString.replace(/(Click Me!)|(<br>)/g,'');
	}

	if (TxtDesu.checked == true && TxtSpec.value != undefined && TxtSpec.value != '' && ImgDesu.checked == false) {
		CodeAllString = CodeAllString.replace(/(\[img\]http:\/\/(www.)?valenth.com\/lab\/[0-9]+.png\[\/img\])|(<img\ssrc="http:\/\/(www.)?valenth.com\/lab\/[0-9]+.png"\sborder="0">)/g, TxtSpec.value);
	}
	
	else if (ImgDesu.checked == true) {
		CodeAllString = CodeAllString.replace(/((<a\shref="|\[url=)http:\/\/valenth.com\/(info|feed)\/[0-9]+(\/[A-Za-z0-9\+]+)?(\]|">)|(<\/a>|\[\/url\]))/g, '');			
	}
	
	if (CodeAllString == '') {
		CodeAllString = 'Please select at least one pet.';
	}
	
	//CodeAllString = CodeAllString.replace(/feed\/([0-9]+)\/([A-Za-z\+]+)/g, 'feed\/$1\/$2?h=no');
	
	CArea.value = CodeAllString;
	GM_setValue('TxtDesu', TxtDesu.checked);
	GM_setValue('ImgDesu', ImgDesu.checked);
	
	if (TxtDesu.checked == true) {
		GM_setValue('TxtPref', TxtSpec.value);
	}
}


// Checkbox functions
function SelectAll() {
	for (i in Boxes) {
		if (i > 0) {
			Boxes[i].checked = true;
		}
	}
}

function SelectNone() {
	for (i in Boxes) {
		if (i > 0) {
			Boxes[i].checked = false;
		}
	}
}