// ==UserScript==
// @name        EEntityLinking
// @namespace   EEntityLinking
// @include     https://research.relsci.com/LinkingAndStandardization/ChangeLinks/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==



this.$ = this.jQuery = jQuery.noConflict(true);


$(document) .ready(function () {
    var einnum;
    var ciknum;
    var crdnum;
    
    $('.row-fluid #left .island-bubble i.icon-chevron-down') .on('click', function () {
        //$(this).closest(".island-bubble").css( "background-color", "red" );
        $(this) .closest('.island-bubble') .find('.bubble-detail .table tr') .each(function () {
         var flag = $(this) .closest('.island-bubble') .find('.bubble-detail').css('display').trim();  
            
            //table name
            var customerId = $(this) .find('td:first-child') .html() .trim();
        
            
            /*--------------Ein search---------------------*/
            //Ein no
            var $einNo = $('<input/>') .attr({
                type: 'button',
                name: 'btn1',
                id : 'einno',
                value: 'E'
            });
            $einNo.css({
                'width': '19px',
                'height': '19px',
                'border-radius': '50px',
                '-moz-border-radius': '50px',
                '-webkit-border-radius': '50px',
                '-khtml-border-radius': '50px',
                'font-size': '8px',
                'color': '#666',
                'line-height': '100px',
                'text-align': 'center',
                'background': '#ddd',
                'border': '1px solid #ccc'
            });
            if (customerId == 'EIN') {
                //alert(flag);
                if(flag == 'block'){
                   $('#einno').remove();
                }else if(flag == 'none'){
                einnum = $(this) .find('td:nth-child(2) span') .html().trim();
                $(this) .find('td:nth-child(2)') .last() .append($einNo);
                }
                
                //button listener
                $('#einno').on('click', function(){
                   einnum = einnum.replace("-","");
                    var formUrl = "http://990finder.foundationcenter.org/990results.aspx?990_type=&fn=&st=&zp=&ei="+einnum+"&fy=&action=Find";
                    var eriURL = "http://www.eri-nonprofit-salaries.com/index.cfm?FuseAction=NPO.Summary&EIN="+einnum+"&BMF=1&Cobrandid=0&Syndicate=No";                  
                    window.open(formUrl);
                    window.open(eriURL);
                });
                } //end of if
                
               /*-----------------Ein Search finished-----------*/ 
                
                
                
                /*--------------CIK search---------------------*/
            //CIK no
            var $cikNo = $('<input/>') .attr({
                type: 'button',
                name: 'btn1',
                id : 'cikno',
                value: 'C'
            });
            $cikNo.css({
                'width': '19px',
                'height': '19px',
                'border-radius': '50px',
                '-moz-border-radius': '50px',
                '-webkit-border-radius': '50px',
                '-khtml-border-radius': '50px',
                'font-size': '8px',
                'color': '#666',
                'line-height': '100px',
                'text-align': 'center',
                'background': '#ddd',
                'border': '1px solid #ccc'
            });
            if (customerId == 'CIK') {
                //alert(flag);
                if(flag == 'block'){
                   $('#cikno').remove();
                }else if(flag == 'none'){
                ciknum = $(this) .find('td:nth-child(2) span') .html().trim();
                $(this) .find('td:nth-child(2)') .last() .append($cikNo);
                }
                
                //button listener
                $('#cikno').on('click', function(){
                   var cikUrl = "http://www.sec.gov/cgi-bin/browse-edgar?company=&match=&CIK="+ciknum+"&filenum=&State=&Country=&SIC=&owner=exclude&Find=Find+Companies&action=getcompany";
                    window.open(cikUrl);
                    
                });
	             } //end of if
                
               /*-----------------CIK Search finished-----------*/ 
            
            
            
            
            
            /*--------------ADV search---------------------*/
            //ADV no
            var $crdNo = $('<input/>') .attr({
                type: 'button',
                name: 'btn1',
                id : 'crdno',
                value: 'A'
            });
            $crdNo.css({
                'width': '19px',
                'height': '19px',
                'border-radius': '50px',
                '-moz-border-radius': '50px',
                '-webkit-border-radius': '50px',
                '-khtml-border-radius': '50px',
                'font-size': '8px',
                'color': '#666',
                'line-height': '100px',
                'text-align': 'center',
                'background': '#ddd',
                'border': '1px solid #ccc'
            });
            if (customerId == 'CRD') {
                //alert(flag);
                if(flag == 'block'){
                   $('#crdno').remove();
                }else if(flag == 'none'){
                crdnum = $(this) .find('td:nth-child(2) span') .html().trim();
                $(this) .find('td:nth-child(2)') .last() .append($crdNo);
                }
                
                //button listener
                $('#crdno').on('click', function(){
                   var crdUrl = "http://brokercheck.finra.org/Search/SearchResults.aspx?SearchGroup=Firm&IndlText="+crdnum+"&FirmText="+crdnum+"&PageNumber=1";
                    window.open(crdUrl);
                    
                });
	             } //end of if
                
               /*-----------------ADV Search finished-----------*/ 
                
                
                
                
           
        });
        
        
    });
    
    
    
}) //end of document ready
