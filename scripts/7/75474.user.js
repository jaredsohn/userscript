// ==UserScript==
// @name			EREPEXTRA
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @namespace		http://userscripts.org/users/157616
// @description		HKGOLDEN Donation Helper
// @include			http://www.erepublik.com/*/donate/items*
// ==/UserScript==

$(document).ready(function() {
	$("#items1").css("padding-top", "0px");
	$("#items1 p").append(",<br />Or double-click an item to move it,<br/>Or double-click here to move them all (make sure you have enough space in inventory).");
	$("#items1").dblclick( function () {
		$("#small li").appendTo("#big");
	});
	if($("#available_items").val()=="10") {
		$("#big").width(570).height(137);
	}
	$("#small li").dblclick( function () {
		if($(this).parent("@[id]").attr("id")=="big") {
			$(this).appendTo("#small");
		} else {
			$(this).appendTo("#big");
		}
	});
});

var BASE_URL = 'http://www.erepublik.com/';
var own_prof_id = '';
var eDay = undefined;
var weaponprice = undefined;
var LOCALE = 'en/'
var RANKS = ['private', 'corporal', 'sergeant', 'lieutenant', 'captain', 'colonel', 'general', 'fieldmarshal'];

function DamageCalculator() {
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
    var rt = '<table class="calcCost" align="right"><thead>Cost <img src="'+$('#accountdisplay .item:eq(1) img').attr('src')+'" ></thead>'
    dt += '<span id="TitleCalcUnHide" style="display:'+(sh_damcalc == 0 ? 'visibel' : 'none')+'">Damage Calculator (Click to View)</span>'
    dt += '<table id="dcselect" style="display:'+(sh_damcalc == 1 ? 'visibel' : 'none')+'"><thead><span id="TitleCalc" >Damage Calculator (Select Weapons) </span>&nbsp;'
    dt += '<input type="checkbox" id="curwellness" ' + (curw == 1 ? 'checked="true"' : ' ') + '/> Use Current Wellness</thead><tbody>';
    for (i = 5; i >= 0; i--) {
        dt += '<tr><td style="border-bottom: 0px none; padding: 1px 15px 1px 72px;">'

        if (i>0)
            dt+= '<a onclick="location.href = this.href;" style="background-color: red" alt="Weapon Quality Level ' + i + '" title="Weapon Quality Level ' + i + '" href="/' + LOCALE + 'market/country-0-industry-3-quality-' + i + '">';
        else
            dt += '<a alt="Empty handed" title="Empty handed" href="/' + LOCALE + 'market/country-0-industry-3-quality-0">'

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
    dt += '<tr><td style="border-bottom: 0px none; padding: 1px 15px 1px 72px;">Gifts <input id="gifts" class="gifts" type="text" value="0" maxlength="2">'
    dt += '<span class="wpslabel"> WP </span><input id="wps" class="cwps" type="text" value="0" maxlength="2"></td><td></td></tr>'
    
    dt += '<tr><td style="border-bottom: 0px none; padding: 1px 10px 1px 180px;">Total : <span id="dcres" style="border-bottom: 0px none; padding: 0px 0px 0px 7px;"></td></tr></tbody></table>';
    dt += '</td><td id="calcDmg" width="5px" valign="middle">'+rt+'</td></tr>'
    //Last Day Damage
    var sh_ddam = GM_getValue('sh_daydam', 1);
    var lsdamage = eval(GM_getValue('lsdamage', undefined));  //[{ day: 650, dmg: [12340, 12367, 12410]}];  
    if (lsdamage != undefined) {
        lsdamage.sort(damageSort); var sumHTML = '&nbsp;'; var indHTML = "";
        for ( var day = 0 ; day < lsdamage.length; day++ ) {
            var sum = 0;
            sumHTML += '<br>';
            indHTML += '<br>&nbsp;&nbsp;&nbsp;<strong>'+lsdamage[day].day+': </strong>&nbsp;';
            for (var i = 1; i < lsdamage[day].dmg.length; i++) {
                var ddam = 0;
                ddam = (lsdamage[day].dmg[i] - lsdamage[day].dmg[i - 1]);
                indHTML += (ddam) + ' ';
                sum += (ddam);
            }
            sumHTML += sum;
        }
        dt += '<tr id="daydamH" style="display:'+(sh_ddam == 0 ? 'visibel' : 'none')+'" ><td valign="middle" nowrap="nowrap"><span id="TitleLDDuH">Latest Daily Damages (Click to View)</span></td><td>&nbsp;</td></tr>';
        dt += '<tr id="daydamS" style="display:'+(sh_ddam == 1 ? 'visibel' : 'none')+'" ><td valign="middle" nowrap="nowrap"><span id="TitleLDDH">Latest Daily Damages (Click to Hide)</span><br>'+indHTML+'</td><td valign="middle" align="right"><strong id="daydamtotal">'+sumHTML+'</strong></td></tr>'
    }
    $('.offers tbody tr:first').next().next().after( dt );
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
        calcDmg();
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
        calcDmg();
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
        calcDmg();
        });          
     $('#wps').live("keypress", function (event) {
        var e = event.which; var noStart = 48; var noEnd = 59; var jokerKey = 0;
        if ( e == 8 || e == 9 || e == 37 || e == 39 || ( noStart <= e && e < noEnd ) || jokerKey == e) return true;
    	else return false;
        });
    $('#wps').live("change",function () {
        calcDmg();
        });
    $('#curwellness').live("change", function() {
        GM_setValue('ema_cwellness', $(this).attr('checked')?1:0);
        calcDmg();
    });

    if ( weaponprice == undefined ) GetUnitPrices()

}

function calcDmg() {
    var cWellness = $('#curwellness').attr('checked') ? parseFloat($('#wellnessvalue').text()) : 100;
  	var strenght = parseFloat($("#content table td:eq(1)").text());
	var rank = $("#content table td:eq(3) img").attr("src").split('_')[3].split('.')[0];
	var rankBonus = (RANKS.indexOf(rank) + 1) * 0.2 + 1;
	var gift = $('#gifts').val();
	var wp = $('#wps').val();
    var ConstDamage = 2 *  strenght * rankBonus;
    var wdb = [0,0,0,0,0,0]; for(var i=5; i>=0; i--) { wdb[i] = $('#iweapon'+i).val(); }
    var wpcost_t = 0;
        
    var calcdmg = Dmgcalc(cWellness,strenght,rankBonus,wdb,gift,wp);
 
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

function Dmgcalc(cWellness,str,rankB,qdb,gift,wp) {
	var wpdam = [[],[],[],[],[],[],0];
    var ConstDamage = 2 *  str * rankB;
    for(var i=5; i>=0; i--)
    {
        for(j=0; j<qdb[i]; j++) {
            if (wp > 0 && cWellness < 95) {
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

function damageSort(a, b) { return (b.day - a.day);}

function DamageUpdate() {
	var sReq = "http://api.erepublik.com/v1/feeds/citizens/";
    
    GM_xmlhttpRequest({
		method: 'GET',
		url: sReq + own_prof_id,
		onload: function (res) {
            var xd = new DOMParser().parseFromString(res.responseText, "text/xml");
			var cdam = parseInt($("damage",xd).text(),10);
            var today = eDay;
            
            var lastdday = eval(GM_getValue('savedday',0));
//            GM_log('DamageUpdate() - day: '+eDay+" GM:"+lastdday);
            if ( (today - lastdday) > 0 ) 
            { 
                GM_setValue('savedday', uneval(today));
                
                var lastdamages = eval(GM_getValue('zerodamages',undefined));
                if (lastdamages == undefined)
                    lastdamages = [{day: today, dam: cdam}];
                else
                    lastdamages.unshift({day: today, dam: cdam});

                GM_setValue('zerodamages', uneval(lastdamages));
                if (location.href.indexOf(own_prof_id) != -1)
                    ProfileUpdate();
            }
		},
	});
}

function ProfileUpdate () {
    var zdmg = eval(GM_getValue('zerodamages'));
    var need_maintance = false;
    if (zdmg != undefined){
        var current = zdmg[0].dam;
        $('span.goright.special').each(function(i) {//p.padded 
            if ($(this).text().indexOf('/') != -1) {
                current = parseInt($(this).text(),10);
            }
        });

        var lsdamage = eval(GM_getValue('lsdamage', undefined));  //[{ day: 650, dmg: [12340, 12367, 12410]}];  
        if (lsdamage != undefined && lsdamage.length >0 ) {
            zdmg = [];
            if ( eDay != lsdamage[0].day ) 
                zdmg.push({day: eDay,dam: current });
            
            lsdamage.sort(damageSort);
            for ( var day = 0 ; day < lsdamage.length; day++ ) {
                zdmg.push( {day: (lsdamage[day].day), dam: lsdamage[day].dmg[0]}); //lsdamage[day].dmg.length-1
            }
        }
        
        var deltadm = current-zdmg[0].dam;
        var todaydm = '<p class="padded"><span class="goleft"><img class="iconsoft" src="/images/parts/icon-hero.gif" alt="Hero Fights"/>  Today Damage:</span>';
        todaydm += '<span class="goright special">&nbsp;&nbsp;&nbsp;'+deltadm+'&nbsp;</span>';
    
        todaydm += '<p class="padded"><span class="goleft"><img class="iconsoft" src="/images/parts/icon-hero.gif" alt="Hero Fights"/>  Latest Damages:</span>';
        todaydm += '<table class="goright special" >'
        for(var i=1; i<zdmg.length;i++)
        {
            GM_log("Prof "+i+". "+ (zdmg[i-1].day)+" - "+ (zdmg[i-1].dam) +", "+(zdmg[i].day)+" - "+ (zdmg[i].dam));
            if ( (zdmg[i].day) != (zdmg[i-1].day) && (zdmg[i].day <= eDay) ) 
                todaydm += '<tr><td><span class="goright special">'+zdmg[i].day+'&nbsp;Day:</span></td><td><span class="goright special">'+(zdmg[i-1].dam-zdmg[i].dam)+'</span><td></tr>';
            else need_maintance = true;
        }
        todaydm += '</table>'
        $('div.quarter:last-child').append(todaydm);//div.holder.iep
    }

    if ( need_maintance ) {
        GM_log('Damage_Statistic_maintance');
      
    } else if ( zdmg.length > 7) {
        zdmg.pop();
        //GM_setValue('zerodamages',uneval(zdmg) );
    }
}

function BattleUpdate() {
    var today = eDay;
    var inHTML = '<span class="double">Damages <br/>';//<div class="ls-half last">
    var damage = parseInt($('.lsvalue span').text(), 10);
    var ctotaldamage = ($('em.double:has(img[alt=Trivia-arrow-up])').text().match(/(\d+).\/.\d/)[1]);
    var lsdamage = eval(GM_getValue('lsdamage', undefined));  //[{ day: 650, dmg: [12340, 12367, 12410]}];  
    
    if (lsdamage == undefined) {
        lsdamage = [{ day: today, dmg: [(ctotaldamage - damage), ctotaldamage]}];
    }
    else {
        if (lsdamage[0].day != today) {
            lsdamage.push({ day: today, dmg: [(ctotaldamage - damage), ctotaldamage] })
     } else {
        lsdamage[0].dmg.push(ctotaldamage);
     }

     lsdamage.sort(damageSort);
     while (lsdamage.length > 6)
         lsdamage.pop();
    }
    
    GM_setValue('lsdamage', uneval(lsdamage));

    var sum = 0;
    for (var i = 1; i < lsdamage[0].dmg.length; i++) {
        inHTML += (lsdamage[0].dmg[i] - lsdamage[0].dmg[i - 1]) + ' ';
        sum += (lsdamage[0].dmg[i] - lsdamage[0].dmg[i - 1]);
    }
    
    inHTML += '</span><em style="width: 40px;"><span><strong>' + sum +' </strong></span></em>';
    $('.ls-half:eq(7)').html(inHTML);
}

function GetUnitPrices()
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

function Main(e) {
    //debug
    //GM_setValue('zerodamages',uneval([{ day: 873, dam: 140300},{ day: 872, dam: 139995},{ day: 871, dam: 139095},{ day: 870, dam: 138025},{ day: 869, dam: 137095},{ day: 869, dam: 135078}]))
    //GM_setValue('savedday', uneval(872));
    //GM_deleteValue('savedday')
	
    try {
	    own_prof_id = $("div.core > div.avatarholder > a.citizen_name").attr("href").split('/')[4];
        eDay = parseInt($("#clock > .eday > strong").text() ,10);
	} catch (e) { own_prof_id = 'falilure'; }

    var currURL = location.href;
	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, subURL.indexOf('/')) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);

    var profileupdelayed = false;
    if ( (eDay - eval(GM_getValue('savedday', 0))) > 0 )
    {
        profileupdelayed = true;
        DamageUpdate();
    }
	if (subURL.indexOf('my-places/army') != -1) {
	    DamageCalculator();
	}
	else if (subURL.indexOf('citizen/profile') != -1 && !profileupdelayed) {
        if ( subURL.indexOf(own_prof_id) != -1)
	        ProfileUpdate();
    }
	else if (subURL.indexOf('battles/fight') != -1)
	    BattleUpdate();
};

window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		Main();
	}
},100);}, false);