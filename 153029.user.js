// ==UserScript==
// @name       eRepublik market data collector (for redist)
// @version    0.1
// @include    http://www.erepublik.com/collect
// @require        http://code.jquery.com/jquery-1.8.2.js
// @copyright  2011+, You
// ==/UserScript==
var formURL = "https://docs.google.com/spreadsheet/viewform?formkey=dEJBYVZ5T2ZWaWVSMlU4LThmNFpxd3c6MQ#gid=0";
var formURL_1 = formURL.substring(formURL.lastIndexOf("formkey=")+8, formURL.lastIndexOf("#"));
var formURL_2 = formURL.substring(0, formURL.lastIndexOf("?"));
var url_raw_weapon = "http://www.erepublik.com/en/economy/market/24/12/1/citizen/0/price_asc/1";
var url_raw_weapon_10page = "http://www.erepublik.com/en/economy/market/24/12/1/citizen/0/price_asc/10";
var url_raw_weapon_20page = "http://www.erepublik.com/en/economy/market/24/12/1/citizen/0/price_asc/20";
var url_prod_weapon_q7 = "http://www.erepublik.com/en/economy/market/24/2/7/citizen/0/price_asc/1";
var url_prod_weapon_q7_2page = "http://www.erepublik.com/en/economy/market/24/2/7/citizen/0/price_asc/2";
var url_raw_food = "http://www.erepublik.com/en/economy/market/24/7/1/citizen/0/price_asc/1";
var url_raw_food_10page = "http://www.erepublik.com/en/economy/market/24/7/1/citizen/0/price_asc/10";
var url_raw_food_20page = "http://www.erepublik.com/en/economy/market/24/7/1/citizen/0/price_asc/20";
var url_prod_food_q5 = "http://www.erepublik.com/en/economy/market/24/1/5/citizen/0/price_asc/1";
var url_prod_food_q7 = "http://www.erepublik.com/en/economy/market/24/1/7/citizen/0/price_asc/1";
var url_money_market = "http://www.erepublik.com/en/economy/exchange-market";
var urllist = [url_raw_weapon,url_raw_weapon_10page,url_raw_weapon_20page,url_prod_weapon_q7,url_prod_weapon_q7_2page,
                 url_raw_food,url_raw_food_10page,url_raw_food_20page,url_prod_food_q5,url_prod_food_q7,url_money_market];
var profile_id;
var profile_name;
var val_raw_weapon;
var val_raw_weapon_10page;
var val_raw_weapon_20page;
var val_prod_weapon_q7;
var val_prod_weapon_q7_2page;
var val_raw_food;
var val_raw_food_10page;
var val_raw_food_20page;
var val_prod_food_q5;
var val_prod_food_q7;
var val_money_market;
var val_money_market_maxamount;
var RegNumber = /[^0-9.]+/;
var i=0;
var time = 2000;
function requestErepData(urlval) {
    var rurl = urlval+"?dummy=" + new Date().toJSON();
    var rt;
    GM_xmlhttpRequest({
        method: "GET",
        url: rurl,
        onload: function(response) {
            rt = response.responseText;
            processingText(urlval,rt);
        }
    });
}
function processingText(urlval, rt) {
    var tempdiv=document.createElement('div');
    tempdiv.innerHTML = rt;
    
    if(urlval == url_raw_weapon) {
        profile_id = 'http://www.erepublik.com/en/citizen/profile/'+ $(rt).find(".user_info > a").attr("href").replace(RegNumber,"");
        profile_name = $(rt).find(".user_info > a").text();
        val_raw_weapon = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_raw_weapon_10page) {
        val_raw_weapon_10page = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_raw_weapon_20page) {
        val_raw_weapon_20page = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_prod_weapon_q7) {
        val_prod_weapon_q7 = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_prod_weapon_q7_2page) {
        val_prod_weapon_q7_2page = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_raw_food) {
        val_raw_food = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_raw_food_10page) {
        val_raw_food_10page = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_raw_food_20page) {
        val_raw_food_20page = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_prod_food_q5) {
        val_prod_food_q5 = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_prod_food_q7) {
        val_prod_food_q7 = $(rt).find(".price_sorted > tr:eq(0) > td:eq(3)").text().trim().replace(RegNumber,"");
    } else if(urlval == url_money_market) {
        val_money_market = $(rt).find(".exchange_offers > tbody > tr:eq(0) > td:eq(2) > strong:eq(1) > span").text().trim().replace(RegNumber,"");
        var temp = $(rt).find(".exchange_offers > tbody > tr");
        var maxvalue = 0;
        for(j=0;j<temp.length;j++){
            tempval = parseFloat(temp[j].children[1].innerText)
                console.debug(tempval);
            if(maxvalue < tempval) {
                maxvalue = tempval;
            }
        }
        console.debug("max:"+maxvalue);
        val_money_market_maxamount = maxvalue;
    }
    window.setTimeout(requestData, time); // 2초후 다음 데이터 리퀘스트
}
function requestData() {
    console.debug("call i="+i+" requestData()");
    if(i==urllist.length) {
        /*
        console.debug(profile_id);
        console.debug(profile_name);
        console.debug(val_raw_weapon);
        console.debug(val_raw_weapon_10page);
        console.debug(val_raw_weapon_20page);
        console.debug(val_prod_weapon_q7);
        console.debug(val_prod_weapon_q7_2page);
        console.debug(val_raw_food);
        console.debug(val_raw_food_10page);
        console.debug(val_raw_food_20page);
        console.debug(val_prod_food_q5);
        console.debug(val_prod_food_q7);
        console.debug(val_money_market);
        console.debug(val_money_market_maxamount);
        */
        window.setTimeout(reportInfo(), 5000); // 5초후 리포트
        //window.setTimeout(testReport, 3000); 
        i=0;
        window.setTimeout(requestData, 1000*60*20);  //20분후 다시 시작
        return;
    }
    requestErepData(urllist[i]);
    i++;
}
function applystyle(obj)
{
    obj.style.position = "absolute";
    obj.style.top = "-9999px";
    obj.style.left = "-9999px";
}
function reportInfo()
{
    
    var rand = Math.random();
    
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "https://spreadsheets.google.com/formResponse?hl=bg&formkey=" + formURL_1 + "&ifq";
    form.name = "form";
    form.id = "tehform_" + rand;
    form.target = "_blank";
    var f_profile = document.createElement("input");
    f_profile.type = "text";
    f_profile.name = "entry.9.single";
    applystyle(f_profile);
    var f_profile_name = document.createElement("input");
    f_profile_name.type = "text";
    f_profile_name.name = "entry.28.single";
    applystyle(f_profile_name);
    var f_confirm = document.createElement("input");
    f_confirm.type = "text";
    f_confirm.name = "entry.26.single";
    applystyle(f_confirm);
        
    var f_raw_weapon = document.createElement("input");
    f_raw_weapon.type = "text";
    f_raw_weapon.name = "entry.0.single";
    applystyle(f_raw_weapon);
    
    var f_raw_weapon_10page = document.createElement("input");
    f_raw_weapon_10page.type = "text";
    f_raw_weapon_10page.name = "entry.2.single";
    applystyle(f_raw_weapon_10page);
    
    var f_raw_weapon_20page = document.createElement("input");
    f_raw_weapon_20page.type = "text";
    f_raw_weapon_20page.name = "entry.3.single";
    applystyle(f_raw_weapon_20page);
    
    var f_prod_weapon_q7 = document.createElement("input");
    f_prod_weapon_q7.type = "text";
    f_prod_weapon_q7.name = "entry.6.single";
    applystyle(f_prod_weapon_q7);	
    
    var f_prod_weapon_q7_2page = document.createElement("input");
    f_prod_weapon_q7_2page.type = "text";
    f_prod_weapon_q7_2page.name = "entry.7.single";
    applystyle(f_prod_weapon_q7_2page);
    var f_raw_food = document.createElement("input");
    f_raw_food.type = "text";
    f_raw_food.name = "entry.17.single";
    applystyle(f_raw_food);
    var f_raw_food_10page = document.createElement("input");
    f_raw_food_10page.type = "text";
    f_raw_food_10page.name = "entry.19.single";
    applystyle(f_raw_food_10page);
    var f_raw_food_20page = document.createElement("input");
    f_raw_food_20page.type = "text";
    f_raw_food_20page.name = "entry.20.single";
    applystyle(f_raw_food_20page);
    var f_prod_food_q5 = document.createElement("input");
    f_prod_food_q5.type = "text";
    f_prod_food_q5.name = "entry.21.single";
    applystyle(f_prod_food_q5);
    var f_prod_food_q7 = document.createElement("input");
    f_prod_food_q7.type = "text";
    f_prod_food_q7.name = "entry.22.single";
    applystyle(f_prod_food_q7);
    var f_money_market = document.createElement("input");
    f_money_market.type = "text";
    f_money_market.name = "entry.4.single";
    applystyle(f_money_market);
    var f_money_market_maxamount = document.createElement("input");
    f_money_market_maxamount.type = "text";
    f_money_market_maxamount.name = "entry.5.single";
    applystyle(f_money_market_maxamount);
    var f_comment = document.createElement("input");
    f_comment.type = "text";
    f_comment.name = "entry.15.single";
    applystyle(f_comment);
    var f_pagenum = document.createElement("input");
    f_pagenum.type = "hidden";
    f_pagenum.value = "0";
    f_pagenum.name = "pageNumber";
    
    var f_backup = document.createElement("input");
    f_backup.type = "hidden";
    f_backup.value = "";
    f_backup.name = "backupCache";
    var f_submit = document.createElement("input");
    f_submit.type = "submit";
    f_submit.value = "submit";
    f_submit.name = "submit";
    applystyle(f_submit);
    form.appendChild(f_profile);
    form.appendChild(f_profile_name);
    form.appendChild(f_confirm);		
    form.appendChild(f_raw_weapon);
    form.appendChild(f_raw_weapon_10page);
    form.appendChild(f_raw_weapon_20page);		
    form.appendChild(f_prod_weapon_q7);		
    form.appendChild(f_prod_weapon_q7_2page);		
    form.appendChild(f_raw_food);		
    form.appendChild(f_raw_food_10page);		
    form.appendChild(f_raw_food_20page);		
    form.appendChild(f_prod_food_q5);		
    form.appendChild(f_prod_food_q7);		
    form.appendChild(f_money_market);		
    form.appendChild(f_money_market_maxamount);		
    form.appendChild(f_comment);		
    form.appendChild(f_pagenum);		
    form.appendChild(f_backup);		
    form.appendChild(f_submit);
    document.body.appendChild(form);
    f_profile.value = profile_id;
    f_profile_name.value = profile_name;
    f_confirm.value = encodeURIComponent("네. 숙지하였습니다.");
    f_raw_weapon.value = val_raw_weapon;
    f_raw_weapon_10page.value = val_raw_weapon_10page;
    f_raw_weapon_20page.value = val_raw_weapon_20page;
    f_prod_weapon_q7.value = val_prod_weapon_q7;
    f_prod_weapon_q7_2page.value = val_prod_weapon_q7_2page;
    f_raw_food.value = val_raw_food;
    f_raw_food_10page.value = val_raw_food_10page;
    f_raw_food_20page.value = val_raw_food_20page;
    f_prod_food_q5.value = val_prod_food_q5;
    f_prod_food_q7.value = val_prod_food_q7;
    f_money_market.value = val_money_market;
    f_money_market_maxamount.value = val_money_market_maxamount;
    f_comment.value = "script";
    //f_submit.click();
    var fieldcount = form.elements.length;
    var params = "";
    for (i=0; i<fieldcount; i++) {
        params = params + form.elements[i].name + "=" + form.elements[i].value + "&";
    }
    //console.debug(params);
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://spreadsheets.google.com/formResponse?hl=bg&formkey=" + formURL_1 + "&ifq",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: params,
        onload: function(response) {
            document.getElementById('container').innerHTML = "Report.. "+ new Date()+"<br/>" + document.getElementById('container').innerHTML;
        }
    });    
}
function testReport(){
    //console.debug("call i="+i+" testReport()");
    document.getElementById('container').innerHTML = "Report.. "+ new Date()+"<br/>" + document.getElementById('container').innerHTML;
}
document.body.id = 'test';
document.getElementById('container').innerHTML = '' ;
requestData();