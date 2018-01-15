/**
 * Created by hongh on 2017/7/9.
 */

window.onload=function(){
    //定时器每秒调用一次getTime()
    setInterval(function(){
        getTime();
    },1000);
}
//js获取日期
function getTime()
{
    var now= new Date();
    var year=now.getFullYear();
    var month=now.getMonth();
    var date=now.getDate();
    var hours=now.getHours();//
    var minute=now.getMinutes();//分
    var second=now.getSeconds();//秒
//写入相应id
    document.getElementById("day").innerHTML=getMonth((month+1))+" "+date+", "+year+"<br />Sunday";
    document.getElementById("time").innerHTML=fnW(hours)+":"+fnW(minute);
}
function fnW(str){
    var num;
    str>10?num=str:num="0"+str;
    return num;
}
function getMonth(str) {
    switch(str){
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "Auguest";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }

}
