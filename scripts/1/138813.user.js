// ==UserScript==
// @name       live.com account autofill creator
// @namespace  http://1001plan.com/autofill/
// @version    1.04
// @description  live.com account autofill creator
// @author         Fnsoxt
// @include        https://signup.live.com/*
// @include        https://login.live.com/*
// @include        http://*.mail.live.com/*
// @include        https://*.mail.live.com/*
// @include        https://*.azure.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @license        Creative Commons Attributive Share-Alike 3.0
// ==/UserScript==
var host = window.location.host;
var url = document.location.href;
console.log("host:"+host);
if(host == "signup.live.com"){
    var imembernamelive = 'du'+Math.ceil(Math.random()*10000000);
    document.getElementById("imembernamelive").value = imembernamelive;
    
    var domain_count = document.getElementById('idomain').options.length;
    if(domain_count == 3)
        document.getElementById('idomain')[2].selected = true;
    else
        document.getElementById('idomain')[1].selected = true;
    
    document.getElementById('iPwd').value='dugoohoo00';
    document.getElementById('iRetypePwd').value='dugoohoo00';
    // sec question
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click",true,true);
    document.getElementById("iqsaswitch").dispatchEvent(evt);
    document.getElementById('iSQ')[5].selected = true;
    document.getElementById('iSA').value = 'zhangxun';
    document.getElementById('iAltEmail').value = 'dd@dd.com';
    
    document.getElementById('iLastName').value = 'hu';
    document.getElementById('iFirstName').value = 'care';
    document.getElementById('iCountry')[137].selected = true;
    document.getElementById('iZipCode').value = '000000000';
    document.getElementById('iGender')[1].selected = true;
    document.getElementById('iBirthYear')[16].selected = true;
    document.getElementById('iBirthMonth')[3].selected = true;
    document.getElementById('iBirthDay')[3].selected = true;
    
    if( window.webkitNotifications && window.webkitNotifications.checkPermission() != 0 ) {
        window.webkitNotifications.requestPermission();
    }
    document.getElementsByClassName('hipInputText')[0].focus();
    var notification = webkitNotifications.createNotification(
        "favicon.ico",  // icon url - can be relative
        '刷帐号',  // notification title
        '新的一轮开始了'
    );
    notification.show();
    setTimeout(function() {
        notification.cancel();
    }, 3000);
}
else if(host.match(/mail.live.com/ig)){
    window.location.href="http://datamarket.azure.com/register";
}
else if(host == "datamarket.azure.com"){
    if(url == "https://datamarket.azure.com/register"){
        document.getElementById('FirstName').value = 'care';
        document.getElementById('LastName').value = 'hu';
        document.getElementById('OptIntoMarketing').checked = true;
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementsByClassName('largelinkbutton')[0].getElementsByTagName('span')[0].dispatchEvent(evt);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementById('agreeToTerms').dispatchEvent(evt);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementsByClassName('largelinkbutton')[0].getElementsByTagName('span')[0].dispatchEvent(evt);
    }
    else if(url == "https://datamarket.azure.com/"){
        window.location.href="https://datamarket.azure.com/checkout/f8dd227c-90a1-475f-90d1-2a241732f3ea?ctpa=False";
    }
    else if(url == "https://datamarket.azure.com/checkout/f8dd227c-90a1-475f-90d1-2a241732f3ea?ctpa=False"){
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementById('agree-to-terms').dispatchEvent(evt);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementsByClassName('largelinkbutton')[0].dispatchEvent(evt);
    }
    else if(url == "https://datamarket.azure.com/receipt/f8dd227c-90a1-475f-90d1-2a241732f3ea?ctpa=False"){
        window.location.href="https://datamarket.azure.com/checkout/903a3d3d-ae05-46a8-82e6-ed24691071e7?ctpa=False";   
    }
    else if(url == "https://datamarket.azure.com/checkout/903a3d3d-ae05-46a8-82e6-ed24691071e7?ctpa=False"){
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementById('agree-to-terms').dispatchEvent(evt);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click",true,true);
        document.getElementsByClassName('largelinkbutton')[0].dispatchEvent(evt);
    }
    else if(url == "https://datamarket.azure.com/receipt/903a3d3d-ae05-46a8-82e6-ed24691071e7?ctpa=False"){
        window.location.href="https://datamarket.azure.com/account";
    }
    else if(url == "https://datamarket.azure.com/account"){
        var account = document.getElementsByClassName('static')[3].innerHTML;
        var options = document.getElementsByTagName('td')[1].innerHTML;
        
        $.getJSON("http://localhost/account_add?account="+account+"&password=dugoohoo00&options="+encodeURIComponent(options)+"&format=json&jsoncallback=?",
                  function(data){
                      console.log(data);
                  });
        window.location.href="https://datamarket.azure.com/signout";
    }
    else if(url.match(/datamarket.azure.com\/\?lc=.*/ig)){
        window.location.href="http://www.live.com";
    }
}
else if(host == "login.live.com"){
    if(url == "https://login.live.com/login.srf?wa=wsignin1.0&wtrealm=https%3a%2f%2faccesscontrol.windows.net%2f&wreply=https%3a%2f%2fdatamarketmarketplace.accesscontrol.windows.net%3a443%2fv2%2fwsfederation&wp=MBI_FED_SSL&wctx=cHI9d3NmZWRlcmF0aW9uJnJtPWh0dHBzJTNhJTJmJTJmZGF0YW1hcmtldG1hcmtldHBsYWNlLmFjY2Vzc2NvbnRyb2wud2luZG93cy5uZXQlMmZ2MiUyZm1nbXQlMmZzZXJ2aWNlJnJ5PWh0dHBzJTNhJTJmJTJmZGF0YW1hcmtldG1hcmtldHBsYWNlLmFjY2Vzc2NvbnRyb2wud2luZG93cy5uZXQlM2E0NDMlMmZ2MiUyZm1nbXQlMmZ3ZWIlMmZzaWduaW4mY3g9JTJmdjIlMmZtZ210JTJmd2Vi0"){
        window.location.href="http://www.live.com";
    }
    else if(url.match(/wp=MBI_SSL_SHARED&wreply=https:%2F%2Fhome.live.com%2F&lc=1033&id=251248&cbcxt=hom&mkt=en-US/ig)
            || url.match(/wp=MBI_SSL_SHARED&wreply=https:%2F%2F.*.live.com%2Fdefault.aspx/ig)){
        window.location.href="https://signup.live.com/signup.aspx?wa=wsignin1.0&rpsnv=11&ct=1343180319&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fhome.live.com%2F&id=251248&cbcxt=hom&bk=1343180320&uiflavor=web&mkt=EN-US&lc=1033";
    }
}