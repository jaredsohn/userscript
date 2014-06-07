// ==UserScript==
// @name			Discogs.com bulk change public-comment-field
// @version			0.2
// @namespace		https://github.com/gill0r/discogs-bulk-comment-field-userscript/
// @description		Allows bulk changing the public-comment-field of your selling items (prepend, suffix and remove text)
// @updateURL		https://raw.github.com/gill0r/discogs-bulk-comment-field-userscript/master/discogs_bulk.user.js
// @include			https://www.discogs.com/sell/manage_edit
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

showMenu();

function showMenu() {
	if (!jQuery) {
		alert("'Bulk change public-comment-field' can not be used. Please file a bug at https://github.com/gill0r/discogs-bulk-comment-field-userscript/issues");
		return false;
	}
	if ($("#userscript_bulk_menu_closed")) 
		$("#userscript_bulk_menu_closed").slideUp().delay(1000).remove();

	var menuElement = document.createElement('div');
	menuElement.id = 'userscript_bulk_menu';
	menuElement.style.display = 'none';

	var menuHtml = '<h3>"Bulk change public-comment-field" Userscript options</h3><p>Please choose what you want to do:</p><ul>';
	menuHtml += '<li><a id="user_prepend">Prepend text</a></li>';
	menuHtml += '<li><a id="user_suffix" href="javascript:suffixText(null)">Suffix text</a></li>';
	menuHtml += '<li><a id="user_replace" >Replace text</a></li>';
	menuHtml += '<li><a id="user_give_discount">Give discount</a></li>';
	menuHtml += '<li><a id="user_reset_discount">Restore price before discount</a></li>'
	menuHtml += '<li><a id="user_round_up">Round prices up to first decimal after seperator</a></li>';
	menuHtml += '</ul><p><a href="https://github.com/gill0r/discogs-bulk-comment-field-userscript/issues">Something is broken? Please file a bug!</a></p>';
	menuHtml += '<p><a id="user_close">Hide the script options</a></p>';

	menuElement.innerHTML = menuHtml;

	$("#page  h2").after(menuElement);

	document.getElementById('user_prepend').addEventListener("click",
			prependText);
	document.getElementById('user_suffix')
			.addEventListener("click", suffixText);
	document.getElementById('user_replace').addEventListener("click",
			replaceText);
	document.getElementById('user_give_discount').addEventListener("click", setDiscount);
	document.getElementById('user_reset_discount').addEventListener("click", restoreDiscount);
	document.getElementById('user_round_up').addEventListener("click", roundUpPrices);
	document.getElementById('user_close').addEventListener("click", hideMenu);

	$("#userscript_bulk_menu").slideDown();
}

function hideMenu(event) {
	var menuElement = document.createElement('div');
	menuElement.id = 'userscript_bulk_menu_closed';
	menuElement.innerHTML = '<p><a id="user_reopen">&rarr; Show advanced seller options (delivered by Userscript)</a></p>';
	$("#userscript_bulk_menu").after(menuElement);

	document.getElementById('userscript_bulk_menu_closed').addEventListener(
			"click", showMenu);

	$("#userscript_bulk_menu").slideUp().delay(1000).remove();
}

function prependText(event) {
	var text = prompt("Enter the text to prepend");
	if (text == null || text == "")
		return;
	$('textarea[name$="comments"]').each(function(i, e) {
		$(e).val(text + " " + $(e).val());
	});
}

function suffixText(event) {
	var text = prompt("Enter the text to suffix:");
	if (text == null || text == "")
		return;
	$('textarea[name$="comments"]').each(function(i, e) {
		$(e).val($(e).val() + " " + text);
	});
}

function replaceText(event) {
	var textToReplace = prompt("Enter the text which should be replaced:");
	if (textToReplace == "") {
		alert("You have to enter a text to replace!");
		return false;
	}

	var text = prompt("Enter the text which should be written instead:");
	if (text == null)
		text = "";

	$('textarea[name$="comments"]').each(function(i, e) {
		$(e).val($(e).val().replace(textToReplace, text));
	});
}

function setDiscount(event) {
	var discount = prompt("Which discount would you like to give (e.g. enter '0.9' for 10% off)?");
	if (discount == null || discount == "") {
		alert("You have to enter a valid number!");
		return false;
	}
	
	$('.item_price').each(function(i, e) {
		$(e).val(($(e).val() * discount).toFixed(2));
	})
}

function restoreDiscount(event) {
	var discount = prompt("Which discount did you give (e.g. 0.9)?");
	if (discount == null || discount == "") {
		alert("You have to enter a valid number!");
		return false;
	}
	
	$('.item_price').each(function(i, e) {
		$(e).val(($(e).val() / discount).toFixed(2));
	})
}

function roundUpPrices(event) {
	var doRound = confirm("Do you really want to round the prices up?");
	if (doRound == null || !doRound) {
		return false;
	} 
	
	$('.item_price').each(function(i, e) {
		$(e).val((Math.ceil($(e).val()*10)/10).toFixed(2));
	})
}