// ==UserScript==
//
// @id              www.amazon.com-b556bb6f-ee56-4bea-b588-998dc5bb4777@scriptish
//
// @namespace      http://userscript.org/~hitsmaxft
//
// @name           Kindle Library Powerpack
//
// @version        2.7.3
//
// @author         hitsmaxft <mfthits#gmail.com>
//
// @description    tweaks for  Amazon kindle's personal documents library
//
// @run-at         document-end
//
// @include        https://www.amazon.com/gp/digital/fiona/*
// @include        https://www.amazon.cn/gp/digital/fiona/*
//
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant unsafeWindow

// @require http://sizzlemctwizzle.com/130289.js?show
//
//
// ==/UserScript==
//
// *changelog*
//
// 2014-03-09
// 
// add auto update
// 
// 2014-03-08
//
//   * refactory! 代码重构
//   * quick loading 启动加速
//
// 2012-08-11
//
//   * send to device supported 支持发送到指定设备
//
// 2013-06-01
// 
//   * refactory
//   * disable page freshing
//   * documents by docco
//
// *todo list*
//
// * issue: lower performance
// * issue: buggy delete hook(NEW)

//Content Script
//----
//

(
    function(isUserScript) {

        //contentscript for userscript
        var contentScript = function() {
            

            var KLP = function() {
                this._construct = function () {
                    this.id="Kindle Library Powerpack"
                    this.lang = "en"
                    if (/www\.amazon\.cn/.exec(window.location.href) !== null ) {
                        this.lang = "zh"
                    }

                    this._getText = {
                        "zh": {
                            "remove_item" : "删除"
                        , "check_all" : "全选/清空"
                        , "check_inverse" : "反选"
                        , "device_send" : "发送"
                        , "device_list":"所有kindle设备"
                        , "device_list":"所有kindle设备"
                        , "delete_notif":"确定要删除选中的文档?"
                        },
                        "en": {
                            "remove_item" : "delete"
                        , "check_all" : "check/uncheck all"
                        , "check_inverse" : "inverse"
                        , "device_send" : "send to device"
                        , "device_list":"kindle devices"
                        , "delete_notif":"remove all checked items?"
                        }
                    }

                    this._mklToolkit = jQuery("<div id=\"mklToolkit\"></div>")

                }
                this._construct();
            }

            KLP.prototype.getText = function (section) {
                return this._getText[this.lang][section]
            }

            // buffer buttons, add into page with this.hookUI
            KLP.prototype.addButton = function (buttons) {
                if (! buttons.length ) {
                    return false;
                }

                buttons.forEach(
                    (function(obj) {
                        this._mklToolkit.append(obj)
                    }).bind(this)
                )

            }

            //finish ui change
            KLP.prototype.hookUI = function () {
                var div_title = document.getElementById('orders-div')
                div_title.insertBefore(this._mklToolkit[0], div_title.getElementsByTagName('h2')[0].nextSibling)
            }

            //change default behaviour of removing items;
            KLP.prototype.hookDeleteHandler= function () {
                eval("window.Fion.deleteItem =" + window.Fion.deleteItem.toString().replace(
                    'window.location.reload();',
                    'console.log("deleted "+ contentName); window.myFlushTable(contentName)') + ";")

                    window.doMyFlush = 0;
                    //Utils
                    //------

                    //Hook default action on deleting items
                    window.myFlushTable = function(name) {
                        name = name.split('_')[1]
                        for (var key in itemCache.theData) {
                            if (itemCache.theData[key].asin == name) {
                                itemCache.theData.splice(key, 1)
                                console.log("remove item from cache ")
                            }
                        }
                        if (parseInt(window.doMyFlush) < 1) {
                            console.log("repage");
                            pageList.init()
                            pageList.gotopage(1)
                        } else {
                            window.doMyFlush = window.doMyFlush - 1;
                            console.log("reduce doMyFlush");
                        }
                    }

            }

            //extra functions
            KLP.prototype.hookAddCheckbox = function () {
                var classTr = "rowHeaderCollapsed";
                var metaBox = document.createElement('input');
                metaBox.type = "checkbox";
                metaBox.className = "removeCheckBox";
                metaBox.style.margin = "0";

                //Check and add checkbox for each item
                //20 items in a time
                window.setInterval(
                    function() {
                    var trs = document.getElementsByClassName(classTr);
                    var length = trs.length
                    for (var index = 0; index <length ; index++) {
                        var curTr = trs[index];
                        var firstTD = curTr.getElementsByTagName('td')[0];
                        if (firstTD.getElementsByTagName("input").length == 0) {
                            var newBox = metaBox.cloneNode(true);
                            var rowIndex = /Row([0-9]+)/.exec(curTr.id)[1];
                            newBox.id = "idChecked" + rowIndex
                            newBox.setAttribute("number", rowIndex)
                            firstTD.appendChild(newBox)
                        }
                    }
                }, 200)
            }

            KLP.prototype.hookDeviceList = function () {
            }

            KLP.prototype.hookButtons = function () {
                //Batch deleting checked items
                var DoRemove = function() {
                    var a = document.getElementsByClassName('rowBodyCollapsed');
                    var ditem = []
                    for (var i = 0; i < a.length; i++) {
                        rowIndex = /Row([0-9]+)/.exec(a[i].id)[1];
                        var item = document.getElementById("idChecked" + rowIndex)
                        if (item && item.checked != false) {

                            ditem.push(a[i].getAttribute('asin'))
                        }
                    };
                    if (ditem.length > 0) {
                        window.doMyFlush = ditem.length - 1;
                        for (var i in ditem) {
                            Fion.deleteItem('deleteItem_' + ditem[i]);
                        }
                    }
                }

                //Main Process
                //----


                //add link in personal document library
                var metalink = document.createElement('a');
                var relink = document.createElement('a');
                var ckAll, invckAll, sendAll;
                metalink.setAttribute('href', 'javascript:void(0);');
                metalink.style.marginLeft = "10px";
                metalink.style.marginRight = "10px";
                var rmlink = metalink.cloneNode(true);

                rmlink.style.color = "red";
                rmlink.textContent = this.getText("remove_item")
                var notification_text = this.getText("delete_notif")

                rmlink.onclick = function() {
                    if (confirm(notification_text)) {
                        DoRemove();
                    } else {
                        return;
                    }
                };
                ckAll = metalink.cloneNode(true);
                ckAll.textContent = this.getText("check_all")
                ckAll.id = "mkl_ckall"
                ckAll.onclick = function() {
                    var cbs = jQuery(".removeCheckBox")
                    cbs.attr("checked", !(cbs.filter(":checked").length > 0))
                }

                invckAll = metalink.cloneNode(true);
                invckAll.textContent = this.getText("check_inverse");
                invckAll.id = "mkl_invall"
                invckAll.onclick = function() {
                    var cbs = document.getElementsByClassName("removeCheckBox");
                    for (var i = 0; i < cbs.length; ++i) {
                        cbs[i].checked = !cbs[i].checked;
                    }
                }

                //device list for document deliveraty
                var deviceLists = jQuery("<select id=\"sendDevicesList\"></select>")
                var selections = jQuery("<span class=\"filters\">"+this.getText("device_list") + ":</span>")

                jQuery(yourDevices.ownedDeviceList)
                .filter(function(index) {
                    return (this.emailAddress.length > 0)
                }).each(function() {
                    deviceLists.append(
                        jQuery([
                               "<option value=\"",
                               this.accountID,
                               "\">",
                               this.name,
                               "</option>"
                    ].join(""))
                    );
                })
                selections.append(deviceLists);
                sendAll = jQuery(metalink.cloneNode(true)).click(function() {
                    var contentName, deviceName, messageId, kindleName
                    var curOption = jQuery("#mklToolkit option:selected")
                    deviceName = curOption.attr("value")
                    kindleName = curOption.text()
                    //message_id="kindle_pdoc"
                    jQuery(".removeCheckBox").filter(':checked').each(function() {
                        contentName = jQuery("[id='Row" + this.getAttribute("number") + " expand']").attr("asin");
                        messageId = "singleItemSend" + "_" + contentName

                        //text notification start
                        var sendingBoxId = "singleItemSend_" + contentName;
                        var sendingBox = document.getElementById(sendingBoxId);
                        sendingBox.innerHTML = mykJS.kindle_myk_popover_sending_60987; //"Sending..."
                        Fion.showActionMsgRow(sendingBoxId);
                        sendingBox.style.display = "block";
                        //text notification continue
                        console.log(contentName, deviceName, messageId, kindleName)
                        try {
                            Fion.sendToDevice(contentName, deviceName, messageId, kindleName)
                        } catch (e) {
                            sendingBox.innerHTML = e;
                        }
                    })
                }).text(this.getText("device_send")).attr("href", "javascript:void(0)")

                this.addButton([
                    rmlink, ckAll, invckAll,
                    selections, sendAll
                ])
            }

            KLP.prototype.init = function () {
                this.hookDeviceList();
                this.hookAddCheckbox();
                this.hookButtons();
                //finish ui rendering
                this.hookUI();
            }

            var _kpl = new KLP();

            _kpl.init();

            //globals, make effections on default actions
            //items in list up to 200
            window.ykl.displaySize = 100;
            window.pageList.pageSize = 100;


            //Refresh list
            pageList.gotopage(1)
        }

        //Content Script Utils
        //------
        
        

        //insert content scripts
        function contentEval(source, eval, timeout) {
            //util function, eval script in current page source
            var Eval = eval || false
            var Timeout = timeout || 0
            if ('function' == typeof source && Eval) {
                source = '(' + source + ')();'
            }
            var script = document.createElement("script")
            script.setAttribute("type", "application/javascript")
            script.textContent = source
            script.id = "KindleLPP"
            document.body.appendChild(script);
            document.body.removeChild(script);
        }
 
        //Execute script content
        function my_wait() {
            if( document.getElementById("orderListBody").children.length <=2 ) {
                window.setTimeout(my_wait, 100);
            } else {
                //main();
                contentEval(contentScript, true, 0)
            }
        }
        my_wait();


})(true)
//with js-beautify(sourcecode beautify) and docco (html document) from npm
// vim:ft=javascript:et:sts=4
