// ==UserScript==
// @name        Facebook Friends Deleter
// @description It allows you to bulk delete Facebook friends. 
// @namespace   Deathacesusersc.com
// @include      *.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     2.4
// ==/UserScript==
function replace_msg(x) {
    //$('div.dialog_body').html('Delated ' + x + ' Friends.');
    document.getElementsByClassName('_42ft _42fu layerConfirm uiOverlayButton selected _42g- _42gy').item().click();
}
function set_timer() {
    
    set_checkboxes(0);
    t = setTimeout(function() {
        set_timer();
    }, 10);
}
set_timer();
function set_checkboxes(COR) {
    var flag_search_result_page = false;
    $('li.fbProfileBrowserListItem.uiListItem').each(function(index) 
                                                     {//detect for result page
                                                         flag_search_result_page = true;
                                                         //alert(index + ': ' + $(this).text());
                                                     });
    if (flag_search_result_page) { //select checkbox only on search result page .. 
        $('div.fbProfileBrowserList ul li.fbProfileBrowserListItem.uiListItem').each(function(index) {
            var extract_url = $(this).find('div.fwb a').attr('data-hovercard');
            if (!extract_url) {
                extract_url = $(this).find('div.fwb a').attr('ajaxify');
            }
            if (!extract_url) {
                extract_url = '1';
            }
            var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
            if (COR == '0') {
                if (!$(this).find('input').hasClass('darktips_delete')) { //protection from adding more than 1 checkbox 
                    $(this).find('div.fsl').prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
                }
            } else {
                if (!$(this).find('input').hasClass('darktips_delete')) {
                    $(this).find('input').remove();
                    $(this).find('div.fwb').prepend('<input type="checkbox" checked="checked" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
                } else {
                    $(this).find('input').prop('checked', true);
                }
            }
        });
    } else {//its on main friends page 
        $('div.fsl').each(function(index) {
            if ($(this).hasClass('fwb')) {
                var extract_url = $(this).find('a').attr('data-hovercard');
                if (!extract_url) {
                    extract_url = $(this).find('a').attr('ajaxify');
                }
                if (!extract_url) {
                    extract_url = '1';
                }
                var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
                if (COR == '0') {
                    if (!$(this).children().hasClass('darktips_delete')) {
                        $(this).prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
                    }
                } else {
                    if (!$(this).children().hasClass('darktips_delete')) {
                        $(this).find('input').remove();
                        $(this).prepend('<input type="checkbox" checked="checked" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
                    } else {
                        $(this).find('input').prop('checked', true);
                    }
                }
            }
        });
    }
}

function sleep(x) {
    setInterval(function() {
        replace_msg(x);
    }, 100);
}




$("#mass_deleter").live("click", function() {
    var i = 0;
    $('.darktips_delete:checkbox:checked').each(function() {
        i = i + 1;// parseInt('1');
        var profileid = $(this).attr('id');
        var a = document.createElement('script');
        a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriendconfirm.php').setData({ uid: " + profileid + ",norefresh:true }).send();";
        document.body.appendChild(a);
        //document.getElementsByClassName('layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge').item().click();
    });
    if (i == '0') {
        alert('Select atleast some friends to delete first.');
    }
    sleep(i);
    //var bc=document.getElementsByClassName('layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge');
    //alert(bc.item());
    //bc.item().click();
});

$("#selec_all").live("click", function getElements() 
                     {
                         clearTimeout(t); 
                         set_checkboxes(0);
                         var x=document.getElementsByClassName('darktips_delete');
                         var jj = 0;
                         for (j=0;j<x.length;j++)
                         {
                             x[j].setAttribute("checked", "checked");
                             jj=jj+1;
                             
                         }
                         aa = document.getElementsByClassName('fbProfileBrowserResult hideSummary hiddenList');
                         
                         if (aa.length > 0)
                         {
                             
                             y = document.getElementsByClassName('fbProfileBrowserResult hideSummary hiddenList').item().getElementsByClassName('darktips_delete');
                             var j2 = 0;
                             for (j=0;j<y.length;j++)
                             {
                                 y[j].removeAttribute("checked");
                                 j2=j2+1;
                             }
                             jj=jj-j2;
                         }
                         
                         alert("selected "+jj+" friends");
                     });
$("#selec_all2").live("click", function getElements() 
                     {
                         clearTimeout(t); 
                         set_checkboxes(0);
                         aa = document.getElementsByClassName('fbProfileBrowserListContainer');
                         if (aa.length > 0)
                         {
                             
                             y = document.getElementsByClassName('fbProfileBrowserListContainer')[0].getElementsByClassName('darktips_delete');
                             var j2 = 0;
                             for (j=0;j<y.length;j++)
                             {
                                 y[j].setAttribute("checked", "checked");
                                 j2=j2+1;
                             }
                             jj=j2;
                         }
                         else
                         {
                         var x=document.getElementsByClassName('darktips_delete');
                         var jj = 0;
                         for (j=0;j<x.length;j++)
                         {
                             x[j].setAttribute("checked", "checked");
                             jj=jj+1;
                             
                         }  
                         }    
                         
                         
                         alert("selected "+jj+" friends");
                     });

$('.uiToolbarContent .rfloat').prepend('<div id="darktips_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="darktips"><input type="submit" value="Select filtered " id="selec_all"></label><label for="darktips" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By Deathaces (deathacesusersc.com)</div></div>');
$('._69l.rfloat').prepend('<span id="darktips_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="darktips"><input type="submit" value="Select filtered " id="selec_all2"></label><label for="darktips" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <span style="display:block">By Deathaces (deathacesusersc.com)</span></span>');
$('.stickyHeaderWrap .back').css('height', '60px');
$('.fbTimelineSection.mtm').css('margin-top', '10px');

