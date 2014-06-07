// ==UserScript==
// @name           [WAD TEST] SAP WAD Common ContextMenu Edit Test
// @description    [WAD TEST] SAP WAD Common ContextMenu Edit Test
// @namespace      http://userscripts.org/users/wschoe
// @homepageURL    http://userscripts.org/scripts/show/167057
// @updateURL      http://userscripts.org/scripts/show/167057.meta.js
// @copyright      2013+, wschoe (http://userscripts.org/users/wschoe)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/2.0/kr/
// @author WSChoe
// @version 0.0.11
// @date 2013-11-16
// @injectframes   0
// @include        */irj/servlet/prt/portal/prtroot/com.sap.ip.bi.web.portal.integration.launcher*
// @match          */irj/servlet/prt/portal/prtroot/com.sap.ip.bi.web.portal.integration.launcher*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-end
// @license MIT License
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// @enable          true
// ==/UserScript==

// test console.log(top.bexFrame.sapbi_rriCommands)

//****************************************************************
// Initiallization for Global Data
//****************************************************************
var lwin = window; // Local Window
//****************************************************************
// Implementation of Common Function
//****************************************************************
//* Remove White Space Before and After in String
String.prototype.trim = function () {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
String.prototype.ltrim = function () {
	return value.replace(/^\s+/, "");
}; // Left Trim
String.prototype.rtrim = function () {
	return value.replace(/\s+$/, "");
}; // Right Trim

//IE<9.0 has not Object.keys Function for Index Search of Object.
if(typeof Object.keys === 'undefined') {
	Object.prototype.keys = function (obj) {
		var length = 0;
		var objArr = new Array();
		for(var prop in obj){
			if(obj.hasOwnProperty(prop)){
				//alert();
				objArr[length] = prop;
				length++;
                //console.log("prop",prop);
			}
		}
		return objArr;
	};
}
//****************************************************************
// Initiallization for GreaseMonkey Script
//****************************************************************
//Reference URL: http://wiki.greasespot.net/UnsafeWindow#Alternatives_to_unsafeWindow
var lwin = (typeof this.unsafeWindow !== 'undefined') ? this.unsafeWindow : window; // Firefox, Opera<15
if (this == lwin) {
	lwin.document.domain = "dfocus.net";
}
if (typeof this.sapbi_page === 'undefined' && typeof lwin.sapbi_page !== 'undefined') {
	//console.log(lwin.sapbi_page);
	//var bexFrameBody = lwin.bexFrameBody;
	var sapbi_CommandSequence = lwin.sapbi_CommandSequence;
	var sapbi_Command = lwin.sapbi_Command;
	var sapbi_Parameter = lwin.sapbi_Parameter;
	var sapbi_ParameterList = lwin.sapbi_ParameterList;
	var sapbi_page = lwin.sapbi_page;
	var sapbi_cmCreateMenu = lwin.sapbi_cmCreateMenu;

	var sapbi_cmAddBack = lwin.sapbi_cmAddBack;
	var sapbi_cmAddRri = lwin.sapbi_cmAddRri;
	var sapbi_cmAddFilter = lwin.sapbi_cmAddFilter;
	var sapbi_cmAddChangeDrillDown = lwin.sapbi_cmAddChangeDrillDown;
	var sapbi_cmAddHierarchy = lwin.sapbi_cmAddHierarchy;

	var sapbi_cmIsVisible = lwin.sapbi_cmIsVisible;

	var sapbi_cmCreateEntry = lwin.sapbi_cmCreateEntry;
	var sapbi_cmGetEntryText = lwin.sapbi_cmGetEntryText;

	var mf_PopupMenu_addItem = lwin.mf_PopupMenu_addItem;
	var mf_PopupMenu_apply = lwin.mf_PopupMenu_apply;

	var sapbi_CONST_ENABLE_MENU_PRINT = lwin.sapbi_CONST_ENABLE_MENU_PRINT;
	var sapbi_MD70_EXPORT = lwin.sapbi_MD70_EXPORT;
	var sapbi_MD70_EXPORT_FORMAT = lwin.sapbi_MD70_EXPORT_FORMAT;
	var sapbi_MD70_EXPORT_FORMAT_PDF = lwin.sapbi_MD70_EXPORT_FORMAT_PDF;

	console.log(sapbi_page.onBodyOnLoadEvent);
	console.log(sapbi_page.m_renderMode);
	console.log(sapbi_page.m_pageIdParameterName);
	console.log(sapbi_page.m_mimeInNewWindow);
	console.log(sapbi_page.m_mimeInTopNav);
	console.log(sapbi_page.m_requestIdName);
	console.log(sapbi_page.m_requestIdValue);
	console.log(sapbi_page.m_useLayersForDialogs);
	console.log(sapbi_page.m_useSnippets);
    //console.log("lwin.sapbi_rriCommands", lwin.sapbi_rriCommands);
    //console.log("lwin.sapbi_targetDataProviderList", lwin.sapbi_targetDataProviderList);
    //console.log(Object.keys(lwin.sapbi_targetDataProviderList));
    addEltfloater();
	top.exewin = this;
	top.locwin = lwin;
	// TCode SA38 -> RS_TEMPLATE_MAINTAIN_70 -> 0ANALYSIS_PATTERN -> WAD Template Edit/Save/Test/Debug/Trace
} else if (typeof this.sapbi_page !== 'undefined') {
	top.exewin = this;
	top.locwin = this;
    addEltfloater();
} else {
	//alert('No Sap Javascript Library');
	console.log('No Sap Javascript Library');
	return;
}

//****************************************************************
// Custom JavaScript
//****************************************************************


//alert(this);
//****************************************************************
// When Here Is BexFrame, Sap Javascript Module is passed to Top Parent Window
//****************************************************************
top.bexFrame = lwin;
top.sapbi_CommandSequence = lwin.sapbi_CommandSequence;
top.sapbi_Command = lwin.sapbi_Command;
top.sapbi_Parameter = lwin.sapbi_Parameter;
top.sapbi_ParameterList = lwin.sapbi_ParameterList;
top.sapbi_page = lwin.sapbi_page;

//sapbi_addToMenu("Key/Text", "executeJS_SET_PRESENTATION_R_CHA", "X", "", "", "top", "", "");
// Sample Function Parameter
//function alternate_context_menu(parameter, cellType, filter, parameter1, parameter2, item, dataProvider, x, y)
// Set Presentation 'Key and Text' of Characteristic
lwin.executeJS_SET_PRESENTATION_R_CHA = function (dp, valchar) {
	//Note: information can be extracted using the parameter 'currentState'
	//	and 'defaultCommandSequence'. In either case create your own object
	//	of type 'sapbi_CommandSequence' that will be sent to the server.
	//	To extract specific values of parameters refer to the following
	//	snippet:
	//		var key = currentState.getParameter( PARAM_KEY ).getValue();
	//		alert( "Selected key: " + key );
	//
	//	('PARAM_KEY' refers to any parameter's name)
	//Create a new object of type sapbi_CommandSequence

	//*** Reference URL : http://help.sap.com/saphelp_nw70/helpdata/en/43/d8c6dcc0700235e10000000a11466f/content.htm
	//*List of Member Presentations (MEMBER_PRESENTATION_LIST)
	//* Enter a list of how each characteristic value is to be displayed.
	//*
	//*You specify the display for the individual values in the Member Presentation parameter (MEMBER_PRESENTATION).
	//*●      TEXT (shortest text available)
	//*●      SHORT_TEXT (short text)
	//*●      MIDDLE_TEXT (medium-length text)
	//*●      LONG_TEXT (long text)
	//*●      DISPLAY_KEY_NOT_COMPOUND (not compounded characteristic value in external display)
	//*●      DISPLAY_KEY (compounded characteristic value in external display)
	//*●      KEY_COMP (characteristic value in internal display)
	//*●      KEY_NOT_COMPOUND (not compounded characteristic value in internal display)
	//*●      DISPLAY_NONE (no display)
	var commandSequence = new sapbi_CommandSequence();
	/* Create a new object of type sapbi_Command with the command named "SET_PRESENTATION" */
	var commandSET_PRESENTATION_1 = new sapbi_Command("SET_PRESENTATION");
	/* Create parameter TARGET_DATA_PROVIDER_REF_LIST */
	var paramTARGET_DATA_PROVIDER_REF_LIST = new sapbi_Parameter("TARGET_DATA_PROVIDER_REF_LIST", "");
	var paramListTARGET_DATA_PROVIDER_REF_LIST = new sapbi_ParameterList();
	// Create parameter TARGET_DATA_PROVIDER_REF
	var paramTARGET_DATA_PROVIDER_REF1 = new sapbi_Parameter("TARGET_DATA_PROVIDER_REF", dp);
	paramListTARGET_DATA_PROVIDER_REF_LIST.setParameter(paramTARGET_DATA_PROVIDER_REF1, 1);
	// End parameter TARGET_DATA_PROVIDER_REF!
	paramTARGET_DATA_PROVIDER_REF_LIST.setChildList(paramListTARGET_DATA_PROVIDER_REF_LIST);
	commandSET_PRESENTATION_1.addParameter(paramTARGET_DATA_PROVIDER_REF_LIST);
	/* End parameter TARGET_DATA_PROVIDER_REF_LIST */

	/* Create parameter CHARACTERISTIC */
	var paramCHARACTERISTIC = new sapbi_Parameter("CHARACTERISTIC", valchar);
	commandSET_PRESENTATION_1.addParameter(paramCHARACTERISTIC);
	/* End parameter CHARACTERISTIC */

	/* Create parameter MEMBER_PRESENTATION_LIST */
	var paramMEMBER_PRESENTATION_LIST = new sapbi_Parameter("MEMBER_PRESENTATION_LIST", "");
	var paramListMEMBER_PRESENTATION_LIST = new sapbi_ParameterList();
	// Create parameter MEMBER_PRESENTATION
	//var paramMEMBER_PRESENTATION1 = new sapbi_Parameter( "MEMBER_PRESENTATION", "DISPLAY_COMBINED__DISPLAY_KEY__TEXT" );
	var paramMEMBER_PRESENTATION1 = new sapbi_Parameter("MEMBER_PRESENTATION", "DISPLAY_KEY");
	var paramMEMBER_PRESENTATION2 = new sapbi_Parameter("MEMBER_PRESENTATION", "TEXT");
	//var paramMEMBER_PRESENTATION1 = new sapbi_Parameter( "MEMBER_PRESENTATION", "KEY_COMP" );

	// RS_COMBINED_PRESENTATIONS
	paramListMEMBER_PRESENTATION_LIST.setParameter(paramMEMBER_PRESENTATION1, 1);
	paramListMEMBER_PRESENTATION_LIST.setParameter(paramMEMBER_PRESENTATION2, 2);
	// End parameter MEMBER_PRESENTATION!
	paramMEMBER_PRESENTATION_LIST.setChildList(paramListMEMBER_PRESENTATION_LIST);
	commandSET_PRESENTATION_1.addParameter(paramMEMBER_PRESENTATION_LIST);
	/* End parameter MEMBER_PRESENTATION_LIST */

	// Add the command to the command sequence
	commandSequence.addCommand(commandSET_PRESENTATION_1);
	/* End command commandSET_PRESENTATION_1 */
	//Send the command sequence to the server
	//return sapbi_page.sendCommand( commandSequence );
	return commandSequence;
};

lwin.executeOPEN_TEMPLATE_DIALOG = function (currentState, defaultCommandSequence) {
	//var dp = prompt("DataProvider를 선택하세요.\n"+,"DP_1");
	var dp_name=null;
	if(typeof dp !== 'undefined'){
		dp_name = dp;
	} else {
		dp_name = prompt('DataProvider를 선택하세요.\n' + Object.keys(lwin.sapbi_targetDataProviderList),"DP_1");
		console.log("dp_name: " + dp_name);
		var isNotDP = (lwin.sapbi_dataProviderList[dp_name])?false:true;
	}
	if(isNotDP){
        alert("Template DataProvider '" + dp_name + "'는 존재하지 않습니다!");
        return;
    }
	var template_info = "ZANALYSIS_INFO_" + dp_name;
	alert(template_info);
	var commandSequence = new sapbi_CommandSequence();
	var command = new sapbi_Command("OPEN_TEMPLATE_DIALOG");
	var p = new sapbi_Parameter("HEIGHT", "620");
	var p2 = new sapbi_Parameter("WIDTH", "800");
	//var p3= new sapbi_Parameter( "TEMPLATE", "0ANALYSIS_PATTERN_INFO" );
	var p3= new sapbi_Parameter( "TEMPLATE", template_info );
	var p4 = new sapbi_Parameter("USE_AUTOMATIC_RESIZING", "X");
	command.addParameter(p);
	command.addParameter(p2);
	command.addParameter(p3);
	command.addParameter(p4);
	commandSequence.addCommand(command);
	return sapbi_page.sendCommand( commandSequence );
};

lwin.buildCommandOPEN_TEMPLATE_DIALOG = function (currentState, defaultCommandSequence) {
	var commandSequence = new sapbi_CommandSequence();
	var commandOPEN_TMP_DG = new sapbi_Command("OPEN_TEMPLATE_DIALOG");
	var paramEXPORT_HEIGHT = new sapbi_Parameter("HEIGHT", "620");
	commandOPEN_TMP_DG.addParameter(paramEXPORT_HEIGHT);
	var paramEXPORT_WIDTH = new sapbi_Parameter("WIDTH", "800");
	commandOPEN_TMP_DG.addParameter(paramEXPORT_WIDTH);
	var paramTEMPLATE = new sapbi_Parameter("TEMPLATE", "0ANALYSIS_PATTERN_INFO");
	//var paramTEMPLATE = new sapbi_Parameter( "TEMPLATE", "0ANALYSIS_PATTERN_INFO_SPECIAL" );
	commandOPEN_TMP_DG.addParameter(paramTEMPLATE);
	var paramRESIZING = new sapbi_Parameter("USE_AUTOMATIC_RESIZING", "X");
	commandOPEN_TMP_DG.addParameter(paramRESIZING);
	commandSequence.addCommand(commandOPEN_TMP_DG);
	//return sapbi_page.sendCommand( commandSequence );
	return commandSequence;
};

lwin.sapbi_wsAddShortcut = function (oPop, context, index) {
	//function sapbi_cmAddProperties(oPop, context, index) {
	var dp = context.getParameter(sapbi_cm_dp).getValue();
	var dpContext = sapbi_cmGetDataProviderContext(dp);
	var item = context.getParameter(sapbi_cm_item).getValue();
	var subMenu = sapbi_cmCreateMenu(index);
	var entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("TEST1", "Shortcut"), index, true, true, subMenu.id, null);
	mf_PopupMenu_addItem(oPop, entry);
	//debugger;

	//**** CHARACTERISTIC PROP
	if (sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_CHARACTERISTIC_PROPERTIES)) {
		var entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("TEST11", "Key/Text"), index, false, false, null, null);
		mf_PopupMenu_addItem(subMenu, entry);
		var characteristic = context.getParameter(sapbi_MD70_CHARACTERISTIC);
		if (characteristic != null) {
			var command = new sapbi_Command(sapbi_MD70_OPEN_PROPERTIES_PANE_DIALOG);
			command.addParameter(new sapbi_Parameter(sapbi_MD70_PROPERTIES_SET, sapbi_MD70_PROP_SET_PREDEFINED));
			var p = new sapbi_Parameter(sapbi_PROPERTIES_SOURCE, "CHARACTERISTIC_PROPERTIES");
			var cl = new sapbi_ParameterList();
			p.setChildList(cl);
			var p2 = new sapbi_Parameter("CHARACTERISTIC_PROPERTIES", null);
			cl.addParameter(p2);
			command.addParameter(p);
			var cl2 = new sapbi_ParameterList();
			p2.setChildList(cl2);
			cl2.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF, dp));
			cl2.addParameter(new sapbi_Parameter(sapbi_MD70_CHARACTERISTIC, characteristic.getValue()));
			console.log(oPop, context, index);
			command = executeJS_SET_PRESENTATION_R_CHA(dp, characteristic.getValue());
			sapbi_cmSetCommand(entry, command);
		} else {
			entry.Enabled = false;
		}
	}
	//**** QUERY Information
	//	command= new sapbi_Command(sapbi_MD70_OPEN_QUERY_PROP_DIALOG);
	//	command.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF,dp));
	//if(sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_DATAPROVIDER_PROPERTIES))
	{
        //var dp = prompt("DataProvider를 선택하세요.\n"+,"DP_1");
        var dp_name;
        console.log(typeof dp_name);
        if(typeof dp !== 'undefined') { dp_name = dp; } else { return; }
        //dp_name = (typeof dp !== 'undefined')?dp:return; <- return은 오류남
		var template_info = "ZANALYSIS_INFO_" + dp_name;
        
		//var commandSequence = new sapbi_CommandSequence();
		var command = new sapbi_Command("OPEN_TEMPLATE_DIALOG");
		var p = new sapbi_Parameter("HEIGHT", "620");
		var p2 = new sapbi_Parameter("WIDTH", "800");
		//var p3= new sapbi_Parameter( "TEMPLATE", "0ANALYSIS_PATTERN_INFO" );
		//var p3 = new sapbi_Parameter("TEMPLATE", "0ANALYSIS_PATTERN_INFO_SPECIAL");
		var p3 = new sapbi_Parameter("TEMPLATE", template_info);
		var p4 = new sapbi_Parameter("USE_AUTOMATIC_RESIZING", "X");
		command.addParameter(p);
		command.addParameter(p2);
		command.addParameter(p3);
		command.addParameter(p4);
		//command = buildCommandOPEN_TEMPLATE_DIALOG();
		entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("TEST12", "Information"), index, false, false, null, command);
		mf_PopupMenu_addItem(subMenu, entry);
	}
	//**** Call BSP
	//if(sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_DATAPROVIDER_PROPERTIES))
	{
		var lv_url_prefix = (typeof url_prefix !== 'undefined') ? url_prefix : 'http://gamma.dfocus.net:50000';
		console.log(sapbi_page);
		var command = new sapbi_Command("EXPORT_XML");
		var p = new sapbi_Parameter("TARGET_DATA_PROVIDER_REF", dp);
		var p2 = new sapbi_Parameter("REDIRECT_URL", lv_url_prefix + "/sap/bc/bsp/sap/ztest_ws/get_state.htm?param1=test");
		var p3 = new sapbi_Parameter("RESULT_SET", "X");
		command.addParameter(p);
		command.addParameter(p2);
		command.addParameter(p3);
		entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("TEST13", "Call BSP"), index, false, false, null, command);
		mf_PopupMenu_addItem(subMenu, entry);
	}

	if (sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_CHARACTERISTIC_PROPERTIES)) {
		var entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("0055", "Characteristic"), index, false, false, null, null);
		mf_PopupMenu_addItem(subMenu, entry);

		var characteristic = context.getParameter(sapbi_MD70_CHARACTERISTIC);
		if (characteristic != null) {
			var command = new sapbi_Command(sapbi_MD70_OPEN_PROPERTIES_PANE_DIALOG);
			command.addParameter(new sapbi_Parameter(sapbi_MD70_PROPERTIES_SET, sapbi_MD70_PROP_SET_PREDEFINED));

			var p = new sapbi_Parameter(sapbi_PROPERTIES_SOURCE, "CHARACTERISTIC_PROPERTIES");
			var cl = new sapbi_ParameterList();
			p.setChildList(cl);

			var p2 = new sapbi_Parameter("CHARACTERISTIC_PROPERTIES", null);
			cl.addParameter(p2);
			command.addParameter(p);

			var cl2 = new sapbi_ParameterList();
			p2.setChildList(cl2);
			cl2.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF, dp));
			cl2.addParameter(new sapbi_Parameter(sapbi_MD70_CHARACTERISTIC, characteristic.getValue()));

			sapbi_cmSetCommand(entry, command);
		} else {
			entry.Enabled = false;
		}
	}
	//**** Data Cell PROP
	//	if(sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_XXX_PROPERTIES))
	{
		var structureMember1 = context.getParameter(sapbi_STRUCTUREMEMBER1);
		var structureMember2 = context.getParameter(sapbi_STRUCTUREMEMBER2);
		if (structureMember1 != null) {
			var command = new sapbi_Command(sapbi_MD70_OPEN_PROPERTIES_PANE_DIALOG);
			command.addParameter(new sapbi_Parameter(sapbi_MD70_PROPERTIES_SET, sapbi_MD70_PROP_SET_PREDEFINED));

			if (structureMember2 != null) {
				var p = new sapbi_Parameter(sapbi_PROPERTIES_SOURCE, "DATA_CELL_PROPERTIES");
				var cl = new sapbi_ParameterList();
				p.setChildList(cl);

				var p2 = new sapbi_Parameter("DATA_CELL_PROPERTIES", null);
				cl.addParameter(p2);
				command.addParameter(p);

				var cl2 = new sapbi_ParameterList();
				p2.setChildList(cl2);
				cl2.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF, dp));
				cl2.addParameter(new sapbi_Parameter("FIRST_STRUC_MEMBER", structureMember1.getValue()));
				cl2.addParameter(new sapbi_Parameter("SECOND_STRUC_MEMBER", structureMember2.getValue()));
			} else {
				var p = new sapbi_Parameter(sapbi_PROPERTIES_SOURCE, "STRUCTURE_MEMBER_PROPERTIES");
				var cl = new sapbi_ParameterList();
				p.setChildList(cl);

				var p2 = new sapbi_Parameter("STRUCTURE_MEMBER_PROPERTIES", null);
				cl.addParameter(p2);
				command.addParameter(p);

				var cl2 = new sapbi_ParameterList();
				p2.setChildList(cl2);
				cl2.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF, dp));
				cl2.addParameter(new sapbi_Parameter("STRUCTURE_MEMBER", structureMember1.getValue()));
			}

			entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("0031", "Data cell"), index, false, false, null, command);
			mf_PopupMenu_addItem(subMenu, entry);
		} else {
			entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("0031", "Data cell"), index, false, false, null, null);
			mf_PopupMenu_addItem(subMenu, entry);
			entry.Enabled = false;
		}
	}
	//**** QUERY PROP
	//	command= new sapbi_Command(sapbi_MD70_OPEN_QUERY_PROP_DIALOG);
	//	command.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF,dp));
	if (sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_DATAPROVIDER_PROPERTIES)) {
		var command = new sapbi_Command(sapbi_MD70_OPEN_PROPERTIES_PANE_DIALOG);
		command.addParameter(new sapbi_Parameter(sapbi_MD70_PROPERTIES_SET, sapbi_MD70_PROP_SET_PREDEFINED));

		var p = new sapbi_Parameter(sapbi_PROPERTIES_SOURCE, "DATAPROVIDER_PROPERTIES");
		var cl = new sapbi_ParameterList();
		p.setChildList(cl);

		var p2 = new sapbi_Parameter("DATAPROVIDER_PROPERTIES", null);
		cl.addParameter(p2);
		command.addParameter(p);

		var cl2 = new sapbi_ParameterList();
		p2.setChildList(cl2);
		cl2.addParameter(new sapbi_Parameter(sapbi_MD70_DATA_PROVIDER_REF, dp));

		entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("0032", "Data Provider"), index, false, false, null, command);
		mf_PopupMenu_addItem(subMenu, entry);
	}

	//**** ITEM PROP
	//	if(sapbi_cmIsVisible(sapbi_CONST_ENABLE_MENU_XXX_PROPERTIES))
	{
		var command = new sapbi_Command(sapbi_MD70_OPEN_PROPERTIES_PANE_DIALOG);
		//	command.addParameter(new sapbi_Parameter(sapbi_MD70_ITEM_REF,item));
		command.addParameter(new sapbi_Parameter(sapbi_MD70_PROPERTIES_SET, sapbi_MD70_PROP_SET_PREDEFINED));

		var p = new sapbi_Parameter(sapbi_PROPERTIES_SOURCE, "ITEM_PROPERTIES");
		var cl = new sapbi_ParameterList();
		p.setChildList(cl);

		var p2 = new sapbi_Parameter("ITEM_PROPERTIES", null);
		cl.addParameter(p2);
		command.addParameter(p);

		var cl2 = new sapbi_ParameterList();
		p2.setChildList(cl2);
		cl2.addParameter(new sapbi_Parameter(sapbi_MD70_ITEM_REF, item));

		entry = sapbi_cmCreateEntry(sapbi_cmGetEntryText("0033", "Web Item"), index, false, false, null, command);
		mf_PopupMenu_addItem(subMenu, entry);

	}

	mf_PopupMenu_apply(subMenu);

};

//****************************************************************
// Context Menu Sub Menu Root Menu
// ****************************************************************
//Reference URL http://forums.sdn.sap.com/thread.jspa?threadID=1159130&tstart=0
lwin.sapbi_buildContextMenu = function (urpopumenuname, context, index) {
	var lix = 0;
	var oPop = sapbi_cmCreateMenu(index);
	debugger;
	// **** Begin of custom code ****
	//
	// **** End of custom code ****
	lix = lix + sapbi_cmAddBack(oPop, context, index);
	lix = lix + sapbi_cmAddRri(oPop, context, index);
	lix = lix + sapbi_cmAddFilter(oPop, context, index);
	//lix = lix + sapbi_cmAddChangeDrillDown(oPop, context, index);
	lix = lix + sapbi_cmAddHierarchy(oPop, context, index);
	sapbi_cmAddExportPDF(oPop, context, index, lix);
	sapbi_cmAddBroadcasting(oPop, context, index);
	sapbi_cmAddSave(oPop, context, index);
	sapbi_cmAddPersonalize(oPop, context, index);
	sapbi_cmAddProperties(oPop, context, index);
	//sapbi_cmAddCalculations(oPop, context, index);
	sapbi_cmAddDocuments(oPop, context, index);
	sapbi_cmAddExceptions(oPop, context, index);
	sapbi_cmAddSorting(oPop, context, index);
	sapbi_wsAddShortcut(oPop, context, index);
	mf_PopupMenu_apply(oPop);
	return oPop;
};

// // Refer : sapbi_080_contextmenu.js & sapbi_comp.js
// //****************************************************************
// // Context Menu Sub Menu Root Menu
// // ****************************************************************
// function sapbi_buildContextMenu(urpopumenuname, context, index){
// var lix = 0;
// var oPop = sapbi_cmCreateMenu(index);
// lix = lix + sapbi_cmAddBack(oPop, context, index);
// lix = lix + sapbi_cmAddInputCellEntries(oPop, context, index);
// lix = lix + sapbi_addCustomEntries(sapbi_customEntriesTop, oPop, context, index);
// lix = lix + sapbi_cmAddInputEntries(oPop, context, index);
// lix = lix + sapbi_cmAddRri(oPop, context, index);
// lix = lix + sapbi_cmAddFilter(oPop, context, index);
// lix = lix + sapbi_cmAddChangeDrillDown(oPop, context, index);
// lix = lix + sapbi_cmAddHierarchy(oPop, context, index);
// sapbi_cmAddExportPDF(oPop, context, index, lix);
// sapbi_cmAddBroadcasting(oPop, context, index);
// sapbi_cmAddSave(oPop, context, index);
// sapbi_cmAddPersonalize(oPop, context, index);
// sapbi_cmAddProperties(oPop, context, index);
// sapbi_cmAddCalculations(oPop, context, index);
// sapbi_cmAddDocuments(oPop, context, index);
// sapbi_cmAddExceptions(oPop, context, index);
// sapbi_cmAddSorting(oPop, context, index);
// sapbi_cmAddAnalyisLegend(oPop, context, index);
// lix = lix + sapbi_addCustomEntries(sapbi_customEntriesBottom, oPop, context, index);
// // apply the changes
// mf_PopupMenu_apply(oPop);
// return oPop;
// }

//lwin.sapbi_PageClass.prototype.addToBrowserFavoritesInternal = function (url, title) {
	// var wschoe_div = localWindow.document.createElement("div");
	// //localWindow.document.body.appendChild(wschoe_div);
	// wschoe_div.style.position = "absolute";
	// wschoe_div.style.zIndex = 2147483647;
	// wschoe_div.style.pixelLeft = 0;
	// wschoe_div.style.pixelTop = 0;
	// wschoe_div.style.width = 300;
	// wschoe_div.innerHTML += url;

	// //Reference URL: https://github.com/scriptish/scriptish/wiki/GM_setClipboard
	// TM_setClipboard(url);

	// // Copy text to the Clipboard function
	// // uses 'url' input element to select text
	// // parameters: text - text to be copied to the clipboard

	// //var temp = prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", url);
	// if (document.all) {
		// window.clipboardData.setData("Text", url);
		// //clipboard copy //http://msdn.microsoft.com/en-us/library/ms536419.aspx
		// window.external.AddToFavoritesBar(url, title, 'slice'); // ie7, ie8 .. //http://msdn.microsoft.com/en-us/library/cc197035(VS.85).aspx
		// //window.external.AddFavorite( url , title ); // ie6
	// } else if (window.sidebar) {
		// window.sidebar.addPanel(title, url, "");
	// } else if (frames[0]) {
		// frames[0].location = "mailto:?subject=" + title + "&body=" + url;
	// } else {
		// alert("Unknown browser: Cannot add the new bookmark\n" + url);
	// }
// };

function addEltfloater() {
	if (lwin.document.body.onload.toString().indexOf("sapbi_page.initializePage()") <= 0) {
		//alert("NoMainBExFrame");
		return;
	}
	//alert();
	var floater = document.createElement("div");
	//****************************************************************
	// Context Menu Entry Export PDF
	//****************************************************************

	lwin.document.body.appendChild(floater);
	floater.ID = "floater";
	floater.style.zIndex = "22222222";
	floater.style.left = "750px";
	floater.style.fontSize = "12px";
	floater.style.top = "43px";
	floater.style.width = "200px";
	floater.style.height = "13px";
	floater.style.position = "absolute";
	floater.style.visibility = "visible";

	// Create Dynamic button00
	var button00 = document.createElement("a");
	floater.appendChild(button00);
	button00.style.padding = "2px";
	button00.innerText = "URL";
	button00.href = document.URL;

	// Create Dynamic button01
	var button01 = document.createElement("a");
	floater.appendChild(button01);
	button01.style.padding = "2px";
	button01.innerText = "SaveView";
	button01.href = 'javascript:executeSAVE_AS();';
	//alert();
	// End Dynamic button01
	// Create Dynamic button02
	var button02 = document.createElement("a");
	floater.appendChild(button02);
	button02.style.padding = "2px";
	button02.innerText = "SaveView2";
	button02.href = "javascript:executeJS_SAVE_AS();";
	// End Dynamic button02
	// Create Dynamic button03
	var button03 = document.createElement("a");
	floater.appendChild(button03);
	button03.style.padding = "2px";
	button03.innerText = "VariableScreen";
	button03.href = "javascript:executeJS_OPEN_VARIABLE_DIALOG();";
	// End Dynamic button03
	// Create Dynamic button04
	var button04 = document.createElement("a");
	floater.appendChild(button04);
	button04.style.padding = "2px";
	button04.innerText = "ShowInfo";
	button04.href = "javascript:executeOPEN_TEMPLATE_DIALOG();";
	//button04.onclick = executeOPEN_TEMPLATE_DIALOG;
	// End Dynamic button04
	// Create Dynamic button05
	var button05 = document.createElement("a");
	floater.appendChild(button05);
	button05.style.padding = "2px";
	button05.innerText = "BroadCast";
	button05.href = "javascript:executeJS_LAUNCH_BROADCASTER();";
	// End Dynamic button05
	// Create Dynamic button06
	var button06 = document.createElement("a");
	floater.appendChild(button06);
	button06.style.padding = "2px";
	button06.innerText = "Export_CSV";
	button06.href = "javascript:executeJS_EXPORT_CSV2();";
	// End Dynamic button06
	// Create Dynamic button07
	var button07 = document.createElement("a");
	floater.appendChild(button07);
	button07.style.padding = "2px";
	button07.innerText = "Export_CSV";
	button07.href = "javascript:executeJS_EXPORT_CSV3();";
	// End Dynamic button07
	// Create Dynamic button08
	var button08 = document.createElement("a");
	floater.appendChild(button08);
	button08.style.padding = "2px";
	button08.innerText = "LOAD_R";
	button08.href = "javascript:executeJS_LOAD_R();";
	// End Dynamic button08
	// Create Dynamic button09
	var button09 = document.createElement("a");
	floater.appendChild(button09);
	button09.style.padding = "2px";
	button09.innerText = "UPDATE";
	button09.href = "javascript:executeJS_UPDATE();";
	// End Dynamic button09

	floater.appendChild(document.createElement("br"));

	// Create Dynamic button10
	var button10 = document.createElement("a");
	floater.appendChild(button10);
	button10.style.padding = "2px";
	button10.innerText = "DataShoare";
	button10.href = "javascript:executeDataShare();";
	// End Dynamic  button10
	// Create Dynamic button11
	var button11 = document.createElement("a");
	floater.appendChild(button11);
	button11.style.padding = "2px";
	button11.innerText = "SaveBMark";
	button11.href = "javascript:executeJS_SAVE_BOOKMARK_R();";
	// End Dynamic  button11
	// Create Dynamic button12
	var button12 = document.createElement("a");
	floater.appendChild(button12);
	button12.style.padding = "2px";
	button12.innerText = "GetInfo";
	button12.href = "javascript:executeGetInfo();";
	// End Dynamic  button12
	// Create Dynamic button13
	var button13 = document.createElement("a");
	floater.appendChild(button13);
	button13.style.padding = "2px";
	button13.innerText = "GetInfo";
	button13.href = "javascript:executeJS_OPEN_DIALOG_DLG_DOC_BROWSER_R();";
	// End Dynamic  button13
	// Create Dynamic button14
	var button14 = document.createElement("a");
	floater.appendChild(button14);
	button14.style.padding = "2px";
	button14.innerText = "Show&Hide";
	button14.href = "javascript:shownhideFloater();";
	button14.id = "button14";
	button14.accessKey = "0";
	top.button14 = button14;
	top.floater = floater;

	// End Dynamic  button14

	//floater.innerHTML += "<a href=\"javascript:baby('aa');\"><B>↑ TOP</B></a>";
}
lwin.shownhideFloater = function() {    
    //alert(1);
    if(top.floater.style.display == "none") {
        top.floater.style.display = "";
    } else if (top.floater.style.display == "") {
        top.floater.style.display = "none";
    }    
    //alert(2);
};