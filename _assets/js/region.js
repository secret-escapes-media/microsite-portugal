(function ($, root, undefined) {$(function () {'use strict'; // on ready start
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////
//    PERFECT BREAK GAME
///////////////////////////////////////

var game              = '.game';
var selectedClass     = 'is-selected';
var categoryOption    = 'js-game__category-option';
var selectedCategory  = '.'+categoryOption+'.'+selectedClass;
var submitCategoryBtn = 'js-game__category-submit';
var categoryList      = 'js-game__category-list';
var userCategory      = '';

var gameData = {
  "categories": [
      { "id": "algarve" },
      { "id": "centro" },
      { "id": "madeira" },
      { "id": "azoren" }
    ]
  };

// finds the most popular value in array
// when 2 2 1 is selected, the pair with an item that appears first in html wins
// if 1 1 1 1 1 (no duplicate) the first item in html value wins
function mostPopularValue(arr) {
  var freqs = {};
  var max_index;
  var max_value = -1/0; // Negative infinity.
  $.each(arr, function(i, v) {
    if (freqs[v] != undefined) {
      freqs[v]++;
    } else {
      freqs[v] = 1;
    }
  });
  $.each(freqs, function(num, freq) {
    if (freq > max_value) {
      max_value = freq;
      max_index = num;
    }
  });
  if (max_index != undefined) {
    return max_index;
  }
}

function randomiseList(list) {
  $(list).each(function(){
    // get current ul
    var $parent = $(this);
    // get array of list items in current ul
    var $liArr = $parent.children('.' + categoryOption);
    // sort array of list items in current ul randomly
    $liArr.sort(function(a,b){
      // Get a random number between 0 and 10
      var temp = parseInt( Math.random()*10 );
      // Get 1 or 0, whether temp is odd or even
      var isOddOrEven = temp%2;
      // Get +1 or -1, whether temp greater or smaller than 5
      var isPosOrNeg = temp>5 ? 1 : -1;
      // Return -1, 0, or +1
      return( isOddOrEven*isPosOrNeg );
    })
    // append list items to ul
    .appendTo($parent);
  });
}

function createCategoryList() {
  var categoriesAvailable = (gameData.categories.length)-1,
      categoryCounter     = 0,
      imageCounter        = 1;
  // create 20 options using the game categories
  for (var i = 1; i <= 16; i++) {
    // adds a list item of game category to list
    $('.'+categoryList).append('<div class="col '+ categoryOption+ ' game__category-option" data-category="' + gameData.categories[categoryCounter].id + '"><div class="bg-img bg-img--1-1" style="background-image:url(../_assets/img/game/'+ gameData.categories[categoryCounter].id +'/0'+ imageCounter +'.jpg);"></div></div>');
    // loops through the amount of available categories if
    if (categoryCounter == categoriesAvailable) {
      // there are no more categories left, back to start
      categoryCounter = 0;
      imageCounter++;
    } else {
      // go to the next category
      categoryCounter++;
    }
  }
  // put list items in a random order
  randomiseList('.'+categoryList);
}







// STARTS HERE /////////////////////////////////////////////////////////////////

// deletes the no JS message builds and shows the first category section?????
// hide style and result screens (.row)
createCategoryList();
$('.game__result, .result').hide();

////////////////////////////////////////////////////////////////////////////////

// function for selecting category options
$('body').on('click', '.'+categoryOption, function() {
  if ($(selectedCategory).length === 5){
    // Do nothing when 5 options are already selected
    if ($(this).hasClass(selectedClass)) {
      // allow unselecting options once limit reached
      $(this).removeClass(selectedClass);
    }
  } else {
    // no limit reached, allow selection
    $(this).toggleClass(selectedClass);
  }
  // add visual feedback when 5 options are selected
  if ($(selectedCategory).length == 5){
    $('.'+categoryList).addClass('has-limit');
    $('.game__category').addClass('has-limit');
  } else {
    $('.'+categoryList).removeClass('has-limit');
    $('.game__category').removeClass('has-limit');
  }
});

// submit function for category
$('body').on('click', '.'+submitCategoryBtn, function() {
  // collect selected categories
  var selectedCategories = [];
  $(selectedCategory).each(function() {
    // put each answer into array
    selectedCategories.push($(this).data('category'));
  });
  // stores user's most selected category
  userCategory = mostPopularValue(selectedCategories);
  // show the user's result
  $('.game__result').show();
  $('.js-result-' + userCategory).show();
  $('.game__category').hide();
  $('.game').addClass('game--complete');
  // scroll back to the top of the game section
  $('html,body').scrollTop( $('.game').offset().top );
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end