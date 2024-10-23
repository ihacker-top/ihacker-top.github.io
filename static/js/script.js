window.$docsify = {
    search: {
        paths: 'auto',
        placeholder: ' 🔍 开始搜索',
        noData: '😞 没有结果',
        depth: 6
    },
    pagination: {
        previousText: '上一页',
        nextText: '下一页',
        crossChapter: true
    },
    plugins: [
        function(hook) {
            var footer = [
                '<hr/>',
                '<footer>',
                    '<p>Copyright © 2000-2024 <span style="color: #ff5c5c;"><b>安全节点</b></span> All Rights Reserved.</p>',
                    '<P>安全节点 由 <i><b>S.N.T</b></i> 管理维护 </p>',
                    '<p>iHacker.top</p>',
                '</footer>'
            ].join('');
            hook.init(function () {
                var token = $.cookie('token');
                $.post(baseUrl + '/core/user/apiUserInfo', {token: token}, function (e) {
                    if (e.code === 0) {
                        $.cookie('login', 1);
                        $.cookie('email', e.email);
                    }
                });
            });
            hook.afterEach(function(html) {
                return html + footer;
            });
            hook.beforeEach(function(content) {
                setTimeout(function () {
                    showNav();
                }, 100);
                return content;
            });
        }
    ],
    el: '#app',
    name: '〔 <b>安全节点</b> 〕',
    repo: '',
    basePath: '/posts/',
    coverpage: true,
    homepage: 'index.md',
    loadNavbar: true,
    maxLevel: 4,
    subMaxLevel: 3,
    themeColor: '#ff5c5c',
    onlyCover: false,
    loadSidebar: true,
    autoHeader: true,
    auto2top: true,
    mergeNavbar: true,
    executeScript: true,
}
var baseUrl = 'https://node.ihacker.top';
var hgUrl = baseUrl + '/hackgame/start/index';
function showNav () {
    var login = $.cookie('login');
    var email = $.cookie('email');
    if (parseInt(login) === 1) {
        $('.app-nav ul').append('<li><a class="hackgame" href="' + hgUrl + '" target="_blank">HackGame</a></li>');
        $('.app-nav ul').append('<li>' + email +'</li>');
        $('.app-nav ul').append('<li><a class="logout">退出</a></li>');
        $('.app-nav .logout').click(function () {
            $.cookie('login', 0);
            $.removeCookie('token');
            $.removeCookie('email');
            window.location.reload();
        });
    }else {
        $('.app-nav ul').append('<li><a href="/#/login">登录/注册</a></li>');
    }
}