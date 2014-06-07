// ==UserScript==
// @name        Mousehunt Helper - XHRIntercept
// @namespace   DSXC
// @description XHR Intercept for MHH
// @include     http://www.mousehuntgame.com/*
// @include     https://www.mousehuntgame.com/*
// @include     http://apps.facebook.com/mousehunt/*
// @include     https://apps.facebook.com/mousehunt/*
// @version     1.0
// ==/UserScript==
//===============================================================================

var _is_xhri_setup = false;
var _trap_update_user_array = new Array();
var _timeout_called = false;
var _timeout_hidden_called = false;
var _last_user;

setupCommunications();

function setupCommunications()
{
    document.addEventListener("xhri_trap_change", xhri_trap_change, false);
    document.addEventListener("xhri_hidden_item", xhri_hidden_item, false);
    _is_xhri_setup = true;
}

function xhri_trap_change(aEvent)
{
    if (typeof user == 'undefined')
    {
        timeout = setTimeout(function(){xhri_trap_change(aEvent)}, 2000);
        return;
    }

    _trap_update_user_array.push(user);
    
    if (_timeout_called)
        return;

    _timeout_called = true;
    timeout = setTimeout(function(){call_trap_check()}, 2000);
}

function xhri_hidden_item(aEvent)
{
    if (typeof hg == 'undefined' || 
        $(".inventoryitemview[data-view-id="+$($("#tabbarContent_page_4 .inventoryitemview")[0]).data("viewId")+"]").length <= 0)
    {
        timeout = setTimeout(function(){xhri_hidden_item(aEvent)}, 2000);
        return;
    }

    if (_timeout_hidden_called)
        return;

    _timeout_hidden_called = true;
    timeout = setTimeout(function(){call_modify_hidden_items()}, 2000);
}

function call_trap_check()
{
    var _trap_update_user = JSON.stringify(_trap_update_user_array.pop());

    //Don't send another update if the last user pushed is the same as the user we're currently on.
    if (_trap_update_user == _last_user)
    {
        _trap_update_user_array.length = 0;
        _timeout_called = false;
        return;
    }

    var evt = document.createEvent("MutationEvents");
    evt.initMutationEvent("ht_trap_change", true, true, this, _trap_update_user, _trap_update_user, 'ht_stuff', 1);

    document.dispatchEvent(evt);

    _last_user = _trap_update_user;
    _trap_update_user_array.length = 0;
    _timeout_called = false;
}

function call_modify_hidden_items()
{
    var inv = hg.utils.UserInventory.getAllItems();
    for (var category in inv) if (inv.hasOwnProperty(category) && category != "length")
    {
        for (var item in inv[category]) if (inv[category].hasOwnProperty(item) && item != "length")
        {
            hg.utils.UserInventory.getAllItems()[category][item].is_hidden = false;
        }
    }

    //Empty the existing items:
    $(".inventoryitemview[data-view-id="+$($("#tabbarContent_page_4 .inventoryitemview")[0]).data("viewId")+"]").empty();

    //Render all the items again:
    app.views.InventoryItemView[$($("#tabbarContent_page_4 .inventoryitemview")[0]).data("viewId")].render();
}

function getQueryParams(qs) 
{
    var urlParams = {},
        e,
        d = function (s) { return decodeURIComponent(s).replace(/\+/g, " "); },
        r = /([^&=]+)=?([^&]*)/g;

    while (e = r.exec(d(qs))) {
        if (e[1].indexOf("[") == "-1")
            urlParams[d(e[1])] = d(e[2]);
        else {
            var b1 = e[1].indexOf("["),
                aN = e[1].slice(b1+1, e[1].indexOf("]", b1)),
                pN = d(e[1].slice(0, b1));
          
            if (typeof urlParams[pN] != "object")
                urlParams[d(pN)] = {},
                urlParams[d(pN)].length = 0;
            
            if (aN)
                urlParams[d(pN)][d(aN)] = d(e[2]);
            else
                Array.prototype.push.call(urlParams[d(pN)], d(e[2]));
        }
    }

    return urlParams;
}

(function(open) 
{
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) 
    {
        if (typeof url == 'string')
        {
            if (url.search('mousehuntgame') != -1)
            {
                if (!_is_xhri_setup)
                    setupCommunications();
								/*
                window.unsafeWindow || (
                    unsafeWindow = (function() 
                    {
                        var el = document.createElement('p');
                        el.setAttribute('onclick', 'return window;');
                        return el.onclick();
                    })()
                );*/

                var mh_user = window.user; //unsafeWindow.user;
                
                if (mh_user != null)
                {
                    this.mhUserJSON = mh_user;

                    //TODO: Make a call to grab the user variable from HG with the least amount of data. Use this as a direct before snapshot of event firing.
                    //      In conjunction with the earlier variable grab we can determine 3 points of user values for hunt tracking.

                    this.calledURL = url;
                    this.addEventListener("readystatechange", function() 
                    {
                        if (this.readyState == 4)
                        {
                            if (this.responseText.substring(0, 1) == "{")
                            {
                                //TODO: Make this all generic, have one event thrown, and one submit. 
                                //      Specific instructions can be made in the response packet so message information can be gathered from there.

                                var respJSON = JSON.parse(this.responseText);
                                respJSON.ht_submit_URL = this.calledURL;
                                respJSON.ht_submit_params = this.submit_params;

                                //Hunt submission
                                if (this.calledURL.search('activeturn.php') != -1)
                                {
                                    var evt = document.createEvent("MutationEvents");

                                    evt.initMutationEvent("ht_submit", true, true, this, JSON.stringify(this.mhUserJSON), JSON.stringify(respJSON), 'ht_stuff', 1);
                                    document.dispatchEvent(evt);
                                }

                                //NOTE: Currently disabled.
                                //Crafting attempts.
                                else if (this.calledURL.search('crafting.php') != -1)
                                {
                                    /*
                                    var crafts = $('#selectedComponents div.craftThumb:has(input)');
                                    var t_array = Array();
                                    for (var i in respJSON.ht_submit_params.parts)
                                    {
                                        for (var j = 0; j < crafts.length; j++)
                                        {
                                            if (crafts[j].classList.contains(i))
                                            {
                                                var t_obj = new Object();
                                                t_obj.name = $('span', crafts[j]).html();
                                                t_obj.val = respJSON.ht_submit_params.parts[i];
                                                t_array.push(t_obj);
                                                break;
                                            }
                                        }
                                    }

                                    respJSON.ht_submit_params.parts.translated = t_array;

                                    var evt = document.createEvent("MutationEvents");

                                    evt.initMutationEvent("ht_crafting", true, true, this, JSON.stringify(this.mhUserJSON), JSON.stringify(respJSON), 'ht_stuff', 1);
                                    document.dispatchEvent(evt);
                                    */
                                }

                                //TEM effectiveness selection
                                else if (this.calledURL.search('getmiceeffectiveness.php') != -1)
                                {
                                    var evt = document.createEvent("MutationEvents");

                                    evt.initMutationEvent("ht_effectiveness", true, true, this, JSON.stringify(this.mhUserJSON), JSON.stringify(respJSON), 'ht_stuff', 1);
                                    document.dispatchEvent(evt);
                                }

                                //Adversaries page tab click
                                else if (this.calledURL.search('getmousegroup.php') != -1 ||
                                         this.calledURL.search('getregionmice.php') != -1)
                                {
                                    var evt = document.createEvent("MutationEvents");

                                    evt.initMutationEvent("ht_group_effectiveness", true, true, this, JSON.stringify(this.mhUserJSON), JSON.stringify(respJSON), 'ht_stuff', 1);
                                    document.dispatchEvent(evt);
                                }
                                
                                //Convertible
                                else if (this.calledURL.search('useconvertible.php') != -1)
                                {
                                    var evt = document.createEvent("MutationEvents");
                                    evt.initMutationEvent("ht_convertible", true, true, this, JSON.stringify(this.mhUserJSON), JSON.stringify(respJSON), 'ht_stuff', 1);

                                    document.dispatchEvent(evt);
                                }

                                //Inventory
                                else if (this.calledURL.search('userInventory.php') != -1)
                                {
                                    var evt = document.createEvent("MutationEvents");
                                    evt.initMutationEvent("ht_inventory", true, true, this, JSON.stringify(this.mhUserJSON), JSON.stringify(respJSON), 'ht_stuff', 1);

                                    document.dispatchEvent(evt);
                                }                        
                            }
                        }
                    }, 
                    false);
                }
            }
        }

        //Call regardless. Use async if not defined to avoid hanging browser due to extension needing waiting on response.
        if (is_set(async))
            open.call(this, method, url, async, user, pass);
        else
            open.call(this, method, url, true, user, pass);
    };

})(XMLHttpRequest.prototype.open);


(function(send) {
    XMLHttpRequest.prototype.send = function(params)
    {
        this.submit_params = getQueryParams(params);
        send.call(this, params);
    }
})(XMLHttpRequest.prototype.send);


function is_set(variable)
{
    if (typeof variable === "undefined")
        return false;
    else
        return true;
}
