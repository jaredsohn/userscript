// ==UserScript==
// @name        Nexus Clash Newspaper Wiki Text
// @namespace   http://userscripts.org/users/125692
// @description Adds button to newspaper view thats adds wiki ready version
// @include     http://nexusclash.com/modules.php?name=Game&op=useitem*
// @include     http://www.nexusclash.com/modules.php?name=Game&op=useitem*
// @grant      none
// @version     1.1
// ==/UserScript==
// 1.1 updated header to include www site and added grants tag.
(function() {


//first check to see if newspaper being read
if(document.getElementById("Errors"))//we have a section tagged Errors. Probably a newspaper?
{	//if so the add a button that if clicked adds a text box with the wiki ready text
	newbutton=document.createElement('input');
	newbutton.type='button';
	newbutton.setAttribute('name','wikitextbutton');
	newbutton.setAttribute('value','Wiki Text');
	//onclick function that generates the wiki ready text and adds it to page
	var rclick=function(e) {
		var newspaperdiv=document.getElementById("Errors"); 
		var newspapertables=newspaperdiv.getElementsByTagName("table");
		var newspapertable=newspapertables[1];
		var newspaperrows=newspapertable.getElementsByTagName('tr');
		var tablename=newspaperrows[0].innerHTML.match(/<center>(.*)<\/center>/)[1];//gets title of table
		var newspaperreaddate=document.getElementsByClassName('panetitle')[0].innerHTML.match(/Current Game Time: (.*)\)/)[1];//when the paper was read!
		var columnheading=newspaperrows[1].lastElementChild.textContent;
		var tmpArray = new Array();
		for (i=0,j=2;i<10 ;i++,j++) {
			tmpArray[i] = new Array();
			tmpArray[i][0]=newspaperrows[j].firstElementChild.textContent.replace(/\d+\.\)./,"");//replace strips numbering
			tmpArray[i][1]=newspaperrows[j].lastElementChild.textContent;
			}
		var output='=='+tablename+'==\n{{leaderboard|\nboard_name='+
			tablename + '|\nboard_date=' + newspaperreaddate + '|\nboard_stat=# '+columnheading+'|\n'+
			'place_1_name='+tmpArray[0][0]+'|\nplace_1_value='+tmpArray[0][1]+'|\n'+
			'place_2_name='+tmpArray[1][0]+'|\nplace_2_value='+tmpArray[1][1]+'|\n'+
			'place_3_name='+tmpArray[2][0]+'|\nplace_3_value='+tmpArray[2][1]+'|\n'+
			'place_4_name='+tmpArray[3][0]+'|\nplace_4_value='+tmpArray[3][1]+'|\n'+
			'place_5_name='+tmpArray[4][0]+'|\nplace_5_value='+tmpArray[4][1]+'|\n'+
			'place_6_name='+tmpArray[5][0]+'|\nplace_6_value='+tmpArray[5][1]+'|\n'+
			'place_7_name='+tmpArray[6][0]+'|\nplace_7_value='+tmpArray[6][1]+'|\n'+
			'place_8_name='+tmpArray[7][0]+'|\nplace_8_value='+tmpArray[7][1]+'|\n'+
			'place_9_name='+tmpArray[8][0]+'|\nplace_9_value='+tmpArray[8][1]+'|\n'+
			'place_10_name='+tmpArray[9][0]+'|\nplace_10_value='+tmpArray[9][1]+'|\n'+
			'}}\n';	
		var button=e.target;
		button.style.visibility='hidden';//hide the button and add the wiki ready text.
		var wikidiv=document.getElementById('wikidiv');
		var element = document.createElement("textarea");
		element.innerHTML=output;//bah do it this way then.	
		element.setAttribute("style", "width:90% ; height:200px");	
		wikidiv.appendChild(element);
	}
	
	//set up the button in div of its own
	
	newbutton.addEventListener("click",rclick,false);
	var newspaperdiv=document.getElementById("Errors");
	var newspaperdivparent=newspaperdiv.parentNode;
	var newdiv=	document.createElement('div');
	newdiv.id='wikidiv';
	newspaperdivparent.insertBefore(newdiv,newspaperdiv.nextElementSibling);
	newdiv.appendChild(newbutton);
}

		
/*output='=='+TABLENAME+'==\n{{leaderboard|\nboard_name='+
TABLENAME + '|\nboard_date=' + DATE + '|\nboard_stat=# '+COLOMNHEADING+'|\n'+
'place_1_name='+NAME1+'|\nplace_1_value='+VALUE1+'|\n'+
'place_2_name='+NAME2+'|\nplace_1_value='+VALUE2'|\n'+
'place_3_name='+NAME3+'|\nplace_1_value='+VALUE3+'|\n'+
'place_4_name='+NAME4+'|\nplace_1_value='+VALUE4+'|\n'+
'place_5_name='+NAME5+'|\nplace_1_value='+VALUE5+'|\n'+
'place_6_name='+NAME6+'|\nplace_1_value='+VALUE6+'|\n'+
'place_7_name='+NAME7+'|\nplace_1_value='+VALUE7+'|\n'+
'place_8_name='+NAME8+'|\nplace_1_value='+VALUE8+'|\n'+
'place_9_name='+NAME9+'|\nplace_1_value='+VALUE9+'|\n'+
'place_10_name='+NAME10+'|\nplace_1_value='+VALUE10+'|\n'+
'}}\n'
*/		

			
//EOF
})();			
			