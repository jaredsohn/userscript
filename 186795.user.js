// ==UserScript==
// @name           猫超detail自动显示大图地址
// @description    猫超detail自动显示大图地址
// @author         lyzzju@gmail.com
// @include        http://chaoshi.detail.tmall.com/item.htm
// @version        1.1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==


$('#content').append('<div style="position:absolute;top:250px;left:150px;width:250px;z-index:9999;"><textarea id="img-url-360" class="img-url" style="width:250px;height:60px;margin-bottom:10px;"></textarea><textarea id="img-url-250" class="img-url" style="width:250px;height:60px;margin-bottom:10px;"></textarea><textarea id="img-url-180" class="img-url" style="width:250px;height:60px;"></textarea></div>');

$('#img-url-360').html($('#J_ImgBooth').attr('src'));

$('#img-url-250').html($('#J_ImgBooth').attr('src').replace('360x360', '250x250'));

$('#img-url-180').html($('#J_ImgBooth').attr('src').replace('360x360', '180x180'));

$('.img-url').hover(function(){
  $(this).select();
},function(){
  $(this).unselect();
})