// ==UserScript==
// @name           hRO auto voter
// @namespace      none
// @description    votes for hRO when on the voting page 
// @include        http://hidden.hidden-nw.com/vote/*// @version        1.1
// ==/UserScript==



function yesvote(){
	vote1();
	vote2();
	vote3();
	vote4();
	vote5();
	vote6();
	vote7();

	setTimeout("location.reload(true);",43210000);
	setTimeout("yesvote();",43250000;
}



var ans = confirm("Vote for Hidden-RO?");

if(ans)
{
	yesvote();
}

alert(ans ? "Voted! (leave page open to continue voting every 12 hours.)" : "You suck!");



