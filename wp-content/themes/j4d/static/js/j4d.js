jQuery(function ($) {
  var $nav = $('#articleNav');
  
  if ( $nav.length ) {
    var $nextArticle = $('<span id="nextArticle"><span /><span class="edge" /></span>').css('opacity', 0);
    
    $nav.after( $nextArticle );
    
    $nextArticle.hover(function (event) {
      event.stopPropagation();
    });
    
    $nav.find('a').hover(function () {
      $nextArticle.find('span:first').html( $(this).html() ).end().stop().fadeTo(100, 1);
    }, function (event) {
      $nextArticle.stop().fadeTo(500, 0);
    });
  }

  var $viewport = $('#viewport'),
      hash = window.location.hash;
  
  if ($viewport.length) {
    var $articleNav = $('ul.articleNav a').click(function () {
      var el = this;
      $viewport.removeClass().addClass(this.className); // FIXME also includes 'selected'
      
      var parent = $(this).parent().get(0);
      $articleNav.parent().removeClass('selected').filter(function () {
        return (this == parent);
      }).addClass('selected');
      return false;
    });
  }

  // search hooks
  var $hidden = $([]);
  $('#filter a[hash=#searchForm]').click(function () {
    if ( $('#searchForm').is(':hidden') ) {
      $hidden = $('#titleHolder').find('> div > *:not(#searchForm)').hide();
      $('#searchForm').show();      
    } else {
      $('#searchForm').hide();
      $hidden.show();     
    }
    
    return false;
  });

  $('#searchForm fieldset')
    .append('<p>or <a class="cancel" href="#">cancel</a></p>')
    .find('.cancel')
    .click(function () {
      $('#searchForm').hide();
      $hidden.show();
      return false;
    });

  
  // handle viewing videos
  $('a.flash_video').click(function (event) {
    var src = this.href.split('/'),
        file = src[src.length-1];
    window.location = 'http://jqueryfordesigners.com/video.php?f=' + file;
    event.preventDefault();
  });
  
  // de-encode email addys
  $('a.email').each(function () {
    var origEmail = this.href.replace(/^mailto:/, '');
    var email = origEmail.replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
    
    this.innerHTML = this.innerHTML.replace(origEmail, email);
    this.href = 'mailto:' + email;
  });

  // clean up overflow
  if ($.browser.msie) {
    $('pre').each(function () {
      if (this.scrollWidth > this.offsetWidth) {
        $(this).css({ 'overflow-y' : 'hidden', 'padding-bottom' : '20px' });
      }
    });
  }
  
  // video support
  var v = document.createElement('video');
  !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, '')) && (function () {
    var $preview = $('#videoPreview'),
        $link = $preview.find('a.quicktime_video');

    if (!$preview.length) return;

    v.src = $link.attr('href');
    v.controls = true;
    v.preload = 'metadata';
    v.addEventListener('loadedmetadata', function () {
      $link.click(function (event) {
        event.preventDefault();
        $preview.prepend(v);
        $preview.animate({ height: v.videoHeight }, 200);
        v.play();
      });
    }, false);

    v.style.margin = '0 auto';
    v.style.display = 'block';
  })();
});
