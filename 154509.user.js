// ==UserScript==
// @name       PBAudit PPH
// @namespace  http://www.pacebutler.com/
// @version    2.0
// @description  adds phones per hour calculations to Audit Cart
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @match      http://earth/cellaudit/audit.cfm*
// @copyright  2013+, Roger
// ==/UserScript==

(function(){
    
    //add a case insesnitive conains selector to jquery
    $.expr[':'].Contains = function(a,i,m){
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };
    
    //helper function to log info
    function l(s)
    {
        console.log(s);
    }
    
    function save()
    {
        localStorage.ins = gIns;
        localStorage.outs = gOuts;
        localStorage.mMon = mMon;
        localStorage.mMeet = mMeet;
        
    }
    
    //variables that other functions use to calculate stats
    var phones = 0;
    var points = 0;
    var cart = 0;
    var rec = 0;
    var air = 0;
    var gIns=[];
    var gOuts=[];
    var mMon=false;
    var mMeet=false;
    var first = true;
    
    function load()
    {
        if(localStorage.ins)
        {
            gIns = $.map(localStorage.ins.split(','),function(i){
                return new Date(i);
            });
        }
        if(localStorage.outs)
        {
            gOuts = $.map(localStorage.outs.split(','),function(i){
                return new Date(i);
            });
        }
        
        mMon = localStorage.mMon;
        mMeet = localStorage.mMeet;
    }
    
    load();
    
    
    
    //function to get current phones and other stats from the board and cart when it loads
    function getPhones()
    {
        
        if($('#txtHint > table').length==0)
        {
            //board hasn't loaded yet try again in 1/10th of a sec
            setTimeout(getPhones,100);
            return;
        }
        
        //get name of auditor
        var name = $('font:contains("S Cart")').text();
        name = name.substring(0,name.indexOf('\'S Cart'));
        
        //find matching value on board
        var bName = $('#txtHint b:Contains("'+name+'")');
        
        
        if(bName.length>0)
        {
            var tdName = bName.parent().parent();
            var tdPhones = tdName.next();
            phones = tdPhones.text()-0;
            var tdPoints = tdPhones.next();
            points = tdPoints.text()-0;
        }
        
        //get current phones in the cart
        
        var c = $('b:contains("Total Units:")').parent().text();
        var i = c.indexOf(': ')+2;
        c = c.substr(i,c.length-i);
        cart = c.substr(0,c.indexOf(' '))-0;
        
        var r = $('font:contains("Recycled Phones")').parent().parent().find('input').val();
        var mifi = $('font:contains("MIFI")').parent().parent().find('input').val();
        var usb = $('font:contains("USB AIRCARD")').parent().parent().find('input').val();
        
        rec = (r?r:0)-0;
        mifi = (mifi?mifi:0)-0;
        usb = (usb?usb:0)-0;
        
        air = mifi+usb;
        
    }
    
    //caculates pph and other stats
    function calcTime(){
        //cache a copy of "now"
        var now = new Date();
        
        if(gIns[0])
        {
            if(now.toDateString()!=gIns[0].toDateString())
            {
                gIns=[];
                gOuts=[];
                mMon=false;
                mMeet=false;
                save();
            }
        }
        
        var mills = 0;
        for(var x = 0; x < gOuts.length; x++)
        {
            //keep running total of time clocked in
            mills = mills + (gOuts[x] - gIns[x]);
        }
        
        //if still clocked in add time to now to running total
        if(gIns.length>gOuts.length)
            mills = mills + (now - gIns[gIns.length-1]);
        
        var meet = $('#chkMeeting').is(':checked');
        var mon = $('#chkMonday').is(':checked');
        
        if(meet)
            mills = mills - (1000*60*30);
        if(mon)
            mills = mills - (1000*60*60*1.5)
            
            mills = mills>0?mills:0;
        
        var time = fromMilli(mills);
        
        
        
        //update time spent auditing
        $('#timeDisp').text(time.time);
        
        var pph = (phones + cart - rec - air)/time.tHour;
        pph=Math.round(pph*100)/100;
        pph=pph?pph:'-';
        $('#pphDisp').text(pph);
        
        var ppp = points/phones;
        ppp = Math.round(ppp*100)/100;
        
        ppp = ppp?ppp:'-';
        $('#pppDisp').text(ppp);
        $('#tPhoneDisp').text(phones + cart - rec - air);
    }
    
    //returns time based on time string and last clock
    function getTime(time,last)
    {
        //check for : in time
        if(time.indexOf(':')<0)
        {
            //find best spot to insert
            
            var col = 0;
            if(time.length==3)
                col=1;
            if(time.length==4)
                col=2;
            
            //malformed time (or no colon but with am/pm)
            if(col==0)
                return false;
            
            //seperate into hours and mins
            var h = time.slice(0,col);
            var m = time.slice(col);
            
            //recombine
            time =h+':'+m;
        }
        
        
        var today = (new Date()).toDateString();
        
        var am = time.indexOf(' am');
        var pm = time.indexOf(' pm');
        
        if(am==-1&&pm==-1)
        {
            //try to guess right am or pm
            //if a last was given compare
            if(last)
            {
                
                var tAM = new Date(today+' '+time+' am');
                
                //check to see if adding am makes it after last
                if((tAM - last)>0)
                {
                    //correct
                    return tAM;
                }
                else
                {
                    //am makes it before last clock
                    //try adding pm
                    var tPM = new Date(today+' '+time+' pm');
                    if((tPM-last)>0)
                    {
                        //correct
                        return tPM;
                    }
                    else
                    {
                        //adding pm still didn't make it after last
                        //error!
                        return false;
                    }
                }
            }
            else
            {
                //treat as first clock in
                
                //get hour
                var hour = (new Date(today+' '+time+' am')).getHours();
                
                //if hour is 12 its noon not midnight
                if(hour==12)
                    return new Date(today+' '+time+' pm');
                
                if(hour>=5)
                {
                    //assume any hour after 5 is am
                    return new Date(today+' '+time+' am');
                }
                else
                {
                    return new Date(today+' '+time+' pm');
                }
            }
        }
        
        return new Date(today+' '+time);
    }
    
    //returns a JSON object with time information
    function fromMilli(milli)
    {
        var ret = {};
        
        var m = milli;
        
        var mil = m % 1000;
        m = Math.floor(m / 1000);
        
        var sec = m % 60;
        m = Math.floor(m / 60);
        
        var min = m % 60;
        m = Math.floor(m / 60);
        
        var hour = m;
        
        var tHour = ((milli/1000)/60)/60;
        
        //formatted time string
        ret.time = hour + ":" + checkTime(min) + ":" + checkTime(sec);
        ret.hours = hour;
        ret.mins = min;
        ret.secs = sec;
        //total time expressed in hours
        ret.tHour = tHour;
        
        return ret;
    }
    
    //returns a time formated number (adds a leading 0 if t<10)
    function checkTime(t)
    {
        if(t<10)
            return '0'+t;
        return t;
    }
    
    //function to clear Local Storage variables
    function clearStorage()
    {
        localStorage.ins=[];
        localStorage.outs=[];
    }
    
    function update()
    {
        var today = (new Date()).toDateString();
        
        var done = false;
        var err = false;
        
        var x=0;
        var ins = [];
        var outs = [];
        
        var last = new Date();
        last.setHours(0);
        
        //loop through the inputs and add them to a local array if they validate
        while(!done)
        {
            var i = $('#in'+x);
            var o = $('#out'+x);
            
            if(i.length>0)
            {
                var t = getTime(i.val(),last);
                if(!t)
                    return false;
                last = t;
                ins.push(t);
            }
            
            if(o.length>0)
            {
                var t = getTime(o.val(),last);
                if(!t)
                    return false;
                last = t;
                outs.push(t);
            }
            else
            {
                done=true;
            }
            
            x++;
        }
        
        //store results
        gIns = ins;
        gOuts = outs;
        
        save();
        
        updateIOs();
    }
    
    function updateIOs()
    {
        var nio = buildInsOuts();
        if(nio)
            $('#insouts').replaceWith(nio);
    }
    
    function buildInsOuts()
    {
        
        //create container
        var div = $('<div id="insouts"/>');
        
        var sh = $('<div id="showhide" style="border:1px solid black;display:none;padding:2px;"/>');
        
        //loop through localSorage variables
        for(var x = 0; x < gOuts.length; x++)
        {
            var i = gIns[x];
            var o = gOuts[x];
            
            //add clock in input
            var d1 = $('<div style="overflow:auto"><b>In:</b></div>');
            var i1 = $('<input style="float:right" size="6" id="in'+x+'" value="'+ toTimeString(i) + '"/>').attr('data-date',gIns[x].toString());
            d1.append(i1);
            sh.append(d1);
            
            //add clock out input
            var d2 =$('<div style="overflow:auto"><b>Out:</b></div>');
            var i2 = $('<input style="float:right" size="6" id="out'+x+'" value="'+ toTimeString(o) + '"/>').attr('data-date',gOuts[x].toString());
            d2.append(i2);
            sh.append(d2);
        }
        
        //check to see if there is one more in variable
        if(gIns.length>gOuts.length)
        {
            //if so add it and a blank out input
            var i = gIns[gIns.length-1];
            var d1 = $('<div style="overflow:auto"><b>In:</b></div>');
            var i1 = $('<input style="float:right" size="6" id="in'+(gIns.length-1)+'" value="'+ toTimeString(i) + '"/>').attr('data-date',i.toString());
            d1.append(i1);
            sh.append(d1);
            
            sh.append($('<div style="overflow:auto"><b>Out:</b><input style="float:right" size="6" id="out'+(gIns.length-1)+'" value=""/></div>'));
        }
        else
        {
            //if not add blank in input
            sh.append($('<div style="overflow:auto"><b>In:</b><input style="float:right" size="6" id="in'+(gIns.length)+'" value=""/></div>'));
        }
        
        sh.find('input').blur(function(){
            
            if(!this.value)
            {
                $(this).attr('style','float:right');
                
                //find the corrisopnding value and remove it
                var i = this.id.indexOf('in');
                var x=0;
                if(i>=0)
                {
                    //in
                    x = this.id.slice(2)-0;
                    gIns.splice(x);
                    gOuts.splice(x);
                }
                else
                {
                    //out
                    x = this.id.slice(3)-0;
                    gOuts.splice(x);
                    gIns.splice(x+1);
                }
                save();
                updateIOs();
                
            }
            else
            {
                
                //get last 
                var i = this.id.indexOf('in');
                var x=0;
                var last=false;
                
                if(this.id!='in0')
                {
                    if(i>=0)
                    {
                        //in
                        x = this.id.slice(2)-1;
                        last =new Date($('#out'+x).attr('data-date'));
                    }
                    else
                    {
                        //out
                        x = this.id.slice(3)-0;
                        last = new Date($('#in'+x).attr('data-date'));
                        
                    }
                }
                var time = last?getTime(this.value,last):getTime(this.value);
                
                if(time)
                {
                    this.value=toTimeString(time);
                    $(this).data('date', time.toString());
                    $(this).attr('style','float:right');
                    
                    //update localStorage and Display
                    update();
                }
                
                else
                {
                    $(this).css('border','2px solid red');
                }
            }
        });
        
        //add toggle to div
        var toggle = $('<a href="#">Show/Hide Times</a>').click(function(){
            sh.toggle(200);
            return false;
        });
        div.append(toggle);
        
        //add checkboxes for meetings
        var meeting = $('<div><label for="chkMeeting">Meeting(30m)</label><input type="checkbox" id="chkMeeting"></div>');
        
        meeting.click(function(){
            if($(this).is('input'))
            {
                mMeet = $(this).is(':checked');
            }
            else
            {
                if($(this).is('label'))
                    mMeet = $(this).parent().find('input').is(':checked');
                else
                    mMeet = $(this).find('input').is(':checked');
            }
            save();
        }).find('input').prop('checked',mMeet=="true");;
        
        sh.append(meeting);
        
        
        var monMeeting = $('<div><label for="chkMonday">Monday(1.5h)</label><input type="checkbox" id="chkMonday"></div>');
        
        monMeeting.click(function(){
            if($(this).is('input'))
            {
                mMon = $(this).is(':checked');
            }
            else
            {
                if($(this).is('label'))
                    mMon = $(this).parent().find('input').is(':checked');
                else
                    mMon = $(this).find('input').is(':checked');
            }
            save();
        }).find('input').prop('checked',mMon=="true");
        
        sh.append(monMeeting);
        
        if(!first)
        {
            sh.css('display','block');
        }
        first=false;
        
        //add sh to div
        div.append(sh);
        
        //return container
        return div;
    }
    
    //returns a formated time from a date time object
    function toTimeString(dt)
    {
        var h = dt.getHours()%12;
        if(h==0)
            h=12;
        
        var m = checkTime(dt.getMinutes());
        
        var ap = dt.getHours()>=12?' pm':' am';
        
        return h+':'+m+ap;
    }
    
    //create top level container
    var cont = $('<div/>');
    
    //add pph dispaly
    var pphDisp = $('<div style="overflow:auto"><b style="float:left">Phones Per Hour:</b><div style="float:right" id="pphDisp"></div></div>');
    cont.append(pphDisp);
    
    //add clocked in time display
    var timeDisp = $('<div style="overflow:auto"><b style="float:left">Time Auditing:</b><div style="float:right" id="timeDisp"></div></div>');
    cont.append(timeDisp);
    
    //add ppp display
    var pppDisp = $('<div style="overflow:auto"><b style="float:left">Points Per Phone:</b><div style="float:right" id="pppDisp"></div></div>');
    cont.append(pppDisp);
    
    //add total Phones Dispay
    var tPhoneDisp = $('<div style="overflow:auto"><b style="float:left">Total Phones:</b><div style="float:right" id="tPhoneDisp"></div></div>');
    cont.append(tPhoneDisp);
    
    var inout = buildInsOuts();
    cont.append(inout);
    
    //add container to dom
    $('#txtHint').after(cont);
    
    setTimeout(getPhones,100);
    
    calcTime();
    setInterval(calcTime,500);
})();