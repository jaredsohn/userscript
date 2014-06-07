// ==UserScript==
// @name            NordInvasion+ Companion
// @namespace       http://nordinvasion.com
// @author          Kip
// @version         1.2.2
// @date            9.15.2013
// @description     Adds various functions to the NI website.  A companion script to NordInvasion+.
// @include         http://nordinvasion.com/*
// @include         http://www.nordinvasion.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @run-at          document-start
// ==/UserScript==

// Code that has to run before all other scripts on the page.
window.addEventListener('beforescriptexecute', function(e) {
    // Find the correct script tag for the Crafting page
    if (e.target.src.search(/crafting\.js/) !== -1) {
        status++;
        e.stopPropagation();
        e.preventDefault();
        nip_craftingJs();
    }
    // Find the correct script tag for the Auction Hall
    if (e.target.src.search(/auction\.js/) !== -1) {
        status++;
        e.stopPropagation();
        e.preventDefault();
        nip_auctionJs();
    }
    // Find the correct script tag for the Trading Center
    if (e.target.innerHTML.search(/title: 'Pick Items'/) !== -1) {
        status++;
        e.stopPropagation();
        e.preventDefault();
        nip_tradingJs();
    }
    if (status === 1) window.removeEventListener(e.type, arguments.callee, true);
}, true);

// Replacement code for "crafting.js"
function nip_craftingJs() {
    $(function(){
        $('#progressbar').progressbar({
            value: 0,
            complete: function(){
                //alert('Crafting Complete!');
                data = {};
                data.act = 3;
                data.b = $('#bpid').val();
                data.c = $('#profid').val();
                $.post('/ajax.php',data,function(d){
                    $('#userFlash').html('');

                    if (d.created !== undefined && d.created === 1) {
                        //do success stuff here
                        $('span.ctxt').html('Complete!');

                        //housekeeping
                        if (d.i !== undefined) {
                            $.each(d.i, function(index, value){
                                if ($('#' + index).length>0) {
                                    var newInv = parseInt($('#' + index).html()) - value;
                                    if (newInv < parseInt($('#req_' + index).html())) {
                                        $('#' + index).css('font-weight', 'normal');
                                        $('#craftable').hide('slow');
                                    }
                                    $('#' + index).html(newInv);
                                }
                            });
                        }
                    } else {
                        //500 error
                        $('#userFlash').html('Oops an error occured!');
                        userFlash();
                        $('span.ctxt').html('Crafting Failed :(');
                    }
                    if (d.level !== undefined && d.level > 0) {
                        //level up
                        $('#userFlash').html('Congratulations! You are now level ' + d.level);
                        userFlash();
                    }
                }, 'json');
                clearTimeout(craftTimer);
                craftedSoFar++;
                setTimeout(craftingCounter(),1000);
            }
        });

        $('#begin_craft').button();
        
        $('#craftable').append("Quantity: <input id=\"craft_quantity\" class=\"ui-widget ui-widget-content ui-corner-all\" type=\"text\" value=\"1\" style=\"height: 30px; width: 50px; text-align: center;\"></input>");

        $('#begin_craft').click(function(){
            if ($('#progressbar').progressbar('value') === 0 || $('#progressbar').progressbar('value') === 100) {
                craftingOrder = Number($('#craft_quantity').val());
                craftedSoFar = 0;
                $(this).button('disable');
                craftingCounter();
            }
        });
    });
    
    function craftingCounter() {
        // Check whether enough items have been crafted already
        if (craftedSoFar < craftingOrder) {
            // Do what you need to do to craft
            $('#userFlash').hide();
            $('#progressbar').progressbar('value', 0);
            $('#progressbar div').html("<span style='line-height:30px;' class='ctxt'>Crafting...</span>");
            $('#progressbar div').css('text-align', 'center');
            incProgress();
        } else {
            // Do what you need to do to finish crafting
            craftingOrder = 0;
            $('#begin_craft').button('enable');
        }
    }

    function incProgress() {
        if ($('#progressbar').progressbar('value') < 100) {
            var upTime = 250;
            var inc = parseInt((upTime/craftTime)*100)+1;
            
            $('#progressbar').progressbar('value', $('#progressbar').progressbar('value') + inc);
            //alert('incme');
            craftTimer = setTimeout(incProgress, upTime);
        }
    }

    function userFlash() {
        $('#userFlash').show('slow');
        setTimeout('hideFlash', 5000);
    }

    function hideFlash() {
        $('#userFlash').hide('slow');
    }
}

// Replacement code for "auction.js"
function nip_auctionJs() {
    $(function(){
        $('#sell_btn').button({
            icons: {
                primary: "ui-icon-cart"
            }
        });

        $('#sell_btn').click(function(){
            //popup sell box
            setLoading();
            loadToSell(0);
            $('#dialog').dialog('open');
            $('#dialog-filter').focus();
        });

        $('#dialog').dialog({
            autoOpen: false,
            height: 400,
            width: 600,
            modal: true,
            resizable: false,
            title: 'Pick Item to List'
        });

        // Inline JavaScript that hides and shows the default values
        var hideInputTitleCode = "if($(this).val() === $(this).attr('title')) $(this).val('').css('color','');";
        var showInputTitleCode = "if($(this).val() === '') $(this).val($(this).attr('title')).css('color','silver');";

        $('#dialog').after('<input id="dialog-filter" type="text" title="Filter" name="filter" style="width: 100%" onfocus="' + hideInputTitleCode + '" onblur="' + showInputTitleCode + '"></input>');
        $('#dialog-filter').keyup(function() {
            var filter = $('#dialog-filter').val();
            $('#list-item-container > div').each(function() {
                var item_name = $('.item_string', this).text();
                if ((filter === "") || (item_name.toLowerCase().search(filter.toLowerCase()) !== -1)) $(this).show();
                else $(this).hide();
            });
        });

        $('a.sell_item_link').live('click', function(event){
            event.preventDefault();

            var item_id = $(this).parent('div').attr('id').replace('i_', '');
            var name = $(this).parent('div').children('span.item_string').html();
            var qty = $(this).parent('div').children('.item_quantity').val();
            var cost = qty*parseInt($(this).next('input').val()*0.7);
            $('#list-item-container').hide(400);
            $('#dialog').html("<div id='ah-sell-single-item'>"+
            "<div style='font-size:24px; margin:10px 0;'><strong>"+qty+"</strong> x " + name + "</div>"+
            "<div style='font-size: 12px; margin:5px 0;' class='list_info'>Sell Price: <input type='text' name='sell_price' class='sell_price' value='"+cost+"' style='width: 60px;' /> <img src='images/coins.png' class='gold_ico'/><br/><br/>" +
            "<div class='cost_to_list'>This will cost: 10 <img src='images/coins.png' class='gold_ico'/> + <span class='gold_perc'>"+parseInt(cost*0.05)+"</span> <img src='images/coins.png' class='gold_ico'/> to list</div>" +
            "<a href='' class='list_item_btn_back'>Back</a> <a href='' style='float:right;' class='list_item_btn'>List Item</a><input type='hidden' class='list_item_id' value='"+item_id+"' /><input type='hidden' class='list_qty' value='"+qty+"' />"+
            "</div>"
            + "</div>");
            $('#dialog').dialog('option', 'height', 'auto');
            $('a.list_item_btn').button();
            $('a.list_item_btn_back').button();
        });

        $('a.ah-purchase-btn').button();
        $('a.ah-retrieve-btn').button();

        $('a.ah-purchase-btn').live('click', function(){
        });

        $('input.sell_price').live('blur', function(){
            var cost = $(this).val();
            $(this).parent().children('.cost_to_list').children('.gold_perc').html(parseInt(cost*0.05));
        });

        $('a.list_item_btn').live('click', function(event){
            event.preventDefault();
            if (confirm('Are you sure you want to list this?')) {
                //post list item ajax
                var p = $(this).parent();
                var item_id = parseInt(p.children('.list_item_id').val());
                var qty = parseInt(p.children('.list_qty').val());
                var price = parseInt(p.children('.sell_price').val());

                setLoading();
                data = {};
                data.act = 129;
                data.item_id = item_id;
                data.qty = qty;
                data.price = price;
                $.post('/ajax.php', data, function(d){
                    if (d.error !== undefined) {
                            $('#dialog').html("<div class='ui-corner-all ui-state-error' style='padding:5px;'><span style='float: left; margin-right: .3em;' class='ui-icon ui-icon-alert'></span>"+d.error+"</div>");
                    }

                    if (d.success !== undefined && d.success === 1) {
                            $('#dialog').css('text-align', 'center');
                            $('#dialog').html('<h2>Items Now Listed...</h2>');					
                    }				

                    $('#dialog').append('<br/><div style="margin:10px 0;"><a href="" class="close_btn">Close</a></div>');
                    $('.close_btn').button();
                }, 'json');
            }
        });

        $('a.close_btn').live('click', function(event){
            event.preventDefault();
            $('#dialog').html('');
            $('#dialog').dialog('close');
            window.location = '/auction_hall.php';
        });
        $('a.list_item_btn_back').live('click', function(event){
            event.preventDefault();
            $('#dialog').dialog('option', 'height', 400);
            loadToSell(0);
        });

    });

    function setLoading() {
        $('#dialog').html("<img src='/images/ajax-loader.gif' alt='Loading...' style='margin: auto;'/>");
    }

    function loaded() {
    }

    function loadToSell(filter) {
        $('#dialog').dialog('option', 'height', 400);
        $('#dialog').dialog('option', 'position', 'center');
        data = {};
        data.filter = parseInt(filter);
        data.act = 128;
        $.get('/ajax.php', data, function(data) {
            if (data.items !== undefined) {
                $('#dialog').html('<div id="list-item-container"></div>');
                $('#dialog').css('text-align', 'left');
                $.each(data.items, function(index,value){
                    $('#list-item-container').append('<div class="ah-item-sell ui-corner-all" id="i_'+value.item_id+'"><input type="text" name="item_quantity"  class="item_quantity" value="' + value.inventory_quantity + '" /> x <span class="item_string">' + value.rarity_string + 
                    '</span><a href="" class="sell_item_link" style="float:right">Sell</a><input type="hidden" class="item_cost" value="'+value.cost+'"</div>');
                });

                $('.sell_item_link').button();
                //$('.ui-dialog').effect('size', {to: {width: 600, height: 400}}, 500);
                $('#dialog').dialog('option', 'position', 'center');
            }
        }, 'json');
    }
}

function nip_tradingJs() {
    $(function(){
        $('#player_name').autocomplete({
            source: "/ajax.php?act=64",
            minLength: 2,
            select: function( event, ui ) {
                //"Selected: " + ui.item.value + " aka " + ui.item.id :
                $('#invite_btn').button('option', 'disabled', false);
            }
        });

        $('#invite_btn').button({disabled:true});
        $('#accept_one').button();
        $('#accept_two').button();
        $('#addgold').button();

        $('.trade-add').button({icons: {primary: 'ui-icon-circle-plus'}});
        $('.btn_remove').button({icons: {primary: 'ui-icon-trash'}});

        $('.trade-add').click(function(e){
            e.preventDefault();
            setLoading();
            loadToSell(0);
            $('#dialog').dialog('open');
            $('#dialog-filter').focus();
        });

        $('#dialog').dialog({
            autoOpen: false,
            height: 400,
            width: 600,
            modal: true,
            resizable: false,
            title: 'Pick Items to Trade'
        });
        
        // Inline JavaScript that hides and shows the default values
        var hideInputTitleCode = "if($(this).val() === $(this).attr('title')) $(this).val('').css('color','');";
        var showInputTitleCode = "if($(this).val() === '') $(this).val($(this).attr('title')).css('color','silver');";

        $('#dialog').after('<input id="dialog-filter" type="text" title="Filter" name="filter" style="width:528px;height:26px;margin:4px 0 0 0" onfocus="' + hideInputTitleCode + '" onblur="' + showInputTitleCode + '"></input><a href="" class="trade_item_link" style="float:right">Trade</a>');
        $('.trade_item_link').button();
        $('#dialog-filter').keyup(function() {
            var filter = $('#dialog-filter').val();
            $('#list-item-container > div').each(function() {
                var item_name = $('.item_string', this).text();
                if ((filter === "") || (item_name.toLowerCase().search(filter.toLowerCase()) !== -1)) $(this).show();
                else $(this).hide();
            });
        });
                
        $('a.trade_item_link').live('click', function(event){
            event.preventDefault();
            if (confirm("Are you sure you want to trade the selected items?")) {
                var totalItems = $(".ah-item-sell .add_item:checked").length;
                var addedItems = 0;
                $(".ah-item-sell .add_item:checked").each(function(){
                    var item_id = $(this).parent('div').parent('div').attr('id').replace('i_', '');
                    var name = $(this).parent('div').parent('div').children('span.item_string').html();
                    var qty = $(this).parent('div').parent('div').children('.item_quantity').val();
                    data = {};
                    data.act = 65;
                    data.trade_id = $('#tid').val();
                    data.item_id = item_id;
                    data.qty = qty;
                    $.post('/ajax.php', data, function(data){
                        if ((data.success !== undefined) && (parseInt(data.success) === 1)) {
                            addedItems++;
                            if (addedItems === totalItems) window.location = '/trading.php?t=' + $('#tid').val();
                        } else {
                            if (data.error !== undefined) {
                                $('#dialog').html("" + data.error);
                            } else {
                                $('#dialog').html("There was a problem adding that item to the trade");
                            }
                        }
                    }, 'json');
                });
            }
        });
    });

    function loadToSell(filter) {
        $('#dialog').dialog('option', 'height', 400);
        $('#dialog').dialog('option', 'position', 'center');
        data = {};
        data.filter = parseInt(filter);
        data.act = 128;
        $.get('/ajax.php', data, function(data) {
            if (data.items !== undefined) {
                $('#dialog').html('<div id="list-item-container"></div>');
                $('#dialog').css('text-align', 'left');
                $.each(data.items, function(index,value) {
                    $('#list-item-container').append('<div class="ah-item-sell ui-corner-all" id="i_'+value.item_id+'"><input type="text" name="item_quantity"  class="item_quantity" value="' + value.inventory_quantity + '" /> x <span class="item_string" style="display:inline-flex;width:165px;">' + value.rarity_string + 
                    '</span><div style="color:grey;float:right;text-align:center;">Add<br /><input class="add_item" type="checkbox"></input></div><input type="hidden" class="item_cost" value="'+value.cost+'"</div>');
                });

                //$('.trade_item_link').button();
                //$('.ui-dialog').effect('size', {to: {width: 600, height: 400}}, 500);
                $('#dialog').dialog('option', 'position', 'center');
            }
        }, 'json');
    }

    function setLoading() {
        $('#dialog').html("<img src='/images/ajax-loader.gif' alt='Loading...' style='margin: auto;'/>");
    }
}
