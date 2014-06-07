// ==UserScript==
// @name        Wes AH
// @namespace   http://playneverwinter.com
// @description Wes AH
// @include     *.playneverwinter.com/#char*/auctionhouse
// @include     *.playneverwinter.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     0.1
// @grant       GM_getValue
// ==/UserScript==
var DEBUG_ENABLED = false;

AddMenu();

Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function GetNumberOfResults() {
    var numSelector = $("div[id='gatewayTableAuctionBrowse_info']");
    
    if (numSelector.length ) {
    
        var nodeText = numSelector.text();
        var myRegexp = /\d+ of (\d+)/;
        var num = myRegexp.exec(nodeText);
        
        debugLog("Found items", num[1]);

        if (num[1] > 0)
        {
            ProcessAuctionResults(num[1]);
        }
    }
    else
    {   
        UpdateMinPrice("Error");
        alert("Failed to find Auction Results, you must search first!" );
    }
}


function ProcessAuctionResults(size) {
    debugLog("ProcessAuctionResults", "");
  
    var selector = $("table[id='gatewayTableAuctionBrowse']"); 
    var average = 0;
    var prices = new Array();
    var onclickText;
    var min;
    var j = 0;
    
    var targetNodes = selector.find("td[class='desktopOnly single-row-cell ']");
    
    while(size > j)
    {
        debugLog("while", j);
        if (targetNodes.length == 0)
        {
            targetNodes = selector.find("td[class='desktopOnly single-row-cell']");
        }
        
        for (var i = 0; i < targetNodes.length; i++, j++) {        
            target = targetNodes.eq(i).children('div').first();
            onclickText = target.attr('onclick');       
            onclickText = onclickText.match(/(\d+),(\d+),(\d+)/);
    
        	if (onclickText.length != 0) {
        	     if (parseInt(onclickText[2]) != 0 )
        	     {
        	       prices.push(parseInt(onclickText[2]));
        	     }
        	}
    	} 
    	document.getElementById('gatewayTableAuctionBrowse_next').click();
    	targetNodes = selector.find("td[class='desktopOnly single-row-cell ']");

	}
	
	average = ComputerAverage(prices);
	prices.sort(function(a,b){return a-b});
	min = Math.min.apply(Math, prices);
	UpdateMinPrice(min);

	min2 = Math.max.apply(Math, prices);
	UpdateMin2Price(min2);
	
	var profit = ComputeProfit(prices);
	UpdateProfit(profit.val);
	UpdateProfitPercent(profit.percent);
	
}

function AddMenu()
{
    debugLog("AddMenu", "");
    var headerDiv = document.createElement("div");
    headerDiv.setAttribute ('id', 'NWO-header');
    headerDiv.style.cssText = 'position:fixed; padding:0.5em; top:5em; right:0;'
      + ' border:1px solid #d83; color:#FFEFBF;'
      + ' font-family: "Sava"; font-size: 21px;font-weight: normal;line-height: 24px;text-align: center;'
      + ' z-index: 1000;';
    var newParagraph = document.createElement('p');
    newParagraph.textContent = "Auctioneer";
    
    headerDiv.appendChild(newParagraph); //add the text node to the newly created div.
    
    var buttonsDiv = document.createElement("div");
    buttonsDiv.innerHTML = '<div class="input-field button epic">'
    + '<div class="input-bg-left"></div>'
    + '<div class="input-bg-mid"></div>'
    + '<div class="input-bg-right"></div>'
    + '<button id="NWO-Process" type="button">Process Results</button></div>';
    
    headerDiv.appendChild(buttonsDiv); 
    
    var outputDiv = document.createElement("div");
    outputDiv.innerHTML = '<p>Minimum Price: <output name="minPrice" type="number">---</output></p>'
        + '<p>2nd Price: <output name="min2Price" type="number">---</output></p>'
        + '<p>Profit if Resold: <output name="profit" type="number">---</output></p>'
        + '<p>Profit Percentage: <output name="profitPercent" type="number">---</output></p>';
    
    headerDiv.appendChild(outputDiv); 
    
    var professionsDiv = document.createElement("div");
    professionsDiv.innerHTML = '<div class="input-field button epic">'
    + '<div class="input-bg-left"></div>'
    + '<div class="input-bg-mid"></div>'
    + '<div class="input-bg-right"></div>'
    + '<button id="NWO-Leadership" type="button">Start Crafting</button></div>';
    
    headerDiv.appendChild(professionsDiv); 
    
    document.getElementsByTagName('body')[0].appendChild(headerDiv); 
    document.getElementById("NWO-Process").addEventListener('click', GetNumberOfResults, true);
    document.getElementById("NWO-Leadership").addEventListener('click', StartCrafting, true);

}

function debugLog(msg, val)
{
    if(true == DEBUG_ENABLED)
    {
        unsafeWindow.console.info(msg + ": " + val + " \n");
    }
}

function UpdateMinPrice(val)
{
    document.getElementsByName('minPrice')[0].innerHTML = val; 
}
function UpdateMin2Price(val)
{
    document.getElementsByName('min2Price')[0].innerHTML = val; 
}

function UpdateProfit(val)
{
    document.getElementsByName('profit')[0].innerHTML = val; 
}

function UpdateProfitPercent(val)
{
    document.getElementsByName('profitPercent')[0].innerHTML = val; 
}

function ComputeProfit(arr)
{
    var profit = 0;
    var profitPercent = 0;
    
    for(var i = 1; i < arr.length; i++)
    {
        if(arr[i] != arr[0])
        {
            profit = (arr[i]*.9)-arr[0];
            profit = Math.round(profit*100)/100;
            profitPercent = profit/arr[0]*100;
            profitPercent = Math.round(profitPercent*100)/100;
            break;
        }
    }
    
     return {
        'val': profit,
        'percent': profitPercent
    };  
}


function ComputerAverage(arr)
{
    var retVal = 0;
    for(var i = 0; i < arr.length; i++)
    {
        retVal += arr[i];
    }
    
    return (retVal/arr.length);
}

var autoTimer;

function StartCrafting()
{
    
   var startCraftingButton = $('#NWO-Leadership');
   if ( startCraftingButton.length && !startCraftingButton.hasClass('Selected'))
   {
        debugLog("StartCrafting", "");
        startCraftingButton.html('Stop Crafting');
        startCraftingButton.addClass("Selected");
        _private.on = true;
        AutoCraft();
        return;
       
   }
   else
   {
        debugLog("StopCrafting", "");
        startCraftingButton.html('Start Crafting');
        startCraftingButton.removeClass("Selected");
        $(function(){_private.clear_timers();});
        clearTimeout(autoTimer);
        _private.busy = false;
        _private.on = false;
        return;
   }
}

function AutoCraft()
{
    $(function(){_private.clear_timers();});
    _private.busy = false;
    _private.on = false;
    
    if(!_private.busy)
    {
        HardClick($('.header-links span a').eq(0));
        setTimeout(function() {
            var characters = $('.charselect a');
            HardClick(characters.eq(((Math.random() * 10000)|0) % characters.length));
            setTimeout(function() {
                HardClick($('.nav-button.mainNav.professions.nav-professions'));
                $(function(){_private.check_status();});
            }, 3000);

        }, 3000);
        
    }

    autoTimer = setTimeout(AutoCraft, (120000 + (Math.random() * 120000)));
}

function HardClick(jNode) 
{
    $(jNode).each ( function () {
    if (DEBUG_ENABLED)
    {
        $(this).css ('background', 'red');
    }

    var clickEvent  = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('click', true, true);
    this.dispatchEvent (clickEvent);
    });
}

//following is from JavaScript Lazy Professions
//by Digitalxero 
"use strict";


var _private = {};

_private.timers = {
    filler:null,
    status:null
};

_private.on = true;
_private.use_optional_assets = false;

_private.busy = false;

_private.locale = {
    hire:'Hire',
    _continue: 'Continue',
    start:'Start Task'
};

_private.professions = {

    to_do: ['leadership'],
    tasks: {            
        leadership: ['Feed the Needy', 'Protect Caravan', 'Explore Local Area'],
        leatherworking: ['Tough Leather Trading', 'Gather Tough Pelts', 'Tough Pelt Trading', 'Simple Leather Trading', 'Simple Pelt Trading', 'Gather Simple Pelts'],
        tailoring: ['Wool Cloth Trading', 'Cotton Scrap Trading', 'Gather Cotton Scraps', 'Wool Scraps Trading', 'Gather Wool Scraps'],
        mailsmithing: ['Steel Rings and Scales Trading', 'Gather High quality Iron Ore', 'High Quality Iron Ore Trading', 'Gather Iron Ore'],
        platesmithing: ['Steel Plate Trading', 'Gather High quality Iron Ore', 'High Quality Iron Ore Trading', 'Iron Plate Trading', 'Iron Ore Trading', 'Gather Iron Ore']
    }
};
//task_search_strings: [':contains("Explore Local Area")', ':contains("Guard Duty")'],
_private.selectors = {

    overview: '.professions-overview:visible',
    leadership: '.professions-Leadership:visible',
    leatherworking: '.professions-Leatherworking:visible',
    tailoring: '.professions-Tailoring:visible',
    mailsmithing: '.professions-Mailsmithing:visible',
    platesmithing: '.professions-Platesmithing:visible',
    doable_jobs: '.task-list-entry:not(.unmet):contains(' + _private.locale._continue + ')',
    job_title:'h4 span',
    reward_btn: '#modal .input-field button:visible'
};
 

_private.clear_timers = function() {
    clearTimeout(_private.timers.status);
    clearTimeout(_private.timers.filler);
};

_private.restart_timers = function() {
    if(_private.busy) {
        return;
    }

    _private.timers.status = setTimeout(_private.check_status, (75000 + (Math.random() * 75000)));
    _private.timers.filler = setTimeout(_private.time_fillter, (20000 + (Math.random() * 5000)));
};

_private.check_status = function(waiting) {
    debugLog("_private.check_status", "");
    _private.clear_timers();

    if(_private.busy) return;

    if(!waiting) {
        //$(_private.selectors.overview).trigger('click');
        HardClick($(_private.selectors.overview));
        debugLog("Overview Page", "");
    }

    var slots = $('.task-slot-locked, .task-slot-progress, .task-slot-finished, .task-slot-open');
    if(!slots.length) {
        setTimeout(function(){
            _private.check_status(true);
        }, 3000);
        debugLog("Did not find any slots", "");
        return;
    }

    slots.filter(':not(.task-slot-progress):not(.task-slot-locked)').each(function(idx, slot) {
        slot = $(slot);
        debugLog("Slot Available", "");
        var time_left = slot.find('.bar-text').text();
        var button_msg = slot.find('.input-field button').text();
        debugLog(time_left, button_msg);
        //Collection logic
        if(slot.hasClass('task-slot-finished')) {
            _private.reward.start_collection(slot);
            return;
        }
        if(slot.hasClass('task-slot-open')) {
            _private.jobs.new_job(0);
            return;
        }
    });
    if (_private.on)
    {
        debugLog("Craftign Timer Restarted", "");
        _private.restart_timers();
    }
    else
    {
        debugLog("Craftign Timer Stopped", "");
    }
};

_private.reward = {
    start_collection: function(slot) {
        _private.clear_timers();

        if(_private.busy && _private.busy !== 'reward') {
            return;
        }

        _private.busy = 'reward';
        var button = slot.find('.input-field button');
        button.trigger('click');
        //HardClick(button);
        setTimeout(function(){
            _private.reward.collect();
        }, (1000 + (Math.random() * 1500)));
    },
    collect: function() {
        //$(_private.selectors.reward_btn).trigger('click');
        HardClick($(_private.selectors.reward_btn));
        debugLog("collect", "");
        _private.busy = false;

        setTimeout(function(){_private.check_status();}, (2000 + (Math.random() * 1000)));
    }
};

_private.jobs = {
        new_job: function(page) {
            _private.clear_timers();

            if(_private.busy && _private.busy !== 'job') {
                return;
            }

            _private.busy = 'job';

            if(page > _private.professions.to_do.length) {
                setTimeout(function() {
                    _private.busy = false;
                    _private.check_status();
                }, (3000 + (Math.random() * 2000)));
                return;
            }
            var to_do = _private.professions.to_do[page];
            //$(_private.selectors[to_do]).trigger('click');
            HardClick($(_private.selectors[to_do]));
            debugLog("new_job ", _private.selectors[to_do]);
            setTimeout(function() {
                _private.jobs.find_doable_job(to_do, page);
            }, (15000 + (Math.random() * 7000)));
        },
        find_doable_job: function(to_do, task_page) {
            var jobs = $(_private.selectors.doable_jobs);
            var next_page = $('#tasklist_next:not(.paginate_disabled_next)');
            var job_list = _private.professions.tasks[to_do];
            debugLog("TODO: ", to_do);
            if(!jobs.length && next_page.length) {
                //next_page.trigger('click');
                HardClick(next_page);
                jobs = $(_private.selectors.doable_jobs);
            } else if(!jobs.length && !next_page.length) {
                setTimeout(function() {
                    _private.jobs.new_job(to_do, (task_page + 1));
                }, (2000 + (Math.random() * 1000)));
                return;
            }

            jobs = jobs.filter(function(idx){
                var job = $(this);
                if(job.find('.task-requirements .red').length) {
                    return false;
                }
                for(var i=0; i<job_list.length; i++) {
                    var title = job_list[i];
                    var jt = job.find(':contains(' + title + ')');
                    if(jt.length) {
                        return true;
                    }
                }
                return false;
            });
            if(!jobs.length && !next_page.length) {
                setTimeout(function() {
                    _private.jobs.new_job((task_page + 1));
                }, (2000 + (Math.random() * 1000)));
                return;
            }
            if(!jobs.length) {
                //next_page.trigger('click');
                HardClick(next_page);
                setTimeout(function() {
                    _private.jobs.find_doable_job(to_do, task_page);
                }, (500 + (Math.random() * 500)));
                return;
            }

            jobs.eq(((Math.random() * 10000)|0) % jobs.length).find('.input-field button').trigger('click');
            setTimeout(function() {
                _private.jobs.assign_person();
            }, (2000 + (Math.random() * 1000)));
        },
    assign_person: function(num) {
        if(!num) num = 0;

 
        var assets = $('.taskdetails-assets .input-field button');
        var followup = _private.jobs.start;
        if(_private.use_optional_assets && num != (assets.length-1)) {
            followup = _private.jobs.assign_person;
        }

        //assets.eq(num).trigger('click');
        HardClick(assets.eq(num));
        _private.jobs.assign_asset(followup, num);
    },
    assign_asset: function(followup, num) {
        setTimeout(function(){
            //$('.modal-item-list .icon-block').eq(0).trigger('click');
            HardClick($('.modal-item-list .icon-block').eq(0));
            setTimeout(function() {
                followup(num+1);
            }, (1000 + (Math.random() * 1000)));
        },  (1500 + (Math.random() * 1000)));
    },
    start: function() {
        //$('.footer-body.with-sidebar .input-field button:contains(' + _private.locale.start + ')').trigger('click');
        HardClick($('.footer-body.with-sidebar .input-field button:contains(' + _private.locale.start + ')'));
        _private.busy = false;

        setTimeout(function(){_private.check_status();}, (2000 + (Math.random() * 1000)));
    }
};
_private.time_fillter = function() {
    if(_private.busy) return;
 
    var random_profession = _private.professions.to_do[((Math.random() * 10000)|0) % _private.professions.to_do.length]
        //$(_private.selectors[random_profession]).trigger('click');
        HardClick($(_private.selectors[random_profession]));
        
        _private.timers.filler = setTimeout(function(){
        _private.time_fillter();
    }, (20000 + (Math.random() * 5000)));
};




