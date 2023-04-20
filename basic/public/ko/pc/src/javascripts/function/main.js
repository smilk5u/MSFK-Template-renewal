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
    function principlesEvents(){
        var principlesTimelineAdd = gsap.timeline();
        principlesTimelineAdd
            .to($principlesSlogan, .5, { width:'100%' })
            .to($principlesLine, .3, { width:'1580px' }, '-=.35')
            .to($principlesText01, .3, { width:'100%' }, '-=.1')
            .to($principlesText02, .3, { width:'100%' }, '-=.25')
            .to($principlesText03, .3, { width:'100%' }, '-=.25')
            .to($principlesText04, .3, { width:'100%' }, '-=.25')
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
    function effectEvents(){
        var effectTimelineAdd = gsap.timeline();
        effectTimelineAdd
            .to($effectText01, .2, { width:'100%' })
            .to($effectText02, .2, { width:'100%' }, '-=.18')
            .to($effectText03, .2, { width:'100%' }, '-=.18')
            .to($effectText04, .2, { width:'100%' }, '-=.18')
            .to($effectText05, .2, { width:'100%' }, '-=.18')
            .to($effectText06, .2, { width:'100%' }, '-=.18')
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
            onEnter: function(){
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
    window.addEventListener("scroll", function(){
        ( window.pageYOffset > currentScroll ) ? isScrollingDown = true : isScrollingDown = false;
        currentScroll = window.pageYOffset;

        /*gsap.to(_aboutMarqueeUnit, {
            timeScale: isScrollingDown ? 1 : -1
        });*/
        gsap.to(_storyMarqueeUnit, {
            timeScale: isScrollingDown ? 1 : -1
        });
    });
}