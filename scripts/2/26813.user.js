// ==UserScript==
// @name	phpMyAdmin Toolkit
// @namespace	http://www.zbychu.org/
// @description	makes query input fields in phpMyAdmin bigger
// @author  Zbigniew Bogacz
// @include	http://*/pma-2.11.3/*
// @include	http://*/pma-2.9.1.1/*
// ==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if (document.body)
{
  /*
  if (document.getElementById('sqlquery'))
    document.getElementById('sqlquery').rows=20;
  */
  
  // set select with table fields list size
  if (document.getElementById('tablefields'))
    document.getElementById('tablefields').size=15;
  
  // query window resize on older phpMyAdmin versions (2.9.1.1)
  addGlobalStyle('textarea#sqlquery { height: 35em; }');
  // font resize
  //addGlobalStyle('body { font-family: sans-serif; font-size: 0.9em ! important; }');
  
  
  // Additional functionality
  if (document.getElementById('tablefieldscontainer'))
  {
    var fieldset_s = document.createElement('fieldset');
    var legend_s = document.createElement('legend');
    legend_s.innerHTML = 'Select';
    
    var fieldset_a = document.createElement('fieldset');
    var legend_a = document.createElement('legend');
    legend_a.innerHTML = 'Alter';
    
    //--------------------------------------------------------------------------
    
    var button_s_e = document.createElement('input');
    button_s_e.type = 'button';
    button_s_e.value = 'EXPLAIN';
    var button_s_nc = document.createElement('input');
    button_s_nc.type = 'button';
    button_s_nc.value = 'SQL_NO_CACHE';
    
    var button_a_ob = document.createElement('input');
    button_a_ob.type = 'button';
    button_a_ob.value = 'ORDER BY';
    
    //--------------------------------------------------------------------------
    
    fieldset_s.appendChild(legend_s);
    fieldset_s.appendChild(button_s_e);
    fieldset_s.appendChild(button_s_nc);
    fieldset_s.style.margin='0';
    fieldset_s.style.paddingTop='0';
    document.getElementById('tablefieldscontainer').appendChild(fieldset_s);
    
    fieldset_a.appendChild(legend_a);
    fieldset_a.appendChild(button_a_ob);
    fieldset_a.style.margin='0';
    fieldset_a.style.paddingTop='0';
    document.getElementById('tablefieldscontainer').appendChild(fieldset_a);
    
    //--------------------------------------------------------------------------
    
    button_s_e.addEventListener('click', 
      function (event){
        document.getElementById('sqlquery').value='EXPLAIN '+document.getElementById('sqlquery').value; event.preventDefault();
      }, true );
    button_s_nc.addEventListener('click', 
      function (event){
        document.getElementById('sqlquery').value=document.getElementById('sqlquery').value.replace(/SELECT/i,'SELECT SQL_NO_CACHE'); event.preventDefault();
      }, true );
    
    button_a_ob.addEventListener('click', 
      function (event){
        if (document.getElementById('sqlqueryform'))
        {
          var fval = document.getElementById('sqlqueryform').elements.namedItem("table").value;
          
          var myListBox = document.getElementById('sqlqueryform').elements.namedItem("dummy");
          if(myListBox.options.length > 0)
          {
            //var sql_box_locked = true;
            var chaineAj = "";
            var NbSelect = 0;
            for(var i=0; i<myListBox.options.length; i++)
            {
              if (myListBox.options[i].selected)
              {
                NbSelect++;
                if (NbSelect > 1)
                  chaineAj += ", ";
                chaineAj += myListBox.options[i].value;
              }
            }
          }
        }
        else
          var fval = 'FAIL';
        
        document.getElementById('sqlquery').value='ALTER TABLE `'+fval+'` ORDER BY '+chaineAj; event.preventDefault();
      }, true );
    
  }
}
