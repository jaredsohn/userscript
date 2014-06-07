// ==UserScript==
// @name           Show Countries
// @namespace      com.erepublik.us
// @include        http://www.erepublik.com/*/citizen/profile/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
function Country(){
  this.Name   = '';
  this.Image  = '';
  this.Count  = 0;
  this.Done   = false;
  this.Render = function(){
    return '<div wusa_switch="'+(this.Done?'done':'left')+'" class="citizen_military" style="width:164px;margin-bottom:2px;"><div class="stat" style="width:160px"><small style=""><img src="'+this.Image+'" style="float: left; margin-top: -2px; margin-left: -2px; margin-right: 2px;"/> <span style="max-width:100px;max-height:10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block;">'+this.Name+'</span> <strong>'+this.Count+' / 25</strong></small><table width="100%" border="0" class="barholder" style="margin:0px auto;"><tbody><tr><td><div class="bar skill"><div class="border"><span class="lefts"></span><span class="mids" style="width: 96%;"></span><span class="rights"></span></div><div class="fill"><span class="lefts" style="background-position:right -98px"></span><span class="mids" style="background-position:right -98px;background-repeat:repeat;width:'+(this.Count*96/25)+'%;"></span><span class="rights" style="background-position:right -98px;"></span></div></div></td></tr></tbody></table></div></div><div wusa_switch="'+(this.Done?'done':'left')+'" class="citizen_military" style="background-position:top right;width:4px;margin-right:2px;margin-bottom:2px;"></div>';
  };
}

jQuery(document).ready(function(){

  // Int
  jQuery('#career_tab_content').after('<h3>Mercenary Medal Progress</h3><div class="citizen_military" wusa_frame="resume"></div><div class="clear"></div><div wusa_frame="details"></div>');
  jQuery('[wusa_frame="resume"]').append('<strong>Mercenary Medal Progress</strong>');
  jQuery('[wusa_frame="resume"]').append('<div class="stat"><small>Countries : <strong><span wusa_object="countries">0</span> / 50</strong></small></div>');
  jQuery('[wusa_frame="resume"] div.stat').append('<table width="100%" border="0" class="barholder"><tbody><tr><td><div class="bar skill"><div class="border"><span class="lefts"></span><span class="mids" style="width: 96%;"></span><span class="rights"></span></div><div class="fill"><span class="lefts" style="background-position:right -84px;"></span><span class="mids" wusa_object="progress" style="background-position:right -84px;background-repeat:repeat;"></span><span class="rights" style="background-position:right -84px;"></span></div></div></td></tr></tbody></table>');
  jQuery('[wusa_frame="details"]').append('<div class="holder"><a title="Switch" class="grey_arrow_down_medium" wusa_button="switch" wusa_state="show"><span>Hide Countries Finished</span></a></div>');
  jQuery('[wusa_frame="details"]').append('<div class="holder"></div>');

  var countries = new Array();
  jQuery('ul.country_list li em').each(function(){
    jQuery(this).css('opacity','1');
    jQuery(this).css('left','18px');
    jQuery(this).parent().css('margin-left','-10px');
    jQuery(this).parent().css('width','70px');
    jQuery(this).parent().find('img').css('position','absolute');
    jQuery(this).parent().find('img').css('left','0px');
    jQuery(this).parent().find('small').css('opacity','0');
    jQuery(this).parent().parent().css('width','480px');

    country       = new Country();
    country.Name  = jQuery(this).parent().attr('title');
    country.Image = jQuery(this).parent().find('img').attr('src');
    country.Count = parseInt(jQuery(this).html());
    country.Done  = country.Count==25?true:false;
    countries[countries.length] = country;
    
    if(country.Done)
      jQuery('[wusa_object="countries"]').html(parseInt(jQuery('[wusa_object="countries"]').html())+1);
    
    jQuery('[wusa_frame="details"] div.holder:last-child').append(country.Render());
  });
  
  jQuery('[wusa_frame="details"] div.holder:last-child').append('<div class="clear"></div>');
  jQuery('[wusa_object="progress"]').css('width',(parseInt(jQuery('[wusa_object="countries"]').html())*96/50)+'%');
  
  jQuery('[wusa_button="switch"]').click(function(){
    if(jQuery(this).attr('wusa_state')=='show'){
      jQuery('[wusa_switch="done"]').fadeOut();
      jQuery(this).attr('wusa_state','hide');
      jQuery(this).find('span').html('Show Countries Finished');
    }else{
      jQuery('[wusa_switch="done"]').fadeIn();
      jQuery(this).attr('wusa_state','show');
      jQuery(this).find('span').html('Hide Countries Finished');
    }
  });
});