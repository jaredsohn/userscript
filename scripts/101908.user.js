    // ==UserScript==
    // @name          CV-1
    // @description   DESTACAR HILOS EN CV SIN PALABRAS COMPRO/VENDO/CAMBIO
    // @include       http://*elotrolado.net/foro_compra-venta-consolas-actuales_97*
    // @include       http://*elotrolado.net/foro_compra-venta-consolas-modernas_164*
    // @include       http://*elotrolado.net/foro_compra-venta-consolas-clasicas_98*
    // @include       http://*elotrolado.net/foro_compra-venta-informatica_99*
    // @include       http://*elotrolado.net/foro_compra-venta-otros_100*
    // ==/UserScript==


    var post;
    var postcount = "0";
    var evaluation;

    
    
    evaluation = document.getElementById('rightcontent').getElementsByTagName("a")[2];
    
    if (evaluation.innerHTML == "Consolas Actuales"
    | evaluation.innerHTML =="Consolas Modernas" 
    | evaluation.innerHTML =="Consolas Clásicas" 
    | evaluation.innerHTML =="Informática"
    | evaluation.innerHTML =="Otros")
    {

    
    

    post = document.getElementsByClassName("row");
    for (postcount = 0; postcount < post.length; postcount++)
    {



       if (post[postcount].innerHTML.toUpperCase().match(/BUSCO/gi)
       ||post[postcount].innerHTML.toUpperCase().match(/COMPRO/gi)
       ||post[postcount].innerHTML.toUpperCase().match(/CAMBIO/gi)
       ||post[postcount].innerHTML.toUpperCase().match(/VENDO/gi)
       ||post[postcount].innerHTML.toUpperCase().match(/WIKI.GIF/gi)
       ||post[postcount].innerHTML.match(/announce_read_locked.gif/gi))
       {
          var paso="si" 

       }


       else
       {
          post[postcount].setAttribute("style", "background-color:#E9B457;");
       }




       if (post[postcount].innerHTML.match(/Se ha informado de este hilo/gi))
       {
          
          post[postcount].setAttribute("style", "background-color: rgb(236,213,216);");

       }




    }

   }