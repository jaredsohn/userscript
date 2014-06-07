// ==UserScript==
// @name        QuizMaze Save&Load
// @namespace   http://userscripts.org/users/mix5003
// @include     http://my.dek-d.com/*/quizmaze/?id=*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

(function($){
    
    var prefix = 'saveSlot_'+quiz_id+'_';
    
    function genLiHTML(){
        var liHTML = '';
        for(i = 1;i<=10;i++){
            var tmp = GM_getValue(prefix+i,"");
            if(tmp === ""){
                liHTML += '<li><a href="#">'+i+'</a></li>';
            }else{
                liHTML += '<li><a href="#"><i class="icon-ok"></i> '+i+' (id: '+tmp+')</a></li>';
            }
        }
        return liHTML;
    }
    
    var $choice = $('#choice');
    
    var $saveMenu = $('\
<div class="dropdown pull-left">\
	<a data-toggle="dropdown" class="dropdown-toggle btn  btn-primary btn-mini" href="#">Save <b class="caret"></b></a> \
	<ul class="dropdown-menu" id="dekd-save">\
	</ul>\
</div>');
    
    var $loadMenu = $('\
<div class="dropdown pull-left">\
	<a data-toggle="dropdown" class="dropdown-toggle btn  btn-primary btn-mini" href="#">Load <b class="caret"></b></a> \
	<ul class="dropdown-menu" id="dekd-load">\
	</ul>\
</div>');

    
    var i;
    
    var liHTML = genLiHTML();
    $saveMenu.find('#dekd-save').html(liHTML);
    $loadMenu.find('#dekd-load').html(liHTML);
    
    $choice.prepend('<div class="clearfix"></div><br>').prepend($loadMenu).prepend($saveMenu);
    
    $saveMenu.on('click','li',function(){
        $('.dropdown.open').removeClass('open');
        
        var question = $('#qa').find('.head_result').text();
        var txt = $saveMenu.find('li').index(this)+1;
        var load_id = GM_getValue(prefix+txt,"");
        if(load_id !== ""){
            if(!confirm("ต้องการบันทึกทับใช่หรือไม่?")){
                return false;
            }
        }
        $.each(jsqa,function(index,value){
            var title = value['t'];
            if(value['img'] != ''){
                title +='ขยายภาพ';
            }
            if(question == title){
                GM_setValue(prefix+txt,index);
                liHTML = genLiHTML();
    			$saveMenu.find('#dekd-save').html(liHTML);
    			$loadMenu.find('#dekd-load').html(liHTML);
                return false;
            }
        });
        return false;
    });
    
    $loadMenu.on('click','li',function(){
        $('.dropdown.open').removeClass('open');
        
        var txt = $loadMenu.find('li').index(this)+1;
        var load_id = GM_getValue(prefix+txt,"");
        if(load_id === ""){
        	alert("ไม่สามารถโหลดได้ เนื่องจากช่องนี้ไม่เคยโดนบันทึกมาก่อน");  
        }else{
            ajaxload=false;
            $("#result").slideUp(200);
            $('#result').find('>.you_result,>.clear').remove();
            loaddata("q_"+load_id);
        }
        return false;
    });
})(jQuery);