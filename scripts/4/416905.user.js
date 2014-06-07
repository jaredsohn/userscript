// ==UserScript==
// @name           Subeta - Autoprice (No GA)
// @namespace      Subeta Bots
// @version        1.1
// @include        http://subeta.net/myshop.php?shopid=*
// @include        http://subeta.net/myshop.php?&shopid=*&page=*
// ==/UserScript==

var asyncLoop = function(o){
    var i=-1, length = o.length;
    var loop = function(){
        i++;
        if(i==length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }; loop();
};

function createInstance()
{ 
    if (window.XMLHttpRequest) 
    {
        req = new XMLHttpRequest();
    } 
    else 
        alert("XHR not created");
    return(req);
};

var arrForms = document.getElementsByTagName('form');
var thisForm;
for (var i = 0; i < arrForms.length; i++)
{
    if (arrForms[i].action.indexOf('myshop.php') > -1 && arrForms[i].method == 'post')
    {
        thisForm = arrForms[i];
    }
}

if (thisForm.getElementsByTagName('tr').length > 4)
{
    var arrItemsTR = new Array();
    for (var i = 1; i < thisForm.getElementsByTagName('tr').length - 3; i++)
    {
        arrItemsTR.push(thisForm.getElementsByTagName('tr')[i]);
    }
    
    var arrItemName = new Array();
    var arrItemPriceInput = new Array();
    
    for (var i = 0; i < arrItemsTR.length; i++)
    {
        var arrTD = arrItemsTR[i].getElementsByTagName('td');
        for (var j = 0; j < arrTD.length; j++)
        {
            if (arrTD[j].width == '30%')
                arrItemName.push(arrTD[j].getElementsByTagName('center')[0].innerHTML);
        }
        
        var arrInput = arrItemsTR[i].getElementsByTagName('input');
        for (var j = 0; j < arrInput.length; j++)
        {
            if (arrInput[j].name.indexOf('price[') > -1 && arrInput[j].type == 'text')
                arrItemPriceInput.push(arrInput[j]);
        }
    }
    
    asyncLoop({ length: arrItemName.length, functionToLoop: function(loop, i){ setTimeout(function(){
    try {
        var ushopName, ushopURL, ushopPrice, itemid, cv, vercode, itemName;
        
        itemName = arrItemName[i]
        itemName = itemName.trim();
        
        var req = createInstance();
        req.onreadystatechange = function()
            {
                if(req.readyState == 4)
                {
                    if(req.status == 200)
                    {
                        var htmlsrc = req.responseText.substring(req.responseText.indexOf('<b>Shop Name</b>'));
                        
                        ushopURL = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 8);
                        ushopURL = ushopURL.substring(0, ushopURL.indexOf('>'));
                        ushopName = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 9 + ushopURL.length);
                        ushopName = ushopName.substring(0, ushopName.indexOf('</a></td>'));
                        ushopPrice = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 25);
                        ushopPrice = ushopPrice.substring(ushopPrice.indexOf('<td>') + 5);
                        ushopPrice = ushopPrice.substring(0, ushopPrice.indexOf('</td>'));
                        
                        var ushopPriceNum = '';
                        for (var j = 0; j < ushopPrice.length; j++)
                        {
                            if (ushopPrice.charAt(j) == '0' || ushopPrice.charAt(j) == '1' || ushopPrice.charAt(j) == '2' || ushopPrice.charAt(j) == '3' || ushopPrice.charAt(j) == '4' || ushopPrice.charAt(j) == '5' || ushopPrice.charAt(j) == '6' || ushopPrice.charAt(j) == '7' || ushopPrice.charAt(j) == '8' || ushopPrice.charAt(j) == '9')
                            {
                                ushopPriceNum = ushopPriceNum.concat(ushopPrice.charAt(j));
                            }
                        }
                        
                        if (parseInt(ushopPriceNum) > 0 && parseInt(ushopPriceNum) < 1000)
                        {
                            arrItemPriceInput[i].value = '0';
                            arrItemPriceInput[i].style.backgroundColor = '#FAFAFA';
                        }
                        else
                        {
                            if (parseInt(ushopPriceNum) > 1)
                        		arrItemPriceInput[i].value = parseInt(ushopPriceNum) - 1;
                            else
                                arrItemPriceInput[i].value = '1';
                            arrItemPriceInput[i].style.backgroundColor = '#A6FFD2';
                        }
                    }
                }
            };
        req.open("GET", "http://subeta.net/ushop.php?act=dosearch&itemname=" + escape(itemName) + "&type=shops", true); 
        req.send(null); 
    } catch(e) { }       
    loop(); },1); }, callback: function(){ /* Done */ }});
}