// ==UserScript==
// @name           Sign-in Gay411

// @namespace      http://gay411aficionado/20080612/sign-in-411

// @description    Sign-in into 411

// @include        http://www.gay411.com/*
// @include        http://gay411.com/*

// ==/UserScript==
/* 




*/

window.addEventListener(
    'load', 
    function() { 
		switch(true)
		{
		case (/\/mainframe.php3$/.test(self.location)):
			self.document.forms[0].addEventListener("submit",
				function(evt) {
				
					GM_setValue('gay411_temp_your_nick', evt.target.elements.namedItem('your_nick').value);
					GM_setValue('gay411_temp_your_password', evt.target.elements.namedItem('your_password').value);
					
				},true);
		
			break;

		case (/.*\/messenger\/chatlogin.php/.test(self.location) && /temporairement réservé aux membres/.test(self.document.body.innerHTML)):
			self.location = "/messenger/chatlogin.php";
			break;
				
		case (/.*\/messenger\/chatlogin.php$/.test(self.location)):
		
			if (GM_getValue('gay411_temp_your_nick', "") != "" && GM_getValue('gay411_temp_your_password', "") != "") {
				var frm = self.document.forms[0];					
				frm.elements.namedItem('your_nick').value = GM_getValue('gay411_temp_your_nick', "");
				frm.elements.namedItem('your_password').value = GM_getValue('gay411_temp_your_password', "");
				
				frm.submit();	
			}
			break;    

		case (/.*\/members\/prioritypage.php3/.test(self.location)):
			self.location = "/messenger/chatlogin.php";
			break;
			
		}
	 },
    true);

