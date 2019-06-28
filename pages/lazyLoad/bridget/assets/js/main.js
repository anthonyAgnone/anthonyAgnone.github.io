function lazyLoadImages() {
  var images = $('img[data-src]')
  var scrollTop = window.pageYOffset
  var lazyLoadedImages = $('img.lazy-loaded')
  if (lazyLoadedImages.length != images.length) {
    images.each(function() {
      var img = $(this)
      if (img.offset().top < window.innerHeight + scrollTop) {
        var imgSrc = img.attr('src')
        var dataSrc = img.data('src')
        if (imgSrc != dataSrc) {
          img.attr('src', dataSrc)
          img.addClass('lazy-loaded')
        }
      }
    })
  } else {
    document.removeEventListener('scroll', lazyLoadImages)
    window.removeEventListener('resize', lazyLoadImages)
    window.removeEventListener('orientationChange', lazyLoadImages)
  }
}
lazyLoadImages()
document.addEventListener('scroll', lazyLoadImages)
window.addEventListener('resize', lazyLoadImages)
window.addEventListener('orientationChange', lazyLoadImages)
