 // ==UserScript==
// @name           grepoConnect
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.com
// @version        1.2.1
// @description    Auto connect to your world
// @source         http://userscripts.org/scripts/show/86270
// ==/UserScript==

//@--require greasekit
(function(){
var url = window.location.href, world = GM_getValue('grepo_myworld');
if (/grepolis\.com\/start/.test(url) || /grepolis\.com\/.*nosession/.test(url)){
  if ($('#login_form_inner:visible').length>0 && $('#name').val()=='' && $('#password').val()==''){
     return;
  } 
  if (world){
    $('#world').val(world );
    $('#loginform').unbind().submit();
  }else{
      //try to open first world
      Login.showWorlds=createSequence(Login.showWorlds, function(){
         $('#worlds li a').first().trigger('click');
      });
      $('#loginform').submit();
      //Login.fetchWorlds(true);
   }
}else if (!world){
   var m = /(\w+\d)\.grepolis\.com/.exec(url)[1];
   if (m && m[1]){
      GM_setValue('grepo_myworld', m[1]);
   }
}

function createSequence(method, fcn, scope){
        return (typeof fcn != 'function') ?
                this :
                function(){
                    var retval = method.apply(this || window, arguments);
                    fcn.apply(scope || this || window, arguments);
                    return retval;
         };
}

})();