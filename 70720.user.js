// ==UserScript==
// @author         Roktaal
// @name           eRepublik SJeB Military Tracker by Roktaal
// @namespace      http://www.erepublik.com/en/organization/2641761
// @description    eRepublik SJeB Military Tracker.
// @version        1.10.5
// @include        http://*.erepublik.com/en
// @include        http://*.erepublik.com/de
// @include        http://*.erepublik.com/es
// @require        http://updater.usotools.co.cc/67971.js
// ==/UserScript==

var html = '<embed width="500" height="30" src="/flash/delicious.swf" quality="best" flashvars="txt=SJeB Tracker v1.10.5 by Roktaal&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nCitizens
var count = 0
var CitizensMap = new Array();

function fetchCitizensWellness (ids) {
	nCitizens = ids.length
	var tableConstant = '</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">'
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="text-align:center;background: rgb(220,220,220);padding:2px">&nbsp;</th><th style="background: rgb(220,220,220);padding:2px">No.</th><th style="background: rgb(220,220,220);padding:2px">Name'+tableConstant+'Level'+tableConstant+'Wellness'+tableConstant+'Location'+tableConstant+'Citizenship'+tableConstant+'Strength'+tableConstant+'Exp'+tableConstant+'Rank'+tableConstant+'Damage'+tableConstant+'Donate</th><th style="text-align:center;background: rgb(220,220,220);">&nbsp;Message</th></tr>'
	for(var i=0;i<ids.length;i++) {
		fetchCitizenWellness(ids[i])
	}
}

function nameFix(name) {
	name = name.replace(/Bosnia and Herzegovina/, "Bosnia-Herzegovina");
	name = name.replace(/Moscow and Central Russia/, "Moscow-and-Central-Russia");
	name = name.replace(/&/g, "").replace(/ /g, "-").replace(/--/g, "-");
	return (name)
}

function formatWellness(data) {
	if (data < 80 && data > 50) {
		dataFormat = '<td style="padding-right: 10px; text-align:right; color:#FF6600; font-weight:bold">'
	} else if (data < 50) {
		dataFormat = '<td style="padding-right: 10px; text-align:right; color:#FF0000; font-weight:bold">'
	} else {
		dataFormat = '<td style="padding-right: 10px; text-align:right;">'
	}
	return (dataFormat)
}

function formatNumber(number) {
	number = parseFloat(number)
	number = number.toFixed(2)
	number += ''
	return (number)
}

var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Colonel','General','Field Marshal']

function totalDamage() {
	var totalDamagefQ0 = 0
	var totalDamagefQ1 = 0
	var totalDamagefQ2 = 0
	var totalDamagefQ3 = 0
	var totalDamagefQ4 = 0
	var totalDamagefQ5 = 0
	
	var totalDamageQ0 = 0
	var totalDamageQ1 = 0
	var totalDamageQ2 = 0
	var totalDamageQ3 = 0
	var totalDamageQ4 = 0
	var totalDamageQ5 = 0
	for (var id in CitizensMap) {
		var R = 1 + (ranks.indexOf(CitizensMap[id].military_rank) + 1) / 5.0
		var Q0 = 0.5
		var Q1 = 1 + (1 / 5.0)
		var Q2 = 1 + (2 / 5.0)
		var Q3 = 1 + (3 / 5.0)
		var Q4 = 1 + (4 / 5.0)
		var Q5 = 1 + (5 / 5.0)
		var S = CitizensMap[id].strength
		
		var Wf1 = 8.5
		var Wf2 = 7.5
		var Wf3 = 6.5
		var Wf4 = 5.5
		var Wf5 = 4.5
		
		var Df1Q0 = R * Q0 * S * Wf1 * 2
		var Df2Q0 = R * Q0 * S * Wf2 * 2
		var Df3Q0 = R * Q0 * S * Wf3 * 2
		var Df4Q0 = R * Q0 * S * Wf4 * 2
		var Df5Q0 = R * Q0 * S * Wf5 * 2
			
		var Df1Q1 = R * Q1 * S * Wf1 * 2
		var Df2Q1 = R * Q1 * S * Wf2 * 2
		var Df3Q1 = R * Q1 * S * Wf3 * 2
		var Df4Q1 = R * Q1 * S * Wf4 * 2
		var Df5Q1 = R * Q1 * S * Wf5 * 2
			
		var Df1Q2 = R * Q2 * S * Wf1 * 2
		var Df2Q2 = R * Q2 * S * Wf2 * 2
		var Df3Q2 = R * Q2 * S * Wf3 * 2
		var Df4Q2 = R * Q2 * S * Wf4 * 2
		var Df5Q2 = R * Q2 * S * Wf5 * 2
			
		var Df1Q3 = R * Q3 * S * Wf1 * 2
		var Df2Q3 = R * Q3 * S * Wf2 * 2
		var Df3Q3 = R * Q3 * S * Wf3 * 2
		var Df4Q3 = R * Q3 * S * Wf4 * 2
		var Df5Q3 = R * Q3 * S * Wf5 * 2
			
		var Df1Q4 = R * Q4 * S * Wf1 * 2
		var Df2Q4 = R * Q4 * S * Wf2 * 2
		var Df3Q4 = R * Q4 * S * Wf3 * 2
		var Df4Q4 = R * Q4 * S * Wf4 * 2
		var Df5Q4 = R * Q4 * S * Wf5 * 2
			
		var Df1Q5 = R * Q5 * S * Wf1 * 2
		var Df2Q5 = R * Q5 * S * Wf2 * 2
		var Df3Q5 = R * Q5 * S * Wf3 * 2
		var Df4Q5 = R * Q5 * S * Wf4 * 2
		var Df5Q5 = R * Q5 * S * Wf5 * 2
		
		var totalUnitDfQ0 = Math.ceil(Df1Q0) + Math.ceil(Df2Q0) + Math.ceil(Df3Q0) + Math.ceil(Df4Q0) + Math.ceil(Df5Q0)
		var totalUnitDfQ1 = Math.ceil(Df1Q1) + Math.ceil(Df2Q1) + Math.ceil(Df3Q1) + Math.ceil(Df4Q1) + Math.ceil(Df5Q1)
		var totalUnitDfQ2 = Math.ceil(Df1Q2) + Math.ceil(Df2Q2) + Math.ceil(Df3Q2) + Math.ceil(Df4Q2) + Math.ceil(Df5Q2)
		var totalUnitDfQ3 = Math.ceil(Df1Q3) + Math.ceil(Df2Q3) + Math.ceil(Df3Q3) + Math.ceil(Df4Q3) + Math.ceil(Df5Q3)
		var totalUnitDfQ4 = Math.ceil(Df1Q4) + Math.ceil(Df2Q4) + Math.ceil(Df3Q4) + Math.ceil(Df4Q4) + Math.ceil(Df5Q4)
		var totalUnitDfQ5 = Math.ceil(Df1Q5) + Math.ceil(Df2Q5) + Math.ceil(Df3Q5) + Math.ceil(Df4Q5) + Math.ceil(Df5Q5)
			
		if (CitizensMap[id].wellness > 90) {
			var W1 = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
			var W2 = 1 + ((CitizensMap[id].wellness - 25 - 10) / 100.0)
			var W3 = 1 + ((CitizensMap[id].wellness - 25 - 20) / 100.0)
			var W4 = 1 + ((CitizensMap[id].wellness - 25 - 30) / 100.0)
			var W5 = 1 + ((CitizensMap[id].wellness - 25 - 40) / 100.0)
			
			var D1Q0 = R * Q0 * S * W1 * 2
			var D2Q0 = R * Q0 * S * W2 * 2
			var D3Q0 = R * Q0 * S * W3 * 2
			var D4Q0 = R * Q0 * S * W4 * 2
			var D5Q0 = R * Q0 * S * W5 * 2
			
			var D1Q1 = R * Q1 * S * W1 * 2
			var D2Q1 = R * Q1 * S * W2 * 2
			var D3Q1 = R * Q1 * S * W3 * 2
			var D4Q1 = R * Q1 * S * W4 * 2
			var D5Q1 = R * Q1 * S * W5 * 2
			
			var D1Q2 = R * Q2 * S * W1 * 2
			var D2Q2 = R * Q2 * S * W2 * 2
			var D3Q2 = R * Q2 * S * W3 * 2
			var D4Q2 = R * Q2 * S * W4 * 2
			var D5Q2 = R * Q2 * S * W5 * 2
			
			var D1Q3 = R * Q3 * S * W1 * 2
			var D2Q3 = R * Q3 * S * W2 * 2
			var D3Q3 = R * Q3 * S * W3 * 2
			var D4Q3 = R * Q3 * S * W4 * 2
			var D5Q3 = R * Q3 * S * W5 * 2
			
			var D1Q4 = R * Q4 * S * W1 * 2
			var D2Q4 = R * Q4 * S * W2 * 2
			var D3Q4 = R * Q4 * S * W3 * 2
			var D4Q4 = R * Q4 * S * W4 * 2
			var D5Q4 = R * Q4 * S * W5 * 2
			
			var D1Q5 = R * Q5 * S * W1 * 2
			var D2Q5 = R * Q5 * S * W2 * 2
			var D3Q5 = R * Q5 * S * W3 * 2
			var D4Q5 = R * Q5 * S * W4 * 2
			var D5Q5 = R * Q5 * S * W5 * 2
		
			var totalUnitDQ0 = Math.ceil(D1Q0) + Math.ceil(D2Q0) + Math.ceil(D3Q0) + Math.ceil(D4Q0) + Math.ceil(D5Q0)
			var totalUnitDQ1 = Math.ceil(D1Q1) + Math.ceil(D2Q1) + Math.ceil(D3Q1) + Math.ceil(D4Q1) + Math.ceil(D5Q1)
			var totalUnitDQ2 = Math.ceil(D1Q2) + Math.ceil(D2Q2) + Math.ceil(D3Q2) + Math.ceil(D4Q2) + Math.ceil(D5Q2)
			var totalUnitDQ3 = Math.ceil(D1Q3) + Math.ceil(D2Q3) + Math.ceil(D3Q3) + Math.ceil(D4Q3) + Math.ceil(D5Q3)
			var totalUnitDQ4 = Math.ceil(D1Q4) + Math.ceil(D2Q4) + Math.ceil(D3Q4) + Math.ceil(D4Q4) + Math.ceil(D5Q4)
			var totalUnitDQ5 = Math.ceil(D1Q5) + Math.ceil(D2Q5) + Math.ceil(D3Q5) + Math.ceil(D4Q5) + Math.ceil(D5Q5)
			
		} else if (CitizensMap[id].wellness > 80 && CitizensMap[id].wellness < 90) {
			
			var W1 = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
			var W2 = 1 + ((CitizensMap[id].wellness - 25 - 10) / 100.0)
			var W3 = 1 + ((CitizensMap[id].wellness - 25 - 20) / 100.0)
			var W4 = 1 + ((CitizensMap[id].wellness - 25 - 30) / 100.0)
			
			var D1Q0 = R * Q0 * S * W1 * 2
			var D2Q0 = R * Q0 * S * W2 * 2
			var D3Q0 = R * Q0 * S * W3 * 2
			var D4Q0 = R * Q0 * S * W4 * 2
			
			var D1Q1 = R * Q1 * S * W1 * 2
			var D2Q1 = R * Q1 * S * W2 * 2
			var D3Q1 = R * Q1 * S * W3 * 2
			var D4Q1 = R * Q1 * S * W4 * 2
			
			var D1Q2 = R * Q2 * S * W1 * 2
			var D2Q2 = R * Q2 * S * W2 * 2
			var D3Q2 = R * Q2 * S * W3 * 2
			var D4Q2 = R * Q2 * S * W4 * 2
			
			var D1Q3 = R * Q3 * S * W1 * 2
			var D2Q3 = R * Q3 * S * W2 * 2
			var D3Q3 = R * Q3 * S * W3 * 2
			var D4Q3 = R * Q3 * S * W4 * 2
			
			var D1Q4 = R * Q4 * S * W1 * 2
			var D2Q4 = R * Q4 * S * W2 * 2
			var D3Q4 = R * Q4 * S * W3 * 2
			var D4Q4 = R * Q4 * S * W4 * 2
			
			var D1Q5 = R * Q5 * S * W1 * 2
			var D2Q5 = R * Q5 * S * W2 * 2
			var D3Q5 = R * Q5 * S * W3 * 2
			var D4Q5 = R * Q5 * S * W4 * 2
		
			var totalUnitDQ0 = Math.ceil(D1Q0) + Math.ceil(D2Q0) + Math.ceil(D3Q0) + Math.ceil(D4Q0)
			var totalUnitDQ1 = Math.ceil(D1Q1) + Math.ceil(D2Q1) + Math.ceil(D3Q1) + Math.ceil(D4Q1)
			var totalUnitDQ2 = Math.ceil(D1Q2) + Math.ceil(D2Q2) + Math.ceil(D3Q2) + Math.ceil(D4Q2)
			var totalUnitDQ3 = Math.ceil(D1Q3) + Math.ceil(D2Q3) + Math.ceil(D3Q3) + Math.ceil(D4Q3)
			var totalUnitDQ4 = Math.ceil(D1Q4) + Math.ceil(D2Q4) + Math.ceil(D3Q4) + Math.ceil(D4Q4)
			var totalUnitDQ5 = Math.ceil(D1Q5) + Math.ceil(D2Q5) + Math.ceil(D3Q5) + Math.ceil(D4Q5)
			
		} else if (CitizensMap[id].wellness > 70 && CitizensMap[id].wellness < 80) {
			
			var W1 = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
			var W2 = 1 + ((CitizensMap[id].wellness - 25 - 10) / 100.0)
			var W3 = 1 + ((CitizensMap[id].wellness - 25 - 20) / 100.0)
			
			var D1Q0 = R * Q0 * S * W1 * 2
			var D2Q0 = R * Q0 * S * W2 * 2
			var D3Q0 = R * Q0 * S * W3 * 2
			
			var D1Q1 = R * Q1 * S * W1 * 2
			var D2Q1 = R * Q1 * S * W2 * 2
			var D3Q1 = R * Q1 * S * W3 * 2
			
			var D1Q2 = R * Q2 * S * W1 * 2
			var D2Q2 = R * Q2 * S * W2 * 2
			var D3Q2 = R * Q2 * S * W3 * 2
			
			var D1Q3 = R * Q3 * S * W1 * 2
			var D2Q3 = R * Q3 * S * W2 * 2
			var D3Q3 = R * Q3 * S * W3 * 2
			
			var D1Q4 = R * Q4 * S * W1 * 2
			var D2Q4 = R * Q4 * S * W2 * 2
			var D3Q4 = R * Q4 * S * W3 * 2
			
			var D1Q5 = R * Q5 * S * W1 * 2
			var D2Q5 = R * Q5 * S * W2 * 2
			var D3Q5 = R * Q5 * S * W3 * 2
		
			var totalUnitDQ0 = Math.ceil(D1Q0) + Math.ceil(D2Q0) + Math.ceil(D3Q0)
			var totalUnitDQ1 = Math.ceil(D1Q1) + Math.ceil(D2Q1) + Math.ceil(D3Q1)
			var totalUnitDQ2 = Math.ceil(D1Q2) + Math.ceil(D2Q2) + Math.ceil(D3Q2)
			var totalUnitDQ3 = Math.ceil(D1Q3) + Math.ceil(D2Q3) + Math.ceil(D3Q3)
			var totalUnitDQ4 = Math.ceil(D1Q4) + Math.ceil(D2Q4) + Math.ceil(D3Q4)
			var totalUnitDQ5 = Math.ceil(D1Q5) + Math.ceil(D2Q5) + Math.ceil(D3Q5)
			
		} else if (CitizensMap[id].wellness > 60 && CitizensMap[id].wellness < 70) {
			
			var W1 = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
			var W2 = 1 + ((CitizensMap[id].wellness - 25 - 10) / 100.0)
			
			var D1Q0 = R * Q0 * S * W1 * 2
			var D2Q0 = R * Q0 * S * W2 * 2
			
			var D1Q1 = R * Q1 * S * W1 * 2
			var D2Q1 = R * Q1 * S * W2 * 2
			
			var D1Q2 = R * Q2 * S * W1 * 2
			var D2Q2 = R * Q2 * S * W2 * 2
			
			var D1Q3 = R * Q3 * S * W1 * 2
			var D2Q3 = R * Q3 * S * W2 * 2
			
			var D1Q4 = R * Q4 * S * W1 * 2
			var D2Q4 = R * Q4 * S * W2 * 2
			
			var D1Q5 = R * Q5 * S * W1 * 2
			var D2Q5 = R * Q5 * S * W2 * 2
		
			var totalUnitDQ0 = Math.ceil(D1Q0) + Math.ceil(D2Q0)
			var totalUnitDQ1 = Math.ceil(D1Q1) + Math.ceil(D2Q1)
			var totalUnitDQ2 = Math.ceil(D1Q2) + Math.ceil(D2Q2)
			var totalUnitDQ3 = Math.ceil(D1Q3) + Math.ceil(D2Q3)
			var totalUnitDQ4 = Math.ceil(D1Q4) + Math.ceil(D2Q4)
			var totalUnitDQ5 = Math.ceil(D1Q5) + Math.ceil(D2Q5)
			
		} else if (CitizensMap[id].wellness > 50 && CitizensMap[id].wellness < 60) {
			
			var W1 = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
			
			var D1Q0 = R * Q0 * S * W1 * 2
			
			var D1Q1 = R * Q1 * S * W1 * 2
			
			var D1Q2 = R * Q2 * S * W1 * 2
			
			var D1Q3 = R * Q3 * S * W1 * 2
			
			var D1Q4 = R * Q4 * S * W1 * 2
			
			var D1Q5 = R * Q5 * S * W1 * 2
		
			var totalUnitDQ0 = Math.ceil(D1Q0)
			var totalUnitDQ1 = Math.ceil(D1Q1)
			var totalUnitDQ2 = Math.ceil(D1Q2)
			var totalUnitDQ3 = Math.ceil(D1Q3)
			var totalUnitDQ4 = Math.ceil(D1Q4)
			var totalUnitDQ5 = Math.ceil(D1Q5)
			
		} else {
			
			var totalUnitDQ0 = 0
			var totalUnitDQ1 = 0
			var totalUnitDQ2 = 0
			var totalUnitDQ3 = 0
			var totalUnitDQ4 = 0
			var totalUnitDQ5 = 0
		}
		
		totalDamagefQ0+=Math.ceil(totalUnitDfQ0)
		totalDamagefQ1+=Math.ceil(totalUnitDfQ1)
		totalDamagefQ2+=Math.ceil(totalUnitDfQ2)
		totalDamagefQ3+=Math.ceil(totalUnitDfQ3)
		totalDamagefQ4+=Math.ceil(totalUnitDfQ4)
		totalDamagefQ5+=Math.ceil(totalUnitDfQ5)
			
		totalDamageQ0+=Math.ceil(totalUnitDQ0)
		totalDamageQ1+=Math.ceil(totalUnitDQ1)
		totalDamageQ2+=Math.ceil(totalUnitDQ2)
		totalDamageQ3+=Math.ceil(totalUnitDQ3)
		totalDamageQ4+=Math.ceil(totalUnitDQ4)
		totalDamageQ5+=Math.ceil(totalUnitDQ5)
	}
	$('totalDamagefQ0').innerHTML = totalDamagefQ0
	$('totalDamagefQ1').innerHTML = totalDamagefQ1
	$('totalDamagefQ2').innerHTML = totalDamagefQ2
	$('totalDamagefQ3').innerHTML = totalDamagefQ3
	$('totalDamagefQ4').innerHTML = totalDamagefQ4
	$('totalDamagefQ5').innerHTML = totalDamagefQ5
	
	$('totalDamageQ0').innerHTML = totalDamageQ0
	$('totalDamageQ1').innerHTML = totalDamageQ1
	$('totalDamageQ2').innerHTML = totalDamageQ2
	$('totalDamageQ3').innerHTML = totalDamageQ3
	$('totalDamageQ4').innerHTML = totalDamageQ4
	$('totalDamageQ5').innerHTML = totalDamageQ5
}

function getOnline(id) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.erepublik.com/en/citizen/profile/'+id,
		onload:function(response) {
			var onlineStatus = response.responseText;
			
			//onlineStatus = onlineStatus.getElementsByClassName('online');
			
			if (onlineStatus){
				return(onlineStatus);
			}
		}
	});
}

function fetchCitizenWellness(id) {
	var Citizen = null
	OrderNumber = 1
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
		onload:function(response) {
			try {
				Citizen = eval('(' + response.responseText + ')')
				var CitizenRank = Citizen.military_rank
				var CitizenRankName = Citizen.military_rank
				if (Citizen.military_rank.toLowerCase()=="field marshal") {
					CitizenRank="fieldmarshal"
				}
				html += '<tr><td style="text-align:center"><a href="http://www.erepublik.com/citizen/images?id='+Citizen.id+'" target="_blank"><img src="'+Citizen.avatar_link+'" height="14" width="14"></a></td><td style="text-align:center">'+OrderNumber+'</td><td><a href="/en/citizen/profile/'+Citizen.id+'">'+Citizen.name+'</a></td><td style="text-align:center">'+Citizen.level+'</td>'+formatWellness(formatNumber(Citizen.wellness))+formatNumber(Citizen.wellness)+'</td><td style="text-align:left"><p style="white-space:nowrap; width:200px; overflow:hidden;"><img title="'+Citizen.country+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Citizen.country)+'.gif" height="14" alt=""> <a title="'+Citizen.country+'" href="/en/country/'+nameFix(Citizen.country)+'">'+Citizen.country+'</a>, <a title="'+Citizen.region+'" href="/en/region/'+nameFix(Citizen.region)+'">'+Citizen.region+'</a></p></td><td style="text-align:left"><p style="white-space:nowrap; width:100px; overflow:hidden;"><img title="'+Citizen.citizenship["country"]+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Citizen.citizenship["country"])+'.gif" height="14" alt=""> <a title="'+Citizen.citizenship["country"]+'" href="/en/country/'+nameFix(Citizen.citizenship["country"])+'">'+Citizen.citizenship["country"]+'</a></p></td><td style="padding-right: 10px; text-align:right">'+formatNumber(Citizen.strength)+'</td><td style="padding-right: 5px; text-align:right">'+Citizen.experience_points+'</td><td align="center" style="padding-left: 4px"><img title="'+CitizenRankName+'" src="http://www.erepublik.com/images/parts/icon_position_military_'+CitizenRank.toLowerCase()+'.gif" width="15" height="15" alt=""></td><td style="padding-right: 4px; text-align: right">'+Citizen.damage+'</td><td style="text-align:center"><a title="Donate" id="Donate" href="/en/citizen/donate/items/'+Citizen.id+'"><img src="/images/parts/icon-gold.gif" width="14" height="16"</a></td><td align="center"><div id="miniprofile" style="width: 25px; text-align:center"><a title="Write message" class="msg" href="/en/messages/compose/'+Citizen.id+'"></a></div>'+'</td></tr>'
				CitizensMap[id]=Citizen
			}
			catch(err) {
			}
			OrderNumber = OrderNumber + 1
			if (++count==nCitizens) {
				html+='<tr style="background: rgb(220,220,220);"><td colspan="13">&nbsp;</td></tr>'
				
				html+= '<tr><td valign="middle" nowrap="nowrap" colspan="10" style="text-align: right; font-size:14px; padding-right: 14px"><strong>Unit damage (full):</strong></td>';
				html+= '<td valign="middle" colspan="3">';
				html+= '<span class="qlsmallmeter" style="float: left; height: 15px; vertical-align: middle; margin-right: 14px">';
				html+= '<span class="qlsmalllevel" width: 0%">';
				html+= '</span></span><strong id="totalDamageQ0">0</strong> (<span id="totalDamagefQ0">0</span>)<br/>';

				html+= '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
				html+= '<span class="qlsmalllevel" style="width: 20%">';
				html+= '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
				html+= '</span></span><strong id="totalDamageQ1">0</strong> (<span id="totalDamagefQ1">0</span>)<br/>';
				
				html+= '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
				html+= '<span class="qlsmalllevel" style="width: 40%">';
				html+= '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
				html+= '</span></span><strong id="totalDamageQ2">0</strong> (<span id="totalDamagefQ2">0</span>)<br/>';
				
				html+= '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
				html+= '<span class="qlsmalllevel" style="width: 60%">';
				html+= '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
				html+= '</span></span><strong id="totalDamageQ3">0</strong> (<span id="totalDamagefQ3">0</span>)<br/>';
				
				html+= '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
				html+= '<span class="qlsmalllevel" style="width: 80%">';
				html+= '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
				html+= '</span></span><strong id="totalDamageQ4">0</strong> (<span id="totalDamagefQ4">0</span>)<br/>';
				
				html+= '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
				html+= '<span class="qlsmalllevel" style="width: 100%">';
				html+= '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
				html+= '</span></span><strong id="totalDamageQ5">0</strong> (<span id="totalDamagefQ5">0</span>)<br/>';

				html+= '</td></tr>'
				html+= '</table>'

				var displayEl = document.createElement("div");
				displayEl.setAttribute('class', 'core');
				displayEl.setAttribute('style', 'padding-bottom:10px;');
				displayEl.setAttribute('align', 'center');
				displayEl.innerHTML = html;
				latest=document.getElementById('footer');
				latest.parentNode.insertBefore(displayEl, latest);
			}
			totalDamage()
		}
	});
}

function $(A) {
	return document.getElementById(A);
}

function Main(e) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://sjeb.freehostia.com/members/spisak.html',
		onload:function(response) {
			var spisak_string = response.responseText.match('class="spisak".*?#');
			spisak_string = spisak_string.join("");
			spisak_string = spisak_string.substring(spisak_string.indexOf('>')+1,spisak_string.length-1);
			
			var fo = spisak_string.split('|');
			var f = null
			f = eval(fo)
			fetchCitizensWellness (f)
		}
	});
}

window.addEventListener('load', Main, false);
