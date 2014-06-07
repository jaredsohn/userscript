// ==UserScript==
// @name       		dev_note_search2
// @namespace  	 	dev_note_search2
// @description 	searching notes!
// @match       	http://*.deviantart.com/messages/notes/*
// @version     	1.1.10
// @author			http://dediggefedde.deviantart.com
// @updateURL   	https://userscripts.org/scripts/source/180739.meta.js
// @downloadURL   	https://userscripts.org/scripts/source/180739.user.js
// @grant       	GM_listValues
// @grant       	GM_deleteValue
// ==/UserScript==

(function(){ 

//speed up indexing notes!
//Amount of notes requested on each index-cycle.
//But: progressbar can only update once a cycle!
	//numbers for a 380 Notes Scan:
	//370:	4884 ms needed	- 77,8 Notes/s
	//100:	6487 ms needed	- 58,6 Notes/s <-standard
	//50:	7950 ms needed	- 47,8 Notes/s
	//10:	17714 ms needed	- 21,5 Notes/s
	
//if you've got around 10.000 Notes (default: 2.8 min) you can reduce the time by settings this number higher!
//Any Value above 100 will increase the update-speed and decrease how often the Progressbar is updated.
//Any Value above your total amount of Notes won't make a difference.

var note_index_steps=100;



//remove the /* and */ and reload to remove all stored data!
//Put them back to use the script afterwards!
/*
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
	  GM_deleteValue(key);
	}
*/

var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var DiFi=unsafeWindow.DiFi;

var noteauthor=[]; //list of authors
var notetitle=[]; //list of titles
var notetext=[]; //list of word -> list of index for other lists
var notedata=[]; //note-id, folder, note-date 
var noteamount=[]; //count , updatedate

var safheader=""; //old note-menu stored to be restored when leaving search
var lastactfolder=""; //last active folder for continue indexing
var aktfolder=""; //current selected folder (per dropdown)
var aktindexfirstnoteid=""; //last note scanned in indexing -> used in updating index.
var totalamm; //total amount of notes in current folder
var newaddedli; // added notes used by checknewnotes
var toindexnoteoffsets=[]; //note's offset that still needs to be scanned
var resarr=[]; //array of note-indices that matches the current search
var aktsort=4; // sorting of search results: up&down: 01 name|23 author|45 date

var GM_setValue; //indexedDB: replace GM_functions!
var transaction; //indexedDB
var objectStore; //indexedDB

//style
var sty=document.createElement("style");
sty.innerHTML="h2.dev_note_search2_search input[type='text']{"+
	"background-color: #BBCCBA;"+
    "border: 1px inset #5E7264;"+
    "border-radius: 7px;"+
    "color: #3C4441;"+
    "display: inline-block;"+
    "margin-left: 10px;"+
    "padding: 2px;"+
	"padding-left:4px;"+
	"width:70%;"+
    "vertical-align: middle;}"+
"div.dev_note_header{"+
	"background: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(255,255, 255, 0.5) 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);"+
	"padding: 0 0 0 6px!important;height:20px;}"+
"div.dev_note_header>div{"+
	"height:20px;cursor:pointer;}"+
"li.dev_noteentry>span, div.dev_note_header>div{"+
	"display:inline-block;"+
	"width:33.33%;"+
	"}"+
"#dev_note_search2_search_info{"+
	"font-size:8pt;width:30%;margin:0;}"+
"li.dev_noteentry{"+
	"min-height: 5px !important;"+
	"cursor:pointer;"+
	"padding:6px 0 6px 6px!important;"+
	"}"+
"h2.dev_note_search2_search span{"+
	"margin-left: 10px;"+
	"width: 80px;"+
	"display: inline-block;"+	
	"vertical-align: middle;"+	
	"font-size:10pt;}"+
"#dev_note_search2_search_index, #dev_note_search2_removeall_index{"+
	"position:absolute;right:0;height:18px;font-size:8pt;padding:0;"+
	"}"+
"#dev_note_search2_removeall_index{right:70px;}"+
"h2.dev_note_search2_search span.dev_note_search2_search_header{"+
	"font-size:14pt;height:30px;display:inline-block;}"+
".dev_aktsort_down{"+
	// "background: linear-gradient(0deg, #afdbae 0%, #E4F4E3 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);}"+
	"background: linear-gradient(0deg, rgba(175,155,40,0.2) 0%, rgba(72, 194, 27, 0.5) 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);}"+
".dev_aktsort_up{"+
	"background: linear-gradient(180deg, rgba(175,155,40,0.2) 0%, rgba(72, 194, 27, 0.5) 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);}"+
"h2.dev_note_search2_search input[type='submit'],h2.dev_note_search2_search select{"+
	"border-radius: 7px;"+
	"background: linear-gradient(0deg, #E2E9E3, #D3DFD5) repeat scroll 0 0 transparent;"+
	"border: 1px solid #93A98F;"+
	"padding: 3px;"+
	"margin: 6px;"+
	"float: left;"+
	"cursor:pointer;"+
	"color: #2C3635;}"+	
"h2.dev_note_search2_search input[type='submit']:active{"+
	"border:1px inset #93A98F;"+
	"background: linear-gradient(180deg, #E2E9E3, #B5C9B8) repeat scroll 0 0 transparent;}";
	
document.body.appendChild(sty);

//removes all elements of array subtrahend from array minuend with creating a new one.
function arrsubstract(minuend, subtrahend){
	var ruckarr=[];
	for(var i=0;i<minuend.length;i++)
		if(subtrahend.indexOf(minuend[i])==-1)ruckarr.push(minuend[i]);
	return ruckarr;
}
//merges two array unique into a 3rd one.
function arrmerge(arr1, arr2){
	var ruckarr=getUnique(arr1);
	if(arr2==null)return arr1;
	if(arr1==null)return arr2;
	for(var i=0;i<arr2.length;i++)
		if(ruckarr.indexOf(arr2[i])==-1)ruckarr.push(arr2[i]);
	return ruckarr;
}
//makes an array unique
function getUnique(arr){
   var u = {}, a = [];
   if(arr==null)return arr;
   for(var i = 0, l = arr.length; i < l; ++i){
      if(u.hasOwnProperty(arr[i])) {
         continue;
      }
      a.push(arr[i]);
      u[arr[i]] = 1;
   }
   return a;
}
//returns an array with all elements from two array that are in both.
function getintersection(arr1,arr2){
	var resarr=new Array();
	if(arr1==null)return arr2;
	if(arr2==null)return arr1;
	for (var i = 0; i < arr1.length; i++) {
		if (arr2.indexOf(arr1[i]) != -1) {
			resarr.push(arr1[i]);
		}
	}
	return resarr;
}

//remove slashes from string
function stripslashes(str) {
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\0/g,'\0');
	str=str.replace(/\\\\/g,'\\');
	return str;
}
    
//takes a quary-string and returns a list of matched note-indices (regarding the script-lists)
//"" and * are handled here, + and - on the click-event.
function search(query,mode){ //mode: 0:author, 1: title, 2:text
	var returnarr=[];
	if(query==""||query=="*")return null; //empty searches
	query=query.toLowerCase(); //case insensitive
	
	var inquote=false; //this block replaces all spaces with $ within quotes.
	for(var i=0;i<query.length;i++){
		if(inquote){
			if(query[i]==" ")query=query.substr(0,i)+"$"+query.substr(i+1);
			if(query[i]=="\""||query[i]=="'")inquote=false;
		}else{
			if(query[i]=="\""||query[i]=="'")inquote=true;
		}
	}
	
	query=query.replace(/["']/g,""); //remove quotes. protected spaces are now $
	switch(mode){
	case 0: //author search
		var searchwords=query.split(" ");
		for(var j=0;j<searchwords.length;j++){ //any of those words
			for(var i=0;i<noteauthor[aktfolder].length;i++){ //all found note-indices
				if(noteauthor[aktfolder][i].toLowerCase().indexOf(searchwords[j].replace(/\$/g," "))!=-1)returnarr.push(i); //add found note-index to return-array if not already part of
			}
		}
		break;
	case 1: //title search: like author
		var searchwords=query.split(" ");
		for(var j=0;j<searchwords.length;j++){
			for(var i=0;i<notetitle[aktfolder].length;i++){
				if(notetitle[aktfolder][i].toLowerCase().indexOf(searchwords[j].replace("$"," "))!=-1)returnarr.push(i);
			}
		}
		break;
	case 2: //text search:
		var searchwords=query.split(" ");
		for(var i=0;i<searchwords.length;i++){
			if(searchwords[i].split("$").length==1){ //no protected spaces/quotes:
				if(searchwords[i][searchwords[i].length-1]=="*" && searchwords[i][0]=="*"){ //*-cases: *word*
					searchwords[i]=searchwords[i].substr(1,searchwords[i].length-2); //make *word* to word
					for(var w in notetext[aktfolder]){ //go through all stored keywords
						if(w.indexOf(searchwords[i])!=-1){ //a keyword contains "word"
							for(var j=0;j<notetext[aktfolder][w].length;j++) //add all note-indices of this word to the returnlist (if not already there)
								returnarr.push(parseInt(notetext[aktfolder][w][j]));
						}
					}
				}else if(searchwords[i][searchwords[i].length-1]=="*"){ //*-cases: word*
					searchwords[i]=searchwords[i].substr(0,searchwords[i].length-1); //word* -> word
					for(var w in notetext[aktfolder]){
						if(w.indexOf(searchwords[i])==0){ //keyword beginns with "word"
							for(var j=0;j<notetext[aktfolder][w].length;j++)
								returnarr.push(parseInt(notetext[aktfolder][w][j]));
						}
					}
				}else if(searchwords[i][0]=="*"){ //*-cases: *word
					searchwords[i]=searchwords[i].substr(1); //*word -> word
					for(var w in notetext[aktfolder]){
						if(w.indexOf(searchwords[i])==w.length-searchwords[i].length){ //keyword ends with "word"
							for(var j=0;j<notetext[aktfolder][w].length;j++)
								returnarr.push(parseInt(notetext[aktfolder][w][j]));
						}
					}
				}else{ //no * case
					if(typeof notetext[aktfolder][searchwords[i]]!= "undefined"){
						for(var j=0;j<notetext[aktfolder][searchwords[i]].length;j++)//add all note-indices of this word to the returnlist (if not already there)
							returnarr.push(parseInt(notetext[aktfolder][searchwords[i]][j]));
					}
				}
			}else{ //protected spaces/quotes -> $
				returnarr=returnarr.concat(search(searchwords[i].replace(/\$/g," ").trim(),mode)); 
				//make a normal search like there were no "
				var leerwords=searchwords[i].split("$"); //words within quotes
				var aktretarr=returnarr;
				//now make a difi-request: get the full text of the notes that matches the normal search and check if the originally search matches their text. 
				//if yes, the note with the data-noteid-property will get removed.
				for(var j=0;j<aktretarr.length;j++){ 
					DiFi.pushPost('Notes', 'display_note', [aktfolder,notedata[aktfolder][aktretarr[j]][0]],function(success,data){
						var notetext=$(data.response.content.body).find("textarea.mcb-body").html();
						var swords=/[^ \$]*\$([^ \$]*\$?)*/g
						var row="";
						while(row=swords.exec(query)){
							var spacedwords=row[0].replace("$"," ");
								if((notetext.indexOf(spacedwords)==-1&&notetext.indexOf("*")==-1)||
								(spacedwords.indexOf("*")!=-1)&&notetext.match(new RegExp(spacedwords.replace(/\*/g,"[^ ]*?"),"i"))==null){
									$("li.note[data-noteid="+data.response.content.noteid+"]").remove();
								}
						}
						notetext
					});
					
				}
				// DiFi.timer(2000); //just for record: this will do send() after 2s.				
				DiFi.send(); //bunch the pushpost before sending makes it into one request which is faster.				
			}
		}
		break;
	}
	return returnarr;
}

//load the data from indexedDB for this folder
//will be called the number of folders times.
function loaddata(folder){
	transaction = db.transaction(["devnotesearch2"], "readwrite"); //new transaction for getting data
	var objectStore = transaction.objectStore("devnotesearch2"); 
	transaction.onerror = function(event) { //in case of an error, something went wrong...
		console.log(event)
	};  
	//mozilla's homepage: defining onsuccess after calling get would be fine...
	//if not found, get will also succeed, but with event.target.result=undefined.	
	objectStore.get("noteauthor_"+folder).onsuccess=function(event){ //load authorlist
		if(typeof event.target.result!="undefined")noteauthor[folder]=eval(event.target.result.value);
	};
	objectStore.get("notetitle_"+folder).onsuccess=function(event){//load titlelist
		if(typeof event.target.result!="undefined")notetitle[folder]=eval(event.target.result.value);
	};
	objectStore.get("notedata_"+folder).onsuccess=function(event){ //load data-list (see header-variables)
		if(typeof event.target.result!="undefined")notedata[folder]=eval(event.target.result.value);
	};
	objectStore.get("noteamount_"+folder).onsuccess=function(event){ //load stored amount and last update
		if(typeof event.target.result!="undefined")noteamount[folder]=eval(event.target.result.value);
	};
	objectStore.get("toindexnoteoffsets").onsuccess=function(event){ //load last indexed note.
		if(typeof event.target.result!="undefined")toindexnoteoffsets=eval(event.target.result.value);
	};
	objectStore.get("lastindexfolder").onsuccess=function(event){ //load last indexed folder
		if(typeof event.target.result!="undefined")lastindexfolder=event.target.result.value;
	};
	objectStore.get("notetext_"+folder).onsuccess=function(event){ //load all the content-data (word-lists)
		if(typeof event.target.result=="undefined")return;
		
		//word(18)noteid(19)wordpos(18)noteid(19)wordpos(17)word(18)noteid(19)wordpos
		var rawdata=event.target.result.value.split(String.fromCharCode(17));
		var zrawdata1="", zrawdata2="";
		notetext[folder]=new Array();
		for(var i=0;i<rawdata.length;i++){
			zrawdata1=rawdata[i].split(String.fromCharCode(18)); //noteid(19)wordpos
			zrawdata2=zrawdata1.shift(); //word
			notetext[folder][zrawdata2]=zrawdata1;
		}
		
		//display the info-text
		$("#dev_note_search2_search_folders").change();
	};
}

//convert the note's message into word-list entries
function adddata(message, noteid, folder){
	var elements=message.replace(/[\W\s]/g," ").replace(/ {2,}/," ").split(" "); //only \w-character words are liked. numbers are part of \w
	for(var i =0;i<elements.length;i++){ //all new words
		if(typeof elements[i]=="undefined"||elements[i]==""||elements[i][0]==" ")continue; //empty words and strange accidents don't count.
		elements[i]=elements[i].toLowerCase(); //case insensitive
		if(typeof notetext[folder][elements[i]]=="undefined"){ //word not yet listed
			notetext[folder][elements[i]]=new Array(); //new list
			notetext[folder][elements[i]].push(noteid); //with this note's index (pointing to other lists) as entry
		} else { //word already part of list
			if($.inArray(noteid, notetext[folder][elements[i]])==-1 //this note is not already added (e.g. 2 times word in a note)
			&&notetext[folder][elements[i]].push) //and the array is legit
				notetext[folder][elements[i]].push(noteid); //then add this note's index (pointing to other lists)
		}
		
	}
}

//this goes from newest to oldest note until it finds a note with the last indexed note id, stored in noteamount[folder][2]
//this is actually how getnotes() also looked like before made pausable and turning the pushposts into bunches.
function checknewnotes(folder,offset){	
if(offset==40)return;
	//in case there is no last indexed id as there was no index, make a full index
	if(typeof notetext[folder]=="undefined"&&totalamm!=-1){getnotes(folder,Math.floor(totalamm/10)*10,true);return;}
	
	if(totalamm==-1){ //folder unknown full
		noteauthor[folder]=new Array(); //everywhere 0!
		notetitle[folder]=new Array();
		notetext[folder]={};
		notedata[folder]=new Array();
		noteamount[folder]=[0,(new Date).toLocaleString(),""];
		lastindexfolder=folder;
		aktindexfirstnoteid="";
		var intex="";
		saveindexnotes(folder, intex); //save 0...
		$("#dev_note_search2_search_folders").change();	//display 0 Notes indexed	
	}
	
	DiFi.pushPost('Notes', 'display_folder', [folder,offset,false],function(success,data){
		var aktsite=$(data.response.content.body); //parse note-page (<10 notes)
			aktsite.find("li.note").each(function(){ //break when the last indexed note was found. All notes before that (newer) will be in newaddedli.
				if($(this).attr("data-noteid")!=noteamount[folder][2]){
					newaddedli=newaddedli.add($(this));
				}else
					return false; //false will break the each-loop
			});
			if(newaddedli.length==0)return; //no new notes
			if(aktsite.find("li.note[data-noteid='"+noteamount[folder][2]+"']").length==0&&aktsite.find("li.note").length>0){ //the last indexed note is not on this site
				// console.log(aktsite.find("li.note[data-noteid='"+noteamount[folder][2]+"']"),aktsite.find("li.note[data-noteid='"+noteamount[folder][2]+"']").length);
				checknewnotes(folder,offset+10); //recursive call to scan the next page.
			}else{
				//reverse order of found new notes (convert to oldes->newest)
				// console.log(newaddedli);
				$(newaddedli.get().reverse()).each(function(){
					
					if(NoteAlreadyScanned($(this).attr("data-noteid"),folder))return;
					
					//username is a must have.
					if($(this).find("span.sender a.username,span.sender span.username").html()==null){
						console.log("no username",$('<div>').append($(this).clone()).html());
						return;
					}
					if(typeof $(this).find("div.note-preview").html()=="undefined"){
						// console.log("note-preview not found at Note-offset "+data.response.content.offset);
						noteauthor[folder].push($(this).find("span.sender a.username,span.sender span.username").html());
						notetitle[folder].push($(this).find("span.subject a").html());
						
						var dstime=Date.parse($(this).find("span.ts").attr("title"));
						if(isNaN(dstime))dstime=Date.parse($(this).find("span.ts").html());
						aktindexfirstnoteid=$(this).attr("data-noteid");
						notedata[folder].push(new Array($(this).attr("data-noteid"),
							$(this).find("span.subject a").attr("data-folderid"),
							dstime));
						
						return;
					}
						
				
					noteauthor[folder].push($(this).find("span.sender a.username,span.sender span.username").html());
					//otherwise noteauthor has a problem
					notetitle[folder].push($(this).find("span.subject a").html());
					//title just assumes, there is a note title
					//no convert and add the text into word-list.
					//note-preview contains the whole text, but without linebreaks(spaces inserted) and without html
					//notedata[folder].length is the new index after this entry is pushed into notedata!
					adddata($(this).find("div.note-preview").html(),notedata[folder].length,folder);
					//parse the time when the note was sent/recieved.
					var dtime=Date.parse($(this).find("span.ts").attr("title"));
					if(isNaN(dtime))dtime=Date.parse($(this).find("span.ts").html());
					//the display switches: one says the date, one xx minutes ago.
					
					aktindexfirstnoteid=$(this).attr("data-noteid"); //last indexed note will be overwritten untill the newset index.
					//add note-id, folderid and recieved date to notedata.
					notedata[folder].push(new Array($(this).attr("data-noteid"),
						$(this).find("span.subject a").attr("data-folderid"),
						(new Date(dtime)).toLocaleString()));
				});
				
				var intex="";
				saveindexnotes(folder,intex);

				//progressbar and title
				$("#dev_note_search2_search_index").css("background-image","").attr("title","100%: "+noteauthor[folder].length+"/"+totalamm+", "+Math.round(100*(intex.length+uneval(noteauthor[folder]).length+uneval(notetitle[folder]).length+uneval(notedata[folder]).length)/1024/1024)/100+"MB storage used");

			}
		// }
	});
	DiFi.send();
}
 
// var aktstartdat; //time measurement.

//saves the values to indexedDB!
function saveindexnotes(folder, intex){ 
	for(var el in notetext[folder]){//convert word-list into a string. saves some bytes in contrast to uneval().
		intex+=String.fromCharCode(17)+el+String.fromCharCode(18)+notetext[folder][el].join(String.fromCharCode(18)); 
	}
	
	//noteamount, updatedate and last indexed note to be changed
	noteamount[folder]=[noteauthor[folder].length,(new Date).toLocaleString(),aktindexfirstnoteid];

	//elements in folder...
	//this updates info-text during scan
	if(typeof noteamount[aktfolder]!="undefined"&&noteamount[aktfolder].length>1)
		$("#dev_note_search2_search_info").html(noteamount[aktfolder][0]+" Notes fetched<br/> Updated on"+noteamount[aktfolder][1]);
	
	// setTimeout(function(){ //neded for the original GM_setValue. Now IndexDb
		GM_setValue("notetext_"+folder,intex.substr(1));
		GM_setValue("noteauthor_"+folder,uneval(noteauthor[folder]));
		GM_setValue("notetitle_"+folder,uneval(notetitle[folder]));
		GM_setValue("noteamount_"+folder,uneval(noteamount[folder]));				
		GM_setValue("notedata_"+folder,uneval(notedata[folder]));				
		GM_setValue("toindexnoteoffsets",uneval(toindexnoteoffsets));
		GM_setValue("lastindexfolder",uneval(lastindexfolder));
	// },0);
}
function NoteAlreadyScanned(id,folder){
	for(var i=0;i<notedata[folder].length;i++)
		if(notedata[folder][i][0]==id)return true;
	return false;
}

//index your notes anew or continue after break.
function getnotes(folder,offset,neu){ 
console.log(folder,offset,neu,totalamm,toindexnoteoffsets);
	if(totalamm==0){ //folder empty
		noteauthor[folder]=new Array(); //everywhere 0!
		notetitle[folder]=new Array();
		notetext[folder]={};
		notedata[folder]=new Array();
		noteamount[folder]=[0,(new Date).toLocaleString(),""];
		lastindexfolder=folder;
		aktindexfirstnoteid="";
		var intex="";
		saveindexnotes(folder, intex); //save 0...
		$("#dev_note_search2_search_folders").change();	//display 0 Notes indexed	
		return;
	}
	if(neu){ //indexing started
		if(toindexnoteoffsets.length>0){return;} //already running!
		noteauthor[folder]=new Array();
		notetitle[folder]=new Array();
		notetext[folder]={};
		notedata[folder]=new Array();
		noteamount[folder]=new Array();
		lastindexfolder=folder;
		aktindexfirstnoteid="";
		for(var i=offset;i>=0;i-=10) //create all note-offset I want to scan! offset=(page-1)*10.
			toindexnoteoffsets.push(i); //go from high to 0: old notes first!
	}
	console.log(toindexnoteoffsets); //show me all offsets you plan on scanning!
	if(offset==-10){ //finished: all notes scanned, toindexnoteoffsets empty.
		var intex="";
		saveindexnotes(folder, intex); //save all data.
		//update progressbar
		$("#dev_note_search2_search_index").css("background-image","").attr("title","100%: "+noteauthor[folder].length+"/"+totalamm+", "+Math.round(100*(intex.length+uneval(noteauthor[folder]).length+uneval(notetitle[folder]).length+uneval(notedata[folder]).length)/1024/1024)/100+"MB storage used");
		//update info-text
		$("#dev_note_search2_search_folders").change();
	}else{
		var runter=note_index_steps; //number of offsets within a request. Is set at top. default 100
		if(offset%note_index_steps!=0)runter=offset%note_index_steps; //360: first 6*10, then only 10*10.
		for(var i=0;i<toindexnoteoffsets.length&&i<runter/10;i++){ //bunch of difi-posts.
			console.log(toindexnoteoffsets[i]); //tell me which request you are doing!
			DiFi.pushPost('Notes', 'display_folder', [folder,toindexnoteoffsets[i],false],function(success,data){
				//remove offset from list
				toindexnoteoffsets.splice(toindexnoteoffsets.indexOf(parseInt(data.response.content.offset)),1);
				//update progressbar
				$("#dev_note_search2_search_index").css("background-image","linear-gradient(90deg, #9AD15F "+(Math.round((totalamm-toindexnoteoffsets.length*10)/totalamm*100))+"%, #D3DFD5 "+(Math.round((totalamm-toindexnoteoffsets.length*10)/totalamm*100)+10)+"%)").attr("title",Math.round((totalamm-toindexnoteoffsets.length*10)/totalamm*100)+"%: "+(totalamm-toindexnoteoffsets.length*10)+"/"+totalamm);
				//get jquery-object for notes page
				var aktsite=$(data.response.content.body);
				if(aktsite.find("li.note").length!=0){ //no empty pages
					//reverse order for oldes to newest notes!
					$(aktsite.find("li.note").get().reverse()).each(function(){
						// see checknewnotes for this
						if(NoteAlreadyScanned($(this).attr("data-noteid"),folder))return;
						if($(this).find("span.sender a.username,span.sender span.username").html()==null){
							console.log("no username",$('<div>').append($(this).clone()).html());
							return;
						}
						if(typeof $(this).find("div.note-preview").html()=="undefined"){
							// console.log("note-preview not found at Note-offset "+data.response.content.offset);
							noteauthor[folder].push($(this).find("span.sender a.username,span.sender span.username").html());
							notetitle[folder].push($(this).find("span.subject a").html());
							
							var dstime=Date.parse($(this).find("span.ts").attr("title"));
							if(isNaN(dstime))dstime=Date.parse($(this).find("span.ts").html());
							aktindexfirstnoteid=$(this).attr("data-noteid");
							notedata[folder].push(new Array($(this).attr("data-noteid"),
								$(this).find("span.subject a").attr("data-folderid"),
								dstime));
								
							// console.log("no note-preview",$('<div>').append($(this).clone()).html());
							return;
						}
						
						noteauthor[folder].push($(this).find("span.sender a.username,span.sender span.username").html());
						notetitle[folder].push($(this).find("span.subject a").html());
						
						adddata($(this).find("div.note-preview").html(),notedata[folder].length,folder);
						var dtime=Date.parse($(this).find("span.ts").attr("title"));
						if(isNaN(dtime))dtime=Date.parse($(this).find("span.ts").html());
						aktindexfirstnoteid=$(this).attr("data-noteid");
						notedata[folder].push(new Array($(this).attr("data-noteid"),
							$(this).find("span.subject a").attr("data-folderid"),
							dtime));
					});
					saveindexnotes(folder);
					
					//all note's scanned: call the finish-feature of this functio
					//are note_index_steps note scanned at once, you can scan the next note_index_steps Notes!
					if(toindexnoteoffsets.length==0)getnotes(folder,-10,false); else
					if((toindexnoteoffsets.length*10-10)%note_index_steps==0)getnotes(folder,(toindexnoteoffsets.length*10-10),false);
					console.log("toindexnoteoffsets",toindexnoteoffsets);
				}
			});
		}
		DiFi.send();
	}
}

function addlayout(){
	aktfolder="1"; //standard is inbox.
	aktsort=4; //standard is sorting results with date
	resarr=[]; //show no notes at the beginning (index of notes to show)
	
	//search-entry on the left
	var tab=$('<a class="f folder-link dev_search_tab" title="Search" href="#" onclick="return false;" id="dev_note_search2_tab"><i class="icon i1"></i><span class="ttext">Search</span></a>');
	//make the search-form undo-able
	$("div.messages-menu div.pager-holder div.pager2 div.page2").children().click(function(){
		if(safheader!=""){
			$("h2.mczone-title").empty();
			$("h2.mczone-title").css("height","");
			$("h2.mczone-title").first().append(safheader);
		}
		if(lastactfolder!=""){ //switch to last selected folder!
			lastactfolder.addClass("selected");
			$("#dev_note_search2_tab").removeClass("selected");
		}		
	});
	$("div.messages-menu div.pager-holder div.pager2 div.page2 div.header").first().after(tab); //insert "search"
    tab.click(function(event){//and click event
		event.preventDefault();
		event.stopPropagation(); //no parent-clicks needed!
		$(".dev_note_header").remove(); //no double search forms!
		//folder where you came from
		lastactfolder=$("div.messages-menu div.pager-holder div.pager2 div.page2 a.selected").removeClass("selected");
		$("#dev_note_search2_tab").addClass("selected"); //search is now selected
		if($("#dev_note_search2_search_title").length==0)safheader=$("h2.mczone-title").first().children();
    	var header1=$("td.notes-left h2.mczone-title").empty();
    	var header2=$("td.notes-right h2.mczone-title").empty(); //no double search forms!
		header1.addClass("dev_note_search2_search");
		header2.addClass("dev_note_search2_search");

		$( window ).resize(function(){ //adapt search form to window's site
			$("#dev_note_search2_search_info").width($("h2.dev_note_search2_search").eq(1).width()-320);
			$("h2.dev_note_search2_search input[type='text']").width($("h2.dev_note_search2_search").first().width()-130);
		});
		//inset search form
		header1.append($("<span class='dev_note_search2_search_header'>Search:</span><div class='dev_search_formfield'><span>Username:</span><input id='dev_note_search2_search_name' type='text'/></div>"+
		"<div class='dev_search_formfield'><span>Subject:</span><input id='dev_note_search2_search_title' type='text'/></div><div class='dev_search_formfield'><span>Text:</span><input id='dev_note_search2_search_text' type='text'/></div>")).css({"height":"110px","background-size":"contain","padding":"10px 0px"});
		header1.find("input[type='text']").keydown(function(event){ //enter means search!
			if(event.which==13)$("#dev_note_search2_search_submit").click();
		});
		header2.append("<input type='submit' onclick='return false;'  id='dev_note_search2_search_submit' value='Search'/>"+
		"<input type='submit' onclick='return false;'  id='dev_note_search2_search_addindex' value='Refresh'/>"+
		"<select id='dev_note_search2_search_folders'></select><span id='dev_note_search2_search_info'></span>");
		header1.prepend("<input type='submit' onclick='return false;'  id='dev_note_search2_search_index' value='Index Notes'/>");
		header1.prepend("<input type='submit' onclick='return false;'  id='dev_note_search2_removeall_index' value='Reset to Default'/>");
		$("#dev_note_search2_search_addindex").click(function(){ //refresh-button to update index
			//total amount of notes is displayed at each note-folder's rel-attribute
			totalamm=parseInt($("a.folder-link[data-folderid="+aktfolder+"]").attr("rel").replace(/,/g,""));
			newaddedli=$([]);
			checknewnotes(aktfolder,0);
		});
		//load data for each folder and generate the dropdown!
		$("div.messages-menu div.pager-holder div.pager2 div.page2 a.folder-link").not(".dev_search_tab").each(function(){
			if($(this).html()=="Search")return;	
			var wert=$(this).attr("data-folderid");
			 if(typeof(noteamount[wert])=="undefined"){ //only load first
				// setTimeout(function(){
				loaddata(wert);
				// },0);
			 }
			$("#dev_note_search2_search_folders").append("<option value='"+$(this).attr("data-folderid")+"'>"+$(this).attr("title")+"</option>");
		});
		$("#dev_note_search2_search_folders option").first().addClass("selected"); //select "inbox"
		$("#dev_note_search2_search_folders").change(function(){ //change will update the info-text and chooses aktfolder
			if($(this).prop("selectedIndex")==-1)$(this).prop("selectedIndex",0); //stange=first
			aktfolder=$(this).val();

			if(toindexnoteoffsets.length>0){ //continue scan?
				if(confirm("You interrupted the last scan of your folder '"+lastindexfolder+"'.\n Do you want to continue indexing it?")){
					totalamm=parseInt($("a.folder-link[data-folderid="+aktfolder+"]").attr("rel").replace(/,/g,""));
					getnotes(aktfolder,0,false);
				}else{ //no...
					toindexnoteoffsets=[];
					// GM_setValue("toindexnoteoffsets",uneval(toindexnoteoffsets));
					console.log("toindexnoteoffsets",toindexnoteoffsets);
				}
			}
			if(typeof(noteamount[aktfolder])=="undefined") //no indexed notes!
				$("#dev_note_search2_search_info").html("No notes fetched so far!<br/>Press \"Index Notes\"!");
			else //show the indexed note's amount and update-Date in the info-text-field!
				$("#dev_note_search2_search_info").html(noteamount[aktfolder][0]+" Notes fetched<br/> Updated on "+noteamount[aktfolder][1]);
		}).keyup(function() { //using dropdown with keyboard
			$(this).change();
		}).change(); //and do it already once!
		
		$("#dev_note_search2_removeall_index").click(function(){
			location.href="http://www.deviantart.com/messages/notes/#1_0/#killoldindex";
			location.reload();
		});
		$("#dev_note_search2_search_index").click(function(){
			//index notes!
			//total amount of notes is displayed at each rel-attribute
			totalamm=parseInt($("a.folder-link[data-folderid="+aktfolder+"]").attr("rel").replace(/,/g,""));
			if(totalamm==-1){
				newaddedli=$([]);
				checknewnotes(aktfolder,0);
			}else{
				getnotes(aktfolder,Math.floor(totalamm/10)*10,true);
			}
			console.log(totalamm,aktfolder);
		});
		
		//make a search!
		//here is also the actuall search and use of search() defined!
		header2.find("#dev_note_search2_search_submit").click(function(){
			resarr=getUnique(search($("#dev_note_search2_search_name").val(),0)); //search authors
			resarr=getintersection(resarr,search($("#dev_note_search2_search_title").val(),1)); //search titles
			//use intersection to have notes that match author AND title
			var query=$("#dev_note_search2_search_text").val().trim(); //and now the text-search...
			var queryplus=query.match(/\+("[^"]*?"|[^ "]*)/g); //all words with a + before (also +"asd dsa")
			var queryminus=query.match(/-("[^"]*?"|[^ "]*)/g); //same with -
			var querynotplus=query.replace(/(\+|-)("[^"]*?"|[^ "]*)/g,""); //and words with neither
			if(queryplus==null) //no plus words?
				resarr=getintersection(resarr,search(querynotplus,2)); //normal search 
			else{
				for(var i=0;i<queryplus.length;i++){ //otherwise go through all + words
					//and connect their searches with ANDs!
					resarr=getintersection(resarr,search(queryplus[i].substr(1).trim(),2));  
				}
				//at last merge the result with the not-plus words for an stronger OR.
				resarr=arrmerge(resarr,search(querynotplus.trim(),2));
			}
			if(queryminus!=null){ //there were - words.
				var notresarr=search(queryminus.join(" ").replace("-",""),2); //find notes with those words
				resarr=arrsubstract(resarr,notresarr); //and remove them from the list!
			}
			resarr=getUnique(resarr); //in case something got wrong: unique id.
			//WHY ARE THERE STILL DOUBLE ENTRIES?
			
			$("div.dev_aktsort_down,div.dev_aktsort_up").click().click(); //refresh sorting!
			
			displayresarr(); //show found notes!
		});
		
		//note-headers for sorting!
		$("ul.notes").first().before($("<div class='dev_note_header'></div>").append($("<div class='dev_notetitle'>Subject</div>").click(function(){
			$(".dev_aktsort_down").removeClass("dev_aktsort_down");
			$(".dev_aktsort_up").removeClass("dev_aktsort_up");
			if(resarr==null)return; //no notes to sort
			if(aktsort==0){ //toggle between 0 and 1
				$(this).addClass("dev_aktsort_up");
				aktsort=1;
				resarr=resarr.sort(function(a,b){return notetitle[aktfolder][a].toLowerCase()<=notetitle[aktfolder][b].toLowerCase();}); //sort subjects ascending
			}else{
				$(this).addClass("dev_aktsort_down");
				aktsort=0;
				resarr=resarr.sort(function(a,b){return notetitle[aktfolder][a].toLowerCase()>=notetitle[aktfolder][b].toLowerCase();});	//sort subjects descending
			}
			displayresarr(); //show sorted notes
		})).append($("<div class='dev_noteauthor'>Username</div>").click(function(){
			$(".dev_aktsort_down").removeClass("dev_aktsort_down");
			$(".dev_aktsort_up").removeClass("dev_aktsort_up");
			if(resarr==null)return;
			if(aktsort==2){//toggle between 2 and 3
				$(this).addClass("dev_aktsort_up");
				aktsort=3;
				resarr=resarr.sort(function(a,b){return noteauthor[aktfolder][a].toLowerCase()<=noteauthor[aktfolder][b].toLowerCase();});	//sort usernames ascending
			}else{
				$(this).addClass("dev_aktsort_down");
				aktsort=2;
				resarr=resarr.sort(function(a,b){return noteauthor[aktfolder][a].toLowerCase()>=noteauthor[aktfolder][b].toLowerCase();}); //sort usernames descending
			}
			displayresarr();
		})).append($("<div class='dev_notedata dev_aktsort_down'>Date</div>").click(function(){
			$(".dev_aktsort_up").removeClass("dev_aktsort_up");
			$(".dev_aktsort_down").removeClass("dev_aktsort_down");
			if(resarr==null)return;
			if(aktsort==4){//toggle between 4 and 5
				$(this).addClass("dev_aktsort_up");
				aktsort=5;
				resarr=resarr.sort(function(a,b){return notedata[aktfolder][a][2]>=notedata[aktfolder][b][2];});
				//sort dates ascending
			}else{
				$(this).addClass("dev_aktsort_down");
				aktsort=4;
				resarr=resarr.sort(function(a,b){return notedata[aktfolder][a][2]<=notedata[aktfolder][b][2];});	
				//sort dates descending
			}
			displayresarr();
		})));
		displayresarr(); //show no notes at the beginning
    });	
	
}
function displayresarr(){ //show the notes which indices are in resarr
	var body=$("ul.notes").first();
	body.empty(); //empty the old displayed list
	
	if(resarr==null)return; //new list empty?
	for(var i=0;i<resarr.length;i++){		
		//append a new li for every note. info and style are also inserted. also note-id in ''.
		body.append($("<li class='dev_noteentry "+(i%2==0?"even":"odd")+" note ui-draggable' data-noteid='"+notedata[aktfolder][resarr[i]][0]+"' data-folderid='"+notedata[aktfolder][resarr[i]][1]+"'  data-cached='false'>"+
			"<span class='dev_notetitle'>"+notetitle[aktfolder][resarr[i]]+"</span>"+
			"<span class='dev_noteauthor'>"+noteauthor[aktfolder][resarr[i]]+"</span>"+
			"<span class='dev_notedata'>"+(new Date(notedata[aktfolder][resarr[i]][2])).toLocaleString()+"</span>"+
		"</li>").click(function(){ //click on the li:
			$("li.current-note").removeClass("current-note");
			$(this).addClass("current-note"); //note highlight
			location.href=location.href.replace(/\/\d+$/,"")+"/"+$(this).attr("data-noteid"); //adapt displayed url!
			DiFi.pushPost("Notes","display_note",[$(this).attr("data-folderid"),$(this).attr("data-noteid")],function(success,data){ //display the note via difi!
				$("div.push").first().html("<a id=\"note-body\" class=\"anchor\"></a>"+
				stripslashes(data.response.content.body)); //difi slashes lot of things...
				$("div.note-controls.current-note-actions").css("display",""); //otherwise, the buttons are hidden...
			});
			DiFi.send();
		}));
	}
}
var db;
function indexedDBinit(neu){
	//indexedDB:
	if(location.href.substring(location.href.length-("#killoldindex").length)=="#killoldindex"){
		indexedDB.deleteDatabase('devnotesearch2');
		location.href="http://www.deviantart.com/messages/notes/#1_0/";
	}
	var request = indexedDB.open("devnotesearch2",1);
		
	request.onerror = function(event) {
		console.log(event);
	};
	request.onupgradeneeded = function(event) { 
	  // console.log("onupgradeneeded");
	  if(event!=null)db = event.target.result;
	  var objectStore = db.createObjectStore("devnotesearch2",{keyPath:"name"});
	  objectStore.createIndex("name", "name", { unique: true });
	}
	request.onsuccess = function(event) {
		// console.log("onsuccess");
		db = request.result;
		db.onabort = function(e) {
			db.close();
			db = null;
		 }
		// console.log("onupgradeneeded");
		// db = event.target.result;
		// var objectStore = db.createObjectStore("devnotesearch2",{keyPath:"name"});
		// objectStore.createIndex("name", "name", { unique: true });
		try{
			transaction = db.transaction(["devnotesearch2"], "readwrite");
		}catch(e){
			request.onupgradeneeded(null);
			return;
		}
		objectStore = transaction.objectStore("devnotesearch2");
		var putter=objectStore.put({name:"test",value:"erfolgreich"});
			putter.onerror=function(event){console.log("ERR:",event);};
			putter.onsuccess=function(event){};
		objectStore.get("test").onsuccess=function(event){ //load authorlist
			if(typeof event.target.result!="undefined")console.log(event.target.result.value);
		};
			
		transaction.onerror = function(event) {
			console.log(event)
		};  
		GM_setValue=function(Gname,Gvalue){//{name:Gname,value:Gvalue}
			// transaction = db.transaction(["devnotesearch2"], "readwrite");
			// var objectStore = transaction.objectStore("devnotesearch2");
			// transaction.onerror = function(event) {
				// console.log(event)
			// };  
			items.push({name:Gname,value:Gvalue});
			if($("#overlaysavingprocess").length==0)
				$("body").append($("<div style='height:20px;width:100px;position:fixed;background-color:#aaffaa;color:#008800;top:50%;left:50%;margin-top:-10px;margin-left:-50px;border:1px solid green;z-index:99;border-radius:5px;text-align:center;line-height:20px;' id='overlaysavingprocess' len=1>Saving Data...</div>"));
			else
				$("#overlaysavingprocess").attr("len",parseInt($("#overlaysavingprocess").attr("len"))+1);
			// var putter=objectStore.put(data);//{name:Gname,value:Gvalue}
			// putter.onerror=function(event){console.log("ERR:",event);};
			// putter.onsuccess=function(event){
				// $("#overlaysavingprocess").attr("len",parseInt($("#overlaysavingprocess").attr("len"))-1);
				// if($("#overlaysavingprocess").attr("len")==0)$("#overlaysavingprocess").remove();
			// };
			if(!safeworking)putNext();
		};
		function putNext() {
			if(!safeworking){
				transaction = db.transaction(["devnotesearch2"], "readwrite");
				objectStore = transaction.objectStore("devnotesearch2");
			}
            if (items.length>0){
                safeworking=true;
                objectStore.put(items.shift()).onsuccess = putNext;
				$("#overlaysavingprocess").attr("len",parseInt($("#overlaysavingprocess").attr("len"))-1);
				if($("#overlaysavingprocess").attr("len")==0)$("#overlaysavingprocess").remove();
            } else {   // complete
                safeworking=false;
            }
        }   
		addlayout();
	};
}
var items=[];
var safeworking=false;
indexedDBinit();
})();