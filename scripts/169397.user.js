// ==UserScript==
// @author	Timbuck
// @name	Anno1777 Confirm
// @namespace	Anno1777 Confirm Tool
// @description	Provides confirm boxes when buying regions.
// @version	0.0.2
// @include	*anno1777.com/pages/*
// @include	http://anno1777.com/pages/*
// @require	http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Version 0.0.1: Project started, and working extension created.
// Version 0.0.2: Added region name and price to confirm box

// THE CODE

// Add CSS (for FireFox use only, use a direct .css file for Chrome)
function addCss(cssString) {
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	document.head.appendChild(newCss);
}
addCss (
	'.button { font-family:Arial, Helvetica, sans-serif; font-size:12px; color: #998500; line-height: 34px; top:8px; width: 110px; height: 34px; background-repeat: no-repeat;'+
	'background-image: url(data:image/gif;base64,R0lGODlhbgAiAIABAPbx1P///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAABuACIAAAKMjIGpy+0Po5zTHGSz3rz7D4bimBwXhabqygIm1sbyvAYljee6Yrv7D2T1esGi0TE8Kpe+JvP5S0KnOSn1GrNitykt9xvxgscMMfncJKLX5jW47ebC49g5nWq/Q/N6Jr+v9AdoJDgYVGgYBZNYt8iI5/i4Fynpd1Np6XOCWWRCNAIaKjpKalFiyhloUAAAOw==);}'+
	'.button:hover { color: #FFFFFF; cursor:pointer;'+
	'background-image: url(data:image/gif;base64,R0lGODlhbgAiAOeHAPYsAPcsAPgsAPctAPgtAPcuAPguAPYvAPcvAPgvAPcwAPgwAPYxAPcxAPgxAPgyAPgzAPg0APg1APk1APc2APg2APk2APk3APc5APg5APk5APk6APc8APg8APk8APg/APk/APo/APhCAPlCAPpCAPpFAPlGAPpGAPpHAPtHAPlIAPpIAPtIAPtJAPpKAPtKAPpLAPtLAPtMAPpNAPtNAPxNAPtOAPxOAPxPAPpQAPtQAPxQAPtRAPxRAPtSAPxSAPtTAPxTAPxUAP5nTP1oTP5oSv5oS/5oTP5qT/5sU/5tU/5vV/5wVv5wV/5wWP5zW/5zXP5zXf50XP51Yv52YP52Yf52Yv53YP53Yf53Yv55Z/56Zv56Z/57Z/5+a/5+bP5+bf5/bP5/bf6Ac/6Bcf6Bcv6Bc/2Cc/6Ccf6Ccv6Cc/6FeP6GeP6Ifv6Jff6Jfv6Kff6Kfv6Mgv6Ngf6Ngv6Ng/6Ph/6Qhv6Qh/6QiP6Rh/6RiP6SjP6TjP6Tjf6UjP6WkP6Yk/6YlP6Zk/6ZlP6Zlv6alv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAP8ALAAAAABuACIAAAj+AP8JNESwoMGDCBMqXJiwkMOHECNKnEgRIkOCAgUGEiQoo8ePIEOKHEmypMmTKAcNIiQQUEtAMGPKnEmzps2bOHPq3Imz5b8/fv71+cOnqNGjSJMqLdqnqdOnUKNKnfp0qVWjVJ0K7aPnX548e/CIxfO1bJ6xaNOqFXunrdu3cOHamUu3rl27ZvPqzbunr9+/eMJ6pfOPDp06iBMrXsy4cWLDkCNLnky5suXLk+do3sxZTh3Cdd78iwMnzpvTb9qoXo26tevXp+HInk27dm03uHPr3r0btm/XcYILH25atBs2/9goX868ufPn0KNDX0O9uvXr2LNrty69+r81av7+nVGTpnx5NOjTm1/Pvn15M/Djy58/f4z9+/jz5y/Dv7////+RIeCABJr3Txph/APGggw26OCDEDr4xYQUVmihhV5kqOGGHHJ44YcfRtigGApy8Q8XKKaY4hYsbqHiizC+qMWMNNZoo40t5qjjjix24eOPQAYp5JA+otjFiVn8k8WSVTRZhRVWLMmkk1RWaWUVVGSp5ZZccnnFl2CGKaaYV5ZZ5RRopqmmFVgkaYUU/0QRBRR01mnnnXjmWecTfPbp559/6inooITSCaifdcbZxD9NNOHEo5BGKumklELa6KWYZqopE5x26umnn2oq6qikLuHEEv84ocQ/SrTq6qv+sMYq66y01mrrrbjmmgSrSPyDxK/ABivssMQWa+yxyCar7LK9InHEP0ccMYQR1BpRxLXYVqvtttxSG+234IYrLhHklmvuueimq6654oJrRLTQBvBPAPTWa++9+Oar77789uvvvwDLG0AB/wxgQAEDJDxAAQw3rPDDEEecMAAUV2zxxRdLrDHEBHTs8ccggyzAyCSXTADD/xSAwD8KINAyAjDD3LDKMdds880IHKDzzjz33PPMQAcNdAJEF2300UgnTfQCCCTwDwIO/ONAAw80YPXVWGet9dZWM+D112CHHTbXZJdtdtdif+3A2lJD8A8EEcQt99x012333BDkrff+3nzz/cDfgAcuuOB9F2744XL/E8EF/1Tg+OOQRy755JFLYPnlmGeeOQWcd+75559TLvrjE5Ru+ukVWGBB4xv8k4EGGmQg++wY1I7B7LjnrvvuvO9u++/AB19778S/DvvxyB//jwYe/OPB8x1E3wEH1Fcv/fXYZx/989x37/334Icv/vjkh/9PByD8AwIIIay/fgjwx+/+/PTXv/4H+Oev//772+///wAMoP1C8I8QkOAfJEjgCBbIQBE4UAQMjKAEJ0jBClLwgRjMoAYdaMEOjiCBIAwhCEfwjxGU4B8lSKEKV8jCFrrwhTCMoQxnSMManrAEKfhHCliwAhT4EAXtJziBCYZogh8a8YhI9OEKlsjEJjrRiSqIohSnSEUqPvGKWMwiD1fwjxXE4B8weEEMXkDGF7TgjGgsoxrXyEYyxuCNcIyjHOdIxzra8Y54jKMLXgCDf8SABjT4ByAHSQMZGPKQhEykIhNpg0Y68pGQhOQMJknJSlrSkofMpCY3acgaePKToGykIG3wjx0IZAc6SKUqc8DKHKjylbCMpSxnSctazhIHuMylLne5yxv48pfA1IFAhPmPHvzgByhJpjKXycxmZuQHPuCBR4QghCBY85rUpOY1t8nNbnrzm+AM5zePSc5ymvOc4gRCRgICADs=);}'
);

function getData(dataSource, divID)
{
	ajax=new XMLHttpRequest();
	var obj = document.getElementById(divID);
	ajax.open("GET", dataSource);
	ajax.onreadystatechange = function()
	{
		if (ajax.readyState == 4 && ajax.status == 200) 
		{
			obj.innerHTML = ajax.responseText; 
			var x = document.getElementById(divID).getElementsByTagName("script");                  
			for (var i=0;i<x.length;i++) eval(x[i].text);  
		}
	}
	ajax.send(null);
};

function region_buttons(){// Replace buy region buttons with custom set

	if(!$('#div_market #div_market').length){
		var div_loc_html = $('#div_market').html();
		$('#div_market').html('<div id="div_market">'+div_loc_html+'</div>');
	};

	// Loop
	var but_l = $('#div_market table[width="110"]');
	// console.log(but_l.length);
	
	for (var i = 0; i < but_l.length+1; i++){
		var region_div_id = $('#div_market div:eq('+i+')').attr('id'), region_div_id_s1 = region_div_id.split('_'), region_div_id_s2 = region_div_id_s1[2];
		var region_name = $('#div_market div:eq('+i+') .text_afiliati_normal').text();
		var region_price = $('#div_market div:eq('+i+') .text_maro12:eq(0)').text();
		
		
		var button_onclick_info = $('#div_market div:eq('+i+') table[width="110"] td:eq(1)').attr('onclick'), but_url_info_split = button_onclick_info.split("'"), but_url_info_URL = but_url_info_split[1], but_url_info_div = but_url_info_split[3];

		$('#div_reg_'+region_div_id_s2+' td[width="103"][align="center"]').replaceWith('<td width="103" align="center"><table width="110" border="0" cellspacing="0" cellpadding="0"><tbody><tr>'
		+'<td id="'+but_url_info_div+'" align="center" align="middle" class="button" name="'+but_url_info_URL+'" value="'+region_name+'_'+region_price+'">Buy Region</td>'
        +'</tr></tbody></table></td>');
		
	};
	
};

function button_click(){
	$('.button').click(function(){
		var but_url = $(this).attr('name'), but_id = $(this).attr('id'), but_val = $(this).attr('value'), but_val_split = but_val.split('_'), but_val_region_name = but_val_split[0], but_val_region_price = but_val_split[1];
	
		if(confirm("Are you sure you want buy "+but_val_region_name+" for "+but_val_region_price+" GOLD?")){
			getData(''+but_url+'', ''+but_id+'');
		};
	});
};


function run_confirm(){
	if($('#div_market').length){
		if(!$('#running_confirm').length){
			$('#div_market').append('<span id="running_confirm"></span>');
			
			region_buttons();
			button_click();
		};
	};
};

if ( (document.location.href.indexOf('/pages/regiuni/main.php') !== -1) ){ // Run only on http://anno1777.com/pages/regiuni/main.php*
	setInterval(run_confirm, 200);
};