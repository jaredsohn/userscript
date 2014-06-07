// ==UserScript==
// @name			stcscript
// @namespace		http://www.undefinedstudio.com/stcscript
// @description		stcscript!
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @match			*://steamcommunity.com/market/listings*
// ==/UserScript==

NewBuyItemDialog = {
		m_bPurchaseClicked: false,
		m_bPurchaseSuccess: false,
		m_bInitialized: false,

		m_oListingOriginalRow: null,
		m_sElementPrefix: null,
		m_ulListingId: false,
		m_item: null,
		m_fnDocumentKeyHandler: null,

		m_nSubtotal: 0,
		m_nFeeAmount: 0,
		m_nTotal: 0,

		m_sAddFundsReturnURL: null,

		Initialize: function() {
			$('#market_buynow_dialog_purchase').click(function(event){NewBuyItemDialog.OnAccept(event);});
			$('#market_buynow_dialog_addfunds').click(function(event){NewBuyItemDialog.OnAddFunds(event);});
			$('#market_buynow_dialog_cancel').click(function(event){NewBuyItemDialog.OnCancel(event);});
			$('#market_buynow_dialog_cancel_close').click(function(event){NewBuyItemDialog.OnCancel(event);});
			$('#market_buynow_dialog_close').click(function(event){NewBuyItemDialog.OnCancel(event);});

			$('#market_buynow_dialog').css("visibility", "hidden");
			$('#market_buynow_dialog').show();
			$('#market_buynow_dialog').hide();
			$('#market_buynow_dialog').css("visibility", "");

			this.m_bInitialized = true;
		},

		Show: function ( sElementPrefix, listingid, item ) {

			if ( !this.m_bInitialized )
				this.Initialize();

			this.m_bPurchaseClicked = false;
			this.m_bPurchaseSuccess = false;

			$('#market_buynow_dialog_error').hide();

			$('#market_buynow_dialog_title').html( 'Acquista un oggetto' );
			$('#market_buynow_dialog_purchasecomplete_message').hide();
			$('#market_buynow_dialog_purchase').show();
			$('#market_buynow_dialog_purchase_throbber').hide();
			$('#market_buynow_dialog_paymentinfo_frame_container').show();
			$('#market_buynow_dialog_bottom_buttons').hide();

			$('#market_buynow_dialog_cancel').show();
			$('#market_buynow_dialog_cancel_close').hide();

			var sCurrentURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
			this.m_sAddFundsReturnURL = encodeURIComponent( sCurrentURL + '#buy' + sElementPrefix + '|' + listingid + '|' + item['appid'] + '|' + item['contextid'] + '|'  + item['id'] );
			this.m_oListingOriginalRow = $('#' + sElementPrefix + '_' + listingid);

			var bNoWallet = g_rgWalletInfo['wallet_currency'] == 0;
			var sWalletCurrencyCode = GetCurrencyCode( g_rgWalletInfo['wallet_currency'] );
			var rgListing = g_rgListingInfo[listingid];
			if ( rgListing['converted_fee'] > 0 )
			{
				this.m_nSubtotal = rgListing['converted_price'];
				this.m_nFeeAmount = rgListing['converted_fee'];
				this.m_nTotal = rgListing['converted_price'] + rgListing['converted_fee'];

				var nFeePublisher = rgListing['converted_publisher_fee'];
				var nFeeSteam = rgListing['converted_steam_fee'];

				if ( this.m_nFeeAmount != nFeePublisher + nFeeSteam || this.m_nTotal != this.m_nSubtotal + nFeePublisher + nFeeSteam )
				{
					alert( "An unexpected error occurred trying to show the purchase dialog. Error: " + listingid + " " + this.m_nTotal + " " + this.m_nSubtotal + " " + this.m_nFeeAmount + " " + nFeePublisher + " " + nFeeSteam );
					return;
				}

				$('#market_buynow_dialog_totals_subtotal').html( v_currencyformat( this.m_nSubtotal, sWalletCurrencyCode ) );
				$('#market_buynow_dialog_totals_publisherfee').html( v_currencyformat( nFeePublisher, sWalletCurrencyCode ) );
				$('#market_buynow_dialog_totals_publisherfee_percent').html( ( rgListing['publisher_fee_percent'] * 100 ).toFixed(1) );
				if ( typeof g_rgAppContextData[rgListing['publisher_fee_app']] != 'undefined' )
				{
					$J('#market_buynow_dialog_totals_publisherfee_gamename').text( g_rgAppContextData[rgListing['publisher_fee_app']].name );
				}
				else
				{
					// No app data for some reason
					// Say "Game fee"
					$J('#market_buynow_dialog_totals_publisherfee_gamename').text( 'Gioco' );
				}
				$('#market_buynow_dialog_totals_transactionfee').html( v_currencyformat( nFeeSteam, sWalletCurrencyCode ) );
				$('#market_buynow_dialog_totals_transactionfee_percent').html( ( g_rgWalletInfo['wallet_fee_percent'] * 100 ).toFixed(1) );
				$('#market_buynow_dialog_totals_total').html( v_currencyformat( this.m_nTotal, sWalletCurrencyCode ) );
				$('#market_buynow_dialog_totals').show();
			}
			else
			{
				this.m_nSubtotal = rgListing['converted_price'];
				this.m_nFeeAmount = 0;
				this.m_nTotal = rgListing['converted_price'];
				$('#market_buynow_dialog_totals').hide();
			}

			var elEuSSA = $('#market_buynow_dialog_eu_ssa');
			if ( this.m_nTotal > g_rgWalletInfo['wallet_balance'] || bNoWallet )
			{
				$('#market_buynow_dialog_purchase').hide();
				$('#market_buynow_dialog_addfunds').show();
				$('#market_buynow_dialog_accept_ssa_container').hide();
				if ( elEuSSA )
				{
					elEuSSA.hide();
				}
			}
			else
			{
				$('#market_buynow_dialog_purchase').show();
				$('#market_buynow_dialog_addfunds').hide();
				$('#market_buynow_dialog_accept_ssa_container').show();
				if ( elEuSSA )
				{
					elEuSSA.show();
				}
			}

			if ( bNoWallet )
			{
				$('#market_buynow_dialog_walletbalance').hide();
			}
			else
			{
				$('#market_buynow_dialog_walletbalance').show();
				$('#market_buynow_dialog_walletbalance_amount').html( v_currencyformat( g_rgWalletInfo['wallet_balance'], sWalletCurrencyCode ) );
			}

			this.m_sElementPrefix = sElementPrefix;
			this.m_ulListingId = listingid;
			this.m_item = item;

			var oListingRow = this.m_oListingOriginalRow.clone();
			var oListingTable = this.m_oListingOriginalRow.parent().parent().clone();
			var oListingTableRowHeader = this.m_oListingOriginalRow.parent().children().first().clone();
			var oListingTableRows = this.m_oListingOriginalRow.parent().clone();
			oListingTableRows.html( oListingTableRowHeader );

			oListingRow.id = oListingRow.id + 'Copy';
			var oItemImg = oListingRow.find('.market_listing_item_img').first();
			if ( typeof oItemImg != 'undefined' )
				oItemImg.id = oItemImg.id + 'Copy';

			var oItemName = oListingRow.find('.market_listing_item_name').first();
			oItemName.id = oItemName.id + 'Copy';
			oListingTableRows.append( oListingRow );

			var oAvatarLink = oListingTableRows.find('a').each( function( item ) {
				item.target = '_new';
			});

			oListingTableRows.id = oListingTable.id + 'Copy';
			oListingTable.html( oListingTableRows );
			oListingTable.id = oListingTable.id + 'Copy';

			$('#market_buynow_dialog_item').html( oListingTable );
			if ( typeof oItemImg != 'undefined' )
				CreateItemHoverFromContainer( g_rgAssets, oItemImg.id, item.appid, item.contextid, item.id, item.amount );
			CreateItemHoverFromContainer( g_rgAssets, oItemName.id, item.appid, item.contextid, item.id, item.amount );
			$('hover').css("zIndex", "1001");

			this.m_fnDocumentKeyHandler = this.OnDocumentKeyPress;
			$(document).on( 'keydown', this.m_fnDocumentKeyHandler );

			showModal( 'market_buynow_dialog', true );
			$("#market_buynow_dialog_accept_ssa_container").hide();
			$('#market_buynow_dialog').focus();
			if($("#one-click-buy").attr("checked")){
				$("#market_buynow_dialog_purchase").click();
			}
		},

		DisplayError: function( error ) {
			$('#market_buynow_dialog_error').show();
			$('#market_buynow_dialog_error_text').html( error );
			$('#market_buynow_dialog_error_text').css("color" , "#ff0000");
		},

		Dismiss: function() {
			$(document).off( 'keydown', this.m_fnDocumentKeyHandler );
			hideModal( 'market_buynow_dialog' );
		},

		OnAddFunds: function( event ) {
			event.preventDefault();

			window.location = 'http://store.steampowered.com/steamaccount/addfunds?marketlisting=' + this.m_ulListingId + '&returnurl=' + this.m_sAddFundsReturnURL;
		},

		OnAccept: function( event ) {
			event.preventDefault();

			// If already accepted, ignore
			if ( this.m_bPurchaseSuccess || this.m_bPurchaseClicked )
			{
				return;
			}

			this.m_bPurchaseClicked = true;
			$('#market_buynow_dialog_error').hide();

			//$('market_buynow_dialog_purchase_throbber').clonePosition( $('market_buynow_dialog_purchase') );
			$('#market_buynow_dialog_purchase').hide();
			$('#market_buynow_dialog_purchase_throbber').show();
			$('#market_buynow_dialog_purchase_throbber').fadeTo("0", "1");

			var listingid = this.m_ulListingId;
			new Ajax.Request( 'http://steamcommunity.com/market/buylisting/' + listingid, {
				method: 'post',
				parameters: {
					sessionid: g_sessionID,
					currency: g_rgWalletInfo['wallet_currency'],
					subtotal: this.m_nSubtotal,
					fee: this.m_nFeeAmount,
					total: this.m_nTotal
				},
				onSuccess: function( transport ) { NewBuyItemDialog.OnSuccess( transport ); },
				onFailure: function( transport ) { NewBuyItemDialog.OnFailure( transport ); }
			} );
		},

		OnCancel: function( event ) {
			this.Dismiss();
			event.preventDefault();
		},

		OnSuccessEffects: function() {
			$('#market_buynow_dialog_cancel').hide();
			$('#market_buynow_dialog_cancel_close').show();
			
			$('#market_buynow_dialog_purchase_throbber').hide();
			$('#market_buynow_dialog_paymentinfo_frame_container').hide();
			$('#market_buynow_dialog_purchasecomplete_message').show();
			$('#market_buynow_dialog_bottom_buttons').show();

			// Replace the listing row with a message that says this was purchased
			var oOriginalItemName = this.m_oListingOriginalRow.find('.market_listing_item_name').first().clone();
			this.m_oListingOriginalRow.html('');

			var elMessage = new Element( 'div', {'class': 'market_listing_purchase_message' } );
			var sItemNameSpanId = this.m_sElementPrefix + '_purchased_' + this.m_ulListingId;
			elMessage.html(
					'Hai acquistato <%1$s></%2$s>. Visualizzalo nel tuo <%3$s>inventario</%4$s>.'
						.replace( '%1$s', 'span id="' + sItemNameSpanId + '"' )
						.replace( '%2$s', 'span' )
						.replace( '%3$s', 'a href="http://steamcommunity.com/my/inventory/"' )
						.replace( '%4$s', 'a' ) );

			this.m_oListingOriginalRow.append( elMessage );
			$(sItemNameSpanId).append( oOriginalItemName );
		},

		OnSuccess: function( transport ) {
			this.m_bPurchaseSuccess = true;

			if ( transport.responseJSON )
			{
				var rgNewWalletInfo = transport.responseJSON.wallet_info;
				if ( rgNewWalletInfo && rgNewWalletInfo.success )
				{
					g_rgWalletInfo = rgNewWalletInfo;
				}

				var sWalletCurrencyCode = GetCurrencyCode( g_rgWalletInfo['wallet_currency'] );
				$('marketWalletBalanceAmount').html( v_currencyformat( g_rgWalletInfo['wallet_balance'], sWalletCurrencyCode ) );
				
				this.OnSuccessEffects();
			}
			else
			{
				this.OnFailureEffects();
				this.DisplayError( 'Si Ã¨ verificato un problema durante l\'acquisto dell\'oggetto. L\'inserzione potrebbe essere stata rimossa. Aggiorna la pagina e riprova.' );
			}
		},

		OnFailureEffects: function() {
			//stop all effects
			
			$('market_buynow_dialog_purchase').show();
			$('market_buynow_dialog_purchase').fadeTo('0', '0');
			$('market_buynow_dialog_purchase').fadeTo('0', '1');
			$('market_buynow_dialog_purchase_throbber').hide();
		},

		OnFailure: function( transport ) {
			this.m_bPurchaseClicked = false;
			this.OnFailureEffects();

			if ( transport.responseJSON && transport.responseJSON.message )
			{
				this.DisplayError( transport.responseJSON.message );
			}
			else
			{
				this.DisplayError( 'Si Ã¨ verificato un problema durante l\'acquisto dell\'oggetto. L\'inserzione potrebbe essere stata rimossa. Aggiorna la pagina e riprova.' );
			}
		},

		OnDocumentKeyPress: function( event ) {
			if ( event.keyCode == Event.KEY_ESC )
			{
				this.Dismiss();
				event.preventDefault();
			}
		},

		OnInputKeyPress: function( event ) {
			if ( event.keyCode == Event.KEY_RETURN )
			{
				if ( this.m_bPurchaseSuccess )
				{
					this.OnConfirmationAccept( event );
				}
				else
				{
					this.OnAccept( event );
				}
			}
		},

		OnInputKeyUp: function( event ) {

		}
};



var stylize = function(){
	$(".market_listing_row span.market_listing_price_with_fee").each(function( index ) {
		$(this).css("font-size", "18px");
		$(this).css("line-height", "18px");
		$(this).css("font-weight", "bold");
		$(this).css("display", "block");
	});
	$(".market_listing_row span.market_listing_price_without_fee").each(function( index ) {
		var cont = $(this).html();
		$(this).html("("+cont+")");
		$(this).css("font-size", "10px");
		$(this).css("line-height", "10px");
		$(this).css("color", "#ccc");
		$(this).css("display", "block");
		$(this).css("margin-top", "5px");
	});
	$("div.market_listing_row").each(function(){
		
		var tempDiv = $(this).find("div.market_listing_buy_button");
		var tempOrigHref = tempDiv.find("a").attr("href");
		if (tempOrigHref != undefined){
			var tempChunks = tempOrigHref.split("(");
			
			
			
			var tempHref = "javascript:MarketEnhancer.NewBuyMarketListing(" + tempChunks[1];

			var newButton = "<a class='script-buy-button' href=\"" + tempHref + "\" >BAI NAU</a>";
			tempDiv.append(newButton);
			
			
			
		}
		
		
	});
	
	$(".script-buy-button").css({
		"display": "block",
		"width": "100%",
		"height": "24px",
		"background": "#01b0f0",
		"border-bottom": "4px solid #000000",
		"line-height": "24px",
		"font-weight": "bold",
		"color": "#ffffff",
		"margin-top": "4px",
	});
	
	$(".script-buy-button").hover(
			function(){
				$(this).css({
					"background": "#aeee00",
				});
			}, 
			function(){
				$(this).css({
					"background": "#01b0f0",
				});
			}
	);
	
	$(".market_listing_buy_button").css({
		"margin-top": "10px",
	});
};

var buyItem = function(id){
	
	var temp = id.split("_");
	var listID = temp[1];
	var elementPrefix = temp[0];
	var originalListingRow = elementPrefix + "_" + listID;
	
	$("#market_buynow_dialog").show();
	var rgListing = g_rgListingInfo[listID];
	BuyItemDialog.m_sElementPrefix = elementPrefix;
	BuyItemDialog.m_oListingOriginalRow = $(originalListingRow);
	BuyItemDialog.m_nSubtotal = rgListing['converted_price'];
	BuyItemDialog.m_nFeeAmount = rgListing['converted_fee'];
	BuyItemDialog.m_nTotal = rgListing['converted_price'] + rgListing['converted_fee'];

	BuyItemDialog.nFeePublisher = rgListing['converted_publisher_fee'];
	BuyItemDialog.nFeeSteam = rgListing['converted_steam_fee'];
	
	BuyItemDialog.m_ulListingId = listID;
	$("input#market_buynow_dialog_accept_ssa").prop('checked', true);
	var obj = function()
	{
		this.stop = function(){
			console.log("please stahp");
		};
	};
	BuyItemDialog.OnAccept(new obj());
};

var waitForSuccess = function(){
	console.log("waitForSuccess");
	if(BuyItemDialog.m_bPurchaseSuccess === true){
		console.log("success, reloading");
		location.reload();
	}
};

var setLoading = function(status){
	if(status === true){
		$("#loading-wheel").show();
	}
	else{
		$("#loading-wheel").hide();
	}
};

var commands = '<div id="script-commands">' +
					'<div class="row">' +
						'<div class="three columns">' +
							'<div><a href="#" id="button-refresh">REFRESH NOW</a></div>' +
						'</div>' +
					'</div>' +
					'<div class="row">' +
						'<div class="three columns">' +
							'<label class="checkbox" for="auto-refresh">' +
								'<input type="checkbox" name="auto-refresh" value="auto-refresh" id="auto-refresh" />' +
								'<span></span> AUTO REFRESH' +
							'</label>' +
						'</div>' +
					'</div>' +
					'<div class="row">' +
						'<div class="three columns">' +
							'<label class="checkbox" for="one-click-buy">' +
								'<input type="checkbox" name="one-click-buy" value="one-click-buy" id="one-click-buy" />' +
								'<span></span> 1 CLICK BUY' +
							'</label>' +
						'</div>' +
					'</div>' +
		"<div><img id='loading-wheel' src='http://www.lettersmarket.com/uploads/lettersmarket/blog/loaders/common_blue/ajax_loader_blue_512.gif' /></div>" +
		"<div><p id='script-error'></p></div>" + 
		"</div>";
//$("head").append('<link rel="stylesheet" href="http://gumbyframework.com/css/demo.css" type="text/css" />');
$("body").append(commands);
$("#script-commands").css({
	"z-index": "9001",
	"position": "fixed",
	"top": "5px",
	"right": "5px",
	"background": "#222222",
	"opacity": "0.9",
	"color": "#dddddd",
	"text-align": "center",
	"width": "200px",
	"border": "1px dashed #dddddd",
});

$("#script-commands div.row").css({
	"text-align": "center",
	"margin": "5px 2px",
});

$("#loading-wheel").css({
	"width": "50px",
	"height": "50px",
});

$("#button-refresh").css({
	"display": "block",
	"width": "100%",
	"height": "44px",
	"background": "#01b0f0",
	"border-bottom": "4px solid #000000",
	"line-height": "44px",
	"font-weight": "bold",
	"color": "#ffffff",
});



$("#button-refresh").hover(
		function(){
			$(this).css({
				"background": "#aeee00",
			});
		}, 
		function(){
			$(this).css({
				"background": "#01b0f0",
			});
		}
);

setLoading(false);
$("#button-refresh").click(function(event){
	event.preventDefault();
	setLoading(true);
	
	$.ajax(g_oSearchResults.m_strActionURL + "render").done(function(data){
		
		
		
		if (data['success'] == true){
			var response = {};
			response.responseJSON = data;
			response.success = true;
			g_oSearchResults.OnResponseRenderResults(response);
			stylize();
		}
		else{
			
			showError("ERROR !#!#");
			
		}
		
	}).fail(function(){
		showError("ERROR !#!#");
	}).always(function(){
		setLoading(false);
	});
});
stylize();

var showError = function(error){
	$("#script-error").html(error).delay(1000).html("");
};

MarketEnhancer = {
		
		NewBuyMarketListing: function( sElementPrefix, listingid, appid, contextid, itemid )
		{
			if ( !g_bLoggedIn )
			{
				showModal( 'NotLoggedInWarning', true );
				return;
			}

			if ( !g_rgAssets[appid] || !g_rgAssets[appid][contextid] || !g_rgAssets[appid][contextid][itemid] )
			{
				return;
			}
			
			NewBuyItemDialog.Show( sElementPrefix, listingid, g_rgAssets[appid][contextid][itemid] );
		}

};