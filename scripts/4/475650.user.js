// ==UserScript==
// @name       WebSirtaPlus
// @namespace  http://www.wyntech.ca/
// @version    1.01
// @description  Ajoute des fonctionnalités utiles à WebSirta / Adds userful features to WebSirta
// @require  http://code.jquery.com/jquery-1.10.1.min.js
// @require  http://code.jquery.com/ui/1.10.1/jquery-ui.js
// @resource jqUI_CSS  http://code.jquery.com/ui/1.10.1/themes/smoothness/jquery-ui.css
// @copyright  2014+, Julien Gascon-Samson
// @include https://www2.stm.info/webSIRTA/*efault.aspx
// @include https://www2.stm.info/webSIRTA/Reservation.aspx*
// @include https://www2.stm.info/webSIRTA/ReservationConfirmation.aspx*
// ==/UserScript==

// Apply jquery styles
var jqUI_CssSrc = GM_getResourceText ("jqUI_CSS");
GM_addStyle (jqUI_CssSrc);

function onDefaultPage() {
    var firstFoldableTable = $( "#panProf_ExpandButton" ).parent().parent().parent().parent().parent();
    
    console.log (firstFoldableTable);
    
    // Try to get features
    var feature_addressSearch = GM_getValue("feature_addressSearch");
    if (feature_addressSearch == null) {
    	feature_addressSearch = "1";   
    }
    
    // Add after
    firstFoldableTable.before( '<table class="sectionTable" id="webSIRTAPlusTable" cellpadding="2" cellspacing="0"><tr class="sectionTableHeader"><td><h3><input type="image" src="App_Themes/Theme/images/collapse.gif" style="visibility:hidden;" />webSIRTA Plus | Développé par <a href="mailto:julien@wyntech.ca">Julien Gascon-Samson</a> | Module activé</h3></td></tr></table><br/>' );
    
    var webSirtaPlusTable = $( "#webSIRTAPlusTable" );
    
    webSirtaPlusTable.after('<table class="sectionTable" cellpadding="5">' +
                            '<tr class="sectionLink"><td bgcolor="#EFFBFB">Bienvenue dans webSIRTA Plus! Ce module a été conçu dans le but de bonifier certaines pages de l&#39;application web de réservation "WebSirta" de la STM. Le but derrière ce module est pour moi de perfectionner mes habiletés avec certaines technologies du web telles que Greasemonkey, Javascript, JQuery ainsi que les outils de développement des différents navigateurs: Chrome, Firefox, MSIE. Il s&#39;agit en quelque sorte d&#39;un terrain de jeu où je peux pratiquer certaines habiletés. Bien évidemment, je vise également à ce que cela soit d&#39;une certaine utilité pour les usagers! Pour l&#39;instant, la seule fonctionnalité proposée est la recherche textuelle des adresses dans la page de réservation. Il est prévu que d&#39;autres fonctionnalités soient développées ultérieurement. Cochez / décochez les items suivants pour activer / désactiver la fonctionnalité correspondante.</br>' + 
                            'Vos commentaires (ou insultes!) sont toujours les bienvenus: julien@wyntech.ca. Bonne utilisation :-)</td></tr>' +
                            '<tr class="sectionLink"><td><input type="checkbox" id="feature_addressSearch" name="feature" value="addressSearch" ' + getFeatureCheckedString(feature_addressSearch) + '>Activer la recherche d&#39;adresses dans la page de réservation.</td></tr>' + 
                            '<tr class="sectionLink"><td><table><tr><td style="width:25px;"></td><td>Si des adresses ont été ajoutées/modifiées et vous remarquez que certaines adresses n&#39;apparaîssent pas dans la fonction recherche, il peut être nécessaire d&#39;actualiser les adresses. Pour ce faire, cliquez sur le bouton suivant: <input type="button" id="feature_addressSearch_refresh" name="feature_addressSearch_refresh" value="Actualiser les adresses"/>. Les adresses seront actualisées la prochaine fois que vous ouvrirez la page de réservation (il y aura un court délai).</td></tr></table></td></tr>' +
                            '</table>');

    // Add our sexy handlers
    // Check / settings
    $("body").on("click", "#feature_addressSearch", function(cb) {
        GM_setValue("feature_addressSearch", getFeatureString(cb.target.checked));
    });
    
    // Refresh addresses
    $("body").on("click", "#feature_addressSearch_refresh", function(cb) {
        GM_deleteValue("addr_history");
        GM_deleteValue("addr_predefined");
        GM_deleteValue("addr_public");
        alert("Les adresses seront rechargées la prochaine fois que vous ouvrirez la page de réservation! Il y aura un court délai pendant lequel la page de réservation sera rechargée quelques fois.");
    });
    
    function getFeatureCheckedString(feature) {
        if (feature == "1") {
        	return "checked";
        } else {
         	return "";   
        }
    }
    
    function getFeatureString(checked) {
        if (checked) {
        	return "1";   
        } else {
        	return "0";   
        }
    }
}

function onReservationPage() {  

    // Unset vars and return
    /*GM_deleteValue("addr_history");
    GM_deleteValue("addr_predefined");
    GM_deleteValue("addr_public");
    return;*/
    
    // If feature is not enabled then return
    if (isFeatureEnabled("addressSearch") == false)
        return;
    
    // If we must preselect values
    for (var i=1; i<=2; i++) {
        var addrPreselect = GM_getValue("Addr" + i + "_Preselect");
        if (addrPreselect != null) {
            GM_deleteValue("Addr" + i + "_Preselect");
            selectAddress( i, addrPreselect );
        }
    }
    
    // 3 kinds of adresses: history, predefined and public places
    
    var addr_history = GM_getValue("addr_history");
    if (addr_history == null) {
    	// Fetch them
        console.log("Historique nul");
        
        // Check if we are in historique mode
        if ($("#AddressPicker1_ddlAddressTypeList").val() == "Historique") {
         	console.log("En mode historique");
            // Get the adresses
            addr_hist_obj = getAdressesObject(" [Historique]", "|Historique");
            serialize("addr_history", addr_hist_obj);
            
        } else {
        	// Go to historique mode
            switchToAddressType(1, "Historique");
            return;
        }
    }

    addr_history = deserialize("addr_history");   

    var addr_predefined = GM_getValue("addr_predefined");
    if (addr_predefined == null) {
    	// Fetch them
        console.log("Predefined nul");
        
        // Check if we are in predefined mode
        if ($("#AddressPicker1_ddlAddressTypeList").val() == "Predefinie") {
         	console.log("En mode prédéfinie");
            // Get the adresses
            addr_predef_obj = getAdressesObject(" [Favoris]", "|Predefinie");
            serialize("addr_predefined", addr_predef_obj);
            console.log(GM_getValue("addr_predefined"));
            
        } else {
        	// Go to predef mode
            switchToAddressType(1, "Predefinie");
            return;
        }
    }
    
    addr_predefined = deserialize("addr_predefined");

    var addr_public = GM_getValue("addr_public");
    if (addr_public == null) {
    	// Fetch them
        console.log("Public nul");
        
        // Check if we are in public mode
        console.log($("#AddressPicker1_ddlAddressTypeList").val());
        if ($("#AddressPicker1_ddlAddressTypeList").val() == "LieuPubliqueAdresse") {
         	console.log("En mode lieu public");
            // Get the adresses
            addr_public_obj = getAdressesObject(" [Public]", "|LieuPubliqueAdresse");
            serialize("addr_public", addr_public_obj);
            
        } else {
        	// Go to public mode
            switchToAddressType(1, "LieuPubliqueAdresse");
            return;
        }
    }
        
   	addr_public = deserialize("addr_public");   
    
    
    function getAdressesObject(appendLabel, appendValue) {
        var availableAddr1 = [];
        
        $("#AddressPicker1_ddlAddressList > option").each(function() {
        	var option = {label: $("#AddressPicker1_ddlAddressList option[value='" + this.value + "']").text() + appendLabel, value: this.value + appendValue };
        	availableAddr1.push(option);
		});
        
        return availableAddr1;
    }
    
    // Build list of all adresses! by combining the arrays
    var availableAddr = addr_predefined;
    for (var index in addr_history) {
    	availableAddr.push(addr_history[index]);
    }
    for (var index in addr_public) {
    	availableAddr.push(addr_public[index]);
    }
    
    $("#AddressPicker1_ddlAddressList").after( "</br> Rechercher une adresse de départ: <input name='addr1_autocomplete' id='addr1_autocomplete' size='60' />" );
    $("#AddressPicker2_ddlAddressList").after( "</br> Rechercher une adresse de destination: <input name='addr2_autocomplete' id='addr2_autocomplete' size='60' />" );
    
    $( "#addr1_autocomplete" ).autocomplete({
      source: availableAddr,
      select: function( event, ui ) {
      	onAddr1AutoCompleteSelect( event, ui );
      }
    });
    
    $( "#addr2_autocomplete" ).autocomplete({
      source: availableAddr,
      select: function( event, ui ) {
      	onAddr2AutoCompleteSelect( event, ui );
      }                                            
    });
    
    function onAddr1AutoCompleteSelect( event, ui ) {
        // Get Category
        var autoCompleteValue = ui.item.value.split('|');
        
        event.preventDefault();
        
        onAddrAutoCompleteSelect( 1, autoCompleteValue );
    }
    
    function onAddr2AutoCompleteSelect( event, ui ) {
        // Get Category
        var autoCompleteValue = ui.item.value.split('|');
        
        event.preventDefault();
        
        onAddrAutoCompleteSelect( 2, autoCompleteValue );
    }
    
    function onAddrAutoCompleteSelect( addrPickerId, autoCompleteValue ) {
    	var value = autoCompleteValue[0];
        var category = autoCompleteValue[1];
        
        // If we are in the correct addressType
        if ($("#AddressPicker" + addrPickerId + "_ddlAddressTypeList").val() == category) {
            selectAddress( addrPickerId, value );
        } else {
            GM_setValue("Addr" + addrPickerId + "_Preselect", value);
        	// Switch category
            switchToAddressType(addrPickerId, category);
        }
        $( "#addr" + addrPickerId + "_autocomplete" ).val("");   
     
    }
    
    function switchToAddressType(addrPickerId, addrType) {
  		$("#AddressPicker" + addrPickerId + "_ddlAddressTypeList option[value='" + addrType + "']").attr("selected", "selected");
        // Refresh
        $("#AddressPicker" + addrPickerId + "_ddlAddressTypeList").trigger("change");
    }
    
    function selectAddress( addrPickerId, addrValue ) {
    	$("#AddressPicker" + addrPickerId + "_ddlAddressList option[value='" + addrValue + "']").attr("selected", "selected");
    }
    
}

function onReservationConfirmationPage() {
	// Locate a proper place to put our funny message
    var preMessageNode = $("#TABLE_TRIP_ACTION").parent().parent().parent().parent().parent().parent();
    preMessageNode.after("<font size=3><b><i>Merci de voyager avec la STM!</i></b></font>");
}

function deserialize(name, def) {
    return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
    GM_setValue(name, uneval(val));
}

function isFeatureEnabled(name) {
    var feature = GM_getValue("feature_" + name);
    
    if (name == "addressSearch") {
        // Enabled by default
        if (feature == null) {
    		feature = "1";
    	}
    } else {
        if (feature == null) {
    		feature = "0";
    	}        
    }
    
    if (feature == "1") {
    	return true;
    } else {
    	return false;   
    }
    
}

$(function() {
    var url = window.location.href;
    
    var defaultUrl = "https://www2.stm.info/webSIRTA/Default.aspx";
    var reservationUrl = "https://www2.stm.info/webSIRTA/Reservation.aspx";
    var reservationConfirmationUrl = "https://www2.stm.info/webSIRTA/ReservationConfirmation.aspx";
    
    if (url.toLowerCase().substring(0, defaultUrl.length) == defaultUrl.toLowerCase()) {
    	onDefaultPage();   
    } else if (url.substring(0, reservationUrl.length) == reservationUrl) {
    	onReservationPage();   
    } else if (url.substring(0, reservationConfirmationUrl.length) == reservationConfirmationUrl) {
    	onReservationConfirmationPage();   
    }
});