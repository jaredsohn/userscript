// ==UserScript==
// @name           Ikariam-GetAllMessages
// @namespace      http://ikariam.gr/
// @include        http://s*.ikariam.*/*
// @version        0.0.16
// @author         mindfox
//
// PhasmaExMachina update script
// @require        http://userscripts.org/scripts/source/57756.user.js 
// 
// PhasmaExMachina Options script
// @require        http://userscripts.org/scripts/source/62718.user.js
//
// jquery library
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// 
//
//-----------------------------
//	CHANGELOG
//
// @history		0.0.16 Χρήση του script της PhasmaExMachina για τις διαθέσιμες επιλογές. Θα δημιουργηθεί η δυνατότητα προσθαφαίρεσης θεμάτων και αλλαγής χρωμάτων κατά βούληση
// @history		0.0.15 Αλλαγή της ρουτίνας ελέγχου νέων εκδόσεων
// @history		0.0.15 Μικρές αλλαγές στον κώδικα - προετοιμασία για πολυγλωσσική υποστήριξη
// @history		0.0.14 Απαραίτητη αλλαγή για χρήση του script στο νέο μοτίβο των URLs
// @history		0.0.13 Προστέθηκε κλήση στη 1η σελίδα μηνυμάτων, έτσι ώστε κατά τη διαγραφή, να εμφανίζονται κανονικά τα μηνύματα...
// @history		0.0.13 Προστέθηκε επιλογή ανάκτησης συγκεκριμένου αριθμού μηνυμάτων, αφού το σύστημα επιτρέπει διαγραφή έως 50 μηνυμάτων τη φορά.
// @history		0.0.12 Αλλαγή του τρόπου που γινόταν ενεργοποίηση του script για να είναι συμβατό με την έκδοση 0.3.2
// @history		0.0.11 Αλλαγή του τρόπου που γινόταν ενεργοποίηση του script. 
// @history		0.0.10 Για τους "κοινωνικούς" παίκτες που είχαν περισσότερα από 999 μηνύματα, δεν γινόταν σωστά η μετατροπή του αριθμού των μηνυμάτων (λόγω του , )
// @history		0.0.9 Προσθήκη κατηγορίας μηνύματος 'Αποδοχή Πολιτιστικών Αγαθών'
// @history		0.0.8 Αποθήκευση της κατάστασης του κάθε μηνύματος (expanded ή collapsed) έτσι ώστε να γίνεται σωστά η εμφάνιση/απόκρυψή του κατά το φιλτράρισμα
// @history		0.0.7 Προστέθηκε κώδικας ελέγχου μοναδικότητας μηνυμάτων (αποφυγή διπλοεγγραφών)
// @history		0.0.6.1 Αφαιρέθηκε κώδικας που είχε ξεχαστεί για debugging
// @history		0.0.6 Προστέθηκε κώδικας αυτόματου ελέγχου νέων εκδόσεων από το http://userscripts.org/scripts/show/38017
// @history		0.0.5 Απενεργοποίηση του κουμπιού 'Ανάκτηση' μετά από την επιλογή του, έτσι ώστετ να μη γίνεται διπλή ανάκτηση των μηνυμάτων
// @history		0.0.4 Εφαρμογή αλλαγών για την έκδοση 0.3.1
// @history		0.0.3 Όταν γινόταν το φιλτράρισμα, γινόταν απόκρυψη μόνο στη γραμμή στοιχείων του μηνύματος και όχι και στο ίδιο το μήνυμα
//
// ==/UserScript==
//

function getView() {
	return document.getElementsByTagName("body")[0].id;
//	case "diplomacyAdvisorAlly":
//	case "diplomacyAdvisor":
//	case "sendIKMessage":
}
var GAMsgs = {
	id: 48020,
	version: '0.0.16',
	server: document.domain
}

ScriptUpdater.check(GAMsgs.id, GAMsgs.version);

if (getView()=='diplomacyAdvisor') {

Config.scriptName = "Script Options Demo";

Config.tabs = {
	"Γενικά":{
		html:'<p>Πειραματισμός με το script της PhasmaExMachina.</p>',
		fields:{
			optionOne:{
				type:'checkbox',
				label:'Option One',
				text:'should we use option one?',
				value:true,
			},
			optionTwo:{
				type:'checkbox',
				label:'Option Two',
				text:'should we use option two?',
				value:false,
			},
			userName:{
				type:'text',
				label:'User Name',
				tip:'What do you want to be called?',
			},
		}
	},
	"Σχετικά":{
		html:'<p>Συγκεντρώνει όλα τα μηνύματα σε 1 σελίδα για ευκολότερη διαχείριση. Εμφανίζει ένα combobox όπου αναφέρει το σύνολο για κάθε τύπο μηνύματος με δυνατότητα χρωματικού διαχωρισμού</p>',
	}
};

//Config.show();


var curPage;
var tmpresult = document.evaluate("//table[@id='tabz']/.//td[@class='selected']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (tmpresult.snapshotItem(1)) { 
		curPage = tmpresult.snapshotItem(1);
	} else {
		curPage = tmpresult.snapshotItem(0);
	}
GM_log(curPage.textContent.split(' (')[0]);
if (curPage.textContent.split(' (')[0] == 'Εισερχόμενα') {


var pmColor = 'lightgreen';
var museumColor = 'yellow';
var allianceColor = null;


GM_log('Starting at ' + new Date());
var baseURL = document.location.href.split('?')[0];

var globalSubject = [
	{subject: "museum", color: museumColor}, 
	{subject: "museumaccept", color: museumColor}, 
	{subject: "pm", color: pmColor},
	{subject: "alliance", color: allianceColor}
];

var globalPriorities = {
	militaryhelp: {name: 'militaryhelp', search: 'FILTERTAG@militaryhelp', desc: 'Στρατιωτική Βοήθεια'},
	joke: {name: 'joke', search: 'FILTERTAG@joke', desc: 'Ανέκδοτο'},
	museum: {name: 'museum', search: 'FILTERTAG@museum', desc: 'Μουσείο'},
	exchange: {name: 'exchange', search: 'FILTERTAG@exchange', desc: 'Ανταλλαγή υλικών'}
};



var idiv = document.createElement('div');
idiv.style.display = 'none';
document.body.appendChild(idiv);

function messageTable(nm) {
	this.filterEnabled = false;
	var totalMessages;
	this.totalMsgPages = null;
	this.formID = null;
	this.encapNode = null;
	this.messages = [];
	this.msgIndex = [];
	this.pagingNode = null;
	this.name = nm;
	this.totalSavedMessages = null;
	this.subjects = {
		alliance: {name: 'alliance', shortSubj: 'Συμμαχία', subject: 'Κυκλικό μήνυμα - Συμμαχία', total: 0, optionNode: null, messages: []}, 
		museum: {name: 'museum', shortSubj: 'Μουσείο', subject: 'Πολιτιστική συμφωνία περιουσιακών στοιχείων', total:0, optionNode: null, messages: []},
		museumaccept: {name: 'museumaccept', shortSubj: 'Αποδοχή μουσείου', subject: 'Αποδοχή Πολιτιστικής Συνθήκης', total:0, optionNode: null, messages: []},
		pm: {name: 'pm', shortSubj: 'Προσωπικό', subject: 'Μήνυμα', total:0, optionNode: null, messages: []},
	};
	this.selectBox = null;
	this.getPages = null;
	if (nm == 'main') {
		this.selectBox = document.createElement('select');
		this.selectBox.setAttribute('id', 'cusSubjects');
		this.getPagesBox = document.createElement('select');
		this.getPagesBox.setAttribute('id', 'getNumPages');
	}
}

function message(table, col) {
GM_log('This is col: ' + col);
	this.ID = table.rows[col].getAttribute('id');
	this.nodeHeader = table.rows[col];
	this.nodeMain = table.rows[col+1];
	this.nodeActions = table.rows[col+2];
	this.from = table.rows[col].cells[2].textContent;
	this.subject = table.rows[col].cells[3].textContent;
	this.datetime = table.rows[col].cells[4].textContent,
	this.priority=null;
	this.state=null;
	this.expanded = false;
}

messageTable.prototype.extractFromPage = function(doc) {
	if (!doc) {
		doc = document;
	}
	allforms = doc.getElementsByTagName('form');
	for (var i=0; i < allforms.length; i++) {
		if (allforms[i].getAttribute('name') == 'deleteMessages') {
GM_log('Saving to object\'s formID attribute: ' + allforms[i].getAttribute('action'));
			this.formID = allforms[i].getAttribute('action');
		}
	}
	this.totalMessages = parseInt(document.getElementById('tabz').rows[0].cells[0].firstChild.firstChild.firstChild.textContent.split('(')[1].replace(',',''));
	if (this.totalMessages > 10) {
		this.totalMsgPages = Math.floor(this.totalMessages/10);
	} else {
		this.totalMsgPages = 0;
	}
	var result = document.evaluate("//table[@id='messages']", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (result.snapshotItem(1)) { 
		tmpmsgs = result.snapshotItem(1);
	} else {
		tmpmsgs = result.snapshotItem(0);
	}

	this.encapNode = tmpmsgs;

	for (var i=1; i < tmpmsgs.rows.length; i++) {
		if (tmpmsgs.rows[i].id.indexOf('message') == 0) {
			GM_log('Adding ' + tmpmsgs.rows[i].id + ' from row ' + i); 
			this.addMessage(tmpmsgs, i);
		}
	}
//	this.pagingNode = tmpmsgs.rows[i];
	this.pagingNode = document.getElementsByClassName('paginator')[document.getElementsByClassName('paginator').length-1].parentNode;

	if (this.name == 'main') {
		this.encapNode.insertRow(0);
		this.encapNode.rows[0].insertCell(0);
		this.encapNode.rows[0].cells[0].colSpan = 4;
		this.encapNode.rows[0].cells[0].appendChild(this.selectBox);
		var tmpopt = document.createElement('option');
		tmpopt.value = 'all';
		tmpopt.textContent = 'Όλα';
		tmpopt.id = 'msgFilterAll';
		if (this.selectBox.options.length) {
			this.selectBox.add(tmpopt, this.selectBox.options[0]);
		} else {
			this.selectBox.add(tmpopt, null);
		}
		var btnfilter = document.createElement('button');
		btnfilter.textContent = 'Φιλτράρισμα';
		btnfilter.type = 'button';
		this.encapNode.rows[0].cells[0].appendChild(btnfilter);
		btnfilter.addEventListener('click', function() {filterMessages();}, true);
		
		this.encapNode.rows[0].insertCell(1);
		this.encapNode.rows[0].cells[1].colSpan = 2;
		var btnget = document.createElement('button');
		btnget.textContent = 'Ανάκτηση μηνυμάτων';
		btnget.type = 'button';
		if (this.totalMsgPages==0) {
			btnget.setAttribute('disabled','disabled');
		}
		this.encapNode.rows[0].cells[1].appendChild(btnget);
		btnget.addEventListener('click', function() {
				this.setAttribute('disabled','disabled');
				getMessages();
			}, true);
		this.encapNode.rows[0].cells[1].appendChild(this.getPagesBox);
		var pagesopt = document.createElement('option');
		pagesopt.value = 'all';
		pagesopt.textContent = 'Όλες';
		this.getPagesBox.add(tmpopt, null);
GM_log('Σύνολο σελίδων μηνυμάτων προς ανάκτηση: ' + this.totalMsgPages);
		for (var x=1; x <= this.totalMsgPages; x++) {
			delete pagesopt;
			var pagesopt = document.createElement('option');
			pagesopt.value=x;
			pagesopt.textContent=x+'0';
			this.getPagesBox.add(pagesopt,null);
		}
	}
}

messageTable.prototype.findMessageById = function(id) {
	for (var i=0; i < this.messages.length; i++) {
		if (id == this.messages[i].ID) {
			return true;
		}
	}
	return false;
}

messageTable.prototype.addMessage = function(table, col) {
	msg = new message(table, col);
	if (!this.findMessageById(msg.ID)) {
		this.messages[this.messages.length] = msg;
		msgpos = this.messages.length-1;
		this.totalSavedMessages++;
		if (this.name == 'main') {
			for (subj in this.subjects) {
				if (this.subjects[subj].subject == msg.subject) {
					if (!this.subjects[subj].optionNode) {
						var optNode = document.createElement('option');
						optNode.id = subj;
						optNode.text = this.subjects[subj].shortSubj + ' (1)';
						optNode.value = subj;
						this.selectBox.add(optNode, null);
						this.subjects[subj].optionNode = optNode;
						this.subjects[subj].total++;
					} else {
						this.subjects[subj].total++;
						var optNode = this.subjects[subj].optionNode;
						optNode.text = this.subjects[subj].shortSubj + ' (' + this.subjects[subj].total + ')';
					}
					this.subjects[subj].messages[this.subjects[subj].messages.length] = this.messages[msgpos];
					if (this.filterEnabled && this.selectBox.value != subj) {
						this.messages[msgpos].nodeHeader.style.display = 'none';
					}
				}
			}
		}
	}
}

messageTable.prototype.mergeFrom = function(table) {
GM_log('Merging from ' + table.name + ' to ' + this.name);
	for (var i=0; i < table.messages.length; i++) {
		this.addMessage(table.encapNode, table.messages[i].nodeHeader.rowIndex);
		this.pagingNode.parentNode.insertBefore(table.messages[i].nodeHeader, this.pagingNode);
		this.pagingNode.parentNode.insertBefore(table.messages[i].nodeMain, this.pagingNode);
		this.pagingNode.parentNode.insertBefore(table.messages[i].nodeActions, this.pagingNode);
	}
	GM_log('Total Saved Messages: ' + this.totalSavedMessages);
}

messageTable.prototype.formatSubject = function(subjObj) {
	for (var o=0; o < this.messages.length; o++) {
		for (var i=0; i < subjObj.length; i++) {
			if (this.messages[o].subject == this.subjects[subjObj[i].subject].subject && subjObj[i].color) {
				this.messages[o].nodeHeader.style.backgroundColor = subjObj[i].color;
			}
		}
	}
}

function gmLoader(initObject) {
	this.urls=[];
	this.urlIndex=0;
	this.callback=null;
	this.endCb=null;

	if (initObject) {
		if (typeof initObject.urls != "undefined") this.urls=initObject.urls;
		if (typeof initObject.callback != "undefined") this.callback=initObject.callback;
		if (typeof initObject.endcb != "undefined") this.endcb=initObject.endcb;
	}
	
}

gmLoader.prototype.processor = function (xhr) {
	if (xhr) {
		GM_log('fetched '+xhr.finalUrl);
	}

GM_log('URLINDEX: ' + this.urlIndex);

	if (this.urls[this.urlIndex]) {
		that = this;
		GM_xmlhttpRequest({
			'method':'GET',
			'url':this.urls[this.urlIndex],
			'onload': function(xhr) {
				if (that.callback) {
					that.callback(xhr.responseText);
				}
				that.processor(xhr);
			}
		});
		this.urlIndex++;
	} else {
GM_log('all URLs processed');
		this.endCb(mainTable);
	}
}


GM_log('processing started'); 


mainTable = new messageTable('main');
mainTable.extractFromPage();
//var pages = mainTable.totalMsgPages;
//if (pages > 5) pages=5;
mainTable.formatSubject(globalSubject);

var getMessages = function () {
	if (mainTable.totalMsgPages > 0) {
		var pageurls = [];
		if (mainTable.getPagesBox.value=='all') {
			pages=mainTable.totalMsgPages;
		} else {
			pages=mainTable.getPagesBox.value;
		}
GM_log('Προετοιμασία για ανάκτηση ' + pages + (pages>1?'σελίδων':'σελίδας'));
		for (var c=0; c < pages; c++) {
			pageurls[c] = baseURL + '?view=diplomacyAdvisor&start=' + (c+1)*10;
			GM_log(pageurls[c]);
		}

		testajax = new gmLoader();
		testajax.urls = pageurls;

		eachCallback = function(tst) {
			idiv.innerHTML = tst;
			tmptst = new messageTable('tmptst');
			tmptst.extractFromPage(idiv);
			GM_log('Preparing to merge messageTables');
			mainTable.mergeFrom(tmptst);
			idiv.innerHTML='';
			allforms = document.getElementsByTagName('form');
			for (var i=0; i < allforms.length; i++) {
				if (allforms[i].getAttribute('name') == 'deleteMessages') {
GM_log('Setting page action from: ' + allforms[i].getAttribute('action') + ' *** to : *** ' + tmptst.formID);
					allforms[i].setAttribute('action', tmptst.formID);
					break;
				}
			}
			tmptst = null;
		};

		endcallback = function() {
			mainTable.formatSubject(globalSubject);
			testajax1 = new gmLoader({urls: [baseURL + '?view=diplomacyAdvisor'], 
				callback: function(tst) { 
					GM_log('Φορτώθηκε η 1η σελίδα'); 
					idiv.innerHTML = tst;
					tmptst = new messageTable('tmptst');
					tmptst.extractFromPage(idiv);
					idiv.innerHTML='';

					allforms = document.getElementsByTagName('form');
					for (var i=0; i < allforms.length; i++) {
						if (allforms[i].getAttribute('name') == 'deleteMessages') {
GM_log('Setting page action from: ' + allforms[i].getAttribute('action') + ' *** to : *** ' + tmptst.formID);
							allforms[i].setAttribute('action', tmptst.formID);
							break;
						}
					}
				},
				endCb: function() { GM_log('Ολοκληρώθηκε!!!'); }
			});
			testajax1.processor();
GM_log("Γίνεται κλήση της 1ης σελίδας μηνυμάτων");
		};
		
		testajax.callback = eachCallback;
		testajax.endCb = endcallback;

		GM_log('Starting testajax.processor() ---------------------------------------------');
		testajax.processor();
	}
}

var filterMessages = function() {
	var tmpmsg;
	var filter = document.getElementById('cusSubjects').value;
	if (filter != 'all') {
		for (var i=0; i < mainTable.messages.length; i++) {
			tmpmsg = mainTable.messages[i];
			if (tmpmsg.nodeMain.style.display == 'none') {
				tmpmsg.expanded = false;
			} else {
				tmpmsg.expanded = true;
			}
			tmpmsg.nodeHeader.style.display = 'none';
			tmpmsg.nodeMain.style.display = 'none';
			tmpmsg.nodeActions.style.display = 'none';
			tmpmsg.nodeHeader.getElementsByTagName('input')[0].disabled = "true";
		}
		for (var i=0; i < mainTable.subjects[filter].messages.length; i++) {
			mainTable.subjects[filter].messages[i].nodeHeader.style.display = null;
			if (mainTable.subjects[filter].messages[i].expanded) {
				mainTable.subjects[filter].messages[i].nodeMain.style.display = null;
				mainTable.subjects[filter].messages[i].nodeActions.style.display = null;
			}
			mainTable.messages[i].nodeHeader.getElementsByTagName('input')[0].disabled = false;
		}
		mainTable.filterEnabled = true;
	} else {
		mainTable.filterEnabled = false;
		for (var i=0; i < mainTable.messages.length; i++) {
			tmpmsg = mainTable.messages[i];
			tmpmsg.nodeHeader.style.display = null;
			if (tmpmsg.expanded) {
				tmpmsg.nodeMain.style.display = null;
				tmpmsg.nodeActions.style.display = null;
			}
			tmpmsg.nodeHeader.getElementsByTagName('input')[0].disabled = false;
		}
	}
}

}

}
