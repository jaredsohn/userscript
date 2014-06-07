// ==UserScript==
// @name           gotlurk's xdcc id
// @namespace      http://script.namdx1987.net/
// @description    This script will reveal irc xdcc id on each seleted item
// @version			1.4.2
// @include        http://gotlurk.net/?action=dosearch
// ==/UserScript==

window=unsafeWindow;
document=window.document;

function Bot(botName)
{
	this.name=botName;
	this.priority=0;	
}

function Pack(bot, packNo, packSize)
{
	this.bot=bot;
	this.no=packNo;
	this.size=packSize;
}

function Chapter(chapterName)
{
	this.name=chapterName;
	this.packs=[];
}

var table;
var chapters = [];
var bots = [];

var botNames = [];
var chapterNames = [];

window.chapters=chapters;
window.bots=bots;

var infos=[];

var globalBotName = null;

var selectAllButton;
var deSelectAllButton;
var invertSelectButton;

var generateFullCommandCheckBox;
var selectAllAutoButton;
var deSelectAllAutoButton;

var generateIrcCommandButton;
var ircCommandsDiv;

function fetchData(){
	table = document.getElementsByTagName('table')[3];
	
	var i, j;
	
	var checkboxes = [];
	
	
	var chName;
	var bName;
	var pSize;
	var pNo;
	var BOT_NAME_COL = 0;
	var PACK_NO_COL = 2;
	var PACK_SIZE_COL = 4;
	var CHAPTER_NAME_COL = 5;
	
	if (table.rows[0].cells.length < 6) {
		globalBotName = document.getElementsByTagName('font')[2].textContent;
		BOT_NAME_COL--;
		PACK_NO_COL--;
		PACK_SIZE_COL--;
		CHAPTER_NAME_COL--;
	}
	
	var currentCheckBox;
	
	var currentRow;
	var currentCell;
	
	var currentBot;
	var currentPack;
	var currentChapter;
	
	for (i = 1; i < table.rows.length; i++) {
		currentRow = table.rows[i];
		
		if (currentRow.cells.length < 2) 
			break;
		
		if (globalBotName) 
			bName = globalBotName;
		else 
			bName = currentRow.cells[BOT_NAME_COL].textContent;
		
		pSize = currentRow.cells[PACK_SIZE_COL].textContent;
		pNo = currentRow.cells[PACK_NO_COL].textContent;
		chName = currentRow.cells[CHAPTER_NAME_COL].textContent;
		
		if (!botNames[bName]) {
			currentBot = new Bot(bName);
			botNames[bName] = currentBot;
			bots.push(currentBot);
		}
		else 
			currentBot = botNames[bName];
		
		if (!chapterNames[chName]) {
			currentChapter = new Chapter(chName);
			chapterNames[chName] = currentChapter;
			chapters.push(currentChapter);
		}
		else 
			currentChapter = chapterNames[chName];
		
		currentPack = new Pack(currentBot, pNo, pSize);
		
		currentChapter.packs.push(currentPack);
	}
	
	if (chapters.length < 1) 
		throw new Error('No chapter found');
}	

fetchData();

function compareChapter(c1, c2)
{
    return c1.packs.length-c2.packs.length;
};

function makeTable(){
	chaptersTable = document.createElement('table');
	
	var currentRow, currentCell;
	
	var i;
	var j;
	currentRow = chaptersTable.insertRow(-1);
	
	currentCell = currentRow.insertCell(-1);
	currentCell.innerHTML = "<b><u>Chapter</u></b>";
	currentCell.className = 'verdana';
	
	if (!globalBotName) 
	{
		currentCell = currentRow.insertCell(-1);
		currentCell.innerHTML = "<b><u>Bots</u></b>";
		currentCell.className = 'verdana';
		
		currentCell = currentRow.insertCell(-1);
		currentCell.innerHTML = "<b><u>Auto bot selection</u></b>";
		currentCell.className = 'verdana';
		
		
	}
	
	currentCell = currentRow.insertCell(-1);
	currentCell.innerHTML = "<b><u>Select</u></b>";
	currentCell.className = 'verdana';
	
	chapters.sort(function(c1, c2){
		if(c1.packs.length>c2.packs.length)
			return -1;
		
		if(c1.packs.length<c2.packs.length)
			return 1;
		
		if (c1.name < c2.name) 
			return -1;
		
		if (c1.name > c2.name)
			return 1;
		
		return 0;
	});
	
	var currentInfo;
	var currentChapter;
	var botListComboBox;
	var autoBotSelectCheckBox;
	var chapterSelectCheckBox;
	
	for (i = 0; i < chapters.length; i++) {
		
		currentInfo=null;
		currentChapter=null;
		botListComboBox=null;
		autoBotSelectCheckBox=null;
		chapterSelectCheckBox=null;
		
		currentChapter=chapters[i];
		
		if (currentChapter.packs.length > 1) {
			botListComboBox = document.createElement('select');
			botListComboBox.style.width='170px';
			for(j=0;j<currentChapter.packs.length;j++)
			{
				var option=document.createElement('option');
				option.value=j;
				option.textContent=currentChapter.packs[j].bot.name+" - "+currentChapter.packs[j].no;
				botListComboBox.appendChild(option);
			}
			
			autoBotSelectCheckBox=document.createElement('input');
			autoBotSelectCheckBox.type='checkbox';
		}
		
		chapterSelectCheckBox=document.createElement('input');
		chapterSelectCheckBox.type='checkbox';
		
		
		currentInfo={
			chapter: currentChapter,
			botSelect: botListComboBox,
			autoSelect: autoBotSelectCheckBox,
			chapterSelect: chapterSelectCheckBox
		};
		
		infos.push(currentInfo);
		
		currentRow=chaptersTable.insertRow(-1);
		
		currentCell = currentRow.insertCell(-1);
		currentCell.appendChild(document.createTextNode(currentChapter.name));
		currentCell.className = 'verdana';
		
		
		if (!globalBotName) 
		{
			currentCell = currentRow.insertCell(-1);
			if(botListComboBox)
				currentCell.appendChild(botListComboBox);
			else
				currentCell.textContent=currentChapter.packs[0].bot.name;
			currentCell.className = 'verdana';
			
			currentCell = currentRow.insertCell(-1);
			if(autoBotSelectCheckBox)
				currentCell.appendChild(autoBotSelectCheckBox);
			currentCell.className = 'verdana';	
		}
		
		currentCell = currentRow.insertCell(-1);
		currentCell.appendChild(chapterSelectCheckBox);
		currentCell.className = 'verdana';
	}
	
	for(i=0;i<chaptersTable.rows.length;i++)
	{
		currentRow=chaptersTable.rows[i];
		//currentRow.style.textAlign='center';
		
		for(j=1;j<currentRow.cells.length;j++)
		{
			currentCell=currentRow.cells[j];
			currentCell.style.textAlign='center';
		}
	}
}

makeTable();


function insertComp(){
	selectAllButton = document.createElement('input');
	selectAllButton.type = 'button';
	selectAllButton.value = 'Select all';
	
	deSelectAllButton = document.createElement('input');
	deSelectAllButton.type = 'button';
	deSelectAllButton.value = 'De-select all';
	
	selectAllAutoButton = document.createElement('input');
	selectAllAutoButton.type = 'button';
	selectAllAutoButton.value = 'Select all auto boxes';
	
	deSelectAllAutoButton = document.createElement('input');
	deSelectAllAutoButton.type = 'button';
	deSelectAllAutoButton.value = 'De-select all auto boxes';
	
	invertSelectButton = document.createElement('input');
	invertSelectButton.type = 'button';
	invertSelectButton.value = 'Invert selection';
	
	generateFullCommandCheckBox = document.createElement('input');
	generateFullCommandCheckBox.type = 'checkbox';
	
	ircCommandsDiv = document.createElement('div');
	ircCommandsDiv.className = 'verdana';
	
	ircCommandsDiv.style.minWidth = '500px';
	ircCommandsDiv.style.minHeight = '200px';
	ircCommandsDiv.style.marginTop = '20px';
	ircCommandsDiv.style.border = '1px solid orange';
	ircCommandsDiv.style.backgroundColor = '#FFFFD0';
	ircCommandsDiv.style.color = 'black';
	ircCommandsDiv.style.padding = '5px';
	ircCommandsDiv.style.fontWeight = 'bold';
	ircCommandsDiv.style.textAlign = 'left';
	ircCommandsDiv.style.whiteSpace = 'pre';
	
	generateIrcCommandButton = document.createElement('input');
	generateIrcCommandButton.type = 'button';
	generateIrcCommandButton.value = 'Generate commands';
	
	table.parentNode.insertBefore(selectAllButton, table);
	table.parentNode.insertBefore(deSelectAllButton, table);
	
	table.parentNode.insertBefore(selectAllAutoButton, table);
	table.parentNode.insertBefore(deSelectAllAutoButton, table);
	
	table.parentNode.insertBefore(document.createElement('br'), table);
	
	table.parentNode.insertBefore(invertSelectButton, table);
	table.parentNode.insertBefore(document.createElement('br'), table);
	table.parentNode.insertBefore(document.createElement('span'), table).textContent="Generate full command";
	
	table.parentNode.insertBefore(generateFullCommandCheckBox, table);
	table.parentNode.insertBefore(chaptersTable, table);
	table.parentNode.insertBefore(ircCommandsDiv, table);
	
	table.parentNode.insertBefore(generateIrcCommandButton, table);
	
	
	table.parentNode.insertBefore(ircCommandsDiv, table);
	table.parentNode.removeChild(table);
	//document.body.appendChild(chaptersTable);
}

insertComp();

function infoCompare(c1, c2)
{
	if(c1.chapter.packs.length==1)
		return -1;
		
	if(!c1.autoSelect.checked)
		return -1;
		
	if(c2.chapter.packs.length==1)
		return 1;
		
	if(!c2.autoSelect.checked)
		return 1;
		
	return c1.chapter.packs.length-c2.chapter.packs.length;
}

function selectedPackCompare(p1, p2)
{
	return p1.no-p2.no;
}

function initEvent(){
	selectAllButton.onclick = function(evt){
		for(var i=0;i<infos.length;i++)
			infos[i].chapterSelect.checked=true;
	}
	
	deSelectAllButton.onclick = function(evt){
		for(var i=0;i<infos.length;i++)
			infos[i].chapterSelect.checked=false;
	}
	
	selectAllAutoButton.onclick = function(evt){
		for(var i=0;i<infos.length;i++)
			infos[i].autoSelect.checked=true;
	}
	
	deSelectAllAutoButton.onclick = function(evt){
		for(var i=0;i<infos.length;i++)
			infos[i].autoSelect.checked=false;
	}
	
	invertSelectButton.onclick = function(evt){
		for (var i = 0; i < infos.length; i++) 
		{
			infos[i].chapterSelect.checked = !infos[i].chapterSelect.checked;
			if(infos[i].autoSelect)
				infos[i].autoSelect.checked=!infos[i].autoSelect.checked;
		}
	}
	
	generateIrcCommandButton.onclick = function(evt){
		ircCommandsDiv.textContent = "";
		
		var k;
		var currentPack;
		var selectedPacks=[];
		var cmds=[];
		var i, j;
		var currentInfo;
		
		var selectedInfos=[];
		
		for(i=0;i<bots.length;i++)
			bots[i].priority=0;
		
		for(i=0;i<infos.length;i++)
		{
			currentInfo=infos[i];
			if(currentInfo.chapterSelect.checked)
				selectedInfos.push(currentInfo);
		}
		
		selectedInfos.sort(infoCompare);
		
		for(i=0;i<selectedInfos.length;i++)
		{
			var pos=0;
			currentInfo=selectedInfos[i];
			if(currentInfo.chapter.packs.length==1)
			
				currentPack=currentInfo.chapter.packs[0];
			
			else if(!currentInfo.autoSelect.checked)
			
				currentPack=currentInfo.chapter.packs[currentInfo.botSelect.selectedIndex];
			
			else
			{
				for(j=1;j<currentInfo.chapter.packs.length;j++)
					if(currentInfo.chapter.packs[j].bot.priority<currentInfo.chapter.packs[pos].bot.priority)
						pos=j;
						
				currentPack=currentInfo.chapter.packs[pos];
			}
			
			currentPack.bot.priority++;
			selectedPacks.push(currentPack);
		}
		if(selectedPacks.length<1)
			return;
		
		var botgroup=[];
		for(k=0;k<selectedPacks.length;k++)
		{
			pack=selectedPacks[k];
			if(!botgroup[pack.bot.name])
				botgroup[pack.bot.name]=[];
			
			botgroup[pack.bot.name].push(pack);
		}
		var name;
		//window.console.log(botgroup);
		for(var name in botgroup)
		{
			window.console.log(botgroup[name]);
			var botdiv=document.createElement("div");
			var header=document.createElement("span");
			var content=document.createElement("div");
			
			botdiv.appendChild(header);
			botdiv.appendChild(content);
			
			botdiv.style.margin="2px";
			botdiv.style.padding="2px";
			botdiv.style.border="1px solid";
			header.style.fontStyle="italic underlined";
			header.style.fontWeight="bold";	
			header.style.margin="2px";
			header.style.textDecoration="underline";
			
			content.style.margin="2px";
			
			ircCommandsDiv.appendChild(botdiv);
			
			header.textContent=name;
			botgroup[name].sort(selectedPackCompare);
			
			var lines=[];
			
			for(k=0;k<botgroup[name].length;k++)
			{
				var pack=botgroup[name][k];
				if(generateFullCommandCheckBox.checked)
					lines.push("/msg "+name+" xdcc send #"+pack.no);
				else
					lines.push(pack.no);
			}
			
			content.innerHTML=lines.join("<br/>");
		}
		
	}
}

initEvent();