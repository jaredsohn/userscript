// ==UserScript==
// @name       Clean TPB
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://*thepiratebay.org/search/*
// @copyright  2011,2012, You
// ==/UserScript==
function myinit()
{
    top.clean_page=clean_page;
    top.save_cookie=save_cookie;
    top.load_cookie=load_cookie;
    top.write_from_params=write_from_params;
    top.load_defaults=load_defaults;
    a=document.getElementById('SearchResults');
    load_cookie();
    d=document.createElement('div');
    dd=document.createElement('input');
    dd.type="text";
    dd.id="maxsize";
    d.appendChild(dd);
    dd=document.createElement('select');
    dd.id="sizetype";
    ddd=document.createElement('option');
    ddd.innerHTML="GiB";
    dd.appendChild(ddd);
    ddd=document.createElement('option');
    ddd.innerHTML="MiB";
    dd.appendChild(ddd);
    ddd=document.createElement('option');
    ddd.innerHTML="KiB";
    dd.appendChild(ddd);
    d.appendChild(dd);
    dd=document.createElement('select');
    dd.id="requireratio";
    ddd=document.createElement('option');
    ddd.innerHTML="true";
    dd.appendChild(ddd);
    ddd=document.createElement('option');
    ddd.innerHTML="false";
    dd.appendChild(ddd);
    d.appendChild(dd);
    dd=document.createElement('button');
    dd.innerHTML="apply"
    dd.onclick=clean_page;
    d.appendChild(dd);
    dd=document.createElement('button');
    dd.innerHTML="default"
    dd.onclick=save_cookie;
    d.appendChild(dd);
    a.insertBefore(d,a.firstChild);
    load_defaults();
    clean_page();
}
function load_defaults()
{
    write_from_params("value",["maxsize","sizetype","requireratio"]);
}
function load_cookie()
{
    if(top.params==undefined)
        top.params=new Array();
    var elems=document.cookie.split('; ');
    for(var c=0;c<elems.length;++c)
    {
        var parts=elems[c].split('=');
        params[parts[0]]=parts[1];
    }
}
function write_from_params(attr,elems)
{
    for(var c=0;c<elems.length;++c)
        document.getElementById(elems[c])[attr]=params[elems[c]];
}
function save_cookie()
{
    write_to_cookie("value",["maxsize","sizetype","requireratio"]);
}
function write_to_cookie(attr,elems)
{
    var text="";
    for(var c=0;c<elems.length;++c)
        document.cookie=elems[c]+"="+document.getElementById(elems[c])[attr]+";path=/search; ";
}
function clean_page()
{
    a=document.getElementById('searchResult').lastChild;	
    rows=a.children;
    for(c=0;c<rows.length;++c)
    {
        var hide=false;
        var hidden=rows[c].style.display=="none"
	fields=rows[c].children;
        if(document.getElementById('requireratio').value=="true")
        {
            seed=parseInt(fields[2].innerHTML);
            leech=parseInt(fields[3].innerHTML);
            if(leech>=seed)
                hide=true;
        }
        var maxsize=document.getElementById('maxsize').value;
	if(!hide && maxsize) 
	{
            var text=rows[c].getElementsByTagName('font')[0].innerHTML.split(',')[1].split(' ')[2].split('&nbsp;');
            var sizetype=document.getElementById('sizetype').value;
            var sizetype2=text[1];
            sizetype=(sizetype=="KiB"?1:sizetype=="MiB"?2:sizetype=="GiB"?3:4);
            sizetype2=(sizetype2=="KiB"?1:sizetype2=="MiB"?2:sizetype2=="GiB"?3:4);
            if(sizetype2>sizetype)
                hide=true
            if(parseFloat(text[0])>parseInt(maxsize))
                hide=true;
	}
        if(hide!=hidden)
            rows[c].style.display=(hide?"none":"table-row");
    }
}
    myinit();
    //clean_page();
