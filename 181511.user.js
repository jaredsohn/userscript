// ==UserScript==
// @name        fqjy_dh
// @namespace   zdtb
// @include     ----------
// @version     1
// @grant       none
// ==/UserScript==
test();



//window.addEventListener('load', function(){test() } , true);

function test() 
{
    //alert("hollow");
   window.setTimeout(function(){getlink("http://www.fqjyy.com/");}, 2 * 1000);
   //window.setTimeout(function(){getlink("register.php");}, 10 * 1000);
   //getlink("http://www.fqjyy.com/");    

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

