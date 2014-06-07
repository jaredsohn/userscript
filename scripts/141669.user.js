// ==UserScript==
// @name        BTN Bulk Buy Stamps
// @namespace   BTNBulkBuyStamps
// @author 		SchattenMann (https://broadcasthe.net/user.php?id=16568)
// @description Add the ability do bulk select Stamps to buy
// @include     http*://broadcasthe.net/bonus.php?action=stamps*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require     http://www.mredkj.com/javascript/NumberFormat154.js
// @version     1.7
// ==/UserScript==
(function () {

	function getUrlVars() {
	
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		 
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		 
		return vars;
		
	};

    var holder = jQuery('a:contains("Buy!")');

    function getURLParameter(name, url) {
        return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1]);
    };

    function toggleChecked(status) {
        var cb = jQuery("input[type='checkbox'][name='stamp_checkbox']").filter(":visible");

        cb.each(function () {
            jQuery(this).attr("checked", status);
        })
		
		getPrice();
		
    };

    function buy() {
        var cb = jQuery("input[type='checkbox'][name='stamp_checkbox']:checked");

        if (cb.length >= 0) {
            var r = confirm("Are you sure you want to buy " + cb.length + " Stamps?");
            if (r == true) {
                cb.each(function (key, value) {
                    jQuery.get('bonus.php?action=takestamps&item=' + jQuery(value).val());
                })
                alert(cb.length + ' Stamp(s) Bought');
            }
        } else {
            alert('No Stamps Selected');
        }

    };

    function getPrice() {
        var cb = jQuery("input[type='checkbox'][name='stamp_checkbox']:checked");
        if (cb.length >= 0) {
            var price = 0;
            var tmp;
            cb.each(function (key, value) {
                tmp = jQuery(value).parent().contents().filter(function () {
                    if (this.nodeType == 3 && jQuery.trim(this.data) != "") { //get only text nodes and filter out whitespace elements
                        return true;
                    }
                }).get(0).textContent;

                tmp = jQuery.trim(tmp).replace(' Points', '');
                tmp = jQuery.trim(tmp).replace(',', '');
                tmp = parseInt(tmp);
                price = price + tmp;
            });
			//format number
			var num = new NumberFormat();
			num.setInputDecimal(',');
			num.setNumber(price); // obj.value is '10000000'
			num.setPlaces('0', false);
			num.setCurrencyValue(' Points');
			num.setCurrency(true);
			num.setCurrencyPosition(num.RIGHT_INSIDE);
			num.setNegativeFormat(num.LEFT_DASH);
			num.setNegativeRed(true);
			num.setSeparators(true, '.', ',');
			
            jQuery('.selected_stamps_price').text('Price: ' + num.toFormatted());
			jQuery('.selected_stamps_num').text('Selected Stamps: ' + cb.length);
        }
    };

    function setSelNames() {
        
		var cb = jQuery("input[type='checkbox'][name='stamp_checkbox']");
        if (cb.length >= 0) {
            var price = 0;
            var names = new Array;
            cb.each(function (key, value) {
			
                var tmp = jQuery(value).parent().find('div').first().text();
                
                if (tmp == "") {
                    
                    tmp = jQuery(value).parent().find('a').first().text();
                    
                }
                
                names.push(tmp)
                
                tmp = "";
                
            });

        }
        
        names = jQuery.unique(names);
		
		//insert empty default value
		jQuery('.selNames').append('<option value="0">---</option>');
		
		jQuery.each(names, function(i, val) {
		
			jQuery('.selNames').append('<option value="'+(i+1)+'">'+val+'</option>');
		
		});
		
    };
	
	function filterStamps(val, filter) {
	
		var vars = getUrlVars();
		var category = vars['category'];
	
		if (val > 0) {
			
			if (category === 'show') {
			
				//displays the correct
				jQuery('.thin table a:not(:contains('+filter+'))').parent().css('display', 'none');
				
				//hides everything else
				jQuery('.thin table a:contains('+filter+')').parent().css('display', '');
			
			} else {
			
				//displays the correct
				jQuery('.thin table div:not(:contains('+filter+'))').parent().css('display', 'none');
				
				//hides everything else
				jQuery('.thin table div:contains('+filter+')').parent().css('display', '');
			
			}
		
		} else {
		
			if (category === 'show') {
		
				//display all
				jQuery('.thin table a').parent().css('display', '');
			
			} else {
			
				//display all
				jQuery('.thin table div').parent().css('display', '');
			
			}
		
		}
	
	}

    holder.each(function (key, value) {
        jQuery(value).before('<input style="margin-right:10px;"  type="checkbox" name="stamp_checkbox" value="' + getURLParameter('item', value.href) + '" id="stamp_' + getURLParameter('item', value.href) + '" />');
        document.getElementById('stamp_' + getURLParameter('item', value.href)).addEventListener("click", getPrice, true);
    });

    jQuery('.pad').after('<div class="stamps_info" style="height:100px; margin-bottom:15px;" ></div>');
	jQuery('.thin').append('<div class="box stamps_info" style="height:100px; margin-top:15px;" ></div>');
	
	jQuery('.stamps_info').append('<div style="margin:15px;float:left;width:100%;" class="select_options"><input type="checkbox" class="selectAll" > Select/Deselect All</div>');
    jQuery('.stamps_info').append('<div style="margin:15px;float:left;" class="total_stamps">Total Stamps: ' + holder.length + '</div>');
    jQuery('.stamps_info').append('<div style="margin:15px;float:left;" class="selected_stamps_num">Selected Stamps: 0</div>');
    jQuery('.stamps_info').append('<div style="margin:15px;float:left;" class="selected_stamps_price">Price: 0</div>');
	
	jQuery('.stamps_info:eq(0)').append('<div style="margin:15px;float:left;"><a href="#bottom"> To Bottom</a></div>');
	jQuery('.stamps_info:eq(1)').append('<div style="margin:15px;float:left;"><a href="#top"> To Top</a></div>');
	
	jQuery("a[href='#bottom']").click(function() {
		$("html, body").animate({ scrollTop: jQuery(document).height() }, "slow");
		return false;
	});
	
	jQuery("a[href='#top']").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

    jQuery('.stamps_info').append('<button style="margin:15px;float:right;" type="button" class="bulk_buy_stamps" >Buy!</button>');
    jQuery('.bulk_buy_stamps').bind("click", buy);

    //document.getElementById('selectAll').addEventListener("select", toggleChecked(this.checked), true);
    jQuery('.selectAll').click(function () {
        toggleChecked(this.checked);
    });
	
	
	jQuery('.select_options').append('<div style="margin-right:30px;float:right;">Filter: <select class="selNames"></select></div>');
	
	setSelNames();
	
	jQuery('.selNames').change(function () {
        filterStamps(jQuery(this).children("option").filter(":selected").val(), jQuery(this).children("option").filter(":selected").text());
    });

})();