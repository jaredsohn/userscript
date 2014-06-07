// ==UserScript==
// @name           Corpbanca Cuenta Corriente
// @version    	   0.1
// @description    Genera un archivo csv de bancos chilenos para BUXFER 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        https://www.corpbanca.cl/Ibank/CuentaCorriente/*
// @include        https://www.corpbanca.cl/Ibank/TarjetaCredito/ibk_card_consolidated.aspx
// @include        https://www.corpbanca.cl/Ibank/TarjetaCredito/EstadoCuentaNacionalV2.aspx
// @include        https://www.servipag.com/Portal-De-Pagos-En-Linea/Payment/CartolaHistorica
// @include        https://www.bci.cl/cl/bci/aplicaciones/cartola/cuenta/vistaMiniCartola.jsf
// @include        https://www.bci.cl/cl/bci/aplicaciones/cartola/cuenta/cartolaCuenta.jsf
// @include        https://www.bci.cl/cl/bci/aplicaciones/productos/servicios/transferencia/vista/cartolaTransferencia.jsf
// @include        https://www.corpbanca.cl/Corpbanca.Modulo.Transferencia/Presentacion/ConsultaHistorica.aspx
// @include        https://www.bci.cl/cl/bci/aplicaciones/cartola/historico/cartolaHistorica.jsf
// @include        https://www.tarjetacencosud.cl/TarjetaMasWEB/*
// ==/UserScript==

$(function() {
    var c_date;
    var c_payee;
    
    
    var c_ammount=0;
    var c_expense=0;
    var c_income=0;
    var c_cuotas = -1;
    
    var p_table;
    var neg_amount;
    
    function log(p_log, func=""){
        console.log("\n ##### CORP " + func +" ###### \n"+p_log);
    }
    
    
    function init(){
        console.log("INIT \n ");
        //var tipo = $("#Ibk_headerCliente_lbl_groupFuncinality").text().substring(0,12);
        //tipo = $("#Ibk_headerCliente_lbl_groupFuncinality").text();
        //alert($("#Ibk_headerClient1_lbl_groupFuncinality").text().substring(0,12));
        var url = location.pathname;
        
        switch (url){
                
            case "/TarjetaMasWEB/paginarEECC.do":
                {
                    //alert("a");
                    neg_amount = -1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    
                    c_ammount = 2;
                    
                    c_balance = -1;
                    p_table = "table#tabla_eecc tbody tr";
                }
                break;
            case "/Corpbanca.Modulo.Transferencia/Presentacion/ConsultaHistorica.aspx":
                {
                    //alert("a");
                    neg_amount = -1;
                    
                    c_date = 1; 
                    c_payee = 3;
                    
                    c_income = 4;
                    c_expense = 5; 
                    
                    c_balance = -1;
                    p_table = "tr.Ibank_rowAltDG";
                }
                break;
            case "/Ibank/CuentaCorriente/CartolaHistoricaPersonaDetalle.aspx":
                {
                    neg_amount = -1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    
                    c_income = 4;
                    c_expense = 5;
                    
                    c_balance = 6;
                    p_table = "#MovimientosCuentas tbody tr";
                }
                break;
            /* ###################################################
                  BCI
               ################################################### */
                
            case "/cl/bci/aplicaciones/productos/servicios/transferencia/vista/cartolaTransferencia.jsf":            //alert("BCI"); 
                {
                    
                    
                    neg_amount = 1;
                    
                    c_date = 0; 
                    c_payee = 3;
                    c_ammount = 7;
                    c_balance = -1;
                    p_table = ".ui-datatable-data tr ";
                }
                break;
                
            case "/cl/bci/aplicaciones/cartola/cuenta/cartolaCuenta.jsf": 
                {
                    
                    alert("BCI"); 
                    
                    
                    neg_amount = 1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    c_ammount = 6;
                    c_balance = 8;
                    p_table = ".ui-datatable-data tr ";
                }
                break;
                
            case "/cl/bci/aplicaciones/cartola/cuenta/vistaMiniCartola.jsf": 
                {
                    
                    //alert("BCI"); 
                    
                    
                    neg_amount = 1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    c_ammount = 3;
                    c_balance = -1;
                    p_table = ".ui-datatable-data tr ";
                    
                }
                break;
            case "/cl/bci/aplicaciones/cartola/historico/cartolaHistorica.jsf": 
                {
                    
                    //alert("BCI"); 
                    
                    
                    neg_amount = 1;
                    
                    c_date = 0; 
                    c_payee = 2;
                    c_expense = 5;
                    c_income = 7;
                    c_balance = 9;
                    p_table = "table.data tbody tr";
                    
                }
                break;
                
                
            case "/Portal-De-Pagos-En-Linea/Payment/CartolaHistorica": 
                {
                    //alert("Servipa"); 
                    
                    
                    neg_amount = -1;
                    
                    c_date = 4; 
                    c_payee = 0;
                    c_ammount = 2;
                    c_balance = -1;
                    p_table = " table.sin_brd tr ";
                    
                }
                break;
            case "/Ibank/CuentaCorriente/CartolaCtaCtePersona.aspx": 
                {
                    //alert("Cartola"); 
                    
                    
                    neg_amount = 1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    c_ammount = 4;
                    c_balance = -1;
                  
                    p_table = "#TablaUltimosMovimientos tbody tr";
                }
                break;    
               
                
            case "/Ibank/TarjetaCredito/EstadoCuentaNacionalV2.aspx": 
                {
                    alert("tarjeta historico"); 
                    neg_amount = -1;
                    
                    c_date = 1; 
                    c_payee = 3;
                    c_ammount = 4;
                    c_balance = -1;
                    c_cuotas = 6;
                    p_table = "#tablaPeriodoActual tr.sinBordeHorizontal";
                }
                break;
            default: 
                if ($("#Ibk_headerCliente_lbl_groupFuncinality").text().substring(0,12) == "Tarjeta de C"){ // tarjeta de credito  Saldos y Últimos Movimientos
                    //alert("tarjetaSaldos"); 
                    neg_amount = -1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    c_ammount = 3;
                    c_balance = -1;
                    p_table = "#MovNacionales tbody tr";
                } else {
                    neg_amount = 1;
                    
                    c_date = 0; 
                    c_payee = 1;
                    c_ammount = 4;
                    c_balance = 5;
                    p_table = "#TablaUltimosMovimientos tbody tr";
                    
                }
        }
    }
    
    function identifyColumns(){
    
       $(p_table).each(function(i, tr) {
            $( tr ).find('td').each(function(j, td) {
                //alert(j);
                $(td).text(j);
                
                
            });
            txt += '\n'
        });  
        
    }
    
    function debugCsv() {       
        
        var txt = getSelectedText().toString();
        if(txt.trim().length <=0) {
            txt = getTabelaComoTexto();
        }
        alert("Largo Texto: " + txt.trim().length);
        
        
        var linhas = txt.split('\n'); 
        var colunas = linhas[1].split('|');
        alert("Lineas: " + linhas.length + 
              " Columnas: "+colunas.length);
        
        var csv_date = colunas[c_date].trim();
        var csv_payee = cleanText(colunas[c_payee].trim());
        
        if (c_balance > -1)
            csv_payee += "(b: " + processAmmount(colunas[c_balance].trim())+")";
        
        if(c_ammount==0){
            var csv_amount = processAmmount(colunas[c_income].trim()) + processAmmount(colunas[c_expense].trim())*-1;
        } else {
            var csv_amount = processAmmount(colunas[c_ammount].trim());
        }
        
        
        //var csv_amount = 0;
        csv = "Date,Payee,Amount\n" + csv_date + ',' + csv_payee + ','+ csv_amount
        
        alert(csv);        
        identifyColumns();
    }
    
    
    function geraCSV() {
        var csv = 'Date,Payee,Amount\n';
        
        var txt = getSelectedText().toString();
        if(txt.trim().length <=0) {
            txt = getTabelaComoTexto();
        }
        
        var linhas = txt.split('\n'); 
        log("linhas: " + linhas.length + " : ");
        for (i=0;i<linhas.length;i++){ try {
            //console.log("" + linhas[i] + "\n");
            var colunas = linhas[i].split('|');
            
            var csv_date = colunas[c_date].trim();
            var csv_payee = cleanText(colunas[c_payee].trim()) ; 
            if (c_balance > -1) 
                csv_payee += "(b: " + processAmmount(colunas[c_balance].trim())+")";
            if(c_ammount==0){
                var csv_amount = processAmmount(colunas[c_income].trim()) + processAmmount(colunas[c_expense].trim())*-1;
            } else {
                var csv_amount = processAmmount(colunas[c_ammount].trim());
            }
            if (c_cuotas > 0){
               csv_payee = csv_payee + " (coutas " + colunas[c_cuotas].trim()+")";
            }
            
            csv += csv_date + ',' + csv_payee + ','+ csv_amount
            
            csv += '\n'
        }catch(any){}}
        
        log(csv, "gerarCSV()");
        
        //gera conteudo para download
        var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
        window.open(encodedUri);
    }
    
    
    
    
    /**
    *  Validaciones de Datos
    */
    function cleanText(txt){
        txt =  txt.trim().trim().replace("\n","").replace("  "," ").replace(","," ")//.replace(/\s?\d{2}\/\d{2}(\/\d{2})?/g, '') //.replace(/\s{2,}/g, ' ')
        return txt;
    }
    function processAmmount(p_ammount){
        p_ammount = parseDecimal (p_ammount)*neg_amount;
        
        return p_ammount;
        /*return {
            income:income,
            expense:expense
        }*/
    }
    
    
    /*function extraiDescricaoEDatas(descricao) {
        return {
            descricao: descricao.trim().replace(/\s?\d{2}\/\d{2}(\/\d{2})?/g, '').replace(/\s{2,}/g, ' '),
            datas: descricao.trim().match(/\d{2}\/\d{2}(\/\d{2})?/g, '')
        }
    }*/
    
    //1.234,00 -> 1234.00 (NaN se nao conseguir)
    function parseDecimal(decimalComoTexto) {
        //remove pontos, substitui virgulas por pontos e * 1 para garatir que é numero
        //alert(decimalComoTexto.trim().replace(/\./g, '').replace(/,/g, '.').replace("$","").replace(" ",""));
        return decimalComoTexto.trim().replace(/\./g, '').replace(/,/g, '.').replace("$","").replace(" ","").replace(".","")*1
    }
    
    
    
    function getSelectedText () {
        if (document.getSelection) {    // all browsers, except IE before version 9
            var sel = document.getSelection ();
            // sel is a string in Firefox and Opera,
            // and a selectionRange object in Google Chrome, Safari and IE from version 9
            return sel;
        }
        else {
            if (document.selection) {   // Internet Explorer before version 9
                var textRange = document.selection.createRange ();
                return textRange.text;
            }
        }
    }
    
    
    function getTabelaComoTexto() {
        var txt = ""
        $(p_table).each(function(i, tr) {
            $( tr ).find('td').each(function(j, td) {
                txt += cleanText($(td).text()) + '|' 
            });
            txt += '\n'
        });
        log(txt, "getTabelaComoTexto()");
        //alert(p_table);
        return txt;
    }
    
    
    
    
    
    $("body").prepend('<div id="bankCSV"><button id="csv" style="padding: 10px;background-color: forestgreen;color: whitesmoke;font-weight: bold;font-size: 11px;">Gerar CSV</button>'+
                      '<button id="debugcsv" style="padding: 10px;background-color: #FF0000;color: whitesmoke;font-weight: bold;font-size: 11px;">Debug CSV</button></div>');
    $("#csv").bind('click', function(event) {geraCSV();event.stopPropagation();event.preventDefault();});
    $("#debugcsv").bind('click', function(event) {debugCsv();event.stopPropagation();event.preventDefault();});
    init();
})();