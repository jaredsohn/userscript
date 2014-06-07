// ==UserScript==
// @name        Market
// @namespace   nimesin.com
// @description market help
// @include     http://www.erepublik.com/*/economy/market/*
// @version     0.53
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function() {
	getMarkets();
	//createReportButtons();
    
}, false);

function getMarkets()
{
	var locAll=window.location;
	addForm("", {"data":locAll}, "loc1", "nimLoc1");
	var loc1=jQuery("#nimLoc1_data").val().split("/");
	var locLen=loc1.length;
	var loc=loc1[locLen-1];
	var locale=loc1[3];
	if(locLen==7 || loc1[7]=='0')
	{
		//alert(locLen+" in "+loc);
		//alert("locale "+locale);
		var iron="http://www.erepublik.com/"+locale+"/economy/market/"+loc+"/12/1/citizen/0/price_asc/1";//jQuery("#filters_expanded .product_selector ul #12").html();
		var grain="http://www.erepublik.com/"+locale+"/economy/market/"+loc+"/7/1/citizen/0/price_asc/1";//jQuery("#filters_expanded .product_selector ul #12").html();
		var wepQ7="http://www.erepublik.com/"+locale+"/economy/market/"+loc+"/2/7/citizen/0/price_asc/1";//jQuery("#filters_expanded .product_selector ul #12").html();
//		alert(iron);
		var marketHead='<div class="clear"></div><table width="100%" border="0"><tbody>';
		var marketFoot='</tr></tbody></table>';
		jQuery.get(iron, function(data) {
			try{
				//var ironCont='<div class="clear"></div><table width="100%" border="0'+jQuery("#marketplace table",data).html()+'</table>';
				var ironTr=jQuery("#marketplace table tbody tr",data);
				var ironCont="<tr><td>"+jQuery("td",ironTr).html()+"</td>"+"<td>"+jQuery(".m_provider",ironTr).html()+"</td>"+"<td>"+jQuery(".m_stock",ironTr).html()+"</td>"+"<td>"+jQuery(".m_price",ironTr).html()+"</td>"+"</tr>";
				//var marketCont=marketHead+ironCont+marketFoot;
				//alert(ironCont);
				jQuery.get(grain, function(dataGrain) {
					try{
						var grainTr=jQuery("#marketplace table tbody tr",dataGrain);
						var grainCont="<tr><td>"+jQuery("td",grainTr).html()+"</td>"+"<td>"+jQuery(".m_provider",grainTr).html()+"</td>"+"<td>"+jQuery(".m_stock",grainTr).html()+"</td>"+"<td>"+jQuery(".m_price",grainTr).html()+"</td>"+"</tr>";
						//alert(jQuery("#marketplace table tbody tr",dataGrain).html());
						//var marketCont=marketHead+ironCont+grainCont+marketFoot;
						//jQuery("#content").append(marketCont);
						jQuery.get(wepQ7, function(dataWep7) {
							try{
								var wepTr=jQuery("#marketplace table tbody tr",dataWep7);
								var wepCont="<tr><td>"+jQuery("td",wepTr).html()+"</td>"+"<td>"+jQuery(".m_provider",wepTr).html()+"</td>"+"<td>"+jQuery(".m_stock",wepTr).html()+"</td>"+"<td>"+jQuery(".m_price",wepTr).html()+"</td>"+"</tr>";
								//alert(jQuery("#marketplace table tbody tr",dataGrain).html());
								var marketCont=marketHead+ironCont+grainCont+wepCont+marketFoot;
								jQuery("#content").append(marketCont);

						}catch(err){alert("grain: " + err.message);}
					});

				}catch(err){alert("grain: " + err.message);}
			});
			}catch(err){alert("iron: " + err.message);}
		});

	}
}

 
function addForm(path, params, target, formName) {
	try{
    method = "post"; // Set method to post by default, if not specified.
    target = target || ""; // Set target.
    var form = jQuery(document.createElement( "form" ))
        .attr( {"name": formName, "id": formName, "method": method, "action": path, "target": target} );
    jQuery.each( params, function(key,value){
        jQuery.each( value instanceof Array? value : [value], function(i,val){
            jQuery(document.createElement("input"))
                .attr({ "type": "text", "name": key, "id": formName+"_"+key, "value": val })
                .appendTo( form );
        }); 
    } ); 
    form.appendTo( document.body ); 
	}catch(err){alert("addForm: " + err.message+" "+formName);}

}
