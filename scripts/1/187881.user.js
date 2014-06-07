// ==UserScript==
// @name          Salesforce LATF team 
// @namespace     http://userscripts.org/users/126885
// @description	  Requirement to include all fields before saving
// @author        VatzU
// @homepage      none
// @include       https://*.salesforce.com/*
// @grant 		  none
// ==/UserScript==

unsafeWindow.EditPage.prototype.disableSaveButtons = function() {
	var msg = '';
	var alrt=0;

	if(document.getElementById("head_11_ep").nextSibling.children[0].children[0].children[0].children[3].innerHTML.indexOf("Legal")>=0)	{
		
		frm = document.forms['editPage'];
	//	alert(oFormObject.elements["00N800000052xb0"].value);

		if(frm.elements["00N800000052xav"].checked == false  || frm.elements["00N800000052xb0"].value=="") {
			msg += "\n The ELA details were not provided. Verify if the licenses are covered by one.\n";
		}

		if(frm.elements["00N800000052xb5"].checked == false || 
			frm.elements["00N800000052xbA"].checked == false ||
			frm.elements["00N800000052xbF"].checked == false ||
			frm.elements["00N800000052xcm"].checked == false ||
			frm.elements["00N800000052xcr"].checked == false ||
			frm.elements["00N800000052xbZ"].checked == false ) {
			
			alrt =1;
			msg += "\n Not all of the fields in Requestor Validation Confirmation Section were updated. Please double check before proceeding.\n";
		}
		
		if(frm.elements["00N800000050bh6"].value.indexOf("Non")>=0) {
			if(frm.elements["00N800000052xbj"].value=="" || 
				frm.elements["00N800000052xbo"].value=="" ||
				frm.elements["00N800000052xbt"].value=="" ||
				frm.elements["00N800000052xby"].value=="" ||
				frm.elements["00N800000052xc3"].value=="" ||
				frm.elements["00N800000052xc8"].value=="" ||
				frm.elements["00N800000052xcD"].value=="" ||
				frm.elements["00N800000052xc9"].value=="" ||
				frm.elements["00N800000052xcI"].value=="" ||
				frm.elements["00N800000052xcN"].value=="" ||
				frm.elements["00N800000052xcS"].value=="" ||
				frm.elements["00N800000052xcX"].value=="" ) {
			
				alrt =1;
				msg += "\n Please update all Business Case questions for Non-Standard Requests\n";
			}
			
			if(frm.elements["00N800000052xbe"].value==""){
				alrt =1;
				msg += "\n Please update Sales Rep details for Non-Standard Requests\n";
			}
		}
		
		msg += "\n Please make sure that you have attached correct LATF and Supporting Document\n";	
		if(alrt==1){
			msg+= "\n\nPLEASE FIX THE ERRORS BEFORE PROCEEDING";
			alert(msg);
			return false;
		}else{
			msg+= "\n\nAre you sure you want to Save your changes?";
			if (confirm(msg)) {
				if (this.saved)
					return !1;
				(!this.pressedButton || this.pressedButton.name != EditPageConstants.pCANCEL) && this.disableButtons();
				return this.saved = !0

			} else {
				return false;
			}
		}
	}else{
		if (this.saved)
			return !1;
		(!this.pressedButton || this.pressedButton.name != EditPageConstants.pCANCEL) && this.disableButtons();
		return this.saved = !0
	
	}
};

unsafeWindow.DetailPage.prototype.save = function() {
	var msg = '';
	var alrt=0;
	
	if(document.getElementById("RecordType_ileinner").innerHTML.indexOf("Legal")>=0)	{
	
		if(document.getElementById("00N800000052xav_chkbox").getAttribute("title")=="Not Checked" || document.getElementById("00N800000052xb0_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;") {
			msg += "\n The ELA details were not provided. Verify if the licenses are covered by one.\n";
		}
		
		if(document.getElementById("00N800000052xb5_chkbox").getAttribute("title")=="Not Checked" || 
			document.getElementById("00N800000052xbA_chkbox").getAttribute("title")=="Not Checked" ||
			document.getElementById("00N800000052xbF_chkbox").getAttribute("title")=="Not Checked" ||
			document.getElementById("00N800000052xcm_chkbox").getAttribute("title")=="Not Checked" ||
			document.getElementById("00N800000052xcr_chkbox").getAttribute("title")=="Not Checked" ||
			document.getElementById("00N800000052xbZ_chkbox").getAttribute("title")=="Not Checked") {
			
			alrt =1;
			msg += "\n Not all of the fields in Requestor Validation Confirmation Section were updated. Please double check before proceeding.\n";
		}
		
		if(document.getElementById("00N800000050bh6_ileinner").innerHTML.indexOf("Non")>=0) {
			if(document.getElementById("00N800000052xbj_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xbo_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xbt_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xby_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xc3_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xc8_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xcD_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xc9_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xcI_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xcN_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xcS_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ||
				document.getElementById("00N800000052xcX_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;") {
			
				alrt =1;
				msg += "\n Please update all Business Case questions for Non-Standard Requests\n";
			}
			
			if(document.getElementById("00N800000052xbe_ileinner").innerHTML.replace(/^\s*/, "").replace(/\s*$/, "")=="&nbsp;" ){
				alrt =1;
				msg += "\n Please update Sales Rep details for Non-Standard Requests\n";
			}
		}
		
		msg += "\n Please make sure that you have attached correct LATF and Supporting Document\n";
		
		if(alrt==1){
			msg+= "\n\nPLEASE FIX THE ERRORS BEFORE PROCEEDING";
			alert(msg);
		}else{
			msg+= "\n\nAre you sure you want to Save your changes?";
			if (confirm(msg)) {
				if (!this.saving && this.editMode) {
					this.saving = !0;
					for (var a = 0; a < this.editButtons.length; a++)
						this.editButtons[a].className = "btnDisabled", this.editButtons[a].value = LC.getLabel("Buttons", "saving");
					this.inlineEditData.save()
				}
			} else {
				// Do nothing!
			}
		}
	}else{
		if (!this.saving && this.editMode) {
			this.saving = !0;
			for (var a = 0; a < this.editButtons.length; a++)
				this.editButtons[a].className = "btnDisabled", this.editButtons[a].value = LC.getLabel("Buttons", "saving");
			this.inlineEditData.save()	
		}
	}
};
