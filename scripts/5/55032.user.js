// ==UserScript==
// @name           foodMarketHelper
// @include        http://www.erepublik.com/es/market/*
// @include        http://www.erepublik.com/en/market/*
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

//lulz

var wellness = $("#wellnessvalue").text().trim();

GM_log("we:"+wellness);

var quality = 0;

try{
 var url = document.location.href;

 //url
 //...market/country-15-industry-1-quality-2-citizen_account-10123205
 var parts = url.split("-quality-");

 //parts[1]
 //2-citizen_account-10123205
 var parts2 = parts[1].split("-citizen_");

 //parts2[0]
 //2
 quality = parseInt(parts2[0]);
} catch(e){
  //return?
};


//Hack Hack Hack
var quantityandprice = $(".special");
var centsprice = $("sup");

var qp = quantityandprice ;
var cents = centsprice;

var wedx = 0;//wellness increase

var wu = 0;//wellness added by monetary unit

var icent = 2;

var orgstock=0;//origin stock

for (var i=2; i < (qp.length*3 -1); i+=2) {
    var units = qp[i+1].innerHTML;
    var cent  = cents[icent++].innerHTML;

    var txt = units +""+cent;
    var price =  parseFloat(txt);

   //wellness increase = (1.5 - (current wellness/100)) * wellness bonus points
         
    wedx = ( 1.5 - ( wellness /100)) * quality ;

    wedx = parseInt(wedx *100)/100;//only 2 decimals;

    wu = wedx/price;
    wu = parseInt(wu*100)/100;
 
    
    orgstock = parseInt(qp[i].innerHTML);

    qp[i].innerHTML = "<nobr><font color='#43b7ed' style='margin-right: 14px'>+" +
            wedx+" / "+
//            wu+"<small>W/u</small></font></nobr><br>" + qp.length+ "i:"+i+"c:"+cent;
            wu+"<small><small>W/u</small></small></font></nobr><br />"+orgstock+ " unid";
}


