// ==UserScript==
// @name            SU V4 Friend Groups
// @version	    	0.15
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://*.stumbleupon.com/stumblers/*
// @include         http://*.stumbleupon.com/stumbler/*
// @include         http://*.stumbleupon.com/share/*
// @copyright       © John Mackay 2010
// ==/UserScript==

var groupList = GM_listValues ();

var MAXGROUPS = 16; MAXFRIENDS = 200;

var imgBin = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC';
var imgPM = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVBgZpcHLThNhGIDh9/vn7/RApwc5VCmFWBPi1mvwAlx7BW69Afeu3bozcSE7E02ILjCRhRrds8AEbKVS2gIdSjvTmf+TYqLu+zyiqszDMCf75PnnnVwhuNcLpwsXk8Q4BYeSOsWpkqrinJI6JXVK6lSRdDq9PO+19vb37XK13Hj0YLMUTVVyWY//Cf8IVwQEGEeJN47S1YdPo4npDpNmnDh5udOh1YsZRcph39EaONpnjs65oxsqvZEyTaHdj3n2psPpKDLBcuOOGUWpZDOG+q0S7751ObuYUisJGQ98T/Ct4Fuo5IX+MGZr95jKjRKLlSxXxFxOEmaaN4us1Upsf+1yGk5ZKhp8C74H5ZwwCGO2drssLZZo1ouIcs2MJikz1oPmapHlaoFXH1oMwphyTghyQj+MefG+RblcoLlaJG/5y4zGCTMikEwTctaxXq/w9kuXdm9Cuzfh9acujXqFwE8xmuBb/hCwl1GKAnGccDwIadQCfD9DZ5Dj494QA2w2qtQW84wmMZ1eyFI1QBVQwV5GiaZOpdsPaSwH5HMZULi9UmB9pYAAouBQbMHHrgQcnQwZV/KgTu1o8PMgipONu2t5KeaNiEkxgAiICDMCCFeEK5aNauAOfoXx8KR9ZOOLk8P7j7er2WBhwWY9sdbDeIJnwBjBWBBAhGsCmiZxPD4/7Z98b/0QVWUehjkZ5vQb/Un5e/DIsVsAAAAASUVORK5CYII=';
var imgTick = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC';

var currURL = window.location.toString();

if (currURL.search ('/stumbler/') != -1) {
	addStumblerControl ();
} else if (currURL.search ('/stumblers/') != -1) {
	addGroupLists ();
} else if (currURL.search ('/share/') != -1){
	addShareControl ();
}

function addShareControl () {
	var contactlist = document.getElementById ('contactList');
	var i;
	
	for (i=0; i<groupList.length; i++) {
		var cmd = document.createElement ('a');
		var cmdli = document.createElement ('li');
		
		cmd.title = groupList[i];
		cmd.href = 'javascript:void(0);';
		cmd.textContent = groupList[i];
		cmd.addEventListener ('click', function () {
			var gr = this.title;
			var members = new Array ();
			var groupgm = GM_getValue (gr).split(',');
			var contactli = contactlist.getElementsByTagName ('li');
			var j, k;
			var count = 0;
			while (groupgm.length > 1) { // first item is empty due to trailing comma in gm var
				members.push(groupgm.shift()); // pairs of usernames and userids
				groupgm.shift();
			}
			for (j=0; j<contactli.length; j++) {
				if (contactli[j].className != 'jdmcmd') {
					var un = contactli[j].textContent.replace (/\s/g, '');
					for (k=0; k<members.length; k++) {
						if (un == maxStr (members[k], 10)) {
							contactli[j].className = 'checked';
							contactli[j].childNodes[3].childNodes[1].checked = true;
							count++;
						}
					}
				}
			}
			alert (count+' friends added to selection.');
		}, false);
		cmdli.className = 'jdmcmd';
		cmdli.appendChild (cmd);
		if (i==0) {
			contactlist.insertBefore (cmdli, contactlist.firstChild);
		} else {
			contactlist.insertBefore (cmdli, contactlist.firstChild.nextSibling);
		}
	}
}



function addStumblerControl () {
	var sidebar = document.getElementsByClassName ('colRight')[0];
	var uname = document.getElementsByClassName ('headerControls')[0].childNodes[3].childNodes[1].textContent.replace (/\s/g, '');
	var id = unsafeWindow.profile_user;
	var groupdiv = document.createElement ('div');
		
	sidebar.insertBefore (groupdiv, sidebar.firstChild);
	
	var menuul = document.createElement ('ul');
	var listul = document.createElement ('ul');
	var menuli = document.createElement ('li');
	var menucmd = document.createElement ('a');
	
	menuli.className = 'hasChild';
	menucmd.href = 'javascript:void(0);';
	menucmd.textContent = 'Friend groups';
	menuli.addEventListener ('mouseover', function () {
		this.className = 'hasChild hover';
	}, false);
	menuli.addEventListener ('mouseout', function () {
		this.className = 'hasChild';
	}, false);
	
	menuli.appendChild (menucmd);
	menuli.appendChild (listul);
	menuul.appendChild (menuli);
	
	groupdiv.className = 'filter'; // nasty multiple id botch - guilty as charged
	groupdiv.style.marginBottom = '10px';
	groupdiv.appendChild (menuul);
	
	for (i=0; i<groupList.length; i++) {
		var itemli = document.createElement ('li');
		var cmd = document.createElement ('a');
		var rspan = document.createElement ('span');
		var rimg = document.createElement ('img');
		var cmdtxt = document.createTextNode (groupList[i]);
		
		cmd.href = 'javascript:void(0);';
		//cmd.textContent = groupList[i];
		rspan.className = 'right';
		rimg.src = imgTick;
		rspan.appendChild (rimg);
		cmd.appendChild (rspan);
		if (!isStumblerInGroup (uname, groupList[i])) {
			rimg.style.display = 'none';
		}
		cmd.appendChild (cmdtxt);
		cmd.addEventListener ('click', function () {
			ri = this.childNodes[0].childNodes[0];
			gr = this.textContent;
			if (ri.style.display == 'none') {
				if (numInGroup (gr) < MAXFRIENDS) {
					addStumblerToGroup (uname, id, gr);
					ri.style.display = '';
				} else {
					alert ('Maximum friends per group limit ('+MAXFRIENDS+') reached.');
				}
			} else {
				delStumblerFromGroup (uname, gr);
				ri.style.display = 'none';
			}
		}, false);
		itemli.appendChild (cmd);
		listul.appendChild (itemli);
	}

}
	
function maxStr (str, max) {
	if (str.length > max) {
		return str.substr (0,max-3) + '...';
	} else return str;
}	
	
function addGroupLists () {
	var i;
	
	var sidebar = document.getElementsByClassName ('colRight')[0];
	
	var groupsdiv = document.createElement ('div');
	var groupsh3 = document.createElement ('h3');
	
	groupsdiv.className = 'box borderBottom';
	groupsh3.textContent = 'Friend groups';
	
	groupsdiv.appendChild (groupsh3);
		
	sidebar.insertBefore (groupsdiv, sidebar.firstChild);
	
	for (i=0; i<groupList.length; i++) {
		var groupgm = GM_getValue (groupList[i]).split(',');
		var groupdiv = document.createElement ('div');
		var menuul = document.createElement ('ul');
		var listul = document.createElement ('ul');
		var menuli = document.createElement ('li');
		var menucmd = document.createElement ('a');
		var delul = document.createElement ('ul');
		var delli = document.createElement ('li');
		var delcmd = document.createElement ('a');
		var delcmdimg = document.createElement ('img');
		
		menuli.className = 'hasChild';
		menucmd.href = 'javascript:void(0);';
		menucmd.textContent = groupList[i];
		
		delcmd.href = 'javascript:void(0);';
		delcmd.title = 'Delete';
		delcmd.addEventListener ('click', function () {
			var gl = 0;
			var pardiv = this.parentNode.parentNode.parentNode;
			if (confirm ('Are you sure you want to delete the '+pardiv.title+' group?')) {
				GM_deleteValue(pardiv.title);
				groupList = GM_listValues (); // refresh list
				pardiv.parentNode.removeChild (pardiv);
				if (groupList.length == MAXGROUPS-1) {
					document.getElementById ('jdmaddgroupdiv').style.display = '';
				}
			}
		}, false);
		delcmdimg.src = imgBin;
		delcmd.appendChild (delcmdimg);
		delli.appendChild (delcmd);
		delul.className = 'right';
		delul.appendChild (delli);
		
		menuli.addEventListener ('mouseover', function () {
			this.className = 'hasChild hover';
		}, false);
		menuli.addEventListener ('mouseout', function () {
			this.className = 'hasChild';
		}, false);
		menuli.appendChild (menucmd);
		menuli.appendChild (listul);
		menuul.className = 'left';
		menuul.appendChild (menuli);
		
		groupdiv.className = 'filter'; // nasty multiple id botch - guilty as charged
		groupdiv.style.marginBottom = '10px';
		groupdiv.appendChild (menuul);
		groupdiv.appendChild (delul);
		groupdiv.title = groupList[i];
		groupsdiv.appendChild (groupdiv);
		
		while (groupgm.length > 1) { // first item is empty due to trailing comma in gm var
			var uname = groupgm.shift(); // pairs of usernames and userids
			var id = groupgm.shift();
			var itemli = document.createElement ('li');
			var cmdleft = document.createElement ('a');
			var text = document.createTextNode (' '+maxStr (uname,10));
			var cmdright = document.createElement ('a');
			var cmdpm = document.createElement ('a');
			var imgcmdpm = document.createElement ('img');
			var imgcmddel = document.createElement ('img');
			var avatar = document.createElement ('img');
			var br = document.createElement ('br');
			
			cmdleft.href = '/stumbler/'+uname+'/';
			cmdleft.className = 'left';
			cmdleft.style.width = '96px';
			cmdleft.style.padding = '3px 2px 4px';
			cmdleft.title = uname;
			
			cmdright.href = 'javascript:void(0);';
			cmdright.className = 'right';
			cmdright.style.clear = 'right';
			cmdright.style.padding = '1px 2px';
			imgcmddel.src = imgBin;
			imgcmddel.title = 'Delete';
			cmdright.appendChild (imgcmddel);
			
			cmdright.name = uname;
			cmdright.addEventListener ('click', function () {
				var gn = this.parentNode.parentNode.parentNode.parentNode.parentNode.title;
				if (confirm ('Delete '+this.name+' from the '+gn+' group?')) {
					delStumblerFromGroup (this.name, gn);
					this.parentNode.parentNode.removeChild (this.parentNode);
				}
			}, false);
			cmdpm.href = '/stumbler/'+uname+'/contact/';
			cmdpm.className = 'right';
			cmdpm.style.clear = 'right';
			cmdpm.style.padding = '1px 2px';
			imgcmdpm.src = imgPM;
			imgcmdpm.title = 'Contact';
			cmdpm.appendChild (imgcmdpm);			
			
			avatar.src = 'http://cdn.stumble-upon.com/superminipics/'+id+'.jpg';
			avatar.width = '32';
			br.className = 'clear';
			
			cmdleft.appendChild (avatar);
			cmdleft.appendChild (text);
			itemli.appendChild (cmdleft);
			itemli.appendChild (cmdpm);
			itemli.appendChild (cmdright);
			itemli.appendChild (br);
			listul.appendChild (itemli);
		}
	}
	
	var addgroupdiv = document.createElement ('div');
	var addgroupname = document.createElement ('input');
	var addgrouph3 = document.createElement ('h3');
	var addgroupcmd = document.createElement ('a');
	
	addgroupdiv.id = 'jdmaddgroupdiv';
	addgrouph3.textContent = 'Add group';
	addgroupname.id = 'jdmaddgroup';
	addgroupcmd.className = 'btnGreen';
	addgroupcmd.style.padding = '3px 12px;';
	addgroupcmd.style.marginLeft = '5px';
	addgroupcmd.style.display = 'inline-block';
	addgroupcmd.textContent = 'Add';
	addgroupcmd.addEventListener ('click', function () {
		var agn = document.getElementById ('jdmaddgroup');
		if (agn.value !== '') {
			GM_setValue (agn.value, '');
			window.location.reload (false);
		}
	}, false);
	
	addgroupdiv.appendChild (addgrouph3);
	addgroupdiv.appendChild (addgroupname);
	addgroupdiv.appendChild (addgroupcmd);
	
	if (groupList.length < MAXGROUPS) {
		addgroupdiv.style.display = '';
	} else {
		addgroupdiv.style.display = 'none';
	}
	groupsdiv.appendChild (addgroupdiv);

}	
	
function addStumblerToGroup (uname, id, group) {
	var gmtemp = GM_getValue (group);
	GM_setValue (group, gmtemp+uname+','+id+',');
}

function numInGroup (group) {
	return (GM_getValue (group).split (',').length / 2);
}

function delStumblerFromGroup (uname, group) {
	var gmtemp = GM_getValue (group);
	var delexp = new RegExp (uname+',[0-9]*,');
	GM_setValue (group, gmtemp.replace (delexp, ''));
}

function isStumblerInGroup (uname, group) {
	return (GM_getValue (group).search (uname) != -1);
}
	