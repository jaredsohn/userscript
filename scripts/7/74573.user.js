// ==UserScript==
// @name           Autocompletador de Formularios
// @namespace      Juampi_Mix
// @include        *
// @descriptcion   Autocompleta Formularios de registros (desde el menu contextual de greasemonkey)
// ==/UserScript==

// ==UserScript==

// FUNCTIONS  

GM_registerMenuCommand("Autocompletar Formulario",
  function()
    {

      var inputtexts = new Array(
      new Array (GM_getValue('af_ot',''),""), /* This one is used as a wildcard (if you want undetected fields to fill with something) */
      new Array (GM_getValue('af_ca',''),"captcha","verif","response","cword","turing","image","security","token","code"),
      new Array (GM_getValue('af_ye','1979'),"year","yy","birth"),
      new Array (GM_getValue('af_mo','10'),"month","mm"),
      new Array (GM_getValue('af_da','10'),"day","dd"),
      new Array (2008 - GM_getValue('af_ye','1979'),"age"),
      new Array (GM_getValue('af_nn','bugmenot'),"user","display","login","nick","id","member","account","name"),
      new Array (GM_getValue('af_fn','Juampi'),"first","real"),
      new Array (GM_getValue('af_ln','Mix'),"last","surname"),
      new Array (GM_getValue('af_fn','JuampiMix')+" "+GM_getValue('af_ln','Walker'),"fullname","full_name"),
      new Array (GM_getValue('af_qu','Pagina para compartir User y pass?'),"question"),
      new Array (GM_getValue('af_an','bugmenot.com'),"answer"),
      new Array (GM_getValue('af_em','Juampi_Mix@live.com.ar'),"mail","from"),
      new Array (GM_getValue('af_ms','Juampi_Mix@live.com.ar'),"msn"),
      new Array (GM_getValue('af_ic','45592738'),"icq"),
      new Array (GM_getValue('af_ti','Sr.'),"title"),
      new Array (GM_getValue('af_ph','(513) 972-6287'),"phone"),
      new Array (GM_getValue('af_ph1','513'),"phone1"),
      new Array (GM_getValue('af_ph2','972'),"phone2"),
      new Array (GM_getValue('af_ph3','6287'),"phone3","ext"),
      new Array (GM_getValue('af_fa','(513) 972-6287'),"fax"),
      new Array (GM_getValue('af_ad','4960 Brandy Run'),"address"),
      new Array (GM_getValue('af_ad2','Dayton, OH 45401'),"address2"),
      new Array (GM_getValue('af_ci','Dayton'),"city","town"),
      new Array (GM_getValue('af_ar','51'),"area"),
      new Array (GM_getValue('af_st','OH'),"state"),
      new Array (GM_getValue('af_ct','United States'),"country","location"),
      new Array (GM_getValue('af_zi','45401'),"zip","postal"),
      new Array (GM_getValue('af_co','Feel Good, Inc.'),"company","organization","organisation"),
      new Array (GM_getValue('af_po','CEO'),"position","occup"),
      new Array (GM_getValue('af_in','Webear'),"interest","hobbie"),
      new Array (GM_getValue('af_we','http://el-baul.net'),"web","url"),
      new Array (GM_getValue('af_re','Ninguno'),"referrer"),
      new Array (GM_getValue('af_tz','+3'),"timezoneoffset")
      );
      
      /* Password */
      var inputpasswords = new Array(GM_getValue('af_ps','bugmenot'),"pass","pw","retype","confirm","verify");
      
      /* You can add or remove from these lists to check, uncheck or leave its default */
      var checkboxes = new Array (
      /* Uncheck these */ new Array ("adminemail","showemail","receive","pm","news","mail","update","spam","send","offer","agent"),
      /* Check these   */ new Array ("rules","tos","terms","coppa","agree","accept","save","remember","age","legal","confirm","token")
      );


      // INPUT
       var textElements = document.getElementsByTagName('input');
       for (var i=0;i<textElements.length;i++) {
       // INPUT type TEXT
         if (textElements[i].type == 'text') {
           for (var j=0; j<inputtexts.length; j++){
             for (var k=1; k<inputtexts[j].length; k++){
               var lowerit = textElements[i].name.toLowerCase();
               if (lowerit.search(inputtexts[j][k])>=0) {
                 textElements[i].value = inputtexts[j][0];
               }
             }
           }
         }
       // INPUT type PASSWORD
         if (textElements[i].type == 'password') {
           for (var k=1; k<inputpasswords.length; k++){
             var lowerit = textElements[i].name.toLowerCase();
             if (lowerit.search(inputpasswords[k])>=0) {
               textElements[i].value = inputpasswords[0];
             }
           }
         }
       // INPUT type CHECKBOX
         if (textElements[i].type == 'checkbox') {
           for(var j=1;j<checkboxes[0].length;j++){var lowerit=textElements[i].name.toLowerCase();if(lowerit.search(checkboxes[0][j])>=0){textElements[i].checked=false;}}
           for(var j=1;j<checkboxes[1].length;j++){var lowerit=textElements[i].name.toLowerCase();if(lowerit.search(checkboxes[1][j])>=0){textElements[i].checked=true;}}
         }
       // INPUT type RADIO
       /* Selects the last one */
         if (textElements[i].type == 'radio') {textElements[i].checked=true;}
       }
      
       // SELECT
       /* Selects the middle one */
       var selects = document.getElementsByTagName('select');
       for (var i=0;i<selects.length;i++) {
         var whattoselect = (selects[i].length/2)-((selects[i].length%2)/2);
         selects[i].options[whattoselect].selected=true;
       }
       
       // Is there any Captcha?
       for (var i=0;i<textElements.length;i++) {
       // INPUT type TEXT
         if (textElements[i].type == 'text') {
           for (var k=1; k<inputtexts[1].length; k++){
             var lowerit = textElements[i].name.toLowerCase();
             if (lowerit.search(inputtexts[1][k])>=0) {
               textElements[i].focus();
             }
           }
         }
      }
   }
);
function createMenu(){
	
      // Insert DIV style
      var styleCode = new Array();
      styleCode.push('#autofill  *, #autofill {color:#000;background:#99FFFF;padding:0;margin:0;font-size:11px;text-align:left;font-family:Arial,sans-serif}');
      styleCode.push('#autofill {z-index:999;padding:10px;min-width:300px;border:5px solid #0000CC;position:absolute;top:10px;right:10px}');
      styleCode.push('#autofill label {width: 3em;margin-left:1em}');
      styleCode.push('#autofill p {color:#000;margin:10px}');
      styleCode.push('#autofill p strong {font-size:14px}');
      styleCode.push('#autofill p label small {color:#ccc;font-size:8px;margin-left:10px}');
      styleCode.push('#autofill h2 a {color:#0085d5;margin:20px;font-size:16px}');
      styleCode.push('#autofill .submit input {margin-left: 20px;background:#0000CC;border:none;color:#FFF}');
      styleCode.push('#autofill input {background: #3399FF;border: 1px solid #0000CC;padding:2px;}');

      var style = document.createElement('style');
      style.innerHTML = styleCode.join('\n');
      
      try { document.getElementsByTagName('head')[0].appendChild(style); }
      catch(e) { console.debug(e)}
      
      // Draw DIV 
      var submitbutts = '<p class="submit"><input type="button" value="Guardar Cambios" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" name="savechanges" id="savechanges" /> <input type="button" value="Cancelar" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" /></p>';
      var guiCode = new Array();
      guiCode.push('<div id="autofill">');
      guiCode.push('<h2><a href="http://userscripts.org/scripts/show/39313" target="_blank_" title="Clickee para visitar la pagina del script">Opciones de AutoCompletado</a></h2>');
      guiCode.push('<p><strong>Personal</strong></p>');
      guiCode.push('	<p>Nombre de Usuario: <label><input type="text" value="'+GM_getValue('af_nn','bugmenot')+'" id="af_nn" /></label></p>');
      guiCode.push('	<p>Nombre: <label><input type="text" value="'+GM_getValue('af_fn','Garold')+'" id="af_fn" /></label></p>');
      guiCode.push('	<p>Apellido: <label><input type="text" value="'+GM_getValue('af_ln','Walker')+'" id="af_ln" /></label></p>');
      guiCode.push('	<p>Contraseña: <label><input type="password" value="'+GM_getValue('af_ps','123456')+'" id="af_ps" /> Por Defecto: 123456</label></p>');
      guiCode.push(submitbutts);
      guiCode.push('<p><strong>Profesional</strong></p>');
      guiCode.push('	<p>Titulo: <label><input type="text" value="'+GM_getValue('af_ti','Dr.')+'" id="af_ti" /></label></p>');
      guiCode.push('	<p>Posicion: <label><input type="text" value="'+GM_getValue('af_po','CEO')+'" id="af_po" /></label></p>');
      guiCode.push('	<p>Compania: <label><input type="text" value="'+GM_getValue('af_co','Feel Good, Inc.')+'" id="af_co" /></label></p>');
      guiCode.push(submitbutts);
      guiCode.push('<p><strong>Cumpleaños</strong></p>');
      guiCode.push('	<p>Dia: <label><input type="text" value="'+GM_getValue('af_da','21')+'" id="af_da" /></label></p>');
      guiCode.push('	<p>Mes: <label><input type="text" value="'+GM_getValue('af_mo','7')+'" id="af_mo" /></label></p>');
      guiCode.push('	<p>Año: <label><input type="text" value="'+GM_getValue('af_ye','1976')+'" id="af_ye" /></label></p>');
      guiCode.push('	<p>Pregunta Secreta: <label><input type="text" value="'+GM_getValue('af_qu','Pagina para compartir User y Pass?')+'" id="af_qu" /></label></p>');
      guiCode.push('	<p>Respuesta Secreta: <label><input type="password" value="'+GM_getValue('af_an','bugmenot.com')+'" id="af_an" /> Por Defecto: bugmenot.com</label></p>');
      guiCode.push(submitbutts);
      guiCode.push('<p><strong>Contacto</strong></p>');
      guiCode.push('	<p>E-mail: <label><input type="text" value="'+GM_getValue('af_em','garoldwalker@mailinator.com')+'" id="af_em" /></label></p>');
      guiCode.push('	<p>MSN: <label><input type="text" value="'+GM_getValue('af_ms','garoldwalker@hotmail.com')+'" id="af_ms" /></label></p>');
      guiCode.push('	<p>ICQ: <label><input type="text" value="'+GM_getValue('af_ic','45592738')+'" id="af_ic" /></label></p>');
      guiCode.push('	<p>Telefono: <label><input type="text" value="'+GM_getValue('af_ph','(513) 972-6287')+'" id="af_ph" /></label></p>');
      guiCode.push('	<p>Telefono 1: <label><input type="text" value="'+GM_getValue('af_ph1','513')+'" id="af_ph1" /></label></p>');
      guiCode.push('	<p>Telefono 2: <label><input type="text" value="'+GM_getValue('af_ph2','972')+'" id="af_ph2" /></label></p>');
      guiCode.push('	<p>Telefono 3: <label><input type="text" value="'+GM_getValue('af_ph3','6287')+'" id="af_ph3" /></label></p>');
      guiCode.push('	<p>Fax: <label><input type="text" value="'+GM_getValue('af_fa','(513) 972-6287')+'" id="af_fa" /></label></p>');
      guiCode.push(submitbutts);
      guiCode.push('<p><strong>Ubicacion</strong></p>');
      guiCode.push('	<p>Calle 1: <label><input type="text" value="'+GM_getValue('af_ad','4960 Brandy Run')+'" id="af_ad" /></label></p>');
      guiCode.push('	<p>Calle 2: <label><input type="text" value="'+GM_getValue('af_ad2','Dayton, OH 45401')+'" id="af_ad2" /></label></p>');
      guiCode.push('	<p>Ciudad: <label><input type="text" value="'+GM_getValue('af_ci','Dayton')+'" id="af_ci" /></label></p>');
      guiCode.push('	<p>Localidad: <label><input type="text" value="'+GM_getValue('af_ar','51')+'" id="af_ar" /></label></p>');
      guiCode.push('	<p>Estado: <label><input type="text" value="'+GM_getValue('af_st','OH')+'" id="af_st" /></label></p>');
      guiCode.push('	<p>Pais: <label><input type="text" value="'+GM_getValue('af_ct','United States')+'" id="af_ct" /></label></p>');
      guiCode.push('	<p>Codigo postal: <label><input type="text" value="'+GM_getValue('af_zi','45401')+'" id="af_zi" /></label></p>');
      guiCode.push(submitbutts);
      guiCode.push('<p><strong>Otros</strong></p>');
      guiCode.push('	<p>Intereses: <label><input type="text" value="'+GM_getValue('af_in','I love to dance!')+'" id="af_in" /></label></p>');
      guiCode.push('	<p>Pagina Web: <label><input type="text" value="'+GM_getValue('af_we','http://el-baul.net')+'" id="af_we" /></label></p>');
      guiCode.push('	<p>Referidor: <label><input type="text" value="'+GM_getValue('af_re','LuckyShot')+'" id="af_re" /></label></p>');
      guiCode.push('	<p>Zona Horaria: <label><input type="text" value="'+GM_getValue('af_tz','0')+'" id="af_tz" /></label></p>');
      guiCode.push('	<p>Captcha: <label><input type="text" value="'+GM_getValue('af_ca','')+'" id="af_ca" /></label></p>');    
      guiCode.push('	<p>Alguna otra etiqueta: <label><input type="text" value="'+GM_getValue('af_ot','')+'" id="af_ot" /></label></p>');
      guiCode.push(submitbutts);
      guiCode.push('</div>');

      
      // Insert DIV
      var gui = document.createElement('div');
      gui.id = 'autofilloptions';
      gui.innerHTML = guiCode.join('\n');
      guiCode.length = 0;
      document.body.insertBefore(gui, document.body.lastChild);
      
      // Add event SAVE
      var sChanges=document.getElementsByName('savechanges');
      console.debug(sChanges);
      for (var z=0;z<sChanges.length;z++){
    	  sChanges[z].addEventListener('click', saveChanges , false);
      }
}
$nd = function (xpath, context, from)
{
	var nd = (from||document).evaluate(xpath, (context||document), null, 9, null).singleNodeValue;
	//if($type($el) == 'function'){ return $el(nd); }
	return nd;
};
function saveChanges(){
    GM_setValue('af_nn',document.getElementById('af_nn').value);
    GM_setValue('af_fn',document.getElementById('af_fn').value);
    GM_setValue('af_ln',document.getElementById('af_ln').value);
    GM_setValue('af_ps',document.getElementById('af_ps').value);
    GM_setValue('af_po',document.getElementById('af_po').value);
    GM_setValue('af_co',document.getElementById('af_co').value);
    GM_setValue('af_da',document.getElementById('af_da').value);
    GM_setValue('af_mo',document.getElementById('af_mo').value);
    GM_setValue('af_ye',document.getElementById('af_ye').value);
    GM_setValue('af_qu',document.getElementById('af_qu').value);
    GM_setValue('af_an',document.getElementById('af_an').value);
    GM_setValue('af_em',document.getElementById('af_em').value);
    GM_setValue('af_ms',document.getElementById('af_ms').value);
    GM_setValue('af_ic',document.getElementById('af_ic').value);
    GM_setValue('af_ph',document.getElementById('af_ph').value);
    GM_setValue('af_ph2',document.getElementById('af_ph2').value);
    GM_setValue('af_ph3',document.getElementById('af_ph3').value);
    GM_setValue('af_fa',document.getElementById('af_fa').value);
    GM_setValue('af_ad',document.getElementById('af_ad').value);
    GM_setValue('af_ad2',document.getElementById('af_ad2').value);
    GM_setValue('af_ci',document.getElementById('af_ci').value);
    GM_setValue('af_ar',document.getElementById('af_ar').value);
    GM_setValue('af_st',document.getElementById('af_st').value);
    GM_setValue('af_ct',document.getElementById('af_ct').value);
    GM_setValue('af_zi',document.getElementById('af_zi').value);
    GM_setValue('af_in',document.getElementById('af_in').value);
    GM_setValue('af_we',document.getElementById('af_we').value);
    GM_setValue('af_re',document.getElementById('af_re').value);
    GM_setValue('af_tz',document.getElementById('af_tz').value);
    GM_setValue('af_ca',document.getElementById('af_ca').value);
    GM_setValue('af_ot',document.getElementById('af_ot').value);
    }

function showMenu(){
 try{
	 document.getElementById('autofill').style.display='block';
 }catch(e){
	createMenu(); 
	console.debug(e);
  }
}
GM_registerMenuCommand("Opciones de AutoCompletado", showMenu );