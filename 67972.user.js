// ==UserScript==
// @name           Lectio-login
// @namespace      null
// @description    logger ind paa lectio
// @include        http*://www.lectio.dk/lectio/*/default.aspx*
// @include        http*://www.lectio.dk/lectio/*/login.aspx*
// ==/UserScript==
/*****************************
*   Dette script er skrevet  *
*   simpelt som auto-login   *
*       til lectio.dk        *
*                            *
*   Udskift NAVN, skoleID    *
*  og KODE med din egen data *
*                            *
Skrevet af: Nikolaj Schomacker
*****************************/
//Grunden til denne opdatering er at man ikke bare bliver logget ud til login-skærmen mere
//men smidt til hovedmenuen for sin skole.
//
//Jeg har så gjort så man automatisk bliver flyttet til login-siden og så logget ind.
//Dumme lectio >.<

uname = "NAVN"; //navn du logger ind med
pass = "KODE"; //kode du bruger til at logge ind med
skoleID = "skoleID";
/*
skoleID er det ID-nummer skolen har. Det kan du se i URL'en
hvis URL'en til din login-side er: https://www.lectio.dk/lectio/1234/login.aspx
er dit ID 1234 :)
*/


if(document.location == "http://www.lectio.dk/lectio/" + skoleID + "/default.aspx" || document.location == "https://www.lectio.dk/lectio/" + skoleID + "/default.aspx")
{
	document.location = "https://www.lectio.dk/lectio/" + skoleID + "/login.aspx";
}
else
{
	document.getElementById( "m_Content_username2" ).value = uname;
	document.getElementById( "m_Content_password2" ).value = pass;
	document.location = "javascript: this.disabled=1; PostBackHelper.OnSubmit(); WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(\"m$Content$submitbtn2\", \"\", true, \"\", \"\", false, true));";
	
}