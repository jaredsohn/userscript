// ==UserScript==
// @name        gladiatus
// @namespace   as
// @include     http://*.gladiatus.gameforge.com/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require       http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
var g1=0,g2=0,g3=0,g4=0,espera=0;
this.$ = this.jQuery = jQuery.noConflict(true);
function get_url_vars(url, variable) {
    var arr = url.split("&");
    var values = "";
    for (i in arr) {
        var splits = arr[i].split("=");
        if (splits[0] == variable) {
            values = splits[1];
        }
    }
    return values;
}
function pelear() {
    //alert($(".title2_inner").html());
    www = document.URL;
    reloj=$("#cooldown_bar_ct").text().search("Turma"); 
    espera=Math.ceil(Math.random()*2);
    //alert(reloj);
    reloj1=$("#cooldown_bar_arena").text().search("Arena"); 
     if (www.indexOf("submod=showCombatReport") != -1 &&reloj1!=-1 && espera==1 && www.indexOf("t=2") != -1) {
        sss = www;
        sh = get_url_vars(sss, "sh");
        var host = "http://" + window.location.hostname + "/game/index.php?mod=arena&submod=serverArena&aType=2&sh=" + sh;
        //alert(host+"->"+reloj);
        window.location.href = host;
        //window.history.back(-1);
    }else
     if (www.indexOf("serverArena") != -1 && www.indexOf("aType=2") != -1 &&reloj1!=-1 && espera==1) {
  //      alert("mandando pelea");
        var p_data = new Array();
        var index_m = 0;
//        var value_m = 0;
                var value_m = 1000;

        $(".title2_inner tr").each(function(i) {
            if (i > 0) {

                a = new Array();
                a[0] = parseInt($(this).children("td:nth-child(2)").html());
                a[1] = $(this).children("td:nth-child(4)").find("span").attr("onclick").toString();
                a[2] = $(this).children("td:nth-child(1)").find("a").html();
                p_data[i] = a;

//                if (value_m< a[0] && a[2].indexOf("#") <0) {
                if (value_m> a[0] && a[2].indexOf("#") <0) {
                    index_m = i;
                    value_m = a[0];
                }

            }

            //alert(value_m + "--" + index_m+"-->"+i);
        });
        //alert(index_m + "-->" + value_m + ":" + p_data[index_m][1]);
        var parametros = p_data[index_m][1].substring(23, p_data[index_m][1].length - 2);
//        alert(index_m + "-->" + value_m + ":" + p_data[index_m][1]);

        //unsafeWindow.startProvinciarumFight(parametros);
        location.href = "javascript:void("+p_data[index_m][1].substring(0, p_data[index_m][1].length - 1)+");";
    }
    if (www.indexOf("submod=showCombatReport&t=3") != -1 &&reloj!=-1 && espera==1) {
        sss = www;
        sh = get_url_vars(sss, "sh");
        var host = "http://" + window.location.hostname + "/game/index.php?mod=arena&submod=serverArena&aType=3&sh=" + sh;
        //alert(host+"->"+reloj);
        window.location.href = host;
        //window.history.back(-1);
    }else
    if (www.indexOf("serverArena") != -1 && www.indexOf("aType=3") != -1 &&reloj!=-1 && espera==1) {
  //      alert("mandando pelea");
        var p_data = new Array();
        var index_m = 0;
//        var value_m = 0;
        var value_m = 1000;

        $(".title2_inner tr").each(function(i) {
            if (i > 0) {

                a = new Array();
                a[0] = parseInt($(this).children("td:nth-child(2)").html());
                a[1] = $(this).children("td:nth-child(4)").find("span").attr("onclick").toString();
                a[2] = $(this).children("td:nth-child(1)").find("a").html();
                p_data[i] = a;
 //               if (value_m < a[0] && a[2].indexOf("#") <0  ) {
                if (value_m > a[0] && a[2].indexOf("#") <0  ) {

                    index_m = i;
                    value_m = a[0];
                }

            }

            //alert(value_m + "--" + index_m+"-->"+i);
        });
        //alert(index_m + "-->" + value_m + ":" + p_data[index_m][1]);
        var parametros = p_data[index_m][1].substring(23, p_data[index_m][1].length - 2);
        //alert(index_m + "-->" + value_m + ":" + p_data[index_m][1]);

        //unsafeWindow.startProvinciarumFight(parametros);
        //mandar ataque
        location.href = "javascript:void("+p_data[index_m][1].substring(0, p_data[index_m][1].length - 1)+");";
    }
     setTimeout(pelear,2000);
}
function gladiadores(){
    //alert($("#tOoLtIp_p15_1_1").html());
    var www=document.URL;
    $("#banner_right").css("display","none");
    $("#footer_background").css("display","none");
    if(www.indexOf("overview")!=-1 && www.indexOf("doll=2")!=-1){
        var datas="<div id='accordion' style='position: fixed;bottom: 10px;right: 10px;'><h3 style='width:240px;'><a href='#'>1</a></h3><div id='g1'>"+$("#tOoLtIp_p12_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>2</a></h3><div id='g2'>"+$("#tOoLtIp_p13_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>3</a></h3><div id='g3'>"+$("#tOoLtIp_p14_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>4</a></h3><div id='g4'>"+$("#tOoLtIp_p15_1_1").html()+"</div></div>";
        var datas1="<div id='accordion' style='position: fixed;bottom: 10px;right: 10px; '><h3 style='width:240px;'><a href='#'>1</a></h3><div id='g1'>"+$("#tOoLtIp_p12_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>2</a></h3><div id='g2'>"+$("#tOoLtIp_p13_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>3</a></h3><div id='g3'>"+$("#tOoLtIp_p14_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>4</a></h3><div id='g4'>"+$("#tOoLtIp_p15_1_1").html()+"</div></div>";

        $("#char").after(datas);
        //$(".contentItem").before("<div id='accordion'><h3 style='width:240px;'><a href='#'>1</a></h3><div id='g1'>"+$("#tOoLtIp_p12_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>2</a></h3><div id='g2'>"+$("#tOoLtIp_p13_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>3</a></h3><div id='g3'>"+$("#tOoLtIp_p14_1_1").html()+"</div>"+"<h3 style='width:240px;'><a href='#'>4</a></h3><div id='g4'>"+$("#tOoLtIp_p15_1_1").html()+"</div></div>");
        $("#accordion").accordion();        
        localStorage.setItem("itemid", datas1);

        
    }
    if(www.indexOf("auction")!=-1 ){
        //var adatas=$.cookie("gladiadores_acordion");
        var values = localStorage.getItem("itemid");
        if(values){
        //#auction_table
            $("#auction_table").after(values);
            $("#accordion").accordion();        
            //localStorage.setItem("itemid", values);
        }
        
    }
}
function getParamNames(func) {
    var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}
function paquetes_change(){
    var nitem=0;
    var items=new Array();
    var suma=0;
    //alert("hola");
    $("#content #inv div").each(function(i){
        var a1=$(this).attr("id").toString();
        var a2=$(this).attr("style").toString().search("visible");
		
        if(a2>0){
            //p512_1_1->tOoLtIp_p512_1_1;tooltipBox
            //alert("tOoLtIp_"+a1);	
            var a3=$("#tOoLtIp_"+a1+" .tooltipBox:nth-child(1)").text().match(/Valor\ [0-9]+\.[0-9]+/);
            if(a3==null)
                a3=$("#tOoLtIp_"+a1+" .tooltipBox:nth-child(1)").text().match(/Valor\ [0-9]+/);				
            a3=a3.toString().replace("Valor ","").replace(".","");
            suma+=parseInt(a3);
            //alert(a3);
            //alert(dd.elements.a1.tooltip);
            items[nitem]=a1;
            nitem+=1;
        }
    });
    //alert(suma);
    //alert(nitem);	
    $("#glad_easy").html(suma);
//window.setTimeout(paquetes_change(),999);
}

function paquetes(){
    var nitem=0;
    var items=new Array();
    var suma=0;
    //alert("hola");
    $("#content #inv div").each(function(i){
        var a1=$(this).attr("id").toString();
        var a2=$(this).attr("style").toString().search("visible");
		
        if(a2>0){
            //p512_1_1->tOoLtIp_p512_1_1;tooltipBox
            //alert("tOoLtIp_"+a1);	
            var a3=$("#tOoLtIp_"+a1+" .tooltipBox:nth-child(1)").text().match(/Valor\ [0-9]+\.[0-9]+/);
            if(a3==null)
                a3=$("#tOoLtIp_"+a1+" .tooltipBox:nth-child(1)").text().match(/Valor\ [0-9]+/);				
            a3=a3.toString().replace("Valor ","").replace(".","");
            suma+=parseInt(a3);
            //alert(a3);
            //alert(dd.elements.a1.tooltip);
            items[nitem]=a1;
            nitem+=1;
        }
    });
    //alert(suma);
    //alert(nitem);
    $("#inv").append("<div id='glad_easy'>"+suma+"</div>");
    $("#glad_easy").css({
        'color':'#ff0',
        'position':'absolute',
        'top':'128px',
        'background-color':'#000'
    });	
	
}

$("#shop").mouseover(function() {
    paquetes_change();
});
$(".player_picture").mouseover(function() {
    paquetes_change();
});
$("#inv").mouseover(function() {
    paquetes_change();
});


$(function() {
    //total del oro
    var total_oro=$('#sstat_gold_val').html();
    var oferta_minima=new Array();
    var n=0;
    var combo=localStorage.getItem("combo");
    //alert(total_oro);
    //comparar primer elemento
    $('.auction_bid_div div:nth-child(2)').each(function(index1) {
        //alert(index1+ ': ' + $(this).text().match(/[0-9]+\.[0-9]+/));
        var aux=$(this).text().match(/[0-9]+\.[0-9]+/);
        if(aux==null)	
            oferta_minima[index1]=new Array($(this).text().match(/[0-9]+/).toString(),"0");
        //oferta_minima[index1]=new Array("0","0");	
        else
            oferta_minima[index1]=new Array($(this).text().match(/[0-9]+\.[0-9]+/).toString(),"0");	
        n=index1;
    });
    $('.auction_item_div div div:nth-child(1)').each(function(index2) {
        var aux=$(this).attr("onmouseover").match(/Valor\ [0-9]+\.[0-9]+/);
        if(aux==null){
            aux=$(this).attr("onmouseover").match(/Valor\ [0-9]+/).toString();
            aux=aux.match(/[0-9]+/);
            //alert(index2 + "::"+aux);
            oferta_minima[index2][1]=aux;
        }
        else{
            aux=$(this).attr("onmouseover").match(/Valor\ [0-9]+\.[0-9]+/).toString();
            aux=aux.match(/[0-9]+\.[0-9]+/);
            //alert(index2 + "::"+aux);
            oferta_minima[index2][1]=aux;
        }

         //obtener objetos de
            var critica=$(this).attr("onmouseover").match(/tic(\w|\s)+&lt;\/table&gt;/);
            if(critica==null){
                oferta_minima[index2][2]="0";
            }else{
                oferta_minima[index2][2]="1";
            }
        
    });
     $('.auction_bid_div').each(function(indexaa){
            if(oferta_minima[indexaa][2]=="1"){
                $(this).css("background-color","#7e8b8e");
            }
        });
    $('.auction_bid_div input[name$="bid_amount"]').each(function(index3){
        //alert(index3);
        $(this).val(oferta_minima[index3][0].replace(".",""));
        if(oferta_minima[index3][1]==oferta_minima[index3][0])
            $(this).css("background-color","#dfd");
        //$(this).val(index3);
        var n1=parseFloat(oferta_minima[index3][0].replace(".",""))/1000;
        var oro=parseFloat($('#sstat_gold_val').html().replace(".",""))/1000;
        if(oro<n1){
            $(this).css("background-color","#f00");
        }
    });

    ////////
    $(".title2_inner [name=qry]").replaceWith( '<input type="text" name="qry" id="qry1" value="" style="width:200px">\
<select id="qry2" name="xxx" multiple="multiple" size="10">\
<option value="carne">carne</option>\
<option value="delicadeza">delicadeza</option>\
<option value="antonius">antonius</option>\
<option value="táliths">táliths</option>\
<option value="ichorus">ichorus</option>\
<option value="lucius">lucius</option>\
<option value="gaius">gaius</option>\
<option value="Marcus">Marcus (curacion)</option>\
<option value="Leandronimus">Leandronimus (carisma)</option>\
<option value="zimbris">zimbris</option>\
<option value="amor">amor(curacion)</option>\
<option value="medonis">medonis(curacion)</option>\
<option value="bereccas">bereccas(curacion)</option>\
<option value="purmanns">purmanns(curacion)</option>\
<option value="myrmillo">myrmillo</option>\
<option value="hereje">hereje</option>\
</select>' );
    
    
    $("[name=xxx]").change(function () {

        //alert($("[name=xxx]").val());
        $(".title2_inner [name=qry]").val($("[name=xxx]").val());
        localStorage.setItem("combo", $("[name=xxx]").val());
    });
    ///////

    gladiadores();
    pelear();
//end main function
});
paquetes();
//gladiadores();


