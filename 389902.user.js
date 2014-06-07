// ==UserScript==
// @name       http://cs.p0laris0ffice.c0m/
// @namespace  
// @version    0.19
// @description  nothing
// @match      http://cs.polarisoffice.com/cs/*
// @copyright  2014
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('#content').change(function(){
    var content = $('#content').val();
    if(content[0] != '!')
        return;
    content = content.substr(1);
    $('#content').val(content);
    if(/	삼성앱스	/.exec(content))
    {
        var match = /([^	]*)	([^	]*)	([^	]*)	([^	]*)	([^	]*)	([^	]*)	([^	]*)/m.exec(content);
        if(match)
        {
            $('#os').val('1').trigger("chosen:updated");
            //$('#device-manufacturer').val('삼성전자');
            $('#contact-path').val('CP11').trigger("chosen:updated");
            
            $('#create-date').val(match[1]);
            $('#문의경로').val(match[2]);
            $('#유형').val(match[3]);
            $('#product-version').val(match[4]);
            $('#문의내용').val(match[5]);
            $('#답변').val(match[6]);
            $('#device-model').val(match[7]);
            
            var name = /^"?([^,]+),/.exec(match[5]);
            if(name)$('#name').val(name[1]);
            if(name)$('#title').val(name[1]);
            
            var txt = 
                "접수일 : " + match[1] + "\n"+
                "문의경로 : " + match[2] + "\n"+
                "유형 : " + match[3] + "\n"+
                "제품이름 : " + match[4] + "\n"+
                "단말 : " + match[7] + "\n" +
                "문의내용 : " + match[5] + "\n"+
                //"답변 : " + match[6] + "\n"+
                "";
            $('#content').val(txt);
        }
    }
    else
    {
        $('#contact-path').val('CP02').trigger("chosen:updated");
        
        if(/단말기 명칭 *: */.exec(content))
        {
            $('#country').val('ko');
            $('#lang').val('kr').trigger("chosen:updated");
        }
        if(/Name of Device *: */.exec(content))
        {
            $('#country').val('en');
            $('#lang').val('en').trigger("chosen:updated");
        }
        
        var date = /Sent: (.+)/.exec(content);
        if(date)
        {
            date = new Date(date[1]); 
            date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 );
            date = date.toISOString();
            date = date.substr(0,10);
            $('#create-date').val(date);
        }
        
        //var type = /◆ 문의 유형\s*\n\s*([^\n]+)\n/m.exec(content);
        //if(type)$('#inquiry-type').val(type[1]).trigger("chosen:updated");;
        var email = /\[mailto:(.+)\]/m.exec(content);
        if(email)$('#email').val(email[1]);
        var email = /Subject\s*:\s*(.+)/.exec(content);
        if(email)$('#title').val(email[1]);
        var name = /◆ 이 름\s*([^\n]+)\n/m.exec(content);
        if(name)$('#name').val(name[1]);
        var device = /(단말기 명칭|Name of Device) *: *([^\n]*)\n/.exec(content);
        if(device)$('#device-model').val(device[2]);
        var osversion = /(OS 버전|Version of OS) *: *([^\n]*)\n/.exec(content);
        if(osversion)$('#os-version').val(osversion[2]);
        var productversion = /(POLARIS Office 버전|Version of POLARIS Office)\s*:\s*(.+)/.exec(content);
        if(productversion)$('#product-version').val(productversion[2]);
    }
});
