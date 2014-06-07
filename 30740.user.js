
// Dark Throne & Omega Recruiter Scripts
// version 0.1 - Always in BETA!
// 2006-06-06
//
// 
//
// ==UserScript==
// @name          Dark Throne Beta & Omega Recruiter
// @namespace     http://hamburger.helper.com
// @description   Update Dark Throne Automatically
// @include       http://omega.darkthrone.com/*
// @include       http://www.darkthrone.com/*
// @include       http://www.cool-e-t-shirt.com/*
// @include       http://www.theclickmaster.net/vote.php
// @include       http://www.technogrunge.com/DarkThroneConfig.html
// ==/UserScript==

(

function()
{
// *******************************************************************
// Handle Configuration
// *******************************************************************

		textnodes = document.evaluate( 
		    "//text()", 
		    document, 
		    null, 
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		    null);

		for (var i = 0; i < textnodes.snapshotLength; i++) 
		{ 
		   txt = textnodes.snapshotItem(i).nodeValue; 
		   if (txt.indexOf("Internal Server Error")>0)
		   {
					unsafeWindow.setTimeout("{window.document.location = window.document.location;}",60000);
		   }
		}


	if (window.location.pathname == "/DarkThroneConfig.html")
	{
		window.document.title = "Config!";
		
		function SetPriority(PrioritySet,PriorityName,defaultVal)
		{
			var priority = parseInt(GM_getValue(PriorityName,defaultVal));
			
			PrioritySet[4-priority].checked = 1;
		}

		function GetPriority(PrioritySet,PriorityName)
		{
			for (i = 0; i<=4; i++)
				if (PrioritySet[4-i].checked)
					GM_setValue(PriorityName,i);
		}

		function SetJump(JumpSet,JumpName,defaultVal)
		{
			var jump = parseInt(GM_getValue(JumpName,defaultVal));
			
			JumpSet[jump].checked = 1;
		}

		function GetJump(JumpSet,JumpName)
		{
			for (i = 0; i<=2; i++)
			{
				if (JumpSet[i].checked)
				{
					GM_setValue(JumpName,i);
				}
			}
		}

		BetaOffensePriorities = document.getElementsByName('BetaOffense');
		BetaDefensePriorities = document.getElementsByName('BetaDefense');
		BetaSpyPriorities = document.getElementsByName('BetaSpyOffense');
		BetaSentryPriorities = document.getElementsByName('BetaSentryDefense');
		BetaReserve = document.getElementById('BetaCashReserve');
		BetaAutoBank = document.getElementById('BetaAutoBank');
		BetaDeposits = document.getElementById('BetaReservedDeposits');
		BetaArmoryJump = document.getElementsByName('BetaArmoryJump');
		BetaUpgradeJump = document.getElementsByName('BetaUpgradeJump');
		BetaBankJump = document.getElementsByName('BetaBankJump');
		
		
		OmegaOffensePriorities = document.getElementsByName('OmegaOffense');
		OmegaDefensePriorities = document.getElementsByName('OmegaDefense');
		OmegaSpyPriorities = document.getElementsByName('OmegaSpyOffense');
		OmegaSentryPriorities = document.getElementsByName('OmegaSentryDefense');
		OmegaReserve = document.getElementById('OmegaCashReserve');
		OmegaAutoBank = document.getElementById('OmegaAutoBank');
		OmegaDeposits = document.getElementById('OmegaReservedDeposits');
		OmegaArmoryJump = document.getElementsByName('OmegaArmoryJump');
		OmegaUpgradeJump = document.getElementsByName('OmegaUpgradeJump');
		OmegaBankJump = document.getElementsByName('OmegaBankJump');
		OmegaValidationKey = document.getElementById('OmegaValidationKey');
		OmegaValidationUrl = document.getElementById('OmegaValidationUrl');

		SetPriority(BetaDefensePriorities,'BetaDefensePriority',4);
		SetPriority(BetaOffensePriorities,'BetaOffensePriority',3);
		SetPriority(BetaSentryPriorities, 'BetaSentryPriority',2);
		SetPriority(BetaSpyPriorities, 'BetaSpyPriority',1);
		SetJump(BetaArmoryJump, 'BetaArmoryJump',0);
		SetJump(BetaUpgradeJump, 'BetaUpgradeJump',0);
		SetJump(BetaBankJump, 'BetaBankJump',0);
		
		BetaReserve.value = GM_getValue('BetaReserve',0);
		BetaAutoBank.checked = parseInt(GM_getValue('BetaAutoBank',0));
		BetaDeposits.value = parseInt(GM_getValue('BetaReservedDeposits',0));
		
		BetaSave = document.getElementById('BetaSave');
		BetaSave.addEventListener('click', 
			function(event) 
			{
				GetPriority(BetaDefensePriorities,'BetaDefensePriority');
				GetPriority(BetaOffensePriorities,'BetaOffensePriority');
				GetPriority(BetaSentryPriorities, 'BetaSentryPriority');
				GetPriority(BetaSpyPriorities, 'BetaSpyPriority');
				GetJump(BetaArmoryJump, 'BetaArmoryJump');
				GetJump(BetaUpgradeJump, 'BetaUpgradeJump');
				GetJump(BetaBankJump, 'BetaBankJump');
				
				GM_setValue('BetaReserve',BetaReserve.value);
				GM_setValue('BetaReservedDeposits',BetaDeposits.value);
				if (BetaAutoBank.checked)
					GM_setValue('BetaAutoBank',1);
				else
					GM_setValue('BetaAutoBank',0);

				alert('Beta Config Saved');
			}, true); 
		
		
		SetPriority(OmegaDefensePriorities,'OmegaDefensePriority',4);
		SetPriority(OmegaOffensePriorities,'OmegaOffensePriority',3);
		SetPriority(OmegaSentryPriorities, 'OmegaSentryPriority',2);
		SetPriority(OmegaSpyPriorities, 'OmegaSpyPriority',1);
		SetJump(OmegaArmoryJump, 'OmegaArmoryJump',0);
		SetJump(OmegaUpgradeJump, 'OmegaUpgradeJump',0);
		SetJump(OmegaBankJump, 'OmegaBankJump',0);
		
		OmegaReserve.value = GM_getValue('OmegaReserve',0);
		OmegaAutoBank.checked = parseInt(GM_getValue('OmegaAutoBank',0));
		OmegaDeposits.value = parseInt(GM_getValue('OmegaReservedDeposits',0));
		OmegaValidationKey.value = GM_getValue('OmegaValidationKey','None');
		OmegaValidationUrl.value = GM_getValue('OmegaValidationUrl','http://127.0.0.1:13000');

		OmegaSave = document.getElementById('OmegaSave');
		OmegaSave.addEventListener('click', 
			function(event) 
			{
				GetPriority(OmegaDefensePriorities,'OmegaDefensePriority');
				GetPriority(OmegaOffensePriorities,'OmegaOffensePriority');
				GetPriority(OmegaSentryPriorities, 'OmegaSentryPriority');
				GetPriority(OmegaSpyPriorities, 'OmegaSpyPriority');
				GetJump(OmegaArmoryJump, 'OmegaArmoryJump');
				GetJump(OmegaUpgradeJump, 'OmegaUpgradeJump');
				GetJump(OmegaBankJump, 'OmegaBankJump');
				
				GM_setValue('OmegaReserve',OmegaReserve.value);
				GM_setValue('OmegaReservedDeposits',OmegaDeposits.value);
		 		GM_setValue('OmegaValidationKey',OmegaValidationKey.value);
		 		GM_setValue('OmegaValidationUrl',OmegaValidationUrl.value);

				if (OmegaAutoBank.checked)
					GM_setValue('OmegaAutoBank',1);
				else
					GM_setValue('OmegaAutoBank',0);

				alert('Omega Config Saved');
			}, true); 
		
		
		
	}


	function topMessage(s)
	{
		a = document.getElementsByTagName('A');
		for (i=0; i<a.length; i++)
			if (a[i].href.indexOf("news.dt")>=0)
			{
				if (a[i].childNodes[0].nodeValue != null)
				{
					a[i].href = null;
					a[i].childNodes[0].nodeValue = s;
				}
			} 
	}
	
// *******************************************************************
// Check for Omega Validation Mode
// *******************************************************************

	validating = false;

	if (window.location.host == "omega.darkthrone.com")
	{
		inputs = document.getElementsByTagName("INPUT");
		
		for (i = 0; i<inputs.length; i++)
			if (inputs[i].name.indexOf("random_image_verification")>=0)
				validating = true;

		if (validating)
		{
			document.title = "Validating";

	    btn = document.createElement("Button")
			theText=document.createTextNode("Validate");
			btn.appendChild(theText);
	
			foo = document.getElementsByTagName("IMG");
			var img;
			for (a=0; a<foo.length; a++)
			{
				if (foo[a].src.match("headers") != null)
					img = foo[a];
			} 
	
			if (img != null)
			{
				img.parentNode.parentNode.appendChild(btn);
				btn.addEventListener('click', 
					function(event) 
					{
							vimage = null;
							foo = document.getElementsByTagName("INPUT");
							for (a = 0; a<foo.length; a++)
								if (foo[a].src.match("recruitimages"))
									vimage = foo[a];
									
							hid_id = document.getElementsByName("random_image_verification_id")[0].value;
							image_url = vimage.src;

							GM_xmlhttpRequest({
			    			method: 'POST',
			    			url: GM_getValue('OmegaValidationUrl','http://127.0.0.1:13000'),
			   				headers: {
			      			'Accept': 'application/atom+xml,application/xml,text/xml',
									'Content-Type':'application/x-www-form-urlencoded'
			    			},
			    			data: 'url='+image_url+"&"+'id='+hid_id+'&key='+GM_getValue('OmegaValidationKey','None'),
			    	
			    			onload: function(responseDetails) {
									x = responseDetails.responseText.split(',')[0]
									y = responseDetails.responseText.split(',')[1]
									
									var newdiv = document.createElement('div');
									newdiv.innerHTML = 
										'<form method="post">' +
											'<input type="hidden" name="random_image_verification_id" value="'+hid_id+'">'+
											'<input type="hidden" name="random_image_verification.x" value="'+x+'">'+
											'<input type="hidden" name="random_image_verification.y" value="'+y+'">' +
										'</form>';
									document.childNodes[0].appendChild(newdiv);
									newdiv.childNodes[0].submit();
								}
							});

					}, true);

					btn.click(); 
			}

			}
	}
	
// *******************************************************************
// Remove Side Ads
// *******************************************************************

	if (window.location.host.indexOf('darkthrone')>0)
	{
		var foo = window.document.getElementsByTagName('TD');
		var c = 0;
       
    while (c<foo.length)
    {
			if (foo[c].innerHTML.indexOf('frameadvertisement')>0)
			{
				foo[c].parentNode.removeChild(foo[c]);
				c = foo.length // quit
			}
					
			c++;
    }
    
    
		foo = window.document.getElementsByTagName('Table');
		c = 0;
       
    while (c<foo.length)
    {
			if (foo[c].width == 480)
				if (foo[c].innerHTML.indexOf('frameotheradvertis')>0)
				{
					foo[c].parentNode.removeChild(foo[c]);
					c = foo.length // quit
				}
			c++;
		}    
	}
          
// *******************************************************************
// Add "Attack" Button
// *******************************************************************

	if (window.location.host.indexOf('darkthrone')>0)
	{
		images = document.evaluate("//Img[contains(@src,'headers')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (images.snapshotLength == 1)
		{
			img = images.snapshotItem(0);
		
      prep_btn = document.createElement("Button")
			prep_btn.appendChild(document.createTextNode("Prep All"));

			img.parentNode.parentNode.appendChild(prep_btn);
			prep_btn.addEventListener('click', 
				function(event) 
				{
					if (window.location.host.indexOf("Omega")>=0) 
						GM_setValue('Omega_prep','Prep');
					else
						GM_setValue('Beta_prep','Prep');
				}, true); 

      attack_btn = document.createElement("Button")
			attack_btn.appendChild(document.createTextNode("Attack!!!"));

			img.parentNode.parentNode.appendChild(attack_btn);
			attack_btn.addEventListener('click', 
				function(event) 
				{			
					if (window.location.host.indexOf("Omega")>=0) 
						GM_setValue('Omega_attack','Attack');
					else
						GM_setValue('Beta_attack','Attack');
				}, true); 
		}
	}	

// *******************************************************************
// Unofficial Dark Throne Omega Recruiter
// uses omega_response
// *******************************************************************
	if (window.location.host == "www.cool-e-t-shirt.com")
	{
		GM_setValue('omega_response','');
		
		
		unsafeWindow.test_omega_response = function()
		{
			var resp = GM_getValue('omega_response','');
			
			if (resp != '')
			{
				var test = window.document.getElementsByTagName("input")
				
				if (test.length > 4)
				{
					test[3].value = resp;

					if (resp == "Skip")
					{
						window.document.title = "Skipped";
						test[5].click();
					}
				else
					test[4].click();
				}
				GM_setValue('omega_response','');
			}
			
			unsafeWindow.setTimeout("test_omega_response()",1000);
		}

		unsafeWindow.setTimeout("test_omega_response()",1000);
	}
	
// *******************************************************************
// Unofficial Dark Throne Beta Recruiter
// uses dtbeta_response
// *******************************************************************
	if (window.location.host == "www.theclickmaster.net")
	{
		GM_setValue('dtbeta_response','');
		window.document.getElementsByTagName("input")[1].checked = true
		
		
		unsafeWindow.testresponse = function()
		{
			var resp = GM_getValue('dtbeta_response','');
			GM_setValue('dtbeta_response','');
			window.document.title = "Resp = "+resp;
			
			if (resp != '')
			{
				var test = window.document.getElementsByTagName("input")
				
				if (test.length > 4)
				{
					test[0].value = resp;
					
					if (resp == "Skip")
					{
						window.document.title = "Skipped";
						test[10].click();
					}
					else
					{
						window.document.title = "Entered";
						test[9].click();
					}
				}
			}
			
			unsafeWindow.setTimeout("testresponse()",1000);
		}

		unsafeWindow.setTimeout("testresponse()",1000);
	}
	
// *******************************************************************
// Omega's recruit Screen
// uses omega_response
// *******************************************************************
	if ((window.location.host == "omega.darkthrone.com") && 
		(window.location.pathname == "/recruit.dt"))
	{ 
		var stuff = document.getElementsByTagName('TD');
		
		for (count = 0; count < stuff.length; count++)
		{
			if (stuff[count].innerHTML == "Error")
			{
				document.title = "Skipped";
				window.setTimeout(function() { GM_setValue('omega_response','Skip') }, 5000);
				return;
			}
		}
		 
	
		var headers = document.getElementsByTagName('H4');
	
		if (headers.length == 1)
		{
			document.title = headers[0].innerHTML;
			GM_setValue('omega_response',headers[0].innerHTML);
		}
	}

// *******************************************************************
// Beta recruit Screen
// uses dtbeta_response
// *******************************************************************
	if ((window.location.host == "www.darkthrone.com") && 
			(window.location.pathname == "/recruit.dt"))
	{ 
		var stuff = document.getElementsByTagName('TD');
		
		for (count = 0; count < stuff.length; count++)
		{
			if (stuff[count].innerHTML == "Error")
			{
				document.title = "Skipped";
				window.setTimeout(function() { GM_setValue('dtbeta_response','Skip') }, 5000);
				return;
			}
		}
		 
	
		var headers = document.getElementsByTagName('H4');
	
		if (headers.length == 1)
		{
			document.title = headers[0].innerHTML;
			GM_setValue('dtbeta_response',headers[0].innerHTML);
		}
	}
	
// ******************************************************************* 
// Beta recruiter Loop 
// ******************************************************************* 

   if ((window.location.host == "www.darkthrone.com") && 
       ((window.location.pathname == "/recruiter/recruitloop.dt") ||
				(window.location.pathname == "/recruiter/index.dt")
				))
   { 
      window.setTimeout(function() 
      { 
         window.document.title = 'DT Bang!'; 
					var test = document.getElementById("nextimg");
					if (test != null)
						test.click();
					else
					{
						Buttons = document.evaluate("//IMG[@alt = 'Start Recruiting']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						if (Buttons.snapshotLength == 1)
						{
			         window.document.title = 'Start Recruiting!'; 
							window.location = Buttons.snapshotItem(0).parentNode;
						}
						else
						{
							Links = document.evaluate("//a[text()= 'here']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
							if (Links.snapshotLength == 1)
								window.location = Links.snapshotItem(0).href;
						}
					}
      } 
       
      , 3000); 
       
      window.document.title = 'DT Start'; 
   } 

// ******************************************************************* 
// Omega recruiter Loop 
// ******************************************************************* 

   if ((window.location.host == "omega.darkthrone.com") && 
      ((window.location.pathname == "/recruiterloop.dt")  ||
       (window.location.pathname == "/recruitermain.dt")
      )) 
   { 
      window.setTimeout(function() 
      { 
         window.document.title = 'Omega Bang!'; 
				 var test = document.getElementById("recruiter_nextimg");
				 if (test != null)
					 test.click();
					else
					{
						Buttons = document.evaluate("//IMG[@alt = 'Start Recruiting']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						if (Buttons.snapshotLength == 1)
							window.location = Buttons.snapshotItem(0).parentNode;
						else
						{						
							Links = document.evaluate("//a[text()= 'here']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
							if (Links.snapshotLength == 1)
								window.location = Links.snapshotItem(0).href;
						}
					}
      } 
       
      , 3000); 
       
      window.document.title = 'Omega Start'; 
   } 

// ******************************************************************* 
// Beta Bank 
// ******************************************************************* 

	if ((window.location.host == "www.darkthrone.com") && 
		(window.location.pathname == "/bank.dt") && 
		(!validating) && 
		(parseInt(GM_getValue('BetaAutoBank',0))==1)) 
	{ 
		textnodes = document.evaluate( 
		    "//text()", 
		    document, 
		    null, 
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		    null);
		    
		depositBox = document.evaluate("//input[@name = 'deposit']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    gold = 0;
    depositsRemaining = 0;
    
    if (depositBox.snapshotLength == 1)
    	gold = parseInt(depositBox.snapshotItem(0).value)
    
     
		for (var i = 0; i < textnodes.snapshotLength; i++) 
		{ 
		   txt = textnodes.snapshotItem(i).nodeValue; 
		   if (txt.indexOf("deposits remaining.")>0)
		   {
		   		depositsRemaining = parseInt(txt.substr(txt.indexOf("have ")+5,3));
		   }
		}
    
		unsafeWindow.autoDeposit = 	(gold >= parseInt(GM_getValue('BetaReserve',0))) && 
																(depositsRemaining > parseInt(GM_getValue('BetaReservedDeposits',0))) &&
																(parseInt(GM_getValue('BetaAutoBank',0))==1);

		unsafeWindow.autoJump = 		(depositsRemaining <= parseInt(GM_getValue('BetaReservedDeposits',0))) &&
																(parseInt(GM_getValue('BetaAutoBank',0))==1);
																
		if (unsafeWindow.autoJump)
			unsafeWindow.autoJump = parseInt(GM_getValue('BetaBankJump',0));
		else
			unsafeWindow.autoJump = 0;

		unsafeWindow.secs_till_refresh = 300; // 5 minutes 

		unsafeWindow.Timer =   
		function() 
		{ 
			unsafeWindow.secs_till_refresh --; 
			if (unsafeWindow.secs_till_refresh) 
			{ 
				minutes = Math.floor(unsafeWindow.secs_till_refresh / 60); 
				secs = "0"+(unsafeWindow.secs_till_refresh - (minutes * 60)); 
				secs = secs.substr(secs.length -2,2);
				if (unsafeWindow.autoDeposit) 
					document.title = "Auto Deposit in "+minutes+":"+secs; 
				else
				{
					switch (unsafeWindow.autoJump)
					{
						case (1):	document.title = "Jump to Armory in "+minutes+":"+secs; break;
						case (2):	document.title = "Jump to Battle Upgrade in "+minutes+":"+secs; break;
						default:	document.title = "Auto Refresh in "+minutes+":"+secs; 
					}
				}
				unsafeWindow.setTimeout("Timer()",1000); 
			} 
			else
			{
				if (unsafeWindow.autoDeposit)
				{
					for (count = 0; count < document.forms.length; count++) 
					{ 
						if (document.forms[count].action.indexOf('bank.dt')>=0) 
						{ 
							for (count1=0; count1 < document.forms[count].elements.length; count1++) 
							{ 
								if ((document.forms[count].elements[count1].name == 'action') && 
										(document.forms[count].elements[count1].value == 'deposit')) 
								{ 
									document.forms[count].submit(); 
								} 
							} 
						} 
					}
				}
				else
				{
					switch (unsafeWindow.autoJump)
					{
						case 1: window.document.location = "http://www.darkthrone.com/armory.dt?session="; break;
						case 2: window.document.location = "http://www.darkthrone.com/battleupgrades.dt?session="; break;
						default:window.document.location = window.document.location;
					}
				}
			} 
		} 
        
    unsafeWindow.setTimeout("Timer()",1000); 
 
    window.document.title = 'DT BANK'; 
	} 
	
// ******************************************************************* 
// Omega Bank 
// ******************************************************************* 

	if ((window.location.host == "omega.darkthrone.com") && 
		(window.location.pathname == "/bank.dt") && 
		(!validating)) 
	{ 
		function decomma(s)	
		{
			g1 = "";
			ss = s.split(',');
			for (var si=0; si<ss.length; si++)
							g1 = g1 + ss[si];
							
			return (g1);
		}

		
		textnodes = document.evaluate( 
		    "//text()", 
		    document, 
		    null, 
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		    null);
		    
		depositBox = document.evaluate("//input[@name = 'deposit']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    gold = 0;
    depositsRemaining = 0;
    
    if (depositBox.snapshotLength == 1)
    	gold = parseInt(decomma(depositBox.snapshotItem(0).value));
    
     
		for (var i = 0; i < textnodes.snapshotLength; i++) 
		{ 
		   txt = textnodes.snapshotItem(i).nodeValue; 
		   if (txt.indexOf("deposits remaining.")>0)
		   {
		   		depositsRemaining = parseInt(txt.substr(txt.indexOf("have ")+5,3));
		   }
		}
    
		unsafeWindow.autoDeposit = 	(gold >= parseInt(GM_getValue('OmegaReserve',0))) && 
																(depositsRemaining > parseInt(GM_getValue('OmegaReservedDeposits',0))) &&
																(parseInt(GM_getValue('OmegaAutoBank',0))==1);
     
		unsafeWindow.autoJump = 		(depositsRemaining <= parseInt(GM_getValue('OmegaReservedDeposits',0))) &&
																(parseInt(GM_getValue('OmegaAutoBank',0))==1);
																
		if (unsafeWindow.autoJump)
			unsafeWindow.autoJump = parseInt(GM_getValue('OmegaBankJump',0));
		else
			unsafeWindow.autoJump = 0;

		unsafeWindow.secs_till_refresh = 300; // 5 minutes 

		unsafeWindow.Timer =   
		function() 
		{ 
			unsafeWindow.secs_till_refresh --; 
			if (unsafeWindow.secs_till_refresh) 
			{ 
				minutes = Math.floor(unsafeWindow.secs_till_refresh / 60); 
				secs = "0"+(unsafeWindow.secs_till_refresh - (minutes * 60)); 
				secs = secs.substr(secs.length -2,2);
				if (unsafeWindow.autoDeposit) 
					document.title = "Auto Deposit in "+minutes+":"+secs; 
				else
					document.title = "Auto Refresh in "+minutes+":"+secs; 
				unsafeWindow.setTimeout("Timer()",1000); 
			} 
			else
			{
				if (unsafeWindow.autoDeposit)
				{
					for (count = 0; count < document.forms.length; count++) 
					{ 
						if (document.forms[count].action.indexOf('bank.dt')>=0) 
						{ 
							for (count1=0; count1 < document.forms[count].elements.length; count1++) 
							{ 
								if ((document.forms[count].elements[count1].name == 'action') && 
										(document.forms[count].elements[count1].value == 'deposit')) 
								{ 
									document.forms[count].submit(); 
								} 
							} 
						} 
					}
				}
				else
				{
					switch (unsafeWindow.autoJump)
					{
						case 1: window.document.location = "http://omega.darkthrone.com/armory.dt?session="; break;
						case 2: window.document.location = "http://omega.darkthrone.com/battleupgrades.dt?session="; break;
						default:window.document.location = window.document.location;
					}
				} 
			} 
		} 
        
    unsafeWindow.setTimeout("Timer()",1000); 
 
    window.document.title = 'DT BANK'; 
	} 


// *******************************************************************
//
// Attack user screens --  Sort by Gold
//
// *******************************************************************

// 3 = Army Size (Ascending)
// 2 = Gold (Descending)
// 0 = Rank (Ascending)
	function SortAttackScreens()
	{
		var mode = parseInt(GM_getValue('AttackSort','3'));

		function decomma(s)	
		{
			g1 = "";
			ss = s.split(',');
			for (var si=0; si<ss.length; si++)
							g1 = g1 + ss[si];
							
			return (g1);
		}
		
		function compare(a, b) 
		{
			var nv1 = a.getElementsByTagName('TD');
			var nv2 = b.getElementsByTagName('TD');
					
			av = parseInt(decomma(nv1[mode].childNodes[0].nodeValue)); 
			bv = parseInt(decomma(nv2[mode].childNodes[0].nodeValue));

			if (mode == 2) // Swap so ascending is descending
			{
				cv = av;
				av = bv;
				bv = cv;
			}
					
			if (av < bv)
				return -1;
				
			if (bv > av)
				return 1;
				
			return 0;						
		}

		// Find the largest table and assign it to Madre
		var foo = document.getElementsByTagName("TBody")
		var madre = foo[0];
		for (var a=0; a<foo.length; a++)
		{
			if (foo[a].childNodes.length > madre.childNodes.length)
				madre = foo[a];
		}

// Put clones of rows in an array		
		var ar = new Array();
		{
			for (a = 2; a<(madre.childNodes.length - 2); a++)
			{
				var n1 = madre.childNodes[a];
				if ((n1.nodeName == "TR") && (n1.childNodes.length == 13))
					ar.push(n1.cloneNode(true));
			}			
		}
		
// Sort by army strength		
		ar.sort(compare);				

// Replace rows with sorted clones		
		var i = 0;
		for (a = 2; a<(madre.childNodes.length - 2); a++)
		{
			var n1 = madre.childNodes[a];
			if ((n1.nodeName == "TR") && (n1.childNodes.length == 13))
			{
					madre.replaceChild(ar[i++],n1);
			}
		}			
	}

	if (	(window.location.pathname == "/userlist.dt")
	 		&&	(!validating))
	{
		// Find the largest table and assign it to Madre
		var foo = document.getElementsByTagName("TBody")
		var madre = foo[0];
		for (var a=0; a<foo.length; a++)
		{
			if (foo[a].childNodes.length > madre.childNodes.length)
				madre = foo[a];
		}
		
		var row = madre.firstChild;
		
		rank = row.childNodes[1];
		gold = row.childNodes[5];
		armysize = row.childNodes[7];


    rank.innerHTML = '<u style="cursor: pointer;">Rank</u>'; 
    gold.innerHTML = '<u style="cursor: pointer;">Gold</u>'; 
    armysize.innerHTML = '<u style="cursor: pointer;">Army Size</u>'; 

		rank.addEventListener('click', 
			function(event) 
			{
						GM_setValue('AttackSort','0')
						SortAttackScreens();
			}, 
		true); 

		gold.addEventListener('click', 
			function(event) 
			{
						GM_setValue('AttackSort','2')
						SortAttackScreens();
			}, 
		true); 

		armysize.addEventListener('click', 
			function(event) 
			{
						GM_setValue('AttackSort','3')
						SortAttackScreens();
			}, 
		true); 

		SortAttackScreens();

	}

// *******************************************************************
// Simplify Attack Window for a quick Win/Loss title
// *******************************************************************
	if ((window.location.pathname == "/attacklog.dt")
	 		&&	(!validating))
	{
		var f=document.getElementsByTagName("B");
		
		for (var a=0; a<f.length; a++)
		{
			if (f[a].innerHTML.indexOf("You have defeated")>=0)
			{
				window.document.title = 'WIN!';
			}
			if (f[a].innerHTML.indexOf("has defeated you!")>=0)
			{
				window.document.title = 'Loss!';
			}
			
		}
	}


// *******************************************************************
// Auto Attack!
// *******************************************************************
	if ((window.location.pathname == "/attack.dt")
	 		&&	(!validating))
	{
		if (window.location.host.indexOf("Omega")>=0)
			GM_setValue('Omega_attack','');
		else
			GM_setValue('Beta_attack','');
			
		window.document.title = 'Attack!!!';

		unsafeWindow.test_attack_response = function()
		{
			var resp;
			
			if (window.location.host.indexOf("Omega")>=0) 
				resp = GM_getValue('Omega_attack','');
			else
				resp = GM_getValue('Beta_attack','');
			
			if (resp != '')
			{
				var test = window.document.getElementsByTagName("input")
				
				if (test.length > 4)
				{
					test[3].value = "10";
					test[4].click();
				}
			}
			else
				unsafeWindow.setTimeout("test_attack_response()",500);
		}

		unsafeWindow.setTimeout("test_attack_response()",500);
	}

// *******************************************************************
// Prep Attack
// *******************************************************************
	if ((window.location.pathname == "/viewprofile.dt")
	 		&&	(!validating))
	{
		if (window.location.host.indexOf("Omega")>=0)
			GM_setValue('Omega_prep','');
		else
			GM_setValue('Beta_prep','');


		// Skip if they are an ally			
		Links = document.evaluate("//a[contains(@href,'alliances.dt')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		isAlly = false;
		
		for (i=0; i<Links.snapshotLength; i++)
		{
			if (Links.snapshotItem(i).href.indexOf('=invite&')<0)
				isAlly = true;
			
		}
		if (isAlly)
		{
			window.document.title = 'Ally!';

			unsafeWindow.test_attack_response = function()
			{
				var resp;
				
				if (window.location.host.indexOf("Omega")>=0) 
					resp = GM_getValue('Omega_prep','');
				else
					resp = GM_getValue('Beta_prep','');
				
				if (resp != '')
				{
					window.document.title = 'Close!';
					window.open('','_parent','');
					window.close();
				}
				else
					unsafeWindow.setTimeout("test_attack_response()",500);
			}
			
			unsafeWindow.setTimeout("test_attack_response()",500);

		}
		else
		{
			window.document.title = 'Target';
	
			unsafeWindow.test_attack_response = function()
			{
				var resp;
				
				if (window.location.host.indexOf("Omega")>=0) 
					resp = GM_getValue('Omega_prep','');
				else
					resp = GM_getValue('Beta_prep','');
				
				if (resp != '')
				{
					Links = document.evaluate("//a[text() = 'Attack This Player']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
					if (Links.snapshotLength == 1)
							window.location = Links.snapshotItem(0).href;
				}
				else
					unsafeWindow.setTimeout("test_attack_response()",500);
			}
	
			unsafeWindow.setTimeout("test_attack_response()",500);
		}
	}

// *******************************************************************
// More info in Armory
// *******************************************************************
	if ((window.location.pathname == "/armory.dt")
	 		&&	(!validating))
	{
//			unsafeWindow = new Object();

		function decomma(s)	
		{
			g1 = "";
			ss = s.split(',');
			for (var si=0; si<ss.length; si++)
							g1 = g1 + ss[si];
							
			return (g1);
		}
		
		function isLast(o)
		{
			r = o.parentNode.parentNode;
			if (window.location.host == "www.darkthrone.com")
				return(r.parentNode.childNodes[r.parentNode.childNodes.length-2] == r);
			else
			// Omega	
				return ((r.nextSibling.nextSibling == null) || (r.nextSibling.nextSibling.childNodes.length < 10))
		}
		
		function compare(a, b) 
		{
			if (a == null)
				if (b == null)
					return 0;
				else
					return -1;
					
			if (b == null)
				return 1;
				
			av = parseInt(decomma(a.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue));		
			bv = parseInt(decomma(b.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue));		

			if (av < bv)
				return -1;
				
			if (bv > av)
				return 1;
				
			return 0;						
		}

		gold = 0;
		defense = 0;
		offense = 0;
		spies = 0;
		antispies = 0;
		
		
		var table;
		
		textnodes = document.evaluate(
		    "//text()",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		
		
		for (var i = 0; i < textnodes.snapshotLength; i++) {
			txt = textnodes.snapshotItem(i).nodeValue;
			if (txt.indexOf("Gold: ")>0)
			{
				s = txt.split(': ')[1];
				g1 = decomma(s);
				gold = parseInt(g1);
			}
		
			if (txt.indexOf("offensive troops")>0)
			{
				offense = parseInt(decomma(txt.split("You have ")[1]));
				defense = parseInt(decomma(txt.split("and ")[1]));
			}
	
			if (txt.indexOf("spy units")>0) // Beta
			{
				spies 		= parseInt(decomma(txt.split("You have ")[1]));
				antispies	= parseInt(decomma(txt.split("and ")[1]));
			}
	
			if (txt.indexOf("spies")>0) // Omega
			{
				spies 		= parseInt(decomma(txt.split("You have ")[1]));
				antispies	= parseInt(decomma(txt.split("and ")[1]));
			}
		}
		
		unsafeWindow.gold = gold;
		
		for (var i = 0; i < textnodes.snapshotLength; i++) {
			txt = textnodes.snapshotItem(i);
			if (txt.nodeValue.indexOf("Offensive")==0)
			{
				if (txt.parentNode.nodeName == 'TD')
				{
					table = txt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

					txt.nodeValue += " ("+offense+")   ";
				}
			}
		
			if (txt.nodeValue.indexOf("Defensive")==0)
			{
				if (txt.parentNode.nodeName == 'TD')
				{
					txt.nodeValue += " ("+defense+")";
				}
			}
	
			if (txt.nodeValue.indexOf("Spy Offense")==0)
			{
				if (txt.parentNode.nodeName == 'TD')
				{
					txt.nodeValue += " ("+spies+")";
				}
			}
	
			if (txt.nodeValue.indexOf("Sentry Defense")==0)
			{
				if (txt.parentNode.nodeName == 'TD')
				{
					txt.nodeValue += " ("+antispies+")";
				}
			}
		}
		
		gold_left			= gold;

		objs = new Array(); 

		o = new Object();	o.label = "Def"; 	o.items = new Array(); o.units = defense; o.owned = 0;
		objs.push(o);
		
		o = new Object();	o.label = "Off"; 	o.items = new Array(); o.units = offense; o.owned = 0;
		objs.push(o);
		
		o = new Object();	o.label = "Spy"; 			o.items = new Array(); o.units = spies; o.owned = 0;
		objs.push(o);
		
		o = new Object();	o.label = "Anti"; 	o.items = new Array(); o.units = antispies; o.owned = 0;
		objs.push(o);
		
		unsafeWindow.order = new Array();

		isBeta = (window.location.host == "www.darkthrone.com");
		inputs = document.getElementsByTagName("INPUT");
		for (a=0; a<inputs.length; a++)
		{
			if (inputs[a].name.indexOf("quantity")>=0)
			{
				v = parseInt(inputs[a].name.split("[")[1]);

				if (isBeta)
				{
					if (v<15)
						objs[1].items.push(inputs[a]);
					else
					if (v<29)
						objs[0].items.push(inputs[a]);
					else
					if (v<35)
						objs[2].items.push(inputs[a]);
					else
						objs[3].items.push(inputs[a]);
				}
				else  // Omega
				{
					if (v<24)
						objs[1].items.push(inputs[a]);
					else
					if (v<47)
						objs[0].items.push(inputs[a]);
					else
					if (v<51)
						objs[2].items.push(inputs[a]);
					else
						objs[3].items.push(inputs[a]);
				}
			}
		}
		

// Update text and remove unwanted rows
		for (a=0; a<4; a++)
		{
			for (i=0; i<objs[a].items.length; i++)
			{
				o = objs[a].items[i];
				r = o.parentNode.parentNode;
				label = r.childNodes[1].childNodes[0].nodeValue;
				inv   = parseInt(decomma(r.childNodes[3].childNodes[0].nodeValue));
				cost  = parseInt(decomma(r.childNodes[5].childNodes[0].nodeValue));
				r.childNodes[1].childNodes[0].nodeValue += "  {Max:"+Math.floor(gold/cost)+"}";
								if ((!isLast(o)) && (inv == 0))
				{
					objs[a].items[i] = null;
					r.parentNode.removeChild(r);
				}
			}
			
			objs[a].items.sort(compare);				
		}

// Build the order
		msg = "";
		bought = 0;
		
		unsafeWindow.topCost = 0;

		for (a=0; a<4; a++)
			for (i=objs[a].items.length-1; i>=0; i--)
				if (objs[a].items[i] != null)
				{
					o = objs[a].items[i];
					r = o.parentNode.parentNode;
							
					label = r.childNodes[1].childNodes[0].nodeValue.split(" {")[0];
					inv   = parseInt(decomma(r.childNodes[3].childNodes[0].nodeValue));
					cost  = parseInt(decomma(r.childNodes[5].childNodes[0].nodeValue));
					
					if (cost > unsafeWindow.topCost)
						unsafeWindow.topCost = cost;
					
					toBuy = 0;
						
					if (isLast(o))
					{
						while ((gold >= cost) && ((inv + toBuy) < objs[a].units))
						{
							toBuy++;
							bought++;
							gold -= cost;
						}
							
						if (toBuy > 0)
						{
							item = new Object();
							item.toBuy = toBuy;
							item.input  = o;
							unsafeWindow.order.push(item);
							if (msg.length >1)
								msg += "  --  ";
							msg+=objs[a].label+":"+label+":"+toBuy;
						}
					}
				}
			
		if (msg.length > 1)
			topMessage(msg);

		unsafeWindow.secs_till_auto_buy = 300; // 5 minutes

		unsafeWindow.Auto_Buy =	function()
		{
			bought = 0;
			
			for (i=0; i<unsafeWindow.order.length; i++)
			{
				bought += unsafeWindow.order[i].toBuy;
				unsafeWindow.order[i].input.value = unsafeWindow.order[i].toBuy;
			}
			
			if ((bought == 0) && (unsafeWindow.gold>unsafeWindow.topCost))
			{
				isOmega = (window.location.host == "omega.darkthrone.com");
				if (isOmega)
				{
					jump2 = GM_getValue('OmegaArmoryJump',0);
					switch(jump2)
					{
						case 1: window.document.location = "http://omega.darkthrone.com/battleupgrades.dt?session="; break;
						case 2: window.document.location = "http://omega.darkthrone.com/bank.dt?session="; break;
						default:window.document.location = window.document.location;
					}
				}
				else
				{
					jump2 = GM_getValue('BetaArmoryJump',0);
					switch(jump2)
					{
						case 1: window.document.location = "http://www.darkthrone.com/battleupgrades.dt?session="; break;
						case 2: window.document.location = "http://www.darkthrone.com/bank.dt?session="; break;
						default:window.document.location = window.document.location;
					}
				}

			}
			else
			{
				var inputs = window.document.getElementsByTagName("input")
				for (i = 0; i<inputs.length; i++)
					if (inputs[i].className.indexOf("hiddenSubmit")>=0)
						inputs[i].click();
			}
	}	
 
		unsafeWindow.Timer =	function()
		{
			unsafeWindow.secs_till_auto_buy --;
			if (unsafeWindow.secs_till_auto_buy)
			{
				minutes = Math.floor(unsafeWindow.secs_till_auto_buy / 60);
				secs = "0"+(unsafeWindow.secs_till_auto_buy - (minutes * 60));
				secs = secs.substr(secs.length -2,2);
				document.title = "Armory Auto-Buy in "+minutes+":"+secs;
				unsafeWindow.setTimeout("Timer()",1000);
			}
			else
				unsafeWindow.Auto_Buy();
		}
		
		unsafeWindow.setTimeout("Timer()",1000);


// Add Buy Now Button
   	btn = document.createElement("Button")
		theText=document.createTextNode("Buy Now!");
		btn.appendChild(theText);

		foo = document.getElementsByTagName("IMG");
		var img;
		for (a=0; a<foo.length; a++)
		{
			if (foo[a].src.match("headers") != null)
				img = foo[a];
		} 

		img.parentNode.parentNode.appendChild(btn);
		btn.addEventListener('click', 
			function(event){unsafeWindow.Auto_Buy()},
			true); 
	}
	
// *******************************************************************
// More info in Battle Upgrades
// *******************************************************************

	if ((window.location.pathname == "/battleupgrades.dt")
	 	&&	(!validating))	
	{
		function decomma(s)
		{
			g1 = "";
			ss = s.split(',');
			for (var si=0; si<ss.length; si++)
							g1 = g1 + ss[si];
							
			return (g1);
		}
		
		function Battle_Buy(items,name,gold_available)
		{
			var gold_spent = 0;
			
			for (a=0; a<items.length; a++)
				if (items[a].name.indexOf(name)>=0)
				{
					while (((gold_available - gold_spent) >= items[a].cost) && (items[a].max > ( items[a].now + items[a].buy)))
					{
						items[a].buy++;
						gold_spent += items[a].cost;
					}
					
					
				}
				
			return (gold_spent);
		}
	
		var gold = 0;
		var defense = 0;
		var offense = 0;
		
		textnodes = document.evaluate(
		    "//text()",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		
		
		for (var i = 0; i < textnodes.snapshotLength; i++) {
			txt = textnodes.snapshotItem(i).nodeValue;
			
			if (txt.indexOf("Gold: ")>0)
			{
			 	s = txt.split(': ')[1];
				g1 = decomma(s);
				gold = parseInt(g1);
			}

			if (txt.indexOf("offensive units")>0)
			{
				offense = parseInt(decomma(txt.split("You have ")[1]));
				defense = parseInt(decomma(txt.split("You have ")[2]));
			}
			
			if (txt.indexOf("chers can use guard towers.")>0)
			{
				v = txt.split("You have ");
				defense = parseInt(decomma(v[1]));

				v = v[1].split("archers and ");
				if (v.length > 1)
				{
					defense += parseInt(decomma(v[1]));
				}
			}
			
			if (txt.indexOf("knights")>0)
			{
				knights = parseInt(decomma(txt.split("You have ")[1]));
				v = txt.split("knights and ");
				berserkers = 0;
				if (v.length>1)
					berserkers = parseInt(decomma(v[1]));

				offense = knights + berserkers;
			}
		}
		
		Gold_Avail = gold;
		
		var tr = document.getElementsByTagName('TR');
		var items = new Array();
		
		for (a = 0; a<tr.length; a++)
			if (tr[a].childNodes.length == 11)
			{
				txt = tr[a].childNodes[1].textContent;
				var o = new Object;
				
				o.row = tr[a];
				o.buy = 0;
				o.max = 0;

				o.now = parseInt(decomma(tr[a].childNodes[3].textContent));
				o.cost = parseInt(decomma(tr[a].childNodes[5].textContent));
				o.name = '';

				if (txt.indexOf('Steed') >= 0)
				{
					o.max = offense;
					o.name = 'Steed';
				} 
		
				if ((txt.indexOf("Guard Tower")>=0) || (txt.indexOf("holds up to")>0))
				{
					o.max = Math.ceil(defense / 5);
					o.name = 'Tower';
				} 

				if (txt.indexOf("Elephant")>=0)
				{
					o.max = Math.ceil(offense / 10);
					o.name = 'Elephant';
				}

				if (txt.indexOf("Catapult")>=0)
				{
					o.max = Math.ceil(defense / 10);
					o.name = 'Catapult';
				}
				
				if (o.cost > 0)
					items.push(o);
			}
		
		for (a=0; a<items.length; a++)
		{
			items[a].row.childNodes[3].textContent = items[a].now + "/"+items[a].max;
		}
		
		gold_spent = 0;
		
		gold_spent += Battle_Buy(items,'Catapult',gold-gold_spent);
		gold_spent += Battle_Buy(items,'Tower',gold-gold_spent);
		gold_spent += Battle_Buy(items,'Elephant',gold-gold_spent);
		gold_spent += Battle_Buy(items,'Steed',gold-gold_spent);
		
		unsafeWindow.items = items;
		
		unsafeWindow.order = '';
		
		if (gold_spent > 0)
		{
			unsafeWindow.order = 'Autobuy';

			for (a=0; a<items.length; a++)
			{
				if (items[a].buy>0)
					unsafeWindow.order = unsafeWindow.order + ' ' + items[a].buy + ' '+items[a].name+'s';
			}
		}
		else
			unsafeWindow.order = 'Refresh';
		
		unsafeWindow.canbuy = false;
		for (a=0; a<unsafeWindow.items.length; a++)
			if (items[a].max > items[a].now)
				unsafeWindow.canbuy = true;
				
		if (unsafeWindow.canbuy == false)
		{
			unsafeWindow.isBeta = (window.location.host == "www.darkthrone.com");
			unsafeWindow.jump2 = 0;
			
			if (unsafeWindow.isBeta)
				unsafeWindow.jump2 = GM_getValue('BetaUpgradeJump',0);
			else
				unsafeWindow.jump2 = GM_getValue('OmegaUpgradeJump',0);
					
			switch (unsafeWindow.jump2)
			{
						case (1):	unsafeWindow.order = "Jump to Armory in "; break;
						case (2):	unsafeWindow.order = "Jump to Bank in "; break;
						default:	unsafeWindow.order = "Auto Refresh in "; 
			}
		}
	
		unsafeWindow.secs_till_auto_buy = 300; // 5 minutes
		
		unsafeWindow.Auto_Buy =	function()
		{	
			if (!unsafeWindow.canbuy)
			{
				if (unsafeWindow.isBeta)
				switch(unsafeWindow.jump2)
				{
					case 1: window.document.location = "http://www.darkthrone.com/armory.dt?session="; break;
					case 2: window.document.location = "http://www.darkthrone.com/bank.dt?session="; break;
					default:window.document.location = window.document.location;
				}
				else
				switch(unsafeWindow.jump2)
				{
					case 1: window.document.location = "http://omega.darkthrone.com/armory.dt?session="; break;
					case 2: window.document.location = "http://omega.darkthrone.com/bank.dt?session="; break;
					default:window.document.location = window.document.location;
				}
			}
			else
			{
				for (a=0; a<unsafeWindow.items.length; a++)
				{
					unsafeWindow.items[a].row.childNodes[9].childNodes[0].value = unsafeWindow.items[a].buy;
				}
				
				var inputs = window.document.getElementsByTagName("input")
				for (i = 0; i<inputs.length; i++)
					if (inputs[i].className.indexOf("hiddenSubmit")>=0)
						inputs[i].click();
			}
		}	
 
		unsafeWindow.Timer =	function()
		{
			unsafeWindow.secs_till_auto_buy --;
			if (unsafeWindow.secs_till_auto_buy)
			{
				minutes = Math.floor(unsafeWindow.secs_till_auto_buy / 60);
				secs = "0"+(unsafeWindow.secs_till_auto_buy - (minutes * 60));
				secs = secs.substr(secs.length -2,2);
				document.title = unsafeWindow.order+" in "+minutes+":"+secs;
				unsafeWindow.setTimeout("Timer()",1000);
			}
			else
				unsafeWindow.Auto_Buy();
		}
		
		unsafeWindow.setTimeout("Timer()",1000);

    	btn = document.createElement("Button")
		theText=document.createTextNode("Buy Now!");
		btn.appendChild(theText);

		foo = document.getElementsByTagName("IMG");
		var img;
		for (a=0; a<foo.length; a++)
		{
			if (foo[a].src.match("headers") != null)
				img = foo[a];
		} 

		img.parentNode.parentNode.appendChild(btn);
		btn.addEventListener('click', 
			function(event){unsafeWindow.Auto_Buy()},
			true); 
	}


// Add reboot code so a locked panel will not "stay"
	if (window.location.host.indexOf('darkthrone')>0)
	{
			unsafeWindow.setTimeout("{window.document.location = window.document.location;}",600000);
	}

	

	
}



)();