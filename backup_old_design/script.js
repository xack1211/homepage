console.log('%cCopyright © 2024 zyyo.net',
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
);
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function pop(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    pop();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});



function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}















document.addEventListener('DOMContentLoaded', function () {






    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var tanChiShe = document.getElementById("tanChiShe");






    function changeTheme(theme) {
        tanChiShe.src = "./static/svg/snake-" + theme + ".svg";
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }







    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
        } else {
            changeTheme("Dark");
        }
    });



    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);

















   

    var fpsElement = document.createElement('div');
    fpsElement.id = 'fps';
    fpsElement.style.zIndex = '10000';
    fpsElement.style.position = 'fixed';
    fpsElement.style.left = '0';
    document.body.insertBefore(fpsElement, document.body.firstChild);

    var showFPS = (function () {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        var fps = 0,
            last = Date.now(),
            offset, step, appendFps;

        step = function () {
            offset = Date.now() - last;
            fps += 1;

            if (offset >= 1000) {
                last += offset;
                appendFps(fps);
                fps = 0;
            }

            requestAnimationFrame(step);
        };

        appendFps = function (fpsValue) {
            fpsElement.textContent = 'FPS: ' + fpsValue;
        };

        step();
    })();
    
    
    
    //pop('./static/img/tz.jpg')
    
    
    
});




var pageLoading = document.querySelector("#zyyo-loading");
window.addEventListener('load', function() {
    setTimeout(function () {
        pageLoading.style.opacity = '0';
    }, 100);
});


// 多语言翻译功能
const translations = {
    EN: {
        translate: '🌐 Translate',
        welcome: "Hello I'm",
        desc1: '👦 Mentally Health Secondary Student',
        desc2: '📝 The only way to do <span class="purpleText textBackground">great</span> is to <span class="purpleText textBackground">love</span> what you do.',
        site: 'site',
        blogs: 'Blogs',
        blogs_desc: 'Record my thoughts',
        cloud: 'Cloud Disk',
        cloud_desc: 'Store and collect files',
        lab: 'Cloud Laboratory',
        lab_desc: 'Collect interesting websites',
        under: 'Under Construction',
        soon: 'Coming soon',
        project: 'project',
        mcrt: 'MaiCity Railway Transit',
        mcrt_desc: 'Building a railway transit system in Minecraft',
        skills: 'skills',
        footer: 'Zyyo © 2024 |',
        github: 'Github',
        recreated: 'Recreated by Jack',
    },
    SC: {
        translate: '🌐 翻译',
        welcome: '你好，我是',
        desc1: '👦 心理健康的中学生',
        desc2: '📝 做伟大的事，唯一的方式就是热爱你所做的。',
        site: '站点',
        blogs: '博客',
        blogs_desc: '记录我的想法',
        cloud: '云盘',
        cloud_desc: '存储和收集文件',
        lab: '云实验室',
        lab_desc: '收集有趣的网站',
        under: '建设中',
        soon: '敬请期待',
        project: '项目',
        mcrt: '麦城轨道交通',
        mcrt_desc: '在 Minecraft 中建设轨道交通系统',
        skills: '技能',
        footer: 'Zyyo © 2024 |',
        github: 'Github',
        recreated: '由 Jack 重制',
    },
    TC: {
        translate: '🌐 翻譯',
        welcome: '你好，我是',
        desc1: '👦 心理健康的中學生',
        desc2: '📝 做偉大的事，唯一的方式就是熱愛你所做的。',
        site: '站點',
        blogs: '部落格',
        blogs_desc: '記錄我的想法',
        cloud: '雲盤',
        cloud_desc: '儲存和收集檔案',
        lab: '雲實驗室',
        lab_desc: '收集有趣的網站',
        under: '建設中',
        soon: '敬請期待',
        project: '項目',
        mcrt: '麥城軌道交通',
        mcrt_desc: '在 Minecraft 中建設軌道交通系統',
        skills: '技能',
        footer: 'Zyyo © 2024 |',
        github: 'Github',
        recreated: '由 Jack 重製',
    }
};

let currentLang = 'EN';

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    const indicator = document.getElementById('lang-indicator');
    if (indicator) {
        indicator.textContent = lang;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('translateRoleBtn');
    const langBar = document.getElementById('lang-switch-bar');
    function updateLangBar(lang) {
        if (!langBar) return;
        langBar.querySelectorAll('.lang-item').forEach(function(item) {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active', 'switch-anim');
                setTimeout(() => item.classList.remove('switch-anim'), 400);
            } else {
                item.classList.remove('active');
            }
        });
    }

    function switchLang(lang) {
        currentLang = lang;
        applyTranslations(currentLang);
        updateLangBar(currentLang);
    }

    if (btn && langBar) {
        // 循环切换按钮点击
        btn.addEventListener('click', function (e) {
            // 如果点击的是语言条，交由语言条处理
            if (e.target.classList.contains('lang-item')) return;
            if (currentLang === 'EN') switchLang('SC');
            else if (currentLang === 'SC') switchLang('TC');
            else switchLang('EN');
        });
        // 语言条点击切换
        langBar.querySelectorAll('.lang-item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                const lang = item.getAttribute('data-lang');
                if (lang !== currentLang) {
                    switchLang(lang);
                }
                e.stopPropagation();
            });
        });
        applyTranslations(currentLang);
        updateLangBar(currentLang);
    }
});

