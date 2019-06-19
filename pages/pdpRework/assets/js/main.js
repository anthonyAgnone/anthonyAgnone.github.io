// Bread Crumbs

var breadCrumbLinks = $('.breadCrumbs').find('a')

breadCrumbLinks.each(function(i, el) {
  var chevron = $('<i class="fas fa-chevron-down"></i>')
  if (i !== breadCrumbLinks.length - 1) {
    $(el).append(chevron)
  } else {
    $(el).replaceWith('<p>' + $(el).text() + '</p>')
  }
})

// Main Img component and slider

// define variables.
var altImagesContainer = $('.imagesWrap'),
  allImages = altImagesContainer.find('img'),
  imagesCount = allImages.length,
  currentImage = 0,
  mainImage = $('.imageWrapper img'),
  altCount = $('.altCount')

//update the css variable for proper width management of the container.
altImagesContainer.css('width', imagesCount * 115)

/**
 * Take each alternate image and provide a data point to signify which position they are in.
 * Then provide an event listener for whether the user clicks the image to update the page.
 */
allImages.each(function(i, el) {
  $(el).data('position', i)
  $(el).on('click', function() {
    updateSlider($(this).data('position'))
  })
})

// initial updating of the alternate image text.
updateAltText(currentImage)

/**
 * Initiates the draggable alternate images component.
 * First ensures that sliding is required by taking the image width (always 80px)
 * and the margin-left (always 25px) and comparing it to the windows width.
 * If the window is larger than the combined width of the images, sliding not required.
 * Axis: constrains the sliding to only horizontal
 * Containment: ensures that sliding past the elements isn't possible.
 * drag: takes a snapshot of what image was present when sliding started and stores it
 * in lastImage. Then updates the global currentImage variable by calculating the distance
 * the slide has traveled and capping it at an integer. 110 is used so that the slider has an
 * activation zone that is forgiving and doesn't require the user to slide an large amount to see
 * the next image.
 * If currentImage has changed, then update the Main update and update the snapshot variable.
 * Finally update the Alt text to reflect the change.
 */
if (window.innerWidth <= 115 * imagesCount) {
  $(altImagesContainer).draggable({
    axis: 'x',
    containment: [imagesCount * -93, 0, 20, 0],
    drag: function(event, ui) {
      var lastImage = 0
      currentImage = Math.ceil(ui.position.left / -110)
      if (currentImage != lastImage) {
        updateMainImage(currentImage)
        lastImage = currentImage
      }
      updateAltText(currentImage)
    }
  })
}

//not production. This lists all of the images the server would provide us after the ajax calls.
var listOfShoes = [
  './assets/img/mainShoe.jpg',
  './assets/img/mainShoe.jpg',
  './assets/img/secondShoe.jpg',
  './assets/img/mainShoe.jpg',
  './assets/img/secondShoe.jpg',
  './assets/img/mainShoe.jpg',
  './assets/img/secondShoe.jpg',
  './assets/img/mainShoe.jpg',
  './assets/img/secondShoe.jpg',
  './assets/img/mainShoe.jpg'
]

/**
 * Updates the Main Image on the page.
 * @param {int} newImage - This represents the position of the new image in the listOfShoes Array
 */
function updateMainImage(newImage) {
  mainImage.attr('src', listOfShoes[newImage])
}

/**
 * Updates the Slider Position on the page.
 * @param {int} position - This represents the image position of the slider relative to the far left image
 */
function updateSlider(position) {
  altImagesContainer.css('transition', 'left 0.3s ease')
  altImagesContainer.css('left', position * -101)
  updateAltText(position)
  updateMainImage(position)
  setTimeout(function() {
    altImagesContainer.css('transition', 'left 0s ease')
  }, 300)
}

/**
 * Updates the Text for slider position
 * @param {int} position - This represents the image position of the slider relative to the far left image
 */
function updateAltText(position) {
  altCount.text(position + 1 + ' of ' + imagesCount)
}

/**
 * Handles Swiping Left on the Main Image
 * Updates  the image, the slider and the text associated with it if it is not
 * the last image.
 */
function handleSwipeLeft() {
  if (currentImage < imagesCount) {
    currentImage += 1
    updateMainImage(currentImage)
    updateAltText(currentImage)
    updateSlider(currentImage)
  }
}

/**
 * Handles Swiping Right on the Main Image
 * Updates  the image, the slider and the text associated with it if it is not
 * the first image.
 */
function handleSwipeRight(event) {
  if (currentImage > 0) {
    currentImage += 1
    updateMainImage(currentImage)
    updateAltText(currentImage)
    updateSlider(currentImage)
  }
}

var startPoint = 0
var traveled = 0

var mainWrapper = document.getElementById('imageWrapper')

mainWrapper.addEventListener('touchstart', handleTouchStart, false)
mainWrapper.addEventListener('touchmove', handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ) // jQuery
}

function handleTouchStart(evt) {
  console.log('touch started')
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
  console.log('touch moving')
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      console.log('swiped left')
    } else {
      console.log('swiped right')
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

// Price

var price = '30.00'

var formattedPrice = price.split('.')

$('.price h2').text('$' + formattedPrice[0])
$('.price span').text(formattedPrice[1])
