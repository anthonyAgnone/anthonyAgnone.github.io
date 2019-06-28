function initLazyLoad() {
  var imgDefer = document.querySelectorAll('.lazyLoad')
  for (var i = 0; i < imgDefer.length; i++) {
    if (imgDefer[i].getAttribute('data-src')) {
      if (imgDefer[i].tagName === 'IMG') imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'))
      if (imgDefer[i].tagName === 'SOURCE') imgDefer[i].setAttribute('srcset', imgDefer[i].getAttribute('data-src'))
    }
  }
}
window.onload = initLazyLoad
