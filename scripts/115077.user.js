// ==UserScript==
// @name           Add Share Ratio
// @namespace      http://www.torrentleech.org
// @include        http://www.torrentleech.org/torrents/browse*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



function main() {

	$('#torrenttable thead tr th:last').before('<th>&nbsp;</th>');

	function find_ratio(num1, num2) {
	   var x=num1;
	   var y=num2;
	   var gcd=calc(x,y);
	   var r1=x/gcd;
	   var r2=y/gcd;
	   var ratio=r1+":"+r2;
	   return ratio;
	}
	
	function calc(n1,n2) {
	  var num1,num2;
	  if(n1 < n2){ 
		  num1=n1;
		  num2=n2;  
	   }
	   else{
		  num1=n2;
		  num2=n1;
		}
	  var remain=num2%num1;
	  while(remain>0){
		  num2=num1;
		  num1=remain;
		  remain=num2%num1;
	  }
	  return num1;
	} 
	   
	   $('.leechers').each(function() {
		var seeds = $(this).prev().html();
		var leechers = $(this).html();
		var theratio = find_ratio(parseFloat(seeds), parseFloat(leechers));

		
		if (theratio.match('NaN')) {
			theratio = seeds +':'+ leechers;
		}
		
		var numbers = theratio.split(':');
		var style = '';
		
		if(parseFloat(numbers[1])>parseFloat(numbers[0])) {
			style = 'green';
			console.log(numbers[1] + ' is greater than ' + numbers[0]);
		} else {
			style = '#859292';
		}
		
		$(this).after('<td style="color:'+style+';">'+theratio+'</td>');
	   });
}

addJQuery(main);