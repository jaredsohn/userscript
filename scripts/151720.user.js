// ==UserScript==
// @name        Faturamento
// @namespace   faturamento
// @include     http://aes.mbiz10.net/PORTAL/*
// @version     1.1
// ==/UserScript==
(function() {
    
    
var nobrs = document.getElementsByTagName("NOBR");
var a = document.getElementsByTagName("a");
var td = document.getElementsByTagName("td");
    
    
    
    
    
    
    
    
    
function remanejar()
    {
    
for(var i=0;i<nobrs.length;i++)
{
//alert(nobrs[i].innerHTML);
    
    
    
if(nobrs[i].innerHTML.substring(0, 1) == "B")
{
    
    
    var datad = document.getElementById('xctl1xThreePanesxThreePanesxxctl1xwdc_input').value;
    var faturamento = nobrs[i].innerHTML.substring(4, 6)
       if(datad == "5/11/2012" && faturamento == "01" || datad == "5/11/2012" && faturamento == "02"  || datad == "5/11/2012" && faturamento == "03" || datad == "5/11/2012" && faturamento == "04"
        || datad == "6/11/2012" && faturamento == "01" || datad == "6/11/2012" && faturamento == "02"  || datad == "6/11/2012" && faturamento == "03" || datad == "6/11/2012" && faturamento == "04" || datad == "6/11/2012" && faturamento == "05"
        || datad == "7/11/2012" && faturamento == "02" || datad == "7/11/2012" && faturamento == "03"  || datad == "7/11/2012" && faturamento == "04" || datad == "7/11/2012" && faturamento == "05" || datad == "7/11/2012" && faturamento == "06"  || datad == "7/11/2012" && faturamento == "07"
        || datad == "8/11/2012" && faturamento == "03" || datad == "8/11/2012" && faturamento == "04"  || datad == "8/11/2012" && faturamento == "05" || datad == "8/11/2012" && faturamento == "06" || datad == "8/11/2012" && faturamento == "07"  || datad == "8/11/2012" && faturamento == "08"
        || datad == "9/11/2012" && faturamento == "04" || datad == "9/11/2012" && faturamento == "05" || datad == "9/11/2012" && faturamento == "06" || datad == "9/11/2012" && faturamento == "07" || datad == "9/11/2012" && faturamento == "08" || datad == "9/11/2012" && faturamento == "09"
        || datad == "10/11/2012" && faturamento == "05" || datad == "10/11/2012" && faturamento == "06" || datad == "10/11/2012" && faturamento == "07" || datad == "10/11/2012" && faturamento == "08" || datad == "10/11/2012" && faturamento == "09"
        || datad == "11/11/2012" && faturamento == "05" || datad == "11/11/2012" && faturamento == "06" || datad == "11/11/2012" && faturamento == "07" || datad == "11/11/2012" && faturamento == "08" || datad == "11/11/2012" && faturamento == "09"
        || datad == "12/11/2012" && faturamento == "05" || datad == "12/11/2012" && faturamento == "06" || datad == "12/11/2012" && faturamento == "07" || datad == "12/11/2012" && faturamento == "08" || datad == "12/11/2012" && faturamento == "09" || datad == "12/11/2012" && faturamento == "10"
        || datad == "13/11/2012" && faturamento == "06" || datad == "13/11/2012" && faturamento == "07" || datad == "13/11/2012" && faturamento == "08" || datad == "13/11/2012" && faturamento == "09"
        || datad == "14/11/2012" && faturamento == "08" || datad == "14/11/2012" && faturamento == "09" || datad == "14/11/2012" && faturamento == "10" || datad == "14/11/2012" && faturamento == "11" || datad == "14/11/2012" && faturamento == "12"
          )
       {
       nobrs[i-4].innerHTML = "<FONT COLOR =RED><CENTER><B>X</B></CENTER></FONT>"
       }
    
}
    
    
}
    }//fechou tudo
    
    
function despachar()
    {
    
for(var i=0;i<nobrs.length;i++)
{
//alert(nobrs[i].innerHTML);
    
    
    
if(nobrs[i].innerHTML.substring(0, 1) == "B")
{
    
    
    var datad = document.getElementById('xctl1xThreePanesxThreePanesxxctl1xwdc_input').value;
    var faturamento = nobrs[i].innerHTML.substring(4, 6)
        if(datad == "5/11/2012" && faturamento == "01" || datad == "5/11/2012" && faturamento == "02"  || datad == "5/11/2012" && faturamento == "03" || datad == "5/11/2012" && faturamento == "04"
        || datad == "6/11/2012" && faturamento == "01" || datad == "6/11/2012" && faturamento == "02"  || datad == "6/11/2012" && faturamento == "03" || datad == "6/11/2012" && faturamento == "04" || datad == "6/11/2012" && faturamento == "05"
        || datad == "7/11/2012" && faturamento == "02" || datad == "7/11/2012" && faturamento == "03"  || datad == "7/11/2012" && faturamento == "04" || datad == "7/11/2012" && faturamento == "05" || datad == "7/11/2012" && faturamento == "06"  || datad == "7/11/2012" && faturamento == "07"
        || datad == "8/11/2012" && faturamento == "03" || datad == "8/11/2012" && faturamento == "04"  || datad == "8/11/2012" && faturamento == "05" || datad == "8/11/2012" && faturamento == "06" || datad == "8/11/2012" && faturamento == "07"  || datad == "8/11/2012" && faturamento == "08"
        || datad == "9/11/2012" && faturamento == "04" || datad == "9/11/2012" && faturamento == "05" || datad == "9/11/2012" && faturamento == "06" || datad == "9/11/2012" && faturamento == "07" || datad == "9/11/2012" && faturamento == "08" || datad == "9/11/2012" && faturamento == "09"
        || datad == "10/11/2012" && faturamento == "05" || datad == "10/11/2012" && faturamento == "06" || datad == "10/11/2012" && faturamento == "07" || datad == "10/11/2012" && faturamento == "08" || datad == "10/11/2012" && faturamento == "09"
        || datad == "11/11/2012" && faturamento == "05" || datad == "11/11/2012" && faturamento == "06" || datad == "11/11/2012" && faturamento == "07" || datad == "11/11/2012" && faturamento == "08" || datad == "11/11/2012" && faturamento == "09"
        || datad == "12/11/2012" && faturamento == "05" || datad == "12/11/2012" && faturamento == "06" || datad == "12/11/2012" && faturamento == "07" || datad == "12/11/2012" && faturamento == "08" || datad == "12/11/2012" && faturamento == "09" || datad == "12/11/2012" && faturamento == "10"
        || datad == "13/11/2012" && faturamento == "06" || datad == "13/11/2012" && faturamento == "07" || datad == "13/11/2012" && faturamento == "08" || datad == "13/11/2012" && faturamento == "09"
        || datad == "14/11/2012" && faturamento == "08" || datad == "14/11/2012" && faturamento == "09" || datad == "14/11/2012" && faturamento == "10" || datad == "14/11/2012" && faturamento == "11" || datad == "14/11/2012" && faturamento == "12"
          )
       {
       nobrs[i-5].innerHTML = "<FONT COLOR =RED><CENTER><B>X</B></CENTER></FONT>"
       }
    
}
    
    
}
    }//fechou tudo
    
    
    
    
    
    for(var i=0;i<a.length;i++)
    {
        
        if(a[i].innerHTML == "Despachar OS(s) selecionada(s)")
        {
        despachar();
        }else if(a[i].innerHTML == "Remanejar OS(s) selecionada(s)")
        {
        remanejar();
        }
        
        
    }    
    
    
    
    
    
 
}());