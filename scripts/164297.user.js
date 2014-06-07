// ==UserScript==
// @name        Nexus Clash Forums Newspaper Wiki Text
// @namespace   http://userscripts.org/users/125692
// @description Trys to find and convert forum posts containing newspaper leaderboards to wiki ready text
// @include     http://nexusclash.com/modules.php?name=Forums*
// @include     http://www.nexusclash.com/modules.php?name=Forums*
// @version     1
// @grants      none
// ==/UserScript==
//ok so currently adds one button to top of forum on navbar that if clicked searches each post for cut and paste of leaderboard.
//if find leaderboard then adds a textbox with wiki formatted version.

(function() {




var rclick=function(e) {
var output="";//this is the outputstring.
var date;
var allpostdivs=document.getElementsByClassName('postbody');//this should be all the posts on the page.
//issue. all quotes have a hidden empty div with this class.
//if we are to put a button near each we must first check if its empty.
//not empty means a main post and we then find the footer for it and place a button in it.

//maybe search for <br> 1.)?
//if we find it then we pattern match each line?


//  Top Demon Killers (Career) <br> Character <br> Demons Killed <br> 1.) Skull Face 609 <br> 2.) Freelance 499 <br> 3.) Two-Socks 486 <br> 4.) Eliise 466 <br> 5.) Handy 462 <br> 6.) Kiano 462 <br> 7.) MakenshiKupo 454 <br> 8.) Laurelin 420 <br> 9.) Vile Brimstone 373 <br> 10.) Signed 372<br>
//  okthen
for(a=0;a<allpostdivs.length;a++){//for each div
	if (allpostdivs[a].innerHTML==""){
		continue;
	}//if div is empty ignore
	text=allpostdivs[a].innerHTML;//use innerHTML instead of textContent as it is nicely <br> deliminated and easier to match definitively
	
	if(text.match(/.*\n<br>\n.*\n<br>\n.*\n<br>\n1\.\).*\n<br>\n2\.\).*\n<br>\n3\.\).*\n<br>\n4\.\).*\n<br>\n5\.\).*\n<br>\n6\.\).*\n<br>\n7\.\).*\n<br>\n8\.\).*\n<br>\n9\.\).*\n<br>\n10\.\).*[0-9]+/)){
		//get the date
		postdate=allpostdivs[a].parentNode.parentNode.parentNode.getElementsByClassName('postdetails')[0].textContent.match(/(Posted.*)\s+Post subject:/)[1];
		matchalltext=text.match(/(.*\n<br>\n.*\n<br>\n.*\n<br>\n1\.\).*\n<br>\n2\.\).*\n<br>\n3\.\).*\n<br>\n4\.\).*\n<br>\n5\.\).*\n<br>\n6\.\).*\n<br>\n7\.\).*\n<br>\n8\.\).*\n<br>\n9\.\).*\n<br>\n10\.\)[^\n<]*[0-9]+)/g)//matches one OR MORE table text
		output="";
		for(b=0;b<matchalltext.length;b++){
			var matchtext=matchalltext[b].match(/(.*)\n<br>\n.*\n<br>\n(.*)\n<br>\n(1\.\).*)\n<br>\n(2\.\).*)\n<br>\n(3\.\).*)\n<br>\n(4\.\).*)\n<br>\n(5\.\).*)\n<br>\n(6\.\).*)\n<br>\n(7\.\).*)\n<br>\n(8\.\).*)\n<br>\n(9\.\).*)\n<br>\n(10\.\)[^\n]*)/)
			var tablename=matchtext[1];
			var	columnheading=matchtext[2];
			//matchtext[3]-matchtext[12] are the entries in the table
			var tmpArray = new Array();
			for (i=0,j=3;i<10 ;i++,j++) {
				tmpArray[i] = new Array();
				//we ahve string of the sort
				//##.) <NAME><variable space><number>
				var tempmatch=matchtext[j].match(/\d+\.\)\s+(.*)\s+([0-9,]+)/);
				tmpArray[i][0]=tempmatch[1];//replace strips numbering
				tmpArray[i][1]=tempmatch[2];
			}
					
			output=output+'=='+tablename+'==\n{{leaderboard|\nboard_name='+
			tablename + '|\nboard_date=' + postdate + '|\nboard_stat=# '+columnheading+'|\n'+
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
			'}}\n'+'\n\n\n';//pad a few lines to it	
		}
		var element = document.createElement("textarea");
		element.innerHTML=output;//bah do it this way then.	
		element.setAttribute("style", "width:90% ; height:200px");	
		allpostdivs[a].appendChild(element);
	}
}
}//end rclick function






//current plan. Button at bottom of every post? search and convert just that post.
//probably best. User will click if they think conversion is possible.
//bah fuck it
//one button in top bar that does whole page. meh not as pretty but only one button.

var navdivs=document.getElementsByClassName('navbar');
var navdivparent=navdivs[0].parentNode;
var newbutton=document.createElement('input');
	newbutton.type='button';
	newbutton.setAttribute('name','wikitextbutton');
	newbutton.setAttribute('value','Wikify!');
	newbutton.addEventListener("click",rclick,false);
	navdivparent.appendChild(newbutton);
			
//EOF
})();	
