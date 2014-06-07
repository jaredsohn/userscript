// ==UserScript==
// @name       BGN for DX.com
// @namespace  http://browserbase.biz/
// @version    0.1
// @description  bgn for dx.com
// @include      http://*.dx.com/*
// @include      https://*.dx.com/*
// @include      http://dx.com/*
// @include      https://dx.com/*
// @copyright  2013+, Peter Denev
// ==/UserScript==

if (!String.prototype.trim) {
   //code for trim
   String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}


price_to_bg = function(){
    var prices, val_split, i, old_value, bg_val, del_val, dels, product_price, p_cur, old_value_clean, del_old_val;
    var dolar = 1.57;
    var evro = 1.955;

    prices = document.getElementsByClassName('price');
    for(i=0; i<prices.length; i++){        
        old_value = prices[i].innerHTML;       
        bg_val = '';
        del_val = '';   
        
        dels = prices[i].getElementsByTagName('del');
        if(dels.length>0){            
            del_old_val = dels[0].innerHTML.trim(); 
            
            if(del_old_val.indexOf('$')!=-1){
                val_split = del_old_val.split('$');
                del_val = val_split[1].trim().replace(",",".") * dolar;
            }else if(del_old_val.indexOf('Ђ')!=-1){
                val_split = del_old_val.split('Ђ');
                del_val = val_split[1].trim().replace(",",".") * evro;
            }            
            
            del_val = Math.ceil(del_val * 100) / 100;
            del_val = '<del>BGN '+del_val+'</del>';
            del_old_val = '<del>'+del_old_val+'</del>';
        }
        old_value_clean = old_value.replace(del_old_val,'');
        
        if(old_value_clean.indexOf('$')!=-1){
            val_split = old_value_clean.split('$');            
            bg_val = val_split[1].trim().replace(",",".") * dolar;
        }else if(old_value_clean.indexOf('Ђ')!=-1){
            val_split = old_value_clean.split('Ђ');
            bg_val = val_split[1].trim().replace(",",".") * evro;
        } 
        
        prices[i].setAttribute('title',old_value.trim());
        bg_val = Math.ceil(bg_val * 100) / 100;
        bg_val = 'BGN '+bg_val; 
        prices[i].innerHTML = del_val + bg_val;
    }
    
    product_price = document.getElementById('price');
    if(product_price!=null){
        old_value = product_price.innerHTML;
        p_cur = document.getElementsByClassName('cur_cy')[0].innerHTML;
        if(p_cur.indexOf('$')!=-1){            
            bg_val = old_value.trim().replace(",",".") * dolar;
        }else if(p_cur.indexOf('Ђ')!=-1){           
            bg_val = old_value.trim().replace(",",".") * evro;
        }
        
        dels = product_price.getElementsByTagName('del');
        if(dels.length>0){
            del_val = '<del>'+dels[0].innerHTML+'</del>';
        }
        
        product_price.setAttribute('title',old_value.trim());
        bg_val = Math.ceil(bg_val * 100) / 100;
        bg_val = 'BGN '+bg_val; 
        product_price.innerHTML = del_val + bg_val;
    }
        
}

trackingLink =  function(){
	var all_links = document.getElementsByTagName('a');
    for(i=0; i<all_links.length; i++){
        var t_href = all_links[i].getAttribute('href');
        if(t_href=='http://intmail.183.com.cn/itemtrace_en.jsp'){
           all_links[i].setAttribute('href', t_href+'?n='+all_links[i].innerHTML); 
        }
    }
}

setTimeout(price_to_bg,2500);
setTimeout(trackingLink,2000);