// ==UserScript==
// @name           InvestingComTimezone
// @namespace      InvestingComTimezone
// @description    Always switch to GMT timezone
// @include        http://www.investing.com/economic-calendar*
// ==/UserScript==

function delete_divs_by_class(class_array) {
  var divCollection = document.getElementsByTagName("div");
  for (var i=0; i<divCollection.length; i++) {
	if(class_array.indexOf(divCollection[i].getAttribute("class")) != -1) {
	  divCollection[i].parentNode.removeChild(divCollection[i]);
	}
  }
}

function hide_divs_by_class(class_array) {
  var divCollection = document.getElementsByTagName("div");
  for (var i=0; i<divCollection.length; i++) {
	if(class_array.indexOf(divCollection[i].getAttribute("class")) != -1) {
	  divCollection[i].style.visibility="hidden";
	}
  }
}

window.addEventListener('load', function(){
   
  document.getElementById("navBar").parentNode.removeChild(document.getElementById("navBar"));
  document.getElementById("wideBanner").parentNode.removeChild(document.getElementById("wideBanner"));
  document.getElementById("findABroker").parentNode.removeChild(document.getElementById("findABroker"));
  document.getElementById("Side_Block_Facebook").parentNode.removeChild(document.getElementById("Side_Block_Facebook"));
  document.getElementById("footerWrapper").parentNode.removeChild(document.getElementById("footerWrapper"));

  delete_divs_by_class(["bottomHeader clear","topHeader", "clear rightColumnAd", "mainEcoAd", "logoHeader float_lang_base_1", "bannerHeader float_lang_base_2", "midHeader clear"]);
  hide_divs_by_class(["midHeader clear"]);

  //EST=liTz8, GMT=liTz15, etc. For all the ids, view source and search for 'liTz'
  document.getElementById("liTz15").click();
    
}, false);