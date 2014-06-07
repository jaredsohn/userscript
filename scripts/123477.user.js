// ==UserScript==
//
// @name           Skyrim Alchemy Calculator - Craft button enhancer
// @namespace      http://jhaines.name/skyrim/alchemy/userscript
// @description    Add updating "Craft" button-links to the Skyrim Alchemy calculator
// @include        http://arrington.me/alch/*
// @version        0.1
// ==/UserScript==                                                              



function scriptWrapper () {

    //--- Intercept Ajax for "Submit" calls
    $('body').ajaxSuccess (
        function (event, requestData) {
            postAjaxDataReceive (requestData);
        }
    );

    function postAjaxDataReceive (requestData) {
		// Add new column for "Craft"
		$("#results tr th:first-child").each( function(index) {
			$(this).after("<th>Craft</th>");
		});

		// for each result row
		$("#results tr").each( function(index) {
			// tag the row with id potionRow# so we can find it later
			var rowId = "potionRow" + index;
			$(this).attr( "id", rowId );

			// turn the quantity number into an input text box
			$eQty = $("td:eq(0)", this);
			$qty = $eQty.text();
			$eQty.html("<input style='width: 50px; text-align: right' type='text' value='" + $qty + "' />");
			var onclickScript = "doCraft( '" + rowId + "' ); return false;";

			// add a "Craft" link in the next column
			$eQty.after('<td><a href="" onclick="' + onclickScript + '">Craft</a></td>' );
		});
		
	}

}

// craft the number of potions specified for the given row
function doCraft( potionRowId ) {
	var potionRow = $( '#' + potionRowId );

	var inputPotionQuantity = $("td:eq(0) input", potionRow);
	var potionQuantity = inputPotionQuantity.val();
	
	var strIngredients = $( "#" + potionRowId + " td:eq(2)").text();
	strIngredients = strIngredients.replace(/^\s*/, '').replace(/\s*$/, '');
	var ingredients = []
	var ingredients = strIngredients.split(' + ');
	
	console.log('doCraft ' + potionQuantity + ' ' + ingredients[0] + ' ' + ingredients[1] + ' ' + ingredients[2] );
	
	// clear the remaining potions quantity
	inputPotionQuantity.val(0);

	// reduce the used ingredients used
	for( i=0; i<ingredients.length; ++i ) {
		var ingredient = ingredients[i];

		var inputIngredient = $('input[name="' + ingredient + '"]')
		var ingredientAmount = inputIngredient.val();
		ingredientAmount -= potionQuantity;
		ingredientAmount = ( ingredientAmount < 0 ? 0 : ingredientAmount );
		inputIngredient.val( ingredientAmount );
	}
}


function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ    = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node (null, null, scriptWrapper);
addJS_Node (doCraft, null, null);



