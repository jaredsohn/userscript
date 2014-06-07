// ==UserScript==
// @name       Checkout reform
// @namespace  http://use.i.E.your.homepage/
// @version    1
// @description  enter something useful
// @match      http://*/*-checkout.html*
// @copyright  2012+, You
// @require  https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// ==/UserScript==


//alert(document.getElementById("test5"));
//alert($("#test5"));

var  temp;


function insertStr(str1, str2, str3)  //地址中加入逗号。str1为要加入字符，str2为被加，str3为结果中的连接符
{ 
    var ary=str2.split(str3);
    if(ary[ary.length-2])
    {
        alert(333);
        temp=ary[ary.length-2].split(" ");
        temp=temp.pop();	
        alert(temp);
        
    }
    
    if (ary[2]&&isNaN(ary[2]))
    {
        ary[1] =  ary[1]+ str1;
        str2 = ary.join(str3);
    }
    return str2;
}



function re_input()   //替换英文逗号为中文逗号
{
    var new_arr,org_arr,txt,txtobj=document.getElementsByName('delivery[ship_info]');
    
    org_arr=txtobj[0].value;
    new_arr=org_arr.replace(/,/g,"，");
    txtobj[0].value=new_arr;
    txtobj[0].value=insertStr("，", txtobj[0].value, "，");     
    //地址中加入逗号。str1为要加入字符，str2为被加，str3为结果中的连接符
    
    //($('receiver').getElement('input[name^=delivery[ship_addr]').value = $('receiver').getElement('input[name^=delivery[ship_addr]').value + ship_region_addr[0];}}).delay(1000, this)
    
}


function mainnewrpl()
{
    
    re_input();    //替换英文逗号为中文逗号
    copy_ship_info();  //原本的自动填入函数
    $("input[name='delivery[ship_addr]']").val(temp)	
    
}


$(document).ready(function(){
    $("textarea#test5").attr("onchange","helloworld();"); //返回执行原onchange程序mainnewrpl();
    document.getElementById("test5").onchange=function(){mainnewrpl();};
});

//原程序

