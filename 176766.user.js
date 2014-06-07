// ==UserScript==
// @name          Multiply
// @namespace     http://mrsimy0.net/Glitch/CloneIt.js
// @description   Multiply
// @include       http://mrsimy0.net/Glitch/CloneIt.js
// @version       1
// @author        Simony
// ==/UserScript==

	//Localstorage
	try {
		if (localStorage.getItem) {
			storage = localStorage;
		}
		else if (window.localStorage.getItem) {
			storage = window.localStorage;
		}
	}catch(failsafe) {
		//Fall safe for unkown browsers maybe save to cookie store in......
	}
	
	var CloneGiftId;
	var CloneGiftCat;
	var CloneSNDAMT;
	var CloneRAMT;
	var CloneARS;
	
	var CloneCollectionList = new Array(
		{name: "-- New York Collections --", value: 0},
		{name: "-- Diamond Flush Collection --", value: 0},
		{name: "Eight of Diamonds", value: 1036},
		{name: "Nine of Diamonds", value: 1037},
		{name: "Ten of Diamonds", value: 1038},
		{name: "Jack of Diamonds", value: 1039},
		{name: "Queen of Diamonds", value: 1040},
		{name: "King of Diamonds", value: 1041},
		{name: "Ace of Diamonds", value: 1042},
		{name: "-- Heart Flush Collection --", value: 0},
		{name: "Eight of Hearts", value: 1043},
		{name: "Nine of Hearts", value: 1044},
		{name: "Ten of Hearts", value: 1045},
		{name: "Jack of Hearts", value: 1046},
		{name: "Queen of Hearts", value: 1047},
		{name: "King of Hearts", value: 1048},
		{name: "Ace of Hearts", value: 1049},
		{name: "-- Sculptures Collection --", value: 0},
		{name: "Rat Sculpture", value: 1022},
		{name: "Sheep Sculpture", value: 1023},
		{name: "Rooster Sculpture", value: 1024},
		{name: "Monkey Sculpture", value: 1025},
		{name: "Tiger Sculpture", value: 1026},
		{name: "Snake Sculpture", value: 1027},
		{name: "Dragon Sculpture", value: 1028},
		{name: "-- Poker Chips Collection --", value: 0},
		{name: "White Poker Chip", value: 1029},
		{name: "Brown Poker Chip", value: 1030},
		{name: "Red Poker Chip", value: 1031},
		{name: "Blue Poker Chip", value: 1032},
		{name: "Green Poker Chip", value: 1033},
		{name: "Purple Poker Chip", value: 1034},
		{name: "Gold Poker Chip", value: 1035},
		{name: "-- Club Flush Collection --", value: 0},
		{name: "Eight of Clubs", value: 1050},
		{name: "Nine of Clubs", value: 1051},
		{name: "Ten of Clubs", value: 1052},
		{name: "Jack of Clubs", value: 1053},
		{name: "Queen of Clubs", value: 1054},
		{name: "King of Clubs", value: 1055},
		{name: "Ace of Clubs", value: 1056},
		{name: "-- Boxing Collection --", value: 0},		
		{name: "Hand Tape", value: 1085},
		{name: "Gloves", value: 1086},
		{name: "Headgear", value: 1087},		
		{name: "Boxing Trunks", value: 1088},
		{name: "Speed Bag", value: 1089},
		{name: "Heavy Bag", value: 1090},
		{name: "Boxing Ring", value: 1091},
		{name: "-- Cigars Collection --", value: 0},
		{name: "Ebony Cigar", value: 1001},
		{name: "Sky Cigar", value: 1002},
		{name: "Rose Cigar", value: 1003},
		{name: "Ivory Cigar", value: 1004},
		{name: "Turquoise Cigar", value: 1005},
		{name: "Gold Cigar", value: 1006},
		{name: "Royal Cigar", value: 1007},
		{name: "-- Spade Flush Collection --", value: 0},
		{name: "Eight of Spades", value: 1057},
		{name: "Nine of Spades", value: 1058},
		{name: "Ten of Spades", value: 1059},
		{name: "Jack of Spades", value: 1060},
		{name: "Queen of Spades", value: 1061},
		{name: "King of Spades", value: 1062},
		{name: "Ace of Spades", value: 1063},
		{name: "-- Billiards Collection --", value: 0},		
		{name: "One Ball", value: 1092},
		{name: "Two Ball", value: 1093},
		{name: "Three Ball", value: 1094},
		{name: "Four Ball", value: 1095},
		{name: "Five Ball", value: 1096},
		{name: "Cue Ball", value: 1097},
		{name: "Eight Ball", value: 1098},
		{name: "-- Rings Collection --", value: 0},
		{name: "Topaz Ring", value: 1008},
		{name: "Opal Ring", value: 1009},
		{name: "Amethyst Ring", value: 1010},
		{name: "Emerald Ring", value: 1011},
		{name: "Sapphire Ring", value: 1012},
		{name: "Ruby Ring", value: 1013},
		{name: "Diamond Ring", value: 1014},
		{name: "-- Ties Collection --", value: 0},
		{name: "Solid Tie", value: 1064},
		{name: "Striped Tie", value: 1065},
		{name: "Checked Tie", value: 1066},
		{name: "Geometric Tie", value: 1067},
		{name: "Dot Tie", value: 1068},
		{name: "Paisley Tie", value: 1069},
		{name: "Knitted Tie", value: 1070},		
		{name: "-- Paintings Collection --", value: 0},
		{name: "Warhol Painting", value: 1015},
		{name: "Cezanne Painting", value: 1016},
		{name: "Matisse Painting", value: 1017},
		{name: "Van Gogh Painting", value: 1018},
		{name: "Dali Painting", value: 1019},
		{name: "Monet Painting", value: 1020},
		{name: "Rembrandt Painting", value: 1021},
		{name: "-- Cufflink Collection --", value: 0},
		{name: "Silver Cufflinks", value: 1071},
		{name: "Gold Cufflinks", value: 1072},
		{name: "Amber Cufflinks", value: 1073},
		{name: "Jasper Cufflinks", value: 1074},
		{name: "Agate Cufflinks", value: 1075},
		{name: "Onyx Cufflinks", value: 1076},
		{name: "Pearl Cufflinks", value: 1077},
		{name: "-- Barber Collection --", value: 0},
		{name: "Barber Pole", value: 1099},
		{name: "Razor", value: 1100},
		{name: "Brush", value: 1101},
		{name: "Seat", value: 1102},
		{name: "Towel", value: 1103},
		{name: "Scissors", value: 1104},
		{name: "Cream", value: 1105},
		{name: "-- Great Race Horses Collection --", value: 0},
		{name: "Mill Reef", value: 1078},
		{name: "Sea Bird", value: 1079},
		{name: "Arkle", value: 1080},
		{name: "Golden Miller", value: 1081},
		{name: "St Simon", value: 1082},
		{name: "Ormonde", value: 1083},
		{name: "Eclipse", value: 1084},
		{name: "-- Daily Chance Collection --", value: 0},
		{name: "Bingo Card", value: 1106},
		{name: "Deck of Cards", value: 1107},
		{name: "Dice", value: 1108},
		{name: "Roulette Wheel", value: 1109},
		{name: "Slot Machine", value: 1110},
		{name: "Craps Table", value: 1111},
		{name: "Baccarat Shoe", value: 1112},
		{name: "-- Money Laundering Collection --", value: 0},
		{name: "Money Iron", value: 1113},
		{name: "Dirty Laundry", value: 1114},
		{name: "Dryer Sheets", value: 1115},
		{name: "Money Line", value: 1116},
		{name: "Roll of Quarters", value: 1117},
		{name: "Death by Detergent", value: 1118},
		{name: "Dirty Bra", value: 1119}
	);
	
	var CloneBoostList = new Array(
		{name: "    -- Special Boosts --", value: 0},
//		{name: "Titanium Chain", value: 145},
//		{name: "LRM-X2", value: 146},
//		{name: "Hyperglove", value: 147},
		{name: "Silver Bullet", value: 143},
		{name: "Werewolf Fang", value: 144},
		{name: "Wolfsbane", value: 108},
		{name: "Form Revealer", value: 109},
		{name: "Gold Line (+150% chance of robbing)", value: 142},
		{name: "Pickaxe (+150% chance of robbing)", value: 139},
		{name: "Weight Disc (+150% chance of robbing)", value: 136},
		{name: "Augmenter (2x Loot Missions)", value: 101},
		{name: "Double Loot (2x Loot)", value: 115},
		{name: "Rob Squad (Rob Entire Board)", value: 98},
		{name: "Vitals Sight (+200% chance of robbing)", value: 107},
		{name: "Sheriff Badge (+150% chance of robbing)", value: 118},
		{name: "Cupid\'s Arrow (+150% chance of robbing)", value: 121},
		{name: "Snake Venom (+150% chance of robbing)", value: 124},
		{name: "Chatterbox (+150% chance of robbing)", value: 127},
		{name: "Ship\'s wheel (+150% chance of robbing)", value: 130},
		{name: "Saucy Heat (+150% chance of robbing)", value: 133},
		{name: "    -- Attack Boosts --", value: 0},
		{name: "Black-Handled Bruiser (+130 Attack)", value: 140},
		{name: "Oil Drilling Choke (+137 Attack)", value: 137},
		{name: "Kumar (+175 Attack)", value: 111},
		{name: "Skeet Launcher (+130 Attack)", value: 134},
		{name: "Wood Chunks (+130 Attack)", value: 131},
		{name: "Deck Chair (+130 Attack)", value: 128},
		{name: "Whoopee Cushion (+130 Attack)", value: 125},
		{name: "Green Beer (+130 Attack)", value: 122},
		{name: "Red Rose (+130 Attack)", value: 119},
		{name: "Gold Bar (+130 Attack)", value: 116},
		{name: "Arrow Shaft (+125 Attack)", value: 106},
		{name: "Black Market Ammo (+32 Attack)", value: 56},
		{name: "Blackjack (+80 Attack)", value: 80},
		{name: "Blowfish Dart (+40 Attack)", value: 19},
		{name: "Bola (+45 Attack)", value: 46},
		{name: "Car Bomb (+50 Attack)", value: 47},
		{name: "Champagne Bottle (+25 Attack)", value: 50},
		{name: "Chisel (+34 Attack)", value: 54},
		{name: "Corporate Muscle (+35 Attack)", value: 13},
		{name: "Dead Man\'s Hand (+90 Attack)", value: 60},
		{name: "Fire Ants (+50 Attack)", value: 62},
		{name: "Flaming Shot (+30 Attack)", value: 16},
		{name: "Glass Knuckles (+100 Attack)", value: 64},
		{name: "Handy Man (+38 Attack)", value: 30},
		{name: "Hollow Points (+100 Attack)", value: 32},
		{name: "Hot Coffee (+5 Attack)", value: 26},
		{name: "Liquid Courage (+44 Attack)", value: 42},
		{name: "Semi-Pro Boxer (+15 Attack)", value: 6},
		{name: "Snake Eyes (+70 Attack)", value: 58},
		{name: "Swordfish (+100 Attack)", value: 83},
		{name: "Sting Grenade (+20 Attack)", value: 8},
		{name: "Throwing Knives (+65 Attack)", value: 31},
		{name: "War Paint (+32 Attack)", value: 52},
		{name: "    -- Defense Boosts --", value: 0},
		{name: "Cold Hard Pain (+130 Defense)", value: 141},
		{name: "Demolition Hammer (+130 Defense)", value: 138},
		{name: "Harold (+175 Defense)", value: 110},
		{name: "Taekwondo Uniform (+130 Defense)", value: 135},
		{name: "Skewer (+130 Defense)", value: 132},
		{name: "Wooden Oar (+130 Defense)", value: 129},
		{name: "Whipped Cream Can (+130 Defense)", value: 126},
		{name: "Pot of Gold (+130 Defense)", value: 123},
		{name: "Candied Grenade Pin (+130 Defense)", value: 120},
		{name: "Wanted Poster (+130 Defense)", value: 117},
		{name: "Protective Suit (+50 Defense)", value: 79},
		{name: "Berlin Wall Section (+46 Defense)", value: 43},
		{name: "Bottle Of Olive Oil (+100 Defense)", value: 82},
		{name: "Boxer (+38 Defense)", value: 33},
		{name: "Bulldog (+18 Defense)", value: 4},
		{name: "Bullet Stopper (+65 Defense)", value: 34},
		{name: "Caltrops (+100 Defense)", value: 63},
		{name: "Extra Pair of Eyes (+3 Defense)", value: 25},
		{name: "Flash Bang (+40 Defense)", value: 48},
		{name: "Hyper Alert Sentry (+32 Defense)", value: 57},
		{name: "Injunction (+25 Defense)", value: 11},
		{name: "Mint on the Pillow (+120 Defense)", value: 61},
		{name: "Mr. Hot Sauce (+100 Defense)", value: 35},
		{name: "Pepper Spray (+36 Defense)", value: 53},
		{name: "Protective Suit (+50 Defense)", value: 79},
		{name: "Quiver (+125 Defense)", value: 105},
		{name: "Sandbag Wall (+35 Defense)", value: 18},
		{name: "Shave & A Haircut (+30 Defense)", value: 14},
		{name: "Smoke Grenade (+45 Defense)", value: 49},
		{name: "Tripwire (+10 Defense)", value: 1},
		{name: "Temporary Tattoo (+42 Defense", value: 28},
		{name: "    -- Robbing Defense Boosts --", value: 0},
		{name: "Alarm System (+15 Rob Defense)", value: 3},
		{name: "Bottle of Wine (+150 Rob Defense)", value: 81},
		{name: "Bouncer (+27 Rob Defense)", value: 9},
		{name: "Motion Detector (+37 Rob Defense)", value: 12},
		{name: "Hobo Lookout (+60 Rob Defense)", value: 20},
		{name: "Lookout (+55 Rob Defense)", value: 36},
		{name: "Mutt (+5 Rob Defense)", value: 27},
		{name: "Gourmet Oysters (+120 Rob Defense)", value: 59},
		{name: "Political Favor (+60 Rob Defense)", value: 41},
		{name: "Reinforced Door (+106 Rob Defense)", value: 37},
		{name: "Surveillance Camera (+154 Rob Defense)", value: 38},
		{name: "    -- Money Boosts --", value: 0},
		{name: "Boutonniere (+10% Money)", value: 55},
		{name: "Money Sock (+50% Money)", value: 45}
	);
	
	CloneIt = {
		Version: '1.05',
		iLike: '<iframe src="http://www.facebook.com/plugins/like.php?app_id=219527258096177&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGuessX-Scripts%2F131414080285469&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:20px;" allowTransparency="true"></iframe>',
		Collection: false,
		Lootz: false,
		Boosts: false,
		Custom: false,
		user_list: [],
		Images: {
			Stop: 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7'
		},	
		CloneThis: {
			CatCheck: 2,
			CMenu: 115,
			BMenu: 1,
			SMenu: 4,
			RMenu: 3,
			CCMenu: 0,
			CustNo: 0,
			CustC: 0,
			PeopleList: 'Enter FBID\'s\nPeople must be in your mafia.\nSeperate them by a comma then a space(,)\nList must have 100 ids in it.',
			isAutoRun: false
		}
	}; 
						
	function create_clone_div() {
		if(document.getElementById('cDiv')) {
			document.getElementById('cDiv').innerHTML = CloneConfigHtml;
        } else {
			var cDiv=document.createElement("div");
            cDiv.id = 'cDiv';
            content.insertBefore(cDiv, content.firstChild);
            document.getElementById('cDiv').innerHTML = CloneConfigHtml;
        }
    }
	
	readCloneSettings();
	CloneIt.CloneThis.PeopleList = unescape(CloneIt.CloneThis.PeopleList).replace(/,/g, ', ');
	var content=document.getElementById('content_row');
    var CloneConfigHtml = '<div class="messages" style="border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">'+
	'<div><span style="float: left; width: 40%; text-align: left;">'+CloneIt.iLike+'</span><span style="float: center; width: 40%; text-align: right;"><font size="5" color="white">Clone It.&#12324;</font></span><span style="float:right; width: 23%; text-align: right;">'+CloneIt.Version+' - <img width="16" height="16" title="Close" src="'+CloneIt.Images.Stop+'" id="close"> </span></div>'+
    '<div>';
	CloneConfigHtml += '&nbsp;Pick Category:&nbsp;<select id="CloneGiftCat" onChange="CloneCatCheck(this.selectedIndex)">'+
		'<option value="0" href="#" id="CloneC">Collection</option>'+
		'<option value="1" href="#" id="CloneL">Loot</option>'+
		'<option value="2" href="#" id="CloneB">Boosts</option>'+
		'<option value="3" href="#" id="CloneCCC">Custom</option>'+
	'</select>';
	CloneConfigHtml += '<span id="CBL">&nbsp;<select id="CloneboostList">';
        for (i = 0; i < CloneBoostList.length; i++) {
            CloneConfigHtml += '<option value="' + CloneBoostList[i].value + '">' + CloneBoostList[i].name + "</option>"
        }
	CloneConfigHtml += '</select></span>';
	CloneConfigHtml += '<span id="CCL" style="display:none">&nbsp;<select id="ClonecollectionList">';
        for (i = 0; i < CloneCollectionList.length; i++) {
            CloneConfigHtml += '<option value="' + CloneCollectionList[i].value + '">' + CloneCollectionList[i].name + "</option>"
        }
	CloneConfigHtml += '</select></span>';	
	CloneConfigHtml += '<span id="CCCL" style="display:none">&nbsp;<select id="CloneCCCC">'+
		'<option value="0" href="#">Collection</option>'+
		'<option value="1" href="#">Loot</option>'+
		'<option value="2" href="#">Boosts</option>'+
		'</select>&nbsp;&nbsp;Enter ID:&nbsp;<input id="CloneCN" type="integer" value="0" style="resize:none;width:35px;"></span>';
	CloneConfigHtml += '&nbsp;&nbsp;<a href="#" id="tHeCount" class="sexy_button_new short orange"><span><span>The Count</span></span></a>&nbsp;&nbsp;<a href="#" id="CloneItNow" class="sexy_button_new short gold"><span><span>Start Cloning</span></span></a><br>';
	CloneConfigHtml += '&nbsp;Send Amounts:&nbsp;<select id="CloneSND">'+
		'<option value="1" href="#">1</option>'+
		'<option value="5" href="#">5</option>'+
		'<option value="10" href="#">10</option>'+
		'<option value="25" href="#">25</option>'+
		'<option value="50" href="#">50</option>'+
		'</select>&nbsp;&nbsp;Autostart&nbsp;<input type="checkbox" id="Cautoruning" >&nbsp;Restart Every:&nbsp;<select id="CloneRS">'+
'<option value="5" href="#">5 Minutes</option>'+
'<option value="10" href="#">10 Minutes</option>'+
'<option value="15" href="#">15 Minutes</option>'+
'<option value="30" href="#">30 Minutes</option>'+
'</select>';

	CloneConfigHtml += '<br><textarea class="sexy_input" id="ClonePL" style="width: 420px; height: 58px;">' + CloneIt.CloneThis.PeopleList + '</textarea>';
	CloneConfigHtml += '<div style="text-align:right;vertical-align:top;"><font size="1">*Only Click "Start Cloning" if your on the gifting page!!</font></div></div></div>';
//<span class="more_in"><font size="1">(Autoruns when MW starts, will only work if you have GM version installed)</font></span>
	CloneCatCheck = function(n){
		//Save Category Check
		if (CloneIt.CloneThis.CatCheck != n){
			CloneIt.CloneThis.CatCheck = n
			writeCloneSettings();
			LogErr('Clone Saved '+CloneIt.CloneThis.CatCheck);
		}
		switch(parseInt(n)){
			case 0:
			CloneIt.Collection = true;
			CloneIt.Lootz = false;
			CloneIt.Boosts = false;
			CloneIt.Custom = false;
			$('#CCCL').hide(); 
			$('#CBL').hide();
			$('#CCL').show();
//			$('#SecondryStamRow').hide();   
//			$('#NormalUntillStamRow').hide();
//			$('#FightingRow2').hide();
			break;
			case 1:
			CloneIt.Collection = false;
			CloneIt.Lootz = true;
			CloneIt.Boosts = false;
			CloneIt.Custom = false;
//			$('#SecondryStamRow').show();
//			$('#NormalUntillStamRow').hide();
			break;
			case 2:
			CloneIt.Collection = false;
			CloneIt.Lootz = false;
			CloneIt.Boosts = true;
			CloneIt.Custom = false;
			$('#CCCL').hide(); 
			$('#CCL').hide();
			$('#CBL').show();          
		//	$('#NormalUntillStamRow').show();
			break;
			case 3:
			CloneIt.Collection = false;
			CloneIt.Lootz = false;
			CloneIt.Boosts = false;
			CloneIt.Custom = true;
			$('#CCL').hide();
			$('#CBL').hide();  
			$('#CCCL').show(); 			
		//	$('#NormalUntillStamRow').show();
			break;			
		}
	}
	
	function CloneSaveSettings() {
		CloneIt.CloneThis.CMenu = document.getElementById("ClonecollectionList").selectedIndex;
		CloneIt.CloneThis.BMenu = document.getElementById("CloneboostList").selectedIndex;
		CloneIt.CloneThis.SMenu = document.getElementById("CloneSND").selectedIndex;
		CloneIt.CloneThis.CCMenu = document.getElementById("CloneCCCC").selectedIndex;
		CloneIt.CloneThis.RMenu = document.getElementById("CloneRS").selectedIndex;
		CloneRAMT = document.getElementById("CloneRS").value;
		CloneIt.CloneThis.CustNo = document.getElementById("CloneCN").value;
		CloneGiftId = document.getElementById("ClonecollectionList").value;
		if(CloneIt.Boosts){
			CloneGiftId = document.getElementById("CloneboostList").value
		}
		if (document.getElementById("Cautoruning").checked) { 
			CloneIt.CloneThis.isAutoRun = true;
        }else {
            CloneIt.CloneThis.isAutoRun = false;
        }
		LogErr('Clone Saved\n\n Menu Option number:'+CloneIt.CloneThis.CMenu+'\n Which is ID:'+CloneGiftId+'\n Autorun is: '+CloneIt.CloneThis.isAutoRun+'\n Restarting every '+CloneRAMT+' Minutes');
		writeCloneSettings();
    }
	
	create_clone_div();

	document.getElementById("CloneGiftCat").options[1].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[0].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[1].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[9].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[17].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[25].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[33].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[41].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[49].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[57].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[65].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[73].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[81].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[89].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[97].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[105].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[113].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[121].disabled = "disabled";
	document.getElementById("ClonecollectionList").options[129].disabled = "disabled";
	document.getElementById("CloneboostList").options[0].disabled = "disabled";
	document.getElementById("CloneboostList").options[18].disabled = "disabled";
	document.getElementById("CloneboostList").options[52].disabled = "disabled";
	document.getElementById("CloneboostList").options[84].disabled = "disabled";
	document.getElementById("CloneboostList").options[96].disabled = "disabled";
	document.getElementById("ClonecollectionList").selectedIndex = CloneIt.CloneThis.CMenu;
    document.getElementById("CloneboostList").selectedIndex = CloneIt.CloneThis.BMenu;
    document.getElementById("ClonecollectionList").onchange = CloneSaveSettings;
	document.getElementById("CloneboostList").onchange = CloneSaveSettings;
	document.getElementById("CloneSND").selectedIndex = CloneIt.CloneThis.SMenu;
	document.getElementById("CloneSND").onchange = CloneSaveSettings;
	document.getElementById("CloneCCCC").selectedIndex = CloneIt.CloneThis.CCMenu;
	document.getElementById("CloneCCCC").onchange = CloneSaveSettings;
	document.getElementById("CloneRS").selectedIndex = CloneIt.CloneThis.RMenu;
	document.getElementById("CloneRS").onchange = CloneSaveSettings;	
	document.getElementById('Cautoruning').addEventListener("click", function(){CloneAROO()}, false);
	document.getElementById("CloneCN").value = CloneIt.CloneThis.CustNo;
	
	if (CloneIt.CloneThis.isAutoRun) {
        document.getElementById("Cautoruning").checked = true;
		CloneARS = setTimeout(CloneAS, 10000);
		LogErr('Autostart is starting in 10 seconds');
	}
	
	$('#CloneGiftCat option:eq('+CloneIt.CloneThis.CatCheck+')').prop('selected', true)
		CloneCatCheck(CloneIt.CloneThis.CatCheck);
			
	$('#tHeCount').click(function(){
		CloneIt.user_list = document.getElementById('ClonePL').value.split(', ');
		var counthisnow = CloneIt.user_list.length;
		alert(counthisnow)
	});
	
	$('#CloneItNow').click(function(){
		clearTimeout(CloneARS);
		CloneSaveSettings();
		CloneIt.user_list = document.getElementById('ClonePL').value.split(', ');
		CloneIt.CloneThis.PeopleList = $('#ClonePL').val().split(', ');
		if(CloneIt.user_list.length < 100){
			alert('List needs 100 ID\'s to start')
			return;
		}
		if(CloneIt.user_list.length > 100){
			var clonemath = (CloneIt.user_list.length - 100);
			alert('List has more than 100 ID\'s! \n please get rid of '+clonemath+'')
			return;
		}
		CloneGiftCatno = document.getElementById("CloneGiftCat").value;
		if(CloneIt.Custom){
			CloneGiftCatno = document.getElementById("CloneCCCC").value;
		}
		CloneGiftId = document.getElementById("ClonecollectionList").value;
		if(CloneIt.Boosts){
			CloneGiftId = document.getElementById("CloneboostList").value
		}else if(CloneIt.Custom){
			CloneGiftId = document.getElementById("CloneCN").value;
		}
		CloneSNDAMT = document.getElementById("CloneSND").value;
		CloneIt.CloneThis.CustC = document.getElementById("CloneCCCC").value;
		CloneRAMT = (document.getElementById("CloneRS").value * 60000);
		LogErr('Clone Saved!\n GiftID is:'+CloneGiftId+'\n Category Number is:'+CloneGiftCatno+'');
		clonetime();
		writeCloneSettings();
		$('#cDiv').remove();
	});
	
	$('#close').click(function(){
		try{
			clearTimeout(CloneARS);
		}catch(err){}
		$('#cDiv').remove();
	});    
	
	function CloneAROO() {
		if (document.getElementById("Cautoruning").checked) { 
			LogErr('Autostart is on');
			CloneIt.CloneThis.isAutoRun = true;
        }else {
			LogErr('Autostart is Off');
            CloneIt.CloneThis.isAutoRun = false;
        }
	}
	
	function CloneAS(){
		if(!CloneIt.CloneThis.isAutoRun){
			LogErr('Autostart was aborted');
			return;
		}
		CloneItNow.click()
	}
	
	HTMLElement.prototype.click = function () {
        $(this).click()
    };
	
	function LogErr(msg) {
	//For us to debug out to browser java console
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	
	function writeCloneSettings(){
		storage.setItem("CloneIt", JSON.stringify(CloneIt.CloneThis));
	}
        
	function readCloneSettings(){
		if (!storage.getItem("CloneIt")) { //no settings
			LogErr('No Settings Detected!');
			writeCloneSettings();
		} else {
                        
			tempsettings = JSON.parse(storage.getItem("CloneIt"));
			if( Object.keys(tempsettings).length != Object.keys(CloneIt.CloneThis).length ) { //make sure no new settings show up!
				LogErr('New Settings Detected, Refreshed all Settings!');
				writeCloneSettings();
			} else{
				CloneIt.CloneThis = tempsettings;
			}
		}
	}
	
	function clonetime(){
		setTimeout(kloningitem,1000);
		setTimeout(sendamount,2000);
		setInterval(kloningitem,35000);
		setTimeout(xbone,CloneRAMT);
	}
	
	function kloningitem(){
		setTimeout(itemclone,1000);
		setTimeout(targetaccount,15000);
		setTimeout(sendbutton,23000);
	}

	function sendamount(){
		if(CloneSNDAMT == '1'){
			setInterval(zynga1,500);
			return;
		}else if(CloneSNDAMT == '5'){
			setInterval(zynga5,500);
			return;
		}else if(CloneSNDAMT == '10'){
			setInterval(zynga10,500);
			return;
		}else if(CloneSNDAMT == '25'){
			setInterval(zynga25,500);
			return;
		}else{
			setInterval(zynga50,500);
			return;
		}
	}
	
	function itemclone(){
		window.location='javascript:%28%28function%28%29%7Bdo_ajax%28%27inner_page%27%2C %27remote%2Fhtml_server.php%3Fxw_controller%3Dgift%26xw_action%3Dview%26xw_city%3D1%26gift_category%3D'+CloneGiftCatno+'%26gift_id%3D'+CloneGiftId+'%27%2C 1%2C 1%2C 0%2C 0%29%3B %7D%29%28%29%29%3B';		
	}
	
	function zynga1(){
		window.location='javascript:%28function%28%29%7Bvar send%3Ddocument.getElementById%28%27gift_count%27%29%3Bif%28send%29%7Bsend.value %3D 1%3B%7D%7D%29%28%29%3B';
	}

	function zynga5(){
		window.location='javascript:%28function%28%29%7Bvar send%3Ddocument.getElementById%28%27gift_count%27%29%3Bif%28send%29%7Bsend.value %3D 5%3B%7D%7D%29%28%29%3B';
	}
	
	function zynga10(){
		window.location='javascript:%28function%28%29%7Bvar send%3Ddocument.getElementById%28%27gift_count%27%29%3Bif%28send%29%7Bsend.value %3D 10%3B%7D%7D%29%28%29%3B';
	}
	
	function zynga25(){
		window.location='javascript:%28function%28%29%7Bvar send%3Ddocument.getElementById%28%27gift_count%27%29%3Bif%28send%29%7Bsend.value %3D 25%3B%7D%7D%29%28%29%3B';
	}

	function zynga50(){
		window.location='javascript:%28function%28%29%7Bvar send%3Ddocument.getElementById%28%27gift_count%27%29%3Bif%28send%29%7Bsend.value %3D 50%3B%7D%7D%29%28%29%3B';
	}

	function sendbutton(){
		window.location='javascript:%28function%28%29{var inputs%3Ddocument.getElementsByClassName%28%27sexy_button_new%27%29%3Bfor%28var i%3D0%3Bi%3Cinputs.length%3Bi%2B%2B%29%7Bif%28inputs%5Bi%5D.name%3D%3D%27do%27%29%7B%24%28inputs%5Bi%5D%29.trigger%28%27click%27%29%3B%7D%7D%7D%29%28%29%3B';	
	}	  
   
	function targetaccount(){
javascript:(function(){var inputs=document.getElementsByTagName('input');for(var i=0;i<inputs.length;i++){if (inputs[i].id=='cb_recip_'+CloneIt.user_list[0]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[1]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[2]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[3]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[4]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[5]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[6]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[7]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[8]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[9]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[10]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[11]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[12]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[13]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[14]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[15]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[16]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[17]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[18]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[19]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[20]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[21]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[22]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[23]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[24]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[25]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[26]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[27]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[28]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[29]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[30]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[31]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[32]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[33]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[34]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[35]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[36]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[37]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[38]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[39]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[40]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[41]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[42]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[43]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[44]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[45]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[46]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[47]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[48]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[49]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[50]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[51]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[52]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[53]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[54]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[55]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[56]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[57]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[58]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[59]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[60]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[61]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[62]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[63]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[64]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[65]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[66]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[67]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[68]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[69]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[70]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[71]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[72]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[73]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[74]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[75]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[76]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[77]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[78]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[79]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[80]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[81]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[82]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[83]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[84]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[85]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[86]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[87]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[88]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[89]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[90]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[91]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[92]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[93]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[94]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[95]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[96]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[97]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[98]){$(inputs[i]).trigger('click');}
if (inputs[i].id=='cb_recip_'+CloneIt.user_list[99]){$(inputs[i]).trigger('click');}
}})();
}

	function xbone(){
		LogErr('Window Refreshing!');
		top.location.href=location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view';
	}

	/*add analytics*/
    function loadContent(file) {
		var head=document.getElementsByTagName('head').item(0);
		var scriptTag=document.getElementById('loadScript');
        if(scriptTag)head.removeChild(scriptTag);
		script=document.createElement('script');
        script.src=file;
        script.type='text/javascript';
        script.id='loadScript';
        head.appendChild(script);
        setTimeout(load,1000)
    }
	loadContent('http://www.google-analytics.com/ga.js');
    function load() {
		try {
			var pageTracker=_gat._getTracker("UA-35022618-1");
            pageTracker._trackPageview("/CloneIt")
        } catch(err){}
	}
    /*end analytics*/
		
	
/*		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: asdasdasd},
		{name: "asdasdasd", value: 0},
		{name: "asdasdasd", value: 0},
		{name: "asdasdasd", value: 0},
		{name: "asdasdasd", value: 0}*/
		//http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view