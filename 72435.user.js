// ==UserScript==
// @name           Bloqueador de trolls
// @namespace      Bloqueador de trolls
// @description    Permite bloquear los posts de usuarios molestos
// @include        http://www.encuentropolitico.com.ar/*
// @include        http://encuentropolitico.com.ar/*
// @version        1.0
// ==/UserScript==

var version = 1.0;
var usuariosABloquear = GM_getValue('usuariosABloquear_encuentropolitico.com.ar');

isDefined = function (myvar) {
   if (typeof(myvar) != 'undefined') 
   {
     if (myvar == null) 
     {
      return false;
     }
     else
     {
      return true;
     }
   }
   return false;
};

if (!isDefined(usuariosABloquear))
{
  usuariosABloquear = '';
  GM_setValue('usuariosABloquear_encuentropolitico.com.ar', usuariosABloquear);
}

function procesarPost(post, i, usuariosObj, esPar)
{
  var linksDelPost = post.getElementsByTagName('A');
  var linkUsuario;
  var usuarioPost;
  var divBloqueo;
  var linkBloqueo;
  var j = 0;
  var encontre = false;

  if (linksDelPost.length > 0)
  {
    usuarioPost = '';
    
    while (!encontre && (j < linksDelPost.length))
    {
      linkUsuario = String(linksDelPost[j].href);
      if (linkUsuario.indexOf('action=profile;u=') > -1)
      {
        usuarioPost = linksDelPost[j].innerHTML;
        encontre = true;
      }
      j++;
    }

    if (usuariosObj[usuarioPost.toLowerCase()] == 1)
    {
      //hay que bloquear
      if (esPar)
      {
        divBloqueo = document.getElementById('bloqueo_par' + i);
      }
      else
      {
        divBloqueo = document.getElementById('bloqueo_impar' + i);
      }
      
      if (!isDefined(divBloqueo))
      {
        divBloqueo = document.createElement('DIV');
        if (esPar)
        {
          divBloqueo.id = 'bloqueo_par' + i;
          divBloqueo.style.background = "none repeat scroll 0 0 #DFF7FF";
        }
        else
        {
          divBloqueo.id = 'bloqueo_impar' + i;
          divBloqueo.style.background = "none repeat scroll 0 0 #D0E8F0";
        }
        divBloqueo.style.cursor = "pointer";
        divBloqueo.align = "center";
        divBloqueo.innerHTML = 'Post del Usuario "'+usuarioPost+'" ocultado por <b>Bloqueador de trolls</b>. <span style="text-decoration:underline;">Haz click aquí para mostrarlo</span>';
        divBloqueo.addEventListener('click', function ()
        {
          var postTD = document.getElementById(this.id.substr(8));
          if (isDefined(postTD))
          {
            if (postTD.style.display == 'none')
            {
              this.innerHTML = 'Post del Usuario "'+usuarioPost+'" visible. <span style="text-decoration:underline;">Haz click aquí para ocultarlo</span>';
              postTD.style.display = '';
            }
            else
            {
              this.innerHTML = 'Post del Usuario "'+usuarioPost+'" ocultado por <b>Bloqueador de trolls</b>. <span style="text-decoration:underline;">Haz click aquí para mostrarlo</span>';
              postTD.style.display = 'none';
            }
          }
        }, false);
        
        var postParent = post.parentNode;
        var aux = 0;
        
        while ((aux < 100) && (postParent.tagName != 'TD'))
        {
          postParent = postParent.parentNode;
          aux++;              
        }         
        if (postParent.tagName == 'TD')
        {
          if (postParent.children.length > 0)
          {
            postParent.insertBefore(divBloqueo, postParent.children[0]);
          }
          else
          {
            postParent.appendChild(divBloqueo);
          }
        }
      }
      else
      {
        if (esPar)
        {
          divBloqueo = document.getElementById('bloqueo_par' + i);
        }
        else
        {
          divBloqueo = document.getElementById('bloqueo_impar' + i);
        }
        
        if (isDefined(divBloqueo))
        {
          this.innerHTML = 'Post del Usuario "'+usuarioPost+'" ocultado por <b>Bloqueador de trolls</b>. Haz click aquí para mostrarlo';
        }
      }
      post.style.display = 'none';
    }
    else
    {
      //hay que desbloquear
      post.style.display = '';
      
      if (esPar)
      {
        divBloqueo = document.getElementById('bloqueo_par' + i);
      }
      else
      {
        divBloqueo = document.getElementById('bloqueo_impar' + i);
      }
      if (isDefined(divBloqueo))
      {
        divBloqueo.parentNode.removeChild(divBloqueo);
      }
    }
  }
}

function procesarPagina()
{
  var frm = document.getElementById('quickModForm');
  
  if (isDefined(frm))
  {
    var usuarios = usuariosABloquear.split(',');
    var usuariosObj = {};
    var i;
    var posts = {pares: frm.getElementsByClassName('windowbg'), 
                 impares: frm.getElementsByClassName('windowbg2')};
    
    for (i = 0; i < usuarios.length; i++)
    {
      usuariosObj[usuarios[i].trim().toLowerCase()] = 1;
    }
    
    for (i = 0; i < posts.pares.length; i++)
    {
      posts.pares[i].id ='par' + i;
      procesarPost(posts.pares[i], i, usuariosObj, true);
    }

    for (i = 0; i < posts.impares.length; i++)
    {
      posts.impares[i].id ='impar' + i;
      procesarPost(posts.impares[i], i, usuariosObj, false);
    }
  }
}

function configFN(e)
{
  var datos = prompt('Escriba los usuarios a bloquear separados por coma', usuariosABloquear);
  
  if (datos !== null)
  {
    usuariosABloquear = datos;
    GM_setValue('usuariosABloquear_encuentropolitico.com.ar', usuariosABloquear);
    procesarPagina();
  }  
}

GM_registerMenuCommand('Ingresar Usuarios', configFN);

procesarPagina();
