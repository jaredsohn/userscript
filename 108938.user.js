// <![CDATA[ 

// ==UserScript==
// @name           Ikariam Preview Messages
// @namespace      http://html-apps.com/greasemonkey/ikariam
// @author         htmlapps
// @website        http://html-apps.com/
// @description    Reformats the message table to flag important messages and preview the message text, either the first 100 characters or less, or a heading in square brackets [].
// @include        http://*.ikariam.tld/index.php?*
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @version        11
// @history        11 - Now colors friend requests
// @history        10 - Now colors trade treaty cancellations
// @history        9 - Simplified some things, now detects trade treaty requests
// @history        8 - Now detects cultural goods treaty requests
// @history        7 - Now works after post request to change message status
// @history        6 - Now indicates direct messages and friends requests
// @history        5 - Enabled autoupdate.
// @history        4 - Added Buzzy's autoaupdate
// @history        3 - Moves paginator up to same place to make moving page to page faster
// @history        2 - Cleaned up message format
// @history        1 - Initial version
// ==/UserScript==

autoUpdate(108938,"11");

if(document.getElementById('diplomacyDescription')){
	var rows=document.getElementsByTagName('tr');//grab any rows on the page
	var rows_length=rows.length;
	for(var i=0;i<rows_length;i++){
		try{
			//make sure it is a message or do nothing
			if(rows[i].id.indexOf('message')==0){
				theTestString = 'Alliance circular message';
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], '#fff7e1', '#612D04');continue;
				};

				theTestString = 'Message';	//make it purple
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], '#660066', '#fff7e1');continue;
				};

				theTestString = 'Cancel trade treaty';	//make it dark red
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], '#7a1208', '#fff7e1');continue;
				};

				theTestString = 'Accept friend request';	//make it green
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], 'green', '#fff7e1');continue;
				};

				theTestString = 'Accept cultural goods treaty';	//make it green
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], 'green', '#fff7e1');continue;
				};

				theTestString = 'Accept trade treaty';	//make it green
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], 'green', '#fff7e1');continue;
				};

				theTestString = 'Friend request';  //make it navy
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], 'navy', '#fff7e1');continue;
				};

				theTestString = 'is offering a cultural goods treaty';  //make it navy
				if(fnIsRowToWork(theTestString, rows[i])){
					rows[i].innerHTML = fnGetNewHTML(theTestString, rows[i], 'navy', '#fff7e1');continue;
				};

			};
		}catch(errFindingMsgs){window.status=('Error previewing messages: '+errFindingMsgs);};
	};
};

function fnIsRowToWork(theTestString, theRow){
	if(theRow.innerHTML.indexOf(theTestString)> -1){
		theNumber=theRow.id.substring(7);
		if(theNumber.length<1)
			return false;
		theTextRow=document.getElementById('tbl_mail'+theNumber);
		if(!(theTextRow))
			return false;
		return true;
	}else return false;
};

function fnGetNewHTML(theTestString, theRow, bColor, fColor){
	theNumber=theRow.id.substring(7);
	theTextRow=document.getElementById('tbl_mail'+theNumber);
	thePreview=theTextRow.innerHTML.replace(/\<.+?\>/g,'');
	thePreview=thePreview.replace(/  /g,' ');
	if(thePreview.indexOf('[')>-1&&thePreview.indexOf(']')>-1)
		thePreview=thePreview.substring(thePreview.indexOf('['),thePreview.indexOf(']')+1)
	if(100 < thePreview.length)
		thePreview=thePreview.substring(0,100)+'...';;
	newInnerHTML=theRow.innerHTML.substring(0,theRow.innerHTML.indexOf(theTestString)+(theTestString).length);
	newInnerHTML+='<br /><div style="background-color:'+bColor+';color:'+fColor+';margin:3px;padding:0px;">';
	newInnerHTML+='<i>'+thePreview+'</i></div>';
	newInnerHTML+=theRow.innerHTML.substring(rows[i].innerHTML.indexOf(theTestString)+(theTestString).length);
	return newInnerHTML;
};

// ]]>