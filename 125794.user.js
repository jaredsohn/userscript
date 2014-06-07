// ==UserScript==
// @name          Finance Continuously update portolio values
// @description    keeps all porfolio values up to date in Google Finance
// @include        http://www.google.com/finance/portfolio?action=view*
// @include        http://www.google.tld/finance/portfolio?action=view*
// @include        https://www.google.tld/finance/portfolio?action=view*
// ==/UserScript==

//  Enable GM_set/getValue functionality for Chrome, while keeping compatability with Firefox

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
GM_deleteValue("USDJPY");  //clear this value out! 
GM_xmlhttpRequest({
  method: "GET",
  url: "http://finance.yahoo.com/q?s=USDJPY=X",
  onload: function(response) {
  start_location = response.responseText.indexOf("<span id=\"yfs_l10_usdjpy=x\">") + "<span id=\"yfs_l10_usdjpy=x\">".length;
  usdjpy = response.responseText.slice(start_location,start_location+10).replace(/[^\d\.]/gi,"");
  // console.log("setting this value" + usdjpy);
  GM_setValue("USDJPY",usdjpy); 
    //alert(response.responseText);
  }
});
var FinanceTable = document.getElementsByClassName('gf-table')[0];
if(typeof(FinanceTable) != "undefined" && typeof(FinanceTable.rows) != "undefined"){
    for(i=0;i<FinanceTable.rows.length;i++){
        if(typeof(FinanceTable.rows[i]) != "undefined" && typeof(FinanceTable.rows[i].cells[5]) != "undefined" && FinanceTable.rows[i].cells[5].textContent == "0.00 (closed)"){
           // FinanceTable.rows[i].style.display="none"
        }
    }
}



setInterval(function (){

var total_mk_value = parseFloat(0);
var total_day_gain = parseFloat(0);
var total_overall_gain = parseFloat(0);
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2; 
}
function update_mkt_value(rownum,position1, position2, positiontoupdate){
 FinanceTable.rows[rownum].cells[positiontoupdate].textContent = 
       addCommas(
	       (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent) * parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",",""))).toFixed(2));
		  //convert foreign currency!
		if(isNaN(FinanceTable.rows[rownum].cells[6].textContent.charAt(0))==false){
				total_mk_value += (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent) * parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",","")));
            }
		 else if(encodeURI(FinanceTable.rows[rownum].cells[6].textContent.charAt(0)) == "%C2%A5"){
				total_mk_value += (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent) * parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",","")))/currency_conversion;
		  
		  }
	}
function update_gain_amount(rownum,position1, position2, positiontoupdate){
        number_string = addCommas(
	       (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","").replace(decodeURI("%C2%A5"),"")) - parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",","").replace(decodeURI("%C2%A5"),""))
			).toFixed(2)); 			//get values, remove the commas so we can do math on them

		if(isNaN(FinanceTable.rows[rownum].cells[6].textContent.charAt(0))==false){
			if(number_string.charAt(0) != "-"){  //format into either a "+" or a "-" number
			    number_string = "+" + number_string;
			}
		     total_overall_gain += parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","")) - parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",",""));
			}
		else if(encodeURI(FinanceTable.rows[rownum].cells[6].textContent.charAt(0)) == "%C2%A5"){
		    if(number_string.charAt(0) != "-"){  //format into either a "+" or a "-" number
			    number_string = "+" + decodeURI("%C2%A5") + number_string;
			}
			else{
			  number_string = "-" + decodeURI("%C2%A5") + number_string.slice(1,number_string.length);
			}
			
			    total_overall_gain += (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","")) - parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",","").replace(decodeURI("%C2%A5"),"")))/currency_conversion; 
		}
           FinanceTable.rows[rownum].cells[positiontoupdate].firstChild.textContent = number_string;
      } 
	  //position 1 = shares
	  //postion 2 = change 
	  function update_day_gain_amount(rownum,position1, position2, positiontoupdate){
 number_string = addCommas(
	       (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","") * parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.split(" ")[0])
			).toFixed(2))); 			//get values, remove the commas so we can do math on them

			if(number_string.charAt(0) != "-"){  //format into either a "+" or a "-" number
			    number_string = "+" + number_string;
			}
					if(isNaN(FinanceTable.rows[rownum].cells[6].textContent.charAt(0))==false){
			     total_day_gain += (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","")) * parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.split(" ")[0]));
            }
			else if(encodeURI(FinanceTable.rows[rownum].cells[6].textContent.charAt(0)) == "%C2%A5"){
			     total_day_gain += (parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","")) * parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.split(" ")[0]))/currency_conversion;
               if(number_string.charAt(0) == "+"){
                   number_string = "+" + decodeURI("%C2%A5") + number_string.slice(1,number_string.length);
				}
				else if(number_string.charAt(0) == "-"){
				  number_string = "-" + decodeURI("%C2%A5") + number_string.slice(1,number_string.length)
				}
			}
           FinanceTable.rows[rownum].cells[positiontoupdate].firstChild.textContent = number_string;
      } 
	  
	    //position 1 = mktvalue
	  //postion 2 = cost basis 
	  function update_gain_percentage(rownum,position1, position2, positiontoupdate){
 number_string = addCommas(
	       (((parseFloat(FinanceTable.rows[rownum].cells[position1].textContent.replace(",","").replace(decodeURI("%C2%A5"),"")) / parseFloat(FinanceTable.rows[rownum].cells[position2].textContent.replace(",","").replace(decodeURI("%C2%A5"),""))-1.0)*100
			).toFixed(2))); 			//get values, remove the commas so we can do math on them
    
		if(number_string.charAt(0) != "-"){  //format into either a "+" or a "-" number
		    number_string = "+" + number_string;
		}
	
           FinanceTable.rows[rownum].cells[positiontoupdate].firstChild.textContent = number_string + "%";
      }

function update_totals(){
      total_cash = parseFloat(FinanceTable.rows[FinanceTable.rows.length - 4].cells[2].textContent.replace(",","").replace("$",""));
      if(isNaN(total_cash)){
	    total_cash = 0;
	  }
	  else{
	      total_mk_value +=parseFloat(FinanceTable.rows[FinanceTable.rows.length - 4].cells[2].textContent.replace(",","").replace("$",""));
	  }
	  total_cost_basis = parseFloat(FinanceTable.rows[FinanceTable.rows.length - 1].cells[4].textContent.replace(",","").replace("$",""));
day_gain_percent = (total_day_gain / total_mk_value * 100).toFixed(2);	  
total_day_gain = addCommas(total_day_gain.toFixed(2));

	  // console.log("total_day_gain is " + total_day_gain); 
	  FinanceTable.rows[FinanceTable.rows.length-1].cells[5].textContent = "$"+addCommas(total_mk_value.toFixed(2));

	  // console.log("total_overall_gain is " + total_overall_gain);
	  FinanceTable.rows[FinanceTable.rows.length-1].cells[6].firstChild.textContent = "$"+addCommas(total_overall_gain.toFixed(2));
	  portfolio_gain_percent = addCommas(((total_overall_gain / (total_mk_value - total_cash) ) * 100).toFixed(2));
	  			if(portfolio_gain_percent.charAt(0) != "-"){  //format into either a "+" or a "-" number
			    portfolio_gain_percent = "+" + portfolio_gain_percent;
			}
	  
	  FinanceTable.rows[FinanceTable.rows.length-1].cells[7].firstChild.textContent = portfolio_gain_percent + "%";
	   if(day_gain_percent.charAt(0) != "-"){
	       day_gain_percent = "+" + day_gain_percent;
	   }
	   day_gain_percent = "(" + day_gain_percent + "%)";
	   
	  FinanceTable.rows[FinanceTable.rows.length-1].cells[2].firstChild.textContent = total_day_gain;
	    FinanceTable.rows[FinanceTable.rows.length-1].cells[2].children[1].textContent = day_gain_percent;
	  
	  if(total_day_gain.charAt(0) == "-"){
	       total_day_gain.charAt(0) = "$";
	      total_day_gain = "-$" + total_day_gain;
	  }
	  else{
	      total_day_gain = "+$" + total_day_gain;
		 }
			  FinanceTable.rows[FinanceTable.rows.length-1].cells[8].firstChild.textContent = total_day_gain; 	  
	  
	  
      
}
currency_conversion = GM_getValue("USDJPY");	  
if(typeof (currency_conversion) != "undefined" && currency_conversion.length > 4){

  var FinanceTable = document.getElementsByClassName('gf-table')[0];
 
if(typeof(FinanceTable) != "undefined" && typeof(FinanceTable.rows) != "undefined"){
    for(i=1;i<FinanceTable.rows.length-1;i++){
        if(typeof(FinanceTable.rows[i]) != "undefined" && typeof(FinanceTable.rows[i].cells[6]) != "undefined" && FinanceTable.rows[i].cells[6].textContent != ""){
             //skip over any "closed" positions, they will have no values worth updating.
			 
			 //Take "last price" multiplied by number of shares and update the Mkt value column
			update_mkt_value(i,3,5,7);
			
           //take mkt value minus cost basis and update the Gain column
			update_gain_amount(i,7,6,8);
			
		
			
			update_day_gain_amount(i,5,4,10);
			
				//update gain percentage
			update_gain_percentage(i,7,6,9);
			
			
			//take number of shares, 
			
			 //FinanceTable.rows[i].style.display="none"
        }
    }
	//after we've updated all the values, we can update the totals!
	
	update_totals();
}
}   
}
,2000);
//  cell 1:   Name
//  cell 2:   Symbol
//  cell 3:  Last Price
//  cell 4:   Change
//  cell 5:   Shares
//  cell 6:  Cost Basis
//  cell 7:   Mkt value
//  cell 8:  Gain 
//  cell 9 : Gain %
//  cell 10:  Day's gain
//  cell 11:  Overall Return