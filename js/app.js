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
            cache: false,
            url: "http://localhost:8080/books",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {
            for (var i = 0; i < result.length; i++) {
                var book = result[i]
                var li = $("<li class='book'>").html(book.title).appendTo(books).attr('book-id', book.id);
                var info = $("<button>SHOW INFO</button>").appendTo(li).attr('book-id', book.id);
                var update = $("<button>MODIFY</button>").appendTo(li).attr('book-id', book.id);
                var del = $("<button>DELETE</button>").appendTo(li).attr('book-id', book.id);
                $("<div>").appendTo(books);
                info.one("click", function () {
                    showInfo($(this).attr('book-id'));
                })
                update.one("click", function () {
                    updateBook($(this).attr('book-id'), "Nowy Tytuł", "Nowy Autor", "Nowy Wydawca", "Zmieniony Typ", "Zmieniony ISBN");
                })
                del.one("click", function () {
                    deleteBook($(this).attr('book-id'));
                })
            }
        }).fail(function (xhr, status, err) {
            console.log(err);
        });
    }

    function showInfo(bookId) {
        $.ajax({
            cache: false,
            url: "http://localhost:8080/books/" + bookId,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {
            var list = $("<ul>").appendTo($(".book[book-id=" + bookId + "]"));
            $("<li>").html("Author: " + result.author).appendTo(list);
            $("<li>").html("Title: " + result.title).appendTo(list);
            $("<li>").html("Publisher: " + result.publisher).appendTo(list);
            $("<li>").html("Type: " + result.type).appendTo(list);
            $("<li>").html("ISBN: " + result.isbn).appendTo(list);
        }).fail(function (xhr, status, err) {
            console.log(err);
        });
    }

    function addNewBook(title, author, publisher, type, isbn) {
        $.ajax({
            cache: false,
            url: "http://localhost:8080/books",
            data: JSON.stringify({
                "title": title, "author": author,
                "publisher": publisher, "type": type,
                "isbn": isbn
            }),
            type: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(function (result) {
            showBooks();
        }).fail(function (xhr, status, err) {
            console.log(err);
        });
    }

    function updateBook(id, title, author, publisher, type, isbn) {
        $.ajax({
            cache: false,
            url: "http://localhost:8080/books",
            data: JSON.stringify({
                "id": id, "title": title, "author": author,
                "publisher": publisher, "type": type,
                "isbn": isbn
            }),
            type: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        }).done(function (result) {
            showBooks();
        }).fail(function (xhr, status, err) {
            console.log(err);
        });
    }

    function deleteBook(bookId) {
        $.ajax({
            cache: false,
            url: "http://localhost:8080/books/" + bookId,
            data: {},
            type: "DELETE"
        }).done(function (result) {
            showBooks();
        }).fail(function (xhr, status, err) {
            console.log(err);
        });
    }


});