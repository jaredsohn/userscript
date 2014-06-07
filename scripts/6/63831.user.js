// ==UserScript==
// @name          Swiss Armed Forces | Daily Orders
// @version       1.3
// @releasedate   20091209
// @description	  eRepublik script for soldiers of Swiss Armed Forces
// @author        Berengar /based on script of daniferi/
// @namespace     http://forum.ehelvetia.ch/viewforum.php?f=28
// @include       http://www.erepublik.com/*
// ==/UserScript==

/*
*/

CurrentReleaseDate = "20091209";
Effect = unsafeWindow['Effect'];

logojpg = 'http://static.erepublik.com/uploads/avatars/Citizens/2009/10/06/97cb904b0371aa27a35a4aa959ce1a0e.jpg';
	
button1 = new Image(); button1.src='data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAANMALAAAAAA3ABQAhwAAAFaDyG6a23Cb3HGc3HCb23Cc3G2Z2nun59/r/+jx/+ry/+fw/9no/1F9v4ay8uLt/+Hs/97q/3ik5FSBwnml5ZrC/5jB/5fA/1aDxHKe3oez84i09G6a2lqGxnOf34Wx8YSw8IaclCUAAAAAQ1Kc8V6Kynai4oi0tz4AAAAAb2a19Ym19T6H9D6F84ielSYAAAAARFOe9GOPz3yo6Iu39425+Yy4+I25u0AAAECJ+GlUAAAzmHq394y4uT+J94u3uT8AAIyhlwAARVWh+Hej42iU04Cs7I+7+5C8/JG9/Y+7vEEAAEGN/H9yRgAAcmq7+5C8vAAAc2y8/JC83Vk1AEFymigAAAAARlmk/GuX1pO//5W//5O/v0QAAEOP/29XAABXv0Q1nIO//4N0SAA1nIG//0MAAESP/5OonCkAAAAASFqo/wAAdG+//5W/v1uo/5K+/oGt7XGd24q29pvD/5vDv0YAAF6q/5urnCsAAHTD/0aS/1+r/4h3SABZv5vD4F82AEaR/3aj4I66+qDG/6HH/6DGv0oAAEmU/6GvnCwAAEqV/415SHjG/6HHv2Kv/3hbACx54Hqn5KbJ/6TJ/6jK/6bJv0wAAEuX/6bJ4GU5AC574JJ7SAA5nJLJ/6axnC8AAH7K/0yX/6ixnGWx/3xcAABcv36r56zN/6vM/6vMv04AAE6Z/6y0nIFeAABev67O/6yZdILO/6zN4Gg5AGk5ADEAAGm0/6u0nFCa/4Ow7LLR/7HQ/6/P/6/Pv1EAAFGc/7HQvwA6SDIAAIXQ/7KddFGd/7GcdFF/nGu1/53E/4Wy76PI/7XT/7TS/7fU/4e08HGf0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AKcFOHCAAIGCBxMWXGjQIEOEDRlGdDgR4cJp02gkWMCxo8ePIEOKHPkxwQEHHBYkWMmypcuXMGPKfEkjAA0MOHPm/KSzp8+fQIPmPHkgxJgQRkNwWMoB6dGkRqMlfTpGKtWoUK9WzXogAAGkYMOKHUtWrIgRJEqULXtgBoGrOIgBmAtABRSwR5ciReEFgIsQOPr+PUsimFOpTcEmdkpgBlIMHABxeNO3yZgdAHiMwRACsucxgQFYRiHXspARMdhIJkTIM4YxrTm8Xtr4JgbWY97I/YHBT10ooeeqgASoCt3jc62gDZa7L4DCrAlt7oyTRtGelEVj2AQgDIY3Yjb7/9acvcn3yhjyoIZ0ug0UO15S/zz6FbvzuTEg8cTAU72KPfCJ9kmAiWBAynq+hfFJcaJR8lMIg4xBiYMTXtJXIqqoBwCGvtHVhiMBBqPKKhdmuF4kyAEgyYQsssjBIBhMqAolI5ZIC3eSdJLZJ7kQ8+EqwGyIAYkbqkIKMfmhGIYqTDLJYoyqYBDlTU0ySSSGuYwAQDCvdMeLLAC0UcyNW6pCJpZIQuFKmkxGgmGVTXL2CTSq0KmKMEEelwg0eM41jI/FQGMMXcEMOlcySELCZ55ziUgnNI9C80k0dUJq6aWYZqrpppxmOmMIlEBaaaWdkjoqpqRemuqpo1IK56uwxjgq66ywYmBETlEy+YmuquzqK6+9NvnrsLkSu6uUMkqJwTSbvYbTZs0+K22z1OoUrbPY5lQttM4GBAA7';
var Ordr = document.createElement("div");
	Ordr.id                    = "Napiparancs";
	Ordr.style.position        = "relative";
	Ordr.style.float           = "left";
	Ordr.style.clear           = "both";
	Ordr.style.marginBottom    = "15px";
	Ordr.style.backgroundColor = "#F0F8FF";

var a = document.createElement("A");
	a.id     = "saf site";
	a.href   = "http://forum.ehelvetia.ch/viewforum.php?f=28";
	a.target = "_blank";
//	a.setAttribute('onclick', 'return false');
	Ordr.appendChild(a);

var img = document.createElement("IMG");
	img.src = logojpg;
	img.style.width  = "69px";
	a.appendChild(img);

levelesdoboz=document.getElementById('maildisplay');
levelesdoboz.parentNode.insertBefore(Ordr, levelesdoboz.nextSibling);
		
var adatdoboz = function (){
	var divi = document.createElement("div");
		divi.id = "kisdoboz";
		divi.style.paddingBottom = "10px";
		divi.style.display = "none";
		Ordr.appendChild(divi);
	
	var p = document.createElement("P");
		p.id               = "target_region";
		p.style.fontSize   = "11px";
		p.style.fontWeight = "800";
		p.style.textAlign  = "center";
		p.style.color      = "blue";
		p.appendChild(document.createTextNode(""));
		divi.appendChild(p);

	var p = document.createElement("P");
		p.id                  = "target_order";
		p.style.fontSize      = "9px";
		p.style.fontWeight    = "600";
		p.style.textAlign     = "center";
		p.style.color         = "black";
		p.style.marginBottom  = "6px";
		p.appendChild(document.createTextNode(""));
		divi.appendChild(p);

	var a = document.createElement("A");
		a.id = "csatalink";
		a.setAttribute('onmouseout', 'document.getElementById("gomb").src="data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAANMALAAAAAA3ABQAhwAAAFaDyG6a23Cb3HGc3HCb23Cc3G2Z2nun59/r/+jx/+ry/+fw/9no/1F9v4ay8uLt/+Hs/97q/3ik5FSBwnml5ZrC/5jB/5fA/1aDxHKe3oez84i09G6a2lqGxnOf34Wx8YSw8IaclCUAAAAAQ1Kc8V6Kynai4oi0tz4AAAAAb2a19Ym19T6H9D6F84ielSYAAAAARFOe9GOPz3yo6Iu39425+Yy4+I25u0AAAECJ+GlUAAAzmHq394y4uT+J94u3uT8AAIyhlwAARVWh+Hej42iU04Cs7I+7+5C8/JG9/Y+7vEEAAEGN/H9yRgAAcmq7+5C8vAAAc2y8/JC83Vk1AEFymigAAAAARlmk/GuX1pO//5W//5O/v0QAAEOP/29XAABXv0Q1nIO//4N0SAA1nIG//0MAAESP/5OonCkAAAAASFqo/wAAdG+//5W/v1uo/5K+/oGt7XGd24q29pvD/5vDv0YAAF6q/5urnCsAAHTD/0aS/1+r/4h3SABZv5vD4F82AEaR/3aj4I66+qDG/6HH/6DGv0oAAEmU/6GvnCwAAEqV/415SHjG/6HHv2Kv/3hbACx54Hqn5KbJ/6TJ/6jK/6bJv0wAAEuX/6bJ4GU5AC574JJ7SAA5nJLJ/6axnC8AAH7K/0yX/6ixnGWx/3xcAABcv36r56zN/6vM/6vMv04AAE6Z/6y0nIFeAABev67O/6yZdILO/6zN4Gg5AGk5ADEAAGm0/6u0nFCa/4Ow7LLR/7HQ/6/P/6/Pv1EAAFGc/7HQvwA6SDIAAIXQ/7KddFGd/7GcdFF/nGu1/53E/4Wy76PI/7XT/7TS/7fU/4e08HGf0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AKcFOHCAAIGCBxMWXGjQIEOEDRlGdDgR4cJp02gkWMCxo8ePIEOKHPkxwQEHHBYkWMmypcuXMGPKfEkjAA0MOHPm/KSzp8+fQIPmPHkgxJgQRkNwWMoB6dGkRqMlfTpGKtWoUK9WzXogAAGkYMOKHUtWrIgRJEqULXtgBoGrOIgBmAtABRSwR5ciReEFgIsQOPr+PUsimFOpTcEmdkpgBlIMHABxeNO3yZgdAHiMwRACsucxgQFYRiHXspARMdhIJkTIM4YxrTm8Xtr4JgbWY97I/YHBT10ooeeqgASoCt3jc62gDZa7L4DCrAlt7oyTRtGelEVj2AQgDIY3Yjb7/9acvcn3yhjyoIZ0ug0UO15S/zz6FbvzuTEg8cTAU72KPfCJ9kmAiWBAynq+hfFJcaJR8lMIg4xBiYMTXtJXIqqoBwCGvtHVhiMBBqPKKhdmuF4kyAEgyYQsssjBIBhMqAolI5ZIC3eSdJLZJ7kQ8+EqwGyIAYkbqkIKMfmhGIYqTDLJYoyqYBDlTU0ySSSGuYwAQDCvdMeLLAC0UcyNW6pCJpZIQuFKmkxGgmGVTXL2CTSq0KmKMEEelwg0eM41jI/FQGMMXcEMOlcySELCZ55ziUgnNI9C80k0dUJq6aWYZqrpppxmOmMIlEBaaaWdkjoqpqRemuqpo1IK56uwxjgq66ywYmBETlEy+YmuquzqK6+9NvnrsLkSu6uUMkqJwTSbvYbTZs0+K22z1OoUrbPY5lQttM4GBAA7" ');
		a.setAttribute('onmouseover', 'document.getElementById("gomb").src="data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAALIALAAAAAA3ABQAhwAAAFGAxWSQ0WWR0mOP0XWh4cbd/9Hj/9Pk/8La/2yY2FF+wIm19fP3//X4//L2//D1/3ml5VWCw4Gt7bfU/7XT/7TS/3ai4liExXyo6JvD/5rC/3Of31uHyJfA/5jB/5W//5ep/ykA/wAA/1yp/3Sg4GCMzH6q6kYA/3PC/0aR/0WQ/5qq/ysA/12q/3ik5GSR0YKu7p3E/57F/6DG/0gA/0mU/3Za/wA3/4rE/0iS/6Cu/ywA/2Ct/32p6WmV1Ii09KHH/6PI/6TJ/0oA/0qW/455/3rI/2Q5/0p6/y4A/2Ov/2Sx/26a2Yy4+KjK/6nL/00A/02X/35c/wBc/005/5PK/5R8/wA5/0wA/0yX/6my/y8A/2ax/6ix/37K/6bJ/4ez83Ke3ZG9/a7O/6zN/04A/2q1/661/zEA/4LO/1Ca/1AA/06Z/5h+/wBe/2k5/4u393il4rLR/1EA/1Gd/7K4/zIA/5yA/4XR/2y4/4Vf/zKA/4+7+3yp57nU/1QA/1Oe/3E7/zOC/6OC/wA7/6PU/7e6/zMA/4nU/1Se/3G6/4lh/wBh/3+t6bzW/73X/1UA/1ah/729/zUA/1Wg/45i/wBi/72h/43W/3I7/3M8/7y8/3K8/3O9/4Sx7sDZ/1cA/1mk/wA8/zYA/4/Z/8Ci/1eF/3W+/4e08MPb/8Xc/4u38q/P/6vM/7rV/3Wj1pO//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AGUFUGCCoMGCCA8qTMhwocOGBQnIkiXGgAEEBy5ezIjxIoKNBz5i5IhAJEeOHjduHKnRgIIFfRw4aCCzpk2bDXLe3MmTp06cPjr4gOQK0p+jRZP+SUq0KdOiS40yPbqUatSoUIuKCeDDgxUPYL2C/Sp2bFiyaM2WXat27VcxQsPKnUu3bl0WIkaQsGtXjImuc1GMGDwYFV8PgleATewBr97DdH2YiGEFjRVXlQUXcXVjBI48ll15EE1ac+YRRTx4ybuk8mXXpEfLthJDAZDLmF25Mm1k8JHdhEccsYIkuPEkrHULHtw69OjLaGr30e0KjXLUrvaMoKK7yuUrni9r/76+GQ3r1cKB66HO3gorMaPZAw++nj0aRCPyuIo0Yo1u/uXhpwd43P1RnH/y6daHHB5U5Yohf/C3BiT3oQYJeMHl8YdgE0LCIYUCamccHw4i9UcfXVEFyYoArqjJCIMQ4pkhnOCXByQA/oGjhTWOgAoj2624olVEeuADVEatKBgJkPS4BpCXQILJYKVAUhyTVurVJH6o9KjHint0OOSQRhYlJCQG8BccCRapiQN+pRhgCmEkzDnYKVyiqeZgbJ4ppCusuGLRoGgOSqihhhaK6KKMGqAooYCa6SialDpqKaWVForppZlyeumnRE1nFJFWjXrUmKSSauqpOq5Kqiuw4BSW4KzUyUrrrbjWKgtkvPbqq1wBAQA7" ');
		a.setAttribute('onmousedown', 'document.getElementById("gomb").src="data:image/gif;base64,R0lGODlhNwAUAHAAACH5BAEAAOIALAAAAAA3ABQAhwAAAC5YlShTkidSkSZRkSpWlitXlylVlS1ZmT1pqT9rq0ZyskVxsUdzs0JurlF9vWKOzmOPz2GNzUx4uFiExHai4nWh4VSAwEt3tlyIyHml5Xqm5nik5HqStiIAgAAAk0qR5U56un6q6n+r636qyToAgAAAgAAApl6q6n2p6X2pyDqA6n6WuCMAgAAAlE2W6l2JyVJ+vWeT04Ku7oOv74OvzTsAgDuC7mJQgAAxu3Ku7oKuzDuE74OauyUAgAAAlVCY7oGt7VeDwWyY2Iez84i09Iezzz4AgD6F83dtlgAAqmWz84i00Iay4VMygD5uviYAgAAAllOd81Oe9GaS0luHxXGd3Yu394u30z8AgD+J92hTgABT0z8zwHq393pvlwAzwIugwAAAl1Wg94yhwAAAq2i394y4+GuX11+LyZC8/JG9/Y+7+4+71UEAgFmk/JCkwigAgAAArWy8/JC81kGN/EGM+39ylwBV1o+76Fk1gGKOy3un55fA/5W//5W/2EQAgESP/5WoxCkAgIV1lwAAr2+//5fA2EUAgFuo/3BXgCl07GeT0ICs7J3E/5vD/5vD2EYAgEiS/57F/5vD7GA2gCx47Ip4lwA2xIrE/52sxCwAgHbF/0gAgJ3E2EaS/2Cs/3VagABa2GqX04Wx8aHH/6PI/6HH2EoAgEqW/6TJ/6GvxC4AgEuX/3pbgABb2KOWr3rJ/6PI7GM3gEqV/6HH7GI3gKOvxGKv/3hbgG+c14q29qvM/6nL/6jK/6jK2E0AgE6Z/6nL2EwAgAA5ly8AgH7K/6mXr02X/6iXr0x7xGax/4Sw8HCd2Y25+a7O/6/P/3Wi3ZK+/rXT/7fU/7TS/3yp5Nno/9fn/3Oi1azN/8Pb/8Xc/8La/6bJ/7LR/7nU/7HQ/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AMUdIDCQIAGDCAsqPLgwIcOHDh0eECfwgMWLGDNq3MixI8cEChhMUDCBgUiSJ0eqJMlSZUqTImO6TIly5QSQDyTo3Mmzp8+fQIP+nDAhQzQrOpAeTZoUqdKnOpZCtQL1KIelWKfqeFBUB4evX71+bcLBCg2zaM+qtUJW7FkWHkwgoRFNR4q0eNVylcChCY2/NQCZGGxCCQoONDjo+KuYhgrBlnSQEbxCRw8PYoBE+5uCRufFiPvSWJwh59/TNYrJpYHDRI7Fp2OnNrGCxuzal00Ei827Nw0JD6wUkS2YB5tchVEEJmy4iRPC0Ac/wQykyOzBQHz/lZDBCpsifWj0/2EiGAmbLSbwjO/ipYgr12zIyx1fvs9lMYngYJ5DXkwwSuAFGJ4VEnjXBxts0AedfwceOIkgHijBn2B2sHEIhWwIUgx+7+HBBiXPVdhHgAj2QaAOfaSY4oUm2PFgXHb0cQl0ShjiCYV9HKJajBCakEgo0ZmwiIpEmigBDd4QeaMJqUxCySxCzphDJrdEGMuSqfQhDIW8aCgGKEDiMcmYvBRJpA6MINkHL7xMsiWTXaqWSpi8wFJYLLJAmQovT8LpJShVftlmKHuyyYs3h3qjlqFsvgndno4SYyUvxxCWSqWDPbDhHLw4Otiea3ojKptnscEom+AYmuqqvLCaqqqoxmbaKqqvznqqoXSxAc6uvKbaTTe8ACvsrMN2802xwSbLa7DgANvrs2zowAs22FxjbbXXUFstttZ26+234F6bLbXijktuH9kE++u67Lbr7rvwxvsuL+K0umuyyBa7bL749suvs8vyEhAAOw==" ');
		divi.appendChild(a);
						
	var img = document.createElement("IMG");
		img.src = button1.src;
		img.id             = "gomb";
		img.style.display  = "block";
		img.style.position = "relative";
		img.style.margin   = "0 auto";
		a.appendChild(img);

	var p = document.createElement("P");
		p.id                  = "time_order";
		p.style.fontSize      = "10px";
		p.style.fontWeight    = "500";
		p.style.textAlign     = "center";
		p.style.color         = "black";
		p.style.marginTop     = "6px";
		p.appendChild(document.createTextNode(""));
		divi.appendChild(p);

	var p = document.createElement("P");
		p.id                  = "people_order";
		p.style.fontSize      = "9px";
		p.style.fontWeight    = "400";
		p.style.textAlign     = "center";
		p.style.color         = "black";
		p.appendChild(document.createTextNode(""));
		divi.appendChild(p);
	
	var a = document.createElement("A");
		a.id     = "napiparancslink";
		a.href   = "#";
		a.target = "_blank";
		a.appendChild(document.createTextNode(""));
		divi.appendChild(a);

	var p = document.createElement("P");
		p.style.fontSize      = "8px";
		p.style.fontWeight    = "600";
		p.style.textAlign     = "center";
		p.style.color         = "darkgreen";
		p.style.marginTop     = "4px";
		p.appendChild(document.createTextNode("== INFO =="));
		a.appendChild(p);

	var updatediv = document.createElement("div");
		updatediv.id = "UpdateYesNo";
		divi.appendChild(updatediv);
}

var loadData = function (){	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://forum.ehelvetia.ch/mod.txt',

		onload:function(responseDetails){
			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var parancs = tags[0];
			var regio = tags[1];
			var lnk = tags[2];
			var napi = tags[3];
			var ido = tags[4];
			var szerzo = tags[5];
				
			document.getElementById("csatalink").href = lnk;
			document.getElementById("napiparancslink").href = napi;
			document.getElementById("target_region").firstChild.nodeValue = regio;
			document.getElementById("target_order").firstChild.nodeValue = parancs;
			document.getElementById("time_order").firstChild.nodeValue = ido;
			document.getElementById("people_order").firstChild.nodeValue = "("+szerzo+")";
			Effect.SlideDown('kisdoboz',{ duration: 0.8 });
			updateCheck();
		}
	});
}
var updateCheck = function (){
	if (window.location.href == "http://www.erepublik.com/en") 
	{ 
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/63831.meta.js',
	
			onload:function(updateDetails){
				var updateText = updateDetails.responseText.match(/@releasedate\s*\d+/);
				if (updateText[0].match(/\d+/) > CurrentReleaseDate) {
					var updatehere = '<br><hr><a href="http://userscripts.org/scripts/show/63831" target="_blank">';
					var updatehere = updatehere +'<center><strong>UPDATE!</strong></center></a><hr>';
					document.getElementById("UpdateYesNo").innerHTML = updatehere;
				}
			}
		});
	}
	else { return true };
}
window.addEventListener(
    "load",
    function() {
			adatdoboz();
			loadData();
    },
    true
);