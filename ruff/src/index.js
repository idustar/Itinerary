/**
 * Created by dustar on 2017/7/8.
 */
'use strict';

var fetch

var isScroll
var sen
var start
var end
var len
var x
var ws
var replyText
var isBreath
var numBreath
var isLow

$.ready(function (error) {
    httpGet()
    setInterval(refresh, 1000)
    if (error) {
        console.log(error);
        return;
    }
    $('#button1').on('push', function () {
        // console.log('Button pushed.');
        // $('#ledlight').turnOn();
        // ruffRefresh()
        replyText = "red"
    });

    $('#button2').on('push', function () {
        // console.log('Button2 pushed.');
        // $('#ledlight').turnOff();
        replyText = "blue"
    });

    setTimeout(()=>{
        $('#temp').getTemperature(function (error, temperature) {
            if (error) {
                console.error(error);
                return;
            }

            replyText = temperature + ","
        });

        $('#temp').getRelativeHumidity(function (error, humidity) {
            if (error) {
                console.error(error);
                return;
            }

            replyText += humidity + ","
        });

        $('#light').getIlluminance(function (error, value) {
            if (error) {
                console.error(error);
                return;
            }

            replyText += value
        });
    }, 3000)


    isScroll=false;
    isBreath=false
    start=0
    end=15
    x=0
    numBreath=255
    isLow=false
});

$.end(function () {
    $('#ledlight').turnOff();
});

function refresh() {
    ruffRefresh()
    if(isBreath)
    {
        $('#ledlight').setRGB(0x00,0x00,numBreath)
        if(isLow)
            numBreath-=51
        else
            numBreath+=51
        if(numBreath<0){
            numBreath=0
            isLow=false
        }
        else if(numBreath > 255)
        {
            numBreath=255
            isLow=true
        }
    }

}

function ruffRefresh() {
    var date=(new Date((new Date()).valueOf()-57587629)).toLocaleTimeString()

    $('#lcd').setCursor(0,0);
    $('#lcd').print(date);
    if(isScroll) {
        if (start === len) {
            if(x==0)
            {
                $('#lcd').setCursor(0, 1)
                $('#lcd').print(" ")
            }
            $('#lcd').setCursor(15 - x, 1)
            $('#lcd').print(sen.substring(0, x))
            x++
            if (x === 15) {
                start = 0
                end = 15
            }
        }
        else {
            $('#lcd').setCursor(0, 1)
            $('#lcd').print(sen.substring(start, end))

            if (len > end)
                end++
            else {
                $('#lcd').setCursor(end - start, 1)
                $('#lcd').print(" ")
            }
            start++

        }
    }
}


function displayText(text) {

    sen=text
    if (sen.length > 16) {
        isScroll = true
        len=sen.length
        end=15
    }
    else
        console.log('??')
        $('#lcd').setCursor(0,1)
        $('#lcd').print(sen)
}



function httpGet(r) {
    var http = require('http');
    var url = require('url');
    var util = require('util');

    //req 请求信息   res返回信息
    http.createServer(function(req, res){
        res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'});  //状态码+响应头属性
        // 解析 url 参数
        var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
        res.write(replyText?replyText:"NOCONTENT")
        replyText = ""
        res.end()
        var type = params.type
        var text = params.text
        var addition = params.add
        var addition2=params.add2
        console.log(type)
        switch (type) {
            case "request":
                break;
            case "timer":

                displayText(text)
                $('#ledlight').turnOn()
                $('#ledlight').setRGB(0x00,0x00,addition2)
                $('#lcd').setCursor(10,0);
                $('#lcd').print(addition.pattern("HH:mm"));
                break;
            case "calender":
                console.log('xxxxxx')
                displayText(text)
                $('#ledlight').turnOn()
                isBreath=true
                isLow=true
                $('#lcd').setCursor(12-addition.length,0);
                $('#lcd').print(addition+"mins");
                break;
            case "todo":
                $('#ledlight').turnOff()
                displayText(text)
                $('#lcd').setCursor(12-addition.length,0);
                $('#lcd').print(addition+"todo");
                break
            default:
                //console.log(type)
        }

    }).listen(3000);
}




