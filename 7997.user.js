// Gmail Filter Assistant
// Copyright (c) 2007, Ming Zhang (kfkming@gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// GUID: {bffc3178-2849-4727-a62c-866b8ec0523d}
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
// select "Gmail Filter Assistant", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Gmail Filter Assistant
// @description   Help to manage the Gmail filters more efficiently
// @source        http://userscripts.org/scripts/show/7997
// @identifier    http://userscripts.org/scripts/source/7997.user.js
// @author        Ming (Amos) Zhang
// @date          2007-03-17
// @namespace     http://www.amoszhang.com/GmailFilterAssistant
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==
//

window.addEventListener('load', function() {
	autoupdate();
	// autoupdate function credit to Bjorn Rosell http://userscripts.org/scripts/show/7715
	function autoupdate() {
		debug("[autoupdate]: Entering...");
		GM_addStyle(FILTERASST_STYLES);

		// only check for updates one time a day
		var d = new Date();
		if (GM_getValue('_gfa_lastcheck') == d.getDate()) {
			debug('[autoupdate]: Only check update once per day. Leaving...');
			return;
		}
		
		// check for update
		GM_xmlhttpRequest({
			method:"GET",
			headers:{ 'Accept': 'text/plain'},
			url: SCRIPT_SHOW_URL,
			onload:function(result) {
				
			}
		});
		debug('[autoupdate]: Leaving...');
	}
}, true);

const Version = 0.19;        // the ';' at the end is necessary
const SCRIPT_SHOW_URL	= 'http://userscripts.org/scripts/show/7997';
const NUM_FILTER_ITEMS	= 14;
const DEBUG				= false;

const FILTERASST_STYLES =
	"table._gfa_ {"+
	"  width: 100%;"+
	"  border-width: 3;"+
	"  border-style: solid;" +
	"  border-color:#FAD163;" +
	"  background: #FFF7D7;"+
	"  cellspacing: 5px;"+
	"  cellpadding: 5px;"+
	"}"+
	"td._gfa_label {" +
	"  font-weight: bold;" +
	"  text-align: right;" +
	"  vertical-align: middle;" +
	"  padding: 5px;" +
	"  white-space: nowrap;"+
	"  font-family: arial,sans-serif;" +
	"}" +
	"span._gfa_navLink {" +
	"  background: #FAD163;"+
	"  border-color: #FAD163;"+
	"  border-width: 3;"+
	"  border-style: solid;" +
	"  font-weight: bold;" +
	"  text-align: middle;" +
	"  vertical-align: bottom;" +
	"  padding-top: 2px;" +
	"  padding-left: 4px;" +
	"  padding-bottom: 2px;" +
	"  padding-right: 4px;" +
	"  font-family: arial,sans-serif;" +
	"  white-space: nowrap;"+
	"  cursor: pointer;"+
	"  float: right;"+
	"  -moz-border-radius-topleft: 4px;"+
	"  -moz-border-radius-topright: 4px;"+
	"}" +
	"input._gfa_inputbox {" +
	"  font-weight: normal;" +
	"  text-align: left;" +
	"  vertical-align: middle;" +
	"  width : 90%;"+
	"  font-family: arial,sans-serif;" +
	"  font-size: 90%;" +
	"}" +
	"span.hovereffect:hover{background-color:#d0dbeb;}";
	
	const RSC_LANG={
	    'en'    :{
				title: "Filter Assistant",
				loading:"Loading...",
				running:'Running...',
				createfilter:"Create Filter",
				newversion:"New version of Gmail Filter Assistant available, install it ",
				here:"here",
				from: "From:",
				to: "To:", 
				subject:"Subject:",
				hasWord:"Hasword:",
				doesntHave:"Doesn't have:",
				hasAttachment:"Has attachment:",
				skipInbox:"Skip the inbox(Archive it)",
				markasread:"Mark it as read",
				starIt:"Star it", 
				applyLabel:"Apply the label",
				forward:"Forward it to",
				deleteIt:"Delete it",
				applytoexistingconvs:"Apply the filter to existing conversations",
				moreactions:"More actions...",
				newlabel:"New label...",
				backup:"Backup filter&label",
				restore:"Restore filter&label",
				consolidate:"Consolidate filters",
				hidenavtag:'Hide the navigation tag',
				popuplabel:'Your filter & label data',
				close:'Close',
				cancel:'Cancel',
				readingfilterlabeldataerror:"Reading filter and label data error, please try again later",
				popuptitlebackup:'Javascript doesn\'t have the capability to write disk file, please copy/paste the content in the textbox to a .txt file, and keep this file in a safe place.',
				popuptitlerestore:'Please copy/paste Filter & Label data from where you saved them to the text box below and click "Close"',
				popuprestorewarning:'WARNING!!\n\Restoring filter data will overwrite existing filters and may take several seconds to several minutes, depending on your connection speed. \n\nAre you sure you want to continue?',
				inputlabeltitle:'Please input the label name (maximal length 100):',
				failtoretrieveresult:'Fail to retrieve the result, the action may not be completed',
				emptycriteriawarning:'Warning: "From", "To", "Subject", "Hasword" and "Doesn\'t have" are all empty, are you sure you want to proceed?',
				selectatleastoneaction:'Please select at least one action',
				selectalabelorcreateone:'Please select a label or create a new one',
				itemintrashwarning:'Warning: Items in the Trash are not displayed in label views or the starred view.\nDo you still wish to create the filter?',
				foundduplicatefilterwarning:'Found a filter having the same criteria, overwrite it?',
				},
	'zh-CN'		:{
				title: "&#36807;&#28388;&#22120;&#21161;&#25163;",
				loading:"&#36733;&#20837;&#20013;...",
				running:"&#27491;&#22312;&#36816;&#34892;...",
				createfilter:"&#21019;&#24314;&#36807;&#28388;&#22120;",
				newversion:"&#21457;&#29616;&#26032;&#29256;&#26412;&#30340; Gmail Filter Assistant, &#23433;&#35013;&#35831;&#28857;",
				here:"&#36825;&#37324;",
				from: "&#26469;&#33258;:",
				to: "&#21457;&#24448;:",
				subject:"&#26631;&#39064;:",
				hasWord:"&#21547;&#26377;:",
				doesntHave:"&#27809;&#26377;:",
				hasAttachment:"&#24102;&#38468;&#20214;:",
				skipInbox:"&#36339;&#36807;&#25910;&#20214;&#31665;(&#30452;&#25509;&#23384;&#26723;)",
				markasread:"&#26631;&#35760;&#20026;&#24050;&#35835;",
				starIt:"&#26631;&#26143;",
				applyLabel:"&#26631;&#35760;&#20026;",
				forward:"&#36716;&#21457;&#33267;",
				deleteIt:"&#21024;&#38500;",
				applytoexistingconvs:"&#23558;&#26412;&#36807;&#28388;&#22120;&#20316;&#29992;&#20110;&#24050;&#26377;&#23545;&#35805;",
				moreactions:"&#20854;&#20182;&#25805;&#20316;...",
				newlabel:"&#26032;&#24314;&#26631;&#31614;...",
				backup:"&#22791;&#20221;&#36807;&#28388;&#22120;&#21450;&#26631;&#31614;",
				restore:"&#24674;&#22797;&#36807;&#28388;&#22120;&#21450;&#26631;&#31614;",
				consolidate:"&#25972;&#21512;&#36807;&#28388;&#22120;",
				hidenavtag:'&#38544;&#34255;&#23548;&#33322;&#26631;&#31614;',
				popuplabel:'&#24744;&#30340;&#36807;&#28388;&#22120;&#21450;&#26631;&#31614;&#25968;&#25454;',
				close:'&#20851;&#38381;',
				cancel:'&#21462;&#28040;',
				readingfilterlabeldataerror:"&#35835;&#21462;&#36807;&#28388;&#22120;&#21450;&#26631;&#31614;&#25968;&#25454;&#36807;&#31243;&#20013;&#21457;&#29983;&#38169;&#35823;&#65292;&#35831;&#36831;&#20123;&#26102;&#20505;&#20877;&#35797;",
				popuptitlebackup:"Javascript &#26080;&#27861;&#35835;&#20889;&#30913;&#30424;&#25991;&#20214;&#65292;&#35831;&#23558;&#25991;&#26412;&#26694;&#20869;&#30340;&#25968;&#25454;&#25335;&#36125;/&#31896;&#36148;&#33267;&#19968;&#20010;&#25991;&#26412;&#25991;&#20214;&#24182;&#22949;&#21892;&#20445;&#23384;",
				popuptitlerestore:"&#35831;&#23558;&#20445;&#23384;&#30340;&#36807;&#28388;&#22120;&#21450;&#26631;&#31614;&#25968;&#25454;&#25335;&#36125;/&#31896;&#36148;&#33267;&#25991;&#26412;&#26694;&#28982;&#21518;&#28857;&#20987;&#8220;&#20851;&#38381;&#8221;",
				popuprestorewarning:"&#35686;&#21578;&#65281;&#24674;&#22797;&#25805;&#20316;&#23558;&#35206;&#30422;&#24050;&#26377;&#30340;&#36807;&#28388;&#22120;&#21450;&#26631;&#31614;&#25968;&#25454;&#65281;&#32780;&#19988;&#26681;&#25454;&#24744;&#30340;&#32593;&#32476;&#36895;&#24230;&#65292;&#25972;&#20010;&#36807;&#31243;&#21487;&#33021;&#25345;&#32493;&#20960;&#31186;&#38047;&#33267;&#20960;&#20998;&#38047;&#19981;&#31561;&#12290;\n\n&#30830;&#23450;&#35201;&#36827;&#34892;&#24674;&#22797;&#25805;&#20316;&#20040;&#65311;",
				inputlabeltitle:"&#35831;&#36755;&#20837;&#26631;&#31614;&#21517;&#65288;&#26368;&#38271;100&#23383;&#31526;&#65289;:",
				failtoretrieveresult:"&#35835;&#21462;&#32467;&#26524;&#22833;&#36133;&#65292;&#27492;&#39033;&#25805;&#20316;&#21487;&#33021;&#26410;&#39034;&#21033;&#23436;&#25104;",
				emptycriteriawarning:"&#35831;&#22635;&#20889;&#25628;&#32034;&#26465;&#20214;",
				selectatleastoneaction:"&#35831;&#36873;&#25321;&#33267;&#23569;&#19968;&#39033;&#25805;&#20316;",
				selectalabelorcreateone:"&#35831;&#36873;&#25321;&#19968;&#20010;&#26631;&#31614;&#25110;&#21019;&#24314;&#19968;&#20010;&#26032;&#26631;&#31614;",
				itemintrashwarning:"&#35686;&#21578;&#65306;&#26631;&#31614;&#35270;&#22270;&#25110;&#24050;&#21152;&#27880;&#26143;&#26631;&#30340;&#37038;&#20214;&#35270;&#22270;&#20013;&#19981;&#26174;&#31034;&#24050;&#21024;&#38500;&#37038;&#20214;&#20013;&#30340;&#20869;&#23481;&#12290;\n &#26159;&#21542;&#20173;&#35201;&#21019;&#24314;&#36807;&#28388;&#22120;&#65311;",
				foundduplicatefilterwarning:"&#21457;&#29616;&#19968;&#20010;&#24050;&#26377;&#36807;&#28388;&#22120;&#21547;&#26377;&#30456;&#21516;&#30340;&#25628;&#32034;&#26465;&#20214;&#65292;&#26159;&#21542;&#35206;&#30422;&#65311;",
			},
    'de'    :{
				title: "Filter Assistent",
				loading:"Lade...",
				running:'L&#228;uft...',
				createfilter:"Filter erstellen",
				newversion:"Eine neue Version von Gmail Filter Assistant ist verf&#252;gbar, installieren Sie es von",
				here:"hier",
				from: "Von:",
				to: "An:", subject:"Betreff:",
				hasWord:"Mit diesen Worten:",
				doesntHave:"Ohne:",
				hasAttachment:"Mit Anhang",
				skipInbox:"Posteingang &#252;berspringen (Archivieren)",
				markasread:"Markieren",
				starIt:"Markierung hinzuf&#252;gen", applyLabel:"Label anwenden",
				forward:"Weiterleiten an",
				deleteIt:"L&#246;schen",
				applytoexistingconvs:"Filter auf existierende Konversationen anwenden",
				moreactions:"Weitere Aktionen...",
				newlabel:"Neues Label...",
				backup:"Filter&Label sichern",
				restore:"Filter&Label wiederherstellen",
				consolidate:"Filter konsolidieren",
				hidenavtag:'Navigationslink verstecken',
				popuplabel:'Ihre Filter & Label Daten',
				close:'Schlie&#223;en',
				cancel:'Abbrechen',
				readingfilterlabeldataerror:"Fehler beim lesen der Filter und Label Daten. Bitte sp&#228;ter noch einmal versuchen",
				popuptitlebackup:'Javascript kann nicht auf die Festplatte schreiben. Bitte den Inhalt der Textbox in eine Text-Datei sichern.',
				popuptitlerestore:'Bitte kopieren (kopieren/einf&#252;gen) Sie die Filter & Label Daten aus Ihrer Sicherung in die Textbox unten und klicken Sie "Schlie&#233;en"',
				popuprestorewarning:'WARNUNG!! Wiederherstellen der Filterdaten wird existierende Filter &#252;berschreiben und kann (abh&#228;ngig von Iherer Verbindungsgeschwindigkeit) mehrere Minuten dauern. Sind Sie sicher, dass sie fortfahren wollen?',
				inputlabeltitle:'Bitte den neuen Label-Namen eingeben (maximal 100 Zeichen):',
				failtoretrieveresult:'Fehler das Ergebnis zu empfangen. Die aktion konnte evtl. nicht durchgef&#252;hrt werden',
				emptycriteriawarning:'Warnung: "Von", "An", "Betreff", "Mit diesen Worten" und "Ohne" sind alle leer. Sind Sie sicher, dass sie weitermachen wollen?',
				selectatleastoneaction:'Bitte w&#228;hlen Sie mindestens eine Aktion',
				selectalabelorcreateone:'Bitte w&#228;hlen Sie ein Label oder erstellen Sie ein neues',
				itemintrashwarning:'Warnung: Dinge im Papierkorb, oder markierte Nachrichten werden nicht in der Markiert oder Papierporb-Anschicht angezeigt.\nWollen Sie den Filter immer noch erstellen?',
				foundduplicatefilterwarning:'Ein Filter mit gleichen Kriterien wurde gefunden. Soll er &#252;berschrieben werden?',
			},
		};
                
//=========================
// Definition of variables
//=========================   
var baseURI=document.baseURI;
var labelData, filterData;
var isDataReady=false;
var currentLabel="";
var currentFilterData=null;
var at, ik;
var rawFilterLabelData='';
var lang='en';	// default language: English
var baseUrl='';
var messageIndex=-1;	// the index of the message on which GFA is called, only one GFA instance is allowed at any time
var floatingMsg='';

//=======================
// Definition of objects
//=======================
function ParamParsingData() {
    this.currentPosition = 0;
}

function Filter() {
    this.id=null;
    this.name='';

    this.from = '';
    this.to = '';
     this.subject = '';
    this.hasWord = '';
    this.doesntHave = '';
    this.hasAttachment = false;

    this.skipInbox = false;
	this.markAsRead = false;
    this.starIt = false;
    this.applyLabel = false;
    this.labelToApply = '';
    this.forward = false;
    this.forwardTo = '';
    this.deleteIt = false;
    this.applyOnExistingConvs = false;
}

var tmpdiv = newNode('div');

function myUnescape(s) {
    s=s.replace(/\\u/g, '%u');
    tmpdiv.innerHTML = unescape(s);
    return tmpdiv.innerHTML;
}

function getWord(s) {
    if (lang && RSC_LANG[lang] && RSC_LANG[lang][s])
        s= RSC_LANG[lang][s];
    else {
        debug('[getWord]: retrieve resource fail: RSC_LANG['+lang+']['+s+'] return null');
        s= RSC_LANG['en'][s];
        lang='en';
    }
    return myUnescape(s);
}

init();

function init() {
	// get base URL
	baseUrl=baseURI.match(/http[s]{0,1}:\/\/mail.google.com\/a\/[^\.].*\.[a-z]{2,}\//);    // google App for Your Domain mailbox

	if (!baseUrl)    //not found
		baseUrl=baseURI.match(/http[s]{0,1}:\/\/mail.google.com\/mail\//);    // gmail

	if (!baseUrl) {
		debug("[autoupdate]: Not a gmail page.");
		return;    // not a proper page
	}

	at = getDataItem(document.cookie,'GMAIL_AT=', ';');
	ik = GM_getValue('_gfa_'+baseUrl+'ik', null);
	lang = GM_getValue('_gfa_'+baseUrl+'lang', 'en');

    var new_ik = getDataItem(baseURI, 'ik=', '&');
    if (new_ik != null) {
		ik = new_ik;
		GM_setValue('_gfa_'+baseUrl+'ik', ik);
		debug('ik = '+ik);
	}

	window.setInterval(function() {
		drawFilterAsstBtn(); 
	}, 1000);
}

function drawFilterAsstBtn() {
	var els = getElementsByTag("SPAN");
	if (!els || els.length <= 0) return;
	
	var found = false;
	for (var key in els) {
		if (els[key] && (els[key].innerHTML == "show details" || els[key].innerHTML == "hide details"))	{
			var node = els[key].parentNode.parentNode.parentNode.lastChild;
			var id = node.firstChild.firstChild.getAttribute("id");
			if (getNode('_gfa_navlink_'+id)) continue;

			node = node.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];

			var separator=newNode('TD');
			separator.className='t9K9Me';
			separator.innerHTML='<DIV class="d3MNGb s77Qlb"/>';

			node.parentNode.insertBefore(separator, node.nextSibling.nextSibling);

			var link=newNode('TD');
			link.className="t9K9Me";
			link.innerHTML= '<DIV class="HHDPQd"><TABLE><TBODY><TR><TD><DIV class="SvrlRe" id="_gfa_navlink_'+id+'">'+'Filter Assistant'+'</DIV></TD></TR></TBODY></TABLE></DIV>';
			link.style.cursor="pointer";

			node.parentNode.insertBefore(link, separator.nextSibling);
			debug('insert GFA link');


			link = getNode('_gfa_navlink_'+id);
			link.addEventListener('mousedown', handleFilterAsstBtnClick, false);
			debug('insert separator');
		}
	}
}

function handleFilterAsstBtnClick(e) {
	e.stopPropagation();
    debug('[handleFilterAsstBtnClick]: Entering...');

	var old_msg_idx=messageIndex;
    var s=this.id;

    debug("this.id="+this.id);

    if (!s || !s.match(/^_gfa_navlink_[a-zA-Z0-9:]+$/)) return;

    messageIndex= s.substr(13);
	
	if (old_msg_idx!=messageIndex) {
		var node=getNode('_gfa_ws');
		if (node) node.parentNode.removeChild(node);
	}
    asynGetLabelFilterData(drawFilterAsstWorkspace, (getNode('_gfa_ws_div')==null));

    debug('[handleFilterAsstBtnClick]: Leaving...');
}

function asynGetLabelFilterData(callbackfunc, argument)
{
    if (typeof callbackfunc!='function') {
        debug('[asynGetLabelFilterData]: Invalid callback function. Leaving...');
        return;
    }

    if (isDataReady) {
        callbackfunc(argument);
        debug('[asynGetLabelFilterData]: Data is ready, no need to read again. Leaving...');
        return;
    }

    debug('[asynGetLabelFilterData]: Entering...');

    var navfilter=null;
    if (messageIndex!=-1) navfilter=getNode('_gfa_navlink_'+messageIndex);
    if (navfilter) navfilter.innerHTML='<b>'+getWord('loading')+'</b>';

	var filter_ref_url = baseUrl + '?ui=2&view=pu&usus=1&rt=j&ik=' + ik;

    GM_xmlhttpRequest({
        method:'GET',
        url: filter_ref_url,
        onload: function(responseDetails) {
            if (navfilter) navfilter.innerHTML=getWord('title');
            
            var data = responseDetails.responseText;
            var status = responseDetails.status;
            rawFilterLabelData=data;
            if (status!=200) return; // not OK

			debug('[asynGetLabelFilterData]: Reading label data....');
            labelData = getReturnValue(data, '["ub",[');
			if (labelData) {
				labelData.sort();
				debug('[asynGetLabelFilterData]: labelData='+labelData.toString());
				var i = 0;
				while (i<labelData.length)
				{
					if (labelData[i][0][0]=='^'){
						labelData.splice(i,1);
					}
					else
						i++;
				}
			}

			debug('[asynGetLabelFilterData]: Reading filter data....');
            filterData = getReturnValue(data, '["fi",');
            if (filterData) debug('[asynGetLabelFilterData]: filterData='+filterData.toString());
            
            isDataReady=true;
            debug('[asynGetLabelFilterData]: All data ready');

            callbackfunc(argument);

            if (currentFilterData!=null) {
				// recover the status before refreshing
                if (currentLabel!="") {
                    currentFilterData.labelToApply=currentLabel;
					var node = getNode('chkBoxApplyLabel');
					if (!node) node.setAttribute('checked', '1');
				}
				restoreUserChanges(currentFilterData);
                currentFilterData=null;
            }
            debug('[asynGetLabelFilterData]: Leaving...');
        },
        onerror: function(responseDetails){
            if (navfilter) navfilter.innerHTML=getWord('title');
            debug('[asynGetLabelFilterData]: Leaving...');
        }
    });
}

//=================================
// Draw Filter Assistant Workspace
//=================================
function createTitlebox() {
	var titlebox=getNode('_gfa_ws');    // the whole workspace
    var msg=getNode(messageIndex);

	// create the titlebox if it's not there. 
    if (!titlebox) {
		titlebox=newNode('tr');
		titlebox.id='_gfa_ws';
		titlebox.setAttribute('idx',messageIndex);
		msg.parentNode.parentNode.parentNode.parentNode.appendChild(titlebox);
	}
	return titlebox;
}

function drawFilterAsstWorkspace(show_boxes) {
    debug('[drawFilterAsstWorkspace]: Entering... show_boxes = '+show_boxes);

	var node=getNode('_gfa_ws_div');
	if (node)	// the workspace is there, hide it.
		node.parentNode.removeChild(node);

	debug('[drawFilterAsstWorkspace]: floatingMsg = '+floatingMsg);

	var titlebox=createTitlebox();
    titlebox.innerHTML=
        '<td colspan="3" style="width: 100%;"><table cellspacing="5px" cellpadding="5px" style="width: 100%;"><tbody>'
	+ (floatingMsg!=''? 
		('<tr id="_gfa_FloatingMsg">'
		+	'<td class="cbln"><div class="mb">'
		+	'<div align=center style="padding-top:5px;padding-bottom:5px;"><span style="background: #FAD163;-moz-border-radius:15px;padding: 3px 10px 3px 10px;"><b>'+myUnescape(floatingMsg)+'</b></span></div></div>'
		+	'<td class="cbrn">'
		+ '</tr>'):'')
	+'</tbody></table></td>';

	if (floatingMsg!='') {
		window.setTimeout(function(){
			var node=getNode('_gfa_FloatingMsg');
			if (node) node.parentNode.removeChild(node);
		}, 5000);	// delete the msg
	}
	floatingMsg='';

	if (!show_boxes) return;

	node=newNode('tr');
	
	titlebox.firstChild.firstChild.firstChild.appendChild(node);
	node.innerHTML= '<div class="ArwC7c" style="font-weight: bold;" id="_gfa_ws_div"/>' ;

	var div=getNode('_gfa_ws_div');
    if (!div) return;

	div.addEventListener('mousedown', function(e){e.stopPropagation();}, false);

    var LabelsCombBox    = newNode('select');
    LabelsCombBox.id    = "cbBoxLabels";
    var i;
    var opList;

	if (labelData)
		for (i=0; i<labelData.length;i++ ) {
			opList            = newNode('option');
			opList.innerHTML      = labelData[i][0];
			opList.addEventListener('click', checkApplyTheLabel, false);
			LabelsCombBox.appendChild (opList);
		}

    opList            = newNode('option');
    opList.id          = "opNewLabel"    // new label option
    opList.innerHTML  = getWord('newlabel');
    opList.addEventListener ('click', addLabel, false);

    if (labelData.length==1)
        LabelsCombBox.value=opList.value;
    else
        LabelsCombBox.value=currentLabel;
    LabelsCombBox.appendChild(opList);

    var subject='', sender='', recver='';

    //
    // !!! FIXME !!!
    //
    // The way to get subject, sender and receiver is very unstable. if multi-emails exist
    // in the conversation, the receiver may not be captured.
    var node = getNode(messageIndex);
	var email, item;
	try	{
	    var node = node.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
		if (node.childNodes[2]) {
			sender = node.childNodes[2].getAttribute('email');
			if (!sender) sender = '';
		}

		if (node.childNodes[4]) {
			// Search all the nodes and try to find "email" attribute.
            node=node.childNodes[4];

			for (i=0;i<node.childNodes.length;i++) {
				item = node.childNodes[i];
				email = '';
				if (item.getAttribute) {
					email = item.getAttribute('email');
					if (!email && item.firstChild && item.firstChild.getAttribute)
						email = item.firstChild.getAttribute('email');
					if (email.length>0) recver = (recver=='' ? email : recver + ' OR ' + email);
				}
			}
        }        
    }catch(e) {
        GM_log('Error occurred: Getting sender/receiver fail. \n\nDetailed error msg:\n\n['+e.name+']:'+e.message);
    }
    

    // ======================= add "Characteristic" part =============================
    div.innerHTML=
        '<table class="_gfa_">'
    +        '<tbody>'
    +           '<tr>'
    +                '<td class="_gfa_label">'+getWord('from')
    +                '<td width=40%><input type="text" class="_gfa_inputbox" id="txtBoxFrom" value="'+sender+'">'
    +                '<td class="_gfa_label" width=10%>'
    +                '<td class="_gfa_label">'+getWord('hasWord')
    +                '<td width=40%><input class="_gfa_inputbox" type="text" id="txtBoxHasWord">'
    +            '</tr>'
    +            '<tr>'
    +                '<td class="_gfa_label">'+getWord('to')
    +                '<td width=40%><input class="_gfa_inputbox" type="text" id="txtBoxTo" value="'+recver+'">'
    +                '<td class="_gfa_label" width=10%>'
    +                '<td class="_gfa_label">'+getWord('doesntHave')
    +                '<td width=40%><input class="_gfa_inputbox" type="text" id="txtBoxDoesntHave">'
    +            '</tr>'
    +            '<tr>'
    +                '<td class="_gfa_label">'+getWord('subject')
    +                '<td width=40%><input class="_gfa_inputbox" type="text" id="txtBoxSubject" value="'+subject+'">'
    +                '<td class="_gfa_label" width=10%>'
    +                '<td>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxHasAttachment">'+getWord('hasAttachment')
    +            '</tr>'
    +        '</tbody>'
    +    '</table>'
    +    '<table class="_gfa_" style="border-top:0px;">'
    +        '<tbody>'
    +            '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxSkipInbox">'+getWord('skipInbox')
    +                '<td class="_gfa_label" width=30% colspan=2>'
    +                '    <select id="selFilterMoreOptions">'
    +                '        <option style="color: #808080;"        >'+getWord('moreactions')+'</option>'
    +                '        <option    style="color: #808080;"        >--------------------</option>'
    +                '        <option id="opBackupFilters"        >'+getWord('backup')+'</option>'
    +                '        <option id="opRestoreFilters"        >'+getWord('restore')+'</option>'
    +                '        <option id="opConsolidateFilters" style="color: #808080;"    >'+getWord('consolidate')+'</option>'
    +                '    </select>'
    +            '</tr>'
	+			 '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxMarkAsRead">'+getWord('markasread')
    +                '<td width=30%>'
    +            '</tr>'
    +            '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxStarIt">'+getWord('starIt')
    +                '<td width=30%>'
    +            '</tr>'
    +            '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxApplyLabel">'+getWord('applyLabel')
    +                '<td width=30%>'
    +            '</tr>'
    +            '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxForwardTo">'+getWord('forward')+'<input type="text" id="txtBoxForwardTo">'
    +                '<td width=30%>'
    +            '</tr>'
    +            '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxDeleteIt">'+getWord('deleteIt')
    +                '<td width=30%>'    
    +            '</tr>'
    +            '<tr>'
    +                '<td width=30%>'
    +                '<td class="_gfa_label" style="text-align:left" width=40%><input type="checkbox" id="chkBoxApplyToExistingConvs">'+getWord('applytoexistingconvs')
    +                '<td width=15% style="padding: 5px;"><span id="_gfa_navlink_lblCancel'+messageIndex+'" class="_gfa_navLink" style="-moz-border-radius:8px;"><b>'+getWord('cancel')+'</b></span>'
    +                '<td width=15% style="padding: 5px;"><span id="lblCreateFilter" class="_gfa_navLink" style="-moz-border-radius:8px;"><b>'+getWord('createfilter')+'</b></span>'
    +            '</tr>'
    +        '</tbody>'
    +    '</table>'
    +'</td>';
    
    getNode('opBackupFilters').addEventListener('click', handleBackupFilters, false);
    getNode('opRestoreFilters').addEventListener('click', handleRestoreFilters, false);
    getNode('opConsolidateFilters').addEventListener('click', handleConsolidateFilters, false);
	node = getNode('lblCreateFilter');
    node.addEventListener('click', handleCreateFilter, false);
    node = getNode('_gfa_navlink_lblCancel'+messageIndex);
    node.addEventListener('click', handleFilterAsstBtnClick, false);
    node = getNode('chkBoxApplyLabel');
    node.parentNode.appendChild(LabelsCombBox);
    
    debug('[drawFilterAsstWorkspace]: Leaving...');
}

function checkApplyTheLabel() {
    try{getNode('chkBoxApplyLabel').checked=true;}catch(e){};
}

//=======================
// Draw the popup window
//=======================
function drawPopup(title, callback) {
    if (callback==null || typeof callback!='function') return;
    
    var popup = newNode('div');
    popup.id='_gfa_popup';
    popup.setAttribute("style", "z-index:1102;position:fixed;overflow:auto;width:470px;left:20px;top:20px;background-color:#FFF7D7;padding:15px;border:2px solid #FAD163");
    document.body.appendChild(popup);
    
    if (typeof title!='string' || title==null) title='';
    
    popup.innerHTML=
        ''+title+'<br><br>'
    +    '<b>'+getWord('popuplabel')+':<b><br>'
    +    '<textarea id="txtBoxFilters" style="width:465px; height:250px;">'
    +    '</textarea><br><br>'
    +    '<button id="btnClosePopup">'+getWord('close')+'</button>';
    
    getNode('btnClosePopup').addEventListener('click', callback, false);
}

//===========================
// Close popup event handler
//===========================
function handleClosePopup() {
    var node=getNode('_gfa_popup');
    if (node) node.parentNode.removeChild(node);
}

//=============================
// Backup filter event handler
//=============================
function handleBackupFilters() {
    if (rawFilterLabelData=='') {
        alert(getWord('readingfilterlabeldataerror'));
        return;
    }
    
    drawPopup(getWord('popuptitlebackup'), handleClosePopup);
    
    var node=getNode('txtBoxFilters');
    var s='';
    var header = '["fi",';
    
    s=s+header+getRawData(rawFilterLabelData, header)+']';
    s+='\n\n';
    header = '["ub",[';
    s=s+header+getRawData(rawFilterLabelData, header)+']';
	node.innerHTML=s;
}

//=============================
// Restore filter event handler
//=============================
function handleRestoreFilters() {
    drawPopup(getWord('popuptitlerestore'), RestoreFilters);
}

function RestoreFilters() {
    var f, l;    //filter data, label data
    var node=getNode('txtBoxFilters');
    var s='';

	if (node) s = node.value;
    handleClosePopup();
    if (s=='') return;
    
    f=getReturnValue(s, '["fi",');
    l=getReturnValue(s, '["ub",[');
    
    var node=getNode('_gfa_navlink_'+messageIndex);
    if (node) node.innerHTML=' <b>'+getWord('running')+'</b>';
    
    if (f) {
        if (!confirm(getWord('popuprestorewarning'))) {
            if (node) node.innerHTML=getWord('title');
            return;
        }
        
        var nHasInvalidData=0;
        var nEdit=0, nAdd=0;
        for (var i=0;i<f.length;i++) {
            // check data validity
            if (f[i].length<3 || f[i][2].length!=NUM_FILTER_ITEMS ||
                !isBoolValue(f[i][2][5]) ||    // Has attachment
                !isBoolValue(f[i][2][6]) ||    // Skip Inbox
                !isBoolValue(f[i][2][7]) ||    // Mark as read
                !isBoolValue(f[i][2][8]) ||    // Star It
                !isBoolValue(f[i][2][9]) ||    // Apply label
                !isBoolValue(f[i][2][11]) ||    // Forward it
                !isBoolValue(f[i][2][13]) )    // Delete it
                continue;
            else 
                // Further check if label/email are available if label/forward actions are taken.
                if ((f[i][2][9]=='true' && f[i][2][10]=='') ||        // try to apply a label, but given an empty string as label name
                    (f[i][2][11]=='true' && f[i][2][12].match(/^.+@[^\.].*\.[a-z]{2,}$/)==null) )    //try to forward the email but given an invalid email address
                    continue;
            
            // OK, now we think the data is valid, try to restore the filter data
            // check if the filter is already in the system            
            var fd = new Filter();
            fd.id = '';
            fd.name = '';
            fd.from				= f[i][2][0];
            fd.to				= f[i][2][1];
            fd.subject			= f[i][2][2];
            fd.hasWord			= f[i][2][3];
            fd.doesntHave		= f[i][2][4];
            fd.hasAttachment	= f[i][2][5];

            fd.skipInbox		= f[i][2][6];
			fd.markAsRead		= f[i][3][7];
            fd.starIt			= f[i][2][8];
            fd.applyLabel		= f[i][2][9];
            fd.labelToApply		= f[i][2][10];
            fd.forward			= f[i][2][11];
            fd.forwardTo		= f[i][2][12];
            fd.deleteIt			= f[i][2][13];
            
            var k=hasFilter(fd); // returns a filter id if found.
            if (k>=0) { 
				// found a filter having the same criteria
                // check if actions are same, too
                var same=true;
                for (var j=6;j<NUM_FILTER_ITEMS;j++)
                    if (same)
                        same = same && (f[i][2][j]!=filterData[k][2][j]);
                    else
                        break;
                
                // the two filters are the same, skip it
                if (same) continue;

				// The new filter has different actions, overwrite the old one.
                fd.id = filterData[k][0];    // store the ID
                fd.name = filterData[k][1];    // store the name
            }
            addFilter(fd, i==(f.length-1));
        }
    }
	if (node) node.innerHTML=getWord('title');
}

function isBoolValue(v) {
    return (v=='true' || v=='false' || v=='');
}

//==================================
// Consolidate filter event handler
//==================================
function handleConsolidateFilters() {
    // in progress
}

//==================
// Add Label
//==================
function addLabel() {
    debug('[addLabel]: Entering...');
    
    currentFilterData = getUserChanges();
    currentLabel=prompt(getWord('inputlabeltitle'),'');

    if (!currentLabel || currentLabel.length<=0) {
        debug('[addLabel]: Empty label. Leaving...');
        return;
    }
    else if (currentLabel.length>100)
        currentLabel=currentLabel.substr(0,100);

    debug("currentLabel="+currentLabel);

    var add_lbl_url=baseUrl + '?ui=2&view=up&rt=h';
	var postData='ik='+ik+'&act=cc_'+encodeURIComponent(currentLabel)+'&at='+at;

    GM_xmlhttpRequest({
        method:'POST',
        url: add_lbl_url,
        headers:{
            'Referer': baseURI,
            'Content-type' : 'application/x-www-form-urlencoded'
            },
        data : postData,
        onload: function(responseDetails) {
            debug(responseDetails.responseText);
 			var ret=getReturnValue( responseDetails.responseText, 'D([\"a\",');
			
			if (ret!=null) debug('< D(["a" > returns : '+ret.toString()+" ret.length = "+ret.length);
				
			if(ret && ret[1]) {
				floatingMsg = ret[1];
				currentFilterData.applyLabel=true;
			}
			else
				floatingMsg = getWord('failtoretrieveresult');
				
			isDataReady=false;
			asynGetLabelFilterData(drawFilterAsstWorkspace, true);
            debug('[addLabel]: Leaving...');
        },
        onerror: function(responseDetails){
            GM_log("ERROR: "+responseDetailsText);
            debug('[addLabel]: Leaving...');
        }
    });
}

//==========================================
// Save user change to the workspace
//==========================================
function getUserChanges() {
    f=new Filter();
    f.id = '';
    f.name = '';
    f.from = getNode('txtBoxFrom').value;
    f.to=getNode('txtBoxTo').value;
    f.subject=getNode('txtBoxSubject').value;
    f.hasWord=getNode('txtBoxHasWord').value;
    f.doesntHave=getNode ('txtBoxDoesntHave').value;
    f.hasAttachment=getNode('chkBoxHasAttachment').checked;

    f.skipInbox=getNode('chkBoxSkipInbox').checked;
	f.markAsRead = getNode('chkBoxMarkAsRead').checked;
    f.starIt=getNode('chkBoxStarIt').checked;
    f.applyLabel=getNode('chkBoxApplyLabel').checked;
    f.labelToApply=getNode('cbBoxLabels').value;
    f.forward=getNode('chkBoxForwardTo').checked;
    f.forwardTo=getNode('txtBoxForwardTo').value;
    f.deleteIt=getNode('chkBoxDeleteIt').checked;
    f.applyOnExistingConvs=getNode('chkBoxApplyToExistingConvs').checked;
    return f;
}

//==========================================
// Restore the user change to the workspace
//==========================================
function restoreUserChanges(f) {
    try {
        getNode('txtBoxFrom').value=f.from;
        getNode('txtBoxTo').value= f.to;
        getNode('txtBoxSubject').value=f.subject;
        getNode('txtBoxHasWord').value=f.hasWord;
        getNode('txtBoxDoesntHave').value=f.doesntHave;
        getNode('chkBoxHasAttachment').checked=f.hasAttachment;

        getNode('chkBoxSkipInbox').checked=f.skipInbox;
		getNode('chkBoxMarkAsRead').checked=f.markAsRead;
        getNode('chkBoxStarIt').checked=f.starIt;
        getNode('chkBoxApplyLabel').checked= f.applyLabel;
        getNode('cbBoxLabels').value=f.labelToApply;
        getNode('chkBoxForwardTo').checked=f.forward;
        getNode('txtBoxForwardTo').value=f.forwardTo;
        getNode('chkBoxDeleteIt').checked= f.deleteIt;
        getNode('chkBoxApplyToExistingConvs').checked=f.applyOnExistingConvs;
    }catch(e) {
        GM_log('Error occured: Setting current filter data failed. \n\nDetailed error msg:\n\n['+e.name+']:'+e.message);
    }
}

function hasFilter(fd) {
    if (filterData!=null) {
		//check existing filters to see if the rule has already been there
        var len=filterData.length;
        for (var i=0;i<len;i++) {
            if (fd.from            !=filterData[i][2][0] ||
                fd.to            !=filterData[i][2][1] ||
                fd.subject        !=filterData[i][2][2] ||
                fd.hasWord        !=filterData[i][2][3] ||
                fd.doesntHave    !=filterData[i][2][4] ||
                fd.hasAttachment.toString()!=filterData[i][2][5]) continue;
            return i;
        }
    }
    return -1;
}

//=================================
// Create new filter event handler
//=================================
function handleCreateFilter() {
    debug('[handleCreateFilter]: Entering...');

    /*
    filterData Format:

    +---0    ID
        1    Name
        2    Data
            |
            +---0    From
                1    To
                2    Subject
                3    Has word
                4    Doesn't have
                5    Has attachment    (T/F)

                6    Skip Inbox        (T/F)
				7	 Mark as read		(T/F)
                8    Star it            (T/F)
                9    Apply label        (T/F)
                10    Label to apply    (the label name)
                11    Forward it        (T/F)
                12    Forward to        (email)
                13    Delete it        (T/F)
    */

    var fd;
    try {
        fd=getUserChanges();
    }catch(e) {
        GM_log('Error occured: Getting necessary values failed. \n\nDetailed error msg:\n\n['+e.name+']:'+e.message);
        return;
    }

    if (fd.from == "" && fd.to == "" && fd.subject == "" && fd.hasWord == "" && fd.doesntHave == "") {
        alert(getWord('emptycriteriawarning'));
        debug('[handleCreateFilter]: Creating filter canceled. Leaving...');
        return;
    }
    
    if (!( fd.skipInbox||fd.markAsRead || fd.starIt||fd.applyLabel||fd.forward||fd.deleteIt)) {
		// no action
        alert(getWord('selectatleastoneaction'));
        debug('[handleCreateFilter]: No action selected. Leaving...');
        return;
    }

    if (fd.applyLabel && (fd.labelToApply=="" || fd.labelToApply==getWord('newlabel'))) {
        alert(getWord('selectalabelorcreateone'));
        debug('[handleCreateFilter]: No label selected. Leaving...');
        return;
    }

    if (fd.deleteIt) {
        if (fd.starIt || fd.applyLabel) {
            if (!confirm(getWord('itemintrashwarning'))) {
                debug('[handleCreateFilter]: Creating filter canceled. Leaving...');
                return;
            }
        }
    }

    var i=hasFilter(fd);
    if (i>=0) {
		// found a filter having the same criteria
        if (!confirm(getWord('foundduplicatefilterwarning'))) {
            debug('[handleCreateFilter]: Overwriting filter canceled. Leaving...');
            return;
        }
        fd.id = filterData[i][0];    // store the ID
        fd.name = filterData[i][1];    // store the name
        // TODO(kfk):
        // 1. Combine the two filters with same criteria (edit/overwrite);
        // 2. group/consolidate filters that target to the same label.
    }
	addFilter(fd, true);
}

//==================
// Add Filter
//==================
function addFilter(fd, refresh) {
    // Generate the URL
    var add_flt_url = baseUrl + '?ui=2'
		+ '&view=up'
		+ '&rt=h'
        + '&ik=' + ik
        + '&at='+ at
        + (fd.id ? '&act=rf&ofid=' + fd.id : '&act=cf')  // action = rf - edit filter, cf - create filter
        + '&zx=' + UniqueURL();

	var postData = 'search=cf'
        + '&cf1_from=' + encodeURIComponent( fd.from)
        + '&cf1_to=' + encodeURIComponent(fd.to)
        + '&cf1_subj=' + encodeURIComponent(fd.subject)
        + '&cf1_has=' + encodeURIComponent( fd.hasWord)
        + '&cf1_hasnot=' + encodeURIComponent(fd.doesntHave)
        + '&cf1_attach=' + encodeURIComponent(fd.hasAttachment)
        + '&cf2_ar=' + encodeURIComponent( fd.skipInbox)
        + '&cf2_st=' + encodeURIComponent(fd.starIt)
		+ '&cf2_mr=' + encodeURIComponent(fd.markAsRead)
        + '&cf2_cat=' + encodeURIComponent(fd.applyLabel)
        + '&cf2_sel=' + encodeURIComponent(fd.labelToApply )
        + '&cf2_emc=' + encodeURIComponent(fd.forward)
        + '&cf2_email=' + encodeURIComponent(fd.forwardTo)
        + '&cf2_tr=' + encodeURIComponent(fd.deleteIt)
        + '&irf='  + encodeURIComponent( fd.applyOnExistingConvs);    //whether to apply the filter to all existing mails

    var node=getNode('lblCreateFilter');
    if (refresh) {
        node.innerHTML = '<b>'+getWord('running')+'</b>';
        node.removeEventListener('click', handleCreateFilter, false);
    }
    
    GM_xmlhttpRequest({
        method:'POST',
        url: add_flt_url,
        headers:{
            'Referer': baseURI,
            'Content-type' : 'application/x-www-form-urlencoded'
            },
        data : postData,
        onload: function(responseDetails) {
            debug( responseDetails.responseText);
            if (refresh) {
                var ret=getReturnValue(responseDetails.responseText, 'D([\"a\",');
                if (ret!=null) {
                    debug('< D(["a" > returns : '+ret.toString());
                }
                    
                if(ret && ret[1])
                    floatingMsg = ret[1];
                else
                    floatingMsg = getWord('failtoretrieveresult');
                
				isDataReady=false;
                asynGetLabelFilterData(drawFilterAsstWorkspace, false);
                node.innerHTML = '<b>'+getWord('createfilter')+'</b>';
            }
            debug('[addFilter]: Leaving...');
        },
        onerror: function(responseDetails){
            GM_log("ERROR: \nstatus="+responseDetails.status+"\nHeaders="+responseDetails.responseHeaders+"\nFeed data="+ responseDetails.responseText);
            debug('[addFilter]: Leaving...');
        }
    });
}

//======================================
// Get data item value given the header
//======================================
function getReturnValue(data, header) {
    //debug('[getReturnValue]: Entering...');
    data = data.replace(/[\r\n\t\v\f\b\0]/g,"");    // remove some escaped characters which doesn't affect the result
    data = data.replace(/\\\\/g, "\\");                    // replace \\ with \
    // header is the data header like < D(["ar" >
    var param;
    var ret=null;
    param=new ParamParsingData();
    param.currentPosition=0;

	var s=getRawData(data, header);
	debug('[getReturnValue]: getRawData() returns <'+s+'>');
    if (s!='')
        ret = parseData(s, 0, s.length-1, param);        // parse the block data, data is the data string,
    else
        ret = null;

	//debug('[getReturnValue]: Leaving...');
    return ret;
}

function getRawData(data, header) {
    // header is the data header like < ["ar",[ >
    var sp = data.indexOf(header), ep;
    if (sp!=-1) {
		// the labels found
		sp = sp + header.length;                // the starting point of this data block
		var n = 1, i = sp;
		var len = data.length;
		while (i<=len && n!=0) {
			if (data[i]=='[') n++;
			if (data[i]==']') n--;
			i++;
		}
		// Something is wrong, '[' and ']' doesn't match.
		if (n!=0) return null;
        ep = i-1;                // the ending point of this data block
        return data.substring(sp, ep);
    }
    return '';
}

//=================================
// Parse raw data read from google
//=================================
function parseData(data, sp, ep, param) {
    var i = sp;
    var quoted=false;
    var s="";
    var arr = new Array();

    while (i<=ep) {
        switch (data[i]) {
            case '[': // found an inner block
                if (!quoted) {
                    arr.push(parseData(data, i+1, ep, param));
                    i = param.currentPosition;
                }
                else
                    s=s+data[i];                
                break;
            case '"':                // find an element
                if (!quoted) {
					// left quote in a pair is found
                    quoted=true;
                    s="";
                }
                else {
					// right quote in a pair is found
                    arr.push(myUnescape(s));    // push the current element into array
                    s="";
                    quoted = false;
                }
                break;
            case '\\':                // take care of the escaped character
                switch (data[i+1]) {
					// check the next character
                    case '"':        // \"
                    case '\'':        
                    case '\<':
                    case '\>':
                        s=s+data[i+1];
                        i++;
                        break;
                    default:        // error, I don't do anything here, assuming Google doesn't make mistake in the data :)
                        s=s+data[i];
                        break;
                }
                break;
            case ',':                // delimiter
                if (!quoted) {
					// not quoted
                    if (data[i-1]!='"' && data[i-1]!=']') arr.push(s);
                    s = "";            // clear the current element
                } else
                    s = s + ',';
                break;                
            case ']':                // finish processing current array
                if (!quoted) {
                    if (s!="") arr.push(myUnescape(s));
                    s = "";
                    param.currentPosition = i;
                    return arr;        // I assume the brackets are well paired
                }
                else
                    s = s + ']';
                break;
            default:
                s = s + data[i];
        }
        param.currentPosition = ++i;
    }
    return arr;
}

var charset='abcdefghijklmnopqrstuvwxyz0123456789';
//====================
// Make a unique URL
//====================
function UniqueURL() {
    var s='';
    for (i=0;i<12;i++) {
        s=s+charset[Math.floor(Math.random()*36)];
    }
    return s;
}

//====================
// show debug message
//====================
function debug(msg) {
    if (DEBUG) GM_log(msg);
}

//============================
// trim space around a string
//============================
function trim(s) {
    var i, len=s.length, sp=0, ep=len-1;
    for (i=0;i<len;i++)
        if (s[i]==' ') sp++;
        else break;
    for (i=len-1;i>=sp;i--)
        if (s[i]==' ') ep--;
        else break;
    return s.subString(sp, ep+1);
}

// Following function credited to RoBorg, http://javascript.geniusbug.com/
function clone(obj) {
    if(typeof(obj) != 'object') return obj;
    if(obj == null) return obj;

	var newobj = new Object();
    for(var i in obj) newobj[i] = clone(obj[i]);

    return newobj;
}

// Following functions credited to Mihai @ http://persistent.info/
function newNode(type) {
    return unsafeWindow.document.createElement(type);
}

function getNode(id) {
    return unsafeWindow.document.getElementById(id);
}

function getElementsByTag(tag) {
	return unsafeWindow.document.getElementsByTagName(tag);
}

function getDataItem(data, header, endchar) {
    var re = new RegExp(header + "([^"+endchar+"]+)");
    var value = re.exec(data);
    return (value != null) ? myUnescape(value[1]) : null;
}

