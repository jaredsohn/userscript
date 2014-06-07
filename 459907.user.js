// ==UserScript==
// @name       	Itown
// @include		http*://itown-saraiva.cloudapp.net/*
// @version    	1.0
// @description Algumas coisas uteis para o ITOWN
// @copyright  2014+, Wesley Nascimento
// ==/UserScript==

(function($){
	var loc = location.href;
    
    //Criação de OS
    if( StringHas( loc, "ServiceOrder/Create") ){
    	bindSOCreate();
    } else if( StringHas( loc, "Customer/Create") ){
    	bindCCreate();
    }
    
})(jQuery);

//Uteis
function StringHas( string , search){ if( string.indexOf( search )  > -1 ){ return true;  } return false; }

function isNumeric(str) { var er = /^[0-9]+$/;   return (er.test(str)); }

//Complexas

function bindCCreate(){
    $("#ZipCode").parent().append("<a href='javascript:void(0);' id='buscarcep'>Buscar</a><p id='buscarceperro' class='field-validation-error'></p>");
    $('head').append('<script>function correiocontrolcep( result ){if( result.erro ){$("#buscarceperro").text("Este CEP não foi encontrado.");$("#State").val( "" );$("#City").val( "" );$("#Address").val( "");} else { $("#State").val( result.uf ); $("#City").val( result.localidade ); $("#Address").val( result.logradouro + ", X - " + result.bairro); } }</script>');

    $("#buscarcep").on("click", function(){
        var zip = $("#ZipCode").val().replace(/\D/g, "");
        
        if(zip != null && zip.length == 8 && isNumeric( zip )){
            $("#buscarceperro").text("");
        	receiveCEP( zip );
        } else {
            $("#buscarceperro").text("O cep nao esta no formato correto. Ex: (xxxxxxxx) 8 numeros.");
        }
    });
}

function receiveCEP( zipCode ){
    $("#State").val( "Buscando..." );
    $("#City").val( "Buscando..." );
    $("#Address").val( "Buscando..." );
    $("head").append("<script src='http://cep.correiocontrol.com.br/"+ zipCode+".js' charset='utf-8'></script>");
}

function bindSOCreate(){
    
     $("#Observations").val("Entregue SimCard ao cliente, deixado somente o aparelho.\n"+
                             "Descrição completa do aparelho.");
    
    $("#CoverageOption").on('change', function(){
    	
        var selected = $(this).val();
        
        switch( selected ){
            case "OOW":
                $("#Observations").val("Entregue SimCard ao cliente, deixado somente o aparelho.\n"+
                                        "Cliente ciente do valor de R$ xxx,xx pela substituição podendo ser parcelado em até X vezes.\n"+
                                        "Descrição completa do aparelho.");
                $("#EquipmentDescription").val("OOW");
                break;
            case "Guarantee":
                $("#Observations").val("Entregue SimCard ao cliente, deixado somente o aparelho.\n"+
                             "Descrição completa do aparelho.");
                $("#EquipmentDescription").val("Em garantia");
                break;
            case "Verify":
                $("#EquipmentDescription").val("Em verificação");
                $("#Observations").val("Entregue SimCard ao cliente, deixado somente o aparelho.\n"+
                                        "Cliente ciente de que o aparelho foi deixado para verificação.\n"+
                                        "Descrição completa do aparelho.");
                break;
            case "GE":
                $("#Observations").val("Entregue SimCard ao cliente, deixado somente o aparelho.\n"+
                             			"Descrição completa do aparelho.");
                break;
        }
    });
    
    $("form").submit(function( event ){
        var first =  $(this).attr("data-first");
        
        if( first == null || first == true){
            alert("É importante revisar os dados antes de Criar a OS não sendo possivel alteraçoes futuras.");
            $(this).attr("data-first", false);
            event.preventDefault();
            return false;
        }
    });
}