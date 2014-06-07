// ==UserScript==
// @name        平倉計算
// @namespace   http://115.29.225.251/main.jhtml
// @include     http://115.29.225.251/blackmarket.jhtml*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @version     1
// @grant       0
// ==/UserScript==
var j = jQuery.noConflict(true);



var select_a = j('<select />').attr('id','my_type')
select_a.append(j('<option />').text('自選').attr({'a':'0','b':'0','c':'0','d':'0'})) 
select_a.append(j('<option />').text('義兵').attr({'a':'100','b':'120','c':'50','d':'50'}))
select_a.append(j('<option />').text('弓兵').attr({'a':'120','b':'90','c':'120','d':'50'})) 
select_a.append(j('<option />').text('山越兵 ').attr({'a':'170','b':'150','c':'160','d':'50'}))
select_a.append(j('<option />').text('輕騎兵 ').attr({'a':'120','b':'130','c':'20','d':'50'}))
select_a.append(j('<option />').text('羽林軍').attr({'a':'360','b':'350','c':'300','d':'120'}))
select_a.append(j('<option />').text('宿衛虎騎').attr({'a':'500','b':'550','c':'600','d':'200'}))
select_a.append(j('<option />').text('沖車').attr({'a':'850','b':'550','c':'350','d':'80'}))
select_a.append(j('<option />').text('燧石車').attr({'a':'1050','b':'1500','c':'600','d':'100'}))

var select_b = j('<select />').attr('id','my_type')
select_b.append(j('<option />').text('自選').attr({'a':'0','b':'0','c':'0','d':'0'})) 
select_b.append(j('<option />').text('青州兵 ').attr({'a':'115','b':'80','c':'160','d':'35'}))
select_b.append(j('<option />').text('武衛軍 ').attr({'a':'150','b':'110','c':'180','d':'65'})) 
select_b.append(j('<option />').text('槍騎兵 ').attr({'a':'400','b':'280','c':'360','d':'120'}))
select_b.append(j('<option />').text('遊騎兵  ').attr({'a':'130','b':'130','c':'20','d':'40'}))
select_b.append(j('<option />').text('武衛騎 ').attr({'a':'550','b':'400','c':'320','d':'130'}))
select_b.append(j('<option />').text('虎豹騎 ').attr({'a':'550','b':'600','c':'650','d':'200'}))
select_b.append(j('<option />').text('沖車').attr({'a':'900','b':'300','c':'600','d':'70'}))
select_b.append(j('<option />').text('霹靂車 ').attr({'a':'1000','b':'1500','c':'650','d':'100'}))

var select_c = j('<select />').attr('id','my_type')
select_c.append(j('<option />').text('自選').attr({'a':'0','b':'0','c':'0','d':'0'})) 
select_c.append(j('<option />').text('東州兵 ').attr({'a':'90','b':'70','c':'50','d':'40'}))
select_c.append(j('<option />').text('白耳兵 ').attr({'a':'150','b':'70','c':'75','d':'40'})) 
select_c.append(j('<option />').text('連弩兵 ').attr({'a':'400','b':'250','c':'400','d':'60'}))
select_c.append(j('<option />').text('探子  ').attr({'a':'120','b':'100','c':'50','d':'50'}))
select_c.append(j('<option />').text('戰車 ').attr({'a':'550','b':'270','c':'290','d':'75'}))
select_c.append(j('<option />').text('西涼鐵騎 ').attr({'a':'450','b':'515','c':'480','d':'80'}))
select_c.append(j('<option />').text('沖車').attr({'a':'800','b':'500','c':'400','d':'70'}))
select_c.append(j('<option />').text('發石車 ').attr({'a':'800','b':'1600','c':'750','d':'100'}))

j.fn.change_money = function(){
    
    
    j(this).change(function(){
       
     var $this = j(this).find('option:selected');

   
    var t1 = parseInt($this.attr('a'));
    var t2 = parseInt($this.attr('b'));
    var t3 = parseInt($this.attr('c'));
    var t4 = parseInt($this.attr('d'));

    if(j('input#no_t4').prop('checked'))
    {
       var _sum_price = t1 +t2 +t3;
    }
    else
    {
       var _sum_price = t1 +t2 +t3 +t4;
    }
    
    var total = parseInt(j('span#total').text())
 
    
    if(_sum_price > 0)
    {
        var _total = parseInt(parseInt(total) / _sum_price);
        
        j('input#t1').val(0)
        j('input#t2').val(0)
        j('input#t3').val(0)
        j('input#t4').val(0).keyup();

        j(this).parents('tr').find('td:last').text(_total)
        
        
        j('input#t1').val(_total*t1).keyup()
        j('input#t2').val(_total*t2).keyup()
        if(j('input#no_t4').prop('checked'))
        {
           j('input#t3').val(j('span#s5').text()).keyup()
        }
        else
        {
           j('input#t3').val(_total*t3).keyup()
            j('input#t4').val(j('span#s5').text()).keyup()
        }
    }
    })
    return j(this);
}

j.fn.change_money2=function(){
    
    j(this).click(function(){
       var t1 = parseFloat(j('input#my_t1').val());
       var t2 = parseFloat(j('input#my_t2').val());
       var t3 = parseFloat(j('input#my_t3').val());
       var t4 = parseFloat(j('input#my_t4').val());
        
       var total = parseInt(j('span#total').text());
       var _sum_price = t1 +t2 +t3 +t4;
       var _total = parseFloat(parseInt(total) / _sum_price);
       
       j('input#t1').val(0)
       j('input#t2').val(0)
       j('input#t3').val(0)
       j('input#t4').val(0).keyup();
        
       if(t1 != 0)
       j('input#t1').val(parseInt(_total*t1)).keyup()
       if(t2 != 0)
       j('input#t2').val(parseInt(_total*t2)).keyup()
       if(t3 != 0)
       j('input#t3').val(parseInt(_total*t3)).keyup()
       if(t4 != 0)
       j('input#t4').val(parseInt(_total*t4)).keyup()
       
       
    })
    

    
    
    return j(this);
}









var table = j('<table />').css({'border':'1px solid #ccc','width':'100%','font-size':'12px'})
var label = j('<label />').text('不計算米').append(j('<input />').attr({'id':'no_t4','type':'checkbox'}))
table.append(j('<tr />').append(j('<td />').attr('colspan','3').append(label)))

j('span#infoLabel').html(table)


table.append(j('<tr />').append(j('<td />').text('國家')).append(j('<td />').text('兵種')).append(j('<td />').text('數量')))
table.append(j('<tr />')
            .append(j('<td />').text('吳')).append(j('<td />').append(select_a.change_money())).append(j('<td />').text('0')))


table.append(j('<tr />')
            .append(j('<td />').text('魏')).append(j('<td />').append(select_b.change_money())).append(j('<td />').text('0')))

table.append(j('<tr />')
            .append(j('<td />').text('蜀')).append(j('<td />').append(select_c.change_money())).append(j('<td />').text('0')))

var label_1 = j('<label />').text('木').append(j('<input />').attr({'id':'my_t1','size':'10'}).val(0))
var label_2 = j('<label />').text('土').append(j('<input />').attr({'id':'my_t2','size':'10'}).val(0))
var label_3 = j('<label />').text('鐵').append(j('<input />').attr({'id':'my_t3','size':'10'}).val(0))
var label_4 = j('<label />').text('米').append(j('<input />').attr({'id':'my_t4','size':'10'}).val(0))

table.append(j('<tr />')
             .append(j('<td />').text('蜀')).append(j('<td />').append(label_1).append(label_2).append(label_3).append(label_4)).append(j('<td />').append(j('<button />').text('分配').attr({'type':'button'}).change_money2())))

table.find('td').css({'border':'1px solid #ccc','padding':'5px'})