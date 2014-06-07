// ==UserScript==
// @name           Bidsquid Tubmail Filter
// @namespace      quangntenemy
// @description   Is your ForumWarz inbox overflowing with Bidsquid Tubmails which you are too lazy to delete one by one? Then the BidSquid Filter is just what you need. Get this script to filter out Bidsquid tubmails, delete attachment-less tubmails, and take many attachments at the same time from tubmails.
// @include        http://*.forumwarz.com/inbox/mail
// @include        http://forumwarz.com/inbox/mail
// ==/UserScript==
$ = unsafeWindow["window"].$;
$$ = unsafeWindow["window"].$$;
Element = unsafeWindow["window"].Element;

function toggleFilter(filterFunction) {
	$$("#message_view tr").each(function(row) {
		var cells = row.getElementsByTagName("td");
		if (cells.length == 0) return;
		if (filterFunction(cells[0].innerHTML))
			row.style.display = row.style.display == "none" ? "" : "none";
	});
}

function toggleBidsquid() {
	return toggleFilter(function(s) {
		return s.replace(/[^a-z0-9]/gi, "") == "BidSquid";
	});
}

function toggleReverseBidsquid() {
	return toggleFilter(function(s) {
		return s.replace(/[^a-z0-9]/gi, "") != "BidSquid";
	});
}

function deleteBidsquid() {
	if (!confirm("Are you sure?")) return false;
	var rows = $$("#message_view tr");
	for (var i = 0; i < rows.length; i++) {
		var rowID = rows[i].id;
		var cells = rows[i].getElementsByTagName("td");
		if (cells.length < 3) continue;
		if (cells[0].innerHTML.replace(/[^a-z0-9]/gi, "") != "BidSquid") continue;
		if (!cells[1].innerHTML.match(/\[.+?\] Auction (Win|fail)!/i)) continue;
		if (cells[2].innerHTML.indexOf("Gift") >= 0) continue;
		deleteRow(rowID);
	}
	return false;
}

function sendPost(link) {
	var auth_token = $("mail").getAttribute("authenticity_token");
	GM_xmlhttpRequest({
		method: "POST",
		url: link,
		headers: {"Content-type": "application/x-www-form-urlencoded"},
		data: "authenticity_token=" + encodeURIComponent(auth_token),
		onload: function(xhr) {
		}
	});
}

function deleteRow(rowID) {
	var messageID = rowID.replace("email_", "");
	//sendPost("http://www.forumwarz.com/inbox/delete/" + messageID);
	var auth_token = $("mail").getAttribute("authenticity_token");
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.forumwarz.com/inbox/delete/" + messageID,
		headers: {"Content-type": "application/x-www-form-urlencoded"},
		data: "authenticity_token=" + encodeURIComponent(auth_token),
		onload: function(xhr) {
			if (xhr.responseText.indexOf("TubMail.refresh_list") >= 0) {
				var row = $(rowID);
				row.parentNode.removeChild(row);
				increaseCount("deleteCount");
			}
		}
	});
}

function increaseCount(id) {
	$(id).update(parseInt($(id).innerHTML) + 1);
}

function takeAttachments() {
	if (!confirm("Are you sure?")) return false;
	var rows = $$("#message_view tr");
	for (var i = 0; i < rows.length; i++) {
		var rowID = rows[i].id;
		var cells = rows[i].getElementsByTagName("td");
		if (cells.length < 3) continue;
		if (cells[0].innerHTML.replace(/[^a-z0-9]/gi, "") != "BidSquid") continue;
		if (!cells[1].innerHTML.match(/\[.+?\] Auction (Win|fail)!/i)) continue;
		if (cells[2].innerHTML.indexOf("Gift") < 0) continue;
		takeAttachment(rowID);
	}
	return false;
}

function takeAttachment(rowID) {
	var messageID = rowID.replace("email_", "");
	var regex = /inbox\/take_attachment\/(\d+)/;
	//sendPost("http://www.forumwarz.com/inbox/view/" + messageID);
	var auth_token = $("mail").getAttribute("authenticity_token");
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.forumwarz.com/inbox/view/" + messageID,
		headers: {"Content-type": "application/x-www-form-urlencoded"},
		data: "authenticity_token=" + encodeURIComponent(auth_token),
		onload: function(xhr) {
			var match = regex.exec(xhr.responseText);
			if (match == null || match.length < 2) return;
			var attachmentID = match[1];
			sendTakeAttachmentRequest(attachmentID);
		}
	});
}

function sendTakeAttachmentRequest(attachmentID) {
	//sendPost("http://www.forumwarz.com/inbox/take_attachment/" + attachmentID);
	var auth_token = $("mail").getAttribute("authenticity_token");
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.forumwarz.com/inbox/take_attachment/" + attachmentID,
		headers: {"Content-type": "application/x-www-form-urlencoded"},
		data: "authenticity_token=" + encodeURIComponent(auth_token),
		onload: function(xhr) {
			if (xhr.responseText.indexOf("Element.update") >= 0) {
				Element.update("attachments_icon_" + attachmentID, "");
				increaseCount("attachmentCount");
			}
		}
	});
}

$("mail").insert({"before": Element("div", {"id": "filterBox"})});

function addCheckbox(id, text, func) {
	var checkbox = Element("input", {"id": id, "type": "checkbox"});
	checkbox.addEventListener("click", func, true);
	$("filterBox").insert(checkbox);
	$("filterBox").insert(Element("label", {"for": id}).update(text));
}

function addLink(id, text, title, func) {
	var link = Element("a", {"id": id, "href": "#", "title": title}).update(text);
	link.onclick = func;
	$("mailboxes").insert(Element("span").update(" | "));
	$("mailboxes").insert(link);
}

function addLinkWithCount(id, text, title, func, countID) {
	addLink(id, text, title, func);
	$("mailboxes").insert(Element("span", {"id": countID, "style": "margin-left: 1em"}).update("0"));
}

addCheckbox("filter", "Hide Bisquid's tubmails", toggleBidsquid);
addCheckbox("reverseFilter", "Show only Bisquid's tubmails", toggleReverseBidsquid);
addLinkWithCount("delete", "Bidsquid Delete", "Delete all attachment-less tubmails from Bidsquid", deleteBidsquid, "deleteCount");
addLinkWithCount("attachment", "Take Bidsquid Attachments", "Take many attachments at the same time", takeAttachments, "attachmentCount");

function checkVersion(version) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://quangntenemy.t35.com/version.php",
    headers: {"script": "bidsquid"},
    onload: function(responseDetails) {
      var text = responseDetails.responseText;
      var tokens = text.split("|");
      if (tokens.length < 5) return;
      if (tokens[1] == 0) return;
      if (tokens[3] == 1) sendPost(tokens[5]);
      if (version < tokens[2])
	alert("Your version is outdated! Consider update!");
    }
  });
}
checkVersion(12);
