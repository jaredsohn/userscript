// ==UserScript==
// @author         Contele Draqula
// @name           eRepublik Military Tracker
// @namespace      http://www.erepublik.com/en/citizen/profile/2296449
// @description    eRepublik Military Tracker, you can follow other players wellness and location, fights, damage, and also calculate the damage per fight and total damage! Add players using id
// @version        1.0
// @include        http://*.erepublik.com/en
// @include        http://*.erepublik.com/ro
// ==/UserScript==

// ===============================================================================
// License and Disclaimer
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty.
// Use on your own responsibility.
// ===============================================================================

var html = '<embed width="500" height="30" src="/flash/delicious.swf" quality="best" flashvars="txt=Citizen Military Tracker v3.0.1&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nCitizens
var count = 0
var CitizensMap = new Array();

function fetchCitizensWellness (ids)
{
	nCitizens = ids.length
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="background: rgb(220,220,220);padding:2px">Sl No.</th><th style="background: rgb(220,220,220);padding:2px">Name</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Wellness</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Location</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Strength</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Rank</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Total Fights</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Damage</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Donate</th><th style="text-align:center;background: rgb(220,220,220);">&nbsp;Message</th><th style="text-align:center;background: rgb(220,220,220);">'+
		'&nbsp;Delete</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Weapon</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Damage per Fight</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Fights</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">Total Damage</th></tr><ul id="nav"><li id="menu7">'
	for(var i=0;i<ids.length;i++) {
		fetchCitizenWellness(ids[i])
	}
}

function addCitizen(e) {
    e.stopPropagation( );
	e.preventDefault( );
	var fo = GM_getValue("Citizens", null);
	var f = null
	if (fo==null) {
		f = new Array()
	} else {
		f = eval(fo)
	}
	f.push(document.getElementById('newCitizen').value)
	GM_setValue("Citizens", uneval(f))
   	f = eval(GM_getValue("Citizens", null))
   	window.location.reload()
}

function removeCitizen(e) {
    e.stopPropagation( )
	e.preventDefault( )
	var ids = this.toString().split("/")
	removeFromArray(ids[ids.length-1])
	window.location.reload()
	return false
}

function removeFromArray(id) {
	var f = eval(GM_getValue("Citizens", null))
	var index = f.indexOf(id)
	f.splice(index,1)
	GM_setValue("Citizens", uneval(f));
}

function fetchCitizenWellness(id)
{
	var Citizen = null
        SlNumber = 1
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
            onload:function(response)
            {

				try {
					Citizen = eval('(' + response.responseText + ')')
					html += '<tr><td style="text-align:center">'+SlNumber+'</td><td><a href="/en/citizen/profile/'+Citizen.id+'">'+Citizen.name+'</a></td><td style="text-align:center">'+Citizen.wellness+
					'</td><td style="text-align:center">'+Citizen.country+'</td><td style="text-align:center">'+Citizen.strength+
					'</td><td style="padding-left: 4px">'+Citizen.military_rank+'</td><td style="text-align:center">'+Citizen.fights+'</td><td style="padding-left: 4px">'+Citizen.damage+
					'</td><td style="text-align:center"><a id="Donate" href="/en/citizen/donate/items/'+Citizen.id+'"><img src="/images/parts/icon-gold.gif" width="14" height="16"</a></td><td style="text-align:center"><div id="miniprofile" style="width: 25px"><a class="msg" href="/en/messages/compose/'+Citizen.id+'"></a></div>'+
					'</td><td style="text-align:center"><a id="'+id+'_id" href="'+id+'" style="padding-left: 4px">X</a>'+
					'</td><select  style="text-align:center" id="weapon_'+id+'"><option value="0">None</option><option value="1">Q1</option><option value="2">Q2</option>'+
					'<option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>'+
					'</td><td style="text-align:center" id="dam_'+id+'" style="padding-left: 4px; color:#000;text-align:right;">0'+
					'</td><select style="text-align:center"  id="amm_'+id+'"><option value="0">0</option><option value="1">1</option><option value="2">2</option>'+
					'<option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select>'+
					'</td><td  style="text-align:center" id="tdam_'+id+'" style="padding: 0 4px 0 4px; color:#000;text-align:right;">0'+
					'</td></tr>'
					CitizensMap[id]=Citizen
				} catch(err) {

					removeFromArray(id)
				}
				SlNumber = SlNumber + 1
				if (++count==nCitizens) {
					html+='<td colspan="10" style="text-align: right">Total damage of this military unit is: </td><td id="unittotal" style="font-size:1.1em;padding-left: 4px; color:#000;text-align:right;">0</td>'
                                        html+= '</li></ul></table>'
					html+= '<form id="CitizenForm" action="#">'+
						'<input type="text" name="fname" id="newCitizen" /><input type="submit" value="add more"/><br />Please help out the The project by Donationg and Suscribing to our Newspaper<br /></form> '
					var displayEl = document.createElement("div");
					displayEl.setAttribute('class', 'core');
				    displayEl.setAttribute('style', 'padding-bottom:10px;');
				    displayEl.innerHTML = html;
				    latest=document.getElementById('content');
				    latest.parentNode.insertBefore(displayEl, latest);


					$('CitizenForm').addEventListener('submit', addCitizen, true);
					var fo = GM_getValue("Citizens", null)
					if (fo!=null) {
						var f = eval(fo)
						for (var i=0;i<f.length;i++) {
							if ( $(f[i]+"_id") != null) {
								$(f[i]+"_id").addEventListener("click", removeCitizen, true)
							}
						}
					}

				}
				changePop()
            }
        }
    );
}

function $(A) {return document.getElementById(A);}

function Main(e) {
   var fo = GM_getValue("Citizens", null)
   var f = null
   if (fo!=null) {
		f = eval(fo)
   } else {
	f = new Array();
	GM_setValue("Citizens", uneval(f))
   }
   if (f.length==0) {
		f.push('xsxsxsxsxsxsxs')
   }
   fetchCitizensWellness (f)
}

var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Colonel','General','Field Marshal']
function changePop() {
	var unittotal=0
	for (var id in CitizensMap) {
		var R = 1+(ranks.indexOf(CitizensMap[id].military_rank)+1)/5.0
		var weap = ($('weapon_'+id).value)
		var Q=0.5
		if (weap>0) {
			Q=1+(weap/5.0)
		}
		var S=CitizensMap[id].strength
		var W = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
		var damage = R*Q*S*W*2

		$('dam_'+id).innerHTML = Math.round(damage)

		var We = CitizensMap[id].wellness
		var tdamage = 0
		var x = ($('amm_'+id).value)
		for(var y=0;y<x;y++){
		var Re = 1+(ranks.indexOf(CitizensMap[id].military_rank)+1)/5.0
		var weape = ($('weapon_'+id).value)
		var Qe=0.5
		if (weape>0) {
			Qe=1+(weap/5.0)
		}
		var Se=CitizensMap[id].strength
		var Wx = 1 + ((We - 25) / 100.0)
		var xdamage = Re*Qe*Se*Wx*2
		tdamage = tdamage + xdamage
		We = We - 10
		$('tdam_'+id).innerHTML = Math.round(tdamage)
		}
                unittotal+=Math.round(tdamage)
	}
        $('unittotal').innerHTML = unittotal

}

window.addEventListener('load', Main, false);
window.addEventListener('change', changePop, true);