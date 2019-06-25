/**
 *
 *
 * BREADCRUMBS
 *
 *
 */

var breadCrumbLinks = $('.breadCrumbs').find('a')

breadCrumbLinks.each(function(i, el) {
  var chevron = $('<i class="fas fa-chevron-down"></i>')
  if (i !== breadCrumbLinks.length - 1) {
    $(el).append(chevron)
  } else {
    $(el).replaceWith('<p>' + $(el).text() + '</p>')
  }
})

/**
 *
 *
 * MAIN IMG COMPONENT SLIDER
 *
 *
 */

// define variables.
var altImagesContainer = $('.imagesWrap'),
  allImages = altImagesContainer.find('img'),
  imagesCount = allImages.length,
  currentImage = 0,
  mainImage = $('.imageWrapper img'),
  altCount = $('.altCount'),
  mainImageEl = document.getElementById('mainImage'),
  mc = new Hammer(mainImageEl),
  listOfShoes

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

/**
 * Creates the event listener for swiping on the main image
 */
mc.on('swipe', function(ev) {
  if (ev.direction == 2) {
    handleSwipeLeft()
  } else if (ev.direction == 4) {
    handleSwipeRight()
  }
})

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
    currentImage -= 1
    updateMainImage(currentImage)
    updateAltText(currentImage)
    updateSlider(currentImage)
  }
}

/**
 * Initilizes the base values and formats the page;
 */
function init() {
  // initial updating of the alternate image text.
  updateAltText(currentImage)

  //update the css variable for proper width management of the container.
  altImagesContainer.css('width', imagesCount * 115)

  listOfShoes = [
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
}

init()

/**
 *
 *
 * PRICE
 *
 *
 */

var price = 30.0,
  originalPrice = parseFloat(49.99).toFixed(2),
  savedAmount = parseFloat(originalPrice - price).toFixed(2),
  endDate = '4/10/19'

var formattedPrice = parseFloat(price)
  .toFixed(2)
  .split('.')

$('.price h2').text('$' + formattedPrice[0])
$('.price span').text(formattedPrice[1])
$('.originalPrice').text(originalPrice)
$('.savedAmount').text(savedAmount)
$('.endSale').text(endDate)

/**
 *
 *
 * Reviews
 *
 *
 */

$('.revealReviews').on('click', function() {
  $('.reviewSection').toggleClass('expanded')
  $('.reviewArrow').toggleClass('expanded')
  $(this).toggleClass('expanded')
})

$('.seeFull').on('click', function() {
  $('.descriptionSection')
    .find('.overlay')
    .toggleClass('expanded')
  $(this)
    .closest('.description')
    .toggleClass('expanded')
})
