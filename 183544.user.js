// ==UserScript==
// @name       Bootstrap Audit Cart
// @namespace  http://www.pacebutler.com/
// @version    0.9.2
// @description  Adds Audit Cart improvements (internal PaceButler)
// @match      http://earth/cellaudit/audit.cfm*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require    http://netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js
// @copyright  2013+, Roger Hamilton
// ==/UserScript==


//hide everything old
$('body *').hide();
$('html').css('overflow-x','hidden');

$(function(){
    //remove listener to prevent backspace use
    document.onkeydown = null;
    
    //remove old style
    $('head').find('link').remove();
    
    //add bootstrap style
    $('head').append('<link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" rel="stylesheet" media="screen">')
    .append('<link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" rel="stylesheet" media="print">');
    
    
    
    //variables
    var lastAction;
    var username;
    var options;
    var oldModel;
    var oldQTY;
    var oldDamage;
    var oldSubmit;
    var pphData;
    var phones;
    var points;
    var cart;
    var cData;
    
    //data for building quick damage
    var quickDamageButtons = [	['Water','Water Damage'],
                              ['LCD','LCD Damage'],
                              ['Glass','LCD Cracked Glass'],
                              ['Burn','LCD Burn Spots'],
                              ['Power','Wont power up'],
                              ['Keys','Keypad Bad'],
                              ['Housing','Housing Damage'],
                              ['Software','Software Corrupted'],
                              ['Charge','Charge Port Bad'],
                              ['Speaker','Speaker Bad'],
                              ['Touch','Touch Screen Bad'],
                              ['Crack Ho.','Cracked Housing']];
    
    
    loadData();
    var nav = buildNav();
    var main = buildTop();
    var buckets = buildBuckets();
    
    $('body')
    .append(nav)
    .append(main)
    
    .append('<h2 class="text-center text-danger">'+username+'\'S CART</h2>')
    .append(buckets)
    
    .keydown(function(){
        if(!($(':focus').is('input')||$(':focus').is('textarea')))
            $('#Search').focus();
        return true;
    });
    
    
    
    function getImg(val)
    {
        if(!val)
            return '';
        var mid = val.split('~');
        var i = mid[0].indexOf(' - ');
        var name;
        if(i>=0)
        {
            var cross = mid[0].substr(0,i);
            i = mid[2].indexOf(cross);
            name = mid[2].slice(0,i)+mid[2].slice(i+cross.length+1);
        }
        else
        {
            i=0;
            name = mid[2];
        }
        
        
        var FullPath = "http://earth/cellaudit/images/"+name;
        return FullPath;
    }
    
    var infoDict = [];
    
    function getModelInfo(val)
    {
        if(!infoDict)
            infoDict = [];
        var mid = val.split('~');
        var ret = new $.Deferred();
        var resolved=false;
        for(var x=0;x<infoDict.length;x++)
        {
            if(infoDict[x].val == val)
            {
                ret.resolve(infoDict[x].data);
                resolved=true;
            }
        }
        if(!resolved)
        {
            //load phone info
            $.ajax("LoadDetail.cfm?CellModelID="+mid[1]+"&sid="+Math.random()).done(function(data){
                var d = $(data);
                if(d.text().trim())
                {
                    d.find('font').removeAttr('size');
                    var model = d.find('i').text();//.replace(' -- ','&nbsp;&#8209;&#8209;&nbsp;');
                    var rep = d.find('font:contains("***REPAIR STOCK***")').length>0;
                    var pay = d.find('font:contains("!!***UNDER $0.50***!!")').length==0;
                    var checkLCD = d.find('font:contains("Check LCD / Digitizer")').length>0;
                    
                    if(model.indexOf('Apple')>=0)
                        checkLCD=true;
                    var modelDiv = $('<h3 style="color:'+(rep?'#428bca':'#b94a48')+'">'+model+'</h3>');
                    
                    var info = $('<div/>').append(modelDiv);
                    var small = $('<div/>');
                    info.append((rep?'<h4>Repair&nbsp;Stock  <span class="glyphicon glyphicon-thumbs-up"/></h4>':'<h4>Recycle  <span class="glyphicon glyphicon-thumbs-down"/></h4>'));
                    small.append((rep?'<div>Repair&nbsp;Stock  <span class="glyphicon glyphicon-thumbs-up"/></div>':'<div>Recycle  <span class="glyphicon glyphicon-thumbs-down"/></div>'));
                    info.append((pay?'<h4 style="color:#468847"><span class="glyphicon glyphicon-usd"/>Pay</h4>':'<h4 style="color:#b94a48"><span class="glyphicon glyphicon-usd"/>No Pay</h4>'));
                    small.append((pay?'<div style="color:#468847"><span class="glyphicon glyphicon-usd"/>Pay</div>':'<div style="color:#b94a48"><span class="glyphicon glyphicon-usd"/>No Pay</div>'));
                    if(checkLCD)
                    {
                        info.append('<h4 style="color:#428bca"><span class="glyphicon glyphicon-phone"/>Check LCD/Digitizer</h4>');
                        small.append('<div style="color:#428bca"><span class="glyphicon glyphicon-phone"/>Check LCD/Digitizer</div>');
                    }
                    
                    
                    
                    
                    var r = {};
                    r.div = info;
                    r.small=small;
                    r.model = model;
                    r.rep = rep;
                    r.pay = pay;
                    r.checkLCD = checkLCD;
                    
                    infoDict.push({'val':val,'data':r});
                    ret.resolve(r);
                }
            }).fail(function(){
                ret.reject();
            });
        }
        return ret.promise();
    }
    
    //fills variables with data from localStorage or old forms
    function loadData()
    {
        lastAction = JSON.parse(localStorage.getItem('last'));
        pphData = JSON.parse(localStorage.getItem('PPH'));
        
        if((new Date).toDateString()!=(new Date(pphData.Clocks[0])).toDateString())
        {
            pphData = {}
            pphData.Clocks=[];
            pphData.Meeting=0;
        }
        
        cData = JSON.parse(localStorage.getItem('contact'));  
        
        
        
        if(!$('a:contains("Complete Audit >>")').attr('href')||!cData)
            cData={"name":"","company":"","zip":"","notes":""};
        
        
        username = $('td:contains("User:")').text().trim().substring(5).split(' ')[0];
        username = $('h3:contains("S Cart")').text();
        username = username.substring(0,username.indexOf('S Cart')-1);
        //cache old model select
        oldModel = $('#Model');
        //cache old quantity field
        oldQTY = $('input[name=Qty]');
        //cache old damage select
        oldDamage = $('#DamageReason');
        
        options = oldModel.find('option').clone().css('display','');
        recOp = options.filter(':contains("Recycled -- Recycled Phones")').css('color','red');
        options.first().css('color','rgb(1,1,1)');
        
        var lu = username.toLowerCase();
        $('#txtHint tbody tbody>tr').each(function(){
            var $t = $(this);
            if($t.text().toLowerCase().indexOf(lu)>=0)
            {
                var tds = $t.find('td');
                phones = $(tds[1]).text().trim();
                points = $(tds[2]).text().trim();
            }
        });
        phones = (phones?phones:0)-0;
        points = (points?points:0)-0;
        
        cart = $($('td>b:contains("Total Units")').parent().next()).text()-0;
        
    }
    
    function buildNav()
    {
        var nav = $($('<nav class="navbar navbar-default" role="navigation"/>')
                    .append($('<div class="collapse navbar-collapse navbar-ex1-collapse"/>')
                            .append($('<ul class="nav navbar-nav"/>')
                                    .append('<li class="active"><a href="http://earth/cellaudit/audit.cfm">Audit Cart</a></li>')
                                    .append('<li><a href="http://earth/cellaudit/list_audit.cfm?Exported=0">List Audits</a></li>')
                                    .append('<li><a href="http://earth/cellaudit/quick_audit.cfm">Quick Add</a></li>')
                                    .append($('<li class="dropdown"/>')
                                            .append('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Other Links<b class="caret"></b></a>')
                                            .append($('<ul class="dropdown-menu"/>')
                                                    .append('<li><a href="https://www.paycomonline.net/v4/ee/ee-login.php" target="_blank">Time Clock</a></li>')
                                                    .append('<li><a href="http://mail.pacebutler.com/" target="_blank">Email</a></li>')
                                                    .append('<li><a href="http://www.pacebutler.com/reading/" target="_blank">Reading Form</a></li>'))))
                            .append('<p class="navbar-text pull-right">Signed in as '+username+' <a href="http://earth/cellaudit/login/logout.cfm">Log Out</a></p>')));
        return nav;
    }
    
    function buildTop()
    {
        //main top div
        var main = $('<div class="row col-sm-12 hidden-print"/>');
        
        var form = buildForm();
        
        var contact = buildContact();
        form.append('<br/>').append(contact);
        
        var info = buildInfo();
        
        var top = buildBoard();
        
        var pph = buildPPH();
        top.append(pph);
        
        main.append(form)
        .append(info)
        .append(top);
        
        return main;
        
        function buildPPH()
        {
            var main = $('<div class="row pull-right col-sm-8"/>');
            
            var table = $('<table class="row col-sm-12 table" style="margin:0px;"/>');
            
            var body =$('<tbody/>');
            var last =0;
            var time = 0;
            var out = false;
            
            for(var x=0;x<pphData.Clocks.length;x++)
            {
                var c = new Date(pphData.Clocks[x]);
                body.append(newRow(out,c,body));
                
                if(last&&out)
                    time= time + (c.getTime() - last);
                
                last = c.getTime();
                out = !out;
            }
            
            time=time<0?0:time;
            
            var ppp = Math.round((points / phones) * 100) / 100;
            ppp=ppp?ppp:'--';
            body.append(newRow(out,'',body));
            
            table.append(body);
            
            var none = $('<input type="radio" name="meeting" value="none">').change(function(){
                pphData.Meeting=0;
                none.attr('checked','true');
                recalcTime();
            });
            var meeting = $('<input type="radio" name="meeting" value="meeting">').change(function(){
                pphData.Meeting=1;
                meeting.attr('checked','true');
                recalcTime();
            });
            var monday = $('<input type="radio" name="meeting" value="monday">').change(function(){
                pphData.Meeting=2;
                monday.attr('checked','true');
                recalcTime();
            });
            if(pphData.Meeting==0)
                none.attr('checked','true');
            if(pphData.Meeting==1)
            {
                
                meeting.attr('checked','true');
            }
            if(pphData.Meeting==2)
            {
                
                monday.attr('checked','true');
            }
            
            
            
            var stats = $('<div/>')
            .append($('<div class="row"/>')
                    .append('<div><small><b>Phones/Hour:</b> <span id="auditPPH">--</span></small></div>')
                    .append('<div><small><b>Time Auditing:</b> <span id="auditTime">--</span></small></div>')
                    .append('<div><small><b>Phones:</b> <span id="auditPhone">'+(cart+phones)+(cart?'('+phones+')':'')+'</span></small></div>')
                    .append('<div><small><b>Points</b>: '+points+'</small></div>')
                    .append('<div><small><b>Points/Phone:</b> '+ppp+'</div>')
                    .append('<a data-toggle="collapse" class="btn btn-primary btn-xs" href="#clockTable">Show Times</a>'))
            .append($('<div id="clockTable" class="row collapse panel panel-default panel-body" style="padding:5px;border-radius:2px;margin:0px;"/>')
                    .append(table)
                    .append($('<label class="radio">None</label>').prepend(none))
                    .append($('<label class="radio">Meeting</label>').prepend(meeting))
                    .append($('<label class="radio">Monday</label>').prepend(monday)));
            
            
            main.append(stats);
            
            setInterval(updatePPH,500);
            
            return main;
            
            function recalcTime()
            {
                var trs = body.find('tr');
                pphData.Clocks = [];
                trs.each(function(){
                    if($(this).attr('data-time')!='')
                        pphData.Clocks.push($(this).attr('data-time'));
                });
                
                last =0;
                time = 0;
                out = false;
                
                for(var x=0;x<pphData.Clocks.length;x++)
                {
                    var c = new Date(pphData.Clocks[x]);
                    
                    if(last&&out)
                        time= time + (c.getTime() - last);
                    
                    last = c.getTime();
                    out = !out;
                }
                
                
                
                updatePPH();
                saveData();
            }
            
            function validate(inp)
            {
                if(inp.val().length<3)
                    return false;
                var now = new Date();
                var last = inp.parents('tr').prev('tr').attr('data-time');
                if(!last)
                {
                    last = now.toDateString()+' 0:00 GMT-0600 (Central Standard Time)';
                }
                last = new Date(last);
                var val = inp.val().split(' ')[0];
                
                
                
                if(val.indexOf(':')==-1)
                    val = val.substring(0,val.length-2)+':'+val.substring(val.length-2);
                
                var nd = now.toDateString()+' '+val+' GMT-0600 (Central Standard Time)';
                nd = new Date(nd);
                if(nd-last<0)
                {
                    var hm = val.split(':');
                    val = (hm[0]-0)+12+':'+hm[1];
                    nd = now.toDateString()+' '+val+" GMT-0600 (Central Standard Time)";
                    nd = new Date(nd);
                    if((hm[0]-0)+12>=24||nd-last<0)
                        return false;
                }
                
                return nd;
            }
            
            function getTime(date)
            {
                if(!date)
                    return '';
                var hours = date.getHours();
                var ap = hours>=12;
                hours = hours%13+(hours>=13?1:0);
                var mins = date.getMinutes();
                
                mins = (mins<10?'0':'')+mins;
                
                return hours+':'+mins+' '+(ap?'pm':'am');
            }
            function formatTime(time)
            {
                var hours = Math.floor(time);
                time = (time-hours)*60;
                var mins = Math.floor(time);
                time = (time-mins)*60;
                var secs = Math.floor(time);
                
                return hours+':'+(mins<10?'0':'')+mins+':'+(secs<10?'0':'')+secs;
            }
            
            function newRow(o,clock,parent)
            {
                
                var cIn = $('<input class="pull-right form-control"/>').val(getTime(clock)).change(function(){
                    $t=$(this);
                    var tr = $t.parents('tr');
                    if($t.val())
                    {
                        var time = validate($t);
                        if(time!=false&&time.getDate())
                        {
                            $t.removeClass('alert-danger');
                            row.attr('data-time',time);
                            $t.val(getTime(time));
                            
                            //remove all that follow
                            tr.nextAll('tr').remove();
                            
                            
                            //add new row
                            out = !tr.is('.clock-out');
                            parent.append(newRow(out,'',parent));
                            
                        }
                        else
                        {
                            $t.addClass('alert-danger');
                        }
                    }
                    else
                    {
                        $t.removeClass('alert-danger');
                        tr.attr('data-time','');
                        tr.nextAll('tr').remove();
                    }
                    recalcTime();
                });
                var del = $('<button type="button" class="close">&times;</button>').click(function(){
                    $t=$(this);
                    var tr = $t.parents('tr');
                    tr.find('input').val('');
                    tr.attr('data-time','');
                    tr.nextAll('tr').remove();
                    recalcTime();
                });
                var row = $('<tr data-time="'+clock+'" class="clock-'+(o?'out':'in')+'">')
                .append($('<td/>')
                        .append('<span>'+(o?'Out:':'In:')+'</span>'))
                .append($('<td/>')
                        .append(cIn))
                .append($('<td/>')
                        .append(del));
                return row;
            }
            
            function updatePPH()
            {
                var now = new Date();
                var t = time;
                if(out)
                {
                    t=t+(now.getTime()-last);
                }
                var t2 = ((t/1000)/60)/60;
                t2=Math.round(t2*100)/100;
                
                if(pphData.Meeting==1)
                    t=t-(1000*60*30)+1;
                if(pphData.Meeting==2)
                    t=t-(1000*60*90)+1;
                
                t=t<0?0:t;
                var h = ((t/1000)/60)/60;
                $('#auditTime').text(formatTime(h));
                $('#auditTime').attr('title',t2);
                $('#auditPhone').text((cart+phones)+(cart?'('+phones+')':''));
                pph = (phones+cart)/h;
                pph = Math.round(pph*100)/100;
                pph=pph?pph:'--';
                $('#auditPPH').text(pph);
                
            }
            function saveData()
            {
                
                localStorage.setItem('PPH',JSON.stringify(pphData));
            }
            
        }
        
        function buildForm()
        {
            //search "form"
            var form = $('<div class="col-sm-4"/>');
            
            //search textbox
            var search = $('<input id="Search" type="text" class="form-control" placeholder="Search" autocomplete="off"/>');
            
            //quantity textbox
            var qty = $('<input id="Qty" type="text" class="form-control" placeholder="QTY" autocomplete="off"/>');
            
            //build first row of form
            var row1 = $('<div class="row"/>')
            .append($('<div class="col-xs-9">')
                    .append(search))
            .append($('<div class="col-xs-3">')
                    .append(qty));
            
            //tie the input of new to old
            qty.keyup(function(){
                oldQTY.val(qty.val());
            });
            
            //new select box for models
            var modelSelect = $('<select id="NewModel" class="form-control" style="font-size:17px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:700"/>');
            
            
            
            //cache the recycle option
            var recOp = options.filter(':contains("Recycled -- Recycled Phones")');
            
            //set color of each
            options.each(function(){
                var $t = $(this);
                
                var c = $t.css('color');
                if(!c)
                    c='black';
                $(this).css('color',c);
            });
            
            //add options to new model select
            modelSelect.append(options.clone());
            
            
            modelSelect.change(function(){
                var selected = modelSelect.find('option:selected');
                
                //make color inherit "up"
                var color = selected.css('color');
                modelSelect.css('color',color);
                
                sendBtn.removeClass('btn-success btn-primary btn-danger');
                quickDamageGroup.find('button').removeClass('btn-primary btn-danger').removeAttr('disabled');
                damageSelect.removeAttr('disabled');
                sendBtn.removeAttr('disabled');
                
                var damaged = damageSelect.find(':selected').text().length>0;
                if(color=='rgb(0, 0, 0)')
                {
                    if(damaged)
                        sendBtn.addClass('btn-danger');
                    else
                        sendBtn.addClass('btn-success');
                    quickDamageGroup.find('button').addClass('btn-danger');
                }
                else
                {
                    if(color=='rgb(0, 0, 255)')
                    {
                        if(damaged)
                            sendBtn.addClass('btn-primary');
                        else
                            sendBtn.addClass('btn-success');
                        quickDamageGroup.find('button').addClass('btn-primary');
                    }
                    else
                    {
                        
                        quickDamageGroup.find('button').attr('disabled','disabled');
                        damageSelect.attr('disabled','disabled');
                        if(color=='rgb(1, 1, 1)')
                        {
                            $('#Info').empty();
                            sendBtn.attr('disabled','disabled');
                        }
                        else
                            sendBtn.addClass('btn-danger');
                        
                    }
                }
                
                
                getModelInfo($(this).val()).done(function(info){
                    $('#Info').empty();
                    if(info.model)
                        $('#Info').append(info.div);
                    
                });
                
                
                
                //load image
                var FullPath = getImg($(this).val());
                document.images['ModelImg'].src = FullPath;
                
                if(selected.text()=='--Model--'||search.val()=='')
                    $('#modelCount').hide();
                else
                {
                    $('#modelCount').show();
                }
                
                //pass input to old form
                oldModel.val(modelSelect.val());
            });
            
            var suppressSearch = false;
            search.keydown(function(e){
                //key *
                if(e.which==106)
                {
                    qty.focus();
                    return false;
                }
                //key up
                if(e.which==38)
                {
                    suppressSearch=true;
                    var s = modelSelect.find(':selected').prev();
                    if(s.length)
                        modelSelect.val(s.val());
                    modelSelect.change();
                    return false;
                }
                //key down
                if(e.which==40)
                {
                    suppressSearch=true;
                    var s = modelSelect.find(':selected').next();
                    if(s.length)
                        modelSelect.val(s.val());
                    modelSelect.change();
                    return false;
                }
            });
            
            
            search.keyup(function(){
                //if up or down pressed
                if(suppressSearch)
                {
                    suppressSearch = false;
                    return false;
                }
                
                var text = $(this).val();
                var matches = [];
                var bestIndex = 1000;
                var best;
                //search all the options
                options.each(function(){
                    var t = $(this);
                    var i =t.text().toLowerCase().indexOf(text.toLowerCase());
                    if(i>=0)
                    {
                        matches.push(t);
                        if(i<bestIndex)
                        {
                            bestIndex=i;
                            best = t;
                        }
                    }
                });
                
                //remove all options from list
                modelSelect.find('option').remove();
                
                //if search text was empty
                if(text=='')
                {
                    //set best to "--model--" option
                    best = $(options[0]);
                    //clear match count display
                    $('#modelCount').text('');
                    $('#modelCount').hide();
                }
                else
                {
                    //set match count
                    $('#modelCount').text(matches.length);
                }
                
                //add back matches
                $.each(matches,function(){
                    modelSelect.append(this);
                });
                
                //select best match
                if(best)
                    modelSelect.val(best.val());
                
                //if there were no matches
                if(matches.length<=0)
                {
                    //add recycle to list
                    modelSelect.append(recOp);
                    //select recycle
                    modelSelect.val(recOp.val());
                }
                
                
                //trigger change event
                modelSelect.change();
            });
            
            var url = 'https://www.google.com/search?q=';
            var restrict = '+-askmefast.com+-helpowl.com';
            
            //build the second row in the form
            var row2 = $('<div class="row"/>')
            .append($('<div class="input-group col-sm-12"/>')
                    .append($('<div class="input-group"/>')
                            .append('<span id="modelCount" class="input-group-addon" style="display: none;font-size:17;font-weight:700"/>')
                            .append(modelSelect))
                    .append($('<div class="input-group-btn"/>')
                            .append('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Help <span class="caret"></span></button>')
                            .append($('<ul class="dropdown-menu pull-right"/>')
                                    .append($('<li><a href="#">Hard Reset</a></li>').click(function(){window.open(url+'hard+reset+'+$('#NewModel>option:selected').text()+restrict);}))
                                    .append($('<li><a href="#">Battery</a></li>').click(function(){window.open(url+'battery+'+$('#NewModel>option:selected').text()+restrict);}))
                                    .append('<li class="divider"></li>')
                                    .append($('<li/>')
                                            .append('<a href="#">Phone Guide</a>').click(function(){
                                                window.open('https://docs.google.com/a/pacebutler.com/document/d/1mFH9pi6-DXmgEYyfTp-maw73ySc0RDjNZQIZir-yO10/edit');
                                            }))
                                    .append($('<li/>')
                                            .append('<a href="#">Price List</a>').click(function(){
                                                window.open('http://www.pacebutler.com/images/prices.pdf');
                                            }))
                                    .append($('<li/>')
                                            .append('<a href="#">Damage Price</a>').click(function(){
                                                window.open('http://www.pacebutler.com/images/PBBrokenDamagedDefective.pdf');
                                            })))));
            
            //damage select box
            var damageSelect = $('<select id="Damage" class="form-control" disabled/>');
            
            //add copies of old options
            damageSelect.append($('#DamageReason>option').clone().css('display',''));
            
            
            
            //tie new damage select to old
            damageSelect.change(function(){
                oldDamage.val(damageSelect.val());
                modelSelect.change();
            });
            
            //cache old submit button
            oldSubmit = $('#btnSend');
            
            //new submit button
            sendBtn = $('<button id="Submit" class="btn" type="button" disabled>Send To Cart</button>').click(function(){
                //create object
                var last = {};
                last.damage = oldDamage.val();
                last.model = oldModel.find('option:selected').text();
                //if it is a cross ref
                if(last.model.indexOf(' - ')>0)
                {
                    last.model = last.model.substring(last.model.indexOf(' - ')+3);
                }
                last.val = oldModel.val();
                last.qty = oldQTY.val().trim();
                
                
                if(!last.qty)
                    last.qty=1;
                
                last = JSON.stringify(last);
                
                if(last.model!='--Model--')
                    localStorage.setItem("last", last);
                oldSubmit.click();
            });
            
            //build the third row in the form
            var row3 = $('<div class="row"/>')
            .append($('<div class="input-group col-sm-12"/>')
                    .append('<span class="input-group-addon">Damage</span>')
                    .append(damageSelect)
                    .append($('<span class="input-group-btn"/>').append(sendBtn)));
            
            
            //build the fourth row
            var row4 = $('<div class="row"/>');
            //button group for quick damage options
            var quickDamageGroup = $('<div class="col-sm-12" style="margin-top:10px;"/>');
            row4.append(quickDamageGroup);
            
            //build buttons
            $.each(quickDamageButtons,function(){
                var name = this[0];
                var damage = this[1];
                var button = $('<button type="button" class="btn btn-sm" disabled>'+name+'</button>').click(function(){
                    damageSelect.val(damage);
                    damageSelect.change();
                    $('button#Submit').click();
                });
                quickDamageGroup.append(button);
            });
            
            //add rows to form
            form.append(row1)
            .append(row2)
            .append(row3)
            .append(row4);
            
            //add enter on any input to submit
            form.find('input, select').keydown(function(e){
                if(e.which==13)
                {
                    sendBtn.click();
                }
            });
            
            
            
            
            return form;
        }
        function buildContact()
        {
            var cName = $('<input class="form-control"/>').change(function(){
                cData.name = $(this).val();
                localStorage.setItem('contact',JSON.stringify(cData));
            });
            
            cName.val(cData.name);
            
            var cCompany = $('<input class="form-control"/>').change(function(){
                cData.company = $(this).val();
                
                localStorage.setItem('contact',JSON.stringify(cData));
            });
            
            cCompany.val(cData.company);
            
            var cZip = $('<input class="form-control"/>').change(function(){
                cData.zip = $(this).val();
                
                localStorage.setItem('contact',JSON.stringify(cData));
            });
            
            cZip.val(cData.zip);
            
            var cNotes = $('<textarea class="form-control" rows="3"/>').change(function(){
                cData.notes = $(this).val();
                localStorage.setItem('contact',JSON.stringify(cData));
            });
            
            cNotes.text(cData.notes);
            
            var contact = $('<div class="col-sm-12 panel panel-default " style="padding:0;"/>')
            .append('<div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" href="#panelCollapse">Contact Info</a></h4></div>')
            .append($('<div class="panel-body collapse" id="panelCollapse"/>')
                    .append($('<div class="row input-group col-sm-12"/>')
                            .append('<span class="input-group-addon">Name</span>')
                            .append(cName))
                    .append($('<div class="row input-group col-sm-12"/>')
                            .append('<span class="input-group-addon">Company</span>')
                            .append(cCompany))
                    .append($('<div class="row input-group col-sm-6"/>')
                            .append('<span class="input-group-addon">Zip</span>')
                            .append(cZip))
                    .append($('<div class="row input-group col-sm-12"/>')
                            .append('<span class="input-group-addon">Notes</span>')
                            .append(cNotes)));
            return contact;
        }
        function buildInfo()
        {
            //build info div to display image and phone info
            var info = $('<div class="col-sm-5"/>')
            .append($('<div class="row"/>')
                    .append('<div id="Info" class="col-sm-4"/>')
                    .append($('<div class="col-sm-8">')
                            .append('<img id="ModelImg" src="http://earth/cellaudit/images/spacer.gif" style="max-width:100%" class="img-rounded"/>')));
            return info;
        }
        
        
        
        function buildBoard()
        {
            //build top board
            var topBody = $('<tbody/>');
            
            //build table to hold data
            var top = $('<div class="col-sm-3"/>')
            .append($('<div id="top" class="pull-right hidden-xs row" style="font-size:8pt"/>')
                    .append($('<table class="table table-condensed table-striped" style="font-size:11px;margin-bottom:0px;"/>')
                            .append('<thead><tr><td><font><b>Auditor</b></font></td><td align="right"><font><b>Count</b></font></td><td align="right"><font><b>Points</b></font></td></tr></thead>')
                            .append(topBody)));
            //copy rows
            var topRows = $('#txtHint tbody tbody>tr').clone().css('display','');
            
            //display all info
            topRows.find('*').css('display','');
            
            //remove size from font
            topRows.find('font').removeAttr('size');
            
            //add rows to table
            for(x=1;x<topRows.length;x++)
                topBody.append(topRows[x]);
            
            //remove extra padding bootstrap adds
            topBody.find('td').css('padding-top','0px').css('padding-bottom','0px');
            
            return top;
        }
    }
    
    
    function buildBuckets()
    {
        //cache old phone rows
        var cartRows = $('table[bgcolor=#ffffff] tbody>tr');
        
        //variables for stats
        var goodRows = [];
        var repRows = [];
        var recRows = [];
        var numGood = 0;
        var numRep = 0;
        var numRec = 0;
        var totalAudited = 0;
        var totalCount = 0;
        
        //loop through rows
        for(var x=1;x<cartRows.length-4;x++)
        {
            //create phone object
            var phone = {};
            //get cells
            var row = $(cartRows[x]).find('td');
            
            phone.Make = $(row[0]).text();
            phone.Model = $(row[1]).text();
            phone.QInput = $(row[3]).find('input');
            phone.QTY = phone.QInput.val();
            phone.Delete = $(row[6]).find('a').attr('href');
            phone.Color = $(row[0]).find('font').attr('color');
            
            phone.Damage = $(row[4]).text().trim().substring(3);
            
            var opt = oldModel.find('option:contains("' + phone.Model + ' -- ' + phone.Make + '")');
            
            for(var i=0;i<opt.length;i++)
            {
                if($(opt[i]).text().indexOf(phone.Model + ' -- ' + phone.Make)==0)
                {
                    opt = $(opt[i]);
                    break;
                }
            }   
                    
            
            phone.popover = getPopover(phone.Model+'&nbsp;&#8209;&#8209;&nbsp;'+phone.Make, opt.val());
            
            
            
            
            
            
            
            //sort the phones into the buckets
            if(phone.Damage=="")
            {
                if(phone.Make=="AirCard"||phone.Model=="Other Device")
                {
                    goodRows.push(phone);
                }
                else
                {
                    if(phone.Model=="Recycled")
                    {
                        recRows.push(phone);
                        numRec+=phone.QTY-0;
                        totalCount-=phone.QTY-0;
                    }
                    else
                    {
                        goodRows.push(phone);
                        numGood+=phone.QTY-0;
                    }
                }
            }
            else
            {
                var color = opt.css('color');
                var filter=options.filter(':contains("'+phone.Model+' -- '+phone.Make+'")');
                var rep=false;
                filter.each(function(){
                    var i = $(this).text().indexOf(phone.Model+' -- '+phone.Make);
                    if(i==0)
                    {
                        rep=$(this).css('color')!='black';
                        return false;
                    }
                });
                if(rep)
                {
                    repRows.push(phone);
                    numRep+=phone.QTY-0;
                }
                else
                {
                    recRows.push(phone);
                    numRec+=phone.QTY-0;
                }
            }
        }
        
        
        
        totalAudited = numGood+numRec+numRep;
        totalCount +=totalAudited;
        
        cart = totalCount;
        
        var bPanel = $('<div class="row"/>');
        
        var goodBody = $('<tbody/>');
        
        function modifyPhone(phone,dif)
        {
            var curr = phone.QInput.val()-0;
            var n = curr+dif;
            
            phone.QInput.val(n);
            document.CellForm.submit();
        }
        
        function getPopover(title, val)
        {
            
            var img = getImg(val);
            var info='';
            getModelInfo(val).done(function(d){
                info = d.small.html();
            });
            var pop = {'trigger':'hover',
                       'html':true,
                       'content':function(){
                           return info+'<img src="'+img+'" style="max-width:100%"/>';
                       },
                       'title':title,
                       'placement':'top'};
            
            return pop;
        }
        
        //loop through good rows here and add to goodBody
        $.each(goodRows,function(){
            var phone = this;
            var tr = $('<tr/>').css('color',phone.Color);
            var qtyIn = phone.QInput.clone().attr('style','').keyup(function(){
                phone.QInput.val($(this).val())
            });
            var plus = $('<a class="badge btn-success btn-xs hidden-print"><span class="glyphicon glyphicon-plus"/></a>').click(function(){
                modifyPhone(phone,1);
            });
            var minus = $('<a class="badge btn-danger btn-xs hidden-print"><span class="glyphicon glyphicon-minus"/></a>').click(function(){
                modifyPhone(phone,-1);
            });
            tr.append('<td>'+phone.Make+'</td>')
            .append('<td>'+phone.Model+'</td>')
            .append($('<td/>').append(qtyIn))
            .append($('<td/>').append($('<div/>').append(plus).append('<br/>').append(minus)))
            .append($('<td/>').append('<button class="close" onclick="location.href=\''+phone.Delete+'\'" >&times;</button>'));
            tr.popover(phone.popover);
            goodBody.append(tr);
        });
        
        var goodTable = $('<div class="col-sm-4"/>')
        .append($('<div class="panel panel-success"/>')
                .append($('<div class="panel-heading"/>')
                        .append('<strong class="lead">Good: </strong><span>'+numGood+'</span>'))
                .append($('<div class="panel-body"/>')
                        .append($('<table class="table table-condensed" style="font-size:12px"/>')
                                .append('<thead><tr><td>Mfg</td><td>Model</td><td>QTY</td><td></td></tr></thead>')
                                .append(goodBody))));
        
        var repairBody = $('<tbody/>');
        
        //loop through repair rows here and add to repairBody
        $.each(repRows,function(){
            var phone = this;
            var tr = $('<tr/>').css('color',phone.Color);
            var qtyIn = phone.QInput.clone().attr('style','').keyup(function(){
                phone.QInput.val($(this).val())
            });
            var plus = $('<a class="badge btn-success btn-xs hidden-print"><span class="glyphicon glyphicon-plus"/></a>').click(function(){
                modifyPhone(phone,1);
            });
            var minus = $('<a class="badge btn-danger btn-xs hidden-print"><span class="glyphicon glyphicon-minus"/></a>').click(function(){
                modifyPhone(phone,-1);
            });
            tr.append('<td>'+phone.Make+'</td>')
            .append('<td>'+phone.Model+'</td>')
            .append($('<td/>').append(qtyIn))
            .append($('<td/>').append($('<div/>').append(plus).append('<br/>').append(minus)))
            .append('<td>'+phone.Damage+'</td>')
            .append($('<td/>').append('<button class="close" onclick="location.href=\''+phone.Delete+'\'" >&times;</button>'));
            tr.popover(phone.popover);
            repairBody.append(tr);
        });
        
        var repairTable = $('<div class="col-sm-4"/>')
        .append($('<div class="panel panel-primary"/>')
                .append($('<div class="panel-heading"/>')
                        .append('<strong class="lead">Repair: </strong><span>'+numRep+'</span>'))
                .append($('<div class="panel-body"/>')
                        .append($('<table class="table table-condensed" style="font-size:12px"/>')
                                .append('<thead><tr><td>Mfg</td><td>Model</td><td>QTY</td><td></td><td>Damage</td><td></td></tr></thead>')
                                .append(repairBody))));
        
        var recycleBody = $('<tbody/>');
        
        //loop through recycle rows here and add to recycleBody
        $.each(recRows,function(){
            var phone = this;
            var tr = $('<tr/>').css('color',phone.Color);
            var qtyIn = phone.QInput.clone().attr('style','').keyup(function(){
                phone.QInput.val($(this).val())
            });
            var plus = $('<a class="badge btn-success btn-xs hidden-print"><span class="glyphicon glyphicon-plus"/></a>').click(function(){
                modifyPhone(phone,1);
            });
            var minus = $('<a class="badge btn-danger btn-xs hidden-print"><span class="glyphicon glyphicon-minus"/></a>').click(function(){
                modifyPhone(phone,-1);
            });
            tr.append('<td>'+phone.Make+'</td>')
            .append('<td>'+phone.Model+'</td>')
            .append($('<td/>').append(qtyIn))
            .append($('<td/>').append($('<div/>').append(plus).append('<br/>').append(minus)))
            .append('<td>'+phone.Damage+'</td>')
            .append($('<td/>').append('<button class="close" onclick="location.href=\''+phone.Delete+'\'" >&times;</button>'));
            tr.popover(phone.popover);
            recycleBody.append(tr);
        });
        
        var recycleTable = $('<div class="col-sm-4"/>')
        .append($('<div class="panel panel-danger"/>')
                .append($('<div class="panel-heading"/>')
                        .append('<strong class="lead">Recycle: </strong><span>'+numRec+'</span>'))
                .append($('<div class="panel-body"/>')
                        .append($('<table class="table table-condensed" style="font-size:12px"/>')
                                .append('<thead><tr><td>Mfg</td><td>Model</td><td>QTY</td><td></td><td>Damage</td><td></td></tr></thead>')
                                .append(recycleBody))));
        
        bPanel.append(goodTable)
        .append(repairTable)
        .append(recycleTable);
        var completeHREF = $('a:contains("Complete Audit >>")').attr('href');
        var completeBtn = $('<button type="button" class="btn btn-primary btn-xs pull-right hidden-print" '+(completeHREF?'':'disabled="disabled"')+'>Complete Audit</button>').click(function(){
            localStorage.setItem('last','{}');
            location.href = completeHREF;
        });
        
        if(!completeHREF)
            localStorage.setItem('contact','{"name":"","company":"","zip":"","notes":""}');
        
        function undo(){
            
            
            var model = lastAction.model;
            model = model.substring(0,model.indexOf('--')).trim();
            if(lastAction.damage)
            {
                var p = repairBody.find('tr:contains("'+model+'"):contains("'+lastAction.damage+'") input');
                if(p.length==0)
                    p = recycleBody.find('tr:contains("'+model+'"):contains("'+lastAction.damage+'") input');
            }
            else
            {
                var p = goodBody.find('tr:contains("'+model+'") input');
                
                
                
                if(p.length==0)
                    p = recycleBody.find('tr:contains("'+model+'") input');
            }
            localStorage.setItem('last','{}');
            
            if(p.length)
            {
                oldModel.val(lastAction.val);
                oldQTY.val(lastAction.qty*-1);
                oldDamage.val(lastAction.damage);
                var del = p.parent().parent().find('button');
                
                
                if(lastAction.qty>=p.val())
                {
                    del.click();
                }
                else
                {
                    oldSubmit.click();
                }
            }
            
            return false;
        }
        
        var buckets = $('<div class="col-sm-12"/>')
        .append($('<div class="row"/>')
                .append($('<div class="row"/>').append($('<span id="ActionInfo" class="alert alert-info col-sm-offset-4 hidden-print col-sm-4" style="text-align: center;'+(lastAction.model?'':'display:none')+'">Last Added: '+lastAction.model+' x '+lastAction.qty+' '+lastAction.damage+'</span>')
                                                       .append($('<span style="margin-left:10px"/>')
                                                               .append($('<a href="#" style="color:#b94a48">Undo</a>').click(undo)))))
                .append($('<div class="panel panel-default"/>')
                        .append($('<div class="panel-heading">')
                                .append('<span class="lead">Total Audited: '+totalAudited+'</span><span>('+totalCount+' Count)</span>')
                                .append(completeBtn))
                        .append($('<div class="panel-body"/>')
                                .append($('<div class="col-sm-12"/>')
                                        .append(bPanel)))
                        .append('<div class="row"><div class="col-sm-12"><button type="button" class="btn btn-danger btn-xs hidden-print">Clear Cart</button></div></div>')));
        
        //bPanel.prepend();
        var clearBtn = buckets.find('button:contains("Clear Cart")');
        var clearLink = $('a:contains("clear cart")');
        
        clearBtn.click(function(){
            location.href = clearLink.attr('href');
        });
        
        var i='';
        if(lastAction.val)
        {
            
            buckets.find('#ActionInfo').popover(getPopover(lastAction.model,lastAction.val));
            var lastModel = lastAction.model.substring(0,lastAction.model.indexOf(' -- '));
            var row = buckets.find('tr:contains("'+lastModel+'")');
            if(lastAction.damage)
                row = row.filter(':contains("'+lastAction.damage+'")');
            if(row.length>0)
                $(row[0]).addClass('alert alert-info');
            
        }
        return buckets;
    }
});