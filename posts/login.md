# 登录/注册 #

<style type="text/css">
    .app>.from {
        width: 350px;
    }
    .app p:nth-child(1) {
        text-align: left;
        font-size: 14px;
        color: #aaa;
        margin-top: 20px;
        padding-top: 20px;
    }
    .app p:nth-child(2) input {
        width: calc(160px + 95px);
    }
    .app p:nth-child(3) input[type=text] {
        width: 170px;
    }
    .app p:nth-child(3) input[type=button] {
        width: 80px;
    }
    .app p:nth-child(5) input {
        width: 260px;
    }
    .app input {
        height: 23px;
    }
    .app input[type=button] {
        height: 29px;
    }
    .app p:nth-child(6) {
        min-height: 200px;
    }
    .msg {
        text-align: center;
        font-size: 14px;
        color: #aaa;
        min-height: 20px;
    }
</style>
<div class="app">
    <div class="from">
        <p>* 本站不保存除邮箱地址外的任何信息，也不会完全公开展示邮箱地址，请放心注册登录使用。</p>
        <p><span>邮　箱：</span><span><input type="text" name="email" autocomplete="off" /></span></p>
        <p>
            <span>验证码：</span><!--
            --><span><input type="text" name="code" autocomplete="off" /></span>&nbsp;<!--
            --><span><span><input type="button" name="sendcode" value="发送" />
        </p>
        <p class="msg"></p>
        <p><span><input type="button" name="submit" value="登录 / 注册" /></p>
        <p></p>
    </div>
</div>
<script>
    var sendUrl = baseUrl + '/core/user/sendcode.json';
    var loginUrl = baseUrl + '/core/user/apilogin.json';
    $(function () {
        $('input[name="submit"]').click(function () {
            var email = $('input[name="email"]').val();
            var code = $('input[name="code"]').val();
            $.post(loginUrl, {email: email, code: code}, function (e) {
                if (e.code === 0) {
                    console.log(e);
                    $('.msg').html(e.message);
                    $.cookie('login', 1);
                    $.cookie('email', e.email);
                    $.cookie('domain', e.domain);
                    $.cookie('token', e.token, {expires: 7, path: '/', domain: e.domain});
                    setTimeout(function () {
                        // window.location.href = '/#/index';
                    }, 1000);
                }else {
                    $('.msg').html(e.message);
                }
            });
        });
        $('input[name="sendcode"]').click(function () {
            $('.msg').html('');
            $('input[name="sendcode"]').attr('disabled', 'disabled');
            $('input[name="sendcode"]').val('发送中……');
            var email = $('input[name="email"]').val();
            $.post(sendUrl, {email: email}, function (e) {
                if (e.code == 0 || e.code == 1) {
                    var time = e.time ? e.time : 60;
                    var timer = setInterval(function () {
                        time -= 1;
                        if (time >= 1) {
                            $('input[name="sendcode"]').val('发送（' + time + '）');
                        }else {
                            $('input[name="sendcode"]').val('发送');
                            $('input[name="sendcode"]').removeAttr('disabled');
                            clearInterval(timer);
                        }
                    }, 1000);
                    $('.msg').html(e.message);
                }else {
                    $('input[name="sendcode"]').val('发送');
                    $('input[name="sendcode"]').removeAttr('disabled');
                    $('.msg').html(e.message);
                }
            });
        });
    });
</script>