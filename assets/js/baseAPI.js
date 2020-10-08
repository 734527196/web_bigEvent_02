//开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net';
//测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';
//生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';


//发送ajax之前会先触动ajaxPrefilter方法
$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url;
    //为请求为/my/开头的所有ajax配置头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || "" }
    }
    options.complete = function(res) {
        // console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})