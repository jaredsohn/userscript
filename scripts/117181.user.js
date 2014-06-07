
// ==UserScript==
// @name        Skandiabanken Account Parser
// @namespace   joelg.apa
// @description Hjälper till att få ut datat de inte vill ge dig trots att det är gris-enkelt.
// @include     https://secure3.skandiabanken.se/UI/Pages/Accounts/AIE/MyAccounts/Overview.aspx*
// @author      Joel Greijer
// @timestamp   2011-11-03
// @version     1.0.0
// ==/UserScript==
/*
	Beskrivning

		Exporterar aktuell kontohistorik en sida i taget till popup-fönster. När exporten är klar, markera alla rader (ctrl+a) och kopiera till excel. Tjoff, sätt igång och analysera!

	Tänk på följande

		0. Utvecklad November 2011 på Firefox 7.0.1 / Skandiabanken 1.2.2.61:161. Eventuellt kan skandias uppgraderingar förstöra funktionaliteten.
		1. Detaljerna hämtas asynkront med postback i backgrunden, eftersom detta är en seg metod och skandias server lite ledsen så tar varje rad lite tid. 
		1.b Räkna med en timme för 2500 transaktioner (drick en öl så länge!)
		1.c	Det betyder att stopp-kommandot inväntar redan ivägskickade requests.
		1.d	Samt att du bör sortera i excel efteråt enligt PageNumber stigande, RowNumber stigande för att få rätt ordning.
		2. I detaljerna finns ditt kortnummer, ta bort kolumnen vid export om du inte är intresserad av detta.
		3. Det finns inget id-begrepp på transaktionen synligt så om exporten körs samtidigt som en transaktion sker så räkna med dubblettrader.
		4. Det kan finnas lite fultaggar i datat från html-formateringen. Detta kan du rensa enkelt på egen hand. Exempel &amp;
		5. Du har inte skrivit denna kod. Kör aldrig kod du inte litar på, speciellt inte i relation till din bank. Granska koden innan du kör den, och använd på egen risk.
	
	Dessa fält exporteras

		PageNumber
		RowNumber
		Date
		Description
		Amount
		Balance

		TransactionOriginRefVer
		TransactionOriginClearing
		TransactionCurrency
		TransactionCity
		TransactionOriginCashday
		TransactionExchangeRate
		TransactionOriginalAmount
		TransactionText
		TransactionAmount
		TransactionIDRef
		TransactionWayOfPayment
		TransactionDate

	//kort utland

		CardDate
		CardWayofPayment
		CardCity
		CardCardNumber
		CardCurrency
		CardSector
		CardAmount
		CardText
		CardPurchaseDay
		CardOriginalAmount
		CardExchangeRate

	//E-faktura

		PaymentEInvoiceGiroNr
		PaymentEInvoiceRecipient
		PaymentEInvoiceDate
		PaymentEInvoiceWayOfPayment
		PaymentEInvoiceStatus
		PaymentEInvoiceRecipientInformation
		PaymentEInvoiceAmount
		PaymentEInvoiceSender

	// Giro-betalning		

		PaymentGiroNr
		PaymentAmount
		PaymentDate
		PaymentWayOfPayment
		PaymentStatus
		PaymentRecipientInformation
		PaymentRecipient
		PaymentSender

	// Kort/Kontantuttag

		ATMDate
		ATMWayOfPayment
		ATMMachineNumber
		ATMTime
		ATMOriginalAmount
		ATMExchangeRate
		ATMAmount
		ATMText
		ATMWithdrawalDay
		ATMCardNumber
		ATMCurrency
		ATMSector

*/

// det ligger lite skräpkod här och där som inte används. har utvecklat detta på kvällar mellan nappflaskematningar

var transactionTable;
var overviewBar;
var contentFrame;
var exportWindow;
var leftMenuButtonBar;
//var loopCount = 0;
var nextButton;


//function performYourActions() {
//	rowsProcessed = exportWindow.document.getElementById("rowsProcessed");
		//rowsProcessed.value = 0;
		//NavigateToNextPageIfPossible();
		//GetData();
//	doDelayLoop();
//}

//function doDelayLoop() {
//	loopCount++; //increment icount

//	if (loopCount <= 1000000) {
//		setTimeout(performYourActions, 4000);
//	}
//	else
//		return true;
//}

function Initialize() {
	FindControls();
	PlaceControls();
	//tyvärr måste jag poppa upp fönstret direkt, eftersom jag inte hittar någon window.getopenwindow(), verkar bara finnas window.open("");
	var exportButton = document.getElementById("exportTransactions").children[0];
	clickLink(exportButton);
	//PrepareExportWindow();
	//CreateRunningCheckerLoop(); //Loopen används ej längre
	GetData();
}

//function CreateRunningCheckerLoop() {
	//GetData();
	//doDelayLoop();
//}

function FindControls() {
	transactionTable = document.evaluate('/html/body/form/div[3]/div[2]/div/div/div/div/div[2]/div/div[5]/table', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	overviewBar = document.evaluate('/html/body/form/div[3]/div[2]/div/div/div/div/div[2]/div/div[4]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	contentFrame = document.evaluate('/html/body/form/div[3]/div[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	leftMenuButtonBar = document.evaluate('/html/body/form/div[3]/div[2]/div/div/div/div/div/div/ul', document, null, XPathResult.ANY_TYPE, null).iterateNext();

	var nextButtonContainer = document.getElementById("NextButtonContainer");
	nextButton = nextButtonContainer.children[0];
	unsafeWindow.console.log('nextButton.disabled: ' + nextButton.disabled);
}

function PlaceControls() {
	var btn = document.createElement("li");
	btn.id = "exportTransactions";
	btn.className = "noSubMenu";
	btn.innerHTML = "<a href='#'>Export transations</a>"
	btn.addEventListener('click', PrepareExportWindow, true);
	leftMenuButtonBar.appendChild(btn);

	var status = document.createElement("input");
	status.type = "hidden";
	status.id = "popupStatus";
	status.value = "notopened";
	contentFrame.appendChild(status);

	var status = document.createElement("input");
	status.type = "hidden";
	status.id = "maxRows";
	status.value = "0";
	contentFrame.appendChild(status);

}

function SuckDataFromLink(link, data) {
	var params = String(link);
	var re = new RegExp('"[^"]+"', "g");
	var myArray = params.match(re);

	var eventTarget = myArray[0].replace('"', '').replace('"', '');
	var eventArgument = "";  //myArray[1].replace("'", "").replace("'", "");
	var eventValidation = document.getElementById("__EVENTVALIDATION").value;
	var viewState = document.getElementById("__VIEWSTATE").value;
	var previousPage = document.getElementById("__PREVIOUSPAGE").value;
	var scrollPositionX = document.getElementById("__SCROLLPOSITIONX").value;
	var scrollPositionY = document.getElementById("__SCROLLPOSITIONY").value;
	var lastFocus = document.getElementById("__LASTFOCUS").value;
	var topSelOption = document.evaluate('//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_topSel"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var topSel = topSelOption.value;

	var postData =
			'__LASTFOCUS=' + encodeURIComponent(lastFocus) +
			'&__EVENTTARGET=' + encodeURIComponent(eventTarget) +
			'&__EVENTARGUMENT=' + encodeURIComponent(eventArgument) +
			'&__VIEWSTATE=' + encodeURIComponent(viewState) +
			'&__SCROLLPOSITIONX=' + encodeURIComponent(scrollPositionX) +
			'&__SCROLLPOSITIONY=' + encodeURIComponent(scrollPositionY) +
			'&__PREVIOUSPAGE=' + encodeURIComponent(previousPage) +
			'&__EVENTVALIDATION=' + encodeURIComponent(eventValidation) +
			'&ctl00%24ctl00%24ctl00%24ctl00%24cphBody%24cphContentWide%24cphContentWide%24cphMainContent%24topSel=' + encodeURIComponent(topSel);


	GM_log(postData);

	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://secure3.skandiabanken.se/UI/Pages/Accounts/AIE/MyAccounts/Overview.aspx',
		headers: { 'User-Agent': navigator.userAgent,
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: postData,
		onload: function (resp) {
			handleResponseFromPostback(resp, data);
		}
	});
}

function GetFieldText(doc, fieldXPath) {
	var field = doc.evaluate(fieldXPath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (field == null) {
		return "";
	}
	else {
		return field.innerHTML.trim();
	}
}

function handleResponseFromPostback(resp, data) {

	var range = document.createRange();
	range.setStartAfter(document.body);
	var xhr_frag = range.createContextualFragment(resp.responseText);
	GM_log(resp.responseText);
	var xhr_doc = document.implementation.createDocument(null, 'html', null);
	xhr_doc.adoptNode(xhr_frag);
	xhr_doc.documentElement.appendChild(xhr_frag);

	//Kortbetalning

	var TransactionOriginRefVer = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionOriginRefVer"]');
	var TransactionOriginClearing = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionOriginClearing"]');
	var TransactionCurrency = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionCurrency"]');
	var TransactionCity = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionCity"]');
	var TransactionOriginCashday = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionOriginCashday"]');
	var TransactionExchangeRate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionExchangeRate"]');

	var TransactionOriginalAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionOriginalAmount"]');
	var TransactionText = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionText"]');
	var TransactionAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionAmount"]');
	var TransactionIDRef = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionIDRef"]');
	var TransactionWayOfPayment = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionWayOfPayment"]');
	var TransactionDate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsTransaction_lblDetailsTransactionDate"]');

	//Kortbetalning 2 (internationell?)
	
	var CardDate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardDate"]');
	var CardWayofPayment = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardWayofPayment"]');
	var CardCity = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardCity"]');
	var CardCardNumber = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardCardNumber"]');
	var CardCurrency = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardCurrency"]');
	var CardSector = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardSector"]');
	var CardAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardAmount"]');
	var CardText = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardText"]');
	var CardPurchaseDay = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardPurchaseDay"]');
	var CardOriginalAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardOriginalAmount"]');
	var CardExchangeRate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsCard_lblDetailsCardExchangeRate"]');

	//E-faktura
	var PaymentEInvoiceGiroNr = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceGiroNr"]');
	var PaymentEInvoiceRecipient = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceRecipient"]');
	var PaymentEInvoiceDate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceDate"]');
	var PaymentEInvoiceWayOfPayment = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceWayOfPayment"]');
	var PaymentEInvoiceStatus = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceStatus"]');
	var PaymentEInvoiceRecipientInformation = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceRecipientInformation"]');
	var PaymentEInvoiceAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceAmount"]');
	var PaymentEInvoiceSender = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPaymentEInvoice_lblDetailsPaymentEInvoiceSender"]');

	// Giro-betalning		

	var PaymentGiroNr = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentGiroNr"]');
	var PaymentAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentAmount"]');
	var PaymentDate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentDate"]');
	var PaymentWayOfPayment = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentWayOfPayment"]');
	var PaymentStatus = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentStatus"]');
	var PaymentRecipientInformation = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentRecipientInformation"]');
	var PaymentRecipient = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentRecipient"]');
	var PaymentSender = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsPayment_lblDetailsPaymentSender"]');

	// Kort/Kontantuttag
	var ATMDate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMDate"]');
	var ATMWayOfPayment = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMWayOfPayment"]');
	var ATMMachineNumber = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMMachineNumber"]');
	var ATMTime = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMTime"]');
	var ATMOriginalAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMOriginalAmount"]');
	var ATMExchangeRate = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMExchangeRate"]');
	var ATMAmount = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMAmount"]');
	var ATMText = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMText"]');
	var ATMWithdrawalDay = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMWithdrawalDay"]');
	var ATMCardNumber = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMCardNumber"]');
	var ATMCurrency = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMCurrency"]');
	var ATMSector = GetFieldText(xhr_doc, '//*[@id="ctl00_ctl00_ctl00_ctl00_cphBody_cphContentWide_cphContentWide_cphMainContent_cphMainContentSub_ucDetailsATM_lblDetailsATMSector"]');

	//document.getElementById("textArea1000").innerHTML += "\n" + id +' '+ node.textContent;

	delimiterTab = exportWindow.document.getElementById("delimiterTab");
	if (delimiterTab.checked)
		delimiter = '\t';
	else
		delimiter = ';';

	var output=
		data.pagenumber + delimiter +
		data.rownumber + delimiter +
		data.date + delimiter +
		data.description + delimiter +
		data.amount + delimiter +
		data.balance + delimiter +

		TransactionOriginRefVer + delimiter +
		TransactionOriginClearing + delimiter +
		TransactionCurrency + delimiter +
		TransactionCity + delimiter +
		TransactionOriginCashday + delimiter +
		TransactionExchangeRate + delimiter +
		TransactionOriginalAmount + delimiter +
		TransactionText + delimiter +
		TransactionAmount + delimiter +
		TransactionIDRef + delimiter +
		TransactionWayOfPayment + delimiter +
		TransactionDate + delimiter +

	//kort utland
		CardDate + delimiter +
		CardWayofPayment + delimiter +
		CardCity + delimiter +
		CardCardNumber + delimiter +
		CardCurrency + delimiter +
		CardSector + delimiter +
		CardAmount + delimiter +
		CardText + delimiter +
		CardPurchaseDay + delimiter +
		CardOriginalAmount + delimiter +
		CardExchangeRate + delimiter +


	//E-faktura
		PaymentEInvoiceGiroNr + delimiter +
		PaymentEInvoiceRecipient + delimiter +
		PaymentEInvoiceDate + delimiter +
		PaymentEInvoiceWayOfPayment + delimiter +
		PaymentEInvoiceStatus + delimiter +
		PaymentEInvoiceRecipientInformation + delimiter +
		PaymentEInvoiceAmount + delimiter +
		PaymentEInvoiceSender + delimiter +

	// Giro-betalning		

		PaymentGiroNr + delimiter +
		PaymentAmount + delimiter +
		PaymentDate + delimiter +
		PaymentWayOfPayment + delimiter +
		PaymentStatus + delimiter +
		PaymentRecipientInformation + delimiter +
		PaymentRecipient + delimiter +
		PaymentSender + delimiter +

	// Kort/Kontantuttag
		ATMDate + delimiter +
		ATMWayOfPayment + delimiter +
		ATMMachineNumber + delimiter +
		ATMTime + delimiter +
		ATMOriginalAmount + delimiter +
		ATMExchangeRate + delimiter +
		ATMAmount + delimiter +
		ATMText + delimiter +
		ATMWithdrawalDay + delimiter +
		ATMCardNumber + delimiter +
		ATMCurrency + delimiter +
		ATMSector;

	AddRowToOutput(output);

}



function AddRowToOutput(output) {

	rowsProcessed = exportWindow.document.getElementById("rowsProcessed");
	rowCount = parseInt(rowsProcessed.value) + 1;
	rowsProcessed.value = rowCount;
	unsafeWindow.console.log('Adding row ' + rowCount.toString() + " to output");

	outContainer = exportWindow.document.getElementById("exportOutput");
	outContainer.value = outContainer.value + output + '\n';
	outContainer.scrollTop = outContainer.scrollHeight;
	
	var maxrows = parseInt(document.getElementById("maxRows").value);

	//Eftersom både trådarna och mainwindow skriver till output så sker pagingen här.
	if (rowCount >= maxrows) {
		rowsProcessed.value = 0;
		unsafeWindow.console.log('Navigating to next page...');
		NavigateToNextPageIfPossible();
	
	}

}



function PrepareExportWindow() {
	unsafeWindow.console.log('Preparing output window...');
	exportWindow = window.open("", "exportWindow", "status=1,width=350,height=650");
	exportWindow.focus();

	if (exportWindow.document.getElementById("executionStatus") == null) {
		unsafeWindow.console.log('Writing popup html');
		var doc = exportWindow.document;
		doc.write('<html>');
		doc.write('<head title="Transaction mega exporter 3000">');
		doc.write('		<script language="javascript" type="text/javascript">');
		doc.write('			window.onunload = unloadPage;');
		doc.write('			function ToggleRunning() {');
		doc.write('				var status = document.getElementById("executionStatus");');
		doc.write('				var startStop = document.getElementById("startStop");');
		doc.write('				if (status.innerHTML == "running") {');
		doc.write('					status.innerHTML = "stopped";');
		doc.write('					startStop.value = "Start";');
		doc.write('				}');
		doc.write('				else {');
		doc.write('					status.innerHTML = "running";');
		doc.write('					startStop.value = "Stop";');
		doc.write('					');
		doc.write('				}');
		doc.write('			}');
		doc.write('			function unloadPage() {');
		doc.write('				var parentStatus = window.opener.document.getElementById("popupStatus");');
		doc.write('				parentStatus.value="notopened";');
		doc.write('			}');
		doc.write('		</script>');
		doc.write('</head>');
		doc.write('<body style="color:#dedede;font-family:calibri, tahoma;font-size:80%;font-family:calibri, tahoma;font-size:80%;background:url(https://secure3.skandiabanken.se/App_Themes/SkandiaBankenProtect/Core/Layout/header/bg.gif) repeat-x scroll left top #222222;"></form id="exportForm">');
		doc.write('<h1 style="color:#BCDC05;font-family:calibri,verdana">Transaction exporter 3000</h1>');
		doc.write('<p>');
		doc.write('<span>Delimiter <input type="radio" id="delimiterTab" name="delimiter" value="tab" checked="checked"/> Tab <input type="radio" name="delimiter" value="semicolon" /> Semi-colon</span>');
		doc.write('<span style="position:absolute;right:10px;"><input type="button" id="startStop" value="Start" onclick="ToggleRunning();"/></span>');
		doc.write('</p>');
		doc.write('<div style="height:80%;right:10px;left:10px;background-color:#ffe5e5;border:solid 2px white;">');
		doc.write('<textarea id="exportOutput" style="width:100%;height:100%;font-family:calibri,tahoma;font-size:80%" wrap="off" rows="2" cols="10"></textarea>'); //export output will come here
		doc.write('</div>');
		doc.write('Status: <span id="executionStatus">stopped</span>');
		doc.write('<input type="hidden" value="1" id="pageNumber"/>');
		doc.write('<input type="hidden" value="0" id="rowsProcessed"/>');
		doc.write('');
		doc.write('</form></body></html>');

		var popupStartButton = doc.getElementById("startStop");
		popupStartButton.addEventListener('click', GetData, true);

	}
	else {
//		unsafeWindow.console.log('Not writing popup html');
	}
	var popupstatus = document.getElementById("popupStatus");
	popupstatus.value = 'opened';
}

function WriteHeaders(outContainer, delimiter) {
	
	if (outContainer.value == "") {
		unsafeWindow.console.log('Writing headers to output...');
		outContainer.value =
		"PageNumber" + delimiter +
		"Rownumber" + delimiter +
		"Date" + delimiter +
		"Description" + delimiter +
		"Amount" + delimiter +
		"Balance" + delimiter +

		"TransactionOriginRefVer" + delimiter +
		"TransactionOriginClearing" + delimiter +
		"TransactionCurrency" + delimiter +
		"TransactionCity" + delimiter +
		"TransactionOriginCashday" + delimiter +
		"TransactionExchangeRate" + delimiter +
		"TransactionOriginalAmount" + delimiter +
		"TransactionText" + delimiter +
		"TransactionAmount" + delimiter +
		"TransactionIDRef" + delimiter +
		"TransactionWayOfPayment" + delimiter +
		"TransactionDate" + delimiter +

		"CardDate" + delimiter +
		"CardWayofPayment" + delimiter +
		"CardCity" + delimiter +
		"CardCardNumber" + delimiter +
		"CardCurrency" + delimiter +
		"CardSector" + delimiter +
		"CardAmount" + delimiter +
		"CardText" + delimiter +
		"CardPurchaseDay" + delimiter +
		"CardOriginalAmount" + delimiter +
		"CardExchangeRate" + delimiter +

		//E-faktura
		"PaymentEInvoiceGiroNr" + delimiter +
		"PaymentEInvoiceRecipient" + delimiter +
		"PaymentEInvoiceDate" + delimiter +
		"PaymentEInvoiceWayOfPayment" + delimiter +
		"PaymentEInvoiceStatus" + delimiter +
		"PaymentEInvoiceRecipientInformation" + delimiter +
		"PaymentEInvoiceAmount" + delimiter +
		"PaymentEInvoiceSender" + delimiter +

		// Giro-betalning		"

		"PaymentGiroNr" + delimiter +
		"PaymentAmount" + delimiter +
		"PaymentDate" + delimiter +
		"PaymentWayOfPayment" + delimiter +
		"PaymentStatus" + delimiter +
		"PaymentRecipientInformation" + delimiter +
		"PaymentRecipient" + delimiter +
		"PaymentSender" + delimiter +

		// Kort/Kontantuttag
		"ATMDate" + delimiter +
		"ATMWayOfPayment" + delimiter +
		"ATMMachineNumber" + delimiter +
		"ATMTime" + delimiter +
		"ATMOriginalAmount" + delimiter +
		"ATMExchangeRate" + delimiter +
		"ATMAmount" + delimiter +
		"ATMText" + delimiter +
		"ATMWithdrawalDay" + delimiter +
		"ATMCardNumber" + delimiter +
		"ATMCurrency" + delimiter +
		"ATMSector" + "\n";
	}

}



function GetData() {

	unsafeWindow.console.log('Starting GetData()...');

	var popupstatus = document.getElementById("popupStatus");
	unsafeWindow.console.log('popupstatus:' + popupstatus.value)
	//	if (popupstatus.value == 'notopened') {
	//		return;
	//	}
	var myContainer = document.evaluate('/html/body/div/div/div/div/ol', document, null, XPathResult.ANY_TYPE, null).iterateNext();

	var delimiter = '\t';

	PrepareExportWindow();

	//exportWindow = window.open("", "exportWindow", "status=1,width=350,height=650");

	executionStatus = exportWindow.document.getElementById("executionStatus");
	unsafeWindow.console.log('executionstatus:' + executionStatus.innerHTML);
	if (executionStatus.innerHTML != 'running') {
		unsafeWindow.console.log('Exiting GetData() due to not running status.');
		return;
	}

	outContainer = exportWindow.document.getElementById("exportOutput");

	pageNumber = parseInt(exportWindow.document.getElementById("pageNumber").value);

	delimiterTab = exportWindow.document.getElementById("delimiterTab");
	if (delimiterTab.checked)
		delimiter = '\t';
	else
		delimiter = ';';

	WriteHeaders(outContainer,delimiter);

	var tableBody = document.evaluate('/html/body/form/div[3]/div[2]/div/div/div/div/div[2]/div/div[5]/table/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();

	var maxrows = tableBody.rows.length;
	document.getElementById("maxRows").value = maxrows;

	unsafeWindow.console.log('Setting maxrows to ' + maxrows.toString());
	unsafeWindow.console.log('Processing '+maxrows.toString()+' rows...');

	for (i = 0; i < tableBody.rows.length; i++) {
		//for (i = 0; i < 1; i++) 

		var row = tableBody.rows[i];
		var date = row.cells[0].children[0].innerHTML;
		var description = row.cells[1].children[0].children[0].innerHTML.trim();

		var link = row.cells[1].children[0].children[0];

		//var description = (row.cells[1].children[0].children[0].nodeName == 'SPAN') ? row.cells[1].children[0].children[0].textContent.trim() : row.cells[1].children[0].children[0].text.trim();
		var amount = row.cells[2].children[0].innerHTML;
		var balance = row.cells[3].children[0].innerHTML;
		amount = amount.replace("&nbsp;", "");
		balance = balance.replace("&nbsp;", "");

		//vi skapar en dynamisk klass som vi skickar med till SuckDataFromLink, detta behandlas när asynkrona anropet är klart.
		var data = {
			pagenumber: pageNumber,
			rownumber: i+1,
			date: date,
			balance: balance,
			amount: amount,
			description: description
		};


		//det finns ocklickbara kontorader, dessa ska vi inte skicka iväg på asynkronklicket (suckdatafromlink)
		if (link.nodeName == "SPAN") {

			var output =
				data.pagenumber + delimiter +
				data.rownumber + delimiter +
				data.date + delimiter +
				data.description + delimiter +
				data.amount + delimiter +
				data.balance;
			AddRowToOutput(output);

		}
		else {
			SuckDataFromLink(link, data);
		}


		//outContainer.scrollTop = outContainer.scrollHeight;

	}
		
	//NavigateToNextPageIfPossible();
}

function NavigateToNextPageIfPossible() {
	unsafeWindow.console.log('NextButton disabled:' + nextButton.disabled)
	if (nextButton.disabled == false) {
		pageNumber = parseInt(exportWindow.document.getElementById("pageNumber").value);
		exportWindow.document.getElementById("pageNumber").value = pageNumber + 1;
		clickLink(nextButton);
	}
	else {
		executionStatus = exportWindow.document.getElementById("executionStatus");
		unsafeWindow.console.log('disabling executionstatus due to last page');
		executionStatus.innerHTML = 'stopped';
	}
}

function mouseEvent(parent, type) {
	var evt = parent.ownerDocument.createEvent('MouseEvents');
	evt.initMouseEvent(type, true, true,
parent.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false,
false, 0, null);
	return parent.dispatchEvent(evt);
}

function click(parent) {
	return mouseEvent(parent, 'click');
}

function clickLink(target) {
	var notCanceled = click(target);
	if (target.tagName == "A" && notCanceled) window.location.href =
target.href;
}


Initialize();


