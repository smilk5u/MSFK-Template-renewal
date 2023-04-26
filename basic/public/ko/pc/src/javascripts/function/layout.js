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

   console.log(location.href)
   console.log('./../images/common/kakao_thumbnail.jpg')
   console.log('../../images/main/visual_A.jpg')

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