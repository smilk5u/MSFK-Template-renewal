"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
var $header = $("#header");
var $footer = $("#footer");
var $html = $("html");

var $nav = $('#gnb'),
    $navBtn = $nav.find('li');

$window.load(function () {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
    });
    _this.trigger("resize");
    $(window).scroll(function () {
        winSc = _this.scrollTop();
        $('.top').text(winSc);
    });

    // smoothScroll("#container");
    gsap.registerPlugin(ScrollTrigger);

    layout();
    main();
});

function smoothScroll(content, viewport, smoothness) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 0;
    gsap.set(viewport || content.parentNode, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
    gsap.set(content, { overflow: "visible", width: "100%" });

    let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => content.style.overflow = "visible",
        killScrub = trigger => {
            let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
            scrub && scrub.pause();
            trigger.animation.progress(trigger.progress);
        },
        height, isProxyScrolling;

    function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible"
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
    }

    ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
    })
    ScrollTrigger.defaults({ scroller: content });
    ScrollTrigger.prototype.update = p => p;

    ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
            if (arguments.length) {
                isProxyScrolling = true;
                setProp(-value);
                setScroll(value);
                return;
            }
            return -getProp("y");
        },
        scrollHeight: () => document.body.scrollHeight,
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    return ScrollTrigger.create({
        animation: gsap.fromTo(content, { y: 0 }, {
            y: () => document.documentElement.clientHeight - height,
            ease: "none",
            onUpdate: ScrollTrigger.update
        }),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: self => {
            if (isProxyScrolling) {
                killScrub(self);
                isProxyScrolling = false;
            }
        },
        onRefresh: killScrub
    });
}
function layout() {
   // indicator
   let aArray = [];

   gsap.utils.toArray("#container > section").forEach((panel, i) => {
      // 가로스크롤 없는 경우
      ScrollTrigger.create({
         trigger: panel,
         start: 'top center',
         end: 'bottom center',
         // markers: true,
         onUpdate: function (self) {
            $navBtn.removeClass('on');
            $navBtn.eq(i).addClass('on');
         }
      });

      if (i == 0) {
         aArray.push($('#' + panel.id).offset().top);
      } else if (i == 1) {
         // 활동 원칙
         aArray.push($('#' + panel.id).offset().top - 80);
      } else {
         aArray.push($('#' + panel.id).offset().top - 40);
      }

      // 가로스크롤 있는 경우
      /*if(i !== 1){
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
      }else{
          aArray.push($('#'+panel.id).offset().top - 40);
      }*/
   });

   $navBtn.click(function () {
      let count = $(this).index();

      if (count === 0) {
         gsap.to(window, { duration: .5, scrollTo: 0, overwrite: "auto" });
      } else {
         gsap.to(window, { duration: .5, scrollTo: aArray[count] + 1, overwrite: "auto" });
      }
   });

   // Share
   var $btnFacebook = $('.btn_facebook'),
      $btnTwitter = $('.btn_twitter'),
      $btnKakao = $('.btn_kakao'),
      $btnBand = $('.btn_band');

   // var sendUrl = "https://www.msf.or.kr/",
   var sendUrl = window.location.href;

   $btnBand.click(function () {
      var sendText = '캠페인 @msfkorea';

      //Band에 전송 정보 파라미터 삽입
      window.open("http://band.us/plugin/share?body=" + sendText + "&route=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
   });

   $btnFacebook.click(function () {
      //Facebook에 전송 정보 파라미터 삽입
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
   });

   $btnTwitter.click(function () {
      // var sendText = '@msfkorea&text=Homepage';
      var sendText = '캠페인 @msfkorea';

      //Twitter에 전송 정보 파라미터 삽입
      window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl, '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
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
            title: '국경없는 의사회 - 제목',
            description: '국경 - 설명',
            imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
            link: {
               mobileWebUrl: 'https://am-ple.com/test/msfk/template_re/basic/',
               webUrl: 'https://am-ple.com/test/msfk/template_re/basic/',
            },
         },
         itemContent: {
            profileText: '국경없는 의사회',
            profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
         },
         buttons: [
            {
               title: '자세히 보기',
               link: {
                  mobileWebUrl: 'https://am-ple.com/test/msfk/template_re/basic/',
                  webUrl: 'https://am-ple.com/test/msfk/template_re/basic/',
               },
            },
         ],
      });
   });

   // clipboard
   $('#copyUrl').text(sendUrl); // 현재창 URL로 변경

   var $btnCopy = new ClipboardJS('.btn_copy'),
      $copyInfoTxt = $(".copied_txt");

   $btnCopy.on('success', function () {
      gsap.to($copyInfoTxt, .3, {
         opacity: 1, visibility: "visible", y: 0, onComplete: function () {
            gsap.to($copyInfoTxt, .3, { opacity: 0, /*visibility:"hidden",*/ y: "100%", delay: 1 });
         }
      });
   });
}
function main() {
   var currentScroll = 0;
   var isScrollingDown = true;

   var $sec01 = $('#section01'),
      $aboutWrap = $sec01.find('#about'),
      $aboutMarqueeWrap = $aboutWrap.find('.marquee_wrap'),
      $aboutMarqueeUnitWrap = $aboutMarqueeWrap.find('div'),
      $aboutMarqueeUnit = $aboutMarqueeWrap.find('p'),
      // $videoBox = $aboutWrap.find('.video_box'),
      // $textWrap = $aboutWrap.find('.text_wrap'),
      $warehouseWrap = $sec01.find('#warehouse'),
      $warehouseMarqueeWrap = $warehouseWrap.find('.marquee_wrap'),
      $warehouseMarqueeUnit = $warehouseMarqueeWrap.find('ul');

   // about marquee
   var _aboutMarqueeUnit = gsap.to($aboutMarqueeUnit, {
      xPercent: -100,
      repeat: -1,
      duration: 15,
      ease: "linear"
   }).totalProgress(0.5);
   // _aboutMarqueeUnit.pause();

   /*var _aboutMarqueeUnitWrap = gsap.to($aboutMarqueeUnitWrap, {
       scrollTrigger: {
           trigger: $aboutWrap,
           start: '-35% center',
           end: 'bottom center',
           // markers: true,
           scrub: 1,
           onEnter: function(){
               _aboutMarqueeUnit.play();
           }
       },
       xPercent: -70
   });*/

   // video effect
   /*var _videoBox = gsap.to($videoBox, {
       scrollTrigger: {
           trigger: $textWrap,
           // markers: true,
           start: 'top center',
           end: '70% center'
       },
       autoAlpha: 1,
       duration: .8,
       y: 0
   });*/

   // warehouse marquee
   var _warehouseMarqueeUnit = gsap.to($warehouseMarqueeUnit, {
      xPercent: -100,
      repeat: -1,
      duration: 60,
      ease: "linear"
   }).totalProgress(0.5);

   // principles text effect
   var $principles = $('#principles'),
      $principlesSloganWrap = $principles.find('.text_effect_wrap'),
      $principlesSlogan = $principlesSloganWrap.find('.dimmed_text'),
      $principlesLine = $principles.find('.line'),
      $principlesTextWrap = $principles.find('.text_wrap'),
      $principlesText01 = $principlesTextWrap.find('div:nth-of-type(1) .dimmed_text'),
      $principlesText02 = $principlesTextWrap.find('div:nth-of-type(2) .dimmed_text'),
      $principlesText03 = $principlesTextWrap.find('div:nth-of-type(3) .dimmed_text'),
      $principlesText04 = $principlesTextWrap.find('div:nth-of-type(4) .dimmed_text');

   var principlesTimeline = gsap.timeline({
      scrollTrigger: {
         trigger: $principles,
         start: '-20% center',
         // end: '55% center',
         end: '35% center',
         // markers: true,
         scrub: 1
      }
   });
   function principlesEvents() {
      var principlesTimelineAdd = gsap.timeline();
      principlesTimelineAdd
         .to($principlesSlogan, .5, { width: '100%' })
         .to($principlesLine, .3, { width: '1580px' }, '-=.35')
         .to($principlesText01, .3, { width: '100%' }, '-=.1')
         .to($principlesText02, .3, { width: '100%' }, '-=.25')
         .to($principlesText03, .3, { width: '100%' }, '-=.25')
         .to($principlesText04, .3, { width: '100%' }, '-=.25')
      return principlesTimelineAdd;
   }
   principlesTimeline.add(principlesEvents());

   // effect text effect
   var $effect = $('#effect'),
      $effectList = $effect.find('.effect_list'),
      $effectText01 = $effectList.find('div:nth-of-type(1) dl:nth-of-type(1) .dimmed_text'),
      $effectText02 = $effectList.find('div:nth-of-type(2) dl:nth-of-type(1) .dimmed_text'),
      $effectText03 = $effectList.find('div:nth-of-type(3) dl:nth-of-type(1) .dimmed_text'),
      $effectText04 = $effectList.find('div:nth-of-type(1) dl:nth-of-type(2) .dimmed_text'),
      $effectText05 = $effectList.find('div:nth-of-type(2) dl:nth-of-type(2) .dimmed_text'),
      $effectText06 = $effectList.find('div:nth-of-type(3) dl:nth-of-type(2) .dimmed_text');

   var effectTimeline = gsap.timeline({
      scrollTrigger: {
         trigger: $effectList,
         // start: '-10% center',
         start: '-65% center',
         // end: '50% center',
         end: '0 center',
         // markers: true,
         scrub: 1
      }
   });
   function effectEvents() {
      var effectTimelineAdd = gsap.timeline();
      effectTimelineAdd
         .to($effectText01, .2, { width: '100%' })
         .to($effectText02, .2, { width: '100%' }, '-=.18')
         .to($effectText03, .2, { width: '100%' }, '-=.18')
         .to($effectText04, .2, { width: '100%' }, '-=.18')
         .to($effectText05, .2, { width: '100%' }, '-=.18')
         .to($effectText06, .2, { width: '100%' }, '-=.18')
      return effectTimelineAdd;
   }
   effectTimeline.add(effectEvents());

   // activist accordion
   var $activist = $('.activist_list').children('li');
   $activist.on('mouseenter click', function (e) {
      var $this;
      e.stopPropagation();
      $this = $(this);
      if ($this.hasClass('active')) {
         $this.addClass('active');
      } else {
         $this.addClass('active');
         $this.siblings().removeClass('active');
      }
   });

   //story marquee
   var $sec06 = $('#section06'),
      $storyWrap = $sec06.find('#story'),
      $storyMarqueeWrap = $storyWrap.find('.marquee_wrap'),
      $storyMarqueeUnitWrap = $storyMarqueeWrap.find('> div'),
      $storyMarqueeUnit = $storyMarqueeWrap.find('ul');

   var _storyMarqueeUnit = gsap.to($storyMarqueeUnit, {
      xPercent: -100,
      repeat: -1,
      // duration: 15,
      duration: 30,
      ease: "linear"
   }).totalProgress(0.5);
   _storyMarqueeUnit.pause();

   var _storyMarqueeUnitWrap = gsap.to($storyMarqueeUnitWrap, {
      scrollTrigger: {
         trigger: $storyWrap,
         start: '15% center',
         end: 'bottom center',
         // markers: true,
         scrub: 1,
         onEnter: function () {
            _storyMarqueeUnit.play();
         }
      },
      xPercent: -30
   });

   /*$storyMarqueeWrap.on({
       mouseenter: function() {
           _storyMarqueeUnit.pause();
       }, mouseleave: function() {
           console.log(isScrollingDown);
           // _storyMarqueeUnit.play();
           if(isScrollingDown){
               _storyMarqueeUnit.play();
               gsap.to(_storyMarqueeUnit, { timeScale: 1 });
           }else{
               _storyMarqueeUnit.reverse();
               gsap.to(_storyMarqueeUnit, { timeScale: -1 });
           }
       }
   });*/

   // about,story marquee
   window.addEventListener("scroll", function () {
      (window.pageYOffset > currentScroll) ? isScrollingDown = true : isScrollingDown = false;
      currentScroll = window.pageYOffset;

      /*gsap.to(_aboutMarqueeUnit, {
          timeScale: isScrollingDown ? 1 : -1
      });*/
      gsap.to(_storyMarqueeUnit, {
         timeScale: isScrollingDown ? 1 : -1
      });
   });

   /* donate_utm_link target blank */
   $('.donate_utm_link').each(function () {
      $(this).hasClass('target_black') && $(this).attr('target', '_blank')
   });
}