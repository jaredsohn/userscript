// ==UserScript==
// @name       eSim-calc_tool
// @namespace  UI
// @version    0.04
// @description  none
// @include       http://*.e-sim.org/*
// @author     xNDx
// @downloadURL 
// ==/UserScript==

var main = function () {
    
    
    var Version = "Beta 0.0.2" ;
    function plus(a,b){
    
                                          return ((parseFloat(a)+parseFloat(b))*1000)/1000 ;
    
    
    
    }
                                     
                                     function minus(a,b){
    
                                          return ((parseFloat(a)-parseFloat(b))*1000)/1000 ;
    
    
    
    }
                                     function multi(a,b){
    
                                          return (parseFloat(a)*parseFloat(b)*1000)/1000 ;
    
    
    
    }
                                     function divide(a,b){
    
                                          return (parseFloat(a)/parseFloat(b)*1000)/1000 ;
    
    
    
    }
                                     
                                     
                                    
                                                      function calc_con (){
        
                                            var  a = parseFloat(document.getElementById("value1").value,10),
                                              b = parseFloat(document.getElementById("value2").value,10);
                                              $("div#form_Ver-1").append(
                                               " <P class='p_add'>"+plus(a,b)+"</P>" 
        ) ;
}
                                     
                                                                                   function calc_minus (){
        
                                            var  a = parseFloat(document.getElementById("value1").value,10),
                                              b = parseFloat(document.getElementById("value2").value,10);
                                              $("div#form_Ver-1").append(
                                               " <P class='p_add'>"+minus(a,b)+"</P>" 
        ) ;
}
                                     
                                     function calc_multi (){
        
                                            var  a = parseFloat(document.getElementById("value1").value,10),
                                              b = parseFloat(document.getElementById("value2").value,10);
                                              $("div#form_Ver-1").append(
                                               " <P class='p_add'>"+multi(a,b)+"</P>" 
        ) ;
}
                                     function calc_divide (){
        
                                            var  a = parseFloat(document.getElementById("value1").value,10),
                                              b = parseFloat(document.getElementById("value2").value,10);
                                              $("div#form_Ver-1").append(
                                               " <P class='p_add'>"+divide(a,b)+"</P>" 
        ) ;
}
                                     
                                     
                                     
                                      function calc_clear (){
                                               $("div#form_Ver-1 .p_add").remove();
                                            
                                          
                                      }
                                          
                                          
                                     
                                      
                                              
                                    
    
    
                                     function click_calc(){
                                        $("#value4").click(function(){
                                            calc_con ();});
                                            $("#value5").click(function(){                                                
                                    calc_clear ();                                          
    })  ;                    
                                         $("#value6").click(function(){                                                
                                             calc_minus();   })  ;                                     
    $("#value7").click(function(){                                                
        calc_multi();     })  ;                                   
    $("#value8").click(function(){                                                
                                     calc_divide();                                          
    }       );               
                                                               
                                                               
                                                               
                                    }            
    
    
    function addButton_Ver (){
                    $("form[action ='editCitizen.html#changeLanguage']  ").hide();                 
                   $("form[action ='editCitizen.html#changeLanguage']    ") .before(
                       
                       
                       
                      
                       
                       
                       "<button id='button_Ver' class ='Button_Ver'> " +
                        
                       "  <img src=' http://e-sim.home.pl/eworld/img/favicon.png '  width= 20% height=20%    > " +
                      Version +
                  "  </button> " 
                       
                   
                      
                       
                        );
                                     }
    // 新增 視窗
                                             
                   $("body").append(
                      /*新增#form_Ver視窗*/   " <div id='form_Ver' class='form_ver' div>"+  
                      /*橫向標籤 上方 的文字 */ "<p>e-Sim Custom Helper I</p>"+
                       
                       
                      /*增加 橫向標籤 */     " <ul> "+
                      /*增加橫向標籤 1*/     " <li><a href='#form_Ver-1'>Calculation</a></li> " +
                    /* 橫向標籤 1 內容   */
                       /*增加橫向標籤 2*/    " <li><a href='#form_Ver-2'>Tab-1</a></li> " +
                                           
                       /*增加橫向標籤 3*/    " <li><a href='#form_Ver-3'>Tab-1</a></li></ul> " +
                       /* 橫向標籤 1 內容*/  
                                           "<div id='form_Ver-1'> "+
                                           "<input id='value1' type='text' size='6' value=''  >"+
                                           "<input id='value2' type='text' size='6' value='' >"+
                                           "<button id='value4'>加</button>"+
                                           "<button id='value6'>減</button>"+
                                           "<button id='value7'>乘</button>"+
                                           "<button id='value8'>除</button>"+
                       
                                           "<button id='value5'>清除</button>"+
                                           
                                           

                       
                                           
                                          
                   
                                           " </div>"+
                       "<div id='form_Ver-2'> "+
                                           
                                           " </div>"+
                       "<div id='form_Ver-3'> "+
                                           
                                           " </div>"+
                       /*橫向標籤 右邊 的文字 */ "<p>by xChenGx</p>"+
                       
                      "  </div>"
                       
                       );
    
    
    
    // 創建&打開UI                   
                                function UIopen () {
    $( "#form_Ver" ).dialog({
      autoOpen: false,
        height: 'auto',
			width: 730,
			maxWidth: 730,
			modal: true,
        
      show: {
        effect: "clip",
        duration: 500
      },
      hide: {
        effect: "fold",
        duration: 500
          
      }
    });
 
    $( "#button_Ver" ).click(function() {
      $( "#form_Ver" ).tabs().dialog( "open" );
    });
  }          
    
    
    
    
     //  Use function           
    
                    addButton_Ver ();   
                        
                    
                                     
                                     UIopen () ; 
                                     click_calc();
    
    
    
    
    
    
    
    
    
    
    
    
    
    };
     if (window.top === window.self) {
	                      var css = document.createElement("style");
		                  css.type = "text/css";
		                  css.innerHTML =
			
			".top-bar-section .dropdown li:hover .dropdown li a{background: url(../img/bg.png) repeat scroll 0 0 #222222 !important;}"+
			".top-bar-section .dropdown li  .dropdown li:hover a{background: url(../img/bg3.png) repeat scroll 0 0 #444444 !important;}";
	var script = document.createElement('script');
		script.type = "text/javascript";
		script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild(script);
	document.body.appendChild(css);
}