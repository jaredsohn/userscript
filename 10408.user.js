// ==UserScript==
// @name                 WLR for IE
// @namespace       http://forums.whirlpool.net.au
// @version              0.1
// @description       A port to IE of Meat Sack's WLR script
// @include              http://forums.whirlpool.net.au/*
// @include              http://whirlpool.net.au/*
// @exclude             http://forums.whirlpool.net.au/forum-replies.cfm?*p=-2*
// @exclude             http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// ==/UserScript==



/**to do**/
//make the smileys run more effeciently? - i.e. textnodes 

/*
function bugga(bugsName,bugsValue){
	if($('#hideShow')[0] === undefined){
			$('body').prepend('<button id="hideShow" style="float:right;">Hide/Show Bugga</button><div style="position:absolute;display:none;width:700px;height:600px;border:2px red solid;overflow:scroll;background-color:white;color:#4A4A4A" id="debugDiv"><h3>Bugga:</h3><br /></div>');
	}
	var tempHoldDebug = $('#debugDiv').html();
	$('#debugDiv').html(tempHoldDebug+"<p style='color:green;font-weight:bold;'>----------------------------------</p><p>"+"<span style='color:#008000;'>"+bugsName+":</span>&nbsp;&nbsp;"+bugsValue+"</p>");
	$('#hideShow').unbind();
	$('#hideShow').mouseup( function(){$('#debugDiv').toggle();});
}
*/

/***WLR settings***/
if(document.URL.toLowerCase().indexOf('wlr') > -1){

	if(document.cookie.indexOf('ssettings1') < 0){

		document.cookie = 'ssettings1=LastReadTracker:fals,lrTrackBottom:fals,avatars:fals,highlightRight:fals,InlineImages:fals,Smileys:fals,StyleWiki:fals,CodeHighlight:fals,HidePosts:fals,HideOwnDetails:fals,SwickiSearch:fals,MyRig:fals,Quicknav:fals,WhimBig:fals,HoldThePhone:fals;expires=Fri, 17 Dec 2009 10:00:00 GMT';

	}

	$('#replies').prepend(''+
	'<div class="wlrsettings"><h4>Last Read Tracker</h4><input type="checkbox" name="LastReadTracker" /><div id="selContainer"><span id="nttt" >No. Of Threads To Track</span>'+
	'<select id="selectBox" ><option value='+100+' >100</option><option value='+200+' >200</option><option value='+500+' >500</option>'+
	'<option value='+1000+' >1000</option><option value='+2000+' >2000</option><option value='+5000+' >5000</option></select></div>'+
	'<span class="infoclick" id="infoclickalt">Info</span><div class="iverunouttanames"><p>Enables/Disables the Last Read Tracker</p>'+
	'<p><strong>Legend:</strong></p>'+
	'<p><img class="leftImageFloat" src="http://img.photobucket.com/albums/v215/thegooddale/rednewr2.gif" /> - indicates new posts '+
	'since you last read this thread.</p><p><img class="leftImageFloat" src="http://img.photobucket.com/albums/v215/thegooddale/greynorep-2.gif" /> '+
	'- indicates no new posts since you last read this thread.</p> '+
	'<p><img class="leftImageFloat" src="http://img.photobucket.com/albums/v215/thegooddale/noneread2.gif" /> '+
	'- indicates you have not read this thread.</p></div></div>'+

	'<div class="wlrsettings"><h4>Add Last Post Link (#bottom)</h4><input type="checkbox" name="lrTrackBottom" />'+
	'<span class="infoclick">Info</span><div class="iverunouttanames"><p>Adds a link to the very last post of the thread. This allows you to override'+
	' the "last read" link and go to the very last post in the thread. </p><p>The last post link is located on the right of the last read link : '+
	'<img src="http://img.photobucket.com/albums/v215/thegooddale/lpl.gif" /> '+
	'</p></div></div>'+

	'<div class="wlrsettings"><h4>Higlight To Right Of Read Post</h4><input type="checkbox" name="highlightRight" />'+
	'<span class="infoclick">Info</span><div class="iverunouttanames"><p>Highlights the right hand side of posts that have been read.</p>'+
	'<p /><p>Eg : '+
	'<img style="margin-bottom:-15px;margin-left:10px;" src="http://img.photobucket.com/albums/v215/thegooddale/hl.gif" /></p></div></div>'+

	'<div class="wlrsettings"><h4>Avatars</h4><input type="checkbox" name="avatars" /><span class="infoclick">Info</span>'+
	'<div class="iverunouttanames"><p>Displays avatars above usernames in threads.</p></div></div>'+

	'<div class="wlrsettings"><h4>Inline Images</h4><input type="checkbox" name="InlineImages" /><span class="infoclick">'+
	'Info</span><div class="iverunouttanames"><p>Displays image links as images in posts.</p></div></div>'+

	'<div class="wlrsettings"><h4>Smileys</h4><input type="checkbox" name="Smileys" /><span class="infoclick">Info</span>'+
	'<div class="iverunouttanames"><p>With smilies on, script will change: :) into: <img src="http://img.photobucket.com/albums/v215/thegooddale/smlHappy.gif" /></p></div></div>'+

	'<div class="wlrsettings"><h4>Style Wiki Links</h4><input type="checkbox" name="StyleWiki" /><span class="infoclick">'+
	'Info</span><div class="iverunouttanames"><p>Turns a wiki link like this: <a class="wiki" '+
	'href="http://forums.whirlpool.net.au/index.cfm?a=wiki&tag=wlr">http://forums.whirlpool.net.au/index.cfm?a=wiki&tag=wlr</a> '+
	'into this: <a class="wiki" href="http://forums.whirlpool.net.au/index.cfm?a=wiki&tag=wlr">wlr</a></p></div></div>'+

	'<div class="wlrsettings"><h4>Code Highlighting</h4><input type="checkbox" name="CodeHighlight" /><span class="infoclick">'+
	'Info</span><div class="iverunouttanames"><p>Makes your code <span style="font-size:x-small;">(inside [##] whirlcode)</span> '+
	'look perdy in the Coding & Web section.</p></div></div>'+

	'<div class="wlrsettings"><h4>Hide User\'s Posts </h4><input type="checkbox" name="HidePosts" />'+
	'<span class="infoclick">Info</span><div class="iverunouttanames"><p>Allows you to hide a user\'s posts and any posts that quote that user.'+
	'</p></div></div>'+

	'<div class="wlrsettings"><h4>Hide Own Details</h4><input type="checkbox" name="HideOwnDetails" /><span class="infoclick">'+
	'Info</span><div class="iverunouttanames"><p>Hides the user details on your own userpage. (click your username title to show/hide your details)</p></div></div>'+

	'<div class="wlrsettings"><h4>Swicki Search</h4><input type="checkbox" name="SwickiSearch" /><span class="infoclick">'+
	'Info</span><div class="iverunouttanames"><p>Adds a swicki search to the thread search page.</p></div></div>'+

	'<div class="wlrsettings"><h4>My Rig</h4><input type="checkbox" name="MyRig" /><span class="infoclick">Info</span><div class="iverunouttanames"><p>'+
	'Adds a link underneath each username in threads to their pc specs wiki entry.</p></div></div>'+

	'<div class="wlrsettings"><h4>Hold The Phone</h4><input type="checkbox" name="HoldThePhone" /><span class="infoclick">'+
	'Info</span><div class="iverunouttanames"><p>Moves phone forums to bottom right on the forum index page.</p></div></div>'+	

	'<div class="wlrsettings"><h4>Quicknav</h4><input type="checkbox" name="Quicknav" /><span class="infoclick">Info</span>'+
	'<div class="iverunouttanames"><p>Adds a navigation menu to every page.</p><p><img src="http://img.photobucket.com/albums/v215/thegooddale/navmen.png" /></p></div></div>'+

	'<div class="wlrsettings"><h4>Whim Big</h4><input type="checkbox" name="WhimBig" /><span class="infoclick">Info</span>'+
	'<div class="iverunouttanames"><p>Makes the whim box bigger on userpages.</p></div></div>');


	if(GM_getValue('numTracked') !== undefined){
	
		$('#selectBox option').each(function(){
		
			if($(this).attr('value') == GM_getValue('numTracked')){
			
				$(this).attr('selected','selected');
			
			}
		
		});

	}

	$('#selectBox').change( function() { 
	
		while(GM_getValue('wlrtrack').split('t=').length > this[this.selectedIndex].value){
		
			GM_setValue('wlrtrack', GM_getValue('wlrtrack').replace(GM_getValue('wlrtrack').substr(GM_getValue('wlrtrack').lastIndexOf('t=')),""));
		
		}
			
		GM_setValue('numTracked', this[this.selectedIndex].value);
	
	} );


	var newsheet = document.styleSheets[1];

	newsheet.addRule(".wlrsettings", "background-color:#8D96B8;padding:15px;width:520px;margin:0 0 0 22px;border:1px solid black;"); 
	newsheet.addRule(".rightImageFloat", "clear:both;float:left;margin:-5px 5px 10px 0pt;"); 
	newsheet.addRule(".wlrsettings h4", "color:#333333;margin:0 0 5px 10px;");
	newsheet.addRule(".wlrsettings p", "margin-left:10px;color:#000000;");
	newsheet.addRule(".infoclick", "float:right;margin-right:160px;margin-top:-21px;color:white;");
	newsheet.addRule("#infoclickalt", "float:right;margin: -20px 115px 0px 0px;color:white;");
	newsheet.addRule(".infoclick:hover", "cursor: pointer;");
	newsheet.addRule(".wlrsettings input", "float:right;margin-right:60px;margin-top:-21px;");
	newsheet.addRule(".wlrsettings strong", "font-size:x-small;");
	newsheet.addRule(".iverunouttanames", "display:none;background-color:#7982A4;padding: 10px 0;");
	newsheet.addRule("#selectBox", "margin:3px 0px -5px;");
	newsheet.addRule("#nttt", "font-size:10px;");
	newsheet.addRule("#selContainer", "margin: 10px -70px 0px 0px;float:right;width:115px;text-align:center;");
		
	$('.infoclick').click(function(){

		$(this).next().toggle();

	});


	$('.wlrsettings input:checkbox').each(function(){
	
		if(document.cookie.substr(document.cookie.indexOf($(this).attr("name")+':')+$(this).attr("name").length,5) == ':true'){
	
			$(this).attr('checked','checked');
			
		}		

	
		$(this).click(function(){
					
			var attNm = $(this).attr("name");
			
			var cookieSettingsString = document.cookie.slice(document.cookie.indexOf('ssettings1='),document.cookie.indexOf('Phone', document.cookie.indexOf('wlrsettings='))+10);
						
			var boolcheck = document.cookie.substr(document.cookie.indexOf(attNm+':')+attNm.length+1,4);
			
			var repb;
						
			if(boolcheck == 'true'){
			
				repb = cookieSettingsString.replace(attNm+":true",attNm+":fals");
				
				document.cookie =  repb+';expires=Fri, 17 Dec 2009 10:00:00 GMT';
								   
			}
			else{
			
				repb = cookieSettingsString.replace(attNm+":fals",attNm+":true");	
					
				document.cookie =  repb+';expires=Fri, 17 Dec 2009 10:00:00 GMT';
							
			}	

		});
		
	});

}

/***Hold The Phone***/
if(((document.URL == 'http://forums.whirlpool.net.au/forum.cfm') || (document.URL == 'http://forums.whirlpool.net.au/'))&&(document.cookie.substr(document.cookie.indexOf('HoldThePhone:')+13,4) == 'true')){

	$('body/table/tbody/tr/td:eq(1)/div:eq(0)/table/tbody/tr'+
	'/td:eq(3)/table/tbody').append($('body/table/tbody/tr/'+
	'td:eq(1)/div:eq(0)/table/tbody/tr/td:eq(1)/table/tbody/tr:gt(10)').lt(5));

}

/***oh noes!!!***/
if(document.URL.indexOf('err') > -1){

	var img = document.createElement("img");
	
	img.src = "http://img.photobucket.com/albums/v215/thegooddale/tildecatWLR.jpg";
	
	img.style.marginTop = "20px";
	
	img.style.marginLeft = "30px";
	
	document.getElementsByTagName('td')[0].appendChild(img);
	
}

/***Meat Sack's Smilies***/

var smlHappy = '<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlHappy.gif" align ="baseline" border="none" />';

var smlFrown = '<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlFrown.gif" align="baseline" border="none" />';

var smlRazz = '<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlRazz.gif" align="baseline" border="none" />';

var smlGrin ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlGrin.gif" align="baseline" border="none" />';

var smlNtl ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlNtl.gif" align="baseline" border="none" />';

var smlWink ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlWink.gif" align="baseline" border="none" />';

var smlRoll ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlRoll.gif" align="baseline" border="none" />';

var smlShock ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlShock.gif" align="baseline" border="none" />';

var smlEvil ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smlEvil.gif" align="baseline" border="none" />';

var imgStar ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/imgStar.gif" align="baseline" border="none" />';

var imgGUWPCT ='<img src ="http://img.photobucket.com/albums/v215/thegooddale/smileyG.png" align="baseline" border="none" />';



smileys = {	
	"&gt;:\\)"  : smlEvil,
	":\\)"		: smlHappy,
	":-\\)"		: smlHappy,
	":\\("		: smlFrown,
	":-\\("		: smlFrown,
	":D"  		: smlGrin,
	":-D"  		: smlGrin,
	":\\|"		: smlNtl,
	":-\\|"		: smlNtl,
	":P"		: smlRazz,
	":-P"		: smlRazz,
	";\\)"		: smlWink,
	";-\\)"		: smlWink,
	"rolls eyes": smlRoll,
	":o" 		: smlShock,
	":-o" 		: smlShock,
	"GUWPCT" 	: imgGUWPCT,
	"gold star" : imgStar
};

regex = {};

for (key in smileys) {

	regex[key] = new RegExp(key, 'g');
	
}


/*******whirlcode********/

var whirlCode = { 	                
					wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
					wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
					wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
					wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
					wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
					wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
					wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
					wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
					wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
					wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
					wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
					wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
					wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
					wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
					wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"}
			   }; 

/********whirlcode buttons*********/

var wcButtons = '<div id="buttonsDiv" style="text-align:center;">' +

			'<button type="button" class="wcodeButtons" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
			'<button type="button" class="wcodeButtons" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
			'<button type="button" class="wcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
			'<button type="button" class="wcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
			'<button type="button" class="wcodeButtons" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
			'<button type="button" class="wcodeButtons" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
			'<button type="button" class="wcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
			'<button type="button" class="wcodeButtons" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
			'<button type="button" class="wcodeButtons" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
			'<button type="button" class="wcodeButtons" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
			'<button type="button" class="wcodeButtons" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
			'<button type="button" class="wcodeButtons" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
			'<button type="button" class="wcodeButtons" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
			'<button type="button" class="wcodeButtons" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
			'<button type="button" class="wcodeButtons" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
			'<button type="button" class="wcodeButtons" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +

			'</div>';


/*******whirlcode buttons event handler********/		
			   
function doStuffToTheText(theTextBox){		
		   
	$('.wcodeButtons').mouseup(function(){
	
		var buttonID = $(this).attr('id');		
											
		var currentValue = theTextBox.value;
		
		var theSelection = document.selection.createRange().text;
		
		theTextBox.focus();
		
		if(theSelection === ""){
		
			if(buttonID == "wc_whirlurl"){ //for some reason IE7 considers an input box a security risk - so gotta do modal
				
				document.selection.createRange().text = '&<#^&#';
				
				$('body').prepend('<div id="modal" style="width:300px;height:80px;position:fixed;padding:15px'+
								  'z-index:50;top:50%;left:40%;opacity:1;background-color:#DBC0A2;">'+
								  '<p>Enter link <b>address</b>:</p><input style="margin-left:5px;" type="text" id="urlAddress">'+
								  '</input>&nbsp;<button type="button" class="cancel">Cancel</button>&nbsp;<button type="button" id="ok">OK</button></div>');
								  
				$('body').prepend('<div id="modal2" style="width:300px;height:80px;position:fixed;padding:15px'+
								  'z-index:49;top:50%;left:40%;opacity:1;background-color:#DBC0A2;">'+
								  '<p>Enter link <b>title</b>:</p><input type="text" id="urlName">'+
								  '</input>&nbsp;<button type="button" class="cancel">Cancel</button>&nbsp;<button type="button" id="ok2">OK</button></div>');								  
				
				$('.cancel').mouseup(function(){
				
					$('#modal,#modal2').remove();
					
					$('#body')[0].value = $('#body')[0].value.replace("&<#^&#","");
					
					theTextBox.focus();
					
				});
				
				setTimeout("$('#urlAddress').focus();", 5);
				
				var urlAdd;
				
				$('#ok')[0].onmouseup = firstOK;
				
				$('#urlAddress')[0].onkeyup = function (evt) {
				
					if (!evt) {
					
						evt = window.event;
						
					}
					if(evt.keyCode == 13){
					
						firstOK();
						
					}
				}; 
				
				function firstOK(){

					if ($('#urlAddress')[0].value !== ""){
					
						urlAdd = $('#urlAddress')[0].value;
						
						$('#modal').remove();
						
						setTimeout("$('#urlName').focus();", 5);
					}						

				}			
										
				$('#ok2')[0].onmouseup = secondOk;

				$('#urlName')[0].onkeyup = function (evt) {
				
					if (!evt) {
					
						evt = window.event;
						
					}
					if(evt.keyCode == 13){
					
						secondOk();
						
					}
				}; 
				
				function secondOk(){
				
					if ($('#urlName')[0].value !== ""){
					
						var urlN = $('#urlName')[0].value;
						
							$('#modal2').remove();		
											
						if(urlAdd.indexOf('http') < 0){

							$('#body')[0].value = $('#body')[0].value.replace('&<#^&#','<a href="http://'+urlAdd+'">'+urlN+'</a>');
							
						}
						else{

							$('#body')[0].value = $('#body')[0].value.replace('&<#^&#','<a href="'+urlAdd+'">'+urlN+'</a>');
														
						}
					
					}
				}
					
			}		
			
			else if(((currentValue.split(whirlCode[buttonID].encloseLeft).length+currentValue.split(whirlCode[buttonID].encloseRight).length)  % 2) === 0){
			
				document.selection.createRange().text = whirlCode[buttonID].encloseLeft;	
				
			}
			else{
			
				document.selection.createRange().text = whirlCode[buttonID].encloseRight;
					
			}
			
		}
		else if((theSelection !== "") && (buttonID != 'wc_whirlurl')){
		
				document.selection.createRange().text = whirlCode[buttonID].encloseLeft + theSelection + whirlCode[buttonID].encloseRight;
				
		}
		
		theTextBox.focus();
		
		theSelection = '';		
	
	});	
}


var lrl;

if(GM_getValue('wlrtrack') !== undefined){

	var wTrack = GM_getValue('wlrtrack');
		
}	


/*******run on forum-threads.cfm page********/

	/****Cookies & Last Read Function on forum-threads.cfm page*****/

if((document.URL.indexOf('threads') > -1) || (document.URL.indexOf('user') > -1)&&(document.cookie.substr(document.cookie.indexOf('LastReadTracker:')+16,4) == 'true')){

	$('td[@width=23] a').each(function(){
	
		var bottomLinkParent = $(this).parent();

		var cutHref = this.href.slice(this.href.indexOf('t=')+2,this.href.indexOf('&p=-1#bottom'));

		if((wTrack !== undefined) && (wTrack.indexOf(cutHref) > -1)){
		
			var getLastRead,getCount;
			
			if(wTrack.indexOf('t=', wTrack.indexOf(cutHref)) < 0){ //if it's at the end of the string
			
					getLastRead = wTrack.substr(wTrack.indexOf(cutHref));					

			}
			else{

				getLastRead = wTrack.substring(wTrack.indexOf(cutHref), wTrack.indexOf('t=', wTrack.indexOf(cutHref)));					
			
			}

			(document.URL.indexOf('user') > -1) ? getCount = bottomLinkParent.prev().prev().text()  :  getCount = bottomLinkParent.prev().prev().prev().prev().text();

			if( (Number(getCount) +1) > getLastRead.split('#r')[1]){ //new posts
					
					if(document.cookie.substr(document.cookie.indexOf('lrTrackBottom:')+14,4) == 'true'){
					
						bottomLinkParent.clone().css({opacity: "0.4"}).insertAfter(bottomLinkParent);
					
					}

					this.href = this.href.replace("&p=-1#bottom","").replace(""+cutHref+"", ""+getLastRead+"");

					bottomLinkParent.css({background:"#DDDDDD url(http://img.photobucket.com/albums/v215/thegooddale/red-ltgrey.gif) repeat scroll 0%"});

					$(this).attr('title','Jump to last read post').children('img').attr('alt','Jump to last read post');

			}
			else{ //no new posts

				this.href = this.href.replace("&p=-1#bottom","").replace(""+cutHref+"", ""+getLastRead+"");

				bottomLinkParent.css({background:"#DDDDDD url(http://img.photobucket.com/albums/v215/thegooddale/blue4-ltgrey.gif) repeat scroll 0%"});

				$(this).attr('title','No new posts').children('img').attr('alt','No new posts');

			}
		}

	});
	
}	//end Cookies & Last Read Function on forum-threads.cfm page

/*******run on forum-replies page********/

if (document.URL.indexOf('replies') > -1) {
	
	var threadNoCheck = $('#replies tr div a').contains('First post')[0].href;
	
	var threadNumberWc;

	if(threadNoCheck.indexOf('#') > -1) {
	
		if (threadNoCheck.indexOf('&') > -1){
		
			threadNumberWc = threadNoCheck.slice(threadNoCheck.indexOf('t=')+2, threadNoCheck.indexOf('&'));
	
		}
		else {
		
			threadNumberWc = threadNoCheck.slice(threadNoCheck.indexOf('t=')+2, threadNoCheck.indexOf('#'));
		
		}	
	
	}
	else{
	
		threadNumberWc = threadNoCheck.split('t=')[1];

	}
	

	var replyLink = $('.breadtask a:first')[0].href;
	
	/****Avatars*****/
	
	if(document.cookie.substr(document.cookie.indexOf('avatars:')+8,4) == 'true'){
	
		var lnk = document.createElement('LINK');
		lnk.rel = 'stylesheet';
		lnk.type = 'text/css';
		lnk.href = 'http://ideatriage.com/wlr/avatar/avatar.css';
		document.getElementsByTagName( 'HEAD' )[0].appendChild( lnk );	
		
		$("td[@class^=bodyuser]").each(function(){
		
			$(this).children('a:first').wrap('<div></div>'); //temp fix so the div:first-child in the WLR CSS works
			
			var tempLinkuserId = $(this).children('div:eq(2)').children('a:first')[0].href;
	
			var prunedId = tempLinkuserId.slice(tempLinkuserId.indexOf('id=')+3);
	
			$(this).parent().addClass('wlr_'+prunedId);
		
		});
	
	}
	if (replyLink.indexOf("print") === -1){ 	//check if thread is closed

		$('.greylink:even').after('&nbsp;<span class="bar">| </span><a class="qquoteie greylink" href="">q-quote</a>');
		
		/*******insert the quick quote text box********/

		$('#replies').after('<div align="center" id="quoteDiv">' +
		
				'<form action="'+replyLink+'" method="post">' +

				wcButtons+

				'<input class="" name="form" value="too right" type="hidden">' +
				
				'<input name="modewc" id="modewc" value="true" checked="checked" type="hidden">' +

				'<input name="modeht" id="modeht" value="true" checked="checked" type="hidden">' +

				'<input name="modebr" id="modebr" value="true" checked="checked" type="hidden">' +

				'<input name="modewl" id="modewl" value="true" checked="checked" type="hidden">' +			

				'<input name="modesp" id="modesp" value="true" checked="checked" type="hidden">' +

				'<textarea name="body" id="body" class="textCSS" cols="100" rows="12"></textarea>' +

				'<br/>' +

				'<input type="submit" id="prev" value="Show Preview" accesskey="v"/>&nbsp' +

				'<input type="reset" id="clearText" value="Clear" accesskey="x"/>' +

				'</form>' +

				'</div>');

		

		/***event handlers for Preview & Clear Buttons***/	
		var getOnce = $('#body');	
		
		var theTextBox = getOnce[0];
		
		$('#prev').mouseup(function(){
		
			this.value = 'Please wait...';
			
			return true;
			
		});	
		
		$('#clearText').mouseup(function(){
		
			theTextBox.value = "";
			
			theTextBox.focus();
			
			return false;
			
		});	

		/***quick quote function***/

		$('.qquoteie').click(function(){
		
			var theClick  = $(this);
			
			var txt = document.selection.createRange().text;
			
			var getLink = theClick.prev().prev().attr("href");
			
			var getPostId = getLink.slice(getLink.indexOf("r=")+2, getLink.indexOf("&tp"));
			
			var getUserName = theClick.parent().parent().prev().prev().find('.bu_name').text();
			
			var writesID = "[+"+getPostId+" "+getUserName+" writes... +]\n";
			
			var writesText = '["'+txt+'"]\n\n';
			
			var anyTextInBox = theTextBox.value;
			
			if (anyTextInBox !== ""){
			
				theTextBox.value = anyTextInBox+"\n"+writesID+writesText;
				
			}
			else{
			
				theTextBox.value = writesID+writesText;
				
			}
			
			window.scrollBy(0, 999999999);
			
			theTextBox.focus();
			
			return false;
			
		});
	
	
	getOnce.css("width","70%");
	
	doStuffToTheText(theTextBox);
	
	}

	
	/****Cookies & Last Read Function on forum-replies page*****/

	var anchorAray = []; 
	
	var hrefArray = [];	
		
	function getY( obj, linkHref ){
	
		//http://www.quirksmode.org/js/findpos.html
	
		var curtop = 0;
		
		if (obj.offsetParent) {
		
			curtop = obj.offsetTop;
			
			while (obj = obj.offsetParent) {
			
				curtop += obj.offsetTop;
				
			}
		}

		anchorAray.push(curtop);
		
		hrefArray.push(linkHref);
		
	}
	
	$('a[@title$=specific post]').each(function(){	

		getY(this, this.href);
			
	});

	function writeToGM(lrl){

		if(GM_getValue('wlrtrack') == undefined){

			GM_setValue('wlrtrack', lrl);
		}	
		else if(wTrack.indexOf(threadNumberWc) < 0){ //if the thread number is not in any cookie, 

				if(wTrack.split(',').length >= GM_getValue('numTracked')){

					GM_setValue('wlrtrack', lrl+wTrack.replace(wTrack.substr(wTrack.lastIndexOf('t=')),""));
				
				}
				else{

					GM_setValue('wlrtrack', lrl+GM_getValue('wlrtrack'));				
				
				}			
					
		}
		else if( wTrack.indexOf(threadNumberWc) > -1 ){  //if they move down an already tracked page - should save new anchor (if it's higher) and delete old one - 
				
			if( (wTrack.indexOf('t=', wTrack.indexOf(threadNumberWc)) < 0)  && ( Number(wTrack.substr(wTrack.indexOf('#r', wTrack.indexOf(threadNumberWc))+2) ) < Number(lrl.split('#r')[1]) ) ){ //if the lrl to replace is at the end of the string

				GM_setValue('wlrtrack', wTrack.replace(wTrack.substr(wTrack.indexOf(threadNumberWc)-2), lrl));
			}
			else if( Number(wTrack.substring(wTrack.indexOf('#r', wTrack.indexOf(threadNumberWc))+2, wTrack.indexOf('t=', wTrack.indexOf(threadNumberWc))) ) < Number(lrl.split('#r')[1]) ){
			
			   GM_setValue('wlrtrack', wTrack.replace(wTrack.substring(wTrack.indexOf(threadNumberWc)-2, wTrack.indexOf('t=', wTrack.indexOf(threadNumberWc))), lrl));
			
			}		
		}

	}
	
	
	function readFromCookieOnThread(){

		if(GM_getValue('wlrtrack') !== undefined){

			if(wTrack.indexOf(threadNumberWc) > -1) {

				var anchorfromCookie;

				if( wTrack.indexOf('t=', wTrack.indexOf(threadNumberWc)) < 0 ){ //if the anchor is at the end of the string
				
					var anSplit = wTrack.split('#r');
				
					anchorfromCookie = anSplit[anSplit.length-1];
				
				}
				else{
				
					anchorfromCookie = wTrack.substring( wTrack.indexOf('#r', wTrack.indexOf(threadNumberWc))+2, wTrack.indexOf('t=', wTrack.indexOf(threadNumberWc)));
				
				}
				
				var getAnchorNumber;

				for(h=0;h<hrefArray.length;h++){

					getAnchorNumber = Number(hrefArray[h].split('#r')[1]);

					if(getAnchorNumber <= anchorfromCookie){

						if(document.cookie.substr(document.cookie.indexOf('highlightRight:')+15,4) == 'true'){
							
							$('.bodypost a[@href$=#r'+getAnchorNumber+']').parent().css({background:"#C6CAD4 url(http://img.photobucket.com/albums/v215/thegooddale/highlight-reply.gif) repeat-x scroll center top"});
							
						}
						
					}
					if((getAnchorNumber == anchorfromCookie) && (document.URL.indexOf('bottom') < 0 ) && (document.URL.split('#r')[1] < getAnchorNumber)){

						window.location = "#"+getAnchorNumber;

					}
				}

			}
		}
	}
	
	function findMin(numArrayLength, tempAnchorAray){ 

		var tempHoldMeh;
		
		for(j=0;j<numArrayLength;j++){

			if(tempAnchorAray[0] >= 0){

				lrl = hrefArray[j].substr(hrefArray[j].indexOf('?')+1);				
			
				break;
			
			}
		
			if((tempAnchorAray[j] < 0) && ((tempAnchorAray[j] > tempHoldMeh) || (tempHoldMeh === undefined))){

				tempHoldMeh = tempAnchorAray[j];

				lrl = hrefArray[j].substr(hrefArray[j].indexOf('?')+1);

			}
		}
		
		writeToGM(lrl);	
	} 
	
	function saveTheCookieSaveTheWorld(){

		if(document.URL.indexOf('bottom') > -1){

			lrl = hrefArray[hrefArray.length-1].substr(hrefArray[hrefArray.length-1].indexOf('?')+1);

			writeToGM(lrl);
			
		}
		else{

			var numArrayLength = anchorAray.length;

			var tempAnchorAray = [];
			
	
			for(i=0;i<numArrayLength;i++){
	
				var tempHoldSingle = (anchorAray[i] - largestScrollY);

				tempAnchorAray.push(tempHoldSingle);

			}

			findMin(numArrayLength, tempAnchorAray);
		
		}	

	}
	
	

	if((document.URL.indexOf('&ux') < 0) && (document.cookie.substr(document.cookie.indexOf('LastReadTracker:')+16,4) == 'true')){

		var largestScrollY = document.documentElement.scrollTop + document.documentElement.clientHeight - 25;
		
		window.onscroll = function() {
		
			if ((document.documentElement.scrollTop + document.documentElement.clientHeight - 25) > largestScrollY){ 
				
				largestScrollY = (document.documentElement.scrollTop + document.documentElement.clientHeight - 25);			
			
			}
		};	
		
		window.onclose = saveTheCookieSaveTheWorld;	
		
		window.onunload = saveTheCookieSaveTheWorld;

		readFromCookieOnThread();
	
	}

	/****End of Cookies & Last Read Function on forum-replies page*****/


	/****Inline Images*****/
	
	if(document.cookie.substr(document.cookie.indexOf('InlineImages:')+13,4) == 'true'){
	
		$("a[@target=_blank]").each(function(){
		
			if(this.href.toLowerCase().lastIndexOf('.jpg') > -1){
			
				$(this).children('img:last').after('<br /><img width="400px" style="border:none;" src="'+this.href+'" />');
				
			}
			else if(this.href.toLowerCase().lastIndexOf('.jpeg') > -1){
			
				$(this).children('img:last').after('<br /><img width="400px" style="border:none;" src="'+this.href+'" />');
				
			}
			else if(this.href.toLowerCase().lastIndexOf('.bmp') > -1){
			
				$(this).children('img:last').after('<br /><img width="400px" style="border:none;" src="'+this.href+'" />');
				
			}
			else if(this.href.toLowerCase().lastIndexOf('.png') > -1){
			
				$(this).children('img:last').after('<br /><img width="400px" style="border:none;" src="'+this.href+'" />');
				
			}
			else if(this.href.toLowerCase().lastIndexOf('.gif') > -1){
			
				$(this).children('img:last').after('<br /><img width="400px" style="border:none;" src="'+this.href+'" />');
				
			}
		});	
	
	}
	
	/***Meat Sack's Smileys***/
	
	if(document.cookie.substr(document.cookie.indexOf('Smileys:')+8,4) == 'true'){
	
		$('.bodytext').each(function(){
		
			for (key in smileys) {
			
				var smilRep = $(this).html().replace(regex[key], smileys[key]);
				
				$(this).html(smilRep);
				
			}
		});	
	
	}
	
	/***Style Wiki Links***/
	if(document.cookie.substr(document.cookie.indexOf('StyleWiki:')+10,4) == 'true'){
	
		$('a').contains( 'index.cfm?a=wiki&tag' ).each( function(){
		
			var link = this.href;
			
			$(this).html( link.replace( /.*index.cfm\?\a\=wiki\&tag\=/gi, "" )).addClass('wiki');
		});
		
	}
	
	/***google code prettifier(kinda works)***/	
	if((document.title.indexOf('Coding & Web - Whirlpool Broadband Forums') > -1) && (document.cookie.substr(document.cookie.indexOf('CodeHighlight:')+14,4) == 'true')){
	
		var getCode = $('tt');
		
		getCode.wrap('<code class="prettyprint"></code>');

		var mysheet3=document.styleSheets[1];
	
		mysheet3.addRule(".str ", "color:#080;");
		mysheet3.addRule(".kwd ", "color:#008;");	
		mysheet3.addRule(".com ", "color:#800;");	
		mysheet3.addRule(".typ ", "color:#606;");
		mysheet3.addRule(".lit ", "color:#066;");	
		mysheet3.addRule(".pun ", "color:#660;");	
		mysheet3.addRule(".pln ", "color:#000;");		
		mysheet3.addRule(".tag ", "color:#008;");
		mysheet3.addRule(".atn ", "color:#606;");
		mysheet3.addRule(".atv ", "color:#080;");
		mysheet3.addRule(".dec ", "color:#606;");
		mysheet3.addRule("code.prettyprint ", "padding:2px;");
		
		getCode.each(function(){ //clean up &nbsp; glitch

			$(this).html($(this).html().replace(/&nbsp;/gi, 'spayCey'));

		});			



		// See http://code.google.com/p/google-code-prettify/
		(function () { 
		var F={};(function(){var b=["abstract bool break case catch char class const const_cast continue default delete deprecated dllexport dllimport do double dynamic_cast else enum explicit extern false float for friend goto if inline int long mutable naked namespace new noinline noreturn nothrow novtable operator private property protected public register reinterpret_cast return selectany short signed sizeof static static_cast struct switch template this thread throw true try typedef typeid typename union unsigned using declaration, directive uuid virtual void volatile while typeof",
		"as base by byte checked decimal delegate descending event finally fixed foreach from group implicit in interface internal into is lock null object out override orderby params readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var","package synchronized boolean implements import throws instanceof transient extends final strictfp native super","debugger export function with NaN Infinity","require sub unless until use elsif BEGIN END","and assert def del elif except exec global lambda not or pass print raise yield False True None",
		"then end begin rescue ensure module when undef next redo retry alias defined","done fi"];for(var c=0;c<b.length;c++){var a=b[c].split(" ");for(var d=0;d<a.length;d++){if(a[d]){F[a[d]]=true}}}}).call(this);function r(b,c){if(undefined===c){throw new Error("BAD");}if("number"!=typeof b){throw new Error("BAD");}this.end=b;this.style=c}r.prototype.toString=function(){return"[PR_TokenEnd "+this.end+(this.style?":"+this.style:"")+"]"};function q(b,c){if(undefined===c){throw new Error("BAD");}this.token=
		b;this.style=c}q.prototype.toString=function(){return"[PR_Token "+this.token+(this.style?":"+this.style:"")+"]"};function u(){this.next=0;this.ch="\u0000"}var J={lt:"<",gt:">",quot:'"',apos:"'",amp:"&"};u.prototype.decode=function(b,c){var a=c+1,d=b.charAt(c);if("&"===d){var f=b.indexOf(";",a);if(f>=0&&f<a+4){var h=b.substring(a,f),i=null;if(h.charAt(0)==="#"){var e=h.charAt(1),g;if(e==="x"||e==="X"){g=parseInt(h.substring(2),16)}else{g=parseInt(h.substring(1),10)}if(!isNaN(g)){i=String.fromCharCode(g)}}if(!i){i=
		J[h.toLowerCase()]}if(i){d=i;a=f+1}else{a=c+1;d="\u0000"}}}this.next=a;this.ch=d;return this.ch};function x(b){return b>="a"&&b<="z"||b>="A"&&b<="Z"}function z(b){return x(b)||b=="_"||b=="$"||b=="@"}function s(b){return"\t \r\n".indexOf(b)>=0}function w(b){return b>="0"&&b<="9"}function I(b){var c=0,a=b.length-1;while(c<=a&&s(b.charAt(c))){++c}while(a>c&&s(b.charAt(a))){--a}return b.substring(c,a+1)}function y(b,c){return b.length>=c.length&&c==b.substring(0,c.length)}function L(b,c){return b.length>=
		c.length&&c==b.substring(b.length-c.length,b.length)}function A(b,c,a){if(c<a.length){return false}for(var d=0,f=a.length;d<f;++d){if(a.charAt(d)!=b[d]){return false}}return true}function H(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\xa0/g,"&nbsp;")}function E(b){return"XMP"==b.tagName}var B=null;function N(b){if(null==B){var c=document.createElement("PRE");c.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));B=!/</.test(c.innerHTML)}if(B){var a=
		b.innerHTML;if(E(b)){a=H(a)}return a}var d=[];for(var f=b.firstChild;f;f=f.nextSibling){D(f,d)}return d.join("")}function D(b,c){switch(b.nodeType){case 1:var a=b.tagName.toLowerCase();c.push("<",a);for(var d=0;d<b.attributes.length;++d){var f=b.attributes[d];if(!f.specified){continue}c.push(" ");D(f,c)}c.push(">");for(var h=b.firstChild;h;h=h.nextSibling){D(h,c)}if(b.firstChild||!/^(?:br|link|img)$/.test(a)){c.push("</",a,">")}break;case 2:c.push(b.name.toLowerCase(),'="',b.value.replace(/&/g,"&amp;").replace(/</g,
		"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\xa0/,"&nbsp;"),'"');break;case 3:case 4:c.push(H(b.nodeValue));break}}function M(b,c){var a=0,d=new u,f=[];for(var h=0;h<b.length;++h){var i=b[h];if(i.style==null){f.push(i);continue}var e=i.token,g=0,k=[];for(var l=0,j=e.length;l<j;l=d.next){d.decode(e,l);var o=d.ch;switch(o){case "\t":k.push(e.substring(g,l));var m=c-a%c;a+=m;for(;m>=0;m-="                ".length){k.push("                ".substring(0,m))}g=d.next;break;case "\n":case "\r":a=
		0;break;default:++a}}k.push(e.substring(g));f.push(new q(k.join(""),i.style))}return f}function K(b){var c=/(?:[^<]+|<\/?[a-zA-Z][^>]*>|<)/g,a=b.match(c),d=[];if(a){var f=null;for(var h=0,i=a.length;h<i;++h){var e=a[h],g;if(e.length<2||e.charAt(0)!=="<"){if(f&&f.style==="pln"){f.token+=e;continue}g="pln"}else{g=null}f=new q(e,g);d.push(f)}}return d}function G(b,c){var a=[],d=0,f=0,h=0,i=new q("",null);for(var e=0,g=c.length,k=0;e<g;++e){var l=c[e],j=l.end;if(j===k){continue}var o=j-f,m=i.token.length-
		h;while(m<=o){if(m>0){a.push(new q(i.token.substring(h,i.token.length),null==i.style?null:l.style))}f+=m;h=0;if(d<b.length){i=b[d++]}o=j-f;m=i.token.length-h}if(o){a.push(new q(i.token.substring(h,h+o),l.style));f+=o;h+=o}}return a}function R(b){var c=[],a=0,d=0,f=-1,h=new Array(12),i=0,e=null,g=new u;for(var k=0,l=b.length;k<l;++k){var j=b[k];if("pln"!=j.style){d+=j.token.length;continue}var o=j.token;for(var m=0,n=o.length;m<n;){g.decode(o,m);var p=g.ch,v=g.next,t=null;switch(a){case 0:if("<"==
		p){a=1}break;case 1:i=0;if("/"==p){a=7}else if(null==e){if("!"==p){a=2}else if(x(p)){a=8}else if("?"==p){a=9}else if("%"==p){a=11}else if("<"!=p){a=0}}else if("<"!=p){a=0}break;case 2:if("-"==p){a=4}else if(x(p)){a=3}else if("<"==p){a=1}else{a=0}break;case 3:if(">"==p){a=0;t="dec"}break;case 4:if("-"==p){a=5}break;case 5:if("-"==p){a=6}break;case 6:if(">"==p){a=0;t="com"}else if("-"==p){a=6}else{a=4}break;case 7:if(x(p)){a=8}else if("<"==p){a=1}else{a=0}break;case 8:if(">"==p){a=0;t="tag"}break;case 9:if("?"==
		p){a=10}break;case 10:if(">"==p){a=0;t="src"}else if("?"!=p){a=9}break;case 11:if("%"==p){a=12}break;case 12:if(">"==p){a=0;t="src"}else if("%"!=p){a=11}break}if(i<h.length){h[i++]=p.toLowerCase()}if(1==a){f=d+m}m=v;if(t!=null){if(null!=t){if(e){if(A(h,i,e)){e=null}}else{if(A(h,i,"script")){e="/script"}else if(A(h,i,"style")){e="/style"}else if(A(h,i,"xmp")){e="/xmp"}}if(e&&i&&"/"==h[0]){t=null}}if(null!=t){c.push(new r(f,"pln"));c.push(new r(d+v,t))}}}d+=j.token.length}c.push(new r(d,"pln"));return c}
		function V(b){var c=[],a=0,d=-1,f=0;for(var h=0,i=b.length;h<i;++h){var e=b[h],g=e.token;if("pln"==e.style){var k=new u,l=-1,j;for(var o=0,m=g.length;o<m;l=o,o=j){k.decode(g,o);var n=k.ch;j=k.next;if(0==a){if(n=='"'||n=="'"||n=="`"){c.push(new r(f+o,"pln"));a=1;d=n}else if(n=="/"){a=3}else if(n=="#"){c.push(new r(f+o,"pln"));a=4}}else if(1==a){if(n==d){a=0;c.push(new r(f+j,"str"))}else if(n=="\\"){a=2}}else if(2==a){a=1}else if(3==a){if(n=="/"){a=4;c.push(new r(f+l,"pln"))}else if(n=="*"){a=5;c.push(new r(f+
		l,"pln"))}else{a=0;j=o}}else if(4==a){if(n=="\r"||n=="\n"){a=0;c.push(new r(f+o,"com"))}}else if(5==a){if(n=="*"){a=6}}else if(6==a){if(n=="/"){a=0;c.push(new r(f+j,"com"))}else if(n!="*"){a=5}}}}f+=g.length}var p;switch(a){case 1:case 2:p="str";break;case 4:case 5:case 6:p="com";break;default:p="pln";break}c.push(new r(f,p));return G(b,c)}function S(b,c){var a=0,d=0,f=new u,h;for(var i=0;i<=b.length;i=h){if(i==b.length){g=-2;h=i+1}else{f.decode(b,i);h=f.next;var e=f.ch,g=d;switch(d){case 0:if(z(e)){g=
		1}else if(w(e)){g=2}else if(!s(e)){g=3}if(g&&a<i){var k=b.substring(a,i);c.push(new q(k,"pln"));a=i}break;case 1:if(!(z(e)||w(e))){g=-1}break;case 2:if(!(w(e)||x(e)||e=="_")){g=-1}break;case 3:if(z(e)||w(e)||s(e)){g=-1}break}}if(g!=d){if(g<0){if(i>a){var k=b.substring(a,i),l=new u;l.decode(k,0);var j=l.ch,o=l.next==k.length,m;if(z(j)){if(F[k]){m="kwd"}else if(j==="@"){m="lit"}else{var n=false;if(j>="A"&&j<="Z"){for(var p=l.next;p<k.length;p=l.next){l.decode(k,p);var v=l.ch;if(v>="a"&&v<="z"){n=true;
		break}}if(!n&&!o&&k.substring(k.length-2)=="_t"){n=true}}m=n?"typ":"pln"}}else if(w(j)){m="lit"}else if(!s(j)){m="pun"}else{m="pln"}a=i;c.push(new q(k,m))}d=0;if(g==-1){h=i;continue}}d=g}}}function X(b){if(!(b&&b.length)){return b}var c=R(b);return G(b,c)}function W(b){var c=[],a=0,d="tag",f=null,h=new u;for(var i=0;i<b.length;++i){var e=b[i];if("tag"==e.style){var g=e.token,k=0;for(var l=0;l<g.length;){h.decode(g,l);var j=h.ch,o=h.next,m=null,n=null;if(j==">"){if("tag"!=d){m=l;n="tag"}}else{switch(a){case 0:if("<"==
		j){a=1}break;case 1:if(s(j)){a=2}break;case 2:if(!s(j)){n="atn";m=l;a=3}break;case 3:if("="==j){m=l;n="tag";a=5}else if(s(j)){m=l;n="tag";a=4}break;case 4:if("="==j){a=5}else if(!s(j)){m=l;n="atn";a=3}break;case 5:if('"'==j||"'"==j){m=l;n="atv";a=6;f=j}else if(!s(j)){m=l;n="atv";a=7}break;case 6:if(j==f){m=o;n="tag";a=2}break;case 7:if(s(j)){m=l;n="tag";a=2}break}}if(m){if(m>k){c.push(new q(g.substring(k,m),d));k=m}d=n}l=o}if(g.length>k){c.push(new q(g.substring(k,g.length),d))}}else{if(e.style){a=
		0;d="tag"}c.push(e)}}return c}function U(b){var c=[],a=null,d=new u,f=null;for(var h=0,i=b.length;;++h){var e;if(h<i){e=b[h];if(null==e.style){b.push(e);continue}}else if(!a){break}else{e=new q("",null)}var g=e.token;if(null==a){if("src"==e.style){if("<"==d.decode(g,0)){d.decode(g,d.next);if("%"==d.ch||"?"==d.ch){a=d.ch;c.push(new q(g.substring(0,d.next),"tag"));g=g.substring(d.next,g.length)}}}else if("tag"==e.style){if("<"==d.decode(g,0)&&"/"!=g.charAt(d.next)){var k=g.substring(d.next).toLowerCase();
		if(y(k,"script")||y(k,"style")||y(k,"xmp")){a="/"}}}}if(null!=a){var l=null;if("src"==e.style){if(a=="%"||a=="?"){var j=g.lastIndexOf(a);if(j>=0&&">"==d.decode(g,j+1)&&g.length==d.next){l=new q(g.substring(j,g.length),"tag");g=g.substring(0,j)}}if(null==f){f=[]}f.push(new q(g,"pln"))}else if("pln"==e.style){if(null==f){f=[]}f.push(e)}else if("tag"==e.style){if("<"==d.decode(e.token,0)&&e.token.length>d.next&&"/"==d.decode(e.token,d.next)){l=e}else{c.push(e)}}else if(h>=i){l=e}else{if(f){f.push(e)}else{c.push(e)}}if(l){if(f){var o=
		C(f);c.push(new q("<span class=embsrc>",null));for(var m=0,n=o.length;m<n;++m){c.push(o[m])}c.push(new q("</span>",null));f=null}if(l.token){c.push(l)}a=null}}else{c.push(e)}}return c}function Q(b){var c=null,a=null;for(var d=0;d<b.length;++d){if("pln"==b[d].style){c=d;break}}for(var d=b.length;--d>=0;){if("pln"==b[d].style){a=d;break}}if(null==c){return b}var f=new u,h=b[c].token,i=f.decode(h,0);if('"'!=i&&"'"!=i){return b}var e=f.next,g=b[a].token,k=g.lastIndexOf("&");if(k<0){k=g.length-1}var l=
		f.decode(g,k);if(l!=i||f.next!=g.length){l=null;k=g.length}var j=[];for(var d=0;d<c;++d){j.push(b[d])}j.push(new q(h.substring(0,e),"atv"));if(a==c){j.push(new q(h.substring(e,k),"pln"))}else{j.push(new q(h.substring(e,h.length),"pln"));for(var d=c+1;d<a;++d){j.push(b[d])}if(l){b.push(new q(g.substring(0,k),"pln"))}else{b.push(b[a])}}if(l){j.push(new q(g.substring(k,g.length),"pln"))}for(var d=a+1;d<b.length;++d){j.push(b[d])}return j}function T(b){var c=[],a=null,d=false,f="";for(var h=0,i=b.length;h<
		i;++h){var e=b[h],g=c;if("tag"==e.style){if(d){d=false;f="";if(a){c.push(new q("<span class=embsrc>",null));var k=C(Q(a));for(var l=0,j=k.length;l<j;++l){c.push(k[l])}c.push(new q("</span>",null));a=null}}else if(f&&e.token.indexOf("=")>=0){var o=f.toLowerCase();if(y(o,"on")||"style"==o){d=true}}else{f=""}}else if("atn"==e.style){f+=e.token}else if("atv"==e.style){if(d){if(null==a){a=[]}g=a;e=new q(e.token,"pln")}}else{if(a){g=a}}g.push(e)}return c}function C(b){var c=V(b),a=[];for(var d=0;d<c.length;++d){var f=
		c[d];if("pln"===f.style){S(f.token,a);continue}a.push(f)}return a}function O(b){var c=X(b);c=W(c);c=U(c);c=T(c);return c}function P(b){var c=M(K(b),8),a=false;for(var d=0;d<c.length;++d){if("pln"==c[d].style){if(y(I(c[d].token),"&lt;")){for(var f=c.length;--f>=0;){if("pln"==c[f].style){a=L(I(c[f].token),"&gt;");break}}}break}}return a?O(c):C(c)}function Z(b){try{var c=P(b),a=[],d=null;for(var f=0;f<c.length;f++){var h=c[f];if(h.style!=d){if(d!=null){a.push("</span>")}if(h.style!=null){a.push("<span class=",
		h.style,">")}d=h.style}var i=h.token;if(null!=h.style){i=i.replace(/(\r\n?|\n| ) /g,"$1&nbsp;").replace(/\r\n?|\n/g,"<br>")}a.push(i)}if(d!=null){a.push("</span>")}return a.join("")}catch(e){if("console"in window){console.log(e);console.trace()}return b}}function Y(){var b=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],c=[];for(var a=0;a<b.length;++a){for(var d=0;d<b[a].length;++d){c.push(b[a][d])}}b=null;var f=0;function h(){var i=
		(new Date).getTime()+250;for(;f<c.length&&(new Date).getTime()<i;f++){var e=c[f];if(e.className&&e.className.indexOf("prettyprint")>=0){var g=false;for(var k=e.parentNode;k!=null;k=k.parentNode){if((k.tagName=="pre"||k.tagName=="code"||k.tagName=="xmp")&&k.className&&k.className.indexOf("prettyprint")>=0){g=true;break}}if(!g){var l=N(e);l=l.replace(/(?:\r\n?|\n)$/,"");var j=Z(l);if(!E(e)){e.innerHTML=j}else{var o=document.createElement("PRE");for(var m=0;m<e.attributes.length;++m){var n=e.attributes[m];
		if(n.specified){o.setAttribute(n.name,n.value)}}o.innerHTML=j;e.parentNode.replaceChild(o,e)}}}}if(f<c.length){setTimeout(h,250)}}h()};this.prettyPrint=Y;
		; })();

		prettyPrint();
		
		$('tt,.wcrep2').each(function(){ //clean up &nbsp; glitch
	
			$(this).html($(this).html().replace(/spayCey/g, '&nbsp;'));
	
		});

	}

	/***Hide User's Posts (for IE only)***/
	
	if(document.cookie.substr(document.cookie.indexOf('HidePosts:')+10,4) == 'true'){
		
		var nortiUsers, getUserName;
	
		if(GM_getValue("hiddenUsers") == undefined){

			GM_setValue("hiddenUsers", encodeURI("none"));

		}
		if(decodeURI(GM_getValue("hiddenUsers")) != "none"){

			nortiUsers = decodeURI(GM_getValue("hiddenUsers")).split("&");

			nortiUsers.pop();

		}

		$('.bodyuser div').not('.name_cont').contains('User #').append('<a style="margin-left:8px;color:#B45500;" class="hideClick" href="">Hide</a>');
		
		var hideclick = $('.hideClick');
		
		hideclick.each(function(){

			$(this).click(function(){

				getUserName = $(this).parent().next().children().children().text();	

				if($(this).text() == "Hide"){

					var currentList = decodeURI(GM_getValue("hiddenUsers"));
					
					if(GM_getValue("hiddenUsers") == "none"){

						GM_setValue("hiddenUsers", encodeURI(getUserName+"&"));

						replacePostText();

					}
					else{

						GM_setValue("hiddenUsers", encodeURI(currentList+getUserName+"&"));

						nortiUsers = decodeURI(GM_getValue("hiddenUsers")).split("&");

						nortiUsers.pop();

						replacePostText();	

					}			

				}
				else if($(this).text() == "Show"){	
	
						if((nortiUsers == undefined) || (nortiUsers.length == 1)){

							GM_setValue("hiddenUsers", "none");						

						}	
						else{

							var removeUserFromList = decodeURI(GM_getValue("hiddenUsers")).replace(""+getUserName+"&", "");

							GM_setValue("hiddenUsers", encodeURI(removeUserFromList));

							nortiUsers = decodeURI(GM_getValue("hiddenUsers")).split("&");

							nortiUsers.pop();	

						}

						$('.bodytext').contains(getUserName+' writes...').children().toggle();

						var tempHoldShow = $('.bodyuser').contains(getUserName);

						tempHoldShow.next().children().toggle();

						tempHoldShow.find('a.hideClick').text('Hide');
						
				}
						
				return false;

			});	

		});
	
	
		function replacePostText(){

			if(nortiUsers == undefined){

					var tempHoldOneA = $('.bodyuser').contains(getUserName);

					tempHoldOneA.next().children().hide();

					tempHoldOneA.next().prepend('<span style="opacity:0.5;">Post Hidden</span>');

					tempHoldOneA.find('a.hideClick').text('Show');
					
					var tempHoldTwoB = $('.bodytext').contains(getUserName+' writes...');

					tempHoldTwoB.children().hide();

					tempHoldTwoB.prepend('<span style="opacity:0.5">Post Hidden</span>');						

			}	
			else{

				for(var i=0;i<nortiUsers.length;i++){

					var tempHoldOneC = $('.bodyuser').contains(nortiUsers[i]);

					tempHoldOneC.next().children().hide();

					tempHoldOneC.next().prepend('<span style="opacity:0.5;">Post Hidden</span>');

					tempHoldOneC.find('a.hideClick').text('Show');
					
					var tempHoldTwoD = $('.bodytext').contains(nortiUsers[i]+' writes...');

					tempHoldTwoD.children().hide();

					tempHoldTwoD.prepend('<span style="opacity:0.5">Post Hidden</span>');	
										

				}	

			}

		}
		
		replacePostText();	
		
	}
	
	/***My Rig***/

	if(document.cookie.substr(document.cookie.indexOf('MyRig:')+6,4) == 'true'){

		var currentWikiList = {	
								"108637"  	: "pcb_AusScare",
								"72323"		: "pcb_Ay%20eN%20De%20whY",
								"87112"		: "pcb_benly",
								"116070"	: "pcb_B_o_",
								"6538"		: "userspec_bagurk",
								"67098"		: "pcb_blackflame",
								"101178"  	: "userspec__Bobso_",
								"65032"  	: "userspec_BonoVox",
								"62034"		: "userspec_borgnefesse",
								"142916"	: "userspec_Brtttt",
								"145221"	: "userspec_bursty007",
								"140196"	: "userspec_camerooney81",
								"163032"	: "userspec_chickenrice",
								"55432"	        : "userspec_crysalis",
								"32744"	        : "userspec_Chris",
								"139685"	: "userspec_Dan1605",
								"161601"	: "Dave963",
								"113221"	: "pcb_daredevil77",
								"93556"	        : "pcb_Degrador",
								"92566"	        : "pcb_duff",
								"39034"	        : "DejaVoodoo",
								"128485"	: "userspec_dlnqnt",
								"173289"	: "userspec_eukaryote",
								"64250"	        : "userspec_EwarWoo",
								"137309"	: "userspec_evonet",
								"113221"	: "pcb_daredevil77",
								"101448"	: "userspec_fat_dogs",
								"139148"	: "userspec_finzy",
								"156243"	: "userspec_FJ_P510",
								"90375" 	: "userspec_fineri",
								"169739"	: "pcb_giordano",
								"132594"	: "pcb_GIRAFFE",
								"154845"	: "pcb_grey",
								"92961"	        : "pcb_guff",
								"40942" 	: "userspec_hellman109",
								"104649"	: "userspec_hidden_ability",
								"66309" 	: "pcb_iamviet3",
								"146882"	: "James01",
								"85332" 	: "pcb_jasrulz",
								"43189" 	: "userspec_K8Canb",
								"165123"	: "userspec_Kickz101",
								"135132"	: "userspec_kiplinght",
								"100820"	: "userspec_kv7",
								"166424"	: "userspec_Krucigen",
								"123612"	: "userspec_lijy",
								"139075"	: "Lugo",
								"154308"	: "userspec_membreya",
								"127690"	: "userspec_migod",
								"15325" 	: "userspec_modafroman",
								"137738" 	: "usersspec_monopoly",
								"31129" 	: "userspec_MnEmOnIcS",
								"96828" 	: "userspec_MMB",
								"112307" 	: "userspec_PhOeNiX83",
								"165597"	: "userspec_pookstar",
								"21915" 	: "userspec_psyrus",
								"12990" 	: "pcb_pyro",
								"133424"	: "userspec_Rah_Xephon",
								"116215"	: "userspec_raverz",
								"127311"	: "userspec_redwan",
								"161105"	: "userspec_richardczz",
								"25999" 	: "userspec_S-Murfy",
								"5977"  	: "userspec_s3n",
								"133848"	: "userspec_sean_finn",
								"99612" 	: "userspec_sick0o",
								"134053"	: "userspec_the_stig",
								"63699"		: "Simon%20K",
								"144752"	: "51M0N",
								"165010"	: "steenholdt",
								"105767"	: "pcb_timmmmaaaah",
								"103079"  	: "userspec_Womble89",
								"5790"  	: "userspec_WikiWil",
								"148388"  	: "userspec_Xam",
								"125815"  	: "userspec_zuey-"
								};
		
		
		
		
			var voteBlockArray = $('.voteblock');
			
			var parentID;
			
			voteBlockArray.each(function(){
			
				parentID = "d"+$(this).siblings('a:eq(0)').attr('name');
		
				$(this).after('<div id="'+parentID+'" style="display:none;position:absolute;margin:-80px 0 0 210px;*margin:-80px 0 0 110px;'+
				'z-index:5;width:600px;background-color:#EBE8FF;overflow:auto;max-height:400px;border:5px solid #868686;"></div><p><a '+
				'style="font:12px Georgia1;color:#A1A1C7;" class="rigLink" href="#">My Rig</a></p>');
				
			});
			
			$('.rigLink').click( function(event) { 
			
				event.preventDefault();
				
				var userNo = $(this).parent().siblings('div:eq(2)').children('a')[0].href.split('id=')[1];

				var wikiLink;
			
				if (currentWikiList[userNo]){
				
					wikiLink = "http://forums.whirlpool.net.au/index.cfm?a=wiki&tag=" + currentWikiList[userNo];
				
				}
				else{
				
					wikiLink = "http://forums.whirlpool.net.au/index.cfm?a=wiki&tag=userspec_" + userNo;
				
				}
		
				var getparentID = "d"+$(this).parent().siblings('a:eq(0)').attr('name');		
				
				var parentIDGetonce = $('#'+getparentID+'');		
				
				if(parentIDGetonce.css("display") == 'none'){		
				
				parentIDGetonce.css("display","block"); 
		
				function showImages() {
				
					if($('#'+getparentID+' .dynImage')[0] !== undefined){
						
						$('#'+getparentID+' .dynImage').remove();
						
					}
					else{
					
						$('#'+getparentID+' a[@target=_blank]').each(function(){
						
							if(this.href.toLowerCase().lastIndexOf('.jpg') > -1){
							
								$(this).children('img:last').after('<br /><img class="dynImage" width="400px" style="border:none;" src="'+this.href+'" />');
								
							}
							else if(this.href.toLowerCase().lastIndexOf('.jpeg') > -1){
							
								$(this).children('img:last').after('<br /><img class="dynImage" width="400px" style="border:none;" src="'+this.href+'" />');
								
							}
							else if(this.href.toLowerCase().lastIndexOf('.bmp') > -1){
							
								$(this).children('img:last').after('<br /><img class="dynImage" width="400px" style="border:none;" src="'+this.href+'" />');
								
							}
							else if(this.href.toLowerCase().lastIndexOf('.png') > -1){
							
								$(this).children('img:last').after('<br /><img class="dynImage" width="400px" style="border:none;" src="'+this.href+'" />');
								
							}
							else if(this.href.toLowerCase().lastIndexOf('.gif') > -1){
							
								$(this).children('img:last').after('<br /><img class="dynImage" width="400px" style="border:none;" src="'+this.href+'" />');
								
							}
						});					
					
					}
				}
				
					parentIDGetonce.html('<img src="http://img.photobucket.com/albums/v215/thegooddale/ajax-loader.gif" />');
					
					$.get(wikiLink, function(data){
					
						if (data.indexOf("No entry yet for") < 0){
							
								var sliceData = data.slice(data.indexOf('<span id="wikicontent">'),data.indexOf('<a name="history">',data.indexOf('<span id="wikicontent">')));
							
								parentIDGetonce.html(sliceData).before('<a class="showImages" style="margin:-100px 0 0 570px;'+
								'clear:both;z-index:6;position:absolute;font-size:1em;color:#868686;" '+
								'href="#">Show Images</a><a class="closediv" style="margin:-110px 0 0 680px;'+
								'clear:both;z-index:6;position:absolute;font-weight:bold;font-size:2em;color:#868686;"'+
								'href="#">X</a>');
								
							}
											
							else { 							
								
								parentIDGetonce.html('<P style="margin-top:20px;">User has no rig details listed.</p><p '+
								'style="font-size:x-small;">See <a class="wiki" href="http://forums.whirlpool.net.au/index.c'+
								'fm?a=wiki&tag=userspec">this wiki entry</a> for details on how to add yours.').prepend('<a '+
								'class="closediv" style="float:right;font-weight:bold;padding:5px 10px" href="#">X</a>');						
								
							}
							
							$('.showImages').click(function(event){
							
								event.preventDefault();			
			
								if($(this).text() == 'Show Images'){
								
									$(this).text('Hide Images');
									
								}
								else{
								
									$(this).text('Show Images');
									
								}
							
								
								showImages();
								
							});	
							
							
							$('.closediv').click(function(event){
								
								event.preventDefault();
								
								parentIDGetonce.css("display","none"); 
								
								$(this).prev().remove();
								
								$(this).remove();
								
							});	
							
						});
					
					}
					else{
						
						parentIDGetonce.css("display","none"); 
						
						$(this).parent().siblings('a:gt(0)').remove()
						
					}
		
				return false;
			});

	}
	
}//end of run on forum-replies page


/***run on wiki pages****/

if(document.URL.indexOf('wiki') > -1){ 	
	
	var theTextBox = $('#f_body')[0];
	
	$('#f_body').after(wcButtons);
			
	doStuffToTheText(theTextBox);			
				
	}
/***run on whim read****/

if((document.URL.indexOf("whim-read")>-1) && (document.cookie.substr(document.cookie.indexOf('Smileys:')+8,4) == 'true')){ 	

	for (key in smileys) {
	
		var smilRep = $('#replies').html().replace(regex[key], smileys[key]);
		
		$('#replies').html(smilRep);
		
	}

}

/***run on whim send****/

if(document.URL.indexOf("whim-send")>-1){ 	

	var theTextBox = $('#body')[0];

	$('#body').css({width:'600px'}).before(wcButtons);
	
	$('#buttonsDiv').css({fontSize: '80%', textAlign: 'center', marginTop: '5px', marginBottom: '5px', width:'600px'});
	
	doStuffToTheText(theTextBox);
	
	if(document.cookie.substr(document.cookie.indexOf('Smileys:')+8,4) == 'true'){
	
		for (key in smileys) {
		
			var smilRep = $('td[@bgcolor="#c3c9de"]').html().replace(regex[key], smileys[key]);
			
			$('td[@bgcolor="#c3c9de"]').html(smilRep);
			
		}
	
	}

}
/***run on preview page****/
if(document.URL.indexOf("reply")>-1){ 	

	var theTextBox = $('#body')[0];

	$('#body').css({width:'600px',marginTop: '10px'}).before(wcButtons).parent().css('width','600px');

	doStuffToTheText(theTextBox);
	
	if(document.cookie.substr(document.cookie.indexOf('Smileys:')+8,4) == 'true'){

		for (key in smileys) {
		
			var smilRep = $('.bodytext:last').html().replace(regex[key], smileys[key]);
			
			$('.bodytext:last').html(smilRep);
			
		}

	}

}

/***run on user page****/
if(document.URL.indexOf("forum-user.cfm")>-1){ 

	var inputBody = $('#body');

	var theTextBox = inputBody[0];

	inputBody.before(wcButtons);
	
	$('#buttonsDiv').css({fontSize: '80%', textAlign: 'center', marginTop: '5px', marginBottom: '5px'}).parent().css("width","410px").parent().parent().css("width","410px");		
	
	doStuffToTheText(theTextBox);
	
	if(document.cookie.substr(document.cookie.indexOf('WhimBig:')+8,4) == 'true'){
	
		inputBody.css("width", "400px").attr("rows", "10");
		
		$('input[@name=subject]').css({width: '400px', marginBottom: '20px'});

	
	}
	
	if((document.URL.indexOf($(".nav_item_name > a > span").text().split('user ')[1]) > -1) && (document.cookie.substr(document.cookie.indexOf('HideOwnDetails:')+15,4) == 'true')){
		
		var aboutTr = $('tr[@valign=bottom]:first');
		
		aboutTr.css({cursor:'pointer'}).children('td').css("opacity","0.5").end().next().attr('id','hider');
		
		aboutTr.hover(function(){
				
				$(this).children('td').css("opacity","1");
			
			},function(){
				
				if(trHide.css('display') == 'none'){
					
					$(this).children('td').css("opacity","0.5");
				}
				else{
				
					$(this).children('td').css("opacity","0.9");
					
				}
		});
		
		var trHide = $('#hider');
		
		trHide.hide();
		
		aboutTr.toggle(function(){
		
			trHide.css('display','block');
			
		   $(this).children('td').css('opacity','0.9');
		   
		 },function(){
		 
			trHide.css('display','none');
			
		   $(this).children('td').css('opacity','0.5');
		   
		 });

	}
	
}

/***run on thread search page***/
if((document.URL.indexOf("search")>-1) && (document.URL.indexOf("head") < 0) && (document.cookie.substr(document.cookie.indexOf('SwickiSearch:')+13,4) == 'true')){

	function mywrite(s) {
	
			$("form[@action*=forum-search]").next().after('<div id="swikSearch" style="width:500px;margin:0 0 -20px 20px;">'+s+'</div>');
	}
	

	document.write = mywrite; //the Bravo magic
	
	var mysheet=document.styleSheets[1];

	mysheet.addRule("#swickiForm ", "padding:0;margin:0;");
	mysheet.addRule("#swickiSearch ", "background-color:#EEEEEE;font-family:Arial;font-size:10px;height:auto;padding:5px;");
	mysheet.addRule("#w ", "width:100%;"); 
	mysheet.addRule(".communitypowered ", "width:66%;color:#F05C25;font-size:9px;line-height:10px;padding:2px;");
	mysheet.addRule("#headertitle ", "float:left;font-size:13px;font-family:Arial;color:#666666;white-space:nowrap;text-transform:uppercase;");
	mysheet.addRule("#cloudheader ", "-moz-box-sizing: border-box;padding:5px 10px 2px 10px;text-align:left;height:22px;overflow:hidden;background:#EEEEEE;"); 
	mysheet.addRule(".hotcloud ", "padding:10px;background:#EEEEEE;font-family:Georgia;line-height:1.1;overflow:hidden;border-top:1px solid #FFFFFF;"); 
	mysheet.addRule(".clouditem a ", "text-decoration:none;color:#F26721;");
	mysheet.addRule(".clouditem a:hover ", "text-decoration:none;background:#f6f6f6; color:#F26721;");
	mysheet.addRule(".dellink ", "visibility:hidden;position:relative;top:-12px;left:-8px;background:#EEEEEE;font-size:10px;font-weight:bold;color:#F05C25;"); 
	mysheet.addRule(".link ", "font-size:11px;color:#F26721;text-decoration:none;");
	mysheet.addRule(".link:hover ", "text-decoration:underline;background:#f6f6f6;"); 
	mysheet.addRule(".clouditem a.recent_search ", "color: red;");
	mysheet.addRule("#cloudfooter ", "margin-top:5px;padding:5px;height:10px;"); 
	mysheet.addRule("#cloudmore ", "color:#F26721;float:right;"); 
	mysheet.addRule("#cloudquestionl ", "float:left;"); 
	mysheet.addRule("#cloudquestionr ", "float:right;"); 
	mysheet.addRule("#cloudanswer ", "display:none;padding:5px;font-family:Arial;font-size:11px;color:#000;text-align:left;"); 
	mysheet.addRule("#cloudanswer a ", "text-decoration:underline;"); 
	
	
	script = document.createElement('script'); 
	script.charset="UTF-8";
	script.type = 'text/javascript'; 
	script.src = "http://swicki.eurekster.com/sidebar?groupkey=4c78bb27-79f3-4878-a1bb-93e62086793a&target=_self&numresults=20&format=js"; 
	$("head").append(script);
	

}

var userNumber = $(".nav_item_name > a > span").text(); 

var mysheet2=document.styleSheets[1];
/***Style Buttons****/	

mysheet2.addRule("#prev", "border:0px solid gray; color:black; background:#FFDCBF; width:150px; font:16px Arial;margin:2px 10px 0 0;"); 
mysheet2.addRule("#clearText", "border:0px solid gray; color:black; background:#DAF2B3; width:150px; font:16px Arial;margin:2px 0 0 10px;"); 
mysheet2.addRule(".wcodeButtons", "color:black;font:11px Tahoma");
  
	
if(document.cookie.substr(document.cookie.indexOf('Quicknav:')+9,4) == 'true'){
  
  /***JB's Nav (the quarter)***/
	  
	mysheet2.addRule("#nav-container","position: fixed;left:132px;top: 24px;font-size:11px;font-family:Arial,sans-serif;z-index:1000;margin:25px 0 50px 15px;height:16px;overflow:hidden;");
	mysheet2.addRule("#nav-container:hover","height:235px;overflow: visible;cursor:pointer;");
	mysheet2.addRule("#nav-container img","border:none;margin-bottom:-3px;background-color: transparent;width: 16px;height: 16px;padding-right:20px;padding-bottom:2px;");
	mysheet2.addRule("#nav-container ul","padding:0;margin:0;list-style-type:none;width:130px;border-bottom: 1px solid #444;");
	mysheet2.addRule("#nav-container li","position:relative;background: rgb(58, 67, 123);height:23px;");
	mysheet2.addRule("#nav-container table","position:absolute; border-collapse:collapse; top:0; left:0; z-index:100; font-size:1em;");
	mysheet2.addRule("#nav-container a","display:block;text-decoration:none;height:22px;line-height:22px;width:129px;color:#FFF;text-indent:10px;border: 1px solid #444; border-width:1px 1px 0;");
	mysheet2.addRule("#nav-container a:hover","color:#fff; background: orange;");
	mysheet2.addRule("#nav-container :hover > a","color:#fff;background: orange;");
	mysheet2.addRule("#nav-container ul ul","visibility:hidden;position:absolute;top:0;left:130px;border-bottom: 1px solid #444;");
	mysheet2.addRule("#nav-container ul li:hover ul","visibility:visible;");
	mysheet2.addRule("#nav-container ul a:hover ul","visibility:visible;");
	mysheet2.addRule("#nav-container li","float:left;");
	mysheet2.addRule("#nav-container .righty li","background: rgb(97, 108, 163);");
	

	$("body").append('<div id="nav-container"> ' +
					'<img src="http://img.photobucket.com/albums/v215/thegooddale/index.png"> ' +					
					'<div class="menu"> ' +
					'<ul> ' +
					'<li><a href="#">WP User<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+userNumber.split(' ')[1]+'">Contributed Threads</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-user-online.cfm">People Online</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/whim.cfm?show=inbox">Inbox</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/whim.cfm?show=outbox">Outbox</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/whim-contacts.cfm">Contacts</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-subs.cfm">Subscriptions</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-search.cfm">Thread Search</a></li> ' +
					'<li><a href="http://whirlpool.net.au/user.cfm">Your Settings</a></li> ' +
					'<li><a href="http://whirlpool.net.au/login.cfm?logout='+userNumber.split(' ')[1]+'">Log out</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Technology<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=100">Broadband General</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=82">DSL Hardware</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=9">Networking</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=63">Coding &amp; Web</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=116">Web Hosting</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=80">IT &amp; Telco</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=87">Peer to peer</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=91">On the internet</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Voice<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=107">Voice over IP</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=114">Phones</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Computers<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=7">PC Hardware</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=10">Windows</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=38">Apple</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=39">Linux/BSD</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Lounges<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=112">Music Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=8">Gaming Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=83">Gadget Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=58">Movie Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=106">TV Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=71">Lifestyle Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=118">Sports Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=85">In the News</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=117">The Pool Room</a></li> ' +					
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Whirlpool<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=35">Forum feedback</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=92">Choosing an ISP</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Companies<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=14">BigPond</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=15">OptusNet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=68">Internode</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=72">iiNet - OzEmail</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=69">Netspace</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=94">Westnet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=90">TPG</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=95">People Telecom</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=102">aaNet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=105">Exetel</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=109">Adam</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=115">Wild I&amp;T</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=119">AAPT</a></li> ' +					
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Connections<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul class="righty"> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=67">Regional, Satellite</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=31">Other broadband</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=18">Wireless ISPs</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=99">ISDN, DoV</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=5">Dial-up internet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=97">Peering</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'</ul> ' +
					'</div> ' +
					'</div>');
				
}

