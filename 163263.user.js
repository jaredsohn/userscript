// ==UserScript==
// @name       		OGame:BattleReport info
// @version    		0.1.9a
// @description  	Saves ogame battle report
// @include    		http://*.ogame.*/game/index.php?*page=*
// @namespace  		http://userscripts.org/scripts/show/163263
// @updateURL 		http://userscripts.org/scripts/source/163263.meta.js
// @downloadURL 	https://userscripts.org/scripts/source/163263.user.js
// @copyright  		2012+, mazzay
// ==/UserScript==

(function (window, undefined) {  
    var w =(typeof unsafeWindow != undefined) ? unsafeWindow :  window;
    var $ = jQuery = w.jQuery;
    if (w.self != w.top ) { return; }
    if ( !$ ){ return; }
    
    var document = w.document;
    var localStorage = w.localStorage;
    var url = document.location.href;
    
    var lang = getMetaContent("ogame-language");
    var playername = getMetaContent("ogame-player-name");
    
    var L = {       
        metall : "metal",
        crystal : "crys",
        deuterium : "deut",
        coords : "coords",
        date: "date",
        removeOld : "Remove old",
        today : "Today",
        total : "Total",
        question_sure : "Are you sure?"
    };
    
    switch (lang) {     
        case "ru":
            L.metall = "мет";
            L.crystal = "крис";
            L.deuterium = "дейт";
            L.coords = "координаты";
            L.date = "дата";
            L.removeOld = "Удалить старые";
            L.today = "Сегодня";
            L.total = "Всего"; 
            L.question_sure = "Вы уверены?";
            break;   
    }
    
    var CSS = '';
    CSS += '.OGATabButton {color: #848484;}';
    CSS += '.OGATabButton .aktiv {color: #f1f1f1;}';
    CSS += '.OGATable_br td { padding: 0 !important;}';
    CSS += '.OGATable_br th {background-color: #23282D; color:  #6F9FC8;}';
    CSS += '.OGATable_br tr.cat4 { background-color: #252525; }';
    CSS += '.OGATable_summ td { padding: 0 !important; color:#FFFFFF !important;}';
    CSS += '.OGATable_br td.res, .OGATable_summ td.res { width: 70px; }'; 
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = CSS;
    document.head.appendChild(css);
    
    var localObj;
    localObj = JSON.parse(  localStorage.getItem( prefix()));
    if (localObj == null) {
        localObj = {};
        localObj.BattleReportArray = [];
    }
    
    // == main ==
    w.$(document).ajaxSuccess(ajaxTest);
    
    if (url.indexOf('page=messages') >=0 ) {
        appendMessageTab();
    }
    
    function ajaxTest(event, XMLHttpRequest, ajaxOptions) {
        if (ajaxOptions.url.indexOf("page=showmessage&ajax=1&msg_id") == -1 && ajaxOptions.type != 'POST') return;    
        var cat = parseInt(getParameterByName(ajaxOptions.url, 'cat'));

        switch (cat) {
            case 5: parseBattleReport();
                break;
            case 4: parseRecyclerReport();
                break;
            case 8: parseExpeditionReport();
                break;
        }
        
    }
    
    var report = function(msg_id, type, x, y, z, date, m, c, d)
    {
        this.id = msg_id;
        this.type = type;
        this.coords = x+':'+y+':'+z;
        this.date = date;
        this.m = m;
        this.c = c;
        this.d = d;
    }
    
    function prefix() {
        var tag = "OGA_BR";
        var uni = getMetaContent("ogame-universe");
        var pid = getMetaContent("ogame-player-id");
        return tag + '_' + uni + '_' + pid + '_';
    }
    
    function getParameterByName(url, name)
    {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        if(results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    function getMetaContent(name) { 
        var metas = document.getElementsByTagName('meta'); 
        for (i=0; i<metas.length; i++) { 
            if (metas[i].getAttribute("name") == name) { 
                return metas[i].getAttribute("content"); 
            } 
        } 
        return "";
    } 
    
    function formatNumber(value, format){
        if (format === undefined) format = 'long';
        var parts = /([+-]*)([\d]+)([\.,\d]*)/.exec( (value) ? value.toString() : '' );
        if (parts && parts.length === 4) {
            if (format == 'long') {
                return parts[1] + parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + parts[3];
            } else if (format == 'normal') {
                return value;
            } else if (format == 'short') {
                var v = parseInt(parts[2],10);
                var abk = '';
                if (parts[2].length > 7) {
                    v = Math.ceil(v / 1000000);
                    abk = ' M';
                } else if (parts[2].length > 4) {
                    v = Math.ceil(v / 1000);
                    abk = ' k';
                }
                parts[2] = '' + v;
                return parts[1] + parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + abk;
            }
        }
        return '0';
    };
    
    function toLocaleFormat(date, format) {
        var tmpdate = new Date(date)
        var f = {y : tmpdate.getFullYear(), m : tmpdate.getMonth() + 1,d : tmpdate.getDate(),H : tmpdate.getHours(),M : tmpdate.getMinutes(),S : tmpdate.getSeconds()}
        for(var k in f) 
            format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
        return format;
    };
    
    function parseBattleReport()
    { 
        try{
            var msg = $('div .showmessage');
            if (msg.length > 0) {
                var msg_id = msg.attr( 'data-message-id' );
                
                var from = msg.find('.infohead table td:eq(0) .playerName').html().trim();
                var to = msg.find('.infohead table td:eq(1)').html();
                var subject = msg.find('.infohead table td:eq(2)').html();
                
                var dataTime = msg.find('.infohead table td:eq(3)').html();
                var date = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec(dataTime);
                var coords = /\[([0-9]+):([0-9]+):([0-9]+)\]/.exec(subject);
                
                var bounty = msg.find('td.summary table td:eq(2)').html().trim().replace(/\./g,'');
                var resources = /(\d+).*?(\d+).*?(\d+)/.exec(bounty);
                
                var winner = msg.find('div.winner.win span span.status_abbr_active').html();
               console.log(winner);
                if (winner === playername){
                    var repdate = new Date(date[3], parseInt(date[2])-1, date[1], date[4], date[5], date[6] );
                    var rep = new report(msg_id, 5, coords[1], coords[2], coords[3], repdate, resources[1], resources[2], resources[3]);
                    appendReport(rep);
                }
            }
        } catch(e) { };
    }
    
    function parseRecyclerReport()
    { 
        try{
            var msg = $('div .showmessage');
            if (msg.length > 0) {
                var msg_id = msg.attr( 'data-message-id' );
                
                var from = msg.find('.infohead table td:eq(0) .playerName').html().trim();
                var to = msg.find('.infohead table td:eq(1)').html();
                var subject = msg.find('.infohead table td:eq(2)').html();
                
                var dataTime = msg.find('.infohead table td:eq(3)').html();
                var date = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec(dataTime);
                var coords = /\[([0-9]+):([0-9]+):([0-9]+)\]/.exec(subject);
                
                var bounty = msg.find('div.note figure.planetIcon.tf').first().parent().contents().filter(function() { return this.nodeType == 3; }).text().trim().replace(/\./g,'');
                
                if (bounty) {
                    var digits = bounty.match(/\d+/g);
                    var repdate = new Date(date[3], parseInt(date[2])-1, date[1], date[4], date[5], date[6] );
                    var rep = new report(msg_id, 4, coords[1], coords[2], coords[3], repdate, digits[4], digits[5], 0);
                    
                    appendReport(rep);
                }
            }
        } catch(e) { };
    }
    
    function parseExpeditionReport()
    { 
        try{
            var msg = $('div .showmessage');
            if (msg.length > 0) {
                var msg_id = msg.attr( 'data-message-id' );
                
                var from = msg.find('.infohead table td:eq(0) .playerName').html().trim();
                var to = msg.find('.infohead table td:eq(1)').html();
                var subject = msg.find('.infohead table td:eq(2)').html();
                
                var dataTime = msg.find('.infohead table td:eq(3)').html();
                var date = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec(dataTime);
                var coords = /\[([0-9]+):([0-9]+):([0-9]+)\]/.exec(subject);
                
                var bounty = msg.find('div.note').html().trim().replace(/\./g,'');
                //  console.log(bounty)
                /*  var resources = bounty.match(/\d+/g);
                var res_length = resources.length;
                
                var repdate = new Date(date[3], parseInt(date[2])-1, date[1], date[4], date[5], date[6] );
                var rep = new report(msg_id, 8, coords[1], coords[2], coords[3], repdate, resources[res_length-2], resources[res_length-1], 0);
                appendReport(rep);*/
                /*
                * Ваша экспедиция нашла маленькое скопление астероидов, из которого можно добыть некоторые ресурсы<br>Было найдено 192000 Дейтерий<br><br>Бортовой журнал, дополнение связиста: Это такое возвышающее чувство - быть первопроходцем в неисследованном секторе вселенной            <br>
                * */
            }
        } catch(e) { };
    }
    
    
    function appendReport(report)
    {
        var length = localObj.BattleReportArray.length,
            element = null,
            isNew = true;
        
        for (var i = 0; i < length; i++) {
            element = localObj.BattleReportArray[i];
            if (report.id == element.id) isNew = false;
        }
        
        if (isNew == true) {
            localObj.BattleReportArray.push(report);
            localStorage.setItem(prefix(), JSON.stringify(localObj));
        } 
    }
    
    function removeReport(report)
    {
        var position = $.inArray( report, localObj.BattleReportArray );
        
        if ( ~position )
        {
            localObj.BattleReportArray.splice(position, 1);
            localStorage.setItem(prefix(), JSON.stringify(localObj));
        }
    }
    
    function removeOldReports()
    {
        if (confirm(L.question_sure)) {
            
            var DataArray =  localObj.BattleReportArray;
            var toDelete = [];
            var now = new Date(); 
            var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            for (var j = 0, length = DataArray.length; j < length; j++){ 
                var report = DataArray[j];
                if ((todayAtMidn - Date.parse(report.date)) >= 0 ) {
                    toDelete.push(report)
                }
            }
            
            for (var j = 0, length = toDelete.length; j < length; j++){
                removeReport(toDelete[j]);
            }
            showContent();
        } 
    }
    
    function appendMessageTab()
    {
        var	Element = document.createElement('li'); 
        Element.className = 'msgNavi OGATabButton';
        var ElementInner =  "BReports";
        Element.innerHTML = ElementInner;
        Element.addEventListener('click', function(e) { return function() {tabActivate(e); }}(Element));
        
        var tabbar = document.getElementById('tab-msg');
        tabbar.appendChild(Element);
        
    }
    
    function tabActivate(e)
    {  
        var tabbar = document.getElementById('tab-msg');
        var li = tabbar.getElementsByTagName('li');
        for (var i = 0, length = li.length; i < length; i++) {
            li[i].className = 'msgNavi'; 
        }
        
        e.className = 'msgNavi aktiv OGATabButton';
        
        showContent();
    }
    
    function showContent()
    {
        var content = document.getElementById('messageContent');
        content.innerHTML='';
        createTable(content);
    }
    
    function createTable(parent)
    {
        function compare(a,b) {
            if ( new Date(a.date) < new Date(b.date)) {
                return 1; }
            if (new Date(a.date) > new Date(b.date)) {
                return -1; }
            return 0;
        }
        
        var DataArray =  localObj.BattleReportArray;
        var total_m = 0, total_c = 0, total_d = 0 ;
        var today_m = 0, today_c = 0, today_d = 0 ;
        var table = document.createElement('table');
        table.className = 'OGATable_br';
        
        //header
        var rowheader = document.createElement('tr');
        var outhtml='';
        outhtml+="<th>a</th>";
        outhtml+="<th>id</th>";
        outhtml+="<th>"+L.coords+"</th>";
        outhtml+="<th>"+L.date+"</th>";
        outhtml+="<th>"+L.metall+"</th>";
        outhtml+="<th>"+L.crystal+"</th>";
        outhtml+="<th>"+L.deuterium+"</th>";
        rowheader.innerHTML = outhtml;
        table.appendChild(rowheader);
        
        var rows = [];
        var now = new Date(); 
        var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        for (var j = 0, length = DataArray.length; j < length; j++) {
            
            var report = DataArray[j];
            total_m+=parseInt(report.m);
            total_c+=parseInt(report.c);
            total_d+=parseInt(report.d);
            
            if ((todayAtMidn - Date.parse(report.date)) < 0 ) {
                today_m+=parseInt(report.m);
                today_c+=parseInt(report.c);
                today_d+=parseInt(report.d);
            }
            
            var row = document.createElement('tr');
            row.className="cat"+report.type;
            
            var outhtml='';
            outhtml+="<td class='trashbtn'></td>";
            outhtml+="<td>"+report.id+"</td>";
            outhtml+="<td>"+report.coords+"</td>";
            outhtml+="<td>"+toLocaleFormat(report.date, "%d.%m.%y  %H:%M:%S")+"</td>";
            
            outhtml+="<td class='res'>"+formatNumber(report.m, 'long')+"</td>";
            outhtml+="<td class='res'>"+formatNumber(report.c, 'long')+"</td>";
            outhtml+="<td class='res'>"+formatNumber(report.d, 'long')+"</td>";
            row.innerHTML=outhtml;
            
            var delBtn = document.createElement('a');
            delBtn.setAttribute('href',"javascript:void(0)");
            delBtn.className = "icon icon_trash ";
            delBtn.onclick = function(e, mreport) { 
                return function() { 
                    removeReport(mreport);
                    showContent();
                }
            }(delBtn, report); 
            
            var tb = row.getElementsByClassName('trashbtn')[0];
            tb.appendChild(delBtn);  
            
            var rowItem = new Object();
            rowItem.date = report.date;
            rowItem.element = row;
            rows.push(rowItem);
        }
        
        var headtable = document.createElement('table');
        headtable.className = 'OGATable_summ';
        
        var outhtml=''
        outhtml+="<tr>";
        outhtml+="<td>"+"<span id=clrbtn></span>"+"</td>";
        outhtml+="<td style='text-align:right;'>"+L.today+": &nbsp;"+"</td>";
        outhtml+="<td class='res'>"+formatNumber(today_m, 'short')+"</td>";
        outhtml+="<td class='res'>"+formatNumber(today_c, 'short')+"</td>";
        outhtml+="<td class='res'>"+formatNumber(today_d, 'short')+"</td>";
        outhtml+="<tr></tr>";
        outhtml+="<td>"+"<span></span>"+"</td>";
        outhtml+="<td style='text-align:right;'>"+L.total+": &nbsp;"+"</td>";
        outhtml+="<td class='res'>"+formatNumber(total_m, 'short')+"</td>";
        outhtml+="<td class='res'>"+formatNumber(total_c, 'short')+"</td>";
        outhtml+="<td class='res'>"+formatNumber(total_d, 'short')+"</td>";
        outhtml+="</tr>";  
        headtable.innerHTML = outhtml;
        
        var clearbtn = document.createElement('a');
        clearbtn.setAttribute("href","javascript:void(0)");
        clearbtn.innerHTML = "<span>"+L.removeOld+"</span>";
        clearbtn.addEventListener('click', function(e) { return function() {removeOldReports(); }}());
        $(headtable).find("span#clrbtn").replaceWith($(clearbtn));
        
        parent.appendChild(headtable);
        
        rows.sort(compare);
        rows.forEach(function(e) { table.appendChild( e.element ); });
        
        parent.appendChild(table);
    }
    
    
})(window);