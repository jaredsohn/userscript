// ==UserScript==
// @name        The Legends Rise
// @namespace   TLR
// @description Coded by Nabil
// @include     http://*ruinsofchaos.com/*
// @version     1
// ==/UserScript==


//window.location.href = 'www.eddieslife.com/koc.php';
//window.open('www.eddieslife.com/koc.php'); self.focus();


//===================================================================================================================
//Handles validation
//===================
var validated = "Thank you for using The Legends Rise, you are validated";
$("#userinfo").before("<table class=sep cellspacing=0 cellpadding=6 width=100%><tr><th><span style=font-size: 16pt;>" + validated + "</span></th></tr></table>");
//===================================================================================================================
//Handles banking percentage
//===========================
if (document.getElementById("gold_generated")){
    var goldGenerated = document.getElementById("gold_generated").innerHTML.replace(/,/g, "");
    var convgoldGenerated = parseInt(goldGenerated);
    var goldLost = document.getElementById("gold_lost_to_attacks").innerHTML.replace(/,/g, "");
    var convgoldLost = parseInt(goldLost);
    var goldSum = convgoldGenerated - convgoldLost;
    var bankedPercentage = ((goldSum/convgoldGenerated) * 100).toFixed(2);
    $("#totals").last().append("<tr class=odd><td>Banking Percentage </td><td> " + bankedPercentage + "% </td></tr>");
    
    //===================================================================================================================
    //Handles daily gold
    //===================
    var goldperDay = document.getElementById("base_tbg").innerHTML.replace(/,/g, "");
    var convgoldperDay = parseInt(goldperDay) * 48;
    var convgoldperdayCommas = convgoldperDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $("#userinfo").last().append("<tr class=even><td class=blr><b>Gold Per Day:</b></td><td class=brr>" + convgoldperdayCommas + "</td></tr>");
    //===================================================================================================================
}

//=========================================================================================================================
//Amory Prefill
//=========================================================================================================================
if(document.getElementById("weapontype1")){
    var buttonnode= document.createElement('input');
    buttonnode.setAttribute('type','button');
    buttonnode.setAttribute('name','sal');
    buttonnode.setAttribute('value','AutoPrefill');
    $("#yar").before(buttonnode);

}
//==========
//Functions
//==========
 $(buttonnode).click(function(){

    });


/*
[object Object]
*/