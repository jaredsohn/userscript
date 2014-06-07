// ==UserScript==
// @name           Customize Board List
// @namespace      pendevin
// @description    Allows you to add invisible boards to the board list
// @include        http://boards.endoftheinter.net/boardlist.php*
// @include        https://boards.endoftheinter.net/boardlist.php*
// ==/UserScript==

function insertAfter(newNode, target) 
{
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
}

function boardItem(i,name,number,desc,owner)
{
	this.name=name;
	this.number=number;
	this.desc=GM_getValue(i+"_desc",desc);
	GM_setValue(i+"_default",desc);
	this.owner=(owner!=undefined)?"Owned by; "+owner:"";
}

var boardList=new Array();
boardList[0]=new boardItem("0","Anime","46","Super kawaii discussions ~~desuyo~~");
boardList[1]=new boardItem("1","Computers","47","Formerly known as Hacking and Cracking");
boardList[2]=new boardItem("2","Flamers","30000","For heacy-racism related content");
boardList[3]=new boardItem("3","Homework","71","Hahaha, you're still in high school");
boardList[4]=new boardItem("4","Media and Entertainment","48","Not so secret board");
boardList[5]=new boardItem("5","Porn","69","I see you in there");
boardList[6]=new boardItem("6","Hentai Paradise","53","For all your cartoon porn needs");
boardList[7]=new boardItem("7","Porn Requests","55","If you're not posting porn, it better go here");
boardList[8]=new boardItem("8","Peer to Peer","43","No requests. Formerly known as BitTorrent.");
boardList[9]=new boardItem("9","P2P Requests","70","Requests go here, but who would come to LL for torrents?");
boardList[10]=new boardItem("10","Video Games","52","GameFAQS all over again");
boardList[11]=new boardItem("11","ROMs","44","For the gamer in us all");
boardList[12]=new boardItem("12","Meat","38","Sweet, sweet meat.");
boardList[13]=new boardItem("13","LUEshi","54","SaLUEte");
boardList[14]=new boardItem("14","Jenny","8675309","Cooking board");
boardList[15]=new boardItem("15","IBKM","662","In before kenman");
boardList[16]=new boardItem("16","The Board of Hopeless Fate","545","","allalone05");
boardList[17]=new boardItem("17","AnotherGamer's Pit of Furry Madness","17074","Former furry board","AnotherGamer");
boardList[18]=new boardItem("18","I didn't win!","-2700","Yes he did","Bizarbus");
boardList[19]=new boardItem("19","Starcraft","5749","","boongee74");
boardList[20]=new boardItem("20","Guam","1234","Comics board","chris1001 the sequel");
boardList[21]=new boardItem("21","EUGWNGOPWTMDC","1691","","COTM");
boardList[22]=new boardItem("22","The Bethlehem Disco","2112","Arcade board","Candin Jesus");
boardList[23]=new boardItem("23","Alexander's Place","100","","DragoonAlexander");
boardList[24]=new boardItem("24","The RevoLUEtion","1024","","Fox1337");
boardList[25]=new boardItem("25","Jawsome.","98","","Frinkahedron");
boardList[26]=new boardItem("26","LUE Radio","8000","","GBFrost");
boardList[27]=new boardItem("27","Furry Board","19","Furry board","gogogopogo");
boardList[28]=new boardItem("28","Treasure Chest Of Lust And Mortal Sin","241","","GreatOlibu731");
boardList[29]=new boardItem("29","Elder Scrolls Cove","9999","","Instanos IV");
boardList[30]=new boardItem("30","Jelly Soup's Toybox","800","","Jelly Soup");
boardList[31]=new boardItem("31","S.S. MORE POWERFUL THAN SUPERMAN, BATMAN, SPIDERMAN, AND THE INCREDIBLE HULK ALL PUT TOGETHER","333","","Kelladros");
boardList[32]=new boardItem("32","Top Secret Area","777","","KeithX");
boardList[33]=new boardItem("33","The Knights TempLUEr","917","No Homers","legolasfan");
boardList[34]=new boardItem("34","Another Castle","555","The Princess is here","");
boardList[35]=new boardItem("35","Use Bombs Wisely","6191","","Lucida Faia");
boardList[36]=new boardItem("36","MRG Land","328","","MRG");
boardList[37]=new boardItem("37","6700","6700","","Mystikal Bomb");
boardList[38]=new boardItem("38","Panel de Pon","152","Palom is an avid fan of the Panel de Pon","Palom The Black Mage");
boardList[39]=new boardItem("39","Shahin","-666","","Peacer Washington");
boardList[40]=new boardItem("40","I HEART U","1908","GO CUBS GO","");
boardList[41]=new boardItem("41","CS 1.6 League","1999","Formerly known as The International House of Roffles","redkillroy");
boardList[42]=new boardItem("42","[LUE] Funmaps","5674684","","redkillroy");
boardList[43]=new boardItem("43",".","368","Former fashion board","RunsWithScissors");
boardList[44]=new boardItem("44","Mostly Harmless","204","They were here first","204");
boardList[45]=new boardItem("45","The Back-Up Internets","1338","","S H C");
boardList[46]=new boardItem("46","Game Over","255","","Shynks");
boardList[47]=new boardItem("47","Counter-Terrorist Unit","24","24 discussion board","Sir Spider");
boardList[48]=new boardItem("48","Lawrence","123221","","SuperCybershell13");
boardList[49]=new boardItem("49","The Starlight Theater","11111101","","Tails3");
boardList[50]=new boardItem("50","Zoot Allures","1027","","testforchozero");
boardList[51]=new boardItem("51","The Bebop","268170","...based off of Jet Black's fishing ship gone bounty hunting craft...","TheRealFolkBlues");
boardList[52]=new boardItem("52","Jesus Ranch","212","","Violent Azure");
boardList[53]=new boardItem("53","without a cause's Lair of Unfathomable Awesomeness","524","","whout a cause");
boardList[54]=new boardItem("54","HaLUE","604753","Halo board","WWF4ever");
boardList[55]=new boardItem("55","The World That I Know","18","","You Kicked My Dog");
boardList[56]=new boardItem("56","The Land of Lost Topics","1","And broken dreams");
//boardList[]=new boardItem("","","","","");

function meat()
{
	function replaceFromList(patt,string,item)
	{
		patt=patt.split(", ");
		for(i in patt)
		{
			var reg=new RegExp(patt[i]);
			if(string.match(reg))return string.replace(reg,item);
		}
	}
	//FIX MEAT
	//AGAIN
	var ran=Math.random();
	boardList[12].name=(0<=ran<=.083)?"Bacon":(.083<ran<=.166)?"Chicken":(.166<ran<=.249)?"Corned Beef":(.249<ran<=.332)?"Dog":(.332<ran<=.415)?"Ham":(.415<ran<=.498)?"Pastrami":(.498<ran<=.581)?"Pork":(.581<ran<=.664)?"Roast Beef":(.664<ran<=.747)?"Salami":(.747<ran<=.830)?"Steak":(.830<ran<=.913)?"Turkey":(.913<ran<=1.000)?"Snausage":"Meat";
	boardList[12].desc=replaceFromList("meat, bacon, corned beef, dog, ham, pastrami, pork, roast beef, salami, steak, turkey, snausage",boardList[12].desc,boardList[12].name.toLowerCase());
	GM_setValue("12_desc",boardList[12].desc);
}

function settings()
{
	var shadow=document.createElement("div");
	shadow.id="CBL_shadow";
	document.body.appendChild(shadow);
	
	meat();
	var rows="";
	for (var i in boardList)
	{
		rows+="<tr><td class='CBL_check_box'><input type='checkbox' id='CBL_checkbox_"+i+"'";
		rows=(GM_getValue(i,false))?rows+" checked":rows;
		rows+="></td><td><span class='CBL_linkish'>"+boardList[i].name+"</span>: "+boardList[i].desc+"</td><td class='CBL_edit_description'><span id='CBL_edit_desc_link_"+i+"'>Edit Description</span></td></tr>";
	}
	
	var settingBox=document.createElement("table");
	settingBox.id="CBL_settings";
	settingBox.className="grid";
	settingBox.innerHTML="<tbody><tr><th colspan='3'>Check the boards you want to appear on your Board List</th></tr>"+rows+"<tr><th colspan='3'>\
			<input type='submit' value='Change Settings' id='CBL_submit'><input type='submit' value='Cancel' id='CBL_cancel'></th></tr></tbody>";
	document.body.appendChild(settingBox);
	document.getElementById("CBL_submit").addEventListener("click",change,false);
	document.getElementById("CBL_cancel").addEventListener("click",cancel,false);
	for(var i in boardList)
	{
		document.getElementById("CBL_edit_desc_link_"+i).addEventListener("click",description,false);
	}
}

function change()
{
	for(var i in boardList)
	{
		GM_setValue(i,document.getElementById("CBL_checkbox_"+i).checked);
	}
	window.location.reload();
}

function cancel()
{
	document.body.removeChild(document.getElementById("CBL_shadow"));
	document.body.removeChild(document.getElementById("CBL_settings"));
	document.getElementById("CBL_table").parentNode.removeChild(document.getElementById("CBL_table"));
	boarded();
}

function description()
{
	var id=parseInt(this.id.substring(19));
	var justBefore=this.parentNode.previousSibling.innerHTML.substring(this.parentNode.previousSibling.innerHTML.indexOf(': ')+2);
	var descBox=document.createElement("span");
	descBox.className="CBL_desc_row";
	descBox.id="CBL_edit_desc_"+id;
	descBox.innerHTML="\
			<span class='CBL_linkish'>"+boardList[id].name+"</span>: \
			<input type='text' id='CBL_edit_desc_box_"+id+"' value='"+justBefore+"'>\
			<input type='button' id='CBL_changeit_"+id+"' value='Change Description'>\
			<input type='button' id='CBL_cancelit_"+id+"' value='Restore Default'>\
			";
	this.parentNode.previousSibling.innerHTML="";
	this.parentNode.previousSibling.appendChild(descBox);
	this.removeEventListener("click",description,false);
	document.getElementById("CBL_changeit_"+id).addEventListener("click",changeit,false);
	document.getElementById("CBL_cancelit_"+id).addEventListener("click",cancelit,false);
	this.addEventListener("click",function(){closeit(justBefore,this);},false);
}

function closeit(desc,it)
{
	var id=parseInt(it.id.substring(19));
	it.parentNode.previousSibling.innerHTML="<span class='CBL_linkish'>"+boardList[id].name+"</span>: "+desc;
	it.removeEventListener("click",arguments.callee,false);
	it.addEventListener("click",description,false);
}

function changeit()
{
	var id=parseInt(this.id.substring(13));
	GM_setValue(id+"_desc",document.getElementById("CBL_edit_desc_box_"+id).value);
	this.parentNode.parentNode.innerHTML="<span class='CBL_linkish'>"+boardList[id].name+"</span>: "+GM_getValue(id+"_desc");
	document.getElementById("CBL_cancel").addEventListener("click",function(){canceled(id);},false);
	this.removeEventListener("click",arguments.callee,false);
	this.addEventListener("click",description,false);
}

function canceled(id)
{
	GM_setValue(id+"_desc",boardList[id].desc);
}

function cancelit()
{
	var id=parseInt(this.id.substring(13));
	GM_setValue(id+"_desc",GM_getValue("12_default"));
	this.parentNode.parentNode.innerHTML="<span class='CBL_linkish'>"+boardList[id].name+"</span>: "+GM_getValue(id+"_desc");
	document.getElementById("CBL_cancel").addEventListener("click",function(){canceled(id);},false);
	this.removeEventListener("click",arguments.callee,false);
	this.addEventListener("click",description,false);
}

function boarded()
{
	meat();
	var rows="";
	for(var i in boardList)
	{
		rows=(GM_getValue(i,false))?rows+"<tr><td class='CBL_table_item'><a href='showtopics.php?board="+boardList[i].number+"'>"+boardList[i].name+"</a>\
				<br>"+boardList[i].desc+"</td><td class='CBL_owner'>"+boardList[i].owner+"</td></tr>":rows;
	}
	rows=(rows=="")?"<tr><td id='CBL_getsome' colspan='2'>You don't have any custom boards selected. Click the 'Edit Custom Boards' link to get some.</td></tr>":rows;
	
	var listTable=document.createElement("table");
	listTable.id="CBL_table";
	listTable.className="grid";
	listTable.innerHTML="<tbody><tr><th id='CBL_head' colspan='2'>Custom Boards</th></tr>"+rows+"</tbody>";
	insertAfter(listTable,document.getElementsByClassName("grid")[0]);
	
	var editList=document.createElement("span");
	editList.id="CBL_link"
	editList.innerHTML="Edit Custom Boards";
	document.getElementById("CBL_head").insertBefore(editList,document.getElementById("CBL_head").firstChild);
	editList.addEventListener("click",settings,false);
}

var css="\
		#CBL_link{position:absolute;left:1em;font-size:9.5pt;text-decoration:underline;cursor:pointer;}\
		#CBL_table{margin-top:2px;}\
		#CBL_shadow{position:fixed;top:0;bottom:0;left:0;right:0;;background-color:#000000;opacity:.5;}\
		.CBL_table_item a{font-size:11.5pt;}\
		#CBL_getsome{font-weight:bold;vertical-align:center;}\
		.CBL_owner{valign:center;width:20%;}\
		#CBL_settings{position:absolute;left:50%;top:80px;margin-left:-35%;width:70%;}\
		.CBL_check_box{text-align:center;}\
		#CBL_settings th{padding:3px 0;font-weight:normal;}\
		.CBL_edit_description{font-size:9.5pt;text-decoration:underline;cursor:pointer;text-align:right;}\
		.CBL_linkish{font-weight:bold;font-size:11.5pt;}\
		.CBL_desc_row{}\
		";
GM_addStyle(css);

boarded();