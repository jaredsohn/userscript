// ==UserScript==
// @name			Risk-style Dice Odd Calcuation
// @namespace		Risk
// @description		Functions to calculate odds for modified dice rolls.
// @include			http://www.this-page-intentionally-left-blank.org/blankpage.html
// @version			1.0.0
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$('body').append('<p>Attacking Sides <select id="asides"></select>');
$('body').append('<p>Defending Sides <select id="dsides"></select>');
$('body').append('<input type="submit" id="go" value="Calculate" />');
$('body').append('<div id="results">&nbsp;</div>');
for ( i=0; i < 101; i++ ) {
	$('#asides').append('<option value="'+i+'">'+i+'</option>');
	$('#dsides').append('<option value="'+i+'">'+i+'</option>');
}
$('#go').click(function (){
	var as = parseInt($('#asides').val());
	var ds = parseInt($('#dsides').val());
	var html = '<table><tr><td>Number of Dice</td><td>Attacker Lose 0</td><td>Attacker Lose 1</td><td>Attacker Lose 2</td></tr>';
	var loss;
	for ( l=1; l < 4; l++ ) {
		for ( k=1; k < 3; k++ ) {
			var loss = calculateloss(l,as,k,ds);
			loss[0] = Math.round( loss[0] * 10000 ) / 100;
			loss[1] = Math.round( loss[1] * 10000 ) / 100;
			loss[2] = Math.round( loss[2] * 10000 ) / 100;
			html+= "<tr><td>"+l+" v " +k+"</td><td>"+loss[0]+"</td><td>"+loss[1]+"</td><td>"+loss[2]+"</td></tr>";
		}
	}
	html+="</table>";
	$('#results').html(html);
});


function calculateloss(ad,as,dd,ds){
	var a = distribution(ad,as);
	var d = distribution(dd,ds);
	var c = a.c * d.c;
	var al = [0,0,0];
	var dl = [0,0,0];
	if ( ad == 1 || dd == 1 ) {
		for ( m in a.p ) {
			for ( n in d.p ) {
				var e = a.p[m][0] * d.p[n][0];
				var f = ( a.p[m][1] > d.p[n][1] ) ? true : false ;
				if(f)	{ al[0] += e; dl[1] += e; }
				else	{ al[1] += e; dl[0] += e; }
			}
		}
	} else {
		for ( m in a.p ) {
			for ( n in d.p ) {
				var e = a.p[m][0] * d.p[n][0];
				var f = ( a.p[m][2] > d.p[n][2] ) ? true : false ;
				if ( a.p[m][1] > d.p[n][1] ) {
					if(f)	{ al[0] += e; dl[2] += e; }
					else	{ al[1] += e; dl[1] += e; }
				} else {
					if(f)	{ al[1] += e; dl[1] += e; }
					else	{ al[2] += e; dl[0] += e; }
				}
			}
		}
	}
	function distribution(d,s){
		var z = { 'c':Math.pow(s,d), 'p':{} };
		for ( i=1,u=0; i < s+1; i++ ) {
			if ( d == 1 )			z.p[u++] = [1,i];
			for ( j=1; j < i+1; j++ ) {
				switch ( d ) {
				case 3:
					if ( j == i )	z.p[u++] = [3*j-2,i,j];
					else 				z.p[u++] = [6*j-3,i,j];
					break;
				case 2:
					if ( j == i )	z.p[u++] = [1,i,j];
					else 				z.p[u++] = [2,i,j];
					break;
				}
			}
		}
		return z;
	}
	var losses = [];
	losses[0] = al[0] / c;
	losses[1] = al[1] / c;
	losses[2] = al[2] / c;
	return losses;
}


function $1(exp,root){return document.evaluate(exp,root,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}
function $$(exp,root){return document.evaluate(exp,root,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); }