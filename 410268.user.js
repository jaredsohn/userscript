// ==UserScript==
// @id             beta.realtor.ca-39fadfc4-00ad-45c4-8170-b37345b02eb2@scriptish
// @name           beta.realtor.ca Extras
// @version        0.1
// @description    Adds sqft and $/sqft to the map listings on beta.realtor.ca (in place of Listing ID)
// @include        http://beta.realtor.ca/*
// @run-at         document-start
// @grant GM_getResourceText
// @resource RealtorMap http://beta.realtor.ca/Presentation/Javascript/libraries/RealtorMap.js
// ==/UserScript==

var changed = 0; // script needs to be changed

window.addEventListener('beforescriptexecute', function(e) {

    ///for external script:
	src = e.target.src;
	if (src.search(/RealtorMap\.js/) != -1) {
          changed++;
		e.preventDefault();
        e.stopPropagation();
		var source = GM_getResourceText("RealtorMap");
		source = source.replace("property+='           <div id=\"map_lst_ID'+i+'\" class=\"m_map_map_prpty_info_listing_id\">'+propertyResultsPanel.ListingID+' '+result.MlsNumber+'</div>';",
                                
                                "var sqft = result.Building.SizeInterior.replace(/\\D/g,'');"+
                                "var cost = propertyPrice[0].replace(/\\D/g,'');"+
                                "var costPerSqft = Math.round(cost/sqft);"+
                                "property += '           <div class=\"m_map_map_prpty_info_listing_id\">' + result.Building.SizeInterior + '&nbsp;&nbsp;&#40;&#36;'+costPerSqft+'&nbsp;/&nbsp;sqft&#41;</div>';"
                               );
        //console.log(source);
        appendScript(source);
	};
	
	///when done, remove the listener:
	if(changed == 2) window.removeEventListener(e.type, arguments.callee, true);
	
}, true);

function appendScript(s) {
      document.head.appendChild(document.createElement('script')).innerHTML = s;
}