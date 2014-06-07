// ==UserScript==
// @name       Clicking Badder
// @namespace  http://clickingbad.nullism.com/
// @version    1.2
// @description  Adds some timer-based buttons to make more or sell more in the game clicking bad
// @match      http://clickingbad.nullism.com/
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2013+, mcse3010
// ==/UserScript==


function ClickingBadder() {
    var isMaking = false, isSelling = false,slin,mkin,methWarn = false, cashWarn = false;
    
    var mfn = function () { gm.do_make_click(); };
    var sfn = function () { gm.do_sell_click(); };
    
    var clearDiv = function(divclass) {
        if ($("." + divclass).length > 0)
        {
            $("." + divclass).remove();
        }
    };
    
    var addDiv = function(divclass) {
        if ($("." + divclass).length == 0)
        {
            $("#left_wrap").append('<div class="' + divclass + '"></div>');
        }
    }; 
    
    var sell = function() {
        if (isSelling)
            return false;
        isSelling = true;
        clearDiv('sell_up');
        slin = setInterval(sfn, 1);            
    };
    
    var sellStop = function() { 
        if (!isSelling)
            return false;
        
        clearInterval(slin);
        slin = 0;
        addDiv('sell_up');
        isSelling = false;
    };
    
    var make = function() { 
        if (isMaking)
            return false;
        isMaking = true;
        clearDiv('make_up');
        mkin = setInterval(mfn, 1);
    };
    
    var makeStop = function() {
        if (!isMaking)
            return false;
        
        clearInterval(mkin);
        mkin = 0;
        addDiv('make_up');
        isMaking = false;
    };
    
    var applyButtonStyle = function(div) {            
        if (div !== undefined && div.css !== undefined)
        {
            div.css('-moz-user-select', 'none')
            .css('-webkit-user-select', 'none')
            .css('-ms-user-select', 'none')
            .css('user-select', 'none')
            .css('margin', 'auto')
            .css('padding', '10px')
            .css('width', '220px')
            .css('font-weight', 'bold')
            .css('font-size', '1.1em')
            .css('color', '#fff')
            .css('cursor', 'pointer')
            .css('border-radius', '10px')
            .css('border', '2px solid #ccc')
            .css('top-margin', '10px');
            
        }            
    };
    
    var add_sell_more = function() {
        var smb = $('<div id="sell_more">SELL MORE!</div>');
        
        applyButtonStyle(smb);
        
        smb.css('background-color', '#1c3')
        .css('border-color', '#0a0')
        .css('text-shadow', '-1px -1px 1px #0a0');
        
        
        smb.click(function() {
            if (isSelling)
            {
                sellStop();
                $("#sell_more").text('SELL MORE!');
            }
            else
            {
                sell();
                $("#sell_more").text('SELL LESS!');
            }
        });
        
        $("#sell_div").append(smb);
        
        
    };
    
    var add_make_more = function() {
        var mmb = $('<div id="make_more">MAKE MORE!</div>');
        
        applyButtonStyle(mmb);
        
        mmb.css('background-color', '#39f')
        .css('border-color', '#27e')
        .css('text-shadow', '-1px -1px 1px #27e');
        
        
        mmb.click(function() {
            if (isMaking)
            {
                makeStop();
                $("#make_more").text('MAKE MORE!');
            }
            else
            {
                make();
                $("#make_more").text('MAKE LESS!');
            }
        });
        
        $("#make_div").append(mmb);        
    };
    
    var add_cash_factory = function() {
        var actb = $('<input type="number" id="cash_to_add" placeholder="Type the amount of cash you want to add"></input>');
        
        var acb = $('<div id="add_cash">Add Cash!</div>');
        
        applyButtonStyle(acb);
        
        actb.css('display','block')
        .css('text-align', 'center')
        .css('width', '220px')
        .css('margin', 'auto');
        
        acb.css('background-color', '#ccc')
        .css('border-color', '#333')
        .css('text-shadow', '-1px -1px 1px #333')
        .css('text-align', 'center');
        
        $("#make_sell_wrap").append(actb);   
        $("#make_sell_wrap").append(acb); 
        
        $("#add_cash").click(function() {
            if (cashWarn || confirm('This will unlock the Counterfitter "achievement". Are you sure you want to continue?'))
            {
                cashWarn = true;
                var cashToAdd = parseInt($("#cash_to_add").val());
                
                
                if ((cashToAdd < 0) && ((-1*cashToAdd) > gm.get_debug_data().cash))
                {
                    cashToAdd = -gm.get_debug_data().cash;
				}
                
             	gm.add_cash(cashToAdd);
                
            }        
        });
               
    };
    
    var add_meth_factory = function() {
        var amtb = $('<input type="number" id="meth_to_add" placeholder="Type the amount of meth you want to add"></input>');
        
        var amb = $('<div id="add_meth">Add Meth!</div>');
        
        applyButtonStyle(amb);
        
        amtb.css('display','block')
        .css('text-align', 'center')
        .css('width', '220px')
        .css('margin', 'auto');
        
        amb.css('background-color', '#ccc')
        .css('border-color', '#333')
        .css('text-shadow', '-1px -1px 1px #333')
        .css('text-align', 'center');
        
        
        $("#make_sell_wrap").append(amtb);   
        $("#make_sell_wrap").append(amb); 
        
        $("#add_meth").click(function() {
            if (methWarn || confirm('Warning:  This will unlock the Meth from nowhere "achievement". Are you sure you want to continue?'))
            {
                methWarn = true;
                var methToAdd = parseInt($("#meth_to_add").val());
                
                if ((methToAdd < 0) && ((-1*methToAdd) > gm.get_debug_data().widgets))
                {
                    methToAdd = -gm.get_debug_data().widgets;
				}
                
             	gm.add_widgets(methToAdd);
                
            }        
        });       
    };
    var initialize = function() {
        add_sell_more();
        add_make_more();
        add_cash_factory();
        add_meth_factory();
    }; 
    
    var startupAttempts = 0;
    
    //Try to start up 5 times with 1 second increments... after that, bail and give up.
    this.start = function() {
        startupAttempts++;
        if (gm === undefined && startupAttempts < 5)
        {
            setTimeout(Start, 1000);
        }
        if (gm === undefined)
        {
            //Bail on 5th attempt
            return;
        }
        
        initialize();
    };
}

var cb = new ClickingBadder();
cb.start();
