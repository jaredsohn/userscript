// ==UserScript== 
// @name Html Table Filter
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace 
// @description This will add filter column above the table. You can also select the dropdown filter(default is a searchbox) for the specified rows. It also shows the number of rows present after filtering the data.
// @include http://localhost/*
// @exclude 
// ==/UserScript==

// Include the urls where you want to run this script.

(function($){

$.fn.extend({
	"tableFilter": function(options){
		
		var default_options = {
			"select":[]
		}
		
		if(options == undefined)
			options = {};
		
		jQuery.extend(default_options, options);

		var self=$(this[0]);	
		
		var hcols=$('#table1 thead tr th').size();
		var dcols=$('#table1 tbody tr:nth-child(2) td').size();		
		var tcols = dcols > hcols ? dcols : hcols;
		
		var rWidths=[];
		
		$('#table1 tbody tr:nth-child(3) td').each(function(){
		   rWidths.push($(this).width());
		});
		
		var all_rows =  $('#table1 tbody tr');
	
		function getColumnValues(index){
			return $('#table1 tbody td:nth-child('+index+')');
		}
	
		function getUniqueValues(index){
			var all_cols=getColumnValues(index);
			var text_array=[];
			all_cols.each(function(index, data){
				text_array.push(data.textContent);
			});
			text_array = text_array.sort();
			uniq_array = [];
			for(var i=0;i<text_array.length;i++)
			{
				if (i == 0 || text_array[i] !== text_array[i - 1]) {
		         	uniq_array.push(text_array[i]);
		        }
			}
			return uniq_array;			
		}
		
		function getOptionValues(index){			
			var optionvals='<option></option>';
			$(getUniqueValues(index)).each(function(){
				optionvals=optionvals+"<option>"+this+"</option>";
			});
			return optionvals;
		}
		
		function getFilterType(index){
			var checkbox="<input id='cb_"+index+"' type='checkbox' class='cbfilter'></input>";

				return  '<input id="inp_'+index+'" style="width:'+(rWidths[index])+'px; border-color:grey;" class="tfilter"></input>'+'<select id="sel_'+index+'" class="tfilter" style="width:'+(rWidths[index])+'px; border-color:grey;display:none;">'+getOptionValues(index+1)+'</select>'+checkbox;

		}
		
		var filterrow='<br style="clear:both;"/><div id="filtertable-buttons"><button>clear filters</button><label style="padding-left: 25px;"><strong>Row Count:</strong><span id="ftcount"></span></label></div><table id="filtertable"><tr>';
		for(var i=0;i<dcols;i++){
			var filter_data = getUniqueValues(i+1);
			filterrow = filterrow + '<td height="25px">'+getFilterType(i)+'</td>';			
		}

		filterrow = filterrow + "</tr></table>";
		
		$(filterrow).insertBefore(self);
		
		$('.cbfilter').bind('click',function(){
			var inputId="#inp_"+this.id.split("_")[1];
			var selectId="#sel_"+this.id.split("_")[1];
			if($(this).is(':checked')){
				$(selectId).show();
				$(inputId).hide();
			}else{
				$(inputId).val($(selectId).val());
				$(selectId).hide();
				$(inputId).show();
			}

		});
		
		function updateCount(){
			$('#ftcount').html($('#table1 tbody tr:visible').size());
		}
		
		var filters=$(['select.tfilter', 'input.tfilter']);
		filters.each(function(index, data){
		    $(data).bind("blur", function(){
				var self=this;
				var column=parseInt(this.id.split("_")[1]);
				var text='';
		        if(this.type != 'text'){
					text=this.value;
				}				
				else{
					text=$(this).val();
				}
				$('#table1 tbody tr:visible').each(function(){
					if(!(($(this).find("'td:nth-child('+column+')'").text().toLowerCase()).indexOf(text.toLowerCase()) != -1))
						$(this).hide();
				});
				updateCount();					
		    });
		});
		
		$('#filtertable-buttons button').click(function(){
			$('#table1 tbody tr').each(function(){
				$(this).show();
			});
			filters.each(function(index, data){
				 $(data).each(function(){
					if(this.tagName == 'INPUT'){
						$(this).val("");
					}else{
						$(this).val("");
					}	
				});
			});
			updateCount();
		});
		
		updateCount();		
	}
});

})(jQuery);



jQuery(document).ready(function(){
		jQuery('table').attr("id","table1")
	
		$('#table1').tableFilter();
});