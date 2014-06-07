// ==UserScript==
// @name          RS-citizenship
// @namespace     http://www.erepublik.com/en/citizen/profile/
// @description   Change citizenship to Republika Srpska
// @include       http://www.erepublik.com/en/citizen/profile/*
// @include       http://economy.erepublik.com/en/inventory*
// @include       http://economy.erepublik.com/en/accounts/*
// ==/UserScript==


	var oDivContent	= document.getElementById('content');

	var arrayImages = oDivContent.getElementsByTagName('img');
	for (var i = 0; i < arrayImages.length; i++) {
			
		if( arrayImages[i].src == "http://www.erepublik.com/images/flags/S/Bosnia-Herzegovina.gif" )
		{
			arrayImages[i].parentNode.innerHTML = "<img src='http://i913.photobucket.com/albums/ac332/Radivoj_NS/AmblemRScrvenoplavo322x14.jpg' title='Republika Srpska' alt='Република Српска' /> <span style='font-size:11px;'>&nbsp;Република Српска</span>";
		}
	}
	
	var arrayDiv, oDivCitizenContent;
	arrayDiv = oDivContent.getElementsByTagName( 'div' );
	for (var i = 0; i < arrayDiv.length; i++) {
		if( arrayDiv[i].className == "citizen_content" )
		{
			oDivCitizenContent = arrayDiv[i];
			break;
		}
	}

	if( null == oDivCitizenContent )	return;

	var arrayH3;
	arrayH3 = oDivCitizenContent.getElementsByTagName( 'h3' );
	for (var i = 0; i < arrayH3.length; i++) {
		if( arrayH3[i].className == "mbot2" )
		{
			arrayH3[i].innerHTML = "<div style='width: 250px; float: left;'>Achievements</div>&nbsp;<div style='color: black; font-weight:600; width: 250px; text-align: right; float: left;'>Косово и Метохија је еСрбија</div>";
			break;
		}
	}
		
