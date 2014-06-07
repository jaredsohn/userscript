// ==UserScript==
// @name           StumbleUpon Favorite Groups
// @namespace      thlayli.detrave.net
// @description    Display Favorite Groups on SU
// @include        http://*.stumbleupon.com/groups/*
// @include        http://*.stumbleupon.com/forum/
// @version        1.0
// ==/UserScript==
var inputs = document.getElementsByTagName("input");
var isYourPage = 1;
for(i=0;i<inputs.length;i++){
	if(inputs[i].value.substr(inputs[i].value.length-6,6)=="Friend")
		isYourPage = 0;
}
if(isYourPage==1){
	var urls = document.links;
	for(i=0;i<urls.length;i++){
		if(urls[i].pathname=='/about/'&&urls[i].target!='_top'&&urls[i].text!='Back to About')
			var thisStumbler = urls[i].text;	
	}
	//get prefs
	var groupsPref = GM_getValue(thisStumbler,'');
	var groupsList = (groupsPref.indexOf(',')) ? groupsPref.split(',') : groupsPref;
	groupsList = groupsList.sort(sortGroups);
	var groupsCount = groupsList.length;
	if(groupsList[0]=='')
		var groupsCount=0;
	var url=document.location.href.split('.');
	if(url[2].substr(0,10)=='com/forum/'){
		var forumUrl = url[0]+'.'+url[1]+'.com/groups/';
		var stumbler, groupName, groupId, stumblerRank;
		var aboutFlag = 0;
		var cells = document.getElementsByTagName('td');
		for(i=0;i<cells.length;i++){
			if(cells[i].textContent == 'Sponsors Forum'||cells[i].innerHTML=='<br><center></center>')
				var fgCell = cells[i];
		}
		//create fg section
		forumUrl=
		fgCell.innerHTML = '<table width="732" align="center" cellpadding="5"><tbody><tr><td class="bg"><a href="'+forumUrl+'"><b>Favorite Groups</b></a></td></tr></tbody></table><table width="740" align="center" cellpadding="5"></table><table width="732" align="center" cellpadding="0" cellspacing="0"><tbody><tr><td class="darkbg" height="1"/></tr></tbody></table><br />';
		var fgTable = fgCell.firstChild.nextSibling;

		//create fg structure
		var fgTableBody = document.createElement("tbody");
		fgTable.appendChild(fgTableBody);
		var fgTableRow = new Array(Math.ceil(groupsList.length/5));
		var fgTableCell = new Array(groupsCount);
		var fgInnerTable = new Array(groupsCount);
		var fgInnerBody = new Array(groupsCount);
		var fgInnerRow = new Array(groupsCount);
		var fgInnerCell = new Array(groupsCount);
		var fgInnerHref = new Array(groupsCount);
		var offset=0;
		for(i=0;i<fgTableRow.length;i++){
			fgTableRow[i] = document.createElement("tr");
			fgTableBody.appendChild(fgTableRow[i]);
			for(j=offset;j<offset+5;j++){
				//create fg items
				fgTableCell[j] = document.createElement("td");
					fgTableCell[j].setAttribute("width","20%");
					fgTableCell[j].setAttribute("valign","bottom");
					fgTableCell[j].setAttribute("align","center");
				fgInnerTable[j] = document.createElement("table");
					fgInnerTable[j].setAttribute("cellspacing","0");
					fgInnerTable[j].setAttribute("cellpadding","0");
				fgInnerBody[j] = document.createElement("tbody");
				fgInnerRow[j] = document.createElement("tr");
				fgInnerCell[j] = document.createElement("td");
					fgInnerCell[j].setAttribute("align","center");
					fgInnerCell[j].setAttribute("nowrap","true");
					fgInnerCell[j].setAttribute("class","mini");
				fgInnerHref[j] = document.createElement("a");
				fgTableRow[i].appendChild(fgTableCell[j]);
				fgTableCell[j].appendChild(fgInnerTable[j]);
				fgInnerTable[j].appendChild(fgInnerBody[j]);
				fgInnerBody[j].appendChild(fgInnerRow[j]);
				fgInnerRow[j].appendChild(fgInnerCell[j]);
				fgInnerCell[j].appendChild(fgInnerHref[j]);
			}
			for(j=offset;j<offset+5;j++){
				//populate fg items
				if(groupsList[j]){
					group = groupsList[j].split("/");
					groupName = group[0];
					groupUrl = group[1];
					groupId = group[2];
					fgInnerHref[j].setAttribute("href","http://" + groupUrl + ".group.stumbleupon.com/forum/");
					fgInnerHref[j].setAttribute("class","favoriteGroups");
					fgInnerHref[j].innerHTML="<img alt='"+ groupName +"' src='http://www.stumbleupon.com/groupsuperminipics/" + groupId + ".jpg' border=0><br> " + groupName;
					fgInnerHref[j].setAttribute("target","_top");
				}
			}
			offset = j;
		}
	}else{
		var cells = document.getElementsByTagName('td');
		for(i=0;i<cells.length;i++){
			if(cells[i].firstChild&&cells[i].firstChild.nextSibling&&cells[i].firstChild.nextSibling.innerHTML == 'Groups')
				var gBar = cells[i];
		}
		var br = gBar.childNodes.item(gBar.childNodes.length-2);
		var dotWorkaround = document.createElement("a");
		dotWorkaround.innerHTML = " &middot; ";
		var gBarSpace = document.createTextNode(dotWorkaround.innerHTML);
		var gBarLink = document.createElement("a");
		gBarLink.href = "javascript:editGroups();";
		gBarLink.innerHTML = "<b>Choose Favorites</b>";
		gBarLink.id = "editText";
		gBar.insertBefore(gBarSpace,br);
		gBar.insertBefore(gBarLink,br);
	}
}
//add friends to list
unsafeWindow.markGroup = function(evt){
    if (evt) {
			var elem = (evt.target) ? evt.target : evt.srcElement;
			if(elem.nodeName=="IMG"){
				if(!elem.style.border){
					elem.style.border="2px solid";
					elem.parentNode.style.textDecoration='underline';
					elem.setAttribute("title",elem.parentNode.text + '/' +  elem.parentNode.name + '/' + elem.src.substr(46,elem.src.length-50));
				}else{
					elem.style.border='';
				}
			}else{
				if(!elem.firstChild.style.border){
					elem.firstChild.style.border="2px solid";
					elem.style.textDecoration='underline';
					elem.firstChild.setAttribute("title",elem.text + '/' + elem.name + '/' + elem.firstChild.src.substr(46,elem.firstChild.src.length-50));
				}else{
					elem.firstChild.style.border='';
				}
			}
		}
    return false;
}
var editFlag=0;
unsafeWindow.editGroups = function(){
	var allGroups = unsafeWindow.document.getElementsByTagName("a");
	var groupNames = new Array(groupsList.length);
	for(i=0;i<groupsList.length;i++)
		groupNames[i] = groupsList[i].split('/')[0];
	if(editFlag==0){
		//highlight current favorites
		for(i=0;i<allGroups.length;i++){
			for(j=0;j<groupNames.length;j++){
				if(allGroups[i].text!=''&&groupNames[j]==allGroups[i].text&&allGroups[i].firstChild.nodeName=='IMG'){
					allGroups[i].firstChild.style.border='2px solid';
					allGroups[i].style.textDecoration='underline';
					allGroups[i].firstChild.className='favoriteGroups';
				}
			}
		}
		document.getElementById("editText").innerHTML="<b>Accept Changes</b>";
		for(i=0;i<allGroups.length;i++){
			if(allGroups[i].parentNode.className=="mini"){
				allGroups[i].setAttribute("onclick","markGroup(event)");
				allGroups[i].setAttribute("name",allGroups[i].href.substr(7,allGroups[i].href.length-30));
				allGroups[i].setAttribute("href","javascript:void(0);");
			}
		}
		editFlag=1;
	}else{
		document.getElementById("editText").innerHTML="<b>Choose Favorites</b>";
		for(i=0;i<allGroups.length;i++){
			if(allGroups[i].firstChild.nodeName=='IMG'){
				if(allGroups[i].firstChild.className=="favoriteGroups"){
					//remove favorite group
					if(!allGroups[i].firstChild.style.border){
						for(n=0;n<groupsList.length;n++){
							if(groupsList[n].split('/')[0]==allGroups[i].text)
								groupsList.splice(n,1);
						}
					}
					//make everything normal
					allGroups[i].removeAttribute("onclick");
					allGroups[i].removeAttribute("name");
					allGroups[i].firstChild.style.border='';
					allGroups[i].firstChild.style.textDecoration='none';
					allGroups[i].setAttribute("href","http://" + allGroups[i].firstChild.title.split('/')[1] + ".group.stumbleupon.com/");
				}else{
					//add favorite group
					if(allGroups[i].firstChild.style.border){
						dupFlag=0;
						for(n=0;n<groupsList.length;n++){
							if(groupsList[n]==allGroups[i].firstChild.title)
								dupFlag=1;
						}
						if(dupFlag==0)
							groupsList.push(allGroups[i].firstChild.title)
					}
					//make everything normal
					allGroups[i].removeAttribute("onclick");
					allGroups[i].removeAttribute("name");
					allGroups[i].firstChild.style.border='';
					allGroups[i].setAttribute("href","http://" + allGroups[i].firstChild.title.split('/')[1] + ".group.stumbleupon.com/");
				}
			}
		}
		editFlag=0;
		groupsPref = groupsList.join(",");
		if(groupsList[0]=='')
			groupsPref = groupsPref.substr(1);
		GM_setValue(thisStumbler,groupsPref);
		window.location.reload();
	}
}
function sortGroups(a,b){
 if(a.toLowerCase(a)<b.toLowerCase()){
  return -1;
 }
}