// ==UserScript==
// @name           eRepublik Monitor Players
// @namespace      http://raulhacks.blogspot.com/
// @description    eRepublik Monitor Players, you can follow other players wellness and location. Add players using id, not name.
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/de
// ==/UserScript==

var html = '<embed width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=Monitored players&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nsailors
var count = 0

function fetchSailorsWellness (ids)
{
	nsailors = ids.length
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="background: rgb(220,220,220);padding:2px">Name</th><th style="background: rgb(220,220,220);padding:2px">Ws.</th><th style="background: rgb(220,220,220);padding:2px">Location</th><th style="background: rgb(220,220,220);padding:2px">Str.</th><th style="background: rgb(220,220,220);padding:2px">Rank</th><th style="background: rgb(220,220,220);">&nbsp;x</th><th style="background: rgb(220,220,220);">&nbsp;d</th></tr>'
	for(var i=0;i<ids.length;i++) {
		var sailor = fetchSailorWellness(ids[i])
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
	GM_setValue("sailors", uneval(f));
   	f = eval(GM_getValue("sailors", null));
   	window.location.reload()
}

function removeSailor(e) {
    e.stopPropagation( );
	e.preventDefault( );
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
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+id+'.json',
            onload:function(response)
            {
				// todo think about bad request -
				try {
					sailor = eval('(' + response.responseText + ')')
					html += '<tr><td><a href="/en/citizen/profile/'+id+'">'+sailor.name+'</a></td><td style="padding-left: 4px">'+sailor.wellness+
					'</td><td style="padding-left: 4px">'+sailor.country+'</td><td style="padding-left: 4px">'+sailor.strength+
					'</td><td style="padding-left: 4px">'+sailor.military_rank+
					'</td><td><div id="miniprofile" style="width: 25px"><a class="msg" href="/en/messages/compose/'+id+'"></a></div>'+
					'</td><td><a id="'+id+'_id" href="'+id+'" style="padding-left: 4px">X</a></td></tr>'
				} catch(err) {
				//	should enter removible line ---
				}
				if (++count==nsailors) {
					html+= '</table>'
					html+= '<form id="sailorForm" action="#">'+
						'<input type="text" name="fname" id="newsailor" /><input type="submit" value="add more"/></form>'
					var displayEl = document.createElement("div");
					displayEl.setAttribute('class', 'core');
				    displayEl.setAttribute('style', 'padding-bottom:10px;');
				    displayEl.innerHTML = html;
				    latest=document.getElementById('latestnews');
				    latest.parentNode.insertBefore(displayEl, latest);
					// add events
				    var fo = GM_getValue("sailors", null)
					if (fo!=null) {
						var f = eval(fo)
						for (var i=0;i<f.length;i++) {
								$(f[i]+"_id").addEventListener("click", removeSailor, true)
						}
					} 
					   
				}
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
   }
   if (f.length==0) {
	f.push('x')
   }
   fetchSailorsWellness (f)
}

window.addEventListener('load', Main, false);
window.addEventListener('submit', addSailor, true);
