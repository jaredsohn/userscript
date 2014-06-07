// ==UserScript==
// @name        siap
// @namespace   siap
// @version     1
// ==/UserScript==
@charset "UTF-8";
/* application table */
.tbl-data{
	border-top:#ccd7ba solid 1px;
	border-bottom:#ccd7ba solid 1px;
	border-collapse:collapse;
}
.tbl-data th,
.tbl-data td{
	padding:7px 10px;
	border-top:#D8DFCC solid 1px;
	line-height:normal;
}
.tbl-data tr:first-child th,
.tbl-data tr:first-child td{
	border:none;
}
.tbl-data th{
	color:#007C72;
	background-color:#f0f0f0;
}
.tbl-data tr:hover th{
	background-color:#e0e0e0;
}
.tbl-data tr:hover td{
	background-color:#f0f0f0;
}
.tbl-data thead tr:hover th,
.tbl-data thead th{
	background-color:#f0f0f0;
	border-bottom:#ccd7ba solid 1px !important;
}
.tbl-data .big{
	font-size:18px;
}
.tbl-data .no{
	font-size:16px;
	font-weight:bold;
}
/* form table */
.tbl-form {
	border-top: 1px solid #d8dfcc;
}
.tbl-form th,
.tbl-form td {
	border-bottom: 1px solid #d8dfcc;
	padding:7px 10px;
}
.tbl-form thead th {
	background-color:#eef4e5;
}
.tbl-form tbody tr:hover th,
.tbl-form tbody tr:hover td {
	background-color:#ecf5dd;
}
.tbl-form .act {
	text-align:center !important;
}
.tbl-form tr:hover .nohov {
	background:none;
}
.tbl-form .big{
	font-size:18px;
}
.tbl-form .number{
	text-align:right;
	width:50px;
}
.tbl-form .num-2digit{
	text-align:right;
	width:30px;
}
/* form table caption */
.tbl-form caption {
	padding-bottom:10px;
}
/* form table legend */
.tbl-form .legend {
	background-color:#fffcde !important;
	color:#888;
}
.tbl-form .legend ul > li {
	margin:3px 0 3px 16px;
}
.tbl-form .legend li.req {
	list-style:url(../img/form/astrx.png) !important;
}
