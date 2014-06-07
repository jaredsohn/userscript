// ==UserScript==
// @name           generador informes expedicion
// @namespace      http://userscripts.org/users/143231
// @description    generador informes expedicion
// @version        1.0
// @author         Pedrolor
// @updateURL      http://userscripts.org/scripts/source/75647.meta.js
// @downloadURL    https://userscripts.org/scripts/source/75647.user.js
// @include        http://*.ogame.*/game/index.php?*page=*
// @require        http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==


( function ()
{

	var SCRIPT = 
  {
    name: "generador informes expedicion"
    ,url: "http://userscripts.org/scripts/show/75647"
    ,version: "1.0"
    ,funciona_ok: "5.2.99.99"
	};

	if((typeof(oGameVersionCheck) != "undefined")) 
  {
 	  oGameVersionCheck(SCRIPT.name + ' ' + SCRIPT.version, SCRIPT.funciona_ok, SCRIPT.url);
	}

	// jQuery
	var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
	var $ = unsafe.jQuery;
	if ( !$ ) return;


  $('body').ajaxSuccess(function(e,xhr,settings)
  {
    if(settings.url.indexOf("/game/index.php?page=showmessage") != -1) 
    {

      if(getElementsByClass("infohead")[0].innerHTML.indexOf("Resultado de la expedición") != -1)
        {
          informe();
          alert
        }
    }
    
  });


	function getElementsByClass(cls) 
  {
    var itemsfound = new Array;
    var elements = document.getElementsByTagName('*');
    for(var i=0;i<elements.length;i++)
    {
      if(elements[i].className == cls)
      {
        itemsfound.push(elements[i]);
      }
    }
    return itemsfound;
  }

  function getElementsByClass(searchClass,node,tag) 
  {
    var classElements = new Array();
    if (node == null) 
        node = document;
    if (tag == null) 
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;

    for (var i = 0, j = 0; i < elsLen; i++) 
    {
        var sep = els[i].className.split(" ");
        var content = false;
        
        for(var k = 0; k < sep.length; k++)
        {
            if(sep[k] == searchClass) 
                content = true;
        }
        
        if (els[i].className == searchClass || content) 
        {
          classElements[j] = els[i];
          j++;
        }
    }
    return classElements;
  }
  
  var Lista = 
  {
    Metal : 'Metal',
    Cristal : 'Cristal',
    Deuterio : 'Deuterio',
    Materia : 'Oscura',
    // Flota
    fl_Cp1 : 'pequeña',
    fl_Cp2 : 'Nave',
    fl_Cg1 : 'grande',
    fl_li : 'ligero',
    fl_pe : 'pesado',
    fl_cr : 'Crucero',
    fl_Nb : 'batalla',
    fl_Se : 'espionaje',
    fl_Bb : 'Bombardero',
    fl_Dd : 'Destructor',
    fl_Ac : 'Acorazado'
  }

  var Diario = new Object();
    Diario.Metal = 0;
    Diario.Cristal = 0;
    Diario.Deuterio = 0;
    Diario.fl_Cp = 0;
    Diario.fl_Cg = 0;
    Diario.fl_li = 0;
    Diario.fl_pe = 0;
    Diario.fl_cr = 0;
    Diario.fl_Nb = 0;
    Diario.fl_Se = 0;
    Diario.fl_Bb = 0;
    Diario.fl_Dd = 0;
    Diario.fl_Ac = 0;
  
  
  var Acumulado = new Object();
  
    Acumulado.Metal = 0;
    Acumulado.Cristal = 0;
    Acumulado.Deuterio = 0;
    Acumulado.fl_Cp = 0;
    Acumulado.fl_Cg = 0;
    Acumulado.fl_li = 0;
    Acumulado.fl_pe = 0;
    Acumulado.fl_cr = 0;
    Acumulado.fl_Nb = 0;
    Acumulado.fl_Se = 0;
    Acumulado.fl_Bb = 0;
    Acumulado.fl_Dd = 0;
    Acumulado.fl_Ac = 0;
  
    

  function BorrarD()
  {
    localStorage.removeItem (LDiario);
  }

  function BorrarA()
  {
    localStorage.removeItem(LAcumulado);
  }

  function IniciaD()
  {
    Diario.Metal = 0;
    Diario.Cristal = 0;
    Diario.Deuterio = 0;
    Diario.fl_Cp = 0;
    Diario.fl_Cg = 0;
    Diario.fl_li = 0;
    Diario.fl_pe = 0;
    Diario.fl_cr = 0;
    Diario.fl_Nb = 0;
    Diario.fl_Se = 0;
    Diario.fl_Bb = 0;
    Diario.fl_Dd = 0;
    Diario.fl_Ac = 0;
  }
  
  function IniciaA()
  {
    Acumulado.Metal = 0;
    Acumulado.Cristal = 0;
    Acumulado.Deuterio = 0;
    Acumulado.fl_Cp = 0;
    Acumulado.fl_Cg = 0;
    Acumulado.fl_li = 0;
    Acumulado.fl_pe = 0;
    Acumulado.fl_cr = 0;
    Acumulado.fl_Nb = 0;
    Acumulado.fl_Se = 0;
    Acumulado.fl_Bb = 0;
    Acumulado.fl_Dd = 0;
    Acumulado.fl_Ac = 0;
  }

  function ComprobarRec(texto_array)
  {
    for (i=0; i <= texto_array.length; i++)
    {
      switch (texto_array[i])
      {

        case Lista.Metal:
        Diario.Metal += parseInt(texto_array[i+2]);
        Acumulado.Metal += parseInt(texto_array[i+2]);
        return true;

        case Lista.Cristal:
        Diario.Cristal += parseInt(texto_array[i+2]);
        Acumulado.Cristal += parseInt(texto_array[i+2]);
        return true;

        case Lista.Deuterio:
        Diario.Deuterio += parseInt(texto_array[i+2]);
        Acumulado.Deuterio += parseInt(texto_array[i+2]);
        return true;

        case Lista.Materia:
        Diario.Materia += parseInt(texto_array[i+2]);
        Acumulado.Materia += parseInt(texto_array[i+2]);
        return true;
         
      }
    }
      
    return false;
  }

  function ComprobarFlo(texto_array)
  {
    var hay = new boolean();
    hay = false;
    for (i = 0; i <= texto_array.length; i++)
    {
      switch (texto_array[i])
      {
        case Lista.fl_Cp2:
        if (texto_array[i + 1] == Lista.fl_Cp)
        {
          Diario.fl_Cp += parseInt(texto_array[i+3]);
          Acumulado.fl_Cp += parseInt(texto_array[i+3]);
          hay = true;
          if (i == texto_array.length)
          {
            return true;
          }
        }

        else if (texto_array[i + 1] == Lista.fl_Cg)
        {
          Diario.fl_Cg += parseInt(texto_array[i+3]);
          Acumulado.fl_Cg += parseInt(texto_array[i+3]);
          hay = true;
          if (i == texto_array.length)
          {
            return true;
          }
        }

        else if (texto_array[i + 2] == Lista.fl_Nb)
        {
          Diario.fl_Nb += parseInt(texto_array[i + 1]);
          Acumulado.fl_Nb += parseInt(texto_array[i+1]);
          hay = true;
          if (i == texto_array.length)
          {
            return true;
          }
        }

        case Lista.fl_li:
        Diario.fl_li += parseInt(texto_array[i+1]);
        Acumulado.fl_li += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
          return true;
        }

        case Lista.fl_pe:
        Diario.fl_pe += parseInt(texto_array[i+1]);
        Acumulado.fl_pe += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
          return true;
        }

        case Lista.fl_cr:
        Diario.fl_cr += parseInt(texto_array[i+1]);
        Acumulado.fl_cr += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
         return true;
        }

        case Lista.fl_Ac:
        Diario.fl_Ac += parseInt(texto_array[i+1]);
        Acumulado.fl_Ac += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
          return true;
        }

        case Lista.fl_Bb:
        Diario.fl_Bb += parseInt(texto_array[i+1]);
        Acumulado.fl_Bb += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
          return true;
        }

        case Lista.fl_Dd:
        Diario.fl_Dd += parseInt(texto_array[i+1]);
        Acumulado.fl_Dd += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
          return true;
        }

        case Lista.fl_Se:
        Diario.fl_Se += parseInt(texto_array[i+1]);
        Acumulado.fl_Se += parseInt(texto_array[i+1]);
        hay = true;
        if (i == texto_array.length)
        {
          return true;
        }
      }
    }
    return hay;
  }
  //----------------------------------------------------------------------------------------------------------------------------

	function informe() 
  {

    //comprobar fecha y id del mensaje;
    var IdMensaje_A = new Array();
    fecha = new Date();
    if (localStorage[LAcumulado])
    {
      Diario = JSON.parse(localStorage[LDiario]);
      Acumulado = JSON.parse(localStorage[Acumulado]);
    }
    if (localStorage[IdMensaje])
    { 
      IdMensaje_A = JSON.parse(localStorage[IdMensaje]);
      for (var i = IdMensaje_A.length - 1; i >= 0; i--) 
      {
        if (IdMensaje_A[i] == getElementsByClass("data-message-id")[0].innerHTML)
        {
          return;
        }
      };
      j = IdMensaje_A.length;
      IdMensaje_A[j] = getElementsByClass("data-message-id")[0].innerHTML;
      localStorage[IdMensaje] = JSON.stringify(IdMensaje_A);
      var note = getElementsByClass("note")[0].innerHTML;
      var note_A = note.split(" ");
      if ((ComprobarRec(note_A)) || (ComprobarFlo(note_A))) 
      {
        var diames=fecha.getDate();
        var mes=fecha.getMonth() +1 ;
        var ano=fecha.getFullYear();
        if ((localStorage[diames] == diames) && (localStorage[mes] == mes) && (localStorage[ano] == ano))
        {
          localStorage[LDiario] = JSON.stringify(Diario);
          localStorage[LAcumulado] = JSON.stringify(Acumulado);
        }
        else 
        {
          localStorage.removeItem (LDiario);
          localStorage[diames] = diames;
          localStorage[mes] = mes;
          localStorage[ano] = ano;
          localStorage[LDiario] = JSON.stringify(Diario);
          localStorage[LAcumulado] = JSON.stringify(Acumulado);
        }
      }
    }
    else 
    {
      IdMensaje_A[0] = getElementsByClass("data-message-id")[0].innerHTML;
      localStorage[IdMensaje] = JSON.stringify(IdMensaje_A);
      var note = getElementsByClass("note")[0].innerHTML;
      var note_A = note.split(" ");
      if ((ComprobarRec(note_A)) || (ComprobarFlo(note_A)))
      {
        var diames = fecha.getDate();
        var mes = fecha.getMonth() +1 ;
        var ano = fecha.getFullYear();
        localStorage[diames] = diames;
        localStorage[mes] = mes;
        localStorage[ano] = ano;
        localStorage[LDiario] = JSON.stringify(Diario);
        localStorage[LAcumulado] = JSON.stringify(Acumulado);
      }
    }
  }
  
  function BotonMenu() 
  {

    // crear el boton en el menu
    this.crear = function() 
    {
      var MenuTableTools = document.getElementById('menuTableTools'); 
      var Data = document.getElementById('div_exp');
      if (Data == null && MenuTableTools != null) 
      {
        var ListElement = document.createElement('li');
        ListElement.innerHTML = '<div id="div_exp" style="display: none;"></div>'
        + '<a id="btn_menu_exp" href="javascript:void(0)" class="menubutton"><span class="textlabel">'
        + "Expediciones" + '</span></a>';
        if (MenuTableTools.childNodes.length) 
        {
          MenuTableTools.insertBefore( ListElement, MenuTableTools.childNodes[0]);
        }
        else 
        {
          MenuTableTools.appendChild(ListElement);
        }
        Data = document.getElementById('div_exp');
        Data.parentNode.addEventListener('click', this.menuButton_click, false);
      }
    };
  
  
    // acciones a realizar al pulsar sobre el boton del menu
    this.menuButton_click = function() 
    {
      var ContentWrapper = document.getElementById('contentWrapper');
      if (ContentWrapper) 
      {
        var content = '';
        Inhalt = document.getElementById('inhalt');
        Container = document.getElementById('exp_div_container');
        if (Inhalt) 
        { 
          Inhalt.style.display = (Container) ? 'block' : 'none'; 
        }
      }
      if (Container) 
      {
        ContentWrapper.removeChild( Container );
      }
      else 
      {
        Container = document.createElement('div');
        Container.id = 'exp_div_container';
        if (ContentWrapper.childNodes.length) 
        {
          ContentWrapper.insertBefore( Container, ContentWrapper.childNodes[0] );
        }
        else 
        {
          ContentWrapper.appendChild( Container );
        }
      
        // AQUI EL CONTENIDO A MOSTRAR
        if (localStorage[LAcumulado])
        {
          Diario = JSON.parse(localStorage[LDiario]);
          Acumulado = JSON.parse(localStorage[LAcumulado]);
        }

        else
        {
          IniciaA();
          IniciaD();
        }
        content += '<br><br>R E C U R S O S  Y  F L O T A  O B T E N I D O S  E N  E X P E D I C I O N E S<br>';
        content += '    <br>                    DIARIO                   ACUMULADO<br>';
        content += 'RECURSOS______________________________________________________________________<br> <br>';
        content += ' METAL_____________: '+ Diario.Metal +'                ' + Acumulado.Metal + '<br>';
        content += ' CRISTAL___________: '+ Diario.Cristal +'                ' + Acumulado.Cristal + '<br>';
        content += ' DEUTERIO__________: '+ Diario.Deuterio +'                ' + Acumulado.Deuterio + '<br>';
        content += ' MATERIA OSCURA____: '+ Diario.Materia +'                ' + Acumulado.Materia + '<br>';
        content += 'FLOTA_________________________________________________________________________<br> <br>';
      
        document.getElementById('exp_div_container').innerHTML = content;
      }
    }
  }

  var boton = new BotonMenu();
  boton.crear();
}) ()

