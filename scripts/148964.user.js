// ==UserScript==
// @name           Bugzilla Attachments
// @namespace      http://www.jameswigley.com
// @description    Bugzilla attachment icons and image previews
// @include        http*://*bugtrack*/*show_bug.cgi*
// @version        0.2
// @author         James Wigley
// @copyright      2013, James Wigley
// @date           2013-01-02
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();

  onReady(jQuery);

}, false);

function onReady($) {

    // add file type icons to attachment table
    $attach_table = $('#attachment_table tr'); 
    $attach_table_length = $attach_table.length;
    $attach_table.each(function(index){
        if ( index === 0 ) {
            $(this).find('th').attr('colspan',$(this).find('th').attr('colspan') + 1);    
        } else if ( index === ( $attach_table_length - 1) ) { 
            $(this).find('td').attr('colspan',$(this).find('td').attr('colspan') + 1);
        } else { 
            $a_href = $(this).find('a').attr('href');  
            $(this).prepend('<td id="attach_image"><a href="' + $a_href + '"><div id="attach_image_div"/></a></td>');
        }
    });  

    // show attachment image preview thumbnail, with larger hover image
    if ( $('#attachment_table .bz_contenttype_image_jpeg').length > 0 || $('#attachment_table .bz_contenttype_image_png').length > 0) {

        $attach_table.each(function(index){  
            overlay = 0;     

            if ( $(this).hasClass('bz_contenttype_image_jpeg') || $(this).hasClass('bz_contenttype_image_png')) { 

                var img_href = $(this).find('a').attr('href');
                $(this).append('<td><img id="thumb" src="' + img_href + '"/><div id="overlay" class="overlay"><div id="overlay_back"><img id="overlay_img" src="' + img_href + '"/></div></div></td>');

                $overlay = $(this).find("#overlay");
                $overlay.hide();
     
                $images = $(this).find('#thumb');

                $images.each(function() {
                    $(this).mouseenter(function() {
                        $(this).parent().find('#overlay').show();
                    });
 
                    $(this).mouseleave(function() {
                        $(this).parent().find('#overlay').hide();                
                    });
                });
            }
            else {
                if ( index === 0) {
                    $(this).find('th').attr('colspan',$(this).find('th').attr('colspan') + 1);   
                } else if ( index === ( $attach_table.length - 1) ) {
                    $(this).find('td').attr('colspan',$(this).find('td').attr('colspan') + 1);
                }
                else {
                    //add blank td to fill out table  
                    $(this).append('<td></td>');
                }
            }      
        });  
    } 
}

GM_addStyle(
".bz_contenttype_image_jpeg img,.bz_contenttype_image_png img  { \
    height: 32px; \
} \
#overlay { \
    position:relative; \
} \
#overlay_back { \
    position:absolute; \
    background-color: white; \
    border: 2px solid silver; \
    padding: 2px; \
    -webkit-border-radius: 5px; \
    -moz-border-radius: 5px; \
    border-radius: 5px; \
} \
#overlay_back img { \
    height: auto; \
    max-height: 600px; \
} \
#attach_image div { \
    width: 32px; \
    height: 32px; \
} \
#attach_image_div { \
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQNJREFUeNq0V+lvVUUUP3PfUoqYCAldRFES9aNB4YNKK01T+OLaBVofVqUagiExkioJdKGUokBtjfpBY0qraF8X3usiEBO1pAmiMeAS/wER7Ydi6MLb371zx3Pmvr6t97bvmjrJuecuc87M+c3vnDvDhBCw0BhjTv/o6BjePCV0HVJf7DSyYqAwBpzz8d01NTX4QjPtSWPTZUGw3YkTECvVpqenRf/AwAj6dVhNwJn1btUCIn9c/5MQsR8/2m+6/z740uuFFz0eKC8rq/QODU14amsrzJBQsp7ZAuyKooDD4QCn04Zgf4dDSdrPzc1DUVERlJWWbh/y+W7ga9dyE0g2cpbndkK+2wX5ebnJKpQ8V2IMBC9/dT7cujUDxcXF8OS2bcXDfv/17Ek4rSZAkRzumQSXUzG85Qi/qnHobaqTXMxzu5FVa5JIbC8puRs5NlVdWbkBu6tLToCocGpfOTiIByzX9Qdkvi7vH3rwAegfHJSmtKw6ZlU9cgLbepQ7UOYsJmCwQKAl1wXoYAKAMC5maSrQJhgIwtYtW6VkN90gudt6CRJeXUgiFxKLyMQWjS2Ao+i6SEZOQEmNCReNRiAei6Itk7YUiMo5FBYWGp1y4QCRsPGT7yQHWNoUKG4aeOM9BfDG0w9D9/hvcPDZzfD+V4buRt2I+sOLv8ONqZtA1sSLzv07TMdhWZWw4JzfP11TVQWzMzOwOs8pUUhvnGP0uJ5yeXQ9rfaltERQpqYia4mGEwjHNFi7bh34RkZgV3U1QgE3zQpRKj8dDA588LV0JOFNrC9F/uZzj0Dn6M/wVtWj8N7IL4v021VboGv8V/gLEWAJBLoO7LROnbRSTAjIMjo/Nyvi0aAQaliKFguJWDggIqHbInh7TgQD8yJgoUmorx43bMkP+aNG/mmchbEtCxGRb3/XeXi9+wLqC3Dq3FWJAmkFa0Sn75rsc9p31UQz6PRfk7aG/Xn5zRYCAYxCowh4zBAtIp9J1CiiEQmKMKIRDgVEKJipSVRETPCotCUb8meGgDUHFAfsOz0ObpdjcQomuHBo12PwzuAPcLj2cXh36MekPlL3BJwc/sngABJIVTl8dPAZewiEQxiBFsc7DYUnBO91FdcVo4pFEAVcX5RYOFOTUB+8GDboR/qzhwCDhpM+cMssYMkqtnFDgYyw3XsFWj0lcMx7GVpfKMHn7+Uz6aN7SqFj4EoSgThmwceNz9tDIBaJYLSayTaDG+9JuIqAxDHYKCISTWoS+oadDBPsK/3ZQ0CBhhPDkgPpGxMyStRzWRfuRS60eErh6NlJaKsvg7YvJuHYS2VwvP+yRIC2ZnHkwKeHqu0hoMo11C02W3pCDF5wXGOdx5Nal9zhGf0Nf3YR6BgAFyGQKLD0H9A0Hc401UJr3wS07y2Hlt5LcJx0X5puKId2ROTvqX9kFaVK2HNktz0EdK4tsd3kKS6Y6YzoRYa/nBFgmAV7O7yZWSDXfD201JdDc++30NFQAc1nUL+6Y5FuP3sJEUhlQV9znT0ErNffihPL2ej2EKAf68vt/RKB7B0J/Y6pEra9UgFNPd/Aidd2LtJtn02ksgAR+Lx1j10E/kvkyyOx/N/Q1mGELaPNTNjS5wLL3+YKtWz/TpOYgiNjY2t04+C4ciMz48CKWRFcak94F6pNKGtzPo3YPzrP0tGTzgU0dvYEXIlDg/t/XIU4SohORjT2vwIMAB3WgV+mUC4nAAAAAElFTkSuQmCC); \
} \
.bz_contenttype_application_x-zip-compressed #attach_image_div { \
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABWNJREFUeNq0V1toHFUY/s6ZMzOb3c0aLyE3g0hLETSSxvQlIYpW+lJoiC0hCL4URSG+NGmKxdaEpFqsWPFSFMEXn2LAJLsoxRQ0TYogbdqCeEFqmyakmsTENCa4cS/jf87MbLabmd1E8JQ/Z+bMOf/l+//z/VtmWRbkYIyJaDQ6TPPedDoNv0HfwTmHruvqOZFIIJVKwdXj7iEd0ZaWlgP0mvTSk9kvH5yX4lgsZm12dHZ2WEe6uny/z87OWgMDA4OkV/NzQArLQqB0eHh4rrm5GRNXroJRlIz+bUQAKvpQKISPP/oQ8XgcB59/AYlkEmlC4rGdtejv70dbWxvICYyNjZ1vbW19OhcJ1y7P1u0+6IYBg4wYhpcYSs68/55ypuNwl71G++U5pZScX1q6jbKyMjQ1NT0xODg4JdV6IcG9FjVSoGmap3Ap9P0QGZbj3XfehiaE/Z3zTA0EgkVYWFhEeXk5GhoaKoaGhia9nPB3wEeEI6ffOgWJYteRo9DIoPvdwRcBQiNcHM4g0djYWElFPpPrhKcDnCJS4kacI4zk6KvH1N5Tb55c30uzHNu2bwcVIGLRKEZGvlI1UVpaKj/JP6FsW8LLARkh59z3GgoydvJEHwzTxLHj3VhdXUGaa6qIFhYXUVdXp8Tn6hmFEdB4Qenu7VV7+3p7qAYo/4JSoGv4i5yZnJrKyA2S6zdv+vKK8K4BLS8Cuqajt6dHVf+J19/AyopEIA1uZZ1xeQbWHSS1qSLkQvOPniLlOkd9fb1ysvu14xC68N4nUZG6hLY1BITMJ2PeHqtbIDAxMQGTasCuCR0pLQU/Cud5EPBOAUXg54C874IiqqmpoVkgSQwoCJFUSiPxNrL1FGj2LcgVZZzgvjA2jsrKKuze/ZSaL5wfV+uaQ1IbRONbc0BCLAsxV+S6qZv4ZnQUZlERXnypXc3qndbzndtSCvw8VvmnSGXVz83NIxIpUbN8l+uJZALw7+SFHXBzpXF/B2RlyMr+Y34exUS1cpbvzDnH8hjzqgXhR8Xw2Oxyg/w0T4YDgSI1u1slHcOreBnbZAqYfV91TcDyISE5qqurCfo5+l3Asbx8W73bN4T4gG88yXL0+zrARMiJlOXNW2fHIe8UsfzRuvp9HQj//ApmjDL8cGXGidahUWv9N59cV6KaD3OQon1pSz3b59h62Jad+4d3VpH+2QIpEGFwI4KiyJqjiPhdDyB83w7yIZF1S3QsTn2XVV0pCDOC5NoyOSZp2VCz2xKkc1IvxGqhGuBKdFNXj8StuKuqFg/t6cuq5DQ5xzF+Zhea2i/i+9jLqNn3AdZWfoMZrsDSzGX8dPawuhm2EqnGyujO74BlV7ghnF6gpbH6+yVc/ORJpJN/Qw/ei7rnvsTkt6dhOFzBrX/UfPnTvRCBEuw6+DUEs6g/cAmVrVamx1rvkIV7geH2Aq5arCVkbkN45MBnWL51CQvXYmTMcCqfOWeY6gnuea508IK9YKMDEgFdZIqIEKdKSOGBx/tUhU+OdtH9D9JP8LitQNhGHm2NIhC5H4u/fgEzEKDgxTrkPtF7OiD3CcPNVZqgT+Kebc0orqjHL7H9FCXxRCCMZDzuRGuruH72WSrYINmkn+dmQN2SXL2b7gW6REBdQYI1XI3y2na1vmPf55k914b3qNkgNOQwgxFi0KCKemMr3zQT2iSkm5qqRks2y9QCpkda6DWZ2cSI0cxwBNPnnlEr0+f2wwyFaV342GI2ubFCzQhY+fHqrXA2XpZ7Ne4A0SGbzBpzCDAPgzJb/4blLIYroelBkrvza/rPQxr6k+QGyVLGbpYDuvOfBgP/35CkIekw4dr9V4ABAJW/Dh2pIIbfAAAAAElFTkSuQmCC); \
} \
.bz_contenttype_application_pdf #attach_image_div { \
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTJJREFUeNq0V2tMXEUU/ubOvfsGGltUahCwKhhDICgKqIml1jYkxCDVEI0/jP5utWlif2p8xUQrvhq1QWtiQ6VQWiA+fvkgsSRoxVgTbNKEkCZQlmeVbQu7O54z9+6yu91dWEInmb1353HON+fxnblCKYVYE0KYfX19x+nZig1o4XC4u6WlpY1eI+nmtW7+iXVqef39/Wqj2sTEhOru7j5BcmUmAGbKmDv2cnbkTxiGsfoxhWBJ8b/RaBQ11VXo6elBa2srGhoa9tD7D+3t7U2Dg4NLqdtTAcQ1WpYLUhpZFSvThLFwGSrgI802iEgkqp9SSszNzaOoqAj19fU7TNP8hwDcTVPLaRWmNoOUswUydeGyUPBRB/K+6oIwrZW5BNAerwfB4LQGUVtbW9rb23uez7YmACYJk9k6nVBYJsKNDyetNR23sX+9Hg8CeYG4Jerq6kopyC8kgjAzW0BmjQGl5yV8R77G5c/fg4jFAccEtbKyMtCJObMc10R0TND/YvpLPsNCVgDSMWmWIEC0tBjm0FlIk6yxbK81SOH0zAyqq6t1z9Dca7DAKgDY12W3Q9DDIFeIpZW1i6EQ/ltcTFoeJQvdUVKC1bIgQX52F4ACzzzzG+S5UViTQaibNpGdoxmXc3qmPWhGC5BZtRXSdZ7zumGd+h7LX7bDfeA1GJSKq+3JCYBJFpCZussNs/MUVNU9wK5GKHKFdfAtyPx8SK8X0sPdA6m5xNR7WF5aPRldQKhjEXwd8/m9EK8fgvrlNCSb9uO3Ie7bCaPpGajtDU4hIPp/6AGgrka/J9acNQHQZJMOABEQjp2EuqsM4uQARHCGEupf4LmngG0lEEe/gfr5V+DJZuDDDohHHtQsmTMANlsSAH4n5WpyCtH3P4N84yBE3f1AfiBWWajTc/cOUApA/fEXRx7xg+CUWocFEl3A2eBxI/Lqu1B/j0K+8CyZmxRdW+Kam7xxiUzvdgENtbHw1ymbCYCRjYji3e1G+Pl9MKrvhZqehbX3RcjlMCQBTEvTPE4KdU9Yk5sLTDMxIMik5xAZuwj/d51QkbBtlQ1oWak44eYA/8AxyOKt9Bq1CedGAYj6vPaEmTJFyu1gNJgk1q0wJj8jgPJmug7W1mJ0eJh0ZVHEQZUuTTMtp2CsILnlJDcrAOWjSun3w1NYaNcCKqPq6lUtQGeFZUHwXYAYLzI762QoreOC5HLpqE9aT0woKCt0JSC5Wn5oYZUYoNO5KPIZgFoMoejSxfhU6HgX5ve+jK3jF5K2hLq6sXDgFb03cX1kfBxT2x/X1zekScWMNmYAFp3IcmJh6ubbMLe7Gb62p+GtrNRj83vaECy5EzOVNbDoArL5iyMwnao3dWsxgtsqMPdYE1x0apaXUxbwBjahWrbvkJ5AHsSlSXvulkL7WUDFZ8sWTbVLnxyG/2gHXNIW6aGCJKggscu4q1zT0M2I2YcOAN87b8J8gvidbjvy9xF7M1c6x7TCdNn7WCm1/LHzdk060YPIoQ+4uuUAgARajqAY1coff4I6MwQ1NAzXpgL76l5RTr61dD0Q+18CBr6FK2DXhmgVUTGZ3qDTGxx4Kd8Pa6qGDiHYkT5CxYVyWAT8wJUr9tj+fYgnYmcXcPhTuqjYeW7k5wFe7zqYkJEm5j+jb9xFH22BlXEee3SnzYjC2cNAKc30KXk9r0nlEf6fwh3XAaD6FiQSKoRS2PBGyll+0lDK1zE7t5T6ZgBi4xHoZKAbDMb4u4B1pwKwnI8GN25cu8a8xd+IrPt/AQYAntHxL2P1ZVwAAAAASUVORK5CYII=); \
} \
.bz_contenttype_application_vnd\.ms-excel #attach_image_div, \
.bz_contenttype_application_octet-stream #attach_image_div, \
.bz_contenttype_application_vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet #attach_image_div { \
    background-image: url(data:image/png;base64,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); \
} \
.bz_contenttype_application_msword #attach_image_div, \
.bz_contenttype_application_vnd\.openxmlformats-officedocument\.wordprocessingml\.document #attach_image_div { \
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABaJJREFUeNq0V2tsFFUU/mbmzj7aZWl5mUqgtS0UaQHFgG0JIlEJNgZTqomPBEloRIwxIRr/aeIDEx8EokaJhF9GYkKXhlYxoFEiPwxoELQg4FZBaYAWWJa0W2e7M+M5d2a67WZfVbxwOzv3cR7f+c65dxTbtuE1RVFEV1fXZ/Rsw01oqVSqo7W19TH6aWabl7r5j9epTeru7rZvVrt48aLd0dGxh+RquQwQGWN+78ex4yegquqEvbYsC4vvWIRIJIK2tjY0Nzc/Qr8PbN++veXw4cPJzPWZBoxq1HUfNG3iBpimJZ+apiEWu46Kigo0NTXdJ4Q4QwbMpamRrAozm0rKGQGvszGChOqiUE+LDAQDGBi4Io1YsmRJVWdn51n2LR8C6QlXsfRGAQyi0Zn+YahKAeIRAnV1kOuCgYAc85BobGysIpL3rlmzpsZDQuRGQJMGKCRoJGVj3e4oTl5KYGzWZCcW0H4BeG5RNchjziw3NKbkBL3PotcS6vG8Bmge9CTg1NUhqTzx0WrKVa0ACzSI9k588MRazKtfmGuRv2AI0hxQJKGkH4q/KCIK2nPlch8GjXT6WwRNdWUlCmXBGAScEGhsAD19QkF40z4ZkiEjhdSuNhw/H8eyN78h4cDBF5fjgXe/Q4lPIKAzGXXopjouPbM6mhMBYrREQVNlHE3ScuyVFdCJkQ8vninXrNt1FOWlPoQCAsvnTsOtZUE0Vk+B7SE4tgttYgYIQkBzOyPBDiSJ4ewtG/Hxod9xOf63RMhH74/vOIr+GwY+3bgUyRFzdK/XWV5WPTlD4HrOCtgAKtbEA0WGoC+WwLaDUTnHrOcQfXXqEl5fWy8RSZGVzBtNs8fX/QmFQB1fiNzDSvZzVxKIJZLYcM9tpMyCScLnV4SxedUcR5nrQDYZRRugZYTAsUD+l15XlAWwflkVkikLCWL7J08vzbnf6xMKgUc+VXW645qC4aQJg2LMrB8ixYOUEW89ugCVU0vSxzp3l3yFQpC3EHkcYMWcx2zIT6/eL+cN8pyBOfHaKsoQC8f/jEslnIKOBaqU8e8NEOmpZfOm46mm2Wh4+WsoBc4C1rNheRUTRpbzgkUrHwKjRcS0sWP9ndTvKv5eYKbGySjagIBwoBJC/KfrmKqJrAz35Oc04JmDYdTH/8LP3/eSECfP03fG4g3I3McoLmyqwckj4fwGBGmkVFdRGvbBJtIZIxYmlwhcT6QkKbnq8QnJuc+VkRWxXTpfWLgw0T+Djm8u3eWlAnHa5+dLCi1kuUFRFAdIql+XTI9uacJZuohMDQmUUc1v3dkjLyZ1M4Lo2rgAvw0MY870IJ7fE8WB09cQJCX7NtSjhsaiNFdLz6XvHMNQ0nRLVJEkJJfoLu1gvuLDX8gLBZuaKxBpb0DlGz9iLz03RaLYfyqGlvnleG9tDSJbYvi8vR691wys3NEjzwzVRY3lFV8JyVDLr8H2OZv8pTpCk/x4/4d+KTQQ0ul+qOCL3hsIhf3yyeMGhWHOtCA2f3kekyiEJSEfArRXJeRskpcFgDwI0LkOxT3D/SSAPJjsGlQedi8mFCbIMWV0nYOecJin5GBl4bOAqKQL2bkNU1WL0/5tq2fjTMxAn2HJE69lXrkc52eKPzLI0ySNb31wthwfJAsSTFi6CziyiuQAL7NV9zpM7dCTtagt86E3PoIXvu1DCcG5bv8F7H5oFn6leN8+xY+WyB9yvLXzHLaunIkLz84nY5OoK/eheudpyYNsGCgZ34YzGl46dLnh7lqywJKXEMO0ZWpJuJhQfDiRXTQs0zBEIRhMWm56Ql5YkjRpuflJJ4oksOKeDz1Houh5+95b6K0/26cZSR4ZoEXTYRdRbMZ6Ukx1Uhz5+RCYTA86STC1WJkTbKzsKvVz/F3AujMN0N2PBj/+v2ZQT/CXEev+R4ABALfYV2x8zufOAAAAAElFTkSuQmCC); \
} \
.bz_contenttype_image_jpeg #attach_image_div { \
    background-image: url(data:image/png;base64,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); \
} \
.bz_contenttype_image_png #attach_image_div { \
    background-image: url(data:image/png;base64,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); \
}");
