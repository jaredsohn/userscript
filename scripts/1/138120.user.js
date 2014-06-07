// ==UserScript==
// @name         DeltaCreditNotOnlyIE
// @description  Add support for other browsers than IE
// @id           me.4ndrew.DeltaCreditNotOnlyIE
// @version      1.1
// @author       nopox
// @include      https://webby.deltacredit.ru/webby/*
// @match        https://webby.deltacredit.ru/webby/*
// ==/UserScript==

// DatePicker from http://www.openjs.com/scripts/ui/calendar/

var calendar = {
    month_names: ["January","February","March","April","May","June","July","Augest","September","October","November","December"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    // month_days: [31,28,31,30,31,30,31,31,30,31,30,31],
    //Get today's date - year, month, day and date
    today : new Date(),
    opt : {},
    data: [],

    //Functions
    /// Used to create HTML in a optimized way.
    wrt:function(txt) {
        this.data.push(txt);
    },
    
    getMaxDaysFor: function(year, month) {
        switch (month) {
            case 1:
                return (((year%100 != 0) && (year%4 == 0)) || (year%400 == 0)) ? 29 : 28;
            case 3:
            case 5:
            case 8:
            case 10:
                return 30;
        }
        return 31;
    },
    
    /* Inspired by http://www.quirksmode.org/dom/getstyles.html */
    getStyle: function(ele, property){
        if (ele.currentStyle) {
            var alt_property_name = property.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});//background-color becomes backgroundColor
            var value = ele.currentStyle[property]||ele.currentStylne[alt_property_name];
        
        } else if (window.getComputedStyle) {
            property = property.replace(/([A-Z])/g,"-$1").toLowerCase();//backgroundColor becomes background-color

            var value = document.defaultView.getComputedStyle(ele,null).getPropertyValue(property);
        }
        
        //Some properties are special cases
        if(property == "opacity" && ele.filter) value = (parseFloat( ele.filter.match(/opacity\=([^)]*)/)[1] ) / 100);
        else if(property == "width" && isNaN(value)) value = ele.clientWidth || ele.offsetWidth;
        else if(property == "height" && isNaN(value)) value = ele.clientHeight || ele.offsetHeight;
        return value;
    },
    getPosition: function(el) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    },
    /// Called when the user clicks on a date in the calendar.
    selectDate: function(year, month, day) {
        var ths = _calendar_active_instance;
        // var inputEl = document.getElementById(ths.opt["input"]);
        var inputEl = ths.opt['inputEl'];
        this.selectDateForInput(inputEl, year, month, day);
        ths.hideCalendar();
    },
    
    selectDateForInput: function(inputEl, year, month, day) {
        if ((day+"").length < 2) day = '0' + day;
        if ((month+"").length < 2) month = '0' + month;
        inputEl.value = day + "." + month + "." + year; // Date format is :HARDCODE:
    },
    
    /// Creates a calendar with the date given in the argument as the selected date.
    makeCalendar:function(year, month, day) {
        year = parseInt(year);
        month= parseInt(month);
        day     = parseInt(day);
        
        //Display the table
        var next_month = month+1;
        var next_month_year = year;
        if(next_month>=12) {
            next_month = 0;
            next_month_year++;
        }
        
        var previous_month = month-1;
        var previous_month_year = year;
        if(previous_month< 0) {
            previous_month = 11;
            previous_month_year--;
        }
        
        
        /*
        var tableNode = document.createElement('table');
        var trNode = document.createElement('tr');
        
        var thNode = document.createElement('th');
        var linkNode = document.createElement('a');
        linkNode.setAttribute('href', '#');
        linkNode.value = '&lt;';
        linkNode.setAttribute('title', this.month_names[previous_month] + ' ' + previous_month_year);
        
        var cc = this;
        linkNode.onclick = function() {
            cc.makeCalendar(cc.month_names[previous_month], previous_month_year);
        };
        thNode.appendChild(linkNode);
        trNode.appendChild(thNode);
        
        thNode = document.createElement('th');
        thNode.setAttribute('colspan', 5);
        thNode.setAttribute('class', 'calendar-title');
        
        var monthSelect = document.createElement('select');
        monthSelect.name = 'calendar-month';
        monthSelect.setAttribute('class', 'calendar-month');
        monthSelect.onchange = function() {
            cc.makeCalendar(year, this.value);
        };
        for(var i in this.month_names) {
            var monthItem = document.createElement('option');
            monthItem.text = this.month_names[i];
            monthItem.value = i;
            monthSelect.add(monthItem);
        }
        monthSelect.selectedIdex = month - 1;
        thNode.appendChild(monthSelect);
        trNode.appendChild(thNode);
        
        linkNode = document.createElement('a');
        linkNode.setAttribute('href', '#');
        linkNode.value = this.month_names[previous_month] + ' ' + previous_month_year;
        */
        
        
        this.wrt("<table>");
        this.wrt("<tr><th><a href='javascript:calendar.makeCalendar("+(previous_month_year)+","+(previous_month)+");' title='"+this.month_names[previous_month]+" "+(previous_month_year)+"'>&lt;</a></th>");
        this.wrt("<th colspan='5' class='calendar-title'><select name='calendar-month' class='calendar-month' onChange='calendar.makeCalendar("+year+",this.value);'>");
        for(var i in this.month_names) {
            this.wrt("<option value='"+i+"'");
            if(i == month) this.wrt(" selected='selected'");
            this.wrt(">"+this.month_names[i]+"</option>");
        }
        this.wrt("</select>");
        this.wrt("<select name='calendar-year' class='calendar-year' onChange='calendar.makeCalendar(this.value, "+month+");'>");
        var current_year = this.today.getYear();
        if(current_year < 1900) current_year += 1900;
        
        for(var i=current_year-70; i<current_year+10; i++) {
            this.wrt("<option value='"+i+"'")
            if(i == year) this.wrt(" selected='selected'");
            this.wrt(">"+i+"</option>");
        }
        this.wrt("</select></th>");
        this.wrt("<th><a href='javascript:calendar.makeCalendar("+(next_month_year)+","+(next_month)+");' title='"+this.month_names[next_month]+" "+(next_month_year)+"'>&gt;</a></th></tr>");
        this.wrt("<tr class='header'>");
        for(var weekday=0; weekday<7; weekday++) this.wrt("<td>"+this.weekdays[weekday]+"</td>");
        this.wrt("</tr>");
        
        //Get the first day of this month
        var first_day = new Date(year,month,1);
        var start_day = first_day.getDay();
        
        var d = 1;
        var flag = 0;
        
        //Leap year support
        // if(year % 4 == 0) this.month_days[1] = 29;
        // else this.month_days[1] = 28;
        
        // var days_in_this_month = this.month_days[month];
        var days_in_this_month = this.getMaxDaysFor(month, year);

        //Create the calender
        for(var i=0;i<=5;i++) {
            if(w >= days_in_this_month) break;
            this.wrt("<tr>");
            for(var j=0;j<7;j++) {
                if(d > days_in_this_month) flag=0; //If the days has overshooted the number of days in this month, stop writing
                else if(j >= start_day && !flag) flag=1;//If the first day of this month has come, start the date writing

                if(flag) {
                    var w = d, mon = month+1;
                    if(w < 10)    w    = "0" + w;
                    if(mon < 10)mon = "0" + mon;

                    //Is it today?
                    var class_name = '';
                    var yea = this.today.getYear();
                    if(yea < 1900) yea += 1900;

                    if(yea == year && this.today.getMonth() == month && this.today.getDate() == d) class_name = " today";
                    if(day == d) class_name += " selected";
                    
                    class_name += " " + this.weekdays[j].toLowerCase();

                    // HACK extra dutty hack
                    // this.wrt("<td class='days"+class_name+"'><a name='selectDateLink' href='javascript:calendar.selectDate(\""+year+"\",\""+mon+"\",\""+w+"\")'>"+w+"</a></td>");
                    this.wrt("<td class='days"+class_name+"'><a name='selectDateLink' href='#' hint='"+year+","+mon+","+w+"'>"+w+"</a></td>");
                    d++;
                } else {
                    this.wrt("<td class='days'>&nbsp;</td>");
                }
            }
            this.wrt("</tr>");
        }
        this.wrt("</table>");
        this.wrt("<input name='cancelButton' type='button' value='Cancel' class='calendar-cancel' onclick='calendar.hideCalendar();' />");

        var cc = this;
        var calendarEl = document.getElementById(this.opt['calendar']);
        calendarEl.innerHTML = this.data.join("");
        
        var cancelButton = document.getElementsByName('cancelButton');
        cancelButton[0].onclick = function() {
            cc.hideCalendar(cc);
        };
        
        // HACK extra dutty hack
        var allLinks = document.getElementsByName('selectDateLink');
        for (var i = 0; i < allLinks.length; i++) {
            allLinks[i].onclick = function() {
                var values = this.getAttribute('hint').split(',');
                cc.selectDate(values[0], values[1], values[2]);
            };
        }
        this.data = [];
    },
    
    /// Display the calendar - if a date exists in the input box, that will be selected in the calendar.
    showCalendar: function(input) {
        // var input = el ? el : document.getElementById(this.opt['input']);
        this.opt['inputEl'] = input;
        //Position the div in the correct location...
        var div = document.getElementById(this.opt['calendar']);
        var xy = this.getPosition(input);
        // var width = parseInt(this.getStyle(input,'width'));
        var width = input.offsetWidth;
        div.style.left = (xy.left + 10)+"px";
        div.style.top = xy.top + input.clientHeight + "px";

        // Show the calendar with the date in the input as the selected date
        var existing_date = new Date();
        var date_in_input = input.value;
        if(date_in_input) {
            var selected_date = false;
            // :HARDCODE: DATE FORMAT
            var date_parts = date_in_input.split(".");
            if(date_parts.length == 3) {
                date_parts[1]--; //Month starts with 0
                selected_date = new Date(date_parts[2], date_parts[1], date_parts[0]);
            }
            if(selected_date && !isNaN(selected_date.getYear())) { //Valid date.
                existing_date = selected_date;
            }
        }
        
        var the_year = existing_date.getYear();
        if(the_year < 1900) the_year += 1900;
        this.makeCalendar(the_year, existing_date.getMonth(), existing_date.getDate());
        div.style.display = "block";
        _calendar_active_instance = this;
    },
    
    hideThisCalendar: function() {
        this.hideCalendar(this);
    },
    
    /// Hides the currently show calendar.
    hideCalendar: function(instance) {
        var active_calendar_id = "";
        if(instance) active_calendar_id = instance.opt['calendar'];
        else active_calendar_id = _calendar_active_instance.opt['calendar'];
        
        if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
        _calendar_active_instance = {};
    },
    
    /// Setup a text input box to be a calendar box.
    set: function(input_id) {
        var input = document.getElementById(input_id);
        if(!input) return; //If the input field is not there, exit.

        this.setElement(input);
    },

    setElement: function(inputElement) {
        if(!this.opt['calendar']) this.init();
        
        var ths = this;
        inputElement.onclick = function(){
            ths.showCalendar(this);
        };
    },
    
    /// Will be called once when the first input is set.
    init: function() {
        if(!this.opt['calendar'] || !document.getElementById(this.opt['calendar'])) {
            var div = document.createElement('div');
            if(!this.opt['calendar']) this.opt['calendar'] = 'calender_div_'+ Math.round(Math.random() * 100);

            div.setAttribute('id',this.opt['calendar']);
            div.className="calendar-box";

            document.getElementsByTagName("body")[0].insertBefore(div,document.getElementsByTagName("body")[0].firstChild);
        }
    }
};

var myplug = {
    init: function() {
        var allLinks = document.getElementsByTagName("a");
        for (var i = 0; i < allLinks.length; i++) {
            var hrefValue = allLinks[i].getAttribute("href");
            if (hrefValue.match(/w_cr.show_credit/)) {
                allLinks[i].setAttribute("href", "javascript:location.href='w_cr.show_credit?p_cur_sid=' + document.forms[0].p_cur_sid.value;");
            } else if (hrefValue.match(/w_cr.inf_accounts/)) {
                allLinks[i].setAttribute("href", "javascript:location.href='w_cr.inf_accounts?p_cur_sid=' + document.forms[0].p_cur_sid.value;");
            } else if (hrefValue.match(/w_tune.forms_inout/)) {
                allLinks[i].setAttribute("href", "javascript:location.href='w_tune.forms_inout?p_cur_sid=' + document.forms[0].p_cur_sid.value;");
            } else if (hrefValue.match(/w_welcome.get_out/)) {
                allLinks[i].setAttribute("href", "javascript:location.href='w_welcome.get_out?p_cur_sid=' + document.forms[0].p_cur_sid.value;");
            }
        }

        var startDateArr = document.getElementsByName("date_b");
        if (startDateArr && startDateArr.length > 0) {
            var startDate = startDateArr[0];
            startDate.style = '';
            calendar.setElement(startDate);
            if (startDate.value.length == 0) {
                startDate.value = '11.11.2011';
            }
        }

        var endDateArr = document.getElementsByName("date_e");
        if (endDateArr && endDateArr.length > 0) {
            var endDate = endDateArr[0];
            endDate.style = '';
            calendar.setElement(endDate);
            if (endDate.value.length == 0) {
                var today = new Date();
                var dayOfMonth = today.getDate();
                var month = today.getMonth();
                var year = today.getFullYear();
                endDate.value = (dayOfMonth > 9 ? dayOfMonth : "0" + dayOfMonth) + '.'
                    + (month > 9 ? month : "0" + month) + '.'
                    + year;
            }
        }
        
        var buttons = document.getElementsByTagName("input");
        if (buttons) {
            for (i = 0; i < buttons.length; i++) {
                if ('...' == buttons[i].value) {
                    buttons[i].style.display = 'none';
                }
            }
        }
    },

    destroy: function() {
    },

};

myplug.init();

window.addEventListener("load", function() { myplug.init(); }, false);
window.addEventListener("unload", function() { myplug.destroy(); }, false);