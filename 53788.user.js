// ==UserScript==
// @name           Mac7526
// @namespace      http://userscripts.org/scripts/show/53788
// @description    Mac7526
// @include        http://www.nyknickscitydancers.com/polls/results/true/answerid/38/pollid/2.aspx
// @include        http://www.nyknickscitydancers.com/polls/pollid/2.aspx
// ==/UserScript==

if (window.location == 'http://www.nyknickscitydancers.com/polls/results/true/answerid/38/pollid/2.aspx')
{
	setTimeout ( 'window.location="http://www.nyknickscitydancers.com/polls/pollid/2.aspx"', 61000 );	
}
else if (window.location == 'http://www.nyknickscitydancers.com/polls/pollid/2.aspx')
{

  	var myForm = document.createElement("form");
 	myForm.method="post" ;
  	myForm.action = window.location ;

  	var myInput = document.createElement("input") ;
  	myInput.setAttribute("name", "__EVENTTARGET") ;
  	myInput.setAttribute("value", "submitVote");
  	myForm.appendChild(myInput) ;

  	var myInput2 = document.createElement("input") ;
  	myInput2.setAttribute("name", "__EVENTARGUMENT") ;
  	myInput2.setAttribute("value", "38");
  	myForm.appendChild(myInput2) ;

  	document.body.appendChild(myForm) ;
  	myForm.submit() ;
  	document.body.removeChild(myForm) ;

}