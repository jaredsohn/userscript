    // ==UserScript==
    // @name        Delicia de 55chan
    // @version     1.9.20
    // @author      Sr. Anão
    // @namespace   http://55ch.org/
    // @description Este e o primeiro plugin oficial para o 55 Chan
    // @match       http://*.55ch.org/*
    // @include     http://55ch.org/*
    // @copyright   Todos os direitos reservados a esta delicia.
    // @require     http://code.jquery.com/jquery-latest.js
    // @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
    // @require     https://raw.github.com/antimatter15/ocrad.js/master/ocrad.js
    // @require     https://raw.githubusercontent.com/a442/marmelos/master/unpacked/marmelos.js
    // @require     http://cdn.jsdelivr.net/jquery.lazyload/1.9.3/jquery.lazyload.js
    // @resource    jQueryUICSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/ui-darkness/jquery-ui.min.css
    // @updateURL   https://userscripts.org/scripts/source/417358.meta.js
    // @downloadURL https://userscripts.org/scripts/source/417358.user.js
    // @grant       GM_addStyle
    // @grant       GM_getResourceText
    // @grant       GM_getResourceURL
    // @grant       GM_getValue
    // @grant       GM_setValue
    // ==/UserScript==

    $(function () {

    function start() {
        if(window.location.pathname.indexOf("/src/") == -1){
            escopo();
            plugins();   
            console.log("Delicia de 55 chan iniciado com sucesso."); 
        }        
    }

    /*******
    Daqui pra baixo começa realmente o código, peço a gentileza caso vá refatorar, sempre procure encapsular o máximo possível e sempre utilizar lowerCamelCase.
    Obrigado Ass. Sr. Anão.
    **********/
    function escopo(){
         //Escopo
        retiraElementosInuteis();
        setMenu_boards();
        setMenu_css();
        adicionarBotaoConfiguracoes();
        inicializaJqueryUI();
        botaoSobre();
        bemvindo();
    }

    function plugins(){   
        //Funcionalidades
        carregarThumbsEmHD();
        localizadorSalsa();
        autoEmbedarYoutube();
        embedarXvideos();
        embedarFacebook();
        embedarXHamster();
        //contadortopo();
        autoPreencherCaptcha();
        autoNoko();
        helperMensagem();
        papeldeparede();
        pegarInformacoesDaImagemNoCancro();
        autoAtualizarThread();
        incorporarCam4();
        autoHide();
        incorporarTwitch(); 
        autoRemoverVideosMusicas();
        forcarFormLadoDireito(); 
        lazyLoadImages();
        incorporarVocaroo();
        //incorporarInstants();
        maximizarImagensAutoPassarMouse();
        expandirImagem();
        retirarMusicasAutoPlay();
        updateBackLinks();
        removeBordasiframes();
    }

    function removeBordasiframes(){
        $("iframe").css("border","0");
    }

    /*
    Remove todos os plugins ativos e instala todos novamente.
    */
    function limpaPaginaeAtualizaConteudo(inContent){
        inContent = inContent.substring(inContent.indexOf("<body>"), inContent.indexOf("</body>"));
        var mensagem = $("textarea[name=message]").val()
        var statusModalMensagem = $("#quikchan_btn_ocultar_form").css("display");
        document.body.innerHTML=inContent;
        
        $("textarea[name=message]").val(mensagem);
            if(statusModalMensagem == ""){
                $("#quikchan_btn_form").click();
                $("input[name=captcha]").focus();
            }        
        escopo();
        plugins();
    }


    /*
    Adicionar backlinks e backquotes 
    Código importador do BRchan X lolikun
    */
    function updateBackLinks() {
            var i;
            var links = document.getElementsByTagName('a');
            var linkslen = links.length;
            for (i=0;i<linkslen;i++){
                var linksclass = links[i].getAttribute('class');
                var testref = links[i].parentNode.getAttribute('class');
                if (linksclass != null && linksclass.indexOf('ref|') != -1 && (testref == undefined || testref != 'reflink')) {
                    var onde = links[i].href.substr(links[i].href.indexOf('#') + 1);
                    //adicionado um parentNode
                    var quem = links[i].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].name;
                    var br = links[i].href.substring(links[i].href.indexOf('org/') +4, links[i].href.indexOf('/res'));
                    var brlen = br.length;
                    var tr = links[i].href.substring(links[i].href.indexOf('res/') +4, links[i].href.indexOf('.html'));
                    addBackLinks(quem, onde, tr, br);
                }
            }

        var spoilerspan = document.getElementsByTagName('span');
        for (var k=0;k<spoilerspan.length;k++){
            if (spoilerspan[k].getAttribute('style') == 'color:black;background-color:#000;') {
                spoilerspan[k].setAttribute('style','color:black;');
                spoilerspan[k].setAttribute('onmouseover','');
            }
        }

    function addBackLinks (quem, onde, tr, br) {
            var ondeid = document.getElementById('reply' + onde);
            if (ondeid != undefined) {
                var onderefl = ondeid.querySelectorAll('span.reflink')[0];
                if (onderefl.innerHTML.indexOf(quem) == -1){
                    var e = document.createElement('a');
                    e.innerHTML=' <u>>>' + quem + '</u>';
                    e.setAttribute('href','/' + br + '/res/' + tr + '.html#' + quem);
                    e.setAttribute('class','ref|' + br + '|' + tr + '|' + quem);
                    e.setAttribute('onclick','return highlight(\'' + quem + '\', true);');
                    e.addEventListener('click', function() { unsafeWindow.delreflinkpreview.call(this); unsafeWindow.checkhighlight() })
                    onderefl.appendChild(e);
                    return linkslen++;
                }
            }
        }
        return 0;
        }

    function retirarMusicasAutoPlay(){

        var ObjTo = "quikchan_config_auto_mute_musicas";
        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\""+ObjTo+"\" value=\"1\">Auto remover músicas adicionadas pelos Mods</p>");
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
             $("#" + ObjTo).prop("checked", true);
                $("iframe").each(function(index,value){
                    if($(this).attr("src").indexOf("?autoplay") != -1){
                       $(this).remove();
                    }
                });
            }
    }

    function expandirImagem(){
        var ObjTo = "quikchan_config_auto_expandiImagem";
        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\""+ObjTo+"\" value=\"1\">Expandir imagem ao clicar na thumb</p>");
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
             $("#" + ObjTo).prop("checked", true);
                var selector = $("img[class^=thumb]");                
                selector.each(function(index,value){

                    var idImg = $("img[alt="+selector.eq(index).attr("alt")+"]")
                    var parentId = idImg.parent().parent();
                    var UrlHD = parentId.attr("href");

                    var hashImage = parentId.attr("href").split("/");
                    hashImage = hashImage[(hashImage.length)-1];
                    hashImage_old = hashImage;

                    var urlSD = UrlHD.replace("src","thumb");
                    hashImage = hashImage.replace(".","s.");
                    urlSD = urlSD.replace(hashImage_old,hashImage);
                    
                    //console.log(urlSD);

                    parentId.attr("OnClick","return false");
                        
                    idImg.click(function(){
                            if(typeof idImg.attr("expandido") == 'undefined'){                                
                                idImg.attr("expandido", urlSD);
                                idImg.attr("src", UrlHD); 
                                idImg.attr("width","");
                                idImg.attr("height","");
                                //idImg.css("maxHeight","100%");
                                idImg.css("maxWidth","90%");
                            }else{
                                idImg.attr("src",idImg.attr("expandido"));
                                idImg.removeAttr("expandido");
                            }
                    });
                    
                });
        }

    }

    function maximizarImagensAutoPassarMouse(){
        var ObjTo = "quikchan_config_auto_MaximizarImagens";
        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\""+ObjTo+"\" value=\"1\">Abrir imagem ao passar o mouse por cima.</p>");

        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
             $("#" + ObjTo).prop("checked", true);

                var selector = $("img[class^=thumb]");
                $("body").append("<div id=\"quikchan_visualizacao_expandida\"></div>");
                var visualizacao = $("#quikchan_visualizacao_expandida");
                visualizacao.css("position","fixed").css("right","10px").css("top","10px");
                
                selector.each(function(index,value){
                    var idImg = ("img[alt="+selector.eq(index).attr("alt")+"]").replace(" ","");
                    $(idImg).hover(function(){
                        visualizacao.html("<img src=\""+$(this).parent().parent().attr("href")+"\">");
                        visualizacao.find("img").css("maxHeight","80%").css("maxWidth","100%");
                    }, function(){
                        visualizacao.html("");
                    });
                    
                });
        }

    }

    /**
    Desativado ate sair a resposta sobre o bug **/

    function incorporarInstants(){

        var ObjTo = "quikchan_config_auto_instant";
        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\""+ObjTo+"\" value=\"1\">Auto incorporar MyInstants.com</p>");

            $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

            if (GM_getValue(ObjTo) == 1) {
                 $("#" + ObjTo).prop("checked", true);

                    var links = document.getElementsByTagName("a");
                    for (var i = 0; i < links.length; i++) {
                            if (links[i].href.indexOf("myinstants.com/") !== -1) {
                                var urlInstant = links[i].href;
                                /*$.ajax({url: urlInstant,settings:{crossDomain:true}})
                                .done(function(data){
                                     //<embed src="/media/bt/genericInstant_event.swf" flashvars="color=ff0000&amp;sound=/media/sounds/eae-frota-qual-e-o-negocio.mp3&amp;n=1" width="160" height="160" wmode="transparent" type="application/x-shockwave-flash">
                                    var strIndexSearch = "<embed src=\"/media/bt/genericInstant_event.swf\" flashvars=\"";
                                    var strLastSearch = "\" width=\"160\"";
                                    var embedInstant = data.substring(data.indexOf(strIndexSearch),data.indexOf(strLastSearch,strIndexSearch));
                                    console.log(embedInstant);
                                });
                                */
                                            var url = encodeURIComponent("http://www.google.com");
                                            $.getJSON('http://whateverorigin.org/get?url=' + url + '&callback=?', 
                                               function(data) {
                                                 var html = data.contents;
                                                 //console.log(html);
                                               }
                                            );                                   
                               
                                /*
                                $.getJSON('http://anyorigin.com/dev/get?url=http%3A//www.myinstants.com/instant/qual-e-o-negocio-frota/&callback=?', function(data){
                                    console.log(data);
                                });
                                */
                            }
                    }
             }
    }

    function incorporarVocaroo(){

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_auto_vocaroo\" value=\"1\">Auto incorporar Vocaroo</p>");

            var ObjTo = "quikchan_config_auto_vocaroo";
            $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

            if (GM_getValue(ObjTo) == 1) {
                 $("#" + ObjTo).prop("checked", true);
                    var usuarioID = "";
                    var links = document.getElementsByTagName("a");
                    for (var i = 0; i < links.length; i++) {
                        if (links[i].href.indexOf("http://vocaroo.com/") !== -1) {
                            usuarioID = links[i].href.substring(0, links[i].href.length).replace("http://vocaroo.com/i/","").trim();
                            var flash = '<object width="148" height="44" id="embed_vacaroo"><param name="movie" value="http://vocaroo.com/player.swf?playMediaID='+usuarioID+'&autoplay=0"></param><param name="wmode" value="transparent"></param><embed src="http://vocaroo.com/player.swf?playMediaID='+usuarioID+'&autoplay=0" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash"></embed></object>';
                            $(links[i]).parent().append(flash);
                            //Tive que adicionar isso por causa de um bug no css do chan
                            $("object").css("width","148px").css("height","44px");
                        }
                    }
             }
    }

    /**
    Carregas as imagens no momento que você arrasta o browser, on demand.
    **/
    function lazyLoadImages(){

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_imagens_demand\" value=\"1\">Carregar imagens da thread conforme você rola a página (sobre demanda)</p>");
            var ObjTo = "quikchan_config_imagens_demand";
            $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

            if (GM_getValue(ObjTo) == 1) {
                 $("#" + ObjTo).prop("checked", true);
                        var blankimg = "http://55ch.org/css/icons/blank.gif";
                        var thumb =  $("img[class^=thumb]");
                            thumb.each(function(index,value){ 
                                $(this).attr("data-original",$(this).attr("src"));
                                $(this).attr("src","");
                                $(this).attr("class","thumb lazy");
                             });
                        $("img.thumb").lazyload({effect : "fadeIn"});

            }
    }


    function tirarPrintscreen(){

        var URL_APP = "http://web-capture.net/?url=";
        var btn_camera = "<img src=\"http://i59.tinypic.com/nps31i.jpg\" width=\"40px\" style=\"cursor:pointer; margin-right:4px;\" title=\"Tirar printscreen da página\" id=\"quikchan_btn_printscreen\">";
                 $(document).on("click", "#quikchan_btn_printscreen", function(){
                    alert("Será aberta nova aba onde você deverá clicar no botão 'Capture web page' ");
                    window.open(URL_APP + window.location.href,"_blank");
                 }); 
            $("#quikchan_barralateral").append(btn_camera);
    }


    function forcarFormLadoDireito(){

            $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_form_flutuante\" value=\"1\">Formulário flutuante e Captura de Tela</p>");

            var ObjTo = "quikchan_config_form_flutuante";
            $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

            if (GM_getValue(ObjTo) == 1) {
                 $("#" + ObjTo).prop("checked", true);

                var postForm = $("#postform");
                postForm.css("position","fixed");
                postForm.css("right","0");
                postForm.hide();
                $("table[class=postform]").find("tr").last().hide();
                //$("#postform").attr("draggable","true");
                postForm.css("margin-right","75px");

                $("body").append("<div id=\"quikchan_barralateral\"></div>");

                var barra = $("#quikchan_barralateral");              
                barra.append("<img src=\"http://i61.tinypic.com/2ptv68j.png\" alt=\"Subir\" title=\"Subir\" width=\"40px\" id=\"quikchan_btn_top\" style=\"cursor:pointer\"> <br />");
                barra.append("<img id=\"quikchan_btn_form\" src=\"http://i60.tinypic.com/2a9s4g1.png\" title=\"Criar/Responder Thread\" width=\"40px\"><input type=\"button\" value=\"Ocultar\" id=\"quikchan_btn_ocultar_form\" style=\"display:none\">");
                barra.append("<br><img src=\"http://i62.tinypic.com/1zhsg3.png\" alt=\"Descer\" title=\"Descer\" width=\"40px\" id=\"quikchan_btn_bot\" style=\"cursor:pointer\"> <br />");
                barra.css("right","0");
                barra.css("position","fixed");
                barra.css("top","50%");
                barra.css("text-align","right");
                var btnForm = $("#quikchan_btn_form");
                btnForm.css("margin-right","4px");
                btnForm.css("cursor","pointer");

                $(document).on("click", "#quikchan_btn_form", function(){
                   postForm.fadeIn("fast");
                   $("#quikchan_btn_form").hide();
                   $("#quikchan_btn_ocultar_form").show();
                }); 

                 $(document).on("click", "#quikchan_btn_ocultar_form", function(){
                    $("#quikchan_btn_ocultar_form").hide();
                    $("#quikchan_btn_form").show();
                    postForm.fadeOut("fast");
                 }); 
                 
                 $(document).on("click", "#quikchan_btn_top", function(){
                    $("html, body").animate({ scrollTop: 0 }, "fast");
                 }); 
                 $(document).on("click", "#quikchan_btn_bot", function(){
                        $("html, body").animate({ 
                           scrollTop: $(document).height()-$(window).height()},"fast");
                 }); 
                 tirarPrintscreen();
            }
    }


    function autoRemoverVideosMusicas(){

        $.each($("iframe"),function(index,value){
                      if($("iframe").eq(index).attr("src").indexOf("?autoplay=1") != -1){
                       $("iframe").eq(index).hide()
                    }
                });


    }

    /* So depois que terminarmos o Tinyboard */
    function dragNDropUpload(){

        $("form[name=postform]").attr("class","dropzone");
            var myDropzone = new Dropzone("#postform input[name=imagefile]",  { url : "http://55ch.org/board.php"});

            myDropzone.options.myAwesomeDropzone = {
                  paramName: "imagefile", // The name that will be used to transfer the file
                  maxFilesize: 2, // MB
                  accept: function(file, done) {
                    if (file.name == "justinbieber.jpg") {
                      done("Naha, you don't.");
                    }
                    else { done(); }
                  }
                };

       /* var myDropzone = new Dropzone("input[name=imagefile]", 
            { options: {
                        myAwesomeDropzone : {
                              clickable: false,
                              paramName: "imagefile", // The name that will be used to transfer the file
                              maxFilesize: 2,
                              init: function() {
                                                    this.on("addedfile", function(file) { alert("Added file."); });
                                                  }
                              }
                    }
        }); */ 
    }

    function incorporarTwitch(){

         $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_twitch\" value=\"1\">Incorporar stream Twitch.tv</p>");

        var ObjTo = "quikchan_config_twitch";
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
            $("#" + ObjTo).prop("checked", true);

            var usuarioID = "";
            var links = document.getElementsByTagName("a");
            var p;
            for (var i = 0; i < links.length; i++) {
                //console.log(links[i].href.substring(0,32));
                if (links[i].href.indexOf("http://www.twitch.tv/") !== -1) {
                    
                    usuarioID = links[i].href.substring(0, links[i].href.length).replace("http://www.twitch.tv/","").trim();
                    //console.log(usuarioID);
                                // <iframe frameborder="0" scrolling="no" id="chat_embed" src="http://twitch.tv/chat/embed?channel=starladder1&popout_chat=true" height="500" width="350"></iframe> 
                    //var iframect = "<iframe frameborder=\"0\" scrolling=\"no\" id=\"twitch_video_embed_"+usuarioID+"\" src=\"http://twitch.tv/chat/embed?channel="+usuarioID+"&popout_chat=true\" height=\"500\" width=\"350\" style=\"display:none\"></iframe> <br> <input type=\"button\" value=\"Abrir stream\" id=\"quikchan_btn_stream_twitch\" videoid=\""+usuarioID+"\">";
                    var flash = '<object id="twitch_video_embed_'+usuarioID+'" style="display:none" type="application/x-shockwave-flash" height="537" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel='+usuarioID+'" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel='+usuarioID+'&auto_play=true&start_volume=25" /></object>';
                    flash += "<br> <input type=\"button\" value=\"Abrir stream\" id=\"quikchan_btn_stream_twitch\" videoid=\""+usuarioID+"\">";
                    $(links[i]).parent().append(flash);
                }
            }

            $(document).on("click","#quikchan_btn_stream_twitch", function(){
                var divIdStream = $("#twitch_video_embed_" + $(this).attr("videoid"));
                if(divIdStream.css('display') == "none"){
                    divIdStream.show();
                    divIdStream.css("width","900px");
                    divIdStream.css("height","537px");
                    $(this).attr("value","Fechar stream");
                }else{
                    divIdStream.hide();
                    $(this).attr("value","Abrir stream");
                }
                    
            });
        }

    }

    function autoHide(){

        $("#quikchan_modal_config").append("<p>Auto hide Thread/Reply <br> Adicione as palavras na blacklist separados por virgula Ex: (chloe,duplos,pitanga,moranga,/baw/) <br> <textarea id=\"quikchan_blacklist\" style=\"width:400px; height:100px\"></textarea> <br> <input type=\"button\" value=\"Salvar\" id=\"quikchan_btn_blacklist\"></p>");
        $(document).on("click","#quikchan_btn_blacklist",function(){
            GM_setValue("quikchan_blacklist",$("#quikchan_blacklist").val());
            alert("Blacklist salva com sucesso!");
        });

        if(GM_getValue("quikchan_blacklist") !== undefined){
            $("#quikchan_blacklist").val(GM_getValue("quikchan_blacklist"));
        }

        var textToHide = GM_getValue("quikchan_blacklist");
        if(textToHide !== undefined && textToHide != "" && window.location.href.indexOf("/res/") !== -1){
            $.each($("blockquote"), function(key,value){                        
                if(verificarBlacklist($("blockquote").eq(key).text()) === true){
                    $("blockquote").eq(key).hide().parent().append("Texto ocultado pela blacklist.");
                }
              
            });
        }

        //Listagem de threads
        if(textToHide !== undefined && textToHide != "" && window.location.href.indexOf("/res/") === -1){
            $.each($("div[id^='thread']"), function(key,value){
                var dirtyString = $("div[id^='thread']").eq(key).find("blockquote").eq(0).text();

                if(verificarBlacklist(dirtyString) === true){
                    var threadID = $("div[id^='thread']").eq(key).attr("id").replace("thread","");
                    //verifica se já nao esta ocultado (Cookie)
                    if(document.cookie.indexOf(threadID) == -1)
                    togglethread(threadID);
                }
            });
        }
    }

    function verificarBlacklist(fullString){
        var blacklist = GM_getValue("quikchan_blacklist");
        var b = blacklist.split(",");
        for(var i=0; i< b.length; i++){
            if(fullString.indexOf(b[i].trim()) !== -1)
                return true;
        }
    }

    function marcarQuotes(){

    }

    function incorporarCam4(){


        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_embedcam4\" value=\"1\">Incorporar stream do CAM4.com</p>");

        var ObjTo = "quikchan_config_embedcam4";
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
            $("#" + ObjTo).prop("checked", true);

            var usuarioID = "";
            //http://www.cam4.com/amyandlana
            var links = document.getElementsByTagName("a");
            var p;
            for (var i = 0; i < links.length; i++) {
                //console.log(links[i].href.substring(0,32));
                if (links[i].href.indexOf("http://www.cam4.com/") !== -1) {                    
                    usuarioID = links[i].href.substring(0, links[i].href.length).replace("http://www.cam4.com/","").trim();
                    var iframect = "<div id=\"quikchan_stream_cam4_"+usuarioID+"\" style=\"display:none\"><object width=\"880\" height=\"440\" align=\"middle\" data=\"http://edgecast.cam4s.com/client/Cam4_6.155_guest.swf\" name=\"Cam4VChat\" id=\"Cam4VChat\" type=\"application/x-shockwave-flash\"><param value=\"high\" name=\"quality\"><param value=\"#ffffff\" name=\"bgcolor\"><param value=\"always\" name=\"allowscriptaccess\"><param value=\"transparent\" name=\"wmode\"><param value=\"true\" name=\"allowfullscreen\"><param value=\"true\" name=\"allowfullscreeninteractive\"><param value=\"locale=en&amp;remoteAddress=189.102.242.87&amp;timeout=0&amp;country=BR&amp;room="+usuarioID+"&amp;username=&amp;accessHash=&amp;canUseTranscoding=false&amp;maxFriendsForRegistered=500&amp;maxFriendsForGold=1000&amp;maxFavoritesForRegistered=1000&amp;maxFavoritesForGold=2000&amp;maxFriendRequestsForRegistered=1500&amp;maxFriendRequestsForGold=1500\" name=\"flashvars\"></object></div> <br> <input type=\"button\" value=\"Abrir stream\" id=\"quikchan_btn_stream_cam4\" videoid=\""+usuarioID+"\">";
                    $(links[i]).parent().append(iframect);
                }
            }

            $(document).on("click","#quikchan_btn_stream_cam4", function(){
                var divIdStream = "#quikchan_stream_cam4_" + $(this).attr("videoid")
                if($(divIdStream).css('display') == "none"){
                    $(divIdStream).show();
                    $(divIdStream).css("width","900px");
                    $(divIdStream + " object").css("width","880px");
                    $(divIdStream + " object").css("height","440px");
                    $(this).attr("value","Fechar stream");
                }else{
                    $(divIdStream).hide();
                    $(this).attr("value","Abrir stream");
                }
                    
            });
        }
    }

    function bemvindo(){

       // console.log("rodando bemvindo");
       // console.log(GM_getValue("mensagem_bemvindo_lida"));
        if(GM_getValue("mensagem_bemvindo_lida") == 0 || GM_getValue("mensagem_bemvindo_lida") === undefined){
            //console.log("Este usuario acabou de instalar o plugin");
            $("body").append("<div id=\"quikchan_dialog_bv\" title=\"Bem vindo\" style=\"display:none\"><p> Olá Anão, bem vindo ao nosso plugin! para configurar as funcionalidades clique aqui em baixo no botão Ok e ative tudo que você quiser. <br> Ah! por favor, se encontrar algum BUG ou tiver alguma sugestão por favor deixe nesta thread <a href=\"http://55ch.org/comp/res/10133.html\" target=\"_blank\">55ch.org/comp/res/10133.html</a> <br><br> Obrigado!</div>");
            
            $("#quikchan_dialog_bv").dialog({

                width: 600,
                modal: true,
                buttons : {
                    Ok : function(){
                        $(this).dialog("close");
                        GM_setValue("mensagem_bemvindo_lida",1);
                            $("#quikchan_modal_config").dialog({
                                                                width: 600,
                                                                modal: true,
                                                                buttons: {
                                                                    Fechar: function(){$(this).dialog("close");},
                                                                    Salvar: function () {
                                                                        $(this).dialog("close");
                                                                        window.location.reload();
                                                                    }
                                                                }
                                                            });
                    }
                }
            });
        }


    }

    function autoAtualizarThread(){

        var selectTempo = "<select id=\"quikchan_tempo_autoupdate\"> <option value=\"desativar\" selected> desativado </option> <option value=\"10\">10</option> <option value=\"15\">15</option> <option value=\"20\">20</option> <option value=\"30\">30</option> <option value=\"40\">40</option> <option value=\"50\">50</option> <option value=\"60\">60</option> </select>";
        $("#quikchan_modal_config").append("<p>Auto atualizar threads a cada "+selectTempo+" segundos. <input type=\"button\" id=\"quikchan_config_autoupdatethread\" value=\"Salvar\"></p>");

        $(document).on('click', "#quikchan_config_autoupdatethread", function(){

            //console.log(GM_getValue("quikchan_tempo_autoupdate"));

            if(GM_getValue("quikchan_tempo_autoupdate") == 0 || GM_getValue("quikchan_tempo_autoupdate") === undefined){
                alert("Ativado - Para utilizar aperte o botão salvar na janela maior.");
                GM_setValue("quikchan_tempo_autoupdate", $("#quikchan_tempo_autoupdate").val());
           
            }else if($("#quikchan_tempo_autoupdate").val() == "desativar"){
                alert("Desativado");
                GM_setValue("quikchan_tempo_autoupdate",0);
            
            }else if($("#quikchan_tempo_autoupdate").val() > 0){
                alert("Ativado");
                GM_setValue("quikchan_tempo_autoupdate", $("#quikchan_tempo_autoupdate").val());
            }

        });
        if(GM_getValue("quikchan_tempo_autoupdate") > 0)
            $("#quikchan_tempo_autoupdate option[value="+GM_getValue("quikchan_tempo_autoupdate")+"]").prop("selected",true);

        if (GM_getValue("quikchan_tempo_autoupdate") > 0 && window.location.href.indexOf("/res/")!==-1){
             
            $("#delform").append("<div id=\"contadorThreads\"></div>");

            document.body.onblur = function(){
                console.log("Desligando contador de verificacao de thread");
                 window.clearInterval(verificaSePrecisaAtualizarThreads);
            }
            document.body.onfocus = function(){
                console.log("Iniciando contador de verificacao de thread")
                window.clearInterval(verificaSePrecisaAtualizarThreads);
                window.setInterval(verificaSePrecisaAtualizarThreads, (GM_getValue("quikchan_tempo_autoupdate") * 1000));
            }
            window.clearInterval(verificaSePrecisaAtualizarThreads);
            window.setInterval(verificaSePrecisaAtualizarThreads, (GM_getValue("quikchan_tempo_autoupdate") * 1000));
            //window.setInterval(contadorAtualizacaoThreads, 1000);
        }            
    }

    /**
    Removido da versao 1.0.0 porque estava bugando com as variaveis globais
    **/
    function contadorAtualizacaoThreads(idContadorRemainUnique){
        //var segundosFaltando = GM_getValue("quikchan_tempo_autoupdate") - 1;
        $("#contadorThreads").html("<p><i>Esta página vai se auto atualizar em <span id=\"contadorexibitor\">"+parseInt()+"</span> segundos...</i></p>");
        var segundosFaltando = parseInt($("#contadorexibitor").html());

        if( segundosFaltando == 0){
            segundosFaltando = parseInt(GM_getValue("quikchan_tempo_autoupdate"));
        }else{
            segundosFaltando = segundosFaltando--;
        }
        $("#contadorexibitor").html(segundosFaltando);
    }

    function verificaSePrecisaAtualizarThreads(){
        //somente roda dentro de uma thread.
        if(window.location.href.indexOf("/res/")!==-1){
             if (GM_getValue("quikchan_tempo_autoupdate") > 0) {
                var threadUrl = window.location.href;
                $.get(threadUrl, function(data){
                    var objData = $(data)
                    var quantidadePostsChecagem = objData.find("blockquote").length;
                    var quantidadePostsAtual = $("blockquote").length;
                    //$("#captchaimage").parent().click(); //  Atualiza captcha
                    if(quantidadePostsAtual == quantidadePostsChecagem){
                       // console.log("Este post nao possui novas postagens.");
                    }else{
                        limpaPaginaeAtualizaConteudo(data);
                       
                        //Atualiza titulo da página com o numero de postagens novas
                        var diferencaQtd =  quantidadePostsChecagem - quantidadePostsAtual;
                        var prefixo = document.title;
                        if(prefixo.indexOf("novos")!==-1){
                            prefixo = prefixo.substring(0,prefixo.indexOf(" ("));
                        }
                        document.title = prefixo + " ("+diferencaQtd+" novos)";
                    }
                });
            }
        }

    }

    function ativaDesativaConfiguracao(objID){
        if (GM_getValue(objID) == 0 || GM_getValue(objID) === undefined) {
                GM_setValue(objID, 1);
            } else if(GM_getValue(objID) == 1) {
                GM_setValue(objID, 0);
            }
    }



    /**
    Todas as funcionalidades devem ficar abaixo desta linha
    **/

    function carregarThumbsEmHD() {

        $(document).on('change', '#quikchan_config_thumbhd',function(){ativaDesativaConfiguracao('quikchan_config_thumbhd')});

        if (GM_getValue("quikchan_config_thumbhd") == 1) {
                $("img[class=thumb]").each(function (index, value) {
                    var imgID = value['alt'];
                    var imgAntiga = value['src'];
                    var imgHD = imgAntiga.replace("thumb", "src");
                    imgHD = imgHD.replace("s.", ".");
                    $("img[alt=" + imgID + "]").attr("src", imgHD);
                });
            $("#quikchan_config_thumbhd").prop("checked", true);
        }
    }

    function localizadorSalsa() {

        $(document).on('change', '#quikchan_config_findsauce',function(){ativaDesativaConfiguracao('quikchan_config_findsauce')});

        if (GM_getValue("quikchan_config_findsauce") == 1) {
            $("#quikchan_config_findsauce").prop("checked", true);
            //console.log("Carregando imagens para pesquisa de salsa");
            
            var imagens = $("img[class^=thumb]");
            imagens.parent().parent().parent().each(function(index, value){
                var urlImagem = imagens.eq(index).attr("src"); 
                var googleIcon = "<a href=\"https://www.google.com/searchbyimage?site=search&image_url="+escape(urlImagem)+"\" target=\"_blank\"><img src=\"http://i59.tinypic.com/immb7r.png\" title=\"Procurar imagem no Google\"></a>";
                var tineye =  " <a href=\"http://www.tineye.com/search/?url="+escape(urlImagem)+"\" target=\"_blank\"><img src=\"http://i61.tinypic.com/m7wcvn.png\" title=\"Procurar imagem no TinEye\"></a>";
                var iqdb = " <a href=\"http://iqdb.org/?url="+escape(urlImagem)+"\" target=\"_blank\"><img src=\"http://i58.tinypic.com/23r5udc.png\" title=\"Procurar imagem no IQDB\"></a>";
                var sauceNao = " <a href=\"http://saucenao.com/search.php?url="+escape(urlImagem)+"\" target=\"_blank\"><img src=\"http://i59.tinypic.com/25f82mw.png\" title=\"Procurar imagem no SauceNAO\"></a>"; 
                
                var uniqueid = Math.floor((Math.random()*1000000)+1);
                var dLurkarImagem = "<span id=\"quikchan_opcoes_lurk_"+uniqueid+"\"></span>";
                kpl = $(value).find("span[class=filesize]");
                kpl.eq(0).append(dLurkarImagem);
                kpl.eq(0).css("marginLeft","-12px");

                $("#quikchan_opcoes_lurk_"+uniqueid).html(" <img id=\"quikchan_btn_info_imagem_lurk_"+uniqueid+"\" title=\"Informações sobre a imagem\" style=\"cursor:pointer;width:20px;\" src=\"http://i57.tinypic.com/f3b2jc.png\"><span id=\"options_lurk_"+uniqueid+"\">"+googleIcon+tineye+iqdb+sauceNao+"</span>");
                $("#options_lurk_"+uniqueid).css("display","none");
                //$("#quikchan_opcoes_lurk_"+uniqueid).css("position","absolute");
                $("#quikchan_btn_info_imagem_lurk_"+uniqueid).click(function(){
                    if(typeof $(this).attr("info") == 'undefined'){
                        $(this).attr("info","viewed");
                        var sg = $("#options_lurk_"+uniqueid); 
                        sg.css("display","");
                        sg.css("width","210px");
                    }else{
                        $("#options_lurk_"+uniqueid).hide();
                        $(this).removeAttr("info");
                    }
                });

            });

            //console.log("localizando salsa");
            /*var htmlBusca = "<br><br> <input type=\"button\" value=\"Busca Reversa\" id=\"quikchan_btn_buscareversa\" />";
            htmlBusca += "<input type=\"button\" value=\"EXIF\" id=\"quikchan_btn_exif\" /> <br>";
            $("body").prepend(htmlBusca);

            $(document).on('click', '#quikchan_btn_buscareversa', function () {
                window.location.href = 'http://www.tineye.com/search/?url=' + $(this)["context"]["baseURI"];
                window.open('https://www.google.com/searchbyimage?site=search&image_url=' + $(this)["context"]["baseURI"], '_blank');

            });

            $(document).on('click', '#quikchan_btn_exif', function () {
                window.location.href = 'http://regex.info/exif.cgi?imgurl=' + $(this)["context"]["baseURI"];

            });
            $("#quikchan_menu").hide(); // Por motivos bíblicos tive que adicionar esta merda porque gerava uma incompatibilidade com alguns plugins do Google Chrome.
            */
        }

    }

    function autoEmbedarYoutube() {

         $(document).on('change', '#quikchan_config_youtubeembed',function(){ativaDesativaConfiguracao('quikchan_config_youtubeembed')});

        if (GM_getValue("quikchan_config_youtubeembed") == 1) {

            var links = document.getElementsByTagName("a");
            var bad_id;
            var p;
            for (var i = 0; i < links.length; i++) {
                //console.log(links[i].href.substring(0,32));
                if (links[i].href.indexOf("youtube.com/watch?") !== -1) {

                    //console.log(links[i].href.indexOf("https"));
                    var linkyt = "";
                    if (links[i].href.indexOf("https") === -1) { //http
                        linkyt = links[i].href.substring(31, links[i].href.length);
                    } else {
                        linkyt = links[i].href.substring(32, links[i].href.length)
                    }
                    //console.log(linkyt);

                    videoEmbed = document.createElement("iframe");
                    videoEmbed.src = "//www.youtube.com/embed/" + linkyt;
                    videoEmbed.width = "560";
                    videoEmbed.height = "315";
                    videoEmbed.frameborder = "0";
                    videoEmbed.allowfullscreen = "true";

                    p = document.createElement("p");
                    p.appendChild(videoEmbed);
                    links[i].parentNode.appendChild(p);
                    //links[i].parentNode.removeChild(links[i]);
                }
            }
            $("#quikchan_config_youtubeembed").prop("checked", true);
        }
    }

    function inicializaJqueryUI() {

        var resources = {
            'ui-icons_cccccc_256x240.png': GM_getResourceURL('ui-icons_cccccc_256x240.png'),
            'ui-bg_inset-soft_25_000000_1x100.png': GM_getResourceURL('ui-bg_inset-soft_25_000000_1x100.png'),
            'ui-bg_gloss-wave_25_333333_500x100.png': GM_getResourceURL('ui-bg_gloss-wave_25_333333_500x100.png'),
            'ui-bg_glass_20_555555_1x400.png': GM_getResourceURL('ui-bg_glass_20_555555_1x400.png'),
            'ui-icons_ffffff_256x240.png': GM_getResourceURL('ui-icons_ffffff_256x240.png'),
            'ui-bg_glass_40_0078a3_1x400.png': GM_getResourceURL('ui-bg_glass_40_0078a3_1x400.png'),
            'ui-bg_inset-soft_30_f58400_1x100.png': GM_getResourceURL('ui-bg_inset-soft_30_f58400_1x100.png'),
            'ui-icons_ffd27a_256x240.png': GM_getResourceURL('ui-icons_ffd27a_256x240.png'),
            'ui-bg_glass_100_fdf5ce_1x400.png': GM_getResourceURL('ui-bg_glass_100_fdf5ce_1x400.png'),
            'ui-icons_228ef1_256x240.png': GM_getResourceURL('ui-icons_228ef1_256x240.png'),
            'ui-bg_highlight-soft_75_ffe45c_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_ffe45c_1x100.png'),
            'ui-bg_highlight-soft_100_eeeeee_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_100_eeeeee_1x100.png')
        };

        var head = document.getElementsByTagName('head')[0];

        var style = document.createElement('style');
        style.type = 'text/css';

        var css = GM_getResourceText('jQueryUICSS');
        $.each(resources, function (resourceName, resourceUrl) {
            //console.log(resourceName + ': ' + resourceUrl);
            css = css.replace('images/' + resourceName, resourceUrl);
        });

        style.innerHTML = css;
        head.appendChild(style);
    }

    function botaoSobre() {

        $("body").append("<div id=\"quikchan_modal_sobre\" title=\"Sobre\" style=\"display:none\"><p> <img src=\"http://i58.tinypic.com/25jfaed.jpg\" width=\"249px\"> Criei este plugin com intuito de facilitar algumas coisas no chan, quem quiser editar e melhorar sinta-se livre para fazer isso. </p> <p> Página oficial: http://userscripts.org/scripts/show/417358 </p> </div>");
        $("#quikchan_menu").append("<input type=\"button\" id=\"quikchan_btn_sobre\" value=\"Sobre\">");
        $(document).on('click', '#quikchan_btn_sobre', function () {

            $("#quikchan_modal_sobre").dialog({
                modal: true,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
    }

    function adicionarBotaoConfiguracoes() {

         $(document).on('change', '#quikchan_config_thread',function(){ativaDesativaConfiguracao('quikchan_config_thread')});
        var TITLE_CONFIG_MODAL = "Configurações - 55 Chan";

        var html = "<input type='button' id=\"quikchan_button_config\" value='Configurações'>";
        html += "<div id=\"quikchan_modal_config\" title=\"" + TITLE_CONFIG_MODAL + "\" style=\"display:none\"></div>";
        $("#quikchan_menu").append(html);

        //Carregar funcionalidades de configurações
        var html = '<p><input type="checkbox" id="quikchan_config_thumbhd" value="1">Thumbs em HD</p>';
        html += "<p><input type=\"checkbox\" id=\"quikchan_config_youtubeembed\" value=\"1\">Incorporar links do Youtube</p>";
        html += "<p><input type=\"checkbox\" id=\"quikchan_config_findsauce\" value=\"1\">Busca reversa</p>";
        // html += "<p><input type=\"checkbox\" id=\"quikchan_config_thread\" value=\"1\">Nova modal Resposta/Criar thread</p>";
        $("#quikchan_modal_config").append(html);

        $(document).on('click', '#quikchan_button_config', function () {
            $("#quikchan_modal_config").dialog({
                width: 600,
                modal: true,
                buttons: {
                    Fechar: function(){$(this).dialog("close");},
                    Salvar: function () {
                        $(this).dialog("close");
                        window.location.reload();
                    }
                }
            });
        });

    }

    function embedarFacebook() {

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_facebookembed\" value=\"1\">Incorporar video do Facebook</p>");

        var ObjTo = "quikchan_config_facebookembed";
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
            $("#" + ObjTo).prop("checked", true);

            try {
                var linksFacebook = $("blockquote:contains('photo.php?v=')")
                /*
                Precisa tratar o link como texto e nao como tag A
                Tipos de link
                https://www.fb.com/photo.php?v=292377390928482
                /photo.php?v=492781650834213&set=vb.100003071460805&type=3&theater
                */
                $.each(linksFacebook, function(key,value){
                    var linkForm = linksFacebook[key].outerHTML;
                    var indexFind = linkForm.indexOf("photo.php?v=");

                    //Vou fazer ele verificar se terminar com aspas duplas ou & 
                    var indexLast = linkForm.indexOf("\n", indexFind);
                    if(indexLast === -1){
                        indexLast = linkForm.indexOf("&", indexFind);

                    }
                    var LinkPosition = linkForm.substring(indexFind, indexLast);
                    //console.log(indexFind, indexLast, LinkPosition);

                    var videoID = LinkPosition.replace("photo.php?v=","").trim();
                    var linkCompleto = "https://www.facebook.com/video/embed?video_id=" + videoID;

                    //var idIframeUnique = "quikchan_videoID_" + Math.floor((Math.random()*1000)+1);
                    var idIframeUnique = "quikchan_videoID";
                    var embedFacebook = '<iframe id="' + idIframeUnique + '" src="http://www.facebook.com/video/embed?video_id=' + videoID + '" width="400" height="400" frameborder="0"></iframe>';
                    linksFacebook.eq(key).append(embedFacebook)
                    //console.log(embedFacebook);
                    //console.log(linksFacebook.eq(key));

                })

            } catch (err) {

            }
        }
    }

    function embedarXvideos() {

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_xvideosembed\" value=\"1\">Incorporar video do Xvideos</p>");

        var ObjTo = "quikchan_config_xvideosembed";
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
            $("#" + ObjTo).prop("checked", true);

            var links = document.getElementsByTagName("a");
            var bad_id;
            var p;

            for (var i = 0; i < links.length; i++) {
                //console.log(links[i].href.substring(0,32));
                if (links[i].href.indexOf("http://www.xvideos.com/video") !== -1) {

                    var linkCompleto = links[i].href;
                    var indexFirst = linkCompleto.indexOf("http://www.xvideos.com/video");
                    var indexLast = linkCompleto.indexOf("/", indexFirst + 28);
                    var videoID = linkCompleto.substring(indexFirst + 28, indexLast);

                    videoEmbed = document.createElement("iframe");
                    videoEmbed.src = "//flashservice.xvideos.com/embedframe/" + videoID;
                    videoEmbed.width = "510";
                    videoEmbed.height = "400";
                    videoEmbed.frameborder = "no";
                    videoEmbed.allowfullscreen = "true";
                    videoEmbed.scrolling = "no";
                    videoEmbed.style.backgroundColor='#000000';

                    p = document.createElement("p");
                    p.appendChild(videoEmbed);
                    links[i].parentNode.appendChild(p);
                    links[i].parentNode.removeChild(links[i]);

                }

            }
        }
    }

    function contadortopo() {

        //firefox nao permiti voce adicionar tag javascript
        var tag = '<span id="quikchan_contador" style="float:right;"><script id="_wau9gx">var _wau = _wau || []; _wau.push(["small", "ono569uq4bb4", "9gx"]);(function() {var s=document.createElement("script"); s.async=true;s.src="http://widgets.amung.us/classic.js";document.getElementsByTagName("head")[0].appendChild(s);})();</script></span>';
        $("#quikchan_menu").append(tag);
    }

    function OCRImage(image) {
        var canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0)
        return OCRAD(canvas)
    }

    function OCRPath(url, callback) {
        var image = new Image()
        image.src = url;
        image.onload = function () {
            callback(OCRImage(image))
        }
    }

    function lerCaptcha(urlImagem) {
        OCRPath(urlImagem, function (words) {
            $("input[name=captcha]").attr("value", words);
        })
    }

    function autoPreencherCaptcha() {
        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_autocaptcha\" value=\"1\">Auto Captcha</p>");
        
        var ObjTo = "quikchan_config_autocaptcha";
        
        $(document).on('change', "#" + ObjTo,function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {

            $("#" + ObjTo).prop("checked", true);
            //$("#captchaimage").parent().append("<b>Auto preenchimento ativado!</b>");

            lerCaptcha($("#captchaimage").attr("src"));

            $(document).on('click', "#captchaimage", function () {
                lerCaptcha($("#captchaimage").attr("src"));
            });
        }
    }

    function autoNoko() {

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_autonoko\" value=\"1\">Auto Noko</p>");
        var ObjTo = "quikchan_config_autonoko";

        $(document).on('change', "#" + ObjTo, function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
            $("#" + ObjTo).prop("checked", true);
            $("input[name=em]").val("noko");
            //$("input[name=em]").prop('readonly', true);
        }
    }

    function papeldeparede() {

        $("#quikchan_modal_config").append("<p>Papel de Parede <br> Ex: http://www.meusite.com.br/foto.jpg <br> <input type=\"text\" id=\"quikchan_config_papeldeparede\"> <input type=\"button\" value=\"Salvar\" id=\"quikchan_btn_papelparede\"></p>");
        var ObjTo = "quikchan_config_papeldeparede";

        $(document).on('click', "#quikchan_btn_papelparede", function () {
            GM_setValue(ObjTo, $("#" + ObjTo).val());
            alert("Papel de parede salvo!");
        });

        if (GM_getValue(ObjTo) != 0 && GM_getValue(ObjTo) !== undefined) {
            $("#quikchan_config_papeldeparede").val(GM_getValue(ObjTo));
            document.body.style.backgroundImage = "url('" + GM_getValue(ObjTo) + "')";
            document.body.style.backgroundRepeat = "none";
            document.body.style.backgroundAttachment = "fixed";
        }

    }

    function pegarInformacoesDaImagemNoCancro() {

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_facebookreverse\" value=\"1\">Identifica qualquer filename do Facebook e habilita Album/Perfil</p>");
        var ObjTo = "quikchan_config_facebookreverse";

        $(document).on('change', "#" + ObjTo, function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {

            //console.log("Listando todas as fotos do face.");
            var pesquisaObjetos = $('span:contains("_n.jpg")');
            var arrayPhotoIDs = new Array();

            $.each(pesquisaObjetos, function (key, value) {

                if (value.outerHTML.indexOf("<span class=\"filesize\">") !== -1) {

                    var textoOriginalSujo = value.outerHTML;
                    var photoFirstIndex = textoOriginalSujo.indexOf("_n.jpg");
                    var photoLastIndex = textoOriginalSujo.lastIndexOf("\n", photoFirstIndex);
                    var photoID = textoOriginalSujo.substring(photoFirstIndex, photoLastIndex);

                    if (arrayPhotoIDs.indexOf(photoID) === -1 && photoID.length > 15) {

                        var textoOriginalBlockquote = $('span:contains("_n.jpg")').parent().eq(key).find("blockquote").eq(0).html()
                        var photoID_originalCode = photoID.split("_");
                        var iframeFacebook = "<input type=\"button\" value=\"Abrir perfil\" onClick=\"window.open('https://www.facebook.com/photo.php?fbid=" + photoID_originalCode[1] + "','_blank')\">";
                        $('span:contains("_n.jpg")').parent().eq(key).find("blockquote").eq(0).html(textoOriginalBlockquote + "<p>" + iframeFacebook + "</p>")

                    }


                }
            });
        $("#" + ObjTo).prop("checked", true);
        }

    }

    function helperMensagem() {

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_atalhos_teclado\" value=\"1\">Atalho para códigos (bold, itálico e etc)</p>");
        var ObjTo = "quikchan_config_atalhos_teclado";
        $(document).on('change', "#" + ObjTo, function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {

                var mensagem = $("textarea[name=message]");
                mensagem.parent().prepend("</p>");
                mensagem.parent().prepend("<input type=\"button\" value=\"b\" alt=\"Negrito\" id=\"quikchan_btn_helper_bold\">");
                mensagem.parent().prepend("<input type=\"button\" value=\"i\" alt=\"Italico\" id=\"quikchan_btn_helper_italico\">");
                mensagem.parent().prepend("<input type=\"button\" value=\"spoiler\" alt=\"spoiler\" id=\"quikchan_btn_helper_spoiler\">");
                mensagem.parent().prepend("<input type=\"button\" value=\"strike\" alt=\"strike\" id=\"quikchan_btn_helper_strike\">");
                mensagem.parent().prepend("<input type=\"button\" value=\"code\" alt=\"código\" id=\"quikchan_btn_helper_code\">");
                mensagem.parent().prepend("<p>");

                //Listeners dos botoes
                $(document).on('click', "#quikchan_btn_helper_bold", function () {
                    mensagem.val($("textarea[name=message]").val().replace(ShowSelection(document.getElementsByName("message")[0]), "[b]" + ShowSelection(document.getElementsByName("message")[0]) + "[/b]"));
                });

                $(document).on('click', "#quikchan_btn_helper_italico", function () {
                    mensagem.val($("textarea[name=message]").val().replace(ShowSelection(document.getElementsByName("message")[0]), "[i]" + ShowSelection(document.getElementsByName("message")[0]) + "[/i]"));
                });

                $(document).on('click', "#quikchan_btn_helper_spoiler", function () {
                    mensagem.val($("textarea[name=message]").val().replace(ShowSelection(document.getElementsByName("message")[0]), "[spoiler]" + ShowSelection(document.getElementsByName("message")[0]) + "[/spoiler]"));
                });

                $(document).on('click', "#quikchan_btn_helper_strike", function () {
                    mensagem.val($("textarea[name=message]").val().replace(ShowSelection(document.getElementsByName("message")[0]), "[s]" + ShowSelection(document.getElementsByName("message")[0]) + "[/s]"));
                });

                $(document).on('click', "#quikchan_btn_helper_code", function () {
                    mensagem.val($("textarea[name=message]").val().replace(ShowSelection(document.getElementsByName("message")[0]), "[code]" + ShowSelection(document.getElementsByName("message")[0]) + "[/code]"));
                });
        $("#" + ObjTo).prop("checked", true);
        }
    }

    function ShowSelection(obj) {

        var textComponent = obj;
        var selectedText;
        // IE version
        if (document.selection != undefined) {
            textComponent.focus();
            var sel = document.selection.createRange();
            selectedText = sel.text;
        }
        // Mozilla version
        else if (textComponent.selectionStart != undefined) {
            var startPos = textComponent.selectionStart;
            var endPos = textComponent.selectionEnd;
            selectedText = textComponent.value.substring(startPos, endPos)
        }
        return selectedText;
    }

    function embedarXHamster() {

        $("#quikchan_modal_config").append("<p><input type=\"checkbox\" id=\"quikchan_config_xhamstersembed\" value=\"1\">Incorporar video do XHamster</p>");
        var ObjTo = "quikchan_config_xhamstersembed";
        $(document).on('change', "#" + ObjTo, function(){ativaDesativaConfiguracao(ObjTo)});

        if (GM_getValue(ObjTo) == 1) {
            $("#" + ObjTo).prop("checked", true);
            var links = document.getElementsByTagName("a");
            var bad_id;
            var p;

            for (var i = 0; i < links.length; i++) {
                //console.log(links[i].href.substring(0,32));
                if (links[i].href.indexOf("http://xhamster.com/movies/") !== -1) {

                    var linkCompleto = links[i].href;
                    var indexFirst = linkCompleto.indexOf("http://xhamster.com/movies/");
                    var indexLast = linkCompleto.indexOf("/", indexFirst + 27);
                    var videoID = linkCompleto.substring(indexFirst + 27, indexLast);

                    //console.log(videoID);
                    //<iframe width="510" height="400" src="http://xhamster.com/xembed.php?video=1994306" frameborder="0" scrolling="no"></iframe>

                    videoEmbed = document.createElement("iframe");
                    videoEmbed.src = "//xhamster.com/xembed.php?video=" + videoID;
                    videoEmbed.width = "510";
                    videoEmbed.height = "400";
                    videoEmbed.frameborder = "0";
                    videoEmbed.allowfullscreen = "true";
                    videoEmbed.scrolling = "no";

                    p = document.createElement("p");
                    p.appendChild(videoEmbed);
                    links[i].parentNode.appendChild(p);
                    links[i].parentNode.removeChild(links[i]);
                }
            }
        }
    }

    function retiraElementosInuteis() {
        //$(".navbar").hide();
        $(".adminbar").hide();
        //$(".logo").hide();
        $("center > p:contains('Denúncias')").hide();
        $(".content,ads").hide();
        //$("p[class=contador]").hide();
        //$("div[class=footer]").hide()
    }

    function setMenu_css() {
        var menucss = '<select onchange="javascript:if(selectedIndex != 0)set_stylesheet(options[selectedIndex].value);return false;">\
            <option>Estilos</option>\
            <option value="Festaduro">Festaduro</option>\
            <option value="Favela">Favela</option>\
            <option value="Cotas">Cotas</option>\
            <option value="Burichan">Burichan</option>\
            <option value="Futaba">Futaba</option>\
            <option value="Favela_Pacificada">Favela_Pacificada</option>\
            <option value="Jj">Jj</option>\
            <option value="Nigrachan">Nigrachan</option>\
            <option value="Magali">Magali</option>\
            <option value="Novo_Jungle">Novo_Jungle</option>\
            <option value="Confraria">Confraria</option>\
            <option value="Rorichan">Rorichan</option>\
            <option value="Steam">Steam</option>\
            <option value="Eechan_Brstyle">Eechan_Brstyle</option>\
            <option value="Kusabax">Kusabax</option>\
            <option value="Yotsuba">Yotsuba</option>\
         </select>';
        $("#quikchan_menu").append(menucss);
    }

    function setMenu_boards() {
        // Adiciona menu
        $("body").prepend("<div id='quikchan_menu'></div>");

        /* Retirei depois de muitas reclamações
        var boards = "a,b,d,mod,cri,c,an,lit,mu,tv,jo,lan,cb,comp,help,pol,UF55,sch,34,pr0n,pinto,tr,esp,o,high,mimimi,gtk,$,fit,pfiu,vs,vi,br,int,pl,au";
        boards = boards.split(",");
        var html_boards_selector = "<select id=\"boards_selector\"> \n";
            html_boards_selector += "<option>Selecione a board</option>";
        
        for(i=0; i<boards.length; i++){
            //console.log(boards[i]);
            html_boards_selector += "<option value=\""+boards[i]+"\"> /"+boards[i]+"/ </option> \n"; 
        }
        html_boards_selector += "</select>";
        $("#quikchan_menu").append(html_boards_selector);
        */
    }
    start(); //Carrega o plugin no chan escolhido, futuramente vou implementar para que funcione em qualquer chan com Kusaba.
    });