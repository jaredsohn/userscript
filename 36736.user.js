// ==UserScript==
// @name           Death Star /.Hekked your ***./ HEHE
// @namespace      http://userscripts.org/users/63546
// @description    Laught Out Loud
// @include        http://*.tribalwars.net/game.php*
// @include        http://*.tribalwars.net/forum.php*
// @include        http://*.tribalwars.no/game.php*
// @include        http://*.tribalwars.no/forum.php*
// @include        http://*.tribalwars.nl/game.php*
// @include        http://*.tribalwars.nl/forum.php*
// @include        http://*.triburile.ro/game.php*
// @include        http://*.triburile.ro/forum.php*
// ==/UserScript==

/*   ~CURRENT FEATURES~
	-Report converter link
	-Extra village information
	-Village aliases
	-BB-Code buttons
	-Customizable
	-Supports English, Norwegian, Romanian and Dutch
	
	 ~PLANNED FEATURES~
	-BB-Code buttons for text color and text size
	-BB-Buttons when editing forum posts and replying to mails
	-Advanced tribe member screen
		-Number of troops for tribe members can be set manually or by messages sent by the tribe members (for tribe leaders, war generals, etc.)
		-Can be exported as text, CSV, HTML, or BB-Codes
		-Can be imported as CSV
		-Ability to sort by points, name, number of troops, etc.
	-Extra configurable troop buttons at the rally point
	-Convert incoming attacks to BB-Codes
	-Automatically enter preset values into the market offers screen
	-More languages
*/

/*************
 * Constants *
 *************/

//Language constants
var s={	'en':{	/*BB-Codes*/'bold':'Bold','italic':'Italic','underline':'Underline','quote':'Quote','code':'Code','vil':'Village','player':'Player','ally':'Tribe',
				/*Settings*/'general':'General','repConLink':'Report Converter Link','copyPasteBB':'Copy/Paste BB-Codes','extLinks':'External Links','enableAlias':'Enable Village Aliases','bbCodes':'BB-Codes','mailBBbutton':'Mail BB-Code Buttons','tribalBBbutton':'Tribal Forum BB-Code Buttons','smileSet1':'Smilies Set 1','smileSet2':'Smilies Set 2','smileSet3':'Smilies Set 3','smileSet4':'Smilies Set 4',
				/*Links*/'twRepCon':'TW Report Converter',
				/*Other*/'alias':'Alias','blank':'Blank','farming':'Farming'
		},
		'no':{	/*BB-Codes*/'bold':'Fet','italic':'Kursiv','underline':'Understreket','quote':'Sitat','code':'Kode','vil':'Landsby','player':'Spiller','ally':'Stamme',
				/*Settings*/'general':'Generell','repConLink':'Lenke til rapportkonverterer','copyPasteBB':'Kopier/lim BB-Koder','extLinks':'Eksterne linker','enableAlias':'Aktivere landsbyen aliaser','bbCodes':'BB-Koder','mailBBbutton':'Post BB-Kodeknapper','tribalBBbutton':'Stammeforum BB-Kodeknapper','smileSet1':'Smilies sett 1','smileSet2':'Smilies sett 1','smileSet3':'Smilies sett 1','smileSet4':'Smilies sett 1',
				/*Links*/'twRepCon':'TW rapportkonverterer',
				/*Other*/'alias':'Alias','blank':'Tom','farming':'Farming'
		},
		'ro':{	/*BB-Codes*/'bold':'Bold','italic':'Italic','underline':'Subliniaza','quote':'Quote','code':'Cod','vil':'Sat','player':'Jucator','ally':'Trib',
				/*Settings*/'general':'General','repConLink':'Convertor de rapoarte link','copyPasteBB':'Copiaza/Ataseaza BB-Codes','extLinks':'Link-uri externe','enableAlias':'Activeaza Alias pt sate','bbCodes':'BB-Codes','mailBBbutton':'Butoane BB-code pt mesaje','tribalBBbutton':'Butoane BB-code pt forumul tribului','smileSet1':'Smilies Set 1','smileSet2':'Smilies Set 2','smileSet3':'Smilies Set 3','smileSet4':'Smilies Set 4',
				/*Links*/'twRepCon':'Convertor raport',
				/*Alias*/'alias':'Alias','blank':'Gol','farming':'Farming'
		},
		'nl':{	/*BB-Codes*/'bold':'Vet','italic':'Cursief','underline':'Onderstrepen','quote':'Citeren','code':'Code','vil':'Dorp','player':'Speler','ally':'Stam',
				/*Settings*/'general':'Algemeen','repConLink':'Verslag Converteer Link','copyPasteBB':'Kopieer/Plakken BB-Codes','extLinks':'Externe Links','enableAlias':'Schakel dorp Bijnamen in.','bbCodes':'BB-Codes','mailBBbutton':'Mail BB-Code knoppen','tribalBBbutton':'Tribal Forum BB-Code knoppen','smileSet1':'Smilies Set 1','smileSet2':'Smilies Set 2','smileSet3':'Smilies Set 3','smileSet4':'Smilies Set 4',
				/*Links*/'twRepCon':'TW verslag Converteer',
				/*Other*/'alias':'Alias','blank':'Blank','farming':'Farming'
		}
};
window.s=s;
var lang='en';

//Smilies
var smilies=['Smile','Frown','Wink','Grin','','Clap','','Love','Blush','Tongue',
				'Kiss','Heartbroken','Gasp','Angry','Evil','Cool','Unsure','Phew','Devil','Cry',
				'Laugh','','','ROFL','Angel','Geek','Stop','Sleep','Roll Eyes','Loser',
				'Puke','Shhh','No','Clown','Loony','Party','Yawn','Drool','Hmmm','Owww',
				'Clap2','Bite Nails','Hypnotized','Lying','','Worried','','Crown','Pig','Cow',
				'Monkey','Chicken','Rose','Clover','Flag','Pumpkin','Coffee','Lightbulb','Skeleton','Alien',
				'Alien Mask','Frown','Pray','Money','Whistle','Punch','Peace','No','Dance','Direct',
				'Giggle','','','','Ying Yang','Bla bla','Bow','','Star'];

/*************
 * Functions *
 *************/

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function getServer(url) { //Gets the server from a url
	return url.split('http://')[1].split('.')[0];
}

function getVillageId(url) { //Gets the village id from a url
	return url.split('village=')[1].split('&')[0];
}

function getVillageCoords() {
	var coords=new Array();
	var tmp=document.getElementById("menu_row2").childNodes[7].lastChild;
	coords[0]=tmp.innerHTML.slice(1,4);
	coords[1]=tmp.innerHTML.slice(5,8);
	return coords;
}

function villageAlias(vilId) {
	//Find the village id
	var vilId=getVillageId(vilTable.childNodes[x].childNodes[1].childNodes[1].childNodes[1].href);
	//Add the alias table cell
	var editLink=document.createElement('a');
	editLink.href='#';
	editLink.addEventListener('click',function() { changeAlias(vilId) }, true);
	editLink.innerHTML='Edit';
	var cell=document.createElement('td');
	cell.innerHTML=GM_getValue('alias_' + vilId,s[lang]['blank']) + ' (';;
	cell.appendChild(editLink);
	cell.appendChild(document.createTextNode(')'));
	vilTable.childNodes[x].insertBefore(cell,vilTable.childNodes[x].childNodes[2]);
}

function changeAlias(vilId) {
	var alias=prompt("Enter a new alias for village #" + vilId,"");
	GM_setValue('alias_' + vilId,alias);
	location.reload();
}

function addBBtag(ele,tag,text) {
	var bb=(ele.value).substring(0, ele.selectionStart) + "["+tag+"]";
	if (text)
		bb+=text;
	else
		bb+=(ele.value).substring(ele.selectionStart, ele.selectionEnd);
	bb+="[/"+tag+"]" + (ele.value).substring(ele.selectionEnd, ele.textLength);
	ele.value=bb;
	return;
}

function createBBbutton(parent,title,img,tag,text) {
	var bb=document.createElement('img');
	bb.title=title;
	bb.src=img;
	bb.style.cursor='pointer';
	bb.addEventListener("click", function() { addBBtag(parent.lastChild,tag,text) },true);
	parent.insertBefore(bb,parent.lastChild);
	return bb;
}

function createBBbuttons(parent) {
	//Basic BB buttons
	var bb;
	createBBbutton(parent,s[lang]['bold'],"http://forum.tribalwars.net/images/editor/bold.gif",'b');
	createBBbutton(parent,s[lang]['italic'],"http://forum.tribalwars.net/images/editor/italic.gif",'i');
	createBBbutton(parent,s[lang]['underline'],"http://forum.tribalwars.net/images/editor/underline.gif",'u');
	createBBbutton(parent,s[lang]['quote'],"http://forum.tribalwars.net/images/editor/quote.gif",'quote');
	createBBbutton(parent,s[lang]['code'],"http://forum.tribalwars.net/images/editor/code.gif",'code');
	bb=createBBbutton(parent,s[lang]['vil'],"graphic/buildings/main.png",'village');
	bb.style.padding="2px 2px 2px 3px";
	bb=createBBbutton(parent,s[lang]['player'],"graphic/face.png",'player');
	bb.style.padding="1px 1px 1px 2px";
	bb=createBBbutton(parent,s[lang]['ally'],"graphic/ally_forum.png",'ally');
	bb.style.padding="4px 4px 4px 5px";
	
	parent.insertBefore(document.createElement('br'),parent.lastChild);
	
	//Smily BB buttons
	for (var x=1; x<5; x++) {
		if (GM_getValue('smileSet'+x,1)) {
			for (var y=(x-1)*20; y<Math.min(x*20,smilies.length); y++) {
				createBBbutton(parent,smilies[y],'http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/' + (y+1) + '.gif','img','http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/' + (y+1) + '.gif');
			}
			parent.insertBefore(document.createElement('br'),parent.lastChild);
		}
	}	
}

function saveSetting(setting) {
	if (document.getElementById(setting).checked)
		GM_setValue(setting,1);
	else
		GM_setValue(setting,0);
}

function saveSettings() {
	saveSetting('repConLink');
	saveSetting('copyPasteBB');
	saveSetting('extLinks');
	saveSetting('enableAlias');
	saveSetting('mailBBbutton');
	saveSetting('tribalBBbutton');
	saveSetting('smileSet1');
	saveSetting('smileSet2');
	saveSetting('smileSet3');
	saveSetting('smileSet4');
}

function showSetting(setting,type,text) {
	var setText;
	if (type=='checkbox') {
		if (GM_getValue(setting,1))
			setText='<tr><td><input type="checkbox" checked id="' + setting + '" /> ' + text + '</td></tr>';
		else
			setText='<tr><td><input type="checkbox" id="' + setting + '" /> ' + text + '</td></tr>';
	}
	if (type=='combobox') {
		var values=showSetting.arguments[3];
		setText='<tr><td>' + text + ' <select id="' + setting + '">';
		for (var x=0; x<values.length; x++) {
			if (GM_getValue(setting)==values[x])
				setText+='<option value="' + values[x] + '" selected> ' + values[x] + '</option>';
			else
				setText+='<option value="' + values[x] + '"> ' + values[x] + '</option>';
		}
		setText+='</select></td></tr>';
	}
	return setText;
}

function showSettings() {
	//Get the settings menu and content divs
	var settingsMenu=getElementsByClass('vis')[0];
	var settingsDiv=settingsMenu.parentNode.nextSibling;
	//Highlight the "Tribal Wars Extra Features" menu item
	var s=getElementsByClass("selected",settingsMenu)[0];
	s.setAttribute('class','');
	settingsMenu.childNodes[1].lastChild.firstChild.setAttribute('class','selected');
	//Replace the settings content div
	settingsDiv.innerHTML='<h3>Tribal Wars Extra Features</h3><form id="twefSettings"><table class="vis"><tbody><tr><th>General</th></tr>' +
							showSetting('repConLink','checkbox',window.s[lang]['repConLink']) +
							showSetting('copyPasteBB','checkbox',window.s[lang]['copyPasteBB']) +
							showSetting('extLink','checkbox',window.s[lang]['extLinks']) +
							showSetting('enableAlias','checkbox',window.s[lang]['enableAlias']) +
							'<tr><th>'+window.s[lang]['bbCodes']+'</th></tr>' +
							showSetting('mailBBbutton','checkbox',window.s[lang]['mailBBbutton']) +
							showSetting('tribalBBbutton','checkbox',window.s[lang]['tribalBBbutton']) +
							showSetting('smileSet1','checkbox',window.s[lang]['smileSet1']) +
							showSetting('smileSet2','checkbox',window.s[lang]['smileSet2']) +
							showSetting('smileSet3','checkbox',window.s[lang]['smileSet3']) +
							showSetting('smileSet4','checkbox',window.s[lang]['smileSet4']) +
							'<tr><td><input type="button" id="saveTWEFsettings" value="Save Settings" /></td></tr>' +
							'</tbody></table></form>';
	document.getElementById('saveTWEFsettings').addEventListener("click",saveSettings,true);
}

/*************
 * Main Code *
 *************/
 
//Get the tribal wars server
var server=getServer(location.href);
var lang=server.slice(0,2);

//Get the current village coordinates
if (location.href.search(/forum.php/) == -1) {
	var coords=getVillageCoords();
}

//Add a link to the Tribal Wars Report Converter from all reports
if (location.href.search(/screen=report/) != -1 && GM_getValue('repConLink',1)) {
	//Loop for all links, looking for the "Publicize this report" link
	var links=document.getElementsByTagName('a');
	for (var x=0; x<links.length; x++) {
		if (links[x].innerHTML=='Publicize this report') {
			//Add the link to the report converter after the "Publicize this report" link
			var twRCL=document.createElement('a');
			twRCL.href='http://bericht.terenceds.de/?lang=en&new';
			twRCL.target='_blank';
			twRCL.innerHTML=s[lang]['twRepCon'];
			twRCL.style.marginLeft='20px';
			links[x].parentNode.insertBefore(twRCL,links[x].nextSibling);
		}
	}
}



//Add village alias column on Overview screen
if (location.href.search(/screen=overview_villages/) != -1 && GM_getValue('enableAlias',1)) {
	//Add the Alias heading
	var vilId;
	var vilTable=getElementsByClass('vis')[0].childNodes[1];
	var cell=document.createElement('th');
	cell.innerHTML=s[lang]['alias'];
	vilTable.firstChild.insertBefore(cell,vilTable.firstChild.childNodes[1]);
	//Loop through each village
	for (var x=2; x<vilTable.childNodes.length; x+=2) {
		villageAlias(vilTable,x);
	}
}

//Add BB-Codes/external links to the village info screen
if (location.href.search(/screen=info_village/) != -1 && GM_getValue('copyPasteBB',1)) {
	//Get all needed info
	var nfoTbl=getElementsByClass("vis")[0].childNodes[1];
	var vil=nfoTbl.firstChild.firstChild.innerHTML;
	var vilId=location.href.split('id=')[1].split('&')[0];
	var coords=nfoTbl.childNodes[2].childNodes[1].innerHTML;
	var player=nfoTbl.childNodes[6].childNodes[1].firstChild.innerHTML;
	var playerId=nfoTbl.childNodes[6].childNodes[1].firstChild.href.split('id=')[1].split('&')[0];
	var ally=nfoTbl.childNodes[8].childNodes[1].firstChild.innerHTML;
	var allyId=nfoTbl.childNodes[8].childNodes[1].firstChild.href.split('id=')[1].split('&')[0];
	
	if (GM_getValue('copyPasteBB',1) || GM_getValue('extLinks')) {
		//Create the extras Table
		var extras=document.createElement('table');
		extras.setAttribute('class','vis');
		var extrasText='';
		if (GM_getValue('copyPasteBB',1)) {
			extrasText+='<tr><th colspan="2">'+s[lang]['bbCodes']+'</th></tr>' +
						'<tr><td>'+s[lang]['vil']+': </td><td>[village]'+coords+'[/village]</td></tr>' +
						'<tr><td>'+s[lang]['player']+': </td><td>';
			if (player)
				extrasText+='[player]'+player+'[/player]';
			extrasText+='</td></tr>' +
						'<tr><td>'+s[lang]['farming']+': </td><td>[url=http://en23.tribalwars.net/game.php?village='+getVillageId(location.href)+'&screen=place&mode=command&target='+vilId+']Attack[/url] [village]'+coords+'[/village]';
			if (player)
				extrasText+=' ([player]'+player+'[/player])';
			extrasText+='</td></tr>';
		}
		if (GM_getValue('extLinks'),1) {
			extrasText+='<tr><th colspan="2">'+s[lang]['extLinks']+'</th></tr>' +
						'<tr><td>'+s[lang]['vil']+': </td><td><a target="_blank" href="http://'+server+'.twplus.org/file/village/'+vilId+'/">'+vil+'</a></td></tr>' +
						'<tr><td>'+s[lang]['player']+': </td><td><a target="_blank" href="http://'+server+'.twplus.org/file/player/'+playerId+'/">'+player+'</a></td></tr>' +
						'<tr><td>'+s[lang]['ally']+': </td><td><a target="_blank" href="http://'+server+'.twplus.org/file/ally/'+allyId+'/">'+ally+'</a></td></tr>';
		}
		extras.innerHTML=extrasText;
		nfoTbl.parentNode.parentNode.insertBefore(extras,nfoTbl.parentNode.nextSibling);
	}
}

//Add BB-Code buttons to the new mail screen
if (location.href.search(/screen=mail&mode=new/) != -1 && GM_getValue('mailBBbutton',1)) {
	var msgTd=getElementsByClass('vis')[1].childNodes[1].childNodes[4].firstChild;
	createBBbuttons(msgTd);
}

//Add BB-Code buttons to the New Topic screen
if (location.href.search(/forum.php/) != -1 && location.href.search(/mode=new_thread/) != -1 && GM_getValue('tribalBBbutton',1)) {
	var postTd=getElementsByClass('vis')[0].childNodes[1].childNodes[2].lastChild;
	createBBbuttons(postTd);
}

//Add BB-Code buttons to the reply screen
if (location.href.search(/forum.php/) != -1 && location.href.search(/answer=true/) != -1 && GM_getValue('tribalBBbutton',1)) {
	var postTd=getElementsByClass('vis')[0].childNodes[1].firstChild.lastChild;
	createBBbuttons(postTd);
}

//Add the settings
if (location.href.search(/screen=settings/) != -1) {
	var settingsTr=document.createElement('tr');
	var settingsA=document.createElement('a');
	settingsA.innerHTML="Tribal Wars Extra Features";
	settingsA.href='#';
	settingsA.addEventListener('click',showSettings,true);
	settingsTr.appendChild(document.createElement('td'));
	settingsTr.firstChild.appendChild(settingsA);
	getElementsByClass('vis')[0].childNodes[1].appendChild(settingsTr);
}