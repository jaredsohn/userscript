// ==UserScript==
// @name        HV Trading Assistant For Auction
// @namespace   bluedust
// @include     http://hentaiverse.org/*
// @include     http://forums.e-hentai.org/index.php*
// @include     file:///C:/Users/某人/Desktop/a.html
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

(function($){
    GM_addStyle('\
        .bd_move {cursor: move;}\
        .bd_normalWindow {z-index: 900;}\
        .bd_modalWindow {z-index: 1000;}\
        .bd_window {background: #ffffff; box-shadow: -1px 1px 3px 3px #666; position: absolute; text-align: center; display: none;}\
        .bd_window .bd_title {height: 17px; line-height: 18px; font-weight: bold; padding: 5px 5px 0px 5px;}\
        .bd_window .bd_inner_box {margin: 5px; min-width: 30px; min-height: 30px; background: RGB(240,240,240); border: 1px solid RGB(152,152,152); padding: 5px;}\
        .bd_window .content_table {width: 100%; text-align: left;}\
        .bd_window .content_table tr{line-height: 18px;}\
        .bd_eqAdd, .bd_eqRemove, .bd_eqAuction {float: left; width: 20px; height: 20px; margin-left: 20px; cursor: pointer;}\
        .bd_toolbar_box .tool {width: 35px; height: 35px; display: block; margin-bottom: 4px; cursor: pointer;}\
        .bd_toolbar_box .splitter {width: 35px; height: 1px; border-top: 1px solid #ffffff;background: #aaaaaa; margin-top: 10px; margin-bottom: 7px;}\
        .bd_form_box input[type=text] {width: 100px;}\
        .bd_form_box input[type=button] {cursor: pointer;}\
        .bd_form_box .btn_box {padding-top: 10px;}\
        .bd_form_box .btn_box input {width: 70px; vertical-align:middle;}\
        .bd_form_box .btn_box input.cancel_btn {margin-left: 10px;}\
        .bd_window #aucMan_del {width: 23px; height: 23px; vertical-align:middle; margin-left: 5px; cursor: pointer;}\
        .bd_bookmarkHandler {cursor: pointer; text-decoration: underline;}\
    ');

    var Resource = new function (){
        this.icon_remove = 'data:image/png;base64,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';
        this.icon_addEq = 'data:image/png;base64,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';
        this.icon_addAuc = this.icon_addEq;
        this.icon_delAuc = 'data:image/png;base64,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';
        this.icon_manAuc = 'data:image/png;base64,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';
        this.icon_filter = 'data:image/png;base64,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';
        this.icon_auction = 'data:image/png;base64,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';
    }();

    function arrayRemoveByIndex(array, index){
        array.splice(index, 1);
        return array;
    }

    function arrayRemoveByObject(array, value){
        for(var key in array){
            if(array[key] === value){
                array.splice(key, 1);
                break;
            }
        }
    }

//    GM_addStyle('.bd_window {background: #ffffff; box-shadow: -1px 1px 3px 3px #666; position: absolute; z-index: 1000; text-align: center; display: none;}' +
//        '.bd_window .bd_title {height: 17px; line-height: 18px; font-weight: bold; cursor: move; padding-top: 5px;}' +
//        '.bd_window .bd_inner_box {margin: 5px; min-width: 170px; min-height: 50px; background: RGB(240,240,240); border: 1px solid RGB(152,152,152); padding: 5px;}');
    function Window(options){
        var _this = this;

        options = options || {};
        _this.mWindowId = options.id;
        _this.mTitle = options.title;
        _this.mModal = options.modal || options.modal;
        _this.mDrag = options.drag == undefined ? true : options.drag;
        _this.mContent = options.content || "";
        _this.mX = options.x || 0;
        _this.mY = options.y || 0;

        _this.mUI;
        _this.mTitleElement;
        _this.mInnerElement;
        _this.mMoveHandler;

        _this.dragOffsetX;
        _this.dragOffsetY;

        _this.mModalMask;

        _this.onEndDragListener = [];

        _this._isVisible = false;

        if(_this.mModal)_this.mDrag = false;

        this.setHandler = function(handlerElement){
            _this.mMoveHandler = handlerElement;
            _this.initDrag();
        };

        this.setX = function(x){
            _this.mUI.style.left = x + 'px';
        };

        this.setY = function(y){
            _this.mUI.style.top = y + 'px';
        };

        this.getUI = function(){
            return _this.mUI;
        };

        this.getTitle = function(){
            return _this.mTitle;
        };

        this.getElement = function(selector){
            return this.mInnerElement.querySelector(selector);
        }

        this.setTitle = function(title){
            _this.mTitle = title;

            if(_this.mTitleElement && _this.mTitle){
                _this.mTitleElement.innerHTML = _this.mTitle;
                _this.mTitleElement.style.display = 'block';
            }
        };

        this.setContent = function(content){
            _this.mContent = content;
            if(_this.mInnerElement)_this.mInnerElement.innerHTML = _this.mContent;
        };

        this.setCss = function(css){
            _this.css(_this.mUI, css);
        };

        this.setTitleCss = function(css){
            _this.css(_this.mTitleElement, css);
        }

        this.setInnerCss = function(css){
            _this.css(_this.mInnerElement, css);
        }

        this.addOnEndDragListener = function(listener){
            _this.onEndDragListener.push(listener);
        }

        this.show = function(params){
            if(_this._isVisible)return;

            if(_this.onShow(this, params) === false)return;

            _this.mUI.style.display = 'block';

            if(_this.mModal){
                _this.setCss({
                    position: 'fixed',
                    left: (document.documentElement.clientWidth - _this.mUI.clientWidth) / 2 + 'px',
                    top: (document.documentElement.clientHeight - _this.mUI.clientHeight) / 2 + 'px'
                });


                if(!_this.mModalMask){
                    _this.mModalMask = _this.getModalMask();
                };
                _this.mModalMask.style.display = 'block';
            }

            _this._isVisible = true;
        }

        this.hide = function(params){
            if(!_this._isVisible)return;

            if(_this.onHide(this, params) === false)return;

            _this.mUI.style.display = 'none';

            if(_this.mModal){
                _this.mModalMask.style.display = 'none';
            }
            _this._isVisible = false;
        }

        this.clearContent = function(){
            _this.mContent = '';
            if(_this.mInnerElement)_this.mInnerElement.innerHTML = '';
        }

        this.onShow = function(_this, params){};
        this.onHide = function(_this, params){};

        this.isVisible = function(){
            return _this._isVisible;
        }

        this.createModalMask = function(){
            var mask = document.createElement('div');
            mask.className = 'bd_modalMask';
            mask.setAttribute('id', 'bd_modalMask');
            _this.css(mask, {
                zIndex: 999,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: 'black',
                opacity: 0.5,
                top: '0px',
                left: '0px',
                display: 'none'
            });
            document.body.appendChild(mask);
            return mask
        }

        this.getModalMask = function(){
            return document.getElementById('bd_modalMask') || _this.createModalMask();
        }

        this.createUI = function(){
            var boxDiv = document.createElement('div');

            boxDiv.className = 'bd_window';
            if(_this.mModal){
                boxDiv.className += ' bd_modalWindow';
            }
            else{
                boxDiv.className += ' bd_normalWindow';
            }

            boxDiv.style.left = _this.mX + 'px';
            boxDiv.style.top = _this.mY + 'px';
            if(_this.mWindowId){
                boxDiv.setAttribute('id', _this.mWindowId);
            }

            var titleDiv = document.createElement('div');
            titleDiv.className = 'bd_title';
            if(_this.mTitle){
                titleDiv.innerHTML = _this.mTitle;
            }
            else{
                titleDiv.style.display = 'none';
            }
            _this.mTitleElement = titleDiv;
            boxDiv.appendChild(titleDiv);

            var innerDiv = document.createElement('div');
            innerDiv.className = 'bd_inner_box'
            innerDiv.innerHTML = _this.mContent;
            _this.mInnerElement = innerDiv;
            boxDiv.appendChild(innerDiv);

            document.body.appendChild(boxDiv);
            _this.mMoveHandler = titleDiv;
            _this.mUI = boxDiv;
        }

        this.initDrag = function(){
            _this.mTitleElement.className += ' bd_move';

            _this.mMoveHandler.addEventListener('mousedown', onStartDrag);
            _this.mMoveHandler.addEventListener('mouseup', function(event){
                onEndDrag();
            });

            function onStartDrag(event){
                _this.dragOffsetX =  event.clientX - parseInt(_this.mUI.offsetLeft);
                _this.dragOffsetY = event.clientY - parseInt(_this.mUI.offsetTop);

                document.addEventListener('mousemove', onDrag);
            }

            function onEndDrag(){
                document.removeEventListener('mousemove', onDrag);
                for(var key in _this.onEndDragListener){
                    _this.onEndDragListener[key](_this.mUI.style.left, _this.mUI.style.top);
                }
            }

            function onDrag(event){
                _this.mUI.style.left = (event.clientX - _this.dragOffsetX) + "px";
                _this.mUI.style.top = (event.clientY - _this.dragOffsetY) + "px";
            }
        }

        this.css = function(element, css){
            for(var key in css){
                element.style[key] = css[key];
            }
        }

        _this.createUI();
        if(_this.mDrag){
            _this.initDrag();
        }
    }

//    GM_addStyle(".bd_window .content_table {width: 100%; text-align: left;}" +
//        ".bd_window .content_table tr{line-height: 18px;}");
    function TextWindow(options){
        var _this = this;
        this.mTableElement;

        Window.call(this, options);

        this.initTable = function(){
            this.mInnerElement.innerHTML = '';
            this.mTableElement = document.createElement('table');
            this.mTableElement.className = 'content_table';
            this.mInnerElement.appendChild(this.mTableElement);
        }

        this.addItem = function(item){
            var tr = document.createElement('tr');
            tr.className = 'win_item';

            var labelTD = document.createElement('td');
            labelTD.className = 'lb';
            labelTD.innerHTML = item.label;
            if(item.labelStyle)this.css(labelTD, item.labelStyle);
            tr.appendChild(labelTD);

            if(item.value){
                var valueTD = document.createElement('td');
                valueTD.className = 'vl';
                valueTD.innerHTML = item.value;
                if(item.valueStyle)this.css(valueTD, item.valueStyle);
                tr.appendChild(valueTD);
            }
            else{
                labelTD.setAttribute('colspan','2');
            }

            this.mTableElement.appendChild(tr);
        }

        this.clearContent = function(){
            this.mTableElement.innerHTML = '';
        }

        this.initTable();
    }

    function FormWindow(options){
        var _this = this;
        var submitBtn;
        var cancelBtn;

        this.mTableElement;
        options.submitName = options.submitName || 'Submit';
        options.cancelName = options.cancelName || 'Cancel';
        options.enableSubmit = options.enableSubmit == undefined ? true : options.enableSubmit;
        options.enableCancel = options.enableCancel == undefined ? true : options.enableCancel;

        Window.call(this, options);
        this.mInnerElement.className += ' bd_form_box';

        this.initTable = function(){
            this.mInnerElement.innerHTML = '';
            this.mTableElement = document.createElement('table');
            this.mTableElement.className = 'content_table';
            this.mInnerElement.appendChild(this.mTableElement);

            var btnBox;
            if(options.enableCancel || options.enableSubmit){
                btnBox = document.createElement('div');
                btnBox.className = 'btn_box';
                this.mInnerElement.appendChild(btnBox);
            }

            if(options.enableSubmit){
                submitBtn = document.createElement('input');
                submitBtn.setAttribute('type', 'button');
                submitBtn.className = 'submit_btn';
                submitBtn.value = options.submitName;
                btnBox.appendChild(submitBtn);
                submitBtn.addEventListener('click', function(){
                    _this.onSubmit(_this);
                });
            }

            if(options.enableCancel){
                cancelBtn = document.createElement('input');
                cancelBtn.setAttribute('type', 'button');
                cancelBtn.className = 'cancel_btn';
                cancelBtn.value = options.cancelName;
                btnBox.appendChild(cancelBtn);
                cancelBtn.addEventListener('click', function(){
                    _this.onCancel(_this);
                });
            }
        }

        this.onSubmit = function(_this){}

        this.onCancel = function(_this){
            _this.hide();
        }

        /**
         * {
         *      id:
         *      label:
         *      style:
         *  }
         * @param options
         */
        this.addText = function(options){
            var tr = document.createElement('tr');
            tr.className = 'win_item';

            if(options.label){
                var labelTD = document.createElement('td');
                labelTD.className = 'lb';
                labelTD.innerHTML = options.label;
                if(options.labelStyle)this.css(labelTD, options.labelStyle);
                tr.appendChild(labelTD);
            }


            var valueTD = document.createElement('td');
            valueTD.className = 'vl';

            var span = document.createElement('span');
            span.innerHTML = options.text || '';
            if(options.textStyle)this.css(span, options.textStyle);
            if(options.id)span.setAttribute('id', options.id);
            valueTD.appendChild(span);
            tr.appendChild(valueTD);

            if(!options.label){
                valueTD.setAttribute('colspan', 2);
            }

            this.mTableElement.appendChild(tr);
            return span;
        }

        /**
         *  {
         *      label:
         *      labelStyle:
         *      inputStyle:
         *      id:
         *      name:
         *      type:
         *  }
         * @param input
         */
        this.addSimpleInput = function(input){
            input.type = input.type || 'text';

            var tr = document.createElement('tr');
            tr.className = 'win_item';

            var labelTD = document.createElement('td');
            labelTD.className = 'lb';
            labelTD.innerHTML = input.label;
            if(input.labelStyle)this.css(labelTD, input.labelStyle);
            tr.appendChild(labelTD);

            var valueTD = document.createElement('td');
            valueTD.className = 'vl';
            valueTD.innerHTML = '<input type="'+input.type+'">';

            var inputElement = valueTD.querySelector('input');
            if(input.inputStyle)this.css(inputElement, input.inputStyle);
            if(input.value)inputElement.value = input.value;
            if(input.id)inputElement.setAttribute('id', input.id);
            if(input.name)inputElement.setAttribute('name', input.name);
            tr.appendChild(valueTD);

            this.mTableElement.appendChild(tr);
            return inputElement;
        }

        /**
         *  {
         *   label: 'lable',
         *   inputHtml: 'html'
         *  }
         */
        this.addInput = function(input){
            var tr = document.createElement('tr');
            tr.className = 'win_item';

            var labelTD = document.createElement('td');
            labelTD.className = 'lb';
            labelTD.innerHTML = input.label;
            if(input.labelStyle)this.css(labelTD, input.labelStyle);
            tr.appendChild(labelTD);

            var valueTD = document.createElement('td');
            valueTD.className = 'vl';
            valueTD.innerHTML = input.inputHtml;
            tr.appendChild(valueTD);

            this.mTableElement.appendChild(tr);
            return valueTD.querySelector('input');
        }

        this.getInputValue = function(selector){
            var input = this.mInnerElement.querySelector(selector);
            if(input) return input.value;
            return null;
        }

        this.reset = function(){
            var inputs = this.mTableElement.querySelectorAll('input');
            for(var key = 0; key < inputs.length; key++ ){
                if(inputs[key].getAttribute('type') == 'text' || inputs[key].getAttribute('type') == 'password')inputs[key].value = '';
            }
        }

        this.clearContent = function(){
            this.mTableElement.innerHTML = "";
        }

        this.initTable();
    }

    function Toolbar(options){
        var _this = this;

        Window.call(this, options);
        this.mInnerElement.className += ' bd_toolbar_box';
        this.mModal = false;
        this.setCss({
            zIndex: 900
        });

        this.addTool = function(icon, name, func){
            var tool = $('<img src="'+icon+'" title="'+name+'" class="tool" />');
            $(this.mInnerElement).append(tool);
            if(func)tool.click(func);
            return tool[0];
        }

        this.addSplitter = function(){
            var tool = $('<div class="splitter"></div>');
            $(this.mInnerElement).append(tool);
        }

        this.addOtherTool = function(html, name, func){
            var otherTool = $('<div title='+name+'>'+html+'</div>');
            $(this.mInnerElement).append(otherTool);
            if(func)otherTool.click(func);
            return otherTool[0];
        }
    }

    /**---------------------------------------------------------------------------------------------------**/
    /**---------------------------------------------------------------------------------------------------**/

    function Equipment(obj){
        this.name = obj.name;
        this.type = obj.type;
        this.seller = obj.seller || '';
        this.auctionId = obj.auctionId;
        this.equipmentId = obj.equipmentId;
        this.number = obj.number;
        this.key = obj.key;

        this.lastBid = 0;
        this.lastBidder = 'nobody';

        this.export = function(){
            return {
                name: this.name,
                type: this.type,
                seller: this.seller,
                auctionId: this.auctionId,
                equipmentId: this.equipmentId,
                number: this.number,
                key: this.key,
                lastBid: this.lastBid,
                lastBidder: this.lastBidder
            }
        }

        this.import = function(obj){
            this.name = obj.name;
            this.type = obj.type;
            this.seller = obj.seller;
            this.auctionId = obj.auctionId;
            this.equipmentId = obj.equipmentId;
            this.number = obj.number;
            this.key = obj.key;
            this.lastBid = obj.lastBid;
            this.lastBidder = obj.lastBidder;
        }

        this.bid = function(bid, bidder, force){
            bid = parseInt(bid, 10)
            if(!force && (bid <= this.lastBid || bidder == this.lastBidder)){
                return false;
            }

            this.lastBid = bid;
            this.lastBidder = bidder;
            return true;
        }
    }

    function Auction(obj){
        var equipments = [];
        var equipmentMap = {};
        var equipmentNumberMap = {};

        var bindForumsId = null;
        var bindForumsBookmark = null;
        var bookmarkPosition = 1;

        this.id = obj.id;
        this.status = 'collection';
        this.color =  obj.color || null;
        this.background = obj.background || null;

        this.export = function(){
            return {
                bindForumsId: bindForumsId,
                bindForumsBookmark: bindForumsBookmark,
                bookmarkPosition: bookmarkPosition,

                id: this.id,
                status: this.status,
                color: this.color,
                background: this.background
            }
        }

        this.import = function(obj){
            equipments = [];
            equipmentMap = {};
            equipmentNumberMap = {};

            bindForumsId = obj.bindForumsId;
            bindForumsBookmark = obj.bindForumsBookmark;
            bookmarkPosition = obj.bookmarkPosition;

            this.id = obj.id;
            this.status = obj.status;
            this.color = obj.color;
            this.background = obj.background;
        }

        this.addEquipment = function(eq){
            if(eq.number){
                if(equipmentNumberMap[eq.number])return false;
            }
            equipments.push(eq);
            equipmentNumberMap[eq.number] = eq;
            equipmentMap[eq.equipmentId] = eq;
            return true;
        }

        this.getEquipment = function(eqId){
            return equipmentMap[eqId] || null;
        }

        this.getEquipmentByNumber = function(number){
            return equipmentNumberMap[number] || null;
        }

        this.getAllEquipments = function(eqId){
            return equipments;
        }

        this.removeEquipment = function(eqId){
            if(equipmentMap[eqId]){
                arrayRemoveByObject(equipments, equipmentMap[eqId]);
                delete equipmentNumberMap[equipmentMap[eqId].number];
                delete equipmentMap[eqId];
            }
        }

        this.getAutoNumber = function(eqType){
            var i = 1;
            var number;
            do{
                number = this.getTypeAbbreviation(eqType) + '-' + i;
                i++;
            }while(equipmentNumberMap[number]);

            return number;
        }

        this.getTypeAbbreviation = function(type, upperCase){
            var matchs = type.match(/^\w|\s\w/g);
            var abbreviation = '';
            for(var key in matchs){
                abbreviation += matchs[key].trim();
            }
            if(typeof upperCase == 'undefined' || upperCase){
                abbreviation = abbreviation.toUpperCase();
            }

            return abbreviation;
        }

        this.bindForums = function(url){
            var urlPattern = /^http:\/\/forums\.e-hentai\.org\/index.php\?.*showtopic=(\d+)/i.exec(url);

            if(urlPattern){
                bindForumsId = urlPattern[1];
                bindForumsBookmark = url;
                bookmarkPosition = 1;
                return true;
            }
            return false;
        }

        this.unBindForums = function(){
            bindForumsId = null;
        }

        this.isBindForums = function(url){
            if(!bindForumsId)return false;

            return new RegExp('^http:\/\/forums\.e-hentai\.org\/index.php\?.*showtopic='+bindForumsId).test(url);
        }

        this.getBindForumsUrl = function(){
             return bindForumsId ? 'http://forums.e-hentai.org/index.php?showtopic='+bindForumsId : null;
        }

        this.clear = function(){
            equipments = [];
            equipmentMap = {};
            equipmentNumberMap = {};
            equipmentTypeCount = {};
        }

        this.autoNumber = function(){
            //TODO
        }

        this.generatePost = function(pattern){
            pattern = pattern || '[{number}] {name} [seller: {seller}] [Current Bid: {bid}] ({bidder})';
            var postContent = '';

            var eqs = equipments.sort(function(eq1, eq2){
                return eq1.number > eq2.number;
            });

            var eqType;
            for(var key in eqs){
                var str = pattern;
                var eq = eqs[key];
                if(eqType != eq.type){
                    eqType = eq.type;
                    postContent += '\n[b]' + eq.type + '[/b]\n';
                }
                var url = 'http://hentaiverse.org/pages/showequip.php?eid=' + eq.equipmentId + '&key=' + eq.key;

                str = str.replace('{number}', eq.number);
                str = str.replace('{name}', '[url=' + url + ']' + eq.name + '[/url]');
                str = str.replace('{seller}', eq.seller);
                str = str.replace('{bid}', this.formatMoney(eq.lastBid) + 'k');
                str = str.replace('{bidder}', eq.lastBidder);

                postContent += str + '\n';
            }
            return postContent;
        }

        this.formatMoney = function(money){
            if(money == 0)return '0';

            var result = '';
            while(money > 1000){
                var w = money % 1000;
                if(result!= '')result = ','+result;
                result =   w + result;
                money = parseInt(money / 1000, 10);
            }
            result = money + ',' + result;
            return result;
        }

        this.setBookmark = function(position, url){
            bookmarkPosition = position;
            bindForumsBookmark = url;
        }

        this.getBookmark = function(){
            return bindForumsBookmark;
        }

        this.getBookmarkPosition = function(){
            return bookmarkPosition;
        }

        this.getBindForumsId = function(){
            return bindForumsId;
        }
    }

    function AuctionModeManager(){
        var storageKey = 'AucModMan';

        var auctions = [];
        var auctionMap = {};
        var equipments = [];
        var equipmentMap = {};

        this.getAllEquipments = function(){
            return equipments;
        };

        this.getAuction = function(auctionId){
            return auctionMap[auctionId] || null;
        }

        this.getAuctions = function(){
            return auctions;
        }

        this.getEquipment = function(equipmentId){
            return equipmentMap[equipmentId] || null;
        };

        this.addAuction = function(auctionId, color, background){
            var auction;
            if(typeof auctionId == 'string'){
                auction = new Auction({
                    id: auctionId,
                    color: color,
                    background: background
                });
            }
            else{
                auction = auctionId;
            }

            if(auctionMap[auction.id])return false;

            auctions.push(auction);
            auctionMap[auction.id] = auction;
            return true;
        };

        this.addEquipment = function(equipment){
            var auction = auctionMap[equipment.auctionId];
            if(!auction)return false;

            if(auction.addEquipment(equipment)){
                equipmentMap[equipment.equipmentId] = equipment;
                equipments.push(equipment);
                return true;
            }
            return false;
        }

        this.removeAuction = function(auctionId){
            var auction = auctionMap[auctionId];
            if(auction){
                var auctionEquipments = auction.getAllEquipments();
                for(var key in auctionEquipments){
                    var equipment = auctionEquipments[key];
                    arrayRemoveByObject(equipments, equipment);
                    delete equipmentMap[equipment.equipmentId];
                }

                arrayRemoveByObject(auctions, auction);
                delete auctionMap[auctionId];
            }
        };

        this.removeEquipment = function(equipmentId){
            var equipment = equipmentMap[equipmentId];
            if(equipment){
                auctionMap[equipment.auctionId].removeEquipment(equipmentId);

                arrayRemoveByObject(equipments, equipment);
                delete equipmentMap[equipmentId];
            }
        };

        this.searchBindAuction = function(url){
            for(var key in auctions){
                if(auctions[key].isBindForums(url)){
                    return auctions[key];
                }
            }
            return null;
        }

        this.toOptionElement = function(selectedAuId, filter){
            var html = '';
            for(var key in auctions){
                if(filter && filter(auctions[key]))continue;

                html += '<option ';
                if(selectedAuId == auctions[key].id){
                    html += ' selected';
                }
                html += '>'+auctions[key].id+'</option>';
            }
            return html;
        }

        this.searchEquipment = function(auction, number){
            var eqs = this.getAuction(auction).getAllEquipments();
            for(var key in eqs){
                if(new RegExp(eqs[key].number, 'i').test(number)){
                    return eqs[key];
                }
            }
            return null;
        }

        this.save = function(){
            this.saveAuction();
            this.saveEquipment();
        }

        this.saveEquipment = function(){
            var storageEquipments = [];
            for(var key in equipments){
                storageEquipments.push(equipments[key].export());
            }
            GM_setValue(storageKey+"_Eq", JSON.stringify(storageEquipments));
        }

        this.saveAuction = function(){
            var storageAuctions = [];
            for(var key in auctions){
                storageAuctions.push(auctions[key].export());
            }

            GM_setValue(storageKey+"_Au", JSON.stringify(storageAuctions));
        }

        this.load = function(){
            this.loadAuction();
            this.loadEquipment();
        }

        this.loadAuction = function(){
            auctions = [];
            auctionMap = {};
            var auStorage = JSON.parse(GM_getValue(storageKey+"_Au") || '[]');
            for(var key in auStorage){
                var auction = new Auction({});
                auction.import(auStorage[key]);
                this.addAuction(auction);
            }
        }

        this.loadEquipment = function(){
            equipments = [];
            equipmentMap = {};
            var eqStorage = JSON.parse(GM_getValue(storageKey+"_Eq") || '[]');
            for(var key in eqStorage){
                var equipment = new Equipment({});
                equipment.import(eqStorage[key]);
                this.addEquipment(equipment);
            }
        }
    }

    var auctionModeManager = new AuctionModeManager();
    auctionModeManager.load();

    function InventoryModule(){
        var selectedEquipmentId;
        var selectedEquipmentKey;
        var selectedEquipmentName;
        var selectedEquipmentType;

        var equipmentInfoWindow = createEquipmentInfoWindow();
        var addAuctionWindow = createAddAuctionWindow();
        var auctionManagerWindow = createAuctionManagerWindow();
        var addEquipmentWindow = createAddEquipmentWindow();
        var filterWindow = createFilterWindow();
        var toolbar = createToolbar();

        $('#mainpane #rightpane #inv_equip > div > div:first-child').after('<img class="bd_eqAdd" src="'+Resource.icon_addEq+'"/>');
        $('#mainpane #rightpane #inv_equip > div > div:first-child').after('<img class="bd_eqRemove" src="'+Resource.icon_remove+'"/>');
        $('#mainpane #rightpane #inv_equip > div > div:first-child').after('<img class="bd_eqAuction" src="'+Resource.icon_auction+'"/>');
        $('#mainpane #rightpane #inv_equip > div .eqdp').css({
            paddingLeft: 5,
            width: '580px',
            overflow: 'hidden'
        });

        $('#mainpane #rightpane #inv_equip .bd_eqAdd').click(function(event){
            selectedEquipmentId = /\d+/.exec($(this).next().attr('id'))[0];
            selectedEquipmentKey = /equips\.set\(\d+, '(\w+)'\)/i.exec($(this).next().attr('onmouseover'))[1];
            selectedEquipmentName = $(this).next().text();
            selectedEquipmentType = /<div><div class="e1">([\w -]+) &nbsp;/i.exec($(this).next().attr('onmouseover'))[1];
            addEquipmentWindow.show();
        });

        $('#mainpane #rightpane #inv_equip .bd_eqRemove').click(function(event){
            selectedEquipmentId = /\d+/.exec($(this).next().next().attr('id'))[0];
            auctionModeManager.removeEquipment(selectedEquipmentId);
            auctionModeManager.save();
            refreshEquipmentUI();
            filterWindow.filter();
        });

        $('#mainpane #rightpane #inv_equip > div .eqdp').mouseenter(function(){
            var eqId = /\d+/.exec($(this).attr('id'))[0];
            var eq = auctionModeManager.getEquipment(eqId);

            if(eq){
                equipmentInfoWindow.show(eq);
            }

        });

        $('#mainpane #rightpane #inv_equip > div .eqdp').mouseleave(function(){
            equipmentInfoWindow.hide();
        });

        refreshEquipmentUI();

        /*-------------------------------------------------------------------------------------------------------------------*/
        function refreshEquipmentUI(){
            $('#mainpane #rightpane #inv_equip > div .eqdp').each(function(){
                var eqId = /\d+/.exec($(this).attr('id'))[0];
                var addIcon = $(this).parent().find('.bd_eqAdd');
                var removeIcon = $(this).parent().find('.bd_eqRemove');
                var auctionIcon = $(this).parent().find('.bd_eqAuction');

                var eq = auctionModeManager.getEquipment(eqId);
                var background = '';
                var color = '';
                if(eq){
                    var auction = auctionModeManager.getAuction(eq.auctionId);
                    background = auction.background || background;
                    color = auction.color || color;

                    if(auction.status == 'collection'){
                        removeIcon.show();
                        auctionIcon.hide();
                    }
                    else{
                        removeIcon.hide();
                        auctionIcon.show();
                    }
                    addIcon.hide();
                }
                else{
                    addIcon.show();
                    removeIcon.hide();
                    auctionIcon.hide();
                }
                $(this).css('background', background);
                $(this).find('.fd2 div').css('color', color);
            });
        }

        function createEquipmentInfoWindow(){
            var eqInfoWindow = new FormWindow({
                title: 'Equipment Info',
                x: 1040,
                y: 200,
                drag: false,
                enableSubmit: false,
                enableCancel:false
            });

            var eqNameElement = eqInfoWindow.addText({
                textStyle: {
                    lineHeight: '30px',
                    fontWeight: 'bold'
                }
            });

            var eqNumElement = eqInfoWindow.addText({
                label: 'Number:'
            });

            var eqAuIdElement = eqInfoWindow.addText({
                label: 'Auction:'
            });

            var eqSellerElement = eqInfoWindow.addText({
                label: 'Seller:'
            });

            var eqAuStatusElement = eqInfoWindow.addText({
                label: 'Auction Status:'
            });

            var eqBidElement = eqInfoWindow.addText({
                label: 'Bid:'
            });

            var eqBidderElement = eqInfoWindow.addText({
                label: 'Last Bidder:'
            });

            eqInfoWindow.onShow = function(_this, eq){
                eqNameElement.innerHTML = eq.name;
                eqNumElement.innerHTML = eq.number;
                eqAuIdElement.innerHTML = eq.auctionId;
                eqSellerElement.innerHTML = eq.seller;
                eqAuStatusElement.innerHTML = auctionModeManager.getAuction(eq.auctionId).status;
                eqBidElement.innerHTML = eq.lastBid + ' K';
                eqBidderElement.innerHTML = eq.lastBidder;
            }

            return eqInfoWindow;
        }

        function createAddAuctionWindow(){
            var addAuctionWindow = new FormWindow({
                title: 'New Auction',
                modal: true
            });

            addAuctionWindow.addSimpleInput({
                id: 'addAuction_auctionId',
                label: 'Action ID:'
            });
            addAuctionWindow.addSimpleInput({
                id: 'addAuction_color',
                label: 'Front Color:'
            });
            addAuctionWindow.addSimpleInput({
                id: 'addAuction_background',
                label: 'Background:'
            });

            addAuctionWindow.onShow = function(win){
                win.reset();
            }

            addAuctionWindow.onSubmit = function(win){
                var auctionId = win.getInputValue('#addAuction_auctionId');
                var color = win.getInputValue('#addAuction_color');
                var background = win.getInputValue('#addAuction_background');

                if(auctionModeManager.addAuction(auctionId, color, background)){
                    auctionModeManager.save();
                    win.hide();
                }
                else{
                    alert('Auction already exists!');
                }
            }

            return addAuctionWindow;
        }

        function createToolbar(){
            var toolbar = new Toolbar({
                title: 'Toolbar',
                x: 1245,
                y: 3
            });

            toolbar.addTool(Resource.icon_addAuc, '新建拍卖', function(){
                addAuctionWindow.show();
            });
            toolbar.addTool(Resource.icon_manAuc, '管理拍卖', function(){
                auctionManagerWindow.show();
            });
            toolbar.addSplitter();
            toolbar.addTool(Resource.icon_filter, '过滤拍卖品', function(){
                filterWindow.show();
            });

            toolbar.show();

            return toolbar;
        }

        function createAddEquipmentWindow(){
            var prevSelectAuction;
            var addEquipmentWindow = new FormWindow({
                title: 'Add Equipment',
                submitName: 'Add',
                modal: true
            });

            addEquipmentWindow.addText({
                text: '',
                id: 'addEq_eqName',
                style: {
                    lineHeight: '30px',
                    fontWeight: 'bold'
                }
            });

            addEquipmentWindow.addInput({
                label: 'Auction',
                inputHtml: '<select id="addEq_actionId"></select>'
            });

            addEquipmentWindow.addSimpleInput({
                id: 'addEq_number',
                label: 'Number:'
            });

            addEquipmentWindow.addSimpleInput({
                id: 'addEq_seller',
                label: 'Seller:'
            });

            addEquipmentWindow.onShow = function(){
                var eqNameElement = addEquipmentWindow.getElement('#addEq_eqName');
                var selectElement = addEquipmentWindow.getElement('#addEq_actionId');

                eqNameElement.innerHTML = selectedEquipmentName;

                var optionsHtml = auctionModeManager.toOptionElement(prevSelectAuction, function(auction){
                    if(auction.status != 'collection')return true;
                });

                if(optionsHtml == ''){
                    if(confirm('You have no auction in collection,do you want to create a auction?')){
                        addAuctionWindow.show();
                    }
                    return false;
                }
                else{
                    selectElement.innerHTML = optionsHtml;
                }

                updateAutoNumber();
            }

            addEquipmentWindow.onSubmit = function(){
                var equipment = new Equipment({
                    name: selectedEquipmentName,
                    type: selectedEquipmentType,
                    seller: addEquipmentWindow.getElement('#addEq_seller').value,
                    auctionId: addEquipmentWindow.getElement('#addEq_actionId').value,
                    equipmentId: selectedEquipmentId,
                    number: addEquipmentWindow.getElement('#addEq_number').value,
                    key: selectedEquipmentKey
                });

                if(auctionModeManager.addEquipment(equipment)){
                    auctionModeManager.save();
                    addEquipmentWindow.hide();
                    refreshEquipmentUI();
                }
                else{
                    alert('Number already exists!');
                }
                prevSelectAuction = equipment.auctionId;
            };

            addEquipmentWindow.getElement('#addEq_actionId').addEventListener('change', function(){
                updateAutoNumber();
            });

            function updateAutoNumber(){
                var numberElement = addEquipmentWindow.getElement('#addEq_number');
                numberElement.value = auctionModeManager
                    .getAuction(addEquipmentWindow.getElement('#addEq_actionId').value)
                    .getAutoNumber(selectedEquipmentType);
            }

            return addEquipmentWindow;
        }

        function createFilterWindow(){
            var currentFilter;

            var filterWindow = new FormWindow({
                title: 'Filter',
                modal: true
            });

            filterWindow.addInput({
                label: 'Auction',
                inputHtml: '<select id="filter_actionId"></select>'
            });

            filterWindow.onShow = function(){
                var selectElement = filterWindow.getElement('#filter_actionId');

                var optionsHtml = '<option value="__NORMAL__">All</option>';
                optionsHtml += auctionModeManager.toOptionElement(currentFilter, null);
                selectElement.innerHTML = optionsHtml;
            }

            filterWindow.filter = function(){
                var filterAuctionId = filterWindow.getElement('#filter_actionId').value;
                currentFilter = filterAuctionId;
                $('#mainpane #rightpane #inv_equip > div .eqdp').each(function(){
                    var eqId = /\d+/.exec($(this).attr('id'))[0];
                    var eq = auctionModeManager.getEquipment(eqId);
                    if(filterAuctionId == '' || filterAuctionId == "__NORMAL__" || (eq && eq.auctionId == filterAuctionId)){
                        $(this).parent().show();
                    }
                    else{
                        $(this).parent().hide();
                    }
                });
                filterWindow.hide();
            }

            filterWindow.onSubmit = function(){
                filterWindow.filter();
            }

            return filterWindow;
        }

        function createAuctionManagerWindow(){
            var auctionManagerWindow =  new FormWindow({
                title: 'Auction Manager',
                submitName: 'Save',
                cancelName: 'Close',
                x: 1245,
                y: 300
            });

            auctionManagerWindow.addInput({
                label: 'Auction:',
                inputHtml: '<select id="aucMan_actionId"></select><img id="aucMan_del" src="'+Resource.icon_delAuc+'">'
            });

            auctionManagerWindow.addInput({
                label: 'Status:',
                inputHtml: '<select id="aucMan_actionStatus">' +
                    '<option>collection</option>' +
                    '<option>auction</option>' +
                    '<option>finished</option>' +
                    '</select>'
            });

            var frontColorInput = auctionManagerWindow.addSimpleInput({
                id: 'aucMan_color',
                label: 'Front Color:'
            });

            var backgroundInput = auctionManagerWindow.addSimpleInput({
                id: 'aucMan_background',
                label: 'Background:'
            });

            var forumsElement = auctionManagerWindow.addText({
                label: 'Forums:'
            });

            var auctionSelect = auctionManagerWindow.getElement('#aucMan_actionId');
            var actionStatusSelect = auctionManagerWindow.getElement('#aucMan_actionStatus');
            var deleteBtn = auctionManagerWindow.getElement('#aucMan_del');

            auctionManagerWindow.onShow = function(){
                var selectElement = auctionManagerWindow.getElement('#aucMan_actionId');
                var optionsHtml = auctionModeManager.toOptionElement();
                selectElement.innerHTML = optionsHtml;
                updateUI();
            }

            auctionManagerWindow.onSubmit = function(){
                var selectedAuction = auctionModeManager.getAuction(auctionSelect.value);
                selectedAuction.status = actionStatusSelect.value;
                selectedAuction.color = frontColorInput.value;
                selectedAuction.background = backgroundInput.value;
                refreshEquipmentUI();
                auctionModeManager.save();
                alert('Saved!');
            }

            auctionSelect.addEventListener('change', function(){
                updateUI();
            });

            deleteBtn.addEventListener('click', function(){
                if(confirm('Are you sure want to delete this auction?')){
                    var selectedAuction = auctionModeManager.getAuction(auctionSelect.value);
                    auctionSelect.removeChild(auctionSelect.options[auctionSelect.selectedIndex]);
                    auctionModeManager.removeAuction(selectedAuction.id);
                    auctionModeManager.save();
                    refreshEquipmentUI();
                }
            });

            function updateUI(){
                var selectedAuction = auctionModeManager.getAuction(auctionSelect.value);
                forumsElement.innerHTML = selectedAuction.getBindForumsUrl() ? '<a target="_blank" href="'+selectedAuction.getBindForumsUrl()+'">Forums Id:'
                    +selectedAuction.getBindForumsId()+'</a>' : 'Not set';
                actionStatusSelect.value = selectedAuction.status;
                frontColorInput.value = selectedAuction.color;
                backgroundInput.value = selectedAuction.background;
            }

            return auctionManagerWindow;
        }
    };

    function ForumsModel(){
        var bindAuction = auctionModeManager.searchBindAuction(document.location.href);
        if(bindAuction && bindAuction.status == 'collection'){
            alert('Warning: 拍卖的状态被设置成"collection"');
        }

        var toolbar = createToolbar();
        var bindWindow = createBindWindow();
        var eqSearchWindow = createEquipmentSearchWindow();
        var bidWindow = createBidWindow();
        var generatePostWindow = createGeneratePostWindow();
        var statusWindow = createStatusWindow();
        if(bindAuction){
            statusWindow.show(bindAuction);
            initBookMark();
            statusWindow.referBookmark(bindAuction);
        }
        toolbar.show();

        function createToolbar(){
            var toolbar = new Toolbar({
                title: 'Toolbar',
                y: 100,
                drag: false
            });

            toolbar.setCss({
                left: 'auto',
                right: '10px',
                position: 'fixed'
            });

            if(!bindAuction){
                toolbar.addTool(Resource.icon_addAuc, 'Bind Auction', function(){
                    bindWindow.show();
                });
            }
            else{
                toolbar.addTool(Resource.icon_remove, 'Unbind Auction', function(){
                    if(confirm('是否要解绑当前拍卖?')){
                        bindAuction.unBindForums();
                        auctionModeManager.saveAuction();
                        document.location.href = document.location.href;
                    }
                });

                toolbar.addTool(Resource.icon_auction, 'Generate Post', function(){
                    generatePostWindow.show(bindAuction);
                });

                toolbar.addTool(Resource.icon_auction, 'Search Equipment', function(){
                    eqSearchWindow.show();
                });

            }

            return toolbar;
        }

        function createStatusWindow(){
            var statusWindow = new FormWindow({
                title: 'Status',
                y: 100,
                enableCancel: false,
                enableSubmit: false
            });

            statusWindow.setCss({
                left: 'auto',
                right: '80px',
                position: 'fixed'
            });

            var auctionElement = statusWindow.addText({
                label: 'Auction:'
            });

            var bookmarkElement = statusWindow.addText({
                label: 'Bookmark:'
            });

            statusWindow.onShow = function(_this, auction){
                auctionElement.innerHTML = auction.id;
                bookmarkElement.innerHTML = auction.getBookmarkPosition();
            }


            statusWindow.referBookmark = function(auction){
                bookmarkElement.innerHTML = '<a href="'+auction.getBookmark()+'">'+auction.getBookmarkPosition()+'</a>';
            }

            return statusWindow;
        }

        function createBindWindow(){
            var bindWindow = new FormWindow({
                title: 'Auction Bind',
                modal: true,
                submitName: 'Bind'
            });

            bindWindow.addInput({
                label: 'Auction:',
                inputHtml: '<select id="bind_actionId"></select>'
            });

            var selectElement = bindWindow.getElement('#bind_actionId');

            bindWindow.onShow = function(){
                selectElement.innerHTML = auctionModeManager.toOptionElement(null, function(auction){
                    return auction.status == 'collection' || auction.getBindForumsId();
                });
                if(selectElement.innerHTML == ''){
                    alert('没有在拍卖中的组！');
                    return false;
                }
            }

            bindWindow.onSubmit = function(){
                var auctionId = selectElement.value;
                auctionModeManager.getAuction(auctionId).bindForums(document.location.href);
                bindAuction = auctionModeManager.getAuction(auctionId);
                bindWindow.hide();
                auctionModeManager.saveAuction();
                document.location.href = document.location.href;
            }

            return bindWindow;
        }

        function createEquipmentSearchWindow(){
            var eqSearchElement;
            var eqNumberElement;
            var eqNameElement;
            var eqLastBidElement;
            var eqLastBidderElement;

            var selectedBid;
            var selectedBidder;
            var selectedEq;

            var eqSearchWindow = new FormWindow({
                title: 'Auction',
                modal: false,
                submitName: 'Bid',
                cancelName: 'Close',
                x: 800,
                y: 100
            });

            eqSearchWindow.setCss({
                position: 'fixed'
            });

            eqSearchWindow.setInnerCss({
                width: '500px'
            });

            eqSearchElement = eqSearchWindow.addSimpleInput({
                label: 'Search:',
                id: 'BindAuMan_search'
            });

            eqNameElement = eqSearchWindow.addText({
                id: 'BindAuMan_eqName',
                label: 'Name:',
                text: '&nbsp;',
                textStyle: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: '30px'
                }
            });

            eqNumberElement = eqSearchWindow.addText({
                label: 'Number:',
                id: 'BindAuMan_number'
            });

            eqLastBidElement = eqSearchWindow.addText({
                id: 'BindAuMan_laBid',
                label: 'Last Bid:',
                inputHtml: '<input type="text" style="width: 70px;" id="BindAuMan_lastBid">K'
            });

            eqLastBidderElement = eqSearchWindow.addText({
                label: 'Last Bidder:',
                id: 'BindAuMan_laBidder'
            });

            eqSearchWindow.onSubmit = function(){
                if(!selectedEq)return;

                bidWindow.show({
                    number: selectedEq.number,
                    bid: selectedBid,
                    bidder: selectedBidder
                });
            };

            eqSearchWindow.search = function(search){
                var eq = auctionModeManager.searchEquipment(bindAuction.id, search);
                if(eq){
                    selectedEq = eq;
                    eqSearchWindow.show();

                    selectedBid = new RegExp(eq.number + '.*?(\\d+)k', 'i').exec(search);
                    selectedBid = selectedBid ? selectedBid[1] : null;
                    selectedBidder = $(window.getSelection().focusNode).parents('.borderwrap').find('.bigusername a').html() || '';

                    eqNameElement.innerHTML = eq.name;
                    eqNumberElement.innerHTML = eq.number;
                    eqLastBidElement.innerHTML = eq.lastBid + 'K';
                    eqLastBidderElement.innerHTML = eq.lastBidder;
                };
            }

            eqSearchWindow.clearSearchInput = function(){
                eqSearchElement.value = '';
            }

            document.addEventListener('keyup', function(event){
                if(!bindAuction)return;

                if(event.keyCode == 88){
                    var selectionString = window.getSelection().toString();
                    if(selectionString){
                        eqSearchWindow.clearSearchInput();
                        eqSearchWindow.search(selectionString);
                    }
                }
            });

            eqSearchElement.addEventListener('keyup', function(){
                eqSearchWindow.search(this.value);
            });

            return eqSearchWindow;
        }

        function createBidWindow(){
            var bidElement;
            var bidderElement;
            var numberElement;

            var currEqNumber;

            var bidWindow = new FormWindow({
                title: 'Bid',
                modal: true,
                submitName: 'Bid'
            });

            numberElement = bidWindow.addText({
                label: 'Number:',
                id: 'Bid_number',
                textStyle: {
                    color: 'red',
                    fontWeight: 'bold',
                    paddingLeft: '10px'
                }
            });


            bidElement = bidWindow.addInput({
                label: 'Bid:',
                inputHtml: '<input type="text" style="width: 70px;" id="Bid_bid">K'
            });

            bidderElement = bidWindow.addSimpleInput({
                label: 'Bidder:',
                id: 'Bid_bidder'
            });

            bidWindow.onShow = function(_this, param){
                numberElement.innerHTML = currEqNumber = param.number;

                bidElement.value = param.bid;
                bidderElement.value = param.bidder;
            }

            bidWindow.onSubmit = function(){
                if(!bindAuction.getEquipmentByNumber(currEqNumber).bid(bidElement.value, bidderElement.value)){
                    if(confirm('你的出价不合法，是否继续？')){
                        bindAuction.getEquipmentByNumber(currEqNumber).bid(bidElement.value, bidderElement.value, true);
                    }
                    else{
                        return;
                    }
                }

                bidWindow.hide();
                eqSearchWindow.search(currEqNumber);
                auctionModeManager.saveEquipment();
            }

            return bidWindow;
        }

        function createGeneratePostWindow(){
            var __auction;
            var storageKey = 'GenPattern';
            var generatePostWindow = new FormWindow({
                submitName: 'Generate',
                cancelName: 'close',
                modal: true
            });

            generatePostWindow.addInput({
                label: 'Content:',
                inputHtml: '<textarea id="GenPost_content"></textarea>'
            });

            var patternElement = generatePostWindow.addSimpleInput({
                label: 'Pattern:',
                inputStyle: {
                    width: '700px'
                }
            });

            var contentElement = generatePostWindow.getElement('#GenPost_content');
            $(contentElement).css({
                width: 700,
                height: 400
            })

            generatePostWindow.onShow = function(_this, auction){
                __auction = auction;
                contentElement.value = '';
                patternElement.value = GM_getValue(storageKey) || '[{number}] {name} [seller: {seller}] [Current Bid: {bid}] ({bidder})';
            }

            generatePostWindow.onSubmit = function(){
                GM_setValue(storageKey, patternElement.value);
                contentElement.value = __auction.generatePost(patternElement.value);
            }

            return generatePostWindow;
        }

        function initBookMark(){
            $('.borderwrap .subtitle .postdetails').before('<span class="bd_bookmarkHandler">Set Bookmark</span>');
            $('.borderwrap .subtitle .bd_bookmarkHandler').click(function(){
                var postId = /\((\d+)\)/.exec($(this).next().find('a').attr('onclick'))[1];
                var postNum = $(this).next().find('a').html().substr(1);
                var bookmark = 'http://forums.e-hentai.org/index.php?s=&view=findpost&showtopic=' + bindAuction.getBindForumsId() + "&view=findpost&p=" + postId;
                bindAuction.setBookmark(postNum, bookmark);
                auctionModeManager.saveAuction();
                statusWindow.referBookmark(bindAuction);
                alert('Bookmark Saved!');
            });
        }
    }

    function ForumsNewPostModel(){
        var toolbar = createToobar();
        toolbar.show();

        var auctionSelectorWindow = createAuctionSelectorWindow();
        var generatePostWindow = createGeneratePostWindow();

        function createToobar(){
            var toolbar = new Toolbar({
                title: 'Toolbar',
                y: 50,
                drag: false
            });

            toolbar.setCss({
                left: 'auto',
                right: '10px',
                position: 'fixed'
            });

            toolbar.addTool(Resource.icon_auction, 'Generate Post', function(){
                auctionSelectorWindow.show();
            });
            return toolbar;
        }

        function createAuctionSelectorWindow(){
            var auctionSelectorWindow = new FormWindow({
                title: 'Select Auction',
                modal: true
            });

            auctionSelectorWindow.addInput({
                label: 'Auction',
                inputHtml: '<select id="AucSelect"></select>'
            });
            var aucSelectElement = auctionSelectorWindow.getElement('#AucSelect');

            auctionSelectorWindow.onShow = function(){
                aucSelectElement.innerHTML = auctionModeManager.toOptionElement(null, null);
                if(aucSelectElement.innerHTML == ''){
                    alert('没有拍卖！');
                    return false;
                }
            }

            auctionSelectorWindow.onSubmit = function(){
                auctionSelectorWindow.hide();
                generatePostWindow.show(auctionModeManager.getAuction(aucSelectElement.value));
            }

            return auctionSelectorWindow;
        }

        function createGeneratePostWindow(){
            var __auction;
            var storageKey = 'GenPattern';
            var generatePostWindow = new FormWindow({
                submitName: 'Generate',
                cancelName: 'close',
                modal: true
            });

            generatePostWindow.addInput({
                label: 'Content:',
                inputHtml: '<textarea id="GenPost_content"></textarea>'
            });

            var patternElement = generatePostWindow.addSimpleInput({
                label: 'Pattern:',
                inputStyle: {
                    width: '700px'
                }
            });

            var contentElement = generatePostWindow.getElement('#GenPost_content');
            $(contentElement).css({
                width: 700,
                height: 400
            })

            generatePostWindow.onShow = function(_this, auction){
                __auction = auction;
                contentElement.value = '';
                patternElement.value = GM_getValue(storageKey) || '[{number}] {name} [seller: {seller}] [Current Bid: {bid}] ({bidder})';
            }

            generatePostWindow.onSubmit = function(){
                GM_setValue(storageKey, patternElement.value);
                contentElement.value = __auction.generatePost(patternElement.value);
            }

            return generatePostWindow;
        }
    }

    function MoogleMailModule(){
        var eqInfoWindow = createEquipmentInfoWindow();

        if($('#mainpane #rightpane').size()){
            $('#mainpane #rightpane #pane_equip > div .eqdp').mouseenter(function(){
                var eqId = /\d+/.exec($(this).attr('id'))[0];
                var eq = auctionModeManager.getEquipment(eqId);

                if(eq){
                    eqInfoWindow.show(eq);
                    eqInfoWindow.setCss({
                        top: $(this).offset().top + 'px'
                    });
                }
            });

            $('#mainpane #rightpane #pane_equip > div .eqdp').mouseleave(function(){
                eqInfoWindow.hide();
            });

            var eqSlot = $('#mainpane #leftpane[onmouseover]');
            if(eqSlot.size()){
                var eqId = /equips\.set\((\d+), '\w+'\)/i.exec(eqSlot.attr('onmouseover'))[1];
                var eq = auctionModeManager.getEquipment(eqId);
                if(eq){
                    if($('[name=message_to_name]').val() == "" && eq.lastBidder != 'nobody'){
                        $('[name=message_to_name]').val(eq.lastBidder);
                    }

                    refreshEquipmentSlot();

                    eqSlot.mouseenter(function(){
                        eqInfoWindow.show(eq);
                        eqInfoWindow.setCss({
                            top: $(this).offset().top - 300 + 'px',
                            left: 700 + 'px'
                        });
                    });

                    eqSlot.mouseout(function(){
                        eqInfoWindow.hide();
                    });
                }
            }
            else{
                var filterWindow = createFilterWindow();
                filterWindow.show();
                refreshEquipmentUI();
            }
        }
        else{

            var addEqWindow = createAddEquipmentWindow();
            var eqSlot = $('#mainpane #leftpane[onmouseover]');
            if(eqSlot.size()){
                var addIcon = $('<img class="bd_eqAdd" src="'+Resource.icon_addEq+'"/>');
                var removeIcon = $('<img class="bd_eqRemove" src="'+Resource.icon_remove+'"/>');
                var acutionIcon = $('<img class="bd_eqAuction" src="'+Resource.icon_auction+'"/>');
                eqSlot.find('.fd2 div').append(addIcon);
                eqSlot.find('.fd2 div').append(removeIcon);
                eqSlot.find('.fd2 div').append(acutionIcon);

                refreshEquipmentSlot();
                var match = /equips\.set\((\d+), '(\w+)'\)/i.exec(eqSlot.attr('onmouseover'));
                addIcon.click(function(){
                    addEqWindow.show({
                        id: match[1],
                        name: eqSlot.find('.fd2 div').text(),
                        seller: $('#leftpane table:first tr:eq(0) td:eq(1)').text(),
                        key: match[2],
                        type: /<div><div class="e1">([\w -]+) &nbsp;/i.exec(eqSlot.attr('onmouseover'))[1]
                    });
                });

                removeIcon.click(function(){
                    auctionModeManager.removeEquipment(match[1]);
                    auctionModeManager.save();
                    refreshEquipmentSlot();
                });

                eqSlot.mouseenter(function(){
                    var eq = auctionModeManager.getEquipment(match[1]);
                    if(eq){
                        eqInfoWindow.show(eq);
                        eqInfoWindow.setCss({
                            top: eqSlot.offset().top - 300 + 'px',
                            left: 700 + 'px'
                        });
                    }
                });

                eqSlot.mouseleave(function(){
                    eqInfoWindow.hide();
                });
            }
        }

        function createFilterWindow(){
            var filterWindow = new FormWindow({
                title: 'Filter',
                x: 1245,
                y: 100,
                enableSubmit:false,
                enableCancel: false
            });

            var numberElement = filterWindow.addSimpleInput({
                label: 'Number:',
                id: 'Filter_number'
            });

            filterWindow.addInput({
                label: 'Auction:',
                inputHtml: '<select id="Filter_auction"><option value="__NORMAL__">All</option></select>'
            });
            var auctionElement = filterWindow.getElement('#Filter_auction');

            auctionElement.innerHTML += auctionModeManager.toOptionElement(null, null);

            auctionElement.addEventListener('change', function(){
                filterWindow.filter();
            });

            numberElement.addEventListener('keyup', function(){
                filterWindow.filter();
            });

            filterWindow.filter = function(){
                var filterNumber = numberElement.value;
                var filterAuctionId = auctionElement.value;
                $('#mainpane #rightpane #pane_equip > div .eqdp').each(function(){
                    var eqId = /\d+/.exec($(this).attr('id'))[0];
                    var eq = auctionModeManager.getEquipment(eqId);
                    if(filterAuctionId == '' || filterAuctionId == "__NORMAL__" || (eq && eq.auctionId == filterAuctionId)){
                        $(this).parent().show();
                    }
                    else{
                        $(this).parent().hide();
                    }

                    if(filterNumber && (!eq || eq.number.toLowerCase().indexOf(filterNumber.toLowerCase()) == -1)){
                        $(this).parent().hide();
                    }
                });
            }

            return filterWindow;
        }

        function createEquipmentInfoWindow(){
            var eqInfoWindow = new FormWindow({
                title: 'Equipment Info',
                x: 1040,
                drag: false,
                enableSubmit: false,
                enableCancel:false
            });

            var eqNameElement = eqInfoWindow.addText({
                textStyle: {
                    lineHeight: '30px',
                    fontWeight: 'bold'
                }
            });

            var eqNumElement = eqInfoWindow.addText({
                label: 'Number:'
            });

            var eqAuIdElement = eqInfoWindow.addText({
                label: 'Auction:'
            });

            var eqSellerElement = eqInfoWindow.addText({
                label: 'Seller:'
            });

            var eqAuStatusElement = eqInfoWindow.addText({
                label: 'Auction Status:'
            });

            var eqBidElement = eqInfoWindow.addText({
                label: 'Bid:'
            });

            var eqBidderElement = eqInfoWindow.addText({
                label: 'Last Bidder:'
            });

            eqInfoWindow.onShow = function(_this, eq){
                eqNameElement.innerHTML = eq.name;
                eqNumElement.innerHTML = eq.number;
                eqAuIdElement.innerHTML = eq.auctionId;
                eqSellerElement.innerHTML = eq.seller;
                eqAuStatusElement.innerHTML = auctionModeManager.getAuction(eq.auctionId).status;
                eqBidElement.innerHTML = eq.lastBid + ' K';
                eqBidderElement.innerHTML = eq.lastBidder;
            }

            return eqInfoWindow;
        }

        function createAddEquipmentWindow(){
            var prevSelectAuction = null;
            var currEq;

            var addEquipmentWindow = new FormWindow({
                title: 'Add Equipment',
                submitName: 'Add',
                modal: true
            });

            var eqNameElement = addEquipmentWindow.addText({
                text: '',
                id: 'addEq_eqName',
                style: {
                    lineHeight: '30px',
                    fontWeight: 'bold'
                }
            });

            addEquipmentWindow.addInput({
                label: 'Auction',
                inputHtml: '<select id="addEq_actionId"></select>'
            });
            var selectElement = addEquipmentWindow.getElement('#addEq_actionId');

            var numberElement = addEquipmentWindow.addSimpleInput({
                id: 'addEq_number',
                label: 'Number:'
            });

            var sellerElement = addEquipmentWindow.addSimpleInput({
                id: 'addEq_seller',
                label: 'Seller:'
            });

            addEquipmentWindow.onShow = function(_this, eqInfo){
                currEq = eqInfo;
                sellerElement.value = eqInfo.seller;

                var optionsHtml = auctionModeManager.toOptionElement(prevSelectAuction, function(auction){
                    if(auction.status != 'collection')return true;
                });

                if(optionsHtml == ''){
                    alert('You have no auction in collection!');
                    return false;
                }
                else{
                    selectElement.innerHTML = optionsHtml;
                }
                updateAutoNumber();
            }

            addEquipmentWindow.onSubmit = function(){
                var equipment = new Equipment({
                    name: currEq.name,
                    type: currEq.type,
                    seller: sellerElement.value,
                    auctionId: selectElement.value,
                    equipmentId: currEq.id,
                    number: numberElement.value,
                    key: currEq.key
                });

                if(auctionModeManager.addEquipment(equipment)){
                    auctionModeManager.save();
                    addEquipmentWindow.hide();
                    refreshEquipmentSlot();
                }
                else{
                    alert('Number already exists!');
                }
                prevSelectAuction = equipment.auctionId;
            };

            addEquipmentWindow.getElement('#addEq_actionId').addEventListener('change', function(){
                updateAutoNumber();
            });

            function updateAutoNumber(){
                numberElement.value = auctionModeManager
                    .getAuction(selectElement.value)
                    .getAutoNumber(currEq.type);
            }

            return addEquipmentWindow;
        }

        function refreshEquipmentSlot(){
            var eqSlot = $('#mainpane #leftpane[onmouseover]');
            var match = /equips\.set\((\d+), '(\w+)'\)/i.exec(eqSlot.attr('onmouseover'));
            var eq = auctionModeManager.getEquipment(match[1]);
            var background = '';
            var color = '';

            if(eq){
                var auction = auctionModeManager.getAuction(eq.auctionId);
                background = auction.background || background;
                color = auction.color || color;
                eqSlot.find('.bd_eqAdd').hide();

                if(auctionModeManager.getAuction(eq.auctionId).status == 'collection'){
                    eqSlot.find('.bd_eqRemove').show();
                    eqSlot.find('.bd_eqAuction').hide();
                }
                else{
                    eqSlot.find('.bd_eqRemove').hide();
                    eqSlot.find('.bd_eqAuction').show();
                }
            }
            else{
                eqSlot.find('.bd_eqAdd').show();
                eqSlot.find('.bd_eqRemove').hide();
                eqSlot.find('.bd_eqAuction').hide();
            }

            eqSlot.css('background', background);
            eqSlot.find('.fd2 div').css('color', color);
        }

        function refreshEquipmentUI(){
            $('#mainpane #rightpane #pane_equip > div .eqdp').each(function(){
                var eqId = /\d+/.exec($(this).attr('id'))[0];
                var eq = auctionModeManager.getEquipment(eqId);
                var background = '';
                var color = '';

                if(eq){
                    var auction = auctionModeManager.getAuction(eq.auctionId);
                    background = auction.background || background;
                    color = auction.color || color;
                }

                $(this).css('background', background);
                $(this).find('.fd2 div').css('color', color);
            });
        }
    }

    if(/http:\/\/hentaiverse\.org\/\?s=Character&ss\=in.*/i.test(document.location.href)){
        InventoryModule();
    }

    if(/http:\/\/hentaiverse.org\/\?s=Bazaar&ss=mm.*/i.test(document.location.href)){
        MoogleMailModule();
    }

    if(/http:\/\/forums\.e-hentai\.org\/index\.php\?.*showtopic=.*/i.test(document.location.href)){
        ForumsModel();
    }

    if(/http:\/\/forums\.e-hentai\.org\/index\.php\?.*act=Post.*/i.test(document.location.href)){
        ForumsNewPostModel();
    }

})(jQuery);