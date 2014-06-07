// ==UserScript==
// @name           KOC Auto GetGift
// @namespace      koc_agg
// @auther	       Mesak
// @description	   Auto get your kingdoms of camelot gift
// @include        http://www.facebook.com/games?ap=1
// @include        *kingdomsofcamelot.com/fb/e2/src/claimGift_src.php*
// @include        *kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php*
// @require        http://mesak-project.googlecode.com/files/jquery.142.gm.js
// ==/UserScript==
var koc_servers = '';
for(var i=100;i<=300;i++){
    koc_servers += '<option value="' +i+ '">' +i+ '</option>';
}
var finalcountdown=0;
var koc_server = GM_getValue('koc_server',0);
var WINhref = window.location.href.toLowerCase();
if( WINhref.indexOf('claim') == -1){
    var load_game = window.setInterval(function(){
      if( $('h3.uiHeaderTitle').size() == 7){
    	clearInterval(load_game);
    	init();
      }else if (finalcountdown > 30){
         clearInterval(load_game);
      }
      finalcountdown++;
    }, 1000);
}else{
    document.getElementById('serverid').value = koc_server;
    $('#koc_servers').change(function(){
    	GM_setValue('koc_server',this.value);
    })
    if(koc_server != 0){
        if(  WINhref.indexOf('claimgift') != -1){
            unsafeWindow.checkServer();
        }else{
            unsafeWindow.checkServer( koc_server );
        }
    }
}
function init(){
    $('#pagelet_requests h3.uiHeaderTitle').parent().after('Kingdoms of Camelot Server Select : <select id="koc_servers">'+koc_servers+'</select>'+'<div><iframe id="kociframe" name="kociframe" style="display:none"></iframe></div><textarea id="pagetext" cols="70" rows="12"></textarea>');
    $('#koc_servers').change(function(){
    	GM_setValue('koc_server',this.value);
    })
    document.getElementById('koc_servers').value = koc_server;
    $('input[type="submit"][name^="actions[http://apps.facebook.com/kingdomsofcamelot/convert.php"]').each(function(i,n){
        $(n).parents('form:first').attr('target','kociframe');
        $(n).parent().empty().append('<input class="getgift" type="button" name="'+$(n).attr('name')+'" value="'+$(n).attr('value')+'" />');
    })
    $('input.getgift').click(function(){
        var iform = $(this).parents('form:first');
        var lab = $(this).parent();
        var url = $(this).attr('name').replace('actions[','').replace(']','');
        $('#kociframe').attr('src',url).show().css({'width':'450px','height':'560px','border':'0'});
        /*
        lab.empty().append('<span style="color:#fff"></span>');
        var desc = lab.find('span');
        desc.text('Level 1');
        GMAjax("GET", url ,'',function(r1) {
            var match_url = r1.match(/window.location.replace\((.+)\)/);
            $('#pagetext').text(url +"\n"+r1);
            url = match_url[1].replace(/\\/g,'').replace(/"/g,'').replace(/'/g,'');
            desc.text('Level 2');
            */
            /*
            GMAjax("GET", url ,'',function(r2) {
                $('#pagetext').text(url +"\n"+r2);
                var match_url = r2.match(/<iframe [^>]*src=['"]?(http:\/\/[^"'>]+)["']?/);
                url = match_url[1].replace(/&amp;/g,'&');
                /*
                desc.text('Level 3');
                $('#kociframe').attr('src',url).show().css({'width':'450px','height':'560px','border':'0'});
                $.post('ajax/reqs.php', iform.serialize() ,function(data, textStatus){
                    iform.remove();
                })
                */
                /*
                GMAjax("GET", url ,'',function(r3) {
                    var params = {},userset = {},selserver = document.getElementById('koc_servers').value;
                    var tmp = url.match(/www(.+\d).kingdomsofcamelot.com/);
                        server = tmp[1];
                    var tmp = url.replace('http://www'+ server +'.kingdomsofcamelot.com/fb/e2/src/','');
                        tmp = tmp.replace('claimGift_src.php?','');
                        tmp = tmp.replace('claimdailygift.php?','');
                    var var_url = tmp.split("&");
                    $.each(var_url,function(i,n){
                        var tmp = n.split("=");
                        if( tmp[0].indexOf('fb_') == 0){
                            params[tmp[0]] = tmp[1];
                        }else{
                            userset[tmp[0]] = tmp[1];
                        }
                    })
                    if( userset['page'] == 'claimdailygift'){
                        var tmp = r3.match(/'giftId'[^>]*value='(\d+)'/);
                            params.giftId = tmp[1];
                            params.hasExistingServer = 1;
                            params.serverid = selserver;
                        var post_url = url.replace('www'+ server,'www'+ selserver);
                    }else{
                        var tmp = r3.match(/var tvuid=\'(\d+)\';/)
                            params.tvuid = tmp[1];
                        var tmp = r3.match(/giftinviteid:(\d+)/);
                            params.giftinviteid = tmp[1];
                            params.selectedS = selserver;
                            params.ver= 2;
                            params.lang=userset.lang;
                            params.standalone=userset.standalone;
                        var post_url = 'http://www'+ selserver +'.kingdomsofcamelot.com/fb/e2/src/ajax/' +userset['page']+'.php?wcfbuid='+userset['wcfbuid'];
                    }
                    desc.text('Level 4');
                    $('#pagetext').text(post_url);
                    GMAjax("POST", post_url , $.param(params) ,function(r4) {
                        var rslt = $.parseJSON(r4);
                    	if (rslt.ok){
                    		desc.text('Done');
                    	} else {
                    		var errMsg = (rslt.msg || null);
                    		var errCode = (rslt.error_code || null);
                    		$("ajaxErrTxt").innerHTML=errMsg;
                    		if (errCode == 3){
                    			desc.text('Please wait while the item is being added to your inventory...');
                    		} else {
                    			desc.text('Content');
                    		}
                    	}
                    })
                })
                */
            //})
        //})
    })
}
function GMAjax(t,u,d,fn){GM_xmlhttpRequest({method: t,url: u,headers: {"Content-Type": "application/x-www-form-urlencoded"},data:d,onload: function(xhr) { fn(xhr.responseText); }});}
