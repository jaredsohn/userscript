// (c) 2013 , Обрыв (http://heroeswarandmoney.blogspot.ru/)

// ==UserScript==
// @name          hwm_roul_statistics
// @description   HWM mod - statistics of hwm roul
// @homepage      http://heroeswarandmoney.blogspot.ru/2013/03/blog-post.html
// @version       0.5
// @include       http://www.heroeswm.ru/roulette.php*
// ==/UserScript==

var g_rform = document.evaluate( "//form[@name='rform']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
var g_ver = "0.5";
Init();

function Init()
{
    var b = document.getElementsByTagName( "rform" ) ;
    var bo = document.getElementsByTagName( "body" ) ;
    var link = g_rform.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[7];   
    var txt = document.createElement( 'TextNode' );
    txt.textContent = " | ";
    link.insertBefore( txt , link.childNodes[8] ) ;

    var op = GM_getValue( "hwm_roul_show" );      
    if(op == 1)
        ShowRoul();
    else
        ButtonShow();

}


function ButtonShow()
{
    var el = document.getElementById("id_span_hide");
    if(el)
		el.parentNode.removeChild(el);
    var link = g_rform.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[7];   
    var span = document.createElement( 'span' );
    span.innerHTML="\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C\u0020\u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443\u0020\u0440\u0443\u043B\u0435\u0442\u043A\u0438";
    span.style.textDecoration = "underline";
    span.style.cursor = "pointer";
    span.id = "id_span_show";
    span.style.color = "red";
    EventListener(span, "click", ShowRoul);
    link.insertBefore( span , link.childNodes[9] ) ;
    var op = GM_getValue( "hwm_roul_show" );      
    GM_setValue( "hwm_roul_show" , 0 ) ;
}

function ButtonHide()
{
    var el = document.getElementById("id_span_show");
    if(el)
		el.parentNode.removeChild(el);
    var link = g_rform.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[7];   
    var span = document.createElement( 'span' );
    span.innerHTML="\u0421\u043A\u0440\u044B\u0442\u044C\u0020\u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443\u0020\u0440\u0443\u043B\u0435\u0442\u043A\u0438";
    span.style.textDecoration = "underline";
    span.style.cursor = "pointer";
    span.id = "id_span_hide";
    span.style.color = "red";
    EventListener(span, "click", HideRoul);
    link.insertBefore( span , link.childNodes[9] ) ;
    var op = GM_getValue( "hwm_roul_show" );      
    GM_setValue( "hwm_roul_show" , 1 ) ;

}


function EventListener(elm, event, func)
{
	if(typeof elm.attachEvent != "undefined")
		elm.attachEvent("on" + event, func);
	else if(typeof elm.addEventListener != "undefined")
		elm.addEventListener(event, func, true);

}

function RemEventListener(elm, event, func)
{
	if(typeof elm.removeEvent != "undefined")
		elm.removeEvent("on" + event, func);
	else if(typeof elm.removeEventListener != "undefined")
		elm.removeEventListener(event, func, true);
	else if(typeof elm.detachEvent != "undefined")
		elm.detachEvent("on" + event, func);
}

function HideRoul()
{
    ButtonShow();
    var el = document.getElementById("detal_hwm_roul");
    if(el)
		el.parentNode.removeChild(el);
        
    el = document.getElementById("table_show");
    if(el)
		el.parentNode.removeChild(el);
        
        
}

function ShowRoul_Full()
{
    GM_setValue("roul_show",1);  
    HideRoul();
    ShowRoul();
}


function ShowRoul_DazCol()
{
    GM_setValue("roul_show",2);  
    HideRoul();
    ShowRoul();   
}

function GetTableShow()
{  
    var roul_show = GM_getValue("roul_show");
    if(roul_show == null)
    {
        GM_setValue("roul_show",3); 
        roul_show = 3;
    }
    
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var txt1 = document.createElement( 'a' );
    txt1.innerHTML = "&nbsp;\u007C&nbsp;";
    var txt2 = document.createElement( 'a' );
    txt2.innerHTML = "&nbsp;\u007C&nbsp;";
    var a1 = document.createElement('a');
    var a2 = document.createElement('a');
        

    tr.id = "table_show";
    tr.style.textAlign = "center";
    td.colSpan = "3";
    
    a1.innerHTML = "Red&Black/1-18&19-36/EVEN&ODD";

    a1.style.textDecoration = "underline";
    a1.style.cursor = "pointer";
    EventListener(a1, "click", ShowRoul_Full);
    
    a2.innerHTML = "Dozen/Column";
    a2.style.textDecoration = "underline";
    a2.style.cursor = "pointer";
    EventListener(a2, "click", ShowRoul_DazCol);
   
    
    
    if(roul_show == 1)
        a1.style.fontWeight = "bold";    
    else  if(roul_show == 2)
        a2.style.fontWeight = "bold"

    
    td.appendChild(a1);
    td.appendChild(txt1);
    td.appendChild(a2);
    
    

    tr.appendChild(td);

    
    return tr;
}

function ShowRoul()
{
    var roul_show = GM_getValue("roul_show");
    if(roul_show == null)
    {
        GM_setValue("roul_show",2); 
        roul_show = 2;
    }
    ButtonHide();
    
    var els = g_rform.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[13].childNodes[0];   
    var div = document.createElement( 'div' );
    div.style.textAlign="center";
    
    var tr = document.createElement('tr');
    tr.id="detal_hwm_roul";
    var td = document.createElement('td');
    td.colSpan = 3;
    var d_copy  = document.createElement( 'div' );
    d_copy.style.textAlign="center";
    d_copy.innerHTML = '';

    var ifame = document.createElement( 'iframe' );

    
   // var chdiv = document.createElement( 'div' );
   // chdiv.innerHTML = "Full | DazCol";
    var show;
    ifame.width = "730px";
    
    if(roul_show == 1)
    {
        ifame.height = "555px";
        show="blog-post_15.html";
    }    
    else  if(roul_show == 2)
    {
        ifame.height = "555px";
        show="blog-post.html";
    }


    ifame.scrolling = "no";
    ifame.frameBorder= 0;

        
    ifame.src = "http://roulettestaistic.blogspot.ru/2013/03/"+show;

   
    
    
    
    

    
    div.appendChild(ifame);
    td.appendChild(div);
    td.appendChild(d_copy);
    tr.appendChild(td);
       
    
    els.insertBefore( tr , els.firstChild ) ;
    els.insertBefore( GetTableShow() , els.firstChild ) ;
}

function ClearUrl(url)
{
	if(typeof color_url == undefined)
		return undefined;
    if(url.indexOf("http://") != -1)
		url= url.substring(7, url.length);
	if(url.indexOf("www.") != -1)
		url= url.substring(4, url.length);
    return url;
}

function GM_setValue( cookieName, cookieValue ) {
	if( !cookieName ) { return; }
	lifeTime = 31536000;
	document.cookie = escape( cookieName ) + "=" + escape(  cookieValue ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
}

function GM_getValue( cookieName ) {
    var oDefault = null;
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) {
			try {
				eval('var footm = '+unescape( oneCookie[1] ));
			} catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
 
}
