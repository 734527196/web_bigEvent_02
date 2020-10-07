$(function() {
    //1.1 去注册按钮添加点击事件
    $('#link_reg').on('click', function() {
        $('.box_login').hide();
        $('.box_reg').show();
    })

    //1.2 去登录按钮添加点击事件
    $('#link_login').on('click', function() {
        $('.box_reg').hide();
        $('.box_login').show();
    })


    //2.自定义验证规则
    //从layui中获取form属性
    var form = layui.form;
    form.verify({
        // 2.1 定义密码规则
        pwd: [/^[\S]{6,16}$/, "密码必须6到16位，且不能出现空格"],
        // 2.2 定义重复密码规则
        repwd: function(value) {
            //选择的是后代中，name属性为password的那个标签
            var pwd = $('.box_reg [name=password]').val();
            if (pwd !== value) {
                return "两次密码输入不一致!"
            }
        }
    })

    //3.注册功能，监听注册表单的提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('.box_reg [name=username]').val(),
            password: $('.box_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            //模拟人的点击行为
            $('#link_login').click();
        })
    })

    //4.登录功能，监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                //将token值存入localStorage中
                localStorage.setItem('token', res.token);
                //页面跳转至主页
                location.href = '/index.html';
            }
        })
    })
})