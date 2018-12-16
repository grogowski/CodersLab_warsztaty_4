$(document).ready(function () {
    showBooks();
    $("#new-book-form").on("submit", function (e) {
        e.preventDefault();
        var form = $("#new-book-form");
        addNewBook(form.find("#title").val(),
            form.find("#author").val(),
            form.find("#publisher").val(),
            form.find("#type").val(),
            form.find("#isbn").val());
    });
    function showBooks() {
        var books = $("#title-list");
        books.empty();
        $.ajax({
            url: "http://localhost:8282/books",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function(result) {
            for (var i = 0; i < result.length; i++) {
                var book = result[i]
                var li = $("<li>").html(book.title).appendTo(books).attr('book-id', book.id);
                var del = $("<button>DELETE</button>").appendTo(li).attr('book-id', book.id);
                $("<div>").appendTo(books);
                li.one("click", function () {
                    showInfo($(this).attr('book-id'));
                })
                del.one("click", function () {
                    deleteBook($(this).attr('book-id'));
                })
            }
        }).fail(function(xhr,status,err) {
            console.log(err);
        });
    }
    function showInfo(bookId) {
        $.ajax({
            url: "http://localhost:8282/books/"+bookId,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function(result) {
            var list = $("<ul>").appendTo($("[book-id="+bookId+"]").next());
            $("<li>").html("Author: "+result.author).appendTo(list);
            $("<li>").html("Title: "+result.title).appendTo(list);
            $("<li>").html("Publisher: "+result.publisher).appendTo(list);
            $("<li>").html("Type: "+result.type).appendTo(list);
            $("<li>").html("ISBN: "+result.isbn).appendTo(list);
        }).fail(function(xhr,status,err) {
            console.log(err);
        });
    }
    function addNewBook(title, author, publisher, type, isbn) {
        $.ajax({
            url: "http://localhost:8282/books",
            data: JSON.stringify({"title":title ,"author":author,
                "publisher":publisher,"type":type,
                "isbn":isbn}),
            type: "POST",
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).done(function(result) {
            showBooks();
        }).fail(function(xhr,status,err) {
            console.log(err);
        });
    }
    function deleteBook(bookId) {
            $.ajax({
                url: "http://localhost:8282/books/"+bookId,
                data: {},
                type: "DELETE",
                dataType: "json"
            }).done(function(result) {
                showBooks();
            }).fail(function(xhr,status,err) {
                console.log(err);
            });
    }




});