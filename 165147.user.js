// ==UserScript==
// @name           	Gladiatus auto dungeon
// @namespace     	http://userscripts.org/users/janis187
// @description  	gladiatus dungeon auto bot
// @author         janis187
// @version  	    1.7
// @include        	http://s*.gladiatus.*/game/index.php?mod=dungeon&loc*
// @include         http://s*.gladiatus.*/game/index.php?mod=reports&submod=showCombatReport&*t=1*
// @require         	http://code.jquery.com/jquery-latest.js
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==


var getonoff = GM_getValue("gladiatus_dung_onoff");
var getcounter = GM_getValue("gladiatus_dung_counter");
var getmax = GM_getValue("gladiatus_dung_max");
if(!getonoff){GM_setValue('gladiatus_dung_onoff', 'on');getonoff='off'}
if(!getcounter){GM_setValue('gladiatus_dung_counter',0);getcounter=0}
if(!getmax){GM_setValue('gladiatus_dung_max',0);getmax=0}
if(getcounter>getmax){GM_setValue('gladiatus_dung_counter',0);getcounter=0}

$("#content").prepend("<div style='background-color: #deb887;border: 3px solid #daa520;padding: 8px;'>" +
    "<input id='onoff' type='button' class='button' style='margin: 0 10px;' value='"+getonoff+"'/> " +
    "<span>Running: "+getcounter+" of maximum : <input type='text' id='exit' size='2' maxlength='2' pattern='[0-9]*' value='"+getmax+"'/> times and restart! 0 = normal mode!</span>" +
    "<span id='errorcheck' style='margin-left: 15px;'></span>" +
    "</div>");

$('#onoff').click(function(){
    var onoff =$(this).val();

    if ( onoff == 'off') {
        GM_setValue('gladiatus_dung_onoff', 'on');
        $(this).val('on');
    } else if ( onoff == 'on' ) {
        GM_setValue('gladiatus_dung_onoff', 'off');
        $(this).val('off');
    }
    else if ( onoff == 'undefined' ) {
        GM_setValue('gladiatus_dung_onoff', 'off');
        $(this).val('off');
    }
    window.location.reload();
});

$("#exit").keyup(function(){GM_setValue('gladiatus_dung_max',Number($(this).val()))});

$(document).ready(function(){
    var target = $('#content>div>div>img[onclick]:eq(0)');
    var dngbutton = $('li.pngfix:eq(2)>a');
    if (getonoff =='on'){

        if ($('form>table>tbody>tr>td:eq(1)>input.button1:disabled').length){
            $('form>table>tbody>tr>td:eq(0)>input.button1').trigger('click');
        }else {
            $('form>table>tbody>tr>td:eq(1)>input.button1').trigger('click');
        }
        //console.log(getcounter);console.log(getmax);
        if(target.length){
            var exit = $("input[name='dungeonId']+input");
            if(getcounter == getmax && getcounter > 0){GM_setValue('gladiatus_dung_counter',0);setTimeout(function(){exit.trigger('click')}, 3000)}
            else{GM_setValue('gladiatus_dung_counter',getcounter+1);setTimeout(function(){target.trigger('click');}, 3000);}
        }else if (dngbutton.length){
            setTimeout(function(){window.location.href=dngbutton.attr("href")}, 3000);
        }
        setTimeout(function(){window.location.reload();}, 1000*60*20);
    }
});