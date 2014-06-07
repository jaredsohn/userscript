// ==UserScript==
// @name           			DW Plus v2 - okrojona
// @description    			Rozszerza podstawowe mozliwosci www.darkwarez.pl v2
// @version        			1.0.0
// @author		   			mentor90
// @orginal-script			userscripts.org/scripts/show/142125
// @modby					DWEnpeiks
// @include        			*darkwarez.pl/forum/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function (){
    if(typeof getCookie('dwPlusStart') == 'undefined'){
        setCookie('dwPlusStart', 1);
        setCookie('dwPlusSzybkaOdpowiedz', 1);
    }
    dwPlus();
    
    if((getCookie('dwPlusSzybkaOdpowiedz') == 1) && (/darkwarez\.pl\/forum\/[a-z0-9\-]+\/[0-9]+\-[a-z0-9\-]+\.html/.test(document.URL) || /darkwarez\.pl\/forum\/post\-[0-9]+\.html/.test(document.URL))){
        szybkaOdpowiedz();
    }
}, false);


// DW Plus i ustawienia
function dwPlus(){
    var a = document.getElementsByTagName('a');
    for(var i=0; i<a.length; i++){
        if(/status\.php/.test(a[i].href)){
            var span = document.createElement('span');
            span.setAttribute('id', 'dwPlus');
            
        }
    }
}

function pokazOpcje(){
    var dwPlus = document.getElementById('dwPlus');
    
    // szybka odpowiedz 
    var dwPlusSzybkaOdpowiedz = getCookie('dwPlusSzybkaOdpowiedz');
    if(dwPlusSzybkaOdpowiedz == 1)
        var dwPlusSzybkaOdpowiedz1 = 'checked="checked"';
    else
        var dwPlusSzybkaOdpowiedz2 = 'checked="checked"';
    
    // szybka odpowiedz 
    dwPlusSzybkaOdpowiedz1 =  document.getElementById('dwPlusSzybkaOdpowiedz1');
    dwPlusSzybkaOdpowiedz2 =  document.getElementById('dwPlusSzybkaOdpowiedz2');
    dwPlusSzybkaOdpowiedz1.onclick = function(){
        setCookie('dwPlusSzybkaOdpowiedz', 1);
    }
    dwPlusSzybkaOdpowiedz2.onclick = function(){
        setCookie('dwPlusSzybkaOdpowiedz', 0);
    }
}


// ustawienia cookies
function getCookie(c_name){
    var i, x, y, ARRcookies=document.cookie.split(';');
    for (i=0; i<ARRcookies.length; i++){
        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
        x = x.replace(/^\s+|\s+$/g,'');
        if (x == c_name)
            return unescape(y);
    }
}

function setCookie(c_name, value){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    var c_value=escape(value) + ((365==null) ? '' : '; expires='+exdate.toUTCString());
    document.cookie=c_name + '=' + c_value;
}

var bbtags = new Array('[b]','[/b]','[i]','[/i]','[u]','[/u]','[quote]','[/quote]','[code]','[/code]','[list]','[/list]','[list=]','[/list]','[img]','[/img]','[url]','[/url]');

function szybkaOdpowiedz(){
    var elements = document.getElementsByName('search_topic');
    var topicid = elements[0].value;
    
    var elements = document.getElementsByTagName("td");
    for(i=0;i<elements.length;i++)
    {
        if(elements[i].className == "catBottom") {var targetd = elements[i].parentNode;break;}
    }
    
    var elements = document.getElementsByTagName("img");
    for(i=0;i<elements.length;i++)
    {
        if(elements[i].alt == "Odpowiedz do tematu") {var open = 1;break;}
    }
    var elements = document.getElementsByTagName("a");
    for(i=0;i<elements.length;i++)
    {
        if(/logout/.test(elements[i].href) ) {arr = elements[i].href.split(/sid=/);sid=arr[1];break;}
    }
    if(topicid && targetd && sid && open)
    {
        // struktura
        var trMain = document.createElement("tr");
        
        var tdMain = document.createElement("td");
        tdMain.setAttribute("colspan", 2);
        tdMain.setAttribute("style", "padding: 0");
        tdMain.setAttribute("class", "row2");
        
        var form = document.createElement("form");
        form.setAttribute("action", "posting.php");
        form.setAttribute("method", "post");
        form.setAttribute("name", "post");
        form.setAttribute("style", "margin-bottom: 0");
        
        var table = document.createElement("table");
        table.setAttribute("width", "100%");
        table.setAttribute("cellSpacing", 1);
        table.setAttribute("cellPadding", 3);
        table.setAttribute("border", 0);
        
        var tr1 = document.createElement("tr");
        tr1.innerHTML = '<th colspan="2"">SZYBKA ODPOWIEDŹ</th>';
        
        var tr2 = document.createElement("tr");
        
        var td1 = document.createElement("td");
        td1.setAttribute("colspan", 2);
        td1.setAttribute("align", "center");
        // b, i, u...
        var input1 = document.createElement("input");
        input1.setAttribute("type", "button");
        input1.setAttribute("class", "button");
        input1.setAttribute("value", " B ");
        input1.setAttribute("style", "font-weight:bold; width: 30px");
        input1.onclick = bbstyle.bind(input1, 0);
        
        var input2 = document.createElement("input");
        input2.setAttribute("type", "button");
        input2.setAttribute("class", "button");
        input2.setAttribute("value", " I ");
        input2.setAttribute("style", "font-style:italic; width: 30px");
        input2.onclick = bbstyle.bind(input2, 2);
        
        var input3 = document.createElement("input");
        input3.setAttribute("type", "button");
        input3.setAttribute("class", "button");
        input3.setAttribute("value", " U ");
        input3.setAttribute("style", "text-decoration: underline; width: 30px");
        input3.onclick = bbstyle.bind(input3, 4);
        
        var input4 = document.createElement("input");
        input4.setAttribute("type", "button");
        input4.setAttribute("class", "button");
        input4.setAttribute("value", "Quote");
        input4.setAttribute("style", "width: 50px");
        input4.onclick = bbstyle.bind(input4, 6);
        
        var input5 = document.createElement("input");
        input5.setAttribute("type", "button");
        input5.setAttribute("class", "button");
        input5.setAttribute("value", "Code");
        input5.setAttribute("style", "width: 40px");
        input5.onclick = bbstyle.bind(input5, 8);
        
        var input6 = document.createElement("input");
        input6.setAttribute("type", "button");
        input6.setAttribute("class", "button");
        input6.setAttribute("value", "List");
        input6.setAttribute("style", "width: 40px");
        input6.onclick = bbstyle.bind(input6, 10);
        
        var input7 = document.createElement("input");
        input7.setAttribute("type", "button");
        input7.setAttribute("class", "button");
        input7.setAttribute("value", "List=");
        input7.setAttribute("style", "width: 40px");
        input7.onclick = bbstyle.bind(input7, 12);
        
        var input8 = document.createElement("input");
        input8.setAttribute("type", "button");
        input8.setAttribute("class", "button");
        input8.setAttribute("value", "Img");
        input8.setAttribute("style", "width: 40px");
        input8.onclick = bbstyle.bind(input8, 14);
        
        var input9 = document.createElement("input");
        input9.setAttribute("type", "button");
        input9.setAttribute("class", "button");
        input9.setAttribute("value", "URL");
        input9.setAttribute("style", "text-decoration: underline; width: 40px");
        input9.onclick = bbstyle.bind(input9, 16);
        //kolor
        var select1 = document.createElement("select");
        select1.setAttribute("id", 'kolor');
        select1.onchange = zmienKolorRozmiar;
        
        var optionK1 = document.createElement("option");
        optionK1.setAttribute("value", 0);
        optionK1.innerHTML = 'Kolor';
        
        var optionK2 = document.createElement("option");
        optionK2.setAttribute("value", '#a80000');
        optionK2.setAttribute("style", "color: #a80000;");
        optionK2.innerHTML = 'Ciemnoczerwony';
        
        var optionK3 = document.createElement("option");
        optionK3.setAttribute("value", '#e50000');
        optionK3.setAttribute("style", "color: #e50000;");
        optionK3.innerHTML = 'Czerwony';
        
        var optionK4 = document.createElement("option");
        optionK4.setAttribute("value", '#ffb300');
        optionK4.setAttribute("style", "color: #ffb300;");
        optionK4.innerHTML = 'Pomarańczowy';
        
        var optionK5 = document.createElement("option");
        optionK5.setAttribute("value", '#994c00');
        optionK5.setAttribute("style", "color: #994c00;");
        optionK5.innerHTML = 'Brązowy';
        
        var optionK6 = document.createElement("option");
        optionK6.setAttribute("value", '#ffcc66');
        optionK6.setAttribute("style", "color: #ffcc66;");
        optionK6.innerHTML = 'Żółty';
        
        var optionK7 = document.createElement("option");
        optionK7.setAttribute("value", '#147426');
        optionK7.setAttribute("style", "color: #147426;");
        optionK7.innerHTML = 'Zielony';
        
        var optionK8 = document.createElement("option");
        optionK8.setAttribute("value", '#999900');
        optionK8.setAttribute("style", "color: #999900;");
        optionK8.innerHTML = 'Oliwkowy';
        
        var optionK9 = document.createElement("option");
        optionK9.setAttribute("value", '#45a7a7');
        optionK9.setAttribute("style", "color: #45a7a7;");
        optionK9.innerHTML = 'Błękitny';
        
        var optionK10 = document.createElement("option");
        optionK10.setAttribute("value", '#6699ff');
        optionK10.setAttribute("style", "color: #6699ff;");
        optionK10.innerHTML = 'Niebieski';
        
        var optionK11 = document.createElement("option");
        optionK11.setAttribute("value", '#476bb3');
        optionK11.setAttribute("style", "color: #476bb3;");
        optionK11.innerHTML = 'Ciemnoniebieski';
        
        var optionK12 = document.createElement("option");
        optionK12.setAttribute("value", '#8e2fb6');
        optionK12.setAttribute("style", "color: #8e2fb6;");
        optionK12.innerHTML = 'Purpurowy';
        
        var optionK13 = document.createElement("option");
        optionK13.setAttribute("value", '#a97e98');
        optionK13.setAttribute("style", "color: #a97e98;");
        optionK13.innerHTML = 'Fioletowy';
        
        var optionK14 = document.createElement("option");
        optionK14.setAttribute("value", '#c6bac6');
        optionK14.setAttribute("style", "color: #c6bac6;");
        optionK14.innerHTML = 'Biały';
        
        var optionK15 = document.createElement("option");
        optionK15.setAttribute("value", '#555555');
        optionK15.setAttribute("style", "color: #555555;");
        optionK15.innerHTML = 'Szary';
        
        // rozmiar
        var select2 = document.createElement("select");
        select2.setAttribute("id", 'rozmiar');
        select2.onchange = zmienKolorRozmiar;
        
        var option1 = document.createElement("option");
        option1.setAttribute("value", 0);
        option1.innerHTML = 'Rozmiar';
        
        var option2 = document.createElement("option");
        option2.setAttribute("value", 7);
        option2.innerHTML = 'Minimalny';
        
        var option3 = document.createElement("option");
        option3.setAttribute("value", 9);
        option3.innerHTML = 'Mały';
        
        var option4 = document.createElement("option");
        option4.setAttribute("value", 12);
        option4.innerHTML = 'Normalny';
        
        var option5 = document.createElement("option");
        option5.setAttribute("value", 18);
        option5.innerHTML = 'Duży';
        
        var option6 = document.createElement("option");
        option6.setAttribute("value", 24);
        option6.innerHTML = 'Ogromny';
        
        
        var tr3 = document.createElement("tr");
        tr3.innerHTML = '<td width="150" id="emotki" align="center"><table width="100" cellspacing="0" cellpadding="5" border="0"><tbody><tr align="center"> <td class="gensmall" colspan="4"><b>Emotikony</b></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :D \';txtarea.focus();" name="emotka"><img border="0" title="" alt="" src="images/smiles/big_smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :) \';txtarea.focus();" name="emotka"><img border="0" title="Smile" alt="Smile" src="images/smiles/smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :( \';txtarea.focus();" name="emotka"><img border="0" title="Sad" alt="Sad" src="images/smiles/sad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :o \';txtarea.focus();" name="emotka"><img border="0" title="Surprised" alt="Surprised" src="images/smiles/yikes.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' 8) \';txtarea.focus();" name="emotka"><img border="0" title="Cool" alt="Cool" src="images/smiles/cool.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :lol: \';txtarea.focus();" name="emotka"><img border="0" title="Laughing" alt="Laughing" src="images/smiles/lol.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :x \';txtarea.focus();" name="emotka"><img border="0" title="Mad" alt="Mad" src="images/smiles/mad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :P \';txtarea.focus();" name="emotka"><img border="0" title="Razz" alt="Razz" src="images/smiles/tongue.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :oops: \';txtarea.focus();" name="emotka"><img border="0" title="Embarassed" alt="Embarassed" src="images/smiles/icon_redface.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :cry: \';txtarea.focus();" name="emotka"><img border="0" title="Crying or Very sad" alt="Crying or Very sad" src="images/smiles/icon_cry.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :evil: \';txtarea.focus();" name="emotka"><img border="0" title="Evil or Very Mad" alt="Evil or Very Mad" src="images/smiles/icon_evil.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :twisted: \';txtarea.focus();" name="emotka"><img border="0" title="Twisted Evil" alt="Twisted Evil" src="images/smiles/icon_twisted.gif"/></a></td></tr><tr valign="middle" align="center"><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :roll: \';txtarea.focus();" name="emotka"><img border="0" title="Rolling Eyes" alt="Rolling Eyes" src="images/smiles/roll.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :wink: \';txtarea.focus();" name="emotka"><img border="0" title="Wink" alt="Wink" src="images/smiles/wink.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :| \';txtarea.focus();" name="emotka"><img border="0" title="Neutral" alt="Neutral" src="images/smiles/neutral.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :mrgreen: \';txtarea.focus();" name="emotka"><img border="0" title="Mr. Green" alt="Mr. Green" src="images/smiles/icon_mrgreen.gif"/</a></td></tr></tbody></table></td><td id="poletxt"><textarea class="post" tabindex="3" style="width: 100%;background-color:#0c0c0c;" wrap="virtual" rows="10" name="message" id="message"/></textarea></td>';
        var tr4 = document.createElement("tr");
        tr4.innerHTML = '<td style="padding:0"></td><td style="padding:0" id="opcje"><table width="100%"><tr><td><input type="checkbox" name="disable_bbcode"/> <span class="gen">Wyłącz BBCode</span> <input type="checkbox" name="disable_smilies"/> <span class="gen">Wyłącz Uśmieszki</span> <input type="checkbox" checked="checked" name="attach_sig"/> <span class="gen">Dodaj podpis</span></td><td align="right"><input type="hidden" name="mode" value="reply" /><input type="hidden" name="sid" value="'+sid+'" /><input type="hidden" name="t" value="'+topicid+'" /> <input type="submit" tabindex="5" name="preview" class="mainoption" value="Podgląd"> <input type="submit" accesskey="s" tabindex="6" name="post" class="mainoption" value="Wyślij" id="post" /></td></tr></table></td>';
        
        // dodawanie nowych rzeczy
        select1.appendChild(optionK1);
        select1.appendChild(optionK2);
        select1.appendChild(optionK3);
        select1.appendChild(optionK4);
        select1.appendChild(optionK5);
        select1.appendChild(optionK6);
        select1.appendChild(optionK7);
        select1.appendChild(optionK8);
        select1.appendChild(optionK9);
        select1.appendChild(optionK10);
        select1.appendChild(optionK11);
        select1.appendChild(optionK12);
        select1.appendChild(optionK13);
        select1.appendChild(optionK14);
        select1.appendChild(optionK15);
        
        select2.appendChild(option1);
        select2.appendChild(option2);
        select2.appendChild(option3);
        select2.appendChild(option4);
        select2.appendChild(option5);
        select2.appendChild(option6);
        
        td1.appendChild(input1);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input2);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input3);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input4);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input5);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input6);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input7);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input8);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(input9);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(select1);
        td1.appendChild(document.createTextNode(' '));
        td1.appendChild(select2);
        tr2.appendChild(td1);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
        form.appendChild(table);
        tdMain.appendChild(form);
        trMain.appendChild(tdMain);
        targetd.parentNode.insertBefore(trMain, targetd.nextSibling);
    }
}

function zmienKolorRozmiar() {
    var txtarea = document.getElementById('message');
    var zmienna = this.options[this.selectedIndex].value;
    if(this.id == 'rozmiar'){
        var bbopen = '[size=' + zmienna + ']';
        var bbclose = '[/size]';
    }
    if(this.id == 'kolor'){
        var bbopen = '[color=' + zmienna + ']';
        var bbclose = '[/color]';
    }
    this.options.selectedIndex=0;
    
    if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0)){
        mozWrap(txtarea, bbopen, bbclose);
        return;
    }
}

function bbstyle(bbnumber) {
    var txtarea = document.getElementById('message');
    if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0)){
        mozWrap(txtarea, bbtags[bbnumber], bbtags[bbnumber+1]);
        txtarea.scrollTop = prevTop;
        return;
    }
}

function mozWrap(txtarea, open, close){
    var selLength = txtarea.textLength;
    var selStart = txtarea.selectionStart;
    var selEnd = txtarea.selectionEnd;
    if (selEnd == 1 || selEnd == 2)
        selEnd = selLength;
    
    var s1 = (txtarea.value).substring(0,selStart);
    var s2 = (txtarea.value).substring(selStart, selEnd)
    var s3 = (txtarea.value).substring(selEnd, selLength);
    txtarea.value = s1 + open + s2 + close + s3;
    if(close=='[/b]'||close=='[/u]'||close=='[/i]'||close=='[/size]'||close=='[/color]'){
        txtarea.selectionStart = selStart;
        txtarea.selectionEnd = selEnd + open.length + close.length;
        txtarea.focus();
    }
    return;
}


function zaznaczTekst(){
    
    var zaznaczone = window.getSelection();
    if(zaznaczone != '' && zaznaczone.anchorNode.parentNode.className == 'postbody'){
        var span = document.createElement('span');
        span.setAttribute('class', 'postdetails');
        span.setAttribute('id', 'plusJeden');
        span.setAttribute('style', 'vertical-align: 4px; color: #00CC00');
        span.innerHTML = '+1 ';
        this.parentNode.insertBefore(span, this);
        
        var nick = zaznaczone.anchorNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
        var message = document.getElementById('message');
        message.innerHTML += '[quote="' + nick.innerHTML + '"]' + zaznaczone + '[/quote]\n\n';
        ukryjPlus1();
    }
}

function ukryjPlus1(){
    setTimeout(function (){
        var plusJeden = document.getElementById('plusJeden');
        plusJeden.parentNode.removeChild(plusJeden)
    }, 1000);
}
