// ==UserScript==
// @author         ulla_ca
// @name           eRepublik Laskar Bocil Management
// @namespace      http://www.erepublik.com/en/organization/1724499
// @description    Laskar Bocil TM.
// @version        1.0.0
// @include        http://*.erepublik.com/en
// @include        http://*.erepublik.com/de
// @include        http://*.erepublik.com/es
// ==/UserScript==

var html = '<embed width="500" height="30" src="/flash/delicious.swf" quality="best" flashvars="txt=Komando Militer v1.0.0 by ulla ca&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nCitizens
var count = 0
var CitizensMap = new Array();

function fetchCitizensWellness (ids) {
	nCitizens = ids.length
	var tableConstant = '</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">'
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="text-align:center;background: rgb(220,220,220);padding:2px">&nbsp;</th><th style="background: rgb(220,220,220);padding:2px">No.</th><th style="background: rgb(220,220,220);padding:2px">Name'+tableConstant+'Level'+tableConstant+'Wellness'+tableConstant+'Location'+tableConstant+'Strength'+tableConstant+'Exp'+tableConstant+'Rank'+tableConstant+'Damage'+tableConstant+'Donate</th><th style="text-align:center;background: rgb(220,220,220);">&nbsp;Message</th></tr>'
	for(var i=0;i<ids.length;i++) {
		fetchCitizenWellness(ids[i])
	}
}

function nameFix(name) {
	name = name.replace(/Java and Sulawesi/, "Indonesia");
	name = name.replace(/Papau and Maluku/, "Indonesia");
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
				html += '<tr><td style="text-align:center"><a href="http://www.erepublik.com/citizen/images?id='+Citizen.id+'" target="_blank"><img src="'+Citizen.avatar_link+'" height="14" width="14"></a></td><td style="text-align:center">'+OrderNumber+'</td><td><a href="/en/citizen/profile/'+Citizen.id+'">'+Citizen.name+'</a></td><td style="text-align:center">'+Citizen.level+'</td>'+formatWellness(formatNumber(Citizen.wellness))+formatNumber(Citizen.wellness)+'</td><td style="text-align:left"><p style="white-space:nowrap; width:200px; overflow:hidden;"><img title="'+Citizen.country+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Citizen.country)+'.gif" height="15" alt=""> <a title="'+Citizen.country+'" href="/en/country/'+nameFix(Citizen.country)+'">'+Citizen.country+'</a>, <a title="'+Citizen.region+'" href="/en/region/'+nameFix(Citizen.region)+'">'+Citizen.region+'</a></p></td><td style="padding-right: 10px; text-align:right">'+formatNumber(Citizen.strength)+'</td><td style="padding-right: 5px; text-align:right">'+Citizen.experience_points+'</td><td align="center" style="padding-left: 4px"><img title="'+CitizenRankName+'" src="http://www.erepublik.com/images/parts/icon_position_military_'+CitizenRank.toLowerCase()+'.gif" width="15" height="15" alt=""></td><td style="padding-right: 4px; text-align: right">'+Citizen.damage+'</td><td style="text-align:center"><a title="Donate" id="Donate" href="/en/citizen/donate/items/'+Citizen.id+'"><img src="/images/parts/icon-gold.gif" width="14" height="16"</a></td><td align="center"><div id="miniprofile" style="width: 25px; text-align:center"><a title="Write message" class="msg" href="/en/messages/compose/'+Citizen.id+'"></a></div>'+'</td></tr>'
				CitizensMap[id]=Citizen
			}
			catch(err) {
			}
			OrderNumber = OrderNumber + 1
			if (++count==nCitizens) {
				html+='<tr style="background: rgb(220,220,220);"><td colspan="16">&nbsp;</td></tr>'
				html+= '</table>'

				var displayEl = document.createElement("div");
				displayEl.setAttribute('class', 'core');
				displayEl.setAttribute('style', 'padding-bottom:10px;');
				displayEl.setAttribute('align', 'center');
				displayEl.innerHTML = html;
				latest=document.getElementById('footer');
				latest.parentNode.insertBefore(displayEl, latest);
			}
		}
	});
}

function $(A) {
	return document.getElementById(A);
}

function Main(e) {
	var fo = ["2021473", "1329217", "1524735", "194761"]
	var f = null
	f = eval(fo)
	fetchCitizensWellness (f)
}

window.addEventListener('load', Main, false);