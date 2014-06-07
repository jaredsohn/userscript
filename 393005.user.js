// ==UserScript==
// @name        KajaPiacSzkript
// @namespace   http://userscripts.org/users/useridnumber
// @include     http://www.erepublik.com/*
// @version     1.5
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_xmlhttpRequest
// @grant    GM_openInTab
// ==/UserScript==
var $;
var SUC_script_num = 393005;
var jsSrc = 'http://yourjavascript.com/40441072236/showhide.js';
var marketList = new Array('http://www.erepublik.com/en/economy/market/13/1/1/citizen/0/price_asc/1', 'http://www.erepublik.com/en/economy/market/13/1/2/citizen/0/price_asc/1', 'http://www.erepublik.com/en/economy/market/13/1/3/citizen/0/price_asc/1', 'http://www.erepublik.com/en/economy/market/13/1/4/citizen/0/price_asc/1', 'http://www.erepublik.com/en/economy/market/13/1/5/citizen/0/price_asc/1', 'http://www.erepublik.com/en/economy/market/13/1/6/citizen/0/price_asc/1', 'http://www.erepublik.com/en/economy/market/13/1/7/citizen/0/price_asc/1');
var priceList = new Array('gm_q1price', 'gm_q2price', 'gm_q3price', 'gm_q4price', 'gm_q5price', 'gm_q6price', 'gm_q7price');
var updateList = new Array('gm_q1update', 'gm_q2update', 'gm_q3update', 'gm_q4update', 'gm_q5update', 'gm_q6update', 'gm_q7update');
var rowId = new Array('q1row', 'q2row', 'q3row', 'q4row', 'q5row', 'q6row', 'q7row');

function initializeTable() {
    if ($('#orderContainer') != null) {
        $('#orderContainer') .after('<div><div style="font-weight: bold;" onclick="showhide()">Muti <span id="pluszminusz">[+]:</span></div><div style="font-weight: bold;display:none" onclick="updatePriceVar()" id="updatehide">Frissíts!</div><div style="font-weight: bold;display:none" onclick="gotoRanking()" id="ranking">Ranking...</div><table style="width:330px;border:solid;display:none" id="tablahide"><tr><td style="border:solid">Kenyér</td><td style="border:solid">Ár</td><td style="border:solid">Árarány</td></tr><tr id="q1row"><td style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/1/citizen/0/price_asc/1"><img src="http://s2.www.erepublik.net/images/icons/industry/1/q1.png" alt="Q1" height="22" width="22"></a></td><td id="q1price" style="border:solid">' + GM_getValue(priceList[0]) + '</td><td  style="border:solid">' + GM_getValue(priceList[0]) * 5 + '</td></tr><tr id="q2row"><td  style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/2/citizen/0/price_asc/1"><img src="http://www.erepublik.net/images/icons/industry/1/q2_90x90.png" alt="Q2" height="22" width="22"></a></td><td id="q2price"  style="border:solid">' + GM_getValue(priceList[1]) + '</td><td  style="border:solid">' + (GM_getValue(priceList[1]) / 2) * 5 + '</td></tr><tr id="q3row"><td  style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/3/citizen/0/price_asc/1"><img src="http://www.erepublik.net/images/icons/industry/1/q3_90x90.png" alt="Q3" height="22" width="22"></a></td><td id="q3price"  style="border:solid">' + GM_getValue(priceList[2]) + '</td><td  style="border:solid">' + (GM_getValue(priceList[2]) / 3) * 5 + '</td></tr><tr id="q4row"><td  style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/4/citizen/0/price_asc/1"><img src="http://www.erepublik.net/images/icons/industry/1/q4_90x90.png" alt="Q4" height="22" width="22"></a></td><td id="q4price" style="border:solid">' + GM_getValue(priceList[3]) + '</td><td style="border:solid">' + (GM_getValue(priceList[3]) / 4) * 5 + '</td></tr><tr id="q5row"><td  style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/5/citizen/0/price_asc/1"><img src="http://www.erepublik.net/images/icons/industry/1/q5_90x90.png" alt="Q5" height="22" width="22"></a></td><td id="q5price"  style="border:solid">' + GM_getValue(priceList[4]) + '</td><td  style="border:solid">' + GM_getValue(priceList[4]) + '</td></tr><tr id="q6row"><td  style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/6/citizen/0/price_asc/1"><img src="http://www.erepublik.net/images/icons/industry/1/q6_90x90.png" alt="Q6" height="22" width="22"></a></td><td id="q6price"  style="border:solid">' + GM_getValue(priceList[5]) + '</td><td  style="border:solid">' + (GM_getValue(priceList[5]) / 6) * 5 + '</td></tr><tr id="q7row"><td  style="border:solid"><a href="http://www.erepublik.com/en/economy/market/13/1/7/citizen/0/price_asc/1"><img src="http://www.erepublik.net/images/icons/industry/1/q7_90x90.png" alt="Q7" height="22" width="22"></a></td><td id="q7price" style="border:solid">' + GM_getValue(priceList[6]) + '</td><td style="border:solid">' + GM_getValue(priceList[6]) / 2 + '</td></tr></table></div>');
        setColor();
    }
};

//updates the price of food.
function updatePrices() {
    for (var i = 0; i < marketList.length; i++) {
        if (marketList[i] == window.location)
        {
            var allElements = document.getElementsByTagName('a');
            var bFound = false;
            for (var j = 0; j < allElements.length; j++)
            {
                if (allElements[j].className == 'f_light_blue_big buyOffer') {
                    if (bFound == false)
                    {
                        GM_setValue(priceList[i], allElements[j].getAttribute('data-price'));
                        GM_setValue(updateList[i], new Date() .getTime());
                        bFound = true;
                    }
                }
            }
        }
    }
}

function waitJQuery(){
    if (typeof (unsafeWindow.jQuery) != 'function') {
        setTimeout(function () {
            waitJQuery();
        }, 200);
    } 
    else 
    {
        $ = unsafeWindow.jQuery;
        initializeTable();
        addJs();
    }
}

function addJs()
{
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script');
    GM_JQ.src = jsSrc;
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;
    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}

function setColor()
{
    for (var i = 0; i < rowId.length; i++) {
        var currColor = 'cyan';
        if ((new Date() .getTime() - GM_getValue(updateList[i])) < 600000)
        {
            currColor = 'lightgreen';
        } 
        else
        {
            currColor = 'red';
        }
        if (document.getElementById(rowId[i]) != null)
        {
            document.getElementById(rowId[i]) .setAttribute('bgcolor', currColor);
        }
    }
}

function updateCheck(forced)
{
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
        try
        {
            GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp)
                    {
                        var local_version, remote_version, rt, script_name;
                        
                        rt=resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime()+'');
                        remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                        local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
                        if(local_version!=-1)
                        {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version)
                            {
                                if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
                                {
                                    GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            }
                        }
                        else
                            GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
        }
        catch (err)
        {
            if (true)
                alert('An error occurred while checking for updates:\n'+err);
        }
    }
}

waitJQuery();
updatePrices();
updateCheck(false);

