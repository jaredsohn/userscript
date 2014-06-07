// ==UserScript==
// @name           eRepublik Citizen Status
// @namespace      
// @description    Citizen Status
// @include        http://www.erepublik.com/en/badges
// ==/UserScript==



var html = '<embed width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=Citizen Status&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nsailors
var count = 0

var sailorsMap = new Array();

function fetchSailorsWellness (ids)
{
	nsailors = ids.length
	html += '<table style="color: rgb(6, 6, 6);"><tr><th style="background: rgb(130,130,130);padding:6px"></th><th style="background: rgb(130,130,130);padding:6px">Citizen</th><th style="background: rgb(130,130,130);padding:8px"></th><th style="background: rgb(130,130,130);padding:6px"></th><th style="background: rgb(130,130,130);padding:6px">Level</th><th style="background: rgb(130,130,130);padding:6px">Experience</th><th style="background: rgb(130,130,130);padding:2px">&nbsp; Wellness &nbsp;</th><th style="text-align:center;background: rgb(130,130,130);padding:2px">&nbsp Country &nbsp</th><th style="background: rgb(130,130,130);padding:2px">&nbsp; Strength &nbsp;</th><th style="background: rgb(130,130,130);padding:2px">&nbsp; Rank &nbsp;</th><th style="padding:2px;background: rgb(6,6,6);">'+
		'da </th></tr>'
	for(var i=0;i<ids.length;i++) {
		fetchSailorWellness(ids[i])
	}
}

function addSailor(e) {
    e.stopPropagation( );
	e.preventDefault( );
	var fo = GM_getValue("sailors", null);
	var f = null
	if (fo==null) {
		f = new Array()
	} else {
		f = eval(fo)
	}
	f.push(document.getElementById('newsailor').value)
	GM_setValue("sailors", uneval(f))
   	f = eval(GM_getValue("sailors", null))
   	window.location.reload()
}

function removeSailor(e) {
    e.stopPropagation( )
	e.preventDefault( )
	var strss = this.toString().split("/")
	removeFromArray(strss[strss.length-1])
	window.location.reload()
	return false
}

function removeFromArray(id) {
	var f = eval(GM_getValue("sailors", null))
	var index = f.indexOf(id)
	f.splice(index,1)
	GM_setValue("sailors", uneval(f));
}

function fetchSailorWellness(id) 
{
	var sailor = null
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json?by_username=true',
            onload:function(response)
            {
				// todo think about bad request -
				try {
					sailor = eval('(' + response.responseText + ')')
					html += '<tr><td style="text-align:center;background: rgb(200,200,200);padding:0px"><a href="/en/citizen/profile/'+sailor.id+
					'"><img src="' + sailor.avatar_link + '" height="25" width="25"></a></td><td style="text-align:center;background: rgb(200,200,200);padding:2px"><a href="/en/citizen/profile/'+sailor.id+
					'">'+sailor.name+'</a><td style="text-align:center;background: rgb(200,200,200);padding:2px"><div id="miniprofile" style="width: 20px"><a title="Donete" href="/en/citizen/donate/items/'+sailor.id+'"><img alt="Donate" src="/images/parts/gold-from.gif" /></a></div>'+
					'</td><td style="text-align:center;background: rgb(200,200,200);padding:2px"><div id="miniprofile" style="width: 20px"><a title="Message" class="msg" href="/en/messages/compose/'+sailor.id+'"></a></div>'+
					'</td></td style="text-align:center;background: rgb(200,200,200);padding:2px"><td style="text-align:center;background: rgb(220,220,220);padding:2px">'+ sailor.level +
					'</td><td style="text-align:center;background: rgb(200,200,200);padding:2px">'+ sailor.experience_points +
					'</td><td style="text-align:center;background: rgb(220,220,220);padding:2px">'+sailor.wellness+
					'</td><td><div style="text-align:center;background: rgb(200,200,200);padding:5px"><a class="flag" href="/en/country/'+sailor.country+'"><img title="'+sailor.country+'" alt="'+sailor.country+'" src="/images/flags/M/'+sailor.country+'.gif" /></a></div>'+'</td><td style="text-align:center;background: rgb(220,220,220);padding:2px"">'+sailor.strength+
					'</td><td style="text-align:center;background: rgb(200,200,200);padding:0px"><img title="'+ sailor.military_rank.toLowerCase() +'" alt="'+ sailor.military_rank.toLowerCase() +'"src="http://www.erepublik.com/images/parts/icon_position_military_' + sailor.military_rank.toLowerCase() + '.gif" width="25" height="20" alt="' + sailor.military_rank + '">'+
					'</td><td style="text-align:center;background: rgb(6,6,6);padding:2px"><a id="'+id+'_id" href="'+id+'" style="padding:4px">X</a>'+
					'</td></tr>'
					sailorsMap[id]=sailor
				} catch(err) {
					//	should enter removible line ---
					removeFromArray(id) 
				}
				if (++count==nsailors) {
									
					html+= '<td colspan="16" style="text-align: right;background: rgb(130,130,130);padding:1px"><form id="sailorForm" action="#">'+
						'<input type="text" name="fname" id="newsailor" /><input type="submit" value="add"/> *citizen name</form> </td>'
					html+= '</table>'
					var displayEl = document.createElement("div");
					displayEl.setAttribute('class', 'core');
				    displayEl.setAttribute('style', 'padding-bottom:10px;');
				    displayEl.innerHTML = html;
				    latest=document.getElementById('content');
				    latest.parentNode.insertBefore(displayEl, latest);
				    
					// add events
					$('sailorForm').addEventListener('submit', addSailor, true);
					var fo = GM_getValue("sailors", null)
					if (fo!=null) {
						var f = eval(fo)
						for (var i=0;i<f.length;i++) {
							if ( $(f[i]+"_id") != null) {
								$(f[i]+"_id").addEventListener("click", removeSailor, true)
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
   var fo = GM_getValue("sailors", null)
   var f = null
   if (fo!=null) {
		f = eval(fo)
   } else {
	f = new Array();
	GM_setValue("sailors", uneval(f))
   }
   if (f.length==0) {
		f.push('xsxsxsxsxsxsxs')
   }
   fetchSailorsWellness (f)
}

var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Colonel','General','fieldmarshal']
function changePop() {
	var unittotal=0
	for (var i in sailorsMap) {
		var R = 1+(ranks.indexOf(sailorsMap[i].military_rank)+1)/5.0
		var weap = ($('weapon_'+i).value)
		var Q=0.5
		if (weap>0) {
			Q=1+(weap/5.0)
		}
		var S=sailorsMap[i].strength
		var W = 1 + ((sailorsMap[i].wellness - 25) / 100.0)
		var damage = R*Q*S*W*2
		
		$('dam_'+i).innerHTML = Math.round(damage)
		
		var tdamage = damage * ($('amm_'+i).value)
		tdamage = Math.round(tdamage)
		$('tdam_'+i).innerHTML = tdamage
		unittotal += tdamage
	}
	$('unittotal').innerHTML = unittotal
}

window.addEventListener('load', Main, false);
window.addEventListener('change', changePop, true);