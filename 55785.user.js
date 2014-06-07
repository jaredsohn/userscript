// ==UserScript==
// @name           fireLazyWorkers
// @include       http://www.erepublik.com/en/company-employees/*
// @include       http://www.erepublik.com/es/company-employees/*
// ==/UserScript==


/*  ******************** FUNCTIONS  ********************  */

/*
function $(nameEntity){
	return document.getElementById(nameEntity);
}
*/

/*
function dc(nameEntity){
	return document.createElement(nameEntity);
}
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function left( cadena, corte) { var partes = cadena.split(corte); return partes[0] };

function rigth( cadena, corte) { 
	var partes = cadena.split(corte); 
	if (partes.length<1) return ""; 
	
	if (partes.length>1) {
		return partes[partes.length-1];
	}	
	
	return partes[1]; 	
};


sprintfWrapper = {
 
	init : function () {
 
		if (typeof arguments == "undefined") { return null; }
		if (arguments.length < 1) { return null; }
		if (typeof arguments[0] != "string") { return null; }
		if (typeof RegExp == "undefined") { return null; }
 
		var string = arguments[0];
		var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
		var matches = new Array();
		var strings = new Array();
		var convCount = 0;
		var stringPosStart = 0;
		var stringPosEnd = 0;
		var matchPosEnd = 0;
		var newString = '';
		var match = null;
 
		while (match = exp.exec(string)) {
			if (match[9]) { convCount += 1; }
 
			stringPosStart = matchPosEnd;
			stringPosEnd = exp.lastIndex - match[0].length;
			strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
 
			matchPosEnd = exp.lastIndex;
			matches[matches.length] = {
				match: match[0],
				left: match[3] ? true : false,
				sign: match[4] || '',
				pad: match[5] || ' ',
				min: match[6] || 0,
				precision: match[8],
				code: match[9] || '%',
				negative: parseInt(arguments[convCount]) < 0 ? true : false,
				argument: String(arguments[convCount])
			};
		}
		strings[strings.length] = string.substring(matchPosEnd);
 
		if (matches.length == 0) { return string; }
		if ((arguments.length - 1) < convCount) { return null; }
 
		var code = null;
		var match = null;
		var i = null;
 
		for (i=0; i < matches.length; i++) {
 
			if (matches[i].code == '%') { substitution = '%' }
			else if (matches[i].code == 'b') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
				substitution = sprintfWrapper.convert(matches[i], true);
			}
			else if (matches[i].code == 'c') {
				matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
				substitution = sprintfWrapper.convert(matches[i], true);
			}
			else if (matches[i].code == 'd') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 'f') {
				matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 'o') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 's') {
				matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
				substitution = sprintfWrapper.convert(matches[i], true);
			}
			else if (matches[i].code == 'x') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
				substitution = sprintfWrapper.convert(matches[i]);
			}
			else if (matches[i].code == 'X') {
				matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
				substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
			}
			else {
				substitution = matches[i].match;
			}
 
			newString += strings[i];
			newString += substitution;
 
		}
		newString += strings[i];
 
		return newString;
 
	},
 
	convert : function(match, nosign){
		if (nosign) {
			match.sign = '';
		} else {
			match.sign = match.negative ? '-' : match.sign;
		}
		var l = match.min - match.argument.length + 1 - match.sign.length;
		var pad = new Array(l < 0 ? 0 : l).join(match.pad);
		if (!match.left) {
			if (match.pad == "0" || nosign) {
				return match.sign + pad + match.argument;
			} else {
				return pad + match.sign + match.argument;
			}
		} else {
			if (match.pad == "0" || nosign) {
				return match.sign + match.argument + pad.replace(/0/g, ' ');
			} else {
				return match.sign + match.argument + pad;
			}
		}
	}
}


//to_number
function N( cadena ){
    var cad = new String(cadena);
    cad = cad.replace(",",".");//we hate the spanish  number format. BOOO!!!. REAL ACADEMIA IS EVUL !!!! BOOO!!
    var first = Number( cad);

    if (isNaN(first)){
          return 0;
    }
    if(!isFinite(first)){
        return 0;
    }
    return first + 0;
}


sprintf = sprintfWrapper.init;
    
function NR(cadena,formato){
    var num=0;
    cadena = new String( cadena);
    cadena = cadena.replace(",",".");

    switch(formato){
        case "EEE":
            num = sprintf("%d",cadena % 1000);
            break;
        case "EE":
            num = sprintf("%d",cadena % 100);
            break;
        case "E":       
            num = sprintf("%d",cadena % 10);
            break;
        case "E.DDD":
            //num = parseInt(N(cadena)*1000)*0.001;
            num = sprintf("%.3f",cadena);
            break;
        case "E.DD":
            //num = parseInt(N(cadena)*100)*0.01;
            num = sprintf("%.2f",cadena);
            break;
        case "EE.D":
        case "EEE.D":
            //num = parseInt(N(cadena)*10)*0.1;
            num = sprintf("%.1f",cadena);
            break;
        default:
            //TODO: eliminar en produccion
            alert_once("BUG: number format unknom (ask Teiman about it):"+formato);
         return N(cadena);
    }
    return N(num);
}

var alerts = new Array();

function alert_once(msg) { //system to alert about bugs only once. usefull for alerts inside loops.
	if (!alerts[msg]) {
		alert(msg);
		alerts[msg]= 1;//don't alert about that again
	}
}


function T(texto){ //INFO: limpia texto, si esperamos texto sale texto, y no valores undefined 
    if (!texto)
          return "";
    if (texto== undefined)
          return "";
    return texto;
}





function genMarketUrl(){


	//http://api.erepublik.com/v1/feeds/market/weapon/1/france
	return "http://api.erepublik.com/v1/feeds/market/"+ Company["industry"]  +"/"+ Company["quality"]   +"/"+ Company["country"] +".json";


}

/*
		<div class="extended-menus" id="extra_companies" style="display: none;">
			<div class="start">
			</div>
			<div class="core">
				<div class="bordersep">
					<h2 class="goleft big">Companies</h2>
<img class="flag" src="http://static.erepublik.com/uploads/avatars/Companies/2009/08/28/3a35cd0451ed76d79603c8c4c0c5608a_55x55.jpg" 
alt="3a35cd0451ed76d79603c8c4c0c5608a_55x55" 
height="55" width="55">

*/

function enhanceEmployeesArea (){
	
	/*  Make size for the new information on avatar */
	
	//$("extra_companies").setAttribute("style","");
	GM_log("Enhancing employee area data");				

	//GM_log("ex:" + document.getElementById("extra_companies"));				
	
	try {
		document.getElementById('extra_companies').style.display = 'block';
	} catch(e) {};
		
	
	
	var imgs = document.getElementsByTagName("img");			
	
	for(var t=0;t<imgs.length;t++){
		var item = imgs[t];
		if (item.getAttribute("class") == "flag"){
			//item.setAttribute("src","");
			item.setAttribute("width","16");
			item.setAttribute("height","16");
			item.setAttribute("style","width: 16px;height: 16px");
			//item.setAttribute("alt","");
			//item.setAttribute("title","");
			//GM_log("eliminando imagen");
		}
	}
	
	try {	
		document.location.href = "javascript:return%20showHideDiv();";
	} catch(e){
		alert(e);
	}
	
	var table = document.getElementsByTagName("table");			
	table[0].setAttribute("style","width: 809px");	
	
	//var heads = document.getElementsByTagName("th");		
	//heads[0].setAttribute("width","320");
	//heads[0].innerHTML = "ampliado a 320";
	
	GM_log("ok here - 310");
	
	/*<table class="employees_details" border="0" cellpadding="0" cellspacing="0" width="100%">
			<thead>
					<tr>
					<th class="e_employee">Employee</th>
					<th class="e_skill">Skill</th>
					<th class="e_wellness">Wellness</th>
					<th class="e_productivity">

											<span>Productivity</span>
						<div>
							<div id="date_runner" class="lite ldisabledr">
																	<a class="gback" href="/en/company-employees/konnichiwood-199544/36/1"></a>
																<div>
									<p>Sep 07 - Sep 13</p>
								</div>
																	<a class="gforw" href="javascript:;"></a>

															</div>
						</div>
					</th>
					<th class="e_salary">Salary</th>
				</tr>
*/

	/*  Remove the "all employes"  mark, to have one of our own */
	
	var numEmployees = Company["employees"].length;
		//NOTE: is not up to date, so our results are not accurate. We must warn the user somehown..  
	
	GM_log("ok here - 338");
	
	var stock = Company["raw_materials_in_stock"];
	
	var idCountry  =  country2id[ Company["country"] ];
	Company["idCountry"] = idCountry;
					
	var industry = Company["industry"];
	var quality = Company["quality"];				

	GM_log("ok here - 346");	
				
	var employeeOptimum = 10;					
	if ( industry =='house'){
		employeeOptimum = 20;
				//TODO: others industries with differen optimum ?		
				// ..maybe defense systems and such stuff.. 
	}
	Company["employeeOptimum"]	= employeeOptimum;	

	var idindustry = industry2id[industry];								
	var idraws = idindustry2rawbuy[idindustry];

	GM_log("ok here - 357");
	
	var urlsell= "http://www.erepublik.com/es/market/country-"+idCountry+"-industry-"+idindustry+"-quality-0-company_account-0/1";				
	var urlbuy = "";				
	if (idraws) {
		urlbuy = "<a target='_new' href='http://www.erepublik.com/es/market/country-"+idCountry+"-industry-"+idraws+"-quality-0-company_account-0/1'>buy</a>/";
	}								
													
	//	heads2[t].innerHTML = "( "+numEmployees+" / "+employeeOptimum+" ) raw stock: "+stock+"  ("+urlbuy+"<a target='_new' href='"+urlsell+"'>sell<span id='pricesell'></sell></a>)";					
	
	Company["numemployees"] = numEmployees;//from company,  it lags, is a not-up-to-date data
	Company["costRaws"] = Global.currentRawsCost;//from global value
				
	GM_log("ok here - 368");
				
	/*  Make a list of salarys */
	//<input name="value" id="salary_1915116" value="5" class="ammount" 		
	var	inputs = document.getElementsByTagName("input");
	
	var SalaryIndex = 0;
	for(var t=0;t<inputs.length;t++){
		var item = inputs[t];
		
		if (item.getAttribute("class")=="sallary_field"){
			SalaryList[SalaryIndex++] = N(item.value);
		}	
	}

	/* Make button to update the product Value and stuff */			
	
	var holder = document.getElementById("profileholder");
	holder.innerHTML += ""+
		"<table style='zoutline: 1px dotted red;width: 700px'><tr style='display:none'>"+
			"<td><font color='red' style='float:left;display:block;min-width: 120px'>Salary cost:</font> <input style='border: 0px;width: 4em;text-align: right' type='text' value='' id='SalaryCost' /></td>"+		
			"<td valign='center'><font color='green' style='float:left;min-width: 120px'> &nbsp; Profit:</font><input style='border: 0px;width: 4em;text-align: right' type='text' value='' id='TotalProfit' /></td>"+
			"<td></td>"+
		"</tr>"+
		"<tr>"+
			"<td valign='center'><font color='green' style='float:left;display:block;min-width: 120px'>Product value:</font>"+
				"<input style='width: 4em;text-align: right' type='text' value='' id='currentProductSell' />"+
				"<span id='butonHolder'></span>"+
			"</td>"+
		"<td valign='center'><font color='green' style='float:left;display:block;min-width: 120px'> &nbsp; Raws cost:</font>"+
			"<input style='width: 4em;text-align: right' type='text' value='' id='currentRawsCost' />"+
		"</td>"+
		"<td>"+
			"<span id='buton2Holder'></span></td><td valign='center'><ul class='profilemenu' style='margin-top:4px'><li><a href='http://www.egobba.de/company_v07.swf' target='_new'>Egobba Gestion</a></li></ul>"+
		"</td>"+
		"</tr></table>";
				
	document.getElementById("currentProductSell").value = Global.currentProductValue;
	document.getElementById("currentRawsCost").value = Global.currentRawsCost;

	var buton = document.createElement("input");
	buton.value ="Update";
	buton.setAttribute("type", "button");
	buton.setAttribute("style","width: 4em;text-align:center;zmargin-bottom: 16px");
	buton.addEventListener("click", updateCompanyProductValue, true)

	document.getElementById("butonHolder").appendChild( buton );
	
	buton = document.createElement("input");
	buton.value ="Update";
	buton.setAttribute("type", "button");
	buton.setAttribute("style","width: 4em;text-align:center;zmargin-bottom: 16px");
	buton.addEventListener("click", updateCompanyRawsCost, true)	
	//buton.addEventListener("click", getMarketData, true)		
	document.getElementById("buton2Holder").appendChild( buton );

	getMarketData();


	
	var links = document.getElementsByTagName("a");							
	
	SalaryIndex =0;
	for (var i=0; i < links.length; i++) {
		var item = links[i];		
		var url = item.getAttribute("href") + "";		

		var classname = item.getAttribute("class");
		var inner = item.innerHTML;
		var title = item.getAttribute("title")		
		
		var isProfile = url.match("/citizen/profile/");		
		var isNormalLinkProfile = (classname == "dotted");
		
		if (isProfile && isNormalLinkProfile){
			
			var parts = url.split("/citizen/profile/");
			var id = parts[1];				
			item.setAttribute("id","profilelink_" + id);			
			
			var Salary = N(SalaryList[SalaryIndex++]);			
			item.setAttribute("Salary",NR(Salary,"E.DD"));			
			
			Global.SalaryCost = parseFloat(Global.SalaryCost) + parseFloat(Salary);
			
			document.getElementById("SalaryCost").value = NR(Global.SalaryCost,"E.DD");
			
			fetchProfile(id);
		}	
	}	

} 




function getCompanyData(id) {
    GM_xmlhttpRequest(
		{
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/companies/'+escape(id)+'.json', //thanks to the eRepublik guys for this api, is fantastic :-) 			
            onload:function(response) {
				try {
					var result = eval('(' + response.responseText + ')')
					Company = result;		
					
					if (isEmployeesArea){					
						enhanceEmployeesArea();
					}					
				} catch(err) {
					//ERRORS? ME? , NEVAER!!!
				}
            }
        }
    );
}

	
	
function updateCompanyProductValue(e){
	e.stopPropagation( );
	e.preventDefault( );

	newvalue = N(document.getElementById("currentProductSell").value);
	
    var companyslot = Company["id"] + "_productValue";	
	
	try {
		GM_setValue( companyslot, new String(newvalue) + "");   	
	} catch(e){
		alert(e);
	}	
	
	document.location.reload();
	return false;
}

function updateCompanyRawsCost(e){
	e.stopPropagation( );
	e.preventDefault( );

	newvalue = N(document.getElementById("currentRawsCost").value);
	
	GM_setValue(Company["id"] + "_rawsCost", newvalue + "" );   	
	
	document.location.reload();
	return false;
}





function getMarketData() {	
    GM_xmlhttpRequest(
        {
            method: 'GET',			
			url: "http://api.erepublik.com/v1/feeds/market/"+ Company["industry"]  +"/"+ Company["quality"]   +"/"+ Company["country"] +".json",
            onload:function(response)
            {
				// todo think about bad request -
				try {				
					var data = eval('(' + response.responseText + ')')									
					
					var price = left(data[0]["offer"]["price"]," ");
					
					Global.pricesell = price;
					//document.getElementById("pricesell").innerHTML = ": " + NR(price,"E.DD")  + " ";
					
				} catch(err) {
					GM_log("e:"+err);
				}
            }
        }
    );
}





function fetchProfile(id) {
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
            onload:function(response)
            {
				// todo think about bad request -
				try {
					var profile = eval('(' + response.responseText + ')')									
					
					var link = document.getElementById("profilelink_"+id);
					link.parentNode.setAttribute("class","");
					link.parentNode.setAttribute("style","text-align: center");
					
					var Salary = link.getAttribute("Salary");
					
					//productivity 
					//W = 1/4 * A * B * C * D * E * F
					
					var w_productivity = 0;//what we need
					var a_skillmult = 0;
					var b_emplomult = 0;
					var c_welmult = 0;
					var d_regmult = 0;
					var e_triviamul = 0;
					var f_companyq = 0;
					
					var valor = 0;					
					var domainCompany = 'constructions';//house....			
					
					if (Company["industry"]=='iron' || Company["industry"]=='wood'){
						domainCompany = 'land';
					} else 	if (Company["industry"]=='weapon') {
						domainCompany = 'manufacturing';
					}
					
					//factor 1/4 or 1/2
					var factor = 1/4;
					if ( domainCompany=='manufacturing' || domainCompany=='constructions' ){
						factor = 1/2;
					}														
					
					//extract skill value from worker
					for(var i=0;i< profile.skills.length;i++){					
						valor =  profile.skills[i]["value"];						
						var domain = profile.skills[i]["domain"];						
						if (domain==domainCompany)
							break;																	
					}
					a_skillmult = N(valor);
					
					//productivity based on number of workers
					b_emplomult = 2.0;//for 10 employes	.. LOAD FROM DATA?

					var num = Company["numemployees"];
					
					//GM_log("num:"+num);
					
					var employeeOptimum = Company["employeeOptimum"];	
					
					if (!employeeOptimum) {
						alert_once("BUG: employeeOptimum is zero!!. PM Teiman about it.");
						employeeOptimum = 10;//lets continue for not reason at all.
					}										
					
					if ( num<employeeOptimum){
						b_emplomult = 1 + num/employeeOptimum;
					} else 	if (num>employeeOptimum){
						b_emplomult = 1 - num/employeeOptimum;
						if (b_emplomult <1)
							b_emplomult = 1;												
					}
																							
					c_welmult = 1 + 2 * N(profile.wellness) / 100;
					d_regmult = 2;//for a High region of RAW... LOAD FROM DATA?
					if ( domainCompany=='manufacturing' || domainCompany=='constructions' ){
						d_regmult = 1;//const value
					}	
										
					e_triviamul = 1.5; // const value
					z_mycompany = N(Company["quality"]);
					
					if ( !z_mycompany){
						alert_once("BUG: z_mycompany is zero!!. PM Teiman about it.");
						z_mycompany = 1;
					}					
					
					f_companyq =  (11-z_mycompany) / 10;
					if ( domainCompany=='manufacturing' || domainCompany=='constructions' ){
						f_companyq = 1/z_mycompany;
					}						
					
					w_productivity = factor * a_skillmult*b_emplomult*c_welmult*d_regmult*e_triviamul*f_companyq;
					
					productvalue = Global.currentProductValue;
					
					workervalue = N(w_productivity * productvalue);
					
					var howMuchUnits = w_productivity;//for raws
					
					if ( domainCompany=='manufacturing' || domainCompany=='constructions' ){
						//for every 5 items of productivity, we create 1 item for sell
						//TODO: http://wiki.erepublik.com/index.php/Raw_materials  5=>weapons, others=>other
						var factor = N(raw2pu[ Company["industry"] ]);
						
						if (!factor){
							alert_once("BUG: employeeOptimum is zero!!. PM Teiman about it.");
							GM_log("ERROR: factor en domainCompany manufactoring/cosntr is zero!");
							factor = 1;//yea, this is to avoid doing something really insane, so is just crazy
						}						
						
						howMuchUnits = N(w_productivity/factor);						
					}		
					
					workervalue = N(howMuchUnits  * productvalue);				
						
					var Profit = workervalue - Salary;

					// substracting the cost of raws resources wen needed.
					if ( domainCompany=='manufacturing' || domainCompany=='constructions' ){
						Profit = Profit - w_productivity * Global.currentRawsCost;
						workervalue = workervalue - ( w_productivity  * Global.currentRawsCost);//there could be a division by zero error :-( 
					}																	
					
					Global.TotalProfit += N(Profit);					
					document.getElementById("TotalProfit").value = NR(Global.TotalProfit,"E.DD");
					
					var profit_show = "<font style='color:black!important'>" + NR(Profit,"E.DD" )+"</font";//green
					if (Profit <0) 
						profit_show = "<font style='color:red!important'>" + NR(Profit,"E.DD") +" <blink>!</blink></font";//red	
					else 
					if (Profit <1) 
						profit_show = "<font style='color:gray!important'>" + NR(Profit,"E.DD") +" <blink>.</blink></font";	//orange				
					
					if (link){					
							
						var div = document.createElement("div");
						
						var icongold = "<img title='Monetary units' align='absmiddle' style='border: 0px' src='http://wiki.erepublik.com/images/a/ac/Gold.gif' />";
						var  human = "<img title='H' align='absmiddle' style='border: 0px' src='http://wiki.erepublik.com/images/6/65/Citizen-shape.gif' />";
						var  doc   = "<img title='doc' align='absmiddle' style='border: 0px' src='http://wiki.erepublik.com/images/9/92/Update_08.gif' />"; 
						var  well   = "<img title='wellness' align='absmiddle' style='border: 0px;height: 16px' src='http://wiki.erepublik.com/images/d/d6/Employ.JPG' />"; 
						var  prod   = "<img title='production' align='absmiddle' style='border: 0px;height: 14px;margin-top:1px;margin-bottom:1px' src='http://wiki.erepublik.com/images/3/30/Icon-adv-work.png' />"; 										
						var msgme = "<a target='_new' href='/en/messages/compose/"+id+"?message_subject=Hi!'><img align='absmiddle' style='border: 0px' src='/images/parts/btn-icon_send-message.gif'></a>";
						
						div.innerHTML = "<table style='border: 0px'>"+
							"<tr><td style='padding:0px;margin: 0px' colspan='3' align='center'><znobr id='caja_link_"+id+"'></znobr> </td><td align='center' style='padding:0px;margin: 0px'>"+msgme+"</td><tr>"+
							"<tr><td style='padding:0px;margin: 0px'></td><td style='padding:0px;margin: 0px' width='100' align='right'>"+NR(profile.wellness,"E.DD") + " </td><td align='center' style='padding:0px;margin: 0px'>"+well+"</td></tr>"+
							"<tr><td style='padding:0px;margin: 0px'></td><td style='padding:0px;margin: 0px' align='right'>"+NR(w_productivity,"E.DD") + " </td><td align='center' style='padding:0px;margin: 0px'>"+prod+"</td></tr>"+
							"<tr><td style='padding:0px;margin: 0px'></td><td style='padding:0px;margin: 0px' align='right'><nobr><b>"+NR(workervalue,"E.DD")+" / "+ profit_show +" </b></nobr></td><td align='center' style='padding:0px;margin: 0px'>"+icongold+"</td></tr></table>";							
						
						link.parentNode.appendChild( div );	
						
						document.getElementById("caja_link_"+id).appendChild( link );//HACK: clever trick to move a node. 													
					}
				} catch(err) {
					GM_log("e:"+err);
				}
            }
        }
    );
}



/* ******************** DATA ******************** */

var Global = new Object();
var Company = new Object();
var SalaryList = new Array();

var url = document.location.href;
var isEmployeesArea = url.match("/company-employees/"); //don't really needed, since this script will only run on the valid area... 

//extracting  the id_company from the url
var temp1 = rigth( url, "/company-employees/");
var temp  = rigth( temp1 , "-");
Global.id_company = left( temp,"/");

Company["id"] =  Global.id_company;
Company["quality"] = 1;//for now... this will be replaced as more info come. 

Global.currentProductValue = N(GM_getValue(Company["id"] + "_productValue", 0));
Global.currentRawsCost = N(GM_getValue(Company["id"] + "_rawsCost", 0));

Global.SalaryCost = 0;
Global.TotalProfit = 0;


// for every 5 production,  1 weapon is made
var raw2pu = new Array();
raw2pu["food"]= 1;
raw2pu["moving"]= 10;
raw2pu["gift"]= 2;
raw2pu["weapon"]= 5;
raw2pu["house"]= 200;
raw2pu["hospital"]= 2000;
raw2pu["defense-system"]= 2000;
raw2pu["raw-materials"]=1 ;
raw2pu["wood"]=1 ;
raw2pu["iron"]=1 ;
//TODO: confirm names

var country2id = new Array();
country2id["Romania"]=1;
country2id["Italy"]=10;
country2id["France"]=11;
country2id["Germany"]=12;
country2id["Hungary"]=13;
country2id["Spain"]=15;
country2id["United-Kingdom"]=29;
country2id["Switzerland"]=30;
country2id["Netherlands"]=31;
country2id["Belgium"]=32;
country2id["Austria"]=33;
country2id["Czech-Republic"]=34;
country2id["Poland"]=35;
country2id["Slovakia"]=36;
country2id["Norway"]=37;
country2id["Sweden"]=38;
country2id["Finland"]=39;
country2id["Ukraine"]=40;
country2id["Bulgaria"]=42;
country2id["Greece"]=44;
country2id["Moldavia"]=52;
country2id["Portugal"]=53;
country2id["Ireland"]=54;
country2id["Denmark"]=55;
country2id["Slovenia"]=61;
country2id["Croatia"]=63;
country2id["Serbia"]=65;
country2id["Bosnia-Herzegovina"]=69;
country2id["Estonia"]=70;
country2id["Latvia"]=71;
country2id["Lithuania"]=72;
country2id["China"]=14;
country2id["Russia"]=41;
country2id["Turkey"]=43;
country2id["Japan"]=45;
country2id["South-Korea"]=47;
country2id["India"]=48;
country2id["Indonesia"]=49;
country2id["Iran"]=56;
country2id["Pakistan"]=57;
country2id["Israel"]=58;
country2id["Thailand"]=59;
country2id["Malaysia"]=66;
country2id["Philippines"]=67;
country2id["Singapore"]=68;
country2id["North-Korea"]=73;
country2id["South-Africa"]=51;
country2id["Canada"]=23;
country2id["USA"]=24;
country2id["Mexico"]=26;
country2id["Brazil"]=9;
country2id["Argentina"]=27;
country2id["Venezuela"]=28;
country2id["Chile"]=64;
country2id["Uruguay"]=74;
country2id["Paraguay"]=75;
country2id["Bolivia"]=76;
country2id["Peru"]=77;
country2id["Colombia"]=78;
country2id["Australia"]=50;


var idindustry2rawbuy = new Array();
idindustry2rawbuy[10] = 9;// house needs wood
idindustry2rawbuy[3] = 7;// weapons need iron
idindustry2rawbuy[4] = 8;// tickets need oil
//TODO: hospital, defense system


var industry2id = new Array();
industry2id["food"] = 1;
industry2id["gift"] = 2;
industry2id["weapon"] = 3;
industry2id["movingtickets"] = 4;
industry2id["grain"] = 5;
industry2id["diamonds"] = 6;
industry2id["iron"] = 7;
industry2id["oil"] = 8;
industry2id["wood"] = 9;
industry2id["house"] = 10;
industry2id["hospital"] = 11;
industry2id["defensesystem"] = 12;
//TODO: confirm this, It could be *REALLY* worng. Smells bad.



/*  ********************  PROCESS   ******************** */

if (isEmployeesArea) {
	GM_log("Aplying new style..");			

	//Note: moved here, so the redraw is done early	
	addGlobalStyle('a.iconbtn, #profilehoder .iconbtn { display:none!important;visibility:hidden!important;}');
	addGlobalStyle('#profileholder,#companyprofile h1 { width: 480px!important}');
	addGlobalStyle('.indent { width: 85%!important }');
	addGlobalStyle('.ad_holder , #promo {display:none!important;visibility:hidden!important;background-color: gray} #content { width: 85%} ');	
	addGlobalStyle('body#companyprofile #profileholder, body#party #profileholder, body#newspaper #profileholder { width: 480px!important}');

	getCompanyData(Company["id"]);	//this will load enhanceEmployeesArea if sucess
}


/*  ********************  MISC/DOCS   ******************** */

/*

for( var t in paises){ 
  var pais = paises[t];
  con[ pais.name ]= pais; 
 
  WScript.Echo( 'country2id["'+pais.permalink +'"]='+ pais.id +";" );
  
}

http://api.erepublik.com/v1/feeds/market/weapon/1/france
http://api.erepublik.com/v1/feeds/market/ Company["industry"]  / Company["quality"]   / Company["quality"]


*/

/*
http://api.erepublik.com/v1/feeds/citizens/1759969.json
{
"medals":[{"type":"avatar change","amount":0}],
"country":"France",
"employer_id":197097,
"date_of_birth":"2009-08-11T21:19:23Z",
"country_id":11,
"military_rank":"Private",
"region_id":176,
"level":5,
"experience_points":34,
"wellness":38.37,
"region":"Galicia",
"is_general_manager":false,
"friends":[{"id":2},{"id":1635411}],
"skills":[{"value":2.2,  "domain":"land"}],
"fights":1,
"strength":3.1,
"is_party_member":false,
"is_president":false,
"employer":"Societe Miniere FR ES License",
"name":"BozzEsp",
"damage":10,
"is_congressman":false,
"id":1759969,
"sex":"M"}


http://api.erepublik.com/v1/feeds/companies/197810
[....]
<domain>land</domain>
<region>Asturias</region>
<raw-materials-in-stock>0.0</raw-materials-in-stock>
<industry>iron</industry>
<quality>1</quality>
<name>anata ha totemo kawaii desu</name>
<is-for-sale>false</is-for-sale>
<id>197810</id>
</company>
*/


