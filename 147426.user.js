// ==UserScript==
// @name       Add baidu video link by hrs
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Add baidu video link by hrs
// @match      http://cq01-2011q4-setest2-20.vm.baidu.com:8200/*
// @copyright  2012+, You
// ==/UserScript==

y = document.getElementsByTagName('li');
//alert(y.length)

if( y.length>8)
{
    //7,11,15,19,23,27,31,35
    var array=[7,11,15,19,23,27,31,35,39,43,47,51,55,59,63,67,71,75,79,83,87,91,95,99];
    

    
    
    hrs="http://cq01-2011q4-setest2-20.vm.baidu.com:8200/s?wd=";
    for( var i = 0; i < array.length;i++)
    {
            flag=0;
    if( y[array[i]].innerText.substring(0,2) == "都是")
        flag = 1;
        if( flag == 1 )
        {
            link=hrs+y[array[i]].innerText.substring(2,y[array[i]].innerText.length-2);
                y[array[i]].innerHTML = "<a href="+link+" >"+y[array[i]].innerText.substring(0,y[array[i]].innerText.length-2);
                
            }else
            {
                len= y[array[i]].innerText.length;
//                alert(y[array[i]].innerText.substring(len-3,len));
                if(y[array[i]].innerText.substring(len-5,len-2) == "喜欢它")
                    {
             link=hrs+"喜欢"+y[array[i]].innerText.substring(0,y[array[i]].innerText.length-2);                        
                       y[array[i]].innerHTML = "<a href="+link+" >"+y[array[i]].innerText.substring(0,y[array[i]].innerText.length-2);

                    }
                else
                    {
                        link=hrs+"类似"+y[array[i]].innerText.substring(0,y[array[i]].innerText.length-2);
                y[array[i]].innerHTML = "<a href="+link+" >类似"+y[array[i]].innerText.substring(0,y[array[i]].innerText.length-2);
                }
            }
    }
    ;
}




var x = document.getElementsByTagName('div');
item = document.title;
item = item.substring(5,item.lenght);

for( var i = 0; i < x.length; i++)
{
    //      alert(x[i].innerHTML);
    if( x[i].innerText == "百度视频整合多家优质资源")
    {
        newquery="类似"+item+"的电影";
        hrs="http://cq01-2011q4-setest2-20.vm.baidu.com:8200/s?wd=";
        hrs=hrs+newquery;
        
        x[i].innerHTML = "<a href="+hrs+" >类似"+item+"的电影";
        break;
    }
}