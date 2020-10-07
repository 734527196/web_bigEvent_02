//开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net';
//测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';
//生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';


//发送ajax之前会先触动ajaxPrefilter方法
$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url;
})