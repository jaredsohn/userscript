// --------------------------------------------------------------------------------
// Copyright (C) 2009  dumpling  [ https://twitter.com/dumpling_cn ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name       Get Fontcid 
// @namespace  http://userscripts.org/scripts/show/
// @description     
// @include http://*.koubei.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
  if($('div.nav > div.nav-info').length === 0){ 
    return ;
  }


  function getFrontcid(url){
	  var textContent,frontcid;
	  if(url.match(/\//g).length >= 4){
	    url = url.split('/').slice(0,4).join('/'); 
	  }

      $.get(url+'/pdeBug-1',function(data){
	  textContent = $('div.nav',data).parent().remove('div').text();	
	  frontcid = textContent.match(/frontcid:[\d]*/g);

	  if(!frontcid){
	    return;
	  }else{
	    $('body').append($('<div> ' +  frontcid + '</div>').css(
		   {
		     position : "absolute",
			 border : "2px solid red",
		     right : "50px",
		     top : "250px",
		     fontSize : "18px",
			 padding : "20px",
			 background : "#fff",
			 zIndex : "10"
		  }
		));    
	  }
		

	})
  }

  getFrontcid(window.location.href);


})();