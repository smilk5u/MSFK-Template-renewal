function layout() {
    var aArray = [];
    var count = 0;
    var $nav = $header.find("nav"),
        $article = $container.children();

    $article.each(function () {
        var _this = $(this);
        if (_this.attr("id")) {
            var secID = _this.attr("id");
            aArray.push("#" + secID);
        }
    });

    // Up/Down nav
    function navi() {
        var _window = $("html, body");
        var $prev = $nav.find(".prev"),
            $next = $nav.find(".next");
        // var _articleL = $article.length;
        var _articleL = aArray.length;

        $prev.on("click", function () {
            count <= 0 ? count = 0 : count = count - 1;
            TweenMax.to(_window, .5, { scrollTop: Math.ceil($(aArray[count]).offset().top) });
        });
        $next.on("click", function () {
            count >= _articleL - 1 ? count = _articleL - 1 : count = count + 1;
            TweenMax.to(_window, .5, { scrollTop: Math.ceil($(aArray[count]).offset().top) });
        });
    }
    navi();

    //donate button
    function donateBtn() {
        var $donaBtn = $footer.find(".donate_wrap");
        var _footerH = $footer.height();
        $(window).scroll(function () {
            if (window.scrollY + window.innerHeight >= document.body.clientHeight - _footerH) {
                $donaBtn.addClass("active");
            } else {
                $donaBtn.removeClass("active");
            }
        });
    }
    donateBtn();

    //share button
    function shareBtn() {
        var $shareWrap = $header.find(".share_wrap");
        var $defaultBtn = $shareWrap.find(".default_btn");
        var $shareBtnList = $shareWrap.find('ul');
        $defaultBtn.on("click", function () {
            var _this = $(this);
            if (!_this.hasClass('close')) {
                _this.addClass('close');
                _this.css({ backgroundImage: "url(./images/common/close_btn.png)" }).text("닫기");
                $shareBtnList.slideDown();
            } else {
                _this.removeClass('close');
                _this.css({ backgroundImage: "url(./images/common/share_btn.png)" }).text("열기");
                $shareBtnList.slideUp();
            }
        });
    }
    shareBtn();

    // Share
    var $btnFacebook = $('.facebook_btn'),
        $btnTwitter = $('.twitter_btn'),
        $btnKakao = $('.kakao_btn'),
        $btnBand = $('.band_btn');

    // var sendUrl = "https://www.msf.or.kr/",
    var sendUrl = window.location.href;

    $btnBand.click(function () {
        var sendText = '캠페인 @msfkorea';

        //Band에 전송 정보 파라미터 삽입
        window.open("http://band.us/plugin/share?body=" + sendText + "&route=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });

    $btnFacebook.click(function (e) {
        //Facebook에 전송 정보 파라미터 삽입
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
        e.preventDefault();
    });

    $btnTwitter.click(function (e) {
        // var sendText = '@msfkorea&text=Homepage';
        var sendText = '캠페인 @msfkorea';

        //Twitter에 전송 정보 파라미터 삽입
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
        e.preventDefault();
    });

    /* 계정 ample0004@gmail.com / am-ple2023! */
    Kakao.init('6d0304b5a7fe469dd840fc2038524d3f');  // am-ple 어플리케이션 javascript 키
    $btnKakao.click(function () {
        // Kakao.Link.sendCustom({
        //    templateId: 93029   // 템플릿 ID
        // });
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '캠페인 제목 영역입니다',
                description: '우리는 오늘도 환자를 치료합니다',
                imageUrl: 'https://am-ple.com/test/msfk/template_re/basic/images/common/kakao_thumbnail.jpg',
                imageWidth: 800,
                imageHeight: 420,
                link: {
                    mobileWebUrl: location.href,
                    webUrl: location.href,
                },
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: location.href,
                        webUrl: location.href,
                    },
                },
            ],
        });
    });

    // clipboard
    $('#copyUrl').text(sendUrl); // 현재창 URL로 변경

    var $btnCopy = new ClipboardJS('.link_btn'),
        $copyInfoTxt = $(".copied_txt");

    $btnCopy.on('success', function () {
        gsap.to($copyInfoTxt, .3, {
            opacity: 1, visibility: "visible", y: 0, onComplete: function () {
                gsap.to($copyInfoTxt, .3, { opacity: 0, /*visibility: "hidden",*/ y: "100%", delay: 1 });
            }
        });
    });
}