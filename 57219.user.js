// ==UserScript==
// @name          eMilitary Adviser
// @version       0.3.0
// @description	  eRepublik eMilitary Adviser
// @description   Logging and Calculate Damages 
// @author        GRaVe [VandelHosMan]
// @namespace     erep.gocza.eu
// @include       http://www.erepublik.com/*
// @exclude	      http://ads*.erepublik.com/*
// @exclude       http://www.erepublik.com/xd_receiver*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//   V e r s i o n  H i s t o r y  
// ================================
// 0.3.0   Add Tooltip damage on profile page (expand damagehistory)
//         Common Damage Format
//         Magyar nyelvi támogatás
//         System recheck and write
// 0.2.9   Fix Link Problem
//         eToolKit url format support
// 0.2.8   Add Weapon Cost in damage calculator
//         Fix Open/hide bug
// 0.2.7   BugFx tracking
// 0.2.6   Twice Call BugFx
//         Hide/UnHide on Training Page
// 0.2.5   Fix Some Bug
//         Show latast day damage in military page
// 0.2.2   Fix Language issue
// 0.2.1   Fix eRepublik HTML code change
// 0.2     Fix eRepublik code change
// 0.2b    Add Gift and Wellnes Pack support for damage calculator
//         Fix some bugs
//         Add version header
// --------------------------------
// 0.1     Base function
// --------------------------------

// GM_Variable
// eMA_eAPI_Profile_Update - utolso API frissites ideje naponta egyszer, elso oldal
// eMA_eAPI_Profile - array a profilrol, str, wellness, rang,
// eMA_eAPI_Damages - sebzesadatok a profilbol "napi mentés"
// eMA_Fights - sebzes adatok a harc oldalrol
var pagesFunctions = [];

pagesFunctions.push({p: 'my-places/army',	c:'ma',	t:'c', 	f: eMA_DamageCalculator });
pagesFunctions.push({p: 'citizen/profile',	c:'ma',	t:'c', 	f: eMA_ProfileUpdate_Filter });
pagesFunctions.push({p: 'battles/fight',	c:'ma',	t:'c', 	f: eMA_BattleUpdate });

var BASE_URL = 'http://www.erepublik.com/';
var LANG = 'en';
var cID = 0;
var eDay = 0;
var weaponprice = undefined;

var RANKS = ['private', 'corporal', 'sergeant', 'lieutenant', 'captain', 'colonel', 'general', 'fieldmarshal'];

function eMA_DamageCalculator() {
    GM_addStyle('ul.weaponsel {-moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FFFFFF none repeat scroll 0 0; border:1px solid #D1E8EF; display:block; float:left; margin-bottom:1px; margin-right:1px; overflow:hidden; } ');
    GM_addStyle('ul.weaponsel li { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FFFFFF none repeat scroll 0 0; border:1px solid #D1E8EF; display:block; float:left; height:16px; margin-bottom:0px; overflow:hidden; width:15px; text-align:center;}');
    GM_addStyle('input.weaponcount {width: 15px; padding-left: 5px; margin-left: 11px; margin-right: 11px;}');
    GM_addStyle('input.gifts {width: 15px; padding-left: 5px; margin-left: 25px;}');
    GM_addStyle('input.cwps {width: 15px; padding-left: 5px; margin-left: 11px;}');
    GM_addStyle('span.wpslabel {width: 15px; padding-left: 5px; margin-left: 47px;}');

    var curw = GM_getValue('ema_cwellness',1); 
    var sh_damcalc = eval(GM_getValue('sh_damcalc',1));
    //bal oldal
    var dt = '<tr><td valign="middle" nowrap="nowrap">'; 
    var rt = '<table class="calcCost" align="right"><thead>'+i18n('dmco')+' <img src="'+$('#accountdisplay .item:eq(1) img').attr('src')+'" ></thead>'
    dt += '<span id="TitleCalcUnHide" style="display:'+(sh_damcalc == 0 ? 'visible' : 'none')+'">'+i18n('dmc')+' ('+i18n('dmsv')+')</span>'
    dt += '<table id="dcselect" style="display:'+(sh_damcalc == 1 ? 'visible' : 'none')+'"><thead><span id="TitleCalc" >'+i18n('dmc')+' ('+i18n('dmsw')+') </span>&nbsp;'
    dt += '<input type="checkbox" id="curwellness" ' + (curw == 1 ? 'checked="true"' : ' ') + '/> '+i18n('dmucw')+'</thead><tbody>';
    for (i = 5; i >= 0; i--) {
        dt += '<tr><td style="border-bottom: 0px none; padding: 1px 15px 1px 72px;">'

        if (i>0)
            dt+= '<a onclick="location.href = this.href;" style="background-color: red" alt="'+i18n('dmwc')+' ' + i + '" title="'+i18n('dmwc')+' ' + i + '" href="/' + LOCALE + 'market/country-0-industry-3-quality-' + i + '">';
        else
            dt += '<a alt="Empty handed" title="'+i18n('dmeh')+'" href="/' + LOCALE + 'market/country-0-industry-3-quality-0">'

        dt += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
        dt += '<span class="qlsmalllevel" style="width: ' + (i * 2) + '0%">';
        dt += '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
        dt += '</span></span></a>  <ul id="WQul'+i+'" class="weaponsel">';
        for (j = 0; j <= 5 ; j++)
            dt += '<li id="wpli'+i+'C'+j+'" class="weaponselem" style="-moz-user-select: none;">'+j+'</li>';
        dt += '</ul><input id="iweapon'+i+'" class="weaponcount" type="text" value="0" maxlength="2"><span id="wpdm'+i+'" align="left" style="padding: 0px; border-bottom:0px none;/"> </td></tr>'; 

        rt += '<tr><td id="wpcost'+i+'" style="border-bottom: 0px none; padding: 4px 5px 3px 2px; align:right">&nbsp;</td></tr>'
    }
    rt += '<tr><td  style="border-bottom: 0px none; padding: 4px 5px 3px 2px; align:right">&nbsp;</td></tr>'
    rt += '<tr><td style="border-bottom: 0px none; padding: 1px 5px 1px 2px; align:right" ><strong id="wpcost_total">&nbsp;</strong></td></tr></table>'
    dt += '<tr><td style="border-bottom: 0px none; padding: 1px 15px 1px 72px;">'+i18n('dmgf')+' <input id="gifts" class="gifts" type="text" value="0" maxlength="2">'
    dt += '<span class="wpslabel"> WP </span><input id="wps" class="cwps" type="text" value="0" maxlength="2"></td><td></td></tr>'
    
    dt += '<tr><td style="border-bottom: 0px none; padding: 1px 10px 1px 180px;">Total : <span id="dcres" style="border-bottom: 0px none; padding: 0px 0px 0px 7px;"></td></tr></tbody></table>';
    dt += '</td><td id="eMA_calcDmg" width="5px" valign="middle">'+rt+'</td></tr>'
    //Last Day Damage
    var sh_ddam = GM_getValue('sh_daydam', 1);
    var fights = eval(GM_getValue('eMA_Fights', undefined));  //[{ day: 650, damage: []}];  
    var sumHTML = '&nbsp;<br>&nbsp'; var indHTML = "";
    if ( fights != undefined ) {
        for ( var day = 0 ; day < fights.length; day++ ) {
            var res = eMA_Helper_Damage_Seq( fights[day].damage );
            sumHTML += '<br>'+ res.sum ;
            indHTML += '<br>&nbsp;&nbsp;&nbsp;<strong>'+ fights[day].day +': </strong>&nbsp;'+ res.text;
        }
    } else { indHTML = "No Data"; }   
    dt += '<tr id="daydamH" style="display:'+(sh_ddam == 0 ? 'visibel' : 'none')+'" ><td valign="middle" nowrap="nowrap"><span id="TitleLDDuH">'+i18n('dmld')+' ('+i18n('dmsv')+')</span></td><td>&nbsp;</td></tr>';
    dt += '<tr id="daydamS" style="display:'+(sh_ddam == 1 ? 'visibel' : 'none')+'" ><td valign="middle" nowrap="nowrap"><span id="TitleLDDH">'+i18n('dmld')+' ('+i18n('dmhv')+')</span><br>'+indHTML+'</td><td valign="middle" align="right"><strong id="daydamtotal">'+sumHTML+'</strong></td></tr>'
    
    $('.offers tbody tr:first').next().next().after( dt );
    if ( sh_damcalc == 0 ) $('.calcCost').hide();
    // Hide/UnHide function
    $('#TitleCalc').live('click', function() {
        $('#dcselect').hide();
        $('.calcCost').hide();
        $('#TitleCalcUnHide').show();
        GM_setValue('sh_damcalc', 0);
    });
    $('#TitleCalcUnHide').live('click', function() {
        $('#TitleCalcUnHide').hide();
        $('#dcselect').show();
        $('.calcCost').show();
        GM_setValue('sh_damcalc',1);
    });
    $('#TitleLDDH').live('click', function() {
        $('#daydamS').hide();
        $('#daydamH').show();
        GM_setValue('sh_daydam', 0);
    });
    $('#TitleLDDuH').live('click', function() {
        $('#daydamH').hide();
        $('#daydamS').show();
        GM_setValue('sh_daydam',1);
    });
    // Damage Calc fv
    $('.weaponsel li:nth-child(1)').css('background' , '#AAD85B');
    $('.weaponsel li').live("click",function () {
        var weaponindex = $(this).attr('id')[4];
        var weaponcount = $(this).attr('id')[6];
        var iinput = $('#iweapon'+ weaponindex);
        if (iinput.val() == weaponcount){
            $('#wpli'+weaponindex+'C'+iinput.val()).css('background','#FFFFFF'); 
            iinput.val(0);
            $('#wpli'+weaponindex+'C'+iinput.val()).css('background','#AAD85B'); 
            }
        else {
            $('#wpli'+weaponindex+'C'+iinput.val()).css('background','#FFFFFF'); 
            iinput.val(weaponcount);
            $(this).css('background','#AAD85B');
        }
        eMA_calcDmg();
    });
    $('.weaponcount').live("change",function () {
        var weaponcount = $(this).val();
        var weaponindex = $(this).attr('id')[7];
        for(i=0;i<=5; i++){
            if (i==weaponcount)
                $('#wpli'+weaponindex+'C'+weaponcount).css('background','#AAD85B');
            else
                $('#wpli'+weaponindex+'C'+i).css('background','#FFFFFF');
        }
        eMA_calcDmg();
        });
    $('.weaponcount').live("keypress", function (event) {
        var e = event.which; var noStart = 48; var noEnd = 59; var jokerKey = 0;
        if ( e == 8 || e == 9 || e == 37 || e == 39 || ( noStart <= e && e < noEnd ) || jokerKey == e) return true;
    	else return false;
        });
    $('.gifts').live("keypress", function (event) {
        var e = event.which; var noStart = 48; var noEnd = 59; var jokerKey = 0;
        if ( e == 8 || e == 9 || e == 37 || e == 39 || ( noStart <= e && e < noEnd ) || jokerKey == e) return true;
    	else return false;
        });
    $('.gifts').live("change",function () {
        eMA_calcDmg();
        });          
     $('#wps').live("keypress", function (event) {
        var e = event.which; var noStart = 48; var noEnd = 59; var jokerKey = 0;
        if ( e == 8 || e == 9 || e == 37 || e == 39 || ( noStart <= e && e < noEnd ) || jokerKey == e) return true;
    	else return false;
        });
    $('#wps').live("change",function () {
        eMA_calcDmg();
        });
    $('#curwellness').live("change", function() {
        GM_setValue('ema_cwellness', $(this).attr('checked')?1:0);
        eMA_calcDmg();
    });

    if ( weaponprice == undefined ) eMA_GetUnitPrices()

}

function eMA_calcDmg() {
    var cWellness = $('#curwellness').attr('checked') ? parseFloat($('#wellnessvalue').text()) : 100;
  	var strenght = parseFloat($("#content table td:eq(1)").text());
	var rank = $("#content table td:eq(3) img").attr("src").split('_')[3].split('.')[0];
	var rankBonus = (RANKS.indexOf(rank) + 1) * 0.2 + 1;
	var gift = $('#gifts').val();
	var wp = $('#wps').val();
    var ConstDamage = 2 *  strenght * rankBonus;
    var wdb = [0,0,0,0,0,0]; for(var i=5; i>=0; i--) { wdb[i] = $('#iweapon'+i).val(); }
    var wpcost_t = 0;
        
    var calcdmg = eMA_Dmgcalc(cWellness,strenght,rankBonus,wdb,gift,wp);
    //GM_log(uneval(eMA_Damage_Seq(calcdmg[5])))
    for(var i=5; i>=0; i--)
    {
        var qdam = ' [';
        var qtdmg = 0;
        var sq = 0;
        var db = calcdmg[i].length;
        for(j=0; j<db ; j++) {
            var aktdmg = calcdmg[i][j];
            qtdmg += aktdmg;
            if (j < db-1 && calcdmg[i][j+1] == aktdmg) 
                sq++;
            else if ( sq > 0) {
                qdam += (sq+1) + 'x' + aktdmg;
                sq = 0;
            } else
                qdam += aktdmg;
            
            if ( j< db-1 && sq == 0)
               qdam += ' ';
        }
        qdam += ']'
        if (db <2 || qtdmg == 0) qdam = ' ';
        if (db >0) $('#wpdm'+i).html('<strong>'+qtdmg+'</strong>'+qdam);
        else $('#wpdm'+i).html(' ');
        
        if ( i > 0 && db >0 && weaponprice != undefined ){
            var wpcost = Math.ceil(weaponprice[i] * db*100) / 100;
            wpcost_t += wpcost;
            $('#wpcost'+i).html(wpcost);
        } else $('#wpcost'+i).html('&nbsp;');
   }
   $('#dcres').html('<strong>'+ calcdmg[6] +'</strong>');
   $('#wpcost_total').html(Math.ceil(wpcost_t *100 ) / 100);
}

function eMA_Dmgcalc(cWellness,str,rankB,qdb,gift,wp) {
	var wpdam = [[],[],[],[],[],[],0];
    var ConstDamage = 2 *  str * rankB;
    for(var i=5; i>=0; i--)
    {
        for(j=0; j<qdb[i]; j++) {
            while ( wp > 0 && ( cWellness < 95 ) ) {
                wp--;
                cWellness = Math.min(cWellness+10,100);
            }
            
            if (gift > 0 && cWellness <= 99) {
                var usegift = Math.min(100-Math.floor(cWellness),gift);
                gift -= usegift;
                cWellness += usegift;
            }

            if (cWellness >= 40)
            {
                var ctDamage = ConstDamage * (1 + (cWellness - 25) / 100);
                if (i>0) 
                    ctDamage = Math.ceil(ctDamage * (1+i/5));
                else    
                    ctDamage = Math.ceil(ctDamage * (1/2));

                cWellness -= 10;
                
                wpdam[i][j] = (ctDamage);
                wpdam[6] += ctDamage;
            }         
        }
    }
    return wpdam;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function eMA_ProfileUpdate () {
    var Damages = eval( GM_getValue( 'eMA_eAPI_Damages' ), undefined );
    var need_maintance = false;
    if ( Damages != undefined ) {
        var inHTML = '';
        var current = Damages[0].damage;
        $('span.goright.special').each(function(i) {//oldalon levo sebzes
            if ($(this).text().indexOf('/') != -1) {
                current = parseInt($(this).text(),10);
            }
        });
        
        var fights = eval(GM_getValue('eMA_Fights', undefined));  //[{ day: 650, damage: [12340, 12367, 12410]}];  
        // mai sebzes
        inHTML += '<p class="padded"><span class="goleft"><img class="iconsoft" src="/images/parts/icon-hero.gif" alt="Hero Fights"/>  '+i18n('todm')+':</span>';
        inHTML += '<span class="goright special" ';
        if ( fights != undefined && Damages[0].day == fights[0].day ) {
            inHTML += 'title="'+eMA_Helper_Damage_Seq( fights[0].damage ).text+'"';
        }
        inHTML += '>&nbsp;&nbsp;&nbsp;'+( current-Damages[0].damage )+'&nbsp;</span>';
        // elozmeny
        inHTML += '<p class="padded"><span class="goleft"><img class="iconsoft" src="/images/parts/icon-hero.gif" alt="Hero Fights"/>  '+i18n('lsdm')+':</span>';
        inHTML += '<table class="goright special" >'

        for(var i = 1; i < Damages.length; i++ )
        {
            var ddam = Damages[i-1].damage - Damages[i].damage;
            var ctitle = ddam;
            if ( fights != undefined )
            {
                for( j = 0; j < fights.length ; j++ ) {
                    if ( fights[j].day == Damages[i].day ) {
                        ctitle = eMA_Helper_Damage_Seq( fights[j].damage ).text;
                        break;
                    } 
                }
            }
            //GM_log("Profile "+i+" "+ (Damages[i-1].day)+" - "+ (Damages[i-1].damage) +", "+(Damages[i].day)+" - "+ (Damages[i].damage));
            if ( Damages[i].day != Damages[i-1].day ) 
                inHTML += '<tr><td><span class="goright special">'+Damages[i].day+'&nbsp;Day: </span></td><td><span class="goright special" title="'+ctitle+'">'+ddam+'</span><td></tr>';
            else need_maintance = true;
        }
        inHTML += '</table>'
        $('div.quarter:last-child').append(inHTML);//div.holder.iep
    }

    if ( need_maintance ) {
        GM_log('Damage_Statistic_maintance');
    } else if ( Damages.length > 6) {
        Damages.pop();
        GM_setValue('eMA_eAPI_Damages',uneval( Damages ) );
   }
}

function eMA_BattleUpdate() {
    var today = eDay;
    var inHTML = '<span class="double">Damages <br/>';//<div class="ls-half last">
    var idamage = 0;
    idamage = parseInt($('.lsvalue span').text(), 10);
    var ctotaldamage = parseInt($('em.double:has(img[alt=Trivia-arrow-up])').text().match(/(\d+).\/.\d/)[1], 10);
    var aFights = eval(GM_getValue('eMA_Fights', undefined));  //[{ day: 650, dmg: [12340, 12367, 12410]}];  

    if ( eDay == 0 || idamage == 0 )
        return; //Page Not loaded totaly
    
    if (aFights == undefined) {
        aFights = [{ day: today, damage: [(ctotaldamage - idamage), ctotaldamage]}];
    } else {
        if ( aFights[0].day != today ) {
            aFights.unshift({ day: today, damage: [(ctotaldamage - idamage), ctotaldamage] })
        } else {
            aFights[0].damage.push(ctotaldamage);
     }

     while (aFights.length > 6)
         aFights.pop();
    }
    GM_setValue('eMA_Fights', uneval(aFights));
    GM_log("Battle Page "+uneval(aFights) );
    // Create Page Insert
    var ds = eMA_Helper_Damage_Seq( aFights[0].damage );
    inHTML += ds.text;
    inHTML += '</span><em style="width: 40px;"><span><strong>' + ds.sum +' </strong></span></em>';
    $('.ls-half:eq(7)').html(inHTML);
}

// Helper Functions
function eMA_Helper_Damage_Seq( damages )
{
    var dam = [];
    for ( i = 1 ; i < damages.length ; i++ ) {
        dam.push( damages[i] - damages[i-1] );
    }
    return eMA_Helper_Seq( dam );
}

function eMA_Helper_Seq( aSeq )
{   //Formated damage text and summary
    var result = '';
    var sumd = 0;
    var db = aSeq.length;
    var sq = 0;
    for( i = 0 ; i < db ; i++ ) {
        sumd += aSeq[i];
        if (i < db-1 && aSeq[i+1] == aSeq[i] ) { 
           sq++;
        } else {
            if ( sq > 0) {
                result += (sq+1) + 'x' + aSeq[i];
                sq = 0;
            } else {
                result += aSeq[i];
            }
        }
        if ( i < db-1 && sq == 0)
            result += ' ';
    }
    //GM_log(uneval(aSeq)+ result+' '+sumd );
    return { text: result, sum: sumd };
}

// eAPI functions
function eMA_GetUnitPrices()
{
    var country = $('.core .flagholder > a').attr('href').split('/')[3].replace(/ /g, "-").toLowerCase();
    var sReq = "http://api.erepublik.com/v1/feeds/market/weapon/";
	if ( weaponprice == undefined ) weaponprice = [0,0,0,0,0,0];
    for (var i = 1; i<=5 ; i++ ) {
        GM_xmlhttpRequest({ //------------------------ product price ----------------------------------
    		method: 'GET',
    		url: (sReq+i+"/"+country+".json"),
            onload: function(response) {
                 if ( response.status == 200 ) {
                     eval("jsonObj = " + response.responseText);
                     weaponprice[response.finalUrl.match(/weapon\/(\d)\//)[1]] = parseFloat(jsonObj[0]['offer']['price']); 
            }    }
        });
    }
}

function eMA_eAPI_GetProfile() {
	var sReq = "http://api.erepublik.com/v1/feeds/citizens/" + cID + ".json";
    if ( cID > 0 ) 
    {
        GM_xmlhttpRequest({
    		method: 'GET',
    		url: sReq,
    		onload: function (res) {
                eval("jProfile = "+res.responseText );
                var lastupdateday = eval(GM_getValue('eMA_eAPI_Profile_Update',0));

                if ( jProfile != undefined && ( (eDay - lastupdateday) > 0 ) ) 
                {
                    var cdmg = jProfile["damage"];
                    var profile = { str: (jProfile["strength"]), wellness: (jProfile["wellness"]), damage: (jProfile["damage"]), rank: (jProfile["military_rank"])};

                    var damages = GM_getValue( 'eMA_eAPI_Damages', undefined );

                    if ( damages == undefined )
                        damages = [{day: eDay, damage: cdmg}];
                    else {
                        damages = eval(damages);
                        if ( damages[0].day != eDay )
                            damages.unshift({day: eDay, damage: cdmg});
                    }
                    GM_setValue( 'eMA_eAPI_Damages', uneval( damages ) );
                    GM_setValue( 'eMA_eAPI_Profile', uneval( profile ) );
                    GM_setValue( 'eMA_eAPI_Profile_Update', uneval( eDay ) );
                    GM_log('eAPI_GetProfile '+eDay+" day, profile: "+ uneval( profile ) );
                }
    		},
    	});
    }
}
// eAPI functions end
 
function eMA_ProfileUpdate_Filter() {
	if ($("#owninv").size() != 0) {
		eMA_ProfileUpdate();
	}
}

function Main(e) {
    try {
	    cID = $("div.core > div.avatarholder a.citizen_name").attr("href").split('/')[4];
	} catch (e) { cID = 0; }

    try { //
        var DayText = $("#clock > .eday > strong").text();
        var DayNumber = undefined;
        DayNumber = parseInt( DayText, 10 );
        if ( DayNumber != undefined && DayNumber > 0 ) {
            eDay = DayNumber;
        }
    } catch (e) { }

    eMA_Debug();
  
    var eMA_LastUpdate = eval(GM_getValue( 'eMA_eAPI_Profile_Update', 0));
    if ( eDay-eMA_LastUpdate > 0 )
        eMA_eAPI_GetProfile();  

	PAGE = location.href.split("/");
	var HREF = location.href;
	if (HREF.indexOf("http://")==0 || HREF.indexOf("https://")==0) {
		var parts = HREF.split('/');
		BASE_URL = parts[0]+'//'+parts[2]+'/';
		LANG = parts[3];
	}
	LOCALE = LANG + '/';

	if (HREF.indexOf(BASE_URL)==0) {
		LOCATION = HREF.substring(BASE_URL.length+3);
		pagesFunctions.forEach(function(v) {
			if ((v.p=="all" || LOCATION.indexOf(v.p)>=0) ) {
                 v.f();
			}
		});
	}
};

    //debug
function eMA_Debug() {
    var ddam = 177526;
    //GM_setValue('eMA_eAPI_Damages',uneval([{ day: eDay, damage: (ddam-200)},{ day: (eDay-1), damage: (ddam-2000)},{ day: (eDay-2), damage: (ddam-4000)}, { day: (eDay-3), damage: (ddam-5400)}, { day: (eDay-4), damage: (ddam-6200)}, { day: (eDay-5), damage: (ddam-7566)}] ) )
    //GM_setValue('eMA_Fights',uneval([ {day:eDay, damage:[ddam+141,ddam+234,ddam+345,ddam+501,ddam+623]}, {day:eDay-1, damage:[ddam-2000,ddam-1800,ddam-1600,ddam-1400,ddam-1000]}, {day:(eDay-2), damage:[ddam-4000,ddam-3500,ddam-2500,ddam-2234]}, {day:(eDay-3), damage:[ddam-6000,ddam-5500,ddam-5000,ddam-4440]}, {day:(eDay-4), damage:[ddam-8000,ddam-7500,ddam-7000,ddam-7670]} ] ))
    //GM_deleteValue('eMA_eAPI_Profile_Update')
    //GM_deleteValue('eMA_eAPI_Damages')
    //GM_setValue('eMA_eAPI_Profile_Update', uneval(919));
    //var profile = GM_getValue('eMA_eAPI_Damages', undefined );
    //GM_log(profile)
}//debug

window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		Main();
	}
},100);}, false);

//
var eMA_Loc = {
en: {
        lang: "English",
        todm: "Today Damage",
        lsdm: "Latest Damage",
        dmc:  "Damage Calculator",
        dmsw: "Select Weapons",
        dmucw:"Use Current Wellness",
        dmwc: "Weapon Quality Level",
        dmld: "Latest Daily Damages",
        dmsv: "Click to View",
        dmhv: "Click to Hide",
        dmeh: "Empty handed",
        dmgf: "Gift",
        dmco: "Cost",
    },
hu: {
        lang: "Magyar",
        todm: "Mai Sebzés",
        lsdm: "Régebbiek",
        dmc:  "Sebzés számítás",
        dmsw: "Fegyver Választó",
        dmucw:"A jelenlegi egészség szinttel",
        dmwc: "Fegyver minőség szintje",
        dmld: "Legutóbbi Napi Sebzések",
        dmsv: "Klikk ide a megjelenítéshez",
        dmhv: "Klikk ide az elrejtéshez",
        dmeh: "Puszta Kezes",
        dmgf: "EÜ-Cs",
        dmco: "Költség",
    }
};

function i18n( txt ) {
	var result = undefined;
	if ( eMA_Loc[LANG] != undefined ) {
		result = eMA_Loc[LANG][txt];
	}
	if ( result == undefined ) {
		result = eMA_Loc['en'][txt];
	}
	if ( result == undefined ) {
		result = txt;
	}
	return result;
}
