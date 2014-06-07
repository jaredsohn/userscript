// ==UserScript==
// 
// @name           Homer Mail for Ikariam
// @version        0.3
// @namespace      HomerOfXi
// @description    Adds a set of functionalities to the mailbox in Ikariam. Features:Folders, Customizeable Filters, Circular Replies with quoted text
// @homepage       http://userscripts.org/scripts/show/58145
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisor*
// @include        http://s*.ikariam.*/index.php?view=options*
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisorAlly*
//
// @history        0.3 Collapsible filters now remember if they were last opened or closed
// @history        0.3 Regular expressions allowed in filters
// @history        0.3 Message count added to end of filter title line
// @history        0.3 Subject changer to set the subject of messages to the first (x) number of characters of the message.
// @history        0.3 Circular Reply buttons added to all messages
// @history        0.3 Added case insensitive search on filters by default with option to make case sensitive on options page
// @history        0.2 Filters are better matched to words at end and beginning of message or next to punctuation.
// @history        0.2 Fixed keyword search so only whole words match instead of partial match
// @history        0.1 Initial Release
// ==/UserScript==

ScriptUpdater.check(58145, '0.3');

//extend jquery to have a filter that accepts regexp and is case sensitive
$.extend($.expr[":"], {
        "regexCS": function(elem, i, match, array) {
            var r = new RegExp(match[3]);
            return r.test(jQuery(elem).text());
        }
    }
); 
//extend jquery to have a filter that accepts regexp and is case insensitive
$.extend($.expr[":"], {
        "regex": function(elem, i, match, array) {
            var r = new RegExp(match[3], 'i');
            return r.test(jQuery(elem).text());
        }
    }
); 

HomerMail = {
	filters : [],
	sizes : [],
	init : function() {
		var view = unsafeWindow.IKARIAM.phpSet.currentView;
		if (typeof(this.views[view]) == 'function') {
			this.views[view]();
		}
	},
	
	views : {
		diplomacyAdvisor : function() {
			//check if ally id is set and if it is add circular reply buttons
			var allyId = GM_getValue("allyId",0);
			if( allyId != 0) {
			  HomerMail.insertReplyButtons(allyId);
			}
			//replace subjects with first 20 chars from message
			HomerMail.replaceSubject();
			//grab all messages that qualify based on filter
			HomerMail.getSavedFilters();
			var firstMsg = $("table[id='messages'] tr")[0];
			for(var x=0; x < HomerMail.filters.length; x++) {
				//check filter for multiple strings
				var filters = HomerMail.filters[x].split(",");
				var messages = [], headers = [], footers = [];
				var matchMethod = GM_getValue("filterCaseSensitive",false) ? "regexCS" : "regex";
				for(var i=0; i < filters.length; i++) {
					messages = HomerMail.merge(messages, $(".msgText:"+matchMethod+"('\\b"+filters[i]+"\\b')").parent());		
				}
				//messages = jQuery.unique(messages); //for some reason this isnt working so i created my own
				messages = HomerMail.getUniqueMessages(messages);
				HomerMail.sizes[x] = messages.length;
				//only continue if messages found
				if(messages.length > 0) {
					headers = $(messages).prev();
					footers = $(messages).next();
					//remove matched messages
					$(headers).remove();
					$(messages).remove();
					$(footers).remove();
					//insert at top with category header and column header rows
					categoryLine = "<tr id='filter_"+x+"'><td colspan='6'>Filter ["+filters+"] ("+messages.length+") <img src='skin/layout/up-arrow.gif' alt='' class='close'/></td></tr>";
					$(firstMsg).before(categoryLine);
					for(var i=0; i < messages.length; i++) {
						$(firstMsg).before(headers[i]);
						$(firstMsg).before(messages[i]);
						$(firstMsg).before(footers[i]);					
					}
					//add events and css to category header
					HomerMail.addCategoryEvents(x);

					//set open/closed state
					var stateOpen = GM_getValue("filterState"+x, true);
					if(!stateOpen) { 
						HomerMail.closeFilterGroup($("#filter_"+x));
					}
				}
			}
		},
		diplomacyAdvisorAlly : function() {
			//get ally id and store as GM var
			var href = $("#alliance a:not([target])").attr('href');
			var index = href.indexOf("allyId");
			var allyId = href.slice(index + 7);
			GM_setValue("allyId", allyId);
		},
		options:function() { 
			//get saved settings
			var filters = HomerMail.getSavedFilters(); 
			var filterCaseSensitive = GM_getValue("filterCaseSensitive",false);
			var subjectChangerOn = GM_getValue("subjectChangerOn",true);
			var subjectChangerLength = GM_getValue("subjectChangerLength",30);
			//create the settings panel
			var settingsPanel = document.createElement("div");
			settingsPanel.className = "contentBox01h";
			panelhtml = '<h3 class="header"><span class="textLabel">Homer Mail</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options">';
			panelhtml += '<div><h3>Filters</h3><table cellpadding="0" cellspacing="0">';
			panelhtml += '<tr><td colspan="2">Add keyword filters, one per line. You can make one filter have multiple key words by seperating each word with a comma. Ex: "trade,trading".<br><br>You can also use certain wildcard characters using regular expression rules. For reference <a href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp" target="_blank">click here.</a> For simplicity try using ".*" to match any number of characters.</td></tr>';
			for(var x=0; x < 5; x++) {
				if(filters[x] == null){ filters[x] = "";}
				panelhtml += '<tr><th>Filter '+(x+1)+'<td><input id="filter'+x+'" type="text" name="filter'+x+'" value="'+filters[x]+'"></td></tr>'
			}
			panelhtml += '<tr><th>Make Filters Case Sensitive</th><td><input id="filterCaseSensitive" type="checkbox" name="hm_cs" ' + (filterCaseSensitive ? 'checked' : '') + '></td></tr>';
			panelhtml += '</table></div>';
			panelhtml += '<div><h3>Subject Changer</h3><table cellpadding="0" cellspacing="0">';
			panelhtml += '<tr><th>Turn Subject Changer On</th><td><input id="subjectChangerOn" type="checkbox"' + (subjectChangerOn ? 'checked' : '') + '></td></tr>';
			panelhtml += '<tr><th>Subject Replacement Length</th><td><input id="subjectChangerLength" type="text" size="2" value="'+subjectChangerLength+'"></td></tr>';
			panelhtml += '</table></div>';
			panelhtml += '<div class="centerButton"><input id="hm_save" class="button" type="submit" value="Save Settings" "/></div></form></div><div class="footer"></div></div>';
			settingsPanel.innerHTML = panelhtml;
			// Insert the settings panel at bottom right before the vacation mode panel
			$('#vacationMode').before(settingsPanel);
			//add listener on button to call saveSettings method
			$('#hm_save')[0].addEventListener("click", function(event){HomerMail.saveSettings();}, false);
		}
	},
	insertReplyButtons : function(allyId) {
		var circulars = $(".subject");
		for(var x=0; x < circulars.length; x++) {
			var messageId = $(circulars[x]).parent().attr("id").slice(7);
			//button rows have an id of tbl_reply99999 where 99999 is the messageid
			var buttonSpan = $("#tbl_reply" + messageId + " .reply span:first");
			//create new button html and insert
			buttonHtml = "<a class='button' href='?view=sendIKMessage&msgType=51&allyId="+allyId+"&replyTo="+messageId+"'>Circular Reply</a>";
			buttonSpan.append(buttonHtml);
		}
			
	},
	replaceSubject : function() {
		//only perform if subject changer is turned on in options
		var subjectChangerOn = GM_getValue("subjectChangerOn",true);
		if(subjectChangerOn) {
			var subjectTDs = $(".subject");
			var messageTxtTDs = $(".msgText");
			//these should be one to one parallel arrays
			for(var i=0; i < subjectTDs.length; i++) {
				var messageTypeText = "";
				if(subjectTDs[i].innerHTML.indexOf("Circular") >= 0) {
					messageTypeText = "CM - "
				}
				//get first ? chars of message and replace subject
				var numChars = GM_getValue("subjectChangerLength",30);
				var newSubject = messageTxtTDs[i].firstChild.nextSibling.innerHTML.slice(0,numChars);
				subjectTDs[i].innerHTML = messageTypeText + newSubject;
			}
		}
	},
	getMessageHeaders : function(catRow, index) {
		var filterNum = $(catRow).attr("id").slice(7);
		return $("#filter_"+filterNum+" ~ tr.entry").slice(0,HomerMail.sizes[index]);
	},
	getSavedFilters : function() {
		var savedFilters = GM_getValue("filters","");
		if(savedFilters == "") {
			HomerMail.filters = [];
		} else {
			HomerMail.filters = savedFilters.split(":");
		}
		return HomerMail.filters;
	},
	getIndex : function(catRow) {
		return $(catRow).attr("id").slice(7);
	},
	getUniqueMessages : function(messages) {
		var uniqueIds = [];
		var uniqueElem = [];
		for(var i=0; i < messages.length; i++) {
			var id = $(messages[i]).attr("id");
			if(jQuery.inArray(id, uniqueIds) == -1) {
			  //no match so add id to uniqueIds and element to uniqueElem
				uniqueIds.push(id);
				uniqueElem.push(messages[i]);
			}
		}
		return uniqueElem;
	},
	addCategoryEvents : function(filterNum) {
		$("#filter_"+filterNum).css({"border" : "1px solid brown", "background-color" : "#FAEAC6", "cursor" : "pointer", "font-weight" : "bold", "text-align" : "left"});
		$("#filter_"+filterNum).mouseover(function () {$(this).css("background-color","#ECD5AC");});
		$("#filter_"+filterNum).mouseout(function () {$(this).css({"background-color":"#FAEAC6","cursor" : "pointer"});});
		$("#filter_"+filterNum).toggle(
			function () {
				HomerMail.closeFilterGroup(this);
			},
			function () {
				//reshow all messages in group and change arrow image
				var index = HomerMail.getIndex(this);
				var headers = HomerMail.getMessageHeaders(this, index);
				var filters = HomerMail.filters[index].split(",");
				$(headers).show();
				$(".open", this).attr({"className" : "close", "src" : "skin/layout/up-arrow.gif"});
				GM_setValue("filterState"+index,true);
			});
	},
	closeFilterGroup : function(filterRow) {
		//close all messages in the group and then hide them and change arrow images
		var index = HomerMail.getIndex(filterRow);
		var headers = HomerMail.getMessageHeaders(filterRow, index);
		var messages = $(headers).next();
		var footers = $(messages).next();
		$(".close", headers).attr({"className" : "open", "src" : "skin/layout/down-arrow.gif"});
		$(".close", filterRow).attr({"className" : "open", "src" : "skin/layout/down-arrow.gif"});
		$(headers).hide();
		$(messages).hide();
		$(footers).hide();
		GM_setValue("filterState"+index,false);
	},
	merge : function(messages1, messages2) {
		if(messages1.length == 0) return messages2;
		//since messages are assigned an incremental id we can assume that a higher id means a later timestamp
		for(var i=0; i < messages2.length; i++) {
			//insert message from message2 array into ordered spot in message1 array
			var messageId2 = $(messages2[i]).attr("id").slice(8);
			for(var j=0; j < messages1.length; j++) {
				var messageId1 = $(messages1[j]).attr("id").slice(8);
				if(messageId2 > messageId1) {
					messages1.splice(j,0,messages2[i]);
					break;
				}
				if(j == messages1.length) {
					//message2 is after all messages in 1st list so insert at end
					messages1.splice(j+1,0,messages2[i]);
				}
			}
		}
		return messages1;
	},
	saveSettings : function() {
		//get each filter from page and add to array
		var filters = [];
		var j = 0;
		for(var x=0; x < 5; x++) {
			var filter = jQuery.trim($("#filter"+x)[0].value);
			if(filter != "") {
				filters[j++] = filter;
			}
		}
		GM_setValue("filters", filters.join(":"));
		//save filter case sensitive option
		var filterCaseSensitive = $("#filterCaseSensitive")[0].checked;
		GM_setValue("filterCaseSensitive",filterCaseSensitive);
		
		//save subject changer on status and subject length
		var subjectChangerOn = $("#subjectChangerOn")[0].checked;
		GM_setValue("subjectChangerOn", subjectChangerOn);
		var subjectChangerLength = $("#subjectChangerLength")[0].value;
		GM_setValue("subjectChangerLength", subjectChangerLength);
	}
}

HomerMail.init();
