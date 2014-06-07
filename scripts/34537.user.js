// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        http://www.fallensword.com/*
// ==/UserScript==

var fsHelper = {
	init: function(e) {
		this.initialized = true;
	},

	onPageLoad: function(anEvent) {
		fsHelper.prepareGuildList();
		var re=/cmd=([a-z]+)/;
		var pageId = re.exec(document.location.search)[1];

		switch (pageId) {
		case "settings":
			fsHelper.injectSettings();
			break;
		case "profile":
			fsHelper.decideProfile();
			break;
		case "auctionhouse":
			fsHelper.injectAuctionHouse();
			break;
		case "guild":
			fsHelper.decideGuild();
			break;
		default:
			// echo("");
		}
	},

	prepareGuildList: function() {
		var injectHere = document
			.getElementsByTagName("TABLE")[0].rows[2].cells[2]
			.getElementsByTagName("TABLE")[0].rows[2].cells[0]
			.getElementsByTagName("TABLE")[0];
		var info = injectHere.insertRow(0);
		var cell = info.insertCell(0);
		cell.innerHTML="<span id='fsHelperPlaceholderWorld'></span>";
		fsHelper.retrieveGuildData();
	},

	retrieveGuildData: function() {
		var memberListJSON = GM_getValue("memberlist");
		var memberList;
		// memberListJSON="";
		if (memberListJSON) {
			memberList = JSON.parse(memberListJSON);
			if ((new Date()).getTime() - memberList.changedOn > 15000) memberList = null; // invalidate cache
		}

		if (!memberList) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://www.fallensword.com/index.php?cmd=guild&subcmd=manage",
				headers: {
					"User-Agent" : navigator.userAgent,
					"Content-Type": "application/x-www-form-urlencoded",
					"Cookie" : document.cookie
				},
				onload: function(responseDetails) {
					fsHelper.parseGuildForWorld(responseDetails.responseText);
				},
			})
		} else {
			var memberList = JSON.parse(memberListJSON);
			memberList.isRefreshed = false;
			fsHelper.injectGuildList(memberList);
		}
	},

	parseGuildForWorld: function(details) {
		GM_log("parseGuildForWorld");
		var doc=document.createElement("HTML");
		doc.innerHTML=details;
		var allTables = doc.getElementsByTagName("TABLE")
		var membersTable;
		for (var i=0;i<allTables.length;i++) {
			var oneTable=allTables[i];
			if (oneTable.rows.length>=1 && oneTable.rows[0].cells.length>=1 && (/<b>Members<\/b>/i).test(oneTable.rows[0].cells[0].innerHTML)) {
				membersTable=oneTable;
			}
		}
		if (membersTable) {
			var membersDetails=membersTable.getElementsByTagName("TABLE")[0];
			var memberList = new Object();
			memberList.members = new Array();
			for (var i=0;i<membersDetails.rows.length;i++) {
				var aRow = membersDetails.rows[i];
				if (aRow.cells.length==5 && aRow.cells[0].firstChild.title) {
					var aMember = new Object;
					aMember.status = aRow.cells[0].firstChild.title;
					aMember.id = (/[0-9]+$/).exec(aRow.cells[1].firstChild.nextSibling.href)[0]
					aMember.name=aRow.cells[1].firstChild.nextSibling.innerHTML;
					aMember.level=aRow.cells[2].innerHTML;
					aMember.rank=aRow.cells[3].innerHTML;
					aMember.xp=aRow.cells[4].innerHTML;
					memberList.members.push(aMember);
				}
			}
			memberList.changedOn = new Date().getTime();
			memberList.isRefreshed = true;
			fsHelper.injectGuildList(memberList);
		}
	},

	injectGuildList: function(memberList) {
		GM_setValue("memberlist", JSON.stringify(memberList));
		// GM_log(JSON.stringify(memberList));
		var injectHere = document.getElementById("fsHelperPlaceholderWorld");
		// injectHere.innerHTML=memberList.length;
		var displayList = document.createElement("TABLE");
		displayList.style.border = "1px solid #c5ad73";
		displayList.style.backgroundColor = "#4a3918";
		displayList.cellPadding = 3;
		displayList.width = 125;

		if (memberList.isRefreshed) {
			displayList.style.backgroundColor = "#6a5938";
			/*
			var aRow=displayList.insertRow(displayList.rows.length);
			var aCell=aRow.insertCell(0);
			aCell.innerHTML = "Refreshed!";
			*/
		}

		var aRow=displayList.insertRow(displayList.rows.length);
		var aCell=aRow.insertCell(0);
		var output = "<ol style='color:white;font-size:10px;'>"
		for (var i=0;i<memberList.members.length;i++) {
			var member=memberList.members[i];
			if (member.status=="Online") {
				output += "<li>"
				output += "<a style='color:white;font-size:10px;' href='http://www.fallensword.com/index.php?cmd=profile&player_id=" + member.id + "'>" + member.name + "</a>";
				output += "</li>"
			}
		}
		output += "</ol>"
		aCell.innerHTML = output;
		var breaker=document.createElement("BR");
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);

	},

	injectAuctionHouse: function() {

	},

	decideGuild: function() {
		var re=/subcmd=([a-z]+)/;
		var subPageIdRE = re.exec(document.location.search); //[1];
		var subPageId="***";
		if (subPageIdRE)
			subPageId=subPageIdRE[1];

		switch(subPageId) {
		case "inventory":
			fsHelper.injectDropItems();
			break;
		case "chat":
			fsHelper.injectChat();
			break;
		default:
			// echo ("");
			}
	},


	decideProfile: function() {
		var re=/subcmd=([a-z]+)/;
		var subPageIdRE = re.exec(document.location.search); //[1];
		var subPageId="***";
		if (subPageIdRE)
			subPageId=subPageIdRE[1];

		switch(subPageId) {
		case "***":
			fsHelper.injectProfile();
			break;
		case "dropitems":
			fsHelper.injectDropItems();
			break;
		default:
			// echo ("");
		}
	},

	injectDropItems: function() {
		var allItems = document.getElementsByTagName("INPUT");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.type=="checkbox") {
				theLocation=anItem.parentNode.nextSibling.nextSibling;
				theImage=anItem.parentNode.nextSibling.firstChild.firstChild;
				// window.alert(theLocation.innerHTML);
				var mouseOver=theImage.getAttribute("onmouseover");
				// window.alert(mouseOver.replace(/\s/g,'*'));
				var reParams=/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/
				var reResult=reParams.exec(mouseOver);
				var itemId=reResult[1];
				var invId=reResult[2];
				var type=reResult[3];
				var pid=reResult[4];
				// window.alert()
				var theUrl = "fetchitem.php?item_id="+itemId+"&inv_id="+invId+"&t="+type+"&p="+pid /*+"&uid="+1220693678*/
				theUrl = document.location.protocol + "//" + document.location.host + "/" + theUrl
				// window.alert(theUrl);
				GM_xmlhttpRequest({
					method: 'GET',
					url: theUrl,
					headers: {
					//    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					//    'Accept': 'application/atom+xml,application/xml,text/xml',
					    'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(responseDetails) {
						// window.alert('\n' + responseDetails.responseText);
						var fontLineRE=/<center><font color='(#[0-9A-F]{6})' size=2><b>([^<]+)<\/b>/
						var fontLineRX=fontLineRE.exec(responseDetails.responseText)
						fsHelper.injectDropItemsPaint(fontLineRX[1],fontLineRX[2]);
					},
				})
			}
		}
	},

	injectDropItemsPaint: function(color, text) {
		var allItems = document.getElementsByTagName("INPUT");
		for (var i=0; i<allItems.length; i++) {
			anItem = allItems[i];
			if (anItem.type=="checkbox") {
				theText=anItem.parentNode.nextSibling.nextSibling;
				if (theText.innerHTML=="&nbsp;" + text) {
					theText.style.color=color;
				}
			}
		}
	},

	injectProfile: function() {
		var allLinks = document.getElementsByTagName("A");
		for (var i=0; i<allLinks.length; i++) {
			aLink=allLinks[i];
			if (aLink.href.search("cmd=guild&subcmd=view") != -1) {
				var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.href);
				if (guildIdResult) var guildId = parseInt(guildIdResult[1], 10);
				var warning = document.createElement('span');
				var color = "";
				var changeAppearance = true;
				var relationship = fsHelper.guildRelationship(aLink.text)
				switch (relationship) {
					case "self":
						warning.innerHTML="<br/>Member of your own guild";
						color = "green";
						break;
					case "friendly":
						warning.innerHTML="<br/>Do not attack - Guild is friendly!";
						color = "yellow";
						break;
					case "old":
						warning.innerHTML="<br/>Do not attack - You've been in that guild once!";
						color = "gray";
						break;
					default:
						changeAppearance = true;
				}
				if (changeAppearance) {
					aLink.parentNode.style.color=color;
					aLink.style.color=color;
					aLink.parentNode.insertBefore(warning, aLink.nextSibling);
				}
			}
		}

		var player = document.evaluate("//textarea[@id='holdtext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var avyrow = document.evaluate("//td/img[contains(@title, 's Avatar')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var imgurls = document.evaluate("//img[contains(@src, '/skin/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var playerid = document.URL.match(/\w*\d{5}\d*/)
		var idindex, newhtml, imgserver;

		if (player.snapshotLength == 1)
		{
			const notWhitespace = /\S/
			if (playerid == null)
			{
				playerid = player.snapshotItem(0).innerHTML;
				idindex = playerid.indexOf("?ref=") + 5;
				playerid = playerid.substr(idindex);
			}

			var playeravy = avyrow.snapshotItem(0).parentNode.firstChild ;
			while ((playeravy.nodeType == 3)&&(!notWhitespace.test(playeravy.nodeValue)))
			{
				playeravy = playeravy.nextSibling ;
			}
			var playername = playeravy.getAttribute("title");
			playername = playername.substr(0, playername.indexOf("'s Avatar"));

			idindex = imgurls.snapshotItem(0).src.indexOf("/skin/");
			imgserver = imgurls.snapshotItem(0).src.substr(0,idindex);

			var auctiontext = "Go to " + playername + "'s auctions" ;
			var ranktext = "Rank " +playername + "" ;

			newhtml = avyrow.snapshotItem(0).parentNode.innerHTML + "</td></tr><tr><td align='center' colspan='2'>" ;
			newhtml += "<a href='http://www.fallensword.com/index.php?cmd=blacksmith&subcmd=repairall'>" ;
			newhtml += "<img alt='Quick repair all items' title='Quick repair all items' src=" ;
			newhtml += imgserver + "/skin/realm/icon_action_repair.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href='javaScript:quickBuff(" + playerid ;
			newhtml += ");'><img alt='Buff " + playername + "' title='Buff " + playername + "' src=" ;
			newhtml += imgserver + "/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href='http://www.fallensword.com/index.php?cmd=world&subcmd=map'>" ;
			newhtml += "<img alt='Go to realm map' title='Go to realm map' src=" ;
			newhtml += imgserver + "/skin/realm/icon_action_map.gif></a>&nbsp;&nbsp;" ;
			newhtml += "<a href=http://www.fallensword.com/?cmd=auctionhouse&type=-3&tid=" ;
			newhtml += playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src=';
			newhtml += imgserver + "/skin/gold_button.gif></a>&nbsp;&nbsp;";
			if (relationship == "self" && GM_getValue("showAdmin")) {
				newhtml += "<a href='http://www.fallensword.com/index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=" ;
				newhtml += playerid + '><img alt="' + ranktext + '" title="' + ranktext + '" src=';
				newhtml += imgserver + "/guilds/" + guildId + "_mini.jpg></a>" ;
			}
			avyrow.snapshotItem(0).parentNode.innerHTML = newhtml ;
		}

	},

	injectSettings: function() {
		var configData=document.createElement("DIV");
		configData.innerHTML='<div><form>' +
			'<table>' +
			'<tr><td colspan="2">Enter guild names, seperated by commas</td></tr>' +
			'<tr><td>Own Guild</td><td><input name="guildSelf" value="' + GM_getValue("guildSelf") + '"></td></tr>' +
			'<tr><td>Friendly Guilds</td><td><input name="guildFrnd" value="' + GM_getValue("guildFrnd") + '"></td></tr>' +
			'<tr><td>Old Guilds</td><td><input name="guildPast" value="' + GM_getValue("guildPast") + '"></td></tr>' +
			'<tr><td>Show Administrative Options</td><td><input name="guildAdmin" type="checkbox" value="on"' + (GM_getValue("showAdmin")?" checked":"") + '></td></tr>' +
			'<tr><td colspan=2><input type="button" class="button" value="Save" id="fsHelperSaveOptions"></td></tr>' +
			'</form></div>';
		var insertHere = document.getElementsByTagName("FORM")[0];
		insertHere.parentNode.insertBefore(configData, insertHere.nextSibling);
		document.getElementById('fsHelperSaveOptions').addEventListener('click', fsHelper.saveConfig, true);
	},

	saveConfig: function(evt) {
		var oForm=evt.target.form;
		GM_setValue("guildSelf", oForm.elements[0].value);
		GM_setValue("guildFrnd", oForm.elements[1].value);
		GM_setValue("guildPast", oForm.elements[2].value);
		GM_setValue("showAdmin", oForm.elements[3].checked);
		window.alert("FS Helper Settings Saved");
		return false;
	},

	guildRelationship: function(txt) {
		var guildSelf = GM_getValue("guildSelf").split(","); // "TheRetreat"
		var guildFrnd = GM_getValue("guildFrnd").split(","); // "Armata Rossa,Asphaltanza,Dark Siege,Elendil,Shadow Dracones,The Shadow Warriors,Tuga Knights"
		var guildPast = GM_getValue("guildSelf").split(","); // "Dark Phoenix"
		if (guildSelf.indexOf(txt)!=-1) return "self";
		if (guildFrnd.indexOf(txt)!=-1) return "friendly";
		if (guildPast.indexOf(txt)!=-1) return "old";
		return "";
	}
};


/*
    http://www.JSON.org/json2.js
    2008-09-01

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be used to
            select the members to be serialized. It filters the results such
            that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", call,
    charCodeAt, getUTCDate, getUTCFullYear, getUTCHours, getUTCMinutes,
    getUTCMonth, getUTCSeconds, hasOwnProperty, join, lastIndex, length,
    parse, propertyIsEnumerable, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    JSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapeable.lastIndex = 0;
        return escapeable.test(string) ?
            '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// If the object has a dontEnum length property, we'll treat it as an array.

            if (typeof value.length === 'number' &&
                    !value.propertyIsEnumerable('length')) {

// The object is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
})();

fsHelper.onPageLoad(null);
