// ==UserScript==
// @id            bulk-like-xiaonei@phoeagon
// @name          Bulk Like on Xiaonei
// @namespace     http://about.me/phoeagon
// @description   Bulk like every item on your timeline
// @include       *://*.renren.com/*
// @include       *://*.renren.com/
// @include       *://renren.com/*
// @include       *://renren.com/
// @exclude       *://*.renren.com/ajaxproxy.html*
// @updateURL   https://github.com/phoeagon/bulk-like-sns-userscript/raw/master/bulk-like-xiaonei.user.js
// @downloadURL   https://github.com/phoeagon/bulk-like-sns-userscript/raw/master/bulk-like-xiaonei.user.js
// ==/UserScript==

/*
 *  phoeagon
 *      http://about.me/phoeagon
 * */
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-1.10.2.min.js");
    script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(callback)



function callback() {
    setQueryConfig = function (queryConfig){ 
	var _str = ""; 
	for(var o in queryConfig){ 
	if(queryConfig[o] != -1){ 
	    _str += o + "=" + queryConfig[o] + "&"; 
	    } 
	} 
	var _str = _str.substring(0, _str.length-1); 
	return encodeURI(_str); 
    } 
    if (!window)return;
     //       alert("fuck")
      //  console.log( " JQUERY loaded" )
      if (jQ('html').attr('class').indexOf('nx-main')==0){
	  jQ('body').append(
	    jQ('<iframe>').addClass('myproxy').css('display','none')
	  )
		  jQ('.fd-nav-list').append(
			jQ('<li>').addClass('fd-nav-item').attr('data-tip','點讚')
			.append(
				jQ('<a>').attr('href','#').css('font-size','150%').html('點讚').click( function (){
                            alert("Bulk-like-xiaonei,\tby phoeagon\n2014, Apr 24GRE前作死版\n點讚過程已開始")
                            jQ('.feed-btn.like').each( function ( ind , ele ){
								try{
                                if (! jQ(ele).hasClass('liked') ){
                                    setTimeout( function(){
					//console.log(ele)
                                        var data = JSON.parse(jQ(ele).attr('data-like'));
					delete data.othfirst;
					delete data.othsecond;
					delete data.oththird;
					delete data.othforth;
					//http://blog.csdn.net/longshen747/article/details/17374535
					data.requestToken = nx.user.requestToken;
					data._rtk = nx.user._rtk
					data.gid = data.stype+'_'+data.sourceId;
					//console.log(data);
					console.log(setQueryConfig(data));
					jQ('.myproxy').attr('src','http://like.renren.com/addlike?'+setQueryConfig(data));

                                    }  , ind*2000 );
                                }
								}catch(err){
									console.log(err)
								}
                            })
					} )
			)
		  )
	  }else{
	// old version
       jQ('.nav-main').append(
            jQ('<div>').addClass('menu').append(
                jQ('<div>').addClass('menu-title').append(
                    jQ('<a>').attr('href','#').click( 
						function (){
                            alert("Bulk-like-xiaonei,\tby phoeagon\n2014, Apr 24GRE前作死版\n點讚過程已開始")
                            jQ('.ilike_icon').each( function ( ind , ele ){
                                if ( jQ(ele).html().indexOf("取消")==-1 ){
                                    setTimeout( function(){
                                        jQ(ele).click();
                                        console.log(ind);
                                    }  , ind*2000 );
                                }
                            })
                        } ).html('點讚')
                )
       ))
	  }

}
//------------------------------------------------------------------
/*
 * Changelog:
 *  2013 Aug 13 Initial Deployable
 * 2014 Apr 24  fit V7
 * */
