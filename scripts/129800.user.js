// ==UserScript==
// @name           tf2rwinnercount
// @namespace      Jeremy Geels
// @description    See the amount of winners
// @include        *tf2r.com/k*.html
// ==/UserScript==


//Winner count calc
var chance = parseFloat(document.getElementById("winc").innerHTML.split("%")[0]);
var entries = parseInt(document.getElementById("entry").innerHTML.split("/")[0]);

if(entries > 1)
{
	var winners = Math.round(chance/(100/entries));
}

var rafin = document.getElementsByClassName("raffle_infomation")[6];

var uni = rafin.getElementsByClassName("item q6").length;
var str = rafin.getElementsByClassName("item q11").length;
var gen = rafin.getElementsByClassName("item q1").length;
var vin = rafin.getElementsByClassName("item q3").length;
var unu = rafin.getElementsByClassName("item q5").length;
var hau = rafin.getElementsByClassName("item q13").length;

var total = uni + str + gen + vin + unu + hau;

var title = document.getElementsByClassName("hfont");
if(entries > 1)
{
	if(winners == 1 && total > 1)
	{
		title[0].innerHTML = title[0].innerHTML + "<br/><i>All to one</i>";
	}
	else
	{
		title[0].innerHTML = title[0].innerHTML + "<br/><i>One item per person</i>";
	}
}
else
{
	title[0].innerHTML = title[0].innerHTML + "<br/><i><small>Can't calculate yet.</small></i>";
}


//item count
var tots = "s";
if(total == 1) { tots = ""; }

var unis = "s";
if(uni == 1) { unis = ""; }
var strs = "s";
if(str == 1) { strs = ""; }
var gens = "s";
if(gen == 1) { gens = ""; }
var vins = "s";
if(vin == 1) { vins = ""; }
var unus = "s";
if(unu == 1) { unus = ""; }
var haus = "s";
if(hau == 1) { haus = ""; }

var Co = "";

title[0].innerHTML = title[0].innerHTML + "<br/><font color='#FF8888'><small>" + total + " item" + tots + ": " + "</small></font>"
if(uni > 0) { Co = Co + "<font color='#FF8888'><small>" +", "+uni+" unique"+unis + "</small></font>" }
if(str > 0) { Co = Co + "<font color='#FF8888'><small>" +", "+str+" strange"+strs + "</small></font>" }
if(gen > 0) { Co = Co + "<font color='#FF8888'><small>" +", "+gen+" genuine"+gens + "</small></font>" }
if(vin > 0) { Co = Co + "<font color='#FF8888'><small>" +", "+vin+" vintage"+vins + "</small></font>" }
if(unu > 0) { Co = Co + "<font color='#FF8888'><small>" +", "+unu+" unusual"+unus + "</small></font>" }
if(hau > 0) { Co = Co + "<font color='#FF8888'><small>" +", "+hau+" haunted"+haus + "</small></font>" }

title[0].innerHTML = title[0].innerHTML + Co.substring(0, 29) + Co.substring(31, Co.length)

//print all crates
var uniqs = rafin.getElementsByClassName("item q6")

var Crates = new Array();
var crateC = 0;

for(var i = 0; i < uni; i++)
{
	if(uniqs[i].getAttribute("iname").toLowerCase().indexOf("crate")!==-1)
	{
		crateC++
		Crates[crateC] = uniqs[i].getAttribute("iu1")
	}
}

if(crateC > 0)
{
	var cs = crateC==1?"":"s";
	title[0].innerHTML = title[0].innerHTML + "<br/><font color = '#555566'><small><small>" + crateC + " crate"+cs+".</font></small></small>";
}