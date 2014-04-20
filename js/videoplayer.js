/*=
===
=== VIDEOPLAYER
===
=*/

$(document).ready(function() {
    
    /*  FUNCTIONS
        ---------  */
    function enterFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    
    function exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    
    /*  CONSTRUCTORS
        ------------  */
    $(".widget-video").find("video").each(function() {
        
        // DOM elements
        var videoControls =
            '<div class="widget-video-controls">' +
                '<div class="widget-video-play-pause"><i class="fa fa-play"></i></div>' +
                '<div class="widget-video-seek"></div>' +
                '<div class="widget-video-mute"><i class="fa fa-volume-up"></i></div>' +
                '<div class="widget-video-volume"></div>' +
                '<div class="widget-video-fullscreen"><i class="fa fa-expand"></i></div>' +
            '</div>';
        $(this).after(videoControls);
        
        // video properties
        $(this)[0].removeAttribute("controls");
        $(this)[0].setAttribute("preload", "metadata");
        
        // play pause
        $(this)[0].addEventListener("ended", function() {
            $(this).closest(".widget-video").find(".widget-video-play-pause").html('<i class="fa fa-play"></i>');
        });
        
        // after loading finished
        $(this)[0].addEventListener("loadedmetadata", function() {
            
            // timeline
            $(this).closest(".widget-video").find(".widget-video-seek").slider({
                min: 0,
                max: $(this)[0].duration,
                step: 0.01,
                value: 0,
                range: "min",
                orientation: "horizontal",
                animate: "fast",
                slide: function(event, ui) {
                    $(this).closest(".widget-video").find("video")[0].currentTime = ui.value;
                }
            });
            
            // volume
            $(this).closest(".widget-video").find(".widget-video-volume").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: 0.6,
                range: "min",
                orientation: "horizontal",
                animate: "fast",
                slide: function(event, ui) {
                    $(this).closest(".widget-video").find("video")[0].volume = Math.pow(ui.value, 2);
                }
            });
            
        });
        
        // update timeline
        $(this)[0].addEventListener("timeupdate", function() {
            $(this).closest(".widget-video").find(".widget-video-seek").slider("value", $(this)[0].currentTime);
        });
        
    });
    
    /*  ACTIONS
        ------  */
    var $video = $(".widget-video").find("video");
    var $playpause = $(".widget-video").find(".widget-video-play-pause");
    var $mute = $(".widget-video").find(".widget-video-mute");
    var $fullscreen = $(".widget-video").find(".widget-video-fullscreen");
    
    $video.on("click", function() {
        if($(this)[0].paused) {
            $(this)[0].play();
            $(this).closest(".widget-video").find(".widget-video-controls").find(".widget-video-play-pause").html('<i class="fa fa-pause"></i>');
        } else {
            $(this)[0].pause();
            $(this).closest(".widget-video").find(".widget-video-controls").find(".widget-video-play-pause").html('<i class="fa fa-play"></i>');
        }
    });
    
    $mute.on("click", function() {
        if($(this).closest(".widget-video").find("video")[0].muted) {
            $(this).closest(".widget-video").find("video")[0].muted = false;
            $(this).html('<i class="fa fa-volume-up"></i>');
        }
        else {
            $(this).closest(".widget-video").find("video")[0].muted = true;
            $(this).html('<i class="fa fa-volume-off"></i>');
        }
    });
    
    $playpause.on("click", function() {
        if($(this).closest(".widget-video").find("video")[0].paused) {
            $(this).closest(".widget-video").find("video")[0].play();
            $(this).html('<i class="fa fa-pause"></i>');
        }
        else {
            $(this).closest(".widget-video").find("video")[0].pause();
            $(this).html('<i class="fa fa-play"></i>');
        }
    });
    
    $fullscreen.on("click", function() {
        if(!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)) {
            enterFullscreen($(this).closest(".widget-video")[0]);
            $(this).html('<i class="fa fa-compress"></i>');
        } else {
            exitFullscreen();
            $(this).html('<i class="fa fa-expand"></i>');
        }
    });
    
    // hide cursor on idle
    var idleTimer;
    $video.mousemove(function() {
        $video.css("cursor", "pointer");
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function() {
            $("video").css("cursor", "none");
        }, 1000);
    });
    
});
