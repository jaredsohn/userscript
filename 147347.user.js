// ==UserScript==
// @name        Buitreador
// @namespace   
// @description Para buitrear minitas :F
// @author      hinafu
// @include     http://*.taringa.net/*
// @grant       none
// ==/UserScript==

//=============================================================================

(function() {
  if($("span").hasClass("nick floatL") && $("i").hasClass("icon hastipsy femme")){ //Solo debe funcionar si se está logueado! y si el usuario es mujer
    var direccion = window.location.pathname;
    if( direccion.indexOf("posts") != -1 || direccion.indexOf("comunidades") != -1 ) { //Si te encuentras en un post
      var buitrear = document.createElement("button");
      var id = "Buitrear";
      buitrear.setAttribute("id",id);
      buitrear.innerHTML = "<img src='http://o1.t26.net/images/smiles/winky.gif' />&nbspBuitrear";
      var barra = document.getElementById("post-author-box");
      barra.appendChild(buitrear);
      $("#Buitrear").click(function() {
        var caja = document.getElementById("body_comm");
        caja.value = "[img=http://desdeelforjado.files.wordpress.com/2008/11/1150657454ftl61.jpg?w=376&h=408]";
        if(direccion.indexOf("posts") != -1) nadd_comment(comment_ultima_pagina);
        else if(direccion.indexOf("comunidades") != -1) add_resp(comment_ultima_pagina);
        window.scrollTo(0,document.body.scrollHeight);
        $(this).hide();
      });
    }
    else if(direccion.length > 1 && $("button").hasClass("my-shout-add btn a floatR wall")) {
      //Si es que estás en el perfil y hay opción para compartir D:
      var aux = document.getElementsByClassName("my-shout-footer wall clearfix");
      var buitrear = document.createElement("a");
      var id = "Buitrear";
      buitrear.setAttribute("class","btn g require-login");
      buitrear.setAttribute("id",id);
      buitrear.innerHTML = "<img src='http://o1.t26.net/images/smiles/winky.gif' />&nbspBuitrear";
      aux[0].appendChild(buitrear);
      
      $("#Buitrear").live('click',function(event) {
        var caja = document.getElementById("my-shout-body-wall");
        var botImg = $(document).find('a[data-method="url"]');
        $(botImg).trigger("click");
        var imagen = document.getElementById("template_attach_image_input");
        var qp = $("input[placeholder='URL de la imagen']");
        var texto = $("input[placeholder='URL de la imagen',type='submit',name='url']");
        var url_el = $(document).find('.my-shout-attach input[name="url"]');
        $(url_el).val("http://k39.kn3.net/taringa/3/7/3/4/4/6//hinafu/238.jpg");
        var agregar = $(document).find('.my-shout-attach input[value="Agregar"]');
        $(agregar).trigger("click");
        $("document").ready(function() {
          setTimeout(function() {
            $(".my-shout-add").trigger("click");
          },2500);
        });
      });
    }
  }
})();