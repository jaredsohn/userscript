// ==UserScript==
// @name           OdnoklassnikiGallery
// @namespace      odnoklassniki
// @include        http://*odnoklassniki.ru/*
// @include        http://*odnoklassniki.ua/*
// ==/UserScript==

//
// 2008-11-16 - updated URL for UA domain, fixedlisting - added links to comments page, 
//              fixed voting for 0 and changing of already completed vote.
//

var obj = document.getElementById('panelPhotos');
if (obj) {
//alert(obj.childNodes[3]);
obj.childNodes[3].style.display = 'none';
var links = obj.getElementsByTagName('a');
var urls = new Array();
for (i=0; i<links.length; i++) {
 if (links[i].className=="") {
	urls.push(links[i].href);
	links[i].style.display = 'none';
}
}


obj.innerHTML= "<br/><center><a class=\"aclclc\" name='herePhoto' href='#herePhoto' "+
"onclick='javascript:var links = document.getElementById(\"panelPhotos\").getElementsByTagName(\"a\"); "+
"var i=0; while (links[i].className!=\"\") i+=2; st = i;"+
" while (links[i].style.display!=\"none\") i+=2; "+
"if (i>st) { document.getElementById(\"photoNumber\").innerHTML=(i-st)/2; "+
"if (links[i-2]) { " +
"links[i].style.display =\"inline\"; links[i-2].style.display =\"none\"; "+
"document.getElementById(\"photoFrame\").src=links[i-2]; } } return false;'>&lt;&lt;</a>"+

"&nbsp;&nbsp;<span id='photoNumber'>1</span>/"+urls.length+"&nbsp;&nbsp;"+

"<a class=\"aclclc\" href='#herePhoto' "+
"onclick='javascript: var links = document.getElementById(\"panelPhotos\").getElementsByTagName(\"a\"); var i=0; "+
" while (links[i].className!=\"\") i+=2; st=i; "+
" while (links[i].style.display!=\"none\") i+=2; "+
" if (links[i+2]) { document.getElementById(\"photoNumber\").innerHTML=(i-st+2)/2+1; "+
"links[i].style.display =\"inline\"; links[i+2].style.display =\"none\"; "+
"document.getElementById(\"photoFrame\").src=links[i+2];} return false;'>&gt;&gt;</a></center><br/>"+

"<iframe FRAMEBORDER='0' width='700px' height='760px' id='photoFrame' src='"+urls[0]+"'>"+
"</iframe>"+
""+
"<br/>"+obj.innerHTML;

}

    ulrParts = document.URL.split('?');
// extract photoId
    objImage = document.getElementById('imgPhoto');
    if (objImage) {
    url = objImage.src;
    re = /photoId=(\d+)/;
    res = url.match(re);
    photoId = res[1];

    var formUrl = ulrParts[0]+'?st.cmd=userMarkPhoto&amp;st.photoId='+photoId;

// correct display of mark 0
if (document.forms.length==0) {
    divs = document.getElementsByTagName('div');
    if (divs[2].className=='mark0small') {
        divs[2].innerHTML = '<img src="http://profuel.info/odnoklassniki/0_28.png" />';
        divs[2].style.display = 'inline';
        divs[2].style.verticalAlign = "middle";
        divs[2].style.height = "28px";
        divs[2].style.width = "28px";
        divs[2].style.fontSize = "25px";
    }

    // marks form
    var marksForm = '<form action="'+formUrl+'" method="post">'+
    			'<div style="margin-top: 7px;"><input value="set" type="hidden" name="st.posted" />'+
    			'<input value="'+photoId+'" id="field_photoId" type="hidden" name="st.photoId" /></div>'+
    			'<table align="center"><tr><td>+</td><td align="center"><div class="mark6"></div></td><td align="center"><div class="mark5"></div></td><td align="center"><div class="mark4"></div></td><td align="center"><div class="mark3"></div></td><td align="center"><div class="mark2"></div></td><td align="center"><div class="mark1"></div></td><td>-</td></tr><tr><td>&nbsp;</td><td align="center"><input id="field_mark_6" value="6" type="radio" name="st.mark" /></td><td align="center"><input id="field_mark_5" value="5" type="radio" name="st.mark" /></td><td align="center"><input id="field_mark_4" value="4" type="radio" name="st.mark" /></td><td align="center"><input id="field_mark_3" value="3" type="radio" name="st.mark" /></td><td align="center"><input id="field_mark_2" value="2" type="radio" name="st.mark" /></td><td align="center"><input id="field_mark_1" value="1" type="radio" name="st.mark" /></td><td>&nbsp;</td></tr></table><div style="margin-top: 10px;"><input value="Переголосовать" type="submit" name="mark" /></div></form>';

    document.body.innerHTML = document.body.innerHTML + marksForm;
} else
    document.forms[0].action = formUrl;

var tbls = document.getElementsByTagName('table');

var useTable = 2;
if (tbls.length==2)
	useTable = 1;

if (tbls.length<=3) {
// add mark 0
    markTable = tbls[useTable];
    row = markTable.rows[0];
    newCell = row.insertCell(7);
    newCell.innerHTML = '<img src="http://profuel.info/odnoklassniki/0.png" />';
    row = markTable.rows[1];
    newCell = row.insertCell(7);
    newCell.innerHTML = '<center><input type="radio" name="st.mark" value="0" id="field_mark_0"/></center>';

// mark current radio
if (typeof divs != "undefined") {
    if (divs.length>=2) {
        cl = divs[2].className;
        id = cl.substr(4,1);
        var radio = document.getElementById('field_mark_'+id);
        if (radio)
            radio.checked=true;
    }
}

}

}