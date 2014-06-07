// ==UserScript==
// @name           LeBonCoin
// @namespace      LeBonCoin
// @description    Ajout de fonctionnalités : cache les pubs, cache les annonces pro (à activer), ajout de liens google map sur les villes
// @include        http://www.leboncoin.fr/*
// @include        http://www*.leboncoin.fr/*
// @include        http://mobile.leboncoin.fr/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(letsJQuery);

// All your GM code must be inside this function
function letsJQuery() {

	var listOptions = '<div id="shikiSubOptions"><label for="shikiPro">Afficher annonces pro : </label><input type="checkbox" id="shikiPro" name="shikiPro" checked="checked" /><br/></div>'
	
	// on cache les "annonces à la une"
	$('.list-gallery').hide();
	
	// on cache les autres pubs
	$('iframe, #google_ads_frame1').remove();
	
	// On cache la barre de pub
	$('#oas-top, #kk-widget, .oas-x11').hide();
	
	// On ajoute les liens google maps
	$('.placement').each(function(){
		var adressComposed = $.trim($(this).text().replace(/\s+/g, " "));
		$(this).html('<a href="http://maps.google.fr/?q='+ encodeURIComponent(adressComposed.replace(" / ",",")) +'" target="_blank">'+ $(this).text() +'</a>');
	});
	var ville = $('.lbcParams table tr:eq(1) td').text();
	var codepostal = $('.lbcParams table tr:eq(2) td').text();
	$('.lbcParams').append('<a href="http://maps.google.fr/?q='+ encodeURIComponent(ville+','+codepostal) +'" target="_blank">Plan</a>');
	
	$('<div id="shikiOptions"><img src="http://www.everythinghaitian.com/Images/Icons/addIcon.gif" alt="options" />'+listOptions+'</div>').css({'position': 'fixed', 'top': 10, 'left': 10, 'background':'#ffffff', 'border-radius':'5px','z-index':'500'}).appendTo('body');
	
	var $optionWrapper = $('#shikiOptions'),
		$option = $('#shikiSubOptions'),
		$pro = $('#shikiPro');
	
	$option.css('display','none');
	
	$optionWrapper.click(function(){
		if($option.css('display') == 'none'){
			$option.slideDown();
		}else{
			$option.slideUp();
		}
	});
	
	$pro.click(function(e){
		e.stopPropagation();
		checkPro();
	});
	var shikiPro = getCookie('shikiPro');
	if(shikiPro != null){
		if(shikiPro == 'true'){
			$pro.attr('checked', 'checked');
		}else{
			$pro.removeAttr('checked');
		}
	}
	checkPro();
	
	function checkPro(){
		if($pro.is(':checked')){
			setCookie('shikiPro', 'true');
			$('.category:contains("(pro)")').parent().parent().show();
		}else{
			setCookie('shikiPro', 'false');
			$('.category:contains("(pro)")').parent().parent().hide();
		}
	}
	function setCookie(sName, sValue) {
        var today = new Date(), expires = new Date();
        expires.setTime(today.getTime() + (365*24*60*60*1000));
        document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString() +"; path=/";
	}
	
	function getCookie(sName) {
        var cookContent = document.cookie, cookEnd, i, j;
        var sName = sName + "=";
 
        for (i=0, c=cookContent.length; i<c; i++) {
                j = i + sName.length;
                if (cookContent.substring(i, j) == sName) {
                        cookEnd = cookContent.indexOf(";", j);
                        if (cookEnd == -1) {
                                cookEnd = cookContent.length;
                        }
                        return decodeURIComponent(cookContent.substring(j, cookEnd));
                }
        }       
        return null;
	}
}