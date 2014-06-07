// ==UserScript==
// @name        fqjy_reg
// @namespace   zdtb
// @include     ---
// @version     1
// @grant       none
// ==/UserScript==
test();



//window.addEventListener('load', function(){test() } , true);

function test() 
{
    //alert("hollow");
   window.setTimeout(function(){getlink("http://www.fqjyy.com/register.php");}, 2* 1000);
   window.setTimeout(function(){getlink("http://www.fqjyy.com/ons/register.php");}, 2 * 1000);
   //getlink("http://www.fqjyy.com/register.php");    
  //getlink("http://www.fqjyy.com/ons/register.php"); 
} 

function getlink(url)
{
    //alert(url);
    var arr = document.links;
    for(var i=0; i< arr.length; i++) 
    { 
        
        //var href = arr[i].getAttribute("href"); 
       if(arr[i].href==url)
       {           
           
           //var href = arr[i].getAttribute("href"); 
            //alert(href);
           arr[i].target = "_self";
           //alert(arr[i].target);
           arr[i].click();
           break;
       }
        //window.setTimeout(function(){alert('欢迎您来到本站！');}, 10 * 1000);
        //window.setTimeout(function(){ys();}, 10 * 1000);
        //window.open("http://www.fqjyy.com/register.php");
        //if(arr[i].href="register.php")alert(arr[i]);
        //if(arr[i].href="register.php")arr[i].click();
    }
}

