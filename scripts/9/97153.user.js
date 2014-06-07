// MyNEU Mobile website
// Wylie Conlon and Eric Kelly

// ==UserScript==
// @name           MyNEU Mobile
// @namespace      http://crew.ccs.neu.edu
// @description    Cleans up MyNEU website
// @include        http://myneu.neu.edu/*
// @include        https://myneu.neu.edu/*
// ==/UserScript==

/* XPATH HELPER
   From http://wiki.greasespot.net/Code_snippets */
function $x(p, context) {
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

var content = [];
function showContent() {
	Array.forEach(content, function(el) {
		document.body.appendChild(el);
	});
}

function OpenWinNEU(url) {
	if(navigator.cpChildWindowList == null)	
	myneuWindow = window.open (url,"myneuWindow","resizable,scrollbars,status,");
	setTimeout ("myneuWindow.focus ()", 500);
	navigator.cpChildWindowListnavigator.cpChildWindowList.length = myneuWindow;
}

function loadHandler(event) {
	var url = window.location.pathname;

	/* Useful URLS:
	Login: http://myneu.neu.edu/cp/home/displaylogin
	Content: render.userLayoutRootNode.uP
	Logged out: jsp/misc/timedout2.jsp
	Transition page: http://myneu.neu.edu/cp/home/logout
	*/
	
	if(url.search("render.userLayoutRootNode.uP") != -1) {
	
		/* MAIN MENU */
	
		var everything = $x('//*');
	
		// Headings: //span[@class="uportal-head14-bold"]
		// Content: //span[@class="uportal-text"]
		// Account balances: /html/body/span[52]/table/tbody/tr/td/a/b
		// Tabs: //div[@class="taboff"] | //div[@class="tabon"]
	
		var keep = $x('//span[@class="uportal-text"] | //div[@class="taboff"] | //div[@class="tabon"]');
		keep.forEach(function(el) {
			content.push(el.cloneNode(true));
		});
	
		document.body = document.createElement('body'); // erase all content
                document.body.style.margin = "20px";
		//showContent();
		
		//OpenWinNEU('http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do');		

		links = [];
		urls = {
			//'Accounts': "javascript:OpenWinNEU(\'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do\');",
			'Accounts': "http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp6/HuskyCard/CurrentBalance/secure/retrieve/main.do",
			'Transactions': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://prod-web.neu.edu/webapp/ISF/cardTxns.do',
			'Mail': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/cp/ip/login?sys=google&url=http://mail.google.com/a/husky.neu.edu',
			'Blackboard': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://blackboard.neu.edu',
			'Schedule': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=https://bnr8ssbp.neu.edu/udcprod8/bwskfshd.P_CrseSchdDetl',
			'Log Out': 'http://myneu.neu.edu/cp/ip/login?sys=was&url=http://myneu.neu.edu/up/Logout'
		};
		
		// write new content
		for(var i in urls) {
			links.push(document.createElement('a'));
			links[links.length-1].href = urls[i];
			links[links.length-1].innerHTML = i;
			document.body.appendChild(links[links.length-1]);
			document.body.appendChild(document.createElement('br'));
		}
			
		/*content=[];
		keep = $x('/html/body/span[52]/table/tbody/tr/td/a[1]');
		keep.forEach(function(el) {
			content.push(el.cloneNode(true));
		});
		document.body = document.createElement('body');
                document.body.style.margin = "20px";
		showContent();*/
	} else {		
	
		/* LOGIN FORM
		   USING SCRIPT FROM "MyNEU PROPER LOGIN v0.6" BY brainonfire.net */
	
		var uuid = /document\.cplogin\.uuid\.value="([0-9a-f-]{36})";/.exec(document.getElementsByTagName('head')[0].innerHTML)[1];
		
		var submitTo = document.getElementsByName('cplogin')[0].action;
		var submitTo_safe = submitTo.replace(/"/g, '&quot;');
		
		var properForm =
		'<form action="%FormAction%" method="post"> \
			<label>Username: <input type="text" name="user" value="" /></label><br> \
			<label>Password: <input type="password" name="pass" /></label><br> \
			<input type="hidden" name="uuid" value="%UUID%" /> \
			<button>Login</button> \
		</form>'.replace('%FormAction%', submitTo_safe).replace('%UUID%', uuid);
		
		document.body.innerHTML = properForm;	
	}
}

window.addEventListener('load', loadHandler, false);