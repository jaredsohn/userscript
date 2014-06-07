// # Author: Xiao.L ( http://twitter.com/xiaoliulx )

// ==UserScript==
// @name           IMDb Top1000 Ratings Grabber
// @namespace      xiaol.org
// @description    Adds an IMDb style Top 1000 Voters' Rating with details under User Rating column for a Movie Title.(Additional Features: Ratings Demographic Report details could also be retrieved.)
// @include        http://www.imdb.com/title/tt*/
// @version        0.1.1 (10-Nov-2009)
// ==/UserScript==

// --------------------------------------------------------------------
// DISCLAIMER
// ----------
// Please note that this script is provided free of charge and comes with no warranty, any usage of this script is at your own risk
//
// ------------
// INSTALLATION
// ------------
// This is a Greasemonkey User Script. 
// 
// To install it, you need:
//     FireFox  (http://www.mozilla.org/firefox)
//     FireFox Extension - Greasemonkey (https://addons.mozilla.org/en-US/firefox/addon/748)
//
//   Install the Greasemonkey extension then restart Firefox and revisit this script.
//   Under Tools, there will be a new menu item to "Install User Script".
//   Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select "IMDb Top1000 Ratings Grabber", and click Uninstall.
//
// -----
// USAGE
// -----
// After installing the script, there will be an additional Top 1000 Voter's Ratings under the User Ratings column on the 
//   Movie Pages on IMDb, single click the stars to show a table of rating detials.
//
// Preference Configurations:
//   script user can further configure the script by changing the values below (within TP1K_PREFS Object).
//
//   PREFS.autoload    : [ true|false ] (controls whether the ratings are shown when the page first loads)
//                       when autoload is disabled: 
//                            use the [ Ctrl + Alt + t ] combination to manually activate the script
//
//   PREFS.demographic : [ true|false ] (controls whether the User Rating's Demographic report table is retrieved)
//                       this option is OFF by default, if the script user want of enable this feature simply edit the Preference Below
//                            When this feature is ON, reload the page, activate the current user script, single click the 
//                            [ User Rating ] stars to show a table of demographic breakdowns.
//
//   PREFS.top1k       : [ true|false ] (controls whether the Top 1000 User Ratings are loaded.)

// Preference Settings
var TP1K_PREFS={
				'autoload':true , //don't delete the period when configuring 
				'demographic':false ,
				'top1k':true
}

//_____________________________________________________________________________

var TP1K_LOADING_MSG='<p id="top1k-log">Loading Data...</p>';
var TP1K_NODATA_MSG='<p id="top1k-log">No Top 1000 Voter Rating information available at this time.</p>';
var TP1K_USER_NODATA_MSG='<p id="top1k-user-log">No User Rating Detail available at this time.</p>';
var TP1K_ERROR_MSG='<p id="top1k-log">ERROR:Complications occurred during retrieval of rating information.</p>'
var TP1K_WRAPPER_BLK='<h5><span>Top 1000<br/>User Rating:</span></h5><div id="tn15rating" class="two guest"><p id="top1k-log">&nbsp;</p></div>';
var TP1K_STARBAR=[
				'<div class="usr rating"></div><div class="general rating" onclick="top1k_toggleTblDisplay(\'top1k-table\');"><div class="starbar static"><div class="outer"><div class="inner" style="width:',//length needed
				'px;"></div></div></div><div class="meta"><b>',
				'/10</b>&nbsp;&nbsp;<a href="',
				'ratings-top_1000" class="tn15more">',
				'/1000 voters</a></div><div class="bottom"></div></div>'
];
var TP1K_TABLE=[
				'<div id="top1k-table" style="display:none;"><table cellspacing="0" cellpadding="0" border="0">',
				'</table>',
				'</div>'
];
var TP1K_SCRIPT='/* <![CDATA[ */function top1k_toggleTblDisplay(id){var tableEle=document.getElementById(id);if(tableEle.style.display==\'none\'){tableEle.style.display=\'block\';}else{tableEle.style.display=\'none\';};}/* ]]> */';
var TP1K_STYLE='#top1k-rating-info{margin-bottom:25px !important;}#top1k-rating-info h5{line-height:93%;}#top1k-rating-info h5 span{font-size:93%;font-weight:bold;}#top1k-log{}#top1k-table{}';

function TP1K_addStyleSheet(css) {
	var stylesheet=document.createElement('style');
	stylesheet.type='text/css';
	stylesheet.innerHTML=css;
	document.getElementsByTagName("head")[0].appendChild(stylesheet);
}

function TP1K_addScript(scriptContent){
	var newscript=document.createElement('script');
	newscript.type='text/javascript';
	newscript.innerHTML=scriptContent;
	document.body.appendChild(newscript);
}

function TP1K_cleanUpNodes(tmpNode){
	while(tmpNode.firstChild){
		tmpNode.removeChild(tmpNode.firstChild);
	}
	delete tmpNode;
}

function TP1K_parseTop1k(inputText,resultNode,userRatingNode){
	if(resultNode.childNodes.length==2){
		var regPattern=/^([\d]+)\sTop.+>([\d.]+)<.*/;
		var tmpElement=document.createElement('div');
		tmpElement.innerHTML=inputText;
		var parsedTables=tmpElement.getElementsByTagName('table');
		if(parsedTables.length<3){	
			if(TP1K_PREFS['demographic']){
				TP1K_getRemoteData((location.href+'ratings'),TP1K_parseFullRpt,null,userRatingNode);
			}
			resultNode.childNodes[1].innerHTML=TP1K_NODATA_MSG;
		}
		else{
			var parsedPgphs=tmpElement.getElementsByTagName('p');
			var dataExtract=parsedPgphs[1].innerHTML.match(regPattern);
			var tmpHTML=TP1K_STARBAR[0]+(dataExtract[2]*200/10)+TP1K_STARBAR[1]+dataExtract[2]+TP1K_STARBAR[2]+location.href+TP1K_STARBAR[3]+dataExtract[1]+TP1K_STARBAR[4];
			tmpHTML=tmpHTML+TP1K_TABLE[0]+parsedTables[0].innerHTML+TP1K_TABLE[1]+'<p>'+parsedPgphs[3].innerHTML+'</p>'+TP1K_TABLE[2];
			resultNode.childNodes[1].innerHTML=tmpHTML;
			if(TP1K_PREFS['demographic']&&userRatingNode){
				var tmpTable=parsedTables[1];
				var tmpDiv=document.createElement('div');
				tmpDiv.setAttribute('id','top1k-demograph');
				tmpDiv.appendChild(tmpTable);
				tmpDiv.style.display='none';
				userRatingNode.getElementsByClassName('general rating')[0].setAttribute('onclick','top1k_toggleTblDisplay(\'top1k-demograph\');');
				userRatingNode.appendChild(tmpDiv);
			}
			TP1K_cleanUpNodes(tmpElement);
		}
	}
	else{GM_log('Somthing went wrong in parseTop1K');}
}

function TP1K_parseFullRpt(inputText,resultNode,userRatingNode){
	GM_log('function TP1K_parseFullRpt called');
	var tmpElement=document.createElement('div');
	tmpElement.innerHTML=inputText;
	var parsedTables=tmpElement.getElementsByTagName('table');
	var tmpDiv=document.createElement('div');
	tmpDiv.setAttribute('id','top1k-demograph');
	tmpDiv.style.display='none';
	if(parsedTables.length<3){
		tmpDiv.innerHTML=TP1K_USER_NODATA_MSG;
	}
	else{
		var tmpTable=parsedTables[1];
		tmpDiv.appendChild(tmpTable);
	}
	userRatingNode.appendChild(tmpDiv);
	userRatingNode.getElementsByClassName('general rating')[0].setAttribute('onclick','top1k_toggleTblDisplay(\'top1k-demograph\');');
}

function TP1K_getRemoteData(desurl,parseFunction,wrapperNode,userNode){
	GM_xmlhttpRequest({
		method: 'GET',
		url: desurl,
		headers: {
			'User-agent': 'Mozilla/5.0 (Gecko)',
			'Accept': 'text/html,application/xml,text/xml,*/*',
			'Accept-Language': 'en-us'
			},
		onload: function(responseDetails) {
				//alert('responseDetails.status +' ' + responseDetails.statusText);
				parseFunction(responseDetails.responseText,wrapperNode,userNode);
			},
		onerror: function(response){
				GM_log('Somthing went wrong in xmlhttpRequest.');
			},
		onreadystatechange: function(response){
				if(desurl==(location.href+'ratings-top_1000')){
					if(response.readyState==1){
						var placeholder=document.getElementById('top1k-log');
						if(placeholder){
							placeholder.parentNode.innerHTML=TP1K_LOADING_MSG;
						}
					}
				}
			}
	});

}

//inserting the initial block
function TP1K_insertExtBlock(){
	var contentWrapper=document.getElementById('tn15content');
	var userRatingBlock=document.getElementById('star-rating-info');
	if(userRatingBlock){
		if(TP1K_PREFS['top1k']){
			TP1K_addScript(TP1K_SCRIPT);
			TP1K_addStyleSheet(TP1K_STYLE);
			var newRatingBlock=document.createElement('div');
			newRatingBlock.setAttribute('class', 'info-offset');
			newRatingBlock.setAttribute('id','top1k-rating-info');
			newRatingBlock.innerHTML=TP1K_WRAPPER_BLK;
			contentWrapper.insertBefore(newRatingBlock,userRatingBlock.nextSibling);
			TP1K_getRemoteData((location.href+'ratings-top_1000'),TP1K_parseTop1k,newRatingBlock,userRatingBlock);
		}
		else if(TP1K_PREFS['demographic']){
			TP1K_addScript(TP1K_SCRIPT);
			TP1K_addStyleSheet(TP1K_STYLE);
			TP1K_getRemoteData((location.href+'ratings'),TP1K_parseFullRpt,null,userRatingBlock);
		}
	}
	else{
		GM_log('No \'star-rating-info\' found on Page.');
	}
}

function TP1K_keyHandler(e) {
	if( !(document.getElementById('top1k-demograph')||document.getElementById('top1k-rating-info'))){
		if (e.ctrlKey && e.altKey && String.fromCharCode(e.charCode) == 't') {
			TP1K_insertExtBlock();
		}
	}
}


if(TP1K_PREFS.autoload){
	TP1K_insertExtBlock();
}
else{
	document.addEventListener('keypress', TP1K_keyHandler, false);
}

