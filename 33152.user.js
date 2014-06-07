// ==UserScript==
// @name           Quick Reply in Topics (With signature)
// @namespace      Nbfun.net
// @author         popoye the code|Mr.Nobody
// @description    Reply in any orkut community with Shift+r
// @include        http://www.orkut.*/CommMsgs.aspx?*
// @include        http://www.orkut.*/CommMsgPost.aspx?*
// ==/UserScript==
function nb() {
    var header ="\n\n\n\\n\n";           

//HEADER , Keep it as blank if u don't need it, Write your header between the quotes, use 

\n for a line space. 
    var footer ="\n\n\n\n\n\n\\n\n";       //FOOTER , Write 

your footer between the quotes, use \n for a line space.
    //Dont change anything below
    f = prompt("resposta aqui", "");
	var nb="";
	var nb1=f;
	var count=1;
    if(f!=null)
    {
	flag=1;
	while(flag)
	{
		if(count>1)
		nb1= nb1 + '\n'+nb;
		else if(count==1)
		nb1=f;
		nb=prompt('entre na proxima linha (Press cancel to exit loop)','');
		count++;
		if(nb==null)
		flag=0;
	}
    body = encodeURIComponent(header + nb1 + footer);
    cmm = location.href.match(/cmm.*/);
    a = document.forms[1];
    a = document.forms[1];
    a.action = "/CommMsgPost.aspx?" + cmm + "&bodyText=" + body + "&Action.submit";
    a.submit();
    }
}

var bodies;
var fnCheckShortcut;
fnCheckShortcut = function (e) {if (e.shiftKey && e.keyCode ==82) {nb();}};
document.addEventListener("keydown", fnCheckShortcut, 0);
