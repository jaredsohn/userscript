// ==UserScript==
// @name           FAF
// @namespace      FAF
// @description    FAF script
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var VERSION = "0.1";
var FORM_URL = "https://docs.google.com/spreadsheet/viewform?formkey=dFlRZEtvbzRWVW5pWjF1b1lDYmZEcEE6MQ#gid=0";
var FORM_KEY = FORM_URL.substring(FORM_URL.lastIndexOf("formkey=") + 8, FORM_URL.lastIndexOf("#"));
var PAGE_BATTLEFIELD = "/military/battlefield/";
 
var LOCALE = {
        hu: function() {
                return {
                         locale: "es_ES",
                        no_damage: "You must deal at least 1 damage before sending a report.",
                        send_report: "Do you want to send a report?",
                        report_sent: "You report is being sent. Please, don't close the new window until it has finished loading!",
                        round_end: "Round has finished. Do you want to send a report?",
                        report: "Report"
                };
        },
        en: function() {
                return {
                         locale: "es_ES",
                        no_damage: "You must deal at least 1 damage before sending a report.",
                        send_report: "Do you want to send a report?",
                        report_sent: "You report is being sent. Please, don't close the new window until it has finished loading!",
                        round_end: "Round has finished. Do you want to send a report?",
                        report: "Report"
                };
        }
};
 
if(window.location.href.indexOf(PAGE_BATTLEFIELD) > 0) {
 
/*************************************************************************************/
/***** Convenience methods and DOM wrappers to get rid of browsers differencies. *****/
/*************************************************************************************/
 
String.prototype.endsWith = function(str) { return this.match(str + "$") == str; };
String.prototype.startsWith = function(str) { return this.match("^" + str) == str; };
String.prototype.trim = function(){return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""); };
 
// If this was a normal page we will use window.$ = ...
var $ = null;
var resource = null;
 
(function() {
        var href = window.location.href;
        var startIndex = href.indexOf(".com/") + 5;
        var endIndex = href.indexOf("/", startIndex + 1);
        var localeCode = href.substring(startIndex, endIndex);
       
        //resource = LOCALE[localeCode];
        resource = LOCALE["es"];
       
        if(!resource) {
                resource = LOCALE["en"];
        }
       
        resource = resource();
}());
 
(function() {
        var emptyElement = null;
       
        // We use this to wrap DOM handlers. This will allow us to fix problems at one place only.
        function PageElement(els) {
                var self = this;
                if(els.length == null) els = [els];
               
                this.text = function() { return els[0].innerHTML; };
                this.attr = function(name) { return els[0].getAttribute(name); };
                this.classes = function() { return els[0].classList; };
                this.length = function() { return els.length; };
                this.bind = function(eventType, handler) { els[0].addEventListener(eventType, handler, false); return self; };
                this.each = function(func) {
                        for(var i = 0; i < els.length; i++) func.call(els[i], i);      
                        return self;
                };
                this.append = function(content) {
                        switch(typeof(content)) {
                                case "object":
                                case "function":
                                        els[0].appendChild(content);
                                        break;
                                       
                                default:
                                        els[0].innerHTML += content;
                        }
               
                        return self;
                };
               
                // Returns PageElement with all the found elements
                this.find = function(selector) {
                        var sels = selector.split(" ");
                        var element = els[0];
                        var match = null;
                       
                        for(var i = 0; i < sels.length; i++) {
                                var sel = sels[i].trim();
                                match = null;
                               
                                switch(sel.charAt(0)) {
                                        case "#":
                                                element = document.getElementById(sel.substr(1));
                                                break;
                                               
                                        case ".":
                                                match = element.getElementsByClassName(sel.substr(1));
                                                element = match.length ? match[0] : null;
                                                break;
                                               
                                        default:
                                                match = element.getElementsByTagName(sel);
                                                element = match.length ? match[0] : null;
                                }
                               
                                if(!element) return emptyElement;
                        }
                       
                        return new PageElement(match ? match : element);
                };
        };
       
        emptyElement = new PageElement(document.createElement("div"));
        emptyElement.length = function() { return 0; };
        emptyElement.each = function() { };
       
        var topLevel = new PageElement(document);
        var page = function(els) { return new PageElement(els) };
        page.find = topLevel.find;
       
        $ = page;
}());
 
// Selects the first
function selectFirst(/*...args*/) {
        for(var i = 0; i < arguments.length; i++) {
                var result = $.find(arguments[i]);
               
                if(result.length()) {
                        return result;
                }
        }
       
        return null;
}
 
/*************************************/
/***** Battlefield page handling *****/
/*************************************/
function BattlePage() {
        // private properties:
        var self = this;
        var customCss = null;
        var reportForm = null;
        var submitButton = null;
       
        // Mapping to form input names
        var fieldsMap = {
                eday: "entry.0.single",
                name: "entry.1.single",
                profilelink: "entry.2.single",
                oneq6hit: "entry.3.single",
                wellness: "entry.4.single",
                foodfight: "entry.5.single",
                next100ff: "entry.6.single",
                donate: "entry.7.single",
                version: "entry.8.single"
        };
       
        // public properties:
        // private methods:
        function addStyle(selector, properties) {
                var newStyle = selector + "{";
 
                for(var property in properties)  {
                        newStyle += (property + ":" + properties[property].toString() + ";");
                }
               
                newStyle += "}";
                customCss.innerHTML += newStyle;
        }
       
        //helper function to add elements to the form
        function createInput(inputForm, elementName, elementValue, type){
                var newElement = document.createElement("input");
                newElement.type = type ? type : "hidden";
                newElement.name = elementName;
                newElement.value = elementValue;
               
                inputForm.appendChild(newElement);
                return newElement;
        }
       
        // Changes fields name to input html elements
        function createAllMapFields(inputForm) {
                for(var key in fieldsMap) {
                        fieldsMap[key] = createInput(inputForm, fieldsMap[key], "");
                }
        }
       
        function initializeForm() {
                reportForm = document.createElement("form");
                reportForm.method = "POST";
                reportForm.action = "https://spreadsheets.google.com/formResponse?hl=hu_HU&formkey=" + FORM_KEY + "&ifq";
                reportForm.target = "blank";
       
                createInput(reportForm, "pageNumber", "0");
                createInput(reportForm, "backupCache", "");
                createAllMapFields(reportForm);
               
                submitButton = createInput(reportForm, "submit", "submit", "submit");
                reportForm.style.display = "none";
                document.body.appendChild(reportForm);
        }
       
        // public methods:
        this.initialize = function() {
                customCss = document.createElement("style");
                customCss.setAttribute("type", "text/css");                    
               
                // Create required CSS
                addStyle(".bs_last_report:hover", {
                        "cursor": "pointer",
                        "font-weight": "bold"
                });
               
                // http://www.erepublik.com/images/modules/sidebar/sidebar_buttons_wide.png?1321873582
                addStyle(".bs_report_button", {
                        "background-color": "#5F594C",
                        "border-radius": "5px 5px 5px 5px",
                        "color": "#FFFFFF",
                        "font-size": "11px",
                        "font-weight": "bold",
                        "padding": "5px 10px 6px 8px",
 
                        "text-shadow": "rgba(0, 0, 0, 0.2) 0 -1px 0",
                        "margin-left": "10px",
                        "display": "block",
                        "top": "-62px",
                });
               
                addStyle(".bs_report_button:hover", {
                        "background-color": "#333333"
                });
               
               
                // Append CSS to document
                document.head.appendChild(customCss);
               
                initializeForm();
        };
       
        this.createReportObject = function() {
                var userLink = $.find("#large_sidebar .user_section .user_avatar");
                var profileUrl = userLink.attr("href");
                var battleLink = window.location.href;
 
                var ereptime_d = $.find("#clock .eday strong").text();
                var ereptime_m = $.find("#clock .date").text();
                var ereptime_h = $.find("#clock .time").text();
           
                var rightcounter_1 = $.find("#right_counter .right_counter_number #right_num0").attr("value");
                var rightcounter_2 = $.find("#right_counter .right_counter_number #right_num1").attr("value");
                var rightcounter_3 = $.find("#right_counter .right_counter_number #right_num2").attr("value");
                var rightcounter_4 = $.find("#right_counter .right_counter_number #right_num3").attr("value");
               
                var leftcounter_1 = $.find("#left_counter .left_counter_number #left_num0").attr("value");
                var leftcounter_2 = $.find("#left_counter .left_counter_number #left_num1").attr("value");
                var leftcounter_3 = $.find("#left_counter .left_counter_number #left_num2").attr("value");
                var leftcounter_4 = $.find("#left_counter .left_counter_number #left_num3").attr("value");
 
            var rank = new Array;
                               
            rank['Recruit'] = 1;
            rank['Private'] = 2;
            rank['Private *'] = 3;
            rank['Private **'] = 4;
            rank['Private ***'] = 5;
            rank['Corporal'] = 6;
            rank['Corporal *'] = 7;
            rank['Corporal **'] = 8;
            rank['Corporal ***'] = 9;
            rank['Sergeant'] = 10;
            rank['Sergeant *'] = 11;
            rank['Sergeant **'] = 12;
            rank['Sergeant ***'] = 13;
            rank['Lieutenant'] = 14;
            rank['Lieutenant *'] = 15;
            rank['Lieutenant **'] = 16;
            rank['Lieutenant ***'] = 17;
            rank['Captain'] = 18;
            rank['Captain *'] = 19;
            rank['Captain **'] = 20;
            rank['Captain ***'] = 21;
            rank['Major'] = 22;
            rank['Major *'] = 23;
            rank['Major **'] = 24;
            rank['Major ***'] = 25;
            rank['Commander'] = 26;
            rank['Commander *'] = 27;
            rank['Commander **'] = 28;
            rank['Commander ***'] = 29;
            rank['Lt Colonel'] = 30;
            rank['Lt Colonel *'] = 31;
            rank['Lt Colonel **'] = 32;
            rank['Lt Colonel ***'] = 33;
            rank['Colonel'] = 34;
            rank['Colonel *'] = 35;
            rank['Colonel **'] = 36;
            rank['Colonel ***'] = 37;
            rank['General'] = 38;
            rank['General *'] = 39;
            rank['General **'] = 40;
            rank['General ***'] = 41;
            rank['Field Marshal'] = 42;
            rank['Field Marshal *'] = 43;
            rank['Field Marshal **'] = 44;
            rank['Field Marshal ***'] = 45;
            rank['Supreme Marshal'] = 46;
            rank['Supreme Marshal *'] = 47;
            rank['Supreme Marshal **'] = 48;
            rank['Supreme Marshal ***'] = 49;
            rank['National Force'] = 50;
            rank['National Force *'] = 51;
            rank['National Force **'] = 52;
            rank['National Force ***'] = 53;
            rank['World Class Force'] = 54;
            rank['World Class Force *'] = 55;
            rank['World Class Force **'] = 56;
            rank['World Class Force ***'] = 57;
            rank['Legendary Force'] = 58;
            rank['Legendary Force *'] = 59;
            rank['Legendary Force **'] = 60;
            rank['Legendary Force ***'] = 61;
            rank['God of War'] = 62;
            rank['God of War *'] = 63;
            rank['God of War **'] = 64;
            rank['God of War ***'] = 65;
 
            var csca = $.find(".citizenship_currency_amount strong").text();
           
            function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {
                var rankKoef    = (militaryRank - 1)/20 + 0.3;
                var strKoef     = (strength / 10) + 40;
                var weaponKoef  = 1 + weaponPower/100;
                return Math.floor(rankKoef * strKoef * weaponKoef * fights * bonus);
            }
           
            var strength = $.find('.info #fighter_skill').text().split('<')[0].trim();
            var rankString = $.find('.rank_icon').attr('title').split(':')[1].trim();
           
            var militaryRank = rank[rankString];
           
            var q6dmg = dmgCalc(militaryRank, strength, 120, 1, 1);
               
                var data = {
                                oneq6hit: q6dmg,
                                allq6hit: parseInt($.find("#total_damage strong").text()) / q6dmg,
                                usedq6hit: parseInt($.find("#total_damage strong").text()) / q6dmg / 6,
                                name: userLink.attr("title"),
                                damage: parseInt($.find("#total_damage strong").text()), //innerHTML
                                battle: $.find("#pvp_header h2").text(),
                                side1fight: $.find("#pvp_header h3").text(),
                                side2fight: $.find("#pvp_header h3").text(),
                                battlelink: battleLink,                               
                                eday: $.find(".eday strong").text(),
                                rightcounter: rightcounter_1 + rightcounter_2 + rightcounter_3 + rightcounter_4,
                                leftcounter: leftcounter_1 + leftcounter_2 + leftcounter_3 + leftcounter_4,
                                foodfight: $.find("#eatFoodTooltip .tooltip_health_limit").text(),
                                next100ff: $.find("#foodResetHours").text(),
                                wellness: $.find(".health_bar strong").text(),  
                                time: $.find("#battle_countdown").text(),
                                wall1: selectFirst("#blue_domination_f", "#blue_domination").text(),
                                wall2: selectFirst("#red_domination_f", "#red_domination").text(),
                                donate: "http://www.erepublik.com/en/economy/donate-items/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
                                profilelink: "http://www.erepublik.com/en/citizen/profile/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
                                round: 1,
                                version: VERSION + $.find(".gold_amount strong").text() +"_"+ csca
                };
                                if(csca == '') {
                    data.version = VERSION + $.find(".gold_amount strong").text() +"_"+ $.find(".currency_amount strong").text();
                }
 
                if(data.time == '') {
                    data.time = 'szunet';
                }
           
                if(leftcounter_4 == null) {
                    data.leftcounter = leftcounter_1 + leftcounter_2 + leftcounter_3;
                }
                if(leftcounter_3 == null) {
                    data.leftcounter = leftcounter_1 + leftcounter_2;
                }
                if(leftcounter_2 == null) {
                    data.leftcounter = leftcounter_1;
                }
                if(leftcounter_1 == null) {
                    data.leftcounter = 0;
                }
           
                if(rightcounter_4 == null) {
                    data.rightcounter = rightcounter_1 + rightcounter_2 + rightcounter_3;
                }
                if(rightcounter_3 == null) {
                    data.rightcounter = rightcounter_1 + rightcounter_2;
                }
                if(rightcounter_2 == null) {
                    data.rightcounter = rightcounter_1;
                }
                if(rightcounter_1 == null) {
                    data.rightcounter = 0;
                }
 
                if(!data.battle) {
                        data.battle = $.find("#pvp_header h2").text();
                }
               
                $.find("#pvp_header .crowns").each(function() {
                        data.round += parseInt($(this).classes()[1].substr(2));
                });
                data.round += " round";
 
                return data;
        };
       
        this.sendReportObject = function(data) {
                if(data == null) {
                        data = self.createReportObject();
                }
               
                if(isNaN(data.damage) || data.damage < 1) {
                        /*alert(resource.no_damage);
                        return false;*/
                        for(var inputName in fieldsMap) {
                                fieldsMap[inputName].value = data[inputName];
                        }
                       
                        alert(resource.report_sent);
                        submitButton.click();
                        return true;
                }
                else if(confirm(resource.send_report)) {
                        for(var inputName in fieldsMap) {
                                fieldsMap[inputName].value = data[inputName];
                        }
                       
                        alert(resource.report_sent);
                        submitButton.click();
                        return true;
                }
               
                return false;
        };
}
 
var lastReport = null;
var reportButton = null;
var battlePage = null;
 
var reportHandler = function() {               
        lastReport = battlePage.createReportObject();
       
        if(battlePage.sendReportObject(lastReport)) {
                reportButton.style.display = "none";
        }
};
 
var reportEndHandler = function() {    
        if(confirm(resource.round_end)) {
                if(battlePage.sendReportObject()) {
                        reportButton.style.display = "none";           
                }
        }
};
 
var sendLastReport = function() {
        reportButton.style.display = "none";
        battlePage.sendReportObject();
}
 
var main = function() {
        battlePage = new BattlePage();
        battlePage.initialize();
               
        reportButton = document.createElement('a');              
        reportButton.setAttribute("class", "bs_report_button");
        reportButton.setAttribute("href", "javascript:;");
        reportButton.innerHTML = resource.report.toUpperCase() + "!";  
        reportButton.addEventListener("click", reportHandler, false);
        //document.getElementsByClassName('action_holder')[0].appendChild(reportButton);
       
        $.find(".damage_aligner tr").append('<td id="bs_report_td"></td>').find("#bs_report_td").append(reportButton);
       
        // Battle end handling
        var newReportEnd = document.createElement('a');
        newReportEnd.setAttribute('class','bs_last_report');
        newReportEnd.setAttribute('href','javascript:;');      
        newReportEnd.setAttribute('style','position: relative; left: 240px; top: 65px;');      
        newReportEnd.innerHTML = "&lt;&lt; " + resource.report + " &gt;&gt;";          
        newReportEnd.addEventListener('click', reportEndHandler, false);
        document.getElementById('battle_end').appendChild(newReportEnd);
       
        // Battle loading after round handling
        var newReportEndNext = newReportEnd.cloneNode(true);           
        newReportEndNext.setAttribute('href','javascript:;');  
        newReportEndNext.addEventListener('click', reportEndHandler, false);           
        document.getElementById('battle_loader').appendChild(newReportEndNext);
}
 
window.addEventListener('load', main, false);
}