// ==UserScript==
// @name           Rade
// @namespace      eaw
// @description    Rade
// @include        http://economy.erepublik.com/en/land/overview/*
// ==/UserScript==

(function(){

  var p = unsafeWindow;
  
  // chrome 
  if(window.navigator.vendor.match(/Google/)) {
      var div = document.createElement("div");
      div.setAttribute("onclick", "return window;");
      p = div.onclick();
  };
  var jQuery = p.jQuery;
  
  createUI();
  
  function createUI(){
    jQuery("#content h1").append("<a href='javascript:;' id='workIt'>Work</a>");
    jQuery("#workIt").click(function(i,e){
      var derp = new eaw();
    });
  }
  
  function eaw(){
    var base = this;
    var company_list = base.get_company_list();
    var rms = [];
    var manu = [];
    
    // rms should 'cum' before manus
    // 
    // :3
    
    jQuery(company_list).each(function(index,element){
      if (element.worked === false){
        var companyid = element.companyid;
        if (element.type == 'rm') rms.push(companyid);
        else if (element.type == 'manu') manu.push(companyid);
      }
    });
    
    // and they shall forever be concatenated together
    var to_work_list = rms.concat(manu);
    
    // setTimeouts fucking suck. If there is a way to have a callback, I'll have a javascriorgasm.
    // todo maybe?
    var counter = 0;
    jQuery(to_work_list).each(function(index,element){
      
      if (index % 5 == 1){
        window.setTimeout(base.eat,  Math.ceil((counter * 3000) + Math.random() * 1000));
        counter++;
      }
      window.setTimeout(base.werk,  Math.ceil((counter * 4000) + Math.random() * 1000),element);
      counter++;
      
    });
    
    
  };
  
  eaw.prototype.failed = []; // todo list for failed companies
  eaw.prototype.eat = function(){
    return p.eatFood();
  }
  eaw.prototype.werk = function(company){
    // bitch, give me mah stuff
    jQuery("#collect").trigger('click');
    
    // maybe this is the right place to check for captcha?
    
    // idk what the 0 is, and am not going to bother finding it
    return p.work(company,0,jQuery("[companyid="+company+"]").parents('li'));
  }
  
  eaw.prototype.get_company_list = function(){
  
    // not sure if this needs to be changed per language. if it does, then need to find a better solution
    var weapon_rms = ['Iron Mine', 'Oil Rig', 'Aluminium Mine','Saltpeter Mine', 'Rubber Plantation'];
    var food_rms = ['Grain Farm', 'Fruit Orchard', 'Fishery', 'Cattle Farm', 'Hunting Lodge'];
    var factories = ['Food Factory', 'Weapons Factory'];
    
    // Let's create an array with the necessary company information
    var list = [];
    
    
    jQuery("ul.land_holder li").each(function(index,element){
      // Make sure we do not include the training and whatever else bullshit
      var workable = false;
      if (jQuery(element).children('a').attr('companyid') > 0)
        workable = true;
      
      if (workable){
        var toappend = {};
        toappend['companyid'] = jQuery(element).children('a').attr('companyid');
        var title = jQuery(element).attr('title');
        // classify the companies, we could even go further and say if it's weapon or food (todo?)
        if (jQuery.inArray(title, weapon_rms) >= 0 || jQuery.inArray(title, food_rms) >= 0){
          toappend['type'] = 'rm';
        }
        else {
          toappend['type'] = 'manu';
        }
        
        toappend['worked'] = true;
        if (jQuery(element).children('.tip:visible').length > 0){
          toappend['worked'] = false;
        }
        
        // stick it
        list.push(toappend);
      }
      
    });
      
    return list;
    
  }
  
})();