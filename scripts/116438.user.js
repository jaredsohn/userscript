// ==UserScript==
// @name          Allscripts Integration
// @namespace     http://yehster.no-ip.org/
// @description   
// @include       https://eprescribe.allscripts.com/*
// @include       */openemr/interface/main/main_title.php
// @include       */openemr/interface/patient_file/summary/demographics.php*
// @exclude       
// @exclude       
// @require http://code.jquery.com/jquery-1.6.4.min.js
// ==/UserScript==

// +-----------------------------------------------------------------------------+
// Copyright (C) 2011 IntegralEMR LLC <kevin.y@integralemr.com>
//
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// A copy of the GNU General Public License is included along with this program:
// openemr/interface/login/GnuGPL.html
// For more information write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
// Author:   Kevin Yeh <kevin.y@integralemr.com>
//
// +------------------------------------------------------------------------------+

var pages={
    interstitial: "/InterstitialAd.aspx",
    addPatient: "/AddPatient.aspx",
    def: "/default.aspx",
    allergy: "/PatientAllergy.aspx",
    Login: "/Login.aspx",
    oemrMain: "/interface/main/main_title.php",
    oemrDemo: "/interface/patient_file/summary/demographics.php",
    oemrDemoFull: "/interface/patient_file/summary/demographics_full.php"
}

var asContID={
    lblPatientName: "ctl00_lblPatientName",
    lblGenderDOB: "ctl00_lblGenderDob",
    txtPatLNAME: "ctl00_ContentPlaceHolder1_PatientSearch_txtLastName",
    txtPatFNAME: "ctl00_ContentPlaceHolder1_PatientSearch_txtFirstName",
    txtPatDOB: "ctl00_ContentPlaceHolder1_PatientSearch_rdiDOB",
    tblViewPatients: "ctl00_ContentPlaceHolder1_grdViewPatients_ctl00",
    btnSearch: "ctl00_ContentPlaceHolder1_PatientSearch_btnSearch"
}



function resetInfo()
{
    GM_setValue("OpenEMR Server","");
    GM_setValue("OpenEMR Session","");
    
    // Patient Info
    GM_setValue("patientFNAME","");
    GM_setValue("patientLNAME","");
    
    GM_setValue("patientDOBYear","");
    GM_setValue("patientDOBMonth","");
    GM_setValue("patientDOBDay","");
    
    // Prescription Info
    GM_setValue("MedName","") // The Med Name
    GM_setValue("MedSTR",""); // The Med Strength
    GM_setValue("MedSIG",""); // The Med SIG
    
    GM_setValue("searchState","not found");
    
}

//TODO: Can I add a dialog div that displays the drugs from OpenEMR?

function setOEMRDOB(DOB)
{
        DOBParts=DOB.split("-");
        DOBYear=DOBParts[0].substr(0,4);
        DOBMonth=DOBParts[1].substr(0,2);
        DOBDay=DOBParts[2].substr(0,2);

    
        GM_setValue("patientDOBYear",DOBYear);
        GM_setValue("patientDOBMonth",DOBMonth);
        GM_setValue("patientDOBDay",DOBDay);    
}

function safeFocus(id)
{
        var element = document.getElementById(id);
        if (element != null)
        {
            element.focus();
        }
    
}
function safeClick(id)
{
        var element = document.getElementById(id);
        if (element != null)
        {
            element.click();
        }

}

function patDOB()
{
    retVal=GM_getValue("patientDOBMonth");
    retVal=retVal.concat("/");
    retVal=retVal.concat(GM_getValue("patientDOBDay"))
    retVal=retVal.concat("/")
    retVal=retVal.concat(GM_getValue("patientDOBYear"));
    return retVal;
 
}

function asPopulateAndSearchPatientInfo()
{

    $("#"+asContID['txtPatLNAME']).val(GM_getValue("patientLNAME"));
    $("#"+asContID['txtPatFNAME']).val(GM_getValue("patientFNAME"));
    
    GM_setValue("searchState","searching") ;
    safeClick(asContID['btnSearch']);
    
}

function asFindPatientInResults()
{
    myHTML=$(this).html();
    foundPatient=myHTML.indexOf(GM_getValue("patientLNAME")+", "+GM_getValue("patientFNAME"));
    if(foundPatient>=0)
        {

            foundDOB=myHTML.indexOf(patDOB(),foundPatient);
            if(foundDOB>=0)
                {
                    rowID=$(this).find("input[id]").attr("id");                    
                    safeClick(rowID);
                }
        }
}

function asCheckPatientInfo()
{
    pn=$("#"+asContID['lblPatientName']).text();
    foundPatient=pn.indexOf(GM_getValue("patientLNAME")+", "+GM_getValue("patientFNAME"));
    if(foundPatient===0)
        {
            DOB=$("#"+asContID['lblGenderDOB']).text();
            foundDOB=DOB.indexOf(patDOB());
            if(foundDOB>=0)
            {
                GM_setValue("searchState","found");
            }

        }

}
function asSearchDispatcher()
{
        if($("#txtUserName").length>0)
            {
                // This is the initial login screen and we should just abort.
                return;
            }
            
       asCheckPatientInfo();
       if(GM_getValue("searchState").indexOf("not found")==0)
        {
            asPopulateAndSearchPatientInfo();
        }
        if((GM_getValue("searchState").indexOf("searching")==0) || 
        (GM_getValue("searchState").indexOf("results scanning")==0))
        {
            tblViewPatients=$("#"+asContID['tblViewPatients']);
            if(tblViewPatients.length>0)
            {
                GM_setValue("searchState","results scanning")
                rows=tblViewPatients.find("tbody tr");
                rows.each(asFindPatientInResults);
            }
        }    
}

var asAddPatientControls={
    btnAllergy: "ctl00_ContentPlaceHolder1_btnAddAllergy",
    txtPatFNAME: "ctl00_ContentPlaceHolder1_txtFName",
    txtPatLNAME: "ctl00_ContentPlaceHolder1_txtLName",
    txtPatDOB: "ctl00_ContentPlaceHolder1_txtDOB_text",
    txtPatAddr1: "ctl00_ContentPlaceHolder1_txtAddress1",
    txtPatPhone: "ctl00_ContentPlaceHolder1_txtPhone",
    txtPatMobilePhone: "ctl00_ContentPlaceHolder1_txtMobilePhone",
    txtPatCity: "ctl00_ContentPlaceHolder1_txtCity",
    txtPatZIP: "ctl00_ContentPlaceHolder1_txtZip",
    txtPatMRN: "ctl00_ContentPlaceHolder1_txtMRN",
    selGender: "ctl00_ContentPlaceHolder1_DDLGender",
    selState:"ctl00_ContentPlaceHolder1_ddlState"
}

function chooseSelect(control,option)
{
  sel=document.getElementById(control);

  for(idx=0;idx<sel.options.length;idx++)
      {
          opt=sel.options[idx];
          if(opt.value==option)
              {
                  sel.selectedIndex=idx;
                  opt.click();
              }
      }
}
function removeTags(text,tag,endTag)
{
    tag="<"+tag;
    loc=text.indexOf(tag);
    while(loc>=0)
        {
            endMarker=text.indexOf(endTag,loc+tag.length);
            text=text.substr(0,loc)+text.substr(endMarker+endTag.length);

            loc=text.indexOf(tag);
        }
        return text;
}
function extractTag(text,tag,endTag)
{
    loc=text.indexOf(tag);
    end=text.lastIndexOf(endTag);
    return text.substr(loc,end+endTag.length-loc);
}

function setAddPatientText(asControl,oemrcontrol)
{
    val=$("#"+oemrcontrol).val();
    $("#"+asAddPatientControls[asControl]).val(val);
}

function processOEMRDemographics(data)
{
    $("#demoLoading").hide();
    text=data.responseText;
    text=text.substr(text.indexOf("<form"));
    text=removeTags(text,"img",">");
    text=removeTags(text,"a","</a>");
    text=extractTag(text,"<form","</form>")
    $("#gmOEMRInfo").append(text);
    $("#gmOEMRInfo img").remove();
    
    patID=$("#gmOEMRInfo").find("input[name='db_id']").val();
    
    $("#"+asAddPatientControls['txtPatMRN']).val(patID);
    setAddPatientText('txtPatFNAME',"form_fname");
    setAddPatientText('txtPatLNAME',"form_lname");
    setAddPatientText('txtPatLNAME',"form_lname");
    
    setAddPatientText('txtPatZIP',"form_postal_code");
    setAddPatientText('txtPatAddr1',"form_street");
    setAddPatientText('txtPatCity',"form_city");
    setAddPatientText('txtPatPhone',"form_phone_home");
    setAddPatientText('txtPatMobilePhone',"form_phone_cell");


    sex=$("#form_sex").val();
    state=$("#form_state").val();
      
    
    chooseSelect(asAddPatientControls['selGender'],sex[0]);
    chooseSelect(asAddPatientControls['selState'],state)

    dob=$("#form_DOB").val();
    setOEMRDOB(dob);
    safeFocus(asAddPatientControls['txtPatDOB']);
    $("#"+asAddPatientControls['txtPatDOB']).val(patDOB());
//    $("#"+asAddPatientControls['txtPatDOB']).blur();
    
}
function loadDemographicsFromOpenEMR()
{
    demoFullURL=GM_getValue("OpenEMR Server")+pages['oemrDemoFull'];
    loading=$("#demoLoading");
    if(loading.length===0)
        {
            $("#gmOEMRImport").before("<SPAN id='demoLoading' float:right>Loading</SPAN>")    
            loading=$("#demoLoading");
        }
        loading.show();
GM_xmlhttpRequest({
  method: "GET",
  url:     demoFullURL,
  onload: processOEMRDemographics
});
}
function asAddPatientUpdate()
{

    btnAll=$("#"+asAddPatientControls['btnAllergy']);
    btnAll.after("<DIV id='GMControls' style='float:right;'></DIV>");
    $("#GMControls").append("<input type='button' value='Load from OpenEMR' id='gmOEMRImport' >")
    $("#GMControls").append("<div  id='gmOEMRInfo' style='display:none;' >OpenEMRInfo</DIV")

    $("#gmOEMRImport").click(loadDemographicsFromOpenEMR);
}
var loc=window.location.href;
if(loc.indexOf(pages['interstitial'])>=0)
    {
        var adButton = document.getElementById("adControl_closeButton");
        if (adButton != null)
        {
            adButton.click();
        }
    
    }



if((loc.toLowerCase().indexOf(pages['def'])>=0) || (loc.indexOf(pages['Login'])>=0))
    {
        $(document).ready(asSearchDispatcher);
    }


if(loc.indexOf(pages['addPatient'])>=0)
    {
        $(document).ready(asAddPatientUpdate)
    }
if(loc.indexOf(pages['oemrMain'])>=0)
    {
        $(document).ready
        (
            function()
            {
                allScriptsLink="<a id='gmASLink' class='css_button_small' style='float:right;'>"+"<span>Allscripts</span>"+"</a>";
                $("#gmASLink").live({click:function()
                    {
                        winAS=window.open("https://eprescribe.allscripts.com/default.aspx","Allscripts");
                        GM_setValue("searchState","not found");
                    }});
                $("#current_patient_block").append(allScriptsLink);
                
            }
        )
    }

pos=loc.indexOf(pages['oemrDemo']);
if(pos>=0)
    {
        
        $(document).ready(
            function()
            {
                resetInfo();
                server=loc.substr(0,pos);
                GM_setValue("OpenEMR Server",server);
                
                whoDIV=$("td.label:contains('DOB:')").parents("div.tab");

                DOB=whoDIV.find("td.label:contains('DOB:')").next();
                setOEMRDOB(DOB.text());
                Gender=whoDIV.find("td.label:contains('Sex:')").next();
                
               
                patName=$("span.title").text();
                splitName=patName.replace(" ","").split(",");
                fname=splitName[1];
                lname=splitName[0];

                patIDHREF=$("span:contains('Delete')").parent("a.css_button[href]").attr("href");
                deleterHREFInfo="../deleter.php?patient=";
                loc=patIDHREF.indexOf("deleterHREFInfo")+deleterHREFInfo.length+1;
                patID=parseInt(patIDHREF.substr(loc));

                GM_setValue("patientPID",patID);
                GM_setValue("patientFNAME",fname);
                GM_setValue("patientLNAME",lname);                



                
            }
        );
       

    }
