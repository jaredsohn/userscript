// ==UserScript==
// @name           FlipkartToSmartPrice
// @namespace      http://userscripts.org/scripts/show/118429
// @description    Check out prices of books at mysmartprice directly in flipkart
// @include        http://*.flipkart.com/books/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// ==/UserScript==


var url = document.location.href;
var temp = url.split("/", 5);
var isbn = temp[4].split("?",1);
var vendors = new Array("infibeam.php", "bookadda.php", "flipgraph.php", "landmark.php", "homeshop18.php", "crossword.php", "uread.php");
var tablecontent="";
var count = 7;
var mspURL="http://www.mysmartprice.com/dynamicprice/";


var hiddenDiv=document.createElement('div');
hiddenDiv.setAttribute ('id', 'hiddendiv');
hiddenDiv.setAttribute('style','visibility:hidden');
document.body.appendChild (hiddenDiv);

for(i=0;i<vendors.length;i++)
{

$.get(mspURL+vendors[i],{"isbn":isbn},function(data){

    var testdiv = document.getElementById('hiddendiv');
    var temp = data.split('zz');
    testdiv.innerHTML = temp+"<br> <br>";
    tablecontent=tablecontent+testdiv.getElementsByTagName('table')[0].innerHTML;



});

}




var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">MySmartPrice</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);


document.getElementById ("myButton").addEventListener ("click", ButtonClickAction, false);

function ButtonClickAction (zEvent)
{
    
    var zNode       = document.createElement ('p');
    zNode.innerHTML = tablecontent;
    document.getElementById ("myContainer").appendChild (zNode);
    
   
    
    
}

//--- Style our newly added elements using CSS.
GM_addStyle ( (<><![CDATA[
    #myContainer {
         position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
]]></>).toString () );





