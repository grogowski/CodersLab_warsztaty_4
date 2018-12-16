$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8282/books",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function(result) {
        var books = $("#books");
        for (var i = 0; i < result.length; i++) {
            var book = result[i]
            var tr = $("<tr>").appendTo(books);
            $("<td>").html(book.id).appendTo(tr);
            $("<td>").html(book.author).appendTo(tr);
            $("<td>").html(book.title).appendTo(tr);
            $("<td>").html(book.publisher).appendTo(tr);
            $("<td>").html(book.type).appendTo(tr);
            $("<td>").html(book.isbn).appendTo(tr);

            var descriptionTr = $("<tr>").appendTo(books)
            $("<td  colspan='6'></td>").html("Tu będzie opis książki").appendTo(descriptionTr).hide();
        }
    }).fail(function(xhr,status,err) {
        console.log(err);
    });
});