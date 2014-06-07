// ==UserScript==
// @name           tag error check 
// @namespace      https://github.com/zythum/tagError
// @description    check html tags
// @version        0.01
// @updateURL      https://userscripts.org/scripts/source/386854.meta.js
// @downloadURL    https://userscripts.org/scripts/source/386854.user.js
// @include        http://*

// ==/UserScript==
(function(window,document){
    var  aWindow
        ,output
        ,msg
        ,tool
        ,indentPxDOM
        ,singleTagDOM
        ,toolurlDOM
        ,toolurlBlockDOM
        ,toolcodeDOM
        ,toolcodeBlockDOM
        ,urlOrCode = 'url'
    var time = [
         (new Date()).getTime().toString()
        ,Math.random().toString().replace('.', '')
        ,''
    ].join('_')
    var style = {
        tool: [
             'padding:10px'
            ,'margin:0'
            ,'color:#eee'           
            ,'position:fixed'
            ,'_position:absolute'
            ,'right:0'
            ,'top:0'
            ,'width:300px'
            ,'background:#333'
            ,'font-family: arial, sans-serif'
            ,'box-shadow:0 0 3px #333'
            ,'text-align:left'
            ,'z-index:10000000'
            ,'border-radius:3px'
        ]
        ,toolbreak: [
             'padding:10px 0 0 0'
            ,'margin:0'         
            ,'text-align:left'
            ,'line-height:14px'
            ,'color:#eee'
            ,'clear:both'
        ]
        ,toolspan: [
             'padding:0'
            ,'margin:0'
            ,'font-size:14px'
            ,'color:#eee'
            ,'line-height:16px'
            ,'display:block'
            ,'float:left'
            ,'width:80px'
        ]
        ,toolinput: [
             'padding:0'
            ,'margin:0 0 0 90px'
            ,'color:#eee'
            ,'line-height:16px'
            ,'font-size:14px'
            ,'width:180px'
            ,'background:#333'
            ,'border:none'
            ,'text-align:left'
            ,'display:block'
        ]
        ,toolarea: [
             'padding:5px'
            ,'margin:0 0 0 90px'
            ,'color:#333'
            ,'background:#eee'
            ,'font-size:14px'
            ,'text-align:left'
            ,'border:none'
            ,'height:100px'
            ,'width:180px'
            ,'display:block'
            ,'border-radius:3px'
        ]
        ,toolbtn: [
             'padding:0'
            ,'margin:0 auto'
            ,'color:#eee'
            ,'font-size:16px'
            ,'width:200px'
            ,'text-align:center'
            ,'width:150px'
            ,'height:30px'
            ,'line-height:30px'
            ,'box-shadow:0 0 2px #000'
            ,'cursor:pointer'
            ,'background-image:-webkit-linear-gradient(top, #555 0%,#444 100%)'
            ,'background-image:-moz-linear-gradient(top, #555 0%,#444 100%)'
            ,'background-image:-o-linear-gradient(top, #555 0%,#444 100%)'
            ,'background-image:linear-gradient(top, #555 0%,#444 100%)'
            ,'border-radius:3px'
        ]
        ,toollittlebtn: [
             'padding:0'
            ,'margin:0 0 0 90px'
            ,'color:#eee'
            ,'font-size:14px'
            ,'width:180px'
            ,'text-align:center'
            ,'width:150px'
            ,'height:20px'
            ,'line-height:20px'
            ,'box-shadow:0 0 2px #000'
            ,'cursor:pointer'
            ,'background-image:-webkit-linear-gradient(top, #555 0%,#444 100%)'
            ,'background-image:-moz-linear-gradient(top, #555 0%,#444 100%)'
            ,'background-image:-o-linear-gradient(top, #555 0%,#444 100%)'
            ,'background-image:linear-gradient(top, #555 0%,#444 100%)'
            ,'border-radius:3px'
        ]
        ,toolclose: [
             'padding:0'
            ,'margin:0'
            ,'position:absolute'
            ,'top:0'
            ,'left:-28px'
            ,'width:30px'
            ,'background:#333'
            ,'text-align:center'
            ,'height:30px'
            ,'line-height:30px'
            ,'font-size:18px'
            ,'cursor:pointer'
        ]
        ,line: [
            ,'color:#eee'
            ,'word-break:break-all'
            ,'min-height:18px'
            ,'line-height:18px'         
            ,'border-left:3px solid #999'
            ,'letter-spacing:2px'
        ]
        ,lineout: [
             'min-height:18px'
            ,'clear:both'
            ,'background:#333'
        ]
        ,lineoutodd: [
             'min-height:18px'
            ,'clear:both'
            ,'background:#383838'
        ]
        ,linenum: [
             'width:60px'
            ,'float:left'
            ,'height:18px'
            ,'line-height:18px'
            ,'color:#aaa'
        ]
        ,linecontent: [
             'margin-left:62px'
            ,'border-left:1px solid #666'
        ]
        ,error: [
            'background:red'
        ]
        ,body: [
             'margin:0'
            ,'padding:0'
            ,'background:#333'
            ,'font-family: arial, sans-serif'
            ,'font-size:14px'
        ]
        ,out: [         
             'background:#333'
            ,'overflow:auto'
            ,'border:10px solid #333'
            ,'box-shadow:0 0 3px #333'
            ,'padding:30px 0 0 0'
        ]
        ,msg: [
             'padding:10px'
            ,'margin:0 0 10px 0'
            ,'height:40px'
            ,'position:fixed'
            ,'top:0'
            ,'left:0'
            ,'right:0'
            ,'box-shadow:0 0 10px #000'
            ,'color:red'
            ,'background-image:-webkit-linear-gradient(top, #444 0%,#333 100%)'
            ,'background-image:-moz-linear-gradient(top, #444 0%,#333 100%)'
            ,'background-image:-o-linear-gradient(top, #444 0%,#333 100%)'
            ,'background-image:linear-gradient(top, #444 0%,#333 100%)'
            ,'height:16px'
            ,'line-height:16px'
            ,'border-bottom:1px solid #999'
            ,'letter-spacing:2px'
            ,'cursor:pointer'
        ]
    }
    var html = {
        tool: ''+
            '<div style="'+ style.toolbreak.join(';')+';' +'">'+
                '<span style="'+ style.toolspan.join(';')+';' +'">&#x663E;&#x793A;&#x7684;&#x7F29;&#x8FDB;:</span>'+
                '<input type="text" style="'+ style.toolinput.join(';')+';' +'" id="'+time+'indent" value="20">'+
            '</div>'+
            '<div id="'+time+'url_block" style="'+ style.toolbreak.join(';')+';' +'">'+
                '<span style="'+ style.toolspan.join(';')+';' +'">&#x68C0;&#x67E5;&#x7684;&#x5730;&#x5740;:</span>'+
                '<input type="text" style="'+ style.toolinput.join(';')+';' +'" id="'+time+'url" value="'+window.location.href+'">'+
                '<div style="'+ style.toolinput.join(';')+';' +'font-size:12px;paddng-top:5px;color:#666" >! &#x5730;&#x5740;&#x8BF7;&#x4E0D;&#x8981;&#x8DE8;&#x533A;</div>'+
            '</div>'+
            '<div id="'+time+'code_block" style="'+ style.toolbreak.join(';')+';' +'display:none">'+
                '<span style="'+ style.toolspan.join(';')+';' +'">&#x68C0;&#x67E5;&#x7684;&#x4EE3;&#x7801;:</span>'+
                '<textarea id="'+time+'code" style="'+ style.toolarea.join(';')+';' +'"></textarea>'+
            '</div>'+
            '<div style="'+ style.toolbreak.join(';')+';' +'">'+
                '<div id="'+time+'check_toggle" style="'+ style.toollittlebtn.join(';')+';' +'">&#x5207;&#x6362;&#x68C0;&#x67E5;&#x5F62;&#x5F0F;</div>'+
            '</div>'+
            '<div style="'+ style.toolbreak.join(';')+';' +'">'+
                '<span style="'+ style.toolspan.join(';')+';' +'">&#x5408;&#x6CD5;&#x5355;&#x6807;&#x7B7E;:</span>'+
                '<textarea id="'+time+'single_tag" style="'+ style.toolarea.join(';')+';' +'">area, base, basefont, br, col, frame, hr, img, input, isindex, link, meta, param, embed</textarea>'+
            '</div>'+
            '<div style="'+ style.toolbreak.join(';')+';' +'">'+
                '<div id="'+time+'check_btn" style="'+ style.toolbtn.join(';')+';' +'">&#x68C0;&#x67E5;&#x6807;&#x7B7E;</div>'+
            '</div>'+
            '<div id="'+time+'check_close" style="'+ style.toolclose.join(';')+';' +'">x</div>'
    }
    var id = function(id,parent){
        parent = parent || document
        return parent.getElementById(time+id)
    }
    var ajax = function (url, options){     
        var  request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
            ,type = options.type || 'GET'
        options = options || {}
        request.open(type, url, true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        request.send()
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200 && options.success){
                options.success(request.responseText)
            }else if(options.fail){
                options.fail(request.responseText)
            }
        }
    }
    var addEvent = function(node, type, func){
        if( (typeof type).toUpperCase() == 'FUNCTION' ){
            func = type
            type = 'click'
        }
        node.addEventListener ? 
            node.addEventListener(type, func, false) :
            node.attachEvent('on' + type, func)
    }
    var handle = (function(conf){
        var //每个时间片处理的字符数
             pieceLength = 500
            //每个时间片时间
            ,pieceTime = 5
            //缩进的大小
            ,indentPx = 20
            //==================================
            //单标签
            ,singleTag = [
                 'area'
                ,'base'
                ,'basefont'
                ,'br'
                ,'col'
                ,'frame'
                ,'hr'
                ,'img'
                ,'input'
                ,'isindex'
                ,'link'
                ,'meta'
                ,'param'
                ,'embed'
            ]
            /*=================================
            * 执行队列。为了浏览器不会卡死
            arr = [{
                 func: function(){}
                ,param: [1,2,4]
             }...]
            */
            ,execLine = function(arr, callback){
                var  i = 0
                    ,len = arr.length
                    ,that = this
                    ,loop = function(){
                        if(i < arr.length){
                            arr[i].func.apply(that, arr[i].param)
                            setTimeout(loop ,pieceTime)
                            i = i+1
                        }else{
                            return callback()
                        }
                    }
                loop()
            }
            /*===============================
            * 组织标签数组,输出
            [
                "<!DOCTYPE HTML>",
                "",
                "<html lang="zh-CN">",
                "",
                "<head>",
                "",
                "<meta charset="UTF-8">",
                "",
                "<title>",
                "AGreatBeginning",
                "</title>",
                "",
                "<link rel="stylesheet" type="text/css" href="style/base.css" media="all" />",
                "",
                "<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">",
                "",
                "<link rel="shortcut icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">",
                ...
            ]
            */  
            ,makeTagArr = function(htmlArr){
                var  tagArr = []
                    ,chars = {
                         start: '\<'
                        ,end: '\>'
                        ,quot: '\''
                        ,doubleQuot: '\"'
                    }
                    ,state = {
                         inTag: false
                        ,inQuot: false
                        ,inDoubleQuot: false
                    }
                    ,sortChar = function(aChar){
                        if(aChar == chars.start && state.inDoubleQuot == false && state.inQuot == false){
                            tagArr.push('')
                            tagArr[ tagArr.length-1 ] += aChar
                            state.inTag = true
                            return
                        }
                        if(aChar == chars.end && state.inTag == true && state.inDoubleQuot == false && state.inQuot == false){
                            tagArr[ tagArr.length-1 ] += aChar
                            tagArr.push('')
                            state.inTag = false
                            return
                        }
                        if(aChar == chars.quot && state.inTag == true && state.inDoubleQuot == false && state.inQuot == false){
                            tagArr[ tagArr.length-1 ] += aChar
                            state.inQuot = true
                            return
                        }
                        if(aChar == chars.quot && state.inTag == true && state.inQuot == true){
                            tagArr[ tagArr.length-1 ] += aChar
                            state.inQuot = false
                            return
                        }
                        if(aChar == chars.doubleQuot && state.inTag == true && state.inDoubleQuot == false && state.inQuot == false){
                            tagArr[ tagArr.length-1 ] += aChar
                            state.inDoubleQuot = true
                            return
                        }
                        if(aChar == chars.doubleQuot && state.inTag == true && state.inDoubleQuot == true){
                            tagArr[ tagArr.length-1 ] += aChar
                            state.inDoubleQuot = false
                            return
                        }       
                        tagArr[ tagArr.length-1 ] += aChar
                    }
                    ,len = htmlArr.length
                    ,i
                    ,aChar
                for(i=0;i<len;i++){
                    aChar = htmlArr[i]
                    aChar = (aChar == undefined ? htmlArr.substring(i, i+1) : aChar)
                    sortChar(aChar)
                }
                return tagArr
            }
            /*================================================
            * 检查标签数组
            */
            
            ,check = function(tagArr){
                var  i=0
                    ,j=0
                    ,len=tagArr.length
                    ,aTag
                    ,prevTag
                    ,match
                    ,singleTagLength = singleTag.length
                    ,isSingleTag
                    ,indentArr = []
                    ,typeArr = []
                    ,checkStorage = [
                    //{
                    // tagName:
                    //,content:
                    //,line:
                    //}
                    ]
                    ,checkExp = {
                         startTag: /^<([-A-Za-z0-9_]+)((?:\s+[\w\-\:\_]+(?:[\s|]*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/
                        ,endTag: /^<\/([-A-Za-z0-9_]+)[^>]*>/
                    }
                    ,hasError = false
                    ,errorLine = []
                for(i; i<len; i++){                 
                    isSingleTag = false
                    aTag = tagArr[i]
                    //如果开始标签
                    if( match = aTag.match(checkExp.startTag) ){
                        typeArr[i] = 'tag'
                        //如果单标签
                        if(/\/\>$/i.test(aTag)){
                            isSingleTag = true;
                        }
                        for(j=0; j<singleTagLength; j++){                           
                            if(match[1] == singleTag[j]){
                                isSingleTag = true;
                                break;
                            }
                        }
                        if(isSingleTag == true){
                            indentArr.push(checkStorage.length)
                            continue
                        }
                        //不是单标签
                        indentArr.push(checkStorage.length)
                        checkStorage.push({
                             tagName: match[1]
                            ,content: aTag
                            ,line: i
                        })              
                        continue
                    }
                    //如果结束标签
                    if( match = aTag.match(checkExp.endTag) ){
                        typeArr[i] = 'tagend'           
                        prevTag = checkStorage[checkStorage.length-1]
                        if(!prevTag){
                            hasError = true
                            errorLine = [i]
                            break
                        }else if(prevTag.tagName != match[1]){
                            hasError = true
                            errorLine = [prevTag.line, i]
                            break
                        }else{
                            checkStorage.pop()
                            indentArr.push(checkStorage.length)
                            continue
                        }
                    }
                    //如果是文字         
                    indentArr.push(checkStorage.length)
                    typeArr[i] = 'text'
                }
                if(i==len && checkStorage.length != 0){
                    hasError = true
                    errorLine = [ checkStorage[checkStorage.length-1].line ]
                }
                return  {
                     hasError: hasError
                    ,errorLine: errorLine
                    ,errorContent: tagArr[errorLine]
                    ,indentArr: indentArr
                    ,typeArr : typeArr
                }
            }
            ,show = function(out, tagArr, err){
                var  i
                    ,j
                    ,errorLineNum = []
                    ,len = tagArr.length
                    ,aLine
                    ,aLineout
                    ,aLinenum
                    ,aLinecontent
                    ,className
                    ,type
                    ,isError = function(line){
                        var  errorLine
                            ,errorLineLength
                            ,i
                        if(err){
                            errorLine = err.errorLine
                            errorLineLength = errorLine.length
                            for(i=0 ;i<errorLineLength; i++){
                                if(errorLine[i] == line){
                                    return true
                                }
                            }               
                        }
                        return false
                    }
                for(i=0,j=1; i<len; i++){                   
                    if(!/^[\ |\r|\n|\t]*$/.test(tagArr[i])){
                        aLine = document.createElement('div')
                        aLineout = document.createElement('div')
                        aLinenum = document.createElement('div')
                        aLinecontent = document.createElement('div')
                        aLine.appendChild( document.createTextNode(tagArr[i]) )
                        aLine.style.cssText += ';'+( !isError(i) ? style.line.join(';') : style.line.concat(style.error).join(';') )+';'
                        type = err.typeArr[i]
                        aLine.style.cssText += ';border-left:3px solid '+ (type=='tag'?'blue':type=='tagend'?'blue':type=='text'?'green':'#999') +';'
                        if(err && err.indentArr && err.indentArr[i]){
                            aLine.style.marginLeft = err.indentArr[i]*indentPx + 'px'
                        }
                        aLinenum.style.cssText += ';'+style.linenum.join(';')+';'
                        aLineout.style.cssText += ';'+( j%2==0 ? style.lineout.join(';') : style.lineoutodd.join(';') )+';'
                        aLinecontent.style.cssText += ';'+style.linecontent.join(';')+';'
                        aLinenum.innerHTML = j
                        aLineout.id = j
                        aLineout.appendChild(aLinenum)
                        aLineout.appendChild(aLinecontent)
                        aLinecontent.appendChild(aLine)                     
                        out.appendChild(aLineout)
                        if( isError(i) ){
                            errorLineNum.push(j)
                        }
                        j++
                    }
                }
                msg.errorLine = errorLineNum[0]
                msg.innerHTML = err ? (err.hasError ? 'HAS TAG ARROR AT LINE: '+errorLineNum.join(', ') : 'NO TAG ERROR') : ''
            }

            //=================================================
            //start
            ,parseParam = function(conf){
                if( (typeof conf).toUpperCase() == 'OBJECT' ){
                    pieceLength = conf.pieceLength || pieceLength
                    //每个时间片时间
                    ,pieceTime = conf.pieceTime || pieceTime
                    //缩进的大小
                    ,indentPx = conf.indentPx || indentPx
                    //单标签
                    ,singleTag = conf.singleTag || singleTag
                }
            }
            ,parse = function(input,output,conf){
                var html = input
                    ,out = output
                    ,tagArr = []
                    ,execArr = []
                    ,htmlLength
                    ,pieceNum                   
                    ,err
                    ,i
                parseParam(conf)
                htmlLength = html.length
                pieceNum = htmlLength/pieceLength + 1
                html = html
                    .replace(/<script[^>]*?>(.|\n|\r|\ )*?<\/script>/gim,'<script>...</script>')
                    .replace(/<style[^>]*?>(.|\n|\r|\ )*?<\/style>/gim,'<style>...</style>')
                    .replace(/<textarea[^>]*?>(.|\n|\r|\ )*?<\/textarea>/gim,'<textarea>...</textarea>')
                    .replace(/<!--[\w\W\r\n]*?-->/gim,'<!--...-->')
                tagArr = makeTagArr(html)
                err = check(tagArr)
                show(out,tagArr, err)
            }
        return {
            parse : parse
        }
    })()    
    var build = function(){     
        aWindow = window.open()
        //修改document 不然ie傻x
        document = aWindow.document
        output = document.createElement('div')
        msg = document.createElement('div')
        msg.style.cssText += ';'+style.msg.join(';')+';'
        output.style.cssText += ';'+style.out.join(';')+';'
        document.body.style.cssText += ';'+style.body.join(';')+';' 
        msg.innerHTML = 'GETING SOURSE...'      
        output.appendChild(msg)
        document.body.appendChild(output)
        addEvent(msg,function(){
            if(msg.errorLine){
                var errorLine = aWindow.document.getElementById(msg.errorLine)
                var top = errorLine ? errorLine.offsetTop : 0
                aWindow.scroll(0, top-100)
            }
        })
    }   
    var parse = function(conf){
        if(urlOrCode == 'url'){
            ajax(conf.url,{
                 success: function(html){
                    msg.innerHTML = 'CHECKING...'
                    handle.parse(html,output,conf)
                }
            })
        }else if(urlOrCode == 'code'){
            handle.parse(toolcodeDOM.value,output,conf)
        }
    }   
    var getConf = function(){
        return {
             url : toolurlDOM.value
            ,indentPx: indentPxDOM.value
            ,singleTag: singleTagDOM.value.replace(/[\n|\t|\r\ ]/g, '').split(',')
        }
    }
    var run = function(){
        build();
        parse(getConf());
    }
    var toggle = function(){
        if(urlOrCode == 'url'){
            toolurlBlockDOM.style.display = 'none'
            toolcodeBlockDOM.style.display = ''
            urlOrCode = 'code'
        }else if(urlOrCode == 'code'){
            toolurlBlockDOM.style.display = ''
            toolcodeBlockDOM.style.display = 'none'
            urlOrCode = 'url'
        }
    }
    var hideTool = function(){
        window.document.body.removeChild(tool)
        window.tagErrorToolBarByZythumIsShow = undefined
    }
    var showTool = function(){
        tool = document.createElement('div')        
        tool.style.cssText += ';'+style.tool.join(';')+';'
        tool.innerHTML = html.tool
        document.body.appendChild(tool)
        indentPxDOM = id('indent')
        singleTagDOM = id('single_tag')
        toolcloseDOM = id('check_close')
        toolurlDOM = id('url')
        toolcodeDOM = id('code')
        toolurlBlockDOM = id('url_block')
        toolcodeBlockDOM = id('code_block')
        addEvent(id('check_btn'), run)
        addEvent(id('check_close'), hideTool)
        addEvent(id('check_toggle'), toggle)
        window.tagErrorToolBarByZythumIsShow = true
    }
    window.tagErrorToolBarByZythumIsShow != true && showTool()
})(window,document)