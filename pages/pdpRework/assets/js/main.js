var breadCrumbLinks = $(".breadCrumbs").find("a");

var price = "30.00";

var formattedPrice = price.split(".");

breadCrumbLinks.each(function(i, el) {
  var chevron = $('<i class="fas fa-chevron-down"></i>');
  if (i !== breadCrumbLinks.length - 1) {
    $(el).append(chevron);
  } else {
    $(el).replaceWith("<p>" + $(el).text() + "</p>");
  }
});

var currentImage = 0;

var altImagesContainer = $(".imagesWrap"),
  allImages = altImagesContainer.find("img"),
  imagesCount = allImages.length;

allImages.each(function(i, el) {
  $(el).data("position", i);
});

var altCount = $(".altCount");

altCount.text(currentImage + 1 + " of " + imagesCount);

$(altImagesContainer).draggable({
  axis: "x",
  containment: [imagesCount * -93, 0, 20, 0],
  drag: function(event, ui) {
    currentImage = Math.ceil(ui.position.left / -110);
    altCount.text(currentImage + 1 + " of " + imagesCount);
  }
});

altImagesContainer.css("--n", imagesCount);

$(".price h2").text("$" + formattedPrice[0]);
$(".price span").text(formattedPrice[1]);
