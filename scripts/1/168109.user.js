// ==UserScript==
// @version        1
// @name           Breakdown
// @include        https://qbo.intuit.com*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @require        http://userscripts.org/scripts/source/85398.user.js
// ==/UserScript==



if (CJP.USER_EMAIL == "shaun@zencog.com") {
    title = $("title").html();
	href = document.location.href;
	if (title == "Estimate" || title == "Invoice"){
        if (document.nodeName == "#document" && (href.indexOf("/estimate/") != -1 || href.indexOf("/invoice/") != -1)) {
            if (href.indexOf("/estimate/new") !== -1)
                var estinvType = "noCustEst";
            else if (href.indexOf("/invoice/new") !== -1)
                var estinvType = "noCustInv";
            else if (href.indexOf("/estimate/withcust") !== -1)
           		var estinvType = "custEst";
            else if (href.indexOf("/invoice/editfromlist") !== -1)
            	var estinvType = "custInv";
            //alert("Est/Inv");
            if (estinvType == "noCustEst" || estinvType == "noCustInv")
            	$("#custtext").focus();
            else if ($("#departmenttext").val() == "")
                $("#departmenttext").focus();
            else
                $("#custom1").focus();
            
            var origLC = window.parent.QuickFill.prototype.listDblClick;
            eval(origLC.toString().replace('try{this.textEntry.focus()}catch(a){}', '').replace('this.completeText(this.selectList.selectedIndex,0);', ''));
            window.parent.QuickFill.prototype.listDblClick = QFPT_listDblClick;
            
            var origSF = window.parent.QF_setFields;
            eval(origSF.toString().replace('try{text.focus()}catch(e){}', '').replace('try{text.focus()}catch(e){}', '').replace('quickfillutil_HideLists', 'window.parent.quickfillutil_HideLists').replace('quickfillutil_fixFramePlacement', 'window.parent.quickfillutil_fixFramePlacement'));
            window.parent.QF_setFields = QF_setFields;    
            
            var t=setTimeout(function(){$(".taxCodeSelectTD img#downarrow").click(); $("#allTaxcoderatesSelect").val(2).click();},1000);
            $(document).keyup(function(e) {
                if (e.which === 110 && e.ctrlKey) {
                    var id = e.target.id;
                    e.preventDefault();
                    if (id == "custtext")
                        $("#custom1").focus();
                    else if (id == "custom1" || id.indexOf("chg_rate_") !== -1) {
                        row = (id == "custom1") ? 0 : parseInt(id.charAt(id.length-1));
                        nextRowId = $("#chgline_row_" + parseInt(row)).next().next().prop("id");
                        nextRow = (id == "custom1") ? 1 : nextRowId.charAt(nextRowId.length-1);
                        if ($("#chgline_row_" + nextRow).length == 0 || $("#chgline_row_" + nextRow).css("display") == "none")
                            $("#chgline_row_" + row + " .transactionRowInsert .insertIcon").click();
                        $("#chg_item_text_" + nextRow).focus();
                    }
                    else if (id.indexOf("chg_item_text_") !== -1) {
                        row = id.charAt(id.length-1);
                        $("#chg_desc_" + row).focus();
                    }
                    else if (id.indexOf("chg_desc_") !== -1) {
                        row = id.charAt(id.length-1);
                        $("#chg_qty_" + row).focus();
                    }
                    else if (id.indexOf("chg_qty_") !== -1) {
                        row = id.charAt(id.length-1);
                        //alert("qty_" + row);
                        $("#chg_rate_" + row).focus();
                    }
                    else {
                   	    if (estinvType == "noCustEst" || estinvType == "noCustInv")
                            $("#custtext").focus();
                        else
                            $("#custom1").focus();
                    }
            	}
            });
            allItems = $("#allItemsSelect").clone().children();
            $(allItems).each(function(){
                t = $(this).attr("t");
                v = $(this).val();
                $(this).attr("t", v);
                $(this).val(t);
            });
            wholeList = $("<datalist></datalist>").append(allItems);
            $("#allItemsSelect").remove();
            
            if ($("#helpInnerTableBlock").css("display") == "none")
                $("#helpShowInnerTable").click();
            $("input[id^='chg_item_text_']").on("focus", function(){
                p = $(this).position();
                if ($(window).scrollTop() + $(window).height() - (p.top + $(this).height()) < 425 && $(window).height() > 425 + $(this).height())
                    $(document).scrollTop(p.top + 425 + $(this).height() - $(window).height());
                $(this).attr("list", $(this).attr("id")).removeAttr("id");
                $(wholeList).attr("id", $(this).attr("list")).insertAfter("input[list='" + $(this).attr("list") + "']");
            });
            $("body").on("blur", "[list^='chg_item_text_']", function(){
                console.log("blur");
                $(this).attr("id", $(this).attr("list")).removeAttr("list").next().remove();
            });
            
            $("table.multipleItems .qfDownArrow").each(function(){
                this.onclick = function() {
                    $(this).prev().focus();
                };
            });
            
            
            //--------------------------LIMIT PAGE HEIGHT------------------------------------
            document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML + '<style>.rotate90 {-webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg);-ms-transform: rotate(-90deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);}</style>';
            
            $(".divContentHeader table:first").css("margin-bottom", "8px");
            $("td.contentInnerTD").css("padding", "0px 8px");
            $(".customerLabel").css("color", "#356cbe");
            var blueArrow = '<div style="padding-top: 4px; display: inline;"><img class="blueArrow rotate90" src="https://prod-qbo.intuitcdn.net/c22/v61.181/images/blue_down_arrow_1.gif"></div>';
            
            toggleArr = [];
            toggleArr.cust=[];
            toggleArr.cust.toggle = $(".salesTxnHeaderTable tr:first").attr("target", "cust");
            toggleArr.cust.toggle.children("td:nth-child(2)").attr("width", "").css({color: "rgb(53, 108, 190)", fontSize: "16px", fontWeight: "bold"}).prepend(blueArrow + $(".salesTxnHeaderTable tr:first td:first").get(0).innerHTML).prev().remove();
            toggleArr.cust.target = $(".salesAddrTable").parent().parent().hide();
            
            toggleArr.stat=[];
            toggleArr.stat.toggle = $(".divContentHeader legend:first").attr("target", "stat");
            toggleArr.stat.target = $(".divContentHeader table:first table:first").hide();
            toggleArr.stat.toggle.prepend(blueArrow).children(":first").append("&nbsp;");
            
            toggleArr.info=[];
            toggleArr.info.target = $("#salesMemoDepositTblID tr:first").wrap("<fieldset></fieldset>").css("padding-top", 0).hide();
            toggleArr.info.toggle = $("#salesMemoDepositTblID fieldset:first").css("border-spacing", 0).prepend('<legend style="font-size: 16px; font-weight: bold; color: rgb(53, 108, 190);">' + blueArrow + ' Additional Info</legend>').children(":first").attr("target", "info");
            toggleArr.info.toggle.parent().next().remove();
            
            $(toggleArr.cust.toggle).add(toggleArr.stat.toggle).add(toggleArr.info.toggle).css("cursor", "pointer").click(function(e){
                if ($(e.target).prop("tagName") != 'INPUT' && $(e.target).attr("class") != 'qfDownArrow') {
                    if ($(this).find("img:first").hasClass("rotate90")) {
                        $(this).find("img:first").removeClass("rotate90");
                        toggleArr[$(this).attr("target")].target.show();
                    }
                    else {
                        $(this).find("img:first").addClass("rotate90");
                        toggleArr[$(this).attr("target")].target.hide();
                    }
                }
            });
            $(".customFieldsTbl").remove();
            $('<td class="customFieldsLabelTD" nowrap="">Sales&nbsp;Rep<input id="custom1" type="text" name="custom1" maxlength="30" align="middle"></td>').insertAfter("#selectCustomerTD");
            $(".salesSpacerRow").remove();
            //--------------------------/LIMIT PAGE HEIGHT----------------------------------- 
   
        }
    }
    else if (document.nodeName == "#document" && href.indexOf("/lists/item/new") == -1 && href.indexOf("/item/new") != -1) {
        $("select#allAccountsSelect option:not(:contains(' Sales - ')):not(:contains(' CGS - '))").remove();
        alert($("select#allAccountsSelect option:not(:contains(' Sales - ')):not(:contains(' CGS - '))").length + " / " + $("select#allAccountsSelect option").length);
        var desc = $("#desc");
        desc.bind("propertychange keyup input paste", function(event){
            $("#purchase_desc").text($(this).val());
        });
        $("#TR_sales_acct img.qfDownArrow").mousedown(function() {
            alert($("select#allAccountsSelect option:not(:contains(' Sales - '))").length);
            $("select#allAccountsSelect option:not(:contains(' Sales - '))").css("display", "none");
            $("select#allAccountsSelect option:contains(' Sales - ')").css("display", "");
        });
        $("#TR_purchase_acct img.qfDownArrow").mousedown(function() {
            $("select#allAccountsSelect option:not(:contains(' CGS - '))").css("display", "none");
            $("select#allAccountsSelect option:contains(' CGS - ')").css("display", "");
        });        
        $("select#allAccountsSelect").click(function() {
            copyAcct($("#sales_acct_name"), $("#purchase_acct_name"));
        });
        $("#sales_acct_name").css("width", "250px").change(function () {
            copyAcct($("#sales_acct_name"), $("#purchase_acct_name"));
        });
        $("#purchase_acct_name").blur(function () {
            str = $("#purchase_acct_name").val();
            str.substring(str.indexOf("welcome"));
        });
        if ($("#is_purchase:not(:checked)").length == 1) {
            $("#is_purchase:not(:checked)").click();
            document.getElementById("TABLE_purchase").style.display="";
        }
    }
    else if (title == "Customer Center"){
        alert($("#dojox_grid__View_2 .dojoxGridRow").length);
        $(document).on("hover", "#dojox_grid__View_2 .dojoxGridRow", function() {
            lastAmt = $(this).find(".dojoxGridCell[idx=5] span").html();
        });
    }
}
function copyAcct(from, to){
    str = from.val();
    searchOpt = $("select#allAccountsSelect option:contains('CGS - " + str.substring(str.indexOf(" - ") + 3) + "')");
    if (searchOpt.length == 1)
        to.val(searchOpt.attr("t"));
}
function got(name, value) {
alert("hi");
alert('got global named ' + name + ' with value ' + value);
}

function GetSelectedText(){
  var userSelection, ta;
  if (window.getSelection && document.activeElement){
    if (document.activeElement.nodeName == "TEXTAREA" ||
        (document.activeElement.nodeName == "INPUT" &&
        document.activeElement.getAttribute("type").toLowerCase() == "text")){
      ta = document.activeElement;
      userSelection = ta.value.substring(ta.selectionStart, ta.selectionEnd);
    } else {
      userSelection = window.getSelection();
    }
    return userSelection.toString();
  } else {
    // all browsers, except IE before version 9
    if (document.getSelection){       
        userSelection = document.getSelection();
        return userSelection.toString();
    }
  }
}

$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}
function searchStringInArray(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].indexOf(str) == 0) return j;
    }
    return -1;
}
function searchStringInArray2(str, strArray) {
    for(var i in strArray) {
        if (i.indexOf(str) == 0) return i;
    }
    return -1;
}