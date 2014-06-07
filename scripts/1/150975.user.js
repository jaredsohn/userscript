// ==UserScript==
// @name       PBAudit Cart
// @namespace  http://www.pacebutler.com
// @version    1.2.2
// @description  Adds usefull features to PBAudit Cart
// @match      http://earth/cellaudit/audit.cfm*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @copyright  2012+, Roger
// ==/UserScript==
(function(){
    function updateModelColor()
    {
        var s = $('#Model>:selected').css('color');
        $('#Model').css('color',s);
        loadimage('previewimage','mainform',$('#Model').val());
        //unsafeWindow.LoadCellInfo($('#Model').val());
        var mid = $('#Model').val().split('~')[1];
        $.ajax("LoadDetail.cfm?CellModelID="+mid+"&sid="+Math.random()).done(function(data){
            var d = $(data);
            d.find('font').removeAttr('size');
            $('#cell-detail').empty().append(d);
        });
        
    }
    //new loadimage so that it correctly finds the cross refrenced image
    function loadimage(imgName,formname,theval){
        var theImage = theval.split('~');
        var i = theImage[0].indexOf(' - ');
        var name;
        if(i>=0)
        {
            var cross = theImage[0].substr(0,i);
            i = theImage[2].indexOf(cross);
            name = theImage[2].slice(0,i)+theImage[2].slice(i+cross.length+1);
        }
        else
        {
            i=0;
            name = theImage[2];
        }
        
        
        FullPath = "http://earth/cellaudit/images/"+name;
        document.images[imgName].src = FullPath;
    }
    $(function(){
        
        
        //build list of repair-stock phones
        //and fix the colors of the options
        var repairModels = [];
        var recycleModels = [];
        var allModels = [];
        
        function isRepair(row)
        {
            
            var man = $(row).find('td:eq(0)').text();
            var model = $(row).find('td:eq(1)').text();
            var filter=options.filter(':contains("'+model+' -- '+man+'")');
            var rep=false;
            filter.each(function(){
                var i = $(this).text().indexOf(model+' -- '+man);
                if(i==0)
                {
                    rep=$(this).css('color')!='black';
                    return false;
                }
            });
            //var rep = filter.css('color')!='black';
            
            return rep;
        }
        
        function isDamaged(row)
        {
            return $(row).is(':contains("D:")')||$(row).is(':contains("Recycle")');
        }
        
        $('#Model>option').each(function(){
            var t = $(this);
            if(t.text()!='--Model--')
            {
                allModels.push(t.text());
                var c = t.css('color');
                
                if(c=='rgb(0, 0, 0)')
                {
                    recycleModels.push(t.text());
                    t.css('color','black');
                }
                else
                {
                    repairModels.push(t.text());
                }
            }
        });
        
        //cache the full options list
        var options = $('#Model>option:gt(0)').clone();
        var recOp = $('#Model>option:contains("Recycle")');
        
        
        //fix the width of the model select
        $('#Model').css('width',$('#Model').width());
        
        //add count div
        $('b:contains("Model -- Manufacturer")').after($('<b><div id="count" style="float:right;color:red"/></b>'));
        $('#Model').removeAttr('onblur').removeAttr('onchange');
        //$('#count').css('float','right');
        
        $('#realtxt').removeAttr('onblur').removeAttr('onfocus').removeAttr('onkeyup');
        
        $('#realtxt').attr('autocomplete','off');
        $('[name|="Qty"]').attr('autocomplete','off');
        var disable = false;
        //add hook to select qty feild when * is pressed in realtxt field
        $('#realtxt').keydown(function(e){
            if(e.which==106)
            {
                $('[name|="Qty"]').focus();
                return false;
            }
            //up
            if(e.which==38)
            {
                $($('#Model>:selected')[0]).prev().attr('selected','true');
                updateModelColor();
                disable=true;
            }
            //down
            if(e.which==40)
            {
                $($('#Model>:selected')[0]).next().attr('selected','true');
                updateModelColor();
                disable=true;
            }
        });
        
        //add hook to search box to select and filter options
        $('#realtxt').keyup(function(){
            if(disable)
            {
                disable=false;
            }else
            {
                //find options that match search text
                var text = $(this).val();
                var matches = [];
                var bestIndex = 1000;
                var best;
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
                $('#Model>option').remove();
                
                if(text=='')
                {
                    best = $('<option selected="" value="~~spacer.gif~">--Model--</option>');
                    $('#Model').append(best);
                    
                    
                }
                //add back matches
                $.each(matches,function(){
                    $('#Model').append(this);
                });
                
                //select best match
                if(best)
                    best.attr('selected','true');
                
                if(matches.length<=0)
                {
                    $('#Model').append(recOp);
                    recOp.attr('selected','true');
                    loadimage('previewimage','mainform','Recycled~1045~RecycledPhonesRecycled.gif~Use this instead of scrap');
                    
                }
                updateModelColor();
                //update count
                $('#count').text('...('+(matches.length-1)+' other matches)');
                if(text==''||matches.length==1)
                    $('#count').text('');
                if(matches.length==0)
                    $('#count').text('NO MATCHES');
            }
        });
        
        
        
        $('#Model').change(function(){
            updateModelColor();
        });
        
        //add hook to check to see if typing without an input or select selected
        $('body').keydown(function(e){
            var t = $(e.target);
            if(e.keyCode!=9)
            {
                if(!(t.is('select')||t.is('input')))
                {
                    $('#realtxt').focus();
                }
            }
        });
        
        
        
        var auditTable = $('table:eq(1)>tbody>tr>td:eq(0)>table>tbody>tr>td>table');
        auditTable.hide();
        var update = auditTable.find('a:contains("update quantites")');
        update.text('Update Quantites');
        var complete = auditTable.find('a:contains("Complete Audit >>"):eq(0)');
        var clear = auditTable.find('a:contains("clear cart"):eq(0)');
        clear.text('Clear Cart');
        
        var audited = auditTable.find('tr[bgcolor|="#eeeeee"]').parent().find('tr:gt(0)');
        audited = audited.filter(':lt('+(audited.length-4)+')');
        var goodRows = [];
        var counts = [0,0,0];
        var repRows = [];
        var recRows = [];
        audited.each(function(){
            var t = $(this);
            var cRow = t.clone();
            
            cRow.find('input').change(function(){
                t.find('input').val($(this).val());
            });
            
            if(isDamaged(this))
            {
                if(isRepair(this))
                {
                    repRows.push(cRow);
                    counts[1]=counts[1]+(t.find('input').val()-0);
                }
                else
                {
                    recRows.push(cRow);
                    counts[2]=counts[2]+(t.find('input').val()-0);
                }
            }
            else
            {
                goodRows.push(cRow);
                counts[0]=counts[0]+ (t.find('input').val()-0);
            }
        });    
        var total = counts[0]+counts[1]+counts[2];
        var rec = $('font:contains("Recycled Phones")').parent().parent().find('input').val();
        var mifi = $('font:contains("MIFI")').parent().parent().find('input').val();
        var usb = $('font:contains("USB AIRCARD")').parent().parent().find('input').val();
        var ot = $('font:contains("Other Device")').parent().parent().find('input').val();
        rec = rec?rec:0;
        mifi = mifi?mifi:0;
        usb = usb?usb:0;
        ot=ot?ot:0;
        console.log(ot);
        var cur = total;
        counts[0] = counts[0];
        
        
        //build new table to display
        var table = $('<table cellpadding="5" cellspacing="0" bgcolor="#ffffff" border="0" width="350"/>').css('padding',0);
        
        var goodDiv = $('<div/>').css('border','1px solid black').css('float','left');
        var goodTable = table.clone();
        goodDiv.append(goodTable);
        var goodBody = $('<tbody/>');
        goodTable.append(goodBody);
        var goodHead = $('<tr bgcolor="green"><td><b>Mfg</b></td><td><b>Model</b></td><td align="right"></td><td align="right"><b>Qty</b></td><td></td><td></td><td></td></tr>');
        goodBody.append(goodHead);
        
        $.each(goodRows,function(){
            goodBody.append(this);
        });
        
        
        var repDiv = $('<div/>').css('border','1px solid black').css('float','left');
        var repTable = table.clone();
        repDiv.append(repTable);
        var repBody = $('<tbody/>');
        repTable.append(repBody);
        var repHead = $('<tr bgcolor="blue"><td><b>Mfg</b></td><td><b>Model</b></td><td align="right"></td><td align="right"><b>Qty</b></td><td></td><td></td><td></td></tr>');
        repBody.append(repHead);
        
        $.each(repRows,function(){
            repBody.append(this);
        });
        
        
        var recDiv = $('<div/>').css('border','1px solid black').css('float','left');
        var recTable = table.clone();
        recDiv.append(recTable);
        var recBody = $('<tbody/>');
        recTable.append(recBody);
        var recHead = $('<tr bgcolor="grey"><td><b>Mfg</b></td><td><b>Model</b></td><td align="right"></td><td align="right"><b>Qty</b></td><td></td><td></td><td></td></tr>');
        recBody.append(recHead);
        
        $.each(recRows,function(){
            recBody.append(this);
        });
        
        var newTable = $('<table/>').css('border','1px solid black');
        var newBody = $('<tbody/>');
        newTable.append(newBody);
        var totalRow = $('<tr style="font-size:125%"/>');
        var t1 = total;
        var t2 = t1 - rec - ot-usb-mifi;
        var c1 = rec?'<span style="font-size:x-small"> ('+t2+' count)</span>':'';
        totalRow.append('<td><b>Total Audited:</b> '+t1+c1+'<br><span style="font-size:xx-small">(USBs and MIFIs don\'t add to totals)</span></td>');
        newBody.append(totalRow);
        
        var countRow = $('<tr style="font-size:125%"/>');
        countRow.append('<td><b>Good:</b> '+counts[0]+'</td>');
        countRow.append('<td><b>Repair:</b> '+counts[1]+'</td>');
        countRow.append('<td><b>Recycle:</b> '+counts[2]+'</td>');
        newBody.append(countRow);
        
        var newRow = $('<tr/>');
        newBody.append(newRow);
        var goodTD = $('<td valign="top"/>');
        goodTD.append(goodDiv);
        newBody.append(goodTD);
        var repTD = $('<td valign="top"/>');
        repTD.append(repDiv);
        newBody.append(repTD);
        var recTD = $('<td valign="top"/>');
        recTD.append(recDiv);
        newBody.append(recTD);
        
        auditTable.before(newTable);
        newTable.before(update);
        newTable.before(complete.css('float','right'));
        newTable.after(clear);
        newTable.before('<br>');
        auditTable.hide();
        
        //move preview image to more usefull spot
        var nDiv = $('<div/>').css('width',400).css('float','right');
        nDiv.append($('[name|="previewimage"]').css('float','left').css('max-width',200).css('max-height','250px'));
        nDiv.append($('#cell-detail').css('font-size','80%'));
        $('[name|="mainform"]>table').css('float','left').after(nDiv);
        $('[name|="mainform"]').parent().find('h3').css('clear','both');
        
        var links = $('<div>');
        
        //add link to search google for hard reset info on phone model
        var url = 'https://www.google.com/search?q=hard+reset+';
        var restrict = '+-askmefast.com+-helpowl.com';
        var hr = $('<a href="#">Hard Reset</a>').css('display','inline-block').click(function(){
            window.open(url+$('#Model > option:selected').text()+restrict);
        });
        var pg = $('<a href="#">Phone Guide</a>').css('display','inline-block').css('margin-left','5px').click(function(){
            window.open('https://docs.google.com/a/pacebutler.com/document/d/1mFH9pi6-DXmgEYyfTp-maw73ySc0RDjNZQIZir-yO10/edit');
        });
        var dp = $('<a href="#">Damage Price</a>').css('display','inline-block').css('margin-left','5px').click(function(){
            window.open('http://www.pacebutler.com/images/PBBrokenDamagedDefective.pdf');
        });
        
        
        var phonescoop = 'http://www.phonescoop.com/search/results.php?q=';
        var ps = $('<a href="#">PhoneScoop</a>').css('display','inline-block').css('margin-left','5px').click(function(){
            window.open(phonescoop+$('#realtxt').val());
        });
        
        
        links.append(hr).append(pg).append(dp);//.append(ps);//.append(cp);
        $('#Model').after(links);
        
        var guide = $('<iframe src="https://docs.google.com/a/pacebutler.com/document/d/1mFH9pi6-DXmgEYyfTp-maw73ySc0RDjNZQIZir-yO10;embedded=true"></iframe>').css('width','100%').css('height','100%');
        guide = $('<iframe src="https://docs.google.com/document/d/1AgL5BDpiG_Gnb9gn7xYgBshUUy8EJZPLp-Xh6esWEig/pub?embedded=true"></iframe>').css('width','100%').css('height','100%');
        //$('body').append(guide);
    });
})();