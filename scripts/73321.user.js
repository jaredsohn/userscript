///*
// ==UserScript==
// @name         Ikariam Lista de Links(css)
// @version	     0.01 (beta)
// @namespace    HaShiShi
// @description  CSS for Ikariam Lista de Links
//
// ==/UserScript==
///*end_header*/

#FakeBody {
	font-family:arial,helvetica,verdana,sans-serif;
	font-size: 12px;
}
#FakeBody table{border: none;}

.drag{}
.dragTarget{}
.noDrag{}

.contextDiv{
	padding: 0px;
}
.liContextMenu{
	vertical-align: middle;
	background-color: #dceafa;
	-moz-user-select: none;
	cursor: pointer;
	padding-right: 3px;
}
.liContextMenu:hover{
	background-color: #fff8a8;
}

.buttonImg_Disabled{
	display: inline-block;
	background-color: #ceddf8;
	border: 3px double #3366cc;
	border-top-color: #6699ff;
	border-left-color: #6699ff;
	padding: 3px;
	margin: 1px;
	cursor: pointer;
	text-align: center;
	vertical-align: middle;
	-moz-user-select: none;
	cursor: pointer;
}
.buttonImg{
	display: inline-block;
	background-color: #dceafa;
	border: 3px double #3366cc;
	border-top-color: #6699ff;
	border-left-color: #6699ff;
	padding: 3px;
	margin: 1px;
	vertical-align: middle;
	cursor: pointer;
	text-align: center;
	-moz-user-select: none;
	cursor: pointer;
}
.buttonImg:active{
	padding: 4px 2px 2px 4px;
	border: 3px double #6699ff;
	border-top-color: #3366cc;
	border-left-color: #3366cc;
}
.buttonImg:hover{
	background-color: #ecf3fb;
}

.buttonTxt_Disabled{
	display: inline-block;
	background-color: #ceddf8;
	border: 3px double #3366cc;
	border-top-color: #6699ff;
	border-left-color: #6699ff;
	white-space:nowrap;
	color: #e7e7e7;
	font-weight: bold;
	vertical-align: middle;
	text-align: center;
	-moz-user-select: none;
	cursor: pointer;
	padding: 3px;
	margin: 1px;
}
.buttonTxt{
	display: inline-block;
	background-color: #dceafa;
	border: 3px double #3366cc;
	border-top-color: #6699ff;
	border-left-color: #6699ff;
	color: #000066;
	font-weight: bold;
	text-align: center;
	vertical-align: middle;
	-moz-user-select: none;
	cursor: pointer;
	padding: 3px;
	margin: 1px;
}
.buttonTxt:active{
	padding: 4px 2px 2px 4px;
	border: 3px double #6699ff;
	border-top-color: #3366cc;
	border-left-color: #3366cc;
}
.buttonTxt:hover{background-color: #ecf3fb;}

.imgIco{
	display: inline-block;
	vertical-align: middle;
	padding: 3px;
	margin: 1px;
	width: 20px;
	height: 20px;
}
.imgIcoList{
	display: inline;
	vertical-align: middle;
	padding: 3px;
	margin: 1px;
	width: 20px;
	height: 20px;
}
.imgIcoList:hover{
	background-color: #fff8a8;
	margin: 0px;
	border: 1px solid #000066;
}
.imgIcoListSelected{
	display: inline;
	vertical-align: middle;
	padding: 3px;
	background-color: #6666ff;
	border: 1px solid #fff8a8;
	width: 20px;
	height: 20px;
}

#llButtonBox{
	text-align: right;
	position: absolute;
	margin: 0px 29px -18px 939px;
	z-index: 31;
}
#btnLL_Action{
	background-color: #e6e6e6;
	padding: 3px;
	cursor: pointer;
	border: 3px double #3366cc;
	border-top-color: #6699ff;
	border-left-color: #6699ff;
}
#btnLL_Action:active{
	padding: 4px 2px 2px 4px;
	border: 3px double #6699ff;
	border-top-color: #3366cc;
	border-left-color: #3366cc;
}
#btnLL_Action:hover{
	background-color: #ffffff;
}

#linkGetCurrentUrl{color: #ffffff;}
#linkGetCurrentUrl:hover{color: #ffff00;}

.frmTab{}
.frmTdTitulo{
	text-align: center;
	background-color: #ceddf8;
	color: #003366;
	font-weight: bold;
	vertical-align: top;
	padding: 3px;
	border: 1px solid #000066;
}
.frmTdExplicacao{
	text-align: center;
	background-color: #ceddf8;
	color: #003366;
	font-weight: bold;
	vertical-align: top;
	padding: 3px;
	border: 1px solid #000066;
}
.frmTdLabel{
	text-align: right;
	background-color: #ceddf8;
	color: #003366;
	font-weight: bold;
	vertical-align: top;
	padding: 3px;
	border: 1px solid #000066;
}
.frmTdCampo{
	text-align: left;
	background-color: #6699cc;
	vertical-align: top;
	padding: 3px;
	border: 1px solid #000066;
}
.frmTdTools{
	text-align: center;
	background-color: #6699cc;
	padding: 3px;
	border: 1px solid #000066;
}
.frmCampo{background-color: #FF0000;}

.clsBoxLista{
	width: 300px;
	height: 200px;
	background-color: #dceafa;
	overflow-y: scroll;
	overflow-x: auto;
	margin: 3px;
	padding: 5px;
	-moz-user-select: none;
}
.clsBoxLista hr{
	color: #000066;
	width: 100%;
}

.listTab{width: 100%;}
.listTrSelected{background-color: #6666ff;}
.listTr1{background-color: #acc6f5;}
.listTr1:hover{background-color: #fff8a8;}
.listTr2{background-color: #ceddf8;}
.listTr2:hover{background-color: #fff8a8;}
.listTd{padding: 3px; cursor: pointer;}


.linksDiv{
	background-color: #ceddf8;
	
	max-width: 450px;
	max-height: 550px;
	
	overflow-x: auto;
	overflow-y: scroll;
}
.linksTable{width: 100%;}
.linksTdTree{
	vertical-align: middle;
	padding-left: 3px;
	padding-right: 3px;
	background-color: #ceddf8;
}
.linksImgTree{
	vertical-align: middle;
	width: 12px;
	height: 12px;
}
.linksTdIcon{
	vertical-align: middle;
	padding-right: 3px;
	background-color: #ceddf8;
}
.linksImgIcon{
	vertical-align: middle;
	width: 20px;
	height: 20px;
}
.linksTdGrupoDescr{
	width: 100%;
	background-color: #003366;
	color: #ffffff;
	font-weight: bold;
	padding: 5px;
	cursor: default;
	border-top: 1px solid #003366;
	border-left: 1px solid #003366;
	border-bottom: 1px solid #dceafa;
}

.linksTr1{background-color: #ceddf8;}
.linksTr2{background-color: #acc6f5;}

.linksTdLinkDescr{
	width: 100%;
	padding: 5px;
	border-left: 1px solid #003366;
	cursor: pointer;
	-moz-user-select: none;
	white-space: normal;
}
.linksTdLinkDescr:hover{background-color: #fff8a8;}

.linksTdGrupoVazio{
	background-color: #cccccc;
	width: 100%;
	padding: 5px;
	text-align: center;
	border-left: 1px solid #003366;
	-moz-user-select: none;
}

.txtImpExp{
	width: 500px;
	height: 400px;
}

