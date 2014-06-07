// ==UserScript==
// @name			Trade Advisor Events Extender
// @namespace		Trade-advisor-events-extender
// @description		Extends the events list on the trade advisor page
// @author			salomone
// @version			0.8.0
// @include			http://s*.ikariam.*/*view=tradeAdvisor*
// @include			http://s*.ikariam.*/*view=options*
// ==/UserScript==
// History:
// v.0.8.0 - 16/08/2009
//	* first commited
//	* all of the translations made by babelfish (web translator)

$ = document.getElementById;
var gameServer = top.location.host;
var url = self.location.href;
var NUMBER_OF_MESSAGES_ON_PAGE_MAP = new Object();
NUMBER_OF_MESSAGES_ON_PAGE_MAP = {10 : '10', 20 : '20', 30 : '30', 40 : '40', 50 : '50', 60 : '60', 70 : '70', 80 : '80', 90 : '90', 100 : '100', 999 : '∞'};
var originalTableBody = null;
var loc = top.location.href; 
var langList = { en: 'English', hu: 'Magyar', cn : 'Chinese', nl : 'Dutch', fr: 'Français', de : 'German', gr : 'Greek', it : 'Italian', jp : 'Japanese', kr : 'Korean', pt : 'Portuguese', ru : 'Russian', es: 'Espa\u00f1ol' };

if ( url.indexOf('view=tradeAdvisor') > 0  )	{		
	extendTradeAdvisorPage();
}

if ( url.indexOf('view=options') > 0  )	{	
	
	var language = setLanguage();	
	var options = getOptionsInLang(language);
	
	var numOfMessages = GM_getValue( 'NUMBER_OF_MESSAGES_ON_PAGE_VALUE', 10 );
	var localizedDFT = GM_getValue( 'LOCALIZED_DFT', false );
	
	var emailChangeDiv = null;
	emailChangeDiv = $X("//*[@id='mainview']/div/div/form/input[@value='changeEmail']/../../.." );	
	
	var setupContainer;
	setupContainer = document.createElement('div');
	setupContainer.id = 'extendTradeAdvisorSetupContainer';	
	setupContainer.className = 'contentBox01h';
		
	var headerObj = null;
	headerObj = document.createElement('h3');
	headerObj.className = 'header';
	
	var headerSpanObj = null;
	headerSpanObj = document.createElement('span');
	headerSpanObj.className = '';
	headerSpanObj.appendChild ( document.createTextNode( options['EXTEND_TRADE_ADVISOR_SETUP'] ) );
	headerObj.appendChild( headerSpanObj );	
	setupContainer.appendChild( headerObj );
	
	var contentDiv = null;
	contentDiv = document.createElement('div');
	contentDiv.id = 'extendTradeAdvisorContentDiv';	
	contentDiv.className = 'content';	
	
	var setupTable = null;
	setupTable = document.createElement('table');
	setupTable.setAttribute('id', 'extendTradeAdvisorSetupTable');
	setupTable.setAttribute('cellpadding', '0');
	setupTable.setAttribute('cellspacing', '0');
	setupTable.style.margin = 'auto';
	
	var setupTableBody = null;
	setupTableBody = document.createElement('tbody');
	
	var numberOfMessagesRow = null;
	numberOfMessagesRow = document.createElement('tr');
	
	var numberOfMessagesTextCell = null;
	numberOfMessagesTextCell = document.createElement('td');
	numberOfMessagesTextCell.appendChild( document.createTextNode( options['NUMBER_OF_MESSAGES'] ) );
	numberOfMessagesTextCell.style.backgroundColor = '#FAEAC6';
	
	var numberOfMessagesListBoxCell = null;
	numberOfMessagesListBoxCell = document.createElement('td');
	
	var numberOfMessagesListBox = null;
	numberOfMessagesListBox = convertMapToListBox( NUMBER_OF_MESSAGES_ON_PAGE_MAP, numOfMessages );
	numberOfMessagesListBox.setAttribute('id', 'NUMBER_OF_MESSAGES_ON_PAGE_VALUE_ID' );
	numberOfMessagesListBoxCell.appendChild( numberOfMessagesListBox );
	
	numberOfMessagesRow.appendChild( numberOfMessagesTextCell );
	numberOfMessagesRow.appendChild( numberOfMessagesListBoxCell );
	setupTableBody.appendChild( numberOfMessagesRow );
	
	
	var localizedDateFormatRow = null;
	localizedDateFormatRow = document.createElement('tr');
	
	var localizedDateFormatTextCell = null;
	localizedDateFormatTextCell = document.createElement('td');
	localizedDateFormatTextCell.appendChild( document.createTextNode( options['LOCALIZED_DATEFORMAT'] ) );
	
	var localizedDateFormatListBoxCell = null;
	localizedDateFormatListBoxCell = document.createElement('td');	
	localizedDateFormatListBoxCell.style.backgroundColor = '#FAEAC6';
	
	var localizedDateFormatCheckBox = null;
	localizedDateFormatCheckBox = document.createElement('input');
	localizedDateFormatCheckBox.setAttribute('type', 'checkbox' );
	localizedDateFormatCheckBox.setAttribute('id', 'LOCALIZED_DFT_ID' );
	if ( localizedDFT )	{
		localizedDateFormatCheckBox.setAttribute('checked', 'checked');
	}
	localizedDateFormatListBoxCell.appendChild( localizedDateFormatCheckBox );
	
	localizedDateFormatRow.appendChild( localizedDateFormatTextCell );
	localizedDateFormatRow.appendChild( localizedDateFormatListBoxCell );
	setupTableBody.appendChild( localizedDateFormatRow );
	
	setupTable.appendChild( setupTableBody );
	contentDiv.appendChild( setupTable );	
	
	var saveButton = null;
	saveButton = document.createElement('input');
	saveButton.setAttribute('type', 'button');
	saveButton.setAttribute('id', 'extendTradeAdvisorSaveButton');
	saveButton.setAttribute('value', options['SAVE_BUTTON_TEXT'] );
	saveButton.setAttribute('class', 'button' );
	
	addEvent( saveButton, 'click', function(){saveExtendTradeAdvisorSetupChanges();}, true );		
	addEvent( saveButton, 'click', function(){history.back();}, true );
	
	var saveButtonDiv = null;
	saveButtonDiv = document.createElement('div');
	saveButtonDiv.className = 'centerButton';	
	saveButtonDiv.appendChild( saveButton );
			
	contentDiv.appendChild( saveButtonDiv );	
	setupContainer.appendChild( contentDiv );	
	
	var footerDiv;
	footerDiv = document.createElement('div');
	footerDiv.className = 'footer';
	setupContainer.appendChild( footerDiv );	
	
	emailChangeDiv.parentNode.insertBefore( setupContainer, emailChangeDiv.nextSibling );	
}

function saveExtendTradeAdvisorSetupChanges()	{
	var setupTableBody = $X("//*[@id='mainview']/div/div/table[@id='extendTradeAdvisorSetupTable']/tbody");
	var tdElements;	
	tdElements = $x("./tr/td/input", setupTableBody);
	var i = 0;
	for ( i = 0; i != tdElements.length; i++ )	{		
		var variableName = tdElements[i].getAttribute('id').replace('_ID', '');
		var variableValue = tdElements[i].checked;
		GM_setValue( variableName, variableValue );
	}
	
	tdElements = $x("./tr/td/select", setupTableBody);
	for ( i = 0; i != tdElements.length; i++ )	{		
		var variableName = tdElements[i].getAttribute('id').replace('_ID', '');
		var variableValue = tdElements[i].options[tdElements[i].selectedIndex].value;
		GM_setValue( variableName, variableValue );
	}
}

function getOptionsInLang(language)	{
	switch (language) {
	case 'hu' :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Polgármesteri jelentések beállítása',
			'NUMBER_OF_MESSAGES' : 'Események száma :',
			'LOCALIZED_DATEFORMAT' : 'Helyi dátumformátum',
			'SAVE_BUTTON_TEXT' : 'Beállítások mentése'
		};
/*
	case "xx" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'aa',
			'NUMBER_OF_MESSAGES' : 'aa :',
			'LOCALIZED_DATEFORMAT' : 'aa',
			'SAVE_BUTTON_TEXT' : 'aa'
		};
*/		
	case "es" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'El consejero comercial divulga la disposición',
			'NUMBER_OF_MESSAGES' : 'Número de acontecimientos :',
			'LOCALIZED_DATEFORMAT' : 'Formato de fecha localizado',
			'SAVE_BUTTON_TEXT' : 'Salvar Configuraciones'
		};
		
	case "ru" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Торговый советник сообщает установку',
			'NUMBER_OF_MESSAGES' : 'Количество случаев :',
			'LOCALIZED_DATEFORMAT' : 'Локализованный формат даты',
			'SAVE_BUTTON_TEXT' : 'За исключением установок'
		};
		
	case "pt" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'O conselheiro de comércio relata a instalação',
			'NUMBER_OF_MESSAGES' : 'Número de eventos	 :',
			'LOCALIZED_DATEFORMAT' : 'Formato de data localizado	',
			'SAVE_BUTTON_TEXT' : 'Excepto ajustes'
		};
		
	case "kr" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : '무역 고문관은 체제를 보고한다',
			'NUMBER_OF_MESSAGES' : '사건의 수 :',
			'LOCALIZED_DATEFORMAT' : '지방화된 날짜 표시 형식',
			'SAVE_BUTTON_TEXT' : '조정을 제외하고'
		};
		
	case "jp" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : '貿易顧問は組み立てを報告する',
			'NUMBER_OF_MESSAGES' : 'でき事の数 :',
			'LOCALIZED_DATEFORMAT' : '集中させた日付表示形式',
			'SAVE_BUTTON_TEXT' : '設定を除けば'
		};
		
	case "it" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Il consigliere commerciale segnala la messa a punto',
			'NUMBER_OF_MESSAGES' : 'Numero degli eventi :',
			'LOCALIZED_DATEFORMAT' : 'Disposizione di data localizzata',
			'SAVE_BUTTON_TEXT' : 'Salvo le regolazioni'
		};
		
	case "gr" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Ο εμπορικός σύμβουλος εκθέτει την οργάνωση',
			'NUMBER_OF_MESSAGES' : 'Αριθμός γεγονότων :',
			'LOCALIZED_DATEFORMAT' : 'Εντοπισμένο σχήμα ημερομηνίας',
			'SAVE_BUTTON_TEXT' : 'Εκτός από τις τοποθετήσεις'
		};
		
	case "de" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Geschäftsberater berichtet über Einstellung',
			'NUMBER_OF_MESSAGES' : 'Zahl von Ereignissen :',
			'LOCALIZED_DATEFORMAT' : 'Beschränktes Datumformat',
			'SAVE_BUTTON_TEXT' : 'Außer Einstellungen'
		};
		
	case "fr" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Le conseiller commercial rapporte l\'installation',
			'NUMBER_OF_MESSAGES' : 'Nombre d\'événements :',
			'LOCALIZED_DATEFORMAT' : 'Format de date localisé',
			'SAVE_BUTTON_TEXT' : 'Sauver les préférences'
		};
		
	case "nl" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'De adviseur van de handel meldt opstelling',
			'NUMBER_OF_MESSAGES' : 'Aantal gebeurtenissen :',
			'LOCALIZED_DATEFORMAT' : 'Gelokaliseerd datumformaat',
			'SAVE_BUTTON_TEXT' : 'Sparen montages'
		};
		
	case "cn" :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : '商业顾问报告设定',
			'NUMBER_OF_MESSAGES' : '事件的数字 :',
			'LOCALIZED_DATEFORMAT' : '地方化的数据格式',
			'SAVE_BUTTON_TEXT' : '除设置之外'
		};
		
	default :
		return {
			'EXTEND_TRADE_ADVISOR_SETUP' : 'Trade advisor reports setup',
			'NUMBER_OF_MESSAGES' : 'Number of events :',
			'LOCALIZED_DATEFORMAT' : 'Localized dateformat',
			'SAVE_BUTTON_TEXT' : 'Save settings'
		};
	}
}

function setLanguage()	{
	var urlString = self.location.href;	
	var urlPartsByDivChar = urlString.split('\/');
	var urlParts = urlPartsByDivChar[2].split('\.');
	var lang = urlParts[urlParts.length - 1];	
	if (lang == "com" && urlParts.length == 4) { //for example: http://s1.ba.ikariam.com
		lang = urlParts[1];
	}
	if (lang == "net" && urlParts.length == 3) { //for example: http://s1.ikariam.net/
		lang = "tr";
	}
	var langVal = langList[lang];
	if ( langVal != 'undefined' )	{
		return lang;
	}
	return 'en';
}

function addEvent(obj, evType, fn, bubble)	{
	if (obj.addEventListener)	{
		obj.addEventListener(evType, fn, bubble);
		return true;
	} 
	else if (obj.attachEvent)	{
		var r = obj.attachEvent('on'+evType, fn);
		return r;
	}
	else	{
		return false;
	}
}

function getContextBoxRoot(page)	{
	if (page)	{
		return $X(".//div[@id='mainview']/div[@class='contentBox01h']", page);
	}
	
	return $X(".//div[@id='mainview']/div[@class='contentBox01h']");
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function convertMapToListBox( sourceMap, value ){
	if ( value == null )	{
		value = 10;
	}
	var res = document.createElement('select');
	var key = 0;	
	
	for ( key in sourceMap )	{
		newOption = document.createElement('option');
		newOption.setAttribute('value', key);
		newOption.text = sourceMap[key];
		if ( key == value )	{
			newOption.setAttribute('selected', 'selected');
		}
		res.appendChild(newOption);		
	}
	
	return res;
}

function createHiddenDiv( divId, divContent )	{
	var hiddenDiv = document.createElement('div');
	hiddenDiv.style.display = 'none';
	hiddenDiv.style.visibility = 'hidden';
	hiddenDiv.id = 'undefined' == divId || null == divId ? 'hiddenDiv' + ( Math.random() * 100 ) : divId ;
	
	if (divContent)	{
		hiddenDiv.innerHTML = 'string' == typeof divContent ? divContent : divContent.toXMLString();
	}	
	
	return hiddenDiv;
}

function getMessagePages(dataStr, fn) {
	GM_xmlhttpRequest({
		method: 'POST',
		url:'http://' + gameServer + '/index.php',
		data: dataStr,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php',
			'Cookie': document.cookie
		},
		onload: function(xhr) { fn(xhr.responseText); },
		onerror: function(xhr)	{ writeError(xhr.responseText); }
	});
}

function writeError( rd )	{
	GM_log('status: ' + rd.status);
	GM_log('statusText: ' + rd.statusText);
	GM_log('responseHeaders: ' + rd.responseHeaders);
	GM_log('responseText: ' + rd.responseText);
}

function extendTradeAdvisorPage()	{
	var numOfMessages = GM_getValue( 'NUMBER_OF_MESSAGES_ON_PAGE_VALUE', 10 );
	var dft = GM_getValue( 'LOCALIZED_DFT', false );
	
	if ( numOfMessages == 10 && !dft )	{
		return;
	}
	var contentBoxRoot = getContextBoxRoot();	
	originalTableBody = $X( "./div[@class='content']/table[@id='inboxCity']/tbody", contentBoxRoot );

	if ( dft )	{
		originalTableRows = $x("./tr[@class!='pgnt' or not(@class)]", originalTableBody);
		var paginatorLink = $X("./tr[@class='pgnt']", originalTableBody);
		var rows = 0;
		for ( rows = 0; rows != originalTableRows.length; rows++ )	{
			originalTableBody.insertBefore( processTr( originalTableRows[rows] ), paginatorLink);
		}
	}	
	
	
	var availableEvents = getAvailableEvents( contentBoxRoot );
	
	GM_log( 'availableEvents: '+ availableEvents);
	
	var maximumNumberOfAvailablePages = Math.floor( availableEvents / 10 );

	var nextPageLink = getPageLink( contentBoxRoot, true );
	
	if ( nextPageLink == null )	{
		// No available pages left
		return
	}	
	
	var nextPageLinkText = new String();	
	nextPageLinkText = nextPageLink.getAttribute('href');
	var offsetValue = getOffsetValueFromLinkText( nextPageLinkText );
	var nextPageIndex = Math.floor( offsetValue / 10 );
	var lastPageIndex = nextPageIndex +  Math.floor( numOfMessages / 10 ) - 1 ;
	if ( lastPageIndex > maximumNumberOfAvailablePages || numOfMessages == 999 )	{
		lastPageIndex = maximumNumberOfAvailablePages + 1;
	}	
	
	var i = 0;
	var offsetValues = new Array();
	for ( i = nextPageIndex; i != lastPageIndex; i++ )	{
		offsetValues.push( i * 10 );
	}	
	GM_log( 'offsetValues: ' + offsetValues );
	
	var baseDataString = new String();
	baseDataString = nextPageLinkText.split('?')[1];
	baseDataString = baseDataString.split( /offset=\d*/ )[0] + 'offset=##' + baseDataString.split( /offset=\d*/ )[1];
	var finalDataString = new String();
	for ( i = 0; i != offsetValues.length; i++ )	{
		 finalDataString = baseDataString.replace(/offset=##/, 'offset=' + offsetValues[i] );
		 getMessagePages(finalDataString, getAdditionalEvents );
	}
	
	// Replace the link text
	/*
	if ( lastPageIndex > maximumNumberOfAvailablePages )	{
		lastPageIndex = maximumNumberOfAvailablePages;
	}	
	*/
	replacePageLinks(contentBoxRoot, numOfMessages, lastPageIndex, baseDataString, offsetValue, availableEvents );
}

function getAvailableEvents(contentBoxRoot)	{
	headerElement = $X("./h3", contentBoxRoot);	
	var headerText = new String();
	headerText = headerElement.innerHTML;
	var numOfAvalilabelEvents = new Number();
	var start = new Number();
	start = headerText.search( /\(/ ) + 1;
	var end = new Number();
	end = headerText.length - 1;
	numOfAvalilabelEvents = parseInt( headerText.substring( start, end ).replace( /\)/, '') );
	return numOfAvalilabelEvents;
}

function getPageLink( pageLinksRoot, next )	{
	if ( next )	{
		pageLinkElement = $X("./div[@class='content']/table[@id='inboxCity']/tbody/tr/td[@class='paginator']/div[@class='next']/a", pageLinksRoot);
	}
	else	{
		pageLinkElement = $X("./div[@class='content']/table[@id='inboxCity']/tbody/tr/td[@class='paginator']/div[@class='last']/a", pageLinksRoot);
	}
	return pageLinkElement;
}

function getOffsetValueFromLinkText( linkText )	{	
	var offsetText = new String();
	offsetText = linkText.split( /offset=/ )[1];
	offsetText = offsetText.substring(0, offsetText.search('&'));
	return parseInt( offsetText );	
}

function replacePageLinks( contentBoxRoot, numOfMessages, lastPageIndex, baseDataString, offsetValue, availableEvents )	{
	var linkRoot = $X( "./div[@class='content']/table[@id='inboxCity']/tbody/tr/td[@class='paginator']", contentBoxRoot );	
	
	var previousPageDivElement = $X("./div[@class='last']", linkRoot);
	var pagePositionElement = $X("./div[@class='text']", linkRoot);	
	var nextPageDivElement = $X("./div[@class='next']", linkRoot);
	
	var idxOfFirstMessageOnLastPage = lastPageIndex * 10;
	
	var myPreviousPageDivElement = null;
	
	if ( previousPageDivElement != null )	{
		myPreviousPageDivElement = previousPageDivElement.cloneNode(true);
		var myPrevoiusPageLinkElement = $X("./a", myPreviousPageDivElement);
		var previousPageLinkText = myPrevoiusPageLinkElement.getAttribute('href');
		var previousPageLinkOffset = getOffsetValueFromLinkText( previousPageLinkText );
		previousPageLinkOffset = previousPageLinkOffset < numOfMessages ? 0 : previousPageLinkOffset - numOfMessages + 10;	
		var previousTitle = new String();
		previousTitle = myPrevoiusPageLinkElement.getAttribute('title');	
		myPrevoiusPageLinkElement.setAttribute('title', previousTitle.replace(/10/, numOfMessages));
		myPrevoiusPageLinkElement.setAttribute('href', previousPageLinkText.split('?')[0] + '?' + baseDataString.replace(/offset=##/, 'offset=' + previousPageLinkOffset ) );
		
		myPreviousPageDivElement.removeChild( myPreviousPageDivElement.firstChild );
		myPreviousPageDivElement.appendChild( myPrevoiusPageLinkElement );
	}		
	
	myPagePositionElement = pagePositionElement.cloneNode(true);
	var myPagePositionString = new String();
	myPagePositionString = myPagePositionElement.innerHTML;
	myPagePositionString = myPagePositionString.replace( offsetValue, ( numOfMessages == 999 || idxOfFirstMessageOnLastPage > availableEvents  ? availableEvents : idxOfFirstMessageOnLastPage ) );
	myPagePositionElement.innerHTML = myPagePositionString;
	myPagePositionElement.setAttribute( 'title', myPagePositionString );
		 
	var myNextPageLinkDivElement = null;		
	if ( nextPageDivElement != null && numOfMessages != 999 && idxOfFirstMessageOnLastPage <= availableEvents )	{		
		myNextPageLinkDivElement = nextPageDivElement.cloneNode(true);		
		var myNextPageLinkElement = $X("./a", myNextPageLinkDivElement);	
		var myNextPageLinkText = myNextPageLinkElement.getAttribute('href');
		var nextTitle = new String();
		nextTitle = myNextPageLinkElement.getAttribute('title');	
		myNextPageLinkElement.setAttribute('title', nextTitle.replace(/10/, numOfMessages));
		myNextPageLinkElement.setAttribute('href', myNextPageLinkText.split('?')[0] + '?' + baseDataString.replace(/offset=##/, 'offset=' + idxOfFirstMessageOnLastPage ) );
		
		myNextPageLinkDivElement.removeChild( myNextPageLinkDivElement.firstChild );
		myNextPageLinkDivElement.appendChild( myNextPageLinkElement );
	}	
	
	var childCount = linkRoot.childNodes.length;
	var i = 0;
	for ( i = 0; i != childCount; i++ )	{
		linkRoot.removeChild( linkRoot.firstChild );
	}
	
	if ( myPreviousPageDivElement != null )	{
		linkRoot.appendChild( myPreviousPageDivElement );
	}
	linkRoot.appendChild( myPagePositionElement );
	if ( myNextPageLinkDivElement != null )	{
		linkRoot.appendChild( myNextPageLinkDivElement );
	}

}

function getAdditionalEvents(page)	{
	if ( page )	{
		
		var newContentBoxRoot = getContextBoxRoot( createHiddenDiv('hidden_message_div_id', page) );
		var newEventsTable = $X("./div[@class='content']/table[@id='inboxCity']/tbody", newContentBoxRoot);		
		var newEventsRows = $x("./tr[@class!='pgnt' or not(@class)]", newEventsTable);

		if ( newEventsTable == null || newEventsRows == null )	{
			GM_log ( 'NO TABLE ');
			return;
		}
		
		var myPageLink = getPageLink( newContentBoxRoot, true );
		var diff = 10;		
		if ( myPageLink == null )	{
			myPageLink = getPageLink( newContentBoxRoot, false );
			diff = 0;
		}
		var myPageLinkText = new String();	
		myPageLinkText = myPageLink.getAttribute('href');
		var offsetValue = getOffsetValueFromLinkText( myPageLinkText ) - diff;
		
		var insertBefore = $X( "./tr/input[@id='requeststart' and @value> " + offsetValue + "]", originalTableBody );
		
		var hiddenRequestStart = document.createElement('input');
		hiddenRequestStart.setAttribute('type', 'hidden' );
		hiddenRequestStart.setAttribute('id', 'requeststart');
		hiddenRequestStart.setAttribute('value', offsetValue);		
		newEventsRows[0].appendChild( hiddenRequestStart );
		
		var paginatorLink = $X("./tr[@class='pgnt']", originalTableBody);
		if ( insertBefore != null )	{			
			insertBefore = insertBefore.parentNode;
		}
		else	{			
			insertBefore = paginatorLink;
		}

		var i = 0;
		var dft = GM_getValue( 'LOCALIZED_DFT', false )
		if ( dft )	{
			for ( i = 0; i != newEventsRows.length; i++ )	{
				originalTableBody.insertBefore( processTr( newEventsRows[i], dft ), insertBefore);
			}
		}
		else	{
			for ( i = 0; i != newEventsRows.length; i++ )	{
				originalTableBody.insertBefore( newEventsRows[i], insertBefore);
			}
		}	
	}
}

function processTr( tableRow )	{
	var dateCell = $X("./td[@class='date']/b", tableRow);	
	if ( dateCell == null )	{
		dateCell = $X("./td[@class='date']", tableRow);
	}	
	
	if ( dateCell == null )	{
		GM_log ( 'NO DATECELL: ' + tableRow.innerHTML );
		return tableRow;
	}
	
	dateCell.innerHTML = getFormattedDate( dateCell.innerHTML );
	return tableRow;
}

function getFormattedDate( oldDate )	{
	var day = oldDate.split(' ')[0].split('.');
	var time = oldDate.split(' ')[1].split(':');	
	var d = new Date(
		parseInt(day[2].replace(/^[0]/g,"")),
		parseInt(day[1].replace(/^[0]/g,"")) - 1,
		parseInt(day[0].replace(/^[0]/g,"")),
		parseInt(time[0]),
		parseInt(time[1].replace(/^[0]/g,"")),
		time.length == 3 ? parseInt(time[2].replace(/^[0]/g,"")) : 0,
	0
	);	
	return d.toLocaleString();
}

