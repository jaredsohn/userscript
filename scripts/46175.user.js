// ==UserScript==
// @name          Artify Ads
// @description   Remove Ads; Insert Art
// @include       *
// ==/UserScript==

function getElementsByClassName(class){  
	var elements = document.getElementsByTagName('*');  
	var list = [];  
  
	for(i in elements){  
		if( elements[i].className == class ){  list.push(elements[i]);  }  
	}  
  
	return list;  
}

function is_an_ad( tag, ad ){
  var ad_or_not = false;
  var attribute = tag == 'iframe'?'src':'href';
  var getattrib = ad.getAttribute(attribute);
  if( (getattrib != null) && (getattrib.search(/doubleclick/) != -1) ){
    ad_or_not = true;
  }
  return ad_or_not;
}

function create_art(ad,total_arts){
    var art = document.createElement('div');
    art.className = 'ad-artified';
		art.id = 'ad-artified-'+total_arts;
		art.innerHTML =	'ART';
    art.style.position = 'absolute';
    art.style.fontWeight = 'bold';
    art.style.background = '#f00';
    art.style.color = '#000';
    art.style.textAlign = 'center';
    art.style.top = ad.offsetTop+'px';
    art.style.left = ad.offsetLeft+'px';
    art.style.width = ad.offsetWidth+'px';
    art.style.height = ad.offsetHeight+'px';

    document.getElementsByTagName('body')[0].appendChild( art );
    return true;
}

function artify_elements(tag){
  var elements = document.getElementsByTagName(tag);
  var artified = document.getElementsByClassName('ad-artified').length

  for( e in elements ){
    if( is_an_ad( tag, elements[e] ) ){
      create_art( elements[e], artified );
      artified+=1;
    }
  }
}

function artify_iframe(){
  artify_elements('iframe');
}

function artify_a(){
  artify_elements('a');
}

artify_iframe();
artify_a();