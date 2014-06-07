// ==UserScript==
// @name       		湖南科技大学综合教务管理系统 非IE内核浏览器脚本
// @namespace  		
// @version    		1.6
// @description  	本脚本可以让你在湖南科技大学综合教务管理系统上使用非IE内核的浏览器来浏览
// @grant      		GM_xmlhttpRequest
// @grant      		unsafeWindow
// @match      		http://211.67.208.69/kdjw/framework/*
// @match      		http://211.67.208.67/xxjw/framework/*
// @match      		http://xxjw.hnust.cn/xxjw/framework/*
// @match      		http://kdjw.hnust.cn/kdjw/framework/*
// @run-at		document-end
// @copyright  		2013, 叶剑飞
// ==/UserScript==

var runmyscript = false;

unsafeWindow.SelectNodes = function(xmlDoc, elementPath)
{
    if(window.ActiveXObject)
    {
        return xmlDoc.selectNodes(elementPath);
    }
    else
    {
        var xpe = new XPathEvaluator();
        var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
        var result = xpe.evaluate(elementPath, xmlDoc, nsResolver, 0, null);
        var found = [];
        var res;
        while  (res = result.iterateNext())
            found.push(res);
        return found;
    }
}

//初始化菜单参数
unsafeWindow.menuItems = new Array();
unsafeWindow.topMenuItems = new Array();
unsafeWindow.linkItems = new Array();
unsafeWindow.userId="";
unsafeWindow.topmenu;//用来保存顶级菜单
unsafeWindow.topMenuLength = 0;
unsafeWindow.menuLength = 0;
unsafeWindow.linkLength = 0;
//父节点ID，本身ID，权限名称，权限描述，权限路径，权限图片
unsafeWindow.send_request = function (url,SystemBh) 
{ 
    http_request = false; 
    if( window.XMLHttpRequest ) 
    { 
        http_request = new XMLHttpRequest(); 
        if (http_request.overrideMimeType)
        { 
            http_request.overrideMimeType("text/xml"); 
        } 
    } 
    else if (window.ActiveXObject) 
    { 
        try 
        { 
            http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
        } 
        catch (e) 
        { 
            try 
            { 
                http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
            } 
            catch (ei) 
            {} 
        } 
    } 
        if (!http_request) 
        { 
            window.alert("不能创建对象!"); 
            return false; 
        }
    
    try 
    {
        http_request.open("POST",url, false); 
        
        http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        
        http_request.send(null); 
        
        var tmpxml = http_request.responseXML;
        
        //加载顶层菜单开始
        //window.alert(http_request.responseText);
        var topXml = SelectNodes(tmpxml, "/Menus/topMenus/Menu");//tmpxml.selectNodes("/Menus/topMenus/Menu");
        //window.alert(topXml.length);
        for(i=0;i<topXml.length;i++)
        {
            //window.alert(i);
            topMenuItems[topMenuLength] = new Array();
            topMenuItems[topMenuLength][0] = topXml[i].attributes.getNamedItem("parentid").value;
            topMenuItems[topMenuLength][1] = SystemBh + "_" + topXml[i].attributes.getNamedItem("id").value;
            topMenuItems[topMenuLength][2] = topXml[i].attributes.getNamedItem("name").value;
            topMenuItems[topMenuLength][3] = topXml[i].attributes.getNamedItem("title").value;
            topMenuItems[topMenuLength][4] = topXml[i].attributes.getNamedItem("path").value;
            topMenuItems[topMenuLength][5] = topXml[i].attributes.getNamedItem("imageUrl").value;
            topMenuItems[topMenuLength][6] = topXml[i].attributes.getNamedItem("defaultPage").value;
            topMenuLength++;
        }
        
        //加载顶层菜单结束
        
        //加载一层菜单开始
        var menuXml = SelectNodes(tmpxml, "/Menus/Level1Menus/Menu");
        for(i=0;i<menuXml.length;i++)
        {
            menuItems[menuLength] = new Array();
            menuItems[menuLength][0] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("parentid").value;
            menuItems[menuLength][1] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("id").value;
            menuItems[menuLength][2] = menuXml[i].attributes.getNamedItem("name").value;
            menuItems[menuLength][3] = menuXml[i].attributes.getNamedItem("title").value;
            menuItems[menuLength][4] = menuXml[i].attributes.getNamedItem("path").value;
            menuItems[menuLength][5] = menuXml[i].attributes.getNamedItem("imageUrl").value;
            menuLength++;
        }
        
        //加载一层菜单结束
        
        //加载二层菜单开始
        var linkXml = SelectNodes(tmpxml, "/Menus/Level2Menus/Menu");
        for(i=0;i<linkXml.length;i++)
        {
            linkItems[linkLength] = new Array();
            linkItems[linkLength][0] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("parentid").value;
            linkItems[linkLength][1] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("id").value;
            linkItems[linkLength][2] = linkXml[i].attributes.getNamedItem("name").value;
            linkItems[linkLength][3] = linkXml[i].attributes.getNamedItem("title").value;
            linkItems[linkLength][4] = linkXml[i].attributes.getNamedItem("path").value;
            linkItems[linkLength][5] = linkXml[i].attributes.getNamedItem("imageUrl").value;
            linkLength++;
        }
        
        //加载二层菜单结束
    }
    catch(eii)
    {alert("加载编号为"+SystemBh+"的应用系统失败，可能是网络延迟问题！");}
    runmyscript = true;
    
} 



unsafeWindow.tmptbody = "";
