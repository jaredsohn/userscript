// ==UserScript==
// @name            eRepPONBarV2
// @version        2.1
// @description        Set of Tools for eRepublik
// @author            eCitizen pi_wo modfied by thorvik
// @namespace        thorvik
// @email            eRepPONBar@sefcat.pl
// @include        http://betaeconomy.erepublik.com/*
// @include        http://beta.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

//
// DISCLAIMER:
// !!!ABSOLUTELY NO GUARANTEE IT WILL WORK :D!!!
//

//
// LICENSE:
//
// The following script is so called Donationware. You are free to use it without any kind of payment, but
// if you want show your gratitude or appriciation or just want to support my work you are welcome
// to donate any amount of any eCurrency to this account: http://www.erepublik.com/en/citizen/profile/1467082
//
// You are free to modify the script content, but for YOUR OWN USE only. It means you have no right
// to republish (even modified versions) of this software without consulting me and my >clear< approval.
//

var erbFilterGoods;
var erbFilterQuality;
var erbCitizenData = new Array();
var erbCompanyData = new Array();

var erbCmEmployees = new Array();

// MISC
(function() {
var css = "#error{\n        background: url('http://img180.imageshack.us/img180/4372/osaka.jpg') no-repeat !important;\n}\n#logo{ height: 0 !important;\n    width: 0 !important;\npadding-left: 500px !important;\n    padding-top: 40px !important;\n        \n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

function roundMe(v,n){
    return Math.round((v*Math.pow(10,n)))/Math.pow(10,n);
}

function print_r(theObj){
  if(theObj.constructor == Array ||
     theObj.constructor == Object){
     
    var array_dump = "";
   
    array_dump += "<ul>";
    for(var p in theObj){
      if(theObj[p].constructor == Array||
         theObj[p].constructor == Object){
            array_dump +="<li>["+p+"] => "+typeof(theObj)+"</li>";
        array_dump +="<ul>";
        array_dump += print_r(theObj[p]);
        array_dump +="</ul>";
      } else {
        array_dump +="<li>["+p+"] => "+theObj[p]+"</li>";
      }
    }
    array_dump +="</ul>";
  }
 
  return array_dump;
 
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

// END: MISC

// IMAGES

var beer_icon = 'data:image/gif;base64,'+
    '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';



// END: IMAGES

function getSkill(skill){

    for (i = 0; i <= 2; i++){
       
        if (erbCitizenData['skills'][i]['domain'] === skill){
            return erbCitizenData['skills'][i]['value'];
        }
   
    }

}

function loadComData(comId,citName){
   
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://api.erepublik.com/v1/feeds/companies/" + comId + '.json',
        onreadystatechange: function(){
            $("#eRepPONBarLoadingMask").show();
        },
        onload: function (json) {
           
            if(json.status == "200"){
                erbCompanyData = "";
                erbCompanyData = eval("(" + json.responseText + ")");
               
                if(citName != null){
                    getProductivityData(citName);
                }
               
                else{
                    getCmData(comId);
                }           
            }
           
            if(json.status == "404"){
                alert("Nope, sorry, no such company there... 404 - try better next time :]");
            }
           
            $("#eRepPONBarLoadingMask").hide();
        },
    });

}

function loadCitData(citName,func){
   
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://api.erepublik.com/v1/feeds/citizens/" + citName.split(" ").join("%20") + '.json?by_username=true',
        onreadystatechange: function(){

            $("#eRepPONBarLoadingMask").show();

           
        },
        onload: function (json) {
           
            if(json.status == "200"){

                erbCitizenData = eval("(" + json.responseText + ")");
               
                if(erbCitizenData['name'] === citName){
                   
                    switch(func){
       
                        case "getDamageData" : getDamageData(citName); $("#eRepPONBarLoadingMask").hide(); break;
                        case "getProductivityData": if(erbCitizenData['employer_id'] != "" && erbCitizenData['employer_id'] != undefined){loadComData(erbCitizenData['employer_id'],citName);} else{ alert("Citizen is unemployed..."); $("#eRepPONBarLoadingMask").hide();} break;
                       
                    }
                }   
           
            }
           
            if(json.status == "404"){
                alert("Nope, sorry, no such name there... 404 - try better next time :]");
                $("#eRepPONBarLoadingMask").hide();
            }
           
        },
    });

}

function CMsaveWages(){

    if(erbCompanyData['id'] != undefined && erbCompanyData['id'] != null && erbCmEmployees != undefined){
        var jsonString = "({";
        x = true;
       
        for(var i in erbCmEmployees){
           
            if(x){
                jsonString += erbCmEmployees[i]['citizen_id'] + ":\"" + erbCmEmployees[i]['wage'] + "\"";
                x = false;
            }
            else{
                jsonString += "," + erbCmEmployees[i]['citizen_id'] + ":\"" + erbCmEmployees[i]['wage'] + "\"";
            }
        }
       
        jsonString += "})";

        setCookie("CM_" + erbCompanyData['id'],jsonString,365);
       
        alert("Wages saved! :)");
       
    }   

}

function CMloadWages(){

    if(erbCompanyData['id'] != undefined && erbCompanyData['id'] != null && erbCmEmployees != undefined){
        company_id = "" + erbCompanyData['id'];
       
        wagesArray = new Array();

        wages = getCookie("CM_" + company_id);
       
        if(wages!="" && wages!=null){
           
            wagesArray = eval("(" + wages + ")");
           
            for (var i in erbCmEmployees){
           
                for (var j in wagesArray){
                   
                    if(erbCmEmployees[i]["citizen_id"] == j){
                       
                        erbCmEmployees[i]['wage'] = parseFloat(wagesArray[j]);
                        $("#CMrow_wage_" + i).val(parseFloat(wagesArray[j]));
                       
                    }
               
                }
            }
       
            CMcalcAll();
       
        }
       
    }
   
}

function CMcalcAll(){
   
    erbCompanyData['quality'] = parseFloat($('#erbInputCompanyQuality option:selected').attr('value'));
    erbCompanyData['industry'] = $('#erbInputIndustryType option:selected').val();
   
   
    switch(erbCompanyData['industry']){
   
        case "weapon"             : erbCompanyData['domain'] = "manufacturing"; break;
        case "gift"             : erbCompanyData['domain'] = "manufacturing"; break;
        case "moving tickets"     : erbCompanyData['domain'] = "manufacturing"; break;
        case "food"             : erbCompanyData['domain'] = "manufacturing"; break;
       
        case "iron"             : erbCompanyData['domain'] = "land"; break;
        case "grain"             : erbCompanyData['domain'] = "land"; break;
        case "oil"                 : erbCompanyData['domain'] = "land"; break;
        case "diamonds"         : erbCompanyData['domain'] = "land"; break;
        case "wood"             : erbCompanyData['domain'] = "land"; break;
       
        case "house"             : erbCompanyData['domain'] = "constructions"; break;
        case "defense system"     : erbCompanyData['domain'] = "constructions"; break;
        case "hospital"         : erbCompanyData['domain'] = "constructions"; break;
   
    }
   
    GM_setValue("exchangeRate",$('#erbInputGoldLoc').val());
    GM_setValue("sellPrice",$('#erbInputSellPrice').val());
    GM_setValue("valueAddedTax",$('#erbInputVAT').val());
    GM_setValue("rawPrice",$('#erbInputRawPrice').val());   
   
    for(var i in erbCmEmployees){
   
        if(erbCmEmployees[i] != undefined){
       
            CMcalcProductivity(i);
            CMcalcProfit(i);
           
            $('#CMrow_productivity_' + i).html(erbCmEmployees[i]['productivity']);
            $('#CMrow_wpratio_' + i).html(erbCmEmployees[i]['wageprod_ratio']);
            $('#CMrow_profit_' + i).html(erbCmEmployees[i]['profit']);
       
        }
   
    }
   
    CMgetTotals();
   
}

function CMaddLiveUpdateListener(id){

    $("#CMrow_wage_" + i).change( function(){CMliveUpdate(id);});
    $("#CMrow_skill_" + i).change( function(){CMliveUpdate(id);});
    $("#CMrow_wellness_" + i).change( function(){CMliveUpdate(id);});

}

function CMaddRemoveListener(id){

    $("#CMremoveEmployee_" + id).click(function(){CMremoveEmployee(id);});

}

function CMremoveEmployee(id){

    if(confirm("Are you sure? Delete " + erbCmEmployees[id]['citizen_name'] + "?")){
        delete erbCmEmployees[id];
        $("#CMrow_" + id).remove();
       
        CMcalcAll();

    }
}

function CMaddNewEmployee(){

    newEmployee = new Array();
    i = erbCmEmployees.length;
   
    CMdefWage = parseFloat(GM_getValue("eRepPONBarPrefWage",10.0));
    CMdefWell = parseFloat(GM_getValue("eRepPONBarPrefWell",95.0));
    CMdefSkil = parseFloat(GM_getValue("eRepPONBarPrefSkil",5.0));   
   
    newEmployee['citizen_id'] = 0;
    newEmployee['citizen_name'] = "Employee " + (i + 1);
    newEmployee['wage'] = CMdefWage;
    newEmployee['skill'] = CMdefSkil;
    newEmployee['wellness'] = CMdefWell;
    newEmployee['productivity'] = 0.0;
    newEmployee['wageprod_ratio'] = 0.0;
    newEmployee['profit'] = 0.0;
   
    erbCmEmployees[i] = newEmployee;
   
   
    var CmData = "";
    CmData += "<tr class='CmTableRow' id='CMrow_" + i + "'><td id='CMrow_status_" + i + "'>&raquo;</td><td><div id='CMremoveEmployee_" + i + "' class='CMremoveEmployeeButton'></div></td><td>" + erbCmEmployees[i]['citizen_name'] + "</td><td><input id='CMrow_skill_" + i + "' value='" + erbCmEmployees[i]['skill'] + "' style='border: 0px; width: 70px;'></td><td><input id='CMrow_wage_" + i + "' value='" + erbCmEmployees[i]['wage'] + "' style='border: 0px; width: 70px;'></td><td><input id='CMrow_wellness_" + i + "' value='" + erbCmEmployees[i]['wellness'] + "' style='border: 0px; width: 70px;'></td><td id='CMrow_productivity_" + i + "'>" + erbCmEmployees[i]['productivity'] + "</td><td id='CMrow_wpratio_" + i + "'>" + erbCmEmployees[i]['wageprod_ratio'] + "</td><td id='CMrow_profit_" + i + "'>" + erbCmEmployees[i]['profit'] + "</td></tr>";
   
    $("#CM_LastRow").before(CmData);

    CMaddRemoveListener(i);
    CMaddLiveUpdateListener(i);
   
    CMcalcAll();
   
}

function CMgetNumberEmployees(){

    emp_no = 0;

    for (var i in erbCmEmployees){
   
        if(erbCmEmployees[i] != undefined){
            emp_no++;
        }
   
    }
   
    return emp_no;

}

function CMliveUpdate(id){

    erbCmEmployees[id]['skill'] = parseFloat($("#CMrow_skill_" + id).val());
    erbCmEmployees[id]['wage'] = parseFloat($("#CMrow_wage_" + id).val());
    erbCmEmployees[id]['wellness'] = parseFloat($("#CMrow_wellness_" + id).val());
   
    CMcalcProductivity(id);
    CMcalcProfit(id);
   
    $('#CMrow_productivity_' + id).html(erbCmEmployees[id]['productivity']);
    $('#CMrow_wpratio_' + id).html(erbCmEmployees[id]['wageprod_ratio']);
    $('#CMrow_profit_' + id).html(erbCmEmployees[id]['profit']);
   
    CMgetTotals();

}

function CMgetTotals(){

totalWage = 0.0;
totalProductivity = 0.0;
totalProfit = 0.0;
   
    for(var i in erbCmEmployees){
       
        if(erbCmEmployees[i] != undefined){
       
            totalWage += erbCmEmployees[i]['wage'];
            totalProductivity += erbCmEmployees[i]['productivity'];
            totalProfit += erbCmEmployees[i]['profit'];
           
        }   
   
    }
   
    $('#CM_TotalWage').html(roundMe(totalWage,2));
    $('#CM_TotalProductivity').html(roundMe(totalProductivity,2));
    $('#CM_TotalProfit').html(roundMe(totalProfit,3));
}

function CMsetRow(id){

    CMcalcProductivity(id);
    CMcalcProfit(id);
   
    $('#CMrow_productivity_' + id).html(erbCmEmployees[id]['productivity']);
    $('#CMrow_wpratio_' + id).html(erbCmEmployees[id]['wageprod_ratio']);
    $('#CMrow_profit_' + id).html(erbCmEmployees[id]['profit']);
    $('#CMrow_status_' + id).html("&raquo;");
   
    $("#CMrow_wage_" + id).change( function(){CMliveUpdate(id);});
    $("#CMrow_skill_" + id).change( function(){CMliveUpdate(id);});
    $("#CMrow_wellness_" + id).change( function(){CMliveUpdate(id);});
    CMaddRemoveListener(id);
   
    CMgetTotals();

}

function CMgetWellnessById(citId,id){

    GM_xmlhttpRequest({
            method: 'GET',
            url: "http://api.erepublik.com/v1/feeds/citizens/" + citId + '.json',
            onload: function (json) {
                citData = eval("(" + json.responseText + ")");
                erbCmEmployees[id]['wellness'] = citData['wellness'];
                $("#CMrow_wellness_" + id).val(citData['wellness']);
               
                CMsetRow(id);
            },
    });

}

function CMupdateWellness(){

    for (var i in erbCmEmployees){
       
        if(erbCmEmployees[i] != undefined){
            CMgetWellnessById(erbCmEmployees[i]['citizen_id'],i);
        }
   
    }

}

function CMcalcProfit(id){
   
    quality_multiplier = erbCompanyData['quality'];
   
    raw_price = parseFloat($('#erbInputRawPrice').val());
    sell_price = parseFloat($('#erbInputSellPrice').val());
    vat = parseFloat($('#erbInputVAT').val());
    exchange_rate = parseFloat($('#erbInputGoldLoc').val());

    if(erbCompanyData['domain'] === "land"){
        vat = 0;
    }
   
    use_raw = 1;
    prod_units = 0;
   
    f_sell_price = (sell_price - (sell_price * vat/100)) * exchange_rate;
   
    switch(erbCompanyData['industry']){
   
        case 'weapon': prod_units = 5; break;
        case 'food': prod_units = 1; break;
        case 'gift': prod_units = 2; break;
        case 'moving tickets': prod_units = 10; break;
        case 'house': prod_units = 200; break;
        case 'hospital': prod_units = 2000; break;
        case 'defense system': prod_units = 2000; break;
        case 'grain': prod_units = 1; use_raw = 0; break;
        case 'diamonds': prod_units = 1; use_raw = 0; break;
        case 'iron': prod_units = 1; use_raw = 0; break;
        case 'oil': prod_units = 1; use_raw = 0; break;
       
    }
   
    erbCmEmployees[id]['profit'] = roundMe((((f_sell_price/prod_units) * erbCmEmployees[id]['productivity']) - (use_raw * erbCmEmployees[id]['productivity'] * raw_price) - (erbCmEmployees[id]['wage'] * exchange_rate)),4);
    erbCmEmployees[id]['wageprod_ratio'] = roundMe((erbCmEmployees[id]['wage']/erbCmEmployees[id]['productivity']),4);

}

function CMcalcProductivity(id){
   
    skill = erbCmEmployees[id]['skill'];
    well = erbCmEmployees[id]['wellness'];
    c = erbCompanyData['quality'];
    t = erbCompanyData['domain'];
    n = CMgetNumberEmployees();
    r = $('#erbInputRawMaterials option:selected').attr('value');
   
    if(t === "land") Z = 1/4;
    else Z = 1/2;
   
    if(skill == 0)    A = 0.1;
    else A = skill;
   
    if(t === "constructions") opt = 20;
    else opt = 10;
   
    if(n <= opt) B = 1 + n/opt;
    else B = 3 - n/opt;
   
    C = 1 + (2 * (well/100));
   
    if(t === "land"){
   
        switch(r){
            case "high" : D = 2.0; break;
            case "med"    : D = 1.0; break;
            case "low"    : D = 0.01; break;
        }
       
        F = (11 - c) / 10;
   
    }
    else {
    D = 1.0;
    F = 1/c;
    }
   
    prod = Z * A * B * C * D * 1.5 * F;
   
    erbCmEmployees[id]['productivity'] = roundMe(prod,2);

}

function getCmData(companyId){
       
    if(companyId == erbCompanyData['id']){
   
        GM_setValue("lastCompany",companyId);
       
        GM_setValue("exchangeRate",$('#erbInputGoldLoc').val());
        GM_setValue("sellPrice",$('#erbInputSellPrice').val());
        GM_setValue("valueAddedTax",$('#erbInputVAT').val());
        GM_setValue("rawPrice",$('#erbInputRawPrice').val());       
       
        $("#erbCMcompanyName").html("Company Management: " + erbCompanyData['name']);
       
        CMdefWage = parseFloat(GM_getValue("eRepPONBarPrefWage",10.0));
        CMdefWell = parseFloat(GM_getValue("eRepPONBarPrefWell",95.0));
       
        erbCmEmployees = new Array();
   
        $("#erbInputIndustryType option:contains(" + erbCompanyData['industry'] + ")").attr("selected","true");
        $("#erbInputCompanyQuality option:contains(Q" + erbCompanyData['quality'] + ")").attr("selected","true");
       
        $(".CmTableRow").remove();
       
        for(var i in erbCompanyData['employees']){
           
            employee = new Array();
       
            employee['citizen_name'] = erbCompanyData['employees'][i]['citizen_name'];
            employee['citizen_id'] = erbCompanyData['employees'][i]['citizen_id'];
           
            for(var j in erbCompanyData['employees'][i]['skills']){
           
                if(erbCompanyData['employees'][i]['skills'][j]['domain'] === erbCompanyData['domain']){
                       
                    employee['skill'] = erbCompanyData['employees'][i]['skills'][j]['value']; break;
                       
                }
               
            }
               
            employee['wage'] = CMdefWage;
            employee['wellness'] = CMdefWell;
           
            employee['productivity'] = 0.0;
            employee['wageprod_ratio'] = 0.0;
            employee['profit'] = 0.0;
            erbCmEmployees[i] = employee;

        }
           
        var CmData = "";
       
        for(var i in erbCmEmployees){
           
            CmData += "<tr class='CmTableRow' id='CMrow_" + i + "'><td id='CMrow_status_" + i + "'><img src='http://www.erepublik.com/images/parts/ajax-loader.gif' style='height: 12px; width: 12px;'></td><td><div id='CMremoveEmployee_" + i + "' class='CMremoveEmployeeButton'></td><td><a target='_blank' href='http://www.erepublik.com/en/citizen/profile/" + erbCmEmployees[i]['citizen_id'] + "'>" + erbCmEmployees[i]['citizen_name'] + "</a></td><td><input id='CMrow_skill_" + i + "' value='" + erbCmEmployees[i]['skill'] + "' style='border: 0px; width: 70px;'></td><td><input id='CMrow_wage_" + i + "' value='" + erbCmEmployees[i]['wage'] + "' style='border: 0px; width: 70px;'></td><td><input id='CMrow_wellness_" + i + "' value='" + erbCmEmployees[i]['wellness'] + "' style='border: 0px; width: 70px;'></td><td id='CMrow_productivity_" + i + "'>" + erbCmEmployees[i]['productivity'] + "</td><td id='CMrow_wpratio_" + i + "'>" + erbCmEmployees[i]['wageprod_ratio'] + "</td><td id='CMrow_profit_" + i + "'>" + erbCmEmployees[i]['profit'] + "</td></tr>";
           
        }
           
        $("#CM_LastRow").before(CmData);
           
        erbCompanyData['loaded'] = true;
       
        CMloadWages();
       
        CMupdateWellness();
    }
   
    else{
        loadComData(companyId,null);
    }

}

function eRepPONBarCompanyManagement(){
   
    lastCompany = GM_getValue("lastCompany","");
    exchangeRate = GM_getValue("exchangeRate",0.025);
    sellPrice = GM_getValue("sellPrice",1.0);
    valueAddedTax = GM_getValue("valueAddedTax",5);
    rawPrice = GM_getValue("rawPrice",0.0115);
   
    var eRepPONBarCompanyManagement =     '<h3 id="erbCompanyName"><div id="erbCMcompanyName">Company Management</div><div class="executeButton" style="font-size: 12px; margin-left: 5px; position: relative; top: -20px;" id="CMsaveWages">Save Wages</div></h3>' +
                                '<div id="eRepPONBarCmFilters">' +
                                    '<div style="width: 740px; float: left;">' +
                                        '<div class="inputdesc" style="width: 100px; padding-left: 10px;">Company Id:</div><div class="input_holder"><input id="erbInputCompanyId" class="inputtext" style="width: 100px" value="' + lastCompany + '"></div><div class="inputholder_end"></div>' +
                                        '<div class="executeButtonSmall" id="erbLoadCmData">Load</div>' +
                                        '<div class="inputdesc" style="width: 55px; padding-left: 10px;">Loc/<img src="/images/parts/icon-gold.gif"/>: </div><div class="input_holder"><input id="erbInputGoldLoc" class="inputtext" style="width: 50px" value="' + exchangeRate + '"></div><div class="inputholder_end"></div>' +
                                        '<div class="inputdesc" style="width: 90px; padding-left: 10px;">Sell Price [Loc]:</div><div class="input_holder"><input id="erbInputSellPrice" class="inputtext" style="width: 50px" value="' + sellPrice + '"></div><div class="inputholder_end"></div>' +
                                        '<div class="inputdesc" style="width: 55px; padding-left: 10px;">VAT [%]:</div><div class="input_holder"><input id="erbInputVAT" class="inputtext" style="width: 50px" value="' + valueAddedTax + '"></div><div class="inputholder_end"></div>' +
                                    '</div>' +
                                    '<div style="width: 740px; float: left;">' +
                                        '<div class="inputdesc" style="width: 100px; padding-left: 10px;">Company Quality:</div><div class="input_holder" style="width: 45px">' +
                                        '<select class="inputselect" id="erbInputCompanyQuality"><option class="CMopt" value="1">Q1</option><option class="CMopt" value="2">Q2</option><option class="CMopt" value="3">Q3</option><option class="CMopt" value="4">Q4</option><option class="CMopt" value="5">Q5</option></select>' +                           
                                        '</div><div class="inputholder_end"></div>' +
                                        '<div class="inputdesc" style="width: 50px; padding-left: 10px;">Industry:</div><div class="input_holder" style="width: 125px">' +
                                        '<select class="inputselect" id="erbInputIndustryType"><option value="">weapon</option><option value="">food</option><option value="">gift</option><option value="">moving tickets</option><option value="">grain</option><option value="">diamonds</option><option value="">iron</option><option value="">oil</option><option value="">wood</option><option value="">house</option><option value="">defense system</option><option value="">hospital</option></select>' +                           
                                        '</div><div class="inputholder_end"></div>' +
                                        '<div class="inputdesc" style="width: 90px; padding-left: 10px;">Raw Materials:</div><div class="input_holder" style="width: 80px">' +
                                        '<select class="inputselect" id="erbInputRawMaterials"><option value="high">High</option><option value="med">Medium</option><option value="low">Low</option></select>' +                           
                                        '</div><div class="inputholder_end"></div>' +
                                        '<div class="inputdesc" style="width: 95px; padding-left: 10px;">Raw Price [<img src="/images/parts/icon-gold.gif"/>]:</div><div class="input_holder"><input id="erbInputRawPrice" class="inputtext" style="width: 50px" value="' + rawPrice + '"></div><div class="inputholder_end"></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div style="clear: both">' +
                                    '<table style="width: 750px;" id="erbCmTable"><tbody>' +
                                        '<tr class="erbCmTableHead"><td style="width: 20px"></td><td style="width: 20px"></td><td style="width: 180px; text-align: left;">Employee</td><td style="width: 70px">Skill</td><td style="width: 90px">Wage</td><td style="width: 90px">Wellness</td><td style="width: 90px">Productivity</td><td style="width: 90px">W/P Ratio</td><td style="width: 90px">Daily Profit <img src="/images/parts/icon-gold.gif"/></td></tr>' +
                                        '<tr style="border: 0px; font-weight: bold;" id="CM_LastRow"><td colspan="3"><div id="erbCmAddNewEmployee" class="CMaddEmployeeButton"></div>Add new Employee</td><td></td><td id="CM_TotalWage"></td><td></td><td id="CM_TotalProductivity"></td><td></td><td id="CM_TotalProfit"></td></tr>' +
                                    '</tbody></table>' +
                                '</div>';
                           
    $('#eRepPONBarContent').empty();
    $('#eRepPONBarContent').append(eRepPONBarCompanyManagement);
   
    $('#erbCmAddNewEmployee').click(function(){CMaddNewEmployee();});
   
    $('#erbInputCompanyId').keypress(function (e) { if(e.keyCode == 13){ getCmData($("#erbInputCompanyId").val()); } });
    $('#erbLoadCmData').click(function(){getCmData($("#erbInputCompanyId").val());});
   
    $('#erbInputGoldLoc').change(function(){CMcalcAll();});
    $('#erbInputSellPrice').change(function(){CMcalcAll();});
    $('#erbInputVAT').change(function(){CMcalcAll();});
    $('#erbInputCompanyQuality').click(function(){CMcalcAll();});
    $('#erbInputIndustryType').click(function(){CMcalcAll();});
    $('#erbInputRawMaterials').click(function(){CMcalcAll();});
    $('#erbInputRawPrice').change(function(){CMcalcAll();});
   
    $('#CMsaveWages').click(function(){CMsaveWages();});
}

function getProductivityData(citName){

    if(erbCitizenData['name'] === citName && erbCitizenData['employer_id'] === erbCompanyData['id']){
        $("#erbInputCurrentWellness").val(erbCitizenData['wellness']);
        $("#erbInputSkill").val(getSkill(erbCompanyData['domain']));
        $("#erbInputNoEmployees").val(erbCompanyData['employees'].length);
        $("#erbInputCompanyType option:contains(" + erbCompanyData['domain'] + ")").attr("selected","true");
        $("#erbInputCompanyQuality option:contains(Q" + erbCompanyData['quality'] + ")").attr("selected","true");
        updatePersonalProductivity();
    }
   
    else{
        loadCitData(citName,"getProductivityData");
    }   

}

function updatePersonalProductivity(){

    well = parseFloat($('#erbInputCurrentWellness').val());
    skill = parseFloat($('#erbInputSkill').val());
    c = parseInt($('#erbInputCompanyQuality option:selected').attr('value'));
    t = $('#erbInputCompanyType option:selected').attr('value');
    n = parseInt($('#erbInputNoEmployees').val());
    r = $('#erbInputRawMaterials option:selected').attr('value');
   
    if(t === "land") Z = 1/4;
    else Z = 1/2;
   
    if(skill == 0)    A = 0.1;
    else A = skill;
   
    if(t === "cons") opt = 20;
    else opt = 10;
   
    if(n <= opt) B = 1 + n/opt;
    else B = 3 - n/opt;
   
    C = 1 + (2 * (well/100));
   
    if(t === "land"){
   
        switch(r){
            case "high" : D = 2.0; break;
            case "med"    : D = 1.0; break;
            case "low"    : D = 0.01; break;
        }
       
        F = (11 - c) / 10;
   
    }
    else {
    D = 1.0;
    F = 1/c;
    }
   
    prod = Z * A * B * C * D * 1.5 * F;
   
    $("#eRepPONBarProd").html(roundMe(prod,2));
}

function eRepPONBarProductivity(){

    var eRepPONBarProductivity =     '<h3>Productivity Calculator</h3>' +
                                '<div id="eRepPONBarProductivityStats">' +
                                    '<div><div class="inputdesc">Citizen name:</div><div class="input_holder"><input id="erbInputCitizenName" class="inputtext" style="width: 100px" value="' + $(".nameholder a").html() + '"></div><div class="inputholder_end"></div><div class="executeButtonSmall" id="erbLoadProductivityData">Load</div></div>' +
                                    '<div><div class="inputdesc" style="clear: both">Wellness:</div><div class="input_holder"><input id="erbInputCurrentWellness" class="inputtext" style="width: 50px" value="' + $("#wellnessvalue").html() + '"></div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="clear: both">Skill:</div><div class="input_holder"><input id="erbInputSkill" class="inputtext" style="width: 50px" value="0.0"></div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="clear: both">Company Quality:</div><div class="input_holder" style="width: 45px">' +
                                    '<select class="inputselect" id="erbInputCompanyQuality"><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>' +                           
                                    '</div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="clear: both">Company Type:</div><div class="input_holder" style="width: 110px">' +
                                    '<select class="inputselect" id="erbInputCompanyType"><option value="manu">manufacturing</option><option value="land">land</option><option value="cons">constructions</option></select>' +                           
                                    '</div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="clear: both">No. of Employees:</div><div class="input_holder"><input id="erbInputNoEmployees" class="inputtext" style="width: 50px" value="0"></div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="clear: both">Raw Materials:</div><div class="input_holder" style="width: 80px">' +
                                    '<select class="inputselect" id="erbInputRawMaterials"><option value="high">High</option><option value="med">Medium</option><option value="low">Low</option></select>' +                           
                                    '</div><div class="inputholder_end"></div></div>' +
                                '</div>' +
                                '<div id="eRepPONBarProductivityResults">' +
                                    '<h2 class="special" style="padding-bottom: 20px;">Productivity:</h2>' +
                                    '<span class="display-strenght-start">' +
                                        '<span class="display-strenght-end">' +
                                            '<span class="display-strenght-core tooltip" id="eRepPONBarProd">0.00</span>' +
                                        '</span>' +
                                    '</span>' +
                                '</div>';

    $('#eRepPONBarContent').empty();
    $('#eRepPONBarContent').append(eRepPONBarProductivity);
   
    $('#erbInputCurrentWellness').keyup(function(){updatePersonalProductivity();});
    $('#erbInputSkill').keyup(function(){updatePersonalProductivity();});
    $('#erbInputNoEmployees').keyup(function(){updatePersonalProductivity();});
    $('#erbInputCompanyQuality').change(function(){updatePersonalProductivity();});
    $('#erbInputCompanyType').change(function(){updatePersonalProductivity();});
    $('#erbInputRawMaterials').change(function(){updatePersonalProductivity();});
   
    $('#erbInputCitizenName').keypress(function (e) { if(e.keyCode == 13){ getProductivityData($("#erbInputCitizenName").val()); } });
    $('#erbLoadProductivityData').click(function(){getProductivityData($("#erbInputCitizenName").val());});
                           
}


function getDamageData(citName){

    if(erbCitizenData['name'] === citName){
        $("#erbInputCurrentWellness").val(erbCitizenData['wellness']);
        $("#erbInputStrength").val(erbCitizenData['strength']);
        $("#erbInputMilitaryRank option:contains(" + erbCitizenData['military_rank'] + ")").attr("selected","true");
        updateDamage();
    }
   
    else{
        loadCitData(citName,"getDamageData");
    }   

}

function setWeaponQuality(){
$("#erbInputWeaponQuality100 option:contains(" + $("#erbInputWeaponQuality").val() + ")").attr("selected","true");
$("#erbInputWeaponQuality90 option:contains(" + $("#erbInputWeaponQuality").val() + ")").attr("selected","true");
$("#erbInputWeaponQuality80 option:contains(" + $("#erbInputWeaponQuality").val() + ")").attr("selected","true");
$("#erbInputWeaponQuality70 option:contains(" + $("#erbInputWeaponQuality").val() + ")").attr("selected","true");
$("#erbInputWeaponQuality60 option:contains(" + $("#erbInputWeaponQuality").val() + ")").attr("selected","true");
}

function updateDamage(){

    well = parseFloat($('#erbInputCurrentWellness').val());
    str = parseFloat($('#erbInputStrength').val());
   
    w = parseFloat($('#erbInputWeaponQuality option:selected').attr('value'));
   
    w100 = parseFloat($('#erbInputWeaponQuality100 option:selected').attr('value'));
    w90 = parseFloat($('#erbInputWeaponQuality90 option:selected').attr('value'));
    w80 = parseFloat($('#erbInputWeaponQuality80 option:selected').attr('value'));
    w70 = parseFloat($('#erbInputWeaponQuality70 option:selected').attr('value'));
    w60 = parseFloat($('#erbInputWeaponQuality60 option:selected').attr('value'));
   
    r = parseFloat($('#erbInputMilitaryRank option:selected').attr('value'));
   
    fights = new Array();
   
    for(i = 1; i <= 5; i++){
   
            if(well > 90){fights[i] = (1 + ((well - 25)/100)) * str * w100 * r * 2;}
            if(well <= 90 && well > 80){fights[i] = (1 + ((well - 25)/100)) * str * w90 * r * 2;}
            if(well <= 80 && well > 70){fights[i] = (1 + ((well - 25)/100)) * str * w80 * r * 2;}
            if(well <= 70 && well > 60){fights[i] = (1 + ((well - 25)/100)) * str * w70 * r * 2;}
            if(well <= 60){fights[i] = (1 + ((well - 25)/100)) * str * w60 * r * 2;}
           
            well -= 10;
    }
   
    first_fight = fights[1];

    fights5 = fights[1] + fights[2] + fights[3] + fights[4] + fights[5];
    fights6 = fights5 + fights[1];
    fights10 = 2 * fights5;
    fights11 = fights6 + fights5;
   
    tank20 = 20 * first_fight + fights6;
    tank40 = 40 * first_fight + fights6;
    tank60 = 60 * first_fight + fights6;
    tank80 = 80 * first_fight + fights6;
   
    cumulated_dmg = '<td>' + roundMe(fights5,2) + '</td><td>' + roundMe(fights6,2) + '</td><td>' + roundMe(fights10,2) + '</td><td>' + roundMe(fights11,2) + '</td><td>' + roundMe(tank20,2) + '</td><td>' + roundMe(tank40,2) + '</td><td>' + roundMe(tank60,2) + '</td><td>' + roundMe(tank80,2) + '</td>';
   
    $("#eRepPONBarFirstFight").html(roundMe(first_fight,1));   
    $("#erpCumulatedDamage").html(cumulated_dmg);
}

function eRepPONBarShortCuts(){

    var eRepPONBarShortCuts =     '<h3>Accesos rápidos</h3>' +
                         '<div>' +
                                '<ul style="list-style-type:circle; padding-left: 15px;">'+
                                 '<li><a href="http://betaeconomy.erepublik.com/es/my-places/company/2261">Compañia</li>' +
			                        '<li><a href="http://betaeconomy.erepublik.com/es/train">Training Grounds</li>'+
			                        '<li><a href="http://betaeconomy.erepublik.com/es/study">Biblioteca</li>'+
			                        '<li><a href="http://betaeconomy.erepublik.com/es/entertain">Entrenimiento</li>'+
			                        '<li><a href="http://beta.erepublik.com/es/my-places/party">Partido Político</li>'+
			                        '<li><a href="http://beta.erepublik.com/es/my-places/newspaper">Periódico</li>'+
			                        '<li><a href="http://beta.erepublik.com/es/country/Spain">Pais</li>'+
			                        '<li><a href="http://beta.erepublik.com/es/chat/rooms">Chat</li>'+
			                        '<li><a href="http://beta.erepublik.com/es/my-places/organizations">Organización</li>'+
                         '</div>' ;

$('#eRepPONBarContent').empty();
$('#eRepPONBarContent').append(eRepPONBarShortCuts);

}


function eRepPONBarOrgs(){

    var eRepPONBarOrgs =     '<h3>Organizaciones del PON</h3>' +
                         '<div>' +
                                '<ul style="list-style-type:circle; padding-left: 15px;">' +
                               '<li><a href="http://www.erepublik.com/es/organization/1148011">PON Credit Bank</li>' +
			       '<li><a href="http://www.erepublik.com/es/organization/1227036">Partido Otaku Nippon</li>'+
			       '<li><a href="http://www.erepublik.com/es/organization/2070346">Senpai - Kohai</li>'+
			       '<li><a href="http://www.erepublik.com/en/organization/2639728">Centro Pokemon</li>'+
			       '<li><a href="http://www.erepublik.com/es/organization/2398720">Fuerzas Armadas Poneras</li>'+
			       '<li><a href="http://www.erepublik.com/en/organization/1716708">Santa sede Haruhista</li>'+
			       '<li><a href="http://www.erepublik.com/en/organization/2417396">PON Intelligence agency</li>'+			
                               '</div>' ;

$('#eRepPONBarContent').empty();
$('#eRepPONBarContent').append(eRepPONBarOrgs);

}


function renderWellnessPronosis(){

    well = parseFloat($('#erbInputCurrentWellness').val());
    f = parseInt($('#erbInputFoodQuality option:selected').attr('value'));
    h = parseInt($('#erbInputHouseQuality option:selected').attr('value'));

    hq = parseInt($('#erbInputHospitalQuality option:selected').attr('value')) * 10;
   
    keep_wellness = $('#erbInputKeepWellness option:selected').val();
       
    gifts_pool = parseInt($("#erbInputGifts").val());
   
    WellnessPrognosisChart_data = "";
    WellnessPrognosisChart_data2 = "0";
    WellnessPrognosisChart_data += well;
   
    fights_no_holder = '<table style="position: relative; top: -60px; left: 105px; text-align: center; color:#FFFFFF; font-size:18px;"><tr>';

        for( i = 1; i <= 7; i++){
           
            well -= 2;
           
            wellness_gain = (1.5 - (well/100)) * (h + f);
            if    ((wellness_gain + well) > 100) { wellness_gain = wellness_gain - ((wellness_gain + well) - 100); }
           
            well = roundMe(well + wellness_gain,1);
           
            fights_no = 0;
            ha = 1;
            g = gifts_pool;
            max_well = well;
           
            switch(keep_wellness){
               
                case "high" :
                                kw = 88;
                               
                                while(((well-10) + g) >= (kw - hq) && ha == 1  && well >= 40){
                                   
                                    if(well > max_well){max_well = well;}
                               
                                    fights_no++;
                                    well -= 10;
               
                                    while ((well-10) < kw && g > 0){
                                        well++;
                                        g--;
                                    }
                                   
                                    if ((well-10) < (kw - hq)){
                                        well += hq;
                                        ha = 0;
                                    }
                                }
                               
                                break;
               
                case "low" :
                               
                                kw = 100 - hq - ((f + h)/1.5);
                               
                                while(((well-10) + (hq*ha) + g) >= kw && well >= 40){
                                   
                                    if(well > max_well){max_well = well;}
                               
                                    fights_no++;
                                    well -= 10;
               
                                    if ((well-10) < kw && ha == 1){
                                        well += hq;
                                        ha = 0;
                                    }
               
                                    while ((well-10) < kw && g > 0){
                                        well++;
                                        g--;
                                    }
                                }
                               
                                break;
                               
            }
           

            max_well = roundMe(max_well - well,1);
           
            WellnessPrognosisChart_data +=     "," + well;
            WellnessPrognosisChart_data2 += "," + max_well;
           
            fights_no_holder += '<td style="width: 79px;">' + fights_no + '</td>';
           
        }

    fights_no_holder += '</tr></table>';   
   
    WellnessPrognosisChart_url = "http://chart.apis.google.com/chart?cht=bvs&chbh=75&chco=9933FF,C6D9FD&chm=N,000000,0,-1,11&chd=t:" + WellnessPrognosisChart_data + "|" + WellnessPrognosisChart_data2 + "&chg=0,50&chs=740x200&chxt=x,y&chxl=0:|Day0|Day1|Day2|Day3|Day4|Day5|Day6|Day7|1:|0|50|100";

    $("#eRepPONBarWellnessChart").html('<img src="'+ WellnessPrognosisChart_url +'">');
    $("#eRepPONBarWellnessChart").append(fights_no_holder);
   
}

function updateWellness(){

    well = parseFloat($('#erbInputCurrentWellness').val());
    h = parseInt($('#erbInputFoodQuality option:selected').attr('value'));
    f = parseInt($('#erbInputHouseQuality option:selected').attr('value'));
   
    wellness_gain = (1.5 - (well/100)) * (h + f);
   
    if    ((wellness_gain + well) > 100) {wellness_gain = wellness_gain - ((wellness_gain + well) - 100);}
   
    $("#eRepPONBarWellnessGain").html(roundMe(wellness_gain,2));
   

}

function eRepPONBarWellness(){

    var eRepPONBarWellness =     '<h3>Wellness Calculator</h3>' +
                            '<div id="eRepPONBarWellnessStats">' +
                                '<div><div class="inputdesc" style="clear: both">Current Wellness:</div><div class="input_holder"><input id="erbInputCurrentWellness" class="inputtext" style="width: 50px" value="' + $("#wellnessvalue").html() + '"></div><div class="inputholder_end"></div></div>' +
                                '<div><div class="inputdesc" style="clear: both">Food Quality:</div><div class="input_holder" style="width: 45px">' +
                                '<select class="inputselect" id="erbInputFoodQuality" value="1"><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>' +                           
                                '</div><div class="inputholder_end"></div></div>' +
                                '<div><div class="inputdesc" style="clear: both">House Quality:</div><div class="input_holder" style="width: 45px">' +
                                '<select class="inputselect" id="erbInputHouseQuality" value="1"><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>' +                           
                                '</div><div class="inputholder_end"></div></div>' +
                            '</div>' +
                            '<div id="eRepPONBarWellnessResults">' +
                                '<h2 class="special" style="padding-bottom: 20px;">Wellness Gain tomorrow:</h2>' +
                                '<span class="display-strenght-start">' +
                                    '<span class="display-strenght-end">' +
                                        '<span class="display-strenght-core tooltip" id="eRepPONBarWellnessGain">0.00</span>' +
                                    '</span>' +
                                '</span>' +
                            '</div>' +
                            '<h3>Wellness Projection and estimated No. of Fights for next 7 days</h3>' +
                            '<div>' +
                                '<div style="float: left;"><div class="inputdesc" style="width: 100px;">Hospital Quality:</div><div class="input_holder" style="width: 45px">' +
                                '<select class="inputselect" id="erbInputHospitalQuality" value="1"><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>' +                           
                                '</div><div class="inputholder_end"></div></div>' +
                                '<div style="float: left;"><div class="inputdesc" style="width: 100px; margin-left: 10px;">Keep Wellness*:</div><div class="input_holder" style="width: 60px">' +
                                '<select class="inputselect" id="erbInputKeepWellness" value="1"><option value="90">high</option><option value="low">low</option></select>' +                           
                                '</div><div class="inputholder_end"></div></div>' +
                                '<div style="float: left;"><div class="inputdesc"  style="width: 110px; margin-left: 10px;">Gifts Q1 each day:</div><div class="input_holder"><input id="erbInputGifts" class="inputtext" style="width: 50px" value="0"></div><div class="inputholder_end"></div></div>' +
                                '<div class="executeButton" id="eRepPONBarWellnessChartRenderer">Render Projection</div>' +
                            '</div>' +
                            '<div style="color: #808080; font-size: 8px; font-style: italic; clear: both;">* Keep Wellness at the end of the day: high = constant 88 / low = 100 - (Hospital Quality * 10) - ((Food Quality + House Quality)/1.5)</div>' +
                            '<div id="eRepPONBarWellnessChart"></div>';

    $('#eRepPONBarContent').empty();
    $('#eRepPONBarContent').append(eRepPONBarWellness);
   
    $('#erbInputCurrentWellness').keyup(function(){updateWellness();});
    $('#erbInputFoodQuality').change(function(){updateWellness();});
    $('#erbInputHouseQuality').change(function(){updateWellness();});
    $('#eRepPONBarWellnessChartRenderer').click(function(){renderWellnessPronosis();});
   
    updateWellness();
                       
}

function savePreferences(){

    GM_setValue("eRepPONBarStartPage",$("#erbInputStartPage").val());
    GM_setValue("eRepPONBarPrefWage",$("#erbInputPrefWage").val());
    GM_setValue("eRepPONBarPrefWell",$("#erbInputPrefWell").val());
    GM_setValue("eRepPONBarPrefSkil",$("#erbInputPrefSkil").val());
   
    alert("Preferences saved!");

}

function eRepPONBarPreferences(){

    var eRepPONBarPreferences =     '<h3>Preferencias</h3>' +
                                '<div style="clear: both;">' +
                                    '<div><div class="inputdesc" style="width: 120px; text-align: center;">Start Page:</div><div class="input_holder" style="width: 170px">' +
                                    '<select class="inputselect" id="erbInputStartPage"><option value="about">About eRepPONBar</option><option value="wellC">Wellness Calculator</option><option value="dmgC">Damage Calculator</option><option value="prodC">Productivity Calculator</option><option value="CM">Company Management</option></select>' +                           
                                    '</div><div class="inputholder_end"></div></div>' +
                                '</div>' +
                                '<h3 style="clear: both;">Company Management Preferences</h3>' +
                                '<div style="clear: both;">' +
                                    '<div><fieldset style="border: 1px solid #ccc; margin-bottom: 10px;"><legend style="margin-left: 10px;">CM - Employee Pattern: </legend>' +
                                    '<div><div class="inputdesc" style="width: 40px; margin-left: 10px;">Wage:</div><div class="input_holder"><input id="erbInputPrefWage" class="inputtext" style="width: 50px" value=""></div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="width: 60px; margin-left: 10px;">Wellness:</div><div class="input_holder"><input id="erbInputPrefWell" class="inputtext" style="width: 50px" value=""></div><div class="inputholder_end"></div></div>' +
                                    '<div><div class="inputdesc" style="width: 40px; margin-left: 10px;">Skill:</div><div class="input_holder"><input id="erbInputPrefSkil" class="inputtext" style="width: 50px" value=""></div><div class="inputholder_end"></div></div>' +
                                    '</fieldset></div>' +
                                '</div>' +
                                '<div style="clear: both;">' +
                                    '<div class="executeButton" id="eRepPONBarSavePrefs">Save Preferences</div>' +
                                '</div>';
                               
    $('#eRepPONBarContent').empty();
    $('#eRepPONBarContent').append(eRepPONBarPreferences);

    startPage = GM_getValue("eRepPONBarStartPage","About eRepPONBar");
    CMdefWage = GM_getValue("eRepPONBarPrefWage",10.0);
    CMdefWell = GM_getValue("eRepPONBarPrefWell",95.0);
    CMdefSkil = GM_getValue("eRepPONBarPrefSkil",5.0);
   
    $("#erbInputStartPage option:contains(" + startPage + ")").attr("selected","true");
    $("#erbInputPrefWage").val(CMdefWage);
    $("#erbInputPrefWell").val(CMdefWell);
    $("#erbInputPrefSkil").val(CMdefSkil);
   
    $("#eRepPONBarSavePrefs").click(function(){ savePreferences(); });
}

function eRepPONBarAbout(){
    var eRepPONBarAbout =     '<h3>Bienvenido a eRepublikPONBar v 0.2!</h3>' +
                        '<div style="clear: both;">' +
                            '<div>' +
                            '<p style="font-size: 13px"><b>Â¿Y esta barra para que sirve?</b></p><br>' +
                            '<p>Esto es un acceso directo a las pÃ¡ginas del PON desarrollada para hacer la vida del PONero un poco mas facil </p><br>' +
                            '<p style="font-size: 13px"><b>Funciones en v 0.1</b></p><br>' +
                            '<ul style="list-style-type:circle; padding-left: 15px;">' +
                            '<li>Accesos directos a Foro IRC y Radio</li>' +
                            '<li>Accesos directos a Empresas y Organizaciones</li>' +
			    '<br>' +
                            '<p style="font-size: 13px"><b>Licencia(Original)</b></p><br>' +
                            '<p>eRepPONBar es una herramienta <strong>Gratuita</strong>. Si te ha gustado y quieres colaborar escribeme un MP<a href="http://www.erepublik.com/es/citizen/profile/2261"><p>TambiÃ©n acepto donaciones a modo de:</p>' +
                            '<p style="font-size: 16px; font-weight: bold;"><a href="http://www.erepublik.com/es/citizen/profile/2261"><img src="' + beer_icon + '" align="center">Cervezaaa!</a></p>' +
                            '<p style="font-size: 13px"><b>Aviso</b></p><br>' +
                            '<p>NO GARANTIZO FUNCIONAMIENTO :)</p><br>' +
                        '</div>';
                       
    $('#eRepPONBarContent').empty();
    $('#eRepPONBarContent').append(eRepPONBarAbout);                   
}

function eRepPONBarCreateStyles(){

    GM_addStyle("#eRepPONBar {background: #9933FF; width: 954px; height: 25px; display: block; clear: both; cursor: pointer; margin-bottom: 5px;}");
    GM_addStyle(".eRepPONBarLeftCorner {width: 25px; height: 25px; background: transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll 0px -615px; float: left;}");
    GM_addStyle(".eRepPONBarArrow {width: 25px; height: 25px; background: transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll -10px -907px; float: left;}");
    GM_addStyle(".eRepPONBarBody {width: 879px; height: 25px; float: left; margin-top: 5px}");
    GM_addStyle(".eRepPONBarRightCorner {width: 25px; height: 25px; background: transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll -71px -615px; float: left;}");

    GM_addStyle("#eRepPONBarMainContainer {width: 954px; height: 300px; clear: both; display:none;}");

    GM_addStyle("#eRepPONBarButtonContainer {width: 175px; float: left; border: 1px solid #ccc; padding-top: 15px; padding-left: 5px; padding-right: 5px;}");
    GM_addStyle(".eRepPONBarButton {background: transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll 0px -939px; width: 175px; height: 40px; float: left; padding-bottom: 15px; cursor: pointer; color: #808080}");
    GM_addStyle(".eRepPONBarButton:hover {background: transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll 0px -899px; color: #fff}");
    GM_addStyle(".eRepPONBarButton p{padding-top: 14px; padding-left: 25px;}");

    GM_addStyle("#eRepPONBarContent{width: 750px; height: 350px; float: right;}");

    GM_addStyle("#eRepPONBarWellnessStats {width : 500px; height: 140px; float: left;}");
    GM_addStyle("#eRepPONBarWellnessResults {width : 200px; height: 140px; float: right;}");
    GM_addStyle("#eRepPONBarWellnessChart {width : 750px; height: 300px; float: left;}");
   
    GM_addStyle("#eRepPONBarShortCutsStats {width : 500px; height: 280px; float: left;}");
    GM_addStyle("#eRepPONBarShortCutsResults {width : 200px; height: 280px; float: right;}");
   
    GM_addStyle("#eRepPONBarOrgsStats {width : 500px; height: 220px; float: left;}");
    GM_addStyle("#eRepPONBarOrgsResults {width : 200px; height: 220px; float: right;}");
   
    GM_addStyle("#eRepPONBarCmFilters {width : 750px; height: 80px; float: left;}");
   
    GM_addStyle("#erbCmTable {color: #666;}");
    GM_addStyle("#erbCmTable td{border: 1px solid #ddd; text-align: center;}");
    GM_addStyle("#erbCmTable .erbCmTableHead td{border: 0px; font-weight: bold;}");
   
    GM_addStyle(".input_holder{float:left; height: 32px; background:transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll 0 -110px;}");
    GM_addStyle(".inputdesc {float:left; width: 150px; height: 32px; margin-top: 10px;");
    GM_addStyle(".inputtext {background:transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll 0 -110px; border:medium none; color:#808080; display:block; height: 24px; padding:8px 0 0 6px;}");
    GM_addStyle(".inputselect{color: #808080; position: relative; top: 6px; left: 5px; border:medium none;}");
    GM_addStyle(".inputselect option{color: #808080;}");
    GM_addStyle(".inputholder_end {background:transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll -284px -110px; display:block; width: 5px; height: 32px; float: left;}");

    GM_addStyle(".executeButton {background:transparent url(/images/parts/btn-profile-small.gif) no-repeat scroll left center; color:#3C8FA7; display:block; height:20px; padding:5px 0 0 12px; width:175px; float: right; cursor: pointer;}");
    GM_addStyle(".executeButtonSmall {background: transparent url(http://img30.imageshack.us/img30/5638/maperepubliklogged.png) no-repeat scroll -232px -582px; color:#3C8FA7; display:block; height:26px; padding:5px 0 0 12px; margin-left: 20px; width:68px;  float: left; cursor: pointer;}");

    GM_addStyle(".CMaddEmployeeButton {background:transparent url(/images/parts/addcomment.gif) no-repeat scroll -15px -1px; color:#3C8FA7; display:block; height:16px; padding: 0px; width:16px; float: left; cursor: pointer;}");   
    GM_addStyle(".CMremoveEmployeeButton {background:transparent url(/images/parts/red_x.png) no-repeat scroll 3px 3px; color:#3C8FA7; display:block; height:16px; padding: 0px; width:16px; float: left; cursor: pointer;}");   
   
    GM_addStyle("#eRepPONBarLoadingMask {width: 954px; height: 550px; position: relative; top: 0px; left: 0px; display: none; opacity: 0.5; background: #fff;}");
   
}

function eRepPONBarConstruct(){

    eRepPONBarCreateStyles();
   
    var bar =     '<div id="eRepPONBar">' +
                    '<div class="eRepPONBarLeftCorner"></div>' +
                    '<div class="eRepPONBarArrow"></div>' +           
                    '<div class="eRepPONBarBody"><span style="font-weight: bold; color: #fff;">eRepPONBar</span></div>' +
                    '<div class="eRepPONBarRightCorner"></div>' +
                '</div>' +
                '<div id="eRepPONBarMainContainer">' +
                    '<div id="eRepPONBarButtonContainer">' +
//                        '<div id="buttonWellness" class="eRepPONBarButton"><p>Calculadora de Wellness</p></div>' +
                        '<div id="buttonShortCuts" class="eRepPONBarButton"><p>Accesos rapidos</p></div>' +
                        '<div id="buttonPONEmp" class="eRepPONBarButton"><p>Organizaciones del PON</p></div>' +
//                        '<div id="buttonCompanyManagement" class="eRepPONBarButton"><p>GestiÃ³n de empresa</p></div>' +
//                        '<div id="buttonPreferences" class="eRepPONBarButton"><p>Preferencias</p></div>' +
                        '<div id="buttonForo" class="eRepPONBarButton"><p>Foro del PON</p></div>' +
                        '<div id="buttonRadioPON" class="eRepPONBarButton"><p>Radio del PON</p></div>' +
                        '<div id="buttonIRC" class="eRepPONBarButton"><p>IRC del PON</p></div>' +
                        '<div id="buttonAbout" class="eRepPONBarButton"><p>Sobre eRepPONBar</p></div>' +
                    '</div>' +
                    '<div id="eRepPONBarContent"></div>' +
                    '<div id="eRepPONBarLoadingMask"><img src="http://www.erepublik.com/images/parts/ajax-loader.gif" style="position: relative; top:-130px; left: 470px;"></div>' +
                '</div>';
   
    $("#menu").before(bar);

    $("#eRepPONBar").click(function(){ $("#eRepPONBarMainContainer:visible").slideUp("fast"); });
    $("#eRepPONBar").click(function(){ $("#eRepPONBarMainContainer:hidden").slideDown("slow"); });
   
//    $("#buttonWellness").click(function(){ eRepPONBarWellness();} );
    $("#buttonForo").click(function(){window.open('http://pon.mforos.com/');} );
    $("#buttonIRC").click(function(){window.open('http://qchat.rizon.net/?channels=pon');} );
    $("#buttonRadioPON").click(function(){window.open('http://serginius.webege.com/PON/RADIOALONE.html');} );
    $("#buttonShortCuts").click(function(){ eRepPONBarShortCuts();} );
    $("#buttonPONEmp").click(function(){ eRepPONBarOrgs();} );
//    $("#buttonCompanyManagement").click(function(){ eRepPONBarCompanyManagement();} );
//    $("#buttonPreferences").click(function(){ eRepPONBarPreferences();} );
    $("#buttonAbout").click(function(){ eRepPONBarAbout();} );
    //About eRepPONBar</option><option value="wellC">Wellness Calculator</option><option value="dmgC">Damage Calculator</option><option value="prodC">Productivity Calculator</option><option value="CM">Company Management</option>
   
    page = GM_getValue("eRepPONBarStartPage");
   
    switch(page){
        case "Calculadora de daÃ±o"        : eRepPONBarShortCuts(); break;
        case "Calculadora de Wellness"        : eRepPONBarOrgs(); break;
        case "Calculadora de Productividad"    : eRepPONBarProductivity(); break;
        case "Herramienta de gestiÃ³n de empresa"        : eRepPONBarPreferences(); break;
        case "Foro del PON"            : eRepPONBarAbout(); break;
        case "IRC del PON"            : eRepPONBarAbout(); break;
        case "Sobre eRepPONBar"            : eRepPONBarAbout(); break;
        default                         : eRepPONBarShortCuts();
    }
   
}

window.addEventListener('load', eRepPONBarConstruct, false);
