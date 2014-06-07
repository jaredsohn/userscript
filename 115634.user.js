// ==UserScript==
// @name           captcha submit
// @namespace      http://captchatrader.com
// @include        http://captchatrader.com/captchas/solve
// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();

  function letsJQuery($)
  {
    $.extend({ 
		  password: function (length, special) {
		    var iteration = 0;
		    var password = "";
		    var randomNumber;
		    if(special == undefined){
		        var special = false;
		    }
		    while(iteration < length){
		        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
		        if(!special){
		            if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
		            if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
		            if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
		            if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
		        }
		        iteration++;
		        password += String.fromCharCode(randomNumber);
		    }
		    return password;
		  }
		});

		setInterval('$("#response").val($.password(Math.floor(Math.random()*15))+" "+$.password(Math.floor(Math.random()*15)));if ($("#response_form input[type=submit]").attr("disabled")=="") {$("#response_form").submit();}',10000);
  }
})();