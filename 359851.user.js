// ==UserScript==
// @name           Zaytung tüketici
// @description    Zaytung son dakika haberlerini 4'er 4'er okuyun. Sanki bok varmış gibi hızlı tüketin.
// @namespace      
// @include        http://www.zaytung.com/sondakikadetay.asp*
// @include        http://zaytung.com/sondakikadetay.asp*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(".fb-recommendations-bar").hide();

$(".fbpluginrecommendationsbarleft").hide();



var haberCount = 4;

f();



function getLink(alar)
{
    for(var i = 0;i<alar.length;i++)
    {
        if(alar[i].text == "sonraki haber ->")
        {
            return alar[i].href;            
        }
    }
	
	return null;
}

function f()
{
	getNext($("#manset a"),haberCount);
}

function getNext(alar, count)
{

    if(count == haberCount)
    {
    
        var ilkHaber =  $("#manset div h2 a").text();
        var ilkBildiren = $("#manset div p font b").text();
        
        $("#manset").html("");
        
        
        putHaberPrv(ilkHaber, ilkBildiren);
    }
    
	if(count == 1)
	{
	
	   var nextAfter20;
	   for(var i = 0;i<alar.length;i++)
       {
            if(alar[i].text == "sonraki haber ->")
            {   nextAfter20 = alar[i].href;
                break;
            }
        }
        
        
        var sonrakiOnA = "<div style=\"float:right; margin-right:10px;\"><a style=\"color:black;\" href=\""+nextAfter20+"\">sonraki "+haberCount+" haber -&gt;</a></div>"
             $("#manset").html($("#manset").html() +sonrakiOnA);
		return; 		
	}

	var nextPage = getLink(alar);

	GM_xmlhttpRequest({
	  method: "GET",
	  url: nextPage,
	  headers: {
		"User-Agent": "Mozilla/5.0",    
		"Accept": "text/xml"      
	  },
	  onload: function(response) {		
	  
	    putHaber(response.responseText);
        var newAlar = $(response.responseText).find("#manset a");
        getNext(newAlar,count-1);
	  }
	});  
}

function putHaberPrv(mansetHaber, bildiren)
{
    var haberDiv = "<div style=\"text-align:left; padding-right:0px; padding-left:40px\">"    
         +"<h2>"
         +"<a style=\"color:black;\" href=\"sondakikadetay.asp?newsid=237439\">"
         + mansetHaber
         +"</a>"
     +"</h2>"
     "</div>";
    
    
    var  bildirenDiv = "<p align=\"left\"><font size=\"-1\"></font></p><p align=\"right\"><font size=\"-1\"><b>"+bildiren+"</b></font></p>";
    
     var toPut = "<div>" + haberDiv + bildirenDiv + "</div><br/>";
     //alert(toPut);
     $("#manset").html($("#manset").html() +toPut);

}



function putHaber(responseText)
{
    putHaberPrv($(responseText).find("#manset div h2 a").text(),$(responseText).find("#manset div p font b").text());
}



