// --------------------------------------------------------------------
// 
// Sneakemail Script
// 
// Written by Russ Black
//
// Last updated June 25, 2008
// 
// To use this script you need to have a sneakemail.com account.
// You can get one for free at http://sneakemail.com/info.pl?sel=quick
// 
// --------------------------------------------------------------------
// 
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.5 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools -> Greasemonkey -> Manage User Scripts,
// select "Sneakemail", and click Uninstall.
//
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name           Sneakemail
// @namespace      http://russblack.com/userscripts/
// @description    Quickly create disposable email addresses
// @include        *
// ==/UserScript==

(function() {

  function xpath(expr, doc) {
    if (!doc) {
      doc = document;
    }
    var iter = document.evaluate(expr, doc, null, XPathResult.ANY_TYPE, null);
    var ret = [];
    var n;
    while (n = iter.iterateNext()) {
      ret.push(n);
    }
    return ret;
  }
  
 
var rulidReg = /value=\s*"(\d+)"\s*>\s*Example Allow\s*<\/option>/i
var addrIdReg = /name\s*=\s*"addrid"\s+value\s*=\s*"(\d+)"/i
var accountidReg = /name\s*=\s*"account_id"\s+value\s*=\s*"(\d+)"/i
var sidReg = /name\s*=\s*"sid"\s+value\s*=\s*"([^"]+)"/i
var addressReg = /\w+@sneakemail.com/i
var alreadyExistsReg = /already exists/i
var loginIncorrectReg = /\bincorrect\b/
var stillEvaluatingReg = /<a href="(\/.*?)">[^<]*still evaluating Sneakemail[^<]*<\/a>/i

var skipPastInsignificantText = " (string-length(normalize-space(translate(.,'"+unescape("%A0")+"+^*:',''))) > 1 and not(ancestor::script) ) "

var containsEmail = " (\
contains(.,'email')\
or contains(.,'e-mail')\
or contains(.,'e mail')\
or contains(.,'E Mail')\
or contains(.,'EMail')\
or contains(.,'EMAIL')\
or contains(.,'E MAIL')\
or contains(.,'E-MAIL')\
or contains(.,'E mail')\
or contains(.,'Email')\
or contains(.,'E-Mail')\
or contains(.,'E-mail')\
) "

var containsConfirm = " (\
contains(.,'confirm')\
or contains(.,'Confirm')\
or contains(.,'CONFIRM')\
or contains(.,'Re-enter')\
or contains(.,'Re-Enter')\
or contains(.,'RE-ENTER')\
or contains(.,'REENTER')\
or contains(.,'reenter')\
or contains(.,'Reenter')\
or contains(.,'Re-type')\
or contains(.,'Re-Type')\
or contains(.,'RE-TYPE')\
or contains(.,'RETYPE')\
or contains(.,'retype')\
or contains(.,'Retype')\
or contains(.,'Again')\
or contains(.,'again')\
or contains(.,'AGAIN')\
or contains(.,'Verify')\
or contains(.,'VERIFY')\
or contains(.,'verify')\
) "

var nodes=xpath("\
//input\
[\
	(not(@type) or @type='text') \
	and (not (contains(@value,'@sneakemail.com'))) \
	and \
	(\
		(preceding::text()["+skipPastInsignificantText+"][1] )\
		["
			+containsEmail+
			" and not "+containsConfirm+
			" and not \
			(\
				not(ancestor::form) \
				and count(//input[not(@type) or @type='text']) = 1 \
				and count(//input[@type='password']) = 1 \
				or \
				count(ancestor::form//input[not(@type) or @type='text']) = 1 \
				and count(ancestor::form//input[@type='password']) = 1 \
			)\
		]\
	)\
]\
")

for(var n in nodes) 
{
	var node = nodes[n]

	var btn = document.createElement('input')
	btn.type="button";
	btn.value="Create Sneakemail"
	btn.title="Right-click to change Sneakemail username"
	btn.newSneakEmailFunc=function () {newSneakEmail(btn)}
	btn.addEventListener('click',btn.newSneakEmailFunc,true)
	btn.addEventListener('contextmenu',function (e) { promptForCredentials();e.preventDefault()},true)
	
	var sneakemailDiv = document.createElement('div')
	sneakemailDiv.insertBefore(btn,null)
	node.parentNode.insertBefore(sneakemailDiv, node.nextSibling)
	
}

function Request(btn)
{
	this.btn = btn
	this.input = btn.parentNode.previousSibling
	var confirmNodes = xpath("following::input[2][(not(@type) or @type='text') and ( preceding::text()["+skipPastInsignificantText+"][1]\
	["+containsEmail+" and "+containsConfirm+" ])]",this.input);

	this.confirm=confirmNodes[0]
}

Request.prototype.restoreButton = function() 
{
	this.btn.value = "Create Sneakemail";
	this.btn.disabled = false;
}

Request.prototype.newAddress = function(address, addrId) 
{
	this.input.value=address
	if (this.confirm && !this.confirm.value)
	{
		this.confirm.value=address
	}
	this.addrId = addrId;
	this.btn.value = "Configure this address";
	this.btn.disabled = false;
	var editPropsURL = 'https://sneakemail.com/auth.pl?sel=addr&sid='+this.sid+'&addrid='+addrId+'&curfldrid=0'
	var editFunc=function() 
	{
		var win = window.open(editPropsURL,'Sneakemail','width=510,height=640,resizable=0,scrollbars=yes,menubar=no,status=yes')
		if (win != null)
		{
			win.focus()
		}
	}
	this.btn.removeEventListener('click',this.btn.newSneakEmailFunc,true)
	this.btn.addEventListener('click',editFunc,true)
}

Request.prototype.error = function(errorText)
{
	alert(errorText)
	this.restoreButton()
}

Request.prototype.create = function()
{
	this.btn.disabled = true;
	this.btn.value = "Please Wait...";
	var request = this;

	
	if (GM_getValue('username',"").length == 0)
	{
		if (!confirm("Press OK if you already have a Sneakemail account.\n\nPressing Cancel will let you register for Sneakemail (it's free) in a new window"))
		{
			var win = window.open("http://sneakemail.com/info.pl?sel=quick",'Sneakemail','width=510,height=640,resizable=0,scrollbars=yes,menubar=no,status=yes')
			if (win != null)
			{
				win.focus()
			}
			request.restoreButton();
			return;
		}
		var val = prompt('What is your Sneakemail username?')
		if (val == undefined) {request.restoreButton();return}
		GM_setValue('username',val)
	}
	if (GM_getValue('password',"").length == 0)
	{
		var val = prompt('What is your Sneakemail password?')
		if (val == undefined) {request.restoreButton();return}
		GM_setValue('password',val)
	}

	if (!this.label) 
	{
		var suggestion = window.location.host;
		suggestion = suggestion.replace(/.*\.(\w+\.\w+)/,'$1')
		
		this.label=prompt("Enter a label for this email",suggestion)
		if (!this.label) 
		{
			request.restoreButton()
			return
		}
	}
	
	var err = "There was an error creating the SneakEmail address";
	
	GM_xmlhttpRequest({method: 'GET',url: 'https://sneakemail.com/?username='+escape(GM_getValue('username',""))+'&password='+escape(GM_getValue('password',""))+'&to_create=Create+Address&save_username=on&save_password=on', onerror: function(){request.error($err)}, onload: function(responseDetails) {
		if (loginIncorrectReg.test(responseDetails.responseText))
		{
			var val = prompt('Sneakemail login information is incorrect.\nWhat is your Sneakemail username?',GM_getValue('username',''))
			if (val == undefined) {request.restoreButton();return}
			GM_setValue('username',val)
			val = prompt('What is your Sneakemail password?', GM_getValue('password',''))
			if (val == undefined) {request.restoreButton();return}
			GM_setValue('password',val)
			request.create()
			return;
		}
	
		// first find the session Id
		var sidExec = sidReg.exec(responseDetails.responseText)
		if (!sidExec)
		{
			request.error("Can't find sneakemail session id")
			return
		}
		request.sid=sidExec[1]

		var handleNewAddrPage = function(responseDetails) {
			var rulid=rulidReg.exec(responseDetails.responseText)
			if (!rulid) {request.error("can't find rul_id");return}
			var accountid=accountidReg.exec(responseDetails.responseText)
			if (!accountid) {request.error("can't find account_id");return}
			var createAddressURL='https://sneakemail.com/auth.pl?label='+request.label+'&phrase_slot=1&rulid='+rulid[1]+'&fldrid=0&notes=&submit=Create+Address&sid='+request.sid+'&behavior=new_addr&account_id='+accountid[1]+'&curfldrid=0'

			GM_xmlhttpRequest({method: 'GET',url: createAddressURL, onerror: function(){request.error($err)}, onload: function(responseDetails) {
				if (alreadyExistsReg.test(responseDetails.responseText)) {
					request.label = null;
					alert('The label already exists in your sneakemail account.  Please choose a different label')
					request.create()
					return;
				}
				var newAddress = addressReg.exec(responseDetails.responseText)
				if (!newAddress) {
					request.error("Can't locate new address");
					return;
				}
				var addrId = addrIdReg.exec(responseDetails.responseText)
				if (!addrId) 
				{
					request.error("Can't locate address id of new address");
					return;
				}
				request.newAddress(newAddress, addrId[1])
			}})
		}

		if (stillEvaluatingReg.test(responseDetails.responseText))
		{
			GM_xmlhttpRequest({method: 'GET',url: "https://sneakemail.com/auth.pl?sel=new_addr&sid="+request.sid, onerror: function(){request.error($err)}, onload: handleNewAddrPage})
		}
		else 
		{
			// we're at the new address page now, handle it.
			handleNewAddrPage(responseDetails)
		}

	}})
}

function newSneakEmail(btn) {
	new Request(btn).create()
}

var stillEvaluatingExec = stillEvaluatingReg.exec(document.documentElement.innerHTML)
if (stillEvaluatingExec != null)
{
	document.location = "https://sneakemail.com"+stillEvaluatingExec[1]
}
else
{
	var notSecureExec = document.location.toString().match("http(://sneakemail.com/.*)")
	if (notSecureExec)
	{
		document.location = "https" + notSecureExec[1];
	}
}

function promptForCredentials()
{
	var val = prompt('What is your Sneakemail username?',GM_getValue('username',''))
	if (val == undefined) return
	GM_setValue('username',val)

	val = prompt('What is your Sneakemail password?', GM_getValue('password',''))
	if (val == undefined) return
	GM_setValue('password',val)
}

function loginToSneakemail()
{
	if (GM_getValue('username',"").length == 0 || GM_getValue('password',"").length == 0 )
	{
		promptForCredentials()
	}
	window.open('https://sneakemail.com/?username='+escape(GM_getValue('username',""))+'&password='+escape(GM_getValue('password',""))+'&to_desktop-find=Login%2FFind&save_username=on&save_password=on',
	  'Sneakemail','width=510,height=640,resizable=0,scrollbars=yes,menubar=no,status=yes')
}

GM_registerMenuCommand("Set Sneakemail Login Info", promptForCredentials)
GM_registerMenuCommand("My Sneakemail Account", loginToSneakemail)

})();
