// ==UserScript==
// @name           Mafia Wars - Execute Job on Any Tab
// @namespace      http://apps.facebook.com/inthemafia/
// @description    Allows you to choose which tab a job should be executed on
// @include        http://apps.facebook.com/inthemafia*
// ==/UserScript==


if ( !(new String).trim ){
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,''); };
}	
if ( !(new String).normalize && (new String).trim ){
	String.prototype.normalize = String.prototype.normalise = function() { return this.trim().replace(/\s+/g,' '); };
}	
if ( !(new String).startsWith ){
	String.prototype.startsWith = function(str,i){ i=(i)?'i':'';var re=new RegExp('^'+str,i);return (this.normalize().match(re)) ? true : false ; };
}	
if ( !(new String).endsWith ){
	String.prototype.endsWith = function(str,i){ i=(i)?'gi':'g';var re=new RegExp(str+'$',i);return (this.normalize().match(re)) ? true : false ; };
}

function getOuterHTML(elementObj) {
	var tempDiv = document.createElement('div');
	tempDiv.appendChild(elementObj);
	return tempDiv.innerHTML;	
}
function getObjectFromHTML(nodeHTML) {
	var tempDiv = document.createElement('div');
	tempDiv.innerHTML = nodeHTML;
	return tempDiv.firstChild;
}

/***
* Object: Utils
*
* Description: contains some utilities functions.
*/
Utils = new Object();

Utils.xpath = function(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}



/***
 * Method: Element.getElementsByClassName(name, node)
 *
 * Description:
 * Gets a list of elements with a give className.
 *
 * @param name        -- the classname to look for.
 * @param node        -- node on which we start the search.
 * @return array      -- an array of nodes matching the classname.
 */
if (document.getElementsByClassName) {
  /* Firefox 3: native implementation */
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    return node.getElementsByClassName(classname);
  }
} else {
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    var xpathExpression;
    var returnElements = new Array();
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";
    var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);

    while (node = xpathResult.iterateNext()) {
      returnElements.push(node);
    }
    return returnElements;
  }
}

/***
* Function: Utils.getElementsByXPath(expression, node)
*
* Description:
* Returns an array of elements obtained from evaluating the XPath expression on
* the node.
*
* @param expression         -- the expression to evaluate.
* @param node               -- context node, defaults to document.
* @return array             -- an array of elements matching the expression
*/
Utils.getElementsByXPath = function(expression, node) {
	if (!node) node = document;
	var result = new Array();
	var xpathResult;
	xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

	var node;
	while (node = xpathResult.iterateNext()) {
		result.push(node);
	}
	return result;
}

function xpath(query, node) {
	if(!node) 
		node = document;
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function isNumeric(x) {
	return !isNaN(x);
}

var _percent = -1;
var _pctComplete = -1;
var _origTab = -1;
var _newJobTab = -1;
var _jobPctHTML = '';
var _jobMasteryHTML = '';
var _currSBColor = '';

function checkForJobsPage() {
	
	// check to see if the game is in cuba
	var cashInfo = xpath("//div[@class='cash_stats']/span");
	var inNY = (cashInfo.snapshotItem(0).innerHTML.indexOf('Cash') > -1);
	
	var jobTable = xpath("//td[@id='app10979261223_content_row']/table[@class='job_list' and @cellspacing='0']");

	if(jobTable.snapshotLength>0) {			
		
		if(jobTable.snapshotItem(0).rows[0].cells[3].innerHTML.length < 7) {
			//var tabSel = '<select id="jobTabList"><option value="1">Street Thug</option><option value="2">Associate</option><option value="3">Soldier</option><option value="4">Enforcer</option><option value="5">Hitman</option><option value="6">Capo</option><option value="7">Consigliere</option><option value="8">Underboss</option><option value="9">Boss</option></select>';		
			//jobTable.snapshotItem(0).rows[0].cells[3].innerHTML = tabSel;
			
			jobTable.snapshotItem(0).rows[0].cells[3].appendChild( buildTabDropDown() );
			
			var tabSelO = document.getElementById('jobTabList');					
			tabSelO.addEventListener('change', updateJobTabs, false);
			
			
			var currTab = currTabIndex();
			if(currTab > 0) {
				tabSelO.selectedIndex = (currTab - 1);
			}
			
			if(inNY)
				buildNav();
				
			highlightBestJob();
			
			if(_newJobTab > -1 && currTab == _newJobTab) {
				var msgDiv = xpath("//table[@class='messages']");
				if(msgDiv.snapshotLength > 0 ) {
					var pctInfo = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']/dl/dd/span");
					var pctInfoHTML = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']/dl/dd");
					var masteryInfo = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']/dl/span");
					var masteryInfoHTML = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']/dl");					
					
					var pctReplacement = '|**|';
					
					if(pctInfo.snapshotLength > 0 && masteryInfo.snapshotLength > 0) {						
						var pct = pctInfo.snapshotItem(1).innerHTML;
						_percent = parseInt(pct.substring(0, pct.length-1));
						
						var mi =  masteryInfo.snapshotItem(0).innerHTML.substring(12);					
						_pctComplete = parseInt(mi.substring(0, mi.length-1));
																		
						_jobPctHTML = pctInfoHTML.snapshotItem(2).cloneNode(true);
						_jobMasteryHTML = masteryInfoHTML.snapshotItem(2).cloneNode(true);
						
						
						var pctg = _pctComplete + '%';
						_jobMasteryHTML.innerHTML = _jobMasteryHTML.innerHTML.replace(pctg, pctReplacement);						
						
					} else if( masteryInfo.snapshotLength == 0 && _percent != -1) {
						
						var msgBody = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']");						
						var buttonNodes = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']/div[@class='message_buttons']");
						
						var msgAlert = xpath("//dl[@class='message_alert']", msgBody.snapshotItem(0));
						if(msgAlert.snapshotLength == 0) {
													
							_pctComplete += _percent
							
							masteryInfoHTML.snapshotItem(0).appendChild(_jobPctHTML);
							
							//var btn = buttonNodes.snapshotItem(0);
							var pctText = _pctComplete + '%';
							var newNode = _jobMasteryHTML.cloneNode(true);
							newNode.innerHTML = newNode.innerHTML.replace(pctReplacement, pctText);
							
							
							// change the status bar color if needed
							if(_currSBColor == '') {
								if(newNode.innerHTML.indexOf('statusbar_green') > -1) {
									_currSBColor = 'green';
								} else if(newNode.innerHTML.indexOf('statusbar_yellow') > -1) {
									_currSBColor = 'yellow';
								} else {
									_currSBColor = 'red';
								}
							}
							//alert(_currSBColor);
							if(_pctComplete >= 80 ) {								
								newNode.innerHTML = newNode.innerHTML.replace('statusbar_' + _currSBColor, 'statusbar_green');							
							} else if (_pctComplete >= 40) {
								newNode.innerHTML = newNode.innerHTML.replace('statusbar_' + _currSBColor, 'statusbar_yellow');	
															
							}
							
							var sb = xpath("//dd/div/div", newNode);
							sb.snapshotItem(0).style.width=pctText;
							msgBody.snapshotItem(0).insertBefore(newNode, buttonNodes.snapshotItem(0));
							
							
							
							// if the mastery pct is within 2 clicks of 100%
							// go back to the original tab							
							if( ((_percent * 2) + _pctComplete) >= 100 ) {
								var againButton = xpath("//table[@class='messages']/tbody/tr/td[@class='message_body']/div[@class='message_buttons']/a[@class='sexy_button']");
								
								if(againButton.snapshotLength > 0) {
									
									var clickText = againButton.snapshotItem(0).getAttribute('onclick');
									var pos = clickText.indexOf("'); return false");
									
									if(pos > -1) {
										var newClickText = clickText.substring(0,pos) + '&tab=' + _origTab + clickText.substring(pos);
										againButton.snapshotItem(0).setAttribute('onclick', newClickText);
										
										var newHref = againButton.snapshotItem(0) + '&tab=' + _origTab;
										againButton.snapshotItem(0).setAttribute('href', newHref);
									}
								}
							}
						}
					}
					
				}
			} else {
				resetJobPct();
			} 
		}
	}
	
}

function highlightBestJob() {
	var jobRows = xpath("//td[@id='app10979261223_content_row']/table[@class='job_list' and @cellspacing='0']/tbody/tr");
	
	var expValueNodes = xpath("//td[@id='app10979261223_content_row']/table[@class='job_list' and @cellspacing='0']/tbody/tr/td[@class='job_reward']/span[@class='bold_number']");
	
	var maxRatio = 0;
	var jobArray = new Array();
	var cnt = 0;
	
	for(var i=1; i < jobRows.snapshotLength; i++) {
		
		var currRow = jobRows.snapshotItem(i);
		var currExp = expValueNodes.snapshotItem(cnt);
	
	
		var expValue = currExp.innerHTML;
		var cost = currRow.cells[2].firstChild.innerHTML;
		
		if(isNumeric(expValue) && isNumeric(cost)) {
			
			var ratio = parseInt(expValue) / parseInt(cost);
			
			jobArray[cnt] = ratio + "|" + i
			cnt += 1;
		}
	
	}
	
	jobArray.sort( function (a,b) {
		var aValue = parseFloat(a.substring(0,a.indexOf('|')));
		var bValue = parseFloat(b.substring(0,b.indexOf('|')));
		
		var returnValue = -1;
		if( a > b ) {
			returnValue = 1;
		} else if( a == b ) {
			returnValue = 0;
		}
			
		return returnValue;
	});
	
	// sort descending
	jobArray.reverse();
	
	for(var i = 0; i < jobArray.length; i++) {
		var jobItem = jobArray[i];
		
		var jobIndex = parseInt(jobItem.substring(jobItem.indexOf('|') + 1));
		var jobRatio = jobItem.substring(0,jobItem.indexOf('|'));

		if(jobRatio.length > 5)
			jobRatio = jobRatio.substr(0,5);
		
		var el = document.createElement('div');
		el.style.cssFloat ='left';
		el.innerHTML = '( ' + (i + 1)  + ' - ' + jobRatio +  ' )';
		
		jobRows.snapshotItem(jobIndex).cells[4].appendChild(el);
	}
	
	
}

function updateJobTabs(ev) {
	var jobButtons = xpath("//td[@id='app10979261223_content_row']/table[@class='job_list']/tbody/tr/td[@class='job_action']/a[@class='sexy_button']");
	
	_newJobTab = ev.target.selectedIndex + 1;
	
	_origTab = currTabIndex();
	_percent = -1;
	_pctComplete = -1;
	
	for(var i=0; i < jobButtons.snapshotLength; i++) {
		
		var buttonClick = jobButtons.snapshotItem(i).getAttribute('onclick');
		var buttonHref = jobButtons.snapshotItem(i).href;
		
		var tabPos = buttonClick.indexOf('&tab=');		
		var newBC = buttonClick.substring(0,tabPos + 5) + _newJobTab + buttonClick.substring(tabPos + 6);
		jobButtons.snapshotItem(i).setAttribute('onclick', newBC);
		
		tabPos = buttonHref.indexOf('&tab=');
		var newHref = buttonHref.substring(0, tabPos + 5) + _newJobTab + buttonHref.substring(tabPos + 6);
		jobButtons.snapshotItem(i).setAttribute('href', newHref);
			
	}
}

function resetJobPct() {
	_percent = -1;
	_pctComplete = -1;
	_origTab = -1;
	_newJobTab = -1;
	_jobPctHTML = '';	
}

function buildNav() {
	var tabBar0 = xpath("//td[@id='app10979261223_content_row']/ul[@id='app10979261223_jobs_bar0']/li/div[@class='tab_content']/a");
	var tabBar1 = xpath("//td[@id='app10979261223_content_row']/ul[@id='app10979261223_jobs_bar1']/li/div[@class='tab_content']/a");
	
	var newDiv = document.createElement('div');
	
	for(var i=0; i < tabBar0.snapshotLength - 1; i++) {
		var cloneLink = tabBar0.snapshotItem(i).cloneNode(true);
		var inHTML = cloneLink.innerHTML;
		cloneLink.innerHTML = inHTML.substring(0, inHTML.indexOf('<'));
		cloneLink.style.paddingRight = '10px';
		cloneLink.style.borderRight = 'solid 1px';
		if(i>0)
			cloneLink.style.marginLeft = '10px';
		
		
		
		newDiv.appendChild(cloneLink);
	}
	for(var i=1; i < tabBar1.snapshotLength; i++) {
		var cloneLink = tabBar1.snapshotItem(i).cloneNode(true);
		var inHTML = cloneLink.innerHTML;
		cloneLink.innerHTML = inHTML.substring(0, inHTML.indexOf('<'));
		cloneLink.style.paddingRight = '10px';
		cloneLink.style.marginLeft = '10px';
		
		if(i < tabBar1.snapshotLength-1)
			cloneLink.style.borderRight = 'solid 1px';
		
		newDiv.appendChild(cloneLink);
	}
	var content=document.getElementById('app10979261223_content_row');
	content.insertBefore(newDiv, content.firstChild);
}

function buildTabDropDown() {
	
	var tabSel = '<select id="jobTabList"><option value="1">Street Thug</option><option value="2">Associate</option><option value="3">Soldier</option><option value="4">Enforcer</option><option value="5">Hitman</option><option value="6">Capo</option><option value="7">Consigliere</option><option value="8">Underboss</option><option value="9">Boss</option></select>';
	var tabBar0 = xpath("//td[@id='app10979261223_content_row']/ul[@id='app10979261223_jobs_bar0']/li/div[@class='tab_content']/a");
	var tabBar1 = xpath("//td[@id='app10979261223_content_row']/ul[@id='app10979261223_jobs_bar1']/li/div[@class='tab_content']/a");
	
	var tabSelect = document.createElement('select');
	tabSelect.id = 'jobTabList';
	
	for(var i=0; i < tabBar0.snapshotLength - 1; i++) {
		
		var cloneLink = tabBar0.snapshotItem(i).cloneNode(true);
		var inHTML = cloneLink.innerHTML;
		var tabName = inHTML.substring(0, inHTML.indexOf('<'));
		
		var clickHTML = cloneLink.getAttribute('onclick');
		
		var pos = clickHTML.indexOf('&tab=') + 5;
		var tabID = clickHTML.substr(pos, 1);
		
		var item = document.createElement('option');
		item.text = tabName;
		item.value = tabID; 
				
		tabSelect.add(item, null);
	}
	
	for(var i=1; i < tabBar1.snapshotLength; i++) {
		var cloneLink = tabBar1.snapshotItem(i).cloneNode(true);
		var inHTML = cloneLink.innerHTML;
		var tabName = inHTML.substring(0, inHTML.indexOf('<'));
		
		var clickHTML = cloneLink.getAttribute('onclick');
		
		var pos = clickHTML.indexOf('&tab=') + 5;
		var tabID = clickHTML.substr(pos, 1);
		
		var item = document.createElement('option');
		item.text = tabName;
		item.value = tabID; 
				
		tabSelect.add(item, null);
	}
	
	return tabSelect;
	
}

function currTabIndex() {
	var selTab = xpath("//td[@id='app10979261223_content_row']/ul[@id='app10979261223_jobs_bar0' or @id='app10979261223_jobs_bar1']/li[@class='tab_on' or @class='tab_on tab_first']/div[@class='tab_content']/a");
		
	var currTabNdx = -1;
	
	var inHTML = selTab.snapshotItem(0).innerHTML;
	var tabName = inHTML.substring(0, inHTML.indexOf('<'));
	
	switch(tabName.toLowerCase()) {
		case 'street thug':
			currTabNdx = 1;
			break;
		case 'associate':
			currTabNdx = 2;
			break;
		case 'soldier':
			currTabNdx = 3;
			break;
		case 'enforcer':
			currTabNdx = 4;
			break;
		case 'hitman':
			currTabNdx = 5;
			break;
		case 'capo':
			currTabNdx = 6;
			break;
		case 'consigliere':
			currTabNdx = 7;
			break;
		case 'underboss':
			currTabNdx = 8;
			break;
		case 'boss':
			currTabNdx = 9;
			break;
		case 'El Soldado':
			currTabNdx = 1;
			break;
		case 'El Capitan':
			currTabNdx = 2;
			break;
		case 'El Jefe':
			currTabNdx = 3;
			break;
		case 'El Patron':
			currTabNdx = 4;
			break;
		case 'El Padrino':
			currTabNdx = 5;
			break;
	}
	
	return currTabNdx;
}
	




function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}

function updateInfo(ev){
    mainDiv.removeEventListener('DOMNodeInserted', updateInfo, false);    
    if(ev.relatedNode.id && ev.relatedNode.id.search("countdown") == -1 ){ //HACK:avoid calling checkPropertiesPage if update is due to the countdown in page
        safeWrap(checkForJobsPage)();
    }
    mainDiv.addEventListener('DOMNodeInserted', updateInfo, false);
    
}

var mainDiv = document.getElementById('app10979261223_mainDiv');
var mainDivFirstChild = null;
if (mainDiv) 	
	mainDiv.addEventListener('DOMNodeInserted', updateInfo, false);
