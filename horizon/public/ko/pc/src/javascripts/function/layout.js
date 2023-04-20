function layout() {
    // indicator
    let aArray = [];

    gsap.utils.toArray("#container > section").forEach((panel, i) => {
        // 가로스크롤 없는 경우
        /*ScrollTrigger.create({
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            // markers: true,
            onUpdate: function(self){
                $navBtn.removeClass('on');
                $navBtn.eq(i).addClass('on');
            }
        });

        if(i == 0){
            aArray.push($('#'+panel.id).offset().top);
        }else if(i == 1){
            aArray.push($('#'+panel.id).offset().top - 80);
        }else{
            aArray.push($('#'+panel.id).offset().top - 40);
        }*/

        // 가로스크롤 있는 경우
        if(i !== 1){
            ScrollTrigger.create({
                trigger: panel,
                start: 'top center',
                end: 'bottom center',
                // markers: true,
                onUpdate: function(self){
                    $navBtn.removeClass('on');
                    $navBtn.eq(i).addClass('on');
                }
            });
        }else{
            let $horizonWrap = document.querySelector(".horizon_wrap"),
                $activistStory = $('.horizon_wrap .activist_story'),
                $activistMsg = $('.horizon_wrap .activist_msg');
            let _horizonWrapWidth = $horizonWrap.offsetWidth,
                _winW = window.innerWidth,
                _scrollSec = _horizonWrapWidth/1000,
                _scrollMove = _horizonWrapWidth - _winW,
                _horizonWrapEnd = '+='+_horizonWrapWidth+' bottom';

            const $sec02 = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    pin:true,
                    start: '-152px top',
                    end: _horizonWrapEnd,
                    scrub: 1.5,
                    // markers: true,
                    onUpdate: function(self){
                        $navBtn.removeClass('on');
                        $navBtn.eq(i).addClass('on');
                        // console.log(self.progress)
                    }
                }
            })
            // .to($activistStory, _scrollSec, { x: -_scrollMove })

            // 마지막 섹션 오버랩되서 나오도록
            // .to($horizonWrap, _scrollSec, { x: -_scrollMove })
            // .to($activistStory, _scrollSec, { x: '-100%' })
            // .to($activistMsg, _scrollSec, { scale:1 }, '-='+_scrollSec)

            if(_scrollMove > 0){
                $sec02.to($horizonWrap, _scrollSec, { x: -_scrollMove })
            }else{
                $sec02.to($horizonWrap, _scrollSec, { x: 0 })
            }
            $sec02.to($activistStory, 2, { x: '-100%' })
            $sec02.to($activistMsg, 2, { scale:1 }, '-=2')
        }

        if(i == 0){
            aArray.push($('#'+panel.id).offset().top);
        }else if(i == 1){
            // 가로스크롤 영역은 header 만큼 높이 제외
            aArray.push($('#'+panel.id).offset().top - 152);
        }else if(i == 2){
            // 활동 원칙
            aArray.push($('#'+panel.id).offset().top - 80);
        }else{
            aArray.push($('#'+panel.id).offset().top - 40);
        }
    });

    $navBtn.click(function(){
        let count = $(this).index();

        if(count === 0){
            gsap.to(window, {duration: .5, scrollTo: 0, overwrite: "auto"});
        }else{
            gsap.to(window, {duration: .5, scrollTo: aArray[count]+1, overwrite: "auto"});
        }
    });

    // Share
    var $btnFacebook = $('.btn_facebook'),
        $btnTwitter = $('.btn_twitter'),
        $btnKakao = $('.btn_kakao'),
        $btnBand = $('.btn_band');

    // var sendUrl = "https://www.msf.or.kr/",
    var sendUrl = window.location.href;

    $btnBand.click(function(){
        var sendText = '캠페인 @msfkorea';

        //Band에 전송 정보 파라미터 삽입
        window.open("http://band.us/plugin/share?body=" + sendText + "&route=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });

    $btnFacebook.click(function(){
        //Facebook에 전송 정보 파라미터 삽입
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });

    $btnTwitter.click(function(){
        // var sendText = '@msfkorea&text=Homepage';
        var sendText = '캠페인 @msfkorea';

        //Twitter에 전송 정보 파라미터 삽입
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });

    /*Kakao.init('0722022c2f65785c1a8b09c2fcb9c4c6');
    $btnKakao.click(function(){
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '테스트-title',
                description: '테스트-des',
                imageUrl: '카카오공유하기 시 썸네일 이미지 경로',
                link: {
                    mobileWebUrl: 'https://am-ple.com/test/msfk/template_re/basic/mobile/',
                    webUrl: 'https://am-ple.com/test/msfk/template_re/basic/',
                },
            },
            buttons: [
                {
                    title: '테스트 - button title',
                    link: {
                        mobileWebUrl: 'https://am-ple.com/test/msfk/template_re/basic/mobile/',
                        webUrl: 'https://am-ple.com/test/msfk/template_re/basic/',
                    },
                },
            ],
            // 카카오톡 미설치 시 카카오톡 설치 경로이동
            installTalk: true,
        })
    });*/

    // clipboard
    $('#copyUrl').text(sendUrl); // 현재창 URL로 변경

    var $btnCopy = new ClipboardJS('.btn_copy'),
        $copyInfoTxt = $(".copied_txt");

    $btnCopy.on('success', function() {
        gsap.to($copyInfoTxt, .3, { opacity:1, visibility:"visible", y:0, onComplete:function(){
                gsap.to($copyInfoTxt, .3, { opacity:0, /*visibility:"hidden",*/ y:"100%", delay:1 });
            }});
    });
}