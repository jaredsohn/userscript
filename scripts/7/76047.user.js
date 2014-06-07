// ==UserScript==
// @name           Animoto en espanol
// @namespace      Animoto en espanol
// @description    Animoto en espanol
// @include        http*://animoto.com/*
// ==/UserScript==
var currURL = location.href;
var arrURL = currURL.split('/');
var whereIam = arrURL[3];


if(whereIam=="")
    {
        if(document.getElementById("header_visitor"))
        {
            document.getElementById("header_visitor").childNodes[1].childNodes[0].innerHTML = "Regístrate";
            document.getElementById("header_visitor").childNodes[3].childNodes[0].innerHTML = "<a href=\"/sign_in\">Conectar</a> o ";
        }
        else
        {
            document.getElementById("header_logged_in").childNodes[1].childNodes[1].innerHTML = "Crear Video";
            document.getElementById("header_logged_in").childNodes[3].childNodes[1].childNodes[3].innerHTML = "Mis Vídeos";
            document.getElementById("header_logged_in").childNodes[3].childNodes[1].childNodes[5].innerHTML = "Cuenta";
            document.getElementById("header_logged_in").childNodes[3].childNodes[1].childNodes[7].innerHTML = "Salir";
        }
        //document.getElementById("header_account").childNodes[1].childNodes[5].innerHTML = "Salir";
    }
else if(whereIam=="sign_in")
 {
        document.getElementById("loginContainer").childNodes[1].childNodes[1].innerHTML = "Conectar por favor";
        document.getElementById("loginContainer").childNodes[1].childNodes[3].childNodes[0].childNodes[0].innerHTML = "nuevo usuario? regístrate ahora »";

        document.getElementById("mainSignInForm").childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[1].innerHTML = '<input type="text" tabindex="1" name="email" id="email" class="email required"><br><label for="email" label="email address " link="">correo electrónico </label>';
        document.getElementById("mainSignInForm").childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[3].innerHTML = '<input type="password" tabindex="2" name="password" id="password" class="required"><br><label for="password" label="password " link="&lt;a href=&quot;/forgot_password&quot; class=&quot;help&quot;&gt;Forgot your password?&lt;/a&gt;">Contraseña <a class="help" href="/forgot_password">¿Has olvidado la contraseña?</a></label>';
        document.getElementById("mainSignInForm").childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[5].innerHTML = '<input type="checkbox" value="1" tabindex="3" name="remember_me" id="remember_me" checked="checked"> <label for="remember_me" label="Remember me" link="">Recordarme</label>';
        document.getElementById("mainSignInForm").childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[7].innerHTML = '<button tabindex="4" class="button medium" type="submit" id="btn_submit">Conectar</button>';
    }
else if(whereIam=="projects")
 {




        document.getElementById("nav_create").childNodes[0].innerHTML = "Crear Video";
        document.getElementById("nav_videos").childNodes[0].innerHTML = "Mis Vídeos";
        document.getElementById("nav_lounge").childNodes[0].innerHTML = "Musica";
        document.getElementById("nav_help").childNodes[0].innerHTML = "Ayuda";

        document.getElementById("header_account").childNodes[1].childNodes[3].innerHTML = "Cuenta";
        document.getElementById("header_account").childNodes[1].childNodes[5].innerHTML = "Salir";

        document.getElementById("insetInfo_header_aboutYourCollection").childNodes[0].innerHTML = "Acerca de su colección";
        document.getElementById("section_info_text").childNodes[3].innerHTML = '<p>Aquí usted puede encontrar todos los videos que has creado y los que han compartido con usted.</p><p><strong>Escuchar </strong> ellos, <strong>obtener información</strong> sobre ellos, o <strong>eliminarlos </strong> de su colección.</p><p>Si sus amigos le han enviado videos, vas a encontrar debajo de <strong><a onclick="changeView(\'friends_videos\'); return false;" href="#">los videos de sus amigos</a></strong>.</p>';
        document.getElementById("text_aboutYourVideo").childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML = "Mi colección :";
        document.getElementById("text_aboutYourVideo").childNodes[1].childNodes[1].childNodes[2].childNodes[0].innerHTML = "De los amigos :";

        var listlen = document.getElementById("my_videos").childNodes[1].childNodes.length;
        for(var i = 0; i < listlen; i++){
            var currentNode = document.getElementById("my_videos").childNodes[1].childNodes[i];
            if(currentNode.nodeType==1)
            {
                if(currentNode.nodeName=="H3")
                {
                    if(currentNode.innerHTML=="Finished Videos") currentNode.innerHTML="Videos Terminado";
                    if(currentNode.innerHTML=="Open Projects") currentNode.innerHTML="Proyectos Open";
                }
                if(currentNode.nodeName=="DIV")
                {
                    var subnodesLN = currentNode.childNodes.length;
                    for(var j = 0;j<subnodesLN;j++)
                    {
                        if(currentNode.childNodes[j].nodeType==1)
                        {
                            if(currentNode.childNodes[j].nodeName=="A")
                            {
                                if(currentNode.childNodes[j].innerHTML=="continue") currentNode.childNodes[j].innerHTML="continuar";
                                if(currentNode.childNodes[j].innerHTML=="delete") currentNode.childNodes[j].innerHTML="suprimir";
                                if(currentNode.childNodes[j].innerHTML=="play") currentNode.childNodes[j].innerHTML="jugar";
                                if(currentNode.childNodes[j].innerHTML=="info") currentNode.childNodes[j].innerHTML="info";
                            }
                        }
                    }
                }
            }

        }
        
 }
else if(whereIam=="play")
 {
        document.getElementById("control_ownerPanel").innerHTML = "Consejos de video<br/><small>Compartir, editar, mezclar, etc</small>";

 }
else if(whereIam=="create")
 {
        document.getElementById("nav_create").childNodes[0].innerHTML = "Crear Video";
        document.getElementById("nav_videos").childNodes[0].innerHTML = "Mis Vídeos";
        document.getElementById("nav_lounge").childNodes[0].innerHTML = "Musica";
        document.getElementById("nav_help").childNodes[0].innerHTML = "Ayuda";

        document.getElementById("header_account").childNodes[1].childNodes[3].innerHTML = "Cuenta";
        document.getElementById("header_account").childNodes[1].childNodes[5].innerHTML = "Salir";

        document.getElementById("mainContainer").childNodes[1].childNodes[1].innerHTML = "Elige tu tipo de video";
 }