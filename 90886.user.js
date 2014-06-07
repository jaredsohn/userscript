//
// ==UserScript==
// @name          hwmInventory
// @homepage      http://userscripts.org/scripts/show/90886
// @version       1.2
// @description   hwmInventory
// @include       http://www.heroeswm.ru/inventory.php*
// ==/UserScript==

var unsafe = browserInit();
// hwmHide
browserInit();
var input = getItem("//table[contains(@background, 'i/kukla/')]");
if(input) {
    input = input.parentNode.parentNode.parentNode;
    var list = getI("tr", input);
    for(var count=0; count<list.snapshotLength; count++) {
        var item = list.snapshotItem(count);
        item = getItem('td/b', item);
        if(item && item.innerHTML.length==7) {
            var hwmHide = getItem('td', list.snapshotItem(count+1));
            if(getItem('table', hwmHide)) {
                hwmHide = getItem('table/tbody/tr[1]/td[1]', hwmHide);
            }
            var textClose = '\u0423\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u043e\u0434\u0430\u0436\u0443 \u0432 \u0433\u043e\u0441';
            var textOpen = '\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0434\u0430\u0436\u0443 \u0432 \u0433\u043e\u0441';
            hwmHide.innerHTML = '<div style="display:table-cell; vertical-align:middle; float:right; padding-right:5px; cursor:pointer;">'
                                +'<b><small>'+ (GM_getValue("hwmRepairHide") ? textOpen: textClose) +'</small></b>'
                                +'</div>'
                                + hwmHide.innerHTML;
            getItem('div', hwmHide).addEventListener("click", shangeShowHide, false);
        }
    }
}
var isHide = GM_getValue("hwmRepairHide");
function shangeShowHide() {     isHide = isHide ? 0 : 1;
     GM_setValue("hwmRepairHide", isHide)

     getItem('div/b/small', hwmHide).innerHTML = isHide ? textOpen: textClose;
     showHideInventory();}
function showHideInventory() {
    var list = getI( "//a[contains(@href, '/inventory.php?sell=')]" );
    for(var i=0; i<list.snapshotLength; i++) {
        var sign_a = list.snapshotItem(i)
        if(sign_a) {
        	sign_a = sign_a.parentNode;
        	sign_a.style.display = isHide ? "none" : '';
        }
    }
}





var show_arts_by_cat_old = unsafe.show_arts_by_cat;
var idCat = 1;
unsafe.show_arts_by_cat = function(cat, r) {
    idCat = r;
    //pre(cat, r);
    if(r>1 && r<6) {
        var old = unsafe.arts_cat;
        for(var i in unsafe.arts_cat) {
            var id = ':'+ unsafe.arts_id[i] +':';
            if(set[r].indexOf(id)!=-1) {
                unsafe.arts_cat[i] = cat;
            } else {                unsafe.arts_cat[i] = '';            }
        }
        show_arts_by_cat_old(cat, r);
        unsafe.arts_cat = old;
    } else if(r==8) {        //pre(r);
        var old = unsafe.arts_star2;
        for(var i in unsafe.arts_cat) {
            unsafe.arts_star2[i] = 0;
            var id = ':'+ unsafe.arts_id[i] +':';
            var is = false;
            for(var j=2; j<6; j++) {
                if(set[j].indexOf(id)!=-1) {
                    is = true;
                    break;
                }
            }
            if(!is) {
                unsafe.arts_star2[i] = 1;            }
        }
        show_arts_by_cat_old(cat, r);
        unsafe.arts_star2 = old;    } else {        show_arts_by_cat_old(cat, r);    }
    showHideInventory();

    var art = getI("//a[contains(@onclick, 'javascript: change_star1(')]");
    for(var count=0; count<art.snapshotLength; count++) {        var main = art.snapshotItem(count).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        main = getItem('tr[2]/td', main);
        var div = document.createElement('div');
        main.insertBefore(div, getItem('li', main)) ;
        div.style.cssText = 'float:right;white-space: nowrap;';
        var id = parseInt(art.snapshotItem(count).getAttribute('onclick').substring(25));
        var is1 = set[2].indexOf(':'+ id +':')!=-1 ? 'inv_s_y1' : 'inv_s_y0';
        var is2 = set[3].indexOf(':'+ id +':')!=-1 ? 'inv_s_b1' : 'inv_s_b0';
        var is3 = set[4].indexOf(':'+ id +':')!=-1 ? 'inv_s_y1' : 'inv_s_y0';
        var is4 = set[5].indexOf(':'+ id +':')!=-1 ? 'inv_s_b1' : 'inv_s_b0';

        var trash = getItem('a[3]', art.snapshotItem(count).parentNode);
        getItem('td[1]', art.snapshotItem(count).parentNode.parentNode).colSpan = 2;
        deleteItem(art.snapshotItem(count).parentNode);
        div.innerHTML = '<br /><a href="javascript:void(0);" name="2">'
                            +'<img width="11" height="11" border="0" title="\u041e\u0441\u043d\u043e\u0432\u043d\u044b\u0435" src="i/'+ is1 +'.gif" alt="">'
                        +'</a>&nbsp;'
                        +'<a href="javascript:void(0);" name="3">'
                            +'<img width="11" height="11" border="0" title="\u041a\u0440\u0430\u0444\u0442" src="i/'+ is2 +'.gif" alt="">'
                        +'</a>&nbsp;'
                        +'<a href="javascript:void(0);" name="4">'
                            +'<img width="11" height="11" border="0" title="\u0421\u0435\u0442" src="i/'+ is3 +'.gif" alt="">'
                        +'</a>&nbsp;'
                        +'<a href="javascript:void(0);" name="5">'
                            +'<img width="11" height="11" border="0" title="\u0420\u0430\u0437\u043d\u043e\u0435" src="i/'+ is4 +'.gif" alt="">'
                        +'</a>&nbsp;';
        div.appendChild(trash);
        div.setAttribute('art', id);
        getItem('a[1]', div).addEventListener("click", changeInentory, false);
        getItem('a[2]', div).addEventListener("click", changeInentory, false);
        getItem('a[3]', div).addEventListener("click", changeInentory, false);
        getItem('a[4]', div).addEventListener("click", changeInentory, false);
    }
}


var set = new Array();
for(var i=2; i<6; i++) {    set[i] = GM_getValue("hwmInventorySet:"+ i);
    if(!set[i]) set[i] = '';}
function changeInentory() {
    var id = this.parentNode.getAttribute('art');
    var name = 'hwmInventorySet:'+ this.getAttribute('name');
    var str = GM_getValue(name);
    if(!str) str = ':';
    var img = getItem('img', this);
    if(str.indexOf(':'+ id +':')==-1) {
        str += id +':';
        img.src = str_replace('0.gif', '1.gif', img.src);
    } else {
        str = str_replace(':'+ id +':', ':', str);
        img.src = str_replace('1.gif', '0.gif', img.src);
    }
    GM_setValue(name, str);
    set[this.getAttribute('name')] = str;
    if((idCat>1 && idCat<6) || idCat==8) {
        unsafe.show_c();
    }
}


//Menu
getId('ln2').innerHTML = '\u041e\u0441\u043d\u043e\u0432\u043d\u044b\u0435';
getId('ln3').innerHTML = '\u041a\u0440\u0430\u0444\u0442';
getId('ln4').innerHTML = '\u0421\u0435\u0442';
getId('ln5').innerHTML = '\u0420\u0430\u0437\u043d\u043e\u0435';
getItem('img', getId('ln7')).style.display = 'none';
getItem('img', getId('ln8')).style.display = 'none';
getId('tbc8').width = '87';
getId('ln8').innerHTML += '\u0411\u0435\u0437&nbsp;\u0433\u0440\u0443\u043f\u043f\u044b';
unsafe.show_c();





function explode(delimiter, string) {	// Split a string by string
	//
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: kenneth
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var emptyArray = { 0: '' };

	if ( arguments.length != 2
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined' )
	{
		return null;
	}

	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null )
	{
		return false;
	}

	if ( typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object' )
	{
		return emptyArray;
	}

	if ( delimiter === true ) {
		delimiter = '1';
	}

	return string.toString().split ( delimiter.toString() );
}
function str_replace( search, replace, subject ) {
    if(!(replace instanceof Array)){
        replace=new Array(replace);
        if(search instanceof Array){
            while(search.length>replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length>replace.length){
		replace[replace.length]='';
	}

	if(subject instanceof Array){
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}

	for(var k=0; k<search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;
}
function pre() {
    if(unsafeWindow && unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(arguments);
    }
}
function deleteItem(item) {
    item.parentNode.removeChild(item);
}
function getI(xpath, elem){    return document.evaluate(xpath, (!elem?document:elem), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getItem(xpath, elem){
    return document.evaluate(xpath, (!elem?document:elem),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function getParentItem(xpath, elem){
    return window.parent.document.evaluate(xpath, elem,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function getId(id) {
    return document.getElementById(id);}
function browserInit() {
    var ua = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    !/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
        [];

    if(match[1]!='mozilla') {
        GM_setValue = function(name, value) {
            var cookie_string = name + "=" + escape (value);
            var expires = new Date ( 2050, 0, 0);
            cookie_string += "; expires=" + expires.toGMTString();
            document.cookie = cookie_string;
        }

        GM_getValue = function(name) {
            var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
            if ( results )
            return ( unescape ( results[2] ) );
            else
            return null;
        }

        GM_xmlhttpRequest = function (details) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                var responseState = {
                    responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
                    responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
                    readyState:xmlhttp.readyState,
                    responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
                    status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
                    statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
                }
                if (details["onreadystatechange"]) {
                    details["onreadystatechange"](responseState);
                }
                if (xmlhttp.readyState==4) {
                    if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                        details["onload"](responseState);
                    }
                    if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                        details["onerror"](responseState);
                    }
                }
            }
            try {
              //cannot do cross domain
              xmlhttp.open(details.method, details.url);
            } catch(e) {
              if( details["onerror"] ) {
                //simulate a real error
                details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
              }
              return;
            }
            if (details.headers) {
                for (var prop in details.headers) {
                    xmlhttp.setRequestHeader(prop, details.headers[prop]);
                }
            }
            xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
        }
        return window;
    } else {
        return unsafeWindow;
    }
}