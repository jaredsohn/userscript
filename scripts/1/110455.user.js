// ==UserScript==
// @name           Pachfeed
// @namespace      quad
// @include        *wikipedia.*
// ==/UserScript==
sensorId = "29456"
var flele=document.createElement("floater")
flele.innerHTML = '<chunk id="ftab" style=" width: null; background: rgba(24,67,89,.85); border-width: 3px 3px medium; border-style: solid solid none; border-color: white; border-radius: 4px 4px 0pt 0pt; box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.25) inset, 0pt 1px 2px rgba(0, 0, 0, 0.5); font: bold 14px/1em Arial,sans-serif; position: fixed; right: 10px; bottom: 0pt; z-index: 9999; margin-bottom: 0px; display: block; !important;">\
<nybble id="ftabContent" style="display: block; color:black; padding: 3px 5px 3px 5px; text-decoration: none;">\
Pachube loading.\
</nybble>\
</chunk>'
document.body.appendChild(flele)

pachpg=GM_xmlhttpRequest({
	method:"GET",
	url:"http://pachube.com/feeds/" + sensorId,
	onerror: function(response) {document.getElementById("ftabContent").innerHTML= "Pachube load error."},
	onload:
	function(response) {
		r=response.responseText
		r=r.split('"datastream-title clearfix"')
		r.shift()
		o =new Array
		for (x in r) {
			s=r[x].slice(56);
			p=s.search('</');
			i=s.slice(0,p);
			s=s.slice(p+90);
			p=s.search('</');
			v=s.slice(0,p);
			p=s.search('class="units"')+14
			s=s.slice(p);
			p=s.search('</');
			u=s.slice(0,p);
			p=s.search('class="tag">')+12;
			s=s.slice(p);
			p=s.search('</');
			l=s.slice(0,p);
			o.push(i,l,v,u);
			}
		numstreams=(o.length) / 4
		out= new Array
		for (i=0;i<=numstreams;i++) {
			out[i]=o.slice(4*i,4*(i+1));
			out[i].shift();
			out[i]=out[i][0] + ": "+ out[i][1]+ out[i][2]
			}
		out.pop()
		txt=""
		for ( x in out){
			txt= txt + out[x] +"<br />";
			}
		document.getElementById("ftabContent").innerHTML= txt
		},
	})