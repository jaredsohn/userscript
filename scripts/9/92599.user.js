// ==UserScript==
// @name          hwmtakeoffon
// @namespace     Demin
// @description   Dressed arts + cost 1 batl
// @homepage      http://userscripts.org/scripts/show/92599
// @version       0.15
// @include       http://*heroeswm.*/inventory.php*
// @include       http://178.248.235.15/inventory.php*
// @include       http://173.231.37.114/inventory.php*
// @include       http://*freebsd-help.org/inventory.php*
// @include       http://*heroes-wm.*/inventory.php*
// @include       http://*hommkingdoms.info/inventory.php*
// @include       http://*hmmkingdoms.com/inventory.php*
// @include       http://*герои.рф/inventory.php*
// ==/UserScript==

var version = '0.15';

var script_num = 92599;
var script_name = 'hwmtakeoffon by Demin';
var string_upd = /92599=(\d+\.\d+)/;

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

try {

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var unsafe = browserInit();
var show_arts_by_cat_old = unsafe.show_arts_by_cat;
var isInit = false;
unsafe.show_arts_by_cat = function(cat, r) {
    show_arts_by_cat_old(cat, r);
    isInit = true;
    setTimeout(function() {
        if(isInit) {
            initAll(true);
        }
        isInit = false;
    }, 500);
}
unsafe.show_c();

dressid_regexp = /art_id=(\d+)/
transed_regexp = /art_transfer.php\?id=(\d+)/
returned_regexp = /inventory.php\?art_return=(\d+)/
prochka_regexp = /<li>\u041f\u0440\u043e\u0447\u043d\u043ec\u0442\u044c: (\d+)\/(\d+)/
prochka_regexp2 = /<li>\u041f\u0440\u043e\u0447\u043d\u043ec\u0442\u044c: <font color="red">(\d+)<\/font>\/(\d+)/

    var trans=[];
    var snart=[];
    for(var i=0x410;i<=0x44F;i++)
    {
    	trans[i]=i-0x350;
    	snart[i-0x350] = i;
    }
    trans[0x401]= 0xA8;
    trans[0x451]= 0xB8;
    snart[0xA8] = 0x401;
    snart[0xB8] = 0x451;

    urlencode = function(str)
    {
    	var ret=[];
    	for(var i=0;i<str.length;i++)
    	{
    		var n=str.charCodeAt(i);
    		if(typeof trans[n]!='undefined')
    		n = trans[n];
    		if (n <= 0xFF)
    		ret.push(n);
    	}

    	return escape(String.fromCharCode.apply(null,ret));
    }

    urldecode = function(str)
    {
    	var ret=[];
    	str = unescape(str);
    	for(var i=0;i<str.length;i++)
    	{
    		var n=str.charCodeAt(i);
    		if(typeof snart[n]!='undefined')
    		n = snart[n];
    		ret.push(n);
    	}
    	return String.fromCharCode.apply(null,ret);
    }



    var sign_a = getI( "//a[contains(@href, 'sign=')]" ).snapshotItem(0) ;
    sign_regexp = /sign=(.+)/  ;
    if(sign_a) {
        sign =  sign_regexp.exec( sign_a.href )[1] ;
    } else {
        sign_regexp = /&sign=([^']+)/;
        for(var i in unsafeWindow.arts1) {
            var sign = sign_regexp.exec( unsafeWindow.arts1[i] );
            if(sign) {
                sign = sign[1];
                break;
            }
        }

    }

    var trade_a = getI( "//a[contains(@href, 'trade_cancel.php')]" ).snapshotItem(0) ;
    if( trade_a )
    {
    	trade_tr = document.createElement( 'tr' )
    	trade_td = document.createElement( 'td' )
    	trade_td.setAttribute( "colspan" , 2 ) ;
    	trade_td.setAttribute( "align" , "right" ) ;
    	trade_td.innerHTML = '<a href="javascript:void(0);" id="trade_cancel"><b>\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0412\u0441\u0435</b>'
    	trade_tr.appendChild( trade_td )
    	trade_a.parentNode.parentNode.parentNode.appendChild( trade_tr )
    	$("trade_cancel").addEventListener( "click", trade_cancel , false );
    }

    var kukla_tbl = getI( "//table[contains(@background, 'i/kukla')]" ).snapshotItem(0) ;
    if( kukla_tbl )
    {
    	o1 = kukla_tbl.parentNode.parentNode.parentNode ;

    	tr = document.createElement( 'tr' );
    	td = document.createElement( 'td' );
    	td.className = 'wb' ;
    	td.setAttribute( 'colspan' , 2 ) ;
    	td.setAttribute( 'align' , 'center' ) ;

    	var btsend = '' ;
    	if( GM_getValue( "setbtsend" ) && GM_getValue( "setbtsend" ) == 1 )
    	{
    		btsend = '<input type="submit" id="trans_send" value="\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c" title="\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c \u0432 \u0440\u0430\u0441\u043f\u043e\u0440\u044f\u0436\u0435\u043d\u0438\u0435 \u0437\u0430 1 \u0437\u043e\u043b\u043e\u0442\u043e\u0439"> '
    	}

    	td.innerHTML = '<style>#thistf A{text-decoration:none;font-size:10px;} #thistf A:hover{color:#00f;}</style><form action="" method="POST" onSubmit="return false;"><table width="100%"><tr><td colspan="8" style="font-size:10px;border-bottom:1px solid #592C08;" align="center" id="thistf"><div style="float:right;margin:0 5px;cursor:pointer;font-weight:bold;" title="\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438" id="jsset">?</div></td></tr><tr><td>\u0418\u043c\u044f</td><td>\u0414\u043d\u0438</td><td><a href="javascript:void(0);" id="day_1_battle">\u0411\u043e\u0438</a></td><td id="tsum0">1\u0437</td><td id="tsum1">\u04261</td><td id="tsum2">\u04262</td><td id="tsum3">\u04263</td><td id="tsum4">\u0412\u041f</td><td></td></tr><tr><td><input id="trans_nick" name="trans_nick" value="" size="15"></td><td><input id="trans_time" value=0 size="1"></td><td><input id="trans_count" value=1 size="1"></td><td><input type="radio" name="sum" checked="true" value="0" id="sum0"></td><td><input type="radio" name="sum" value="1" id="sum1"></td><td><input type="radio" name="sum" value="2" id="sum2"></td><td><input type="radio" name="sum" value="3" id="sum3"></td><td><input type="radio" name="sum" value="4" id="sum4"></td></tr><tr><td colspan="8" align="right"><span id="place4return"></span>'+btsend+'<input type="submit" id="trans_rem" value="\u0420\u0435\u043c\u043e\u043d\u0442" title="\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c \u043d\u0430 \u0440\u0435\u043c\u043e\u043d\u0442 \u0437\u0430 1 \u0437\u043e\u043b\u043e\u0442\u043e\u0439"> <input type="submit" id="trans_a" value="\u0410\u0440\u0435\u043d\u0434\u0430" title="\u0421\u0434\u0430\u0442\u044c \u0432 \u0430\u0440\u0435\u043d\u0434\u0443"></td></tr></table></form>' ;
    	tr.appendChild( td ) ;
    	o1.insertBefore( tr , o1.firstChild.nextSibling )

    	if( ( type_sum = GM_getValue( "hwm_takeoffon_type_sum" ) ) )
    	{
    		$('sum'+type_sum).setAttribute( "checked", "on" ) ;
    		$('tsum'+type_sum).style.fontWeight = "bold"
    		$('tsum'+type_sum).style.color = "#ff0000"
		if (type_sum==2 || type_sum==4) {$('trans_count').value=0}
			else {$('trans_count').value=1}
    	}

    	$('sum0').addEventListener( "click", set_type_sum , false );
    	$('sum1').addEventListener( "click", set_type_sum , false );
    	$('sum2').addEventListener( "click", set_type_sum , false );
    	$('sum3').addEventListener( "click", set_type_sum , false );
    	$('sum4').addEventListener( "click", set_type_sum , false );

    	$("trans_a").addEventListener( "click", trans_on , false );
    	$("trans_rem").addEventListener( "click", trans_rem , false );
    	if( btsend != '' )
    		$("trans_send").addEventListener( "click", trans_send , false );
    	$("day_1_battle").addEventListener( "click", daybattle_form , false );

    	$("jsset").addEventListener( "click", setting , false );

    //+ пїЅпїЅпїЅпїЅпїЅпїЅ "пїЅпїЅпїЅпїЅпїЅпїЅпїЅ"
    	var return_a = getI( "//a[contains(@href, 'inventory.php?art_return=')]" ).snapshotItem(0);
    	if( return_a )
    	{
    		$("place4return").innerHTML='<input type="button" id="return_inp" value="\u0412\u0435\u0440\u043d\u0443\u0442\u044c"> ';
    		$("return_inp").addEventListener( "click", return_go , false );
    	}

    	tr = document.createElement( 'tr' );
    	td = document.createElement( 'td' );
    	td.className = 'wb' ;
    	td.setAttribute( 'colspan' , 2 ) ;
    	td.setAttribute( 'align' , 'center' ) ;
    	td.innerHTML = '<b>\u041f\u0435\u0440\u0435\u0434\u0430\u0447\u0438:</b>' ;
    	tr.appendChild( td ) ;
    	o1.insertBefore( tr , o1.firstChild.nextSibling )
    //-

    }


    var price_List = new Array();

setInterval(function() {
    var anchors = document.getElementsByTagName('a');
    for( var i = 0; i < anchors.length; i++ )
    {
    	var el = anchors[i];
    	if( el.href.indexOf('art_transfer.php' ) > -1 )
    	{
    		params = transed_regexp.exec( el.href ) ;
    		art_id = params[1] ;

    		if( ( price_art_id = GM_getValue( "hwm_takeoffon_price_"+art_id ) ) && price_art_id.indexOf( ';0;0;0;0;' ) < 0 )
    		{
    			price_List[art_id] = {fontWeight: 'bold', color: '#006400'};
    		} else if( ( price_art_name = GM_getValue( "hwm_takeoffon_price_"+name ) ) && price_art_name.indexOf( ';0;0;0;0;' ) < 0 )
    		{
    			price_List[art_id] = {fontWeight: 'bold', color: '#4169E1'};
    		} else
    		{
    			price_List[art_id] = {color: '#808080'};
    		}
    	}
    }
}, 400);

    var tables = document.getElementsByTagName('table');
    for( var i = 0; i < tables.length; i++ )
    {
    	var tbl = tables[i];
    	var bg = tbl.getAttribute("background") ;
    	if(  bg && bg.match( /i\/kukla/ )  )
    	{
    		var a = document.createElement( 'a' );
    		a.href = 'javascript:void(0);' ;
    		a.title = '\u041e\u0434\u0435\u0432\u0430\u044e\u0442\u0441\u044f \u0432\u0441\u0435 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u043d\u044b\u0435 \u0432\u0435\u0449\u0438' ;
    		a.addEventListener( "click", pull_on , false );
    		a.appendChild( document.createTextNode( '\u041d\u0430\u0434\u0435\u0442\u044c' ) ) ;
    		tbl.parentNode.appendChild( a );

    		tbl.parentNode.appendChild( document.createTextNode( ' / ' ) ) ;

    		a1 = document.createElement( 'a' );
    		a1.href = 'javascript: void(0)' ;
    		a1.setAttribute( 'count' , 1 ) ;
    		a1.title = '\u0426\u0435\u043d\u0430 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u0430 \u0437\u0430 1 \u0431\u043e\u0439' ;
    		a1.addEventListener( "click", pull_sum , false );
    		a1.appendChild( document.createTextNode( '\u0426\u0435\u043d\u0430 1' ) ) ;
    		tbl.parentNode.appendChild( a1 );

    		tbl.parentNode.appendChild( document.createTextNode( ' / ' ) ) ;

    		a0 = document.createElement( 'a' );
    		a0.href = 'javascript: void(0)' ;
    		a0.setAttribute( 'count' , 0 ) ;
    		a0.title = '\u0426\u0435\u043d\u0430 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u0430' ;
    		a0.addEventListener( "click", pull_sum , false );
    		a0.appendChild( document.createTextNode( '\u0426\u0435\u043d\u0430' ) ) ;
    		tbl.parentNode.appendChild( a0 )
    	}
    }



var items =
{
//	[ пїЅпїЅпїЅпїЅпїЅпїЅ , пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ, пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ ]

// пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
	leatherhelm:		[ 30 , 1860 , 1900 ] ,
	magehat:			[ 35 , 4800 , 4945 ] ,
	knowledgehat:		[ 25 , 5800 , 5880 ] ,
	chaincoif:		[ 40 , 4620 , 4740 ] ,
	steel_helmet:		[ 70 , 11040 , 11365 ] ,
	mage_helm:		[ 50 , 17200 , 17475 ] ,
	mif_lhelmet:		[ 70 , 15760 , 15760 ] ,

// пїЅпїЅ пїЅпїЅпїЅ
	braverymedal:		[ 25 , 1660 , 1695 ] ,
	lucknecklace:		[ 25 , 2860 , 2930 ] ,
	power_pendant:		[ 60 , 22200 , 22200 ] ,
	warrior_pendant:	[ 50 , 24200 , 24200 ] ,
	magic_amulet:		[ 50 , 25200 , 25200 ] ,

// пїЅпїЅ пїЅпїЅпїЅпїЅ
	leathershield:		[ 25 , 780 , 970 ] ,
	chainarmor:		[ 40 , 6880 , 7140 ] ,
	ciras:			[ 70 , 13400 , 13850 ] ,
	mage_armor:		[ 50 , 27200 , 28210 ] ,
	mif_light:		[ 70 , 18800 , 18800 ] ,
	full_plate:		[ 75 , 27800 , 27800 ] ,

// пїЅпїЅпїЅпїЅпїЅ
	antifire_cape:		[ 40 , 1000 , 40000 ] ,
	soulcape:			[ 30 , 3580 , 4075 ] ,
	antiair_cape:		[ 60 , 8800 , 9090 ] ,
	powercape:		[ 40 , 24400 , 25470 ] ,
	antimagic_cape:	[ 50 , 14880 , 14880 ] ,

// пїЅпїЅпїЅпїЅпїЅпїЅ
	woodensword:		[ 7 , 400 , 400 ] ,
	onehandaxe:		[ 25 , 860 , 850 ] ,
	steelsword:		[ 30 , 1380 , 1550 ] ,
	def_sword:		[ 40 , 3860 , 3890 ] ,
	dagger:			[ 30 , 2720 , 2800 ] ,
	requitalsword:		[ 40 , 7600 , 7880 ] ,
	staff:			[ 40 , 9040 , 9350 ] ,
	broadsword:		[ 60 , 14200 , 14680 ] ,
	long_bow:			[ 50 , 19000 , 19000 ] ,
	power_sword:		[ 80 , 29400 , 30570 ] ,
	sor_staff:		[ 50 , 43400 , 43400 ] ,
	mif_sword:		[ 70 , 49560 , 49560 ] ,
	mif_staff:		[ 70 , 49280 , 49280 ] ,
	energy_scroll:		[ 70 , 27200 , 27200 ] ,

// пїЅпїЅпїЅпїЅ
	roundshield:		[ 7 , 300 , 300 ] ,
	protectshield:		[ 40 , 3400 , 3445 ] ,
	dragon_shield:		[ 70 , 26400 , 27450 ] ,
	large_shield:		[ 70 , 28800 , 28800 ] ,

// пїЅпїЅпїЅпїЅпїЅ
	hunterboots:		[ 30 , 2720 , 2800 ] ,
	initboots:		[ 40 , 7160 , 7390 ] ,
	steel_boots:		[ 70 , 17400 , 18045 ] ,
	mif_lboots:		[ 55 , 21500 , 21500 ] ,

// пїЅпїЅ пїЅпїЅпїЅпїЅ
	eaglering:		[ 18 , 4720 , 4890 ] ,
	necroring:		[ 12 , 5720 , 5890 ] ,
	hastering:		[ 30 , 5800 , 5890 ] ,
	circ_ring:		[ 50 , 19560 , 20430 ] ,
	powerring:		[ 40 , 21200 , 212000 ] ,
	darkring:			[ 50 , 25200 , 25200 ] ,
	warriorring:		[ 40 , 23100 , 23100 ] ,

// пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	bril_pendant:		[ 50 , 70000 , 70000 ] ,
	flower_heart:		[ 20 , 5000 , 5000 ] ,
	half_heart_m:		[ 25 , 15000 , 15000 ] ,
	half_heart_w_b:	[ 25 , 15000 , 15000 ] ,
	defender_dagger:	[ 15 , 4000 , 4000 ] ,
	flowers1:			[ 10 , 1000 , 1000 ] ,
	flowers2:			[ 10 , 1000 , 1000 ] ,
	flowers3:			[ 15 , 10000 , 10000 ] ,
	bril_ring:		[ 40 , 100000 , 100000 ] ,
	d_spray:			[ 15 , 10000 , 10000 ] ,
	protazan:			[ 40 , 25000 , 25000 ] ,
	goldciras:		[ 50 , 40000 , 40000 ] ,
}

} finally { update_n() }

function pre() {
    if(unsafeWindow && unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(arguments);
    }
}
function browserInit() {
    var ua = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    !/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
        [];

    if(match[1]!='mozilla') {

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
}//

function initAll(isTrue) {
    var anchors = document.getElementsByTagName('a');
    for( var i = 0; i < anchors.length; i++ )
    {
    	var el = anchors[i];

    	if( el.href.indexOf('art_transfer.php' ) > -1 )
    //+ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ "пїЅпїЅпїЅпїЅ", пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅ
    	{
    		params = transed_regexp.exec( el.href ) ;
    		art_id = params[1] ;

    		price_a = document.createElement( 'a' );
    		price_a.innerHTML = '\u0446\u0435\u043d\u044b' ;
    		price_a.setAttribute( "art_id" , art_id )
    		price_a.id = "id_price_a"+art_id;
    		price_a.href = 'javascript:void(0);' ;
    		price_a.addEventListener( "click", price_form , false );

    // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ + пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
    		need = el.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild
    // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
    		title = need.innerHTML.split('<b>')[1].split('</b>')[0] ;
    // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ (пїЅпїЅпїЅ)
    		name = need.innerHTML.split('id=')[1].split('"><b>')[0].split('&')[0]

    		price_a.setAttribute( "art_name" , name )
    		price_a.setAttribute( "art_title" , title )

    // пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
	if (prochka_regexp.exec( el.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML )){
    		art_pr = prochka_regexp.exec( el.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML )
	}
	else {
    		art_pr = prochka_regexp2.exec( el.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML )
	}
    		price_a.setAttribute( "art_pr" , art_pr[2] )

    //+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
    		need1 = el.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.nextSibling.lastChild;
    		need1.style.cssText = 'white-space: nowrap;';
    		//td = document.createElement( 'td' );
    		//td.style.textAlign="right";
    		//td.style.width="100%";
    		//td.style.paddingRight="10px";
    		//need1.insertBefore( td , need1.firstChild.nextSibling ) ;

    		sp = document.createElement( 'span' );
    		sp.id = "span_dress_id_" + art_id ;
    		need1.appendChild( sp ) ;

    		inp = document.createElement( 'input' );
    		inp.type = "checkbox" ;
    		inp.name = "dress_id" ;
    		inp.value = art_id ;
    		inp.id = "dress_id_" + art_id ;
    		inp.setAttribute( 'art_pr' , art_pr[1] )
    		inp.checked = false ;
    		need1.insertBefore( inp , need1.firstChild.nextSibling ) ;

    //- пїЅпїЅпїЅпїЅпїЅпїЅпїЅ

    		if( ( price_art_id = GM_getValue( "hwm_takeoffon_price_"+art_id ) ) && price_art_id.indexOf( ';0;0;0;0;' ) < 0 )
    		{
    			price_a.style.fontWeight = "bold"
    			price_a.style.color = "#006400"
    		} else if( ( price_art_name = GM_getValue( "hwm_takeoffon_price_"+name ) ) && price_art_name.indexOf( ';0;0;0;0;' ) < 0 )
    		{
    			price_a.style.fontWeight = "bold"
    			price_a.style.color = "#4169E1"
    		} else
    		{
    			price_a.style.color = "#808080"
                /*if(price_List[art_id] && price_List[art_id].color) {
                    price_a.style.color = price_List[art_id].color;
                }
                if(price_List[art_id] && price_List[art_id].fontWeight) {
                    price_a.style.fontWeight = price_List[art_id].fontWeight;
                }*/
    		}

    		el.parentNode.insertBefore( price_a , el.nextSibling ) ;
    		el.parentNode.insertBefore( document.createTextNode( ' : ' ) , el.nextSibling ) ;
    //-
    	} else if( el.href.indexOf( 'art_return=' ) > -1 )
    //+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ
    	{
    		params = returned_regexp.exec( el.href ) ;
    		art_id = params[1] ;
    		need1 = el.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.nextSibling
    		td = document.createElement( 'td' );
    		td.style.textAlign="right";
    		td.style.width="100%";
    		td.style.paddingRight="10px";
    		need1.insertBefore( td , need1.firstChild.nextSibling ) ;

    		sp = document.createElement( 'span' );
    		sp.id = "span_dress_id_" + art_id ;
    		td.appendChild( sp ) ;

    		inp = document.createElement( 'input' );
    		inp.type = "checkbox" ;
    		inp.name = "dress_id" ;
    		inp.value = art_id ;
    		inp.id = "dress_id_" + art_id ;
    //		inp.setAttribute( 'art_pr' , art_pr[1] )
    		inp.checked = false ;
    		td.appendChild( inp ) ;
    //-
    	}
    }
}

//+ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
function pull_sum()
{
	var item_regexp = /\/(\w+)_s.jpg/ ;
	s = 0 ;
	for( var i = 0; i < anchors.length; i++ )
	{
		var el = anchors[i];
		if( el.href.match(/inventory.php\?pull_off=/) )
		{
			p = item_regexp.exec( el.innerHTML ) ;
			item = eval( 'items.' + p[1] ) ;
// 35% пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ, пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ 65%
			if( item ) s += Math.floor( this.getAttribute( 'count' ) == 1 ? ( item[2] - item[1]*0.65 ) / item[0] : item[2] ) ;
		}
	}
	alert( s ) ;
	return false;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
function set_type_sum()
{
	if( ( old = GM_getValue( "hwm_takeoffon_type_sum" ) ) )
	{
		$("tsum"+old).style.fontWeight = "normal"
		$('tsum'+old).style.color = "#592C08"
	}

	GM_setValue( "hwm_takeoffon_type_sum" , this.value );
	$("tsum"+this.value).style.fontWeight = "bold"
	$('tsum'+this.value).style.color = "#ff0000"

	if (this.value==2 || this.value==4) {$('trans_count').value=0}
		else {$('trans_count').value=1}
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
returned = false ;
function return_go()
{
	var need_a = getI( "//a[contains(@href, 'inventory.php?art_return=')]" ) ;
	returned_regexp = /art_return=(\d+)/
	for( var i=0; i<need_a.snapshotLength; i++)
	{
		var this_a = need_a.snapshotItem(i);
		var art_id =  returned_regexp.exec( this_a.href ) ;

		if( $("dress_id_"+art_id[1]) && $("dress_id_"+art_id[1]).type == "checkbox" && $("dress_id_"+art_id[1]).checked )
		{
			returned = true ;
			$("span_dress_id_"+art_id[1]).innerHTML = loader ;
			GM_xmlhttpRequest
			({
				method:"GET",
				url: this_a.href ,
				onload:function(res)
				{
					$("dress_id_"+art_id[1]).type = "radio" ;
					$("dress_id_"+art_id[1]).selected = true ;
					return_go() ;
				}
			});
			return;
		}
	}
	if( returned ) window.location.href = url_cur ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅ
dressed = false ;
function pull_on()
{
	var inputs = document.getElementsByTagName('input');
	for( var i = 0; i < inputs.length; i++ )
	{
		var inp = inputs[i];
		if( inp.type == "checkbox" && inp.name == "dress_id" && inp.checked )
		{
			dressed = true ;
			document.getElementById("span_dress_id_"+inp.value).innerHTML = loader ;
			GM_xmlhttpRequest
			({
				method:"GET",
				url: url+"inventory.php?dress="+inp.value,
				onload:function(res)
				{
					inp.type = "radio" ;
					inp.selected = true ;
					document.getElementById("span_dress_id_"+inp.value).innerHTML = '' ;
					pull_on() ;
				}
			});
			return;
		}
	}
	if( dressed ) window.location.href = url_cur ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
traded = false ;
function trade_cancel()
{
	var inputs = document.getElementsByTagName('a');
	for( var i = 0; i < inputs.length; i++ )
	{
		var inp = inputs[i];
		if( inp.href.indexOf( 'trade_cancel.php' ) > -1 )
		{
			traded = true ;
			inp.parentNode.innerHTML = loader ;
			GM_xmlhttpRequest
			({
				method:"GET",
				url: inp.href ,
				onload:function(res)
				{
					trade_cancel() ;
				}
			});
			return;
		}
	}
	if( traded ) window.location.href = url_cur ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
transed = false ;
function trans_on()
{
	var inputs = document.getElementsByTagName('input');

// пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
	if( $('sum1') && $('sum1').checked )
	{
		gold = 1 ;
	} else if( $('sum2') && $('sum2').checked )
	{
		gold = 2 ;
	} else if( $('sum3') && $('sum3').checked )
	{
		gold = 3 ;
	} else if( $('sum4') && $('sum4').checked )
	{
		gold = 4 ;
	} else
	{
		gold = 0 ;
	}

// пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
	var day_time = 0 ;

	if( gold == 4 || gold == 2 )
// пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ, пїЅпїЅ 30 пїЅпїЅпїЅпїЅ
	{
		day_time = 60 ;
		if( $('trans_time') && $('trans_time').value != 0 )
		{
		day_time = $('trans_time').value
		day_time = day_time.split(',').join('.')
		}
	} else if( $('trans_time') && $('trans_time').value != 0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅ
	{
		var day_time = $('trans_time').value
		day_time = day_time.split(',').join('.')
	} else if( ( day1battle = GM_getValue( "hwm_takeoffon_day1battle" ) ) )
// пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	{
		var days = day1battle.split(';') ;
		if( days[$('trans_count').value] )
		{
			day_time = days[$('trans_count').value]
			day_time = day_time.split(',').join('.')
		}
		else
			day_time = 0
	}
	for( var i = 0; i < inputs.length; i++ )
	{
		var inp = inputs[i];
		if( inp.type == "checkbox" && inp.name == "dress_id" && inp.checked )
		{
			transed = true ;
			var art_id = inp.value ;

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
			if( (gold == 4 || gold == 2) && $('trans_count').value==0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
			{
				bcount = inp.getAttribute( 'art_pr' )
			} else
			{
				bcount = $('trans_count').value
			}
//- пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ

			if( gold == 0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ 1пїЅ
			{
				sum = 1
			} else
			{
				if( ( price = GM_getValue( "hwm_takeoffon_price_"+art_id ) ) && price.indexOf( ';0;0;0;0;' ) < 0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅ
				{
					price_arr = price.split(';');
					sum0 = price_arr[gold]
				} else if( $("id_price_a"+art_id) && ( art_name = $("id_price_a"+art_id).getAttribute( "art_name" ) ) && ( price = GM_getValue( "hwm_takeoffon_price_"+art_name ) ) && price.indexOf( ';0;0;0;0;' ) < 0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅ
				{
					price_arr = price.split(';');
					sum0 = price_arr[gold]
				} else
				{
					sum0 = 1
				}
				sumN = sum0 * ( bcount > 0 ? bcount : 1 )

//					sum = sumN + Math.max( 1 , Math.round( sumN * 0.01 ) )
				if( GM_getValue( "setnalog" ) && GM_getValue( "setnalog" ) == 1 && sumN > 0 )
					sum = Math.max( 1 , Math.round( sumN / 0.99 ) )
				else
					sum = sumN
			}
if (sum > 0) {
			$("span_dress_id_"+art_id).innerHTML = loader ;

			GM_xmlhttpRequest
			({
				method:"POST",
				url: url+"/art_transfer.php" ,
				headers:
				{
					'Content-Type'		: 'application/x-www-form-urlencoded' ,
					'Referer'			: url+'/art_transfer.php?id='+art_id ,
				},
				data: 'id='+art_id+'&nick='+urlencode($('trans_nick').value)+'&gold='+sum+'&wood=0&ore=0&mercury=0&sulphur=0&crystal=0&gem=0&sendtype=2&dtime='+day_time+'&bcount='+bcount+'&art_id=&sign='+sign ,
				onload:function(res)
				{
					inp.type = "radio" ;
					inp.selected = true ;
					$("span_dress_id_"+art_id).innerHTML = '' ;
					trans_on() ;
				}
			});
			return;
}
else
{
alert(art_name+' \u043d\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043d');
inp.type = "radio" ;
inp.selected = true ;
}
		}
	}
	if( transed ) window.location.href = url_cur ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
function trans_rem()
{
	var inputs = document.getElementsByTagName('input');
	for( var i = 0; i < inputs.length; i++ )
	{
		var inp = inputs[i];
		if( inp.type == "checkbox" && inp.name == "dress_id" && inp.checked )
		{
			transed = true ;
			var art_id = inp.value ;
			$("span_dress_id_"+art_id).innerHTML = loader ;
			GM_xmlhttpRequest
			({
				method: "POST" ,
				url: url+"/art_transfer.php" ,
				headers:
				{
					'Content-Type'		: 'application/x-www-form-urlencoded' ,
					'Referer'			: url+'/art_transfer.php?id='+art_id ,
				},

				data: 'id='+art_id+'&nick='+urlencode($('trans_nick').value)+'&gold=1&wood=0&ore=0&mercury=0&sulphur=0&crystal=0&gem=0&sendtype=2&dtime=0.004&bcount=0&rep=on&art_id=&sign='+sign ,
				onload:function(res)
				{
					inp.type = "radio" ;
					inp.selected = true ;
					$("span_dress_id_"+art_id).innerHTML = '' ;
					trans_rem() ;
				}
			});
			return;
		}
	}
	if( transed ) window.location.href = url_cur ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ (1пїЅ)
function trans_send()
{
	var inputs = document.getElementsByTagName('input');
	for( var i = 0; i < inputs.length; i++ )
	{
		var inp = inputs[i];
		if( inp.type == "checkbox" && inp.name == "dress_id" && inp.checked )
		{
			transed = true ;
			var art_id = inp.value ;
			$("span_dress_id_"+art_id).innerHTML = loader ;
			GM_xmlhttpRequest
			({
				method: "POST" ,
				url: url+"/art_transfer.php" ,
				headers:
				{
					'Content-Type'		: 'application/x-www-form-urlencoded' ,
					'Referer'			: url+'/art_transfer.php?id='+art_id ,
				},

				data: 'id='+art_id+'&nick='+urlencode($('trans_nick').value)+'&gold=1&wood=0&ore=0&mercury=0&sulphur=0&crystal=0&gem=0&sendtype=1&dtime=0&bcount=0&art_id=&sign='+sign ,
				onload:function(res)
				{
					inp.type = "radio" ;
					inp.selected = true ;
					$("span_dress_id_"+art_id).innerHTML = '' ;
					trans_send() ;
				}
			});
			return;
		}
	}
	if( transed ) window.location.href = url_cur ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅ
function daybattle_form()
{
	bg = $('bgOverlay') ;
	bgc = $('bgCenter') ;
	if( !bg )
	{
		bg = document.createElement('div') ;
		bg.id = 'bgOverlay' ;
		document.body.appendChild( bg );
		bg.style.position = 'absolute' ;
		bg.style.left = '0';
		bg.style.width = '100%';
		bg.style.background = "#000000";
		bg.style.opacity = "0.5";
		bg.addEventListener( "click", form_close , false );

		bgc = document.createElement('div') ;
		bgc.id = 'bgCenter' ;
		document.body.appendChild( bgc );
		bgc.style.position = 'absolute' ;
		bgc.style.width = '400px';
		bgc.style.background = "#F6F3EA";
		bgc.style.left = ( ( document.body.offsetWidth - 400 ) / 2 ) + 'px' ;
	}

/*
	var day1battle = GM_getValue( "hwm_takeoffon_day1battle" ).split(';') ;
	if( !day1battle ) day1battle = new Array();
*/
	var day1battle_ = GM_getValue( "hwm_takeoffon_day1battle" ) ;
	if( !day1battle_ )
		day1battle = new Array();
	else
		day1battle = day1battle_.split(';')

	var form = '<div style="border:1px solid #abc;padding:5px;margin:2px;"><div style="float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close" title="Close">x</div><center><table><tr><td colspan="4"><b>\u0412\u0440\u0435\u043c\u044f \u043d\u0430 \u0431\u043e\u0438 \u0432 \u0434\u043d\u044f\u0445 (1 \u0447\u0430\u0441 ~ 0,042 \u0434\u043d\u044f)</b></td></tr>'
	for( var i=1;i<11;i++)
	{
		form += '<tr>'+
'<td>'+i+'</td><td><input id="day_cnt'+i+'" size="5" value="'+( day1battle[i] ? day1battle[i] : 0 )+'"></td>'+
'<td>'+(10+i)+'</td><td><input id="day_cnt'+(10+i)+'" size="5" value="'+( day1battle[10+i] ? day1battle[10+i] : 0 )+'"></td>'+
'</tr>'
	}
	form += '<tr><td colspan="4" align="center"><input type="button" id="form_o" value="\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"></td></tr></table></center></div>' ;

	bgc.innerHTML = form

	$("bt_close").addEventListener( "click", form_close , false );
	$('form_o').addEventListener( "click", daybattle_set , false );

	bg.style.top = (-document.body.scrollTop)+'px';
	bg.style.height = ( document.body.offsetHeight + document.body.scrollTop ) +'px';
	bgc.style.top = ( document.body.scrollTop + 150 ) + 'px';

	bg.style.display = 	bgc.style.display = 'block' ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅ
function daybattle_set()
{
	day1battle = '0;'
	for(var i=1;i<21;i++)
	{
		day1battle += ''+$('day_cnt'+i).value+';'
	}
	GM_setValue( "hwm_takeoffon_day1battle" , day1battle ) ;
	form_close() ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ
function price_form()
{
	title = this.getAttribute( "art_title" )
	name = this.getAttribute( "art_name" )
	art_id = this.getAttribute( "art_id" )
	art_pr = this.getAttribute( "art_pr" )

	bg = $('bgOverlay') ;
	bgc = $('bgCenter') ;

	if( !bg )
	{
		bg = document.createElement('div') ;
		bg.id = 'bgOverlay' ;
		document.body.appendChild( bg );
		bg.style.position = 'absolute' ;
		bg.style.left = '0';
		bg.style.width = '100%';
		bg.style.background = "#000000";
		bg.style.opacity = "0.5";
		bg.addEventListener( "click", form_close , false );

		bgc = document.createElement('div') ;
		bgc.id = 'bgCenter' ;
		document.body.appendChild( bgc );
		bgc.style.position = 'absolute' ;
		bgc.style.width = '400px';
		bgc.style.background = "#F6F3EA";
		bgc.style.left = ( ( document.body.offsetWidth - 400 ) / 2 ) + 'px' ;
	}

	var price_c1 = price_c2 = price_c3 = price_c4 = 0 ;
	var st_i = st_n = '' ;
	if( ( price = GM_getValue( "hwm_takeoffon_price_"+art_id ) ) && price.indexOf( ';0;0;0;0;' ) < 0 )
	{
		st_i = ' style="color:#006400;"'
		price_arr = price.split(';');
		price_c1 = price_arr[1]
		price_c2 = price_arr[2]
		price_c3 = price_arr[3]
		price_c4 = price_arr[4]
	} else if( ( price = GM_getValue( "hwm_takeoffon_price_"+name ) ) && price.indexOf( ';0;0;0;0;' ) < 0 )
	{
		st_n = ' style="color:#6495ED;"'
		price_arr = price.split(';');
		price_c1 = price_arr[1]
		price_c2 = price_arr[2]
		price_c3 = price_arr[3]
		price_c4 = price_arr[4]
	}

	bgc.innerHTML = '<div style="border:1px solid #abc;padding:5px;margin:2px;"><div style="float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close" title="Close">x</div><center><table><tr><td colspan="2"><b id="art_title"'+st_i+'>'+title+'</b> <i id="art_name"'+st_n+'>('+name+')'+'</i></td></tr><tr><td>[\u04261] 1 \u0431\u043e\u0439</td><td><input id="art_c1" value="'+price_c1+'"></td></tr><tr><td>[\u04262] \u041e\u043f\u0442</td><td><input id="art_c2" value="'+price_c2+'"></td></tr><tr><td>[\u04263] \u041e\u0441\u043e\u0431\u0430\u044f&nbsp;</td><td><input id="art_c3" value="'+price_c3+'"></td></tr><tr><td>[\u0412\u041f] \u0412\u0441\u044f \u043f\u0440\u043e\u0447\u043a\u0430&nbsp;</td><td><input id="art_c4" value="'+price_c4+'"></td></tr><tr><td colspan="2" align="center"><input type="button" art_id="'+art_id+'" id="form_oi" value="\u0418\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u043e"> <input type="button" art_name="'+name+'" id="form_on" value="\u0412\u0441\u0435\u043c \u0442\u0430\u043a\u0438\u043c"></td></tr></table></center></div>' ;

	$("bt_close").addEventListener( "click", form_close , false );
	$('form_oi').addEventListener( "click", price_set_id , false );
	$('form_on').addEventListener( "click", price_set_name , false );

	bg.style.top = (-document.body.scrollTop)+'px';
	bg.style.height = ( document.body.offsetHeight + document.body.scrollTop ) +'px';
	bgc.style.top = ( document.body.scrollTop + 150 ) + 'px';
	bg.style.display = 	bgc.style.display = 'block' ;
	$('art_c1').focus();
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
function form_close()
{
	bg = $('bgOverlay') ;
	bgc = $('bgCenter') ;
	if( bg )
	{
		bg.style.display = bgc.style.display = 'none' ;
	}
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
function price_set_id()
{
	var art_id = this.getAttribute( "art_id" ) ;
	price = $('art_title').innerHTML+';'+$('art_c1').value+';'+$('art_c2').value+';'+$('art_c3').value+';'+$('art_c4').value+';'
	var price_old = GM_getValue( "hwm_takeoffon_price" ) ;
	if( !price_old || price_old.indexOf( ';' + art_id + ';' ) < 0 )
	{
		price_new = ( price_old ? price_old : '' ) + ';' + art_id + ';' ;
		GM_setValue( "hwm_takeoffon_price" , price_new ) ;
	}
	GM_setValue( "hwm_takeoffon_price_"+art_id , price ) ;

	var price_a_obj = $("id_price_a"+art_id) ;
	if( price.indexOf( ';0;0;0;0;' ) < 0 )
	{
		price_a_obj.style.fontWeight = "bold"
		price_a_obj.style.color = "#006400"
	} else
	{
		if( ( this_name = price_a_obj.getAttribute( 'art_name' ) ) && ( this_price = GM_getValue( "hwm_takeoffon_price_"+this_name ) ) && this_price.indexOf( ';0;0;0;0;' ) < 0 )
		{
			price_a_obj.style.fontWeight = "bold"
			price_a_obj.style.color = "#6495ED"

		} else
		{
			price_a_obj.style.color = "#808080" ;
			price_a_obj.style.fontWeight = "normal"
		}
	}

	form_close() ;
}
//-

//+ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅ
function price_set_name()
{
	var art_name = this.getAttribute( "art_name" ) ;
	price = $('art_title').innerHTML+';'+$('art_c1').value+';'+$('art_c2').value+';'+$('art_c3').value+';'+$('art_c4').value+';'
	var price_old = GM_getValue( "hwm_takeoffon_price_name" ) ;
	if( !price_old || price_old.indexOf( ';' + art_name + ';' ) < 0 )
	{
		price_new = ( price_old ? price_old : '' ) + ';' + art_name + ';' ;
		GM_setValue( "hwm_takeoffon_price_name" , price_new ) ;
	}
	GM_setValue( "hwm_takeoffon_price_"+art_name , price ) ;

	var need_a = getI( "//a[contains(@href, 'javascript:void(0);')]" ) ;
	if( price.indexOf( ';0;0;0;0;' ) < 0 )
// пїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅ-пїЅпїЅ пїЅпїЅ 0
	{
		for(var i=0; i < need_a.snapshotLength; i++)
// пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
		{
			this_a = need_a.snapshotItem(i);
			if( ( this_id = this_a.getAttribute( 'art_id' ) ) && ( this_price =  GM_getValue( "hwm_takeoffon_price_"+this_id ) ) && this_price.indexOf( ';0;0;0;0;' ) < 0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ, пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
			{
			} else if( ( this_name = this_a.getAttribute( 'art_name' ) ) && this_name == art_name )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ
			{
				this_a.style.fontWeight = "bold"
				this_a.style.color = "#6495ED"
			}
		}

	} else
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅпїЅпїЅ 0
	{
		for(var i=0; i < need_a.snapshotLength; i++)
		{
			this_a = need_a.snapshotItem(i);
			if( ( this_id = this_a.getAttribute( 'art_id' ) ) && ( this_price =  GM_getValue( "hwm_takeoffon_price_"+this_id ) ) && this_price.indexOf( ';0;0;0;0;' ) < 0 )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ, пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
			{
			} else if( ( this_name = this_a.getAttribute( 'art_name' ) ) && this_name == art_name )
// пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
			{
				this_a.style.fontWeight = "normal"
				this_a.style.color = "#808080"
			}
		}
	}
	form_close() ;
}
//-


//+ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
function setting()
{
	bg = $('bgOverlay') ;
	bgc = $('bgCenter') ;
	if( !bg )
	{
		bg = document.createElement('div') ;
		bg.id = 'bgOverlay' ;
		document.body.appendChild( bg );
		bg.style.position = 'absolute' ;
		bg.style.left = '0';
		bg.style.width = '100%';
		bg.style.background = "#000000";
		bg.style.opacity = "0.5";
		bg.addEventListener( "click", form_close , false );

		bgc = document.createElement('div') ;
		bgc.id = 'bgCenter' ;
		document.body.appendChild( bgc );
		bgc.style.position = 'absolute' ;
		bgc.style.width = '400px';
		bgc.style.background = "#F6F3EA";
		bgc.style.left = ( ( document.body.offsetWidth - 400 ) / 2 ) + 'px' ;
	}

	bgc.innerHTML = '<div style="border:1px solid #abc;padding:5px;margin:2px;"><div style="float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close" title="Close">x</div><center><table><tr><td>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438</td></tr><tr><td><label for="chsetnalog" style="cursor:pointer;"><input type="checkbox" id="chsetnalog"> \u0443\u0447\u0438\u0442\u044b\u0432\u0430\u0442\u044c \u043d\u0430\u043b\u043e\u0433 \u0432 1% \u043f\u0440\u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0435 \u0432 \u0430\u0440\u0435\u043d\u0434\u0443</label></td></tr><tr><td><label for="chsetbtsend" style="cursor:pointer;"><input type="checkbox" id="chsetbtsend"> \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0443 "\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c"</label></td></tr></table></center></div>' ;

	$("bt_close").addEventListener( "click", form_close , false );

	var chsetnalog = $('chsetnalog')
	chsetnalog.checked = ( GM_getValue( "setnalog" ) && GM_getValue( "setnalog" ) == 1 ) ? 'checked' : '' ;
	chsetnalog.addEventListener( "click", setChNalog , false );

	var chsetbtsend = $('chsetbtsend')
	chsetbtsend.checked = ( GM_getValue( "setbtsend" ) && GM_getValue( "setbtsend" ) == 1 ) ? 'checked' : '' ;
	chsetbtsend.addEventListener( "click", setChBtsend , false );

	bg.style.top = (-document.body.scrollTop)+'px';
	bg.style.height = ( document.body.offsetHeight + document.body.scrollTop ) +'px';
	bgc.style.top = ( document.body.scrollTop + 150 ) + 'px';

	bg.style.display = 	bgc.style.display = 'block' ;
}
//-


function setChNalog()
{
	if( GM_getValue( "setnalog" ) && GM_getValue( "setnalog" ) == 1 )
		GM_setValue( "setnalog" , 0 );
	else
		GM_setValue( "setnalog" , 1 );
}
function setChBtsend()
{
	if( GM_getValue( "setbtsend" ) && GM_getValue( "setbtsend" ) == 1 )
		GM_setValue( "setbtsend" , 0 );
	else
		GM_setValue( "setbtsend" , 1 );
}

loader = '<img border="0" src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs=">'


function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }

function getClientHeight_tr()
{
return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn)
	}
	else {
		elem["on" + evType] = fn
	}
}

function createXMLHttpReq(rndm)
{
	var objXMLHttpReq;
	
	if (window.XMLHttpRequest)
	{
		// Real browsers ;)
		//
		objXMLHttpReq = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		// IE
		//
		objXMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	return objXMLHttpReq;
}

function update_n() {
if ( (parseInt(GM_getValue('last_update', '0')) + 86400000 <= (new Date().getTime())) || (parseInt(GM_getValue('last_update', '0')) > (new Date().getTime())) ) {
var objXMLHttpReqUpd = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqUpd.open('GET', url + 'photo_pl_photos.php?aid=1777' + '&rand=' + (Math.random()* 1000000), true);
objXMLHttpReqUpd.onreadystatechange = function() { update(objXMLHttpReqUpd); }
objXMLHttpReqUpd.send(null);
}
}
function update(obj) {
if (obj.readyState == 4 && obj.status == 200) {
var update_text1 = '\n\n\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 Greasemonkey \u0441\u043A\u0440\u0438\u043F\u0442\u0430 "';
var update_text2 = '".\n\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E?';
var remote_version, rt;rt=obj.responseText;GM_setValue('last_update', ''+new Date().getTime());remote_version=string_upd.exec(rt)[1];if(version!=-1){if (remote_version > version) setTimeout(function() { if(confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?'+update_text1+script_name+update_text2)){window.open('http://userscripts.org/scripts/show/'+script_num, '_blank')} }, 100) }}
}
