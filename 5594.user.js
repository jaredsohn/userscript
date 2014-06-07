// Yahoo! Mail Color Quoting
// version 0.1 BETA!
// October 15, 2005 
// Copyright (c) 2005, Miles Libbey
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Mail Color Quoting
// @description   Changes the color of quoted levels (>, >> etc) of an email viewed in Yahoo! Mail. 
// @include       http://*.mail.yahoo.com/*
// ==/UserScript==


(function() {

var debug_quote=0;
//alert("hi");
if (document.getElementById("message")) {
//document.getElementById("messageAreaIframe").contentWindow.document.body.innerHTML for beta preview pane, but need to get event to launch this. Tabs are, er, hard because parentof contentWindow will be different... could cycle through iframes and regex names... but still need to get event to launch.
var ymailmessagecontent=document.getElementById("message").innerHTML;
var ymailmessageline=ymailmessagecontent.split('\n');
var totallines=ymailmessageline.length;
for (var loop=0; loop < totallines; loop++)
{
	var currentquotelevel="";
	// if the line is not quoted, then the regex won't match, and thus the RegExp.$# won't get reset.  
	//There's probably a better way to reset these, but for now, force match to reset them
	tester="none";
	var reseter= tester.match(/none/);
	var reg= ymailmessageline[loop].match(/^(\s*&gt;\s*)(&gt;\s*)?(&gt;\s*)?(&gt;\s*)?(&gt;)*/); 
	//RegExp.$1 will tell us if line starts with >; $2-5 tell us quote level
	if (RegExp.$1) { //line is quoted
		// insert appropriate quote level coloring
		if (RegExp.$5) {//5th level quote
			var currentquotelevel=5;
			var newline = '<span style="color: #008080; ">';//background-color: #cdcdcd;">';
			}
		else if (RegExp.$4) {//4th level quote
			var currentquotelevel=4;
			var newline ='<span style="color: #800080; ">';//background-color: #d7d7d7;">';//
			} 
		else if (RegExp.$3) {//3th level quote
			var currentquotelevel=3;
			var newline ='<span style="color: #008000; ">';//background-color: #e1e1e1;">';
			}
		else if (RegExp.$2) {//2th level quote
			var currentquotelevel=2;
			var newline ='<span style="color: #800000; ">';//background-color: #ebebeb;">';
			} 
		else { // only first level
			var currentquotelevel=1;
			var newline ='<span style="color: #000080; ">';//background-color: #f5f5f5;">';
			}
		if (newmessagecontent) { newmessagecontent += newline + ymailmessageline[loop];} // otherwise 'undefined may show up
		else { var newmessagecontent = newline + ymailmessageline[loop];}
		var inspan=1; //keeps track of whether text is in a span we've added
		if (debug_quote) {alerter=confirm("line " + (loop + 1) +" is quote level=" + currentquotelevel +"\n current line= \n" + ymailmessageline[loop] + "\n 1="+ RegExp.$1 + "\n 2="+ RegExp.$2 + "\n 3=" + RegExp.$3 + "\n 4=" + RegExp.$4 + "\n 5=" + RegExp.$5 + "\n Current newmessage=\n" + newmessagecontent); if (!alerter) {break;}
		}
//is next line at same quote level?
		for (var innerloop=loop+1; innerloop < totallines; innerloop++){
			var nextline="";
			// for some reason RegExp's don't get reset, so forcing issue
			tester="none";
			var reseter= tester.match(/none/);
			var nextline=ymailmessageline[innerloop].match(/^(\s*&gt;\s*)(&gt;\s*)?(&gt;\s*)?(&gt;\s*)?(&gt;)*/);
			//if at same level, increment loop -- no need to add anything to that line.  Will end span when quote level differs
			if (RegExp.$1) { // quoted
				if (RegExp.$5) { var innerlevel=5; }  //5th level quote
				else if (RegExp.$4) { var innerlevel=4; } //4th level quote
				else if (RegExp.$3) { var innerlevel=3; } //3th level quote
				else if (RegExp.$2) { var innerlevel=2; } //2th level quote
				else { var innerlevel=1; } //just 1st level quote
				if 	(currentquotelevel==innerlevel)	{			
					//	last line and this line are at same quote level
					newmessagecontent += "\n" +ymailmessageline[innerloop];
					if (debug_quote) {alerter=confirm("Innerloop. Line " + (innerloop + 1) +" is quote level=" + innerlevel +". Current line= \n" + ymailmessageline[innerloop] + "\n 1="+ RegExp.$1 + "\n 2="+ RegExp.$2 + "\n 3=" + RegExp.$3 + "\n 4=" + RegExp.$4 + "\n 5=" + RegExp.$5 + "\n Current newmessage=\n" + newmessagecontent);if (!alerter) {break;}}
					loop++;
					}
				else {//next line isn't at same level; need to close span on previous line. Need to exit innerloop
					newmessagecontent += "</span>\n"; 
					inspan="";
					if (debug_quote) {alerter=confirm("Innerloop no match. Line " + (innerloop + 1) + " is quote level " + innerlevel + ".  (last line was " + currentquotelevel +"). Current line= \n" + ymailmessageline[innerloop] + "\n 1="+ RegExp.$1 + "\n 2="+ RegExp.$2 + "\n 3=" + RegExp.$3 + "\n 4=" + RegExp.$4 + "\n 5=" + RegExp.$5 + "\n Current newmessage=\n" + newmessagecontent);if (!alerter) {break;}}
					var innerlevel="";
					break;	
					}	
			}
			else { //innerloop line isn't quoted.  Need to end span.  Can add inner loop line and skip on.
				if (debug_quote) {alerter=confirm("Inner loop. Line " + (loop+1) +" is not quoted" +"\n current line= \n" + ymailmessageline[loop] + "\n Current newmessage=\n" + newmessagecontent); if(!alerter){break;}}
				newmessagecontent += "</span> \n" + ymailmessageline[innerloop] + "\n";
				inspan="";
				loop++
				break;
				} } // end of innerloop
		}
	else { // Outerloop. Line isn't quoted. Need to add line to newcontent
			if (inspan) { //if content is in span, close span; otherwise just add content
				newmessagecontent += "</span> \n" + ymailmessageline[loop];
				inspan="";
				}
			else { 
				if (newmessagecontent) { newmessagecontent += ymailmessageline[loop] + "\n"} // otherwise 'undefined may show up
				else { var newmessagecontent = ymailmessageline[loop] + "\n"} 
				}
			if (debug_quote) {alerter=confirm("End of Outerloop. Line " + (loop+1) +" is not quoted" +"\n current line= \n" + ymailmessageline[loop] + "\n Current newmessage=\n" + newmessagecontent);if(!alerter){break;}}
						}	
} //end of outerloop
// style for blockquotes
// level 1
newmessagecontent += '<style>blockquote[type=cite] {color: #000080 !important;background-color: #f5f5f5; !important;}';
newmessagecontent += 'blockquote[type=cite] blockquote {color: #800000 !important;background-color: #ebebeb !important;}';
newmessagecontent += 'blockquote[type=cite] blockquote blockquote {color: #008000 !important; background-color: #e1e1e1 !important;}';
newmessagecontent += 'blockquote[type=cite] blockquote blockquote blockquote {color: #800080 !important;background-color: ##d7d7d7 !important;}';
newmessagecontent += 'blockquote[type=cite] blockquote blockquote blockquote blockquote {color: #008080 !important;background-color: #cdcdcd !important;} </style>';
document.getElementById("message").innerHTML=newmessagecontent;
}

// options will appear in General Preferences page
if (window.location.pathname.match(/Preferences/)) {
GM_log("hi");
	var rows=document.getElementsByTagName("tr");
	for (var rowloop=18; rowloop < rows.length; rowloop++) {
		var cand=rows[rowloop];
		var cat=cand.innerHTML;
		if (cat.match(/Security/)) {
			newrow = document.createElement('tr');
			newleftcell = document.createElement('td');
			newleftcell.setAttribute('class','label');
			newleftcell.innerHTML='Color Quoting Options:<br><span class="helptext">(A GreaseMonkey Script)</span>';
			newrightcell = document.createElement('td');
			newrightcell.setAttribute('style', 'background-color:white');
			//need to do if (!GM_getValue(qcolor1)) {var qcolor=blue} else {qcolor1=GM_getValue(qcolor1);)

			//function GM_setValue(key, value);
			//function GM_getValue(key, defaultValue);
/*if (!GM_getValue){alert ('Please upgrade to the latest version of Greasemonkey.');}
else {
	GM_getValue(qcolor1);
		if(!qcolor1){GM_setValue(qcolor1, "blue")}
	GM_getValue(qcolor2);
		if(!qcolor2){GM_setValue(qcolor2, "maroon")}
	 GM_getValue(qcolor3);
		if(!qcolor3){GM_setValue(qcolor3, "green")}
	 GM_getValue(qcolor4);
		if(!qcolor4){GM_setValue(qcolor4, "purple")}
	 GM_getValue(qcolor5);
		if(!qcolor5){GM_setValue(qcolor5, "teal")}
}
alert(qcolor1+qcolor2+qcolor3+qcolor4+qcolor5 );
*/
			var qcolor1="blue";
			var qcolor2="maroon";
			var qcolor3="green";
			var qcolor4="purple";
			var qcolor5="teal";
			var bg1="white";
			var bg2="white";
			var bg3="white";
			var bg4="white";
			var bg5="white";
			qcolor=new Array("blue", "maroon", "green", "purple", "teal");
			//defcolor=new Array("blue", "maroon", "green", "purple", "teal");
			bgcolor=new Array("white", "white", "white", "white", "white");
			levellabel=new Array("&gt; First", "&gt;&gt; Second", "&gt;&gt;&gt; Third", "&gt;&gt;&gt;&gt; Fourth", "&gt;&gt;&gt;&gt;&gt; Fifth");
			selected=new Array('selected','','','','');
			def=new Array('(default)','','','','' );
			// defaults 1=blue 2= maroon 3=green 4=purple 5=teal

newrightcell.innerHTML='Text Color&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Background Color<br><FORM NAME="ymailcolorquoteForm"> ' +
'<SELECT NAME="firstcolor" class="blue" onChange="var qcolor1=this.options[this.selectedIndex].value; this.style.color=qcolor1;document.getElementById(\'firstcolor\').style.color=qcolor1;">' +

'<OPTION VALUE="black" class="black">Black  <OPTION VALUE="blue" class="blue" selected>Blue (default) <OPTION VALUE="green" class="green">Green <OPTION VALUE="maroon" class="maroon">Maroon   <OPTION VALUE="purple" class="purple">Purple <OPTION VALUE="brown" class="brown">Brown <option value="teal" class="teal">Teal </SELECT>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+

'<SELECT NAME="firstbgcolor" onChange="var bg1=this.options[this.selectedIndex].value; this.style.backgroundColor=bg1;document.getElementById(\'firstcolor\').style.backgroundColor=bg1;"><OPTION VALUE="white" style="background-color: white" selected>White (default) <OPTION VALUE="#f5f5f5" style="background-color: #f5f5f5;">Lightest Grey<OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Light Grey <OPTION VALUE="#e1e1e1" style="background-color: #e1e1e1;">Grey  <OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Darker Grey <OPTION VALUE="#cdcdcd" style="background-color: #cdcdcd;">Dark Grey   </SELECT>' + 

'<span id="firstcolor" style="color:' + qcolor1 + '; background-color:' + bg1 + ';"> &gt; First level quote </span><br>' +

'<SELECT NAME="2color" class="maroon" onChange="var qcolor2=this.options[this.selectedIndex].value; this.style.color=qcolor2;document.getElementById(\'secondlevel\').style.color=qcolor2;"><OPTION VALUE="black" class="black">Black  <OPTION VALUE="blue" class="blue">Blue <OPTION VALUE="green" class="green">Green <OPTION VALUE="maroon" class="maroon" selected>Maroon (default)<OPTION VALUE="purple" class="purple">Purple <OPTION VALUE="brown" class="brown">Brown <option value="teal" class="teal">Teal </SELECT>'+

' <SELECT NAME="firstbgcolor" onChange="var bg2=this.options[this.selectedIndex].value; this.style.backgroundColor=bg2;document.getElementById(\'secondlevel\').style.backgroundColor=bg2;"><OPTION VALUE="white" style="background-color: white" selected>White (default) <OPTION VALUE="#f5f5f5" style="background-color: #f5f5f5;">Lightest Grey<OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Light Grey <OPTION VALUE="#e1e1e1" style="background-color: #e1e1e1;">Grey  <OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Darker Grey <OPTION VALUE="#cdcdcd" style="background-color: #cdcdcd;">Dark Grey   </SELECT>' + 

'<span id="secondlevel" style="color:' + qcolor2 +'; background-color:' + bg2 + ';"> &gt;&gt; Second Level quote</span><br>' +

'<SELECT NAME="3color" class="green" onChange="var qcolor3=this.options[this.selectedIndex].value; this.style.color=qcolor3;document.getElementById(\'thirdlevel\').style.color=qcolor3;"><OPTION VALUE="black" class="black">Black  <OPTION VALUE="blue" class="blue">Blue <OPTION VALUE="green" class="green" selected>Green (default)<OPTION VALUE="maroon" class="maroon">Maroon   <OPTION VALUE="purple" class="purple">Purple <OPTION VALUE="brown" class="brown">Brown <option value="teal" class="teal">Teal </SELECT> &nbsp;&nbsp;' + 

'<SELECT NAME="thirdbgcolor" onChange="var bg3=this.options[this.selectedIndex].value; this.style.backgroundColor=bg3;document.getElementById(\'thirdlevel\').style.backgroundColor=bg3;"><OPTION VALUE="white" style="background-color: white" selected>White (default) <OPTION VALUE="#f5f5f5" style="background-color: #f5f5f5;">Lightest Grey<OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Light Grey <OPTION VALUE="#e1e1e1" style="background-color: #e1e1e1;">Grey  <OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Darker Grey <OPTION VALUE="#cdcdcd" style="background-color: #cdcdcd;">Dark Grey   </SELECT>' + 

'<span id="thirdlevel" style="color:' + qcolor3 +'; background-color:' + bg3 + ';"> &gt;&gt;&gt; Third Level quote</span><br>' +

' <SELECT NAME="4color" class="purple" onChange="var qcolor4=this.options[this.selectedIndex].value; this.style.color=qcolor4;document.getElementById(\'fourthlevel\').style.color=qcolor4;"><OPTION VALUE="black" class="black">Black  <OPTION VALUE="blue" class="blue">Blue <OPTION VALUE="green" class="green">Green <OPTION VALUE="maroon" class="maroon">Maroon   <OPTION VALUE="purple" class="purple" selected>Purple (default)<OPTION VALUE="brown" class="brown">Brown <option value="teal" class="teal">Teal </SELECT>&nbsp;&nbsp;'+

'<SELECT NAME="firstbgcolor" onChange="var bg4=this.options[this.selectedIndex].value; this.style.backgroundColor=bg4;document.getElementById(\'fourthlevel\').style.backgroundColor=bg4;"><OPTION VALUE="white" style="background-color: white" selected>White (default) <OPTION VALUE="#f5f5f5" style="background-color: #f5f5f5;">Lightest Grey<OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Light Grey <OPTION VALUE="#e1e1e1" style="background-color: #e1e1e1;">Grey  <OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Darker Grey <OPTION VALUE="#cdcdcd" style="background-color: #cdcdcd;">Dark Grey   </SELECT>' + 

'<span id="fourthlevel" style="color:' + qcolor4 +'; background-color:' + bg4 + ';"> &gt;&gt;&gt;&gt; Fourth Level quote</span><br>' +

'<SELECT NAME="5color" class="brown" onChange="var qcolor5=this.options[this.selectedIndex].value; this.style.color=qcolor5;document.getElementById(\'fifthlevel\').style.color=qcolor5;"><OPTION VALUE="black" class="black">Black  <OPTION VALUE="blue" class="blue">Blue <OPTION VALUE="green" class="green">Green <OPTION VALUE="maroon" class="maroon">Maroon   <OPTION VALUE="purple" class="purple">Purple <OPTION VALUE="brown" class="brown">Brown  <option value="teal" class="teal" selected>Teal (default)</SELECT>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+

'<SELECT NAME="firstbgcolor" onChange="var bg5=this.options[this.selectedIndex].value; this.style.backgroundColor=bg5;document.getElementById(\'fifthlevel\').style.backgroundColor=bg5;"><OPTION VALUE="white" style="background-color: white" selected>White (default) <OPTION VALUE="#f5f5f5" style="background-color: #f5f5f5;">Lightest Grey<OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Light Grey <OPTION VALUE="#e1e1e1" style="background-color: #e1e1e1;">Grey  <OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Darker Grey <OPTION VALUE="#cdcdcd" style="background-color: #cdcdcd;">Dark Grey   </SELECT>'+

'<span id="fifthlevel" style="color:' + qcolor5 +'; background-color:' + bg5 + ';"> &gt;&gt;&gt;&gt;&gt; Fifth Level quote</span></FORM>' +

 '<style type="text/css">	.maroon {color:maroon;}	.black {color:black;} .blue {color:blue;} .brown {color:Brown;}	.teal {color:teal;}	.purple {color:purple;}	.green {color:green;} .white {background-color: white;}	.lightestgrey {background-color: #f5f5f5;} .lightergrey {background-color: #d7d7d7;} .grey {background-color: #e1e1e1;}	.darkergrey{background-color: #d7d7d7;}	.darkgrey {background-color: #cdcdcd;} </style>';




/*newrightcell.innerHTML='Text Color&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Background Color<br><FORM NAME="ymailcolorquoteForm"> ' ;




for (var optloop=0; optloop < 5; optloop++){
	newrightcell.innerHTML+='<SELECT NAME="' + optloop + 'color" class='+ qcolor[optloop] + ' onChange="var ' + qcolor[optloop]+'=this.options[this.selectedIndex].value; this.style.color='+qcolor[optloop] + ';document.getElementById(\''+optloop +'color\').style.color='+ qcolor[optloop] + ';">' +

'<OPTION VALUE="black" class="black">Black  <OPTION VALUE="blue" class="blue" '+ selected[0] + '>Blue '+def[0]+' <OPTION VALUE="green" class="green" '+ selected[2] + '>Green '+def[2]+'<OPTION VALUE="maroon" class="maroon"' + selected[1] + '>Maroon '+def[1]+'  <OPTION VALUE="purple" class="purple" '+ selected[3] + '>Purple '+def[3]+'<OPTION VALUE="brown" class="brown">Brown <option value="teal" class="teal"'+ selected[4] + '>Teal '+def[4]+'</SELECT>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp' +

'<SELECT NAME="'+optloop+'bgcolor" onChange="var bg' + optloop + '=this.options[this.selectedIndex].value; this.style.backgroundColor=' + bgcolor[optloop] +';document.getElementById(\''+optloop + 'color\').style.backgroundColor=' + bgcolor[optloop] +';"><OPTION VALUE="white" style="background-color: white" selected>White (default) <OPTION VALUE="#f5f5f5" style="background-color: #f5f5f5;">Lightest Grey<OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Light Grey <OPTION VALUE="#e1e1e1" style="background-color: #e1e1e1;">Grey  <OPTION VALUE="#d7d7d7" style="background-color: #d7d7d7;">Darker Grey <OPTION VALUE="#cdcdcd" style="background-color: #cdcdcd;">Dark Grey   </SELECT>' + 

'<span id="'+optloop +'color" style="color:'+ qcolor[optloop] + '; background-color:' +bgcolor[optloop] + ';"> '+levellabel[optloop] +' level quote </span><br>' ;

if(optloop==0){selected=new Array('','selected','','','');def=new Array('','(default)','','','')}
if(optloop==1){selected=new Array('','','selected','','');def=new Array('','','(default)','','')}
if(optloop==2){selected=new Array('','','','selected','');def=new Array('','','','(default)','')}
if(optloop==3){selected=new Array('','','','','selected');def=new Array('','','','','(default)')}
}

*/


newrightcell.innerHTML+="</FORM>" +

 '<style type="text/css">	.maroon {color:maroon;}	.black {color:black;} .blue {color:blue;} .brown {color:Brown;}	.teal {color:teal;}	.purple {color:purple;}	.green {color:green;} .white {background-color: white;}	.lightestgrey {background-color: #f5f5f5;} .lightergrey {background-color: #d7d7d7;} .grey {background-color: #e1e1e1;}	.darkergrey{background-color: #d7d7d7;}	.darkgrey {background-color: #cdcdcd;} </style>';

			newrow.appendChild(newleftcell);
			newrow.appendChild(newrightcell);
			cand.parentNode.insertBefore(newrow, cand.nextSibling); 
		}
	}
}




})();