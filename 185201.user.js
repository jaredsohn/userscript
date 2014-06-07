// ==UserScript==
// @author    	bodinho
// @name        Teracod releasek kiemelese
// @description Az oldalon lévő TERACOD derelaseket emeli ki zöld sávval. 
// @include     http://teracod.com/browse*
// @version     1.1
// @grant       none
// @require     http://code.jquery.com/jquery-git2.js
// ==/UserScript==




//&lt;![CDATA[
$(window).load(function(){

   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'application/javascript;version=1.7';
   script.src= 'http://code.jquery.com/jquery-git2.js';
   script.language='JavaScript 1.7';
   head.appendChild(script);

 $("td").each(function() {
    var val = parseInt(this.innerHTML, 10);
    if (val) {
        $('tr:contains("TERACOD")').css('background-color', '#09732F');
    }
	
});
 
});//]]&gt; 


//&lt;![CDATA[
$(window).load(function(){

   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'application/javascript;version=1.7';
   script.src= 'http://code.jquery.com/jquery-git2.js';
   script.language='JavaScript 1.7';
   head.appendChild(script);

 $("td").each(function() {
    var val = parseInt(this.innerHTML, 10);
    if (val) {
        $('tr:contains("TeRaCoD")').css('background-color', '#09732F');
    }
	
});
 
});//]]&gt; 


//&lt;![CDATA[
$(window).load(function(){

   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'application/javascript;version=1.7';
   script.src= 'http://code.jquery.com/jquery-git2.js';
   script.language='JavaScript 1.7';
   head.appendChild(script);

 $("td").each(function() {
    var val = parseInt(this.innerHTML, 10);
    if (val) {
        $('tr:contains("teracod")').css('background-color', '#09732F');
    }
	
});
 
});//]]&gt; 