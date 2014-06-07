// ==UserScript==
// @name        IF-Hack
// @namespace   http://www.github.com/ddablo
// @description Interest filter hack
// @include     http://www.linkedin.com/requestList*
// @include     https://www.linkedin.com/requestList*
// @include		http://www.linkedin.com/request*
// @include		https://www.linkedin.com/request*
// @include		http://www.linkedin.com/mbox*
// @include		https://www.linkedin.com/mbox*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     https://raw.github.com/allmarkedup/jQuery-URL-Parser/master/purl.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @version     1.2.2
// ==/UserScript==

const IS_LIVE = true;
const addr = IS_LIVE ? 'http://if-hack.herokuapp.com/' : 'http://localhost:3002/';

String.prototype.replaceAt = function(index, char) {
	return this.substr(0, index) + char + this.substr(index+char.length);
}

String.prototype.capitalize = function()
{
	return this.charAt(0).toUpperCase() + this.slice(1);
}

const dir = $.url().attr('directory');
const isInDeclineInMail = dir == '/request';
const isInJobOffer = dir == '/requestList';
const isInMessageBody = dir == '/mbox';

if(isInJobOffer){
	var fullToName = $('.elem.textonly').first().html();
	var firstToName = fullToName.match(/\w+/g)[0];

	var pressCount = 0;
	var uidOfRecepient = null;
	const NOT_INTERESTED_MSG_HTML_PREFIX = '<div id="not-interested-msg"><font color="red"><h3>' + firstToName + // take first name 
	' is not interested in:</h3><p>';
	const NOT_INTERESTED_MSG_HTML_SUFFIX = '</p></font></div>';


	var handleInMailBodyTextChange = function(event){
		while (pressCount++ != 5)
			return;

		pressCount = 0;

		var text = $('#document-create_proposal').val();
		var queryStr = '?uid=' + uidOfRecepient + '&text=' + text;

		$.getJSON(addr + 'ifilter/extract_text' + queryStr,function(data){
			text = $('#document-create_proposal').val(); //get the current text again, because it may take time to receive the data in which the text may have changed.
			var notInterestedMsgHtml = NOT_INTERESTED_MSG_HTML_PREFIX;
			var notInteredtedCount = 0;
			$(".non_interested_tips").remove();

			if(data.pref_company_size){
				notInterestedMsgHtml = notInterestedMsgHtml.concat((data.pref_company_size == 'big' ? 'Small' : 'Big') + ' companies, ');
				notInteredtedCount++;

				$(".tips").append('<li class="non_interested_tips">' +
					'<div class="count">' + ($(".tips li").size() + 1) + '</div>' +
					'<div class="details">The recipient is not interested in ' + (data.pref_company_size == 'big' ? 'small' : 'big') + ' companies - in despite of that, try to explain why your company may be still suitable for him.</div>' +
					'</li>');
			}

			if(data.pref_min_position){
				notInterestedMsgHtml = notInterestedMsgHtml.concat(' Positions worse than ' + data.pref_min_position + ', ');
				notInteredtedCount++;

				$(".tips").append('<li class="non_interested_tips">' +
					'<div class="count">' + ($(".tips li").size() + 1) + '</div>' +
					'<div class="details">The position that you are offering seems to be to low for the recipient - try to explain why he should still be interested in this position.</div>' +
					'</li>');
			}

			for (var idx = 0; idx < data.found_techs.length; idx++) {
				var word = data.found_techs[idx].name;
				var isInterested = data.found_techs[idx].is_interested ;

				if(!isInterested){
					notInteredtedCount++;
					notInterestedMsgHtml = notInterestedMsgHtml.concat(word.capitalize() + ', ');
				}
			}

			$('#not-interested-msg').remove();

			if(notInteredtedCount > 0){
				//replace last comma (from 'for' loop...) with a dot, and append prefix
				notInterestedMsgHtml = notInterestedMsgHtml.replaceAt(notInterestedMsgHtml.length - 2, ".").concat(NOT_INTERESTED_MSG_HTML_SUFFIX);
				$('.info-side').append(notInterestedMsgHtml);
			}
		});
}

var handleInMailSendMsgClick = function(event){
	if($('#not-interested-msg').length > 0){
		alert('Notice that this mail may not interest ' + $('#compose-dialog-member-name').html() + '.');
	}
}

uidOfRecepient = $.url().param('destID');
$('#document-create_proposal').keypress(handleInMailBodyTextChange); //in proposal html
}
else if(isInDeclineInMail){
	var createNotInterestedDataHtml = function(){
		return '<div id="notIterestedFeedback"><h3>Select the technologies that you are not interested in this InMail:</h3>' +
		'<input class="techSelector" type="checkbox" name="technologies" value="node.js">Node.JS</input><br>' +
		'<input class="techSelector" type="checkbox" name="technologies" value="java">Java</input><br>' +
		'<input class="techSelector" type="checkbox" name="technologies" value="c#">C#</input><br>' +
		'<input class="techSelector" type="checkbox" name="technologies" value="javascript">Javascript</input><br>' +
		'UID: <input type="text" id="uid"></input><br><br></div>';
	}

	var createNorInterestedReasonsList = function(){
		return '<li id="decline-bad-timing"><input name="reason" class="hack-reason" value="55" id="55-reason-reject_proposal_no_ref" type="radio">' +
		'<label for="55-reason-reject_proposal_no_ref"> Company size is not suitable for me.</label></li>' +
		'<li id="decline-bad-timing"><input name="reason" value="55" class="hack-reason" id="55-reason-reject_proposal_no_ref" type="radio">' +
		'<label for="55-reason-reject_proposal_no_ref"> I am interested in a higher position.</label></li>';
	}

	var handleSendClick = function(event){
		if($('#uid').val().length == 0){
			alert('Please input UID!');
			return event.preventDefault();
		}

		const isNotSuitableCompanySizeSelected = $('.hack-reason').eq(0).is(':checked');
		const isNotSuitablePositionSelected = $('.hack-reason').eq(1).is(':checked');

		var data = {company_size_not_suitable : isNotSuitableCompanySizeSelected, company_name: GM_getValue('company_name'), position_not_suitable : isNotSuitablePositionSelected, minimum_position: GM_getValue('min_pos'), technologies : []};

		$('.techSelector:checked').each(function(index) { 
			data.technologies.push($(this).val());
		});

		alert("Please wait for 'OK'");

		$.post(addr + 'ifilter/feedback?uid=' + $('#uid').val(), data, function(){
			alert('OK');
		});

		GM_deleteValue("company_name");
		GM_deleteValue("min_pos");

	}

	$(createNorInterestedReasonsList()).insertBefore('#decline-bad-timing');
	$(createNotInterestedDataHtml()).insertAfter('#decline-list'); //in not interested html
	$('.btn-primary').click(handleSendClick);
}
else if(isInMessageBody){
	GM_deleteValue("company_name");
	GM_deleteValue("min_pos");

	var offer_body = $('.text').text();

	if (offer_body[0] == '['){
		var end = offer_body.indexOf(']');
		if (end != -1){
			var companyName = offer_body.substring(1, end);
			GM_setValue("company_name", companyName);
		}
	}

	var posPattern = /\[p(\d)\]/g;
	var match = posPattern.exec(offer_body);
	
	if(match != null && match.length > 1){
		var minPos = match[1];
		GM_setValue("min_pos", minPos);
	}	
}