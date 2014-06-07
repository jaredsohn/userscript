// ==UserScript==
// @name           GLB Mass PM
// @namespace      AirMcMVP
// @description    :O
// @include        http://goallineblitz.com/game/new_message.pl*
// ==/UserScript==
// 
// 
// 


function getElementsByClassName(classname, par){
	// function to retrieve objects via class name
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

function createpmgroup(){
	//function to create a pm group
	//get objects of input in order to retrieve current value of to box
	var inputs = document.getElementsByTagName('input');
	//prompt box for retrieving new pm group name
	var newgroup = prompt("Enter new PM group name:",'')
	//remove unwanted characters from pm group name
	newgroup = newgroup.replace(/,/g, '');
	newgroup = newgroup.replace(/:/g, '');
	newgroup = newgroup.replace(/;/g, '');
	// if no PM Group Name exit function
	if((newgroup == '')) {
		alert('Invalid Group Name');
		return 0;
	}
	//prompt for distribution list with default value of what is currently in the to box
	var newlist = prompt("Enter new distribution list; (usernames seperated by ;):",inputs[1].value)
	//replace unwanted characters from distribution list
	newlist = newlist.replace(/,/g, '');
	newlist = newlist.replace(/:/g, '');
	// if distribution list is empty exit function
	if (newlist.length == 0) {
		alert('Invalid Distribution List');
		return 0;
	}
	//retrieve existing PM groups
	var pmgroups = GM_getValue("pmgroup", "");
	
	//create temp array
	var tempadd = new Array();
	
	//if pm groups exist
	if (pmgroups!="") {
		//split groups into array
		var existgroups = pmgroups.split(",");
		//add existing groups to temp array
		for(var i=0;i<existgroups.length;i++) {
				tempadd.push(existgroups[i]);
				
		};
	};
	//add new group to temp array
	tempadd.push(newgroup+':'+newlist);
	
	//set pm groups to new list
	GM_setValue("pmgroup", tempadd.join());
	
	//reload current page to take new group into effect
	window.location.reload()

}

function moveup() {
	//function to move sorting list box item up
	var popup = this.parentNode.parentNode.parentNode;
	var lb = popup.getElementsByTagName("select")[0];
	var selecteditem = lb.selectedIndex; 
	arrTexts = new Array(); 
	arrValues = new Array();
	for(var i=0; i<lb.length; i++)  {
		arrTexts[i] = lb.options[i].text; 
		arrValues[i] = lb.options[i].value;
	} 
	var holdtext = ""; 
	var holdvalue = ""; 
	if ((selecteditem-1) > -1) {
		holdtext = arrTexts[selecteditem - 1]; 
		holdvalue = arrValues[selecteditem - 1]; 
		arrTexts[selecteditem - 1] = arrTexts[selecteditem]; 
		arrValues[selecteditem - 1] = arrValues[selecteditem]; 
		arrTexts[selecteditem] = holdtext; 
		arrValues[selecteditem] = holdvalue;
		for(var f=0; f<lb.length; f++) {
			lb.options[f].text = arrTexts[f]; 
			lb.options[f].value = arrValues[f];
		} 
		lb.options[selecteditem-1].selected=true;
	}
}

function movedown() {
	//function to move sort list box item down
	var popup = this.parentNode.parentNode.parentNode;
	var lb = popup.getElementsByTagName("select")[0];
	var selecteditem = lb.selectedIndex; 
	arrTexts = new Array(); 
	arrValues = new Array();
	for(var i=0; i<lb.length; i++)  {
		arrTexts[i] = lb.options[i].text; 
		arrValues[i] = lb.options[i].value;
	} 
	var holdtext = ""; 
	var holdvalue = ""; 
	if ((selecteditem+1) < arrTexts.length) {
		holdtext = arrTexts[selecteditem + 1]; 
		holdvalue = arrValues[selecteditem + 1]; 
		arrTexts[selecteditem + 1] = arrTexts[selecteditem]; 
		arrValues[selecteditem + 1] = arrValues[selecteditem]; 
		arrTexts[selecteditem] = holdtext; 
		arrValues[selecteditem] = holdvalue;
		for(var f=0; f<lb.length; f++) {
			lb.options[f].text = arrTexts[f]; 
			lb.options[f].value = arrValues[f];
		} 
		lb.options[selecteditem+1].selected=true;
	}
}

function dochange() {
	//function to submit changes in sorting popup window
	var popup = this.parentNode.parentNode.parentNode;
	var lb = popup.getElementsByTagName("select")[0];
	var strpmgroups = new Array();
	//loop through sorted list box and apply changes
	for (var i=0;i<lb.length;i++) {
		strpmgroups[i] = lb.options[i].text + ':' +lb.options[i].value
	}

	GM_setValue("pmgroup",strpmgroups.join(','));

	//close popup window
	newwindow.window.close();
	//reload current page in order for changes to take effect
    window.location.reload()

}

function deleteitem(){
	//function to delete item in popup list box
	var popup = this.parentNode.parentNode.parentNode;
	var lb = popup.getElementsByTagName("select")[0];
	var selecteditem = lb.selectedIndex; 
	if(lb.length>1){
		lb.removeChild(lb[selecteditem]);
	};

}

function editselected(){
	//function to edit selected group information
	var popup = this.parentNode.parentNode.parentNode;
	var lb = popup.getElementsByTagName("select")[0];
	var selecteditem = lb.selectedIndex; 
	var newname = prompt('Enter New Group Name:', lb.options[selecteditem].text)
	newname = newname.replace(/;/g,'');
	newname = newname.replace(/,/g,'');
	newname = newname.replace(/:/g,'');
	if (newname == "") {
		alert('Invalid name entered.');
		return;
	}
	var newlist = prompt('Enter New PM List (usernames seperated by ;) :', lb.options[selecteditem].value)
    newlist = newlist.replace(/,/g,'');
	newlist = newlist.replace(/:/g,'');
	if (newlist == "") {
		alert('Invalid list entered.');
		return;
	}
	lb.options[selecteditem].text = newname;
	lb.options[selecteditem].value = newlist;

	newwindow.window.focus();

}



function editpmgroup(){
	//function to sort and modify existing pm groups

	// get the current address
	var url = window.location.href;
	//get current pm groups listing
	var savedpmgroups = GM_getValue("pmgroup", "");
    //if pm groups exist
	if(savedpmgroups != ""){   
		//open popup window 
		newwindow=window.open('',"SortPMGroups", "width=460,height=340,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
		if (newwindow.opener == null) {
			newwindow.opener = self;
		}
		//build list box
		dropdownstring ='<select id="listorder" size=7 style="font-size: 12px; color: rgb(0, 0, 0); font-family: Arial; background-color: rgb(255, 255, 255);">';
		// get the saved thread addresses and titles
		var pmgroups = savedpmgroups.split(",");
        for(var favloop =0; favloop<pmgroups.length; favloop++) {
			dropdownstring += '<option value ="' + pmgroups[favloop].substring(pmgroups[favloop].indexOf(':')+1) + '">' + pmgroups[favloop].substring(0,pmgroups[favloop].indexOf(':')) + '</option>'
		};
		newwindow.document.write('<center>' + dropdownstring + '</select></center>');

		var center = document.createElement("center");
		//buid editing buttons
		var inp1 = document.createElement("input");
		inp1.setAttribute("type","button");
		inp1.setAttribute("value","Edit");
		inp1.addEventListener("click",editselected,true);
		center.appendChild(inp1);


		var inp = document.createElement("input");
		inp.setAttribute("type","button");
		inp.setAttribute("value","Up");
		inp.addEventListener("click",moveup,true);
		center.appendChild(inp);
		
		var inp2 = document.createElement("input");
		inp2.setAttribute("type","button");
		inp2.setAttribute("value","Down");
		inp2.addEventListener("click",movedown,true);
		center.appendChild(inp2);

		var inp5 = document.createElement("br");
        center.appendChild(inp5);

		var inp4 = document.createElement("input");
		inp4.setAttribute("type","button");
		inp4.setAttribute("value","Delete");
		inp4.addEventListener("click",deleteitem,true);
		center.appendChild(inp4);

		var inp3 = document.createElement("input");
		inp3.setAttribute("type","button");
		inp3.setAttribute("value","Submit");
		inp3.addEventListener("click",dochange,true);
		center.appendChild(inp3);
		//insert into popup window
		newwindow.document.getElementsByTagName("body")[0].appendChild(center);
	};

}



function sendtoMultiple(){
	//function to execute sending of pms
	//set GM_Value for current to info and subject and body
	var inputs = document.getElementsByTagName('input');
	var messages = document.getElementById('message');
	var tofield = inputs[1].value;
	var subfield = inputs[2].value;

	//inputs[3] = send button
	
	var bodyfield = messages.value;
	//verify fields have info
	if(tofield == ''||subfield =='' || bodyfield =='') {
		alert('A required field is blank.')
		return;
	}

	//build arr of people in to field
	var toarr = tofield.split(';');
	//maximum of 15 recipients
	if(toarr.length > 15) {
		alert('Too many recipients. Please Reduce');
	}
	//set GM cookies with pm info
	GM_setValue("pmtolist",tofield);
	GM_setValue("pmsubject",subfield);
	GM_setValue("pmbody",bodyfield);

	//reload page to begin sending pms
	window.location.reload();
    
}

function addtosendline(stradd){
	//function to add to send field
	var inputs = document.getElementById('to_name');
	if(inputs.value.length > 0) {
		inputs.value += ';';
	}
	inputs.value += stradd;
}

// Base code to be ran on each page
//global variable for popup window
var newwindow = '';
//setting script to run after a 1 sec delay of page load
window.setTimeout( function() {

//set variable of current pages url
var url = window.location.href;

//left commented in order to allow for clearing of pm groups in bulk to clear all pm groups un comment these lines reload the new message page then comment lines back out and reload
//GM_setValue('pmtolist','');
//GM_setValue('pmsubject','');
//GM_setValue('pmbody','');

//retrieve stored values if they exist
var sendfield = GM_getValue('pmtolist','');
var subjectfield = GM_getValue('pmsubject','');
var messagefield = GM_getValue('pmbody','');

//if on the page that is displayed after a pm is sent
if(url.indexOf('complete') > 0) {
	//if not slated to send any more messages stay on completed page otherwise continue processing sends
	if (sendfield >''){
		window.location = 'http://goallineblitz.com/game/new_message.pl';
	}
	
//if not replaying to message
}else if (url.indexOf('reply') == -1){

	//if slated to send message to other continue processing
	if(sendfield >'') {
		//if more than one recipient still to be sent to
		if (sendfield.indexOf(';') > 0) {
			//compile array of all recipients
			var arrsend = sendfield.split(';');
			var finalsend = arrsend[0];
			sendfield ='';
			
			for(var i=1;i<arrsend.length;i++) {
				sendfield += arrsend[i] + ';';
			}
			//remove first recipient from list and set send variable to first recipient
			sendfield = sendfield.substring(0, sendfield.length -1);
			GM_setValue('pmtolist',sendfield);
			
		}else{
			//if only one recipient remains clear GM cookies
			//set send variable to remaining recipient
			var finalsend = sendfield;
			GM_setValue('pmtolist','');
			GM_setValue('pmsubject','');
			GM_setValue('pmbody','');
		}

		//retrieve elements (to box, subject box, message box) from send pm page
		var inputs = document.getElementsByTagName('input');
		var messages = document.getElementById('message');
		//set values that we have from our cookie to the fields on the page
		inputs[1].value = finalsend;
		inputs[2].value = subjectfield;
		messages.value = messagefield;
		//click the send button
		inputs[5].click();
	}else{
		//if not sending multi pms build page options
		var inputs2 = document.getElementsByTagName('input');
		var links = getElementsByClassName('subhead_link_bar', document);
		//build create pm group link
		links[0].innerHTML += ' | <a href="javascript:;" id="creategroup">Create PM Group</a>';
		//increase to field size to 150 characters can be increased if neccessary
		inputs2[1].setAttribute('maxlength','150');
		//build button to send to multiple
		var subpagehidden = document.createElement("input");
		subpagehidden.setAttribute("name", "SendtoMultiple");
		//subpagehidden.setAttribute("type", "button");
		subpagehidden.setAttribute("type", "image");
		subpagehidden.setAttribute("src", "/images/game/buttons/send.png");
		subpagehidden.setAttribute("id", "multibutton")
		subpagehidden.setAttribute("value", "Send to Multiple");
		subpagehidden.setAttribute("alt", "Send to Multiple");
		subpagehidden.addEventListener("click", sendtoMultiple,false);

		//retrieve existing pm groups
        var groupcookie = GM_getValue("pmgroup","");

		//create pm groups links and function to add to to link
        var htmlgroups = '<br><div>' + 'PM Groups</div>' + '<table><tr>';

		var formelm = document.getElementsByTagName('form')

		if(groupcookie!="") {

			links[0].innerHTML += ' | <a href="javascript:;" id="editgroup">Edit PM Groups</a>';

			
			var groups = groupcookie.split(',');
			htmlgroups += '<td style="text-align: center;float:left;">'
			for(i=0;i<groups.length;i++) {

				htmlgroups += '<a href="#" onclick="javascript:var inputs = document.getElementById(' + "'" + 'to_name' + "'" + ');if(inputs.value.length > 0){inputs.value += ' + "'" + ';'  + "'" + ';};inputs.value += ' + "'" + groups[i].substring(groups[i].indexOf(':') + 1) + "'" + ';" >' + groups[i].substring(0,groups[i].indexOf(':')) + '</a> | ';
			};
			htmlgroups = htmlgroups.substring(0, htmlgroups.length -2);
			var container=document.getElementById('content');
			var GroupContainer = document.createElement('div');
			GroupContainer.id='GroupContainer';
			GroupContainer.className = 'GroupContainer';
			GroupContainer.innerHTML = (htmlgroups + '</tr></table>');
			var insertelm = getElementsByClassName('big_head subhead_head', document)
			insertelm[0].appendChild(GroupContainer);

		};

		links[0].innerHTML += '<br><br>';
		//set listener for creating pm group
		var elmLink = document.getElementById('creategroup');
		elmLink.addEventListener("click", createpmgroup, false);

		//create listener if existing groups for the edit group list
		if(groupcookie != "") {
			var elmLink2 = document.getElementById('editgroup');
			elmLink2.addEventListener("click", editpmgroup, false);
		}
		//insert Send to Multiple button
		var insertdiv = document.getElementById('submit');
		insertdiv.appendChild(subpagehidden);
		}
}
}
//loop for each remaining to person.
,1000)