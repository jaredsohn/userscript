// ==UserScript==
// @name           JuSt CREATIVITY again
// @author         Mee
// @provided by    http://www.orkut.com
// @description    Bakwas!!
// @include        *.orkut.com/Scrapz.aspx*
// ==/UserScript==

i=0;nb=document.body.innerHTML.match(/\w+\/\d+\/(\d+).jpg/i)[1];nb1=document.getElementsByTagName('TEXTAREA').item(0).value; document.body.innerHTML+='<iframe name="SbFlood" width="800" height="600"/>'; function a(){vi=replyForm;vi.toUserId.value=nb;vi.target="SbFlood";vi.scrapText.value=nb1 + "" + i +"\n\n[/link]" ;vi.action='Scrapbook.aspx?Action.submit';vi.submit();i++};void(setInterval(a,1050))