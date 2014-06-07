// ==UserScript==
// @name           Gladiatus Circus Provinciarum
// @namespace      janis187
// @description    auto attacker
// @version  	    1.1
// @include        http://s*.gladiatus.*/game/index.php?mod=arena&submod=serverArena&aType=3*
// @require         	http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var getonoff = GM_getValue("gladiatus_cipr_onoff");


$('.pngfix.current').append("<input id='onoff' type='button' class='button' style='margin-left: 10px;' value='"+getonoff+"' name='onoff'>");

$('#onoff').click(function(){
    var onoff =$(this).val();

    if ( onoff == 'off') {
        GM_setValue('gladiatus_cipr_onoff', 'on');
        $(this).val('on');
    } else if ( onoff == 'on' ) {
        GM_setValue('gladiatus_cipr_onoff', 'off');
        $(this).val('off');
    }
    else if ( onoff == 'undefined' ) {
        GM_setValue('gladiatus_cipr_onoff', 'off');
        $(this).val('off');
    }

});




$(document).ready(function(){

    if (getonoff =='on'){


        var levelindex=0;
        var lowlevel="";
        $(".title2_inner>table>tbody>tr").each(function(index){
            var level=$("td:eq(1)",this).text();level=Number(level);
            if(index>0){
                    if(lowlevel>level || lowlevel==""){
                        lowlevel=level;lowlevel=Number(lowlevel);levelindex=index;
                    }
                }
        });

        var onclick=$(".title2_inner>table>tbody>tr:eq("+levelindex+")>td>span:eq(0)").attr("onclick");
        //var type=onclick.replace(/.*\((\d+),\s(\d+),\s(\d+),\s'(\w+)',\s'(.+)'\);/,"$1");
        var ID=onclick.replace(/.*\((\d+),\s(\d+),\s(\d+),\s'(\w+)',\s'(.+)'\);/,"$2");
        var server=onclick.replace(/.*\((\d+),\s(\d+),\s(\d+),\s'(\w+)',\s'(.+)'\);/,"$3");
        var country=onclick.replace(/.*\((\d+),\s(\d+),\s(\d+),\s'(\w+)',\s'(.+)'\);/,"$4");
        var name=onclick.replace(/.*\((\d+),\s(\d+),\s(\d+),\s'(\w+)',\s'(.+)'\);/,"$5");
        var hash= window.location.href.replace(/.+sh=/,"");

        startArena(ID,server,country,name,hash);

        setTimeout(function(){
            window.location.reload();
        },1000*60);



    }

});


function startArena(ID,server,country,name,hash)
{

    $.ajax({
        url: "ajax.php?mod=arena&submod=doCombat&aType=3&opponentId="+ID+"&serverId="+server+"&country="+country+"&opponentName="+name+"&sh="+hash,
        type: 'get',
        dataType: 'html',
        async: false
        //success: function(data) {console.log(data);}
    });
}
