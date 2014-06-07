       // EOL HILOS CERRADOS EN PROBLEMAS CV
        // version 0.1
        // Para greasemonkey
        // --------------------------------------------------------------------
        //
        // ==UserScript==
        // @name          CV-4
        // @description   OCULTAR HILOS CERRADOS EN PROBLEMAS CV
        // @include       http://*elotrolado.net/foro_compra-venta-feedback-cv-problemas-con-transacciones_175*
        // ==/UserScript==

        var postcount = "0";
        var post;


	var ee =  document.getElementById('rightcontent').getElementsByTagName("a")[3];




        if (ee.innerHTML == "Problemas con transacciones")
        {


        post = document.getElementsByClassName("row");
        for (postCount = 0; postCount < post.length; postCount++)
        {


        if (post[postCount].innerHTML.match(/topic_read_locked.gif/gi)||post[postCount].innerHTML.match(/topic_unread_locked.gif/gi))
        {

        post[postCount].innerHTML = post[postCount].innerHTML[post[postCount].innerHTML.length - 1];           

        }


        }

        }
