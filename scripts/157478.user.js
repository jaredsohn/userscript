// ==UserScript==
// @name          GongShiDefault
// @namespace     http://essp.pcitc.com
// @include       http://10.1.11.164/Attendance/AddAtteManHour.aspx*
// @include       http://essp.pcitc.com/Attendance/AddAtteManHour.aspx*
// ==/UserScript==
(function() {
  rows = document.getElementById("ctl00_body_gvAtteManHour_DXMainTable").rows.length - 1;
  for (i = 0; i < rows; i++) {
//    //默认项目小组
//    group = document.getElementById("ctl00_body_gvAtteManHour_cell" + i + "_3_ddGroup");
//    if (group.disabled == false) {
//      group.value = 30;
//    }
    //默认工作描述
    workFlag = document.getElementById("ctl00_body_gvAtteManHour_cell" + i + "_7_chkWorkFlag_I");
    workDesc = document.getElementById("ctl00_body_gvAtteManHour_cell" + i + "_8_txtWorkDesc_I");
    if(workFlag.checked == true && workDesc.value == "") {
      workDesc.value = "新核销程序开发";
    }
  }
})();