/**
 * Created by dustar on 2017/7/8.
 */

function syrcFromCookie() {

}

/**
 * Created by dustar on 2017/6/8.
 * archive.js
 * 存档/取档
 */

// 将对象转化为json
function sync() {
    syncCalenders()
    syncTimer()
    syncTodos()
}

function syncCalenders() {
    let jsonData = JSON.stringify(calenders)
    // 提交json
    setCookie('calenders', jsonData)
}

function syncTodos() {
    let jsonData = JSON.stringify(todos)
    // 提交json
    setCookie('todos', jsonData)
}

function syncTimer() {
    let jsonData = JSON.stringify(timer)
    setCookie('timer', jsonData)
}


// 解码档案
function loadData() {
    calenders = eval('('+getCookie('calenders')+')')
    todos = eval('('+getCookie('todos')+')')
    timer = eval('('+getCookie('timer')+')')
}

function setCookie(name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
