// ==UserScript==
// @name                Kazançlı Eppek
// @version             0.1
// @description         erepublik uygun fiyata eppek
// @include             http://*.erepublik.com/*
// @include             https://*.erepublik.com/*
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require             http://www.mehmetduran.com/files/jquery_cookie/cookie.js
// @author              Negian
// ==/UserScript==

$(function(){

    $("body").append("<style> .sabit a{color:green; text-align:left;} .yeni a{color:blue; text-align:left;}</style>");
    $("#sidebar_missions").after('<div id="cizgi" style="border-bottom:1px solid #dfdfdf; box-shadow: 0 1px 0 rgba(255,255,255,0.9); margin-top:20px;"></div><div id="ust" style="padding-top:10px; text-align:center; color: #5a5a5a; font-weight:bold;"><p style="cursor:pointer; font-size:15px;" id="eppekmain" >Kazançlı Food</p></br><div id="eppek"><div id="eppekbutton" style="cursor:pointer;">Fiyatlara Bak</div></div></div>');
   var durum = 1;
    $("#eppekmain").click(function(){
    
if (durum==1){ $("#eppek").hide(); durum=0; }else{$("#eppek").show(); durum=1;}
    
    
    });
    
   $("#eppekbutton").click(function(){
$("#eppek").html('<div id="eppekbutton">Fiyatlara Bak</div>');
    getDataAndInjectCode(1);
    $("#eppek").append("Yükleniyor...")
    });
    
    
});


function getDataAndInjectCode(urun)
{
        GM_xmlhttpRequest({
                url: 'http://www.erepublik.com/tr/economy/market/43/1/'+urun+'/citizen/0/price_asc/1',
                method: 'GET',
                onload: function(response) {
                        
                        var strToParse = $('td.m_price.stprice', response.responseText).find('sup').html();/*
                        strToParse = $.trim(strToParse);*/
                        strToParse = strToParse.replace('.', ' ');
                                
                        var fiyat = strToParse.split(' ');
            var hp = [0,2,4,6,8,10,12,20];
            $.cookie("urun"+urun, null, {expires: -1});
            $.cookie("urun"+urun, (fiyat[1]/hp[urun]).toFixed(2));
            $.cookie("urunf"+urun, fiyat[1]);
            if(urun==7){   
            var a = [$.cookie("urun1"), $.cookie("urun2"), $.cookie("urun3"), $.cookie("urun4"), $.cookie("urun5"), $.cookie("urun6"), $.cookie("urun7"), ]
            a.sort(sortmyway);
            $("#eppek").html('<div id="eppekbutton">Fiyatlara Bak</div>');
            for(var i=1; i<8; i++){
            
            if ($.cookie("urun"+i)==a[0]){
            $("#eppek").append('<p class="sabit"><a href="http://www.erepublik.com/tr/economy/market/43/1/'+i+'/citizen/0/price_asc/1">q'+i+' 0.'+$.cookie("urunf"+i)+' hpb: '+$.cookie("urun"+i)+'</a></p>');
            }else{
            
             $("#eppek").append('<p class="yeni"><a href="http://www.erepublik.com/tr/economy/market/43/1/'+i+'/citizen/0/price_asc/1">q'+i+' 0.'+$.cookie("urunf"+i)+' hpb: '+$.cookie("urun"+i)+'</a></p>');
            }
            
            }
            
            
            }else{
            var sayi = parseInt(urun)+1;
                getDataAndInjectCode(sayi);}
                },
                onerror: function() {
                        alert('Bir hata oluştu');
                }
        });
}

function sortmyway(data_A, data_B)
{
    return (data_A - data_B);
}
