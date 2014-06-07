// ==UserScript==
// @name        MelhorPrecoCF
// @namespace   MelhorPrecoCF
// @include     *VP=*&gambiarra
// @grant       none
// @version     1.1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

    window.addEventListener('load', function()  { 
    
        var lista = "59,119,120,149,150,155,161,211,231,238,261,264,278,275,287,309,315,317,313,328,350,364,377,381,383,389,398,405,419,421,428,433,444,446,454,463,489,504,534,535,533,536,546,556,570,614,630,647,649,662,677,684,688,687,698,708,722,730,731,732,735,733,736,738,740,741,770,772,779,780,791,794,796,798,799,797,800,815,823,827,833,838,863,873,896,988,1008,1009,1024,1051,1052,1075,1080,1098,1109,1111,1143,1144,1146,1153,1157,1159,1158,1163,1168,1170,1175,1189,1190,1201,1209,1210,1211,1213,1216,1218,1220,1223,1225,1233,1235,1252,1251,1254,1260,1267,1268,1269,1272,1276,1277,1280,1282,1288,1296,1297,1301,1302,1308,1314,1317,1315,1326,1329,1330,1353,1396,1397,1398,1399,1401,1403,1400,1405,1404,1402,1419,1420,1422,1425,1428,1429,1441,1451,1453,1457,1458,1462,1473,1487,1496,1500,1502,1501,1506,1504,1508,1510,1514,1522,1529,1530,1531,1534,1533,1537,1565,1569,1571,1581,1587,1596,1607,1609,1625,1644,1645,1655,1659,1668,1685,1695,1702,1709,1708,1712,1715,1728,1733,1729,1742,1748,1751,1757,1760,1758,1759,1765,1766,1769,1770,1771,1774,1776,1775,1777,1783,1784,1785,1794,1796,1808,1814,1817,1820,1824,1827,1835,1836,1837,1838,1841,1840,1842,1844,1845,1843,1852,1853,1871,1899,1900,1902,1906,1907,1909,1910,1926,1927,1928,1935,1938,1939,1948,1956,1959,1964,1968,1969,1984,1997,1998,2001,2020,2021,2028,2029,2039,2038,2042,2043,2057,2058,2059,2062,2060,2061,2063,2066,2065,2067,2068,2069,2070,2071,2073,2072,2076,2077,2074,2078,2079,2082,2083,2086,2084,2085,2088,2090,2089,2092,2093,2094,2091,2098,2097,2096,2095,2104,2116,2118,2117,2119,2125,2136,2137,2148,2154,2161,2163,2166,2168,2178,2177,2180,2184,2182,2185,2187,2186,2196,2208,2211,2219,2223,2231,2246,2247,2254,2265,2266,2274,2273,2277,2280,2287,2293,2302,2308,2315,2321,2327,2328,2342,2343,2356,2361,2364,2369,2370,2377,2378,2375,2387,2396,2397,2404,2419,2418,2417,2422,2423,2426,2425,2427,2435,2446,2449,2450,2453,2454,2457,2459,2464,2465,2466,2469,2473,2476,2478,2477,2485,2494,2500,2529,2571,2579,2592,2596,2597,2599,2600,2602,2603,2607,2606,2608,2611,2617,2616,2620,2619,2621,2622,2623,2624,2626,2635,2636,2644,2646,2649,2650,2651,2655,2643,2656,2660,2682,2703,2704,2705,2710,2719,2720,2721,2722,2724,2726,2728,2729,2731,2732,2733,2736,2737,2743,2750,2752,2753,2754,2780,2787,2789,2793,2794,2795,2798,2799,2800,2801,2806,2803,2796,2812,2810,2811,2809,2813,2819,2816,2820,2818,2827,2831,2837,2838,2836,2843,2860,2864,2873,2877,2881,2883,2884,2885,2886,2897,2898,2899,2915,2917,2920,2919,2926,2927,2932,2928,2947,2961,2968,2973,2979,2985,2994,2996,3005,3016,3022,3028,3038,3041,3044,3053,3054,3057,3055,3064,3067,3069,3068,3071,3070,3072,3078,3084,3085,3086,3088,3089,3090,3087,3096,3106,3108,3110,3112,3114,3113,3115,3116,3117,3125,3124,3126,3127,3141,3145,3150,3154,3156,3157,3165,3170,3171,3174,3182,3189,3190,3201,3200,3203,3204,3202,3206,3205,3212,3227,3228,3229,3240,3236,3246,3262,3263,3276,3275,3291,3292,3302,3307,3311,3320,3323,3322,3325,3329,3331,3335,3338,3351,3353,3352,3354,3356,3361,3363,3368,3369,3370,3373,3374,3375,3379,3380,3381,3382,3383,3384,3385,3388,3386,3390,3391,3396,3395,3398,3399,3409,3411,3413,3414,3417,3419,3422,3421,3425,3428,3426,3437,3438,3439,3443,3442,3444,3445,3446,3451,3452,3449,3453,3454,3455,3457,3458,3456,3459,3460,3464,3462,3466,3475,3476,3477,3484,3492,3493,3494,3496,3495,3500,3497,3499,3507,3508,3513,3519,3526,3525,3528,3521,3527,3535,3534,3537,3540,3539,3541,3544,3545,3547,3548,3553,3552,3551,3558,3532,3560,3561,3562,3559,3568,3573,3571,3570,3576,3569,3579,3581,3587,3588,3591,3592,3593,3595,3608,3612,3614,3615,3611,3616,3622,3621,3624,3627,3623,3628,3630,3633,3634,3635,3639,3631,3636,3641,3644,3642,3648,3651,3652,3649,3654,3661,3663,3662,3667,3666,3670,3672,3675,3678,3679,3683,3686,3691,3693,3694,3695,3697,3699,3698,3696,3705,3704,3707,3708,3710,3709,3706,3711,3712,3713,3722,3721,3723,3724,3725,3729,3727,3730,3731,3737,3736,3735,3740,3742,3726,3750,3751,3749,3752,3755,3757,3746,3758,3764,3763,3766,3767,3768,3769,3771,3772,3773,3770,3775,3774,3777,3779,3782,3783,3781,3785,3784,3787,3788,3791,3797,3799,3798,3801,3802,3803,3812,3818,3817,3816,3824,3823,3825,3827,3828,3826,3829,3831,3830,3833,3835,3832,3834,3840,3843,3845,3844,3847,3846,3848,3849,3857,3860,3859,3882,3897,3898,3908,3909,3911,3910,3914,3918,3922,3923,3925,3927,3926,3928,3924,3929,3930,3931,3932,3935,3939,3938,3940,3936,3934,3933,3942,3937,3944,3955,3956,3957,3959,3961,3962,3960,3963,3958,3964,3965,3971,3969,3973,3972,3970,3980,3981,3983,3984,3985,3987,3988,3986,3989,3999,3982,4001,4002,4000,4003,4004,4005,4006,4007,4009,4008,4010,4012,4014,4011,4013,4016,4015,4017,4021,4022,4018,4020,4023,4019,4024,4025,4026,4028,4027,4030,4029,4032,4033,4034,4039,4055,4056,4057,4058,4059,4060,4061,4062,4063,4065,4064,4067,4066,4069,4070,4068,4072,4071,4073,4076,4074,4075,4077,4078,4083,4082,4085,4086,4084,4087,4088,4089,4090,4091,4094,4092,4093,4096,4095,4097,4098,4104,4099,4105,4100,4107,4106,4108,4109,4110,4111,4112,4114,4113,4116,4121,4118,4120,4119,4122,4123,4126,4127,4125,4115,4128,4124,4130,4129,4131,4132,4133,4135,4136,4134,4139,4137,4141,4144,4142,4143,4138,4146,4147,4148,4153,4149,4152,4150,4154,4151,4157,4140,4158,4155,4156,4160,4159,4161,4162,4164,4165,4167,4168,4166,4173,4174,4177,4176,4171,4175,4179,4178,4180,4172,4182,4181,4186,4185,4183";
        var start = "1";
        var end = "100";
        var timer = "350";
        var limit = "28";
    
        document.getElementsByTagName("head")[0].innerHTML="";           
        var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", "http://twitter.github.com/bootstrap/assets/css/bootstrap.css");document.head.appendChild(fileref);
                
        $('body').css("padding", "20px");
        $('body').html('<div class="row-fluid"> <div class="span6"> <form class="form-horizontal"> <input type="hidden" id="count" /> <div class="control-group"> <label class="control-label" for="lista">Usar lista de IDs:</label> <div class="controls"> <input type="checkbox" id="usaLista" checked /> </div> </div> <div class="control-group" id="divIniciar" style="display:none;"> <label class="control-label" for="start">Iniciar em:</label> <div class="controls"> <input type="text" id="start" value="'+ start +'" /> </div> </div> <div class="control-group" id="divAte" style="display:none;"> <label class="control-label" for="end">Até:</label> <div class="controls"> <input type="text" id="end" value="'+ end +'" /> </div> </div> <div class="control-group" id="divLista"> <label class="control-label" for="lista">Lista:</label> <div class="controls"> <input type="text" id="lista" value="'+ lista +'" /> </div> </div> <div class="control-group"> <label class="control-label" for="timer">Timer:</label> <div class="controls"> <input type="text" id="timer" value="'+ timer +'" /> </div> </div> <div class="control-group"> <label class="control-label" for="limit">Limite:</label> <div class="controls"> <input type="text" id="limit" value="'+ limit +'" /> </div> </div> <div class="control-group"> <label class="control-label" for="limit">Ocultar valores igual a:</label> <div class="controls"> <input type="text" id="valorExcluir" value="" /> <input type="button" value="Aplicar" class="btn" id="btnFiltro" /> </div> </div> <div class="control-group"> <div class="controls"> <input id="TEST" type="button" value="Iniciar" class="btn" /> <input id="CLEAN" type="button" value="Limpar" class="btn" /> <input id="STOP" type="button" value="Parar Envio" class="btn" /> </div> </div> </span> <div id="process_info" class="alert alert-info" style="display:none"></div> <div id="process_error" class="alert alert-error" style="display:none"></div> <div id="process_success" class="alert alert-success" style="display:none"></div> <div id="sucess" class="well"></div> <div id="result"></div> </div> <div class="span6"> <div id="log" class="well"></div> </div> </div>');
    
        document.getElementById('TEST').addEventListener('click', test, false);
        document.getElementById('CLEAN').addEventListener('click', clean, false);
        document.getElementById('STOP').addEventListener('click', myStopFunction, false);      
        document.getElementById('btnFiltro').addEventListener('click', aplicarFiltro, false);
        document.getElementById('usaLista').addEventListener('click', toogleCheck, false);
             
    });
    
    var myVar;
    var timerClear;
    var filtroAplicado = "";
    var tipoExecucao;
    var vetLista;
        
    function aplicarFiltro(){
    
        filtroAplicado = $("#valorExcluir").val();

        $("#sucess span").each(function (i) {                        
        	
        	if($(this).text() != filtroAplicado){
        		$(this).parent().show();
        	}
        	else
        		$(this).parent().hide();
        });
    }
    
    function toogleCheck(){
    
        if($("#usaLista").is(':checked')){
            $("#divLista").show();
            $("#divIniciar").hide(); 
            $("#divAte").hide(); 
        }
        else{
            $("#divLista").hide();
            $("#divIniciar").show(); 
            $("#divAte").show(); 
        }           
    }

    function test() {
    
        myVar = undefined;
        timerClear = undefined;
        filtroAplicado = "";
        tipoExecucao = undefined;
        vetLista = undefined;

        myStopFunction();
        
        hideAlerts();
        $("#process_info").show();         
                     
        var start;
        var end = $('#end').val();
        var timer = parseInt($('#timer').val());
        
        var url = window.location.href;

        var q = window.location.search.substr(1).match(/VP=\d+/);

        filtroAplicado = "";

        if (q == null){
            $("#process_error").html("Padrão não encontrado");
            hideAlerts();         
            $("#process_error").show();   
        }
        else {                     
            
            if($("#usaLista").is(':checked')){
                tipoExecucao = 2;                                               
                
                vetLista = $("#lista").val().split(",");
                
                var unique = [];
                $.each(vetLista, function(i, el){
                    el = el.trim();
                    if($.inArray(el, unique) === -1 && el != "") unique.push(el);
                });
                
                vetLista = unique;
                
                if(vetLista.length > 0 && vetLista[0].trim() != ""){
                                        
                    myVar=setInterval(function(){requestListaNext()}, timer);  
                    timerClear = setInterval(function(){timerListClearFunc()}, 1000);
                }
                else{
                    $("#process_error").html("Informe um valor no campo lista");
                    hideAlerts();         
                    $("#process_error").show();
                }
            }
            else{
                tipoExecucao = 1;
                start = $('#start').val();
                
                $('#count').val(start);            
                myVar=setInterval(function(){requestNext(start)}, timer);  
                timerClear = setInterval(function(){timerClearFunc()}, 1000);  
            }                      
        }
    }
    
    function requestNext(id){
    
        var end = parseInt($('#end').val());        

        var count = parseInt($('#count').val());        
        
        if(count <= end){        
            if($(".pending").length < parseInt($("#limit").val())){
                var newUrl = getNewURL(count);
                requisitar(newUrl, count);
                $('#count').val(count + 1);
            }
            else{
                $("#process_info").html("Aguardando fila");
            }
        }      
        else{
            clearInterval(myVar);
            $("#process_info").html("Aguardando resultados");
        }
    }
    
    function requestListaNext(){
            
        var count = "";
        
        while(count == "" && vetLista.length > 0){
            count = vetLista.shift(); 
        }        
        
        if(count != ""){        
            if($(".pending").length < parseInt($("#limit").val())){
                var newUrl = getNewURL(count);
                requisitar(newUrl, count);                
            }
            else{
                $("#process_info").html("Aguardando fila");
            }
        }      
        else{
            clearInterval(myVar);
            $("#process_info").html("Aguardando resultados");
        }
    }
    
    function timerClearFunc(){
        
        var len = $(".finished").length;
        
        if(len > 3){
            $(".finished").slice(0, parseInt(len/2)).remove(); 
        }
        else
            $(".finished").eq(0).remove();
        
        var end = parseInt($('#end').val());       
        var count = parseInt($('#count').val());
        
        if(count > end){
        
            $(".finished").remove();
            
            if($("#log").html() == ""){
                myStopFunction();             
                hideAlerts();        
                $("#process_success").show();                
                $("#process_success").html("Fim do processamento");
            }
        }         
    }
    
    function timerListClearFunc(){
        
        var len = $(".finished").length;
        
        if(len > 3){
            $(".finished").slice(0, parseInt(len/2)).remove(); 
        }
        else
            $(".finished").eq(0).remove();                   
        
        if(vetLista.length == 0){
        
            $(".finished").remove();
            
            if($("#log").html() == ""){
                myStopFunction();             
                hideAlerts();        
                $("#process_success").show();                
                $("#process_success").html("Fim do processamento");
            }
        }         
    }
    
    function hideAlerts(){
        $("#process_info").hide();         
        $("#process_error").hide();         
        $("#process_success").hide(); 
    }

    function clean() {
        $("#sucess").html('');
        $("#result").html('');
        $("#log").html('');
        $("#process_info").html("");
        $("#process_error").html("");
        $("#process_info").html("");
        hideAlerts();
    }

    function getNewURL(id){
                                        
        var end = $('#end').val();

        var url = window.location.href;

        var q = window.location.search.substr(1).match(/VP=\d+/);

        if (q == null) {
            alert("Padrão não encontrado");
            return false;
        }
        else{
            return url.replace(q, "VP=" + id);
        }        
    }
    
    function myStopFunction()
    {
        clearInterval(myVar);
        clearInterval(timerClear); 
    }

    function addLog(texto) {
        $('#log').append(texto + "<br/>");
    }

    function requisitar(url, id) {

        $("#process_info").html("Requisitando ID " + id);
        $("#result").append('<div id="result' + id + '"></div>');
        
        $('#log').append('<div class="pending" id="log' + id + '">ID=' + id + '<span>&nbsp;Aguardando Resposta</span></div>');

        $("#result" + id).load(url + ' .produto-por', function (response, status, xhr) {
            
            $("#log" + id).removeClass();
            $("#log" + id).addClass("finished");
            
            if (xhr.status == "200" && $("#result" + id).html() != "") {
            
                var preco = $("#result .produto-por strong").text();                    
            
                $("#sucess").append('<div><span>' + preco + '</span> (ID=' + id + ') - <a href="' + getNewURL(id).replace("&gambiarra", "") + '">Link</a></div>');
                
                aplicarFiltro();                
            }
            
            else if (status == "error" & xhr.status != "0") {
                $("#process_error").html('Erro - é necessário bloquear os cookies para esse site:<br/><ol><li>Vá em Ferramentas >> Propriedades da página</li><li>"Clique na aba Permissões"</li><li>Na sessão "Definir cookies", demarque a opção "Usar o padrão" e selecione a opção "bloquear"</li></ol>');
                hideAlerts();
                $("#process_error").show();                
                deletecookies(id);
                myStopFunction();
            }
            
            $("#log" + id + " span").html("&nbsp; Status:" + xhr.status + " - " + xhr.statusText);
            
            $("#result" + id).remove();                             
                        
        });
    } 
    
    function deletecookies(){
        var domain = document.domain;
        var domain2 = document.domain.replace(/^www\./, "");
        var domain3 = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, "$2");
        
        var cookieList = document.cookie.split(';');
        for (var J = cookieList.length - 1; J >= 0; --J) {
            var cookieName = cookieList[J].replace(/\s*(\w+)=.+$/, "$1"); 
            document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;domain=" + domain + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;domain=" + domain2 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;domain=" + domain3 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        }

    }