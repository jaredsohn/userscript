// ==UserScript==
// @name           hughes_usage_calc
// @namespace      tag:direcpc.com,2007-10-05:astra
// @description    Calculates remaining download capacity on HughesNet's usage page. Revision 8
// @include        http://customercare.myhughesnet.com/act_usage.cfm*
// ==/UserScript==

// Main Options Here
var renaming = true;
var remove_min_used = true;
var siteid;

function setAttr(node, name, value)
{
	var attr = document.createAttribute(name);
	attr.nodeValue = value;
	node.setAttributeNode(attr);
}

function setBG(node, value)
{
	setAttr(node, "bgcolor", value);
}

function edit_bucket()
{
	var new_size = prompt("Enter a new download threshold (MB): ");
	if (Number(new_size) > 0)
	{
		GM_setValue("bucket_size", new_size.toString());
	}
	update_page(true);
}

function edit_refill()
{
	var new_rate = prompt("Enter a new recovery rate (MB/hr): ");
	if (Number(new_rate) > 0)
	{
		GM_setValue("refill_rate", new_rate.toString());
	}
	update_page(true);
}

function reset_refill()
{
	var new_rate = Number(GM_getValue("bucket_size", 200)) / 24;
	GM_setValue("refill_rate", new_rate.toString());
	update_page(true);
}

function prepare_page()
{
	// Find the siteid (for linking to another month's usage)
	var str = document.evaluate(
		"//strong/text()",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue.textContent;

	var res = str.match(/Site ID:\s+(\w+)/m)
	if (res && res.length == 2) {
		siteid = res[1]
	}

	// Prepare the page...
	var thisCell = document.evaluate(
		"//td[position()=6 and @bgcolor='#003399']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;

	var node = document.createElement("td");
	node.innerHTML = "<font color=\"#fffff\">Remaining (MB)</font>";
	setAttr(node, "class", "mainText");
	setAttr(node, "width", "100");
	setAttr(node, "align", "center");
	setBG(node, "#003399");

	thisCell.parentNode.insertBefore(node, thisCell);

	if (renaming) {
		thisCell.innerHTML = "<font color=\"#fffff\">FAPPED?</font>";

		var cells = thisCell.parentNode.getElementsByTagName("td");
		cells[4].innerHTML = "<font color=\"#fffff\">Download (MB)</font>";
		cells[7].innerHTML = "<font color=\"#fffff\">Upload (MB)</font>";
	}

	// Remove useless "Min Used"
	if (remove_min_used) {
		thisCell.parentNode.removeChild(cells[3]);
	}

	var thisRow = document.createElement("tr");
	thisRow.appendChild(document.createElement("td"));
	setAttr(thisRow.firstChild, "colspan", remove_min_used ? 7 : 8);
	setAttr(thisRow.firstChild, "id", "fap_legend");
	thisCell.parentNode.parentNode.insertBefore(thisRow, thisCell.parentNode.previousSibling.previousSibling);

	thisRow = document.createElement("tr");
	thisRow.appendChild(document.createElement("td"));
	setAttr(thisRow.firstChild, "colspan", remove_min_used ? 7 : 8);
	setAttr(thisRow.firstChild, "id", "fap_message");
	thisCell.parentNode.parentNode.insertBefore(thisRow, thisCell.parentNode.previousSibling.previousSibling);

	var allRows = document.evaluate(
		"//td[@class='mainText' and position()=6 and (not(@bgcolor) or @bgcolor!='#003399')]/..",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < allRows.snapshotLength; i++) {
		var thisRow = allRows.snapshotItem(i);
		var cells = thisRow.getElementsByTagName("td");

		var node = document.createElement("td");
		setAttr(node, "class", "mainText");
		setAttr(node, "align", "right");
		thisRow.insertBefore(node, cells[5]);

		if (remove_min_used) {
			thisRow.removeChild(cells[3]);
		}
	}
}

function update_page(paramChanged)
{
	var bucket_size = Number(GM_getValue("bucket_size", 200));
	var refill_rate = Number(GM_getValue("refill_rate", bucket_size / 24));

	// Warning levels
	var fap_warning_level = bucket_size * 0.15;
	var fap_caution_level = bucket_size * 0.30;
	var fap_notice_level = bucket_size * 0.45;

	// Colors
	var fap_exceeded_color = "#ff3333";		// Red
	var fap_warning_color = "#ffaa33";		// Orange
	var fap_caution_color = "#ffff33";		// Yellow
	var fap_notice_color = "#66ccff";		// Blue
	var fap_all_clear_color = "#66ff66";		// Green

	var fap_free_color = "#cccccc";				// Grey

	var fap_legend = document.getElementById("fap_legend");
	fap_legend.innerHTML = "<table width=\"100%\">\n\
<tr><td colspan=\"3\">\n\
Download Threshold: " + bucket_size + " MB\n\
&nbsp;&nbsp;&nbsp;<a id=\"edit_bucket\">[edit]</a>\n\
</td><td colspan=\"3\">\n\
Recovery rate: " + refill_rate.toFixed(2) + " MB/hr\n\
&nbsp;&nbsp;&nbsp;<a id=\"edit_refill\">[edit]</a>\n\
&nbsp;&nbsp;<a id=\"reset_refill\">[reset]</a>\n\
</td></tr>\n\
<tr>\n\
<td width=\"100\" bgcolor=\"" + fap_exceeded_color + "\">FAP Exceeded</td>\n\
<td width=\"100\" bgcolor=\"" + fap_warning_color + "\"> &lt; " + fap_warning_level + " MB</td>\n\
<td width=\"100\" bgcolor=\"" + fap_caution_color + "\">" + fap_warning_level + " MB - " + fap_caution_level + " MB</td>\n\
<td width=\"100\" bgcolor=\"" + fap_notice_color + "\">" + fap_caution_level + " MB - " + fap_notice_level + " MB</td>\n\
<td width=\"100\" bgcolor=\"" + fap_all_clear_color + "\">&gt; " + fap_notice_level + " MB</td>\n\
<td width=\"100\" bgcolor=\"" + fap_free_color + "\">FAP Free Zone</td>\n\
</tr>\n\
</table>";

	var editLink = document.getElementById("edit_bucket");
	editLink.addEventListener("click", edit_bucket, false);

	editLink = document.getElementById("edit_refill");
	editLink.addEventListener("click", edit_refill, false);

	editLink = document.getElementById("reset_refill");
	editLink.addEventListener("click", reset_refill, false);

	var allRows, thisRow, lastDate, lastHour;
	var bucket_cur=bucket_size;
	var sum2=0;

	allRows = document.evaluate(
		"//td[@class='mainText' and position()=6 and (not(@bgcolor) or @bgcolor!='#003399')]/..",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < allRows.snapshotLength; i++) {
		thisRow = allRows.snapshotItem(i);
		var cells = thisRow.getElementsByTagName("td");
		var date = cells[0].textContent;
		var startHour = parseInt(cells[1].textContent, 10);
		var endHour = parseInt(cells[2].textContent, 10);

		var usage, fap;
		if (remove_min_used)
		{
			usage = parseFloat(cells[3].textContent); // + parseFloat(cells[6].textContent);
			fap = cells[5].textContent;
		}
		else
		{
			usage = parseFloat(cells[4].textContent); // + parseFloat(cells[7].textContent);
			fap = cells[6].textContent;
		}

		if (!lastDate)
		{
			// First time through, get last month's bucket

			var message = "";
			var month = parseInt(date, 10) - 1;
			if (month < 1)
			{
				month = 12;
			}
			else if (month < 10)
			{
				month = "0" + month;
			}

			var lastAccessed = parseInt(GM_getValue("accessed_"+month, 0), 10);
			if (lastAccessed)
			{
				bucket_cur = Number(GM_getValue("usage_" + month, undefined));
				lastDate = GM_getValue("lastDate_" + month, "");
				lastHour = parseInt(GM_getValue("lastHour_" + month, undefined), 10);
				var accessDate = new Date(lastAccessed).getTime();
				var currentDate = new Date(Date.parse(date + " 08:00:00 GMT")).getTime();
				var previousDate = new Date(Date.parse(lastDate + " 08:00:00 GMT") + lastHour * 3600000).getTime();

				if (lastDate.length != 10 || !isFinite(lastHour) || !isFinite(bucket_cur))
				{
					bucket_cur = bucket_size;
					lastDate = undefined;
					lastHour = undefined;
					message = "The previous month's usage data is invalid.";
				}

				// If currentDate == previousDate, we are good to go
				// More than a day has passed...
				else if (currentDate - previousDate > 86400000)
				{
					// We cannot use the previous data
					bucket_cur = bucket_size;
					lastDate = undefined;
					lastHour = undefined;
					message = "The previous month's usage data is too old and will not be used.";
				}

				else if (currentDate != previousDate && currentDate > accessDate)
				{
					message = "The previous month's usage data was accessed before "+date+" 08:00 GMT (5:00AM EST, 4:00AM EDT) and may not be complete."
				}

				else if (paramChanged)
				{
					message = "The previous month's usage data may not reflect the new download threshold or recovery rate.";
				}
			}
			else
			{
				message = "The previous month's usage data is unavailable. The following calculations will assume that you started with a full bucket.";
			}

			var link;
			var link_text;

			// Link to previous month's usage (if available)
			if (siteid)
			{
				var d = new Date();
				if (d.getMonth() == month % 12)
				{
					d.setDate(0);
					link_text = "Previous Month's Usage";
				}
				else
				{
					link_text = "Current Month's Usage";
				}
				var y = d.getFullYear();
				var m = d.getMonth() + 1;
				if (m<10)
				{
					m = "0" + m;
				}

				// Direct link
				link = "<a href=\"http://customercare.myhughesnet.com/act_usage.cfm?siteid=" + siteid + "&themonth=" + y + "+" + m + "\">";
			}
			else
			{
				// Fallback URL
				link = "<a href=\"http://customercare.myhughesnet.com/frm_usage.cfm\">";
			}

			if (message && (new Date()).getMonth() == month % 12)
			{
				message = message + " To improve the remaining usage calculation, please check ";
				message = message + link;
				message = message + "last month's usage</a> and then return to this page.";
			}

			if (message)
			{
				message = "<p>" + "<font color=\"#cc0000\">" + message + "</font>";
			}
			var fap_message = document.getElementById("fap_message");
			fap_message.innerHTML = link + link_text + "</a>" + message;
		}

		if (endHour == 0)
		{
			endHour = 24;
		}

		if (!lastDate || date != lastDate)
		{
			sum2 = 0;
			lastHour -= 24;
		}

		// Prefill missing hours
		if (lastDate && lastHour != startHour)
		{
			bucket_cur += refill_rate * (startHour - lastHour);
			if (bucket_cur > bucket_size)
			{
				bucket_cur = bucket_size;
			}
		}

		var node = cells[remove_min_used ? 4 : 5];
		if (fap != "**") {
			// Subtract usage
			bucket_cur -= usage;

			node.innerHTML = bucket_cur.toFixed(1);

			// Set color based on the bucket
			if (bucket_cur <= 0) {
				// Hit the bottom of the bucket?
				setBG(node, fap_exceeded_color);
			} else if (bucket_cur < fap_warning_level) {
				setBG(node, fap_warning_color);
			} else if (bucket_cur < fap_caution_level) {
				setBG(node, fap_caution_color);
			} else if (bucket_cur < fap_notice_level) {
				setBG(node, fap_notice_color);
			} else {
				setBG(node, fap_all_clear_color);
			}
			if (fap == "Yes") {
				setBG(cells[5], fap_exceeded_color);
			}
			// Refill
			bucket_cur += refill_rate;
		}
		else {
			sum2 += usage;
			node.innerHTML = sum2.toFixed(1);
			setBG(node, fap_free_color);
			for (var j = 0; j < cells.length; j++)
			{
				setBG(cells[j], fap_free_color);
			}
			// Refill during FAP Free Time??
			// It seems that the bucket is not refilled during the extra 2 hrs that was recently added.
			if (startHour >= 3 && startHour < 6)
			{
				bucket_cur += refill_rate;
			}
		}

		if (bucket_cur > bucket_size)
		{
			bucket_cur = bucket_size;
		}

		// The bucket cannot be negative without being FAPPED!
		if (bucket_cur <= 0 && fap == "No")
		{
			bucket_cur = 0;
		}

		lastDate = date;
		lastHour = endHour;
	}

	// Carryover into next month
	if (lastDate.length == 10 && lastHour > 0 && lastHour <= 24 && isFinite(bucket_cur))
	{
		GM_setValue("usage_" + lastDate.substr(0,2), bucket_cur.toString());
		GM_setValue("lastDate_" + lastDate.substr(0,2), lastDate);
		GM_setValue("lastHour_" + lastDate.substr(0,2), lastHour);
		GM_setValue("accessed_" + lastDate.substr(0,2), (new Date()).getTime().toString());
	}
}

prepare_page();
update_page(false);

