var breadCrumbLinks = $(".breadCrumbs").find("a");

breadCrumbLinks.each(function(i, el) {
  var chevron = $('<i class="fas fa-chevron-down"></i>');
  if (i !== breadCrumbLinks.length - 1) {
    $(el).append(chevron);
  } else {
    $(el).replaceWith("<p>" + $(el).text() + "</p>");
  }
});

var currentImage = 0;

var altImages = $(".imagesWrap img");

var numAltImages = altImages.length;

$(".altCount").text(currentImage + 1 + " of " + numAltImages);
