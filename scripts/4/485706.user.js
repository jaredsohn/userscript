// ==UserScript==
// @name        wlkt
// @namespace   wlkt
// @description wlkt
// @include     http://www.wzwlxt.gov.cn/study/container.htm*
// @version     1
// @grant       none
// ==/UserScript==
//超时计时器
// Add jQuery
var oldOnLoad = unsafeWindow.onload;
console.log("before onload");
unsafeWindow.onload = function () {
    if (oldOnLoad)
    	oldOnLoad();
    	
    console.log("after onload");
    var uCount = 0;
    /*
    window.clearInterval(unsafeWindow.countCourseTime);
        //停止计时器
    unsafeWindow.countCourseTime = unsafeWindow.setInterval('fakCountCourseTimeFunction()', countTimeDelay);
    alert('破解成功V0.3');
    */
    unsafeWindow.countCourseTimeFunction = function () {
        $.ajax({
            type: 'post',
            url: StudyURL,
            data: {
                act: 'update',
                courseId: courseid,
                logId: logId,
                'password': password
            },
            async: false,
            cache: false,
            dataType: 'json',
            success: function (data, textStatus) {
                if (data.err < 0) {
                    alert(data.msg);
                    unsafeWindow.close();
                    return false;
                } else if (data.err == '2') {
                    alert('您的账号已在其他地方登录,被迫下线')
                    unsafeWindow.close();
                    return false;
                } else if (data.err == '4') {
                    alert('验证失败，请重新登录')
                    unsafeWindow.close();
                    return false;
                } else if (data.err == '1') {
                    //学习完成
                    password = data.password;
                    if (data.examType == 'W') {
                        var studyW = get_study_cookie('studyW');
                        // 获取cookie 是否已经弹出过提示框
                        if (studyW != 1) {
                            // 没有cookie 说明是第一次 弹出提示框
                            unsafeWindow.set_study_cookie('studyW', 1, 10);
                            ret = unsafeWindow.confirm('您的学习时间已达到要求，获得学分:' + data.credithour + '是否继续学习');
                            if (!ret) {
                                unsafeWindow.close();
                                return false;
                            }
                        }
                    } else if (data.examType == 'E') {
                        var studyE = unsafeWindow.get_study_cookie('studyE');
                        // 获取cookie 是否已经弹出过提示框
                        if (studyE != 1) {
                            // 没有cookie 说明是第一次 弹出提示框
                            ret = unsafeWindow.confirm('请根据您对本课程内容的理解，完成考核题！');
                            if (ret) {
                                unsafeWindow.opener.location.href = '/study/exam.php?courseid=' + data.courseId;
                                unsafeWindow.close();
                                return false;
                            } else 
                            {
                                unsafeWindow.set_study_cookie('studyE', 1, 10);
                            }
                        }
                    } else if (data.examType == 'S') {
                        var studyS = unsafeWindow.get_study_cookie('studyS');
                        // 获取cookie 是否已经弹出过提示框
                        if (studyS != 1) {
                            // 没有cookie 说明是第一次 弹出提示框
                            ret = unsafeWindow.confirm('您的学习时间已达到要求，可以提交心得。现在提交心得吗？');
                            if (ret) {
                                unsafeWindow.opener.location.href = '/study/exam_summary.php?act=add&courseid=' + data.courseId;
                                unsafeWindow.close();
                                return false;
                            } else 
                            {
                                unsafeWindow.set_study_cookie('studyS', 1, 10);
                            }
                        }
                    }
                } else if (data.err == '0') {
                    //未完成
                    var playTime = 0;
                    playTime = data.playTime;
                    unsafeWindow.password = data.password;
                    if (playTime > 0 && playTime != null) {
                        var needPopWin = isPopWin(playTime);
                        if (needPopWin) {                            
                           uCount = uCount + 1;
                            console.log("skip popwindow ", uCount, " times.");
                            unsafeWindow.updateLastStudyTime(unsafeWindow.password);
                            //记录下当前服务器时间
                            unsafeWindow.confirmTime = 0;
                            //计数器
                            unsafeWindow.clearInterval(unsafeWindow.countCourseTime);
                            //停止计时器
                            unsafeWindow.isSleep = false;
                            unsafeWindow.timeOutObj = unsafeWindow.setTimeout(function () {
                                unsafeWindow.confirmStopTime();
                                console.log("confirmTime:", unsafeWindow.confirmTime);
                                if (unsafeWindow.timeOutObj) {
                                    unsafeWindow.clearTimeout(unsafeWindow.timeOutObj);
                                }
                                unsafeWindow.countCourseTime = unsafeWindow.setInterval('countCourseTimeFunction()', countTimeDelay);
                            }, 10000);
                            return false;
                        }
                    }
                }
            },
            error: function (data) 
            {
                //alert('计时失败');
                //window.close();
                //return false;
            }
        });
        //ajax
    }
    console.log("after set countCourseTimeFunction");
}

console.log("set onload ok");
