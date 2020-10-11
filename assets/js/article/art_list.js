$(function() {

    var form = layui.form;
    var laypage = layui.laypage;

    template.defaults.imports.dateFormat = function(date) {
        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = addZero(dt.getMonth() + 1)
        var d = addZero(dt.getDate())

        var hh = addZero(dt.getHours())
        var mm = addZero(dt.getMinutes())
        var ss = addZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function addZero(x) {
        return x >= 10 ? x : '0' + x
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // layui.layer.msg(res.message)

                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
                    // console.log(htmlStr)

                renderPage(res.total)

            }

        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return
                }
                var htmlStr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }

        })
    }

    $('#form_search').on('submit', function(e) {
        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        q.cate_id = cate_id;
        q.state = state;

        initTable()
    })

    function renderPage(n) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: n, //数据总数，从服务端得到
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limit: q.pagesize, //每页显示的条数
            limits: [2, 3, 5, 10],
            curr: q.pagenum, //起始页
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });

    }

    $('tbody').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id')
        var len = $('#btnDelete').length
        console.log(len)

        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章失败')
                    }
                    layui.layer.msg('删除文章成功')
                    if ($('#btnDelete').length === 1 && q.pagenum > 1) {
                        q.pagenum--
                    }

                    initTable()
                }
            })

            layer.close(index);
        });

    })
})