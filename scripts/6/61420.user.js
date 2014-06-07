// ==UserScript==
// @name            Simple Helper
// @description     nothing to say...
// @include         http://apps.facebook.com/inthemafia/*
// @include         http://apps.new.facebook.com/inthemafia/*
// @include         http://mwfb.zynga.com/mwfb/*
// @version         0.6.1
// @contributor     Asshol1
// ==/UserScript==

window._BB_SGInst = {};
window._BB_CacheInst = {    
    get: function(key){
        var ret = GM_getValue(key, null);
        if(undefined == ret || ret == null) {
            return null;
        }
        return JSON.parse(ret);
    },
    remove: function(key){
        GM_setValue(key, null);
    },
    put: function(key, value){
        GM_setValue(key, JSON.stringify(value));
    }
};

_BB_SGInst.INTERVAL = 5000;
_BB_SGInst.PENDING_KEY = "_gfPendingKey";

window.setInterval(_BB_prepare, 2000);
//window.setInterval(_BB_prepareHitList, 500);

function _BB_prepare() {
    if(document.getElementById("table_loot") != null && 
            document.getElementById("gift_key") != null &&
            document.getElementById("_BB_itemCheckCont") == null) {
        _BB_renderSimpleGifter();
    }
}

function _BB_prepareHitList() {
    var hitListArr = document.querySelectorAll('table[class=hit_list]');
    if(hitListArr.length == 0 || hitListArr[0].getAttribute("_BB_HL_M") == 'true') {
        return false;
    } 
    hitListArr[0].setAttribute("_BB_HL_M", 'true');
    
    window._BB_hl = new Object();
    var v = window._BB_hl;
    v.usrMap = new Object();
    
    var listRow = document.querySelectorAll('.hit_list tbody tr');
    v.usrIdSeq = new Array();
    
    for(var r=0; r<listRow.length; r++) {
        var tdArr = listRow[r].getElementsByTagName("td");
        if(tdArr.length == 5) {
            var targetTd = tdArr[0];
            var anchorArr = targetTd.getElementsByTagName("a");
            if(anchorArr.length == 1) {
                var str = anchorArr[0].href;
                var idx = str.lastIndexOf("user=");
                var usrId = str.substring(idx + 5);
                
                v.usrMap[usrId] = {
                    el: anchorArr[0],
                    id: usrId,
                    name: anchorArr[0].innerHTML,
                    href: anchorArr[0].href
                };
                
                var cachedUser = window._BB_CacheInst.get(usrId);
                if(cachedUser != null) {
                    if(_BB_HL_isCachedUserValid(cachedUser) == true) {
                        _BB_HL_showUserInfo(v.usrMap[usrId], null, true);
                    } else {
                        window._BB_CacheInst.remove(usrId);
                        v.usrIdSeq.push(usrId);
                    }
                } else {
                    v.usrIdSeq.push(usrId);
                }
            } 
        }
    }
    v.cIdx = 0;
    if(v.usrIdSeq.length > 0) {
        _BB_HL_fetchUserInfo();
    }
}

function _BB_HL_fetchUserInfo() {
    var v = window._BB_hl;
    var targetUsrId = v.usrIdSeq[v.cIdx];
    var targetUsr = v.usrMap[targetUsrId];
    
    GM_xmlhttpRequest({
        method: "GET",
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        url: targetUsr.href,
        onload: function(response) {
            _BB_HL_showUserInfo(targetUsr, response.responseText, false);
        },
        onerror: function(response) {
            _BB_HL_showUserInfo(targetUsr, null, false);
        }
    }); 
}

function _BB_HL_isCachedUserValid(cachedUser) {
    var ret = false;
    if(cachedUser != null) {
        var now = new Date();
        var diff = new Date();
        diff.setTime(Math.abs(now.getTime() - cachedUser.createdAt));
        
        var timediff = diff.getTime();
        var days = Math.floor(timediff / (1000 * 60 * 60 * 24)); 

        if(days < 7) {
            ret = true;
        }
    }
    return ret;
}

function _BB_HL_showUserInfo(targetUsr, retStr, useCache) {
    var v = window._BB_hl;
    
    var lv = "Err";
    var fw = "Err";
    var fl = "Err";
    
    if(useCache == true) {
        var cUsr = window._BB_CacheInst.get(targetUsr.id);
        lv = cUsr.level;
        fw = cUsr.fw;
        fl = cUsr.fl;
    } else {
        if(retStr != null) {
            var idx = retStr.indexOf('id="app10979261223_inner_page">');
            var eIdx = retStr.indexOf('War Assists', idx);
            var str = retStr.substring(idx, eIdx);
            
            _BB_HL_parseLevel(targetUsr, str);
            _BB_HL_parseStats(targetUsr, str);
            
            lv = targetUsr.level;
            fw = targetUsr.fw;
            fl = targetUsr.fl;
            
            window._BB_CacheInst.put(targetUsr.id, {
                    id: targetUsr.id,
                    name: targetUsr.name,
                    level: targetUsr.level,
                    fw: targetUsr.fw,
                    fl: targetUsr.fl,
                    createdAt: new Date().getTime()
            });
        }
    }
        
    targetUsr.el.innerHTML = 
        targetUsr.name + "[lv:" + lv + 
        ", fw:" + fw +
        ", fl:" + fl + "]";
    
    v.cIdx++;
    if(v.cIdx < v.usrIdSeq.length) {
        window.setTimeout(_BB_HL_fetchUserInfo, 50);
    }
}

function _BB_HL_parseLevel(targetUsr, str) {
    var lvStr = ', level ';
    var lvStIdx = str.indexOf(lvStr) + lvStr.length;    
    var lvEdIdx = str.indexOf(" ", lvStIdx);
    var lv = str.substring(lvStIdx, (lvEdIdx+1));
    targetUsr.level = parseInt(lv, 10);  
}

function _BB_HL_parseStats(targetUsr, str) {
    var FW_STR = "<td>Fights Won</td>";
    var FL_STR = "<td>Fights Lost</td>";
    var STAT_PREFIX = '<td style="text-align: right;">';
    var STAT_SUFFIX = '</td>';

    var fwStIdx = str.indexOf(FW_STR);
    fwStIdx = str.indexOf(STAT_PREFIX, fwStIdx) + STAT_PREFIX.length;
    var fwEdIdx = str.indexOf(STAT_SUFFIX, fwStIdx);
    targetUsr.fw = str.substring(fwStIdx, fwEdIdx);
    
    var flStIdx = str.indexOf(FL_STR);
    flStIdx = str.indexOf(STAT_PREFIX, flStIdx) + STAT_PREFIX.length;
    var flEdIdx = str.indexOf(STAT_SUFFIX, flStIdx);
    targetUsr.fl = str.substring(flStIdx, flEdIdx);
}


function _BB_parseItem(itemDivArr, type, itemMap) {
    var DIV_CNT = 3;
    if(type == 2) {
        // boost has 4 divs
        DIV_CNT = 4;
    }
    
    for(var i=0; i<itemDivArr.length; i++) {        
        var itemId = itemDivArr[i].id.substring(itemDivArr[i].id.lastIndexOf("_") + 1);
        var itemUk = type + "_" + itemId;
        var divs = itemDivArr[i].getElementsByTagName("div");  
        
        if(divs != null && divs.length == DIV_CNT) {            
            var qtyIdx = divs[DIV_CNT-1].innerHTML.indexOf("x") + 1;
            var itmQty = parseInt(divs[DIV_CNT-1].innerHTML.substring(qtyIdx), 10);           
            itemMap[itemUk] = {
                id: itemId,
                type: type,
                qty: itmQty,
                name: divs[0].innerHTML
            };
        }
    }
}

function _BB_renderSimpleGifter() {
    var USR_DIV_PREFIX = "recipient_";
    var ITM_DIV_PREFIX = "item_box_";
    var usrIdArr = new Array();
    var usrNameArr = new Array();    
    var itemMap = new Object();
    var giftKey = document.getElementById("gift_key").value;      
    _BB_SGInst.usrIdArr = usrIdArr;
    _BB_SGInst.usrNameArr = usrNameArr;    
    _BB_SGInst.itemMap = itemMap;
    _BB_SGInst.giftKey = giftKey;
    
    var usrDivArr = document.querySelectorAll('div[id^="' + USR_DIV_PREFIX + '"]');        
    for(var i=0; i<usrDivArr.length; i++) {
        usrIdArr[i] = usrDivArr[i].id.substring(USR_DIV_PREFIX.length);
        usrNameArr[i] = 
            usrDivArr[i].innerHTML.substring(
                    usrDivArr[i].innerHTML.lastIndexOf(">") + 1);        
    }
    var lootItemDivArr = document.querySelectorAll('#table_loot div[id^="' + ITM_DIV_PREFIX + '"]');
    var collItemDivArr = document.querySelectorAll('#table_collection div[id^="' + ITM_DIV_PREFIX + '"]');
    var boostDivArr = document.querySelectorAll('#table_expendables div[id^="' + ITM_DIV_PREFIX + '"]');
    _BB_parseItem(lootItemDivArr, 1, itemMap);
    _BB_parseItem(collItemDivArr, 0, itemMap);
    _BB_parseItem(boostDivArr, 2, itemMap);
    
    var msgContArr = document.querySelectorAll('#inner_page div[class=title]');        
    var msgCont = msgContArr[0];
    msgCont.style.display = "";
    var msg = "<div id='_BB_itemCheckCont' style='font-size:8pt;'>";  
    msg += "<div id='_BB_cancelBtnCont' style='display:none;'>" + 
            "<input type='button' id='_BB_cancelBtn' value='Cancel'/></div>";
    
    var it = 0;
    for(var key in itemMap) {
        var itmObj = itemMap[key];
        msg += "<input type='checkbox' name='_BB_itemCheck' itemCat='" + itmObj.type + "' value='" + key + "' />";          
        msg += itmObj.name + "[" + itmObj.qty + "] &nbsp;&nbsp;";
        if(it%5==0 && it!=0) {  msg += "<br/>";  }
        it ++;
    }
    msg += "</div>------------------------------------------------------";
    msg += "<div id='_BB_userCheckCont' style='font-size:8pt;'>";
    for(var i=0; i<usrIdArr.length; i++) {  
        msg += "<input type='checkbox' name='_BB_userCheck' value='" + usrIdArr[i] + "' />";    
        msg += usrNameArr[i] + "&nbsp;&nbsp;";
        if(i%5==0 && i!=0) {  msg += "<br/>";  }
    }
    msg += "</div>";
    msg += "<div id='_BB_infoCont' style='font-size:8pt;'></div>";
    msg += "<div><input type='checkbox' id='_BB_checkAllLootItem'  name='_BB_checkAllLootItem' />All Loot Items. &nbsp;&nbsp;" ;
    msg += "<input type='checkbox' id='_BB_checkAllCollItem' name='_BB_checkAllCollItem' />All Collection Items." ;
    msg += "</div>";
    msg += "<div><input type='button' id='_BB_triggerBtn' name='_BB_triggerBtn' value='Send' />";
    msg += "&nbsp; <input type='text' id='_BB_GiftQty' value='1' size='3' /> Qty</div>";
    //msg += "<div><iframe id='_BB_iframe' name='_BB_iframe' src='about:blank' style='display:none;'></iframe></div>";
    msgCont.innerHTML = msg;
    document.getElementById('_BB_triggerBtn').addEventListener('click', function(){
        _BB_SendGiftFunc();
    }, false);
    document.getElementById('_BB_checkAllLootItem').addEventListener('click', function(){
        _BB_checkAllItemByType(1);
    }, false);
    document.getElementById('_BB_checkAllCollItem').addEventListener('click', function(){
        _BB_checkAllItemByType(0);
    }, false);
    document.getElementById('_BB_cancelBtn').addEventListener('click', function(){
        _BB_cancelPending();
    }, false);
    
    var info = window._BB_CacheInst.get(_BB_SGInst.PENDING_KEY);
    if(info != null) {
        var itemUK = info.sltItmIdArr[info.idx];
        var itemObj = _BB_SGInst.itemMap[itemUK];        
        
        var doNext = false;
        if(undefined == itemObj || itemObj == null) {
            if((info.idx +1) < info.sltItmIdArr.length) {
                doNext = true;
            }
        } else {            
            if(itemObj.itmQty <= info.sltUsrIdArr.length || info.qtyCount > info.maxGiftQty) {
                if((info.idx +1) < info.sltItmIdArr.length) {
                    doNext = true;
                }
            }
        }
        if(doNext == true) {
            itemUK = info.sltItmIdArr[info.idx+1];
            itemObj = _BB_SGInst.itemMap[itemUK];
            
            window._BB_CacheInst.put(_BB_SGInst.PENDING_KEY, {
                sltItmIdArr: info.sltItmIdArr,
                sltUsrIdArr: info.sltUsrIdArr,
                idx: info.idx+1,
                qtyCount: 0,
                maxIdx: info.maxIdx,
                maxGiftQty: info.maxGiftQty
            });
        }
        
        if(undefined != itemObj && itemObj != null) {
            var msg = _BB_getSendingStatusMsg(itemObj, info);
            var mCont = document.getElementById("_BB_infoCont");
            mCont.innerHTML = msg;
            
            //document.getElementById("_BB_cancelBtnCont").style.display = "";        
            setTimeout(_BB_GiftingActionFunc, _BB_SGInst.INTERVAL);
        }  {
            window._BB_CacheInst.remove(_BB_SGInst.PENDING_KEY);
            //document.getElementById("_BB_cancelBtnCont").style.display = "none"; 
        }      
    }
}

function _BB_checkAllItemByType(type) {
    var arr = document.getElementsByName("_BB_itemCheck");
    for(var i=0; i<arr.length; i++) {
        if(arr[i].getAttribute("itemCat") == type) {
            arr[i].checked = !arr[i].checked;
        }
    }
}

function _BB_cancelPending() {
    window._BB_CacheInst.remove(_BB_SGInst.PENDING_KEY);
    window.location = "http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=gift";
}

function _BB_SendGiftFunc() {
    var sltItmIptArr = document.querySelectorAll(
            "input[type=checkbox][name='_BB_itemCheck']:checked");
    var sltUsrIptArr = document.querySelectorAll(
            "input[type=checkbox][name='_BB_userCheck']:checked");
    
    var sltItmIdArr = new Array();
    var sltUsrIdArr = new Array();
    for(var i=0; i<sltItmIptArr.length; i++) {
        sltItmIdArr[i] = sltItmIptArr[i].value;
    }
    for(var i=0; i<sltUsrIptArr.length; i++) {
        sltUsrIdArr[i] = sltUsrIptArr[i].value;
    }    
    var idx = 0;
    var qtyCount = 0;               
    var maxIdx = sltItmIptArr.length-1;
    var maxGiftQty = document.getElementById('_BB_GiftQty').value;
    
    window._BB_CacheInst.put(_BB_SGInst.PENDING_KEY, {
        sltItmIdArr: sltItmIdArr,
        sltUsrIdArr: sltUsrIdArr,
        idx: idx,
        qtyCount: qtyCount,
        maxIdx: maxIdx,
        maxGiftQty:  parseInt(maxGiftQty, 10)
    });      
        
    if(idx <= maxIdx && sltUsrIptArr.length > 0) {
        _BB_GiftingActionFunc();       
    }
};


function _BB_getSendingStatusMsg(itemObj, info) {
    var msg = "Items:&nbsp;" + (info.idx + 1) + " /&nbsp; " + (info.maxIdx + 1) + "<br/>";
    msg += "Name:" + itemObj.name; + "&nbsp;&nbsp;";
    msg += "Qty:" + itemObj.qty + "<br/>";
    return msg;
}

function _BB_GiftingActionFunc() {
    try {
        var info = window._BB_CacheInst.get(_BB_SGInst.PENDING_KEY); 
        
        var mCont = document.getElementById("_BB_infoCont");
        var itemUK = info.sltItmIdArr[info.idx];
        var itemObj = _BB_SGInst.itemMap[itemUK];
        
        var itemId = itemObj.id;
        var itmQty = itemObj.qty;
        var itmCatId = itemObj.type;
        var doSend = false;    
        var maxGiftQty = info.maxGiftQty;
        var isSwitchItem = false;
        
        if(itmQty >= info.sltUsrIdArr.length && info.qtyCount < maxGiftQty) {
            doSend = true;
        }   
        var msg = _BB_getSendingStatusMsg(itemObj, info);
        /*
        if(doSend == true) {
            var baseUrl = "http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=gift";
            //var baseUrl = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=gift";
            for(var i=0; i<info.sltUsrIdArr.length; i++) {
                baseUrl += "&recipients[" + i + "]=" + info.sltUsrIdArr[i];
            }
            baseUrl += "&gift_category=" + itmCatId + "&gift_id=" + itemId;
            baseUrl += "&gift_key=" + info.giftKey;
            baseUrl += "&xw_action=send";
            baseUrl += "&ajax=1";
            baseUrl += "skip_req_frame=1";    
            msg += "URL:" + baseUrl;
        } */
        mCont.innerHTML = msg;
        
        unsafeWindow.gift_tab_click(itmCatId);
        
        if(doSend == true) {            
            info.qtyCount += 1;
            itmQty = itmQty - info.sltUsrIdArr.length;
            itemObj.qty = itmQty;        
            
            for(var i=0; i<info.sltUsrIdArr.length; i++) {
                document.getElementById("cb_recip_" + info.sltUsrIdArr[i]).checked = true;
                unsafeWindow.recip_check(info.sltUsrIdArr[i]);
            }
            unsafeWindow.item_click(itmCatId, itemId);           
            
            /*
            if(info.popupwin) {
                info.popupwin.location = baseUrl;
            } else {
                info.popupwin = window.open(baseUrl);
            }  */
            
            //unsafeWindow.frames["_BB_iframe"].location.href = baseUrl;     
            
            // ajax manner
            /*
            GM_xmlhttpRequest({
                method: "GET",
                headers:{'Content-type':'application/x-www-form-urlencoded'},
                url: baseUrl,
                onload: function(response) {
                    //alert(response.responseText);
                },
                onerror: function(response) {}
            }); */
        } else {
            info.qtyCount = 0;
            info.idx = parseInt(info.idx, 10) + 1;
            isSwitchItem = true;
        }
        window._BB_CacheInst.put(_BB_SGInst.PENDING_KEY, {
            sltItmIdArr: info.sltItmIdArr,
            sltUsrIdArr: info.sltUsrIdArr,
            idx: info.idx,
            qtyCount: info.qtyCount,
            maxIdx: info.maxIdx,
            maxGiftQty: maxGiftQty
        });
        
        if(info.idx <= info.maxIdx) {
            if(isSwitchItem == true) {
                window.setTimeout(_BB_GiftingActionFunc, _BB_SGInst.INTERVAL);
            }
        } else {
            /*
            if(info.popupwin) {
                try {
                    info.popupwin.close();
                    delete info.popupwin;
                } catch(e) {}
            } */        
            window._BB_CacheInst.remove(_BB_SGInst.PENDING_KEY);
            mCont.innerHTML = "DONE!!!";
            document.getElementById("_BB_cancelBtnCont").style.display = "none";
        }
        
        if(doSend == true) {
            unsafeWindow.postFeedAndSend();
        }
    } catch (e) {
        window._BB_CacheInst.remove(_BB_SGInst.PENDING_KEY);
        //alert("oops!!!\n" + e);        
    }
};


