$(document).ready(function () {
  getBooks();

  // add a book
  $('#book-submit').on('click', postBook);
  $('#book-list').on('click', '.update', putBook);
  $('#book-list').on('click', '.delete', deleteBook);
  $('.target').on('submit', getGenre);
  // console.log('selected', getGenre);

});
/**
 * Retrieve books from server and append to DOM
 */
function getBooks() {
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function (books) {
      console.log('GET /books returns:', books);
      books.forEach(function (book) {   //start here
        var $el = $('<div></div>');  //changed from li to div

        var bookProperties = ['title', 'author', 'published', 'genre', 'edition', 'publisher'];

        bookProperties.forEach(function (property) {
          var inputType = 'text';
          if(property == 'published'){
            //inputType = 'date';
            //book[property] = new Date(book[property]);
          }

          var $input = $('<input type=""' + inputType + ' id="' + property + '"name="' + property + '" />');
          $input.val(book[property]);
          $el.append($input);
      });
        $el.data('bookID', book.id);
         $el.append('<button class = "update">Update</button>');
         $el.append('<button class = "delete">Delete</button>');
             //end here
                                  //deleted appends here
        $('#book-list').append($el);

      });
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}
/**
 * Add a new book to the database and refresh the DOM
 */
function postBook() {
  event.preventDefault();

  var book = {};

  $.each($('#book-form').serializeArray(), function (i, field) {
    book[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/books',
    data: book,
    success: function () {
      console.log('POST /books works!');
      $('#book-list').empty();
      getBooks();
    },

    error: function (response) {
      console.log('POST /books does not work...');
    }
  });
}

function putBook () {
  var book = {};
  var inputs = $(this).parent().children().serializeArray();
  $.each(inputs, function (i, field){
    book[field.name] = field.value;
  });
 var bookID = $(this).parent().data('bookID');

  $.ajax({
    type: 'PUT',
    url: '/books/' + bookID,
    data: book,
    success: function () {
      getBooks();
    },
    error: function () {
      console.log('Error PUT /books/' + bookID);
    },
  });
}
function deleteBook() {
  var bookID = $(this).parent().data('bookID');

  $.ajax ({
    type: 'DELETE',
    url: '/books/' + bookID,
    success: function () {
      console.log('delete sucess');
      $('#book-list').empty();
      getBooks();
    },
    error: function () {
      console.log('Delete failed');
    },
  });
}
function getGenre() {
    var getGenre = $('#dropDown option:selected').text();
    console.log("getGenre ", getGenre);
    //tell server that you want only genre books
    //server will send what we want in books.js
    $.ajax({
        type: 'GET',
        url: '/books/' + getGenre,
        success: function(bookList) {
            console.log('this works');
            $('#book-list').empty();
            console.log(bookList);

            bookList.forEach(function(book) {
                var $el = $('<div></div>');
                var bookProperties = ['title', 'author', 'published', 'genre'];

                bookProperties.forEach(function(property) {
                    var inputType = 'text';
                    if (property == 'genre') {

                    var $input = $('<input type="' + inputType + '" id="' + property + '"name="' + property + '" />');

                    console.log("input ", $('input').text(), book[property]);

                    $input.val(book[property]);
                    $('#book-list').append($input);
                    $('#book-list').append($el);
                  }
                });
              })
                  }
                });
            }
