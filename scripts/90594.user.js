// ==UserScript==
// @name           Gizmodo price order-er
// @namespace      http://userscripts.org/users/249035
// @description    Order price per section, lowest to highest..
// @include        http://gizmodo.com/*/gadget-deals-of-the-day
// ==/UserScript==

var $j;
// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();
// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $j = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
// All your GM code must be inside this function
    function letsJQuery() {
	//console.log('GM loaded');
	//match p's a tags that have dollar amounts.. order them with that value.
	//first conver them into lists
	pi = 0;
	$j('.content p').each(function(){//match the start of the string having '•'(\u2022)
		pi++;
		s =$j(this).html(); 
		if(s.indexOf('\u2022')>0){
			//console.log('p•');
			listIndex = s.indexOf('\n')+1;//anything after this until '</p>' gets replaced with ul/li
			array = bulletTrimmer(s);
			array = array.sort(sortPrice);

			//replace all bullet text in <p> with new one that is <ul>
			//repack array with '• ', and price in front!
			//console.log('reformat');
			for (i in array){
				re = /\$\d+.\d+|\$\d+/g;
				dmatch = array[i].match(re);
				fstr = '0';
				if(dmatch){fstr = dmatch[0].replace(/\$|,/g,"");}				
				p = parseFloat(fstr);
				array[i] = '<u>$'+p.toString()+'</u> • '+array[i];
			}
			priceList = array.join('<br>');
			start = s.substr(0,listIndex-1);
			s = start + priceList;
			$j(this).html(s);
		};
	});
	//console.log('total p:'+pi);
    }
    function sortPrice(a,b){
	aatag = a.match(/<a.*\a>/g);
	batag = b.match(/<a.*\a>/g);
	if (aatag && batag){
		re = /\$\d+.\d+|\$\d+/g;
		afstr = aatag[0].match(re);
		bfstr = batag[0].match(re);
		if(afstr){afstr = afstr[0].replace(/\$|,/g,"");} else{afstr = '0';}
		if(bfstr){bfstr = bfstr[0].replace(/\$|,/g,"");} else{bfstr = '0';}

		aprice = parseFloat(afstr);//float value of price inside the <a> tag
		bprice = parseFloat(bfstr);//float value of price inside the <a> tag

		return aprice - bprice;
	}else{return 1;}		
    }
    function bulletTrimmer(str){//console.log('trim');
	//given a string of html, it spits out an array of substrings that start after '•' and ends before newline
	//first split by <br>, then trim each element
	arr = str.split('<br>');
	newarr = new Array();
	for (e in arr){
		bulleti = arr[e].indexOf('\u2022'); 
		if(bulleti > 0){
			//keep and trim to specification
			newarr.push(arr[e].substr(bulleti+1)); //s+2 because it's ALWAYS '• 'text
		}
	}

	return newarr;
    }