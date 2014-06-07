// ==UserScript==
// @name           Better Show Passwords
// @description    Instead of using asterisks to mask passwords, show them in a light color when the password field has focus.
// @namespace      http://userscripts.org/users/34196
// ==/UserScript==
//
// Originally this script always showed your passwords but then I realized that Firefox's autofill didn't work if you had multiple usernames for a form.  
// For example if you have multiple username/passwords that you use with gmail, you can switch between them.  
// Switching usernames requires the password-type field to exist.  
// So we can't just remove the password type all the time.  
// Instead we just remove it when it has focus.
// Based on http://userscripts.org/scripts/review/62094, but I fixed it so it works on more websites.
function setPasswordNodes(typeName)
{
	var is=document.evaluate('//input[@type="'+typeName+'"]',document,null,6,null),l=is.snapshotLength;
	  for(i=0;i<l;i++) {
	   with(is.snapshotItem(i))
		  {
			style.color = 'plum';
			addEventListener('blur',function(){this.type='password'}, false);
			addEventListener('focus',function(){this.type='text'}, false);
			addEventListener('click',function(){this.type='text'}, false);
			addEventListener('dblclick',function(){this.type='password'}, false);
		  }
	  }
	if (document.activeElement.type === typeName)
	{
		document.activeElement.type = "text";
	}
}
setPasswordNodes("password");
setPasswordNodes("PASSWORD");
setPasswordNodes("Password");