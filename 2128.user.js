// PFZ1.5 user script
// ==UserScript==
// @name FBI!
// @description Script om mogelijkheden voor PFZ2 te promoten 
// @include http://www.phpfreakz.nl/forum.php*
// @include http://phpfreakz.nl/*
// @include http://82.150.156.163/*
// ==/UserScript==
// unless otherwise mentioned all code is by Chris Hayes, 2005 chayes@antenna.nl
// The functions to move Options in Select boxes are taken almost without change from Matt Kruse's functions 
// http://www.mattkruse.com/javascript/selectbox / matt@mattkruse.com 
// 
// For the editscreen I was inspired by Mark Pilgrims' Monkey_Do userscript for the CSS style elements I use to show the form
// http://diveintomark.org/projects/greasemonkey/


/* bugs
Toevoegen aan shared ban: bericht wordt niet ingeklapt
Als je dan aan eigen blacklist toevoegt, moet je eerst op de + en dan de - klikken.

// als iemand alleen de ?> heeft staan, verschijnt een deel van de popup div.
// als move blocks 0 is, crasht script: getelementbyID(name) is er niet. 
//  solve: zoek uit wie er nog naar blocks ID verwijst bij moveblocks=0

// TO DO: 
// Add "Friend" list (green smiley? plus en minnetjes?)
// give up to 10 blacklist points
// reintroduce images as link
// blocks show [-] when closed, should be [+]
// add way to share mutual blacklist by entering something secret, and to hide references when not activated


 BASIC EXPLANATION OF USED TECHNIQUES
 * Learn how to use GreaseMonkey (end-user of scripts): http://greasemonkey.mozdev.org/using.html
 * Writing scripts: http://greasemonkey.mozdev.org/authoring.html
   - this also explains the xpath method I use to access specific bits of the page.
     the idea is to use [document.evaluate] with a specific search pattern to find specific elements. 
     The result contains [snapshotItem]s, each of which is accessible and can be searched in further 
     by preceding the search pattern with a dot.
*/


//**********************************************************************************		

// JAVASCRIPT FUNCTIONS

//**********************************************************************************		
//javascript for the page
// not accessible for this userscript (?), but for the engineered new page.

  // getObj function
  // get element and style by ID for easier access 
  // a cross-browser version is also available
  // but as Greasemonkey only runs on Firefox, it is just this simplified version
  // *(c): inspired by a longer cross-browser version, original author unknown
// BUG: als een name niet bestaat, crasht het hele script, beetje zonde
	unsafeWindow.getObj=function(name)						
					{   this.obj = document.getElementById(name);
						this.style = document.getElementById(name).style;
					}

  // getCookie function
  // does just that. 
  // *(c): copied from the internet, abundant, author unknown					
	function getCookie(name)
					{ var dc = document.cookie;
						var prefix = name + '=';
							var begin = dc.indexOf('; ' + prefix);
							if (begin == -1) {begin = dc.indexOf(prefix);
															 if (begin != 0) {return null};
															} 
													else begin += 2;
							var end = document.cookie.indexOf(';', begin);
							if (end == -1) end = dc.length;
							return unescape(dc.substring(begin + prefix.length, end));
						}
						

  // togglediv function
  // hides a visible and shows a hidden HTML element (preferably a DIV)
	unsafeWindow.FBI_togglediv=function(div_id)		
				{ var x=new getObj(div_id);
					x.style.display = (x.style.display=='none') ?  'block':'none';
				}
  // toggleblockcontent function
  // hides a visible and shows a hidden HTML element (preferably a DIV)
	unsafeWindow.FBI_toggleblockcontent=function(div_id)		
				{  collapsed_blocks=GM_GETorDEFAULT('collapsed_blocks','|');
				  var x=new getObj(div_id);
					if (x.style.display=='none')
 					{   //unhide
 						x.style.display = 'block';
						blockloc=collapsed_blocks.indexOf('|'+div_id+'|');	
						if (blockloc>=0) collapsed_blocks=collapsed_blocks.substring(0,blockloc)+collapsed_blocks.substring(blockloc+div_id.length+1,collapsed_blocks.length)  ;
 					}
 					else
 					{	//hide
 						x.style.display = 'none';
						if (collapsed_blocks==undefined)collapsed_blocks='|'; 
 						collapsed_blocks+=div_id+'|';
					}
				  GM_setValue('collapsed_blocks',collapsed_blocks)
				}



  // element_visible function
  // depending on value of 'aan' hides or shows a given HTML element (preferably a DIV)
	unsafeWindow.FBI_element_visible=function(veldID,aan)
				{ var x=new getObj(veldID);
				 x.style.display = (aan==1) ?  'block':'none';
				}
			
  // StripName function
  // strips name (actually: ID nr) from BannedUsers
	unsafeWindow.FBI_StripName=function(name)
				{if (BannedUsers.indexOf('|'+name+'|')>=0) 
				 BannedUsers = BannedUsers.substring(0,BannedUsers.indexOf(name))+	BannedUsers.substring(BannedUsers.indexOf(name) + name.length + 1 , BannedUsers.length);
					GM_SET('BannedUsers',BannedUsers);
				}
  // AddName function
  // adds name (actually: ID nr) to BannedUsers
	unsafeWindow.FBI_AddName=function(name)
				{if (BannedUsers.indexOf('|'+name+'|')<0) 
					BannedUsers+=name+'|';
					GM_SET('BannedUsers',BannedUsers);
				}

	unsafeWindow.FBI_bookmark=function()
				{   Bookmarks=GM_GET('Bookmarks');
					//alert(Bookmarks);
					if (Bookmarks.indexOf('|'+name+'|')<0) 
					Bookmarks+=unsafeWindow.location+'@'+prompt('Geef een naam voor deze bladwijzer.','')+'|';
					GM_SET('Bookmarks',Bookmarks);
				}


 // plusminusimagefunction 
 // called when the [+] / [-] image is pressed
 // changes [+] to [-] and vice versa, 
 // changes the tooltop text 
 // the calls specific function PlusClicked or MinusClicked to open/close the message content div
 // (every message of this user)
 // - document.getElementById is a built-in function to get access to a tag with that id
 unsafeWindow.plusminusimagefunction=function(thisy,i)
				 	{thisx=document.getElementById('plusminusimage'+i);
				 		if (thisx.src==plus_src)
				 		{thisx.src=minus_src; 
							thisx.title="Klik om al het commentaar van deze gebruiker te verbergen."
				 			FBI_PlusClicked(i);
				 		}
				 	 else 
				 		{thisx.src=plus_src;
							thisx.title="Klik om al het commentaar van deze gebruiker te tonen."
				 			FBI_MinusClicked(i);
				 		}
				 	}
	unsafeWindow.FBI_PlusClicked=function(i)
				{FBI_ShowComment(i);
				 FBI_StripName(CommentOwners[i+1]);
				 GM_SET('BannedUsers');
				}
	unsafeWindow.FBI_MinusClicked=function(i)
				{FBI_Hide(msgdata['userid'][i+1],i,'self'),
				 FBI_AddName(CommentOwners[i+1]);
				  GM_SET('BannedUsers');
				}
  // hideThem function
  // walks through BannedUsers, and calls FBI_Hide for every banned user in it
  // (for the non-shared blacklist in the cookie)
  // TODO: parameters seem not to be used?! (cleanup)
	unsafeWindow.FBI_hideThem=function(veldID,aan)
				{	ArrBannedUsers=new Array();
					ArrBannedUsers=BannedUsers.split('|');
					for (bu=1;bu<ArrBannedUsers.length-1;bu++)
					{FBI_Hide(ArrBannedUsers[bu],'none','self');
					}
				}


// FUNCTIONS for the userform to make editing of the variables possible:
unsafeWindow.toggle_display=function(div_id){var x=new getObj(div_id); if(arguments.length>1){x.style.display = (arguments[2]) ?  'block':'none';}else x.style.display = (x.style.display=='block') ?  'none':'block';}// hides a visible and shows a hidden HTML element (preferably a DIV)
unsafeWindow.GM_SET = function(name,val){GM_setValue(name,val);}//wrapper
unsafeWindow.GM_GET = function(name){return GM_getValue(name);}//wrapper
unsafeWindow.GM_GETorDEFAULT = function(name,defaultValue){if (!GM_GET(name)) GM_SET(name,defaultValue); return GM_getValue(name);}
unsafeWindow.noprep = function(val) {return val;}//dummy function
unsafeWindow.prepSELECT = function(obj,varname){if(!SELBXhasOptions(obj)){return 'no Options ';}str='|';for(var i=0;i<obj.options.length;i++){str+= obj.options[i].value+'|';}return str;}
// ===================================================================
// The following functions to move OPTIONs in SELECT boxes are selected from the functions by Matt Kruse <matt@mattkruse.com> http://www.mattkruse.com/javascript/selectbox - he made a few more functions, I removed sorters (also calls inside these functions), regexp, add option, delete option.
unsafeWindow.SELBXhasOptions = function (obj){if(obj!=null && obj.options!=null){return true;}return false;}
unsafeWindow.SELBXmoveSelectedOptions = function (from,to){if(!SELBXhasOptions(from)){return;}for(var i=0;i<from.options.length;i++){var o = from.options[i];if(o.selected){if(!SELBXhasOptions(to)){var index = 0;}else{var index=to.options.length;}to.options[index] = new Option( o.text, o.value, false, false);}}for(var i=(from.options.length-1);i>=0;i--){var o = from.options[i];if(o.selected){from.options[i] = null;}}from.selectedIndex = -1;to.selectedIndex = -1; }
unsafeWindow.SELBXselectAllOptions = function (obj){if(!SELBXhasOptions(obj)){return;}for(var i=0;i<obj.options.length;i++){obj.options[i].selected = true;}}
unsafeWindow.SELBXmoveAllOptions = function (from,to){SELBXselectAllOptions(from);if(arguments.length==2){SELBXmoveSelectedOptions(from,to);}else if(arguments.length==3){SELBXmoveSelectedOptions(from,to,arguments[2]);}else if(arguments.length==4){SELBXmoveSelectedOptions(from,to,arguments[2],arguments[3]);}}
unsafeWindow.SELBXswapOptions = function (obj,i,j){var o = obj.options;var i_selected = o[i].selected;var j_selected = o[j].selected;var temp = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);var temp2= new Option(o[j].text, o[j].value, o[j].defaultSelected, o[j].selected);o[i] = temp2;o[j] = temp;o[i].selected = j_selected;o[j].selected = i_selected;}
unsafeWindow.SELBXmoveOptionUp = function (obj){if(!SELBXhasOptions(obj)){return;}for(i=0;i<obj.options.length;i++){if(obj.options[i].selected){if(i != 0 && !obj.options[i-1].selected){SELBXswapOptions(obj,i,i-1);obj.options[i-1].selected = true;}}}}
unsafeWindow.SELBXmoveOptionDown = function (obj){if(!SELBXhasOptions(obj)){return;}for(i=obj.options.length-1;i>=0;i--){if(obj.options[i].selected){if(i !=(obj.options.length-1) && ! obj.options[i+1].selected){SELBXswapOptions(obj,i,i+1);obj.options[i+1].selected = true;}}}}
// ===================================================================
unsafeWindow.addFormElement = function(varname, showtext,elementtype,prepforshow,prepforsave) 
{	if (prepforshow==undefined) prepforshow='noprep';
	if (prepforsave==undefined) prepforsave='noprep';
	if (elementtype=='textarea') return showtext+'<br /><textarea name="' + varname + '"  onChange="GM_SET(\''+varname+'\','+prepforsave+'(this.value));">'+	eval(prepforshow+'(GM_getValue(\''+varname+'\'));' )+'</textarea>' ;
 	 //default: textbox
	return showtext+'<br /><input type="text" name="' + varname + '" value="' +  	eval(prepforshow+'(GM_getValue(\''+varname+'\'));' )+ '"  onChange="GM_SET(\''+varname+'\','+prepforsave+'(this.value));" />' ;
}

/** function addSelectionBoxes
*
* parameters:
* varname			- the name of the variable containing the data, used also to name the form element
* showtext			- text to show in the form (explanation in normal user language)
* elementtype		- e.g. 'inputtext'
* prepforshow   	- name of function to prepare data before display. 'noprep' skips this
* prepforsave     	- name of function to make data ready to be saved again. e.g. prepSELECT
* completeDataArray - Array with ALL options available
* chosenDataString 	- '|'-delimited String of the options chosen in a previous attempt
*
*/

unsafeWindow.addSelectionBoxes = function(varname, showtext,elementtype,prepforshow,prepforsave,completeDataArray,chosenDataString) 
{ box1HTML='';box2HTML='';
  box2HTML_arr=Array();
    //walk through every existing option, and choose to put it as non-chosen (box1) or chosen (box2)
    for (var b1_i=0; b1_i<completeDataArray.length; b1_i++) 
	{ position=chosenDataString.indexOf('|'+completeDataArray[b1_i]+'|');
		if ( position != -1 )
			box2HTML_arr[position]='<OPTION value="'+completeDataArray[b1_i]+'">'+completeDataArray[b1_i]+'</OPTION>';
	 	else box1HTML+='<OPTION value="'+completeDataArray[b1_i]+'">'+completeDataArray[b1_i]+'</OPTION>';
	}
	
	//built a sorted version of box2
    for (var b1_i=0; b1_i<box2HTML_arr.length; b1_i++) 
	{box2HTML+=box2HTML_arr[b1_i];
	}	
	
	
	boxheight=completeDataArray.length;	if (boxheight>10) boxheight=10;
	saveit='GM_SET(\''+varname+'\',prepSELECT(document.forms[\''+formname+'\'][\''+varname+'2\']));';
 return showtext+'<br><table border="01"><tr valign="top"><td>Not used Items'+
	'<select name="'+varname+'1" multiple="multiple" size="'+boxheight+'" ondblclick="SELBXmoveSelectedOptions(this.form[\''+varname+'1\'],this.form[\''+varname+'2\'])">'+
 	box1HTML+'</select></td><td align="center"><br />'+
	'<a href="#" onclick="SELBXmoveSelectedOptions(document.forms[\''+formname+'\'][\''+varname+'2\'],document.forms[\''+formname+'\'][\''+varname+'1\']);'+saveit+'return false;">&lt;</a>'+
	'&nbsp;Selection&nbsp;<a href="#" onclick="SELBXmoveSelectedOptions(document.forms[\''+formname+'\'][\''+varname+'1\'],document.forms[\''+formname+'\'][\''+varname+'2\']);'+saveit+'return false;">&gt;</a><br /><br />'+
	'<a href="#" onclick="SELBXmoveAllOptions(document.forms[\''+formname+'\'][\''+varname+'2\'],document.forms[\''+formname+'\'][\''+varname+'1\']); '+saveit+'return false;">&lt&lt</a>'+
	'&nbsp;All&nbsp;<a href="#" onclick="SELBXmoveAllOptions(document.forms[\''+formname+'\'][\''+varname+'1\'],document.forms[\''+formname+'\'][\''+varname+'2\']); '+saveit+'return false;">&gt;&gt;</a><br />'+
	'</td><td>Move Items Here'+
	'<select name="'+varname+'2" multiple="multiple" size="'+boxheight+'" ondblclick="SELBXmoveSelectedOptions(this.form[\''+varname+'2\'],this.form[\''+varname+'1\']);" onChange="GM_SET(\''+varname+'\','+prepforsave+'(this.form[\''+varname+'2\']));"  >'+
 	box2HTML+'</select><br />'+
	'<input value="&nbsp;Up&nbsp;" onclick="SELBXmoveOptionUp(this.form[\''+varname+'2\']);'+saveit+'" type="button">'+
	'<input value="Down" onclick="SELBXmoveOptionDown(this.form[\''+varname+'2\']);'+saveit+'" type="button">'+
 	'</td></tr></table>';
}
//////END usereditform help functions




//**********************************************************************************		

// 					user-ADAPTable SETTINGS 

//**********************************************************************************		



//INITIALIZE VARIABLES    read them or set default value
var BannedUsers 	= GM_GETorDEFAULT('BannedUsers','|');
var max_messages 	= GM_GETorDEFAULT('max_messages',1300); //max messages to handle (for speed)
var geheimwoord 	= GM_GETorDEFAULT('geheimwoord','*****');

// highlight bad words: optional, as it is causing a second delay with a few words already, causing the unchanged page to be shown already, flashing the new in place later. ugly.
var mark_badwords	= GM_GETorDEFAULT('mark_badwords',0);  //1 (on)or 0 (off)
var badwords		= GM_GETorDEFAULT('badwords',",criminals,criminalz,kriminals,kriminalz,projectje,tog ,in me database,voor school");


// blocks_order: volgorde waarin je de linker en rechter blokken wilt zien (evt weglaten van een blok kan ook! gewoon titel weglaten)
// Vervang spatie door _ . Bij foute spelling wordt de titel genegeerd.
var move_all_blocks	= GM_GETorDEFAULT('move_all_blocks',1);// 1=verplaats naar 1 kant, 0=laat staan
var blokkennaar 	= GM_GETorDEFAULT('blokkennaar','links');//links, none, of anders (i.e. rechts :) )
var blocks_total_arr = ['Recente_topics','Zoeken','Welkom','Menu','Aantal_leden','Opties','Recente_Artikelen','Recente_Scripts'];
var blocks_order = GM_GETorDEFAULT('blocks_order','Recente_topics|FBI|Zoeken|Welkom|Menu|Aantal_leden|Opties|Recente_Artikelen|Recente_Scripts|FBI');


var cookiename = 'DoeiStakker';


var HidePageHeader 	= GM_GETorDEFAULT('HidePageHeader',1);

var NewHeaderHTML	= GM_GETorDEFAULT('NewHeaderHTML',"<table cellpadding=\"4\" width=\"975px\"><tr><td align=\"left\">ADVERTENTIE1</td><td><div class=\"mainhead\">&lt;?PHPFreakz 1.5</div></td><td align=\"right\">ADVERTENTIE2</td></tr></table>");
//GM_GETorDEFAULT('css_style_string',
var css_style_string 	= ''+
	'.FBI_comment{position:absolute;left:300;width:450px;border:1px Solid WindowFrame;background:Infobackground;color:InfoText;padding:3px;z-index:10000;}'+
  '.FBI_hidetable{width:600px;border:0px ;padding:0px;margin:0;}'+
  '.FBI_date{color:#000; border-bottom:1px solid #333;font:11px Arial,Helvetica,sans-serif ;  font-weight: normal; white-space:nowrap;} '+
  '.FBI_title{color:#030; font:16px Arial,Helvetica,sans-serif ;  font-weight: bold; white-space:nowrap;}'+
  '.FBI_title_overview{background:#fff;color:#030; font:12px Arial,Helvetica,sans-serif ;  font-weight: normal; white-space:nowrap;}'+
  '.FBI_uname, .FBI_uname A{color:#003355; font-weight:bold !important; font:15px Arial,Helvetica,sans-serif ;  white-space:nowrap;}'+
  '.FBI_uname_overview {color:#030; background-color:#dfd; font-weight:normal !important; font:12px Arial,Helvetica,sans-serif ;  white-space:nowrap;}'+
  '.FBI_content{width:55em;background:#eee;color:#000; font:14px Arial,Helvetica,sans-serif ;  font-weight: normal; }'+
'.FBI_button,.FBI_button A{font: 9pt Arial !important;font-weight: normal !important;color:#bbb !important;background: #380;margin: 0;padding: 1px 4px 1px 4px;border-top: 1px solid #ddd;border-right: 2px solid #666;border-bottom: 2px solid #666;border-left: 1px solid #ddd;text-decoration:none;}'+
'.FBI_button:hover,.FBI_button A:hover{font-weight: bold;background: #ccff33;color:#390 !important;text-decoration:none;border-top: 2px solid #7a0;border-right: 1px solid #efa;border-bottom: 1px solid #efa;border-left: 2px solid #7a0;}'+
'.FBI_Code_message{cursor:text;border:1px solid darkgreen;overflow:scroll;position:relative;left:20px;width:95%;max-width:700px;max-height:250;white-space:nowrap;font-family:Arial,Courier New,Courier,fixedsys,monospace;background-color:#efefef;}'+
'.mainhead{font-size: 5em; letter-spacing: 4px;	display: block;	line-height: 1em;	color: #666; 	background-color: transparent;	white-space: nowrap; }'+
'.mainhead:before,.mainhead:after{	content: "<?PHPFreakz 1.5"; display: block;}'+
'.mainhead:before{	margin-bottom: -1.05em;	margin-left: 0.1ex;	color: #ccc; 	background-color: transparent;}'+
'.mainhead:after{	margin-top: -1.05em;	margin-left: -0.1ex;	color: #fff; 	background-color: transparent;}' +
'.xtra{	margin: 0px;padding:0px;color: #fff; }'+
'.EditDiv{position: fixed;top: 10px;left: 10px;width: 400px;display:none;overflow: auto;z-index: 99999; color:#464;background: #deb;opacity: 0.9;padding: 4px 4px 1px 4px;-moz-border-radius: 8px; border: 1px solid black; border-top: 1px solid #ddd;border-right: 2px solid #666;border-bottom: 2px solid #666;border-left: 1px solid #ddd;text-decoration:none; margin: 0; font:12px Verdana,Arial, Helvetica,sans-serif;font-weight:bold;}'+
'.EditDiv P,.EditDiv TD{font:12px Verdana,Arial, Helvetica,sans-serif;font-weight:bold;}';// );
//mainhead dropshadow comes from: http://www.phoenity.com/newtedge/drop_shadow/


var What_I_Reacted_on 	= GM_GETorDEFAULT('What_I_Reacted_on','|');
var Bookmarks			= GM_GETorDEFAULT('Bookmarks','|');



//**********************************************************************************		

// 					START

//**********************************************************************************		

// INTERNAL SETTINGS
var start_counting_at=1;//skip navigatie tabel in het TD blok waarin de messages staan

// CHECK VERSION
if (!GM_xmlhttpRequest) { alert('To use the FBI! userscript for PHPFreakz, please upgrade to Firefox 1.5 beta 2 and the newest GreaseMonkey extension for Deerpark: http://greasemonkey.mozdev.org/.'); return; }

//GM_log('awel2');

// disabled: bug in Firefox 1.5 causes error. 
// CHECK that the URL has WWW. included (for cookie) and also make sure it is not http://82.150.156.163/ 
//if (document.location.href.substring(7,10)!="www" AND !(document.location.href='http://www.phpfreakz.nl/forum.php'+unsafeWindow.location.search) alert('Cookies only work ');;

// INJECT NEW CSS STYLES  (prepare)
var node_style = document.createElement('style'); //make new tag Node
    node_style.setAttribute ('type', 'text/css'); //add attribute
    node_style.innerHTML = css_style_string;			//set content. other ways include separate addition of every embedded tag, with its tag atributes and content, step by step.
//GM_log('b');
//BUG: the next line causes errors:
//        Error: Selector expected.  Ruleset ignored due to bad selector.
// followed by: Error: Expected ':' but found ';'.  Declaration dropped.
document.getElementsByTagName('head')[0].appendChild(node_style); //inject at the end of the 1st ([0]) head tag (no there are no more head tags, but added for performance (?))

//GM_log('a');


// a bit of colortweaking: 
// There must be a better way to access the titlestyle,
// I used http://chapnickman.com/2005/03/14/get-style-sheet-values-with-javascript/ to find the css Rule nr, and guessing...
var titlestyle = document.styleSheets[0].cssRules[9].style;
//GM_log('c');
		titlestyle.backgroundColor="#229988";
		titlestyle.color="Black";
		titlestyle.fontWeight="Bold";


//GM_log('IMage Date come now');

// IMAGE DATA 
// these strings are used for the src attribute of IMG tags in stead of a URL
// 
// The strings are easily made from GIF files by going to http://software.hixie.ch/utilities/cgi/data/data and 
// entering the URL of the gif you need. then copy the string made from data: to %3B.
  var plus_src='data:image/gif,GIF89a%0F%00%13%00%91%02%00%00%00%00%FF%FF%FF%FF%FF%FF%00%00%00!%F9%04%01%00%00%02%00%2C%00%00%00%00%0F%00%13%00%00%02%2B%94%8F%A9%CB%ED%0A%A2%9C%00%81%80s%AE%E7j%CD%19%1E6%06%A1P%A6%169%91%EB%06%BEd%DC%7D%B4ho%16E%3D%FE%0F%FC%15%00%00%3B';
  var x_src='data:image/gif,GIF89a%10%00%10%00%C4%00%00%E5fE%E7%85l%F2%B8%A8%E3%5B5%E8vZ%B1%22%00%E3T%2C%E6%A9%93%D75%04%F5%C5%B8%DDI%1E%E1N%23%E8~f%C0Y%3F%DA%3E%0F%BF3%0D%C2%3C%17%DDC%14%E2%60%3E%C0%2C%03%E6lN%EA%95%80%E6pQ%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%05%94%E0%25%8Ed)%1E%01cQ%14%00HF%EC4bu%A0L%A0%AB%AE%F1%88%8CC%A5%12%20%B0%00%94%C0%C0%00%11Y%02%15%91K%B2p.%9A%17J.!Z%8A%12%86%ABHk%E4%8E%04%8A%05%B3K0J%04%22%C1%22%BD%F8%5D%0C%96%15%00~%91%D3%ED%06-%00fq%0A%11%11v%0A%00%16f0_%0B%0E%13%22%0E%06%0C%22%12%98U%17%12%08%92%17%94%00%04%00%03%03T%03%00%11%91%22%08ii1%0Bs%08%A9%05%22%0D%05%13%0F%B9%0F%13%BC%BC%054%26%C1%23!%00%3B';
  var minus_src='data:image/gif,GIF89a%0F%00%13%00%91%02%00%00%00%00%FF%FF%FF%FF%FF%FF%00%00%00!%F9%04%01%00%00%02%00%2C%00%00%00%00%0F%00%13%00%00%02)%94%8F%A9%CB%ED%0A%A2%9C%00%81%80s%AE%E7j%CD%19%DE%87%85%C2H%9A%1EUZ%E4%E6%BE%81*%CF%F1%ABR%D4%C3%F7~_%00%00%3B';
  var eye_src='data:image/gif,GIF89a%17%00%0E%00%F7%00%00%9C%08%08%A5%10%10%A5%18%18%A5!!%AD))%AD11%B599%B5BB%B5JJ%BDJJ%BDZZ%BDcc%C6kk%C6ss%CE%7B%7B%CE%84%84%D6%8C%8C%D6%94%94%D6%9C%9C%DE%9C%9C%DE%A5%A5%DE%AD%AD%DE%B5%B5%E7%B5%B5%E7%BD%BD%EF%D6%D6%F7%DE%DE%F7%E7%E7%F7%EF%EF%FF%EF%EF%FF%F7%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%17%00%0E%00%00%08%DA%00%3F%08%1C%B8A%82%82%02%01%00%04(%A0%20%C2%86%81%10%092H%08%A0%A2%C5%8A%01%18%3C%8C%F8%A1%82%00%00%05%20d%80p%F1%00%04%03%00%04T%88%18!%25%85%81%1C4%7C%E0%40a%00%82%0F%14%3EF%18H%01%A4L%88%18%02%0Cx%B0%81%80%84%0F%1A%0A%00x%99A%C0%80%8D%0A6X%F0%F0%01%25%00%07%16%0E%08%DC0%40%40%06%04%00%2C%0C%0C%E0!e%03%92)%3D%04%18h%01%00%02%B0b%05%0A%F0%40%E0b%DA%B5%02%DB%22h%FAT%20%82%0A%3D%2F%3E%C8%BA%B5k%06%9C%3E%3F%60%18%90%81%82R%02%0E%8D~%D8%A0%F4%A5%C0%96%03V%3A%18%E0p%B2%04%9B%1F%2C%0C%00%B0%13%A2G%00%06%24%2C%B0%7B%20%C2%81%94%2B9n%98h%F7b%C6%8D%1C%B7%1AD%A8%90a%E7%88%01%01%00%3B';
//	var bye_src="data:image/gif,GIF89a)%00.%00%C4%00%00%01%01%01%DB%DB%DB%FF%FF%FE%FF%FF%FF%EB%EB%EB%00%00%00%CF%B3%07%B7gC%E3%C7%1B%F7%DB%2F%D9%BD%11DDD%FF%E59444yyy%16%16%16%86%86%86%FF%F1%3C%97K3%A7W%3B%AC%AC%AC%D3%83S%CC%CC%CCWWW%A0%A0%A0%DD%DD%DC%ED%D1%25%BD%BD%BChhh%97%97%97%FF%F9M%00%00%00!%F9%04%01%00%00%1F%00%2C%00%00%00%00)%00.%00%00%05%FF%E0'%8E%24%09%9Cg%A9%AEl%FB%01%D2t%00nm%8F%C0%A1%D3w%CF%02%93%CA%CC%B7B%19%8F%C8%A4%F2'h%3A%9F%D0h%94%40%0D%F0T%00%E9s%C0%EDj%05TB%C0%CA%FC%0A%BAhixL.j%D1pu%95%7D-e%A3%F0%3Ct%CDnc%F1yzM%7C%7Du%26P%81%81%83U%16%10%0E%0E%14~v%60%10%0B%1C%04h%16%17%1DzT%1C%10%14%0F%05%A3%05%1C%868%02%1C%0B%10%10%0F%5D%04%0F%17%0F%19%5C%04%1B%03a%00%0F%14%AB%18%18%A2%A7%22Y%0B%14%5C%AE%5C%1D%05%03%18%0E%5C%0D%05%17U%05%0D%19l%10%A5%C1%2F%02%AC%95%1C%5D%AA%B8%AE%1B%D3%00%0Ec%05%0Bl%C9%17%92%87%17'%05%0F%10%C6%17%1B%10%00%8D%05%14%0E%00%18%01%A5c%2C%3C0%D7%0E%D5%82%0D%60(%14%80%60%01%5E%01%00%AC%F4eh%F0%60%1CA%0C%05%08f%CB%02%E1V%B8%0E%F7VA%B8p%01%A3%3F%81%CF%08%FF%06%209f%E3%86%0B%10%3A8x%D0%60%40%83%05g%06L%CC%B00%40%06%85%05%3A%B0%D9%60%A1%E5%8F%0C%1C%1E%CA%23%20%E0%81%85E%0F%024P%D9aA%D1%00%1B%1Ep0%EA%26g%9A%01%60%E6%F4%19%1B%C0%021%AE%7F%BC%C2!Dvl%86j%05%855%F9%8AKl%DB%BBq%B5%9D%C9%B9H%0C%DE%BF%1B%9Dxa%FB%B7m%60%BEa%FD%16%C6%7B%D8%09%E1%C5d7*%99L%F9%08%11%2C%12%0ET%C8v%B9F%8E%1D%9D%3B%7F%1ER%C4Hh%13B%26%9C%3A%A1%00%01%02%05%06R%9C%06%90%DA%10%80%D6%1Arkx%1D%7B%B6%10%D2%C2%14%90*%C0%80A%02%DE%9C%5D%D0%9E%A0%9A%C4(4%C3I%85%86q%40%C2%15%00%CA%12qyx%19%85%90%EB%D9%07%84%1F%9F%BCH%04%06%40%8E%20%08%2F%3Ez%EC%F2v%18%208q%9E%C6m%0D%A4%00x%F0p%FExo%F88%18%F0%1E%02%FF%19%80%40%02%0CD%A0%60G%7F%09%C0f%DA%0D(H%60%DDu%AD!X%9Cq%FE%D1%17%C1%7C%3D%7C%D6%5C%80%15%26%20%E2q%0E%02%10A%02%BDA(%84uv%08(%DC(%B0%FDG%60%8A6%E4%20%E1j%00%08%A8%A3l%2F%F0X%E3%83X%00%A9B%08%00%3B";
//bye	data:image/gif,GIF89a%16%00%12%00%A2%00%00%00%00%00%C0%CC%FF%CC%00%00%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%04%00%2C%00%00%00%00%16%00%12%00%00%03WH%AA%D0%BD%CB%B9%08%82%B5%8F%81%C1%07%60W%88i%D2W%89%A2%D9q%26v%06%8D%BB%AD%B1%7B%D5p%E9%A0%FC%DC%ED%BC%D4%8A%F5%CA%01%5D4%5C%11v%23%94%40K%0C%8C%F1%83%F6%A6%8D*(%F8q%D2%208W%E4%0BqJ%CA%3EOy%8D%26%B3%D9YO%F7%0D%9F%10%12%00%3B";
//	var envelop_src="data:image/gif,GIF89a%20%00%20%00%87%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%D8%00%2C%00%00%00%00%20%00%20%00%00%08%CD%00%B1%09%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23%26%B4%12%88%A2%C5%8A%18%2Fj%CCX%B1%60%20%00%D2%AE%85%1C)%B2%24%C9%93%22%01%7C%24hE%1AHl%D2%60%CA%8CIs%E6L%90V%00%10%0C%94%B2%A6O%9B%3E_%AE%1C%D8%12%E6%CB%9FH%8D%D2%CC%B9S%A4R%A0P%5D%D6%1C*%B0(%CD%A3Q%9F.%D59%90g%D0%A4W%7FR%C5f%F5%26X%AC%5B%9B%22E%AB%D5%E6%D8%B2a%D1%82d%2B%8DiW%A7a%B5%1Ee%FB%F6%ABY%B9%3E%ED%0A%F4%DA6%AF%DF%98%7D%0Bg5%2C%18%9BW%BA%8B%9F%F6%85%0C%D6l%E3%8F%953%1BM%AC9%F3%E5%8D%A09%86%E6J%10%80%E9%D3%A8S%ABN-%B1%B5%EB%D7%B0c%CB%9E%0D%3B%20%00%3B";
//	var user_src="data:image/gif,GIF89a%20%00%20%00%87%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%D8%00%2C%00%00%00%00%20%00%20%00%00%08%C0%00%B1%09%1CH%B0%A0%C1%83%08%13*%5C%A8%10%80%C3%87%10%010%3C%18%B1%22%C4%89%03-jt%88q%A3G%86%1E%3F.%0C%F9%10%DB5%81%1C%1B%92%94x%F2%A4%C4%91%2B%5B%A2%04IR%E6%B5%9707%9A4y%91%A6E%9B%D8%0A%CC%F4y%11%A8Ll8%13%FE%DCi%14)%D1%92Me%26%A5%A8%B1)%D2%A9T%AB2%DD%89%15%A1V%A0N'j%DC*%15%E3%D5%A2%5E%CD%A2%E4%D8%D2%A2Z%94F%01%5D%E9%DA%91%AC%C9%B9o%07%0E%100%C0.%20%BA%0B%05%14%18%CCW%00%D3%2B%80%FA%AA%1D0%B81%E1%01'%13%F3U%2B%D8%B1%E3%BD%8C%09%9B%C5%5C%D9r%81%CA%93%F3r%1E%1D%3A%AF%E9%D3f%03%02%00%3B";
var sheet_yellow_src="data:image/gif,GIF89a%0E%00%10%00%E3%0A%00E%3C%03pc%0Atm%00%90%84%1C%9E%8E%26%AB%9F%3D%D9%D2%0B%E0%D9%16%E5%DE%23%FB%FE6%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%00%00%0F%00%2C%00%00%00%00%0E%00%10%00%00%04J%F0%C9I%AB%BD%8F%90A%8A%2FAE(dY(%E14%96J%12%00%B0%CA%92%870%A4%D9%9C(5%BE%92%BB%04%C2%E0%2B%25%8E%88%A1%2FHB%24%0EDY%D0%99%8CJ%08%3BD%0BqP%AA%0C%E0p%D8%17(%9B%CF%98%B4z%12%01%00%3B";
var sheet_white_src="data:image/gif,GIF89a%0E%00%10%00%B3%00%00111B%FFBRRRsss%84%84%84%9C%9C%9C%CE%CE%CE%DE%DE%DE%EF%EF%EF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%0E%00%10%00%00%04H0%C8I%AB%BD%81%90A%8A%2FBE%24dY%24%E14%96%09%22%00%B0%CA%92F1%A4%D9%8C%245%BE%92%3B%C4%C1%E0%2B!%8E%87%A1%2FH%3A%08%89%B2%A03%09%95%10v%87VR%A92x%BF_%9F%60L.c%CE%E8I%04%00%3B";
var sheet_groen_src="data:image/gif,GIF89a%0E%00%10%00%E3%0A%00%00%00%00%00%02%01%01%04%02%02%06%02%03%09%04%0A%20%0F%0B%23%10%113%18)i6%3ByH%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%00%00%0F%00%2C%00%00%00%00%0E%00%10%00%00%04H%F0%C9I%AB%BDO%88%20%88'%40%25%24dI%24%E14%96%09%02%BCi%C6%92%C6%10%C4k%89%245%CE%EE%88C%C1GB%18%0FB%1C%90t%40%18%86%AAV%AB%89%84J%04%BB%C3%D4%90T%15%BE%600%0EF%86a%CE%E8I%04%00%3B";
var sheet_ster_src="data:image/gif,GIF89a%0E%00%10%00%A5.%00%00%00%00%0A%01%01%13%02%02%1C%02%02%1D%03%03%1C%0C%0C%1B%12%12%3B%06%069%07%07%2B%0F%0F%22%15%152%10%10L%09%091%15%15W%0A%0A.%1F%1F1%1F%1F%2F%20%202%1F%1Fm%0D%0D%3A((L!!Z%1D%1D%3E**E%2B%2BF00%82..c%3E%3E%8D..aBB%8D22%9033iHH%8C%3D%3D%9CDD%9DEE%86%5C%5C%AAjj%B0xx%BAtt%BBuu%B2zz%B4%7B%7B%C1%84%84%C4%86%86%C5%87%87%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00!%F9%04%01%00%00%3F%00%2C%00%00%00%00%0E%00%10%00%00%06y%C0%9FpH%2C%1A%8F%3F%06%03%C1%988'%84%22%A3E%ADNZ%D1%E1%B4%9AA%11%02%60m%8B%B4j%01Z%9E%03%22%9BlQ%22*%40%E9%91p%B0%A7%2C%90%01%60%D8%888wT%2C%18%00%18%22%23%80Z()%10%17%00%0D%12%1A%89BS%0A%1D'%00'%15%05%93I(%26%23f%23%1F!%9D%0C%1C%A8%1C%16%A9%0Bw%04%AF%AF%02%03%04%00lF%00%00%3F%B9%B8H%BA%BC%3FA%00%3B";



// Message-array
// this array will contain arrays of the different elements of messages
// which will be used later to rebuild them MY way
		var msgdata=Array();
			msgdata['mailstuff']=Array();
			msgdata['mail']=Array();
			msgdata['rbuttons']=Array();
			msgdata['userid']=Array();
			msgdata['username']=Array();
			msgdata['content']=Array();
			msgdata['date']=Array();
			msgdata['datemodified']=Array();
			msgdata['modified']=Array();
			msgdata['title']=Array();
			msgdata['kahuna']=Array();//admin?
			msgdata['iid']=Array();

var FormElements='';//initieren formulier voor editen gegevens door de user.

//GM_log('functions come now');


  // FBI_Hide function
  // i= user ID
  // i2= number of this message in the great message Array
  // NOTE: maybe i and i2 are the other way round.
  // bywho = 'self' | 'others' (own or public blacklist)
  // document.evaluate / snapshotItem : see explanation in top
  // iid: the number of this specific forum thread, found in the URL
  // FBI_ just added to vars for recognition
  // cNs: read: childNodes (array)
  // cN: read: childNode
	unsafeWindow.FBI_Hide=function(i,i2,bywho)
				{ 	if (i=='') return 0; // prevent bugs
					var FBI_cNs=document.evaluate("//*[@class=\"FBI_"+i+"\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
													// the class FBI_xxxx (xxx is the id number of that user on the site) is 
													// given to the modified messages
													// so this walks through all this users' messages
	 				if (FBI_cNs.snapshotItem)
					{	
						subnodecount=0;
							while (FBI_cN= FBI_cNs.snapshotItem(subnodecount))
										{	//&& bywho=='self' 
												if (FBI_cN.tagName=="DIV" && iid>0)
												{
													FBI_element_visible(FBI_cN.id,0);  // hide this DIV
												 //TODO: i forgot what FBI_cN.id. is, i think this is an error and needs to be moved (.id removed) to the IMG bit
							 					 FBI_cN.id.src=plus_src; 
												 FBI_cN.id.title="Klik om al het commentaar van deze gebruiker te tonen."
												}
												if (FBI_cN.tagName=="IMG")
												{ FBI_cN.src=plus_src; 
												}
												if (i2!='none'){						// 
																			var oogImage=document.getElementById('eye_image_'+i2);
								 											oogImage.style.display="inline";
								 										}
											
													if (iid>0)  // not on forum overview but on a thread page
													{	var FBI_cN2s=document.evaluate(".//parent::*/parent::*/parent::*//*[@CLASS=\"FBI_uname\"]/A",FBI_cN,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
										 				if (FBI_cN2s.snapshotItem)
														{		subnode2count=0;
																while (FBI_cN2= FBI_cN2s.snapshotItem(subnode2count))
																			{	if (bywho=='others') FBI_cN2.style.backgroundColor="#fa0";
																				if (bywho=='self') FBI_cN2.style.color="red";
																				subnode2count++;
																			}
														}
													 }
												else // not on a thread page, so hopefully on forum overview page
													if (forumnr>0) //forum overview
													{	

														var FBI_cN2s=document.evaluate("//TD[@CLASS=\"FBI_"+i+"\"]/SPAN/A",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
										 				if (FBI_cN2s.snapshotItem)
														{		subnode2count=0;
																while (FBI_cN2= FBI_cN2s.snapshotItem(subnode2count))
																			{	if (bywho=='others') FBI_cN2.style.backgroundColor="#fa0";
																				if (bywho=='self') FBI_cN2.style.color="red";
																				subnode2count++;
																			}
														}
														
													}	
										subnodecount++;
										}
				
				
						}
return true;
					}

	unsafeWindow.FBI_ShowComment=function(i)
				{var FBI_cNs=document.evaluate("//*[@class=\"FBI_"+msgdata['userid'][i+1]+"\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	 				if (FBI_cNs.snapshotItem)
					{		subnodecount=0
							while (FBI_cN= FBI_cNs.snapshotItem(subnodecount))
										{		if (FBI_cN.tagName=="DIV") 
												{FBI_element_visible(FBI_cN.id,1);
							 					FBI_cN.id.src=minus_src; 
												FBI_cN.id.title="Klik om al het commentaar van deze gebruiker te verbergen."
												}
												if (FBI_cN.tagName=="IMG")
												{ FBI_cN.src=minus_src; 
												}

													var oogImage=document.getElementById('eye_image_'+i);
		 											oogImage.style.display="none";

													var FBI_cN2s=document.evaluate(".//parent::*/parent::*/parent::*//*[@CLASS=\"FBI_uname\"]/A",FBI_cN,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
										 				if (FBI_cN2s.snapshotItem)
														{		subnode2count=0;
																while (FBI_cN2= FBI_cN2s.snapshotItem(subnode2count))
																			{	//FBI_cN2.style.backgroundColor="#efe";
																				FBI_cN2.style.color="green";
																				subnode2count++;
																			}
														}
										subnodecount++;
								  }
						}
					}





//////////////// FUNCTIONS FOR THIS SCRIPT ///////////////////////
//(used while modifying the page)
function trim(str){return str.replace(/^\s*|\s*$/g,"");}
function rightString(fullString, start) {if (fullString.length <= start) {return "";}; return fullString.substring(start, fullString.length);}

// grab_the_first_node function
// return an array with elements IN message blocks, with given search pattern
// this function only takes snapshotItem 0 of the result
// variable name convention: p=parent c=child N=node s=plural i=counter
// var start_counting_at: in this page, the first table found in the message section is
// the navigation table. to skip this one, set this var to 1.


//GM_log('awel4');


function grab_the_first_node(FBI_pN,nodesearchpattern)
{ grabbed_array=Array();

	nr=start_counting_at;
		while(FBI_pNi= FBI_pN.snapshotItem(nr))
		{		if (nr>max_messages) break;
				var FBI_cNs=document.evaluate(nodesearchpattern,FBI_pNi,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				if (FBI_cNs.snapshotItem)
				{			var FBI_cN= FBI_cNs.snapshotItem(0);
								if (FBI_cN) 
								{	grabbed_array[nr]=FBI_cN.innerHTML;

								}
				}
			nr++;
		}
 return grabbed_array;
}

// function checkDate
// set date to 0 if it actually seems to be not a date.
var RegDatum	=/(\d\d\-\d\d\-\d{4} \d\d\:\d\d)/;
function checkDate(checkthisarray)
{for (i=1;i<checkthisarray.length;i++)
 	{		RegDatum.lastIndex=0; // important! resets the string pointer to be searched at, as this stays the same in while and if loops. https://bugzilla.mozilla.org/show_bug.cgi?id=296610
			var matches = RegDatum.exec(checkthisarray[i]);//results in an array
			if (!matches) checkthisarray[i]=0;
	}
 return checkthisarray;
}

// split_mailstuff function 
// the a tag element is found, but this contains various data: id, and name, and possibly the <B> tag for admins
// so this element is looked into and split.
// (kahuna=important person, word comes from the Hawaiian shamans)
var RegMail 	=/<a href="mailto\.php\?uid=([^"]*)">(<b>)?(.*?)(<\/b>)?<\/a>/;
function split_mailstuff(splitthisarray)
{	for (i=0;i<splitthisarray.length;i++)
  {		RegMail.lastIndex=0;
			var matches = RegMail.exec(splitthisarray[i]);
			if (matches) 
			{msgdata['userid'][i]=matches[1];
				 if (matches[3].substring(0,3)=='<b>')
				 {msgdata['username'][i]=matches[3].substring(3,matches[3].length-4);
					msgdata['kahuna'][i]=1;
				 }
				else 
				{msgdata['username'][i]=matches[3];
				 msgdata['kahuna'][i]=0;
				}
		   }
	}
}

// split_threadlink function 
// the a tag element is found, but this contains various data: id, and name, and possibly the <B> tag for admins
// so this element is looked into and split.
// (kahuna=important person, word comes from the Hawaiian shamans)
var  RegFindIid=/<a href="forum\.php\?forum=(\d+)\&amp;(page=(\d{1})\&amp;)?iid=([^"]*)">(.*?)<\/a>/;
function split_threadlink(splitthisarray)
{for (i=0;i<splitthisarray.length;i++)
  {		RegFindIid.lastIndex=0;
			var matches = RegFindIid.exec(splitthisarray[i]);
			if (matches) 
			{msgdata['iid'][i]=matches[4];
		  }
	}
}

///////////////// FETCH URL VARS////////////////////////////////
	Aquery=Array();
	var forumnr=0;var iid=0;var print=0;var apparentlyReactedOn=0;	
	Aquery=unsafeWindow.location.search.split('&');
	for (loop=0;loop<Aquery.length;loop++)
	{keyval=Aquery[loop].split('=');
	 switch (keyval[0])
	 {case '?forum': forumnr=keyval[1];break;
	  case'iid': iid=keyval[1];break;
	  case 'print': print=keyval[1];break;
		default:	if (/^\d+$/.exec(keyval[0]) && keyval[0]!=0 && keyval[0]!=undefined && keyval[0]!='' )	
							{ //having reacted to a thread brings you to an URL with the ID of your reaction in it.
								apparentlyReactedOn=keyval[0]; 	
								What_I_Reacted_on=GM_getValue('What_I_Reacted_on');			
								if (What_I_Reacted_on==null || What_I_Reacted_on==0 ) What_I_Reacted_on='|';
								What_I_Reacted_on+=iid+'|';
								while (What_I_Reacted_on.length>5000) What_I_Reacted_on=What_I_Reacted_on.substring(300,What_I_Reacted_on.length);
								 GM_setValue('What_I_Reacted_on',What_I_Reacted_on);
							}	
	 }
	 
	} 



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////// MAIN /////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
///////////// FOR THE PAGE WITH A THREAD ///////////////////////
////////////////////////////////////////////////////////////////

if (iid>0) // in a 'thread' page
{
 ///////////// COLLECT DATA /////////////////////////////////////
 ////////////////////////////////////////////////////////////////

 //// GET AND COUNT ANCHORS
 // put all <a name=''> within the comment section into array anamesArr
 // this also gives us the count for the number of messages
 var anames_ = document.evaluate("//BODY/TABLE[2]/TBODY/TR/TD[2]/A",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 if (print==1)  var anames_ = document.evaluate("//BODY//A",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

 var anamesArr=Array();
 var namecount=0;
 var evaluation;
 while(aname= anames_.snapshotItem(namecount))
 {anamesArr[namecount]=aname.name.substring(2);
	namecount++
 }
 if (max_messages>namecount) max_messages=namecount;


 //// GET AS MANY COMMENT BITS as there are ANCHORS
 var messages_ = document.evaluate("//BODY/TABLE[2]/TBODY/TR/TD[2]/TABLE",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 if (print==1)   var messages_ = document.evaluate("//BODY/TABLE",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 //extract data per comment and put them in arrays.
 msgdata['mailstuff']		=grab_the_first_node		(messages_,".//TBODY[1]/TR[2]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]" );
 	split_mailstuff( msgdata['mailstuff']		);
 msgdata['date']		=grab_the_first_node		(messages_,".//TBODY[1]/TR[2]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[2]" );
 msgdata['datemodified']=checkDate(grab_the_first_node	(messages_,".//TBODY[1]/TR[2]/TD[1]/TABLE[1]/TBODY[1]/TR[3]/TD[2]" ));
 msgdata['content']=grab_the_first_node		(messages_,".//TBODY[1]/TR[2]/TD[1]/TABLE[1]/TBODY[1]/TR/TD/code/font" );
 msgdata['title']=grab_the_first_node		(messages_,".//TBODY[1]/TR[1]/TD[1]" );
 msgdata['rbuttons']=grab_the_first_node(messages_,".//INPUT/parent::TD[@align=\"right\"]" );//[@TYPE=\"submit\"]


 /////////// OK NOW WE HAVE ALL THE BITS. TIME TO REBUILD ///////
 ////////////////////////////////////////////////////////////////


 msg_nr=1; // start counting array at 1.
if (mark_badwords==1)
{
 badwordsArray=badwords.split(',');
 badwordscount=badwordsArray.length;
}
		while(message= messages_.snapshotItem(msg_nr)) // for every message.... 
		{	  if (msg_nr>max_messages) break;
				
				/// prepare some data
				datemodified = '&nbsp;';
				if (msgdata['datemodified'][msg_nr] && msgdata['datemodified'][msg_nr]!='undefined') 
					datemodified = 'Last edit: '+msgdata['datemodified'][msg_nr]; 
				
				///censor
				badwordscheck=0; 
						if (mark_badwords==1)
						{for (bw=0;bw<badwordscount;bw++)  
						 {msgdata['content'][msg_nr]=msgdata['content'][msg_nr].replace(badwordsArray[bw],'<span style="background-color:#FF0;">'+badwordsArray[bw]+'</span>'); 
						 }
						}

			/// < ? example code ? > in courier 
			orgcontent=msgdata['content'][msg_nr]; //otherwise disrupts popup div when nested < ? tags
			msgdata['content'][msg_nr]=msgdata['content'][msg_nr].replace(/<font color=\"\#0000cc\">\&lt;\?/g,'<DIV  class="FBI_Code_message"><font color="#0000cc">&lt;?');
			msgdata['content'][msg_nr]=msgdata['content'][msg_nr].replace(/\?\&gt;/g,'?&gt;</DIV>');


/// *** HERE GOES REBUILDING		- the less variables, the faster

			i=msg_nr-1;

			if (msgdata['rbuttons'][msg_nr])
			{
			var RegSchopMod	=/<input .*?Schop.*?>/; //remove the 'Schop mod' button
			msgdata['rbuttons'][msg_nr]=msgdata['rbuttons'][msg_nr].replace(RegSchopMod,'');
			var RegBewerken	=/<input .*?Bewerken.*?.mod=(\d*)*?>/; //replace the 'Bewerken' button
			msgdata['rbuttons'][msg_nr]=msgdata['rbuttons'][msg_nr].replace(RegBewerken,'- <a class="FBI_button" href="javascript:;" onclick="document.location.href=\'forum.php?forum='+forumnr+'&mod=$1\'">Bewerken</a></td>');
			}
			message.innerHTML=''+
					'<tr bgcolor="#b0de00" id="DoeiStakker'+i+'_0" class="tr_'+msgdata['userid'][msg_nr]+'" style="max-width:750;" >'+
						'<td colspan="2" >'+'<span class="FBI_title">'+msgdata['title'][msg_nr] +'</span></td><td align="right"><img src="'+minus_src+'" id="plusminusimage'+i+'"  class="FBI_'+msgdata['userid'][msg_nr]+'" title="Eigen zwarte lijst: klik om al het commentaar van deze gebruiker te verbergen." border="none" hspace="0" vspace="0" onClick="plusminusimagefunction(this,'+i+');" style="cursor:pointer;" /> '+'</td></tr><tr><td>'+
						'<span class="FBI_uname" align="right">'+'<a href="mailto.php?uid='+msgdata['userid'][msg_nr]+
						'">'+msgdata['username'][msg_nr]+ '</a>'+((msgdata['kahuna'][msg_nr]==1)?' [admin]':'')+'  '+
							'<a href="mailto.php?uid='+msgdata['userid'][msg_nr]+'" title="Stuur een e-mail bericht aan deze gebruiker" class="FBI_button">Stuur PM</a> '+
							'<a href="javascript:makewindow(\'bekijkuser.php?id='+msgdata['userid'][msg_nr]+'\',550,325)" title="Bekijk gebruikersprofiel" class="FBI_button">Profiel</a> '+
							'<a href="javascript:showwhyban('+msgdata['userid'][msg_nr]+')" title="Ban Waarom?" class="FBI_button">Reden Ban</a> '+

							'<span class="xtra" myid="'+i+'" ></span>' + 

							'</td><td valign="top" align="right">'+
							'<div id="FBI_comment_'+i+'" class="FBI_comment" style="display:none;"><img onClick="FBI_togglediv(\'FBI_comment_'+i+'\');" src="'+x_src+'" title="Klik weer weg" border="none" hspace="0" vspace="0" />'+orgcontent+'</div>'+
							'</td>'+
						'<td align="right" valign="top">'+
						'<img id="eye_image_'+i+'" onClick="FBI_togglediv(\'FBI_comment_'+i+'\');" src="'+eye_src+'" title="Klik hier om te spieken wat het commentaar ook al weer was" border="none" hspace="0" vspace="0" style="display:none;" /> '+
							msg_nr+
						'</td></tr><tr>'+
						'<td colspan="2" class="FBI_date" nowrap>Datum:'+msgdata['date'][msg_nr]+ '</td>'+
						'<td class="FBI_date"><span align="right" nowrap>'+datemodified+'</span></td></tr>'+
					'<tr><td colspan="3" ><div id="DoeiStakker'+i+'_1"  class="FBI_'+msgdata['userid'][msg_nr]+'"><div class="FBI_content" style="padding-top:7px;padding-bottom:5px;">'+msgdata['content'][msg_nr]+'</div></div></td></tr>'+
				'<tr ><td style="border-top:1px solid #333;"><a class="FBI_button" href="#reply" onclick="Reply(\'Re: '+msg_nr+msgdata['title'][msg_nr]+'\')" title="voeg reactie toe">Reageer</a> </td>'+
							'<td style="border-top:1px solid #333;" align="right" nowrap> '+((msgdata['rbuttons'][msg_nr]!=undefined)?msgdata['rbuttons'][msg_nr]:'')+'&nbsp;'+
							'<span align="right"><a class="FBI_button" href="forum.php?forum='+forumnr+'&page=1" title="Overzicht binnen dit forum">Forum</a></span> - <a class="FBI_button" title="Terug naar bovenaan" href="#top">Top</a> - <a class="FBI_button" href="forum.php?forum='+forumnr+'&new=1">Nieuw Topic</a> - <a class="FBI_button" href="javascript:;" onclick="javascript:SchopMod('+iid+','+forumnr+')">Schop Mod</a>'+
						'</tr>';
			msg_nr++;
			}
}

////////////////////////////////////////////////////////////////
///////////// FOR THE PAGE WITH FORUM SUBJECTS /////////////////
////////////////////////////////////////////////////////////////

/// just a simpler version of the above block

if (iid==0 && forumnr!=0) 
{//BUG: eerste NAAM in forum wordt 'undefined'! dit gebeurt bij het inlezen van de gegevens. hij gbegint vast bij 1 ipv 0.
	badwordsArray=badwords.split(',');badwordscount=badwordsArray.length;


  if (print==1)    var messages_ = document.evaluate("//TR[@bgcolor]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  else   var messages_ = document.evaluate("//BODY/TABLE[2]/TBODY/TR/TD[2]//TR[@bgcolor]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

 start_counting_at=0;
 msgdata['title']		=grab_the_first_node		(messages_,".//TD[1]" );
  split_threadlink(msgdata['title']);
 msgdata['mailstuff']		=grab_the_first_node		(messages_,".//TD[2]" );
  split_mailstuff( msgdata['mailstuff']		);
 msgdata['date']		=grab_the_first_node		(messages_,".//TD[3]" );

	// to mark stuff you reacted on:



 // MY THREADS
 // what I wanted for very long already: annotation for messages I sent a reply for...
		msg_nr=0;
		i=0;
		while(message= messages_.snapshotItem(i))
		{	if (i>max_messages) break;
  		var IReactedOnThis=(What_I_Reacted_on.indexOf('|'+msgdata['iid'][msg_nr]+'|')>0)?1:0;			
			msgdata['title'][msg_nr]=msgdata['title'][msg_nr].replace('img/bericht1.gif',(IReactedOnThis)?sheet_ster_src:sheet_yellow_src);
			msgdata['title'][msg_nr]=msgdata['title'][msg_nr].replace('img/bericht2.gif',(IReactedOnThis)?sheet_groen_src:sheet_white_src);

       // REBUILDING HAPPENS HERE:
				message.innerHTML='<TD><span class="FBI_title_overview">'+msgdata['title'][msg_nr]+'</span></TD><TD class="FBI_'+msgdata['userid'][msg_nr]+'"><span class="FBI_uname_overview" >'+msgdata['mailstuff'][msg_nr]+'</span></TD><TD>'+msgdata['date'][msg_nr]+'</TD>';
		msg_nr++; i++; 
		}
}

////////////////////////////////////////////////////////////////
///////////// FINISH ///////////////////////// /////////////////
////////////////////////////////////////////////////////////////

//name="bericht" 
//limiet aan reactiebox
//var reactiebox=unsafeWindow.getObj("bericht");
//alert(reactiebox);
//if (reactiebox!=undefined) reactiebox.style.max-width='300px'; else alert('no alertbox');



// add an extra bit of script for in the page
var FBI_inpage_scripts = document.createElement('script');

    FBI_inpage_scripts.innerHTML = ""+
      "var CommentOwners = Array('" + msgdata['userid'].join("','") + "');\n";
document.getElementsByTagName('head')[0].appendChild(FBI_inpage_scripts);



////////////////////////////////////////////////////////////////
///////////// SHOVE SOME FURNITURE  ////////////////////////////
////////////////////////////////////////////////////////////////
move_all_blocks = GM_GETorDEFAULT('move_all_blocks',1);
if (move_all_blocks==1)
{var blocks=new Array();

// get the table containing it all, html tables in 1st and 3rd column
var sides=new Array();
var sideblocks1 = document.evaluate("//BODY/TABLE[2]/TBODY/TR/TD[1]/TABLE|//BODY/TABLE[2]/TBODY/TR/TD[3]/TABLE",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 var n=0;var m=0;

 // grab title and contentpart
 while(aname= sideblocks1.snapshotItem(n))
 {
 	sides[n]=aname.innerHTML;
 varblocktitle= document.evaluate(".//TBODY/TR[1]/TD",aname,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 blocktitle= varblocktitle.snapshotItem(0).innerHTML.replace(' ','_');
 varblockcontent= document.evaluate(".//TBODY/TR[2]/TD",aname,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 blockcontent= varblockcontent.snapshotItem(0).innerHTML;
 blocks[trim(blocktitle)]=blockcontent;
	n++
 }

//verberg allebei, voor toegang tot de TD is deze:
 var sideblocksn = document.evaluate("//BODY/TABLE[2]/TBODY/TR/TD",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

//toon op gewenste volgorde in de linkerkant de tabellen weer.                         
var nieuwblok='';
var blocks_orderArr=new Array();
blocks_orderArr=blocks_order.split('|')
for (blok=0;blok<blocks_orderArr.length;blok++)
{	if (blocks[blocks_orderArr[blok]])
	{nieuwblok  = nieuwblok+'<table border="1" bordercolor="#000000" cellpadding="1" cellspacing="0" width="180px"><tr bgcolor="bordeaux"><td  style="border-right: none 0px;"><b>'+blocks_orderArr[blok].replace('_',' ')+'</b></td><td align="right" style="border-left: none 0px;"><IMG border="0" hspace="0" vpspace="0" src="'+minus_src+'" onClick="FBI_toggleblockcontent(\''+blocks_orderArr[blok]+'\',1);" style="cursor:pointer;" /></td></tr><TR><TD bgcolor="white" colspan="2"><DIV id="'+blocks_orderArr[blok]+'" >'+blocks[blocks_orderArr[blok]] +'</DIV></td></tr></table><br>';
    }
}

//Bookmarks block
Bookmarks_arr=Bookmarks.split('|');
Bookmarks_n=Bookmarks_arr.length-1;
var bookmarklist='';
for (oBM=1;oBM<Bookmarks_n;oBM++)
{Bookmarks_arr2=Bookmarks_arr[oBM].split('@');
 bookmarklist+='<a href="'+Bookmarks_arr2[0]+'" target="_blank">'+Bookmarks_arr2[1]+'</a><br>';
}
																			
	nieuwblok  = nieuwblok+'<table border="1" bordercolor="#000000" cellpadding="1" cellspacing="0" width="180px"><tr bgcolor="#339988"><td  style="border-right: none 0px;"><b>FBI - bladwijzers</b></td><td align="right" style="border-left: none 0px;"><IMG border="0" hspace="0" vpspace="0" src="'+minus_src+'" onClick="FBI_toggleblockcontent(\'FBI\',1);" style="cursor:pointer;" /></td></tr><TR><TD bgcolor="white" colspan="2"><DIV id="FBI" style="height:100px;overflow:-moz-scrollbars-vertical;white-space:nowrap;">'+bookmarklist+'</DIV><BR><a href="javascript:;" onClick="FBI_bookmark();">Voeg deze pagina toe</a> <br><a href="javascript:;" onClick="toggle_display(\'EditDiv\');"><b>FBI Settings</b></a></td></tr></table><br>';

if (GM_GET('blokkennaar')=='links')
	{var blockto=0;blocknone=2;}
else 
	{var blockto=2;blocknone=0;}
 sideblocksn.snapshotItem(blockto).innerHTML=nieuwblok;
 sideblocksn.snapshotItem(blockto).width="200px";
 sideblocksn.snapshotItem(blocknone).innerHTML="";
 sideblocksn.snapshotItem(blocknone).width=0;
if (blokkennaar=='none')
	{ sideblocksn.snapshotItem(blockto).innerHTML='';
 sideblocksn.snapshotItem(blockto).width="0px";
}


 
} 


////////////////////////////////////////////////////////////////
////////// REPLACE UGLY PFZ HEADER ////////////////////////////////
////////////////////////////////////////////////////////////////
if (HidePageHeader ==1)
{
	var stommeheader = document.evaluate("//BODY/TABLE[1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var commercials = document.evaluate(".//A/parent::TD",stommeheader.snapshotItem(0),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
NewHeaderHTML=NewHeaderHTML.replace("ADVERTENTIE1",commercials.snapshotItem(0).innerHTML);
NewHeaderHTML=NewHeaderHTML.replace('ADVERTENTIE2',commercials.snapshotItem(1).innerHTML);
 stommeheader.snapshotItem(0).innerHTML=NewHeaderHTML;
}

////////////////////////////////////////////////////////////////
//SHARED BLACKLIST


//links for the shared blacklist
var URLAddpage = 'http://www.hieris.info/fbi/FBI_form.php';
var URLWhypage = 'http://www.hieris.info/fbi/FBI_why.php';
//var URL_blacklist_data = 'http://www.hieris.info/fbi/data.php';

  // ban function
  //calls a page on a server to actually add this id with some extra info to the shared blacklist
	unsafeWindow.ban=function(i)
			{unsafeWindow.open(URLAddpage+'?banner='+getCookie('pf_user') +'&userid='+ msgdata['userid'][i+1]+'&name='+msgdata['username'][i+1]+'&by=me'+'&ww='+geheimwoord+'&proofpage='+document.location.href,'Ban!','scrollbars=yes,resizable=yes,width=220,height=300')
			}
	unsafeWindow.showwhyban=function(i)
			{unsafeWindow.open(URLWhypage+'?id='+ i,'Ban!','scrollbars=yes,resizable=yes,width=770,height=200')
			}


////////////////////////////////////////////////////////////////
///////////// EXTRA BIT FOR THE SHARED BLACKLIST ///////////////
////////////////////////////////////////////////////////////////

var URL_blacklist_data = 'http://www.hieris.info/fbi/data/file.txt';
fileEtag = GM_GETorDEFAULT('fileEtag','|');
filedateLM = GM_GETorDEFAULT('filedateLM','|');

//check lastmodified date
// as suggested by http://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers
GM_xmlhttpRequest({method:"HEAD",
	url: URL_blacklist_data,
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
	'If-Modified-Since':GM_GET('filedateLM'),
	'Etag':GM_GET('fileEtag'),},
 	onload: function(resp) 
	{if (resp.status==200)
	 {//status 200: file is refreshed
	  filedateLM=(resp.responseHeaders.substring(resp.responseHeaders.indexOf('Last-Modified:')+14,resp.responseHeaders.indexOf('Etag:')-1) );
	  fileEtag=(resp.responseHeaders.substring(resp.responseHeaders.indexOf('Etag:')+5,resp.responseHeaders.indexOf('Accept-Ranges:')-1) );
		GM_SET('filedateLM',filedateLM);
		GM_SET('fileEtag',fileEtag);

		//get NEW blacklisted id's		
		GM_xmlhttpRequest({	method: 'GET',
			url: URL_blacklist_data,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) 
			{ SharedBans=responseDetails.responseText;
			 GM_setValue('SharedBans',SharedBans);				
			}
		});
	}
	else //file not refreshed, status code 304
	{ if (!GM_getValue('SharedBans')) GM_setValue('SharedBans','');				
	}
SharedBans=GM_getValue('SharedBans');
SharedBans=SharedBans.split('|');
SharedBans_n=SharedBans.length;
	for (oBU=1;oBU<SharedBans_n;oBU++)
	{	FBI_Hide(SharedBans[oBU],'none','others');
	}
	}
 } );


//invullen
var nr=0;
var messages = document.evaluate("//span[@class=\"xtra\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 while(message= messages.snapshotItem(nr))
 {message.innerHTML='<a class="FBI_button" title="Klik om deze user op de zwarte lijst te zetten." onClick="window.ban('+nr+');" href="#" />Naar gedeelde zwarte lijst!</a>' ;
  nr++;
 }
						

//hide hidden blocks
var collapsed_blocks=GM_getValue('collapsed_blocks');
collapsed_blocksarray=collapsed_blocks.split('|');
for (hb=0;hb<collapsed_blocksarray.length;hb++)
{if (collapsed_blocksarray[hb]=='') continue;
if (move_all_blocks==1)
 { var x=new getObj(collapsed_blocksarray[hb]);
  x.style.display='none';
 }
}


//activate js functions when page is loaded

////// **** BIG BUG: next line not ok.... second element should be a FUNCTION 
// unsafeWindow.addEventListener('load', GM_GET('BannedUsers'),true);

 unsafeWindow.addEventListener('load', FBI_hideThem,true);


// **************************************************


//  MAKING EDITABLE FORM


// **************************************************

var formname='usereditform';
//note that this form has bits all over this script: 
// - the EditDiv css styles, 
// - several javascript functions (noted), and 
// - several additions to FormElements


// PREPARE DATA, read in default, if existing overwrite

// BUILD THE FORM CONTENT
FormElements+='<table border=1 cellpadding=0 cellspacing=0>';

FormElements+='<tr><td>';
FormElements+=addFormElement ('move_all_blocks','Move the blocks? 1=move or 0=leave them','inputtext');
FormElements+='<br />'+addSelectionBoxes ('blocks_order','Selecteer de blokken die je wilt zien en zet ze op volgorde','inputtext','noprep','prepSELECT',blocks_total_arr,'|'+GM_GET('blocks_order')+'|');
//Recente_Artikelen$|Recente_Scripts$|Aantal_leden$|Recente_Scripts|Recente_Artikelen|Opties$|
FormElements+='</td></tr><tr><td>';
FormElements+=addFormElement ('max_messages','Max aantal berichten om te wijzigen','inputtext');
FormElements+='</td></tr><tr><td>';

FormElements+=addFormElement ('blokkennaar','naar links of rechts','inputtext');
FormElements+='</td></tr><tr><td>';
FormElements+=addFormElement ('mark_badwords','Woordenfilter? 1=aan 0=uit ','inputtext');
FormElements+=addFormElement ('badwords','Markeer de volgende woorden','inputtext');
FormElements+='</td></tr><tr><td>';
FormElements+=addFormElement ('HidePageHeader','Die bovenste header aanpassen?','inputtext');
//FormElements+='<br>'+addFormElement ('NewHeaderHTML','HTML voor de nieuwe Header (edit dit elders)','textarea');//hidden omdat anders mensen misschien de ads gaan weghalen en dat is niet goed voor PFZ
//FormElements+='<br>'+addFormElement ('css_style_string','Dit is een CSS lijst  (edit dit elders).','textarea');
FormElements+='</td></tr><tr><td><b>Gebruik de volgende waarden als backup...</b>';
FormElements+='<HR>'+addFormElement ('geheimwoord','Wachtwoord externe lijst','inputtext');
FormElements+=addFormElement ('What_I_Reacted_on','Waar je zelf in hebt gepost','inputtext');
FormElements+='<BR>'+addFormElement ('BannedUsers','Zwarte lijst van jezelf? ','inputtext');
FormElements+='</td></tr></table>';


// INJECT THE DIV with the form
var EditDiv = document.createElement('div'); 
	EditDiv.setAttribute ('id', 'EditDiv'); 
	EditDiv.setAttribute ('class', 'EditDiv'); 
	EditDiv.innerHTML = 'Edit settings for the GreaseMonkey addition<form name="usereditform">'+FormElements+'</form><div algign="right"><a href="#" onClick="toggle_display(\'EditDiv\',0);">Close</a></div>';
document.getElementsByTagName('BODY')[0].appendChild(EditDiv); 

GM_log('Script FBI! reached end.');
