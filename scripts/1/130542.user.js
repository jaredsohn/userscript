// ==UserScript==
// @author         StefanR
// @name           dont_distribute_this_or_i_will_turnit_of
// @namespace      dont_distribute_this_or_i_will_turnit_of
// @description    dont_distribute_this_or_i_will_turnit_of
// @version        1.389
// @include        http://www.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var ResistanceForceInsert = function($, window, undefined) {
	function rwHelper() {
		if(!alreadyFunder && !$(this).hasClass('disabled')){
			$.post('/en/military/rw-support', {type : 'fund', _token: SERVER_DATA.csrfToken}, function(response){
				if(!response.error){
					alreadySupporter = true;
					alreadyFunder = true;
					if(SERVER_DATA.funders_count + 1 == 10){
						$("div.fighters_needed p").html("The resistance war will start any minute now!");
					}
					financeIt();
					if(SERVER_DATA.is_citizen){
						var ca;						
						ca = $('.citizenship_currency_amount strong');
						var currency_ammount = parseInt(ca.html())
						ca.html(currency_ammount - 1000);
					}
					$('#funders_count_small').text(SERVER_DATA.funders_count + 1);
					$('#funders_count').text(10 - SERVER_DATA.funders_count - 1);
					$("#fundRW_btn").addClass('disabled')
						.attr("title", SERVER_DATA.messages["already_funder"])
						.tipsy({gravity: 's'});
					$("#supportRW_btn").addClass('disabled')
						.attr("title", SERVER_DATA.messages['confirm_supporter'])
						.tipsy({gravity: 's'});
				}else{
					if(response.message == "ALREADY_FUNDED"){
						alreadySupporter = true;
						alreadyFunder = true;
						$("#fundRW_btn").addClass('disabled')
							.attr("title", SERVER_DATA.messages["already_funder"])
							.tipsy({gravity: 's'});
						$("#supportRW_btn").addClass('disabled')
							.attr("title", SERVER_DATA.messages['confirm_supporter'])
							.tipsy({gravity: 's'});
					}else if(response.message == "RECENTLY_CONQUERED"){
						rwError(SERVER_DATA.messages['err_too_early']+response.time);
					}else if(response.message == "ONGOING_RW_CAMPAIGN"){
						rwError(SERVER_DATA.messages['err_ongoing_rw']+response.region);
					}else if(response.message == "ONGOING_CAMPAIGN"){
						rwError(SERVER_DATA.messages['err_ongoing']);
					}else if(response.message == "INSUFFICIENT_FUNDS"){
						rwError(SERVER_DATA.messages['err_funds']);
					}
				}
			}, 'json');
		}else{
			rwError(SERVER_DATA.messages['already_funder']);
		}
	};
	$(document).ready(function () {
		if (location.href == 'http://www.erepublik.com/en') {
			if ($('#fundRW_btn').length > 0) {
				rwHelper();
			} else {
				// autoRefresh
			}
		}
	});
};
// Script Insert
var script = document.createElement('script');
script.textContent = '(' + ResistanceForceInsert + ')(jQuery, window);';
document.body.appendChild(script);