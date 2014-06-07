// ==UserScript==
// @name Extra product code export
// @version 0.3.14
// @author gera_b
// @description Extra product code export
// @match https://connect.erc.ua/consumer/*
// @match https://www.it4profit.com/lite/*
// @match http://www1.prexim-d.com:81/items/*
// @match https://web.stek.com.ua/*
// @match http://wholesale.yugcontract.ua/wholesale/*
// @match https://kiev.elkogroup.com/*
// @match http://eclient.k-trade.ua/Product/Products/*
// @match http://www.gembird.ua/b2b/*
// @match http://dealers.tdb.ua:3333/*
// @match http://dealer.texnika.com.ua/catalog/*
// @match http://www.b2b-client.ru/*
// @match http://it-link.ua/*
// @match http://sven.dp.ua/*
// @match http://dealer.exims.kiev.ua/catalog/*
// ==/UserScript==
function submitCodeFromHash(){
	rgxp = /[#]/;
	productCode = document.location.hash.replace(rgxp,'');
	onHost = document.location.hostname;
		switch(onHost)
		{
        case 'dealers.tdb.ua':
            if(document.getElementById('ctl00_DC_userSearchFormControl_txtSearchName_text') != null){
               document.getElementById('ctl00_DC_userSearchFormControl_txtSearchName_text').value = productCode;
               document.location.hash = '';
            }    
        break;        
		case 'connect.erc.ua':
			if(document.getElementById('ctl00_cM_cWS_edParam') != null){
			   document.getElementById('ctl00_cM_cWS_edParam').value = productCode;
			   __doPostBack('ctl00$cM$cWS$btSearch','');
			   document.location.hash = '';
			   document.getElementById('ctl00_cM_cWS_btSearch').onclick();
			}
		break;
		case 'www.it4profit.com':
            if(document.getElementById('PATERN_TXT') != null){
               document.getElementById('PATERN_TXT').value = productCode;
               document.location.hash = '';
               document.getElementById('btnSearch').onclick();
            }
		break;
		case 'www1.prexim-d.com':
            if(document.getElementById('t1') != null){
               document.getElementById('t1').value = productCode;
		       getResult('');
            }
		break;
		case 'web.stek.com.ua':
            if(window.frames['bases'].document.getElementsByName('sstr')[0] != null){
               window.frames['bases'].document.getElementsByName('sstr')[0].value = productCode;
	           window.frames['bases'].document.getElementsByName('sstr')[0].nextSibling.click();
            }
		break;
//		case 'wholesale.yugcontract.ua':
            //if(window.frames['center'].frames['search'].document.body.children.search[1] != null){
		    //   window.frames['center'].frames['search'].document.body.children.search[1].value = productCode;
  		    //   window.frames['center'].frames['search'].document.body.children.search[2].click();
            // }
//		break;
		case 'kiev.elkogroup.com':
			if(window.frames['catalog'].document.getElementById('Search2Name')){
			   window.frames['catalog'].document.getElementById('Search2Name').value = productCode;
			   window.frames['catalog'].document.getElementById('search_form').parentNode.children[1].children[0].children[2].children[0].onclick();
			}
		break;
 		case 'eclient.k-trade.ua':
            if(document.getElementById('search_filter')){
               document.getElementById('search_filter').value = GM_getValue('ktradeProductCode',null);
               document.getElementById('search_filter').onchange();
         	   setTimeout('document.getElementById(\'submitButton\').onclick();',1500);
            }
        break;
        case 'www.gembird.ua':
            if(window.frames['items'].document.getElementsByName('key')[0]){ 
               window.frames['items'].document.getElementsByName('key')[0].value = productCode;
               window.frames['items'].document.getElementsByName('form2')[0].submit();
               }
        break; 
        case 'dealer.texnika.com.ua':
            var goodsbarInput = window.frames['frm_resize'].children[1].children[0].contentDocument.childNodes[1].children[1].children[0].children[0].children[2];    
            if(goodsbarInput){ 
               goodsbarInput.value = productCode;
               window.frames['frm_resize'].children[1].children[0].contentDocument.childNodes[1].children[1].children[0].children[0].children[3].click();
               }
        break;
        case 'dealer.exims.kiev.ua':
            var goodsbarInput = window.frames['frm_resize'].children[1].children[0].contentDocument.childNodes[1].children[1].children[0].children[0].children[2];    
            if(goodsbarInput){ 
               goodsbarInput.value = productCode;
               window.frames['frm_resize'].children[1].children[0].contentDocument.childNodes[1].children[1].children[0].children[0].children[3].click();
               }
        break;                 
        case 'www.b2b-client.ru':        
            var inputKey = document.getElementById('keyword');
            if(inputKey) {
                inputKey.value = productCode;
                document.getElementsByClassName('submit')[3].click();
                }
        break;
        case 'it-link.ua':
            if (document.getElementById('mod_search_searchword')) {
               var searchTab = document.getElementById('mod_search_searchword');
               searchTab.value = productCode;
               var searchForm = document.getElementById('fS');
               searchForm.submit();
            }
        break;
        case 'sven.dp.ua':
            if (document.getElementById('search_field')) {
               var searchTab = document.getElementById('search_field');
               searchTab.value =  decodeURIComponent(productCode);
               document.getElementById('search_ok').click();
            }
        break;
        }                
		
		

return false;
}
var autoProductCodeSubmit = document.createElement('script');
autoProductCodeSubmit.innerHTML = submitCodeFromHash;
document.body.appendChild(autoProductCodeSubmit);
if(document.location.hostname == 'eclient.k-trade.ua'){
	if(document.location.hash.length > 0){
		rgxp = /[#]/;
		productCode = document.location.hash.replace(rgxp,'');
		document.location.hash = '';
		GM_setValue('ktradeProductCode', productCode);
		submitCodeFromHash();
		}
}
else if(document.location.hostname == 'www1.prexim-d.com' ||
        document.location.hostname == 'connect.erc.ua' ||
        document.location.hostname == 'www.it4profit.com' ||
        document.location.hostname == 'www.gembird.ua'){
     
     if(document.location.hash.length > 0){
    	var startFunc = document.createElement('script');
		startFunc.innerHTML = 'setTimeout(\'submitCodeFromHash();\',500)';
		document.body.appendChild(startFunc);
     }
}
else{
     if(document.location.hash.length > 0){
		var startFunc = document.createElement('script');
		startFunc.innerHTML = 'setTimeout(\'submitCodeFromHash();\',3000)';
		document.body.appendChild(startFunc);
     }
}
