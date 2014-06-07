// ==UserScript==
// @name           BRChan - opção de carregar todos os posts no catálogo
// @include        http://*brchan.org/*/catalog.html*
// @include        http://*brchan.org/*/catalog.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       none
// ==/UserScript==
function urlDecode(string, overwrite){
    if(!string || !string.length){
        return {};
    }
    var obj = {};
    var pairs = string.split('&');
    var pair, name, value;
    var lsRegExp = /\+/g;
    for(var i = 0, len = pairs.length; i < len; i++){
        pair = pairs[i].split('=');
        name = unescape(pair[0]);
        value = unescape(pair[1]).replace(lsRegExp, " ");
        //value = decodeURIComponent(pair[1]).replace(lsRegExp, " ");
        if(overwrite !== true){
            if(typeof obj[name] == "undefined"){
                obj[name] = value;
            }else if(typeof obj[name] == "string"){
                obj[name] = [obj[name]];
                obj[name].push(value);
            }else{
                obj[name].push(value);
            }
        }else{
            obj[name] = value;
        }
    }
    return obj;
}


function jsGet(param)
{
	var wl = window.location.href;
	var params = urlDecode(wl.substring(wl.indexOf("?")+1));
	return(params[param]);
}

var ku_boardspath = "http://www.brchan.org";
function MEUaddreflinkpreview(treco,numero) {
	ainfo = $(treco).attr('class').split('|');
    var paragrafo = document.createElement('div');
	$(paragrafo).css("float","left");
	var cor = '';
	if(numero == 0) {
		cor = 'black';
	} else if (numero < 5) {
		cor = '#300000';
	} else if (numero < 10) {
		cor = '#500000';
	} else if (numero < 20) {
		cor = '#700000';
	} else if (numero < 50) {
		cor = '#900000';
	} else if (numero < 100) {
		cor = '#A00000';
	} else {
		cor = '#FF0000';
	}
	$(paragrafo).css('border','3px solid '+cor);
    var g = document.createElement('div');
	paragrafo.setAttribute("id","paragrafo_"+ainfo[2]);
    g.setAttribute("id", "preview_" +ainfo[2]);
	$("#div_meu_catalogo").append(paragrafo);
	$(paragrafo).append("<span style='font-size:18px; color:"+cor+";'>"+numero+"</span>");
	$(paragrafo).append(g);
	
	
    var c;
    var d = "srcElement";
    var f = "href";
    treco[f] ? c = treco : c = e[d];
    //ainfo = c.className.split('|');
    var searchin = $("post" + ainfo[3]);
    if (searchin) {
        instanthtml = searchin.innerHTML
    }
    var reqid = "preview_" +ainfo[2];
    var brdir = jQuery('input[name=board]').val();
    if (ainfo[1] == brdir) {
        if (searchin) {
            $(g).html('<table><tbody><tr><td class="doubledash">&gt;&gt;</td><td class="reply">' + instanthtml + '</td></tr></tbody></table>');
        } else {
            $(g).html('<img src="' + ku_boardspath + '/loading.gif">');
            jQuery("#" + reqid).load(ku_boardspath + '/' + ainfo[1] + '/res/' + ainfo[2] + '.html #post' + ainfo[3], function (response, status, xhr) {
                if (status == "error") {
                    $(g).html("<div class=\"reply\" style=\"padding: 5px;\">Erro ao tentar obter resposta.</div>");
                } else {
                    if ($(g).html == '') {
                        $(g).html("<div class=\"reply\" style=\"padding: 5px;\">Resposta n&#227;o encontrada.</div>");
                    }
                }
            })
        }
    } else {
        jQuery("#" + reqid).load(ku_boardspath + '/' + ainfo[1] + '/res/' + ainfo[2] + '.html #post' + ainfo[3], function (response, status, xhr) {
            if (status == "error") {
                $(g).html("<div class=\"reply\" style=\"padding: 5px;\">Erro ao tentar obter resposta.</div>");
            } else {
                if ($(g).html() == '') {
                    $(g).html("<div class=\"reply\" style=\"padding: 5px;\">Resposta n&#227;o encontrada.</div>");
                }
            }
        })
    }
    delete instanthtml
}
$(document).ready(function () {
	$("<div id='div_meu_catalogo'></div>").insertBefore("div.catalogmode");
	var estadoAtual = jsGet("mT");
	var link = "";
	if(estadoAtual == undefined || estadoAtual != 1) {
		estadoAtual = false;
		link = "<br/><a href='?mT=1'>Expandir</a><br/>";
	} else {
		estadoAtual = true;
		var add = document.location.href;
		var pos = add.indexOf("?");
		add = add.substring(0,pos);
		link = "<a href='"+add+"'>Remover expansão</a>";
	}
	
	$("#div_meu_catalogo").html("<div style='float:left;'>"+link+"</div>");
	document.title = document.title + " - Catálogo";

	if(estadoAtual) {
		var ids = Array();
		ind = 0;
		$("a").each(function (){
			var temp = $(this).attr('class');
			if(temp == '' || temp == undefined) {
			} else {
				temp = temp.split("|");
				if(temp[2] != undefined) {
					ids[ind] = temp[1]+"/res/"+temp[2];
					ind++;
					num = $(this).next().next().html();
					MEUaddreflinkpreview(this,num);
				}
			}
		});
	} else {
		//$("#div_meu_catalogo").html("<input type='button' value='Expandir tudo' />");		
	}
});