// ==UserScript==
// @name        VFHelper
// @namespace   Scarmorus
// @description Script d'outils adaptés a Vituafoot
// @include     http://www.virtuafoot.com/*
// @exclude		*.css
// @exclude		*.js
// @version     1.1
// @author		Renard Anthony
// ==/UserScript==

//variables des images Base64:URI
var img_remplir = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAHDVQljAAAABnRSTlMAAAD/AP/9PNzxAAAACXBIWXMAAAsSAAALEgHS3X78AAADGElEQVR42mNk+P+fAQaYINS5ShsYJ5U/xuAmkGZEVsaIRc/h6Hgw/f9/+FU9kPz//7j1IAMmBDONfelLkZvZEig6fn++LrjE60vmfcJGYZdgImDtz0tOn3fuQRc1vXv8n8D8q8bGCFHJeaIm2sr88zZqnz0L9euR+RoSu2wYE/kgPkb3NAE34PQIoYBCBbeWrVykY0SUavkqVlU/Xf9SuSepqbsMjHC7JJVLyYkl3l6Kk+X/sWPPut5+VUv+h0X1/+vKAge+K+rLsLP8eXz15bOjnxjmfMbpS3cNxsrGTHtLY/722k/Tn1EhTKgUgrRUvcbe5URNPVGqXx8yc68u17Yy3x4WRUC1WpvaeXYhNoNbPw8dtJARPZySjlO1RovWI477x2VuPnoy+6vdok9Hjz/ZsRO7atVmrXts95O95f8xsCwU/7Lv/qtHIacjnzzAolq2Tu0B00MnB6W3vzkefGJpn/eq5KWYbel/7LHTfWzStC9z+TgZOZn/n9z+SIyR92XTI5xx+Z/hzYxby2ruLnh76KEAC8+H5of4wttFQz5DiK+BwYThy1+sSgdVOiHNJTR0yJA1eq2Dy/N1mz8dObY/MXVPWjZ1jN68Vvr/34tB2/PY/6xjvHdPz8TQzET3ZHDoVr8g8o3WatNgSOP0vf/CbZPB06cT+Kw9/pkc/v1p/qfNWyU+vDNg/jNXSBxTFwt+Q9WbtW8+vntX/b+6C0uImbwkH8sKhidCP0pMnn/llf3yLfzCq20cb44IWZQUkWC0QoPmg6eP7yv/k7PltNEXF+Jl+fj3z6+vTP9+/V5x6duZq79kPjDXS7LYBqg7LjuD1QQsRkfP0l919vkDyc+iZoLy6sK83Kyvfv79BMwBvxmuXX/74M73f09/i0oJPul5korXx1iMXuzAsDjp/sz789qfrHj+89uX/2z//v56ff7Nh4df/r/8IyIp8Gb2o9fk5cYoG96EvGJXX4ffH77Pfn2i9ODSbw/fMH9kYRfl+db2gKKM7qnF+OAJg4wEQ0IQt7YKI++f/14P/99s/0pqDhgtQ9AAAMMbbD96/WrtAAAAAElFTkSuQmCC";
var img_option = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAHDVQljAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsSAAALEgHS3X78AAAEA0lEQVR42u1Vb0wbZRy+O0rrMokfpiSKiYlbMo0mcyZ+WFz44Ke5RI3CjC5jGXGLQyVubiMzGDYyOnEoTv5sbtCVlqFFWEuAbtAxdmSlXCnQQoV6IKP8m6WKBdre3fu+1zvfxrI51g0y5xezJ7ncve+973O/e97f7/kRxBK0/YJyGrjYIN/Mn7jME+l9sfGb34eIOKh3gk/rF/ccbuCOmEFs4JoSiRXB0AP3/shl6MLFV3i9I3LrRRUDkw/PvXactU/LxAOH3g4sHnTpZ1jvhHhI4atnHCFRvjgIR/+U6JHF8N86Ezp9LfpXeWY++WN3bJYeRtn1oMIGUg5NqbL9t1GvyZkj/mPYx5BzUlS38PdaNPaHWGkDTQOoZQg2uaHRBWp7QXU3eirnRjxKr3jeAfQMOLbIulMfzr/IW71y0q6uOBu+bReOt/I/OeEufajwMlC3CvvruLPXwvGDyTXOpn83WkpH9U7McOCZTVk1neMy8T9EtR30T4kmF7jXomF/xOAA/dPi1208Lr0yWsgyhHOb7nKi+CA7R8W6PnCFRc1ueMEFqxjwcoHvbOcdH8GUjQOgoR9WWIWtp4K5Tdz+Cxw+qb0GvqxDWLr65FWhb1I8ZxPe04ZuzpTQwlEz1+i6VfPU3zd2RlK3AIIkUtcqyukoWd9EhIeExen/oHIiTtzMGCqlBUx5xgrSKoIaBh0yhd8on/3nGurmk7EfvbpOpWVwrsItLzzySZmbl5QqpTLPLMThZv3y5vwh/LA2L6BlRLVx/O3Cnh2lnmVOZ3cNt2rfXOd1RDzEA0PXdYSTE7eDdvZf64qdDSdwGxv15e4xhJPRfUMc/E38zMhhv8aT5R0C7jU6RrgbAxUnWWbEZjcSkLwhRbFKQWlsgoUVE0hiOiBPBuRHlWRNL8oxhZOTyD2bVf6QlF4R1NnBSkP2+CKNA9DkgjoGW6iAPQ578+vlC+9ro82jzglx5RW08AeMfKZuvtbBrYgU78R0J9ujZYvLWdcFsB1vqwwfNcdMouASj1tncbtQ1gGw52ToQq8UBVOL55/53LcMNTZrbCS9E2K1HZbQfBUjZFaHi9puE/QrC/+uJlRCA6z1QSw9Kxu6g4/tvLqM1htTqJHfI+ZB5FuIJJDk1Jy86dmEeUHKMnC4Y5yw8FiTEb+08emEyUAkBEjbcLC02ev2LuxL27CEirwzcIcXnbbCJBW59cVE1i/JkvT4akqpIIKCHEZEIiVFJHKWIyiSfO5J5TdGj2eGOLZ9fXaqYkWKa+3iO6f86w8MkJlDRa3BbRpu3ZHA+W5wrktc89HglsJf1c0Barv1+R2a1bvdaXrR44P3meNYh5e+nD9o4rNqwRMf9nzxA/vQQ+4DfwFpA2KKIKDJRQAAAABJRU5ErkJggg==";

//Fonctions
function modif_option()
{
	var confirm = window.confirm('Veuillez confirmer les modifications');
	if(confirm==true)
	{
		var i = 0;
		for(i=0 ; i<=47 ; i++)
		{
			var input = "nb["+i+"]";
			var nb_vendu = document.getElementsByName(input)[0].value;
			GM_setValue('input'+i,nb_vendu);
		}
		alert('Données enregistrées');
	}
	else
	{
	alert('Les données ne sont pas enregistrées');
	}
}

function remplir_boutique()
{
	// document.getElementsByName('nb[0]')[0].value = '1000';
	var i = 0;
	for(i=0 ; i<=47 ; i++)
	{
		var input = "nb["+i+"]";
		var nb_enregistre = GM_getValue('input'+i,'0');
		document.getElementsByName(input)[0].value = nb_enregistre;
	}
}

//création du menu VFHelper
var NewElement = document.createElement("div");
	NewElement.setAttribute("id", "VFHelper"); 
	NewElement.setAttribute("style","background-color:#033170;height:30px;margin-top:20px;");
	NewElement.innerHTML = "<img src='"+img_remplir+"' id='img_remplir'><img src='"+img_option+"' id='img_option'>";
	
	

//insertion du menu VFHelper
var var2 = document.getElementById('sidebar');
	var2.insertBefore(NewElement, null);
document.getElementById('ad_sidebar').setAttribute("style","margin-top:50px");

//ajout des onclick
	document.getElementById('img_remplir').addEventListener('click', remplir_boutique, true);
	document.getElementById('img_option').addEventListener('click', modif_option, true);
	
	