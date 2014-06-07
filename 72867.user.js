// ==UserScript==
// @author         junecaz
// @name           br-army pelotao-7
// @namespace      http://www.erepublik.com/en/citizen/profile/439192
// @description    br-army pelotao-7
// @version        0.2
// @include        http://*.erepublik.com/en
// @include        http://*.erepublik.com/pt
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// Common variables
// ===============================================================================

var html = '<embed width="500" height="30" src="/flash/delicious.swf" quality="best" flashvars="txt=Exército Brasileiro - Pelotão 7&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nMembers
var count = 0
var onlineNowCount = 0
var offlineNowCount = 0
var MembersMap = new Array();
var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Colonel','General','Field Marshal']
var levelCap = ['0','0','7','10','15','25','35','40','50','65','80','90','100','125','200','300','500','750','1000','1500','2000','3000','5000','7000','10000','15000','20000','25000','30000','40000','50000']
var rankCap = ['0','0','250','750','1500','4500','9000','25000','75000']
var iconOnline = "data:image/gif;base64,R0lGODlhDgAOALMAAJXiQsjwndz1wZrjS%2Fb976nnZqPmWszxpOL3zK3obJfjRtDyq932w%2BX40P%2F%2F%2FwAAACH5BAEHAA4ALAAAAAAOAA4AAARI0El3EgDpzNnM%2FYDRTAxoAoxDDCc4EAEYSPEXFN%2ByLV%2BhfBvJZ8C6BB1D3EU34V0KtYuGIlu1hgSH4HoRTBAekwFxDFgws0kEADs%3D"
var iconOffline = "data:image/gif;base64,R0lGODlhDgAOAKIAAPT09OLi4u3t7f%2F%2F%2F9vb2wAAAAAAAAAAACH5BAAAAAAALAAAAAAOAA4AAAM0ODoSREGsBdy7AdDLrx5dSDCcRF4NOgkYNyni%2BHIWYSrsE5U4H7sDwI%2FwCdYwxUUKchskAAA7"
var iconWorker = "data:image/gif;base64,R0lGODlhDwAPANUAAFFRUfM4O8aYmZeenvrFxu4kJ%2F67vPzQ0f%2F8%2FPQZHMnLy%2FiipPeSlGhoaO0UFwQVFP%2F6%2Bv7z8%2FETFjc3N%2FJbXvJSVP7t7ioqKoSMjOwIC%2FUWGq2Cg%2FNtb%2BwOEvaMjj9DQ%2B8uMfvP0P3f4I6OjvE9QO3z8vIMD%2F7v8NiTlfQQE%2BZ5e%2Fq%2FwPNvcf3f3xwhIfRCRfj%2B%2Fql%2BftHT0%2F3g4ODv7%2FNgY9qsrftsbuHh4X5%2Ff%2F6oqYqDhPinqfNxcwAAAP%2F%2F%2FyH5BAAAAAAALAAAAAAPAA8AAAaVwJ9wCPFAhsjkIXNIOhGgAgjhRC4Ks8KiKoxkeD9dJsLlvISyAKfaSgk%2BAJfNJHKSboOLL%2FerkZIrDhYYPh8jPxEOK0QOHj8NLhcNOBgqCUc%2FDAUIAxMKEzgTPjsBDD8WGQY0HyUwHwo%2BPg8oKScUAQcHNiEHAgIbGzE2JBQVDh0dEsgaEhoJCRIOFQQsPdbX2D0cK0EAOw%3D%3D"
var iconNoWorker = "data:image/gif;base64,R0lGODlhDwAPANUAAMfHx39%2Ff7a2tsTExLKysri4uP39%2FdHR0bS0tLOzs%2FX19cPDw%2Fv7%2B%2BXl5bm5ucvLy6CgoLGxscLCwpycnNXV1evr6%2Fn5%2Bd3d3cnJybq6utvb2%2Brq6r%2B%2Fv5aWltfX17e3t%2FHx8eHh4c3NzePj49%2Ff34aGhqioqOnp6cHBwZ%2Bfn9PT0729vZmZmY6OjoKCgpKSks7Ozuzs7O7u7ru7u%2Fr6%2BvT09Pj4%2BOTk5Nzc3JCQkMrKyv7%2B%2FrW1tfDw8NLS0v%2F%2F%2FyH5BAAAAAAALAAAAAAPAA8AAAaTwJ9waNDshshkL9JLOncrB%2BfoHIZmikyoKmQQRr8GgcE9DIQnjq%2Bq4FEgptwFoXBKfI9XgPMTLZIVPBYDARAAPwwCG0QCGj8ILR0EIAs%2BDlQ4GTswLA0TMhMBEgMXPxYRGzUQNgYpNy4BJR48NA8oPT0huCoUGAAAJAsPOjwJCQIICR8CBc08PBgxBz7U1dY%2BBxVBADs%3D"
var iconUnemployed = "data:image/gif;base64,R0lGODlhDwAPANUAAPJLJO8sIemoK%2F%2FHMQ0LAv%2B7MP3l5v7t7fyiLe0dJdOcKPqztf%2F7%2B%2FJETfmFKu0RH%2Fl5Kf%2B5L%2F%2FCMPVnJ%2FmNK%2FR0ev2yL%2FA5Q%2Fu3ucqWJvJOV%2FeTl%2B0TJOwOH8%2BWJu0WH%2FmZnPmhpO4jIOV%2FJ%2F%2BZLfRXXvezLptwHfzDxT8tDP3c3e8lM%2F3T1PCuLMGTJe4fL8iZJvZ7gd%2BhKfeLkfu5u%2FRYYPVrcPo%2FJPRWJe0bH%2FzY2e81PvmOK%2BwPHvRxeP%2F%2F%2FyH5BAAAAAAALAAAAAAPAA8AAAaRwJ9waNgYhsjkJjFLOlUJUULlRNoCiECtKkR1IANIB1NlNG4eQua2YzhDDx6M4CI9QMnDCjBQEDwDOC8HSDE5CBICBDISCAkVQzocExIFLSkCBRITHCxCJQEWBREmJyYRERYBGj80Dw4Dmn4ZlQMODwsXATy8PBQjFL08ATsaHz3IyA%2FJyB8NGBU%2B0tPUPhULQQA7"

function fetchMembers(ids) {
	nMembers = ids.length
	html += '<table style="color: rgb(153, 153, 153);">'
	html += '<tr>'
	html += '<th style="text-align: left; background: rgb(220,220,220); padding: 2px">No.</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: left; background: rgb(220,220,220); padding: 2px">Name</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Level</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Wellness</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Location</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Citiz.</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Strength</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Exp</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Rank</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Damage</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Skill</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '</tr>'
	
	for(var i=0;i<ids.length;i++) {
		fetchMember(ids[i])
	}
}

function nameFix(name) {
	name = name.replace(/Bosnia and Herzegovina/, "Bosnia-Herzegovina");
	name = name.replace(/Moscow and Central Russia/, "Moscow-and-Central-Russia");
	name = name.replace(/&/g, "").replace(/ /g, "-").replace(/--/g, "-");
	return (name)
}

function nameFix2(name2) {
	name2 = name2.replace(/Bosnia and Herzegovina/, "Republika Srpska");
	return (name2)
}

function formatWellness(data) {
	if (data < 80 && data > 50) {
		dataFormat = ' color:#FF9900; font-weight: bold"'
	} else if (data < 50) {
		dataFormat = ' color:#CC0000; font-weight: bold"'
	} else {
		dataFormat = '"'
	}
	return (dataFormat)
}

function formatNumber(number) {
	number = parseFloat(number)
	number = number.toFixed(2)
	number += ''
	return (number)
}

function memberRank(rank) {
	if (rank.toLowerCase() == "field marshal") {
		var cRank = "fieldmarshal"
	} else {
		var cRank = rank.toLowerCase()
	}
	return (cRank)
}

function formatExp(level, experience) {
	level = level + 1
	if (experience > (parseFloat(levelCap[level]) - (parseFloat(levelCap[level]) * 0.1))) {
		expFormat = ' color:#339900; font-weight: bold"'
	} else {
		expFormat = '"'
	}
	return (expFormat)
}

function formatRank(rank, damage) {
	rank = ranks.indexOf(rank) + 2
	if (damage > (parseFloat(rankCap[rank]) - (parseFloat(rankCap[rank]) * 0.1))) {
		rankFormat = ' color:#339900; font-weight: bold"'
	} else {
		rankFormat = '"'
	}
	return (rankFormat)
}

function onlineStatus(id) {
	var myCounter = 0
	while (myCounter < 3) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.erepublik.com/en/citizen/profile/'+id+'.html',
			onload:function(response2) {
				try {
					if (response2.responseText.match('offline')) {
						var onlineString = '<img src="'+iconOffline+'">'
						offlineNowCount = offlineNowCount + 0.33
					} else {
						var onlineString = '<img src="'+iconOnline+'">'
						onlineNowCount = onlineNowCount + 0.33
					}
					$('onlineImage_'+id).innerHTML = onlineString;
					$('offlineNow').innerHTML = Math.ceil(offlineNowCount);
					$('onlineNow').innerHTML = Math.ceil(onlineNowCount);
				}
				catch(err) {
				}
			}
		});
		myCounter++;
	}
}

function fetchMember(id) {
	var Member = null
	OrderNumber = 1
	totalStrength = 0
	avStrength = 0
	tCons = 0
	tManu = 0
	tLand = 0
	
	fmRank = 0
	generalRank = 0
	colonelRank = 0
	captainRank = 0
	lieutenantRank = 0
	sergeantRank = 0
	corporalRank = 0
	privateRank = 0
	
	tDamageQ0 = 0
	tDamageQ1 = 0
	tDamageQ2 = 0
	tDamageQ3 = 0
	tDamageQ4 = 0
	tDamageQ5 = 0
	
	tFullDamageQ0 = 0
	tFullDamageQ1 = 0
	tFullDamageQ2 = 0
	tFullDamageQ3 = 0
	tFullDamageQ4 = 0
	tFullDamageQ5 = 0
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
		onload:function(response) {
			try {
				Member = eval('(' + response.responseText + ')')
				var sName = " "
				var sValue = 0
				var memberSkillNameIn = " "
				var memberSkillValueIn = " "
				var consValueIn = 0
				var manuValueIn = 0
				var landValueIn = 0
				var wellBonus = 1 + (Member.wellness - 25) / 100
				var strBonus = Member.strength
				var rnkBonus = (ranks.indexOf(Member.military_rank) + 1) * 0.2 + 1
				var workerImg = ""
				
				totalStrength = totalStrength + Member.strength
				
				//=============== Skill =====================
				var memberSkillsIn = eval(Member.skills)
			
				for (var i=0; i < memberSkillsIn.length; i++) {
					memberSkillNameIn = memberSkillsIn[i].domain
					memberSkillValueIn = memberSkillsIn[i].value
					
					if (memberSkillNameIn == "constructions") {
						consValueIn = formatNumber(memberSkillValueIn)
					} else if (memberSkillNameIn == "manufacturing") {
						manuValueIn = formatNumber(memberSkillValueIn)
					} else if (memberSkillNameIn == "land") {
						landValueIn = formatNumber(memberSkillValueIn)
					}
				}
						
				if (consValueIn >= manuValueIn && consValueIn >= landValueIn) {
					sName = "Constructions"
					sValue = consValueIn
					tCons = tCons + 1
				} else if (manuValueIn >= landValueIn) {
					sName = "Manufacturing"
					sValue = manuValueIn
					tManu = tManu + 1
				} else {
					sName = "Land"
					sValue = landValueIn
					tLand = tLand + 1
				}
				
				//=============== Rank ======================
				var cRank = Member.military_rank
				if (cRank.toLowerCase() == "field marshal") {
					fmRank = fmRank + 1
				} else if (cRank.toLowerCase() == "general") {
					generalRank = generalRank + 1
				} else if (cRank.toLowerCase() == "colonel") {
					colonelRank = colonelRank + 1
				} else if (cRank.toLowerCase() == "captain") {
					captainRank = captainRank + 1
				} else if (cRank.toLowerCase() == "lieutenant") {
					lieutenantRank = lieutenantRank + 1
				} else if (cRank.toLowerCase() == "sergeant") {
					sergeantRank = sergeantRank + 1
				} else if (cRank.toLowerCase() == "corporal") {
					corporalRank = corporalRank + 1
				} else if (cRank.toLowerCase() == "private") {
					privateRank = privateRank + 1
				}
				
				//=============== Damage ====================
				for (i=1; i<=5; i++) {
					tFullDamageQ0 = tFullDamageQ0 + Math.ceil(0.5 * rnkBonus * strBonus * (1.85 - i * 0.1) * 2)
					tFullDamageQ1 = tFullDamageQ1 + Math.ceil(1.2 * rnkBonus * strBonus * (1.85 - i * 0.1) * 2)
					tFullDamageQ2 = tFullDamageQ2 + Math.ceil(1.4 * rnkBonus * strBonus * (1.85 - i * 0.1) * 2)
					tFullDamageQ3 = tFullDamageQ3 + Math.ceil(1.6 * rnkBonus * strBonus * (1.85 - i * 0.1) * 2)
					tFullDamageQ4 = tFullDamageQ4 + Math.ceil(1.8 * rnkBonus * strBonus * (1.85 - i * 0.1) * 2)
					tFullDamageQ5 = tFullDamageQ5 + Math.ceil(2 * rnkBonus * strBonus * (1.85 - i * 0.1) * 2)
				}
				
				if (Member.wellness >= 90) {
					for (i=1; i<=5; i++) {
						tDamageQ0 = tDamageQ0 + Math.ceil(0.5 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ1 = tDamageQ1 + Math.ceil(1.2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ2 = tDamageQ2 + Math.ceil(1.4 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ3 = tDamageQ3 + Math.ceil(1.6 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ4 = tDamageQ4 + Math.ceil(1.8 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ5 = tDamageQ5 + Math.ceil(2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
					}
				} else if (Member.wellness >= 80 && Member.wellness < 90) {
					for (i=1; i<=4; i++) {
						tDamageQ0 = tDamageQ0 + Math.ceil(0.5 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ1 = tDamageQ1 + Math.ceil(1.2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ2 = tDamageQ2 + Math.ceil(1.4 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ3 = tDamageQ3 + Math.ceil(1.6 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ4 = tDamageQ4 + Math.ceil(1.8 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ5 = tDamageQ5 + Math.ceil(2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
					}
				} else if (Member.wellness >= 70 && Member.wellness < 80) {
					for (i=1; i<=3; i++) {
						tDamageQ0 = tDamageQ0 + Math.ceil(0.5 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ1 = tDamageQ1 + Math.ceil(1.2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ2 = tDamageQ2 + Math.ceil(1.4 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ3 = tDamageQ3 + Math.ceil(1.6 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ4 = tDamageQ4 + Math.ceil(1.8 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ5 = tDamageQ5 + Math.ceil(2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
					}
				} else if (Member.wellness >= 60 && Member.wellness < 70) {
					for (i=1; i<=2; i++) {
						tDamageQ0 = tDamageQ0 + Math.ceil(0.5 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ1 = tDamageQ1 + Math.ceil(1.2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ2 = tDamageQ2 + Math.ceil(1.4 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ3 = tDamageQ3 + Math.ceil(1.6 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ4 = tDamageQ4 + Math.ceil(1.8 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
						tDamageQ5 = tDamageQ5 + Math.ceil(2 * rnkBonus * strBonus * ((wellBonus + 0.1) - i * 0.1) * 2)
					}
				} else if (Member.wellness >= 50 && Member.wellness < 60) {
					tDamageQ0 = tDamageQ0 + Math.ceil(0.5 * rnkBonus * strBonus * wellBonus * 2)
					tDamageQ1 = tDamageQ1 + Math.ceil(1.2 * rnkBonus * strBonus * wellBonus * 2)
					tDamageQ2 = tDamageQ2 + Math.ceil(1.4 * rnkBonus * strBonus * wellBonus * 2)
					tDamageQ3 = tDamageQ3 + Math.ceil(1.6 * rnkBonus * strBonus * wellBonus * 2)
					tDamageQ4 = tDamageQ4 + Math.ceil(1.8 * rnkBonus * strBonus * wellBonus * 2)
					tDamageQ5 = tDamageQ5 + Math.ceil(2 * rnkBonus * strBonus * wellBonus * 2)
				}
				
				//=============== Employment Image ==========
				if (Member.employer) {
					if (Member.employer.match('-#-')) {
						workerImg = '<img title="Funcionário de Estatal '+Member.employer+'" src="'+iconWorker+'">'
					} else {
						workerImg = '<img title="Não é funcionário de nenhuma Estatal!" src="'+iconNoWorker+'">'
					}
				} else {
					workerImg = '<img title="Desempregado" src="'+iconUnemployed+'">'
				}
				
				html += '<tr>'
				html += '<td style="text-align: center">'+OrderNumber+'</td>'
				html += '<td style="text-align: center" width="30px"><span id="onlineImage_'+Member.id+'">&nbsp;</span></td>'
				onlineStatus(Member.id)
				html += '<td style="text-align: center" width="30px"><a href="http://www.erepublik.com/citizen/images?id='+Member.id+'" target="_blank"><img src="'+Member.avatar_link+'" height="14px" width="14px"></a></td>'
				html += '<td><a href="/en/citizen/profile/'+Member.id+'">'+Member.name+'</a></td>'
				html += '<td style="text-align:center">'+Member.level+'</td>'
				html += '<td style="padding-right: 10px; text-align:right;'+formatWellness(formatNumber(Member.wellness))+'>'+formatNumber(Member.wellness)+'</td>'
				html += '<td style="text-align: left"><p style="white-space: nowrap; width: 200px; overflow: hidden;"><img title="'+nameFix2(Member.country)+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Member.country)+'.gif" height="14px"> <a title="'+nameFix2(Member.country)+'" href="/en/country/'+nameFix(Member.country)+'">'+nameFix2(Member.country)+'</a>, <a title="'+nameFix2(Member.region)+'" href="/en/region/'+nameFix(Member.region)+'">'+Member.region+'</a></p></td>'
				html += '<td align="center"><a title="'+nameFix2(Member.citizenship["country"])+'" href="/en/country/'+nameFix(Member.citizenship["country"])+'"><img title="'+nameFix2(Member.citizenship["country"])+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Member.citizenship["country"])+'.gif" height="14px"></a></td>'
				html += '<td style="padding-right: 10px; text-align: right">'+formatNumber(Member.strength)+'</td>'
				html += '<td style="padding-right: 5px; text-align: right;'+formatExp(Member.level, Member.experience_points)+'>'+Member.experience_points+'</td>'
				html += '<td align="center" style="padding-left: 4px"><img title="'+Member.military_rank+'" src="http://www.erepublik.com/images/parts/icon_position_military_'+memberRank(Member.military_rank)+'.gif" width="15px" height="15px"></td>'
				html += '<td style="padding-right: 4px; text-align: right;'+formatRank(Member.military_rank, Member.damage)+'>'+Member.damage+'</td>'
				html += '<td>'
				html += '<table>'
				html += '<tr>'
				html += '<td width="20px" align="center" style="padding-left: 3px"><img title="'+sName+'" src="http://www.erepublik.com/images/parts/icon_skill_'+sName.toLowerCase()+'.gif" width="15px" height="15px"></td>'
				html += '<td width="30px" align="right" style="text-align:right">'+sValue+'</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '<td width="30px" align="left" style="text-align:left; padding-left: 5px">'+workerImg+'</td>'
				html += '<td style="text-align:center"><a title="Donate" id="Donate" href="/en/citizen/donate/items/'+Member.id+'"><img src="/images/parts/icon-gold.gif" width="14px" height="14px"></a></td>'
				html += '<td align="center"><div id="miniprofile" style="width: 25px; text-align:center"><a title="Write message" class="msg" href="/en/messages/compose/'+Member.id+'"></a></div>'
				html += '</td>'
				html += '</tr>'

				MembersMap[id] = Member
			}
			catch(err) {
			}
			OrderNumber = OrderNumber + 1
			if (++count==nMembers) {
				avStrength = totalStrength / nMembers
				html += '<tr>'
				html += '<td colspan="16" align="center">'
				html += '<table width="100%">'
				html += '<tr style="background: rgb(220,220,220);">'
				html += '<td width="80px" style="text-align: center;">Online now</td>'
				html += '<td width="80px" style="text-align: center;">Offline now</td>'
				html += '<td style="text-align: center;">Rank summary</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td width="80px" align="center" valign="middle"><strong style="font-size:22px" id="onlineNow">0</strong></td>'
				html += '<td width="80px" align="center" valign="middle"><strong style="font-size:22px" id="offlineNow">0</strong></td>'
				html += '<td align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Field Marshals</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Generals</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Colonels</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Captains</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Lieutenants</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Sergeants</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Corporals</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Privates</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Field Marshal" src="http://www.erepublik.com/images/parts/icon_position_military_fieldmarshal.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+fmRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="General" src="http://www.erepublik.com/images/parts/icon_position_military_general.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+generalRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Colonel" src="http://www.erepublik.com/images/parts/icon_position_military_colonel.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+colonelRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Captain" src="http://www.erepublik.com/images/parts/icon_position_military_captain.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+captainRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Lieutenant" src="http://www.erepublik.com/images/parts/icon_position_military_lieutenant.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+lieutenantRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Sergeant" src="http://www.erepublik.com/images/parts/icon_position_military_sergeant.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+sergeantRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Corporal" src="http://www.erepublik.com/images/parts/icon_position_military_corporal.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+corporalRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Private" src="http://www.erepublik.com/images/parts/icon_position_military_private.gif" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+privateRank+'</span></td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '<tr style="background: rgb(220,220,220);">'
				html += '<td colspan="4" style="text-align: center;">Average strength</td>'
				html += '<td colspan="7" style="text-align: center;">Skill summary</td>'
				html += '<td colspan="5" style="text-align: center;">Unit damage (full)</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td colspan="4" align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td width="100" align="center" valign="middle"><img title="Average strength" src="http://www.erepublik.com/images/parts/icon_skill_strenght.gif" width="40px" height="40px" alt=""><br />'
				html += '<strong style="font-size:22px" id="averStrength">'+formatNumber(avStrength)+'</strong>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '<td colspan="7" align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td width="150px" colspan="2" align="center" valign="middle" nowrap="nowrap">Manufacturing</td>'
				html += '<td width="150px" colspan="2" align="center" valign="middle" nowrap="nowrap">Land</td>'
				html += '<td width="150px" colspan="2" align="center" valign="middle" nowrap="nowrap">Constructions</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td width="75px" align="right" valign="middle" nowrap="nowrap"><img title="Manufacturing" src="http://www.erepublik.com/images/parts/icon_skill_manufacturing.gif" width="40px" height="40px">&nbsp;</td>'
				html += '<td width="75px" align="left">&nbsp;<span style="font-size: 18px">'+tManu+'</span></td>'
				html += '<td width="75px" align="right" valign="middle" nowrap="nowrap"><img title="Land" src="http://www.erepublik.com/images/parts/icon_skill_land.gif" width="40px" height="40px">&nbsp;</td>'
				html += '<td width="75px" align="left">&nbsp;<span style="font-size: 18px">'+tLand+'</span></td>'
				html += '<td width="75px" align="right" valign="middle" nowrap="nowrap"><img title="Constructions" src="http://www.erepublik.com/images/parts/icon_skill_constructions.gif" width="40px" height="40px">&nbsp;</td>'
				html += '<td width="75px" align="left">&nbsp;<span style="font-size: 18px">'+tCons+'</span></td>'
				html += '</tr>'
				html += '</table></td>'
				html += '<td colspan="5" align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td valign="middle">'
				html += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px"><span class="qlsmalllevel" style="width: 0%"><img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif"></span></span><strong id="totalDamageQ0">'+tDamageQ0+'</strong> (<span id="totalDamagefQ0">'+tFullDamageQ0+'</span>)<br/>'
				html += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px"><span class="qlsmalllevel" style="width: 20%"><img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif"></span></span><strong id="totalDamageQ1">'+tDamageQ1+'</strong> (<span id="totalDamagefQ1">'+tFullDamageQ1+'</span>)<br/>'
				html += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px"><span class="qlsmalllevel" style="width: 40%"><img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif"></span></span><strong id="totalDamageQ2">'+tDamageQ2+'</strong> (<span id="totalDamagefQ2">'+tFullDamageQ2+'</span>)<br/>'
				html += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px"><span class="qlsmalllevel" style="width: 60%"><img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif"></span></span><strong id="totalDamageQ3">'+tDamageQ3+'</strong> (<span id="totalDamagefQ3">'+tFullDamageQ3+'</span>)<br/>'
				html += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px"><span class="qlsmalllevel" style="width: 80%"><img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif"></span></span><strong id="totalDamageQ4">'+tDamageQ4+'</strong> (<span id="totalDamagefQ4">'+tFullDamageQ4+'</span>)<br/>'
				html += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px"><span class="qlsmalllevel" style="width: 100%"><img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif"></span></span><strong id="totalDamageQ5">'+tDamageQ5+'</strong> (<span id="totalDamagefQ5">'+tFullDamageQ5+'</span>)<br/>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				
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
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.erepublikbrasil.com/forum/index.php?topic=3028.msg42159',
		onload:function(response) {
			var spisak_string = response.responseText.match('id="msg_42279".*?#');
			spisak_string = spisak_string.join("");
			spisak_string = spisak_string.substring(spisak_string.indexOf('>')+1,spisak_string.length-1);
			
			var fo = spisak_string.split('|');
			var f = null
			f = eval(fo)
			fetchMembers(f)
		}
	});
}

window.addEventListener('load', Main, false);

// ===============================================================================
// License and Disclaimer
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty.
// Use on your own responsibility.
// ===============================================================================