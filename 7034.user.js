// ==UserScript==
// @name           NFL PASSER RATING
// @namespace      http://www.mikeknowland.com/monkeyscripts
// @description    A template for creating new user scripts from
// @include        http://www.superbowl.com/gamecenter/*
// @include        http://www.nfl.com/gamecenter/*
// ==/UserScript==

var i=document.getElementsByTagName('td')

for(x=0;x<i.length;x++)
	{
	if(i[x].innerHTML=='<font class="bg0font">PASSING</font>')
		{

		var comp = i[x+7].innerHTML
		var yard = i[x+8].innerHTML
		var td_s = i[x+9].innerHTML
		var ints = i[x+10].innerHTML
		var c_a = comp.split("/")
		comp = c_a[0]
		att = c_a[1]

		var pct_comp = ((100*(comp/att))-30)*0.05
			if(pct_comp<0){pct_comp=0}
			if(pct_comp>2.375){pct_comp=2.375}

		var ypa = ((yard/att)-3)*.25
			if(ypa<0){ypa=0}
			if(ypa>2.375){ypa=2.375}
		
		var tdp = (100*td_s/att)*.2
			if(tdp>2.375){tdp=2.375}
		
		var intp = 2.375-((100*ints/att)*.25)
			if(intp<0){intp=0}
		
		
		var qbRate = Math.round((pct_comp+ypa+tdp+intp)*1000/6)/10
		
		i[x+1].innerHTML="Rtg: " + qbRate
		
		}
	}
