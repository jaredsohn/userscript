// ==UserScript==
// @name TVRage small improvements script
// @author SebDE
// @version 0.2.5
// @description makes the adding of Guest Stars and Episode Crew easier and faster
// @include http://tvrage.com/*
// @include http://www.tvrage.com/*
// ==/UserScript==
window.addEventListener(
	'load',
	function (e) {
		var voiceovershows = new Array(6190,3628,5266);
		if(1==1){// e.event.target instanceof Document ) {
			// make the All New also links in the forums:
			if (window.location.href.indexOf("forum") != -1) {
				if (window.location.href.indexOf("viewtopic") == -1 && window.location.href.indexOf("viewtopic") == -1) {
					var bolds = document.getElementsByTagName("b");
					for (var i=0; i< bolds.length; i++) {
						try {
							var linktext = bolds[i].firstChild.nodeValue;
						} catch(e) {
							var linktext = null;
						}
						try {
							if (linktext == "All New") {
								var topiclink = bolds[i].parentNode.parentNode.parentNode.childNodes[1].firstChild.href;
								if (topiclink != null) {
									var allnewlink = document.createElement("a");
									allnewlink.href = topiclink;
									allnewlink.appendChild(document.createTextNode("All New"));
									bolds[i].appendChild(allnewlink);
									bolds[i].removeChild(bolds[i].firstChild);
								}
							}
							if (linktext == "1 New") {
								var topiclink = bolds[i].parentNode.parentNode;
								topiclink.href = topiclink.href.substr(0,topiclink.href.indexOf("#")) + "#last_post";
							}
						} catch(e) { }
					}
				}
			}
			// make navigation links for each letter in All Shows page, when filter menu is hidden:
			var pattern = "tvrage.com/all.php?filter_options=fletter@";
			var letterpos = window.location.href.indexOf(pattern);
			if (letterpos != -1) {
				var base = window.location.href.substr(0,letterpos+pattern.length);
				var tail = window.location.href.substr(letterpos+pattern.length+1,window.location.href.length-letterpos-pattern.length-1);
				var divs = document.getElementsByTagName("div");
				if (divs[4] != null) {
					var node = document.createElement("br");
					divs[4].appendChild(node);
					for (var i=0; i<26; i++) {
						var textnode = document.createTextNode(" "+String.fromCharCode(65+i)+" ");
						var node = document.createElement("a");
						node.appendChild(textnode);
						node.href = base + textnode.nodeValue.substr(1,1) + tail;
						divs[4].appendChild(node);
					}
				}
			}
			// replace "&bull"s with propper "&bull;"s in peron profile:
			if (window.location.href.indexOf("tvrage.com/person/") != -1) {
				var bolds = document.getElementsByTagName("b");
				for (var i=0; i<bolds.length; i++) {
					if (bolds[i].firstChild != null && bolds[i].firstChild.nodeValue == "...") {
						if (bolds[i].parentNode.firstChild != null && bolds[i].parentNode.firstChild.nodeValue == "&bull ") {
							bolds[i].parentNode.firstChild.nodeValue = String.fromCharCode(8226)+" ";
						}
					}
				}
			}
			// change the Episode Crew/Guest Stars contribution forms:
			if (window.location.href.indexOf("tvrage.com/edit/shows/") != -1) {
				// replace "&bull"s with propper "&bull;"s in show contribute menu:
				var bolds = document.getElementsByTagName("b");
				if (bolds[2] != null && bolds[2].firstChild != null) {
					if (bolds[2].firstChild.nodeValue == "Quick Select: ") {
						var bulls = bolds[2].parentNode.childNodes;
						for (var i=0; i<bulls.length; i++) {
							if (bulls[i].nodeValue != null && bulls[i].nodeValue.indexOf("&bull ") != -1) {
								bulls[i].nodeValue = String.fromCharCode(8226)+" ";
							}
						}
					}
				}
				// replace "Add New Guest Star" and "Add New Episode Crew Member" links with inputbox and submit button:
				var fonts = document.getElementsByTagName("font");
				if (fonts[3] != null && fonts[3].firstChild != null) {
					if (fonts[3].firstChild.nodeValue == "Add New Guest Star" || fonts[3].firstChild.nodeValue == "Add New Episode Crew Member") {
						var addform = document.createElement("form");
						addform.action = window.location.href + "&add_new=1";
						if (fonts[3].parentNode.firstChild != null && fonts[3].parentNode.href != null) {
							addform.action = fonts[3].parentNode.href;
						}
						addform.method = "POST";
						var b2 = document.createTextNode("Search for person or create new person profile:");
						addform.appendChild(b2);
						var b2 = document.createElement("br");
						addform.appendChild(b2);
						var edit = document.createElement("input");
						edit.type='text';edit.name='usearch';edit.value='';edit.size='40';
						addform.appendChild(edit);
						var b2 = document.createElement("br");
						addform.appendChild(b2);
						var b2 = document.createElement("input");
						b2.type='submit';b2.value='Search!';
						addform.appendChild(b2);
						var b2 = document.createTextNode(" ");
						addform.appendChild(b2);
						var b2 = document.createElement("input");
						b2.type='submit';b2.name='add_new_person';b2.value='Create a New Person Profile';
						addform.appendChild(b2);
						fonts[3].parentNode.parentNode.replaceChild(addform,fonts[3].parentNode);
						edit.focus();
					}
				}
				// fast forward if only one Exact match for person search is displayed:
				// var bolds = document.getElementsByTagName("b");
				if (bolds[4] != null && bolds[4].firstChild != null) {
					if (bolds[4].firstChild.nodeValue == "Showing only Exact results") {
						try {
							var resulttable = bolds[4].parentNode.parentNode.parentNode;
							var selectlink = resulttable.lastChild.firstChild.lastChild;
						} catch(e) {
							// that isn't quite the expected DOM structure, can't proceed
							var selectlink = null;
						}
						if (selectlink != null && selectlink.firstChild != null) {
							if (confirm(selectlink.firstChild.nodeValue)) {
								window.location.href = selectlink.href;
							}
						}
					}
				}
				// make the "Previous used Character Names" selectable with radio-boxes:
				// var bolds = document.getElementsByTagName("b");
				if (bolds[5] != null && bolds[5].firstChild != null) {
					if (bolds[5].firstChild.nodeValue == "Previous used character names") {
						try {
							var names = bolds[5].parentNode.parentNode.childNodes[1];
							var cnamerow = bolds[5].parentNode.parentNode.parentNode.childNodes[2];
							var cnamefield = cnamerow.childNodes[1].childNodes[1];
						} catch(e) {
							var names = null;
							var cnamefield = null;
						}
						if (names != null && cnamefield != null) {
							for (var i=0; i< names.childNodes.length; i++) {
								var cname = names.childNodes[i];
								if (cname.nodeValue == null) continue;
								var fullname = cname.nodeValue.substr(2,cname.nodeValue.length-2);
								var radiolabel = document.createElement("label");
								names.replaceChild(radiolabel,cname);
								var radiobox = document.createElement("input");
								radiobox.type = "radio";
								radiobox.name = "cname";
								radiobox.value = fullname;
								radiolabel.appendChild(radiobox);
								radiolabel.appendChild(document.createTextNode(fullname));
							}
							if (radiobox != null) radiobox.checked = true;
							radiobox = document.createElement("input");
							radiobox.type = "radio";
							radiobox.name = "cname";
							radiobox.value = "";
							cnamefield.parentNode.replaceChild(radiobox,cnamefield.parentNode.firstChild);
							cnamefield.name = "cname.tmp";
							cnamefield.focus();
							cnamefield.onkeyup = function() {
								var cnamefield = document.getElementsByName("cname.tmp");
								if (cnamefield[0] != null && cnamefield[0].value != "") {
									var radiobox = cnamefield[0].parentNode.firstChild;
									if (radiobox != null) {
										radiobox.checked = true;
									}
								}
							}
							var voicelabel = cnamefield.parentNode.childNodes[5];
							if (voicelabel != null && voicelabel.firstChild != null) {
								for (var i=0; i< voiceovershows.length; i++) {
									if (window.location.href.indexOf("tvrage.com/edit/shows/"+voiceovershows[i]) != -1) {
										voicelabel.firstChild.checked = true;
										break;
									}
								}
							}
						}
					}
				}
			}
		}
	}
,false);

window.addEventListener(
	'submit',
	function (e) {
		if (window.location.href.indexOf("tvrage.com/edit/shows/") != -1) {
			var cnamefield = document.getElementsByName("cname.tmp");
			if (cnamefield[0] != null && cnamefield[0].value != "") {
				var radiobox = cnamefield[0].parentNode.firstChild;
				if (radiobox != null && radiobox.checked == true) {
					radiobox.name = "cname.radio";
					cnamefield[0].name = "cname";
				}
			}
		}
	}
,false);
