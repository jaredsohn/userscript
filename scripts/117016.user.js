/*
	Программный продукт предоставляется по принипу "как есть", 
	автор не несёт никакой ответственности за последствия 
	использования данного программного продукта, в том числе 
	неполучение прибыли или иных доходов от его использования, 
	или использование его в противозаконных целях.
	Программный продукт полностью бесплатен, поддержки не предлагается.
*/
//
// ==UserScript==
// @author				alexg ("S_button" by CTRL_Z)
// @name 				BBCode buttons for NNTT.ORG 
// @version				5.0 
// @include 			http://nntt.org/*
// @include 			http://www.nntt.org/*
// ==/UserScript==
//
(function(){  
   if (document.addEventListener) 
      document.addEventListener("DOMContentLoaded", function(){
      	if(document.body){		
					var script = document.createElement('script');
      			script.type = 'text/javascript';
      			script.charset = 'utf-8';
      			var text = new String(function(){
						$(document).ready(function() {
							// buttons
							addButton ($("form[name='postform']:first input.btnbbcode[type='button'][name='addbbcode0']:first"), 
										  "offtop_button", 
										  " Off ", 
										  function(){ bbfontstyle('[size=50][color=gray]','[/color][/size]'); }, 
										  function(){ document.forms[form_name].helpbox.value =  "Оформить блок текста как \'оффтоп\' " });				  
							addButton ($("form[name='postform']:first input.btnbbcode[type='button'][name='addbbcode8']:first"), 
										  "quote_selected_button", 
										  " Quote selected ", 
										  function(){ bbcode.onclickQuoteSel(); }, 
										  function(){ bbcode.refreshSelection(true); document.forms[form_name].helpbox.value = "Цитирование выделенного текста: [quote]text[/quote]"; }, 
										  function(){ bbcode.refreshSelection(false); helpline('tip'); });
							addButton ($("form[name='postform']:first input.btnbbcode[type='button'][name='addbbcode0']:first"), 
										  "tab_button", 
										  " Tab ", 
										  function(){ bbfontstyle('[tab=]',''); }, 
										  function(){ document.forms[form_name].helpbox.value = "Вставка табуляции: [tab=]"; });
							addButton ($("form[name='postform']:first input.btnbbcode[type='button'][name='addbbcode0']:first"), 
										  "s_button", 
										  " Зачерк. ", 
										  function(){ bbfontstyle('[s]','[/s]'); }, 
										  function(){ document.forms[form_name].helpbox.value = "Зачёркнутый текст [s]text[/s]"; });	
							// fonts
							var fnt_sel = document.createElement("select");
							$(fnt_sel)
								 .attr({ 'name':'font_selector', 'font-family':'Arial' })
								 .css({ 'margin-right':'4px' })
								 .mouseover (function(){ 
										document.forms[form_name].helpbox.value = "Семейство шрифта: [font=]text[/font]";
								 })
								 .mouseout (function(){ 
										helpline('tip') 
								 })	
								 .change(function(){ 
										bbfontstyle('[font=' + this.form.font_selector.options[this.form.font_selector.selectedIndex].value + ']', '[/font]'); 
										this.form.font_selector.selectedIndex = 0;			
								 })
							 	.html("<option style='font-family:Verdana' value='-1' selected='selected'>Шрифт:</option>"+
										 "<option style='font-family:Courier' value='Courier'>&nbsp;Courier</option>"+
										 "<option style='font-family:Courier New' value='Courier New'>&nbsp;Courier New</option>"+
										 "<option style='font-family:monospace' value='monospace'>&nbsp;monospace</option>"+
										 "<option style='font-family:Fixedsys' value='Fixedsys'>&nbsp;Fixedsys</option>"+
										 "<option style='font-family:Arial' value='Arial'>&nbsp;Arial</option>"+
										 "<option style='font-family:Comic Sans MS' value='Comic Sans MS'>&nbsp;Comic Sans</option>"+
										 "<option style='font-family:Georgia' value='Georgia'>&nbsp;Georgia</option>"+
										 "<option style='font-family:Tahoma' value='Tahoma'>&nbsp;Tahoma</option>"+
										 "<option style='font-family:Times New Roman' value='Times New Roman'>&nbsp;Times</option>"+
										 "<option style='font-family:serif' value='serif'>&nbsp;serif</option>"+
										 "<option style='font-family:sans-serif' value='sans-serif'>&nbsp;sans-serif</option>"+
										 "<option style='font-family:cursive' value='cursive'>&nbsp;cursive</option>"+
										 "<option style='font-family:fantasy' value='fantasy'>&nbsp;fantasy</option>")
					
								 .insertBefore($("form[name='postform']:first select[name='addbbcode20']:first"));	
		
							function addButton (ref, id, text, code, tip, tip_default){
								var btn = document.createElement("input");
								$(btn).attr({ "id":id,
							 				  	"type":"button",
											  	"class":"btnbbcode" })
										.val(text)
										.css("margin-right", "4px")
										.click (code)
										.mouseover (tip)
										.mouseout (tip_default || function(){ helpline('tip') })
										.insertBefore(ref);
							}	
						});								
					});
			
      			var term_in  = text.indexOf("{");
      			var term_out = text.lastIndexOf('}');
      			
      			script.appendChild (document.createTextNode("/* <![CDATA[ */" + text.substring(term_in + 1, term_out) + "/* ]]> */"));
      			document.getElementsByTagName('head')[0].appendChild(script); 
   		}  
 		}, false);
})();