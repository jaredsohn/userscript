// ==UserScript==
// @name        Roswar - MMORPG Nav Style
// @description By Cleaver - http://www.roswar.ru/player/723982/
// @include     http*://www.roswar.ru/*
// @version     1
// @grant       none
// ==/UserScript==

if(player) {

    // add css
    $("head").append('<link rel="stylesheet" href="http://bro.e-div.com/roswar/style.css" type="text/css">');
    
    // eat candys
    $("#candys .ed_subbox .ed_box:not(.ed_disabled)").live("click", function() {
        $.ajax({
            url      : "/player/json/" + $(this).data('action') + "/" + $(this).data('id') + "/",
            dataType : "json",
            success  : function (response) {
                updateCandys();
            }
        });
    });
    
    // update candys
    $("#dopings-accordion .actions, .shop-objects .action").live("click", function() {
        updateCandys();
    });
    
    // do battle
    $("#searchBattle .ed_box").live("click", function() {
        $(this)
            .closest("form").find("input[name=type]").val($(this).data("type"))
            .closest("form").submit();
    });
    
    
    function updateCandys(){
    
        var candys = "",
            candysInner = "";
        
        $.ajax({
            url      : "/player/json/",
            dataType : "json",
            success  : function (response) {
                
                $.each(response.boost_inventory, function(data, index){
                
                var img   = response.boost_inventory[data]['image'],
                    count = response.boost_inventory[data]['durability'],
                    id    = response.boost_inventory[data]['id'],
                    title = response.boost_inventory[data]['name'] + " - " + response.boost_inventory[data]['info'],
                    code = response.boost_inventory[data]['code'],
                    usedCode = false;
                    
                    $.each(response.boost, function(data, index){
                        if(response.boost[data]['code'] == code){
                            usedCode = true;
                            return false;
                        }
                    });
              
                    candysInner += '            <div class="ed_box' + (usedCode ? " ed_disabled" : "") + '" data-action="use" data-id="' + id + '" title="' + title + '">';
                    candysInner += '                <div class="ed_count">' + count + '</div>';
                    candysInner += '                <div class="ed_item">';
                    candysInner += '                    <img src="/@/images/obj/' + img + '" alt="" />';
                    candysInner += '                </div>';
                    candysInner += '            </div>';
                });
                
                if(candysInner != ""){
                    candys += '        <div class="ed_box">';
                    candys += '            <div class="ed_item" title="Сладости">';
                    candys += '                <img src="/@/images/obj/lamp-pack.png" alt="" />';
                    candys += '            </div>';
                    candys += '            <div class="ed_subbox">';
                    candys += candysInner;
                    candys += '            </div>';
                    candys += '        </div>';
                
                    $("#candys").html(candys);
                }
            }
        });
    }
    
    // build nav
    var mmorpg = "";
    
    mmorpg += '<div id="mmorpg">';
    
    // Сладости
    mmorpg += '    <div id="candys"></div>';
    updateCandys();
    
    // Клан
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Клан" href="/clan/profile/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-05.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Склад" href="/clan/profile/warehouse/">';
    mmorpg += '                    <img src="/@/images/obj/clan5.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Войны и союзы" href="/clan/profile/diplomacy/">';
    mmorpg += '                    <img src="http://bro.e-div.com/roswar/ico-05-b.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Логи" href="/clan/profile/logs/">';
    mmorpg += '                    <img src="http://bro.e-div.com/roswar/ico-05-c.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '        </div>';
    mmorpg += '    </div>';
    
    // ГосПром
    if(player['level'] >= 6) {
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="ГосПром" href="/sovet/leaders/">';
    mmorpg += '            <img src="/@/images/obj/mayor_crown.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Карта битвы" href="/sovet/map/">';
    mmorpg += '                    <img src="http://bro.e-div.com/roswar/ico-04-a.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Моя карьера" href="/sovet/career/">';
    mmorpg += '                    <img src="http://bro.e-div.com/roswar/ico-04-b.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '        </div>';
    mmorpg += '    </div>';
    }
    
    // Закоулки
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Закоулки" href="/alley/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-01.png" alt="" />';
    mmorpg += '        </a>';
    if(player['level'] >= 2) {
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <form id="searchBattle" method="post" action="/alley/search/type/">';
    mmorpg += '                <input type="hidden" value="" name="type" />';
    mmorpg += '                <input type="hidden" value="0" name="werewolf" />';
    mmorpg += '                <input type="hidden" value="1" name="nowerewolf" />';
    mmorpg += '                <input type="hidden" value="1" name="__ajax" />';
    mmorpg += '                <input type="hidden" value="/alley/" name="return_url" />';
    mmorpg += '                <div class="ed_box" data-type="weak">';
    mmorpg += '                    <div class="ed_item" title="Отнять у слабого">';
    mmorpg += '                        <img src="http://bro.e-div.com/roswar/ico-01-c.png" alt="" />';
    mmorpg += '                    </div>';
    mmorpg += '                </div>';
    mmorpg += '                <div class="ed_box" data-type="equal">';
    mmorpg += '                    <div class="ed_item" title="Найти равного">';
    mmorpg += '                        <img src="http://bro.e-div.com/roswar/ico-01-b.png" alt="" />';
    mmorpg += '                    </div>';
    mmorpg += '                </div>';
    mmorpg += '                <div class="ed_box" data-type="strong">';
    mmorpg += '                    <div class="ed_item" title="Наехать на сильного">';
    mmorpg += '                        <img src="http://bro.e-div.com/roswar/ico-01-a.png" alt="" />';
    mmorpg += '                    </div>';
    mmorpg += '                </div>';
    mmorpg += '            </form>';
    mmorpg += '        </div>';
    }
    mmorpg += '    </div>';
    
    // Метро
    if(player['level'] >= 6) {
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Метро" href="/metro/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-02.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <div class="ed_item ed_submit" title="Охота на крысомах" onclick="metroTrackRat();">';
    mmorpg += '                    <img src="/@/images/pers/npc1_thumb.png" alt="" />';
    mmorpg += '                </div>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Наперсточник" href="/thimble/start/">';
    mmorpg += '                    <img src="/@/images/pers/man100_thumb.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '        </div>';
    mmorpg += '    </div>';
    }
    
    // Цыганский табор
    if(player['level'] >= 9) {
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Цыганский табор" href="/camp/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-03.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Цыганка Азазелла" href="/camp/gypsy/">';
    mmorpg += '                    <img src="/@/images/obj/collections/61-loot.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Мастерская Микки" href="/camp/amulet/">';
    mmorpg += '                    <img src="/@/images/obj/amulet_7.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Меняла Изя" href="/camp/exchange/">';
    mmorpg += '                    <img src="/@/images/loc/gypsy/crystals/unknown.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '        </div>';
    mmorpg += '    </div>';
    }
    
    // Торговый центр
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Торговый центр" href="/shop/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-08.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '    </div>';
    
    // ШаурБургерс
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="ШаурБургерс" href="/shaurburgers/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-09.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '    </div>';
    
    // Завод
    if(player['level'] >= 9) {
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Завод" href="/factory/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-06.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Мастерская" href="/factory/mf/">';
    mmorpg += '                    <img src="/@/images/obj/item19.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    /*
    if(player['level'] >= 10) {
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Нано-цех" href="/sovet/career/">';
    mmorpg += '                    <img src="/@/images/obj/nanogel.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    }
    */
    mmorpg += '        </div>';
    mmorpg += '    </div>';
    }
    
    // Казино
    if(player['level'] >= 4) {
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Казино" href="/casino/">';
    mmorpg += '            <img src="http://bro.e-div.com/roswar/ico-07.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '        <div class="ed_subbox">';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Спортлото" href="/casino/sportloto/">';
    mmorpg += '                    <img src="http://bro.e-div.com/roswar/ico-07-a.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '            <div class="ed_box">';
    mmorpg += '                <a class="ed_item" title="Слоты" href="/casino/slots/">';
    mmorpg += '                    <img src="http://bro.e-div.com/roswar/ico-07-b.png" alt="" />';
    mmorpg += '                </a>';
    mmorpg += '            </div>';
    mmorpg += '        </div>';
    mmorpg += '    </div>';
    }
    
    // Заначка
    mmorpg += '    <div class="ed_box">';
    mmorpg += '        <a class="ed_item" title="Заначка" href="/stash/">';
    mmorpg += '            <img src="/@/images/obj/med2.png" alt="" />';
    mmorpg += '        </a>';
    mmorpg += '    </div>';
    
    mmorpg += '    <div id="ed_dragg"></div>';
    mmorpg += '</div>';
    
    $(".body-bg").parent().prepend(mmorpg);
    
    
    // draggable
    if(getCookie("mmorpg_top") && getCookie("mmorpg_left")) {
        var posTop  = parseInt(getCookie("mmorpg_top")),
            posLeft = parseInt(getCookie("mmorpg_left"));
             
        $("#mmorpg").css({
            top: posTop,
            left: posLeft,
            right: "auto"
        });
        
        if(posLeft <= 110){;
            $("#mmorpg").addClass("ed_reverse");
        } else {
            $("#mmorpg").removeClass("ed_reverse");
        }
    }
    $("#mmorpg").draggable({
        handle: "#ed_dragg",
        containment: "body",
        stop: function( event, ui ) {
            $.cookie("mmorpg_top", (ui['position'].top < 0 ? 0 : ui['position'].top));
            $.cookie("mmorpg_left", (ui['position'].left < 0 ? 0 : ui['position'].left));
        
            if(ui['position'].left <= 110){;
                $("#mmorpg").addClass("ed_reverse");
            } else {
                $("#mmorpg").removeClass("ed_reverse");
            }
        }
    });

}