// ==UserScript==
// @name           Kindle图书馆管理
// @version        1.0
// @author         liuyi_beta<liuyimwmd@gmail.com>
// @description    批量删除亚马逊中国中的Kindle个人文档（根据这个脚本http://userscripts.org/scripts/source/130289.user.js做了一些更改，原脚本只支持亚马逊美国，非常感谢原作者hitsmaxft<mfthits@gmail.com>）
// @grant          none
// @run-at         document-end
// @include        https://www.amazon.cn/*
// ==/UserScript==


(function(){

if (!/digital\/fiona\/manage/.test(window.location.href)) {
    //console.log("not kindle library")
    return 
}


var addBatchHandler = function(){
    var addCheckBox = function () {

//now display items up to 10k
window.ykl.displaySize=10000;
        var classTr = "rowHeaderCollapsed";
        var trs = document.getElementsByClassName(classTr);
        var metaBox = document.createElement('input');
        metaBox.type="checkbox";
        metaBox.className = "removeCheckBox";
        metaBox.style.margin="0";
        for(var index =0 ; index<trs.length; index++ ){
            var curTr =trs[index] ;
            var firstTD = curTr.getElementsByTagName('td')[0];
            if (firstTD.getElementsByTagName("input").length == 0 ) {
                var newBox = metaBox.cloneNode(true);
                var rowIndex = /Row([0-9]+)/.exec(curTr.id)[1];
                newBox.id = "idChecked" +rowIndex
                newBox.setAttribute("number", rowIndex)
                firstTD.appendChild(newBox)
            }
        }
    }
    var mklToolkit=jQuery("<div id=\"mklToolkit\"></div>")

    var idMonitor = function () { }
    //add link in personal document library
    var metalink = document.createElement('a');
    var relink = document.createElement('a');
    var ckAll,invckAll, sendAll;
    metalink.setAttribute('href', 'javascript:void(0);');
    metalink.style.marginLeft="10px";
    metalink.style.marginRight="10px";
    var rmlink = metalink.cloneNode(true);

    rmlink.style.color="red";
    jQuery(rmlink).text("删除选择的条目!");
    var DoRemove = function(){
        var a=document.getElementsByClassName('rowBodyCollapsed');
        for(var i =0; i < a.length; i++) {
            rowIndex = /Row([0-9]+)/.exec(a[i].id)[1];
            if ( document.getElementById("idChecked"+rowIndex).checked != false ){
                Fion.deleteItem('deleteItem_'+a[i].getAttribute('asin'));
                //Fion.deleteItem('deleteItem_'+a[i].getAttribute('asin'));
                //console.log('deleteItem_'+a[i].getAttribute('asin'))
            }
        };
        return;
    }
    rmlink.onclick = function(){
        if(confirm('remove all items in list?')){
            DoRemove();
        } else {
            return;
        }
    };
    ckAll = metalink.cloneNode(true);
    jQuery(ckAll).text("全选/取消选择");
    ckAll.id="mkl_ckall"
    ckAll.onclick = function(){
            var cbs = jQuery(".removeCheckBox")
            cbs.attr("checked", !(cbs.filter(":checked").length>0))
        }

    invckAll = metalink.cloneNode(true);
    jQuery(invckAll).text("反选");
    invckAll.id="mkl_invall"
    invckAll.onclick = function(){
        var cbs = document.getElementsByClassName("removeCheckBox");
        for(var i = 0 ; i< cbs.length; ++i ){
            cbs[i].checked=!cbs[i].checked;
        }
    }
	
    //device list for document deliveraty
    var deviceLists = jQuery("<select id=\"sendDevicesList\"></select>")
    var selections = jQuery("<span class=\"filters\">选择设备:</span>")

    jQuery(yourDevices.ownedDeviceList)
        .filter(
            function(index){ return (this.emailAddress.length>0) }
        ).each(
        function(){
            deviceLists.append(
                jQuery(
                    [
                        "<option value=\"",
                        this.accountID,
                        "\">",
                        this.name,
                        "</option>"
                    ].join("")
                )
            );
        })
    selections.append(deviceLists);
    sendAll = jQuery(metalink.cloneNode(true)).click(
        function(){
            var contentName, deviceName, messageId, kindleName
            var curOption = jQuery("#mklToolkit option:selected")
            deviceName = curOption.attr("value")
            kindleName = curOption.text()
            //message_id="kindle_pdoc"
            jQuery(".removeCheckBox").filter(':checked').each(function(){
                    contentName = jQuery("[id='Row" + this.getAttribute("number") + " expand']").attr("asin");
                    messageId ="singleItemSend" + "_" + contentName

                    //text notification start
                    var sendingBoxId = "singleItemSend_" + contentName;
                    var sendingBox = document.getElementById(sendingBoxId);
                    sendingBox.innerHTML = mykJS.kindle_myk_popover_sending_60987; //"Sending..."
                    Fion.showActionMsgRow(sendingBoxId);
                    sendingBox.style.display = "block";
                    //text notification continue
                    console.log(contentName, deviceName, messageId, kindleName)
                    try{
                        Fion.sendToDevice(contentName, deviceName, messageId, kindleName)
                    } catch (e) {
                        sendingBox.innerHTML = e;
                    }
                })
        }
    ).text("发送").attr("href", "javascript:void(0)")

    //append handle element into page content
    div_title = document.getElementById('orders-div')
    ;[
        rmlink, ckAll, invckAll,
        selections, sendAll
    ].forEach(
        function(obj){
            mklToolkit.append(obj)
        }
    )

    div_title.insertBefore( mklToolkit[0], div_title.getElementsByTagName('h2')[0].nextSibling )
    window.setInterval(addCheckBox,2000)
}

function contentEval(source) {
    //util function, eval script in current page source
    var Eval = arguments[1] || false  
    var Timeout = arguments[2] || 0
    if ('function' == typeof source && Eval) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script')
    script.setAttribute("type", "application/javascript")
    script.textContent = source
    window.setTimeout(function(){
            document.body.appendChild(script);
            document.body.removeChild(script);
        },Timeout)
}

contentEval(addBatchHandler, true , 4000)
//jQuery("#ordersList").ready(function(){contentEval(addBatchHandler, true , 4000)})
})()