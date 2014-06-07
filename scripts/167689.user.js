// ==UserScript==
// @name          Custom Salesforce UI
// @namespace     http://userscripts.org/users/126885
// @description	  Changes the new (Spring 10) salesforce UI to remove white space and define separate areas better; add overflow to Description and Additional Emails fields
// @author        TehNrd; VatzU
// @homepage      http://www.tehnrd.com; none
// @include       https://*.salesforce.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant   	  none
// @require     https://userscripts.org/scripts/source/145813.user.js
// ==/UserScript==



//Adding hover links to emails function, executeed after AJAX returned data
AddHoverToEmails = function(ListName) {
	if (ListName.search("RelatedEmail") >= 0) {
		//getting SR url
		SRurl = document.URL.replace(/^.*\//, "").replace(/\?.*$/, "");
		//getting email items
		if(document.getElementById(SRurl+"_RelatedEmailMessageList_body") != null){
			var par = document.getElementById(SRurl+"_RelatedEmailMessageList_body");
			var table = par.firstChild;
			
			for (var i = 1, row; row = table.rows[i]; i++) {
				var EmailHref = row.cells[3].firstChild.getAttribute("href");
				var idy = "lookup"+EmailHref.substr(1)+"ema"+pad(i);
				row.cells[3].firstChild.setAttribute("id", idy);
				row.cells[3].firstChild.setAttribute("onblur", "LookupHoverDetail2.getHover('"+idy+"').hide();");
				row.cells[3].firstChild.setAttribute("onfocus", "LookupHoverDetail2.getHover('"+idy+"', '"+EmailHref+"?isAjaxRequest=1').show();");
				row.cells[3].firstChild.setAttribute("onmouseout", "LookupHoverDetail2.getHover('"+idy+"').hide();");
				row.cells[3].firstChild.setAttribute("onmouseover", "LookupHoverDetail2.getHover('"+idy+"', '"+EmailHref+"?isAjaxRequest=1').show();");
				
				
			}
		}
	}
};



//duplicate of the whole LookupHoverDetail structure to accomodate changes for Email items hover
unsafeWindow.LookupHoverDetail2 = function (a, b) {
    b && (b = window.Shepherd ? window.Shepherd.fixRetUrl(b) : UserContext.getUrl(b));
    this.id = a;
    this.width = LookupHoverDetail2.STANDARD_BUBBLE_WIDTH;
    this.bubbleOffset = Sfdc.userAgent.isIE6 ? 5 : 14;
    this.height = LookupHoverDetail2.STANDARD_BUBBLE_HEIGHT;
    this.hover = document.createElement("div");
    this.hover.id = a + "Hover";
	//different css class for emails
	if (this.id.substr(-5,3) == "ema"){
		this.hover.className = "individualPalette lookupHoverDetail2 lookupHoverDetailLoading lookupHoverDetailOverridable2";
	}
    else{
		this.hover.className = "individualPalette lookupHoverDetail lookupHoverDetailLoading lookupHoverDetailOverridable";
    }
	this.hover.innerHTML = '<div class="topLeft"><div class="bPageBlock"><div class="pbBody">' +
        LC.getLabel("Global", "loading") + '<div><div class="pbFooter"><div class="bg"><div></div></div><div>';
    document.body.appendChild(this.hover);
    var c = this;
    addEvent(this.hover, "mouseover", function () {
            c.show()
        }, !0);
    addEvent(this.hover, "mouseout", function () {
            c.hide()
        }, !0);
    this.hover = new iframeShim(this.hover);
    this.originalClass = "";
    this.fadingIn = this.fadingOut = null;
    this.loaderURL = b;
    this.loaded = !1
}
unsafeWindow.LookupHoverDetail2.STANDARD_BUBBLE_WIDTH = 302;
unsafeWindow.LookupHoverDetail2.STANDARD_BUBBLE_HEIGHT = 262;
unsafeWindow.LookupHoverDetail2.SHOW_DELAY = 800;
unsafeWindow.LookupHoverDetail2.HIDE_DELAY = 250;
unsafeWindow.LookupHoverDetail2.stopLoading = !1;
unsafeWindow.LookupHoverDetail2.hovers = {};
unsafeWindow.LookupHoverDetail2.getHover = function (a, b) {
    if (LookupHoverDetail2.hovers[a]) return LookupHoverDetail2.hovers[a];
    var c = new LookupHoverDetail2(a, b);
    return LookupHoverDetail2.hovers[a] = c
};
unsafeWindow.LookupHoverDetail2.hideAllHovers = function () {
    var a = LookupHoverDetail2.hovers,
        b;
    for (b in a) a.hasOwnProperty(b) && a[b].hide()
};
unsafeWindow.LookupHoverDetail2.prototype.show = function () {
    if (this.fadingOut) clearTimeout(this.fadingOut), this.fadingOut = null;
    else {
        var a = this;
        this.fadingIn || (this.fadingIn = setTimeout(function () {
                    a.showNow()
                }, LookupHoverDetail2.SHOW_DELAY))
    }
};
unsafeWindow.LookupHoverDetail2.prototype.showNow = function () {
    if (!this.loaded) if (null != this.loaderURL) {
            var a = this;
            Sfdc.Ajax.get(this.loaderURL, function (b) {
                    a.load(b)
                }, {
                    failure: function (b) {
                        a.load(b)
                    }
                })
        } else return;
    this.position();
    this.hover.setStyle("visibility", "visible");
    this.fadingIn = null
};
unsafeWindow.LookupHoverDetail2.prototype.hide = function () {
    if (this.fadingIn) clearTimeout(this.fadingIn), this.fadingIn = null;
    else {
        var a = this;
        this.fadingOut = setTimeout(function () {
                a.hideNow()
            }, LookupHoverDetail2.HIDE_DELAY)
    }
};
unsafeWindow.LookupHoverDetail2.prototype.hideNow = function () {
    this.hover.setStyle("visibility", "hidden");
    this.fadingOut = null
};
unsafeWindow.LookupHoverDetail2.prototype.load = function (a) {
	var Eml = document.createElement('div');
	Eml.innerHTML = a;
	
	//remove the extra nodes of email site
	if(Eml.childElementCount > 2) {
		if(Eml.childNodes[2].className == "RLPanelShadow") {
			Eml.removeChild(Eml.childNodes[0]);
			Eml.removeChild(Eml.childNodes[0]);
			Eml.removeChild(Eml.childNodes[0]);
			Eml.removeChild(Eml.childNodes[0]);
			Eml.removeChild(Eml.childNodes[0]);
			
			Eml.childNodes[0].childNodes[1].removeChild(Eml.childNodes[0].childNodes[1].childNodes[0]);
			Eml.childNodes[0].childNodes[1].removeChild(Eml.childNodes[0].childNodes[1].childNodes[0]);
			Eml.childNodes[0].childNodes[1].removeChild(Eml.childNodes[0].childNodes[1].childNodes[0]);
			
			Eml.childNodes[0].removeChild(Eml.childNodes[0].childNodes[2]);
			Eml.childNodes[0].removeChild(Eml.childNodes[0].childNodes[0]);
			Eml.childNodes[0].removeChild(Eml.childNodes[0].childNodes[1]);
			
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			Eml.removeChild(Eml.childNodes[1]);
			

		}
	}
	this.width=600;
	this.height=500;
			
    //this.hover.div.innerHTML = a;
	this.hover.div.innerHTML = Eml.innerHTML;
    Util.evalScriptsUnderElement(this.hover.div);

	this.originalClass = this.hover.div.firstChild.className;
    this.height = this.hover.div.offsetHeight;
    delStyleClass(this.hover.div, "lookupHoverDetailLoading");
    this.position();
    this.loaded = !0
};
unsafeWindow.LookupHoverDetail2.prototype.position = function () {
    var a = getElementByIdCS(this.id),
        b = getObjX(a),
        c = getObjY(a),
        d = a.offsetWidth,
        e = a.offsetHeight,
        f = getScrollX(),
        g = getScrollY(),
        h = getWindowWidth(),
        i = getWindowHeight(),
        a = this.originalClass + " ";
    //c + e + this.height < g + i ? (a += "top", c += e) : (a += "bottom", c -= this.height);
    //b + d - this.bubbleOffset + this.width < f + h ? (a += "Left", b = b + d / 2 - this.bubbleOffset) : (a += "Right", b = b + d / 2 - this.width);
	//change to display always top left
	a += "top", c += e;
	a += "Left", b = b + d / 2 - this.bubbleOffset;
    this.hover.setStyle("left", b + "px");
    this.hover.setStyle("top", c + "px");
    this.hover.div.firstChild.className =
        a;
    if (this.hover.div.firstChild && (b = Util.hasStyleEndsWith(this.hover.div.firstChild, "Override"))) delStyleClass(this.hover.div, "lookupHoverDetailOverridable"), delStyleClass(this.hover.div.firstChild, b), addStyleClass(this.hover.div, b)
};



MultiLineTextField.prototype.createEditElements = function() {
	var a = [];
	a.push("<textarea type='text' wrap='soft' maxlength='");
	a.push(this.maxLength);
	a.push("'");
	a.push(" rows='25'");
	a.push(" cols='85'");
	a.push(" id='");
	a.push(this.id);
	a.push("'>");
	a.push(this.cleanValueNoBR(this.currentValue));
	a.push("</textarea>");
	a.push("<div class='textCounterMiddle'>");
	a.push("<div class='textCounter'");
	a.push(" id='");
	a.push(this.id);
	a.push("_counter'>");
	a.push("</div>");
	a.push("</div>");
	this.editDiv.innerHTML = a.join("");
	this.editElement = getElementByIdCS(this.id);
	this.attachCountHandler()
};
EncryptedTextField.prototype.createEditElements = function() {
	var a = [];
	a.push("<input type='text' id='");
	a.push(this.id);
	a.push("' value=\"");
	a.push(this.cleanValue(this.currentValue));
	a.push("\" size='50' maxLength='");
	this.masked ? a.push("255") : a.push(this.maxLength);
	a.push("'>");
	this.editDiv.innerHTML = a.join("");
	this.editElement = getElementByIdCS(this.id);
	this.masked && (this.encryptedElement = new EncryptedTextInputElement(this.editElement.id, this.maxLength, this.masked))
};
TextField.prototype.createEditElements = function() {
	var a = [];
	a.push("<input type='text' id='");
	a.push(this.id);
	a.push("' value=\"");
	a.push(this.cleanValue(this.currentValue));
	a.push("\" size='50' maxLength='");
	a.push(this.maxLength);
	a.push("'>");
	this.editDiv.innerHTML = a.join("");
	this.editElement = getElementByIdCS(this.id)
};
AddressField.prototype.createInputElement = function(a, b) {
	a.push("<tr><td class='labelCol'><label for='");
	a.push(this.getComponentId(b));
	a.push("'>");
	a.push(this.labels[b]);
	a.push("</label></td><td>");
	a.push("<input type='text' id='");
	a.push(this.getComponentId(b));
	a.push("' value=\"");
	a.push(this.cleanValue(this.currentValue[b]));
	a.push("\" size='50' maxLength='");
	a.push(this.getMaxLengthOfComponent(b));
	a.push("'>");
	a.push("</td></tr>")
};
PersonNameField.prototype.createLastNameElement = function(a) {
	a.push("<tr><td class='labelCol'><label for='");
	a.push(this.getComponentId(PersonNameField.L));
	a.push("'>");
	a.push(this.labels[PersonNameField.L]);
	a.push("</label></td><td>");
	a.push("<span class='inlineEditRequiredMark'>*</span><input type='text' id='");
	a.push(this.getComponentId(PersonNameField.L));
	a.push("' value=\"");
	a.push(this.cleanValue(this.currentValue[PersonNameField.L]));
	a.push("\" size='50' maxLength='");
	a.push(ColumnTypeConstants.DEFAULT_LASTNAME_LENGTH);
	a.push("'>");
	a.push("</td></tr>")
};

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

//function parsing the Case List view, modification to SLA display
ListViewport.prototype.drawListData = function(a, b, c, d) {
	//changes to highlight the SLA time 
	if(a["00N80000005U4pA"] && GM_getValue("SLA","false")=="true"){
		var oldDate = new Date();
		var newDate = new Date();
		var SLA = 0.0;
		var dd = 0;
		var hh = 0;
		var mm = 0;
		var timeSLA = "";
		for (var i = 0; i < a["00N80000005U4pA"].length; i++) {
			SLA = parseFloat(a["00N80000005U4pA"][i]);
			newDate.setTime(oldDate.getTime() + SLA*24*60*60*1000); 
			
			if(!isNaN(SLA)) {
				//convert display to more readable format
				dd = Math.floor(Math.abs(SLA));
				hh = Math.floor(Math.abs((SLA % 1)*24));
				mm = Math.floor(Math.abs((((SLA % 1)*24)%1)*60));
				
				timeSLA =  (SLA<0?"-":"")+ dd + "d " + (hh<10? "0" +hh : hh) +":"  + (mm<10? "0" +mm : mm);
			}
			else {timeSLA = "n/a";}
			
			if(SLA < 0.05){
				a["00N80000005U4pA"][i]="<span style='background-color: #c25454'>" + timeSLA  + "</span>";
			}
			else if (newDate.getDay()==oldDate.getDay()) {
				a["00N80000005U4pA"][i]="<span style='background-color: #C2C254'>" + timeSLA + "</span>";
			}
			else {
				a["00N80000005U4pA"][i]="<span style='background-color: #54C254'>" + timeSLA + "</span>";
			}
			
		}
	}
	this.drawListDataWithActionWidth(a, b, c, 1, !1);
	d || this.resize()
};

function twistSection2(twisty, sectionId) {
   var parentDiv = twisty;
   while (parentDiv.tagName != 'DIV') { parentDiv = parentDiv.parentNode; }
   var headerId = sectionId || (parentDiv.id.split('_'))[1]; 
   var div = parentDiv.nextSibling; 
   var elemWasOn = false; 
   if (div.style.display != 'none') { 
       div.style.display = 'none'; 
       parentDiv.firstChild.className ='showListButton';
       parentDiv.firstChild.alt = parentDiv.firstChild.title = 'Show Section - '+parentDiv.firstChild.name;
       elemWasOn = true; 
   } else {
       //do nothing
   } 
addTwistCookie('Twister', headerId, elemWasOn);
  return !elemWasOn;
}

//modifying AJAX query to add events to add hover display to emails
DetailPage.prototype.handleRLAjaxResponse = function(a) {
	Perf.endMark("RL");
	var b;
	try {
		b = Util.evalAjaxServletOutput(a)
	}
	catch (c) {
		window.location.reload()
	}
	if (b.exElem)
		this.handleRLAjaxException(b.exElem);
	else {
		if (b.rls) {
			a = [];
			for (var d in b.rls) {
				var f = getElementByIdCS(d + "_title"),
					e = Sfdc.select("td.pbButton", getElementByIdCS(d))[0],
					g = getElementByIdCS(d + "_body");
				f && (e && g) && (b.rls[d].title && Sfdc.Dom.updateHTML(f, b.rls[d].title), b.rls[d].buttons && (e.currentStyle && (b.rls[d].buttons = '\x3cspan style\x3d"display:none" id\x3d"__REMOVE"\x3e.\x3c/span\x3e' + b.rls[d].buttons), Sfdc.Dom.updateHTML(e, b.rls[d].buttons), e.currentStyle && Sfdc.Dom.removeChild(document.getElementById("__REMOVE"), !0), this.relatedListPanel && this.relatedListPanel.getIFrameNode() && DomUtil.copyScripts(e, this.relatedListPanel.getIFrameNode().contentWindow.document, this.scriptsToNotCopy), Util.evalScriptsUnderElement(e)), f = document.createElement("div"), Sfdc.Dom.updateHTML(f, b.rls[d].content), g.parentNode.replaceChild(f.firstChild, g), this.relatedListsById[d].visibleRowCount = null, this.relatedListsById[d].listHasMore = null, this.relatedListsById[d].shouldLoad = !1, a.push(this.relatedListsById[d]))
				//the only modification
				if(GM_getValue("emailHover","false")=="true"){
					AddHoverToEmails(d);
				}
			}
			this.relatedListPanel && this.relatedListPanel.refresh(a)
		}
		if (b.devFooterHTML && (d = document.getElementById("ajaxPlSql")))
			d.innerHTML = b.devFooterHTML;
		Perf.endMark("RL")
	}
};
	
	




function show_settFloat(e) {
	if (e.which==81 && e.ctrlKey){
		document.getElementById("dim").style.visibility = document.getElementById("dim").style.visibility=="visible" ? "hidden":"visible";		
		document.getElementById("settFloat").style.visibility = document.getElementById("settFloat").style.visibility=="visible" ? "hidden":"visible";

	}
}

unsafeWindow.hide_settFloat =  function() {
	document.getElementById("settFloat").style.visibility = "hidden";
	document.getElementById("dim").style.visibility = "hidden";
};


unsafeWindow.settSave = function () {

	var elements = document.forms['SFDCSettings'].elements;
	for (i=0; i<elements.length; i++){
		if (elements[i].type=="checkbox") {
			elements[i].checked ? GM_setValue(elements[i].name,true) : GM_setValue(elements[i].name,false);
	
		}
	}

};


unsafeWindow.call_show = function() {


	document.getElementById("S_2a").style.visibility = document.getElementById("S_2a").style.visibility=="visible" ? "hidden":"visible";
	document.getElementById("S_2b").style.visibility = document.getElementById("S_2b").style.visibility=="visible" ? "hidden":"visible";
	document.getElementById("D_2a").style.visibility = document.getElementById("D_2a").style.visibility=="visible" ? "hidden":"visible";
	document.getElementById("D_2b").style.visibility = document.getElementById("D_2b").style.visibility=="visible" ? "hidden":"visible";
	
};

//tighter look element - move of the related list panel
RelatedListPanel.prototype.showRL = function(a, b) {
	this.clearhidemenu();
	if (a == this.currentListId) {
		var c = this.getPanelShadowNode();
		if (c) {
			var d = this.getIFrameNode(),
				e = getElementByIdCS(this.getLinkId(a)),
				f = Sfdc.get(".bPageBlock", Sfdc.get(a));
			if (d && e && (!(0 < e.className.indexOf("linkletOn")) || b)) {
				c.style.top = e.offsetTop + e.offsetHeight + "px";
				if (this.isConsole)
					c.style.left = getObjX(this.getHoverableLinksNode()) - 4 + "px", c.style.width = f.offsetWidth - 3 + "px";
				else {
					if (LC.isRtlPage()) {
						var g = this.getHoverableLinksNode().parentNode;
						c.style.right = getObjX(g) + g.offsetWidth - (getObjX(this.getHoverableLinksNode()) + this.getHoverableLinksNode().offsetWidth) - 14 + "px"
					}
					else
						//the only change here - extra 180px
						if(GM_getValue("tightLook","false")=="true") {
							c.style.left = getObjX(this.getHoverableLinksNode()) - 194 + "px";
						}
						else {
							c.style.left = getObjX(this.getHoverableLinksNode()) - 14 + "px";
						}
						
					c.style.width = f.offsetWidth + 13 + "px"
				}
				d.style.height = f.offsetHeight + 5 + "px";
				c.style.display = "block";
				e.className += " linkletOn";
				this.copyStyle()
			}
		}
	}
};





//override email send function
unsafeWindow.sendEmail2 = function() {

	var confirmSend = true;
	if (false) {
		confirmSend = window.confirm('Are you sure?');
	}
	//verify that email contains reference to the call made
	var email_body = document.getElementById("p7").value.substr(0,1000).toLowerCase();

	if (document.getElementById("Call").checked) {
		if (!(email_body.search(" call")>=0 || email_body.search(" ring")>=0 || email_body.search(" reach")>=0 || email_body.search(" telefonisch")>=0 || email_body.search(" Anruf")>=0 || email_body.search(" angerufen")>=0 || email_body.search(" Telefonat")>=0 || email_body.search(" telefoniert")>=0)){
			alert("There seems to be no reference to the call made in your email. Call Outbound cannot be logged!");
			confirmSend = false;	
		}
	}
	
	if (confirmSend) {
		document.editPage.nosave.value = '0';
		document.editPage.save.value = '1';
		if (document.getElementById("Call").checked) {
			var today = new Date();

			var SFDCurl = "";

			//getting redirect link 
			SFDCurl = "/servlet/servlet.Integration?lid=00b80000001HgzP&eid="+document.getElementById("p3_lkid").value+ "&ic=1&retURL="+document.getElementById("retURL").value+"&wrapMassAction=1&scontrolCaching=1";
			GM_xmlhttpRequest({
			  method: "GET",
			  url: SFDCurl,
			  synchronous:true,
			  //'/00T/e?ent=Task&nooverride=1&RecordType=01280000000cYz1&who_id= 00380000016Y6if&retURL=500V00000039gEa&what_id=500V00000039gEa&tsk10=Call Manual&tsk5=Call&followup=1';
			  //data: "username=johndoe&password=xyz123",
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
  		      onload: function(response) {
				GM_log([
				  response.status,
				  response.statusText,
				  response.readyState,
				  response.responseHeaders,
				  response.responseText,
				  response.finalUrl
				].join("\n ---------------- \n"));
				if(response.responseText.indexOf("window.location.href")>=0) {
					var red_index = response.responseText.indexOf("window.location.href");
					SFDCurl = response.responseText.substr(red_index+23,response.responseText.indexOf('\'',red_index+23)-(red_index+23));
					GM_log(SFDCurl);
					//getting redirected website with Activity log details
					GM_xmlhttpRequest({
					  method: "GET",
					  url: SFDCurl,
					  synchronous:true,
					  headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  onload: function(response) {
						//GM_log(response.responseText);
						if(response.responseText.indexOf("tsk1_fu_lkid")>=0) {
							//put the response into DIV so its browsable as DOM
							var ActLog = document.createElement( 'div' );
							ActLog.innerHTML = response.responseText;
							//find the appropraite form element and search only its inputs
							var FrmEl = ActLog.getElementsByTagName('form');
							for (var i = 0; i < FrmEl.length; i++) {
								if (FrmEl[i].id == 'editPage') {
									var InpEl = FrmEl[i].getElementsByTagName('input');
									//create the table of input values
									var InpElList =[];
									for (var j = 0; j < InpEl.length; j++) {
										InpElList[InpEl[j].name] = InpEl[j].value;
									}
								
								}
							}
							GM_log(InpElList["tsk1_fu_lkid"]);
							
							//build post data
							var pst_dt = "";
							for (SingleInpEl in InpElList) {
								if (SingleInpEl != "tsk5" && SingleInpEl != "cancel" && SingleInpEl != "IsVisibleInSelfService" && SingleInpEl != "IsVisibleInSelfService_fu" && SingleInpEl.substring(0,3) != "00N"){	pst_dt+=SingleInpEl+"="+encodeURIComponent(InpElList[SingleInpEl])+"&";}
							}
							pst_dt+="tsk10=Call+Manual&";
							pst_dt+="tsk5="+ encodeURIComponent(document.getElementById("S_2").value) +"&";
							pst_dt+="tsk6="+ encodeURIComponent(document.getElementById("D_2").value);
							//pst_dt+="&reminder_dt_fu_time=480&tsk13_fu=Normal&tsk1_mlktp=5&tsk2_mlktp=3&tsk3_mlktp=500&tsk1_fu_mlktp=5&reminder_ldt_fu=0&reminder_ldt_fu_time=480";
							
							GM_log(pst_dt);
							//URI encoding continued
							pst_dt = pst_dt.replace(/%20/g,"+");
							pst_dt = pst_dt.replace(/\(/g,"%28");
							pst_dt = pst_dt.replace(/\)/g,"%29");
							pst_dt = pst_dt.replace(/\'/g,"%27");
							GM_log(pst_dt);
							
							//log the activity
							GM_xmlhttpRequest({
							  method: "POST",
							  url: "/00T/e",
							  data: pst_dt,
							  synchronous:true,
							  headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							  },
							  onload: function(response) {
								GM_log(response.responseText);
							  }
							  
							});
						}
						else
						{
							alert("Unable to Log a Call!");
						}
					  }
					});
					
				}
				else 
				{
					alert("Unable to Log a Call!");
				}
			  }
			});
		
		}		
		submitForm();
		
	}
};


unsafeWindow.ISAlert = function() {


	var mesg = "";
	mesg += "https://vmshare.vmware.com/gss/TS/lic/Lists/Internal%20Survey/survey.aspx?Source=ThankYou.aspx&SR="+ document.getElementById("cas2_ileinner").textContent;
	mesg+= "&AN="+ document.getElementById("cas1_ileinner").firstChild.textContent;
	mesg+= "&CN="+ document.getElementById("cas3_ileinner").firstChild.textContent;
	mesg+= "&CE="+ document.getElementById("cas10_ileinner").firstChild.textContent;
	
	mesg = mesg.replace("[View Hierarchy]","");	
	mesg = mesg.replace(/ /g,"%20");
	mesg = mesg.replace(/\xA0/g,"");
	
	mesg = "Please select and copy below link: \n\n"+mesg;
	
	alert(mesg);
};



(function(){
	var css = '';
	var txt = '';
	var mo_timeout;
	var pbHead = document.getElementsByClassName('pbSubheader');
	
	//--------SFDC Script Settings---------
	//only available when reviewing case
	if(document.getElementById("ep") != null){
		//dimmed background
		var dim = document.createElement("div");
		dim.id="dim";
		dim.style="height:100%; width:100%; position:fixed; left:0; top:0; background-color:white; opacity:0.7; visibility: hidden;";
		document.body.appendChild(dim);
			
		//settings div
		var height=330;
		var settFloat = document.createElement("div");
		
		var sf = '<b style="margin-left:130px ;font-size: 1.1em;">SFDC Changes Settings</b><br><br><form name="SFDCSettings" onsubmit="settSave();">';
		sf += '<b>Changes to display:</b><br>';
		sf += '<input class="inpt" type="checkbox" name="tightLook">&nbsp;Enable "condensed" look<br>';
		sf += '<input class="inpt" type="checkbox" name="sidebarHide">&nbsp;Make sidebar hide automatically (hide it first!)<br>';
		sf += '&nbsp;&nbsp;&nbsp;<input class="inpt" type="checkbox" name="sidebarFloat">&nbsp;Make sidebar float over content<br>';
		sf += '<input class="inpt" type="checkbox" name="descScroll">&nbsp;Make Description field scrollable<br>';
		sf += '<input class="inpt" type="checkbox" name="RLScroll">&nbsp;Make Related Lists scrollable<br>';
		sf += '<input class="inpt" type="checkbox" name="CDI">&nbsp;Put "Customer Details"  and "Case Information" next to each other<br>';
		sf += '<input class="inpt" type="checkbox" name="SLA">&nbsp;Color the SLA Time Left in the case list view<br>';
		sf += '<br><b>Additional functionality:</b><br>';
		sf += '<input class="inpt" type="checkbox" name="emailHover">&nbsp;Enable email preview on link hover<br>';
		sf += '<input class="inpt" type="checkbox" name="CML">&nbsp;Enable logging calls along sending emails<br><br>';
		//sf += '<input class="inpt" type="checkbox" name="IS">&nbsp;Enable Internal Survey Link button<br><br>';
		sf += '<b>Select Sections to be collapsed as default:</b><br>';
		for (var i = 0; i < pbHead.length; i++) {
			if(pbHead[i].childNodes[1]!=null){
				sf+='&nbsp;&nbsp;&nbsp;&nbsp;<input class="inpt" type="checkbox" name="' + pbHead[i].id + '">&nbsp;' + pbHead[i].childNodes[1].textContent + '<br>'
				height+=15;
			}
		}
		sf+='<br><br><input class="inpt" type="submit" value="Save" style="padding: 5px;margin:0px 10px 0px 10px;"><input class="inpt" type="button" value="Cancel" onClick="hide_settFloat();" style="padding: 5px; margin:0px 10px 0px 10px;"></form>';
		settFloat.innerHTML+=sf;
		settFloat.id="settFloat";
		settFloat.title="SFDC Changes Settings";
		document.body.appendChild(settFloat);

		//Floating settings callouts
		css+=" #settFloat {    visibility: hidden;    position:    absolute;    left:        50%;        /* Start with top left in the center */    top:         100px;    width:       400px;      /* The fixed width... */    height:      " +height+ "px;      /* ...and height */    margin-left: -200px;     /* Shift over half the width */    margin-top:  0px;      /* Shift up half the height */ border: 1px solid #1797C0;background-color: #FFFFFF; padding: 10px;} .inpt{margin: 0px; padding: 0px;}"
		
		//event listener for Ctrl+q
		window.addEventListener('keydown', show_settFloat, true);
		
		//reading settings stored locally
		var elements = document.forms['SFDCSettings'].elements;
		for (i=0; i<elements.length; i++){
			elements[i].checked = GM_getValue(elements[i].getAttribute("name"),"false")=="true"? true:false ;
		}
	}
	//--------SFDC Script Settings---------

	
	//--------Sidebar---------
	//floating/popping sidebar
	if(GM_getValue("sidebarHide","false")=="true" || GM_getValue("sidebarFloat","false")=="true"){
		if(document.getElementById("sidebarCell") != null){
			document.getElementById("sidebarCell").removeChild(document.getElementById("sidebarCell").childNodes[0]);
			document.getElementById("sidebarCell").addEventListener("mouseenter",function(a) {
						mo_timeout = setTimeout(function(){document.getElementById("sidebarCell").setAttribute("class", "sidebarCell sidebarCollapsible");},500)
					},false);
			document.getElementById("sidebarCell").addEventListener("mouseleave",function(a) {
						document.getElementById("sidebarCell").setAttribute("class", "sidebarCell sidebarCollapsible sidebarCollapsed");
						clearTimeout(mo_timeout)
					},false);
		}
	}
	
	//additions for hidden sideBar (floating)
	if(GM_getValue("sidebarFloat","false")=="true") {
		css+= ".rls_l{left:30px;} .rls_tl{left:30px;} .rls_bl{left:30px;} .rls_bottom{margin: 0px 13px 0px 43px;} .rls_top{margin: 0px 13px 0px 43px;} body.rlHoverFrame {margin: 0px 0px 0px 30px;} .hasMotif {margin: 0px 0px;} .sidebarCollapsible{padding: 9px 0px 0px 10px;} #sidebarDiv{float: left;position: fixed;width: 200px; border: 1px solid #1797c0; padding:5px;} #sidebarDiv .sidebarModule {margin: 0px 0px 10px;} .sidebarCell{width:0px;} "
	}
	
	//additions for hidden sideBar (popping)
	if(GM_getValue("sidebarHide","false")=="true" && GM_getValue("sidebarFloat","false")!="true") {
		css+= ".rls_l{left:30px;} .rls_tl{left:30px;} .rls_bl{left:30px;} .rls_bottom{margin: 0px 13px 0px 43px;} .rls_top{margin: 0px 13px 0px 43px;} body.rlHoverFrame {margin: 0px 0px 0px 30px;} .hasMotif {margin: 0px 0px;} #sidebarDiv { position: fixed; border: 1px solid #1797c0} "
	}
	//--------Sidebar---------
	
	//---------Description scrollable --------------
	if(document.getElementById("cas15_ileinner") != null && GM_getValue("descScroll","false")=="true"){
		document.getElementById("cas15_ileinner").setAttribute("style", "max-height:250px;overflow:auto;");
	}
	//extra for the desc field used in CR
	if(document.getElementById("00N80000004Co21_ileinner") != null && GM_getValue("descScroll",false)){
		document.getElementById("00N80000004Co21_ileinner").setAttribute("style", "max-height:250px;overflow:auto;");
	}
	//---------Description scrollable --------------


	//-------------Tight look-----------------------
	if(GM_getValue("tightLook","false")=="true"){
		if(document.getElementById("ep") != null){
			//document.getElementById("ep").setAttribute("class", "bPageBlock bEditBlock secondaryPalette");
			//txt += document.getElementById("ep").firstChild.firstChild.firstChild.firstChild.firstChild.tagName;
			//alert(txt);
			document.getElementById("ep").firstChild.firstChild.firstChild.firstChild.firstChild.setAttribute("style", "max-width: 100px;");
			
			css+= ".bEditBlock.bPageBlock .detailList tr td, .bEditBlock.bPageBlock .detailList tr th {border-bottom-width:0px;}  .pbSubheader {margin-top:0px;}  body .bPageBlock{margin-bottom:0px;}   body .bPageBlock .pbBody .pbSubheader img {margin-top:-5px;}   body .bEditBlock .pbBody .pbSubheader, body .bWizardBlock .pbBody .pbSubheader {padding:0px 0px; border-top:0px solid #FFFFFF;}";
			
			//Buttons and top row change; no padding between cells
			css+= "body .bPageBlock .pbTitle {padding:0px 0px;}    .bPageBlock .pbTitle {width:20%;}     body .bPageBlock .pbBody .pbSubheader {padding:0px 0px;}    body .bDetailBlock.bPageBlock .pbBody .labelCol, body .bDetailBlock.bPageBlock .pbBody .dataCol, body .bDetailBlock.bPageBlock .pbBody .data2Col, body .bPageBlock.bEditBlock .pbBody .labelCol, body .bPageBlock.bEditBlock .pbBody .dataCol, body .bPageBlock.bEditBlock .pbBody .data2Col {padding-bottom: 0px;padding-top: 0px; padding-right: 0px;}    .list td, .list th, body.oldForecast .list .last td, body.oldForecast .list .last th {padding: 0px 0px 0px 0px;} ";
			
			//Uncomment the next line if you want to remove the blue table header for the related lists.
			//css+= "body .pbBody table.list tr.headerRow td, body .pbBody table.list tr.headerRow th {background:none; border-width:0 0 1px 1px; border-width:0 0 3px; font-size:1.0em;}";
		}

		//resize top logo
		document.getElementById("phHeaderLogoImage").setAttribute("height", "18");
		css+="#tsid, #helpNav, #userNav, #emailSettingsMink {height: 18px;}    #tsidButton, #helpNavButton, #userNavButton {height: 18px;line-height: 18px;} #AppBodyHeader .phHeader { margin-bottom: 0px;}   .zen .zen-tabMenu > li {height: 18px;line-height: 18px;}"
		
		//resize the title bar
		css+="body .bPageTitle { padding: 0px 0px 0px;} .bPageTitle .ptBreadcrumb {margin-top: 0px;} .listHoverLinks { margin: 0px 0px 0px;}"
		
		//bring related lists up (related to RelatedListPanel.prototype.showRL)
		css+=".listHoverLinks { margin: -35px 0px 0px 180px;}"

		//-------------Tight look-----------------------
	}

	
	//------------Email Hover (addition to Ajax function)--------------
	if(GM_getValue("emailHover","false")=="true"){
		css+= ".lookupHoverDetail2 .bPageBlock .pbHeader .pbTitle{  border:none;  background-color:transparent;  width:45%;}.lookupHoverDetail2 .bPageBlock .pbHeader .errorTitle{  display:block;  font-size:91%;  color:#fff;  margin:2px 0 4px 4px;}.lookupHoverDetail2 .bPageBlock .pbHeader .pbButton{  text-align:right;  border:none;  background-color:transparent;}.lookupHoverDetail2 .bPageBlock .detailList .labelCol{  width:15%;  border-bottom:1px solid #e3deb8;}.lookupHoverDetail2 .bPageBlock .detailList .dataCol,.lookupHoverDetail2 .bPageBlock .detailList .data2Col{  width:67%;  border-bottom:1px solid #e3deb8;}.lookupHoverDetail2{  position:absolute;  z-index:15;  top:0;  left:0;  visibility:hidden;  margin:0;  padding:0;}.lookupHoverDetail2 .bPageBlock{  border:none;  width:700px;  height:290px;  margin:0;  padding:0;}.lookupHoverDetail2 .userProfileHoverPageBlock{  width:369px;  height:auto;}.lookupHoverDetail2 .bPageBlock .pbBody{  width:640px;  height:207px;  overflow-y:auto;  overflow-x:hidden;  border:none;  background-color:#f5f5ef;  margin:0;  padding:6px 10px;}.lookupHoverDetail2 .userProfileHoverPageBlock .pbBody{  width:349px;}.lookupHoverDetail2 .hoverExceptionTitle{  font-size:1.3em;  font-weight:700;  margin-top:5px;  margin-bottom:5px;}.lookupHoverDetail2 .bPageBlock .pbHeader{  border:none;  background-color:transparent;  margin:0;  padding:1px 0 0;}.lookupHoverDetail2 .bPageBlock .pbTitle h2,.lookupHoverDetail2 .bPageBlock .pbTitle h3{  color:#fff;  overflow:hidden;  width:132px;}.lookupHoverDetail2 .topLeft,.lookupHoverDetail2 .bottomLeft,.lookupHoverDetail2 .topRight,.lookupHoverDetail2 .bottomRight{  height:239px;  overflow:hidden;  padding-left:14px;  padding-right:14px;  margin:0;}.lookupHoverDetail2 .bPageBlock .pbFooter,.lookupHoverDetail2 .hoverException .bPageBlock .pbHeader,.lookupHoverDetail2 .hoverException .bPageBlock .pbFooter{  display:none;}body .lookupHoverDetail2.individualPalette .hoverException .bPageBlock{  background-color:transparent;}.lookupHoverDetail2 .bPageBlock .userProfileHoverBody,.lookupHoverDetail2 .bPageBlock .contentDocumentHoverBody{  padding-bottom:0;}.lookupHoverDetail2 .bPageBlock .detailList .last{  border-bottom:none;}.lookupHoverDetail2 div.userProfileHoverPageBlock .pbHeader,.lookupHoverDetail2 div.contentDocumentHoverPageBlock .pbHeader{  padding:1px 5px 0;}.lookupHoverDetail2 .bPageBlock .pbHeader{  -moz-border-radius:4px;  -webkit-border-radius:4px;  border-radius:4px;  border-style:solid;  border-width:3px 0 0;}.lookupHoverDetail2 .bPageBlock .pbBody{  background:#FFF none;  height:auto;  width:640;  margin:0 11px;  padding:0;}.lookupHoverDetail2 .bPageBlock .pbFooter{  background:transparent url(/img/sprites/hover_sprite.png) no-repeat;  display:block;  position:absolute;  width:100%;  height:14px;  bottom:-14px;  left:0;}.lookupHoverDetail2 .pbHeader .pbTitle h2.mainTitle{  color:#333435;  font-size:1.3em;}body .lookupHoverDetail2 .bPageBlock .pbHeader .pbTitle{  width:38%;}.lookupHoverDetail2{  height:auto;  width:auto;}body .lookupHoverDetail2.individualPalette>div>.bPageBlock{  background:transparent;  border:0;  width:700px;  height:auto;}.lookupHoverDetail2.individualPalette .bPageBlock .pbHeader{  display:block;  padding:3px 9px 0 7px;}.lookupHoverDetail2.individualPalette .bPageBlock .pbBody{  max-height:265px;}.lookupHoverDetail2 .topLeft,.lookupHoverDetail2 .topRight,.lookupHoverDetail2 .bottomLeft,.lookupHoverDetail2 .bottomRight{  background:transparent url(/img/sprites/hover_sprite.png) 0 -29px no-repeat;  height:auto;  width:auto;  padding:3px 6px 10px;}.lookupHoverDetail2 .bottomRight,.lookupHoverDetail2 .bottomLeft{  margin-top:-6px;}.lookupHoverDetail2.individualPalette .topLeft{  background-position:0px 0px;  margin-left:15px;  margin-top:-2px; background-size:700px 300px;}.lookupHoverDetail2.individualPalette .topLeft .bPageBlock{  background:transparent url(/img/alohaSkin/hover_lookup_tl.png) 0 10px no-repeat;  padding-left:24px;}.lookupHoverDetail2.individualPalette .topLeft .pbFooter{  left:39px;  display:block;}.lookupHoverDetail2.individualPalette .topRight{  margin-left:-25px;  margin-top:-2px;}.lookupHoverDetail2.individualPalette .topRight .bPageBlock{  background:transparent url(/img/alohaSkin/hover_lookup_tr.png) right 10px no-repeat;  padding-right:24px;}.lookupHoverDetail2.individualPalette .topRight .pbFooter{  left:-25px;}.lookupHoverDetail2.individualPalette .bottomRight .pbFooter .bg,.lookupHoverDetail2.individualPalette .bottomLeft .pbFooter .bg{  background:transparent url(/img/alohaSkin/hover_lookup_bottom.png) no-repeat;  position:absolute;  width:33px;  height:26px;  bottom:-17px;}.lookupHoverDetail2.individualPalette .bottomRight .pbFooter .bg{  right:45px;}.lookupHoverDetail2.individualPalette .bottomLeft .pbFooter .bg{  left:30px;}.lookupHoverDetail2.lookupHoverDetail2Loading .bPageBlock .pbBody{  background:url(/img/loading.gif) 0 17px no-repeat;  padding:19px 0 11px 24px;}.lookupHoverDetail2.lookupHoverDetail2Loading .bottomRight,.lookupHoverDetail2.lookupHoverDetail2Loading .bottomLeft{  margin-top:180px;}body .lookupHoverDetail2 .pbHeader .pbButton input:first-child{  margin-right:5px;}body .lookupHoverDetail2 .bPageBlock .detailList .labelCol,body .lookupHoverDetail2 .bPageBlock .detailList .dataCol{  border-color:#ececec;}body .lookupHoverDetail2 .bPageBlock .pbHeader .pbButton{  text-align:left;}.lookupHoverDetailOverridable2{  width:700px;  height:300px;}.lookupHoverDetailOverridable2 .topLeft,.lookupHoverDetailOverridable2 .bottomLeft,.lookupHoverDetailOverridable2 .topRight,.lookupHoverDetailOverridable2 .bottomRight{  width:700px;}.lookupHoverDetailOverridable2 .topLeft{  background:url(/img/topLeftBubble.png) no-repeat center;  padding-top:19px;  padding-bottom:12px; padding-left:19px}.lookupHoverDetailOverridable2 .bottomLeft{  background:url(/img/bottomLeftBubble.png) no-repeat center;  padding-top:4px;  padding-bottom:27px;  margin-top:8px;}.lookupHoverDetailOverridable2 .topRight{  background:url(/img/topRightBubble.png) no-repeat center;  padding-top:19px;  padding-bottom:12px;}.lookupHoverDetailOverridable2 .bottomRight{  background:url(/img/bottomRightBubble.png) no-repeat center;  padding-top:4px;  padding-bottom:27px;  margin-top:8px;}"
	}
	//------------Email Hover (addition to Ajax function)--------------

	
	//------------Section collapsing---------------------
	for (var i = 0; i < pbHead.length; i++) {
		if (GM_getValue(pbHead[i].id,"false")=="true"){
			twistSection2(document.getElementById(pbHead[i].id));
		}
	}
	//------------Section collapsing---------------------

	//------------------Move Case Information Section next to Contact Details---------------------
	if (GM_getValue("CDI","false")=="true"){
		css+="#CDI .labelCol { width: 21.5%;} ";	
		if(document.getElementById("head_01B8000000PR1Xu_ep")!=null) {
			//expand the Additional Email
			document.getElementById("00N80000005416x_ilecell").setAttribute("colspan",3);
			var CDI = document.createElement("div");
			CDI.id="CDI";
			CDI.style="width:100%; overflow:auto";	
			
			var CD = document.createElement("div");
			CD.id="CD";
			CD.style="width:50%; float:left; border-right:1px solid #c0be72;margin-right:-1px";	
			
			var CI = document.createElement("div");
			CI.id="CI";
			CI.style="width:50%; float:left; border-left:1px solid #c0be72; margin-left:-1px";	

			var parN = document.getElementById("head_01B8000000PR1Xu_ep").parentNode;
			
			CDI.appendChild(CD);
			CDI.appendChild(CI);
			
			parN.insertBefore(CDI,parN.childNodes[1]);
			
			CD.appendChild(document.getElementById("head_01B8000000PR1Xu_ep").nextSibling);
			CD.insertBefore(document.getElementById("head_01B8000000PR1Xu_ep"),CD.childNodes[0]);
			
			CI.appendChild(document.getElementById("head_01B8000000PR1Xw_ep").nextSibling);
			CI.insertBefore(document.getElementById("head_01B8000000PR1Xw_ep"),CI.childNodes[0]);
		} 
	}	
	//------------------Move Case Information Section next to Contact Details---------------------

	
	
	
	
	//---------------Scrollable Related Lists---------------
	if(GM_getValue("RLScroll","false")=="true") {
		css+= "body .bRelatedList .bPageBlock .pbBody { max-height: 450px;overflow: auto;}"
	}
	//---------------Scrollable Related Lists---------------
	
	//--------------- Different color for SubTotal ----------
	css+= ".bPageBlock .reportOutput .matrixReportTable th.subTotal, .bPageBlock .reportOutput .matrixReportTable td.subTotal { background-color: #D0EEF8;}";
	//--------------- Different color for SubTotal ----------
	

	
	
	
	//------------------Email with Call--------------------
	if(GM_getValue("CML","false")=="true"){
		if(document.getElementById("p6")!=null) {
		
			//trick for FF to replace onClick event on Send button
			var Buttons = document.getElementsByTagName('INPUT');
			for (var i = 0; i < Buttons.length; i++) {
				if(Buttons[i].getAttribute("onclick")) {
					if(Buttons[i].getAttribute("onclick")=="sendEmail();") {Buttons[i].setAttribute("onclick","sendEmail2();");}
				}
			}
			
			//edit columns to be smaller
			css+= ".bPageBlock .detailList .labelCol {width:auto;} .bPageBlock .detailList .data2Col { width: auto;}";
			
			//add new input fields
			var S_1 = document.getElementById("p6");
			while (S_1.tagName != 'TR') { S_1 = S_1.parentNode; }
			var S_2a = S_1.childNodes[0].cloneNode(true);
			var S_2b = S_1.childNodes[1].cloneNode(true);
			S_2a.setAttribute("id","S_2a");
			S_2b.setAttribute("id","S_2b");
			S_2a.setAttribute("style","visibility:hidden");
			S_2b.setAttribute("style","visibility:hidden");
			S_2a.firstChild.setAttribute("for","S_2");
			S_2a.firstChild.textContent="Call Subject";
			S_2b.firstChild.childNodes[1].setAttribute("id","S_2");
			S_2b.firstChild.childNodes[1].setAttribute("name","S_2");
			S_1.appendChild(S_2a);
			S_1.appendChild(S_2b);
			
			var D_1 = document.getElementById("p7");
			while (D_1.tagName != 'TR') { D_1 = D_1.parentNode; }
			var D_2a = D_1.childNodes[0].cloneNode(true);
			var D_2b = D_1.childNodes[1].cloneNode(true);
			D_2a.setAttribute("id","D_2a");
			D_2b.setAttribute("id","D_2b");
			D_2a.setAttribute("style","visibility:hidden");
			D_2b.setAttribute("style","visibility:hidden");
			D_2a.firstChild.setAttribute("for","D_2");
			D_2a.firstChild.textContent="Call Notes";
			D_2b.firstChild.setAttribute("id","D_2");
			D_2b.firstChild.setAttribute("name","D_2");
			D_2b.firstChild.value="";
			D_1.appendChild(D_2a);
			D_1.appendChild(D_2b);
			
			var Call = document.createElement("tr");
			Call.innerHTML = '<td class="labelCol">    <label for="Call">Call Outbound Made    </label>  </td>  <td class="data2Col"colspan="3"> <input id="Call" name="Call" type="checkbox" onclick="call_show();">    </td>';
			S_1.parentNode.insertBefore(Call,S_1);
			
		}
	}	

	
	
	//------------------Email with Call--------------------


	
	//-----------------Internal Survey Link-----------------
	if(GM_getValue("IS","false")=="true"){
		if(document.getElementById("cas10_ileinner")!=null) {
			if(document.getElementById("cas10_ileinner").textContent.indexOf("@vmware.com")>0) {
				var ISbtn = document.createElement("input");
				ISbtn.setAttribute("value","Internal Survey Link");
				ISbtn.setAttribute("class","btn");
				ISbtn.setAttribute("title","IS");
				ISbtn.setAttribute("onclick","ISAlert();");
				ISbtn.setAttribute("type","button");
				
				document.getElementById("topButtonRow").appendChild(ISbtn);
				document.getElementById("cas10_ileinner").setAttribute("style","background:#FF9999");
			}
		}
	}
	//-----------------Internal Survey Link-----------------
	

	if(typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	}else if(typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	}else if(typeof addStyle != "undefined") {
		addStyle(css);
	}else{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 

		}
	}
	
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.textContent = "(" + LookupHoverDetail + ")();";

	document.body.appendChild(script);
	
	

	
	
		/*var dyv = document.createElement('div');
		dyv.setAttribute("class","dz-default dz-message");
		dyv.textContent = "drop here";
		frm.appendChild(dyv);*/
	//}, false);
	
//	var scrypt = document.createElement('script'); 
//	scrypt.type = 'text/javascript';
//	scrypt.src = "https://raw.github.com/enyo/dropzone/master/downloads/dropzone.js";
//	document.getElementsByTagName('head')[0].appendChild(scrypt);
//	scrypt.addEventListener('load', function(){ 
		//function();
//	}, false);
})();

