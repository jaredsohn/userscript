// ==UserScript==
// @name           eRepublik Unit Leader
// @namespace      http://raulhacks.blogspot.com/
// @description    eRepublik Monitor Players, you can follow other players wellness and location. Add players using id, not name. It can calculate damage
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/de
// ==/UserScript==

var html = '<embed width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=Unit leader&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nsailors
var count = 0

var sailorsMap = new Array();

function fetchSailorsWellness (ids)
{
	nsailors = ids.length
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="background: rgb(220,220,220);padding:2px">Name</th><th style="background: rgb(220,220,220);padding:2px">Ws.</th><th style="background: rgb(220,220,220);padding:2px">Location</th><th style="background: rgb(220,220,220);padding:2px">Str.</th><th style="background: rgb(220,220,220);padding:2px">Rank</th><th style="background: rgb(220,220,220);">&nbsp;x</th><th style="padding-right:20px;background: rgb(220,220,220);">'+
		'&nbsp;d</th><th style="text-align:center;background: #3cc;color: #fff">Weapon</th><th style="text-align:center;background: #3cc;color: #fff">dam</th><th style="text-align:center;background: #3cc;color: #fff">amm</th><th style="padding: 0 4px 0 4px;text-align:center;background: #3cc;color: #fff">tot dam</th></tr>'
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
					html += '<tr><td><a href="/en/citizen/profile/'+id+'">'+sailor.name+'</a></td><td style="padding-left: 4px">'+sailor.wellness+
					'</td><td style="padding-left: 4px">'+sailor.country+'</td><td style="padding-left: 4px">'+sailor.strength+
					'</td><td style="padding-left: 4px">'+sailor.military_rank+
					'</td><td><div id="miniprofile" style="width: 25px"><a class="msg" href="/en/messages/compose/'+id+'"></a></div>'+
					'</td><td><a id="'+id+'_id" href="'+id+'" style="padding-left: 4px">X</a>'+
					'</td><td style="padding-left: 20px;"><select id="weapon_'+id+'"><option value="0">None</option><option value="1">Q1</option><option value="2">Q2</option>'+
					'<option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>'+
					'</td><td id="dam_'+id+'" style="padding-left: 4px; color:#e66;text-align:right;">0'+
					'</td><td style="padding-left: 4px"><select id="amm_'+id+'"><option value="0">0</option><option value="1">1</option><option value="2">2</option>'+
					'<option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select>'+
					'</td><td id="tdam_'+id+'" style="padding: 0 4px 0 4px; color:#e66;text-align:right;">0'+
					'</td></tr>'
					sailorsMap[id]=sailor
				} catch(err) {
					//	should enter removible line ---
					removeFromArray(id) 
				}
				if (++count==nsailors) {
					html+='<td colspan="10" style="text-align: right">Total damage of the unit is: </td><td id="unittotal" style="font-size:1.1em;padding-left: 4px; color:#e66;text-align:right;">0</td>'
					html+= '</table>'
					html+= '<form id="sailorForm" action="#">'+
						'<input type="text" name="fname" id="newsailor" /><input type="submit" value="add more"/>* UPDATE: use names, no ids</form> '
					var displayEl = document.createElement("div");
					displayEl.setAttribute('class', 'core');
				    displayEl.setAttribute('style', 'padding-bottom:10px;');
				    displayEl.innerHTML = html;
				    latest=document.getElementById('content');
				    latest.appendChild(displayEl);
				    
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

var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Colonel','General','Field Marshal']
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