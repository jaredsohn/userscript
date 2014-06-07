// ==UserScript==
// @name           AmaGrea
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    超簡単にAmazonアソシエイト（アフィリエイト）リンクを商品ページで生成
// @include        http://www.amazon.co.jp/*
// @version        1.5
// ==/UserScript==

//リンクの動作確認には「リンクの動作確認ツール（https://affiliate.amazon.co.jp/gp/associates/network/tools/link-checker/main.html）」を利用

(function() {

    function checkUrl(url) {return (!CHECK_MODE) ? url : CHECK_URL + encodeURIComponent(url);}
    function $x(exp) {return document.evaluate(exp,document,null,7,null);}
    function $xi(exp,index) {return $x(exp).snapshotItem(index);}
    
    function getCookie(name, defaultValue) {
        //  console.log("getCookie: " + name);
        var start = document.cookie.indexOf( name + "=" );
        var len = start + name.length + 1;
        if (  ( !start ) && ( name != document.cookie.substring( 0, name.length ) )
           || ( start == -1 ) ) {
            return ( !!defaultValue ) ? defaultValue : null;
        }
        var end = document.cookie.indexOf( ';', len );
        if ( end == -1 ) end = document.cookie.length;
        return unescape( document.cookie.substring( len, end ) );
    }
    function setCookie(name, value, expires, path, domain, secure) {
        //  console.log("setCookie: " + name + " = " + value);
        var today = new Date();
        today.setTime( today.getTime() );
        if ( expires ) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date( today.getTime() + (expires) );
        document.cookie = name+'='+escape( value ) +
            ( ( expires ) ? ';expires='+expires_date.toGMTString() : ';expires=Thu, 1-Jan-2030 00:00:00 GMT' ) + //expires.toGMTString()
            ( ( path ) ? ';path=' + path : ';path=/' ) +
            ( ( domain ) ? ';domain=' + domain : '' ) +
            ( ( secure ) ? ';secure' : '' );
    }
    function getToday() {
        var now, yy, mm, dd;
        now = new Date();
        yy = now.getYear();
        mm = now.getMonth() + 1;
        dd = now.getDate();
        if (yy < 2000) { yy += 1900; }
        if (mm < 10)   { mm = "0" + mm; }
        if (dd < 10)   { dd = "0" + dd; }
        return yy + "." + mm + "." + dd;
    }
    
    var start_time = new Date();

    //  定数定義
    var ASSOCIATE_ID = "associate_ID-22";
    var CHECK_MODE = false; //true;
    var CHECK_URL = "https://affiliate.amazon.co.jp/gp/associates/network/tools/link-checker/main.html??link=";
    var STAR_URL = "http://images-jp.amazon.com/images/G/09/x-locale/common/customer-reviews/stars-@.gif"; /* '@'を置換して使う */
    
    var SIZE_NUM   = 3;
    var LABEL_SIZE = ["小", "中", "大"];
    var INT_SIZE   = [ 75 , 120 , 160 ];
    var DEFAULT_SELECTED_NUM = SIZE_NUM - 1;
    
    var xpath = {
        'ASIN'  : 'id("ASIN")',
        'STAR0' : 'id("handleBuy")/span/span/span[@class="asinReviewsSummary"]/a/span',
        //'STAR1' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[1]/tbody/tr/td[2]/div[2]/span[1]/span',
        //'REVW1' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[1]/tbody/tr/td[2]/div[2]/span[2]/b',
        'STAR1' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[1]/tbody/tr/td[2]/div/span[1]/span',
        'STAR2' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[2]/tbody/tr/td[2]/div/span[1]/span',
        'STAR3' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[3]/tbody/tr/td[2]/div/span[1]/span',
        'REVW1' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[1]/tbody/tr/td[2]/div/span[2]/b',
        'REVW2' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[2]/tbody/tr/td[2]/div/span[2]/b',
        'REVW3' : 'id("customerReviews")/div[@class="content"]/table/tbody/tr[2]/td[1]/table[3]/tbody/tr/td[2]/div/span[2]/b',
        'PRICE' : '//b[@class="priceLarge"]',
        'P_OFF' : 'id("priceBlock")/table[@class="product"]/tbody/tr[3]/td[@class="price"]',
        'MAKER' : 'id("handleBuy")/div//a',
        'TITLE' : 'id("btAsinTitle")',
        'RANK'  : 'id("SalesRank")',
        'ARANK' : 'id("SalesRank")/table/tbody/tr[1]/td[2]/b/a',
        'PIC'   : 'id("prodImageCell")/a/img|id("prodImage")',
        'GRID'  : 'id("handleBuy")/table[3]'
    };


    //  商品ページ以外で処理しない
    if (!$xi(xpath['GRID'],0)) return;


    var i;
    var table, trTop, trMid, trBot;
    var tblPreview, trPreview, tdPreviewL, tdPreviewR;
    var imgProduct, imgStar0, imgStar1, imgStar2, imgStar3;
    var aProduct1, aProduct2, aRank, aDetail;
    var divTitle, divInfo, divReview, divRank;
    var textareaHtml;

    var asin, url, title, maker, price, price_off;
    var poff_bak, star_bak, review_bak, rank_bak, detail_bak;

    /*  商品情報取得  */
    asin = $xi(xpath['ASIN'],0).value;
    url = "http://www.amazon.co.jp/gp/product/" + asin + "/ref=nosim?ie=UTF8&tag=" + getCookie("associateID", ASSOCIATE_ID);
    url = checkUrl(url);
    title = $xi(xpath['TITLE'],0).textContent;
    if (!$xi(xpath['MAKER'],0)) {
        maker = "";
    } else {
        maker = $xi(xpath['MAKER'],0).textContent;
    }
    if (!$xi(xpath['PRICE'],0)) {
        price = "";
    } else {
        price = $xi(xpath['PRICE'],0).textContent;
    }
    if (!$xi(xpath['P_OFF'],0)) {
        price_off = "";
    } else {
        price_off = $xi(xpath['P_OFF'],0).textContent;
        price_off = price_off.match(/[.0-9]+%/);
        price_off = "(" + price_off + " OFF)";
    }
    
    table = document.createElement('table');
    trTop = document.createElement('tr');
    trMid = document.createElement('tr');
    trBot = document.createElement('tr');

    tblPreview = document.createElement('table');
    trPreview  = document.createElement('tr');
    tdPreviewL = document.createElement('td');
    tdPreviewR = document.createElement('td');

    imgProduct = document.createElement('img');
    imgStar0 = document.createElement('img');
    imgStar1 = document.createElement('img');
    imgStar2 = document.createElement('img');
    imgStar3 = document.createElement('img');

    divTitle = document.createElement('div');
    divInfo = document.createElement('div');
    divReview = document.createElement('div');
    divRank = document.createElement('div');
    
    aProduct1 = document.createElement('a');
    aProduct2 = document.createElement('a');
    aRank = document.createElement('a');
    aDetail = document.createElement('a');
    textareaHtml = document.createElement('textarea');
    textareaHtml.cols = "50";
    
    //table.border = "3";
    table.style.borderColor = "AED2EE";
    table.style.borderStyle = "solid";

    table.appendChild(trTop);
    table.appendChild(trMid);
    table.appendChild(trBot);
    
    trMid.appendChild(textareaHtml);
    trBot.appendChild(tblPreview);
    
    /*  アソシエイトリンク用テーブル  */
    tblPreview.className = "AmaGrea";
    tblPreview.appendChild(trPreview);

    function getAssociateLinkCode() {
        return trBot.innerHTML + "\n";
    }
    function hasProductImage() {
        if (!$xi(xpath['PIC'],0)) {
            return false;
        } else {
            return ($xi(xpath['PIC'],0).src.indexOf("no-image-avail-img-map") <= 0);
        }
    }
    function getImgUrl(size) {
        return $xi(xpath['PIC'],0).src.replace(/_[A-Z]+[0-9]+_\.jpg/, "_SS" + INT_SIZE[size] + "_.jpg");
    }
    function appendProductImage(size) {
        //  console.log($xi(xpath['PIC'],0).src);
        if ($xi(xpath['PIC'],0).src.indexOf("no-image-avail-img-map") > 0) return;
        
        trPreview.appendChild(tdPreviewL);
        tdPreviewL.appendChild(aProduct1);
        tdPreviewL.className = "ag_img";
        aProduct1.appendChild(imgProduct);
        
        aProduct1.href = url;
        aProduct1.target = "_blank";
        imgProduct.src = getImgUrl(size);
    }
    function createStar(exp) {
        var img = document.createElement('img');
        img.src = STAR_URL.replace("@", $xi(exp,0).getAttribute("class").match(/([0-9][_0-9]*)\s*$/)[1].replace("_","-"));
        return img;
    }
    function appendProductInfo(poff,star,review,rank,detail) {
        poff_bak = poff;
        star_bak = star;
        review_bak = review;
        rank_bak = rank;
        detail_bak = detail;

        tdPreviewR.innerHTML = '';
        trPreview.appendChild(tdPreviewR);
        tdPreviewR.className = "ag_info";
        tdPreviewR.appendChild(divTitle);
        tdPreviewR.appendChild(divInfo);
        divTitle.appendChild(aProduct2);
        
        aProduct2.href = url;
        aProduct2.target = "_blank";
        aProduct2.textContent = title;
        
        divInfo.innerHTML = maker;
        divInfo.innerHTML += price;
        if (poff) {
            divInfo.innerHTML += price_off;
        }
        if (star) {
            imgStar0 = createStar(xpath['STAR0']);
            divInfo.appendChild(imgStar0);
        }
        
        divReview.innerHTML = '';
        if (review) {
            tdPreviewR.appendChild(divReview);
            
            imgStar1 = createStar(xpath['STAR1']);
            divReview.appendChild(imgStar1);
            divReview.innerHTML += $xi(xpath['REVW1'],0).textContent;
            if (!!$xi(xpath['STAR2'],0)) {
                divReview.innerHTML += "<br>";
                imgStar2 = createStar(xpath['STAR2']);
                divReview.appendChild(imgStar2);
                divReview.innerHTML += $xi(xpath['REVW2'],0).textContent;
            }
            if (!!$xi(xpath['STAR3'],0)) {
                divReview.innerHTML += "<br>";
                imgStar3 = createStar(xpath['STAR3']);
                divReview.appendChild(imgStar3);
                divReview.innerHTML += $xi(xpath['REVW3'],0).textContent;
            }
        }
        
        divRank.innerHTML ='';
        if (rank)
        {
            tdPreviewR.appendChild(divRank);
            
            aRank.href = $xi(xpath['ARANK'],0).href + "&tag=" + getCookie("associateID", ASSOCIATE_ID);
            aRank.href = checkUrl(aRank.href);
            aRank.target = "_blank";
            aRank.textContent = $xi(xpath['ARANK'],0).textContent;
            divRank.appendChild(aRank);
            divRank.innerHTML += ":" + $xi(xpath['RANK'],0).textContent.match(/([0-9]+\u4f4d) ─/)[1] + " (" + getToday() + ")";　//\u4f4d：位
        }
        if (detail)
        {
            tdPreviewR.appendChild(aDetail);
            aDetail.href = url;
            aDetail.target = "_blank";
            aDetail.textContent = "Amazon\u3067\u8a73\u7d30\u3092\u898b\u308b";
            
            tdPreviewR.innerHTML += '<font size="-2"> by <a href="http://d.hatena.ne.jp/Koonies/20091107/AmaGrea">AmaGrea</a></font>';
        }
    }
    if (hasProductImage()) {
        appendProductImage(getCookie("size", DEFAULT_SELECTED_NUM));
    }
    
    poff_bak   = (getCookie("poff", "true")=="true");
    star_bak   = !!$xi(xpath['STAR0'],0);
    review_bak = !!$xi(xpath['STAR1'],0) ? (getCookie("review", "true")=="true") : false;
    rank_bak   = !!$xi(xpath['ARANK'],0) ? (getCookie("rank", "true")=="true")   : false;
    detail_bak = (getCookie("detail", "false")=="true");
    //  console.log(   "priceoff: [" + String(poff_bak)  + "]"
    //             + "\nstar    : [" + String(star_bak)  + "]"
    //             + "\nreview  : [" + String(review_bak)+ "]"
    //             + "\nrank    : [" + String(rank_bak)  + "]");
    
    appendProductInfo(poff_bak, star_bak, review_bak, rank_bak, detail_bak);
    
    textareaHtml.value = getAssociateLinkCode(); //trBot.innerHTML;
    textareaHtml.readOnly = true;
    textareaHtml.addEventListener(
        'click',
        function() {
            textareaHtml.focus();
            textareaHtml.select();
        },true
    );
    
    
    var fontSetting;
    var divAmaID, textAmaID;
    var divSize, radioSize, labelSize;
    var divPOff, radioPOff, labelPOff;
    var divSOff, radioSOff, labelSOff;
    var divROff, radioROff, labelROff;
    var divDOff, radioDOff, labelDOff;
    radioSize = new Array(SIZE_NUM);
    labelSize = new Array(SIZE_NUM);
    
    fontSetting = document.createElement('font');
    fontSetting.size = "-1";
    
    /*  アソシエイト設定  */
    divAmaID = document.createElement('div');
    fontSetting.appendChild(divAmaID);
    textAmaID = document.createElement('input');
    textAmaID.type = "text";
    textAmaID.style.fontFamily = "arial";
    textAmaID.value = getCookie("associateID", ASSOCIATE_ID);
    textAmaID.addEventListener(
        'change',
        function() {
            setCookie("associateID", this.value);
            url = "http://www.amazon.co.jp/gp/product/" + asin + "/ref=nosim?ie=UTF8&tag=" + this.value;
            url = checkUrl(url);
            
            if (hasProductImage()) {
                appendProductImage(getCookie("size", DEFAULT_SELECTED_NUM));
            }
            appendProductInfo(poff_bak, star_bak, review_bak, rank_bak, detail_bak);
            textareaHtml.value = getAssociateLinkCode();
        },true
    );
    
    divAmaID.innerHTML = "+ <b>\u30a2\u30bd\u30b7\u30a8\u30a4\u30c8ID</b>：";　//アソシエイトID
    divAmaID.appendChild(textAmaID);
    
    if (hasProductImage()) {
        /*  画像サイズ設定  */
        divSize = document.createElement('div');
        fontSetting.appendChild(divSize);
        divSize.innerHTML = "+ <b>\u753b\u50cf\u30b5\u30a4\u30ba</b>："; //画像サイズ
        for (i=0; i<SIZE_NUM; i++) {
            radioSize[i] = document.createElement('input');
            radioSize[i].type = "radio";
            radioSize[i].name = "Size";
            radioSize[i].id = "Size" + i;
            radioSize[i].value = i;
            radioSize[i].addEventListener(
                'click',
                function() {
                    setCookie("size", this.value);
                    imgProduct.src = getImgUrl(this.value);
                    textareaHtml.value = getAssociateLinkCode();
                },true
            );
            labelSize[i] = document.createElement('label');
            labelSize[i].textContent = LABEL_SIZE[i] + "(" + INT_SIZE[i] + ")";
            labelSize[i].htmlFor = "Size" + i;
            
            divSize.appendChild(radioSize[i]);
            divSize.appendChild(labelSize[i]);
        }
        radioSize[getCookie("size", DEFAULT_SELECTED_NUM)].defaultChecked = true;
    }
    
    if (!!$xi(xpath["P_OFF"],0)) {
        /*  割引情報  */
        divPOff = document.createElement('div');
        fontSetting.appendChild(divPOff);
        radioPOff = document.createElement('input');
        radioPOff.type = "checkbox";
        radioPOff.name = "POff";
        radioPOff.id = "POff";
        radioPOff.addEventListener(
            'click',
            function() {
                setCookie("poff", this.checked);
                appendProductInfo(this.checked, star_bak, review_bak, rank_bak, detail_bak);
                textareaHtml.value = getAssociateLinkCode();
            },true
        );
        labelPOff = document.createElement('label');
        labelPOff.innerHTML = "<b>\u5272\u5f15\u7387\u306e\u8868\u793a</b>"; //割引率の表示
        labelPOff.htmlFor = "POff";
        
        divPOff.appendChild(radioPOff);
        divPOff.appendChild(labelPOff);
        radioPOff.defaultChecked = poff_bak;
    }
    
    if (!!$xi(xpath["STAR1"],0)) {
        /*  レビュー情報  */
        divSOff = document.createElement('div');
        fontSetting.appendChild(divSOff);
        radioSOff = document.createElement('input');
        radioSOff.type = "checkbox";
        radioSOff.name = "SOff";
        radioSOff.id = "SOff";
        radioSOff.addEventListener(
            'click',
            function() {
                setCookie("review", this.checked);
                appendProductInfo(poff_bak, star_bak, this.checked, rank_bak, detail_bak);
                textareaHtml.value = getAssociateLinkCode();
            },true
        );
        labelSOff = document.createElement('label');
        labelSOff.innerHTML = "<b>\u30ec\u30d3\u30e5\u30fc\u306e\u8868\u793a</b>"; //レビューの表示
        labelSOff.htmlFor = "SOff";
        divSOff.appendChild(radioSOff);
        divSOff.appendChild(labelSOff);
        radioSOff.defaultChecked = review_bak;
    }
    
    if (!!$xi(xpath["RANK"],0)) {
        /*  ランキング情報  */
        divROff = document.createElement('div');
        fontSetting.appendChild(divROff);
        radioROff = document.createElement('input');
        radioROff.type = "checkbox";
        radioROff.name = "ROFF";
        radioROff.id = "ROFF";
        radioROff.addEventListener(
            'click',
            function() {
                setCookie("rank", this.checked);
                appendProductInfo(poff_bak, star_bak, review_bak, this.checked, detail_bak);
                textareaHtml.value = getAssociateLinkCode();
            },true
        );
        labelROff = document.createElement('label');
        labelROff.innerHTML = "<b>\u30e9\u30f3\u30ad\u30f3\u30b0\u60c5\u5831\u306e\u8868\u793a</b>"; //ランキング情報の表示
        labelROff.htmlFor = "ROFF";
        divROff.appendChild(radioROff);
        divROff.appendChild(labelROff);
        radioROff.defaultChecked = rank_bak;
    }
    
    /*  詳細リンク  */
    divDOff = document.createElement('div');
    fontSetting.appendChild(divDOff);
    radioDOff = document.createElement('input');
    radioDOff.type = "checkbox";
    radioDOff.name = "DOff";
    radioDOff.id = "DOff";
    radioDOff.addEventListener(
        'click',
        function() {
            setCookie("detail", this.checked);
            appendProductInfo(poff_bak, star_bak, review_bak, rank_bak, this.checked);
            textareaHtml.value = getAssociateLinkCode();
        },true
    );
    labelDOff = document.createElement('label');
    labelDOff.innerHTML += "<b>\u8a73\u7d30\u30ea\u30f3\u30af\u306e\u8868\u793a</b>"; //詳細を見るの表示
    labelDOff.htmlFor = "DOff";
    divDOff.appendChild(radioDOff);
    divDOff.appendChild(labelDOff);
    radioDOff.defaultChecked = detail_bak;



    
    trTop.innerHTML = '<b><font color="990000"><a href="http://userscripts.org/scripts/show/61416" target="_blank" title="\u30b9\u30af\u30ea\u30d7\u30c8\u306e\u6700\u65b0\u7248\u3092\u30c1\u30a7\u30c3\u30af">AmaGrea</a></font></b><br>'; //スクリプトの最新版をチェック
    trTop.appendChild(fontSetting);
    
    /*  処理時間  */
    var lblTime = document.createElement('label');
    var end_time = new Date();
    lblTime.textContent = (String(end_time - start_time) + "[ms]");
    //fontSetting.appendChild(lblTime);
    
    /*  出力先  */
    var box = $xi(xpath["GRID"],0);
    box.appendChild(table);
    
    if (textAmaID.value == ASSOCIATE_ID) {
        textAmaID.focus();
        textAmaID.select();
        //alert("アソシエイトIDを設定してください\n(設定した値は保存されます)");
        alert("\u30a2\u30bd\u30b7\u30a8\u30a4\u30c8ID\u3092\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\n(\u8a2d\u5b9a\u3057\u305f\u5024\u306f\u4fdd\u5b58\u3055\u308c\u307e\u3059)");
    }
})();
