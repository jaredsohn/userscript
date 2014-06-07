// ==UserScript==
// @name           CnC: Tiberium Alliances
// @author         Caninewarrior - CL
// @description    Convert base coordinates to sector.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0
// ==/UserScript==


function validateForm()
{
	var x = prompt ("What is the X coordinates","");
	var y = prompt ("What is the y coordinates","");
	alert(x);
	alert(y);
if(y < 500)
{	alert('North.');
	}
	
if(y > 500)
{	alert('South');
	}

if (x < 500)
{	alert('West');
}

if (x > 500)
{	alert('East');
	}
}

function KeyCheck(e)
{
alert(e.keyCode);
if(e == "")
validateForm();

}

window.addEventListener('keydown', KeyCheck, true);


