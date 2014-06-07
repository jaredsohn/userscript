// ==UserScript==
// @name        SalesForce enhancements
// @description Enhancements for SalesForce.com (instance na5)
// @downloadURL https://userscripts.org/scripts/source/416948.user.js
// @version     3
// @grant       none
// @include     https://na5.salesforce.com/*
// ==/UserScript==

// var caseinfo = document.getElementById('ep');
// var expr = /<td[^>]*>Case without Maintenance<\/td><td[^>]*><div[^>]*>TRUE<\/div><\/td>/;

// if(expr.test(caseinfo.innerHTML))
// {
  // var warning = document.createElement('div');
  // warning.style.backgroundColor = 'red';
  // warning.style.color = 'white';
  // warning.style.fontWeight = 'bold';
  // warning.style.width = 'auto';
  // warning.style.border = '2px solid #000';
  // warning.style.padding = '6px';
  // warning.innerHTML = 'No Maintenance !';
  // caseinfo.insertBefore(warning, caseinfo.firstChild);
// }

// http://simonwillison.net/2006/jan/20/escape/
RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// If function not defined, define it as Firefox do
if(escapeHTML == undefined)
  function escapeHTML(a){a&&a.replace&&(a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"));return a};
if(unescapeHTML == undefined)
  function unescapeHTML(a){a&&a.replace&&(a=a.replace(/\&amp;/g,"&"),a=a.replace(/&lt;/g,"<"),a=a.replace(/&gt;/g,">"));return a}

// sanitizeHTML
var sanitizeHTML = function(node)
{
  var discardTags = {'STYLE': true, 'SCRIPT': true, 'OBJECT': true, 'EMBED': true};
  var keepTagsWithoutAttributes = {'P': true, 'CENTER': true, 'DIV': true, 'PRE': true, 'BR': true,
  'TABLE': true, 'TH': true, 'TR': true, 'TD': true};
  if(node instanceof HTMLElement)
  {
    if(discardTags[node.tagName])
	{
	  var newNode = document.createTextNode('');
	}
    else if(keepTagsWithoutAttributes[node.tagName])
	{
      var newNode = document.createElement(node.tagName);
  	
	  // special case: keep whiteSpace style
  	  if(node.style.whiteSpace)
	  {
	    newNode.style.whiteSpace = node.style.whiteSpace;
	  }
	  // special case: SalesForce CSS class "moz-cite-prefix"
	  else if(node.classList.contains('moz-cite-prefix'))
	  {
	    newNode.style.whiteSpace = 'pre-line';
	  }
	  // special case: set text wrap and default font to PRE element
	  if(node.tagName == 'PRE')
	  {
	    newNode.style.whiteSpace = 'pre-wrap';
		newNode.style.fontFamily = 'inherit';
	  }
	  
	  for (var i = 0; i < node.childNodes.length; i++)
      {
	    newNode.appendChild(sanitizeHTML(node.childNodes[i]));
	  }
	}
	else if(node.childNodes.length == 0)
	{
	  var newNode = document.createTextNode("");
	}
	else if(node.childNodes.length == 1)
	{
	  var newNode = sanitizeHTML(node.childNodes[0]);
	}
	else
	{
	  var newNode = document.createElement('DIV');
	  
	  for (var i = 0; i < node.childNodes.length; i++)
	  {
	    newNode.appendChild(sanitizeHTML(node.childNodes[i]));
	  }
	}
  }
  else
  {
    var newNode = document.createTextNode(node.textContent);
  }
  
  return newNode;
};

var findTableCell = function(parent, text, looseMatch)
{
  if(parent == undefined)
  {
    return undefined;
  }
  else
  {
	if(looseMatch)
	{
	  var textRegEx = RegExp(RegExp.escape(text));
	}
	else
	{
	  var textRegEx = RegExp('^[ \t\n\r]*' + RegExp.escape(text)  + '[ \t\n\r]*$');
	}
    var tds = parent.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++)
    {
      if(textRegEx.test(tds[i].innerHTML))
      {
	    return tds[i];
      }
    }
	return undefined;
  }
};

try
{
// Reload button on home page
var aForm = document.getElementById("actionForm");
if (aForm && document.getElementsByTagName('body').length > 0)
{
  var body = document.getElementsByTagName('body').item(0);
  var newDiv = document.createElement('div');
  newDiv.id = 'myToolbar';
  newDiv.style.position = 'fixed';
  newDiv.style.top = '5px';
  newDiv.style.right = '5px';
  newDiv.style.padding = '0px';
  newDiv.style.overflow = 'hidden';
  newDiv.innerHTML = '<a href="#" style="float: right; text-align: center; height: 32px; width: 32px; border: 2px solid rgba(108, 128, 128, 0.5); background-color: rgba(255, 255, 255, 1.0); font-size: 22px; font-weight: bold; text-decoration: none;" onClick="javascript:window.location.reload();">&#x27F3;</a>';
  body.insertBefore(newDiv, body.children[0]);
}
}
catch(e)
{
alert(e);
}

// Fix links with javascript (move javascript from href to onClick)
(function(){
  var nodes = document.getElementsByTagName('a');
  var i, len = nodes.length;
  for (i = 0; i < len; i++)
  {
    var matchA = /^javascript:([a-zA-Z0-9]+)\((.*)\);?/g.exec(unescape(nodes[i].href))
    if(matchA && matchA.length > 2 && (matchA[1] == 'openPopupFocusEscapePounds' || matchA[1] == 'printWin'))
	{
	  var matchB = /^[']([^']*)[']($|[,])/g.exec(matchA[2]);
	  if(matchB && matchB.length > 1)
        try // catch possible syntax error from Function()
        {
	      nodes[i].onclick = Function(unescape(nodes[i].href) + "; return false;");
		  nodes[i].href = matchB[1];
		} catch(e) {}
	}
  }
})();

// Item (case, email, ...) details
var itemDetails = document.getElementById('ep');
var itemSubjectCell = findTableCell(itemDetails, 'Subject');

// SalesForce Case, set better title
var titleCaseMatch = document.title.match(/^Case[ :]*[0-9]*/g);
if(titleCaseMatch)
{
  var caseNumber = titleCaseMatch.join("");
  if(itemSubjectCell != undefined && caseNumber.length > 0)
  {
    document.title = caseNumber + ". " + itemSubjectCell.nextSibling.textContent;
  }
}

// Email Message, set title
var titleEmailMatch = document.title.match(/Email Message/g);
if(titleEmailMatch && titleEmailMatch.length > 0 && itemSubjectCell != undefined)
{
  if(document.title.match(/In/g))
  {
    document.title = "Email recv.: " + itemSubjectCell.nextSibling.textContent;
  }
  else if(document.title.match(/Out/g))
  {
    document.title = "Email sent: " + itemSubjectCell.nextSibling.textContent;
  }
}

// Email Message, set title
var sendEmailMatch = document.title.match(/Send an Email/g);
if(sendEmailMatch && sendEmailMatch.length > 0)
{
  var select = document.getElementById('p26');
  if(select)
  {
    for(var i = 0; i < select.options.length; i++)
    {
	  if(select.options[i].value.contains("guillaume") && select.options[i].selected)
	  {
	    select.options.remove(i);
		select.style.backgroundColor = 'red';
		break;
	  }
    }
  }
}

// SalesForce Case, Add JIRA link under "Defect/RFE Number"
var issueNumberCell = findTableCell(itemDetails, 'Defect/RFE Number');
if(issueNumberCell != undefined && issueNumberCell.nextSibling != undefined)
{
  var issueNumber = issueNumberCell.nextSibling.textContent.replace(/ /g,'');
  if(issueNumber.length > 1)
    issueNumberCell.innerHTML += '<br /><a href="http://jira.presagis.com/browse/' + issueNumber + '">JIRA issue ' + issueNumber + '</a>';
}

// SalesForce Case, Add JIRA link under "Jira Key"
var issueNumberCell = findTableCell(itemDetails, 'Jira Key');
if(issueNumberCell != undefined && issueNumberCell.nextSibling != undefined)
{
  var issueNumber = issueNumberCell.nextSibling.textContent.replace(/ /g,'');
  if(issueNumber.length > 1)
    issueNumberCell.innerHTML += '<br /><a href="http://jira.presagis.com/browse/' + issueNumber + '">JIRA issue ' + issueNumber + '</a>';
}

// SalesForce Case, Add Assets link under Account name
var accountCell = findTableCell(itemDetails, 'Account Name');
if(accountCell != undefined && accountCell.nextSibling != undefined)
{
  var links = accountCell.nextSibling.getElementsByTagName('a');
  if(links.length > 0)
  {
    var accountName = accountCell.nextSibling.textContent;
	var accountId = links[0].href.split('/').reverse()[0];
	accountCell.innerHTML += '<br /><a href="/02i?rlid=RelatedAssetList&id=' + accountId + '">Assets for ' + accountName + '</a>';
  }

}

// This was finally fixed on SalesForce's side. (actually, not completely)

// Fix message body line, get back missing line breaks
var textBodyCell = findTableCell(itemDetails, 'Text Body');
var htmlCodeEl = document.getElementById('htmlCode');
if(textBodyCell != undefined && htmlCodeEl != undefined)
{
  textBodyCell = textBodyCell.nextSibling;
  var tmp = unescapeHTML(htmlCodeEl.innerHTML);
  var el = document.createElement('div');
  el.innerHTML = tmp;
  textBodyCell.innerHTML = sanitizeHTML(el).innerHTML;
  textBodyCell.style.display = 'block';
  textBodyCell.style.whiteSpace = 'normal';
}


// SalesForce Case, Asset / Maintenance ALERT
var assetCell = undefined;
var nextCell = document.getElementById('Asset_ilecell');
if(nextCell != undefined)
{
  assetCell = nextCell.previousSibling;
}
else
{
  assetCell = findTableCell(itemDetails, 'Asset');
  if(assetCell != undefined)
  {
    nextCell = assetCell.nextSibling;
  }
}

if(assetCell != undefined && nextCell != undefined)
{
  //var goodValue = 'No';
  //var goodValueRegEx = RegExp('^[ \t\n]*' + RegExp.escape(goodValue)  + '[ \t\n]*$');
  var goodValueRegEx = RegExp('^[ \t\n]*[^ \t\n].*[^ \t\n][ \t\n]*$'); // at least a couple of printable characters
  if(! goodValueRegEx.test(nextCell.textContent))
  {
    assetCell.style.backgroundColor = 'red';
    assetCell.style.color = 'white';
    assetCell.style.fontWeight = 'bold';
    nextCell.style.backgroundColor = 'red';
    nextCell.style.color = 'white';
    nextCell.style.fontWeight = 'bold';
  }
}

var alertCell = findTableCell(itemDetails, 'Alert Message', true);
if(alertCell != undefined && alertCell.nextSibling != undefined)
{
  var nextCell = alertCell.nextSibling;
  var notEmptyRegEx = RegExp('^[ \t\n]*[^ \t\n].*[^ \t\n][ \t\n]*$'); // at least a couple of printable characters
  if(notEmptyRegEx.test(nextCell.textContent))
  {
    alertCell.style.backgroundColor = 'red';
    alertCell.style.color = 'white';
    alertCell.style.fontWeight = 'bold';
    nextCell.style.backgroundColor = 'red';
    nextCell.style.color = 'white';
    nextCell.style.fontWeight = 'bold';
  }
}

// // SalesForce Case, AutoHide FTP
// var ftpCell = findTableCell(caseDetails, 'Data From Contact');
// if(ftpCell != undefined)
// {
  // var parentDiv = ftpCell;
  // while (parentDiv.tagName != 'DIV') { parentDiv = parentDiv.parentNode; }
  // twistSection(parentDiv.previousSibling);
// }

var onDOMCreated = function(domPath, DOMCreatedFunction, myDelay, myInitialDelay)
{
  var delay = myDelay | 250;
  var initialDelay = myInitialDelay | 0;
  
  if(initialDelay > 0)
  {
    // call the function later
    window.setTimeout( function() {onDOMCreated(domPath, DOMCreatedFunction, delay);}, initialDelay );
    return;
  }
  
  try
  {
    var exist = eval(domPath);
	if(exist)
	{
	  DOMCreatedFunction();
	}
	else
	{
	  // call the function again later
      window.setTimeout( function() {onDOMCreated(domPath, DOMCreatedFunction);}, delay );
	}
	return true;
  }
  catch(e)
  {
    alert(e);
    console.error("Invalid DOM path '{0}'".format(domPath));
    return false;
  }
};

// Customer Support, LiveAgent

window.onbeforeunload = function (e) {
  if(window.self == window.top && window.liveagent)
  {
    if(liveagent.agent.isRunning() && window.liveagent.agent.getStatus() === true)
      return 'The Live Agent is online. Are you sure want to close this window?';
  }
};

var statusChangeFunction = function()
{
  // assume footer exist
  // assume liveagent.agent exist
  var footer = document.getElementById('serviceDeskFooter');
  if(! liveagent.agent.isRunning())
    footer.style.backgroundColor = 'red';
  else if(! liveagent.agent.getStatus())
    footer.style.backgroundColor = 'orange';
  else
	footer.style.backgroundColor = null;
};

function setupChatRequestFunction()
{
  // We need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  if (Notification.permission !== 'denied')
  {
    Notification.requestPermission(function (permission) {

      // Whatever the user answers, we make sure Chrome stores the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

    });
  }

  var notifyFunction = function(message)
  {
    if(!message)
      message = "Hello world!";
  
    // if the browser does not support notifications
    if (!("Notification" in window))
	{
	  // use a simple alert
      alert(message);
	}
    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted")
	{
      // If it's okay let's create a notification
      var notification = new Notification(message);
    }
  };

  var chatRequestFunction = function()
  {
    notifyFunction("New chat request!");
  };

  liveagent.agent.addEventListener("agentNewChatRequest", chatRequestFunction, true);
	
};

var requestCancelledFunction = function()
{
  // set chat status to away
  if(liveagent)
    liveagent.agent.setStatusAway();
};

function setupChatEnhancementsFunction()
{
  // log each event to the console
  for(event in liveagent.agent.Events)
  {
    var eventKey = event;
    if(typeof eventKey == 'string')
      liveagent.agent.addEventListener(liveagent.agent.Events[eventKey], function(a){ return (function(){window.console.log(a);});}(liveagent.agent.Events[eventKey]), true);
  }
  
  // monitor chat request cancellation (ie timeouts)
  liveagent.agent.addEventListener(liveagent.agent.Events.REQUEST_CANCELED, requestCancelledFunction, true);
  
  // monitor status changes
  liveagent.agent.addEventListener(liveagent.agent.Events.LOGIN_SUCCESS, statusChangeFunction, true);
  liveagent.agent.addEventListener(liveagent.agent.Events.LOGOUT, statusChangeFunction, true);
  liveagent.agent.addEventListener(liveagent.agent.Events.STATUS_CHANGE, statusChangeFunction, true);
  statusChangeFunction();
  
  // start monitoring chat requests
  setupChatRequestFunction();
  
  // Automatic login
  var autoConnectFunction = function()
  {
    // automatically connect live agent
    liveagent.agent.isRunning() || SfdcApp.LiveAgent.Console.Core.INSTANCE.login();
    liveagent.agent.getStatus() || liveagent.agent.setStatusAvailable();
  };
  
  onDOMCreated("window.SfdcApp.LiveAgent.Console.Core.INSTANCE", autoConnectFunction, 250, 500);

};

// Catch notification for CDM initialization (a SFDC developer could do that cleanly), or wait 15 sec, whatever comes first
if(window.self == window.top)
{
  var _defaultLog = window.console.log;
  
  // if timeout comes first, restore window.console.log
  var timeoutID = window.setTimeout( function() {window.console.log = _defaultLog; onDOMCreated("window.liveagent && window.SfdcApp.LiveAgent.Console.Core.INSTANCE && document.getElementById('serviceDeskFooter')", setupChatEnhancementsFunction, 250, 500);}, 15000 );
  
  window.console.log = function(m){
    _defaultLog(m);
    if(m.startsWith('CDM Initialized'))
	{
	  // if log message comes first, cancel timeout
	  window.clearTimeout(timeoutID);
	  onDOMCreated("window.liveagent && window.SfdcApp.LiveAgent.Console.Core.INSTANCE && document.getElementById('serviceDeskFooter')", setupChatEnhancementsFunction, 250, 500);
	}
  };
}

// New Tab view, add a prefedined URL to quickly add a home page
// https://na5.salesforce.com/home/home.jsp