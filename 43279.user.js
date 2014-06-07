// ==UserScript==
// @name                WK AE Extentions: Mass Guild Message
// @version				1.1
// @namespace        	http://userscripts.org/scripts/show/43279
// @description        	Enables sending of Private Messages to all / selected members of a guild from Guild page on AstroEmpires.
// @include            	http://*.astroempires.com/guild.aspx*
// ==/UserScript==

function $() {
	if (arguments.length==1) {
		return document.getElementById(arguments[0]);
	}

	var z=[], i=0, el;

	while(el=document.getElementById(arguments[i++])) {
		if (el) {
			z.push(el);
		}
	}
	return z;
}

function $x() {
	var x='',
		node=document,
		type=0,
		fix=true,
		i=0,
		toAr=function(xp) {
			var final=[], next;
			while(next=xp.iterateNext()) {
				final.push(next);
			}
			return final
		},
		cur;
	
	while (cur=arguments[i++]) {
		switch(typeof cur) {
			case "string":x+=(x=='') ? cur : " | " + cur;continue;
			case "number":type=cur;continue;
			case "object":node=cur;continue;
			case "boolean":fix=cur;continue;
		}
	}
	
	if (fix) {
		if (type==6) type=4;
		if (type==7) type=5;
	}
	
	if (!/^\//.test(x)) {
		x="//"+x;
	}
	
	if (node!=document && !/^\./.test(x)) {
		x="."+x;
	}
	
	var temp=document.evaluate(x,node,null,type,null);
	if (fix) {
		switch(type) {
			case 1:return temp.numberValue;
			case 2:return temp.stringValue;
			case 3:return temp.booleanValue;
			case 8:return temp.singleNodeValue;
			case 9:return temp.singleNodeValue;
		}
	}
	return fix ? toAr(temp) : temp;
}

function createEl(elObj, parent) {
	var el;
	
	if (typeof elObj == 'string') {
		el = document.createTextNode(elObj);
	}
	else {
		el = document.createElement(elObj.n);
		if (elObj.a) {
			attributes = elObj.a;
			for (var key in attributes) {
				if (attributes.hasOwnProperty(key)) {
					if (key.charAt(0) == '@') {
						el.setAttribute(key.substring(1), attributes[key]);
					}
					else { 
						el[key] = attributes[key];
					}
				}
			}
		}
		
		if (elObj.evl) {
			el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
		}
		
		if (elObj.c) {
			elObj.c.forEach(function (v, i, a) { createEl(v, el); });
		}
	}
	if (parent) {
		parent.appendChild(el);
	}
	return el;
}

function getServer() {
	var url = window.location.href;
	var match = url.match(/http:\/\/(.*?).astroempires.com/);
	
	console.log(url);
	console.log(match);
	
	return match[1];
}

function getPageArgs() {
	var matches = window.location.search.substr(1).split(/[&=]/);
	var arguments = new Array();
		
	for (i=0; i <= matches.length; i = i + 2) {
		arguments[matches[i]] = matches[i + 1];
	}
	
	return arguments;
}

function init() {
	//var xPathHeader = $x('//table[@id=\'guild_members\']/tbody/tr[2]/td[1]/table/thead/tr', XPathResult.FIRST_ORDERED_NODE_TYPE);
	var xPathHeader = $x('//table[@class=\'layout listing btnlisting tbllisting1 sorttable\']/thead/tr', XPathResult.FIRST_ORDERED_NODE_TYPE);

	if (getPageArgs()['guild'] != null) {
		//var xPathMembers = $x('//table[@id=\'guild_members\']/tbody/tr[2]/td[1]/table/tbody/tr', XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
		var xPathMembers = $x('//table[@class=\'layout listing btnlisting tbllisting1 sorttable\']/tbody/tr', XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	}
	else {
		var xPathMembers = $x('//table[@class=\'layout listing btnlisting tbllisting1 sorttable\']/tbody/tr', XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	}

	var thAll = createEl({n: 'th', c: [
		{n: 'input', a: {'type' : 'checkbox', 'id' : 'chkMemberAll', 'name' : 'chkMemberAll', 'checked' : false},
					 evl: {type : 'click', f: toggleAll, bubble: false}}
	]});
	xPathHeader.appendChild(thAll);
	
	xPathMembers.forEach(function(tr) {
        if (tr.className != 'hilite row_active')
        {
    		var playerID = tr.firstChild.textContent;
    		var td = createEl({n: 'td', c: [
    			{n: 'input', a: {'type' : 'checkbox', 'id' : playerID, 'name' : 'chkMember', 'checked' : false}}
    		]});
    		tr.appendChild(td);
    	}
	})
	
	var messageTable = createEl({n: 'table', a: {'width' : '850px', 'align' : 'center'}, c: [
		{n: 'tbody', a: {}, c: [
			{n: 'tr', a: {}, c: [
				{n: 'th', a: {textContent: 'Guild Message', 'class':'th_header2'}}
			]},
			{n: 'tr', a: {}, c: [
				{n: 'td', a: {'align' : 'center'}, c: [
					{n: 'textarea', a: {'wrap' : 'virtual', 'rows' : 16, 'cols' : 92, 'id' : 'body', 'name' : 'body'}}
				]}
			]},
			{n: 'tr', a: {}, c: [
				{n: 'th', a: {}, c: [
					{n: 'input', a: {'type' : 'button', 'id' : 'startMessageQueue', 'name' : 'startMessageQueue', 'value' : 'Send Guild Message'}, evl: {type : 'click', f : startMessageQueue, bubble: false}}
				]}
			]}
		]}
	]}, document.body);
}

function toggleAll() {
	var xPath = $x('//td/input[@name="chkMember"]');
	xPath.forEach(function(chkMember) {
		if (chkMember.checked) {
			chkMember.checked = false;
		}
		else {
			chkMember.checked = true;
		}
	})
}

function startMessageQueue() {
	var xPathCheckbox = $x('//td/input[@name="chkMember"]', XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	var countCheckbox = xPathCheckbox.length;
	var time = 1000 + Math.floor(Math.random() * 1001);
	
	console.log('Found ' + countCheckbox + ' checkboxes');
		
	if ($('body').value == null || $('body').value == '') {
		alert('Cannot send blank message.');
		return;
	}
	
	xPathCheckbox.forEach(function (checkbox) {
		if (checkbox.checked == true && checkbox.parentNode.parentNode.className != 'hilite') {			
            console.log(checkbox.id);
			window.setTimeout(function() {
				submitMessage(checkbox.id, $('body').value);
			}, time);
		}
	});
	
	alert('Sent messages will turn member\'s row green.\r\n\r\nNot-sent messages will turn member\'s row red.');
}

function submitMessage(currentMember, message) {
	var url = 'http://' + getServer() + '.astroempires.com/messages.aspx?msg=' + currentMember + '&reply=0';
	var urlPrep = 'http://' + getServer() + '.astroempires.com/messages.aspx?msg=' + currentMember;
	var urlProfile = 'http://' + getServer() + '.astroempires.com/profile.aspx?player=' + currentMember;
	var postData = encodeURI('submit=Send&body=' + message);
	var time1 = 1700 + Math.floor(Math.random() * 1701);
	var time2 = time1 + Math.floor(Math.random() * 1501);
			
	GM_xmlhttpRequest({
		method: "GET",
		url: urlProfile,
		onreadystatechange: function(xhr) {
			if (xhr.readyState == "4") {
				//Do nothing: just sending "hit" to the appropriate page before sending message.
			}
		}
	});

	window.setTimeout(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: urlPrep,
			onreadystatechange: function(xhr) {
				if (xhr.readyState == "4") {
					//Do nothing: just sending "hit" to the appropriate page before sending message.
				}
			}
		});
	}, time1);
	
	//Generate appropriate pause before sending message.
	window.setTimeout(function () {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers: {'Content-type' : 'application/x-www-form-urlencoded'},
			data:encodeURI('submit=Send&body=' + message),
			onreadystatechange: function(xhr) {
				if (xhr.readyState == "4") {
					if (xhr.status == 200) {
						$x('//td[text() = ' + currentMember + ']/parent::tr', XPathResult.FIRST_ORDERED_NODE_TYPE).style.backgroundColor = 'green';
					}
					else {
						$x('//td[text() = ' + currentMember + ']/parent::tr', XPathResult.FIRST_ORDERED_NODE_TYPE).style.backgroundColor = 'red';
					}
				}
			}
		});
	}, time2);
}

init();