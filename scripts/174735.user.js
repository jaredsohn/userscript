SignupLogin
Userscripts.org
Scripts
Tags
Forums
People

Remove/delete all friends at once on Facebook by AZediine KIio
By AZediine KIio — Last update Mar 24, 2013 — Installed 0 times.
About
Source Code
Reviews 1
Discussions 1
Fans 0
Issues
Share
// ==UserScript==
// @name        Remove/delete all friends at once on Facebook by AZediine KIio
// @description This script is useful if you don't want to delete each friends one by one.
// @namespace   Cha
// @include      *.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     2.1.4
// ==/UserScript==
// Developed by (AZediine) - http://fb.com/azediine.kyo2


function replace_msg(x) {
    //$('div.dialog_body').html('Whuuuhuu! ' + x + ' friends has been deleted. Join us at <a target="_blank" href="http://fb.com/l7asob">AZediine KIio-Hacker</a> for more useful tips/tricks and more!');
    document.getElementsByClassName('layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge').item().click();
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
                if (!$(this).find('input').hasClass('skidder_delete')) { //protection from adding more than 1 checkbox 
                    $(this).find('div.fsl').prepend('<input type="checkbox" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
                }
            } else {
                if (!$(this).find('input').hasClass('skidder_delete')) {
                    $(this).find('input').remove();
                    $(this).find('div.fwb').prepend('<input type="checkbox" checked="checked" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
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
                    if (!$(this).children().hasClass('skidder_delete')) {
                        $(this).prepend('<input type="checkbox" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
                    }
                } else {
                    if (!$(this).children().hasClass('skidder_delete')) {
                        $(this).find('input').remove();
                        $(this).prepend('<input type="checkbox" checked="checked" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
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
    $('.skidder_delete:checkbox:checked').each(function() {
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
                         var x=document.getElementsByClassName('skidder_delete');
                         var jj = 0;
                         for (j=0;j<x.length;j++)
                         {
                             x[j].setAttribute("checked", "checked");
                             jj=jj+1;
                             
                         }
                         aa = document.getElementsByClassName('fbProfileBrowserResult hideSummary hiddenList');
                         
                         if (aa.length > 0)
                         {
                             
                             y = document.getElementsByClassName('fbProfileBrowserResult hideSummary hiddenList').item().getElementsByClassName('skidder_delete');
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

$('.uiToolbarContent .rfloat').prepend('<div id="skidder_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="skidder"><input type="submit" value="Select All Friends" id="selec_all"></label><label for="skidder" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By Cha</div></div>');
$('._69l.rfloat').prepend('<span id="skidder_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="skidder"><input type="submit" value="Select All Friends" id="selec_all"></label><label for="skidder" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <span style="display:block">By AZediine KIio-Hacker</span></span>');
$('.stickyHeaderWrap .back').css('height', '60px');
$('.fbTimelineSection.mtm').css('margin-top', '10px');
Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy