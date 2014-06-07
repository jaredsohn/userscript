// ==UserScript==
// @name          AT&T GoPhone History Summary
// @version       1
// @date          2012-02-26
// @description   Shows a summary of usage for the given time period in Account History.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2012 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; ABSOLUTELY NO WARRANTY
// @resource      license https://www.gnu.org/licenses/gpl-3.0.txt
// @require       http://code.jquery.com/jquery-1.7.1.min.js
// @include       https://www.paygonline.com/websc/ViewAccountHistorySubmit.do
// ==/UserScript==

// it makes more sense to go through the events in chronological order (reverse of what is given)
// http://stackoverflow.com/questions/1394020/jquery-each-backwards/5386150#5386150
jQuery.fn.reverse = [].reverse;

var stats = document.createElement('div');
$(stats).html('<em>Calculating summary for this view...</em>');
var infoDiv = $('div.cella')[1];
$(infoDiv).append($(stats));

iframe = $('iframe')[0];
$(iframe).load(function() {
	totalCalls = 0;
	totalMinutesUsed = 0;
	totalSMSIn = 0;
	totalSMSOut = 0;
	totalUsageCharges = 0;

	// get info about each event
	var eventInfo = $(iframe).contents().find('a[href*=openCallDetail]').reverse();
	eventInfo.each(function() {
		// we can use a lookahead to exclude single quotes but it's extremely slow:
		// thisEventInfo = $(this).attr('href').match(/[^']*(?='[,)])/g);
		thisEventInfo = $(this).attr('href').match(/'[^']*'/g);

		// some possibly useful openCallDetail arguments:
		// 1: type of event
		// 4: call duration
		// 5: supposed to be minutes charged, but always 0
		// 10: balance before call
		// 28: airtime charge
		// 29: balance after call
		// 34: number of free minutes used

		eventType = thisEventInfo[1];
		countUsageCharge = false;
		if (eventType == "'Incoming Call'" || eventType == "'Outgoing Call'" || eventType == "'Voicemail Retrieval'") {
			// calculate the airtime of the call from the duration
			// this may not be the most accurate way, so prefer the exact number if we can get it.
			var duration = thisEventInfo[4].match(/((\d+)hr )?(\d+)min (\d+)sec/);
			var hours = (duration[2] == null) ? 0 : parseInt(duration[2]);
			var minutes = parseInt(duration[3]);
			var seconds = parseInt(duration[4]);
			var airtimeMinutes = (hours * 60) + minutes + ((seconds == 0) ? 0 : 1);

			var freeMinutesUsed = parseInt(thisEventInfo[34].match(/\d+/));

			// if this call was covered by our unlimited plan
			if (freeMinutesUsed > 0) {
				totalCalls++;
				// we didn't have to pay anything for this call
				if (freeMinutesUsed == airtimeMinutes) {
					totalMinutesUsed += freeMinutesUsed;
				}
				// we ran out of free minutes during this call - use the count of minutes from the duration
				else {
					totalMinutesUsed += airtimeMinutes;
					countUsageCharge = true;
				}
			}
			else {
				// if this call wasn't covered by our unlimited plan and we were charged for it
				if (thisEventInfo[10] != thisEventInfo[29]) {
					totalCalls++;
					totalMinutesUsed += airtimeMinutes;
					countUsageCharge = true;
				}
				// otherwise this call wasn't unlimited, but we weren't charged.
				// it must have been very short (maybe it went to voicemail), so don't count it for anything.
			}
		}
		else if (eventType.substring(1,4) == 'SMS') {
			if (eventType == "'SMS Terminating'") {
				totalSMSIn++;
			}
			else if (eventType == "'SMS Originating'") {
				totalSMSOut++;
			}
			countUsageCharge = true;
		}
		// FIXME: doesn't look for data charges, I don't have a data plan

		if (countUsageCharge) {
			var amountChargedStr = thisEventInfo[28];
			var amountCharged = parseFloat(amountChargedStr.substring(1, amountChargedStr.length - 1));
			totalUsageCharges += amountCharged;
		}
	});

	// format the output
	if (totalCalls > 0) {
		minutesPerCall = totalMinutesUsed / totalCalls;
		minutesPerCallStr = ' (' + minutesPerCall.toFixed(1) + ' minutes per call)';
	}
	else {
		minutesPerCallStr = '';
	}

	totalSMS = totalSMSIn + totalSMSOut;
	if (totalSMS > 0) {
		totalSMSStr = ' (' + totalSMSIn + ' in, ' + totalSMSOut + ' out)';
	}
	else {
		totalSMSStr = '';
	}

	totalUsageCharges = totalUsageCharges.toFixed(2);
	$(stats).html('<strong>Summary:</strong><br />Total minutes: <strong>' + totalMinutesUsed + '</strong> in ' + totalCalls + ' calls' + minutesPerCallStr + '<br />Total SMS: <strong>' + totalSMS + '</strong>' + totalSMSStr + '<br />Total usage charges: <strong>$' + totalUsageCharges + '</strong>');
});
