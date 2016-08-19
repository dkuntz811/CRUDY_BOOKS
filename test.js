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
