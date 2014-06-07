// ==UserScript==
// @name          MianCB
// @description   CBScript
// @include       http://carnageblender.com/*
// @include       http://www.carnageblender.com/*
// @include       http://cb2.carnageblender.com/*
// @include       http://69.60.124.245/*
// @exclude       
// ==/UserScript==




var p=document.location.href;
var $ = function(id){return document.getElementById(id);}
function repeatStr(ch,nm) {var s="";for(var i=0;i<nm;i++) {s+=ch;}return s;}
function addCommas(nStr){nStr += '';x = nStr.split('.');x1 = x[0];x2 = x.length > 1 ? '.' + x[1] : '';var rgx = /(\d+)(\d{3})/;while (rgx.test(x1)) {x1 = x1.replace(rgx, '$1' + ',' + '$2');}return x1 + x2;}


// Modify Training Page
if (p.match('train')) {
	
	function ChangeTrainingPage(){
	  var untrained, untrainedexp
	  var trainedXP=0;
		unsafeWindow.$("select > option:contains('Unlearn')").each(function(){
			var num=this.innerHTML.match(/Unlearn for ([0-9,]+)/)[1].replace(/,/g,"")
			var percentBack = this.parentNode.parentNode.innerHTML.match(/\(this, ([0-9]+)\)/)[1]
			trainedXP+=(parseInt(Math.floor(parseFloat(num/percentBack)*100)))
		})
		
	  var untrainedXP=0;
		unsafeWindow.$('.exp').each(function(){
			untrainedXP+=parseInt(this.lastChild.nodeValue.replace(/,/g,""))
		});

  	var r=document.createElement("div"); 
	r.style.clear="both";

	var s=document.createElement("h1");
	s.innerHTML="Character Statistics";

  	var t=document.createElement("table");
	t.innerHTML="<tbody><tr><td><b>Trained Experience:</b></td><td>"+addCommas(trainedXP)+"</td></tr><tr><td><b>Total Experience:</b></td><td>"+addCommas(trainedXP+untrainedXP)+"</td></tr><tr><td><b>Estimated <a href=\"http://www.carnageblender.com/wiki/Virtual+Power\">VPR</a>:</b></td><td>"+addCommas(parseInt(Math.floor(Math.pow(((trainedXP+untrainedXP) / 1.4307),(1/1.2501)))))+"</td></tr><tr><td><b>Estimated Transfer Fee (Character Only):</b></td><td>"+addCommas(parseInt(Math.floor(4*Math.pow(((trainedXP+untrainedXP) / 1.4307),(1/1.2501))/3)+100000))+ "</td></tr></tbody>";
	t.style.marginBottom="10px";
	
	document.body.appendChild(r);
	document.body.appendChild(s);
	document.body.appendChild(t);
		
	}
	  
  ChangeTrainingPage();  
}


if (p.match('sidebar')) {

  var d = document.getElementById('feed');
  d.parentNode.removeChild( d );

}