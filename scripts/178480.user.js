// ==UserScript==
// @name       IRCTC HDFC NetBanking Auto Payment
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  This script is for IRCTC Automatic Netbanking payment for HDFC
// @match      https://netbanking.hdfcbank.com/netbanking/*
// ==/UserScript==

var Busr = "XXXXXXXX";				//HDFC Netbanking User ID
var Bpas = "XXXXXXXXXX";			//HDFC NetBanking Password
var Acn	 = "XXXXXXXXXXXXXX  ";		//Account No With Appropriate Spaces


function hdfc()
{
    if(window.frames["bottom_frame"].document.getElementsByName('fldLoginUserId'))
    {
        var cid = window.frames["bottom_frame"].document.getElementsByName('fldLoginUserId');
        cid[0].value = Busr;
    }else
        if(window.frames["bottom_frame"].document.getElementsByName('fldPassword'))
        {
            var cpas = window.frames["bottom_frame"].document.getElementsByName('fldPassword');
            cpas[0].value = Bpas;
        }else
            if(window.frames["bottom_frame"].document.getElementsByName('fldLoginUserId').value != "" && window.frames["bottom_frame"].document.getElementsByName('fldPassword') != ""){
                window.frames["bottom_frame"].document.getElementsByTagName("img")[2].click();
                //clearInterval(fill);
            }else
            document.forms.frmTxn.selAcct.value=Acn;
    		document.getElementsByTagName("a")[1].click();
}
var fill = setInterval(hdfc, 500);